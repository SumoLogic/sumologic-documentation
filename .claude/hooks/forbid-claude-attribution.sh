#!/usr/bin/env bash
#
# forbid-claude-attribution.sh
#
# PreToolUse hook. Blocks any comment or Slack message that carries a Claude
# attribution marker, which AGENTS.md forbids.
#
# Covers:
#   - gh pr comment / gh issue comment
#   - gh pr review   (when it includes a --body or --comment)
#   - gh api ... /comments|/reviews ...
#   - Jira:  mcp__atlassian__addCommentToJiraIssue
#   - Slack: slack_send_message, slack_send_message_draft,
#            slack_schedule_message, slack_create_canvas, slack_update_canvas
#
# For Bash calls the body may be inline (--body "text") or supplied from a file
# (--body-file PATH, --input PATH, -F field=@PATH). A hook only receives the
# command string, never file contents, so a file-based body would otherwise slip
# through unchecked. That is the common case for real review content, since
# anything multi-line is painful to inline. This hook therefore reads the path
# off the command line and inspects the file itself.
#
# Deliberately NOT covered:
#   - Pull request descriptions. A PR description is not a comment, and the
#     Claude Code harness stamps "Generated with Claude Code" into PR bodies
#     by default. That line is allowed to stay, so gh pr create and gh pr edit
#     are not inspected.
#   - Doc content under /docs. This rule is about comments and messages only.
#     Docs may discuss Claude Code freely; edits there go through Write/Edit,
#     which this hook never matches.
#   - The Co-Authored-By trailer on git commits, which is commit metadata
#     rather than reader-facing comment text.
#
# Known gaps, all fail open rather than blocking legitimate work: a body path
# held in a shell variable, a path this process cannot read, and stdin sources
# such as `--input -` or a piped heredoc.
#
# Note: edits to this script take effect immediately, but changing the hook
# registration in .claude/settings.json may not apply until a new session.
#
# Wired up from .claude/settings.json. See DOCS-1867.

set -u

input="$(cat)"
tool_name="$(printf '%s' "$input" | jq -r '.tool_name // empty' 2>/dev/null)"

# Matched case-insensitively. The [^a-z0-9]* allows for markdown link syntax,
# so the default "Generated with [Claude Code](https://claude.com/claude-code)"
# is caught as well as a bare "via Claude Code".
markers='via [^a-z0-9]*claude code|generated with [^a-z0-9]*claude code'

has_marker() {
  # Returns 0 (true) when $1 DOES contain an attribution marker.
  printf '%s' "$1" | grep -qiE "$markers"
}

deny() {
  jq -n --arg reason "$1" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: $reason
    }
  }'
  exit 0
}

# Every string value in tool_input, so the check does not depend on the exact
# parameter name (commentBody, text, markdown, and so on).
all_input_strings() {
  printf '%s' "$input" | jq -r '[.tool_input | .. | strings] | join("\n")'
}

# Paths the command feeds in as a body, one per line. Quote characters are
# stripped first, since the path is usually quoted on a real command line and
# a path containing a literal quote is pathological.
body_file_paths() {
  local unquoted
  unquoted="$(printf '%s' "$1" | tr -d "\"'")"
  # --body-file PATH, --body-file=PATH, --input PATH, --input=PATH
  printf '%s' "$unquoted" \
    | grep -oE -- '(--body-file|--input)([[:space:]]+|=)[^[:space:];&|)]+' \
    | sed -E 's/^(--body-file|--input)([[:space:]]+|=)+//'
  # -f field=@PATH, -F field=@PATH, body=@PATH
  printf '%s' "$unquoted" \
    | grep -oE -- '=@[^[:space:];&|)]+' \
    | sed -E 's/^=@//'
}

case "$tool_name" in
  Bash)
    cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty')"

    # Only inspect commands that post a comment. Pull request descriptions are
    # deliberately NOT inspected; see the note at the top of this file. The gh
    # call must sit in command position (line start, or after ; & | or a paren)
    # so that a command whose text merely *mentions* these subcommands does not
    # trip the check. Editing this repo's own docs about the rule would
    # otherwise be blocked. Trade-off: a gh call inside legacy backtick
    # substitution, or after `then`/`do`, is not inspected.
    at_cmd='(^|[;&|(])[[:space:]]*'

    # gh pr/issue comment, or gh pr review carrying a body.
    posts_comment=1
    printf '%s' "$cmd" | grep -Eq \
      "${at_cmd}gh +(pr|issue) +comment|${at_cmd}gh +pr +review.*(--body|--comment|--body-file)" \
      && posts_comment=0

    # gh api against a comment or review endpoint, but only for writes. A
    # read-only GET must not be inspected: scanning for existing attribution
    # puts the marker in the --jq filter, which would otherwise self-deny.
    if [ "$posts_comment" -ne 0 ] \
      && printf '%s' "$cmd" | grep -Eq "${at_cmd}gh +api" \
      && printf '%s' "$cmd" | grep -Eq -- '(/comments|/reviews)' \
      && printf '%s' "$cmd" | grep -Eq -- '--method +(POST|PATCH|PUT)|--input|-[fF] +[A-Za-z_]+=|body='; then
      posts_comment=0
    fi

    [ "$posts_comment" -eq 0 ] || exit 0

    # Inline body.
    if has_marker "$cmd"; then
      deny 'Remove the Claude attribution line. AGENTS.md forbids "via Claude Code" and "Generated with Claude Code" in GitHub comments. Re-run the command without it.'
    fi

    # File-supplied body.
    while IFS= read -r path; do
      [ -n "$path" ] || continue
      [ "$path" = "-" ] && continue
      [ -r "$path" ] || continue
      if has_marker "$(cat "$path" 2>/dev/null)"; then
        deny "Remove the Claude attribution line from ${path}. AGENTS.md forbids \"via Claude Code\" and \"Generated with Claude Code\" in GitHub comments. Edit that file and re-run."
      fi
    done <<EOF
$(body_file_paths "$cmd")
EOF
    ;;

  mcp__atlassian__addCommentToJiraIssue)
    if has_marker "$(all_input_strings)"; then
      deny 'Remove the Claude attribution line. AGENTS.md forbids "via Claude Code" in Jira comments. Re-add the comment without it.'
    fi
    ;;

  *slack_send_message|*slack_send_message_draft|*slack_schedule_message|*slack_create_canvas|*slack_update_canvas)
    if has_marker "$(all_input_strings)"; then
      deny 'Remove the Claude attribution line. AGENTS.md forbids "via Claude Code" and "Generated with Claude Code" in Slack messages. Re-send without it.'
    fi
    ;;
esac

exit 0

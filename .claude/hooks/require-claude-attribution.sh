#!/usr/bin/env bash
#
# require-claude-attribution.sh
#
# PreToolUse hook. Blocks any comment-posting tool call whose body does not
# carry the "via Claude Code" attribution required by AGENTS.md.
#
# Covers:
#   - gh pr comment / gh issue comment
#   - gh pr review   (when it includes a --body or --comment)
#   - gh api ... /comments|/reviews ... body=...
#   - the Jira mcp__atlassian__addCommentToJiraIssue MCP tool
#
# Wired up from .claude/settings.json. See DOCS-1867.

set -u

input="$(cat)"
tool_name="$(printf '%s' "$input" | jq -r '.tool_name // empty' 2>/dev/null)"

# Matched case-insensitively, so "— via Claude Code" and "via claude code" both pass.
marker='via claude code'

missing_marker() {
  # Returns 0 (true) when $1 does NOT contain the marker.
  ! printf '%s' "$1" | grep -qi "$marker"
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

case "$tool_name" in
  Bash)
    cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty')"

    # Only inspect commands that post a comment.
    printf '%s' "$cmd" | grep -Eq \
      'gh +(pr|issue) +comment|gh +pr +review.*(--body|--comment)|gh +api.*(/comments|/reviews).*body=' \
      || exit 0

    # Body supplied from a file: contents are not visible here, so let it through.
    printf '%s' "$cmd" | grep -Eq -- '--body-file|body=@|-F +[A-Za-z_]+=@' && exit 0

    if missing_marker "$cmd"; then
      deny 'This GitHub comment must end with "— via Claude Code" (AGENTS.md comment-attribution rule). Re-run the command with that line appended to the comment body.'
    fi
    ;;

  mcp__atlassian__addCommentToJiraIssue)
    # Concatenate every string value in tool_input so the check does not depend
    # on the exact parameter name.
    body="$(printf '%s' "$input" | jq -r '[.tool_input | .. | strings] | join("\n")')"
    if missing_marker "$body"; then
      deny 'This Jira comment must end with "— via Claude Code" (AGENTS.md comment-attribution rule). Re-add the comment with that line appended.'
    fi
    ;;
esac

exit 0

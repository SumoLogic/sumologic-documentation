#!/usr/bin/env bash
#
# Test matrix for forbid-claude-attribution.sh.
#
# Run from anywhere:  bash .claude/hooks/forbid-claude-attribution.test.sh
# Exits non-zero if any case fails, so it works in CI.
#
# Each case feeds the hook a synthetic PreToolUse payload and asserts whether it
# denies. Cases are grouped by what they protect:
#   - deny:  attribution must never reach a comment
#   - allow: the hook must not block legitimate work
#
# See DOCS-1867.

set -u

hook_dir="$(cd "$(dirname "$0")" && pwd)"
hook="$hook_dir/forbid-claude-attribution.sh"

if [ ! -r "$hook" ]; then
  echo "cannot read hook at $hook" >&2
  exit 2
fi
for dep in jq grep; do
  command -v "$dep" >/dev/null || { echo "missing dependency: $dep" >&2; exit 2; }
done

fixtures="$(mktemp -d)"
trap 'rm -rf "$fixtures"' EXIT

# Built up at runtime so this file does not itself contain a bare marker that
# would trip the hook when edited from a shell command.
M="via Claude$(printf ' ')Code"
ROBOT="Generated with [Claude$(printf ' ')Code](https://claude.com/claude-code)"

printf 'Looks good.\n\nx %s\n' "$M" > "$fixtures/dirty.md"
printf '{"body":"Looks good.\\n\\nx %s"}' "$M" > "$fixtures/dirty.json"
printf 'Looks good.\n' > "$fixtures/clean.md"
printf '{"body":"Looks good."}' > "$fixtures/clean.json"

pass=0
fail=0

verdict() {
  if printf '%s' "$1" | grep -q '"deny"'; then echo DENY; else echo allow; fi
}

record() {
  expected="$1"; got="$2"; desc="$3"
  if [ "$got" = "$expected" ]; then
    pass=$((pass + 1))
    printf '  ok    %-5s %s\n' "$got" "$desc"
  else
    fail=$((fail + 1))
    printf '  FAIL  %-5s %s (expected %s)\n' "$got" "$desc" "$expected"
  fi
}

# bash_case <expected> <description> <command string>
bash_case() {
  payload="$(jq -cn --arg c "$3" '{tool_name:"Bash",tool_input:{command:$c}}')"
  record "$1" "$(verdict "$(printf '%s' "$payload" | bash "$hook")")" "$2"
}

# tool_case <expected> <description> <tool name> <tool_input JSON>
tool_case() {
  payload="$(jq -cn --arg t "$3" --argjson i "$4" '{tool_name:$t,tool_input:$i}')"
  record "$1" "$(verdict "$(printf '%s' "$payload" | bash "$hook")")" "$2"
}

echo "deny: inline comment bodies"
bash_case DENY "gh pr comment"           "gh pr comment 1 --body \"x $M\""
bash_case DENY "gh issue comment"        "gh issue comment 1 --body \"x $M\""
bash_case DENY "gh pr review --body"     "gh pr review 1 --comment --body \"x $M\""
bash_case DENY "gh api -f body="         "gh api repos/o/r/issues/1/comments -f body=\"x $M\""
bash_case DENY "chained after &&"        "cd /r && gh pr comment 1 --body \"x $M\""
bash_case DENY "harness robot line"      "gh pr comment 1 --body \"x $ROBOT\""

echo "deny: file-supplied comment bodies"
bash_case DENY "--body-file bare"        "gh pr comment 1 --body-file $fixtures/dirty.md"
bash_case DENY "--body-file dquoted"     "gh pr comment 1 --body-file \"$fixtures/dirty.md\""
bash_case DENY "--body-file squoted"     "gh pr comment 1 --body-file '$fixtures/dirty.md'"
bash_case DENY "api reviews --input"     "gh api repos/o/r/pulls/1/reviews --method POST --input $fixtures/dirty.json"
bash_case DENY "api PATCH comment"       "gh api repos/o/r/pulls/comments/1 --method PATCH --input $fixtures/dirty.json"
bash_case DENY "-F body=@file"           "gh api repos/o/r/issues/1/comments -F body=@$fixtures/dirty.md"

echo "deny: MCP comment tools"
tool_case DENY "jira comment"            mcp__atlassian__addCommentToJiraIssue "{\"commentBody\":\"x $M\"}"
tool_case DENY "jira comment prefixed"   mcp__claude_ai_Atlassian_Rovo__addCommentToJiraIssue "{\"commentBody\":\"x $M\"}"
tool_case DENY "slack message"           mcp__claude_ai_Slack__slack_send_message "{\"text\":\"x $M\"}"
tool_case DENY "slack canvas"            mcp__claude_ai_Slack__slack_update_canvas "{\"markdown\":\"x $M\"}"

echo "allow: same calls without the marker"
bash_case allow "pr comment clean"       "gh pr comment 1 --body \"looks good\""
bash_case allow "--body-file clean"      "gh pr comment 1 --body-file $fixtures/clean.md"
bash_case allow "api reviews clean"      "gh api repos/o/r/pulls/1/reviews --method POST --input $fixtures/clean.json"
tool_case allow "jira clean"             mcp__atlassian__addCommentToJiraIssue '{"commentBody":"looks good"}'
tool_case allow "jira clean prefixed"    mcp__claude_ai_Atlassian_Rovo__addCommentToJiraIssue '{"commentBody":"looks good"}'
tool_case allow "slack clean"            mcp__claude_ai_Slack__slack_send_message '{"text":"looks good"}'

echo "allow: out of scope by design"
bash_case allow "pr create + robot"      "gh pr create --title x --body \"s $ROBOT\""
bash_case allow "pr edit + robot"        "gh pr edit 1 --body \"s $ROBOT\""
bash_case allow "pr create --body-file"  "gh pr create --title x --body-file $fixtures/dirty.md"
bash_case allow "commit Co-Authored-By"  'git commit -m "fix

Co-Authored-By: Claude <noreply@anthropic.com>"'
tool_case allow "Write to docs"          Write "{\"file_path\":\"docs/x.md\",\"content\":\"$M is a phrase\"}"
tool_case allow "Edit to docs"           Edit "{\"file_path\":\"docs/x.md\",\"new_string\":\"$M\"}"
tool_case allow "slack read-only"        mcp__claude_ai_Slack__slack_read_channel "{\"channel_id\":\"C0 $M\"}"

echo "allow: fail-open cases and non-matches"
bash_case allow "read-only api scan"     "gh api repos/o/r/pulls/1/comments --jq 'select(.body|test(\"$M\"))'"
bash_case allow "stdin --input -"        "gh api repos/o/r/pulls/1/reviews --method POST --input -"
bash_case allow "unreadable path"        "gh pr comment 1 --body-file $fixtures/does-not-exist.md"
bash_case allow "unrelated command"      "ls -la"

echo
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]

---
id: how-to-group-messages-based-on-a-field-you-define
---

# How to group messages based on a field you define?
\<div class="article-wrapper\>
\<div class="article-body markdown\>

You can group messages together with a user-defined field using
the [Sessionize](../Search-Query-Language/Search-Operators/sessionize.md "sessionize") operator
(similar to transaction in Splunk). By defining multiple parse
expressions that match different kinds of log lines, you can weave
together the extracted fields into one session.

Here's an example:

`* | sessionize "Starting stream query with sessionId=*," as sessionId, "*$sessionId *" as (_1, _2), "Search delegate session started, sessionId=$sessionId,"`

In this query, the sessionize operator uses three parse expressions:

1.  The first matches the log entry. When the match occurs, it extracts
    the sessionId from that.
2.  The second parse expression matches the sessionId. The way the parse
    expression is written, it will match anything that has the same
    sessionId.
3.  The last log entry in the session is matched. Once this match
    occurs, the session is deemed to be complete and will not match any
    further logs.

All the fields extracted are also available as additional fields in the
UI and can be used for further analysis.
\</di\>
\</di\>

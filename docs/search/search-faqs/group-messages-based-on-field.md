---
id: group-messages-based-on-field
title: Group Messages Using a Defined Field
---

# How to group messages based on a field you define?

You can group messages together with a user-defined field using the [Sessionize](../search-query-language/search-operators/sessionize.md) operator (similar to transaction in Splunk). By defining multiple parse expressions that match different kinds of log lines, you can weave together the extracted fields into one session.

Here's an example:

```sql
* | sessionize "Starting stream query with sessionId=*," as sessionId, "*$sessionId *" as (_1, _2), "Search delegate session started, sessionId=$sessionId,"
```

In this query, the sessionize operator uses three parse expressions:

1. The first matches the log entry. When the match occurs, it extracts the sessionId from that.
1. The second parse expression matches the sessionId. The way the parse expression is written, it will match anything that has the same sessionId.
1. The last log entry in the session is matched. Once this match occurs, the session is deemed to be complete and will not match any further logs.

All the fields extracted are also available as additional fields in the UI and can be used for further analysis.

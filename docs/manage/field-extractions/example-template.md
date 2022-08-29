---
id: example-template
title: Example Template
---

**Rule Name:** Fake Log Parse

**Log Type:** Fake Log

**Rule Description:** Parse the email, sessionID and action type from a fake log message.

**Sample Log:**

```
12-12-2012 12:00:00.123 user="test@demo.com" action="delete" sessionID="145623"
```

**Extraction Rule:**

```
parse "user=\"*\" action=\"*\" sessionId=\"*\"" as user, action, sessionid
```

**Resulting Fields:**

| Field Name | Description | Example |
|--|--|--|
| user | User Email Address | `test@email.com` |
| action | Action performed by the user | Delete |
| sessionId | Session ID for user action | 145623 |

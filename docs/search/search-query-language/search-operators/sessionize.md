---
id: sessionize
title: sessionize Search Operator
sidebar_label: sessionize
---

The `sessionize` operator allows you to use an extracted value from one log message (generated from one system) to find correlating values in log messages from other systems. After you run `sessionize`, these related events are displayed on the same page. The thread of logs woven together is called a <i>session</i>.

Depending on your use case, you'd also use the [join](join.md) operator, which may be more appropriate and easier to use.

For example, let's say we have the value of a userRequestId, which entered a distributed system; the request goes through systems named Service, Stream, and Config:

![sessionize layout](/img/reuse/query-search/Sessionize_layout.png)

Each system generated log messages, so we know that at some point a failure occurred. We know the userRequestID value from the log files from the Service machine, and we know the serviceSessionId, streamRequestId, and configSessionId. Using **sessionize**, we can weave together these disparate logs to identify where the failure occurred.

:::note
Queries using sessionize can't be added to a Dashboard.
:::

## Syntax

```sql
sessionize ("<anchor pattern1>") as (<alias list1>), ("<anchor pattern2>") as (<alias list2>)
```

Where *anchor pattern* is like a parse anchor expression, except that it can include variables from previous expressions (using `$variableName`).

## Rules

* The sessionize operator is followed by more than one [anchor](/docs/search/search-query-language/parse-operators/parse-predictable-patterns-using-an-anchor) expression.
* Each anchor expression can be used to extract one or more variables from a matching log.
* You can use the extracted variable to join with a second log message containing that variable using a $variableName notation. Alternatively, logs matching an anchor expression will be inner joined on parsed fields in common with "partial sessions" which have matched the previous anchor expressions. Note that this means if you parse out a field which you expect to take on different values across logs within a single session, you must give that field a unique name in each anchor expression or the inner join will fail.

After using the [Trace](trace.md) operator to find related sessions, you can use the sessionize operator to refine the results.

## Example

Let's say we have two events that interest us in our Windows events:

* When users are logged off
* When someone restarts a session

These two events together for a system can reveal how problematic a particular Windows machine, domain, or logon ID can be.

In this example:

```sql
_sourceCategory=OS/Windows
 | sessionize "ComputerName = \"*\";\n\tEventCode = 4778;*Account Name:\t\t*\r*Account Domain:\t\t*\r*Logon ID:\t\t*\r" as (computerName,_11,userName,_u1,domain,_d1,logonID),
 "ComputerName = \"$computerName\";\n\tEventCode = 4779;*Account Name:\t\t$userName\r*Account Domain:\t\t$domain\r*Logon ID:\t\t*\r" as (_event2,_u2,_d2,_21)
```

1. Specify the search conditions that correlate the logs. In this example a simple `_sourceCategory` of all my Windows logs.
1. Extract the information relevant to the sessions you want to compare. In this case, we want to compare Windows disconnect events, code 4779 to reconnections, 4778 to see if someone disconnects, were they able to reconnect.

Here's an example of the results from this query:

![sessionize.png](/img/search/searchquerylanguage/search-operators/sessionize.png)

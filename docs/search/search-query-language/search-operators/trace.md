---
id: trace
title: trace Search Operator
sidebar_label: trace
---

The `trace` operator acts as a highly sophisticated filter to connect the dots across different log messages. You can use any identifying value with a trace operator, such as a user ID, IP address, or session ID, to retrieve a comprehensive set of activity associated to that original ID.

Trace operators require the following:

* [Regular expression](../parse-operators/parse-variable-patterns-using-regex.md) to find related messages.
* Starting value (for example, an ID).

## Syntax

```sql
trace "<regex>" "<starting_value>"
```

## Tracing session IDs

Let's say that your product uses a variety of session IDs to track requests as they flow through your system. Different components use a series of four-digit hexadecimal IDs to process a customer order, as shown here:

![trace_graphic 4.png](/img/search/searchquerylanguage/search-operators/trace_graphic.png)

Imagine that an error happened at some point in the process, generating an error including "PROCESSING FAILED: webID=7F92. Starting from this information, we can use a trace operator in our query to following the chain of activity:

```sql
* | trace "ID=([0-9a-fA-F]{4})" "7F92" | where _raw matches "*ERROR*"
```

This query tells trace how to identify the individual pieces of the chain, using the four-digit hexadecimal string following "ID=". Trace then scans incoming logs to connect the dots, building a chain based on IDs occurring together in the same log, starting from the value we supplied (7F92 in our example). So if trace observes a long, "Initiating requestID=082A for webID=7F92" it identifies the relationship between the webID we supplied with the requestID. Trace will continue to scan
logs, building the chain of events. Log messages unrelated to these values are disregarded.

## Tracing forward and backward in time

You can use a trace operator to trace events in the past or to track future events. In either case, a chain is built, finding links between log messages to determine activity based on whatever values you query. For our forward and backward trace operations, we're going to assume that a specific Windows computer has been compromised.

We want to build a chain of events from the compromised host to try to determine the identity of the hacker. To do this, we will need to:

1. Identify the relevant login messages.
1. Give the compromised host as the first value to match.
1. Extract other relevant values (src_host, dest_host, login_user).

## Tracing forward

We want to trace all Windows logins moving forward (+), starting from John's workstation (which may be compromised), to build a chain of events. We can use a trace operator query to produce the following results:

```
* "EventIdentifier 4624" "\nLogon Type:\t\t\t10" OR "\nLogon Type:\t\t\t2"| trace + "(?:Computer|Workstation )Name(?: = \"|:\\t)?(.+?)(?:\"|\s)" "JohnWorkstation.example.com" | extract "ComputerName = \"(?<dest_host>.+?)\"" | extract "Workstation Name:\\t(?<src_host>.+?)\s" | extract "New Logon:[\s\S]+?Account Name:\\t\\t(?<login_user>.*?)\s"
```

![trace_forward_example](/img/reuse/query-search/trace_forward_example.png)

Trace tells us that from John's Workstation there was a login event to WIN1.example.com, from which there was a login to WIN2.example.com and then to WIN3.example.com within the same time frame. While we may not know if these login events were from the same person, it helps to determine potentially affected hosts (especially since generic usernames were used as well as an Administrator).

## Tracing backward

We want to build a chain of events going backwards in time (-) from a compromised host, Win3.example.com, to try to determine the identity of the hacker. We want to trace all Windows logins moving backward, starting from Win3.example.com to build a chain of events. We can use a trace operator query to produce the following results:

```
* "EventIdentifier = 4624" "\nLogon Type:\t\t\t10" OR "\nLogon Type:\t\t\t3"| trace - "(?:Computer|Workstation )Name(?: = \"|:\\t)?(.+?)(?:\"|\s)" "WIN3.example.com" | extract "ComputerName = \"(?<dest_host>.+?)\"" | extract "Workstation Name:\\t(?<src host>.+?)\s" | extract "New Logon:[\s\S]+?Account Name:\\t\\t(?<login_user>.*?)\s"
```

![trace_backwards_example](/img/reuse/query-search/trace_backwards_example.png)

From these results, we can see that for WIN3.example.com there was a login event from WIN2.example.com from which there was another login event from WIN1.example.com. WIN1.example.com was logged into by John from his workstation, allowing us to identify the attacker.

---
id: transactionize-operator
title: Transactionize Operator
---



The **Transactionize** operator groups log messages that match on any fields you specify. The groups created from the specified fields become the **transactions**.

Unlike other "group by" operators, where the logs in a group must match on all defined fields, transactionize just needs one field to match in order to assign logs to the same group.

The match can be transitive, meaning that logs are grouped when messages have adjacent matching fields. For example, all of the following logs would be grouped in a transactionize query:

A, , , ...  
A, B, , ...  
, B, C, ...

In search results, the transactionize operator adds transaction fields. The fields are named starting with the specified alias prefix, or "_group" if no alias is specified. Transactionize adds the following fields:

* `_group.` An integral value unique to each group.
* `_group_duration`. The duration of the transaction in milliseconds.
* `_group_size.` The number of log messages in the transaction.
* `_group_orphaned.` You can set when a field is not a member of the transaction, but you want to keep it for comparison or analysis by setting the`keepOrphans`` `parameter (described below in [Parameters](#parameters) below) to true.
* `_group_signature.` DEPRECATED. Use the [merge operator](merge-operator.md) in the subquery instead.

## Syntax

* `transactionize <field>, <field>, <field> [as <field>]`
* `transactionize <field> [as <field>] [<subquery>]`  
    where `[<subquery>]` is executed on the results of the query for
    each group, independently.
* `transactionize <field> [as <field>] <parameter> [<subquery>]`

### Parameters

Parameters must follow the `as \<field\>]` clause, as shown in the above
Syntax section. For example,   

```sql
| transactionize accountId as account maxlogs = 10
```

| Parameter | Description |
| :-- | :-- |
| `maxSpan = [time]` | The transaction ends if the transaction duration exceeds the specified time. Time may be specified in various units, such as 1s, 1m, and so on. |
| `maxPause = [time]` | The transaction ends if the time between log messages exceeds the specified time. Time may be specified in various units, such as 1s, 1m, and so on. |
| `maxLogs = [n]` | The transaction ends if the number of log messages in the transaction exceeds the specified number.
| `startsWith = [string] [;strict]` | Log messages that match the string start a new transaction. Example: `startsWith="foo"`<br/>By default, this is not strictly enforced and results could include groups that do not start with the specified string. The `;strict` option ensures any non-matching groups are not included. |
| `endsWith = [string] [;strict]` | Log messages that match the string end the current transaction. Example: `endsWith="foo";strict`<br/>By default, this is not strictly enforced and results could include groups that do not end with the specified string. The `;strict` option ensures any non-matching groups are not included. |
| `keepOrphans = [true or false]` | true by default. Useful when a field is not a member of the transaction, but you want to keep it for comparison or analysis.​​​​|

## Limitations

* Transactionize can analyze 50MB of raw logs at a time. When the buffer exceeds this limit, older transactions leaving the buffer might not be grouped with recent transactions entering the buffer, yielding results that might not be grouped correctly. If this is the case, you will get a warning message that reads:  

    `The transactionize operator has reached its memory limit; transactions could be emitted prematurely.`  

    To address this situation, try one or more of these options:
    * Reduce the [time range](/docs/search/get-started-with-search/build-search/set-time-range.md) of your search to reduce the scope.
    * Reduce the scope of your search by using parameters (such as `maxlogs`, `maxspan`, or `endswith`) that are listed above in the [Parameters](#parameters) section.
    * Run a second transactionize operator immediately after your first one. This will take the potentially ungrouped messages of your first transactionize search and group them correctly.  
         
* Transactionize is not supported in [Dashboard Live mode](../../../dashboards/restricted-operators-dashboards.md#live-mode-restrictions).
* Transactionize is not supported in [Real Time scheduled searches](../../../alerts/scheduled-searches/create-real-time-alert.md).

## Example

### Use session IDs to group logs that belong to a request

Let’s say we are working with logs from a distributed system, where a request passes through several different systems. Each system provides its own session ID in its logs (in addition to the session ID of other systems that communicate with a system).

With that in mind, the logs could look similar to:

```
[system=001] [sessionId=a39eb7] processing request
[system=002] [sessionId=982c8d] accepting request from system=001 with sessionId=a39eb7
[system=002] [sessionId=982c8d] processing
[system=003] [sessionId=3b7af9] accepting request from system=001 with sessionId=a39eb7
[system=003] [sessionId=3b7af9] processing
```

To group the logs that belong to the same request, we can use parse
nodrop to extract each session ID, then run transactionize to group the
logs with a query similar to:

```sql
| parse "[system=001] [sessionId=*]" as system1Id nodrop
| parse "[system=002][sessionId=*]" as system2Id nodrop
| parse "[system=003][sessionId=*]" as system3Id nodrop
| parse "system=001 with sessionId=*" as system1Id nodrop
| transactionize system1Id, system2Id, system3Id
```

For example:

![transactionalize.png](/img/search/searchquerylanguage/transaction-analytics/transactionalize.png)

:::note
To see an example of using the transactionize operator with merge, see [Merge Operator](merge-operator.md). 
:::

---
id: transactionize-operator
---

# Transactionize Operator

The **Transactionize** operator groups log messages that match on any
fields you specify. The groups created from the specified fields become
the **transactions**.

Unlike other "group by" operators, where the logs in a group must match
on all defined fields, transactionize just needs one field to match in
order to assign logs to the same group.

The match can be transitive, meaning that logs are grouped when messages
have adjacent matching fields. For example, all of the following logs
would be grouped in a transactionize query:

A, , , ...  
A, B, , ...  
, B, C, ...

In search results, the transactionize operator adds transaction fields.
The fields are named starting with the specified alias prefix, or
"\_group" if no alias is specified. Transactionize adds the following
fields:

* **\_group.** An integral value unique to each group.
* **\_group_duration**. The duration of the transaction in
    milliseconds.
* **\_group_size.** The number of log messages in the transaction.
* **\_group_orphaned.** You can set when a field is not a member of
    the transaction, but you want to keep it for comparison or analysis
    by setting the`keepOrphans`` `parameter (described below in
    [Parameters](./Transactionize-operator.md "Transactionize Operator") below)
    to true.
* **\_group_signature.** DEPRECATED. Use the [merge
    operator](Merge-Operator.md "Merge operator") in the subquery
    instead.

### Syntax

* `transactionize \<field\>], \<field\>], \<field\>] [as\<fiel\>]`
* `transactionize \<field\>] [as\<fiel\>] [\<subquer\>)]`  
    where `\<subquer\>]` is executed on the results of the query for
    each group, independently.
* `transactionize \<field\>] [as\<fiel\>] \<parameter\>] [\<subquer\>)]`

#### Parameters

Parameters must follow the `as \<fiel\>]` clause, as shown in the above
Syntax section. For example,   
`         | transactionize accountId as account maxlogs = 10`

[TABLE]

### Limitations

* Transactionize can analyze 50MB of raw logs at a time. When the
    buffer exceeds this limit, older transactions leaving the buffer
    might not be grouped with recent transactions entering the buffer,
    yielding results that might not be grouped correctly. If this is the
    case, you will get a warning message that reads:  
      
    `The transactionize operator has reached its memory limit; transactions could be emitted prematurely.`  
      
    To address this situation, try one or more of these options:
    * Reduce the [time
        range](../../Get-Started-with-Search/How-to-Build-a-Search/Set-the-Time-Range.md "Set the Time Range") of
        your search to reduce the scope.
    * Reduce the scope of your search by using parameters (such as
        `maxlogs`, `maxspan`, or `endswith`) that are listed above in
        the
        [Parameters](./Transactionize-operator.md "Transactionize Operator")
        section.
    * Run a second transactionize operator immediately after your
        first one. This will take the potentially ungrouped messages of
        your first transactionize search and group them correctly.  
         
* Transactionize is not supported in [Dashboard Live
    mode](../../../Visualizations-and-Alerts/Dashboards/Restricted_Operators_in_Dashboards.md "Restricted Operators in Dashboards").
* Transactionize is not supported in [Real Time scheduled
    searches](../../../Visualizations-and-Alerts/Alerts/Scheduled-Searches/Create_a_Real_Time_Alert.md "Create a Real Time Alert").

### Example

#### Use session IDs to group logs that belong to a request

Let’s say we are working with logs from a distributed system, where a
request passes through several different systems. Each system provides
its own session ID in its logs (in addition to the session ID of other
systems that communicate with a system).

With that in mind, the logs could look similar to:

    [system=001] [sessionId=a39eb7] processing request
    [system=002] [sessionId=982c8d] accepting request from system=001 with sessionId=a39eb7
    [system=002] [sessionId=982c8d] processing
    [system=003] [sessionId=3b7af9] accepting request from system=001 with sessionId=a39eb7
    [system=003] [sessionId=3b7af9] processing

To group the logs that belong to the same request, we can use parse
nodrop to extract each session ID, then run transactionize to group the
logs with a query similar to:

`| parse "[system=001] [sessionId=*]" as system1Id nodrop  | parse "[system=002][sessionId=*]" as system2Id nodrop  | parse "[system=003][sessionId=*]" as system3Id nodrop  | parse "system=001 with sessionId=*" as system1Id nodrop  | transactionize system1Id, system2Id, system3Id`

For example,

![transactionalize.png](../../static/img/search-query-language/Transaction-Analytics/Transactionize-operator/transactionalize.png)

To see an example of using the transactionize operator with merge,
see [Merge Operator](Merge-Operator.md "Merge Operator"). 

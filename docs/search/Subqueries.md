---
id: subqueries
---

# Subqueries

Subqueries allow you to filter and evaluate conditions for a query when
you may not be sure of the exact filter or condition criteria but you
can write a short query to set them for you. Subqueries use one query to
pass results back to another query to narrow down or evaluate the set of
messages that are searched in that query. Sometimes this offers a faster
approach than a join, where you would have to unite large sets of data
and then search through the results to form a conclusion. If you can do
some processing to narrow down the scope of data, you can form a
subquery.

Subqueries are not supported in live dashboards, real-time Scheduled
Searches, Field Extraction Rules, and Scheduled Views.

In a subquery, the parent query contains the main body of the query
while the child query contains the results necessary for filtering the
parent query.

* **Child query.** Handles the filtering. Runs first and provides
    intermediate input for the parent query. You can specify a different
    time range than the parent query.
* **Parent query.** Depends on the input from a child query or queries
    to finish its execution.

Subqueries are a really powerful way to filter for specific criteria,
such as behaviors by a malicious actor, or the shopping interests of
your most effective user. Unfortunately you are running two, and
sometimes multiple standalone queries to generate results. You have to
factor in time for all of these queries to complete.

### Syntax

You can use subqueries in the [search
expression](Get-Started-with-Search/How-to-Build-a-Search/Keyword-Search-Expressions.md "Keyword Search Expressions")
of your query (before the first pipe, \|) and
with [where](Search-Query-Language/Search-Operators/where.md "where") and
[if](Search-Query-Language/Search-Operators/if-operator-and.md "if operator and ?")
operators.

This syntax uses square brackets `[ ]` to wrap a subquery. Normally
these indicate an [optional
argument](../01Start-Here/03About-Sumo-Logic/Help_Documentation_Styles.md "Help Documentation Styles"),
however these highlighted brackets are required for subqueries.

**Search expression syntax:**

`Parent query [subquery [from=\<fromTim\>)] [to=\<toTim\>)] :\<child quer\> | compose\<field\>[,\<field\>, ...] [maxresults\<in\>] [keywords] ] Rest of parent query`

**Where operator syntax:**

`Parent query`  
`| where [subquery [from=\<fromTim\>)] [to=\<toTim\>)] :\<child quer\> | compose\<field\>[,\<field\>, ...] [maxresults\<in\>] ] Rest of parent query`

You can use the not `!` option using the [where
operator](Search-Query-Language/Search-Operators/where.md "where")
syntax, like `| where !\<subquer\>]` .

**If operator syntax:**

`Parent query | if ( [subquery [from=\<fromTim\>)] [to=\<toTim\>)] :\<child quer\> | compose\<field\>[,\<field\>, ...] [maxresults\<in\>] ] ,�\<value_if_tru\>,\<value_if_fals\> ) as\<fiel\> Rest of parent query`

You can use the not `!` option using the [if
operator](Search-Query-Language/Search-Operators/if-operator-and.md "if operator and ?")
syntax, like `| if !(\<subquer\>],1,0) as\<fiel\>` .

The `parent query` can be any query that returns results. Always test it
before you add the child query.

#### Required arguments

`compose` controls the output of the child query that is provided to the
parent query:

compose is not considered a standalone operator. It is designed to only
work with a subquery.

* ** Fields from the child query that are returned to the parent
    query.** You can return more than one field to the parent query.
*  **Format in which the values are returned.** Results of the given
    field are converted from tabular results into standard disjunctive
    normal form format.

For example, if the subquery generated the following results:

| \_sourcehost  | \_sourcecatagory | clientip    |
|---------------|------------------|-------------|
| prod-search-1 | stream           | 1.1.1.1     |
| prod-remix-1  | remix            | 10.10.10.10 |

This would be converted to a single output as follows:

`(( _sourcehost="prod-search-1" AND _sourcecatagory=”stream” AND clientip=”1.1.1.1”) OR (_sourcehost=”prod-remix-1” AND _sourcecatagory=”remix” AND clientip=”10.10.10.10”))`

* Results have `AND` between columns and `OR` between rows.
* Each row is wrapped in parenthesis `( )` and all results are
    wrapped inside another parenthesis `( )`.

#### Optional arguments

`from=\<fromTim\>) to=\<toTim\>)`  The `subquery` can contain a
different time range for the child query. By default, the child query
runs on the same time range as the parent query. You can specify either
relative time or absolute time. See [subquery with a different time
range](./Subqueries.md "Subqueries") for examples and supported formats.

`maxresults\<in\>`  You can limit the number of results returned from
the child to the parent query. To increase performance, we've made the
default 2,500, but you can get up to 10,000 results.

The warning message "Subquery returned more records than your current
limit allows. Some records might be truncated. You can increase your
limit." pertains to this argument. You can adjust your limit to allow
more records at the expense of performance.

`keywords`  If the keywords clause is *not* specified then the results
are returned with the field names, as key-value pairs back to the
parent, so those fields should be present in the parent as well in order
for it to work properly.

The keywords clause is not supported with `where` and `if` operations.

Specifying `keywords` will only return the values from the key-value
pairs, where the key is the field name. For example, if the subquery
generated the following results:

| \_sourcehost  | \_sourcecatagory | clientip    |
|---------------|------------------|-------------|
| prod-search-1 | stream           | 1.1.1.1     |
| prod-remix-1  | remix            | 10.10.10.10 |

This would be converted to a single output as follows:

`((”prod-search-1” AND ”stream” AND ”1.1.1.1”) OR (”prod-remix-1” AND ”remix” AND ”10.10.10.10”))`

The results only contain the values from the key-value pairs, the keys
(field names) are not returned. This is useful when you want to match by
literal values and not the existing (already parsed) fields in the
parent query.

### Limitations

* You have a maximum of 10,000 unique results (rows) from the child
    query and you are limited to 100MB of memory to return those
    results. If you see the error message:  
    `    Subquery reached the maximum memory limit. Some records will be truncated.`   
    you've reached your maximum results or memory limit for your child
    query.
* The Log Search view does not present a histogram for child queries.
    The histogram that appears represents only the parent query.
* Everything returned from the API will be from the final output.
    Child data is not returned.
* [Receipt
    Time](Get-Started-with-Search/How-to-Build-a-Search/Use-Receipt-Time.md "Use Receipt Time")
    is not supported.
* Subquery is not supported in the following cases:
    * In Scheduled Views
    * Inside FERs
    * Live Dashboards
    * Real Time Scheduled Searches

### Example subquery 

Let’s say that our company has a shopping website, and we want to track
purchases made by our most active user. We can use `subquery` in this
case to get the desired results using the following steps:

1.  Create a query that gives us items checked out and items purchased
    by a specific user (parent query).
2.  Create a query that tracks the most active user on the website
    (child query).
3.  Using subquery, pass the user_id or user_ip from the child query to
    the parent query, so that the complete workflow happens within a
    single query.

#### Step 1: Create a parent query

Our parent query provides statistics such as items checked out, and
items purchased for a given user. For this example we are tracking users
through their IP address using the following query over our custom
application logs.

`_sourceCategory=reinvent/travel/checkout 243.63.233.30 | json field=_raw "funcName" | where funcname in ("process_cart","charge") | if (funcname = "process_cart" , "Checkout", "Purchased") as funcname | count by funcname`

With a subquery, we can pass the IP address that is highlighted from a
child query to this parent query as a keyword in its search expression.

![clipboard_e5a557c6cd8e8097e79c1598416032d8a.png](./static/img/Subqueries/clipboard_e5a557c6cd8e8097e79c1598416032d8a.png)

#### Step 2: Create a child query

Our child query provides the most active user, and we track it using IP
addresses in our web server logs using this query:

`_sourceCategory=reinvent/travel/nginx       | count by src_ip       | topk(1,_count)`

 The result of this query has the IP address (243.63.233.30) we want to
pass to the parent query.

![clipboard_ef2185c81c2d257a45fd46a6f5b9c178c.png](./static/img/Subqueries/clipboard_ef2185c81c2d257a45fd46a6f5b9c178c.png)

#### Step 3: Create a subquery

Combine the two queries into a subquery to allow the parent query to
harness the child query results. There are a few approaches to the
subquery:

* Include `keywords` so the IP address from the child query is used as
    a keyword in the search expression (before the first pipe, \|).
* Exclude the `keywords` argument so results are returned as a table,
    in key-value pairs, note that any fields (keys) returned must exist
    in the parent query results.
* Use a subquery with a `where` or `if` operator.
    * If you filter the IP address in a `where` clause then you can
        substitute it with a subquery that dynamically generates the
        filter expression.
    * If you use the IP address as an `if` condition you can assign
        values to a new field based on if the condition is returned as
        true or false.

##### Keywords

With keywords, you can replace the IP address (243.63.233.30) from the
parent query with a child query.  
  
`_sourceCategory=reinvent/travel/checkout [subquery:_sourceCategory=reinvent/travel/nginx      | count by src_ip      | topk(1,_count)      | compose src_ip keywords ] | json field=_raw "funcName" | where funcname in ("process_cart","charge") | if (funcname = "process_cart" , "Checkout", "Purchased") as funcname | count by funcname`

Since we only want to pass the IP address back as a keyword we
specified the `src_ip` field and the `keywords` argument with `compose`.

![clipboard_e7da7cf36d758ecbd8383b8f6ff641261.png](./static/img/Subqueries/clipboard_e7da7cf36d758ecbd8383b8f6ff641261.png)

##### Without keywords

If the parent query had the IP address specified with a field, such as
`src_ip=243.63.233.30`, where `src_ip` is the field name, you can also
replace it in the parent query with the child query.  
  
`_sourceCategory=reinvent/travel/checkout [subquery:_sourceCategory=reinvent/travel/nginx      | count by src_ip      | topk(1,_count)      | compose src_ip ] | json field=_raw "funcName" | where funcname in ("process_cart","charge") | if (funcname = "process_cart" , "Checkout", "Purchased") as funcname | count by funcname`

##### Where

To use a filter condition we need the parent query to also return the
same field name as the child query. Either parse the field manually in
the query or rely on log metadata.

A query using a filter operator like `where` may take longer to run than
a query that defines the filter within its search expression. See [best
practices](./Subqueries.md "Subqueries") for an example.

Once the parent query is ready and recognizes the same field name, in
this case `src_ip`, simply place the child query in the query as the
where filter expression. As mentioned in the syntax section, `keywords`
is not supported with where operations.

`_sourceCategory=reinvent/travel/checkout | json field=_raw "source_ip" as src_ip | json field=_raw "funcName" | where funcname in ("process_cart","charge") | where [subquery:_sourceCategory=reinvent/travel/nginx       | count by src_ip       | topk(1,_count)| compose src_ip] | if (funcname = "process_cart" , "Checkout", "Purchased") as funcname | count by funcname`

![clipboard_e80b31772b236645f5e6ae1417b9c7653.png](./static/img/Subqueries/clipboard_e80b31772b236645f5e6ae1417b9c7653.png)

##### If

You can use a subquery in an if operation since it can return a valid
conditional statement, such as A=B. To evaluate a condition as either
true or false you need the parent query to also return the same field
name as the child query. Either parse the field manually in the query or
rely on log metadata.

A query using a filter operator like `if` may take longer to run than a
query that defines the filter within its search expression. See [best
practices](./Subqueries.md "Subqueries") for an example.

Once the parent query is ready and recognizes the same field name, in
this case `src_ip`, place the child query in the parent query as the if
condition. As mentioned in the syntax section, `keywords` is not
supported with if operations.

The following will create a field named `boolean` that is returned
as true or false based on if our most active user's IP address is found.
The subquery will return `(src_ip="243.63.233.30")` and the if
operator checks it against the logs from the parent query, in this case,
true if the src_ip is the same as the log evaluated from the parent
query.

`_sourceCategory=reinvent/travel/checkout | json field=_raw "source_ip" as src_ip | json field=_raw "funcName" | where funcname in ("process_cart","charge") | if ( [subquery:_sourceCategory=reinvent/travel/nginx       | count by src_ip       | topk(1,_count)| compose src_ip], true, false) as boolean | if (funcname = "process_cart" , "Checkout", "Purchased") as funcname | count by funcname`

### Subquery with a different time range

By default, the child query runs on the same time range as the parent
query, but it can be customized. You can specify either relative time or
absolute time.

Use both `from` and `to`, as shown below to explicitly specify a time
range. Only the highlighted brackets `[ ]` are required, the rest
indicate optional arguments.

`Parent query [subquery [from=\<fromTim\>)] [to=\<toTim\>)] :\<child quer\> | compose\<field\>[,\<field\>, ...] [maxresults\<in\>] [keywords] ]`  
`Rest of parent query`

To specify a relative time range, only provide the `from` argument. See
the following section for an example.

#### Time range usage examples

**Relative**

`[subquery from=(-15m):error | count by _sourcehost | topk(1, _count) | compose _sourceHost] | count by _sourceHost`

**Absolute**  
`[subquery from=(2018/07/08 23:13:36) to=(2018/07/09 23:13:36):error | count by _sourcehost | topk(1, _count) | compose _sourceHost] | count by _sourceHost`

#### Supported time formats

**Relative **

* s - seconds
* m - minute
* h - hour
* d - day
* w - week

**Epoch**

Timestamp in millis since 01/01/1970 00:00:00.000 UTC

**Absolute Time**

We support the ISO 8601 format. 

* yyyy-MM-dd HH:mm:ss.SSS
* yyyy-MM-dd HH:mm:ss
* yyyy-MM-dd HH:mm
* yyyy-MM-dd
* MM-dd HH:mm:ss.SSS
* MM-dd HH:mm:ss
* MM-dd HH:mm
* MM-dd
* yyyy/MM/dd HH:mm:ss.SSS
* yyyy/MM/dd HH:mm:ss
* yyyy/MM/dd HH:mm
* yyyy/MM/dd
* MM/dd HH:mm:ss.SSS
* MM/dd HH:mm:ss
* MM/dd HH:mm
* MM/dd

### Examples

#### Better Alerting with Subquery

Generally, when you build an alert you have to perform some complex
calculations to make sure that alerts only fire when something goes
wrong. These complex calculations are only required for alert firing,
but are generally not required in the actual results that are returned
from the alert.

Before subquery, this level of detail was not possible in your alerts,
but with Subquery you can easily get it. For example, you want to get
alerted whenever you have an issue deploying an index. First, see if
there is a given index was not successfully deployed even after retrying
`_count\> 3`, if that happens the subquery will send useful information
about the given index, like which host it was deployed on.

`_sourceCategory=search "error while retrying to deploy index" | parse \",name=*-*\" as cus, index | where [subquery: _sourceCategory=search "error while retrying to deploy index" ``!info          | parse ",indexName='*-*'" as cus, index``         | count by index // Ignore cases where retry might have happened.          | where _count\> 3          | compose by index] | count by _sourceHost, cus, index`

#### Check Malicious Activity with Subquery

The following search allows a security analyst how to track logs related
to a malicious IP address that was flagged by Amazon GuardDuty and also
by a CrowdStrike Threat feed. The subquery is returning the
field `src_ip` with the IP addresses deemed as threats to the parent
query, note that the keywords option was not used so the parent query
will expect a field src_ip to exist. The results will include logs from
the weblogs sourceCategory that have a `src_ip` value that was deemed a
threat from the subquery.

`_sourceCategory=weblogs [subquery:_sourceCategory="Labs/SecDemo/guardduty" "EC2 Instance" "communicating on an unusual server port 22" | json field=_raw "service.action.networkConnectionAction.remoteIpDetails" as remoteIpDetails | json field=_raw "service.action.networkConnectionAction.connectionDirection" as connectionDirection | where connectionDirection = "OUTBOUND" | json field=remoteipdetails "ipAddressV4" as src_ip | lookup type, actor, raw, threatlevel from sumo://threat/cs on src_ip=threat | where threatlevel = "high" | compose src_ip]`

#### Reference data from child query using save and lookup

When you want to correlate data from different sources or conduct
further aggregation on data from a child query without passing it with
compose, since it would act upon the scope of the query limiting
results, you can use the
[save](Search-Query-Language/Search-Operators/save-lookups-classic.md "save")
and
[lookup](Search-Query-Language/Search-Operators/lookup-classic.md "lookup")
operators to get the data you need in the parent query.

This query identifies specific sessions and correlates them to status
messages across services from different data sources:

`_sourceCategory=katta  [subquery:(_sourceCategory=stream explainJSONPlan.ETT) error       | where !(statusmessage="Finished successfully" or statusmessage="Query canceled" or isNull(statusMessage))       | count by sessionId, statusMessage       | fields -_count       | save /explainPlan/neededSessions       | compose sessionId keywords] | parse "[sessionId=*]" as sessionId | lookup statusMessage from /explainPlan/neededSessions on sessionid=sessionid`

This query identifies transaction errors and correlates them with
shipping information from another data source:

`[subquery: _source=sourceA and ("Transaction Error") | parse "message=* )" as MsgTxt | parse "transaction *\\\"" as trans_id | save /transactions/errors | compose trans_id keywords  ]  _source=sourceB | parse "name: SHIPPER_ID\n value: *\n}" as shipper_id | parse "transaction *\\\"" as trans_id | lookup MsgTxt from /transactions/errors on trans_id=trans_id | count by shipper_id`

Best practices

Here are a few tips and tricks to help you have a smoother experience
with subqueries.

These concepts are covered in [How to Build a
Search](Get-Started-with-Search/How-to-Build-a-Search.md "How to Build a Search")
documents.

* Your queries will perform better if you have the child query in the
    search expression (before the first pipe, \|), rather than having it
    in the filter clause. The below examples highlight this point. In
    the first, we use subquery before the first pipe and it executes in
    17 seconds:  
    ![17seconds.png](./static/img/Subqueries/17seconds.png)  
    compare that to where subquery is used in the where clause and you
    can see it takes 29 seconds to execute:  
    ![29Seconds.png](./static/img/Subqueries/29Seconds.png)
* If the child query is used to build the filter clause, try having
    the filter clause close to the search expression ( rather than
    having it further down in the query to improve performance. Your
    query should be more like the one on the right.
\<div dir="ltr" style="margin-left:0pt;\>

[TABLE]
\</di\>

* Run the child query in a separate tab first. Append the compose
    operator at the end of that query to check the results that are
    returned. When you are happy with the query, copy it into your main
    subquery. This pre-testing reduces the chances of creating queries
    that generate incorrect results. The screenshot shows how you can
    build your child query in a separate tab using compose operator.

![GuardDuty.png](./static/img/Subqueries/GuardDuty.png)

* If the subquery is generating too many records, try reducing the
    time range of the query.
* If the subquery returns more than 10000 results or exceeds the 100MB
    memory limit, you will receive the following error message:  
    `Subquery reached the maximum memory limit. Some records will be truncated.`  
    If this happens, narrow the scope of your child query or reduce the
    number of results allowed in maxResults.

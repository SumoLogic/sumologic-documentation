---
id: optimize-search-performance
title: Optimize Search Performance
---

Search optimization tools speed the search process, delivering query results in less time and improving productivity for forensic analysis and log management.

Search speed generally depends on the amount of data and the type of query run against the data. Search optimization tools segment the data and queue it up for quick results.

An **index**, or proper subset of the data, is central to search optimization. When you run a search against an index, search results are returned more quickly and efficiently because the search is run against a smaller data set.

Sumo Logic supports index-based and field-based methods for search optimization.

Even with these methods, you need to ensure you are following our [best practices for queries](get-started-with-search/build-search/best-practices-search.md).

## Index-based methods

* [**Partitions**](/docs/manage/partitions) route unstructured data into an index (see also: [How to Optimize Your Search with Partitions](/docs/search/optimize-search-partitions))
* [**Scheduled Views**](/docs/manage/scheduled-views) pre-aggregate data and then index it

## Metadata methods

With metadata tags assigned to your logs you can reference them in the [scope (keyword search expression)](get-started-with-search/build-search/keyword-search-expressions.md) of queries to drastically increase search performance.

import MetadataEn from '../reuse/metadata-data-enrichment.md';

<MetadataEn/>

## Search optimization process

When data enters Sumo Logic, search optimization is done in the
following order:

1. Metadata is applied to your data as [Fields](/docs/manage/fields). The order of precedence for field assignment from highest to lowest is. 
    * Field Extraction Rule (FER)
    * Amazon EC2 resource tags
    * Amazon EC2 instance information
    * HTTP Header
    * Source
    * Collector
1. Partitions and Scheduled Views are applied. If both Partitions and Scheduled Views are defined, the Partitions are applied first.
1. The data is indexed.
1. The optimized and indexed data is available for use with other Sumo Logic features.

## Is there such a thing as creating too many indexes?

Yes. Indexes can be overused, and in some situations, they can even slow the search process. When designing your organization's indexes, think about the minimal amount of data it makes sense to index, regardless of the tool. When running a search on non-indexed data, Sumo Logic might need to process all indexed data as well, which can take a long time.

## How do Partitions and Scheduled Views differ?

Partitions begin building a **non-aggregate** index from the date a Partition started, only indexing data moving forward.

Scheduled Views **backfill**, meaning that all data that extends back to the start date of the Scheduled View can be queried.

## Choosing the right indexed search optimization tool

Here's a quick look at how to choose the right indexed search optimization tool.

| I want to... | Partition | Scheduled View |
| :-- | :-- | :-- |
| Run queries against a certain set of data | Choose if the quantity of data to be indexed is more than 2% of the total data. | Choose if the quantity of data to be indexed is less than 2% of the total data. |
| Use data to identify long-term trends |   | Yes |
| Segregate data by _sourceCategory | Yes |   |
| Have aggregate data ready to query |   | Yes |
| Use RBAC to deny or grant access to the data set | Yes | Yes |
| Reuse the fields that I'm parsing for other searches against this same _sourceCategory |   |   |

## How is data added to Partitions and Scheduled Views?

As data enters Sumo Logic, it is first routed to any Partitions for indexing. It is then checked against Scheduled Views, and any data that matches the Scheduled Views is indexed.

Data can be in both a Partition and a Scheduled View because the two tools are used differently (and are indexed separately). Although Partitions are indexed first, the process does not slow the indexing of Scheduled Views.

## Additional methods to optimize Search performance

### Use the smallest Time Range

Always set the search time range to the minimum duration required for your use case. This reduces the data volume and improve the query efficiency. When working with long time ranges, start by building and testing your search on a shorter time range. Once the search is finalized and validated, extend it to cover the entire period needed for your analysis. 

### Use fields extracted by FERs

Instead of relying on the `where` operator, filter the data using fields that are already extracted through the Field Extraction Rules (FERs) in the source expression. This approach is more efficient and improves query performance.

**Recommended approach:**

```
sourceCategory=foo and field_a=value_a
```

**Not recommended approach:**

```
_sourceCategory=foo
| where field_a="value_a"
```

### Move terms from parse statement to source expression

Adding the parsing terms in the source expression will help you enhance the search performance. A parse statement without `nodrop` drops the logs that could not parse the desired field. For example, `parse “completed * action“ as actionName` will remove logs that do not have **completed** and **action** terms. 

**Recommended approach:**

```
_sourceCategory=Prod/User/Eventlog completed action
| parse “completed * action“ as actionName
| count by actionName
```

**Not recommended approach:**

```
_sourceCategory=Prod/User/Eventlog
| parse “completed * action“ as actionName
| count by actionName
```

### Filter data before aggregation

While filtering the date, reduce the result set to the smallest possible size before performing aggregate operations such as sum, min, max, and average. Also, use subquery in source expression instead of using `if` or `where` search operators. 

**Recommended approach:**

```
_sourceCategory=Prod/User/Eventlog userName
| parse “userName: *, “ as user
| where user="john"
| count by user
```

**Not recommended approach:**

```
_sourceCategory=Prod/User/Eventlog
| parse “userName: *, “ as user
| count by user
| where user="john"
```

### Remove redundant operators

Remove the search operators in the query that are not referred or is not really required for the desired results. 

For example, let’s say you have a `sort` operator before an aggregation and this sorting does not make any difference to the aggregated results, resulting in reducing the performance. 

**Recommended approach:**

```
_sourceCategory=Prod/User/Eventlog
| parse “userName: *, “ as user
| count by user
```

**Not recommended approach:**

```
_sourceCategory=Prod/User/Eventlog
| parse “userName: *, “ as user
| parse “evenName: *, “ as event
| count by user
```

### Merge operators

If the same operators are used multiple times in different levels of query, if possible, try to merge these similar operators. Also, do not use the same operator multiple times to get the same value. This helps in reducing the number of passes performed on the data thereby improving the search performance.

**Example 1:**

    **Recommended approach:**

    ```
    _sourceCategory=Prod/User/Eventlog
    | parse “completed * action in * ms“ as actionName, duration
    | pct(duration, 95) by actionName
    ```

    **Not recommended approach:**

    ```
    _sourceCategory=Prod/User/Eventlog
    | parse “completed * action“ as actionName
    | parse “action in * ms“ as duration
    | pct(duration, 95) by actionName
    ```

**Example 2:**

    **Recommended approach:**

    ```
    _sourceCategory=Prod/User/Eventlog
    | parse “completed * action“ as actionName
    | toLowerCase(actionName) as actionNameLowered
    | where actionNameLowered = “logIn” or actionNameLowered matches “abc*” or actionNameLowered contains “xyz”
    ```

    **Not recommended approach:**

    ```
    _sourceCategory=Prod/User/Eventlog
    | parse “completed * action“ as actionName
    | where toLowerCase(actionName) = “logIn” or toLowerCase(actionName) matches “abc*” or toLowerCase(actionName) contains “xyz"
    ```

### Use lookup on the lowest possible dataset

Minimize the data processed by the `lookup` operator in the query, as lookup is an expensive operation. It can be done in two ways:

- Use the lookup as late as possible in the query assuming that clauses before lookup are doing additional data filtering.
- Move the lookup after an aggregation to drastically reduce the data processed by lookup, as aggregated data is generally far less than non-aggregated data.

**Not recommended approach:**

```
_sourceCategory=Prod/User/Eventlog
| parse “completed * action in * ms“ as actionName, duration
| lookup actionType from path://"/Library/Users/myusername@sumologic.com/actionTypes" on actionName
| where actionName in (“login”, “logout”)
| count by actionName, actionType
```

**Recommended approach (Option 1):**

```
_sourceCategory=Prod/User/Eventlog
| parse “completed * action in * ms“ as actionName, duration
| where actionName in (“login”, “logout”)
| count by actionName
| lookup actionType from path://"/Library/Users/myusername@sumologic.com/actionTypes" on actionName
```

**Recommended approach (Option 2):**

```
_sourceCategory=Prod/User/Eventlog
| parse “completed * action in * ms“ as actionName, duration
| where actionName in (“login”, “logout”)
| lookup actionType from path://"/Library/Users/myusername@sumologic.com/actionTypes" on actionName
| count by actionName, actionType 
```

### Avoid multiple parse multi statements

A parse `multi` statement causes a single log to produce multiple logs in the results. But if a parse `multi` statement is followed by more parse `multi` statements, it can lead to data explosion and the query may never finish. Even if the query works the results may not be as expected.

For example, consider the below query where the assumption is that a single log line contains multiple users and multiple event names.

```
_sourceCategory=Prod/User/Eventlog
| parse regex “userName: (?<user>[a-z-A-Z]+), “ multi
| parse regex “eventName: (?<event>[a-z-A-Z]+), “ multi
```

But if you write the query like that, it will generate a result for every combination of `userName` and `eventName` values. Now suppose you want to count by `eventName`, it will not give you the desired result, since a single `eventName` has been duplicated for every `userName` in the same log. So, the better query would be:

```
_sourceCategory=Prod/User/Eventlog
| parse regex “userName: (?<user>[a-z-A-Z]+), eventName: (?<event>[a-z-A-Z]+), “ multi
```



---
id: best-practices-search
title: Best Practices for Searches
description: Use these easy to follow rules to get the most out of your Sumo Logic searches.
---

Use these easy-to-follow rules to get the most out of your Sumo Logic searches.

## Be specific with search scope

At a minimum, all searches should use one or more [metadata](../search-basics/built-in-metadata.md) tags in the scope, for example:  `_sourceCategory`, `_source`, `_sourceName`, `_sourceHost`, or `_collector`.

If possible, also use one or more keywords to limit the scope.

## Limit search time range

Use the smallest [time range](set-time-range.md) required for your use case. When reviewing data over long time ranges, build and
test your search against a shorter time range first, then extend the time range once the search is finalized.

## Use fields extracted by FERs and avoid the where operator

Whenever possible, use keyword searches and fields already extracted using [Field Extraction Rules](/docs/manage/field-extractions) (FERs) to filter data instead of using the [where](/docs/search/search-query-language/search-operators/where) operator. If it is not possible to only use a keyword or pre-extracted field, use both a keyword search AND the where clause.

**Best approach:** Field Extraction Rule field AND keyword

```sql
_sourceCategory=foo and fielda=valuea
```

**Good approach:** Keyword search AND where operator

```sql
_sourceCategory=foo and valuea
| parse "somefield *" as somefield
| where somefield="valuea"
```

Only use this option if a keyword alone does not provide the desired results.

**Least preferred approach:** No keyword search, no pre-extracted field

```sql
_sourceCategory=foo
| parse "somefield *" as somefield
| where somefield="valuea"
```

## Filter your data before aggregation

When filtering data, make the result set you are working with as small as possible before conducting [aggregate](/docs/search/search-query-language/group-aggregate-operators) operations like sum, min, max, and average. According to [Be specific with search scope](#be-specific-with-search-scope), keywords and metadata in your search scope are the priority. If you must use a `where` clause, refer to [Use fields extracted by FERs and avoid the where operator](#use-fields-extracted-by-fers-and-avoid-the-where-operator).

**Best approach:**

```sql
_sourceCategory=Prod/User/Eventlog user="john"
| count by user
```

This example assumes that you also leverage a Field Extraction Rule to eliminate any parsing.

**Least preferred approach:**

```sql
_sourceCategory=Prod/User/Eventlog
| count by user
| where user="john"
```

## Use parse anchor instead of parse regex for structured messages

According to [Use fields extracts by FERs and avoid the where operator](#use-fields-extracted-by-fers-and-avoid-the-where-operator), it is best to use pre-extracted fields. If you need to parse a field that is not pre-extracted, use [parse anchor](/docs/search/search-query-language/parse-operators/parse-predictable-patterns-using-an-anchor). If you are dealing with unstructured messages that are more complex, leverage [parse regex](/docs/search/search-query-language/parse-operators/parse-variable-patterns-using-regex) and place it in a Field Extraction Rule.

## When using parse regex avoid expensive tokens

If you need to use parse regex, avoid the use of expensive operations like `.*`. Just as [Be specific with search scope](#be-specific-with-search-scope) states for your search scope, be as specific as you can with your regular expressions as well.

**Example log message:**

```sql
52.87.131.109 - - [2016-09-12 20:13:52.870 +0000] "GET /blog/index.php HTTP/1.1" 304 8932
```

**Best approach:**

```sql
| parse regex "(\<client_i\>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s"
```

**Least preferred approach:**

```sql
| parse regex "(\<client_i\>.*)\s-"
```

## Use partitions and scheduled views

Sumo provides two index-based search optimization features: partitions and scheduled views. When you run a search against an partition or scheduled view, search results are returned more quickly and efficiently because the search is run against a smaller data set. For more
information, see [Optimize Search Performance](../../optimize-search-performance.md).

## Use Search Parameters

If your search contains filtering criteria that could change each time the search is executed, take advantage of [Search Templates](search-templates.md). Search templates make it easier for less expert users to obtain search results, and also reduces the risk that such users will run expensive searches.

## Aggregate before a lookup

Whenever possible, you should aggregate data prior to doing a [lookup](/docs/search/search-query-language/search-operators/lookup-classic). In some cases, this will significantly reduce the amount of data the lookup is referencing.

**Best approach:**

```sql
| count by client_ip
| lookup is_bad_ip from shared/bad/ips on client_ip=ip
```

**Less preferred approach:**

```sql
| lookup is_bad_ip from shared/bad/ips on client_ip=ip
| count by is_bad_ip
```

## Put pipe-delimited operations on separate lines

For readability, use a soft return in the query field to put each new
pipe-delimited operation on a separate line.

**Best approach:**

```sql
_sourceCategory=Apache/Access and GET
| parse "\"GET * HTTP/1.1\"\" * * \"\"*\"\"" as url,status_code,size,referrer
| count by status_code,referrer
| sort _count
```

**Less preferred approach:**

```sql
_sourceCategory=Apache/Access and GET
| parse "\"GET * HTTP/1.1\"\" * * \"\"*\"\"" as url,status_code,size,referrer
| count by status_code,referrer | sort _count
```

## Pin searches with long time ranges

A query with a longer time range can run past the default time window for Sumo Logic. To protect against an interruption in a query with a
significant time range, [pin it](/docs/get-started/library#pinned-searches). A pinned search can run in the background for up to 24 hours.

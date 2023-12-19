---
id: filter
title: filter Search Operator
sidebar_label: filter
---

Use the `filter` operator to filter the output of a search based on the filtering criteria of a child query. The `filter` operator keeps only the records that match the filter criteria, allowing you to restrict search results to the most relevant information.

## Syntax

```sql
"filter" <fieldname>+ in (<child_query>)
<child_query> ::= (non data-retrieval sumo query )
<fieldname> ::= (name of a field)
```

### Caveats

* Filter operator must follow an aggregate operator.
* All the fields must be present in the output fields for the child query.
* The compare operator and filter operator are not supported in the child query. 
* The filter operator can be used instead of the `where` operator.

### Limitations

The operator can process up to 100,000 data points for a single query. It automatically drops the data points that exceed the limit and issues a warning. 

## Examples

### Show all source hosts with outlier violations

```sql
_sourceCategory=HttpServers
| timeslice 1m
| count by _timeslice, _sourceHost
| filter _sourceHost in (outlier _count by _sourceHost | where _count_violation > 0)
| transpose row _timeslice column _sourceHost
```

### Show top two source hosts with the most messages

```sql
_sourceCategory=HttpServers
| timeslice 1m
| count by _timeslice, _sourceHost
| filter _sourceHost in (sum(_count) by _sourceHost | top 2 _sourceHost by _sum )
| transpose row _timeslice column _sourceHost
```

### Show top three source hosts with most outlier violations

```sql
_sourceCategory=HttpServers
| timeslice 1m
| count by _timeslice, _sourceHost
| filter _sourceHost in (outlier _count by _sourceHost | sum(_count_violation) by _sourceHost | top 3 _sourceHost by _sum )
| transpose row _timeslice column _sourceHost
```

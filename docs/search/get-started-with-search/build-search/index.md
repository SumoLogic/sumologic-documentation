---
slug: /build-search
---

This guide provides information on building searches.

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```

## What Data Do I Have?

It can be hard to create a search query if you don't know what data you have in your Sumo Logic environment. 

You can use the following simple queries to identify possible values for your existing Source Categories, Source Names, and Source Hosts. You can also approximate data volume for each of the possible values using these queries.

We discourage the use of `*`, as it does not provide much value, but in this exception, it is an easy way to identify all messages received in the last 5 minutes, and provide an approximate volume for each.

For Source Categories:

`* | count_frequent(_sourceCategory)`

For Source Hosts:

`* | count_frequent(_sourceHost)`

For Source Names:

`* | count_frequent(_sourceName)`

## Write Efficient Search Queries

### Make the search as selective as possible

The more specific the query, the more efficiently it will run, as unnecessary messages are quickly thrown out of the mix. For example, the following two queries will generate the same result:

* `* | parse regex "uid=(\<userI\>\d+)"`
* `"uid=" | parse regex "uid=(\<userI\>\d+)"`

The second query will return the results more efficiently because the first query includes "`*`", which prompts Sumo Logic to comb through all messages for the given time range.

### Use Field Extraction Rules

If your admin has created Field Extraction Rules, [learn how to use them] (../../../Manage/Field-Extractions/Edit-Field-Extraction-Rules.md). Field Extraction Rules parse out fields from your organization's log files, meaning that you will not need to parse out fields in your query.

### Include the most selective filters first

It is best to filter data as early as possible in the query, using the most selective filters first.

For example, look at the following queries:

* `* | parse "queryTime=* " as queryTime | parse "uid=* " as uid | where queryTime\> 10000`
* `* | parse "queryTime=* " as queryTime | where queryTime\> 10000 | parse "uid=* " as ``uid`

Because most log lines have a `uid`, but only a small fraction have `queryTime > 10000`, the second query is more efficient.


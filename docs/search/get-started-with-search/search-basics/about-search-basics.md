---
id: about-search-basics
title: Run Your First Search Query
sidebar_label: Run Your First Query
description: Walk through running your first Sumo Logic search query, from a simple keyword search to a multi-step pipeline with parsing and aggregation.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

New to Sumo Logic? This topic walks you through running your first Log Search, starting with a simple keyword search and building up to a more complete query that parses and aggregates data.

:::training Micro Lesson

How to search data using the Basic Mode Search in Sumo Logic.

<Iframe url="https://fast.wistia.net/embed/iframe/deo5m3f7jy?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Basic Mode Search Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

In the **Search** tab, a search query is typically formatted something like this:

`keyword search | parse | where | group-by | sort | limit`

## Quickstart

Start with a basic search:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Logs > Log Search**. You can also click the **Go To...** menu at the top of the screen and select **Log Search**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Log Search**.
1. Scope the query to a [source category](built-in-metadata.md#_sourcecategory), such as `_sourceCategory=apache`, or type a simple key term like "error," or an asterisk wildcard (`*`) to find all messages.
1. Set the [time range](../build-search/set-time-range.md) for the search.
1. Click **Start Search** or hit **Enter**.
1. Sumo Logic returns all the log entries matching your query in the **Messages** tab below the histogram. If your query includes an aggregation, an **Aggregates** tab also appears with the grouped results. See [how to navigate through search results](../search-page/navigate-through-search-results.md).

Review a slightly more complex search query to see how queries are formed.

All queries begin with a keyword or string search. Wildcards are allowed including an asterisk (`*`) for zero or more characters and a question mark (`?`) for a single character. Strings can be parsed based on start and stop anchor points in messages, and then aliased as user-created fields. All operators are separated by the pipe symbol (`|`).

Here's an example:

`_sourceCategory=apache | parse "* --" as src_ip | count by src_ip | sort _count`

This query means:

<img src={useBaseUrl('img/reuse/query-search/query-syntax-new.png')} alt="A diagram illustrating a Sumo Logic query. " style={{border: '1px solid gray'}} width="500" />

As queries get longer and more complex, it is a best practice to format your queries by using a soft return before the pipes, such as:

```sumo
_sourceCategory=apache
| parse "* --" as src_ip
| count by src_ip | sort _count
```

This method lines up the pipes and makes your query much easier to read.

## Default data scope

The data that is used to execute the query when there is no `_index`, `_sourcecategory`, `_view`, or metadata fields in the source expression of a query is called Default scope data.

- For data-tier customers, the data in continuous tier is considered as default scope. For queries relying on default scope, example, `_index`, `_sourcecategory`, `_view` , or metadata fields, for example `error | count` or `*`, only continuous tier data will be considered for the query, as frequent and infrequent data is excluded from the default scope.
- For [flex customers](/docs/manage/partitions/flex/create-edit-partition-flex), you can modify the default scope by selecting or deselecting the **Include this partition in default scope** checkbox when creating/updating the partition. For example, consider you have three partitions namely, Partition A (Excluded), Partition B (Included), and Partition C (Included). When you run the query without referring to `_index`, for example `error | count` or `*`, only Partition B and Partition C will be considered for the query, as Partition A is excluded from the default scope.

## Additional resources

* See [Search Syntax Overview](../build-search/search-syntax.md) for the full query syntax, character limits, and how user-parsed fields work.
* Learn [How to Build a Search](/docs/search/get-started-with-search/build-search).
* Expand the complexity of your search queries with [Sumo Logic search operators](/docs/search/search-query-language/group-aggregate-operators).
* [Save a search](save-search.md) to reuse later or to run as regularly [scheduled searches](/docs/alerts/scheduled-searches/schedule-search) that can be delivered to your email address.
* [Share a link](share-link-to-search.md) to the results of a search query, depending on each user's permissions. To share a link to a search, after your query has run, click **Share** beneath the search query box. This link will be available for three years after it is created.
* See [Best Practices: Search Rules to Live By](/docs/search/get-started-with-search/build-search/best-practices-search) for types on writing efficient searches.

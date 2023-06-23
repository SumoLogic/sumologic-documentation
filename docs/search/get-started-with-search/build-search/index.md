---
slug: /search/get-started-with-search/build-search
title: Build Searches
description: Details on building a search - best practices, syntax, time range, and efficient searches. These simple queries will help you discover what data you have in your Sumo Logic environment. An efficient search query returns targeted results as quickly as possible, with as little "noise" as possible.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This guide provides information on building searches.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/build-search/best-practices-search"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Best Practices for Searches</h4></a>
  <p>Learn to get the most out of searches using these easy-to-follow rules.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/build-search/dynamic-parsing"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Dynamic Parsing</h4></a>
  <p>Learn how to view fields from JSON logs without having to manually specify parsing logic.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/build-search/keyword-search-expressions"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Keyword Search Expressions</h4></a>
  <p>Learn how to define the scope of data for the query.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/build-search/search-syntax-overview"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Search Syntax Overview</h4></a>
  <p>Learn about query syntax and how to construct a search.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/build-search/search-templates"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Search Templates</h4></a>
  <p>Learn how to simplify searches for your users by giving them a few easy input choices.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/build-search/set-time-range"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Set the Time Range</h4></a>
  <p>Learn how to adjust the time range for searches and metrics to get the most useful information.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/build-search/use-receipt-time"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Use Receipt Time</h4></a>
  <p>Learn how to display search data in the order that Collectors received the messages.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/build-search/use-url-to-run-search"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Use a URL to Run a Search</h4></a>
  <p>Learn how to create a custom URL to launch a log search in Sumo Logic.</p>
  </div>
</div>
</div>

## What Data Do I Have?

It can be hard to create a search query if you don't know what data you have in your Sumo Logic environment. 

You can use the following simple queries to identify possible values for your existing Source Categories, Source Names, and Source Hosts. You can also approximate data volume for each of the possible values using these queries.

We discourage the use of `*`, as it does not provide much value, but in this exception, it is an easy way to identify all messages received in the last 5 minutes, and provide an approximate volume for each.

For Source Categories: `* | count_frequent(_sourceCategory)`

For Source Hosts: `* | count_frequent(_sourceHost)`

For Source Names: `* | count_frequent(_sourceName)`

## Write Efficient Search Queries

### Make the search as selective as possible

The more specific the query, the more efficiently it will run, as unnecessary messages are quickly thrown out of the mix. For example, the following two queries will generate the same result:

* `* | parse regex "uid=(\<userI\>\d+)"`
* `"uid=" | parse regex "uid=(\<userI\>\d+)"`

The second query will return the results more efficiently because the first query includes "`*`", which prompts Sumo Logic to comb through all messages for the given time range.

### Use Field Extraction Rules

If your admin has created Field Extraction Rules, [learn how to use them](/docs/manage/field-extractions/edit-field-extraction-rules.md). Field Extraction Rules parse out fields from your organization's log files, meaning that you will not need to parse out fields in your query.

### Include the most selective filters first

It is best to filter data as early as possible in the query, using the most selective filters first.

For example, look at the following queries:

`* | parse "queryTime=* " as queryTime | parse "uid=* " as uid | where queryTime\> 10000`

`* | parse "queryTime=* " as queryTime | where queryTime\> 10000 | parse "uid=* " as ``uid`

Because most log lines have a `uid`, but only a small fraction have `queryTime > 10000`, the second query is more efficient.

---
id: use-searchable-time
title: Use Searchable Time (Beta)
sidebar_label: Use Searchable Time (Beta)
description: You can display search results in the order when the logs become available for search.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

**Searchable Time** refers to the additional processing time required to make logs available for searching after they are received by the Sumo Logic system. This processing includes enrichment, indexing, and storage, all of which contribute to the overall Searchable Time.

Previously, it was recommended to use receipt time instead of message time to avoid issues with missing duplicate data. However, this often led to inconsistent error messages due to variable ingestion latency and non-linear receipt time indexing. **Searchable Time** resolves this issue by marking the time only when the data is truly searchable. This provides a linear timeline, ensuring that running queries with non-overlapping but exhaustive time ranges will prevent any gaps or duplication in the data.

:::info
Currently, **Searchable Time** is only available for the Log Search UI page and Scheduled Search queries.
:::

## Run a search by Searchable Time

Follow the below steps to run a search by Searchable Time:

1. Enter your query in the search text box.
1. Choose the time range for the query.
1. Click the gear icon to open the **Search Config** menu and toggle **Searchable Time** on.<br/><img src={useBaseUrl('/img/search/get-started-search/build-search/searchable-time-option.png')} alt="searchable-time-option" style={{border:'1px solid gray'}} width="500" />     
1. Review the search results for wide discrepancies between message time, receipt time, and searchable time.<br/><img src={useBaseUrl('/img/search/get-started-search/build-search/searchable-time-results-messages-tab.png')} alt="searchable-time-results-messages-tab" style={{border:'1px solid gray'}} width="800" />

## Limitations

- Subqueries are not supported for Searchable Time.
- `time_source` field in the terraform supports **Searchable** value for dashboards.

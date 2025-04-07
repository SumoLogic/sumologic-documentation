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

## Configure queries to run the Searchable Time

To run a query utilizing **Searchable Time**, you can add the following query flag to your request. This flag will override either the Message Time or Receipt Time, allowing the query to execute based on Searchable Time. If the query flag is not enabled for the particular customer or feature, it will be ignored without any warning.

```_queryFlag = useSearchableTime```

In the results section, you will find **Searchable Time** listed in the **Displayed Fields** of the Field Browser.

## Limitations

- Subqueries are not supported on the Searchable Time.
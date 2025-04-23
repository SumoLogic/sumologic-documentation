---
id: intelliparse
title: Intelliparse Mode (Beta)
description: Intelliparse mode extends automatic parsing to unstructured logs, allowing you to search and filter logs even when they don’t follow a consistent format like JSON.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This feature is currently available to select customers. Contact your Sumo Logic account representative to request access.

We've introduced a new parsing mode in the Log Search UI: Intelliparse mode. It extends automatic parsing to unstructured logs, allowing you to search and filter logs even when they don’t follow a consistent format like JSON.

<!-- link to Copilot unstructured logs doc -->

## Available parsing modes

You can now choose from three parsing options in the log search UI:

* **Intelliparse (new)**. Combines JSON parsing with automatic parsing of unstructured logs using pre-discovered parsers.
* [**Auto Parse**](/docs/search/get-started-with-search/build-search/dynamic-parsing). JSON blocks within logs are automatically parsed.
* **Manual**. No automatic parsing applied.

<img src={useBaseUrl('img/search/get-started-search/build-search/log-search-parsing-modes.png')} alt="log-search-parsing-modes.png" style={{border: '1px solid gray'}} width="700"/>

## How Intelliparse mode works

When you enable Intelliparse mode:
* Logs are parsed using a set of parsers discovered from your recently used dashboards.
* Fields are extracted automatically from both structured and unstructured logs.
* A hidden operator is applied to your query to power this functionality behind the scenes.

## Benefits

* **No Field Extraction Rules (FERs) required**. Get field-level insights without manual parsing.
* **Works with your existing dashboards**. Parsers are derived from log panels in recently viewed or edited dashboards.
* **Improved field visibility**. Fields parsed through Intelliparse mode appear in the Messages tab and can be used in queries, filters, and dashboards.

## Example

If your dashboard includes a query like:

```sql
_sourceCategory=cassandra "Dropped table"
| parse "table '*' from database '*'" as db.table, db.name
```

Then any matching unstructured logs like:

`2025-04-09 11:20:25 * Dropped table 'logins' from database 'auth'`

will be parsed automatically in Intelliparse mode, extracting:

* `db.table = "logins"`
* `db.name = "auth"`

:::info
* Parsers are discovered automatically from dashboard content. No manual setup needed.
* If a dashboard is modified, the associated parser will update. Deleted dashboards do not currently delete parsers.
* Queries using Intelliparse mode include a hidden intelliparse operator, injected automatically.
:::

## How Copilot uses Intelliparse mode

Even if you don’t manually enable Intelliparse mode, you may encounter it when using [Sumo Logic Copilot](/docs/search/copilot).

Copilot uses Intelliparse mode in the background to:
* Automatically parse unstructured logs for natural language queries.
* Discover field names and values for more accurate suggestions and translations.
* Generate search queries that include the hidden `intelliparse` operator.

This integration allows Copilot to work with raw, unstructured log data; no setup required on your part.

<!-- When Copilot - Unstructured Logs (Beta) doc has been published, crosslink from there...
Want to learn more about Intelliparse mode? See how it works in Log Search
https://sumologic.atlassian.net/browse/DOCS-752
--->

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

**Searchable Time** refers to the additional processing time required to make logs available for search after they are received by the Sumo Logic system. This processing includes enrichment, indexing, and storage, all of which contribute to the overall Searchable Time.

Previously, it was recommended to use receipt time instead of message time to avoid issues with missing duplicate data. However, this often led to inconsistent error messages due to variable ingestion latency and non-linear receipt time indexing. **Searchable Time** resolves this issue by marking the time only when the data is truly searchable. This ensures running queries with non-overlapping but exhaustive time ranges will prevent any gaps or duplication in the data.

:::info
Currently, **Searchable Time** is only available for the Log Search UI page, Schedule Searches, Saved Searches, Dashboards, and Search Job API queries.
:::

## Via UI

### Run a search using Searchable Time

Follow the below steps to run a search by Searchable Time:

1. Enter your query in the search text box.
1. Choose the time range for the query.
1. Click the gear icon to open the **Search Config** menu and toggle **Searchable Time** on.<br/><img src={useBaseUrl('/img/search/get-started-search/build-search/searchable-time-option.png')} alt="searchable-time-option" style={{border:'1px solid gray'}} width="500" />     
1. Review the search results for wide discrepancies between message time, receipt time, and searchable time.<br/><img src={useBaseUrl('/img/search/get-started-search/build-search/searchable-time-results-messages-tab.png')} alt="searchable-time-results-messages-tab" style={{border:'1px solid gray'}} width="800" />

### Run a scheduled search using Searchable Time

Follow the below steps to run a scheduled search by Searchable Time:

1. Enter your query in the search text box and click **Save As..**.
1. In the **Save Item** pop-up, select **Searchable Time** from the timestamp dropdown.<br/><img src={useBaseUrl('/img/search/get-started-search/build-search/searchable-time-scheduled-search.png')} alt="searchable-time-scheduled-search" style={{border:'1px solid gray'}} width="500" />

### Run a search using Searchable Time in dashboard

:::note
**Searchbale Time** will not be available for *Metrics* or *Spans* query.
:::

Follow the below steps to run a search using the Searchable Time in the dashboard:

1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Dashboard**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Dashboards > New Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **New Dashboard**.  
1. Select a panel type by clicking the corresponding icon.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/panel-types.png')} alt="panel types" style={{border: '1px solid gray'}} width="600" />
1. You are prompted to provide a log query.
1. Navigate to **General** configuration.
1. Go to **Logs Settings** section and select **Searchbale Time** as the timestamp.<br/><img src={useBaseUrl('/img/search/get-started-search/build-search/searchable-time-dashboard.png')} alt="searchable-time-dashboard" style={{border:'1px solid gray'}} width="500" />

## Via API

### Run a search by Searchable Time using Search Job API

To create a search, refer to the [Search Job API Documentation](/docs/api/search-job/#create-a-search-job). Below mentioned parameter has been updated due to addition of Searchable time feature:
 
| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- | 
| `intervalTimeType` | String | Yes | This parameter defines whether you want to run the search by messageTime, receiptTime, or searchableTime. By default, the search will run by messageTime. |

:::note
If both `runByReceiptTime` and `intervalTimeType` parameters are present then the preference will be given to the `intervalTimeType`.
:::

### Create a dashboard with Searchable Time

To create a dashboard, refer to the [Search Job API Documentation](/docs/api/dashboard/). Below mentioned parameter has been updated due to addition of Searchable time feature:

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- | 
| `timeSource` | String | Yes | This parameter defines the time source of the query. Possible values are `Message`, `Receipt`, or `Searchable`. By default, `Message` will be used as the time source. <br/>**Message**. Uses the timestamp on the message.<br/>**Receipt**. Timestamp when the logs were received by Sumo Logic.<br/>**Searchable**. Timestamp when the logs are available for search.  |

:::info
`time_source` field in the *terraform* supports **Searchable** value for dashboards.
:::

## Limitations

- Subqueries are not supported for Searchable Time.

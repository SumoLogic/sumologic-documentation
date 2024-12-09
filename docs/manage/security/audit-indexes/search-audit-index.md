---
id: search-audit-index
title: Search Audit Index
description: The Search Audit Index provides event logs on search usage and activities for your account. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Search Audit Index provides event logs on search usage and activities for your account. The index allows you to monitor and audit the search queries being run within your account, the types of queries, the users running them, and more. 

To visualize your Search Audit Index data, download the [Enterprise Search Audit App](/docs/integrations/sumo-apps/enterprise-search-audit), which provides pre-built dashboards and reports to help you analyze your current search use and identify areas for improvement.

## Availability

This feature is available in the following account plans.

| Account Type | Account Level |
|:--|:---|
| Cloud Flex | Trial, Enterprise |
| Cloud Flex Credits | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

## Enable the Search Audit Index

The Search Audit Index must be enabled by an administrator.

To enable the Search Audit Index:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**. 
1. Under **Sumo Logic Auditing**, select **Enable Search Audit Record**. <br/><img src={useBaseUrl('img/security/Search_Audit_Index_Enabled.png')} alt="Enable Search Audit Index Record checkbox" style={{border: '1px solid gray'}} width="600" />

:::note
* Users with a role that grants the [**Manage audit data feed**](/docs/manage/users-roles/roles/role-capabilities#security) capability are allowed to enable the Search Audit Index.
* Enabling the index will not count towards your data volume quota.
* Logging to the index begins when the index is enabled.
:::

## Query the Search Audit Index

1. In the Search page, enter the query `_index=sumologic_search_usage_per_query`.
1. Choose the time range for the audit events you’d like to review.
1. Click **Start** to run the search. Results return in the **Messages** tab.

:::note
Querying the index returns results only if the index is enabled.
:::

## Index retention period

By default, the retention period of the Search Audit index is the same as the retention period of your Default partition. You can change the retention period by editing the partition that contains the index, `sumologic_search_usage_per_query`. For more information, see [Edit a Partition](/docs/manage/partitions/data-tiers/create-edit-partition).

## Log Search Audit Index message fields

The following table provides details on the fields returned by the index:

| Field  | Description |
|:--|:--|
| `time` | The time when the audit log was generated. |
| `analytics_tier` | The data tier associated with the audit message. Learn more about [Data Tiers](/docs/manage/partitions/data-tiers). |
| `content_identifier` | The ID of the content item that triggered the search query. |
| `content_name` | The name of the content item that triggered the search query. |
| `data_retreived_bytes` | Amount of data retrieved by the search query. This represents the approximate size of messages that match the source expression of the query and are retrieved from scanning. |
| `data_scanned_bytes` | Displays the total sum of scanned bytes for charged (Flex and Infrequent bytes) and non-charged metering types (Continuous, and Frequent bytes). This value can be different from what users see in scan estimates on UI. Additionally, if a query contains a `timecompare` or `subquery` operator, the `data_scanned_byte` attribute in the audit log will include the sum of both the parent and child queries. |
| `execution_duration_ms` | Time taken to complete the search. |
| `is_aggregate` | The boolean variable that indicates if the corresponding search query was an aggregate query. The aggregate operator’s list can be found in [Group or Aggregate Operators](/docs/search/search-query-language/group-aggregate-operators). |
| `query` | The query text string run by the user. |
| `query_end_time` | The end time in the time range specified as part of the query time parameter, in milliseconds since epoch. |
| `query_start_time` | The start time in the time range specified as part of the query time parameter, in milliseconds since epoch. |
| `query_type` | Identifies the type of query run within the account such as API, UI, Scheduled Views, etc. The values and their detailed description are provided in [Query type field values](#query-type-field-values). |
| `remote_ip` | The remote IP of the source from where the query originated. |
| `retrieved_message_count` | The number of messages returned by the search result. This represents the approximate count of messages that match the source expression of the query and are retrieved from scanning. |
| `scanned_bytes_breakdown` | Amount of data scanned by the search query broken down by type. |
| `scanned_message_count`   | The number of messages scanned by the search. This is an approximation, as `scanned_message_count` is captured at intermittent time intervals and averaged over a query time range. (May be less than `retrieved_message_count` in some cases due to this approximation.) |
| `scanned_partition_count` | The number of partitions scanned by the search. This is an approximation as scanned message bytes are captured at intermittent time intervals and averaged over a query time range. (May be less than retrieved bytes in some cases due to this approximation.) |
| `session_id` | An identifier for every search run within the account. This is the same SESSION number displayed in the UI in the search tab. |
| `status_message` | Gives the status of the search. The values include: **Finished successfully**, **Query failed**, and **Query canceled**. |
| `user_name` | The email of the user that ran the search. |
| `scanned_bytes_breakdown_by_metering_type` | Displays breakdown of the total amount of data scanned by a search query based on the metering type. It includes both charged metering types (Flex and Infrequent bytes) and non-charged metering types  (Continuous, Frequent, and FlexSecurity bytes). |

## Query type field values 

The table below shows the possible values for the `query_type` field.

| query_type value | Description |
|:--|:--|
| Alerts | Search queries run by users accessing the [Alert Response Page](/docs/alerts/monitors/alert-response). |
| Search API | Search queries run by users using the [Search Job API](/docs/api/search-job) only. |
| Interactive Search | Search queries run from the Search tab in the UI only. |
| Interactive Dashboard | Search queries run from dashboards in the UI only. |
| Scheduled Search | [Scheduled search](/docs/alerts/scheduled-searches) queries run as per the frequency specified by users in the org. |
| View Maintenance | [Scheduled View](/docs/manage/scheduled-views) queries run on behalf of the users in the org. |
| Sumo Internal | The Internal searches Sumo Logic runs in the background that are critical in providing other services (for example, autocomplete, scheduled view optimization, etc.).                                    |
| Auto Refresh Dashboard | Search queries used to power auto refresh dashboard panels. |
| Monitor | Queries associated with [monitors](/docs/alerts/monitors). |
| Span Analytics | Queries run for filtering and aggregating trace data based on [span attributes](/docs/apm/traces/spans) to understand application services performance. Queries can be built using input fields, with filters and visualized results available.  |

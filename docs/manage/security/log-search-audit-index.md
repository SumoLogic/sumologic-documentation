---
id: log-search-audit-index
title: Log Search Audit Index
description: The Search Audit Index is populated with log messages and the message contains search usage and activities for your account.
---

The Search Audit Index is populated with log messages and the message contains search usage and activities for your account. You can query the search audit index just like any other message using the Sumo Logic search page.

## Query the Log Search Audit Index

1. In the Search page, enter the query `_index=sumologic_search_usage_per_query`.
1. Choose the time range for the audit events you’d like to review.
1. Click **Start** to run the search. Results return in the **Messages** tab.

:::note
Querying the index returns results only if the index is enabled.
:::

## Log Search Audit Index Message Fields

The following table provides details on the fields returned by the index:

| Field  | Description |
|:--|:--|
| `time` | The time when the audit log was generated. |
| `analytics_tier` | The data tier associated with the audit message. Learn more about [Data Tiers](../partitions-data-tiers/data-tiers.md). |
| `data_retreived_bytes` | Amount of data retrieved by the search query. This represents the approximate size of messages that match the source expression of the query and are retrieved from scanning. |
| `data_scanned_bytes` | Amount of data scanned by the search query. This value is an approximation, as the scanned message bytes are captured at intermittent time intervals and then averaged over the query time range. It is important to note that this value may be less than the retrieved bytes in some cases due to the approximation. Additionally, if a query contains a `timecompare` or `subquery` operator, the `data_scanned_byte` attribute in the audit log will include the sum of both the parent and child queries. |
| `execution_duration_ms` | Time taken to complete the search. |
| `is_aggregate` | The boolean variable that indicates if the corresponding search query was an aggregate query. The aggregate operator’s list can be found [*here*](/docs/search/search-query-language/group-aggregate-operators). |
| `query` | The query text string run by the user. |
| `query_end_time` | The end time in the time range specified as part of the query time parameter. (in ms epoch) |
| `query_start_time` | The start time in the time range specified as part of the query time parameter. (in ms epoch) |
| `query_type` | Identifies the type of query run within the account such as API, UI, Scheduled Views, etc. The values and their detailed description are provided in the next section. |
| `remote_ip` | The remote IP of the source from where the query originated. |
| `retrieved_message_count` | The number of messages returned by the search result. This represents the approximate count of messages that match the source expression of the query and are retrieved from scanning. |
| `scanned_message_count`   | The number of messages scanned by the search. This is an approximation, as scanned_message_ count is captured at intermittent time intervals and averaged over a query time range. *(May be less than retrieved_message_count in some cases due to this approximation.)* |
| `scanned_partition_count` | The number of partitions scanned by the search. This is an approximation as scanned message bytes are captured at intermittent time intervals and averaged over a query time range. *(May be less than retrieved bytes in some cases due to this approximation)* |
| `session_id` | An identifier for every search run within the account. This is the same SESSION number displayed in the UI in the search tab. |
| `status_message` | It gives the Status of the search. The values include: Finished successfully, Query failed, and Query canceled. |
| `user_name` | The email of the user that ran the search. |

## Query Type Field Values 

The table below shows the possible values for the field, query_type.

| query_type value | Description |
|:--|:--|
| Search API | Search queries run by users using the Sumo Search Job API only. |
| Interactive Search | Search queries run from the Search tab in the UI only. |
| Interactive Dashboard | Search queries run from dashboards in the UI only. |
| Scheduled Search | Scheduled search queries run as per the frequency specified by users in the org. |
| View Maintenance | Scheduled View queries run on behalf of the users in the org. |
| Sumo Internal | The Internal searches Sumo runs in the background that are critical in providing other services (For example, autocomplete, scheduled view optimization, etc.)                                    |
| Live Dashboard | Search queries used to power live dashboard panels. |
| Monitor | Queries associated with [monitors](/docs/alerts/monitors). |
| Span Analytics | Queries are run for filtering and aggregating trace data based on span attributes to understand application services performance. Queries can be built using input fields, with filters and visualized results available.  |

## Index retention period

By default, the retention period of the Log Search Audit index is the same as the retention period of your Default Partition. You can change the retention period by editing the partition that contains the index, `sumologic_search_usage_per_query`. For more information, see [Edit a Partition](../partitions-data-tiers/create-edit-partition.md).

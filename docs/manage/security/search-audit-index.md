---
id: search-audit-index
title: Search Audit Index
description: Learn how to enable the Search Audit Index.
---

## Availability

This feature is available in the following account plans.

| Account Type | Account Level |
|:--------------------|:---------------------------------------------------------------------|
| Cloud Flex | Trial, Enterprise |
| Cloud Flex Credits | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

The Search Audit Index provides event logs on search usage and activities for your account. The index allows you to monitor and audit the search queries being run within your account, the types of queries, the users running them, and more. The [Enterprise Search Audit App](/docs/integrations/sumo-apps/enterprise-search-audit) provides pre-built dashboards and reports of the data from the Search Audit Index to help you analyze your current search use and identify areas for improvement. 

## Enable the Search Audit Index

The Search Audit Index must be enabled by an administrator.

To enable the Search Audit Index:

1. Go to the **Administration** > **Security** > **Policies** page.
1. Under **Sumo Logic Auditing**, select the second **Enable** option.

    ![Search-Audit-Index_Enabled.png](/img/security/Search_Audit_Index_Enabled.png)

:::note
* Users with a role that grants the Manage audit data feed capability are allowed to enable the Search Audit Index.
* Enabling the index will not count towards your data volume quota.
* Logging to the index begins when the index is enabled.
:::

## Query the Search Audit Index

1. In the Search page, enter the query `_index=sumologic_search_usage_per_query`.
1. Choose the time range for the audit events you’d like to review.
1. Click **Start** to run the search. Results return in the **Messages** tab.

## Index retention period

By default, the retention period of the Search Audit index is the same as the retention period of your Default partition. You can change the retention period by editing the partition that contains the index, `sumologic_search_usage_per_query`. For more information, see [Edit a Partition](../partitions-data-tiers/create-edit-partition.md).

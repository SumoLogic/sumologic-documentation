---
id: minute-volume
title: Minute Volume (Beta)
description: Use Ingest Budgets Minute Volume to control data ingestion to minute granularity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<!-- IMPORTANT: When this doc goes from Beta to GA, integrate this content with /docs/manage/ingestion-volume/ingest-budgets/index.md, where there's significant overlapping content. -->

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

:::note
This feature is in Beta. To participate, contact your Sumo Logic account executive.
:::

Ingest Budgets Minute Volume lets you control data ingestion to minute granularity. This granular control in data ingestion protects against Ingestion surges and spikes, thus safeguarding your account against throttling.

Log data can be assigned to an ingest budget that defines a minute log capacity limit. The capacity is tracked based on the combined volume from all sources of log data. When an ingest budget's capacity is reached, you can have Sumo Logic stop collecting the log data assigned to it to safeguard against data volume spikes.

An ingest budget's capacity usage is logged in the Audit Index when the audit threshold is reached, and continues to be logged until the budget is reset.

## Rules

* Metrics and Traces data is not supported.
* Fields assigned with Field Extraction Rules are not supported in the scope of an ingest budget.
* `_budget` is a reserved keyword used by legacy ingest budgets. Do not use this reserved field when creating a new ingest budget.
* Data is not automatically recovered or ingested later once the capacity tracking is reset.
* Avoid creating multiple Ingest Budgets with the same scope. In such a scenario, Ingest budgets whose capacity is reached first is executed.
* In the scope, do not wrap values in quotes, unless the value explicitly has quotes. For example, if you want to assign the scope with `_collector` and the name of the Collector is `CloudTrail`, you would assign the scope as `_collector=CloudTrail` instead of `_collector="CloudTrail"`.


## Budget assignment​

{@import ../../../reuse/budget-assignment.md}

## Source-type behavior​

A few Sources on Hosted Collectors will behave differently when instructed to stop collecting data.

* HTTP sources will drop data requests, yet still return a `200 OK` response.
* AWS S3-based sources will skip objects.
* Cloud syslog sources will keep the connection open yet drop incoming syslog messages.
* Installed collector will stop collecting data.

## Create ingest budgets

1. Select **Manage Data** > **Collection** > **Ingest Budgets**.
1. Click the **+ Add Budget** button on the top right of the table. A panel named Create Ingest Budget will appear to the right of the Ingest Budgets table.<br/><img src={useBaseUrl('img/ingestion-volume/create-ingest-budget.png')} alt="create-ingest-budget" style={{border: '1px solid black'}} width="600" />
1. Provide the following information.
   * **Display Name**. Enter the name you'd like to assign to the new ingest budget.
   * **Scope**. Define the log data to apply to the ingest budget. See budget assignment for details and review the rules above. Once scope is defined, you can click on the hyperlink to view the ingest rate of your defined scope. Sumo Logic populates a query to run across all Data Tiers to find the right Ingestion trend.
   * **Description** is optional.
   * **Capacity**. There are two types of capacity definition.
      * Select Minute Volume
      * Amount. Enter a value up to 1023.999.
      * Unit. Select a unit of volume - KB/min, MB/min, GB/min
      * Action when capacity reached. Select the action to take when the ingest budget's capacity is reached. All actions are audited.
         * **Stop Collecting**. Collection stops immediately. There are important differences depending on the Source type and version
         * **Audit and Keep Collecting**. Collection remains the same.
1. When you're finished configuring the ingest budget, click **Add**.

## Edit ingest budget​

1. Select **Manage Data** > **Collection** > **Ingest Budgets**.
1. In the table, find the ingest budget you want to edit and click the edit icon on the right of the row, or click the row and then click the edit icon in the details panel.
1. Make your changes and click **Update**.


## Delete ingest budget​

1. Select **Manage Data** > **Collection** > **Ingest Budgets**.
1. In the table find the ingest budget you want to delete.
Click on the Ingest budget, and then under **More Actions**, click the delete icon.
1. You will get a confirmation prompt. Ensure that you are deleting the desired ingest budget, and then click **Delete**.


## Audit Index queries

To search for only ingest budgets with minute control where threshold was breached:

```sql
_index=sumologic_audit exceeded drop_data "bytes/minute"
```

To search for ingest budgets that are currently enforced to stop collecting data:

```sql
_index=sumologic_audit_events minuteVolume stopCollecting
```

## Beta Playbook

1. Identify sources which are not critical data sources where stricter data controls can be added to prevent your organization from being throttled.
1. Identify `_sourceCategory` or any other identifier for the sources.
1. Run the following query. The goal of this query is to understand previous data ingestion trends and suggest to you the peak volume seen per minute.
   ```sql
   {Your scope for data, example: _sourceCategory= alpha }
   | timeslice 1d
   | sum(_size) as datasize by _timeslice
   | sort by datasize desc
   | limit 1
   ```
1. Keep this value and add a 10% to 15% buffer while setting up Minute Volume Ingest Budgets.
1. Complete Ingest Budget Setup.
1. Set up saved searches on events when ingest budget threshold is breached.

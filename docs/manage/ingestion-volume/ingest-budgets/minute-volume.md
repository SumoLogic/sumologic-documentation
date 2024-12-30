---
id: minute-volume
title: Minute Volume
description: Use Ingest Budgets Minute Volume to control data ingestion to minute granularity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Ingest Budgets Minute Volume lets you control data ingestion to minute granularity. This granular control in data ingestion protects against Ingestion surges and spikes, thus safeguarding your account against throttling.

Log data can be assigned to an ingest budget that defines a minute log capacity limit. The capacity is tracked based on the combined volume from all sources of log data. When an ingest budget's capacity is reached, you can have Sumo Logic stop collecting the log data assigned to it to safeguard against data volume spikes.

An ingest budget's capacity usage is logged in the Audit Index when the audit threshold is reached, and continues to be logged until the budget is reset.

## Rules

* Metrics and Traces data is not supported.
* Fields assigned with Field Extraction Rules are not supported in the scope of an ingest budget. 
* `_budget` is a reserved keyword used by legacy ingest budgets. Do not use this reserved field when creating a new ingest budget.
* Data is not automatically recovered or ingested later once the capacity tracking is reset.
* Avoid creating multiple ingest budgets with the same scope. In such a scenario, Ingest budgets whose capacity is reached first is executed.
* In the scope, do not wrap values in quotes, unless the value explicitly has quotes. For example, if you want to assign the scope with `_collector` and the name of the Collector is `CloudTrail`, you would assign the scope as `_collector=CloudTrail` instead of `_collector="CloudTrail"`.

## Budget assignment​

The **Scope** supports the option to assign ingest budgets to your log data by either:

* A Field that is enabled in the [Fields](/docs/manage/fields) table.
* One of the following built-in metadata fields: `_collector`, `_source`, `_sourceCategory`, `_sourceHost`, or `_sourceName`.

The value supports a single wildcard, such as `_sourceCategory=prod*payment`.

For example, a **Scope** expression like `_sourceCategory=/dev/catalog/*` implies that all incoming logs ingested into Sumo Logic with a matching `_sourceCategory` will fall under the scope of the given budget.

## Source-type behavior​

A few Sources on Hosted Collectors will behave differently when instructed to stop collecting data.

* HTTP sources will drop data requests, yet still return a `200 OK` response.
* AWS S3-based sources will skip objects.
* Cloud syslog sources will keep the connection open yet drop incoming syslog messages.
* Installed collector will stop collecting data.

## Create ingest budgets

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Ingest Budgets**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Ingest Budget**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Budget**. 
1. Click the **+ Add Budget** button on the top right of the table.
1.  A panel named **Create Ingest Budget** will appear to the right of the **Ingest Budgets** table.<br/><img src={useBaseUrl('img/manage/ingestion-volume/create-ingest-budget.png')} alt="create-ingest-budget" style={{border: '1px solid gray'}} width="300" />
1. Under **Create Ingest Budget**, provide the following information.
   * **Name**. Enter the name you'd like to assign to the new ingest budget.
   * **Description** is optional.
   * **Scope**. Define the log data to apply to the ingest budget. See budget assignment for details and review the rules above. Once scope is defined, you can click on the hyperlink to view the ingest rate of your defined scope. Sumo Logic populates a query to run across all Data Tiers to find the right Ingestion trend.
   * **Capacity**. This sets your budget capacity.
      1. Select **Minute Volume**.
      1. **Amount.** Enter a value up to 1023.999.
      1. **Unit**. Select a unit of volume - KB/min, MB/min, GB/min.
      1. **Action when capacity reached**. Select the action to take when the ingest budget's capacity is reached. All actions are audited.
         * **Stop Collecting**. Collection stops immediately. There are important differences depending on the source type and version.
         * **Audit and Keep Collecting**. Collection remains the same.
1. When you're finished configuring the ingest budget, click **Add**.

## Edit ingest budget​

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Ingest Budgets**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Ingest Budget**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Budget**.
1. In the table, find the ingest budget you want to edit and click the edit icon on the right of the row, or click the row and then click the edit icon in the details panel.
1. Make your changes and click **Update**.


## Delete ingest budget​

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Ingest Budgets**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Ingest Budget**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Budget**.
1. In the table find the ingest budget you want to delete. Click on the ingest budget, and then under **More Actions**, click the delete icon.
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

## Set up Minute Volume ingest budgets

1. Identify sources which are not critical data sources where stricter data controls can be added to prevent your organization from being throttled.
1. Identify `_sourceCategory` or any other identifier for the sources.
1. Run the following query. The goal of this query is to understand previous data ingestion trends and suggest to you the peak volume seen per minute. To obtain the most accurate ingest rates, run the query using the [Receipt Time](/docs/search/get-started-with-search/build-search/use-receipt-time/).
   ```sql    
    _sourceCategory=<source category> AND _index=<partition name>
    | timeslice 1m
    | sum(_size) as bytes by _timeslice
    | bytes/1Mi as mbytes
    | formatDate(_timeslice, "yyyy-MM-dd") as dateslice
    | max(mbytes) as max_mb_per_min by dateslice
    | round(max_mb_per_min, 2) as max_mbpmin
    | round(max_mb_per_min * 1.1, 2) as %"max_mbpmin_110%"
    | round(max_mb_per_min * 1.2, 2) as %"max_mbpmin_120%"
    | round(max_mb_per_min * 1.5, 2) as %"max_mbpmin_150%"
    | round(max_mb_per_min * 1.75, 2) as %"max_mbpmin_175%"
    | round(max_mb_per_min * 2, 2) as %"max_mbpmin_200%"
    | sort by dateslice asc
    | fields -max_mb_per_min
   ```
1. Keep this value and add a 10% to 15% buffer while setting up **Minute Volume** ingest budgets.
1. Complete ingest budget setup.
1. Set up saved searches on events when ingest budget threshold is breached.

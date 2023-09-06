---
slug: /manage/ingestion-volume/ingest-budgets
title: Ingest Budgets
description: Control the capacity of daily log ingestion volume sent to Sumo Logic from Collectors.
---

Ingest budgets control the daily volume of log data sent to Sumo Logic. Log data can be assigned to an ingest budget that defines a daily log capacity limit. The capacity is tracked based on the combined volume from all sources of log data. When an ingest budget's capacity is reached you can have Sumo Logic stop collecting the log data assigned to it to control costs.

Ingest budgets automatically reset their capacity utilization tracking every 24 hours based on the time and time zone you specify. For example, you can schedule an ingest budget to refresh every day at 02:00 in the America/Los_Angeles time zone. You can manually [reset an ingest budget](#reset-ingest-budget) at any time.

An ingest budget's capacity usage is logged in the Audit Index when the audit threshold is reached and continues to be logged until the budget is reset. To track and schedule alerts on ingest budget capacity-usage and resets see [audit ingest budgets](#audit-index-queries).

## Availability

| Account Type | Account Level |
|:--------------|:--------------------------------------|
| CloudFlex | Enterprise |
| Credits | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

## Rules

* There is a limit of 100 ingest budgets.
* Bytes are calculated in base 2 (binary format, 1024 based).
* Ingest Budgets do not affect [throttling](../log-ingestion.md). 
* [Traces](/docs/apm/traces) are not calculated and are not supported.
* Ingest budgets require the **Manage Ingest Budgets** [role capability](../../users-roles/roles/role-capabilities.md).
* Fields assigned with Field Extraction Rules are not supported in the **scope** of an Ingest Budget.
* **`_budget`** is a reserved keyword used by legacy ingest budgets, do not use this reserved field when creating a new V2 ingest budget.
* Data is not automatically recovered or ingested later once the capacity tracking is reset.
* In the **scope**, do not wrap values in quotes, unless the value explicitly has quotes. For example, if you want to assign the scope with `_collector` and the name of the Collector is `CloudTrail`, you would assign the scope as `_collector=CloudTrail` instead of `_collector="CloudTrail"`.

## Budget assignment

{@import ../../../reuse/budget-assignment.md}

See more [budget assignment examples](#budget-assignment-examples) below and review the [rules](#rules) above.

## Versions

There are two versions of ingest budgets:

* V1 ingest budgets are older and have a **Field Value** for Collector assignment. They are shown with a **V1** in the **Name** cell.<br/> ![v1 budget tag.png](/img/ingestion-volume/v1-budget-tag.png)
* V2 ingest budgets provide you the ability to assign budgets to your log data by either [Fields](/docs/manage/fields.md) or the following [built in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields, `_collector`, `_source`, `_sourceCategory`, `_sourceHost`, and `_sourceName`.

:::important
You can edit an existing **V1** budget by providing a **scope** to change it to a **V2** budget that is metadata based. V2 budgets are manageable with the Ingest Budget Management API **V2**.
:::

Once a **V1** budget is given a **scope** and changed to **V2** it is permanent and can not be reversed.

Stopping collection differences:

* First version ingest budgets take around 30 seconds to stop collecting when capacity is reached. We recommend setting a soft limit that is lower than your needed hard limit.
* Second version ingest budgets drop data instantly once capacity is reached.

## Source type behavior

A few Sources on Hosted Collectors behave differently when instructed to stop collecting data.

* HTTP Sources will drop data requests, yet still return a `200 OK` response.
* AWS S3 based Sources will skip objects. 
* Cloud Syslog Sources will keep the connection open yet drop incoming syslog messages.

## Tools

* [Ingest Budget Management API V2](/docs/api/ingest-budget-v1.md)
* [Ingest Budget Management API V1](/docs/api/ingest-budget-v2.md)
* Terraform provider: [sumologic_ingest_budget_v2](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/ingest_budget_v2)

## Manage ingest budgets

Use the **Ingest Budgets** page to manage your ingest budgets. To access the page go to **Manage Data** > **Collection** > **Ingest Budgets**.

![metadata ingest budgetspage.png](/img/ingestion-volume/metadata-ingest-budgets-page.png)

The page displays the following information:

* **Name**. Name of the ingest budget.
* **Scope**. The key value pair defining the metadata to include with the ingest budget. See [budget assignment](#budget-assignment) for details.
* **Capacity**. Maximum amount of data permitted. Bytes are calculated in base 2 (binary format, 1024 based).
* **Usage**. Percentage of data used. To refresh this information, close and reopen the main Collection tab.
* **Reset Time**. Time and time zone to reset the data usage tracking in HH:MM [timestamp format](/docs/send-data/reference-information/time-reference.md). This is fixed at a 24-hour time interval, so the reset time is triggered every 24 hours. Use the [IANA time zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) database format.
* **Allocated Capacity** (bottom of table). The total allocated capacity from all ingest budgets out of your account's available daily log ingest capacity is provided. If you assign all your log data to ingest budgets you can easily track how much data you are allowing Sumo Logic to ingest compared to your account's available daily log ingest quota.

At the top of the page, you can:

* **Search Ingest Budgets**.
* Select a [version](#versions) to **Show**.
* Click **+ Add Budget** to [create a new ingest budget](#create-ingest-budget). 

For the ingest budgets listed, select a row to view its details. A details pane appears to the right of the table.

![v2 IB pane.png](/img/ingestion-volume/ingest-budget-list.png)

In the details pane you can do the following to the selected ingest
budget:

* [Reset](#reset-ingest-budget)
* [Edit](#edit-ingest-budget)
* [Delete](#delete-ingest-budget)

When hovering over a row in the Ingest Budgets table there are icons that appear on the far right for editing and deleting the ingest budget.

#### Create ingest budget

1. In Sumo Logic select **Manage Data** > **Collection** > **Ingest Budgets**.
1. Click the **+ Add Budget** button on the top right of the table. A panel named **Create Ingest Budget** appears to the right of the Ingest Budgets table.
1. Provide the following information, all fields are required except Description.

   * **Display Name**. Enter the name you'd like to assign to the new ingest budget.
   * **Scope**. Define the log data to apply to the ingest budget. See [budget assignment](#budget-assignment) for details and review the [rules](#rules) above.
   * **Description** is optional.
   * **Allocated Capacity**. Set the maximum daily ingestion volume you want for the ingest budget.

     * **Amount**. Enter a value up to 1023.999.
     * **Unit**. Select a unit of memory. Bytes are calculated in base 2 (binary format, 1024 based).\

   * **Reset every day at**. Ingest budgets automatically reset their capacity utilization tracking every 24 hours based on the time and time zone you specify.

     * **Time**. Set the time of day to reset the capacity tracking.
     * **Time zone**. Set the time zone of the reset time.
     * **Action when capacity reached**. Select the action to take when the ingest budget's capacity is reached. All actions are [audited](#audit-index-queries).

       * **Stop** Collecting - Collection stops immediately. There are important differences depending on the [Source type](#source-type-behavior) and [version](#versions)
       * **Keep** Collecting - Collection remains the same.

   * **Audit Threshold**. The threshold, as a percentage, of when an ingest budget's capacity usage is logged in the Audit Index.

1. When you're finished configuring the ingest budget click **Add**.

#### Reset ingest budget

You can manually reset a budget at any time to set its capacity utilization tracking to zero. This won't affect the next scheduled reset time and can be done as many times as needed.

1. In Sumo Logic select **Manage Data** > **Collection** > **Ingest Budgets**.
1. In the table find the ingest budget you want to reset and click the row to open its details pane.
1. Click the **Reset** button.

#### Edit ingest budget

1. In Sumo Logic select **Manage Data** > **Collection** > **Ingest Budgets**.
1. In the table find the ingest budget you want to edit and click the edit icon ![pencil edit icon.png](/img/ingestion-volume/pencil-edit-icon.png) on the right of the row or click the row and then click the edit icon in the details panel.
1. Make your changes and click **Update**.

#### Delete ingest budget

1. In Sumo Logic select ****Manage Data > Collection > Ingest Budgets****.
1. In the table find the ingest budget you want to delete and click the delete icon ![delete trash icon.png](/img/ingestion-volume/delete-trash-icon.png) on the right of the row or click the row and then click the delete icon in the details panel.
1. You will get a confirmation prompt, ensure that you are deleting the desired ingest budget and then click **Delete**.

### Budget assignment examples

#### Control ingest by team or service

You can assign Collectors and Sources with [fields](/docs/manage/fields) based on teams and services. For example, a field could be `team=<name of the team>` or `service=<name of the service>`. With these fields assigned, you can create a budget with the scope `team=<name of the team>` to achieve team based budgets. You can leverage Source fields for finer control over the scope of the budget. You can map a model of your deployment or organization to metadata fields and then create ingest budgets with a scope referencing them.

#### Match against multiple budgets

Log messages can match against multiple budgets if two or more budgets have overlapping scopes. For example, see the following two budgets:

* Budget #1

    * Scope = "_sourceCategory=/service/payment/\*"  
    * Action = "stop collecting"  
    * Capacity= 10 GB

* Budget #2

    * Scope = "_sourceCategory=/service/payment/component/oracle"  
    * Action = "stop collecting"  
    * Capacity= 2 GB

In this case, all log messages ingested with `_sourceCategory=/service/payment/component/oracle` will match against both budget #1 and budget #2. This will consume capacity from both budgets. As expected, if either budget reaches its capacity, data will stop being collected since both budgets are set to stop collecting data.

This concept can be used to manage your ingestion with sub-budgets. Let’s understand this better with an example,

To ensure the combined daily ingestion for the infrastructure components ALB, Kafka, JBoss, and MySQL do not exceed 1 TB in total, and a daily limit of 400 GB, 200 GB, and 100 GB is placed on the ALB, Kafka, and JBoss components respectively you'd use the following configurations.

1. Configure all infrastructure component logs with the following fields: 

    * ALB logs: "component=ALB"
    * Kafla logs: "component=Kafka"
    * MySQL logs: "component=MySQL"
    * JBoss logs: "component=JBoss"

1. Create the budgets
   * Budget #1:
     * Scope=“component=\*”
     * Capacity= 1 TB
     * Action = “stop collecting” 
   * Budget #2:
     * Scope=“component=ALB”
     * Capacity= 400 GB
     * Action = “stop collecting” 
   * Budget #3:
     * Scope=“component=Kafka”
     * Capacity= 200 GB
     * Action = “stop collecting” 
   * Budget #4:
     * Scope=“component=JBoss”
     * Capacity= 100 GB
     * Action = “stop collecting”

### Audit ingest budgets

The [Audit Index](/docs/manage/security/audit-index) logs events when an ingest budget has reached its configured Audit Threshold percent. There are two different log formats. 

1. Approaching or exceeding capacity
1. Resets

**Approaching or exceeding capacity example**, where:

* `budget_name` is the name of the ingest budget.
* `budget_scope` is the ingest budget's scope.
* `Usage status` is either `Approaching` (≥ 85%) or `Exceeded` (≥ 100%) its set capacity limit.

```
Budget budget_name with scope budget_scope consumed 6330.00% of capacity since last reset at 2020-09-17T13:38:53.663 -0700.
Capacity: 200 bytes
Usage: 12660 bytes
Usage status: Exceeded
Action: drop_data
Next reset: 2020-09-18T13:35:00.000 -0700
```

**Reset example**, where `budget_name` is the name of the ingest budget and `budget_scope` is the ingest budget's scope:

```
Budget budget_name with scope budget_scope consumed 0.00% of capacity and is reset at 2020-09-18T00:03:34.574 -0700.
Capacity: 1000 bytes
Usage: 0 bytes
Next reset: 2020-09-19T00:00:00.000 -0700
```

#### Audit Index queries

You can schedule the following searches to get alerts when needed, see [scheduled searches](../../../alerts/scheduled-searches/schedule-search.md) for details.

Search for when approaching usage capacity (≥ 85%):

```sql
_index=sumologic_audit _sourceName=VOLUME_QUOTA _sourceCategory=account_management "Budget" "last reset" "Approaching"
```

Search for all available audit logs:

```sql
_index=sumologic_audit _sourceName=VOLUME_QUOTA _sourceCategory=account_management "Budget" "reset"
```

Search for only reset logs:

```sql
_index=sumologic_audit _sourceName=VOLUME_QUOTA _sourceCategory=account_management "Budget" "is reset"
```

Search for only capacity usage logs:

```sql
_index=sumologic_audit _sourceName=VOLUME_QUOTA _sourceCategory=account_management "Budget" "last reset"
```

### Health events

Health events allow you to keep track of the health of your Collectors, Sources, and Ingest Budgets. You can use them to find and investigate common errors and warnings that are known to cause collection issues. See [Health events](/docs/manage/health-events.md) for details.

Ingest budgets that have exceeded their capacity are placed in an **Error** health state. The following are two common queries used to investigate the health of ingest budgets.

A query to search for all ingest budgets that are over capacity.

```sql
_index=sumologic_system_events "IngestBudget"
| json "eventType","severityLevel", "resourceIdentity.type" as eventType , severity, resourceType
| where eventType = "Health-Change" AND resourceType = "IngestBudget" and severity="Error"
```  

A query to search for all ingest budgets that are nearing their capacity.

```sql
_index=sumologic_system_events "IngestBudget"
| json "eventType","severityLevel", "resourceIdentity.type" as eventType , severity, resourceType
| where eventType = "Health-Change" AND resourceType = "IngestBudget" and severity="Warning"
```

import useBaseUrl from '@docusaurus/useBaseUrl';

## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/manage/ingestion-volume/ingest-budgets/assign-collector-ingest-budget"><img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="icon" width="40"/><h4>Assign Collector to Ingest Budget</h4></a>
  <p>Learn how to assign a Collector to an Ingest Budget.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/manage/ingestion-volume/ingest-budgets/quickstart"><img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="icon" width="40"/><h4>Ingest Budgets Quickstart Tutorial</h4></a>
  <p>Learn how to create and use Ingest Budgets.</p>
  </div>
</div>
</div>

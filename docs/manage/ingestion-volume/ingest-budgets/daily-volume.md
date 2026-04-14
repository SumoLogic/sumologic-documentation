---
id: daily-volume
title: How to Set a Daily Log Ingestion Limit in Sumo Logic
sidebar_label: Daily Volume
description: Learn how to control the capacity of daily log ingestion volume sent to Sumo Logic from collectors.
keywords:
  - ingest-budget
  - log-ingestion-limit
  - reduce-log-ingestion-costs
  - daily-ingestion-limit
  - log-cost-control
  - per-team-ingestion-limit
  - ingestion-budget-scope
head:
  - tagName: script
    attributes:
      type: application/ld+json
    innerHTML: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to set a daily log ingestion limit in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Create an ingest budget under Data Management > Data Collection > Ingest Budget. Set a scope using a metadata field such as _sourceCategory or a custom field like team=payments, define the daily capacity limit, and choose whether to stop collecting or keep collecting when the limit is reached."
            }
          },
          {
            "@type": "Question",
            "name": "How to set a per-team log ingestion limit in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Assign a custom field such as team=payments to collectors or sources, then create an ingest budget with the scope team=payments and a daily capacity limit. Each team can have its own budget, and log data matching the scope counts against that team's limit."
            }
          },
          {
            "@type": "Question",
            "name": "What happens when a Sumo Logic ingest budget capacity is reached?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When the capacity is reached, Sumo Logic either stops collecting data or keeps collecting depending on the action configured. Stop Collecting halts ingestion immediately. Keep Collecting continues ingestion and logs the overage in the Audit Index."
            }
          },
          {
            "@type": "Question",
            "name": "How does Sumo Logic ingest budget scope work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The scope defines which log data the budget applies to. It uses a metadata field key-value pair such as _sourceCategory=prod/payments or a custom field like team=platform. A single wildcard is supported, for example _sourceCategory=prod*. Log data matching the scope counts against the budget's daily capacity."
            }
          },
          {
            "@type": "Question",
            "name": "When does a Sumo Logic ingest budget reset?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ingest budgets reset automatically every 24 hours at the time and time zone configured when the budget was created. A budget can also be reset manually at any time from the Ingest Budgets page, without affecting the next scheduled reset."
            }
          },
          {
            "@type": "Question",
            "name": "How to get alerted when an ingest budget is close to its limit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Set an Audit Threshold percentage when creating the budget. When usage reaches that threshold, an event is logged in the Audit Index. Schedule a search against the Audit Index to trigger an alert when the threshold is approaching or exceeded."
            }
          },
          {
            "@type": "Question",
            "name": "Can a log message count against multiple ingest budgets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. If two budgets have overlapping scopes, a log message matching both scopes consumes capacity from both budgets. This can be used to create sub-budgets — for example, a combined 1 TB limit across all services with separate per-service limits underneath."
            }
          }
        ]
      }
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::note
To manage ingest budgets via API, use the [Ingest Budget Management V2 API](/docs/api/ingest-budget-v2/). Ingest Budget Management V1 APIs have been removed and are no longer supported.
:::

import TerraformLink from '../../../reuse/terraform-link.md';

:::tip
You can use Terraform to manage ingest budgets with the [`sumologic_ingest_budget_v2`](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/ingest_budget_v2) resource.

<TerraformLink/>
:::

Ingest budgets control the daily volume of log data sent to Sumo Logic. Log data can be assigned to an ingest budget that defines a daily log capacity limit. The capacity is tracked based on the combined volume from all sources of log data. When an ingest budget's capacity is reached you can have Sumo Logic stop collecting the log data assigned to it to control costs.

Ingest budgets automatically reset their capacity utilization tracking every 24 hours based on the time and time zone you specify. For example, you can schedule an ingest budget to refresh every day at 02:00 in the America/Los_Angeles time zone. You can manually [reset an ingest budget](#reset-ingest-budget) at any time.

An ingest budget's capacity usage is logged in the Audit Index when the audit threshold is reached and continues to be logged until the budget is reset. To track and schedule alerts on ingest budget capacity-usage and resets see [audit ingest budgets](#audit-ingest-budgets).

## What permissions are required to use ingest budgets?

| Account Type | Account Level |
|:--------------|:--------------------------------------|
| CloudFlex | Enterprise |
| Credits | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

## What are the requirements and limits for ingest budgets?

* A maximum of **100 ingest budgets** per account.
* Bytes are calculated in base 2 (binary format, 1024 based).
* Ingest Budgets do not affect [throttling](/docs/manage/ingestion-volume/log-ingestion/#log-throttling). 
* [Traces](/docs/apm/traces) are not calculated and are not supported.
* Ingest budgets require the Manage Ingest Budgets [role capability](/docs/manage/users-roles/roles/role-capabilities/#data-management).
* Fields assigned with Field Extraction Rules are not supported in the scope of an Ingest Budget.
* `_budget` is a reserved keyword used by legacy ingest budgets. Do not use this reserved field when creating a new V2 ingest budget.
* Data is not automatically recovered or ingested later once the capacity tracking is reset.
* In the scope, do not wrap values in quotes, unless the value explicitly has quotes. For example, if you want to assign the scope with `_collector` and the name of the collector is `CloudTrail`, you would assign the scope as `_collector=CloudTrail` instead of `_collector="CloudTrail"`.

## How does ingest budget scope work?

The scope feature allows you to assign ingest budgets to your log data using one of the following options:

* A field that is enabled in the [Fields](/docs/manage/fields/) table. Note that fields created by [Field Extraction Rules](/docs/manage/field-extractions/create-field-extraction-rule) are not included in this option.
* One of the following built-in metadata fields: `_collector`, `_source`, `_sourceCategory`, `_sourceHost`, or `_sourceName`.

The value supports a single wildcard, such as `_sourceCategory=prod*payment`. For example, a scope expression like `_sourceCategory=/dev/catalog/*` implies that all incoming logs ingested into Sumo Logic with a matching `_sourceCategory` will fall under the scope of the given budget. See more [budget assignment examples](#budget-assignment-examples) below and review the [rules](#rules) above.

[V2 ingest budgets](/docs/api/ingest-budget-v2/) provide you the ability to assign budgets to your log data by either [fields](/docs/manage/fields) or the following [built in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields, `_collector`, `_source`, `_sourceCategory`, `_sourceHost`, and `_sourceName`.

## How do certain source types behave when ingestion is stopped?

Some hosted collector sources behave differently when a **Stop Collecting** action is triggered:

| Source type | Behaviour when stopped |
|:--|:--|
| HTTP sources | Drops data requests but still returns a `200 OK` response. |
| AWS S3-based sources | Skips objects. |
| Cloud Syslog sources | Keeps the connection open but drops incoming syslog messages. |

## How to manage ingest budgets?

Use the **Ingest Budgets** page to manage your ingest budgets.

[**New UI**](/docs/get-started/sumo-logic-ui/). To access the Ingest Budgets page, in the main Sumo Logic menu select **Data Management**, and then under **Data Collection** select **Ingest Budget**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Budget**.

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). To access the Ingest Budgets page, in the main Sumo Logic menu select **Manage Data > Collection > Ingest Budgets**.

<img src={useBaseUrl('img/manage/ingestion-volume/metadata-ingest-budgets-page.png')} alt="Metadata ingest budgets page" style={{border: '1px solid gray'}} width="800" />

The page displays the following information:

* **Name**. Name of the ingest budget.
* **Scope**. The key value pair defining the metadata to include with the ingest budget. See [budget assignment](#budget-assignment) for details.
* **Capacity**. Maximum amount of data permitted. Bytes are calculated in base 2 (binary format, 1024 based).
* **Usage**. Percentage of data used. To refresh this information, close and reopen the main Collection tab.
* **Reset Time**. Time and time zone to reset the data usage tracking in HH:MM [timestamp format](/docs/send-data/reference-information/time-reference.md). This is fixed at a 24-hour time interval, so the reset time is triggered every 24 hours. Use the [IANA time zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) database format.
* **Allocated Capacity** (bottom of table). The total allocated capacity from all ingest budgets out of your account's available daily log ingest capacity is provided. If you assign all your log data to ingest budgets you can easily track how much data you are allowing Sumo Logic to ingest compared to your account's available daily log ingest quota.

At the top of the page, you can click **+ Add Budget** to [create a new ingest budget](#create-ingest-budget). 

For the ingest budgets listed, select a row to view its details. A details pane appears to the right of the table.

<img src={useBaseUrl('img/manage/ingestion-volume/ingest-budget-list.png')} alt="Ingest budgets pane" style={{border: '1px solid gray'}} width="400" />

In the details pane you can do the following to the selected ingest
budget:

* [Reset](#reset-ingest-budget)
* [Edit](#edit-ingest-budget)
* [Delete](#delete-ingest-budget)

When hovering over a row in the Ingest Budgets table there are icons that appear on the far right for editing and deleting the ingest budget.

## How to create an ingest budget?

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Data Collection** select **Ingest Budget**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Budget**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Ingest Budgets**. 
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
       * **Stop** Collecting - Collection stops immediately. There are important differences depending on the [source type](#source-type-behavior).
       * **Keep** Collecting - Collection remains the same.
   * **Audit Threshold**. The threshold, as a percentage, of when an ingest budget's capacity usage is logged in the Audit Index.
1. When you're finished configuring the ingest budget click **Add**.

## How to reset an ingest budget manually?

You can manually reset a budget at any time to set its capacity utilization tracking to zero. This won't affect the next scheduled reset time and can be done as many times as needed.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Data Collection** select **Ingest Budget**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Budget**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Ingest Budgets**. 
1. In the table find the ingest budget you want to reset and click the row to open its details pane.
1. Click the **Reset** button.

## How to edit an ingest budget?

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Data Collection** select **Ingest Budget**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Budget**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Ingest Budgets**. 
1. In the table find the ingest budget you want to edit and click the edit icon <img src={useBaseUrl('img/manage/ingestion-volume/pencil-edit-icon.png')} alt="Pencil edit icon" width="25" /> on the right of the row or click the row and then click the edit icon in the details panel.
1. Make your changes and click **Update**.

## How to delete an ingest budget?

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Data Collection** select **Ingest Budget**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Budget**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Ingest Budgets**. 
1. In the table find the ingest budget you want to delete and click the delete icon <img src={useBaseUrl('img/manage/ingestion-volume/delete-trash-icon.png')} alt="Delete trash icon" width="25" /> on the right of the row or click the row and then click the delete icon in the details panel.
1. You will get a confirmation prompt, ensure that you are deleting the desired ingest budget and then click **Delete**.

## How to control ingest by team or service?

You can assign collectors and sources with [fields](/docs/manage/fields) based on teams and services. For example, a field could be `team=<name of the team>` or `service=<name of the service>`. With these fields assigned, you can create a budget with the scope `team=<name of the team>` to achieve team based budgets. You can leverage source fields for finer control over the scope of the budget. You can map a model of your deployment or organization to metadata fields and then create ingest budgets with a scope referencing them.

## Can a log message match against multiple budgets?

Yes. Log messages can match against multiple budgets if two or more budgets have overlapping scopes. For example, see the following two budgets:

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

## How do I get alerted when an ingest budget is approaching its limit?

The [Audit Index](/docs/manage/security/audit-indexes/audit-index) logs events when an ingest budget has reached its configured Audit Threshold percent. There are two different log formats. 

1. Approaching or exceeding capacity
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

1. Resets

  `budget_name` is the name of the ingest budget and `budget_scope` is the ingest budget's scope:

  ```
  Budget budget_name with scope budget_scope consumed 0.00% of capacity and is reset at 2020-09-18T00:03:34.574 -0700.
  Capacity: 1000 bytes
  Usage: 0 bytes
  Next reset: 2020-09-19T00:00:00.000 -0700
  ```

You can schedule the following searches to get alerts when needed, see [Create a Scheduled Search](/docs/alerts/scheduled-searches/schedule-search/) for details.

Search for when approaching usage capacity (≥ 85%):

```sumo
_index=sumologic_audit _sourceName=VOLUME_QUOTA _sourceCategory=account_management "Budget" "last reset" "Approaching"
```

Search for all available audit logs:

```sumo
_index=sumologic_audit _sourceName=VOLUME_QUOTA _sourceCategory=account_management "Budget" "reset"
```

Search for only reset logs:

```sumo
_index=sumologic_audit _sourceName=VOLUME_QUOTA _sourceCategory=account_management "Budget" "is reset"
```

Search for only capacity usage logs:

```sumo
_index=sumologic_audit _sourceName=VOLUME_QUOTA _sourceCategory=account_management "Budget" "last reset"
```

## How do I monitor the health of ingest budgets?

Health events allow you to keep track of the health of your collectors, sources, and ingest budgets. You can use them to find and investigate common errors and warnings that are known to cause collection issues. See [Health Events](/docs/manage/health-events.md) for details.

Ingest budgets that have exceeded their capacity are placed in an error health state. The following are two common queries used to investigate the health of ingest budgets.

A query to search for all ingest budgets that are over capacity.

```sumo
_index=sumologic_system_events "IngestBudget"
| json "eventType","severityLevel", "resourceIdentity.type" as eventType , severity, resourceType
| where eventType = "Health-Change" AND resourceType = "IngestBudget" and severity="Error"
```  

A query to search for all ingest budgets that are nearing their capacity.

```sumo
_index=sumologic_system_events "IngestBudget"
| json "eventType","severityLevel", "resourceIdentity.type" as eventType , severity, resourceType
| where eventType = "Health-Change" AND resourceType = "IngestBudget" and severity="Warning"
```

## Where can ingest budgets be managed programmatically?

- **API**. [Ingest Budget Management V2 API](/docs/api/ingest-budget-v2/)
- **Terraform**. [`sumologic_ingest_budget_v2`](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/ingest_budget_v2)


## FAQs

### How to set a daily log ingestion limit in Sumo Logic?

Create an ingest budget under **Data Management > Data Collection > Ingest Budget**. Set a scope using a metadata field such as `_sourceCategory` or a custom field like `team=payments`, define the daily capacity limit, and choose whether to stop collecting or keep collecting when the limit is reached.

### How to set a per-team log ingestion limit?

Assign a custom field such as `team=payments` to the relevant collectors or sources, then create an ingest budget with the scope `team=payments` and a daily capacity. Each team can have its own budget with an independent daily limit.

### What happens when an ingest budget capacity is reached?

If the action is set to **Stop Collecting**, ingestion halts immediately for all sources matching the scope. If set to **Keep Collecting**, ingestion continues and the overage is logged in the Audit Index for monitoring and alerting.

### How does ingest budget scope work?

The scope is a metadata key-value pair that defines which log data counts against the budget. Use built-in fields like `_sourceCategory=prod/payments` or custom fields like `team=platform`. A single wildcard is supported — for example, `_sourceCategory=prod*`.

### When does an ingest budget reset?

Ingest budgets reset automatically every 24 hours at the configured time and time zone. A budget can also be reset manually at any time from the Ingest Budgets page without affecting the next scheduled reset.

### How to get alerted when an ingest budget is close to its limit?

Set an **Audit Threshold** when creating the budget. When usage reaches that percentage, an event is logged in the Audit Index. Schedule a search against the Audit Index to send an alert notification when the threshold is approaching or exceeded.

### Can a log message count against more than one ingest budget?

Yes. If two budgets have overlapping scopes, a matching log message consumes capacity from both. This is useful for creating sub-budgets — for example, a total combined limit with separate per-service or per-team limits underneath.
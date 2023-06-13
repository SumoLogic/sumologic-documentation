---
id: cloud-flex-credits-accounts
title: Cloud Flex Credits Accounts
description: View information on Sumo Logic Cloud Flex Credits account and intuitively monitor usage and manage account costs.
---


Sumo Logic provides flexible account types within its Cloud Flex Credits packaging for any size organization. A **credit** is a unit of measure that tracks use, whether data ingested (GB), storage, or metrics, throughout a contract period. Credits can be used as needed for your desired purpose. This allows you to carefully manage your account.

This page provides information on the Cloud Flex Credits account types you can choose, and then explains how to monitor and manage your account.

## Cloud Flex Credits - Account Types

You can select from Free, Trial, Essentials, Enterprise Operations, Enterprise Security, or Enterprise Suite Cloud Flex Credits accounts.

* **Free** accounts give you access to most Sumo Logic features, with a credit allocation of 20 credits a day. Credits can be used for log, metrics, and traces, in any combination that meets your needs. The retention period for logs is 7 days. Free accounts allow three users. Free account holders can [upgrade](upgrade-cloud-flex-account.md) to Sumo Logic paid service agreements in the Sumo Logic UI. 
* **Trial** accounts allow you to try all of Sumo Logic's advanced features to understand how Sumo Logic will fit within your organization before you buy. It includes a credit allocation to support a daily data volume limit of 1 GB per day, with 20 users and 30 days of data retention. If you use up the credits allocated for the trial period before the period ends, Sumo Logic’s [standard throttling mechanism](../ingestion-volume/log-ingestion.md) will be applied to your log ingest, For information on Trial account features, see [Cloud Flex accounts](#cloud-flex-credits---account-types).  
  :::note
  Trials are limited to 30 days. If you require an extended trial period, contact [sales@sumologic.com](mailto:sales@sumologic.com) to inquire about a Proof of Concept (PoC).
  :::
* **Essentials**  accounts scale to meet your growing needs for user licenses, data retention, and volume options based on subscription. You can [upgrade](upgrade-cloud-flex-account.md) from a Essential account to either Enterprise Operations, Enterprise Security, or Enterprise Suite accounts  at any time.
* **Enterprise** **Operations** accounts are optimized for best practice operational monitoring at any ingest volume.
* **Enterprise** **Security** accounts include advanced security capabilities. Enterprise Security is ideal for security operation centers (SOCs). SOC teams can leverage the latest PCI compliance application frameworks and threat detection capabilities.  
* **Enterprise** **Suite** accounts are optimized to address the most advanced data insight challenges. Enterprise Suite accounts include all of Sumo Logic’s industry-leading capabilities including Sumo Logic’s Tiered Analytics.
  :::important
  [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets) are only available for Enterprise Operations, Enterprise Security, and Enterprise Suite accounts. Ingest budgets control the capacity of daily log ingestion volume sent to Sumo Logic from collectors.

  It's important to keep track of your daily data usage. For tips on how to monitor and limit the data you're sending to Sumo Logic, see [Log Ingestion](../ingestion-volume/log-ingestion.md).
  :::
## Features by subscription type

The following table provides a summary list of key features by Sumo Logic Cloud Flex Credits package accounts. For Free and Trial account details, see the details for [Cloud Flex accounts](cloud-flex-accounts.md).

| Feature | Free | Trial | Essentials | Enterprise Operations | Enterprise Security | Enterprise Suite |
|:-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Audit Index | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Audit Event Index |  | ![check](/img/reuse/check.png) |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| CrowdStrike Threat Intel |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Collector Management API | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Data Forwarding | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Data Volume Index | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Field Extraction | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Ingest Budgets | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Log Data storage  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Log Data Continuous Volume | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Log Data Frequent Tier Volume | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| LogReduce | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Lookup Tables |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Metrics | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Metrics data retention	 | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Metrics volume | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Monitors | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Partitions | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| PCI Compliance App |  | ![check](/img/reuse/check.png) |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Real Time Alerts | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| SAML | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Scheduled Views | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Search Job API |  | ![check](/img/reuse/check.png) |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Support |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Sumo Logic Apps | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Traces | ![check](/img/reuse/check.png)<br/>Up to 1.5GB per day* | ![check](/img/reuse/check.png)<br/>Up to 5GB per day | ![check](/img/reuse/check.png)<br/>5GB per day | ![check](/img/reuse/check.png) |  | ![check](/img/reuse/check.png) |
| User and Role APIs | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |

\* Contact your account manager to customize your account to meet your organization's needs.

## Account Page

The **Account Overview** tab of the  **Account** page for Cloud Flex Credits displays information about your Sumo Logic organization, account type, contract and billing periods, number of credits you've used, as well as live dashboards and real time alerts. The account owner can reassign the Account Owner role from this page.

:::note
This page is strictly access controlled. You must have a role that grants you the View Account Overview capability to view the **Account Overview** tab. 
:::

[Data Tiers](/docs/manage/partitions-data-tiers) are available as part of the Enterprise Suite Package Account, and provide economic flexibility by aligning your analytics to the value of your data. By using the Continuous, Frequent, and Infrequent tiers, you can segment your data by use case and analytics needs, thus optimizing your analytics investments.

:::note
For more information on Data Tiers, contact your Sumo Logic account manager.
:::

The Account page provides an at-a-glance view of your account information in the following panels.

### Top left panel 

* **Organization.** Displays the name of your Sumo Logic organization, and its hexadecimal organization ID number. This helps Sumo identify your account.
* **Plan Type.** Displays your account type for your Sumo Logic subscription such as Essentials or Enterprise Suite
* **Contract Period.** Displays the start and end dates of your contract period.
* **Live Dashboard Panels and Real Time Alerts Count**. A count of all real-time activity in your account.

### Total Credit Usage 

* **Credits Used.** Displays the number of credits used and the percentage used since the beginning of your current contract. 
* **Credits remaining.** Displays number of credits remaining as well as the percentage of credits used since the beginning of your current contract.


### Usage Forecast

The usage forecast gives you an opportunity to see the potential end of the current credtits and an estimate on when those credits will end. 

* **Upgrade Plan** Link to the upgrade account page, where you can message your request for an account upgrade to your account manager.
* **Forecasted use** Predicts your credit usage by end of the contract period. 
* **Credits exhaust** The predicted number of days and the exact date when we estimate your current credits will be exhausted.

### Usage Details by Category 

* **Usage Details.** Shows graphs that represent detail usage of Sumo Credits by ingest, storage, or any type of data service utilized from the start of the contract period.
* **Usage Categories** Table displaying the credits used, % of credits used, and units by usage categories, ingest type and promotional credits usage.

### Promotional Credits

There are times when Sumo Logic promotes services and consumables through the provision of Promotional Credits. Promotional Credits are non-transferrable and auto-expire at the end of the promotion period.  In other words, if the Promotional Credits are not used within the promotion period, they do not carry over. They are of a use-it-or-lose-it nature. Promotional Credits are specific to a promotion and cannot be used for any service. The criteria, including promotion period, are listed in your contract. Promotional Credit consumption is calculated separately from the credits you paid for in your contract period. Promotional Credits are utilized as the priority credit for the specified credit variable.

For example, if the your contract period is licensed for 100,000 credits and 10,000 promotional credits for "Metrics” and you're using all your credits for metrics, Promotional Credits will be the first 10,000 credits used. Once the Promotional Credits are depleted, paid credits will  be  used for metrics. The ability to filter down to  he focused credit component and see more detailed patterns extends to Promotional Credits as well as paid credits. For more information, see [Monitoring Promotional Credit Usage](cloud-flex-credits-accounts.md).

* **Promotional Credits** bar graphs show the rate at which you are consuming your allocated Promotional Credits.

### Viewing the account information

To view the Account page, do the following:

1. Log in to your Sumo Logic Cloud Flex Credits account.
1. In the left navigation bar, select **Administration** > **Account**. The Account Overview tab is shown by default.

:::note
You must have a role that grants you the View Account Overview capability to view the **Account Overview** tab. 
:::

Be aware of the following features:

* **Details of Credit Usage** allow you to review your consumption by usage categories and credit types.
* View consumption by day, week, or month. 
* View consumption by time period. 
* Download a report on usage, or just on credits usage as a CSV file. 

![account-overview-credits.png](/img/account/account-usage-fields.png)

:::note
If are the Sumo Logic account owner, your Account page also displays a **Manage Organization** section. For instructions on this options, see [Manage Organization](manage-org-settings.md).
:::

![Manage_Organization_options.png](/img/subscriptions/Manage_Organization_options.png)

## Monitoring account usage 

The Usage (Sumo Credits) panel at the bottom of the Account Overview page provides at-a-glance analytics with which you can intuitively monitor your account usage in comparison to your contract capacity. In the Usage panel, you can do the following:

* Review your usage to date.
* Review usage forecast based on usage to date.
* View data usage comparisons for data tiers.
* View data comparisons for total storage or metrics.
* Drill into a selected time interval for a more granular view of usage data.
* Monitor Promotional Credit usage.

### Usage categories

The Usage Details panel contains the following usage categories:

* **Continuous Ingest**. Credits used for logs ingested into the Continuous tier.
* **Frequent Ingest**. Credits used for logs ingested into the Frequent tier.
* **Infrequent Ingest**. Credits used for logs ingested into the Infrequent tier.
* **Infrequent Scan**. Credits used to scan data for Infrequent tier searches.
* **CSE Ingest**. Credits used for logs ingested into Cloud SIEM Enterprise (CSE).
* **Metrics Ingest**. Credits used for metrics ingested.
* **Storage**. Credits used for log storage in the Continuous and Frequent tiers. 
* **Infrequent Storage**. Credits used for log storage in the Infrequent tier. 
* **Promotional categories**. See [Monitoring Promotional Credit usage](cloud-flex-accounts.md).

### Changing views and time intervals

The Sumo Logic Account page allows you to easily monitor your data usage over selected time intervals, including total storage and metrics usage.

To switch between views and time interval displays:

1. Log in to Sumo Logic and select **Administration > Account** in the left navigation pane.

    The Account page appears with the Account Overview tab shown by default. From this tab you can see your subscription type, current credit usage, and forecasted usage as well as drill down by data tier or promotional credit type.

1. To only view data for a specific analytic type or types, go to the bottom of the **Usage Details** panel and click the check box next to the analytic type or types you want to exclude. ![account-details-of-credit-usage.png](/img/account/account-details-of-credit-usage.png)

1. To toggle an analytic data type back on, click the blank icon next to the data type name.

    The analytic data type reappears in the graph and the credit usage for the data type is once again included.

1. To change the aggregation of the data, click the **Group by** arrow and choose **day**, **week**, or **month** from the dropdown list. The default is **View By Day**.


### Drilling into usage data

You can easily drill into usage graph for a more granular view of the data, with the added ability of scrolling through the display with a swipe of your cursor.

To drill into usage data, do the following:

1. In the Usage Details panel, drag your cursor over the graph intervals you want to analyze in greater detail.

1. To scroll through the data, click the Zoom (magnifying glass) icon to toggle On the Pan feature, then select the background and drag your cursor to the left and right. Optionally, hover the cursor over an area on the chart to view a pop-up with detailed information.

### Monitoring Promotional Credit usage

You can filter for a focused credit component to assess your Promotional Credit usage, in the same way you [drill into usage data](/docs/manage/manage-subscription/cloud-flex-credits-accounts/#monitoring-promotional-credit-usage) for paid credits.

To monitor your Promotional Credit usage:

1. In the Details Credits Usage panel, deselect all Usage Categories. Only Promotional credits will remain. 

1. To only view data for a specific analytic type, deselect individual options under Promotional Credits such as Continuous Ingest, Storage, or Infrequent Ingest to see those options removed from the Credits used chart.
 

    

---
id: cloud-flex-accounts
title: Cloud Flex Accounts
description: View information on your Sumo Logic Cloud Flex account and intuitively monitor usage and manage account costs.
---


Sumo Logic provides flexible account types within its Cloud Flex packaging for any size organization. This page provides information on the Cloud Flex account types from which you can choose, then explains how you can intuitively monitor and manage your account.

## Cloud Flex - Account Types

* **Free** accounts give you access to core Sumo Logic features, with a daily 500 MB data volume limit. Free accounts allow three users, with 4 GB of retention. For information about Free account features, see the "Free Accounts" column in the following table and the Important notes section on [Sumo Logic Free accounts](#important-notes-on-sumo-logic-free-accounts).

    :::tip
    Free account holders can [upgrade](upgrade-cloud-flex-account.md) to Professional from within Sumo Logic.
    :::

* **Trial** accounts allow you to try all of Sumo Logic's advanced features to understand how Sumo Logic will fit within your organization before you buy. It includes a daily data volume limit of 1 GB per day, with 20 users and 30 days of data retention. For information about Trial account features, see the "Trial Accounts" column in the table below and [Important notes on Sumo Logic Trial accounts](#important-notes-on-sumo-logic-free-accounts).  

    :::note
    Trials are limited to 30 days. If you require an extended trial period, contact [sales@sumologic.com](mailto:sales@sumologic.com) to inquire about a Proof of Concept (PoC).
    :::

* **Professional** accounts scale to meet your growing needs for user licenses, data retention, and volume options based on subscription. You can [upgrade](upgrade-cloud-flex-account.md) from a Professional to an Enterprise account at any time.
* **Enterprise** accounts, the premier Sumo Logic log management solution, are built to fit your organization's needs for data volume, data retention, and user management requirements. Enterprise accounts include [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets) and [SAML-based SSO](../security/saml/set-up-saml.md). 

    :::note
    [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets/) are only available for Enterprise accounts. Ingest budgets control the capacity of daily log ingestion volume sent to Sumo Logic from Collectors.
    :::

The following table provides a summary list of key features by Sumo Logic Cloud Flex package accounts. 

| Feature | Free | Trial | Professional | Enterprise |
|:-- | :-- | :-- | :-- | :-- |
| Audit Index |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Audit Event Index |  | ![check](/img/reuse/check.png) |  | ![check](/img/reuse/check.png) |
| [Collector Management API](https://github.com/SumoLogic/sumo-api-doc/wiki/collectors) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Dashboards - Live Mode  | 7 days | 30 days | 30 days | 30 days |
| [Data Forwarding](/docs/manage/data-forwarding) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| [Field Extraction](/docs/manage/field-extractions) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Log Data retention (Classic Accounts) | 7 days | 30 days | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Log Data storage (Cloud Flex Accounts) | 4GB	 | 30GB | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Log Data volume | 500MB per day | 1GB per day* | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| [LogReduce](/docs/search/logreduce)  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| [Lookup Tables](/docs/search/lookup-tables) | none | Varies by the  account type being trialed | 10 tables per org | 100 tables per org |
| Metrics |   | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Metrics data retention |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Metrics data retention |   | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| [Partitions](/docs/manage/partitions-data-tiers) | | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Real Time Alerts | | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| SAML |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Scheduled Views |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Search Job API |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Support |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Sumo Logic Apps | QuickStart only | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Users (Classic Accounts) | Three users | 20 users* | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| User and Role APIs | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |

\* Contact [Sumo Logic Sales](mailto:sales@sumologic.com) to customize your account to meet your organization's needs.

:::important
It's important to keep track of your daily usage. For tips on how to monitor and limit the data you're sending to Sumo Logic, see [Manage Ingestion.](../ingestion-volume/log-ingestion.md)
:::

## Account Limitations and Guidelines

To efficiently manage ingestion into your Sumo Logic account, familiarize yourself with the following limitations and guidelines.

### Account Capacity Limitations

* An account that is within its limits is defined as using **Reserved Capacity.**
* An account that is over its limits is defined as using **On-Demand Capacity**.

### Collection Limitations

* The maximum number of Collectors allowed per organization is 10,000.
* The maximum number of Sources allowed on a Collector is 1,000.
* The maximum number of Processing Rules allowed on a Source is 100.

### Continuous Query Limitations

For all Sumo Logic account types (except for Sumo Logic Free) there is an overall limit of 200 continuous queries per Sumo Logic organization that can be run at one time. This includes Dashboard Panels, Alerts, and all other types of queries. 

### Data Limits for Metrics

For billing and reporting purposes, data volume for metrics is measured in Data Points per Minute (DPM). When the DPM limit is exceeded, data is cached on the host and the Source is throttled. The calculation of DPM varies according to the type of metric Source. For details, see [Data Limits for Metrics](../../metrics/manage-metric-volume/data-limits-for-metrics.md). 

## Important notes on Sumo Logic Free accounts

Using a Free account is a great way to get to know Sumo Logic. While you're trying the Sumo Logic service, here are important points to be aware of:

* Free accounts run on seven-day intervals. This means that over the course of seven days, you can't ingest more than a total of 3.5 GB of log data.
* If you begin to reach the 500 MB daily limit, Sumo Logic sends an email to let you know. You can take action to [reduce the amount of data](../partitions-data-tiers/manage-indexes-variable-retention.md) you're uploading in order to stay below the limit.
* If the 500 MB limit is surpassed, you'll receive an email letting you know that data in the Sumo Logic Cloud can no longer be searched (but additional data is still collected). However, if the data limit is fully exceeded, data collection stops (in addition to search being disabled). Disabled features will be available after your usage falls below 4 GB when averaged over seven days (this could take one day, or up to seven days, depending on the amount of data you've uploaded and where you've uploaded it).
* In extreme situations, Free accounts may be disabled if the data volume continues to exceed the limits.
* Free accounts are limited to 20 continuous queries, including [Dashboard Panels](/docs/dashboards/about).
* Because Free accounts run on seven-day intervals, [Dashboard Panel](/docs/dashboards/about) queries may not use a time range longer than seven days.
* For Sumo Logic Apps, Free accounts are limited to install the [Log Analysis QuickStart app](/docs/get-started/apps-integrations#log-analysis-quickstart-app).
* The limitations of a Free account can't be changed, but you can upgrade to a Professional account at any time.
* For information on throttling and account caps, see [Manage Ingestion](../ingestion-volume/log-ingestion.md).

### Important notes on Sumo Logic Trial accounts

Using a Trial account is a great way to learn about the advanced features of Sumo Logic. While you're trying the Sumo Logic service, there are a few points that are important to be aware of:

* Trial accounts are allowed to burst up to 5 GB a day for short periods.
* For information on throttling and account caps, see [Manage Ingestion](../ingestion-volume/log-ingestion.md).

## Account Page

The **Account** page displays information about your Sumo Logic organization, account type, billing period, and the number of users. It also allows the account owner to reassign the role of the Account Owner.

[Data Tiers](../partitions-data-tiers/data-tiers.md) provide economic flexibility by aligning your analytics to the value of your data. By using the Continuous and Frequent tiers, you can appropriately segment your data by use case and analytics needs, thus enabling you to optimize your analytics investments.

:::note
[Data Tiers](../partitions-data-tiers/data-tiers.md) must be enabled on your Cloud Flex plan to be able to access this functionality. For more information, contact your Sumo Logic Account Representative.
:::

The top panel of the Account Overview page provides an at-a-glance view of your account information:

* **Organization.** Displays the name of your Sumo Logic organization, and its hexadecimal organization ID number. This helps Sumo identify your account.
* **Plan Type.** Displays your account type for your Sumo Logic subscription such as Professional or Enterprise edition and whether you are billed on the Cloud Flex or Classic Plan.
* **Contract Period**. Displays the start and end date of the current contract period.
* **Current Billing Period.** Displays the start and end date of the current billing period.
* **Continuous Ingest.** Shows your daily capacity for log ingest to the Continuous Data Tier, and your average daily usage. If the daily ingest average over the billing cycle is above your capacity, you will be charged the on-demand rate for the difference.
* **Frequent Ingest**. Shows your daily capacity for log ingest to the Frequent Data Tier, and your average daily usage. If the daily ingest average over the billing cycle is above your capacity, you will be charged the on-demand rate for the difference.
* **Metrics Ingest**. Shows your daily capacity for metrics ingest, and your average daily usage, both in DPM. If the daily ingest average over the billing cycle is above your capacity, you will be charged the on-demand rate for the difference. If your daily usage average is higher than your capacity, you will be charged the on-demand rate for the difference.
* **Storage.** Shows your daily storage capacity and average daily storage usage. You can adjust capacity use by modifying your [retention periods](../partitions-data-tiers/manage-indexes-variable-retention.md).
* **Live Dashboard Panels and Real Time Alerts.** Show the number of live dashboard panels and real time alerts you have set up. Compares the number allowed to the number already in use. For example, out of 200, 174 have been used.

To view the Account page, do the following:

1. Log in to your Sumo Logic Cloud Flex account.
1. In the left navigation bar of the UI, select **Administration** > **Account**. The Account Overview tab of the Account page is shown by default.

    :::note
    You must have a role that grants you the Account Overview capability to view the Account Overview tab.
    :::

![CloudFlex-AccountPage.png](/img/subscriptions/cloud-flex-account-page.png)

:::note
If you are your Sumo Logic account owner, your Account page also displays a **Manage Organization** section. For information on these options, see [Manage Organization](manage-org-settings.md).
:::

![manage-org-links.png](/img/subscriptions/manage-org-links.png)

## Monitoring account usage

The bottom panel of the Account Overview page provides at-a-glance analytics with which you can intuitively monitor the daily capacity of your data usage in the following ways:

* View data for a specific analytic tier, if you are utilizing multiple analytics tiers for your data.
* View data for total storage.
* View data for metrics usage.
* View data for a specific billing period.
* Drill into a selected time interval for a more granular view of usage data.

### Changing views and time intervals

The Sumo Logic Account page allows you to easily monitor your data usage on different analytics tiers, as well as total storage and metrics usage. 

:::note
Red text indicates that you are exceeding your contract capacity.
:::

The following visual indicators apply:

* A dotted line indicates the account limit.
* Red text indicates an overage of your account limit.

To switch between views and time interval displays, do the following:

1. Log in to Sumo Logic and select **Administration** > **Account** in the left navigation pane. The Account page appears with the Account Overview tab shown by default. The top panel shows account details and the bottom panel displays usage analytics.

![CloudFlex-AccountPage.png](/img/subscriptions/pqs.png)

1. To change the type of analytics you are viewing, in the **Usage (Daily Capacity)** panel click the arrow next to the view name and select the analytics type from the dropdown list. The display data changes accordingly. Repeat as needed to monitor all the areas of your account usage.
1. To view data from a different billing period, click the arrow next the the **Billing period** and choose another period from the dropdown list.

![CloudFlex_Usage_BillingPeriod_menu.png](/img/subscriptions/uage-billing-period.png)

The data display changes accordingly. 

### Drilling into usage data 

You can easily drill into usage graph data for a more granular view, with the added ability of scrolling through the display with a swipe of your cursor.

To drill into usage data, do the following:

1. In the Usage panel, drag your cursor over the graph intervals you want to analyze in greater detail. As you drag your cursor, the bars on the chart will be highlighted.

    ![CloudFlex_Drilldown_select.png](/img/subscriptions/zoom-selection.png)

    When you release the cursor, the display changes accordingly.

    ![CloudFlex_Drilldown_select-results.png](/img/subscriptions/zoomed-in.png)

1. To scroll through the data, click the Zoom icon to toggle On the Pan feature, then select the background and drag your cursor to the left and right.

    ![CloudFlex_Drilldown_scroll.png](/img/subscriptions/pan-feature.png)

1. To drill down further, repeat step 1 and 2 as needed.
1. To return to the original data display, click the Reset icon.

    ![CloudFlex_Drilldown_reset.png](/img/subscriptions/reset-icon.png)

    The display changes accordingly.

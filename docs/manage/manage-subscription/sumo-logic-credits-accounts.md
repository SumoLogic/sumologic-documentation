---
id: sumo-logic-credits-accounts
title: Sumo Logic Credits Accounts
sidebar_label: Credits Accounts
description: View information on Sumo Logic Credits accounts and intuitively monitor usage and manage account costs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import AccountCredit from '../../reuse/account-credit.md';

Sumo Logic provides flexible account types within its Credits packaging for any size organization.

<AccountCredit/>

This page provides information on the Credits account types and how to monitor and manage your account.

:::note
This plan was formerly called *Cloud Flex Credits*.
:::

## Credits - Account types

Sumo Logic offers the following account types: Free, Trial, Essentials, Enterprise Operations, Enterprise Security, and Enterprise Suite.

### Free

Free accounts offer access to most Sumo Logic features with the following limitations:
- **Daily Credit Allocation**. 20 credits for logs, metrics, and traces.
- **Retention**. 7-day log retention.
- **Users**. Limited to three users.

Free accounts can be upgraded to a paid subscription in the Sumo Logic UI. For details, see [Upgrade a Sumo Logic Credits Account](/docs/manage/manage-subscription/upgrade-account/upgrade-sumo-logic-credits-account).

:::note
Free accounts do not support [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management).
:::

### Trial

Trial accounts allow full access all Sumo Logic features to test how Sumo Logic will fit within your organization before you buy. It includes:
- **Daily Credit Allocation**: Supports a daily data volume limit of 1 GB per day.
- **Retention**: 30 days for all data.
- **Users**: Up to 20 users.

Trial accounts enable you to leverage our full suite of [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management) tools:
* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Account > Data Management**.
* [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Data Management**. You can also click the **Go To...** menu at the top of the screen and select **Data Management**.

Trials are limited to 30 days. If you use up the credits allocated for the trial period before the period ends, Sumo Logic’s [standard throttling mechanism](../ingestion-volume/log-ingestion.md) will be applied to your log ingest. If you need to extend your trial period or request a Proof of Concept (PoC), contact our [sales team](mailto:sales@sumologic.com).

### Essentials

Essentials accounts scale to meet your growing needs for user licenses, data retention, and volume options. The Essentials plan includes options tailored to various needs:

* **Troubleshoot**. Foundational log analysis and troubleshooting.
* **Collaborate**. Advanced team collaboration features.
* **Orchestrate**. Designed for organizations requiring robust workflows and automation.

For details on upgrading to an Essentials plan or higher, see [Upgrade a Sumo Logic Credits Account](/docs/manage/manage-subscription/upgrade-account/upgrade-sumo-logic-credits-account). Essentials accounts can be upgraded to Enterprise accounts anytime.

### Enterprise Operations

Enterprise Operations accounts are optimized for best practice operational monitoring at any ingest volume.

[Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets), an Enterprise plan feature, control the capacity of daily log ingestion volume sent to Sumo Logic from collectors. It's important to keep track of your daily data usage. For tips on how to monitor and limit the data you're sending to Sumo Logic, see [Log Ingestion](../ingestion-volume/log-ingestion.md).

### Enterprise Security

Enterprise Security accounts include advanced security capabilities. Enterprise Security is ideal for security operation centers (SOCs). SOC teams can leverage the latest PCI compliance application frameworks and threat detection capabilities.  

[Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets), an Enterprise plan feature, control the capacity of daily log ingestion volume sent to Sumo Logic from collectors. It's important to keep track of your daily data usage. For tips on how to monitor and limit the data you're sending to Sumo Logic, see [Log Ingestion](../ingestion-volume/log-ingestion.md).

### Enterprise Suite

Enterprise Suite accounts are optimized to address the most advanced data insight challenges. Enterprise Suite accounts include all of Sumo Logic’s industry-leading capabilities including Sumo Logic’s Tiered Analytics.

[Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets), an Enterprise plan feature, control the capacity of daily log ingestion volume sent to Sumo Logic from collectors. It's important to keep track of your daily data usage. For tips on how to monitor and limit the data you're sending to Sumo Logic, see [Log Ingestion](../ingestion-volume/log-ingestion.md).

## Features by plan type

The following table provides a summary list of key features by Credits package accounts.

| Feature | Free | Trial | Essentials | Enterprise Operations | Enterprise Security | Enterprise Suite |
|:-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Audit Index | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Audit Event Index |  | ![check](/img/reuse/check.png) |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Cloud SIEM | | | | | Activation required* | Activation required* |
| Cloud SOAR | | | | | | Activation required* |
| CrowdStrike Threat Intel |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Collector Management API | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Data Forwarding |   | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Data Tiers |  |  |  |  |  | ![check](/img/reuse/check.png) |
| Data Volume Index |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Field Extraction | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Global Intelligence |  |  |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Ingest Budgets |  |  |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Log Data storage  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Log Data Continuous Volume | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Log Data Frequent Tier Volume |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| LogReduce | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Lookup Tables |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Metrics | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Metrics data retention	 | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Metrics volume | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Monitors | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Partitions | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| PCI Compliance App |  | ![check](/img/reuse/check.png) |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Real Time Alerts | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Real User Monitoring (RUM) | | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Root Cause Explorer | | | | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| SAML | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Scheduled Views | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Search Job API |  | ![check](/img/reuse/check.png) |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Support |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Sumo Logic Apps | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Traces | ![check](/img/reuse/check.png)<br/>Up to 1.5GB per day* | ![check](/img/reuse/check.png)<br/>Up to 5GB per day | ![check](/img/reuse/check.png)<br/>5GB per day | ![check](/img/reuse/check.png) |  | ![check](/img/reuse/check.png) |
| User and Role APIs | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |

\* Contact your account manager to customize your account to meet your organization's needs.

## Account Overview  

The **Account Overview** tab provides detailed information about your Sumo Logic organization, including account type, contract periods, credit usage, live dashboards, and real-time alerts. Account owners can also reassign the Account Owner role from this page.  

To access the **Account Overview** tab:  
* **[Classic UI](/docs/get-started/sumo-logic-ui-classic)**. Navigate to **Administration > Account > Account Overview**.  
* **[New UI](/docs/get-started/sumo-logic-ui)**. Navigate to **Administration > Account > Account Overview**, or select **Account Overview** from the **Go To...** menu.  

To view this tab, your role must include the [View Account Overview](/docs/manage/users-roles/roles/role-capabilities#data-management) capability.  

[Data Tiers](/docs/manage/partitions/data-tiers) are available with Enterprise Suite packages, allowing you to optimize analytics by segmenting data into Continuous, Frequent, and Infrequent tiers. For more details, contact your Sumo Logic account manager.  

### Key features  

* Review credit usage by category and type.  
* Track consumption against plan baselines.  
* Visualize usage by day, week, or month.  
* Download reports or credit usage data as CSV files.  
* Hover over charts for detailed insights.  

<img src={useBaseUrl('/img/manage/account/account-usage-fields.png')} alt="account-overview-credits" style={{border:'1px solid gray'}} width="800"/>  

### Organization information panel  

* **Organization**. Displays your organization’s name and hexadecimal ID.  
* **Plan**. Shows your subscription type (e.g., Trial, Enterprise Suite).  
* **Contract period**. Lists the start and end dates of your contract period.  
* **Live Dashboard Panels and Real-Time Alerts Count**. Displays a count of live dashboards and real-time alerts.  

### Total Credit Usage panel  

* **Credits Used**. Total and percentage used since the start of the current contract.  
* **Credits Remaining**. Remaining credits and percentage consumed.  
* **Total Credits Usage Breakdown**. Consumed contract and promotional credits.  

### Usage Forecast panel  

* **Upgrade Plan**. Link to request an account upgrade.  
* **Forecasted Use**. Predicts credit usage by the end of the contract period.  
* **Credits Exhaustion**. Estimated number of days and date when credits will run out.  
* **Dynamic Forecast**. Usage predictions based on trends for 7, 30, or 90 days.  

### Details of Credit Usage panel  

This panel provides detailed analytics and comparisons for credit usage:  
* **Usage Categories**. Displays credits used, percentage used, and units by type:
   * **Continuous Ingest**. Credits used for logs in the Continuous Tier.  
   * **Frequent Ingest**. Credits used for logs in the Frequent Tier.  
   * **Infrequent Ingest**. Credits used for logs in the Infrequent Tier.  
   * **Infrequent Scan**. Credits used for searches in the Infrequent Tier.  
   * **Cloud SIEM Ingest**. Credits used for logs in Cloud SIEM.  
   * **Metrics Ingest**. Credits used for metrics.  
   * **Storage**. Credits for log storage in Continuous and Frequent Tiers.  
   * **Infrequent Storage**. Credits for log storage in the Infrequent Tier.  
   * **Promotional Credits**. See [Promotional Credits](#promotional-credits).  
* **Usage % Change**. Highlights changes in usage over selected time intervals.  
* View data by time period (day, week, or month).  
* Visualize usage with line or column charts.  
* Download reports or CSV files.  

To analyze usage trends:  
* Toggle data categories on/off in **Usage Categories**.<br/><img src={useBaseUrl('img/manage/account/account-details-of-credit-usage.png')} alt="usage categories" style={{border:'1px solid gray'}} width="200"/>
* Use the **View By** dropdown to select day, week, or month.  
* Drag your cursor over graphs to drill into intervals.  
* Use the pan feature (magnifying glass icon) to scroll through data.  
* Hover over chart sections for detailed insights.  

### Promotional Credits  

There are times when Sumo Logic promotes services and consumables through the provision of Promotional Credits. Promotional Credits are non-transferrable and auto-expire at the end of the promotion period. In other words, if the Promotional Credits are not used within the promotion period, they do not carry over. They are of a "use it or lose it" nature. Promotional Credits are specific to a promotion and cannot be used for any service. The criteria, including promotion period, are listed in your contract. Promotional Credit consumption is calculated separately from the credits you paid for in your contract period. Promotional Credits are utilized as the priority credit for the specified credit variable.

If your contract includes 100,000 credits and 10,000 Promotional Credits for "Metrics," the first 10,000 credits used for Metrics will be from Promotional Credits. After depletion, contract credits will be used.  

To monitor Promotional Credits:  
* Deselect all other usage categories in **Usage Categories** to isolate Promotional Credits.  
* Refine further by deselecting specific credit types (e.g., Continuous Ingest, Storage).  

Promotional Credits graphs display the rate of consumption for allocated Promotional Credits.  

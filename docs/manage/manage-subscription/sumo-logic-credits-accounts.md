---
id: sumo-logic-credits-accounts
title: Sumo Logic Credits Accounts
sidebar_label: Credits Accounts
description: View information on Sumo Logic Credits accounts and intuitively monitor usage and manage account costs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import AccountCredit from '../../reuse/account-credit.md';

Sumo Logic provides flexible account types within its credits packaging for any size organization.

<AccountCredit/>

This page provides information on the credits account types and how to monitor and manage your account.

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

Free accounts can be upgraded to a paid subscription in the Sumo Logic UI. For details, see [Upgrade a Sumo Logic Credits Account](/docs/manage/manage-subscription/upgrade-account/upgrade-credits-account).

:::note
Free accounts do not support [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management).
:::

### Trial

Trial accounts allow full access to all Sumo Logic features to test how Sumo Logic will fit within your organization before you buy. It includes:
- **Daily Credit Allocation**: Supports a daily data volume limit of 1 GB per day.
- **Retention**: 30 days for all data.
- **Users**: Up to 20 users.

Trials are limited to 30 days. If you use up the credits allocated for the trial period before the period ends, Sumo Logic’s [standard throttling mechanism](/docs/manage/ingestion-volume/log-ingestion/#log-throttling) will be applied to your log ingest. If you need to extend your trial period or request a Proof of Concept (PoC), contact our [sales team](https://support.sumologic.com/support/s/).

### Essentials

Essentials Plan is a paid, credits-based subscription intended for small to mid-sized teams requiring essential log analytics and monitoring capabilities. The plan uses a flexible credit model, where usage such as data ingestion, storage, and queries consumes credits from a purchased pool. Essentials provides higher usage limits, extended data retention, and broader feature access compared to Free and Trial plans, while remaining a self-service option suitable for foundational observability and troubleshooting needs. You can self-serve upgrade to Essentials and pick a billing cycle that fits your needs.

For details on upgrading to an Essentials plan or higher, see [Upgrade a Sumo Logic Credits Account](/docs/manage/manage-subscription/upgrade-account/upgrade-credits-account). Essentials accounts can be upgraded to Enterprise accounts anytime.

### Enterprise Operations

Enterprise Operations accounts are optimized for best practice operational monitoring at any ingest volume.

:::tip
[Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets), a feature of all Enterprise plans, controls the capacity of daily log ingestion volume sent to Sumo Logic from collectors. It's important to keep track of your daily data usage. For tips on how to monitor and limit the data you're sending to Sumo Logic, see [Log Ingestion](/docs/manage/ingestion-volume/log-ingestion).
:::

### Enterprise Security

Enterprise Security accounts include advanced security capabilities. Enterprise Security is ideal for security operation centers (SOCs). SOC teams can leverage the latest PCI compliance application frameworks and threat detection capabilities.  

### Enterprise Suite

Enterprise Suite accounts are optimized to address the most advanced data insight challenges. Enterprise Suite accounts include all of Sumo Logic’s industry-leading capabilities including Sumo Logic’s Tiered Analytics.

## Features by plan type

The following table provides a summary list of key features by credits package accounts.

| Feature | Free | Trial | Essentials | Enterprise Operations | Enterprise Security | Enterprise Suite |
|:-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Audit Index | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Audit Event Index |  | &#10003; |  | &#10003; | &#10003; | &#10003; |
| Cloud SIEM | | | | | Activation required* | Activation required* |
| Cloud SOAR | | | | | | Activation required* |
| Threat Intel |  | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Collector Management API | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Data Forwarding |   | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Data Tiers |  |  |  |  |  | &#10003; |
| Data Volume Index |  | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Field Extraction | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Global Intelligence |  |  |  | &#10003; | &#10003; | &#10003; |
| Ingest Budgets |  |  |  | &#10003; | &#10003; | &#10003; |
| Log Data storage  | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Log Data Continuous Volume | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Log Data Frequent Tier Volume |  | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| LogReduce | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Lookup Tables |  | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Metrics | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Metrics data retention	 | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Metrics volume | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Monitors | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Partitions | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| PCI Compliance App |  | &#10003; |  | &#10003; | &#10003; | &#10003; |
| Real User Monitoring (RUM) | | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| SAML | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Scheduled Views | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Search Job API |  | &#10003; |  | &#10003; | &#10003; | &#10003; |
| Support |  | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Sumo Logic Apps | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |
| Traces | &#10003;<br/>Up to 1.5GB per day* | &#10003;<br/>Up to 5GB per day | &#10003;<br/>5GB per day | &#10003; |  | &#10003; |
| User and Role APIs | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |

\* Contact your account manager to customize your account to meet your organization's needs.

## Account Overview  

The **Account Overview** tab provides detailed information about your Sumo Logic organization, including account type, contract periods, credit usage, live dashboards, and real-time alerts. Account owners can also reassign the Account Owner role from this page.  

To access the **Account Overview** tab:    
* **[New UI](/docs/get-started/sumo-logic-ui)**. Navigate to **Administration > Account > Account Overview**, or select **Account Overview** from the **Go To...** menu.
* **[Classic UI](/docs/get-started/sumo-logic-ui-classic)**. Navigate to **Administration > Account > Account Overview**.  

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
   * **Promotional Credits**. See [Promotional credits](#promotional-credits).  
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

### Promotional credits  

There are times when Sumo Logic promotes services and consumables through the provision of promotional credits. Promotional credits are non-transferrable and auto-expire at the end of the promotion period. In other words, if the promotional credits are not used within the promotion period, they do not carry over. They are of a "use it or lose it" nature. promotional credits are specific to a promotion and cannot be used for any service. The criteria, including promotion period, are listed in your contract. Promotional credit consumption is calculated separately from the credits you paid for in your contract period. Promotional credits are utilized as the priority credit for the specified credit variable.

If your contract includes 100,000 credits and 10,000 promotional credits for "Metrics," the first 10,000 credits used for metrics will be from promotional credits. After depletion, contract credits will be used.  

To monitor promotional credits:  
* Deselect all other usage categories in **Usage Categories** to isolate promotional credits.  
* Refine further by deselecting specific credit types (e.g., Continuous Ingest, Storage).  

Promotional credits graphs display the rate of consumption for allocated promotional credits.  

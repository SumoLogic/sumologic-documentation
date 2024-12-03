---
id: sumo-logic-flex-accounts
title: Sumo Logic Flex Accounts
sidebar_label: Flex Accounts
description: View information on Sumo Logic Flex Accounts and intuitively monitor usage and manage account costs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import AccountCredit from '../../reuse/account-credit.md';

Sumo Logic provides flexible account types within its Flex packaging for any size organization with a credit-based capacity measurement.

<AccountCredit/>

This page provides information on our available Flex Credits account types and how to monitor and manage your account.

## Flex Account types​

You can select from Free, Trial, or Enterprise Suite Flex accounts.

### Free accounts

<!-- are these numbers still accurate? -->

Free accounts give you access to most Sumo Logic features, with a credit allocation of 1.25 credits a day. Credits can be used for logs, metrics, and traces, in any combination that meets your needs. The retention period for logs is 7 days. Free accounts allow up to 3 users.

:::note
[Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management) is not available for Free accounts.
:::

### Trial accounts

<!-- are these numbers still accurate? -->

Trial accounts allow you to try all of Sumo Logic's advanced features to understand how Sumo Logic will fit within your organization before you buy. It includes a credit allocation to support a daily data volume limit of 1 GB per day providing approximately 500GB of search data volume daily or 15TB of search volume, 20 users, and 30 days of data retention. If you use up the credits allocated for the trial period before the period ends, Sumo Logic’s [standard throttling mechanism](/docs/manage/ingestion-volume/log-ingestion) will be applied to your log ingest. For information on Trial account features, see [Cloud Flex Legacy accounts](/docs/manage/manage-subscription/cloud-flex-legacy-accounts).

To access your [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management) page:
* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Account > Data Management**.
* [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Data Management**. You can also click the **Go To...** menu at the top of the screen and select **Data Management**.

Trials are limited to 30 days. If you need to extend your trial period, contact our sales team to inquire about a Proof of Concept (PoC).

### Enterprise Suite Flex accounts

Enterprise Suite Flex accounts are optimized to address the most advanced data insight challenges. Enterprise Suite accounts include all of Sumo Logic’s industry-leading capabilities.

[Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets), which are only available for Enterprise Suite Flex accounts, control the capacity of daily log ingestion volume sent to Sumo Logic from collectors. For tips on how to monitor and limit the data you're sending to Sumo Logic, see [Log Ingestion](/docs/manage/ingestion-volume/log-ingestion/).

## Features by plan type​

The following table provides a summary list of key features by Flex package accounts. For Free and Trial account details, see the details for [Cloud Flex Legacy accounts](/docs/manage/manage-subscription/cloud-flex-legacy-accounts).

| Feature | Free | Trial | Essentials | Enterprise Suite Flex |
|:------- | :--- | :---- | :------------- | :------------- |
| Advanced Span Analytics |  | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| AI-driven Alerting |  | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Alerting Integrations (Slack, PagerDuty, ServiceNow, etc.) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Alert Response | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Anomaly Detection |  | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Anomaly Rules |  | | | ![check](/img/reuse/check.png) |
| APM and Distributed Tracing |  | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Application Observability | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Audit Index | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Automated Log-level Detection |  | | |![check](/img/reuse/check.png) |
| Automated Playbooks | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Automated Remediation |  | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Automation Service (playbooks for Insight enrichment, notifications, and containment actions) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| AWS CloudTrail and Amazon Guard Duty Threat Benchmarking | | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Case Manager | |  | | ![check](/img/reuse/check.png) |
| Cloud Infrastructure Security |  | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Cloud Log Management | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Cloud SIEM |  |  | | Activation required* |
| Cloud Security Posture Monitoring |  | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Cloud SOAR |  |  | | Activation required* |
| Collector Management API | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Compliance and Audit Logging |  | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| CrowdStrike Threat Intelligence |  | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Customizable Dashboards | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Data Forwarding | | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Data Volume Index | | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Enterprise Audit and Logging Dashboards |  | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Entity Normalization |  | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Entity Relationship Graph |  | | | ![check](/img/reuse/check.png) |
| Entity Timeline |  |  | | ![check](/img/reuse/check.png) |
| Field Extraction | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Geo IP Lookups | | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Global Intelligence Service apps |  |  | | ![check](/img/reuse/check.png) |
| Historical and Live Streaming Dashboards | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Ingest Budgets |  | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Insight Global Confidence Scores |  |  | | ![check](/img/reuse/check.png) |
| Insight Rules Engine (including 900+ out-of-the-box rules) |  |  | | ![check](/img/reuse/check.png) |
| Insight Trainer |  |  | | ![check](/img/reuse/check.png) |
| Kubernetes Observability | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Live Tail for Streaming Logs | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| LogReduce©, LogCompare, and LogExplain | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Log Data Continuous Volume | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Log Data Frequent Tier Volume | | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Log Data storage  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Log Search and Visualizations | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Log Search API |  |  | | ![check](/img/reuse/check.png) |
| Lookup Tables |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Management APIs | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Metrics | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Metrics based SLOs |  | | |![check](/img/reuse/check.png) |
| Metrics data retention | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Metrics Predict Operators |  |  | |![check](/img/reuse/check.png) |
| Metrics volume | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| MITRE ATT&CK Coverage Explorer |  | | | ![check](/img/reuse/check.png) |
| Monitors | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Multi-Cloud Observability (AWS, Azure GCP) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| OTel Data Onboarding | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| OTel for K8s Logs and Events |  |  | |![check](/img/reuse/check.png) |
| Partitions | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| PCI Compliance Apps and Dashboards for Audit Readiness | | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Playbooks (including complete Sumo Logic playbook catalog) |  |  | | ![check](/img/reuse/check.png) |
| Predictive Analytics and Outlier Detection | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Progressive Automation |  |  | | ![check](/img/reuse/check.png) |
| Real Time Alerts | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Real User Monitoring (RUM) |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |
| Reliability Management (SLIs/SLOs) |  | | |![check](/img/reuse/check.png) |
| Risk Assessment |  | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Root Cause Explorer |  |  | | ![check](/img/reuse/check.png) |
| Scheduled Alert Muting | |  | |![check](/img/reuse/check.png) |
| Scheduled Views | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Service Maps |  | ![check](/img/reuse/check.png) | |![check](/img/reuse/check.png) |
| Single sign-on (SSO) with SAML | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Software Development Optimization | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| Sumo Logic Apps | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Supervised Active Intelligence |  |  | | ![check](/img/reuse/check.png) |
| Support | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| Traces | ![check](/img/reuse/check.png)<br/>Up to 1.5GB per day* | ![check](/img/reuse/check.png)<br/>Up to 5GB per day | ![check](/img/reuse/check.png)<br/>5GB per day| |
| Usage Management - Advanced |  |  | | ![check](/img/reuse/check.png) |
| Usage Management - Basic | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | | ![check](/img/reuse/check.png) |
| User and Role APIs | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  |
| War Room | |  | | ![check](/img/reuse/check.png) |

\* Contact your account manager to customize your account to meet your organization's needs.

## Account Overview tab

The **Account Overview** tab provides a detailed view of your Sumo Logic account, including organization details, subscription type, contract periods, credit usage, live dashboards, and real-time alerts. Account owners can also reassign the Account Owner role from this page.

To access the **Account Overview** tab:  
* **[Classic UI](/docs/get-started/sumo-logic-ui-classic)**. Navigate to **Administration > Account > Account Overview**.  
* **[New UI](/docs/get-started/sumo-logic-ui)**. Navigate to **Administration > Account > Account Overview**, or select **Account Overview** from the **Go To...** menu.

To view this tab, your role must include the [View Account Overview](/docs/manage/users-roles/roles/role-capabilities/#data-management) capability.

### Key features  

* Review credit usage by categories and types.  
* Track credit consumption against plan baselines over time (day, week, or month).  
* Visualize usage with line or column charts.  
* Download usage reports or CSV files.  
* Hover over charts for detailed data insights.  
* Usage data updates frequently to reflect near real-time account status, while storage usage updates daily and may take up to 24 hours to appear.

### Organization information panel  

* **Organization**. Displays your organization’s name and hexadecimal ID.  
* **Plan**. Shows your subscription type (e.g., Trial, Enterprise Suite Flex).  
* **Contract period**. Lists the start and end dates of your contract.  
* **Live Dashboard Panels and Real-Time Alerts Count**. Displays the count of live dashboards and real-time alerts.

### Total Credit Usage panel  

* **Credits Used**. Shows total and percentage used since the start of the contract.  
* **Credits Remaining**. Displays remaining credits and percentage consumed.  
* **Total Credits Usage breakdown**. Includes consumed contract and promotional credits.

### Usage Forecast panel

The usage forecast gives you an opportunity to see the potential end of the current credits and an estimate on when those credits will end.

* **Upgrade Plan**. Links to the upgrade account page to request an account upgrade.  
* **Forecasted use**. Predicts credit usage by the end of the contract period.  
* **Credits exhaustion**. Displays the expected depletion date based on usage trends.  
* **Dynamic forecast**. Allows you to view usage predictions based on 7, 30, or 90-day trends.

### Details of Credit Usage panel  

This panel provides analytics to monitor and compare usage against contract capacity - graphs and tables showing credit usage by data tiers, storage, and services. It includes:  
* **Usage Categories**.
   * **Flex Scan Upfront**. Reserved log search volume.  
   * **Flex Scan Metered**. Log search volume beyond reserved capacity.  
   * **Flex Storage**. Credits used for log storage.  
   * **Tracing Ingest**. Credits used for tracing.  
   * **Cloud SIEM Ingest**. Credits used for logs in Cloud SIEM.  
   * **Metrics Ingest**. Credits used for metrics.  
   * **Promotional Categories**. See [Promotional Credits](#promotional-credits).  
* **Usage % Change**. Highlights changes in usage over selected time intervals.  
* Track credit consumption against the plan’s baseline usage.  
* Drill into specific time intervals (day, week, or month) for granular insights.  
* Visualize consumption using line or column time series charts.  
* Hover over charts for detailed information.  
* Download usage reports or credit usage data as CSV files.  

#### Promotional Credits  

There are times when Sumo Logic promotes services and consumables through the provision of Promotional Credits. Promotional Credits are non-transferrable and auto-expire at the end of the promotion period. In other words, if the Promotional Credits are not used within the promotion period, they do not carry over. They are of a "use it or lose it" nature. Promotional Credits are specific to a promotion and cannot be used for any service. The criteria, including promotion period, are listed in your contract. Promotional Credit consumption is calculated separately from the credits you paid for in your contract period. Promotional Credits are utilized as the priority credit for the specified credit variable.

For example: If you have 10,000 Promotional Credits for "Metrics" in a 100,000-credit contract, the first 10,000 credits for Metrics will use Promotional Credits before switching to paid credits.  

To filter and focus on Promotional Credits:  
* Deselect all other usage categories.  
* Refine further by deselecting specific credit types (e.g., Continuous Ingest, Storage).  

#### Drilling into usage data  

* Use the **View By** dropdown to switch between day, week, or month intervals.  
* Toggle usage categories on/off using checkboxes in the **Usage Details** panel.  
* Drag your cursor over graph intervals to analyze specific data.  
* Use the Pan feature (magnifying glass icon) to scroll through data.  
* Hover over chart sections for detailed information.  

<img src={useBaseUrl('/img/manage/account/account-overview-flex.png')} alt="account-overview-flex" style={{border:'1px solid gray'}} width="800"/>  

<img src={useBaseUrl('/img/manage/subscriptions/flex-usage-categories.png')} alt="flex-usage-categories" style={{border:'1px solid gray'}} width="800"/>

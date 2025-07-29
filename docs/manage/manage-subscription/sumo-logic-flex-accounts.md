---
id: sumo-logic-flex-accounts
title: Sumo Logic Flex Accounts
sidebar_label: Flex Accounts
description: View information on Sumo Logic Flex Accounts and intuitively monitor usage and manage account costs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import AccountCredit from '../../reuse/account-credit.md';

Sumo Logic provides flexible account types within its Flex packaging for any size organization with a credit-based capacity measurement. A credit is a unit of measure that tracks use, whether data ingested (GB) and scanned, storage, or metrics, throughout a contract period. Credits can be used as needed for your desired purpose. This allows you to carefully manage your account.

:::note
For Flex accounts, credits will be consumed on the basis of log data volume scanned.
:::

This page provides information on our available Flex Credits account types and how to monitor and manage your account.

## Flex Account types​

You can select from Free, Trial, or Enterprise Suite Flex accounts.

### Free

<!-- are these numbers still accurate? -->

Free accounts give you access to most Sumo Logic features, with a credit allocation of 1.25 credits a day. Credits can be used for logs, metrics, and traces, in any combination that meets your needs. The retention period for logs is 7 days. Free accounts allow up to 3 users.

:::note
[Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management) is not available for Free accounts.
:::

### Trial

<!-- are these numbers still accurate? -->

Trial accounts allow you to try all of Sumo Logic's advanced features to understand how Sumo Logic will fit within your organization before you buy. It includes a credit allocation to support a daily data volume limit of 1 GB per day providing approximately 500GB of search data volume daily or 15TB of search volume, 20 users, and 30 days of data retention. If you use up the credits allocated for the trial period before the period ends, Sumo Logic’s [standard throttling mechanism](/docs/manage/ingestion-volume/log-ingestion) will be applied to your log ingest.

To access your [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management) page:
* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Account > Data Management**.
* [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Data Management**. You can also click the **Go To...** menu at the top of the screen and select **Data Management**.

Trials are limited to 30 days. If you need to extend your trial period, contact our sales team to inquire about a Proof of Concept (PoC).

### Essentials

Essentials accounts scale to meet your growing needs for user licenses, data retention, and volume options. The Essentials plan includes options tailored to various needs:

* **Troubleshoot**. Foundational log analysis and troubleshooting.
* **Collaborate**. Advanced team collaboration features.
* **Orchestrate**. Designed for organizations requiring robust workflows and automation.

For details on upgrading to an Essentials plan or higher, see [Upgrade a Sumo Logic Flex Account](/docs/manage/manage-subscription/upgrade-account/upgrade-sumo-logic-flex-account). Essentials accounts can be upgraded to Enterprise Suite Flex accounts anytime.

### Enterprise Suite Flex

Enterprise Suite Flex accounts are optimized to address the most advanced data insight challenges. Enterprise Suite accounts include all of Sumo Logic’s industry-leading capabilities.

[Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets), which are only available for Enterprise Suite Flex accounts, control the capacity of daily log ingestion volume sent to Sumo Logic from collectors. For tips on how to monitor and limit the data you're sending to Sumo Logic, see [Log Ingestion](/docs/manage/ingestion-volume/log-ingestion/).

## Features by plan type​

The following table provides a summary list of key features by Flex package accounts.

| Feature | Free | Trial | Essentials | Enterprise Suite Flex |
|:------- | :--- | :---- | :------------- | :------------- |
| Advanced Span Analytics |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Anomaly Alerting |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Alerting Integrations (Slack, PagerDuty, ServiceNow, etc.) | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Alert Response | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Anomaly Detection |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Anomaly Rules |  | | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| APM and Distributed Tracing |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Application Observability | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Audit Index | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Automated Log-level Detection |  | | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Automated Playbooks | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Automated Remediation |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Automation Service (playbooks for Insight enrichment, notifications, and containment actions) | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| AWS CloudTrail and Amazon Guard Duty Threat Benchmarking | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Case Manager | |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Cloud Infrastructure Security |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Cloud Log Management | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Cloud SIEM |  |  | | Activation required* |
| Cloud Security Posture Monitoring |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Cloud SOAR |  |  | | Activation required* |
| Collector Management API | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Compliance and Audit Logging |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Threat Intelligence |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Customizable Dashboards | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Data Forwarding | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Data Volume Index | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Enterprise Audit and Logging Dashboards |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Entity Normalization |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Entity Relationship Graph |  | | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Entity Timeline |  |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Field Extraction | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Geo IP Lookups | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Global Intelligence Service apps |  |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Historical and Live Streaming Dashboards | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Ingest Budgets |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Insight Global Confidence Scores |  |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Insight Rules Engine (including 900+ out-of-the-box rules) |  |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Insight Trainer |  |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Kubernetes Observability | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Live Tail for Streaming Logs | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| LogReduce©, LogCompare, and LogExplain | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Log Data Continuous Volume | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |  |
| Log Data Frequent Tier Volume | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |  |
| Log Data storage  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Log Search and Visualizations | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Log Search API |  |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Lookup Tables |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Management APIs | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Metrics | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Metrics based SLOs |  | | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Metrics data retention | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Metrics Predict Operators |  |  | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Metrics volume | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| MITRE ATT&CK Coverage Explorer |  | | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Monitors | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Multi-Cloud Observability (AWS, Azure GCP) | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| OTel Data Onboarding | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| OTel for K8s Logs and Events |  |  | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Partitions | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| PCI Compliance Apps and Dashboards for Audit Readiness | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Playbooks (including complete Sumo Logic playbook catalog) |  |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Predictive Analytics and Outlier Detection | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Progressive Automation |  |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Real User Monitoring (RUM) |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Reliability Management (SLIs/SLOs) |  | | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Risk Assessment |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Scheduled Alert Muting | |  | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Scheduled Views | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Service Maps |  | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | |<img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Single sign-on (SSO) with SAML | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Software Development Optimization | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Sumo Logic Apps | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Supervised Active Intelligence |  |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Support | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Traces | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/><br/>Up to 1.5GB per day* | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/><br/>Up to 5GB per day | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/><br/>5GB per day| <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/><br/>Up to 5GB per day |
| Usage Management - Advanced |  |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| Usage Management - Basic | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |
| User and Role APIs | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> | <br/>Up to 5GB per day |
| War Room | |  | | <img src={useBaseUrl('img/reuse/check.png')} alt="green check circle.png" width="20"/> |

\* Contact your account manager to customize your account to meet your organization's needs.

## Account Overview

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

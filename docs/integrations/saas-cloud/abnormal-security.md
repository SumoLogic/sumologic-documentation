---
id: abnormal-security
title: Abnormal Security
sidebar_label: Abnormal Security
description: The Sumo Logic app for the Abnormal Security offers robust monitoring of email security threats.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/abnormal-security-logo.png')} alt="abnormal-security-logo" width="90" />

The Sumo Logic app for Abnormal Security offers robust monitoring of email security threats. It includes dashboards for an overview of total threats, detailed email threat analysis, and case management by severity and time trends. Key features highlight the threat types, attack vectors, and geolocation of senders, thereby aiding security teams in effectively identifying and responding to incidents. This app helps security teams to effectively monitor, identify, and respond to email-based threats, ensuring robust email security management. It offers actionable insights and visualizations to prioritize and mitigate security incidents efficiently.

## Log type

This app uses the Abnormal Security Source to collect [threat logs](https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.1#/Threats/get_threats__threatId_) and [case logs](https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.1#/Cases/get_cases) from the Abnormal Security platform.

### Sample log messages

<details>
<summary>Threat Logs</summary>

```json 
{
    "abxMessageId": -569518315069455395,
    "abxPortalUrl": "https://portal.abnormalsecurity.com/home/threat-center/remediation-history/-569518315069455395",
    "attachmentCount": 0,
    "attachmentNames": [],
    "attackStrategy": "Unknown Sender",
    "attackType": "Phishing: Credential",
    "attackVector": "Link",
    "attackedParty": "Employee (Other)",
    "autoRemediated": false,
    "fromAddress": "info@emails.buzzfeed.com",
    "fromName": "tasty",
    "impersonatedParty": "None / Others",
    "internetMessageId": "<91.AF.47440.222B2646@hg.mta2vrest.cc.prd.sparkpost>",
    "isRead": false,
    "postRemediated": false,
    "receivedTime": "2023-05-15T22:29:01Z",
    "recipientAddress": "aletheato@abnormalpartner.com",
    "remediationStatus": "Marked Safe",
    "remediationTimestamp": "2023-05-31T07:53:25.319365Z",
    "sentTime": "2023-05-15T22:28:50Z",
    "subject": "An Alternative To Avocado Toast",
    "threatId": "882c2ea0-5e31-59d8-080f-cb885ba11972",
    "toAddresses": [
        "aletheato@abnormalpartner.com"
    ],
    "ccEmails": [],
    "replyToEmails": [
        "newsletters@buzzfeed.com"
    ],
    "returnPath": "bounces+aletheatoh=abnormalpartner.com@emails.buzzfeed.com",
    "senderDomain": "emails.buzzfeed.com",
    "senderIpAddress": null,
    "summaryInsights": [
        "Invisible characters found in Email",
        "Suspicious Link",
        "Unusual Sender",
        "Unusual Sender Domain",
        "Unusual Reply To"
    ],
    "urlCount": 39,
    "urls": [
        "https://e.emails.tasty.co/c2/1446:645d40c949dbfe2c590e61d3"
    ]
}
```
</details>

<details>
<summary>Case Logs</summary>

```json
 {
    "cases": [
        {
            "caseId": 1063272,
            "description": "Account Compromised",
            "severity_level": "HIGH",
            "last_modified": "2022-09-06T23:13:58Z"
        }
    ],
    "pageNumber": 1,
    "total": 1
}
```
</details>

### Sample queries

```sql title="Threats Over Time"
_sourceCategory="Labs/AbnormalSecurity" sourcetype threat_log
| json "event.attack_strategy", "event.attacked_party", "event.attack_vector", "event.attack_type", "sourcetype", "event.auto_remediated", "event.post_remediated" as strategy, party, vector, type, source_type, auto_remediated, post_remediated nodrop

// global filters
| where type matches "{{attack_type}}"
| where party matches "{{attack_party}}"
| where strategy matches "{{attack_strategy}}"
| where vector matches "{{attack_vector}}"
| where auto_remediated matches "{{auto_remediated}}"
| where post_remediated matches "{{post_remediated}}"

| where source_type matches ("threat_log")
| timeslice 1d
| count as frequency by _timeslice
```

```sql title="Cases Over Time"
_sourceCategory="Labs/AbnormalSecurity" sourcetype case_log
| json "event.severity_level", "event.caseId", "event.description", "sourcetype" as severity, case_id, description, source_type nodrop

// global filters
| where severity matches "{{severity}}"

| where source_type matches ("case_log")
| timeslice 1d
| count as frequency by _timeslice

```

## Collection configuration and app installation

Depending on the set up collection method, you can configure and install the app in three ways:

- **[Create a new collector and install the app](#create-a-new-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under a new Sumo Logic Collector and later install the app; Or
- **[Use an existing collector and install the app](#use-an-existing-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under an existing Sumo Logic Collector and later install the app; Or
- **[Use existing source and install the app](#use-an-existing-source-and-install-the-app)**. Use your existing configured Sumo Logic Cloud-to-Cloud (C2C) source and install the app.

:::important
Use the [Cloud-to-Cloud Integration for Abnormal Security](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/abnormal-security-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Abnormal Security app is properly integrated and configured to collect and analyze your Abnormal Security data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing Abnormal Security dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Abnormal Security - Overview** dashboard provides detailed insights into email threats, highlighting total threats, phishing and malware attacks, and trends over time. It categorizes threats by type, vector, and attack party, and tracks the severity and progression of cases. This dashboard helps security teams quickly identify and respond to email security incidents effectively.<br/><img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Abnormal-Security/Abnormal-Security-Overview.png' alt="Abnormal-Security-Overview" />

### Emails

The **Abnormal Security - Emails** dashboard provides insights into email threat management. It shows the counts of remediated emails, top threat senders and receivers, and email threat activity over time. Additionally, it visualizes the geolocation of email senders, highlighting risky regions. This helps in tracking and mitigating email-based threats efficiently.<br/><img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Abnormal-Security/Abnormal-Security-Emails.png' alt="Abnormal-Security-Emails" />

### Cases

The **Abnormal Security - Cases** dashboard provides an overview of security cases, showing their severity levels, trends over time, and detailed information on recent cases. It includes visualizations for case severity (High, Medium, and Low), a trend line of cases over time, and a table of the latest cases with descriptions. This dashboard aids in monitoring and prioritizing security incidents effectively.<br/><img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Abnormal-Security/Abnormal-Security-Cases.png' alt="Abnormal-Security-Cases" />

## Upgrade/Downgrade the Abnormal Security app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Abnormal Security app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
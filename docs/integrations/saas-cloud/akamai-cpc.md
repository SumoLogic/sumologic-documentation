---
id: akamai-cpc
title: Akamai CPC
sidebar_label: Akamai CPC
description: Detect and respond to threats in real time to ensure compliance and secure your client-side web applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/akamai.svg')} alt="Thumbnail icon" width="100"/>

The Sumo Logic app for Akamai Client-Side Protection (CPC) helps organizations monitor and secure their client-side web applications. It provides real-time visibility into alerts, threat indicators, and data exposure risks from client-side scripts, enabling fast and accurate threat detection. Using Akamai’s data, the app identifies threats like data exfiltration, script-based attacks, policy violations, and insecure handling of sensitive data. Pre-configured dashboards show alert trends, risk levels, and anomalies, helping analysts investigate incidents and respond efficiently. With clear visualizations and detailed event insights, the app supports compliance (e.g., PCI) and strengthens the security of client-facing digital assets.

:::info
This app includes [built-in monitors](#akamai-cpc-monitors). For details on creating custom monitors, refer to the [Create monitors for Akamai CPC app](#create-monitors-for-akamai-cpc-app).
:::

## Log types

This app uses Sumo Logic’s [Akamai CPC Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/akamai-cpc-source/) to collect the  alerts and their details from the Akamai CPC platform.

### Sample log messages

<details>
<summary>Alerts</summary>

```json
{
  "cpcConfigId": 10286,
  "cpcAlertId": "e1-b10064e2",
  "cpcAlertLink": "/client-side-protection-and-compliance/v2/cpc-configs/10286/cpc-alerts/e1-b10064e2",
  "cpcAlertType": "SENSITIVE_DATA_EXFILTRATION_E1_CPC_ALERT",
  "severityLevel": "INFO",
  "cpcAlertStatus": "OPEN",
  "cpcAlertFlags": [],
  "alertTime": "2025-06-09T13:49:16.071+0000",
  "firstSeenTime": "2025-06-05T18:41:03.603+0000",
  "lastSeenTime": "2025-06-09T13:48:42.792+0000"
}
```
</details>

<details>
<summary>Alert Details</summary>

```json
{
  "cpcConfigId": 10286,
  "cpcAlertId": "e1-b10064e2",
  "cpcAlertLink": "/client-side-protection-and-compliance/v2/cpc-configs/10286/cpc-alerts/e1-b10064e2",
  "cpcAlertType": "SENSITIVE_DATA_EXFILTRATION_E1_CPC_ALERT",
  "severityLevel": "INFO",
  "cpcAlertStatus": "OPEN",
  "cpcAlertFlags": [],
  "alertTime": "2025-06-09T13:49:16.071+0000",
  "firstSeenTime": "2025-06-05T18:41:03.603+0000",
  "lastSeenTime": "2025-06-09T13:48:42.792+0000",
  "links": [
    {
      "rel": "self",
      "href": "/client-side-protection-and-compliance/v2/cpc-configs/10286/cpc-alerts/e1-b10064e2"
    },
    {
      "rel": "control-center",
      "href": "https://control.akamai.com/apps/securitycenter/#/page-integrity-console?view=incident-details&incidentId=b10064e2&configId=10286&scConfigId=10286"
    },
    {
      "rel": "cpc-alerts",
      "href": "/client-side-protection-and-compliance/v2/cpc-configs/10286/cpc-alerts"
    },
    {
      "rel": "cpc-config",
      "href": "/client-side-protection-and-compliance/v2/cpc-configs/10286"
    }
  ],
  "details": {
    "affectedSessionCount": 4288,
    "scriptSource": {
      "scriptHostname": "www.ihg.com",
      "scriptUrls": [
        "https://www.ihg.com/resources/gb/en/customer-care/forms/v14.118.0/chunk-L6HJ7Y67.js"
      ],
      "scriptOrigin": "FIRST_PARTY",
      "hostnameRiskScore": "LOW_RISK",
      "vendor": null
    },
    "destination": {
      "destinationHostname": "apis.ihg.com",
      "destinationUrls": [
        "https://apis.ihg.com/members/v3/resetPassword"
      ],
      "hostnameRiskScore": "LOW_RISK",
      "vendor": null
    },
    "pages": null,
    "dataType": null,
    "dataSubtypes": [
      {
        "dataSubtype": "EMAIL",
        "dataOperations": [
          "VALUES_READ",
          "VALUES_SENT_OVER_NETWORK"
        ],
        "selectors": [
          "#gigya-loginID-62290586448469890, :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(2)"
        ]
      },
      {
        "dataSubtype": "CREDENTIALS_PASSWORD",
        "dataOperations": [
          "VALUES_READ",
          "VALUES_SENT_OVER_NETWORK"
        ],
        "selectors": [
          ""
        ]
      },
      {
        "dataSubtype": "CREDIT_CARD_NUMBER",
        "dataOperations": [
          "VALUES_READ"
        ],
        "selectors": [
          ":nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(1)"
        ]
      },
      {
        "dataSubtype": "EMAIL",
        "dataOperations": [
          "VALUES_READ"
        ],
        "selectors": [
          "#email"
        ]
      },
      {
        "dataSubtype": "PII_LAST_NAME",
        "dataOperations": [
          "VALUES_READ",
          "VALUES_SENT_OVER_NETWORK"
        ],
        "selectors": [
          "#lastName"
        ]
      },
      {
        "dataSubtype": "PII_ADDRESS",
        "dataOperations": [
          "VALUES_READ"
        ],
        "selectors": [
          "#address1, #city"
        ]
      },
      {
        "dataSubtype": "PII_ZIP_CODE",
        "dataOperations": [
          "VALUES_READ"
        ],
        "selectors": [
          "#zipCode"
        ]
      },
      {
        "dataSubtype": "PII_FIRST_NAME",
        "dataOperations": [
          "VALUES_READ",
          "VALUES_SENT_OVER_NETWORK"
        ],
        "selectors": [
          "#firstName"
        ]
      },
      {
        "dataSubtype": "CREDIT_CARD_EXPIRATION_DATE",
        "dataOperations": [
          "VALUES_READ"
        ],
        "selectors": [
          "#checkInDate, #checkOutDate"
        ]
      },
      {
        "dataSubtype": "CREDENTIALS_USERNAME",
        "dataOperations": [
          "VALUES_READ",
          "VALUES_SENT_OVER_NETWORK"
        ],
        "selectors": [
          ":nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(2)"
        ]
      }
    ],
    "threatIndicators": [
      "SENSITIVE_DATA_READ",
      "SENSITIVE_DATA_EXFILTRATION"
    ]
  }
}
```
</details>

### Sample queries

```sql title="Total Alerts"
_sourceCategory="Labs/AkamaiCPC"
| json "cpcConfigId", "cpcAlertId", "cpcAlertLink", "cpcAlertType", "severityLevel", "cpcAlertStatus", "cpcAlertFlags", "alertTime", "firstSeenTime", "lastSeenTime","details.dataSubtypes[*].dataSubtype","details.threatIndicators","details.destination.destinationHostname","details.destination.vendor","details.destination.hostnameRiskScore","details.destination.destinationUrls","details.scriptSource.vendor","details.scriptSource.hostnameRiskScore","details.scriptSource.scriptOrigin","details.scriptSource.scriptUrls","details.scriptSource.scriptHostname","details.affectedSessionCount","details.dataSubtypes[*].dataOperations[*]" as cpc_config_id, cpc_alert_id, cpc_alert_link, cpc_alert_type, severity_level, cpc_alert_status, cpc_alert_flags, alert_time, first_seen_time, last_seen_time,data_sub_type, threat_indicators,destination_hostname,destination_vendor,destination_hostname_risk_score,destination_urls, source_script_vendor, source_hostname_risk_score, source_script_origin, source_script_urls,source_hostname,affected_session_count,data_operations nodrop

// global filters
| where cpc_config_id matches "{{cpc_config_id}}"
| where severity_level matches "{{alert_severity}}"
| where cpc_alert_status matches "{{alert_status}}"
| where cpc_alert_type matches "{{alert_type}}"

// panel specific
| count by cpc_alert_id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Akamai CPC](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/akamai-cpc-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Akamai CPC app is properly integrated and configured to collect and analyze your Akamai CPC data.
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

## Viewing Akamai CPC dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Akamai CPC - Overview** dashboard provides a comprehensive snapshot of your client-side security posture and alert trends. It highlights alert volumes, severity levels, and configuration health over time, helping you quickly spot anomalies and areas needing attention. Security teams can monitor threat activity, identify impacted configurations, and understand common alert types. The dashboard also surfaces recurring risk indicators, such as compromised scripts, suspicious behavior, and sensitive data exposure, offering critical context for prioritizing incidents. By consolidating this information into one view, it enables faster threat response and more informed risk mitigation decisions. <br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Akamai+CPC/Akamai+CPC+-+Overview.png')} alt="Akamai-CPC-Overview" width="800"/>

### Security Overview

The **Akamai CPC - Security Overview** dashboard provides deep visibility into client-side security risks, enabling proactive detection of suspicious behavior and policy violations. It highlights critical indicators such as data exfiltration attempts, access to suspicious domains, abnormal script activity, and insecure data transmissions. With detailed event tracking and contextual insights, it helps security teams identify hidden threats, assess exposure, and ensure compliance. The dashboard supports investigations into high-risk scenarios, including compromised code, misconfigurations, and attempts to bypass protections—helping organizations safeguard user data, enforce security policies, and protect client-side environments.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Akamai+CPC/Akamai+CPC+-+Security+Overview.png')} alt="Akamai-CPC-Security-Overview" width="800"/>

## Create monitors for Akamai CPC app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Akamai CPC monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Critical Severity Alerts` | This alert is triggered when client-side protection detects an event with critical severity. It indicates a high-impact threat that requires immediate investigation and remediation to prevent potential exploitation or data compromise. | Critical | Count > 0 |
| `Credentials Sent Over Network Activities` | This alert is triggered when user credentials, such as passwords, are detected being transmitted over the network. It highlights potential security gaps or data leakage risks and helps enforce best practices around credential handling and data protection. | Critical | Count > 0 |

## Upgrade/Downgrade the Akamai CPC app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Akamai CPC app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
---
id: azure-security-microsoft-defender-for-office-365
title: Azure Security - Microsoft Defender for Office 365
description: Learn how to collect alerts from the Azure Security - Microsoft Defender for Office 365 platform and send them to Sumo Logic for analysis.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/microsoft-defender-office-365.png')} alt="Thumbnail icon" width="50"/>

The Sumo Logic app for Azure Security – Microsoft Defender for Office 365 provides visibility into threats and alerts across Microsoft 365. It includes dashboards to monitor alert activity, geographic trends, detection sources, and user-level details, enabling quick identification of phishing, malware, and suspicious sign-ins. High-severity alerts, malicious IPs, compromised accounts, and targeted devices are highlighted to support rapid response. The app helps strengthen Office 365 security posture, prioritize incidents, and detect potential compromises across users and devices.

## Log types

The Azure Security – Microsoft Defender for Office 365 app uses SumoLogic’s Microsoft Graph Security source to collect [alerts](https://learn.microsoft.com/en-us/graph/api/security-list-alerts_v2?view=graph-rest-1.0&tabs=http) from the Microsoft Graph Security source.

### Sample log messages

<details>
<summary>Alerts</summary>

```json
{
  "id": "adbe0c9e2dccf8f1756423691203fj4f03ebd9d327664bcda30a",
  "providerAlertId": "6e11a0063f2acc258e17152cac17564236912037c178d92c04c17564236918be",
  "incidentId": "20",
  "status": "resolved",
  "severity": "high",
  "classification": "falsePositive",
  "determination": "phishing",
  "serviceSource": "microsoftDefenderForOffice365",
  "detectionSource": "microsoftDefenderForCloud",
  "detectorId": "UnfamiliarLocation",
  "tenantId": "3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "title": "Unfamiliar sign-in properties",
  "description": "Sign-in with properties we have not seen recently for the given user",
  "recommendedActions": "",
  "category": "InitialAccess",
  "assignedTo": null,
  "alertWebUrl": "https://remote-trail.gl.at.ply.gg/alerts/adbe0c9e2dccf8f433ff4f03ebd9d327664bcda30a?tid=3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "incidentWebUrl": "https://remote-trail.gl.at.ply.gg/incidents/20?tid=3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "actorDisplayName": null,
  "threatDisplayName": null,
  "threatFamilyName": null,
  "mitreTechniques": [
    "T1078",
    "T1078.004"
  ],
  "createdDateTime": "2025-08-28T16:28:11-0700725Z",
  "lastUpdateDateTime": "2025-08-28T16:28:11-0700333Z",
  "resolvedDateTime": "2025-08-28T16:28:11-0700725Z",
  "firstActivityDateTime": "2025-08-28T16:28:11-0700919Z",
  "lastActivityDateTime": "2025-08-28T16:28:11-0700919Z",
  "comments": [
    {
      "@qlvcckxbgq.type": "#microsoft.graph.security.alertComment",
      "comment": "Not valid",
      "createdByDisplayName": "David",
      "createdDateTime": "2025-08-28T16:28:11-070088Z"
    }
  ],
  "evidence": [
    {
      "@qlvcckxbgq.type": "#microsoft.graph.security.userEvidence",
      "createdDateTime": "2025-08-28T16:28:11-0700667Z",
      "verdict": "unknown",
      "remediationStatus": "none",
      "remediationStatusDetails": null,
      "roles": [
        "compromised"
      ],
      "detailedRoles": [
        
      ],
      "tags": [
        
      ],
      "userAccount": {
        "accountName": "tseapps",
        "domainName": null,
        "userSid": "S-1-12-1-1756423691-1756423691-589068932-1756423691",
        "azureAdUserId": "f5e829f5-4b1f-4fcf-847a-1c234c1b3b84",
        "userPrincipalName": "ag@qlvcckxbgq.com",
        "displayName": AndreGurn
      }
    },
    {
      "@qlvcckxbgq.type": "#microsoft.graph.security.ipEvidence",
      "createdDateTime": "2025-08-28T16:28:11-0700667Z",
      "verdict": "malicious",
      "remediationStatus": "none",
      "remediationStatusDetails": null,
      "roles": [
        
      ],
      "detailedRoles": [
        
      ],
      "tags": [
        
      ],
      "ipAddress": "185.231.233.146",
      "countryLetterCode": "IN"
    }
  ]
}
```
</details>

### Sample queries

```sql title="Recent Alerts"
_sourceCategory=Labs/AzureSecurityMicrosoftDefenderFor365 microsoftDefenderForOffice365
| json "id", "status", "severity", "category", "title", "description", "classification", "determination", "serviceSource", "alertWebUrl" as alert_id, status, severity, category, title, description, classification, determination, service_source, alert_url nodrop
| where toLowerCase(service_source) matches "microsoftdefenderforoffice365"

// global filters
| where if ("{{severity}}" = "*", true, severity matches "{{severity}}")
| where if ("{{status}}" = "*", true, status matches "{{status}}")
| where if ("{{classification}}" = "*", true, classification matches "{{classification}}")

// panel specific
| if (isNull(category), "-", category) as category
| if (isNull(classification), "-", classification) as classification
| if (isNull(determination), "-", determination) as determination

| formatDate(toLong(_messageTime), "dd-MM-yyyy HH:mm:ss") as time
| tourl (alert_url, alert_id) as alert_id
| count by time, alert_id, title, description, status, severity, category, classification, determination 
| count as count by time, alert_id, title, description, status, severity, category, classification, determination 
| sort by time
| fields - count
| limit 100
```

## Collection configuration and app installation

:::note
- Skip this step if you have already configured the Microsoft Graph Security API Source.
- Select **Use the existing source and install the app** to install the app using the `sourceCategory` of the Microsoft Graph Security API Source configured above.
:::

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Microsoft Graph Security API](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Azure Security - Microsoft Defender for Office 365 app is properly integrated and configured to collect and analyze your Azure Security - Microsoft Defender for Office 365 data.
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

## Viewing the Azure Security - Microsoft Defender for Office 365 dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Azure Security - Microsoft Defender for Office 365 - Overview** dashboard offers a high-level summary of security alerts detected by Microsoft Defender for Office 365. It showcases key metrics such as total alert volume, geographic distribution, and breakdowns by status, detection source, determination, and classification. Security analysts can quickly spot top alert categories like phishing and malware, identify affected users, and monitor the most active analysts involved in investigations. The dashboard also features a top action plan and recent alerts panel to help prioritize response efforts and investigate high-risk activities such as anomalous sign-ins, suspicious tokens, and potential account compromises.

<br/><img src={useBaseUrl('/img/integrations/microsoft-azure/Microsoft-Defender-for-Office-365-Overview.png')} alt="Azure Security - Microsoft Defender for Office 365 - Overview" />

### Security

The **Azure Security - Microsoft Defender for Office 365 - Security** dashboard focuses on high-severity alerts and threats associated with risky IP addresses, suspicious geographies, and compromised accounts. It provides visibility into alerts by severity over time, helping analysts detect spikes in high-priority incidents. The dashboard also highlights countries with malicious IP verdicts, top user accounts with compromised roles, and top attacked devices along with their risk posture and health status. This view enables teams to quickly pinpoint the most critical threats targeting their Office 365 environment and take immediate mitigation steps.

<br/><img src={useBaseUrl('/img/integrations/microsoft-azure/Microsoft-Defender-for-Office-365-Security.png')} alt="Azure Security - Microsoft Defender for Office 365 - Security" />

## Create monitors for Azure Security - Microsoft Defender for Office 365 app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Security - Microsoft Defender for Office 365 alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Microsoft Defender for Office 365 - Alerts Detected from Embargoed Locations` | This alert is triggered when activity is detected from a location flagged as high-risk, enabling you to monitor access attempts from unusual or restricted geographic regions. It enhances your ability to spot suspicious behaviour and potential threats originating from locations outside your organisation’s typical operating areas. | Critical | Count > 0 | 
| `Microsoft Defender for Office 365 - High Severity Alerts` | This alert is triggered when a high-severity threat is detected, allowing you to promptly monitor and respond to potentially harmful events that may compromise endpoint security. It ensures critical incidents are prioritised for swift investigation and mitigation. | Critical | Count > 0|
| `Microsoft Defender for Office 365 - Embargoed Device` | This alert is triggered when a single device generates multiple alerts, indicating potentially malicious behaviour. It helps you identify high-risk devices, monitor suspicious activity more effectively, and take swift action to prevent further compromise. | Critical | Count > 5 |

## Upgrade/Downgrade the Azure Security - Microsoft Defender for Office 365 app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Security - Microsoft Defender for Office 365 app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
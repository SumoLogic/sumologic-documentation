---
id: azure-security-microsoft-entra-id-protection
title: Azure Security - Microsoft Entra ID Protection
sidebar_label: Azure Security - Microsoft Entra ID Protection
description: Learn how to collect alerts from the Azure Security - Microsoft Entra ID Protection platform and send them to Sumo Logic for analysis.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-security-microsoft-entra-id-protection.png')} alt="Thumbnail icon" width="50"/>

The Azure Security – Microsoft Entra ID Protection application strengthens identity security within Azure environments by proactively detecting, investigating, and mitigating identity-related risks. It helps organizations safeguard user accounts and credentials against potential compromise, ensuring secure access to critical cloud resources

The Sumo Logic app for Azure Security - Microsoft Entra ID Protection provides interactive dashboards and visual tools, the app supports incident identification, user activity tracking, and access monitoring for sensitive data. These features allow for faster response times and more agile decision-making, helping organizations improve their overall security posture. By delivering a comprehensive view of cloud app security, the app empowers you to manage threats efficiently and ensures robust protection of critical Azure-based assets.

## Log Types

The Azure Security – Microsoft Entra ID Protection uses Sumo Logic’s Microsoft Graph Security source to collect [alerts](https://learn.microsoft.com/en-us/graph/api/security-list-alerts_v2?view=graph-rest-1.0&tabs=http) from the Microsoft Graph Security source.

### Sample log messages

<details>
<summary>Alert Log</summary>

```json
{
  "id": "ad702c56f4e096bad6317188657c055326e564fc89de72328c",
  "providerAlertId": "efa85202d5d391b6d368c8c985d95a221df17581886575fd8d11666a1d12",
  "incidentId": "14",
  "status": "new",
  "severity": "high",
  "classification": "truePositive",
  "determination": "malware",
  "serviceSource": "azureAdIdentityProtection",
  "detectionSource": "automatedInvestigation",
  "detectorId": "AnomalousToken",
  "tenantId": "3adb963c-8e61-48-a06d-6dbb0dacea39",
  "title": "Anomalous Token",
  "description": "Anomalous token indicates that there are abnormal characteristics in the token such as token duration and authentication from unfamiliar IP address",
  "recommendedActions": "",
  "category": "Random",
  "assignedTo": null,
  "alertWebUrl": "https://566bdd7bcaa08702d6bebe31e2901.serveo.net/alerts/ad702c56f4e096bad66c055326e564fc89de72328c?tid=3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "incidentWebUrl": "https://566ba0ac28702d6bebe31e2901.serveo.net/incidents/14?tid=3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "actorDisplayName": null,
  "threatDisplayName": null,
  "threatFamilyName": null,
  "mitreTechniques": [],
  "createdDateTime": "2025-09-18T15:14:17+0530577Z",
  "lastUpdateDateTime": "2025-09-18T15:14:17+0530667Z",
  "resolvedDateTime": null,
  "firstActivityDateTime": "2025-09-18T15:14:17+0530872Z",
  "lastActivityDateTime": "2025-09-18T15:14:17+0530872Z",
  "comments": [
    {
      "@odata.type": "#microsoft.graph.security.alertComment",
      "comment": "Not valid",
      "createdByDisplayName": "Sam",
      "createdDateTime": "2025-09-18T15:14:17+053088Z"
    }
  ],
  "evidence": [
    {
      "@odata.type": "#microsoft.graph.security.userEvidence",
      "createdDateTime": "2025-09-18T15:14:17+0530333Z",
      "verdict": "unknown",
      "remediationStatus": "none",
      "remediationStatusDetails": null,
      "roles": ["compromised"],
      "detailedRoles": [],
      "tags": [],
      "userAccount": {
        "accountName": "tseapps",
        "domainName": null,
        "userSid": "S-1-12-1-175818657-1758188657-589068932-1758188657",
        "azureAdUserId": "f5e829f5-4f-4fcf-847a-1c234c1b3b84",
        "userPrincipalName": "sam@odata.com",
        "displayName": null
      }
    },
    {
      "@odata.type": "#microsoft.graph.security.ipEvidence",
      "createdDateTime": "2025-09-18T15:14:17+0530333Z",
      "verdict": "compromised",
      "remediationStatus": "none",
      "remediationStatusDetails": null,
      "roles": [],
      "detailedRoles": [],
      "tags": [],
      "ipAddress": "168.119.168.251",
      "countryLetterCode": "IN"
    }
  ]
}
```
</details>

### Sample queries

```sql title="Total Alerts"
_sourceCategory=Labs/MicrosoftGraphSecurity 
|json"id","status","severity","category","title","description","classification","determination","serviceSource","detectionSource","alertWebUrl" ,"comments[*]","evidence[*]"as  alert_id,status,severity,category,title,description,classification,determination,service_source,detection_source,alert_url,comments,evidence_info nodrop

| where toLowerCase(service_source) = "azureadidentityprotection"

// global filters
| where if ("*" = "*", true, severity matches "*")
| where if ("*" = "*", true, status matches "*")
| where if ("*" = "*", true, classification matches "*")

// panel specific
| count by alert_id 
| count
```

```sql title="High Severity Alerts"
_sourceCategory=Labs/MicrosoftGraphSecurity 
|json"id","status","severity","category","title","description","classification","determination","serviceSource","detectionSource" ,"comments[*]","evidence[*]"as  alert_id,status,severity,category,title,description,classification,determination,service_source,detection_source,comments,evidence_info nodrop

| where toLowerCase(service_source) = "azureadidentityprotection"

// global filters
| where if ("*" = "*", true, severity matches "*")
| where if ("*" = "*", true, status matches "*")
| where if ("*" = "*", true, classification matches "*")

// panel specific
| where toLowerCase(severity) matches ("*high*")
| count by alert_id
| count
```

## Collection configuration and app installation

:::note
- Skip this step if you have already configured the [Microsoft Graph Security API Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/).
- Select **Use the existing source and install the app** to install the app using the `sourceCategory` of the Microsoft Graph Security API Source configured above.
:::

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Microsoft Graph Security API](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Azure Security - Microsoft Entra ID Protection is properly integrated and configured to collect and analyze your Azure Security - Microsoft Entra ID Protection data.
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

## Viewing the Azure Security - Microsoft Entra ID Protection dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Azure Security - Microsoft Entra ID Protection - Overview** dashboard  provides a comprehensive view of identity-related security risks and anomalies detected across Azure environments. It enables analysts to monitor risky sign-ins, user risk levels, and identity protection trends, ensuring timely detection and mitigation of potential account compromises.

With features like geo-location mapping and top user alerts, the dashboard supports regional risk assessment and detection of insider threats. By combining real-time insights with historical trends, it enhances situational awareness and strengthens incident response strategies.
<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure+-Security-Microsoft-Entra-Id-Protection/Azure+Security+-+Microsoft+Entra+Id+Protection+-+Overview.png' alt="Azure Security - Microsoft Entra ID Protection - Overview" />

### Security

The **Azure Security - Microsoft Entra ID Protection - Security** dashboard provides a comprehensive overview of identity-related threats within the organization, enabling teams to pinpoint where identity risks are concentrated and how they evolve over time. Visual trend panels display fluctuations in user and sign-in risk levels, helping analysts assess whether identity-based attacks are increasing and prioritize mitigation accordingly.

Key insights include compromised user accounts, frequently attacked devices, and countries linked to malicious IPs, enabling targeted defense strategies. By combining trend analysis with threat origins and user risk data, the dashboard empowers proactive threat response and strengthens overall security posture.
<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure+-Security-Microsoft-Entra-Id-Protection/Azure+Security+-+Microsoft+Entra+Id+Protection+-+Security.png' alt="Azure Security - Microsoft Entra ID Protection  - Security" />

## Upgrade/Downgrade the Azure Security - Microsoft Entra ID Protection app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Security - Microsoft Entra ID Protection app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
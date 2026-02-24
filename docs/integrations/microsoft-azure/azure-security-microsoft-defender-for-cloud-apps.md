---
id: azure-security-microsoft-defender-for-cloud-apps
title: Azure Security - Microsoft Defender for Cloud Apps
sidebar_label: Azure Security - Microsoft Defender for Cloud Apps
description: Learn how to collect alerts from the Azure Security - Microsoft Defender for Cloud Apps platform and send them to Sumo Logic for analysis.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-security-microsoft-defender-for-cloud-apps.png')} alt="Thumbnail icon" width="50"/>

The Azure Security – Microsoft Defender for Cloud Apps strengthens the security of cloud-based applications within Azure by offering proactive threat detection and streamlined monitoring. It centralizes data related to cloud app security, enabling security teams to efficiently investigate anomalies, detect vulnerabilities, and take prompt action to mitigate risks. This centralized approach enhances the ability to respond to potential breaches and protects cloud resources more effectively.

The Sumo Logic app for Azure Security - Microsoft Defender for Cloud Apps provides interactive dashboards and visual tools, the app supports incident identification, user activity tracking, and access monitoring for sensitive data. These features allow for faster response times and more agile decision-making, helping organizations improve their overall security posture. By delivering a comprehensive view of cloud app security, the app empowers you to manage threats efficiently and ensures robust protection of critical Azure-based assets.

## Log Types

The Azure Security – Microsoft Defender for Cloud Apps uses Sumo Logic’s Microsoft Graph Security source to collect [alerts](https://learn.microsoft.com/en-us/graph/api/security-list-alerts_v2?view=graph-rest-1.0&tabs=http) from the Microsoft Graph Security source.

### Sample log messages

<details>
<summary>Alert Log</summary>

```json
{
   "id": "adda21de253ca551df2175818825088751ac4ed5e365dae35a1a",
   "providerAlertId": "72e04fdfba1758188250d1d593711dd0e7aeaf11d35782c79d8c82f485fc1ce8",
   "incidentId": "15",
   "status": "new",
   "severity": "medium",
   "classification": "benignPositive",
   "determination": "securityPersonnel",
   "serviceSource": "microsoftDefenderForCloudApps",
   "detectionSource": "microsoftThreatExperts",
   "detectorId": "AnomalousToken",
   "tenantId": "3adb963c-8e61-48e8-a06d-6dbb0dacea39",
   "title": "Anomalous Token",
   "description": "Anomalous token indicates that there are abnormal characteristics in the token such as token duration and authentication from unfamiliar IP address",
   "recommendedActions": "",
   "category": "InitialAccess",
   "assignedTo": null,
   "alertWebUrl": "https://gay.nguyenletriloc.pro/alerts/adda21de253ca551ef288751ac4ed5e365dae35a1a?tid=3adb963c-8e61-48e8-a06d-6dbb0dacea39",
   "incidentWebUrl": "https://gay.nguyenletriloc.pro/incidents/15?tid=3adb963c-8e61-48e8-a06d-6dbb0dacea39",
   "actorDisplayName": null,
   "threatDisplayName": null,
   "threatFamilyName": null,
   "mitreTechniques": [],
   "createdDateTime": "2025-09-18T15:07:30+0530378Z",
   "lastUpdateDateTime": "2025-09-18T15:07:30+0530667Z",
   "resolvedDateTime": null,
   "firstActivityDateTime": "2025-09-18T15:07:30+0530913Z",
   "lastActivityDateTime": "2025-09-18T15:07:30+0530913Z",
   "comments": [
       {
           "@odata.type": "#microsoft.graph.security.alertComment",
           "comment": "Not valid",
           "createdByDisplayName": "Mike",
           "createdDateTime": "2025-09-18T15:07:30+053088Z"
       }
   ],
   "evidence": [
       {
           "@odata.type": "#microsoft.graph.security.userEvidence",
           "createdDateTime": "2025-09-18T15:07:30+0530333Z",
           "verdict": "unknown",
           "remediationStatus": "none",
           "remediationStatusDetails": null,
           "roles": [
               "compromised"
           ],
           "detailedRoles": [],
           "tags": [],
           "userAccount": {
               "accountName": "sonali.thakker",
               "domainName": null,
               "userSid": "S-1-12-1-1758188250-1758188250-1758188250-1758188250",
               "azureAdUserId": "c4bedccf-e5ff-4215-a1df-468800618a6c",
               "userPrincipalName": "mike@odata.com",
               "displayName": null
           }
       },
       {
           "@odata.type": "#microsoft.graph.security.ipEvidence",
           "createdDateTime": "2025-09-18T15:07:30+0530333Z",
           "verdict": "malicious",
           "remediationStatus": "none",
           "remediationStatusDetails": null,
           "roles": [],
           "detailedRoles": [],
           "tags": [],
           "ipAddress": "111.90.159.147",
           "countryLetterCode": "US"
       }
   ]
}
```
</details>

### Sample queries

```sql title="Total Alerts"
_sourceCategory=Labs/MicrosoftGraphSecurity 
|json"id","status","severity","category","title","description","classification","determination","serviceSource","detectionSource","alertWebUrl" ,"comments[*]","evidence[*]"as  alert_id,status,severity,category,title,description,classification,determination,service_source,detection_source,alert_url,comments,evidence_info nodrop

| where toLowerCase(service_source) = "microsoftdefenderforcloudapps"

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

| where toLowerCase(service_source) = "microsoftdefenderforcloudapps"

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
Use the [Cloud-to-Cloud Integration for Microsoft Graph Security API](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Azure Security - Microsoft Defender for Cloud Apps is properly integrated and configured to collect and analyze your Azure Security - Microsoft Defender for Cloud Apps data.
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

## Viewing the Azure Security - Microsoft Defender for Cloud Apps dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Azure Security - Microsoft Defender for Cloud Apps - Overview** dashboard provides a comprehensive view of endpoint security threats, enabling quick assessment and response through visualizations of total and high-severity alerts by status, source, and classification. It helps teams identify prevalent alert categories, monitor recent activity, and track analyst assignments.

With features like geo-location mapping and top user alerts, the dashboard supports regional risk assessment and detection of insider threats. By combining real-time insights with historical trends, it enhances situational awareness and strengthens incident response strategies.
<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure+-Security-Microsoft-Defender-for-Cloud-Apps/Azure+Security+-+Microsoft+Defender+for+Cloud+Apps+-+Overview.png' alt="Azure Security - Microsoft Defender for Identity Cloud Apps - Overview" />

### Security

The **Azure Security - Microsoft Defender for Cloud Apps - Security** dashboard offers a high-level view of endpoint threats, highlighting evolving risks through alert severity trends and geo-location data. It helps teams prioritize responses by revealing increases in high-risk incidents and identifying threats from specific regions.

Key insights include compromised user accounts, frequently attacked devices, and countries linked to malicious IPs, enabling targeted defense strategies. By combining trend analysis with threat origins and user risk data, the dashboard empowers proactive threat response and strengthens overall security posture.
<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure+-Security-Microsoft-Defender-for-Cloud-Apps/Azure+Security+-+Microsoft+Defender+for+Cloud+Apps+-+Security.png' alt="Azure Security - Microsoft Defender for Cloud Apps - Security" />

## Upgrade/Downgrade the Azure Security - Microsoft Defender for Cloud Apps app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Security - Microsoft Defender for Cloud Apps app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
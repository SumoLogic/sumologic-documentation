---
id: azure-security-microsoft-defender-for-identity
title: Azure Security - Microsoft Defender for Identity
description: Learn how to collect alerts from the Azure Security - Microsoft Defender for Identity platform and send them to Sumo Logic for analysis.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/ms-graph.svg')} alt="Thumbnail icon" width="50"/>

The Sumo Logic app for Azure Security – Microsoft Defender for Identity enhances endpoint protection by centralizing alert data from various devices, enabling faster detection, investigation, and response to cyber threats. It uses advanced analytics and threat intelligence to identify malicious behavior and high-risk activity. With detailed dashboards and visualizations, it helps security teams track recurring incidents, assess vulnerabilities, and reduce response time, offering a comprehensive view of your organization’s endpoint security posture.

:::info
This app includes [built-in monitors](#azure-security---microsoft-defender-for-identity-alerts). For details on creating custom monitors, refer to [Create monitors for Azure Security - Microsoft Defender for Identity app](#create-monitors-for-azure-security---microsoft-defender-for-identity-app).
:::

## Log types

The Azure Security – Microsoft Defender for Identity app uses Sumo Logic’s Microsoft Graph Security source to collect [alerts](https://learn.microsoft.com/en-us/graph/api/security-list-alerts_v2?view=graph-rest-1.0&tabs=http) from the Microsoft Graph Security source.

### Sample log messages

<details>
<summary>Alert Log</summary>

```json
{
  "@odata.type": "#microsoft.graph.security.alert",
  "id": "da637551227677560813_-961444813",
  "providerAlertId": "da637551227677560813_-961444813",
  "incidentId": "28282",
  "status": "new",
  "severity": "low",
  "classification": "unknown",
  "determination": "unknown",
  "serviceSource": "microsoftDefenderForIdenity",
  "detectionSource": "antivirus",
  "detectorId": "e0da400f-affd-43ef-b1d5-afc2eb6f2756",
  "tenantId": "b3c1b5fc-828c-45fa-a1e1-10d74f6d6e9c",
  "title": "Suspicious execution of hidden file",
  "description": "A hidden file has been launched. This activity could indicate a compromised host. Attackers often hide files associated with malicious tools to evade file system inspection and defenses.",
  "recommendedActions": "Collect artifacts and determine scope Review the machine timeline for suspicious activities that may have occurred before and after the time of the alert, and record additional related artifacts (files, IPs/URLs) Look for the presence of relevant artifacts on other systems.",
  "category": "DefenseEvasion",
  "assignedTo": null,
  "alertWebUrl": "https://security.microsoft.com/alerts/da637551227677560813_-961444813?tid=b3c1b5fc-828c-45fa-a1e1-10d74f6d6e9c",
  "incidentWebUrl": "https://security.microsoft.com/incidents/28282?tid=b3c1b5fc-828c-45fa-a1e1-10d74f6d6e9c",
  "actorDisplayName": null,
  "threatDisplayName": null,
  "threatFamilyName": null,
  "mitreTechniques": [
    "T1564.001"
  ],
  "createdDateTime": "2021-04-27T12:19:27.7211305Z",
  "lastUpdateDateTime": "2021-05-02T14:19:01.3266667Z",
  "resolvedDateTime": null,
  "firstActivityDateTime": "2021-04-26T07:45:50.116Z",
  "lastActivityDateTime": "2021-05-02T07:56:58.222Z",
  "comments": [],
  "evidence": [
    {
      "@odata.type": "#microsoft.graph.security.deviceEvidence",
      "createdDateTime": "2021-04-27T12:19:27.7211305Z",
      "verdict": "unknown",
      "remediationStatus": "none",
      "remediationStatusDetails": null,
      "firstSeenDateTime": "2020-09-12T07:28:32.4321753Z",
      "mdeDeviceId": "73e7e2de709dff64ef64b1d0c30e67fab63279db",
      "azureAdDeviceId": null,
      "deviceDnsName": "yonif-lap3.middleeast.corp.microsoft.com",
      "hostName": "yonif-lap3",
      "ntDomain": null,
      "dnsDomain": "middleeast.corp.microsoft.com",
      "osPlatform": "Windows10",
      "osBuild": 22424,
      "version": "Other",
      "healthStatus": "active",
      "riskScore": "medium",
      "rbacGroupId": 75,
      "rbacGroupName": "UnassignedGroup",
      "onboardingStatus": "onboarded",
      "defenderAvStatus": "unknown",
      "ipInterfaces": [
        "1.1.1.1"
      ],
      "loggedOnUsers": [],
      "roles": [
        "compromised"
      ],
      "detailedRoles": [
        "Main device"
      ],
      "tags": [
        "Test Machine"
      ],
      "vmMetadata": {
        "vmId": "ca1b0d41-5a3b-4d95-b48b-f220aed11d78",
        "cloudProvider": "azure",
        "resourceId": "/subscriptions/8700d3a3-3bb7-4fbe-a090-488a1ad04161/resourceGroups/WdatpApi-EUS-STG/providers/Microsoft.Compute/virtualMachines/NirLaviTests",
        "subscriptionId": "8700d3a3-3bb7-4fbe-a090-488a1ad04161"
      }
    }
    ],
    "systemTags" : [
        "Defender Experts"
  ]
}
```
</details>

### Sample queries

```sql title="Alerts by Status"
_sourceCategory=MicrosoftGraphSecurityIdentity id status microsoftDefenderForIdentity
| json "id", "status", "severity", "classification", "serviceSource" as alert_id, status, severity, classification, service_source nodrop
| where toLowerCase(service_source) matches ("microsoftdefenderforidentity")

// global filters
| where if ("{{severity}}" = "*", true, severity matches "{{severity}}")
| where status matches "{{status}}" AND !isBlank(status)
| where if ("{{classification}}" = "*", true, classification matches "{{classification}}")

// panel specific
| count by status, alert_id
| count as count by status
| sort by count, status asc
```

```sql title="Alerts by Classification"
_sourceCategory=MicrosoftGraphSecurityIdentity id classification microsoftDefenderForIdentity
| json "id", "status", "severity", "classification", "serviceSource" as alert_id, status, severity, classification, service_source nodrop
| where toLowerCase(service_source) matches ("microsoftdefenderforidentity")

// global filters
| where if ("{{severity}}" = "*", true, severity matches "{{severity}}")
| where if ("{{status}}" = "*", true, status matches "{{status}}")
| where classification matches "{{classification}}" AND !isBlank(classification)

// panel specific
| count by classification, alert_id 
| count as count by classification
| sort by count, classification asc
```

```sql title="Top 10 Alert Categories"
_sourceCategory=MicrosoftGraphSecurityIdentity id category microsoftDefenderForIdentity
| json "id", "status", "severity", "category", "classification", "serviceSource" as alert_id, status, severity, category, classification, service_source nodrop
| where toLowerCase(service_source) matches ("microsoftdefenderforidentity")

// global filters
| where if ("{{severity}}" = "*", true, severity matches "{{severity}}")
| where if ("{{status}}" = "*", true, status matches "{{status}}")
| where if ("{{classification}}" = "*", true, classification matches "{{classification}}")

// panel specific
| where !isBlank(category)
| count by category, alert_id
| count as count by category
| sort by count, category asc
| limit 10
```

## Collection configuration and app installation

:::note
- Skip this step if you have already configured the [Microsoft Graph Security API Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/).
- Select **Use the existing source and install the app** to install the app using the `sourceCategory` of the Microsoft Graph Security API Source configured above.
:::

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Microsoft Graph Security API](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Azure Security - Microsoft Defender for Identity app is properly integrated and configured to collect and analyze your Azure Security - Microsoft Defender for Identity data.
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

## Viewing the Azure Security - Microsoft Defender for Identity dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Azure Security - Microsoft Defender for Identity - Overview** dashboard provides a comprehensive view of security threats detected across endpoints, enabling analysts to quickly assess, prioritise, and respond to potential incidents. Through an extensive set of visualisations, it presents key metrics such as total alerts, high-severity alerts, and their breakdown by status, classification, determination, service source, and detection source.

Security teams can easily identify dominant alert categories, monitor the most recent alerts for immediate action, and track analyst assignments to ensure accountability. The dashboard also highlights top users associated with alerts, helping detect insider threats or compromised accounts that may require deeper investigation.

Geo-location mapping adds another layer of insight by showing the origin of alerts, supporting region-specific risk assessments. By combining historical trends with real-time visibility, the dashboard enables security teams to focus on high-impact threats and improve response times.
<br/><img src={useBaseUrl('/img/integrations/microsoft-azure/Azure-Security-Microsoft-Defender-for-Identity-Overview.png')} alt="Azure Security - Microsoft Defender for Identity - Overview" />

### Security

The **Azure Security - Microsoft Defender for Identity - Security** dashboard offers a strategic, high-level view of the organisation’s endpoint threat landscape, enabling security teams to pinpoint risk concentrations and monitor how threats evolve over time. Interactive trend panels display shifts in alert severity, helping teams quickly identify surges in high-risk incidents and prioritise their response accordingly.

Geo-location insights spotlight alerts originating from embargoed locations, supporting threat assessments tied to specific geopolitical contexts. The dashboard also provides critical visibility into top user accounts with compromised or privileged roles—potential indicators of targeted attacks or insider threats.

Additionally, it ranks the most frequently attacked devices and highlights countries linked to malicious or suspicious IP activity, offering clear insight into the most vulnerable assets and regions. This intelligence allows for more focused defences and faster, more effective threat mitigation.

By integrating trend analysis, threat origin mapping, and user risk profiling, the Security dashboard empowers analysts to detect emerging patterns, respond proactively, and strengthen the organisation’s resilience against sophisticated endpoint threats.
<br/><img src={useBaseUrl('/img/integrations/microsoft-azure/Azure-Security-Microsoft-Defender-for-Identity-Security.png')} alt="Azure Security - Microsoft Defender for Identity - Security" />

## Create monitors for Azure Security - Microsoft Defender for Identity app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Security - Microsoft Defender for Identity alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Microsoft Defender for Identity - Alerts Detected from Embargoed Locations` | This alert is triggered when activity is detected from a location flagged as high-risk, enabling you to monitor access attempts from unusual or restricted geographic regions. It enhances your ability to spot suspicious behaviour and potential threats originating from locations outside your organisation’s typical operating areas. | Critical | Count > 0 | 
| `Microsoft Defender for Identity - High Severity Alerts` | This alert is triggered when a high-severity threat is detected, allowing you to promptly monitor and respond to potentially harmful events that may compromise endpoint security. It ensures critical incidents are prioritised for swift investigation and mitigation. | Critical | Count > 0|
| `Microsoft Defender for Identity - Embargoed Device` | This alert is triggered when a single device generates multiple alerts, indicating potentially malicious behaviour. It helps you identify high-risk devices, monitor suspicious activity more effectively, and take swift action to prevent further compromise. | Critical | Count > 5 |

## Upgrade/Downgrade the Azure Security - Microsoft Defender for Identity app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Security - Microsoft Defender for Identity app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
---
id: microsoft-defender-for-endpoint
title: Microsoft Defender for Endpoint
sidebar_label: Microsoft Defender for Endpoint
description: The Sumo Logic App for Microsoft Defender for Endpoint outlines the steps required to collect and analyze the alert data from the Azure security platform to the Sumo Logic platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/microsoft-defender-for-identity.png')} alt="Thumbnail icon" width="60"/>

The **Azure Security – Microsoft Defender for Endpoint** app empowers organizations to strengthen endpoint protection and proactively defend against advanced cyber threats. By centralizing alert data from devices like desktops, laptops, mobile devices, and servers, the app offers actionable insights that help security teams detect, investigate, and respond to suspicious activity faster and more effectively.

Leveraging advanced analytics and contextual threat intelligence, the app highlights patterns of malicious behavior, suspicious processes, and high-severity alerts. This visibility equips security teams to pinpoint vulnerabilities, monitor risk exposure, and understand the evolving threat landscape impacting endpoints. With its comprehensive pre-configured dashboards and visualizations, the app helps identify users, devices, or locations associated with recurring security incidents. This capability supports faster investigation and more targeted mitigation, reducing dwell time and potential damage.

By providing a holistic view of your organization’s endpoint security posture, the **Azure Security – Microsoft Defender for Endpoint** app ensures security teams remain agile, informed, and ready to respond to emerging threats — strengthening defenses and safeguarding critical assets.

## Log types

This app uses SumoLogic’s Microsoft Graph Security source to collect [Alerts](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/) from the Microsoft Defender for Endpoint to the Sumo Logic platform.

### Sample log message

<details>

<summary>Alerts log message</summary>

```json
{
  "id": "adf3a5c9bc83f5cfd175152516139fd01df4845a64d36f0d4481",
  "providerAlertId": "5bd1db63c29f8f4f17e6be7f8b4b1751525161523a3adee797b414fbaf6b1af1",
  "incidentId": "16",
  "status": "new",
  "severity": "high",
  "classification": "truePositive",
  "determination": "compromisedUser",
  "serviceSource": "microsoftDefenderForEndpoint",
  "detectionSource": "microsoftDataLossPrevention",
  "detectorId": "ImpossibleTravel",
  "tenantId": "3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "title": "Atypical travel",
  "description": "Sign-in from an atypical location based on the user\u2019s recent sign-ins",
  "recommendedActions": "",
  "category": "InitialAccess",
  "assignedTo": null,
  "alertWebUrl": "https://stravinmonsal.cajueiro.buzz/alerts/adf3a5c9bc83f5cfd39fd08df4845a64d36f0d4481?tid=3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "incidentWebUrl": "https://stravinmonsal.cajueiro.buzz/incidents/16?tid=3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "actorDisplayName": null,
  "threatDisplayName": null,
  "threatFamilyName": null,
  "mitreTechniques": ["T1078", "T1078.004"],
  "createdDateTime": "2025-07-03T12:16:01+053088Z",
  "lastUpdateDateTime": "2025-07-03T12:16:01+0530333Z",
  "resolvedDateTime": null,
  "firstActivityDateTime": "2025-07-03T12:16:01+0530577Z",
  "lastActivityDateTime": "2025-07-03T12:16:01+0530577Z",
  "comments": [
    {
      "@odata.type": "#microsoft.graph.security.alertComment",
      "comment": "Not valid",
      "createdByDisplayName": "John",
      "createdDateTime": "2025-07-03T12:16:01+053088Z"
    }
  ],
  "evidence": [
    {
      "@odata.type": "#microsoft.graph.security.userEvidence",
      "createdDateTime": "2025-07-03T12:16:01.523Z",
      "verdict": "unknown",
      "remediationStatus": "none",
      "remediationStatusDetails": null,
      "roles": ["compromised"],
      "detailedRoles": [],
      "tags": [],
      "userAccount": {
        "accountName": "tseapps",
        "domainName": null,
        "userSid": "S-1-12-1-1751525161-1751525161-589068932-1751525161",
        "azureAdUserId": "f5e829f5-4b1f-4fcf-847a-1c234c1b3b82",
        "userPrincipalName": "danny@euvzrzebjk.com",
        "displayName": null
      }
    },
    {
      "@odata.type": "#microsoft.graph.security.ipEvidence",
      "createdDateTime": "2025-07-03T12:16:01.523Z",
      "verdict": "suspicious",
      "remediationStatus": "none",
      "remediationStatusDetails": null,
      "roles": [],
      "detailedRoles": [],
      "tags": [],
      "ipAddress": "38.180.52.2",
      "countryLetterCode": "IN"
    },
    {
      "@odata.type": "#microsoft.graph.security.ipEvidence",
      "createdDateTime": "2025-07-03T12:16:01.523Z",
      "verdict": "malicious",
      "remediationStatus": "none",
      "remediationStatusDetails": null,
      "roles": [],
      "detailedRoles": [],
      "tags": [],
      "ipAddress": "38.180.52.2",
      "countryLetterCode": "US"
    },
    {
      "@odata.type": "#microsoft.graph.security.deviceEvidence",
      "createdDateTime": "2025-07-03T12:16:01.523Z",
      "verdict": "String",
      "remediationStatus": "String",
      "remediationStatusDetails": "String",
      "roles": ["String"],
      "tags": ["String"],
      "firstSeenDateTime": "2025-07-03T12:16:01+053088Z",
      "mdeDeviceId": "String",
      "azureAdDeviceId": "String",
      "deviceDnsName": "String",
      "osPlatform": "String",
      "osBuild": "Integer",
      "version": "String",
      "rbacGroupId": "Integer",
      "rbacGroupName": "String",
      "healthStatus": "String",
      "riskScore": "String",
      "onboardingStatus": "String",
      "defenderAvStatus": "String",
      "vmMetadata": {
        "@euvzrzebjk.type": "microsoft.graph.security.vmMetadata"
      },
      "loggedOnUsers": [
        { "@euvzrzebjk.type": "microsoft.graph.security.loggedOnUser" }
      ]
    }
  ]
}
```

</details>

### Sample query

```sql title="Total Alerts"
_sourceCategory="Labs/MicrosoftGraphSecurity" id microsoftDefenderForEndpoint
| json "id", "status", "severity", "classification", "serviceSource" as alert_id, status, severity, classification, service_source nodrop
| where toLowerCase(service_source) matches "microsoftdefenderforendpoint"

// global filters
| where if ("{{severity}}" = "*", true, severity matches "{{severity}}")
| where if ("{{status}}" = "*", true, status matches "{{status}}")
| where if ("{{classification}}" = "*", true, classification matches "{{classification}}")

// panel specific
| count by alert_id 
| count
```

## Collection configuration and app installation

:::note
Skip this step if you have already configured the [Microsoft Graph Security API](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/) Source. **[Use an existing source and install the app](#use-an-existing-source-and-install-the-app)** option to install the app using the `_sourceCategory` of Microsoft Graph Security API Source.
:::

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

:::important
Use the [Cloud-to-Cloud Integration for Microsoft Graph Security API](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Microsoft Graph Security API app is properly integrated and configured to collect and analyze your security alerts data.
:::

## Viewing Microsoft Defender for Endpoint dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Azure Security - Microsoft Defender for Endpoint - Overview** dashboard offers a detailed view into security threats detected across endpoints, enabling analysts to assess and act swiftly on potential incidents. With a broad set of visualizations, it displays total alerts, high-severity alerts, and their distribution by status, classification, determination, service source, and detection source.

Security teams can quickly identify which alert categories are most prevalent, view recent alerts for immediate awareness, and also track which analysts are actively assigned to incidents. By highlighting the top users linked to alerts, the dashboard helps uncover potential insider threats or compromised accounts that require further investigation.

Geo-location mapping visualizes the alert origin, supporting risk assessment tied to specific regions. Together, these insights provide a balanced blend of historical context and real-time visibility, empowering teams to prioritize high-impact threats and respond effectively.

Overall, this dashboard serves as an essential tool for maintaining situational awareness, tracking alert trends, and strengthening your organization’s response strategy against evolving endpoint threats.<br/><img src={useBaseUrl('/img/integrations/microsoft-azure/Azure-Security-Microsoft-Defender-for-Endpoint-Overview.png')} alt="Azure-Security-Microsoft-Defender-for-Endpoint-Overview" />

### Security

The **Azure Security - Microsoft Defender for Endpoint - Security** dashboard delivers a high-level view of your organization’s endpoint threat landscape, helping teams identify where risks concentrate and how they evolve over time. Visual trend panels illustrate changes in alert severity, revealing whether high-risk incidents are increasing and guiding prioritization of response efforts.

Geo-location data highlights alerts emerging from embargoed locations, allowing teams to assess exposure to region-specific threats. The dashboard also surfaces critical context, such as the top user accounts with compromised roles, which can signal targeted attacks on privileged accounts.

In addition, the dashboard ranks the most frequently attacked devices and countries linked to suspicious or malicious IP activity, offering clarity on which assets and locations are most at risk. This intelligence supports more targeted defenses and timely intervention.

By combining trend analysis, threat origins, and user risk insights, the Security dashboard equips analysts to recognize patterns, respond to emerging threats proactively, and bolster the organization’s overall security posture against complex endpoint attacks.<br/><img src={useBaseUrl('/img/integrations/microsoft-azure/Azure-Security-Microsoft-Defender-for-Endpoint-Security.png')} alt="Azure-Security-Microsoft-Defender-for-Endpoint-Security" />

## Create monitors for Azure Security - Microsoft Defender for Endpoint app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Security - Microsoft Defender for Endpoint alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Microsoft Defender for Endpoint - Alerts Detected from Embargoed Locations` | This alert is triggered when activity is detected from a location flagged as high-risk, enabling you to monitor access attempts from unusual or restricted geographic regions. It enhances your ability to spot suspicious behaviour and potential threats originating from locations outside your organisation’s typical operating areas. | Critical | Count > 0 | 
| `Microsoft Defender for Endpoint - High Severity Alerts` | This alert is triggered when a high-severity threat is detected, allowing you to promptly monitor and respond to potentially harmful events that may compromise endpoint security. It ensures critical incidents are prioritised for swift investigation and mitigation. | Critical | Count > 0|
| `Microsoft Defender for Endpoint - Embargoed Device` | This alert is triggered when a single device generates multiple alerts, indicating potentially malicious behaviour. It helps you identify high-risk devices, monitor suspicious activity more effectively, and take swift action to prevent further compromise. | Critical | Count > 5 |

## Upgrade/Downgrade the Azure Security - Microsoft Defender for Endpoint app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Security - Microsoft Defender for Endpoint app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
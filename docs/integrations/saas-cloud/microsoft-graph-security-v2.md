---
id: microsoft-graph-security-v2
title: Microsoft Graph Security V2
sidebar_label: Microsoft Graph Security V2
description: The Microsoft Graph Security V2 app for Sumo Logic enables you to identify security threats by analyzing alert logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/send-data/ms-graph.svg')} alt="icon" width="50"/>

The Microsoft Graph Security V2 app for Sumo Logic empowers you to analyze security threats and take proactive measures to safeguard your organization. With its comprehensive widgets, you can track and analyze your security alerts in detail.

The app utilizes Sumo Logic's cloud-to-cloud [Microsoft Graph Security source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/) to collect and analyze alerts from the Microsoft Graph Security API endpoint. With this information, organizations can swiftly detect and respond to potential security incidents.

With the Microsoft Graph Security  V2 app, you can:

* Detect and mitigate potential ransomware attacks.
* Monitor endpoint security and pinpoint potential threats.
* Have a high-level overview of the security posture of the organization, including metrics such as the number of alerts, alert severity, and status.
* Allow security teams to identify potential threats and take appropriate action based on the trends and patterns of security alerts over time.

Overall, the Sumo Logic app for Microsoft Graph Security V2 is designed to help organizations improve their web security posture and protect their users and assets from potential threats. The app enables security teams to proactively detect and mitigate potential security risks, and improve compliance with security policies and regulations.

## Log Types

This app uses Sumo Logic's Microsoft Graph Security Source to collect v2 [Alerts](https://learn.microsoft.com/en-us/graph/api/security-list-alerts_v2?view=graph-rest-1.0&tabs=http) from the Microsoft Graph Security API endpoint. Refer to [this document](https://learn.microsoft.com/en-us/graph/api/resources/security-alert?view=graph-rest-1.0) for alert fields. 

### Sample log message

<details><summary>Sample Alert Log (click to expand)</summary>

```json title="Sample Alert Log"
{
  "id":"adf3a5c9bc83f5cfd39fd01df4845a64d36f0d4481",
  "providerAlertId":"5bd1db63c29f8f4f17e6be7f8b4b5470199759916a3adee797b414fbaf6b1af1",
  "incidentId":"16",
  "status":"new",
  "severity":"high",
  "classification":"truePositive",
  "determination":"compromisedUser",
  "serviceSource":"azureAdIdentityProtection",
  "detectionSource":"microsoftDataLossPrevention",
  "detectorId":"ImpossibleTravel",
  "tenantId":"3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "title":"Atypical travel",
  "description":"Sign-in from an atypical location based on the user\u2019s recent sign-ins",
  "recommendedActions":"",
  "category":"InitialAccess",
  "assignedTo":null,
  "alertWebUrl":"https://security.microsoft.com/alerts/adf3a5c9bc83f5cfd39fd08df4845a64d36f0d4481?tid=3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "incidentWebUrl":"https://security.microsoft.com/incidents/16?tid=3adb963c-8e61-48e8-a06d-6dbb0dacea39",
  "actorDisplayName":null,
  "threatDisplayName":null,
  "threatFamilyName":null,
  "mitreTechniques":[
    "T1078",
    "T1078.004"
  ],
  "createdDateTime":"2023-07-03T20:38:42.824388Z",
  "lastUpdateDateTime":"2023-07-03T22:00:49.9733333Z",
  "resolvedDateTime":null,
  "firstActivityDateTime":"2023-07-03T18:53:26.4235577Z",
  "lastActivityDateTime":"2023-07-03T18:53:26.4235577Z",
  "comments":[
    {
      "@odata.type":"#microsoft.graph.security.alertComment",
      "comment":"Not valid",
      "createdByDisplayName":"John",
      "createdDateTime":"2023-07-03T20:38:42.824388Z"
    }
  ],
  "evidence":[
    {
      "@odata.type":"#microsoft.graph.security.userEvidence",
      "createdDateTime":"2023-07-03T20:38:43.07Z",
      "verdict":"unknown",
      "remediationStatus":"none",
      "remediationStatusDetails":null,
      "roles":[
        "compromised"
      ],
      "detailedRoles":[

      ],
      "tags":[

      ],
      "userAccount":{
        "accountName":"tseapps",
        "domainName":null,
        "userSid":"S-1-12-1-4125633013-1338985247-589068932-2218466124",
        "azureAdUserId":"f5e829f5-4b1f-4fcf-847a-1c234c1b3b82",
        "userPrincipalName":"danny@xyz.com",
        "displayName":null
      }
    },
    {
      "@odata.type":"#microsoft.graph.security.ipEvidence",
      "createdDateTime":"2023-07-03T20:38:43.07Z",
      "verdict":"suspicious",
      "remediationStatus":"none",
      "remediationStatusDetails":null,
      "roles":[

      ],
      "detailedRoles":[

      ],
      "tags":[

      ],
      "ipAddress":"103.108.207.58",
      "countryLetterCode":"IN"
    },
    {
      "@odata.type":"#microsoft.graph.security.ipEvidence",
      "createdDateTime":"2023-07-03T20:38:43.07Z",
      "verdict":"malicious",
      "remediationStatus":"none",
      "remediationStatusDetails":null,
      "roles":[

      ],
      "detailedRoles":[

      ],
      "tags":[

      ],
      "ipAddress":"12.26.0.42",
      "countryLetterCode":"US"
    },
    {
      "@odata.type":"#microsoft.graph.security.deviceEvidence",
      "createdDateTime":"2023-07-03T20:38:43.07Z",
      "verdict":"String",
      "remediationStatus":"String",
      "remediationStatusDetails":"String",
      "roles":[
        "String"
      ],
      "tags":[
        "String"
      ],
      "firstSeenDateTime":"2023-07-03T20:38:42.824388Z",
      "mdeDeviceId":"String",
      "azureAdDeviceId":"String",
      "deviceDnsName":"String",
      "osPlatform":"String",
      "osBuild":"Integer",
      "version":"String",
      "rbacGroupId":"Integer",
      "rbacGroupName":"String",
      "healthStatus":"String",
      "riskScore":"String",
      "onboardingStatus":"String",
      "defenderAvStatus":"String",
      "vmMetadata":{
        "@odata.type":"microsoft.graph.security.vmMetadata"
      },
      "loggedOnUsers":[
        {
          "@odata.type":"microsoft.graph.security.loggedOnUser"
        }
      ]
    }
  ]
}
```

</details>

### Sample Query     

```sql title="Total Alerts"
_sourceCategory="ms_alerts"
|json"id","status","severity","category","title","description","classification","determination","serviceSource","detectionSource" ,"comments[*]","evidence[*]"as  alert_id,status,severity,category,title,description,classification,determination,service_source,detection_source,comments,evidence_info nodrop
| where severity matches "{{severity}}"
| where status matches "{{status}}"
| where classification matches "{{classification}}"
| count_distinct(alert_id)
```

## Set up collection

Follow the instructions for setting up [Cloud-to-Cloud Integration for Microsoft Graph Security](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/) app to create the source and use the same source category while installing the app.

## Installing the Microsoft Graph Security app​

This section has instructions for installing the Microsoft Graph Security app for Sumo Logic and a description of the dashboard. Configure Microsoft Graph Security app using the steps described in the [Microsoft Graph Security Cloud-to-Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/).

Locate and install the app you need from the App Catalog. If you want to see a preview of the dashboard included with the app before installing, click **Preview Dashboards**.

{@import ../../reuse/apps/app-install.md}

## Viewing Microsoft Graph Security Dashboards​

### Microsoft Graph Security - Alerts Overview

The Alerts Overview dashboard lets you analyze security threats and take proactive measures to safeguard your organization. The dashboard includes a variety of widgets, including the total alerts, the alerts by status, the alerts by classification, the alerts by source and detection sources, the alerts by determination, the top analyst, the geo location of alerts, and the top alert categories.

The top users associated with the alerts widget help you pinpoint and address potential security risks related to user behavior efficiently. The recent alerts widget offers a quick snapshot of the latest security activity, ensuring that you are always up-to-date on the latest developments.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Microsoft-Graph-Security/Microsoft-Graph-Security-Alerts-Overview.png' alt="Microsoft-Graph-Security-Alerts-Overview" />

### Microsoft Graph Security - Alerts Security Overview

The **Alerts Security Overview** dashboard allows you to have a high-level overview of the security posture of the organization. The dashboards include a variety of widgets including high-severity alerts. The geo-location widget highlights alerts from high-risk countries, making it easier to identify and respond to potential threats from specific locations. The severity and trend widgets provide a detailed overview of the frequency and severity of alerts over time, allowing you to take proactive measures to mitigate risks.

The top 10 countries with malicious or suspicious IP addresses help to identify and mitigate potential threats originating from countries with a history of suspicious or malicious IP activity. The top 10 user accounts with compromised role highlights user accounts with compromised roles, necessitating immediate investigation, and remediation to protect sensitive data and system integrity. The top 10 attacked device gives an overview of the most targeted devices.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Microsoft-Graph-Security/Microsoft-Graph-Security-Alerts-Security-Overview.png' alt="Microsoft-Graph-Security-Alerts-Overview" />

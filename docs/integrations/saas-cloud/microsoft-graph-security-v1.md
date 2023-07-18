---
id: microsoft-graph-security-v1
title: Microsoft Graph Security V1
sidebar_label: Microsoft Graph Security V1
description: The Microsoft Graph Security V1 app for Sumo Logic enables you to identify security threats by analyzing alert logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/send-data/ms-graph.svg')} alt="icon" width="50"/>

The Sumo Logic App for Microsoft Graph Security V1 enables you to identify security threats by analyzing alert logs and helps you to improve web security posture, proactively detect and mitigate potential security risks, and improve compliance with security policies and regulations.

Key features of the Microsoft Graph Security app include:
- Detect and mitigate potential ransomware attacks.
- Monitor endpoint security and identify potential threats.
- High-level overview of the organizational security posture, including metrics such as the number of alerts, alert severity, and status.
- Allows security teams to identify potential threats and take appropriate action based on the trends and patterns of security alerts over time.

## Log types

This app uses Sumo Logic’s Microsoft Graph Security Source to collect [Alerts](https://learn.microsoft.com/en-us/graph/api/alert-list?view=graph-rest-1.0&tabs=http) from Microsoft Graph Security.

:::info
Learn more about [fields of alert](https://learn.microsoft.com/en-us/graph/api/resources/alert?view=graph-rest-1.0).
:::

## Sample log message

```json title="Sample Alert Log"
 {
           "azureSubscriptionId": null,
           "riskScore": null,
           "tags": [],
           "id": "02064FE6-AS23-43FF-BA16-78C21FQS23F",
           "azureTenantId": "00000001-0001-0001-0001-000000000001",
           "activityGroupName": null,
           "assignedTo": "Josh",
           "category": "ransomware",
           "closedDateTime": null,
           "comments": [],
           "confidence": 10,
           "createdDateTime": "2023-05-09T20:21:22Z",
           "description": "The user Charles Fife (charles@M365x594651.onmicrosoft.com)\" performed an impossible travel activity. The user was active from 131.107.159.34 in Washington, US and 31.154.212.66 in Rosh Haayin, Hamerkaz, IL within 55 minutes. Additional risks in this user session: 131.107.159.34 was used for the first time in 268 days by this user. 191d5be7-f855-4d22-b8d0-bdb8ba7ccd7a was accessed for the first time in 268 days by this user.",
           "detectionIds": [],
           "eventDateTime": "2023-05-09T18:30:40Z",
           "feedback": "falsePositive",
           "lastModifiedDateTime": "2023-05-09T20:21:22Z",
           "recommendedActions": [],
           "severity": "low",
           "sourceMaterials": [],
           "status": "inProgress",
           "title": "Ransome Attack",
           "vendorInformation": {
               "provider": "Cloud Application Security",
               "providerVersion": "3.0",
               "subProvider": "",
               "vendor": "Microsoft"
           },
           "cloudAppStates": [],
           "fileStates": [],
           "hostStates": [],
           "malwareStates": [
               {
                   "category": "trojan",
                   "family": "wannacry",
                   "name": "Trojan:Win32/Powessere.H",
                   "severity": "high",
                   "wasRunning": true
               }
           ],
           "networkConnections": [],
           "processes": [],
           "registryKeyStates": [],
           "triggers": [
               {
                   "name": "hostState.privateIpAddress",
                   "type": "String",
                   "value": "101.33.128.0"
               }
           ],
           "userStates": [
               {
                   "aadUserId": null,
                   "accountName": "Charles",
                   "domainName": "M365x584651.onmicrosoft.com",
                   "emailRole": "unknown",
                   "isVpn": null,
                   "logonDateTime": null,
                   "logonId": 1,
                   "logonIp": "101.33.128.0",
                   "logonLocation": "US",
                   "logonType": "batch",
                   "onPremisesSecurityIdentifier": null,
                   "riskScore": "0.5",
                   "userAccountType": "standard",
                   "userPrincipalName": "Charles@M365x584651.onmicrosoft.com"
               }
           ],
           "vulnerabilityStates": []
       }
```

## Sample Query

```sql title="Alerts Count"
_sourceCategory="ms_graph"
|json"id","status","severity","category","feedback","assignedTo","userStates[*]",,"title","description","confidence","malwareStates[*].category" as  alert_id,status,severity,category,feedback,analyst,user_info,title,description,confidence,malware_category nodrop
| where severity matches "{{severity}}"
| where status matches "{{status}}"
| count_distinct(alert_id)
```

## Set up collection

Follow the instructions for setting up the [Cloud-to-Cloud Integration for Microsoft Graph Security](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source/) source and use the same source category while installing the app.

## Installing the Microsoft Graph Security app​

This section has instructions for installing the Microsoft Graph Security app for Sumo Logic.

{@import ../../reuse/apps/app-install.md}

## Viewing Microsoft Graph Security dashboards​​

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

 You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Alerts Overview

The **Microsoft Graph Security - Alerts Overview** dashboard provides a comprehensive overview of events which helps you to analyze security threats and take proactive measures to safeguard your organization. This dashboard features various widgets, including total alerts, high severity alerts, alerts by status, alerts by analyst feedback, alerts by confidence level, alerts by malware category, top analyst, and top alert categories.

The geo-location widget highlights alerts from high-risk countries, making it easier to identify and respond to potential threats from specific locations. The severity and trend widgets provide a detailed overview of the frequency and severity of alerts over time, allowing you to take proactive measures to mitigate risks. The top users associated with the alerts widget helps you pinpoint and address potential security risks related to user behavior efficiently. The recent alerts widget offers a quick snapshot of the latest security activity, ensuring you are always up-to-date on the latest developments.<br/><img src={useBaseUrl('/img/integrations/saas-cloud/Microsoft-Graph-Security-Alerts-Overview.png')} alt="Microsoft-Graph-Security-Alerts-Overview" />

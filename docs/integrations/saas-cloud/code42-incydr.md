---
id: code42-incydr
title: Code42 Incydr
sidebar_label: Code42 Incydr
description: The Code42 Incydr app enables security teams to monitor, detect, and respond to potential data threats across an organization, combining insightful dashboards that cover audits, file events, and user sessions.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/code42-incydr-logo.png')} alt="Thumbnail icon" width="100"/>

The Sumo Logic app for Code42 Incydr helps security teams monitor, detect, and respond to data threats within an organization. It provides dashboards for tracking audits, file events, and user sessions. With features to identify risky file activities and monitor user behavior, it helps prevent data leaks and intellectual property theft. Incydr also offers comprehensive analysis into user actions, risk patterns, and geolocation, giving security professionals the information needed to protect against insider threats and ensure data security and compliance standards.

:::info
This app includes [built-in monitors](#code42-incydr-monitors). For details on creating custom monitors, refer to [Create monitors for Code42 Incydr app](#create-monitors-for-code42-incydr-app).
:::

## Log types

This app uses Sumo Logic’s [Code42 Incydr Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/code42-incydr-source/) to collect audits, file events, and session logs from Code42 Incydr platform.

### Sample log messages

<details>
<summary>Audit Log</summary>

```json
{
    "type$": "audit_log::search_issued/1",
    "actorId": "1004622955308648174",
    "actorName": "partner-demo-environment-admin@code42.com",
    "actorAgent": "Apache-HttpAsyncClient/4.1.4 (Java/11.0.3)",
    "actorIpAddress": "50.93.255.223",
    "timestamp": "2023-06-16T21:49:21.072416Z",
    "actorType": "USER",
    "success": true,
    "type": "query",
    "requestJson": "{\"groups\":[{\"filters\":[{\"term\":\"deviceUserName\",\"operator\":\"IS\",\"value\":\"darnell.waters@c42demo.com\",\"display\":null}],\"filterClause\":\"OR\",\"display\":null},{\"filters\":[{\"term\":\"eventTimestamp\",\"operator\":\"WITHIN_THE_LAST\",\"value\":\"PT15M\",\"display\":null}],\"filterClause\":\"AND\",\"display\":null},{\"filters\":[{\"term\":\"exposure\",\"operator\":\"IS\",\"value\":\"RemovableMedia\",\"display\":null},{\"term\":\"exposure\",\"operator\":\"IS\",\"value\":\"ApplicationRead\",\"display\":null},{\"term\":\"exposure\",\"operator\":\"IS\",\"value\":\"CloudStorage\",\"display\":null}],\"filterClause\":\"OR\",\"display\":null},{\"filters\":[{\"term\":\"md5Checksum\",\"operator\":\"DOES_NOT_EXIST\",\"value\":null,\"display\":null}],\"filterClause\":\"AND\",\"display\":null}],\"groupClause\":\"AND\",\"pgSize\":100,\"pgNum\":1,\"pgToken\":null,\"srtKey\":null,\"srtDir\":\"desc\",\"purpose\":null}",
    "resultCount": 0
}
```
</details>

<details>
<summary>File Event Log</summary>

```json
{
    "@timestamp": "2025-01-28T01:24:03.271Z",
    "event": {
        "id": "001f4927-8958-4b9c-bc75-c0fd29700a49",
        "inserted": "2025-01-28T01:24:24.362976Z",
        "action": "file-modified",
        "observer": "GoogleDrive",
        "detectorDisplayName": "C42Demo Google Drive",
        "shareType": [],
        "ingested": "2025-01-28T01:24:04.208Z",
        "vector": "UNKNOWN"
    },
    "user": {
        "email": "sean.cassidy@c42demo.com",
        "id": "1004441363834186785",
        "deviceUid": null
    },
    "file": {
        "name": "queue.js",
        "originalName": null,
        "directory": null,
        "originalDirectory": null,
        "category": "SourceCode",
        "mimeType": "application/javascript",
        "mimeTypeByBytes": "text/plain",
        "categoryByBytes": "Document",
        "mimeTypeByExtension": "application/javascript",
        "categoryByExtension": "SourceCode",
        "sizeInBytes": 3641,
        "owner": "sean.cassidy@c42demo.com",
        "created": "2022-04-19T17:57:11.136Z",
        "modified": "2025-01-28T01:03:56.903Z",
        "hash": {
            "md5": "3024ad52166b0db6a2b1797a6e9b9f3b",
            "sha256": "144b3bc72834d2c901f214ca6425b76c58dbdbcf2bb9bd1e61633648a7a3a598",
            "md5Error": null,
            "sha256Error": null
        },
        "id": "1PIPbb2PrFIADdi3mzQlCPBMUy0kpqBru",
        "url": "https://drive.google.com/file/d/1PIPbb2PrFIADdi3mzQlCPBMUy0kpqBru/view?usp=drivesdk",
        "directoryId": [
            "1yEL6PL-KYJSLdSdh5ncBwM17067ntB-u"
        ],
        "cloudDriveId": "sean.cassidy@c42demo.com",
        "classifications": [],
        "acquiredFrom": [],
        "changeType": "MODIFIED"
    },
    "report": {
        "id": null,
        "name": null,
        "description": null,
        "headers": [],
        "count": null,
        "type": null
    },
    "source": {
        "category": null,
        "name": null,
        "user": {
            "email": []
        },
        "domain": null,
        "ip": null,
        "privateIp": [],
        "operatingSystem": null,
        "email": {
            "sender": null,
            "from": null
        },
        "removableMedia": {
            "vendor": null,
            "name": null,
            "serialNumber": null,
            "capacity": null,
            "busType": null,
            "mediaName": null,
            "volumeName": [],
            "partitionId": []
        },
        "tabs": [],
        "accountName": null,
        "accountType": null,
        "domains": []
    },
    "destination": {
        "category": null,
        "name": null,
        "user": {
            "email": []
        },
        "ip": null,
        "privateIp": [],
        "operatingSystem": null,
        "printJobName": null,
        "printerName": null,
        "printedFilesBackupPath": null,
        "removableMedia": {
            "vendor": null,
            "name": null,
            "serialNumber": null,
            "capacity": null,
            "busType": null,
            "mediaName": null,
            "volumeName": [],
            "partitionId": []
        },
        "email": {
            "recipients": null,
            "subject": null
        },
        "tabs": [],
        "accountName": null,
        "accountType": null,
        "domains": [],
        "remoteHostname": null
    },
    "process": {
        "executable": null,
        "owner": null
    },
    "risk": {
        "score": 0,
        "severity": "NO_RISK_INDICATED",
        "indicators": [],
        "trusted": false,
        "trustReason": null,
        "untrustedValues": {
            "accountNames": [],
            "domains": [],
            "gitRepositoryUris": [],
            "slackWorkspaces": [],
            "urlPaths": []
        },
        "preventativeControl": null
    },
    "git": {
        "eventId": null,
        "lastCommitHash": null,
        "repositoryUri": null,
        "repositoryUser": null,
        "repositoryEmail": null,
        "repositoryEndpointPath": null
    },
    "responseControls": {
        "preventativeControl": null,
        "userJustification": {
            "reason": null,
            "text": null
        }
    }
}
```
</details>

<details>
<summary>Session Log</summary>

```json
{
    "sessionId": "1004440923549707297_1711129878056",
    "tenantId": "1af25e70-6993-498f-ab78-65c520259d95",
    "actorId": "1004440923549707297",
    "beginTime": 1711129878056,
    "endTime": 1711133446212,
    "firstObserved": 1711130127002,
    "lastUpdated": 1711134024842,
    "noRiskEvents": 241,
    "lowEvents": 0,
    "moderateEvents": 0,
    "highEvents": 0,
    "criticalEvents": 1,
    "notes": [],
    "riskIndicators": [
        {
            "id": "Download to unmonitored device from corporate Salesforce",
            "weight": 6,
            "eventCount": 1,
            "name": "Download to unmonitored device from corporate Salesforce"
        },
        {
            "id": "fileName-260f9635-0605-40fb-9d6b-1a5dde73085b",
            "weight": 3,
            "eventCount": 1,
            "name": "Sensitive Keyword Exfiltration"
        },
        {
            "id": "Flight risk",
            "weight": 3,
            "eventCount": 1,
            "name": "Flight risk"
        },
        {
            "id": "High impact",
            "weight": 1,
            "eventCount": 1,
            "name": "High impact"
        },
        {
            "id": "Spreadsheet",
            "weight": 0,
            "eventCount": 1,
            "name": "Spreadsheet"
        },
        {
            "id": "watchlist-377e1f05-86ee-40b3-bbd1-093cc035d172",
            "weight": 0,
            "eventCount": 1,
            "name": "Enterprise Sales"
        }
    ],
    "scores": [
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711130405673
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711130737347
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711131000346
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711131300264
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711131609219
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711131901523
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711132200768
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711132503399
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711132815102
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711133100885
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711133413799
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711133703988
        },
        {
            "score": 0,
            "severity": 0,
            "sourceTimestamp": 1711134003295
        },
        {
            "score": 13,
            "severity": 4,
            "sourceTimestamp": 1711134301878
        }
    ],
    "triggeredAlerts": [
        {
            "alertId": "28a8451d-143b-4c56-9f14-c3cc38277014",
            "ruleId": "fe130f34-22d3-4687-a628-7069d5b204bd",
            "lessonId": null
        },
        {
            "alertId": "f85bc31a-45c6-452e-80e3-728c9f6f8d74",
            "ruleId": "44d79d69-aeba-47d4-acb3-faad058806ab",
            "lessonId": null
        }
    ],
    "states": [
        {
            "state": "OPEN",
            "sourceTimestamp": 1711130127002,
            "userId": null
        }
    ],
    "exfiltrationSummary": "spreadsheet file(s) downloaded to unmonitored device from corporate Salesforce",
    "contextSummary": "",
    "riskIndicatorsAlertedOn": [],
    "contentInspectionResults": {
        "status": "UNPROCESSED",
        "eventResults": []
    }
}
```
</details>

### Sample queries

```sql title="Total Audits"
_sourceCategory="Labs/Code42Incydr" type$
| json "type$", "actorId", "actorName", "actorAgent", "actorIpAddress", "timestamp", "actorType", "success", "type" as audit_type, actor_id, actor_name, actor_agent,actor_ip_address, timestamp, actor_type, success, search_type nodrop

// global filters
| where audit_type matches "{{audit_type}}"
| where actor_type matches "{{actor_type}}"
| where actor_agent matches "{{actor_agent}}"
| where isNull(success) or success matches "{{success}}"
| where actor_name matches "{{actor_name}}"

// panel specific
| count by timestamp,actor_id
| count
```

```sql title="Total File Events"
_sourceCategory="Labs/Code42Incydr" file
| json "@timestamp","event.id","event.action","event.observer","event.detectorDisplayName","user.email","user.id","file.url","file.name","file.originalName","file.directory","file.category","file.mimeType","file.sizeInBytes","file.owner","source.category","source.operatingSystem","source.ip","destination.ip","risk.score","risk.severity","risk.indicators","user.deviceUid" as timestamp,event_id, event_action, event_observer, event_detector_display_name, user_email, user_id, file_url, file_name, file_original_name, file_directory, file_category,file_mimetype, file_size_in_bytes, file_owner, source_category,source_operating_system,source_ip,destination_ip,risk_score,risk_severity,risk_indicators,device_uid nodrop

// global filters
| where event_action matches "{{event_action}}"
| where event_observer matches "{{event_observer}}"
| where user_email matches "{{user_email}}"
| where file_category matches "{{file_category}}"
| where risk_severity matches "{{risk_severity}}"
| where isNull(source_operating_system) or source_operating_system matches "{{operating_system}}"

// panel specific
| count by event_id
| count
```

```sql title="Total Sessions"
_sourceCategory="Labs/Code42Incydr" !type$ sessionId
| json "sessionId", "actorId","tenantId", "beginTime","endTime", "noRiskEvents", "lowEvents", "moderateEvents", "highEvents", "criticalEvents", "riskIndicators", "triggeredAlerts", "states[0].state","exfiltrationSummary","riskIndicatorsAlertedOn[*].name", "contentInspectionResults.status","riskIndicators[*].name" as session_id, actor_id,tenant_id, begin_epoch,end_epoch, no_risk_events, low_risk_events, moderate_risk_events, high_risk_events, critical_risk_events,risk_indicators,triggered_alerts, state, exfiltration_summary, risk_indicators_alerted_on, content_inspection_results,risk_indicators_names nodrop

// global variables 
| where isNull(tenant_id) or tenant_id matches "{{tenant_id}}"
| where isNull(actor_id) or actor_id matches "{{actor_id}}"
| where isNull(state) or state matches "{{session_state}}"
| where isNull(content_inspection_results) or content_inspection_results matches "{{content_inspection_result}}"

// panel specific
| count by session_id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Code42 Incydr](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/code42-incydr-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Code42 Incydr app is properly integrated and configured to collect and analyze your Code42 Incydr data.
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

## Viewing Code42 Incydr dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Audits Overview

The **Code42 Incydr - Audits Overview** dashboard is a centralized platform that provides a snapshot of auditing activities in your organization. It tracks key metrics like total audits, trends, and success rates over time. It also highlights the most active users in the auditing process and common audit types being performed, offering insights into potential risk areas. The dashboard also segments data by user roles, search queries, and geographical locations, including embargoed areas, to show how information is accessed and monitored. It lists the top auditing tools and provides updates on recent system audits and alerts, keeping stakeholders informed about data security and compliance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Code42-Incydr/Code42+Incydr+-+Audits+Overview.png')} alt="Audits Overview dashboard" />

### File Events

The **Code42 Incydr - File Events** dashboard is a security command center that tracks all file events within the organization, providing detailed metrics on total and severe events, as well as specific user and file activities, enabling identification of potential data breaches and insider threats. The dashboard displays the sources of file events, including OS-specific insights, and highlights geographic risk, particularly from embargoed areas. With real-time data and detection of anomalies in file behavior, security teams can efficiently monitor, analyze, and respond to the dynamic data movement and access.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Code42-Incydr/Code42+Incydr+-+File+Events.png')} alt="File Events dashboard" />

### Sessions

The **Code42 Incydr - Sessions** dashboard offers a real-time view of your organization's session data and associated risk levels, with analytics on total sessions, average engagement, and a spectrum of risk events ranging from low to critical. Dynamic visualizations display session trends, geospatial engagement, and content inspections, helping security teams quickly identify and address potential data exfiltration risks. This dashboard is essential for continuous monitoring and ensuring prompt action on any anomalies or compliance issues to maintain strong data security protocols.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Code42-Incydr/Code42+Incydr+-+Sessions.png')} alt="Sessions dashboard" />

## Create monitors for Code42 Incydr app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Code42 Incydr monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Code42 Incydr - Alert Rules Disabled` | This alert is triggered when alert rules in Code42 Incydr are disabled, potentially reducing visibility into security incidents. This may indicate unauthorized changes or misconfigurations that could impact data security monitoring. | Critical | Count > 0 | 
| `Code42 Incydr - Audits from Embargoed Locations` | This alert is triggered when audit events originating from embargoed or restricted locations are detected, indicating potential compliance violations or unauthorized access attempts. | Critical | Count > 0|
| `Code42 Incydr - File Events from Embargoed Locations` | This alert is triggered when file activity from embargoed locations, such as uploads, downloads, or modifications are identified. This alert helps detect potential data exfiltration or compliance risks. | Critical | Count > 0|
| `Code42 Incydr - Sessions with Critical Risk Events` | This alert flags user sessions associated with high-risk activities, such as large file transfers, unusual login patterns, or interactions with sensitive data, helping security teams respond to potential insider threats or compromised accounts. | Critical | Count > 0|
| `Code42 Incydr - Severe File Events` | This alert is triggered when critical file events occur, such as mass file deletions, sensitive data transfers, or interactions with restricted files. This alert helps prevent data loss and insider threats. | Critical | Count > 0|

## Upgrade/Downgrade the Code42 Incydr app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Code42 Incydr app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

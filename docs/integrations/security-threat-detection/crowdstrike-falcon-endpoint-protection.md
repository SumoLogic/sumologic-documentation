---
id: crowdstrike-falcon-endpoint-protection
title: CrowdStrike Falcon Endpoint Protection
sidebar_label: CrowdStrike Falcon Endpoint Protection
description: The CrowdStrike Falcon Endpoint Protection app provides visibility into the security posture of your endpoints as analyzed by the CrowdStrike Falcon Endpoint Protection platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The CrowdStrike Falcon Endpoint Protection app provides visibility into the security posture of your endpoints as analyzed by the CrowdStrike Falcon Endpoint Protection platform. The app allows you to analyze indicators of compromise (IOCs) by affected users, tactic, technique, and objective, and identify hosts on your network with the highest malware detections. The dashboards in this app help identify threats and incidents, from which you can drill down to investigate further.

The [CrowdStrike Falcon Endpoint Protection Platform](https://www.crowdstrike.com/endpoint-security-products/falcon-platform/) is a cloud-native framework that protects endpoints to stop breaches and improve performance with the robust power of the cloud combined with an intelligent, lightweight endpoint agent.

This version of the CrowdStrike Falcon Endpoint Protection app and its collection process has been tested with SIEM Connector Version 2.1.0+001-siem-release-2.1.0.

## Log types

The CrowdStrike Falcon Endpoint Protection app uses the following log types:
* Detection Event
* Authentication Event
* Detection Status Update Event

For more information on Events, please refer to the CrowdStrike Falcon Endpoint Protection [Streaming API Event Dictionary](https://falcon.crowdstrike.com/support/documentation/62/streaming-api-event-dictionary).

### Sample log messages

For more information on Events, refer to the [Streaming API Event Dictionary](https://falcon.crowdstrike.com/support/documentation/62/streaming-api-event-dictionary).

<details>
<summary>Detection Event</summary>

```json 
{
    "metadata": {
        "customerIDString": “xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "offset": 14947764,
        "eventType": "DetectionSummaryEvent",
        "eventCreationTime": 1536846439000,
        "version": "1.0"
    },
    "event": {
        "ProcessStartTime": 1536846339,
        "ProcessEndTime": 0,
        "ProcessId": 38684386611,
        "ParentProcessId": 38682494050,
        "ComputerName": "CS-SE-EZ64",
        "UserName": "demo",
        "DetectName": "Process Terminated",
        "DetectDescription": "Terminated a process related to the deletion of backups, which is often indicative of ransomware activity.",
        "Severity": 4,
        "SeverityName": "High",
        "FileName": "explorer.exe",
        "FilePath": "\\Device\\HarddiskVolume1\\Windows",
        "CommandLine": "C:\\Windows\\Explorer.EXE",
        "SHA256String": "6a671b92a69755de6fd063fcbe4ba926d83b49f78c42dbaeed8cdb6bbc57576a",
        "MD5String": "ac4c51eb24aa95b77f705ab159189e24",
        "MachineDomain": "CS-SE-EZ64",
        "FalconHostLink": "<a href="https://falcon.crowdstrike.com/activity/detections/detail/ec86abd353824e96765ecbe18eb4f0b4/38655257584?_cid=xxxxxxxxxxxxxxxxxx">https://falcon.crowdstrike.com/activity...xxxxxxxxxxxxxx</a>",
        "SensorId": "ec86abd353824e96765ecbe18eb4f0b4",
        "DetectId": "ldt:ec86abd353824e96765ecbe18eb4f0b4:38655257584",
        "LocalIP": "xx.xx.xx.xx",
        "MACAddress": "xx-xx-xx-xx-xx",
        "Tactic": "Malware",
        "Technique": "Ransomware",
        "Objective": "Falcon Detection Method",
        "PatternDispositionDescription": "Prevention, process killed.",
        "PatternDispositionValue": 16,
        "PatternDispositionFlags": {
            "Indicator": false,
            "Detect": false,
            "InddetMask": false,
            "SensorOnly": false,
            "Rooting": false,
            "KillProcess": true,
            "KillSubProcess": false,
            "QuarantineMachine": false,
            "QuarantineFile": false,
            "PolicyDisabled": false,
            "KillParent": false,
            "OperationBlocked": false,
            "ProcessBlocked": false
        }
    }
}
```

</details>

<details>
<summary>Authentication Event</summary>

```json
{
  "event": {
    "AuditKeyValues": [
      {
        "Key": "target_name",
        "ValueString": "user@example.com"
      }
    ],
    "OperationName": "activateUser",
    "ServiceName": "CrowdStrike Authentication",
    "Success": true,
    "UserId": "user@example.com",
    "UserIp": "192.0.2.100",
    "UTCTimestamp": 1452711518
  },
  "metadata": {
    "customerIDString": "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    "eventType": "AuthActivityAuditEvent",
    "eventCreationTime": 1480375833,
    "offset": 80960
  }
}NOPQRSTUV","eventType":"AuthActivityAuditEvent","eventCreationTime":1480375833,"offset":80960}}
```

</details>

<details>
<summary>Detection Status Update</summary>

```json title="Detection Status Update"
{
    "metadata": {
        "customerIDString": "0123456789ABCDEFGHIJKLMNOPQRSTUV",
        "offset": 11049003,
        "eventType": "UserActivityAuditEvent",
        "eventCreationTime": 1479770848
    },
    "event": {
        "UserId": "user@example.com",
        "UserIp": "",
        "OperationName": "detection_update",
        "ServiceName": "detections",
        "AuditKeyValues": [
            {
                "Key": "detection_id",
                "ValueString": "ldt:b60f82cf1aa342f47363bf3b6bfb6b7d:123456356541"
            },
            {
                "Key": "new_state",
                "ValueString": "in_progress"
            },
            {
                "Key": "assigned_to",
                "ValueString": "Knightley"
            },
            {
                "Key": "assigned_to_uid",
                "ValueString": "user@example.com"
            }
        ],
        "UTCTimestamp": 1479770848
    }
}
```
</details>

### Sample queries

This section provides query examples for each event type.

```sql title="Detection Event"
_sourceCategory=*Crowdstrike*  DetectionSummaryEvent
| json "metadata.eventType", "metadata.customerIDString", "metadata.eventCreationTime" as event_type, customer_id, event_time
| formatDate(fromMillis(event_time), "MM/dd/yyyy HH:mm:ss:SSS") as event_time
| where event_type="DetectionSummaryEvent"
| json "event.Tactic","event.Technique", "event.Objective", "event.ComputerName", "event.UserName", "event.DetectId", "event.DetectDescription", "event.Severity", "event.SeverityName", "event.FileName", "event.FilePath", "event.CommandLine", "event.MD5String", "event.SHA1String", "event.MachineDomain" , "event.FalconHostLink", "event.IOCType", "event.IOCValue", "event.LocalIP", "event.MACAddress" as tactic, technique, objective, computer_name, user_name, detect_id, detect_desc, severity, severity_name, file_name, file_path, cmd_line, md5_string, sha1_string, machine_domain, falconHost_link, IOC_Ttype, IOC_value, local_ip, mac_address
| timeslice 1d
| count_distinct (detect_id) by _timeslice, severity_name
| fillmissing timeslice(1d)
| transpose row _timeslice column severity_name
```

```sql title="Authentication Event"
_sourceCategory=*Crowdstrike*  AuthActivityAuditEvent (userAuthenticate or twoFactorAuthenticate)
| json "metadata.eventType", "metadata.customerIDString", "metadata.eventCreationTime" as event_type, customer_id, event_time
| formatDate(fromMillis(event_time), "MM/dd/yyyy HH:mm:ss:SSS") as event_time
| json "event.UserId", "event.UserIp", "event.OperationName", "event.ServiceName", "event.Success", "event.UTCTimestamp" as src_user, user_ip, operation_name, service_name, success, operation_time
| formatDate(fromMillis(operation_time), "MM/dd/yyyy HH:mm:ss:SSS") as operation_time
| where success="true"
| count by operation_time, operation_name, src_user, user_ip
```

```sql title="Detection Status Update"
_sourceCategory=*Crowdstrike*  UserActivityAuditEvent
| json "metadata.eventType", "metadata.customerIDString", "metadata.eventCreationTime" as event_type, customer_id, event_time
| formatDate(fromMillis(event_time), "MM/dd/yyyy HH:mm:ss:SSS") as event_time
| where event_type="UserActivityAuditEvent"
| json "event.OperationName",  "event.UserId", "event.UserIp", "event.ServiceName", "event.AuditKeyValues" as operation_name, user_id, src_user, service_name, audit_values
| count by operation_name
| sort by _count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for CrowdStrike](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your CrowdStrike app is properly integrated and configured to collect and analyze your CrowdStrike data.
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

## Viewing CrowdStrike Falcon Endpoint Protection dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview  

The **CrowdStrike Falcon - Overview** dashboard provides high-level visibility into the state of endpoints that are managed by the CrowdStrike Falcon platform. Panels provide insights into events, detections, authentications, and detection status updates for overall security posture and analysis of user activities.

Use this dashboard to:

* Understand the overall security posture of your environment as analyzed by CrowdStrike Falcon deployed in your network.
* Analyze user activities within the Falcon Console.
* Review all detection updates.

<img src={useBaseUrl('img/integrations/security-threat-detection/CSF_Platform_Overview.png')} alt="CrowdStrike_Falcon_Endpoint_Protection dashboards" />

### Authentication

The **CrowdStrike Falcon - Authentication** dashboard provides visibility into authentication-related user activities and their geographic locations. Panels also display detailed information for authentication comparisons and trends, requested auth secrets, 2-factor authentication, API client events, and failed events.  

Use this dashboard to:
* Analyze user activities within your Falcon Console and the geographic location of the users responsible for these activities.
* Identify failed authentication events, user logins with and without 2-factor authentication.
* Detect OAuth2 API key access events.

<img src={useBaseUrl('img/integrations/security-threat-detection/CSF_Platform_Authentication.png')} alt="CrowdStrike_Falcon_Endpoint_Protection dashboards" />


### Detections  

The **CrowdStrike Falcon - Detections** dashboard provides visibility into malicious behavior in your environment, where you can analyze group detections, discover blocked detections, and analyze detection trends by type. Panels also display a detailed analysis of detected malware and help quickly identify hosts with the most detected malware.

Use this dashboard to:

* Investigate malicious behavior across your endpoints.
* Analyze group detections by users, tactic, technique, and objective.
* Discover trending IOCs in your network.
* Identify malicious attempts that were blocked by CrowdStrike Falcon.
* Review detailed analysis of malware detected in the Detection Summary panel.
* Find hosts in your network with the most detected malware. Use pre-built links to go to the Falcon Console, so as to assign detection events and take action.


<img src={useBaseUrl('img/integrations/security-threat-detection/CrowdStrike_Falcon_Detections.png')} alt="CrowdStrike_Falcon_Endpoint_Protection dashboards" />


### Detection Status Update  

The **CrowdStrike Falcon - Detection Status Update** dashboard provides high-level and detailed insights into the status of severity event detection in your CrowdStrike environment. Panels display event geographic locations, event classification by operation, details on quarantined files, and updates on policies and groups.

Use this dashboard to:

* Find and analyze any updates to malware detections by CrowdStrike Falcon users.
* Identify quarantined files.

<img src={useBaseUrl('img/integrations/security-threat-detection/CSF_Platform_Detection_Status_Update.png')} alt="CrowdStrike_Falcon_Endpoint_Protection dashboards" />

### Incident Summary Events
30

The **CrowdStrike - Falcon - Incident Summary Events** dashboard provides visibility into Falcon incidents, event trends, and risk.

Use this dashboard to:

* Get an overview of incidents created and their risk.
* Identify unexpected events related to incidents by examining trends.
* Drill-down to the details of an incident using pre-built links in the CrowdStrike Falcon Console.

<img src={useBaseUrl('img/integrations/security-threat-detection/CrowdStrike_Falcon_Incident_Summary_Events.png')} alt="CrowdStrike_Falcon_Endpoint_Protection dashboards" />

## Upgrade/Downgrade the CrowdStrike Falcon Endpoint Protection app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the CrowdStrike Falcon Endpoint Protection app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

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
        "eventType": "EppDetectionSummaryEvent",
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
        "Name": "Process Terminated",
        "Description": "Terminated a process related to the deletion of backups, which is often indicative of ransomware activity.",
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
        "CompositeId": "ldt:ec86abd353824e96765ecbe18eb4f0b4:38655257584",
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
}
```

</details>

<details>
<summary>User Activity and Audit Event</summary>

```json
{
    "metadata": {
        "customerIDString": "d43fe8bddfb848b18b4da90d58681c07",
        "offset": 1680712,
        "eventType": "UserActivityAuditEvent",
        "eventCreationTime": 1766724718104,
        "version": "1.0"
    },
    "event": {
        "UserId": "tim.sullivan@cxe.com",
        "UserIp": "70.106.217.160",
        "OperationName": "update_group",
        "ServiceName": "groups",
        "AuditKeyValues": [
            {
                "Key": "group_id",
                "ValueString": "56af7a44a7fc4ca5869c76b197af327b"
            },
            {
                "Key": "action_name",
                "ValueString": "add_group_member"
            }
        ],
        "UTCTimestamp": 1766724718104
    }
}
```
</details>

<details>
<summary>Incident Summary Event</summary>

```json
{
    "metadata": {
        "customerIDString": "b2848e6c8ac249d68d9a93a859a211c9",
        "offset": 101,
        "eventType": "IncidentSummaryEvent",
        "eventCreationTime": 1766724888084,
        "version": "1.0"
    },
    "event": {
        "FineScore": 10,
        "LateralMovement": 0,
        "IncidentStartTime": 1766724888,
        "IncidentEndTime": 1766724888,
        "FalconHostLink": "https://falcon.crowdstrike.com/crowdscore/incidents/details/inc:108f5b7f5ai940438c81f5q7f423855b:1bf0d2jk7dd04d979aaswa37860528b8",
        "State": "closed"
    }
}
```
</details>

### Sample queries

This section provides query examples for each event type.

```sql title="Detection Event"
_sourceCategory={{Logsdatasource}}  eventType EppDetectionSummaryEvent event SeverityName
| json "metadata.eventType", "metadata.customerIDString", "metadata.eventCreationTime", "event.Tactic","event.Technique", "event.Objective", "event.ComputerName", "event.UserName", "event.CompositeId", "event.Description", "event.Severity", "event.SeverityName", "event.FileName", "event.FilePath", "event.CommandLine", "event.MD5String", "event.SHA256String", "event.MachineDomain" , "event.FalconHostLink","event.LocalIP", "event.MACAddress", "event.ProcessEndTime" as event_type, customer_id, event_time, tactic, technique, objective, computer_name, user_name, composite_id, detect_desc, severity, severity_name, file_name, file_path, cmd_line, md5_string, sha256_string, machine_domain, falconHost_link, local_ip, mac_adderess, process_endTIme nodrop

// global filters
| where (isNull(tactic) or tactic matches "{{tactic}}") and (isNull(technique) or technique matches "{{technique}}") and (isNull(objective) or objective matches "{{objective}}") and (isNull(computer_name) or computer_name matches "{{computer_name}}") and (isNull(user_name) or user_name matches "{{user_name}}") and (isNull(customer_id) or customer_id matches "{{customer_id}}") and (isNull(machine_domain) or machine_domain matches "{{machine_domain}}") and (isNull(severity_name) or severity_name matches "{{severity_name}}")

| where event_type matches "EppDetectionSummaryEvent"
| count by severity_name
| sort by _count, severity_name
```

```sql title="Authentication Event"
_sourceCategory={{Logsdatasource}} eventType AuthActivityAuditEvent event OperationName
| json "metadata.eventType", "metadata.customerIDString", "metadata.eventCreationTime", "event.UserId", "event.UserIp", "event.OperationName", "event.ServiceName", "event.Success", "event.UTCTimestamp" as event_type, customer_id, event_time, src_user, user_ip, operation_name, service_name, success, operation_time nodrop

//global filters
| where src_user matches "{{src_user}}" and operation_name matches "{{operation_name}}" and success matches "{{success}}"

| where event_type matches "AuthActivityAuditEvent"
| count by operation_name 
| sort by _count, operation_name
```

```sql title="Detection Status Update"
_sourceCategory={{Logsdatasource}} eventType UserActivityAuditEvent event OperationName quarantined_file_update
| json "metadata.eventType", "metadata.customerIDString", "metadata.eventCreationTime", "event.OperationName",  "event.UserId", "event.UserIp", "event.ServiceName", "event.AuditKeyValues" as event_type, customer_id, event_time, operation_name, src_user, user_ip, service_name, audit_values nodrop

// global filters
| where src_user matches "{{src_user}}" and operation_name matches "{{operation_name}}" and event_type matches "{{event_type}}" and service_name matches "{{service_name}}" and customer_id matches "{{customer_id}}"

| where event_type matches "UserActivityAuditEvent" and operation_name matches "quarantined_file_update"  
| count
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

### Security Overview  

The **CrowdStrike Falcon - Security Overview** dashboard provides high-level visibility into the state of endpoints that are managed by the CrowdStrike Falcon platform. Panels provide insights into events, detections, authentications, and detection status updates for overall security posture and analysis of user activities.

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


### Threat Detections  

The **CrowdStrike Falcon - Threat Detections** dashboard provides visibility into malicious behavior in your environment, where you can analyze group detections, discover blocked detections, and analyze detection trends by type. Panels also display a detailed analysis of detected malware and help quickly identify hosts with the most detected malware.

Use this dashboard to:

* Investigate malicious behavior across your endpoints.
* Analyze group detections by users, tactic, technique, and objective.
* Discover trending IOCs in your network.
* Identify malicious attempts that were blocked by CrowdStrike Falcon.
* Review detailed analysis of malware detected in the Detection Summary panel.
* Find hosts in your network with the most detected malware. Use pre-built links to go to the Falcon Console, so as to assign detection events and take action.


<img src={useBaseUrl('img/integrations/security-threat-detection/CrowdStrike_Falcon_Detections.png')} alt="CrowdStrike_Falcon_Endpoint_Protection dashboards" />


### User Activity and Audit

The **CrowdStrike Falcon - User Activity and Audit** dashboard provides high-level and detailed insights into the status of severity event detection in your CrowdStrike environment. Panels display event geographic locations, event classification by operation, details on quarantined files, and updates on policies and groups.

Use this dashboard to:

* Find and analyze any updates to malware detections by CrowdStrike Falcon users.
* Identify quarantined files.

<img src={useBaseUrl('img/integrations/security-threat-detection/CSF_Platform_Detection_Status_Update.png')} alt="CrowdStrike_Falcon_Endpoint_Protection dashboards" />

### Incident Summary Events

The **CrowdStrike Falcon - Incident Summary Events** dashboard provides visibility into Falcon incidents, event trends, and risk.

Use this dashboard to:

* Get an overview of incidents created and their risk.
* Identify unexpected events related to incidents by examining trends.
* Drill-down to the details of an incident using pre-built links in the CrowdStrike Falcon Console.

<img src={useBaseUrl('img/integrations/security-threat-detection/CrowdStrike_Falcon_Incident_Summary_Events.png')} alt="CrowdStrike_Falcon_Endpoint_Protection dashboards" />

## Create monitors for Crowdstrike Falcon Endpoint Protection app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Crowdstrike Falcon Endpoint Protection monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `CrowdStrike Falcon Endpoint Protection - Successful Authentication Events from Embargoed Geo Locations` | This alert is triggered when event authentication successful and it is originating from sanctioned or embargoed regions are detected. This alert helps maintain adherence to legal and regulatory standards. | Critical | Count > 0 |
| `CrowdStrike Falcon Endpoint Protection - Failed Authentication Events from Embargoed Geo Locations` | This alert is triggered when event authentication fail and it is originating from sanctioned or embargoed regions are detected. This alert helps maintain adherence to legal and regulatory standards. | Critical | Count > 0 |
| `CrowdStrike Falcon Endpoint Protection - High Severity Alerts` | This alert is triggered when client-side protection detects an event with high severity. It indicates a high-impact threat that requires immediate investigation and remediation to prevent potential exploitation or data compromise. | Critical | Count > 3 |
| `CrowdStrike Falcon Endpoint Protection - Multiple Failed Authentications from Specific User` | This alert is triggered when client-side protection detects more than three failed authentication from single user in  short period of time. | Critical | Count > 0 |
| `CrowdStrike Falcon Endpoint Protection - Multiple High Severity Detections from Single Host` | This alert is triggered when client-side protection detects more than 3 high or critical severity from single host in short period of time. | Critical | Count > 0 |

## Upgrade/Downgrade the CrowdStrike Falcon Endpoint Protection app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the CrowdStrike Falcon Endpoint Protection app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

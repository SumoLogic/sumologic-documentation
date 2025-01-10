---
id: symantec-endpoint-security-service
title: Symantec Endpoint Security Service
sidebar_label: Symantec Endpoint Security Service
description: The Sumo Logic app for Symantec Web Security provides real-time insights into the log data by leveraging the Symantec Endpoint Security Service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/symantec-logo.svg')} alt="icon" width="125"/>

Symantec Endpoint Security safeguards organizations from various network threats and risks. The Sumo Logic app for Symantec Endpoint Security provides visibility into log data by using the Symantec Endpoint Security Service. This service collects and forwards the Symantec Endpoint Security data to Sumo Logic for analysis, offering a comprehensive view of the endpoint security statuses through various widgets. These widgets present essential information, including the number of incidents categorised by type, impacted hosts, malicious files, threat details, and critical or high-severity incidents. The dashboard also highlights potential security vulnerabilities, such as the top 10 affected hosts, IP addresses, and malicious files. This allows administrators to monitor and manage endpoint security in real time, enhancing quick responses to threats.
By utilizing the Symantec Endpoint Security Service, organizations can protect their employees' endpoints and enhance their defenses against emerging threats.

## Log types

This app uses [Symantec Endpoint Security Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/symantec-endpoint-security-source/) to collect Incidents and Event Logs from Symantec Endpoint Security.

## Sample log message

<details>
<summary>Incident Log</summary>
```json
 {
    "customer_uid": "TEST-JvOsaJktSS-eyL-dXhxOvA",
    "incident_uid": "afb07d00-89dd-4813-8e1e-3ed5fa83444d",
    "type": "INCIDENT_UPDATE",
    "conclusion": "Suspicious Activity",
    "remediation": "Change the credentials for accounts which have accessed this endpoint. Employ software whitelisting tools to prevent unauthorized access to the LSASS process and the Windows Registry Security Accounts Manager. Mandate that administrator accounts have unique passwords per system to limit the exposure caused by the theft of credentials. Similarly, avoid the inclusion of user or domain accounts in local administrator groups to limit exposure due to credential theft associated with such accounts.",
    "priority_id": 4,
    "category_id": 1,
    "modified": "2023-04-26T23:38:48.634+00:00",
    "state_id": 1,
    "id": 4,
    "product_uid": "31B0C880-0229-49E8-94C5-48D56B1BD7B9",
    "device_time": 1682552328634,
    "ref_incident_uid": 102106,
    "rule_name": "Advanced Attack Technique",
    "created": "2023-04-26T15:44:19.345+00:00",
    "type_id": 8076,
    "incident_url": "https://sep.securitycloud.symantec.com/v2/incidents/incidentListing/afb07d00-89dd-4813-8e1e-3ed5fa83444d/details",
    "message": "OS Credential Dumping",
    "version": "1.0",
    "product_name": "Symantec Integrated Cyber Defense Manager",
    "event_id": 80760004,
    "domain_uid": "TEST-ZBg_IqnyTAijNjP2BOOcuw",
    "detection_type": "Advanced Analytics",
    "severity_id": 4,
    "time": 1682552328634,
    "suspected_breach": "Yes"
}
```
</details>

<details>
<summary>Event Log</summary>
```json
{
    "customer_uid": "TEST-JvOsaJktSS-eyL-dXhxOvA",
    "incident_uid": "6af35ed1-ee4a-463a-a40d-dde000dead84",
    "type": "INCIDENT_CREATION",
    "conclusion": "Malicious File",
    "remediation": "You can isolate the endpoint(s), remove the file(s) and/or clean the system(s).",
    "priority_id": 4,
    "category_id": 1,
    "modified": "2023-04-26T21:01:13.426+00:00",
    "state_id": 1,
    "id": 4,
    "product_uid": "31B0C880-0229-49E8-94C5-48D56B1BD7B9",
    "events": [
                {
                    "type_id": 8031,
                    "type": "sandbox_file_detection",
                    "id": 14,
                    "message": "Sandbox result for the 'Chrome.exe' file is malicious.",
                    "user_name": "SYSTEM",
                    "device_uid": "KLXOjk4ET-CeJZBA3iipkw",
                    "device_name": "Victim-1",
                    "device_time": "2023-04-26T21:01:09.003Z",
                    "severity_id": 5,
                    "category_id": 1,
                    "feature_uid": "3F3DC574-02A7-11E9-8EB2-F2801F1B9FD1",
                    "product_uid": "E3A8F790-52A2-4BE3-87D7-93698CDDD021",
                    "status_detail": "File is malicious",
                    "command_uid": "365f1e54-8cb6-4d6c-9478-078e456709e3",
                    "status_id": 1,
                    "device_ip": "172.28.53.29",
                    "device_os_name": "Windows 10 Professional Edition",
                    "device_domain": "evilcorp.com",
                    "product_ver": "14.3.9513.7000",
                    "customer_uid": "TEST-JvOsaJktSS-eyL-dXhxOvA",
                    "domain_uid": "TEST-ZBg_IqnyTAijNjP2BOOcuw",
                    "ref_uid": "2e080e9a-791f-33fd-90b7-de575f267025",
                    "threat": {
                                "provider": "Cynic",
                                "type_id": 5,
                                "name": "Threat Detected By Cynic",
                                "risk_id": 100,
                                "id": 0
                              },
                    "file":   {
                                "path": "C:\\Users\\edradmin\\Desktop\\Chrome.exe",
                                "name": "Chrome.exe",
                                "sha2": "39fff7c11c59ce946cfec471d99baaa832266a07ab6f30cd123e385ca9436efa"
                              },
                    "version": "1.0",
                    "product_name": "Symantec Endpoint Detection and Response",
                    "feature_name": "Endpoint Detection and Response",
                    "feature_ver": "1.0",
                    "edr_event_data_type": "malicious",
                    "event_data_type": "sep",
                    "user":   {
                                "name": "SYSTEM"
                              },
                    "time": "2023-04-26T21:01:09.003Z",
                    "timezone": 0,
                    "log_time": "2023-04-26T21:01:11.285Z",
                    "uuid": "8031:77c48db0-e475-11ed-d50e-0000633d5a56",
                    "log_name": "event_service_6_t2_2023-04-26"
                }
              ],
    "device_time": 1682542873426,
    "ref_incident_uid": 102108,
    "rule_name": "Critical Cynic Detections",
    "created": "2023-04-26T21:01:13.426+00:00",
    "type_id": 8075,
    "incident_url": "https://sep.securitycloud.symantec.com/v2/incidents/incidentListing/6af35ed1-ee4a-463a-a40d-dde000dead84/details",
    "message": "Sandbox detection: Chrome.exe",
    "version": "1.0",
    "product_name": "Symantec Integrated Cyber Defense Manager",
    "event_id": 80750004,
    "domain_uid": "TEST-ZBg_IqnyTAijNjP2BOOcuw",
    "detection_type": "Sandbox",
    "severity_id": 5,
    "time": 1682542873426,
    "suspected_breach": "No"
}
```
</details>

## Sample queries

```sql title="Incidents by Severity"
_sourceCategory="Labs/SES" !device_uid
| json "incident_uid", "type", "severity_id", "priority_id", "category_id", "conclusion", "detection_type", "state_id", "suspected_breach", "created", "modified", "message", "incident_url", "rule_name", "product_name", "remediation" as incident_uid, type, severity, priority, category, conclusion, detection_type, state, suspected_breach, created_timestamp, modified_timestamp, message, incident_url, rule_name, product_name, remediation nodrop

| if (severity in ("1", "2", "6") , "Reserved", if (severity matches "3", "Minor", if (severity matches "4", "Major", if (severity matches "5", "Critical", "Other")))) as severity
| if (category matches "1", "Security", "Other") as category
| if (state matches "0" , "Unknown", if (state matches "1", "New", if (state matches "2", "In Progress", if (state matches "3", "On Hold", if (state matches "4", "Resolved", if (state matches "5", "Closed", "Other")))))) as state

// global filters
| where severity matches "{{severity}}"
| where category matches "{{category}}"
| where type matches "{{type}}"
| where state matches "{{state}}"
| where conclusion matches "{{conclusion}}"

| count by incident_uid, severity
| count by severity
| sort by _count, severity
```

```sql title="Incidents Over Time"
_sourceCategory="Labs/SES" !device_uid
| json "incident_uid", "type", "severity_id", "priority_id", "category_id", "conclusion", "detection_type", "state_id", "suspected_breach", "created", "modified", "message", "incident_url", "rule_name", "product_name", "remediation" as incident_uid, type, severity, priority, category, conclusion, detection_type, state, suspected_breach, created_timestamp, modified_timestamp, message, incident_url, rule_name, product_name, remediation nodrop

| if (severity in ("1", "2", "6") , "Reserved", if (severity matches "3", "Minor", if (severity matches "4", "Major", if (severity matches "5", "Critical", "Other")))) as severity
| if (category matches "1", "Security", "Other") as category
| if (state matches "0" , "Unknown", if (state matches "1", "New", if (state matches "2", "In Progress", if (state matches "3", "On Hold", if (state matches "4", "Resolved", if (state matches "5", "Closed", "Other")))))) as state

// global filters
| where severity matches "{{severity}}"
| where category matches "{{category}}"
| where type matches "{{type}}"
| where state matches "{{state}}"
| where conclusion matches "{{conclusion}}"

| timeslice 1d
| count by incident_uid, state, _timeslice
| count as frequency by _timeslice, state
| fillmissing timeslice, values all in state
| transpose row _timeslice column state
```

```sql title="Top 10 Devices by Events"
_sourceCategory="Labs/SES" device_uid
| json "events", "incident_uid", "type", "conclusion", "rule_name", "message", "suspected_breach", "detection_type", "product_name", "incident_url" as events, incident_uid, incident_type, incident_conclusion, incident_rule_name, incident_message, suspected_breach, detection_type, incident_product_name, incident_url
| parse regex field=events "(?<event>\{(?:[^\{\}]|\{[^\{\}]*\})*\})" multi 
| json field=event "uuid", "severity_id", "category_id", "type", "edr_event_data_type", "device_name", "user_name", "file.name", "file.path", "file.sha2", "device_uid", "device_ip", "device_os_name", "device_domain", "threat.id", "threat.type_id", "threat.name", "threat.risk_id", "threat.provider", "message", "type_id", "status_detail", "product_name", "feature_name" as uuid, severity, category, type, edr_event_type, device_name, user_name, file_name, file_path, file_sha2, device_uid, device_ip, device_os_name, device_domain, threat_id, threat_type_id, threat_name, threat_risk_id, threat_provider, message, type_id, status_detail, product_name, feature_name nodrop

| if (severity in ("1", "2", "6") , "Reserved", if (severity matches "3", "Minor", if (severity matches "4", "Major", if (severity matches "5", "Critical", "Other")))) as severity
| if (category matches "1", "Security", "Other") as category

// global filters
| where severity matches "{{severity}}"
| where category matches "{{category}}"
| where type matches "{{type}}"
| where user_name matches "{{user_name}}"
| where device_name matches "{{device_name}}"

| where !isBlank(device_name)
| count by device_name, uuid
| count as frequency by device_name
| sort by frequency, device_name
| limit 10
```

## Set up collection

To set up the [Cloud-to-Cloud Integration for Symantec Endpoint Security Service Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/symantec-endpoint-security-source/), follow the instructions provided. These instructions will guide you through the process of creating a source using the Symantec Endpoint Security Service Source category, which you will need to use when installing the app. By following these steps, you can ensure that your Symantec Endpoint Security Service app is properly integrated and configured to collect and analyze your Symantec Endpoint Security Service data.

## Installing the Symantec Endpoint Security Service app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing the Symantec Endpoint Security Service dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Incidents Overview

The **Symantec Endpoint Security Service - Incidents Overview** dashboard provides a detailed view of endpoint incidents through various widgets. These widgets display data such as the total number of incidents, total count of open incidents, high severity incidents, high priority incidents, cynic detection, newly identified incidents, unknown incidents, incidents distribution by event type, severity, category, conclusion, detection type, state, priority, and suspected breach. Additionally, it includes incident resolution rates, incidents over time, average resolution time of incidents, sandbox detections over time, summaries of all incidents, unresolved incidents, and remediation specifics. This enables administrators to monitor and manage endpoint security effectively in real time, promptly identifying and addressing potential incidents.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Symantec+Endpoint+Security+Service/Symantec-Endpoint-Security-Incidents-Overview.png')} alt="Symantec-Endpoint-Security-Service-Incidents-Overview" width="800"/>

### Events Overview

The **Symantec Endpoint Security Service - Events Overview** The "Symantec Endpoint Security - Events Overview" dashboard provides a comprehensive view of endpoint security status through various widgets. These widgets display key data such as the total number of events, high severity events, suspicious files, event distribution based on severity, category, event type, EDR event type, affected endpoints, top users linked to events, top malicious files, top SHA256 of files, top affected IPs, events over time, sandbox file detection events over time, and summaries of malicious files, events, hosts, threats, and incidents with the device. The dashboard also includes information on geographic locations of affected endpoints, and helps administrators monitor, manage, and respond to security threats in real time. This enables businesses to secure endpoints and defend against a wide range of threats.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Symantec+Endpoint+Security+Service/Symantec-Endpoint-Security-Events-Overview.png')} alt="Symantec-Endpoint-Security-Service-Events-Overview" width="800"/>

## Create monitors for Symantec Endpoint Security app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Symantec Endpoint Security monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Embargoed Device` | This alert is triggered when a device is associated with multiple incidents. It helps you to monitor and stop potentially harmful devices, enhancing your ability to identify suspicious activity. | Critical | Count > 0 |
| `File Execution in Suspicious Path` | This alert is triggered when some file activity happens from the suspicious file path. It helps you to monitor activity from unusual or suspicious file paths, enhancing your ability to identify suspicious activity. | Critical | Count > 0 |
| `High Priority or Severity Incidents Detected` | This alert is triggered when an incident is created with high priority or severity. It helps you to monitor and stop potentially harmful events that could compromise endpoint security. | Critical | Count > 0 |
| `High-Risk Threat Detected by Cynic` | This alert is triggered when a high-risk threat is detected by the cynic. It allows you to quickly identify endpoints with a high concentration of threat activity, enabling swift action to contain and remediate potential infections. | Critical | Count > 0 |
| `Hight-Severity Malicious File Detected` | This alert is triggered when a known malicious file with high severity is detected running on a device. It helps you to monitor and stop potentially harmful files that could compromise device security and network integrity. | Critical | Count > 0 |
| `Incidents Detected from Embargoed Locations` | This alert triggers when an incident is detected from a location identified as high-risk. This helps you to monitor incidents from unusual or restricted geographic locations, enhancing your ability to identify suspicious activity. | Critical | Count > 0 |
| `Sandbox Malicious File Detected` | This alert is triggered when a known malicious file is detected by the sandbox. It helps you to monitor and stop potentially harmful files that could compromise device security and network integrity. | Critical | Count > 0 |
| `Spike in Impacted Devices Count` | This alert is triggered when a spike is detected in the number of impacted devices. It helps you to monitor and stop potentially harmful devices, enhancing your ability to identify suspicious activity. | Critical | Count > 0 |
| `Unresolved Incident Aging Beyond 7 days` | This alert is triggered when an incident is created and remains unresolved for 7 days. It helps you to monitor pending incidents for an extended period, enhancing your ability to identify suspicious activity. | Critical | Count > 0 |

## Upgrade/Downgrade the Symantec Endpoint Security Service app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Symantec Endpoint Security Service app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
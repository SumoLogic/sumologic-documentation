---
id: zero-networks-segment
title: Zero Networks Segment
sidebar_label:  Zero Networks Segment
description: The Zero Networks Segment app for Sumo Logic provides deep visibility into network activity and segmentation policies, helping security teams detect anomalies, assess risk, and validate zero‑trust enforcement to strengthen overall network security.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/zero-networks-icon.png')} alt="zero-networks-icon" width="40" />

The Zero Networks Segment app provides unified visibility into network activity, policy actions, and user behavior across your environment. By combining telemetry from connections, enforcement events, and configuration changes, it enables a clear understanding of how assets, users, and applications interact within a zero trust framework.

The app surfaces key metrics such as top devices, active users, protocols, ports, and traffic types to reveal operational patterns and dependencies. Risk oriented insights highlight high-threat destinations, unsafe processes, and connection outcomes, helping teams quickly identify and contain potential exposures. Governance information tracks who created rules, when MFA was applied, and how enforcement sources contributed to changes.

Together, these views deliver real time awareness of network usage and security posture, enabling organizations to validate segmentation policies, reduce attack surfaces, and sustain a trusted, well-monitored network environment.

:::info
This app includes [built-in monitors](#zero-networks-segment-alerts). For details on creating custom monitors, refer to [Create monitors for Zero Networks Segment app](#create-monitors-for-the-zero-networks-segment-app).
:::

## Log types

This app uses Sumo Logic’s [Zero Networks Segment Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/zero-networks-segment-source) to collect Audit logs and Network Activity logs from the Zero Networks Segment platform.

## Sample log message

<details>
<summary>Audit Log</summary>

```json
{
    "timestamp": 1764075603256,
    "isoTimestamp": "2025-11-25T18:30:03.256Z",
    "auditType": 9,
    "enforcementSource": 6,
    "userRole": 4,
    "destinationEntitiesList": [
        {
            "id": "b:110002",
            "name": "All protected assets"
        }
    ],
    "details": "{\"rule\":{\"localEntityNames\":{\"id\":\"b:110002\",\"name\":\"All protected assets\"},\"remoteEntityNames\":[{\"id\":\"b:110001\",\"name\":\"Any asset\"}],\"ports\":[{\"protocol_type\":6,\"ports\":\"62246\"}],\"expiration\":1764075603256,\"description\":\"\",\"localProcesses\":[\"*\"],\"created_by\":{\"id\":\"m:13c49a4eb4fa90bbb948b6c8de5175ad2d36cfbc\",\"name\":\"ModuleTesting\"},\"enforcementSource\":6,\"createdAt\":1764075603256,\"usedMfaMethod\":0,\"excludedLocalEntityNames\":[],\"state\":1,\"updatedAt\":1764075603256,\"updatedBy\":{},\"approvedAt\":0,\"approvedBy\":{},\"ruleClass\":2}}",
    "reportedObjectId": "a3864c59-e263-4d12-a73e-595cf2103f6c",
    "reportedObjectGeneration": 129335988,
    "performedBy": {
        "id": "m:13c49a4eb4fa90bbb948b6c8de5175ad2d36cfbc",
        "name": "ModuleTesting"
    }
}
```
</details>

<details>
<summary>Network Activity Log</summary>

```json
{
    "timestamp": 1764075429582,
    "protocol": 17,
    "state": 3,
    "trafficType": 3,
    "dst": {
        "assetId": "b:X1003",
        "fqdn": "time.windows.com",
        "ip": "193.124.185.120",
        "port": 123,
        "processName": "",
        "processPath": "",
        "ipThreatScore": 0
    },
    "src": {
        "assetId": "a:d:SRV-TIME01",
        "assetSrc": 1,
        "networkProtectionState": 1,
        "assetType": 2,
        "eventRecordId": 600013,
        "fqdn": "NTP-Sync01",
        "ip": "193.124.185.120",
        "port": 54312,
        "processId": 412,
        "processName": "svchost.exe (412)",
        "processPath": "C:\\Windows\\System32\\svchost.exe (412)",
        "userId": "S-1-5-18",
        "userName": "NT AUTHORITY\\SYSTEM",
        "user": {
            "sid": "S-1-5-18",
            "name": "NT AUTHORITY\\SYSTEM"
        },
        "ipThreatScore": 0
    },
    "inboundRuleMatches": [],
    "outboundRuleMatches": [],
    "reason": 6,
    "ipSpace": 0
}
```
</details>

## Sample queries

```sql title="Total Audit Logs"
_sourceCategory="zero-networks-app" auditType
| json "auditType", "details", "timestamp", "reportedObjectId", "performedBy.name", "performedBy.id", "destinationEntitiesList[*]", "enforcementSource", "userRole", "isoTimestamp" as audit_type, details, timestamp, reported_object_id, actor, actor_id, destination_entities_list, enforcement_source, user_role, iso_timestamp nodrop

| where audit_type matches "*"
| where enforcement_source matches "*"
| where user_role matches "*"

| count by audit_type, details, timestamp, reported_object_id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Zero Networks Segment Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/zero-networks-segment-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Zero Networks Segment app is properly integrated and configured to collect and analyze your Zero Networks Segment data.
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

## Viewing the Zero Networks Segment dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Network Activities

The **Zero Networks Segment - Network Activities** view offers a comprehensive snapshot of how users, devices, and applications communicate across the network. It tracks total source and destination devices, unique active users, connection volumes, and top domains, ports, and processes to reveal usage trends and dependencies. By correlating state, protocol, and traffic‑type distributions with geographic source and destination mapping, it highlights how data flows through internal, external, and Internet segments and helps uncover anomalies or unexpected communication paths. Consolidating these insights provides real‑time awareness of network behavior, enabling teams to validate segmentation effectiveness, identify misconfigurations, and maintain a secure, efficient, and well‑monitored network environment. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Zero-Networks-Segment-Network-Activities.png')} alt="Zero-Networks-Segment-Network-Activities" />

###  Security

The **Zero Networks Segment - Security** view provides a comprehensive picture of the organization’s threat posture and enforcement activity, unifying every indicator of risk into a single operational perspective. It tracks high‑risk connections, threat‑score distributions, and connection reasons to reveal which endpoints, users, or processes are engaging in potentially unsafe communications. Visual metrics categorize network events by threat severity, connection outcome, and justification reason, exposing patterns that signal policy violations, misconfigurations, or emerging threats. Detailed tables connect threat levels to specific destinations, processes, and users, allowing analysts to pinpoint the sources of elevated risk. Global mapping identifies traffic to and from embargoed or untrusted regions, while information on multi‑factor authentication usage and unmonitored rule creation highlights compliance gaps or policy bypasses. Together, these insights give security and operations teams real‑time awareness of exposure, enabling proactive mitigation, enforcement validation, and continuous assurance of Zero Trust segmentation controls. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Zero-Networks-Segment-Security.png')} alt="Zero-Networks-Segment-Security" />

### Audits Events

The **Zero Networks Segment - Audits Events** view provides unified visibility into all policy, configuration, and access-control changes occurring across the Zero Networks environment. It captures every audit event from rule creation, update, and approval to enforcement source actions, linking each to the responsible actor, affected assets, and time of change. Metrics track total audits, top users, and most modified assets, while visual distributions by audit type, user role, enforcement source, and rule state reveal who is making changes and through which system components. Temporal views highlight spikes in activity, exposing patterns that may signal configuration drift or unauthorized updates. Detailed tables correlate users, assets, and actions to support fast investigation and compliance verification. By bringing policy-level governance together in one place, this view enables teams to maintain accountability, trace decision history, and ensure that every modification to Zero Trust segmentation rules aligns with organizational security and compliance standards. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Zero-Networks-Segment-Audit-Events.png')} alt="Zero-Networks-Segment-Audit-Events" />

## Create monitors for the Zero Networks Segment app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Zero Networks Segment alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Zero Networks Segment - Sources from Embargoed Locations` | Generates an alert when one or more source IP addresses originate from embargoed or restricted geographies. This helps identify unauthorized or non‑compliant traffic entering the network from high-risk regions | Critical | Count > 0 |
| `Zero Networks Segment - Destinations from Embargoed Locations` | Triggers when outbound connections are detected to destinations associated with embargoed countries or sanctioned regions. Such connections may represent policy violations or potential data exfiltration attempts. | Critical | Count > 0 |
| `Zero Networks Segment - High Risk Connections` | Alerts when network sessions involve destinations with a threat score greater than 50 indicating known malicious infrastructure or suspicious domains that require immediate investigation. | Critical | Count > 0 |

## Upgrading/Downgrading the Zero Networks Segment app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Zero Networks Segment app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

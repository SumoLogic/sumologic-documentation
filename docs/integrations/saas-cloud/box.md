---
id: box
title: Box
sidebar_label: Box
description: The Sumo Logic app for Box provides insight into user behavior patterns, monitors resources, tracks administrative activities, and detects security threats.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/box.png')} alt="Box icon" width="50"/>

The Sumo Logic app for Box provides insight into user behavior patterns, monitors resources, tracks administrative activities, and detects security threats. The app consists of six predefined dashboards covering admin compliance, collaboration, resource monitoring, security anomalies, user authentication, and an operational overview, providing comprehensive visibility into your Box environment.

## Log types

The Sumo Logic app for Box collects Box events, which are described in detail [here](https://developer.box.com/guides/events/).

### Sample log messages

```json
{
   "source": {
      "type": "user",
      "id": "225980941",
      "name": "First Last",
      "login": "user@sumologic.com"
   },
   "created_by": {
      "type": "user",
      "id": "225980941",
      "name": "First Last",
      "login": "user@sumologic.com"
   },
   "created_at": "2016-12-15T11:08:58-08:00",
   "event_id": "7988d00a-aca3-4454-9021-652477f4fa78",
   "event_type": "LOGIN",
   "ip_address": "1.1.1.1",
   "type": "event",
   "session_id": null,
   "additional_details": null
}
```

```json
{
   "source": {
      "type": "user",
      "id": "262207389",
      "name": "user",
      "login": "luser@sumologic.com"
   },
   "created_by": {
      "type": "user",
      "id": "225980941",
      "name": "first last",
      "login": "user1@sumologic.com"
   },
   "created_at": "2016-12-14T16:09:33-08:00",
   "event_id": "d82f1946-2c51-43fe-bfcc-3452f9e2f6ff",
   "event_type": "DELETE_USER",
   "ip_address": "1.1.1.1",
   "type": "event",
   "session_id": null,
   "additional_details": null
}
```

### Sample queries

```sumo title="Top 10 Failed Logins"
_sourceCategory=box  type "event_type" login
| json "created_at","ip_address","event_type","created_by.name","created_by.login" as messagetime,src_ip,event_type, src_user,src_login nodrop
| json "source.name","source.login","source.type"  as dest_user,dest_login, item_type nodrop
| where event_type="FAILED_LOGIN"
| count as EventCount by src_user,src_login,src_ip | top 10 src_user,src_login,src_ip by EventCount
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration Box Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/box-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Box app is properly integrated and configured to collect and analyze your Box data.

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing Box dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Box - Overview** dashboard provides a high-level operational view of Box activity, including total event volume, security signals, admin action counts, event type distribution, event geolocation, top active users, and recent event history, enabling rapid situational awareness.

<img src={useBaseUrl('img/integrations/saas-cloud/Box-Overview.png')} alt="Box dashboards" />

### Admin and compliance

The **Box - Admin and Compliance** dashboard monitors administrative and compliance-sensitive Box events, including admin role assignments, user account lifecycle (create, edit, delete), group membership changes, application public key management, data retention policy updates, and access grant/revoke activity to support governance and audit investigations.

<img src={useBaseUrl('img/integrations/saas-cloud/Box-Admin-and-Compliance.png')} alt="Box dashboards" />

### Collaboration and sharing

The **Box - Collaboration and Sharing** dashboard tracks collaboration and sharing behavior across Box, including external collaboration invitations, resource-sharing events, folder permission changes, collaboration role modifications, and collaboration removals, to identify risky content exposure and unauthorized access patterns.

<img src={useBaseUrl('img/integrations/saas-cloud/Box-Collaboration-and-Sharing.png')} alt="Box dashboards" />

### Resource monitoring

The **Box - Resource Monitoring** dashboard analyzes file and folder operations, including uploads, downloads, deletions, moves, copies, and lock/unlock events, to surface the most accessed resources, top uploaders, and anomalous resource activity patterns.

<img src={useBaseUrl('img/integrations/saas-cloud/Box-Resource-Monitoring.png')} alt="Box dashboards" />

### Security threats and anomalies

The **Box - Security Threats and Anomalies** dashboard highlights critical security signals, including malicious file detections, sharing and upload policy violations, abnormal download behavior, device trust failures, logins from embargoed locations, threat intelligence events, and access to files containing sensitive content such as credentials, keys, and tokens.

<img src={useBaseUrl('img/integrations/saas-cloud/Box-Security-Threats-and-Anomalies.png')} alt="Box dashboards" />

### User monitoring

The **Box - User Monitoring** dashboard monitors user authentication activity, including total and failed logins, successful versus failed login trends, unique active users, admin login events, new device registrations, top source IPs, and OAuth2 token activity to detect suspicious access patterns.

<img src={useBaseUrl('img/integrations/saas-cloud/Box-User-Monitoring.png')} alt="Box dashboards" />

## Create monitors for the Box app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Box app alerts

| Name  | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Box - Abnormal Download Activity` | This alert is triggered when Box detects abnormal download activity for a user. This may indicate bulk data exfiltration, compromised account behavior, or unauthorized access to sensitive content. | Count > 0 | Count < = 0 |
| `Box - Device Trust Failures` | This alert is triggered when a Box device trust check fails for a user. This may indicate an attempt to access Box from an unmanaged or non-compliant device, which could represent a policy violation or a compromised endpoint. | Count > 0 | Count < = 0 |
| `Box - Events from Embargoed Locations` | This alert is triggered when Box activity is observed from embargoed or high-risk countries. This may indicate unauthorized access, regulatory compliance violations, or malicious activity originating from restricted geographies. | Count > 0 | Count < = 0 |
| `Box - Excessive Failed Logins by User` | This alert is triggered when a user exceeds three failed Box login attempts within 15 minutes. This may indicate brute-force activity, credential stuffing, or unauthorized access attempts against user accounts. | Count > 3 | Count < = 3 |
| `Box - Malicious Files Detected` | This alert is triggered when Box marks a file as malicious. This may indicate malware distribution, an insider threat uploading harmful content, or an attacker attempting to compromise other users who access the file. | Count > 0 | Count < = 0 |
| `Box - Policy Violations` | This alert is triggered when a Box sharing or upload policy violation is detected. This may indicate an attempt to bypass data governance controls, expose sensitive content externally, or violate organizational compliance policies. | Count > 0 | Count < = 0 |

## Upgrade/Downgrade the Box app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Box app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

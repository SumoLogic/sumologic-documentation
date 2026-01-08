---
id: webex
title: Webex
sidebar_label: Webex
description: The Sumo Logic app for the Webex provides comprehensive monitoring and analysis of Webex environments, offering real-time visibility into security events, user activities, and system health.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/webex-logo.png')} alt="webex-logo" width="120" />

The Sumo Logic app for Webex provides comprehensive monitoring and analysis of Webex environments, offering real-time visibility into security events, user activities, and system health. This app includes pre-built dashboards and queries that help organizations quickly identify and respond to security incidents, track user behaviors, manage device activities, and ensure compliance. With detailed insights into login events, authorization activities, device management, and administrative actions, this app enhances operational efficiency and strengthens security postures by providing actionable intelligence.

## Log type

This app uses Sumo Logic’s [Webex Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/webex-source/) to collect [Admin Audit events](https://developer.webex.com/docs/api/v1/admin-audit-events/list-admin-audit-events) from the Webex platform.

### Sample log messages

```json title="Admin Audit Events"
{
  "items": [
    {
      "data": {
        "actorOrgName": "Acme Inc.",
        "targetName": "Acme Inc.",
        "eventDescription": "An Admin logged in",
        "actorName": "Joe Smith",
        "actorEmail": "joe@example.com",
        "adminRoles": [
          "User",
          "Full_Admin",
          "id_full_admin"
        ],
        "trackingId": "ATLAS_6f23a878-bcd4-c204-a4db-e701b42b0e5c_0",
        "targetType": "TargetResourceType.ORG",
        "targetId": "NWIzZTBiZDgtZjg4Ni00MjViLWIzMTgtYWNlYjliN2EwZGFj",
        "eventCategory": "EventCategory.LOGINS",
        "actorUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        "actorIp": "128.107.241.191",
        "targetOrgId": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi85NmFiYzJhYS0zZGNjLTExZTUtYTE1Mi1mZTM0ODE5Y2RjOWE",
        "actionText": "Joe Smith logged into organization Acme Inc.",
        "targetOrgName": "Acme Inc."
      },
      "created": "2019-01-02T16:58:36.845Z",
      "actorOrgId": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi85NmFiYzJhYS0zZGNjLTExZTUtYTE1Mi1mZTM0ODE5Y2RjOWE",
      "id": "MjQ0ODhiZTYtY2FiMS00ZGRkLTk0NWQtZDFlYjkzOGQ4NGUy",
      "actorId": "MjQ4Njg2OTYtYWMwZC00ODY4LWJkMjEtZGUxZDc4MzhjOTdm"
    }
  ]
}
```

### Sample queries

```sql title="Total Audit Events"
_sourceCategory="cisco_webex"
| parse "\"id\": \"*\"" as event_id nodrop
| parse "\"eventDescription\": \"*\"" as event_description nodrop
| parse "\"targetType\": \"*\"" as target_type nodrop
| parse "\"targetId\": \"*\"" as target_id nodrop
| parse "\"targetName\": \"*\"" as target_name nodrop
| parse "\"eventCategory\": \"*\"" as event_category nodrop
| parse "\"created\": \"*\"" as created_time nodrop
| parse "\"actionText\": \"*\"" as action_text nodrop
| parse "\"actorId\": \"*\"" as actor_id nodrop
| parse "\"actorName\": \"*\"" as actor_name nodrop
| parse "\"actorEmail\": \"*\"" as actor_email nodrop
| parse "\"actorOrgId\": \"*\"" as actor_org_id nodrop
| parse "\"actorOrgName\": \"*\"" as actor_org_name nodrop
| parse "\"actorUserAgent\": \"*\"" as actor_user_agent nodrop
| parse "\"actorIp\": \"*\"" as actor_ip nodrop

// global filters
| where event_category matches "{{event_category}}"
| where event_description matches "{{event_description}}"

| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Webex](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/webex-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Webex app is properly integrated and configured to collect and analyze your Webex data.
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

## Viewing Webex dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Webex - Overview** dashboard provides a holistic view of all critical activities within the Webex environment. It summarizes total audit events, device creation, deletion, reboot status, and user management activities including creation, deletion, and updates. The dashboard categorizes events by type, user agent, and administrator actions, displaying trends over time and geographical locations of events. It includes a section for recent events, highlighting the immediate actions taken within the system. This dashboard aids administrators in maintaining an overview of operational status and identifying any anomalies or unusual activities promptly. <br/><img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Webex/Webex-Overview.png' alt="Webex-Overview" />

### Security Events

The **Webex - Security Events** dashboard in Sumo Logic offers a detailed view of security-related activities within the Webex environment. It tracks changes in Multi-Factor Authentication (MFA) status, remote access events, login activities, and authorization events over time. The dashboard includes sections for recent login and authorization code events, recent deactivated and reactivated users, and activities on allow and deny lists. Additionally, it provides insights into external admin additions and accounts assigned to external users. This dashboard provides information about potential security issues and helps in proactive incident management. <br/><img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Webex/Webex-Security-Events.png' alt="Webex-Security-Events" />

## Upgrade/Downgrade the Webex app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Webex app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
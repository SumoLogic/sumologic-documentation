---
id: citrix-cloud
title: Citrix Cloud
sidebar_label: Citrix Cloud
description: The Sumo Logic App for Citrix Cloud offers monitoring and analyzing any changes in the configurations or actions that have an impact on the environment and other account administrators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/citrix-cloud-icon.png')} alt="Citrix Cloud icon" width="80"/>

Citrix Cloud is a platform that manages and hosts various Citrix cloud services. The Sumo Logic app for Citrix Cloud lets you track any configuration changes or actions that affect your environment and other account administrators. This app is built on the Citrix Cloud source, which ensures effortless integration between Citrix Cloud and Sumo Logic. Through real-time analysis, the App provides dashboards that display critical metrics, enabling you to understand administrator, client administrator, and group administrator activities in your Active Directory or Azure Active Directory (AD).

## Log types

This Citrix Cloud App uses [SystemLog](https://developer.cloud.com/citrix-cloud/citrix-cloud---systemlog/apis/Records/GetRecords) records from the Citrix Cloud. To learn about the Citrix Cloud API fields, see the [Event Data Fields](https://docs.citrix.com/en-us/citrix-cloud/citrix-cloud-management/system-log/events.html#event-data-descriptions#fields) documentation.

### Sample log messages

```json
{
           "recordId": "2e0d29c4-ee2b-4553-96d9-6bafce9a91eb-638091150974673571",
           "utcTimestamp": "2023-02-23T10:11:37.4673571Z",
           "customerId": "bmdugyf91l53",
           "eventType": "platform/administrator/invite",
           "targetId": "bmdugyf91l53/kshah.ctr@sumologic.com/citrixsts",
           "targetDisplayName": "parthlangalia.ctr@sumologic.com",
           "targetEmail": "parthlangalia.ctr@sumologic.com",
           "targetUserId": null,
           "targetType": "administrator",
           "beforeChanges": null,
           "afterChanges": {
               "CustomerId": "bmdugyf9xxxx",
               "Principal": "parthlangalia.ctr@sumologic.com",
               "AccessType": "Full",
               "Pending": "True",
               "FromRecovery": "False",
               "Requester": "{\"Firstname\":null,\"Lastname\":null,\"Email\":\"prpatel.ctr@sumologic.com\",\"UCOid\":null}"
           },
           "agentId": "delegatedadministration",
           "serviceProfileName": null,
           "actorId": "OID:/citrix/f8fdca2f-9434-4527-8a70-ae90b9c7f043",
           "actorDisplayName": "Siri Oaklander",
           "actorType": "administrator",
           "message": {
               "en-US": "Administrator invitation sent",
               "de-DE": "Administratoreinladung gesendet",
               "es-ES": "Invitación de administrador enviada",
               "fr-FR": "Invitation d'administrateur envoyée",
               "ja-JP": "管理者への招待状が送信されました"
           }
       }
```

### Sample queries

```sumo="Active Team Members"
_sourceCategory="citrixCloudSource"
| json "eventType","targetDisplayName","targetEmail","beforeChanges.AccessType","afterChanges.AccessType","actorType","message.en-US" as event_type,name, email, access_type_before, access_type_after, actor, message nodrop
| where event_type matches("*platform/administrator/create*")
| where actor matches"{{actor}}"
| where event_type matches"{{event_type}}"
| count by _messageTime,name,message,access_type_after
| access_type_after as access_type
| formatDate(toLong(_messageTime), "dd-MM-yyyy HH:mm:ss") as time
| top 50 time,name,message,access_type by time
```

## Installing the Citrix Cloud app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Citrix Cloud dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Administrator Overview

The **Citrix Cloud - Administrator Overview** dashboard provides detailed information on newly added administrators, pending invitations, and recently deleted administrators in your Citrix Cloud account. Also, it highlights if any roles/permissions are updated for any administrator. The dashboard also visualizes the distribution of event types and actors performing records. Moreover, it gives a summary of all the Administrator events.

In addition to the above, the Dashboard provides a summary of all the Administrator events, allowing you to quickly assess the overall state of your Citrix Cloud account. With this Dashboard, you can easily monitor and analyze administrator activity, ensuring that your Citrix Cloud account remains secure and compliant with your organization's policies and regulations.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Citrix-Cloud-Administrator-Overview.png')} alt="citrix-admin-overview" width="750"/>

### Client and Group Administrator Overview

The ** Citrix Cloud - Client, Group Administrator Overview** dashboard provides detailed information about newly added and recently deleted clients and group administrators in your Citrix Cloud account. Also, it highlights whether any roles/permissions have been updated for any group administrators. Furthermore, it gives a summary of all the Administrator events.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Citrix-Cloud-Client-Group-Administrator-Overview.png')} alt="client-group-admin-overview" width="750"/>

### Network and Client Overview

The **Citrix Cloud - Network and Client Overview** dashboard provides visibility into network performance (ICA RTT latency), client endpoint inventory, client version compliance, connection state distribution, and external vs internal access patterns. It helps identify high-latency sessions, outdated Workspace app clients, and unusual access patterns.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Citrix-Cloud-Network-Client-Overview.png')} alt="Network and Client Overview" width="750"/>

### Session Logon Performance

The **Citrix Cloud - Session Logon Performance** dashboard provides detailed analysis of Citrix session logon performance, including logon duration trends, authentication duration, brokering duration, and a phase-wise breakdown of the logon process. It helps identify slow logons, bottlenecks in authentication or profile loading, and performance trends by user and machine.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Citrix-Cloud-Session-Logon-Performance.png')} alt="Session Logon Performance" width="750"/>

### User Experience and Session Health

The **Citrix Cloud - User Experience and Session Health** dashboard provides a holistic view of Citrix user experience and session health. It tracks total active users, unique sessions, session reconnections, exit code distribution, delivery-type breakdown, top users and machines by session load, and a comprehensive user-session summary. It helps administrators identify heavy users, overloaded machines, abnormal session terminations, and reconnection patterns that indicate poor user experience.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Citrix-Cloud-User-Experience-Session-Health.png')} alt="User Experience and Session Health" width="750"/>

## Create monitors for the Citrix Cloud app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Citrix Cloud Security Alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Citrix Cloud - Administrator Deleted` | This alert is triggered when an administrator account is deleted from the Citrix Cloud environment, enabling audit tracking of privileged account removals. | Critical | Count > 0 |
| `Citrix Cloud - Administrator Permission or Role Changed` | This alert is triggered when an administrator's access type or role is modified, enabling detection of unauthorized privilege escalation or permission changes. | Critical | Count > 0|
| `Citrix Cloud - High ICA RTT Latency` | This alert is triggered when the P95 ICA round-trip time exceeds 200ms, indicating network latency issues between Citrix clients and virtual desktops. | Critical | p95_rtt_ms > 200|
| `Citrix Cloud - High Session Logon Duration` | This alert is triggered when the average session logon duration exceeds 120 seconds, indicating slow logon performance that impacts the user experience. | Critical | avg_logon_sec > 120|

## Upgrade/Downgrade the Citrix Cloud app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Citrix Cloud app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

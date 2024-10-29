---
id: citrix-cloud
title: Citrix Cloud
sidebar_label: Citrix Cloud
description: The Sumo Logic App for Citrix Cloud offers monitoring and analyzing any changes in the configurations or actions that had an impact on the environment and other account administrators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/citrix-cloud-icon.png')} alt="citrix-cloud-icon" width="80"/>

The Citrix Cloud is a platform that manages and hosts various Citrix cloud services. The Citrix Cloud App for Sumo Logic allows you to keep track of any modifications made to configurations or actions that have affected your environment and other account administrators. This app is built on the Citrix Cloud source, which ensures effortless integration between Citrix Cloud and Sumo Logic. Through real-time analysis, the App offers dashboards to display critical metrics, enabling you to understand administrator, client administrator, and group administrator activities within your Active Directory or Azure Active Directory (AD).

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

```sql="Active Team Members"
sourceCategory="citrixCloudSource"
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

**Citrix Cloud - Administrator Overview** dashboard provides detailed information on newly added administrators, pending invitations, and recently deleted administrators from your Citrix Cloud account, including any updates to roles and permissions. The Dashboard also allows for easy visualization of the distribution of event types and the actors who perform these records, enabling you to identify trends and patterns in administrator activity.

In addition to the above, the Dashboard provides a summary of all the Administrator events, allowing you to quickly assess the overall state of your Citrix Cloud account. With this Dashboard, you can easily monitor and analyze administrator activity, ensuring that your Citrix Cloud account remains secure and compliant with your organization's policies and regulations.<br/><img src={useBaseUrl('img/integrations/saas-cloud/citrix-admin-overview.png')} alt="citrix-admin-overview" width="750"/>

### Client, Group Administrator Overview

**Citrix Cloud - Client, Group Administrator Overview** dashboard provides detailed information about newly added and recently deleted clients and group administrators from your Citrix Cloud account. It also indicates whether any group administrators' roles/permissions have been updated. It also provides a summary of all Administrator events.<br/><img src={useBaseUrl('img/integrations/saas-cloud/client-group-admin-overview.png')} alt="client-group-admin-overview" width="750"/>

## Upgrade/Downgrade the Citrix Cloud app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Citrix Cloud app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
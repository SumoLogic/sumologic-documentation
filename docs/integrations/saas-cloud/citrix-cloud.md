---
id: citrix-cloud
title: Citrix Cloud
sidebar_label: Citrix Cloud
description: The Sumo Logic App for Citrix Cloud offers monitoring and analyzing any changes in the configurations or actions that had an impact on the environment and other account administrators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/citrix-cloud-icon.png')} alt="citrix-cloud-icon" width="80"/>

The Citrix Cloud is a platform that manages and hosts various Citrix cloud services. The Citrix Cloud App for Sumo Logic allows you to keep track of any modifications made to configurations or actions that have affected your environment and other account administrators. This app is built on the Citrix Cloud source, which ensures effortless integration between Citrix Cloud and Sumo Logic. Through real-time analysis, the App offers dashboards to display critical metrics, enabling you to understand administrator, client administrator, and group administrator activities within your Active Directory or Azure Active Directory (AD).

## Log Types

This Citrix Cloud App uses [SystemLog](https://developer.cloud.com/citrix-cloud/citrix-cloud---systemlog/apis/Records/GetRecords) records from the Citrix Cloud. To learn about the Citrix Cloud API fields, see the [Event Data Fields](https://docs.citrix.com/en-us/citrix-cloud/citrix-cloud-management/system-log/events.html#event-data-descriptions#fields) documentation.

### Sample Logs

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
               "Requestor": "{\"Firstname\":null,\"Lastname\":null,\"Email\":\"prpatel.ctr@sumologic.com\",\"UCOid\":null}"
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

### Sample Queries

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

## Installing the Citrix Cloud App

Locate and install the app from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

Before you begin, collect logs from Citrix Cloud API and ingest them into Sumo Logic. Refer to the [Citrix Cloud API Cloud-to-Cloud Integration](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/citrix-cloud-source/) to create the source and use the same source category while installing the app.

To install the app, follow the steps below:
1. From the **App Catalog**, search for the app and select it.
1. Select **Add Integration** button to install the app.
1. Configure **Citrix Cloud App** using the steps described in the [Citrix Cloud-to-Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/citrix-cloud-source/). If you already have set up your data, skip this step by clicking on **Next**.
1. Complete the following fields:
   1. **Data Source**. Select either of these options for the data source:
      * Choose **Source Category** and then choose a source category from the list.
      * Select **Enter a Custom Data Filter** and type in a custom source category that starts with an underscore. For Example, `_sourceCategory=MyCategory`.
    2. **Folder Name**. You can retain the existing name, or enter a name of your choice for the app. 
    3. Select the **Location in Library** (the default is the **Personal** folder in the library), or click **New Folder** to add a new folder.
1. Click **Next**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. You can share it with your organization.

The panels will begin to fill automatically. It's worth noting that each panel gradually fills with data that matches the time range query and has been received since the panel was created. The results will not be available right away, but with some patience, you will be able to view full graphs and maps.

## Viewing the Citrix Cloud Dashboards

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

 You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

**Citrix Cloud - Administrator Overview** dashboard provides detailed information on newly added administrators, pending invitations, and recently deleted administrators from your Citrix Cloud account, including any updates to roles and permissions. The Dashboard also allows for easy visualization of the distribution of event types and the actors who perform these records, enabling you to identify trends and patterns in administrator activity.

In addition to the above, the Dashboard provides a summary of all the Administrator events, allowing you to quickly assess the overall state of your Citrix Cloud account. With this Dashboard, you can easily monitor and analyze administrator activity, ensuring that your Citrix Cloud account remains secure and compliant with your organization's policies and regulations.<br/><img src={useBaseUrl('img/integrations/saas-cloud/citrix-admin-overview.png')} alt="citrix-admin-overview" width="750"/>

**Citrix Cloud - Client, Group Administrator Overview** dashboard provides detailed information about newly added and recently deleted clients and group administrators from your Citrix Cloud account. It also indicates whether any group administrators' roles/permissions have been updated. It also provides a summary of all Administrator events.<br/><img src={useBaseUrl('img/integrations/saas-cloud/client-group-admin-overview.png')} alt="client-group-admin-overview" width="750"/>

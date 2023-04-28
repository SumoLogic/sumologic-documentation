---
id: docusign
title: Sumo Logic App for DocuSign
sidebar_label: DocuSign
description: The DocuSign App for Sumo Logic helps you monitor and secure your DocuSign account by providing real-time insights into critical events, alerts, and user activity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/docusign-icon.svg')} alt="Thumbnail icon" width="40"/>

The Sumo Logic app for DocuSign helps you monitor and secure your DocuSign account by providing real-time actionable insights into critical events, alerts, and user activity, allowing you to identify and address potential security threats before they can cause harm. With the DocuSign app, you can also protect data loss, identify suspicious activity, maintain the security of your DocuSign account, and prevent data breaches - all from a single, centralized platform.

The app leverages the DocuSign Monitor API to collect and analyze data from your DocuSign account, including document access and modification, user activity, authentication activity, and system events. You can set up custom alerts for critical events and user activity, and receive notifications in real-time when potential security threats are detected.

With the DocuSign App, you can:
* Monitor who accesses and changes important documents and detect any instances of unauthorized access or modifications to sensitive documents.
* Monitor user actions to identify any suspicious behavior, including attempts to access unauthorized data or engage in malicious activity.
* Monitor login activity to identify any abnormal or suspicious login attempts or unusual patterns of activity.
* Monitor system events for any signs of anomalies or potential security threats.
* Protect data loss by closely monitoring access, changes, and unauthorized activity.
* Analyze user behavior to identify potential security threats by looking for deviations from normal patterns of activity.

## Log Types

The DocuSign App for Sumo Logic uses [Events](https://developers.docusign.com/docs/monitor-api/monitor101/events-alerts/events-list) and [Alerts](https://developers.docusign.com/docs/monitor-api/monitor101/events-alerts/alerts-list) data to generate logs that can be used for monitoring and analysis.

### Sample Log Messages

```json title="Sample Events Log Message"
{
	"timestamp":"2023-03-03T09:10:06.0512813Z",
	"eventId":"a8010d32-b9f5-4948-9195-50c867d7c3a5",
	"site":"DEMO",
	"accountId":"8949bd2a-f1fc-4c95-ae8e-9e294b2af5b7",
	"organizationId":"9e294b2af5b7-f1fc-4c95-8949bd2a",
	"userId":"9cfb472b-ef1f-4116-8df2-17c53841fd6c",
	"integratorKey":"##DOCUSIGN_INTERNAL_NOT_USED##",
	"userAgent":"",
	"ipAddress":"162.248.186.11",
	"ipAddressLocation":{
		"latitude":47.6,
		"longitude":-122.33,
		"country":"india",
		"state":"gujarat",
		"city":"akota"
	},
	"object":"Account",
	"action":"UserAdded",
	"property":"",
	"field":"",
	"result":"",
	"source":"API",
	"referencedUserId":"2020ac66-26b5-4367-aff3-f33bd9a007b7",
	"proxyStatus":"",
	"proxyType":"",
	"proxyLevel":"",
	"latitude":47.6,
	"longitude":-122.33,
	"city":"akota",
	"state":"gujarat",
	"country":"india",
	"data":{
		"AffectedUserId":"2020ac66-26b5-4367-aff3-f33bd9a007b7",
		"AffectedMembershipId":"4da49358-8de5-4f62-9e9a-6029259723bc",
		"PermissionProfileId":"14414475"
	}
}
```

```json title="Sample Alerts Log Message"
{
	"timestamp":"2023-02-20T10:42:19.8996904Z",
	"eventId":"285e7634-07fd-4877-ac12-b921d0e4b626",
	"site":"DEMO",
	"accountId":"",
	"organizationId":"7f46f1ee-828e-41d4-9d85-755fa1814fd4",
	"userId":"9cfb472b-ef1f-4116-8df2-17c53841fd6c",
	"integratorKey":"",
	"userAgent":"",
	"ipAddress":"103.108.207.58",
	"ipAddressLocation":{
		"latitude":23.02,
		"longitude":72.57,
		"country":"india",
		"state":"gujarat",
		"city":"ahmedabad"
	},
	"object":"Alert",
	"action":"IpAddressOutsideAllowedRanges",
	"property":"",
	"field":"",
	"result":"",
	"source":"Other",
	"referencedUserId":"",
	"proxyStatus":"",
	"proxyType":"",
	"proxyLevel":"",
	"latitude":23.02,
	"longitude":72.57,
	"city":"ahmedabad",
	"state":"gujarat",
	"country":"india",
	"data":{
		"EventIds":[
			"16b4a651-1e21-42a3-90ea-f5227224b591",
			"1addc090-d227-4166-a279-dc6c5277247b",
			"1e0f0d65-ab89-4b74-9f85-6f80b0cd59b4",
			"205bb7fe-bada-4331-bfcb-73a81d0bebfd",
			"260ff2b6-c818-409a-813b-91d4b5afee27",
			"374f01a9-c86e-4600-b8e5-d20cd699fc65",
			"3a28a286-b041-42e8-aaac-fdb8234951f1",
			"3bc218bd-b8d6-4861-b471-f642c4b5aaca",
			"40c2e748-bd09-45c9-958b-e89e3280f716",
			"44badf68-6b7b-4294-b6bb-e1943dc0095b",
			"88cd1d2f-87a5-49e5-92cf-39cdf9550be1",
			"897bf5dc-2902-4270-a67e-dfd25fe98893",
			"9cc9a7f1-a853-45ab-95c1-22c7e7834e1d",
			"aaf22d31-9afa-48f3-880e-6287e4179daf",
			"b4cc9614-6606-4fd9-86df-fad67b2f6181",
			"de8ebe47-9e94-42e4-86db-4d56f882ab0a",
			"e9e27037-213f-46db-9976-2b22c1b36bc9",
			"f767e823-9722-49ef-8da5-b0d9f8dd13b6"
		],
		"Count":"18"
	}
}
```

### Sample Queries

This section contains the sample queries of both the `Events` and `Alerts`.

```sql title="User Access Controls"
_sourceCategory="docusign_src"
| json "object","userId","eventId","action","property","source","ipAddressLocation.latitude","ipAddressLocation.longitude","result","ipAddressLocation.city","ipAddressLocation.state","ipAddressLocation.country","data" as object,user_id,event_id,action,property,source,latitude,longitude,result,city,state,country,data nodrop
| where object matches "{{object}}" and action matches"{{action}}" and source matches"{{source}}"
| where country matches "{{country}}" or isNull(country)
| where object matches("*Account*") or object matches("*Connect*") or object matches("*User*") or object matches("*PermissionSet*")
| where action matches("*Updated*")
| count_distinct(event_id) by _messageTime,object,action,property,data,source,result,city,state,country
| formatDate(toLong(_messageTime), "dd-MM-yyyy HH:mm:ss") as time
| if(isBlank(property),"nil",property) as property
| top 100 time,object,action,property,data,source,result,city,state,country by time
```

```sql title="Alerts by Severity Over Time"
_sourceCategory="docusign_src"
| json "object","userId","eventId","action","property","source","ipAddressLocation.latitude","ipAddressLocation.longitude","result","ipAddressLocation.city","ipAddressLocation.state","ipAddressLocation.country" as object,user_id,event_id,action,property,source,latitude,longitude,result,city,state,country nodrop
| where object matches "{{object}}" and action matches"{{action}}" and source matches"{{source}}"
| where country matches "{{country}}" or isNull(country)
| where object matches("*Alert*")
| lookup alert,object,ds_action,description,severity,severity_id from https://sumologic-app-data.s3.amazonaws.com/docusign_alert_lookup.csv on action = ds_action
| if(isNull(severity),"low",severity) as severity
| where severity matches "{{severity}}"
| timeslice 1d
| count_distinct(event_id) as frequency by _timeslice,severity
| fillmissing timeslice,values all in severity
| transpose row _timeslice column severity as low, medium, high
```

## Installing the DocuSign App

Locate and install the app from the **App Catalog**. To preview the dashboards included with the app before installing, click **Preview Dashboards**.

Before you begin, collect logs from DocuSign API and ingest them into Sumo Logic. Refer to the [DocuSign API Cloud-to-Cloud Integration](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/docusign-source) to create the source and use the same source category while installing the app.

To install the app, follow the steps below:
1. From the **App Catalog**, search for the app and select it.
1. Select **Add Integration** button to install the app.
1. Configure **DocuSign App** using the steps described in the [DocuSign Cloud-to-Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/docusign-source). If you already have set up your data, skip this step by clicking on **Next**.
1. Complete the following fields:
   1. **Data Source**. Select either of these options for the data source:
      * Choose **Source Category** and then choose a source category from the list.
      * Select **Enter a Custom Data Filter** and type in a custom source category that starts with an underscore. For example, `_sourceCategory=MyCategory`.
   2. **Folder Name**. You can retain the existing name, or enter a name of your choice for the app. 
   3. Select the **Location in Library** (the default is the **Personal** folder in the library), or click **New Folder** to add a new folder.
1. Click **Next**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. You can share it with your organization.

The panels will begin to fill automatically. It's worth noting that each panel gradually fills with data that matches the time range query and has been received since the panel was created. The results will not be available right away, but with some patience, you will be able to view full graphs and maps.

## Viewing the DocuSign Dashboards

All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### DocuSign - Overview

**DocuSign - Overview** dashboard gives you information about the records of recently added users and administrators. It gives insights regarding total alerts fired, new templates created, envelopes signed, documents downloaded, and new groups created in the organization. It also provides geo-location and trends of all the events. The App visualizes the distribution of all the operations happening in the organization.

In addition to the above, the App summarizes the most frequent events, alerts, sources, activities from high-risk countries, and document modifications. Overall, this dashboard offers comprehensive information about the team's activity and facilitates efficient monitoring of various important events.<br/><img src={useBaseUrl('img/integrations/saas-cloud/docusign-overview.png')} alt="docusign-overview.png" width="800"/>

### DocuSign - Alerts

**DocuSign - Alerts** dashboard keeps track of when some bulk action is performed or multiple login sessions from different locations happen. Also, it gives you insights about high, medium, and low alerts. It further summarizes all the alerts based on their severity over time.<br/><img src={useBaseUrl('img/integrations/saas-cloud/docusign-alerts.png')} alt="docusign-alerts.png" width="900"/>

### DocuSign - Users

**DocuSign - Users** dashboard gives you detailed information regarding the operations performed by the users of the organizations. It gives you the geo-locations of all the user logins and login activity from high-risk locations. Also, it gives visibility into user login activity and distribution of sources of user activity. Furthermore, it summarizes the critical updates in settings, roles, and permissions.<br/><img src={useBaseUrl('img/integrations/saas-cloud/docusign-users.png')} alt="docusign-users.png" width="900"/>

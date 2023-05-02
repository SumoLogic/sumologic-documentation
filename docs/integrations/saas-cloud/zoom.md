---
id: zoom
title: Zoom
sidebar_label: Zoom
description: The Sumo Logic App for Zoom provides visibility into how Zoom is being used across your organization, displaying analytics on performance, availability, security, and user activity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/zoom.png')} alt="Thumbnail icon" width="100"/>

Zoom unifies cloud video and audio conferencing, simple online meetings, and group messaging into one easy-to-use platform. The cloud platform facilitates collaboration across mobile devices, desktops, telephones, and room systems for an online meeting space you can depend on. Zoom allows you to stay connected wherever you go with face-to-face video, high quality screen sharing, and instant messaging.

The Sumo Logic App for Zoom provides visibility into how Zoom is being used across your organization, displaying analytics on performance, availability, security, and user activity. The app aggregates and reports on data so you can correlate and investigate trends and respond to incidents across all of your IT tools in a consistent and timely manner.

## Log Types

Zoom uses Webhook events, that are documented in full on this [Zoom web page](https://marketplace.zoom.us/docs/api-reference/webhook-reference).

The Webhook events are grouped into the following core event types:

* Meeting Events
* Webinar Events
* Recording Events
* Zoom Room Events
* User Events
* Account Events

### Sample Log Message

```json
{
	"event":"meeting.participant_left",
	"payload":"▼"{
		"account_id":"eSqnB7aCS0KKx0_adadb1HQ",
		"object":"▼"{
			"duration":60,
			"start_time":"2020-04-01T19:24:06Z",
			"timezone":"America/Denver",
			"topic":"My Meeting",
			"id":"981802874",
			"type":2,
			"uuid":"/m84vL38R3exBtjhvdWxMad==",
			"participant":"▼"{
				"leave_time":"2020-04-01T19:24:20Z",
				"id":"FDGHUPeiSZGAa6pmYTlpiA",
				"user_id":"16778240",
				"user_name":"Test User"
			},
			"host_id":"FDGHUPeiSZADa6pmYTlpiA"
		}
	}
}
```

### Sample Query

```sql
_sourceCategory=zoom
| json "event", "payload.object.start_time", "payload.object.topic", "payload.object.uuid", "payload.object.id", "payload.object.type", "payload.object.duration" as event, meeting_start_time, topic, meeting_instance_id, meeting_number, meeting_type, meeting_duration nodrop
| where event = "meeting.started"
| "Unknown" as meeting_type_desc
| if (meeting_type == 1, "Instant Meeting", meeting_type_desc) as meeting_type_desc
| if (meeting_type == 2, "Scheduled Meeting", meeting_type_desc) as meeting_type_desc
| if (meeting_type == 3, "Recurring Meeting with No Fixed Time", meeting_type_desc) as meeting_type_desc
| if (meeting_type == 4, "Meeting started with Personal Meeting ID", meeting_type_desc) as meeting_type_desc
| if (meeting_type == 8, "Recurring Meeting with Fixed Time", meeting_type_desc) as meeting_type_desc
| count by meeting_instance_id
| count
```

## Set up collection

Follow the instructions for setting up [HTTP Integration for Zoom source](/docs/send-data/hosted-collectors/http-source/zoom) and use the same source category while installing the app.

## Installing the Zoom App

Now that you have set up collection for the Zoom events, install the Sumo Logic App for Zoom to use the pre-configured dashboards that provide visibility into your environment.

1. From the **App Catalog**, search for and select the app. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.
1. Select **Add Integration** button to install the app.
1. Configure **Zoom App** using the steps described in the [Zoom Source](/docs/send-data/hosted-collectors/http-source/zoom). If you already have set up your data, skip this step by clicking on **Next**.
1. To install the app, click **Add to Library** and complete the following fields.
    1. **Data Source.** Select either of these options for the data source.
        * Choose **Source Category**, and select the source category associated with the Hosted Collector you configured earlier.
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`).
	1. **Folder Name**. You can retain the existing name, or enter a name of your choice for the app.
    1. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
1. Click **Next**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing Zoom Dashboards

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

	You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Zoom - Overview

The **Zoom - Overview** dashboard provides an at-a-glance view of the state of your Zoom environment in terms of reliability, performance, user activity, and security by reporting on meetings, hosts, webinars, alerts and guest activity.

Use this dashboard to:
* Quickly identify and investigate Zoom issues your organization has been experiencing.
* Identify frequently used meeting-ids to prevent Zoom bombing.
* Assess the number of people in and out of your organization who are using Zoom and their level of activity.

<img src={useBaseUrl('img/integrations/saas-cloud/Zoom_Overview.png')} alt="Zoom dashboards" />

### Zoom - Availability

The **Zoom - Availability** dashboard provides insights into meeting, webinar, and Zoom room alerts in your environment. A meeting alert event is triggered when a service issue is encountered during a meeting and a Zoom Room alert event is triggered when there is an issue related to a Zoom Room.  

Use this dashboard to:
* Quickly identify meeting issues such as unstable audio and video connections, and poor screen sharing quality.
* Quickly identify issues in a Zoom Room device such as low battery or connection issues.

<img src={useBaseUrl('img/integrations/saas-cloud/Zoom_Availability.png')} alt="Zoom dashboards" />

### Zoom - User Activity

The **Zoom - User Activity** dashboard provides visibility into Zoom user presence and their activities. Panels display user trends, setting preferences, recording and screen sharing comparisons, as well as chat message details.

Use this dashboard to:
* Identify how users choose to appear in Zoom meetings Identify user setting changes.
* Determine the types of recordings most frequently used and the size of files generated to assess current resources and plan for growth.
* Analyze types of content shared during collaboration.

<img src={useBaseUrl('img/integrations/saas-cloud/Zoom_User_Activity.png')} alt="Zoom dashboards" />

### Zoom - Guest Activity

The **Zoom - Guest Activity** dashboard provides visibility into the Zoom guest users, their activities, and trends. Panels also display detailed information on screen sharing with guest participants, meetings with regular guests, and those with the most guest participants.

Use this dashboard to:
* Monitor overall guest activity to assess resources.
* Determine the meeting topics that attracted the most guest participants.
* Identify which hosts had the most guest participants.

<img src={useBaseUrl('img/integrations/saas-cloud/Zoom_Guest_Activity.png')} alt="Zoom dashboards" />

### Zoom - Administrator Activity

The **Zoom - Administrator Activity** dashboard provides insights into Administrative trends, user account activities, and user account trends.

Use this dashboard to:
* Audit activity by administrators.
* Quickly identify recent account and user changes.
* Monitor administrator activity trends to identify how to best optimize for the future.

<img src={useBaseUrl('img/integrations/saas-cloud/Zoom_Administrator_Activity.png')} alt="Zoom dashboards" />

### Zoom - Meeting Usage

The **Zoom - Meeting Usage** dashboard provides visibility into the number and types of Zoom meetings conducted, along with the hosts and participants of those meetings. Panels display meeting trends, as well as details on frequently used meeting numbers and hosts who have personal meeting rooms.

Use this dashboard to:
* Determine the level of collaboration occurring in your organization.
*  Monitor behavioral trends around how meetings are created, meeting duration, and how often meetings end of time to plan for and allocate required resources.

<img src={useBaseUrl('img/integrations/saas-cloud/Zoom_Meeting_Usage.png')} alt="Zoom dashboards" />

### Zoom - Authentication

The **Zoom - Authentication** dashboard provides an insight into the number and type of logins, trends, and Zoom clients and devices used.

Use this dashboard to:
* Quickly identify types of devices and Zoom clients used to ensure users are not running vulnerable clients.
* Determine highest activity times for Zoom activity and collaboration  and plan accordingly.

<img src={useBaseUrl('img/integrations/saas-cloud/Zoom_Authentication.png')} alt="Zoom dashboards" />

### Zoom - Meeting Security

The **Zoom - Meeting Security** dashboard provides visibility into meeting security as it relates to frequently used meeting-id’s and personal meeting rooms, as well as monitor when meetings are updated in a way that don’t conform to security best practices.

Use this dashboard to:
* Identify frequently used meeting-ids and personal meetings rooms being used to prevent Zoom bombing.
* Quickly identify which meetings are being updated to bypass security best practices.

<img src={useBaseUrl('img/integrations/saas-cloud/Zoom_Meeting_Security.png')} alt="Zoom dashboards" />

### Zoom - Webinars

The **Zoom - Webinars** dashboard provides visibility into the number and types of webinars, the participants, and trends. Panels also provide details on webinar authentications and comparisons of registered participants and those who actually participate.

Use this dashboard to:
* Determine the number and types of webinars and the participants who joined.
* Identify interest level, participation and assess the success of the webinars.

<img src={useBaseUrl('img/integrations/saas-cloud/Zoom_Webinars.png')} alt="Zoom dashboards" />

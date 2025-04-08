---
id: dropbox
title: Dropbox
sidebar_label: Dropbox
description: The Dropbox app for Sumo Logic allows organizations to monitor and analyze their Dropbox usage data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/dropbox-icon.svg')} alt="dropbox-icon.png" width="50"/>

The Dropbox app for Sumo Logic allows you to monitor and analyze Dropbox usage data for your organization, offering insight into user activity, file access, sharing, and collaboration. This app is based on the Cloud-to-Cloud Dropbox Source, which allows Dropbox and Sumo Logic to work together seamlessly.

The Dropbox app makes it simple to import data from your Dropbox account into Sumo Logic, where you can perform real-time analysis and create dashboards to visualize key metrics. You can gather information about user activity and file access, track changes in file and folder ownership, and track collaboration across your organization.

The Dropbox app for Sumo Logic offers several useful features:

* Monitor and analyze your Dropbox usage data in real-time.
* Gain insights into file access, sharing, and collaboration across your organization.
* Detect anomalous behavior and potential security threats, and customize dashboards to track key performance indicators.
* Customize dashboards to visualize important metrics and track key performance indicators.

To help you get started quickly, the app provides pre-built dashboards and searches that display important Dropbox usage metrics like top users, file access patterns, and shared files. In summary, the Dropbox app for Sumo Logic provides you with the necessary tools to monitor and analyze your organization's Dropbox usage data, giving you valuable insights into user behavior and potential security risks.

## Log types

The Dropbox App for Sumo Logic uses [Team events from Dropbox](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events) to generate logs that can be used for monitoring and analysis. To access more information about the specific fields for the v2 version of Dropbox events, refer to the [Migration guide](https://www.dropbox.com/developers/reference/events-migration-guide), which provides a comprehensive list of available log types.

### Sample log message

```json
{
   "timestamp": "2017-08-14T06:49:20Z",
   "event_category": {
       ".tag": "file_operations"
   },
   "actor": {
       ".tag": "user",
       "user": {
           ".tag": "team_member",
           "account_id": "dbid:ABCDMCvPlupS23WsLcsxD1q0I-fTX7gxRw",
           "display_name": "John Smith",
           "email": "john@acme.com",
           "team_member_id": "dbmid:ABCD_JXBjElUPaMLW7XewoH7F1euVwLQceo"
       }
   },
   "origin": {
       "geo_location": {
           "city": "San Francisco",
           "region": "California",
           "country": "US",
           "ip_address": "123.123.123.123"
       },
       "host": {
           "host_id": 1000000000
       },
       "access_method": {
           ".tag": "end_user",
           "end_user": {
               ".tag": "web"
           }
       }
   },
   "involve_non_team_member": false,
   "context": {
       ".tag": "team_member",
       "account_id": "dbid:ABCDMCvPlupS23WsLcsxD1q0I-fTX7gxRw",
       "display_name": "John Smith",
       "email": "john@acme.com",
       "team_member_id": "dbmid:ABCD_JXBjElUPaMLW7XewoH7F1euVwLQceo"
   },
   "assets": [
       {
           ".tag": "file",
           "path": {
               "contextual": "/folder/office.jpg",
               "namespace_relative": {
                   "ns_id": "1122112231",
                   "relative_path":"office.jpg"
               }
           },
           "file_id": "id:1111111111AAAAAAAAAAAA",
       }
   ],
   "event_type": {
       ".tag": "file_add",
       "description":"Added files and/or folders."
   },
   "details": {
       ".tag": "file_add_details"
   }
}
```

### Sample queries

```sql title="Active Team Members"
_sourceCategory="dropboxSource"
| json "$['actor']['.tag']","$['actor']*['.tag']","$['actor']*['account_id']","$['actor']*['display_name']","$['actor']*['email']","$['actor']*['team_member_id']","$['event_type']['.tag']","$['event_type']['description']","details.app_info.display_name", "origin.geo_location.ip_address", "origin.geo_location.country","$['event_category']['.tag']","involve_non_team_member" as actor,actor_is_team_member,actor_account_id, actor_display_name, actor_email,actor_team_member_id, event_type, event_type_description, app_name,location,country, event_category,involve_non_team_member nodrop
| where actor matches"{{actor}}"
| where event_category matches"{{event_category}}"
| where country matches"{{country}}" or isNull(country)
| where involve_non_team_member matches "{{involve_non_team_member}}"
| json field=actor_email "[0]" as email nodrop
| if(isNull(email),context.email,email) as email
| json field=actor_display_name "[0]" as name nodrop
| if(isNull(name),actor,name) as name
| json field=actor_is_team_member "[0]" as true_value_actor_is_team_member | where %"true_value_actor_is_team_member" = "team_member"
| where actor matches "*admin*" or actor matches "*user*"
| timeslice 1h
| count_distinct(actor_email) by _timeslice
| sort by _timeslice
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Dropbox](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/dropbox-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Dropbox app is properly integrated and configured to collect and analyze your Dropbox data.
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

## Viewing Dropbox dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Dropbox - Overview** dashboard provides valuable insights on the activities of active members, uniquely linked applications, and login events. It also offers a summary of user agent activity, analyzes the distribution of all event categories within Dropbox, displays the geolocations of all events, identifies the most frequent event types within important event categories, and tracks recently added team members.

Moreover, the dashboard provides an overview of all events related to internal and external sharing within the team, including the sharing of files and folders with external domains. Overall, this dashboard offers comprehensive information about the team's activity and facilitates efficient monitoring of various important events.<br/><img src={useBaseUrl('img/integrations/saas-cloud/dropbox-overview.png')} alt="dropbox-overview.png" width="900"/>

### File Statistics

The **Dropbox - File Statistics** dashboard offers visibility into team members' file operations, including the most frequent file operations, geolocations of file operations, linked apps, and user activity. Additionally, it displays recent file operations along with associated assets.<br/><img src={useBaseUrl('img/integrations/saas-cloud/dropbox-file-statistics.png')} alt="dropbox-file-statistics" width="900"/>

### Logins, Devices & Sessions

The **Dropbox - Logins, Devices & Sessions** dashboard provides visibility into login geolocations, including risky countries, and displays a table view of successful device links. It also presents the distribution of team-linked and user-linked apps. Additionally, the dashboard lists users with frequent device IP changes and frequent failed login attempts to monitor for potential breaches.<br/><img src={useBaseUrl('img/integrations/saas-cloud/dropbox-logins-devices-sessions.png')} alt="dropbox-logins-devices-sessions" width="900"/>

### Team Admin Actions

The **Dropbox - Team Admin Actions** dashboard displays the most frequent actions performed by administrators and provides a table view of the top active admins along with their respective countries. It also shows all recent admin activities for easy monitoring.<br/><img src={useBaseUrl('img/integrations/saas-cloud/dropbox-team-admin-actions.png')} alt="dropbox-team-admin-actions" width="900"/>

## Upgrade/Downgrade the Dropbox app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Dropbox app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
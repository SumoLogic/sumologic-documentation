---
id: box
title: Box
sidebar_label: Box
description: Provides insight into user behavior patterns, monitors resources, and even tracks administrative activities.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/box.png')} alt="Thumbnail icon" width="50"/>

The Sumo Logic app for Box provides insight into user behavior patterns, monitors resources, and even tracks administrative activities. The app consists of three predefined Dashboards, providing visibility into your environment for real time analysis.

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

```sql title="Top 10 Failed Logins"
_sourceCategory=box  type "event_type" login
| json "created_at","ip_address","event_type","created_by.name","created_by.login" as messagetime,src_ip,event_type, src_user,src_login nodrop
| json "source.name","source.login","source.type"  as dest_user,dest_login, item_type nodrop
| where event_type="FAILED_LOGIN"
| count as EventCount by src_user,src_login,src_ip | top 10 src_user,src_login,src_ip by EventCount
```

## Set up collection

To set up [Cloud-to-Cloud Integration Box Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/box-source) for the Box app, follow the instructions provided. These instructions will guide you through the process of creating a source using the Box Source category, which you will need to use when installing the app. By following these steps, you can ensure that your Box app is properly integrated and configured to collect and analyze your Box data.

## Installing the Box app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing the Box dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Collaborations and Shares

<img src={useBaseUrl('img/integrations/saas-cloud/box_app_collaborations.png')} alt="Box dashboards" />

**Users with Most Collaboration Activities.** Shows the top users with the most collaboration activities and displays them as a column chart for the last 24 hours.

**Collaborations by Item.** Top items invoked in collaboration activities, displayed as a column chart for the last 24 hours.

**Collaboration Details.** Displays Box collaboration event information details in an aggregation table with columns for message time, event type, item name, source user, and source login for the last 24 hours.

**Shared Resources.** Displays the details of shared resources such as message time, event type, item name, item type, source user, and source login in an aggregation table for the last 24 hours.

### Resource Access

<img src={useBaseUrl('img/integrations/saas-cloud/box_app_resource.png')} alt="Box dashboards" />

**Top 10 Resource Creators.** Displays the top 10 resource creators by showing details of Box upload or create events by user and count as a pie chart for the last 24 hours.

**Top 10 Resource Consumers.** Provides information on the top 10 resource consumers by showing Box download or preview events by user and event count as a pie chart for the last 24 hours.

**Access Types Over Time.** Shows access event types by count as a stacked column chart using timeslices of one hour on a timeline for the last 24 hours.

**Top 10 Most Accessed Resources.** Lists the top 10 most accessed resources by name in a bar chart for the last 24 hours.

**Top 10 Most Downloaded or Viewed Resources.** Lists the top 10 most downloaded or viewed resources by name in a bar chart for the last 24 hours.

**Resources Moved or Copied.** Displays details on resources that have been copied or moved such as message time, item type, item name, event type, source login, and source user in an aggregation table for the last 24 hours.

### User Monitoring

<img src={useBaseUrl('img/integrations/saas-cloud/box_app_user_monitoring.png')} alt="Box dashboards" />

**Top 10 Logins by User.** Displays details about the top 10 users with the most logins, such as source user, source login, and event count in an aggregation table for the last 24 hours.

**Top 10 Logins by IP.** Shows the top 10 IP addresses that logged into the account in a pie chart for the last 24 hours.

**Top 10 Failed Logins.** Provides details on failed logins by user and event count in a column chart for the last 24 hours.

**Administrative Activities.** Displays administrative details such as message time, event type, source IP address, source user, source login, destination user, and destination login in an aggregation table for the last 24 hours.

**Recent Login Devices Added.** Reports details on recently added login devices such as message time, source login, source user, and source IP address in an aggregation table for the last 24 hours.

**Top 10 Automated Users.** Displays information on top automated users by user and event count in a column chart for the last 24 hours. Automated users are devices or applications that login through a user account.

## Upgrade/Downgrade the Box app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Box app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
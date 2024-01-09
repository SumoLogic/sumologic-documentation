---
id: asana
title: Asana
sidebar_label: Asana
description: Monitor and analyze the Asana data to detect potential security threats related to user activity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/asana-icon.png')} alt="asana-icon" width="40" />

The Sumo Logic app for Asana enables you to track user sign in activities, detect data access and export, and identify changes to security settings and user roles. This allows you to gain insights into user and team management updates and identify potential security threats. This app provides a pre-built dashboard that allows you to visualize the Asana data in a meaningful way and identify trends and patterns in the team. By taking appropriate actions based on these insights, you can ensure the security of Asana data and prevent data breaches.

Key features of the Asana app include:
- **Pre-built dashboard**. You may view the most important metrics connected to Asana data quickly using this app's pre-built dashboard. These dashboards offer a high-level overview of user updates, data exports, role changes, and logins.
- **Customizable searches**. With the help of this app, you may build custom searches to examine particular Asana data elements, allowing you to go deeper into the data and find insights that are pertinent to your company's needs.
- **Real-time monitoring**. By providing real-time monitoring of Asana data, this tool enables you to keep track of the most recent developments and trends in your team's work.
- **Integration with other sources**. This app can be used in conjunction with other Sumo Logic apps, which enables you to gain a more holistic view of the data.

## Log Types

This app uses Asana Source to collect [Audit Logs](https://developers.asana.com/reference/audit-log-api) from Asana.

### Sample log message

```json title="Audit Log"
{
 "gid": "12345",
 "actor": {
   "actor_type": "user",
   "email": "gregsanchez@example.com",
   "gid": "1111",
   "name": "Greg Sanchez"
 },
 "context": {
   "api_authentication_method": "cookie",
   "client_ip_address": "1.1.1.1",
   "context_type": "web",
   "oauth_app_name": "string",
   "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
 },
 "created_at": "2021-01-01T00:00:00.000Z",
 "details": {},
 "event_category": "deletion",
 "event_type": "task_deleted",
 "resource": {
   "email": "string",
   "gid": "1111",
   "name": "Example Task",
   "resource_subtype": "milestone",
   "resource_type": "task"
 }
}
```

### Sample Query

```sql title="Events by App Authorization"
_sourceCategory="asana-app"
| json "gid","event_type","resource.name","resource.email","resource.resource_type","event_category", "created_at", "actor.name", "actor.email","context.client_ip_address" as gid, event_type, resource_name, resource_email, resource_type, event_category, created_at, actor_name, actor_email, ip nodrop
| where event_type in ("user_app_authorized","user_app_revoked")
| count_distinct(gid) as frequency by event_type
| sort by frequency
```

## Set up collection

To set up [Cloud to Cloud Integration Asana Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/asana-source/) for the Asana app, follow the instructions provided. These instructions will guide you through the process of creating a source using the Asana Source category, which you will need to use when installing the app. By following these steps, you can ensure that your Asana app is properly integrated and configured to collect and analyze your Asana data.

## Installing the Asana app

This section describes how to install the Asana app for Sumo Logic and description of the dashboard. You'll also need to configure the [Asana Cloud-to-Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/asana-source/).

{@import ../../reuse/apps/app-install.md}

## Viewing Asana dashboard

The **Asana - Overview** dashboard presents a comprehensive overview of audit events related to actions taken on Asana. It includes widgets for user logins from risky locations, number of users invited, password change events, events by user authorization, user login events over time, content exports by resource, events by role change, events by team status, events by app authorization, events by access token authorization, deletion events, and geographical locations of user login. Overall, this dashboard provides quick access to pertinent information, making it a useful tool for improving event management. Also, the recent admin settings and recent access control events widgets offer a concise overview of recent events related to respective categories. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Asana-Overview.png')} alt="Asana-Overview" width="750"/>

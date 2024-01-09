---
id: druva
title: Druva
sidebar_label: Druva
description: The Druva App for Sumo Logic provides real-time monitoring and security insight for Druva accounts, enabling prompt detection and response to potential security incidents through granular insights into user activity, alerts, and backup status.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/druva-icon.png')} alt="druva-icon.png" width="100"/>

The Druva App for Sumo Logic enables real-time monitoring and security insight for your Druva account. This app provides critical event alerts and visibility into user activities, device and app usage, and backup and restore events. With this level of visibility, security teams can quickly detect and respond to potential security incidents. The Druva App for Sumo Logic is an essential tool for organizations looking to enhance their security operations.

The Druva App for Sumo Logic leverages Sumo Logic's cloud-to-cloud Druva source to collect and analyze data from your Druva account. This app delivers granular insights into user activity, alerts, and backup status, enabling organizations to promptly identify and respond to potential security incidents.

The Druva App offers the following capabilities:

* Monitor user activity and identify any unauthorized access to sensitive data.
* Detect and mitigate potential ransomware attacks.
* Ensure compliance with regulatory mandates.
* Monitor endpoint security and identify potential threats.
* Orchestrate incident response workflows by integrating with other security tools.

The Sumo Logic Druva App is a powerful tool for monitoring and protecting your data backups and archives. Organizations may gain important insights into their data security posture and respond quickly and efficiently to possible security events by leveraging Sumo Logic's Events API and advanced analytics capabilities.

## Log Types

The Druva App utilizes Sumo Logic's Druva Source to gather [Audit Events](https://developer.druva.com/docs/event-apis) from Druva. For more information on the fields of inSync events, refer to the [inSync events fields](https://developer.druva.com/docs/event-apis#obtain-events-api-response-in-syslog-format) documentation.

## Sample log message

```json title="Audit Event log"
{
   "eventID": 1203589860,
   "eventType": "Backup",
   "profileName": "Default",
   "inSyncUserName": "Adele Vance",
   "clientVersion": "7.2.0r(e67f3e32)",
   "clientOS": "Office 365 OneDrive",
   "ip": "209.142.167.255",
   "inSyncUserEmail": "adelev@druvaarena.onmicrosoft.com",
   "eventDetails": "Total Backup Size:0, Files Backed up:0, Files Missed:0, System and App Settings:Yes, Total Bytes Transferred:0, eventsGroupId:39583905",
   "timestamp": "2023-03-09T17:48:43Z",
   "inSyncUserID": 4660543,
   "profileID": 44426,
   "initiator": null,
   "inSyncDataSourceID": 6706405,
   "eventState": "Success",
   "inSyncDataSourceName": "OneDrive",
   "severity": 6,
   "facility": 23
 }
```

## Sample Query

```sql title="Number of Users"
_sourceCategory="druva_app"
|json"eventID","eventType","eventState","eventDetails","initiator","inSyncUserID","inSyncUserName","inSyncUserEmail","inSyncDataSourceID","clientOS","ip","timestamp","severity" as event_id,event_type,event_state,event_details,initiator,user_id,user_name,user_email,device_id,client_os,ip,time_stamp,severity nodrop
| where severity matches "{{severity}}"
| where client_os matches "{{client_os}}"
| where event_type matches "{{event_type}}"
| where event_state matches "{{event_state}}"
| if(isNull(user_id),"-",user_id) as user_id
| if(isNull(user_email),"-",user_email) as user_email
| if(isNull(client_os),"-",client_os) as client_os
| if(isNull(user_name),"-",user_name) as user_name
| if(isNull(device_id),"-",device_id) as device_id
| if(isNull(initiator),"-",initiator) as initiator
| if(isEmpty(ip),"-",ip) as ip
| count_distinct(user_id)
```

## Set up collection

To set up [Cloud to Cloud Integration Druva Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/druva-source/) for the Druva App, follow the instructions provided. These instructions will guide you through the process of creating a source using the Druva Source category, which you will need to use when installing the app. By following these steps, you can ensure that your Druva App is properly integrated and configured to collect and analyze your Druva data.

## Installing the Druva App​

This section has instructions for installing the Druva App for Sumo Logic.
Refer to the [Druva Cloud-to-Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/druva-source) to create the source and use the same source category while installing the app.

{@import ../../reuse/apps/app-install.md}

## Viewing Druva dashboards

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

 You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Druva Overview dashboard

**Druva - Overview**. The Overview dashboard in the Druva App provides a comprehensive view of the devices and cloud apps used by your organization. It includes widgets for unique user activities, device and app distribution, top users and administrators' details by device and event counts, and the trend of devices and apps over time. This dashboard is a powerful tool for monitoring activity, with the ability to detect and address potential security threats through the "failed events over time" widget. The "recent events details" widget offers a quick snapshot of the latest events. By using this dashboard, you can identify potential issues or anomalies, track changes in device and app usage, and gain a better understanding of events occurring in your organization's devices and cloud apps.<br/><img src={useBaseUrl('img/integrations/saas-cloud/druva-overview.png')} alt="druva-overview" width="750"/>

### Druva Alerts Overview dashboard

**Druva - Alerts Overview**. The Alerts dashboard in the Druva App provides comprehensive widgets to analyze security threats and take proactive measures. It includes widgets for tracking alerts by location, severity, and frequency over time, as well as detailed information on unusual activity events and the top users generating alerts. The recent alerts widget provides a quick snapshot of the latest security activity. By using this dashboard, organizations can identify and respond to potential threats efficiently, safeguarding their data effectively.<br/><img src={useBaseUrl('img/integrations/saas-cloud/druva-alerts-overview.png')} alt="druva-alerts-overview" width="750"/>

### Druva Backup and Restore dashboard

**Druva - Backup and Restore Overview**. The Backup and Restore dashboard offers a comprehensive view of backup, restore, and download events, providing valuable insights into your organization's data protection activities. The dashboard's widgets allow you to track and analyze these events, including the count and distribution of backup, restore, and download activities. You can closely monitor the most active users using the top users performing backup/restore activity widget.

The trend of failed backup/restore/download events over time offers an overview of any issues, enabling you to quickly identify and resolve them. The geo-location widget tracks activity locations, helping you identify potential threats or vulnerabilities. With this dashboard, you can monitor your data protection activities closely, ensuring the smooth running of backup and restore processes and securing your data.<br/><img src={useBaseUrl('img/integrations/saas-cloud/druva-backup-and-restore.png')} alt="druva-backup-and-restore" width="750"/>

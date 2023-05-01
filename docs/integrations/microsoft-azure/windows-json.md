---
id: windows-json
title: Windows JSON
sidebar_label: Windows JSON
description: The Windows JSON App provides insight into your Windows system's operation and events so that you can better manage and maintain your environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/windows.png')} alt="thumbnail icon" width="75"/>

The Windows JSON App provides insight into your Windows system's operation and events so that you can better manage and maintain your environment. The Windows JSON App is based on the JSON Windows event log format and consists of predefined searches and dashboards that provide visibility into your environment for real-time analysis of overall usage of Security Status, System Activity, Updates, User Activity, and Applications.

:::note
You may also be interested in the [Sumo Logic App for Windows Cloud Security Monitoring and Analytics](docs/integrations/cloud-security-monitoring-analytics/windows.md).
:::


## Log Types

The Windows JSON App assumes events are coming from Windows Event Log Sources in JSON format. It does not work with third party logs.

Standard Windows event channels include:
* Security
* System
* Application

Custom event channels, such as PowerShell or Internet Explorer are also supported.


### Sample Log Message

```json
{
	"TimeCreated":"2020-10-12T07:31:14+000039800Z",
	"EventID":"1102",
	"Task":104,
	"Correlation":"",
	"Keywords":"Audit Success",
	"Channel":"Security",
	"Opcode":"Info",
	"Security":"",
	"Provider":{
		"Guid":"{fc65ddd8-d6ef-4962-83d5-6e5cfe9ce148}",
		"Name":"Microsoft-Windows-Eventlog"
	},
	"EventRecordID":101802,
	"Execution":{
		"ThreadID":2896,
		"ProcessID":908
	},
	"Version":0,
	"Computer":"WIN-6D5CO5AB123",
	"Level":"Informational",
	"EventData":{
	},
	"UserData":{
		"LogFileCleared":{
			"xmlns":"http://sz2016rose.ddns.net/win/2004/08/windows/eventlog",
			"SubjectUserName":"Administrator",
			"SubjectDomainName":"WIN-6D5CO5AB123",
			"SubjectLogonId":"0x1971888",
			"SubjectUserSid":"S-1-5-21-2020-10-12T07:31:14-203418232-2020-10-12T07:31:14-500"
		}
	},
	"Message":"The audit log was cleared.\r\nSubject:\r\n\tSecurity ID:\tWIN-6D5CO5AB123\\Administrator\r\n\tAccount Name:\tAdministrator\r\n\tDomain Name:\tWIN-6D5CO5AB123\r\n\tLogon ID:\t0x1971888"
}
```

### Sample Query

The sample query is from the **Recent Policy Changes** panel from **Windows - Overview** dashboard.

```sql
_sourceCategory=Labs/windows-jsonformat ( "Audit Policy Change" or "System audit policy was changed" or *policy*change* or "Policy Change" or 4902 or 4904 or 4905 or 4906 or 4907 or 4912 or 4715 or 4719 or 4739)
| json "EventID", "Computer", "Message" as event_id, host, msg_summary nodrop
| parse regex field = msg_summary "(?<msg_summary>.*\.*)"
| where (event_id in ("4902", "4904", "4905", "4906", "4907", "4912", "4715", "4719", "4739") or msg_summary matches "System audit policy was changed*") and host matches "*"
| count by msg_summary | sort by _count, msg_summary asc
```


## Collecting Logs for the Windows JSON App

This section provides instructions on configuring log collection for the Windows JSON App so that logs are collected from the Microsoft Windows Event Log and ingested into Sumo Logic.

### Configure a Collector and Source

To configure a collector and source, do the following:

1. Configure an [Installed Windows collector](/docs/send-data/installed-collectors/windows) through the user interface or from the command line.
2. Configure either a local or remote Windows Event Log source. To configure a Windows Event Log source set the following:
  * **Event Format.** Select **Collect using JSON format**. Events are formatted into JSON that is designed to work with Sumo Logic features, making it easier for you to reference your data.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Event_Format.png')} alt="Windows JSON" />
  * **Event Collection Level.** When JSON format is selected you have to select Complete Message from the dropdown. **Complete Message** will ingest the entire event content, along with metadata.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Event_collection_Level.png')} alt="Windows JSON" />

For more information on local or remote Windows Event Log Source configuration, refer to [Local Windows Event Log Source](/docs/send-data/installed-collectors/sources/local-windows-event-log-source) and [Remote Windows Event Log Source](/docs/send-data/installed-collectors/sources/remote-windows-event-log-source).


## Installing the Windows JSON App

This section has instructions for installing the Sumo Logic JSON App for Windows and descriptions of each of the app dashboards.

{@import ../../reuse/apps/app-install.md}

## Viewing Windows JSON Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-template-variables.md).
:::


### Windows - Overview

The **Windows - Overview** dashboard provides insights into fatal or warning messages, policy changes, system restarts, and changes to administrative groups.

Use this dashboard to:
* Monitor systems experiencing fatal errors, warnings, and system restarts.
* Monitor services installed on the systems.
* Monitor policy changes performed on the system.
* Monitor the number of changes performed on the Administrative groups.

<img src={useBaseUrl('img/integrations/microsoft-azure/Windows_Overview.png')} alt="Windows JSON dashboards" />

### Windows - Default

The **Windows - Default** dashboard provides information about the start and stop operations for Windows services, Windows events, operations events, and Errors and Warnings.

Use this dashboard to:
* Monitor services being stopped, started on the system.
* Monitor event types (channels) collected from the system.
* Monitor Log Level (error, warning) trend on the systems.
* Monitor operations performed on the system like restarts, user creation, group creation, and firewall changes.

<img src={useBaseUrl('img/integrations/microsoft-azure/Windows_Default.png')} alt="Windows JSON dashboards" />

### Windows - Login Status

The **Windows - Login Status** dashboard provides information about successful and failed logins, successful Remote Desktop Protocol (RDP) reconnects, and failed login outliers.

Use this dashboard to:
* Monitor Successful and Failed logins by the user and track their locations with successful and failed login attempts.
* Monitor RDP (Remote Desktop) reconnect events.
* Track if there are failed login outliers to identify mischievous login activities.

<img src={useBaseUrl('img/integrations/microsoft-azure/Windows_LoginStatus.png')} alt="Windows JSON dashboards" />

### Windows - Event Errors

The **Windows - Event Errors** dashboards provide insights into error keyword trends and outliers.

Use this dashboard to:

* Monitor various errors in the systems.
* Monitor error trends and outliers to ensure they are within acceptable limits to decide the next step.

<img src={useBaseUrl('img/integrations/microsoft-azure/Windows_EventErrors.png')} alt="Windows JSON dashboards" />


### Windows - Application

The **Windows - Application** dashboard provides detailed information about install, uninstall, and event trends.

Use this dashboard to:
* Monitor Install and uninstall of applications performed on the system.
* Monitor log levels (error, warning, information) through trends and quick snapshots.
* Monitor various application-specific events happening through recent messages.

<img src={useBaseUrl('img/integrations/microsoft-azure/Windows_Application.png')} alt="Windows JSON dashboards" />

---
id: windows-json-pci-compliance
title: PCI Compliance for Windows JSON
sidebar_label: PCI Compliance For Windows (JSON)
description: The Sumo Logic App for Payment Card Industry (PCI) Compliance for Windows JSON offers dashboards to monitor system, account and user activity to ensure that login activity and privileged users are within the expected ranges.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/pci-compliance/pci-logo.png')} alt="Thumbnail icon" width="90"/>

This guide helps you set up Sumo Logic Collectors, and install the PCI Compliance for Windows JSON application, so you can begin monitoring your usage and determine if you are meeting Compliance benchmarks.

## Log Types

The PCI Compliance For Windows JSON App uses Windows Security Event and System Event logs. It does not work with third-party logs.


### Sample Log Messages  

```json
{"TimeCreated":"2020-10-12T07:31:14+000039800Z","EventID":"1102","Task":104,"Correlation":"","Keywords":"Audit
Success","Channel":"Security","Opcode":"Info","Security":"","Provider":{"Guid":"{fc65ddd8-d6ef-4962-83d5-6e5cfe9ce148}",
"Name":"Microsoft-Windows-Eventlog"},"EventRecordID":101802,"Execution":{"ThreadID":2896,"ProcessID":908},"Version":0,"Computer":
"WIN-6D5CO5AB123","Level":"Informational","EventData":{},"UserData":{"LogFileCleared":{"xmlns":"http://sz2016rose.ddns.net/win/2004/08/windows/eventlog",
"SubjectUserName":"Administrator","SubjectDomainName":"WIN-6D5CO5AB123","SubjectLogonId":"0x1971888","SubjectUserSid":"S-1-5-21-2020-10-12T07:31:14-203418232-2020-10-12T07:31:14-500"}},"Message":"The audit log was cleared.\r\nSubject:\r\n\tSecurity ID:\tWIN-6D5CO5AB123\\Administrator\r\n\tAccount Name:\tAdministrator\r\n\tDomain Name:\tWIN-6D5CO5AB123\r\n\tLogon ID:\t0x1971888"}
```

### Sample Query

The sample query is from the **Recent Policy Changes** panel from **Windows - Overview** dashboard.

```sql
_sourceCategory=OS/Windows/Events ( "Audit Policy Change" or "System audit policy was changed" or *policy*change* or "Policy Change" or 4902 or 4904 or 4905 or 4906 or 4907 or 4912 or 4715 or 4719 or 4739)
| json "EventID", "Computer", "Message" as event_id, host, msg_summary nodrop
| parse regex field = msg_summary "(?<msg_summary>.*\.*)"
| where (event_id in ("4902", "4904", "4905", "4906", "4907", "4912", "4715", "4719", "4739") or msg_summary matches "System audit policy was changed*") and host matches "*"
| count by msg_summary | sort by _count, msg_summary asc
```

## Collecting Logs for the PCI Compliance for Windows JSON App

This section provides instructions for configuring log collection for the PCI Compliance for Windows JSON App.


### Configure a Collector and a Source  

To configure a collector and source, do the following:

1. Configure an [Installed Windows collector](/docs/send-data/installed-collectors/windows) through the user interface or from the command line.
2. Configure either a local or remote Windows Event Log source. To configure a Windows Event Log source set the following:
    * **Event Format.** Select **Collect using JSON format.** Events are formatted into JSON that is designed to work with Sumo Logic features, making it easier for you to reference your data.
    * **Event Collection Level.** When JSON format is selected you have to select Complete Message from the dropdown. **Complete Message** will ingest the entire event content along with metadata.

For more information on local or remote Windows Event Log Source configuration, refer to [Local Windows Event Log Source](/docs/send-data/installed-collectors/sources/local-windows-event-log-source) and [Remote Windows Event Log Source](/docs/send-data/installed-collectors/sources/remote-windows-event-log-source).

Make sure to set the Source Category when configuring the Windows Event Log source. For example: OS/Windows/Events.


## Installing the PCI Compliance for Windows JSON App

This section provides instructions for installing the PCI Compliance for Windows JSON App, along with examples of each of the App dashboards. The PCI Compliance for Windows JSON App offers pre-built dashboards and queries to help you track your Windows system, user accounts, login activity, and Windows updates.

Now that you have set up collection, install the Sumo Logic App for PCI Compliance for Windows JSON App to use the pre-configured searches and dashboards that provide insight into your data.  

{@import ../../reuse/apps/app-install.md}

## Viewing PCI Compliance for Windows JSON Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards/filter-template-variables.md).
:::


### Windows - PCI Req 02, 08, 10 - Account, User, System Monitoring

Track your user accounts and recent system changes.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/Windows-PCI-Req-02-08-10-Account-User-System-Monitoring.png')} alt="Windows JSON PCI Compliance dashboards" />

* **User Account Created.** Aggregation table of the number of user accounts created in the last 24 hours.
* **User Account Deleted.** Aggregation table of the number of user accounts deleted in the last 24 hours.
* **User Account Enabled.** Aggregation table of the number of user accounts enabled in the last 24 hours.
* **User Account Disabled.** Aggregation table of the number of user accounts disabled in the last 24 hours.
* **User Account Locked.** Aggregation table of the number of user accounts locked in the last 24 hours.
* **Actions by Privileged Accounts.** Aggregation table of the number of actions taken by privileged accounts over the last 24 hours.
* **Tampering Audit Logs.** Aggregation table of the number of destination hosts whose logs were modified or cleared in the last 24 hours.
* **System Time Change.** Aggregation table of the number of services with a change to their system time over the last 24 hours.
* **Policy Changes.** Aggregation table of the number of services with policy changes over the last 24 hours.
* **System Restarted.** Aggregation table of the number of services started over the last 24 hours.
* **Service Stopped.** Aggregation table of the number of services stopped over the last 24 hours.
* **Service Execution Trend.** Trend of the different services being executed over time.


### Windows - PCI Req 02, 10 - Login Activity

Track login successes and failures.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/Windows-PCI-Req-02-10-Login-Activity.png')} alt="Windows JSON PCI Compliance dashboards" />

* **Failed Logins.** Count of failed logins over the last 24 hours.
* **Failed Logins.** Aggregation table of the date,
* **Successful logins.** Total number of successful logins over the last 24 hours. Compare to Failed Logins to determine if the number of failed logins to successful logins is consistent with normal behavior or indicative of an attack.
* **Successful logins.** Aggregation table of successful logins, including date, time, event code, error code, and count.
* **Default Login-Failure. **Aggregation table of failed default logins.
* **Default Login-Success.** Aggregation table of successful default logins.


### Windows - PCI Req 08 - Other User Activity

Track user activities such as password changes, password resets, excessive failed access attempts, unlocked accounts, and disabled accounts.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/Windows-PCI-Req-08-Other-User-Activity.png')} alt="Windows JSON PCI Compliance dashboards" />

* **User Account Password Changes.** Displays an aggregation table of the times passwords were changed, the destination host, destination user, source host, and source user, source domain, error message, error code, and the number of events that occurred.
* **User Account Password Reset.** Displays an aggregation table of the times passwords were reset, the destination host, destination user, source host, and source user, source domain, error message, error code, and the number of events that occurred.
* **Excessive Failed Access Attempts.** Displays an aggregation table of the excessive failed access attempts, the destination host, destination user, source host, and source user, source domain, error message, error code, and the number of events that occurred.
* **User Account Unlocked.** Displays an aggregation table of the times a user account was unlocked  the destination host, destination user, source host, and source user, source domain, error message, error code, and the number of events that occurred.
* **User Account Disabled but not deleted.** Displays an aggregation table of the times a user account was unlocked,  the destination host, destination user, source host, and source user, source domain, error message, error code, and the number of events that occurred.


### Windows - PCI Req 06 - Windows Updates Activity

Track your Windows Update activities.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/Windows-PCI-Req-06-Windows-Updates-Activity.png')} alt="Windows JSON PCI Compliance dashboards" />

* **All Windows Updates.** Aggregation table displaying all updated hosts in the past 24 hours, success/failure of that update, and any relevant error codes.
* **Recent Windows Update Failures.** Aggregation table displaying all update failures in the last 7 days, update that failed, time of failure, and current status.
* **Windows Update Trend.** Bar chart that displays 7-day trend of updates success and failure time sliced by hour.
* **Windows Update Summary by Host. **Aggregation table of the hosts and a count of that host’s update success or failure for the past 7 days.
* **Windows Update Summary.** Aggregation table of the latest Windows updates for the last 7 days and a count of their successes and failures

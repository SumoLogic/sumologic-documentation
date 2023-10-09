---
id: windows-legacy-pci-compliance
title: PCI Compliance for Windows Legacy
sidebar_label: PCI Compliance For Windows (Legacy)
description: The Sumo Logic App for Payment Card Industry (PCI) Compliance for Windows offers dashboards to monitor systems, account and users activity to ensure that login activity and privileged users are within the expected ranges.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/pci-compliance/pci-logo.png')} alt="Thumbnail icon" width="90"/>

This guide helps you set up Sumo Logic Collectors, and install the PCI Compliance for Windows Legacy application, so you can begin monitoring your usage and determine if you are meeting Compliance benchmarks.

## Log Types

The PCI Compliance For Windows Legacy App uses Windows Security Event and System Event logs. It does not work with third-party logs.

### Sample Log Message

```
instance of Win32_NTLogEvent
{
    Category = 13571;
    CategoryString = "MPSSVC Rule-Level Policy Change";
    ComputerName = "aphrodite.sumolab.org";
    EventCode = 4957;
    EventIdentifier = 4957;
    EventType = 5;
    InsertionStrings = {"CoreNet-IPHTTPS-In", "Core Networking - IPHTTPS (TCP-In)", "Local Port"};
    Logfile = "Security";
    Message = "Windows Firewall did not apply the following rule:

    Rule Information:
    ID: CoreNet-IPHTTPS-In
    Name: Core Networking - IPHTTPS (TCP-In)

    Error Information:
    Reason: Local Port resolved to an empty set.";
    RecordNumber = 1441653878;
    SourceName = "Microsoft-Windows-Security-Auditing";
    TimeGenerated = "20130411232352.140400-000";
    TimeWritten = "20130411232352.140400-000";
    Type = "Audit Failure";
};
```


### Sample Query

```sql title="Recent Policy Changes"
_sourceCategory=OS/Windows/Events "Policy Change"
| parse regex "CategoryString = \"(?<category>[^\"]+?)\";[\s\S]+?Logfile = \"Security\""
| count by category
| where category matches "*Policy Change*"
```


## Collecting Logs

This section provides instructions for configuring log collection for the PCI Compliance for Windows Legacy App.


### Configure a Collector and a Source  

To configure a collector and source, do the following:

1. Configure an [Installed Windows collector](/docs/send-data/installed-collectors/windows) through the user interface or from the command line.
2. Configure either a local or remote Windows Event Log source. To configure a Windows Event Log source set the following:
    * **Event Format.** Select **Collect using legacy format.** Events retain their default text format from Windows.

For more information on local or remote Windows Event Log Source configuration, refer to [Local Windows Event Log Source](/docs/send-data/installed-collectors/sources/local-windows-event-log-source) and [Remote Windows Event Log Source](/docs/send-data/installed-collectors/sources/remote-windows-event-log-source).

Make sure to set the Source Category when configuring the Windows Event Log source. For example: `OS/Windows/Events`.

This section provides instructions for configuring log collection for the PCI Compliance for Windows Legacy App.


## Installing the PCI Compliance for Windows Legacy App

This section provides instructions for installing the PCI Compliance for Windows Legacy App, along with examples of each of the App dashboards. The PCI Compliance for Windows Legacy App offers pre-built dashboards and queries to help you track your Windows system, user accounts, login activity, and Windows updates.

Now that you have set up collection, install the Sumo Logic App for PCI Compliance for Windows Legacy App to use the pre-configured searches and dashboards that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing the Windows Legacy PCI Compliance Dashboards

### Windows - PCI Req 02, 08, 10 - Account, User, System Monitoring

Track your user accounts and recent system changes.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-Legacy/Windows-PCI-Req-02-08-10-Account-User-System-Monitoring.png')} alt="Windows - PCI Req 02, 08, 10 - Account, User, System Monitoring" />

* **User Account Created. **Aggregation table of the number of user accounts created in the last 24 hours.
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

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-Legacy/Windows-PCI-Req-02-10-Login-Activity.png')} alt="Windows - PCI Req 02, 10 - Login Activity" />

* **Failed Logins.** Count of failed logins over the last 24 hours.
* **Failed Logins.** Aggregation table of the date,
* **Successful logins.** Total number of successful logins over the last 24 hours. Compare to Failed Logins to determine if the number of failed logins to successful logins is consistent with normal behavior or indicative of an attack.
* **Successful logins.** Aggregation table of successful logins, including date, time, event code, error code, and count.

* **Default Login-Failure. **Aggregation table of failed default logins.
* **Default Login-Success.** Aggregation table of successful default logins.


### Windows - PCI Req 08 - Other User Activity


Track user activities such as password changes, password resets, excessive failed access attempts, unlocked accounts, and disabled accounts.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-Legacy/Windows-PCI-Req-08-Other-User-Activity.png')} alt="Windows - PCI Req 08 - Other User Activity" />

* **User Account Password Changes. **Displays an aggregation table of the times passwords were changed, the destination host, destination user, source host, and source user, source domain, error message, error code, and the number of events that occurred.
* **User Account Password Reset. **Displays an aggregation table of the times passwords were reset, the destination host, destination user, source host, and source user, source domain, error message, error code, and the number of events that occurred.
* **Excessive Failed Access Attempts.** Displays an aggregation table of the excessive failed access attempts, the destination host, destination user, source host, and source user, source domain, error message, error code, and the number of events that occurred.
* **User Account Unlocked.** Displays an aggregation table of the times a user account was unlocked  the destination host, destination user, source host, and source user, source domain, error message, error code, and the number of events that occurred.
* **User Account Disabled but not deleted.** Displays an aggregation table of the times a user account was unlocked,  the destination host, destination user, source host, and source user, source domain, error message, error code, and the number of events that occurred.


### Windows - PCI Req 06 - Windows Updates Activity

Track your Windows Update activities.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-Legacy/Windows-PCI-Req-06-Windows-Updates-Activity.png')} alt="Windows - PCI Req 06 - Windows Updates Activity" />

* **All Windows Updates.** Aggregation table displaying all updated hosts in the past 24 hours, success/failure of that update, and any relevant error codes.
* **Recent Windows Update Failures.** Aggregation table displaying all update failures in the last 7 days, update that failed, time of failure, and current status.
* **Windows Update Trend.** Bar chart that displays 7-day trend of updates success and failure time sliced by hour.
* **Windows Update Summary by Host. **Aggregation table of the hosts and a count of that host’s update success or failure for the past 7 days.
* **Windows Update Summary.** Aggregation table of the latest Windows updates for the last 7 days and a count of their successes and failures

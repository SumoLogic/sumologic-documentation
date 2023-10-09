---
id: windows-legacy
title: Windows Legacy
sidebar_label: Windows (Legacy)
description: The Sumo Logic App for Payment Card Industry (PCI) Compliance for Windows JSON offers dashboards to monitor system, account and user activity to ensure that login activity and privileged users are within the expected ranges.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/windows.png')} alt="thumbnail icon" width="75"/>

The Windows Legacy App provides insight into your Windows system's operation and events so that you can better manage and maintain your environment. The Windows Legacy App consists of predefined searches and dashboards that provide visibility into your environment for real-time analysis of overall usage of Security Status, System Activity, Updates, and User Activity.

## Log Types

The Windows Legacy App assumes events are coming from Remote Windows Event Log Sources. It does not work with third party logs. Standard Windows event channels include:
* Security
* Application
* System

Custom event channels, such as PowerShell or Internet Explorer are also supported.


### Sample Log Message


```bash
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
_sourceCategory=OS/Windows "Policy Change"
| parse regex "CategoryString = \"(?<category>[^\"]+?)\";[\s\S]+?Logfile = \"Security\""
| count by category
| where category matches "*Policy Change*"
```


## Collecting Logs for Windows Legacy

This section provides instructions on configuring log collection for the Windows Legacy App, so that logs are collected from the Microsoft Windows Event Log and ingested into Sumo Logic. A sample log message and example query are also provided.

[Windows Performance](/docs/integrations/microsoft-azure/performance) is considered a separate data type.


### Configure a Collector and a Source

To configure a collector and source, do the following:

1. Configure an [Installed Windows collector](/docs/send-data/installed-collectors/windows) through the user interface or from the command line.
2. Configure either a local or remote Windows Event Log source. To configure a Windows Event Log source, set **Event Format** to **Collect using legacy format**.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Event_Format_Legacy.png')} alt="Event_Format_Legacy" />

Events retain their default text format from Windows.

For more information on local or remote Windows Event Log Source configuration, refer to [Local Windows Event Log Source](/docs/send-data/installed-collectors/sources/local-windows-event-log-source) and [Remote Windows Event Log Source](/docs/send-data/installed-collectors/sources/remote-windows-event-log-source).


## Installing the Windows Legacy App

Now that you have configured Windows logs, install the Sumo Logic App for Windows Legacy to take advantage of the pre-configured searches and dashboards to analyze your Windows data.

{@import ../../reuse/apps/app-install.md}

## Viewing Windows Legacy Dashboards

### Overview

See information about Windows update errors, fatal or warning messages, policy changes, system restarts, and changes to administrative groups.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/Windows/Overview.png')} alt="Overview" />

**Top Windows Update Error Codes.** Displays the top 10 Windows update error codes in a pie chart for the last 24 hours.

**All Fatal or Warning Messages by Source Host.** Provides details on the number of all fatal or warning messages by source host in an aggregation table for the last 24 hours.

**System Restarts.** Shows the number of system restarts in a single value chart for the last 24 hours.

**Recent Policy Changes.** Displays the number of recent policy changes by policy and count in a bar chart for the last 24 hours.

**Changes to Administrative Groups.** Shows the number of changes to administrative groups in a single value chart for the last 24 hours.


### Default

See information about the start and stop operations for Windows services; Windows events; operations events; and errors and warnings.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/Windows/Default.png')} alt="Default" />

**Top 10 Service Operations.** Displays information on the top 10 services per host that have started and stopped over the last 10 hours in a bar chart. To display details of the data in a pop-up menu, hover over a section of the chart. Hover over the text **Last 10 Hours** in the upper right corner to see details of the time frame for the displayed data.

**System Operations.** Provides information on the number of and type of events that have occurred per host over the last 10 hours, which allows you to easily identify any spikes in activity in the column chart. To display details of the data in a pop-up menu, hover over a section of the chart. Hover over the text **Last 10 Hours** in the upper right corner to see details of the time frame for the displayed data.

**Event Distribution Over Time.** Displays the number and type of events per hour in an easy to read timeline for the past 24 hours. To display details of the data in a pop-up menu, hover over a line in the chart. Hover over the text **Last 24 Hours** in the upper right corner to see details of the time frame for the displayed data.

**Errors and Warnings Over Time.** Shows the number of errors and warnings per hour in a timeline. To display details of the data in a pop-up menu, hover over a line in the chart. Hover over the text **Last 24 Hours** in the upper right corner to see details of the time frame for the displayed data.


### Login Status

See information about successful and failed logins, and successful RDP reconnects.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/Windows/LoginStatus.png')} alt="Login Status" />

**Logins by Hour.** Counts the number of login successes and failures by one hour increments over the last two hours in a column chart. To display details of the data in a pop-up menu, hover over a section of the chart. Hover over the text in the upper right corner, **Last 2 Hours**, to see details of the time frame for the displayed data.

**Failed Logins by Hour.** Displays the number of failed logins per host by hour in an easy to read stacked column chart. Information is displayed for the last two hours. To display details of the data in a pop-up menu, hover over a section of the chart. Hover over the text in the upper right corner, **Last 2 Hours**, to see details of the time frame for the displayed data.

**Successful Logins.** Shows a table of successful logins including information on the computer name, source user, destination user, and number of attempts. Information is displayed for the last two hours.

**Successful RDP Logins.** Provides a table with a list of successful remote desktop logins including details on computer name, destination user, and number of attempts. Information is displayed for the last two hours.


### Event Errors

See information about Window event messages that contain a keyword that indicates a problem. (If a Windows event contains  "error", "timeout", "exception", or "fail", Sumo tags the message with "error_keyword", "timeout_keyword", "exception_keyword", or "fail_keyword" respectively.)

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/Windows/EventErrors.png')} alt="Event Errors" />

**Breakdown by Keyword Tag**. A donut chart that shows the breakdown of problem keywords encountered in event messages over the last 24 hours.

**Error Keyword - One Day Time Comparison**. A table that shows the count of each keyword tag ("error_keyword", "timeout_keyword", "exception_keyword", or "fail_keyword") over the last 24 hours, compared to the same information for the previous day.

**Error Keyword by Computer and Message**. A table that shows the count of unique keyword tag/computer/message combinations over the last 24 hours.

**Error Keyword Trend**. A line chart that shows the count of each keyword tag per 15 minute timeslice over the last 24 hours.

**Error Keyword - Outlier**. See timeslices where the count of problem keywords exceeds the moving average by a statistically significant amount, three standard deviations over the last 24 hours.

**Error Keyword - LogReduce**. See a LogReduce analysis of event messages that contain problem keywords. (Sumo's LogReduce algorithm uses fuzzy logic to cluster messages together based on string and pattern similarity. For more information, see, [Detect Patterns with LogReduce](/docs/search/logreduce/detect-patterns-with-logreduce)).

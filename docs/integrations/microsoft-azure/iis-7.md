---
id: iis-7
title: IIS 7
sidebar_label: IIS 7
description: Allows you to manage your Microsoft Internet Information Services (IIS) server operations errors, request response times, as well as visitors and traffic insights.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/microsoft_iis_10.png')} alt="thumbnail icon" width="120"/>

The IIS 7 App monitors the performance and reliability of your Microsoft Internet Information Services (IIS) infrastructure, identifying customer-facing and internal operational issues. Additionally, you can monitor customer paths and interactions to learn how customers are using your product. The app consists of predefined searches and Dashboards, which provide visibility into your environment for real time or historical analysis.


## Log Types

IIS 7 Logs (IIS 7.5 logs are used) are generated as local files and written to this directory by default: `C:\inetpub\Logs\LogFiles\W3SVC1`. The App assumes the following format:
```
# Fields: date time s-ip cs-method cs-uri-stem cs-uri-query s-port
cs-username c-ip cs(User-Agent) sc-status sc-substatus
sc-win32-status time-taken
```

For details on setting fields to log, see http://technet.microsoft.com/en-us/library/cc754702(v=ws.10).aspx.

Sumo Logic expects W3C format with these fields for our Field Extraction Rules and IIS 7 Application: ([https://msdn.microsoft.com/en-us/library/ms525807(v=vs.90).aspx](https://msdn.microsoft.com/en-us/library/ms525807(v=vs.90).aspx)).
* Date
* Time
* ServerIP
* Method
* UriStem
* UriQuery
* Server Port
* UserName
* ClientIP
* UserAgent
* Referer
* Protocol Status
* Protocol Substatus
* Win32Status
* TimeTaken

For more information about the IIS 7 log (IIS 7.5 logs are used) format, see [https://www.iis.net/learn/manage/provisioning-and-managing-iis/configure-logging-in-iis](https://www.iis.net/learn/manage/provisioning-and-managing-iis/configure-logging-in-iis).


### Sample Log Messages

```json
2016-11-17 22:34:34 10.0.0.167 GET /favicon.ico - 80 - 12.177.21.34 Mozilla/5.0+(Macintosh;+Intel+Mac+OS+X+10_7_5)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/27.0.1453.110+Safari/537.36 404 0 2 1405 547 78
2016-11-17 22:34:34 10.0.0.98 GET /Trade/Images/VS-ConfigWeb.png - 80 - 156.74.250.7 Mozilla/5.0+(Windows+NT+6.1;+WOW64;+rv:14.0)+Gecko/20100101+Firefox/14.0.1 304 0 0 209 748 7
```

### Sample Queries

The following query samples are taken from the IIS 7 App.

The following query is taken from the the **Requests by App Over Time** panel on the **IIS 7 Traffic Insights - App Requests Dashboard**.

```sql title="Requests by App Over Time"
_sourceCategory=IIS*
| parse regex "\d+-\d+-\d+ \d+:\d+:\d+ (?<server_ip>\S+) (?<method>\S+) (?<cs_uri_stem>/\S+?) "
| parse regex field=cs_uri_stem "/(?<app>[^\./]+)/" nodrop
| if (isNull(app) || app="","Others",app) as app
| timeslice 1m
| count by app,_timeslice  
| transpose row _timeslice column app
```


The following query is taken from the **OSes and Browsers** panel of the **IIS 7 Traffic Insights - Content and Client Platform Dashboard**.

```sql title="Operating Systems (OSes) and Browsers"
_sourceCategory=IIS*
| parse regex "\d+-\d+-\d+ \d+:\d+:\d+ (?<server_ip>\S+) (?<method>\S+) (?<cs_uri_stem>/\S+?) \S+ \d+ (?<user>\S+) (?<client_ip>[\.\d]+) (?<agent>\S+) "
| if ((agent matches "*Windows NT*") or (agent matches "*Windows+NT*") or (agent matches "*Windows *") or (agent matches "*Win32*") or (agent matches "*Win64*"), "Windows", "Other") as OS |
if (agent matches "*Macintosh*","MacOS",OS) as OS |
if ((agent matches "*Windows Phone*") or (agent matches "*Windows+Phone*"),"Windows Phone",OS) as OS |
if (agent matches "*Linux*","Linux",OS) as OS |
if (agent matches "*iPad*","iPad",OS) as OS |
if (agent matches "*iPhone*","iPhone",OS) as OS |
if (agent matches "*Android*","Android",OS) as OS |
if (agent matches "*Darwin*","Darwin",OS) as OS |
if (agent matches "*CrOS*","Google Chrome",OS) as OS |
if (agent matches "*MSIE*","Internet Explorer","Other") as Browser |
if (agent matches "Internet Explorer","Internet Explorer", Browser) as Browser |
if (agent matches "*Trident*","Internet Explorer", Browser) as Browser |
if (agent matches "*Firefox*","Firefox",Browser) as Browser |
if (agent matches "*Safari*","Safari", Browser) as Browser |
if (agent matches "*Chrome*","Chrome", Browser) as Browser |
if (agent matches "Opera*","Opera", Browser) as Browser |
if (agent matches "Dolphin*","Dolphin", Browser) as Browser
| count(agent) by OS,Browser
| transpose row os column browser as *
```


## Collecting Logs for IIS 7

This procedure explains how to enable logging from Microsoft Internet Information Services (IIS) on your Windows server and ingest the logs into Sumo Logic.


### Prerequisites

To prepare for logging IIS 7 events, perform the following two tasks.

To enable logging on your IIS Server, do the following:
1. Open the Sever Manager Console
2. Select **Roles**
3. Select **Web Server (IIS)**
4. Select the host from which to collect IIS logs
5. In the right-hand pane, select **Logging**
6. For the option **One log file per select Site**
7. For the Log File Format, choose **W3C** so that you can select the fields to log
8. Click **Select Fields**, and then select the checkboxes for these fields:

Sumo Logic expects these fields in IIS logs for the IIS 7 Application and Field Extraction Rule by default.

* Date
* Time
* ServerIP
* Method
* UriStem
* UriQuery
* Server Port
* UserName
* ClientIP
* UserAgent
* Referer
* Protocol Status
* Protocol Substatus
* Win32Status
* TimeTaken
1. Click **OK** to save your configuration

To confirm that the log files are being created, do the following:

1. Open a command-line window and change directories to `C:\inetpub\Logs\LogFiles`. This is the same path you will enter when you configure the Source to collect these files.
2. Under the `\W3SVC1` directory, you should see one or more files with a `.log` extension. If the file is present, you can collect it.


### Step 1: Configure a Collector

Configure an [Installed Collector (Windows)](/docs/send-data/installed-collectors/windows). Sumo Logic recommends that you install the collector on the same system that hosts the logs.


### Step 2: Configure a Source

To collect logs from IIS 7, use an Installed Collector and a Local File Source. You may also configure a [Remote File Source](/docs/send-data/installed-collectors/sources/remote-file-source), but the configuration is more complex. Sumo Logic recommends using a Local File Source if possible.

1. Configure a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).
2. Configure the Local File Source Fields as follows:
    1. **Name**: Required (for example, "IIS")
    2. **Description**. (Optional)
    3. **File Path **(Required).`C:\inetpub\Logs\LogFiles\W3SVC1\*.log`
    4. **Collection start time**. Choose how far back you would like to begin collecting historical logs. For example, choose 7 days ago to being collecting logs with a last modified date within the last seven days.
    5. **Source Host**. Sumo Logic uses the hostname assigned by the operating system by default, but you can enter a different host name.
    6. **Source Category** (Required). For example, "IIS_prod". (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see [Best Practices](/docs/send-data/best-practices).)
3. Configure the **Advanced** section:
    7. **Timestamp Parsing Settings**: Make sure the setting matches the timezone on the log files.
    8. **Enable Timestamp Parsing**: Select **Extract timestamp information from log file entries**.
    9. **Time Zone**: Select the option to **Use time zone from log file. If none is present use:** and set the timezone to **UTC**.
    10. **Timestamp Format**: Select the option to **Automatically detect the format**.
    11. **Encoding**. UTF-8 is the default, but you can choose another encoding format from the menu if your IIS logs are encoded differently.
    12. **Enable Multiline Processing**. Disable the option to Detect messages spanning multiple lines. Because IIS logs are single line log files, disabling this option will improve performance of the collection and ensure that your messages are submitted correctly to Sumo Logic.
4. Click **Save**.

After a few minutes, your new Source should be propagated down to the Collector and will begin submitting your IIS log files to the Sumo Logic service.


## Field Extraction Rules

* **Name**: Microsoft IIS Logs
* **Scope**: Use the source category set above, such as "IIS_prod"
* **Parse Expression:**
```
parse regex "^[^#].*?(?<s_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) (?<cs_method>\S+?)
(?<cs_uri_stem>\S+?) (?<cs_uri_query>\S+?) (?<s_port>\d+?) (?<cs_username>\S+?)
(?<c_ip>.+?) (?<cs_User_Agent>\S+?) (?<cs_Referer>\S+?) (?<sc_status>\d+?)
(?<sc_substatus>\d+?) (?<sc_win32_status>\d+?) (?<time_taken>\d+?)$"
```

## Installing the IIS 7 App

Now that you have set up collection for IIS 7, install the Sumo Logic App for IIS 7 to use the preconfigured searches and [dashboards](#viewing-dashboards) that monitor log events generated by IIS 7.

To install the app, do the following:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see [Installing the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).

3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing IIS 7 Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

You can use filters to drill down and examine the data on a granular level.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Overview Dashboard

The **IIS 7 - Overview Dashboard** provides a high-level view of user visits by country, the number of requests and the response time, top applications used to make requests, operating systems (OSes) used, and the number of server errors.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/IIS/Overview.png')} alt="Overview Dashboard" />

### Server Operation - Errors

The **IIS 7 - Server Operation - Errors Dashboard** provides information on server errors by IP address, response code trends, HTTP errors by server IP address, and client errors by IP address.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/IIS/ServerOperationErrors.png')} alt="Server Operation - Errors" />

### Server Operation - Requests and Response Time

The **IIS 7 - Server Operation - Requests and Response Time Dashboard** provides information on requests by server IP address, the top 10 slowest web pages, the number of requests and the response time per timeslice, top 10 server IP addresses response throughput time in bytes per second, and cumulative response times percentiles.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/IIS/ServerOperationsRequestsAndResponseTime.png')} alt="Server Operation - Requests and Response Time" />

### Traffic Insights - Apps and Requests

The **IIS 7 - Traffic Insights - Apps and Requests Dashboard** provides information on the requests made by each application, the top 10 applications and the number of requests received, the top 10 users making requests, cumulative user request percentiles, the top 10 clients by IP address and the number of requests made, and cumulative client request percentiles**.**

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/IIS/TrafficInsightsAppsAndRequests.png')} alt="Traffic Insights - Apps and Requests" />

### Traffic Insights - Content and Client Platform

The IIS 7 - Traffic Insights - Content and Client Platform Dashboard provides information on the number of media file types requested, the top 10 documents requested, the operating systems and web browsers used by visitors, and the operating system platforms used by visitors.
<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/IIS/TrafficInsightsContentAndClientPlatform.png')} alt="Traffic Insights - Content and Client Platform" />

### Visitor Insights

The **IIS 7 - Visitor Insights Dashboard** provides information on the geographic locations and number of users by client IP address, the number of visitors per country, locations and number of users by client IP address by US state, and the number of visitors per US state.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/IIS/VisitorInsights.png')} alt="Visitor Insights" />

---
id: iis-10-opentelemetry
title: IIS 10 - OpenTelemetry Collector
sidebar_label: IIS 10 - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry app for IIS 10.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/microsoft-azure/microsoft_iis_10.png')} alt="thumbnail icon" width="130"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The [Internet Information Services](https://learn.microsoft.com/en-gb/iis/get-started/introduction-to-iis/introduction-to-iis-architecture) (IIS) 10 app is a logs and metrics app designed to monitor the availability and performance of your IIS web servers. Preconfigured dashboards and searches provide insight into application pools, ASP.NET applications, requests, latency, visitor locations, visitor access types, traffic patterns, errors, web server operations, and access from known malicious sources.

IIS logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

IIS metrics are sent to Sumo Logic through OpenTelemetry through [windowsperfcountersreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/windowsperfcountersreceiver). This receiver captures the configured system, application, or custom performance counter data from the Windows registry using the [PDH interface](https://docs.microsoft.com/en-us/windows/win32/perfctrs/using-the-pdh-functions-to-consume-counter-data). It is based on the [Telegraf Windows Performance Counters Input Plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/win_perf_counters).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Schematics.png' alt="Schematics" />

## Fields creation in Sumo Logic for IIS

Following are the [Fields](/docs/manage/fields/) which will be created as part of IIS App install if not already present.

- `sumo.datasource`. Has fixed value of **iis**.
- `deployment.environment`. User configured. This is the deployment environment where the IIS cluster resides. For example: `dev`, `prod`, or `qa`.
- `webengine.cluster.name`. User configured. Enter a name to uniquely identify your IIS web server cluster. This web server cluster name will be shown in the Sumo Logic dashboards.
- `webengine.system`. Has fixed value of **iis**.
- `webengine.node.name`. Holds the value of the Fully Qualified Domain Name (FQDN) of the machine from which the OpenTelemetry collector is collecting logs and metrics.

## Prerequisites

This section provides instructions for configuring log collection for IIS running on a non-Kubernetes environment for the Sumo Logic App for IIS. Sumo Logic supports the collection of logs from an IIS server in standalone environments. By default, IIS logs are stored in a log file. 

This section covers the following default log formats for IIS 10 and IIS 8.5:
- IIS Access Logs (W3C format)
- HTTP Error Logs

Default log formats are used by IIS App. IIS allows you to choose which fields to log in IIS access logs. To understand the various fields and their significance see this [link](https://docs.microsoft.com/en-us/windows/desktop/http/w3c-logging).

IIS Log files are generated as local files. For a standard Windows Server, the default log location is: `%SystemDrive%\inetpub\logs\LogFiles`. For example: `c:\inetpub\logs\LogFiles\`.

Within the folder, you will find subfolders for each site configured with IIS. The logs are stored in folders that follow a naming pattern like W3SVC1, W3SVC2, W3SVC3, etc. The number at the end of the folder name corresponds to your site ID. For example, W3SVC2 is for site ID 2.

- IIS Access Logs (W3C default format) Sumo Logic expects logs in [W3C](https://docs.microsoft.com/en-us/windows/desktop/http/w3c-logging) format with following fields:
  ```sql
  #Fields: date time s-ip cs-method cs-uri-stem cs-uri-query s-port cs-username c-ip cs(User-Agent) cs(Referer) sc-status sc-substatus sc-win32-status time-taken
  ```
   * IIS allows you to choose fields to log in IIS access logs. For explanations on the various fields and their significance see this [link](https://docs.microsoft.com/en-us/windows/desktop/http/w3c-logging).
- HTTP Error Logs Sumo Logic expects Error logs in following format:
  ```sql
  #Fields: date time c-ip c-port s-ip s-port protocol_version verb cookedurl_query protocol_status siteId Reason_Phrase Queue_Name
  ```

For information on HTTP Error Logs configuration and various HTTP Error Log fields, see [this link](https://support.microsoft.com/en-us/help/820729/error-logging-in-http-apis).

For Windows systems, log files which are collected should be accessible by the SYSTEM group. Use the following set of PowerShell commands if the SYSTEM group does not have access.

```
$NewAcl = Get-Acl -Path "<PATH_TO_LOG_FILE>"
# Set properties
$identity = "NT AUTHORITY\SYSTEM"
$fileSystemRights = "ReadAndExecute"
$type = "Allow"
# Create new rule
$fileSystemAccessRuleArgumentList = $identity, $fileSystemRights, $type
$fileSystemAccessRule = New-Object -TypeName System.Security.AccessControl.FileSystemAccessRule -ArgumentList $fileSystemAccessRuleArgumentList
# Apply new rule
$NewAcl.SetAccessRule($fileSystemAccessRule)
Set-Acl -Path "<PATH_TO_LOG_FILE>" -AclObject $NewAcl
```

## Enable logging on your IIS Server

Perform the following task, if logging on your IIS Server is not already enabled. To enable logging on your IIS Server, do the following:

1. Open IIS Manager.
1. Select the site or server in the Connections pane, then double-click Logging.
   :::note
   Enhanced logging is only available for site-level logging. If you select the server in the Connections pane, then the Custom Fields section of the W3C Logging Fields dialog is disabled.
   :::
1. In the Format field under Log File, select W3C and then click Select Fields. IIS App works on default fields selection.
1. Select following fields, if not already selected. Sumo Logic expects these fields in IIS logs for the IIS App to work by default:
   ```sh
   date time s-ip cs-method cs-uri-stem cs-uri-query s-port cs-username c-ip cs(User-Agent) cs(Referer) sc-status sc-substatus sc-win32-status time-taken
   ```

For more information about IIS log format and log configuration refer to this [link](https://docs.microsoft.com/en-us/iis/get-started/whats-new-in-iis-85/enhanced-logging-for-iis85).

Once the logs are configured to be written into a local file follow the below step to configure collection in Sumo.

## Collection configuration and app installation

import ConfigAppInstall from '../../../reuse/apps/opentelemetry/config-app-install.md';

<ConfigAppInstall/>

### Step 1: Set up Collector

import SetupColl from '../../../reuse/apps/opentelemetry/set-up-collector.md';

<SetupColl/>

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Collector.png' style={{border:'1px solid gray'}} alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml required for IIS Collection.

The path of the log file configured to capture IIS logs is needed to be given here, refer to [Prerequisites](#prerequisites).

Metrics for IIS app are collected through windows perf counters. You can specify the **Collection Interval** to specify at what interval should the metrics be scrapped. You can add any custom fields which you want to tag along with the data ingested in Sumo Logic. 

Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-YAML.png' style={{border:'1px solid gray'}} alt="YAML" />

### Step 3: Send logs to Sumo Logic

import LogsIntro from '../../../reuse/apps/opentelemetry/send-logs-intro.md';

<LogsIntro/>


<Tabs
  className="unique-tabs"
  defaultValue="Windows"
  values={[
    {label: 'Windows', value: 'Windows'},
    {label: 'Chef', value: 'Chef'},
    {label: 'Ansible', value: 'Ansible'},
    {label: 'Puppet', value: 'Puppet'},
  ]}>

<TabItem value="Windows">

  1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
  2. Restart the collector using: 
    ```sh
    Restart-Service -Name OtelcolSumo
    ```

</TabItem>

<TabItem value="Chef">

import ChefNoEnv from '../../../reuse/apps/opentelemetry/chef-without-env.md';

<ChefNoEnv/>

</TabItem>

<TabItem value="Ansible">

import AnsibleNoEnv from '../../../reuse/apps/opentelemetry/ansible-without-env.md';

<AnsibleNoEnv/>

</TabItem>

<TabItem value="Puppet">

import PuppetNoEnv from '../../../reuse/apps/opentelemetry/puppet-without-env.md';

<PuppetNoEnv/>

</TabItem>
</Tabs>

import LogsOutro from '../../../reuse/apps/opentelemetry/send-logs-outro.md';

<LogsOutro/>

:::note
A warning message will be printed if any one of the specified performance counters cannot be loaded on startup. The application will not fail fast with this warning. It is expected that some performance counters may not exist on some systems due to different OS configuration.
:::

## Sample log messages

```sql title="Sample Log Message - Non-Kubernetes environments"
2023-01-13 10:56:55 10.0.0.111 GET / ProgramID=236 443 - 207.235.176.5 Mozilla/5.0+(compatible;+Nimbostratus-Bot/v1.3.2;+http://cloudsystemnetworks.com) http://www.google.com/url?sa=t&rct=j&q=anomaly%20detection&source=web&cd=4 304 11 1236 70
```

## Sample metrics
```
{
    "queryId": "A",
    "_source": "iis/windowsperfcounters",
    "_metricId": "UHWuWs-fdl2-SSVRh6Yfww",
    "webengine.node.name": "EC2AMAZ-ENUFFVK",
    "_sourceName": "iis",
    "host.group": "anemawiniis",
    "os.type": "windows",
    "webengine.cluster": "test",
    "sumo.datasource": "iis",
    "instance": "*",
    "_sourceCategory": "OTC Metric Input",
    "deployment.environment": "anemawiniis",
    "_contentType": "win_password",
    "host.name": "EC2AMAZ-ENUFFVK",
    "metric": "win.aspnet.Request.Execution.Time",
    "_collectorId": "00005AF310C7F19E",
    "_sourceId": "0000000000000000",
    "webengine.system": "iis",
    "_sourceHost": "EC2AMAZ-ENUFFVK",
    "_collector": "EC2AMAZ-ENUFFVK",
    "max": 0,
    "min": 0,
    "avg": 0,
    "sum": 0,
    "latest": 0,
    "count": 1
}
```

## Sample log query

This sample Query is from the **IIS - Overview** > **Visitor Location** panel.

```sql title="Query String"
" %\"sumo.datasource\"=iis %\"webengine.cluster.name\"=* | json \"log\" as _rawlog nodrop \n| if (isEmpty(_rawlog), _raw, _rawlog) as iis_log_message\n| parse regex field=iis_log_message \"(?<server_ip>\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}) (?<method>\\S+?) (?<cs_uri_stem>\\S+?) (?<cs_uri_query>\\S+?) (?<s_port>\\S+?) (?<cs_username>\\S+?) (?<c_ip>\\S+?) (?<cs_User_Agent>\\S+?) (?<cs_referer>\\S+?) (?<sc_status>\\S+?) (?<sc_substatus>\\S+?) (?<sc_win32_status>\\S+?) (?<time_taken>\\S+?)$\"\n| count by c_ip\n| lookup latitude, longitude, country_name from geo://location on ip=c_ip\n| where !isNull(latitude)"
```

## Sample metric query

```sql title="Running Application pool"
sumo.datasource=iis  deployment.environment=* webengine.cluster.name=* webengine.node.name=* instance=*  metric=win.app.pool.was.Current.Application.Pool.State  | filter latest = 3 | count
```

## Viewing IIS dashboards

### Overview

The **IIS - Overview** dashboard provides a high-level view of the performance and integrity of your Microsoft Internet Information Services (IIS) infrastructure. Dashboard panels display visual graphs and detailed information on IIS versions, platforms, and log formats. Panels also show visitor geographic locations, top app requests. OS platforms, response status, response times, and client and server errors.

Use this dashboard to:
* Get a high-level overview of sites, requests, connect, cache, data received and sent, queue, application pool, client location, client platforms, error and threats identified.
* Drill Down to specific use cases by clicking on specific panels of interest.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Overview.png' alt="Overview" />

### HTTP Error

The **IIS - HTTP Error** dashboard provides detailed information on IIS error logging in HTTP. Dashboard panels show details on error events, top client and server IP addresses, top protocol versions and protocol status. Panels also show information on top reason phrases and verbs associated with HTTP errors, as well as top request details by reason.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-HTTP-Error.png' alt="HTTP Error" />

### Latency

The **IIS - Latency** dashboard provides visual graphs and detailed information for the integrity of performance throughout your IIS infrastructure. Dashboard panels show response time averages, cumulative percentiles, histograms, and outliers. Panels also show details for traffic distribution, slowest pages, slowest GET and POST requests, and average redirection time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Latency.png' alt="Latency" />

### Web Server Operations

The **IIS - Web Server Operations** dashboard provides visual graphs and detailed information on server operation errors in your IIS infrastructure. Dashboard panels show server errors by the server, server errors over time, server error outliers, and redirections by the server. Panels also show client errors by the server, client error outliers, top URLs with 404 errors, and response codes over time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Web-Server-Operations.png' alt="Web Server Operations" />

### Requests Stats

The **IIS - Requests Stats** dashboard provides visual graphs and statistics for requests made throughout your IIS infrastructure. Dashboard panels show the number of requests, request methods, request outliers, and requests by server. Panels also show details on GET, PUT, POST, and DELETE requests, as well as requests time, compare and unique visitors outlier.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Requests-Stats.png' alt="Requests Stats" />

### Threat Analysis

The **IIS - Threat Analysis** dashboard provides high-level views of threats throughout your IIS network. Dashboard panels display visual graphs and detailed information on Threats by Client IP, Threats by Referrer, and Threats by URL.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Threat-Analysis.png' alt="RThreat Analysis" />

### Visitor Access Types

The **IIS  - Visitor Access Types** Dashboard provides insights into visitor platform types, browsers, and operating systems, as well as the most popular mobile devices, PC and Mac versions used.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Visitor-Access-Types.png' alt="Visitor Access Types" />

### Visitor Locations

The **IIS - Visitor Locations** dashboard provides a high-level view of Nginx visitor geographic locations both worldwide and in the United States. Dashboard panels also show graphic trends for visits by country over time and visits by  US region over time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Visitor-Locations.png' alt="Visitor Locations" />

### IIS - Visitor Traffic Insights

The **IIS - Visitor Traffic Insight** Dashboard provides detailed information on the top documents accessed, top referrers, top search terms from popular search engines, and the media types served.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Visitor-Traffic-Insights.png' alt="Visitor Traffic Insights" />

### Application Pool

The **IIS - Application Pool** dashboard provides a high-level view of Application Pool State, Information and Worker Process Metrics.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Application-Pool.png' alt="IIS-Application-Pool" />

### ASP.NET

The **IIS - ASP.NET** dashboard provides a high-level view of the ASP.NET global performance counters. This dashboard helps you to analyse the state server sessions, monitor applications performance, and understand the request execution and wait time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-ASP.NET.png' alt="IIS-ASP.NET" />

### ASP.NET Applications

The **IIS - ASP.NET Applications** dashboard provides a high-level view of the ASP.NET application performance counters. This dashboard helps you to monitor compilations, errors, cache, requests executing, requests in application queue, pipeline instance count, and output cache.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-ASP.NET-Applications.png' alt="IIS-ASP.NET-Applications" />

### Cache Performance

The **IIS - Cache Performance** dashboard provides a high-level view of the the Web Service Cache Counters object includes cache counters specific to the World Wide Web Publishing Service. This dashboard helps you to monitor the output cache, cache memory, file cache, and URI cache.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Cache-Performance.png' alt="IIS-Cache-Performance" />

### Web Service

The **IIS - Web Service** dashboard provides a high-level view of the Web Service object includes counters specific to the World Wide Web Publishing Service. This dashboard helps you to monitor the total site, connections, site uptime, method, and miscellaneous.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Web-Service.png' alt="IIS-Web-Service" />

## Create monitors for IIS app

import CreateMonitors from '../../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### IIS alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `IIS - Access from Highly Malicious Sources` | This alert is triggered when an IIS server is accessed from highly malicious IP addresses. | Count `>` 0 | Count `<=` 0 |
| `IIS - ASP.NET Application Errors` | This alert is triggered when we detect an error in the ASP.NET applications running on an IIS server. | Count `>` 0 | Count `<=` 0 |
| `IIS - Blocked Async IO Requests` | This alert is triggered when we detect that there are blocked async I/O requests on an IIS server. | Count `>` 0 | Count `<=` 0 |
| `IIS - Error Events` | This alert is triggered when an error in the IIS logs is detected. | Count `>` 0 | Count `<=` 0 |
| `IIS - High ASP.NET Current Requests` | This alert is triggered when current ASP.NET request count exceeds given value (Default 500). | Count `>` 500 | Count `<=` 500 |
| `IIS - High Client (HTTP 4xx) Error Rate (Copy)` | This alert is triggered when there are too many HTTP requests (>5%) with a 4xx response code. | Count `>` 0 | Count `<=` 0 |
| `IIS - High Current Connections` | This alert is triggered when the current connections exceeds given value (Default 1000), to detect potential capacity issues. | Count `>` 1000 | Count `<=` 1000 |
| `IIS - High Server (HTTP 5xx) Error Rate` | This alert is triggered when there are too many HTTP requests (>5%) with a 5xx response code. | Count `>` 0 | Count `<=` 0 |
| `IIS - No Worker Processes` | This alert is triggered when worker processes count drops to zero indicating potential application pool issues. | Count `<` 1 | Count `>=` 1 |
| `IIS - Slow Response Time` | This alert is triggered when the response time for a given IIS server is greater than one second. | Count `>` 0 | Count `<=` 0 |

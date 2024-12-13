---
id: squid-proxy-opentelemetry
title: Squid Proxy - OpenTelemetry Collector
sidebar_label: Squid Proxy - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry app for Squid Proxy.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/web-servers/squid-proxy.png')} alt="Thumbnail icon" width="45"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The [Squid](http://www.squid-cache.org/Intro/) Proxy app is a logs app that helps you monitor activity in Squid Proxy. The preconfigured dashboards provide insight into served and denied requests; HTTP response codes; URLs experiencing redirects, client errors, and server errors; and quality of service data that helps you understand your users' experience.

Squid logs are sent to Sumo Logic through OpenTtelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Squid-Proxy-OpenTelemetry/Squid-Proxy-Schematics.png' alt="Schematics" />

## Fields creation in Sumo Logic for Squid

Following are the [Fields](/docs/manage/fields/) which will be created as part of Squid App install if not already present:

- `webengine.cluster.name`. User configured. Enter a name to identify this Squid cluster. This cluster name will be shown in the Sumo Logic dashboards.
- `webengine.system`. Has a fixed value of **squidproxy**.
- `sumo.datasource`. Has a fixed value of **squidproxy**.

## Prerequisites

By default, the squid proxy will write the access log to the log directory that was configured during installation. For example, on Linux, the default log directory is `/var/log/squid/access.log`. If the access log is disabled, you must enable the access log by following [these instructions](https://wiki.squid-cache.org/SquidFaq/SquidLogs).

import LogsCollectionPrereqisites from '../../../reuse/apps/logs-collection-prereqisites.md';

<LogsCollectionPrereqisites/>

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

## Collection configuration and app installation

import ConfigAppInstall from '../../../reuse/apps/opentelemetry/config-app-install.md';

<ConfigAppInstall/>

### Step 1: Set up Collector

import SetupColl from '../../../reuse/apps/opentelemetry/set-up-collector.md';

<SetupColl/>

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Squid-Proxy-OpenTelemetry/Squid-Proxy-Collector.png' style={{border:'1px solid gray'}} alt="Collector" />

## Step 2: Configure integration

OpenTelemetry works with a [configuration](https://opentelemetry.io/docs/collector/configuration/) yaml file which has all the details with respect to the data which needs to be collected. For example, it specifies the location of a log file that is read and sent to the Sumo Logic platform..

In this step, you will configure the yaml required for Squid Collection. The path of the log file configured to capture Squid logs is needed to be given here.

The files are typically located in `/var/log/squid/access.log`. Refer to the [Prerequisites](#prerequisites) section for more details.

You can add any custom fields which you want to tag along with the data ingested in Sumo. Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Squid-Proxy-OpenTelemetry/Squid-Proxy-YAML.png' style={{border:'1px solid gray'}} alt="YAML" />

## Step 3: Send logs to Sumo Logic

import LogsIntro from '../../../reuse/apps/opentelemetry/send-logs-intro.md';

<LogsIntro/>

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
    {label: 'Chef', value: 'Chef'},
    {label: 'Ansible', value: 'Ansible'},
    {label: 'Puppet', value: 'Puppet'},
  ]}>

<TabItem value="Linux">

1. Copy the yaml at `/etc/otelcol-sumo/conf.d/` folder in the Squid instance which needs to be monitored.
2. Restart the otelcol-sumo process using the below command:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml file to **`C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d`** folder in the machine which needs to be monitored.
2. Restart the collector using: 
   ```sh
   Restart-Service -Name OtelcolSumo
   ```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml at `/etc/otelcol-sumo/conf.d/` folder in the Squid instance which needs to be monitored.
2. Restart the otelcol-sumo process using the below command:
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --conf "glob:/etc/otelcol-sumo/conf.d/*.yaml"
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

### Sample log messages in Non-Kubernetes environments

```sql
1674483805.439 44 192.168.100.40 TCP_REFRESH_MODIFIED/301 514 GET http://openstack.org/ - HIER_DIRECT/192.168.100.40 text/html
```

### Sample queries

This sample Query is from the **Squid Proxy - HTTP Response Analysis** > **URLs Experiencing Redirections** panel.

```sql title="Query String"
%"sumo.datasource"=squidproxy %"webengine.cluster.name"=*  host.name=* %"webengine.system"=squidproxy
| json "log" as message nodrop 
| if (isEMpty(message), _raw, message) as message
| parse regex field = message "(?<time>[\d.]+)\s+(?<elapsed>[\d]+)\s+(?<remotehost>[^\s]+)\s+(?<action>[^/]+)/(?<status_code>[\d]+)\s+(?<bytes>[\d]+)\s+(?<method>[^\s]+)\s+(?<url>[^\s]+)\s(?<rfc931>[^\s]+)\s+(?<peerstatus>[^/]+)/(?<peerhost>[^\s]+)\s+(?<type>[^\s|$]+?)(?:\s+|$)" nodrop | parse field = message "Connection: *\\r\\n" as connection_status nodrop | parse field = message "Host: *\\r\\n" as host nodrop | parse field = message "User-Agent: *\\r\\n" as user_agent nodrop | parse field = message "TE: *\\r\\n" as te nodrop
| where status_code matches "3*"
| count as eventCount by url, status_Code
| sort by status_code, eventCount, url
```

## Viewing Squid dashboards

### Overview

The **Squid Proxy - Overview** Dashboard provides an at-a-glance view of the activity and health of the SquidProxy clusters and servers by destination locations, error and denied requests, URLs accessed.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Squid-Proxy-OpenTelemetry/Squid-Proxy-Overview.png' alt="Overview" />

### Activity Trend

the **Squid Proxy - Activity Trend** dashboard provides trends around denied request trend, action trend, time spent to serve, success and non-success response, remote hosts.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Squid-Proxy-OpenTelemetry/Squid-Proxy-Activity-Trend.png' alt="Activity Trend" />

### HTTP Response Analysis

The **The Squid Proxy - HTTP Response Analysis** dashboard provides insights into HTTP response, HTTP code, the number of client errors, server errors, redirections outlier, URLs experiencing server errors.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Squid-Proxy-OpenTelemetry/Squid-Proxy-HTTP-Response-Analysis.png' alt="HTTP Response Analysis" />

### Quality of Service

The **Squid Proxy - Quality of Service** dashboard provides insights into latency, the response time of requests according to HTTP action, and the response time according to location.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Squid-Proxy-OpenTelemetry/Squid-Proxy-Quality-of-Service.png' alt="Quality of Service" />

## Create monitors for SquidProxy app

import CreateMonitors from '../../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### SquidProxy alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Squid Proxy - High Client (HTTP 4xx) Error Rate` | This alert is triggered when there are too many HTTP requests (>5%) with a response status of 4xx. | Count `>` 0 | Count `<=` 0 |
| `Squid Proxy - High Denied Request` | This alert is triggered when there are too many HTTP denied requests (>5%) | Count `>` 0 | Count `<=` 0 |
| `Squid Proxy - High Response Time` | This alert is triggered when requests are taking too long to process. | Count `>` 20 | Count `<=` 20 |
| `Squid Proxy - High Server (HTTP 5xx) Error Rate` | This alert is triggered when there are too many HTTP requests (>5%) with a response status of 5xx. | Count `>` 0 | Count `<=` 0 |

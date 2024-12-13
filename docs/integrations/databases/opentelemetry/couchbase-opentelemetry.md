---
id: couchbase-opentelemetry
title: Couchbase - OpenTelemetry Collector
sidebar_label: Couchbase - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry app for Couchbase.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/couchbase-logo.png')} alt="Thumbnail icon" width="50"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

[Couchbase](https://developer.couchbase.com/what-is-couchbase/), a modern database for enterprise applications, is a distributed document database with a powerful search engine and in-built operational and analytical capabilities. It brings the power of NoSQL to the edge and provides fast, efficient bidirectional synchronization of data between the edge and the cloud.

The Sumo Logic app for Couchbase helps you monitor activity in Couchbase. The pre-configured dashboards provide insight into the Error, events and HTTP Access pattern that help you understand your clusters.

Couchbase logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

This App has been tested with Couchbase version 7.0.2.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-Schematics.png' alt="Schematics" />

## Fields creation in Sumo Logic for Couchbase

Following are the [Fields](/docs/manage/fields/) which will be created as part of Couchbase App install if not already present:

* `db.cluster.name`. User configured. Enter a name to identify this Couchbase cluster. This cluster name will be shown in the Sumo Logic dashboards.
* `db.system`. Has a fixed value of `couchbase`.
* `deployment.environment`. User configured. Through this Couchbase cluster is identified by the environment where it resides. For example: dev, prod or qa.
* `sumo.datasource`. Has a fixed value of `couchbase`.

## Prerequisite

By default, the Couchbase will write the log to the log directory that was configured during installation. For example, on Linux, the log directory would be `/opt/couchbase/var/lib/couchbase/logs`. By default, the Audit log is disabled, you must enable the audit log following these [instructions](https://docs.couchbase.com/server/current/manage/manage-security/manage-auditing.html). Query log, error log, the access log will be enabled by default.

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

If you want to use an existing OTel Collector, this step can be skipped by selecting the option of using an existing Collector.

If you want to create a new Collector please select **Add a new Collector** option.

Select the platform for which you want to install the Sumo OpenTelemetry Collector.

This will generate a command which can be executed in the machine which needs to get monitored. Once executed it will install the Sumo Logic OpenTelemetry Collector agent.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-Collector.png' style={{border:'1px solid gray'}} alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml file required for Couchbase Log Collection. Path of the log file configured to capture couchbase logs needs to be given here.

The files are typically located in folder `/opt/couchbase/var/lib/couchbase/logs`.

* For Audit Log: `/opt/couchbase/var/lib/couchbase/logs/audit.log`
* For Error Log: `/opt/couchbase/var/lib/couchbase/logs/error.log`
* For Access Log: `/opt/couchbase/var/lib/couchbase/logs/http_access.log`
* For Query Log: `/opt/couchbase/var/lib/couchbase/logs/query.log`

You can add any custom fields which you want to tag along with the data ingested in Sumo.
Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-YAML.png' style={{border:'1px solid gray'}} alt="Configuration" />

### Step 3: Send logs to Sumo

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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Couchbase instance which needs to be monitored.
2. restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Couchbase instance which needs to be monitored.
2. Restart the otelcol-sumo process using:
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
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

## Sample log messages

```
_time=09/Jan/2023:04:50:03 +0000+07:00 _level=ERROR _msg=Failed to perform INSERT on key <ud>key1</ud> for Keyspace default:beer-sample.inventory.hotel. Error - <ud>Duplicate Key key1</ud>
```

## Sample queries

Following query is from **Average Latency of All HTTP Requests** panel from Couchbase Overview dashboard:

```sql
 %"db.cluster.name"=* %"deployment.environment"=* %"sumo.datasource"="couchbase"
| json "log" as _rawlog nodrop
| if(isEmpty(_rawlog),_raw,_rawlog) as _raw
| parse regex "(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+\-\s+(?<username>\S+)\s+\[(?<time>.+)\]\s+\"(?:(?<method>\w+)\s+(?<path>\S+)\sHTTP\/1.1)\"\s+(?<code>\d+)\s(?<bytes>\d+)\s(?<origin_url>\S+) \"(?<agent>.+)\"\s(?<latency>\d+)"
| avg(latency)
```

## Viewing Couchbase Dashboards

### Overview

The **Couchbase - Overview** dashboard provides an at-a-glance view of the health of the Couchbase clusters and servers, performance, and problems causing errors.

Use this dashboard to:

- Gain insights into information about Average Latency and Response code distribution.
- Determine errors in clusters: get the list of top error logs and error queries

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-Overview.png' alt="Overview" />


### Errors

The **Couchbase - Errors** dashboard provides insights into errors from error logs in couchbase servers and couchbase clusters: buckets not ready, nodes not responding, node down, error queries, last error logs.

Use this dashboard to:

- Quickly identify critical errors affecting your couchbase servers.
- Identify SQL error queries from clients.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-Errors.png' alt="Errors" />


### Events

The **Couchbase - Events** dashboard provides insights into events from couchbase servers and couchbase clusters: the number of login failure, login success from clients, add/remove node events, add/remove bucket events, rebalance events.

Use this dashboard to:

- To audit the activities happening in the cluster. This helps to determine what activities have occurred in the system, helping to control system security.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-Events.png' alt="Events" />


### HTTP Access

The **Couchbase - HTTP Access** dashboard provides insights into HTTP Rest API requests from clients to couchbase servers and couchbase clusters: the latency, HTTP codes, client agents, IP clients, errors with 4XX 5XX response code.

Use this dashboard to:

- To understand user behavior accessing clusters and servers through Rest API.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-HTTP-Access.png' alt="Access" />

## Create monitors for Couchbase app

import CreateMonitors from '../../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Couchbase alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Couchbase - Bucket Not Ready` | This alert is triggered when a bucket in the Couchbase cluster is not ready. | Count `>` 0 | Count `<=` 0 |
| `Couchbase - High Latency HTTP Requests` | This alert is triggered on high average latency for HTTP requests to Couchbase | Count `>` 1000 | Count `<=` 1000 |
| `Couchbase - Node Down` | This alert is triggered when a node in the Couchbase cluster is down. | Count `>` 0 | Count `<=` 0 |
| `Couchbase - Node Not Respond` | This alert is triggered when a node in the Couchbase cluster does not respond too many times. | Count `>=` 10 | Count `<` 10 |
| `Couchbase - Too Many Error Queries on Buckets` | This alert is triggered when there are too many error queries on a bucket in a Couchbase cluster. | Count `>=` 1000 | Count `<` 1000 |
| `Couchbase - Too Many Login Failures` | This alert is triggered when there are too many login failures to a node in a Couchbase cluster. | Count `>=` 1000 | Count `<` 1000 |

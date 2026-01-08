---
id: jira-opentelemetry
title: Jira - OpenTelemetry Collector
sidebar_label: Jira - OTel Collector
description: The Sumo Logic app for Jira provides insight into Jira user access, request activity, issues, security, sprint events, and user events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/app-development/jira.png')} alt="Thumbnail icon" width="50"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic app for Jira provides insight into Jira usage, request activity, issues, security, sprint events, and user events. 

Jira logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Schematics.png' alt="Schematics" />

## Fields creation in Sumo Logic for Jira

Following are the tags which will be created as part of the Jira App install if not already present. 

- `sumo.datasource`. Has fixed value of **jira**.

## Prerequisites

This section provides instructions for configuring log collection for Jira running on a non-Kubernetes environment for the Sumo Logic App for Jira. Sumo Logic supports the collection of logs from Jira server in standalone environments.

Follow the instructions to set up log collection.

The Jira app uses the following log types:
- **Jira Access Logs**. HTTP server access log files, in `logs/access_logs`, in your Jira Installation Directory.
- **Jira Security Logs**. Security-related information, such as logins, logouts, session creation/destruction, and security denials from `atlassian-jira-security.log`.
- **Jira Catalina Logs**. The application catalina log file, `logs/catalina.out`, in your Jira Installation Directory.
- **Jira Webhooks**. Webhook events of types:
    - Issue
    - User
    - Sprint

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

## Configure hosted collector to receive Webhooks

In this step, you create a host collector to receive webhooks from Jira and set up an HTTP source on it.

1. Configure a [hosted collector](/docs/send-data/hosted-collectors/configure-hosted-collector/), or select an existing hosted collector for the HTTP source.
2. Configure an [HTTP source](/docs/send-data/hosted-collectors/http-source/logs-metrics/) on the hosted collector.
    - For Source Category, specify Atlassian/Jira/Events
    - Add `sumo.datasource` as File to this source and assign the value **jira** for it.<br/> <img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Datasource.png' alt="Datasource" width="350"/>
    - Make a note of the HTTP address for the source. You will supply it when you configure a Jira webhook in the next step.

## Register webhook in Jira

Follow the instructions on [Webhooks](https://developer.atlassian.com/server/jira/platform/webhooks/) in Jira help to register a webhook for the following events:
- Issue related:
    - created (jira:issue_created)
    - updated (jira:issue_updated)
    - deleted (jira:issue_deleted)
    - worklog changed (jira:worklog_updated)
- User related:
    - created (user_created)
    - updated (user_updated)
    - deleted (user_deleted)
- Sprint related:
    - created (sprint_created)
    - deleted (sprint_deleted)
    - updated (sprint_updated)
    - started (sprint_started)
    - closed (sprint_closed)

When you configure the webhook, enter the URL for the [HTTP source you created](#configure-hosted-collector-to-receive-webhooks) as the endpoint for the webhook.

## Collection configuration and app installation

import ConfigAppInstall from '../../../reuse/apps/opentelemetry/config-app-install.md';

<ConfigAppInstall/>

### Step 1: Set up Collector

import SetupColl from '../../../reuse/apps/opentelemetry/set-up-collector.md';

<SetupColl/>

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Collector.png' style={{border:'1px solid gray'}} alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml file required for Jira Collection.

Path of the different log file configured to capture Jira logs is needed to be given here:
- Jira Access Logs. Apache HTTP server log files. Default path `/var/log/apache2/*.log`.
- Jira Security Logs. Security-related information. Default path `/home/jira/atlassian/application-data/jira/log/atlassian-jira-security.log`.
- Jira Catalina Logs. The application server log file. Default path `/home/jira/atlassian/application-data/jira/log/*.log`.

Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-YAML.png' style={{border:'1px solid gray'}} alt="YAML" />

### Step 3: Send logs to Sumo Logic

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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Jira instance that needs to be monitored.
2. Place Env file in the following directory:
  ```sh
  /etc/otelcol-sumo/env/
  ```
3. Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine that needs to be monitored.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>

<TabItem value="macOS">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Jira instance that needs to be monitored.
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

```sh title="Sample Log Message (Non-Kubernetes environment)"
bluechip-office - - 19/01/2023:05:02:10 Z "GET /jira/rest/gadget/1.0/averageage/generate?projectOrFilterId=filter-16392&periodName=monthly&daysprevious=730&width=428&height=285&inline=true&_=1541539601115 HTTP/1.1" 401 8509 "https://jira.kumoroku.com/jira/plugins/servlet/gadgets/ifr?container=atlassian&mid=17024&country=US&lang=en&view=default&view-params=%7B%22writable%22%3A%22true%22%7D&st=atlassian%3A7udmdg9B2kTj%2FIang%2FZBXDM3COYkLIHJIzAUYmw9QDAiuHR4StJpZph6bTEtMMfxwx46%2B7cTTIjSGz%2B%2FNBJa4GLMS7e3ijRtWhIEIi4u19i2WXZsBZ8ZP8AekcT1JzwwkH9lGt9IRgXmL05epIw8kYAzDpKI1E%2FdHLFYtwo7m1M%2FRSsPMdoYGmwUfuIHM6%2FKGMsCDzToTKRzay85Sw9O7Db6%2B7A9MkQm0BxSmX3hMpV%2BPWgw%2BKDuNwPC0HCzrkMb4V2M3pJE0qBbvJqM2O6ezII938KZBz0%2B1zKnC9Rw2ePrbrm7TjCWGiR77NxKFtowNo3Xfg%3D%3D&up_isConfigured=true&up_isPopup=false&up_refresh=15&up_projectOrFilterId=filter-
```

## Sample queries

This sample query is from the **Jira - Overview** dashboard > **Catalina Requests** panel.

```sql
"%"sumo.datasource"=jira
| parse "URI *," as URI
| parse regex "\d{2}-\w{3}-\d{4}\s\d{2}:\d{2}:\d{2}.\d{3}\s(?<log_level>\w+)\s\[(?<thread>[^\]]+)\]\s(?<component>\S+)\s(?<message>.*)"
| timeslice 5m
| count _timeslice, log_level
| compare with timeshift 1d
| _count as count 
| _count_1d as count1d 
| fields - _count, _count_1d
| transpose row _timeslice column log_level
"
```

## Viewing Jira Dashboards

### Overview

The **Jira - Overview** dashboard provides a high-level view of Jira activities, including the location of event authentications, login comparisons, Jira requests, errors and error trends, and data usage.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Overview.png' alt="Overview" />

### Access

The **Jira - Access** dashboard provides information about Jira user access, including request trends, average response times, issues by project, response codes, and errors.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Access.png' alt="Access" />

### Catalina

The **Jira - Catalina** dashboard provides information on the Jira internal web server. Panels display analytics for errors, failures, exceptions, request trends, and top ranked URLs

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Catalina.png' alt="Catalina" />

### Issue Details

The **Jira - Issues Details** dashboard provides insights into Jira issues, showing analytics on open, closed, and reopened issues. Panels also display details on issue assignments and escalations and the average time to close issues, allowing you to prioritize and strategize issue management.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Issue-Details.png' alt="Issue Details" />

### Issue Overview

The **Jira - Issue Overview** dashboard provides a high-level view of Jira issue activities, so you can monitor work from creation to completion. The panels display analytics for issues that have been created, closed, reopened, and still in progress.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Issue-Overview.png' alt="Issue Overview" />

### Recent Issue Changes

The **Jira - Recent Issue Changes** dashboard tracks recent progress of Jira issues. You can view detailed information on the type of issue, including when it was created, its status, assignee, and a summary of the issue.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Recent-Issue-Changes.png' alt="Recent Issue Changes" />

### Security

The **Jira - Security** dashboard provides information on security in Jira. The panels show analytics for the location of successful and failed logins, successful and failed logins for active users, comparisons of successful and failed logins, and session trends.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Security.png' alt="Security" />

### Sprints Events

The **Jira - Sprints Events** dashboard provides insights on sprint events in Jira, including the number of sprint events, event trends, and sprints closed and created.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Sprints-Events.png' alt="Sprints Events" />

### User Events

The **Jira - User Events** dashboard provides information about user events in Jira, including the number of user events, trends, and users that have been updated, created, and deleted.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-User-Events.png' alt="User Events" />


## Create monitors for Jira app

import CreateMonitors from '../../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Jira alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Jira - Abnormal Session Creation Rate Alert` | This alert is triggered when there are unusual patterns in session creation/destruction that might indicate security issues or system problems. | Count >= 1 | Count < 1 |
| `Jira - High Average Response Time Alert` | This alert is triggered when elevated response times in Jira are detected, indicating potential performance degradation. | Count >= 5000 | Count < 5000 |
| `Jira - High HTTP 4xx Error Rate Alert` | This alert is triggered when there is increase in HTTP 4xx errors to detect service disruptions. | Count >= 50 | Count < 50 |
| `Jira - High HTTP 5xx Error Rate Alert` | This alert is triggered when there is increase in HTTP 5xx errors to detect service disruptions. | Count >= 50 | Count < 50 |
| `Jira - High Priority Issues Unassigned SLA Alert` | This alert is triggered when high-priority issues remain unassigned beyond the Default SLA threshold of 30 minutes (1800000 milliseconds). To adjust the SLA, update the value in the query to the desired time in milliseconds (e.g., 15 minutes = 900000, 1 hour = 3600000). | Count >= 1 | Count < 1 |
| `Jira - Rapid Authentication Failures Alert` | This alert is triggered when a single user experiences more than 10 failed login attempts within 5 minutes, indicating potential password guessing attempts or account lockout issues. | Count > 10 | Count \<= 10 |

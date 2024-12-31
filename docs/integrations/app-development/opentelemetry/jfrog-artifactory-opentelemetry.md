---
id: jfrog-artifactory-opentelemetry
title: JFrog Artifactory - OpenTelemetry Collector
sidebar_label: JFrog Artifactory - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry app for JFrog Artifactory.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/app-development/jfrog-Artifactory.png')} alt="Thumbnail icon" width="80"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic app for Artifactory provides insight into your [JFrog Artifactory](https://jfrog.com/artifactory/) binary repository. The app provides preconfigured Dashboards that include an Overview of your system, Traffic, Requests and Access, Download Activity, Cache Deployment Activity, and Non-Cached Deployment Activity. Artifactory logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Schematics.png' alt="Artifactory-Schematics" />

## Fields creation in Sumo Logic for Artifactory

Following are the Tags which will be created as part of Artifactory app install if not already present.

* `sumo.datasource`. Has fixed value of **artifactory**

## Prerequisites

This section provides instructions for configuring log collection for Artifactory for the Sumo Logic app.

The Sumo Logic app for Artifactory collects data from the following logs:

- `artifactory.log`. The main Artifactory log file that contains data on Artifactory server activity.
- `access.log`. The security log containing important information about accepted and denied requests, configuration changes, and password reset requests. The originating IP address for each event is also recorded.
- `request.log`. Generic HTTP traffic information similar to the Apache HTTPd request log.
- `traffic.log`. A log that contains information about site traffic and file sizes.

For more details about Artifactory logs, refer to [JFrog Logging](https://www.jfrog.com/confluence/display/RTF/Artifactory+Log+Files) and [Artifactory Log Files](https://www.jfrog.com/confluence/display/RTF6X/Artifactory+Log+Files#ArtifactoryLogFiles-RequestLog).

Sumo Logic reads logs in the directory `/var/opt/jfrog/artifactory/logs`:

- `artifactory.log`
- `access.log`
- `request.log`
- `traffic.*.log`

To activate the `traffic.log` file, add the following parameter to your `artifactory.system.properties` file, located under `$ARTIFACTORY/etc`:

```
artifactory.traffic.collectionActive=true
```
A restart is required for traffic collection to take effect.

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

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Collector.png' style={{border:'1px solid gray'}} alt="Artifactory-Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml required for the Artifactory Collection.

Path of the different log file configured to capture Artifactory logs is needed to be given here:

- `artifactory.log`
- `access.log`
- `request.log`
- `traffic.*.log`

You can add any custom fields which you want to tag along with the data ingested in sumo.

Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-YAML.png' style={{border:'1px solid gray'}} alt="Artifactory-YAML" />

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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Artifactory instance that needs to be monitored.
2. Restart the collector using:
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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Artifactory instance that needs to be monitored.
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

```bash title="Sample Log Messages in Non-Kubernetes environments"
2023-45-16 11:45:44,171 [a8bgdia2di2g80kh] [ACCEPTED DEPLOY] hortonworks-cache:org/apache/hadoop/hadoop-project/2.6.0-cdh5.4.4-SNAPSHOT/maven-metadata.xml for client : admin/195.186.216.125.
```

## Sample queries

This sample Query is from the **Artifactory - Cached Deployment Activity** > **Accepted Deploys by Geolocation** panel.

```sql title="Query String"
" %"sumo.datasource"=artifactory "ACCEPTED DEPLOY" "-cache"
|parse "[*] [*] *" as trace_id, event_type, user_info
| parse regex field=user_info "(?:(?<repo>[^:]*):(?<path>[^\s]*))?\s+(?<opt_msg>[\w\s:]+)?\s+(?<user>[^\/]+)\/(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\."
| where event_type = "ACCEPTED DEPLOY" and repo matches "*-cache"
| count  by ip | sort _count
| lookup longitude, latitude from geo://location on ip = ip
"
```

## Viewing JFrog Artifactory Dashboards

### Artifactory - Overview

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Overview.png' alt="Artifactory-Overview" />

import JfrogOv from '../../../reuse/apps/jfrog/artifactory-overview.md';

<JfrogOv/>

### Artifactory - Cached Deployment Activity

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Cached-Deployment-Activity.png' alt="Artifactory-Cached-Deployment-Activity" />

import JfrogCache from '../../../reuse/apps/jfrog/artifactory-cached.md';

<JfrogCache/>

### Artifactory - Download Activity

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Download-Activity.png' alt="Artifactory-Download-Activity" />

import JfrogDl from '../../../reuse/apps/jfrog/artifactory-download.md';

<JfrogDl/>

### Artifactory - Non-Cached Deployment Activity

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Non-Cached-Deployment-Activity.png' alt="Artifactory-Non-Cached-Deployment-Activity" />

import JfrogNon from '../../../reuse/apps/jfrog/artifactory-noncached.md';

<JfrogNon/>

### Artifactory - Request and Access

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Request-and-Access.png' alt="Artifactory-Request-and-Access" />

import JfrogReq from '../../../reuse/apps/jfrog/artifactory-request-access.md';

<JfrogReq/>

### Artifactory - Traffic

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Traffic.png' alt="Artifactory-Traffic" />

import JfrogTr from '../../../reuse/apps/jfrog/artifactory-traffic.md';

<JfrogTr/>

## Create monitors for Active Directory app

import CreateMonitors from '../../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Active Directory alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Active Directory - Account Lockouts Spike` | This alert is triggered when there are multiple account lockouts in a short time period, indicating potential brute force attempts. | Count `>=` 5 | Count `<` 5 |
| `Active Directory - Directory Service Failures` | This alert is triggered when there are critical Directory Service failures that could impact AD functionality. | Count `>=` 3 | Count `<` 3 |
| `Active Directory - Mass User Account Deletions` | This alert triggers when multiple user accounts are deleted in a short time period, which could indicate malicious activity | Count `>` 5 | Count `<=` 5 |
| `Active Directory - NTLM Authentication Failures` | This alert is triggered when there are multiple NTLM authentication failures, which could indicate credential theft attempts | Count `>=` 5 | Count `<` 5 |
| `Active Directory - Replication Failures` | This alert triggers when AD replication failures occur, which can impact directory synchronization | Count `>` 0 | Count `<=` 0 |
| `Active Directory - Schema Modifications` | This alert is triggered when changes are made to the AD schema, which are rare and potentially high-impact changes | Count `>` 0 | Count `<=` 0 |


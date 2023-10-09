---
id: jfrog-artifactory-opentelemetry
title: JFrog Artifactory - OpenTelemetry Collector
sidebar_label: JFrog Artifactory - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for JFrog Artifactory.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/app-development/jfrog-Artifactory.png')} alt="Thumbnail icon" width="80"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic App for Artifactory provides insight into your [JFrog Artifactory](https://jfrog.com/artifactory/) binary repository. The App provides preconfigured Dashboards that include an Overview of your system, Traffic, Requests and Access, Download Activity, Cache Deployment Activity, and Non-Cached Deployment Activity. Artifactory logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Schematics.png' alt="Artifactory-Schematics" />

## Fields creation in Sumo Logic for Artifactory

Following are the Tags which will be created as part of Artifactory App install if not already present.

* `sumo.datasource`. Has fixed value of **artifactory**

## Prerequisites

This section provides instructions for configuring log collection for Artifactory for the Sumo Logic App.

The Sumo Logic App for Artifactory collects data from the following logs:

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

## Collection configuration and app installation

{@import ../../../reuse/apps/opentelemetry/config-app-install.md}

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Collector.png' alt="Artifactory-Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml required for the Artifactory Collection.

Path of the different log file configured to capture Artifactory logs is needed to be given here:

- `artifactory.log`
- `access.log`
- `request.log`
- `traffic.*.log`

You can add any custom fields which you want to tag along with the data ingested in sumo.

Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-YAML.png' alt="Artifactory-YAML" />

### Step 3: Send logs to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
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
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Log Messages

```bash title="Sample Log Messages in Non-Kubernetes environments"
2023-45-16 11:45:44,171 [a8bgdia2di2g80kh] [ACCEPTED DEPLOY] hortonworks-cache:org/apache/hadoop/hadoop-project/2.6.0-cdh5.4.4-SNAPSHOT/maven-metadata.xml for client : admin/195.186.216.125.
```

## Sample Query

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

{@import ../../../reuse/apps/jfrog/artifactory-overview.md}

### Artifactory - Cached Deployment Activity

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Cached-Deployment-Activity.png' alt="Artifactory-Cached-Deployment-Activity" />

{@import ../../../reuse/apps/jfrog/artifactory-cached.md}

### Artifactory - Download Activity

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Download-Activity.png' alt="Artifactory-Download-Activity" />

{@import ../../../reuse/apps/jfrog/artifactory-download.md}

### Artifactory - Non-Cached Deployment Activity

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Non-Cached-Deployment-Activity.png' alt="Artifactory-Non-Cached-Deployment-Activity" />

{@import ../../../reuse/apps/jfrog/artifactory-noncached.md}

### Artifactory - Request and Access

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Request-and-Access.png' alt="Artifactory-Request-and-Access" />

{@import ../../../reuse/apps/jfrog/artifactory-request-access.md}

### Artifactory - Traffic

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Traffic.png' alt="Artifactory-Traffic" />

{@import ../../../reuse/apps/jfrog/artifactory-traffic.md}

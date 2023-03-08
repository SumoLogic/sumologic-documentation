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

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Schematics.png')} alt="Artifactory-Schematics" />

## Fields creation in Sumo Logic for Artifactory

Following are the Tags which will be created as part of Artifactory App install if not already present.

**sumo.datasource** - Has fixed value of **artifactory**

## Prerequisite

This section provides instructions for configuring log collection for Artifactory for the Sumo Logic App.

The Sumo Logic App for Artifactory collects data from the following logs:

-   **artifactory.log** : The main Artifactory log file that contains data on Artifactory server activity.
-   **access.log** :  The security log containing important information about accepted and denied requests, configuration changes, and password reset requests. The originating IP address for each event is also recorded.
-   **request.log** :  Generic HTTP traffic information similar to the Apache HTTPd request log.
-   **traffic.log** :  A log that contains information about site traffic and file sizes.

For more details about Artifactory logs, refer to <https://www.jfrog.com/confluence/display/RTF/Artifactory+Log+Files> and [Artifactory Log Files](https://www.jfrog.com/confluence/display/RTF6X/Artifactory+Log+Files#ArtifactoryLogFiles-RequestLog).

Sumo Logic reads logs in the directory `/var/opt/jfrog/artifactory/logs`:

-   `artifactory.log`
-   `access.log`
-   `request.log`
-   `traffic.*.log`

To activate the `traffic.log` file, add the following parameter to your `artifactory.system.properties` file, located under `$ARTIFACTORY/etc` :

artifactory.traffic.collectionActive=true

A restart is required for traffic collection to take effect.

## Collection Configuration & App installation

As part of the setting up the collection process and app installation user can select the App from App Catalog and click on Install App. Please follow the steps below:

### Step1: Set up Collector

If you want to use an existing Otel Collector then this step can be skipped by selecting the option of using an existing Collector.

If you want to create a new Collector please select **Add a new Collector** option.

Select the platform for which you want to install the Sumo OpenTelemetry Collector.

This will generate a command which can be executed in the machine which needs to get monitored. Once executed it will install the Sumo Logic OpenTelemetry Collector agent.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Collector.png')} alt="Artifactory-Collector" />

### Step2: Configure integration

In this step we will be configuring the yaml required for the Artifactory Collection.

Path of the different log file configured to capture Artifactory logs is needed to be given here:

-   `artifactory.log`
-   `access.log`
-   `request.log`
-   `traffic.*.log`

You can add any custom fields which you want to tag along with the data ingested in sumo.

Click on the **Download YAML File** button to get the yaml file.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-YAML.png')} alt="Artifactory-YAML" />

### Step3: Sending logs to Sumo

Once you have the yaml file downloaded in step 2, please follow the below steps based on your platform

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
  ]}>

<TabItem value="Linux">

1.  Copy the yaml file to /etc/otelcol-sumo/conf.d/ folder in the Artifactory instance which needs to be monitored.
2.  restart the collector using
```sh
sudo systemctl restart otelcol-sumo
```
 </TabItem>
<TabItem value="Windows">

1.  Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2.  Restart the collector using
```sh
Restart-Service -Name OtelcolSumo
```
</TabItem>
<TabItem value="macOS">

1.  Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Artifactory instance which needs to be monitored.
2.  Restart the otelcol-sumo process using the below command
```sh
otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
```

</TabItem>
</Tabs>

After successful execution of the above command, Sumo will start receiving the data from your host machine.

Press **Next** .This will install the app to your Sumo Logic Org. The app consists of Dashboards.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but within 20 minutes, you'll see full graphs and map

### Sample Log Messages in Non-Kubernetes environments

```
2023-45-16 11:45:44,171 [a8bgdia2di2g80kh] [ACCEPTED DEPLOY] hortonworks-cache:org/apache/hadoop/hadoop-project/2.6.0-cdh5.4.4-SNAPSHOT/maven-metadata.xml for client : admin/195.186.216.125.
```

### Sample Query

This sample Query is from the **Artifactory - Artifactory - Cached Deployment Activity > Accepted Deploys** by Geolocation panel.

Query String

```sql
" %"sumo.datasource"=artifactory "ACCEPTED DEPLOY" "-cache"
|parse "[*] [*] *" as trace_id, event_type, user_info
| parse regex field=user_info "(?:(?<repo>[^:]*):(?<path>[^\s]*))?\s+(?<opt_msg>[\w\s:]+)?\s+(?<user>[^\/]+)\/(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\."
| where event_type = "ACCEPTED DEPLOY" and repo matches "*-cache"
| count  by ip | sort _count
| lookup longitude, latitude from geo://location on ip = ip
"
```

## Viewing JFrog Artifactory Dashboards

### Artifactory-Overview

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Overview.png')} alt="Artifactory-Overview" />

### Artifactory - Cached Deployment Activity

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Cached-Deployment-Activity.png')} alt="Artifactory-Cached-Deployment-Activity" />

### Artifactory - Download Activity

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Download-Activity.png')} alt="Artifactory-Download-Activity" />

### Artifactory - Non-Cached Deployment Activity

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Non-Cached-Deployment-Activity.png')} alt="Artifactory-Non-Cached-Deployment-Activity" />

### Artifactory - Request and Access

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Request-and-Access.png')} alt="Artifactory-Request-and-Access" />

### Artifactory - Traffic

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Artifactory-OpenTelemetry/Artifactory-Traffic.png')} alt="Artifactory-Traffic" />

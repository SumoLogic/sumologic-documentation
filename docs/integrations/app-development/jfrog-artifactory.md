---
id: jfrog-artifactory
title: JFrog Artifactory - Classic Collector
sidebar_label: JFrog Artifactory
description: Provides insight into your JFrog Artifactory binary repository.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/jfrog-Artifactory.png')} alt="Thumbnail icon" width="100"/>

JFrog Artifactory is a universal artifact repository manager that integrates with CI/CD and DevOps tools to provide artifact tracking. The Sumo Logic app for Artifactory 7 provides insight into your JFrog Artifactory binary repository. Our preconfigured dashboards provide an overview of your system as well as Traffic, Requests and Access, Download Activity, Cache Deployment Activity, and Non-Cached Deployment Activity.

If you _do not_ have a Sumo Logic account and want to get up and running quickly, the [JFrog Artifactory Sumo Logic integration](#if-you-do-not-have-a-sumo-logic-account) is the most convenient way to get started. It allows you to access Sumo Logic directly from Artifactory.

If you have an existing Sumo Logic account, you can still use the integration, however, this will create a secondary Sumo Logic account. To use your existing account, install the [Sumo Logic app for Artifactory](#installing-the-artifactory-app) instead of the integration and access your Artifactory data from Sumo Logic, rather than your Artifactory instance.  

## Prerequisites

* If you're using Artifactory Online, you'll need use the [integration](#artifactory-online-sumo-logic-integration) (our [app](#installing-the-artifactory-app) is not compatible with Artifactory Online).
* If you're using Artifactory On-Premise, you can use our [app](#installing-the-artifactory-app) or the [integration](#artifactory-online-sumo-logic-integration).

## Artifactory 7

This procedure documents how to collect logs from JFrog Artifactory 7 into Sumo Logic.


### Log types

For each JFrog service, you will find its active log files in the `$JFROG_HOME/<product>/var/log` directory. For consistency, each log file is prefixed by its service name and a dash, `<service-name>-service.log`. For example, artifactory-service.log and router-request.log.

* `artifactory-service.log`
* `artifactory-access.log`
* `artifactory-request.log`
* `artifactory-traffic.*.log`

For more information, see JFrog's [Artifactory Log Files](https://www.jfrog.com/confluence/display/JFROG/Logging) and [Access Logs](https://www.jfrog.com/confluence/display/JFROG/Access+Log) documentation.


### Sample log messages

```json title="Traffic"
20201322001341|d29f485ce89ehh3i|0|DOWNLOAD|167.208.229.190
|libs-release:org/springframework/spring-tx/maven-metadata.xml.sha1|117127
```

```json title="Request"
20201222001254|g104521a2b42cc3l|176.164.175.181|nitin|GET|/milestone/org/freemarker
/freemarker/maven-metadata.xml|404|761|86|1|curl/7.54.0
```

```json title="Access"
2020-13-22 00:13:33,014 [ACCEPTED DEPLOY]
jcenter-cache:com/cloudera/cdh/cdh-root/5.4.4-SNAPSHOT/maven-metadata.xml for client :
admin/149.5.95.40.
```


### Sample queries

```sql title="Requests by Repo"
_sourceCategory = Labs/artifactory/*
| where _sourceCategory matches "*artifactory/request"
| parse "*|*|*|*|*|*|*|*|*|*|*" as datetime, traceid, ip, user, method, path, status_code, response_size, request_size, response_time, user_agent
| where !(path matches "/ui*" ) and !(path matches "/webapp*")
| parse regex field=path "/(?<repo>[^\/]+).*" nodrop
| parse regex field=path "(?<with_api>/api/(?:(?:npm|ruby|deb|docker|vcs|bower|pypi)/|))(?<repo>[^\/]+)"
| count as count by repo
| sort by count
```

```sql title="Denied Login Attempts"
_sourceCategory = Labs/artifactory/* "login" DENIED
| where _sourceCategory matches "*artifactory/access"
| parse " [*] *" as event_type, user_info
| parse regex field=user_info "\s*for\s*\w+\s*:\s*(?<user>[^\/]+)\s*\/\s*(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\."| where event_type = "DENIED LOGIN"
| count as Attempts by ip, user
| sort by Attempts
```


```sql title="Most Active Locations"
_sourceCategory = Labs/artifactory/*
| where _sourceCategory matches "*artifactory/traffic"
| parse regex "(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})\|(?<traceid>\w+)\|\d*\|(?<direction>[^|]*)\|\s*(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[^|]*)\|(?<repo>[^:]*):(?<fullfilepath>[^|]*)\|(?<size>\d*)" nodrop
| where !isNull(ip) and ip != ""
| count as actions by ip
| lookup country_name, region, city from geo://location on ip = ip
| fields country_name, region, city, actions
| sort by actions | limit 10
```

### Collecting logs

#### Step 1: Activate the traffic.log file

1. To activate the **traffic.log** file, add the following parameter to your **artifactory.system.properties** file, located under **$ARTIFACTORY/etc**:
   ```bash
   $JFROG_HOME/artifactory/var/etc/artifactory/artifactory.system.properties
   ```
2. A restart is required for traffic collection to take effect.

#### Step 2: Configure a collector

Configure an [Installed Collector](/docs/send-data/installed-collectors).


#### Step 3: Configure sources

In this step, you configure four local file sources, one for each log source listed in the table below. When you create a file source for a log type:

* Use the value from the File Path column below as the **File Path** for the source.  
* The value you specify for the source's **Source Category** _must_ end with the suffix shown below in the Source Category column. For example, you could set the Source Category for the Artifactory Server log source to be `foo/artifactory/` console, but not `artifactory/console/foo`.

The following suffixes are required. For example, you could use `_sourceCategory=<Foo>/artifactory/console`, but the suffix **artifactory/console** must be used.

<table>
  <tr>
   <td><strong>Log source</strong></td>
   <td><strong>File Path</strong></td>
   <td><strong>Source Category</strong></td>
  </tr>
  <tr>
   <td>Artifactory Server and other microservices</td>
   <td>$JFROG_HOME/&#60;product&#62;/var/log/artifactory-service.log</td>
   <td>artifactory/console</td>
  </tr>
  <tr>
   <td>Access</td>
   <td>$JFROG_HOME/artifactory/var/artifactory/log/artifactory-access.log.</td>
   <td>artifactory/access</td>
  </tr>
  <tr>
   <td>Request</td>
   <td>$JFROG_HOME/&#60;product&#62;/var/log/artifactory-request.log</td>
   <td>artifactory/request</td>
  </tr>
  <tr>
   <td>Traffic</td>
   <td>$JFROG_HOME/&#60;product&#62;/var/log/artifactory-traffic.*.log</td>
   <td>artifactory/traffic</td>
  </tr>
</table>

:::note
Remember that `_sourceCategory` names are case sensitive. When you run a search using `_sourceCategory`, make sure you use the same case as you did when configuring the source.
:::

For complete instructions, see [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).

1. Configure a Local File source.
2. Configure the Source fields:
   * **Name** (required). A name is required.
   * **Description** (optional).
   * **Source Category**. (required)  
3. Configure the Advanced section:
   * **Enable Timestamp Parsing**. True.
   * **Time Zone**. Logs are in UTC by default.
   * **Timestamp Format**. Auto Detect.
   * **Encoding Type**. UTF-8.
   * **Multi-line Parsing**. Detect Messages Spanning Multiple Lines, Infer Boundaries.
4. Click **Save**.


## Artifactory Online Sumo Logic integration

The JFrog Artifactory Sumo Logic integration provides the ability to access preconfigured Sumo Logic Dashboards directly from Artifactory that will allow you to analyze data from your Artifactory logs.

**If you do not have an existing Sumo Logic account**, enable the JFrog Artifactory Sumo Logic integration directly from Artifactory. When you enable the integration, a Sumo Logic Connector and Source get automatically configured, and the Sumo Logic App for Artifactory gets installed automatically. The JFrog Artifactory Sumo Logic integration provides a new Sumo Logic Free account with a daily data volume limit of 500MB per day, with 30 users and 14 days of data retention.

**If you have an existing Sumo Logic account**, you can configure Artifactory Online to send data (described below) to an existing Sumo Logic [HTTP Logs and Metrics](/docs/send-data/hosted-collectors/http-source/logs-metrics) source.

### Collect Artifactory logs

The integration collects data from the following Artifactory logs:

* **artifactory.log**. The main Artifactory log file that contains data on Artifactory server activity.
* **access.log**. The security log containing important information about accepted and denied requests, configuration changes, and password reset requests. For each event, the originating IP address gets recorded.
* **request.log**. Generic HTTP traffic information similar to the Apache HTTPd request log.
* **traffic.*.log**. A log containing information about site traffic and file sizes.

For more details about Artifactory logs, refer to [JFrog's Artifactory Log Files](https://www.jfrog.com/confluence/display/RTF/Artifactory+Log+Files).

### Enable the integration

1. Log in to JFrog Artifactory.
1. Click the gear icon, then click **Artifactory.** <br/>![jfrog 1](/img/connection-and-integration/jfrog1.png)
1. Select **Log Analytics**.<br/>![jfrog 2](/img/connection-and-integration/jfrog2.png)
1. In the dialog **Enable Sumo Logic Integration**, click **Enable**.<br/>![jfrog 3](/img/connection-and-integration/jfrog3.png)

### If you do not have a Sumo Logic account

If you do not have an existing Sumo Logic account and it is your first time here:

1. Select **Create New Connection**.
1. Click **Access Dashboard**.
1. When the Sumo Logic page appears, select **I agree to the Service License Agreement**, and click **Access Dashboard**.<br/>![jfrog 4](/img/connection-and-integration/jfrog4.png)
1. When you see the message **Your Dashboards are being populated**, click **OK, Got It**.
1. To access your Artifactory dashboards, click **Library** > **Personal** > **Artifactory 7**.<br/><img src={useBaseUrl('img/connection-and-integration/jfrog5.png')} alt="jfrog5.png" width="300"/>

### If you have a Sumo Logic account

If you already have an existing Sumo Logic account created outside of Artifactory Online:

1. Select **Connection URL** and copy and paste the URL of an existing Sumo Logic [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics) in the **Connection URL** text box. <br/>![jfrog 7](/img/connection-and-integration/jfrog7.png)
1. Log in to Sumo Logic and verify that your logs are flowing in as expected.
1. Go to our **Apps Catalog**, search for **Artifactory**, then install the [Sumo Logic app for Artifactory 7](/docs/integrations/app-development/jfrog-artifactory) to get instant insight into your Artifactory logs. 

### If you have an existing connection

If you already have an existing connection set up via Artifactory Online:

1. The **Use Existing Client ID and Secret** radio button is selected, and keys will pre-populate automatically based on your previous configuration.
1. Click Access Dashboards to view Dashboards as you did before.<br/>![jfrog 6](/img/connection-and-integration/jfrog6.png)

## Field Extraction Rules

Here are Artifactory extraction rules that use different approaches.

```sql title="Traffic"
_sourceCategory=*artifactory*
| where _sourceCategory matches "*artifactory/traffic"
| parse regex "(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})\|\d*\|(?<direction>[^|]*)\|\s*(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[^|]*)\|(?<repo>[^:]*):(?<fullfilepath>[^|]*)\|(?<size>\d*)" nodrop
```

```sql title="Access Logs"
_sourceCategory=*artifactory*
| where _sourceCategory matches "*artifactory/access"
| parse "[*] *:* for */*" as what, repo, path, user, ip
```

```sql title="Request Logs"
_sourceCategory=*artifactory*
| where _sourceCategory matches "*artifactory/request"
| parse "*|*|*|*|*|*|*|*|*|*" as datetime, response_time, type, ip, user, method, path, protocol, status_code, size
```

## Installing the Artifactory app

Now that you have set up collection, install the Sumo Logic app for Artifactory to use the pre-configured searches and Dashboards that provide insight into your data.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing JFrog Artifactory dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

<img src={useBaseUrl('img/integrations/app-development/Art-Overview.png')} alt="JFROG artifactory" />

import JfrogOv from '../../reuse/apps/jfrog/artifactory-overview.md';

<JfrogOv/>

### Traffic

<img src={useBaseUrl('img/integrations/app-development/Art-Traffic.png')} alt="JFROG artifactory" />

import JfrogTr from '../../reuse/apps/jfrog/artifactory-traffic.md';

<JfrogTr/>

### Request and Access

<img src={useBaseUrl('img/integrations/app-development/artifactory_app_request_access.png')} alt="JFROG artifactory" />

import JfrogReq from '../../reuse/apps/jfrog/artifactory-request-access.md';

<JfrogReq/>

### Download Activity

<img src={useBaseUrl('img/integrations/app-development/Art-Download.png')} alt="JFROG artifactory" />

import JfrogDl from '../../reuse/apps/jfrog/artifactory-download.md';

<JfrogDl/>

### Cached Deployment Activity

<img src={useBaseUrl('img/integrations/app-development/Art-Cached.png')} alt="JFROG artifactory" />

import JfrogCache from '../../reuse/apps/jfrog/artifactory-cached.md';

<JfrogCache/>

### Non-Cached Deployment Activity

<img src={useBaseUrl('img/integrations/app-development/Art-Non-Cached.png')} alt="JFROG artifactory" />

import JfrogNon from '../../reuse/apps/jfrog/artifactory-noncached.md';

<JfrogNon/>

## Upgrade/Downgrade the Artifactory app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Artifactory app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## More Information

For more information about JFrog Artifactory, see [Using Node.js npm with Artifactory via the API and CLI (Sumo Logic DevOps blog)](https://www.sumologic.com/blog/using-node-js-npm-with-jfrog-artifactory-via-the-api-and-cli/).

For questions or help regarding the integration, see the [JFrog Artifactory documentation](https://jfrog.com/help/r/jfrog-platform-administration-documentation/sumo-logic) or contact [Sumo Logic Support](https://support.sumologic.com/support/s).

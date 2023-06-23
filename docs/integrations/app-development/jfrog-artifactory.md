---
id: jfrog-artifactory
title: JFrog Artifactory - Classic Collector
sidebar_label: JFrog Artifactory
description: Provides insight into your JFrog Artifactory binary repository.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/jfrog-Artifactory.png')} alt="Thumbnail icon" width="100"/>

The Sumo Logic App for Artifactory provides insight into your JFrog Artifactory binary repository. The App provides preconfigured Dashboards that include an Overview of your system, Traffic, Requests and Access, Download Activity, Cache Deployment Activity, and Non-Cached Deployment Activity.

The Sumo Logic App for Artifactory only supports Artifactory On-Premise. It does not work with Artifactory Online. The [JFrog Artifactory Sumo Logic integration](/docs/manage/connections-integrations/jfrog-artifactory.md) supports both Artifactory On-Premise and Artifactory Online.

:::note
* If you _do not_ have a Sumo Logic account, the [JFrog Artifactory Sumo Logic integration](/docs/manage/connections-integrations/jfrog-artifactory.md) is the most convenient way to start using Sumo Logic directly from Artifactory.
* If you _do_ have a Sumo Logic account, you can still use use the integration, but this will create a secondary Sumo Logic account. If you choose to use your current account, you can do so by installing the Sumo Logic App for Artifactory and access your Artifactory data from Sumo Logic, instead of from your Artifactory instance.  
:::

## Artifactory

### Log Types

The Sumo Logic App for Artifactory collects data from the following logs:

* **artifactory.log**. The main Artifactory log file that contains data on Artifactory server activity.
* **access.log**. The security log containing important information about accepted and denied requests, configuration changes, and password reset requests. The originating IP address for each event is also recorded.
* **request.log**. Generic HTTP traffic information similar to the Apache HTTPd request log.
* **traffic.log**. A log that contains information about site traffic and file sizes.

For more details about Artifactory logs, refer to [https://www.jfrog.com/confluence/display/RTF/Artifactory+Log+Files](https://www.jfrog.com/confluence/display/RTF/Artifactory+Log+Files) and [Artifactory Log Files](https://www.jfrog.com/confluence/display/RTF6X/Artifactory+Log+Files#ArtifactoryLogFiles-RequestLog).

Sumo Logic reads logs in the directory `/var/opt/jfrog/artifactory/logs`:
* `artifactory.log`
* `access.log`
* `request.log`
* `traffic.*.log`


### Sample Logs

```json
20170113185444|17|REQUEST|1.1.1.1|anonymous|GET|/cloudera-repos/org/slf4j/slf4j-log4j12/1.7.5/slf4j-log4j12-1.7.5.jar|HTTP/1.1|200|8869
```

```json
20170113185444|0|DOWNLOAD|1.1.1.1|cloudera-repos:org/apache/spark/spark-catalyst_2.11/2.0.1/spark-catalyst_2.11-2.0.1.jar.sha1|40
```

```json
2017-01-13 18:54:12,121 [ACCEPTED DEPLOY] pypi-remote-cache:.pypi/test.html for billythekid/1.1.1.1.
```

### Sample Queries

```sql title="Data Transfer Over Time"
_sourceCategory=*artifactory*
| where _sourceCategory matches "*artifactory/traffic"
| parse regex
"(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})\|\d*\|(?<direction>[^|]*)\|\s*(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[^|]*)\|(?<repo>[^:]*):(?<fullfilepath>[^|]*)\|(?<size>\d*)" nodrop
| timeslice 1h
| sum(size) by _timeslice, direction
| _sum / (1024 * 1024 * 1024) as sizeinGB | sort by _sum
| fields -_sum
| transpose row _timeslice column direction
```

```sql title="Requests by Status Code (Every 10 Minutes)"
_sourcecategory=*artifactory*
| where _sourceCategory matches "*artifactory/request"
| parse "*|*|*|*|*|*|*|*|*|*" as datetime, response_time, type, ip, user, method, path, protocol, status_code, size
| timeslice 10m
| count _timeslice, status_code | sort by _count
| transpose row _timeslice column status_code
```

```sql title="Unique Paths Accepted Deploys"
_sourceCategory=*artifactory* "ACCEPTED DEPLOY" "-cache"
| where _sourceCategory matches "*artifactory/access"
| parse "[*] *:* for */*" as what, repo, path, user, ip
| parse regex field=ip "(?<ip>.*)\."
| where what = "ACCEPTED DEPLOY" and repo matches "*-cache"
| timeslice 10m
| count_distinct(path) as paths by _timeslice
| outlier paths
```


### Collecting Logs

This section demonstrates how to collect logs from JFrog Artifactory into Sumo Logic.


#### Step 1: Activate the traffic.log file

To activate the **traffic.log** file, add the following parameter to your **artifactory.system.properties** file, located under **$ARTIFACTORY/etc**:
```bash
artifactory.traffic.collectionActive=true
```

A restart is required for traffic collection to take effect.

#### Step 2: Configure a Collector

Configure an [Installed Collector](/docs/send-data/installed-collectors).

#### Step 3: Configure Sources

In this step, you configure four local file sources, one for each log source listed in the table below. When you create a file source for a log type:

* Use the value from the File Path column below as the **File Path** for the source.  
* The value you specify for the source's **Source Category** _must_ end with the suffix shown below in the Source Category column. For example, you could set the Source Category for the Artifactory Server log source to be `foo/artifactory/console`, but not `artifactory/console/foo`.

The following suffixes are required. For example, you could use `_sourceCategory=<Foo>/artifactory/console`, but the suffix `artifactory/console` must be used.

<table><small>
  <tr>
   <td><strong>Log source</strong>
   </td>
   <td><strong>File Path</strong>
   </td>
   <td><strong>Source Category</strong>
   </td>
  </tr>
  <tr>
   <td>Artifactory Server
   </td>
   <td>/var/opt/jfrog/artifactory/logs/artifactory.log
   </td>
   <td>artifactory/console
   </td>
  </tr>
  <tr>
   <td>Access
   </td>
   <td>/var/opt/jfrog/artifactory/logs/access.log
   </td>
   <td>artifactory/access
   </td>
  </tr>
  <tr>
   <td>Request
   </td>
   <td>/var/opt/jfrog/artifactory/logs/request.log
   </td>
   <td>artifactory/request
   </td>
  </tr>
  <tr>
   <td>Traffic
   </td>
   <td>/var/opt/jfrog/artifactory/logs/traffic.*.log
   </td>
   <td>artifactory/traffic
   </td>
  </tr></small>
</table>

:::note
`_sourceCategory` names are case sensitive. When you run a search using `_sourceCategory`, make sure you use the same case as you did when configuring the source.
:::

For complete instructions, see [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).

1. Configure a Local File source.
2. Configure the Source fields:
    * **Name**. (Required) A name is required.
    * **Description** is optional.
    * **Source Category**. (Required)  
3. Configure the Advanced section:
    * **Enable Timestamp Parsing**. True
    * **Time Zone**. Logs are in UTC by default
    * **Timestamp Format**. Auto Detect
    * **Encoding Type**. UTF-8
    * **Multi-line Parsing**. Detect Messages Spanning Multiple Lines, Infer Boundaries
4. Click **Save**.


### Field Extraction Rules

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


## JFrog Artifactory 7

This procedure documents how to collect logs from JFrog Artifactory 7 into Sumo Logic.


### Log Types

For each JFrog service, you will find its active log files in the `$JFROG_HOME/<product>/var/log` directory. For consistency, each log file is prefixed by its service name and a dash, `<service-name>-service.log`. For example, artifactory-service.log and router-request.log.

* `artifactory-service.log`
* `artifactory-access.log`
* `artifactory-request.log`
* `artifactory-traffic.*.log`

For more information about Artifactory logs, see JFrog's [Artifactory Log Files,](https://www.jfrog.com/confluence/display/JFROG/Logging) [Access Logs](https://www.jfrog.com/confluence/display/JFROG/Access+Log).


### Sample Logs

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


### Sample Queries

```bash title="Requests by Repo"
_sourceCategory = Labs/artifactory/*
| where _sourceCategory matches "*artifactory/request"
| parse "*|*|*|*|*|*|*|*|*|*|*" as datetime, traceid, ip, user, method, path, status_code, response_size, request_size, response_time, user_agent
| where !(path matches "/ui*" ) and !(path matches "/webapp*")
| parse regex field=path "/(?<repo>[^\/]+).*" nodrop
| parse regex field=path "(?<with_api>/api/(?:(?:npm|ruby|deb|docker|vcs|bower|pypi)/|))(?<repo>[^\/]+)"
| count as count by repo
| sort by count
```

```bash title="Denied Login Attempts"
_sourceCategory = Labs/artifactory/* "login" DENIED
| where _sourceCategory matches "*artifactory/access"
| parse " [*] *" as event_type, user_info
| parse regex field=user_info "\s*for\s*\w+\s*:\s*(?<user>[^\/]+)\s*\/\s*(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\."| where event_type = "DENIED LOGIN"
| count as Attempts by ip, user
| sort by Attempts
```


```bash title="Most Active Locations"
_sourceCategory = Labs/artifactory/*
| where _sourceCategory matches "*artifactory/traffic"
| parse regex "(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})\|(?<traceid>\w+)\|\d*\|(?<direction>[^|]*)\|\s*(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[^|]*)\|(?<repo>[^:]*):(?<fullfilepath>[^|]*)\|(?<size>\d*)" nodrop
| where !isNull(ip) and ip != ""
| count as actions by ip
| lookup country_name, region, city from geo://location on ip = ip
| fields country_name, region, city, actions
| sort by actions | limit 10
```

### Collecting Logs

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
* The value you specify for the source's **Source Category** _must_ end with the suffix shown below in the Source Category column. For example, you could set the Source Category for the Artifactory Server log source to be `foo/artifactory/console, but not artifactory/console/foo`

The following suffixes are required. For example, you could use `_sourceCategory=<Foo>/artifactory/console`, but the suffix **artifactory/console** must be used.

<table><small>
  <tr>
   <td><strong>Log source</strong>
   </td>
   <td><strong>File Path</strong>
   </td>
   <td><strong>Source Category</strong>
   </td>
  </tr>
  <tr>
   <td>Artifactory Server and other microservices
   </td>
   <td>$JFROG_HOME/&#60;product&#62;/var/log/artifactory-service.log
   </td>
   <td>artifactory/console
   </td>
  </tr>
  <tr>
   <td>Access
   </td>
   <td>$JFROG_HOME/artifactory/var/artifactory/log/artifactory-access.log.
   </td>
   <td>artifactory/access
   </td>
  </tr>
  <tr>
   <td>Request
   </td>
   <td>$JFROG_HOME/&#60;product&#62;/var/log/artifactory-request.log
   </td>
   <td>artifactory/request
   </td>
  </tr>
  <tr>
   <td>Traffic
   </td>
   <td>$JFROG_HOME/&#60;product&#62;/var/log/artifactory-traffic.*.log
   </td>
   <td>artifactory/traffic
   </td>
  </tr></small>
</table>

:::note
Remember that `_sourceCategory` names are case sensitive. When you run a search using `_sourceCategory`, make sure you use the same case as you did when configuring the source.
:::

For complete instructions, see [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).

1. Configure a Local File source.
2. Configure the Source fields:
   * **Name**. (Required) A name is required.
   * **Description** is optional.
   * **Source Category**. (Required)  
3. Configure the Advanced section:
   * **Enable Timestamp Parsing**. True
   * **Time Zone**. Logs are in UTC by default
   * **Timestamp Format**. Auto Detect
   * **Encoding Type**. UTF-8
   * **Multi-line Parsing**. Detect Messages Spanning Multiple Lines, Infer Boundaries
4. Click **Save**.

## Installing the Artifactory App

Now that you have set up collection, install the Sumo Logic App for Artifactory to use the pre-configured searches and Dashboards that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing JFrog Artifactory Dashboards

### Overview

<img src={useBaseUrl('img/integrations/app-development/Art-Overview.png')} alt="JFROG artifactory" />

{@import ../../reuse/apps/jfrog/artifactory-overview.md}

### Traffic

<img src={useBaseUrl('img/integrations/app-development/Art-Traffic.png')} alt="JFROG artifactory" />

{@import ../../reuse/apps/jfrog/artifactory-traffic.md}

### Request and Access

<img src={useBaseUrl('img/integrations/app-development/artifactory_app_request_access.png')} alt="JFROG artifactory" />

{@import ../../reuse/apps/jfrog/artifactory-request-access.md}

### Download Activity

<img src={useBaseUrl('img/integrations/app-development/Art-Download.png')} alt="JFROG artifactory" />

{@import ../../reuse/apps/jfrog/artifactory-download.md}

### Cached Deployment Activity

<img src={useBaseUrl('img/integrations/app-development/Art-Cached.png')} alt="JFROG artifactory" />

{@import ../../reuse/apps/jfrog/artifactory-cached.md}

### Non-Cached Deployment Activity

<img src={useBaseUrl('img/integrations/app-development/Art-Non-Cached.png')} alt="JFROG artifactory" />

{@import ../../reuse/apps/jfrog/artifactory-noncached.md}

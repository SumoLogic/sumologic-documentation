---
id: index
title: Sumo Logic App for Apache
sidebar_label: Apache
description: Gives insight into website visitor behavior patterns, monitors server operations, and assists in troubleshooting issues that span entire web server farms.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/web-servers/apache.png')} alt="Web servers icon" width="100"/>

The Apache app is a unified logs and metrics app that helps you monitor the availability, performance, health and resource utilization of Apache web server farms. Preconfigured dashboards and searches provide insight into visitor locations, visitor access types, traffic patterns, errors, web server operations, resource utilization and access from known malicious sources.


## Log Types and metrics
The Sumo Logic App for Apache assumes:
* The [NCSA extended/combined log file format ](http://httpd.apache.org/docs/current/mod/mod_log_config.html) has been configured for Apache access logs and the default error log format for Apache Access logs and Apache Error logs. For a list of metrics that are collected and used by the app, see [Apache Metrics](/docs/integrations/web-servers/apache/collect-logs-metrics#Apache-Metrics).

* The **Apache - Overview** dashboard is based on both Apache logs and metrics.
* Dashboards in the Metrics folder are based on Apache metrics alone.
* Dashboards and searches in the Logs folder are based on Apache access and error logs

## Apache app searches
The predefined searches in the Apache app are based on the Apache Access logs and Apache Error logs.

### Searches based on Apache Access logs
* Apache - All HTTP Response codes with their count
* Apache - Client Errors (4xx response codes) per day
* Apache - HTTP status code summary over time
* Apache - Malicious URL requests
* Apache - Robots
* Apache - Slowest URLs by average time
* Apache - Time taken to serve requests
* Apache - Top 404 referrers
* Apache - Top browsers
* Apache - Top clients
* Apache - Top clients causing errors responses
* Apache - Top URLs by bytes served
* Apache - Traffic volume and bytes served per day


### Search based on Apache Error logs
* Apache - Critical log messages
* Apache - Log Level counts
* Apache - Server start and stop events
* Apache - Server stops and starts over time
* Apache - Top error reasons
* Apache - Top files causing errors
* Apache - Top Referrers causing errors


import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>

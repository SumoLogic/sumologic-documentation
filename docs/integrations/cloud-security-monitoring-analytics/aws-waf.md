---
id: aws-waf
title: AWS WAF Cloud Security Monitoring and Analytics
sidebar_label: AWS WAF
description: A guide to the Sumo Logic AWS WAF Security Analytics App.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/waf.png')} alt="Thumbnail icon" width="60"/>

AWS WAF (web application firewall) data is a rich source of security findings, as it allows you to monitor the HTTP and HTTPS requests that are forwarded to CloudFront and let you control overall access to your content. Each dashboard within this application takes a different lens on AWS WAF data, from traffic patterns to threat intelligence, allowing you to truly identify the needles in the haystack that drives critical security concerns within your AWS infrastructure.

## Collecting Logs for AWS WAF Security Analytics

To configure Collection for AWS WAF App, follow the instructions from [Collecting Logs for the AWS WAF App](/docs/integrations/amazon-aws/waf#collecting-logs-for-the-aws-waf-app).

## Installing the AWS WAF Security Analytics App

Now that you have set up collection for AWS WAF, install the Sumo Logic App for AWS WAF to use the pre-configured searches and dashboards.

{@import ../../reuse/apps/app-install.md}

## Viewing AWS WAF Security Monitoring Dashboards

### AWS WAF - Security Monitoring - Overview

See an overview of threats detected and traffic passing through AWS WAF.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/AWS-WAF-Security-Monitoring-Overview.png')} alt="AWS WAF dashboards" />

**Traffic Map.** Geolocation heat map of inbound and outbound traffic passing through the WAF.

**Traffic Trend.** Line chart comparing the volume of blocked and allowed connections.

**IP Count.** Line chart of unique IP addresses connecting over time.

**URI Hits.** Table of directory and file paths connected to sorted by frequency.

**All Traffic by Rule Type. **Column chart of connections by WAF rule type.

**HTTP Versions.** Donut chart showing the total number of connections broken down by HTTP versions.

**All Traffic by Rule ID.** Table showing connections sorted by most frequent rule ID.

**HTTP Methods.** Donut chart showing the total number of connections broken down by HTTP methods.


### AWS WAF - Security Analytics - Traffic

See details of threats allowed and blocked by AWS WAF.

img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/AWS-WAF-Security-Analytics-Traffic.png')} alt="AWS WAF dashboards" />

**Traffic by Geographic Location. **Each section contains the same panels with the only difference being traffic allowed or blocked.

**Traffic by Location. **Geolocation heatmap of locations. Zoom into the map for additional details of the location.

**Traffic by Country.** Column chart of connections by country over time. Multiple countries can be selected by clicking on one or more countries in the legend at the bottom.

**Anomalies Within Traffic.** Line chart of connections over time. The grey thresholds show three standard deviations based on the last ten means. Pink triangles show values outside the thresholds that represent anomalies.

**Traffic by Rule Type. **Donut chart of connections broken down by rule type.

**Traffic by Rule ID.** A table detailing rule IDs of connections sorted by frequency.


### AWS WAF - Security Analytics - Threat Intelligence

See details of allowed and blocked AWS WAF traffic that matches the built-in Sumo Logic threat IP list.

img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/AWS-WAF-Security-Analytics-Threat-Intelligence.png')} alt="AWS WAF dashboards" />

**Unique Threats Map.** Geolocation heatmap of connection locations.

**Threats Trend.** Line chart of connections over time.

**Threats by Actors. **Donut chart showing the ratios of connections attributed to particular threat actor groups.

**Traffic by Threat Confidence. **Donut chart showing the ratios of connections broken down by confidence levels.

**Threat Breakdown by Sources. **Donut chart showing the ratios of connections broken down by source categories.

**Traffic by Malicious IPs.** Table showing details of connections keyed off of remote IP address.

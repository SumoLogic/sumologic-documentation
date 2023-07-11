---
id: aws-security-hub
title: AWS Security Hub Cloud Security Monitoring and Analytics
sidebar_label: AWS Security Hub
description: The Sumo Logic AWS Security Hub app is designed to extract key findings from the AWS Security Hub, which is designed to centrally view and manage security alerts and automate security checks.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/security-qs.png')} alt="Thumbnail icon" width="50"/>

The Sumo Logic AWS Security Hub app is designed to extract key findings from the AWS Security Hub, which is designed to centrally view and manage security alerts and automate security checks. The additional level of analysis within these dashboards surfaces the most relevant findings and takes a focused approach to improve overall security posture. Finding types and severity levels act as leading indicators for security engineers to go into security incidents with the most relevant technical details to address active threats.

## Collecting Findings

To set up Collection, follow the instructions provided at [Collect findings for the AWS Security Hub App](/docs/integrations/amazon-aws/security-hub.md).

## Installing the AWS Security Hub App

Now that you've set up ingested and collected findings for AWS Security Hub, you can install the Sumo Logic App for AWS Security Hub and use the preconfigured searches and [Dashboards](#viewing-aws-security-hub-dashboards) that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing AWS Security Hub Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that narrow search results across the entire dashboard.


### AWS Security Hub - Security Monitoring - Overview

See the overview of Security Hub findings broken down by severity. Filters are available to limit the dashboard panels to specific account IDs, finding IDs, finding types, normalized severity, and title.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/AWS-Security-Hub-Security-Monitoring-Overview.png')} alt="AWS Security Hub dashboards" />


#### Findings Summary

**All Security Findings**. See the count of total findings of the last 24 hours by default or the dashboard time window setting.

**Findings by Severity.** Line chart showing the relative volumes of findings over the last 24 hours by default or the dashboard time window setting separated by severity.

**Last 20 Findings**. Provides a table detailing the 20 most recent findings.


#### Critical, High, Medium, Low Severity Findings

All panels for Critical, High, Medium, and Low Severity findings are the same. The only difference is filtering based on the listed severity level.

**Severity Findings**. See the count of findings at this severity over the last 24 hours by default or the dashboard time window setting.

**Severity Outliers**. Review the trending volume of findings at this severity level over the last 24 hours by default or the dashboard time window setting. The gray thresholds show ranges within 3 standard deviations of the past 10 mean values. Pink triangles show values that exceed that threshold and are likely points of investigation considering the large change in volume of findings.

**Last 20 Severity Findings**. See the details of the last 20 findings at this severity level.


### AWS Security Hub - Security Analytics - Compliance

See the overview of Security Hub findings broken down by compliance status. Filters are available to limit the dashboard panels to specific account IDs, finding IDs, finding types, normalized severity, title, and compliance status.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/AWS-Security-Hub-Security-Analytics-Compliance.png')} alt="AWS Security Hub dashboards" />


#### Findings Summary

**All Compliance Findings**. See the count of total findings of the last 24 hours by default or the dashboard time window setting.

**Compliance Breakdown.** Line chart showing the relative volumes of findings over the last 24 hours by default or the dashboard time window setting separated by severity. One or more compliance statuses can be filtered by selecting the status from the legend at the bottom of the chart.

**Last 20 Compliance Findings**. Provides a table detailing the 20 most recent findings.


#### Failed, Warning, Not Available, Success, and Passed Findings.  

All panels for each section of findings are the same. The only difference is filtering based on the compliance status.

**Compliance Findings**. See the count of findings at this status over the last 24 hours by default or the dashboard time window setting.

**Severity Outliers**. Review the trending volume of findings at this severity level over the last 24 hours by default or the dashboard time window setting. The gray thresholds show ranges within 3 standard deviations of the past 10 mean values. Pink triangles show values that exceed that threshold and are likely points of investigation considering the large change in volume of findings.

**Last 20 Severity Findings**. See the details of the last 20 findings at this severity level.

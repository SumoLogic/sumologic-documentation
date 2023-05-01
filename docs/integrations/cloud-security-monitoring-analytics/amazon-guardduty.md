---
id: amazon-guardduty
title: Amazon GuardDuty Cloud Security Monitoring and Analytics
sidebar_label: Amazon GuardDuty
description: Guide to Amazon GuardDuty Cloud Security Monitoring and Analytics.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Amazon_GuardDuty_Benchmark.png')} alt="Thumbnail icon" width="70"/>

The focus of GuardDuty is on protecting AWS accounts, workloads, and data with intelligent threat detection. The corresponding Sumo Logic dashboards are designed to surface the most relevant security insights from that data to yield actionable processes to tackle specific security concerns within your AWS infrastructure. Utilizing this app allows you to stay ahead of changing attack surfaces in a repeatable way via cloud security monitoring and analytics dashboards that provide operational security awareness for Amazon GuardDuty data sources.

## Collecting Logs

See [Collecting Logs for the Amazon GuardDuty App](/docs/integrations/amazon-aws/guardduty#Collect-Logs-for-the-Amazon-GuardDuty-App).

## Installing the Amazon GuardDuty Cloud Security Monitoring and Analytics App

Now that you have set up the collection for Amazon GuardDuty, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app, do the following:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see the Install the Apps from the Library.
3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing the Amazon GuardDuty Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that narrow search results across the entire dashboard.

### Overview - Security Monitoring

See the overview of GuardDuty threats broken down by severity. Filters are available to limit the dashboard panels to specific account IDs, regions, and resource types.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Amazon-GuardDuty-Overview-Security-Monitoring.png')} alt="Amazon GuardDuty dashboards" />


### Findings Summary

**Total Findings**. See the count of total findings in the past hour with a sparkline showing the trending of the last 24 hours by default or the dashboard time window setting.                                                 

**Trending All Findings.** Line chart showing the relative volumes of findings over the last 24 hours by default or the dashboard time window setting separated by severity.

**Last 20 Findings**. Provides a table detailing the most recent findings.


#### High, Medium, Low Severity Findings

Note all panels for High, Medium, and Low Severity findings are the same. The only difference is filtering based on the listed severity level.

**Severity Findings Last Hour**. See the count of findings at this severity in the last hour with a sparkline showing the trending of the last 24 hours by default or the dashboard time window setting.

**Severity Outliers**. Review the trending volume     of findings at this severity level over the last 24 hours by default or the dashboard time window setting. The gray thresholds show ranges within 4 standard deviations of the past 5 mean values. Pink triangles show values that exceed that threshold and are likely points of investigation considering the large change in volume of findings.

**Last 20 Severity Findings**. See the details of the last 20 findings at this severity level.


#### Amazon GuardDuty Analysis - Security Analytics

See the details and trending of GuardDuty findings including the severity, threat purpose, threat name , account id, region, resource type, and description. Additionally for more detailed analysis all dashboard panels can be filtered by threat purpose, threat name , severity, region, resource type, and account ID.

**Details - Latest Findings.** Review a table of the most recent findings. Each column can be sorted and the pagination controls at the bottom can be used to review additional findings.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Amazon-GuardDuty-Analysis-Security-Analytics.png')} alt="Amazon GuardDuty dashboards" />

#### Trending

**Findings by Threat Purpose**. This column chart shows the relative volumes of findings broken down by threat purpose which describes the primary purpose of a threat, an attack type or a stage of a potential attack. Multiple threat purposes can be filtered by selecting one or more threat purposes from the legend on the right of the chart.

**Findings by Threat Name**. This column chart shows the relative volumes of findings broken down by threat name which describes the overall threat or potential malicious activity that GuardDuty is detecting. Multiple threat names can be filtered by selecting one or more threat names from the legend on the right of the chart.

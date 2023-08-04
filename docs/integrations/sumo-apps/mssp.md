---
id: mssp
title: MSSP App (Beta)
sidebar_label: MSSP
description: The MSSP App uses Cloud SIEM data to summarize the security status of Managed Security Service Provider organizations.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

The MSSP App has dashboards that Managed Service Security Providers use to provide security services to their customers. The dashboards use [Cloud SIEM](/docs/cse) data to summarize the security status of the MSSP’s customers, who are shown as [organizations](/docs/manage/manage-subscription/create-manage-orgs-service-providers) in the dashboards. MSSP managers and administrators can use the information in the dashboards to perform triage and to assign resources to investigate and remediate potential security issues with their organizations. 

## Collecting logs for the MSSP App

To collect logs for use with the MSSP App, you must set up log collection for Cloud SIEM. See [CSE Ingestion Best Practices](/docs/cse/ingestion/cse-ingestion-best-practices) for guidance. 

## Installing the MSSP App​

{@import ../../reuse/apps/app-install.md}

## Viewing MSSP App dashboards

### MSSP - Collector Health Issues

This dashboard lets you know if collectors are successfully sending information to Cloud SIEM. 

<img src={useBaseUrl('img/integrations/sumo-apps/mssp-collector-health-issues.png')} alt="Collector Health Issues dashboard" width="600"/>

**org_name**. Select the organization to view information for. Enter ***** to view data for all organizations.

**Number of Orgs**. The number of organizations with collector health issues.

**Number of Resources Impacted**. The number of collectors with health issues.

**Health Event Types**. The types of collector health events, including reasons for the events.

**Impacted Resource Details**. Details about the collectors with health issues.

**Health Events Trend**. The number of health events recorded over time. 

**Latest Health Failure Summary**. A summary of recent collector health events from most recent to oldest.

### MSSP - Credits

This dashboard shows your credit usage, including per [data tier](/docs/manage/partitions-data-tiers/data-tiers).

<img src={useBaseUrl('img/integrations/sumo-apps/mssp-credits.png')} alt="Credits dashboard" width="600"/>

The following fields show the default [burn down rates](/docs/integrations/sumo-apps/data-volume#set-up-burndown-rates-for-consumables) for each data tier. (If your burn down rates differ, enter the correct rates. Check with your account executive for the burn down rates on your account.)
* **FrequentTierBurndownRate**
* **InfrequentBurndownRate**
* **ContinuousTierBurndownRate**
* **CSETierBurndownRate**

**timeslice**. The time period of credit usage to display in the dashboard.

**org_name**. Select the organization to view information for. Enter ***** to view data for all organizations.

**Infrequent Tier**. Credit usage per organization for the Infrequent data tier.

**Frequent Tier**. Credit usage per organization for the Frequent data tier.

**Continuous Tier**. Credit usage per organization for the Continuous data tier.

**CSE Tier**. Credit usage per organization for the Cloud SIEM tier.

**Credits Usage Trend - CSE**. Credit usage over time per organization for the Cloud SIEM data tier.

**Credits Usage Trend - Continuous**. Credit usage over time per organization for the Continuous data tier.

**Credits Usage Trend - Frequent**. Credit usage over time per organization for the Frequent data tier.

**Credits Usage Trend - Infrequent**. Credit usage over time per organization for the Infrequent data tier.

### MSSP - Failed Records Analysis

This dashboard shows you information about [Records](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo) that failed to get processed.

<img src={useBaseUrl('img/integrations/sumo-apps/mssp-failed-records-analysis.png')} alt="Failed Records Analysis dashboard" width="600"/>

**org_name**. Select the organization to view information for. Enter ***** to view data for all organizations.

**timeslice**. The time period to view failed records for. 

**Failed Records Count by Organizations**. The number of Records that failed to be processed per organization.

**Failed by _sourceCategory**. The number of Records that failed to be processed per [_sourceCateory](/docs/send-data/reference-information/metadata-naming-conventions/#source-category).

**Failed Reasons**. Reasons why Records failed, from most frequent to least.

**Failed by _sourceCategory Trend**. Record failures over time per [_sourceCateory](/docs/send-data/reference-information/metadata-naming-conventions/#source-category). 

**Failed Records - Outlier**. Unexpected failed Records identified using the [outlier](/docs/search/search-query-language/search-operators/outlier) search operator.

**Failed Reasons Trend**. Reasons over time why Records failed.

**Failed Records Summary**. A summary of recent failed Records from most to least frequent.

**Failed Records by _sourceCategory**. Details of failed Records per [_sourceCateory](/docs/send-data/reference-information/metadata-naming-conventions/#source-category).

**Last 1000 Failed Records**. Failed Records listed in descending date order.

### MSSP - Ingest Summary

This dashboard provides rates of data ingestion.

<img src={useBaseUrl('img/integrations/sumo-apps/mssp-ingest-summary.png')} alt="Ingest Summary dashboard" width="600"/>

**org_name**. Select the organization to view information for. Enter ***** to view data for all organizations.

#### Total Ingest

These panels show log ingestion rate in gigabytes. 

**Average Ingestion by Orgs**. The average per day log ingestion rate by organization. 

**Average Ingest Trend by Orgs**. The number of gigabytes ingested over time by organization.

**Average Ingestion - Outlier by Orgs**. Unexpected ingestion rates identified using the [outlier](/docs/search/search-query-language/search-operators/outlier) search operator.

#### Breakdown by Data Tiers

These panels present the same information as shown in Total Ingest above, but broken down by [data tier](/docs/manage/partitions-data-tiers/data-tiers):
* **Continuous**
* **CSE**
* **Infrequent**
* **Frequent**

### MSSP - Ingestion by Source Category

This dashboard provides rates of data ingestion presented by [_sourceCateory](/docs/send-data/reference-information/metadata-naming-conventions/#source-category).

<img src={useBaseUrl('img/integrations/sumo-apps/mssp-ingestion-by-source-category.png')} alt="Ingest Summary by Source Category dashboard" width="600"/>

**org_name**. Select the organization to view information for. Enter ***** to view data for all organizations.

**tier**. Select the [data tier](/docs/manage/partitions-data-tiers/data-tiers) to view information for. Enter ***** to view data for all tiers.

**Top 10 Sources by Daily Ingest**. The source categories with the highest levels of log ingestion.

**Ingestion Trend**. Log ingestion amounts over time by source category. 

**Top 10 Sources Trend**. The source categories with the highest log ingestion.

**Source Category No Longer Sending Data (1d Time Comparison)**. Source categories that did not send data for a day during the selected time period. 


### MSSP - Insights

This dashboard shows information on [Insights](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui), including the number created, updated, or closed.

<img src={useBaseUrl('img/integrations/sumo-apps/mssp-insights.png')} alt="Insights dashboard" width="600"/>

**org_name**. Select the organization to view information for. Enter ***** to view data for all organizations.

**Insights - Created**. The number of Insights [generated](/docs/cse/get-started-with-cloud-siem/insight-generation-process) in the selected time period. 

**Insights - Updated**. The number of Insights that received updates in the selected time period.

**Insights - Closed**. The number Insights [closed](/docs/cse/administration/manage-custom-insight-resolutions#about-insight-resolutions) in the selected time period.

**Insights - Created by Orgs**. The number of Insights generated per organization in the selected time period.

**Insights - Updated by Org**. The number of Insights that received updates per organization in the selected time period.

**Insights - Closed by Org**. The number Insights closed per organization in the selected time period.

**Insights by Latest Status**. The most recent Insights by [status](/docs/cse/administration/manage-custom-insight-statuses#view-insight-statuses).

**Insights - Average Time to Respond**. The average time it took to respond to an Insight. Response time is defined as the time it took before a change was made to the Insight, such as assignment or new status.

**Insights - Average Time to Remediate**. The average time it took to [resolve an Insight](/docs/cse/administration/manage-custom-insight-resolutions#about-insight-resolutions).

**Insights - Average Time to Respond by Orgs**. The average time it took to respond to an Insight, by organization.

**Insights - Average Time to Remediate by Orgs**. The average time it took to resolve an Insight, by organization. 

**Insights Closed by User**. The number of Insights [closed](/docs/cse/administration/manage-custom-insight-resolutions#about-insight-resolutions) during the time period, listed by user.

**Insights Created Tren**d. The number of Insights [generated](/docs/cse/get-started-with-cloud-siem/insight-generation-process) over time per organization.

**Insights Closed Trend**. The number of Insights closed over time per organization.

**Insights Created - Outlier**. Unexpected Insight generated as identified using the [outlier](/docs/search/search-query-language/search-operators/outlier) search operator.

**Insights Closed - Outlier**. Unexpected Insights closed as identified using the outlier search operator.

### MSSP - Signals Analysis

This dashboard shows information about the Signals generated, including Signal details and trends.

<img src={useBaseUrl('img/integrations/sumo-apps/mssp-signals-analysis.png')} alt="Signals Analysis dashboard" width="600"/>

**org_name**. Select the organization to view information for. Enter ***** to view data for all organizations.

**Signals**. The number of Signals recorded for the time period set in the panel. To change the time period, click the clock icon.

**Signals by Organizations**. The number of Signals recorded per organization.

**Signals Count - 4 Hours Time Comparison Window**. The number of Signals recorded for every 4-hour period in the last 24 hours. (Choosing another time period in the filter simply shows the Signals recorded in ⅙ increments of the time period selected.)

**Signals Trend by Organization**. The number of Signals recorded over time per organization.

**Signals Count Trend - Outlier by Orgs**. Unexpected Signal counts identified using the [outlier](/docs/search/search-query-language/search-operators/outlier) search operator.

**Signals Details**. Detailed information about each Signal recorded in the specified time period. Click the three-dot button in the upper right corner of the panel to open the data in log search.

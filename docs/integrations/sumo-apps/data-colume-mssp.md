---
id: data-volume-mssp
title: Sumo Logic Data Volume for MSSP
sidebar_label: Data Volume for MSSP
description: The Data Volume for MSSP App provides you with a summary and detailed views of child orgs under a MSSP org's data usage volume by data type, tier, category, collector, source name, and hosts via predefined searches and dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/volumeview.png')} alt="Thumbnail icon" width="75"/>

The Data Volume for MSSP App provides you with a summary and detailed views of child orgs under a MSSP org's, data usage volume by data type, tier, category, collector, source name, and hosts via predefined searches and dashboards.

## Installing the Data Volume for MSSP app

### Prerequisite

The Data Volume Index (`sumologic_volume`) should be enabled in all the child org's which needs to be monitored through this app in MSSP org, prior to installation. See [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/log-tracing-data-volume-index/) for instructions.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing Data Volume Dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

:::note
By default no child orgs will be selected in the dashboard and data will be populated against the data volume index of MSSP org. To select child orgs can be selected though a drop down menu on top left corner of the dashboard just below the title of the dashboard. You can also search by org name in this dropdown menu.
:::

<img src={useBaseUrl('img/integrations/sumo-apps/child-org-filter.png')} alt="Data Volume for MSSP dashboards" />

<ViewDashboards/>

### Overview

The **Data Volume for MSSP - Overview** dashboard helps you understand child org's ingest in terms of Logs (by Tiers), Metrics, and Tracing capabilities.

Use this dashboard to:
* Identify the top sources, collectors, or hosts by ingesting data volume across logs, metrics, and traces by child orgs.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Overview.png')} alt="Data Volume for MSSP dashboards" />


### Logs

The largest data ingest typically comes from log volumes. The **Data Volume for MSSP - Logs** dashboard allows you to view child org's log ingest volume by tier by ingesting spikes, outliers, and quota.

Use this dashboard to:
* Determine the log ingest volume and trends in GB across various tiers.
* Identify spikes where current hour ingestion is above 50% from the last hour. Identify outliers and forecast your data ingestion.
* Determine the log data for default index and top non-default indexes.
* Compare current ingestion to capacity and review any overages. You must configure the “Daily_Log_Ingest_Capacity” variable based on child org's Accounts Subscription. See the Administration > Organizations > Manage Accounts tab to get child org's capacity values.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Logs.png')} alt="Data Volume for MSSP dashboards" />


### Data Volume for MSSP Logs by Metadata Fields

The **Data Volume for MSSP - Logs** by Metadata Fields dashboard allows you to view log ingest volume by tier, source categories, collectors, and hosts for child orgs

Use this dashboard to:
* Identify the top 5 sources categories, source hosts, and collectors by ingest volume for selected child org(s)
* Examine ingestion trends over time

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Logs-by-Metadata-Fields.png')} alt="Data Volume for MSSP dashboards" />


### Metrics

The **Data Volume for MSSP - Metrics** dashboard allows you to view your metrics ingested, identifies ingest outliers/spikes, and helps predict what ingestion is going to be for child orgs.

Use this dashboard to:
* Determine the ingested DPM by various dimensions.
* Examine trends over time.
* Identify the spikes where current hour ingestion is above 50% from the last hour.
* Identify ingestion outliers and forecast data ingestion, analyze the comparison of your current ingestion to your capacity, and review any overages. You must configure the “Metric_DPM_Ingest_Capacity”  for selected child org needs to be configured based on Account Subscription. See the Administration > Organizations > Manage Accounts tab to get child org's capacity values.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Metrics.png')} alt="Data Volume for MSSP dashboards" style={{border: '1px solid gray'}}  />

### Log Spikes

The **Data Volume for MSSP - Log Spikes**  Dashboard helps you quickly identify significant increases in data ingested for child org(s). Review details of your data ingested for logs.

Use this dashboard to:
* Identify ingest outliers
* Determine the spikes for top sources compared with the previous day

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Log-Spikes.png')} alt="Data Volume for MSSP dashboards" />


### Capacity Utilization

The **Data Volume for MSSP - Capacity Utilization** dashboard provides views of subscribed, actual, and percentage capacity utilization for logs and metrics.

Use this dashboard to:
* Identify the log and metrics ingestion capacity of your subscription. You must configure the "Daily_Log_Ingest_Capacity" and “Metric_DPM_Ingest_Capacity” variables for selected child org based on there plan with Sumo Logic. See the Administration > Organizations > Manage Accounts tab to get child org's capacity values.
* Identify the average ingestion and subscribed ingestion capacity by percentage for logs and metrics.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Capacity-Utilization.png')} alt="Data Volume for MSSP dashboards" />


### Tracing

The **Data Volume for MSSP - Tracing** dashboard provides views of your Tracing data ingest by billed bytes and span counts per minute for child orgs.

Use this dashboard to:
* Determine the ingested billedBytes/spansCount for tracing and examine trends over time.
* Identify spikes in ingestion, where ingestion for the current hour is above by 50% from the last hour.
* Identify the outliers (and forecast your data ingestion).
* Identify the top 5 source categories, source hosts, sources, and collectors by span count and billed bytes.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Tracing.png')} alt="Data Volume for MSSP dashboards" />

## Upgrade/Downgrade the Data Volume for MSSP app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Data Volume for MSSP app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

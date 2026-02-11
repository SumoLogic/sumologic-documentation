---
id: data-volume
title: Sumo Logic Data Volume App
sidebar_label: Data Volume
description: The Data Volume App provides you with a summary and detailed views of your account's data usage volume by data type, tier, category, collector, source name, and hosts via predefined searches and dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/volumeview.png')} alt="Thumbnail icon" width="75"/>

The Data Volume App provides you with a summary and detailed views of your account's data usage volume by data type, tier, category, collector, source name, and hosts via predefined searches and dashboards.

## Installing the Data Volume app

### Prerequisite

Enable the Data Volume Index (`sumologic_volume`) prior to installation. See [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/log-tracing-data-volume-index/) for instructions.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing Data Volume Dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Data Volume - Overview** dashboard helps you understand your ingest in terms of Logs (by Tiers), Metrics, and Tracing capabilities.

Use this dashboard to:
* Identify the top sources, collectors, or hosts by ingesting data volume across logs, metrics, and traces

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-Overview.png')} alt="Data volume dashboards" />


### Logs

The largest data ingest typically comes from log volumes. The **Data Volume - Logs** dashboard allows you to view your log ingest volume by tier by ingesting spikes, outliers, and quota.

Use this dashboard to:
* Determine the log ingest volume and trends in GB across various tiers.
* Identify spikes where current hour ingestion is above 50% from the last hour. Identify outliers and forecast your data ingestion.
* Determine the log data for default index and top non-default indexes.
* Compare current ingestion to capacity and review any overages. You must configure the “Daily_Log_Ingest_Capacity” variable based on your Account Subscription. If you have  Credit based plan, please check with your account executive to determine these values for your account. Otherwise, see the [**Account Overview**](/docs/manage/manage-subscription/sumo-logic-credits-accounts/#account-overview) page to get your capacity values.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-Logs.png')} alt="Data volume dashboards" />


### Data Volume Logs by Metadata Fields

The **Data Volume - Logs** by Metadata Fields dashboard allows you to view log ingest volume by tier, source categories, collectors, and hosts.

Use this dashboard to:
* Identify the top 5 sources categories, source hosts, and collectors by ingest volume
* Examine ingestion trends over time

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-Logs-by-Metadata-Fields.png')} alt="Data volume dashboards" />


### Metrics

The **Data Volume - Metrics** dashboard allows you to view your metrics ingested, identifies ingest outliers/spikes, and helps predict what ingestion is going to be.

Use this dashboard to:
* Determine the ingested DPM by various dimensions.
* Examine trends over time.
* Identify the spikes where current hour ingestion is above 50% from the last hour.
* Identify ingestion outliers and forecast data ingestion, analyze the comparison of your current ingestion to your capacity, and review any overages. You must configure the “Metric_DPM_Ingest_Capacity”  variable that needs to be configured based on Account Subscription. If you have a Credit-based plan, please check with your account executive to determine these values for your account. Otherwise, see the [**Account Overview**](/docs/manage/manage-subscription/sumo-logic-credits-accounts/#account-overview) page to see your Capacity Values.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-Metrics.png')} alt="Data volume dashboards" style={{border: '1px solid gray'}}  />

### Log Spikes

The **Data Volume - Log Spikes**  Dashboard helps you quickly identify significant increases in data ingested. Review details of your data ingested for logs.

Use this dashboard to:
* Identify ingest outliers
* Determine the spikes for top sources compared with the previous day

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-Log-Spikes.png')} alt="Data volume dashboards" />


### Capacity Utilization

The **Data Volume - Capacity Utilization** dashboard provides views of subscribed, actual, and percentage capacity utilization for logs and metrics.

Use this dashboard to:
* Identify the log and metrics ingestion capacity of your subscription. You must configure the "Daily_Log_Ingest_Capacity" and “Metric_DPM_Ingest_Capacity” variables based on your plan with Sumo Logic. If you have a Credit-based plan, please check with your account executive to determine these values for your account. Otherwise, see the [**Account Overview**](/docs/manage/manage-subscription/sumo-logic-credits-accounts/#account-overview) page to view the log ingest capacity value and metric DPM ingest capacity value.
* Identify the average ingestion and subscribed ingestion capacity by percentage for logs and metrics.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-Capacity-Utilization.png')} alt="Data volume dashboards" />


### Tracing

The **Data Volume - Tracing** dashboard provides views of your Tracing data ingest by billed bytes and span counts per minute.

Use this dashboard to:
* Determine the ingested billedBytes/spansCount for tracing and examine trends over time.
* Identify spikes in ingestion, where ingestion for the current hour is above by 50% from the last hour.
* Identify the outliers (and forecast your data ingestion).
* Identify the top 5 source categories, source hosts, sources, and collectors by span count and billed bytes.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-Tracing.png')} alt="Data volume dashboards" />

## Create monitors for the Sumo Logic Data Volume app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Data Volume app alerts

| Name  | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Data Volume - Daily plan limit alert` | This alert is generated when the daily account log ingest for the previous day is greater than the defined threshold.  | Count > 100     | Count < = 100     |
| `Data Volume - Daily plan limit alert by collector` | This alert is triggered if the account log ingestion for any collector on the previous day exceeds the configured threshold.  | Count > 5   | Count < = 5 |
| `Data Volume - Data not sent alert`   | This alert is triggered when a collector has not sent any data for longer than the configured threshold (60 minutes by default). | Count > 60      | Count < = 60      |
| `Data Volume - Monthly plan limit alert`   | This alert is generated when total log ingest for the current billing period reaches 85% or more (configurable). Ensure the query is updated with `daily_gb_limit` (GB/day) and `billing_start / billing_end` (day of month) before enabling. | Count > 85      | Count < = 85      |
| `Data Volume - Usage spike alert`  | This alert is generated when the current hour’s ingestion (GB) for a source category exceeds its highest hourly volume from the past four weeks by the set threshold percentage value. | Count > 50      | Count < = 50      |

## Upgrade/Downgrade the Data Volume app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Data Volume app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

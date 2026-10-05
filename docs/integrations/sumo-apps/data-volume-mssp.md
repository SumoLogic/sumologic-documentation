---
id: data-volume-mssp
title: Sumo Logic Data Volume for MSSP
sidebar_label: Data Volume for MSSP
description: The Data Volume for MSSP app provides you with a summary and detailed views of data usage volume for child orgs under a MSSP org by data type, tier, category, collector, source name, and hosts via predefined searches and dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/volumeview.png')} alt="Volume View icon" width="75"/>

The Data Volume for MSSP app provides you with a summary and detailed views of data usage volume for child orgs under a MSSP org by data type, tier, category, collector, source name, and hosts via predefined searches and dashboards.

## Installing the Data Volume for MSSP app

### Prerequisite

The Data Volume Index (`sumologic_volume`) should be enabled in all the child orgs that need to be monitored through this app in an MSSP org, prior to installation. See [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/) for instructions.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing Data Volume dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

:::note
By default no child orgs will be selected in the dashboard and data will be populated against the data volume index of the MSSP org. Child orgs can be selected though a dropdown menu on the top left corner just below the title of the dashboard. You can also search by org name in this dropdown menu.
:::

<img src={useBaseUrl('img/integrations/sumo-apps/child-org-filter.png')} alt="Data Volume for MSSP dashboards" alt="Dropdown menu to select child orgs" style={{border: '1px solid gray'}} width="600" />

<ViewDashboards/>

### Overview

The **Data Volume for MSSP - Overview** dashboard helps you understand child org ingest in terms of logs (by tiers), metrics, and tracing capabilities.

Use this dashboard to identify the top sources, collectors, or hosts by ingesting data volume across logs, metrics, and traces by child orgs.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Overview.png')} alt="Data Volume for MSSP dashboards" style={{border: '1px solid gray'}} width="800" />

### Logs

The largest data ingest typically comes from log volumes. The **Data Volume for MSSP - Logs** dashboard allows you to view child org log ingest volume by tier by ingesting spikes, outliers, and quota.

Use this dashboard to:
* Determine the log ingest volume and trends in GB across various tiers.
* Identify spikes where current hour ingestion is above 50% from the last hour. Identify outliers and forecast your data ingestion.
* Determine the log data for default index and top non-default indexes.
* Compare current ingestion to capacity and review any overages. You must configure the `Daily_Log_Ingest_Capacity` variable based on child org Accounts Subscription. To get child org capacity values, in the [**New UI**](/docs/get-started/sumo-logic-ui/) go to **Organizations > Manage Accounts**, or in the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/) go to **Administration > Organizations > Manage Accounts**.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Logs.png')} alt="Data Volume for MSSP dashboards" style={{border: '1px solid gray'}} width="800" />

### Data Volume for MSSP Logs by Metadata Fields

The **Data Volume for MSSP - Logs by Metadata Fields** dashboard allows you to view log ingest volume by tier, source categories, collectors, and hosts for child orgs.

Use this dashboard to:
* Identify the top 5 sources categories, source hosts, and collectors by ingest volume for selected child orgs.
* Examine ingestion trends over time.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Logs-by-Metadata-Fields.png')} alt="Data Volume for MSSP dashboards" style={{border: '1px solid gray'}} width="800" />

### Metrics

The **Data Volume for MSSP - Metrics** dashboard allows you to view your metrics ingested, identifies ingest outliers/spikes, and helps predict what ingestion is going to be for child orgs.

Use this dashboard to:
* Determine the ingested DPM by various dimensions.
* Examine trends over time.
* Identify the spikes where current hour ingestion is above 50% from the last hour.
* Identify ingestion outliers and forecast data ingestion, analyze the comparison of your current ingestion to your capacity, and review any overages. You must configure the `Metric_DPM_Ingest_Capacity` variable for the selected child org based on Account Subscription. To get child org capacity values, in the [**New UI**](/docs/get-started/sumo-logic-ui/) go to **Organizations > Manage Accounts**, or in the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/) go to **Administration > Organizations > Manage Accounts**.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Metrics.png')} alt="Data Volume for MSSP dashboards" style={{border: '1px solid gray'}} width="800" />

### Log Spikes

The **Data Volume for MSSP - Log Spikes** dashboard helps you quickly identify significant increases in data ingested for child orgs. Review details of your data ingested for logs.

Use this dashboard to:
* Identify ingest outliers.
* Determine the spikes for top sources compared with the previous day.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Log-Spikes.png')} alt="Data Volume for MSSP dashboards" style={{border: '1px solid gray'}} width="800" />

### Capacity Utilization

The **Data Volume for MSSP - Capacity Utilization** dashboard provides views of subscribed, actual, and percentage capacity utilization for logs and metrics.

Use this dashboard to:
* Identify the log and metrics ingestion capacity of your subscription. You must configure the `Daily_Log_Ingest_Capacity` and `Metric_DPM_Ingest_Capacity` variables for the selected child orgs based on their plans with Sumo Logic. To get child org capacity values, in the [**New UI**](/docs/get-started/sumo-logic-ui/) go to **Organizations > Manage Accounts**, or in the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/) go to **Administration > Organizations > Manage Accounts**.
* Identify the average ingestion and subscribed ingestion capacity by percentage for logs and metrics.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Capacity-Utilization.png')} alt="Data Volume for MSSP dashboards" style={{border: '1px solid gray'}} width="800" />

### Tracing

The **Data Volume for MSSP - Tracing** dashboard provides views of your tracing data ingest by billed bytes and span counts per minute for child orgs.

Use this dashboard to:
* Determine the ingested billedBytes/spansCount for tracing and examine trends over time.
* Identify spikes in ingestion, where ingestion for the current hour is above by 50% from the last hour.
* Identify the outliers (and forecast your data ingestion).
* Identify the top 5 source categories, source hosts, sources, and collectors by span count and billed bytes.

<img src={useBaseUrl('img/integrations/sumo-apps/Data-Volume-MSSP-Tracing.png')} alt="Data Volume for MSSP dashboards" style={{border: '1px solid gray'}} width="800" />

## Upgrade/Downgrade the Data Volume for MSSP app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Data Volume for MSSP app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

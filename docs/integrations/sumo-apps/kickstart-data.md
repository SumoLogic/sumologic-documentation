---
id: kickstart-data
title: Sumo Logic Kickstart Data
sidebar_label: Kickstart Data
description: The Sumo Logic Kickstart Data app offers real-time insights for monitoring telemetry data from the OpenTelemetry Demo Astronomy application.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/Sumo-Logic-Kickstart-Data-Icon.png')} alt="Thumbnail icon" width="100"/>

The Sumo Logic Kickstart Data app offers real-time insights for monitoring telemetry data from our OpenTelemetry Demo Astronomy application. Featuring predefined searches and dashboards, this app enhances visibility into application performance and operational metrics.

:::info
Kickstart Data comes preloaded for new trial users and expires automatically after 20 days or when you begin ingesting your own data—whichever comes first. [Learn more](/docs/get-started/quickstart/#getting-started-with-kickstart-data-in-your-trial).
:::

## Application Data

This app uses the [Sumo Logic Kickstart Data source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sumo-logic-kickstart-data-source) to collect the data from OpenTelemetry Demo Astronomy Application.

## Installing the Sumo Logic Kickstart Data app

The Kickstart Data app is pre-installed for all users upon creation of a [new organization](/docs/manage/manage-subscription/create-and-manage-orgs).

1. Navigate to **App Catalog > Installed Apps** to find the Kickstart app.
1. Click the **Kickstart Data** app tile.
1. Go to **What's Included > Dashboards: View content in Library** to preview the dashboards.

<details>
<summary>If you do not see the app, follow these steps (click to expand).</summary>

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

</details>

## Viewing Sumo Logic Kickstart Data dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Sumo Logic Kickstart Data - Application Health

The **Sumo Logic Logic Kickstart Data - Application Health** dashboard provides details on user journey, interface performance, and internal server metrics for an e-commerce application.

Use this dashboard to:
* Monitor the user journey funnel from home page visits to completed payments, identifying potential drop-off points in the conversion process.
* Track key performance indicators such as page load times, transaction times, and error rates for critical application components like the home page, checkout, and payment processes.
* Correlate spikes in transaction times with potential increases in errors to quickly identify and troubleshoot performance issues affecting user experience.
* Analyze the relationship between order volumes and order transaction times to ensure the internal server can handle peak loads efficiently.

<img src={useBaseUrl('img/integrations/sumo-apps/Sumo-Logic-Kickstart-Data-Application-Health-Dashboard.png')} style={{border: '1px solid gray'}} alt="test" />

### Sumo Logic Kickstart Data - Business KPIs

The **Sumo Logic Kickstart Data - Business KPIs** dashboard provides details on revenue metrics, geographical distribution, and user journey time for business performance analysis.

Use this dashboard to:
* Monitor revenue trends and forecast future earnings to make informed business decisions.
* Analyze revenue distribution across different geographical regions to identify high-performing markets and areas for expansion.
* Compare actual user journey time against expected values to optimize user experience and identify potential bottlenecks in the customer flow.
* Correlate revenue trends with user journey time to understand how user experience impacts business performance.

<img src={useBaseUrl('img/integrations/sumo-apps/Sumo-Logic-Kickstart-Data-Business-KPIs-Dashboard.png')} style={{border: '1px solid gray'}} alt="test" />

### Sumo Logic Kickstart Data - Security

The **Sumo Logic Kickstart Data - Security** dashboard provides details on security events and failed sign-in attempts across multiple geographical locations. This dashboard enables users to monitor and analyze security-related data in real-time.

Use this dashboard to:
* Identify potential security threats by visualizing the geolocation of clients and the volume of activity from different regions.
* Compare failed sign-in events between today and yesterday for specific user accounts, helping to detect unusual patterns or potential brute-force attacks.
* Monitor the total number of failed sign-in events over the last 6 hours, allowing for quick identification of spikes in unsuccessful login attempts.

<img src={useBaseUrl('img/integrations/sumo-apps/Sumo-Logic-Kickstart-Data-Security-Dashboard.png')} style={{border: '1px solid gray'}} alt="test" />

## Create monitors for the Sumo Logic Kickstart Data app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

## Upgrading the Sumo Logic Kickstart Data app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Sumo Logic Kickstart Data app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

:::note For admins
If you're done exploring Kickstart Data and want to purge it from your environment and Sumo Logic account, follow the steps under [How to manage or remove Kickstart Data](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sumo-logic-kickstart-data-source#how-to-manage-or-remove-kickstart-data).
:::

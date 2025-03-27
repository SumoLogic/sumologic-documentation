---
id: kickstart-data
title: Sumo Logic Kickstart Data
sidebar_label: Sumo Logic Kickstart Data
description: The Sumo Logic Kickstart Data app offers real-time insights for monitoring telemetry data from the OpenTelemetry Demo Astronomy application.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

<img src={useBaseUrl('img/integrations/sumo-apps/Sumo-Logic-Kickstart-Data-Icon.png')} alt="Thumbnail icon" width="75"/>

The Sumo Logic Kickstart Data app offers real-time insights for monitoring telemetry data from the OpenTelemetry Demo Astronomy application. Featuring predefined searches and dashboards, this app enhances visibility into application performance and operational metrics.

## Application Data

This app uses [Sumo Logic Kickstart Data source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sumo-logic-kickstart-data-source) to collect the data from OpenTelemetry Demo Astronomy Application.

## Installing the Sumo Logic Kickstart Data app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

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

Sumo Logic Kickstart Data - Business KPIs dashboard provides details on revenue metrics, geographical distribution, and user journey time for business performance analysis.

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

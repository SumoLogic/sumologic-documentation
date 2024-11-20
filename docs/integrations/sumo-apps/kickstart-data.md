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

### Application Health

The **Sumo Logic Kickstart Data - Application Health** dashboard provides a comprehensive view of the application's performance and operational metrics. It includes key indicators such as CPU and memory usage, transaction times for checkouts and payments, error rates, and service latency. Additionally, it displays deployment logs, user journeys, and error logs, allowing users to quickly identify issues and monitor the overall health of the application.

<img src={useBaseUrl('img/integrations/sumo-apps/Sumo-Logic-Kickstart-Data-Application-Health-Dashboard.png')} style={{border: '1px solid gray'}} alt="test" />

### Business KPIs

The **Sumo Logic Kickstart Data - Business KPIs** dashboard focuses on critical business performance metrics. It tracks customer satisfaction, support tickets, revenue trends, and promotional offers redeemed. This dashboard also monitors customer churn rates and cart abandonment rates, providing insights into user engagement and revenue distribution globally. These metrics help businesses make informed decisions to enhance customer experiences and drive growth.

<img src={useBaseUrl('img/integrations/sumo-apps/Sumo-Logic-Kickstart-Data-Business-KPIs-Dashboard.png')} style={{border: '1px solid gray'}} alt="test" />

## Create monitors for the Sumo Logic Kickstart Data app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

## Upgrading the Sumo Logic Kickstart Data app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Sumo Logic Kickstart Data app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

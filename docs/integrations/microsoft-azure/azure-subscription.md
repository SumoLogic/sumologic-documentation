---
id: azure-subscription
title: Azure Subscription
keywords: 
 - azure subscription
 - subscription in azure
 - azure subscription monitoring
 - azure subscription metrics
description: This document outlines what an Azure Subscription is, how to set it up with Sumo Logic, and how to install and view the pre-configured Sumo Logic Azure dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-subscription.png')} alt="Thumbnail icon" width="50"/>

The Sumo Logic app for Azure Subscription allows you to collect, analyze, and monitor cloud activity logs in one centralized platform. This improves security, operational visibility, and compliance monitoring.

[Azure Subscription](https://docs.azure.cn/en-us/azure-resource-manager/management/overview) is a foundational, logical container that grants access to Microsoft Azure cloud services, acting as the primary boundary for billing, security, and resource management.

## Metric types

For Azure Subscription, you can collect the following metrics:

* **Latency**. Latency data for all requests to the Azure Subscription.
* **Traffic**. Traffic data for all requests to the Azure Subscription.

For more information on the supported metrics schema, refer to [Azure documentation](https://docs.azure.cn/en-us/azure-resource-manager/management/monitor-resource-manager-reference#metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Event Hub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

### Configure collector

Create a hosted collector if not already configured and tag the `tenant_name` field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). Make sure you create the required sources in this collector. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

## Installing the Azure Subscription app

Now that you have set up data collection, install the Azure Subscription Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation process, the following fields will be created by default:

- `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
- `location`. The region to which the resource name belongs.
- `subscription_name`. name associated with a subscription where the resource is present.
- `provider_name`. Azure resource provider name (for example, Microsoft.Network).
- `resource_type`. Azure resource type (for example, azureSubscriptions).

## Viewing the Azure Subscription dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Latency

The **Azure Subscription - Latency** dashboard provides details like average subscription latency, operational latency, and region based api latency of the subscription API.

Use this dashboard to:

- Monitor overall and region-based API latency to ensure optimal application performance.
- Identify high-latency regions and status code classes impacting user experience.
- Track latency trends over time to detect performance degradation or anomalies.
- Analyze latency patterns to support troubleshooting and performance optimization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureSubscription/Azure-Subscription-Latency.png')} alt="Azure Subscription Latency" style={{border: '1px solid gray'}} width="800" />

### Traffic

The **Azure Subscription - Traffic** dashboard provides details like average subscription traffic, operational traffic, and region based api traffic of the subscription API.

Use this dashboard to:

- Monitor total and average traffic across regions to understand usage patterns.
- Analyze traffic distribution by status code class to identify error spikes or abnormal behavior.
- Track traffic trends over time for demand forecasting and capacity planning.
- Detect sudden traffic surges or drops that may indicate service issues or external impacts.

    <img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureSubscription/Azure-Subscription-Traffic.png')} alt="Azure Subscription Traffic" style={{border: '1px solid gray'}} width="800" />


## Create monitors for Azure Subscription

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Subscription alerts

These alerts are metric-based and will work for all Azure Subscriptions.

| Alert Name | Alert Description and Conditions | Recover Condition |
|:--|:--|:--|:--|
| `Azure Subscription - ARM Latency SLO Breach (Subscription‑wide)` | This alert is triggered when Azure Resource Manager is slow for your whole subscription, and latency is greater than 2000 milliseconds. | Critical: `> 2000`<br/>Warning: `> 1500` | Critical: `<= 2000`<br/>Warning: `<= 1500` |
| `Azure Subscription - ARM Error-Rate Spike (4XX or 5XX)` | This alert is triggered when failing ARM operations, deployments, reads, and policy calls at the subscription level are detected, and their count is greater than 100. | Critical: `> 100`<br/>Warning: `> 75` | Critical: `<= 100`<br/>Warning: `<= 75` |

## Upgrade/Downgrade the Azure Subscription app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Subscription app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).

## Additional resources

- Blog: [Azure monitoring and troubleshooting](https://www.sumologic.com/blog/azure-services-monitoring)
- Glossary: [Microsoft Azure](https://www.sumologic.com/glossary/microsoft-azure)

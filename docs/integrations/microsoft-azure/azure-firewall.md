---
id: azure-firewall
title: Azure Firewall
keywords: 
 - azure firewall
 - firewall in azure
 - azure network security
 - azure firewall monitoring
 - azure firewall logs
description: This document outlines what Azure Firewall is, how to set it up with Sumo Logic, and how to install and view the pre-configured Sumo Logic Azure dashboards.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-firewall.png')} alt="Thumbnail icon" width="50"/>

[Azure Firewall](https://learn.microsoft.com/en-us/azure/firewall/overview) is a cloud-native and intelligent network firewall security service that provides threat protection for your cloud workloads running in Azure. It's a fully stateful firewall as a service with built-in high availability and unrestricted cloud scalability. This integration helps in monitoring firewall health, network rules, application rules, threat intelligence, and IDPS (Intrusion Detection and Prevention System) events.

## Log and metric types

For Azure Firewall, you can collect the following logs and metrics:

* **Azure Firewall Application Rule**. Contains all application rule log data. Each match between the data plane and the application rule creates a log entry with the data plane packet and the matched rule's attributes.
* **Azure Firewall Network Rule Aggregation (Policy Analytics)**. Contains aggregated application rule log data for Policy Analytics.
* **Azure Firewall DNS Flow Trace Log**. Contains all the DNS proxy data between the client, firewall, and DNS server.
* **Azure Firewall DNS query**. Contains all DNS proxy events log data.
* **Azure Firewall Fat Flow Log**. This query returns the top flows across Azure Firewall instances. Log contains flow information, date transmission rate (in megabits per second units), and the time period when the flows were recorded. Follow the documentation to enable Top Flow logging and details on how it is recorded.
* **Azure Firewall Flow Trace Log**. Flow logs across Azure Firewall instances. Log contains flow information, flags, and the time period when the flows were recorded. Please follow the documentation to enable flow trace logging and details on how it is recorded.
* **Azure Firewall FQDN Resolution Failure**. Contains all internal Firewall FQDN resolution requests that resulted in failure.
* **Azure Firewall IDPS Signature**. Contains all data plane packets that were matched with one or more IDPS signatures.
* **Azure Firewall Nat Rule**. Contains all DNAT (Destination Network Address Translation) events log data. Each match between the data plane and the DNAT rule creates a log entry with the data plane packet and the matched rule's attributes.
* **Azure Firewall Nat Rule Aggregation (Policy Analytics)**. Azure Firewall Nat Rule Aggregation (Policy Analytics).
* **Azure Firewall Network Rule**. Contains all Network Rule log data. Each match between the data plane and network rule creates a log entry with the data plane packet and the matched rule's attributes.
* **Azure Firewall Application Rule Aggregation (Policy Analytics)**. Contains aggregated network rule log data for Policy Analytics.
* **Azure Firewall Threat Intelligence**. Contains all Threat Intelligence events.
* **Azure Firewall Metrics**. These metrics are available in [Microsoft.Network/azureFirewalls](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-network-azurefirewalls-metrics) namespace.

For more information on supported metrics and logs schema, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/firewall/monitor-firewall-reference).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Event Hub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Firewall you want to monitor. You can forward logs to the same event hub, provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Firewall/Logs` and `Azure/Firewall/Metrics`.

### Configure collector

Create a hosted collector if not already configured and tag the `tenant_name` field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). Make sure you create the required sources in this collector. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the diagnostic settings in the Azure portal, refer to [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics).
3. Follow the steps below for each Azure Firewall that you want to monitor.
   1. Choose **Stream to an event hub** as the destination.
   1. Select the log categories you want to collect
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
   <img src={useBaseUrl('img/send-data/azure-firewall-diagnostic-settings.png')} alt="Azure Firewall diagnostic settings" style={{border: '1px solid gray'}} width="800" />
4. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Firewall Tag Location" style={{border: '1px solid gray'}} width="500" />

#### Activity logs (optional)

import ActivityLogs from '../../reuse/apps/azure-activity-logs.md';

<ActivityLogs/>

## Installing the Azure Firewall app

Now that you have set up data collection, install the Azure Firewall Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation process, the following fields will be created by default:

- `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
- `location`. The region to which the resource name belongs.
- `subscription_id`. ID associated with a subscription where the resource is present.
- `resource_group`. The resource group name where the Azure resource is present.
- `provider_name`. Azure resource provider name (for example, Microsoft.Network).
- `resource_type`. Azure resource type (for example, azureFirewalls).
- `resource_name`. The name of the resource (for example, firewall name).
- `service_type`. The type of service that can be accessed with an Azure resource.
- `service_name`. Services that can be accessed with an Azure resource.

As part of the app installation process, the following FERs will be created by default:
### Azure location extraction FER

   ```sql
   Rule Name: AzureLocationExtractionFER
   Applied at: Ingest Time
   Scope (Specific Data): tenant_name=*
   ```

   ```sql title="Parse Expression"
   json "location", "properties.resourceLocation", "properties.region" as location, resourceLocation, service_region nodrop
   | replace(toLowerCase(resourceLocation), " ", "") as resourceLocation
   | if (!isBlank(resourceLocation), resourceLocation, location) as location
   | if (!isBlank(service_region), service_region, location) as location 
   | if (isBlank(location), "global", location) as location
   | fields location
   ```

#### Resource ID extraction FER

   ```sql
   Rule Name: AzureResourceIdExtractionFER
   Applied at: Ingest Time
   Scope (Specific Data): tenant_name=*
   ```

   ```sql title="Parse Expression"
   json "resourceId", "ResourceId" as resourceId1, resourceId2 nodrop
   | if (isBlank(resourceId1), resourceId2, resourceId1) as resourceId
   | toUpperCase(resourceId) as resourceId
   | parse regex field=resourceId "/SUBSCRIPTIONS/(?<subscription_id>[^/]+)" nodrop
   | parse field=resourceId "/RESOURCEGROUPS/*/" as resource_group nodrop
   | parse regex field=resourceId "/PROVIDERS/(?<provider_name>[^/]+)" nodrop
   | parse regex field=resourceId "/PROVIDERS/[^/]+(?:/LOCATIONS/[^/]+)?/(?<resource_type>[^/]+)/(?<resource_name>.+)" nodrop
   | parse regex field=resource_name "(?<parent_resource_name>[^/]+)(?:/PROVIDERS/[^/]+)?/(?<service_type>[^/]+)/?(?<service_name>.+)" nodrop
   | if (isBlank(parent_resource_name), resource_name, parent_resource_name) as resource_name
   | fields subscription_id, location, provider_name, resource_group, resource_type, resource_name, service_type, service_name
   ```

## Viewing the Azure Firewall dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

The **Azure Firewall - Overview** dashboard provides a high-level summary of firewall health, performance, and security posture.

Use this dashboard to:

- Monitor firewall health status, SNAT port utilization, and average latency to ensure optimal performance.
- Track threat intelligence matches, IDPS alerts, and network rule actions for security posture assessment.
- Analyze throughput, capacity units, data processed, and rule hit counts for capacity planning and optimization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Overview.png')} alt="Azure Firewall Overview" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure Firewall - Administrative Operations** dashboard provides visibility into Azure Resource Manager operations performed on the firewall resource.

Use this dashboard to:

- Monitor the distribution of operation types (Read, Write, Delete) and their success rates to ensure proper functioning of your firewall.
- Identify potential issues by analysing the top 10 operations causing errors and correlating them with specific users or applications.
- Track recent write and delete operations to maintain an audit trail of configuration changes made to your firewall resource.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Administrative-Operations.png')} alt="Azure Firewall Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Application Rules

The **Azure Firewall - Application Rules** dashboard provides visibility into application layer (L7) traffic filtering and web content control.

Use this dashboard to:

- Monitor application rule actions (Allow/Deny) and protocol distribution to understand traffic patterns.
- Identify denied requests by location and analyse reasons for troubleshooting connectivity issues.
- Track top source IPs, TLS inspection status, and web categories for comprehensive FQDN-based traffic analysis.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Application-Rules.png')} alt="Azure Firewall Application Rules" style={{border: '1px solid gray'}} width="800" />

### Network Rules

The **Azure Firewall - Network Rules** dashboard provides detailed insights into network layer (L4) traffic filtering.

Use this dashboard to:

- Monitor network rule actions distribution and protocol distribution to understand traffic patterns.
- Identify top denied source/destination IPs and analyze deny reasons to troubleshoot connectivity issues.
- Track critical port access attempts and top rules triggered for security monitoring and rule optimization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Network-Rules.png')} alt="Azure Firewall Network Rules" style={{border: '1px solid gray'}} width="800" />

### NAT Rules

The **Azure Firewall - NAT Rules** dashboard provides insights into Destination NAT (DNAT) translations for inbound traffic routing.

Use this dashboard to:

- Monitor NAT translations by protocol and track NAT activity over time to understand inbound connectivity patterns.
- Identify top source IPs using NAT and analyze NAT rule details for traffic routing optimisation.
- Track critical port access attempts and visualize source/destination locations for security monitoring.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-NAT-Rules.png')} alt="Azure Firewall NAT Rules" style={{border: '1px solid gray'}} width="800" />

### Threat Intelligence

The **Azure Firewall - Threat Intelligence** dashboard provides visibility into malicious traffic detected by Microsoft's threat intelligence feed.

Use this dashboard to:

- Monitor threat actions distribution and protocol-based threats to assess security posture.
- Identify top threat source/destination IPs and threat FQDNs to investigate security incidents.
- Analyze TLS inspection status and threat descriptions for detailed security analysis and incident response.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Threat-Intelligence.png')} alt="Azure Firewall Threat Intelligence" style={{border: '1px solid gray'}} width="800" />

### IDPS

The **Azure Firewall - IDPS** (Intrusion Detection and Prevention System) dashboard provides comprehensive monitoring of signature-based threat detection.

Use this dashboard to:

- Monitor IDPS events distribution by severity and actions (Alert/Deny) to assess security posture.
- Identify top attack sources, destinations, and signature IDs to investigate security incidents.
- Analyze high-severity alerts (Severity 1-2) and top IDPS categories for critical security monitoring and incident response.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-IDPS.png')} alt="Azure Firewall IDPS" style={{border: '1px solid gray'}} width="800" />

### DNS Analysis

The **Azure Firewall - DNS Analysis** dashboard provides insights into DNS proxy activity and resolution patterns.

Use this dashboard to:

- Monitor DNS response codes and protocol distribution (TCP/UDP) to ensure proper DNS resolution.
- Identify top queried domains and failed DNS queries to troubleshoot connectivity issues.
- Analyze DNS queries over time and average request duration to detect anomalies and performance issues.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-DNS-Analysis.png')} alt="Azure Firewall DNS Analysis" style={{border: '1px solid gray'}} width="800" />

### FQDN Failures

The **Azure Firewall - FQDN Failures** dashboard provides detailed analysis of FQDN resolution failures affecting application rule processing.

Use this dashboard to:

- Monitor DNS servers used and identify top failed FQDNs to troubleshoot resolution issues.
- Analyze failure reasons and correlate failures by rule to identify misconfigured application rules.
- Track FQDN failures over time to detect patterns and resolve connectivity issues.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-FQDN-Failures.png')} alt="Azure Firewall FQDN Failures" style={{border: '1px solid gray'}} width="800" />

### Fat Flow Analysis

The **Azure Firewall - Fat Flow Analysis** dashboard provides visibility into high-bandwidth connections that may impact firewall performance.

Use this dashboard to:

- Monitor total fat flows detected and track average/maximum flow rates to identify bandwidth-intensive connections.
- Analyze fat flow trends over time and protocol distribution to understand traffic patterns.
- Identify top fat flow sources and destinations with the highest average rates to optimize network performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Fat-Flow-Analysis.png')} alt="Azure Firewall Fat Flow Analysis" style={{border: '1px solid gray'}} width="800" />

### Flow Trace

The **Azure Firewall - Flow Trace** dashboard provides detailed packet-level visibility for advanced troubleshooting and security analysis.

Use this dashboard to:

- Monitor TCP flag distribution and identify protocol violations (invalid TCP flags) for security analysis.
- Analyze action distribution and reasons to understand firewall decisions and troubleshoot issues.
- Detect potential port scans and track DNS flow trace events, including query sources, domains, and status distribution.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Flow-Trace.png')} alt="Azure Firewall Flow Trace" style={{border: '1px solid gray'}} width="800" />

### Audit Policy

The **Azure Firewall - Audit Policy** dashboard provides details about Azure Policy compliance status for firewall resources.

Use this dashboard to:

- Monitor total success and failed policy events to ensure governance compliance.
- Analyse failed policy event details to identify and remediate non-compliant configurations.
- Track policy compliance trends for regulatory compliance monitoring and audit reporting.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Audit-Policy.png')} alt="Azure Firewall Audit Policy" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Azure Firewall

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Firewall alerts

These alerts are metric-based and will work for all Azure Firewalls.

| Alert Name | Alert Description and Conditions | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Azure Firewall - Health State` | This alert is triggered when the average Firewall health state is less than 80% and triggers a warning when the average Firewall health state is less than 90%. | Critical: `< 80`<br/>Warning: `< 90` | Critical: `>= 80`<br/>Warning: `>= 90` |
| `Azure Firewall - SNAT Port Utilization (%)` | This alert is triggered when the average SNAT port utilization is greater than 80% and triggers a warning if SNAT port utilization is greater than 70%. | Critical: `> 80`<br/>Warning: `> 70` | Critical: `<= 80`<br/>Warning: `<= 70` |
| `Azure Firewall - Average Latency Probe (Milliseconds)` | This alert is triggered when the average Latency Probe is greater than 10 milliseconds and triggers a warning when the average Latency Probe is greater than 5 milliseconds. | Critical: `> 10`<br/>Warning: `> 5` | Critical: `<= 10`<br/>Warning: `<= 5` |
| `Azure Firewall - Network Rule Hit Count` | This alert is triggered when the total Network rules hit count is greater than 500, and triggersa  warning when the Network rules hit count is greater than 300. | Critical: `> 500`<br/>Warning: `> 300` | Critical: `<= 500`<br/>Warning: `<= 300` |
| `Azure Firewall - Average Throughput (bits per second)` | This alert is triggered when the average Throughput is greater than 100000 bits/second and triggers a warning when the average Throughput is greater than 50000 bits/second. | Critical: `> 100000`<br/>Warning: `> 50000` | Critical: `<= 100000`<br/>Warning: `<= 50000` |

## Upgrade/Downgrade the Azure Firewall app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Firewall app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).

## Additional resources

- Blog: [Azure monitoring and troubleshooting](https://www.sumologic.com/blog/azure-services-monitoring)
- Glossary: [Microsoft Azure](https://www.sumologic.com/glossary/microsoft-azure)

---
id: azure-firewall
title: Azure Firewall
keywords: 
 - azure firewall
 - firewall in azure
 - azure network security
 - azure firewall monitoring
 - azure firewall logs
description: This document outlines what is Azure Firewall, how to set it up with Sumo Logic, and how to install and view the pre-configured Sumo Logic Azure dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-firewall.png')} alt="Thumbnail icon" width="50"/>

[Azure Firewall](https://learn.microsoft.com/en-us/azure/firewall/overview) is a cloud-native and intelligent network firewall security service that provides threat protection for your cloud workloads running in Azure. It's a fully stateful, firewall as a service with built-in high availability and unrestricted cloud scalability. This integration helps in monitoring firewall health, network rules, application rules, threat intelligence, and IDPS (Intrusion Detection and Prevention System) events.

## Log and metric types

For Azure Firewall, you can collect the following logs and metrics:

* **Azure Firewall Application Rule Log**. Contains all application rule log data for each Azure Firewall.
* **Azure Firewall Network Rule Log**. Contains all network rule log data for each Azure Firewall.
* **Azure Firewall DNS Proxy Log**. Contains all DNS Proxy events log data for each Azure Firewall.
* **Azure Firewall Threat Intelligence Log**. Contains all Threat Intelligence events for each Azure Firewall.
* **Azure Firewall IDPS Signature Log**. Contains all Intrusion Detection and Prevention System signature events.
* **Azure Firewall NAT Rule Log**. Contains all DNAT (Destination Network Address Translation) events log data.
* **Azure Firewall Fat Flow Log**. Contains all high-bandwidth flow (Fat Flow) events.
* **Azure Firewall Flow Trace Log**. Contains flow information, flags, and the time period when the flows were recorded.
* **Azure Firewall FQDN Resolution Failure Log**. Contains all FQDN Resolution requests that resulted in failure.

For more information on supported metrics and logs schema, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/firewall/monitor-firewall-reference).

* **Azure Firewall Metrics**. These metrics are available in [Microsoft.Network/azureFirewalls](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-network-azurefirewalls-metrics) namespace.

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Firewall you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Firewall/Logs` and `Azure/Firewall/Metrics`.

### Configure collector

Create a hosted collector if not already configured and tag the `tenant_name` field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). Make sure you create the required sources in this collector. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the steps below for each Azure Firewall that you want to monitor.
   1. Choose **Stream to an event hub** as the destination.
   1. Select the log categories you want to collect:
      * `AzureFirewallApplicationRule`
      * `AzureFirewallNetworkRule`
      * `AzureFirewallDnsProxy`
      * `AZFWThreatIntel`
      * `AZFWIdpsSignature`
      * `AZFWNatRule`
      * `AZFWFatFlow`
      * `AZFWFlowTrace`
      * `AZFWFqdnResolveFailure`
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
   <img src={useBaseUrl('img/send-data/azure-firewall-diagnostic-settings.png')} alt="Azure Firewall diagnostic settings" style={{border: '1px solid gray'}} width="800" />
3. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Firewall Tag Location" style={{border: '1px solid gray'}} width="500" />

#### Activity logs (optional)

import ActivityLogs from '../../reuse/apps/azure-activity-logs.md';

<ActivityLogs/>

## Installing the Azure Firewall app

Now that you have set up data collection, install the Azure Firewall Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation process, the following fields will be created by default:

- `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
- `location`. The region to which the resource name belongs to.
- `subscription_id`. ID associated with a subscription where the resource is present.
- `resource_group`. The resource group name where the Azure resource is present.
- `provider_name`. Azure resource provider name (for example, Microsoft.Network).
- `resource_type`. Azure resource type (for example, azureFirewalls).
- `resource_name`. The name of the resource (for example, firewall name).
- `service_type`. Type of the service that can be accessed with a Azure resource.
- `service_name`. Services that can be accessed with an Azure resource.

## Viewing the Azure Firewall dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

The **Azure Firewall - Overview** dashboard provides a high-level summary of firewall health, performance, and security posture. Key metrics include Firewall Health by Status (%), SNAT Port Utilization (%), Average Latency (ms), Total Threat Intel Matches, Total IDPS Alerts, Network Rule Actions Distribution, Total Application Rule Hit Count, Total Network Rule Hit Count, Average Throughput, Average Observed Capacity Units, and Total Data Processed.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Overview.png')} alt="Azure Firewall Overview" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure Firewall - Administrative Operations** dashboard provides visibility into Azure Resource Manager operations performed on the firewall resource. Key metrics include Top 10 Operations That Caused Most Errors, Recent Delete Operations, Distribution by Operation Type (Read, Write, and Delete), Distribution by Operations, Users/Applications by Operation Type, Distribution by Status, and Recent Write Operations for change tracking and audit compliance.

Use this dashboard to:

- Identify top users performing administrative operations.
- View the top 10 operations that caused the most errors.
- View recent read, write, and delete operations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Administrative-Operations.png')} alt="Azure Firewall Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Application Rules

The **Azure Firewall - Application Rules** dashboard provides visibility into application layer traffic filtering and web content control. Key metrics include Actions Distribution, Protocol Distribution, Deny Reasons, Top 10 Source IPs, TLS Inspection Status, Web Categories, and Application Rule Details for comprehensive FQDN-based traffic analysis.

Use this dashboard to:

- Monitor application rule hits and actions (Allow/Deny).
- Identify top source IPs making application requests.
- Analyze TLS inspection status and web category distribution.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Application-Rules.png')} alt="Azure Firewall Application Rules" style={{border: '1px solid gray'}} width="800" />

### Network Rules

The **Azure Firewall - Network Rules** dashboard provides detailed insights into network layer traffic filtering. Key metrics include Network Rule Actions Distribution, Top 10 Denied Source IPs, Top 10 Denied Destination IPs, Top 10 Denied Reasons, Critical Port Access Attempts, Protocol Distribution, Top Rules Triggered, Top Denied Sources, and Requests by Location.

Use this dashboard to:

- Monitor network rule hits and blocked traffic.
- Identify top denied source and destination IPs.
- Detect critical port access attempts.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Network-Rules.png')} alt="Azure Firewall Network Rules" style={{border: '1px solid gray'}} width="800" />

### NAT Rules

The **Azure Firewall - NAT Rules** dashboard provides insights into Destination NAT (DNAT) translations for inbound traffic routing. Key metrics include NAT by Protocol, NAT Translations Over Time, Top 10 Source IPs Using NAT, NAT Rule Details, and Top NAT Rules for monitoring inbound connectivity patterns.

Use this dashboard to:

- Monitor DNAT translations for inbound traffic.
- Identify top source IPs using NAT rules.
- Analyze NAT rule usage patterns.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-NAT-Rules.png')} alt="Azure Firewall NAT Rules" style={{border: '1px solid gray'}} width="800" />

### Threat Intelligence

The **Azure Firewall - Threat Intelligence** dashboard provides visibility into malicious traffic detected by Microsoft's threat intelligence feed. Key metrics include Threat Actions Distribution, Threats by Protocol, TLS Inspected vs Non-Inspected traffic, Top 10 Threat Source IPs, Top 10 Threat Destination IPs, Top Threat Descriptions, and detailed Threat Intel event logs.

Use this dashboard to:

- Monitor threats detected by threat intelligence.
- Identify malicious source and destination IPs.
- Analyze threat descriptions and take appropriate action.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Threat-Intelligence.png')} alt="Azure Firewall Threat Intelligence" style={{border: '1px solid gray'}} width="800" />

### IDPS

The **Azure Firewall - IDPS** (Intrusion Detection and Prevention System) dashboard provides comprehensive monitoring of signature-based threat detection. Key metrics include IDPS Events Distribution by Severity, IDPS Actions Distribution (Alert/Deny), Top IDPS Categories, Top 10 Signature IDs, Top 10 Attack Sources, Top 10 Attack Destinations, Top 20 Attacked Ports, and High Severity Alerts (Severity 1-2) for critical security monitoring.

Use this dashboard to:

- Monitor intrusion detection and prevention events.
- Identify attack sources and destinations.
- Analyze high severity security alerts.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-IDPS.png')} alt="Azure Firewall IDPS" style={{border: '1px solid gray'}} width="800" />

### DNS Analysis

The **Azure Firewall - DNS Analysis** dashboard provides insights into DNS proxy activity and resolution patterns. Key metrics include DNS Response Codes, DNS Response by Protocol (TCP/UDP), Top 20 Queried Domains, Top 20 Failed DNS Queries, and DNS Queries Over Time for monitoring DNS traffic patterns and identifying potential issues.

Use this dashboard to:

- Monitor DNS proxy activity and resolution patterns.
- Identify frequently queried domains.
- Troubleshoot failed DNS queries.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-DNS-Analysis.png')} alt="Azure Firewall DNS Analysis" style={{border: '1px solid gray'}} width="800" />

### FQDN Failures

The **Azure Firewall - FQDN Failures** dashboard provides detailed analysis of FQDN resolution failures affecting application rule processing. Key metrics include DNS Servers Used, Top 10 Failed FQDNs, Failure Reasons, Failures by Rule, FQDN Failures Over Time, and detailed FQDN Failure logs for troubleshooting connectivity issues.

Use this dashboard to:

- Monitor FQDN resolution failures.
- Identify problematic FQDNs and failure reasons.
- Troubleshoot connectivity issues related to DNS resolution.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-FQDN-Failures.png')} alt="Azure Firewall FQDN Failures" style={{border: '1px solid gray'}} width="800" />

### Fat Flow Analysis

The **Azure Firewall - Fat Flow Analysis** dashboard provides visibility into high-bandwidth connections that may impact firewall performance. Key metrics include Total Fat Flows Detected, Average Flow Rate (Megabits/Second), Maximum Flow Rate (Megabits/Second), Fat Flows Rate Over Time, Protocol Distribution, Top 10 Fat Flow Sources with Highest Average, and Top 10 Fat Flow Destinations with Highest Average.

Use this dashboard to:

- Monitor high-bandwidth connections.
- Identify sources and destinations of fat flows.
- Analyze flow rate trends over time.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Fat-Flow-Analysis.png')} alt="Azure Firewall Fat Flow Analysis" style={{border: '1px solid gray'}} width="800" />

### Flow Trace

The **Azure Firewall - Flow Trace** dashboard provides detailed packet-level visibility for advanced troubleshooting and security analysis. Key metrics include TCP Flag Distribution, Top Sources by TCP Flag, INVALID TCP Flags (Protocol Violations), Total Flow Trace Events, Action Distribution, Action Reason Analysis, Top Destinations by TCP Flag, Potential Port Scan Detection, DNS Flow Trace Events including Message Type Distribution, Protocol Distribution, Top 10 DNS Query Sources, Top 10 Queried Domains, DNS Status Distribution, and Client vs Forwarder Activity.

Use this dashboard to:

- Perform advanced troubleshooting with packet-level visibility.
- Detect potential port scans and protocol violations.
- Analyze DNS flow trace events.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Flow-Trace.png')} alt="Azure Firewall Flow Trace" style={{border: '1px solid gray'}} width="800" />

### Policy Analytics

The **Azure Firewall - Policy Analytics** dashboard provides insights into firewall policy effectiveness and rule optimization opportunities. Key metrics include TLS Inspection Status, Web Categories, Top Rules by Hits for Network Rules, Application Rules, and NAT Rules, along with Top Sources for each rule type to identify optimization opportunities and policy tuning recommendations.

Use this dashboard to:

- Analyze firewall policy effectiveness.
- Identify rule optimization opportunities.
- Monitor top rules by hits for each rule type.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Policy-Analytics.png')} alt="Azure Firewall Policy Analytics" style={{border: '1px solid gray'}} width="800" />

### Audit Policy

The **Azure Firewall - Audit Policy** dashboard provides details about Azure Policy compliance status for firewall resources. Key metrics include Total Success Policy Events, Total Failed Policy Events, Failed Policy Event details, and policy compliance trends for governance and regulatory compliance monitoring.

Use this dashboard to:

- Monitor policy events with warnings and errors.
- View recent failed policy events.
- Track policy compliance trends.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureFirewall/Azure-Firewall-Audit-Policy.png')} alt="Azure Firewall Audit Policy" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Azure Firewall

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Firewall alerts

These alerts are metric based and will work for all Azure Firewalls.

| Alert Name | Alert Description and Conditions | Alert Condition | Recover Condition        |
|:--|:--|:--|:-------------------------|
| `Azure Firewall - Health Status` | This alert is triggered when Firewall Health is less than 100%. | percentage < 100 | percentage > = 100       |
| `Azure Firewall - SNAT Port Utilization` | This alert is triggered when SNAT Port Utilization exceeds 80%. | percentage > 80 | percentage < = 80        |
| `Azure Firewall - Throughput` | This alert is triggered when firewall throughput exceeds threshold. | throughput > threshold | throughput < = threshold |
| `Azure Firewall - Threat Intelligence Hits` | This alert is triggered when Threat Intelligence matches are detected. | count > 0 | count = 0                |
| `Azure Firewall - IDPS High Severity Alerts` | This alert is triggered when high severity (1-2) IDPS alerts are detected. | count > 0 | count = 0                |

## Upgrade/Downgrade the Azure Firewall app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Firewall app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).

### Logs not appearing in Sumo Logic

If logs are not appearing in Sumo Logic:

1. Verify that the diagnostic settings are correctly configured in the Azure portal.
2. Check that the Event Hub is receiving data.
3. Verify that the Azure Event Hubs source in Sumo Logic is correctly configured with the right Event Hub namespace and name.
4. Check the source health in Sumo Logic for any errors.

## Additional resources

- [Azure Firewall Documentation](https://learn.microsoft.com/en-us/azure/firewall/)
- [Azure Firewall Logs and Metrics](https://learn.microsoft.com/en-us/azure/firewall/monitor-firewall-reference)
- Blog: [Azure monitoring and troubleshooting](https://www.sumologic.com/blog/azure-services-monitoring)
- Glossary: [Microsoft Azure](https://www.sumologic.com/glossary/microsoft-azure)

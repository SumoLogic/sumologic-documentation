---
id: cisco-meraki-c2c
title: Cisco Meraki - C2C
sidebar_label: Cisco Meraki - C2C
description: The Cisco Meraki - C2C app for Sumo Logic provides real-time insights into the events and helps you to identify potential network events along with admin activities.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/integrations/security-threat-detection/ciscomeraki.png')} alt="ciscomeraki-logo" width="75"/>

The Sumo Logic app for Cisco Meraki app collects data from Cisco Meraki Cloud-to-cloud (C2C) collector, providing comprehensive insights and monitoring capabilities for efficient network management and enhanced security. With features such as organization overview, network traffic analysis and monitoring, real-time security event monitoring, event analysis, client and SSID monitoring, Air Marshal security overview, and visualization/reporting, these dashboards offer valuable information on network configuration, traffic patterns, bandwidth utilization, performance metrics, security events, client activity, and potential threats. By leveraging these key features, you can proactively optimize network performance, analyze traffic trends, identify and mitigate security risks, and make informed decisions to ensure a robust and secure network infrastructure.

Key features and benefits of the Cisco Meraki - C2C app include:

- **Comprehensive Organization Insights**. Gain valuable insights into your organizational configuration and operations, including API adoption, configuration template usage, and product distribution. Stay updated on the overall organization landscape and monitor key metrics for efficient management and optimization.
- **Real-time Security Monitoring**. Monitor network security in real-time with insights on security events, blocked events, threat severity, and infected hosts. Identify potential threats, track attack origins and targets, and take proactive measures to enhance network security.
- **Event Analysis and Trend Identification**. Analyze network events based on type, client associations, and SSIDs. Identify event patterns and trends to understand network activity and potential security risks.
- **Client and SSID Monitoring**. Monitor your client activity and their association with specific SSIDs. Identify your client's geographical distribution to assess potential risks associated with the specific locations and keep track of your client's behaviour and network usage for effective management.
- **Air Marshal Security Overview**. Provide wireless intrusion detection and prevention by monitoring security status and identifying potential vulnerabilities in the network.
- **Enhanced Security Measures**. Monitor blocked connections, file scans, and malicious files to ensure a secure network environment. Prioritize your security efforts by identifying top clients and destinations based on security events and take proactive steps to protect the network and mitigate potential threats.
- **Visualization and Reporting**. Provides visual representations of network data, making it easy for you to understand and interpret key metrics. Generate reports and share insights with your stakeholders to facilitate decision-making and drive network improvements.
- **Network Traffic Analysis and Monitoring**. Monitor comprehensive network traffic patterns including application usage, protocol distribution, and port activity. Track bandwidth trends and analyze sent versus received data to understand communication patterns and optimize network performance.
- **Geographic Risk Assessment and Port Security**. Visualize destination locations and identify high-risk or embargoed regions for compliance awareness. Monitor traffic on insecure ports to detect legacy or unencrypted services and enhance network security posture.

## Log types

This app uses [Cisco Meraki source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-meraki-source) to collect the data from Cisco Meraki.

## Sample log messages

- [Get Organizations](https://developer.cisco.com/meraki/api-latest/#!get-organizations) sample log format.
- [Get Organizations Networks](https://developer.cisco.com/meraki/api-latest/#!get-organization-networks) sample log format.
- [Get Organizations Appliance Security Events](https://developer.cisco.com/meraki/api-v1/#!get-organization-appliance-security-events) sample log format.
- [Get Organizations Configuration Changes](https://developer.cisco.com/meraki/api-v1/#!get-organization-configuration-changes) sample log format.
- [Get Network Events](https://developer.cisco.com/meraki/api-v1/#!get-network-events) sample log format.
- [Get Network Wireless Air Marshal](https://developer.cisco.com/meraki/api-v1/#!get-network-wireless-air-marshal) sample log format.
- [Get Network Traffic Events](https://developer.cisco.com/meraki/api-v1/get-network-traffic/) sample log format.

## Sample queries

```sql title="Total Organizations"
_sourceCategory=Labs/CiscoMerakiC2C  licensing name management cloud
| json "id","name","cloud.region.name" as id,name,region nodrop

// global filters 
| where if("{{organization_name}}" = "*",true,name matches "{{organization_name}}")
| where if("{{region_name}}" = "*",true,region matches "{{region_name}}")

// panel specific
| where !isBlank(id)
| count by id
| count 
```

```sql title="Total Networks"
_sourceCategory=Labs/CiscoMerakiC2C organizationId name productTypes
| json "id","name","timeZone" as id,name,time_zone nodrop

// global filters
| where if("{{time_zone}}"="*",true,time_zone matches "{{time_zone}}")
| where if("{{network_name}}" = "*",true,name matches "{{network_name}}")

// panel specific
| count by id
| count
```

```sql title="Total Events"
_sourceCategory=Labs/CiscoMerakiC2C  eventType priority ts
| json "clientName", "eventType", "priority", "ts" as client_name, event_type, priority, ts nodrop

| if(priority matches "1", "High", if(priority matches "2", "Medium", if(priority matches "3", "Low", if (priority matches "4", "Very Low", "-")))) as severity

// global filters
| where if ("{{client_name}}" = "*", true, client_name matches "{{client_name}}")
| where if ("{{event_type}}" = "*", true, event_type matches "{{event_type}}")
| where if ("{{severity}}" = "*", true, severity matches "{{severity}}")

// panel specific 
| count by ts // deduplicating via ts as we do not have any unique identifier
| count
```

```sql title="Total Network Activity"
_sourceCategory=Labs/CiscoMerakiC2C  occurredAt networkId
| json "type", "occurredAt", "networkId" as type, occurred_at, network_id nodrop

// global filters
| where if ("{{event_type}}" = "*", true, type matches "{{event_type}}")
| where if ("{{category}}" = "*", true, category matches "{{category}}")

// panel specific
| count by occurred_at, network_id
| count 
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Cisco Meraki](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-meraki-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Cisco Meraki app is properly integrated and configured to collect and analyze your Cisco Meraki data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing the Cisco Meraki - C2C dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Organization Overview

The **Cisco Meraki - Organization Overview** dashboard provides valuable insights and essential metrics concerning your organizational configuration and operations. It provides a comprehensive understanding of your network through various panels, including Total Organizations, API Enabled Organizations, Organizations by Product Type, and Organizations by Cloud Region, allowing you to stay updated on the overall organization landscape, monitor API adoption, track configuration template usage, and analyze product distribution within the network. Additionally, the dashboard provides insights on Active Admins, Configuration Change Summary, Geo Locations of Top Threats, and Configuration Change Frequency. By leveraging this dashboard, you can efficiently manage and optimize your organization's performance and enhance its security. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Cisco-Meraki-Organization-Overview.png')} alt="Cisco-Meraki-Organization-Overview" />

### Appliance Security Events

The **Cisco Meraki - Appliance Security Events** dashboard provides real-time insights and important metrics for monitoring network security. It provides a comprehensive view of the security environment through various panels, including Total Events, Blocked Events, Threat Severity, Events by Type, Infected Hosts, Geo Locations of Attack Origins, Geo Locations of Attack Targets, Trend Analysis, Top Clients by Events, Top Destinations by Events, File Scanned, Blocked Connections, and Malicious Files. Analyze events based on the types, track infected hosts, and visualize the geographical locations of attack origins and targets. Utilize trend analysis to identify patterns and potential threats, prioritize security efforts by identifying top clients and destinations based on events, monitor file scans, blocked connections, and malicious files to enhance security. This dashboard enables proactive management of network security and protection against potential threats. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Cisco-Meraki-Appliance-Security-Events.png')} alt="Cisco-Meraki-Appliance-Security-Events" />

### Network Events and Air Marshal

The **Cisco Meraki - Network Events and Air Marshal** dashboard provides you with a comprehensive overview of network activity, event timelines, and event type breakdown. It offers insights into associated clients and their respective SSIDs, highlighting recent association events. The geo locations of clients are displayed, allowing for easy identification of their geographical distribution. Additionally, this dashboard presents information on the SSID associated with clients and an Air Marshal overview to monitor security. Risky geo locations are highlighted to help you to identify potential threats and vulnerabilities. With these panels, the dashboard offers a holistic view of network performance, event analysis, client activity, and security monitoring. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Cisco-Meraki-Network-Events-and-Air-Marshal.png')} alt="Cisco-Meraki-Network-Events-and-Air-Marshal" />

### Network Traffic Overview

The **Cisco Meraki - Network Traffic Overview** dashboard provides a detailed overview of Cisco Meraki network traffic, highlighting application usage, protocol distribution, and port activity. It tracks bandwidth trends and compares sent versus received data to reveal communication patterns. Geographic panels map destination locations and identify high-risk or embargoed regions for compliance awareness. The dashboard also monitors traffic on insecure ports to detect legacy or unencrypted services. Overall, it offers clear visibility into network utilization and security posture. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Cisco-Meraki-Network-Traffic-Overview.png')} alt="Cisco-Meraki-Network-Traffic-Overview" />

## Create monitors for Cisco Meraki C2C app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Cisco Meraki C2C Alerts

| Name  | Description | Alert Condition |
|:--|:--|:--|
| `Cisco Meraki - Embargoed Geo Location Of Client` | This alert is triggered when data access is detected from client IP addresses located in embargoed or sanctioned regions. This alert ensures compliance with regulations and corporate policies. | Count > 0 |
| `Cisco Meraki - Embargoed Geo Location Of Destination` | This alert is triggered when data access is detected from Destination IP addresses located in embargoed or sanctioned regions. This alert ensures compliance with regulations and corporate policies. | Count > 0 |
| `Cisco Meraki - Embargoed Geo Location Of Source` | This alert is triggered when data access is detected from source IP addresses located in embargoed or sanctioned regions. This alert ensures compliance with regulations and corporate policies. | Count > 0 |
| `Cisco Meraki - Large Size File Scanned Activity Detected` | This alert is triggered when a large volume of file-scanning activity is detected(>500MB) over the network by the client. You can also adjust the threshold as per your requirement. | Count > 0 |
| `Cisco Meraki - Malicious File Detected` | This alert is triggered when a malicious file activity is detected over the network by Cisco Meraki AMP. Investigate immediately to isolate affected endpoints, verify blocking action, and correlate file hash with threat intelligence. | Count > 0 |

## Upgrade/Downgrade the Cisco Meraki - C2C app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Cisco Meraki - C2C app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
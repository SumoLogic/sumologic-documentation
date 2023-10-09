---
id: cisco-meraki-c2c
title: Cisco Meraki - C2C
sidebar_label: Cisco Meraki - C2C
description: The Cisco Meraki - C2C app for Sumo Logic provides real-time insights into the events and helps you to identify potential network events along with admin activities.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/integrations/security-threat-detection/ciscomeraki.png')} alt="ciscomeraki-logo" width="75"/>

The Sumo Logic app for Cisco Meraki - C2C provides real-time insights into the events and helps you to identify potential network events along with admin activities. This app can effectively manage and optimize your network performance, enhance security, and proactively respond to potential threats. The comprehensive insights and monitoring capabilities enable efficient network administration and contribute to a robust and secure network infrastructure.

Key features and benefits of the Cisco Meraki - C2C app include:

- **Comprehensive Organization Insights**. Gain valuable insights into your organizational configuration and operations, including API adoption, configuration template usage, and product distribution. Stay updated on the overall organization landscape and monitor key metrics for efficient management and optimization.
- **Real-time Security Monitoring**. Monitor network security in real-time with insights on security events, blocked events, threat severity, and infected hosts. Identify potential threats, track attack origins and targets, and take proactive measures to enhance network security.
- **Event Analysis and Trend Identification**. Analyze network events based on type, client associations, and SSIDs. Identify event patterns and trends to understand network activity and potential security risks. 
- **Client and SSID Monitoring**. Monitor your client activity and their association with specific SSIDs. Identify your client's geographical distribution to assess potential risks associated with the specific locations and keep track of your client's behaviour and network usage for effective management.
- **Air Marshal Security Overview**. Provide wireless intrusion detection and prevention by monitoring security status and identifying potential vulnerabilities in the network.
- **Enhanced Security Measures**. Monitor blocked connections, file scans, and malicious files to ensure a secure network environment. Prioritize your security efforts by identifying top clients and destinations based on security events and take proactive steps to protect the network and mitigate potential threats.
- **Visualization and Reporting**. Provides visual representations of network data, making it easy for you to understand and interpret key metrics. Generate reports and share insights with your stakeholders to facilitate decision-making and drive network improvements.

## Log types

This app uses [Cisco Meraki source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-meraki-source) to collect the data from Cisco Meraki.

## Sample log messages

- [Get Organizations](https://developer.cisco.com/meraki/api-latest/#!get-organizations) sample log format.
- [Get Organizations Networks](https://developer.cisco.com/meraki/api-latest/#!get-organization-networks) sample log format.
- [Get Organizations Appliance Security Events](https://developer.cisco.com/meraki/api-v1/#!get-organization-appliance-security-events) sample log format.
- [Get Organizations Configuration Changes](https://developer.cisco.com/meraki/api-v1/#!get-organization-configuration-changes) sample log format.
- [Get Network Events](https://developer.cisco.com/meraki/api-v1/#!get-network-events) sample log format.
- [Get Network Wireless Air Marshal](https://developer.cisco.com/meraki/api-v1/#!get-network-wireless-air-marshal) sample log format.

## Sample Queries

```sql title="Total Organizations"
_sourceCategory=cm_con2006 licensing
| json "id", "name", "url", "api.enabled", "licensing.model", "cloud.region.name", "management.details.[*].name", "management.details.[*].value" as id, name, url, enabled, model, region, management_name, management_value nodrop
| count_distinct(id)
```

```sql title="Total Network Logs"
_sourceCategory=cm_con2006 organizationId
| json "id", "organizationId", "name", "productTypes", "timeZone", "tags", "enrollmentString", "url", "notes", "isBoundToConfigTemplate" as id, organization_id, name, product_types, time_zone, tags, enrollment_string, url, notes, is_bound_to_config_template nodrop
| count_distinct(id)
```

```sql title="Total Events"
_sourceCategory=cm_con2006 eventType
| json "ts", "eventType", "clientName", "clientMac", "clientIp", "srcIp", "destIp", "protocol", "uri", "canonicalName", "destinationPort", "fileType", "fileSizeBytes", "disposition", "action", "deviceMac", "priority", "classification", "message", "signature", "ruleId"  as date_time, event_type, client_name, client_mac, client_ip, src_ip, dest_ip, protocol, uri, canonical_name, dest_port, file_type, file_size_bytes, disposition, action, device_mac, priority, classification, message, signature, rule_id nodrop
| if(priority matches "1", "High", if(priority matches "2", "Medium", if(priority matches "3", "Low", if (priority matches "4", "Very Low", "-")))) as severity
//filters
| where event_type matches "{{event_type}}"
| where client_name matches "{{client_name}}"
| where severity matches "{{severity}}"
| count(event_type)
```

```sql title="Network Activity"
_sourceCategory=cm_con2006 networkId
| json "occurredAt", "networkId", "type", "description", "category", "clientId", "clientDescription", "clientMac", "deviceSerial", "deviceName", "ssidNumber", "eventData.radio", "eventData.vap", "eventData.client_mac", "eventData.client_ip", "eventData.channel", "eventData.rssi", "eventData.aid" as occurredAt, networkId, type, description, category, clientId, clientDescription, clientMac, deviceSerial, deviceName, ssidNumber, radio, vap, client_mac, client_ip, channel, rssi, aid nodrop
// filters
| where type matches "{{event_type}}"
| count_distinct(networkId)
```

```sql title="Total Activities"
_sourceCategory=cm_con2006 wiredMacs
| json "ssid", "channels", "firstSeen", "lastSeen", "wiredMacs", "wiredVlans", "wiredLastSeen","bssids[*].bssid","bssids[*].detectedBy[*].device","bssids[*].detectedBy[*].rssi" as ssid, channels, first_seen, last_seen, wired_macs, wired_vlans, wired_last_seen,bssids,devices,rssi_values nodrop
| count
```

## Set up collection

To set up data ingestion for the Cisco Meraki - C2C app, follow the instructions provided at [Cisco Meraki Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-meraki-source). These instructions will guide you through the process of creating a source using the Cisco Meraki source category, which you will need to use when installing the app. By following these steps, you can ensure that your Cisco Meraki - C2C app is properly integrated and configured to collect and analyze your Cisco Meraki data.

## Installing the Cisco Meraki - C2C app

This section provides instructions on how to install the Cisco Meraki - C2C app, as well as examples of each of the dashboards. The App pre-configured searches and dashboards provide easy-to-access visual insights into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing Cisco Meraki - C2C dashboards

### Organization Overview

The **Cisco Meraki - Organization Overview** dashboard provides valuable insights and essential metrics concerning your organizational configuration and operations. It provides a comprehensive understanding of your network through various panels, including Total Organizations, API Enabled Organizations, Organizations by Product Type, and Organizations by Cloud Region, allowing you to stay updated on the overall organization landscape, monitor API adoption, track configuration template usage, and analyze product distribution within the network. Additionally, the dashboard provides insights on Active Admins, Configuration Change Summary, Geo Locations of Top Threats, and Configuration Change Frequency. By leveraging this dashboard, you can efficiently manage and optimize your organization's performance and enhance its security. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Cisco-Meraki-Organization-Overview.png')} alt="Cisco-Meraki-Organization-Overview" />

### Appliance Security Events

The **Cisco Meraki - Appliance Security Events** dashboard provides real-time insights and important metrics for monitoring network security. It provides a comprehensive view of the security environment through various panels, including Total Events, Blocked Events, Threat Severity, Events by Type, Infected Hosts, Geo Locations of Attack Origins, Geo Locations of Attack Targets, Trend Analysis, Top Clients by Events, Top Destinations by Events, File Scanned, Blocked Connections, and Malicious Files. Analyze events based on the types, track infected hosts, and visualize the geographical locations of attack origins and targets. Utilize trend analysis to identify patterns and potential threats, prioritize security efforts by identifying top clients and destinations based on events, monitor file scans, blocked connections, and malicious files to enhance security. This dashboard enables proactive management of network security and protection against potential threats. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Cisco-Meraki-Appliance-Security-Events.png')} alt="Cisco-Meraki-Appliance-Security-Events" />

### Network Events and Air Marshal

The **Cisco Meraki - Network Events and Air Marshal** dashboard provides you with a comprehensive overview of network activity, event timelines, and event type breakdown. It offers insights into associated clients and their respective SSIDs, highlighting recent association events. The geo locations of clients are displayed, allowing for easy identification of their geographical distribution. Additionally, this dashboard presents information on the SSID associated with clients and an Air Marshal overview to monitor security. Risky geo locations are highlighted to help you to identify potential threats and vulnerabilities. With these panels, the dashboard offers a holistic view of network performance, event analysis, client activity, and security monitoring. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Cisco-Meraki-Network-Events-and-Air-Marshal.png')} alt="Cisco-Meraki-Network-Events-and-Air-Marshal" />

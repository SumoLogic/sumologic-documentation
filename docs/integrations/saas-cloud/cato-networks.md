---
id: cato-networks
title: Cato Networks
sidebar_label: Cato Networks
description: Provides real-time insights into the events and identify potential security threats with admin activities.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/send-data/cato-logo.png')} alt="Thumbnail icon" width="80"/>

The Sumo Logic app for Cato Networks provides real-time insights into the events and helps you to identify potential security threats with admin activities. This app offers a comprehensive suite of dashboards that enables you to monitor network events, analyze threats, and track administrative activities, which empowers you with actionable intelligence for network management and security.

Key features and benefits of the Cato Networks app include:
- **Security event analysis**. Detect and respond to security threats in the Cato Networks environment. It provides a holistic view of event-related metrics and insights. This dashboard enables users to identify trends, assess risks, and make informed decisions regarding network events.
- **Threat analysis**. This app offers a comprehensive overview of threat-related information that allows you to understand and address potential risks effectively, thereby supporting risk management and response strategies.
- **Audit summary**. This app includes pre-built reports and visualizations of audit logs which facilitates effective monitoring, analysis, and identification of any unusual or suspicious activities within the system.
- **Customization and Integration**. Customize and tailor your dashboards, reports, and alerts to align specific monitoring and security needs. It also supports integration with other security tools and platforms, enabling a centralized view of the overall security landscape.

## Log types

This app uses Sumo Logic’s Cato Networks source to collect [Events Feed](https://support.catonetworks.com/hc/en-us/articles/360019839477-Cato-API-EventsFeed-Large-Scale-Event-Monitoring) and [Audit Feed](https://support.catonetworks.com/hc/en-us/articles/360017900857-Cato-API-AuditFeed) data from Cato Networks platform.

## Sample log messages

```json title="Events Feed"
{
 account_id: "1714",
 action: "Succeeded",
 api_name: "eventsFeed",
 api_type: "query",
 authentication_type: "APIKEY",
 event_count: "1",
 event_sub_type: "ApiKey",
 event_type: "Connectivity",
 internalId: "9jlo",
 key_name: "Peter",
 login_type: "API",
 src_country: "Ireland",
 src_country_code: "IE",
 src_ip: "128.200.100.1",
 src_is_site_or_vpn: "API",
 src_site: "US",
 time: "1682856852500"
}
```
```json title="Audit Feed"
{
 account_id: "1714",
 admin: "peter@mail.com",
 admin_id: "4472",
 change_type: "DELETED",
 creation_date: "1682683010000",
 insertion_date: "1682684083127",
 model_name: "Temp jscript driveby",
 model_type: "IPSWISTRULE",
 module: "Ips Whitelist Rule"
}
```

## Sample Query

```sql title="Total Threat Events"
_sourceName="source" event_type  
| json "user_name", "api_type", "event_message", "application", "api_name", "file_size", "socket_interface", "matched_data_types", "rule", "device_name", "src_site", "internalId", "dlp_profiles", "ip_protocol", "custom_categories", "src_isp_ip", "threat_verdict", "src_ip", "action", "file_type", "dest_is_site_or_vpn", "file_name", "is_sanctioned_app", "vpn_user_email", "threat_type", "dest_ip", "risk_level", "domain_name", "src_is_site_or_vpn", "account_id", "event_sub_type", "signature_id", "rule_id", "host_mac", "client_class", "user_reference_id", "event_type", "full_path_url", "host_ip", "rule_name", "severity", "login_type", "mitre_attack_tactics", "os_version", "src_country", "time", "dest_port", "application_risk", "categories", "src_port", "mitre_attack_subtechniques", "dest_site", "traffic_direction", "link_type", "event_count", "ISP_name", "mitre_attack_techniques", "authentication_type", "os_type", "dest_country", "key_name", "threat_reference", "url", "threat_name", "tunnel_protocol", "dest_country_code", "client_version", "src_country_code", "pop_name" as user_name, api_type, event_message, application, api_name, file_size, socket_interface, matched_data_types, rule, device_name, src_site, internalId, dlp_profiles, ip_protocol, custom_categories, src_isp_ip, threat_verdict, src_ip, action, file_type, dest_is_site_or_vpn, file_name, is_sanctioned_app, vpn_user_email, threat_type, dest_ip, risk_level, domain_name, src_is_site_or_vpn, account_id, event_sub_type, signature_id, rule_id, host_mac, client_class, user_reference_id, event_type, full_path_url, host_ip, rule_name, severity, login_type, mitre_attack_tactics, os_version, src_country, time, dest_port, application_risk, categories, src_port, mitre_attack_subtechniques, dest_site, traffic_direction, link_type, event_count, ISP_name, mitre_attack_techniques, authentication_type, os_type, dest_country, key_name, threat_reference, url, threat_name, tunnel_protocol, dest_country_code, client_version, src_country_code, pop_name nodrop

| where !isnull(risk_level) 
| where !isnull(src_country)

//filters
| where src_is_site_or_vpn matches "{{source_type}}"
| where event_type matches "{{event_type}}"
| where event_sub_type matches "{{event_sub_type}}"
| where risk_level matches "{{risk_level}}"
| where src_country matches "{{src_country}}"

| where !isnull(threat_name)
| count_distinct(internalId)
```

```sql title="Total Audit Logs"
_sourceName="source" admin
| json "account_id", "admin", "admin_id", "change_type", "creation_date", "insertion_date", "model_name", "model_type", "module" as account_id, admin, admin_id, activity, creation_date, insertion_date, model_name, model_type, module nodrop

//filters
| where activity matches "{{activity}}"
| where module matches "{{module}}"

| count(admin_id)
```

## Set up collection

Follow the instructions for setting up [Cato Networks](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cato-networks-source/) source and use the same source category while installing the app.

## Installing the Cato Networks app​

This section has instructions for installing the Sumo Logic app for Cato Networks and descriptions of each of the dashboards.

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.
1. From the **App Catalog**, search for the app and select it.
1. Select **Add Integration** button to install the app.
1. Configure **Cato Networks** app using the steps described in the [Cato Networks Cloud-to-Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cato-networks-source/). If you already have set up your data, skip this step by clicking on **Next**.
1. Complete the following fields:
   1. **Data Source**. Select either of these options for the data source:
      * Choose **Source Category** and then choose a source category from the list.
      * Select **Enter a Custom Data Filter** and type in a custom source category that starts with an underscore. For Example, `_sourceCategory=MyCategory`.
    2. **Folder Name**. You can retain the existing name, or enter a name of your choice for the app.
    3. Select the **Location in Library** (the default is the **Personal** folder in the library), or click **New Folder** to add a new folder.
1. Click **Next**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. You can share it with your organization.

The panels will begin to fill automatically. It's worth noting that each panel gradually fills with data that matches the time range query and has been received since the panel was created. The results will not be available right away, but with some patience, you will be able to view full graphs and maps.

## Viewing Cato Networks dashboards​​

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

 You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Events

The **Cato Networks - Events** dashboard provides a detailed summary of the event-related metrics and insights. This dashboard provides a holistic view of event-related information, enabling users to identify trends, assess risks, and make informed decisions.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Cato-Networks-Events.png')} alt="Cato-Networks-Events" />
- **Total Events**. Displays the total number of events that allows you to gauge the scale of activity. 
- **Events by Type**. The distribution of events by type provides a breakdown of the different categories, offering valuable context. 
- **Tunnel Protocol Distribution**. The tunnel protocol distribution showcases the usage of different protocols, indicating potential security concerns.
- **Events from Risky Geo Locations**. The geo-locations of risky sources that represent potentially problematic areas.
- **Action Distribution**. Highlights the distribution of actions taken in response to events.
- **Events by Sub Type**. The distribution of events by sub-type provides a breakdown of the different categories, offering valuable context. 
- **Top 10  Source Countries**. The top source countries highlight events' geographic origins, which enables you to identify the source country of the threat. 
- **Top 10  Destination Countries**. The top destination countries highlight events' geographic destinations, which enables you to identify the destination country of the threat.
- **Top 10 ISPs**. The top ISPs reveal the service providers associated with these events, aiding in further analysis. 
- **Top 10 POP Names**. The top POP names shed light on specific points of presence that might require attention. 
- **Source Site/VPN Details**. Source site/VPN details offer insights into the source of events and the usage of VPNs. 

### Threat Analysis

The **Cato Networks - Threat Analysis** dashboard provides a comprehensive overview of threat-related information, enabling you to understand and address potential risks effectively.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Cato-Networks-Threat-Analysis.png')} alt="Cato-Networks-Threat-Analysis" />
- **Total Threat Events**. Displays the total number of threat events, giving you an overall understanding of the threat landscape. 
- **Threats Frequency**. The threats frequency widget highlights the frequency of threats, allowing you to identify patterns and trends. 
- **Threats by Type**. The threat by types widget categorizes threats and provides insights into the specific types of threats encountered. 
- **Geo Locations of Threat's Source**. The geo locations of threat sources provide visual representations of where threats originate, aiding in identifying potential hotspots. 
- **Geo Locations of Threat's Destinations**. The geo locations of threat destinations provide visual representations of where they are targeted, aiding in identifying potential hotspots. 
- **Threats by Risk Level**. The threats by risk level widget offer a classification of threats based on the severity and help you prioritize your response efforts. 
- **Top Attack Signatures**. The top attack signatures widget highlights the most common attack patterns, allowing you to focus on the most significant risks. 
- **Top Threats**. The top threats widgets highlight the specific threats allowing you to focus on the most significant risks. 
- **MTRE Attack Summary**. The MITRE summary provides a concise overview of the relevant MITRE AT and CK framework for understanding the tactics and techniques associated with threats. 
- **Threats Over Time**.The threats over time widget shows the trend of threats, assisting in monitoring the evolving threat landscape.

### Audit Feed

The **Cato Networks - Audit Feed** dashboard offers a comprehensive summary of audit log activities, which provides valuable insights into system administration and changes. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Cato-Networks-Audit-Feed.png')} alt="Cato-Networks-Audit-Feed"/>
- **Total Audit Logs**. Displays the total number of audit logs which gives you an overview of the scale and volume of recorded activities. 
- **Activity Types**. The activity types widget categorizes the types of activities recorded, offering a breakdown of the different actions performed. 
- **Top 10 Active Admins**. The top 10 active admins widget highlights the most actively involved administrators, providing visibility into their level of engagement. 
- **Admin Activities Over Time**. The admin activities over time widget showcases the trend of administrative activities, enabling you to identify patterns and potential anomalies. 
- **Top 10 Modules Changed**. The top modules changed widget identifies the specific modules that have undergone the most modifications, offering insights into areas that require further investigation or monitoring. 
- **Top 10 Objects Changed**. The top objects changed widget identifies the specific objects that have undergone the most modifications, offering insights into areas that require further investigation or monitoring. 
- **Audit Summary**. The audits summary widget provides a concise summary of key audit log details, helping you to quickly understand the nature of the recorded activities. 

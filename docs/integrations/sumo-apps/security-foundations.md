---
id: security-foundations
title: Sumo Logic Security Foundations App
sidebar_label: Security Foundations
description: Shows the most important alerts to investigate and the entities that pose the greatest risk.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/SecurityAnalytics.png')} alt="Thumbnail icon" width="75"/>

The Sumo Logic Security Foundations app provides tools for real-time threat detection. The app’s dashboards focus on adversarial behavior within your environment, and show you the most important alerts to investigate and the entities that pose the greatest risk. You can even drill down on the alerts and entities to view the [MITRE ATT&CK](https://attack.mitre.org/) tactics and techniques associated with them.

The app supports the following security technologies:
* Audit
   * AWS CloudTrail
   * Azure Audit
   * Duo
   * GCP Audit (limited)
   * Linux Audit Logs
   * Microsoft Office 365
   * Microsoft SharePoint
   * Okta
   * OneLogin
   * Windows security events
* Endpoint security
   * CrowdStrike
   * Proofpoint TAP
* Network
   * All firewall vendors
   * All IDS/IPS vendors
   * Cisco Umbrella


## Install the Sumo Logic Foundations​ app

The Security Foundations app is available to Sumo Logic Enterprise Security and Enterprise Suite accounts only, and requires a Professional Services contract to install and configure. For more information, see [Requesting Sumo Logic Enterprise Apps](/docs/integrations/sumo-apps/#Requesting-Sumo-Logic-Enterprise-Apps).

## Security Foundations app dashboards​

To access the dashboards, in the **Security Foundations App** folder open the **High Risk Entity Dashboard** folder. 

### Alerts overview​

The Alerts Overview dashboard provides a holistic view into the alerts generated from rules. The following metrics are provided:

* Total alerts, with their distinct rules and Entities
* Geolocation information
* Top 10 charts
* Unusual alerts
* Spike in alerts

<img src={useBaseUrl('img/integrations/sumo-apps/security-foundations-app-alerts-overview-dashboard.png')} alt="Alerts overview dashboard" width="800"/>

#### Overview

The Overview panel of the dashboard shows the total number of alert-related elements in the system for the selected time period. 

**Total Alerts**. The number of alerts triggered.

**Total Rules Triggered**. The number of distinct rules that triggered alerts.

**Total Users**. The number of users who triggered alerts.

**Total Source IPs**. The number of source IP addresses involved in the alerts.

**Total Destination IPs**. The number of target IP addresses involved in the alerts.

**Total Hosts**. The number of hosts where alerts originated.

**Alert Frequency Trend**. The trend line for alerts. A trend increase may indicate a coordinated attack. 

#### Geolocation Information

The Geolocation panel of the dashboard shows the geographic location of IP addresses involved in events that triggered events.

**Alert Geolocation - Source IP**. The location of the source IP addresses identified in events that triggered alerts.

**Alert Geolocation - Destination IP**. The location of the destination IP addresses identified in events that triggered alerts.

#### Top 10 Charts

The Top 10 Charts panel of the dashboard shows the top Entities involved in events that triggered events.

**Top 10 Users**. Lists the top 10 users in alerts and their number of security events.

**Top 10 Hosts**. Lists the top 10 active hosts involved in alerts and their number of security events.
**
**Top 10 Source IPs**. Lists the top 10 source IP addresses in alert and their number of security events.

**Top 10 Destination IPs**.  Lists the top 10 destination IP addresses in alerts and their number of security events.

**Alerts**. Lists the top 10 alerts, including their MITRE ATT&CK tactics and techniques, and the Entities involved. Click the View Events link for an alert to see the events involved in the alert. 

**Top 15 Rules**. Lists the top 15 rules that triggered alerts.

#### Alert Anomaly

The Alert Anomaly panel of the dashboard shows rules that fired for rare alerts and spikes in alerts. 

**Rare Alerts**. Lists rules that triggered unusual alerts that fall outside the normal pattern of alerts in your system. These alerts may warrant special attention. Click the rule name for a query about the rule’s alerting.

**Spike in Alerts**. Lists rules that triggered alert spikes and the number of events for each rule. Click the rule name for a query about the rule’s alerting.

### Coverage Overview

The Coverage Overview dashboard lists [MITRE ATT&CK](https://attack.mitre.org/) tactics and techniques covered by the Security Foundations app.

**MITRE ATTA&K Coverage**. Lists the tactics, techniques, and procedures (TTPs) covered by the app, with their rules and assigned risk scores. 

<img src={useBaseUrl('img/integrations/sumo-apps/security-foundations-app-coverage-overview.png')} alt="Coverage Overview dashboard" width="800"/>

### Entity Risk Score

The Entity Risk Score dashboard lists high risk Entities in your system for the selected time period. Entities with higher risk scores indicate they were involved in more events. 

Click an Entity name to drill down to see rules and [MITRE ATT&CK](https://attack.mitre.org/) tactics and techniques involved in events for that Entity. 

<img src={useBaseUrl('img/integrations/sumo-apps/security-foundations-app-entity-risk-score-dashboard.png')} alt="Entity Risk Score dashboard" width="800"/>

**High Risk Users**. Users presenting the highest risk, including the total rules triggered by the user.

**High Risk Source IPs**. The source host IP addresses that pose the highest risk, including the total rules triggered by the source IP, the CrowdStrike threat level, and country where the source IP is located. Click the VirusTotal icon to assess whether it is a malicious IP.

**High Risk Destination IPs**. The destination host IP addresses that pose the highest risk, including the total rules triggered by the destination IP, the CrowdStrike threat level, and country where the destination IP is located. Click the VirusTotal icon to assess whether it is a malicious IP.

**High Risk Hosts**.  Hosts presenting the highest risk, including the total rules triggered by the host.

## Suppress Entities

Sometimes you may want to exclude certain Entities from being reported in alerts because you know they are safe and do not pose a threat. You can suppress Entities for a given rule by entering a comma-separated value which includes the rule ID and the Entity that you want to suppress. Suppression is a one-time action and cannot be reversed.

1. Open the **Security Analytics App Suppression Lookup Update** search. 
1. In the supplied field, replace `rule_id,entity` with the rule ID and Entity you want to suppress. If you need to suppress multiple Entities, create a CSV file with the comma-separated values and [append](/docs/search/search-query-language/search-operators/save#using-save-with-append) the CSV file to the existing lookup table.

---
id: druva-cyber-resilience
title: Druva Cyber Resilience
sidebar_label: Druva Cyber Resilience
description: The Druva Cyber Resilience app for Sumo Logic is a comprehensive and powerful solution designed to enhance your cybersecurity posture by providing real-time insights and actionable information through intuitive and informative dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/druva-logo.svg')} alt="thumbnail icon" width="85"/>

The Druva Cyber Resilience app for Sumo Logic is a comprehensive and powerful solution designed to enhance your cybersecurity posture by providing real-time insights and actionable information through intuitive and informative dashboards. This app equips security teams with the tools to effectively safeguard the digital assets, respond to security incidents, and ensure business continuity in the face of evolving cyber threats. Each dashboard within this app focuses on a specific aspect of cybersecurity and resilience, offering valuable insights into potential threats and strategies to mitigate them effectively.

Key features of the Druva Cyber Resilience app include:

- Provides a high-level overview of login events and curated snapshots, which refers to specific instances of administrative activities or events within an IT environment.
- Helps to monitor and analyze data access events across the organization's digital assets.
- Detects and mitigates potential ransomware recovery events.
- Identifies anomalies and suspicious behaviours related to unusual data usage.

## Log Types

The Druva Cyber Resilience App utilizes Sumo Logic's Druva Cyber Resilience Source to gather [Events](https://developer.druva.com/reference/listeventsbytracker) from Cyber Resilience.

## Sample log message

```json title="Sample Event"
{
      "id": 20,
      "area": "Platform",
      "category": "Admin Event",
      "type": "Admin Login",
      "occurenceTime": 1610707530,
      "syslogSeverity": 6,
      "syslogFacility": 23,
      "details": {
        "location": "Pune, India",
        "adminName": "Cloud Admin",
        "adminEmail": "cloud.admin@druva.com",
        "loginResult": "Success",
        "adminActivity": "Admin Login Event",
        "adminIPAddress": "192.168.0.100",
        "adminLoginTime": "2021-07-27T05:46:55Z"
      }
    }
```

## Sample Query

```sql title="Events Count"
_source="Milan_Druva_Cyber_Resilience_v0.0.1"
| json "id","area","category","type","syslogSeverity","syslogFacility" as id,area,category,type,syslog_severity,syslog_facility nodrop
| if (syslog_severity=0,"Emergency",if(syslog_severity = 1,"Alert",if(syslog_severity = 2,"Critical",if(syslog_severity=3,"Error",if(syslog_severity = 4,"Warning",if(syslog_severity=5,"Notice",if(syslog_severity=6,"Informational",if(syslog_severity=7,"Debug","None")))))))) as syslog_severity
// global filters
| where type matches "{{type}}"
| where category matches "{{category}}"
| where syslog_severity matches "{{syslog_severity}}"
| where area matches "{{area}}"
| count by id
| count
```

## Set up collection

To set up [Cloud to Cloud Integration Druva Cyber Resilience Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/druva-cyber-resilience-source) for the Druva Cyber Resilience App, follow the instructions provided. These instructions will guide you through the process of creating a source using the Druva Cyber Resilience source category, which you will need to use when installing the app. By following these steps, you can ensure that your Druva Cyber Resilience app is properly integrated and configured to collect and analyze your Druva Cyber Resilience data.

## Installing the Druva Cyber Resilience app​

This section has instructions for installing the Druva app for Sumo Logic.

{@import ../../reuse/apps/app-install.md}

## Viewing Druva Cyber Resilience dashboards​

{@import ../../reuse/filter-dashboards.md}

### Overview

The **Druva Cyber Resilience - Overview** dashboard provides a comprehensive perspective on the organization's cybersecurity environment. It offers insights into the distribution of resilience events categorized by type, Syslog severity, and area. Additionally, it highlights the most recurring resilience event types. Furthermore, the dashboard provides a concise overview of the latest cyber resilience events, allowing for quick situational awareness.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Druva-Cyber-Resilience/Druva-Cyber-Resilience-Overview.png')} alt="Druva-Cyber-Resilience-Overview" style={{border: '1px solid black'}} width="800"/>

### Admin Events

The **Druva Cyber Resilience - Admin Events** dashboard presents a cumulative tally of administrative events and carefully picked curated snapshots and provides insights into the success rate of administrator logins. Additionally, this dashboard provides the geographical origins of admin events and those originating from high-risk countries, the distribution of admin events by nature, the most frequent administrators engaged in activities, recent administrative events, and the breakdown of curated snapshots by resource category and the associated actions performed.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Druva-Cyber-Resilience/Druva-Cyber-Resilience-Admin-Events.png')} alt="Druva-Cyber-Resilience-Admin-Events" style={{border: '1px solid black'}} width="800"/>

### Data Access Events

The **Druva Cyber Resilience - Data Access Events** dashboard provides a tally of data access events and illustrates their trends over time, categorized by type. It offers insights into the geographical origins of data access events, including those from high-risk countries. Additionally, the distribution of data access events is presented based on their status and Syslog severity levels, highlights the most frequent resources involved in data access events, and a summary of recent data access events.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Druva-Cyber-Resilience/Druva-Cyber-Resilience-Data-Access-Events.png')} style={{border: '1px solid black'}} alt="Druva-Cyber-Resilience-Data-Access-Events" width="800"/>

### Unusual Data Activities

The **Druva Cyber Resilience - Unusual Data Activities** dashboard provides a comprehensive count of total unusual data activities and visually represents their evolving patterns over time. Additionally, this dashboard highlights the most commonly utilized resources, identifies the users associated with the highest resource usage, categorizes activities by resource type and Syslog severity, and provides an overview of all the unique and abnormal data activities.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Druva-Cyber-Resilience/Druva-Cyber-Resilience-Unusual-Data-Activities.png')} alt="Druva-Cyber-Resilience-Unusual-Data-Activities" style={{border: '1px solid black'}} width="800"/>

### Ransomware Recovery Events

The **Druva Cyber Resilience - Ransomware Recovery Events** dashboard offers a comprehensive overview of ransomware recoveries, encompassing their total count, distribution based on Syslog severity and type across time, top resource owners affected, quarantined event breakdown by resource type, geographic origins including high-risk countries, and concludes by furnishing detailed information and an overview of recent ransomware recoveries. The platform is under constant surveillance to swiftly identify and counter ransomware attacks in real time.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Druva-Cyber-Resilience/Druva-Cyber-Resilience-Ransomware-Recovery-Events.png')} style={{border: '1px solid black'}} alt="Druva-Cyber-Resilience-Ransomware-Recovery-Events" width="800"/>

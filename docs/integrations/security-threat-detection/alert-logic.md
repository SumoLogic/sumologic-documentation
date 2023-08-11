---
id: alert-logic
title: Alert Logic
sidebar_label: Alert Logic
description: The Sumo Logic app for Alert Logic provides enhanced security operations by seamlessly combining the capabilities of Alert Logic's incident detection and response with Sumo Logic's advanced log management and analytics platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/integrations/security-threat-detection/alert-logic-logo.png')} alt="thumbnail icon" width="100"/>

The Sumo Logic app for Alert Logic provides enhanced security operations by seamlessly combining the capabilities of Alert Logic's incident detection and response with Sumo Logic's advanced log management and analytics platform. This powerful integration allows you to gain comprehensive insights into your security landscape, detect potential threats, and respond effectively to security incidents.

Key features of the Alert Logic app include:

- **Real-time Threat Visibility**. Consolidate and visualize Alert Logic incident data alongside other relevant logs in Sumo Logic, providing a unified view of your security posture.
- **Incident Analysis**. Correlate Alert Logic incident data with other log sources to identify patterns, anomalies, and potential attack vectors.
- **Custom Dashboards**. Create tailored dashboards and visualizations to monitor specific Alert Logic incident types, threat trends, and security metrics.
- **Proactive Threat Hunting**. Leverage Sumo Logic's advanced search capabilities to proactively hunt for signs of compromise across your environment using Alert Logic incident data.
- **Incident Response Collaboration**. Enable cross-functional teams to collaborate efficiently by sharing relevant incident data from Alert Logic within the Sumo Logic platform.
- **Automation and Orchestration**. Build automated workflows and triggers based on Alert Logic incident data to streamline incident response processes.
- **Enhanced Security Insights**. Gain deeper insights into your security landscape by analyzing Alert Logic incidents to elevate your security posture, accelerate incident response, and effectively protect your organization against evolving threats
- **Rapid Incident Detection**. Leverage real-time correlation and alerts, to quickly detect and respond to potential security threats.
- **Improved Incident Response**. Empower your security teams to respond effectively to incidents by providing them with a holistic view of threat data and streamlined collaboration tools.
- **Customizable Monitoring**. Tailor the Alert Logic dashboard to your organization's security requirements to monitor the most relevant threat vectors.
- **Scalable Threat Hunting**. Scale your threat-hunting efforts by leveraging Sumo Logic's powerful search capabilities to hunt for threats across large volumes of data.

## Log types

This app uses Sumo Logic’s Alert Logic webhook to collect [Incident Events](https://docs.alertlogic.com/configure/connections/templated/incident.htm) from the Alert Logic Platform.

## Sample log messages

Refer to [Alert Logic guide](https://docs.alertlogic.com/configure/connections/templated/incident.htm) for sample Incident Payload.

## Sample query

```sql title="Events Count"
_sourceCategory=alertlogic
| json   "extra.status", "extra.class", "incident.threatRating", "updatetime_str", "victim", "attacker", "incident.recommendations", "incident.description","incident.summary", "incidentId",  "asset_deployment_type", "customer", "accountId" as status,  incident_class, threat_rating, timestamp, victim, attacker, recommendations, description, summary, incident_id, deployment_name, customer_name, account_id  nodrop 
| json "extra.target_host", "extra.investigation_report", "extra.class", "extra.incidentUrl", "mitre_classification[*].technique", "mitre_classification[*].tactic" as target_host, investigation_report, incident_class, incident_url, mitre_technique, mitre_tactic nodrop
| json field=attacker "ip" as attacker_ip
| json field=_raw "attacker_country_name" as attacker_location
```

## Set up collection

Follow the instructions for setting up [Webhook connection](https://docs.alertlogic.com/configure/connections/webhook.htm#CreatetheUniversalwebhookconnectionintheAlertLogicconsole) to Sumo Logic from your Alert Logic console. The Sumo Logic app for Alert Logic uses the  [Incident schema](https://docs.alertlogic.com/configure/connections/templated/incident.htm) for queries and dashboards.

## Installing the Alert Logic app​

This section has instructions for installing the Sumo Logic app for Alert Logic.

{@import ../../reuse/apps/app-install.md}

## Viewing Alert Logic dashboards​

{@import ../../reuse/filter-dashboards.md}

### Overview

The **Alert Logic - Overview** dashboard provides a holistic view of your organization's cybersecurity landscape crafted to elevate your security operations. This dashboard empowers you with comprehensive insights into incidents, enabling the detection of potential threats and the execution of efficient responses to security incidents.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Alert-Logic/Alert-Logic-Incident-Overview.png')} style={{border: '1px solid black'}} alt="Alert Logic-Overview" width="800"/>

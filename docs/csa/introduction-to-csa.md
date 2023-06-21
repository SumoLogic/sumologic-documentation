---
id: introduction-to-csa
title: Introduction to Cloud Security Analytics
sidebar_label: Introduction to Cloud Security Analytics
description: Learn basic concepts about Cloud Security Analytics. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cloud Security Analytics (CSA) is a cloud-based, enterprise-grade security analytics system. Cloud Security Analytics leverages Sumo Logic's core functionality, including data collection, ingestion, storage, and threat intelligence. Cloud Security Analytics is comprised of apps, dashboards, and tools to analyze security data.

Cybersecurity should be a major concern of any modern organization trying to survive in the current digital world.  With the continuing rise of cloud apps and services, protecting organizational networks and data needs to be high priority. Sumo Logic's Cloud Security Analytics lets you gain deep security insights and protection of your organization's cloud infrastructure, helping to protect vulnerable attack surfaces from internal and external threats. Cloud Security Analytics also makes it possible to store and use your data, both structured and unstructured, in a single security "data lake".

In this article, you'll learn some of the basics for how to use Sumo Logic's Cloud Security Analytics platform for quick, real-time threat detection and detailed log analysis. 

<img src={useBaseUrl('img/csa/windows-security-analytics.png')} alt="Windows security analytics" width="800"/>

## The Sumo Logic data pipeline

If you already use the Sumo Logic core platform, you’re probably familiar with the data pipeline:

<img src={useBaseUrl('img/csa/data-pipeline.png')} alt="Sumo Logic data pipeline" width="700"/>

1. **Data collection**. To use Sumo Logic, first you must set up either an [installed collector](/docs/send-data/installed-collectors/) or a [hosted collector](/docs/send-data/hosted-collectors/) and add a source. You can also set up source categories and other metadata, which helps you search and analyze the data you collect.
2. **Search and analyze**. Once data is in Sumo Logic, you can [write queries](/docs/search/get-started-with-search/) to search and correlate events in real-time from the analytics platform UI. 
3. **Visualize and monitor**. Once you’ve found and analyzed data that’s interesting, you can [create dashboards](docs/dashboards-new/create-dashboard-new/) to visualize it and set up alerts to monitor your data in real-time. Certain [pre-built apps](#pre-built-security-apps) come pre-configured with dashboards designed for security.
4. **Share the findings**. [Export your dashboards](/docs/dashboards-new/export-dashboard-new/) or [share with others on your team](/docs/dashboards-new/share-dashboard-new/). You can control who can view and edit your dashboards to keep your data secure.

Once you understand how your data is ingested and processed, you can design your own security data pipeline and decide which of Sumo Logic’s various security tools are right for you.


## Build security operations center (SOC) assets with Sumo Logic

Sumo Logic's core platform is built around logs and metrics. From this platform, you can: 
* write queries
* build dashboards
* create alerts

Once your data is ingested, you’ll need to search and filter it to find log messages of interest for your security operations center (SOC). With field extraction rules (FERs) and scheduled searches, data processing and querying can be automated. Once you've written these queries, you can visualize them with dashboards and create alerts based on certain thresholds.

With queries, dashboards, and alerts, you can build a SOC in Sumo Logic without any additional tools, apps, or add-ons. However, Sumo Logic does offer many other features, including:
* Integrations for common apps and services like AWS, Office365, SalesForce, and others
* Threat intelligence and security from CrowdStrike, AWS GuardDuty, Cylance, Cisco, and others
* Major compliance certifications, including PCI DSS, ISO 27001, and FedRAMP
* Built-in machine learning to help detect anomalies
* Multi-cloud, hybrid cloud, and full stack security visibility

These tools can help you and your SOC team identify, prevent, and dispatch threats. 

## Explore Sumo Logic security features

Queries are the core of Sumo Logic's data processing platform. With queries, SOC team members can display information in tables, visualize data in dashboards, and create automated alerts. Explore the following features to learn how to leverage queries for security analytics:
* **Lookup tables**. Create lookup tables to enrich the log data received by Sumo Logic. See [Create a Lookup Table](/docs/search/lookup-tables/create-lookup-table/).
* **Dashboards**. A good SOC will also have dashboards to display a number of useful metrics in easy-to-read form to allow administrators to see system status at a glance. You can set up dashboards from scratch quickly. See [Create a Dashboard](docs/dashboards-new/create-dashboard-new/).
* **Alerts**. A SOC also needs automated alerts to notify important personnel when something is amiss. Again, Sumo Logic's analytics platform makes it simple. You can learn how to set up an alert in just a few minutes. See [Create a Monitor](/docs/alerts/monitors/create-monitor/).
* **Pre-built apps**. If you don't want to write queries, build dashboards, and create alerts yourself, you can also install pre-built apps. See [Pre-built security apps](#pre-built-security-apps), next.


## Pre-built security apps

[Install the following apps](/docs/get-started/apps-integrations) to get dashboards, queries, and alerting for security monitoring and threat investigation. 
* [Security Analytics](/docs/integrations/sumo-apps/security-analytics/). App for alert analysis and Entity risk assessment. 
* [Security and threat detection](/docs/integrations/security-threat-detection/). Apps for security products, such as firewall tools, endpoint protection applications, and security automation and orchestration programs. For example, the [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/) app comes pre-loaded with queries and dashboards that leverage CrowdStrike’s threat intelligence database. 
* [Cloud security monitoring and analytics](/docs/integrations/cloud-security-monitoring-analytics/). Apps that provide security insights for data sources such as Windows, Linux, AWS CloudTrail, AWS VPC Flows, and Palo Alto Networks Firewalls. 

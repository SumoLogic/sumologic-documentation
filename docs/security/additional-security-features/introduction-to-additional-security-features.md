---
id: introduction
title: Introduction to Additional Security Features
sidebar_label: Introduction
description: Learn basic concepts about supplemental security features of Sumo Logic. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

[Cloud Infrastructure Security](/docs/security/cloud-infrastructure-security/), [Cloud SIEM](/docs/cse/), and [Cloud SOAR](/docs/cloud-soar/) are Sumo Logic's primary security solutions. But Sumo Logic offers additional security features, including apps, customizable dashboards, and tools to analyze your security data. These allow you to use Sumo Logic's core functionality, including data collection, ingestion, and storage, to produce findings that help protect your attack surfaces from threats.

You can use Sumo Logic for:
* [Threat detection and investigation](/docs/security/additional-security-features/threat-detection-and-investigation). Identify and explore threats or security-related events within your assets, applications, or networks as quickly and effectively as possible.
* [Security data lake storage](/docs/security/additional-security-features/data-lake). Store your structured and unstructured data in a centralized repository so it can be easily accessed for analytics.
* [Audit and compliance](/docs/security/additional-security-features/audit-and-compliance). Audit your systems to ensure they are in compliance with the rules set by governments and regulatory organizations. This helps protect end users and keep information private and secure, in addition to outlining protocols in the event of a breach.
* [Application security](/docs/security/additional-security-features/application-security). Monitor your software development pipeline to ensure it is secure during the continuous integration/continuous deployment (CI/CD) process and production cycle.

## The Sumo Logic data pipeline

The Sumo Logic data pipeline makes collected data available for security analysis. At a high level, it follows four steps:

<img src={useBaseUrl('img/csa/data-pipeline.png')} alt="Sumo Logic data pipeline" width="700"/>

1. **Data collection**. First, you must set up an [OpenTelemetry collector](/docs/send-data/opentelemetry-collector), [installed collector](/docs/send-data/installed-collectors), or a [hosted collector](/docs/send-data/hosted-collectors) and add a source. You can also set up source categories and other metadata, which helps you search and analyze the data you collect.
2. **Search and analyze**. Once data is in Sumo Logic, you can [write queries](/docs/search/get-started-with-search) to search events in real-time from the analytics platform UI.
3. **Visualize and monitor**. Once you’ve found and analyzed data that’s interesting, you can [create dashboards](/docs/dashboards/create-dashboard-new) to visualize it and set up alerts to monitor your data in real-time. Certain pre-built [apps](/docs/integrations) come pre-configured with dashboards designed for security.
4. **Share the findings**. [Export your dashboards](/docs/dashboards/export-dashboard-new) or [share with others on your team](/docs/dashboards/share-dashboard-new). You can control who can view and edit your dashboards to keep your data secure.

## Build security analytics assets

Using the following skills with Sumo Logic's core platform, build the infrastructure you need to be successful when doing security analysis:
* Write queries
* Build dashboards
* Create alerts

Once your data is ingested, you’ll need to search and filter it to find log messages of interest for your security analytics. With field extraction rules (FERs) and scheduled searches, data processing and querying can be automated. Finally, once you've written these queries, you can visualize them with dashboards and create alerts based on certain thresholds.

In addition to queries, dashboards, and alerts, Sumo Logic offers many other features for security analysis, including:
* Integrations for common applications and services like AWS, Office365, SalesForce, and others
* Threat intelligence and security from CrowdStrike, AWS GuardDuty, Cylance, Cisco, and others
* Maintains major compliance certifications, including PCI DSS, ISO 27001, and FedRAMP
* Multi-cloud, hybrid cloud, and full stack security visibility

These tools can help you detect previously hidden threats.

## Explore Sumo Logic security features

Queries are the core of Sumo Logic's data processing platform. With queries, you can display information in tables, visualize data in dashboards, and create automated alerts. Explore the following features to learn how to leverage queries for security analysis:
* **Lookup tables**. Create lookup tables to enrich the log data received by Sumo Logic. See [Create a Lookup Table](/docs/search/lookup-tables/create-lookup-table/).
* **Dashboards**. Dashboards to display a number of useful metrics in easy-to-read form to allow administrators to see system status at a glance. You can quickly set up custom dashboards from scratch. See [Create a Dashboard](/docs/dashboards/create-dashboard-new/).
* **Alerts**. Automated alerts notify important personnel when there may be a potential threat. Again, Sumo Logic's analytics platform makes it simple. You can learn how to set up an alert in just a few minutes. See [Create a Monitor](/docs/alerts/monitors/create-monitor/).

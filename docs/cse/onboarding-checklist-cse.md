---
id: onboarding-checklist-cse
title: Onboarding checklist for CSE
sidebar_label: Onboarding checklist for CSE
description: Must-do onboarding tasks to get up and running with Cloud SIEM.
keywords:
  - cloud siem
  - cse
  - onboarding
  - getting started
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This document provides a high-level checklist of onboarding tasks for Cloud SIEM Enterprise (CSE) administrators. This setup guide ensures you follow best practices, and helps you achieve maximum value from the CSE by helping you leverage all of the features of the Cloud SIEM solution. Sumo Logic offers a complete CSE Quickstart package through the professional services team that covers these checklist items, as well as tuning and other configurations not listed here.

Access the linked articles to learn how to perform each item in the checklist.


## Provision CSE

Cloud SIEM Enterprise must be enabled by Sumo Logic (provisioned) before it is accessible.

* [About CSE provisioning](/docs/manage/manage-subscription/create-manage-orgs-service-providers#about-cse-provisioning). Once enabled, you will see a link labeled **Cloud SIEM Enterprise** on the left side of the Sumo Logic navigation list. 
<img src={useBaseUrl('img/cse/cse-option-in-left-nav.png')} alt="Cloud SIEM Enterprise menu option" width="300"/>

* [Set up a custom subdomain](/docs/manage/manage-subscription/manage-org-settings#set-up-a-customsubdomain) (optional).  You may consider setting up a custom sub-domain. If you have multiple Sumo Logic accounts, you may find it useful to configure a custom subdomain for each of your Sumo Logic accounts. Custom subdomains can help ensure that requests are authenticated to the right account when links are received. 
* [Enable a support acccount](/docs/manage/security/enable-support-account/). If you would like [Sumo Logic Support](https://support.sumologic.com/hc/en-us) to be able to access your environment for assistance, be sure to enable Support Access.


## Set up roles and access

CSE access is controlled through [Role-Based Access Control (RBAC)](/docs/manage/users-roles/roles/role-based-access-control/).  

* [Create and manage roles](/docs/manage/users-roles/roles/create-manage-roles/). Verify that CSE Users and CSE Admins have proper permissions.


## Set up entity and domain normalization

CSE is able to normalize usernames and domains in order to improve cross-correlation.  For example, `bob@acme.com`, `bob@acme.uk` and `bob.smith` are all the same user and should be reflected as such in the records CSE creates.

* [Username and hostname normalization](/docs/cse/schema/username-and-hostname-normalization/). Enable host and domain normalization.
* [Configure an Entity Lookup Table](/docs/cse/records-signals-entities-insights/configure-entity-lookup-table/) (optional). Set up username normalization lookup. 


## Forward data to CSE

You can forward data to CSE using our [ingest guides](/docs/cse/ingestion/). The ingest process consists of configuring a source or collector to forward messages to CSE, and ensuring that the forwarded messages are correctly tagged with the information CSE needs in order to map messages fields to Record attributes. 
* [Metrics Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/metrics-data-volume-index/). Enable the Data Volume Index to track your data comsumption.
* [Sumo Logic Data Model App](/docs/integrations/sumo-apps/data-volume). Install the Data Volume App to provide you with a summary and detailed views of your account's data usage volume. 
* [Audit Event Index](/docs/manage/security/audit-event-index/). CSE Insights are stored within two audit partitions or indexes. These partitions also store configuration changes made to the CSE Environment.  Because historical reporting of this information may be required, we recommend [increasing the retention](/docs/manage/partitions-data-tiers/) of these two partitions to 365 days.
   * Increase retention for `_index=sumologic_audit_events`.
   * Increase retention for `_index=sumologic_system_events`.
* [CSE ingestion best practices](/docs/cse/ingestion/cse-ingestion-best-practices/). Forward select security data to CSE. When messages are sent to CSE, they are processed through the [records data pipeline](/docs/cse/schema/record-processing-pipeline/) for parsing and normalization into the [CSE schema](/docs/cse/schema/schema-attributes/). Each data source should be configured with the out-of-the-box parser built for that data type, and adhere to other ingestion best practices. 
* [Inventory sources and data](/docs/cse/administration/inventory-sources-and-data/). Configure Inventory Data Sources. In addition to message events, CSE leverages inventory data to pull in user and system telemetry on a predefined interval. Inventory information is then displayed for the analyst within the CSE UI.

## Install security apps and import content

Sumo Logic has apps that provide security-related data to CSE, and dashboards and searches that are useful to import to CSE. 

* [Enterprie Audit - Cloud SIEM](/docs/integrations/sumo-apps/cse/). Install the Enterprise Audit - Cloud SIEM app to monitor data that is being parsed, along with all the Signals and Insights these records are generating. The app contains multiple folders of searches and dashboards related to CSE.
* [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/). Install the Threat Intel Quick Analysis App to get security analytics, like the [threat intel dashboards](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#viewing-threat-intel-quick-analysis-dashboards), that help you detect threats in your environment. 
* [Security and threat detection](/docs/integrations/security-threat-detection/). Verify other security sources have Apps installed
* Import Crowdstrike Threat Intel Searches. Crowdstrike threat indicator matches can be configured to become signals within CSE using scheduled searches. In addition, for customers with existing scheduled search alerts, these can also be configured to become signals with CSE as well.
* Review other scheduled search alerts that might be candidates for signaling

## Set up the CSE environment

* [Set Insight generation window and threshold](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/). Configure Insight Detection Thresholds. One of the most important aspects of CSE is the CSE Detection configuration.  Customers can define how the time window and threshold the signal clustering algorithm uses to generate insights.  In many cases, the default settings are ideal.
* [Write a First Seen rule](/docs/cse/rules/write-first-seen-rule/). Configure First Seen Rule Baseline. Typically longer baselines (30 days) reduce alert noise.  However, for testing purposes, you may want to reduce the time window to generate signal data before the full baseline window has occurred. 
* [Create and use network blocks](/docs/cse/administration/create-use-network-blocks/). Define Network Blocks. Network Blocks are used to tag records with descriptive information that will help analysts and responders have the context of records, signals and insights.  This information can often be exported from DHCP servers or other network devices. Ideally, these blocks are imported at the start of the POV.
* [Create a match list](/docs/cse/match-lists-suppressed-lists/create-match-list/). Define Matchlists. Match Lists are used to enrich records at ingest time with useful metadata.  Most of the CSE rules also reference match lists in order to reduce false positives and whitelist systems, users, and domains.  A complete list of standard match lists can be found here.  At a minimum, we recommend starting the POV with Vulnerability Scanners and Verified Domains.
Note: Some rules will be too noisy if you do not configure the proper match lists for tuning. IE Admin IPs, Admin Users, AWS Admins etc. 
* [Create a custom threat intel source](/docs/cse/administration/create-custom-threat-intel-source/). Configure external threat feeds. Threat Intelligence is heavily leveraged within CSE to do real-time comparisons against known-bad indicators.  For the POV, we will configure popular free threat feeds, but if your security team pays for premium threat intelligence (RecordedFuture, Anomali, Crowdstrike, ThreatConnect etc), please let us know so we can configure these.
* Configure custom actions and integrations. External Integrations are varied and extensive in the application.  Typically, we’d like to showcase at least one integration to show how easy it is to pivot from CSE indicators to external tools.  VirusTotal is a good example.  Also, using the Insight Enrichment Server, API calls can be made to EDR platforms like CrowdStrike and CarbonBlack automatically every time an insight triggers. You may also want to set up automated notifications when rules move to a degraded state. CSE Includes a built-in workflow, wherein Insights can be assigned to users and stages as they are investigated.  This can be customized. Notifications can also be configured to be sent when Insights are assigned to users. Show User Telemetry is a good context action to setup. 
* Enable Insight assignment email notifications. 
When enabled, users will get an email whenever another user assigns an Insight to them.
* [Rule actions](/docs/cse/administration/create-cse-actions/#rule-actions). Enable rule degradation notification
* [Managing custom Inisght statuses](/docs/cse/administration/manage-custom-insight-statuses/) (optional). Customize Insight Workflow.
* Configure User Telemetry Custom Pivot Action. This is a huge value add, but requires some SE Setup. SE will have to import the dashboards, CUSTOMIZE the panels to the data sources available, and configure the right-click context actions to pivot between CSE and CIP. 

## Insight Enrichment Server

* [Insight Enrichment Server](/docs/cse/integrations/insight-enrichment-server/). Install Enrichment Server. The Insight Enrichment Server is a lightweight agent with enrichment scripts to gather information on entities when insights fire (User/System Info). It is installed within the enterprise on a Windows VM.

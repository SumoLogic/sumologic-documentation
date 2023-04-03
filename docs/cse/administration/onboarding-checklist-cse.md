---
id: onboarding-checklist-cse
title: Onboarding Checklist for CSE
sidebar_label: Onboarding Checklist for CSE
description: Onboarding tasks to get up and running with Cloud SIEM.
keywords:
  - cloud siem
  - cse
  - onboarding
  - getting started
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article provides a high-level checklist of onboarding tasks and best practices for Cloud SIEM Enterprise (CSE) administrators. This setup guide shows you how to maximize value from CSE by leveraging all of its features. 

Sumo Logic also offers a complete CSE Quickstart package through the Professional Services team that covers these checklist items, as well as tuning and other configurations not listed here.

Access the linked articles to learn how to perform each item in the checklist.


## Provision CSE

Sumo Logic must enable (provision) Cloud SIEM Enterprise before you can access it.

* [Create and Manage Organizations (Service Providers)](/docs/manage/manage-subscription/create-manage-orgs-service-providers/). Once Sumo Logic [provisions CSE](/docs/manage/manage-subscription/create-manage-orgs-service-providers#about-cse-provisioning), you see a link labeled **Cloud SIEM Enterprise** on the left side of the Sumo Logic navigation list. <br/><img src={useBaseUrl('img/cse/cse-option-in-left-nav.png')} alt="Cloud SIEM Enterprise menu option" width="300"/>
* [Manage Organizational Settings](/docs/manage/manage-subscription/manage-org-settings) (optional). If you have multiple Sumo Logic accounts, you may find it useful to [set up a custom subdomain](/docs/manage/manage-subscription/manage-org-settings#set-up-a-customsubdomain) for each of your accounts. Custom subdomains help ensure that requests authenticate to the right account. 
* [Enable a Support Account](/docs/manage/security/enable-support-account/). If you need [Sumo Logic Support](https://support.sumologic.com) assistance, enable this feature to grant our agents permission to access your environment.


## Set up roles and access

Configure [Role-Based Access Control (RBAC)](/docs/manage/users-roles/roles/role-based-access-control/) to manage access to the CSE. 

* [Create and Manage Roles](/docs/manage/users-roles/roles/create-manage-roles/). Verify that CSE users and administrators have proper permissions.


## Set up entity and domain normalization

CSE can normalize usernames and domains to improve cross-correlation. For example, `bob@acme.com`, `bob@acme.uk` and `bob.smith` designate the same user and should be reflected as such in the records CSE creates.

* [Username and Hostname Normalization](/docs/cse/schema/username-and-hostname-normalization/). Enable host and domain normalization.
* [Configure an Entity Lookup Table](/docs/cse/records-signals-entities-insights/configure-entity-lookup-table/) (optional). Set up username normalization lookup. 


## Forward data to CSE

You can forward data to CSE using our [ingest guides](/docs/cse/ingestion/). The ingest process consists of configuring a source or collector to forward messages to CSE, and ensuring that the forwarded messages are correctly tagged with the information CSE needs to map message fields to Record attributes. 
* [Metrics Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/metrics-data-volume-index/). Enable the Data Volume Index to track your data comsumption.
* [Sumo Logic Data Volume App](/docs/integrations/sumo-apps/data-volume). Install the Data Volume App to provide you with a summary and detailed views of your account's data usage volume. 
* [Audit Event Index](/docs/manage/security/audit-event-index/). CSE stores Insights within two audit partitions or indexes. These partitions also retain configuration changes made to the CSE Environment. Because compliance standards may require historical reporting of this information, we recommend [increasing the retention](/docs/manage/security/audit-event-index#search-the-audit-event-index) of the following partitions to 365 days:
  * `_index=sumologic_audit_events`
  * `_index=sumologic_system_events`
* [CSE Ingestion Best Practices](/docs/cse/ingestion/cse-ingestion-best-practices/). Forward select security data to CSE. When messages get sent to CSE, they are processed through the [records data pipeline](/docs/cse/schema/record-processing-pipeline/) for parsing and normalization into the [CSE schema](/docs/cse/schema/schema-attributes/). Configure each data source with the out-of-the-box parser built for that data type, and adhere to other ingestion best practices. 
* [Inventory Sources and Data](/docs/cse/administration/inventory-sources-and-data/). Configure Inventory Data Sources to properly ingest inventory data from services. In addition to message events, CSE leverages inventory data to pull in user and system telemetry on a predefined interval. The CSE UI displays this inventory information for analysts.

## Install security apps and import content

Sumo Logic has apps that provide security-related data to CSE, and dashboards and searches that you may find useful to import to CSE. 

* [Enterprie Audit - Cloud SIEM](/docs/integrations/sumo-apps/cse/). Install the Enterprise Audit - Cloud SIEM app to monitor parsed data, along with all the Signals and Insights these records generate. The app contains multiple folders of searches and dashboards related to CSE.
* [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/). Install the Threat Intel Quick Analysis App to get security analytics, like the threat intel dashboards, that help you detect threats in your environment. 
* [Security and Threat Detection](/docs/integrations/security-threat-detection/). Install apps for your security sources.
* [Crowdstrike Falcon Endpoint Protection](/docs/integrations/security-threat-detection/crowdstrike-falcon-endpoint-protection). Import Crowdstrike Threat Intel [pre-built searches](/docs/integrations/security-threat-detection/crowdstrike-falcon-endpoint-protection#parsersfers-folder). You can configure Crowdstrike threat indicator matches to become signals within CSE using scheduled searches. 
* [Generate CSE Signals With a Scheduled Search](/docs/alerts/scheduled-searches/generate-cse-signals/). If you have existing scheduled search alerts, configure them to become Signals within CSE.


## Set up the CSE environment

Perform basic configuration to ensure you optimize the CSE environment.

* [Set Insight Generation Window and Threshold](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/). Configure the detection window and the threshold Activity Score for Insight generation. Use care if you decide to change settings. In many cases, the default settings are ideal.
* [Write a First Seen rule](/docs/cse/rules/write-first-seen-rule/). Configure a First Seen Rule baseline. Typically longer baseline learning periods (more than the 30 day minimum) reduce alert noise. However, for testing purposes, you may want to reduce the time window to generate signal data before the full baseline window has occurred. 
* [Create and Use Network Blocks](/docs/cse/administration/create-use-network-blocks/). Define Network Blocks to tag records with descriptive information that help analysts and responders have the context for Records, Signals, and Insights. You can often export this information from DHCP servers or other network devices. 
* [Create a Match List](/docs/cse/match-lists-suppressed-lists/create-match-list/). Define Match Lists to enrich Records at ingest time with useful metadata. Most of the CSE rules also reference Match Lists to reduce false positives and whitelist systems, users, and domains. We recommend setting up Match Lists for vulnerability scanners and verified domains. Note that some rules may generate too many alerts if you do not configure the proper Match Lists for tuning, such as for administrator IPs, administration users, AWS adminstrators, and so on. 
* [Create a Custom Threat Intel Source](/docs/cse/administration/create-custom-threat-intel-source/). Configure external threat feeds to do real-time comparisons against known-bad indicators. Professional Services configure popular free threat feeds for you during initial configuration. But if your security team pays for premium threat intelligence (such as RecordedFuture, Anomali, Crowdstrike, ThreatConnect, or others), let your account representative know so that Professional Services can configure these.
* [Integrations](/docs/cse/integrations/). Configure custom integrations to enrich Insights. For example, enable VirusTotal enrichment to add malware information.
* [CSE Actions](/docs/cse/administration/create-cse-actions) and [Create CSE Context Actions](/docs/cse/administration/create-cse-context-actions/). Create actions and context actions to assist investigations. For example, you can create a CSE action to [send automated notifications](/docs/cse/administration/create-cse-actions#rule-actions) when rules move to a degraded state, or [configure a context action](/docs/cse/administration/create-cse-context-actions#configure-a-context-action) to show user telemetry. You can also [enable Insight email notifications](/docs/cse/administration/create-cse-actions#email) so that users get an email whenever another user assigns an Insight to them.
* [Managing Custom Inisght Statuses](/docs/cse/administration/manage-custom-insight-statuses/) (optional). Customize the Insight workflow to manage custom Insight statuses.


## Install the Insight Enrichment Server

The Insight Enrichment Server is a lightweight agent that uses enrichment scripts to add information to Insights. 

* [Insight Enrichment Server](/docs/cse/integrations/insight-enrichment-server/). Install the Insight Enrichment Server to gather information on Entities when Insights fire. It can even make API calls to EDR platforms like CrowdStrike and CarbonBlack to gather information. 

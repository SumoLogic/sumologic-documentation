---
id: onboarding-checklist-cse
title: Onboarding Checklist for Cloud SIEM Administrators
sidebar_label: Onboarding Checklist for Cloud SIEM Administrators
description: Onboarding tasks to get up and running with Cloud SIEM.
keywords:
  - cloud siem
  - cse
  - onboarding
  - getting started
  - installation
  - install
  - configuration
  - configure
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article provides a high-level checklist of Cloud SIEM installation and configuration tasks for Cloud SIEM administrators. 

## Onboard with Professional Services

While you might be able to do some of the tasks in this checklist on your own, many require the assistance of the Professional Services team.  Therefore, do not attempt to do the checklist on your own. Ask your Sumo Logic account representative to engage the Professional Services team to guide you through the onboarding tasks. Sumo Logic offers a complete Quickstart package through the Professional Services team that covers these tasks, as well as other configurations not listed here. We provide this article as a convenience to help you keep track of your work as Professional Services helps you onboard to Cloud SIEM.

## Prepare for onboarding

Before onboarding, it’s important that you understand how your data will be used in Cloud SIEM. Doing so makes the engagement process with Professional Services run more smoothly. Before meeting with Professional Services:

* Know your data sources. It becomes easier to start the engagement with Professional Services if you know the data sources that are in scope for Cloud SIEM.
* Be familiar with the data flow. Before meeting with Professional Services, you should be familiar with how data moves from the Sumo Logic core platform to Cloud SIEM. For more information, see [CSE Ingestion Best Practices](/docs/cse/ingestion/cse-ingestion-best-practices).
* Know the use cases. If you are aware of the rules, dashboards, and alerts that you are interested in within Cloud SIEM, it helps Professional Services plan setup. For example, in some cases you may not need custom rules and can rely on out-of-the-box rules in Cloud SIEM.
* Be familiar with components of Cloud SIEM. Get to know about components such as entity tagging, network blocks, match lists, and threat intel.

After you have prepared for onboarding, you’re ready to meet with Professional Services to set up Cloud SIEM.

## Initial setup

Work with Professional Services to perform the tasks in the following sections to do initial setup of your Cloud SIEM environment.

### Provision Cloud SIEM 

Cloud SIEM must be enabled by Sumo Logic before it is accessible. Once enabled, you will see a link labeled Cloud SIEM Enterprise on the left side of the Sumo Logic navigation list.

<img src={useBaseUrl('img/cse/cse-option-in-left-nav.png')} alt="Cloud SIEM Enterprise menu option" width="300"/> 

To further set up your instance, you may consider setting up a custom sub-domain. You can also enable Support Access if you would like Sumo Logic Support to be able to access your environment for assistance.

See:
* The [Set up a custom subdomain](/docs/manage/manage-subscription/manage-org-settings#set-up-a-customsubdomain) section of the [Manage Organization Settings](/docs/manage/manage-subscription/manage-org-settings/) article 
* [Enable a Support Account](/docs/manage/security/enable-support-account/) 

### Set up users

Perform the following steps to set up users in Cloud SIEM.

#### Configure Cloud SIEM users and roles

Cloud SIEM access is controlled through the unified role-based access controls (RBAC). We recommend creating two Cloud SIEM Roles starting out with the following capabilities, but you are welcome to adjust them to your company needs:
* **Cloud SIEM Analyst**<br/>Add the following capabilities:
   * Cloud SIEM Enterprise
      * View Cloud SIEM Enterprise
      * Insights
         * Comment on Insights
* **Cloud SIEM Administrator**<br/>Add the following capabilities (add all capabilities under Cloud SIEM Enterprise):
   * Cloud SIEM Enterprise
      * View Cloud SIEM Enterprise
         * Insights
         * Content
         * Configuration

Also make sure to verify that Cloud SIEM users have necessary access permissions.

See: 
* [Create and Manage Roles](/docs/manage/users-roles/roles/create-manage-roles/)
* The [Cloud SIEM Enterprise](/docs/manage/users-roles/roles/role-capabilities#cloud-siem-enterprise) section of the [Role Capabilities](/docs/manage/users-roles/roles/role-capabilities/) article

#### Set up username and domain normalization

Cloud SIEM can normalize usernames and domains to improve cross-correlation. For example, `bob@acme.com`, `bob@acme.uk`, and `bob.smith` are all the same user and should be reflected as such in the records the Cloud SIEM creates. It is important to do this as thoroughly as possible prior to sending logs to Cloud SIEM so that usernames and domains are consistent across all log data received. As part of this work, you may choose to set up an entity lookup table. 

See:
* [Username and Hostname Normalization](/docs/cse/schema/username-and-hostname-normalization/)
* [Configure an Entity Lookup Table](/docs/cse/records-signals-entities-insights/configure-entity-lookup-table/)

### Forward data to Cloud SIEM

Professional Services will work closely with you to forward data to Cloud SIEM. After forwarding, they will validate if the data is normalized to the Cloud SIEM schema, and make adjustments to parsing and mapping when needed.

#### Ingest data

Begin forwarding data to Cloud SIEM using our [ingest guides](/docs/cse/ingestion/). Sending data to the Cloud SIEM Data tier consumes credits, and credit consumption can be tracked by enabling the Metrics Data Volume Index and installing the Data Volume app.

See:
* [CSE Ingestion](/docs/cse/ingestion/)
* [Metrics Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/metrics-data-volume-index/)
* [Sumo Logic Data Volume App](/docs/integrations/sumo-apps/data-volume/)

#### Configure partitions

Cloud SIEM Insights are stored within two audit partitions. These partitions also store configuration changes made to the Cloud SIEM environment. Because historical reporting of this information may be required, we recommend increasing the retention of these two partitions to 365 days:
* `_index=sumologic_audit_events`
* `_index=sumologic_system_events`

See: The [Search the Audit Event Index](/docs/manage/security/audit-event-index#search-the-audit-event-index) section of the [Audit Event Index](/docs/manage/security/audit-event-index/) article

#### Create parsers

When messages are sent to Cloud SIEM, they are processed through the records data pipeline (parsers to log mappers) for parsing and normalization into the Cloud SIEM schema. Each data source should be configured with the out-of-the-box parser built for that data type, and adhere to other ingestion best practices. If Sumo Logic doesn’t provide an out-of-the-box parser or log mapper for some of your sources, we can help you create the parsers. You’ll need to specify `_siemForward` and `_parser` fields as needed, or use the **Forward to SIEM** checkbox where possible when configuring sources. 

See: 
* [CSE Ingestion Best Practices](/docs/cse/ingestion/cse-ingestion-best-practices/)
* [Record Processing Pipeline](/docs/cse/schema/record-processing-pipeline/)
* [CSE Schema Attributes](/docs/cse/schema/schema-attributes/)
* [Parser Editor](/docs/cse/schema/parser-editor/)

#### Forward inventory data to Cloud SIEM

In addition to message events, Cloud SIEM leverages inventory sources to pull in user and system telemetry on a predefined interval. Inventory information is then displayed for the analyst within the Cloud SIEM UI. Configure inventory sources as needed to forward data.

See: 
* [Inventory Sources and Data](/docs/cse/administration/inventory-sources-and-data/)
* [Configure a Custom Inventory Source](/docs/cse/administration/custom-inventory-sources/)

### Install and configure security apps

Perform the following tasks to install security apps that provide data to Cloud SIEM, and to configure apps to improve threat intel searches.

#### Install security apps

Install the Cloud SIEM App to monitor data that is parsed, along with all the signals and Insights that records generate. The app contains multiple folders of searches and dashboards related to Cloud SIEM.

Also install any out-of-the-box apps or dashboards for security data sources we support, including CrowdStrike’s Threat Intel Quick Analysis app. These apps are useful for quick visualizations and configuring context actions to pivot directly to from Cloud SIEM. 

See:
* [Enterprise Audit - Cloud SIEM](/docs/integrations/sumo-apps/cse/)
* [Security and Threat Detection](/docs/integrations/security-threat-detection/)
* [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/)

#### Import Crowdstrike threat intel searches

You can configure Crowdstrike threat indicator matches from the Threat Intel Quick Analysis app to become signals within Cloud SIEM using scheduled searches. An example would be to fire a Cloud SIEM signal from a scheduled search when there is a highly malicious threat intel match on device IPs. Review other current scheduled search alerts that might be candidates for generating signals.

See: 
* [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/)
* [Generate CSE Signals With a Scheduled Search](/docs/alerts/scheduled-searches/generate-cse-signals/)

## Initial configuration

Work with Professional Services to perform the tasks in the following sections to do initial configuration of useful tools in your Cloud SIEM environment.

### Set detection thresholds

One of the most important aspects of Cloud SIEM is detection configuration for Insight generation. While you can define the detection window and the threshold Activity Score for Insight generation yourself, in most cases the default settings are ideal.

See: [Set Insight Generation Window and Threshold](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/)

### Create custom statuses

Cloud SIEM statuses allow you to organize your incident response pipeline and track the progress of Insight remediation. Create custom statuses as needed for your environment. 

See: [Managing Custom Insight Statuses](/docs/cse/administration/manage-custom-insight-statuses/)

### Define network blocks

Network blocks tag records with descriptive information that will help analysts and responders have the context of records, signals, and Insights. To define network blocks, you can often export the information from DHCP servers or other network devices. 

See: [Create and Use Network Blocks](/docs/cse/administration/create-use-network-blocks/)

### Configure threat intel feeds

Cloud SIEM heavily leverages threat intelligence to do real-time comparisons against known bad indicators. You can configure popular free threat feeds. But if your security team pays for premium threat intelligence (such as RecordedFuture, Anomali, Crowdstrike, ThreatConnect, etc), you can configure these too.

See: [Create a Custom Threat Intel Source](/docs/cse/administration/create-custom-threat-intel-source/)

### Create lists
Perform the following steps to create lists to allow or suppress information monitored for Cloud SIEM. 

#### Create match lists

Match lists enrich records at ingest time with useful metadata. Most of the Cloud SIEM rules also reference match lists to reduce false positives and to allowlist systems, users, and domains. At a minimum, you should create match lists for vulnerability scanners and verified domains. To prevent rules from being too noisy, you should also create match lists for admin IPs, admin users, AWS admins, and the like. 

See: 
* [Create a Matchlist](/docs/cse/match-lists-suppressed-lists/create-match-list/)
* The [Standard match lists](/docs/cse/match-lists-suppressed-lists/standard-match-lists#standard-match-lists) section of the [Entity Tags and Standard Match Lists](/docs/cse/match-lists-suppressed-lists/standard-match-lists/) article

#### Set up suppressed lists

Set up suppressed lists as needed to suppress signals that you don’t want to fire. You configure suppressed lists similar to how you configure match lists. But suppressed lists are not referenced in rules, and they suppress all signals for a given indicator instead. 

See: [Suppressed lists](/docs/cse/match-lists-suppressed-lists/suppressed-lists/)

#### Suppress entities and adjust criticality levels

Suppress entities that you know do not need to fire signals. Also adjust criticality levels as needed for known entities. 

See: 
* [View and Manage Entities](/docs/cse/records-signals-entities-insights/view-manage-entities/)
* [Entity Criticality](/docs/cse/records-signals-entities-insights/entity-criticality/)

#### Create entity groups and custom entity types

Create entity groups to apply tags, criticality, or suppression at large scale. And while Cloud SIEM has a number of built-in entity types (for example, IP address, hostname, and username), you can create custom entity types for entities that are not recognized out-of-the-box. 

See: 
* [Create an entity group](/docs/cse/records-signals-entities-insights/create-an-entity-group/)
* [Create a custom entity type](/docs/cse/records-signals-entities-insights/create-custom-entity-type/)

### Create actions

Perform the following tasks to create actions to run in Cloud SIEM.

#### Create Cloud SIEM actions

You can create actions in Cloud SIEM to issue notifications when certain events occur. For example, you can create an action that sends information about an Insight to another system, either automatically when the Insight is created, or on-demand from the Insight's **Actions** menu. You can also create actions for other use cases, such as integrations with tools (for example, JIRA, Slack, etc.), or to send an email to analysts when they are assigned Insights.

See: [Create CSE Actions](/docs/cse/administration/create-cse-actions/)

#### Create Context Actions

A Context Action is an option that a Cloud SIEM analyst can use to query an external system for information about an Entity, IOC, or data encountered in a Record. For example, you could create a Context Action to check an IP address against a threat intel service, look up a username, or run a log search in Sumo Logic for a hostname.

You could also create a Context Action to show users’ Google activity. For example, install the Google Workspace app and set up the User Activity dashboard. Then create a context action to pivot directly to the dashboard from Cloud SIEM usernames. 

See: 
* [Create CSE Context Actions](/docs/cse/administration/create-cse-context-actions/)
* The [User Activity](/docs/integrations/google/workspace/install-app-dashboards/#user-activity) section of the [Google Workspace App and Dashboards](/docs/integrations/google/workspace/install-app-dashboards/) article

### Configure rules

Perform the following tasks to set up the rules that fire signals.

#### Create custom rules

Create custom rules as needed depending on your situation. Before you create custom rules, however, check built-in rules to ensure that there isn’t already a rule available to cover your needs. If you want to be alerted when custom rules are disabled, you can create an action.

See: 
* [CSE Rules](/docs/cse/rules/)
* [CSE Built-In Rules](/docs/cse/rules/cse-built-in-rules/)
* [Create CSE Actions](/docs/cse/administration/create-cse-actions/)

#### Create rule tuning expressions

You can create a rule tuning expression and apply it to multiple rules. A rule tuning expression allows you to extend a rule expression. Every rule has a rule expression, to which incoming records are compared. When a record matches a rule expression, and other rule criteria are satisfied, the rule generates a signal. A rule tuning expression is combined with a rule expression—either with a logical AND or NOT—and the rule will only generate a signal if a record matches the combined expression. 

See: [Rule Tuning Expressions](/docs/cse/rules/rule-tuning-expressions/)

#### Configure First Seen rule baseline

First Seen rules allow you to generate a signal when behavior by an Entity (such as a user) is encountered that hasn't been seen before. Cloud SIEM automatically creates a baseline model of normal behavior over a 30-day period. Typically longer baselines (such as 30 days) reduce alert noise. However, for testing purposes, you may want to reduce the time window to generate signal data before the full baseline window has occurred.

See: [Write a First Seen Rule](/docs/cse/rules/write-first-seen-rule/)

#### Adjust rules with Insight Trainer

The Insight Trainer is a dashboard in the Cloud SIEM app that offers recommendations for making adjustments to rules. Follow the recommendations to make your rules more effective at creating high-fidelity signals.

See: [Improve Rules with Insight Trainer](/docs/cse/rules/insight-trainer/)

### Configure the Automation Service

The Automation Service allows you to automate smart actions, including enrichments and notifications. You can run automations manually, or at Insight creation or closure.

See: [Automation Service](/docs/cse/automation-service/)

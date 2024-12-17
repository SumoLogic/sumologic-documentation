---
id: cloud-siem-ui
title: Cloud SIEM User Interface
sidebar_label: User Interface
description: Learn about the Cloud SIEM user interface.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Theme from '../../reuse/dark-light-theme.md';

## Access Cloud SIEM
 
To access Cloud SIEM, in the main Sumo Logic menu select **Cloud SIEM**.  <br/><img src={useBaseUrl('img/cse/cse-option-in-left-nav.png')} alt="Cloud SIEM menu option" style={{border: '1px solid gray'}} width="200"/>

Cloud SIEM must be enabled by Sumo Logic before it is accessible to users in your organization. For more information, see [Onboarding Checklist for Cloud SIEM Administrators](/docs/cse/get-started-with-cloud-siem/onboarding-checklist-cse/).

## Theme

<Theme/>

## Heads Up Display

The first screen you see when you access Cloud SIEM is the Heads Up Display, a single pane of information about your environment. In the center, you'll see a radar showing insights, surrounded by the signals and records used to generate the insights. On the left is summary information, and on the right is recent activity. Use this screen as the starting place for your investigations, focusing on insights as the most valuable place to start.

For more information, see [Cloud SIEM Heads Up Display](/docs/cse/get-started-with-cloud-siem/cse-heads-up-display/).

## Cloud SIEM menus

### Classic UI

The classic UI is the traditional way to navigate in Sumo Logic. For more information, see [Tour the Sumo Logic Classic UI](/docs/get-started/sumo-logic-ui-classic).
 
#### Top menu

This menu appears at the top of the Cloud SIEM screen: <br/><img src={useBaseUrl('img/cse/cloud-siem-menu.png')} alt="Top menu bar" style={{border: '1px solid gray'}} width="800"/>

Use the top menu to access:
* <img src={useBaseUrl('img/cse/cloud-siem-insights-icon.png')} alt="Insights menu icon" style={{border: '1px solid gray'}} width="30"/> [**Insights**](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/). View insights, clusters of events that require investigation. An insight is created when a high level of suspicious activity is detected for a single entity, such as a user, IP address, host, or domain.
* <img src={useBaseUrl('img/cse/cloud-siem-signals-icon.png')} alt="Signals menu icon" style={{border: '1px solid gray'}} width="30"/> [**Signals**](/docs/cse/records-signals-entities-insights/view-records-signal/). View signals, indicators for events of interest that fire when rule conditions are met.
* <img src={useBaseUrl('img/cse/cloud-siem-entities-icon.png')} alt="Entities menu icon" style={{border: '1px solid gray'}} width="30"/> [**Entities**](/docs/cse/records-signals-entities-insights/view-manage-entities/). View entities, unique actors encountered in incoming messages, such as a user, IP address, or host.
* <img src={useBaseUrl('img/cse/cloud-siem-records-icon.png')} alt="Records menu icon" style={{border: '1px solid gray'}} width="30"/> [**Records**](/docs/cse/records-signals-entities-insights/view-records-signal/). View records, collections of normalized data created from a message.
* <img src={useBaseUrl('img/cse/cloud-siem-content-icon.png')} alt="Content menu icon" style={{border: '1px solid gray'}} width="30"/> [**Content**](#content-menu). Create Cloud SIEM content, such as rules.
* <img src={useBaseUrl('img/cse/cloud-siem-configuration-menu-icon.png')} alt="Configuration menu icon" style={{border: '1px solid gray'}} width="30"/> [**Configuration**](#configuration-menu). Configure Cloud SIEM.
* <img src={useBaseUrl('img/cse/cloud-siem-help-icon.png')} alt="Help menu icon" style={{border: '1px solid gray'}} width="30"/> **Help**. Access feature guides, documentation, release notes, and system status.
* <img src={useBaseUrl('img/cse/cloud-siem-switch-apps-icon.png')} alt="Switch Apps menu icon" style={{border: '1px solid gray'}} width="30"/> **Switch Apps**. Access the Sumo Logic [Log Analytics Platform](/docs/get-started/sumo-logic-ui/) or [Cloud SOAR](/docs/cloud-soar/) (if enabled in your organization).
* <img src={useBaseUrl('img/cse/cloud-siem-profile-icon.png')} alt="Profile menu icon" style={{border: '1px solid gray'}} width="30"/> **Profile**. View your Cloud SIEM username and time zone.

#### Content menu

The **Content** menu allows you to create elements to customize Cloud SIEM. To access the menu, click **Content** on the [top menu](#top-menu). <br/><img src={useBaseUrl('img/cse/cloud-siem-content-menu.png')} alt="Content menu" style={{border: '1px solid gray'}} width="300"/>

Use the **Content** menu to access:
* [**Rules**](/docs/cse/rules/). Manage rules, sets of logic that create signals based on information in incoming records.
* [**Rule Tuning**](/docs/cse/rules/rule-tuning-expressions/). Manage rule tuning expressions, which are extensions to rules.
* [**Threat Intelligence**](/docs/cse/administration/create-custom-threat-intel-source/). Manage sources of threat intelligence indicators, individual data points about threats that are gathered from external sources. 
* [**Match Lists**](/docs/cse/match-lists-suppressed-lists/create-match-list/). Manage match lists, lists of important indicators and identifiers that you want to be addressed by rules.
* [**File Analysis**](/docs/cse/rules/import-yara-rules/). Manage sources for YARA rules.
* [**Custom Insights**](/docs/cse/records-signals-entities-insights/configure-custom-insight/). Manage custom insights, methods to generate insights on some basis other than entity Activity Scores.
* [**Network Blocks**](/docs/cse/administration/create-use-network-blocks/). Manage network blocks, groups of IP addresses that you can use in rules.
* [**Suppressed Lists**](/docs/cse/match-lists-suppressed-lists/suppressed-lists/). Manage suppressed lists, lists of indicators that can suppress signal generation.
* [**MITRE ATT&CK Coverage**](/docs/cse/administration/mitre-coverage/). View the MITRE ATT&CK Threat Coverage Explorer, a screen that shows the MITRE ATT&CK adversary tactics, techniques, and procedures that are covered by rules in your system.

#### Configuration menu

The **Configuration** menu allows you to configure Cloud SIEM. To access this menu, click <img src={useBaseUrl('img/cse/cloud-siem-configuration-menu-icon.png')} alt="Configuration menu icon" style={{border: '1px solid gray'}} width="30"/> on the [top menu](#top-menu).<br/><img src={useBaseUrl('img/cse/cloud-siem-configuration-menu.png')} alt="Configuration menu" style={{border: '1px solid gray'}} width="500"/>

Use the **Configuration** menu to access:
* **Incoming Data**
   * [**Log Mappings**](/docs/cse/schema/create-structured-log-mapping/). Manage log mappings, maps that tell Cloud SIEM how to build a record from the key-value pairs extracted from messages.
* **Entities**
   * [**Groups**](/docs/cse/records-signals-entities-insights/create-an-entity-group/). Manage groupings of entities that can be used in rules. 
   * [**Normalization**](/docs/cse/schema/username-and-hostname-normalization/). Manage normalizing usernames and hostnames in records during the parsing and mapping process.  
   * [**Custom Types**](/docs/cse/records-signals-entities-insights/create-custom-entity-type/). Manage custom types to more precisely categorize entities.
   * [**Criticality**](/docs/cse/records-signals-entities-insights/entity-criticality/). Adjust the severity of signals for specific entities based on some risk factor or other consideration.
* **Workflow**
   * [**Detection**](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/). Set the insight detection threshold. 
   * [**Statuses**](/docs/cse/administration/manage-custom-insight-statuses/). Manage custom insight statuses.
   * [**Resolutions**](/docs/cse/administration/manage-custom-insight-resolutions/). Manage custom insight resolutions.
   * [**Tag Schemas**](/docs/cse/administration/create-a-custom-tag-schema/). Manage schemas for tags, metadata you can attach to insights, signals, entities, and rules. 
* **Integrations**
   * [**Sumo Logic**](/docs/cse/ingestion/sumo-logic-ingest-mapping/). Configure mapping of message fields to record attributes. 
   * [**Context Actions**](/docs/cse/administration/create-cse-context-actions/). Create actions that a Cloud SIEM analyst can use to query an external system for information about an entity, IOC, or data encountered in a record. 
   * [**Actions**](/docs/cse/administration/create-cse-actions/). Create actions to issue a notification to another service when certain events occur in Cloud SIEM.
   * [**Enrichment**](/docs/cse/integrations/enrichments-and-indicators/). Manage elements that enrich data in Cloud SIEM.
   * [**Automation**](/docs/cse/automation/). Create smart actions that trigger automatically when certain events occur in Cloud SIEM.

### New UI

The new UI provides a streamlined way to navigate in Sumo Logic. For more information, see [Tour the Sumo Logic UI](/docs/get-started/sumo-logic-ui).

#### Sidebar menu

Click **Cloud SIEM** in the main Sumo Logic menu to open the sidebar menu. <br/><img src={useBaseUrl('img/cse/cloud-siem-sidebar-menu.png')} alt="Cloud SIEM sidebar menu" style={{border: '1px solid gray'}} width="400"/>

Use the **Cloud SIEM** sidebar menu to access:
* **Search Cloud SIEM**. Search for [insights](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/), [signals](/docs/cse/records-signals-entities-insights/view-records-signal/), [entities](/docs/cse/records-signals-entities-insights/view-manage-entities/), and [records](/docs/cse/records-signals-entities-insights/view-records-signal/). When you click in the search bar, you're prompted to select one of those types. Once you select a type, you're presented with a list of fields to filter on. 
* **Security Events**
    * [**SIEM Overview**](/docs/cse/get-started-with-cloud-siem/cse-heads-up-display/). View the Cloud SIEM Heads Up Display. 
    * [**Insights**](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/). View insights, clusters of events that require investigation. An insight is created when a high level of suspicious activity is detected for a single entity, such as a user, IP address, host, or domain.
    * [**Signals**](/docs/cse/records-signals-entities-insights/view-records-signal/). View signals, indicators for events of interest that fire when rule conditions are met.
    * [**Entities**](/docs/cse/records-signals-entities-insights/view-manage-entities/). View entities, unique actors encountered in incoming messages, such as a user, IP address, or host.
    * [**Records**](/docs/cse/records-signals-entities-insights/view-records-signal/). View records, collections of normalized data created from a message.
* **Security Detection**
    * [**Rules**](/docs/cse/rules/). Manage rules, sets of logic that create signals based on information in incoming records.
    * [**Rule Tuning**](/docs/cse/rules/rule-tuning-expressions/). Manage rule tuning expressions, which are extensions to rules.
    * [**Threat Intelligence**](/docs/cse/administration/create-custom-threat-intel-source/). Manage sources of threat intelligence indicators, individual data points about threats that are gathered from external sources.
    * [**Match List**](/docs/cse/match-lists-suppressed-lists/create-match-list/). Manage match lists, lists of important indicators and identifiers that you want to be addressed by rules.
    * [**File Analysis**](/docs/cse/rules/import-yara-rules/). Manage sources for YARA rules.
    * [**Custom Insights**](/docs/cse/records-signals-entities-insights/configure-custom-insight/). Manage custom insights, methods to generate insights on some basis other than entity Activity Scores.
    * [**Network Blocks**](/docs/cse/administration/create-use-network-blocks/). Manage network blocks, groups of IP addresses that you can use in rules
    * [**Suppressed Lists**](/docs/cse/match-lists-suppressed-lists/suppressed-lists/). Manage suppressed lists, lists of indicators that can suppress signal generation.
    * [**MITRE ATT&CK Coverage**](/docs/cse/administration/mitre-coverage/). View the MITRE ATT&CK Threat Coverage Explorer, a screen that shows the MITRE ATT&CK adversary tactics, techniques, and procedures that are covered by rules in your system.

#### Top menu

This menu appears at the top of the screen:<br/><img src={useBaseUrl('img/get-started/sumo-logic-top-menu-bar-new.png')} alt="Top menu bar" style={{border: '1px solid gray'}} width="400"/>

Use the top menu to access:
* <a href="#go-to-menu"><img src={useBaseUrl('img/get-started/go-to-icon.png')} alt="Go To icon" style={{border: '1px solid gray'}} width="60"/> **Go To...**</a> Launch Sumo Logic features, including for Cloud SIEM.
* <img src={useBaseUrl('img/get-started/help-icon.png')} alt="Help icon" style={{border: '1px solid gray'}} width="30"/> **Help**. Access links to documentation, support, community, release notes, and system status.
* <img src={useBaseUrl('img/get-started/configuration-icon.png')} alt="Configuration icon" style={{border: '1px solid gray'}} width="30"/> [**Configuration**](#configuration-menu-1). Configure Sumo Logic features, including for Cloud SIEM.
* <img src={useBaseUrl('img/get-started/administration-icon.png')} alt="Administration icon" style={{border: '1px solid gray'}} width="30"/> **Administration**. Access Sumo Logic administration settings, such as for for [account](/docs/manage/), [users and roles](/docs/manage/users-roles/), and [account security](/docs/manage/security/).
* <img src={useBaseUrl('img/get-started/profile-icon-new.png')} alt="Profile icon" style={{border: '1px solid gray'}} width="30"/> **Profile**. View your notification and [preference](/docs/get-started/account-settings-preferences/) settings.

#### Go To... menu

The **Go To...** menu allows you to launch Sumo Logic features, including for Cloud SIEM. To access this menu, click <img src={useBaseUrl('img/get-started/go-to-icon.png')} alt="Go To icon" style={{border: '1px solid gray'}} width="50"/> on the [top menu](#top-menu-1). <br/><img src={useBaseUrl('img/get-started/go-to-menu.png')} alt="Go To menu bar" style={{border: '1px solid gray'}} width="500"/>

Use the **Go To...** menu to access these Cloud SIEM features:
* [**Actions**](/docs/cse/administration/create-cse-actions/). Create actions to issue a notification to another service when certain events occur in Cloud SIEM.
* [**Context Actions**](/docs/cse/administration/create-cse-context-actions/). Create actions that a Cloud SIEM analyst can use to query an external system for information about an entity, IOC, or data encountered in a record.
* [**Criticality**](/docs/cse/records-signals-entities-insights/entity-criticality/). Adjust the severity of signals for specific entities based on some risk factor or other consideration.
* [**Custom Insights**](/docs/cse/records-signals-entities-insights/configure-custom-insight/). Manage custom insights, methods to generate insights on some basis other than entity Activity Scores.
* [**Custom Types**](/docs/cse/records-signals-entities-insights/create-custom-entity-type/). Manage custom types to more precisely categorize entities.
* [**Enrichment**](/docs/cse/integrations/enrichments-and-indicators/). Manage elements that enrich data in Cloud SIEM.
* [**Entities**](/docs/cse/records-signals-entities-insights/view-manage-entities/). View entities, unique actors encountered in incoming messages, such as a user, IP address, or host.
* [**File Analysis**](/docs/cse/rules/import-yara-rules/). Manage sources for YARA rules. 
* [**Ingest Mappings**](/docs/cse/ingestion/sumo-logic-ingest-mapping/). Manage the mapping for data ingestion from a data source to Cloud SIEM.
* [**Insight Detection**](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/). Set the insight detection threshold.
* [**Insight Resolutions**](/docs/cse/administration/manage-custom-insight-resolutions/). Manage custom insight resolutions.
* [**Insight Statuses**](/docs/cse/administration/manage-custom-insight-statuses/). Manage custom insight statuses.
* [**Insights**](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/). View insights, clusters of events that require investigation. An insight is created when a high level of suspicious activity is detected for a single entity, such as a user, IP address, host, or domain.
* [**Log Mappings**](/docs/cse/schema/create-structured-log-mapping/). Manage log mappings, maps that tell Cloud SIEM how to build a record from the key-value pairs extracted from messages.
* [**Match Lists**](/docs/cse/match-lists-suppressed-lists/create-match-list/). Manage match lists, lists of important indicators and identifiers that you want to be addressed by rules.
* [**MITRE ATT&CK Coverage**](/docs/cse/administration/mitre-coverage/). View the MITRE ATT&CK Threat Coverage Explorer, a screen that shows the MITRE ATT&CK adversary tactics, techniques, and procedures that are covered by rules in your system.
* [**Network Blocks**](/docs/cse/administration/create-use-network-blocks/). Manage network blocks, groups of IP addresses that you can use in rules.
* [**Normalization**](/docs/cse/schema/username-and-hostname-normalization/). Manage normalizing usernames and hostnames in records during the parsing and mapping process. 
* [**Records**](/docs/cse/records-signals-entities-insights/view-records-signal/). View records, collections of normalized data created from a message.
* [**Rule Tuning**](/docs/cse/rules/rule-tuning-expressions/). Manage rule tuning expressions, which are extensions to rules.
* [**Rules**](/docs/cse/rules/). Manage rules, sets of logic that create signals based on information in incoming records.
* **Search Cloud SIEM**. Search for [insights](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/), [signals](/docs/cse/records-signals-entities-insights/view-records-signal/), [entities](/docs/cse/records-signals-entities-insights/view-manage-entities/), and [records](/docs/cse/records-signals-entities-insights/view-records-signal/). When you click in the search bar, you're prompted to select one of those types. Once you select a type, you're presented with a list of fields to filter on.
* [**SIEM Overview**](/docs/cse/get-started-with-cloud-siem/cse-heads-up-display/). View the Cloud SIEM Heads Up Display.
* [**Signals**](/docs/cse/records-signals-entities-insights/view-records-signal/). View signals, indicators for events of interest that fire when rule conditions are met.
* [**Suppressed Lists**](/docs/cse/match-lists-suppressed-lists/suppressed-lists/). Manage suppressed lists, lists of indicators that can suppress signal generation.
* [**Tag Schemas**](/docs/cse/administration/create-a-custom-tag-schema/). Manage schemas for tags, metadata you can attach to insights, signals, entities, and rules.
* [**Threat Intelligence**](/docs/cse/administration/create-custom-threat-intel-source/). Manage sources of threat intelligence indicators, individual data points about threats that are gathered from external sources.

#### Configuration menu

The **Configuration** menu allows you to configure Sumo Logic features, including for Cloud SIEM. To access this menu, click the configuration icon <img src={useBaseUrl('img/get-started/configuration-icon.png')} alt="Configuration icon" style={{border: '1px solid gray'}} width="30"/> on the [top menu](#top-menu-1). Scroll down the menu to see Cloud SIEM configuration options.<br/><img src={useBaseUrl('img/cse/cloud-siem-configuration-menu-new.png')} alt="Configuration menu" style={{border: '1px solid gray'}} width="150"/>

Use the **Configuration** menu to access: 

* **Cloud SIEM Integrations**
    * [**Ingest Mappings**](/docs/cse/ingestion/sumo-logic-ingest-mapping/). Manage the mapping for data ingestion from a data source to Cloud SIEM.
    * [**Log Mappings**](/docs/cse/schema/create-structured-log-mapping/). Manage log mappings, maps that tell Cloud SIEM how to build a record from the key-value pairs extracted from messages.
    * [**Context Actions**](/docs/cse/administration/create-cse-context-actions/). Create actions that a Cloud SIEM analyst can use to query an external system for information about an entity, IOC, or data encountered in a record. 
    * [**Actions**](/docs/cse/administration/create-cse-actions/). Create actions to issue a notification to another service when certain events occur in Cloud SIEM.
    * [**Enrichment**](/docs/cse/integrations/enrichments-and-indicators/). Manage elements that enrich data in Cloud SIEM.
    * [**Automation**](/docs/cse/automation/). Create smart actions that trigger automatically when certain events occur in Cloud SIEM.
* **Cloud SIEM Entities**
    * [**Groups**](/docs/cse/records-signals-entities-insights/create-an-entity-group/). Manage groupings of entities that can be used in rules. 
    * [**Normalization**](/docs/cse/schema/username-and-hostname-normalization/). Manage normalizing usernames and hostnames in records during the parsing and mapping process. 
    * [**Custom Types**](/docs/cse/records-signals-entities-insights/create-custom-entity-type/). Manage custom types to more precisely categorize entities.
    * [**Criticality**](/docs/cse/records-signals-entities-insights/entity-criticality/). Adjust the severity of signals for specific entities based on some risk factor or other consideration.
* **Cloud SIEM Workflow**
    * [**Insight Detection**](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/). Set the insight detection threshold. 
    * [**Insight Statuses**](/docs/cse/administration/manage-custom-insight-statuses/). Manage custom insight statuses.
    * [**Insight Resolutions**](/docs/cse/administration/manage-custom-insight-resolutions/). Manage custom insight resolutions.
    * [**Tag Schemas**](/docs/cse/administration/create-a-custom-tag-schema/). Manage schemas for tags, metadata you can attach to insights, signals, entities, and rules.
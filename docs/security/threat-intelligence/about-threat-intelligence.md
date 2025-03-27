---
slug: /security/threat-intelligence/about-threat-intelligence
title: About Sumo Logic Threat Intelligence
sidebar_label: About 
description: Introduction to Sumo Logic's threat intelligence capabilities.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';
import CloudSIEMThreatIntelNote from '../../reuse/cloud-siem-threat-intelligence-note.md';

Threat intelligence, often abbreviated as *threat intel*, is information that helps you prevent or mitigate cyber attacks. *Threat intelligence indicators* are individual data points about threats that are gathered from external sources about various entities such as host names, file hashes, IP addresses, and other known possible sources of attack and compromise.

Threat intelligence indicators can help security analysts leverage a large body of information to surface potential threats. For example, say that a threat intelligence database has an indicator that correlates a certain IP address with known malicious activity. Because of this correlation, analysts can assume log messages with that IP address are more likely to be part of a real cyber attack.

In Sumo Logic, threat intelligence indicators are supplied by sources listed on the **Threat Intelligence** tab. 
* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). To access the **Threat Intelligence** tab, in the main Sumo Logic menu, select **Manage Data > Logs > Threat Intelligence**. 
* [**New UI**](/docs/get-started/sumo-logic-ui/). To access the **Threat Intelligence** tab, in the top menu select **Configuration**, and then under **Logs** select **Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**. <br/><img src={useBaseUrl('img/security/threat-intelligence-tab-example.png')} alt="Threat Intelligence tab" style={{border: '1px solid gray'}} width="800" />

The sources on the **Threat Intelligence** tab include:
* **Global feeds**. Out-of-the-box default sources of threat indicators supplied by third party intel vendors and maintained by Sumo Logic. You cannot edit these sources. See [Sumo Logic threat intelligence sources](#sumo-logic-threat-intelligence-sources) below.
* **Other sources**. The other sources on the tab are imported by Cloud SIEM administrators so that Cloud SIEM analysts can use them to find threats. See [Ingest threat intelligence indicators](/docs/security/threat-intelligence/about-threat-intelligence/#ingest-threat-intelligence-indicators) to learn how to add other sources.

Cloud SIEM analysts can use any of these sources to find threats (see [Threat Intelligence Indicators in Cloud SIEM](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/)). In addition, all Sumo Logic users can run queries against the indicators in the Sumo Logic threat intelligence source to uncover threats (see [Find Threats with Log Queries](/docs/security/threat-intelligence/find-threats/)).

<CloudSIEMThreatIntelNote/>

<!--
Watch this micro lesson to learn about Sumo Logic's threat intelligence features.

<Iframe url="https://www.youtube.com/embed/wQzprl93GU4?rel=0"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />

-->

## Prerequisites

### Role capabilities

To view and manage threat intelligence indicators on the [Threat Intelligence tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab), a Cloud SIEM administrator must have the correct [role capabilities](/docs/manage/users-roles/roles/role-capabilities/#threat-intel). 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Administration > Users and Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**.  
1. Click the **Roles** tab.
1. Click **Add Role** to create a new role. Alternatively, you can select an existing role in the **Roles** tab and click **Edit**.
Add the following capabilities:
   * **Threat Intel**
       * **View Threat Intel Data Store**
       * **Manage Threat Intel Data Store**

You do not need to be assigned these role capabilities to [find threats with log queries](/docs/security/threat-intelligence/find-threats/).

### Ingest threat intelligence indicators

A Cloud SIEM administrator must first ingest the indicators before they can be used to uncover threats. Indicators can be ingested using:
* **A collector**. See:
   * [CrowdStrike Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-threat-intel-source)
   * [Intel471 Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/intel471-threat-intel-source)
   * [Mandiant Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/mandiant-threat-intel-source)
   * [STIX/TAXII 1 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-1-client-source)  
   * [STIX/TAXII 2 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-2-client-source)
   * [ZeroFox Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/zerofox-intel-source)
* **The API**. See the following APIs in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource:
   * [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators)
   * [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators)
* **The Threat Intelligence tab**. Use this tab to upload your own indicators. See [Add indicators in the Threat Intelligence tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#add-indicators-in-the-threat-intelligence-tab). See [Upload formats](/docs/security/threat-intelligence/upload-formats/) for the format to use when uploading indicators using this tab or APIs.

After threat indicator sources are ingested, they appear on the **Threat Intelligence** tab and are ready to be used in [Cloud SIEM rules](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/#hasthreatmatch-cloud-siem-rules-language-function) or [manual searches](/docs/security/threat-intelligence/find-threats/).

<CloudSIEMThreatIntelNote/>

:::note
* Sumo Logic's threat intelligence data store only ingests simple threat indicators, not complex indicators that outline a series of steps or entities that make up an attack. Nor does it ingest actors, malware, or other object types. 
* The limit of the number of indicators that can be uploaded in one API call is 100.
* When you add indicators, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](#audit-logging-for-threat-intelligence).
:::

## Typical workflow

Here is the typical workflow to set up and use threat intelligence indicators:

1. A system administrator [ingests threat intelligence indicators](#ingest-threat-intelligence-indicators) and adds them to the threat intelligence data store. For example, install a collector such as the [STIX/TAXII 2 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-2-client-source), and set up the collector to obtain indicators from Federal, vendor, or open services. Ingested indicators appear on the [**Threat Intelligence** tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab). You can manually add more indicators as needed, such as your own private indicators, using the **Threat Intelligence** tab or the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) APIs.
1. Analysts use the threat indicators data to uncover threats using [Cloud SIEM rules](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/#hasthreatmatch-cloud-siem-rules-language-function) or [manual searches](/docs/security/threat-intelligence/find-threats/).
1. A system administrator occasionally checks to see why a connector isn’t ingesting data, or to see how much storage all the indicators are using. They may <!--[run threatlookup with the cat search operator](/docs/search/search-query-language/search-operators/threatlookup/#run-threatlookup-with-the-cat-search-operator) to--> examine their indicators, and then if needed, [delete indicators](/docs/security/threat-intelligence/threat-intelligence-indicators/#delete-threat-intelligence-indicators).

## Audit logging for threat intelligence

Use the [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/) to view events for threat indicators, such as adding indicators, removing indicators, or changing the retention period.

Use a search like the following:

```
_index=sumologic_audit_events _sourceCategory=threatIntelligence
```

## Sumo Logic threat intelligence sources

Sumo Logic provides the following out-of-the-box default sources of threat indicators supplied by third party intel vendors and maintained by Sumo Logic. You cannot edit these sources:
* **_sumo_global_feed_cs**. This is a legacy source of threat indicators maintained by Sumo Logic. ***This source will be discontinued on April 30, 2025***.
* **SumoLogic_ThreatIntel**. This source incorporates threat indicators supplied by [Intel 471](https://intel471.com/).

:::warning
To maintain uninterrupted threat intelligence operation, if you have created rules, saved searches, monitors or dashboard panel queries that explicitly reference the legacy `_sumo_global_feed_cs` source, follow the directions below to update them to use the new `SumoLogic_ThreatIntel` source ***before April 30, 2025***.
:::

### Migrate to the new source

Perform the steps in the following sections to migrate to the `SumoLogic_ThreatIntel` source. 

#### hasThreatMatch rule syntax

In most cases, no change is needed if you use [hasThreatMatch](/docs/cse/rules/cse-rules-syntax/#hasthreatmatch) in your rules:
* Until April 30, 2025 the rules point to the legacy `_sumo_global_feed_cs` source (and the rest of your tenant-specific sources). 
* After April 30, 2025, the rules point to the new `SumoLogic_ThreatIntel` source (and the rest of your tenant-specific sources).

You may need to make changes in these scenarios:
* If you have rules with `hasThreatMatch` syntax that explicitly point to the legacy `_sumo_global_feed_cs` source, change them to point to `SumoLogic_ThreatIntel` source. For example: 
   * Change this: <br/>`hasThreatMatch([srcDevice_ip], confidence > 50 AND source="_sumo_global_feed_cs")` 
   * To this: <br/>`hasThreatMatch([srcDevice_ip], confidence > 50 AND source="SumoLogic_ThreatIntel")`
* The `domain-name` and `email-addr` types are not supported in Intel 471. If you filter for these types using `hasThreatMatch`, update your rule syntax to remove them.

#### lookup operator

In most cases, no change is needed if you use the [lookup](/docs/search/search-query-language/search-operators/lookup/) search operator to point to `sumo://threat/cs`:
* Until April 30, 2025, queries in apps that use the `lookup` search operator to point to `sumo://threat/cs` (the legacy `_sumo_global_feed_cs` source) are unchanged. For examples, see the dashboards in the [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/#threat-intel-optimization) app. 
* After April 30, 2025, queries in apps that use the `lookup` operator to point to `sumo://threat/cs` are updated to point to `sumo://threat/i471` instead (the new `SumoLogic_ThreatIntel` source). **You must upgrade your apps to get this update.** In the App Catalog, open apps labeled **Upgrade Available** and select **Manage > Upgrade**.

You may need to make changes in these scenarios:
* The `domain-name` and `email-addr` types are not supported in Intel 471. If you filter for these types using the `lookup` operator, update your queries to remove them.
* If you parse the `raw` field returned from the `lookup` operation, you will see different fields when you use the new `SumoLogic_ThreatIntel` source. To avoid problems with fields not returning data, use a [nodrop](/docs/search/search-query-language/parse-operators/parse-nodrop-option/) clause.

#### threatip search operator

If you use the [threatip](/docs/search/search-query-language/search-operators/threatip/) search operator, no change is needed: 
* Until April 30, 2025, the `threatip` operator points to the legacy `_sumo_global_feed_cs` source.
* After April 30, 2025, the `threatip` operator points to the new `SumoLogic_ThreatIntel` source.

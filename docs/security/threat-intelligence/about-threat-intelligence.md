---
slug: /security/threat-intelligence/about-threat-intelligence
title: About Sumo Logic Threat Intelligence
sidebar_label: About 
description: Introduction to Sumo Logic's threat intelligence capabilities.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

Threat intelligence, often abbreviated as *threat intel*, is information that helps you prevent or mitigate cyber attacks. *Threat intelligence indicators* are individual data points about threats that are gathered from external sources about various entities such as host names, file hashes, IP addresses, and other known targets for compromise. You can import files containing threat intelligence indicators directly into Sumo Logic to aid in security analysis. 

Threat intelligence indicators can help security analysts leverage a large body of information to surface potential threats. For example, say that a threat intelligence database has an indicator that correlates a certain IP address with known malicious activity. Because of this correlation, analysts can assume log messages with that IP address are more likely to be part of a real cyber attack.

Once you [ingest indicators](#ingest-threat-intelligence-indicators) and they appear on the [Threat Intelligence tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab), you can use them to search logs for threats. See [Find threats with log queries](/docs/security/threat-intelligence/find-threats/) to learn how. 

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

## Prerequisites

### Role capabilities

To view and manage threat intelligence indicators on the [Threat Intelligence tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab), you must have the correct [role capabilities](/docs/manage/users-roles/roles/role-capabilities/#threat-intel). 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Administration > Users and Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**.  
1. Click the **Roles** tab.
1. Click **Add Role** to create a new role. Alternatively, you can select an existing role in the **Roles** tab and click **Edit**.
Add the following capabilities:
   * **Threat Intel**
       * **View Threat Intel Data Store**
       * **Manage Threat Intel Data Store**

You do not need to be assigned these role capabilities to [find threats with log queries](/docs/security/threat-intelligence/find-threats/).

### Ingest threat intelligence indicators

To search logs that contain correlations to threat intelligence indicators, you must first ingest the indicators. You can ingest indicators using:
* **The Threat Intelligence tab**. See [Add indicators in the Threat Intelligence tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#add-indicators-in-the-threat-intelligence-tab).
* **A collector**. See:
   * [Intel471 Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/intel471-threat-intel-source)
   * [Mandiant Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/mandiant-threat-intel-source)
   * [STIX/TAXII 1 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-1-client-source)  
   * [STIX/TAXII 2 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-2-client-source)
   * [ZeroFox Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/zerofox-intel-source)
* **The API**. See the following APIs in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource:
   * [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators)
   * [uploadCsvIndicators API](https://api.sumologic.com/docs/#operation/uploadCsvIndicators)
   * [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators)

See [Upload formats](/docs/security/threat-intelligence/upload-formats/) for the format to use when uploading indicators using the **Threat Intelligence** tab or APIs.

:::note
* Sumo Logic's threat intelligence data store only ingests simple threat indicators, not complex indicators that outline a series of steps or entities that make up an attack. Nor does it ingest actors, malware, or other object types. 
* The limit of the number of indicators that can be uploaded in one API call is 100.
* When you add indicators, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](#audit-logging-for-threat-intelligence).

:::

## Typical workflow

Here is the typical workflow to set up and use threat intelligence indicators:

1. A system administrator sets up services to automatically [ingest threat intelligence indicators](#ingest-threat-intelligence-indicators) and add them to the threat intelligence data store. For example, install a collector such as the [STIX/TAXII 2 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-2-client-source), and set up the collector to obtain indicators from Federal, vendor, or open services. Ingested indicators appear on the [**Threat Intelligence** tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab). You can manually add more indicators as needed, such as your own private indicators, using the **Threat Intelligence** tab or the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) APIs.
1. Analysts use the threat indicators data for such things as saved searches, dashboards, [manual searches](/docs/security/threat-intelligence/find-threats/), [Cloud SIEM rules](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/#hasthreatmatch-cloud-siem-rules-language-function), and [Cloud SIEM UI](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/#view-threat-indicators-in-the-cloud-siem-ui).
1. A system administrator occasionally checks to see why a connector isn’t ingesting data, or to see how much storage all the indicators are using. They may <!--[run threatlookup with the cat search operator](/docs/search/search-query-language/search-operators/threatlookup/#run-threatlookup-with-the-cat-search-operator) to--> examine their indicators, and then if needed, [delete indicators](/docs/security/threat-intelligence/threat-intelligence-indicators/#delete-threat-intelligence-indicators).

## Audit logging for threat intelligence

Use the [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/) to view events for threat indicators, such as adding indicators, removing indicators, or changing the retention period.

Use a search like the following:

```
_index=sumologic_audit_events _sourceCategory=threatIntelligence
```

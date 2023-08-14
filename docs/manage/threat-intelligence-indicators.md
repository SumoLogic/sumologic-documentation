---
id: threat-intelligence-indicators
title: Threat Intelligence Indicators
sidebar_label: Threat Intelligence Indicators
description: Learn how to add indicators from threat intelligence sources.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

*Threat intelligence indicators* are files containing threat intelligence data that you can import into Sumo Logic. Threat intelligence, often abbreviated as *threat intel*, is information gathered from external sources about various entities such as host names, file hashes, ip addresses, and other known indicators of compromise. Threat intelligence can help a security analysts leverage a large body of information to surface potential threats. For example, say that a threat intelligence database correlates a certain IP address with known malicious activity. Because of this correlation, analysts can assume log messages with that IP address are more likely to be part of a real cyber attack.

Threat intelligence indicators imported to Sumo Logic not only integrate with your existing core Sumo Logic deployment, but also Cloud SIEM and Cloud SOAR. (For information about how to add additional threat intelligence indicators for Cloud SIEM, see [Create a Custom Threat Intelligence Source](/docs/cse/administration/create-custom-threat-intel-source).)

You can add threat intelligence indicators from a number of sources, including CrowdStrike, TAXII, ThreatQ, iDefense, and many others. 

## Threat Intelligence tab

Use the Threat Intelligence tab to add and manage threat intelligence indicators. To access the tab, in Sumo Logic go to **Manage Data > Logs** and click the **Threat Intelligence** tab.

<img src={useBaseUrl('img/manage/threat-intelligence-tab.png')} alt="Threat Intelligence tab" style={{border: '1px solid black'}} width="800" />

1. **Add Indicators**. Click to [add threat intelligence indicators](#add-threat-intelligence-indicators).
1. **Actions**. Select to perform additional actions:
    * **Edit Retention Period**. Enter the length of time in days to retain expired threat intelligence indicator files. The maximum number of days is 180.
1. **Source Name**. The source of the threat intelligence indicator file.
1. **Storage Consumed**. The amount of storage consumed by the threat intelligence indicator file.
1. **Indicators**. The number of threat intelligence indicators included in the file. 

## Add threat intelligence indicators

1. In Sumo Logic, go to **Manage Data > Logs > Threat Intelligence**.
1. Click **Add Indicators**. The dialog displays. <br/><img src={useBaseUrl('img/manage/threat-intelligence-add-indicators.png')} alt="Add threat intelligence indicators" style={{border: '1px solid black'}} width="500" />
1. Select the format of the file to be uploaded:
    * **Sumo normalized JSON**. Your file must include the following attributes:
       * indicator
       * type
       * validFrom
       * validUntil
       * confidence
       * threatType
    * **STIX 2.1 JSON**. Your file must include the following attributes:
       * source
       * indicators
    * **BLOB CSV or JSON**. Your file must include the following attributes:
       * source
       * format
       * blob
1. Click **Upload** to upload the file.
1. Click **Import**.

## Delete indicators

1. Select an indicator. Details of the indicator appear in a sidebar.
1. Click **Delete Indicators**.
1. Select indicators to delete:
   * **Delete all indicators**
   * **Delete indicators matching the expression**. Enter the attribute and value to match.
1. Click **Delete**. 
<br/><img src={useBaseUrl('img/manage/threat-intelligence-delete-indicators.png')} alt="Delete threat intelligence indicators" style={{border: '1px solid black'}} width="300" />
---
id: threat-intelligence-indicators
title: Threat Intelligence Indicators
sidebar_label: Threat Intelligence Indicators
description: Learn how to add indicators from threat intelligence sources.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Threat intelligence, often abbreviated as *threat intel*, is information that helps you prevent or mitigate cyber attacks. *Threat intelligence indicators* are individual data points about threats that are gathered from external sources about various entities such as host names, file hashes, ip addresses, and other known targets for compromise. You can import files containing threat intelligence indicators directly into Sumo Logic to aid in security analysis.

Threat intelligence indicators can help a security analysts leverage a large body of information to surface potential threats. For example, say that a threat intelligence database has an indicator that correlates a certain IP address with known malicious activity. Because of this correlation, analysts can assume log messages with that IP address are more likely to be part of a real cyber attack.

You can add threat intelligence indicators from a number of sources, including CrowdStrike, TAXII, ThreatQ, iDefense, and many others. And threat intelligence indicators imported to Sumo Logic not only integrate with your existing core Sumo Logic deployment, but also Cloud SIEM and Cloud SOAR. (For information about how to add additional threat intelligence indicators for Cloud SIEM, see [Create a Custom Threat Intelligence Source](/docs/cse/administration/create-custom-threat-intel-source).)

## Threat Intelligence tab

Use the **Threat Intelligence** tab to add and manage threat intelligence indicators. To access the tab, in Sumo Logic go to **Manage Data > Logs > Threat Intelligence**.

<img src={useBaseUrl('img/manage/threat-intelligence-tab.png')} alt="Threat Intelligence tab" style={{border: '1px solid black'}} width="800" />

1. **Add Indicators**. Click to upload files that [add threat intelligence indicators](#add-threat-intelligence-indicators).
1. **Actions**. Select to perform additional actions:
    * **Edit Retention Period**. Enter the length of time in days to retain expired threat intelligence indicator files. The maximum number of days is 180.
1. **Source Name**. The source of the threat intelligence indicator file.
1. **Storage Consumed**. The amount of storage consumed by the threat intelligence indicator file.
1. **Indicators**. The number of threat intelligence indicators included in the file. 

## Add threat intelligence indicators

To add threat intelligence indicators, you must upload files containing the indicators in a format that can be consumed by Sumo Logic.

1. In Sumo Logic, go to **Manage Data > Logs > Threat Intelligence**.
1. Click **Add Indicators**. The dialog displays. <br/><img src={useBaseUrl('img/manage/threat-intelligence-add-indicators.png')} alt="Add threat intelligence indicators" style={{border: '1px solid black'}} width="500" />
1. Select the format of the file to be uploaded:
    * **Sumo normalized JSON**. A JSON file [normalized](/docs/cse/schema/parsing-language-reference-guide#normalizing) for use in Sumo Logic. Your file must include the following attributes:
       * `indicator`
       * `type`
       * `validFrom`
       * `validUntil`
       * `confidence`
       * `threatType`
    * **STIX 2.1 JSON**. A JSON file in [STIX 2.1](https://oasis-open.github.io/cti-documentation/stix/gettingstarted.html) format. Your file must include the following attributes:
       * `source`
       * `indicators`
    * **BLOB CSV or JSON**. A [BLOB](https://en.wikipedia.org/wiki/Binary_large_object) CSV file or JSON file. Your file must include the following attributes:
       * `source`
       * `format`
       * `blob`
1. Click **Upload** to upload the file.
1. Click **Import**. 

## Delete indicators

1. Select an indicator. Details of the indicator appear in a sidebar.
1. Click **Delete Indicators**. The following dialog appears. <br/><img src={useBaseUrl('img/manage/threat-intelligence-delete-indicators.png')} alt="Delete threat intelligence indicators" style={{border: '1px solid black'}} width="300" />
1. Select indicators to delete:
   * **Delete all indicators**
   * **Delete indicators matching the expression**. Enter the attribute and value to match. For example, if you want to delete indicators with certain "valid until" dates from **Sumo normalized JSON** files, for an attribute enter `validUntil` and for a value enter a date. The attributes and values you enter must match attributes and values in the files uploaded in [Add threat intelligence indicators](#add-threat-intelligence-indicators) above.
1. Click **Delete**. 

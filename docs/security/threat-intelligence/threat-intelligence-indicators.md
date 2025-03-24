---
slug: /security/threat-intelligence/threat-intelligence-indicators
title: Manage Threat Intelligence Indicators
sidebar_label: Manage Indicators
description: Learn how to add and manage indicators from threat intelligence sources.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CloudSIEMThreatIntelNote from '../../reuse/cloud-siem-threat-intelligence-note.md';

The **Threat Intelligence** tab shows the indicators that have been added to your threat intelligence datastore. Use this tab to add and manage your threat intelligence indicators. You can add indicators from a number of sources. Threat intelligence indicators imported to Sumo Logic not only integrate with your existing core Sumo Logic deployment, but also Cloud SIEM and Cloud SOAR. 

:::tip
You can also add threat intelligence indicators using a collector or the API. See [Ingest threat intelligence indicators](/docs/security/threat-intelligence/about-threat-intelligence/#ingest-threat-intelligence-indicators).
:::

## Threat Intelligence tab

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). To access the **Threat Intelligence** tab, in the main Sumo Logic menu, select **Manage Data > Logs > Threat Intelligence**. 

[**New UI**](/docs/get-started/sumo-logic-ui/). To access the **Threat Intelligence** tab, in the top menu select **Configuration**, and then under **Logs** select **Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**. 
 
<img src={useBaseUrl('img/security/threat-intelligence-tab.png')} alt="Threat Intelligence tab" style={{border: '1px solid gray'}} width="800" />

1. **+ Add Indicators**. Click to upload files that [add threat intelligence indicators](#add-indicators-in-the-threat-intelligence-tab).
1. **Actions**. Select to perform additional actions:
    * **Edit Retention Period**. Enter the length of time in days to retain expired threat intelligence indicator files. The maximum number of days is 180. See [Change the retention period for expired indicators](#change-the-retention-period-for-expired-indicators).
1. **Status**. The current status of the indicator source (**Enabled** or **Disabled**).
1. **Source Name**. The name of the threat intelligence indicator file. The name usually indicates the supplier of the indicators. 
1. **Storage Consumed**. The amount of storage consumed by the threat intelligence indicator file.
1. **Indicators**. The number of threat intelligence indicators included in the file. 

:::note
* The `_sumo_global_feed_i471` source is a default source and cannot be changed or deleted.
* The default storage limit is 10 million total indicators (not including any indicators provided by Sumo Logic such as the `_sumo_global_feed_i471` source).
:::

## Add indicators in the Threat Intelligence tab

You can add threat intelligence indicators using a collector, API, or the **Threat Intelligence** tab. This section describes how to add indicators in the **Threat Intelligence** tab. For information on the other methods, see [Ingest threat intelligence indicators](/docs/security/threat-intelligence/about-threat-intelligence/#ingest-threat-intelligence-indicators).

<CloudSIEMThreatIntelNote/>

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/).In the main Sumo Logic menu, select **Manage Data > Logs > Threat Intelligence**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Configuration**, and then under **Logs** select **Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**.  
1. Click **+ Add Indicators**. The dialog displays. <br/><img src={useBaseUrl('img/security/threat-intelligence-add-indicators.png')} alt="Add threat intelligence indicators" style={{border: '1px solid gray'}} width="500" />
1. Select the format of the file to be uploaded (see [Upload formats](/docs/security/threat-intelligence/upload-formats/) for the format to use in the file):
    * **Normalized JSON**. A normalized JSON file. 
    * **CSV**. A comma-separated value (CSV) file. 
    <!-- * **STIX 2.x JSON**. A JSON file in STIX 2.x format. When choosing this format, you must enter the name of the source in the **Source** field provided. -->
1. Click **Upload** to upload the file. 
1. Click **Import**. 

:::note
When you add indicators, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](/docs/security/threat-intelligence/about-threat-intelligence/#audit-logging-for-threat-intelligence).
:::

## Delete threat intelligence indicators

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Logs > Threat Intelligence**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Configuration**, and then under **Logs** select **Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**.  
1. Select a source in the list of sources. Details of the source appear in a sidebar.
1. Click the **Delete Indicators** button. 
<!-- 1. When the following dialog appears, select which indicators you'd like to delete from the source:<br/><img src={useBaseUrl('img/security/threat-intelligence-delete-indicators.png')} alt="Delete threat intelligence indicators" style={{border: '1px solid gray'}} width="500" />
   * **Delete all indicators**. Remove all indicators from the source.
   * **Delete indicators matching the expression**. Enter the attribute and value to match. For example, if you want to delete indicators with certain "valid until" dates from **Sumo normalized JSON** files, for an attribute enter `validUntil` and for a value enter a date. The attributes and values you enter must match attributes and values in the indicators. -->
1. Click **Delete** on the **Delete Indicators** dialog.

:::note
When you remove indicators, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](/docs/security/threat-intelligence/about-threat-intelligence/#audit-logging-for-threat-intelligence).
:::

## Change the retention period for expired indicators

Indicators are deemed valid until they reach the date set by their "valid until" attribute (`validUntil` for [normalized JSON](/docs/security/threat-intelligence/upload-formats/#normalized-json-format) and [CSV](/docs/security/threat-intelligence/upload-formats/#csv-format), and `valid_until` for [STIX](/docs/security/threat-intelligence/upload-formats/#stix-2x-json-format)). After that date, they are considered expired.

Expired indicators are retained until they reach the end of the retention period. At the end of the retention period, expired indicators are automatically deleted. Between the time they expire and are deleted, the indicators are still in the system, and you can search against them if you want.

By default, expired indicators are retained for 180 days. To change the retention period:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/).In the main Sumo Logic menu, select **Manage Data > Logs > Threat Intelligence**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Configuration**, and then under **Logs** select **Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**.  
1. Click the three-dot button in the upper-right corner of the page.
1. Click **Edit Retention Period**. 
1. Enter the length of time in days to retain expired threat intelligence indicator files. The maximum number of days is 180. 

:::note
When you change the retention period, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](/docs/security/threat-intelligence/about-threat-intelligence/#audit-logging-for-threat-intelligence).
:::

You do not have to wait until indicators reach the end of their retention period in order to delete them. You can [use the **Threat Intelligence** tab to delete indicators](#delete-threat-intelligence-indicators), as well as use the APIs in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource.

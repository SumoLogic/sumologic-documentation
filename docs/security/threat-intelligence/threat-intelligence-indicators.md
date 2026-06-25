---
slug: /security/threat-intelligence/threat-intelligence-indicators
title: Manage Threat Intelligence Indicators
sidebar_label: Manage Indicators
description: Learn how to add and manage indicators from threat intelligence sources.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CloudSIEMThreatIntelNote from '../../reuse/cloud-siem-threat-intelligence-note.md';

The **Threat Intelligence** page shows the indicators that have been added to your threat intelligence datastore. Use this page to add and manage your threat intelligence indicators. You can add indicators from a number of sources (see [Ingest threat intelligence indicators](/docs/security/threat-intelligence/about-threat-intelligence/#ingest-threat-intelligence-indicators)). Threat intelligence indicators imported to Sumo Logic not only integrate with your existing core Sumo Logic deployment, but also Cloud SIEM and Cloud SOAR.

## Threat Intelligence overview

To access Threat Intelligence in Sumo Logic,
1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select navigate to **Data Management > Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Threat Intelligence**.<br/><img src={useBaseUrl('img/security/threat-intelligence-tab-example.png')} alt="Threat Intelligence overview" style={{border: '1px solid gray'}} width="800" />
1. Click **+Add Source** to add threat intelligence sources to your datastore:
    1. **New Source**. Opens a guided two-step flow: select a source from the available integrations (such as CrowdStrike, Intel471, or TAXII clients), then complete the source-specific configuration form.
    1. **Upload**. Manually upload files that add threat intelligence indicators. You can also download the template to get a sample file showing the expected schema before uploading.
1. **Actions**. Select to perform additional actions:
    * **Edit Retention Period**. Enter the length of time in days to retain expired threat intelligence indicator files. The maximum number of days is 180. See [Change the retention period for expired indicators](#change-the-retention-period-for-expired-indicators).
1. **Status**. The current status of the indicator source (**Enabled** or **Disabled**).
1. **Source Name**. The name of the threat intelligence indicator file. The name usually indicates the supplier of the indicators. 
1. **Last Indicator Identified**. The date and time of the last successful poll.
1. **Type**. Whether the source is **Static** (manually uploaded) or **Dynamic** (C2C collector-based).
1. **Health**. The current health of the source, such as **Healthy** or **Error**.
1. **Number of Indicators**. The total count of threat intelligence indicators provided by the source. 

:::note
* The `SumoLogic_ThreatIntel` and `_sumo_global_feed_cs` sources are default sources and cannot be changed or deleted.
* The default storage limit is 10 million total indicators (not including any indicators provided by Sumo Logic such as in the `SumoLogic_ThreatIntel` and `_sumo_global_feed_cs` sources).
:::

## Add a source

Use the **+Add Source** button in the **Sources** tab to add threat intelligence sources to your datastore. You can connect to an external threat intelligence feed or manually upload indicators from a file. For information on the other methods, see [Ingest threat intelligence indicators](/docs/security/threat-intelligence/about-threat-intelligence/#ingest-threat-intelligence-indicators).

<CloudSIEMThreatIntelNote/>

### New source

1. Click **+ Add Source** and then select **New Source** from the dropdown.
1. Select a collector from the **Collector** dropdown and it's corresponding source (such as CrowdStrike, Intel471, or TAXII clients) from the available integrations grid.
1. Click **Next**. <br/><img src={useBaseUrl('img/collector/select-threat-intel-source-and-collector.png')} alt="Threat Intelligence overview" style={{border: '1px solid gray'}} width="800" />
1. Enter the following details to configure the source:
    1. Enter a **Name** for the source. The description is optional.
    1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
    1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
        * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
        * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.
    1. **Region**. Select your region from the dropdown.
    1. **Client ID**: Provide the threat intel client ID you want to use to authenticate collection requests.
    1. **Client Secret**. Provide the threat intel client secret key you want to use to authenticate collection requests.
    1. **Sumo Logic Threat Intel Source ID**. Provide your own threat intel source ID for organizing multiple sources.
        :::note
        If no Application ID is provided, a random ID is generated. Any time this ID is changed, the Source will re-read the data stream starting at the beginning.
        :::
    1. (Optional) **Malicious Confidence**. Select the confidence level of the threat type from the dropdown as High, Medium, Low, Unverified, or leave it empty for all type. 
1. When you are finished configuring the Source, click **Next**.
1. Once you have reviewed all the details, click **Done**. A confirmation message appears when the source is successfully configured.

### Upload

To manually upload threat intelligence indicators from a file:
1. Click **+ Add Source** and then select **Upload** from the dropdown. The upload dialog displays.
1. Select the format of the file to upload (see [Upload formats](/docs/security/threat-intelligence/upload-formats/) for the format to use in the file):
    * **Normalized JSON**. A normalized JSON file. <br/><img src={useBaseUrl('img/security/threat-intelligence-add-indicators.png')} alt="Add threat intelligence indicators" style={{border: '1px solid gray'}} width="500" />
    * **CSV**. A comma-separated value (CSV) file. <br/><img src={useBaseUrl('img/security/threat-intelligence-add-indicators-csv.png')} alt="Add threat intelligence indicators" style={{border: '1px solid gray'}} width="500" />
    <!-- * **STIX 2.x JSON**. A JSON file in STIX 2.x format. When choosing this format, you must enter the name of the source in the **Source** field provided. -->
<!-- 1. (Optional) Click **Download Template** to get a sample file showing the expected schema before uploading. -->
1. Click **Upload** to upload the file.
1. Click **Import**.

:::note
When you add indicators, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](/docs/security/threat-intelligence/about-threat-intelligence/#audit-logging-for-threat-intelligence).
:::

## Delete threat intelligence indicators

1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select navigate to **Data Management > Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Threat Intelligence**.<br/><img src={useBaseUrl('img/security/threat-intelligence-tab-example.png')} alt="Threat Intelligence overview" style={{border: '1px solid gray'}} width="800" />
1. Select a source in the list of sources. Details of the source appear in a sidebar.
1. Click the **More Actions** dropdown and then select **Delete Indicators** button. 
<!-- 1. When the following dialog appears, select which indicators you'd like to delete from the source:<br/><img src={useBaseUrl('img/security/threat-intelligence-delete-indicators.png')} alt="Delete threat intelligence indicators" style={{border: '1px solid gray'}} width="500" />
   * **Delete all indicators**. Remove all indicators from the source.
   * **Delete indicators matching the expression**. Enter the attribute and value to match. For example, if you want to delete indicators with certain "valid until" dates from **Sumo normalized JSON** files, for an attribute enter `validUntil` and for a value enter a date. The attributes and values you enter must match attributes and values in the indicators. -->
1. Click **Delete** on the **Delete Indicators** dialog.

:::note
When you remove indicators, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](/docs/security/threat-intelligence/about-threat-intelligence/#audit-logging-for-threat-intelligence).
:::

## Change the retention period for expired indicators

Indicators are deemed valid until they reach the date set by their "valid until" attribute (`validUntil` for [normalized JSON](/docs/security/threat-intelligence/upload-formats/#normalized-json-format) and [CSV](/docs/security/threat-intelligence/upload-formats/#csv-format), and `valid_until` for [STIX](/docs/security/threat-intelligence/upload-formats/#stix-2x-json-format)). After that date, they are considered expired.

Expired indicators are retained until they reach the end of the retention period. At the end of the retention period, expired indicators are automatically deleted. Between the time they expire and are deleted, the indicators are still in the system, and you can still use them to find threats.

By default, expired indicators are retained for 180 days. To change the retention period:
1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select navigate to **Data Management > Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Threat Intelligence**.<br/><img src={useBaseUrl('img/security/threat-intelligence-tab-example.png')} alt="Threat Intelligence overview" style={{border: '1px solid gray'}} width="800" />
1. Click the three-dot button in the upper-right corner of the page.
1. Click **Edit Retention Period**. 
1. Enter the length of time in days to retain expired threat intelligence indicator files. The maximum number of days is 180. 

:::note
When you change the retention period, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](/docs/security/threat-intelligence/about-threat-intelligence/#audit-logging-for-threat-intelligence).
:::

You do not have to wait until indicators reach the end of their retention period in order to delete them. You can [delete indicators](#delete-threat-intelligence-indicators) from the use the **Threat Intelligence** page, as well as use the APIs in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource.

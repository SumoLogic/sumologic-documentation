---
id: threat-intelligence-indicators
title: Threat Intelligence Indicators
sidebar_label: Threat Intelligence Indicators
description: Learn how to use indicators from threat intelligence sources.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Threat intelligence, often abbreviated as *threat intel*, is information that helps you prevent or mitigate cyber attacks. *Threat intelligence indicators* are individual data points about threats that are gathered from external sources about various entities such as host names, file hashes, IP addresses, and other known targets for compromise. You can import files containing threat intelligence indicators directly into Sumo Logic to aid in security analysis.

Threat intelligence indicators can help security analysts leverage a large body of information to surface potential threats. For example, say that a threat intelligence database has an indicator that correlates a certain IP address with known malicious activity. Because of this correlation, analysts can assume log messages with that IP address are more likely to be part of a real cyber attack.

Once you [ingest indicators](#ingest-threat-intelligence-indicators) and they appear on the [Threat Intelligence tab](#threat-intelligence-tab), you can use them to search logs for threats. See [Find threats with log queries](#find-threats-with-log-queries) to learn how.

## Prerequisites

### Role capabilities

To view and manage threat intelligence indicators on the [Threat Intelligence tab](#threat-intelligence-tab), you must have the correct [role capabilities](/docs/manage/users-roles/roles/role-capabilities/#threat-intel).

1. In the left navigation bar of Sumo Logic, select **Administration > Users and Roles**.
1. Click the **Roles** tab.
1. Click **Add Role** to create a new role. Alternatively, you can select an existing role in the **Roles** tab and click **Edit**.
Add the following capabilities:
   * **Threat Intel**
       * **View Threat Intel Data Store**
       * **Manage Threat Intel Data Store**

You do not need to be assigned these role capabilities to [find threats with log queries](/docs/platform-services/threat-intelligence-indicators#find-threats-with-log-queries).

### Ingest threat intelligence indicators

To search logs that contain correlations to threat intelligence indicators, you must first ingest the indicators. You can ingest indicators using:
* **The Threat Intelligence tab**. See [Add indicators in the Threat Intelligence tab](#add-indicators-in-the-threat-intelligence-tab).
* **A collector**. See:
   * [CrowdStrike Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-threat-intel-source)
   * [Intel471 Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/intel471-threat-intel-source)
   * [Mandiant Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/mandiant-threat-intel-source)
   * [STIX/TAXII 1 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-1-client-source)  
   * [STIX/TAXII 2 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-2-client-source)
   * [ZeroFox Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/zerofox-intel-source)
* **The API**. See the following APIs in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource:
   * [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators)
   <!-- * [uploadCsvIndicators API](https://api.sumologic.com/docs/#operation/uploadCsvIndicators) -->
   * [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators)

See [Upload formats](#upload-formats) for the format to use when uploading indicators using the Threat Intelligence tab or APIs.

:::note
* The limit of the number of indicators that can be uploaded in one API call is 100.
* When you add indicators, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](#audit-logging-for-threat-intelligence).
:::

## Typical workflow

Here is the typical workflow to set up and use threat intelligence indicators:

1. A system administrator sets up services to automatically [ingest threat intelligence indicators](#ingest-threat-intelligence-indicators). For example, install a collector such as the [STIX/TAXII 2 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-2-client-source), and set up services to obtain indicators from Federal, vendor, and open services. Then ingest them using the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) APIs. You can manually add more indicators as needed, such as your own private indicators, using the [Threat Intelligence tab](#add-indicators-in-the-threat-intelligence-tab) or the APIs.
1. Analysts use the threat indicators data for such things as saved searches, dashboards, [manual searches](#find-threats-with-log-queries), [Cloud SIEM rules](#threat-indicators-in-cloud-siem), and [Cloud SIEM UI](#view-threat-indicators-in-the-cloud-siem-ui).
1. A system administrator occasionally checks to see why a connector isn’t ingesting data, or to see how much storage all the indicators are using. They may [delete some old or irrelevant data](#delete-threat-intelligence-indicators).

## Threat Intelligence tab

Use the **Threat Intelligence** tab to add and manage threat intelligence indicators. You can add threat intelligence indicators from a number of sources, including CrowdStrike, TAXII, ThreatQ, iDefense, and many others. And threat intelligence indicators imported to Sumo Logic not only integrate with your existing core Sumo Logic deployment, but also Cloud SIEM and Cloud SOAR.

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic/).To access the **Threat Intelligence** tab, in the main Sumo Logic menu, select **Manage Data > Logs > Threat Intelligence**. 

[**New UI**](/docs/get-started/sumo-logic-ui/). To access the **Threat Intelligence** tab, in the top menu select **Configuration**, and then under **Logs** select **Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**. 

<img src={useBaseUrl('img/platform-services/threat-intelligence-tab.png')} alt="Threat Intelligence tab" style={{border: '1px solid gray'}} width="800" />

1. **+ Add Indicators**. Click to upload files that [add threat intelligence indicators](#add-indicators-in-the-threat-intelligence-tab).
1. **Actions**. Select to perform additional actions:
    * **Edit Retention Period**. Enter the length of time in days to retain expired threat intelligence indicator files. The maximum number of days is 180. See [Change the retention period for expired indicators](#change-the-retention-period-for-expired-indicators).
1. **Source Name**. The source of the threat intelligence indicator file.
1. **Storage Consumed**. The amount of storage consumed by the threat intelligence indicator file.
1. **Indicators**. The number of threat intelligence indicators included in the file.

:::note
* The "CrowdStrike provided by Sumo Logic (s_CrowdStrike)" source is a default source and cannot be changed or deleted. When performing searches against this source, use "s_CrowdStrike" as the source name.
* The default storage limit is 5 million total indicators (not including any indicators provided by Sumo Logic such as the s_CrowdStrike source).
:::

### Add indicators in the Threat Intelligence tab

To add threat intelligence indicators in the Threat Intelligence tab, you must upload files containing the indicators in a format that can be consumed by Sumo Logic.

:::tip
You can also add threat intelligence indicators using the API or a collector. See [Ingest threat intelligence indicators](#ingest-threat-intelligence-indicators).
:::

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/).In the main Sumo Logic menu, select **Manage Data > Logs > Threat Intelligence**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Configuration**, and then under **Logs** select **Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**.
1. Click **+ Add Indicators**. The dialog displays. <br/><img src={useBaseUrl('img/platform-services/threat-intelligence-add-indicators.png')} alt="Add threat intelligence indicators" style={{border: '1px solid gray'}} width="500" />
1. Select the format of the file to be uploaded:
    * **Normalized JSON**. A normalized JSON file.
    * **CSV**. A comma-separated value (CSV) file.
    <!--* **STIX 2.x JSON**. A JSON file in STIX 2.x format. When choosing this format, you must enter the name of the source in the **Source** field provided.-->

   See [Upload formats](#upload-formats) for the format to use in the file.
1. Click **Upload** to upload the file.
1. Click **Import**.

:::note
When you add indicators, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](#audit-logging-for-threat-intelligence).
:::

### Delete threat intelligence indicators

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/).In the main Sumo Logic menu, select **Manage Data > Logs > Threat Intelligence**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Configuration**, and then under **Logs** select **Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**.
1. Select a source in the list of sources. Details of the source appear in a sidebar.
1. Click **Delete Indicators**. The following message appears: **Delete all indicators for `<source-name>`**.
1. Click **Delete**.

:::note
When you remove indicators, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](#audit-logging-for-threat-intelligence).
:::

### Change the retention period for expired indicators

Indicators are deemed valid until they reach the date set by their "valid until" attribute (`validUntil` for [normalized JSON](#normalized-json-format) and [CSV](#csv-format), and `valid_until` for [STIX](#stix-2x-json-format)). After that date, they are considered expired.

Expired indicators are retained until they reach the end of the retention period. At the end of the retention period, expired indicators are automatically deleted. Between the time they expire and are deleted, the indicators are still in the system, and you can search against them if you want.

By default, expired indicators are retained for 180 days. To change the retention period:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/).In the main Sumo Logic menu, select **Manage Data > Logs > Threat Intelligence**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Configuration**, and then under **Logs** select **Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**.
1. Click the three-dot button in the upper-right corner of the page.
1. Click **Edit Retention Period**.
1. Enter the length of time in days to retain expired threat intelligence indicator files. The maximum number of days is 180.

:::note
When you change the retention period, the event is recorded in the Audit Event Index. See [Audit logging for threat intelligence](#audit-logging-for-threat-intelligence).
:::

You do not have to wait until indicators reach the end of their retention period in order to delete them. You can [use the Threat Intelligence tab to delete indicators](#delete-threat-intelligence-indicators), as well as use the APIs in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource.

## Find threats with log queries

:::warning
The `threatlookup` search operator has been temporarily disabled as of January 27, 2025. 
:::

Once you [ingest threat intelligence indicators](#ingest-threat-intelligence-indicators), you can perform searches to find matches to data in the indicators using the `threatlookup` search operator.

The `threatlookup` operator allows you to search logs for matches in threat intelligence indicators. For example, use the following query to find logs in all `sec_record*` indexes with a `srcDevice_ip` attribute correlated to a threat indicator with a high confidence level (greater than 50):

 ```
_index=sec_record*
| threatlookup srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```

### Syntax

```
threatlookup [singleIndicator] [source="<source_value>"] [include="<all|active|expired>"] <indicator_value_field> [,<optional_indicator_value_field_2>, …]
```

Where:
* `singleIndicator` returns the single best matching indicator. (In the response, `num_match` indicates how many actual matches there are.) If `singleIndicator` is not specified, all matching indicators are returned.

   Specifying `singleIndicator` sorts the list of matching indicators using the following priority order, then returns the indicator at the top of the list:
     1. Active indicators over expired indicators (if you use `include="all"`).
     1. Higher confidence indicators.
     1. More malicious indicators.
     1. Most recently updated indicators.

   If there's still a tie at this point, the system picks the indicator the back-end database returned first.

* `source` is the source to search for the threat intelligence indicator. If `source` is not specified, all sources are searched.
* `include` includes either all, only active, or only expired threat intelligence indicators. If `include` is not specified, only active matching indicators are returned.
* `<indicator_value_field>` is the indicator to look up.
* `<optional_indicator_value_field>` is used to add more indicators to look up.

#### Response fields
* confidence
* fields
* imported
* indicator
* valid_from
* valid_until
* source
* threat_type
* type
* updated
* num_match (if `singleIndicator` is used)

### Examples

```
_index=sec_record*
| threatlookup srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```
```
_index=sec_record*
| threatlookup singleIndicator srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```
```
_index=sec_record*
| threatlookup source="s_CrowdStrike" srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```
```
_index=sec_record*
| threatlookup dstDevice_ip, srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```
```
_index=sec_record*
| threatlookup  source="s_CrowdStrike" dstDevice_ip, srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```
```
_index=sec_record*
| threatlookup  source="s_CrowdStrike" include="active" dstDevice_ip, srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```

## Threat indicators in Cloud SIEM

Threat indicators can be used in Cloud SIEM to find possible threats.

### hasThreatMatch Cloud SIEM rules language function

Use the `hasThreatMatch` function in Cloud SIEM rules to search incoming Records for matches to threat intelligence indicators.

For example, use the function to find all Records with a `srcDevice_ip` attribute correlated to a threat indicator with a high confidence level (greater than 50):

```
hasThreatMatch([srcDevice_ip], confidence > 50)
```

The `hasThreatMatch` Cloud SIEM rules function searches incoming Records in Cloud SIEM for matches to [threat intelligence indicators](/docs/platform-services/threat-intelligence-indicators). It can also match values in [Cloud SIEM threat intelligence](/docs/cse/rules/about-cse-rules/#threat-intelligence).

**Syntax**

`hasThreatMatch([<fields>], <filters>, <indicators>)`

Parameters:
* `<fields>` is a list of comma separated Entity field names. At least one field name is required.
* `<filters>` is a logical expression using indicator attributes. (Allowed are parentheses `()`; `OR` and `AND` boolean operators; and comparison operators `=`, `<`, `>`, `=<`, `=>`, `!=`.)
* `<indicators>` is an optional case insensitive option that describes how indicators should be matched with regard to their validity. Accepted values are:
   * `active_indicators`. Match active indicators only (default).
   * `expired_indicators`. Match expired indicators only.
   * `all_indicators`. Match all indicators.

**Examples**

* `hasThreatMatch([srcDevice_ip])`
* `hasThreatMatch([srcDevice_ip, dstDevice_ip])`
* `hasThreatMatch([srcDevice_ip], confidence > 50)`
* `hasThreatMatch([srcDevice_ip], confidence > 50 AND source="TAXII2Source")`
* `hasThreatMatch([srcDevice_ip], source="s1" OR (source="s2" confidence > 50 AND))`
* `hasThreatMatch([srcDevice_ip], expired_indicators)`
* `hasThreatMatch([srcDevice_ip], confidence > 50, all_indicators)`

### View threat indicators in the Cloud SIEM UI

An Entity can be associated with a known indicator that has a threat type attribute, either `threatType` (in normalized JSON format and CSV format), or `indicator_types` (in STIX format as [defined by indicator_types in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_cvhfwe3t9vuo)).

When that occurs, then anywhere the Entity is displayed in the Cloud SIEM UI, a [threat indicator icon or label](/docs/cse/integrations/enrichments-and-indicators/#threat-indicators) will be displayed showing the Entity's "reputation" corresponding to that threat type:

| Threat type value | Label in the Cloud SIEM UI |
| :-- | :-- |
| `anomalous-activity` | **Suspicious** |
| `anonymization` |  **Suspicious** |
| `benign` |  **Not Flagged** |
| `compromised` |  **Malicious** |
| `malicious-activity` | **Malicious** |
| `attribution` |  (None) |
| `unknown` (or not set) |  **Suspicious** |

Note that if the mapping produces a threat indicator level of **Malicious**, but the confidence is less than 60, the Entity's reputation will be set to **Suspicious** instead. If there are multiple reputation values for a given Entity (potentially from threat intel and enrichment), Cloud SIEM will show the most severe indicator.

Since different sources can report different reputations, each source has a reputation icon on its row in the Cloud SIEM UI. In the following example, the indicator from the Unit 42 source returned a reputation of Malicious, hence the red icon. The link to the right would open a log search window showing the matching indicators in detail.

<img src={useBaseUrl('img/platform-services/threat-indicators-in-cloud-siem-ui.png')} alt="Threat indicators in the Cloud SIEM UI" style={{border: '1px solid gray'}} width="400" />

## Audit logging for threat intelligence

Use the [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/) to view events for threat indicators, such as adding indicators, removing indicators, or changing the retention period.

Use a search like the following:

```
_index=sumologic_audit_events _sourceCategory=threatIntelligence
```

## Upload formats

Use the following formats for threat intelligence indicator files when you [add indicators in the Threat Intelligence tab](#add-indicators-in-the-threat-intelligence-tab) or when you use the upload APIs in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource:

* [Normalized JSON format](#normalized-json-format)
* [CSV format](#csv-format)
* [STIX 2.x JSON format](#stix-2x-json-format)

### Normalized JSON format

Normalized JSON format is a standardized method to present JSON data. You can use this format to load indicators from multiple sources.

#### Example file

Following is an example threat indicator file in normalized JSON format. (For another example, see the [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators)).

```
{
 "indicators": [
   {
     "id": "0001",
     "indicator": "192.0.2.0",
     "type": "ipv4-addr:value",
     "source": "TAXII2Source",
     "validFrom": "2023-03-21T12:00:00.000Z",
     "validUntil": "2025-03-21T12:00:00.000Z",
     "confidence": 30,
     "threatType": "malicious-activity",
     "actors": "actor1,actor2",
     "killChain": "reconnaissance",
     "fields": {
       "kill_chain_name": "lockheed-martin-cyber-kill-chain",
       "kill_chain_phase": "reconnaissance"
     }
   },
   {
     "id": "0002",
     "indicator": "192.0.2.1",
     "type": "ipv4-addr:value",
     "source": "TAXII2Source",
     "validFrom": "2023-03-21T12:00:00.000Z",
     "validUntil": "2025-03-21T12:00:00.000Z",
     "confidence": 30,
     "threatType": "malicious-activity",
     "actors": "actor3,actor4",
     "killChain": "reconnaissance",
     "fields": {
       "kill_chain_name": "lockheed-martin-cyber-kill-chain",
       "kill_chain_phase": "reconnaissance"
     }
   }
 ]
}
```

#### Required attributes

For information about the attributes to use, see ["Indicator" in the STIX 2.1 specification](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_muftrcpnf89v), and the [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators) in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource.

The following attributes are required:
       * **id** (string). ID of the indicator. For example, `indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f`.
       * **indicator** (string). Value of the indicator, such as an IP address, file name, email address, etc. For example, `192.0.2.0`.
       * **type** (string). Type of the indicator. Following are valid values:
         * `domain-name`. Domain name. (Entity type in Cloud SIEM is `_domain`.)
         * `email-addr`. Email address. (Entity type in Cloud SIEM is `_email`.)
         * `file`. File name. (Entity type in Cloud SIEM is `_file`.)
         * `file:hashes`. File hash. (Entity type in Cloud SIEM is `_hash`.)<br/>If you want to add the hash algorithm, enter `file:hashes.'<HASH-TYPE>'`. For example, `[file:hashes.'SHA-256' = '4bac393bdd']`.
         * `ipv4-addr`. IPv4 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `ipv6-addr`. IPv6 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `mac-addr`. Mac address name. (Entity type in Cloud SIEM is `_mac`.)
         * `process`. Process name. (Entity type in Cloud SIEM is `_process`.)
         * `url`. URL. (Entity type in Cloud SIEM is `_url`.)
         * `user-account`. User ID. (Entity type in Cloud SIEM is `_username`.)
       * **source** (string). User-provided text to identify the source of the indicator. For example, `TAXII2Source`.
       * **validFrom** (string [date-time]). Beginning time this indicator is valid. Timestamp in UTC in RFC3339 format. For example, `2023-03-21T12:00:00.000Z`.
       * **confidence** (integer [ 1 .. 100 ]). Confidence that the creator has in the correctness of their data, where 100 is highest (as [defined by the confidence scale in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_1v6elyto0uqg)). For example, `75`.
       * **threatType** (string). Type of indicator (as [defined by indicator_types in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_cvhfwe3t9vuo)). For example, `malicious-activity`. (This attribute can result in a special label appearing next to Entities in the Cloud SIEM UI. See [Threat indicators in the Cloud SIEM UI](#view-threat-indicators-in-the-cloud-siem-ui).) <br/>Following are valid values:
          * `anomalous-activity`. Unexpected or unusual activity that may not necessarily be malicious or indicate compromise.
          * `anonymization`. Suspected anonymization tools or infrastructure (proxy, TOR, VPN, etc.).
          * `benign`. Activity that is not suspicious or malicious in and of itself, but when combined with other activity may indicate suspicious or malicious behavior.
          * `compromised`. Assets that are suspected to be compromised.
          * `malicious-activity`. Patterns of suspected malicious objects and/or activity.
          * `attribution`. Patterns of behavior that indicate attribution to a particular threat actor or campaign.
          * `unknown` (or not set). There is not enough information available to determine the threat type.

      The following attributes are optional:
       * **actors** (string list). An identified threat actor such as an individual, organization, or group. For example, `actor1`. This attribute is frequently used in the s_CrowdStrike source.
       * **killChain** (string list). The various phases an attacker may undertake to achieve their objectives (as [defined by kill_chain_phase in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_i4tjv75ce50h)). For example, `reconnaissance`. This attribute is frequently used in the s_CrowdStrike source. Although you can use any kill chain definition and values you want, following are example values based on the standard stages in a kill chain:
          * `reconnaissance`.  Researching potential targets.
          * `weaponization`. Creation of malware to be used against an identified target.
          * `delivery`. Infiltration of a target’s network and users.
          * `exploitation`. Taking advantage of the vulnerabilities discovered in previous stages to further infiltrate a target’s network and achieve objectives.
          * `installation`. Install malware and other cyberweapons onto the target network to take control of its systems and exfiltrate valuable data.
          * `command-and-control`. Communication with the installed malware.
          * `actions-on-objectives`. Carrying out cyberattack objectives.

### CSV format

Comma-separated value (CSV) is a standard format for data upload.

#### Example files

##### Upload with the UI

If uploading a CSV file with the UI, the format should be the same as used for a standard CSV file:

```
0001,192.0.2.0,ipv4-addr:value,TAXII2Source,2023-02-21T12:00:00.00Z,2025-05-21T12:00:00.00Z,30,malicious-activity,,
0002,192.0.2.1,ipv4-addr:value,TAXII2Source,2023-02-21T12:00:00.00Z,2025-05-21T12:00:00.00Z,30,malicious-activity,actor3,reconnaissance
```

##### Upload with the API

If uploading a CSV file using the API, the file should be contained in a JSON object like this:

```
{
 "csv": "0001,192.0.2.0,ipv4-addr,TAXII2Source,2023-02-21T12:00:00.00Z,2025-05-21T12:00:00.00Z,3,malicious-activity,,\n
0002,192.0.2.1,ipv4-addr,TAXII2Source,2023-02-21T12:00:00.00Z,2025-05-21T12:00:00.00Z,3,malicious-activity,actor3,reconnaissance\n"
}
```

<!-- For other examples for uploading CSV files using the API, see the [uploadCsvIndicators API](https://api.sumologic.com/docs/#operation/uploadCsvIndicators) and the [uploadBlobIndicators API](https://api.sumologic.com/docs/#operation/uploadBlobIndicators). -->

#### Required attributes

For information about the attributes to use, see ["Indicator" in the STIX 2.1 specification](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_muftrcpnf89v). <!-- Also see the [uploadCsvIndicators API](https://api.sumologic.com/docs/#operation/uploadCsvIndicators) in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource. -->

Columns for the following attributes are required in the upload file:
       * **id** (string). ID of the indicator. For example, `indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f`.
       * **indicator** (string). Value of the indicator, such as an IP address, file name, email address, etc. For example, `192.0.2.0`.
       * **type** (string). Type of the indicator. Following are valid values:
         * `domain-name`. Domain name. (Entity type in Cloud SIEM is `_domain`.)
         * `email-addr`. Email address. (Entity type in Cloud SIEM is `_email`.)
         * `file`. File name. (Entity type in Cloud SIEM is `_file`.)
         * `file:hashes`. File hash. ( Entity type in Cloud SIEM is `_hash`.)<br/>If you want to add the hash algorithm, enter `file:hashes.'<HASH-TYPE>'`. For example, `[file:hashes.'SHA-256' = '4bac393bdd']`.
         * `ipv4-addr`. IPv4 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `ipv6-addr`. IPv6 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `mac-addr`. Mac address name. (Entity type in Cloud SIEM is `_mac`.)
         * `process`. Process name. (Entity type in Cloud SIEM is `_process`.)
         * `url`. URL. (Entity type in Cloud SIEM is `_url`.)
         * `user-account`. User ID. (Entity type in Cloud SIEM is `_username`.)
       * **source** (string). User-provided text to identify the source of the indicator. For example, `TAXII2Source`.
       * **validFrom** (string [date-time]). Beginning time this indicator is valid. Timestamp in UTC in RFC3339 format. For example, `2023-03-21T12:00:00.000Z`.
       * **validUntil** (string [date-time]). Ending time this indicator is valid. If not set, the indicator never expires. Timestamp in UTC in RFC3339 format. For example, `2024-03-21T12:00:00.000Z`.
       * **confidence** (integer [ 1 .. 100 ]). Confidence that the creator has in the correctness of their data, where 100 is highest. For example, `75`.
       * **threatType** (string). Type of indicator (as [defined by indicator_types in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_cvhfwe3t9vuo)). For example, `malicious-activity`. (This attribute can result in a special label appearing next to Entities in the Cloud SIEM UI. See [Threat indicators in the Cloud SIEM UI](#view-threat-indicators-in-the-cloud-siem-ui).) <br/>Following are valid values:
          * `anomalous-activity`. Unexpected or unusual activity that may not necessarily be malicious or indicate compromise.
          * `anonymization`. Suspected anonymization tools or infrastructure (proxy, TOR, VPN, etc.).
          * `benign`. Activity that is not suspicious or malicious in and of itself, but when combined with other activity may indicate suspicious or malicious behavior.
          * `compromised`. Assets that are suspected to be compromised.
          * `malicious-activity`. Patterns of suspected malicious objects and/or activity.
          * `attribution`. Patterns of behavior that indicate attribution to a particular threat actor or campaign.
          * `unknown` (or not set). There is not enough information available to determine the threat type.

      The following attributes are optional:
       * **actors** (string list). An identified threat actor such as an individual, organization, or group. For example, `actor3`. This attribute is frequently used in the s_CrowdStrike source. Note if you don’t provide a value for `actors`, you still must provide the empty column at the end of the row with an extra comma, as shown in the examples above.
       * **killChain** (string list). The various phases an attacker may undertake to achieve their objectives (as [defined by kill_chain_phase in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_i4tjv75ce50h)). For example, `reconnaissance`. This attribute is frequently used in the s_CrowdStrike source. Although you can use any kill chain definition and values you want, following are example values based on the standard stages in a kill chain:
          * `reconnaissance`.  Researching potential targets.
          * `weaponization`. Creation of malware to be used against an identified target.
          * `delivery`. Infiltration of a target’s network and users.
          * `exploitation`. Taking advantage of the vulnerabilities discovered in previous stages to further infiltrate a target’s network and achieve objectives.
          * `installation`. Install malware and other cyberweapons onto the target network to take control of its systems and exfiltrate valuable data.
          * `command-and-control`. Communication with the installed malware.
          * `actions-on-objectives`. Carrying out cyberattack objectives.

### STIX 2.x JSON format

STIX 2.x JSON format is a method to present JSON data according to the STIX 2.x specification.

Note that if you want to upload indicators from multiple sources, you cannot use this format but instead should use the [Normalized JSON format](#normalized-json-format).

Also note that if your STIX file includes lines like these at the top...

```
{
  "type": "bundle",
  "id": "bundle--cf20f99b-3ed2-4a9f-b4f1-d660a7fc8241",
  "objects": [
  {
    "type": "indicator",
```

...you should remove them before uploading the file, and leave only the objects array like this:

```
[
  {
    "type": "indicator",
```


#### Example files
<!--
##### Upload with the UI

Following is an example threat indicator file in STIX 2.1 JSON format if you're uploading a file with the UI.

If you are uploading via the UI, do not include the `source` value in the file, since the UI prompts for the source value when you [add the indicator](/docs/platform-services/threat-intelligence-indicators#add-indicators-in-the-threat-intelligence-tab).

```
[
   {
     "type": "indicator",
     "spec_version": "2.1",
     "id": "0001",
     "created": "2023-03-21T12:00:00.000Z",
     "modified": "2023-03-21T12:00:00.000Z",
     "confidence": 30,
     "pattern": "[ipv4-addr:value = '192.0.2.0']",
     "pattern_type": "stix",
     "pattern_version": "string",
     "valid_from": "2023-03-21T12:00:00.000Z",
     "valid_until": "2025-03-21T12:00:00.000Z",
     "indicator_types": [
       "malicious-activity"
     ],
     "kill_chain_phases": [
       {
         "kill_chain_name": "lockheed-martin-cyber-kill-chain",
         "phase_name": "reconnaissance"
       }
     ]
   },
   {
     "type": "indicator",
     "spec_version": "2.1",
     "id": "0002",
     "created": "2023-03-21T12:00:00.000Z",
     "modified": "2023-03-21T12:00:00.000Z",
     "confidence": 30,
     "pattern": "[ipv4-addr:value = '192.0.2.1']",
     "pattern_type": "stix",
     "pattern_version": "string",
     "valid_from": "2023-03-21T12:00:00.000Z",
     "valid_until": "2025-03-21T12:00:00.000Z",
     "indicator_types": [
       "malicious-activity"
     ],
     "kill_chain_phases": [
       {
         "kill_chain_name": "lockheed-martin-cyber-kill-chain",
         "phase_name": "reconnaissance"
       }
     ]
   }
 ]
 ```

##### Upload with the API
-->
Following is an example threat indicator file in STIX 2.1 JSON format if you're uploading a file with the API.

As shown in the following example, if uploading via the API you must add the `source` attribute outside of the indicators object, since the source is not part of the STIX standard. You must also include an `indicators` array field. (For another example for uploading via the API, see the [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators)).

```
{
 "source": "TAXII 2 Source",
 "indicators": [
   {
     "type": "indicator",
     "spec_version": "2.1",
     "id": "0001",
     "created": "2023-03-21T12:00:00.000Z",
     "modified": "2023-03-21T12:00:00.000Z",
     "confidence": 30,
     "pattern": "[ipv4-addr:value = '192.0.2.0']",
     "pattern_type": "stix",
     "pattern_version": "string",
     "valid_from": "2023-03-21T12:00:00.000Z",
     "valid_until": "2025-03-21T12:00:00.000Z",
     "indicator_types": [
       "malicious-activity"
     ],
     "kill_chain_phases": [
       {
         "kill_chain_name": "lockheed-martin-cyber-kill-chain",
         "phase_name": "reconnaissance"
       }
     ]
   },
   {
     "type": "indicator",
     "spec_version": "2.1",
     "id": "0002",
     "created": "2023-03-21T12:00:00.000Z",
     "modified": "2023-03-21T12:00:00.000Z",
     "confidence": 30,
     "pattern": "[ipv4-addr:value = '192.0.2.1']",
     "pattern_type": "stix",
     "pattern_version": "string",
     "valid_from": "2023-03-21T12:00:00.000Z",
     "valid_until": "2025-03-21T12:00:00.000Z",
     "indicator_types": [
       "malicious-activity"
     ],
     "kill_chain_phases": [
       {
         "kill_chain_name": "lockheed-martin-cyber-kill-chain",
         "phase_name": "reconnaissance"
       }
     ]
   }
 ]
}
```

#### Required attributes

For information about the attributes to use, see ["Indicator" in the STIX 2.1 specification](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_muftrcpnf89v), and the [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators) in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource.

The following attributes are required:
       * **type** (string). The type of STIX object. For example, `indicator`. The value must be the name of one of the types of STIX objects defined in the STIX 2.x specification.
       * **spec_version** (string). The version of the STIX specification used to represent this object. The value of this property must be `2.1` for STIX objects defined according to the STIX 2.1 specification.
       * **id** (string). ID of the indicator. For example, `indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f`.
       * **created** (string [date-time]). The time at which the object was originally created. Timestamp in UTC in RFC3339 format. For example, `2016-05-01T06:13:14.000Z`.
       * **modified** (string [date-time]). When the object is modified. Timestamp in UTC in RFC3339 format. For example, `2023-05-01T06:13:14.000Z`. This property is only used by STIX Objects that support versioning and represents the time that this particular version of the object was last modified.
       * **pattern** (string). The pattern of this indicator (as defined by [pattern in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_me3pzm77qfnf)). Following are valid values:
         * `domain-name:value`. Domain name. (Entity type in Cloud SIEM is `_domain`.)
         * `email-addr:value`. Email address. (Entity type in Cloud SIEM is `_email`.)
         * `file:hashes`. File hash. (Entity type in Cloud SIEM is `_hash`.)<br/>If you want to add the hash algorithm, enter `file:hashes.'<HASH-TYPE>'`. For example, `[file:hashes.'SHA-256' = '4bac393bdd']`.
         * `file:name`. File name. (Entity type in Cloud SIEM is `_file`.)
         * `ipv4-addr:value`. IPv4 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `ipv6-addr:value`. IPv6 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `mac-addr:value`. Mac address name. (Entity type in Cloud SIEM is `_mac`.)
         * `process:name`. Process name. (Entity type in Cloud SIEM is `_process`.)
         * `url:value`. URL. (Entity type in Cloud SIEM is `_url`.)
         * `user-account:user-id`. User ID. (Entity type in Cloud SIEM is `_username`.)
         * `user-account:login`. Login name. (Entity type in Cloud SIEM is `_username`.)       
       * **pattern_type** (string). The pattern language used in this indicator (as defined by [pattern_type in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_9lfdvxnyofxw)). Enter `stix` to specify the [STIX](https://oasis-open.github.io/cti-documentation/stix/intro) pattern language.
       * **valid_from** (string [date-time]). Beginning time this indicator is valid. Timestamp in UTC in RFC3339 format. For example, `2023-03-21T12:00:00.000Z`.

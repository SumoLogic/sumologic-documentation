---
id: threat-intelligence-indicators
title: Threat Intelligence Indicators
sidebar_label: Threat Intelligence Indicators
description: Learn how to add indicators from threat intelligence sources.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Threat intelligence, often abbreviated as *threat intel*, is information that helps you prevent or mitigate cyber attacks. *Threat intelligence indicators* are individual data points about threats that are gathered from external sources about various entities such as host names, file hashes, IP addresses, and other known targets for compromise. You can import files containing threat intelligence indicators directly into Sumo Logic to aid in security analysis. 

Threat intelligence indicators can help security analysts leverage a large body of information to surface potential threats. For example, say that a threat intelligence database has an indicator that correlates a certain IP address with known malicious activity. Because of this correlation, analysts can assume log messages with that IP address are more likely to be part of a real cyber attack.

## Prerequisites

### Role capabilities

To use threat intelligence indicators, you must have the correct [role capabilities](/docs/manage/users-roles/roles/role-capabilities/). 

1. In the left navigation bar of Sumo Logic, select **Administration > Users and Roles**.
1. Click the **Roles** tab.
1. Click **Add Role** to create a new role. Alternatively, you can select an existing role in the **Roles** tab and click **Edit**.
Add the following capabilities:
   * **Threat Intel**
       * **View Threat Intel Data Store**
       * **Manage Threat Intel Data Store**

<!-- At GA, add these role capabilities to the "Role Capabilities" article. -->

### STIX/TAXII 2.0 collector

To use threat intelligence indicators, you must first install and configure the [STIX/TAXII 2.0 collector](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/). This collector helps correlate data from logs to threat intelligence indicators. <!-- Add the link to the collector once it is available. -->

## Threat Intelligence tab

Use the **Threat Intelligence** tab to add and manage threat intelligence indicators. You can add threat intelligence indicators from a number of sources, including CrowdStrike, TAXII, ThreatQ, iDefense, and many others. And threat intelligence indicators imported to Sumo Logic not only integrate with your existing core Sumo Logic deployment, but also Cloud SIEM and Cloud SOAR. (For information about how to add additional threat intelligence indicators for Cloud SIEM, see [Create a Custom Threat Intelligence Source](/docs/cse/administration/create-custom-threat-intel-source).)

To access the **Threat Intelligence** tab, go to **Manage Data > Logs > Threat Intelligence**.

<img src={useBaseUrl('img/platform-services/threat-intelligence-tab.png')} alt="Threat Intelligence tab" style={{border: '1px solid black'}} width="800" />

1. **Add Indicators**. Click to upload files that [add threat intelligence indicators](#add-threat-intelligence-indicators).
1. **Actions**. Select to perform additional actions:
    * **Edit Retention Period**. Enter the length of time in days to retain expired threat intelligence indicator files. The maximum number of days is 180.
1. **Source Name**. The source of the threat intelligence indicator file.
1. **Storage Consumed**. The amount of storage consumed by the threat intelligence indicator file.
1. **Indicators**. The number of threat intelligence indicators included in the file. 

### Add threat intelligence indicators

To add threat intelligence indicators, you must upload files containing the indicators in a format that can be consumed by Sumo Logic.

1. In Sumo Logic, go to **Manage Data > Logs > Threat Intelligence**.
1. Click **Add Indicators**. The dialog displays. <br/><img src={useBaseUrl('img/platform-services/threat-intelligence-add-indicators.png')} alt="Add threat intelligence indicators" style={{border: '1px solid black'}} width="500" />
1. Select the format of the file to be uploaded:
    * **Normalized JSON**. A normalized JSON file. <br/>In the [threatIntelIngest](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource, see the [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators) for information about the attributes to use. Your file must include the following attributes:
       * `confidence`
       * `id`
       * `imported`
       * `indicator`
       * `source`
       * `threatType`
       * `type`
       * `validFrom`
    * **CSV**. A comma-separated value (CSV) file. <br/>In the [threatIntelIngest](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource, see the [uploadBlobIndicators API](https://api.sumologic.com/docs/#operation/uploadBlobIndicators) for information about the attributes to use. Your file must include the following attributes:
       * `confidence`
       * `id`
       * `imported`
       * `source`
       * `threatType`
       * `type`
       * `validFrom`
       * `validUntil`
       * `value`
    * **STIX 2.1 JSON**. A JSON file in STIX 2.1 format. (Note that if you want to upload indicators from multiple sources, you cannot use STIX but instead should use **Sumo normalized JSON**.) <br/>In the [threatIntelIngest](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource, see the [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators) for information about the attributes to use. Your file must include the following attributes:
       * `created`
       * `id`
       * `modified`
       * `pattern`
       * `pattern_type`
       * `spec_version`
       * `type`
       * `valid_from`
1. Click **Upload** to upload the file.
1. Click **Import**. 

### Delete threat intelligence indicators

1. Select a source. Details of the source appear in a sidebar.
1. Click **Delete Indicators**. The following dialog appears. <br/><img src={useBaseUrl('img/platform-services/threat-intelligence-delete-indicators.png')} alt="Delete threat intelligence indicators" style={{border: '1px solid black'}} width="500" />
1. Select indicators to delete from the source:
   * **Delete all indicators**. Remove all indicators from the source. 
   * **Delete indicators matching the expression**. Enter the attribute and value to match. For example, if you want to delete indicators with certain "valid until" dates from **Sumo normalized JSON** files, for an attribute enter `validUntil` and for a value enter a date. The attributes and values you enter must match attributes and values in the files uploaded in [Add threat intelligence indicators](#add-threat-intelligence-indicators) above.
1. Click **Delete**. 

## Search for threats

Once you [add threat intelligence indicators](#add-threat-intelligence-indicators), you can perform searches to find matches to data in the indicators using:
* [`threat_lookup` search operator](#threat_lookup)
* [`hasThreatMatch` Cloud SIEM rules language function](#hasthreatmatch)

### threat_lookup search operator

The `threat_lookup` search operator allows you to search logs for matches in threat intelligence indicators. Note that you can also use the [`threatIP`](/docs/search/search-query-language/search-operators/threatip/) search operator to search CrowdStrike's threat intelligence data based on IP addresses. For other search operators, see [Search Operators](/docs/search/search-query-language/search-operators).

#### Syntax

```
threat_lookup [source=<source_value>] [include=<all|active|expired>] <indicator_value_field> [,<optional_indicator_value_field_2>, …]
```

Response fields:
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

#### Examples

```
index=sec_record* objectType=NetworkProxy 
| threat_lookup dstDevice_ip 
| where _threatLookup.confidence > 50 
| timeslice 1h 
| count by _timeslice
```
```
index=sec_record* objectType=NetworkProxy 
| threat_lookup source=FreeTAXII dstDevice_ip 
| where _threatLookup.confidence > 50 
| timeslice 1h 
| count by _timeslice
```
```
index=sec_record* objectType=NetworkProxy 
| threat_lookup dstDevice_ip, srcDevice_ip 
| where _threatLookup.confidence > 50 
| timeslice 1h 
| count by _timeslice
```
```
index=sec_record* objectType=NetworkProxy 
| threat_lookup  source=FreeTAXII dstDevice_ip, srcDevice_ip 
| where _threatLookup.confidence > 50 
| timeslice 1h 
| count by _timeslice
```

```
index=sec_record* objectType=NetworkProxy 
| threatlookup  source=FreeTAXII  include=active dstDevice_ip, srcDevice_ip 
| where _threatLookup.confidence > 50 
| timeslice 1h 
| count by _timeslice
```

### hasThreatMatch Cloud SIEM rules language function

The `hasThreatMatch` Cloud SIEM rules function searches incoming Records in Cloud SIEM for matches to threat intelligence indicators. It can match values in [Cloud SIEM threat intelligence](/docs/cse/rules/about-cse-rules/#threat-intelligence) lists as well as threat indicators added to the [Threat Intelligence tab](#threat-intelligence-tab). For other Cloud SIEM rules functions, see [Cloud SIEM Rules Syntax](/docs/cse/rules/cse-rules-syntax/).

#### Syntax

`hasThreatMatch([<fields>], <optional_filtering_predicate>, <indicators>)`

Parameters:
* `<fields>` is a list of comma separated Entity field names. At least one field name is required.
* `<optional_filtering_predicate>` is an optional simple boolean expression on the threat indicator fields. Allowed are parentheses `()`; `OR` and `AND` boolean operators; and comparison operators `=`, `<`, `>`, `=<`, `=>`, `!=`.
* `<indicators>` is an optional case insensitive option that describes how indicators should be matched with regard to their validity. Accepted values are:
   * `active_indicators`. Match active indicators only (default).
   * `expired_indicators`. Match expired indicators only.
   * `all_indicators`. Match all indicators.

#### Examples

* `hasThreatMatch([srcDevice_ip])`
* `hasThreatMatch([srcDevice_ip, dstDevice_ip])`
* `hasThreatMatch([srcDevice_ip], confidence > 50)`
* `hasThreatMatch([srcDevice_ip], confidence > 50 AND source=”FreeTAXII”)`
* `hasThreatMatch([srcDevice_ip], source=”s1” OR (source=”s2” confidence > 50 AND))`
* `hasThreatMatch([srcDevice_ip], active_indicators)`
* `hasThreatMatch([srcDevice_ip], confidence > 50, all_indicators)`
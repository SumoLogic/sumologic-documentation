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

To use threat intelligence indicators, you must have the correct [role capabilities](/docs/manage/users-roles/roles/role-capabilities/#threat-intel). 

1. In the left navigation bar of Sumo Logic, select **Administration > Users and Roles**.
1. Click the **Roles** tab.
1. Click **Add Role** to create a new role. Alternatively, you can select an existing role in the **Roles** tab and click **Edit**.
Add the following capabilities:
   * **Threat Intel**
       * **View Threat Intel Data Store**
       * **Manage Threat Intel Data Store**

### Ingest threat intelligence indicators

To search logs that contain correlations to threat intelligence indicators, you must first ingest the indicators. You can ingest indicators using:
* **The Threat Intelligence tab**. See [Add indicators in the Threat Intelligence tab](#add-indicators-in-the-threat-intelligence-tab).
* **A collector**. See [STIX/TAXII 2 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-2-client-source). 
* **The API**. See the following APIs in the [threatIntelIngest](https://api.sumologic.com/docs/#tag/threatIntelIngest) resource:
   * [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators)
   * [uploadCsvIndicators API](https://api.sumologic.com/docs/#operation/uploadCsvIndicators)
   * [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators)

See [Upload formats](#upload-formats) for the format to use when uploading indicators using the Threat Intelligence tab or APIs.

## Threat Intelligence tab

Use the **Threat Intelligence** tab to add and manage threat intelligence indicators. You can add threat intelligence indicators from a number of sources, including CrowdStrike, TAXII, ThreatQ, iDefense, and many others. And threat intelligence indicators imported to Sumo Logic not only integrate with your existing core Sumo Logic deployment, but also Cloud SIEM and Cloud SOAR. (For information about how to add additional threat intelligence indicators for Cloud SIEM, see [Create a Custom Threat Intelligence Source](/docs/cse/administration/create-custom-threat-intel-source).)

To access the **Threat Intelligence** tab, go to **Manage Data > Logs > Threat Intelligence**.

<img src={useBaseUrl('img/platform-services/threat-intelligence-tab.png')} alt="Threat Intelligence tab" style={{border: '1px solid gray'}} width="800" />

1. **Add Indicators**. Click to upload files that [add threat intelligence indicators](#add-indicators-in-the-threat-intelligence-tab).
1. **Actions**. Select to perform additional actions:
    * **Edit Retention Period**. Enter the length of time in days to retain expired threat intelligence indicator files. The maximum number of days is 180.
1. **Source Name**. The source of the threat intelligence indicator file. 
1. **Storage Consumed**. The amount of storage consumed by the threat intelligence indicator file.
1. **Indicators**. The number of threat intelligence indicators included in the file. 

:::note
The “CrowdStrike provided by Sumo Logic (s_CrowdStrike)” source is a default source and cannot be changed or deleted. When performing searches against this source, use "s_CrowdStrike" as the source name.
:::

### Add indicators in the Threat Intelligence tab

To add threat intelligence indicators in the Threat Intelligence tab, you must upload files containing the indicators in a format that can be consumed by Sumo Logic.

:::tip
You can also add threat intelligence indicators using the API or a collector. See [Ingest threat intelligence indicators](#ingest-threat-intelligence-indicators).
:::

1. In Sumo Logic, go to **Manage Data > Logs > Threat Intelligence**.
1. Click **Add Indicators**. The dialog displays. <br/><img src={useBaseUrl('img/platform-services/threat-intelligence-add-indicators.png')} alt="Add threat intelligence indicators" style={{border: '1px solid gray'}} width="500" />
1. Select the format of the file to be uploaded:
    * **Normalized JSON**. A normalized JSON file. 
    * **CSV**. A comma-separated value (CSV) file. 
    * **STIX 2.1 JSON**. A JSON file in STIX 2.1 format. 

   See [Upload formats](#upload-formats) for the format to use in the file.
1. Click **Upload** to upload the file. 
1. Click **Import**. 

### Delete threat intelligence indicators

1. Select a source. Details of the source appear in a sidebar.
1. Click **Delete Indicators**. The following dialog appears. <br/><img src={useBaseUrl('img/platform-services/threat-intelligence-delete-indicators.png')} alt="Delete threat intelligence indicators" style={{border: '1px solid gray'}} width="500" />
1. Select indicators to delete from the source:
   * **Delete all indicators**. Remove all indicators from the source. 
   * **Delete indicators matching the expression**. Enter the attribute and value to match. For example, if you want to delete indicators with certain "valid until" dates from **Sumo normalized JSON** files, for an attribute enter `validUntil` and for a value enter a date. The attributes and values you enter must match attributes and values in the files uploaded in [Add indicators in the threat intelligence tab](#add-indicators-in-the-threat-intelligence-tab) above.
1. Click **Delete**. 

## Search for threats

Once you [add threat intelligence indicators](#add-indicators-in-the-threat-intelligence-tab), you can perform searches to find matches to data in the indicators using:
* [`threatlookup` search operator](#threatlookup-search-operator)
* [`hasThreatMatch` Cloud SIEM rules language function](#hasthreatmatch-cloud-siem-rules-language-function)

### threatlookup search operator

The `threatlookup` search operator allows you to search logs for matches in threat intelligence indicators. Note that you can also use the [`threatIP`](/docs/search/search-query-language/search-operators/threatip/) search operator to search CrowdStrike's threat intelligence data based on IP addresses. For other search operators, see [Search Operators](/docs/search/search-query-language/search-operators).

#### Syntax

```
threatlookup [source="<source_value>"] [include="<all|active|expired>"] <indicator_value_field> [,<optional_indicator_value_field_2>, …]
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
_index=sec_record* 
| threatlookup dstDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```
```
_index=sec_record* 
| threatlookup source="s_CrowdStrike" dstDevice_ip
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

#### Run threatlookup with the cat search operator

You can run the `threatlookup` search operator with the [cat search operator](https://help.sumologic.com/docs/search/search-query-language/search-operators/cat/) by using the `sumo://threat-intel` path. This lets you search the entire store of threat intelligence indicators, or just a portion. For example:
```
cat sumo://threat-intel  | where _threatlookup.indicator = "192.0.2.0"
```
```
cat sumo://threat-intel  | where _threatlookup.source = "s_CrowdStrike" and _threatlookup.indicator = "192.0.2.0"
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
* `hasThreatMatch([srcDevice_ip], expired_indicators)`
* `hasThreatMatch([srcDevice_ip], confidence > 50, all_indicators)`

## Upload formats

Use the following formats for threat intelligence indicator files when you [add indicators in the Threat Intelligence tab](#add-indicators-in-the-threat-intelligence-tab) or when you use the upload APIs in the [threatIntelIngest](https://api.sumologic.com/docs/#tag/threatIntelIngest) resource:

* [Normalized JSON format](#normalized-json-format)
* [CSV format](#csv-format)
* [STIX 2.1 JSON format](#stix-21-json-format)

### Normalized JSON format

Normalized JSON format is a standardized method to present JSON data. You can use this format to load indicators from multiple sources. 

#### Example file

Following is an example threat indicator file in normalized JSON format (from the [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators)):

```
{
  "indicators": [
    {
      "id": "indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f",
      "indicator": "192.0.2.0",
      "type": "ipv4-addr",
      "source": "FreeTAXII",
      "updated": "2023-03-21T12:00:00.000Z",
      "validFrom": "2023-03-21T12:00:00.000Z",
      "validUntil": "2023-03-21T12:00:00.000Z",
      "confidence": 1,
      "threatType": "indicator",
      "fields": {
        "property1": "string",
        "property2": "string"
      }
    }
  ]
}
```
#### Required attributes

For information about the attributes to use, see ["Indicator" in the STIX 2.1 specification](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_muftrcpnf89v), and the [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators) in the [threatIntelIngest](https://api.sumologic.com/docs/#tag/threatIntelIngest) resource. 

The following attributes are required:
       * **id** (string). ID of the indicator. For example, `indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f`.
       * **indicator** (string). Value of the indicator, such as an IP address, file name, email address, etc. For example, `192.0.2.0`.
       * **type** (string). Type of the indicator. Following are valid values: 
         * `domain-name`. Domain name. (Entity type in Cloud SIEM is `_domain`.)
         * `email-addr`. Email address. (Entity type in Cloud SIEM is `_email`.)
         * `file`. File name. (Entity type in Cloud SIEM is `_file`.)
         * `ipv4-addr`. IPv4 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `ipv6-addr`. IPv6 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `mac-addr`. Mac address name. (Entity type in Cloud SIEM is `_mac`.)
         * `process`. Process name. (Entity type in Cloud SIEM is `_process`.)
         * `url`. URL. (Entity type in Cloud SIEM is `_url`.)
         * `user-account`. User ID. (Entity type in Cloud SIEM is `_username`.)
       * **source** (string). User-provided text to identify the source of the indicator. For example, `FreeTAXII`. 
       * **validFrom** (string [date-time]). Beginning time this indicator is valid. Timestamp in UTC in RFC3339 format. For example, `2023-03-21T12:00:00.000Z`.
       * **confidence** (integer [ 1 .. 100 ]). Confidence that the creator has in the correctness of their data, where 100 is highest (as [defined by the confidence scale in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_1v6elyto0uqg)). For example, `75`.
       * **threatType** (string). Type of indicator (as [defined by indicator_type in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_cvhfwe3t9vuo)). For example, `indicator`. 

### CSV format

Comma-separated value (CSV) is a standard format for data upload.

#### Example file

Following is an example threat indicator file in CSV format (from the [uploadCsvIndicators API](https://api.sumologic.com/docs/#operation/uploadCsvIndicators)):

```
{
  "blob": "0001,192.0.2.0,ipv4-addr,FreeTAXII,2023-02-21T12:00:00.00Z,2023-05-21T12:00:00.00Z,3,indicator\n"
}
```

#### Required attributes

For information about the attributes to use, see ["Indicator" in the STIX 2.1 specification](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_muftrcpnf89v), and the [uploadCsvIndicators API](https://api.sumologic.com/docs/#operation/uploadCsvIndicators) in the [threatIntelIngest](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource.

Columns for the following attributes are required in the upload file:
       * **id** (string). ID of the indicator. For example, `indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f`.
       * **value** (string). Value of the indicator, such as an IP address, file name, email address, etc. For example, `192.0.2.0`.
       * **type** (string). Type of the indicator. Following are valid values: 
         * `domain-name`. Domain name. (Entity type in Cloud SIEM is `_domain`.)
         * `email-addr`. Email address. (Entity type in Cloud SIEM is `_email`.)
         * `file`. File name. (Entity type in Cloud SIEM is `_file`.)
         * `ipv4-addr`. IPv4 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `ipv6-addr`. IPv6 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `mac-addr`. Mac address name. (Entity type in Cloud SIEM is `_mac`.)
         * `process`. Process name. (Entity type in Cloud SIEM is `_process`.)
         * `url`. URL. (Entity type in Cloud SIEM is `_url`.)
         * `user-account`. User ID. (Entity type in Cloud SIEM is `_username`.)
       * **source** (string). User-provided text to identify the source of the indicator. For example, `FreeTAXII`.
       * **validFrom** (string [date-time]). Beginning time this indicator is valid. Timestamp in UTC in RFC3339 format. For example, `2023-03-21T12:00:00.000Z`.
       * **validUntil** (string [date-time]). Ending time this indicator is valid. If not set, the indicator never expires. Timestamp in UTC in RFC3339 format. For example, `2024-03-21T12:00:00.000Z`.
       * **confidence** (integer [ 1 .. 100 ]). Confidence that the creator has in the correctness of their data, where 100 is highest. For example, `75`.
       * **threatType** (string). Type of indicator (as [defined by indicator_type in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_cvhfwe3t9vuo)). For example, `indicator`.

### STIX 2.1 JSON format

STIX 2.1 JSON format is a method to present JSON data according to the STIX 2.1 specification. 

Note that if you want to upload indicators from multiple sources, you cannot use this format but instead should use the [Normalized JSON format](#normalized-json-format).

#### Example file

Following is an example threat indicator file in STIX 2.1 JSON format (from the [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators)):

```
{
  "source": "FreeTAXII",
  "indicators": [
    {
      "type": "indicator",
      "spec_version": "2.1",
      "id": "acme:indicator-bf8bc5d5-c7e6-46b0-8d22-7500fea77196",
      "created": "2023-03-21T12:00:00.000Z",
      "modified": "2023-03-21T12:00:00.000Z",
      "created_by_ref": "identity--f431f809-377b-45e0-aa1c-6a4751cae5ff",
      "revoked": true,
      "labels": [
        "heartbleed",
        "has-logo"
      ],
      "confidence": 1,
      "lang": "en",
      "external_references": [
        {
          "source_name": "system",
          "description": "string",
          "url": "https://github.com/vz-risk/0001AA7F-C601-424A-B2B8-BE6C9F5164E7.json",
          "hashes": {
            "SHA-256": "6db12788c37247f2316052e142f42f4b259d6561751e5f401a1ae2a6df9c674b"
          },
          "external_id": "0001AA7F-C601-424A-B2B8-BE6C9F5164E7"
        }
      ],
      "object_marking_refs": [
        "marking-definition--089a6ecb-cc15-43cc-9494-767639779123"
      ],
      "granular_markings": [
        {
          "lang": "en",
          "marking_ref": "marking-definition--089a6ecb-cc15-43cc-9494-767639779123",
          "selectors": [
            "description",
            "labels"
          ]
        }
      ],
      "extensions": {
        "property1": {
          "type": "indicator",
          "spec_version": "2.1",
          "id": "acme:indicator-bf8bc5d5-c7e6-46b0-8d22-7500fea77196",
          "created": "2023-03-21T12:00:00.000Z",
          "modified": "2023-03-21T12:00:00.000Z",
          "created_by_ref": "identity--f431f809-377b-45e0-aa1c-6a4751cae5ff",
          "revoked": true,
          "labels": [
            "heartbleed",
            "has-logo"
          ],
          "external_references": [
            {
              "source_name": "system",
              "description": "string",
              "url": "https://github.com/vz-risk/0001AA7F-C601-424A-B2B8-BE6C9F5164E7.json",
              "hashes": {
                "SHA-256": "6db12788c37247f2316052e142f42f4b259d6561751e5f401a1ae2a6df9c674b"
              },
              "external_id": "0001AA7F-C601-424A-B2B8-BE6C9F5164E7"
            }
          ],
          "object_marking_refs": [
            "marking-definition--089a6ecb-cc15-43cc-9494-767639779123"
          ],
          "granular_markings": [
            {
              "lang": "en",
              "marking_ref": "marking-definition--089a6ecb-cc15-43cc-9494-767639779123",
              "selectors": [
                "description",
                "labels"
              ]
            }
          ],
          "name": "string",
          "description": "string",
          "schema": "https://www.example.com/schema-my-favorite-sdo-1/v1",
          "version": "string",
          "extension_types": [
            "new-sdo"
          ],
          "extension_properties": [
            "string"
          ]
        },
        "property2": {
          "type": "indicator",
          "spec_version": "2.1",
          "id": "acme:indicator-bf8bc5d5-c7e6-46b0-8d22-7500fea77196",
          "created": "2023-03-21T12:00:00.000Z",
          "modified": "2023-03-21T12:00:00.000Z",
          "created_by_ref": "identity--f431f809-377b-45e0-aa1c-6a4751cae5ff",
          "revoked": true,
          "labels": [
            "heartbleed",
            "has-logo"
          ],
          "external_references": [
            {
              "source_name": "system",
              "description": "string",
              "url": "https://github.com/vz-risk/0001AA7F-C601-424A-B2B8-BE6C9F5164E7.json",
              "hashes": {
                "SHA-256": "6db12788c37247f2316052e142f42f4b259d6561751e5f401a1ae2a6df9c674b"
              },
              "external_id": "0001AA7F-C601-424A-B2B8-BE6C9F5164E7"
            }
          ],
          "object_marking_refs": [
            "marking-definition--089a6ecb-cc15-43cc-9494-767639779123"
          ],
          "granular_markings": [
            {
              "lang": "en",
              "marking_ref": "marking-definition--089a6ecb-cc15-43cc-9494-767639779123",
              "selectors": [
                "description",
                "labels"
              ]
            }
          ],
          "name": "string",
          "description": "string",
          "schema": "https://www.example.com/schema-my-favorite-sdo-1/v1",
          "version": "string",
          "extension_types": [
            "new-sdo"
          ],
          "extension_properties": [
            "string"
          ]
        }
      },
      "name": "string",
      "description": "string",
      "indicator_types": [
        "malicious-activity"
      ],
      "pattern": "[ipv4-addr:value = '1.2.3.4']",
      "pattern_type": "stix",
      "pattern_version": "string",
      "valid_from": "2023-03-21T12:00:00.000Z",
      "valid_until": "2023-03-21T12:00:00.000Z",
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

For information about the attributes to use, see ["Indicator" in the STIX 2.1 specification](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_muftrcpnf89v), and the [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators) in the [threatIntelIngest](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource. 

The following attributes are required:
       * **type** (string). The type of STIX object. For example, `indicator`. The value must be the name of one of the types of STIX objects defined in the STIX 2.1 specification. 
       * **spec_version** (string). The version of the STIX specification used to represent this object. The value of this property must be `2.1` for STIX objects defined according to the STIX 2.1 specification.
       * **id** (string). ID of the indicator. For example, `indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f`.
       * **created** (string [date-time]). The time at which the object was originally created. Timestamp in UTC in RFC3339 format. For example, `2016-05-01T06:13:14.000Z`.
       * **modified** (string [date-time]). When the object is modified. Timestamp in UTC in RFC3339 format. For example, `2023-05-01T06:13:14.000Z`. This property is only used by STIX Objects that support versioning and represents the time that this particular version of the object was last modified. 
       * **pattern** (string). The pattern of this indicator (as defined by [pattern in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_me3pzm77qfnf)). For example, `[ file:hashes.'SHA-256' = '4bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f877' ]`. 
       * **pattern_type** (string). The pattern language used in this indicator (as defined by [pattern_type in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_9lfdvxnyofxw)). Following are valid values:
          * `stix`. Specifies the [STIX](https://oasis-open.github.io/cti-documentation/stix/intro) pattern language.
          * `pcre`. Specifies the [PCRE](https://www.pcre.org/) language.
          * `sigma`. Specifies the [SIGMA](https://sigmahq.io/) language.
          * `snort`. Specifies the [SNORT](https://www.snort.org/) language.
          * `suricata`. Specifies the [SURICATA](https://suricata-ids.org/) language.
          * `yara`. Specifies the [YARA](https://virustotal.github.io/yara/) language.
       * **valid_from** (string [date-time]). Beginning time this indicator is valid. Timestamp in UTC in RFC3339 format. For example, `2023-03-21T12:00:00.000Z`.

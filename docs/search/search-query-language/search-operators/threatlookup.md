---
id: threatlookup
title: threatlookup Search Operator
sidebar_label: threatlookup
---

The `threatlookup` search operator allows you to search logs for matches in [threat intelligence indicators](/docs/platform-services/threat-intelligence-indicators/). Note that you can also use the [`threatIP`](/docs/search/search-query-language/search-operators/threatip/) search operator to search CrowdStrike's threat intelligence data based on IP addresses. 

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

You can run the `threatlookup` search operator with the [cat search operator](/docs/search/search-query-language/search-operators/cat/) by using the `sumo://threat-intel` path. This lets you search the entire store of threat intelligence indicators, or just a portion. For example:
```
cat sumo://threat-intel  | where _threatlookup.indicator = "192.0.2.0"
```
```
cat sumo://threat-intel  | where _threatlookup.source = "FreeTAXII" and _threatlookup.indicator = "192.0.2.0"
```

In the cat output, timestamp fields (like `valid_until`) will appear as integers. You can use the `formatDate()` function to convert them back to timestamps. For example:

```
cat sumo://threat-intel | formatDate(toLong(_threatlookup.valid_until), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", "UTC") as valid_until
```

:::note
You cannot use the cat search operator with the `s_crowdstrike` source.
:::

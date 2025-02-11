---
id: threatlookup
title: threatlookup Search Operator
sidebar_label: threatlookup
---

The `threatlookup` search operator allows you to search logs for matches in [threat intelligence indicators](/docs/security/threat-intelligence/threat-intelligence-indicators/), providing security analytics to help you to detect threats in your environment. 

:::note
You can also use the [`threatip`](/docs/search/search-query-language/search-operators/threatip/) search operator to search CrowdStrike's threat intelligence data based on IP addresses. 
:::

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
| threatlookup source="s_CrowdStrike" dstDevice_ip, srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```
```
_index=sec_record*
| threatlookup source="s_CrowdStrike" include="active" dstDevice_ip, srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```
### Format timestamp results

Timestamps for the following response fields return results as an integer because they use Unix time (also known as *epoch time*):
* `_threatlookup.imported`
* `_threatlookup.valid_from`
* `_threatlookup.valid_until`
* `_threatlookup.updated`
 
To convert the timestamp results to a readable output, you must format it in the search itself with [`formatDate`](/docs/search/search-query-language/search-operators/formatdate). For example:

```
_index=sec_record*
| threatlookup source="mysource" device_ip
| formatDate(_threatlookup.valid_until, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") as valid_until
```

<!-- For threat intel. Add this back once we have support for the cat search operator:

#### Run threatlookup with the cat search operator

You can run the `threatlookup` search operator with the [`cat` search operator](/docs/search/search-query-language/search-operators/cat/) by using the `sumo://threat-intel` path. This lets you search the entire store of threat intelligence indicators, or just a portion. For example:
```
cat sumo://threat-intel  | where _threatlookup.indicator = "192.0.2.0"
```
```
cat sumo://threat-intel  | where _threatlookup.source = "TAXII2Source" and _threatlookup.indicator = "192.0.2.0"
```

In the `cat` output, timestamp fields (like `valid_until`) will appear as integers. You can use the `formatDate()` function to convert them back to timestamps. For example:

```
cat sumo://threat-intel | formatDate(toLong(_threatlookup.valid_until), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", "UTC") as valid_until
```

:::note
You cannot use the cat search operator with the `s_CrowdStrike` source.
:::
-->
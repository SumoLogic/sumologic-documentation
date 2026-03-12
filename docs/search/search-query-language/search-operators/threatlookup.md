---
id: threatlookup
title: threatlookup Search Operator
sidebar_label: threatlookup
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

The `threatlookup` operator identifies suspicious indicators of compromise in your data which match your [threat intelligence](/docs/security/threat-intelligence/about-threat-intelligence/) sources. Using this operator provides security analytics to help you to detect threats in your environment.

This operator supersedes the more limited [`threatip`](/docs/search/search-query-language/search-operators/threatip/) search operator, allowing matches against multiple sources for multiple kinds of indicators.

## Syntax

```
threatlookup [singleIndicator] [source="<source_value>"] <indicator>
```

Where:
* `singleIndicator` returns the single best matching threat intelligence entry. (In the response, `num_matches` indicates how many total matches across your sources there are.) If `singleIndicator` is not specified, all matching entries from your intelligence sources are returned in separate rows. 

   Note that `singleIndicator` returns the most recent, highest confidence entry from your sources. If there's a tie, the winning entry is whichever the backend storage returned first.
* `source` is the [threat intelligence source](/docs/security/threat-intelligence/about-threat-intelligence/#threat-intelligence-sources) to search for the threat intelligence indicator. If `source` is not specified, all sources are searched.
* `<indicator>` is the [field name](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/schema/full_schema.md) containing an [indicator](/docs/security/threat-intelligence/upload-formats/#normalized-json-format) to look up. At least one field name is required. 

### Response fields

Query responses return the following [normalized indicator](/docs/security/threat-intelligence/upload-formats/#normalized-json-format) fields, which will all be null if no matching record is found:
* `actors`
* `confidence`
* `fields`
* `id`
* `imported`
* `indicator`
* `kill_chain`
* `num_matches` (if `singleIndicator` is used)
* `source`
* `threat_type`
* `type`
* `updated`
* `valid_from`
* `valid_until`

## Examples

```sql title="Single best match for srcDevice_ip with confidence greater than 50"
_index=sec_record*
| threatlookup singleIndicator srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```

```sql title="Matches in a 'mysource' custom source for srcDevice_ip with confidence greater than 50"
_index=sec_record*
| threatlookup source="mysource" srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```

<!-- Per DOCS-643, add this after sumo://threat/cs is replaced by threatlookup":
## Threatlookup queries in dashboards
The `threatlookup` search operator is used for queries in some dashboards, including dashboards in the [Threat Intel Quick Analysis app](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/). These queries provide great examples of how to use the operator.
To see `threatlookup` used in a query:
1. Open the Threat Intel Quick Analysis app.
1. Navigate to a dashboard, such as **Overview**.
1. Click the three-dot kebab in the upper-right corner of the dashboard panel.
1. Select **Open in Log Search**. 
1. Look for `threatlookup` used in the query. 
For example, here is the query used for the **Threat Count** panel in the **Threat Intel Quick Analysis - IP** dashboard:
```
_sourceCategory=<source-category-name> 
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})" 
| where ip_address != "0.0.0.0" and ip_address != "127.0.0.1"
| count as ip_count by ip_address
| threatlookup singleIndicator ip_address
// normalize confidence level to a string 
| if (_threatlookup.confidence >= 85, "high", if (_threatlookup.confidence >= 50, "medium", if (_threatlookup.confidence >= 15, "low", if (_threatlookup.confidence >= 0, "unverified", "unknown")))) as threat_confidence
// filter for threat confidence
| where  threat_confidence matches "*"
//rename to match threat_<foo> convention
| %"_threatlookup.actors" as threat_actors
| %"_threatlookup.type" as type
| %"_threatlookup.threat_type" as threat_type
//convert threat valid from to human readable time
| toLong(%"_threatlookup.valid_from" * 1000) as %"_threatlookup.valid_from"
| formatDate(%"_threatlookup.valid_from", "MM-dd-yyyy") as threat_valid_from
| where type matches "ipv4-addr*" and !isNull(threat_confidence)
| if (isEmpty(threat_actors), "Unassigned", threat_actors) as threat_actors
|sum (ip_count) as threat_count
```
-->

## Format timestamp results

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

<!-- Per DOCS-35, add this back once we have support for the cat search operator:
## Run threatlookup with the cat search operator
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
You cannot use the cat search operator with the `SumoLogic_ThreatIntel` source.
:::
-->

<!-- Remove the following "Upcoming change" section at GA. -->

## Returned results

The `threatlookup` operator returns one result row for each input indicator, even if there is no threat intel match. In such cases, the normalized threatlookup fields (for example, `_threatlookup.source`, `_threatlookup.confidence`, etc.) will be `null`.

For example, let's say you have this log message:
<br/>`198.51.100.7 - - [02/Dec/2025:08:40:01 +0000] "GET /admin/login.php HTTP/1.1" 404 250 "-" "Mozilla/5.0"`

When you run this query:
```
| parse regex "(?<client_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| threatlookup singleIndicator client_ip
```

One result row would be returned, containing `_threatlookup.*` fields as null if `198.51.100.7` is not in your threat intel sources. Otherwise, `threatlookup` fields would get enriched accordingly.

### Exclude rows without threat intel matches

If you want to exclude rows without threat intel matches, add an explicit non-match filtering check, for example:

```
_index=sec_record*
| threatlookup singleIndicator srcDevice_ip
| where _threatlookup.confidence > 50
| where !isNull(_threatlookup.source)
| timeslice 1h
| count by _timeslice
```





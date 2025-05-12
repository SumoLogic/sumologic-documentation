---
id: threatlookup
title: threatlookup Search Operator
sidebar_label: threatlookup
---

The `threatlookup` search operator allows you to search logs for matches in [threat intelligence](/docs/security/threat-intelligence/about-threat-intelligence/), providing security analytics to help you to detect threats in your environment.

:::note
You can also use the [`threatip`](/docs/search/search-query-language/search-operators/threatip/) search operator to search threat intelligence data based on IP addresses. 
:::

## Syntax

```
threatlookup [singleIndicator] [source="<source_value>"] [include="<all|active|expired>"] <indicator> [,<optional_indicator>, …]
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
* `<indicator>` is the [indicator](/docs/security/threat-intelligence/upload-formats/#normalized-json-format) to look up for a [field name](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/schema/full_schema.md). At least one field name is required. `<optional_indicator>` is used to add more indicators to look up. Allowed in the filtering are parentheses `()`; `OR` and `AND` boolean operators; and comparison operators `=`, `<`, `>`, `=<`, `=>`, `!=`. <br/>You can filter on the following indicator attributes:
   * `actors`
   * `confidence`
   * `id`
   * `indicator`
   * `killChain`
   * `source`
   * `threatType`
   * `type`
   * `validFrom`
   * `validUntil`

### Response fields

Query responses return the following fields:
* `confidence`
* `fields`
* `imported`
* `indicator`
* `valid_from`
* `valid_until`
* `source`
* `threat_type`
* `type`
* `updated`
* `num_match` (if `singleIndicator` is used)

## Examples

### Simple examples

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
| threatlookup source="mysource" srcDevice_ip
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
| threatlookup source="mysource" dstDevice_ip, srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```
```
_index=sec_record*
| threatlookup source="mysource" include="active" dstDevice_ip, srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```

### Complex examples

```sql title="Client IP threat info"
_sourceCategory=AWS/WAF {{client_ip}}
| parse "\"httpMethod\":\"*\"," as httpMethod,"\"httpVersion\":\"*\"," as httpVersion,"\"uri\":\"*\"," as uri, "{\"clientIp\":\"*\",\"country\":\"*\"" as clientIp,country, "\"action\":\"*\"" as action, "\"matchingNonTerminatingRules\":[*]" as matchingNonTerminatingRules, "\"rateBasedRuleList\":[*]" as rateBasedRuleList, "\"ruleGroupList\":[*]" as ruleGroupList, "\"httpSourceId\":\"*\"" as httpSourceId, "\"httpSourceName\":\"*\"" as httpSourceName, "\"terminatingRuleType\":\"*\"" as terminatingRuleType, "\"terminatingRuleId\":\"*\"" as terminatingRuleId, "\"webaclId\":\"*\"" as webaclId nodrop
| threatlookup singleIndicator clientip
| where (_threatlookup.type="ipv4-addr" or _threatlookup.type="ipv6-addr") and !isNull(_threatlookup.confidence)
```

```sql title="All IP threat count"
_sourceCategory=Labs/AWS/DynamoDB account=* namespace=* "\"eventSource\":\"dynamodb.amazonaws.com\""
| json "eventName", "awsRegion", "requestParameters.tableName", "sourceIPAddress", "userIdentity.userName" as event_name, Region, entity, ip_address, user
| where Region matches "*" and tolowercase(entity) matches "*"
| where ip_address != "0.0.0.0" and ip_address != "127.0.0.1"
| count as ip_count by ip_address
| threatlookup singleIndicator ip_address
| where (_threatlookup.type="ipv4-addr" or _threatlookup.type="ipv6-addr") and !isNull(_threatlookup.confidence)
| if (isEmpty(_threatlookup.actors), "Unassigned", _threatlookup.actors) as Actor
| sum (ip_count) as threat_count
```

```sql title="Use threatlookup in a subquery"
_sourceCategory=weblogs
[subquery:_sourceCategory="Labs/SecDemo/guardduty" "EC2 Instance" "communicating on an unusual server port 22"
| json field=_raw "service.action.networkConnectionAction.remoteIpDetails" as remoteIpDetails
| json field=_raw "service.action.networkConnectionAction.connectionDirection" as connectionDirection
| where connectionDirection = "OUTBOUND"
| json field=remoteipdetails "ipAddressV4" as src_ip
| threatlookup singleIndicator threat| if (_threatlookup.confidence >= 85, "high", if (_threatlookup.confidence >= 50, "medium", if (_threatlookup.confidence >= 15, "low", if (_threatlookup.confidence >= 0, "unverified", "Unknown")))) as malicious_confidence
| where malicious_confidence = "high"
| compose src_ip]
```

<!-- Per DOCS-643, add this after sumo://threat/cs is replaced by threatlookup":
### Threatlookup queries in dashboards
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

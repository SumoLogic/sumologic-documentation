---
id: threatip
title: threatip Search Operator
sidebar_label: threatip
---

The `threatip` operator correlates data in the `_sumo_global_feed_cs` [threat intelligence](/docs/security/threat-intelligence/about-threat-intelligence/) source based on IP addresses from your log data. This provides security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks. 

<!-- 
You can also use the [`threatlookup`](/docs/search/search-query-language/search-operators/threatlookup/) search operator to search threat intelligence indicators.
-->

The `threatip` operator uses the same lookup as the [Threat Intel Quick Analysis app](/docs/integrations/security-threat-detection/threat-intel-quick-analysis) but is simplified for only IP threat lookups. 

The only Indicators of Compromise (IOC)] supported is IP address.

## Syntax

```sql
threatip <ip_address_field>
```

#### Response Fields

* actor
* malicious_confidence
* raw_threat
* type

## Example

```
_sourceCategory=Labs/*
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| threatip ip_address
| where !(isNull(malicious_confidence))
```

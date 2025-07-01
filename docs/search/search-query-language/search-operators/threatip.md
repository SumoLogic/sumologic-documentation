---
id: threatip
title: threatip Search Operator
sidebar_label: threatip
---

The `threatip` operator looks for suspicious IP addresses in your log data. Using the operator provides security analytics that help you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks.

Behind the scenes, the `threatip` operator uses `sumo://threat/cs` in log search queries to correlate data in the `_sumo_global_feed_cs` [threat intelligence source](/docs/security/threat-intelligence/about-threat-intelligence/#sumo-logic-threat-intelligence-sources). The `threatip` operator uses the same lookup as the [Threat Intel Quick Analysis app](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/#threat-intel-optimization) but is simplified for only IP threat lookups. 

<!-- Add this per DOCS-815:
You can also use the [`threatlookup`](/docs/search/search-query-language/search-operators/threatlookup/) search operator to search threat intelligence indicators.
-->

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

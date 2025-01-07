---
id: threatip
title: threatip Search Operator
sidebar_label: threatip
---

The `threatip` operator correlates [CrowdStrike's](https://www.crowdstrike.com/sumologic) threat intelligence data based on IP addresses from your log data, providing security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks. Note that you can also use the [`threatlookup`](/docs/search/search-query-language/search-operators/threatlookup/) search operator to search threat intelligence indicators.

The `threatip` operator uses the same lookup as the [Threat Intel Quick Analysis App](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#viewing-threat-intel-quick-analysis-dashboards) but is simplified for only IP threat lookups. 

The only [Indicators of Compromise (IOC)](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#what-are-different-indicators-of-compromise-ioc-types-available) supported is IP address.

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

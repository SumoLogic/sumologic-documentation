---
id: threatip
title: threatip Search Operator
sidebar_label: threatip
---

The `threatip` operator correlates <a href="https://www.crowdstrike.com/sumologic">CrowdStrike's</a> threat intelligence data based on IP addresses from your log data, providing security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks.

The `threatip` operator uses the same lookup as the [Threat Intel Quick Analysis App](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#viewing-threat-intel-quick-analysis-dashboards) but is simplified for only IP threat lookups. For further details on how this lookup works and what to do with the results see [Threat Intel FAQs](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#Threat-Intel-FAQ).

The only [Indicators of Compromise (IOC)](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#Threat-Intel-FAQ) supported is IP address.

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

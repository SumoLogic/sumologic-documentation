---
id: threatip
---

# threatip

The **threatip** operator correlates [CrowdStrike's](https://www.crowdstrike.com/sumologic/) threat intelligence data based on IP addresses from your log data, providing security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks.

The **threatip** operator uses the same lookup as the [Threat Intel Quick Analysis App] (../../../07Sumo-Logic-Apps/security-threat-detection/threat-intel-quick-analysis#1Threat-Intel-Quick-Analysis-App-Dashboard.md) but is simplified for only IP threat lookups. For further details on how this lookup works and what to do with the results see [Threat Intel FAQs] (../../../07Sumo-Logic-Apps/security-threat-detection/threat-intel-quick-analysis#03_Threat-Intel-FAQ.md).

The only [Indicators of Compromise (IOC)] (../../../07Sumo-Logic-Apps/security-threat-detection/threat-intel-quick-analysis#03_Threat-Intel-FAQ.md) supported is IP address.

## Syntax

```sql
threatip <ip_address_field>
```

### Response Fields

* actor
* malicious_confidence
* raw_threat
* type

## Example

```sql
_sourceCategory=Labs/*
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})" 
| threatip ip_address
| where !(isNull(malicious_confidence))
```

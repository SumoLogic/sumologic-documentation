---
slug: /security/threat-intelligence/find-threats
title: Find Threats with Log Queries
sidebar_label: Find Threats 
description: Perform searches to find matches to data in threat intelligence indicators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can use the `threatlookup` search operator to find matches to indicators in the Sumo Logic [threat intelligence](/docs/security/threat-intelligence/) data store. 

For example, use the following query to find logs in all `sec_record*` indexes with a `srcDevice_ip` attribute correlated to a threat indicator with a high confidence level (greater than `50`): 

```
_index=sec_record*
| threatlookup srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```

For syntax and examples, see [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/). 

<!-- Add this back once we have support for the cat search operator.
You can also [run threatlookup with the cat search operator](/docs/search/search-query-language/search-operators/threatlookup/#run-threatlookup-with-the-cat-search-operator) to search the entire store of threat intelligence indicators.
-->

## Threatlookup queries in dashboards

The `threatlookup` search operator is used for queries in some dashboards, including [dashboards in the Threat Intel Quick Analysis app](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/#viewing-threat-intel-quick-analysis-dashboards). These queries provide great examples of how to use the operator.

To see `threatlookup` used in a query:
1. Open the Threat Intel Quick Analysis app.
1. Navigate to a dashboard, such as **Overview**.
1. Click the three-dot kebab in the upper-right corner of the dashboard panel.
1. Select **Open in Log Search**. 
1. Look for `threatlookup` used in a query. 

For example, here is the query used for the **Threat Count** panel in the [Threat Intel Quick Analysis - IP](#ip) dashboard:

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
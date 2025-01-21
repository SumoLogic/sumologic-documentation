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

<!-- Add this back once we have support for the cat search operator:
You can also [run threatlookup with the cat search operator](/docs/search/search-query-language/search-operators/threatlookup/#run-threatlookup-with-the-cat-search-operator) to search the entire store of threat intelligence indicators.
-->


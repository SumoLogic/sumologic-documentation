---
slug: /platform-services/threat-intelligence/find-threats
title: Find Threats with Log Queries
sidebar_label: Find Threats 
description: Perform searches to find matches to data in threat intelligence indicators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Once you [ingest threat intelligence indicators](/docs/platform-services/threat-intelligence/about-threat-intelligence/#ingest-threat-intelligence-indicators), you can perform searches to find matches to data in the indicators using the `threatlookup` search operator.

The `threatlookup` operator allows you to search logs for matches in threat intelligence indicators. For example, use the following query to find logs in all `sec_record*` indexes with a `srcDevice_ip` attribute correlated to a threat indicator with a high confidence level (greater than 50): 

 ```
_index=sec_record*
| threatlookup srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```

For more information, see [threatlookup search operator](/docs/search/search-query-language/search-operators/threatlookup/). 

<!-- Add this back once we have support for the cat search operator.
You can also [run threatlookup with the cat search operator](/docs/search/search-query-language/search-operators/threatlookup/#run-threatlookup-with-the-cat-search-operator) to search the entire store of threat intelligence indicators.
-->

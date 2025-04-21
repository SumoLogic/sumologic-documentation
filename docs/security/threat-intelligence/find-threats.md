---
slug: /security/threat-intelligence/find-threats
title: Find Threats with Log Queries
sidebar_label: Find Threats with Log Queries
description: Perform searches to find matches to data in threat intelligence indicators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Use a Sumo Logic source in a log search

The [Sumo Logic threat intelligence sources](/docs/security/threat-intelligence/about-threat-intelligence/#sumo-logic-threat-intelligence-sources) in the threat intelligence datastore contain threat indicators supplied by third party intel vendors and maintained by Sumo Logic: <br/><img src={useBaseUrl('img/security/global-feed-threat-intelligence-tab-example.png')} alt="Global feed in the Threat Intelligence tab" style={{border: '1px solid gray'}} width="800" />

Any Sumo Logic user can use the [`lookup`](/docs/search/search-query-language/search-operators/lookup/) search operator to point to a Sumo Logic threat intelligence source to search for potential threats:
* `SumoLogic_ThreatIntel`. Use `sumo://threat/i471` in log search queries.
* `_sumo_global_feed_cs`. Use `sumo://threat/cs` in log search queries. 

For example:

```
_sourceCategory=cylance "IP Address"
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| where !isNull(ip_address)
| where ip_address != "0.0.0.0" and ip_address != "127.0.0.1"
| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/i471 on threat=ip_address
```

For more information, see [Threat Intel optimization](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/#threat-intel-optimization) in the *Threat Intel Quick Analysis* article.

:::tip
All the dashboards in the [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis) app use threat intelligence sources to find threats. To see the queries, open a dashboard in the app, click the three-dot kebab in the upper-right corner of the dashboard panel, and select **Open in Log Search**. You can copy these queries and use them as templates for your own queries to find threats.
:::

## Use the threatip search operator

To find threats using IP addresses, use the `threatip` search operator. This operator correlates data in the [Sumo Logic threat intelligence sources](/docs/security/threat-intelligence/about-threat-intelligence/#sumo-logic-threat-intelligence-sources) based on IP addresses from your log data.

For more information, see [threatip Search Operator](/docs/search/search-query-language/search-operators/threatip/).

<!-- Add per DOCS-815:
## threatlookup operator

You can use the `threatlookup` search operator to find matches to indicators in any source in the Sumo Logic [threat intelligence](/docs/security/threat-intelligence/) datastore. 

For example, use the following query to find logs in all `sec_record*` indexes with a `srcDevice_ip` attribute correlated to a threat indicator with a high confidence level (greater than `50`): 

```
_index=sec_record*
| threatlookup srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```

For syntax and examples, see [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/).
-->

<!-- Add this back once we have support for the cat search operator:
You can also [run threatlookup with the cat search operator](/docs/search/search-query-language/search-operators/threatlookup/#run-threatlookup-with-the-cat-search-operator) to search the entire store of threat intelligence indicators.
-->
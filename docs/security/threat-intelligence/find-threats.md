---
slug: /security/threat-intelligence/find-threats
title: Find Threats with Log Queries
sidebar_label: Find Threats with Log Queries
description: Learn how to detect and investigate security threats using Sumo Logic threat intelligence tools and dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Use the threatlookup search operator

To search threat intelligence indicators in your log data, use the [`threatlookup`](/docs/search/search-query-language/search-operators/threatlookup/) search operator. It matches field values in your logs against indicators in your [threat intelligence sources](/docs/security/threat-intelligence/about-threat-intelligence/#threat-intelligence-sources), including Sumo Logic-managed sources and custom sources you've added.

Compared to `lookup` and `threatip`, `threatlookup`:
* Searches all of your threat intelligence sources, or a single source you specify with `source="<source_name>"`.
* Matches multiple kinds of indicators, not only IP addresses.
* Returns normalized indicator fields, such as `_threatlookup.confidence`, `_threatlookup.threat_type`, and `_threatlookup.source`.

For example, this query returns the single best match for each `srcDevice_ip` value and keeps only high-confidence matches:

```sumo
_index=sec_record*
| threatlookup singleIndicator srcDevice_ip
| where _threatlookup.confidence > 50
| where !isNull(_threatlookup.source)
| timeslice 1h
| count by _timeslice
```

To search a specific source, such as a custom source named `mysource`:

```sumo
_index=sec_record*
| threatlookup source="mysource" srcDevice_ip
| where _threatlookup.confidence > 50
```

For syntax, response fields, and more examples, see [threatlookup Search Operator](/docs/search/search-query-language/search-operators/threatlookup/).

:::tip
`threatlookup` supersedes the `threatip` operator. For new queries, use `threatlookup`.
:::

## Use the lookup search operator

The [Sumo Logic threat intelligence sources](/docs/security/threat-intelligence/about-threat-intelligence/#sumo-logic-threat-intelligence-sources) in the threat intelligence datastore contain threat indicators supplied by third-party intel vendors and maintained by Sumo Logic: <br/><img src={useBaseUrl('img/security/threat-intelligence-tab-example.png')} alt="Threat Intelligence" style={{border: '1px solid gray'}} width="800" />

Any Sumo Logic user can use the [`lookup`](/docs/search/search-query-language/search-operators/lookup/) search operator to point to a Sumo Logic threat intelligence source to search for potential threats:
* `SumoLogic_ThreatIntel`. Use `sumo://threat/i471` in log search queries.
* `_sumo_global_feed_cs`. Use `sumo://threat/cs` in log search queries. 

For example:

```sumo
_sourceCategory=cylance "IP Address"
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| where !isNull(ip_address)
| where ip_address != "0.0.0.0" and ip_address != "127.0.0.1"
| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/i471 on threat=ip_address
```

For more information, see [Threat Intel optimization](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/#threat-intel-optimization) in the *Threat Intel Quick Analysis* article.

:::note
You can only use the `lookup` operator to search using the [Sumo Logic threat intelligence sources](/docs/security/threat-intelligence/about-threat-intelligence/#sumo-logic-threat-intelligence-sources). To search other threat intelligence sources in your datastore, use the [`threatlookup`](#use-the-threatlookup-search-operator) operator.
:::

:::tip
All the dashboards in the [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis) app use the Sumo Logic threat intelligence sources to find threats. To see the queries, open a dashboard in the app, click the three-dot kebab in the upper-right corner of the dashboard panel, and select **Open in Log Search**. You can copy these queries and use them as templates for your own queries to find threats.
:::

## Use the threatip search operator

To find threats using IP addresses, use the `threatip` search operator. This operator [uses `sumo://threat/cs` in log search queries](#use-the-lookup-search-operator) to correlate data in the `_sumo_global_feed_cs` threat intelligence source.

The `threatip` operator is limited to IP addresses and the CrowdStrike source. To search multiple sources and indicator types, use the [`threatlookup`](#use-the-threatlookup-search-operator) operator instead.

For more information, see [threatip Search Operator](/docs/search/search-query-language/search-operators/threatip/).

<!-- Add per DOCS-815:

## threatlookup operator

You can use the `threatlookup` search operator to find matches to indicators in any source in the Sumo Logic [threat intelligence](/docs/security/threat-intelligence/) datastore. 

For example, use the following query to find logs in all `sec_record*` indexes with a `srcDevice_ip` attribute correlated to a threat indicator with a high confidence level (greater than `50`): 

```sumo
_index=sec_record*
| threatlookup srcDevice_ip
| where _threatlookup.confidence > 50
| timeslice 1h
| count by _timeslice
```

For syntax and examples, see [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/).

-->

<!-- Per DOCS-35, add this back once we have support for the cat search operator:
You can also [run threatlookup with the cat search operator](/docs/search/search-query-language/search-operators/threatlookup/#run-threatlookup-with-the-cat-search-operator) to search the entire store of threat intelligence indicators.
-->

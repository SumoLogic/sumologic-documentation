---
slug: /security/threat-intelligence/sumologic-threat-intel-source
title: Sumo Logic Threat Intel Source
sidebar_label: Sumo Logic Threat Intel Source
description: Learn about Sumo Logic's threat intelligence feed of indicators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In partnership with [Intel 471](https://www.intel471.com/), Sumo Logic maintains the **SumoLogic_ThreatIntel** [threat intelligence source](/docs/security/threat-intelligence/about-threat-intelligence/#threat-intelligence-sources), an updated threat intelligence database that can be correlated with log data through queries. The Sumo Logic / Intel 471 integration has two parts:
* Sumo Logic maintains an up-to-date copy of Intel 471's threat database.
* Sumo Logic customers can use the Intel 471 database in threat analysis queries over their logs (through a [`lookup` operator](/docs/search/search-query-language/search-operators/lookup/)). For example, you can point to the **SumoLogic_ThreatIntel** source in queries by [using the lookup search operator](/docs/security/threat-intelligence/find-threats/#use-the-lookup-search-operator). The query scans Sumo Logic logs and parses fields (such as for domain, email, and IP address) for comparison against the threat feed from Intel 471. Think of it as an Inner Join between parsed fields and the threat table.

## Indicators of compromise (IoC)

The following [indicators of compromise](https://en.wikipedia.org/wiki/Indicator_of_compromise) types are available from Intel 471:
* Domain
* Email
* IPv4
* MD5
* SHA1
* SHA256
* SSDEEP
* URL

### Samples for different IoC types

| IoC type | IoC |
|:--|:--|
| Domain | `9jdco01e.ru`|
| Email | `sherigerber@mail.ru`|
| IPv4 | `192.0.2.0` |
| MD5 | `5d41402abc4b2a76b9719d911017c592` |
| SHA1 | `aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d` |
| SHA256 | `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`|
| SSDEEP | `3:aRn:aRn` |
| URL | `http://tycahatit.ru/zapoy/gate.php`|

### Expiration of IoCs and threats

IoCs and threats will often remain in the system because an IoC, such as an IP address, could go dormant and they reappear as part of another threat. Be aware that over the period, their malicious confidence can be downgraded or upgraded depending upon recent activity.

## FAQs

### How often do you refresh the threat feed from Intel 471?

The database is updated once per day. We have implemented a multi-layer cache for performance enhancements rather than returning to the master database on each query.

### Can I export all of the threats from Sumo Logic?

No, we do not allow an export of the threat Intel feeds as that is confidential to Intel 471. However, we will match lookups from your logs against the entire threat database. You will ONLY see data returned when you have a match against the database to a specific threat from your log data (for example, IP, domain, email, etc.) via the lookup operator.

### Is threat lookup real-time using Continuous Queries (CQs)?

Yes. You can scan for malicious indicators of compromise (IoCs) in real time [using the lookup search operator](/docs/security/threat-intelligence/find-threats/#use-the-lookup-search-operator).

### Can I historically search my logs for threats?

Yes, you can search any log data that is still retained and searchable using the Sumo Logic platform. However, we suggest that you break up historical searches into smaller and more manageable chunks based on time range and/or source category for performance reasons.

### If I do not see any results in any dashboard, is that a bad thing?

No. No results in your dashboards can mean that nothing has been identified by Intel 471 as a threat, verified or unverified.

It could be a case-sensitivity issue. In Sumo Logic, the equal sign (`=`) and the not equal to sign (`!=`) conditions are case-sensitive. When you use them with Sumo Logic operators you may need to convert the string to which the condition is applied to upper or lower case. For more information, see [Using toLowerCase or toUpperCase with an equating condition](/docs/search/search-query-language/search-operators/tolowercase-touppercase/#using-tolowercaseor-touppercase-with-an-equating-condition).

### I found an IoC in VirusTotal (or any other third-party threat feed), but why can’t I find that IoC in Intel 471 using the Sumo Logic lookup?

Intel 471 focuses on quality versus quantity when it comes to threat assessment. They have a dedicated intel team that does that work. A threat from a third-party feed may not be present in Intel 471 threats because it has been rejected by the Intel 471 intel assessment team.

### I found threats in my network, now what do I do? How do I get more context about threats?

The next step would be to look at the raw JSON field from the query. Fields such as `ip_address_types`, `labels`, `relations`, and `malware_families` in the JSON object provide more contextual information about threats. For information about the fields, see [Normalized JSON format](/docs/security/threat-intelligence/upload-formats/#normalized-json-format).

Following is an example of the raw JSON field from a query:

```
{
"indicator": "104.198.196.36",
 "type": "ip_address",
 "last_updated": 1476946769,
 "published_date": 1476946767,
 "malicious_confidence": "unverified",
 "reports": [],
 "actors": [],
 "malware_families": [ ],
 "kill_chains": [],
 "domain_types": [],
 "ip_address_types": [
   "SSHScanner"
 ],
 "relations": [],
 "labels": [
   {
     "name": "ThreatType/Suspicious",
     "created_on": 1476946768,
     "last_valid_on": 1476946768
   },
   {
     "name": "IPAddressType/SSHScanner",
     "created_on": 1476946768,
     "last_valid_on": 1476946768
   }
 ]
}
```

With the malware family and other information, you can search the internet for more as there is often data readily available on known threats.
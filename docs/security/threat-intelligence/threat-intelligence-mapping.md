---
id: threat-intelligence-mapping
title: Threat Intelligence Mapping
sidebar_label: Mapping
description: Learn about the mapping of threat intelligence schema from vendor sources to Sumo Logic schema.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Schema from vendor-supplied threat intelligence indicators are mapped to [normalized values](/docs/security/threat-intelligence/upload-formats/#normalized-json-format) in the Sumo Logic threat intelligence datastore to provide ease of interoperability. The mapping is described in this article. 

## CrowdStrike

You can ingest threat indicators from CrowdStrike using the [CrowdStrike Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-threat-intel-source). In addition, Sumo Logic provides an out-of-the-box [`_sumo_global_feed_cs` source](/docs/security/threat-intelligence/sumologic-global-feed-from-crowdstrike/) whose indicators are supplied by CrowdStrike. The same normalization applies to schema in both sources.

Following are the normalized values for CrowdStrike:

| CrowdStrike schema | Normalized schema in the datastore | Notes |
|:--|:--|:--|
| `actor` | `actors` | Array joined with a comma: ", " |
| `id` | `id` | Array joined with a comma: ", " |
| `indicator` | `indicator` | |
| `kill_chain_phases` | `killChain` | |
| `labels.ThreatType` | `threatType`* | The `threatType` value can vary based on matches*. |
| `last_updated` | `updated` | |
| `malicious_confidence` | `confidence` | Normalized to a 0-100 scale. |
| `published_date` | `validFrom` and `imported` | |
| `type` | `type` | See [Type mapping for CrowdStrike](/docs/security/threat-intelligence/threat-intelligence-mapping/#type-mapping-for-crowdstrike) below. |

All other fields will be kept in the `fields{}` object.

*The value `malicious-activity` is used for the `threatType` if the regex matches: `name=threattype\/(clickfraud|commodity|pointofsale|ransomware|targeted|targetedcrimeware)`. The value `anomalous-activity` is used if the regex matches `name=threattype\/`, and the value `unknown` is used if nothing matches.

### Type mapping for CrowdStrike 

The `type` object is mapped to the following normalized type values:

| Original type in CrowdStrike | Normalized type in the datastore |
|:--|:--|
| `binary_string` | `artifact:payload_bin` | 
| `bitcoin_address` | `url` | 
| `ip_address` | `ipv4-addr` / `ipv6-addr` |
| `domain` | `domain-name` | 
| `email_address` | `email-add` | 
| `file_path` | `file:name` | 
| `file_name` | `file:name` | 
| `hash_md5` | `file:hashes.'MD5'` | 
| `hash_sha1` | `file:hashes.'SHA-1'` | 
| `hash_sha256` | `file:hashes.'SHA-256'` | 
| `mutex_name` | `mutex:name` | 
| `service_name` | `process:name` | 
| `url` | `url` | 
| `username` | `user-account:user_id` | 
| `user_agent` | `http-request-ext:request_header.'User-Agent'` | 
| `x509_subject` | `x509-certificate:serial_number` | 

## Intel 471

You can ingest threat indicators from Intel 471 using the [Intel 471 Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/intel471-threat-intel-source/). In addition |  Sumo Logic provides an out-of-the-box `SumoLogic_ThreatIntel` source whose indicators are supplied by Intel 471. The same normalization applies to schema in both sources.

Following are the normalized values for Intel 471:

| Intel 471 schema | Normalized schema in the datastore | Notes |
|:--|:--|:--|
| `activity.last` | `validFrom` | Converted from epoch timestamp. |
| `data.expiration` | `validUntil` | Converted from epoch timestamp. |
| `data.mitre_tactics` | `killChain` | |
| `data.threat.uid` | `id` | |
| *Not applicable* | `threatType` | All indicators have `threatType` set to `unknown`. |

## Mandiant

You can ingest threat indicators from Mandiant using the [Mandiant Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/mandiant-threat-intel-source/).

Following are the normalized values for Mandiant:

| Mandiant schema | Normalized schema in the datastore | Notes |
|:--|:--|:--|
| `[]actors` | `actors` | The JSON structure of individual actors are joined with a " , " |
| `id` | `id` | |
| `threat_rating.confidence_score` | `confidence` | |
| `unknown` | `threatType` | |
| `value` | `indicator` | |

## ZeroFox

You can ingest threat indicators from ZeroFox using the [ZeroFox Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/zerofox-intel-source/).

Following are the normalized values for ZeroFox:

| ZeroFox endpoint | ZeroFox schema | Normalized schema in the datastore | Notes |
|:--|:--|:--|:--|
| /botnet endpoint with `ip_address` populated | `ipv4-addr--<ip_address>` | `id` | Templated |
| /botnet endpoint with `ip_address` populated | `ip_address` | `indicator` | |
| /botnet endpoint with `ip_address` populated |  | `type` | Statically set to `ip_address` |
| /botnet endpoint with `ip_address` populated |  | `threatType` | Statically set to `compromised` |
| /botnet endpoint with `ip_address` populated | `listed_at` | `validFrom` | |
| /botnet endpoint with `ip_address` populated |  | `confidence` | Statically set to `50`
| /botnet endpoint with `c2_ip_address` populated | `ipv4-addr--<c2_ip_address>` | `id` | Templated |
| /botnet endpoint with `c2_ip_address` populated | `c2_ip_address` | `indicator` | |
| /botnet endpoint with `c2_ip_address` populated |  | `type` | Statically set to `ip_address` |
| /botnet endpoint with `c2_ip_address` populated |  | `threatType` | Statically set to `compromised` |
| /botnet endpoint with `c2_ip_address` populated | `listed_at` | `validFrom` | |
| /botnet endpoint with `c2_ip_address` populated | `tags` | `confidence` | Default statically set to `75,  but set to 25 if `c2_domain_top_1m` found as a tag |
| /botnet endpoint with `c2_domain` populated | `ipv4-addr--<c2_domain>` | `id` | Templated |
| /botnet endpoint with `c2_domain` populated | `c2_domain` | `indicator` | |
| /botnet endpoint with `c2_domain` populated |  | `type` | Statically set to `domain-name` |
| /botnet endpoint with `c2_domain` populated |  | `threatType` | Statically set to `compromised` |
| /botnet endpoint with `c2_domain` populated | `listed_at` | `validFrom` |  |
| /botnet endpoint with `c2_domain` populated | `tags` | `confidence` | Default statically set to `75`, but set to `25` if `c2_domain_top_1m` found as a tag |
| /c2-domains endpoint with `domain` populated | `domain-name--<domain>` | `id` | Templated |
| /c2-domains endpoint with `domain` populated | `domain` | `indicator` | |
| /c2-domains endpoint with `domain` populated |  | `type` | Statically set to `domain-name` |
| /c2-domains endpoint with `domain` populated |  | `threatType` | Statically set to `compromised` |
| /c2-domains endpoint with `domain` populated | `created_at` or `updated_at` | `validFrom` | Use the latest of the two |
| /c2-domains endpoint with `domain` populated | `tags` | `confidence` | Default statically set to `75`, but set to `25` if `c2_domain_top_1m` found as a tag |
| /c2-domains endpoint with each `Ip_addresses` populated | `ipv4-addr--<c2_ip_address>` or `ipv6-addr--<c2_ip_address>` | `id` | Templated. Depends if value is IPv4 or IPv6 |
| /c2-domains endpoint with each `Ip_addresses` populated | `[]Ip_addresses` | `indicator` | The specific value in the list |
| /c2-domains endpoint with each `Ip_addresses` populated |  | `type` | Statically set to `ipv4-addr` or `ipv6-addr` |
| /c2-domains endpoint with each `Ip_addresses` populated |  | `threatType` | Statically set to `compromised` |
| /c2-domains endpoint with each `Ip_addresses` populated | `created_at` or `updated_at` | `validFrom` | Use the latest of the two |
| /c2-domains endpoint with each `Ip_addresses` populated |  | `confidence` | Statically set to `50` |
| /disruption endpoint with `url` populated | `url--<url>` | `id` | Templated |
| /disruption endpoint with `url` populated | `url` | `indicator` | |
| /disruption endpoint with `url` populated |  | `type` | Statically set to `url` |
| /disruption endpoint with `url` populated |  | `threatType` | Statically set to `compromised` |
| /disruption endpoint with `url` populated | `created_at` or `updated_at` | `validFrom` | Use the latest of the two |
| /disruption endpoint with `url` populated |  | `confidence` | Statically set to `100` |
| /disruption endpoint with `ip` populated | `ipv4-addr--<ip>` | `id` | Templated |
| /disruption endpoint with `ip` populated | `ip` | `indicator` | |
| /disruption endpoint with `ip` populated |  | `type` | Statically set to `ipv4-addr` |
| /disruption endpoint with `ip` populated |  | `threatType` | Statically set to `compromised` |
| /disruption endpoint with `ip` populated | `created_at` or `updated_at` | `validFrom` | Use the latest of the two |
| /disruption endpoint with `ip` populated |  | `confidence` | Statically set to `50` |
| /malware endpoint with `md5` populated | `file:hashes.MD5--<md5>` | `id` | Templated |
| /malware endpoint with `md5` populated | `md5` | `indicator` |  |
| /malware endpoint with `md5` populated | `file:hashes.MD5` | `type` |  |
| /malware endpoint with `md5` populated |  | `threatType` | Statically set to `compromised` |
| /malware endpoint with `md5` populated | `created_at` | `validFrom` | |
| /malware endpoint with `md5` populated |  | `confidence` | Statically set to `75` |
| /malware endpoint with `sha1` populated | `file:hashes.'SHA-1'--<sha1>` | `id` | Templated |
| /malware endpoint with `sha1` populated | `sha1` | `indicator` | |
| /malware endpoint with `sha1` populated | `file:hashes.'SHA-1'` | `type` | |
| /malware endpoint with `sha1` populated |  | `threatType` | Statically set to `compromised` |
| /malware endpoint with `sha1` populated | `created_at` | `validFrom` | 
| /malware endpoint with `sha1` populated |  | `confidence` | Statically set to `75` |
| /malware endpoint with `sha256` populated | `file:hashes.'SHA-256'--<sha256>` | `id` | Templated |
| /malware endpoint with `sha256` populated | `sha256` | `indicator` | |
| /malware endpoint with `sha256` populated | `file:hashes.'SHA-256'` | `type` | |
| /malware endpoint with `sha256` populated |  | `threatType` | Statically set to `compromised` |
| /malware endpoint with `sha256` populated | `created_at` | `validFrom` | |
| /malware endpoint with `sha256` populated |  | `confidence` | Statically set to `75` |
| /malware endpoint with `sha512` populated | `file:hashes.'SHA-512'--<sha512>` | `id` | Templated |
| /malware endpoint with `sha512` populated | `sha512` | `indicator` | |
| /malware endpoint with `sha512` populated | `file:hashes.'SHA-512'` | `type` | |
| /malware endpoint with `sha512` populated |  | `threatType` | Statically set to `compromised` |
| /malware endpoint with `sha512` populated | `created_at` | `validFrom` | |
| /malware endpoint with `sha512` populated |  | `confidence` | Statically set to `75` |
| /phishing endpoint with `domain` populated |` domain-name--<domain>` | `id` | Templated |
| /phishing endpoint with `domain` populated | `domain` | `indicator` |  |
| /phishing endpoint with `domain` populated |  | `type` | Statically set to `domain-name` |
| /phishing endpoint with `domain` populated |  | `threatType` | Statically set to `compromised` |
| /phishing endpoint with `domain` populated | `scanned` | `validFrom` | |
| /phishing endpoint with `domain` populated |  | `confidence` | Statically set to `50` |
| /phishing endpoint with `url` populated |` url--<domain>` | `id` | Templated |
| /phishing endpoint with `url` populated | `url` | `indicator` | |
| /phishing endpoint with `url` populated |  | `type` | Statically set to `url` |
| /phishing endpoint with `url` populated |  | `threatType` | Statically set to `compromised` |
| /phishing endpoint with `url` populated | `scanned` | `validFrom` | |
| /phishing endpoint with `url` populated |  | `confidence` | Statically set to `50` |
| /ransomware endpoint with `md5` populated | `file:hashes.MD5--<md5>` | `id` | Templated |
| /ransomware endpoint with `md5` populated | `md5` | `indicator` | |
| /ransomware endpoint with `md5` populated | `file:hashes.MD5` | `type` | |
| /ransomware endpoint with `md5` populated |  | `threatType` | Statically set to `compromised` |
| /ransomware endpoint with `md5` populated | `created_at` | `validFrom` | |
| /ransomware endpoint with `md5` populated |  | `confidence` | Statically set to `75` |
| /ransomware endpoint with `sha1` populated | `file:hashes.'SHA-1'--<sha1>` | `id` | Templated |
| /ransomware endpoint with `sha1` populated | `sha1` | `indicator` | |
| /ransomware endpoint with `sha1` populated | `file:hashes.'SHA-1'` | `type` | |
| /ransomware endpoint with `sha1` populated |  | `threatType` | Statically set to `compromised` |
| /ransomware endpoint with `sha1` populated | `created_at` | `validFrom` | |
| /ransomware endpoint with `sha1` populated |  | `confidence` | Statically set to `75` |
| /ransomware endpoint with `sha256` populated | `file:hashes.'SHA-256'--<sha256>` | `id` | Templated |
| /ransomware endpoint with `sha256` populated | `sha256` | `indicator` |  |
| /ransomware endpoint with `sha256` populated | `file:hashes.'SHA-256'` | `type` | |
| /ransomware endpoint with `sha256` populated |  | `threatType` | Statically set to `compromised` |
| /ransomware endpoint with `sha256` populated | `created_at` | `validFrom` | |
| /ransomware endpoint with `sha256` populated |  | `confidence` | Statically set to `75` |
| /ransomware endpoint with `sha512` populated | `file:hashes.'SHA-512'--<sha512>` | `id` | Templated |
| /ransomware endpoint with `sha512` populated | `sha512` | `indicator` | |
| /ransomware endpoint with `sha512` populated | `file:hashes.'SHA-512'` | `type` | |
| /ransomware endpoint with `sha512` populated |  | `threatType` | Statically set to `compromised` |
| /ransomware endpoint with `sha512` populated | `created_at` | `validFrom` | |
| /ransomware endpoint with `sha512` populated |  | `confidence` | Statically set to `75` |

### Type mapping for ZeroFox

The `type` object is mapped to the following normalized type values:

| Original type | Normalized type in the datastore |
|:--|:--|
| `c2_domain` | `domain-name` |
| `c2_ip_address` | `ip_address` |
| `domain` | `domain-name` |
| `ip` | `ipv4-addr` |
| `ip_address` | `ip_address` |
| `Ip_addresses` | `ipv4-addr` or `ipv6-addr` |
| `url` | `url` |
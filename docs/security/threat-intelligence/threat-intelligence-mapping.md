---
id: threat-intelligence-mapping
title: Threat Intelligence Mapping
sidebar_label: Mapping
description: Learn about the mapping of threat intelligence schema from vendor sources to Sumo Logic schema.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Schema from vendor-supplied threat intelligence indicators are mapped to [normalized values](/docs/security/threat-intelligence/upload-formats/#normalized-json-format) in the Sumo Logic threat intelligence datastore to provide ease of interoperability. The mapping is described in this article. 

## CrowdStrike

You can ingest threat indicators from CrowdStrike using the [CrowdStrike Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-threat-intel-source). In addition, Sumo Logic provides an out-of-the-box `_sumo_global_feed_cs` source whose indicators are supplied by CrowdStrike. The same normalization applies to schema in both sources.

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
| `domain` |  `domain-name` | 
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

You can ingest threat indicators from Intel 471 using the [Intel 471 Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/intel471-threat-intel-source/). In addition, Sumo Logic provides an out-of-the-box `SumoLogic_ThreatIntel` source whose indicators are supplied by Intel 471. The same normalization applies to schema in both sources.

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
| `[]actors` | `actors` | The JSON structure of individual actors are joined with a ", " |
| `id` | `id` | |
| `threat_rating.confidence_score` | `confidence` | |
| `unknown` | `threatType` | |
| `value` | `indicator` | |

## ZeroFox

You can ingest threat indicators from ZeroFox using the [ZeroFox Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/zerofox-intel-source/).

Following are the normalized values for ZeroFox:

| ZeroFox schema | Normalized schema in the datastore | Notes |
|:--|:--|:--|
| `c2_domain` | `indicator` | |
| `c2_ip_address` | `indicator` | |
| `created_at` | `validFrom` | If `created_at` and `updated_at` appear on the same item, use the latest for the `validFrom` value. |
| `domain` | `indicator` | |
| `domain-name--{{domain}}` | `id` | |
| `file:hashes.'SHA-1'` | `type` | |
| `file:hashes.'SHA-1'--{{sha1}}` | `id` | |
| `file:hashes.'SHA-256'` | `type` | |
| `file:hashes.'SHA-256'--{{sha256}}` | `id` | |
| `file:hashes.'SHA-512'` | `type` | |
| `file:hashes.'SHA-512'--{{sha512}}` | `id` | |
| `file:hashes.MD5` | `type` | |
| `file:hashes.'MD5'--{{md5}}` | `id` | |
| `ip` | `indicator` | | |
| `ip_address` | `indicator` | |
| `ipv4-addr--{{c2_domain}}` | `id` | |
| `ipv4-addr--{{c2_ip_address}}` | `id` | |
| `ipv4-addr--{{ip_address}}`  | `id` | |
| `ipv6-addr--{{c2_ip_address}}` | `id` | |
| `listed_at` | `validFrom` | |
| `md5` | `indicator` | |
| `scanned` | `validFrom` | |
| `sha1` | `indicator` | |
| `sha256` | `indicator` | |
| `sha512` | `indicator` | |
| `tags` | `confidence` | Set by default to `75`, but set to `25` if `c2_domain_top_1m` found as a tag. |
| `updated_at` | `validFrom` | If `created_at` and `updated_at` appear on the same item, use the latest for the `validFrom` value. |
| `url` | `indicator` | |
| `url--{{url}}` | `id` | |
| *Not applicable*  | `threatType` | All indicators are set to `compromised`. |

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

### Confidence mapping for ZeroFox

The `confidence` field in the datastore has the following values for ZeroFox:

| ZeroFox item | Confidence score in datastore |
|:--|:--|
| `domain` | `50` |
| `ip` | `50` |
| `ip_address` | `50` |
| `ip_addresses` | `50` |
| `md5` | `75` |
| `sha1` | `75` |
| `sha256` | `75` |
| `sha512` | `75` |
| `url` | `50` for phishing events, and `100` for disruption events |
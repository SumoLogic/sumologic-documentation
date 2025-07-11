---
slug: /security/threat-intelligence/threat-intelligence-mapping
title: Threat Intelligence Mapping
sidebar_label: Mapping 
description: Learn about mapping of threat intelligence indicators to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## _sumo_global_feed_cs mapping

Sumo Logic provides an out-of-the-box a `_sumo_global_feed_cs` source of threat intelligence indicators supplied by CrowdStrike. You can see it in the [**Threat Intelligence** tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab). This source is a default source and cannot be changed or deleted. 

In the threat intelligence datastore, the schema is mapped to normalized values to provide ease of interoperability with the schema from other threat intelligence sources:

| Original schema | Normalized schema in the datastore |
|:--|:--|
| `actor` | `actors` |
| `id` | `id` |
| `indicator` | `indicator` |
| `kill_chain_phases` | `killChain` |
| `labels.ThreatType` | `threatType` |
| `last_updated` | `updated` |
| `malicious_confidence` | `confidence` (normalized to the 0-100 scale) |
| `published_date` | `validFrom` and `imported` |
| `type` | `type` |

(All other fields will be kept in the `fields{}` object.)

### Type mapping for _sumo_global_feed_cs 

The `type` object is mapped to the following normalized type values:

| Original type | Normalized type in the datastore |
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


## CrowdStrike mapping

You can ingest threat indicators from CrowdStrike using the [CrowdStrike Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-threat-intel-source).

In the threat intelligence datastore, the CrowdStrike schema is mapped to normalized values to provide ease of interoperability with the schema from other threat intelligence sources:

| CrowdStrike schema | Normalized schema in the datastore | Notes |
|:--|:--|:--|
| `[]actors` | `actors` | Array joined with a ", " |
| `id` | `id` | Array joined with a ", " |
| `indicator` | `indicator` | |
| `[]kill_chains` | `killChain` | |
| `labels` | `threatType` | Value used can also be `malicious-activity`, `anomalous-activity`, or `unkown`.* |

*Value `malicious-activity` used if regex matches: `name=threattype\/(clickfraud|commodity|pointofsale|randomware|targeted|targetedcrimeware)` <br/>Value `anomalous-activity` used if regex matches: `name=threattype\/` <br/>Value `unknown` used if nothing matches.

## Intel471 mapping

You can ingest threat indicators from Intel471 using the [Intel471 Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/intel471-threat-intel-source/).

In the threat intelligence datastore, the Intel471 schema is mapped to normalized values to provide ease of interoperability with the schema from other threat intelligence sources:

| ThreatIntel 471 schema | Normalized schema in the datastore | Notes |
|:--|:--|:--|
| `activity.last` | `validFrom` | Converted from epoch timestamp. |
| `data.expiration` | `validUntil` | Converted from epoch timestamp. |
| `data.mitre_tactics` | `killChain` | |
| `data.threat.uid` | `id` | |
| | `threatType` | Statically set to `unknown`. |

## Mandiant mapping

You can ingest threat indicators from Mandiant using the [Mandiant Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/mandiant-threat-intel-source/).

In the threat intelligence datastore, the Mandiant schema is mapped to normalized values to provide ease of interoperability with the schema from other threat intelligence sources:

| Mandiant schema | Normalized schema in the datastore | Notes |
|:--|:--|:--|
| `[]actors` | `actors` | The JSON structure of individual actors are joined with a ", " |
| `id` | `id` | |
| `threat_rating.confidence_score` | `confidence` | |
| `unknown` | `threatType` | |
| `value` | `indicator` | |

## ZeroFox mapping

You can ingest threat indicators from ZeroFox using the [ZeroFox Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/zerofox-intel-source/).

In the threat intelligence datastore, the ZeroFox schema is mapped to normalized values to provide ease of interoperability with the schema from other threat intelligence sources:

| Mandiant schema | Normalized schema in the datastore | Notes |
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
| `tags` | `confidence` | Default statically set to `75`, but set to `25` if `c2_domain_top_1m` found as a tag. |
| `updated_at` | `validFrom` | If `created_at` and `updated_at` appear on the same item, use the latest for the `validFrom` value. |
| `url` | `indicator` | |
| `url--{{url}}` | `id` | |
| | `threatType` | Set to `compromised`. |

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



---
slug: /security/threat-intelligence/threat-intelligence-mapping
title: Threat Intelligence Mapping
sidebar_label: Mapping 
description: Learn about mapping of threat intelligence indicators to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Global feed mapping

Sumo Logic provides an out-of-the-box a `_sumo_global_feed` source of threat intelligence indicators supplied by Sumo Logic. You can see it in the [**Threat Intelligence** tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab). This source is a default source and cannot be changed or deleted. 

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

The `type` object is mapped to the following normalized type values:

| Type | Normalized type in the datastore |
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

<!-- 

### CrowdStrike mapping

You can ingest threat indicators from CrowdStrike using the [CrowdStrike Threat Intel Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-threat-intel-source.md)

In the threat intelligence datastore, the CrowdStrike schema is mapped to normalized values to provide ease of interoperability with the schema from other threat intelligence sources:

| CrowdStrike schema | Normalized schema in the datastore |
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

The CrowdStrike `type` object is mapped to the following normalized type values:

| CrowdStrike type | Normalized type in the datastore |
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
-->



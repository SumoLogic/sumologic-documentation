---
slug: /platform-services/threat-intelligence/crowdstrike-threat-intelligence
title: CrowdStrike Threat Intelligence
sidebar_label: CrowdStrike Threat Intelligence 
description: Learn about CrowdStrike threat intelligence indicators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


Sumo Logic provides a CrowdStrike threat intelligence indicator source out-of-the-box. You can see it in the [Threat Intelligence tab](/docs/platform-services/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab) as "CrowdStrike provided by Sumo Logic (s_CrowdStrike)". This source is a default source and cannot be changed or deleted. When performing searches against this source, use "s_CrowdStrike" as the source name.

## CrowdStrike mapping

In the "s_CrowdStrike" source, the CrowdStrike schema is mapped to normalized values to provide ease of interoperability with the schema from other threat intelligence sources:

| CrowdStrike schema | Normalized schema in "s_CrowdStrike" source |
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

| CrowdStrike type | Normalized type in "s_CrowdStrike" source |
|:--|:--|
| `binary_string` | `artifact:payload_bin` | 
| `bitcoin_address` | `url:value` | 
| `ip_address` | `ipv4-addr:value` / `ipv6-addr:value` |
| `domain` |  `domain-name:value` | 
| `email_address` | `email-add:value` | 
| `file_path` | `file:name` | 
| `file_name` | `file:name` | 
| `hash_md5` | `file:hashes.'MD5'` | 
| `hash_sha1` | `file:hashes.'SHA-1'` | 
| `hash_sha256` | `file:hashes.'SHA-256'` | 
| `mutex_name` | `mutex:name` | 
| `service_name` | `process:name` | 
| `url` | `url:value` | 
| `username` | `user-account:user_id` | 
| `user_agent` | `http-request-ext:request_header.'User-Agent'` | 
| `x509_subject` | `x509-certificate:serial_number` | 

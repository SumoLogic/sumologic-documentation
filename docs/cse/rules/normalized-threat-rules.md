---
id: normalized-threat-rules
title: Normalized Threat Rules
sidebar_label: Normalized Threat Rules
description: Cloud SIEM's built-in threat rules pass alerts from a security product to the signal generation process, and are normalized work across multiple security products.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about Cloud SIEM’s built-in normalized threat rules.

To get a CSV of normalized threat rules, see [Rules - Useful CSVs](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/README.md#useful-csvs) in the [Cloud SIEM Content Catalog](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/README.md). The CSV includes information about the log mappers that participate in normalized threat rules and the data sources the rules support.

## Normalized threat rules pass alerts to Cloud SIEM

The first key fact about normalized threat rules is this: they exist to process messages that describe a security event that has already
occurred. 

Some messages logged by a security product are the result of that product’s own detection functionality, for example, by using rule sets or signatures. Typically, such messages contain a severity, risk, or impact in the message, and can be accepted as a clear indication of nefarious activity. Essentially, a normalized threat rule passes an alert from a security product to the signal generation process.  

## Normalized threat rules support multiple log sources

The second important aspect of a normalized threat rule is that, as the name implies, it supports multiple log sources.   

For example, a normalized threat rule that looks for intrusions would work with multiple products that detect intrusions, such as:

* Palo Alto Threat Event
* Cisco Firepower IDS
* Symantec Endpoint Protection Exploit Prevention/HIPS
* IPS/IDS Appliances
* Microsoft Graph Security API

Ordinarily, rules define the log messages they’ll be applied to by specifying `metadata_vendor` and `metadata_product `in the rule expression. A normalized rule doesn’t specify these attributes. Instead, it looks at another attribute that is set during the log mapping process: `threat_ruleType`. In the log mapping process for a message type, the value of `threat_ruleType` is set  to a value that corresponds to a threat type, for example “intrusion”. Then, normalized threat rules can look for messages whose `threat_ruleType` field is “intrusion”, regardless of vendor or product. For the full list of values, see [Types of normalized threat rules](#types-of-normalized-threat-rules). For information about mapping requirements for messages that describe security events, see [Field Mapping for Security Event Sources](/docs/cse/schema/field-mapping-security-event-sources).


## Types of normalized threat rules 

There are multiple categories of normalized threat rules for different types of threats.

### intrusion

For messages that indicate an intrusion has taken place These messages typically include a signature for the exploit attempted. 

Log sources that issue intrusion-related messages include:

* Palo Alto Threat Event
* Cisco Firepower IDS
* Symantec Endpoint Protection Exploit Prevention/HIPS
* IPS/IDS Appliances

Cloud SIEM provides the following normalized intrusion rules:

* [Intrusion Scan - Targeted](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/THRESHOLD-S00514.md) - This rule looks for an intrusion product detecting an internal IP sending different exploits to another external IP in a short timeframe.
* [Intrusion Sweep](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/THRESHOLD-S00515.md) - This rule looks for an intrusion product detecting an internal IP sending the same exploit to multiple internal IPs in a short timeframe.
* [High Severity Intrusion Signature](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00666.md) - This rule looks for an intrusion product detecting a high severity intrusion signature sourcing from an internal IP.
* [Critical Severity Intrusion Signature](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00513.md) - This rule looks for an intrusion product detecting a critical severity intrusion signature sourcing from an internal IP.
* [Informational Severity Intrusion Signature](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00669.md) - This rule looks for an intrusion product detecting an informational severity intrusion signature sourcing from an internal IP.
* [Low Severity Intrusion Signature](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00668.md) - This rule looks for an intrusion product detecting a low severity intrusion signature sourcing from an internal IP. 
* [Medium Severity Intrusion Signature](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00667.md) - This rule looks for an intrusion product detecting a medium severity intrusion signature sourcing from an internal IP.

**Requirements for Intrusion Signature rules:**

The rules that detect intrusion signatures from internal IP addresses rely upon the [normalizedSeverity](/docs/cse/schema/schema-attributes) attribute in records being mapped as follows:

* critical = 10
* high = 9
* medium = 2
* low = 1
* information = 0

### malware

For messages for logs that indicate malware has been detected. These typically provide a signature for the type of malware.

Log sources that issue malware-related messages include:

* Antivirus Appliances
* Trend Micro Antivirus
* Symantec Endpoint Protection Scanning/Antivirus

Cloud SIEM provides the following normalized malware rules:

* [Malware Outbreak](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/THRESHOLD-S00517.md) - Same malware signature on multiple hosts in a short timeframe.
* [Persistent Malware Infection](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/THRESHOLD-S00520.md) - Single host with multiple malware infections with the same signature in a short timeframe.
* [Malware Not Cleaned](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00518.md) - Malware the antivirus fails to clean.
* [Malware Cleaned](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00519.md) - Malware the antivirus successfully cleans.
* [Antivirus Ransomware Detection](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00516.md) - Malware determined to be ransomware based on the signature/virus name.

### direct

For messages that indicate suspicious or malicious activity based on behavior, rather than a signature. These messages don’t usually include a signature, instead might contain the command line arguments and other actions taken by the adversary.

Behavior-based detections are divided among the six more specific types described below. The `direct` type is retained for out-of-the-box mappings from generic sources that can't be assigned to a single type, such as the Microsoft Graph Security API catch-all mappings, and for your own log mappings that set `threat_ruleType` to `direct`.

Log sources that remain mapped to `direct` include:

* Symantec Endpoint Protection EDR
* Microsoft Graph Security API

Cloud SIEM provides the following normalized direct rule:

* [Normalized Security Signal](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00402.md) - Passes through an alert from a security product and adjusts the severity accordingly based on the severity provided in the log.

### endpoint

For messages from host-based security agents that detect suspicious or malicious behavior on an endpoint, such as EDR and EPP detections.

Log sources that issue endpoint-related messages include:

* CrowdStrike Falcon
* SentinelOne
* Carbon Black
* Palo Alto Cortex XDR
* Windows Defender and Azure Defender for Endpoint
* Sophos
* Trend Micro
* McAfee
* Cylance
* Cisco AMP
* Cybereason
* Endgame
* Jamf Protect
* Malwarebytes
* Tanium
* FireEye HX
* Bitdefender
* Google Workspace

Cloud SIEM provides the following normalized endpoint rule:

* [Normalized Endpoint Detection](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S01158.md) - Passes through an alert from a host-based security agent and adjusts the severity accordingly based on the severity provided in the log.

### runtime

For messages from workload security agents that detect suspicious or malicious behavior in containers and other cloud-native runtimes.

Log sources that issue runtime-related messages include:

* Falco
* Sysdig Secure
* Twistlock (Prisma Cloud Compute)
* Aqua Security

Cloud SIEM provides the following normalized runtime rule:

* [Normalized Runtime Detection](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S01159.md) - Passes through an alert from a workload security agent and adjusts the severity accordingly based on the severity provided in the log.

### cloud

For messages that indicate a cloud posture, cloud threat, or cloud infrastructure finding.

Log sources that issue cloud-related messages include:

* AWS GuardDuty
* AWS Security Hub
* Google Cloud SCC
* GCP IDS
* Orca Security
* Wiz
* Palo Alto Prisma Cloud
* Azure

Cloud SIEM provides the following normalized cloud rule:

* [Normalized Cloud Detection](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S01160.md) - Passes through an alert from a cloud security product and adjusts the severity accordingly based on the severity provided in the log.

### identity

For messages that indicate an identity or access anomaly, such as a risky sign-in, impossible travel, or compromised credentials.

Log sources that issue identity-related messages include:

* Azure AD Identity Protection
* Microsoft ATA
* Microsoft Graph Identity API
* MCAS/Defender for Cloud Apps
* Google Workspace Alert Center
* Okta
* Slack Enterprise
* DocuSign Monitor
* Exabeam
* Salesforce
* Box
* CrowdStrike Identity Protection

Cloud SIEM provides the following normalized identity rule:

* [Normalized Identity Detection](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S01161.md) - Passes through an alert from an identity or access product and adjusts the severity accordingly based on the severity provided in the log.

### network

For messages that indicate a network-layer detection, such as an IDS/IPS alert, a command-and-control callback, or a lateral movement indicator. These include NDR and WAF detections.

Log sources that issue network-related messages include:

* Palo Alto Firewall
* FortiGate
* Kemp LoadMaster WAF
* FireEye NX/CMS
* Vectra AI
* Claroty xDome
* Darktrace
* AlphaSOC
* CrowdStrike FDR
* Bitdefender
* Trend Micro

Cloud SIEM provides the following normalized network rule:

* [Normalized Network Detection](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S01162.md) - Passes through an alert from a network security product and adjusts the severity accordingly based on the severity provided in the log.

### data_protection

For messages that indicate a data protection detection, such as a DLP violation, an email security detection, a deception alert, or an application security finding.

Log sources that issue data protection-related messages include:

* Netskope
* Varonis
* Egnyte DLP
* Office 365 DLP
* Proofpoint TRAP
* Mimecast
* Check Point Avanan
* Akamai CPC
* Noname API Security
* Thinkst Canary
* Contrast ADR
* Qualys
* IBM Guardium
* CrowdStrike DataProtection
* Fortinet
* Google Workspace

Cloud SIEM provides the following normalized data protection rule:

* [Normalized Data Protection Detection](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S01163.md) - Passes through an alert from a data protection product and adjusts the severity accordingly based on the severity provided in the log.

## Behavior-based log mapping migration

The `endpoint`, `runtime`, `cloud`, `identity`, `network`, and `data_protection` types are new. Out-of-the-box log mappings that previously set `threat_ruleType` to `direct` are being reassigned to these types in phases, so that behavior-based detections are easier to tune and carry more context than the single [Normalized Security Signal](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00402.md) passthrough rule provides.

| `threat_ruleType` | Out-of-the-box mapping migration |
|---|---|
| `runtime` | Completed August 4, 2026 |
| `identity` | Completed August 4, 2026 |
| `network` | Completed August 17, 2026 |
| `data_protection` | Completed August 17, 2026 |
| `cloud` | Target: August 27, 2026 |
| `endpoint` | Target: August 27, 2026 |

:::note
All six rules are available now, but out-of-the-box log mappings are migrating in phases. The remaining dates in the table are targets and may shift. For the actual dates that out-of-the-box mappings migrate, monitor the [Cloud SIEM content release notes](/release-notes-cse/). Until a source's out-of-the-box mappings are migrated, its records keep a `threat_ruleType` of `direct` and continue to fire [Normalized Security Signal](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00402.md).

This migration changes only out-of-the-box log mappings. Your own log mappings aren't affected, and they keep whatever `threat_ruleType` value you set. To send records from your own mappings to one of the new rules, set `threat_ruleType` to that type.
:::

Types are assigned per log mapping, not per vendor, so a single security product can contribute to several types. For example, out-of-the-box CrowdStrike log mappings are assigned to `endpoint`, `identity`, `network`, and `data_protection`.

### Migrate custom content

Custom content that depends on [Normalized Security Signal](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/MATCH-S00402.md) won't apply to records once their out-of-the-box mappings are migrated. For sources that haven't migrated yet, make these updates before their target date:

* Re-scope any [rule tuning expressions](/docs/cse/rules/rule-tuning-expressions) on `MATCH-S00402` to the new rule IDs for those sources.
* Update any [custom insights](/docs/cse/records-signals-entities-insights/configure-custom-insight) that reference `MATCH-S00402`.
* Update saved searches, dashboards, or automations that filter on `threat_ruleType = 'direct'`.

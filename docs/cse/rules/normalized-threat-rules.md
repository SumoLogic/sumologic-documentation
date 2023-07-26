---
id: normalized-threat-rules
title: Normalized Threat Rules
sidebar_label: Normalized Threat Rules
description: CSE's built-in threat rules pass alerts from a security product to the Signal generation process, and are normalized work across multiple security products.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about CSE’s built-in normalized threat rules.

## Normalized threat rules pass alerts to CSE

The first key fact about normalized threat rules is this: they exist to process messages that describe a security event that has already
occurred. 

Some messages logged by a security product are the result of that product’s own detection functionality, for example, by using rule sets or signatures. Typically, such messages contain a severity, risk, or impact in the message, and can be accepted as a clear indication of nefarious activity. Essentially, a normalized threat rule simply passes an alert from a security product to the Signal generation process.  

## Normalized threat rules support multiple log sources

The second important aspect of a normalized threat rule is that, as the name implies, it supports multiple log sources.   

For example, a normalized threat rule that looks for intrusions would work with multiple products that detect intrusions, such as:

* Palo Alto Threat Event
* Cisco Firepower IDS
* Symantec Endpoint Protection Exploit Prevention/HIPS
* IPS/IDS Appliances
* Microsoft Graph Security API

Ordinarily, rules define the log messages they’ll be applied to by specifying `metadata_vendor` and `metadata_product `in the rule expression. A normalized rule doesn’t specify these attributes. Instead, it looks at another attribute that is set during the log mapping process: `threat_ruleType`. In the log mapping process for a message type, the value of `threat_ruleType` is set  to a value that corresponds to a threat type, for example “intrusion”. Then, normalized threat rules can look for messages whose `threat_ruleType` field is “intrusion”, regardless of vendor or product. For information about mapping requirements for messages that describe security events, see [Field Mapping for Security Event Sources](/docs/cse/schema/field-mapping-security-event-sources).

<!--
threat_rules.csv comes from https://github.com/jasklabs/content-catalog/blob/master/rules/threat_rules.csv

For a reference to the log mappers that participate in normalized threat rules and the data sources the rules support, see [threat_rules.csv](https://github.com/jasklabs/content-catalog/blob/master/rules/threat_rules.csv).
-->

## Types of normalized threat rules 

There are multiple categories of normalized threat rules for different types of threats.

### intrusion

For messages that indicate an intrusion has taken place These messages typically include a signature for the exploit attempted. 

Log sources that issue intrusion-related messages include:

* Palo Alto Threat Event
* Cisco Firepower IDS
* Symantec Endpoint Protection Exploit Prevention/HIPS
* IPS/IDS Appliances

CSE provides the following normalized intrusion rules:

* Intrusion Scan - Targeted - This rule looks for an intrusion product detecting an internal IP sending different exploits to another external IP in a short timeframe.
* Intrusion Sweep - This rule looks for an intrusion product detecting an internal IP sending the same exploit to multiple internal IPs in a short timeframe.
* High Severity Intrusion Signature - This rule looks for an intrusion product detecting a High severity intrusion signature sourcing from an internal IP.
* Critical Severity Intrusion Signature - This rule looks for an intrusion product detecting a critical severity intrusion signature sourcing from an internal IP.
* Informational Severity Intrusion Signature - This rule looks for an intrusion product detecting an informational severity intrusion signature sourcing from an internal IP.
* Low Severity Intrusion Signature - This rule looks for an intrusion product detecting a low severity intrusion signature sourcing from an internal IP. 
* Medium Severity Intrusion Signature - This rule looks for an intrusion product detecting a medium severity intrusion signature sourcing from an internal IP.

**Requirements for Intrusion Signature rules:**

The rules that detect intrusion signatures from internal IP addresses rely upon the [normalizedSeverity](/docs/cse/schema/schema-attributes) attribute in Records being mapped as follows:

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

CSE provides the following normalized malware rules:

* Malware Outbreak - Same malware signature on multiple hosts in a short timeframe.
* Persistent Malware Infection - Single host with multiple malware infections with the same signature in a short timeframe.
* Malware Not Cleaned - Malware the antivirus fails to clean.
* Malware Cleaned - Malware the antivirus successfully cleans.
* Antivirus Ransomware Detection - Malware determined to be ransomware based on the signature/virus name.

### direct

For messages that indicate suspicious or malicious activity based on behavior, rather than a signature. These messages don’t usually include a signature, instead might contain the command line arguments and other actions taken by the adversary.

Log sources that issue behavior-related messages include:

* CrowdStrike Falcon
* Symantec Endpoint Protection EDR
* Carbon Black Response
* AWS GuardDuty
* Varonis UBA
* G Suite Alert Center    

CSE provides the following normalized direct rule:

* Normalized Security Signal - Passes through an alert from an endpoint security product and adjusts the severity accordingly based on the severity provided in the log.

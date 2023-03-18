---
id: field-mapping-security-event-sources
title: Field Mapping for Security Event Sources
sidebar_label: Field Mappings
description: Learn how to set up field mappings for messages that you want to be processed by CSE's normalized threat rules.
---


This topic has information about creating field mappings for messages that you want to be processed by [normalized threat rules](../rules/normalized-threat-rules.md). 

CSE provides built-in normalized threat rules for processing messages that describe security events that have already occurred. These rules address a range of threat types, such as intrusion, malware, and so on. The rules are normalized so that the same rule can evaluate messages from multiple data log sources. For example, a single rule could handle messages from multiple products that detect malware, for example, Antivirus Appliances, Trend Micro Antivirus, and Symantec Endpoint Protection Scanning/Antivirus.

To ensure that the appropriate threat rule or rules are applied to a message, there are certain log mapping requirements for the following schema attributes:

* `threat_ruleType`—This attribute should be populated for messages that describe security events that have already occurred. Messages that don’t include security event detection should not map this attribute. See the field mapping instructions for each threat type in the sections below.
* `threat_name`—The value you map to this attribute depends on the value of the `threat_ruleType` in the mapping. See the field mapping instructions for each threat type in the sections below.
* `threat_signalName`—This attribute is used by some normalized rules as an element of the names for Signals the rule generates, so that the rule generates different signal names for different products. 
* `normalizedSeverity`—The value you map to this attribute depends on the value of the `threat_ruleType` in the mapping. See the field mapping instructions for each threat type in the sections below.

## Field mappings for intrusion events

In the **Field Mappings** section of the log mapper, map these attributes.

| Attribute             | Mapping instruction                           |
|:-----------------------|:-----------------------------------------------|
| `threat_ruleType`     | Map to the value “intrusion”.                 |
| `threat_name`         | Map to the intrusion system’s signature name. |
| `normalizedSeverity ` | Map to the severity value from the message.   |

## Field mappings for malware events

In the **Field Mappings** section of the log mapper, map these attributes.

| Attribute            | Mapping instruction                                                       |
|:----------------------|:---------------------------------------------------------------------------|
| `threat_ruleType`    | Map to the value “malware”.                                               |
| `threat_name`        | Map to the antivirus signature or virus name, for example “Trojan.Crypt”. |
| `normalizedSeverity` | Map to the severity value from the message.                               |

## Field mappings for direct events

In the **Field Mappings** section of the log mapper, map these
attributes.

| Attribute | Mapping instruction |
|:--|:--|
| `threat_ruleType` | Map to the value “direct”. |
| `threat_signalName` | Map this to the field or fields that should be used as the name of Signal generated for a message. You can do this with a standard field mapping. If you want to map to a formatted combination of message fields, use a format field mapping.<br/>Note When the built-in Normalized Security Signal rule fires a Signal, the Signal name will be the value of threat_signalName, resulting in Signal names of this form: `{threat_signalName}` |
| `threat_name` | Map to the alert name contained in the message. |
| `normalizedSeverity` | Map to the severity field in the message. Note that in CSE, severity is a value from 0 (lowest) to 10 (highest). If the severity range used in the message is not 0 to 10, you can translate the value from the message using a lookup mapping.<br/>For example, if the message source uses severities 1 to 5, you could translate the values like this:<br/>'1': '2'<br/>'2': '4'<br/>'3': '6'<br/>'4': '8'<br/>'5': '10'<br/>You can also define a default severity value that will apply if apply if a message doesn’t contain a severity value. |

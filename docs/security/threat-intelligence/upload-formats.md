---
slug: /security/threat-intelligence/upload-formats
title: Upload Formats for Threat Intelligence Indicators
sidebar_label: Upload Formats
description: Learn how to format upload files containing threat intelligence indicators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Use the following formats for threat intelligence indicator files when you [add indicators in the **Threat Intelligence** tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#add-indicators-in-the-threat-intelligence-tab) or when you use the upload APIs in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource:

* [Normalized JSON format](#normalized-json-format)
* [CSV format](#csv-format)
* [STIX 2.x JSON format](#stix-2x-json-format)

## Normalized JSON format

Normalized JSON format is a standardized method to present JSON data. You can use this format to load indicators from multiple sources.

### Example file

Following is an example threat indicator file in normalized JSON format. (For another example, see the [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators)).

```json
{
 "indicators": [
   {
     "id": "0001",
     "indicator": "192.0.2.0",
     "type": "ipv4-addr",
     "source": "TAXII2Source",
     "validFrom": "2023-03-21T12:00:00.000Z",
     "validUntil": "2025-03-21T12:00:00.000Z",
     "confidence": 30,
     "threatType": "malicious-activity",
     "actors": "actor1,actor2",
     "killChain": "reconnaissance",
     "fields": {
       "kill_chain_name": "lockheed-martin-cyber-kill-chain",
       "kill_chain_phase": "reconnaissance"
     }
   },
   {
     "id": "0002",
     "indicator": "192.0.2.1",
     "type": "ipv4-addr",
     "source": "TAXII2Source",
     "validFrom": "2023-03-21T12:00:00.000Z",
     "validUntil": "2025-03-21T12:00:00.000Z",
     "confidence": 30,
     "threatType": "malicious-activity",
     "actors": "actor3,actor4",
     "killChain": "reconnaissance",
     "fields": {
       "kill_chain_name": "lockheed-martin-cyber-kill-chain",
       "kill_chain_phase": "reconnaissance"
     }
   }
 ]
}
```

### Required attributes

For information about the attributes to use, see ["Indicator" in the STIX 2.1 specification](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_muftrcpnf89v), and the [uploadNormalizedIndicators API](https://api.sumologic.com/docs/#operation/uploadNormalizedIndicators) in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource.

The following attributes are required:
       * **id** (string). ID of the indicator. For example, `indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f`.
       * **indicator** (string). Value of the indicator, such as an IP address, file name, email address, etc. For example, `192.0.2.0`.
       * **type** (string). Type of the indicator. Following are valid values:
         * `domain-name`. Domain name. (Entity type in Cloud SIEM is `_domain`.)
         * `email-addr`. Email address. (Entity type in Cloud SIEM is `_email`.)
         * `file`. File name. (Entity type in Cloud SIEM is `_file`.)
         * `file:hashes`. File hash. (Entity type in Cloud SIEM is `_hash`.)<br/>If you want to add the hash algorithm, enter `file:hashes.'<HASH-TYPE>'`. For example, `[file:hashes.'SHA-256' = '4bac393bdd']`.
         * `ipv4-addr`. IPv4 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `ipv6-addr`. IPv6 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `mac-addr`. Mac address name. (Entity type in Cloud SIEM is `_mac`.)
         * `process`. Process name. (Entity type in Cloud SIEM is `_process`.)
         * `url`. URL. (Entity type in Cloud SIEM is `_url`.)
         * `user-account`. User ID. (Entity type in Cloud SIEM is `_username`.)
       * **source** (string). User-provided text to identify the source of the indicator. For example, `TAXII2Source`.
       * **validFrom** (string [date-time]). Beginning time this indicator is valid. Timestamp in UTC in RFC3339 format. For example, `2023-03-21T12:00:00.000Z`.
       * **confidence** (integer [ 1 .. 100 ]). Confidence that the creator has in the correctness of their data, where 100 is highest (as [defined by the confidence scale in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_1v6elyto0uqg)). For example, `75`.
       * **threatType** (string). Type of indicator (as [defined by indicator_types in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_cvhfwe3t9vuo)). For example, `malicious-activity`. (This attribute can result in a special label appearing next to Entities in the Cloud SIEM UI. See [View threat indicators in the Cloud SIEM UI](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/#view-threat-indicators-in-the-cloud-siem-ui).) <br/>Following are valid values:
          * `anomalous-activity`. Unexpected or unusual activity that may not necessarily be malicious or indicate compromise.
          * `anonymization`. Suspected anonymization tools or infrastructure (proxy, TOR, VPN, etc.).
          * `benign`. Activity that is not suspicious or malicious in and of itself, but when combined with other activity may indicate suspicious or malicious behavior.
          * `compromised`. Assets that are suspected to be compromised.
          * `malicious-activity`. Patterns of suspected malicious objects and/or activity.
          * `attribution`. Patterns of behavior that indicate attribution to a particular threat actor or campaign.
          * `unknown` (or not set). There is not enough information available to determine the threat type.

      The following attributes are optional:
       * **actors** (string list). An identified threat actor such as an individual, organization, or group. For example, `actor1`. 
       * **killChain** (string list). The various phases an attacker may undertake to achieve their objectives (as [defined by kill_chain_phase in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_i4tjv75ce50h)). For example, `reconnaissance`. Although you can use any kill chain definition and values you want, following are example values based on the standard stages in a kill chain:
          * `reconnaissance`.  Researching potential targets.
          * `weaponization`. Creation of malware to be used against an identified target.
          * `delivery`. Infiltration of a target’s network and users.
          * `exploitation`. Taking advantage of the vulnerabilities discovered in previous stages to further infiltrate a target’s network and achieve objectives.
          * `installation`. Install malware and other cyberweapons onto the target network to take control of its systems and exfiltrate valuable data.
          * `command-and-control`. Communication with the installed malware.
          * `actions-on-objectives`. Carrying out cyberattack objectives.
         
## CSV format

Comma-separated value (CSV) is a standard format for data upload.

### Example file

When uploading a CSV file with the UI, the format should be the same as used for a standard CSV file:

```
0001,192.0.2.0,ipv4-addr,TAXII2Source,2023-02-21T12:00:00.00Z,2025-05-21T12:00:00.00Z,30,malicious-activity,,
0002,192.0.2.1,ipv4-addr,TAXII2Source,2023-02-21T12:00:00.00Z,2025-05-21T12:00:00.00Z,30,malicious-activity,actor3,reconnaissance
```

### Required attributes

For information about the attributes to use, see ["Indicator" in the STIX 2.1 specification](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_muftrcpnf89v).

Columns for the following attributes are required in the upload file:
       * **id** (string). ID of the indicator. For example, `indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f`.
       * **indicator** (string). Value of the indicator, such as an IP address, file name, email address, etc. For example, `192.0.2.0`.
       * **type** (string). Type of the indicator. Following are valid values:
         * `domain-name`. Domain name. (Entity type in Cloud SIEM is `_domain`.)
         * `email-addr`. Email address. (Entity type in Cloud SIEM is `_email`.)
         * `file`. File name. (Entity type in Cloud SIEM is `_file`.)
         * `file:hashes`. File hash. (Entity type in Cloud SIEM is `_hash`.)<br/>If you want to add the hash algorithm, enter `file:hashes.'<HASH-TYPE>'`. For example, `[file:hashes.'SHA-256' = '4bac393bdd']`.
         * `ipv4-addr`. IPv4 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `ipv6-addr`. IPv6 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `mac-addr`. Mac address name. (Entity type in Cloud SIEM is `_mac`.)
         * `process`. Process name. (Entity type in Cloud SIEM is `_process`.)
         * `url`. URL. (Entity type in Cloud SIEM is `_url`.)
         * `user-account`. User ID. (Entity type in Cloud SIEM is `_username`.)
       * **source** (string). User-provided text to identify the source of the indicator. For example, `TAXII2Source`.
       * **validFrom** (string [date-time]). Beginning time this indicator is valid. Timestamp in UTC in RFC3339 format. For example, `2023-03-21T12:00:00.000Z`.
       * **validUntil** (string [date-time]). Ending time this indicator is valid. If not set, the indicator never expires. Timestamp in UTC in RFC3339 format. For example, `2024-03-21T12:00:00.000Z`.
       * **confidence** (integer [ 1 .. 100 ]). Confidence that the creator has in the correctness of their data, where 100 is highest. For example, `75`.
       * **threatType** (string). Type of indicator (as [defined by indicator_types in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_cvhfwe3t9vuo)). For example, `malicious-activity`. (This attribute can result in a special label appearing next to Entities in the Cloud SIEM UI. See [View threat indicators in the Cloud SIEM UI](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/#view-threat-indicators-in-the-cloud-siem-ui).) <br/>Following are valid values:
          * `anomalous-activity`. Unexpected or unusual activity that may not necessarily be malicious or indicate compromise.
          * `anonymization`. Suspected anonymization tools or infrastructure (proxy, TOR, VPN, etc.).
          * `benign`. Activity that is not suspicious or malicious in and of itself, but when combined with other activity may indicate suspicious or malicious behavior.
          * `compromised`. Assets that are suspected to be compromised.
          * `malicious-activity`. Patterns of suspected malicious objects and/or activity.
          * `attribution`. Patterns of behavior that indicate attribution to a particular threat actor or campaign.
          * `unknown` (or not set). There is not enough information available to determine the threat type.

      The following attributes are optional:
       * **actors** (string list). An identified threat actor such as an individual, organization, or group. For example, `actor3`. Note if you don’t provide a value for `actors`, you still must provide the empty column at the end of the row with an extra comma, as shown in the examples above.
       * **killChain** (string list). The various phases an attacker may undertake to achieve their objectives (as [defined by kill_chain_phase in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_i4tjv75ce50h)). For example, `reconnaissance`. Although you can use any kill chain definition and values you want, following are example values based on the standard stages in a kill chain:
          * `reconnaissance`.  Researching potential targets.
          * `weaponization`. Creation of malware to be used against an identified target.
          * `delivery`. Infiltration of a target’s network and users.
          * `exploitation`. Taking advantage of the vulnerabilities discovered in previous stages to further infiltrate a target’s network and achieve objectives.
          * `installation`. Install malware and other cyberweapons onto the target network to take control of its systems and exfiltrate valuable data.
          * `command-and-control`. Communication with the installed malware.
          * `actions-on-objectives`. Carrying out cyberattack objectives.

## STIX 2.x JSON format

STIX 2.x JSON format is a method to present JSON data according to the STIX 2.x specification.

Note that if you want to upload indicators from multiple sources, you cannot use this format but instead should use the [Normalized JSON format](#normalized-json-format).

Also note that if your STIX file includes lines like these at the top...

```
{
  "type": "bundle",
  "id": "bundle--cf20f99b-3ed2-4a9f-b4f1-d660a7fc8241",
  "objects": [
  {
    "type": "indicator",
```

...you should remove them before uploading the file, and leave only the objects array like this:

```
[
  {
    "type": "indicator",
```


### Example file

Following is an example threat indicator file in STIX 2.1 JSON format when you're uploading a file with the API.

As shown in the following example, if uploading via the API you must add the `source` attribute outside of the indicators object, since the source is not part of the STIX standard. You must also include an `indicators` array field. (For another example for uploading via the API, see the [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators)).

```json
{
 "source": "TAXII2Source",
 "indicators": [
   {
     "type": "indicator",
     "spec_version": "2.1",
     "id": "0001",
     "created": "2023-03-21T12:00:00.000Z",
     "modified": "2023-03-21T12:00:00.000Z",
     "confidence": 30,
     "pattern": "[ipv4-addr = '192.0.2.0']",
     "pattern_type": "stix",
     "pattern_version": "string",
     "valid_from": "2023-03-21T12:00:00.000Z",
     "valid_until": "2025-03-21T12:00:00.000Z",
     "indicator_types": [
       "malicious-activity"
     ],
     "kill_chain_phases": [
       {
         "kill_chain_name": "lockheed-martin-cyber-kill-chain",
         "phase_name": "reconnaissance"
       }
     ]
   },
   {
     "type": "indicator",
     "spec_version": "2.1",
     "id": "0002",
     "created": "2023-03-21T12:00:00.000Z",
     "modified": "2023-03-21T12:00:00.000Z",
     "confidence": 30,
     "pattern": "[ipv4-addr = '192.0.2.1']",
     "pattern_type": "stix",
     "pattern_version": "string",
     "valid_from": "2023-03-21T12:00:00.000Z",
     "valid_until": "2025-03-21T12:00:00.000Z",
     "indicator_types": [
       "malicious-activity"
     ],
     "kill_chain_phases": [
       {
         "kill_chain_name": "lockheed-martin-cyber-kill-chain",
         "phase_name": "reconnaissance"
       }
     ]
   }
 ]
}
```

### Required attributes

For information about the attributes to use, see ["Indicator" in the STIX 2.1 specification](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_muftrcpnf89v), and the [uploadStixIndicators API](https://api.sumologic.com/docs/#operation/uploadStixIndicators) in the [Threat Intel Ingest Management](https://api.sumologic.com/docs/#tag/threatIntelIngest) API resource.

The following attributes are required:
       * **type** (string). The type of STIX object. For example, `indicator`. The value must be the name of one of the types of STIX objects defined in the STIX 2.x specification.
       * **spec_version** (string). The version of the STIX specification used to represent this object. For example, the value of this property must be `2.1` for STIX objects defined according to the STIX 2.1 specification.
       * **id** (string). ID of the indicator. For example, `indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f`.
       * **created** (string [date-time]). The time at which the object was originally created. Timestamp in UTC in RFC3339 format. For example, `2016-05-01T06:13:14.000Z`.
       * **modified** (string [date-time]). When the object is modified. Timestamp in UTC in RFC3339 format. For example, `2023-05-01T06:13:14.000Z`. This property is only used by STIX Objects that support versioning and represents the time that this particular version of the object was last modified.
       * **pattern** (string). The pattern of this indicator (as defined by [pattern in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_me3pzm77qfnf)). Following are valid values:
         * `domain-name`. Domain name. (Entity type in Cloud SIEM is `_domain`.)
         * `email-addr`. Email address. (Entity type in Cloud SIEM is `_email`.)
         * `file:hashes`. File hash. (Entity type in Cloud SIEM is `_hash`.)<br/>If you want to add the hash algorithm, enter `file:hashes.'<HASH-TYPE>'`. For example, `[file:hashes.'SHA-256' = '4bac393bdd']`.
         * `file:name`. File name. (Entity type in Cloud SIEM is `_file`.)
         * `ipv4-addr`. IPv4 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `ipv6-addr`. IPv6 IP address. (Entity type in Cloud SIEM is `_ip`.)
         * `mac-addr`. Mac address name. (Entity type in Cloud SIEM is `_mac`.)
         * `process:name`. Process name. (Entity type in Cloud SIEM is `_process`.)
         * `url`. URL. (Entity type in Cloud SIEM is `_url`.)
         * `user-account:user-id`. User ID. (Entity type in Cloud SIEM is `_username`.)
         * `user-account:login`. Login name. (Entity type in Cloud SIEM is `_username`.)       
       * **pattern_type** (string). The pattern language used in this indicator (as defined by [pattern_type in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_9lfdvxnyofxw)). Enter `stix` to specify the [STIX](https://oasis-open.github.io/cti-documentation/stix/intro) pattern language.
       * **valid_from** (string [date-time]). Beginning time this indicator is valid. Timestamp in UTC in RFC3339 format. For example, `2023-03-21T12:00:00.000Z`.

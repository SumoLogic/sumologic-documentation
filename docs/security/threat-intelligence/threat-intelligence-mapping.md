---
slug: /security/threat-intelligence/threat-intelligence-mapping
title: Threat Intelligence Mapping
sidebar_label: Mapping 
description: Learn about mapping of threat intelligence indicators to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## CrowdStrike mapping

Sumo Logic provides a CrowdStrike threat intelligence indicator source out-of-the-box. You can see it in the [**Threat Intelligence** tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab) as "CrowdStrike provided by Sumo Logic (s_CrowdStrike)". This source is a default source and cannot be changed or deleted. When performing searches using the [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/) against this source, use "s_CrowdStrike" as the source name.

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

### FAQ about the CrowdStrike threat intelligence indicator source

#### What is the CrowdStrike integration for Sumo Logic?

In partnership with CrowdStrike, Sumo Logic maintains an updated threat intelligence database that can be correlated with log data through queries. The Sumo Logic/CrowdStrike integration has two parts:
* Sumo Logic maintains an up-to-date copy of CrowdStrike’s threat database.
* Sumo Logic customers can use the CrowdStrike database in threat analysis queries of their logs (through the [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/)).

The Sumo Logic Threat Intel lookup database is only available with Sumo Logic Enterprise and Professional accounts, or during a 30-day trial period. The Threat Intel lookup database is not available for Sumo Logic Free accounts.

#### How often do you refresh the threat feed from CrowdStrike?

The database is updated once per day. We have implemented a multi-layer cache for performance enhancements rather than returning to the master database on each query.

#### Can I export all of the CrowdStrike threats?

No, we do not allow an export of the threat intel feeds because that is confidential to CrowdStrike. However, we will match lookups from your logs against the entire threat database. You only see data returned when you have a match against the database to a specific threat from your log data (for example, IP, domain, email, and so on) via the [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/).

#### What are different Indicators of Compromise (IOC) types available?

The following IOC types are available from CrowdStrike:
* ip_address
* domain
* url
* email_address
* event_name
* x509_subject
* ip_address_block
* x509_serial
* binary_string
* service_name
* user_agent
* bitcoin_address
* file_path
* registry
* username
* file_name
* password
* campaign_id
* mutex_name
* hash_md5
* hash_sha1
* hash_sha256

#### Can you provide samples for the different IOC types?

| IOC Type | IOC |
|:--|:--|
| SHA256 | 6c1bce76f4d2358656132b6b1d471571820688ccdbaca0d86d0ca082b9390536 |
| SHA256 | b101cd29e18a515753409ae86ce68a4cedbe0d640d385eb24b9bbb69cf8186ae |
| IP Address  | 84.112.91.96 |
| IP Address  | 158.69.196.112 |
| File | updater.exe |
| File | 0.exe |
| URL | http://tycahatit.ru/zapoy/gate.php |
| URL | http://ningwitjohnno.ru/zapoy/gate.php |
| Domain | 9jdco01e.ru |
| Domain | ningwitjohnno.ru |
| Email | sherigerber@mail.ru |
| Email | nosiwdcd5@outlook.com |
| Hash MD5 | 9da2a54e98ddb9a0adb4ace3dda4d8e0 |
| Hash MD5 | 832efb3fce4b1e16d610d5856f1401bb |

#### Do IOCs and threats expire?

IOCs and threats will often remain in the system because an IOC, such as an IP address, could go dormant and they reappear as part of another threat. The last valid one can be found under **labels** > **Last_valid_on**. Be aware that over the period, their Malicious Confidence can be downgraded or upgraded depending upon recent activity.

#### I found an IOC in VirusTotal (or any other third-party threat feed), but I can’t find that IOC in CrowdStrike using the Sumo Logic lookup?

CrowdStrike focuses on quality versus quantity when it comes to threat assessment. They have a dedicated Intel Team which does that work. A threat from a third-party feed may not be present in CrowdStrike threats because it has been rejected by the CrowdStrike Intel assessment Team.

#### I found threats in my network, now what do I do? How do I get more context about threats?

The next step would be to look at the raw JSON field from the query. Fields such as `ip_address_types`, `labels`, `relations`, and `malware_families` in the JSON object provide more contextual information about threats.

```
{
"indicator": "104.198.196.36",
 "type": "ip_address",
 "last_updated": 1476946769,
 "published_date": 1476946767,
 malicious_confidence": "unverified",
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

With the malware family and other information, the user can search the internet for more as there is often data readily available on known threats. In addition, if you would like more robust information, you can contact CrowdStrike directly and purchase individual reports or discuss upgrading to CrowdStrike Premium which includes more detailed reports.

#### What are actors?

Threats are grouped by actors, which are based on location. Some threats are tied to nation-state actors. For instance, “Panda” is the umbrella term for all nation-state activity tied to the People’s Republic of China. Non-nation-state-based threats are categorized by intention, not location; for instance, activist groups like the Syrian Electronic Army are categorized as “Jackal,” which expresses both intent and motivation. The following is the cryptonym system that CrowdStrike uses for threats categorization:

* **Nation-State-Based threats**
    * Panda = China
    * Bear = Russia
    * Kitten = Iran
    * Tiger = India
    * Chollima (a mythical winged horse) = North Korea
* **Non-Nation-State threats**
    * Jackal = Activist groups
    * Spider = Criminal groups

[https://www.crowdstrike.com/blog/meet-the-adversaries/](https://www.crowdstrike.com/blog/meet-the-adversaries/)

#### What is unverified malicious confidence?

About 20% of the indicators are unverified. These unverified threats may be real threats, but the CrowdStrike team has not been able to assign a confidence level to them, so they remain in the unverified state.

Unverified is usually an IP address related to a known bad adversary (like Deep Panda) and it’s an IP that was used at some point in that campaign. As we all know - IPs are dynamic. While Deep Panda utilized IP 201.22.52.32 at some point, it doesn’t mean that IP should be marked as bad or a threat, so we label it unverified. It’s more informational than actionable. CrowdStrike is looking at better ways to vet those IPs, for now it’s unverified. CrowdStrike advises customers not to do anything with those IPs unless they’re seeing malicious activity from one of them. If the state is ever updated, CrowdStrike will change the “last updated” timestamp and the new state will appear. In the meantime, users should treat them as possible candidates for analysis. CrowdStrike recommends that you start with the highest priority and work down the chain.

#### Can you explain different fields in the raw JSON object?

---
#### `indicator`
**Data Type:** string<br/>
**Description:** The indicator that was queried.

---
#### `Type`  
**Data Type:** string<br/>
**Description:** The type of the indicator<br/>
**Values:**

* binary_string
* compile_time
* device_name
* domain
* email_address
* email_subject
* event_name
* file_mapping
* file_name
* file_path
* hash_ion
* hash_md5
* hash_sha1
* hash_sha256
* ip_address
* ip_address_block
* mutex_name
* password
* persona_name
* phone_number
* port
* registry
* semaphore_name
* service_name
* url
* user_agent
* username
* x509_serial
* x509_subject

---
#### `report`
**Data Type:** string<br/>
**Description:** The report ID that the indicator is associated with (e.g., CSIT-XXXX, CSIR-XXXX, etc). The report list is also represented under the labels list in the JSON data structure.

---
#### `actor`
**Data Type:** string<br/>
**Description:** The named Actor that the indicator is associated with (e.g. panda, bear, spider, etc). The actor list is also represented under the labels list in the JSON data structure.

---
#### `malicious_confidence`

**Data Type:** string<br/>
**Description:** Indicates a confidence level by which an indicator is considered to be malicious. For example, a malicious file hash may always have a value of high while domains and IP addresses will very likely change over time. The malicious confidence level is also represented under the labels list in the JSON data structure.<br/>
Once an indicator has been marked with a malicious confidence level, it continues to have that confidence level value until updated by CrowdStrike. If you think there is a false positive, please file a Support ticket, and we'll work with CrowdStrike to investigate the IOC in question and update the threat details.<br/>
**Values:**

* high
* medium
* low
* unverified—This indicator has not been verified by a CrowdStrike Intelligence analyst or an automated system.
* null—Indicates that Sumo Logic has no information about the threat record.

---
#### `published_date`

**Data Type:** Timestamp in standard Unix time, UTC.<br/>
**Description:** This is the date the indicator was first published.

---
#### `last_updated`

**Data Type**: Timestamp in standard Unix time, UTC.<br/>
**Description**: This is the date the indicator was last updated in CrowdStrike internal database.

---
#### `malware_family`

**Data Type**: string<br/>
**Description**: Indicates the malware family an indicator has been associated with. An indicator may be associated with more than one malware family. The malware family list is also represented under the labels list in the JSON data structure.

---
#### `kill_chain`

**Data Type:** string<br/>
**Description:** The point in the kill chain at which an indicator is associated. The kill chain list is also represented under the labels list in the JSON data structure.<br/>
**Values:**  
* reconnaissance—This indicator is associated with the research, identification, and selection of targets by a malicious actor.
* weaponization—This indicator is associated with assisting a malicious actor create malicious content.
* delivery—This indicator is associated with the delivery of an exploit or malicious payload.
* exploitation—This indicator is associated with the exploitation of a target system or environment.
* installation—This indicator is associated with the installation or infection of a target system with a remote access tool or other tool allowing for persistence in the target environment.
* c2 (Command and Control)—This indicator is associated with malicious actor command and control.
* actionOnObjectives—This indicator is associated with a malicious actor's desired effects and goals.

---
#### `labels`

**Data Type:** string<br/>
**Description:** The Intel Indicators API provides additional context around an indicator via the labels list. Some of these labels, such as `malicious_confidence` are accessible via the top-level data structure. All labels, including their associated timestamps, will be accessible via the labels list. The url string will look like: `https://intelapi.crowdstrike.com/indicator/v1/search/labels?equal=DomainType/DynamicDNS`.

| IOC Type | Values |
|:--|:--|
| **DomainType** | - DomainType/ActorControlled—It is believed the malicious actor is still in control of this domain. |
| | - DomainType/DGA—Domain is the result of malware utilizing a domain generation algorithm.|
| | - DomainType/DynamicDNS—Domain is owned or used by a dynamic DNS service. |
| | - DomainType/DynamicDNS/Afraid—Domain is owned or used by the Afraid.org dynamic DNS service. |
| | - DomainType/DynamicDNS/DYN—Domain is owned or used by the DYN dynamic DNS service. |
| | - DomainType/DynamicDNS/Hostinger—Domain is owned or used by the Hostinger dynamic DNS service. |
| | - DomainType/DynamicDNS/noIP—Domain is owned or used by the NoIP dynamic DNS service. |
| | - DomainType/DynamicDNS/Oray—Domain is owned or used by the Oray dynamic DNS service. |
| | - DomainType/KnownGood—Domain itself (or the domain portion of a URL) is known to be legitimate, despite having been associated with malware or malicious activity. |
| | - DomainType/LegitimateCompromised—Domain does not typically pose a threat but has been compromised by a malicious actor and may be serving malicious content. |
| | - DomainType/PhishingDomain—Domain has been observed to be part of a phishing campaign. |
| | - DomainType/Sinkholed—Domain is being sinkholed, likely by a security research team. |
| | - DomainType/StrategicWebCompromise—While similar to the DomainType/LegitimateCompromised label, this label indicates that the activity is of a more targeted nature. |
| | - DomainType/Unregistered—Domain is not currently registered with any registrars.|
| **EmailAddressType** | - EmailAddressType/DomainRegistrant—Email address has been supplied in the registration information for known malicious domains. |
| | - EmailAddressType/SpearphishSender—Email address has been used to send spearphishing emails. |
| **IntelNews** | The Intel Flash Report ID an indicator is associated with (e.g., IntelNews/NEWS-060520151900). |
| **IPAddressType** | - IPAddressType/HtranDestinationNode—An IP address with this label is being used as a destination address with the HTran Proxy Tool. |
| | - IPAddressType/HtranProxy—An IP address with this label is being used as a relay or proxy node with the HTran Proxy Tool. |
| | - IPAddressType/LegitimateCompromised—It is suspected an IP address with this label is compromised by malicious actors. |
| | - IPAddressType/Parking—IP address is likely being used as parking IP address. |
| | - IPAddressType/PopularSite—IP address could be utilized for a variety of purposes and may appear more frequently than other IPs. |
| | - IPAddressType/SharedWebHost—IP address may be hosting more than one website. |
| | - IPAddressType/Sinkhole—IP address is likely a sinkhole being operated by a security researcher or vendor. |
| | - IPAddressType/TorProxy—IP address is acting as a TOR (The Onion Router) Proxy Malware/PoisonIvy Malware/Zeus Malware/DarkComet. |
| **Status**  | - Status/ConfirmedActive—Indicator is likely to be currently supporting malicious activity. |
| | - Status/ConfirmedInactive—Indicator is no longer used for malicious purposes.  |
| **Target**  | The activity associated with this indicator is known to target the indicated vertical sector: |
| | - Target/Aerospace  |
| | - Target/Agricultural |
| | - Target/Chemical |
| | - Target/Defense |
| | - Target/Dissident |
| | - Target/Energy |
| | - Target/Extractive |
| | - Target/Financial |
| | - Target/Government |
| | - Target/Healthcare |
| | - Target/Insurance |
| | - Target/InternationalOrganizations |
| | - Target/Legal |
| | - Target/Manufacturing |
| | - Target/Media  |
| | - Target/NGO |
| | - Target/Pharmaceutical |
| | - Target/Research |
| | - Target/Retail |
| | - Target/Shipping |
| | - Target/Technology |
| | - Target/Telecom |
| | - Target/Transportation |
| | - Target/Universities |
| **ThreatType** | - ThreatType/ClickFraud—Indicator is used by actors engaging in click or ad fraud. |
| | - ThreatType/Commodity—Indicator is used with commodity-type malware such as Zeus or Pony Downloader. |
| | - ThreatType/PointOfSale—Indicator is associated with activity known to target point-of-sale machines such as AlinaPoS or BlackPoS. |
| | - ThreatType/Ransomware—Indicator is associated with ransomware malware such as Crytolocker or Cryptowall.  |
| | - ThreatType/Suspicious—Indicator is not currently associated with a known threat type but should be considered suspicious. |
| | - ThreatType/Targeted—Indicator is associated with a known actor suspected to be associated with a nation-state such as DEEP PANDA or ENERGETIC BEAR. |
| | - ThreatType/TargetedCrimeware—Indicator is associated with a known actor suspected to be engaging in criminal activity such as WICKED SPIDER. |
| **Vulnerability** | The CVE-XXXX-XXX vulnerability the indicator is associated with (for example, `https://intelapi.crowdstrike.com/indicator/v1/search/labels?equal=vulnerability/CVE-2012-0158`). |



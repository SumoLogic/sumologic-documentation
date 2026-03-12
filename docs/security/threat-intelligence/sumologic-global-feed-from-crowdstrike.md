---
slug: /security/threat-intelligence/sumologic-global-feed-from-crowdstrike
title: Sumo Logic Global Feed from CrowdStrike
sidebar_label: Global Feed from CrowdStrike
description: Learn about Sumo Logic's threat intelligence feed of indicators from CrowdStrike.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In partnership with CrowdStrike, Sumo Logic maintains the **_sumo_global_feed_cs** [threat intelligence source](/docs/security/threat-intelligence/about-threat-intelligence/#threat-intelligence-sources), an updated threat intelligence database that can be correlated with log data through queries. The Sumo Logic / CrowdStrike integration has two parts:
* Sumo Logic maintains an up-to-date copy of CrowdStrike’s threat database.
* Sumo Logic customers can use the CrowdStrike database in threat analysis queries over their logs (through a [`lookup` operator](/docs/search/search-query-language/search-operators/lookup/)). For example, the [Threat Intel Quick Analysis app](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/) points to the **_sumo_global_feed_cs** source in its queries by [using the lookup search operator](/docs/security/threat-intelligence/find-threats/#use-the-lookup-search-operator). The app scans all Sumo Logic logs and parses (using regex) IP/Email/URL/Domain/File Name fields for comparison against the threat feed from CrowdStrike. Think of it as an Inner Join between parsed fields and the threat table.

## Indicators of Compromise (IoC)

The following [Indicators of Compromise](https://www.crowdstrike.com/en-us/cybersecurity-101/threat-intelligence/indicators-of-compromise-ioc/) types are available from CrowdStrike:
* binary_string
* bitcoin_address
* campaign_id
* domain
* ip_address
* email_address
* event_name
* file_name
* file_path
* hash_md5
* hash_sha1
* hash_sha256
* ip_address_block
* mutex_name
* password
* registry
* service_name
* url
* user_agent
* username
* x509_serial
* x509_subject

### Samples for the different IoC types

| IoC type | IoC |
|:--|:--|
| Domain | `9jdco01e.ru`|
| Email | `sherigerber@mail.ru`|
| File | `updater.exe`  |
| Hash MD5 | `9da2a54e98ddb9a0adb4ace3dda4d8e0` |
| IP Address | `84.112.91.96`                                          |
| SHA256 | `6c1bce76f4d2358656132b6b1d471571820688ccdbaca0d86d0ca082b9390536`|
| URL | `http://tycahatit.ru/zapoy/gate.php`|

### Expiration of IoCs and threats

IoCs and threats will often remain in the system because an IoC, such as an IP address, could go dormant and they reappear as part of another threat. Be aware that over the period, their malicious confidence can be downgraded or upgraded depending upon recent activity.

### Unverified malicious confidence

About 20% of the indicators are unverified. These unverified threats may be real threats, but the CrowdStrike team has not been able to assign a confidence level to them, so they remain in the unverified state.

Unverified is usually an IP address related to a known bad adversary (like Deep Panda) and it’s an IP that was used at some point in that campaign. As we all know, IPs are dynamic. While Deep Panda utilized IP 201.22.52.32 at some point, it doesn’t mean that IP should be marked as bad or a threat, so we label it unverified. It’s more informational than actionable. CrowdStrike is looking at better ways to vet those IPs, for now it’s unverified. CrowdStrike advises you not to do anything with those IPs unless you're seeing malicious activity from one of them. If the state is ever updated, CrowdStrike will change the “last updated” timestamp and the new state will appear. In the meantime, you should treat them as possible candidates for analysis.

CrowdStrike recommends that you start with the highest priority and work down the chain.

## Actors

Threats are grouped by actors, which are based on location. Some threats are tied to nation-state actors. For instance, “Panda” is the umbrella term for all nation-state activity tied to the People’s Republic of China. For more information, see [CrowdStrike documentation](https://www.crowdstrike.com/adversaries/).

Non-nation-state-based threats are categorized by intention, not location. For instance, activist groups like the Syrian Electronic Army are categorized as “Jackal,” which expresses both intent and motivation. The following is the cryptonym system that CrowdStrike uses for threats categorization:

* **Nation-State-Based threats**
    * Panda = China
    * Bear = Russia
    * Kitten = Iran
    * Tiger = India
    * Chollima (a mythical winged horse) = North Korea
* **Non-Nation-State threats**
    * Jackal = Activist groups
    * Spider = Criminal groups

## Fields in the raw JSON object

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
Once an indicator has been marked with a malicious confidence level, it continues to have that confidence level value until updated by CrowdStrike. If you think there is a false positive, please file a Support ticket, and we'll work with CrowdStrike to investigate the IoC in question and update the threat details.<br/>
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

| IoC Type          | Values                               |
|:-------------------|:----------------------------------------|
| **DomainType**    | - DomainType/ActorControlled: It is believed the malicious actor is still in control of this domain.<br/>- DomainType/DGA: Domain is the result of malware utilizing a domain generation algorithm.<br/>- DomainType/DynamicDNS: Domain is owned or used by a dynamic DNS service.<br/>- DomainType/DynamicDNS/Afraid: Domain is owned or used by the Afraid.org dynamic DNS service.<br/>- DomainType/DynamicDNS/DYN: Domain is owned or used by the DYN dynamic DNS service.<br/>- DomainType/DynamicDNS/Hostinger: Domain is owned or used by the Hostinger dynamic DNS service.<br/>- DomainType/DynamicDNS/noIP: Domain is owned or used by the NoIP dynamic DNS service.<br/>- DomainType/DynamicDNS/Oray: Domain is owned or used by the Oray dynamic DNS service.<br/>- DomainType/KnownGood: Domain itself (or the domain portion of a URL) is known to be legitimate, despite having been associated with malware or malicious activity.<br/>- DomainType/LegitimateCompromised: Domain does not typically pose a threat but has been compromised by a malicious actor and may be serving malicious content.<br/>- DomainType/PhishingDomain: Domain has been observed to be part of a phishing campaign.<br/>- DomainType/Sinkholed: Domain is being sinkholed, likely by a security research team. This indicates that, while traffic to the domain likely has a malicious source, the IP address to which it is resolving is controlled by a legitimate third party.<br/>- DomainType/StrategicWebCompromise: Indicates targeted activity, often compromising a legitimate domain used as a watering hole by targeted organizations.<br/>- DomainType/Unregistered: Domain is not currently registered with any registrars. |
| **EmailAddressType** | - EmailAddressType/DomainRegistrant: Email address has been supplied in the registration information for known malicious domains.<br/>- EmailAddressType/SpearphishSender: Email address has been used to send spearphishing emails. |
| **IntelNews**  | The Intel Flash Report ID an indicator is associated with (e.g., IntelNews/NEWS-060520151900).  |
| **IPAddressType** | - IPAddressType/HtranDestinationNode: An IP address with this label is being used as a destination address with the HTran Proxy Tool.<br/>- IPAddressType/HtranProxy: An IP address with this label is being used as a relay or proxy node with the HTran Proxy Tool.<br/>- IPAddressType/LegitimateCompromised: It is suspected an IP address with this label is compromised by malicious actors.<br/>- IPAddressType/Parking: IP address is likely being used as a parking IP address.<br/>- IPAddressType/PopularSite: IP address could be utilized for a variety of purposes and may appear more frequently than other IPs.<br/>- IPAddressType/SharedWebHost: IP address may be hosting more than one website.<br/>- IPAddressType/Sinkhole: IP address is likely a sinkhole being operated by a security researcher or vendor.<br/>- IPAddressType/TorProxy: IP address is acting as a TOR (The Onion Router) proxy. |
| **Status**        | - Status/ConfirmedActive: Indicator is likely to be currently supporting malicious activity.<br/>- Status/ConfirmedInactive: Indicator is no longer used for malicious purposes.                                            |
| **Target**        | The activity associated with this indicator is known to target the indicated vertical sector:<br/>- Aerospace<br/>- Agricultural<br/>- Chemical<br/>- Defense<br/>- Dissident<br/>- Energy<br/>- Extractive<br/>- Financial<br/>- Government<br/>- Healthcare<br/>- Insurance<br/>- InternationalOrganizations<br/>- Legal<br/>- Manufacturing<br/>- Media<br/>- NGO<br/>- Pharmaceutical<br/>- Research<br/>- Retail<br/>- Shipping<br/>- Technology<br/>- Telecom<br/>- Transportation<br/>- Universities |
| **ThreatType**    | - ThreatType/ClickFraud: Indicator is used by actors engaging in click or ad fraud.<br/>- ThreatType/Commodity: Indicator is used with commodity-type malware such as Zeus or Pony Downloader.<br/>- ThreatType/PointOfSale: Indicator is associated with activity targeting point-of-sale machines such as AlinaPoS or BlackPoS.<br/>- ThreatType/Ransomware: Indicator is associated with ransomware malware such as Cryptolocker or Cryptowall.<br/>- ThreatType/Suspicious: Indicator is not currently associated with a known threat type but should be considered suspicious.<br/>- ThreatType/Targeted: Indicator is associated with a known actor suspected to be associated with a nation-state such as DEEP PANDA or ENERGETIC BEAR.<br/>- ThreatType/TargetedCrimeware: Indicator is associated with a known actor suspected to be engaging in criminal activity. |
| **Vulnerability** | The CVE-XXXX-XXX vulnerability the indicator is associated with (e.g., [CVE-2012-0158](https://intelapi.crowdstrike.com/indicator/v1/search/labels?equal=vulnerability/CVE-2012-0158)).                                         |

## FAQs

### How often do you refresh the threat feed from CrowdStrike?

The database is updated once per day. We have implemented a multi-layer cache for performance enhancements rather than returning to the master database on each query.

### Can I export all of the threats from Sumo Logic?

No, we do not allow an export of the threat Intel feeds as that is confidential to CrowdStrike. However, we will match lookups from your logs against the entire threat database. You will ONLY see data returned when you have a match against the database to a specific threat from your log data (for example, IP, domain, email, etc.) via the lookup operator.

### Is threat lookup real-time using Continuous Queries (CQs)?

Yes. You can scan for malicious Indicators of Compromise (IoCs) in real time [using the lookup search operator](/docs/security/threat-intelligence/find-threats/#use-the-lookup-search-operator).

### Can I historically search my logs for threats?

Yes, you can search any log data that is still retained and searchable using the Sumo Logic platform. However, we suggest that you break up historical searches into smaller and more manageable chunks based on time range and/or source category for performance reasons.

### If I do not see any results in any dashboard, is that a bad thing?

No. No results in your dashboards can mean that nothing has been identified by CrowdStrike as a threat, verified or unverified.

It could be a case-sensitivity issue. In Sumo Logic, the equal sign (`=`) and the not equal to sign (`!=`) conditions are case-sensitive. When you use them with Sumo Logic operators you may need to convert the string to which the condition is applied to upper or lower case. For more information, see [Using toLowerCase or toUpperCase with an equating condition](/docs/search/search-query-language/search-operators/tolowercase-touppercase/#using-tolowercaseor-touppercase-with-an-equating-condition).

### I found an IoC in VirusTotal (or any other third-party threat feed), but why can’t I find that IoC in CrowdStrike using the Sumo Logic lookup?

CrowdStrike focuses on quality versus quantity when it comes to threat assessment. They have a dedicated intel team that does that work. A threat from a third-party feed may not be present in CrowdStrike threats because it has been rejected by the CrowdStrike intel assessment team.

### I found threats in my network, now what do I do? How do I get more context about threats?

The next step would be to look at the raw JSON field from the query. Fields such as `ip_address_types`, `labels`, `relations`, and `malware_families` in the JSON object provide more contextual information about threats.

```
{
"indicator": "104.198.196.36",
 "type": "ip_address",
 "last_updated": 1476946769,
 "published_date": 1476946767,
 "malicious_confidence": "unverified",
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

With the malware family and other information, you can search the internet for more as there is often data readily available on known threats. In addition, if you would like more robust information, you can contact CrowdStrike directly and purchase individual reports or discuss upgrading to CrowdStrike Premium which includes more detailed reports.
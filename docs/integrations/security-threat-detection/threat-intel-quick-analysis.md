---
id: threat-intel-quick-analysis
title: Threat Intel Quick Analysis
sidebar_label: Threat Intel Quick Analysis
description: The Threat Intel Quick Analysis App correlates CrowdStrike's threat intelligence data with your own log data, providing security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/threatintel.png')} alt="thumbnail icon" width="75"/>

The Threat Intel Quick Analysis App correlates [CrowdStrike's](https://www.crowdstrike.com/sumologic/) threat intelligence data with your own log data, providing security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks. The Threat Intel Quick Analysis App scans selected logs for threats based on **IP**, **URL**, **domain, Hash 256,** and** email**.


## Log Types

The Threat Intel Quick Analysis App can be used for any type of logs, regardless of format. Ideal log sources should include **IP**, **URL**, **domain**, **Hash 256**, and/or **email** information.


## Installing the Threat Intel Quick Analysis App

This app contains generic regex expressions and thus may not perform well at very large scale. Once you are familiar with Sumo Logic, you can apply performance optimization techniques as described in [Threat Intel Optimization](#threat-intel-optimization). Alternatively, you can run this app on smaller and more specific data streams.

This section provides instructions on how to install the Threat Intel Quick Analysis App, and examples of each of dashboards. The preconfigured searches and dashboards provide easy-to-access visual insights into your data.

{@import ../../reuse/apps/app-install.md}

## Threat Intel Optimization

The Threat Intel Quick Analysis App provides baseline queries. You can further optimize and enhance these queries for the log and events types being scanned for threats. Use the following guidelines to customize your Threat Intel queries:

* Filter out unwanted logs before you use Threat Intel lookup operator
* Use keywords
* Use the `where` operator
* Use general search optimization [rules](/docs/search/get-started-with-search/build-search/best-practices-search.md)

For example:

```sql
_sourceCategory=cylance "IP Address"
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| where !isNull(ip_address)
| where ip_address != "0.0.0.0" and ip_address != "127.0.0.1"
| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=ip_address
```

### Field Extraction Rule

Use Field Extraction Rules (FER) to parse fields from your log messages at the time the messages are ingested, which eliminates the need to parse fields at the query level. Use these parsed fields along with Threat Intel Lookup operator.

1. Create the FER For example, for Cylance Security Events, create and use the following [FER:](/docs/manage/field-extractions/create-field-extraction-rule)
```sql
parse "Event Type: *, Event Name: *, Device Name: *, IP Address: (*, *), File Name: *, Path: *, Drive Type: *, SHA256: *, MD5: *, Status: *, Cylance Score: *, Found Date: *, File Type: *, Is Running: *, Auto Run: *, Detected By: *" as event_type,event_name,device_name,src_ip,dest_ip,file_name,path,drive_type,sha,md5,status,score,found,file_type,isRunning,autoRun,detected
```

2. Customize your query so you can use parsed fields from FER with the Threat Intel Lookup operator, where `src_ip` is the parsed field from FER (see step # 1). For example:
```
| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=src_ip
| json field=raw "labels[*].name" as label_name
| replace(label_name, "\\/","->") as label_name
| replace(label_name, "\""," ") as label_name
| where  type="ip_address" and !isNull(malicious_confidence)
| if (isEmpty(actor), "Unassigned", actor) as Actor
| count as threat_count by src_ip, malicious_confidence, Actor,  _source, label_name
| sort by threat_count
```


### Scheduled View

Use scheduled views with the Threat Lookup operator to find threats. Scheduled View reduces aggregate data down to the bare minimum, so they contain only the raw results that you need to generate your data. Queries that run against Scheduled Views return search results much faster because the data is pre-aggregated before the query is run. And a Scheduled View query runs continuously, once per minute.

1. Create a scheduled view. For example, for Cylance, create a scheduled view, **cylance_threat**:
```
_sourceCategory=cylance | lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=src_ip \
| json field=raw "labels[*].name" as label_name \
| replace(label_name, "\\/","->") as label_name \
| replace(label_name, "\""," ") as label_name \
| where  type="ip_address" and !isNull(malicious_confidence) \
| if (isEmpty(actor), "Unassigned", actor) as Actor \
| lookup latitude, longitude, country_code, country_name, region, city, postal_code, area_code, metro_code from geo://default on ip = src_ip \
| count as threat_count by src_ip, malicious_confidence, Actor,  _source, label_name, city, country_name, raw
```

2. Now, you can run your Threat Intel query on top of this view:
```sql
_view=cylance_threat \
| count by src_ip
```


## Threat Intel FAQ

#### What is the CrowdStrike Integration for Sumo Logic?

Sumo Logic has expanded its security offerings by allowing customers to analyze their logs for potential threats and indicators of compromise. In partnership with CrowdStrike, Sumo Logic maintains an updated Threat Intelligence database that can be correlated with log data through queries. The Sumo Logic / CrowdStrike integration has two parts:

* Sumo Logic maintains an up-to-date copy of CrowdStrike’s threat database.
* Sumo customers can now use the CrowdStrike database in threat analysis queries over their logs (through a new lookup operator).

The Sumo Logic Threat Intel lookup database is only available with Sumo Logic Enterprise and Professional accounts, or during a 30-day trial period. The Threat Intel lookup database is not available for Sumo Logic Free accounts.



#### What does the Threat Intel Quick Analysis App do?

This App scans all Sumo logs and parses (using regex) IP/Email/URL/Domain/File Name fields for comparison against the threat feed from CrowdStrike. Think of it as an Inner Join between parsed fields and the threat table.

This application can be slow to load depending on the volume of data you scan based on time, source category, etc.  We **highly recommend** that you apply additional filter conditions as you screen your logs or run these types of searches on a schedule.



#### How often do you refresh the threat feed from CrowdStrike?

The database is updated once per day. We have implemented a multi-layer cache for performance enhancements rather than returning to the master database on each query.


#### Can I export all of the threats from Sumo Logic?

No, we do not allow an export of the threat Intel feeds as that is confidential to CrowdStrike. However, we will match lookups from your logs against the entire threat database. You will ONLY see data returned when you have a match against the database to a specific threat from your log data (e.g IP, domain, email, etc.) via the threat lookup operator.


#### Is threat lookup real-time using Continuous Queries (CQs)?

Yes. You can scan for malicious Indicators of Compromise (IOCs) in real time using our [lookup](/docs/search/search-query-language/search-operators/lookup-classic) operator.


#### Can I historically search my logs for threats?

Yes, you can search any log data that is still retained and searchable using the Sumo Logic Platform. However, we suggest customers break up historical searches into smaller and more manageable chunks based on time range and/or source category for performance reasons.


#### If I don't see any results in any Dashboard, is that a bad thing?

No. No results in your Dashboards can mean that nothing has been identified by CrowdStrike as a threat, verified or unverified.


#### I searched a threat feed for a hash IOC that I know exists, but it wasn't found. Why?

It could be a case-sensitivity issue. In Sumo, the equal sign (`=`) and the not equal to sign (`!=`) conditions are case-sensitive; when you use them with Sumo operators you may need to convert the string to which the condition is applied to upper or lower case. For more information, see [Using toLowerCase or toUpperCase with an equating condition](/docs/search/search-query-language/search-operators/tolowercase-touppercase).


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

<table><small>
  <tr>
   <td>
    IOC Type
   </td>
   <td>
    IOC
   </td>
  </tr>
  <tr>
   <td>
    SHA256
   </td>
   <td>
    6c1bce76f4d2358656132b6b1d471571820688ccdbaca0d86d0ca082b9390536
   </td>
  </tr>
  <tr>
   <td>
    SHA256
   </td>
   <td>
    b101cd29e18a515753409ae86ce68a4cedbe0d640d385eb24b9bbb69cf8186ae
   </td>
  </tr>
  <tr>
   <td>
    IP Address
   </td>
   <td>
    84.112.91.96
   </td>
  </tr>
  <tr>
   <td>
    IP Address
   </td>
   <td>
    158.69.196.112
   </td>
  </tr>
  <tr>
   <td>
    File
   </td>
   <td>
    updater.exe
   </td>
  </tr>
  <tr>
   <td>
    File
   </td>
   <td>
    0.exe
   </td>
  </tr>
  <tr>
   <td>
    URL
   </td>
   <td>
    <a href="http://tycahatit.ru/zapoy/gate.php">http://tycahatit.ru/zapoy/gate.php</a>
   </td>
  </tr>
  <tr>
   <td>
    URL
   </td>
   <td>
    <a href="http://ningwitjohnno.ru/zapoy/gate.php">http://ningwitjohnno.ru/zapoy/gate.php</a>
   </td>
  </tr>
  <tr>
   <td>
    Domain
   </td>
   <td>
    9jdco01e.ru
   </td>
  </tr>
  <tr>
   <td>
    Domain
   </td>
   <td>
    ningwitjohnno.ru
   </td>
  </tr>
  <tr>
   <td>
    Email
   </td>
   <td>
    sherigerber@mail.ru
   </td>
  </tr>
  <tr>
   <td>
    Email
   </td>
   <td>
    nosiwdcd5@outlook.com
   </td>
  </tr>
  <tr>
   <td>
    Hash MD5
   </td>
   <td>
    9da2a54e98ddb9a0adb4ace3dda4d8e0
   </td>
  </tr>
  <tr>
   <td>
    Hash MD5
   </td>
   <td>
    832efb3fce4b1e16d610d5856f1401bb
   </td>
  </tr></small>
</table>

#### Do IOCs and Threats expire?

IOCs and Threats will often remain in the system because an IOC, such as an IP address, could go dormant and they reappear as part of another threat. The last valid one can be found under **labels** > **Last_valid_on**. Be aware that over the period, their Malicious Confidence can be downgraded or upgraded depending upon recent activity.


#### I found an IOC in VirusTotal (or any other third-party threat feed), but I can’t find that IOC in CrowdStrike using the Sumo Logic Lookup?

CrowdStrike focuses on quality versus quantity when it comes to threat assessment. They have a dedicated Intel Team which does that work. A threat from a third-party feed may not be present in CrowdStrike threats because it has been rejected by the CrowdStrike Intel assessment Team.


#### I found threats in my network, now what do I do? How do I get more context about threats?

The next step would be to look at the raw JSON field from the query. Fields such as ip_address_types, labels, relations, and malware_families in the JSON object provide more contextual information about threats.


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

With the malware family and other information, the user can search the internet for more as there is often data readily available on known threats. In addition, if the users would like more robust information, they can contact CrowdStrike directly and purchase individual reports or discuss upgrading to CrowdStrike Premium which includes more detailed reports.


#### What are Actors?

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


#### What is Unverified Malicious Confidence?

About 20% of the indicators are unverified. These unverified threats may be real threats, but the CrowdStrike team has not been able to assign a confidence level to them, so they remain in the unverified state.

Unverified is usually an IP address related to a known bad adversary (like Deep Panda) and it’s an IP that was used at some point in that campaign. As we all know - IPs are dynamic. While Deep Panda utilized IP 201.22.52.32 at some point, it doesn’t mean that IP should be marked as bad or a threat, so we label it unverified. It’s more informational than actionable. CrowdStrike is looking at better ways to vet those IPs, for now it’s unverified. CrowdStrike advises customers not to do anything with those IPs unless they’re seeing malicious activity from one of them. If the state is ever updated, CrowdStrike will change the “last updated” timestamp and the new state will appear. In the meantime, users should treat them as possible candidates for analysis.

CrowdStrike recommends that you start with the highest priority and work down the chain.


#### I already have parsed fields such as IPs, domain, URL, Email, or File Name. Can I use them with this App, instead of parsing each log line again?

Yes, you can customize the query with in the App. For example:

```
_sourceCategory= */*/FIREWALL or _sourceCategory=*/*/LB or _sourceCategory=*/*/ROUTER or _sourceCategory=*/*/WINDOWS or _sourceCategory=*/*/SERVER
| where Your_IP != "0.0.0.0" and Your_IP != "127.0.0.1"
| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=Your_IP
| where  type="ip_address" and !isNull(malicious_confidence)
| if (isEmpty(actor), "Unassigned", actor) as Actor
| count by Actor
```



#### Should I use all logs (`*`) with this App or subset of logs, what's the recommendation?

You can use (`*`) to scan all of your ingested logs for threat, but depending on the volume of logs it can impact the performance of the search query and the App.

For optimal performance, use a subset of the logs. For example:
```
_sourceCategory= */*/FIREWALL or _sourceCategory=*/*/LB or _sourceCategory=*/*/ROUTER or _sourceCategory=*/*/WINDOWS or _sourceCategory=*/*/SERVER
```

#### I am seeing noisy results in the lookup service, what do I do?

* Use filters to remove as much of the noise as possible (eg use the NOT clause before passing tuples to the lookup operator)
* Use the "labels" section of the raw field to retain results of interest, or throw away results that are not useful. For example, IPs related labels `TorProxy` or `njRAT` can be noisy and filtered out by customizing queries like:

```
| parse regex "(?\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| where ip_address != "0.0.0.0" and ip_address != "127.0.0.1"
| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=ip_address
| json field=raw "labels[*].name" as label_name
| replace(label_name, "\\/","->") as label_name
| replace(label_name, "\""," ") as label_name
| where type="ip_address" and !isNull(malicious_confidence)
| where !(label_name matches "*TorProxy*")
| if (isEmpty(actor), "Unassigned", actor) as Actor
| count by ip_address, malicious_confidence, Actor,  _source, label_name
| sort by _count
```


Threat Intel App is a good starting point, but every customer will have to customize the queries powering the app for their own particular use.


#### Can I use Scheduled Search with Threat Lookup service? If yes, what is the Run Frequency (time) I can use?

Yes, you can run scheduled searches that can be set up with a run frequency of Real Time or a longer time interval if desired.


#### Can I bring my own threat feed into Sumo Logic?

This isn't currently available as an App. You could create your own [lookup](/docs/search/search-query-language/search-operators/lookup-classic) using a shared file.


#### What do I do if I find a bad IP (malicious level = high)?

You can further investigate bad IP triggers by updating your query to check the port as well and see if it is also identified as a malicious port.


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

**Data Type: **Timestamp in standard Unix time, UTC.<br/>
**Description: **This is the date the indicator was last updated in CrowdStrike internal database.

---
#### `malware_family`

**Data Type:** string<br/>
**Description: **Indicates the malware family an indicator has been associated with. An indicator may be associated with more than one malware family. The malware family list is also represented under the labels list in the JSON data structure.

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

<table><small>
  <tr>
   <td>
<strong>IOC Type</strong>
   </td>
   <td><strong>Values</strong>
   </td>
  </tr>
  <tr>
   <td><strong>DomainType</strong>
   </td>
   <td>
<ul>

<li>DomainType/ActorControlled—It is believed the malicious actor is still in control of this domain.</li>

<li>DomainType/DGA—Domain is the result of malware utilizing a domain generation algorithm.</li>

<li>DomainType/DynamicDNS—Domain is owned or used by a dynamic DNS service.</li>

<li>DomainType/DynamicDNS/Afraid—Domain is owned or used by the Afraid.org dynamic DNS service.</li>

<li>DomainType/DynamicDNS/DYN—Domain is owned or used by the DYN dynamic DNS service.</li>

<li>DomainType/DynamicDNS/Hostinger—Domain is owned or used by the Hostinger dynamic DNS service.</li>

<li>DomainType/DynamicDNS/noIP—Domain is owned or used by the NoIP dynamic DNS service.</li>

<li>DomainType/DynamicDNS/Oray—Domain is owned or used by the Oray dynamic DNS service.</li>

<li>DomainType/KnownGood—Domain itself (or the domain portion of a URL) is known to be legitimate, despite having been associated with malware or malicious activity.</li>

<li>DomainType/LegitimateCompromised—Domain does not typically pose a threat but has been compromised by a malicious actor and may be serving malicious content.</li>

<li>DomainType/PhishingDomain—Domain has been observed to be part of a phishing campaign.</li>

<li>DomainType/Sinkholed—Domain is being sinkholed, likely by a security research team. This indicates that, while traffic to the domain likely has a malicious source, the IP address to which it is resolving is controlled by a legitimate 3rd party. It is no longer believed to be under the control of the actor.</li>

<li>DomainType/StrategicWebCompromise—While similar to the DomainType/LegitimateCompromised label, this label indicates that the activity is of a more targeted nature. Often, targeted attackers will compromise a legitimate domain that they know to be a watering hole frequently visited by the users at the organizations they are looking to attack.</li>

<li>DomainType/Unregistered—Domain is not currently registered with any registrars.</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>EmailAddressType</strong>
   </td>
   <td>EmailAddressType/DomainRegistrant—Email address has been supplied in the registration information for known malicious domains.
<p>EmailAddressType/SpearphishSender—Email address has been used to send spearphishing emails.</p>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td><strong>IntelNews</strong>: The Intel Flash Report ID an indicator is associated with (For example, IntelNews/NEWS-060520151900).
   </td>
  </tr>
  <tr>
   <td><strong>IPAddressType</strong>
   </td>
   <td>
<ul>
<li>IPAddressType/HtranDestinationNode—An IP address with this label is being used as a destination address with the HTran Proxy Tool.</li>

<li>IPAddressType/HtranProxy—An IP address with this label is being used as a relay or proxy node with the HTran Proxy Tool.</li>

<li>IPAddressType/LegitimateCompromised—It is suspected an IP address with this label is compromised by malicious actors.</li>

<li>IPAddressType/Parking—IP address is likely being used as parking IP address.</li>

<li>IPAddressType/PopularSite—IP address could be utilized for a variety of purposes and may appear more frequently than other IPs.</li>

<li>IPAddressType/SharedWebHost—IP address may be hosting more than one website.</li>

<li>IPAddressType/Sinkhole—IP address is likely a sinkhole being operated by a security researcher or vendor.</li>

<li>IPAddressType/TorProxy—IP address is acting as a TOR (The Onion Router) Proxy Malware/PoisonIvy Malware/Zeus Malware/DarkComet
</li>
</ul></td>
  </tr>
  <tr>
   <td><strong>Status</strong></td>
   <td>
<ul>

<li>Status/ConfirmedActive—Indicator is likely to be currently supporting malicious activity</li>
<li>Status/ConfirmedInactive—Indicator is no longer used for malicious purposes.</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Target</strong>
   </td>
   <td>The activity associated with this indicator is known to target the indicated vertical sector, which could be any of the following:
<ul>
<li>Target/Aerospace Target/Agricultural Target/Chemical</li>
<li>Target/Defense</li>
<li>Target/Dissident</li>
<li>Target/Energy</li>
<li>Target/Extractive</li>
<li>Target/Financial</li>
<li>Target/Government</li>
<li>Target/Healthcare</li>
<li>Target/Insurance</li>
<li>Target/InternationalOrganizations</li>
<li>Target/Legal</li>
<li>Target/Manufacturing</li>
<li>Target/Media</li>
<li>Target/NGO</li>
<li>Target/Pharmaceutical</li>
<li>Target/Research</li>
<li>Target/Retail</li>
<li>Target/Shipping</li>
<li>Target/Technology</li>
<li>Target/Telecom</li>
<li>Target/Transportation</li>
<li>Target/Universities</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>ThreatType</strong>
   </td>
   <td>
<ul>
<li>ThreatType/ClickFraud—Indicator is used by actors engaging in click or ad fraud.</li>
<li>ThreatType/Commodity—Indicator is used with commodity type malware such as Zeus or Pony Downloader.</li>
<li>ThreatType/PointOfSale—Indicator is associated with activity known to target point-of-sale machines such as AlinaPoS or BlackPoS.</li>
<li>ThreatType/Ransomware—Indicator is associated with ransomware malware such as Crytolocker or Cryptowall.</li>
<li>ThreatType/Suspicious—Indicator is not currently associated with a known threat type but should be considered suspicious.</li>
<li>ThreatType/Targeted—Indicator is associated with a known actor suspected to associated with a nation-state such as DEEP PANDA or ENERGETIC BEAR.</li>
<li>ThreatType/TargetedCrimeware—Indicator is associated with a known actor suspected to be engaging in criminal activity such as WICKED SPIDER.
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Vulnerability</strong>
   </td>
   <td>The CVE-XXXX-XXX vulnerability the indicator is associated with (e.g., <a href="https://intelapi.crowdstrike.com/indicator/v1/search/labels?equal=vulnerability/CVE-2012-0158">https://intelapi.crowdstrike.com/ind.../CVE-2012-0158</a>)</td>
  </tr></small>
</table>


## Viewing Threat Intel Quick Analysis Dashboards

All Dashboards include filters that you can use in Interactive Mode for further analysis of your Threat Intel Quick Analysis data. Because the Threat Intel Quick Analysis has the most bearing on recent threats, most panels are set to the 15 minute time range. You can adjust time ranges as needed.

Live mode and real-time queries are not supported for dashboards at this time.

### Overview

See the frequency of Domain threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_Overview_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Welcome to the Threat Intel Quick Analysis App.** Informational panel to help you find information on [optimization](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#02_Threat-Intel-Optimization) and [FAQs](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#03_Threat-Intel-FAQ) on working with the Threat Intel database.
* **Number of Log Lines (Events) Scanned for Threats.** Count of log lines scanned across all selected sources for the last 15 minutes.  
* **IP Threat Count.** Count of threats related to malicious IPs, for the last 15 minutes.
* **File Name Threat Count.** Count of threats related to malicious file names, for the last 15 minutes.  
* **URL Threat Count. **Count of threats related to malicious URLs, for the last 15 minutes.  
* **Email Threat Count.** Count of threats related to malicious email addresses, for the last 15 minutes.  
* **Domain Threat Count. **Count of threats related to malicious domains, for the last 15 minutes.  
* **Threats by Malicious Confidence. ** Qualifies all threats into High, Medium, Low, Unverified, according to CrowdStrike's machine learning engine.


### Domain

See the frequency of Domain threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_Domain_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of threats related to malicious domains, for the last 15 minutes.  
* **Threats by Malicious Confidence.** Qualifies domain threats into High, Medium, Low, Unverified, according to CrowdStrike's machine learning engine.  
* **Threats by Actor.** Count of threats related to malicious domains, broken by Actors, for the last 15 minutes. [Actors](https://www.crowdstrike.com/blog/meet-the-adversaries/) are identified individuals, groups or nation-states associated to threats.
* **Threats by Sources.** Count of threats related to malicious domains, broken by Sources, for the last 15 minutes.  
* **Threats Over Time.** Trends of domain threats over time for the last 60 minutes.  
* **Threats Over Time by Sources. **Trends of domain threats over time, broken by Sources for the last 60 minutes.  
* **Threats Table.** Listing of all domain threats, including Malicious Confidence, Actors and Sources.   

### Email

See the frequency of Email threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_Email_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of threats related to malicious emails addresses, for the last 15 minutes.  
* **Threats by Malicious Confidence.** Qualifies email address threats into High, Medium, Low, Unverified, according to CrowdStrike's machine learning engine.  
* **Threat Breakdown by Sources.** Count of threats related to malicious email addresses, broken by Sources, for the last 15 minutes.  
* **Threats Over Time.** Trends of email address threats over time for the last 60 minutes.  
* **Threats Over Time by Sources. **Trends of email address threats over time, broken by Sources for the last 60 minutes.  
* **Threats by Actor. **Count of threats related to malicious email addresses, broken by Actors, for the last 15 minutes. [Actors](https://www.crowdstrike.com/blog/meet-the-adversaries/) are identified individuals, groups or nation-states associated to threats.
* **Threats Table.** Listing of all domain threats, including Malicious Confidence, Actors and Sources.


### IP

See the frequency of IP threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_IP_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of threats related to malicious IPs, for the last 15 minutes.  
* **Threats by Geo Location.** Count of threats related to malicious IPs, broken by geo location, for the last 15 minutes.
* **Threat Breakdown by Sources. **Count of threats related to malicious IPs, broken by Sources, for the last 15 minutes.  
* **Threats by Malicious Confidence.** Qualifies IP threats into High, Medium, Low, Unverified, according to CrowdStrike's machine learning engine.  
* **Threats by Actors. **Count of threats related to malicious IPs, broken by Actors, for the last 15 minutes. [Actors](https://www.crowdstrike.com/blog/meet-the-adversaries/) are identified individuals, groups or nation-states associated to threats.  
* **Threats Over Time.** Trends of IP threats over time for the last 60 minutes.  
* **Threats Table.** Listing of all IP threats, including Malicious Confidence, Actors and Sources.  
* **Threats Over Time by Sources. **Trends of IP threats over time, broken by Sources for the last 60 minutes.


### URL

See the frequency of URL threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_URL_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of threats related to malicious URLs, for the last 15 minutes.  
* **Threats by Sources. **Count of threats related to malicious URLs, broken by Sources, for the last 15 minutes.
* **Threats by Actors. **Count of threats related to malicious URLs, broken by Actors, for the last 15 minutes. [Actors](https://www.crowdstrike.com/blog/meet-the-adversaries/) are identified individuals, groups or nation-states associated to threats.
* **Threats by Malicious Confidence.** Qualifies URLP threats into High, Medium, Low, Unverified, according to CrowdStrike's machine learning engine.
* **Threats Over Time.** Trends of URL threats over time for the last 60 minutes.
* **Threats Over Time by Sources.** Trends of URL threats over time, broken by Sources for the last 60 minutes.
* **Threat Table. **Listing of threats identified by URL, including information on Malicious Confidence, Actors, Source, and count.


### Hash 256

See the frequency of Hash 256 threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_Hash256_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of total Hash 256 threats over the last 15 minutes.
* **Threats by Malicious Confidence.** Qualifies Hash 256 threats for the last 60 minutes  into High, Medium, Low, Unverified, according to CrowdStrike's machine learning engine and displayed as a pie chart.
* **Threat Breakdown by Sources.** Pie chart of Hash 256 threats over the last 60 minutes broken down by source.
* **Threats Over Time.** Line chart of the number of Hash 256 threats over the last 60 minutes.
* **Threat Breakdown by Source.** Line chart of the number of Hash 256 threats over the last 60 minutes, broken down by source.
* **Threats by Actor.** Identifies Actors, if any, that can be attributed to Hash 256 threats over the last 15 minutes. [Actors](https://www.crowdstrike.com/blog/meet-the-adversaries/) are identified individuals, groups or nation-states associated to threats.
* **Threat Table.** Aggregation Table of Hash 256 threats over the last 15 minutes.

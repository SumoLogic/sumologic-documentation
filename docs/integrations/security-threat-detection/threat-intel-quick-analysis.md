---
id: threat-intel-quick-analysis
title: Threat Intel Quick Analysis
sidebar_label: Threat Intel Quick Analysis
description: The Threat Intel Quick Analysis app correlates threat intelligence data with your own log data, providing security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/threatintel.png')} alt="thumbnail icon" width="75"/>

The Threat Intel Quick Analysis app correlates [threat intelligence](/docs/security/threat-intelligence/) data with your own log data, providing security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks. The Threat Intel Quick Analysis app scans selected logs for threats based on IP, URL, domain, SHA-256 hashes, and email.

## Log types

The Threat Intel Quick Analysis app can be used for any type of logs, regardless of format. Ideal log sources should include IP, URL, domain, SHA-256 hashes, and/or email information.

## Installing the Threat Intel Quick Analysis app

This app contains generic regex expressions and thus may not perform well at very large scale. Once you are familiar with Sumo Logic, you can apply performance optimization techniques as described in [Threat Intel optimization](#threat-intel-optimization). Alternatively, you can run this app on smaller and more specific data streams.

This section provides instructions on how to install the Threat Intel Quick Analysis app, and examples of each of dashboards. The preconfigured searches and dashboards provide easy-to-access visual insights into your data.

import AppInstallV2 from '../../reuse/apps/app-install-v2.md';

<AppInstallV2/>

## Threat Intel optimization

The Threat Intel Quick Analysis app provides baseline queries. You can further optimize and enhance these queries for the log and events types being scanned for threats. To see the queries, open a [dashboard in the app](#viewing-threat-intel-quick-analysis-dashboards), click the three-dot kebab in the upper-right corner of the dashboard panel, and select **Open in Log Search**.

Use the following guidelines to customize your Threat Intel queries:
* Filter out unwanted logs before you use lookup operator
* Use keywords
* Use the where operator
* Use general search optimization rules

For example:
```
_sourceCategory=cylance "IP Address"
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| where !isNull(ip_address)
| where ip_address != "0.0.0.0" and ip_address != "127.0.0.1"
| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=ip_address
```

<!-- Per DOCS-643, replace section content with this after `sumo://threat/cs` is replaced by `threatlookup`:

The app provides baseline queries that utilize the [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/) to look for threat intelligence data. To see the queries, open a [dashboard in the app](#viewing-threat-intel-quick-analysis-dashboards), click the three-dot kebab in the upper-right corner of the dashboard panel, and select **Open in Log Search**.

You can further optimize and enhance these queries for the log and events types being scanned for threats. Use the following guidelines to customize your threat intel queries:

* Filter out unwanted logs before you use the `threatlookup` search operator
* Use keywords
* Use the `where` operator
* Use general search optimization [rules](/docs/search/get-started-with-search/build-search/best-practices-search.md)

For example, here is the query used for the **Threat Count** panel in the [Threat Intel Quick Analysis - IP](#ip) dashboard:

```
_sourceCategory=<source-category-name>
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| where ip_address != "0.0.0.0" and ip_address != "127.0.0.1"
| count as ip_count by ip_address

| threatlookup singleIndicator ip_address

// normalize confidence level to a string
| if (_threatlookup.confidence >= 85, "high", if (_threatlookup.confidence >= 50, "medium", if (_threatlookup.confidence >= 15, "low", if (_threatlookup.confidence >= 0, "unverified", "unknown")))) as threat_confidence

// filter for threat confidence
| where  threat_confidence matches "*"

//rename to match threat_<foo> convention
| %"_threatlookup.actors" as threat_actors
| %"_threatlookup.type" as type
| %"_threatlookup.threat_type" as threat_type

//convert threat valid from to human readable time
| toLong(%"_threatlookup.valid_from" * 1000) as %"_threatlookup.valid_from"
| formatDate(%"_threatlookup.valid_from", "MM-dd-yyyy") as threat_valid_from

| where type matches "ipv4-addr*" and !isNull(threat_confidence)

| if (isEmpty(threat_actors), "Unassigned", threat_actors) as threat_actors

|sum (ip_count) as threat_count
```
-->

### Field Extraction Rule

Use [Field Extraction Rules (FER)](/docs/manage/field-extractions/create-field-extraction-rule) to parse fields from your log messages at the time the messages are ingested, which eliminates the need to parse fields at the query level. Use these parsed fields along with lookup operator.

1. Create the FER For example, for Cylance Security Events, create and use the following Field Extraction Rule:
   ```sql
   parse "Event Type: *, Event Name: *, Device Name: *, IP Address: (*, *), File Name: *, Path: *, Drive Type: *, SHA256: *, MD5: *, Status: *, Cylance Score: *, Found Date: *, File Type: *, Is Running: *, Auto Run: *, Detected By: *" as event_type,event_name,device_name,src_ip,dest_ip,file_name,path,drive_type,sha,md5,status,score,found,file_type,isRunning,autoRun,detected
   ```
1. Customize your query so you can use parsed fields from FER with the lookup operator, where src_ip is the parsed field from FER (see step # 1). For example:
   ```
   | lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=src_ip
   | json field=raw "labels[*].name" as label_name nodrop
   | replace(label_name, "\\/","->") as label_name
   | replace(label_name, "\""," ") as label_name
   | where  type="ip_address" and !isNull(malicious_confidence)
   | if (isEmpty(actor), "Unassigned", actor) as Actor
   | count as threat_count by src_ip, malicious_confidence, Actor,  _source, label_name
   | sort by threat_count
   ```
<!-- Per DOCS-643, replace the preceding step with the following after `sumo://threat/cs` is replaced by `threatlookup`:   
1. Customize your query so you can use parsed fields from the Field Extraction Rule with the [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/), where `src_ip` is the parsed field from the FER. For example:
   ```
   | threatlookup singleIndicator src_ip
   | parse regex field=%"_threatlookup.fields" "labels.[^.]+.name\":\"(?<label_name>[^\"]+)\""  multi
   | where (_threatlookup.type="ipv4-addr" or _threatlookup.type="ipv6-addr") and !isNull(_threatlookup.confidence)
   | if (isEmpty(_threatlookup.actors), "Unassigned", _threatlookup.actors) as Actor
   | count as threat_count by src_ip, malicious_confidence, Actor,  _source, label_name
   | sort by threat_count
   ```
-->

### Scheduled view

Use scheduled views with the threat lookup operator to find threats. Scheduled view reduces aggregate data down to the bare minimum, so they contain only the raw results that you need to generate your data. Queries that run against scheduled views return search results much faster because the data is pre-aggregated before the query is run. And a scheduled view query runs continuously, once per minute.

1. Create a scheduled view. For example, for Cylance, create a scheduled view, **cylance_threat**:
   ```
   _sourceCategory=cylance | lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=src_ip
   | json field=raw "labels[*].name" as label_name nodrop
   | replace(label_name, "\\/","->") as label_name
   | replace(label_name, "\""," ") as label_name
   | where  type="ip_address" and !isNull(malicious_confidence)
   | if (isEmpty(actor), "Unassigned", actor) as Actor
   | lookup latitude, longitude, country_code, country_name, region, city, postal_code, area_code, metro_code from geo://default on ip = src_ip
   | count as threat_count by src_ip, malicious_confidence, Actor,  _source,  label_name, city, country_name, raw
   ```
<!-- Per DOCS-643, replace the preceding code with the following after `sumo://threat/cs` is replaced by `threatlookup`:
2. Now, you can run your Threat Intel query on top of this view:
  ```sql
  _view=cylance_threat
  | count by src_ip
  ```

## Threat Intel FAQ

#### What is the CrowdStrike Integration for Sumo Logic?

Sumo Logic has expanded its security offerings by allowing customers to analyze their logs for potential threats and indicators of compromise. In partnership with CrowdStrike, Sumo Logic maintains an updated Threat Intelligence database that can be correlated with log data through queries. The Sumo Logic / CrowdStrike integration has two parts:

* Sumo Logic maintains an up-to-date copy of CrowdStrike’s threat database.
* Sumo customers can now use the CrowdStrike database in threat analysis queries over their logs (through a new lookup operator).

The Sumo Logic Threat Intel lookup database is only available with Sumo Logic Enterprise and Professional accounts, or during a 30-day trial period. The Threat Intel lookup database is not available for Sumo Logic Free accounts.


#### What does the Threat Intel Quick Analysis App do?

This app scans all Sumo logs and parses (using regex) IP/Email/URL/Domain/File Name fields for comparison against the threat feed from CrowdStrike. Think of it as an Inner Join between parsed fields and the threat table.

This application can be slow to load depending on the volume of data you scan based on time, source category, etc.  We **highly recommend** that you apply additional filter conditions as you screen your logs or run these types of searches on a schedule.


#### How often do you refresh the threat feed from CrowdStrike?

The database is updated once per day. We have implemented a multi-layer cache for performance enhancements rather than returning to the master database on each query.

=======
<!-- Replace the preceding code with the following after `sumo://threat/cs` is replaced by `threatlookup`:
   ```
    _sourceCategory=cylance
    | threatlookup singleIndicator src_ip
    | parse regex field=%"_threatlookup.fields" "labels.[^.]+.name\":\"(?<label_name>[^\"]+)\""  multi
    | where (_threatlookup.type="ipv4-addr" or _threatlookup.type="ipv6-addr") and !isNull(_threatlookup.confidence)
    | if (isEmpty(_threatlookup.actors), "Unassigned", _threatlookup.actors) as Actor
    | lookup latitude, longitude, country_code, country_name, region, city, postal_code, area_code, metro_code from geo://default on ip = src_ip
    | count as threat_count by src_ip, malicious_confidence, Actor,  _source,  label_name, city, country_name, raw
   ```
   -->
2. Now, you can run your Threat Intel query on top of this view:
     ```sql
     _view=cylance_threat
     | count by src_ip
     ```

<!-- Per DOCS-643, hide this FAQ section until after `sumo://threat/cs` is replaced by `threatlookup`:

## Threat Intel FAQ

#### What does the Threat Intel Quick Analysis app do?

This app uses the [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/) to scan all Sumo logs and parses (using regex) IP/Email/URL/Domain/File Name fields for comparison against the [threat intelligence](/docs/security/threat-intelligence/) data store in Sumo Logic. Think of it as an inner join between parsed fields and the threat table.

This application can be slow to load depending on the volume of data you scan based on time, source category, and so on.  We highly recommend that you apply additional filter conditions as you screen your logs or run these types of searches on a schedule.

#### Is threat lookup real-time using continuous queries (CQs)?

Yes. You can scan for malicious Indicators of Compromise (IOCs) in real time using our [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/).

#### Can I historically search my logs for threats?

Yes, you can search any log data that is still retained and searchable using the Sumo Logic Platform. However, we suggest you break up historical searches into smaller and more manageable chunks based on time range and/or source category for performance reasons.

#### If I do not see any results in any dashboard, is that a bad thing?

No. No results in your dashboards can mean that nothing has been identified as a threat, verified or unverified.

#### I searched a threat feed for a hash IOC that I know exists, but it wasn't found. Why?

It could be a case-sensitivity issue. In Sumo Logic, the equal sign (`=`) and the not equal to sign (`!=`) conditions are case-sensitive; when you use them with Sumo Logic operators you may need to convert the string to which the condition is applied to upper or lower case. For more information, see [Using toLowerCase or toUpperCase with an equating condition](/docs/search/search-query-language/search-operators/tolowercase-touppercase).

#### I already have parsed fields such as IPs, domain, URL, Email, or File Name. Can I use them with this App, instead of parsing each log line again?
Yes, you can customize the query in the app. For example:

```
_sourceCategory= */*/FIREWALL or _sourceCategory=*/*/LB or _sourceCategory=*/*/ROUTER or _sourceCategory=*/*/WINDOWS or _sourceCategory=*/*/SERVER
| where Your_IP != "0.0.0.0" and Your_IP != "127.0.0.1"
| threatlookup singleIndicator Your_IP
| where (_threatlookup.type="ipv4-addr" or _threatlookup.type="ipv6-addr") and !isNull(_threatlookup.confidence)
| if (isEmpty(_threatlookup.actors), "Unassigned", _threatlookup.actors) as Actor
| count by Actor
```

#### Should I use all logs (`*`) with this app or subset of logs?

You can use (`*`) to scan all of your ingested logs for threat, but depending on the volume of logs it can impact the performance of the search query and the app.

For optimal performance, use a subset of the logs. For example:
```
_sourceCategory= */*/FIREWALL or _sourceCategory=*/*/LB or _sourceCategory=*/*/ROUTER or _sourceCategory=*/*/WINDOWS or _sourceCategory=*/*/SERVER
```

#### I am seeing noisy results in the lookup service, what do I do?

* Use filters to remove as much of the noise as possible (for example, use the `NOT` clause before passing tuples to the lookup operator).
* Use the "labels" section of the raw field to retain results of interest, or throw away results that are not useful. For example, IPs related labels `TorProxy` or `njRAT` can be noisy and filtered out by customizing queries like:

```
| parse regex "(?\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| where ip_address != "0.0.0.0" and ip_address != "127.0.0.1"
| threatlookup singleIndicator ip_address
| parse regex field=%"_threatlookup.fields" "labels.[^.]+.name\":\"(?<label_name>[^\"]+)\""  multi
| where (_threatlookup.type="ipv4-addr" or _threatlookup.type="ipv6-addr") and !isNull(_threatlookup.confidence)
| where !(label_name matches "*TorProxy*")
| if (isEmpty(_threatlookup.actors), "Unassigned", _threatlookup.actors) as Actor
| if (_threatlookup.confidence >= 85, "high", if (_threatlookup.confidence >= 50, "medium", if (_threatlookup.confidence >= 15, "low", if (_threatlookup.confidence >= 0, "unverified", "Unknown")))) as malicious_confidence
| count by ip_address, malicious_confidence, Actor,  _source, label_name
| sort by _count
```

Threat Intel Quick Analysis app is a good starting point, but you will have to customize the queries powering the app for your own particular use.

#### Can I use Scheduled Search with threat lookup service? If yes, what is the Run Frequency (time) I can use?

Yes, you can run scheduled searches that can be set up with a run frequency of Real Time or a longer time interval if desired.

#### What do I do if I find a bad IP (malicious level = high)?

You can further investigate bad IP triggers by updating your query to check the port as well and see if it is also identified as a malicious port.

-->

## JSON configuration object

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


<table class="mt-responsive-table">
    <thead>
        <tr>
            <th class="mt-column-width-20" scope="col"><strong>IOC Type</strong></th>
            <th class="mt-column-width-80" scope="col"><strong>Values</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="mt-column-width-20" data-th="IOC Type"><strong>DomainType</strong></td><td class="mt-column-width-80" data-th="Values">
            <ul><li>DomainType/ActorControlled&mdash;It is believed the malicious actor is still in control of this domain.</li>
                <li>DomainType/DGA&mdash;Domain is the result of malware utilizing a domain generation algorithm.</li>
                <li>DomainType/DynamicDNS&mdash;Domain is owned or used by a dynamic DNS service.</li>
                <li>DomainType/DynamicDNS/Afraid&mdash;Domain is owned or used by the Afraid.org dynamic DNS service.</li>
                <li>DomainType/DynamicDNS/DYN&mdash;Domain is owned or used by the DYN dynamic DNS service.</li>
                <li>DomainType/DynamicDNS/Hostinger&mdash;Domain is owned or used by the Hostinger dynamic DNS service.</li>
                <li>DomainType/DynamicDNS/noIP&mdash;Domain is owned or used by the NoIP dynamic DNS service.</li>
                <li>DomainType/DynamicDNS/Oray&mdash;Domain is owned or used by the Oray dynamic DNS service.</li>
                <li>DomainType/KnownGood&mdash;Domain itself (or the domain portion of a URL) is known to be legitimate, despite having been associated with malware or malicious activity.</li>
                <li>DomainType/LegitimateCompromised&mdash;Domain does not typically pose a threat but has been compromised by a malicious actor and may be serving malicious content.</li>
                <li>DomainType/PhishingDomain&mdash;Domain has been observed to be part of a phishing campaign.</li>
                <li>DomainType/Sinkholed&mdash;Domain is being sinkholed, likely by a security research team. This indicates that, while traffic to the domain likely has a malicious source, the IP address to which it is resolving is controlled by a legitimate 3rd party. It is no longer believed to be under the control of the actor.</li>
                <li>DomainType/StrategicWebCompromise&mdash;While similar to the DomainType/LegitimateCompromised label, this label indicates that the activity is of a more targeted nature. Often, targeted attackers will compromise a legitimate domain that they know to be a watering hole frequently visited by the users at the organizations they are looking to attack.</li>
                <li>DomainType/Unregistered&mdash;Domain is not currently registered with any registrars.</li></ul></td>
        </tr>
        <tr>
            <td class="mt-column-width-20" data-th="IOC Type"><strong>EmailAddressType</strong></td><td class="mt-column-width-80" data-th="Values">
            <p>EmailAddressType/DomainRegistrant&mdash;Email address has been supplied in the registration information for known malicious domains.</p>
            <p>EmailAddressType/SpearphishSender&mdash;Email address has been used to send spearphishing emails.</p></td>
        </tr>
        <tr>
            <td class="mt-column-width-20" data-th="IOC Type">&nbsp;</td>
            <td class="mt-column-width-80" data-th="Values"><strong>IntelNews</strong>: The Intel Flash Report ID an indicator is associated with (For example, IntelNews/NEWS-060520151900).</td>
        </tr>
        <tr>
            <td class="mt-column-width-20" data-th="IOC Type">            <p><strong>IPAddressType</strong></p></td>
            <td class="mt-column-width-80" data-th="Values"><ul><li>IPAddressType/HtranDestinationNode&mdash;An IP address with this label is being used as a destination address with the HTran Proxy Tool.</li>
                <li>IPAddressType/HtranProxy&mdash;An IP address with this label is being used as a relay or proxy node with the HTran Proxy Tool.</li>
                <li>IPAddressType/LegitimateCompromised&mdash;It is suspected an IP address with this label is compromised by malicious actors.</li>
                <li>IPAddressType/Parking&mdash;IP address is likely being used as parking IP address.</li>
                <li>IPAddressType/PopularSite&mdash;IP address could be utilized for a variety of purposes and may appear more frequently than other IPs.</li>
                <li>IPAddressType/SharedWebHost&mdash;IP address may be hosting more than one website.</li>
                <li>IPAddressType/Sinkhole&mdash;IP address is likely a sinkhole being operated by a security researcher or vendor.</li>
                <li>IPAddressType/TorProxy&mdash;IP address is acting as a TOR (The Onion Router) Proxy Malware/PoisonIvy Malware/Zeus Malware/DarkComet</li></ul></td>
        </tr>
        <tr>
            <td class="mt-column-width-20" data-th="IOC Type"><strong>Status</strong></td>
            <td class="mt-column-width-80" data-th="Values"><ul><li>Status/ConfirmedActive&mdash;Indicator is likely to be currently supporting malicious activity</li><li>Status/ConfirmedInactive&mdash;Indicator is no longer used for malicious purposes.</li></ul></td>
        </tr>
        <tr>
            <td class="mt-column-width-20" data-th="IOC Type"><strong>Target</strong></td>
            <td class="mt-column-width-80" data-th="Values"><p>The activity associated with this indicator is known to target the indicated vertical sector, which could be any of the following:</p>
            <ul><li>Target/Aerospace Target/Agricultural Target/Chemical</li>
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
                <li>Target/Universities</li></ul></td>
        </tr>
        <tr>
            <td class="mt-column-width-20" data-th="IOC Type"><strong>ThreatType</strong></td><td class="mt-column-width-80" data-th="Values">
            <ul><li>ThreatType/ClickFraud&mdash;Indicator is used by actors engaging in click or ad fraud.</li>
                <li>ThreatType/Commodity&mdash;Indicator is used with commodity type malware such as Zeus or Pony Downloader.</li>
                <li>ThreatType/PointOfSale&mdash;Indicator is associated with activity known to target point-of-sale machines such as AlinaPoS or BlackPoS.</li>
                <li>ThreatType/Ransomware&mdash;Indicator is associated with ransomware malware such as Crytolocker or Cryptowall.</li>
                <li>ThreatType/Suspicious&mdash;Indicator is not currently associated with a known threat type but should be considered suspicious.</li>
                <li>ThreatType/Targeted&mdash;Indicator is associated with a known actor suspected to associated with a nation-state such as DEEP PANDA or ENERGETIC BEAR.</li>
                <li>ThreatType/TargetedCrimeware&mdash;Indicator is associated with a known actor suspected to be engaging in criminal activity such as WICKED SPIDER.</li></ul></td>
        </tr>
        <tr>
            <td class="mt-column-width-20" data-th="IOC Type"><br/><strong>Vulnerability</strong></td>
            <td class="mt-column-width-80" data-th="Values"><br/>The CVE-XXXX-XXX vulnerability the indicator is associated with (e.g., https://intelapi.crowdstrike.com/indicator/v1/search/labels?equal=vulnerability/CVE-2012-0158).</td>
        </tr>
    </tbody>
</table>

## Viewing Threat Intel Quick Analysis dashboards

All dashboards include filters that you can use in Interactive Mode for further analysis of your Threat Intel Quick Analysis data. Because the Threat Intel Quick Analysis has the most bearing on recent threats, most panels are set to the 15 minute time range. You can adjust time ranges as needed.

Live mode and real-time queries are not supported for dashboards at this time.

### Overview

See the frequency of Domain threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_Overview_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Welcome to the Threat Intel Quick Analysis App.** Informational panel to help you find information on working with the threat intelligence database.
* **Number of Log Lines (Events) Scanned for Threats.** Count of log lines scanned across all selected sources for the last 15 minutes.  
* **IP Threat Count.** Count of threats related to malicious IPs, for the last 15 minutes.
* **File Name Threat Count.** Count of threats related to malicious file names, for the last 15 minutes.  
* **URL Threat Count.** Count of threats related to malicious URLs, for the last 15 minutes.  
* **Email Threat Count.** Count of threats related to malicious email addresses, for the last 15 minutes.  
* **Domain Threat Count.** Count of threats related to malicious domains, for the last 15 minutes.  
* **Threats by Malicious Confidence.**  Qualifies all threats into High, Medium, Low, Unverified, according to Sumo Logic's machine learning engine.

### Domain

See the frequency of Domain threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_Domain_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of threats related to malicious domains, for the last 15 minutes.  
* **Threats by Malicious Confidence.** Qualifies domain threats into High, Medium, Low, Unverified, according to Sumo Logic's machine learning engine.  
* **Threats by Actor.** Count of threats related to malicious domains, broken down by Actors, for the last 15 minutes. Actors are identified individuals, groups or nation-states associated to threats.
* **Threats by Sources.** Count of threats related to malicious domains, broken by Sources, for the last 15 minutes.  
* **Threats Over Time.** Trends of domain threats over time for the last 60 minutes.  
* **Threats Over Time by Sources.** Trends of domain threats over time, broken by Sources for the last 60 minutes.  
* **Threats Table.** Listing of all domain threats, including Malicious Confidence, Actors and Sources.   

### Email

See the frequency of Email threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_Email_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of threats related to malicious emails addresses, for the last 15 minutes.  
* **Threats by Malicious Confidence.** Qualifies email address threats into High, Medium, Low, Unverified, according to Sumo Logic's machine learning engine.  
* **Threat Breakdown by Sources.** Count of threats related to malicious email addresses, broken by Sources, for the last 15 minutes.  
* **Threats Over Time.** Trends of email address threats over time for the last 60 minutes.  
* **Threats Over Time by Sources.** Trends of email address threats over time, broken by Sources for the last 60 minutes.  
* **Threats by Actor.** Count of threats related to malicious email addresses, broken by Actors, for the last 15 minutes. Actors are identified individuals, groups or nation-states associated to threats.
* **Threats Table.** Listing of all domain threats, including Malicious Confidence, Actors and Sources.

### IP

See the frequency of IP threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_IP_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of threats related to malicious IPs, for the last 15 minutes.  
* **Threats by Geo Location.** Count of threats related to malicious IPs, broken by geo location, for the last 15 minutes.
* **Threat Breakdown by Sources.** Count of threats related to malicious IPs, broken by Sources, for the last 15 minutes.  
* **Threats by Malicious Confidence.** Qualifies IP threats into High, Medium, Low, Unverified, according to Sumo Logic's machine learning engine.  
* **Threats by Actors.** Count of threats related to malicious IPs, broken by Actors, for the last 15 minutes. Actors are identified individuals, groups or nation-states associated to threats.  
* **Threats Over Time.** Trends of IP threats over time for the last 60 minutes.  
* **Threats Table.** Listing of all IP threats, including Malicious Confidence, Actors and Sources.  
* **Threats Over Time by Sources.** Trends of IP threats over time, broken by Sources for the last 60 minutes.

### URL

See the frequency of URL threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_URL_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of threats related to malicious URLs, for the last 15 minutes.  
* **Threats by Sources.** Count of threats related to malicious URLs, broken by Sources, for the last 15 minutes.
* **Threats by Actors.** Count of threats related to malicious URLs, broken by Actors, for the last 15 minutes. Actors are identified individuals, groups or nation-states associated to threats.
* **Threats by Malicious Confidence.** Qualifies URLP threats into High, Medium, Low, Unverified, according to Sumo Logic's machine learning engine.
* **Threats Over Time.** Trends of URL threats over time for the last 60 minutes.
* **Threats Over Time by Sources.** Trends of URL threats over time, broken by Sources for the last 60 minutes.
* **Threat Table.** Listing of threats identified by URL, including information on Malicious Confidence, Actors, Source, and count.

### Hash 256

See the frequency of SHA-256 threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_Hash256_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of total SHA-256 threats over the last 15 minutes.
* **Threats by Malicious Confidence.** Qualifies SHA-256 threats for the last 60 minutes  into High, Medium, Low, Unverified, according to Sumo Logic's machine learning engine and displayed as a pie chart.
* **Threat Breakdown by Sources.** Pie chart of SHA-256 threats over the last 60 minutes broken down by source.
* **Threats Over Time.** Line chart of the number of SHA-256 threats over the last 60 minutes.
* **Threat Breakdown by Source.** Line chart of the number of SHA-256 threats over the last 60 minutes, broken down by source.
* **Threats by Actor.** Identifies Actors, if any, that can be attributed to SHA-256 threats over the last 15 minutes. Actors are identified individuals, groups or nation-states associated to threats.
* **Threat Table.** Aggregation Table of SHA-256 threats over the last 15 minutes.

## Upgrading the Threat Intel Quick Analysis app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Threat Intel Quick Analysis app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

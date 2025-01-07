---
id: threat-intel-quick-analysis
title: Threat Intel Quick Analysis
sidebar_label: Threat Intel Quick Analysis
description: The Threat Intel Quick Analysis app correlates threat intelligence data with your own log data, providing security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/threatintel.png')} alt="thumbnail icon" width="75"/>

The Threat Intel Quick Analysis app correlates [threat intelligence](/docs/security/threat-intelligence/) data with your own log data, providing security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks. The Threat Intel Quick Analysis app scans selected logs for threats based on **IP**, **URL**, **domain, Hash 256,** and **email**.

## Log types

The Threat Intel Quick Analysis app can be used for any type of logs, regardless of format. Ideal log sources should include **IP**, **URL**, **domain**, **Hash 256**, and/or **email** information.

## Installing the Threat Intel Quick Analysis app

This app contains generic regex expressions and thus may not perform well at very large scale. Once you are familiar with Sumo Logic, you can apply performance optimization techniques as described in [Threat Intel Optimization](#threat-intel-optimization). Alternatively, you can run this app on smaller and more specific data streams.

This section provides instructions on how to install the Threat Intel Quick Analysis app, and examples of each of dashboards. The preconfigured searches and dashboards provide easy-to-access visual insights into your data.

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Threat Intel optimization

The Threat Intel Quick Analysis app provides baseline queries. You can further optimize and enhance these queries for the log and events types being scanned for threats. Use the following guidelines to customize your threat intel queries:

* Filter out unwanted logs before you use the [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/)
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
<!--
### Field Extraction Rule

Use [Field Extraction Rules (FER)]((/docs/manage/field-extractions/create-field-extraction-rule)) to parse fields from your log messages at the time the messages are ingested, which eliminates the need to parse fields at the query level. Use these parsed fields along with Threat Intel Lookup operator.

1. Create the FER For example, for Cylance Security Events, create and use the following Field Extraction Rule:
   ```sql
   parse "Event Type: *, Event Name: *, Device Name: *, IP Address: (*, *), File Name: *, Path: *, Drive Type: *, SHA256: *, MD5: *, Status: *, Cylance Score: *, Found Date: *, File Type: *, Is Running: *, Auto Run: *, Detected By: *" as event_type,event_name,device_name,src_ip,dest_ip,file_name,path,drive_type,sha,md5,status,score,found,file_type,isRunning,autoRun,detected
   ```
1. Customize your query so you can use parsed fields from the Field Extraction Rule with the [`threatlookup` search operator](/docs/search/search-query-language/search-operators/threatlookup/), where `src_ip` is the parsed field from the FER. For example:
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

### Scheduled view

Use scheduled views with the threat lookup operator to find threats. Scheduled view reduces aggregate data down to the bare minimum, so they contain only the raw results that you need to generate your data. Queries that run against scheduled views return search results much faster because the data is pre-aggregated before the query is run. And a scheduled view query runs continuously, once per minute.

1. Create a scheduled view. For example, for Cylance, create a scheduled view, **cylance_threat**:
   ```
   _sourceCategory=cylance | lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=src_ip
   | json field=raw "labels[*].name" as label_name
   | replace(label_name, "\\/","->") as label_name
   | replace(label_name, "\""," ") as label_name
   | where  type="ip_address" and !isNull(malicious_confidence)
   | if (isEmpty(actor), "Unassigned", actor) as Actor
   | lookup latitude, longitude, country_code, country_name, region, city, postal_code, area_code, metro_code from geo://default on ip = src_ip
   | count as threat_count by src_ip, malicious_confidence, Actor,  _source,  label_name, city, country_name, raw
   ```
1. Now, you can run your Threat Intel query on top of this view:
     ```sql
     _view=cylance_threat
     | count by src_ip
     ```
-->

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


#### Should I use all logs (`*`) with this app or subset of logs?

You can use (`*`) to scan all of your ingested logs for threat, but depending on the volume of logs it can impact the performance of the search query and the app.

For optimal performance, use a subset of the logs. For example:
```
_sourceCategory= */*/FIREWALL or _sourceCategory=*/*/LB or _sourceCategory=*/*/ROUTER or _sourceCategory=*/*/WINDOWS or _sourceCategory=*/*/SERVER
```
<!--
#### I am seeing noisy results in the lookup service, what do I do?

* Use filters to remove as much of the noise as possible (for example, use the `NOT` clause before passing tuples to the lookup operator).
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

Threat Intel Quick Analysis app is a good starting point, but you will have to customize the queries powering the app for your own particular use.
-->

#### Can I use Scheduled Search with threat lookup service? If yes, what is the Run Frequency (time) I can use?

Yes, you can run scheduled searches that can be set up with a run frequency of Real Time or a longer time interval if desired.

#### What do I do if I find a bad IP (malicious level = high)?

You can further investigate bad IP triggers by updating your query to check the port as well and see if it is also identified as a malicious port.

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

See the frequency of Hash 256 threats by Actor, Log Source, Malicious Confidence, and view trends over time.

<img src={useBaseUrl('img/integrations/security-threat-detection/TIQA_Hash256_Dashboard.png')} alt="Threat Intel Dashboard" />

* **Threat Count.** Count of total Hash 256 threats over the last 15 minutes.
* **Threats by Malicious Confidence.** Qualifies Hash 256 threats for the last 60 minutes  into High, Medium, Low, Unverified, according to Sumo Logic's machine learning engine and displayed as a pie chart.
* **Threat Breakdown by Sources.** Pie chart of Hash 256 threats over the last 60 minutes broken down by source.
* **Threats Over Time.** Line chart of the number of Hash 256 threats over the last 60 minutes.
* **Threat Breakdown by Source.** Line chart of the number of Hash 256 threats over the last 60 minutes, broken down by source.
* **Threats by Actor.** Identifies Actors, if any, that can be attributed to Hash 256 threats over the last 15 minutes. Actors are identified individuals, groups or nation-states associated to threats.
* **Threat Table.** Aggregation Table of Hash 256 threats over the last 15 minutes.

---
id: record-processing-pipeline
title: Record Processing Pipeline
sidebar_label: Record Processing Pipeline
description: How Cloud SIEM transforms incoming raw messages into records.
---

This topic describes how Cloud SIEM transforms incoming raw messages into records. For each message received, Cloud SIEM creates a record, or in rare cases, multiple records. 

## Overview of processing steps

A record contains the information from an incoming message, transformed and enhanced in a variety of ways to enable and enhance the Cloud SIEM rule evaluation process. The processing steps include:

* Key-value pairs are extracted from messages.
* Source-specific fields are mapped to Cloud SIEM schema attributes.
* The values of fields that contain usernames and hostnames, which vary considerably across message sources, are normalized to a standard format.
* Records are enriched with additional context information about the IP addresses, URLs, and domains in messages.
* Message fields are compared to match lists, typically used to define lists of trusted entities; when a match is found, attributes are added to the record to reflect that.
* Message fields are compared to suppressed lists, which are used to define field values that, when encountered in a message, prevent any rule that the message matches from firing.
* Message fields are compared to threat intel lists; when a match is found, attributes are added to the record to reflect that.

## Extract key-value pairs from messages

For each incoming message, Cloud SIEM creates a set of key-value pairs that reflect all of the information in the message. To accomplish this, Cloud SIEM provides these ingestion routes:

* **C2C Connector**. Sumo Logic’s Cloud-to-Cloud (C2C) Integration Framework is a fully-managed collection system that collects logs and events directly from SaaS and Cloud platforms. For a list of available C2C collectors, see [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).
* **Sumo Logic Parser**. For other data sources, the Sumo Logic’s built-in parsers that extract key-value pairs from messages. To see currently available parsers, go to Manage **Data > Logs > Parsers** in the Sumo Logic UI.  

For more information on these alternatives, see [Cloud SIEM Ingestion Best Practices](/docs/cse/ingestion/cse-ingestion-best-practices).

The key-value pairs are input to the next step of the process: mapping.

## Map message fields to schema attributes

The [mapping process](/docs/cse/schema/create-structured-log-mapping/) creates a record from the key-value pairs that were extracted from a message, and maps a subset of the keys to Cloud SIEM schema attributes. 

Mapping solves a particular problem: messages from different products use different names to identify users, applications, devices and so on. For example, some messages may refer to a source IP address as `sourceIP`, while others use `sourceIpAddress`. We need a standard set of names for the data that most messages are likely to contain. The [Cloud SIEM schema](/docs/cse/schema) defines that standard set of names. 

What’s the benefit of mapping? It results in records that use a common (standard) name for fields that hold the same sort of data, regardless of the source of the incoming message. The result: the same Cloud SIEM rule can be applied to all records, regardless of the message source.

## Normalize usernames and hostnames

[Username and hostname normalization](/docs/cse/schema/username-and-hostname-normalization/) is the process of transforming the value of record attributes that contain usernames and hostnames into a standard format. The normalized value replaces the non-normalized value in a record. The non-normalized values of hostname and usernames are retained in a `_raw` field in the record.

Why normalize? Assume Cloud SIEM receives messages with an email-type field "bob@bobsbaitshop.com" and username-type field  "bob". We can use normalization to transform "bob@bobsbaitshop.com" to "bob", allowing the username and email to be correlated together.

Normalization allows for common name forms among Active Directory, AWS, and fully qualified domain names to be normalized into a domain and username form.  
The values of the following schema attributes are normalized into a standard format, which replaces the non-normalized field value in the record.

* `device_hostname`
* `dstDevice_hostname`
* `fromUser_username`
* `srcDevice_hostname`
* `user_username`

## Entity Lookup Table processing

[Entity lookup tables](/docs/cse/records-signals-entities-insights/configure-entity-lookup-table) allow you to define your own hostname and username normalization rules. After the normalization described in the previous step is performed, any normalization you’ve configured in entity lookup tables is applied. 

## Enrich records with IP address, URL, and domain info

Cloud SIEM adds a number of enrichment attributes to records. Enrichment attributes are fields that provide extra context to the record based on attribute values encountered in a record. Specifically, Cloud SIEM adds enrichment attributes for IP addresses, URLs, and domains in a record.

## IP address enrichment

If a record contains `device_IP`, `srcDevice_ip`, or another field that contains an IP address,  it adds a set of geolocation attributes to the record, such as the ASN number and organization, the city and country where the IP address is located, and so on. 

The name of an enrichment attribute is formed by appending an underscore plus a string that identifies the enrichment attribute to the original attribute name. For example, if a record contains `device_IP,` the enrichment attributes look like `device_ip_asnNumber`, `device_ip_asnOrg`, `device_ip_city` and so on. 

## URL and domain enrichment

If a record contains `http_url` or another field that contains an URL, Cloud SIEM parses the URL and creates attributes to contain the URL components, like the protocol and top level domain fields. 

For both URLs and domains, Cloud SIEM adds a set of enrichment attributes to records, such as entropy calculations for the FQDN and root domain, the Alexa ranking, and so on. 

The name of each added attribute is formed by appending an underscore plus a string that identifies the enrichment attribute to the original attribute name. For example, the attributes added to a record that contains `http_url`, will look like `http_url_tld`, `http_url_protocol`, `http_url_alexaRank`, and so on. 

## Match list processing

Cloud SIEM’s match list feature allows you to leverage lists of important identifiers that, if they exist in an incoming message, indicate the message should be exempt from ordinary rule processing, or treated differently in some way. Typically, match lists are used to define “allow lists” of items, like IP addresses, URLs, and hostnames. Many Cloud SIEM rules reference match lists; the lists are predefined, and you populate them with indicators that exist in your environment. 

For example, vulnerability scanners often set off false alarms in security data, as they intentionally mimic the behavior of an attacker. Given that this behavior is safe and expected, you don’t want scanner activities to fire a rule. That’s what a match list is for. A Cloud SIEM analyst can populate a match list called “vuln_scanners” that contains the IP addresses of your scanners.

Cloud SIEM compares the contents of every message to your match lists. When it finds a match, it appends fields two fields to the record: `listMatches` and `matchedItems`. `listMatches` contains the names of lists that were matched against the record, and  `matchedItems` contains the actual key-value pairs that were matched. You can take advantage of the appended data in searches and rules. So, a Cloud SIEM rule can see from a record that matches a rule condition that the IP address in the record is on the  “vuln_scanners” match list, and thus know that the rule shouldn’t fire. For more information, see [Create a Match List](/docs/cse/match-lists-suppressed-lists/create-match-list).

## Suppressed list processing

Cloud SIEM's suppressed lists feature is similar to match lists. A suppressed list is a list of values of a particular field type, for example, an IP address or a file hash. When an incoming message contains a value found on a suppressed list, Cloud SIEM prevents any rules that the incoming message matches from firing.

## Threat intel processing

Cloud SIEM has another feature that is similar to match lists: threat intel. Like match lists, threat intel lists are lists of indicators and identifiers configured by a Cloud SIEM analyst. While similar to match lists, threat intel lists are intended for negative identifiers that should definitely fire a signal. So, whenever a rule detects a record field that matches an item on a threat intel list, it always results in a signal. 

Cloud SIEM’s threat intel list processing is similar to match list processing. Incoming messages are compared to all threat intel lists. When a match is found, Cloud SIEM updates the `listMatches` field in the record with the name of the matched threat list, the matching key-value pair from the message, and the string “threat”. For more information, see the [Threat Intelligence](/docs/cse/rules/about-cse-rules#threat-intelligence) section in the *About Cloud SIEM Rules* topic.  

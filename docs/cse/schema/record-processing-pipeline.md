---
id: record-processing-pipeline
title: Record Processing Pipeline
sidebar_label: Record Processing Pipeline
description: How CSE transforms incoming raw messages into Records.
---

This topic describes how CSE transforms incoming raw messages into Records. For each message received, CSE creates a Record, or in rare cases, multiple Records. 

## Overview of processing steps

A Record contains the information from an incoming message, transformed and enhanced in a variety of ways to enable and enhance the CSE rule evaluation process. The processing steps include:

* Key-value pairs are extracted from messages.
* Source-specific fields are mapped to CSE schema attributes.
* The values of fields that contain usernames and hostnames, which vary considerably across message sources, are normalized to a standard format.
* Records are enriched with additional context information about the IP addresses, URLs, and domains in messages.
* Message fields are compared to Match Lists, typically used to define lists of trusted entities; when a match is found, attributes are added to the Record to reflect that.
* Message fields are compared to Suppressed Lists, which are used to define field values that, when encountered in a message, prevent any rule that the message matches from firing.
* Message fields are compared to Threat Intel lists; when a match is found, attributes are added to the Record to reflect that.

## Extract key-value pairs from messages

For each incoming message, CSE creates a set of key-value pairs that reflect all of the information in the message. To accomplish this, CSE provides these ingestion routes:

* **C2C Connector**. Sumo Logic’s Cloud-to-Cloud (C2C) Integration Framework is a fully-managed collection system that collects logs and events directly from SaaS and Cloud platforms. For a list of available C2C collectors, see [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).
* **Sumo Logic Parser**. For other data sources, the Sumo Logic’s built-in parsers that extract key-value pairs from messages. To see currently available parsers, go to Manage **Data > Logs > Parsers** in the Sumo Logic UI.  

For more information on these alternatives, see [CSE Ingestion Best Practices](/docs/cse/ingestion/cse-ingestion-best-practices.md).

The key-value pairs are input to the next step of the process: mapping.

## Map message fields to schema attributes

The mapping process creates a Record from the key-value pairs that were extracted from a message, and maps a subset of the keys to CSE schema attributes. 

Mapping solves a particular problem: messages from different products use different names to identify users, applications, devices and so on. For example, some messages may refer to a source IP address as `sourceIP`, while others use `sourceIpAddress`. We need a standard set of names for the data that most messages are likely to contain. The [CSE schema](/docs/cse/schema) defines that standard set of names. 

What’s the benefit of mapping? It results in Records that use a common (standard) name for fields that hold the same sort of data, regardless of the source of the incoming message. The result: the same CSE rule can be applied to all Records, regardless of the message source.

## Normalize usernames and hostnames

Username and hostname normalization is the process of transforming the value of Record attributes that contain usernames and hostnames into a standard format. The normalized value replaces the non-normalized value in a Record. The non-normalized values of hostname and usernames are retained in a `_raw` field in the Record.

Why normalize? Assume CSE receives messages with an email-type field "bob@bobsbaitshop.com" and username-type field  "bob". We can use normalization to transform "bob@bobsbaitshop.com" to "bob", allowing the username and email to be correlated together.

Normalization allows for common name forms among Active Directory, AWS, and fully qualified domain names to be normalized into a domain and username form.  
The values of the following schema attributes are normalized into a standard format, which replaces the non-normalized field value in the Record.

* `device_hostname`
* `dstDevice_hostname`
* `fromUser_username`
* `srcDevice_hostname`
* `user_username`

## Entity Lookup Table processing

[Entity Lookup Tables](/docs/cse/records-signals-entities-insights/configure-entity-lookup-table.md) allow you to define your own hostname and username normalization rules. After the normalization described in the previous step is performed, any normalization you’ve configured in Entity Lookup Tables is applied. 

## Enrich Records with IP address, URL, and domain info

CSE adds a number of enrichment attributes to Records. Enrichment attributes are fields that provide extra context to the Record based on attribute values encountered in a Record. Specifically, CSE adds enrichment attributes for IP addresses, URLs, and domains in a Record.

## IP address enrichment

If a Record contains `device_IP`, `srcDevice_ip`, or another field that contains an IP address,  it adds a set of geolocation attributes to the Record, such as the ASN number and organization, the city and country where the IP address is located, and so on. 

The name of an enrichment attribute is formed by appending an underscore plus a string that identifies the enrichment attribute to the original attribute name. For example, if a Record contains `device_IP,` the enrichment attributes look like `device_ip_asnNumber`, `device_ip_asnOrg`, `device_ip_city` and so on. 

## URL and domain enrichment

If a Record contains `http_url` or another field that contains an URL, CSE parses the URL and creates attributes to contain the URL components, like the protocol and top level domain fields. 

For both URLs and domains, CSE adds a set of enrichment attributes to Records, such as entropy calculations for the FQDN and root domain, the Alexa ranking, and so on. 

The name of each added attribute is formed by appending an underscore plus a string that identifies the enrichment attribute to the original attribute name. For example, the attributes added to a Record that contains `http_url`, will look like `http_url_tld`, `http_url_protocol`, `http_url_alexaRank`, and so on. 

## Match List processing

CSE’s Match List feature allows you to leverage lists of important identifiers that, if they exist in an incoming message, indicate the message should be exempt from ordinary rule processing, or treated differently in some way. Typically, Match Lists are used to define “allow lists” of items, like IP addresses, URLs, and hostnames. Many CSE rules reference Match Lists; the lists are predefined, and you populate them with indicators that exist in your environment. 

For example, vulnerability scanners often set off false alarms in security data, as they intentionally mimic the behavior of an attacker. Given that this behavior is safe and expected, you don’t want scanner activities to fire a rule. That’s what a Match List is for. A CSE analyst can populate a Match List called “vuln_scanners” that contains the IP addresses of your scanners.

CSE compares the contents of every message to your Match Lists. When it finds a match, it appends fields two fields to the Record: `listMatches` and `matchedItems`. `listMatches` contains the names of lists that were matched against the Record, and  `matchedItems` contains the actual key-value pairs that were matched. You can take advantage of the appended data in searches and rules. So, a CSE rule can see from a Record that matches a rule condition that the IP address in the Record is on the  “vuln_scanners” Match List, and thus know that the rule shouldn’t fire. For more information, see [Create a Match List](../match-lists-suppressed-lists/create-match-list.md).

## Suppressed List processing

Cloud SIEM's Suppressed Lists feature is similar to Match Lists. A Suppressed List is a list of values of a particular field type, for example, an IP address or a file hash. When an incoming message contains a value found on a Suppressed List, Cloud SIEM prevents any rules that the incoming message matches from firing.

## Threat Intel processing

CSE has another feature that is similar to Match Lists: Threat Intel. Like Match Lists, Threat Intel lists are lists of indicators and identifiers configured by a CSE analyst. While similar to Match Lists, Threat Intel lists are intended for negative identifiers that should definitely fire a Signal. So, whenever a rule detects a Record field that matches an item on a Threat Intel list, it always results in a Signal. 

CSE’s Threat Intel list processing is similar to Match List processing. Incoming messages are compared to all Threat Intel lists. When a match is found, CSE updates the `listMatches` field in the Record with the name of the matched threat list, the matching key-value pair from the message, and the string “threat”. For more information, see the [Threat Intel](../rules/about-cse-rules.md) section in the *About CSE Rules* topic.  

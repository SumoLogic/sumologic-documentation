---
id: troubleshoot-parsers
title: Troubleshoot Parsers
sidebar_label: Parsers
description: Learn how to troubleshoot problems with log parsers.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article provides guidance for administrators to diagnose, troubleshoot, and escalate issues with Sumo Logic Cloud SIEM log parsers. For general information on the parsing engine and syntax, see [Parser Editor](/docs/cse/schema/parser-editor) and [Parsing Language Reference Guide](/docs/cse/schema/parsing-language-reference-guide).

Parsers are a critical component in the Cloud SIEM data ingestion pipeline. They serve as the first step in transforming raw log messages into structured records that can be used for threat detection and security analysis. Specifically, parsers:
* Extract key-value pairs from raw log messages.
* Enable proper log mapping to Cloud SIEM schema attributes by:
   * Applying mapping metadata to properly route parsed logs to mappers.
   * Transforming any variety of log data into a structured form.
* Support the creation of high-fidelity detection rules.

Parsing issues can manifest in several ways:
* **Failed records**. Insufficient or incorrect information causing a mapping failure.
* **Incorrect mapping**. What the mapper expects to map is not present or is different than expected.
* **Parsing failures**. All or part of a parser is not handling logs as intended.
* **Incorrect parsing**. Specific fields or metadata being parsed incorrectly (wrong key value pairs or `event_id` metadata).

## About forwarding logs to Cloud SIEM with parsers

### Forwarding methods

#### _siemForward and parser (recommended)

The recommended method is to set `_siemForward = true` and `_parser = <path/to/parser>`. This can be set several ways:
* At the [source](/docs/cse/ingestion/ingestion-sources-for-cloud-siem/). Logs from an entire source will be forwarded to Cloud SIEM and the specified parser.
* At the [collector](/docs/send-data/installed-collectors/). Logs from the collector and its child sources will be forwarded to Cloud SIEM and the specified parser
* Using a [Field Extraction Rule (FER)](/docs/manage/field-extractions/create-field-extraction-rule/). 
   * Often used to specify SIEM forwarding and the parser path by `sourceCategory`, but can also be used to filter specific subsets of logs for forwarding to Cloud SIEM (or not forwarded).
   * Sending subsets of logs to Cloud SIEM is useful as not all log data is useful from a security context.

Many [Cloud-To-Cloud (C2C)](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/) sources set the `_parser` and `_siemForward` metadata within the parser, bypassing the need to manually specify for these sources.

#### Other methods

Other methods depend upon legacy methods which bypass parsers and are generally not recommended. These include:

* Setting `_siemForward` without a parser.
   * For structured logs, this will use a Sumo Logic [ingest mapping](/docs/cse/ingestion/sumo-logic-ingest-mapping/) and has limited options for specific parsing or relies on setting mapping metadata in fields or via a a field extraction rule.
   * For unstructured logs, this will utilize legacy Grok parsers which are approaching end-of-life and are not maintained outside of critical bug fixes.
* Older cloud-to-cloud sources set `_siemForward` and mapper metadata fields within the cloud-to-cloud source.

### Best practices

* Always use a parser when possible.
   * Provides consistent field extraction.
   * Enables proper schema mapping.
   * Supports future content updates.
* Avoid field extraction rules that modify `_raw`.
   * Makes parser troubleshooting more difficult by obfuscating the format of the original raw log which the parser receives.
* Use appropriate parser paths.
   * Ensures parser matches the data format.
   * Uses system parsers when available.
   * Creates custom parsers only when necessary.

Following these fundamentals will help prevent common parsing issues and simplify troubleshooting when problems occur.

## Identify parser issues

### Failed Records dashboard

The [Enterprise Audit - Cloud SIEM app](/docs/integrations/sumo-apps/cse/) provides dashboards and queries for greater visibility into Cloud SIEM activity. Troubleshooting parser failures is aided by the [Cloud SIEM - Record Analysis - Failed Records](/docs/integrations/sumo-apps/cse/#record-analysis-failed-records) dashboard and query found within the app. (The Enterprise Audit - Cloud SIEM app must be installed).

Common failure types:
* **Parser failures**. Include parser path and specific parsing error.
* **Mapper failures**. Usually mention mapper or mapping issues.
* **Mixed failures**. May indicate parser output doesn't match mapper expectations.

### Investigate failed records
 
#### Identify the pattern

* Look for commonalities in failed records.
* Note specific error messages.
* Check if failures are limited to certain sources.

#### Analyze error messages

Common errors:
* `Fatal: /Parsers/System/Vendor/Product Name did not produce an event.`
<br/>Indicates the parser is likely failing immediately.
* `Fatal: /Parsers/System/Vendor/Product Name parse failed.`
<br/>Indicates the parser is likely failing immediately.
* `Fatal:/Parsers/System/Vendor/Product Name - transform_name - none of the transforms in cascade successfully parsed event (transform_name_1, transform_name_2).`
<br/>Indicates a specific component of the parser is failing. This case indicates a transform cascade in which logs may be partially parsed but are failing further into processing.
* `Fatal:/Parsers/System/Vendor/Product Name- transform_name parse failed.`
<br/>Indicates a specific transform within a parser is failing. Logs may be partially parsed, but are failing further into processing.
* `Fatal:/Parsers/System/Vendor/Product Name- transform_name  - no value found in required transform target field parsed_field_name.`
<br/>Indicates a required key value pair is missing from the parsed log and the log is failing to parse as a result.
* `Fatal:/Parsers/System/Vendor/Product Name- wrapper did not return the wrapped log entry.`
<br/>A parser utilizing a wrapper transform did not find the log that is supposed to be present, causing the parser failure.

#### Check for recent changes

For log sources which were previously parsed successfully:
* Vendors will occasionally make modifications to the log format or field names within the logs which cannot be handled by existing parsers.
* Source configuration changes to logging on the appliance, service, or application sending logs may result in parsing issues or failures.
* Sumo Logic is continuously making updates to our parser catalog. While these changes undergo regression testing, there can be unforeseen cases not caught in testing. [Cloud SIEM content release notes](/release-notes-cse/) will note any modifications to out-of-the-box parsers by date with a brief summary of the changes.

#### Other considerations

Parsing failures can occur when there is no issue with the parser for a variety of reasons:
* The parser was designed for a different version or log format than the ingested logs.
   * A new parser may be needed to accommodate these logs. Clues this may be the case can be found by examining the parser name to see if it includes a format specifically such as JSON, LEEF, CEF, XML, CSV, and so on.
   * If the parser name does not specify the format, the parser itself often will within the `FORMAT` stanza.
   * Some parsers will include sample logs in comments which follow the format the parser was designed to accommodate.
* The logs failing to parse are not security relevant. While some parsers can be designed to explicitly define what logs are supported or not, there are circumstances where this is not practical, most commonly in unstructured log formats, and logs fail to parse solely because they are not useful in Cloud SIEM.
   * They do not contain an entity and therefore cannot be used to correlate any activity or generate signals.
   * The activity captured in the log does not have any clear security use case.
      * There are niche use cases which can be accounted for by customizing a parser that aren’t always practical to support globally.
      * `Verbose` and `Debug` level logging frequently fall into this category.

#### Pivot to raw logs and troubleshoot with the parser

With the error(s) identified, pivot to the raw message(s) for further troubleshooting. Note the specific parser(s) which are failing.
1. Extract `metadata_sourcemessageId` from the failed record.
1. Use `_messageId` (same as `metadata_sourcemessageId`) in a search to locate the original raw log.
1. Copy the raw message(s) and paste into the parser UI.
1. Use the parser UI to search for `_messageID`(s) with the appropriate time frame to bring the logs into the UI to test.

## Troubleshoot existing parsers

If you have identified a log message that should be parsed by an existing parser (the format is right, there is a clear security use case, and so on) then it helps to understand the structure of the parser first to begin troubleshooting.

Some parsers are very simple (most often structured log formats):
* A format is defined.
* Parser expects mapping metadata and where they come from to be static or come from the same templated key value pair in the log.
* Parser expects time parsing to be formulated using a single attribute and for time to be in a single format.

For simple parsers that fail it is often an edge case or a previously unseen event which diverges from the format the parser was initially developed. This often necessitates adding complexity to the parser to handle these cases, or to refactor the parser to handle logs differently, often more broadly. (With a broader case, that may be defining a higher level `event_id` which is consistent with all logs from a source).

Some parsers are more complex (most often unstructured or complex structured log formats). There may be a single high level format a log takes, but:
* There are nested structures within the log that differ from the overall structure. This occurs frequently with JSON sources with a nested message using human readable or key value pairs in non-JSON format within certain fields.
* Individual event types from a source follow different conventions for labeling key value pairs. 
   * This particularly can make defining mapping metadata challenging as it will require individual event types define these attributes per-transform instead of for an entire source.
   * Timestamps may be stored in different places depending on the nature of an event type.
      * A transaction log may have a concept of a start and end time.
      * Multiple timestamps may be present depending on the event type.
      * Some logs may be missing a timestamp and `_messagetime` from the Sumo Logic collector or source may need to be used/fallen back on.
* Unstructured logs with many different event types or variations between events.
   * Each event type must be handled by its own transform and often requires a regular expression to parse. 
   * These will often use variable transforms and/or transform cascades.

### Example scenario - Linux syslog parsing failure

This is a particularly illustrative example of how a more complex parser processes a log.

Example:
<br/>`Fatal: /Parsers/System/Linux/Linux OS Syslog - parse_systemd - none of the transforms in cascade successfully parsed event (parse_systemd_format_1, parse_systemd_format_2).`

For log:
<br/>`Nov 20 21:11:08 ip-1-2-3-4 systemd[1]: motd-news.service: Deactivated successfully.`

In this parser, the log is first processed for its header to determine how it should be routed in the parser. After that routing it is failing to parse specifically in a parser cascade, and then failing to match either `parse_systemd_format_1` or `parse_systemd_format_2` which are the transforms called in the cascade for the specific log. While still failing, this provides useful clues as to where the failure occurred.

<img src={useBaseUrl('img/cse/troubleshoot-parser-example.png')} alt="Troubleshoot parser example" style={{border: '1px solid gray'}} width="800" />

Here we can see the header and process are parsed successfully. Examining the parser we find that there is a `VARIABLE_TRANSFORM` which uses the syslog process to route the logs to another transform.

```
# Direct parser based on the syslog process name
# Process Name = Transform Parser
VARIABLE_TRANSFORM_INDEX:syslog_message = syslog_process
```

In this case there is a transform called for `systemd` processes called `parse_systemd` which takes the contents of `syslog_message` and passes it along to the named transform. Looking further down the parser we can find that specific transform.

```
transform:parse_systemd
TRANSFORM_CASCADE:_$log_entry = parse_systemd_format_1,parse_systemd_format_2
```

This particular transform passes along the contents of what it received from the variable transform and instructs it to pass along the field value stored in `_$log_entry` (syslog_message) to two additional parse transforms which it then attempts to use in the order shown in the transform cascade until a match is found.

```
[transform:parse_systemd_format_1]
#<86>Jan 01 00:00:00 hostname systemd[20460]: pam_unix(systemd-user:session): session opened for user root by (uid=0)
TRANSFORM_CASCADE:_$log_entry = parse_su_format_6,parse_sudo_format_2,parse_systemd_user_format_1

[transform:parse_systemd_format_2]
#<30>Jan 01 00:00:00 hostname systemd[1]: Started Session c513458 of user ewqadm.
REGEX = (?P<action>Started\sSession)\s(?P<session_id>\S+)\sof\s(?i)user\s(?P<user>.+)\.
SET:event_id = systemd-session-start
```

In these transforms we helpfully have an example log for which the transform is intended to parse using a regular expression and then sets an `event_id` if there is a match. From the examples and the regex we can clearly see that neither transform is intended to match the example log we are seeing a failure for. 

Were this a useful log from a security context (it’s not) the failure could be addressed in a few ways, either by modifying one of the existing transform regular expressions (whichever is closer in format) or by creating a new transform as part of the transform cascade being called for the systemd process log. Since the particular log example is a significant departure from the intent of either existing transforms, a new one would be most appropriate. It would only require a modification to the `parse_systemd` transform cascade and the addition of a third transform with a regular expression to handle the particular log and then set the appropriate `event_id`.

## Escalate parsing issues

Sumo Logic Threat Labs Detection Engineering maintains all out-of-the-box Cloud SIEM content. Content includes parsers, mappers, rules, and normalization schema. For details about this content, see the [Cloud SIEM Content Catalog](/docs/cse/get-started-with-cloud-siem/cloud-siem-content-catalog/).

Upon identifying an issue with a Cloud SIEM out-of-the-box parser using this article, it may be necessary to [contact Support](https://support.sumologic.com/support/s/) to escalate the issue to the Threat Labs team.

### Escalation requirements

Provide the following:
* A concise description of the problem. Screenshots are helpful for understanding current and potentially previous behavior if there was a change.
* A representative raw log sample.
   * Include logs which represent the issue. 
   * For new support or extension of an already supported source, include logs which represent the types of (possibly new) events.
* Security use case if it is not immediately obvious. Not all logs necessarily will be useful in Cloud SIEM.
* Supporting documentation. Esoteric or poorly labelled values may require documentation which is not always publicly available.
* Configuration information. Many data sources will have options for configuring logging. It is important to understand what those settings are to develop new global support for a data source or offer advice for a custom solution if a global one is not appropriate.

### Gather raw samples

Prior to opening a support request, it is helpful to gather sample raw logs (without field extraction rules overwriting `_raw`) which represent the identified issue.

Once a representative sample has been gathered it is recommended to export it as a CSV from Sumo Logic search to ensure no extraneous formatting is applied that might confound further troubleshooting by Sumo Logic Customer Success and Threat Labs teams.

Following are some ways to gather samples.

#### Search for message IDs

Gather a sample by searching for the logs that are failing to parse using the identified `_messageId`(s):
```
_sourceCategory=<your/source/category>
| where _messageId in (<messageId1>,<messageId2>,<etc.>)
```

#### Identify an event ID

If an entire source is failing to parse because it is not presently supported out-of-the-box, gather a sample by first identifying a likely event ID:
```
_sourceCategory=<your/source/category> 
| fields eventID
| first(_raw) by eventID
```
An event ID can be thought of as a key in a log which represents a lowest common denominator which can be used to identify the type of message.

Utilizing the first operator lets you cut down on extraneous samples. It may be necessary to gather multiple examples if there is meaningful variation within each failing sample that may require further parsing beyond per-event-ID.

#### Gather failing event IDs

If a particular event ID or IDs as set in the parser using `MAPPER:event_id` are failing, gather the failing event IDs. Construct a search query using the failing event IDs and gather unique examples of each `_raw` per event ID:
```
_sourceCategory=<your/source/category>
| fields eventID
| where eventID in ("list","of","eventIDs")
| first(_raw) by eventID
```
The first field will be `_raw` log.

This query only surfaces the first example within the time range to cut down on duplication. It may be necessary to gather multiple examples if there is meaningful variation within each failing sample that may require further parsing changes.
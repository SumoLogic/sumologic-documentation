---
id: troubleshoot-mappers
title: Troubleshoot Mappers
sidebar_label: Mappers
description: Learn how to troubleshoot problems with log mappers.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article provides guidance for administrators to diagnose, troubleshoot, and escalate issues with Sumo Logic Cloud SIEM log mappers.

Mappers are a critical component in the Cloud SIEM data ingestion pipeline. They serve as the second step in transforming raw log messages into structured records that can be used for threat detection and security analysis. Specifically, mappers:
* Take key-value pairs created during parsing and map them into the Cloud SIEM normalization schema.
* Assign classification to each log coming into Cloud SIEM.
* Determine the entities present in the record.
* Support the creation of high-fidelity detection rules.

For information about creating log mappers, see [Create a Structured Log Mapping](/docs/cse/schema/create-structured-log-mapping/). For more general information about log mapping, and how it fits into the record creation process, see the [Record Processing Pipeline](/docs/cse/schema/record-processing-pipeline) topic. For a complete list of the standard log mappings, see [Mappings](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/mappings/README.md) in the [Cloud SIEM Content Catalog](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/README.md).

## Interpreting record failures and issues

### Failed Records dashboard

The [Enterprise Audit - Cloud SIEM app](/docs/integrations/sumo-apps/cse/) provides dashboards and queries for greater visibility into Cloud SIEM activity. Troubleshooting parser failures is aided by the [Cloud SIEM - Record Analysis - Failed Records](/docs/integrations/sumo-apps/cse/#record-analysis-failed-records) dashboard and query found within the app. (The Enterprise Audit - Cloud SIEM app must be installed).

Common failure types:
* **Parser failures**. Include parser path and specific parsing error.
* **Mapper failures**. Usually mention mapper or mapping issues.
* **Mixed failures**. May indicate parser output doesn't match mapper expectations.

### Mapping failure workflow

Failure can occur when no mapping matches `logType=json`, `vendor=<vendor>` set in the parser, `product=<product>` set in the parser, or `eventId=<event_id>` set in the parser.

#### Failed records

Failed records result when a mapper doesn’t match with the metadata set during log parsing:
* **Vendor**. No mapper exists with the specified vendor metadata defined in the parser. This is likely a mismatch for a custom (non-out-of-the-box) parser where a parser has been created without a corresponding mapper(s).
* **Product**. No mapper exists with the specified product metadata defined in the parser. 
   * Depending on the parser, product may be dynamic. Dynamic product parsers support multiple products from a vendor in a single parser. 
   * A mapper which corresponds to the product metadata coming from the parser may be missing.
* **EventId**. No mapper exists which matches the pattern of the `event_id` set in the parser. This is the most common failure. This occurs frequently when an event type or types occurs which is not anticipated in the mapper (or the parser as the case may be) and can be due to:
   * New event types from a vendor.
   * Previously unseen event types.
   * Unsupported events.
   * Events which do not have security relevance.
   * Events which do not contain an entity and therefore cannot contribute to signals and insights.
   * Events in an unsupported format
* **Log Type**. For logs processed by parsers, `logType` is always JSON as the output of parsed logs is key value pairs stored in a JSON object. This is the case regardless of the original format the logs were ingested as (CEF, LEEF, XML, and so on).

#### Incomplete records

Incomplete records result when a record is created, but key information is not mapped. This can occur for several reasons:
* Fields expected in the mapper are not present in the parsed log.
    * Vendor changes to key labels or their location.
    * Configuration change.
* The parsed log is not parsed correctly. The parser is not providing key value pairs that are expected by the mapper due to a flaw in the parser.
* Fields parsed are not mapped.
    * Only a catch-all or default mapper is present and doesn’t comprehensively normalize the log. Mappers using the _default_ pattern exist where possible to ensure some minimal normalization and classification occurs.
    * There is no appropriate schema field to normalize to. The Cloud SIEM records schema is limited, for fields which there is no corresponding normalized field, the original key value pairs extracted during parser which can be referenced in rules and records searches.

## Investigating and resolving mapper failures

### A mapper does not exist for parsed events

Another common mapping issue occurs when a log successfully parses, is assigned mapping metadata (`vendor`, `product`, `event_id`), but there is no corresponding mapper for the `event_id`. In many cases a _default_ pattern mapper exists which serves as a catch-all, but if this is not present, any logs which do not match a pattern defined in the mapper input will not create a record.

This assumes the data source for which the mapping is failing has a parser and mappers in place already. This applies to net-new data sources and parsers.

#### Failed record example

For this example, let's assume no mapping matched `logType=json`, `vendor=microsoft`, `product=azure`, and `eventId=AzureDevOpsAuditEvent`.

#### Troubleshooting workflow

1. Determine how mapper metadata is assigned during log parsing.
   1. From the failed record:
       1. Get the value of `metadata_parser`.
       1. Get value of `metadata_sourceMessageId`.
       1. Get the value of from the reason field to determine:
          * Vendor
          * Product
          * EventId
   1. Load the parser found above in `metadata_parser` in step 1.
       1. In the parser UI import messages from Sumo Logic log search using this query:
          ```
          messageId=<value of metadata_sourceMessageId from step 1>
          ```
       1. Parse messages. Use the parsed [field dictionary](/docs/cse/schema/parsing-language-reference-guide/) to determine what the input values of any mapper creation or change will be.
1. Examine existing mappers from the [Log Mappings](/docs/cse/schema/create-structured-log-mapping/) page in Cloud SIEM:
   1. Filter for the output vendor and product gathered in step 1.
   1. Note the event ID patterns present. 
   1. You can do one of the following:
      * If an existing pattern exists which is similar to the event ID captured in step 1 above, the mapper may be able to be adapted to accommodate the variation. Care should be taken to ensure the input fields in any adapted mapper match with the parsed output of the previously unmapped log. Out-of-the-box (system) mappers will need to be duplicated to be modified.
      * An existing mapper may be used as a template if appropriate to map the previously unmapped log with the identified pattern.
      * A new structured mapper can be created using the same input/output vendor and product info with JSON as the format (all parsed logs are output as JSON regardless of the original raw format) with the identified event ID pattern

### A field is not mapped (normalized) in a record

A common mapping issue is where a record is created but certain fields are not normalized and are potentially causing downstream issues, such as false-negative or false-positive signals, or causing searches based on records to fail in some way.

1. Analyze the record. 
   1. Determine what field(s) are missing. For example, `user_username` is not mapped, preventing the record from being considered for signals and correlation into insights.
   1. Determine where does the data exist in the parsed log. Use the "fields" element in the record, which contains all parsed key value pairs from the original log, to find the location where the field needs to be mapped from. Note the key name.
1. Analyze and correct the mapper.
   1. Determine which mapper a record is mapped from using `metadata_mapperName` or `metadata_mapperUid`.
   1. Determine how the mapper maps the desired field. Look in the mapper input column to determine which value(s) the mapper uses to map the field.
1. Modify the mapper. 
   1. For OOTB (system) mappers, to make local changes, the mapper must be duplicated (disables the duplicated mapper). 
   1. Assuming there is no obvious error in the original mapper, such as a misspelling of the input field, add the field determined in record analysis to the "Alt. Input Fields" for the desired mapped field. Alternate Input Fields are tried in this order:
         * If the primary input field is missing, each alternate is tried until a match is found.
         * If there are multiple matches in the list, only the first is considered.
1. Validate the change. New mapped records should reflect the modification quickly.
A search for records using the modified/new mapper can be initiated from the log mappings page.
   1. Open the [log mapping](/docs/cse/schema/create-structured-log-mapping/).
   1. Select **Actions > Open in Record Search**.
   1. Search records for the log mapping. Previously mapped records will not reflect mapper changes made after they were created.

## Escalate mapper issues

Sumo Logic Threat Labs Detection Engineering maintains all out-of-the-box Cloud SIEM content. Content includes parsers, mappers, rules, and normalization schema. For details about this content, see the [Cloud SIEM Content Catalog](/docs/cse/get-started-with-cloud-siem/cloud-siem-content-catalog/).

Upon identifying an issue with a Cloud SIEM out-of-the-box parser using this article, it may be necessary to [contact Support](https://support.sumologic.com/support/s/) to escalate the issue to the Threat Labs team.

### Escalation requirements

Provide the following:
* A concise description of the problem. 
   * Screenshots are helpful for understanding current and potentially previous behavior if there was a change.
   * Impacted mapper(s) (if applicable), including mapper name and or mapper UID (`metadata_mapperName`/`metadata_mapperUid`).
* A representative raw log sample.
   * Include logs which represent the issue.
   * For new support or extension of an already supported source, include logs which represent the types of (possibly new) events.
* A security use case if it is not immediately obvious. Not all logs necessarily will be useful in Cloud SIEM
* Supporting documentation. Esoteric or poorly labelled values may require documentation which is not always publicly available.
* Configuration information.
   * Many data sources will have options for configuring logging.
   * It is important to understand what those settings are to address issues or develop new global support for a data source or offer advice for a custom solution if a global one is not appropriate.

### Gather raw samples

Prior to opening a support request, it is helpful to gather sample raw logs (without field extraction rules overwriting `_raw`) which represent the identified issue.

Once a representative sample has been gathered it is recommended to export it as a CSV from Sumo Logic search to ensure no extraneous formatting is applied that might confound further troubleshooting by Sumo Logic Customer Success and Threat Labs teams.

Following are some ways to gather samples.

#### Search for message IDs

Gather a sample by searching for the map logs that are failing using the identified `_messageId`(s):
```
_sourceCategory=<your/source/category>
| where _messageId in (<messageId1>,<messageId2>,<etc.>)
```

#### Identify an event ID

If a particular event ID or IDs as set in the parser using `MAPPER:event_id` are failing to map, gather the failing event IDs. Construct a search query using the failing event IDs and gather unique examples of each _raw per event ID.
```
_sourceCategory=your/source/category 
| fields eventID
| where eventID in ("list","of","eventIDs")
| first(_raw) by eventID
```
The first field will be `_raw` log.

This query only surfaces the first example within the time range to cut down on duplication. It may be necessary to gather multiple examples if there is meaningful variation within each failing sample that may require further mapping changes.
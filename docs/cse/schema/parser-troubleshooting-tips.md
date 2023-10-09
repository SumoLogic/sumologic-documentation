---
id: parser-troubleshooting-tips
title: Parser Troubleshooting Tips
sidebar_label: Parser Troubleshooting
description: Learn how to troubleshoot problems with parsers.
---


Sumo Logic parsers are a powerful tool for extracting log data to support security and observability use cases. This topic provides tips to help you identify and resolve some common issues you might encounter when using parsers.

For general information on the parsing engine and syntax, see the [Parser Editor](/docs/cse/schema/parser-editor) and [Parsing Language Reference Guide](/docs/cse/schema/parsing-language-reference-guide) topics.

1. Our [Ingestion Guides](/docs/cse/ingestion/) provide instructions for how to ingest data from a variety of data sources. Check to see if there is a guide for the data source you’re working with. The ingest guides generally describe the most straightforward, least error-prone method. Make sure that you’ve followed the instructions exactly and that the data to be ingested is supported.      

    These guides explain how to configure Collectors and Sources to use a specific parser, what messages are supported out-of-the-box, and have links to vendor documentation where appropriate.

    For data sources that can be configured to log in a custom format, such as [Palo Alto Firewall](/docs/cse/ingestion/ingestion-sources-for-cloud-siem/palo-alto-firewall), the ingest guide will define what formats are supported. Support is usually limited to default configurations, but may vary.    
2. The Sumo Logic Collector or Source that sends the data to be parsed must be correctly configured with the path to the parser. Make sure the path you assign to the Collector or Source is exactly correct. A single character difference will result in parser errors for all logs you try to ingest from your data source. The path to a parser looks like this:

    `/Parsers/System/Microsoft/Windows-XML`

    The ingest guide for a data source will include the path to the correct parser. You can also determine the path to a parser on the **Logs > Parsers** page in the Sumo Logic UI: navigate to the parser, and then choose **Copy Path** from the three-dot more options menu.    
3. Check for Field Extraction Rules, [Sumo Logic Ingest Mappings](/docs/cse/ingestion/sumo-logic-ingest-mapping), or [Local Configurations](/docs/cse/schema/parser-editor#create-a-local-configuration-for-a-system-parser) related to the parser that is presenting issues.

    * Field Extraction Rules can alter message contents in such a way that the parser works when you're testing it in the Parser Editor against messages returned by a Sumo Logic log search, but not when it receives logs from the Sumo Logic source that collected the logs. Replicating the logic of the FER in a Local Configuration in the parser usually solves this problem. 
    * Sumo Logic Ingest Mappings for a data source should always be disabled when you’ve configured a Sumo Logic parser for that same data source. Otherwise, a single message might result in multiple CSE Records. 
    * A Local Configuration to a parser is an override to out-of-the-box behavior. For this reason, if you’re having trouble with a parser, checking out any Local Configurations is important. Make sure to test the parser without Local Configurations so you can verify whether the problem is with the parser itself, or related to an external factor.         
4. Use the right parser for your data format. Some data sources, for example, Windows Event Logs, can send data in multiple different formats and using the correct parser for the format in use is required.

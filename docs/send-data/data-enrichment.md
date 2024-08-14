---
id: data-enrichment
title: Data Enrichment
description: Data enrichment, the process of adding meaningful information to your data to enhance its value and usability, provides more control and ease when referencing data in searches, and Sumo Logic supports this through the use of metadata and lookups.
---

Data enrichment is the process of adding meaningful information to your data, enhancing its value and usability. By incorporating additional context, you gain more control and ease when referencing data in searches.

Sumo Logic supports data enrichment using metadata and lookups.

## Using metadata

Metadata typically originates from your system or environment. It provides context about the source of the data and any associated services or applications. Logs and metrics utilize metadata that can be customized to meet your needs.

### Log metadata

Log metadata enhances query operations by providing additional data for reference, allowing for a more specific scope of data in search expressions and improving search performance. It also enables the use of more specific search filters in Roles and routing expressions in Partitions.

Log metadata is configured in Sumo Logic as [fields](/docs/manage/fields) consisting of key-value pairs that are tagged to logs during collection.

Best practices:
* Define fields with [Field Extraction Rules](/docs/manage/field-extractions) by parsing fields when log messages are ingested.
* Define fields on data sent to Sumo Logic by manually defining them on Sources and Collectors.
* Provide custom fields through [HTTP headers](/docs/send-data/hosted-collectors/http-source).
* Use our AWS Metadata Source to collect tags from EC2 instances running on AWS.

### Metrics metadata

Sumo Logic provides a number of features you can use to enrich the metrics you collect with metadata. Metrics metadata provides considerable benefits when you query your metrics: you can scope your metrics queries to return only the metrics of interest. Metrics metadata can also give you insight that cannot be gleaned from unadorned metrics, especially in highly containerized and orchestrated environments.

Metrics metadata is referenced in Sumo Logic with [selectors](/docs/metrics/introduction) consisting of key-value pairs that are tagged to metrics during collection.

Best practices:
* Use the [metrics rules editor](/docs/metrics/metric-rules-editor) to tag metrics with data derived from the metrics identifier, and then use those tags in metrics queries.
* Attach custom metadata through [HTTP headers](/docs/send-data/hosted-collectors/http-source).
* Use the [AWS Metadata (Tag) Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-metadata-tag-source.md) to apply tags from your EC2 instances to host metrics, Graphite metrics, and Carbon 2.0 metrics you collect.

## Using Lookup Tables

A [Lookup Table](/docs/search/lookup-tables) is a table of data hosted on Sumo Logic that you can use to enrich the log data received by Sumo Logic. For example, in a Sumo Logic log search, you could refer to a Lookup Table of user account data to map the user ID in an incoming log to a row in the Lookup Table, and return other attributes of that user, for instance, email address or phone number. The fields you look up appear as part of your search results. This data enrichment lets you perform more rich and powerful analytics.  

Once you have a created a Lookup Table, there are several search operators you can use to access it:

* Use the [`lookup` operator](/docs/search/search-query-language/search-operators/lookup) to enrich your log data with contextual information from the Lookup Table.
* Use the [`lookupContains` operator](/docs/search/search-query-language/search-operators/lookupcontains) to see whether a key exists in a Lookup Table.
* Use the [`cat` operator](/docs/search/search-query-language/search-operators/cat) to list the contents of a Lookup Table.
* Use the [`save` operator](/docs/search/search-query-language/search-operators/save) to update the contents of an existing Lookup Table.

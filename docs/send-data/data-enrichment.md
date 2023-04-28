---
id: data-enrichment
slug: data-enrichment
title: Data Enrichment
description: Add more context to your data.
---

Data enrichment is the process of adding meaningful information to your data so you have more control and an easier time referencing data in searches. It's simply where you add more context to your data.

Sumo Logic supports data enrichment using metadata and lookups.

## Using Metadata
Metadata is typically from your system or environment, and adds context about what or where the data came from and any associated services or apps. Logs and metrics use metadata that can be customized to anything you need.

* **Log metadata**. In addition to having more data to reference in query operations, this allows you to define a more specific scope of data in search expressions, improve search performance, and allows more specific search filters in Roles and routing expressions in Partitions.
  * Log metadata is configured in Sumo as [fields](/docs/manage/fields) consisting of key-value pairs that are tagged to logs during collection.
    * You can define fields with [Field Extraction Rules](/docs/manage/field-extractions) by parsing fields when log messages are ingested.
    * You can define fields on data sent to Sumo by manually defining them on Sources and Collectors.
    * You can provide custom fields through [HTTP headers](/docs/send-data/hosted-collectors/http-source).
    * Our AWS Metadata Source allows you to collect tags from EC2 instances running on AWS.


* **Metric metadata**. Sumo Logic provides a number of features you can use to enrich the metrics you collect with metadata. Metric metadata provides considerable benefits when you query your metrics: you can scope your metrics queries to return only the metrics of interest. Metric metadata can also give you insight that can't be gleaned from unadorned metrics, especially in highly containerized and orchestrated environments
  * Metric metadata is referenced in Sumo with [selectors](/docs/metrics/introduction) consisting of key-value pairs that are tagged to metrics during collection.
    * You can use the [metric rules editor](/docs/metrics/metric-rules-editor) to tag metrics with data derived from the metric identifier, and then use those tags in metrics queries.
    * You can attach custom metadata through [HTTP headers](/docs/send-data/hosted-collectors/http-source).
    * You can use the [AWS Metadata (Tag) Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-metadata-tag-source.md) to apply tags from your EC2 instances to host metrics, Graphite metrics, and Carbon 2.0 metrics you collect.

## Using Lookup Tables
A [Lookup Table](/docs/search/lookup-tables) is a table of data hosted on Sumo Logic that you can use to enrich the log data received by Sumo Logic. For example, in a Sumo Logic log search, you could refer to a Lookup Table of user account data to map the user ID in an incoming log to a row in the Lookup Table, and return other attributes of that user, for instance, email address or phone number. The fields you look up appear as part of your search results. This data enrichment lets you perform more rich and powerful analytics.  

Once you have a created a Lookup Table, there are several search operators you can use to access it:

* You can use the [lookup operator](/docs/search/search-query-language/search-operators/lookup) to enrich your log data with contextual information from the Lookup Table.
* You can use the [lookupContains](/docs/search/search-query-language/search-operators/lookupcontains) operator to see whether a key exists in a Lookup Table.
* You can use the [cat](/docs/search/search-query-language/search-operators/cat) operator to list the contents of a Lookup Table.
* You can use [save operator](/docs/search/search-query-language/search-operators/save) to update the content of an existing Lookup Table.

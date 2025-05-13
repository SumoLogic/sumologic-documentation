---
id: cse-ingestion-best-practices
title: Cloud SIEM Ingestion Best Practices
sidebar_label: Cloud SIEM Ingestion Best Practices
description: Learn how to send log messages collected by a Sumo Logic Source or Cloud-to-Cloud Connector on to Cloud SIEM to be transformed into records.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article has information about sending log messages collected by a Sumo Logic Source or Cloud-to-Cloud Connector on to Cloud SIEM to be transformed into records. 

:::note
[Cloud SIEM must be enabled in your Sumo Logic account](/docs/cse/get-started-with-cloud-siem/onboarding-checklist-cse/) in order to send data from Sumo Logic to Cloud SIEM. If it isn’t, contact your Sumo Logic Technical Account Engineer or Sales Engineer.
:::

The process consists of configuring a source or collector to forward messages to Cloud SIEM, and ensuring that the forwarded messages are correctly tagged with the information Cloud SIEM needs in order to map messages fields to record attributes. These are referred to as *mapping hints*, and include: Format, Vendor, Product, and an Event ID template.

The diagram below is a high level illustration of several alternative processing flows from a data source to a Sumo Logic collector or source, and on to Cloud SIEM. 

:::note
You can only send log data that resides in the [Continuous data tier](/docs/manage/partitions/data-tiers) to Cloud SIEM.
:::

<img src={useBaseUrl('img/cse/cip-to-cse.png')} alt="Data flow diagram" width="800"/>

### Recommended methods to ingest data into Cloud SIEM

We recommend the following ingestion methods, starting with the most preferred:

1. **Use a Cloud-to-Cloud (C2C) connector**. It’s an easy method, because if you configure your C2C source to send logs to Cloud SIEM, it automatically tags messages it sends to Cloud SIEM with fields that contain the mapping hints that Cloud SIEM requires.  <br/><br/>Most C2C connectors have a [**Forward to SIEM** option](/docs/c2c/info/#metadata-fields) in the configuration UI. If a C2C connector lacks that option, you can achieve the same effect by assigning a field named `_siemforward`, set to *true*, to the connector.  <br/><br/>For information about what C2C sources are available, see [Cloud-to-Cloud Integration Framework Sources](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/).  
1. **Use a Sumo Logic Source and parser**. If there isn’t a C2C connector for your data source, your next best option is to use a Sumo Logic Source (running on an Installed Collector or a Hosted Collector, depending on the data source)—and a Sumo Logic parser, if we have one for the data source.   

    Check if there’s a parser for your data source. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Parsers**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Parsers**. You can also click the **Go To...** menu at the top of the screen and select **Parsers**.  
    
    If there is a parser for your data source, but you find it doesn’t completely meet your needs–for instance if the parser doesn’t support the particular log format you use–consider customizing the parser with a [local configuration](/docs/cse/schema/parser-editor#create-a-local-configuration-for-a-system-parser). If that’s not practical, you can submit a request for a new parser by filing a ticket at [https://support.sumologic.com](https://support.sumologic.com/).  

    When you forward logs to Cloud SIEM for parser processing, there are two bits of important configuration: 
    1. Configure the source to forward logs. To configure an HTTP source to send log messages to Cloud SIEM, click the [**SIEM Processing** checkbox](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source). You can configure other source types to send data to Cloud SIEM by assigning a field named `_siemforward`, set to *true*, to the source. For example:  

        ```
        _siemforward=true
        ```

        :::note
        A field can also be assigned at the collector level, in which case sources on the collector inherit the field setting, unless the same field is defined with a different value at the source level.
        :::

    2. Configure the source with the path to the appropriate parser, by assigning a field named `_parser`, whose value is the path to parser, for example:  
        ```
        _parser=/Parsers/System/AWS/AWS Network Firewall
        ```  

         You can get the path to a parser on the **Parsers** page in Sumo Logic. Click the three-dot kebab menu in the row for a parser, and select **Copy Path**.

1. **Use a Sumo Logic Source and Cloud SIEM Ingest mapping**. This is the least recommended method, as you have to manually configure the mapping hints in an ingestion mapping. For more information, see [Configure a Sumo Logic Ingest Mapping](/docs/cse/ingestion/sumo-logic-ingest-mapping/).

:::tip
See the [Example Ingestion Sources for Cloud SIEM](/docs/cse/ingestion/ingestion-sources-for-cloud-siem/) for specific collection and ingestion recommendations for many common products and services.

---
id: cse-ingestion-best-practices
title: CSE Ingestion Best Practices
sidebar_label: CSE Ingestion Best Practices
description: Learn how to send log messages collected by a Sumo Logic Source or Cloud-to-Cloud Connector on to CSE to be transformed into Records.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about sending log messages collected by a Sumo Logic Source or Cloud-to-Cloud Connector on to CSE to be transformed into Records. 

:::note
CSE must be enabled in your Sumo Logic account in order to send data from Sumo Logic to CSE. If it isn’t, contact your Sumo Logic Technical Account Manager or Sales Engineer.
:::

The process consists of configuring a source or collector to forward messages to CSE, and ensuring that the forwarded messages are correctly tagged with the information CSE needs in order to map messages fields to Record attributes. These are referred to as *mapping hints*, and include: Format, Vendor, Product, and an Event ID template.

The diagram below is a high level illustration of several alternative processing flows from a data source to a Sumo Logic collector or source, and on to CSE. 

:::note
You can only send log data that resides in the [Continuous data tier](/docs/manage/partitions-data-tiers/data-tiers) to CSE.
:::

<img src={useBaseUrl('img/cse/cip-to-cse.png')} alt="Data flow diagram" width="800"/>

### CSE ingestion best practices

We recommend the following ingestion processes, starting with the most preferred:

1. **Follow an ingestion guide**. The [Ingestion Guides](/docs/cse/ingestion) section of this help site provides specific collection and ingestion recommendations for many common products and services. An ingestion guide describes the easiest way to get data from a particular product into CSE. When you’re ready to start using CSE to monitor a new product, if there’s a CSE ingestion guide for it, we recommend using it.   
     
1. **Use a Cloud-to-Cloud (C2C) connector**. If you don’t see an Ingestion Guide for your data source, check to see if there is a C2C connector. It’s an easy method, because if you configure your C2C source to send logs to CSE, it automatically tags messages it sends to CSE with fields that contain the mapping hints that CSE requires.   

    Most C2C connectors have a **Forward to SIEM** option in the configuration UI. If a C2C connector lacks that option, you can achieve the same effect by assigning a field named `_siemforward`, set to *true*, to the connector.  

    For information about what C2C sources are available, see Cloud-to-Cloud Integration Framework.  
     
1. **Use a Sumo Logic Source and parser**. If there isn’t a C2C connector for your data source, your next best option is to use a Sumo Logic Source (running on an Installed Collector or a Hosted Collector, depending on the data source)—and a Sumo Logic parser, if we have one for the data source.   

    To check if there’s a parser for your data source, go to the **Manage Data > Logs > Parsers** page in the Sumo Logic UI. If there is a parser for your data source, but you find it doesn’t completely meet your needs–for instance if the parser doesn’t support the particular log format you use–consider customizing the parser with a [local configuration](/docs/cse/schema/parser-editor#create-a-local-configuration-for-a-system-parser). If that’s not practical, you can submit a request for a new parser by filing a ticket at [https://support.sumologic.com](https://support.sumologic.com/).  

    When you forward logs to CSE for parser processing, there are two bits of important configuration:  
     
    1. Configure the source to forward logs. To configure an HTTP source to send log messages to CSE, click the **SIEM Processing** checkbox. You can configure other source types to send data to CSE by assigning a field named `_siemforward`, set to *true*, to the source. For example:  

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

        :::note 
        You can get the path to a parser on the **Manage Data > Logs > Parsers** page in Sumo Logic. Click the three-dot more options menu in the row for a parser, and select **Copy Path**.
        :::

1. **Use a Sumo Logic Source and CSE Ingest mapping**. This is the least recommended method, as you have to manually configure the mapping hints in an ingestion mapping. For more information, see [Configure a Sumo Logic Ingest Mapping](/docs/cse/ingestion/sumo-logic-ingest-mapping/).

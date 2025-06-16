---
id: grok-deprecation-notice
title: Grok Deprecation Notice
sidebar_label: Grok Deprecation
description: Learn about deprecation of Grok and what you need to know about migrating to Sumo Logic data sources.
---
<head>
  <meta name="robots" content="noindex" />
</head>

## Update your Cloud SIEM data sources

On January 19, 2024, Sumo Logic deprecates the Grok parsing service. For over two years Sumo Logic has been using Sumo Parsers and Cloud-to-Cloud (C2C) integrations as the approved methods of ingesting data into Cloud SIEM. If your Sumo Logic Instance contains sources that are utilizing Grok for parsing, you must migrate them to use the supported C2Cs or Sumo Logic parsers.

If you do not configure your data sources to use the supported C2Cs or Sumo Logic parsers, then you will lose the ability for those data sources to create any Records, Signals, or Insights within Cloud SIEM on the Grok deprecation date and going forward.

## Setting up Cloud-to-Cloud integrations

The Cloud-to-Cloud Integration Framework is a fully-managed collection system that collects logs and events directly from SaaS and Cloud platforms. This data often includes custom events and user data critical for operations monitoring, security, and compliance use cases. As a fully managed collection system, integrations running within the Cloud-to-Cloud Integration Framework provide a secure endpoint to receive event data in your account. Integration authentication, scheduling, and state tracking are all managed by the framework.

Documentation on setting up C2C integrations are available publicly at [Cloud-to-Cloud Integration Framework Sources](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/). 

## Setting up Sumo Logic parsers

To set up Sumo Logic parsers, we recommend following [Cloud SIEM ingestion best practices](/docs/cse/ingestion/cse-ingestion-best-practices/) as described below.

If there isn’t a C2C connector for your data source, your next best option is to use a Sumo Logic Source (running on an Installed Collector or a Hosted Collector, depending on the data source)—and a Sumo Logic parser, if we have one for the data source.   

To check if there’s a parser for your data source, go to the **Manage Data > Logs > Parsers** page in the Sumo Logic UI. If there is a parser for your data source, but you find it doesn’t completely meet your needs–for instance if the parser doesn’t support the particular log format you use–consider customizing the parser with a [local configuration](/docs/cse/schema/parser-editor#create-a-local-configuration-for-a-system-parser). If that’s not practical, you can submit a request for a new parser by filing a ticket at [https://support.sumologic.com](https://support.sumologic.com/).  

    When you forward logs to Cloud SIEM for parser processing, there are two bits of important configuration:  
    1. Configure the source to forward logs. To configure an HTTP source to send log messages to Cloud SIEM, click the **SIEM Processing** checkbox. You can configure other source types to send data to Cloud SIEM by assigning a field named `_siemforward`, set to *true*, to the source. For example:  
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

## Additional references

* [Cloud SIEM Ingestion Best Practices](/docs/cse/ingestion/cse-ingestion-best-practices/)
* [Ingestion Sources for Cloud SIEM](/docs/cse/ingestion/ingestion-sources-for-cloud-siem/)
* [Cloud-to-Cloud Integration Framework Sources](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/) 
* [Troubleshoot Parsers](/docs/cse/troubleshoot/troubleshoot-parsers/)

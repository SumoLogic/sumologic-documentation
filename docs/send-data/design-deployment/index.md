---
slug: /send-data/design-your-deployment
---

# Design Your Deployment

To send your data to Sumo Logic you have a few options. We have two types of installed agents and offer a collector fully hosted by us.

* **Installed agents**

    * **Distribution of OpenTelemetry** is the next-generation agent
        for data collection. It is built entirely on [OpenTelemetry
        Collector](https://github.com/open-telemetry/opentelemetry-collector "https://github.com/open-telemetry/opentelemetry-collector").

    * **Installed Collectors** are lightweight and efficient. You can
        choose to install a small number of Collectors to minimize
        maintenance or to keep your topology simple. Alternatively, you
        can choose to install many Collectors on many machines to
        distribute the bandwidth impact across your network rather than
        having it centralized.

* **Hosted Collectors** reside in the Cloud allowing for seamless
    collection from Amazon Web Services, Google, Microsoft, and many
    other Cloud services.

## OpenTelemetry

The Sumo Logic Distro of [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector) is built with the [opentelemetry-collector-builder](https://github.com/open-telemetry/opentelemetry-collector-builder) and provides a single unified agent to send Logs, Metrics, Traces, and Metadata for Observability to Sumo Logic.

See the [Deployment Guide](https://github.com/SumoLogic/sumologic-otel-collector#readme) in our sumologic-otel-collector GitHub repository for detailed instructions on how to configure and migrate your existing collection.

It's supported on *Linux*, *MacOS*, and *Kubernetes* environments and can use any of the following Sources:

* Local File
* Host/Process Metrics
* HTTP Traces
* Streaming Metrics
* Syslog
* Telegraf Input Plugins

For full details on limitations, what's supported, and what's different see our [comparison documentation](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/Comparison.md).

## Installed Collectors

[Installed Collectors](../installed-collectors/about-installed-collectors.md) are deployed in your environment, on a local machine, a machine in your organization, or even an Amazon Machine Image (AMI). Installed Collectors require a software download and installation. Upgrades to Collector software are released regularly by Sumo Logic.

Consider having an Installed Collector on a dedicated machine when:

* You need to collect data with a [Source only available on Installed Collectors](/docs/send-data/sources/installed-collectors).
* You are running a very high-bandwidth network with high logging levels.
* You want a central collection point for many Sources.

Consider having more than one Installed Collector if:

* You expect the Collector to ingest from at least 500 separate files.
* Your hardware has memory or CPU limitations.
* You expect combined logging traffic for one Collector to be higher
    than 15,000 events per second.
* Your network clusters or regions are geographically separated.
* You prefer to install many Collectors, for example, one per machine
    to collect local files.

To help design your deployment see [how Installed Collectors work](../installed-collectors/about-installed-collectors.md) and  [Best Practices: Local and Centralized Data Collection](best-practices-local-centralized-data-collection.md).

For details on system requirements, see Installed Collector requirements.

## Hosted Collectors

Unlike Installed Collectors, [Hosted Collectors](../hosted-collectors.md) don't require installation or activation, nor do Hosted Collectors have physical requirements since they're hosted by Sumo Logic in AWS.

Because there are no performance issues to consider, you can configure as many Sources as you'd like, up to 1,000, for a single Hosted Collector. Consider setting up more than one Hosted Collector if you'd like to tag different data types with different metadata.

See how to [configure a Hosted Collector](../configure-hosted-collector.md) and all of the available [Sources supported on Hosted Collectors](/docs/send-data/sources/hosted-collectors).

### Logging levels

The more sensitive the logging level settings are for your applications and devices, the more logs will be sent to the Sumo Logic Cloud. In order to maximize the value of your log collection and analysis, set the logging level as high as you can without negatively impacting the CPU utilization of the machine where the Collector is running. The more searchable data you collect, the more information you have for forensic analysis and troubleshooting.

If you have additional questions, a [Sumo Logic sales representative](https://www.sumologic.com/contact-us/ "https://www.sumologic.com/contact-us/") can help determine specific recommendations for your installation.

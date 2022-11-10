---
id: choose-collector-source
title: Choosing a Sumo Logic Collector and Source
sidebar_label: Choose a Collector and Source
description: Design a Sumo Logic deployment that's right for your organization.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

To send your data to Sumo Logic, you have a few options. We have two types of installed agents and offer a collector fully hosted by us.

## Sumo Logic Collectors

### OpenTelemetry Distribution (Installed Agent)

**Distribution of OpenTelemetry** is the next-generation agent for data collection. It is built entirely on [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector).

The Sumo Logic Distro of [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector) is built with the [opentelemetry-collector-builder](https://github.com/open-telemetry/opentelemetry-collector-builder) and provides a single unified agent to send Logs, Metrics, Traces, and Metadata for Observability to Sumo Logic.

See the [Deployment Guide](https://github.com/SumoLogic/sumologic-otel-collector#readme) in our sumologic-otel-collector GitHub repository for detailed instructions on how to configure and migrate your existing collection.

It's supported on *Linux*, *MacOS*, and *Kubernetes* environments and can use any of the following Sources:

* Local File
* Host/Process Metrics
* HTTP Traces
* Streaming Metrics
* Syslog
* Telegraf Input Plugins

For full details on limitations, what's supported, and what's different see our [comparison documentation](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/comparison.md).

### Installed Collectors (Installed Agent)

**Installed Collectors** are lightweight and efficient. You can choose to install a small number of Collectors to minimize maintenance or to keep your topology simple. Alternatively, you can choose to install many Collectors on many machines to distribute the bandwidth impact across your network rather than having it centralized.

[Installed Collectors](/docs/send-data/installed-collectors) are deployed in your environment, on a local machine, a machine in your organization, or even an Amazon Machine Image (AMI). Installed Collectors require a software download and installation. Upgrades to Collector software are released regularly by Sumo Logic.

Consider having an Installed Collector on a dedicated machine when:

* You need to collect data with a [Source only available on Installed Collectors](/docs/send-data/installed-collectors/sources).
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

To help design your deployment see [how Installed Collectors work](/docs/send-data/installed-collectors) and [Best Practices: Local and Centralized Data Collection](/docs/send-data/best-practices#local-and-centralized-data-collection).

For details on system requirements, see Installed Collector requirements.

### Hosted Collectors

**Hosted Collectors** reside in the Cloud allowing for seamless collection from Amazon Web Services, Google, Microsoft, and many other Cloud services.

Unlike Installed Collectors, [Hosted Collectors](/docs/send-data/hosted-collectors/) don't require installation or activation, nor do Hosted Collectors have physical requirements since they're hosted by Sumo Logic in AWS.

Because there are no performance issues to consider, you can configure as many Sources as you'd like, up to 1,000, for a single Hosted Collector. Consider setting up more than one Hosted Collector if you'd like to tag different data types with different metadata.

See how to [configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) and all of the available [Sources supported on Hosted Collectors](/docs/send-data/hosted-collectors/).

#### Logging levels

The more sensitive the logging level settings are for your applications and devices, the more logs will be sent to the Sumo Logic Cloud. In order to maximize the value of your log collection and analysis, set the logging level as high as you can without negatively impacting the CPU utilization of the machine where the Collector is running. The more searchable data you collect, the more information you have for forensic analysis and troubleshooting.

If you have additional questions, a [Sumo Logic sales representative](https://www.sumologic.com/contact-us) can help determine specific recommendations for your installation.


### Compare Installed and Hosted Collectors

Depending on the method you'd like to collect logs, and the types of logs you'd like to collect, Sumo Logic has two types of Collectors you can choose from.

<Iframe url="https://www.youtube.com/embed/ZcbHoC1jZz4?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

The following table shows the major differences between them.

| Installed Collector | Hosted Collector |
|--|--|
| <ul><li>Installed on a system within your deployment locally or remotely.</li><li>Sources collect data available in your deployment.</li><li>Easy to troubleshoot based on Collector logs.</li><li>Supports using Local Configuration File Management so you can use JSON files to configure Sources.</li></ul> | <ul><li>Hosted by Sumo Logic. Agentless: no software to install or activate on a system in your deployment.</li><li>Hosts Sources to collect seamlessly from AWS, Google, and Microsoft products.</li><li>Can receive logs and metrics uploaded via a URL.</li></ul> |


## Sumo Logic Sources

<img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="75"/>

Sources are the environments that Sumo Logic Collectors connect to collect data from your site. Each Source is configured to collect files in a specific way, depending on the type of Collector you're using.

 * [Sources for Installed Collectors](/docs/send-data/installed-collectors/sources) are configured on Installed Collectors.
 * [Sources for Hosted Collectors](/docs/send-data/hosted-collectors/) are hosted along with the Collector in Amazon Web Services (AWS), Microsoft, or other hosting services.

When registering a Collector, you also have the option of [configuring the Collector using a Source JSON](/docs/send-data/use-json-configure-sources) file.

:::note
The maximum number of Sources allowed on a Collector is 1,000.
:::

<Iframe url="https://www.youtube.com/embed/CfWXz6UkpIc"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

### Allowlisting Sources that collect from AWS 

If you're configuring a Source that collects from Amazon Web Services (AWS), you may need to allowlist AWS IP addresses. AWS makes current IP address ranges available in JSON format. Amazon advises that this file changes several times a week.

In particular, you'll need to allowlist the IP address associated with your Sumo Logic endpoint.  For example, if your deployment is in the U.S., you'll need to allowlist the us-east region IP addresses.  See Sumo Logic Endpoints and Firewall Security for information on determining your endpoint.

For details on how the file is updated, its use, its syntax, and to download the JSON file, go to [http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html](http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html).

---
id: configuration
title: Installed Collector Configuration
description: Learn how to install and configure Collectors to gather data to send to Sumo Logic, and read about deployment options and volume limitations.
---

An *Installed Collector* is a Java agent that receives logs and metrics from its Sources and then encrypts, compresses, and sends the data to the Sumo service.

As the name implies, an Installed Collector is installed in your environment, as opposed to a Hosted Collector, which resides on the Sumo service. After installing a Collector, you add Sources, to which the Collector connects to obtain data to send to the Sumo service. 

A Sumo Source is an object configured for a specific Collector that sends data to Sumo Logic. There are a number of Source types that work with Installed Collectors. For a list of all Sources supported by Installed Collectors, see [Sources for Installed Collectors](/docs/send-data/installed-collectors/sources).

See [how to choose a collector](/docs/send-data/choose-collector-source) for guidance on when to use a single or multiple Installed Collectors.

:::note
The maximum number of Collectors allowed per organization is 10,000.
:::

<Iframe url="https://www.youtube.com/embed/QxGCrxbJ1Vs"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe';

## CPU usage guidelines

:::tip system requirements
For details on supported operating systems and hardware restrictions, see [Installed Collector requirements](/docs/get-started/system-requirements/#installed-collector-requirements).
:::

An Installed Collector will use all CPU processing resources available on a machine to collect your data. We have benchmarked CPU performance based on the number of [Local File Sources](/docs/send-data/installed-collectors/sources/local-file-source) running on an Installed Collector and the size of log messages ingested. The default allocated memory of 128 MB of Java heap space was used.

:::tip
The Collector can try to keep CPU usage at a targeted percentage when using Local and Remote File Sources.
:::

Use the following observations to guide you when designing your deployment. The following data was generated from a Collector on an Amazon EC2 m4.large [instance type](https://aws.amazon.com/ec2/instance-types/) with 2 virtual CPUs and 8 GiB of memory.

### Size of messages

An Installed Collector performs better when collecting larger sized log messages. For example, at 5% CPU usage 10 KB of logs can be ingested at 100 logs per second (**1,000 KB/sec**). Whereas, 1 KB of logs can be ingested at 500 logs per second (**500 KB/sec**).

**Events Per Second (EPS) achieved by message size and CPU usage:**

The columns are the Average CPU and Average Message Size.

| Average CPU |  100 B |  512 B |   1 KB |   5 KB |   10 KB |
|:--|:--|:--|:--|:--|:--|
| **5%** | 1,500 | 900 | 500 | 150 | 100 |
| **10%** | 3,800 | 2,000 | 1,500 | 400 | 200 |
| **20%** | > 7,500 | 3,900 | 2,000 | 750 | 450 |
| **50%** | 23,000 | 9,800 | 6,000 | 1,800 | 900 |
| **90%** | > 35,000 | 17,000 | 11,000 | 3,300 | 1,700 |

### Number of Sources

Generally, as the number of Sources increases, the number of threads also increases. The Collector will use three threads per available CPU by default, you can [increase the max threads](/docs/send-data/collector-faq#increase-max-threads-collector) if needed.

**1,000 events per second with 1 KB message size:**

| Number of Local File Sources  | Ubuntu Process CPU Usage | Windows Process CPU Usage |
|:--|:--|:--|
| 1 | 5% | 3.5% |
| 2 | 7.5% | 5% |
| 4 | 15% | 12.5% |
| 8 | 30% | 25% |
| 16 | 70% | 50% |
| 32 | 90% | 100% |

**5,000 events per second with 1 KB message size:**

| Number of Local File Sources | Ubuntu Process CPU Usage | Windows Process CPU Usage |
|:--|:--|:--|
| 1 | 20% | 17.5% |
| 2 | 40% | 35% |
| 4 | 90% | 65% |
| 8 |   | 90% |

**10,000 events per second with 1 KB message size:**

| Number of Local File Sources | Ubuntu & Windows Process CPU Usage |
|:--|:--|
| 1 | 40% |
| 2 | 82.5% |
| 4 | 90% |

## About Collector and Source installation and configuration

This section is an overview of the multiple methods Sumo provides for
installing and configuring Collectors and Sources.

### Collector installation and configuration

Sumo provides multiple methods for installing a Collector:

* UI installers. You provide configuration settings during the installation dialog. The installer writes these settings to `user.properties` in the collector’s `/config` directory. 
* Command-line installer. You supply configuration settings on the command line, or using a varfile. the installer writes these settings to `user.properties` in the collector’s  `/config` directory.   
* RPM, for Linux. You supply configuration settings in a `user.properties` file that you create.
* Binary package, for Linux. The binary package can also be used on MacOS.

For details on Collector installation, see [Install a Collector on Linux](linux.md), [Install a Collector on MacOS](macos.md), and [Install a Collector on Windows](windows.md).
 

After a Collector is up and running, you can change some Installed Collector configuration settings by editing `user.properties` and restarting the collector. For more information, see [user.properties parameters](collector-installation-reference/user-properties.md).

A few Installed Collector behaviors, such as caching, are configured in the `collector.properties` file in the Collector’s `config` directory.  

You can update the configuration of an Installed Collector using the Collector Management API. For more information, see Collector API Methods and Examples.

### Source configuration

You can set up as many as 1,000 Sources on a given Collector. A Source should be configured to collect similar data types. For example, you might set up three Local File Sources to collect router activity logs from three locations, and another Local File Source to collect logs from a web application.

Each Source is tagged with its own metadata, as described in [Metadata Naming Conventions](/docs/send-data/reference-information/metadata-naming-conventions.md). The more Sources you set up, the easier it is to isolate one of the Sources in a search since each Source can be identified by its metadata.

When you configure Sources that read from log files, you specify a path expression that defines what files to scan. You can optionally configure a denylist of files to exclude from collection.  

You can create Sources using the Sumo web app at any time after Collector installation. For source-specific instructions, see the topics below [Sources for Installed Collectors](/docs/send-data/installed-collectors/sources).

Alternatively, you can define Sources for an Installed Collector in a UTF-8 encoded JSON file, in which case you must provide the file when starting the Collector for the first time. For more information, see [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources). Note that if you provide the Sources configuration in a JSON file, you can no longer manage the Sources through the Sumo web app or the Collector Management API.

## Installed Collectors and Sources in action

This section is an overview of how Installed Collectors and their Sources operate.

### Installed Collector startup

When you start up an Installed Collector for the first time it registers with Sumo and creates any Sources that you have defined in a UTF-8 encoded JSON source configuration file.

When the collector tries to register with Sumo it first sends the request to the US1 deployment. If your organization is in another deployment Sumo will redirect the Collector to your deployment URL based on the authentication credential's deployment. You can define the deployment URL in the Collector's [user.properties](collector-installation-reference/user-properties.md) file with the `url` parameter.

### Sources scan source data

Sources scan their target directory or data structure periodically. A Local File Source scans target directories every two seconds. For Windows Performance Monitor Sources and Script Sources, you configure the scan interval when you define the source.

For support purposes, an Installed Collector automatically collects its version, uptime, OS version, OS architecture, Java version, and JVM instance ID. Installed Collectors running on AWS also collect instance type, instance ID, and instance region.

### How an Installed Collector sends data to the Sumo service

An Installed Collector starts sending data to the Sumo service as soon as it is available from the Sources configured on the Collector. Before sending the data, a Collector compresses (by a factor of 10x) and encrypts the data. A Collector sends data to the Sumo service over HTTPS.

#### Fingerprint

To keep track of what it has already sent to the Sumo service, the Collector tracks a file by its fingerprint (the first 2048 bytes of the file) and by a read pointer that indicates the last line read by the Collector. This fingerprint is then compared to a list of known fingerprints from that Source. If the fingerprint does not match one in the known list we start reading that file's content from the beginning and send it to Sumo. If a matching fingerprint is found in the list we start reading from the last known byte mark of that file. The Collector updates this information approximately every second. A file's fingerprint is retained for some period of time after file deletion, otherwise it is removed.

An issue that could arise is seeing duplicated log messages for a log file that is written to very slowly. When a file is slowly written and the first messages in the file are not larger than 2kb the fingerprint for the Source file can be overwritten with each log line, up to the point those first lines add up to 2kb.

Another possible issue is seeing the Collector not ingesting from a file where the first 2kb of the files match another file previously Collected due to fingerprint matching. In this case, the Collector believes it has already read from the file and could wait at the last known line collected before we see collection begin again at that point.

To resolve these issues, you can adjust the fingerprint size to match your needs. 
1. Stop the current Collector service/process.
1. Locate the following Collector configuration file, **`/<sumo_install_dir>/config/collector.properties`**.
1. Add the following parameter to change the default fingerprint size  for all Sources on the Collector. The number represents bytes: **`collector.wildcard.fpSize=2048`**.
1. Restart the Collector process/service.

### Throttling, caching, and flushing

Ordinarily, a Collector sends data to the Sumo service as fast as its connection allows. Under some circumstances, the Sumo service may instruct a Collector to throttle itself or slow the rate at which it is sending data to the service. 

To determine whether throttling is required, Sumo measures the amount of data already committed to uploading against the number of previous requests and available resources (quota) in an account. In other words, Sumo Logic compares the current ingestion with the rate of ingest using a per minute rate that can be derived from the contracted daily GB/day rate.

The Sumo service tells the Collector it can speed up when throttling is no longer necessary.

For more information, see Manage Ingestion. 

#### Caching

Installed Collectors cache outbound data when throttled or paused or if the connection to the Sumo service is lost. Data is cached first in memory and then on disk. By default, a Collector supports caching the following amounts:

Up to 4GB total disk space, including:

* Up to 3GB for log data
* Up to 1GB for metric data

You can raise or lower the disk limits for Collector caching. For more information, see [Configure Limits for Collector Caching](/docs/send-data/collector-faq#configure-limits-collector-caching).

#### Flushing mode

Unlike the fixed size cache, which evicts old data to make room for new data, flushing mode stops collection of new data and focuses only on sending existing data (flushing the cache).

A Collector enters flushing mode when less than 10% of free disk space remains on the disk where the Collector is installed. For more information, see [Flushing Mode](/docs/send-data/collector-faq#flushing-mode).

## Collector monitoring and logging

An Installed Collector sends a heartbeat to the Sumo service every 15 seconds. If the Sumo service does not receive a heartbeat for 30 minutes, it considers the Collector to be offline, and shows its health status as red in the **Collection** page of the Sumo web app. The heartbeat is linked to the [`alive` parameter](/docs/send-data/use-json-configure-sources)in the JSON object. If an Installed Collector
appears offline try restarting the service and [testing connectivity](collector-installation-reference/test-connectivity-sumo-collectors.md).

The Collector uses the log4j2 framework. You can tailor log rotation behavior for `collector.log` by editing the `log4j2.xml` file in the collector’s `/config` directory. For more information, see Log Rotation Settings.

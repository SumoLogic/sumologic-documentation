---
id: system-requirements
title: System Requirements
description: Supported Browsers and other requirements for running Sumo Logic.
---

Sumo Logic has a few system requirements, which are documented in the following topics.

## Supported Browsers

Although the Sumo Logic Service can be accessed on devices with Internet connectivity, we recommend that you work with a desktop or laptop for the best experience. This is what we test. 

Sumo Logic tests the service on several browsers to ensure a consistent experience with each feature update and supports the following web browser versions:

| Browser | Supported Versions |
|:------------------|:------------------------|
| Chrome\*         | Latest two versions    |
| Firefox\*        | Latest two versions    |
| Microsoft Edge\* | Latest two versions    |
| Safari\*\*       | Latest two versions    |

* For non-Safari browsers, we support the last two major versions; that is, if the latest browser version is 25.1.5, we support versions from 24.0.0 to 25.1.1.
* For Safari, we support the last two minor versions; that is, if the latest browser version is 25.2.5, we support versions from 25.1.0 to 25.2.1. If the latest version is 25.0.5 and the last 24.x version was 24.4.3, we support versions from 24.4.0 to 25.1.5.

## Installed Collector Requirements

### Hardware platform

* Single core, 512MB RAM
* 8GB disk space

[Configure Limits for Collector Caching](/docs/send-data/collector-faq#configure-limits-collector-caching) to adjust the required disk space.

### Memory guidelines

An Installed Collector by default is allocated 128MB of Java heap space (memory), but depending on the operating system running on the machine, whether the machine is 32 bit or 64 bit, and the number of Sources and log messages being collected a Collector may require a significantly higher amount of memory. In particular, If you're using [centralized collection](/docs/send-data/best-practices), additional memory is required. It's a good idea to have 256MB to 512MB available in case it's needed.

The total physical memory consumption of the Java Virtual Machine (JVM) process consists of more than just the Java heap space. This can increase the total memory used by the Collector. For example, other things that the process includes could be:

* The JVMs' own binaries 
* Loaded libraries (including JAR and class files) 
* Control structures for the Java heap 
* Thread stacks

The [memory settings](/docs/send-data/collector-faq#increase-collector-memory) for the Java virtual machine (Xms and Xmx) set the limits for the available heap for the user executable code within the JVM, and not necessarily for the overall memory footprint. The Xmx and Xms flags configure the class loader limits for the user's code. In this case, the Collector code that tails logs and other things is managed within the JVM.

Each Collector outputs logs in the `/InstallationDirectory/logs/` directory. The log file that provides the most information about memory issues is named `collector.log`. You can review the log for any memory errors.

For information about increasing Collector memory and monitoring Collector logs, see [Increase Collector Memory](/docs/send-data/collector-faq#increase-collector-memory).

### Network connection

Sumo Logic automatically redirects Installed Collectors to the correct collection endpoint when registering to your account. If you have or need specific network security policies you'll need to allow outbound traffic to Sumo Logic endpoints for collection to work.

Sumo Logic has several deployments that are assigned depending on the geographic location and the date an account is created. See our table of [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for details.

Also, see how to [Test Connectivity of Sumo Logic Collectors](/docs/send-data/installed-collectors/collector-installation-reference/test-connectivity-sumo-collectors).

### Virtual Memory

In many cases, you will also notice what appears to be a high amount of "virtual memory" being used by the collector process. This virtual memory is typically unused blocks on disk, which are currently still addressed to the Collector process. This is an exaggeration of the physical memory required at runtime (the memory initially required to get the JVM started). Once the process is running, this virtual memory is usually paged out, or released, since it is no longer required. Just after startup, it is common to see this amount hover from 400MB to 500MB.

### Supported Operating Systems

:::note
Package installers require TLS 1.2 or higher.
:::

* Windows 7, 32 or 64 bit
* Windows 8, 32 or 64 bit
* Windows 8.1, 32 or 64 bit
* Windows 10, 32 or 64 bit
* Windows 11, 32, or 64 bit
* Windows Server 2012
* Windows Server 2016
* Windows Server 2019
* Windows Server 2022
* Red Hat Enterprise Linux 6+
* CentOS 6+
* Ubuntu Linux 14+
* Debian Linux 8+
* Amazon Linux AMI
* SuSE 12+
* SELinux enabled on RHEL 7.5 & 8.4
* Mac OS X (10.10 and Later), x86 (64 bit)

Support is limited for non listed operating systems with Java 1.8+. You can try to use the binary package to install a Collector on 64 bit systems, 32 bit is not supported.

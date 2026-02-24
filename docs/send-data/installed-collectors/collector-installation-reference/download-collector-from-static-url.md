---
id: download-collector-from-static-url
title: Download a Collector from a Static URL
description: Static URLs provide download links to the most recent version of a Collector.
---

To download the latest version of our [Installed Collector](/docs/send-data/installed-collectors) agent, use our static URL as described below. Collector versions are updated each time there is a release or patch.

:::note not for otel collectors
This document provides static URLs to download our [Installed Collector](/docs/send-data/installed-collectors) agent. If you're looking for our OpenTelemetry distribution, go to our [Sumo Logic Distribution for OpenTelemetry](/docs/send-data/opentelemetry-collector/) for more details.
:::

## How to download

1. Open a terminal window or command prompt, depending on your host type.
1. Invoke a web request utility such as `wget` or `Invoke-WebRequest`. For example, if you're on a Linux 64-bit host, you can `wget` the Collector from the command line:
   ```bash
   wget "https://download-collector.sumologic.com/rest/download/linux/64" -O SumoCollector.sh && chmod +x SumoCollector.sh
   ```

   Or, if you're using PowerShell on a 64-bit Windows host, you can use Invoke-WebRequest:

   ```sh
   # configure usage of TLS

   [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]'Tls,Tls11,Tls12'

   # download the installer

   Invoke-WebRequest 'https://download-collector.sumologic.com/rest/download/win64' -outfile $home\Desktop\SumoCollector.exe
   ```

   Replace the `<download_path>` with the location where you want to download the Collector. For example, `C:\user\download\sumouser\SumoCollector.exe`.

:::important
Older versions of PowerShell might fail to download the installer executable with a message "Could not create SSL/TLS secure channel." In such cases, we recommended upgrading to the latest version of PowerShell or use an alternative utility, such as "grep," to perform the download.
:::

## Download URLs for each pod by host type

Each Sumo Logic deployment has URLs used to download Collector software. See how to determine which endpoint to use if you are unsure.

The latest release of the Sumo Logic Collector targets the Java 17 runtime. Java runtime versions less than 17 are no longer supported as the Collector runtime, and Solaris is no longer supported. When you upgrade Collectors, JRE 17 or later is required. The Sumo Collector with a bundled JRE now ships with JRE 17, so in this case no action is required.

### AU Collector

| Binaries | New Download URL (Preferred) | Old Download URL (Deprecating soon) |
| :-- | :-- | :-- |
| Linux x86_64 | https://download-collector.au.sumologic.com/rest/download/linux/64 | https://collectors.au.sumologic.com/rest/download/linux/64 |
| Linux AArch64 | https://download-collector.au.sumologic.com/rest/download/linux/aarch/64 | https://collectors.au.sumologic.com/rest/download/linux/aarch/64 | 
| Linux x86_64 Debian | https://download-collector.au.sumologic.com/rest/download/deb/64 | https://collectors.au.sumologic.com/rest/download/deb/64 |
| Linux AArch64 Debian | https://download-collector.au.sumologic.com/rest/download/deb/aarch/64 | https://collectors.au.sumologic.com/rest/download/deb/aarch/64 |
| Linux x86_64 RPM | https://download-collector.au.sumologic.com/rest/download/rpm/64 | https://collectors.au.sumologic.com/rest/download/rpm/64 |
| Linux AArch64 RPM | https://download-collector.au.sumologic.com/rest/download/rpm/aarch/64 | https://collectors.au.sumologic.com/rest/download/rpm/aarch/64 |
| macOS | https://download-collector.au.sumologic.com/rest/download/macos | https://collectors.au.sumologic.com/rest/download/macos |
| Tarball | https://download-collector.au.sumologic.com/rest/download/tar | https://collectors.au.sumologic.com/rest/download/tar |
| Windows 32 | https://download-collector.au.sumologic.com/rest/download/windows | https://collectors.au.sumologic.com/rest/download/windows |
| Windows 64 | https://download-collector.au.sumologic.com/rest/download/win64 | https://collectors.au.sumologic.com/rest/download/win64 |

### CA Collector

| Binaries | New Download URL (Preferred) | Old Download URL (Deprecating soon) |
| :-- | :-- | :-- |
| Linux x86_64 | https://download-collector.ca.sumologic.com/rest/download/linux/64 | https://collectors.ca.sumologic.com/rest/download/linux/64 |
| Linux AArch64 | https://download-collector.ca.sumologic.com/rest/download/linux/aarch/64 | https://collectors.ca.sumologic.com/rest/download/linux/aarch/64 | 
| Linux x86_64 Debian | https://download-collector.ca.sumologic.com/rest/download/deb/64  | https://collectors.ca.sumologic.com/rest/download/deb/64 |
| Linux AArch64 Debian |  https://download-collector.ca.sumologic.com/rest/download/deb/aarch/64 | https://collectors.ca.sumologic.com/rest/download/deb/aarch/64 |
| Linux x86_64 RPM | https://download-collector.ca.sumologic.com/rest/download/rpm/64 | https://collectors.ca.sumologic.com/rest/download/rpm/64 |
| Linux AArch64 RPM | https://download-collector.ca.sumologic.com/rest/download/rpm/aarch/64 | https://collectors.ca.sumologic.com/rest/download/rpm/aarch/64 |
| macOS | https://download-collector.ca.sumologic.com/rest/download/macos | https://collectors.ca.sumologic.com/rest/download/macos |
| Tarball | https://download-collector.ca.sumologic.com/rest/download/tar | https://collectors.ca.sumologic.com/rest/download/tar |
| Windows 32 | https://download-collector.ca.sumologic.com/rest/download/windows | https://collectors.ca.sumologic.com/rest/download/windows |
| Windows 64 | https://download-collector.ca.sumologic.com/rest/download/win64 | https://collectors.ca.sumologic.com/rest/download/win64 |


### DE Collector

| Binaries | New Download URL (Preferred) | Old Download URL (Deprecating soon) |
| :-- | :-- | :-- |
| Linux x86_64 |  https://download-collector.de.sumologic.com/rest/download/linux/64 | https://collectors.de.sumologic.com/rest/download/linux/64 |
| Linux AArch64 | https://download-collector.de.sumologic.com/rest/download/linux/aarch/64 | https://collectors.de.sumologic.com/rest/download/linux/aarch/64 | 
| Linux x86_64 Debian | https://download-collector.de.sumologic.com/rest/download/deb/64  | https://collectors.de.sumologic.com/rest/download/deb/64 |
| Linux AArch64 Debian |  https://download-collector.de.sumologic.com/rest/download/deb/aarch/64 | https://collectors.de.sumologic.com/rest/download/deb/aarch/64 |
| Linux x86_64 RPM | https://download-collector.de.sumologic.com/rest/download/rpm/64 | https://collectors.de.sumologic.com/rest/download/rpm/64 |
| Linux AArch64 RPM | https://download-collector.de.sumologic.com/rest/download/rpm/aarch/64 | https://collectors.de.sumologic.com/rest/download/rpm/aarch/64 |
| macOS | https://download-collector.de.sumologic.com/rest/download/macos | https://collectors.de.sumologic.com/rest/download/macos |
| Tarball | https://download-collector.de.sumologic.com/rest/download/tar | https://collectors.de.sumologic.com/rest/download/tar |
| Windows 32 | https://download-collector.de.sumologic.com/rest/download/windows | https://collectors.de.sumologic.com/rest/download/windows |
| Windows 64 | https://download-collector.de.sumologic.com/rest/download/win64 | https://collectors.de.sumologic.com/rest/download/win64 |


### EU Collector

| Binaries | New Download URL (Preferred) | Old Download URL (Deprecating soon) |
| :-- | :-- | :-- |
| Linux x86_64 | https://download-collector.eu.sumologic.com/rest/download/linux/64 |https://collectors.eu.sumologic.com/rest/download/linux/64  |
| Linux AArch64 | https://download-collector.eu.sumologic.com/rest/download/linux/aarch/64 | https://collectors.eu.sumologic.com/rest/download/linux/aarch/64 | 
| Linux x86_64 Debian | https://download-collector.eu.sumologic.com/rest/download/deb/64  | https://collectors.eu.sumologic.com/rest/download/deb/64 |
| Linux AArch64 Debian |  https://download-collector.eu.sumologic.com/rest/download/deb/aarch/64 | https://collectors.eu.sumologic.com/rest/download/deb/aarch/64 |
| Linux x86_64 RPM | https://download-collector.eu.sumologic.com/rest/download/rpm/64 | https://collectors.eu.sumologic.com/rest/download/rpm/64 |
| Linux AArch64 RPM | https://download-collector.eu.sumologic.com/rest/download/rpm/aarch/64 | https://collectors.eu.sumologic.com/rest/download/rpm/aarch/64 |
| macOS | https://download-collector.eu.sumologic.com/rest/download/macos | https://collectors.eu.sumologic.com/rest/download/macos |
| Tarball | https://download-collector.eu.sumologic.com/rest/download/tar | https://collectors.eu.sumologic.com/rest/download/tar |
| Windows 32 | https://download-collector.eu.sumologic.com/rest/download/windows | https://collectors.eu.sumologic.com/rest/download/windows |
| Windows 64 | https://download-collector.eu.sumologic.com/rest/download/win64 | https://collectors.eu.sumologic.com/rest/download/win64 |


### FED Collector

| Binaries | New Download URL (Preferred) | Old Download URL (Deprecating soon) |
| :-- | :-- | :-- |
| Linux x86_64 | https://download-collector.fed.sumologic.com/rest/download/linux/64 | https://collectors.fed.sumologic.com/rest/download/linux/64 |
| Linux AArch64 | https://download-collector.fed.sumologic.com/rest/download/linux/aarch/64 | https://collectors.fed.sumologic.com/rest/download/linux/aarch/64 | 
| Linux x86_64 Debian | https://download-collector.fed.sumologic.com/rest/download/deb/64  | https://collectors.fed.sumologic.com/rest/download/deb/64 |
| Linux AArch64 Debian |  https://download-collector.fed.sumologic.com/rest/download/deb/aarch/64 | https://collectors.fed.sumologic.com/rest/download/deb/aarch/64 |
| Linux x86_64 RPM | https://download-collector.fed.sumologic.com/rest/download/rpm/64 | https://collectors.fed.sumologic.com/rest/download/rpm/64 |
| Linux AArch64 RPM | https://download-collector.fed.sumologic.com/rest/download/rpm/aarch/64 | https://collectors.fed.sumologic.com/rest/download/rpm/aarch/64 |
| macOS | https://download-collector.fed.sumologic.com/rest/download/macos | https://collectors.fed.sumologic.com/rest/download/macos |
| Tarball | https://download-collector.fed.sumologic.com/rest/download/tar | https://collectors.fed.sumologic.com/rest/download/tar |
| Windows 32 | https://download-collector.fed.sumologic.com/rest/download/windows | https://collectors.fed.sumologic.com/rest/download/windows |
| Windows 64 | https://download-collector.fed.sumologic.com/rest/download/win64 | https://collectors.fed.sumologic.com/rest/download/win64 |

### JP Collector

| Binaries | New Download URL (Preferred) | Old Download URL (Deprecating soon) |
| :-- | :-- | :-- |
| Linux x86_64 | https://download-collector.jp.sumologic.com/rest/download/linux/64 | https://collectors.jp.sumologic.com/rest/download/linux/64 |
| Linux AArch64 | https://download-collector.jp.sumologic.com/rest/download/linux/aarch/64 | https://collectors.jp.sumologic.com/rest/download/linux/aarch/64  | 
| Linux x86_64 Debian | https://download-collector.jp.sumologic.com/rest/download/deb/64  | https://collectors.jp.sumologic.com/rest/download/deb/64 |
| Linux AArch64 Debian |  https://download-collector.jp.sumologic.com/rest/download/deb/aarch/64 | https://collectors.jp.sumologic.com/rest/download/deb/aarch/64 |
| Linux x86_64 RPM | https://download-collector.jp.sumologic.com/rest/download/rpm/64 | https://collectors.jp.sumologic.com/rest/download/rpm/64 |
| Linux AArch64 RPM | https://download-collector.jp.sumologic.com/rest/download/rpm/aarch/64 | https://collectors.jp.sumologic.com/rest/download/rpm/aarch/64 |
| macOS | https://download-collector.jp.sumologic.com/rest/download/macos | https://collectors.jp.sumologic.com/rest/download/macos |
| Tarball | https://download-collector.jp.sumologic.com/rest/download/tar | https://collectors.jp.sumologic.com/rest/download/tar |
| Windows 32 | https://download-collector.jp.sumologic.com/rest/download/windows | https://collectors.jp.sumologic.com/rest/download/windows |
| Windows 64 | https://download-collector.jp.sumologic.com/rest/download/win64 | https://collectors.jp.sumologic.com/rest/download/win64 |

### US1 Collector

| Binaries | New Download URL (Preferred) | Old Download URL (Deprecating soon) |
| :-- | :-- | :-- |
| Linux x86_64 | https://download-collector.sumologic.com/rest/download/linux/64 | https://collectors.sumologic.com/rest/download/linux/64 |
| Linux AArch64 | https://download-collector.sumologic.com/rest/download/linux/aarch/64 | https://collectors.sumologic.com/rest/download/linux/aarch/64 | 
| Linux x86_64 Debian | https://download-collector.sumologic.com/rest/download/deb/64  | https://collectors.sumologic.com/rest/download/deb/64 |
| Linux AArch64 Debian |  https://download-collector.sumologic.com/rest/download/deb/aarch/64 | https://collectors.sumologic.com/rest/download/deb/aarch/64 |
| Linux x86_64 RPM | https://download-collector.sumologic.com/rest/download/rpm/64 | https://collectors.sumologic.com/rest/download/rpm/64 |
| Linux AArch64 RPM | https://download-collector.sumologic.com/rest/download/rpm/aarch/64 | https://collectors.sumologic.com/rest/download/rpm/aarch/64 |
| macOS | https://download-collector.sumologic.com/rest/download/macos | https://collectors.sumologic.com/rest/download/macos |
| Tarball | https://download-collector.sumologic.com/rest/download/tar | https://collectors.sumologic.com/rest/download/tar |
| Windows 32 | https://download-collector.sumologic.com/rest/download/windows | https://collectors.sumologic.com/rest/download/windows |
| Windows 64 | https://download-collector.sumologic.com/rest/download/win64 | https://collectors.sumologic.com/rest/download/win64 |


### US2 Collector

| Binaries | New Download URL (Preferred) | Old Download URL (Deprecating soon) |
| :-- | :-- | :-- |
| Linux x86_64 | https://download-collector.us2.sumologic.com/rest/download/linux/64 | https://collectors.us2.sumologic.com/rest/download/linux/64 |
| Linux AArch64 | https://download-collector.us2.sumologic.com/rest/download/linux/aarch/64 | https://collectors.us2.sumologic.com/rest/download/linux/aarch/64 | 
| Linux x86_64 Debian | https://download-collector.us2.sumologic.com/rest/download/deb/64  | https://collectors.us2.sumologic.com/rest/download/deb/64 |
| Linux AArch64 Debian |  https://download-collector.us2.sumologic.com/rest/download/deb/aarch/64 | https://collectors.us2.sumologic.com/rest/download/deb/aarch/64 |
| Linux x86_64 RPM | https://download-collector.us2.sumologic.com/rest/download/rpm/64 | https://collectors.us2.sumologic.com/rest/download/rpm/64 |
| Linux AArch64 RPM | https://download-collector.us2.sumologic.com/rest/download/rpm/aarch/64 | https://collectors.us2.sumologic.com/rest/download/rpm/aarch/64 |
| macOS | https://download-collector.us2.sumologic.com/rest/download/macos | https://collectors.us2.sumologic.com/rest/download/macos |
| Tarball | https://download-collector.us2.sumologic.com/rest/download/tar | https://collectors.us2.sumologic.com/rest/download/tar |
| Windows 32 | https://download-collector.us2.sumologic.com/rest/download/windows | https://collectors.us2.sumologic.com/rest/download/windows |
| Windows 64 | https://download-collector.us2.sumologic.com/rest/download/win64 | https://collectors.us2.sumologic.com/rest/download/win64 |

### KR Collector

| Binaries | New Download URL (Preferred) | Old Download URL (Deprecating soon) |
| :-- | :-- | :-- |
| Linux x86_64 | https://download-collector.kr.sumologic.com/rest/download/linux/64 |https://collectors.kr.sumologic.com/rest/download/linux/64  |
| Linux AArch64 | https://download-collector.kr.sumologic.com/rest/download/linux/aarch/64 | https://collectors.kr.sumologic.com/rest/download/linux/aarch/64  | 
| Linux x86_64 Debian | https://download-collector.kr.sumologic.com/rest/download/deb/64  | https://collectors.kr.sumologic.com/rest/download/deb/64 |
| Linux AArch64 Debian |  https://download-collector.kr.sumologic.com/rest/download/deb/aarch/64 | https://collectors.kr.sumologic.com/rest/download/deb/aarch/64 |
| Linux x86_64 RPM | https://download-collector.kr.sumologic.com/rest/download/rpm/64 | https://collectors.kr.sumologic.com/rest/download/rpm/64 |
| Linux AArch64 RPM | https://download-collector.kr.sumologic.com/rest/download/rpm/aarch/64 | https://collectors.kr.sumologic.com/rest/download/rpm/aarch/64 |
| macOS | https://download-collector.kr.sumologic.com/rest/download/macos | https://collectors.kr.sumologic.com/rest/download/macos  |
| Tarball | https://download-collector.kr.sumologic.com/rest/download/tar | https://collectors.kr.sumologic.com/rest/download/tar |
| Windows 32 | https://download-collector.kr.sumologic.com/rest/download/windows | https://collectors.kr.sumologic.com/rest/download/windows |
| Windows 64 | https://download-collector.kr.sumologic.com/rest/download/win64 | https://collectors.kr.sumologic.com/rest/download/win64 |

## Download older versions

To download older version collectors, append `?version=19.XXX-X` to the static URLs quoted above.

For example, if you want to download version 19.461-1 of our Windows 64 bit installed collector from our AU service, you'd use the URL: https://collectors.au.sumologic.com/rest/download/win64/?version=19.461-1.

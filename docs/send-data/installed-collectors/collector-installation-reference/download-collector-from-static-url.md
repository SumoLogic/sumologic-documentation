---
id: download-collector-from-static-url
title: Download a Collector from a Static URL
description: Static URLs provide download links to the most recent version of a Collector.
---

Use our static URLs to download the most recent version of a Collector. The version of the Collector will be updated each time there is a release or patch.

:::note
This document provides static URLs to download our [Installed Collector](/docs/send-data/installed-collectors) agent. If you're looking for our OpenTelemetry distribution, go to our [OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/) for more details.
:::


1. Open a terminal window or command prompt, depending on your host type.
1. Invoke a web request utility such as `wget` or `Invoke-WebRequest`. For example, if you're on a Linux 64-bit host, you can `wget` the Collector from the command line:
  ```bash
  wget "https://collectors.sumologic.com/rest/download/linux/64" -O SumoCollector.sh && chmod +x SumoCollector.sh
  ```

  Or, if you're using PowerShell on a 64-bit Windows host, you can use Invoke-WebRequest:

  ```
  # configure usage of TLS

  [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]'Tls,Tls11,Tls12'

  # download the installer

  Invoke-WebRequest 'https://collectors.sumologic.com/rest/download/win64' -outfile '<download_path>\SumoCollector.exe'
  ```

  Replace the `<download_path>` with the location where you want to download the Collector. For example, `C:\user\download\sumouser\SumoCollector.exe`.

:::important
Older versions of PowerShell might fail to download the installer executable with a message "Could not create SSL/TLS secure channel." In such cases it is recommended that you upgrade to the latest version of PowerShell or use an alternative utility, such as "grep," to perform the download.
:::

## URLs for each pod by host type

Each Sumo deployment has URLs used to download Collector software. See how to determine which endpoint to use if you are unsure.

The latest release of the Sumo Collector targets the Java 8 runtime. Java 6 and Java 7 are no longer supported as the Collector runtime, and Solaris is no longer supported. When you upgrade Collectors, JRE 8 or later is required. The Sumo Collector with a bundled JRE now ships with JRE 8, so in this case no action is required.

### AU Collector download URLs

Choose one of the following:

* Linux 64: https://collectors.au.sumologic.com/rest/download/linux/64
* Linux Aarch 64: https://collectors.au.sumologic.com/rest/download/linux/aarch/64
* Linux Debian: https://collectors.au.sumologic.com/rest/download/deb/64
* Linux Aarch Debian: https://collectors.au.sumologic.com/rest/download/deb/aarch/64
* Linux RPM: https://collectors.au.sumologic.com/rest/download/rpm/64
* Linux Aarch RPM: https://collectors.au.sumologic.com/rest/download/rpm/aarch/64
* Mac OS: https://collectors.au.sumologic.com/rest/download/macos
* Tarball: https://collectors.au.sumologic.com/rest/download/tar
* Windows 32: https://collectors.au.sumologic.com/rest/download/windows
* Windows 64: https://collectors.au.sumologic.com/rest/download/win64

### CA Collector download URLs

Choose one of the following:

* Linux 64: https://collectors.ca.sumologic.com/rest/download/linux/64
* Linux Aarch 64: https://collectors.ca.sumologic.com/rest/download/linux/aarch/64
* Linux Debian: https://collectors.ca.sumologic.com/rest/download/deb/64
* Linux Aarch Debian: https://collectors.ca.sumologic.com/rest/download/deb/aarch/64
* Linux RPM: https://collectors.ca.sumologic.com/rest/download/rpm/64
* Linux Aarch RPM: https://collectors.ca.sumologic.com/rest/download/rpm/aarch/64
* Mac OS: https://collectors.ca.sumologic.com/rest/download/macos
* Tarball: https://collectors.ca.sumologic.com/rest/download/tar
* Windows 32: https://collectors.ca.sumologic.com/rest/download/windows
* Windows 64: https://collectors.ca.sumologic.com/rest/download/win64

### DE Collector download URLs

Choose one of the following:

* Linux 64: https://collectors.de.sumologic.com/rest/download/linux/64
* Linux Aarch 64: https://collectors.de.sumologic.com/rest/download/linux/aarch/64
* Linux Debian: https://collectors.de.sumologic.com/rest/download/deb/64
* Linux Aarch Debian: https://collectors.de.sumologic.com/rest/download/deb/aarch/64
* Linux RPM: https://collectors.de.sumologic.com/rest/download/rpm/64
* Linux Aarch RPM: https://collectors.de.sumologic.com/rest/download/rpm/aarch/64
* Mac OS: https://collectors.de.sumologic.com/rest/download/ macos
* Tarball: https://collectors.de.sumologic.com/rest/download/tar
* Windows 32: https://collectors.de.sumologic.com/rest/download/windows
* Windows 64: https://collectors.de.sumologic.com/rest/download/win64

### EU Collector download URLs

Choose one of the following:

* Linux 64: https://collectors.eu.sumologic.com/rest/download/linux/64
* Linux Aarch 64: https://collectors.eu.sumologic.com/rest/download/linux/aarch/64
* Linux Debian: https://collectors.eu.sumologic.com/rest/download/deb/64
* Linux Aarch Debian: https://collectors.eu.sumologic.com/rest/download/deb/aarch/64
* Linux RPM: https://collectors.eu.sumologic.com/rest/download/rpm/64
* Linux Aarch RPM: https://collectors.eu.sumologic.com/rest/download/rpm/aarch/64
* Mac OS: https://collectors.eu.sumologic.com/rest/download/macos
* Tarball: https://collectors.eu.sumologic.com/rest/download/tar
* Windows 32: https://collectors.eu.sumologic.com/rest/download/windows
* Windows 64: https://collectors.eu.sumologic.com/rest/download/win64

### FED Collector download URLs

Choose one of the following:

* Linux 64: https://collectors.fed.sumologic.com/rest/download/linux/64
* Linux Aarch 64: https://collectors.fed.sumologic.com/rest/download/linux/aarch/64
* Linux Debian: https://collectors.fed.sumologic.com/rest/download/deb/64
* Linux Aarch Debian: https://collectors.fed.sumologic.com/rest/download/deb/aarch/64
* Linux RPM: https://collectors.fed.sumologic.com/rest/download/rpm/64
* Linux Aarch RPM: https://collectors.fed.sumologic.com/rest/download/rpm/aarch/64
* Mac OS: https://collectors.fed.sumologic.com/rest/download/macos
* Tarball: https://collectors.fed.sumologic.com/rest/download/tar
* Windows 32: https://collectors.fed.sumologic.com/rest/download/windows
* Windows 64: https://collectors.fed.sumologic.com/rest/download/win64

### IN Collector download URLs

Choose one of the following:

* Linux 64: https://collectors.in.sumologic.com/rest/download/linux/64
* Linux Aarch 64: https://collectors.in.sumologic.com/rest/download/linux/aarch/64
* Linux Debian: https://collectors.in.sumologic.com/rest/download/deb/64
* Linux Aarch Debian: https://collectors.in.sumologic.com/rest/download/deb/aarch/64
* Linux RPM: https://collectors.in.sumologic.com/rest/download/rpm/64
* Linux Aarch RPM: https://collectors.in.sumologic.com/rest/download/rpm/aarch/64
* Mac OS: https://collectors.in.sumologic.com/rest/download/macos
* Tarball: https://collectors.in.sumologic.com/rest/download/tar
* Windows 32: https://collectors.in.sumologic.com/rest/download/windows
* Windows 64: https://collectors.in.sumologic.com/rest/download/win64

### JP Collector download URLs

Choose one of the following:

* Linux 64: https://collectors.jp.sumologic.com/rest/download/linux/64
* Linux Aarch 64: https://collectors.jp.sumologic.com/rest/download/linux/aarch/64
* Linux Debian: https://collectors.jp.sumologic.com/rest/download/deb/64
* Linux Aarch Debian: https://collectors.jp.sumologic.com/rest/download/deb/aarch/64
* Linux RPM: https://collectors.jp.sumologic.com/rest/download/rpm/64
* Linux Aarch RPM: https://collectors.jp.sumologic.com/rest/download/rpm/aarch/64
* Mac OS: https://collectors.jp.sumologic.com/rest/download/ macos
* Tarball: https://collectors.jp.sumologic.com/rest/download/tar
* Windows 32: https://collectors.jp.sumologic.com/rest/download/windows
* Windows 64: https://collectors.jp.sumologic.com/rest/download/win64

### US1 Collector download URLs

Choose one of the following:

* Linux 64: https://collectors.sumologic.com/rest/download/linux/64
* Linux Aarch 64: https://collectors.sumologic.com/rest/download/linux/aarch/64
* Linux Debian: https://collectors.sumologic.com/rest/download/deb/64
* Linux Aarch Debian: https://collectors.sumologic.com/rest/download/deb/aarch/64
* Linux RPM: https://collectors.sumologic.com/rest/download/rpm/64
* Linux Aarch RPM: https://collectors.sumologic.com/rest/download/rpm/aarch/64
* Mac OS: https://collectors.sumologic.com/rest/download/macos
* Tarball: https://collectors.sumologic.com/rest/download/tar
* Windows 32: https://collectors.sumologic.com/rest/download/windows
* Windows 64: https://collectors.sumologic.com/rest/download/win64

### US2 Collector download URLs

Choose one of the following:

* Linux 64: https://collectors.us2.sumologic.com/rest/download/linux/64
* Linux Aarch 64: https://collectors.us2.sumologic.com/rest/download/linux/aarch/64
* Linux Debian: https://collectors.us2.sumologic.com/rest/download/deb/64
* Linux Aarch Debian: https://collectors.us2.sumologic.com/rest/download/deb/aarch/64
* Linux RPM: https://collectors.us2.sumologic.com/rest/download/rpm/64
* Linux Aarch RPM: https://collectors.us2.sumologic.com/rest/download/rpm/aarch/64
* Mac OS: https://collectors.us2.sumologic.com/rest/download/macos
* Tarball: https://collectors.us2.sumologic.com/rest/download/tar
* Windows 32: https://collectors.us2.sumologic.com/rest/download/windows
* Windows 64: https://collectors.us2.sumologic.com/rest/download/win64

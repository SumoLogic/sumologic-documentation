---
id: collector
title: Collector Release Notes
sidebar_label: Collector
description: You'll find a list of new Collector features and relevant bug fixes for each release. In order to begin using the features listed here, you'll need to upgrade Collector software.
---

Collector Release Notes for the current year are listed here. If you need to see previous Collector Release Notes, check the [archive](/docs/releasenotes/archive).

You can upgrade [Installed Collectors](/docs/send-data/installed-collectors/about.md) in the following ways:

* [Web Application](/docs/manage/collection/upgrade-collectors.md)
* [Command Line](/docs/manage/collection/upgrade-collectors.md)
* [Collector Management API](/docs/API/Collector#Upgrade-or-Downgrade-Collectors-Using-the-API)

:::note
Our [static URLs](/docs/send-data/installed-collectors/collector-installation-reference/download-collector-from-static-url.md) are available to download the most recent Collector version.
:::

---
### July 20, 2022 (19.403-1)

* Feature: Collector support for Linux ARM/Aarch64 based instances
* Security update: Ant updated to 1.9.16. Fixes CVE-2021-36373 and CVE-2021-36374
* Security update: Mina-statemachine updated to 2.1.4. Fixes CVE-2021-41973
* Security update: Netty updated to 4.1.77.Final. Fixes CVE-2021-37136, CVE-2021-37137, CVE-2021-21409, CVE-2021-21295, CVE-2021-21290, CVE-2021-43797 and CVE-2021-21290
* Bug Fix: Collector not properly escaping double quotes present in Active Directory objects
* Bug Fix: Retry with skipping events introduced for windows event collection for certain scenarios where bad events were resulting in retry timeouts
* Known issues when upgrading to this version:
  * Collector running as non-root user. Collector running as non-root user ( run as mode) cannot be upgraded through the API/Web UI. It will run and give an error message that the upgrade is not possible. It needs to be upgraded manually on your machine. Steps to manually upgrade.
  * Collector running on Mac. Collector running on a Mac operating system cannot be upgraded through the API/Web UI. It will stop. It needs to be restarted manually on your machine if upgraded using WEB API or UI. Steps to manually restart.

---
### July 7, 2022 (19.392-13)
Bug Fix: Upgrade Manager fixes were made to avoid a manual restart after a Collector upgrade.

---
### May 11, 2022 (19.392-6)
Security: Upgraded the Collector JRE to [8.332.08.1](https://github.com/corretto/corretto-8/releases/tag/8.332.08.1) to address several CVEs:

For details, see the changelog [here](https://github.com/corretto/corretto-8/blob/release-8.332.08.1/CHANGELOG.md).

---
### April 18, 2022 (19.392-4)
* Security: Removed a writeable zero-byte file that was previously included in Debian and RPM installers.
* Bug Fix: Source configuration requests were not sent to the correct deployment.
* Bug Fix: Duplicate Windows events ingested after upgrading to version 19.386-16 and the Windows API returning an incorrect order of events.
* Bug Fix: The Docker Log Source did not retain the indentation of log messages.
* Bug Fix: `Nullpointerexception` resulted in duplication of events.
* Bug Fix: Log4j vulnerability found during installation via RPM method and Docker image.
* Bug Fix: Local File Source multiline boundary regex had an idle timeout issue.
* Bug Fix: Better handling of Active Directory Inventory.

---
### March 3, 2022 (19.386-16)
Bundled JRE version upgraded to 8.322.06.2.
* Bug fix: Memory leak in Windows Events, record number logic for standard event channels.
* Bug fix: Local Windows Event Log Source ingested in legacy format during upgrade when JSON format selected.
* Bug fix: Collector upgrade failure resulting in collector service stopping.
* Bug fix: Log4j vulnerability in RPM and Debian packages.
* Bug fix: Windows Active Directory Source has more default attributes.
* Bug fix: Security fix for Script Source.

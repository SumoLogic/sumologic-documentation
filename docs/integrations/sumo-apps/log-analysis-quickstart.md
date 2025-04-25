---
id: log-analysis-quickstart
title: Log Analysis QuickStart App
sidebar_label: Log Analysis QuickStart
description: The Log Analysis QuickStart app, created for new users of Sumo Logic, includes searches to extract important information from your log files, independent of where they get generated.
---

The Log Analysis QuickStart app, created for new users of Sumo Logic, includes searches to extract important information from your log files, independent of where they get generated.

Whether you're new to log management or plan to migrate from other products, the Log Analysis QuickStart app will bring you up to speed with the Sumo Logic search, visualization, and analytics capabilities.

## Installing the Log Analysis QuickStart app

import AppInstallV2 from '../../reuse/apps/app-install-v2.md';

<AppInstallV2/>

## Viewing Log Analysis QuickStart dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Keywords and Metadata

This dashboard provides several ways to monitor your logs based on the metadata of your data. All of the panels include searches for specific issues. You can learn more about metadata options in [Built-In Metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata).

* **High Priority Keywords.** Displays how often the terms error, failure, and exception appear in all log messages over time.
* **Medium Priority Keywords.** Displays how often the terms time out, warn, check, exist, reject, deny, and timeout appear in all log messages over time.
* **Issues by Origin.** Displays how often high priority keywords occur by the origin of issue, which could be application, data or service.
* **Issues in Top Categories.** This Panel shows the top 10 source categories by number of log messages that contain error, exception, or failure terms.
* **Issues in Top 10 Hosts.** Displays the top 10 hosts by number of log messages that contain error, exception, or failure terms.
* **Issues in Top 10 Files.** Shows the top 10 files by number of log messages that contain error, exception, or failure terms.
* **Issues by Category.** This panel displays the number of log messages that contain error, exception, or failure terms by Source Category over time.
* **Issues by Host.** Displays the number of log messages that contain time out, error, exceptions, and failures broken down by Source Host over time.
* **Issues by File Name.** Displays the number of log messages that contain error, exception, or failure terms issues by log file name over time.

### Collectors and Source Monitoring

The panels in the Collector and Source Monitoring dashboard help you keep an eye on the machines running Collectors and Sources. If a machine begins to have issues (such as no logs being uploaded to Sumo Logic) you'll know at a glance.

* **Issues by Collector.** This panel displays the number of log messages that contain error, exception, or failure terms by Collector.
* **Issues by Source.** Shows the number of log messages that contain error, exception, or failure terms by each Collector's Source.
* **Collector Issue Monitoring.** Displays warnings generated over time for each Collector in your deployment.

## Upgrade/Downgrade the Log Analysis QuickStart app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Log Analysis QuickStart app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
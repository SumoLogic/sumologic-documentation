---
id: upgrade-collectors
title: Upgrade Collectors in Sumo Logic
sidebar_label: Upgrade a Collector
description: When you upgrade a Collector, the upgrade file is automatically downloaded and executed from Sumo Logic. You can also download the latest Collector version and upgrade your installed Collector using operating system commands.
---

Deploying an upgrade to one or more collectors can be done through Sumo Logic. When you initiate a collector upgrade, the installed collector downloads the upgrade package directly from the Sumo Logic service. We recommend you follow our [best practices](#collector-upgrade-best-practices) when you upgrade your Collectors.

You can also downgrade a collector to a previous version, as described in this topic.

When upgrading an installed collector, the Java Runtime Environment (JRE) will be automatically downloaded. If the JRE that the collector is bundled with is newer than the JRE installed with the collector, the bundled JRE will be downloaded and installed. However, if you have manually specified a newer JRE in the `user.properties` file (or sumo.conf in older installations), the newer version will be used.

An upgrade requested through the web application uses HTTPS (port 443) to upgrade files and instruct the Collector to restart.

### How will I know when an upgrade is available?

When one or more collectors in your Sumo Logic account are eligible for an upgrade, you'll be notified through the collectors page of the Sumo Logic web application:

![Upgrade collectors](/img/collector/upgrade-collectors-icon.png)

:::important
The user interface will show up to 50 Collectors at a time. After upgrading one or more Collectors you can close and reopen the 'Upgrade Collectors' window to display other upgradable Collectors. You may consider conducting upgrades with the [Collector Management API](/docs/api/collector-management/upgrade-downgrade-collectors).
:::

### Upgrade collectors to the latest build

You can choose to deploy the upgrade to all collectors or you can pick and choose individual collectors to install the upgrade (depending on scheduling needs or other factors).

:::note
The upgrade may automatically be done in increments. In this case, you may experience longer upgrade times.
:::

To install an upgrade on one or more collectors:

1. In Sumo Logic, select **Manage Data > Collection > Collection**.
1. Click the **Upgrade Collectors** link.
1. Determine if you'd like to install the upgrade on individual collectors or on all collectors simultaneously. Then, choose one of the following:
    * Click **Update** next to the name of a collector to install the upgrade just on that specific collector. This option can be used if a policy prevents you from upgrading every collector at the same time of day, or if you can't deploy the upgrade all at once. Any collectors you choose not to upgrade will remain available in the upgrade dialog box so you can install the upgrade at a later time.
    * If you can safely upgrade all collectors, click **Update All.**
    :::note
    We strongly advise you to validate collector upgrades on non-production hosts before upgrading production collectors.
    :::

![Upgrade collectors](/img/collector/upgrade-collectors-1.png)

The upgrade process begins immediately after you click **Update** or **Update All**; the file is automatically downloaded and installed. You'll be notified when the upgrade has completed successfully.

Collectors that are offline or that have already been upgraded aren't eligible for upgrade and won't be included in the list of available collectors in the upgrade collectors dialog box.

### Downgrade a collector to an earlier version

You can choose to downgrade a Collector or Collectors to an earlier version for testing or other purpose. 

To downgrade one or more collectors to an earlier build:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. Click the **Edit** link on the right of an installed collector.
1. Click the **Change Version** beside the current version.
1. Select the version to install. 

The upgrade/downgrade process begins immediately after you click a build.

![Downgrade collector](/img/collector/change-version.png)

### Troubleshooting upgrade failures

If collector upgrade fails, the existing version will continue running on that collector, with no disruption in service. However, it's important to keep collectors up-to-date. If an upgrade fails, the red error icon appears in the dialog box, letting you know that the upgrade process was incomplete. Hover over the icon to see the failure reason.

Click **Retry** to start the process over.

![Retry collector upgrade](/img/collector/upgrade-collectors-troubleshoot.png)

Failure can occur for any of the following reasons:

* Lack of available disk space.
* Permission errors blocked access for Sumo Logic.
* Possible network failures occurred during the upgrade.

If an upgrade repeatedly fails, contact [Sumo Logic Customer Support](https://support.sumologic.com/home). Alternatively, you can manually upgrade the collector.


## Upgrade Collectors using the Command Line

Before upgrading an Installed Collector review [Collector Upgrade Best Practices](#collector-upgrade-best-practices).

The steps to upgrade an Installed Collector using the command line are similar to the steps used for installing the Collector with the command line. See [Installed Collectors](/docs/send-data/installed-collectors) for details.

Download the collector in either of the following ways:

* In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. Click **Add Collector**, click **Installed Collector,** and then click the link for the collector to begin the download.
* Open a browser and enter the static URL for your Sumo deployment. See [how to determine which endpoint to use](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) if you are unsure. The download begins immediately. See [Download a Collector from a Static URL](/docs/send-data/installed-collectors/collector-installation-reference/download-collector-from-static-url.md) for a list of the URLs for your Linux version and deployment pod.

See the following table for commands:

| Operating System | Command |
| :-- | :-- |
| Linux | When upgrading on Ubuntu 16 and above using a shell executable file (.sh), Debian, or the Web UI you will need to manually restart the collector service after upgrading using the following command. See [Start or Stop a Collector](start-stop-collector-using-scripts.md) for details. <br/><br/> Command: `sudo ./collector start` |
| Linux RPM | Upgrade command: `sudo rpm -U <pathToCollectorRPMFile>`<br/><br/>Downgrade command: `sudo rpm -U --oldpackage <pathToCollectorRPMFile>`<br/><br/>There may be a warning message regarding the deletion of the `safeRestart.cmd` file, this is safe to ignore. |
| Linux Debian | Upgrade or downgrade command: `sudo dpkg -i <pathToCollectorDebianFile>` |
| Linux 32 or 64 | Upgrade or downgrade command:  `sudo <pathToCollectorShFile> -q` |
| Windows | Upgrade or downgrade command: `SumoCollector.exe -console -q` |
| MacOS | Use the same steps to [Install a Collector on MacOS](/docs/send-data/installed-collectors/macos.md) without the authentication credentials. |

## Collector Upgrade Best Practices

We recommend you follow these best practices when upgrading Installed Collectors.

:::sumo Community Script
There is a community supported script available on GitHub that uses the Collector API to conduct bulk actions to Collectors, see [Collector Management Script](https://github.com/SumoLogic/collector-management-client).
:::

### Stay Current

While we make every effort to keep backwards compatibility for collectors, many new collector versions contain important bug fixes along with new functionality, so we recommend keeping up-to-date with collector versions you’re using in your production environments. You can read the [Release Notes](/release-notes-collector) for each Collector version here, so you know exactly what changes are made.

### Use the Sumo Logic User Interface to Upgrade

When one or more of your Collectors are eligible for an upgrade, you'll be notified through the collectors page in our UI. Follow the [instructions](upgrade-collectors.md) to upgrade (or downgrade) as needed.

![Upgrade collectors with search](/img/collector/upgrade-collectors-icon.png)

:::note
If you are performing a manual upgrade, make sure that you backup your `\<sumo_hom\>/config` directory before you upgrade because it stores the current source information. If any issues occur during upgrade that leave the Collector unable to connect to the service, or result in missing sources, you can restore this directory and restart the Collector to address the problem.
:::

### Test Your New Collector in a Staging Environment

We go to great lengths to test each new Collector version before making it generally available to our customers. However, given the number of small differences possible in customer environments, corner cases can get past our testing and into our generally available Collector versions. For this reason, we strongly recommend that you always try a new Collector version in a representative staging environment or on a small number of Production servers before rolling out across your entire environment.

### Check These 3 Items When Testing Your Collector

Although regressions and new bugs are rare in our Collectors, when they do occur, they typically show themselves in one of a few known ways. So, after rolling out a new Collector version into a test, staging or fractional production environment, monitor the following things:

* Observe if the Collector is ingesting roughly the amount of data you expect.  You can monitor this from the Account / Status page.
* For file-based sources on the new Collector version, ensure the log files are rotating at the frequency you’d expect.
* For all installed Collectors, observe that the CPU, memory, I/O, and disk space utilization for the Collector process are inline with expectations and past Collector versions.

If you find abnormalities, contact [Sumo Logic Support](https://support.sumologic.com) to help investigate before you push the new Collector Version to full production status.

### Take a Methodical Approach to Collector Management

Follow this checklist whenever you make any changes to the collector:

* Have a baseline prior to any changes or updates.
* Perform any changes within a development or staging environment prior to production. Do this when:
  * Upgrading to a new Collector version.
  * Adding new Sources to a Collector.
  * Modifying existing Collector or Source configurations, such as memory, CPU throttling, etc.
  * Upgrading or patching the host environment.
* Monitor the staging environment for any significant changes to the following: 
  * Collector service CPU usage patterns
  * Collector service Memory usage patterns
  * Disk I/O and space utilization
* [Validate Collector service operation](/docs/manage/ingestion-volume/monitor-ingestion-receive-alerts.md):
  * Upgrade was successful and the Collector is online with the new version.
  * The Collector continues to run over a period of time without errors or failures.
  * Existing Sources continue to read and send data.
  * New Sources read and send data as expected.
* Validate Host/Application operation
  * Other services on the host continue to operate as expected without errors
* Make sure your monitoring covers a period of time that also includes any normal maintenance operations of the hosts, such as backups, virus scans, etc. to ensure there are no issues that come up during those specific tasks.

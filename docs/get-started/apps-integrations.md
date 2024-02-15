---
id: apps-integrations
title: Installing Apps and Integrations
sidebar_label: Installing apps
description: Learn how to install apps to your Library and to multiple environments.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/cloud/apps.png')} alt="icon" width="50"/>

Sumo Logic apps give you pre-configured searches and dashboards customized with your source configurations and populated in a folder selected by you. In this doc, you'll learn how to install apps from the **App Catalog** to your Library and how to manage them in multiple environments.

Sumo Logic apps address these common use cases:

* **Increase availability and performance.** Sumo Logic enables issues to be identified before they impact the application and customer. Precise, proactive analytics quickly uncover hidden root causes across all layers of the application and infrastructure stack.
* **Provide real-time insights.** With Sumo Logic enterprises easily extract machine data insights to provide greater intelligence around their customers, products, and application usage. These insights provide a more accurate and complete analysis for business users.
* **Accelerate Cloud deployment.** Sumo Logic enables enterprises to automate and speed the development and deployment process for cloud-based applications. Companies can rapidly detect, identify and resolve application issues.
* **Decrease app time to market.** With Sumo Logic, companies can implement a consistent release process resulting in on-time releases. They can easily identify application issues and configuration changes across development, test and deployment environments.
* **Enforce compliance.** Sumo Logic delivers a simple, proactive and automated process to audit and investigate operational, security and regulatory compliance incidents. All data is centralized, secured, and easily analyzed in real-time through a single, highly scalable solution.

In our **App Catalog**, you'll find two categories of apps: Next-Gen and Classic.

## App categories

### Next-Gen Apps

Our Next-Gen apps, which simplify the management and maintenance of apps, are designed to help you get started using the [Sumo Logic Distribution for OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) agent. For a limited time, you can still continue to send data through the Sumo Logic Installed Collector and Hosted Collector.

What makes Next-Gen different from Classic apps?

* Installation and updates must be performed by an administrator or a user with the **Manage Apps** role capability.
* App icons will display a badge indicating if it's been installed within your org.
* App icons will display a badge indicating if there's an app update available. The upgrade can then be applied with a single click.
* App uninstallation and removal can be completed directly in the App Catalog, making it easy to clean up apps you no longer use.  
* Additional filter options make it easy to find your installed or upgradeable apps.
* Upon app installation, content is installed into a shared **Installed Apps** folder that's visible to your entire org, making it easier to locate and upgrade, when needed.
* Installed app content is immutable, which ensure that any apps upgrades do not overwrite any customizations you may apply. If you wish to customize the content, you'll need to first make a custom copy of the content.

import AppInstall from '../reuse/apps/app-install-v2.md';

<AppInstall/>

### Classic Apps (Legacy)

All of our existing Classic apps will be converted to Next-Gen. In the meantime, our Classic apps will remain available to you within the Application Catalog.

import ClassicAppInstall from '../reuse/apps/app-install.md';

<ClassicAppInstall/>

## Prerequisites

| Account Type | Account Level |
| :-- | :-- |
| Cloud Flex | Trial, Professional, Enterprise |
| Credits | Trial, Essentials, Enterprise Operations, Enterprise Security, Enterprise Suite |

Certain apps have specific installation requirements. Be sure to check the instructions for your application for specific instructions.

:::important
Applications can be installed only by users with a Sumo Logic Professional or a Sumo Logic Enterprise account. Organizations with a Sumo Logic Free account currently cannot use Sumo Logic apps.
:::

## Install classic apps in multiple environments

If you have multiple environments generating data that you want to monitor using Sumo Logic apps — for example, environments for production, development, and testing — you’ll need to perform the following steps in each environment:

1. Set up Sumo Logic Collectors and Sources for each environment. Make sure that Source Hosts and Source Categories are named correctly in order to clearly indicate the environment name to the apps when they are installed.
1. Perform any prerequisites required for the particular Sumo Logic app in that environment. Each Sumo Logic app has unique requirements, so make sure to follow the specific instructions for that app.
1. Install an instance of the Sumo Logic app for each environment, configure it to accept data from that environment, and rename the app to reflecting the deployed environment.

Your data comes in from each of your environments (like production, development, testing) into the corresponding installed Sumo Logic app. The environment data and its Sources are identified by Host Names and Source Categories as configured by you or your administrators.

### Installation example

In this example, a company has three environments: qa, prod, and perf. You will configure the Sumo Logic Collectors and Sources to identify each environment correctly, perform any necessary prerequisites for the Sumo Logic app, then finally install an instance of the app for each of your environments.

#### Set up Sumo Logic Collectors and Sources

Before installing any applications, define your Collectors in each environment so that Source Host metadata indicates the deployment. For example, name them something like `abc13-qa-cluster01`, `acb10-prof-cluster03`, or `abc01-prod-cluster12`.

Optionally, you can set a Source Category to indicate these names as well, depending on how Sumo Logic is architected at your company.

#### Perform any Prerequisites required for the Sumo Logic app

Each Sumo Logic app has unique requirements, so make sure to follow the specific instructions for that app. For details, see Sumo Logic apps.

#### Install an Instance of the Sumo Logic app for each Environment

1. Install an instance of the Sumo Logic app for the first environment, **qa**.
   * If you have used Source Host to identify the environment, in the **Install Application** dialog, you can configure the app with a custom data filter using `_sourceHost=qa`.
   * If you have used a Source Category to delineate the deployment, when installing the app, you could configure it using the Source Category `_sourceCategory=qa-abc`.
   * Rename the title of the app to denote the environment it is configured for, for example, **Windows-QA**.
1. Next, install an instance of the Sumo Logic app for the **prod** environment.
   * In the **Install Application** dialog, indicate the name of the environment in the Source Host, such as `_sourceHost=prod`.
   * Rename the title of the app to denote the environment it is configured for, for example, **Windows-Prod**.
1. Finally, install an instance of the Sumo Logic app for the **perf** environment.
   * In the **Install Application** dialog, indicate the name of the environment in the Source Host, such as `_sourceHost=perf`.
   * Rename the title of the app to denote the environment it is configured for, for example, **Windows-Perf**.

## Certified by Sumo Logic

Many of our apps are labeled with the **Certified by Sumo Logic** designation. Just look for the blue checkmark symbol:

<img src={useBaseUrl('img/get-started/cert-app.png')} alt="cert-app.png" style={{border:'1px solid gray'}} width="500" />

These apps have gone through code and functional review with the Sumo Logic app development team as part of the [App Intelligence Partner Program](https://www.sumologic.com/technology-partners). This process includes feedback and re-review as needed, and ensures that apps certified through this process meet the team's quality standards.

## Troubleshooting

If you've installed a Sumo Logic app and no data appears in its Dashboards, you may have chosen the wrong Source Category.

Apps are dependent on the Source Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) associated with your logs. This metadata is established when Collectors and Sources are configured. Because each organization uses their own metadata methodology check with your Sumo Logic account's Administrator to get a better idea of which Source Category would be the best fit for a given app.

#### How can I change the Source Category associated with an app?

To change the Source Category used by an app, you can simply reinstall the same app. Currently, apps cannot be uninstalled or edited in any other way.

For more information, see [Custom Data Filters](#custom-data-filters).

## Run Searches from Sumo Logic apps

Sumo Logic apps provide a host of pre-built saved searches for popular data Sources that you can run against your data without installing the app itself. This way, you can try the searches in a Sumo Logic app against your data before you decide to install it. Or you can run the searches to see how good example queries are written.

To run a saved search from a Sumo Logic app, just find the search you want to run in the Library, click it, and select a Source Category or a custom data filter to run the search against. The Search page opens and runs the search in a new tab automatically using the query's time range.

In order to run a search from an app, you would first need to have data ingested in your system that the search query would find. For example, before you can run a search from the Sumo Logic app for Apache, you must set up a Collector and Source to ingest your Apache data. If you don't have data that matches the requirements of the search query, or if you select the incorrect Source Category or data filter, you will either get no results, or bad results.

After the search has run, you can [save the search](/docs/search/get-started-with-search/search-basics/save-search) to use it again in the future from the Library.

:::important
Searches from Enterprise apps, which require a paid Professional Services contract, are not included.
:::

To run a search from a Sumo Logic app:

1. Find the Sumo Logic app for the data Source you would like to search in the **App Catalog**. For example, we've picked Cloud Passage Halo's **Outlier in Critical Issues**.<br/><img src={useBaseUrl('/img/get-started/library/FindSearchInApp.png')} alt="Outlier in critical issues" style={{border:'1px solid gray'}} width="700" />
1. Find the search you want to run and click it.
1. In the **Run Search** dialog, select a **Source Category** or enter a **Custom data filter** to run the search against.<br/><img src={useBaseUrl('/img/get-started/library/RunSearch.png')} alt="Run a Search from an app" style={{border:'1px solid gray'}} width="500" />
1. Click **Run Search**.

The **Search** page opens, the search populates a new tab, and the search runs using the query's time range. If you would like to use a different time range, stop the search and reset it.

If you don't have data that matches the requirements of the search query, or if you select the incorrect Source Category or data filter, you will either get no results, or bad results.

:::note
Searches included with the [Sumo Logic app for Data Volume](/docs/integrations/sumo-apps/data-volume "Data Volume app") do not require you to select a Source Category.
:::

### Custom Data Filters

When you install a Sumo Logic app, you tell Sumo what data to search and present in app dashboards.

Most typically, you specify the source category that was assigned to the logs or metrics source when data collection was set up for the app. 

However, if you want to use multiple metadata fields as your filter criteria, for example, both source category and source host, you must define a custom data filter. The app will prefix its searches with your custom data filter. 

#### Define a custom data filter

1. In the App Catalog, select the application you want to install and click **Add Integration**.
1. Click the down arrow next to **Source Category**.<br/><img src={useBaseUrl('/img/get-started/library/add-apache.png')} alt="Custom Data Filter" style={{border:'1px solid gray'}} width="500" />
1. A **Custom Data Filter** option appears. Click the option.<br/><img src={useBaseUrl('/img/get-started/library/apache-custom-filter.png')} alt="apache-custom-filter" style={{border:'1px solid gray'}} width="500" />
1. Enter a filter expression in the **Custom Data Filter** field. For example filters, see [Example custom data filters](#example-custom-data-filters), below.<br/><img src={useBaseUrl('/img/get-started/library/apache-custom-filter-field.png')} alt="apache-custom-filter-field" style={{border:'1px solid gray'}} width="500" />

#### Example custom data filters

The table below has examples of custom data filters.

| Custom Data Filter | Description |
| :-- | :-- |
| `_sourceHost=stage-EMEA* AND _sourceCategory=Apache*` | App searches will return data whose source host begins with the string stage-EMEA and whose source category begins with the string Apache. |
| `_sourceCategory=Apache* AND "dev-us"` | App searches will return log data that contains the string dev-us whose source category begins with the string Apache. |
| `_sourceHost = "Jon Smith"` | App searches will return data whose source host is Jon Smith. If a metadata field value contains spaces, you must use quotes. |
| `_sourceHost=stage-EMEA* AND (_source=Apache* or _source=DB)` | App searches will return data whose source host begins with the string stage-EMEA and whose source either begins with Apache or is DB. We use parentheses to group the logic operations. |


## Log Analysis QuickStart app

The Log Analysis QuickStart app, created for new users of Sumo Logic, includes searches to extract important information from your log files, independent of where they get generated.

Whether you're new to log management or plan to migrate from other products, the Log Analysis QuickStart app will bring you up to speed with the Sumo Logic search, visualization, and analytics capabilities.

### Installation

To install the app:

1. From **App Catalog**, search for and select the **Log Analysis QuickStart** app.
1. Click **Add Integration**.<br/><img src={useBaseUrl('/img/get-started/library/log-quickstart-analysis.png')} alt="log-quickstart-analysis" style={{border:'1px solid gray'}} width="500" />
1. Select from **Source Category** values. Choose an existing `_sourceCategory` present in your account used for your Sumo Logic data.
    :::info
    If you do not select the correct `_sourceCategory`, data will not be loaded into the app. If you don't know which `_sourceCategory` to select, ask your administrator who configured the Source.
    :::
1. Leave the app in the default folder location (**Personal** folder in your **Library**) or choose a different location. You can also click **New Folder** to add it to a new folder.
1. Click **Next**. A dialog will confirm the app is installed successfully.

### Visits Dashboard

The Visits Dashboard displays identifying information about external and internal visitors across you deployment, including email addresses visitors are using.

<img src={useBaseUrl('/img/get-started/library/log-analysis-qs-visits.png')} alt="log_analysis_app_visits" style={{border:'1px solid gray'}} width="800" />

* **Geo Location of All Users.** Uses a geolocation search to display the locations of IP addresses used by visitors.
* **Frequent IP Addresses.** Shows a list of the most frequently used IP addresses by visitors.
* **Logins Over Time.** Displays the successful and failed logins over the past three hours.
* **Frequent Email Addresses.** Displays the most frequently used email addresses.
* **Sessions.** Monitor errors across all sessions in your deployment.
* **Observed IP Addresses by Type.** Displays IP addresses used by internal and external visitors.

### Keywords and Metadata

This Dashboard provides several ways to monitor your logs based on the metadata of your data. All of the Panels include searches for specific issues. You can learn more about metadata options in [Search Metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata).

* **High Priority Keywords.** Displays how often the terms error, failure, and exception appear in all log messages over time.
* **Medium Priority Keywords.** Displays how often the terms time out, warn, check, exist, reject, deny, and timeout appear in all log messages over time.
* **Issues by Origin.** Displays how often high priority keywords occur by the origin of issue, which could be application, data or service.
* **Issues in Top Categories.** This Panel shows the top 10 source categories by number of log messages that contain error, exception, or failure terms.
* **Issues in Top 10 Hosts.** Displays the top 10 hosts by number of log messages that contain error, exception, or failure terms.
* **Issues in Top 10 Files.** Shows the top 10 files by number of log messages that contain error, exception, or failure terms.
* **Issues by Category.** This Panel shows the number of log messages that contain error, exception, or failure terms by Source Category over time.
* **Issues by Host.** Displays the number of log messages that contain time out, error, exceptions, and failures broken down by Source Host over time.
* **Issues by File Name.** Displays the number of log messages that contain error, exception, or failure terms issues by log file name over time.

### Collectors and Source Monitoring

The Panels in the Collector and Source Monitoring Dashboard help you keep an eye on the machines running Collectors and Sources. If a machine begins to have issues (such as no logs being uploaded to Sumo Logic) you'll know at a glance.

* **Issues by Collector.** This Panel displays the number of log messages that contain error, exception, or failure terms by Collector.
* **Issues by Source.** Shows the number of log messages that contain error, exception, or failure terms by each Collector's Source.
* **Collector Issue Monitoring.** Displays warnings generated over time for each Collector in your deployment.

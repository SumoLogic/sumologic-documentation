---
id: configure-collector
title: Configure OpenTelemetry Collector for Remote Management
sidebar_label: Configure OpenTelemetry Collector
description: Learn how to install and tag Your OpenTelemetry Collector to set up remote management of data collection.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The [Sumo Logic Distribution for OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) simplifies remote management of data collection. It allows you to set up and configure collectors from the Sumo Logic UI, deploy to multiple collectors at once, and centrally manage configurations using source templates.

You can tag your OpenTelemetry collectors to categorize and group them. These tags are enriched in your data so you can use them in dashboards and searches.

Remote management data configuration is handled using source templates. This feature extends our [Installed Collector](/docs/send-data/installed-collectors/sources) source template to support multiple collectors.

By associating source templates with collector tags—a process called *Collector Linking*—you reduce redundancy in data collection setup and streamline configuration management across your environment.

## Key benefits of remote management

* Simplified setup and configuration via the Sumo Logic UI
* [Tag-based collector grouping](#collector-tags) for efficient data collection
* Centralized configuration using [source templates](/docs/send-data/opentelemetry-collector/remote-management/source-templates)
* No server access required after installation
* Faster time to value and reduced manual errors

## Common use cases

* Grouping collectors by environment (for example, production, staging)
* Expanding data collection for new services with minimal effort
* Simplifying migration from legacy monitoring solutions
* Monitoring error logs across multiple Apache servers

## How it works

To illustrate the setup and configuration process, let's walk through an example scenario where you'd need to monitor Apache error logs from 50 Linux servers.

### Step 1: Install and tag collectors

First, you'll need to install the OpenTelemetry collectors on each of the 50 servers and tag them to indicate that they are running Apache.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu, select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**.
1. On the **OpenTelemetry Collection** page, click **Add Collector**.
1. In the **Set up Collector** step, choose **Linux** as the platform.<br/><img src={useBaseUrl('img/send-data/linux-install.png')} alt="Screenshot showing the Linux installation options for the collector" style={{border: '1px solid gray'}} width="800"/>
1. Enter your **Installation Token**.
1. Under **Tag data on Collector level**, add a new tag, `“application = Apache”`, to identify these collectors as having Apache running on them.
1. Leave the **Collector Settings** at their default values to configure collectors as remotely managed.
1. Under **Generate and run the command to install the collector**, copy and run the installation command in your system terminal where the collector needs to be installed.<br/><img src={useBaseUrl('img/send-data/linux-terminal-installation.png')} alt="Screenshot showing the terminal command to install the collector" width="800"/>
1. After installation is complete, click **Next** to proceed.
1. On the next screen, you will see a list of available source templates. Select the **Apache Source Template** to apply the source template to start collecting logs from all linked collectors, then proceed with the data configuration.

To revisit this screen later, navigate to:
* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic): In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
* [**New UI**](/docs/get-started/sumo-logic-ui): In the Sumo Logic top menu select **Configuration**, and then under **Data Collection**, select **Source Template**.  


### Step 2: Configure data collection

:::info
A new source template will always be created with the latest version of the source template.
:::

Follow the below steps to create a data collection configuration to gather the required logs and link them to all the collectors with the help of collector tags:

1. Complete the source template form with the name and file path for your error logs, then click **Next**.<br/><img src={useBaseUrl('img/send-data/local-file-apache.png')} alt="Screenshot of the file path configuration for Apache logs" style={{border: '1px solid gray'}} width="700"/>
1. Under **Link Collectors**, add the tag `"application = Apache"`.<br/><img src={useBaseUrl('img/send-data/link-collectors.png')} alt="Screenshot showing the linked collectors preview" style={{border: '1px solid gray'}} width="800"/>
1. Click **Preview Collector(s)** to see the list of collectors that will be linked to the newly created source template.<br/><img src={useBaseUrl('img/send-data/preview-collectors.png')} alt="Screenshot showing the linked collectors preview" style={{border: '1px solid gray'}} width="800"/>
1. Click **Next** to complete source template creation. The system will apply the configuration to all linked collectors and start collecting Apache error logs.

### Step 3: Monitor logs

After configuring data collection, you can monitor the collected Apache error logs using the [Log Search](/docs/search) and leverage [Dashboards](/docs/dashboards) to analyze the logs and gain insights from your Apache servers.

## Collector tags

### Add a collector tag

There are place ways to add collector tags: [while creating the OTEL collector](#step-1-install-and-tag-collectors) and after creating the collector. To add a collector tag after the collector is created:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the Sumo Logic top menu, select **Configuration** and then under **Data Collection**, select **OpenTelemetry Collection**.
1. Click on the required collector where you need to add collector tags.
1. In the right pane, scroll to the **Collector Tags** section and click **Edit**.
1. In the edit window, click **+ Add tags**.
1. Add the required tags and click **Proceed**.
1. A new **Update Collector Tag(s)** window appears. Click the **click here** link to understand the impact of this update.
1. You will be redirected to the **Mapped Source Template** section, which displays the mapped source templates for the collector tags added. This window also displays the **Compatible** and **Incompatible Version** details for the mapped source template for the collector.
1. If there are any incompatible source templates, [upgrade the source template](/docs/send-data/opentelemetry-collector/remote-management/source-templates/manage-source-templates/#upgrade-a-source-template) to ensure compatibility.
1. Once the source template is upgraded and is compatible, enter **PROCEED** and click **Confirm**.

### Edit or delete a collector tag

:::note
- For default collector tags, you can only edit the **Values**.
- System collector tags like `sumo.disco.enabled` cannot be edited.
:::

To edit or delete a collector tag:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection**, select **OpenTelemetry Collection**.
1. Click on the required collector where you need to add the collector tags.
1. In the right pane, scroll to the **Collector Tags** section and click **Edit**.
1. Edit or delete the required tags and click **Proceed**.
1. A new **Update Collector Tag(s)** window appears. Click the **click here** button to see the impact of this update.
1. You will be redirected to a **Mapped Source Template** section, which displays the mapped source templates for the edited or deleted collector tags, along with **Compatible** and **Incompatible Version** details.
1. If find you find an incompatible source template, [upgrade the source template](/docs/send-data/opentelemetry-collector/remote-management/source-templates/manage-source-templates/#upgrade-a-source-template).
1. Once the source template is upgraded and is compatible, enter **PROCEED** and click **Confirm**.

## Source templates

See [Managing Source Templates](/docs/send-data/opentelemetry-collector/remote-management/source-templates/manage-source-templates) to learn how to create and manage OpenTelemetry remote management source templates.

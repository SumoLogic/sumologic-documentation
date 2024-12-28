---
id: overview
title: OpenTelemetry Remote Management Overview
sidebar_label: Overview
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Sumo Logic Distribution for OpenTelemetry Collector simplifies remote management of data collection, allowing setup from the Sumo Logic UI and deployment to multiple collectors.

## Key benefits of remote management

* Simplified setup and configuration via the Sumo Logic UI
* Tag-based collector grouping for efficient data collection
* Centralized configuration using [source templates](/docs/send-data/opentelemetry-collector/remote-management/source-templates)
* No server access required after installation
* Faster time to value and reduced manual errors

## Common use cases

* Monitoring error logs across multiple Apache servers
* Grouping collectors by environment (for example, production, staging)
* Expanding data collection for new services with minimal effort
* Simplifying migration from legacy monitoring solutions

## Remote management features

### Collector tags

With remote management, you can tag your [OpenTelemetry Collectors](/docs/send-data/opentelemetry-collector) to categorize and group them. These tags are also enriched in your data, enabling you to use them in your dashboards and searches.

### Source templates

Remote management data configuration for OpenTelemetry collectors is handled using source templates. This feature extends the [Installed Collector Source](/docs/send-data/installed-collectors/sources) template, allowing association with multiple collectors.

Use collector tags to group collectors and associate source templates to these groups, reducing redundancy in data collection setup. This process, known as *Collector Linking*, streamlines configuration management.

## How it works

To illustrate the setup and configuration process, let's walk through an example scenario where you'd need to monitor Apache error logs from 50 Linux servers.

### Step 1: Install collectors

First, you'll need to install the OpenTelemetry collectors on each of the 50 servers and tag them to indicate that they are running Apache.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu, select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**.
1. Click **Add Collector**.
1. In the **Set up Collector** step, choose **Linux** as the platform.<br/><img src={useBaseUrl('img/send-data/linux-install.png')} alt="Screenshot showing the Linux installation options for the collector" style={{border: '1px solid gray'}} width="800"/>
1. Enter your **Installation Token**.
1. Under **Tag data on Collector level**, add a new tag, `“application = Apache”`.
1. Leave the **Collector Settings** at their default values.
1. Under **Generate and run the command to install the collector**, copy and run the installation command in your system terminal where the collector needs to be installed.<br/><img src={useBaseUrl('img/send-data/linux-terminal-installation.png')} alt="Screenshot showing the terminal command to install the collector" width="800"/>
1. After installation is complete, click **Next** to proceed.
1. On the next screen, you will see a list of available source templates. Select the **Apache Source Template** to apply the source template to start collecting logs from all linked collectors.

To revisit this screen later, navigate to:
* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic): In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
* [**New UI**](/docs/get-started/sumo-logic-ui): In the Sumo Logic top menu select **Configuration**, and then under **Data Collection**, select **Source Template**.  

### Step 2: Configure data collection

Next, you'll create a data collection configuration to gather Apache error logs and link it to all collectors tagged `"application = Apache"`.

1. Complete the source template form with the **Name** and **File Path** for your error logs, then click **Next**.
1. Under **Link Collectors**, add the tag `"application = Apache"`.<br/><img src={useBaseUrl('img/send-data/local-file-apache.png')} alt="Screenshot of the file path configuration for Apache logs" style={{border: '1px solid gray'}} width="300"/>
1. Click **Preview Collector(s)** to see the list of collectors that will be linked to the newly created source template.<br/><img src={useBaseUrl('img/send-data/link-collectors.png')} alt="Screenshot showing the linked collectors preview" style={{border: '1px solid gray'}} width="800"/>
1. Click **Next** to complete source template creation. The system will apply the configuration to all linked collectors and start collecting Apache error logs.

### Step 3: Monitor logs

After configuring data collection, you can monitor the collected Apache error logs using the [Log Search](/docs/search) and leverage [Dashboards](/docs/dashboards) to analyze the logs and gain insights from your Apache servers.

---
slug: /send-data/opentelemetry-collector/remote-management
title: OpenTelemetry Remote Management
sidebar_label: Remote Management
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This feature is in Beta. To participate, contact your Sumo Logic account executive.

The Sumo Logic Distribution for OpenTelemetry Collector simplifies remote management of data collection, allowing setup from the Sumo Logic UI and deployment to multiple collectors.

## Remote Management features

### Collector tags

With remote management, you can tag your [OpenTelemetry Collectors](/docs/send-data/opentelemetry-collector) to categorize and group them. These tags are also enriched in your data, enabling you to use them in your dashboards and searches.

### Source templates

Remote management data configuration for OpenTelemetry collectors is handled using Source templates. This feature extends the [Installed Collector Source](/docs/send-data/installed-collectors/sources) template, allowing association with multiple collectors.

Use collector tags to group collectors and associate Source templates to these groups, reducing redundancy in data collection setup. This process, known as *Collector Linking*, streamlines configuration management.

## How it works

To illustrate the setup and configuration process, let's walk through an example scenario where you'd need to monitor Apache error logs from 50 Linux servers.

### Step 1: Install collectors

First, you'll need to install the OpenTelemetry collectors on each of the 50 servers and tag them to indicate that they are running Apache.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu, select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**.
1. Click **Add Collector**.
1. In the **Set up Collector** step, choose **Linux** as the platform.<br/><img src={useBaseUrl('img/send-data/linux-install.png')} alt="linux-install" style={{border: '1px solid gray'}} width="800"/>
1. Enter your **Installation Token**.
1. Under **Tag data on Collector level**, add a new tag, `“application = Apache”`.
1. Leave the **Collector Settings** at their default values.
1. Under **Generate and run the command to install the collector**, copy and run the installation command in your system terminal where the collector needs to be installed.<br/><img src={useBaseUrl('img/send-data/linux-terminal-installation.png')} alt="linux-terminal-installation" width="800"/>
1. After installation is complete, click **Next** to proceed.
1. On the next screen, you will see a list of available Source Templates. Select the **Apache Source Template** to apply the source template to start collecting logs from all linked collectors.

To revisit this screen later, you can navigate back ([**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Source Template**).  

### Step 2: Configure data collection

Next, you'll create a data collection configuration to gather Apache error logs and link it to all collectors tagged `"application = Apache"`.

1. Complete the Source Template form with the **Name** and **File Path** for your error logs, then click **Next**.
1. Under **Link Collectors**, add the tag `"application = Apache"`.<br/><img src={useBaseUrl('img/send-data/local-file-apache.png')} alt="local-file-apache" width="300"/>
1. Click **Preview Collector(s)** to see the list of collectors that will be linked to the newly created Source Template.<br/><img src={useBaseUrl('img/send-data/link-collectors.png')} alt="link-collectors" style={{border: '1px solid gray'}} width="800"/>
1. Click **Next** to complete Source Template creation. The system will apply the configuration to all linked collectors and start collecting Apache error logs.

### Step 3: Monitor logs

After configuring data collection, you can monitor the collected Apache error logs using the [Log Search](/docs/search). Additionally, use our [Dashboards](/docs/dashboards) to analyze the logs and gain insights from your Apache servers.

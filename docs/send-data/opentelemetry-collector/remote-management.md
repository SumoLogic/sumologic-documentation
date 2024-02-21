---
id: remote-management
title: OpenTelemetry Remote Management
sidebar_label: Remote Management
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This feature is in Beta. To participate, contact your Sumo Logic account executive.

The Sumo Logic Distribution for OpenTelemetry Collector supports remote management of data collection configuration. You can set up data collection configuration from the Sumo UI and push the configuration to one or more collectors.  

## Remote Management features

### Collector tags

With OpenTelemetry (OTel) remote management, you can tag your [Installed Collectors](/docs/send-data/installed-collectors) and use those tags to categorize and group them. These tags are enriched in your data, so you can use them in your dashboards and searches as well.

### Source templates

With remote management, data configuration setup for OTel collectors is done using Source templates. This is an extension of our existing [Installed Collector Source](/docs/send-data/installed-collectors/sources) template, with the addition of this new capability to be attached to multiple collectors.

You can use collector tags to group your collectors, as described in the previous section, and associate the Source template to these groups of collectors. This reduces redundancy in your data collection setup. This additional step for Source template is called *Collector Linking*.

## How it works

To get started with using this feature, we will provide a scenario that can be replicated in your environment.

Goal: *As a user, I have 50 Linux servers where I'm running Apache servers and would like to monitor the Apache error logs from all these servers.*

### Step 1: Collector installation

In this step, we'll install the collector on 50 servers and add a uniquely identifiable tag to these collectors depicting that these have Apache server running on them.

1. In Sumo Logic, select **Manage Data** > **Collection** > **OpenTelemetry Collection**.
1. On the **OpenTelemetry Collection** page, click **Add Collector**.
1. In the **Set up Collector** step, select **Linux** as the platform.<br/><img src={useBaseUrl('img/send-data/linux-install.png')} alt="linux-install" width="600"/>
1. Enter your **Installation Token**.
1. Under **Tag data on Collector level**, add a new tag, “application = Apache” as seen in the screenshot below to identify these collectors as Apache running on them.
1. For **Collector Settings**, leave them as default (unchecked).
1. Under **Generate and run the command to install the collector**, copy the command and execute it in your system terminal where the collector needs to be installed.<br/><img src={useBaseUrl('img/send-data/linux-terminal-installation.png')} alt="linux-terminal-installation" width="600"/>
1. Wait for the installation process to complete, then click **Next** to proceed.
1. On the next screen, you will see a list of available Source Templates. For our use case, we will select Apache Source Template.

:::note
If you choose to close this Source template creation screen, you can navigate back by selecting **Manage Data** > **Collection** > **Source Template**.
:::


### Step 2: Data configuration

In this step, we'll create a data collection configuration to collect Apache error logs and link them to all the collectors that have the tag "application = Apache".

1. Complete the Source Template form by providing the Name, Error log file path and click **Next**.
1. On the **Link Collectors** step, you will have the option to link the collectors using the Collector name or by adding tags to find the group of collectors. For our scenario, we will add the tag "application = Apache".<br/><img src={useBaseUrl('img/send-data/local-file-apache.png')} alt="local-file-apache" width="300"/>
1. Click **Preview Collector(s)** to see the list of collectors that will be linked to the newly created source Template.<br/><img src={useBaseUrl('img/send-data/link-collectors.png')} alt="link-collectors" width="600"/>
1. Click **Next** to complete Source Template Creation. In the background, the system will apply the configuration to all the linked collectors and start collecting from Apache error files.
1. Click the **Log Search** icon to search for data collected for this Source Template.

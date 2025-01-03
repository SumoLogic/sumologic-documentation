---
id: create-source-template
title: Create an OpenTelemetry Remote Management Source Template
sidebar_label: Create a Source Template
description: Learn how to create an OpenTelemetry remote management source template.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To create an OpenTelemetry remote management source template, follow the steps below.

## Benefits of source templates

* **Efficiency**. Create a template once and apply it to multiple collectors.
* **Consistency**. Ensure uniform data collection across your environment.
* **Scalability**. Easily manage configurations for large numbers of collectors.

## Common use cases

Source templates are useful for managing data collection in scenarios like:

* Monitoring application logs across multiple servers
* Collecting metrics from a fleet of containers
* Aggregating error logs from distributed services


## Step 1: Create a new source template

1. From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), go to **Manage Data > Collection > Source Template**. Or, from the [**New UI**](/docs/get-started/sumo-logic-ui), go to the Sumo Logic top menu and select **Configuration > Collection > Source Template**.
1. Click **Create Source Template** and fill in the required details, such as name and configuration settings.

## Step 2: Link collectors

Use tags or collector names to link the appropriate collectors to your source template.

## Step 3: Apply and deploy

Apply the source template to the linked collectors and manage or update it as needed.

## Step 4: Monitor

Use our [log search](/docs/search) and [dashboards](/docs/dashboards) to monitor and analyze your collected logs.

## Example scenario: Nginx access logs

To monitor Nginx access logs from a group of web servers:

1. **Create source template**. Name it `"Nginx Access Logs"` and specify the log file path.
2. **Link collectors**. Tag your web servers with `"application=nginx"` and link these collectors to the source template.
3. **Deploy**. Apply the source template to start collecting logs from all linked collectors.
4. **Monitor**. Use our [log search](/docs/search) and [dashboard](/docs/dashboards) features to monitor and analyze the collected Nginx access logs.

:::tip
For more details on source templates, see [Installed Collector Sources](/docs/send-data/installed-collectors/sources).
:::

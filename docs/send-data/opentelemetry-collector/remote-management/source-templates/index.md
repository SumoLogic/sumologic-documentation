---
slug: /send-data/opentelemetry-collector/remote-management/source-templates
title: Source Templates
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This feature is in Beta. To participate, contact your Sumo Logic account executive.

Source templates in Sumo Logic provide efficient, scalable data collection management by applying consistent setups across multiple collectors. They reduce redundancy and simplify configuration, making it easier to manage and scale your data collection efforts.

## Benefits

* **Efficiency**. Create a template once and apply it to multiple collectors.
* **Consistency**. Ensure uniform data collection across your environment.
* **Scalability**. Easily manage configurations for large numbers of collectors.

## Common use cases

Source templates are useful for managing data collection in scenarios like:

* Monitoring application logs across multiple servers
* Collecting metrics from a fleet of containers
* Aggregating error logs from distributed services

## Creating and managing Source templates

To create a source template:

1. **Navigate to Source Templates**.
   * [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to **Manage Data > Collection > Source Template**.
   * [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu, select **Configuration > Collection > Source Template**.
2. **Create a new Source Template**. Click **Create Source Template** and fill in the required details, such as name and configuration settings.
3. **Link Collectors**. Use tags or collector names to link the appropriate collectors to your source template.
4. **Apply and manage**. Apply the source template to the linked collectors and manage or update it as needed.


## Example Scenario: Monitoring Nginx access logs

Monitoring Nginx Access Logs from a group of web servers:

1. **Create Source Template**. Name it `"Nginx Access Logs"` and specify the log file path.
2. **Link Collectors**. Tag your web servers with `"application=nginx"` and link these collectors to the source template.
3. **Deploy**. Apply the source template to start collecting logs from all linked collectors.
4. **Monitor**. Use our [log search](/docs/search) and [dashboard](/docs/dashboards) features to monitor and analyze the collected Nginx access logs.

:::tip
For more details on source templates, see [Installed Collector Source Documentation](/docs/send-data/installed-collectors/sources).
:::

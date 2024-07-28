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

Source templates in Sumo Logic enable efficient and scalable data collection configuration management. By using source templates, you can apply consistent data collection setups across multiple collectors, reducing redundancy and simplifying configuration management. This powerful tool streamlines and enhances your data collection strategy, ensuring you can efficiently manage and scale your data collection efforts.

## Benefits of source templates

- **Efficiency**: Create a template once and apply it to multiple collectors.
- **Consistency**: Ensure uniform data collection across your environment.
- **Scalability**: Easily manage and update data collection configurations for large numbers of collectors.

## Common use cases

You can use source templates to manage data collection for various scenarios, such as:

- Monitoring application logs across multiple servers
- Collecting metrics from a fleet of containers
- Aggregating error logs from distributed services

## Creating and managing source templates

To create and manage source templates, follow these steps:

1. **Navigate to Source Templates**. In the Sumo Logic menu, select **Manage Data > Collection > Source Template**.
2. **Create a New Source Template**. Click on **Create Source Template** and fill in the required details, such as name and configuration settings.
3. **Link Collectors**. Use tags or collector names to link the appropriate collectors to your source template.
4. **Apply and Manage**. Once created, the source template can be applied to the linked collectors, and you can manage and update it as needed.

## Example scenario

Let's say you want to monitor Nginx access logs from a group of web servers:

1. **Create Source Template**. Define the source template with the name "Nginx Access Logs" and specify the log file path.
2. **Link Collectors**. Tag your web servers with a tag like "application=nginx" and link these collectors to the source template.
3. **Deploy and Monitor**. Apply the source template to start collecting Nginx access logs from all linked collectors. Next, use our [search](/docs/search) and [dashboard](/docs/dashboards) features to monitor and analyze the collected logs.

:::tip
For more detailed information on setting up and using source templates, see [Installed Collector Source Documentation](/docs/send-data/installed-collectors/sources).
:::

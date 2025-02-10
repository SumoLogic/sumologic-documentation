---
id: manage-source-templates
title: Managing OpenTelemetry Remote Management Source Templates
sidebar_label: Managing Source Templates
description: Learn how to create, edit, and delete OpenTelemetry remote management source templates.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Source templates provide a powerful mechanism to simplify and standardize data collection configurations across multiple collectors.

:::note
Source templates are not available for locally managed collectors.
:::

## Benefits of source templates

* **Efficiency**. Create a template once and apply it to multiple collectors.
* **Consistency**. Ensure uniform data collection across your environment.
* **Scalability**. Easily manage configurations for large numbers of collectors.

## Common use cases

Source templates are useful for managing data collection in scenarios like:

* Monitoring application logs across multiple servers
* Collecting metrics from a fleet of containers
* Aggregating error logs from distributed services

## Create a new source template

1. From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), go to **Manage Data > Collection > Source Template**. Or, from the [**New UI**](/docs/get-started/sumo-logic-ui), go to the Sumo Logic top menu and select **Configuration > Collection > Source Template**.
1. Click **Create Source Template** > **Add Source Template** and fill in the required details, such as name and configuration settings. When you're done, click **Next**.<br/><img src={useBaseUrl('img/send-data/local-file-apache.png')} alt="local-file-apache" style={{border:'1px solid gray'}} width="500"/>
1. On the **Link Collectors** page, you will have the option to link the collectors using the **Collector Name** or by adding **Collector Tags** to find the group of collectors.<br/><img src={useBaseUrl('img/send-data/link-collectors.png')} alt="link-collectors" style={{border: '1px solid gray'}} width="800" />
1. Navigate to **Preview Collector(s)** to view details about the compatibility of the collectors and the collectors that will be linked to the newly created source template. If we have mapped the collectors using both the **Collector Name** and **Collector Tags**, you will get separate preview sections for the collectors identified by collector name and collector tags.<br/> ![Screenshot showing the linked collectors preview](/img/send-data/preview-collectors1.png)<br/>![Screenshot showing the linked collectors preview](/img/send-data/preview-collectors2.png)
    :::note
    Incompatible version conflict will be found if your collectors cannot be linked to the source template due to version incompatibility or unsupported operating system. To move to the next step, make sure you update the collect version of the incompatible collector.<br/><img src={useBaseUrl('img/send-data/incompatible-collectors.png')} alt="incompatible-collectors" style={{border:'1px solid gray'}} width="700"/>
    :::
1. Click **Next** to complete source template creation. In the background, the system will apply the configuration to all the compatible linked collectors and starts collecting the required files.
1. Apply the source template to the linked collectors and manage or update it as needed.

Use our [Log Search](/docs/search) and [dashboards](/docs/dashboards) to monitor and analyze your collected logs.

### Example: Apache error logs

To illustrate the setup and configuration process, we'll use an example scenario where you'd need to monitor Apache error logs from 50 Linux servers.

First, you'll need to install the OpenTelemetry collectors on each of the 50 Linux servers and add a uniquely identifiable tag to indicate that they are running Apache.

1. **Create source template**. Name it `Apache Error Logs` and specify the log file path.
2. **Link collectors**. Under **Collector Tags**, tag your web servers with `application = Apache` and link these collectors to the source template.
3. **Deploy**. Apply the source template to start collecting logs from all linked collectors.
4. **Monitor**. Use Log Search, Metrics, and Dashboards to look at your collected error logs and gain insights from your Apache servers.

### Example: Nginx access logs

To monitor Nginx access logs from a group of web servers:

1. **Create source template**. Name it `Nginx Access Logs` and specify the log file path.
2. **Link collectors**. Under **Collector Tags**, tag your web servers with `application=nginx` and link these collectors to the source template.
3. **Deploy**. Apply the source template to start collecting logs from all linked collectors.
4. **Monitor**. Use Log Search, Metrics, and Dashboards to monitor and analyze the collected Nginx access logs.

:::tip
For more details on source templates, see [Installed Collector Sources](/docs/send-data/installed-collectors/sources).
:::

## Edit a source template

To edit a source template:

1. In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
1. Select the source template that you need to edit, and click **Edit**. Or, click the kebab menu against the selected source template and click **Edit** from the dropdown.
1. Change the required configuration in the source template configuration page, and click **Next**.
1. If required, update the collectors on the **Link Collectors** page.
1. Click **Next** to complete editing the source template.

## Upgrade a source template

You cannot upgrade a source template if there are any incompatible collector versions Make sure you update those collectors first.

1. From the **Source Template** page, select the source template you need to upgrade and click **Upgrade**.
1. Update the configuration for the new source template version.
   :::info
   To see what changes are included in the latest source template version, click **Learn more** in the warning.<br/><img src={useBaseUrl('img/send-data/learn-more-button-warning.png')} alt="learn-more-button-warning" style={{border:'1px solid gray'}} width="500"/>
   :::
1. Click **Next** to finish the upgrade.
1. Navigate to the **Preview Collector(s)** section, check which collectors are compatible or incompatible to the new version of the source template. Follow any one of the below steps:
   - Create a new source template and link the compatible collectors by collector name and collector tags.
   - Or, unlink the collectors added in the new source template to the existing source template.

## Delete a source template

1. From the **Source Template** page, select the source template that you need to delete.
1. Click the **Delete** button (or use the kebab menu against the selected source template, click **Delete** from the dropdown).
1. Confirm the deletion. The source template will be removed from the **Source Template** page and unlinked from all collectors.

## Collector tags

With remote management, you can tag your [OpenTelemetry Collectors](/docs/send-data/opentelemetry-collector) to categorize and group them. These tags are also enriched in your data, enabling you to use them in your dashboards and searches.

:::note
- Collector tags will only be editable for collectors with version `0.144` and above.
- For default collector tags, you can only edit the **Values**.
- System collector tags like `sumo.disco.enabled` cannot be added/updated/deleted.
:::

You can add collector tags during OTEL collector setup as described in the previous section. Follow the below steps to add/update/delete the collector tags after creation:

1. Navigate to the **OpenTelemetry Collection** page.
1. Click on the desired collector where you need to add collector tags.
1. In the right pane, scroll to the **Collector Tags** section and click **Edit**.
1. In the edit window, click **+ Add tags** to add new tag or Update/Delete the required tags and click **Proceed**.<br/><img src={useBaseUrl('img/send-data/add-delete-update-tags.png')} alt="add-delete-update-tags" style={{border:'1px solid gray'}} width="500"/>
1. A new **Update Collector Tag(s)** window appears. Click the **click here** link to understand the impact of this update.<br/><img src={useBaseUrl('img/send-data/update-tags-click-here.png')} alt="update-tags-click-here" style={{border:'1px solid gray'}} width="500"/>
1. You will be redirected to the **Mapped Source Template** section, which displays the mapped source templates for the collector tags added. This window also displays the **Compatible** and **Incompatible Version** details for the mapped source template for the collector.<br/><img src={useBaseUrl('img/send-data/mapped-source-templates.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} width="500"/>
1. If there are any incompatible source templates, [upgrade the source template](/docs/send-data/opentelemetry-collector/remote-management/source-templates/manage-source-templates/#upgrade-a-source-template) to ensure compatibility.
1. Once the source template is upgraded and is compatible, enter **PROCEED** and click **Confirm** to add/update/delete the new collector tag.<br/><img src={useBaseUrl('img/send-data/confirm-the-tags.png')} alt="confirm-the-tags" style={{border:'1px solid gray'}} width="500"/>

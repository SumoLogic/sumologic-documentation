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

import TerraformLink from '../../../../reuse/terraform-link.md';

:::tip
You can use Terraform to provide a source template with the [`sumologic_source_template`](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/source_template) resource.

<TerraformLink/>
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

1. [**New UI**](/docs/get-started/sumo-logic-ui). Go to the main Sumo Logic menu and select **Data Management**, and under **Data Collection** select **Source Template**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to **Manage Data > Collection > Source Template**. 
1. Click **Create Source Template** > **Add Source Template** and fill in the required details, such as name and configuration settings. When you're done, click **Next**.<br/><img src={useBaseUrl('img/send-data/local-file-apache.png')} alt="local-file-apache" style={{border:'1px solid gray'}} width="500"/>
1. On the **Link Collectors** page, you will have the option to link the collectors using the **Collector Name** or by adding **Collector Tags** to find the group of collectors.<br/><img src={useBaseUrl('img/send-data/link-collectors.png')} alt="link-collectors" style={{border: '1px solid gray'}} width="800" />
1. Navigate to **Preview Collector(s**) to view collector compatibility details and see which collectors will be linked to the newly created source template.
If collectors are mapped using both **Collector Name** and **Collector Tags**, separate preview sections will be shown for each mapping type.<br/><img src={useBaseUrl('img/send-data/preview-collectors1.png')} alt="Screenshot showing the linked collectors preview" style={{border: '1px solid gray'}} width="800" /><br/><img src={useBaseUrl('img/send-data/preview-collectors2.png')} alt="Screenshot showing the linked collectors preview" style={{border: '1px solid gray'}} width="800" />
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

1. [**New UI**](/docs/get-started/sumo-logic-ui). Go to the main Sumo Logic menu and select **Data Management**, and under **Data Collection** select **Source Template**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
1. Select the source template that you need to edit, and click **Edit**. Or, click the kebab menu against the selected source template and click **Edit** from the dropdown.
1. Change the required configuration in the source template configuration page, and click **Next**.
1. If required, update the collectors on the **Link Collectors** page.
1. Click **Next** to complete editing the source template.

## Edit a linked collector

Follow the steps below to edit a linked collector from the source template:

1. [**New UI**](/docs/get-started/sumo-logic-ui). Go to the main Sumo Logic menu and select **Data Management**, and under **Data Collection** select **Source Template**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
1. Select the source template to edit the existing linked collectors or link a new one if none exist, and then select **Edit Link Collector** from the **More options** dropdown. Or, click the kebab menu against the selected source template and click **Edit Link Collector** from the dropdown.<br/><img src={useBaseUrl('img/send-data/otel-edit-link-collector.png')} alt="learn-more-button-warning" style={{border:'1px solid gray'}} width="700"/>
   - **Edit the existing collector links**. Update the required configuration in the **Link Collectors** page, and click **Next**.
   - **Add collector links if none exist**. On the **Link Collectors** page, add the required **Collector** and **Collector tags**. 
   - Navigate to **Preview Collector(s)** section to view and verify the collector compatibility details, and then click **Next**. For more details, refer to *Step4** in [Create a new source template](#create-a-new-source-template).
1. Click **Done** to complete editing the linked collector.

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

## Enable/disable a source template

You can enable or disable a source template to optimize your data flow management. Below are some of the key benefits of enabling or disabling the source template:

- **Cost efficiency.** Proactively manage and reduce costs associated with excessive or unnecessary data ingestion.
- **Compliance protection.** Safeguard your organization from compliance violations by preventing potential exposure of sensitive information in logs.
- **Agility in response.** Quickly address misconfigurations or anomalies in your data sources without disrupting other crucial workflows.

Follow the below steps to enable or disable a source template:
1. [**New UI**](/docs/get-started/sumo-logic-ui). Go to the main Sumo Logic menu and select **Data Management**, and under **Data Collection** select **Source Template**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.<br/><img src={useBaseUrl('img/send-data/st-landing-page.png')} alt="source-template-landing-page" style={{border:'1px solid gray'}} width="800"/>
1. Select the source template that you need to enable or disable. Click **More Actions** > **Enable** or **Disable** the source template. Or, click the kebab menu against the selected source template and click **Enable** or **Disable** from the dropdown.<br/><img src={useBaseUrl('img/send-data/enable-st.png')} alt="enable-source-template" style={{border:'1px solid gray'}} width="800"/>
1. Enter **CONFIRM** and click the **Confirm** button to complete the action.<br/><img src={useBaseUrl('img/send-data/enable-confirm-st.png')} alt="confirm-enable-source-template" style={{border:'1px solid gray'}} width="600"/>

When you re-enable a disabled source template, the collection can either start from the very beginning of the file or from the moment when you re-enabled the source template. Collection starting from the beginning could lead to duplicate data while collecting data from the re-enabled moment can lead to data loss for the duration the source template was inactive.

In the disabled state, only minor and patch versions will be auto-upgraded and you will be blocked from upgrading the source template with any major pending Source Schema version. It is recommended that you first enable the source template before manually upgrading it.

## Collector tags

With remote management, you can tag your [OpenTelemetry Collectors](/docs/send-data/opentelemetry-collector) to categorize and group them. These tags are also enriched in your data, enabling you to use them in your dashboards and searches.

:::note
- Collector tags will only be editable for collectors with version `0.114.0` and above.
- For default collector tags, you can only edit the **Values**.
- System collector tags like `sumo.disco.enabled` cannot be added, updated, or deleted.
:::

You can add collector tags during OTEL collector setup as described in the previous section. Follow the below steps to add, update, or delete the collector tags after creation:

1. Navigate to the **OpenTelemetry Collection** page.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collection.png')} alt="opentelemetry-collection" style={{border:'1px solid gray'}} width="800"/>
1. Click on the desired collector where you need to add collector tags.
1. In the right pane, scroll to the **Collector Tags** section and click **Edit**.<br/><img src={useBaseUrl('img/send-data/collector-tags-edit.png')} alt="collector-tags-edit" style={{border:'1px solid gray'}} width="800"/>
1. In the edit window, click **+ Add tags** to add a new tag. You can also update or delete the required tags. Then click **Proceed**.<br/><img src={useBaseUrl('img/send-data/add-delete-update-tags.png')} alt="add-delete-update-tags" style={{border:'1px solid gray'}} width="500"/>
1. A new **Update Collector Tag(s)** window appears. Click the **click here** link to understand the impact of this update.<br/><img src={useBaseUrl('img/send-data/update-tags-click-here.png')} alt="update-tags-click-here" style={{border:'1px solid gray'}} width="500"/>
1. You will be redirected to the **Mapped Source Template** section, which displays the mapped source templates for the collector tags added. This window also displays the **Compatible** and **Incompatible Version** details for the mapped source template for the collector.<br/><img src={useBaseUrl('img/send-data/mapped-source-templates.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} width="500"/>
1. If there are any incompatible source templates, [upgrade the source template](/docs/send-data/opentelemetry-collector/remote-management/source-templates/manage-source-templates/#upgrade-a-source-template) to ensure compatibility.
1. Once the source template is upgraded and is compatible, enter **PROCEED** and click **Confirm**.<br/><img src={useBaseUrl('img/send-data/confirm-the-tags.png')} alt="confirm-the-tags" style={{border:'1px solid gray'}} width="500"/>

:::info
If you try to add or update any collector tags using the API, the following validations will occur in the backend:
1. Validates if the collector is remotely managed.
1. Validates if the key/value is empty string.
1. Validates the agent version.
1. Validates that *no* disco tags are added, updated, or deleted.
1. Validates if the default tags are added or deleted.
:::

## Collector Name

You can edit your collector name with remote management by following the steps below:

1. Navigate to the **OpenTelemetry Collection** page.<br/><img src={useBaseUrl('img/send-data/oTel-collector-page.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} />
1. Select the collector for which you want to update the name.
1. In the right pane, scroll to the **Name** section and click **Edit**.<br/><img src={useBaseUrl('img/send-data/edit-otel-collector-name.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} />
1. In the **Edit Collector Name** pop up, enter the new collector name and click **Proceed**.<br/><img src={useBaseUrl('img/send-data/enter-new-otel-collector-name.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} width="500" />
1. Type **PROCEED** in the input field, and then click **Confirm** to apply the change.<br/><img src={useBaseUrl('img/send-data/click-confirm.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} width="500" />
:::note
Click **click here** to view the source templates affected by the collector name update.<br/><img src={useBaseUrl('img/send-data/affected-STs.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} width="500" />
:::

## Find source templates using filters

Filters help you quickly narrow down source templates based on criteria such as **Type**, **Status**, **Created By**, and **Collector Tags**, so you can efficiently locate the most relevant source templates without manually browsing through the entire catalog, saving time and effort.<br/><img src={useBaseUrl('img/send-data/add-a-filter-source-template.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} />

### Type

Follow the steps below to filter source templates based on their type:

1. On the **Source Template** page, click the **Click to add a filter** bar and then select **Type**.<br/><img src={useBaseUrl('img/send-data/source-template-type-filter.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} width="400" />
1. Select one or more source template type from the following options:
   - APACHE
   - CustomYaml
   - Windows
1. Click **Apply**.

### Status

Follow the steps below to filter source templates based on their status:

1. On the **Source Template** page, click the **Click to add a filter** bar and then select **Status**.<br/><img src={useBaseUrl('img/send-data/source-template-status-filter.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} width="400" />
1. Select one or more status from the following options:
   - Enabled
   - Disabled
   - Upgrade Available
1. Click **Apply**.

### Created By

Follow the steps below to filter source templates based on the template creator:

1. On the **Source Template** page, click the **Click to add a filter** bar and then select **Created By**.<br/><img src={useBaseUrl('img/send-data/source-template-created-by-filter.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} width="400" />
1. Select one or more creator.
1. Click **Apply**.

### Collector Tag

Follow the steps below to filter source templates based on the collector tags:

1. On the **Source Template** page, click the **Click to add a filter** bar.
1. Under **Collector Tag**, select the required collector tag.<br/><img src={useBaseUrl('img/send-data/source-template-collector-tag-filter.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} width="400" />
1. Select the value assigned to the collector tag.<br/><img src={useBaseUrl('img/send-data/source-template-collector-tag-value-filter.png')} alt="mapped-source-templates" style={{border:'1px solid gray'}} width="400" />
1. Click **Apply**.

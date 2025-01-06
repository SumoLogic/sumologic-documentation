---
id: remote-management-v2
title: OpenTelemetry Remote Management
sidebar_label: OpenTelemetry Remote Management
---

<!-- What is this? -->

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

:::info
This feature is in Beta. To participate, contact your Sumo Logic account executive.
:::

The Sumo Logic Distribution for OpenTelemetry Collector facilitates remote management of data collection configurations, enabling seamless setup from the Sumo Logic UI and deployment to one or more collectors.

## Remote management features

### Collector tags

With OpenTelemetry (OTel) remote management, you can tag your [OpenTelemetry Collectors](/docs/send-data/opentelemetry-collector) and use those tags to categorize and group them. These tags are enriched in your data, so you can use them in your dashboards and searches as well.

### Source templates

:::note
Source template feature is not available for locally managed collectors.
:::

With remote management, data configuration setup for OTel collectors is done using source templates. This feature extends our existing [Installed Collector Source](/docs/send-data/installed-collectors/sources), allowing attachment to multiple collectors.

Utilize collector tags for grouping collectors, and associate source templates to these collector groups, reducing redundancy in data collection setup. This process, termed *Collector Linking*, streamlines configuration management.

## Install a Collector and configure the source template

### Step 1: Collector installation

Follow the below steps to install the collector and add uniquely identifiable tags:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. 
1. On the **OpenTelemetry Collection** page, click **Add Collector**.
1. In the **Set up Collector** step, select **Linux** as the platform.<br/><img src={useBaseUrl('img/send-data/linux-install.png')} alt="linux-install" style={{border: '1px solid gray'}} width="800"/>
1. Enter your **Installation Token**.
1. Under **Tag data on Collector level**, add a new tag (for example, `application = Apache` as seen in the screenshot below to identify these collectors as having Apache running on them).
1. For **Collector Settings**, leave them as default to configure collectors as remotely managed.
1. Under **Generate and run the command to install the collector**, copy the command and execute it in your system terminal where the collector needs to be installed.<br/><img src={useBaseUrl('img/send-data/linux-terminal-installation.png')} alt="linux-terminal-installation" width="800"/>
1. Wait for the installation process to complete, then click **Next** to proceed.
1. On the next screen, you will see a list of available source templates. Select the required source template and proceed with the data configuration.

### Step 2: Data configuration

:::info
A new source template will always be created with the latest version of the source template.
:::

Follow the below steps to create a data collection configuration to collect the required logs and link them to all the collectors with the help of tags:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Source Template**.  
1. On the **Source Template** page, click **Add Source Template** and search for the required Source Template.
1. Complete the source template form by providing the mandatory fields, then click **Next**.<br/><img src={useBaseUrl('img/send-data/local-file-apache.png')} alt="local-file-apache" style={{border:'1px solid gray'}} width="500"/>
1. On the **Link Collectors** page, you will have the option to link the collectors using the **Collector Name** or by adding **Collector Tags** to find the group of collectors.
1. Navigate to **Preview Collector(s)** to view the details about the compatibility of the collectors and list of collectors that will be linked to the newly created source template. If we have mapped the collectors using both the **Collector Name** and **Collector Tags**, you will get a separate preview sections for the collectors identified by collector name and collector tags.<br/><img src={useBaseUrl('img/send-data/link-collectors.png')} alt="link-collectors" style={{border: '1px solid gray'}} width="800" height="500"/>
    :::note
    Incompatible version conflict will be found if your collectors cannot be linked to the source template due to version incompatibility or unsupported operating system. To move to next step, make sure you update the collect version of the incompatible collector.<br/><img src={useBaseUrl('img/send-data/incompatible-collectors.png')} alt="incompatible-collectors" style={{border:'1px solid gray'}} width="800"/>
    :::
1. Click **Next** to complete Source Template creation. In the background, the system will apply the configuration to all the compatible linked collectors and starts collecting the required files.

## Edit a source template

To edit a source template:

1. In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
1. Select the Source Template that you need to edit, and click **Edit**. Or, click the kebab menu against the selected source template and click **Edit** from the dropdown.
1. Change the required configuration in the source template configuration page, and click **Next**.
1. If required, update the collectors on the **Link Collectors** page. 
1. Click **Next** to complete editing the source template. 

## Upgrade the source template

:::note
Source template update will not available if there are any incompatible collector version.
:::

Follow the below steps to upgrade the source template:

1. In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
1. Select the source template that you need to upgrade, and click **Upgrade** button.
1. To upgrade the compatible collectors:
    1. Update the required configuration for the new source template version.
        :::info
        To know about the changes in the latest source template version, click the **Learn more** button in the warning.<br/><img src={useBaseUrl('img/send-data/learn-more-button-warning.png')} alt="learn-more-button-warning" style={{border:'1px solid gray'}} width="500"/>
        :::
    1. Click **Next** to finish the upgrade.
1. To upgrade the incompatible collectors. Navigate to the **Preview Collector(s)** section to view the list of collectors that are compatible and incompatible to the new version of the source template. Follow any one of the below steps:
    - Create a new source template and link the compatible collectors by collector name and collector tags.
    - Or, unlink the collectors added in the new source template to the existing source template.

## Delete a source template

To delete a source template:

1. In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
1. Select the source template that you need to delete, and click the **Delete** button. Or, click the kebab menu against the selected source template and click **Delete** from the dropdown.
1. The source template will be deleted and removed from the **Source Template** page.

## Add a collector tag

There are two ways to add collector tags: by adding them while [creating the OTEL collector](#step-1-collector-installation) or after creating the collector.

Follow the below steps to add a collector tag after creating the OTEL collector:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the Sumo Logic top menu, select **Configuration** and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. 
1. Navigate and click on the required collector where you need to add the collector tags.
1. In the right pane, scroll to the **Collector Tags** section and click **Edit**.
1. In the edit window, click **+ Add tags**.
1. Add the required tags and click **Proceed**.
1. A new **Update Collector Tag(s)** window will appear, where you can click on the **click here** button to understand the impact of this update. 
1. You will be redirected to a **Mapped Source Template** section, which displays the mapped Source Templates for the collector tags added. This window also displays the **Compatible** and **Incompatible Version** details for the mapped Source Template for the collector.
1. If there are any incompatible Source Template(s), [Upgrade the source template](#upgrade-the-source-template).
1. Once the Source Template is upgraded and is compatible, enter **PROCEED** and click **Confirm**.

## Edit/Delete a collector tag

:::note
- For default collector tags, you will only be allowed to edit the **Values**.
- System collector tags like *sumo.disco.enabled* cannot be edited.
:::

Follow the below steps to edit/delete a collector tag:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. 
1. Navigate and click on the required collector where you need to add the collector tags.
1. In the right pane, scroll to the **Collector Tags** section and click **Edit**.
1. In the edit window, edit/delete the required tags and click **Proceed**.
1. A new **Update Collector Tag(s)** window will appear, where you can click on the **click here** button to understand the impact of this update. 
1. You will be redirected to a **Mapped Source Template** section, which will display the mapped Source Templates for the collector tags edited/deleted. This window also displays the **Compatible** and **Incompatible Version** details for the mapped Source Template for the Collector.
1. If there are any incompatible Source Templates, [Upgrade the source template](#upgrade-the-source-template).
1. Once the Source Template is upgraded and is compatible, enter **PROCEED** and click **Confirm**.

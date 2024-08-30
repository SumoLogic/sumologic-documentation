---
id: remote-management-v2
title: OpenTelemetry Remote Management
sidebar_label: OpenTelemetry Remote Management
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

:::info
This feature is in Beta. To participate, contact your Sumo Logic account executive.
:::

The Sumo Logic Distribution for OpenTelemetry Collector facilitates remote management of data collection configurations, enabling seamless setup from the Sumo Logic UI and deployment to one or more collectors.

## Remote Management features

### Collector tags

With OpenTelemetry (OTel) remote management, you can tag your [OpenTelemetry Collectors](/docs/send-data/opentelemetry-collector) and use those tags to categorize and group them. These tags are enriched in your data, so you can use them in your dashboards and searches as well.

### Source templates

With remote management, data configuration setup for OTel collectors is done using Source templates. This feature extends our existing [Installed Collector Source](/docs/send-data/installed-collectors/sources) template, allowing attachment to multiple collectors.

Utilize collector tags for grouping collectors, and associate Source templates to these collector groups, reducing redundancy in data collection setup. This process, termed *Collector Linking*, streamlines configuration management.

## Install a Collector and configure the Source Template

### Step 1: Collector installation

Follow the below steps to install the collector and add uniquely identifiable tags:

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. Kanso-->
1. On the **OpenTelemetry Collection** page, click **Add Collector**.
1. In the **Set up Collector** step, select **Linux** as the platform.<br/><img src={useBaseUrl('img/send-data/linux-install.png')} alt="linux-install" style={{border: '1px solid gray'}} width="800"/>
1. Enter your **Installation Token**.
1. Under **Tag data on Collector level**, add a new tag (for example, `application = Apache` as seen in the screenshot below to identify these collectors as having Apache running on them).
1. For **Collector Settings**, leave them as default (unchecked).
1. Under **Generate and run the command to install the collector**, copy the command and execute it in your system terminal where the collector needs to be installed.<br/><img src={useBaseUrl('img/send-data/linux-terminal-installation.png')} alt="linux-terminal-installation" width="800"/>
1. Wait for the installation process to complete, then click **Next** to proceed.
1. On the next screen, you will see a list of available Source Templates. Select the required Source Template and proceed with the data configuration.

<!-- Add the auto-discovery page screenshot -->

### Step 2: Data configuration

:::info
A new source template will always be created with the latest version of the source template.
:::

Follow the below steps to create a data collection configuration to collect the required logs and link them to all the collectors with the help of tags:

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Source Template**.  Kanso--> 
1. On the **Source Template** page, click **Add Source Template** and search for the required Source Template.
1. Complete the Source Template form by providing the Name and your error log File Path, then click Next.<br/><img src={useBaseUrl('img/send-data/local-file-apache.png')} alt="local-file-apache" style={{border:'1px solid gray'}} width="300"/>
1. On the **Link Collectors** page, you will have the option to link the collectors using the **Collector Name** or by adding **Collector Tags** to find the group of collectors.
    :::note
    You can link upto 20 collectors for a source template.
    :::
1. Navigate to **Preview Collector(s)** to view the list of collectors that will be linked to the newly created source template. If we have mapped the collectors using both the **Collector Name** and **Collector Tags**, you will get a separate preview sections for the collectors identified by collector name and collector tags.<br/><img src={useBaseUrl('img/send-data/link-collectors.png')} alt="link-collectors" style={{border: '1px solid gray'}} width="800"/>
1. Click **Next** to complete Source Template creation. In the background, the system will apply the configuration to all the linked collectors and starts collecting the required files.

## Edit a Source Template

To edit a source template:

1. In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
1. Select the Source Template that you need to edit, and click **Edit**. Or, click the kebab menu against the selected source template and click **Edit** from the dropdown.
1. Change the required configuration in the Source Template configuration page, and click **Next**.
1. If required, update the collectors on the **Link Collectors** page. 
1. Click **Next** to complete editing the Source Template. 

## Upgrade the Source Template

Follow the below steps to upgrade the source template, if all the collectors associated with the selected source template is supported for the upgrade:

1. In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
1. Select the Source Template that you need to upgrade, and click **Upgrade** button.
1. If required, change the required configuration in the Source Template configuration page.
1. Click **Next** to finish the upgrade.

To upgrade the source template with incompatible collectors:

There will be incompatible collectors if the collectors associated with the selected source template are not supported for the upgrade. Follow the below steps to upgrade the source template if there are incompatible collectors:

:::note
You cannot upgrade your source template until all your linked collectors are compatible with the version upgrade.
:::

1. In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
1. Select the Source Template that you need to upgrade, and click **Upgrade** button.
1. If required, change the required configuration in the Source Template configuration page, and click **Next**.
1. Navigate to **Preview Collector(s)** section to view the list of collectors that are compatible and incompatible to the new version of the source template. Follow the either of the below steps if you have incompatible collectors:
    - Upgrade the collector version to the supported version. Or,
    - Create a new source template and link the required collectors by collector name and collector tags. Also, delink the collectors added in the new source template to the existing source template.

## Delete a Source Template

To delete a source template:

1. In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
1. Select the Source Template that you need to delete, and click the **Delete** button. Or, click the kebab menu against the selected source template and click **Delete** from the dropdown.
1. The source template will be deleted and removed from the **Source Template** page.

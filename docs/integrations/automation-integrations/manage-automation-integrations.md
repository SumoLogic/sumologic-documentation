---
id: manage-automation-integrations
title: Manage Automation Integrations
sidebar_label: Manage Automation Integrations
description: Learn how to install and upgrade integrations from the App Catalog.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import IAMConfiguration from '../../reuse/automation-service/aws/iam-configuration.md';

Integrations are connectors to applications from industry-leading network and security vendors. Resources in the integrations provide the actions run by Playbooks. While the [**Integrations**](/docs/platform-services/automation-service/automation-service-integrations/) menu in the Automation page shows the integrations installed to your environment, the **Integrations** tab in App Catalog shows you [integrations](/docs/integrations/automation-integrations/automation-integration-catalog/) that you can install.

## Install an integration from App Catalog

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the integrations, in the main Sumo Logic menu select **App Catalog > Integrations**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **App Catalog > Integrations**.<br/><img src={useBaseUrl('img/integrations/integration-tab.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="700" />
1. Select the integration you want to install. For example, Atlassian.<br/><img src={useBaseUrl('img/integrations/integration-to-install.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="700" />
1. Click **Install Integration**. Once installed, the integration card displays a green colored **Installed** tag in the top-right corner.

:::note
Find the article for the integration in [Automation Integrations in App Catalog](/docs/integrations/automation-integrations/automation-integration-catalog/) to see if there are additional steps you need to follow to configure the installed integration. Failure to perform these additional steps may result in the integration not working properly.
:::

## Upgrade an integration from App Catalog

If a newer version of an installed integration is available, an **Upgrade Available** tag appears on its card.<br/><img src={useBaseUrl('img/integrations/upgrade-available.png')} alt="upgrade-available" style={{border: '1px solid gray'}} width="250" />
 
Follow the steps below to upgrade the integration:
1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the integrations, in the main Sumo Logic menu select **App Catalog > Integrations**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **App Catalog > Integrations**.
1. Select the integration you want to upgrade.
1. Click **Upgrade**. Once upgraded, the integration card displays a green colored **Installed** tag in the top-right corner which indicates that the integration is installed with the latest upgrades.

### When to upgrade an integration

#### When integrations are installed through playbooks

Integrations installed through playbooks may not include all available actions, such as Containment, Custom, and Scheduled, and so on. These integrations display an **i** icon.<br/><img src={useBaseUrl('img/integrations/i-icon.png')} style={{border:'1px solid gray'}} alt="Installed integration" width="300"/>

Click the icon to open the integration's page in the App Catalog, where you can [upgrade](#upgrade-an-integration-from-app-catalog) it to include all available actions.

#### When installed integration version differs from the version in the App Catalog

If the installed integration version differs from the version in the App Catalog, you can upgrade to the latest version.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation > Integrations**.
1. In the Integrations section, open the installed integration in code mode to view the version. <br/><img src={useBaseUrl('img/cloud-soar/integration-code-mode.png')} style={{border:'1px solid gray'}} alt="Integration code mode" width="300"/>
1. Navigate to **App Catalog > Integrations** in the main Sumo Logic menu and select the same integration. Click **Upgrade**. <br/><img src={useBaseUrl('img/cloud-soar/integration-update-version.png')} alt="Integration update version" style={{border:'1px solid gray'}} width="300"/>
1. Once the integration is upgraded, go back to **Automation > Integrations** in the main Sumo Logic menu to verify if the version of that integration upgraded. <br/><img src={useBaseUrl('img/cloud-soar/integration-update-complete.png')} style={{border:'1px solid gray'}} alt="Integration update complete" width="300"/>

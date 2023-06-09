---
id: automation-service-app-central
title: App Central for the Automation Service
sidebar_label: App Central
description: Learn how to use App Central to get new applications and tools. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

App Central provides apps to help you be more productive in the Automation Service. From here, you can search and add new integrations with all the needed components.

<img src={useBaseUrl('img/cse/automation-service-app-central.png')} alt="App Central" width="800"/>

## Permissions

To use App Central, you must have the following role capabilities:

* View Cloud SOAR
   * App Central
      * Access
      * Export

For more information on role capabilities needed to use the Automation Service, see [Configure role capabilities](/docs/cse/automation-service/about-automation-service#configure-role-capabilities).

## Integrations in App Central

Integrations are connectors to applications from industry-leading network and security vendors. Resources in the integrations provide the actions run by Playbooks. While [Integrations](/docs/cse/automation-service/automation-service-integrations/) in the Automation Service UI shows the integrations installed to your environment, the **Integrations** tab in App Central shows you additional integrations you can install.

:::note
Not all integrations can be installed from App Central. There are more that can be enabled in your environment. For a complete list of all the available integrations, see [Available integrations](/docs/cse/automation-service/automation-service-integrations#available-integrations).
:::

### Install an integration from App Central

1. Use the **Search** bar in the upper right of the **Integrations** tab to find integrations.
1. Click **Download** in the lower left corner of the integration box.
1. Click **Install** to install the integration. After installation is complete, **Installed** replaces the **Download** link in the corner of the integration box.
1. **IMPORTANT**: Click **Show More** in the integration box to see if there are additional steps you need to follow to configure the installed integration. Failure to perform these additional steps may result in the integration not working properly.

### Update an integration from App Central

Integrations in App Central display a version number. The version indicates when there is a change to the integration. If a newer version of an installed integration is available, you can update the integration from App Central by clicking **Update**.

<img src={useBaseUrl('img/cse/automation-service-app-central-update-integration.png')} alt="Version number" width="400"/>

## Playbooks in App Central

A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type.

While [Playbooks](/docs/cse/automation-service/automation-service-playbooks/) in the Automation Service UI show the playbooks installed to your environment, the **Playbooks** tab in App Central shows you additional playbooks you can install.

### Install a playbook from App Central

1. Use the **Search** bar in the upper right of the **Playbooks** tab to find playbooks.
1. Click **Download** in the corner of the playbook box.
1. Click **Next**. 
1. Click **Install** to install the playbook. 
1. Click **Close**. After installation is complete, **Installed** replaces the **Download** link in the corner of the playbook box.
1. **IMPORTANT**: Click **Show More** in the playbook box to see if there are additional steps you need to follow to configure the installed playbook. Failure to perform these additional steps may result in the playbook not working properly.


## Export from App Central

You can export the contents of integrations and playbooks from App Central.

1. Click the **Go to export page** button in the top right corner of the **Integrations** tab.<br/><img src={useBaseUrl('img/cse/automation-service-app-central-export-button.png')} alt="Go to the export page" width="300"/>
1. Select the items you want to export. Provide a description in the box provided. If you select more than one item, you are prompted to provide a title as well. 
1. Scroll down and click **Export** at the bottom right corner of the screen. The selections are exported in a .tar file to your downloads folder.
1. Extract the .tar file. An archive file is extracted from the .tar file (for example, a .tar.gz file).
1. Extract the archive file. The exported items are extracted, including any YAML files they contain. 


---
id: automation-service-app-central
title: App Central in the Automation Service
sidebar_label: App Central
description: Learn how to use App Central to get new applications and tools. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

import Iframe from 'react-iframe';

App Central provides apps to help you be more productive in the Automation Service. From here, you can search and add new integrations with all the needed components. 

<!-- Micro lesson is commented out until it is adjusted to show that App Central is no longer under Cloud SIEM but is part of the Automation Service.

Watch this micro lesson to learn how to use App Central.

<Iframe url="https://www.youtube.com/embed/cfJtReLrMFg?rel=0"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />

-->

## View App Central

To view App Central, [access the Automation Service](/docs/platform-services/automation-service/about-automation-service/#access-the-automation-service) and click **App Central** in the left navigation bar. 

Before you can access App Central, you must have the App Central Access role capability. For more information on role capabilities needed to use the Automation Service, see [Configure role capabilities](/docs/platform-services/automation-service/about-automation-service/#configure-role-capabilities).

## App Central UI 

<img src={useBaseUrl('img/cse/automation-service-app-central.png')} alt="App Central" width="800"/>

1. **Playbooks**. Click to view [playbooks in App Central](#playbooks-in-app-central) that are available to install.
1. **Integrations**. Click to view [integrations in App Central](#integrations-in-app-central) that are available to install.
1. **Search**. Search for integrations or playbooks to install. 
1. **Current hour actions count**. Shows how many playbook actions have been executed in the current hour in your organization. The actions limit is set to 200 per hour by default to prevent abuse of system resources or runaway processes. For more information, see [Actions limit](/docs/platform-services/automation-service/about-automation-service/#actions-limit).
1. **Download**. Click to [install an integration](#install-an-integration-from-app-central) or [install a playbook](#install-a-playbook-from-app-central). 

## Integrations in App Central

Integrations are connectors to applications from industry-leading network and security vendors. Resources in the integrations provide the actions run by Playbooks. While [Integrations](/docs/platform-services/automation-service/automation-service-integrations/) in the Automation Service UI shows the integrations installed to your environment, the **Integrations** tab in App Central shows you additional integrations you can install.

### Install an integration from App Central

1. Use the **Search** bar in the upper right of the **Integrations** tab to find integrations.
1. Click **Download** in the lower left corner of the integration box.
1. Click **Install** to install the integration. After installation is complete, **Installed** replaces the **Download** link in the corner of the integration box.
1. **IMPORTANT**: Click **Show More** in the integration box to see if there are additional steps you need to follow to configure the installed integration. Failure to perform these additional steps may result in the integration not working properly.

### Update an integration from App Central

Integrations in App Central display a version number. The version indicates when there is a change to the integration. If a newer version of an installed integration is available, you can update the integration from App Central by clicking **Update**.

<img src={useBaseUrl('img/cse/automation-service-app-central-update-integration.png')} alt="Version number" width="400"/>

### Update integrations to include all available actions

The purpose of this section is to provide you the information you need to update your integrations to include all types of actions that should be present in that integration, for example, Containment, Custom, Scheduled, and so on. It's a good idea to update every integration installed from App Central to make sure you don't have any integrations without useful actions.

Update integrations in App Central using keywords in the bottom left corner of the integration:
* **UPDATE**. Appears on the installed integrations if there is a new version of that integration and with a new YAML configuration file. <br/><img src={useBaseUrl('img/cloud-soar/new-integration-update.png')} alt="Update" width="300"/>
* **INSTALLED**: Appears when the integration is installed and updated to the latest version, and with the correct actions.<br/><img src={useBaseUrl('img/cloud-soar/integration-installed.png')} alt="Installed" width="300"/>
* **DOWNLOAD**. Appears if this integration is not yet installed.<br/><img src={useBaseUrl('img/cloud-soar/integration-download.png')} alt="Download" width="300"/>

#### Update an installed integration to show all actions

Here an example of updating an installed integration. 

1. In the Integrations section, check the actions present on the installed integration. In the example below, the only types of actions in the integration are Enrichment and Notification. <br/><img src={useBaseUrl('img/cloud-soar/installed-integration.png')} alt="Installed integration" width="800"/>
1. Go to App Central and search for the same integration. Click the integration. <br/><img src={useBaseUrl('img/cloud-soar/installed-detail.png')} alt="Installed integration" width="300"/>
1. On the dialog that appears, click **INSTALL**. <br/><img src={useBaseUrl('img/cloud-soar/install-already-installed-integration.png')} alt="Already installed integration" width="400"/>
1. Go to the Integrations section and select the same integration. As you see in the image below, the Containment action type was added to the two types of actions that were there previously. <br/><img src={useBaseUrl('img/cloud-soar/integration-with-all-actions.png')} alt="All actions installed" width="800"/>

#### Update an integration with a new version to show all actions

If there are two different versions between the integration installed and that in App Central, the type of operation required to update the integration is **UPDATE**.
1. In the Integrations section, open the installed integration in code mode to view the version. <br/><img src={useBaseUrl('img/cloud-soar/integration-code-mode.png')} alt="Integration code mode" width="800"/>
1. Go to App Central and search for the same integration. Click **UPDATE**. <br/><img src={useBaseUrl('img/cloud-soar/integration-update-version.png')} alt="Integration update version" width="300"/>
1. On the dialog that appears, click **Update**.  <br/><img src={useBaseUrl('img/cloud-soar/integration-update-2.png')} alt="Integration update" width="400"/>
1. Go back to the Integrations section at the end of the update operation. Open the integration and check the if the version of that integration updated. <br/><img src={useBaseUrl('img/cloud-soar/integration-update-complete.png')} alt="Integration update complete" width="700"/>
1. Check in the integration detail to see if it shows all the types of actions we expect. <br/><img src={useBaseUrl('img/cloud-soar/integration-all-actions.png')} alt="Integration with all actions" width="600"/>

## Playbooks in App Central

A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type.

While [Playbooks](/docs/platform-services/automation-service/automation-service-playbooks/) in the Automation Service UI show the playbooks installed to your environment, the **Playbooks** tab in App Central shows you additional playbooks you can install.

### Install a playbook from App Central

1. Use the **Search** bar in the upper right of the **Playbooks** tab to find playbooks.
1. Click **Download** in the corner of the playbook box.
1. Click **Next**. 
1. Click **Install** to install the playbook. 
1. Click **Close**. After installation is complete, **Installed** replaces the **Download** link in the corner of the playbook box.
1. **IMPORTANT**: Click **Show More** in the playbook box to see if there are additional steps you need to follow to configure the installed playbook. Failure to perform these additional steps may result in the playbook not working properly.

<!-- There used to be an export button, but now it's gone. Saving this text below in case it comes back. 

## Export from App Central

You can export the contents of integrations and playbooks from App Central.

1. Click the **Go to export page** button in the top right corner of the **Integrations** tab.<br/><img src={useBaseUrl('img/cse/automation-service-app-central-export-button.png')} alt="Go to the export page" width="300"/>
1. Select the items you want to export. Provide a description in the box provided. If you select more than one item, you are prompted to provide a title as well. 
1. Scroll down and click **Export** at the bottom right corner of the screen. The selections are exported in a .tar file to your downloads folder.
1. Extract the .tar file. An archive file is extracted from the .tar file (for example, a .tar.gz file).
1. Extract the archive file. The exported items are extracted, including any YAML files they contain. 

-->

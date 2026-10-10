---
id: manage-automation-integrations
title: Manage Automation Integrations
sidebar_label: Manage Automation Integrations
description: Learn how to configure authentication for automation integrations.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import IAMConfiguration from '../../reuse/automation-service/aws/iam-configuration.md';

Integrations are connectors to applications from industry-leading network and security vendors. Resources in the integrations provide the actions run by Playbooks. While the [**Integrations**](/docs/platform-services/automation-service/automation-service-integrations/) menu item in the Automation Service UI shows the integrations installed to your environment, the **Integrations** tab in App Catalog shows you [integrations in App Catalog](/docs/integrations/automation-integrations/automation-integration-catalog/) that you can install.

### Install an integration from App Catalog

1. Use the **INSTALL** in the lower left corner of the integration box. After installation is complete, **INSTALLED** replaces the **INSTALL** link in the corner of the integration box.
1. **IMPORTANT**: Find the article for the integration in [Automation Integrations in App Catalog](/docs/integrations/automation-integrations/automation-integration-catalog/) to see if there are additional steps you need to follow to configure the installed integration. Failure to perform these additional steps may result in the integration not working properly.

### Update an integration from App Catalog

 If a newer version of an installed integration is available, you can update the integration from App Catalog by clicking **UPDATE** in the lower left corner of the integration box.

### Update integrations to include all available actions

The purpose of this section is to provide you the information you need to update your integrations to include all types of actions that should be present in that integration, for example, Containment, Custom, Scheduled, and so on. It's a good idea to update every integration installed from App Catalog to make sure you do not have any integrations without useful actions.

Update integrations in App Catalog using keywords in the bottom left corner of the integration:

* **UPDATE**. Appears on the installed integrations if there is a new version of that integration and with a new YAML configuration file. <br/><img src={useBaseUrl('img/cloud-soar/new-integration-update.png')} alt="Update" style={{border:'1px solid gray'}} width="300"/>
* **INSTALLED**: Appears when the integration is installed and updated to the latest version, and with the correct actions.<br/><img src={useBaseUrl('img/cloud-soar/integration-installed.png')} alt="Installed" style={{border:'1px solid gray'}} width="300"/>
* **INSTALL**. Appears if this integration is not yet installed.<br/><img src={useBaseUrl('img/cloud-soar/integration-download.png')} style={{border:'1px solid gray'}} alt="Download" width="300"/>

#### Update an installed integration to show all actions

Here an example of updating an installed integration.

1. In the Integrations section, check the actions present on the installed integration. In the example below, the only types of actions in the integration are Enrichment and Notification. <br/><img src={useBaseUrl('img/cloud-soar/installed-integration.png')} style={{border:'1px solid gray'}} alt="Installed integration" width="800"/>
1. Go to App Catalog and search for the same integration. Click the integration. <br/><img src={useBaseUrl('img/cloud-soar/installed-detail.png')} alt="Installed integration" style={{border:'1px solid gray'}} width="300"/>
1. On the dialog that appears, click **INSTALL**. <br/><img src={useBaseUrl('img/cloud-soar/install-already-installed-integration.png')} alt="Already installed integration" style={{border:'1px solid gray'}} width="400"/>
1. Go to the Integrations section and select the same integration. As you see in the image below, the Containment action type was added to the two types of actions that were there previously. <br/><img src={useBaseUrl('img/cloud-soar/integration-with-all-actions.png')} style={{border:'1px solid gray'}} alt="All actions installed" width="800"/>

#### Update an integration with a new version to show all actions

If there are two different versions between the integration installed and that in App Catalog, the type of operation required to update the integration is **UPDATE**.

1. In the Integrations section, open the installed integration in code mode to view the version. <br/><img src={useBaseUrl('img/cloud-soar/integration-code-mode.png')} style={{border:'1px solid gray'}} alt="Integration code mode" width="800"/>
1. Go to App Catalog and search for the same integration. Click **UPDATE**. <br/><img src={useBaseUrl('img/cloud-soar/integration-update-version.png')} alt="Integration update version" style={{border:'1px solid gray'}} width="300"/>
1. On the dialog that appears, click **Update**.  <br/><img src={useBaseUrl('img/cloud-soar/integration-update-2.png')} style={{border:'1px solid gray'}} alt="Integration update" width="400"/>
1. Go back to the Integrations section at the end of the update operation. Open the integration and check the if the version of that integration updated. <br/><img src={useBaseUrl('img/cloud-soar/integration-update-complete.png')} style={{border:'1px solid gray'}} alt="Integration update complete" width="700"/>
1. Check in the integration detail to see if it shows all the types of actions we expect. <br/><img src={useBaseUrl('img/cloud-soar/integration-all-actions.png')} style={{border:'1px solid gray'}} alt="Integration with all actions" width="600"/> 

### Publish an integration to App Catalog

If you create a custom integration that you would like to make available for others to use, you can submit it to Sumo Logic for review and publication in App Catalog. This will allow everyone to install and run the integration in the cloud without having to use the Bridge.

The integration should be for a commercial product for which no integration exists in App Catalog, or be a general purpose integration. Sumo Logic will not add integrations to App Catalog that can only be used by one customer.

1. Ask your Sumo Logic account representative to engage the Professional Services team. The Professional Services team member will guide you through the process of submitting an integration for publication in App Catalog.
1. Select **Integrations** from the navigation menu at the left of the screen.
1. Select your custom integration.
1. Hover the mouse over your custom integration and click the **Export** button that appears to the right. This exports the integration's YAML files to a tar.gz archive file.<br/><img src={useBaseUrl('img/cloud-soar/export-button.png')} alt="Export button" width="100"/>
1. Provide the tar.gz archive file containing your custom integration's YAML files to the Professional Services team member.

Sumo Logic will validate the integration, and work with you to make any updates if needed. If the integration is approved, Sumo Logic will add it to App Catalog. 

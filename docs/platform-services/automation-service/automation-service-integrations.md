---
id: automation-service-integrations
title: Integrations
sidebar_label: Integrations
description: Learn how integrations are connectors to applications from industry-leading network and security vendors.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Integrations are connectors to applications from industry-leading network and security vendors. Playbooks run actions provided by resources in integrations.      

Integrations that are already installed to your environment appear in the **Integrations** menu in the Automation Service (see [View Integrations](#view-integrations)). Integrations that are available for installation appear in App Central (see [Integrations in App Central](/docs/platform-services/automation-service/app-central/integrations/)).

## Available integrations

For a complete list of integrations that are available to install, see [Integrations in App Central](/docs/platform-services/automation-service/app-central/integrations/).

:::warning Important
All automation integrations require authentication to communicate between the vendor and Sumo Logic. For directions, see [Configure Authentication for Automation Integrations](/docs/platform-services/automation-service/configure-authentication-for-integrations/).
:::

## View integrations

The following procedure describes how to view integrations already installed to your environment. You can also [install new integrations using App Central](/docs/platform-services/automation-service/automation-service-app-central/#install-an-integration-from-app-central).

:::tip
You can also create a custom integration. For an example for Cloud SIEM, see [Advanced example: Configure a custom integration](/docs/cse/automation/cloud-siem-automation-examples/#advanced-example-configure-a-custom-integration).
:::

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation** and then select **Integrations** in the left nav bar. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**.  
1. Select an integration to see the actions on the resource. You call these actions when you [add an action node to a playbook](/docs/platform-services/automation-service/automation-service-playbooks/#add-an-action-node-to-a-playbook).<br/><img src={useBaseUrl('img/cse/automations-integrations-actions-list.png')} style={{border:'1px solid gray'}} alt="Actions on an integration" width="700"/>

:::tip
To add a new resource to an integration, click the **+** button to the left of **Resources**. This is useful if you have another instance of the vendor application you want to connect to.
:::

## Certified integrations

Certified integrations are those that are provided by Sumo Logic. You can [install certified integrations using App Central](/docs/platform-services/automation-service/automation-service-app-central/#install-an-integration-from-app-central).

Certified integrations are designated by a **Certified Integration** check mark.<br/><img src={useBaseUrl('img/cse/automations-integration-certified.png')} style={{border:'1px solid gray'}} alt="Certified integration" width="300"/>

After you select the integration resource and click the **View Code** button, the certified integration code is set to read-only mode. The certified integrations code can’t be edited using the Automation Service internal IDE. This is also true for the actions available for that integration.<br/><img src={useBaseUrl('img/cse/automations-integration-certified-2.png')} style={{border:'1px solid gray'}} alt="Certified integration message in resource code" width="400"/>

Certified actions are designated by a **Certified Action** check mark.<br/><img src={useBaseUrl('img/cse/automations-integration-certified-action.png')} style={{border:'1px solid gray'}} alt="Certified action" width="300"/>

You can add resources to the certified integration by clicking the **+** button, or you use it as-is.<br/><img src={useBaseUrl('img/cse/automations-add-resource.png')} style={{border:'1px solid gray'}} alt="Add a resource" width="400"/>

## Duplicate an integration

To modify an integration's code, you must first duplicate the integration and make your modifications in the duplicated version. When you click the **Duplicate integration** button, a new integration will be created in the integrations list with an incremented name. <br/><img src={useBaseUrl('img/cse/automations-integration-duplicate.png')} style={{border:'1px solid gray'}} alt="Duplicate certified integration" width="300"/>

Following is a duplicated integration:<br/><img src={useBaseUrl('img/cse/automations-integration-duplicated.png')} style={{border:'1px solid gray'}} alt="Duplicated integration" width="250"/>

If the certified integration resource was configured before the duplication process, all the settings will be saved and replicated inside the duplicated integration. There is no need to reset the duplicated integration.

Note that in the following example a **(2)** follows the duplicated integration's name, as well as the resource name. A **(3)** would follow the name of the next duplicate, **(4)** the next, and so on. Also note that the actions listed in the integration do not have the **Certified Actions** check mark, because they exist on a duplicated integration.<br/><img src={useBaseUrl('img/cse/automations-integration-duplicated-resources-actions.png')} style={{border:'1px solid gray'}} alt="No changes to duplicated resource actions" width="600"/>

 If you choose a duplicated resource when you [add an acton node to a playbook](/docs/platform-services/automation-service/automation-service-playbooks/#add-an-action-node-to-a-playbook), the actions available will be the ones belonging to the duplicated resource. The following example shows selecting an action from a duplicated resource.<br/><img src={useBaseUrl('img/cse/automations-integration-add-comment-to-issue.png')} style={{border:'1px solid gray'}} alt="Add comment to issue" width="600"/>

## Create a new integration

### In the Automation Service

To create a new integration in the Automation Service, you must supply an integration definition YAML file, as well as an action definition YAML file for each of the actions contained in the integration. For an example of creating a new integration by supplying YAML files, see [Advanced example: Configure a custom integration](/docs/cse/automation/cloud-siem-automation-examples/#advanced-example-configure-a-custom-integration). For sample YAML files, see [example files](/docs/platform-services/automation-service/integration-framework/example-files-integration-framework/). To learn how to build your own YAML files, see [Integration framework file formats](/docs/platform-services/automation-service/integration-framework/about-integration-framework/#integration-framework-file-formats).

To create a new integration:
1. Create an integration definition YAML file, as well as an action definition YAML file for each action in the integration. 
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu click **Automation**. Then click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right, select **Automation**, and then select **Integrations** in the left nav bar. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**.  
1. Select the **+** icon at the top of the screen to the left of **Integrations**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-add-integration-button.png')} alt="Add Integration button" width="500"/>
1. A **New Integration** dialog appears. Drag the integration definition YAML file into the **New Integration** dialog.<br/><img src={useBaseUrl('img/platform-services/automation-service/new-integration-dialog.png')} alt="Add Integration button" width="300"/>
1. Click **Upload**. The new integration is listed on the **Integrations** page.
1. Now that you have uploaded the integration file, you need to upload an action file for the integration.
   1. Hover your mouse over the new integration and click the **Upload** button that appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-upload-icon.png')} alt="Upload button" width="700"/>
   1. In the **Upload** dialog, notice how **Integration File** is highlighted. That's because it was uploaded already.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-upload-files.png')} alt="Upload dialog" width="300"/>
   1. Click **Action** and **Next**.
   1. Drag the action definition YAML file into the **Upload** dialog.
   1. Click **Upload**. The action is added to the integration.
   1. Repeat these steps for any other actions you need to add to the integration.
1. Add the resource information:
   1. Click the **+** button to the left of **Resources**.
   1. Give the resource a **Label** and enter the connection configuration needed by the resource. What you enter is specific to the integration you're adding the resource for. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-add-resource.png')} alt="Add Resource dialog" width="400"/>
   1. Click **Save**. The new integration is complete.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-completed-integration-2.png')} alt="VirusTotal example integration" width="600"/>
1. To test an action, click on the action, then click **Test Action** in the dialog that displays.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-test-action.png')} alt="Test action dialog" width="400"/>

To make your custom integration available for everyone in App Central, see [Publish an integration to App Central](/docs/platform-services/automation-service/automation-service-app-central/#publish-an-integration-to-app-central).

### In Cloud SOAR

If you have Cloud SOAR installed, you can build basic integrations without having to provide custom YAML files.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu click **Cloud SOAR**. Then click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right of the screen, select **Automation**, and then select **Integrations** in the left nav bar. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**.  
1. Select the **+** icon at the top of the screen to the left of **Integrations**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-add-integration-button.png')} alt="Add Integration button" width="500"/>
1. Fill out the **New Integration** dialog:
   1. Upload a **Logo** for your integration.
   1. Provide a **Name**.
   1. Click **Use Connection Configuration** and fill out the fields for credentials configuration.
   1. Click **Add** to add the connection configuration.
   1. If other fields are needed at the integration resource level, click **+ Field** to add the fields and their information. For example, for an integration like VirusTotal, you would need to add `apikey` and `domain` as required fields.
   1. Click **Create**. The integration file is created for the integration. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-integration-dialog.png')} alt="New Integration dialog" width="500"/>
1. Now that you have created the integration file, you need to create an action file for the integration.
   1. Hover your mouse over the new integration and click the **Upload** button that appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-upload-icon.png')} alt="Upload button" width="700"/>
   1. In the **Upload** dialog, notice how **Integration File** is highlighted. That's because it was created in the last step.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-upload-files.png')} alt="Upload dialog" width="300"/>
   1. Click **Action** and **Next**.
1. Fill out the **Upload** dialog:
   1. Provide a **Name** for the action.
   1. Select a **Type** for the action, such as enrichment, containment, custom, or notification.
   1. Click **Use Connection Configuration** if it is needed for the action, fill out the fields for credentials configuration, and click **Add**.
   1. If other fields are needed at the action level, click **+ Field** to add the fields and their information.
   1. Click **Create**. The action file is created for the integration.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-create-action-file.png')} alt="Create action" width="600"/><br/>The new action displays.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-completed-integration.png')} alt="Example integration" width="600"/>
1. Add the resource information:
   1. Click the **+** button to the left of **Resources**.
   1. Give the resource a **Label** and enter the connection configuration needed by the resource. What you enter is specific to the integration you're adding the resource for. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-add-resource.png')} alt="Add Resource dialog" width="400"/>
   1. Click **Save**. The new integration is complete.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-completed-integration-2.png')} alt="VirusTotal example integration" width="600"/>
1. To test an action, click on the action, then click **Test Action** in the dialog that displays.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-test-action.png')} alt="Test action dialog" width="400"/>

To make your custom integration available for everyone in App Central, see [Publish an integration to App Central](/docs/platform-services/automation-service/automation-service-app-central/#publish-an-integration-to-app-central).

## Test action

You can test an action on an integration to ensure that it is working correctly.

1. [Open an integration](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations). 
1. [Ensure that authentication is configured for the integration](/docs/platform-services/automation-service/configure-authentication-for-integrations/). Testing actions on the integration will fail unless the integration's authentication settings are correctly configured so that the product you're integrating with can communicate with Sumo Logic. 
1. Select an action on the integration. For our example shown below, we'll select the **List Users** action on the Atlassian Jira V2 integration. <br/><img src={useBaseUrl('img/platform-services/automation-service/example-action-for-test-action.png')} alt="Example action" style={{border: '1px solid gray'}} width="700" />
1. Enter any values needed for the action to run and click **TEST ACTION**.<br/><img src={useBaseUrl('img/platform-services/automation-service/example-test-action.png')} alt="Example test action" style={{border: '1px solid gray'}} width="400" />
   :::tip
   In some cases, you'll need to provide data for required fields before **TEST ACTION** is enabled. This is data that normally would be provided by the output of other actions running earlier in a playbook sequence, and so must be provided here to test if the action runs correctly. In the example below, note that you need to provide information for the **Issue (ID or Key)** field in order to test the action. Also note that under the **Issue Type** field there is helpful text telling you that you can get the issue type ID and key from the **List Issue Types** action.<br/><img src={useBaseUrl('img/platform-services/automation-service/test-action-required-fields.png')} alt="Required fields for test action" style={{border: '1px solid gray'}} width="400" />
   :::
1. After you click **TEST ACTION**, results of the action are displayed:<br/><img src={useBaseUrl('img/platform-services/automation-service/test-action-results.png')} alt="Test action results" style={{border: '1px solid gray'}} width="600" />


## Cloud or Bridge execution

You can set integrations, and their related action execution, to be executed in the cloud or through the Bridge. Only certified integrations can be executed in the cloud, while custom integrations must be executed through the [Bridge](/docs/platform-services/automation-service/automation-service-bridge/).

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu click **Automation**. Then click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right, select **Automation**, and then select **Integrations** in the left nav bar. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**.  
1. Select an integration.
1. Hover your mouse over the resource name and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-resource-button.png')} alt="Resource edit button" width="600"/>
1. In the **Edit resource** dialog, click the **Automation engine** field to select **Cloud execution** (for certified integrations only) or select a Bridge option (for custom integrations).<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-resource-cloud-execution.png')} alt="Automation engine field" width="400"/>


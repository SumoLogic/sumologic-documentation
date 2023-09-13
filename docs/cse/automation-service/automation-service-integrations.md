---
id: automation-service-integrations
title: Integrations
sidebar_label: Integrations
description: Learn how integrations are connectors to applications from industry-leading network and security vendors.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Integrations are connectors to applications from industry-leading network and security vendors. Playbooks run actions provided by resources in integrations.      

Integrations that are already installed to your environment appear in the **Integrations** menu in the Automation Service. 

:::info
Before you can use actions from an integration resource, you must [configure the connection for the resource](/docs/cse/automation-service/about-automation-service/#configure-the-connection-for-an-integration-resource) to work with the Automation Service.
:::

## View integrations

The following procedure describes how to view integrations already installed to your environment. You can also [install new integrations using App Central](/docs/cse/automation-service/automation-service-app-central/#install-an-integration-from-app-central), or [create a custom integration](/docs/cse/automation-service/automation-service-examples/).

1. Click the **Configuration** button (gear icon) at the top of the UI.
1. Under **Integrations**, select **Automation**.
1. From the **Automation** screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>
1. Click **Integrations** in the left navigation bar.<br/><img src={useBaseUrl('img/cse/automations-integrations-list.png')} alt="Integrations list" width="800"/>
1. Select an integration to see the actions on the resource. You call these actions when you [add an action node to a playbook](/docs/cse/automation-service/automation-service-playbooks#add-an-action-node-to-a-playbook).<br/><img src={useBaseUrl('img/cse/automations-integrations-actions-list.png')} alt="Actions on an integration" width="800"/>

:::tip
To add a new resource to an integration, click the **+** button to the left of **Resources**. This is useful if you have another instance of the vendor application you want to connect to.
:::

## Certified integrations

Certified integrations are those that are provided by Sumo Logic. You can [install certified integrations using App Central](/docs/cse/automation-service/automation-service-app-central/#install-an-integration-from-app-central).

Certified integrations are designated by a **Certified Integration** check mark.<br/><img src={useBaseUrl('img/cse/automations-integration-certified.png')} alt="Certified integration" width="300"/>

After you select the integration resource and click the **View Code** button, the certified integration code is set to read-only mode. The certified integrations code can’t be edited using the Cloud SIEM internal IDE. This is also true for the actions available for that integration.<br/><img src={useBaseUrl('img/cse/automations-integration-certified-2.png')} alt="Certified integration message in resource code" width="400"/>

Certified actions are designated by a **Certified Action** check mark.<br/><img src={useBaseUrl('img/cse/automations-integration-certified-action.png')} alt="Certified action" width="300"/>

You can add resources to the certified integration by clicking the **+** button, or you use it as-is.<br/><img src={useBaseUrl('img/cse/automations-add-resource.png')} alt="Add a resource" width="400"/> 

## Duplicate an integration

To modify an integration's code, you must first duplicate the integration and make your modifications in the duplicated version. When you click the **Duplicate integration** button, a new integration will be created in the integrations list with an incremented name. <br/><img src={useBaseUrl('img/cse/automations-integration-duplicate.png')} alt="Duplicate certified integration" width="400"/>

Following is a duplicated integration:<br/><img src={useBaseUrl('img/cse/automations-integration-duplicated.png')} alt="Duplicated integration" width="250"/>

If the certified integration resource was configured before the duplication process, all the settings will be saved and replicated inside the duplicated integration. There is no need to reset the duplicated integration.

Note that in the following example a **(2)** follows the duplicated integration's name, as well as the resource name. A **(3)** would follow the name of the next duplicate, **(4)** the next, and so on. Also note that the actions listed in the integration do not have the **Certified Actions** check mark, because they exist on a duplicated integration.<br/><img src={useBaseUrl('img/cse/automations-integration-duplicated-resources-actions.png')} alt="No changes to duplicated resource actions" width="600"/>

 If you choose a duplicated resource when you [add an acton node to a playbook](/docs/cse/automation-service/automation-service-playbooks#add-an-action-node-to-a-playbook), the actions available will be the ones belonging to the duplicated resource. The following example shows selecting an action from a duplicated resource.<br/><img src={useBaseUrl('img/cse/automations-integration-add-comment-to-issue.png')} alt="Add comment to issue" width="600"/>

## Available integrations

For a complete list of integrations that are available to install, see the [**Integrations** tab in App Central](/docs/cse/automation-service/automation-service-app-central#integrations-in-app-central). 

---
id: about-automation-service
title: About the Automation Service
sidebar_label: About
description: Get an overview of how the Automation Service allows you to automate actions. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Automation Service allows you to set up actions that run automatically when certain conditions are met in Sumo Logic. These automated actions help you to respond quickly to a wide arrange of events. 

To use the Automation Service, execute playbooks to run actions in a workflow. Actions are provided by integrations with Sumo Logic and third-party vendors. The Automation Service has number of integrations, actions, and playbooks that you can customize. You can also create your own.

## Where you can run automations

You can use the Automation Service to run automations for the following:
* **Cloud SIEM**. Use the [Automation Service with Cloud SIEM](/docs/cse/automation/about-automation-service-and-cloud-siem) to respond to security incidents.
* **Monitors**. Use [automated playbooks in monitors](/docs/alerts/monitors/use-playbooks-with-monitors) to run workflows in response to alerts. 

## Automation Service UI

The Automation Service UI is composed of the following tabs:
* [**App Central**](/docs/platform-services/automation-service/automation-service-app-central). Displays a central repository of integrations and playbooks you can install to your environment.<br/><img src={useBaseUrl('img/platform-services/app-central-main-screen.png')} alt="App Central screen" style={{border: '1px solid gray'}} width="800"/> 
* [**Playbook**](/docs/platform-services/automation-service/automation-service-playbooks). Shows playbooks, which are workflows you can run to perform automations. <br/><img src={useBaseUrl('img/platform-services/playbook-main-screen.png')} alt="Playbook screen" style={{border: '1px solid gray'}} width="800"/>
* [**Integration**](/docs/platform-services/automation-service/automation-service-integrations.md). Lists integrations with Sumo Logic and third-party vendors that provide actions used in playbooks. <br/><img src={useBaseUrl('img/platform-services/integrations-main-screen.png')} alt="Integrations screen" style={{border: '1px solid gray'}} width="800"/>
* [**Bridge**](/docs/platform-services/automation-service/automation-service-bridge.md). Shows connections between on-premises servers and the Sumo Logic cloud. A bridge allows you to create a custom integration in your own system and use it to for automation. <br/><img src={useBaseUrl('img/platform-services/bridge-main-screen.png')} alt="Bridge screen" style={{border: '1px solid gray'}} width="800"/>

## Access the Automation Service

:::info
Before you can access the Automation Service, you must first [configure role capabilities](#configure-role-capabilities).
:::

### From the Sumo Logic screen
1. Go to the main menu.
1. Click **Automation**. <br/><img src={useBaseUrl('img/platform-services/automation-menu-in-nav-bar-main.png')} alt="Automation menu option in the nav bar" style={{border: '1px solid gray'}} width="250"/> 
1. The Automation Service screen opens on the **Playbook** tab. <br/><img src={useBaseUrl('img/platform-services/playbook-main-screen.png')} alt="Playbook screen" style={{border: '1px solid gray'}} width="800"/>

### From Cloud SIEM
1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" style={{border: '1px solid gray'}} width="150"/><br/>The list of available automations appears. Each automation runs a playbook.<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" style={{border: '1px solid gray'}} width="800"/>
1. At the top of the screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" style={{border: '1px solid gray'}} width="400"/>
1. The Automation Service screen opens on the **Playbook** tab. <br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" style={{border: '1px solid gray'}} width="800"/>

## Prerequisites

### Configure role capabilities

Access to the Automation Service is controlled by [role capabilities](/docs/manage/users-roles/roles/role-capabilities) in the Sumo Logic platform. To get access to the Automation Service:
1. In the left navigation bar of Sumo Logic, select **Administration > Users and Roles**.
1. Click the **Roles** tab. 
1. Click **Add Role** to create a new role for users of the Automation Service. Alternatively, you can select an existing role in the **Roles** tab and click **Edit**.
1. Add the following capabilities:
   * **Automation Service**
      * **Task View**
      * **Task Access**
      * **Task Access all**
      * **Task Edit**
      * **Task Reassign**
      * **App Central Access**
      * **App Central Export**
      * **Integrations Access**
      * **Integrations Configure**
      * **Playbooks Access**
      * **Playbooks Configure**
      * **Bridge Monitoring Access**
      * **Observability Access**
      * **Observability Configure**

### Configure the connection for an integration resource

To use [integrations](/docs/platform-services/automation-service/automation-service-integrations), you must configure the connection for their resources.
1. Click **Integrations** in the left navigation bar.
1. Select the integration whose resource you want to configure the connection for.
1. Hover over the resource name and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/cse/automations-edit-resource.png')} alt="Edit a resource" width="800"/> 
1. Enter the connection configuration needed by the resource. What you enter is specific to the resource you're using. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. For example, in the following screen enter the **API URL** and **API Key**. <br/><img src={useBaseUrl('img/cse/automations-edit-resource-2.png')} alt="Edit a resource" width="400"/> 
1. Click **Save** to save the configuration. 

## Actions limit

To prevent abuse of system resources or runaway processes, the Automation Service limits the number of playbook actions your organization can execute to 200 per hour by default. To see how many actions your organization has used in the current hour, see the **Current hour actions count** in the [App Central UI](/docs/platform-services/automation-service/automation-service-app-central/#app-central-ui). All actions running in the cloud or via the bridge are included in this limit.
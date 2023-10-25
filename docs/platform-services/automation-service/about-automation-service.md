---
id: about-automation-service
title: About the Automation Service
sidebar_label: About the Automation Service
description: Get an overview of how the Automation Service allows you to automate smart actions, including enrichments and notifications. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';


## Access the Automation Service

An automation runs a playbook, which  runs actions that are provided by integrations. This section shows you how to access each of these elements. 

:::info
Before you can access the Automation Service, you must first [configure role capabilities](#configure-role-capabilities).
:::

1. To access the Automation Service:
   * From the Sumo Logic screen:
     1. Go to the main menu.
     1. Click **Automation**. <br/><img src={useBaseUrl('img/cse/automation-menu-in-nav-bar.png')} alt="Automation menu option in the nav bar" width="200"/> 
     :::note
     The **Automation** option appears in the main menu only if you have Cloud SIEM installed. If you also have Cloud SOAR installed, a **Cloud SOAR** option appears instead, since all automation services are provided by Cloud SOAR when it installed in conjunction with Cloud SIEM.
     :::
   * From Cloud SIEM:
     1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
     1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/><br/>The list of available automations appears. Each automation runs a playbook.<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/>
     1. At the top of the screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>
1. The Automation Service screen will display a list of available [playbooks](/docs/cse/automation-service/automation-service-playbooks#view-playbooks). Playbooks run actions provided by integrations.<br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" width="800"/>
1. Open a playbook to see the actions it runs. Click an action to view the integration resource that provides it.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} alt="Action example" width="800"/>
1. To [view integrations](/docs/cse/automation-service/automation-service-integrations#view-integrations), click **Integrations** in the left navigation bar.<br/><img src={useBaseUrl('img/cse/automations-integrations-list.png')} alt="Integrations list" width="800"/>
1. Open an integration to see its actions.<br/><img src={useBaseUrl('img/cse/automations-resource-example.png')} alt="Resource example" width="700"/>
1. After an automation runs, click the **Automations** tab in Insights or Entities to [view results of the automation](/docs/cse/automation-service/automation-service-automations/#view-results-of-an-automation).<br/><img src={useBaseUrl('img/cse/automations-on-insight.png')} alt="Automations on an Insight" width="800"/>

## Overview: Configure an automation

This section gives you an overview of how to set up an automation. This process assumes you want to create your own playbook to use in an automation. For examples, see [Automation examples](/docs/cse/automation-service/automation-service-examples/).

:::info
Before you can configure an automation, you must [configure the connection](#configure-the-connection-for-an-integration-resource) for the integration resources you want the automation to use.
:::

### Step 1: Get actions for the playbook

The first thing you need to do is decide what actions you want to use in your playbook. 

1. Open the [integration](/docs/cse/automation-service/automation-service-integrations#view-integrations) that has actions you want the playbook to run.
1. Note the names of the actions you want to use, including their resource name. You'll need these to add the actions to your playbook. 
1. If you want to customize an action:
   1. Click the [duplication button](/docs/cse/automation-service/automation-service-integrations#duplicate-an-integration) on the integration to create a customizable integration. The name of the duplicated integration will end in **(1)**.
   1. To customize the action in the duplicated integration, click the **Edit** button on the action.


### Step 2: Add the actions to the playbook

Now that you have the names of the actions you want to use, you can add them to your playbook.

1. [Create a new playbook](/docs/cse/automation-service/automation-service-playbooks#create-a-new-playbook).
1. Click **Add Node**.
1. Choose [**Action**](/docs/cse/automation-service/automation-service-playbooks#add-an-action-node-to-a-playbook) as the type of node to add.
1. In the **Action** field, select the name an action you identified in Step 1. 
1. As soon as you choose the action, the **Resource** field displays the name of the resource. Verify that the name of the resource matches what you noted in Step 1. 
1. Fill out the rest of the fields in the **Add Node** dialog to configure the action to behave the way you want.
1. Click **Create**. The node is added to the playbook.
1. Repeat to add more actions to the playbook. If desired, add conditions.
1. Click **Save** to save your changes.
1. When you're ready to let the playbook be used in automations, click **Publish**. 

### Step 3: Add the playbook to an automation

Now that the playbook is configured, you can add it to an automation.

1. [Create a new automation](/docs/cse/automation-service/automation-service-automations#create-an-automation).
1. Select the playbook you created in Step 2.
1. In **Expects attributes for**,  select **Entity** or **Insight**.
1. Select whether you want to automatically run the automation when an Insight is created or closed, or to run it manually. (For the purposes of this overview, select **Manually Done**.)
1. Select **Enabled**.
1. Click **Add to List**.

### Step 4: Run the automation

Now that you've created the automation, it is ready to run. If you set the automation to run when an Insight is created or closed, it runs [automatically](/docs/cse/automation-service/automation-service-automations#run-an-automation-automatically). 

If you configured the automation to [run manually](/docs/cse/automation-service/automation-service-automations#run-an-automation-manually), you can run it from an Insight or an Entity:
* Insights
   1. Open an Insight.
   1. Click **Actions**.
   1. Select the automation from one of the following, depending on whether the automation expects attributes for Insights or Entities:
      * **Insight Automation**. Displays a list of all enabled Insight automations configured to run manually.
      * **Entity Automation**. Displays a **Run Automations** option. Click **Run Automations** to open a dialog enabling you to select one or more Entity automations to run. 
* Entities
   1. Open an Entity.
   1. Click **Automations** under the Entity's name. 
   1. Select an option under **Entity Automation**. 

:::note
{@import ../../reuse/action-limits.md}
:::

## Prerequisites

### Configure role capabilities

Access to the Automation Service is controlled by [role capabilities](/docs/manage/users-roles/roles/role-capabilities) in the Sumo Logic platform. To get access to the Automation Service:
1. In the left navigation bar of Sumo Logic, select **Administration > Users and Roles**.
1. Click the **Roles** tab. 
1. Click **Add Role** to create a new role for users of the Automation Service. Alternatively, you can select an existing role in the **Roles** tab and click **Edit**.
1. Add the following capabilities:
   * Cloud SIEM
     * Configuration
       * View Automations
       * Manage Automations
       * Execute Automations
   * Cloud SOAR
     * View Cloud SOAR
     * Automation Playbooks
       * Access
       * Configure
1. Follow the directions to [access the Automation Service](#access-the-automation-service) to verify that you can see the **Automation** option in the **Configuration** menu.

:::note
To interact with most of the Automation Service features, you must have at least View Automations, View Cloud SOAR, and Access Playbooks permissions.
:::


### Configure the connection for an integration resource

To use [integrations](/docs/cse/automation-service/automation-service-integrations), you must configure the connection for their resources.
1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. Click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/> 
1. Click **Integrations** in the left navigation bar.
1. Select the integration whose resource you want to configure the connection for.
1. Hover over the resource name and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/cse/automations-edit-resource.png')} alt="Edit a resource" width="800"/> 
1. Enter the connection configuration needed by the resource. What you enter is specific to the resource you're using. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. For example, in the following screen enter the **API URL** and **API Key**. <br/><img src={useBaseUrl('img/cse/automations-edit-resource-2.png')} alt="Edit a resource" width="400"/> 
1. Click **Save** to save the configuration. 

### Actions limit

To prevent abuse of system resources or runaway processes, the Automation Service limits the number of playbook actions your organization can execute to 50 per hour by default. To see how many actions your organization has used in the current hour, see the **Current hour actions count** in the [App Central UI](/docs/platform-services/automation-service/automation-service-app-central/#app-central-ui). All actions running in the cloud or via the bridge are included in this limit.
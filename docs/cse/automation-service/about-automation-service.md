---
id: about-automation-service
title: About the Automation Service
sidebar_label: About the Automation Service
description: Get an overview of how the Automation Service allows you to automate smart actions, including enrichments and notifications. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes the Automation Service for Cloud SIEM Enterprise (CSE).

The Automation Service for Cloud SIEM Enterprise (CSE) uses [Cloud SOAR automation](/docs/cloud-soar/automation/) capabilities to allow you to define and automate smart actions, including enrichments and notifications. These actions can be automatically triggered when certain events occur in CSE, helping you to quickly investigate, understand, and react to potential security threats.

You can interact with the service through [automations](/docs/cse/automation-service/automation-service-automations), which execute playbooks. [Playbooks](/docs/cse/automation-service/automation-service-playbooks)  are composed of one or more [actions](/docs/cse/automation-service/automation-service-playbooks#add-an-action-node-to-a-playbook) with a workflow that could include parallel actions and logic steps. Actions are included with [integrations](/docs/cse/automation-service/automation-service-integrations). Sumo Logic provides a number of integrations, actions, and playbooks with the service that you can customize. You can also create your own.

## Differences compared to Cloud SOAR

The Automation Service differs from Cloud SOAR in the following ways:
* The Automation Service only supports automated enrichment, notification, and custom action types. 
* Automation Service playbooks can only be triggered from CSE.
* The Automation Service allows you to execute up to 10,000 actions per day.
* The Automation Service does not include the incident and case management features from Cloud SOAR.
* Playbooks, integrations, and actions in this version may differ from those in [Cloud SOAR automation](/docs/cloud-soar/automation/). 

:::info Limited availability
The Automation Service is available on a limited availability (LA) basis. This means the feature is fully implemented and supported, and is available to all customers, but is only deployed in customer environments upon request. If you would like the Automation Service enabled in your Cloud SIEM Enterprise environment, contact your Sumo Logic account representative.

Cloud SOAR automation [App Central](/docs/cloud-soar/automation/#app-central), where you can browse the full integration and playbook catalog, is not yet connected to the Automation Service. A selection of popular integrations have been added to your environment automatically, but the full list of [available integrations](/docs/cse/automation-service/automation-service-integrations#available-integrations) is included. Contact your Sumo Logic account representative if you would like to have one of these integrations added to your environment, if you would like documentation for a specific integration, or if you're interested in an integration that's not listed.
:::

## Benefits

* The Automation Service supports enrichment, notification, and custom actions:
  * Enrichment actions can be used to gather additional information about an Entity or Insight, including [threat indicators](/docs/cse/integrations/enrichments-and-indicators#threat-indicators).
  * Notification actions can be used to send notifications or update status in systems like Cloud SIEM, the Continuous Intelligence Platform (CIP), Slack, Microsoft Teams, Jira, email, and so on.
* Automations can be triggered automatically when an Insight is created or closed. Automations can also be executed manually via the Cloud SIEM UI and API.
* Playbooks can contain both enrichment and notification actions. Playbooks can also be nested. So, for example, you could define a playbook that is executed automatically when an Insight is created that gathers enrichment data. And if the data returned includes a malicious threat indicator:
  1. Changes the Insight state to “In Progress”.
  1. Assigns the Insight.
  1. Sends a (customized) email with information about the Insight and indicator.
  1. Creates a Slack channel for the Insight.
  1. Invites certain people to the Slack channel.

:::note
* The Automation Service is intended to replace the legacy [Insight Actions](/docs/cse/administration/create-cse-actions#insight-actions) and the [Insight Enrichment Server](/docs/cse/integrations/insight-enrichment-server/). All of the actions and integrations provided with those capabilities are included in the Automation Service (though some may require “on-premise” deployment through the [bridge](/docs/cse/automation-service/automation-service-bridge)). Those capabilities will be deprecated later in 2023. 
* Actions can run directly from the Sumo Logic cloud or from other environments via a [bridge](/docs/cse/automation-service/automation-service-bridge/). For security and performance reasons, only certified integrations and actions can run directly from the Sumo Logic cloud environment.
:::

## Access the Automation Service

An automation runs a playbook, which  runs actions that are provided by integrations. This section shows you how to access each of these elements.

1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/><br/>The list of available automations appears. Each automation runs a playbook.<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/>
1. To [view playbooks](/docs/cse/automation-service/automation-service-playbooks#view-playbooks), at the top of the screen click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>.<br/>The list of available playbooks displays. Playbooks run actions provided by integrations.<br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" width="800"/>
1. Open a playbook to see the actions it runs. Click an action to view the integration resource that provides it.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} alt="Action example" width="800"/>
1. To [view integrations](/docs/cse/automation-service/automation-service-integrations#view-integrations), click **Integrations** in the left navigation bar.<br/><img src={useBaseUrl('img/cse/automations-integrations-list.png')} alt="Integrations list" width="800"/>
1. Open an integration to see its actions.<br/><img src={useBaseUrl('img/cse/automations-resource-example.png')} alt="Resource example" width="700"/>
1. After an automation runs, click the **Automations** tab in Insights or Entities to [view results of the automation](/docs/cse/automation-service/automation-service-automations/#view-results-of-an-automation).<br/><img src={useBaseUrl('img/cse/automations-on-insight.png')} alt="Automations on an Insight" width="800"/>

## Overview: Configure an automation

This section gives you an overview of how to set up an automation. This process assumes you want to create your own playbook to use in an automation.

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


## Prerequisites

### Configure role capabilities

After the Automation Service is enabled for your organization, access to the Automation Service is controlled by [role capabilities](/docs/manage/users-roles/roles/role-capabilities) in the Sumo Logic platform. To get access to the Automation Service:
1. In the left navigation bar of Sumo Logic, select **Administration > Users and Roles**.
1. Click the **Roles** tab. 
1. Click **Add Role** to create a new role for users of the Automation Service. Alternatively, you can select an existing role in the **Roles** tab and click **Edit**.
1. Add the following capabilities:
   * Cloud SIEM Enterprise
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
1. Enter the connection configuration needed by the resource. What you enter is specific to the resource you're using. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. For example, in the following screen enter the the **API URL** and **API Key**. <br/><img src={useBaseUrl('img/cse/automations-edit-resource-2.png')} alt="Edit a resource" width="400"/> 
1. Click **Save** to save the configuration. 


### API and Terraform support

The [CSE API](/docs/cse/administration/cse-apis/) supports automations. Endpoints include:
* `GET /automations`. Get the list of automations
* `POST /automations`. Create an automation
* `POST /automations/execute`. Run one or more automations against one or more Entities/Insights
* `DELETE /automations/{id}`. Delete an automation
* `GET /automations/{id}`. Get a specific automation
* `PUT /automations/{id}`. Update a specific automation

The Sumo Logic Terraform provider also supports automations. For more information, see the [Sumo Logic Terraform documentation](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs).

:::tip
The Automation Service uses the Cloud SOAR API. For more information about the API, click the **?** button in the upper right of the Cloud SOAR UI to see the API Documentation manual.
:::


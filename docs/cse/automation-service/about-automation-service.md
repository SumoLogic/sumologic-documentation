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

:::info Limited availability
The Automation Service is available on a limited availability (LA) basis. If you would like the Automation Service enabled in your Cloud SIEM Enterprise environment, contact your Sumo Logic account representative.

Playbooks, integrations, and actions in this version may differ from those in [Cloud SOAR automation](/docs/cloud-soar/automation/):
* Playbooks type must be **CSE**.
* The Automation Service only supports automated enrichment, notification, and custom action types at this time. 
* Actions can run "on-premise" via a [bridge](/docs/cse/automation-service/automation-service-bridge) or can run directly through the Sumo Logic cloud. For security and performance reasons, only certified integrations and actions can run directly through the cloud; custom actions must run "on-premise".
* Cloud SOAR automation [App Central](/docs/cloud-soar/automation/#app-central), where you can browse the full integration and playbook catalog, is not yet connected to the Automation Service. A selection of popular integrations have been added to your environment automatically, but the full list of available integrations is included in [Available integrations](/docs/cse/automation-service/automation-service-integrations#available-integrations) below. Contact your Sumo Logic account representative if you would like to have one of these integrations added to your environment, if you would like documentation for a specific integration, or if you're interested in an integration that's not listed.
:::

## Benefits

* The Automation Service supports enrichment, notification, and custom actions:
  * Enrichment actions can be used to gather additional information about an Entity or Insight, including [threat indicators](/docs/cse/integrations/automation-service-enrichments#threat-indicators).
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
* The Automation Service allows you to execute up to 10,000 actions per day. 
:::

## Access the Automation Service

1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/><br/>The list of available automations appears.<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/>
1. To view playbooks, at the top of the screen click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>.<br/>The list of available playbooks displays.<br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" width="800"/>
1. To view integrations, click **Integrations** in the left navigation bar.<br/><img src={useBaseUrl('img/cse/automations-integrations-list.png')} alt="Integrations list" width="800"/>

## Tour the Automation Service

An automation runs a playbook, which in turns runs actions that are provided by integrations. This section introduces you to each of these elements.

### Step 1: View an automation
[Automations](/docs/cse/automation-service/automation-service-automations) add enrichments and create notifications for either Insights or Entities. You can set automations to run automatically when Insights are created or closed, or you can run them manually.
1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. View the list of available automations. (If no automations display, you must first [create an automation](/docs/cse/automation-service/automation-service-automations#create-an-automation) by clicking **New Automation**.)<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/>
1. To see the playbook an automation runs, click the **Edit** button.<br/><img src={useBaseUrl('img/cse/automations-edit-button.png')} alt="Automation edit button" width="800"/>
1. The playbook is shown.<br/><img src={useBaseUrl('img/cse/automations-edit-dialog.png')} alt="Automation edit dialog" width="400"/>

### Step 2: View the playbook for the automation
A [playbook](/docs/cse/automation-service/automation-service-playbooks) contains a series of actions that are performed when an automation runs.
1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. At the top of the **Automation** screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>
1. View the list of playbooks available to run in automations.<br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" width="800"/>
1. Open the playbook for the automation you viewed in [Step 1](#step-1-view-an-automation).<br/><img src={useBaseUrl('img/cse/automations-open-playbook.png')} alt="Opened playbook" width="800"/>
1. Note the actions in the playbook. [Actions](#add-an-action-node-to-a-playbook) are the boxes in the flow, and are the operations performed in a playbook. Click an action to view the integration resource that provides it.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} alt="Action example" width="800"/>

### Step 3: View the integration that provides the action
Playbooks run actions provided by resources in [integrations](/docs/cse/automation-service/automation-service-integrations). 
1. Click **Integrations** in the left navigation bar.<br/><img src={useBaseUrl('img/cse/automations-integrations-list.png')} alt="Integrations list" width="800"/>
1. Select the integration that provides the action you viewed in [Step 2](#step-2-view-the-playbook-for-the-automation). The action is shown in the list of actions on the resource.<br/><img src={useBaseUrl('img/cse/automations-resource-example.png')} alt="Resource example" width="700"/>

<!-- github-comment 

## Overview: Configure an automation

This section gives you an overview of how to set up an automation. 

### Step 1: Configure actions for the playbook

Write

### Step 2: Add the actions to the playbook

Write

### Step 3: Add the playbook to the automation

Write

### Step 4: Run the automation

Write
-->

## View results of an automation

If an automation is set to run when an Insight is created or closed, it [runs automatically](/docs/cse/automation-service/automation-service-automations#run-an-automation-automatically). You can also [run an automation manually](/docs/cse/automation-service/automation-service-automations#run-an-automation-manually). 

When automations run, the results display on Insights and Entities.
1. Open an Insight or Entity.
1. Click **Automations** at the top of the screen. The example below shows automations that ran on an Insight. Each automation shows its result under **Status**. You can click **View Playbook** to see the playbook that the automation ran.<br/><img src={useBaseUrl('img/cse/automations-on-insight.png')} alt="Automations on an Insight" width="800"/>

While viewing an Insight or Entity, you can run automations manually:
* Insights:
   1. Click **Actions** under the Insight's name. 
   1. Select an option under **Insight Automation** to run an automation on the Insight.
   1. Select an option under **Entity Automation** to run an automation on Entities in the Insight.
   <br/><img src={useBaseUrl('img/cse/automations-insight-actions-menu.png')} alt="Actions menu on an Insight" width="300"/> 
* Entities:
   1. Click **Automations** under the Entity's name. 
   1. Select an option under **Entity Automation**. 
   <br/><img src={useBaseUrl('img/cse/automations-entity-automations-menu.png')} alt="Automations menu on an Entity" width="250"/> 
 
## View enrichments
When automations run, they can provide enrichments to Insights, Entities, and Signals. 
1. Open an Insight, Entity, or Signal with enrichments provided by an automation. 
1. Click **Enrichments** at the top of the screen.
1. If [threat indicators are set by the enrichment](/docs/cse/integrations/automation-service-enrichments#threat-indicators), they are displayed. The following example shows a **Malicious** threat indicator.<br/><img src={useBaseUrl('img/cse/automations-malicious-threat-indicator.png')} alt="Threat indicator example" width="800"/> 


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
1. Follow the directions in our [tour of the Automation Service](#tour-the-automation-service) to verify that you can see the **Automation** option in the **Configuration** menu.

:::note
To interact with most of the Automation Service features, you must have at least View Automations, View Cloud SOAR, and Access Playbooks permissions.
:::

### Authorize integrations

To use [integrations](/docs/cse/automation-service/automation-service-integrations), you must authorize their resources for use in the Automation Service.
1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. Click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/> 
1. Click **Integrations** in the left navigation bar.
1. Select the integration whose resource you want to authorize.
1. Hover over the resource name and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/cse/automations-edit-resource.png')} alt="Edit a resource" width="800"/> 
1. Enter the authorization needed by the resource. What you enter is specific to the resource you're using. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. For example, in the following screen enter the the **API URL** and **API Key**. <br/><img src={useBaseUrl('img/cse/automations-edit-resource-2.png')} alt="Edit a resource" width="400"/> 
1. Click **Save** to save the configuration. 


### API and Terraform support

The [CSE API](/docs/cse/administration/cse-apis/) has been updated to support automations. The new endpoints include:
* `GET /automations`. Get the list of automations
* `POST /automations`. Create an automation
* `POST /automations/execute`. Run one or more automations against one or more Entities/Insights
* `DELETE /automations/{id}`. Delete an automation
* `GET /automations/{id}`. Get a specific automation
* `PUT /automations/{id}`. Update a specific automation

The Sumo Logic Terraform provider has also been updated. For more information, see the [Sumo Logic Terraform documentation](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs).

:::tip
The Automation Service uses the Cloud SOAR API. For more information about the API, click the **?** button in the upper right of the Cloud SOAR UI to see the API Documentation manual.
:::


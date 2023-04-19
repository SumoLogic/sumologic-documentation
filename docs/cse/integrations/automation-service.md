---
id: automation-service
title: Automation Service
sidebar_label: Automation Service
description: Use the Automation Service to automate smart actions including enrichments and notifications. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes the Automation Service for Cloud SIEM Enterprise (CSE).

:::info Limited availability
The Automation Service is available on a limited availability (LA) basis. If you would like the Automation Service enabled in your Cloud SIEM Enterprise environment, contact your Sumo Logic account representative.
:::

## About the Automation Service

The Automation Service for Cloud SIEM Enterprise (CSE) uses [Cloud SOAR automation](/docs/cloud-soar/automation/) capabilities to allow you to define and automate smart actions, including enrichments and notifications. These actions can be automatically triggered when certain events occur in CSE, helping you to quickly investigate, understand, and react to potential security threats.

You can interact with the service through [automations](#automations), which execute playbooks. [Playbooks](#playbooks)  are composed of one or more [actions](#add-an-action-node-to-a-playbook) with a workflow that could include parallel actions and logic steps. Actions are included with [integrations](#integrations). Sumo Logic provides a number of integrations, actions, and playbooks with the service that you can customize. You can also create your own.

:::info Limited availability
Playbooks, integrations, and actions in this version may differ from those in [Cloud SOAR automation](/docs/cloud-soar/automation/):
* Playbooks type must be **CSE**.
* The Automation Service only supports automated enrichment, notification, and custom action types at this time. 
* Actions can run "on-premise" via a [bridge](#bridge) or can run directly through the Sumo Logic cloud. For security and performance reasons, only certified integrations and actions can run directly through the cloud; custom actions must run "on-premise".
* Cloud SOAR automation [App Central](/docs/cloud-soar/automation/#app-central), where you can browse the full integration and playbook catalog, is not yet connected to the Automation Service. A selection of popular integrations have been added to your environment automatically, but the full list of available integrations is included in [Available integrations](#available-integrations) below. Contact your Sumo Logic account representative if you would like to have one of these integrations added to your environment, if you would like documentation for a specific integration, or if you're interested in an integration that's not listed.
:::

### Benefits

* The Automation Service supports enrichment, notification, and custom actions:
  * Enrichment actions can be used to gather additional information about an Entity or Insight, including [threat indicators](#threat-indicators).
  * Notification actions can be used to send notifications or update status in systems like Cloud SIEM, the Continuous Intelligence Platform (CIP), Slack, Microsoft Teams, Jira, email, and so on.
* Automations can be triggered automatically when an Insight is created or closed. Automations can also be executed manually via the Cloud SIEM UI and API.
* Playbooks can contain both enrichment and notification actions. Playbooks can also be nested. So, for example, you could define a playbook that is executed automatically when an Insight is created that gathers enrichment data. And if the data returned includes a malicious threat indicator:
  1. Changes the Insight state to “In Progress”.
  1. Assigns the Insight.
  1. Sends a (customized) email with information about the Insight and indicator.
  1. Creates a Slack channel for the Insight.
  1. Invites certain people to the Slack channel.

:::note
* The Automation Service is intended to replace the legacy [Insight Actions](/docs/cse/administration/create-cse-actions#insight-actions) and the [Insight Enrichment Server](/docs/cse/integrations/insight-enrichment-server/). All of the actions and integrations provided with those capabilities are included in the Automation Service (though some may require “on-premise” deployment through the [bridge](#bridge)). Those capabilities will be deprecated later in 2023.
* The Automation Service allows you to execute up to 10,000 actions per day. 
:::

### Prerequisites

#### Configure role capabilities

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
1. Follow the directions in our [tour the Automation Service](#tour-the-automation-service) to verify that you can see the **Automation** option in the **Configuration** menu.

:::note
To interact with most of the Automation Service features, you must have at least View Automations, View Cloud SOAR, and Access Playbooks permissions.
:::

#### Authorize integrations

To use [integrations](#integrations), you must authorize their resources for use in the Automation Service.
1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. Click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/> 
1. Click **Integrations** in the left navigation bar.
1. Select the integration whose resource you want to authorize.
1. Hover over the resource name and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/cse/automations-edit-resource.png')} alt="Edit a resource" width="800"/> 
1. Enter the authorization needed by the resource. What you enter is specific to the resource you're using. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. For example, in the following screen enter the the **API URL** and **API Key**. <br/><img src={useBaseUrl('img/cse/automations-edit-resource-2.png')} alt="Edit a resource" width="400"/> 
1. Click **Save** to save the configuration. 


#### API and Terraform support

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

### Tour the Automation Service

In this section, we'll show you how an automation runs a playbook, which in turns runs actions that are provided by integrations. 

#### Step 1: View an automation
[Automations](#automations) add enrichments and create notifications for either Insights or Entities. You can set automations to run automatically when Insights are created or closed, or you can run them manually.
1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. View the list of available automations. (If no automations display, you must first [create an automation](#create-an-automation) by clicking **New Automation**.)<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/>
1. To see the playbook an automation runs, click the **Edit** button.<br/><img src={useBaseUrl('img/cse/automations-edit-button.png')} alt="Automation edit button" width="800"/>
1. The playbook is shown.<br/><img src={useBaseUrl('img/cse/automations-edit-dialog.png')} alt="Automation edit dialog" width="400"/>

#### Step 2: View the playbook for the automation
A [playbook](#playbooks) contains a series of actions that are performed when an automation runs.
1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. At the top of the **Automation** screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>
1. View the list of playbooks available to run in automations.<br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" width="800"/>
1. Open the playbook for the automation you viewed in [Step 1](#step-1-view-an-automation).<br/><img src={useBaseUrl('img/cse/automations-open-playbook.png')} alt="Opened playbook" width="800"/>
1. Note the actions in the playbook. [Actions](#add-an-action-node-to-a-playbook) are the boxes in the flow, and are the operations performed in a playbook. Click an action to view the integration resource that provides it.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} alt="Action example" width="800"/>

#### Step 3: View the integration that provides the action
Playbooks run actions provided by resources in [integrations](#integrations). 
1. Click **Integrations** in the left navigation bar.<br/><img src={useBaseUrl('img/cse/automations-integrations-list.png')} alt="Integrations list" width="800"/>
1. Select the integration that provides the action you viewed in [Step 2](#step-2-view-the-playbook-for-the-automation). The action is shown in the list of actions on the resource.<br/><img src={useBaseUrl('img/cse/automations-resource-example.png')} alt="Resource example" width="700"/>

#### Step 4: View results of an automation

You've now seen how an automation runs a playbook, which in turns runs actions that are provided by integrations. Let's now see what happens after automations run.

When automations run, the results display on Insights and Entities.
1. Open an Insight or Entity.
1. Click **Automations** at the top of the screen. The example below shows automations that ran on an Insight. Each automation shows its result under **Status**. You can click **View Playbook** to see the playbook that the automation ran.<br/><img src={useBaseUrl('img/cse/automations-on-insight.png')} alt="Automations on an Insight" width="800"/>
1. While viewing an Insight or Entity, you can run automations manually:
   * Insights:
      1. Click **Actions** under the Insight's name. 
      1. Select an option under **Insight Automation** to run an automation on the Insight.
      1. Select an option under **Entity Automation** to run an automation on Entities in the Insight.
      <br/><img src={useBaseUrl('img/cse/automations-insight-actions-menu.png')} alt="Actions menu on an Insight" width="300"/> 
   * Entities:
      1. Click **Automations** under the Entity's name. 
      1. Select an option under **Entity Automation**. 
      <br/><img src={useBaseUrl('img/cse/automations-entity-automations-menu.png')} alt="Automations menu on an Entity" width="250"/> 
 
#### Step 5: View enrichments
When automations run, they can provide enrichments to Insights, Entities, and Signals. 
1. Open an Insight, Entity, or Signal with enrichments provided by an automation. 
1. Click **Enrichments** at the top of the screen.
1. If [threat indicators are set by the enrichment](#enrichments-and-threat-indicators), they are displayed. The following example shows a **Malicious** threat indicator.<br/><img src={useBaseUrl('img/cse/automations-malicious-threat-indicator.png')} alt="Threat indicator example" width="800"/> 

## Automations

Automations run playbooks to add enrichments and create notifications for either Insights or Entities. You can set automations to run automatically when Insights are created or closed, or you can run them manually.

### View automations
1. Click the **Configuration** button (gear icon) at the top of the UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. View the list of available automations. (If no automations display, you must first [create an automation](#create-an-automation)).<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/> 

To view the automations that have run on Insights or Entities, see [View results of an automation](#step-4-view-results-of-an-automation).

### Create an automation
1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. At the top of the automations screen, click **New Automation**.  (To modify an existing automation, click on the edit icon for the corresponding automation.)<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/>
1. In the **New Automation** dialog, select a **Playbook** from the drop-down list. The playbook must be defined, and its type must be set to **CSE** before associating it with an automation. (You can set the type as **CSE** when you [create a new playbook](#create-a-new-playbook).)<br/><img src={useBaseUrl('img/cse/automations-new.png')} alt="New Automation" width="400"/>
1. Select whether the playbook will run on an **Entity** or **Insight**. This defines what data payload will be sent to the playbook from Cloud SIEM. 
1. If **Entity** is selected, in the **Type** field select one or more Entity types. The playbook will only execute on the Entity types selected. 
1. Select one or more **Executes when** Insight triggers: **Insight Created**, **Insight Closed**, or **Manually Done**. If **Manually Done** is not selected, the automation will not appear in any **Actions** menu on Insights or **Automations** menus on Entities.
1. Set the **Status**. Disabled automations will not run automatically and will not appear in any **Actions** or **Automations** menus.
1. Click **Add to List** (or **Update** if editing an existing automation).

### Run an automation automatically

If an automation is set to run when an Insight is created or closed, it runs automatically provided that:
* The automation is enabled, 
* The automation is configured to run on the trigger(s), and 
* The automation is an Insight automation, or
* The automation is an Entity automation, and the Insight contains one or more Entities of the Entity types configured in the automation (this includes the primary and any related Entities).

### Run an automation manually

#### Run an automation manually on Insights

Automations can be run manually from the **Actions** drop-down menu on [Insight details](/docs/cse/records-signals-entities-insights/about-cse-insight-ui#insight-details-page) pages:

<img src={useBaseUrl('img/cse/automations-actions-menu.png')} alt="Automations on the Actions menu" width="200"/>

You will see three sections in the **Actions** menu:
* **Insight Automation**. Displays a list of all enabled Insight automations configured to run manually.
* **Entity Automation**. Displays a **Run Automations** option. Click **Run Automations** to open a dialog enabling you to select one or more Entity automations to run (see below).
* **Insight Actions**.  Displays a list of all valid legacy Insight Actions.

#### Run an automation manually on Entities

On [Entity details](/docs/cse/records-signals-entities-insights/view-manage-entities#about-the-entities-details-page) pages, Entity Automations can be run manually from the **Automations** drop-down menu:

<img src={useBaseUrl('img/cse/automations-entity-automations-menu.png')} alt="Automations menu on an Entity" width="250"/> 

:::tip
You can run the same automation more than once for a given Entity or Insight, but not at the same time. Additional attempts to run an automation while an instance is running will result in an error.
:::

#### Select Entities to run the automation on

On an Insight, if you select **Actions** > **Entity Automation > Run Automations**, you will be prompted to select one or more of the Entities included in the Insight:

<img src={useBaseUrl('img/cse/automations-entity-menu.png')} alt="Entity Automation menu" width="400"/>

1. Select one or more of the Entities listed or select **Select All Entities**. The selected Entities don’t have to be the same type. 
1. Click **Next**. A list displays of all Entity automations that are enabled, configured to be run manually, and configured for at least one of the Entity types you selected on the previous screen. 
1. Select the automations you wish to run and click **Run Automation**. The automations will run. The system will automatically run the appropriate automations for the appropriate Entity Types.
<img src={useBaseUrl('img/cse/automations-entity-menu-2.png')} alt="Entity Automation menu with selections" width="400"/>

In this example:
   * The CarbonBlack automation is configured for IP Addresses, Email Addresses, and Domain Names, so it will run four times (once for the Email Address and once for each IP Address selected on the previous screen).
   * The nslookup automation is configured to only run on IP Addresses so it will run three times.
   * No automation will run on the Hostname.

### View an automation's status

After [running an automation](#step-4-view-results-of-an-automation), you can go to the **Automations** tab for the Insight or Entity to view the automation's  status.  

<img src={useBaseUrl('img/cse/automations-execution-status.png')} alt="Automations execution status" width="800"/>

On each card you will find:
* The time and date when the automation was run.
* The name and description of the associated playbook.
* The playbook’s current status.
* A link to **View Playbook** in the Automation Service UI.

:::note
You may have to manually refresh this screen to see the most current status.
:::

If you click **View Playbook**, the Automation Service UI will open to the playbook status page:

<img src={useBaseUrl('img/cse/automations-playbook-status.png')} alt="Playbook status" width="600"/>

You can switch to the graphical view by clicking **Graph** in the upper-right corner:

<img src={useBaseUrl('img/cse/automations-playbook-status-graph.png')} alt="Playbook status graph" width="600"/>

### Enrichments and threat indicators

You can view the results of enrichments in Cloud SIEM by navigating to the **Enrichments** tab (which will appear on the Entity, Signal, and Insight details pages if there are any enrichments to display):

<img src={useBaseUrl('img/cse/enrichments.png')} alt="Enrichments" width="800"/>

The enhancements include:
* Enrichments are grouped by Entity, not by enrichment source.
* Groups can be collapsed and expanded.
* The list can be filtered.
* Empty fields (fields with a null or empty value) can be optionally hidden.
* Links, if set by the enrichment, will be displayed and open in a new tab if clicked.
* Threat indicators, if set by the enrichment, will be displayed.

#### Threat indicators

Threat indicators, if set, will be displayed throughout the CSE UI either as a full label or as a colored icon depending on the location:

| Label | Description | Icon |
|:--|:--|:--|
| **Malicious** | ![indicator-malicious-label.png](/img/cse/indicator-malicious-label.png) | ![indicator-malicious-icon.png](/img/cse/indicator-malicious-icon.png) |
| **Suspicious** | ![indicator-suspicious-label.png](/img/cse/indicator-suspicious-label.png) | ![indicator-suspicious-icon.png](/img/cse/indicator-suspicious-icon.png) |
| **Not Flagged** | ![indicator-suspicious-label.png](/img/cse/indicator-notflagged-label.png) | None |

No icon is displayed for Entities that with the **Not Flagged** label.

:::note
**Not Flagged** is not the default value (which is no indicator at all). Cloud SIEM will not automatically determine the indicator value; enrichments must explicitly set it.
:::

#### New enrichment attributes

Support for three new optional attributes have been added to the enrichment schema:
* `expiresAt`. Defines when the enrichment should be auto-deleted from Cloud SIEM (by default, enrichments will never be auto-deleted).
* `externalUrl`. Defines a link that will be displayed with an enrichment (for example, to include a link to the VirusTotal details page for this Entity, put the link in this field).
* `reputation`. Associates a threat indicator with this enrichment data. The allowable values are `malicious`, `suspicious`, and `notflagged`. The default is not to display any reputation.


## Playbooks

A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type. Playbooks can allow your organization's teams to respond to an incident in a consistent, focused, and repeatable fashion.

Playbooks can be configured to execute
automatically without user intervention, acting on information from the
incident, or can be executed in interactive mode, where user input is
required to authorize predefined actions.

### View playbooks

1. Click the **Configuration** button (gear icon) at the top of the UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. From the **Automation** screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>
1. View the list of playbooks available to run in automations.<br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" width="800"/>
1. Select a playbook to see the elements in the workflow.<br/><img src={useBaseUrl('img/cse/automations-open-playbook.png')} alt="Opened playbook" width="800"/>
1. Click the elements in the playbook to see their details. For example, click actions (the boxes in the flow) to see the [integration](#integrations) resources that provide the actions.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} alt="Action example" width="600"/>

### Create a new playbook

1. Click the **Configuration** button (gear icon) at the top of the CSE UI.
1. Under **Integrations**, select **Automation**..<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. Click **Manage Playbooks**. Previous-created playbooks will display. <br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>
1. Click the **+** button to the left of **Playbook**.<br/><img src={useBaseUrl('img/cse/automations-new-playbook-button.png')} alt="New playbook button" width="500"/>
1. A new configuration box will be displayed. Name your new playbook.<br/><img src={useBaseUrl('img/cse/automations-new-playbook-dialog.png')} alt="New playbook dialog" width="400"/>
1. Select the incident **Type** as **CSE** to run the playbook from an automation. (For playbooks run from inside another playbook, you can select another incident type to associate with it, for example, **Denial of Service**, **Malware**, **Phishing**, etc.)
1. Click **Save**. The new playbook appears in the list of available playbooks.
1. To configure the new playbook, select
it from the list and click the **Edit** button at the bottom of the
screen.<br/><img src={useBaseUrl('img/cse/automations-new-empty-playbook.png')} alt="New playbook" width="600"/><br/>Opening the playbook will present a black screen with a **Start** node and an **End** node. These nodes dictate the beginning and the end of the playbook's automation sequence. They can be dragged and dropped anywhere on the screen to allow for multiple integrations and conditional statements to be executed.
1. To add the first node in the playbook, click the **+** on the **Start** node. The **Add node** page is displayed.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} alt="Add node" width="400"/><br/>Choose from the following options:
   * [**Action**](#add-an-action-node-to-a-playbook): Automatically take specific actions such as enriching data or taking containment steps.
   * [**Condition**](#add-a-condition-node-to-a-playbook): Use conditional statements to define what actions should be taken in response to previous inputs.
   * [**Playbook**](#playbooks): Call other playbooks in response to conditional
 statements.

### Add an action node to a playbook

An action node in a playbook runs an enrichment or notification operation. String actions together in the playbook to perform a workflow. 

1. Either [create a new playbook](#create-a-new-playbook) as described above, or edit an existing playbook.
1. Click the **+** on the **Start** node.<br/><img src={useBaseUrl('img/cse/automations-start-node.png')} alt="Start node" width="100"/><br/>
1. The **Add node** page displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} alt="Add node" width="400"/><br/>   
1. Select **Action**. The action node configuration screen displays.<br/><img src={useBaseUrl('img/cse/automations-add-action-node-1.png')} alt="Add action node" width="600"/>  
1. Give the node a **Name** that identifies the action being taken.
1. Select the **Type** of action as **Enrichment** or **Notification**. 
1. Select the **Action** from the drop-down list. The dialog updates to show the integration resource that the action originates from, along with additional fields you must fill out to configure how you would like the action to be performed.<br/><img src={useBaseUrl('img/cse/automations-add-action-node.png')} alt="Configure action node" width="600"/> 
1. Fill out the fields with the specific information required by the action. For  more information about the action, you can [view the integration that provides the action](#step-3-view-the-integration-that-provides-the-action).
1. Once you have entered all the information requested, click **Create**. The action node is added to the playbook.
1. Repeat the steps to add other action nodes. 
1. [Add condition nodes](#add-a-condition-node-to-a-playbook) if desired. 
1. When you are done configuring your playbook, click **Save** at the bottom of the window.<br/><img src={useBaseUrl('img/cse/automations-save-playbook-button.png')} alt="Save the playbook" width="250"/> 
1. When you are ready to allow the playbook to be used in automations, click the **Publish** button at the bottom of the playbook window.<br/><img src={useBaseUrl('img/cse/automations-publish-playbook.png')} alt="Publish the playbook" width="250"/> 

### Add a condition node to a playbook

Define a conditional statement to be met before the next node can be executed.

1. Either [create a new playbook](#create-a-new-playbook) as described above, or edit an existing playbook.
1. Click the **+** on the **Start** node.<br/><img src={useBaseUrl('img/cse/automations-start-node.png')} alt="Start node" width="100"/><br/>
1. The **Add node** dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} alt="Add node" width="400"/><br/>   
1. Select **Condition**. The condition node configuration dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-condition-node.png')} alt="Add condition node" width="500"/>
1. Click **Create**. The empty condition appears on the playbook.
1. Draw a line from a previous action node to the new condition node. This is required to allow the condition to evaluate the output values from the previous action.
1. Now that you've linked the condition to an action, hover the mouse over the condition node and click the edit button on the node to configure the condition settings.<br/><img src={useBaseUrl('img/cse/automations-edit-condition-node.png')} alt="Edit a condition node" width="150"/> 
1. The condition node configuration dialog displays again. Under **Condition1**, click **Select a value**.<br/><img src={useBaseUrl('img/cse/automations-add-a-condition-3.png')} alt="Select values for the condition" width="500"/> 
1. Click **Get Value** and select from the drop-down menu whether the value will evaluate to **true (bool)**, **false (bool)**, or **empty**.<br/><img src={useBaseUrl('img/cse/automations-add-condition-node-2.png')} alt="Get values for the condition" width="500"/>
1. Under **Get value from a previous action**, select the value to feed into the condition. The example shows **Get Devices** and **Playbook inputs** that came from the previous action. (The condition must be linked by a line to the previous action node to receive outputs from the action.) Click the options from the previous action and select which output type (for example, hashes, IP addresses, domains) to evaluate and add it to the condition.
1. The selected output type will be displayed under **Condition 1**. Select which condition you would like for the output results to meet from the inequality operators below and click **Select a value** to define the condition.
1. Now that **Condition 1** is defined, you can choose to filter your
results further by selecting an **AND/OR** operator to define another
condition.
1. Click **Update**.
1. When you create a new condition, you need to define what happens
when their results meet one of your criteria. Draw lines to nodes to define the flow for success, failure, or other condition options.

## Integrations

Integrations are connectors to applications from industry-leading network and security vendors. Playbooks run actions provided by resources in integrations.      

:::info
Before you can use actions from an integration resource, you must [authorize the integration](#authorize-integrations) to work with the Automation Service.
:::

### View integrations

1. Click the **Configuration** button (gear icon) at the top of the UI.
1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. From the **Automation** screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>
1. Click **Integrations** in the left navigation bar.<br/><img src={useBaseUrl('img/cse/automations-integrations-list.png')} alt="Integrations list" width="800"/>
1. Select an integration to see the actions on the resource. You call these actions when you [add an action node to a playbook](#add-an-action-node-to-a-playbook).<br/><img src={useBaseUrl('img/cse/automations-integrations-actions-list.png')} alt="Actions on an integration" width="800"/>

:::tip
To add a new resource to an integration, click the **+** button to the left of **Resources**. This is useful if you have another instance of the vendor application you want to connect to.
:::

### Certified integrations

Certified integrations are those that are provided by Sumo Logic. Certified integrations are designated by a **Certified Integration** check mark.<br/><img src={useBaseUrl('img/cse/automations-integration-certified.png')} alt="Certified integration" width="300"/>

After you select the integration resource and click the **View Code** button, the certified integration code is set to read-only mode. The certified integrations code can’t be edited using the Cloud SIEM internal IDE. This is also true for the actions available for that integration.<br/><img src={useBaseUrl('img/cse/automations-integration-certified-2.png')} alt="Certified integration message in resource code" width="400"/>

Certified actions are designated by a **Certified Action** check mark.<br/><img src={useBaseUrl('img/cse/automations-integration-certified-action.png')} alt="Certified action" width="300"/>

You can add resources to the certified integration by clicking the **+** button, or you use it as-is.<br/><img src={useBaseUrl('img/cse/automations-add-resource.png')} alt="Add a resource" width="400"/> 

### Duplicate an integration

To modify an integration's code, you must first duplicate the integration and make your modifications in the duplicated version. When you click the **Duplicate integration** button, a new integration will be created in the integrations list with an incremented name. <br/><img src={useBaseUrl('img/cse/automations-integration-duplicate.png')} alt="Duplicate certified integration" width="400"/>

Following is a duplicated integration:<br/><img src={useBaseUrl('img/cse/automations-integration-duplicated.png')} alt="Duplicated integration" width="250"/>

If the certified integration resource was configured before the duplication process, all the settings will be saved and replicated inside the duplicated integration. There is no need to reset the duplicated integration.

Note that in the following example a **(2)** follows the duplicated integration's name, as well as the resource name. A **(3)** would follow the name of the next duplicate, **(4)** the next, and so on. Also note that the actions listed in the integration do not have the **Certified Actions** check mark, because they exist on a duplicated integration.<br/><img src={useBaseUrl('img/cse/automations-integration-duplicated-resources-actions.png')} alt="No changes to duplicated resource actions" width="600"/>

 If you choose a duplicated resource when you [add an acton node to a playbook](#add-an-action-node-to-a-playbook), the actions available will be the ones belonging to the duplicated resource. The following example shows selecting an action from a duplicated resource.<br/><img src={useBaseUrl('img/cse/automations-integration-add-comment-to-issue.png')} alt="Add comment to issue" width="600"/>

### Integrations framework

The Cloud SOAR Integration Framework allows users to develop and extend integrations using a common, open, and easy-to-use framework. For increased security and isolation, each integration is executed in its own Docker container, which can be easily customized when the integration is created.

Integrations are defined using two types of YAML text files. The first type, the integration definition file, is used to define the properties of the product with which the integration connects. This includes information such as the name, logo, connection parameters, test code and the Docker container used to execute the actions. One integration definition file is required for each integration and serves as a container for all of the actions that the integration will perform.

The second type of file is an action definition file, which is used to define a single action that will be performed using the integration. Each integration action is defined in a separate action definition file, which will be associated with the appropriate integration definition. Action definition files are the files which contain the actual code which will be executed to perform the action. Supported languages include Perl, Python, PowerShell and Bash. In addition to the action code, action definition files also contain information such as
the name, required and optional fields and the format in which the resulting information will be displayed.

:::tip
For more details on utilizing the integration framework within Cloud SOAR, click the **?** button in the upper right corner of the Cloud SOAR UI to see the Integration Framework manual.
:::

<img src={useBaseUrl('img/cse/automations-integrations-framework.png')} alt="Integrations framework" width="800"/>

### Integration file hierarchy

Defining integrations at the action level allows you greater flexibility in customizing existing integrations and sharing new actions
with other users. For example, you may choose to extend Sumo Logic's existing RSA Netwitness integration to include an additional action which retrieves all network connections for a given host.

Once you have created this new action, it can easily be added to the existing RSA Netwitness integration by uploading the new integration action file. This new action can also be shared between customers and used to extend the functionality of the integration in other customer instances as well.

<img src={useBaseUrl('img/cse/automations-integrations-file-hierarchy.png')} alt="Integrations file hierarchy" width="800"/>



### Available integrations

The following integrations are available for the Automation Service, but only some are automatically installed in customer environments. If you would like an integration listed below added to your environment, or would like documentation for a specific integration, contact your Sumo Logic account representative.

<details><summary>Integrations</summary>

* Abnormal Security
* Abuse.ch SSLBL Feed
* AbuseIPDB
* Acronis
* Active Directory OIF
* Active Directory V2
* Airtable
* Akenza
* AlienVault OTX OIF
* AlienVault USM Anywhere
* AlienVault USM Central
* Alleantia
* alphaMountain
* Anomali ThreatStream
* ANY.RUN
* APIVoid
* Arbor
* Arcanna
* Arcsight ESM
* Arcsight Logger
* Atlassian Jira
* Atlassian Jira V2
* Automox
* AWS Athena
* AWS CloudFront
* AWS CloudTrail
* AWS CloudWatchLogs
* AWS EC2
* AWS GuardDuty
* AWS IAM
* AWS Inspector
* AWS Route53
* AWS S3
* AWS Security Hub
* AWS Simple Notification Service
* AWS SQS
* Azure AD
* Bitdefender GravityZone
* BitSight Security Performance Management
* Blueliv
* Blueliv Community
* Box
* CA Service Desk
* Censys
* Censys 2.0
* Certego
* Check Point OIF
* Check-Host
* Cherwell
* Chronicle
* CIRCL CVE Search
* Cisco AMP for Endpoints
* Cisco ASA
* Cisco Cyber Vision
* Cisco ESA
* Cisco Firepower
* Cisco IOS XE
* Cisco ISE
* Cisco Meraki
* Cisco Stealthwatch
* Cisco Talos
* Cisco Threat Grid OIF
* Cisco Threat Response
* Cisco Umbrella Investigate OIF
* Cisco Umbrella OIF
* Cisco Webex
* Claroty
* Cloudflare
* Cofense
* ConnectWise Manage
* Coralogix - Query Logs
* Coralogix - Send Logs
* Corelight
* Cortex XDR
* Cribl
* CrowdStrike Falcon
* CrowdStrike Falcon Discover
* CrowdStrike Falcon Sandbox
* CrowdStrike Falcon Intelligence
* Cuckoo OIF
* CyberArk AAM
* CyberArk PAM
* Cybereason
* Cybersecurity Help
* CyberTriage
* CylanceProtect
* DarkOwl
* Darktrace
* Devo
* Digital Shadows
* Domain Dossier
* DomainTools
* Downdetector
* Dropbox
* Duo
* Dynatrace
* EclecticIQ
* Elastic Security
* Elasticsearch
* Elasticsearch V2
* EnergyLogserver
* Ermes
* Exana Open DNS
* Exploit Database
* F5 AS3
* F5 AWAF
* Farsight Security DNSDB
* Fastah IP Geolocation
* Fidelis Elevate Network
* FireEye AX
* FireEye Central Management (CM)
* FireEye Email Security (EX)
* FireEye Endpoint Security (HX)
* FireEye Helix
* FireEye Network Security (NX)
* FireEye Threat Intelligence (iSight)
* FireHydrant
* Firewall Tools
* Flowmon
* Forcepoint NGFW
* Forcepoint Web Security
* Forescout eyeSight
* FortiAnalyzer
* FortiGate
* FortiMail
* FortiProxy
* FortiSandbox
* FortiSIEM
* FortiWeb
* FortiWeb V2
* FreshDesk
* Freshservice
* GITLAB
* Gmail
* Gmail Multiple Mailbox
* GoAnywhere
* Google Chat
* Google Safe Browsing
* GreyNoise
* Hacker Target OIF
* Hatching Triage
* Have I been pwned
* HCL BigFix
* HP Universal CMDB
* HTTP Tools
* HudsonRock Cavalier
* Hybrid Analysis
* IBM DB2
* IBM Maximo
* IBM MSS Tickets
* IBM QRadar OIF
* IBM X-Force Exchange OIF
* Imperva Incapsula
* Imperva SecureSphere
* Imperva WAF
* Intel 471
* Intelligence X
* Intezer
* Intsights TIP
* IP Quality Score
* IP-API
* IPinfo
* Ipstack
* Jamf
* Jamf Protect
* Javelin AD Protect
* Joe Sandbox
* Kali Linux
* Kaspersky CyberTrace
* Kaspersky Sandbox
* Kaspersky TIP
* Kela Darkbeast
* Kela RaDark
* KnowBe4 KMSAT - Reporting
* KnowBe4 KMSAT - User Events
* Lacework
* Lansweeper
* Lastline Analyst
* Libraesva Email Security V4
* Libraesva Email Security V5
* LogPoint OIF
* LogRhythm
* Malware Bazaar
* Malwarebytes Nebula
* Manage Engine Desktop Central
* Material Security
* Mattermost
* MaxMind OIF
* McAfee ATD OIF
* McAfee ePO OIF
* McAfee ESM
* McAfee MVISION
* McAfee Network Security Platform Manager (NSM)
* McAfee Web Gateway OIF
* Micro Focus Service Management
* Microsoft 365 Defender
* Microsoft Azure Security Center
* Microsoft Defender ATP
* Microsoft EWS
* Microsoft EWS Extension
* Microsoft Graph Security
* Microsoft OneDrive
* Microsoft Sentinel
* Microsoft Sharepoint
* Microsoft Teams
* Mimecast
* MISP OIF
* Mitre Matrix
* MSSQL
* MxToolbox
* MYSQL
* Netskope
* Netskope V2
* Neurons ITSM
* Neustar IP GeoPoint
* Nmap
* Nozomi Networks
* Nucleon Cyber
* Okta
* oneLogin
* OpenLDAP
* OpenText EnCase Endpoint Security
* Opswat Metadefender
* Oracle DB
* PagerDuty
* Palo Alto AutoFocus
* Palo Alto Networks NGFW OIF
* Palo Alto Networks Panorama V2
* Palo Alto Networks WildFire OIF
* Panda EDR
* Passive Total
* PhishLabs DRP
* PhishLabs EIR - Incident Data
* PhishLabs EIR - IOC Feed
* PhishTank
* POP3
* PowerShell Tools
* Proofpoint TAP
* ProtectOnce
* Pulse Secure
* Pulsedive
* Qualys
* Qualys EDR
* Qualys WAS
* Rapid 7 InsightVM
* Rapid7 InsightIDR
* Rapid7 InsightIDR V2
* Rapid7 Nexpose
* RapidAPI
* Recorded Future OIF
* RSA NetWitness
* RSA NetWitness Logs
* SailPoint
* Salesforce
* Screenshot Machine OIF
* Security Scorecard
* SecurityTrails
* Securonix
* Securonix V2
* SentinelOne
* ServiceNow OIF
* SFTP Tools
* Shodan
* Skype
* Slack
* Snort
* Snowflake
* SOCRadar
* SolarWinds Orion
* SonicWall
* Sophos Central
* Sophos Central 3.0
* SpiderFoot HX
* Splunk OIF
* Stellar Cyber Starlight
* Stormshield
* Sumo Logic CIP
* Sumo Logic CSE
* Symantec DeepSight
* Symantec EDR
* Symantec Endpoint Protection
* Symantec Endpoint Protection Cloud
* Symantec Secure Web Gateway (Bluecoat)
* Symantec SWS
* Symantec WebPulse
* Syslog-NG
* Telegram
* Telegram V2
* Tenable.io
* Tenable.sc
* Terraform
* TheHive
* Threat Crowd
* ThreatConnect OIF
* ThreatMiner
* ThreatQ
* Trend Micro APEX ONE
* Trend Micro Deep Security
* Trend Micro Vision ONE
* Twilio
* URLhaus Abuse
* URLScan.io
* Vectra
* VirusTotal OIF
* VMRay
* VMware Carbon Black App Control
* VMware Carbon Black Cloud Endpoint Standard
* VMware Carbon Black Cloud Endpoint Standard V2
* VMware Carbon Black Cloud Enterprise EDR
* VMware Carbon Black Cloud Platform
* VMware Carbon Black EDR
* VMWare vSphere
* VMware Workspace ONE
* WhoisXML
* WithSecure Elements
* WithSecure Endpoint Protection
* Wittra
* Zendesk
* ZeroFOX
* Zoom
* Zscaler

</details>


## Bridge

You can only run custom actions or integrations in an "on-premise" environment. For on-premise environments, you need to install a bridge as described below.

<!-- github-comment
Write. The content below was copied from the doc accessed from the ? menu option.
-->

### Requirements 

#### Hardware requirements

* OS: 
   * Ubuntu (18.04/20.04)
   * CentOS 7
   * RedHat 8
* RAM: 8GB
* CPU: 4 Core
* DISK: 160GB
* Network card: 1

#### Network requirements

Bridge Appliance has to be able to resolve DNS hostnames and needs to reach the below destinations

| DESTINATION | PROTOCOL | PORT |
| :-- | :-- | :-- |
| sumo-logic-api-url | TCP| 443| 
| siem-cloud-url | 	TCP| 	443| 
| 926226587429.dkr.ecr.us-west-2.amazonaws.com| 	TCP| 	443| 
| index.docker.io* | 	TCP| 	443| 
| registry-1.docker.io* | 	TCP| 	443| 
| auth.docker.io* | 	TCP| 	443| 
| production.cloudflare.docker.com* | 	TCP| 	443| 
| long-endpoint1-events.sumologic.net | 	TCP| 	443| 

\* Needed only to connect to docker hub.

### Install Docker

1. Install Docker-CE following the [installation instructions in Docker Docs](https://docs.docker.com/engine/install/). Install at least version 20.10 (do not use nightly build).
1. As soon as the docker daemon is installed, start it with: 
   ```
   systemctl start docker
   ```
1. Enable it on boot: 
   ```
   systemctl enable docker
   ```
1. If docker has to use a proxy to pull images, follow the below instructions:
   ```
   mkdir -p /etc/systemd/system/docker.service.d
   ```
1. Create a file named `/etc/systemd/system/docker.service.d/http-proxy.conf`, and add:
   ```
   [Service]
   Environment="HTTP_PROXY=http://proxy.example.com:8080\" 
   Environment="HTTPS_PROXY=http://proxy.example.com:8080\"
   ```
1. Reload the systemd daemon with:
   ```
   systemctl daemon-reload
   ```
1. And restart docker service with:
   ```
   systemctl restart docker
   ```

### Get installation token

Login to Sumo Logic and create a new [installation token](/docs/manage/security/installation-tokens/) with name prefix `csoar-bridge-token`.

<img src={useBaseUrl('img/cse/automations-bridge-installation-token.png')} alt="Installation token" width="800"/>

### Automation bridge installation

#### Ubuntu

1. Download the `automation-bridge-X.X.deb` and copy it on the bridge virtual machine.
1. To install the package run from ssh:
   ```
   sudo dpkg -i automation-bridge-X.X.deb
   ```

#### CentOS/RedHat

1. Download the `automation-bridge-X.X.rpm` and copy it on the bridge virtual machine.
1. To install the package run from ssh:
   ```
   sudo yum install automation-bridge-X.X.rpm
   ```
1. Edit the file `/opt/automation-bridge/etc/user-configuration.conf` and set the below mandatory parameters:
   * `1SOAR_URL1`
   * `1SOAR_TOKEN1`
1. To determine which is the correct SOAR_URL, see [Sumo Logic Endpoints by Deployment and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) and get the URL under the **API Endpoint** column. For example: `https://api.eu.sumologic.com/api/`

And you can set this optional parameter: `ALIAS`

An example of a configuration file would be:
```
{
"SOAR_URL": "https://
"SOAR_TOKEN": "
"SIEM_URL":"https://
"ALIAS": "
}
```

#### Bridge ALIAS

With bridge ALIAS it is possible to distinguish which integration resources will be executed with this automation bridge. When a new integration resource is created or edited it is possible to select the default ALIAS or to create a new one. So every automatic action configured to use this resource will be performed with the Bridge that has the same ALIAS.

<img src={useBaseUrl('img/cse/automations-bridge-alias-create.png')} alt="Create ALIAS bridge" width="400"/>

<img src={useBaseUrl('img/cse/automations-bridge-alias-default.png')} alt="Use default ALIAS bridge" width="400"/>

#### Automation bridge update

For Ubuntu and CentOS/RedHat, the update process works as the installation process. Follow the same steps described in [Automation bridge installation](#automation-bridge-installation) above.

:::note
If you are not using the SIEM:
1. Set `SIEM_URL` to `NONE`.
1. Restart the service with:
   ```
   systemctl restart automation-bridge
   ```
1. If you need to allow automation-bridge communication through a proxy, edit the file `/etc/opt/automation-bridge/automation-bridge.conf` and set the correct value. Below is an example:
   ```
   HTTP_PROXY="http://proxy.example.com:8080\"
   HTTPS_PROXY="http://proxy.example.com:8080\"
   ```
1. Restart the service with:
   ```
   systemctl restart automation-bridge
   ```
:::

#### Post-installation checks

To check if the bridge is running correctly run the following command:
```
ps faux |grep automation-bridge
```

This is an example of running `automation-bridge`:<br/><img src={useBaseUrl('img/cse/automations-bridge-example-output.png')} alt="Example of running automation-bridge" width="800"/>

On the SOAR instance, the Automation Bridge Monitoring panel under **Settings > Audit and information > License information** shows a list of live bridge agents:<br/><img src={useBaseUrl('img/cse/automations-bridge-monitoring-panel.png')} alt="Automation Bridge Monitoring panel" width="600"/>

---
id: automation-service
title: Automation Service
sidebar_label: Automation Service
description: Use the Automation Service to automate smart actions including enrichments and notifications. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes the Automation Service for Cloud SIEM Enterprise (CSE).

:::info Limited availability
The Automation Service is available on a limited availability (LA) basis. If you would the Automation Service enabled in your Cloud SIEM Enterprise environment, contact your Sumo Logic account representative.
:::

## About the Automation Service

The Automation Service for Cloud SIEM Enterprise (CSE) uses Sumo Logic [Cloud SOAR automation](/docs/cloud-soar/automation/) capabilities to allow you to define and automate smart actions including enrichments and notifications. These actions can be automatically triggered when certain events occur in CSE, helping you to quickly investigate, understand, and react to potential security threats.

You can interact with the service through [automations](#automations), which execute playbooks. [Playbooks](#playbooks)  are composed of one or more [actions](#actions) with a workflow that could include parallel actions and logic steps. Actions are included with [integrations](#integrations). Sumo Logic provides a number of integrations, actions, and playbooks with the service that you can customize. You can also create your own.

:::note Limited availability
Playbooks, integrations, and actions in this version that may differ from those in [Cloud SOAR automation](/docs/cloud-soar/automation/):
* Playbooks type must be **CSE**.
* The Automation Service only supports automated enrichment, notification, and custom action types at this time. 
* Actions can run "on-premise" via a [bridge](#bridge) or can run directly through the Sumo Logic cloud. For security and performance reasons, only certified integrations and actions can run directly through the cloud; custom actions must run "on-premise".
* Cloud SOAR automation [App Central](/docs/cloud-soar/automation/#app-central), where you can browse the full integration and playbook catalog, is not yet connected to the Automation Service. A selection of popular integrations have been added to your environment automatically, but the full list of available integrations is included in [Available integrations](#available-integrations) below. Contact your Sumo Logic account representative if you would like to have one of these integrations added to your environment, if you would like documentation for a specific integration, or if you're interested in an integration that's not listed.
:::

### Benefits

* The Automation Service supports enrichment, notification, and custom actions:
  * Enrichment actions can be used to gather additional information about an Entity or Insight, including [threat indicators](#threat-indicators).
  * Notification actions can be used to send notifications or update status in systems like CSE, CIP, Slack, Microsoft Teams, Jira, email, and so on.
* Automations can be triggered automatically when an Insight is created or closed. Automations can also be executed manually via the CSE UI and API.
* Playbooks can contain both Enrichment and Notification Actions. Playbooks can also be nested. So, for example, you could define a playbook that is executed automatically when an Insight is created that gathers enrichment data. And if the data returned includes a malicious threat indicator:
  1. Changes the Insight state to “In Progress”.
  1. Assigns the Insight.
  1. Sends a (customized) email with information about the Insight and indicator.
  1. Creates a Slack channel for the Insight.
  1. Invites certain people to the Slack channel.

:::note
* The Automation Service is intended to replace the legacy [Insight Actions](/docs/cse/administration/create-cse-actions#insight-actions) and the [Enrichment Service](/docs/cse/integrations/insight-enrichment-server/). All of the actions and integrations provided with those capabilities are included in the Automation Service (though some may require “on-premise” deployment through the [bridge](#bridge)). Those capabilities will be deprecated later in 2023.
* The Automation Service is enabled to allow customers to execute up to 10,000 actions per day. 
:::

### Prerequisites

#### Configure role capabilities

After the Automation Service is enabled for your organization, access to the Automation Service is controlled by [roles capabilities](docs/manage/users-roles/roles/role-capabilities/) in the Sumo Logic platform. To get access to the Automation Service:
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
1. Follow the directions in [Tour the Automation Service](#tour-the-automation-service) to verify that you can see **Automation** in the **Configuration** menu.

:::note
To interact with most of the Automation Service features, you must have at least View Automations, View Cloud SOAR, and Access Playbooks permissions.
:::

#### Authorize integrations

To use [integrations](#integrations), you must authorize their resources for use in the Automation Service.
1. Click the **Configuration** (gear icon) at the top of the UI.
1. Under **Integrations** select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. Click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/> 
1. Click **Integrations** in the left navigation bar.
1. Select the integration you want to authorize.
1. Hover over the resource and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/cse/automations-edit-resource.png')} alt="Edit a resource" width="800"/> 
1. Enter the authorization needed by the resource. What you enter is specific to the resource you're using. In this case, enter the the **API URL** and **API Key**. <br/><img src={useBaseUrl('img/cse/automations-edit-resource-2.png')} alt="Edit a resource" width="400"/> 


#### API and Terraform support

The [CSE API](/docs/cse/administration/cse-apis/) has been updated to support automations. The new endpoints include:
* `GET /automations`. Get the list of automations
* `POST /automations`. Create an automation
* `POST /automations/execute`. Run one or more automations against one or more Entities/Insights
* `DELETE /automations/{id}`. Delete an automation
* `GET /automations/{id}`. Get a specific automation
* `PUT /automations/{id}`. Update a specific automation

The Sumo Logic Terraform provider has also been updated. For more information, see the [Sumo Logic Terraform documentation](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs).

<!-- github-comment The beta article said: "The Automation Service API is documented in the [Cloud SOAR documentation](/docs/cloud-soar/)." No, the API is not documented in the Cloud SOAR documentation. - John Pipkin. April 15, 2023. -->


### Tour the Automation Service

In this section we'll show you how an automation runs a playbook, which in turns runs actions that are provided by integrations. 

#### Step 1: View an automation
[Automations](#automations) add enrichments and create notifications for either Insights or Entities. You can set automations to run automatically when Insights are created or closed, or you can run them manually.
1. Click the **Configuration** (gear icon) at the top of the UI.
1. Under **Integrations** select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/>
1. View the list of available automations. (If no automations display, you must first [create an automation](#create-an-automation) by clicking **New Automation**.)<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/>
1. To see the playbook an automation runs, click the **Edit** button.<br/><img src={useBaseUrl('img/cse/automations-edit-button.png')} alt="Automation edit button" width="800"/>
1. The playbook is shown.<br/><img src={useBaseUrl('img/cse/automations-edit-dialog.png')} alt="Automation edit dialog" width="400"/>

#### Step 2: View the playbook for the automation
A [playbook](#playbooks) contains a series of actions that are performed when an automation runs.
1. From the **Automation** screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>
1. View the list of playbooks available to run in automations.<br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" width="800"/>
1. Open the playbook for the automation you viewed in [Step 1](#step-1-view-an-automation).<br/><img src={useBaseUrl('img/cse/automations-open-playbook.png')} alt="Opened playbook" width="800"/>
1. Note the actions in the playbook. [Actions](#actions) are the boxes in the flow, and are the operations performed in a playbook. Click an action to view the integration resource that provides it.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} alt="Action example" width="600"/>

#### Step 3: View the integration that provides the action
Playbooks run actions provided by resources in [integrations](#integrations). 
1. Click **Integrations** in the left navigation bar.<br/><img src={useBaseUrl('img/cse/automations-integrations-list.png')} alt="Integrations list" width="800"/>
1. Select the integration that provides the action you viewed in [Step 2](#step-2-view-the-playbook-for-the-automation). The action is shown in the list of actions on the resource.<br/><img src={useBaseUrl('img/cse/automations-resource-example.png')} alt="Resource example" width="600"/>

#### Step 4: View results of an automation

You've now seen how an automation runs a playbook, which in turns runs actions that are provided by integrations. Let's now see what happens after automations run.

When automations run, the results display on Insights and Entities.
1. Open an Insight or Entity.
1. Click **Automations** at the top of the screen. The example below shows automations that ran on an Insight. Each automation shows its result under **Status**. You can click **View Playbook** to see the playbook that the automation ran.<br/><img src={useBaseUrl('img/cse/automations-on-insight.png')} alt="Automations on an Insight" width="800"/>
1. While viewing an Insight or Entity, you can run automations manually:
   * Insights:
      1. Click **Actions** under the Insight's name. 
      1. Select an option under **Insight Automation** to run an automation on the Insight.
      1. Select an option under **Entity Automation** to run an automation on Entities on the Insight.
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

### Create an automation
1. Click the gear icon at the top of the CSE UI and choose **Automation** under **Integrations**. 
1. Click **New Automation**.  (To modify an existing automation, click on the edit icon for the corresponding automation.)
<br/><img src={useBaseUrl('img/cse/automations-new.png')} alt="New Automation" width="560"/>
1. Select a **Playbook** from the drop-down list. The Playbook must be defined and its type must be set to **CSE** before associating it with an automation.
1. Select whether the Playbook will run on an **Entity** or **Insight**. This defines what data payload will be sent to the Playbook from CSE. (It does not impact the trigger selection.) If **Entity** is selected, select one or more Entity Types. The Playbook will only execute on the Entity Types selected. 
1. Select one or more **Execute when** Insight triggers: **Insight Created**, **Insight Closed**, or **Manually Done**. If **Manually Done** is not selected, the automation will not appear in any **Actions** or **Automations** menus.
1. Set the **Status**. Disabled automations will not run automatically and will not appear in any **Actions** or **Automations** menus.
1. Click **Add to List** (or **Update** if editing an existing automation).

### Run an automation

##### Automatically
If an automation is set to run when an Insight is created or closed, it runs automatically provided that:
* The automation is enabled, 
* The automation is configured to run on the trigger(s), and 
* The automation is an Insight automation, or
* The automation is an Entity automation, and the Insight contains one or more Entities of the Entity types configured in the automation (this includes the primary and any related Entities).

##### Manually
Automations can be run manually from the **Actions** drop-down on [Insight details](/docs/cse/records-signals-entities-insights/about-cse-insight-ui#insight-details-page) pages. (On [Entity details](/docs/cse/records-signals-entities-insights/view-manage-entities#about-the-entities-details-page) pages, Entity Automations can also be run manually from the **Automations** drop-down).

<img src={useBaseUrl('img/cse/automations-actions-menu.png')} alt="Automations on the Actions menu" width="230"/>

You will see three sections in the Action menu:
* **Insight Automation**. Displays a list of all enabled Insight automations configured to run manually.
* **Entity Automation**. Displays a **Run Automations** option. Click **Run Automations** to open a dialog enabling you to select one or more Entity automations to run (see below).
* **Insight Actions**.  Displays a list of all valid legacy Insight Actions.

:::tip
You can run the same automation more than once for a given Entity or Insight, but not at the same time. Additional attempts to run an automation while an instance is running will result in an error.
:::

If you select **Entity Automation > Run Automations** you will be prompted to select one or more of the Entities included in the Insight:

<img src={useBaseUrl('img/cse/automations-entity-menu.png')} alt="Entity Automation menu" width="600"/>

1. Select one or more of the Entities listed or select **Select All Entities**. The selected Entities don’t have to be the same type. 
1. Click **Next**. A list displays of all Entity automations that are enabled, configured to be run manually, and configured for at least one of the Entity Types you selected on the previous screen. 
1. Select the automations you wish to run and click **Run Automation**. The automations will run. The system will automatically run the appropriate automations for the appropriate Entity Types.
<img src={useBaseUrl('img/cse/automations-entity-menu-2.png')} alt="Entity Automation menu with selections" width="600"/>
  
In this example:
* The CarbonBlack automation is configured for IP Addresses, Email Addresses, and Domain Names, so it will run four times (once for the Email Address and once for each IP Address selected on the previous screen).
* The nslookup automation is configured to only run on IP Addresses so it will run three times.
* No automation will run on the Hostname.

### View automation status

After running an automation, you can go to the **Automations** tab to view its status.  

<img src={useBaseUrl('img/cse/automations-execution-status.png')} alt="Automations execution status" width="800"/>

The list of automations is organized by Insight and Entity, and each section can be collapsed and expanded. On each card you will find:
* The time and date when the automation was run.
* The name and description of the associated Playbook.
* The Playbook’s current status.
* A link to **View Playbook** in the Automation Service UI.

:::note
During the Beta, you may have to manually refresh this screen to see the most current Status.
:::

If you click **View Playbook**, the Automation Service UI will open to the Playbook Status page:

<img src={useBaseUrl('img/cse/automations-playbook-status.png')} alt="Playbook status" width="600"/>

You can switch to the graphical view by clicking **Graph** in the upper-right corner:

<img src={useBaseUrl('img/cse/automations-playbook-status-graph.png')} alt="Playbook status graph" width="600"/>

For more information about the Playbook Status page and understanding how to interact with the Playbook graph, see [Cloud SOAR Automation](/docs/cloud-soar/automation/).

### Enrichments and threat indicators

You can view the results of enrichments in CSE by navigating to the newly-redesigned **Enrichments** tab (which will appear on the Entity, Signal, and Insight details pages if there are any enrichments to display):

<img src={useBaseUrl('img/cse/enrichments.png')} alt="Enrichments" width="600"/>

The enhancements include:
* Enrichments are now grouped by Entity, not by enrichment source.
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

No icon is displayed for Entities that are Not Flagged.

:::note
**Not Flagged** is not the default value (which is no indicator at all). CSE will not automatically determine the indicator value; enrichments must explicitly set it (see Enrichment Attributes).
:::

#### New enrichment attributes

Support for three new optional attributes have been added to the enrichment schema:
* `expiresAt`. Defines when the enrichment should be auto-deleted from CSE (by default, enrichments will never be auto-deleted).
* `externalUrl`. Defines a link that will be displayed with an enrichment (for example, to include a link to the VirusTotal details page for this Entity, put the link in this field).
* `reputation`. Associates a threat indicator with this enrichment data. The allowable values are `malicious`, `suspicious`, and `notflagged`. The default is not to display any reputation.


## Playbooks

### About playbooks

A **Playbook** is a predefined set of actions or tasks to respond to a certain event or incident type. The creation and utilization of playbooks can allow an organization's teams to respond to an incident in a consistent, focused, and repeatable fashion.

Playbooks are automated workflows which can be configured to execute
automatically without user intervention, acting on information from the
incident, or can be executed in interactive mode, where user input is
required to authorize predefined actions.

To configure a new Playbook, click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) > **Automation**.

![Playbook](/img/cloud-soar/image71.png)

A list of any previously created Playbooks will be displayed on the
left-side of the page. Click **+** to add a new playbook.

A new configuration box will be displayed. Name your new playbook,
select the **Incident Type** to associated with it, and click save to continue. [Learn more](#custom-fields).

Once the new playbook has been saved, it will be displayed on the
left-side of the screen. To begin to configure the new playbook, select
it from the list and click the **Edit** button at the bottom of the
screen.

![Playbook List](/img/cloud-soar/image72.png)


Opening the playbook will present a black screen with a **Start** node, and
an **End** node. These nodes dictate the beginning and the end of the
playbook's automation sequence. They can be dragged and dropped anywhere
on the screen to allow for multiple integrations and conditional
statements to be executed.

To begin to add the first node within the new playbook, click the **+** on
the **Start** node.

![New Playbook](/img/cloud-soar/image73.png)

The playbook configuration page is displayed. It gives you the ability
to choose from the following options:
* **Action**: Automatically take specific actions such as enriching
 data or taking containment steps when an Incident Template is matched
* **Task**: Assign a task to an Cloud SOAR user
* **Condition**: Use conditional statements to define what actions
 should be taken in response to previous input/output feeds
* **User Choice**: Pause automatic processing to allow for manual
 intervention
* **Playbook**: Call other R3 Playbooks in response to conditional
 statements or user choice actions


### Actions

Select **Action** from the node types. A new screen will be displayed
showing all actions a user has to choose from. These action types
(Enrichment, Containment, Custom Actions, and Notifications) will
directly interact with Cloud SOAR's integrations to either gather data or
initiate actions automatically.

![Node Adding](/img/cloud-soar/image74.png)

![Node Adding](/img/cloud-soar/image75.png)


As an example, lets choose Enrichment from the action type screen. As
with any action type we choose, a new section will be added to our
configurations screen asking for more clarifying information on how we
would like this action to be performed.

Title the enrichment action something that can easily be identified by
the action that is being taken, such as **Domain Reputation Check**.
Next, we want to choose the action, expand the **Action** dropdown list
and review the available options.

![Node Creation](/img/cloud-soar/image76.png)


![Node Resource Adding](/img/cloud-soar/image77.png)


Expand the **Resource** dropdown list to
view all active Integration feeds. The feeds found in each action type
are those who can execute the specified action (i.e. blocking of an IP
address can be done through firewalls/WAFs, etc.). Once a resource is
assigned a new dropdown list will be displayed. Options found in this
list are comprised of **Incident Artifact** fields, which are the incident
fields Cloud SOAR parses out when issuing new incidents.

Continuing from the example above, an Enrichment action is being called
to gather Domain Reputation information from VirusTotal for the domain
observed in the Incident. Once all enrichment variables are identified,
click ****Create**** to continue.

The newly added node will now be visible in playbook configuration
screen. To add an additional node hover over the newly created
enrichment task. A menu bar will be displayed at the bottom of the node,
click **+** to add a new node, the pencil icon to edit the existing node,
or the trash can to delete the existing node.

![node menu](/img/cloud-soar/image78.png)


### Task

From the node selection menu, choose **Task**. A new configuration screen
will be displayed. Title the new task and add any description if
desired. The next dropdown lists are **Authorizer** and **Owner** fields.
The **Authorizer** field is the user who is assigning the task, and the
**Owner** field is the user who will be assigned the task to complete.
When the task has been developed, click **Create**.

![Task Node](/img/cloud-soar/image79.png)              


For playbook entities which support user-defined text input, such as email notifications, help desk ticket creation and task creation, variable placeholders may be added to the user defined text which will be replaced with incident variables at run
time. These variable placeholders may be added by clicking on the
![placeholder icon](/img/cloud-soar/image80.png) icon. To add a variable placeholder,
begin typing in the newly inserted placeholder box and Cloud SOAR will
display a list of available options which match. For example, typing
**incident**. will display a list of all the valid incident fields which
may be added as variable placeholders.

### Condition

From the node's menu, choose **Condition**. A new configuration screen
will be displayed which will enable a user to define a conditional
statement to be met before the next node type can be executed. Under
**Condition 1,** click on **Select a value** to define the first
condition.

![Condition Node](/img/cloud-soar/image81.png)

![Condition Node](/img/cloud-soar/image82.png)


When developing the first condition, users have multiple options to
choose from:

- **Insert a custom value**. Will execute when a user-defined variable is observed within an Incident.
- **Get value from an Incident field**. Will execute when a value is observed within an Incident Field (see [Incident Fields](#custom-fields)).
- **Get value from Triage Field**. Will execute when a value is observed within a Triage Field (see [Triage Fields](#triage-1)).
- **Get value from previous action**. Will execute when a value is observed from a previous input or output field.

From our earlier example, we are going to choose to evaluate the output
from our Domain Reputation check of the observed domain. Click **Output**
from **Get value from previous action**.

A list of available results or outputs from the previously selected
integration will be displayed in JSON format. Select which output type
(e.g., hashes, IP addresses, domains) to evaluate and add it to the
condition.

![Node Placeholder Function](/img/cloud-soar/image83.png)


The selected output type will be displayed under **Condition 1**. Select
which condition you would like for the output results to meet from the
inequality operators below and click **Select a value** to define the
condition.

![Condition Node Settings](/img/cloud-soar/image84.png)


The condition we want to meet for this example is "Advance this Incident
forward if the observed domain returns at least 1 result or **row** from
VirusTotal". We insert **0** into the custom value field and click **+** to
add it to the condition.

![Manual Value Adding](/img/cloud-soar/image85.png)


Now that **Condition 1** is defined*,* users can choose to filter their
results further by selecting an AND/OR operator to define another
condition.

![Condition Settings](/img/cloud-soar/image86.png)


Once the condition is defined, click **Create** to add it to the playbook.

When new conditions are created, we will need to define what happens
when their results meet one of our criteria. A new node is added to the
condition below. This node breaks the condition down into successes and
failures and can be modified by hovering over it and clicking **+**.

![Use of Condition](/img/cloud-soar/image87.png)


This new node represents a decision tree in which both results, success
or failure, will have to be defined. Follow the steps above to finalize
the condition

![Nodes List](/img/cloud-soar/image88.png)


### User Choice

From the node's menu, select **User Choice**. The User Choice option allows
for the system to pose a question to the incident owner. Based off of
the analysis the incident owner performs on the previous information
gathered, they will be presented a choice to take an automated action
such as blocking an IP at the firewall or Quarantining an end-user
workstation from the network.

![User Choice](/img/cloud-soar/image89.png)


![Placeholders](/img/cloud-soar/image90.png)


Define the question to be answered and the authorizer of the user choice selection and click ****Create**** to finalize.

The results of execution - successes, failures, and outcomes - are
visible the Playbook's individual node details. The results of
enrichment, containment and custom Playbook actions undertaken on
incident artifacts, e.g., IP addresses, URLs, domains, etc., are
catalogued in the incident's **Entities** module.

If a playbook fails, it can be re-executed inside the incident again or on the failing node with the Kill ![Kill option](/img/cloud-soar/image33c.png) and Run ![Run option](/img/cloud-soar/image33d.png) processes available in the playbook screen of the incident. However, a failed node will not stop the playbook from being executed. Only tasks and User Choices will lock the playbook in a **Running** state until the user takes action.

![status running](/img/cloud-soar/image33e.png)


![status completed](/img/cloud-soar/image33e1.png)


### Playbook Template

When a Playbook is assigned to an incident, these predefined actions and tasks can
be converted to actual tasks within Cloud SOAR for assignment to users and oversight by management. Each individual task can be assigned attributes, such as who it is assigned to, who has authorized the task, and when it is due. A **Playbook Template** permits administrators to predefine some of these attributes based on an existing Playbook so that they appear as defaults when the Playbook Template is utilized.

Playbooks are the core of Cloud SOAR's automation capabilities. Playbooks
permit administrators to create automated and semi-automated workflows
utilizing Cloud SOAR integrations, tasks and a variety of flow control
decisions and other actions.

**playbook** workflows can be configured to execute automatically without human intervention, or can be executed in an interactive mode, where user input is required to authorize predefined actions.


## Integrations

Cloud SOAR's orchestration and automation capabilities are achieved through its unidirectional and bidirectional integrations with the industry's leading network and security vendors. To configure, click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) > **Automation** > **Integrations**.

![integrations](/img/cloud-soar/image62.png)


A list of available integrations within the organization can be found to the left-side of the screen. To begin to configure, click on a product to continue.

![configure integration](/img/cloud-soar/image63.png)


A product overview screen will be displayed with what actions a product can perform and a link to configure the integration. These actions are categorized into five
separate types: **Enrichment, Containment, Custom, Daemon, and Notification** actions. Each selection will list its associated actions
and if there are required fields which need to be configured for Cloud SOAR to utilize its functionality within its Playbooks.

To add a new integration resource, click the **+ Resources** button in the
upper left-hand corner of the integrations screen. To edit an existing
integration resource, hover over the resource and click the pencil icon
to the far right of the resource name in the resource list.

![Resource Settings](/img/cloud-soar/image64.png)              


Each Integration's configuration screen
may be different, but in most cases, administrators will need
information such as IP addresses, API tokens, usernames and passwords
for their network/security products.

To test the configuration, click save and reopen the Integration. Once
the Integration is reopened, click test and successful connections will
display a success message at the bottom of the screen. Any unsuccessful
attempts will display an error message with information needed to
remediate the issue.

Additionally, some integration types also allow users to use a
pre-configured general proxy or define a specific one for its
integration with Cloud SOAR. To configure a proxy for an integration, open
the integration and click the Proxy dropdown. Select "Use different
proxy** and add the corresponding proxy information.

Once the information has been added, click save to commit the
integration. Open the integration up again and click the Test button to
test the new configuration settings. A successful connection attempt
will be displayed at the bottom right-side of the screen. Once the proxy
test is successful, click save again to commit the final configuration
settings for the integration.


### Integrations framework

Cloud SOAR's Integration Framework allows Sumo Logic and Cloud SOAR users to develop and extend integrations using a common, open and easy to use framework.
For increased security and isolation, each integration is executed in
its own Docker container, which can be easily customized by the user
when the integration is created.

Integrations are defined using two types of YAML text files. The first
type, the integration definition file, is used to define the properties
of the product with which the integration connects. This includes
information such as the name, logo, connection parameters, test code and
the Docker container used to execute the actions. One integration
definition file is required for each integration and serves as a
container for all of the actions that the integration will perform.

The second type of file is an action definition file, which is used to
define a single action that will be performed using the integration.
Each integration action is defined in a separate action definition file,
which will be associated by Cloud SOAR with the appropriate integration
definition. Action definition files are the files which contain the
actual code which will be executed to perform the action. Supported
languages include Perl, Python, PowerShell and Bash. In addition to the
action code, action definition files also contain information such as
the name, required and optional fields and the format in which the
resulting information will be displayed.

![integration definition](/img/cloud-soar/image65.png)

### Integration File Hierarchy

Defining integrations at the **action** level allows users greater
flexibility in customizing existing integrations and sharing new actions
with other users. For example, a user may choose to extend Sumo Logic'
existing RSA Netwitness integration to include an additional action
which retrieves all network connections for a given host.

Once the user has created this new action, it can easily be added to the existing RSA
Netwitness integration by uploading the new integration action file. This new action can also be shared between customers and used to extend the functionality of the integration in other customer instances as well.

![new action](/img/cloud-soar/image66.png)



See the Integration Framework manual for more details on utilizing the integration framework within Cloud SOAR.


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

For Ubuntu and CentOS/RedHat, the update process works as the installation process. Follow the same steps described in [Automation bridge installation](#automation-bridge-installation).

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

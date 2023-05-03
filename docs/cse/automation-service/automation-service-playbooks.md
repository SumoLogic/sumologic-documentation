---
id: automation-service-playbooks
title: Playbooks
sidebar_label: Playbooks
description: Learn about playbooks. A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';

{@import ../../reuse/automation-service-la-note.md}

A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type. Playbooks can allow your organization's teams to respond to an incident in a consistent, focused, and repeatable fashion.

Playbooks can be configured to execute
automatically without user intervention, acting on information from the
incident, or can be executed in interactive mode, where user input is
required to authorize predefined actions.

## View playbooks

1. Click the **Configuration** button (gear icon) at the top of the UI.
1. Under **Integrations**, select **Automation**.
1. From the **Automation** screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>
1. View the list of playbooks available to run in automations.<br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" width="800"/>
1. Select a playbook to see the elements in the workflow.<br/><img src={useBaseUrl('img/cse/automations-open-playbook.png')} alt="Opened playbook" width="800"/>
1. Click the elements in the playbook to see their details. For example, click actions (the boxes in the flow) to see the [integration](/docs/cse/automation-service/automation-service-integrations) resources that provide the actions.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} alt="Action example" width="600"/>

## Create a new playbook

1. Click the **Configuration** button (gear icon) at the top of the CSE UI.
1. Under **Integrations**, select **Automation**.
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
   * **Playbook**: Call other playbooks in response to conditional
 statements.

## Add an action node to a playbook

An action node in a playbook runs an enrichment or notification operation. String actions together in the playbook to perform a workflow. 

:::info
Before you can add action nodes to a playbook, you must [configure the connection](/docs/cse/automation-service/about-automation-service/#configure-the-connection-for-an-integration-resource) for each integration resource that actions originate from.
:::

1. Either [create a new playbook](#create-a-new-playbook) as described above, or edit an existing playbook.
1. Click the **+** on the **Start** node.<br/><img src={useBaseUrl('img/cse/automations-start-node.png')} alt="Start node" width="100"/><br/>
1. The **Add node** page displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} alt="Add node" width="400"/><br/>   
1. Select **Action**. The action node configuration screen displays.<br/><img src={useBaseUrl('img/cse/automations-add-action-node-1.png')} alt="Add action node" width="600"/>  
1. Give the node a **Name** that identifies the action being taken.
1. Select the **Type** of action as **Enrichment** or **Notification**. 
1. Select the **Action** from the drop-down list. The dialog updates to show the integration resource that the action originates from, along with additional fields you must fill out to configure how you would like the action to be performed.<br/><img src={useBaseUrl('img/cse/automations-add-action-node.png')} alt="Configure action node" width="600"/> 
1. Fill out the fields with the specific information required by the action. For  more information about the action, you can [view the integration that provides the action](/docs/cse/automation-service/automation-service-integrations#view-integrations).
1. Once you have entered all the information requested, click **Create**. The action node is added to the playbook.
1. Repeat the steps to add other action nodes. 
1. [Add condition nodes](#add-a-condition-node-to-a-playbook) if desired. 
1. When you are done configuring your playbook, click **Save** at the bottom of the window.<br/><img src={useBaseUrl('img/cse/automations-save-playbook-button.png')} alt="Save the playbook" width="250"/> 
1. When you are ready to allow the playbook to be used in automations, click the **Publish** button at the bottom of the playbook window.<br/><img src={useBaseUrl('img/cse/automations-publish-playbook.png')} alt="Publish the playbook" width="250"/> 

## Add a condition node to a playbook

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
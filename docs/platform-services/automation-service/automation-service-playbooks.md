---
id: automation-service-playbooks
title: Playbooks in the Automation Service
sidebar_label: Playbooks
description: Learn about playbooks. A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ActionsLimit from '../../reuse/actions-limit.md';

A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type. Playbooks can allow your organization's teams to respond to an incident in a consistent, focused, and repeatable fashion.

Playbooks can be configured to execute automatically without user intervention, acting on information from the incident, or can be executed in interactive mode, where user input is required to authorize predefined actions.

To run a playbook, add it to an automation. For places in Sumo Logic where you can use add playbooks to automations, see [Where you can run automations](/docs/platform-services/automation-service/about-automation-service/#where-you-can-run-automations).  

:::note
<ActionsLimit/>
:::

## View playbooks

The following procedure describes how to view playbooks already installed in your environment. To add more playbooks, [create a playbook](#create-a-new-playbook), or [install a playbook from App Central](/docs/platform-services/automation-service/automation-service-app-central/#install-a-playbook-from-app-central).

1. [Access the Automation Service](/docs/platform-services/automation-service/about-automation-service/#access-the-automation-service).
1. Click **Playbook** in the left navigation bar. <br/>The list of playbooks dipslays.<br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" style={{border:'1px solid gray'}} width="800"/>
1. Select a playbook to see the elements in the workflow.<br/><img src={useBaseUrl('img/cse/automations-open-playbook.png')} style={{border:'1px solid gray'}} alt="Opened playbook" width="800"/>
1. Click the elements in the playbook to see their details. For example, click actions (the boxes in the flow) to see the [integration](/docs/platform-services/automation-service/automation-service-integrations/) resources that provide the actions.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} style={{border:'1px solid gray'}} alt="Action example" width="600"/>

## Create a new playbook

Before you create your own playbook, first [view playbooks](#view-playbooks) to make sure there isn't one already that does what you want to accomplish, and also check to see if you can [install a playbook from App Central](/docs/platform-services/automation-service/automation-service-app-central/#install-a-playbook-from-app-central) that does what you need.

:::tip
The following procedure provides a brief introduction to how to create a playbook. For detailed examples of how to create playbooks, see the [Cloud SIEM automation examples](/docs/cse/automation/cloud-siem-automation-examples/).
:::

1. [Access the Automation Service](/docs/platform-services/automation-service/about-automation-service/#access-the-automation-service).
1. Click **Playbook** in the left navigation bar. Previous-created playbooks will display.
1. Click the **+** button to the left of **Playbook**.<br/><img src={useBaseUrl('img/cse/automations-new-playbook-button.png')} style={{border:'1px solid gray'}} alt="New playbook button" width="500"/>
1. A new configuration box will be displayed. Name your new playbook.<br/><img src={useBaseUrl('img/cse/automations-new-playbook-dialog.png')} style={{border:'1px solid gray'}} alt="New playbook dialog" width="400"/>
1. Select the incident **Type**. (For example, for Cloud SIEM automations, select **CSE**. For playbooks run from inside another playbook, you can select another incident type to associate with it, for example, **Denial of Service**, **Malware**, **Phishing**, etc.)
1. Click **Save**. The new playbook appears in the list of available playbooks.
1. To configure the new playbook, select
it from the list and click the **Edit** button at the bottom of the
screen.<br/><img src={useBaseUrl('img/cse/automations-new-empty-playbook.png')} alt="New playbook" style={{border:'1px solid gray'}} width="600"/><br/>Opening the playbook will present a black screen with a **Start** node and an **End** node. These nodes dictate the beginning and the end of the playbook's automation sequence. They can be dragged and dropped anywhere on the screen to allow for multiple integrations and conditional statements to be executed.
1. To add the first node in the playbook, click the **+** on the **Start** node. The **Add node** page is displayed.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="400"/>

See [Add nodes to a playbook](/docs/platform-services/automation-service/automation-service-playbooks/#add-nodes-to-a-playbook) for next steps.


## Add nodes to a playbook

You can add nodes to a playbook when you either create a new playbook, or edit an existing playbook. To add a node to a playbook, hover your mouse over an existing node, such as the **Start** node, and click on the **+** button that appears on the node. A *node* is a step in a playbook. Nodes run in the order they are placed in a playbook. When all nodes run without error, the playbook is considered to have executed successfully.

See the following sections to learn how to add the following node types:
   * [**Action**](#add-an-action-node-to-a-playbook). Automatically take specific actions such as enriching data or taking containment steps.
   * [**Condition**](#add-a-condition-node-to-a-playbook). Use conditional statements to define what actions should be taken in response to previous inputs.
   * [**Playbook**](#add-a-playbook-node-to-a-playbook). Call other playbooks in response to conditional statements.
   * [**Task**](#add-a-task-node-to-a-playbook). Assign a task to an individual.
   * [**User Choice**](#add-a-user-choice-node-to-a-playbook). Pause playbook execution until a user selects an option.
   * [**Filter**](#add-a-filter-node-to-a-playbook). Filter results from the preceding action.

### Add an action node to a playbook

An action node in a playbook runs an operation. You can string actions together in the playbook to perform a workflow.  

:::tip
For examples of adding actions to playbooks, see the [Cloud SIEM automation examples](/docs/cse/automation/cloud-siem-automation-examples/).
:::

:::info
Before you can add action nodes to a playbook, you must [configure the connection](/docs/platform-services/automation-service/about-automation-service/#configure-the-connection-for-an-integration-resource) for each integration resource that actions originate from.
:::

1. Either [create a new playbook](#create-a-new-playbook) as described above, or edit an existing playbook.
1. Hover your mouse over an existing node, such as the **Start** node, and click on the **+** button that appears.<br/><img src={useBaseUrl('img/cse/automations-start-node.png')} style={{border:'1px solid gray'}} alt="Start node" width="100"/><br/>
1. The **Add node** page displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="400"/>
1. Select **Action**. The action node configuration screen displays.<br/><img src={useBaseUrl('img/cse/automations-add-action-node-1.png')} style={{border:'1px solid gray'}} alt="Add action node" width="600"/>  
1. Give a **Node name** that identifies the action being taken.
1. Select **Manual execution** if the node will require manual intervention to run. For example, an analyst may need to add information before executing the node.
1. Select the [**Integration**](/docs/platform-services/automation-service/automation-service-integrations/) to supply the action for the node.
1. Select the **Type** of action:
   * **Containment**. Performs some sort of response or remediation action, such as resetting a user's password or blocking a domain on your firewall.
   * **Custom**. Performs an action defined in a custom action YAML file. For an example of a custom action created for Cloud SIEM, see [Advanced example: Configure a custom integration](/docs/cse/automation/cloud-siem-automation-examples/#advanced-example-configure-a-custom-integration).
   * **Enrichment**. Enriches data with additional information, such as adding information about a known malicious IP address.
   * **Notification**. Sends a notification, for example, an email or a post in a messaging service.
   * **Scheduled**. Runs an action on a schedule once the playbook starts. For example, the action regularly checks a condition, and once the condition is met, the next playbook actions are executed.
   :::note
   The **Type** drop-down menu shows only the action types available in the selected integration.
   :::
1. Select the **Action** from the drop-down list. The dialog updates to show the integration resource that the action originates from, along with additional fields you must fill out to configure how you would like the action to be performed.<br/><img src={useBaseUrl('img/cse/automations-add-action-node.png')} alt="Configure action node" style={{border:'1px solid gray'}} width="600"/>
1. Fill out the fields with the specific information required by the action. For  more information about the action, you can [view the integration that provides the action](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations).
1. Once you have entered all the information requested, click **Create**. The action node is added to the playbook.
1. Repeat the steps to add other action nodes.
1. [Add condition nodes](#add-a-condition-node-to-a-playbook) if desired.
1. When you are done configuring your playbook, click **Save** at the bottom of the window.<br/><img src={useBaseUrl('img/cse/automations-save-playbook-button.png')} style={{border:'1px solid gray'}} alt="Save the playbook" width="250"/>
1. When you are ready to allow the playbook to be used in automations, click the **Publish** button at the bottom of the playbook window.<br/><img src={useBaseUrl('img/cse/automations-publish-playbook.png')} style={{border:'1px solid gray'}} alt="Publish the playbook" width="250"/>

### Add a condition node to a playbook

Define a conditional statement to be met before the next node can be executed.

:::tip
For examples of adding conditions to playbooks, see the [Cloud SIEM automation examples](/docs/cse/automation/cloud-siem-automation-examples/).
:::

1. Either [create a new playbook](#create-a-new-playbook) as described above, or edit an existing playbook.
1. Hover your mouse over an existing node and click on the **+** button that appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/add-node-button.png')} style={{border:'1px solid gray'}} alt="Add node button" width="200"/><br/>
1. The **Add node** dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="400"/>   
1. Select **Condition**. The condition node configuration dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-condition-node.png')} alt="Add condition node" style={{border:'1px solid gray'}} width="500"/>
1. Click **Create**. The empty condition appears on the playbook.
1. Draw a line from a previous action node to the new condition node. This is required to allow the condition to evaluate the output values from the previous action.
1. Now that you've linked the condition to an action, hover the mouse over the condition node and click the edit button on the node to configure the condition settings.<br/><img src={useBaseUrl('img/cse/automations-edit-condition-node.png')} style={{border:'1px solid gray'}} alt="Edit a condition node" width="150"/>
1. The condition node configuration dialog displays again. Under **Condition1**, click **Select a value**.<br/><img src={useBaseUrl('img/cse/automations-add-a-condition-3.png')} style={{border:'1px solid gray'}} alt="Select values for the condition" width="500"/>
1. Click **Get Value** and select from the drop-down menu whether the value will evaluate to **true (bool)**, **false (bool)**, or **empty**.<br/><img src={useBaseUrl('img/cse/automations-add-condition-node-2.png')} style={{border:'1px solid gray'}} alt="Get values for the condition" width="500"/>
1. Under **Get value from a previous action**, select the value to feed into the condition. The example shows **Get Devices** and **Playbook inputs** that came from the previous action. (The condition must be linked by a line to the previous action node to receive outputs from the action.) Click the options from the previous action and select which output type (for example, hashes, IP addresses, domains) to evaluate and add it to the condition.
1. The selected output type will be displayed under **Condition 1**. Select which condition you would like for the output results to meet from the inequality operators below and click **Select a value** to define the condition.
1. Now that **Condition 1** is defined, you can choose to filter your
results further by selecting an **AND/OR** operator to define another
condition.
1. Click **Update**.
1. When you create a new condition, you need to define what happens when the results meet one of your criteria. Draw lines to nodes to define the flow for success, failure, or other condition options.

### Add a task node to a playbook

Define a task to assign to an individual, such as a security analyst.

1. Either [create a new playbook](#create-a-new-playbook) as described above, or edit an existing playbook.
1. Hover your mouse over an existing node and click on the **+** button that appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/add-node-button.png')} style={{border:'1px solid gray'}} alt="Add node button" width="200"/><br/>
1. The **Add node** dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="400"/>   
1. Select **Task**. The task node configuration dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-task-node.png')} style={{border:'1px solid gray'}} alt="Add task node" width="500"/>
1. Give the node a **Title** that will display in the playbook.
1. Type a **Description** of the task the owner will perform.  <br/>If desired, you can click the variable icon <img src={useBaseUrl('img/cse/automations-placeholder-icon.png')} style={{border:'1px solid gray'}} alt="Placeholder icon" width="20"/> and click in the resulting box to display a list of variables you can add to the description, such as for Cloud SOAR [**Incident**](/docs/cloud-soar/incidents-triage/), [**Incident Artifacts**](/docs/cloud-soar/incidents-triage/#incident-artifacts), and [**Triage**](/docs/cloud-soar/incidents-triage/#triage).
1. For **Authorizer**, select the user assigning the task.
1. For **Owner**, select the user assigned the task.
1. In **Due date**, enter the number of days from the time when the action is run before the task is due.
1. Select **mandatory** if the task must be performed in order for the playbook to continue.
1. In **Actual effort**, enter the number of days expected to complete the task. (The owner will subsequently record the actual number of days spent on the effort.)
1. In **Progress**, select percent toward completion, for example, 10%, 20%, and so on. (The owner will subsequently record their progress.)
1. Select the **Priority** (Low, Normal, Important, or Urgent).
1. Click **Create**.

Following is an example of a task node in a running playbook. Click the **Task** node to view more about its status. Status information opens in a box to the left. In the following example of an action whose status is **Waiting Owner**, an **Action Task** appears in the box that describes user interaction required to complete the task.

<img src={useBaseUrl('img/cse/automations-example-task-node.png')} style={{border:'1px solid gray'}} alt="Example task node" width="700"/>

If a user has an action marked as **Waiting Owner**, they must perform the steps needed to complete the **Action Task**. When done, they click the appropriate button at the bottom of the **Waiting Owner** action box (**Approve**, **Approve & Close**, or **Reject**). The action completes, and the subsequent remaining actions in the playbook run.

<img src={useBaseUrl('img/cse/automations-complete-task.png')} style={{border:'1px solid gray'}} alt="Complete task" width="300"/>

### Add a user choice node to a playbook

When a user choice node is encountered, the execution will pause until a user selects an option. For example, after enrichment, a user could be asked whether to proceed with a containment action or to perform additional enrichment first. When a playbook is paused at a user choice node, the status of that playbook will say **Waiting user interaction**.

1. Either [create a new playbook](#create-a-new-playbook) as described above, or edit an existing playbook.
1. Hover your mouse over an existing node and click on the **+** button that appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/add-node-button.png')} style={{border:'1px solid gray'}} alt="Add node button" width="200"/><br/>
1. The **Add node** dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="400"/>   
1. Select **User Choice**. The user choice node configuration dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-user-choice-node.png')} alt="Add user choice node" style={{border:'1px solid gray'}} width="500"/>
1. Type a **Question** for the user. The answers they can choose from are provided by the **Answers** field.<br/>If desired, you can click the variable icon <img src={useBaseUrl('img/cse/automations-placeholder-icon.png')} style={{border:'1px solid gray'}} alt="Placeholder icon" width="20"/> and click in the resulting box to display a list of variables you can add to the description, such as for Cloud SOAR [**Incident**](/docs/cloud-soar/incidents-triage/), [**Incident Artifacts**](/docs/cloud-soar/incidents-triage/#incident-artifacts), and [**Triage**](/docs/cloud-soar/incidents-triage/#triage).
1. In **Answers**, enter selections that the user can choose from. By default, **success** and **failure** are provided.
1. For **Authorizer**, select the authorizer of the user choice.
1. Select **Expires** if you want the user choice to expire after a set amount of time so that the playbook can proceed when no choice is made. If you do not select **Expires**, the playbook does not proceed until the user makes a choice. If you select **Expires**, fill out additional fields for the amount of time to pass before expiration, and the **Default answer** to automatically be chosen at the end of the expiration period.
1. Click **Create**.

Following is an example of a user choice node. Note the the node branches to the next node depending on the user's answer.

<img src={useBaseUrl('img/cse/automations-example-user-choice-node.png')} style={{border:'1px solid gray'}} alt="Example user choice node" width="500"/>

### Add a playbook node to a playbook

Define a playbook to run inside another playbook. For example, you may want to call another playbook in response to a [condition](#add-a-condition-node-to-a-playbook) statement.

1. Either [create a new playbook](#create-a-new-playbook) as described above, or edit an existing playbook.
1. Hover your mouse over an existing node and click on the **+** button that appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/add-node-button.png')} style={{border:'1px solid gray'}} alt="Add node button" width="200"/><br/>
1. The **Add node** dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="400"/>   
1. Select **Playbook**. The playbook node configuration dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-playbook-node.png')} alt="Add playbook node" style={{border:'1px solid gray'}} width="500"/>
1. In the **Playbook** drop-down menu, select the playbook to run.
1. Click **Create**. 

### Add a filter node to a playbook

A filter node filters results from the preceding action based on the condition you write. You can only add a filter node after an action node. For example, let's suppose that the action feeding into the filter has 10 results, but you want to filter out all but the best two results. You can write a condition in the filter to do the filtering.

1. [Add an action node](#add-an-action-node-to-a-playbook). 
1. Hover your mouse over an action node and click the **+** button. The available nodes are displayed. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-add-filter-node.png')} alt="Add filter node" style={{border:'1px solid gray'}} width="500"/>
1. Click **Filter**. The filter node configuration dialog displays. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-add-filter-node-conditions.png')} alt="Add filter node conditions" style={{border:'1px solid gray'}} width="500"/>
1. Configure the conditions you want to use for filtering. 
1. Click **Create**.

## Test a playbook

You can test a playbook to verify that it works properly. The test results show the outcome as if the playbook actually ran.

1. [Access the Automation Service](/docs/platform-services/automation-service/about-automation-service/#access-the-automation-service).
1. Click **Playbook** in the left navigation bar. 
1. Select a playbook.
1. Click the kebab button in the upper-left corner of the UI. 
1. Select **Run Test**. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-run-test.png')} alt="Run a playbook test" style={{border:'1px solid gray'}} width="600"/>
1. In the **Test playbook** dialog, enter the requested information and click **Run**. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-test-playbook.png')} alt="Test playbook" style={{border:'1px solid gray'}} width="600"/>
1. The results of the test are displayed in a new window labeled with the playbook name and **(RUN TEST)**. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-test-results.png')} alt="Test results" style={{border:'1px solid gray'}} width="600"/>
1. Click the clock icon in the upper-right corner to see the testing history. Select **Latest actions** to see test results for all the actions on the playbook, or select items on the list to see results for individual actions. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-test-results-filtered.png')} alt="Filtered test results" style={{border:'1px solid gray'}} width="600"/>

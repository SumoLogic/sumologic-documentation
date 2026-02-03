---
id: create-playbooks
title: Create Playbooks
sidebar_label: Create Playbooks
description: Learn how to create playbooks in the Automation Service to run automated actions.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CartesianProduct from '../../../reuse/cartesian-product.md';
import TerraformLink from '../../../reuse/terraform-link.md';

## View playbooks

The following procedure describes how to view playbooks already installed in your environment. To add more playbooks, [create a playbook](#create-a-new-playbook), or [install a playbook from App Central](/docs/platform-services/automation-service/playbooks-in-app-central/#install-an-out-of-the-box-playbook-from-app-central).

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Playbooks**. You can also click the **Go To...** menu at the top of the screen and select **Playbooks**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation > Playbooks**. <br/>The list of playbooks displays. <br/> <img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" style={{border:'1px solid gray'}} width="700"/>
1. Select a playbook to see the elements in the workflow.<br/><img src={useBaseUrl('img/cse/automations-open-playbook.png')} style={{border:'1px solid gray'}} alt="Opened playbook" width="700"/>
1. Click the elements in the playbook to see their details. For example, click actions (the boxes in the flow) to see the [integration](/docs/platform-services/automation-service/automation-service-integrations/) resources that provide the actions.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} style={{border:'1px solid gray'}} alt="Action example" width="700"/>

## Create a new playbook

Before you create your own playbook, first [view playbooks](#view-playbooks) to make sure there isn't one already that does what you want to accomplish, and also check to see if you can [install a playbook from App Central](/docs/platform-services/automation-service/playbooks-in-app-central/#install-an-out-of-the-box-playbook-from-app-central) that does what you need. After you create a playbook, you can run it in automations for [monitors](/docs/alerts/monitors/use-playbooks-with-monitors/), [Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/), or [Cloud SOAR](/docs/cloud-soar/automation/). 

:::tip
The following procedure provides a brief introduction to how to create a playbook. For detailed examples of how to create playbooks, see the [Cloud SIEM automation examples](/docs/cse/automation/cloud-siem-automation-examples/).
:::

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Playbooks**. You can also click the **Go To...** menu at the top of the screen and select **Playbooks**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation**. <br/>Previously-created playbooks display.
1. Click the **+** button to the left of **Playbook**.<br/><img src={useBaseUrl('img/cse/automations-new-playbook-button.png')} style={{border:'1px solid gray'}} alt="New playbook button" width="400"/>
1. A new configuration box will be displayed. Name your new playbook.<br/><img src={useBaseUrl('img/cse/automations-new-playbook-dialog.png')} style={{border:'1px solid gray'}} alt="New playbook dialog" width="400"/>
1. Select the incident **Type**. (For example, for Cloud SIEM automations, select **Cloud SIEM**. For playbooks run from inside another playbook, you can select another incident type to associate with it, for example, **Denial of Service**, **Malware**, **Phishing**, and so on.)
1. Enter a **Description** of the playbook to help others understand how to use it.
1. Click **Create**. The new playbook appears in the list of available playbooks.
1. To configure the new playbook, select it from the list and click the **Edit** button at the bottom of the screen.<br/><img src={useBaseUrl('img/cse/automations-new-empty-playbook.png')} alt="New playbook" style={{border:'1px solid gray'}} width="600"/>
1. The **Start** node displays a **+** icon and an **Edit** icon. Click the **Edit** icon.  <br/><img src={useBaseUrl('img/platform-services/automation-service/start-node.png')} alt="Start node" style={{border:'1px solid gray'}} width="100"/> <br/>The **Edit node** dialog appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/edit-start-node.png')} alt="Edit node dialog" style={{border:'1px solid gray'}} width="500"/>
1. Click the dropdown arrow on **Add one or more params as a playbook input** and select the kind of trigger that will execute the playbook:
    * **Insight**. An [Insight](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) from an [automation in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/).
    * **Entity**. An [Entity](/docs/cse/records-signals-entities-insights/view-manage-entities/) from an [automation in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/).
    * **Alert**. An [alert](/docs/alerts/) from an [automated playbook in a monitor](/docs/alerts/monitors/use-playbooks-with-monitors/).
    * **Parse from json**. A payload from a [parent playbook](/docs/platform-services/automation-service/playbooks/create-playbooks/#add-a-playbook-node-to-a-playbook). (You can also select this option if you want to pass a custom payload from an alert.)
    * Leave blank if the trigger will run by a Cloud SOAR incident. See [Run playbooks in Cloud SOAR](/docs/cloud-soar/automation/#run-playbooks-in-cloud-soar). <br/><img src={useBaseUrl('img/platform-services/automation-service/start-node-parameters.png')} alt="Types of start node parameters" style={{border:'1px solid gray'}} width="400"/>
1. When you select one of these options, standard parameters for the trigger type are displayed. (If you select **Parse from json**, a box appears for you to enter the JSON payload.) Click the **Remove** icon to remove any parameters you don't want passed into the playbook, and if you want to add more parameters, click **Add New Param** at the bottom of the dialog.
1. Click **Update**. The playbook will display a black screen with a **Start** node and an **End** node. These nodes dictate the beginning and the end of the playbook's automation sequence. You can drag and drop them anywhere on the screen to allow you space to add multiple nodes between them.
1. To add the first node in the playbook, click the **+** on the **Start** node. The **Add node** page is displayed.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="500"/>

See [Add nodes to a playbook](/docs/platform-services/automation-service/playbooks/create-playbooks/#add-nodes-to-a-playbook) for next steps.


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
1. Select the **Type** of action (see [Action types](#action-types) for more information):
   * **Containment**
   * **Custom**
   * **Enrichment**
   * **Notification**
   * **Scheduled**
   :::note
   The **Type** drop-down menu shows only the action types available in the selected integration.
   :::
1. Select the **Action** from the drop-down list. The dialog updates to show the integration resource that the action originates from, along with additional fields you must fill out to configure how you would like the action to be performed.<br/><img src={useBaseUrl('img/cse/automations-add-action-node.png')} alt="Configure action node" style={{border:'1px solid gray'}} width="600"/>
1. Fill out the fields with the specific information required by the action. For  more information about the action, you can [view the integration that provides the action](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations).
1. Deselect the **Cartesian product** checkbox.
   :::warning
   <CartesianProduct/>
   :::
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
1. Deselect the **Cartesian product** checkbox.
   :::warning
   <CartesianProduct/>
   :::
1. Click **Create**. The empty condition appears on the playbook.
1. Draw a line from a previous action node to the new condition node. This is required to allow the condition to evaluate the output values from the previous action.
1. Now that you've linked the condition to an action, hover the mouse over the condition node and click the edit button on the node to configure the condition settings.<br/><img src={useBaseUrl('img/cse/automations-edit-condition-node.png')} style={{border:'1px solid gray'}} alt="Edit a condition node" width="150"/>
1. The condition node configuration dialog displays again. Under **Condition1**, click **Select a value**.<br/><img src={useBaseUrl('img/cse/automations-add-a-condition-3.png')} style={{border:'1px solid gray'}} alt="Select values for the condition" width="500"/>
1. Click **Get Value** and select values from the drop-down menu to use for the condition:
   * **Internal values**. Whether the condition will evaluate to **true (bool)**, **false (bool)**, or **empty**.
   * **Artifact fields**. Fields obtained from [incident artifacts](/docs/cloud-soar/incidents-triage/#incident-generation).
   * **Incident fields**. Fields obtained from [incidents](/docs/cloud-soar/settings/#incidents).
   * **Triage**. Fields obtained from [triage](/docs/cloud-soar/incidents-triage/#triage-field-settings).
   * You can also manually enter a value, such as a string or numeric literal.<br/><img src={useBaseUrl('img/cse/automations-add-condition-node-new.png')} style={{border:'1px solid gray'}} alt="Get values for the condition" width="500"/>
1. Under **Get value from a previous action**, select the value to feed into the condition. The example shows **IP Reputation V2** and **Playbook inputs** that came from the previous action. (The condition must be linked by a line to the previous action node to receive outputs from the action.) Click the options from the previous action and select which output type (for example, hashes, IP addresses, domains) to evaluate and add it to the condition.
1. The selected output type will be displayed under **Condition 1**. Select which condition you would like for the output results to meet from the inequality operators below and click **Select a value** to define the condition.
1. Now that **Condition 1** is defined, you can choose to filter your results further by selecting an **AND/OR** operator to define another condition.
    :::warning
    If you define multiple conditions, all the conditions must be filtered with either **AND** or **OR**. If some are filtered with **AND** and some with **OR**, then the condition evaluation will fail. 
    :::
1. Click **Update**.
1. When you create a new condition, you need to define what happens when the results meet one of your criteria. Draw lines to nodes to define the flow for success, failure, or other condition options.

### Add a task node to a playbook

Define a task to assign to an individual, such as a security analyst.

1. Either [create a new playbook](#create-a-new-playbook) as described above, or edit an existing playbook.
1. Hover your mouse over an existing node and click on the **+** button that appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/add-node-button.png')} style={{border:'1px solid gray'}} alt="Add node button" width="200"/>
1. The **Add node** dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="400"/>   
1. Select **Task**. The task node configuration dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-task-node.png')} style={{border:'1px solid gray'}} alt="Add task node" width="500"/>
1. Give the node a **Title** that will display in the playbook.
1. Type a **Description** of the task the owner will perform.  <br/>If desired, you can click the variable icon <img src={useBaseUrl('img/cse/automations-placeholder-icon.png')} style={{border:'1px solid gray'}} alt="Placeholder icon" width="20"/> and click in the resulting box to display a list of variables you can add to the description.
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

<!-- Oringanially added by DOCS-1251, but pulled out. Add after CSOAR-3993 and CSOAR-3967 are resolved:

#### Task variables

Task variables provide a useful way to track who is assigned to a task and other task data, and let you interact with the task information in subsequent playbook actions.

Perform the following steps to use the variables in nodes that come after the task node in the playbook:
1. Let's say you create a task node:<br/><img src={useBaseUrl('img/platform-services/automation-service/task-example.png')} style={{border:'1px solid gray'}} alt="Example task node followed by an action node" width="500"/>
1. Open a node that comes later in the playbook than the task node. In our example, we'll select the node titled **Send email about task status**.
1. In the **Edit Node** dialog, click either a gear icon <img src={useBaseUrl('img/platform-services/automation-service/gear-icon.png')} style={{border:'1px solid gray'}} alt="Gear icon" width="20"/> or a placeholder icon <img src={useBaseUrl('img/platform-services/automation-service/insert-placeholder-icon.png')} style={{border:'1px solid gray'}} alt="Insert placeholder icon" width="20"/>:<br/><img src={useBaseUrl('img/platform-services/automation-service/task-example-edit-node.png')} style={{border:'1px solid gray'}} alt="Gear icon and insert placeholder icons highlighted on the Edit Note dialog" width="500"/>
1. From the list of available values from previous actions, click the name of the task node. Then select the variable you want to use:<br/><img src={useBaseUrl('img/platform-services/automation-service/task-example-node-values.png')} style={{border:'1px solid gray'}} alt="Task variables" width="500"/>
1. Insert the variables as needed in your node. In the following **Send email about task status** node example, the task variables are used for the email subject and in the email body:<br/><img src={useBaseUrl('img/platform-services/automation-service/task-example-variables.png')} style={{border:'1px solid gray'}} alt="Task variables in a node" width="500"/>
1. Continue inserting the task variables as needed in nodes following the task node.
-->

### Add a user choice node to a playbook

When a user choice node is encountered, the execution will pause until a user selects an option. For example, after enrichment, a user could be asked whether to proceed with a containment action or to perform additional enrichment first. When a playbook is paused at a user choice node, the status of that playbook will say **Waiting user interaction**.

1. Either [create a new playbook](#create-a-new-playbook) as described above, or edit an existing playbook.
1. Hover your mouse over an existing node and click on the **+** button that appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/add-node-button.png')} style={{border:'1px solid gray'}} alt="Add node button" width="200"/><br/>
1. The **Add node** dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="400"/>   
1. Select **User Choice**. The user choice node configuration dialog displays.<br/><img src={useBaseUrl('img/cse/automations-add-user-choice-node.png')} alt="Add user choice node" style={{border:'1px solid gray'}} width="500"/>
1. Type a **Question** for the user. The answers they can choose from are provided by the **Answers** field.<br/>If desired, you can click the variable icon <img src={useBaseUrl('img/cse/automations-placeholder-icon.png')} style={{border:'1px solid gray'}} alt="Placeholder icon" width="20"/> and click in the resulting box to display a list of variables you can add to the description.
1. In **Answers**, enter selections that the user can choose from. By default, **success** and **failure** are provided.
1. For **Authorizer**, select the authorizer of the user choice.
1. Select **Expires** if you want the user choice to expire after a set amount of time so that the playbook can proceed when no choice is made. If you do not select **Expires**, the playbook does not proceed until the user makes a choice. If you select **Expires**, fill out additional fields for the amount of time to pass before expiration, and the **Default answer** to automatically be chosen at the end of the expiration period.
1. Click **Create**.

#### Example user choice node

Following is an example of a user choice node. Note the node branches to the next node depending on the user's answer. In this example, if the user selects **Yes**, then the IP is blocked, but if the user selects **No**, an email is sent to the SOC.

<img src={useBaseUrl('img/cse/automations-example-user-choice-node.png')} style={{border:'1px solid gray'}} alt="Example user choice node" width="500"/>

#### User choice variables

User choice variables provide a powerful way to track who responded to a user choice option, and let you interact with the responder in subsequent playbook actions.

Exposing the responder ID as a variable provides great benefits, such as letting subsequent nodes automatically reassign the originating incident to the responder, or allowing you to build a playbook that auto-assigns incidents based on the responder ID. The authorized responder can be a single individual, or anyone from a group of authorized users.

Following are the available variables that identify the person who responded to a user choice:
* `responder.id`. The user ID of the responder. The ID is stored in hexadecimal format.
* `responder.email`. The responder's email.
* `responder.firstName`. The responder's first name.
* `responder.lastName`. The responder's last name.

Perform the following steps to use the user choice responder variables in nodes following user choice:
1. Let's say you create a user choice node to either send an email to the responder, or assign the responder to an insight:<br/><img src={useBaseUrl('img/platform-services/automation-service/user-choice-variable-example-playbook.png')} style={{border:'1px solid gray'}} alt="Example user choice node for actor variables" width="400"/>
1. Open a node following the user choice node. In our example, we'll select the **Send Email** node.
1. In the **Edit Node** dialog, click either a gear icon <img src={useBaseUrl('img/platform-services/automation-service/gear-icon.png')} style={{border:'1px solid gray'}} alt="Gear icon" width="20"/> or a placeholder icon <img src={useBaseUrl('img/platform-services/automation-service/insert-placeholder-icon.png')} style={{border:'1px solid gray'}} alt="Insert placeholder icon" width="20"/>:<br/><img src={useBaseUrl('img/platform-services/automation-service/user-choice-variables-edit-node.png')} style={{border:'1px solid gray'}} alt="Gear icon and insert placeholder icons highlighted on the Edit Note dialog" width="500"/>
1. From the list of available values from previous actions, click the name of the user choice node. Then select the responder variable you want to use:<br/><img src={useBaseUrl('img/platform-services/automation-service/user-choice-variables.png')} style={{border:'1px solid gray'}} alt="User choice responder variables" width="500"/>
1. Insert the variables as needed in your node. In the following **Send Email** node example, the responder variables are used for the email's recipient and in the email body:<br/><img src={useBaseUrl('img/platform-services/automation-service/user-choice-variables-insert-placeholders.png')} style={{border:'1px solid gray'}} alt="User choice variables in a node" width="500"/>
1. Continue inserting the variables as needed in nodes following the user choice.

#### User choice nodes in out-of-the-box playbooks

Here are just a few of the [out-of-the-box playbooks](/docs/platform-services/automation-service/playbooks-in-app-central/) that contain user choice nodes. Look at the user choice nodes in these playbooks to get an idea of how to structure them: 
* 18 - DDoS
* 21 - DLP Alert
* 24 - DoS with Decision Tree
* 59 - Outbound Network Investigation
* 87 - Unauthorized Access w/ Privilege Escalation
* 88 - User Account Investigation Active Directory

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
1. (Optional) Use **Split by** to select an output if it is a list (array) and you want to evaluate each item separately. See ["Split by" field in a filter node](/docs/platform-services/automation-service/playbooks/arrays-in-playbooks/#split-by-field-in-a-filter-node) for more information.
1. Configure the conditions you want to use for filtering.
1. Deselect the **Cartesian product** checkbox.
   :::warning
   <CartesianProduct/>
   :::
1. Click **Create**.

## Action types

Every [automation integration](/docs/platform-services/automation-service/app-central/integrations/) contains different types of actions you can perform to help with incident remediation, such as sending notifications, adding additional information (enrichment), containment, and so on. Following are the different types of actions available in integrations:
* [**Containment**](#containment). Performs some sort of response or remediation action, such as resetting a user's password or blocking a domain on your firewall.
* [**Custom**](#custom). Performs an action defined in a custom action YAML file.
* [**Enrichment**](#enrichment). Enriches data with additional information, such as adding information about a known malicious IP address.
* [**Notification**](#notification). Sends a notification, for example, an email or a post in a messaging service.
* [**Scheduled**](#scheduled). Runs an action on a schedule once the playbook starts.

Every action in an integration is assigned an action type. If you take a look at the [Automation Integrations in App Central](/docs/platform-services/automation-service/app-central/integrations/), you'll see each has a list of available actions with the type of action listed for each. For example, here are some of the actions in the Sumo Logic Cloud SIEM integration:
* **Get Entity** *(Enrichment)* - Get Entity details.
* **Add Network Block** *(Containment)* - Add an address into the Network Blocks.
* **Add Comment To Insight** *(Notification)* - Add a comment to an existing Insight.
* **Check Insight Status Schedule** *(Scheduled)* - Schedule action that periodically checks if the Insight is closed.

To use one of these actions, start by adding an action node to a playbook, then select the integration, the action type, and the action. See the next section to learn how.

### Select the action type

When you [add an action node to a playbook](#add-an-action-node-to-a-playbook), you select the type of action to perform from the integration.

1. Either [create a new playbook](#create-a-new-playbook), or edit an existing playbook.
1. Hover your mouse over an existing node, such as the **Start** node, and click on the **+** button that appears.<br/><img src={useBaseUrl('img/cse/automations-start-node.png')} style={{border:'1px solid gray'}} alt="Start node" width="100"/><br/>
1. The **Add node** page displays.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="400"/>
1. Select **Action**.
1. In the **Integration** field, select the integration you want to use. In this example, we've selected the [Sumo Logic Cloud SIEM](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-cloud-siem/) integration:<br/><img src={useBaseUrl('img/platform-services/automation-service/sumo-logic-cloud-siem-integration-selected.png')} alt="Sumo Logic Cloud SIEM integration selected in the Add Node dialog" style={{border:'1px solid gray'}} width="400"/>
1. Click the **Type** field to select the type of action you want to perform. The drop-down menu shows only the types available in the selected integration:<br/><img src={useBaseUrl('img/platform-services/automation-service/action-types-on-cloud-siem-integration.png')} alt="Action types on Sumo Logic Cloud SIEM integration" style={{border:'1px solid gray'}} width="400"/>
1. Click the **Action** field to select the action to run in the playbook. Only actions of that type in the integration are listed:<br/><img src={useBaseUrl('img/platform-services/automation-service/enrichment-actions-on-cloud-siem.png')} alt="Enrichment actions on Sumo Logic Cloud SIEM integration" style={{border:'1px solid gray'}} width="400"/>
1. Proceed with the rest of the steps to [add an action node to a playbook](#add-an-action-node-to-a-playbook).

### Containment

Containment actions perform some sort of response or remediation action, such as:
* Block IPs
* Block email senders
* Block URLs
* Ban hash files
* Reset passwords and send an email with new passwords
* Delete attachments
* Disconnect devices from the network

Many integrations offer containment actions. Here are just a few:
* [Active Directory V2](/docs/platform-services/automation-service/app-central/integrations/active-directory-v2/)
* [AWS IAM](/docs/platform-services/automation-service/app-central/integrations/aws-iam/)
* [Azure AD](/docs/platform-services/automation-service/app-central/integrations/azure-ad/)
* [Cortex XDR](/docs/platform-services/automation-service/app-central/integrations/cortex-xdr/)
* [CrowdStrike Falcon](/docs/platform-services/automation-service/app-central/integrations/crowdstrike-falcon/)
* [Gmail](/docs/platform-services/automation-service/app-central/integrations/gmail/)
* [Microsoft Defender ATP](/docs/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/)
* [Okta](/docs/platform-services/automation-service/app-central/integrations/okta/)
* [OneLogin](/docs/platform-services/automation-service/app-central/integrations/onelogin/)
* [Slack](/docs/platform-services/automation-service/app-central/integrations/slack/)

### Custom

Custom actions perform an activity defined in a custom action YAML file. For an example of a custom action created for Cloud SIEM, see [Advanced example: Configure a custom integration](/docs/cse/automation/cloud-siem-automation-examples/#advanced-example-configure-a-custom-integration).

A few [integrations](/docs/platform-services/automation-service/app-central/integrations/) also offer actions labelled as custom types:
* [Microsoft Defender ATP](/docs/platform-services/automation-service/app-central/integrations/microsoft-defender-atp)
* [Triage Tools](/docs/platform-services/automation-service/app-central/integrations/triage-tools/)

### Enrichment

Enrichment actions enrich data with additional information, such as adding information about a known malicious IP address.

Many integrations offer enrichment actions. Here are just a few:
* [Abnormal Security](/docs/platform-services/automation-service/app-central/integrations/abnormal-security/)
* [Atlassian Jira V2](/docs/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/)
* [AWS IAM](/docs/platform-services/automation-service/app-central/integrations/aws-iam/)
* [Azure AD](/docs/platform-services/automation-service/app-central/integrations/azure-ad/)
* [Cortex XDR](/docs/platform-services/automation-service/app-central/integrations/cortex-xdr/)
* [Criminal IP](/docs/platform-services/automation-service/app-central/integrations/criminal-ip/)
* [CrowdStrike Falcon](/docs/platform-services/automation-service/app-central/integrations/crowdstrike-falcon/)
* [IP Quality Score](/docs/platform-services/automation-service/app-central/integrations/ip-quality-score/)
* [Salesforce](/docs/platform-services/automation-service/app-central/integrations/salesforce/)
* [SentinelOne](/docs/platform-services/automation-service/app-central/integrations/sentinelone/)
* [Sumo Logic Cloud SIEM](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-cloud-siem/)
* [VirusTotal](/docs/platform-services/automation-service/app-central/integrations/virustotal/)

### Notification

Notification actions send a notification, for example, an email or a post in a messaging service.

Many integrations offer notification actions. Here are just a few:
* [Basic Tools](/docs/platform-services/automation-service/app-central/integrations/basic-tools/)
* [Gmail](/docs/platform-services/automation-service/app-central/integrations/gmail/)
* [Slack](/docs/platform-services/automation-service/app-central/integrations/slack/)
* [SMTP V3](/docs/platform-services/automation-service/app-central/integrations/smtp-v3/)
* [Sumo Logic Cloud SIEM](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-cloud-siem/)

### Scheduled

Scheduled actions run on a schedule once the playbook starts. For example, the action regularly checks a condition, and once the condition is met, the next playbook actions are executed.

Many integrations offer scheduled actions. Here are just a few:
* [Atlassian Jira V2](/docs/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/)
* [Microsoft Defender ATP](/docs/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/)
* [SentinelOne](/docs/platform-services/automation-service/app-central/integrations/sentinelone/)
* [Sumo Logic Cloud SIEM](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-cloud-siem/)
* [Sumo Logic Notifications by Microsoft](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-microsoft/)
* [Sumo Logic Notifications](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/)
* [VirusTotal](/docs/platform-services/automation-service/app-central/integrations/virustotal/)

## Playbook versioning

### Autosave

Every time you edit a playbook draft, the draft is automatically saved, and the following notification briefly appears in the lower right corner of the playbook screen:<br/><img src={useBaseUrl('img/platform-services/automation-service/autosave-playbook-1.png')} alt="Playbook autosave" style={{border:'1px solid gray'}} width="200"/>

When the automatic save is complete, the following notification lets you know.<br/><img src={useBaseUrl('img/platform-services/automation-service/autosave-playbook-2.png')} alt="Playbook autosave complete" style={{border:'1px solid gray'}} width="200"/>

To enable or disable autosave, use [playbook preferences](#playbook-preferences).

### Versions

To publish a playbook so that others may use it, click the publish button at the bottom of the playbook screen.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-publish-button.png')} alt="Playbook publish button" style={{border:'1px solid gray'}} width="300"/>

Every time you publish a playbook, a new version of the playbook is retained. In the screen image below, notice how all the versions of the playbook are listed (#4 being the published version as indicated by the publish icon). Click on a version to edit it, and if you want, publish it. In this way, you maintain version control of your playbooks, and ensure that all versions are retained.

<img src={useBaseUrl('img/platform-services/automation-service/playbook-versions.png')} alt="Playbook versions" style={{border:'1px solid gray'}} width="800"/>

## Enable or disable playbooks

You can enable playbooks for use in automations, or disable them to prevent them from being used. This gives you greater control over when a playbook can be run. If for example a playbook is causing a problem, such as exceeding your actions limit or sending too many emails, you could temporarily disable the playbook until you remedy the issue. 

When enabling or disabling playbooks, keep in mind:
* By default, draft playbooks are disabled.
* Playbooks without any published versions are initially disabled and will be automatically enabled upon publishing their first version.
* Disabled playbooks cannot be triggered automatically.
* Deleted playbooks are set to disabled and remain so after restoration.
* Cloned or imported playbooks are enabled by default, irrespective of the original playbook's status.
* [Audit logs](/docs/platform-services/automation-service/automation-service-audit-logging/) are generated whenever playbooks are enabled or disabled manually. 

### How to enable or disable a playbook

To enable or disable a playbook, open the playbook and click the toggle.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-enabled-toggle.png')} alt="Playbook enabled toggle" style={{border:'1px solid gray'}} width="400"/><br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-disabled-toggle.png')} alt="Playbook disabled toggle" style={{border:'1px solid gray'}} width="400"/>

The **Status** column shows whether a playbook is enabled <img src={useBaseUrl('img/platform-services/automation-service/playbook-enabled-symbol.png')} alt="Playbook enabled symbol" style={{border:'1px solid gray'}} width="30"/> or disabled <img src={useBaseUrl('img/platform-services/automation-service/playbook-disabled-symbol.png')} alt="Playbook disabled symbol" style={{border:'1px solid gray'}} width="30"/>.  

<img src={useBaseUrl('img/platform-services/automation-service/playbook-status-enabled-disabled.png')} alt="Playbook status column" style={{border:'1px solid gray'}} width="800"/>

### Enable on publish

To publish a playbook, click the **Publish** button at the bottom of the playbook window:<br/><img src={useBaseUrl('img/cse/automations-publish-playbook.png')} style={{border:'1px solid gray'}} alt="Publish the playbook" width="300"/>

When you publish a playbook:
* Playbooks without any published versions are automatically enabled. 
* Playbooks that have previously published versions will display an **Enable playbook on publish** option if they are in a disabled state:<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-enable-on-publish-toggle.png')} style={{border:'1px solid gray'}} alt="Publish enable on publish" width="400"/>

## Playbook preferences

1. Click the preferences button in the upper-right corner of the screen.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-preferences.png')} alt="Playbook preferences button" style={{border:'1px solid gray'}} width="200"/>
2. Configure preferences in the **Playbooks Preferences** screen.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-preferences-screen.png')} alt="Playbook preferences screen" style={{border:'1px solid gray'}} width="400"/>

### Autosave preference

Select **Enable Autosave for all playbooks** to ensure that while editing a playbook, all changes will be automatically saved to the draft. For more information, see [Autosave](#autosave).

## Export and import playbooks

With the mechanism to export and import playbooks, you can move a playbook, along with all its configurations, from one instance to another. You can also use the export function to manage playbooks using Terraform.

1. Click on the **Export** icon located next to the playbook name.<br/><img src={useBaseUrl('img/cloud-soar/export-playbook.png')} alt="Export Playbook" style={{border: '1px solid gray'}} width="500"/>
1. Select one of the following:
   * **Export All (ZIP Format)**. Exports a tar.gz archive file.
       1. After export, you can open the archive, modify the configuration data, recreate a tar.gz archive, and upload it. To upload the file, click the **Import** icon.<br/><img src={useBaseUrl('img/cloud-soar/import-playbook.png')} alt="Import Playbook" style={{border: '1px solid gray'}} width="700"/>
       1. Select the desired file and click **Import**. <br/><img src={useBaseUrl('img/cloud-soar/import-playbook-modal.png')} alt="Import Playbook modal" style={{border: '1px solid gray'}} width="300"/>

       It is crucial that the file names inside the tar.gz adhere to the following format: `<unique_id>.<file_representing_name>.<file_type>.<file_extension>`, for example, `97ad7d6e.IP-Reputation.action.yaml`
   * **Export as JSON**. Exports a JSON file that you can use to manage the playbook with Terraform using the [sumologic_csoar_playbook](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/csoar_playbook) resource. 
        <TerraformLink/>


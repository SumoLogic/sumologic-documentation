---
id: automation-service-playbooks
title: Playbooks
sidebar_label: Playbooks
description: Learn about playbooks. A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ActionsLimit from '../../reuse/actions-limit.md';
import CartesianProduct from '../../reuse/cartesian-product.md';

A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type. Playbooks can allow your organization's teams to respond to an incident in a consistent, focused, and repeatable fashion.

Playbooks can be configured to execute automatically without user intervention, acting on information from the incident, or can be executed in interactive mode, where user input is required to authorize predefined actions.

To run a playbook, add it to an automation. For places in Sumo Logic where you can use add playbooks to automations, see [Where you can run automations](/docs/platform-services/automation-service/about-automation-service/#where-you-can-run-automations).  

:::note
<ActionsLimit/>
:::

## View playbooks

The following procedure describes how to view playbooks already installed in your environment. To add more playbooks, [create a playbook](#create-a-new-playbook), or [install a playbook from App Central](/docs/platform-services/automation-service/automation-service-app-central/#install-a-playbook-from-app-central).

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation > Playbooks**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Playbooks**. You can also click the **Go To...** menu at the top of the screen and select **Playbooks**.  <br/>The list of playbooks displays. <br/> <img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" style={{border:'1px solid gray'}} width="700"/>
1. Select a playbook to see the elements in the workflow.<br/><img src={useBaseUrl('img/cse/automations-open-playbook.png')} style={{border:'1px solid gray'}} alt="Opened playbook" width="700"/>
1. Click the elements in the playbook to see their details. For example, click actions (the boxes in the flow) to see the [integration](/docs/platform-services/automation-service/automation-service-integrations/) resources that provide the actions.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} style={{border:'1px solid gray'}} alt="Action example" width="700"/>

## Create a new playbook

Before you create your own playbook, first [view playbooks](#view-playbooks) to make sure there isn't one already that does what you want to accomplish, and also check to see if you can [install a playbook from App Central](/docs/platform-services/automation-service/automation-service-app-central/#install-a-playbook-from-app-central) that does what you need.

:::tip
The following procedure provides a brief introduction to how to create a playbook. For detailed examples of how to create playbooks, see the [Cloud SIEM automation examples](/docs/cse/automation/cloud-siem-automation-examples/).
:::

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Playbooks**. You can also click the **Go To...** menu at the top of the screen and select **Playbooks**.  <br/>Previously-created playbooks display.
1. Click the **+** button to the left of **Playbook**.<br/><img src={useBaseUrl('img/cse/automations-new-playbook-button.png')} style={{border:'1px solid gray'}} alt="New playbook button" width="400"/>
1. A new configuration box will be displayed. Name your new playbook.<br/><img src={useBaseUrl('img/cse/automations-new-playbook-dialog.png')} style={{border:'1px solid gray'}} alt="New playbook dialog" width="400"/>
1. Select the incident **Type**. (For example, for Cloud SIEM automations, select **CSE**. For playbooks run from inside another playbook, you can select another incident type to associate with it, for example, **Denial of Service**, **Malware**, **Phishing**, and so on.)
1. Enter a **Description** of the playbook to help others understand how to use it.
1. Click **Create**. The new playbook appears in the list of available playbooks.
1. To configure the new playbook, select it from the list and click the **Edit** button at the bottom of the screen.<br/><img src={useBaseUrl('img/cse/automations-new-empty-playbook.png')} alt="New playbook" style={{border:'1px solid gray'}} width="600"/>
1. The **Start** node displays a **+** icon and an **Edit** icon. Click the **Edit** icon.  <br/><img src={useBaseUrl('img/platform-services/automation-service/start-node.png')} alt="Start node" style={{border:'1px solid gray'}} width="100"/> <br/>The **Edit node** dialog appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/edit-start-node.png')} alt="Edit node dialog" style={{border:'1px solid gray'}} width="500"/>
1. Click the dropdown arrow on **Add one or more params as a playbook input** and select the kind of trigger that will execute the playbook:
    * **Insight**. An [Insight](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) from an [automation in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/).
    * **Entity**. An [Entity](/docs/cse/records-signals-entities-insights/view-manage-entities/) from an [automation in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/).
    * **Alert**. An [alert](/docs/alerts/) from an [automated playbook in a monitor](/docs/alerts/monitors/use-playbooks-with-monitors/).
    * **Parse from json**. A payload from a [parent playbook](/docs/platform-services/automation-service/automation-service-playbooks/#add-a-playbook-node-to-a-playbook). (You can also select this option if you want to pass a custom payload from an alert.)
    * Leave blank if the trigger will be a Cloud SOAR [incident or triage](/docs/cloud-soar/incidents-triage). <br/><img src={useBaseUrl('img/platform-services/automation-service/start-node-parameters.png')} alt="Types of start node parameters" style={{border:'1px solid gray'}} width="400"/>
1. When you select one of these options, standard parameters for the trigger type are displayed. (If you select **Parse from json**, a box appears for you to enter the JSON payload.) Click the **Remove** icon to remove any parameters you don't want passed into the playbook, and if you want to add more parameters, click **Add New Param** at the bottom of the dialog.
1. Click **Update**. The playbook will display a black screen with a **Start** node and an **End** node. These nodes dictate the beginning and the end of the playbook's automation sequence. You can drag and drop them anywhere on the screen to allow you space to add multiple nodes between them.
1. To add the first node in the playbook, click the **+** on the **Start** node. The **Add node** page is displayed.<br/><img src={useBaseUrl('img/cse/automations-add-node.png')} style={{border:'1px solid gray'}} alt="Add node" width="500"/>

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
1. Click **Get Value** and select from the drop-down menu whether the value will evaluate to **true (bool)**, **false (bool)**, or **empty**. You can also manually enter a value, such as a string or numeric literal.<br/><img src={useBaseUrl('img/cse/automations-add-condition-node-2.png')} style={{border:'1px solid gray'}} alt="Get values for the condition" width="500"/>
1. Under **Get value from a previous action**, select the value to feed into the condition. The example shows **Get Devices** and **Playbook inputs** that came from the previous action. (The condition must be linked by a line to the previous action node to receive outputs from the action.) Click the options from the previous action and select which output type (for example, hashes, IP addresses, domains) to evaluate and add it to the condition.
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
1. (Optional) Use **Split by** to select an output if it is a list (array) and you want to evaluate each item separately. See ["Split by" field in a filter node](#split-by-field-in-a-filter-node) for more information.
1. Configure the conditions you want to use for filtering.
1. Deselect the **Cartesian product** checkbox.
   :::warning
   <CartesianProduct/>
   :::
1. Click **Create**.

## Playbook versioning

### Autosave

Every time you edit a playbook draft, the draft is automatically saved, and the following notification briefly appears in the lower right corner of the playbook screen:<br/><img src={useBaseUrl('img/platform-services/automation-service/autosave-playbook-1.png')} alt="Playbook autosave" style={{border:'1px solid gray'}} width="200"/>

When the automatic save is complete, the following notification lets you know.<br/><img src={useBaseUrl('img/platform-services/automation-service/autosave-playbook-2.png')} alt="Playbook autosave complete" style={{border:'1px solid gray'}} width="200"/>

To enable or disable autosave, use [playbook preferences](#playbook-preferences).

### Versions

To publish a playbook so that others may use it, click the publish button at the bottom of the playbook screen.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-publish-button.png')} alt="Playbook publish button" style={{border:'1px solid gray'}} width="300"/>

Every time you publish a playbook, a new version of the playbook is retained. In the screen image below, notice how all the versions of the playbook are listed (#4 being the published version as indicated by the publish icon). Click on a version to edit it, and if you want, publish it. In this way, you maintain version control of your playbooks, and ensure that all versions are retained.

<img src={useBaseUrl('img/platform-services/automation-service/playbook-versions.png')} alt="Playbook versions" style={{border:'1px solid gray'}} width="800"/>

## Playbook preferences

1. Click the preferences button in the upper-right corner of the screen.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-preferences.png')} alt="Playbook preferences button" style={{border:'1px solid gray'}} width="200"/>
2. Configure preferences in the **Playbooks Preferences** screen.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-preferences-screen.png')} alt="Playbook preferences screen" style={{border:'1px solid gray'}} width="400"/>

### Autosave preference

Select **Enable Autosave for all playbooks** to ensure that while editing a playbook, all changes will be automatically saved to the draft. For more information, see [Autosave](#autosave).

## Import and export playbooks

With the mechanism to import and export playbooks, you can move a playbook, along with all its configurations, from one instance to another. The file should be in tar.gz format and adhere to naming conventions.

1. Click on the Export icon located next to the playbook name.<br/><img src={useBaseUrl('img/cloud-soar/export-playbook.png')} alt="Export Playbook" style={{border: '1px solid gray'}} width="500"/>
1. Upon clicking, the tar.gz archive download will be initiated.
1. At this point, you can open the archive, modify the configuration data, recreate a tar.gz archive, and upload it. To upload the file, click on the Import icon.<br/><img src={useBaseUrl('img/cloud-soar/import-playbook.png')} alt="Import Playbook" style={{border: '1px solid gray'}} width="700"/>
1. Select the desired file and click Import. <br/><img src={useBaseUrl('img/cloud-soar/import-playbook-modal.png')} alt="Import Playbook modal" style={{border: '1px solid gray'}} width="300"/>

It is crucial that the file names inside the tar.gz adhere to the following format: `<unique_id>.<file_representing_name>.<file_type>.<file_extension>`, for example, `97ad7d6e.IP-Reputation.action.yaml`

## Test a playbook

You can test a playbook to verify that it works properly. The test results show the outcome as if the playbook actually ran.

1. Select a playbook.
1. Click the kebab button in the upper-right corner of the UI.
1. Select **Run Test**. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-run-test.png')} alt="Run a playbook test" style={{border:'1px solid gray'}} width="600"/>
1. In the **Test playbook** dialog, enter the requested information and click **Run**. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-test-playbook.png')} alt="Test playbook" style={{border:'1px solid gray'}} width="600"/>
1. The results of the test are displayed in a new window labeled with the playbook name and **(RUN TEST)**. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-test-results.png')} alt="Test results" style={{border:'1px solid gray'}} width="600"/>
1. Click the clock icon in the upper-right corner to see the testing history. Select **Latest actions** to see test results for all the actions on the playbook, or select items on the list to see results for individual actions. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-test-results-filtered.png')} alt="Filtered test results" style={{border:'1px solid gray'}} width="600"/>

## Playbook payloads

When a playbook is run, a payload is passed from the initial object to the playbook (for example, from an alert, entity, or Insight). The variables in the payload can be assigned to parameters and used as inputs for different actions in the playbook. 

You select the initial object to use for the payload when you [create a playbook](#create-a-new-playbook). In the **Add one or more params as a playbook input** field, you select the kind of trigger that will execute the playbook: <br/><img src={useBaseUrl('img/platform-services/automation-service/start-node-parameters.png')} alt="Types of start node parameters" style={{border:'1px solid gray'}} width="400"/>
    * **Insight**. An [Insight](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) from an [automation in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/).
    * **Entity**. An [entity](/docs/cse/records-signals-entities-insights/view-manage-entities/) from an [automation in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/).
    * **Alert**. An [alert](/docs/alerts/) from an [automated playbook in a monitor](/docs/alerts/monitors/use-playbooks-with-monitors/).
    * **Parse from json**. A payload from a [parent playbook](/docs/platform-services/automation-service/automation-service-playbooks/#add-a-playbook-node-to-a-playbook). You can also select this option if you want to pass a custom payload from an alert.
    * Leave blank if the trigger will be a Cloud SOAR [incident or triage](/docs/cloud-soar/incidents-triage). 

:::note
If you are using [nested playbook nodes](/docs/platform-services/automation-service/automation-service-playbooks/#add-a-playbook-node-to-a-playbook), then you will need to configure the parameters of the Start Node in the child playbook to include the outputs of the parent playbook that are passed to the child playbook. It is not recommended to use parameter arrays (for example, `signals[].id`) as the Start Node parameters for the child playbook; you should use a standard parameter names instead (for example, `signals.id`).
:::

Following are examples of payloads from different trigger types:
* [Alert payload](#alert-payload)
* [Entity payload](#entity-payload)
* [Insight payload](#insight-payload)

### Alert payload

#### View an alert payload

1. Access the [alert list](/docs/alerts/monitors/alert-response/#alert-list).
1. Open an alert that uses a playbook.
1. On the alert details page, click the **Playbooks** button to see [automated playbooks](/docs/alerts/monitors/use-playbooks-with-monitors/#view-automated-playbooks-for-an-alert) attached to the alert. <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-in-alert-new.png')} alt="Playbook on an alert" style={{border: '1px solid gray'}} width="300"/>
1. Click the playbook name. The playbook opens in the Automation Service.
1. To view the playbook's payload, click **>** to the right of the playbook name. <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-in-alert-1-new.png')} alt="Open playbook payload" style={{border: '1px solid gray'}} width="800"/> <br/>The alert payload appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/alert-payload.png')} alt="Alert payload" style={{border: '1px solid gray'}} width="800"/>

#### Alert payload variables

 The following variables are passed in the payload from an alert to a playbook. 

| Variable | Description |
| :--  | :-- |
|`​​Id`|The unique identifier for alert that triggered the playbook.|
|`Name`|The name of the monitor.|
|`Query`|The query used in the monitor.|
|`QueryURL`|The URL to the logs or metrics query within Sumo Logic.|
|`AlertName`|The name of the alert.|
|`SourceURL`|The URL to the configuration or status page of the monitor in Sumo Logic.|
|`AlertGroup`|The alert grouping that triggered the alert, including associated values for that field.|
|`Description`|The description of the monitor.|
|`MonitorType`|The type of alert, either `Logs` or `Metrics`.|
|`ResultsJson`|JSON object containing the query results that triggered the alert.|
|`TriggerTime`|The date and time the query triggered the alert.|
|`TriggerType`|The status of the alert or recovery. Alert will have a status of `Normal`, `Critical`, `Warning`, or `Missing Data`. Recovery will have a status of `ResolvedCritical`, `ResolvedWarning`, or `ResolvedMissingData`.|
|`TriggerValue`|The value that triggered the alert.|
|`Notifications`|The details for the notifications configured in the monitor.|
|`NumRawResults`|Number of results returned by the search.|
|`DetectionMethod`|The type of detection method used to detect alerts. Values are based on static or outlier triggers and data type, either logs or metrics. The value will be `LogsStaticCondition`, `MetricsStaticCondition`, `LogsOutlierCondition`, `MetricsOutlierCondition`, `LogsMissingDataCondition`, or `MetricsMissingDataCondition`.|
|`NumQueryResults`|The number of results the query returned.|
|`SloDashboardURL`|The URL to the SLO dashboard.|
|`TriggerQueryURL`|The URL to the log search for the query that triggered the alert.|
|`AlertResponseURL`|The URL to the alert page for the corresponding alert ID.|
|`TriggerCondition`|The condition that triggered the alert.|
|`TriggerTimeRange`|The time range of the query that triggered the alert.|
|`ResultsJsonParsed`|The parsed fields from `ResultsJson`.|
|`AggregateResultsJson`|JSON object containing the query results that triggered the alert, along with aggregate values such as message count.|
|`customPlaceholderMap`|The parsed fields from `ResultsJson` and the aggregate values returned from the query. The fields specific to the query that triggered the alert can be referenced by using `customPlaceholderMap`. For example, if the result of the query includes a field named `user_name`, this can be referenced by calling `customPlaceholderMap[].user_name`.|
|`AggregateResultsJsonParsed`|The parsed fields from `AggregateResultsJson`.|

#### Alert payload example

```json
{
  "Id": "00000000016CCCDD",
  "Name": "Amazon Guard Duty Brute Force",
  "Query": "_sourceCategory=Labs/AWS/GuardDuty_V3 | parse \"{\\\"key\\\":\\\"Owner\\\",\\\"value\\\":\\\"*\\\"}\" as owner_key | json field=_raw \"service.action.networkConnectionAction.remotePortDetails.portName\"as port_name | json field=_raw \"service.action.networkConnectionAction.remotePortDetails.port\" as port | json field=_raw \"service.action.networkConnectionAction.remoteIpDetails.ipAddressV4\" as ip_address | json field=_raw \"accountId\", \"region\", \"partition\", \"id\", \"arn\", \"type\",\"service.serviceName\",\"service.detectorId\",\"service.action\",\"severity\",\"title\",\"description\", \"vpcId\", \"subnetId\", \"groupId\" , \"tags\", \"groupName\", \"resource.instanceDetails.instanceId\" as account_id, region, partition, id, arn, type, service_name, detector_id, action, severity, title, description, vpcId, subnetId , securityGroupId, tags, securityGroupName, instanceid nodrop  | where type matches \"*BruteForce*\" | count by instanceid, ip_address, port, port_name, owner_key",
  "QueryURL": "https://live.us2.sumologic.com/ui/index.html#/search/1IzrB2mrW6L7egF1GY3zwnqJW663xPamyh9oe1AcFBanRckiRpXQiuPU2hOngFWnHO9bOLhpZ1GnssHTKtQpcLPBAOBp8wwW9VerT83Fj77k6hXQqMl5lI3tqsPv5bMG",
  "AlertName": "Amazon GuardDuty Brute Force Finding",
  "SourceURL": "https://live.us2.sumologic.com/ui/#/alerts/unified-monitors/00000000000007A0?selectedRows=0000000000593B6D",
  "AlertGroup": "instanceid=i-F56tg45tty5gfgd45",
  "Description": "",
  "MonitorType": "Logs",
  "ResultsJson": "[{\"Count\":1,\"instanceid\":\"i-F56tg45tty5gfgd45\",\"ip_address\":\"78.24.180.93\",\"owner_key\":\"security@lxechip.com\",\"port\":\"22\",\"port_name\":\"SSH\"}]",
  "TriggerTime": "05/01/2024 02:08:46 PM CDT",
  "TriggerType": "Critical",
  "TriggerValue": 1,
  "Notifications": [
    {
      "notification": {
        "images": [],
        "subject": "Monitor Alert: {{TriggerType}} on {{AlertName}}",
        "actionId": -4194941809035894000,
        "jsonClass": "EmailAction",
        "ccRecipients": [],
        "templateName": "Default Unified Monitor Email With Alert Response Variables",
        "toRecipients": [
          "example@sumologic.com"
        ],
        "bccRecipients": [],
        "relatedContent": [],
        "emailBodyMessage": ""
      },
      "runForTriggerTypes": [
        "Critical"
      ]
    }
  ],
  "NumRawResults": "45",
  "DetectionMethod": "LogsStaticCondition",
  "NumQueryResults": "1",
  "SloDashboardURL": "",
  "TriggerQueryURL": "https://live.us2.sumologic.com/ui/index.html#/search/1IzrB2mrW6L7egF1GY3zwnqJW663xPamyh9oe1AcFBanRckiRpXQiuPU2hOngFWnHO9bOLhpZ1GnssHTKtQpcLPBAOBp8wwW9VerT83Fj77k6hXQqMl5lI3tqsPv5bMG",
  "AlertResponseURL": "https://live.us2.sumologic.com/ui/#/alert/00000000016CCCDD",
  "TriggerCondition": "ResultCount is Greater than 0.0 in the last 1440 minutes",
  "TriggerTimeRange": "04/30/2024 02:06:46 PM CDT to 05/01/2024 02:06:46 PM CDT",
  "ResultsJsonParsed": [
    {
      "port": "22",
      "Count": 1,
      "owner_key": "security@example.com",
      "port_name": "SSH",
      "instanceid": "i-F56tg45tty5gfgd45",
      "ip_address": "78.24.180.93"
    }
  ],
  "AggregateResultsJson": "[{\"Count\":1,\"instanceid\":\"i-F56tg45tty5gfgd45\",\"ip_address\":\"78.24.180.93\",\"owner_key\":\"security@lxechip.com\",\"port\":\"22\",\"port_name\":\"SSH\"}]",
  "customPlaceholderMap": [
    {
      "port": "22",
      "Count": "1",
      "_count": "1",
      "owner_key": "security@example.com",
      "port_name": "SSH",
      "instanceid": "i-F56tg45tty5gfgd45",
      "ip_address": "78.24.180.93"
    }
  ],
  "AggregateResultsJsonParsed": [
    {
      "port": "22",
      "Count": 1,
      "owner_key": "security@example.com",
      "port_name": "SSH",
      "instanceid": "i-F56tg45tty5gfgd45",
      "ip_address": "78.24.180.93"
    }
  ]
}
```

### Entity payload

#### View an entity payload

1. Open an [entity](/docs/cse/records-signals-entities-insights/view-manage-entities/) that uses playbooks (that is, that has [automations](/docs/cse/automation/automations-in-cloud-siem)).
1. Click the **Automations** button at the top of the entity details page to view the automations on the entity.  <br/><img src={useBaseUrl('img/platform-services/automation-service/automation-on-entity-in-cloud-siem.png')} alt="Automation on an Entity in Cloud SIEM" style={{border: '1px solid gray'}} width="800"/>
1. Click **View Playbook** on an automation. The automation's playbook opens in the Automation Service. 
1. To view the playbook's payload, click **>** to the right of the playbook name. <br/><img src={useBaseUrl('img/platform-services/automation-service/entity-playbook.png')} alt="Open playbook payload" style={{border: '1px solid gray'}} width="800"/> <br/>The entity payload appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/entity-payload.png')} alt="Entity payload" style={{border: '1px solid gray'}} width="800"/>

#### Entity payload variables

| Variable | Description |
| :-- | :-- |
| `​​Id` | The unique ID of the [entity](/docs/cse/records-signals-entities-insights/view-manage-entities) whose information is provided in the payload.|
| ​`name` | The entity’s name. ​|
| `tags`​ | [Tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules) attached to the entity.​ |
| `value` | The value of the entity. |
| `hostname` ​| The hostname of the entity (if the entity is an item that can have a hostname, such as a computer). ​|
| `lastSeen` ​| When the entity was last seen in a record. ​|
| `firstSeen` ​| When the entity was first seen in a record. ​|
| `inventory` ​| The [inventory source](/docs/cse/administration/inventory-sources-and-data/) for the entity (if it originated in an inventory). ​|
| `entityType` ​| The [type of entity](/docs/cse/records-signals-entities-insights/view-manage-entities/#about-entities). ​|
| `macAddress` ​| The [medium access control (MAC) address](https://en.wikipedia.org/wiki/MAC_address) assigned to the entity (if the entity is a piece of hardware). ​|
| `reputation` ​| The reputation score for the entity. ​|
| `sensorZone` ​| [Sensor zone](/docs/cse/administration/using-sensor-zones/) for the entity. ​|
| `criticality` | The [criticality](/docs/cse/records-signals-entities-insights/entity-criticality/) of the entity. |
| `isSuppressed` | Whether the [entity is suppressed](/docs/cse/records-signals-entities-insights/about-signal-suppression/#suppress-by-entity). |
| `activityScore` | The entity’s [activity score](/docs/cse/get-started-with-cloud-siem/insight-generation-process/#understanding-entity-activity-scores). |
| `recentSignalSeverity` | The most recent [severity](/docs/cse/get-started-with-cloud-siem/insight-generation-process/#about-insight-severity) of the signal that the entity appeared on. |

#### Entity payload example

```json
{
  "id": "_ip-198.51.100.0",
  "name": "198.51.100.0",
  "tags": [],
  "value": "198.51.100.0",
  "hostname": null,
  "lastSeen": "2024-08-30T13:36:18",
  "firstSeen": null,
  "inventory": [],
  "entityType": "_ip",
  "macAddress": null,
  "reputation": null,
  "sensorZone": null,
  "criticality": null,
  "isSuppressed": false,
  "activityScore": 12,
  "recentSignalSeverity": 12
}
```

### Insight payload

#### View an Insight payload

1. Open an [Insight](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) that uses playbooks (that is, that has [automations](/docs/cse/automation/automations-in-cloud-siem)).
1. Click the **Automations** button at the top of the Insight details page to view the automations on the Insight.  <br/><img src={useBaseUrl('img/platform-services/automation-service/insight-automation.png')} alt="Automations on an Insight" style={{border: '1px solid gray'}} width="800"/>
1. Click **View Playbook** on an automation. The automation's playbook opens in the Automation Service.  
1. To view the playbook's payload, click **>** to the right of the playbook name. <br/><img src={useBaseUrl('img/platform-services/automation-service/insight-playbook.png')} alt="Insight playbook" style={{border: '1px solid gray'}} width="800"/> <br/>The Insight payload appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/insight-payload.png')} alt="Insight payload" style={{border: '1px solid gray'}} width="800"/>

#### Insight payload variables

| Variable | Description |
| :-- | :-- |
| `​​id` | The unique ID of the [Insight](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/#insight-details-page) whose information is provided in the payload.
| `name` | The name of the Insight. |
| `tags` | [Tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules) attached to the Insight. |
| `orgId` | The ID of the Sumo Logic organization where the Insight originated. |
| `closed` | Whether the Insight is closed. |
| `entity` |  The [entity](/docs/cse/records-signals-entities-insights/view-manage-entities) the Insight fired on. |
| `source` |  The source of the Insight data. |
| `status` |  The current status of the Insight. |
| `created` | When the Insight was created. |
| `signals` |  The Signals in the Insight. |
| `assignee` | The analyst assigned to the incident. |
| `closedBy` | The analyst who closed the Insight (if it’s status is closed). | 
| `severity` | The [severity](/docs/cse/get-started-with-cloud-siem/insight-generation-process/#about-insight-severity) of the Insight. |
| `timestamp` | The timestamp when the Insight fired. |
| `assignedTo` | The analyst assigned to the incident. |
| `confidence` | If sufficient data is available, a [Global Confidence score](/docs/cse/records-signals-entities-insights/global-intelligence-security-insights/) for the Insight is shown. |
| `readableId` |  The human-readable ID of the Insight. |
| `resolution` | The [resolution](/docs/cse/administration/manage-custom-insight-resolutions/) of the Insight (if the Insight is resolved). |
| `description` | A description of the Insight. |
| `lastUpdated` | When the Insight was last updated. |
| `lastUpdatedBy` | The analyst who last updated the Insight. |
| `subResolution` | The [sub-resolution](/docs/cse/administration/manage-custom-insight-resolutions/) of the Insight (if the Insight is resolved and if a sub-resolution is applied). |
| `teamAssignedto` | The team the Insight is assigned to. |
| `timeToResponse` | The time it took to respond to the Insight. |
| `timeToDetection` | The time it took to detect the Insight. |
| `involvedEntities` | The entities involved in the Insight. |
| `timeToRemediation` | The time it took to resolve the Insight. | 

#### Insight payload example

```json
{
  "id": "8e965194-f2da-36e0-839d-c2bacffca684",
  "name": "Unspecified Malicious Activity",
  "tags": [
    "custom-tag",
    "dataComponent:File",
    "foo",
    "MITRE_Expansion_C2",
    "testtag"
  ],
  "orgId": "0000000006ACDE44",
  "closed": null,
  "entity": {
    "id": "_ip-192.0.2.0",
    "name": "192.0.2.0",
    "value": "192.0.2.0",
    "hostname": null,
    "entityType": "_ip",
    "macAddress": null,
    "sensorZone": ""
  },
  "source": "ALGORITHM",
  "status": {
    "name": "new",
    "displayName": "New"
  },
  "created": "2024-09-05T20:25:59.673356",
  "signals": [
    {
      "id": "d02c5f27-5925-54a0-b0dd-0fee9ee2de2d",
      "name": "CrowdStrike Aggregation Rule test signal",
      "tags": [],
      "stage": "Unknown/Other",
      "entity": {
        "id": "_ip-192.0.2.0",
        "name": "192.0.2.0",
        "value": "192.0.2.0",
        "hostname": null,
        "entityType": "_ip",
        "macAddress": null,
        "sensorZone": ""
      },
      "ruleId": "AGGREGATION-U07128",
      "created": "2024-09-05T20:20:51.904000",
      "severity": 4,
      "artifacts": [],
      "timestamp": "2024-09-05T20:20:51.904000",
      "contentType": "RULE",
      "description": "test description",
      "recordCount": 1,
      "recordTypes": [],
      "recordSearchDetails": {
        "query": "_index=sec_record_* | where (if (isNull(metadata_vendor), true, metadata_vendor != \"CrowdStrike\") and if (isNull(objectType), true, objectType != \"email\") and if (isNull(srcDevice_ip), false, srcDevice_ip == \"192.0.2.0\"))",
        "queryEndTime": "2024-09-05T20:24:00",
        "queryStartTime": "2024-09-05T19:24:00"
      }
    },
    {
      "id": "34b173fe-792b-55b0-8723-808ded9547ce",
      "name": "Exclude CrowdStrike and Email Chain Rule",
      "tags": [
        "custom-tag",
        "foo",
        "testtag"
      ],
      "stage": "Unknown/Other",
      "entity": {
        "id": "_ip-192.0.2.0",
        "name": "192.0.2.0",
        "value": "192.0.2.0",
        "hostname": null,
        "entityType": "_ip",
        "macAddress": null,
        "sensorZone": ""
      },
      "ruleId": "CHAIN-U07162",
      "created": "2024-09-05T20:20:51.904000",
      "severity": 4,
      "artifacts": [],
      "timestamp": "2024-09-05T20:20:51.904000",
      "contentType": "RULE",
      "description": "chain rule test description",
      "recordCount": 1,
      "recordTypes": [],
      "recordSearchDetails": {
        "query": "_index=sec_record_* | where ((if (isNull(metadata_vendor), true, metadata_vendor != \"CrowdStrike\") or if (isNull(objectType), true, objectType != \"email\")) and if (isNull(srcDevice_ip), false, srcDevice_ip == \"192.0.2.0\"))",
        "queryEndTime": "2024-09-05T20:24:00",
        "queryStartTime": "2024-09-05T19:24:00"
      }
    },
    {
      "id": "f7ee1ba7-fb69-51e3-8cbe-a7673e237dfe",
      "name": "CrowdStrike First Seen Rule test signal",
      "tags": [
        "testtag",
        "foo",
        "custom-tag"
      ],
      "stage": "Unknown/Other",
      "entity": {
        "id": "_ip-192.0.2.0",
        "name": "192.0.2.0",
        "value": "192.0.2.0",
        "hostname": null,
        "entityType": "_ip",
        "macAddress": null,
        "sensorZone": ""
      },
      "ruleId": "FIRST-U00161",
      "created": "2024-09-05T20:20:51.904000",
      "severity": 4,
      "artifacts": [],
      "timestamp": "2024-09-05T20:20:51.904000",
      "contentType": "ANOMALY",
      "description": "test description",
      "recordCount": 1,
      "recordTypes": [],
      "recordSearchDetails": null
    },
    {
      "id": "5f0db81c-c11a-5b13-b2e0-8a25de6ba376",
      "name": "Exclude CrowdStrike and Email Threshold Rule test",
      "tags": [
        "MITRE_Expansion_C2",
        "testtag",
        "dataComponent:File"
      ],
      "stage": "Unknown/Other",
      "entity": {
        "id": "_ip-192.0.2.0",
        "name": "192.0.2.0",
        "value": "192.0.2.0",
        "hostname": null,
        "entityType": "_ip",
        "macAddress": null,
        "sensorZone": ""
      },
      "ruleId": "THRESHOLD-U07169",
      "created": "2024-09-05T20:25:51.043000",
      "severity": 4,
      "artifacts": [],
      "timestamp": "2024-09-05T20:25:51.043000",
      "contentType": "RULE",
      "description": "Test Threshold rule",
      "recordCount": 1,
      "recordTypes": [],
      "recordSearchDetails": {
        "query": "_index=sec_record_* | where (if (isNull(metadata_vendor), true, metadata_vendor != \"CrowdStrike\") and if (isNull(objectType), true, objectType != \"email\") and if (isNull(srcDevice_ip), false, srcDevice_ip == \"192.0.2.0\"))",
        "queryEndTime": "2024-09-05T21:36:00",
        "queryStartTime": "2024-09-05T09:36:00"
      }
    }
  ],
  "assignee": null,
  "closedBy": null,
  "severity": "HIGH",
  "timestamp": "2024-09-05T20:25:51.043000",
  "assignedTo": null,
  "confidence": null,
  "readableId": "INSIGHT-637",
  "resolution": null,
  "description": "Unknown/Other",
  "lastUpdated": "2024-09-05T20:25:59.673351",
  "lastUpdatedBy": null,
  "subResolution": null,
  "teamAssignedTo": null,
  "timeToResponse": null,
  "timeToDetection": 307.769356,
  "involvedEntities": [
    {
      "id": "_ip-192.0.2.0",
      "name": "192.0.2.0",
      "value": "192.0.2.0",
      "hostname": null,
      "entityType": "_ip",
      "macAddress": null,
      "sensorZone": null
    },
    {
      "id": "_username-pete@tclab.us",
      "name": "pete@tclab.us",
      "value": "pete@tclab.us",
      "hostname": null,
      "entityType": "_username",
      "macAddress": null,
      "sensorZone": null
    },
    {
      "id": "_username-key--d2b90316--a1d3--492d--beb5--308184ab4973 (Sumo Logic API client (read only))",
      "name": "key-d2b90316-a1d3-492d-beb5-308184ab4973 (Sumo Logic API client (read only))",
      "value": "key-d2b90316-a1d3-492d-beb5-308184ab4973 (Sumo Logic API client (read only))",
      "hostname": null,
      "entityType": "_username",
      "macAddress": null,
      "sensorZone": null
    }
  ],
  "timeToRemediation": null
}
```

## Handling arrays in playbooks

An array is a collection of related data values grouped together. When you are handling output from a playbook action, you may want to treat the entire array as a single item you want to pass to the next action, or you may want to treat each element in the array as a separate item. In playbooks, you can do either.

### Arrays in text areas

When you create an action, sometimes you are presented with a text area that includes an "Insert placeholder" icon <img src={useBaseUrl('img/platform-services/automation-service/playbook-insert-placeholder-icon.png')} style={{border:'1px solid gray'}} alt="Insert placeholder icon" width="20"/>. When you click the icon, it allows you to add placeholders to the text area for input or output. 

Perform the following steps to add a placeholder to a text area to handle an array in output from a previous action. This allows you to process an array as a single element or multiple elements.
1. [Create a playbook](#create-a-new-playbook) and [add action nodes](#add-an-action-node-to-a-playbook).
1. Edit an action node that displays a text area. 
1. In the following example, the **Send Email** action shows text areas for the email's subject, body, and HTML. Click an "Insert placeholder" icon <img src={useBaseUrl('img/platform-services/automation-service/playbook-insert-placeholder-icon.png')} style={{border:'1px solid gray'}} alt="Insert placeholder icon" width="20"/> for one of the fields, for example, **HTML Content**.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-variables-in-text-boxes.png')} style={{border:'1px solid gray'}} alt="Insert placeholder icon" width="600"/>
1. Select a value from a previous action. In this example, we'll choose **Get Insight**.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-get-value-from-previous-action.png')} style={{border:'1px solid gray'}} alt="Get value from previous action" width="500"/>
1. Select **Outputs**. Only the arrays in the output show these icons: <img src={useBaseUrl('img/platform-services/automation-service/playbooks-output-arrays-icons.png')} style={{border:'1px solid gray'}} alt="Icons on arrays in output" width="60"/> <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-get-value-from-previous-action-2.png')} style={{border:'1px solid gray'}} alt="Get value from previous action outputs" width="500"/>
1. Click the icon for how you want the array to be handled by the action:
   * <img src={useBaseUrl('img/platform-services/automation-service/array-icon-loop.png')} style={{border:'1px solid gray'}} alt="Loop through elements in the array" width="30"/> **Loop**. Loops through the array so that the action is run for each item in the array.
   * <img src={useBaseUrl('img/platform-services/automation-service/array-icon-combine.png')} style={{border:'1px solid gray'}} alt="Combine all elements in the array" width="30"/> **Combine**. Combines all items in the array into a single value run by the action.
1. The variable is inserted into the text area preceded by the icon for whether the contents of the array are looped or combined.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-array-looped-example.png')} style={{border:'1px solid gray'}} alt="Example of looped array variable" width="700"/> 

In this example, the action will be run for each item in the array ("looped").

:::note
The [**Cartesian Product**](#cartesian-product) checkbox is disabled if any variable is selected using the loop feature in the text area.
<img src={useBaseUrl('img/platform-services/automation-service/playbook-cartesian-product-disabled.png')} style={{border:'1px solid gray'}} alt="Cartesian Product checkbox disabled" width="500"/> 
:::

### Cartesian product

The **Cartesian product** checkbox appears on nodes you add to playbooks. Clicking this checkbox causes the node to use the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) method to loop through items in arrays processed by the node.

<img src={useBaseUrl('img/platform-services/automation-service/playbooks-cartesian-product-checkbox.png')} style={{border:'1px solid gray'}} alt="Cartesian product checkbox" width="150"/> 

For example, suppose one input field is for signal name, and another is for signal value. If you have 2 arrays like this, and each array has 3 items, the Cartesian product evaluation pairs each item from the first set with each item from the second set, which will produce 9 pairs (3x3). Without Cartesian product evaluation, only matching position items are paired, which will produce 3 pairs (equal to the number of items).

:::warning
Use the **Cartesian product** checkbox with caution. For most cases, deselect the **Cartesian product** checkbox when creating playbooks. Large array fields in the input can result in the action being called many times, causing the action to exceed the [actions limit](/docs/platform-services/automation-service/about-automation-service/#actions-limit). Only select this checkbox if you want to evaluate data from array input fields using the Cartesian product method.
:::

### "Split by" field in a filter node

When you [add a filter node](#add-a-filter-node-to-a-playbook), use the **Split by** field to evaluate each item separately in arrays (lists).

<img src={useBaseUrl('img/platform-services/automation-service/playbook-split-by.png')} style={{border:'1px solid gray'}} alt="Split by field" width="700"/> 

Each item in arrays is checked against the filter condition. If the condition is true for an item, the item is passed to the next node. If you do not use the **Split by** field on an output that is a list, then if the condition is true for any item in the list, the entire list moves forward to the next node.

## Troubleshoot playbooks

You can run playbooks in automations for [monitors](/docs/alerts/monitors/use-playbooks-with-monitors/), [Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/), or [Cloud SOAR](/docs/cloud-soar/automation/). If a playbook has a problem when it runs in an automation, an error message often displays in the playbook providing information about the problem.

:::tip
To test a playbook before using it in an automation, see [Test a playbook](/docs/platform-services/automation-service/automation-service-playbooks/#test-a-playbook).
:::

### Open playbooks that require investigation

#### Open a playbook from an alert

1. Access the [alert list](/docs/alerts/monitors/alert-response/#alert-list).
1. Open an alert that uses a playbook.
1. On the alert details page, click the **Playbooks** button to see [automated playbooks](/docs/alerts/monitors/use-playbooks-with-monitors/#view-automated-playbooks-for-an-alert) attached to the alert. <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-in-alert.png')} alt="Playbook on an alert" style={{border: '1px solid gray'}} width="300"/>
1. Hover your mouse over the icon to the right of the playbook to see its status. In the example above, the playbook completed with errors.
1. To investigate the problem, click the playbook name. The playbook opens in the Automation Service and any issues display in the results section.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-in-alert-1.png')} alt="An alert playbook with errors" style={{border: '1px solid gray'}} width="800"/>

Proceed to [Investigate playbook problems](#investigate-playbook-problems) below to look into playbook problems.

#### Open a playbook from Cloud SIEM

1. Open an [Insight](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) or [Entity](/docs/cse/records-signals-entities-insights/view-manage-entities/) that uses playbooks (that is, that has [automations](/docs/cse/automation/automations-in-cloud-siem)).
1. Click the **Automations** button at the top of the page to view the automations on the Insight or Entity.  <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-in-cloud-siem.png')} alt="Cloud SIEM automations" style={{border: '1px solid gray'}} width="800"/>
1. Click **View Playbook** for a playbook you want to investigate. In the example above, the playbook we want to investigate completed with errors. The playbook opens in the Automation Service, and the issues display in the results section.  <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-in-cloud-siem.png')} alt="A Cloud SIEM automation playbook with errors" style={{border: '1px solid gray'}} width="800"/>

Proceed to [Investigate playbook problems](#investigate-playbook-problems) below to look into playbook problems.

#### Open a playbook from Cloud SOAR

1. Open an [Incident](/docs/cloud-soar/incidents-triage/#incidents).
1. On the [incident details](/docs/cloud-soar/incidents-triage/#incident-details) page, select **Operations > Playbooks**. Playbooks appear that have run for the incident. <br/><img src={useBaseUrl('img/platform-services/automation-service/playbooks-in-cloud-soar.png')} alt="Playbooks on an incident in Cloud SOAR" style={{border: '1px solid gray'}} width="800"/>
1. Click **Graph View** in the upper-right and click **>** to page through the playbooks. <br/><img src={useBaseUrl('img/platform-services/automation-service/cloud-soar-playbooks-graph-view.png')} alt="Playbook in graph view in Cloud SOAR" style={{border: '1px solid gray'}} width="800"/>
1. Click a node on the playbook that displays an error.

Proceed to [Investigate playbook problems](#investigate-playbook-problems) below to look into playbook problems.

### Investigate playbook problems

After you have [opened a playbook that requires investigation](/docs/platform-services/automation-service/automation-service-playbooks/#open-playbooks-that-require-investigation), follow the steps below to investigate problems with the playbook.

1. The **Filtered Results** section shows the status of actions that ran on the playbook. The example below shows two failed actions that require investigation. <br/><img src={useBaseUrl('img/platform-services/automation-service/failed-actions-in-filtered-results.png')} alt="Failed actions on a playbook" style={{border: '1px solid gray'}} width="800"/>
1. Click an action for an explanation of the problem. <br/><img src={useBaseUrl('img/platform-services/automation-service/reason-for-failed-action.png')} alt="Reasons for failed actions on a playbook" style={{border: '1px solid gray'}} width="800"/>
1. For more detailed information about the action, click the **Graph View** in the upper right and then click on the action. A pane opens that displays more information about the action. <br/><img src={useBaseUrl('img/platform-services/automation-service/failed-action-in-graph-view.png')} alt="Failed action in playbook graph view" style={{border: '1px solid gray'}} width="800"/>
1. Sometimes the playbook's payload will provide more information about why an action has a problem. To view the playbook's payload, click **>** to the right of the playbook name. <br/><img src={useBaseUrl('img/platform-services/automation-service/arrow-on-playbook.png')} alt="Open playbook payload" style={{border: '1px solid gray'}} width="300"/>
1. Examine the [playbook payload](#playbook-payloads) for information that might help you resolve the problem. For example, the payload may be able to tell you if a field has not been properly passed from a previous action, or a field was unintentionally left blank that the action requires.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-payload.png')} alt="Playbook payload" style={{border: '1px solid gray'}} width="300"/>
1. Based on what you uncover during investigation, you may need to make changes to the playbook and then [test the playbook](#test-a-playbook) to ensure it works correctly.


### Common playbook problems

Following are some common problems that can occur with playbooks:
* **No response from the bridge**<br/>The [automation bridge](/docs/platform-services/automation-service/automation-service-bridge/) is offline, or the bridge does not have the egress firewall settings to handle the outbound request.
* **API rate limiting issues** <br/>The vendor has capped the number of requests that can be made to their API in a certain time frame.
* **HTTPS connection pool issues** <br/>There are no available connections at the vendor, usually indicative of a vendor API health issue.
* **A required field is empty that the action is looking for** <br/>A field has not been properly passed from a previous action, or a field was unintentionally left blank that the action requires.
* **Permission denied** <br/>The API key is incorrect on the [integration resource](/docs/platform-services/automation-service/about-automation-service/#configure-the-connection-for-an-integration-resource), or the account running the playbook has invalid credentials or insufficient permissions.
* **You have exceeded the actions limit** <br/>The number of actions that your organization can run per hour is limited to a certain threshold. Any actions that are launched beyond this [actions limit](/docs/platform-services/automation-service/about-automation-service/#actions-limit) will not run. You might exceed the limit if:
    * There are alert surges. <br/>
    * The playbook is not optimized properly and actions are stuck in a loop.
    * There are Cartesian flag issues (too many nested elements to process as part of the returned API result).

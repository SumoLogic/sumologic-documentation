---
id: automation
title: Cloud SOAR Automation
sidebar_label: Automation
description: Configuration tools for Cloud SOAR automation and orchestration features.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

The **Automation** section contains the configuration tools for Cloud SOAR's automation and orchestration features. These tools include Cloud SOAR's Open Integration Framework (OIF), automation rules sets, and playbook editor as well as incoming event details.

To access this section, click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) > **Automation**.

## App Central

App Central allows you to unlock the full Cloud SOAR potential. From this section, you can search and add new integrations, new playbooks, and even complete use cases with all the components needed (automation rules, integrations and playbooks) in one place.

While browsing available integrations, you can check the details and all the actions available and install it.

For a complete list of integrations and their documentation, see [Integrations in App Central](/docs/platform-services/automation-service/app-central/integrations).

### App Central UI

<img src={useBaseUrl('img/cloud-soar/appcentral.png')} alt="App Central" style={{border: '1px solid gray'}} width="800"/>

1. **Playbooks**. Click to view [playbooks](#playbook) in App Central that are available to install.
1. **Integrations**. Click to view [integrations](#integrations) in App Central that are available to install.
1. **Search**. Search for integrations or playbooks to install.
1. **Current hour actions count**. Shows how many playbook actions have been executed in the current hour in your organization. By default, the actions limit is set to 200 per hour. For more information, see [Actions limit](#actions-limit).
1. **Install**. Click to install an integration or install a playbook. Once an integration is installed, the text changes to **Installed**. If an update of the integration is available, the text changes to **Update**.

#### Actions limit

To prevent abuse of system resources or runaway processes, Cloud SOAR limits the number of playbook actions your organization can execute to 200 per hour by default. To see how many actions your organization has used in the current hour, see the **Current hour actions count** in the [App Central UI](#app-central-ui). All actions running in the cloud or via the bridge are included in this limit.

import ActionsLimitQuery from '../reuse/actions-limit-query.md';

<ActionsLimitQuery/>


### Install an integration from App Central

1. Use the **Search** bar in the upper right of the **Integrations** tab to find integrations.
1. Click **Download** in the lower left corner of the integration box.
1. Click **Install** to install the integration. After installation is complete, **Installed** replaces the **Download** link in the corner of the integration box.
1. Find the article for the integration in [Integrations in App Central](/docs/platform-services/automation-service/app-central/integrations/) to see if there are additional steps you need to follow to configure the installed integration.
   :::warning
   Failure to perform these additional steps may result in the integration not working properly.
   :::

### Update an integration from App Central

Integrations in App Central display a version number. The version indicates when there is a change to the integration. If a newer version is available, you can  update the integration from  App Central by clicking **UPDATE**.<br/><img src={useBaseUrl('img/cloud-soar/integration-update.png')} alt="Update integration" width="400"/>

As soon as you click **UPDATE**, the new version is present inside the Integration section.

Following is an example of integration code before updating the integration:<br/><img src={useBaseUrl('img/cloud-soar/integration-update-before.png')} alt="Before update>" width="800"/>

Following is an example of integration code after updating the integration:<br/><img src={useBaseUrl('img/cloud-soar/integration-update-after.png')} alt="After update" width="800"/>

### Update integrations to include all available actions

The purpose of this section is to provide you the information you need to update your integrations to include all types of actions that should be present in that integration, for example, Containment, Custom, Scheduled, and so on. It's a good idea to update every integration installed from App Central to make sure you do not have any integrations without useful actions.

Update integrations in App Central using keywords in the bottom left corner of the integration:
* **UPDATE**. Appears on the installed integrations if there is a new version of that integration and with a new YAML configuration file. <br/><img src={useBaseUrl('img/cloud-soar/new-integration-update.png')} alt="Update" width="300"/>
* **INSTALLED**: Appears when the integration is installed and updated to the latest version, and with the correct actions.<br/><img src={useBaseUrl('img/cloud-soar/integration-installed.png')} alt="Installed" width="300"/>
* **DOWNLOAD**. Appears if this integration is not yet installed.<br/><img src={useBaseUrl('img/cloud-soar/integration-download.png')} alt="Download" width="300"/>

#### Update an installed integration to show all actions

Here an example of updating an installed integration.

1. In the Integrations section, check the actions present on the installed integration. In the example below, the only types of actions in the integration are Enrichment and Notification. <br/><img src={useBaseUrl('img/cloud-soar/installed-integration.png')} alt="Installed integration" width="800"/>
1. Go to App Central and search for the same integration. Click the integration. <br/><img src={useBaseUrl('img/cloud-soar/installed-detail.png')} alt="Installed integration" width="300"/>
1. On the dialog that appears, click **INSTALL**. <br/><img src={useBaseUrl('img/cloud-soar/install-already-installed-integration.png')} alt="Already installed integration" width="400"/>
1. Go to the Integrations section and select the same integration. As you see in the image below, the Containment action type was added to the two types of actions that were there previously. <br/><img src={useBaseUrl('img/cloud-soar/integration-with-all-actions.png')} alt="All actions installed" width="800"/>

#### Update an integration with a new version to show all actions

If there are two different versions between the integration installed and that in App Central, the type of operation required to update the integration is **UPDATE**.
1. In the Integrations section, open the installed integration in code mode to view the version. <br/><img src={useBaseUrl('img/cloud-soar/integration-code-mode.png')} alt="Integration code mode" width="800"/>
1. Go to App Central and search for the same integration. Click **UPDATE**. <br/><img src={useBaseUrl('img/cloud-soar/integration-update-version.png')} alt="Integration update version" width="300"/>
1. On the dialog that appears, click **Update**.  <br/><img src={useBaseUrl('img/cloud-soar/integration-update-2.png')} alt="Integration update" width="400"/>
1. Go back to the Integrations section at the end of the update operation. Open the integration and check the if the version of that integration updated. <br/><img src={useBaseUrl('img/cloud-soar/integration-update-complete.png')} alt="Integration update complete" width="700"/>
1. Check in the integration detail to see if it shows all the types of actions we expect. <br/><img src={useBaseUrl('img/cloud-soar/integration-all-actions.png')} alt="Integration with all actions" width="600"/>

### Certified integrations

Certified integrations are those that are provided by Sumo Logic. 

:::note
Only certified integrations can be executed in the cloud, while custom integrations must be executed through the Automation Bridge. For more information, see [Cloud or Bridge execution](#cloud-or-bridge-execution). 
:::

After you download an integration from App Central, you will see it in the Integrations section designated by a **Certified Integration** check mark.<br/><img src={useBaseUrl('img/cloud-soar/integration-certified.png')} alt="Certified integration" width="400"/>

After you select the integration resource and click the **View Code** button, the certified integration code is set to read-only mode. The certified integrations code can’t be edited using the Cloud SOAR internal IDE. This is also true for the actions available for that integration.<br/><img src={useBaseUrl('img/cloud-soar/integration-certified-2.png')} alt="Certified integration message in resource code" width="600"/>

Following is an example of a certified action.<br/><img src={useBaseUrl('img/cloud-soar/integration-certified-action.png')} alt="Certified action" width="600"/>

You can add one or more resources to the certified integration (as explained in [Integrations](/docs/cloud-soar/automation#integrations)), or you use it as-is.

### Duplicate an integration

To modify an integration's resource code and actions code, you must first duplicate the integration and make your modifications in the duplicated version. When you click the **Duplicate integration** button, a new integration will be created in the integrations list with an incremented name. <br/><img src={useBaseUrl('img/cloud-soar/integration-duplicate.png')} alt="Duplicate certified integration" width="600"/>

Following is a duplicated integration:<br/><img src={useBaseUrl('img/cloud-soar/integration-duplicated.png')} alt="Duplicated integration" width="250"/>

If the certified integration resource was configured before the duplication process, all the settings will be saved and replicated inside the duplicated integration. There is no need to reset the duplicated integration.

In the following example, the integration resource received an incremented name, but not the actions available for that integration. This facilitates the automation process and helps prevent confusion.<br/><img src={useBaseUrl('img/cloud-soar/integration-duplicated-resources-actions.png')} alt="No changes to duplicated resource actions" width="600"/>

Since only the duplicated integration can be modified, the actions name represents the activity that the action will perform, whether it is modified or not. While building playbooks, you can choose which resource you want to use. If the duplicated resource is chosen, the actions available will be the ones belonging to the duplicated resource.

Following is an example of selecting the action’s resource while building a playbook. The selected action is **Add Comment To Issue**.<br/><img src={useBaseUrl('img/cloud-soar/integration-add-comment-to-issue.png')} alt="Add comment to issue" width="600"/>

### Publish an integration

If you create a custom integration that you would like to make available for others to use, you can submit it to Sumo Logic for review and publication in App Central. This will allow everyone to install and run the integration in the cloud without having to use the Cloud SOAR Bridge.

The integration should be for a commercial product for which no integration exists in App Central, or be a general purpose integration. Sumo Logic will not add integrations to App Central that can only be used by one customer. 

1. Ask your Sumo Logic account representative to engage the Professional Services team. The Professional Services team member will guide you through the process of submitting an integration for publication in App Central. 
1. Select **Automation** from the gear icon in the upper-right corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-automation-menu.png')} alt="Access Automation" width="150"/>
1. Select **Integrations** from the navigation menu at the left of the screen.
1. Select your custom integration.
1. Hover the mouse over your custom integration and click the **Export** button that appears to the right. This exports the integration's YAML files to a tar.gz archive file.<br/><img src={useBaseUrl('img/cloud-soar/export-button.png')} alt="Export button" width="100"/>
1. Provide the tar.gz archive file containing your custom integration's YAML files to the Professional Services team member. 

Sumo Logic will validate the integration, and work with you to make any updates if needed. If the integration is approved, Sumo Logic will add it to App Central.  

## Playbook

A **Playbook** is a predefined set of actions or tasks to respond to a certain event or incident type. The creation and utilization of playbooks can allow an organization's teams to respond to an incident in a consistent, focused, and repeatable fashion.

Playbooks are automated workflows which can be configured to execute automatically without user intervention, acting on information from the incident, or can be executed in interactive mode, where user input is required to authorize predefined actions.

Watch this micro lesson to learn how to create custom playbooks.

<Iframe url="https://www.youtube.com/embed/pcDm71wGyGs?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

### Configure a new playbook

1. Click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) > **Automation**. A list of any previously created Playbooks will be displayed on the left side of the page. 
1. At the top of the screen next to **Playbook**, click **+** to add a new playbook. <br/>A new configuration box will be displayed. 
1. Name your new playbook, select the **Type** to associate with it, and click **Create**. 
1. Once the new playbook has been saved, it will be displayed on the left side of the screen. To begin to configure the new playbook, select it from the list and click the **Edit** button at the bottom of the screen. 
1. Opening the playbook will present a black screen with a **Start** node, and an **End** node. These nodes dictate the beginning and the end of the playbook's automation sequence. They can be dragged and dropped anywhere on the screen to allow for multiple integrations and conditional statements to be executed.<br/><img src={useBaseUrl('img/cloud-soar/image72.png')} alt="Empty playbook" width="800"/>
1. To begin to add the first node within the new playbook, hover your mouse over the **Start** node and click the **+** button that appears. <br/><img src={useBaseUrl('img/cloud-soar/image73.png')} alt="New playbook" width="800"/> <br/>The Add Node dialog is displayed. <br/><img src={useBaseUrl('img/cloud-soar/add-node-dialog.png')} alt="Add node dialog" width="500"/>
1. Click one of the following types to add a node to the playbook:
    * [**Action**](#action): Automatically take specific actions such as enriching data or taking containment steps when an Incident Template is matched.
    * [**Task**](#task): Assign a task to an Cloud SOAR user.
    * [**Condition**](#condition): Use conditional statements to define what actions should be taken in response to previous input/output feeds.
    * [**User Choice**](#user-choice): Pause automatic processing to allow for manual intervention.
    * [**Filter**](#filter): Filter results from the preceding action. (You can only add a filter node after an action node.)
    * **Playbook**: Call other playbooks in response to conditional statements or user choice actions.

#### Action

Select **Action** from the node types.

<img src={useBaseUrl('img/cloud-soar/image74.png')} alt="Node Adding" width="500"/>

A new screen will be displayed showing all actions a user has to choose from.

<img src={useBaseUrl('img/cloud-soar/image75.png')} alt="Node Adding" width="500"/>

These action types will directly interact with Cloud SOAR's integrations to either gather data or initiate actions automatically. Select the **Type** of action:
   * **Containment**. Performs some sort of response or remediation action, such as resetting a user's password or blocking a domain on your firewall.
   * **Custom**. Performs an action defined in a custom action YAML file. For an example of a custom action created for Cloud SIEM, see [Advanced example: Configure a custom integration](/docs/cse/automation/cloud-siem-automation-examples/#advanced-example-configure-a-custom-integration).
   * **Enrichment**. Enriches data with additional information, such as adding information about a known malicious IP address.
   * **Notification**. Sends a notification, for example, an email or a post in a messaging service.
   * **Scheduled**. Runs an action on a schedule once the playbook starts. For example, the action regularly checks a condition, and once the condition is met, the next playbook actions are executed.
   :::note
   The **Type** drop-down menu shows only the action types available in the selected integration.
   :::

As an example, lets choose Enrichment from the action type screen. As with any action type we choose, a new section will be added to our configurations screen asking for more clarifying information on how we would like this action to be performed.

Title the enrichment action something that can easily be identified by the action that is being taken, such as **Domain Reputation Check**. Next, we want to choose the action, expand the **Action** dropdown list and review the available options.

<img src={useBaseUrl('img/cloud-soar/image76.png')} alt="Node Creation" width="500"/>

<img src={useBaseUrl('img/cloud-soar/image77.png')} alt="Node Resource Adding" width="500"/>

Expand the **Resource** dropdown list to view all active Integration feeds. The feeds found in each action type are those who can execute the specified action (i.e. blocking of an IP address can be done through firewalls/WAFs, etc.). Once a resource is assigned a new dropdown list will be displayed. Options found in this list are comprised of **Incident Artifact** fields, which are the incident fields Cloud SOAR parses out when issuing new incidents.

Continuing from the example above, an Enrichment action is being called to gather Domain Reputation information from VirusTotal for the domain observed in the Incident. Once all enrichment variables are identified, click ****Create**** to continue.

The newly added node will now be visible in playbook configuration screen. To add an additional node hover over the newly created enrichment task. A menu bar will be displayed at the bottom of the node, click **+** to add a new node, the pencil icon to edit the existing node, or the trash can to delete the existing node.

<img src={useBaseUrl('img/cloud-soar/image78.png')} alt="Node menu" width="600"/>


#### Task

From the node selection menu, choose **Task**. A new configuration screen will be displayed. Title the new task and add any description if desired. The next dropdown lists are **Authorizer** and **Owner** fields. The **Authorizer** field is the user who is assigning the task, and the **Owner** field is the user who will be assigned the task to complete. When the task has been developed, click **Create**.

<img src={useBaseUrl('img/cloud-soar/image79.png')} alt="Task Node" width="600"/>            

For playbook entities which support user-defined text input, such as email notifications, help desk ticket creation and task creation, variable placeholders may be added to the user defined text which will be replaced with incident variables at run time. These variable placeholders may be added by clicking on the <img src={useBaseUrl('img/cloud-soar/image80.png')} alt="Placeholder icon" width="25"/> icon. To add a variable placeholder, begin typing in the newly inserted placeholder box and Cloud SOAR will display a list of available options which match. For example, typing **incident**. will display a list of all the valid incident fields which may be added as variable placeholders.

#### Condition

From the node's menu, choose **Condition**. A new configuration screen will be displayed which will enable a user to define a conditional statement to be met before the next node type can be executed. Under **Condition 1,** click on **Select a value** to define the first condition.

<img src={useBaseUrl('img/cloud-soar/image81.png')} alt="Condition Node" width="600"/>    

<img src={useBaseUrl('img/cloud-soar/image82.png')} alt="Condition Node" width="600"/>   

When developing the first condition, users have multiple options to choose from:

- **Insert a custom value**. Will execute when a user-defined variable is observed within an Incident.
- **Get value from an Incident field**. Will execute when a value is observed within an Incident Field (see [Incident Fields](#custom-fields)).
- **Get value from Triage Field**. Will execute when a value is observed within a Triage Field (see [Triage Fields](#triage-1)).
- **Get value from previous action**. Will execute when a value is observed from a previous input or output field.

From our earlier example, we are going to choose to evaluate the output from our Domain Reputation check of the observed domain. Click **Output** from **Get value from previous action**.

A list of available results or outputs from the previously selected integration will be displayed in JSON format. Select which output type (e.g., hashes, IP addresses, domains) to evaluate and add it to the condition.

<img src={useBaseUrl('img/cloud-soar/image83.png')} alt="Node Placeholder Function" width="600"/>   

The selected output type will be displayed under **Condition 1**. Select which condition you would like for the output results to meet from the inequality operators below and click **Select a value** to define the
condition.

<img src={useBaseUrl('img/cloud-soar/image84.png')} alt="Condition Node Settings" width="600"/>   

The condition we want to meet for this example is "Advance this Incident forward if the observed domain returns at least 1 result or **row** from VirusTotal". We insert **0** into the custom value field and click **+** to
add it to the condition.

<img src={useBaseUrl('img/cloud-soar/image85.png')} alt="Manual Value Adding" width="600"/>   

Now that **Condition 1** is defined*,* users can choose to filter their results further by selecting an AND/OR operator to define another condition.

<img src={useBaseUrl('img/cloud-soar/image86.png')} alt="Condition Settings" width="600"/>   

Once the condition is defined, click **Create** to add it to the playbook.

When new conditions are created, we will need to define what happens when their results meet one of our criteria. A new node is added to the condition below. This node breaks the condition down into successes and failures and can be modified by hovering over it and clicking **+**.

<img src={useBaseUrl('img/cloud-soar/image87.png')} alt="Use of Condition" width="600"/>

This new node represents a decision tree in which both results, success or failure, will have to be defined. Follow the steps above to finalize the condition.

<img src={useBaseUrl('img/cloud-soar/image88.png')} alt="Nodes List" width="600"/>

#### User Choice

From the node's menu, select **User Choice**. The User Choice option allows for the system to pose a question to the incident owner. Based off of the analysis the incident owner performs on the previous information
gathered, they will be presented a choice to take an automated action such as blocking an IP at the firewall or Quarantining an end-user workstation from the network.

<img src={useBaseUrl('img/cloud-soar/image89.png')} alt="User Choice" width="600"/>

<img src={useBaseUrl('img/cloud-soar/image90.png')} alt="Response" width="800"/>

Define the question to be answered and the authorizer of the user choice selection and click ****Create**** to finalize.

#### Filter

A filter node filters results from the preceding action based on the condition you write. You can only add a filter node after an action node. 

For example:
* The action node feeding into the filter has 10 results, but you want to filter out all but the best two results. You can write a condition in the filter to do the filtering. 
* You want to pass specific output to another action node. Define the output in the filter, and define the corresponding input in the receiving action node. You could also use a filter like this to pass input to a nested playbook.

1. Hover your mouse over an action node and click the **+** button. <br/><img src={useBaseUrl('img/cloud-soar/add-node-button.png')} alt="Add node button" style={{border:'1px solid gray'}} width="200"/> <br/>The available nodes are displayed. <br/><img src={useBaseUrl('img/cloud-soar/add-filter-node.png')} alt="Add filter node" style={{border:'1px solid gray'}} width="500"/>
1. Click **Filter**. The filter node configuration dialog displays. <br/><img src={useBaseUrl('img/cloud-soar/configure-filter-node.png')} alt="Configure filter node conditions" style={{border:'1px solid gray'}} width="500"/>
1. Configure the conditions you want to use for filtering. These are similar to the conditions you can configure on the [condition node](#condition).
1. Click **Create**.

### Playbook execution

The results of execution - successes, failures, and outcomes - are visible the Playbook's individual node details. The results of enrichment, containment and custom Playbook actions undertaken on incident artifacts, e.g., IP addresses, URLs, domains, etc., are catalogued in the incident's **Entities** module.

If a playbook fails, it can be re-executed inside the incident again or on the failing node with the Kill <img src={useBaseUrl('img/cloud-soar/image33c.png')} alt="Kill option" width="200"/>  and Run <img src={useBaseUrl('img/cloud-soar/image33d.png')} alt="Run option" width="200"/> processes available in the playbook screen of the incident. However, a failed node will not stop the playbook from being executed. Only tasks and User Choices will lock the playbook in a **Running** state until the user takes action.

<img src={useBaseUrl('img/cloud-soar/image33e.png')} alt="Status running" width="800"/>

<img src={useBaseUrl('img/cloud-soar/image33e1.png')} alt="Status completed" width="400"/>


### Playbook template

When a Playbook is assigned to an incident, these predefined actions and tasks can be converted to actual tasks within Cloud SOAR for assignment to users and oversight by management. Each individual task can be assigned attributes, such as who it is assigned to, who has authorized the task, and when it is due. A **Playbook Template** permits administrators to predefine some of these attributes based on an existing Playbook so that they appear as defaults when the Playbook Template is utilized.

Playbooks are the core of Cloud SOAR's automation capabilities. Playbooks permit administrators to create automated and semi-automated workflows utilizing Cloud SOAR integrations, tasks and a variety of flow control decisions and other actions.

**playbook** workflows can be configured to execute automatically without human intervention, or can be executed in an interactive mode, where user input is required to authorize predefined actions.

### Nest playbooks

To run a playbook inside another playbook:
1. Click **+** on a node in a playbook.
1. In the **Add Node** dialog, select **Playbook**. <br/><img src={useBaseUrl('img/cloud-soar/add-playbook-node.png')} alt="Add a playbook node" width="400"/>
1. Select the nested playbook from the list of available playbooks.

#### Pass attributes to a nested playbook

*(Applies only to organizations running the non-SaaS version of Cloud SOAR.)*

When you nest a child playbook within a parent playbook, you must pass parameters from the parent to the child to be utilized within the child playbook actions.

1. Select the playbook (the child) you want to nest within another playbook.
1. Click the three-dot kebab menu icon in the upper-right corner of the child playbook, select the **Nested** option, and click **Save**. This tags the playbook as a child and prevents adhoc testing against the child, since it will rely upon the parent to provide it inputs. <br/><img src={useBaseUrl('img/cloud-soar/playbook-nested-option.png')} alt="Nested option" width="500"/> 
1. Click the **Edit** button at the bottom of the screen, then the **Edit** button on the **Start** node. <br/><img src={useBaseUrl('img/cloud-soar/playbook-start-node.png')} alt="Start node" width="100"/>
1. Add the parameters you would like your child playbook to receive from the parent. These can be arbitrary names and do not need to be aligned to any field schema. They will be mapped from the parent nodes. <br/><img src={useBaseUrl('img/cloud-soar/playbook-parameters.png')} alt="Add parameters" width="500"/>
1. It’s important that your child nodes make use of these parameters. These will be accessible by editing your relevant child nodes, selecting the cog wheel, and selecting the relevant playbook input. In the example below, we use the playbook ID input parameter that will come from the parent. <br/><img src={useBaseUrl('img/cloud-soar/playbook-edit-parameters.png')} alt="Edit parameters" width="500"/>
1. Save and publish your child playbook.
1. Navigate to your parent playbook. Add a new node. <br/><img src={useBaseUrl('img/cloud-soar/playbook-add-node.png')} alt="Add node" width="350"/>
1. Select **Playbook**. <br/><img src={useBaseUrl('img/cloud-soar/playbook-add-node-2.png')} alt="Select Playbook" width="150"/>
1. Select your child playbook. <br/><img src={useBaseUrl('img/cloud-soar/playbook-select-child-playbook.png')} alt="Select child playbook" width="500"/>
1. You will see the parameters that you had set from your child playbook. Use the cog wheel to set these parameters based on your parent action nodes. <br/><img src={useBaseUrl('img/cloud-soar/playbook-parent-parameters.png')} alt="Parent playbook parameters" width="500"/>
1. Save and publish your parent playbook.

You will now be able to perform tests against your parent playbook, and your child playbook will receive the parameters from the parent.

### Import and export playbooks

With the mechanism to import and export playbooks, you can move a playbook, along with all its configurations, from one instance to another. The file should be in tar.gz format and adhere to naming conventions.

1. Click on the Export icon located next to the playbook name.<br/><img src={useBaseUrl('img/cloud-soar/export-playbook.png')} alt="Export Playbook" style={{border: '1px solid gray'}} width="500"/>
1. Upon clicking, the tar.gz archive download will be initiated.
1. At this point, you can open the archive, modify the configuration data, recreate a tar.gz archive, and upload it. To upload the file, click on the Import icon, select the desired file, and click Import.<br/><img src={useBaseUrl('img/cloud-soar/import-playbook.png')} alt="Import Playbook" style={{border: '1px solid gray'}} width="500"/><br/><img src={useBaseUrl('img/cloud-soar/import-playbook-modal.png')} alt="Import Playbook modal" style={{border: '1px solid gray'}} width="500"/>

It is crucial that the file names inside the tar.gz adhere to the following format: `<unique_id>.<file_representing_name>.<file_type>.<file_extension>`, for example, `97ad7d6e.IP-Reputation.action.yaml`

### Testing playbooks

It is possible to perform a test run to verify the proper functioning of a playbook, either a revision or published.
To do this, simply click on the icon with the 3 dots, then click on Run Test.<br/><img src={useBaseUrl('img/cloud-soar/playbook-run-test-option.png')} alt="Run test option" style={{border: '1px solid gray'}} width="800"/><br/>Upon clicking, a modal will be opened, where you can choose the type of Input in case the playbook is expecting data.
Once the necessary data is entered, clicking the RUN button will open a new page with run details.<br/><img src={useBaseUrl('img/cloud-soar/playbook-run-test-modal.png')} alt="Run test modal" style={{border: '1px solid gray'}} width="500"/><br/>In order to be able to differentiate between runs, in case of test runs, "(RUN TEST)" will be added to the end of the playbook name.<br/><img src={useBaseUrl('img/cloud-soar/playbook-executed-run-test.png')} alt="Playbook executed run test" style={{border: '1px solid gray'}} width="800"/><br/>

## Incident templates

Incident templates define the way in which incidents will be created for a specific alert, incident type or event. They allow you to define a certain number of incident attributes (e.g., incident type, severity, assignment, and any other default or custom incident parameters) that will automatically be set each time an incident is generated, based on the template. This may include type, classification, incident assignment, playbooks, Playbooks, knowledge base articles, or any other incident attribute. As rules are created for generating incidents based on syslog messages, email, SIEM integrations or other data sources, it is the Incident Templates that will define how the initial incident will be created.

### Create a new template

To create a new template, click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) > **Automation > Incident Templates**.

<img src={useBaseUrl('img/cloud-soar/image91.png')} alt="Add template" width="800"/>

From the Incident Templates page, you'll find all previously created templates on the left-side of the screen. To add a new Incident Template, click **+** to proceed.

<img src={useBaseUrl('img/cloud-soar/image92.png')} alt="New Incident Template" width="400"/>

A new configuration box is displayed. As seen in our previous configurations, you will need to name your template. Make sure it is something easily identifiable and related to the activity it is developed for. The next section is asking for a **Category**. This field, as well as all other fields within the Cloud SOAR platform, can be customized to fit the user's environment (see [Custom Fields](#custom-fields)).

In our example, we're building an Incident Template for a DLP incident. The category we chose is titled **Data Theft** but can be called anything in which we choose to identify it as. Users also have the option to add **Tags** which can be used to further categorize of define the incident, and can be used when searching for or correlating events. Once our template is named and categorized, click **Next** to continue.

Under the **Incident** tab administrators may define any incident parameters they wish to set by default when an incident is creating using the template. This often includes parameters such as type, kind and severity. All variables marked with an asterisk (*) are required to complete the Incident Template (see [**Custom Fields**](#custom-fields) to adjust the fields requirements). As mentioned earlier, all fields are customizable via the **Custom Fields** section. Once all required variables have been defined, click **Next** to continue.

<img src={useBaseUrl('img/cloud-soar/image93.png')} alt="Create incident template" width="400"/>

The remaining tabs in the Incident Template dialogue are as follows:
- **Incident details**: To set up details for a specific incident type.
- **Description**: Free text area to describe details of the template.
- **Playbook**: Playbook which should be automatically assigned to an incident. For each playbook, user can choose to have the Playbook automatically execute immediately upon incident creation or assigned and wait for manual execution.
- **Investigators**: Investigators who should be automatically assigned to the incident.
- **Notes**: Notes which should be created for the incident.

### Custom Fields

**Custom Fields** allows administrators to edit existing fields as well as add new fields for almost every section of Cloud SOAR. All Cloud SOAR sections which permit custom fields are displayed on the left-hand side of the page. Clicking on any one of these sections will display all current fields for that section on the right-hand side of the page. Any existing field may be edited, to include changing the name or adding list values. The only attribute which cannot be changed is the type of the field, such as text or date. New fields may also be added from this page.

The **Integrations** section allows administrators to configure bidirectional integrations with third-party technologies, as well as view the supported actions for each integration. In addition, this section allows administrators to manage custom scripts, which can be written in Python, Perl, PowerShell or Bash.

### Creating incidents from automation rules

Cloud SOAR can ingest, parse, and process incident data from email, syslog and bidirectional integrations. For Cloud SOAR to begin processing incident data from these sources, the **Automation Rules** features need to be configured.

To access, click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) > **Automation** > __Rules__.

<img src={useBaseUrl('img/cloud-soar/image94.png')} alt="Automation menu" width="200"/>

## Integrations

Cloud SOAR's orchestration and automation capabilities are achieved through its unidirectional and bidirectional integrations with the industry's leading network and security vendors. To configure, click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) > **Automation** > **Integrations**.

<img src={useBaseUrl('img/cloud-soar/image62.png')} alt="Integrations" width="800"/>

A list of available integrations within the organization can be found to the left-side of the screen. To begin to configure, click on a product to continue.

<img src={useBaseUrl('img/cloud-soar/image63.png')} alt="Configure integration" width="800"/>


A product overview screen will be displayed with what actions a product can perform and a link to configure the integration. These actions are categorized into five separate types: **Enrichment**, **Containment**, **Custom**, **Daemon**, and **Notification** actions. Each selection will list its associated actions and if there are required fields which need to be configured for Cloud SOAR to utilize its functionality within its Playbooks.

To add a new integration resource, click the **+ Resources** button in the upper left-hand corner of the integrations screen. To edit an existing integration resource, hover over the resource and click the pencil icon to the far right of the resource name in the resource list.          

<img src={useBaseUrl('img/cloud-soar/image64.png')} alt="image64" width="400"/>

Each Integration's configuration screen may be different, but in most cases, administrators will need information such as IP addresses, API tokens, usernames and passwords for their network/security products.

To test the configuration, click save and reopen the Integration. Once the Integration is reopened, click test and successful connections will display a success message at the bottom of the screen. Any unsuccessful attempts will display an error message with information needed to remediate the issue.

Additionally, some integration types also allow users to use a pre-configured general proxy or define a specific one for its integration with Cloud SOAR. To configure a proxy for an integration, open the integration and click the Proxy dropdown. Select **Use different proxy** and add the corresponding proxy information.

Once the information has been added, click save to commit the integration. Next, open up the integratio again and click the **Test** button to test the new configuration settings. A successful connection attempt will be displayed at the bottom right-side of the screen. Once the proxy test is successful, click save again to commit the final configuration settings for the integration.

#### Deleted bookmark

The **Deleted** bookmark allows you to view or hide integrations that have been deleted.<br/><img src={useBaseUrl('img/cloud-soar/integration-deleted.png')} alt="Deleted bookmark activated" width="300"/>

Click the **Deleted** button to see all the deleted integrations.<br/><img src={useBaseUrl('img/cloud-soar/integration-deleted-2.png')} alt="Deleted bookmark deactivated" width="300"/>

### Integration Framework

Cloud SOAR's Integration Framework allows Sumo Logic and Cloud SOAR users to develop and extend integrations using a common, open and easy to use framework. For increased security and isolation, each integration is executed in
its own Docker container, which can be easily customized by the user when the integration is created.

Integrations are defined using two types of YAML text files. The first type, the integration definition file, is used to define the properties of the product with which the integration connects. This includes information such as the name, logo, connection parameters, test code and the Docker container used to execute the actions. One integration definition file is required for each integration and serves as a container for all of the actions that the integration will perform.

The second type of file is an action definition file, which is used to define a single action that will be performed using the integration. Each integration action is defined in a separate action definition file, which will be associated by Cloud SOAR with the appropriate integration definition. Action definition files are the files which contain the actual code which will be executed to perform the action. Supported languages include Perl, Python, PowerShell and Bash. In addition to the action code, action definition files also contain information such as the name, required and optional fields and the format in which the resulting information will be displayed.

<img src={useBaseUrl('img/cloud-soar/image65.png')} alt="Integration definition" style={{border: '1px solid gray'}} width="600"/>

### Integration file hierarchy

Defining integrations at the **action** level allows users greater flexibility in customizing existing integrations and sharing new actions with other users. For example, a user may choose to extend Sumo Logic's existing RSA Netwitness integration to include an additional action which retrieves all network connections for a given host.

Once the user has created this new action, it can easily be added to the existing RSA Netwitness integration by uploading the new integration action file. This new action can also be shared between customers and used to extend the functionality of the integration in other customer instances as well.

<img src={useBaseUrl('img/cloud-soar/image66.png')} alt="New action" style={{border: '1px solid gray'}} width="600"/>

See [Integration Framework](#integration-framework) for more details on utilizing the integration framework within Cloud SOAR.

### Integration Builder

You can build basic integrations without having to provide custom YAML files.

1. Click the gear icon in the upper-right corner and select **Automation**. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-automation-menu.png')} alt="Access Automation" width="150"/>
1. Select **Integrations** from the navigation menu at the left of the screen.
1. Select the **+** icon at the top of the screen to the left of **Integrations**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-add-integration-button.png')} alt="Add Integration button" width="300"/>
1. Fill out the **New Integration** dialog:
   1. Upload a **Logo** for your integration.
   1. Provide a **Name**.
   1. Click **Use Connection Configuration** and fill out the fields for credentials configuration.
   1. Click **Add** to add the connection configuration.
   1. If other fields are needed at the integration resource level, click **+ Field** to add the fields and their information. For example, for an integration like VirusTotal, you would need to add `apikey` and `domain` as required fields.
   1. Click **Create**. The integration file is created for the integration.
   <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-integration-dialog.png')} alt="New Integration dialog" width="500"/>
1. Now that you have created the integration file, you need to create an action file for the integration.
   1. Hover your mouse over the new integration and click the **Upload** button that appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-upload-icon.png')} alt="Upload button" width="300"/>
   1. In the **Upload** dialog, notice how **Integration File** is highlighted. That's because it was created in the last step.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-upload-files.png')} alt="Upload dialog" width="300"/>
   1. Click **Action** and **Next**.
1. Fill out the **Upload** dialog:
   1. Provide a **Name** for the action.
   1. Select a **Type** for the action, such as enrichment, containment, custom, or notification.
   1. Click **Use Connection Configuration** if it is needed for the action, fill out the fields for credentials configuration, and click **Add**.
   1. If other fields are needed at the action level, click **+ Field** to add the fields and their information.
   1. Click **Create**. The action file is created for the integration.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-create-action-file.png')} alt="Create action" width="600"/><br/>The new action displays.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-completed-integration.png')} alt="Example integration" width="600"/>
1. Add the resource information:
   1. Click the **+** button to the left of **Resources**.
   1. Give the resource a **Label** and enter the connection configuration needed by the resource. What you enter is specific to the integration you're adding the resource for. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-add-resource.png')} alt="Example integration" width="400"/>
   1. Click **Save**. The new integration is complete.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-completed-integration-2.png')} alt="Example integration" width="600"/>
1. To test the new action, click on the action, then click **Test Action** in the dialog that displays.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-test-action.png')} alt="Example integration" width="400"/>

### Configure a webhook for Cloud SOAR

You can configure a [webhook connection](/docs/alerts/webhook-connections/cloud-soar/) to allow you to send an alert from a scheduled search to Sumo Logic Cloud SOAR.

1. In Sumo Logic, go to **Manage Data > Monitoring > Connections**.
1. Click **+** and choose **Cloud SOAR** as the connection type. The **Create Cloud SOAR Connection** dialog is displayed.<br/><img src={useBaseUrl('img/cloud-soar/CSOAR-connection1.png')} alt="New connection" style={{border: '1px solid black'}} width="600"/> 
1. Enter a **Name** and give an optional **Description** to the connection.
1. The **URL** field shows your [Sumo Logic API endpoint](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) followed by `/csoar/v3/incidents/`. For example, `https://api.us2.sumologic.com/api/csoar/v3/incidents/`
1. In **Authorization Header**, enter your basic authentication access information for the header. For example, `Basic <base64 encode <accessId>:<accessKey>>`. For more information, see [Basic Access (Base64 encoded)](/docs/api/getting-started#basic-access-base64-encoded).
1. Click **Save**. After save, the **Templates** dropdown shows a list of all incident templates by name configured in your Cloud SOAR environment. 
1. Select a **Template**. 
1. The default payload synchronizes with the selected template, and the **Alert Payload** field shows the associated `template_id` field automatically defined in the default payload. A `template_id` is required in the payload in order to configure the connection:

    ```
    {
      "template_id": <Template ID>,
     "fields": {
        "incidentid": "Incident Id"
      }
    }
    ```
    
    You can add additional variables. For example:

    ```
    {
      "fields": {
        "description": "string",
        "additional_info": "string",
        "starttime": "ISO-8601 datetime string", 
        "incident_kind": <ID incident kind>,
        "incident_category": <ID incident category>,
        "status": <ID incident status>,
        "restriction": <ID incident restriction>
      }
    }
    ```
    :::note
    * For details on variables you can use as parameters within your JSON object, see [Configure Webhook Payload Variables](/docs/alerts/webhook-connections/set-up-webhook-connections/#configure-webhook-payload-variables). 
    * For information on additional fields, please refer to the [Cloud SOAR APIs](https://help.sumologic.com/docs/api/cloud-soar/) documentation. 
    * The preceding example shows an `ISO-8601 datetime string`. For information about how to configure it, see [parser documentation](https://dateutil.readthedocs.io/en/stable/parser.html#dateutil.parser.isoparse).
    :::
1. Click **Save**.

### Cloud or Bridge execution

You can set integrations, and their related action execution, to be executed in the cloud or through the Bridge. Only certified integrations can be executed in the cloud, while custom integrations must be executed through the [Bridge](/docs/cloud-soar/cloud-soar-bridge/).

1. Select **Automation** from the gear icon in the upper-right corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-automation-menu.png')} alt="Access Automation" width="150"/>
1. Select **Integrations** from the navigation menu at the left of the screen.
1. Select an integration.
1. Hover your mouse over the resource name and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-resource-button.png')} alt="Resource edit button" width="600"/>
1. In the **Edit resource** dialog, click the **Automation engine** field to select **Cloud execution** (for certified integrations only) or select a Bridge option (for custom integrations).<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-resource-cloud-execution.png')} alt="Automation engine field" width="400"/>

## Configure Slack for Cloud SOAR

With the Cloud SOAR Slack integration, teams can remain connected, organize conversations,  and quickly find what is needed to get the work done.

With the Cloud SOAR Slack integration, you can directly manage [User Choice](#user-choice) actions within the playbooks from your Slack workspace.  Furthermore, for each new incident, a related conversation channel will be created within your Slack workspace, where users will correspond to investigators. Changing a user within the incident will also result in a change to the user within the conversation channel.

:::note
To configure Slack for use inside Cloud SOAR, you must first create a public or private channel so you can send messages or files to channels or users directly.
:::

### Step 1: Create a Slack app

Before you can use the Slack integration in Cloud SOAR, you need to create a Slack app on the user or company workspace.

1. Navigate to the [Slack API page](https://api.slack.com/apps).
1. Click **Create an App**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-add-app.png')} alt="Create a Slack app" width="800"/>
1. Select **From scratch**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-from-scratch.png')} alt="Create a Slack app from scratch" width="400"/>
1. Enter "CSOAR Bot" as the app name and select the workspace where you wish to install it.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-workspace-delivery2.png')} alt="Insert name and workspace for Slack app" style={{border: '1px solid gray'}} width="400"/>
1. Click **Create App**.

### Step 2: Add permissions to the Slack app

After you create a Slack app, you must add the appropriate permissions for use with Cloud SOAR.

1. Click **Permissions**, or from the left nav bar, click **OAuth & Permissions**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-permissions.png')} alt="Slack OAuth and Permissions" width="600"/>
1. Scroll down to the **Scopes** section.<br/>You must add permissions for the Bot Token. Bot tokens let your app act independently.
1. Click **Add an OAuth Scope** under **Bot Token Scopes**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-scopes-delivery2.png')} alt="Add an OAuth Scope in Slack" style={{border: '1px solid gray'}} width="500"/>
1. Enter the following permissions.
   * **Actions: List Channels / Get Channel / Get Members**
      * `channels:read`. View basic information about public channels in a workspace.
      * `groups:read`. View basic information about private channels that your Slack app has been added to.
      * `im:read`. View basic information about direct messages that your Slack app has been added to.
      * `mpim:read`. View basic information about group direct messages that your Slack app has been added to.
   * **Actions: Create channel / Invite To Channel / Remove User From Channel / Archive Channel**
      * `channels:manage`. Manage public channels that your Slack app has been added to and create new ones.
      * `channels:write.invites`. Invite members to public channels.
      * `groups:write`. Manage private channels that your Slack app has been added to and create new ones.
      * `groups:write.invites`. Invite members to private channels.
      * `im:write`. Start direct messages with people.
      * `mpim:write`. Start group direct messages with people.
      * `mpim:write.invites`. Invite members to group direct messages.
   * **Actions: List Users / Get User**
     * `users:read`. View people in a workspace.
     * `users:read.email`. View email addresses of people in a workspace.
   * **Actions: List Conversations History**
     * `channels:history`. View messages and other content in public channels that your Slack app has been added to.
     * `groups:history`. View messages and other content in private channels that your Slack app has been added to.
     * `im:history`. View messages and other content in direct messages that your Slack app has been added to.
     * `mpim:history`. View messages and other content in group direct messages that your Slack app has been added to.
   * **Actions: Send Message / Delete Message**
      * `chat:write`. Post messages in approved channels and conversations.
1. Verify that scopes are set up correctly:
   * Here are the Bot Token scopes after configuration:<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-scopes-bot-token-1-delivery2.png')} alt="Bot token 1" style={{border: '1px solid gray'}} width="500"/>
1. Place your instance URL in the **Interactivity & Shortcuts** page.
<br/><img src={useBaseUrl('img/cloud-soar/integrations-interactivity-delivery2.png')} alt="Interactivity" style={{border: '1px solid gray'}} width="600"/>
1. Click **Install to Workspace** to make the app available for use.
<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-install-to-workspace.png')} alt="Install the app" width="600"/>
1. Installation generates a Bot User OAuth Token and a Signing Secret. Copy the tokens and keep them in a secure location for use in the next step.
<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-bot-user-oauth-token.png')} alt="Bot Oauth token" style={{border: '1px solid gray'}} width="600"/>
<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-signing-secret.png')} alt="Signing Secret" style={{border: '1px solid gray'}} width="600"/>

### Step 3: Configure the Slack integration in Cloud SOAR

Now you must configure the Slack integration in Cloud SOAR to use the Bot OAuth Token and Signing Secret you saved in the previous step. These tokens will give the Slack integration the permissions it needs to perform the tasks in the scopes you set up.

1. Add resources for the tokens:
   1. In Cloud SOAR, click the gear icon and select **Automation**.<br/><img src={useBaseUrl('img/cloud-soar/integration-automation-menu-delivery2.png')} alt="Automation option" width="300"/>
   1. Click **Integrations**.
   1. Select the Slack integration. The integration's resources appear.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-in-list.png')} alt="Select the Slack integration" width="800"/>
   1. Click **+** to add a new Resource.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-resources.png')} alt="Add a resource" width="600"/>
   1. Name the resource "Bot User OAuth Access Token".
   1. Click **Edit**.
   1. Copy the Bot Oauth Token you saved from the Slack API setup and paste it Into the **Bot/User OAuth Token** field.
   1. Once you have filled in all the required fields, click **Save**.
   1. Click **TEST SAVED SETTINGS** to verify configuration.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-bot-user-2.png')} alt="Bot resource" width="400"/>
1. In Cloud SOAR, at the top of the screen click the gear icon and select **Settings**.<br/><img src={useBaseUrl('img/cloud-soar/integration-settings-menu-delivery2.png')} alt="Settings option" width="300"/>
1. Click **General**.
1. Open **Instant Messaging**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-instant-messaging-delivery2.png')} alt="Successful configuration" width="600"/>
1. For **Integration** select Slack.
1. Paste your previously saved Bot User OAuth Access Token to the **Bot OAuth** field.
1. Paste your previously saved Signing Secret to the **Signing Secret for verify requests** field. If configuration is successful, **Workspace** displays "Success".

If your new resources are configured correctly, and Instant Messaging displays a "Success" message for the configured workspace, you can [Use the Slack app in User Choice](#use-the-slack-app-in-user-choice).

### Use the Slack app in User Choice

 If you have configured Slack as described in [Configure Slack for Cloud SOAR](#configure-slack-for-cloud-soar), you can set a playbook’s [User Choice](/docs/cloud-soar/automation/#user-choice) to be answered by Slack.

1. Run a playbook with a User Choice action. The following example shows a simple playbook with two available answers: **Close Incident** and **Investigate**. Notice that the option **Answer By Slack** is enabled.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-playbook.png')} alt="Playbook with user choices" width="600"/>
<br/>In this case, the Authorizer set is just a user. If a group is chosen, a message will be sent directly from the CSOAR Bot to every available user. If a user is not selected, and the playbook is inside an incident, the message will be sent within the relevant channel in the Slack workspace, and all the users within it will be authorized to choose one of the User Choice available options.
1. When the playbook flow reaches the **User Choice**, the user will receive a message containing the reference to the incident, the playbook name, and the question set for the **User Choice**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-user-choice.png')} alt="Slack user choice message" width="600"/>
1. After a recipient chooses one of the available options, the playbook flow will continue and a message will inform the user or the group about the choice made.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-user-choice-2.png')} alt="Selected user choice" width="600"/>

### Bidirectional use cases between Slack and incident management

You can manage Slack communication channels directly by creating/editing various incidents within Cloud SOAR. Here are some use cases:

* Creating an incident <br/>When an incident is created, a conversation channel will automatically be created within your Slack workspace, where the channel name will be formed like this: **incident-incident_id**. Furthermore, all users (owners, investigators, groups) who are part of the workspace will be added to the channel.<br/><img src={useBaseUrl('img/cloud-soar/created-incident-fs.png')} alt="Created incident" width="800"/><br/><img src={useBaseUrl('img/cloud-soar/created-slack-channel.png')} alt="Created Slack channel" width="800"/>
* Adding / removing users from the incident <br/>When users (owners, investigators, groups) are added or removed from the incident, they will be managed in the same way within the channel in the workspace.
* Close / delete an incident <br/>When an incident is closed / deleted, the related channel in the workspace will automatically be archived as well.<br/><img src={useBaseUrl('img/cloud-soar/archived-slack-channel.png')} alt="Archived Slack channel" width="400"/>
* Viewing channel history from the **War room** section <br/>Within the war room section of an incident, it will be possible to view the history of a Slack channel.<br/><img src={useBaseUrl('img/cloud-soar/war-room-chat-section.png')} alt="Archived Slack channel" width="800"/>

## Rules

### Creating a rule

Select **Automation Rules** page follows the same format as
all customizable Cloud SOAR features, click **+** to create a new automation ruleset:

<img src={useBaseUrl('img/cloud-soar/image95.png')} alt="Add automation rule"  width="400"/>


Select a name for the rule, then select the daemon to use with this new rule and the resource and fill all the remain parameters.

In the detail section of the rule you can define filters to be used in the rule and the action to be performed.

The **Action Type** dropdown will contain the specific actions Cloud SOAR can take when the specified activity is observed. Users have the option to take the following actions:

- **Create incident from template**. Specify what [incident template](#incident-templates) to use, the incident owner, and incident ID format. This is the most common action.
- **Close incident**. Allows for the automatic closure of a known false positive incident
- **Update incident**. Updates a field in an existing incident based on parameters from the parsed message
- **Change incident status**. Change the incident status based on parameters from the parsed message
- **Set task progress**. Set task progress based on parameters from the parsed message
- **Close task**. Close a task based on parameters from the parsed message
- **Add to Triage**. Create a new triage event based on parameters from the parsed message

To add a new mapping setting, click on the plus button near Mapping if enable for that action.

<img src={useBaseUrl('img/cloud-soar/image103.png')} alt="Add action"  width="400"/>

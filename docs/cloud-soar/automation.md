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

![App Central](/img/cloud-soar/appcentral.png)

While browsing available integrations, you can check the details and all the actions available and install it.

### Update integrations

Integrations in App Central display a version number. The version indicates when there is a change to the integration. If a newer version is available, you can  update the integration from  App Central by clicking **UPDATE**.<br/><img src={useBaseUrl('img/cloud-soar/integration-update.png')} alt="<your image description>" width="400"/>

As soon as you click **UPDATE**, the new version is present inside the Integration section.

Following is an example of integration code before updating the integration:<br/><img src={useBaseUrl('img/cloud-soar/integration-update-before.png')} alt="<your image description>" width="800"/>

Following is an example of integration code after updating the integration:<br/><img src={useBaseUrl('img/cloud-soar/integration-update-after.png')} alt="<your image description>" width="800"/>

### Certified integrations

Certified integrations are those that are provided by Sumo Logic. After you download an integration from App Central, you will see it in the Integrations section designated by a **Certified Integration** check mark.<br/><img src={useBaseUrl('img/cloud-soar/integration-certified.png')} alt="<your image description>" width="400"/>

After you select the integration resource and click the **View Code** button, the certified integration code is set to read-only mode. The certified integrations code can’t be edited using the Cloud SOAR internal IDE. This is also valid for the actions available for that integration.<br/><img src={useBaseUrl('img/cloud-soar/integration-certified-2.png')} alt="<your image description>" width="600"/>

An example of certified actions.
<img src={useBaseUrl('img/cloud-soar/integration-certified-action.png')} alt="<your image description>" width="600"/>

To sum up, you can add one or more resources to the certified integration downloaded (as explained in the documentation Automation section), you can configure it by providing the access credentials, test it, and use it as it is. 

In order to be able to modify the integration code - resource code and actions code - it was introduced the clone functionality. By clicking on the “certified integration - duplicate to edit” button, a new integration will be created in the integrations list with an incremented name. 
The “certified integration - duplicate to edit” button is shown in the image below
<img src={useBaseUrl('img/cloud-soar/integration-duplicate.png')} alt="<your image description>" width="600"/>

An example of a duplicated integration is shown in the image below.
<img src={useBaseUrl('img/cloud-soar/integration-duplicated.png')} alt="<your image description>" width="250"/>

If the certified integration resource was configured before the duplication process, all the settings will be saved and replicated inside the cloned integration. There is no need to reset the duplicated integration.

As can be noticed in the next image, only the integration resource received an incremented name and not the actions available for that particular integration. This decision was taken to facilitate the automation process and avoid confusion. 
Since only the duplicated integration can be modified, the actions name represents the activity that the action will perform, rather it is modified or not. 
The user, while building playbooks, can choose which resource wants to use. If the duplicated resource is chosen, the actions available will be the ones belonging to the duplicated resource.

The image below shows an example of the duplicated resource’s actions showing no changes in their name.
<img src={useBaseUrl('img/cloud-soar/integration-duplicated-resources-actions.png')} alt="<your image description>" width="600"/>

An example of selecting the action’s resource while building playbooks. The selected action is “Add Comment To Issue”.
<img src={useBaseUrl('img/cloud-soar/integration-add-comment-to-issue.png')} alt="<your image description>" width="600"/>


## Playbook

:::sumo Micro Lesson

Create Custom Playbooks in Cloud SOAR.

<Iframe url="https://www.youtube.com/embed/pcDm71wGyGs"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
:::

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
 statements and/or user choice actions

### Action

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

## Incident Templates

Incident Templates define the way in which incidents will be created for
a specific alert, incident type or event. They allow you to define a certain number of incident attributes (e.g., incident type, severity, assignment, and any other default or custom incident parameters) that will automatically be set each time an incident is generated, based on the template. This may include type, classification, incident assignment, playbooks, Playbooks, knowledge base articles, or any other incident attribute. As rules are created for generating incidents based on syslog messages, email, SIEM integrations or other data sources, it is the Incident Templates that will define how the initial incident will be created.

### Create a new template

To create a new template, click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) > **Automation > Incident Templates**.

![add template](/img/cloud-soar/image91.png)


From the Incident Templates page, you'll find all previously created
templates on the left-side of the screen. To add a new Incident
Template, click **+** to proceed.

![New Incident Template](/img/cloud-soar/image92.png)


A new configuration box is displayed. As seen in our previous
configurations, you will need to name your template. Make sure it is
something easily identifiable and related to the activity it is
developed for. The next section is asking for a **Category**. This field,
as well as all other fields within the Cloud SOAR platform, can be
customized to fit the user's environment (see [Custom Fields](#custom-fields)).

In our example, we're building an Incident Template for a DLP incident.
The category we chose is titled **Data Theft** but can be called anything
in which we choose to identify it as. Users also have the option to add
**Tags** which can be used to further categorize of define the incident,
and can be used when searching for or correlating events. Once our
template is named and categorized, click **Next** to continue.

Under the **Incident** tab administrators may define any incident
parameters they wish to set by default when an incident is creating
using the template. This often includes parameters such as type, kind
and severity. All variables marked with an asterisk (*) are required to
complete the Incident Template (see [**Custom Fields**](#custom-fields) to adjust the fields requirements). As mentioned earlier, all fields are customizable via the
**Custom Fields** section. Once all required variables have been defined,
click **Next** to continue.

![create incident template](/img/cloud-soar/image93.png)


The remaining tabs in the Incident Template dialogue are as follows:
- **Incident details**: To set up details for a specific incident type.
- **Description**: Free text area to describe details of the template.
- **Playbook**: Playbook which should be automatically assigned to an incident. For each playbook, user can choose to have the Playbook automatically execute immediately upon incident creation or assigned and wait for manual execution.
- **Investigators**: Investigators who should be automatically assigned to the incident.
- **Notes**: Notes which should be created for the incident.

### Report Template

**Report Templates** allow users to build their own reports by selecting
various components of an incident they wish to include in the report.
These components can include incident details, evidence, hosts,
observables and many others.

### Custom Fields

**Custom Fields** allows administrators to edit existing fields as well as
add new fields for almost every section of Cloud SOAR. All Cloud SOAR sections
which permit custom fields are displayed on the left-hand side of the
page. Clicking on any one of these sections will display all current
fields for that section on the right-hand side of the page. Any existing
field may be edited, to include changing the name or adding list values.
The only attribute which cannot be changed is the type of the field,
such as text or date. New fields may also be added from this page.
Integrations

The **Integrations** section allows administrators to configure
bidirectional integrations with third-party technologies, as well as
view the supported actions for each integration. In addition, this
section allows administrators to manage custom scripts, which can be
written in Python, Perl, PowerShell or Bash.


### Creating Incidents from Automation Rules

Cloud SOAR can ingest, parse, and process incident data from email, syslog
and bidirectional integrations. For Cloud SOAR to begin processing incident
data from these sources, the **Automation Rules** features need to be configured.

To access, click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) > **Automation** > __Rules__.

![automation menu](/img/cloud-soar/image94.png)          


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

#### Deleted bookmark

Inside the Integrations section, a bookmark was introduced that automatically hides the deleted integration. The feature is already activated and it can be deactivated simply by clicking on the “Deleted” button. As soon as it is deactivated, all the deleted integrations will appear in the integration list. This feature was introduced in order to have always a clear and clean view of the integrations list.

An image of the “Deleted” bookmark activated:
<img src={useBaseUrl('img/cloud-soar/integration-deleted.png')} alt="<your image description>" width="300"/>


An image of the “Deleted” bookmark deactivated.
<img src={useBaseUrl('img/cloud-soar/integration-deleted-2.png')} alt="<your image description>" width="300"/>


### Integration Framework

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

### Slack integration used inside User Choice

To configure Slack inside Cloud SOAR, a public or private channel has to be created. This will permit to send of messages or files to channels or users directly. With the Cloud SOAR Slack integration teams can remain connected, organize conversations and quickly find what is needed to get the work done.

#### Slack Configuration

First, you need to create a Slack App on the user/company workspace. To create an App you have to navigate to the api.Slack Applications page. Click on Create an App button as shown in the image below.
<img src={useBaseUrl('img/cloud-soar/integration-slack-add-app.png')} alt="<your image description>" width="600"/>

Create an App From scratch
<img src={useBaseUrl('img/cloud-soar/integration-slack-from-scratch.png')} alt="<your image description>" width="400"/>

After selecting the option “From scratch” was selected, insert a name for the app and select the workspace as shown in the image below. Click the Create App button.
<img src={useBaseUrl('img/cloud-soar/integration-slack-workspace.png')} alt="<your image description>" width="400"/>

Once the App is created, you have to add the appropriate Permissions. Choose Permissions. Alternatively, you can see OAuth & Permissions from the side menu as the next image illustrates.
<img src={useBaseUrl('img/cloud-soar/integration-slack-permissions.png')} alt="<your image description>" width="600"/>

At this point, the Scopes should be added for the User Token and Bot Token. Both tokens let your app act independently. User tokens allow you to work directly on behalf of users, based on the OAuth scopes that install users towards your app.
All the Actions required scopes depend on the type of channel-like object you're working with.
The image below shows how to add the OAuth scopes.
<img src={useBaseUrl('img/cloud-soar/integration-slack-scopes.png')} alt="<your image description>" width="400"/>

To use the Actions, you'll need at least one of the channels:, groups:, im: or mpim: scopes corresponding to the conversation type you're working with.
Now for each action of Slack Integration, you need different scopes to be added to the BOT or User.


#### Actions: List Channels / Get Channel / Get Members

For these actions, you will need the below scope.

BOT Token and USER Token need the same scopes:
* channels: read (View basic information about public channels in a workspace)
* groups: read (View basic information about private channels that your Slack app has been added to)
* im: read (View basic information about direct messages that your Slack app has been added to)
* mpim: read (View basic information about group direct messages that your slack app has been added to)


#### Actions: Create channel / Invite To Channel / Remove User From Channel / Archive Channel

For the above actions you will need the following scopes:

BOT Token:
* channels: manage (Manage public channels that your Slack app has been added to and create new ones)
User Token:
* channels: write (Manage a user’s public channels and create new ones on a user’s behalf)

These scopes are the same for BOT and USER tokens:
* groups: write (Manage private channels that your slack app has been added to and create new ones)
* im: write (Start direct messages with people)
* mpim: write (Start group direct messages with people)


#### Actions: List Users / Get User

BOT Token and USER Token need the same scopes:
* users: read (View people in a workspace)
* users: read.email (View email addresses of people in a workspace)


#### Actions: List Conversations History

BOT Token and USER Token need the same scopes:
* channels: history (View messages and other content in public channels that your Slack app has been added to)
* groups: history (View messages and other content in private channels that your Slack app has been added to)
* im: history (View messages and other content in direct messages that your Slack app has been added to)
* mpim: history (View messages and other content in group direct messages that your Slack app has been added to)


#### Actions: Send Message / Delete Message

BOT Token:
* chat: write (Post messages in approved channels & conversations)

User Token:
* chat: write:user (Send messages on a user’s behalf)
* chat: write (Post messages in approved channels & conversations)
* chat: write:bot (Send messages as your slack app)


#### Actions: Deactivate Account

For this action, you will need the below scope. It only works with USER Token and not  BOT Token.

User Token:
* admin.users: write (Modify account information)


#### Actions: Search into Conversations

For this action, you will need only one scope and it only works with USER Token but not with BOT Token.

User Token:
* search: read (Search a workspace’s content)


#### Actions: Send File 

Bot Token:
* files: write (Upload, edit, and delete files as your Slack app)

User Token:
* files: write: user (Upload, edit, and delete files as your slack app)
* files: write (Upload, edit, and delete files as your Slack app)

The images below show how the Bot Token and User Token will look in Scopes after the configuration process.
<img src={useBaseUrl('img/cloud-soar/integration-slack-scopes-bot-token.png')} alt="<your image description>" width="400"/>
<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-scopes-user-token.png')} alt="<your image description>" width="400"/>

At this point, the APP needs to be installed in the workspace.

The following image shows how to install the APP in the workspace.
<img src={useBaseUrl('img/cloud-soar/integration-slack-install-to-workspace.png')} alt="<your image description>" width="600"/>

After installing the App, two Tokens will be generated automatically. Keep them safe, will be needed afterward.
The next image is showing the blurred generated tokens
<img src={useBaseUrl('img/cloud-soar/integration-slack-user-oauth-token.png')} alt="<your image description>" width="600"/>

#### Slack in Cloud SOAR

To configure the Sumo Logic Cloud SOAR, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon, and click Automation.
<img src={useBaseUrl('img/cloud-soar/integration-automation-menu.png')} alt="<your image description>" width="300"/>

In the Automation section, on the left menu, click Integrations, and then select Slack integration as it’s showed in the image below.
<img src={useBaseUrl('img/cloud-soar/integration-slack-in-list.png')} alt="<your image description>" width="800"/>

The integration details will appear. Click on the "+" button to add a new Resource. 
Create a new resource for the User as it’s shown in the image below.
<img src={useBaseUrl('img/cloud-soar/integration-slack-resources.png')} alt="<your image description>" width="600"/>

Copy the User OAuth Token from the Slack webpage and paste it Into the Bot/User OAuth Token. Once you have filled in all the required fields, click Save. Once all the required fields have been completed, you will be able to TEST SAVED SETTINGS.

An example of the resource created for Users.
<img src={useBaseUrl('img/cloud-soar/integration-slack-bot-user.png')} alt="<your image description>" width="400"/>

Create another resource for the Bot User. Copy the Bot User OAuth Token from the Slack webpage and paste it Into the Bot/User OAuth Token. Once you have filled in all the required fields, click Save then test the saved settings.

An example of the resource created for Bot Users.
<img src={useBaseUrl('img/cloud-soar/integration-slack-bot-user-2.png')} alt="<your image description>" width="400"/>

Ensure that both configured resources are working properly. Use TEST SAVED SETTINGS to verify the resource’s configuration. 

An example of a successful configuration message is shown below.
<img src={useBaseUrl('img/cloud-soar/integration-slack-edit-resource.png')} alt="<your image description>" width="400"/>

The next image shows how the Resources should look after the configuration.
<img src={useBaseUrl('img/cloud-soar/integration-slack-resource-2.png')} alt="<your image description>" width="600"/>

The next step is to move inside the Settings ⇒ General section as shown in the following image, then search for the Instant Messaging feature.
<img src={useBaseUrl('img/cloud-soar/integration-settings-menu.png')} alt="<your image description>" width="300"/>

This feature has to be enabled and configured using the OAuth generated tokens. An example of a correct configuration is shown in the image below.
<img src={useBaseUrl('img/cloud-soar/integration-slack-instant-messaging.png')} alt="<your image description>" width="600"/>

If the resources are configured correctly and a green Success message is displayed  for the configured Workspace, the user can set the playbook’s User Choices to be answered by Slack. 
The image below is showed a simple playbook with two available answers (Close Incident, Investigate), and the option Answer By Slack is enabled.
<img src={useBaseUrl('img/cloud-soar/integration-slack-playbook.png')} alt="<your image description>" width="600"/>

Please notice that in this case, the Authorizer set is just a user. If a group is chosen, a Slack channel will be created and all the group members will be authorized to choose one of the User Choice available options. The channel will be automatically named as the incident on which the playbook is running. 

When the playbook flow reaches the User Choice, the user or group will receive a message containing the reference to the incident, the playbook name, and the question set for the User Choice.

An example of a Slack User Choice message.
<img src={useBaseUrl('img/cloud-soar/integration-slack-user-choice.png')} alt="<your image description>" width="600"/>

After one of the available options is selected, a message will inform the user or the group about the choice made, and the playbook flow will continue as soon as an option is selected.

An example of Slack User Choice:
<img src={useBaseUrl('img/cloud-soar/integration-slack-user-choice-2.png')} alt="<your image description>" width="600"/>



## Rules

### Creating a Rule

Select **Automation Rules** page follows the same format as
all customizable Cloud SOAR features, click **+** to create a new automation ruleset:

![add automation rule](/img/cloud-soar/image95.png)


Select a name for the rule, then select the daemon to use with this new rule and the resource and fill all the remain parameters.

In the detail section of the rule you can define filters to be used in the rule and the action to be performed.

The **Action Type** dropdown will contain the specific actions Cloud SOAR can take when the specified activity is observed. Users have the option to take the following actions:

- **Create incident from template**. Specify what incident template to use (See **Incident Templates)**, the incident owner, and incident ID format. This is the most common action.
- **Close incident**. Allows for the automatic closure of a known false positive incident
- **Update incident**. Updates a field in an existing incident based on parameters from the parsed message
- **Change incident status**. Change the incident status based on parameters from the parsed message
- **Set task progress**. Set task progress based on parameters from the parsed message
- **Close task**. Close a task based on parameters from the parsed message
- **Add to Triage**. Create a new triage event based on parameters from the parsed message

To add a new mapping setting, click on the plus button near Mapping if enable for that action.

![add action](/img/cloud-soar/image103.png)

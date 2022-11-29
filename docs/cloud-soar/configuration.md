---
id: configuration
title: Configuring Cloud SOAR
description: Configuring Cloud SOAR.
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

The following sections detail the various setup and configuration
options for the Cloud SOAR platform. Although initial configuration can be performed in any order, the following sections are ordered in the suggested order for initial configuration.

## General Settings

As mentioned earlier, Appendix A contains a complete overview of the
contents of the General Settings area. This section will highlight some
of the most commonly used General Settings.

## Incident Settings

There are several settings within the Incident settings section which
should be considered when configuring Cloud SOAR.

Cloud SOAR's Automatic Observables Harvesting feature examines free text
areas of Cloud SOAR to gather observables, such as IP addresses, domains and
email addresses. When enabled, Cloud SOAR will automatically harvest these
observables and add them to the appropriate observables section within
the incident. Checking the boxes under Automatically extract Observables
elements from will cause Cloud SOAR to perform Automatic Observables
Harvesting on the checked sections.

Under the Incident settings, it is also possible to make a final
incident note mandatory before the incident can be closed. This can be
used to enforce the policy of recording the final disposition of an
incident before it is closed.

![**Incident Settings**](/img/cloud-soar/image31.png)



Incident Process Phases

Cloud SOAR allows managers to monitor the progress of incident phases as the
incident progresses. These phases and their properties can be configured
by administrators in the General settings page.

![**Incident Phases**](/img/cloud-soar/image32.png)



In addition to the phase name, administrators can determine whether the
phase is mandatory and the status of the incident when the new phase is
reached. Administrators may also disable phase management at the top of
the Incident Process Phase section or choose not to show the phase
management section in the Incident Details screen.

Queue

One or more queues may be configured which can be used to assign
incidents to until they are ready to be assigned to users. Queues can be
managed at the bottom of the General settings page.

![**Queue Settings**](/img/cloud-soar/image33.png)



Click the **+** button in the upper right-hand corner of the queue
settings to add a new queue. There are no restrictions on the number, or
the scheme used to create queues. Common schemes are to create one
general queue, a queue for each analyst tier, or a queue by job
function.

Instant Messaging

Instant Messaging integration can be enabled from here.

![**Instant Messaging Integration**](/img/cloud-soar/image33b.png)



The same integration has to be updated under the user profile configuration

![**Instant Messaging Integration**](/img/cloud-soar/image33b1.png)



### User Management

When setting up Cloud SOAR one of the first tasks an Administrator will want
to accomplish is adding their user base. Just like Active Directory User
and Group management, Cloud SOAR allows for the creation of users, groups,
and user profiles.

Profiles

The Profiles menu contains the different profiles: what a user can see and do
within the Cloud SOAR platform and what a user can see and do
from within an Incident

Profiles

By default, Cloud SOAR comes pre-loaded with Administrator and Read Only
profiles. To create a new profile, click the **+** symbol
in the top left corner of the screen.

A new configuration box containing all available permissions within the
Cloud SOAR platform are displayed. These permissions are as follows:

- **Incident** refer to the **Main Menu** modules highlighted previously. Configuring these permissions will determine what access a user has to different areas of the Incident section
- **Settings** refer to the **Settings** module located in the Global Functions menu. Configuring these permissions will determine what modules under Settings the user can view/modify
- **Search and Reporting** refer to the Home section located in the Main Menu.
- **Automation** refers to the Automation Section in the settings menu. Configuring these permissions will determine for example what integrations can be viewed or modified
- **Entities** refers to the Entities section located in the Global Functions menu.
    Configuring these permissions will determine what the user can view/modify
    within the entities module.

Groups

Once general and incident profiles have been created, administrators can
add these profiles to their appropriate **Groups**. Navigate to **User Management** and select **Groups**.

Click the **+** again to add a new group. When the configuration screen is
displayed, name the new group and assign its
profile; click **Save** to continue. Group privileges override user
privileges. If a user belongs to more than one group, the privileges of
all groups are merged.

Users

Under the **User Management** drop down choose **Users** and click **+** to
begin adding the user's details.

![alt-text goes here](/img/cloud-soar/image35.png)

**General User Settings**

The General tab contains the usual user
account attributes such as name, email, address, username, etc.

Select the user's Profile from the drop-down
list to apply their permissions.

Users who wish to utilize their current Active Directory structure to
manage their Cloud SOAR user base can utilize LDAP authentication by
selecting **Use LDAP/AD for Authentication**.

LDAP/Active Directory Settings

Users who wish to utilize LDAP/AD authentication can configure this
feature under the LDAP/AD dropdown. This feature links a client's
AD/AD infrastructure to the Cloud SOAR platform, ensuring all authentication
policies are replicated when signing on in Cloud SOAR.

To enable the LDAP/AD integration, check **Enable LDAP/AD Server
Integration** at the top of the LDAP/AD screen.

Insert the Host and Port Information for the LDAP/AD Server. NOTE: Port
389 is typically used for a standard communication port and 636 for a
secure port.

Next, configure your reference field. References fields will work from 2
bits of data; SAMAccountName for a username or the individuals email
address.

![alt-text goes here](/img/cloud-soar/image36.png)

**LDAP Settings References**

Authentication may or may not be required depending on user permissions
on the AD/LDAP server. If your LDAP/AD server permissions require it,
ensure that a user with the appropriate permission is used here.

Designate the domain component that we want Cloud SOAR to connect with when
retrieving the authentication credentials. Configure which domain
components will be accessed in the Base Distinguished Name (DN) field.
You may also designate a failover local authentication if the LDAP/AD
server would become unreachable. Be sure to include domain components
that reflect the OU containing the user needing authentication.

Configuring Cloud SOAR Users to Work with LDAP/AD

During user creation utilize the same naming/email schema that you have
in your LDAP/AD Tree. In the example below The Cloud SOAR username, Peter
Parker, would correspond to the CN for the user in your LDAP/AD tree.

![alt-text goes here](/img/cloud-soar/image41.png)

### Notifications

The Notifications selection enables users to configure outbound email
(SMTP) settings, and set up text messaging for incident notifications. Notifications can be configured by clicking on Notifications from the Settings menu.

Email Server Configuration

Under the Email Server Configuration tab, users configure outbound mail
and confirm privacy settings to fit their organization's needs. Once
these options are set, Administrators can configure which types of
events should trigger notifications to which users and by what means.

![alt-text goes here](/img/cloud-soar/image42.png)

**Email Configuration Settings**

### Customization

Incident Report

The **Report Template** section allows users to create templates for
custom reporting. The Report Template screen contains a
list of all current report templates. To add a new report template,
click on the **+** icon above the report template list.

The Details tab of the new report template window allows the user to
specify a unique name for the template as well as a template category
and any appropriate tags.

The Sections tab of the new report template window allows users to drag
and drop sections of the incident into the report template. All incident
sections are listed in the left-hand pane. Dragging incident sections to
the right-hand pane will add the section to the report template.
Sections will be printed in the report in the order they appear in the
right-hand pane. Once satisfied with the selection, click **Save**.

![alt-text goes here](/img/cloud-soar/image45.png)

**Report Template Sections**

Custom Fields

![alt-text goes here](/img/cloud-soar/image46.png)

**Fields Configuration Settings**

The Custom Fields section allows for users
to customize all fields within the Cloud SOAR platform to better suit their
environment. All fields are pre-populated by default and can be revised
with environment-specific variables by manually creating or updating the
fields or by importing a file which is formatted with entries for each
line.

To begin defining Cloud SOAR's custom fields, select an Cloud SOAR section from
the list on the left-side of the screen to view all available fields. To
edit an existing field, select the
![alt-text goes here](/img/cloud-soar/image47.png) next to the field to be updated, or to add a new field select **+ADD** at the bottom right-side of the screen. A
new configuration box will be displayed.

The only attribute of an existing field which cannot be modified once
the field is created is the field Type, such as Text or Date. Users can
rename internal values but only personal values, which are denoted by
having a trash can symbol next to the entry, can be deleted from the
section's custom fields

Each section of Cloud SOAR supports different numbers of custom fields. The
Incidents section, for example, supports up to 100 custom fields. The
number of custom fields remaining will be displayed next to the section
name at the top of the page.

Custom fields added by a user can be renamed or deleted. However,
default fields can only be renamed, they cannot be deleted. Although a
custom field may be deleted, it will not increase the number of custom
fields available. Since the deleted field may contain data that was
entered prior to the deletion of the field, the custom field remains
reserved.

For each field, a name and a type will always be required. A complete
list of field types is listed below. Additional fields will be required
or optional depending on the type selected. For example, a text field
allows an optional default value to be specified, while a list field
provides many additional options.

The Visualization tab allows users to disable the field, specify if the
field is used within Incident notifications, and set conditions under
which the field is visible. For example, a field can be made visible
only if the incident is of a certain type.

The Additional Info tab allows users to provide additional information
or context to the field, such as how the field should be used or where
the data can be located.

Fields may be reorder in the Custom Fields section to change the order
in which they appear on the Cloud SOAR screen. To change the order of the
fields, click and hold on the six dots to the far left of the field
name, then drag the field to its desired location.

**Custom Field Types**

Field Type | Description
------ | ------
Calculation | Perform a calculation between two fields or between a field and a static value
Checkbox | Checkbox
Color Picker | Interactive color picker to select a color
Date | Date only picker
Date & Time | Date and time picker
Email Address | Email address Available to use in actions which require a email input
Filename | Filename Available to use in actions which require a filename input
Hash | Hash value Available to use in actions which require a hash input
IP Address | IP Address Available to use in actions which require a IP address input
List | Dropdown list
Multi Select List | Multiselect list box
Numeric Textbox | accepting numeric values only
Tags | One or more user defined tags
Text | Free text
Time Interval | Numeric time interval which can be used as a value in another calculated field
Timezone | Timezone list dropdown
URL | URL Available to use in actions which require a URL input
User Details | User details, such as a user name. Available to use in actions which require a user details input

**Using Custom Fields for SLAs**

Custom fields can be used to calculate any number of custom service
level agreements (SLAs). This can be achieved using combinations of
Date, Date & Time and Time Interval fields.

In the following example, five custom fields have been added to provide
information on the status of an organizations Notification SLA. Two of
the custom fields require user input:

![alt-text goes here](/img/cloud-soar/image50.png)

**SLA User Input**

**Notification SLA Requirement** will be used to store the SLA time
interval, such as 5 minutes.

**Customer Notified** will allow the user to enter the date & time the
customer was notified.

The remaining three custom fields require no user input and are
calculation fields only:

![alt-text goes here](/img/cloud-soar/image51.png)

**SLA Calculated Fields**

**Notification Due By** will calculate and display the date & time the
notification must be conducted by adding the Notification SLA
Requirement field to the Start Time.

**Notification Time Remaining** will calculate and display time
remaining before the notification must be conducted by subtracting the
Current Time from the Notification Due By field.

**Actual Notification Time** will calculate and display actual time
taken to notify the customer by subtracting the Start Time from the
Customer Notified Time.

These Custom Field settings will appear in the Cloud SOAR Incident screen as
follows:

![alt-text goes here](/img/cloud-soar/image52.png)

**SLA View**

**Triage**

Triage display preferences can be customized from Triage customization
section. Triage events can be color coded based on status to easily
distinguish them from each other when viewing the list of Triage events.

The name of the module can also be modified from **Triage** to a name of
your choosing. The new name will be displayed in all areas of Cloud SOAR,
including the menu and logs.

![alt-text goes here](/img/cloud-soar/image57.png)

**Triage Settings**

**Triage Field Settings**

By default, the Triage module contains two fields, Status and Type.
Additional values may be added to the Status field; however, the Type
field is directly linked to the Incident Type field and cannot be
modified directly. New types must be added from the Incidents section of
the Custom Fields page.

Up to 100 custom fields and be created for the Triage module, allowing
customization for any use case. To add additional fields, navigate to
**Settings > Customization > Custom Fields** and select Triage
Events (or the name of the module if you have renamed it from the
default of **Triage**). To add a new field, click **Add** from the upper
right-hand corner and configure the field as desired. Note that to be
able to filter events in the Triage module based on the values of a
field, **Use as filter** must be checked in the Visualization tab when
adding or modifying a field.

As fields are created, they will be assigned a number starting at 1,
which will be used to identify the field when adding events via the API.
The first field added will be identified as **opt_1**, the second as
**opt_2**, and so on. Regardless of the ordering of the fields on the
screen, these numbers will remain the same. If a field is deleted, the
number will not be reused. For example, if you have defined opt_1
through opt_8 and delete the field opt_8, the next field added will
still become opt_9. It is important to remember these field numbers, as
they will be used when the API is invoked.

**Working with Events**

The Triage module is accessible from the Incidents section by clicking
on Triage (or the name of the module if you have renamed it from the
default of **Triage**). All events which have not been converted to an
Incident will be displayed in a sortable table on the Triage main
screen. Events may be sorted by any column values by clicking on the
appropriate column.

![alt-text goes here](/img/cloud-soar/image58.png)

**Events**

The list of events can be filtered by any of the fields listed in the
filter section at the top of the Triage main screen.

![alt-text goes here](/img/cloud-soar/image59.png)

To view the details of a Triage event, click on the box and arrow icon
in the Actions column for the event. If additional information is
available, it will be displayed in this Event Details screen.

To begin triaging an event, click on the person icon in the Actions
column for the event to **grab** the event. Once an event is grabbed by an
analyst, any Playbooks defined for that incident type will be
automatically executed and the results will be displayed in the Results
section of the Event Details screen. Because all Playbooks for the
specified incident type are automatically executed as soon as the
incident is grabbed, it is recommended that separate incident types and Playbooks be created for Triage events.

After triaging the event, the event may be reassigned to another user
for further analysis, discarded or converted to an incident. To reassign
the event to another user, click on the circular arrow icon in the
Actions column for the event. To discard the event, click on the
trashcan icon in the Actions column for the event.

![alt-text goes here](/img/cloud-soar/image60.png)

To convert the event to an incident, click **Convert to Incident** in the
far right-hand corner of the Event in question. Select the appropriate
incident template, owner and label, then click **Save**. The event,
including all enrichment information gathered from any Playbooks, will be
automatically converted to an incident.

![alt-text goes here](/img/cloud-soar/image61.png)

### Integrations

Cloud SOAR's orchestration and automation capabilities are achieved through
its unidirectional and bidirectional integrations with the industry's
leading network and security vendors. Navigate to the Global Functions
menu **> Integrations** to configure the Integrations.

![alt-text goes here](/img/cloud-soar/image62.png)

**Integrations Menu**

A list of available integrations within the organization can be found to
the left-side of the screen. To begin to configure, click on a product
to continue.

![alt-text goes here](/img/cloud-soar/image63.png)

**Single Integration Settings**

A product overview screen will be
displayed with what actions a product can perform and a link to
configure the integration. These actions are categorized into five
separate types: **Enrichment, Containment, Custom, Daemon, and
Notification** actions. Each selection will list its associated actions
and if there are required fields which need to be configured for Cloud SOAR
to utilize its functionality within its Playbooks.

To add a new integration resource, click the **+ Resources** button in the
upper left-hand corner of the integrations screen. To edit an existing
integration resource, hover over the resource and click the pencil icon
to the far right of the resource name in the resource list.

![alt-text goes here](/img/cloud-soar/image64.png)

**Resource Settings**

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

### Integration Framework

Cloud SOAR's Integration Framework allows Sumo Logic and Cloud SOAR users to develop
and extend integrations using a common, open and easy to use framework.
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

![alt-text goes here](/img/cloud-soar/image65.png)

**Integration File Hierarchy**

Defining integrations at the **action** level allows users greater
flexibility in customizing existing integrations and sharing new actions
with other users. For example, a user may choose to extend Sumo Logic'
existing RSA Netwitness integration to include an additional action
which retrieves all network connections for a given host. Once the user
has created this new action, it can easily be added to the existing RSA
Netwitness integration by uploading the new integration action file.
This new action can also be shared between customers and used to extend
the functionality of the integration in other customer instances as
well.

![alt-text goes here](/img/cloud-soar/image66.png)

**Action File Portability**

Please see the Integration Framework manual for more details on
utilizing the integration framework within Cloud SOAR.


### Credential Manager - CyberArk Configuration

You can use CyberArk Credential Manager to manage data that will be used in integration resources

![alt-text goes here](/img/cloud-soar/cyberArk1.png)

Using the cogwheel icon on the right in the integrations section, the main section of the CyberArk configuration opens.

![alt-text goes here](/img/cloud-soar/CyberArk2.png)

Here you can set URL and port of the Components server, and the credentials needed to connect to CyberArk.
The Enable checkbox can be enabled or disabled later.

If enabled, when you go to open the detail of a integration resource you'll find a new checkbox ('Use CyberArk fields') at the top already active.
If the checkbox on above window is disabled, the checkbox ('Use CyberArk fields') in the resource window will be disabled by default, and it will not be possible to activate it.

![alt-text goes here](/img/cloud-soar/CyberArk3.png)

If the checkbox (**Use CyberArk fields**) is enabled, two new mandatory fields will appear:

**Account Name** > userName in CyberArk

**Platform ID** > platformId in CyberArk

Near to the fields there will be the relative toggle that will enable the related field for use on CyberArk

![alt-text goes here](/img/cloud-soar/CyberArk5.png)

In the image above you can see two custom fields of the resource with their toggles.
The first field has been enabled to use CyberArk, while the second not.

Within the CyberArk fields you need to enter the name of the Properties present in the corresponding Platform ID on CyberArk.

**Pay attention to uppercase and lowercase letters**.

![alt-text goes here](/img/cloud-soar/CyberArk4.png)

Through the name of the Properties, (in the above case **MB3**), during the execution of the resource, it will be replaced with the value present on CyberArk for that resource, (in our case **84ca4444-9082-40b7-**)

In the fields enabled for CyberArk, in addition to the account properties, you can also recall the value of the CyberArk Account password, to do this, write the word **Password** in the field

**Pay attention to uppercase and lowercase letters**.

:::important
If the checkbox for CyberArk is enabled for a resource field, the data type allowed for that field will be string only, even if the same field was configured to accept lists, checkboxes, numbers, etc.
:::

**The only property that will be retained is the mandatory nature of the field**.

Values entered in the field not enabled for CyberArk, if previously entered and saved, will be retained if the field becomes enabled for CyberArk.
The same is not true otherwise.

If the CyberArk switch is enabled and one switch on the field line is disabled, that CyberArk field value will be saved empty

![alt-text goes here](/img/cloud-soar/CyberArk6.png)


### Configuring the automation bridge for CyberArk

If you are using CyberArk you will need to add the following certificates given by CyberArk:
```
**RootCA**new.crt**
**client**new.crt**
**client**new.pem**
```
to the **/opt/automation-bridge/** directory.

**The names must be exactly the same**.

### Automation

The **Automation** section contains the configuration tools for Cloud SOAR's
automation and orchestration features. These tools include Cloud SOAR's Open
Integration Framework (OIF), automation rules sets , playbook editor as
well as incoming event details.

### App Central

App Central permits to unlock the full CLOUD SOAR potential. From this section the user
can search and add new integrations, new playbooks, and even complete use cases with all the
components needed (automation rules, integrations and playbooks) in one place.

![alt-text goes here](/img/cloud-soar/appcentral.png)

While browsing available integrations, user can check the details and all the actions available
and install it.

### Playbook

Playbooks are automated workflows which can be configured to execute
automatically without user intervention, acting on information from the
incident, or can be executed in interactive mode, where user input is
required to authorize predefined actions.

To configure a new Playbook, navigate to:

![alt-text goes here](/img/cloud-soar/image71.png)

**Global Function Menu** > **Automation**
**Playbook**

A list of any previously created Playbooks will be displayed on the
left-side of the page. Click **+** to add a new playbook.

A new configuration box will be displayed. Name your new playbook and
select the **Incident Type** to associated with it (To create a new
**Incident Type**, see **Custom Fields**), and click save to continue.

Once the new playbook has been saved, it will be displayed on the
left-side of the screen. To begin to configure the new playbook, select
it from the list and click the **Edit** button at the bottom of the
screen.

![alt-text goes here](/img/cloud-soar/image72.png)

**Playbook List**

Opening the playbook will present a black screen with a **Start** node, and
an **End** node. These nodes dictate the beginning and the end of the
playbook's automation sequence. They can be dragged and dropped anywhere
on the screen to allow for multiple integrations and conditional
statements to be executed.

To begin to add the first node within the new playbook, click the **+** on
the **Start** node.

![alt-text goes here](/img/cloud-soar/image73.png)

**New Playbook**

The playbook configuration page is displayed. It gives users the ability
to choose from the following options:
* **Action**: Automatically take specific actions such as enriching
 data or taking containment steps when an Incident Template is matched

 **Task**: Assign a task to an Cloud SOAR user

 **Condition**: Use conditional statements to define what actions
 should be taken in response to previous input/output feeds

 **User Choice**: Pause automatic processing to allow for manual
 intervention

 **Playbook**: Call other R3 Playbooks in response to conditional
 statements and/or user choice actions

**Action**

Select **Action** from the node types. A new screen will be displayed
showing all actions a user has to choose from. These action types
(Enrichment, Containment, Custom Actions, and Notifications) will
directly interact with Cloud SOAR's integrations to either gather data or
initiate actions automatically.

![alt-text goes here](/img/cloud-soar/image74.png)![alt-text goes here](/img/cloud-soar/image75.png)

**Node Adding**

As an example, lets choose Enrichment from the action type screen. As
with any action type we choose, a new section will be added to our
configurations screen asking for more clarifying information on how we
would like this action to be performed.

Title the enrichment action something that can easily be identified by
the action that is being taken, such as **Domain Reputation Check**.
Next, we want to choose the action, expand the **Action** drop down list
and review the available options.

![alt-text goes here](/img/cloud-soar/image76.png)

**Node Creation**

![alt-text goes here](/img/cloud-soar/image77.png)

**Node Resource Adding**

Expand the **Resource** drop-down list to
view all active Integration feeds. The feeds found in each action type
are those who can execute the specified action (i.e. blocking of an IP
address can be done through firewalls/WAFs, etc.). Once a resource is
assigned a new drop-down list will be displayed. Options found in this
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

![alt-text goes here](/img/cloud-soar/image78.png)

**Node Menu**

**Task**

From the node selection menu, choose **Task**. A new configuration screen
will be displayed. Title the new task and add any description if
desired. The next drop-down lists are **Authorizer** and **Owner** fields.
The **Authorizer** field is the user who is assigning the task, and the
**Owner** field is the user who will be assigned the task to complete.
When the task has been developed, click **Create**.

![alt-text goes here](/img/cloud-soar/image79.png)

**Task Node**

For playbook entities which support user-defined text input, such as email notifications, help desk ticket creation and task creation, variable placeholders may be added to the user defined text which will be replaced with incident variables at run
time. These variable placeholders may be added by clicking on the
![alt-text goes here](/img/cloud-soar/image80.png) icon. To add a variable placeholder,
begin typing in the newly inserted placeholder box and Cloud SOAR will
display a list of available options which match. For example, typing
**incident**. will display a list of all the valid incident fields which
may be added as variable placeholders.

**Condition**

From the node's menu, choose **Condition**. A new configuration screen
will be displayed which will enable a user to define a conditional
statement to be met before the next node type can be executed. Under
**Condition 1,** click on **Select a value** to define the first
condition.

![alt-text goes here](/img/cloud-soar/image81.png)![alt-text goes here](/img/cloud-soar/image82.png)

**Condition Node**

When developing the first condition, users have multiple options to
choose from:

- **Insert a custom value**

    - Will execute when a user-defined variable is observed within an
        Incident

- **Get value from an Incident field**

    - Will execute when a value is observed within an Incident Field
        (See [**Incident Fields**](#**Custom**Fields)**)**

- **Get value from Triage Field**

    - Will execute when a value is observed within a Triage Field (See
        [**Triage Fields**](#triage-1))

- **Get value from previous action**

    - Will execute when a value is observed from a previous input or
        output field

From our earlier example we are going to choose to evaluate the output
from our Domain Reputation check of the observed domain. Click **Output**
from **Get value from previous action**.

A list of available results or outputs from the previously selected
integration will be displayed in JSON format. Select which output type
(hashes, IP addresses, domains, etc) to evaluate and add it to the
condition.

![alt-text goes here](/img/cloud-soar/image83.png)

**Node Placeholder Function**

The selected output type will be displayed under **Condition 1**. Select
which condition you would like for the output results to meet from the
inequality operators below and click **Select a value** to define the
condition.

![alt-text goes here](/img/cloud-soar/image84.png)

**Condition Node Settings**

The condition we want to meet for this example is "Advance this Incident
forward if the observed domain returns at least 1 result or **row** from
VirusTotal". We insert **0** into the custom value field and click **+** to
add it to the condition.

![alt-text goes here](/img/cloud-soar/image85.png)

**Manual Value Adding**

Now that **Condition 1** is defined*,* users can choose to filter their
results further by selecting an AND/OR operator to define another
condition.

![alt-text goes here](/img/cloud-soar/image86.png)

**Condition Settings**

Once the condition is defined, click **Create** to add it to the playbook.

When new conditions are created, we will need to define what happens
when their results meet one of our criteria. A new node is added to the
condition below. This node breaks the condition down into successes and
failures and can be modified by hovering over it and clicking **+**.

![alt-text goes here](/img/cloud-soar/image87.png)

**Use of Condition**

This new node represents a decision tree in which both results, success
or failure, will have to be defined. Follow the steps above to finalize
the condition

![alt-text goes here](/img/cloud-soar/image88.png)

**Nodes List**

User Choice

From the node's menu select **User Choice**. The User Choice option allows
for the system to pose a question to the incident owner. Based off of
the analysis the incident owner performs on the previous information
gathered, they will be presented a choice to take an automated action
such as blocking an IP at the firewall or Quarantining an end-user
workstation from the network.

![alt-text goes here](/img/cloud-soar/image89.png)

**User Choice**

![alt-text goes here](/img/cloud-soar/image90.png)

**Placeholders**

Define the question to be answered and the authorizer of the user choice
selection and click ****Create**** to finalize.

The results of execution -- successes, failures, and outcomes -- are
visible the Playbook's individual node details. The results of
enrichment, containment and custom Playbook actions undertaken on
incident artifacts, e.g., IP addresses, URLs, domains, etc., are
catalogued in the incident's **Entities** module.

Just in case that a playbook fail, it can be re-executed inside the incident again or on the failing node through the Kill ![alt-text goes here](/img/cloud-soar/image33c.png) & Run ![alt-text goes here](/img/cloud-soar/image33d.png) process available in the playbook screen of the incident. However, a failed node will not stop the playbook from being executed. Only tasks and User Choices will lock the playbook in a **Running** state until the user take action.

![alt-text goes here](/img/cloud-soar/image33e.png)

**Playbook Running State**

![alt-text goes here](/img/cloud-soar/image33e1.png)

**Playbook Completed With Errors Status**

### Incident Templates

Incident Templates define the way in which incidents will be created for
a specific alert, incident type or event. Incident Templates can be used
to define attributes such as the incident type, severity, assignment,
and any other default or custom incident parameters. As rules are
created for generating incidents based on syslog messages, email, SIEM
integrations or other data sources, it is the Incident Templates which
will define how the initial incident will be created.

To create a new template, navigate to the Global Function menu and
select **Automation > Incident Templates**

![alt-text goes here](/img/cloud-soar/image91.png)

**Incident Template**

Under the Incident Templates page, you will find all previously created
templates on the left-side of the screen. To add a new Incident
Template, click **+** to proceed.

![alt-text goes here](/img/cloud-soar/image92.png)

**New Incident Template**

A new configuration box is displayed. As seen in our previous
configurations, you will need to name your template. Make sure it is
something easily identifiable and related to the activity it is
developed for. The next section is asking for a **Category**. This field,
as well as all other fields within the Cloud SOAR platform, can be
customized to fit the user's environment (see [Custom Fields](#Custom-Fields)).

In our example we are building an Incident Template for a DLP incident.
The category we chose is titled **Data Theft** but can be called anything
in which we choose to identify it as. Users also have the option to add
**Tags** which can be used to further categorize of define the incident,
and can be used when searching for or correlating events. Once our
template is named and categorized, click **Next** to continue.

Under the **Incident** tab administrators may define any incident
parameters they wish to set by default when an incident is creating
using the template. This often includes parameters such as type, kind
and severity. All variables marked with an asterisk (*) are required to
complete the Incident Template (See **Custom Fields** to adjust the fields
requirements). As mentioned earlier, all fields are customizable via the
**Custom Fields** section. Once all required variables have been defined,
click **Next** to continue.

![alt-text goes here](/img/cloud-soar/image93.png)

**Incident Template Editor**

The remaining tabs in the Incident Template dialogue are as follows:
- **Incident details**:
    To set up details for a specific incident type.
- **Description**:
    Free text area to describe details of the template.
- **Playbook**:
    Playbook which should be automatically assigned to
    an incident. For each playbook, user can choose to have
    the Playbook automatically execute immediately upon incident
    creation or assigned and wait for manual execution.
- **Investigators**:
    Investigators who should be automatically assigned to the incident.
- **Notes**:
    Notes which should be created for the incident.

#### Creating Incidents from Automation Rules

Cloud SOAR can ingest, parse, and process incident data from email, syslog
and bidirectional integrations. For Cloud SOAR to begin processing incident
data from these sources, the **Automation Rules**
features need to be configured.

The configuration page can be found in the **Global Functions** menu under
**Rules**

![alt-text goes here](/img/cloud-soar/image94.png)

**Cloud Soar Configuration Menu**

#### Automation Rules

#### Syslog and CEF Format

As mentioned earlier, Cloud SOAR can ingest, parse, and process incident
data from any device which can send syslog messages. Cloud SOAR supports the
Common Event Format (CEF) standard via syslog. Although CEF is not a
requirement, parsing rules can be configured to parse any formatted data
from syslog messages, Cloud SOAR will automatically parse CEF fields when
present in messages. Cloud SOAR also uses the CEF standard extensions for
defining variables within Cloud SOAR.

For details on the CEF standard, please visit
https://kc.mcafee.com/resources/sites/MCAFEE/content/live/CORP**KNOWLEDGEBASE/78000/KB78712/en**US/CEF**White**Paper**20100722.pdf.

CEF messages are formatted as follows:
```
CEF:Version|Device Vendor|Device Product|Device Version|Signature
ID|Name|Severity|Extension
```

Listed below are each CEF prefix field. Understanding what each of these
fields do, and what to expect in these fields will help us to create
strong agile rulesets for deployment.

- **Version**: Displayed as an integer and identifies the version of
    CEF format
    - Important when understanding the following field representations
        as these features may change depending on version
- **Device Vendor, Device Product, and Device Version**: Unique
    strings which will identify the make, model, and version of the
    device sending the log
- **Signature ID**: Unique identifier per event type.
- **Name**: Human-readable identifier which describes the event (ex:
    Port Scan, Malware)
- **Severity**: Reflects the severity of the event
    - Ranges between 0-10 with 10 being most important
- **Extension** - Collection of key-value pairs

**Example CEF with Syslog header:**

Sep 19 08:26:10 host CEF:0|Palo Alto|Panorama|9.0|200|worm
successfully stopped|10|src=10.0.0.1 dst=2.2.2.2 spt=1234

#### Creating a Rule

Select **Automation Rules** page follows the same format as
all customizable Cloud SOAR features, click **+** to create a new automation
ruleset

![alt-text goes here](/img/cloud-soar/image95.png)

**Rule Creation**

Select a name for the rule, then select the daemon to use with this new rule and the resource and fill all the remain parameters.

In the detail section of the rule you can define filters to be used in the rule and the action to be performed.

The **Action Type** drop down will contain the specific actions Cloud SOAR can
take when the specified activity is observed. Users have the option to
take the following actions:

- Create incident from template
    - Most common action
    - Specify what incident template to use (See **Incident
        Templates)**, the incident owner, and incident ID format
- Close incident
    - Allows for the automatic closure of a known false positive
        incident
- Update incident
    - Updates a field in an existing incident based on parameters from the parsed message
- Change incident status
    - Change the incident status based on parameters from the parsed message
- Set task progress
    - Set task progress based on parameters from the parsed message
- Close task
    - Close a task based on parameters from the parsed message
- Add to Triage
    - Create a new triage event based on parameters from the parsed message

To add a new mapping setting, click on plus button near Mapping if enable for that action.

![alt-text goes here](/img/cloud-soar/image103.png)

**Parsing Rules**

Playbook

A **Playbook** is a predefined set of actions or tasks to respond to a
certain event or incident type. The creation and utilization of
playbooks can allow an organization's teams to respond to an incident
in a consistent, focused, and repeatable fashion.

Once assigned to an incident, these predefined actions and tasks can
be converted to actual tasks within Cloud SOAR for assignment to users and
oversight by management.

Playbook Template

When a Playbook is assigned to an incident, each individual task can
be assigned attributes, such as who it is assigned to, who has
authorized the task, and when it is due. A **Playbook Template** permits
administrators to predefine some of these attributes based on an
existing Playbook so that they appear as defaults when the Playbook
Template is utilized.

Playbook

Playbooks are the core of Cloud SOAR's automation capabilities. Playbooks
permit administrators to create automated and semi-automated workflows
utilizing Cloud SOAR integrations, tasks and a variety of flow control
decisions and other actions.*

**playbook** workflows can be configured to execute automatically without
human intervention, or can be executed in an interactive mode, where
user input is required to authorize predefined actions.

Incident Template

**Incident Templates** allow users to define a certain number of incident
attributes that will automatically be set each time an incident is
generated based on the template. This may include type, classification,
incident assignment, playbooks, Playbooks, knowledgebase articles or any
other incident attribute.

Report Template

**Report Templates** allow users to build their own reports by selecting
various components of an incident they wish to include in the report.
These components can include incident details, evidence, hosts,
observables and many others.

Custom Fields

**Custom Fields** allows administrators to edit existing fields as well as
add new fields for almost every section of Cloud SOAR. All Cloud SOAR sections
which permit custom fields are displayed on the left-hand side of the
page. Clicking on any one of these sections will display all current
fields for that section on the right-hand side of the page. Any existing
field may be edited, to include changing the name or adding list values.
The only attribute which cannot be changed is the type of the field,
such as text or date. New fields may also be added from this page.
Integrations

The Integrations section allows administrators to configure
bidirectional integrations with third-party technologies, as well as
view the supported actions for each integration. In addition, this
section allows administrators to manage custom scripts, which can be
written in Python, Perl, PowerShell or Bash.

#### Audit and Information

All audit and licensing information can be found under the Audit and
Information tab.

![Audit and Information Menu and License Information](/img/cloud-soar/image120.png)

All license information can be found in this section.

Automation Bridge Monitoring

In this section is displayed the status of the automation bridges configured

Audit Trail

Cloud SOAR audit logs and activity can be reviewed under the **Audit Trail**
section of the menu. Users can filter through activity displaying only
errors and warnings or build their own filters for review. Log rotation
settings and the ability to export audit findings can be controlled from
the **Audit** menu at the top of the screen.

![**Audit Trail**](/img/cloud-soar/image120b.png)



Mail Notification Queue

The **Mail Notification Queue** shows the status of all email
notifications sent by Cloud SOAR.

![**Mail Notification Queue**](/img/cloud-soar/image121.png)

By navigating to the Mail Notification Queue users can view any delivery
failures, the details of the original notification, as well as have the
options to resend or delete the notification.

Logged Users

The **Logged User** section of the Cloud SOAR platform contains session
information for the user who is currently logged on to the Cloud SOAR
platform. For administrators of the Cloud SOAR platform, this section will
show all authorized user session activity.

### Manually Creating a New Incident

To manually add an Incident, click the **+ Incident** button on the top
right-side of the screen.

![**Incident Overview Screen**](/img/cloud-soar/image125.png)



A new configuration box will be displayed which contains fields an
investigator can utilize to develop their incident. Not all these fields
are mandatory. The ones which are required will have an asterisk (*)
marked next to it which indicates the field has a dependency within the
Cloud SOAR platform. These required fields can have their dependencies and
requirements adjusted in the **Custom Fields** section found under the
Global Functions menu **Customizations > Custom Fields**.

![**New Incident Editor**](/img/cloud-soar/image126.png)



One of the most important fields is the **Type** field. This field will
dictate which Playbooks will be recommended later on in the configuration
process. (See **Custom Fields** to modify the variables displayed in the
**Type** field)

![**New Incident Editor**](/img/cloud-soar/image127.png)



Once the details page is completed, users will want to assign
appropriate Playbooks to be associated with the incident. In addition to
adding the playbook to the incident, users can also decide whether they
want the playbook to automatically execute upon incident creation by
sliding the **Autorun** button to On.

![**New Incident Editor**](/img/cloud-soar/image128.png)



When creating an incident manually, the investigator may already have
artifacts that they would like to add to the incident. The Incident
Artifact section allows for the manual entry of new artifacts. To add a
new artifact click **Add Artifact** and choose what target field to append
the data and add its value. Once completed, click **Next**.

![alt-text goes here](/img/cloud-soar/image129.png)

Incident Artifacts

Users have the option to create manual Parent/Child relationships
between the new incident and any previous incident created in Cloud SOAR.
Click the **Advanced** button at the bottom of the screen to select an
existing incident to group together.

![**Incident Relationships**](/img/cloud-soar/image130.png)

The final step in manual incident creation is to add an investigator or
a group of investigators to the incident. Select an investigator or
group from the left side of the screen by double-clicking on their name
and the investigator will be added ot the investogtors pane. Once
finished click **Create**.

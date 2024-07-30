---
id: incidents-triage
title: Cloud SOAR Incident Management and Triage
sidebar_label: Incidents and Triage
description: Automated real-time incident management and threat response.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

## SecOps and dashboard

The SecOps screen is where all your current tasks reside. Here you can approve, decline, and close tasks as well as customize this section to display all tasks assigned to a specific user or group.

<img src={useBaseUrl('img/cloud-soar/image26.png')} alt="Home page" width="800"/>

In the upper left corner you can select **Dashboard** to see dashboards showing your tasks. For more information, see [Dashboards](#dashboards).

## Incidents

### Incident generation process

 [Incidents](/docs/cloud-soar/incidents-triage/) are at the heart of Cloud SOAR. Incidents are events that require investigation and remediation. Cloud SOAR generates incidents with an automated process:
 1. An alert is received by Cloud SOAR via an integration.
 1. [Automation rules](/docs/cloud-soar/automation/#creating-incidents-from-automation-rules) process the alert. Behind the scenes, parsing rules break out the data into artifacts to be used as arguments in playbooks, such as IP addresses, usernames, host names, and so on.
 1. The data is fed into an [incident template](/docs/cloud-soar/automation/#incident-templates).
 1. [Playbooks](/docs/cloud-soar/automation/#playbook) run against the data.
 1. Cloud SOAR generates an [incident](#incident-generation-process)).

<img src={useBaseUrl('img/cloud-soar/cloud-soar-automation-flow.png')} alt="Cloud SOAR automation flow" style={{border: '1px solid gray'}} width="800" />

### Incidents screen

The **Incident** section lists all Cloud SOAR incidents. Clicking on any of the incident IDs in the Incident section will open the incident. You can configure what incidents are displayed by creating queries against available incident data and saving them as incident filters.

<img src={useBaseUrl('img/cloud-soar/image140.png')} alt="Cloud SOAR incidents"/>

Watch this micro lesson to learn more about Incidents in Cloud SOAR.

<Iframe url="https://www.youtube.com/embed/GDWFGJ8JOqA?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

### Filtering Incidents

You can also manipulate what data is to be displayed from the Incident section by adjusting which columns are viewable. The adjust these columns, click on the cogwheel on the top right-side of the screen. This will display a configuration screen that allows you to choose which data is displayed and where on the screen it should be displayed by clicking the + sign next to the selection and then dragging and dropping the selection in the order to be viewed.

<img src={useBaseUrl('img/cloud-soar/image141.png')} alt="Adjust columns" width="800"/>


Once the columns are added and organized, click **Apply** to continue.

From the Incident section you can search, build, and issue queries against existing incidents by simply typing in the search bar at the top of the screen.

<img src={useBaseUrl('img/cloud-soar/image142.png')} alt="Search issues" width="800"/>

Cloud SOAR also provides its you with a command cheat sheet to help build incident filtering queries. To access the cheat sheet, click on the information icon to display the query options.

Once a query or a search is committed, they can be saved for future use by clicking the star icon to the right of the search bar. These saved searches will be stored as tabs just below the search bar.

<img src={useBaseUrl('img/cloud-soar/image145.png')} alt="save query" width="800"/>

Bulk actions may be performed on any incidents in the Incident Overview list. To perform bulk actions on incidents, check the incidents you wish to perform the bulk actions on, then click the three-dot kebab menu in the upper left-hand corner of the screen and select the appropriate bulk action. Bulk actions include:
- Edit
- Close
- Reopen
- Delete
- Restore
- Add Investigator
- Change Owner <br/><img src={useBaseUrl('img/cloud-soar/image146.png')} alt="Bulk actions" width="200"/>

### Add investigators

Investigators are users who are involved in incidents and have access to perform operations on the incidents and view the incident data. To be able to add investigators to incidents, you must be assigned the **Manage Investigators** [Cloud SOAR role capability](/docs/manage/users-roles/roles/role-capabilities/#cloud-soar).

To add investigators to incidents:

1. <!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> At the top of the screen, click **Incidents**. <!--Kanso <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu, select **Cloud SOAR > Incidents**. You can also click the **Go To...** menu at the top of the screen and select **Incidents**.  Kanso-->
1. Check the incidents you want to add investigators to.
1. Click the three-dot kebab menu in the upper left-hand corner of the screen.
1. Select **Add Investigator**.<br/>The **Add Investigator** screen is displayed. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-add-investigator.png')} alt="Add Investigator dialog" style={{border: '1px solid gray'}} width="700"/>
1. Select the investigators to add to the selected incidents.
   :::info
   You can also select groups in addition to selecting individuals. For more information, see [Groups](/docs/cloud-soar/overview/#groups).
   :::
1. In the **Role** column, select the role assigned to the users that you want them to have as investigators. For example, select Analyst, Administrator, or some other role. The roles must have the appropriate Cloud SOAR role capabilities that you want them to have as investigators of the incidents.
1. Click **Apply**.

#### View investigators assigned to an incident

1. <!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> At the top of the screen, click **Incidents**. <!--Kanso <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu, select **Cloud SOAR > Incidents**. You can also click the **Go To...** menu at the top of the screen and select **Incidents**.  Kanso-->
1. Select an incident. The investigators appear in the **Investigators** widget. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-incident-investigators.png')} alt="Investigators widget" style={{border: '1px solid gray'}} width="400"/>
1. To add another investigator to the incident, click the **+** icon in the upper-right of the dialog.
1. To remove an investigator from the incident, hover your mouse over the investigator name and click the trash can icon that appears to the right.
1. To change the role an investigator has for the incident, in the **Role** column select the role assigned to the user that you want them to have as an investigator.

#### Investigator roles

When you add an investigator to an incident, you select the [role assigned to the users](/docs/manage/users-roles/roles/add-remove-users-role/) that you want them to have as an investigator. The selected role must have the appropriate [Cloud SOAR role capabilities](/docs/manage/users-roles/roles/role-capabilities/#cloud-soar) that you want the investigator to have to be able to effectively investigate the incident.

For example, an incident contains sensitive data in the notes section. If you want the investigators on the incident to be able to access the notes data, the investigators you assign to the incident must have the **Note > Access** Cloud SOAR role capability assigned to their role.

:::note
To allow users to access incidents without being added as investigators, assign them the **Incident > Access all** role Cloud SOAR role capability. This privilege is useful for users who need to monitor all incidents.
:::


### Incident details

Opening an incident from any section of Cloud SOAR will display the Incident Details page. The Incident Details page is composed of three sections: The Incident VIP Section, on the left side of the screen, the Incident Properties section in the center, and the Incident Widgets section to the right side of the screen.

<img src={useBaseUrl('img/cloud-soar/image147.png')} alt="Incident details page" style={{border: '1px solid gray'}} width="800"/>


#### Incident VIP section

<img src={useBaseUrl('img/cloud-soar/image148.png')} alt="Incident VIP section" style={{border: '1px solid gray'}} width="300"/>


The Incident VIP Section displays high-level details about a specific incident. You can also take actions such as add additional investigators or close the incident from this section. To view all available actions, click the vertical ellipsis to the left of the cogwheel. You can change the owner of the incident, change the folder where the incident is housed, export the Incident details via PDF, DOC, or [custom report](/docs/cloud-soar/legacy/legacy-cloud-soar-main-menu/#custom-reports), and clone or permanently delete the incident.

To customize the details displayed in the Incident VIP Section, click the cogwheel at the top-right of the section. A new screen will be presented which will allow for adding and deleting of incident detail fields. To add a new field, you will click on the **+** sign next to the field to be added. Once all the desired fields are added, they can easily be rearranged in the desired order by dragging and dropping into place. To remove a field, simply click the **x** next to the field to be removed. Once all the details have been added and are in place, click **Apply**.

#### Incident Properties

The Incident Details section contains all the important information that makes up the incident, such as executed Playbooks and incident tasks. This information is divided into four different sections: **Overview**, **Operations**, **Entities**, and **Documentation**.

<img src={useBaseUrl('img/cloud-soar/image149.png')} alt="Incident Overview" style={{border: '1px solid gray'}} width="600"/>

##### Overview

The Incident Overview section contains all the pertinent information for a specific incident such as the severity, SLA counter, and category of alert. This information can be customized in the Custom Fields section of the platform. For more information, see [Custom fields](/docs/cloud-soar/overview/#custom-fields).

##### Operations

The Operations section contains all the investigative information for a specific incident and is broken out into the following sections: **War Room**, **playbook**, **Tasks**, and **Notes**.

Watch this micro lesson to learn more about security automation with playbooks.

##### War Room

All the information related to the incident ongoing are visible in one place in the War Room section. You can quickly view and check all the steps of the analysis, done either manually or by the automation, any entities related to the incident, results of actions performed and notes added during the incident's investigation. Information can be filtered out for the different categories, and by pressing the **+** button, you can add new notes.

<img src={useBaseUrl('img/cloud-soar/war_room.png')} alt="War room" style={{border: '1px solid gray'}} width="800"/>

##### Playbooks

Any playbook that has been applied to an incident can be found under the playbook section. You can quickly view and make any necessary adjustments to the incident's Playbooks as well as add any additional Playbooks that may be required during an incident's investigation.

<img src={useBaseUrl('img/cloud-soar/image150.png')} alt="Playbook option menu" style={{border: '1px solid gray'}} width="800"/>

The playbook option menu can be found at the bottom of the playbook screen. From here, you can re-execute a playbook, export, edit, or expand the existing playbook. If during an incident's investigation it is determined that the type of incident has changed (i.e. phishing incident turns into a ransomware incident) another type of playbook may be needed to correctly remediate an incident. You can add additional Playbooks to the incident by clicking the **+** sign at the top of the playbook screen.

<img src={useBaseUrl('img/cloud-soar/image151.png')} alt="Add playbook" style={{border: '1px solid gray'}} width="800"/>

This will open a new screen that lists all available Playbooks. Either type in the playbook name to use or manually search through all available options and click **Add** when finished.

##### Viewing Playbook Results

The results of a Playbook, either while it is executing or after execution has completed, can be viewed from the playbook section. By clicking the expansion button on the bottom left of the screen will expand the playbook and will display the execution results.

<img src={useBaseUrl('img/cloud-soar/image152.png')} alt="Playbook results" style={{border: '1px solid gray'}} width="800"/>

The results of the playbook can also be viewed as a list by clicking the **List** button next the **+** at the top of the page. The execution path of the playbook will be shown, along with the status of the execution of each action. The execution history of the playbook will be displayed in a tab on the right-hand side of the screen, which can be minimized.

<img src={useBaseUrl('img/cloud-soar/image153.png')} alt="Action details" style={{border: '1px solid gray'}} width="800"/>

To view the details of any individual action, including the results, click on the action node. A new window displaying the action details will be displayed on the left-hand side of the screen. From this view, you can see the status of the action, its configuration, and have the choice to download the JSON results of the action.

<img src={useBaseUrl('img/cloud-soar/image154.png')} alt="Action details" style={{border: '1px solid gray'}} width="500"/>

To view the details of the result, click on the magnifying glass and the action's details window will be displayed. The details section displays the results of the action in table view which you can also filter through by using the details search bar at the top of the screen. For more detailed information, you can switch to the action's JSON results
screen by clicking the **View JSON Results** button next to the action's search bar. The JSON results view displays the full results of the executed action. Because some integrations return large data sets, the table view is designed to show only a select set of attributes. To view the complete results of verbose integrations, the JSON tab should be
used.

<img src={useBaseUrl('img/cloud-soar/image155.png')} alt="Action result" style={{border: '1px solid gray'}} width="500"/>

<img src={useBaseUrl('img/cloud-soar/image156.png')} alt="Action result JSON" style={{border: '1px solid gray'}} width="800"/>


#### Tasks

Cloud SOAR's Tasks section allows incident managers to assign and track tasks which must be completed during an investigation. Tasks may be added from Playbooks or Playbooks, as discussed in previous sections, or manually from the incident's Tasks section.

<img src={useBaseUrl('img/cloud-soar/image157.png')} alt="Tasks" style={{border: '1px solid gray'}} width="800"/>


##### Adding a Task

To add a new Task, click the **+** button at the top-left of the Task list screen. Fill in all required fields and add any additional information necessary under the **Description section** if desired.

The user listed in the **Assigned to** field will be the user responsible for completing the task.

The field titled **Effort** should be the number of hours estimated to complete the Task. As the Task is updated by the Assignee, this field should be changed to reflect the actual number of hours that were required to complete the Task. This number will be used to provide Task Assessment information, discussed in more detail in the Documentation section of this manual.

<img src={useBaseUrl('img/cloud-soar/image158.png')} alt="New task" style={{border: '1px solid gray'}} width="800"/>

##### Working with Tasks

Once a task has been created and assigned, it will appear in the **Home** section of the Main Menu. To view the details of a task click on the task from the **My Operations** section of the screen, or to view a task by its incident, select one or multiple incidents from the task list on the left-side of the screen.

<img src={useBaseUrl('img/cloud-soar/image159.png')} alt="View tasks" style={{border: '1px solid gray'}} width="800"/>

Selecting a task will open the incident where the task was created. This will allow you to review the details of the task and access any automated Playbooks and notes from the incident investigation. Once the incident data has been reviewed investigators can choose to approve, approve and close, or decline a task by clicking the thumbs up, thumbs
down or check mark buttons next to the task's title.

<img src={useBaseUrl('img/cloud-soar/image160.png')} alt="Task selected" style={{border: '1px solid gray'}} width="800"/>


#### Notes

Like the Tasks section, the Notes section contains all notes either automatically created during a playbook's execution or manually created during the incident's investigation. Both sections offer the ability to export and search for different results depending on the operational need.

<img src={useBaseUrl('img/cloud-soar/image161.png')} alt="Notes" style={{border: '1px solid gray'}} width="800"/>

##### Adding a Note

To manually add a note, click the **+** symbol to the left of the search bar and a new configuration screen will appear. Enter the note into the free form text box and click create when finished.

<img src={useBaseUrl('img/cloud-soar/image162.png')} alt="Add note" style={{border: '1px solid gray'}} width="800"/>

#### Closing Note

Closing incident will result in asking a note for incident closing as below:

<img src={useBaseUrl('img/cloud-soar/image57b.png')} alt="Close Incident" width="400"/>

<img src={useBaseUrl('img/cloud-soar/image57c.png')} alt="Closing Note" width="800"/>

#### Documentation

The **Documentation** section provides investigators with an area to
document all steps taken during an incident's investigation.

#### Attachments

The **Attachments** section is a repository for investigators to use to
house attachments related to an incident's investigation. The source of
this data can vary but will often be the output of monitoring tools and
supporting documents. For each record, users can define:

- **Reference**: an identifier for what the record refers to;
- **Date**: a timestamp for when the record was uploaded;
- **Application**: information about the system or application used to generate the record;
- **Short description**: a free-form textual description of the record; and,
- **Parent folder**: employed if arranging various records in a tree structure for logical classification.

As with our other documentation tools, attachments can also be added as
a timeline event and associated with a knowledge base article.    

<img src={useBaseUrl('img/cloud-soar/image172.png')} alt="New Attachment Screen" width="600"/>

### Create a new incident manually

To create an Incident manually, click the **+ Incident** button on the top right-side of the screen.

<img src={useBaseUrl('img/cloud-soar/image125.png')} alt="Incident Overview Screen" style={{border: '1px solid gray'}} width="800"/>


A new configuration box will be displayed that contains fields an investigator can utilize to develop their incident. Not all these fields are mandatory. The ones which are required will have an asterisk (`*`) marked next to it which indicates the field has a dependency within the Cloud SOAR platform. These required fields can have their dependencies and requirements adjusted in the **Custom Fields** section.

<img src={useBaseUrl('img/cloud-soar/image126.png')} alt="New Incident Editor" style={{border: '1px solid gray'}} width="800"/>

One of the most important fields is the **Type** field. This field will dictate which Playbooks will be recommended later on in the configuration process. See **Custom Fields** to modify the variables displayed in the **Type** field.

<img src={useBaseUrl('img/cloud-soar/image127.png')} alt="New Incident Editor" style={{border: '1px solid gray'}} width="800"/>

Once the details page is completed, you will want to assign appropriate Playbooks to be associated with the incident. In addition to adding the playbook to the incident, you can also decide whether they want the playbook to automatically execute upon incident creation by sliding the **Autorun** button to **On**.

<img src={useBaseUrl('img/cloud-soar/image128.png')} alt="New Incident Editor" style={{border: '1px solid gray'}} width="800"/>

#### Incident Artifacts

When creating an incident manually, the investigator may already have artifacts that they would like to add to the incident. The Incident Artifact section allows for the manual entry of new artifacts. To add a new artifact click **Add Artifact** and choose what target field to append the data and add its value. Once completed, click **Next**.

<img src={useBaseUrl('img/cloud-soar/image129.png')} alt="Add artifact" style={{border: '1px solid gray'}} width="800"/>

#### Parent/Child Relationships

You have the option to create manual Parent/Child relationships between the new incident and any previous incident created in Cloud SOAR. Click the **Advanced** button at the bottom of the screen to select an existing incident to group together.

<img src={useBaseUrl('img/cloud-soar/image130.png')} alt="Incident Relationships" style={{border: '1px solid gray'}} width="800"/>

The final step in manual incident creation is to add an investigator or a group of investigators to the incident. Select an investigator or group from the left side of the screen by double-clicking on their name and the investigator will be added to the investigators pane. Once finished, click **Create**.

## Triage

The Cloud SOAR Triage module ingests events via the Cloud SOAR API. You can use it
to triage events which may be unverified or have a low confidence level before they are converted to incidents. The Triage module can be completely customized for use cases from financial fraud to network IDS alerts.

### Field Settings

By default, the Triage module contains two fields, Status and Type. Additional values may be added to the Status field; however, the Type field is directly linked to the Incident Type field and cannot be modified directly. New types must be added from the Incidents section of the Custom Fields page. Up to 100 custom fields and be created for the Triage module, allowing customization for any use case.

To add additional custom fields:
1. <!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> Click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right, select **Settings**, and in the left select **Customization > Fields**. <!--Kanso <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the top menu select **Configuration**, and then under **Cloud SOAR Configurations** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. Kanso-->
1. Select **Triage Events** (or the name of the module if you have renamed it from the default of **Triage**).
1. To add a new field, click **Add** from the upper right-hand corner and configure the field as desired. Note that to be able to filter events in the Triage module based on the values of a field, **Use as filter** must be checked in the Visualization tab when adding or modifying a field.

As fields are created, they will be assigned a number starting at `1`, which will be used to identify the field when adding events via the API. The first field added will be identified as `opt_1`, the second as `opt_2`, and so on. Regardless of the ordering of the fields on the screen, these numbers will remain the same. If a field is deleted, the number will not be reused. For example, if you have defined `opt_1` through `opt_8` and delete the field `opt_8`, the next field added will still become `opt_9`. It is important to remember these field numbers, as they will be used when the API is invoked.

#### Attributes sent from Cloud SIEM

You can ingest Cloud SIEM Insights into Cloud SOAR for incident triage using the `GetInsight` Cloud SOAR API. The following Insight attributes are returned.

When you create an incident from an Insight, you can map the Insight attributes to fields in Cloud SOAR as follows:

| Attribute in Cloud SIEM | Field in Cloud SOAR |
| :-- | :-- |
| `assignee` | `Insight Assignee` (custom field) |
| `created` | `Start time` |
| `description` | `Additional Info` |
| `entity.value` | `Primary Entity` (custom field) |
| `entity.type` | `Entity Type` (custom field) |
| `id` | `Insight ID` (custom field) |
| `involvedEntities[].value` | `Involved Entities` (custom field) |
| `readableId` | `Incident ID` |
| `severity` | `Severity` |
| `status.displayName` | `Status` |
| `tags[]` | `Tags` |

:::note
When creating incidents from Insights, adding additional required attributes to the incident template will result in an error. Only those attributes sent over with Insights can be used as required attributes on the template.
:::

### Working with Events

The Triage module is accessible from the Incidents section by clicking on Triage (or the name of the module if you have renamed it from the default of **Triage**). All events which have not been converted to an Incident will be displayed in a sortable table on the Triage main screen. Events may be sorted by any column values by clicking on the appropriate column.

<img src={useBaseUrl('img/cloud-soar/image58.png')} alt="Events" style={{border: '1px solid gray'}} width="800"/>

The list of events can be filtered by any of the fields listed in the filter section at the top of the Triage main screen.

<img src={useBaseUrl('img/cloud-soar/image181.png')} alt="Filter events" style={{border: '1px solid gray'}} width="100"/>


To view the details of a Triage event, click on the box and arrow icon in the Actions column for the event. If additional information is available, it will be displayed in this Event Details screen.

To begin triaging an event, click on the person icon in the Actions column for the event to **grab** the event. Once an event is grabbed by an analyst, any Playbooks defined for that incident type will be automatically executed and the results will be displayed in the Results section of the Event Details screen. Because all Playbooks for the specified incident type are automatically executed as soon as the incident is grabbed, it is recommended that separate incident types and Playbooks be created for Triage events.

After triaging the event, the event may be reassigned to another user for further analysis, discarded or converted to an incident. To reassign the event to another user, click on the circular arrow icon in the **Actions** column for the event. To discard the event, click on the trash can icon in the **Actions** column for the event.        

<img src={useBaseUrl('img/cloud-soar/image182.png')} alt="Discard events" style={{border: '1px solid gray'}} width="100"/>

To convert the event to an incident, click **Convert to Incident** in the far right-hand corner of the Event in question. Select the appropriate incident template, owner and label, then click **Save**. The event, including all enrichment information gathered from any Playbooks, will be automatically converted to an incident.

<img src={useBaseUrl('img/cloud-soar/image183.png')} alt="Convert to incident" style={{border: '1px solid gray'}} width="400"/>

## Report

With the **Report** option, you can create incident reports to share with others as well as [widgets](#create-widgets) to use in the report that display text, graphs, tables, and charts containing details about incidents and other aspects of Cloud SOAR.
<!--Kanso
 Kanso-->
1. <!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> Click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right and select **Report**. <!--Kanso <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu, select **Cloud SOAR > Report**. You can also click the **Go To...** menu at the top of the screen and select **Report**. Kanso--> <br/>The Report UI appears. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-report-ui.png')} alt="Reports user interface" width="600"/>
1. Click the **+** icon in the upper left corner.
1. On the right side, select widgets to add to the report from **My Widgets** or **Public**. These are the same widgets that are available to use in [dashboards](#create-a-dashboard). Widgets can be graphs, charts, tables, or any kind of visual element that contains information. Click **New** to [create a new widget](#create-widgets). Click **Show List** to see all available widgets.  
1. Rearrange the widgets in the report as needed.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-widgets-in-report.png')} alt="Widgets in a report" width="600"/>
1. Click **Save**. In the dialog:
    1. Provide a **Report name** and a **Description**.
    1. Click **Schedule** to schedule the report to run on a regular basis.
    1. Scroll to the bottom of the dialog and click **Public** if you want to make the report available to others.
    1. Click **Save**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-save-report.png')} alt="Save a report" width="300"/>
1. Click **Export** to export the report to PDF.
1. Click **Open** to open available reports.

## Dashboards

Watch the following micro lesson to learn about dashboards and KPI reports.

<Iframe url="https://www.youtube.com/embed/NRdtAvxhuOY?rel=0"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />

The Cloud SOAR Dashboard layout renders data for quick comprehension
using a combination of graphics (e.g., charts, tables, graphs, and
visual indicators) called Widgets. The data is helpful to security
analysts tasked with incident handling and operational activities and
provides supervisors and stakeholders a summary overview from which to derive strategic information.

<img src={useBaseUrl('img/cloud-soar/image27.png')} alt="Dashboards" width="800"/>

Cloud SOAR's dashboards section is used to highlight the most important
pieces of data to the user or investigator who is logged into the
platform. This data is presented through the use of multiple widgets
that you can add, remove, and customize to include all data relevant
to your job functions and duties.

<img src={useBaseUrl('img/cloud-soar/image131.png')} alt="Cloud Soar Dashboard" width="800"/>

To begin customizing the dashboard select the **Customize** button on the top of the screen. Once selected, a new configuration box will be displayed.

<img src={useBaseUrl('img/cloud-soar/image132.png')} alt="Dashboard Widget Editor" width="800"/>  

<img src={useBaseUrl('img/cloud-soar/image133.png')} alt="Dashboard Widget Configurator" width="300"/>


The widgets section on the left-side of the screen displays how the dashboard is structured. To begin adding widgets to the dashboard, click **+** on the desired section.

A new popup will be displayed with a list of all widget choices for the
selected section. To add a new widget, click **+**.

Once a widget is added to a section, they will be displayed on the
right-side of the screen. To configure, click the cogwheel next to the
widget to be customized. A new configuration screen will be displayed.
These configuration screens will vary depending on the information it
utilizes. Users have the option to add or remove filters and values,
rename the section, as well as choose what data they would like to have
displayed.

To change how the widgets appear in a section, you can drag and drop into the desired positions by clicking and holding the left-side of selection and dragging to a new location. Users can utilize Cloud SOAR's Carousel feature to cycle through different Dashboard displays on a SOC board to ensure constant visibility within the Cloud SOAR platform. Once the desired widgets have been added and configured, click save to commit.

<img src={useBaseUrl('img/cloud-soar/image135.png')} alt="Cloud Soar Dashboard Carousel" width="500"/>

Most widgets inside of the Cloud SOAR dashboard are drillable. To drill down into a specific statistic, click on either an Incident ID or a section of a pie chart to limit the information shown to the areas of concern.

:::note
Make sure to allow popups from the Cloud SOAR site to drill into dashboard statistics.
:::

<img src={useBaseUrl('img/cloud-soar/image136.png')} alt="Dashboard Pie Chart" width="600"/>


You can also export Dashboards to an Excel spreadsheet or PDF document to include in reporting. To export a dashboard, select **Export** from the top of the dashboard screen and select which format to use. A new window will open with the requested document, which can either be saved to your machine or printed.

<img src={useBaseUrl('img/cloud-soar/image137.png')} alt="Dashboard Menu" width="800"/>

### Create a dashboard

You can create dashboards in Cloud SOAR similar to dashboards in the core Sumo Logic platform. You can also [create widgets](#create-widgets) to use in the dashboards that display text, graphs, and charts containing details about incidents and other aspects of Cloud SOAR.

1. <!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> Go to the home screen. <!--Kanso <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu, select **Cloud SOAR > SecOps & Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **ecOps & Dashboard**.  Kanso-->
1. Select **Dashboard** in the upper-left corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-dashboards.png')} alt="Access dashboards" width="300"/>
1. Click the **+** icon in the upper-right corner of the UI and select **New Dashboard**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-dashboard.png')} alt="Add dashboard button" width="200"/><br/>A blank dashboard appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-empty-dashboard.png')} alt="Empty dashboard" width="700"/>
1. Click on the name of the blank dashboard (such as **Dashboard 1** in the example), and give the dashboard a name. Click **No description available** and type a description.
1. Click the **Edit** button. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-dashboard-button.png')} alt="Empty dashboard" width="150"/><br/>The widgets panel displays to the right of the dashboard.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-dashboard-example.png')} alt="Widgets panel on the dashboard" width="700"/>
1. Under **My Widgets** or **Public**, select widgets you'd like to add to the dashboard. These are the same widgets that are available to use in [reports](/docs/cloud-soar/incidents-triage/#report). Widgets can be graphs, charts, tables, or any kind of visual element that contains information. Click **New** to [create a new widget](#create-widgets). Click **Show List** to see all available widgets.
1. Rearrange the widgets in the dashboard as desired.
1. (Optional) Click **Public** at the top of the dashboard panel if you want to make the dashboard available for others to use.
1. (Optional) Click **Export** to to the upper-right of the dashboard panel to export the dashboard to PDF.  

### Create widgets

You can create widgets as needed to help analysts and administrators quickly get the information they need. Widgets are reusable pieces that display information in different forms, such as text, pie chart, bar chart, graph, or table.  

1. Open the widgets panel:
      1. <!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> Go to the home screen. <!--Kanso <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu, select **Cloud SOAR > SecOps & Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **ecOps & Dashboard**.  Kanso-->
      1. Select **Dashboard** in the upper-left corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-dashboards.png')} alt="Access dashboards" width="300"/>
      1. Select a dashboard.
      1. Click the **Edit** button. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-dashboard-button.png')} alt="Empty dashboard" width="150"/><br/>
      :::note
      Widgets are shared between **Dashboards** and [**Reports**](#report).
      :::
1. The widgets panel displays to the right of the screen.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-widgets.png')} alt="Widgets panel" width="250"/>
1. Click **New**.<br/>The dialog to create new widgets displays. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-create-widget.png')} alt="Create a widget" width="600"/>
1. In **Name**, provide a name that clearly explains the widget's purpose.
1. In **Group by**, select whether you want incidents listed in the widget to be grouped by **Status**, **Incident ID**, or **Start time**.
1. On the left, select the type of widget to create (pie chart, bar chart, graph, table, or text).
1. At the top, query for elements to view in the widget, such as incidents, notes, tasks, and attachments.
1. Click **Public** if you want to make the widget available for others to use.
1. Click **Save** when done.

## Entities

The **Entities** tab provides access to data from across all incidents, as well as other information which can be stored within Cloud SOAR.<br/><img src={useBaseUrl('img/cloud-soar/entities.png')} alt="Entity Section" width="600"/>

Observables from every incident can be found in this section, along with any enrichment data associated with these data types and the incidents they were reported in. You'll find all variables including artifacts related to an incident. Clicking on an entity in the entity list will display the results of any previous actions taken on the entity, or where in the incident the entity was extracted.

<img src={useBaseUrl('img/cloud-soar/image163.png')} alt="Entity Details" width="800"/>

A timeline of actions taken on the entity can be displayed on the far right-hand corner of the screen by clicking on the stopwatch symbol. Hover over the date tabs to expand the timeline and see additional information about the actions taken on each date.

<img src={useBaseUrl('img/cloud-soar/image164.png')} alt="Latest actions" width="300"/>

While any observable is selected, a menu bar will be available in the
top right-hand corner of the screen which allows users to perform
certain actions on the observable.

<img src={useBaseUrl('img/cloud-soar/image165.png')} alt="Observables Menu Bar" width="400"/>

- **Lock**: Lock the observable to prevent any actions from being taken on it. This may be useful if you want to ensure that no enrichment actions are taken on attacker-controlled infrastructure or that an observable is not accidentally blocked.
- **Delete**: Delete the observable.
- **Mark as Favorite**: Mark the observable as a favorite and move it to the top of the observables list.

### Adding a New Entity

To add a new entity, click the **+** sign at the top of the screen and a
new configuration box will be displayed. Select an entity type from the
dropdown menu and an additional configuration box will be displayed.
This configuration box allows the user to input information about the
entity, such as adding a file or its file hash. Once the entity is
created, click **Create** to continue.

<img src={useBaseUrl('img/cloud-soar/image166.png')} alt="Adding a new Entity" width="400"/>

## Credential Manager - CyberArk Configuration

You can use CyberArk Credential Manager to manage data that will be used in integration resources.

<img src={useBaseUrl('img/cloud-soar/cyberArk1.png')} alt="Integrations" style={{border: '1px solid gray'}} width="600"/>

Using the cogwheel icon on the right in the integrations section, the main section of the CyberArk configuration opens.

<img src={useBaseUrl('img/cloud-soar/CyberArk2.png')} alt="CyberArk configuration" style={{border: '1px solid gray'}} width="400"/>

Here you can set URL and port of the Components server, and the credentials needed to connect to CyberArk. The Enable checkbox can be enabled or disabled later.

If enabled, when you go to open the detail of a integration resource you'll find a new checkbox (**Use CyberArk fields**) at the top already active. If the checkbox on above window is disabled, the checkbox in the resource window will be disabled by default, and it will not be possible to activate it.

<img src={useBaseUrl('img/cloud-soar/CyberArk3.png')} alt="Enable CyberArk fields" style={{border: '1px solid gray'}} width="800"/>

If the checkbox **Use CyberArk fields** is enabled, two new mandatory fields will appear:
* **Account Name** > userName in CyberArk
* **Platform ID** > platformId in CyberArk

Near to the fields there will be the relative toggle that will enable the related field for use on CyberArk.

<img src={useBaseUrl('img/cloud-soar/CyberArk5.png')} alt="CyberArk fields enabled" style={{border: '1px solid gray'}} width="400"/>

In the image above, you can see two custom fields of the resource with their toggles. The first field has been enabled to use CyberArk, while the second not.

Within the CyberArk fields you need to enter the name of the Properties present in the corresponding Platform ID on CyberArk.

:::note Case sensitive
Pay attention to uppercase and lowercase letters.
:::

<img src={useBaseUrl('img/cloud-soar/CyberArk4.png')} alt="Property names" style={{border: '1px solid gray'}} width="400"/>

Through the name of the Properties, (in the above case **MB3**) during the execution of the resource, it will be replaced with the value present on CyberArk for that resource, in our case **84ca4444-9082-40b7-**.

In the fields enabled for CyberArk, in addition to the account properties, you can also recall the value of the CyberArk Account password, to do this, write the word **Password** in the field.

:::important
If the checkbox for CyberArk is enabled for a resource field, the data type allowed for that field will be string only, even if the same field was configured to accept lists, checkboxes, numbers, and more.
:::

**The only property that will be retained is the mandatory nature of the field**.

Values entered in the field not enabled for CyberArk, if previously entered and saved, will be retained if the field becomes enabled for CyberArk. The same is not true otherwise.

If the CyberArk switch is enabled and one switch on the field line is disabled, that CyberArk field value will be saved empty.

<img src={useBaseUrl('img/cloud-soar/CyberArk6.png')} alt="CyberArk fields" style={{border: '1px solid gray'}} width="400"/>

### Configuring the automation bridge for CyberArk

If you are using CyberArk, you will need to add the following certificates given by CyberArk:
```
**RootCA**new.crt**
**client**new.crt**
**client**new.pem**
```
to the `/opt/automation-bridge/` directory.

**The names must be exactly the same**.


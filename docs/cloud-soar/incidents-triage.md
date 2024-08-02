---
id: incidents-triage
title: Cloud SOAR Incident Management and Triage
sidebar_label: Incidents and Triage
description: Automated real-time incident management and threat response.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

## SecOps and Dashboard

<!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> To access the SecOps and Dashboard screens, in the main Sumo Logic menu select **Cloud SOAR**.
<!--Kanso 
[**New UI**](/docs/cloud-soar/overview#new-ui). To access the SecOps and Dashboard screens, in the main Sumo Logic menu select **Cloud SOAR > SecOps & Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **SecOps & Dashboard**.
 Kanso-->

The SecOps screen is where all your current tasks reside. Here you can approve, decline, and close tasks as well as customize this section to display all tasks assigned to a specific user or group. 

Select **Dashboard** in the upper left corner to see dashboards showing your tasks. For more information, see [Dashboards](#dashboards).

<img src={useBaseUrl('img/cloud-soar/cloud-soar-secops.png')} alt="Home page" width="800"/>

## Incidents

Incidents are events that require investigation and remediation. Incidents are at the heart of Cloud SOAR. 

<!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> To access incidents, in the main Sumo Logic menu select **Cloud SOAR**, and then select **Incidents** at the top of the SecOps screen.
<!--Kanso 
[**New UI**](/docs/cloud-soar/overview#new-ui). To access incidents, in the main Sumo Logic menu select **Cloud SOAR > Incidents**. You can also click the **Go To...** menu at the top of the screen and select **Incidents**.
 Kanso-->

The **Incidents** screen lists all Cloud SOAR incidents. Clicking on any of the incident IDs will open the incident. You can configure what incidents are displayed by creating queries against available incident data and saving them as incident filters.

<img src={useBaseUrl('img/cloud-soar/image140.png')} alt="Cloud SOAR incidents"/>

Watch this micro lesson to learn more about incidents in Cloud SOAR.

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

### Incident generation process

Cloud SOAR generates incidents with an automated process:
 1. An alert is received by Cloud SOAR via an integration.
 1. [Automation rules](/docs/cloud-soar/automation/#creating-incidents-from-automation-rules) process the alert. Behind the scenes, parsing rules break out the data into artifacts to be used as arguments in playbooks, such as IP addresses, usernames, host names, and so on.
 1. The data is fed into an [incident template](/docs/cloud-soar/automation/#incident-templates).
 1. [Playbooks](/docs/cloud-soar/automation/#playbook) run against the data.
 1. Cloud SOAR generates an incident.

<img src={useBaseUrl('img/cloud-soar/cloud-soar-automation-flow.png')} alt="Cloud SOAR automation flow" style={{border: '1px solid gray'}} width="800" />

### Filter incidents

You can configure what data is to be displayed on the **Incidents** screen by adjusting which columns are viewable. To adjust these columns, click the filter icon <img src={useBaseUrl('img/cloud-soar/filter-icon.png')} alt="Filter icon" width="25"/> in the top right corner of the screen. This displays a configuration screen that allows you to choose which data is displayed. To change where on the screen it should be displayed, click the **+** next to the selection and  drag and drop it in the order to be viewed. Once you have added and organized the columns, click **Apply**.

<img src={useBaseUrl('img/cloud-soar/filter-incidents.png')} alt="Filter incidents" width="800"/>

#### Search incidents

From the **Incidents** screen you can search, build, and issue queries against existing incidents by typing in the search bar at the top of the screen.

Cloud SOAR also provides you with a command cheat sheet to help build incident filtering queries. To access the cheat sheet, click on the information icon <img src={useBaseUrl('img/cloud-soar/commands-cheat-sheet.png')} alt="Commands cheat sheet icon" width="25"/> in the search bar to display the query options.

<img src={useBaseUrl('img/cloud-soar/image142.png')} alt="Search issues" width="800"/>

#### Favorite incident searches

Once a query or a search is committed, they can be saved for future use by clicking the star icon to the right of the search bar. These saved searches will be stored as tabs just below the search bar.

<img src={useBaseUrl('img/cloud-soar/image145.png')} alt="save query" width="800"/>

#### Bulk actions

Bulk actions may be performed on any incidents in the incidents list. To perform bulk actions on incidents, check the incidents you wish to perform the bulk actions on, then click the three-dot kebab menu in the upper left-hand corner of the screen and select the appropriate bulk action from the dropdown menu.

<img src={useBaseUrl('img/cloud-soar/bulk-actions.png')} alt="Bulk actions" width="200"/>

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

### Create a new incident manually

1. To create an incident manually, click the **+ Incidents** button at the top of the **Incidents** screen. <br/><img src={useBaseUrl('img/cloud-soar/create-incident-button.png')} alt="Create incident button" style={{border: '1px solid gray'}} width="100"/>
1. A new configuration box will be displayed that contains fields an investigator can utilize to develop their incident. Not all these fields are mandatory. The ones that are required will have an asterisk (`*`) marked next to them which indicates the field has a dependency within the Cloud SOAR platform. These required fields can have their dependencies and requirements adjusted with [custom fields](/docs/cloud-soar/overview/#custom-fields). <br/><img src={useBaseUrl('img/cloud-soar/incident-creation-screen.png')} alt="Incident Creation screen" style={{border: '1px solid gray'}} width="700"/>
1. One of the most important fields is the **Type** field. This field will dictate which playbooks will be recommended later on in the configuration process. See [custom fields](/docs/cloud-soar/overview/#custom-fields) to modify the variables displayed in the **Type** field. <br/><img src={useBaseUrl('img/cloud-soar/type-field.png')} alt="Type field" style={{border: '1px solid gray'}} width="200"/>
1. Click **Next**. 
1. Once you complete the **Details** page, you will want to assign appropriate playbooks to be associated with the incident. In addition to adding playbooks to the incident, you can also decide whether you want the playbook to automatically execute upon incident creation by sliding the **Autorun** button to **On**. <br/><img src={useBaseUrl('img/cloud-soar/incident-creation-automation.png')} alt="Incident Creation - Automation screen" style={{border: '1px solid gray'}} width="700"/>
1. Click **Next**. 
1. The investigator may already have artifacts that they would like to add to the incident. The **Artifacts** section allows for the manual entry of new artifacts. To add a new artifact, click **Add Artifact** and choose what target field to append the data and add its value. Once completed, click **Next**. <br/><img src={useBaseUrl('img/cloud-soar/incident-creation-artifacts.png')} alt="Incident Creation - Artifacts screen" style={{border: '1px solid gray'}} width="700"/>
1. Click **Next**.
1. You have the option to create manual parent/child relationships between the new incident and any previous incident created in Cloud SOAR. Click the **Advanced** button at the bottom of the screen to select an existing incident to group together. <br/><img src={useBaseUrl('img/cloud-soar/incident-creation-artifacts.png')} alt="Incident Creation - Relationships screen" style={{border: '1px solid gray'}} width="700"/>
1. Click **Next**.
1. The final step in manual incident creation is to add an investigator or a group of investigators to the incident. Select an investigator or group from the left side of the screen by double-clicking on their name and the investigator will be added to the investigators pane. <br/><img src={useBaseUrl('img/cloud-soar/incident-creation-investigators.png')} alt="Incident Creation - Investigators screen" style={{border: '1px solid gray'}} width="700"/>
1. Once finished, click **Create**.

## Incident details

Opening an incident from any section of Cloud SOAR will display the incident details page. The page is composed of three sections: The incident VIP section on the left, the properties section in the center, and the widgets section to the right.

<img src={useBaseUrl('img/cloud-soar/incident-details.png')} alt="Incident details page" style={{border: '1px solid gray'}} width="800"/>

The incident VIP section displays high-level details about a specific incident. You can also take actions such as add additional investigators or close the incident from this section. To view all available actions, click the vertical ellipsis to the left of the cogwheel. You can change the owner of the incident, change the folder where the incident is housed, export the incident details via PDF, DOC, or [custom report](/docs/cloud-soar/legacy/legacy-cloud-soar-main-menu/#custom-reports), and clone or permanently delete the incident. To customize the details displayed in the incident VIP section, click the cogwheel <img src={useBaseUrl('img/cloud-soar/cogwheel-icon.png')} alt="Cogwheel icon" width="25"/> at the top right of the section. A new screen will be presented which will allow for adding and deleting of incident detail fields. To add a new field, you will click on the **+** sign next to the field to be added. Once all the desired fields are added, they can easily be rearranged in the desired order by dragging and dropping into place. To remove a field, simply click the **x** next to the field to be removed. Once all the details have been added and are in place, click **Apply**.

<img src={useBaseUrl('img/cloud-soar/incident-vip-section.png')} alt="Incident VIP section" style={{border: '1px solid gray'}} width="200"/>

The incident properties section in the center contains all the important information that makes up the incident, such as executed playbooks and incident tasks. This information is divided into four different sections: **Overview**, **Operations**, **Entities**, and **Documentation**.

<img src={useBaseUrl('img/cloud-soar/incident-properties.png')} alt="Incident properties" style={{border: '1px solid gray'}} width="700"/>

### Overview

The incident **Overview** section contains all the pertinent information for a specific incident such as the severity, SLA counter, and category of alert. This information can be configured in **Custom Fields**. For more information, see [Configuration](/docs/cloud-soar/overview/#configuration).

### Operations

The **Operations** section contains all the investigative information for a specific incident and is broken out into the following sections: **War Room**, **Playbook**, **Tasks**, and **Notes**.

#### War Room

All the information related to the ongoing incident is  visible in one place in the **War Room** section. You can quickly view and check all the steps of the analysis, done either manually or by the automation, any entities related to the incident, results of actions performed, and notes added during the incident's investigation. Information can be filtered out for the different categories, and you can add new notes by clicking the **+** button.

<img src={useBaseUrl('img/cloud-soar/war_room.png')} alt="War room" style={{border: '1px solid gray'}} width="700"/>

#### Playbooks

Any playbook that has been applied to an incident can be found under the **Playbooks** section. You can quickly view and make any necessary adjustments to the incident's playbooks, as well as add any additional playbooks that may be required during an incident's investigation.

<img src={useBaseUrl('img/cloud-soar/operations-playbooks-tab.png')} alt="Playbooks displayed in the Playbooks tab" style={{border: '1px solid gray'}} width="700"/>

If during an incident's investigation it is determined that the type of incident has changed (for example, a phishing incident turns into a ransomware incident) another type of playbook may be needed to correctly remediate an incident. You can add additional playbooks to the incident by clicking **+** at the top of the screen to the left of the **Graph View** and **List View** buttons. This will open a new screen that lists all available playbooks. Either type in the playbook name to use, or manually search through all available options and click **Add** when finished.

To explore the playbooks:

1. Click the clock icon to see playbook history. <br/><img src={useBaseUrl('img/cloud-soar/playbook-history.png')} alt="Playbook history" style={{border: '1px solid gray'}} width="700"/>
1. To view individual playbooks for the incident, click **Graph View** at the top of the panel. In the graph view, the playbook options menu can be found at the bottom of the playbook screen to re-run a playbook, download playbook results, edit the playbook, or expand the playbook. <br/><img src={useBaseUrl('img/cloud-soar/operations-playbooks-graph-view.png')} alt="Playbook displayed in the graph view" style={{border: '1px solid gray'}} width="700"/>
1. To view the details of any individual action, click on the action node. A new window displaying the action details will be displayed on the left-hand side of the screen. From this view, you can see the status of the action, its configuration, and have the choice to download the JSON results of the action. <br/><img src={useBaseUrl('img/cloud-soar/action-details.png')} alt="Action details" style={{border: '1px solid gray'}} width="700"/>
1. To view the details of the result, click the magnifying glass icon at the bottom of the action details, and the action result window will display. You can use the search bar at the top of the table to search the results.<br/><img src={useBaseUrl('img/cloud-soar/action-result.png')} alt="Action result" style={{border: '1px solid gray'}} width="500"/>
1. Because some integrations return large data sets, the table view is designed to show only a select set of attributes. For more detailed information, you can switch to the action's JSON results screen by clicking the **JSON Details** icon <img src={useBaseUrl('img/cloud-soar/json-details-icon.png')} alt="JSON Details icon" style={{border: '1px solid gray'}} width="25"/> next to the action's search bar. The JSON results view displays the full results of the executed action.  <br/><img src={useBaseUrl('img/cloud-soar/action-result-json-details.png')} alt="Action result JSON details" style={{border: '1px solid gray'}} width="500"/>

#### Tasks

The **Tasks** section allows incident managers to assign and track tasks which must be completed during an investigation. You can add tasks manually here, or add them from playbooks.

<img src={useBaseUrl('img/cloud-soar/task-list.png')} alt="Tasks section" style={{border: '1px solid gray'}} width="700"/>

To explore tasks:

1. Click a task to open it. From the resulting window you can not only view information about the task, but take actions such as approve, decline, or close the task, as well as launch the associated playbook.<br/><img src={useBaseUrl('img/cloud-soar/tasks-screen.png')} alt="Task details" style={{border: '1px solid gray'}} width="700"/>
1. To add a new Task, click the **+** button at the top-left of the Task list screen. Fill in all required fields and add any additional information necessary under the **Description** section if desired. <br/><img src={useBaseUrl('img/cloud-soar/new-task.png')} alt="New task dialog" style={{border: '1px solid gray'}} width="600"/>
    * The user listed in the **Assigned to** field will be the user responsible for completing the task.
    * The field titled **Actual Effort** should be the number of hours estimated to complete the task. As the task is updated by the assignee, this field should be changed to reflect the actual number of hours that were required to complete the task. This number will be used to provide task assessment information.
1. Once a task has been created and assigned, it will appear in the [SecOps](/docs/cloud-soar/incidents-triage/#secops-and-dashboard) screen. To view the details of a task, click on the task from the **My Operations** section of the screen. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-secops.png')} alt="Home page" width="800"/>
1. Selecting a task will open the incident where the task was created. This will allow you to review the details of the task and access any automated playbooks and notes from the incident investigation. Once the incident data has been reviewed, investigators can choose to approve, approve and close, or decline a task by clicking the thumbs up, thumbs
down or check mark buttons next to the task's title. <br/><img src={useBaseUrl('img/cloud-soar/tasks-screen_approve-decline-buttons.png')} alt="Task buttons" style={{border: '1px solid gray'}} width="800"/>

#### Notes

The **Notes** section contains all notes either automatically created during a playbook's execution or manually created during the incident's investigation. You can export notes and search for results depending on the operational need.

<img src={useBaseUrl('img/cloud-soar/notes.png')} alt="Notes" style={{border: '1px solid gray'}} width="700"/>

To explore notes:

1. To manually add a note, click **+** to the left of the search bar and a new configuration screen will appear. <br/><img src={useBaseUrl('img/cloud-soar/new-note.png')} alt="New note dialog" style={{border: '1px solid gray'}} width="600"/>
1. Enter the note into the free form text box and click **Create** when finished.
1. When you close an incident, the system will prompt you for a note describing the reason. <br/><img src={useBaseUrl('img/cloud-soar/close-incident.png')} alt="Close Incident button" width="800"/>
1. In the **Closing Note** field, enter a note explaining the reason for incident closure and click **Apply**. <br/><img src={useBaseUrl('img/cloud-soar/close-incident-note.png')} alt="Closing note dialog" width="800"/>

### Entities

The **Entities** tab shows the entities associated with the incident.

To see entities for all incidents, open the **Entities** page. For more information, see [Entities](/docs/cloud-soar/incidents-triage/#entities-1). 

<img src={useBaseUrl('img/cloud-soar/entities-panel.png')} alt="Entities tab" width="700"/>

### Documentation

The **Documentation** section provides investigators with an area to document all steps taken during an incident's investigation.

<img src={useBaseUrl('img/cloud-soar/documentation.png')} alt="Documentation tab" width="700"/>

The **Attachments** section is a repository for investigators to house attachments related to an incident's investigation. The source of this data can vary, but will often be the output of monitoring tools and supporting documents. 

To add an attachment, click **+** to the left of the search bar and provide a description for the attachment. When an attachment is added, the date and the name of the person who added it are recorded with the attachment. 

## Triage

The **Triage** screen shows events that have been recorded but not yet converted to incidents. 

<!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> To access the **Triage** screen, in the main Sumo Logic menu select **Cloud SOAR**. Then in the upper left of the **SecOps** screen click **Incidents > Triage**.
<!--Kanso 
[**New UI**](/docs/cloud-soar/overview#new-ui). To access the **Triage** screen, in the main Sumo Logic menu select **Cloud SOAR > Triage**. 
 Kanso-->

<img src={useBaseUrl('img/cloud-soar/triage.png')} alt="Triage screen" style={{border: '1px solid gray'}} width="800"/>

The Cloud SOAR triage module ingests events via the Cloud SOAR API. You can use it
to triage events which may be unverified or have a low confidence level before they are converted to incidents. The triage module can be completely customized for use cases from financial fraud to network IDS alerts.

Triage events can be pending (not assigned yet), grabbed (assigned to an analyst), or converted to an incident (either automatically or manually).

Let's suppose you want to look at a pending event to determine if it needs investigation:

1. Click a pending event. The event opens.
1. You determine that you want to investigate the event. Click the three-dot kebab button and select **Grab**. <br/><img src={useBaseUrl('img/cloud-soar/grab-an-event.png')} alt="Grab on the dropdown menu" style={{border: '1px solid gray'}} width="600"/>
1. Once an event is grabbed by an analyst, any playbooks defined for that incident type will be automatically executed and the results will be displayed in the **Filtered Results** section of the event details screen. Because all playbooks for the specified incident type are automatically executed as soon as the incident is grabbed, it is recommended that separate incident types and playbooks be created for triage events.
1. After you triage the event, you may reassign it to another user for further analysis, discard it, or convert it to an incident:
   * To reassign the event, click **Reassign**. 
   * To discard it, click the three-dot kebab button and select **Discard**. 
   * To convert it an incident, click the three-dot kebab button and select **Convert to Incident**. <br/><img src={useBaseUrl('img/cloud-soar/reassign-discard-convert-event.png')} alt="Reassign or convert to incident" style={{border: '1px solid gray'}} width="600"/>      
1. When you click **Convert to Incident**, a dialog appears for you to select the conversion settings. Select the appropriate incident template, owner, and ID, then click **Apply**. The event, including all enrichment information gathered from any playbooks, will be automatically converted to an incident. <br/><img src={useBaseUrl('img/cloud-soar/convert-to-incident-dialog.png')} alt="Convert to incident dialog" style={{border: '1px solid gray'}} width="300"/>

### Triage field settings

By default, the triage module contains two fields, `Status` and `Type`. Additional values may be added to the `Status` field; however, the `Type` field is directly linked to the incident type field and cannot be modified directly. 

New types must be added from the incidents section of the **Custom Fields** page. Up to 100 custom fields and be created for the triage module, allowing customization for any use case. To add additional custom fields for triage, see [Custom fields](/docs/cloud-soar/overview/#custom-fields). 

Note that to be able to filter events in the triage module based on the values of a field, **Use as filter** must be checked when adding or modifying a field. As fields are created, they will be assigned a number starting at `1`, which will be used to identify the field when adding events via the API. The first field added will be identified as `opt_1`, the second as `opt_2`, and so on. Regardless of the ordering of the fields on the screen, these numbers will remain the same. If a field is deleted, the number will not be reused. For example, if you have defined `opt_1` through `opt_8` and delete the field `opt_8`, the next field added will still become `opt_9`. It is important to remember these field numbers, as they will be used when the API is invoked.

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

## Report

With the **Report** option, you can create incident reports to share with others as well as [widgets](#create-widgets) to use in the report that display text, graphs, tables, and charts containing details about incidents and other aspects of Cloud SOAR.
<!--Kanso
 Kanso-->
1. <!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> Click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right and select **Report**. <!--Kanso <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu, select **Cloud SOAR > Report**. You can also click the **Go To...** menu at the top of the screen and select **Report**. Kanso--> <br/>The Report UI appears. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-report-ui.png')} alt="Reports user interface" style={{border: '1px solid gray'}} width="700"/>
1. Click the **+** icon in the upper left corner.
1. On the right side, select widgets to add to the report from **My Widgets** or **Public**. These are the same widgets that are available to use in [dashboards](#create-a-dashboard). Widgets can be graphs, charts, tables, or any kind of visual element that contains information. Click **New** to [create a new widget](#create-widgets). Click **Show List** to see all available widgets.  
1. Rearrange the widgets in the report as needed.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-widgets-in-report.png')} alt="Widgets in a report" style={{border: '1px solid gray'}} width="700"/>
1. Click **Save**. In the dialog:
    1. Provide a **Report name** and a **Description**.
    1. Click **Schedule** to schedule the report to run on a regular basis.
    1. Scroll to the bottom of the dialog and click **Public** if you want to make the report available to others.
    1. Click **Save**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-save-report.png')} alt="Save a report" style={{border: '1px solid gray'}} width="300"/>
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

<img src={useBaseUrl('img/cloud-soar/image27.png')} alt="Dashboards" style={{border: '1px solid gray'}} width="800"/>

Cloud SOAR's dashboards section is used to highlight the most important
pieces of data to the user or investigator who is logged into the
platform. This data is presented through the use of multiple widgets
that you can add, remove, and customize to include all data relevant
to your job functions and duties.

<img src={useBaseUrl('img/cloud-soar/image131.png')} alt="Cloud Soar Dashboard" style={{border: '1px solid gray'}} width="800"/>

To begin customizing the dashboard select the **Customize** button on the top of the screen. Once selected, a new configuration box will be displayed.

<img src={useBaseUrl('img/cloud-soar/image132.png')} alt="Dashboard Widget Editor" style={{border: '1px solid gray'}} width="800"/>  

<img src={useBaseUrl('img/cloud-soar/image133.png')} alt="Dashboard Widget Configurator" style={{border: '1px solid gray'}} width="300"/>


The widgets section on the left-side of the screen displays how the dashboard is structured. To begin adding widgets to the dashboard, click **+** on the desired section.

A new popup will be displayed with a list of all widget choices for the selected section. To add a new widget, click **+**.

Once a widget is added to a section, they will be displayed on the right-side of the screen. To configure, click the cogwheel next to the widget to be customized. A new configuration screen will be displayed. These configuration screens will vary depending on the information it utilizes. Users have the option to add or remove filters and values, rename the section, as well as choose what data they would like to have displayed.

To change how the widgets appear in a section, you can drag and drop into the desired positions by clicking and holding the left-side of selection and dragging to a new location. Users can utilize Cloud SOAR's Carousel feature to cycle through different Dashboard displays on a SOC board to ensure constant visibility within the Cloud SOAR platform. Once the desired widgets have been added and configured, click save to commit.

<img src={useBaseUrl('img/cloud-soar/image135.png')} alt="Cloud Soar Dashboard Carousel" style={{border: '1px solid gray'}} width="500"/>

Most widgets inside of the Cloud SOAR dashboard are drillable. To drill down into a specific statistic, click on either an incident ID or a section of a pie chart to limit the information shown to the areas of concern.

:::note
Make sure to allow popups from the Cloud SOAR site to drill into dashboard statistics.
:::

<img src={useBaseUrl('img/cloud-soar/image136.png')} alt="Dashboard Pie Chart" style={{border: '1px solid gray'}} width="600"/>


You can also export Dashboards to an Excel spreadsheet or PDF document to include in reporting. To export a dashboard, select **Export** from the top of the dashboard screen and select which format to use. A new window will open with the requested document, which can either be saved to your machine or printed.

<img src={useBaseUrl('img/cloud-soar/image137.png')} alt="Dashboard Menu" style={{border: '1px solid gray'}} width="800"/>

### Create a dashboard

You can create dashboards in Cloud SOAR similar to dashboards in the core Sumo Logic platform. You can also [create widgets](#create-widgets) to use in the dashboards that display text, graphs, and charts containing details about incidents and other aspects of Cloud SOAR.

1. <!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> Go to the home screen. <!--Kanso <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu, select **Cloud SOAR > SecOps & Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **ecOps & Dashboard**.  Kanso-->
1. Select **Dashboard** in the upper-left corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-dashboards.png')} alt="Access dashboards" style={{border: '1px solid gray'}} width="300"/>
1. Click the **+** icon in the upper-right corner of the UI and select **New Dashboard**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-dashboard.png')} alt="Add dashboard button" style={{border: '1px solid gray'}} width="200"/><br/>A blank dashboard appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-empty-dashboard.png')} alt="Empty dashboard" style={{border: '1px solid gray'}} width="700"/>
1. Click on the name of the blank dashboard (such as **Dashboard 1** in the example), and give the dashboard a name. Click **No description available** and type a description.
1. Click the **Edit** button. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-dashboard-button.png')} alt="Empty dashboard" style={{border: '1px solid gray'}} width="150"/><br/>The widgets panel displays to the right of the dashboard.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-dashboard-example.png')} alt="Widgets panel on the dashboard" style={{border: '1px solid gray'}} width="700"/>
1. Under **My Widgets** or **Public**, select widgets you'd like to add to the dashboard. These are the same widgets that are available to use in [reports](/docs/cloud-soar/incidents-triage/#report). Widgets can be graphs, charts, tables, or any kind of visual element that contains information. Click **New** to [create a new widget](#create-widgets). Click **Show List** to see all available widgets.
1. Rearrange the widgets in the dashboard as desired.
1. (Optional) Click **Public** at the top of the dashboard panel if you want to make the dashboard available for others to use.
1. (Optional) Click **Export** to to the upper-right of the dashboard panel to export the dashboard to PDF.  

### Create widgets

You can create widgets as needed to help analysts and administrators quickly get the information they need. Widgets are reusable pieces that display information in different forms, such as text, pie chart, bar chart, graph, or table.  

1. Open the widgets panel:
      1. <!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> Go to the home screen. <!--Kanso <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu, select **Cloud SOAR > SecOps & Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **ecOps & Dashboard**.  Kanso-->
      1. Select **Dashboard** in the upper-left corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-dashboards.png')} alt="Access dashboards" style={{border: '1px solid gray'}} width="300"/>
      1. Select a dashboard.
      1. Click the **Edit** button. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-dashboard-button.png')} alt="Empty dashboard" style={{border: '1px solid gray'}} width="150"/><br/>
      :::note
      Widgets are shared between **Dashboards** and [**Reports**](#report).
      :::
1. The widgets panel displays to the right of the screen.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-widgets.png')} alt="Widgets panel" style={{border: '1px solid gray'}} width="250"/>
1. Click **New**.<br/>The dialog to create new widgets displays. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-create-widget.png')} alt="Create a widget" style={{border: '1px solid gray'}} width="600"/>
1. In **Name**, provide a name that clearly explains the widget's purpose.
1. In **Group by**, select whether you want incidents listed in the widget to be grouped by **Status**, **Incident ID**, or **Start time**.
1. On the left, select the type of widget to create (pie chart, bar chart, graph, table, or text).
1. At the top, query for elements to view in the widget, such as incidents, notes, tasks, and attachments.
1. Click **Public** if you want to make the widget available for others to use.
1. Click **Save** when done.

## Entities

The **Entities** screen provides access to data from across all incidents, as well as other information which can be stored within Cloud SOAR.<br/><img src={useBaseUrl('img/cloud-soar/entities.png')} alt="Entity Section" style={{border: '1px solid gray'}} width="600"/>

Observables from every incident can be found in this section, along with any enrichment data associated with these data types and the incidents they were reported in. You'll find all variables including artifacts related to an incident. Clicking on an entity in the entity list will display the results of any previous actions taken on the entity, or where in the incident the entity was extracted.

<img src={useBaseUrl('img/cloud-soar/image163.png')} alt="Entity Details" style={{border: '1px solid gray'}} width="800"/>

A timeline of actions taken on the entity can be displayed on the far right-hand corner of the screen by clicking on the stopwatch symbol. Hover over the date tabs to expand the timeline and see additional information about the actions taken on each date.

<img src={useBaseUrl('img/cloud-soar/image164.png')} alt="Latest actions" style={{border: '1px solid gray'}} width="300"/>

While any observable is selected, a menu bar will be available in the
top right-hand corner of the screen which allows users to perform
certain actions on the observable.

<img src={useBaseUrl('img/cloud-soar/image165.png')} alt="Observables Menu Bar" style={{border: '1px solid gray'}} width="400"/>

- **Lock**: Lock the observable to prevent any actions from being taken on it. This may be useful if you want to ensure that no enrichment actions are taken on attacker-controlled infrastructure or that an observable is not accidentally blocked.
- **Delete**: Delete the observable.
- **Mark as Favorite**: Mark the observable as a favorite and move it to the top of the observables list.

### Adding a new entity

To add a new entity, click the **+** sign at the top of the screen and a
new configuration box will be displayed. Select an entity type from the
dropdown menu and an additional configuration box will be displayed.
This configuration box allows the user to input information about the
entity, such as adding a file or its file hash. Once the entity is
created, click **Create** to continue.

<img src={useBaseUrl('img/cloud-soar/image166.png')} alt="Adding a new Entity" style={{border: '1px solid gray'}} width="400"/>

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


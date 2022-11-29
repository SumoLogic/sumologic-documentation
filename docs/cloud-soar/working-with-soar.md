---
id: working-with-soar
title: Working with Cloud SOAR
description: Working with Cloud SOAR
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

## Dashboards

Cloud SOAR's dashboards section is used to highlight the most important
pieces of data to the user or investigator who is logged into the
platform. This data is presented through the use of multiple widgets
that users can add, remove, and customize to include all data relevant
to their job functions and duties.

![alt-text goes here](/img/cloud-soar/image131.png)

**Cloud Soar Dashboard**

To begin customizing the dashboard select the **Customize** button on the
top of the screen. Once selected, a new configuration box will be
displayed.

![alt-text goes here](/img/cloud-soar/image132.png)

**Dashboard Widget Editor**

![alt-text goes here](/img/cloud-soar/image133.png)

**Dashboard Widget Configurator**

The widgets section on the left-side of the screen
displays how the dashboard is structured. To begin adding widgets to the
dashboard, click **+** on the desired section.

A new popup will be displayed with a list of all widget choices for the
selected section. To add a new widget, click **+**.

Once a widget is added to a section, they will be displayed on the
right-side of the screen. To configure, click the cogwheel next to the
widget to be customized. A new configuration screen will be displayed.
These configuration screens will vary depending on the information it
utilizes. Users have the option to add or remove filters and values,
rename the section, as well as choose what data they would like to have
displayed. To change how the widgets appear in a section, users can drag
and drop into the desired positions by clicking and holding the
left-side of selection and dragging to a new location. Users can utilize
Cloud SOAR's Carousel feature to cycle through different Dashboard displays
on a SOC board to ensure constant visibility within the Cloud SOAR platform.
Once the desired widgets have been added and configured, click save to
commit.

![alt-text goes here](/img/cloud-soar/image135.png)

**Cloud Soar Dashboard Carousel**

Most widgets inside of the Cloud SOAR dashboard are drillable (Note: make
sure to allow popups from the Cloud SOAR site to drill into dashboard
statistics). To drill down into a specific statistic, click on either an
Incident ID or a section of a pie chart to limit the information shown
to the areas of concern.

![alt-text goes here](/img/cloud-soar/image136.png)

**Dashboard Pie Chart**

Dashboards may also be exported to an Excel or PDF document to include
in reporting. To export a dashboard, select **Export** from the top of the
dashboard screen and select which format to use. A new window will open
with the requested document which can either be saved to a user's
machine or printed.

![alt-text goes here](/img/cloud-soar/image137.png)

**Dashboard Menu**

## KPI Reports

Besides exporting dashboard statistics, users can also build KPI
reports. To create a KPI report, click **KPI Reports** at the top of the
screen next to the Export functionality. A new configuration box will be
displayed.

![alt-text goes here](/img/cloud-soar/image138.png)

**KPI Report Editor**

The **Output Set** tab allows users to select the incident kind they wish
to run the KPI report for. The Output Set and Description fields allow
the user to set these values for KPI reports they wish to save and
generate again in the future.

The **Filters** tab allows users to filter the data which will be included
in the KPI report by any number of incident attributes.

![alt-text goes here](/img/cloud-soar/image139.png)

**KPI Report Display Fields**

The **Display** tab allows users to select which fields will be shown in
the KPI report. To include a field in the KPI report, check the checkbox
next to the field name to be included. Field order can be changed by
clicking on the six dots to the far left of the field name and dragging
the field name up or down.

The **Format** tab allows users to select various formatting options, such
as the sorting order and the file format (including PDF, PDF encrypted
with an encryption key file, and Excel). Reports can also be scheduled
to automatically run at a defined interval from this section.

Once the report is built, click **Generate** to run the report or **Save**
to create the KPI report template.

KPI Output Sets can also be generated using the Cloud SOAR API. Please see
the API manual for additional details.

## Incidents

The **Incident** section lists all Cloud SOAR incidents. Clicking on any of
the incident IDs in the Incident section will open the incident. Users
can configure what incidents are displayed by creating queries against
available incident data and saving them as incident filters.

![alt-text goes here](/img/cloud-soar/image140.png)

**Incident List**

Users can also manipulate what data is to be displayed from the Incident
section by adjusting which columns are viewable. The adjust these
columns, click on the cogwheel on the top right-side of the screen. This
will display a configuration screen that allows users to choose which
data is displayed and where on the screen it should be displayed by
clicking the + sign next to the selection and then dragging and dropping
the selection in the order to be viewed.

![alt-text goes here](/img/cloud-soar/image141.png)

**Incident List Column Configuration**

Once the columns are added and organized, click **Apply** to continue.

**Filtering Incidents**

From the Incident section users can search, build, and issue queries against existing incidents by simply typing in the search bar at the top of the screen.

![alt-text goes here](/img/cloud-soar/image142.png)

**Incident Search Bar**

Cloud SOAR also provides its users with a command cheat sheet to help build
incident filtering queries. To access the cheat sheet, click on the
![alt-text goes here](/img/cloud-soar/image143.png) icon to display the query options.

![alt-text goes here](/img/cloud-soar/image144.png)

**Query Operations Helper**

Once a query or a search is committed, they can be saved for future use
by clicking the star icon to the right of the search bar. These saved
searches will be stored as tabs just below the search bar.

![alt-text goes here](/img/cloud-soar/image145.png)

**Save Frequently Used Queries**

Bulk actions may be performed on any incidents in the Incident Overview
list. Bulk actions include:

![alt-text goes here](/img/cloud-soar/image146.png)

**Bulk Actions**

- Edit

- Close

- Reopen

- Delete

- Restore

- Add Investigator

- Change Owner

To perform bulk actions on incidents, check the incidents you wish to
perform the bulk actions on, then click the three dots in the upper
left-hand corner of the screen and select the appropriate bulk action.

### Working with Incidents

Opening an incident from any section of Cloud SOAR will display the Incident
Details page. The Incident Details page is composed of three sections:
The Incident VIP Section, on the left side of the screen, the Incident
Properties section in the center, and the Incident Widgets section to
the right side of the screen.

![alt-text goes here](/img/cloud-soar/image147.png)

**Incident Details Screen**

### Incident VIP section

![alt-text goes here](/img/cloud-soar/image148.png)

**Incident VIP Section**

The Incident VIP Section displays high-level
details about a specific incident. Users can also take actions such as
add additional investigators or close the incident from this section. To
view all available actions, click the vertical ellipsis to the left of
the cogwheel. Users can change the owner of the incident, change the
folder where the incident is housed, export the Incident details via
PDF, DOC, or [Custom Report](#custom-reports), and clone or permanently
delete the incident.

To customize the details displayed in the Incident VIP Section, click the
cogwheel at the top-right of the section. A new screen will be presented
which will allow for adding and deleting of incident detail fields. To
add a new field, users will click on the **+** sign next to the field to
be added. Once all the desired fields are added, they can easily be
rearranged in the desired order by dragging and dropping into place. To
remove a field, simply click the **x** next to the field to be removed.
Once all the details have been added and are in place, click **Apply**.

### Incident Properties

The Incident Details section contains all the important information that
makes up the incident such as executed Playbooks and incident tasks. This
information is broken into 4 different section:

![alt-text goes here](/img/cloud-soar/image149.png)

**Incident Overview**

- **Overview**

- **Operations**

- **Entities**

- **Documentation**

### Overview

The Incident Overview section contains all the pertinent information
for a specific incident such as the severity, SLA counter, and
category of alert. This information can be customized in the Custom
Fields section of the platform. For more information, please see
[**Custom Fields**.](#Custom-Fields-1)

### Operations

The Operations section contains all the investigative information for a
specific incident and is broken out into the following sections:

- **War Room**
- **playbook**
- **Tasks**
- **Notes**

War Room

All the information related to the incident ongoing are visible in one place in
the War Room section. Users can quickly view and check all the steps of the analysis, done either manually or by the automation, any entities related to the incident, results of actions performed and notes added during the incident's investigation. Information can be filtered out for the different categories, and by pressing the
**+** button the user can add new notes.

![alt-text goes here](/img/cloud-soar/war_room.png)

Playbooks

Any playbook that has been applied to an incident can be found under
the playbook section. Users can quickly view and make any necessary
adjustments to the incident's Playbooks as well as add any additional
Playbooks that may be required during an incident's investigation.

![alt-text goes here](/img/cloud-soar/image150.png)

**Incident Properties**

The playbook option menu can be found at the bottom of the playbook
screen. From here users can re-execute a playbook, export, edit, or
expand the existing playbook. If during an incident's investigation it
is determined that the type of incident has changed (i.e. phishing
incident turns into a ransomware incident) another type of playbook may
be needed to correctly remediate an incident. Users can add additional
Playbooks to the incident by clicking the **+** sign at the top of the
playbook screen.

![alt-text goes here](/img/cloud-soar/image151.png)

**playbook Selection Menu**

This will open a new screen that lists all available Playbooks. Either
type in the playbook name to use or manually search through all
available options and click **Add** when finished.

Viewing Playbook Results

The results of a Playbook, either while it is executing or after
execution has completed, can be viewed from the playbook section. By
clicking the expansion button on the bottom left of the screen will
expand the playbook and will display the execution results.

![alt-text goes here](/img/cloud-soar/image152.png)

**Playbook Results**

The results of the playbook can also be viewed as a list by clicking the
**List** button next the **+** at the top of the page. The execution path of
the playbook will be shown, along with the status of the execution of
each action. The execution history of the playbook will be displayed in a
tab on the right-hand side of the screen, which can be minimized.

![alt-text goes here](/img/cloud-soar/image153.png)

**Playbook History**

To view the details of any individual action, including the results,
click on the action node. A new window displaying the action details
will be displayed on the left-hand side of the screen. From this view,
users can see the status of the action, its configuration, and have the
choice to download the JSON results of the action.

![alt-text goes here](/img/cloud-soar/image154.png)

**Action Results**

To view the details of the result, click on the magnifying glass and the
action's details window will be displayed. The details section displays
the results of the action in table view which users can also filter
through by using the details search bar at the top of the screen. For
more detailed information, users can switch to the action's JSON results
screen by clicking the **View JSON Results** button next to the action's
search bar. The JSON results view displays the full results of the
executed action. Because some integrations return large data sets, the
table view is designed to show only a select set of attributes. To view
the complete results of verbose integrations, the JSON tab should be
used.

![alt-text goes here](/img/cloud-soar/image155.png)

**Action Details**

![alt-text goes here](/img/cloud-soar/image156.png)

**Action JSON**

Tasks

Cloud SOAR's Tasks section allows incident managers to assign and track
tasks which must be completed during an investigation. Tasks may be
added from Playbooks or Playbooks, as discussed in previous sections,
or manually from the incident's Tasks section.

![alt-text goes here](/img/cloud-soar/image157.png)

**Tasks within an Incident**

Adding a Task

To add a new Task, click the **+** button at the top-left of the Task list
screen. Fill in all required fields and add any additional information
necessary under the **Description section** if desired.

The user listed in the **Assigned to** field will be the user responsible
for completing the task.

The field titled **Effort** should be the number of hours estimated to
complete the Task. As the Task is updated by the Assignee, this field
should be changed to reflect the actual number of hours that were
required to complete the Task. This number will be used to provide Task
Assessment information, discussed in more detail in the Documentation
section of this manual.

![alt-text goes here](/img/cloud-soar/image158.png)

**New Task Details Screen**

Working with Tasks

Once a task has been created and assigned, it will appear in the **Home**
section of the Main Menu. To view the details of a task click on the
task from the **My Operations** section of the screen, or to view a task
by its incident, select one or multiple incidents from the task list on
the left-side of the screen.

![alt-text goes here](/img/cloud-soar/image159.png)

**Home Screen**

Selecting a task will open the incident where the task was created. This
will allow the user to review the details of the task and access any
automated Playbooks and notes from the incident investigation. Once the
incident data has been reviewed investigators can choose to approve,
approve and close, or decline a task by clicking the thumbs up, thumbs
down or check mark buttons next to the task's title.

![alt-text goes here](/img/cloud-soar/image160.png)

**Tasks Section**

Notes

Like the Tasks section, the Notes section contains all notes either
automatically created during a playbook's execution or manually created
during the incident's investigation. Both sections offer the ability to
export and search for different results depending on the operational
need.

![alt-text goes here](/img/cloud-soar/image161.png)

**Notes Section**

Adding a Note

To manually add a note, click the **+** symbol to the left of the search
bar and a new configuration screen will appear. Enter the note into the
free form text box and click create when finished.

![alt-text goes here](/img/cloud-soar/image162.png)

**Adding a Note**

### Entities

The Entities section contains information pertaining to the artifacts found in an incident.

**Entities**

The **Entities** section contains all variables including artifacts related
to an incident. Clicking on an entity in the entity list will display
the results of any previous actions taken on the entity, or where in the
incident the entity was extracted.

![alt-text goes here](/img/cloud-soar/image163.png)

**Entity Details**

A timeline of actions taken on the entity can be displayed on the far
right-hand corner of the screen by clicking on the stopwatch symbol.
Hover over the date tabs to expand the timeline and see additional
information about the actions taken on each date.

![alt-text goes here](/img/cloud-soar/image164.png)

**Action Timeline**

While any observable is selected, a menu bar will be available in the
top right-hand corner of the screen which allows users to perform
certain actions on the observable.

![alt-text goes here](/img/cloud-soar/image165.png)

**Observables Menu Bar**

- **Lock**: Lock the observable to prevent any actions from being
    taken on it. This may be useful if you want to ensure that no
    enrichment actions are taken on attacker-controlled infrastructure
    or that an observable is not accidentally blocked.
- **Delete**: Delete the observable.
- **Mark as Favorite**: Mark the observable as a favorite and move it to
    the top of the observables list.

Adding a New Entity

To add a new entity, click the **+** sign at the top of the screen and a
new configuration box will be displayed. Select an entity type from the
drop-down menu and an additional configuration box will be displayed.
This configuration box allows the user to input information about the
entity, such as adding a file or its file hash. Once the entity is
created, click **Create** to continue.

![alt-text goes here](/img/cloud-soar/image166.png)

**Adding a New entity**

### Documentation

The **Documentation** section provides investigators with an area to
document all steps taken during an incident's investigation. The
following tools are available across the entire Cloud SOAR platform as well
as on an individual incident level:

Activity Log

Cloud SOAR records a detailed audit log of all activity that is performed
during an incident. A timeline of incident activity can be viewed in the
incident Timeline section. Each incident has its own timeline and the
events are classified under two categories: automatic if generated
automatically by the system, or manual when created by the user.

To manually create a new timeline event, click **+Add New Event** from the
top of the timeline screen.

![alt-text goes here](/img/cloud-soar/image170.png)

A new configuration box will be displayed. Title the event and choose
what category the event falls into. (Please note, these categories can
be edited under the Custom Fields section). Add any additional
information necessary and associate an existing knowledge base article
where applicable.

![alt-text goes here](/img/cloud-soar/image171.png)

**Add New Event Screen**

Once the event is created, users will see an additional list of options
to the right of the event, they are as follows:

- Use event data in reports

- Mark event has irrelevant

- Edit the event

- Export event details

Attachments

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

![alt-text goes here](/img/cloud-soar/image172.png)

**New Attachment Screen**

Final Incident Reports

The Final Incident Report section allows users to upload a
pre-configured basedoc to be used for final incident reports. Users can
choose to use an existing basedoc or upload a new one by selecting from
the basedoc selections at the bottom of the screen.

![alt-text goes here](/img/cloud-soar/image173.png)

**Final Report Screen**

To add a new basedoc, click **Upload Basedoc** and select the template to
use and click **Save**. Once the document has been uploaded users can
choose which sections or tags to use in the report. These tags act as
placeholders which will be filled in with the incident's details each
time an incident report is executed.

![alt-text goes here](/img/cloud-soar/image174.png)

**Basedoc Tag List**

To add tags to the incident report, double click the tag from the
right-side of the screen and it will be added to the tagging section for
configuration. Once the tag is added, users can either edit the tag or
remove unnecessary ones before executing the final report. Once
finished, click **Export Final Report** at the bottom of the screen.

### Custom Reports

Custom report templates can be defined by navigating to
**Configurations** > **Customizations** > **Report Template**. The
left pane of the Report Template screen contains a list of all current
report templates. To add a new report template, click on the **+** icon
above the report template list.

The Details tab of the new report template window allows the user to
specify a unique name for the template as well as a template category
and any appropriate tags.

The Sections tab of the new report template window allows users to drag
and drop sections of the incident in to the report template. All
incident sections are listed in the left-hand pane. Dragging incident
sections to the right-hand pane will add the section to the report
template. Sections will be printed in the report in the order they
appear in the right-hand pane.

![alt-text goes here](/img/cloud-soar/image45.png)

**Report Templates**

Once a report template has been defined, it can be generated by
selecting **Custom Report** from the **Export** menu. Users may add a
password or watermark to the custom report, which may be generated in
PDF or Word Document format.

### Closing Note

Closing incident will result in asking a note for incident closing as below

![alt-text goes here](/img/cloud-soar/image57b.png)

**Close Incident**

![alt-text goes here](/img/cloud-soar/image57c.png)

**Closing Note**

## Triage

Cloud SOAR's Triage module ingests events via the Cloud SOAR API and can be used
to triage events which may be unverified or have a low confidence level
before they are converted to incidents. The Triage module can be
completely customized for use cases from financial fraud to network IDS
alerts.

### Triage Settings

### Display Settings

Triage display preferences can be customized from **Settings** >
**Customizations** > **Triage**. Triage events can be color coded based on
status to easily distinguish them from each other when viewing the list
of Triage events.

The name of the module can also be modified from **Triage** to a name of
your choosing. The new name will be displayed in all areas of Cloud SOAR,
including the menu and logs.

![alt-text goes here](/img/cloud-soar/image57.png)

**Triage Settings**

### Field Settings

By default, the Triage module contains two fields, Status and Type.
Additional values may be added to the Status field; however, the Type
field is directly linked to the Incident Type field and cannot be
modified directly. New types must be added from the Incidents section of
the Custom Fields page.

Up to 100 custom fields and be created for the Triage module, allowing
customization for any use case. To add additional fields, navigate to
**Settings > Customizations > Custom Fields** and select
Triage Events (or the name of the module if you have renamed it from the
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

### Working with Events

The Triage module is accessible from the Incidents section by clicking
on Triage (or the name of the module if you have renamed it from the
default of **Triage**). All events which have not been converted to an
Incident will be displayed in a sortable table on the Triage main
screen. Events may be sorted by any column values by clicking on the
appropriate column.

![alt-text goes here](/img/cloud-soar/image180.png)

**Triage Main Screen**

The list of events can be filtered by any of the fields listed in the
filter section at the top of the Triage main screen.

![alt-text goes here](/img/cloud-soar/image181.png)

**Triage Event Actions, Unassigned**

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

![alt-text goes here](/img/cloud-soar/image182.png)

**Triage Event Actions, Assigned**

To convert the event to an incident, click **Convert to Incident** in the
far right-hand corner of the Event in question. Select the appropriate
incident template, owner and label, then click **Save**. The event,
including all enrichment information gathered from any Playbooks, will be
automatically converted to an incident.

![alt-text goes here](/img/cloud-soar/image183.png)

**Converting to an Incident**

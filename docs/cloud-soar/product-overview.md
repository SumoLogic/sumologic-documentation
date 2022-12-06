---
id: product-overview
title: Cloud SOAR Overview
description: Cloud SOAR Overview
---

<head>
  <meta name="robots" content="noindex" />
</head>


Cloud SOAR is a pure web-based application which does not require an
additional add-on or client to deploy. The top menu is broken up into two sections:

- **Main Menu**
   - All operational sections of Cloud SOAR, including Incidents, Triage (if enabled), Operations and incoming Data Sources, can be found under the Main Menu page links.
- **Global Functions Menu**
   - All Cloud SOAR configuration and administration options can be found under the Global Functions menu

![Cloud Soar Home Page](/img/cloud-soar/image7.png)
_Cloud Soar Home Page_

## Global Functions Menu

![Global Functions Menu](/img/cloud-soar/image8.png)
Global Functions Menu

### Global Search

Global Search allows users with the appropriate permissions to perform
exhaustive searches throughout the application modules and all recorded
information. All searchable Cloud SOAR sections are listed and individually
selectable. To search, enter the search criteria in the search bar, then select the sections you wish to search and click **Search**.

![Global Search Criteria](/img/cloud-soar/image9.png)
_Global Search Criteria_

The Other Filters tab permits a more targeted selection of search
criteria. Targeted searching does not extend to the data inside Digital Support or Knowledge Base articles.

![Global Search Filters](/img/cloud-soar/image10.png)
_Global Search Filters_

![alt-text goes here](/img/cloud-soar/image11.png) When a search result is located within an incident, the incident number will be displayed in the Incident column.
Clicking on the incident number will open the incident in a new window.
Clicking on the arrow at the end of each search result will display the
details of the individual search result in the current window. Search
results may also be exported to a PDF file by clicking on Export PDF at
the bottom of the search results window.

![Global Search Results](/img/cloud-soar/image12.png)
_Global Search Results_

### Support

Under the **Support** section users can find valuable information such as
the Cloud SOAR user manual, API Integrations, the Integration Framework, a
link to our Community portal, as well as contact Sumo Logic for other
support issues.

![Figure - Support Page](/img/cloud-soar/image13.png)
_Figure - Support Page_


### Configurations

The **Configuration** drop down contains all administrative functions of
Cloud SOAR, such as user access, integration configurations, and auditing
information.

![Configurations Menu](/img/cloud-soar/image14.png)                 
_Configurations Menu_


### Automation

The **Automation** section contains all the functions related to
automation and orchestration processes of the Cloud SOAR
platform.

![alt-text goes here](/img/cloud-soar/image15.png)

### Playbook

**Playbooks**, previously known as Playbooks, are the core of Cloud SOAR's
automation capabilities. Playbooks permit administrators to create
automated and semi-automated workflows utilizing Cloud SOAR integrations,
tasks and a variety of flow control decisions and other actions.

Playbook workflows can be configured to execute automatically without
human intervention, or can be executed in an interactive mode, where
user input is required to authorize predefined actions.

### Incident Template

**Incident Templates** allow users to define a certain number of incident
attributes that will automatically be set each time an incident is
generated based on the template. This may include type, classification,
incident assignment, playbooks or any other incident attribute.

### Integrations

The **Integrations** section allows administrators to configure
bidirectional integrations with third-party technologies, as well as
view the supported actions for each integration. In addition, this
section allows administrators to manage custom scripts, which can be
written in Python, Perl, PowerShell or Bash.

### Rules

The Events Automation tab enables users to establish any daemonized integration rules to define what occurs when data is received from each of these sources.
These rules allow specific data to be parsed from the incoming data
sources and the acted upon automatically or through manual actions.

### ARK

ARK or Automated Responder Knowledge is the Machine Learning component of Cloud SOAR which implements the Supervised learning in Case-Based Reasoning (CBR)algorithm.
CBR solves new problems by adapting previously successful solutions to similar problems, in Cloud SOAR this can be leveraged by analyzing solved incidents to hint steps and procedures to operators in new similar threats.

ARK assists operators during investigations in 2 main areas: Automatically suggesting/prompting next actions/tasks in Playbooks (until version 5) and Correlation/ Deduplication of similar threats into 1 unique incident.
In order to enable ARK, first go under Configurations > Settings > ARK and make sure you have it set to ON.

From this page, it’s possible to configure also other ARK Settings such as the Neighbor incidents considered for each recommendation and an age relevance threshold. Those two parameters will allow you to tune the incidents that the Machine Learning algorithm will consider.

![ARK Settings](/img/cloud-soar/image16b.png)
_ARK Settings_

When an incident is created in Cloud SOAR, the Incident Type field will be the one defining which Playbooks you can attach to that incident.

**ARK Usage**

ARK has a correlation and deduplication or merging mechanism you can use with the ARK OIF.

ARK 2.0 OIF is a custom Sumo Logic integration which allows investigators to implement a mechanism for deduplication and correlation of ingested alerts and Cloud SOAR incidents.

![ARK OIF](/img/cloud-soar/image16d.png)
_ARK OIF_
![Test Action](/img/cloud-soar/image16e.png)
_Test Action_                                  
OIF ARK enrichment action “Get parents for incident” allows you to retrieve every incident (as proposed parents) that is similar to the analyzed one.

Each optional field allows users to fine tune the weight of the fields, acceptance thresholds and of the algorithm which needs to be trained and fine-tuned in order to get correct and reliable results.

![Field Weight](/img/cloud-soar/image16f.png)
_Field Weight_

Alert deduplication or merging can be achieved by utilizing ARK OIF enrichment actions and Cloud SOAR’s unique Triage capability.

Triage is a customizable section which can be used for enriching and preprocessing multiple different scenarios.

By dispatching the ingested alerts into Triage events, Cloud SOAR can automatically enrich each event, deduplicate them based on the logic configured in our associated Playbooks (which can invoke Ark OIF enrichment) and decide if Cloud SOAR should aggregate multiple entries in 1 unique incident, create multiple incidents for each event or if a similar incident has already been created, to update the existing incident with updated information.

Cloud SOAR is also able to correlate existing incidents in order to check if specific data is already present in Cloud SOAR Database or not. Merging or deduplication must be done prior to conversion of an alert into incident, for example as a Triage event which allows users to invoke 1 or multiple playbooks for each Triage event created.

### Settings

The **Settings** section contains many of the administrative functions for
the Cloud SOAR platform. The **General** settings section consists of many
different settings, such as proxy settings, date and time customization. A full list of these setting can be found in the [Cloud SOAR Appendix](/docs/cloud-soar/appendix). 

![Settings Menu](/img/cloud-soar/image17.png)                     
_Settings Menu_
### User Management

User Management allows administrators to manage Cloud SOAR users and create
granular role-based access control rules which dictate the permissions
users have both within the Cloud SOAR platform and individual incidents.
This section also allows administrators to configure Cloud SOAR to work with
existing LDAP or Active Directory resources.

User Management is discussed in greater detail in the Configuring Cloud SOAR
section of this manual.

### Logged Users

The **Logged User** section of the Cloud SOAR platform contains session
information for the user who is currently logged on to the Cloud SOAR
platform. For administrators of the Cloud SOAR platform, this section will
show all authorized user session activity.

![Logged Users](/img/cloud-soar/image22.png)
_Logged Users_


### Notifications

Cloud SOAR allows administrators to configure notifications to Cloud SOAR users
as well as other external users. These notifications can be sent via
Cloud SOAR's internal messaging platform, as well as email and SMS. **Watcher Groups** can also be created, which allows Cloud SOAR to send notifications
to those who are not necessarily assigned to an incident when certain
conditions are met, such as notifying managers when a high severity
incident is created.

Notifications are discussed in greater detail in the Configuring Cloud SOAR
section of this manual.

### Mail Notification Queue

The **Mail Notification Queue** shows the status of all email
notifications sent by Cloud SOAR.

![Mail Notification Queue](/img/cloud-soar/image21.png)                                      
_Mail Notification Queue_

By navigating to the Mail Notification Queue users can view any delivery
failures, the details of the original notification, as well as have the
options to resend or delete the notification.

### Customizations

Under the **Customizations** drop down, users will find an arsenal of
tools at their disposal. These tools will assist in the creation of
reports, custom fields, and incident elements, just to name a few. The
full list of features is listed below.

### Incident Reports

Report Templates allow users to build their own reports by selecting
various components of an incident they wish to include in the report.

### Custom Fields

**Custom Fields** allows administrators to edit existing fields as well as
add new fields for almost every section of Cloud SOAR. All Cloud SOAR sections
which permit custom fields are displayed on the left-hand side of the
page. Clicking on any one of these sections will display all current
fields for that section on the right-hand side of the page. Any existing
field may be edited, to include changing the name or adding list values.
The only attribute which cannot be changed is the type of the field,
such as text or date. New fields may also be added from this page.

### Logo

The **Logo** section allows administrators to customize both their Cloud SOAR
user interface and reports with the logo of their company or the logo of
their clients. This can be done by simply uploading their image in the
specified .PNG file format size.

![Logo Settings](/img/cloud-soar/image18b.png)
_Logo Settings_
### Incident Label

The Incident labels section allows an administrator to define labels for
the different types of incidents that will be investigated. These labels
can also be created during the automation rule and incident template
creation process which will be explained in later sections.

### Triage

Cloud SOAR's Triage module ingests events via the Cloud SOAR API and can be used
to triage events which may be unverified or have a low confidence level
before they are converted to incidents. The Triage module can be
completely customized for use cases from financial fraud to network IDS
alerts.

### Audit and Information

All audit and licensing information can be found under the Audit and
Information tab.

![Audit & Information Menu and License Information](/img/cloud-soar/image20.png)    
_Audit & Information Menu
License Information_

All license information can be found in this section.

![Audit & Info](/img/cloud-soar/image20b.png)
_Audit & Info_
### Audit Trail

Cloud SOAR audit logs and activity can be reviewed under the **Audit Trail** section of the menu. Users can filter through activity displaying only errors and warnings or build their own filters for review. Log rotation
settings and the ability to export audit findings can be controlled from
the **Audit** menu at the top of the screen.

### User Settings

The user icon in the upper right-hand corner allows the currently logged in user to view their profile and settings, as well as log out of the platform.

![My Profile](/img/cloud-soar/image24.png)                                          
_My Profile_

The **My Profile** button will take the user to the User Management section of the platform. From the User Management section administrators can add and remove users, lock a user's account, force a user account to change their password or set its expiration period.

## Main Menu

The **Main Menu** consists of all operational functions of Cloud SOAR outlined
below:

![main menu](/img/cloud-soar/image25.png)
_Main Menu_
### Home

The Home section is where all current tasks for the logged in user
reside. Users can interact with their tasks by approving, declining, or
closing a task as well as customize this section to display all tasks
assigned to a specific user or group.

![User's Home Page](/img/cloud-soar/image26.png)
_User's Home Page_


### Dashboards

Dashboard layout is designed to render data for quick comprehension
using a combination of graphics, e.g., charts, tables, graphs, and
visual indicators, called Widgets. The data is helpful to security
analysts tasked with incident handling and operational activities and
provides supervisors and stakeholders a summary overview from which to
derive strategic information.

![Figure - Dashboard](/img/cloud-soar/image27.png)
_Figure - Dashboard_


### Incidents

All current and previous incidents can be found in the Incidents
section. Incidents can be sorted, filtered, and accessed through this
section. Opening an individual incident will allow the user to interact
with all aspects of the incident permitted by their assigned Incident
Profile.

Users may also add incidents manually from the Incidents section for
incidents which were not created automatically through another process.

![Figure - Incidents Section](/img/cloud-soar/image28.png)
_Figure - Incidents Section_


### Triage

Cloud SOAR's Triage module ingests events via the Cloud SOAR API and can be used
to triage events which may be unverified or have a low confidence level
before they are converted to incidents. The Triage module can be
completely customized for use cases from financial fraud to network IDS
alerts.

![Triage Section](/img/cloud-soar/image29.png)
_Triage Section_

### Entities

The **Entities** tab provides access to data from across all incidents, as
well as other information which can be stored within Cloud SOAR.
Observables from every incident can be found in this section, along with
any enrichment data associated with these data types and the incidents
they were reported in.

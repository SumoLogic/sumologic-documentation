---
id: global-functions-menu
title: Cloud SOAR Global Functions Menu
sidebar_label: Global Functions Menu
description: Learn about features of the Cloud SOAR main menu.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

Cloud SOAR is a pure web-based application that does not require an additional add-on or client to deploy. The Global Functions Menu consists of all Cloud SOAR configuration and administrative options you'll need, such as user access, integration configurations, and auditing information.

<img src={useBaseUrl('img/cloud-soar/image8.png')} alt="Global Functions Menu" style={{border: '1px solid gray'}} width="600"/>


## Automation

The **Automation** section contains all the functions related to automation and orchestration processes of the Cloud SOAR platform.

To access this section, click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) > **Automation**.

:::tip Automation Docs
See [Automation](/docs/cloud-soar/automation) for in-depth information.
:::

### Playbook

**Playbooks**, previously known as Playbooks, are the core of Cloud SOAR's automation capabilities. Playbooks permit administrators to create automated and semi-automated workflows utilizing Cloud SOAR integrations, tasks and a variety of flow control decisions and other actions.

<img src={useBaseUrl('img/cloud-soar/image15.png')} alt="Automation menu" style={{border: '1px solid gray'}} width="250"/>

Playbook workflows can be configured to execute automatically without human intervention, or can be executed in an interactive mode, where user input is required to authorize predefined actions.

### Incident Template

**Incident Templates** allow you to define a certain number of incident attributes that will automatically be set each time an incident is generated based on the template. This may include type, classification, incident assignment, playbooks or any other incident attribute.

<img src={useBaseUrl('img/cloud-soar/image15b.png')} alt="Automation menu" style={{border: '1px solid gray'}} width="250"/>

### Integrations

The **Integrations** section allows administrators to configure bidirectional integrations with third-party technologies, as well as view the supported actions for each integration. In addition, this section allows administrators to manage custom scripts, which can be written in Python, Perl, PowerShell or Bash.

<img src={useBaseUrl('img/cloud-soar/image15c.png')} alt="Automation menu" style={{border: '1px solid gray'}} width="250"/>

### Rules

The Events Automation tab enables you to establish any daemonized integration rules to define what occurs when data is received from each of these sources. These rules allow specific data to be parsed from the incoming data sources and the acted upon automatically or through manual actions.

<img src={useBaseUrl('img/cloud-soar/image15d.png')} alt="Automation menu" style={{border: '1px solid gray'}} width="250"/>

## Settings

The **Settings** section contains several Cloud SOAR administrative functions. To access, click the cog icon (<img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/>) <br/><img src={useBaseUrl('img/cloud-soar/automation.png')} alt="Automation" style={{border: '1px solid gray'}} width="600"/>

<img src={useBaseUrl('img/cloud-soar/image17.png')} alt="Settings menu" style={{border: '1px solid gray'}} width="300"/>                    


The following sections detail the various setup and configuration options for the Cloud SOAR platform. Although initial configuration can be performed in any order, the following sections are ordered in the suggested order for initial configuration.


### General Settings

The following options can be configured under General Settings:

#### System
- Display Notification __ Number of seconds
- Display Session Timeout __ The Session timeout in minutes will be applied to the next user login. 

<img src={useBaseUrl('img/cloud-soar/image184.png')} alt="General Settings" style={{border: '1px solid gray'}} width="300"/> 

#### International Settings

<img src={useBaseUrl('img/cloud-soar/image187.png')} alt="International Settings" style={{border: '1px solid gray'}} width="600"/> 

#### Language Settings
French language is now enabled in Cloud SOAR. It can be enabled under user profile section.

<img src={useBaseUrl('img/cloud-soar/image999.png')} alt="Language Settings" style={{border: '1px solid gray'}} width="600"/> 

#### Instant Messaging

Instant Messaging integration can be enabled from here.

<img src={useBaseUrl('img/cloud-soar/image33b.png')} alt="messaging integration" style={{border: '1px solid gray'}} width="550"/>

The same integration has to be updated under the user profile configuration.

<img src={useBaseUrl('img/cloud-soar/image33b1.png')} alt="messaging integration" style={{border: '1px solid gray'}} width="750"/>

#### Incidents

There are several Incident settings that you should consider when configuring Cloud SOAR.

Cloud SOAR's Automatic Observables Harvesting feature examines free text areas of Cloud SOAR to gather observables, such as IP addresses, domains and email addresses. When enabled, Cloud SOAR will automatically harvest these observables and add them to the appropriate observables section within the incident. Checking the boxes under Automatically extract Observables elements from will cause Cloud SOAR to perform Automatic Observables Harvesting on the checked sections.

Under the Incident settings, it is also possible to make a final incident note mandatory before the incident can be closed. This can be used to enforce the policy of recording the final disposition of an incident before it is closed.

<img src={useBaseUrl('img/cloud-soar/image31.png')} alt="Incident Settings" style={{border: '1px solid gray'}} width="500"/>

<img src={useBaseUrl('img/cloud-soar/image188.png')} alt="Incident General Settings" style={{border: '1px solid gray'}} width="800"/>

:::tip Incidents Documentation
For more information, refer to [Incidents and Triage](/docs/cloud-soar/incidents-triage).
:::


#### Incident Process Phases

Cloud SOAR allows managers to monitor the progress of incident phases as the incident progresses. These phases and their properties can be configured by administrators in the General settings page.

<img src={useBaseUrl('img/cloud-soar/image32.png')} alt="Incident Phases" style={{border: '1px solid gray'}} width="600"/>

In addition to the phase name, administrators can determine whether the phase is mandatory and the status of the incident when the new phase is reached. Administrators may also disable phase management at the top of the Incident Process Phase section or choose not to show the phase management section in the Incident Details screen.

<img src={useBaseUrl('img/cloud-soar/image189.png')} alt="Incident Process Phase Settings" style={{border: '1px solid gray'}} width="600"/>


#### Queue Settings

One or more queues may be configured which can be used to assign incidents to until they are ready to be assigned to users. Queues can be managed at the bottom of the General settings page.

<img src={useBaseUrl('img/cloud-soar/image33.png')} alt="Queue Settings" style={{border: '1px solid gray'}} width="650"/>

Click the **+** button in the upper right-hand corner of the queue settings to add a new queue. There are no restrictions on the number, or the scheme used to create queues. Common schemes are to create one general queue, a queue for each analyst tier, or a queue by job function.

<img src={useBaseUrl('img/cloud-soar/image199.png')} alt="Queue Settings" style={{border: '1px solid gray'}} width="800"/>

#### Internet Connection Settings

<img src={useBaseUrl('img/cloud-soar/image186.png')} alt="Internet Connection Settings" style={{border: '1px solid gray'}} width="600"/>

### User Management

#### Groups

You can create a group of users and assign a role to all the users in the group. This makes it easy to assign a specialized role to multiple users at once rather than adding the users individually to the role.

For example, say there is a group of users with different roles responsible for customer support.
Access to a specific incident with restricted privileges needs to be granted to all investigators of the incident. You can create a role with just the needed [Cloud SOAR role capabilities](/docs/manage/users-roles/roles/role-capabilities/#cloud-soar) and select it as the role (also known as a profile) for members of the group. Then when you [add investigators](/docs/cloud-soar/incidents-triage/#add-investigators) for the incident, you can select the group rather than individual users.

##### Create a group

1. In the upper-right corner of the Cloud SOAR UI, click the cog icon <img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" style={{border: '1px solid gray'}} width="20"/> and select  **Automation**.
1. On the left navigation bar, select **User Management** > **Groups**. The **Groups** dialog is displayed. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-groups.png')} alt="Groups dialog" style={{border: '1px solid gray'}} width="700"/>
1. Click the **+** icon next to **Groups**. The **Add Groups** dialog is displayed. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-add-group.png')} alt="Add Group dialog" style={{border: '1px solid gray'}} width="600"/>
1. In **Name** enter a name for the group.
1. In **Profile** select the role to use for members of the group. These are roles already created in the system. To see role capabilities assigned to these roles, in the Sumo Logic Log Analytics Platform select **Administration** > **Users and Roles** and click the **Roles** tab. For more information about roles, see [Create and Manage Roles](/docs/manage/users-roles/roles/create-manage-roles/).
1. Click **Create**. The empty group is displayed. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-example-group.png')} alt="Example group" style={{border: '1px solid gray'}} width="600"/>
1. Click the **+** icon next to **Members**. 
1. Select the users to add to the group.
1. Click **Apply**. 

##### Group role assignments

The role specified in an assigned group profile supersedes the user's [role assignments in the Sumo Logic Log Analytics Platform](/docs/manage/users-roles/roles/add-remove-users-role/). The group permissions are persistent until the user leaves the group, the profile is removed from the group, or the group is deleted. 

| User | Result | 
| :-- | :-- |
| In a group | Has the assigned group role (profile) |
| In multiple groups |  Has the sum of the roles (profiles) from all the groups it is a member of |
| Not in a group | Has role assignments as assigned in the core platform |
| In group without a role (profile) | Has role assignments as assigned in the core platform |


### Notifications

Cloud SOAR allows administrators to configure notifications to Cloud SOAR users as well as other external users. These notifications can be sent via Cloud SOAR's internal messaging platform, as well as email and SMS. **Watcher Groups** can also be created, which allows Cloud SOAR to send notifications to those who are not necessarily assigned to an incident when certain conditions are met, such as notifying managers when a high severity incident is created.

The Notifications selection enables you to configure outbound email (SMTP) settings, and set up text messaging for incident notifications. Notifications can be configured by clicking on Notifications from the Settings menu.

#### Email Server Configuration

Under the Email Server Configuration tab, users configure outbound mail and confirm privacy settings to fit their organization's needs. Once these options are set, Administrators can configure which types of events should trigger notifications to which users and by what means.

<img src={useBaseUrl('img/cloud-soar/image42.png')} alt="Email Configuration Settings" style={{border: '1px solid gray'}} width="800"/>

#### Mail Notification Queue

The **Mail Notification Queue** shows the status of all email notifications sent by Cloud SOAR.                                   

<img src={useBaseUrl('img/cloud-soar/image21.png')} alt="Mail Notification Queue" style={{border: '1px solid gray'}} width="800"/>

By navigating to the Mail Notification Queue, you can view any delivery failures, the details of the original notification, as well as have the options to resend or delete the notification.

### Customization

Under the **Customization** dropdown, you will find an arsenal of tools at their disposal. These tools will assist in the creation of reports, custom fields, and incident elements, just to name a few. The full list of features is listed below.

#### Incident Reports

Report Templates allow you to build their own reports by selecting various components of an incident they wish to include in the report.

#### Custom Fields

**Custom Fields** allows administrators to edit existing fields as well as add new fields for almost every section of Cloud SOAR. All Cloud SOAR sections which permit custom fields are displayed on the left-hand side of the page. Clicking on any one of these sections will display all current fields for that section on the right-hand side of the page. Any existing field may be edited, to include changing the name or adding list values. The only attribute which cannot be changed is the type of the field, such as text or date. New fields may also be added from this page.

#### Logo

The **Logo** section allows administrators to customize both their Cloud SOAR user interface and reports with the logo of their company or the logo of their clients. This can be done by simply uploading their image in the specified .PNG file format size.

<img src={useBaseUrl('img/cloud-soar/image18b.png')} alt="Logo Settings" style={{border: '1px solid gray'}} width="400"/>


#### Incident Label

The Incident labels section allows an administrator to define labels for the different types of incidents that will be investigated. These labels can also be created during the automation rule and incident template creation process which will be explained in later sections.

#### Triage

Cloud SOAR's Triage module ingests events via the Cloud SOAR API and can be used to triage events which may be unverified or have a low confidence level before they are converted to incidents. The Triage module can be completely customized for use cases from financial fraud to network IDS
alerts.

## Report

With the **Report** option, you can create incident reports to share with others as well as [widgets](/docs/cloud-soar/main-menu/#create-widgets) to use in the report that display text, graphs, tables, and charts containing details about incidents and other aspects of Cloud SOAR.

1. Click the gear icon in the upper-right corner of the UI, then select **Report**. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-reports.png')} alt="Access reports" width="150"/><br/>The Report UI appears. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-report-ui.png')} alt="Reports user interface" width="600"/> 
1. Click the **+** icon in the upper left corner. 
1. On the right side, select widgets to add to the report from **My Widgets** or **Public**. These are the same widgets that are available to use in [dashboards](/docs/cloud-soar/main-menu/#create-a-dashboard). Widgets can be graphs, charts, tables, or any kind of visual element that contains information. Click **New** to [create a new widget](/docs/cloud-soar/main-menu/#create-widgets). Click **Show List** to see all available widgets.  
1. Rearrange the widgets in the report as needed.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-widgets-in-report.png')} alt="Widgets in a report" width="600"/>
1. Click **Save**. In the dialog:
    1. Provide a **Report name** and a **Description**.
    1. Click **Schedule** to schedule the report to run on a regular basis.
    1. Scroll to the bottom of the dialog and click **Public** if you want to make the report available to others.
    1. Click **Save**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-save-report.png')} alt="Save a report" width="300"/>
1. Click **Export** to export the report to PDF. 
1. Click **Open** to open available reports. 

## Support

Under the **Support** section, you can find valuable information such as the Cloud SOAR user manual, API Integrations, the Integration Framework, a link to our Community portal, as well as contact Sumo Logic for other support issues.

To access, click the question mark icon in the top nav.

<img src={useBaseUrl('img/cloud-soar/support.png')} alt="Support Page" style={{border: '1px solid gray'}} width="600"/>

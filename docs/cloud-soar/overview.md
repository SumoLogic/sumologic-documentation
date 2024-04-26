---
id: overview
title: Cloud SOAR Overview
sidebar_label: Overview
---

Cloud SOAR fully automates triage, investigation, and remediation of threats for any security professional. The open integrations framework allows you to connect to a multitude of third-party applications. The platform provides full incident response lifecycle management with machine learning and threat hunting, accelerating mean time to respond (MTTR).

import useBaseUrl from '@docusaurus/useBaseUrl';

## Cloud SOAR user interface

### Access Cloud SOAR

To access Cloud SOAR, click **Cloud SOAR** in the Sumo Logic navigation menu. 

Cloud SOAR must be enabled by Sumo Logic before it is accessible to users in your organization. If you would like to use Cloud SOAR in your organization, contact your Sumo Logic account representative.

### Theme

import Theme from '../reuse/dark-light-theme.md';

<Theme/>

## Cloud SOAR menus

### Cloud SOAR menus for classic UI

#### Top menu

This menu appears at the top of the Cloud SOAR screen: <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-top-menu.png')} alt="Top menu bar" style={{border: '1px solid gray'}} width="600"/>

Use the top menu to access:
* [**Incidents**](/docs/cloud-soar/incidents-triage). Manage security incidents that require investigation and action. 
* [**Entities**](/docs/cloud-soar/incidents-triage/#entities). Manage entities identified across incidents. 
* <img src={useBaseUrl('img/cloud-soar/cloud-soar-support-icon.png')} alt="Support menu icon" style={{border: '1px solid gray'}} width="25"/> **Support**. Access help, including documentation and support contact information.
* <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> [**Settings**](#settings-menu). Configure Cloud SOAR settings.

#### Settings menu

The **Settings** menu allows you to configure Cloud SOAR settings. To access the menu, click <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> on the [top menu](#top-menu). <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-menu.png')} alt="Settings menu" style={{border: '1px solid gray'}} width="150"/>

Use the **Settings** menu to access:
* [**Automation**](/docs/cloud-soar/automation/). Configure Cloud SOAR's automation and orchestration features.
* [**Settings**](/docs/cloud-soar/overview/#settings). Configure Cloud SOAR settings.
* [**Report**](/docs/cloud-soar/incidents-triage/#report). Configure reports. 

### Cloud SOAR menus for new UI

#### Cloud SOAR sidebar menu

Click **Cloud SOAR** in the main Sumo Logic menu to open the sidebar menu.<br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-sidebar-menu.png')} alt="Cloud SOAR sidebar menu" style={{border: '1px solid gray'}} width="350"/> 

Use the **Cloud SOAR** sidebar menu to access:
* [**SecOps & Dashboard**](/docs/cloud-soar/main-menu/#home). Open the home screen of Cloud SOAR.
* [**Incidents**](/docs/cloud-soar/main-menu/#incidents). Manage security incidents that require investigation and action. 
* [**Triage**](/docs/cloud-soar/incidents-triage/#triage). Triage events which may be unverified or have a low confidence level before they are converted to incidents.
* [**Entities**](/docs/cloud-soar/main-menu/#entities). Manage entities identified across incidents. 
* [**Report**](/docs/cloud-soar/global-functions-menu/#report). Configure reports.  

#### Automation sidebar menu

Click **Automation** in the main Sumo Logic menu to open the sidebar menu.<br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-automation-sidebar-menu.png')} alt="Cloud SOAR sidebar menu" style={{border: '1px solid gray'}} width="350"/> 

Use the **Automation** sidebar menu to access:
* [**App Central**](/docs/cloud-soar/automation/#app-central). Add new integrations and playbooks to your environment.
* [**Playbooks**](/docs/cloud-soar/automation/#playbook). Create playbooks to run automated actions.
* [**Template**](/docs/cloud-soar/automation/#incident-templates). Create incident templates.
* [**Integrations**](/docs/cloud-soar/automation/#integrations). Manage integrations with vendors. 
* [**Rules**](/docs/cloud-soar/automation/#rules). Create automation rules.
* [**Bridge**](/docs/cloud-soar/cloud-soar-bridge/). Configure a bridge to run custom actions or integrations.

#### Top menu

This menu appears at the top of the screen:<br/><img src={useBaseUrl('img/get-started/sumo-logic-top-menu-bar-new.png')} alt="Top menu bar" style={{border: '1px solid gray'}} width="400"/>

Use the top menu to access:

* <img src={useBaseUrl('img/get-started/go-to-icon.png')} alt="Go To icon" style={{border: '1px solid gray'}} width="60"/> [**Go To...**](#go-to-menu) Launch Sumo Logic features, including for Cloud SOAR.
* <img src={useBaseUrl('img/get-started/help-icon.png')} alt="Help icon" style={{border: '1px solid gray'}} width="30"/> **Help**. Access links to documentation, support, community, release notes, and system status.
* <img src={useBaseUrl('img/get-started/app-catalog-icon.png')} alt="App Catalog icon" style={{border: '1px solid gray'}} width="30"/> [**App Catalog**](/docs/integrations/). Open the App Catalog.
* <img src={useBaseUrl('img/get-started/configuration-icon.png')} alt="Configuration icon" style={{border: '1px solid gray'}} width="30"/> [**Configuration**](#configuration-menu). Configure Sumo Logic features, including for Cloud SOAR.
* <img src={useBaseUrl('img/get-started/administration-icon.png')} alt="Administration icon" style={{border: '1px solid gray'}} width="30"/> [**Administration**](#administration-menu).  Administer Sumo Logic features, including for Cloud SOAR.
* <img src={useBaseUrl('img/get-started/profile-icon-new.png')} alt="Profile icon" style={{border: '1px solid gray'}} width="30"/> **Profile**. View your notification and [preference](/docs/get-started/account-settings-preferences/) settings.

#### Go To... menu

The **Go To...** menu allows you to launch Sumo Logic features, including for Cloud SOAR. To access this menu, click <img src={useBaseUrl('img/get-started/go-to-icon.png')} alt="Go To icon" style={{border: '1px solid gray'}} width="50"/> on the [top menu](#top-menu-1). <br/><img src={useBaseUrl('img/get-started/go-to-menu.png')} alt="Go To menu bar" style={{border: '1px solid gray'}} width="500"/>

Use the **Go To...** menu to access these Cloud SOAR features:
* [**Bridge**](/docs/cloud-soar/cloud-soar-bridge/). Configure a bridge to run custom actions or integrations.
* [**Entities**](/docs/cloud-soar/main-menu/#entities). Manage entities identified across incidents. 
* [**Fields**](/docs/cloud-soar/incidents-triage/#custom-fields). Customize fields to better suit your environment.
* [**General**](/docs/cloud-soar/global-functions-menu/#settings). Configure general Cloud SOAR settings.
* [**Groups**](/docs/cloud-soar/global-functions-menu/#groups). Create a group of users and assign a role to all the users in the group.
* [**Incidents**](/docs/cloud-soar/main-menu/#incidents). Manage security incidents that require investigation and action.
* [**Incident Labels**](/docs/cloud-soar/global-functions-menu/#incident-label). Define labels for the different types of incidents that will be investigated.
* [**Notifications**](/docs/cloud-soar/global-functions-menu/#notifications). Configure notifications to Cloud SOAR users as well as other external users. 
* [**Report**](/docs/cloud-soar/global-functions-menu/#report). Configure reports.
* [**SecOps & Dashboard**](/docs/cloud-soar/main-menu/#home). Open the home screen of Cloud SOAR.
* [**Triage**](/docs/cloud-soar/incidents-triage/#triage). Triage events which may be unverified or have a low confidence level before they are converted to incidents.

#### Configuration menu

The **Configuration** menu allows you to configure Sumo Logic features, including for Cloud SOAR. To access this menu, click <img src={useBaseUrl('img/get-started/configuration-icon.png')} alt="Configuration icon" style={{border: '1px solid gray'}} width="30"/> on the [top menu](#top-menu-1). Scroll down the menu to see Cloud SOAR configuration options. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-configuration-menu.png')} alt="Cloud SOAR options on the configuration menu" style={{border: '1px solid gray'}} width="200"/>

Use the **Configuration** menu to access:
* [**Incidents**](/docs/cloud-soar/main-menu/#incidents). Manage security incidents that require investigation and action.
* [**Fields**](/docs/cloud-soar/incidents-triage/#custom-fields). Customize fields to better suit your environment. 
* [**Incident Labels**](/docs/cloud-soar/global-functions-menu/#incident-label). Define labels for the different types of incidents that will be investigated.

#### Administration menu

The **Administration** menu allows you to administer Sumo Logic features, such as for for [account](/docs/manage/), [users and roles](/docs/manage/users-roles/), and [account security](/docs/manage/security/). You can also administer Cloud SOAR features. To access this menu, click <img src={useBaseUrl('img/get-started/administration-icon.png')} alt="Administration icon" style={{border: '1px solid gray'}} width="30"/> on the [top menu](#top-menu-1). Scroll down the menu to see Cloud SOAR administration options. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-administration-menu.png')} alt="Cloud SOAR options on the administration menu" style={{border: '1px solid gray'}} width="175"/>

Use the **Administration** menu to access:
* [**General**](/docs/cloud-soar/global-functions-menu/#general-settings). Configure general Cloud SOAR settings.
* [**Notifications**](/docs/cloud-soar/global-functions-menu/#notifications). Configure notifications to Cloud SOAR users as well as other external users. 
* [**Groups**](/docs/cloud-soar/global-functions-menu/#groups). Create a group of users and assign a role to all the users in the group.

## Why Cloud SOAR?

Cloud SOAR is a modern security operations technology platform that empowers MSSPs, SOCs, and security teams by providing collaborative and automated real-time incident management and threat response. Make quick and insightful decisions during security response with workflow automation.

* **All-in-one platform for minimizing the response time**
   * Integrates disparate technologies focusing analysts on real threats.
   * Makes the most of automation, orchestrating several tools in Standard Operating Procedures (SOPs).
   * Measures success and improves communication.
* **Better collaboration**
<br/>Cloud SOAR’s native orchestration capabilities boost the collaboration within the SOC team, ensuring efficient synergy during each phase of incident response. Automation of the full incident lifecycle eases the burden on security analysts, while helping to successfully pinpoint real threats and coordinate an effective response across tools and team members.
* **Customizable reports**
<br/>Quickly assemble highly customizable reports and dashboards to easily navigate and assess your security intelligence portfolio. Use relevant templates to capture workflow processes, job functions, and response timeframes, including critical indicators of compromise (IOC) and corrective actions taken. Use reports to create greater visibility for KPIs and make collective improvements across the SOC team.
* **Speed incident response**
<br/>Cloud SOAR improves incident response time with flexible workflow automation across tools and teams. Machine learning distinguishes real threats from false positives to reduce alert fatigue.
* **Connect disparate tools**
<br/>Cloud SOAR acts as the connective tissue between your existing tools to automate processes across the SOC and derive relevant insights throughout your security portfolio.
* **Close the skill gap**
<br/>Automated workflow processes help analysts function at an optimal level and reduce the skills gap that exists from the lack of qualified cybersecurity professionals.
* **Comprehensive security portfolio**
<br/>Cloud SOAR comprises both the Automation Service, which allows Sumo Logic to leverage the power of automated playbooks, and the full Cloud SOAR. Cloud SOAR combines automation with case management, among many other capabilities aimed at helping your organization modernize security operations.

## Cloud SOAR highlights

Cloud SOAR helps secure operations and automate incident response through integrations with leading third-party threat intelligence vendors. Following are some of the highlights. 

### Triage

Cloud SOAR provides automated investigation of indicators of compromise (IoCs) for cyber and non-cyber use cases. For more information, see [Triage](/docs/cloud-soar/incidents-triage/#triage).

<img src={useBaseUrl('img/cloud-soar/overview-advanced-triage.png')} alt="Advanced triage" style={{border: '1px solid gray'}} width="800" />

### War Room

The War Room provides a complete, chronological, and detailed picture of a specific incident process. It also enables security analysts to work simultaneously on incidents with granular role-based access control (RBAC) for general and incident profiles. For more information, see [War Room](http://localhost:3000/docs/cloud-soar/incidents-triage/#war-room).

<img src={useBaseUrl('img/cloud-soar/overview-case-management.png')} alt="Case Management" style={{border: '1px solid gray'}} width="800" />

### Playbooks

Playbooks orchestrate your security operation center (SOC) team’s security stack and automate time-consuming tasks to improve your standard operating procedures (SOPs) and minimize response time. For more information, see [Playbooks](/docs/cloud-soar/automation/#playbook).

<img src={useBaseUrl('img/cloud-soar/overview-automated-sop.png')} alt="Automated SOPs" style={{border: '1px solid gray'}} width="800" />

### Dashboards and reports

Gain complete insight into incident response performance with customizable dashboards and reports. Keep track of your most important KPIs with real-time data on each phase of the incident response life cycle. For more information, see [Dashboards](/docs/cloud-soar/incidents-triage/#dashboards).

<img src={useBaseUrl('img/cloud-soar/overview-customized-reports.png')} alt="KPI dashboards" style={{border: '1px solid gray'}} width="800" />

### Open Integration Framework (OIF)

Choose from hundreds of out-of-the-box actions and playbooks or ask the Sumo Logic team to develop the connectors you need. Anyone can access the API code to quickly integrate tools without any coding experience required. For more information, see [Integrations](//docs/cloud-soar/automation/#integrations). 

<img src={useBaseUrl('img/cloud-soar/overview-openI-itegration.png')} alt="Integrations" style={{border: '1px solid gray'}} width="800" />

## Incident generation process

 [Incidents](/docs/cloud-soar/incidents-triage/) are at the heart of Cloud SOAR. Incidents are events that require investigation and remediation. Cloud SOAR generates incidents with an automated process:
 1. An alert is received by Cloud SOAR via an integration.
 1. [Automation rules](/docs/cloud-soar/automation/#creating-incidents-from-automation-rules) process the alert. Behind the scenes, parsing rules break out the data into artifacts to be used as arguments in playbooks, such as IP addresses, usernames, host names, and so on.
 1. The data is fed into an [incident template](/docs/cloud-soar/automation/#incident-templates).
 1. [Playbooks](/docs/cloud-soar/automation/#playbook) run against the data.
 1. Cloud SOAR generates an [incident](/docs/cloud-soar/incidents-triage/#working-with-incidents).

<img src={useBaseUrl('img/cloud-soar/cloud-soar-automation-flow.png')} alt="Cloud SOAR automation flow" style={{border: '1px solid gray'}} width="800" />

## Settings

The following sections detail the various setup and configuration options for the Cloud SOAR platform. Although initial configuration can be performed in any order, the following sections are ordered in the suggested order for initial configuration.


### General settings

To access General settings, click the gear icon <img src={useBaseUrl('img/cloud-soar/cog.png')} alt="cog menu" width="20"/> in the top right and select **Settings**.

The following sections describe available settings.

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

## Data retention

This section lists the retention period for each type of data generated. 

### Default retention periods by data type

Sumo Logic automatically deletes the following customer data according to the table retention period below, except for customers required to ensure HIPAA compliance (see second table).

| Data type | Retention period |
| :-- | :-- |
| Incidents | 2 years |
| Triage | 2 years |
| Entities | 2 years |
| Playbook and action executions | 2 years |

For HIPAA-compliant customers, we delete data following the retention periods below. 

:::info
If you need to follow HIPAA compliance, it is important to explicitly communicate this when requesting Cloud SOAR activation.
:::

| Data type | Retention period |
| :-- | :-- |
| Incidents | 7 years |
| Triage | 7 years |
| Entities | 7 years |
| Playbook and action executions | 7 years |

### Custom retention periods

You can request retention period times different from those declared in the tables above, as long as the retention period requested is greater than 1 day yet less than 5000 days.

In order to do that, please open a [Support ticket](/docs/get-started/help#support) with your request.

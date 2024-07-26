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

### Cloud SOAR menus

<!--Kanso 
### Classic UI

The classic UI is the traditional way to navigate in Sumo Logic. For more information, see [Tour the Classic Sumo Logic UI](/docs/get-started/sumo-logic-ui).
 Kanso-->

#### Top menu

This menu appears at the top of the Cloud SOAR screen: <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-top-menu.png')} alt="Top menu bar" style={{border: '1px solid gray'}} width="600"/>

Use the top menu to access:
* [**Incidents**](/docs/cloud-soar/incidents-triage/#incidents-screen). Manage security incidents that require investigation and action. 
* [**Entities**](/docs/cloud-soar/incidents-triage/#entities). Manage entities identified across incidents. 
* <img src={useBaseUrl('img/cloud-soar/cloud-soar-support-icon.png')} alt="Support menu icon" style={{border: '1px solid gray'}} width="25"/> **Support**. Access help, including documentation and support contact information.
* <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> [**Settings**](#settings-menu). Configure Cloud SOAR settings.

#### Settings menu

The **Settings** menu allows you to configure Cloud SOAR settings. To access the menu, click <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> on the [top menu](#top-menu). <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-menu.png')} alt="Settings menu" style={{border: '1px solid gray'}} width="150"/>

Use the **Settings** menu to access:
* [**Automation**](/docs/cloud-soar/automation/). Configure Cloud SOAR's automation and orchestration features.
* [**Settings**](/docs/cloud-soar/overview/#settings). Configure Cloud SOAR settings.
* [**Report**](/docs/cloud-soar/incidents-triage/#report). Configure reports. 

<!--Kanso 
### New UI

The new UI provides a streamlined way to navigate in Sumo Logic. For more information, see [Tour the New Sumo Logic UI](/docs/get-started/sumo-logic-ui-new).

#### Cloud SOAR sidebar menu

Click **Cloud SOAR** in the main Sumo Logic menu to open the sidebar menu.<br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-sidebar-menu.png')} alt="Cloud SOAR sidebar menu" style={{border: '1px solid gray'}} width="350"/> 

Use the **Cloud SOAR** sidebar menu to access:
* [**SecOps & Dashboard**](/docs/cloud-soar/incidents-triage/#secops-and-dashboard). Open the home screen of Cloud SOAR.
* [**Incidents**](/docs/cloud-soar/incidents-triage/#incidents-screen). Manage security incidents that require investigation and action. 
* [**Triage**](/docs/cloud-soar/incidents-triage/#triage). Triage events which may be unverified or have a low confidence level before they are converted to incidents.
* [**Entities**](/docs/cloud-soar/incidents-triage/#entities). Manage entities identified across incidents. 
* [**Report**](/docs/cloud-soar/incidents-triage/#report). Configure reports.  

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
* <img src={useBaseUrl('img/get-started/configuration-icon.png')} alt="Configuration icon" style={{border: '1px solid gray'}} width="30"/> [**Configuration**](#configuration-menu). Configure Sumo Logic features, including for Cloud SOAR.
* <img src={useBaseUrl('img/get-started/administration-icon.png')} alt="Administration icon" style={{border: '1px solid gray'}} width="30"/> [**Administration**](#administration-menu).  Administer Sumo Logic features, including for Cloud SOAR.
* <img src={useBaseUrl('img/get-started/profile-icon-new.png')} alt="Profile icon" style={{border: '1px solid gray'}} width="30"/> **Profile**. View your notification and [preference](/docs/get-started/account-settings-preferences/) settings.

#### Go To... menu

The **Go To...** menu allows you to launch Sumo Logic features, including for Cloud SOAR. To access this menu, click <img src={useBaseUrl('img/get-started/go-to-icon.png')} alt="Go To icon" style={{border: '1px solid gray'}} width="50"/> on the [top menu](#top-menu-1). <br/><img src={useBaseUrl('img/get-started/go-to-menu.png')} alt="Go To menu bar" style={{border: '1px solid gray'}} width="500"/>

Use the **Go To...** menu to access these Cloud SOAR features:
* [**Bridge**](/docs/cloud-soar/cloud-soar-bridge/). Configure a bridge to run custom actions or integrations.
* [**Entities**](/docs/cloud-soar/incidents-triage/#entities). Manage entities identified across incidents. 
* [**Fields**](/docs/cloud-soar/incidents-triage/#custom-fields). Customize fields to better suit your environment.
* [**General**](#settings). Configure general Cloud SOAR settings.
* [**Groups**](#groups). Create a group of users and assign a role to all the users in the group.
* [**Incidents**](/docs/cloud-soar/incidents-triage/#incidents-screen). Manage security incidents that require investigation and action.
* [**Incident Labels**](#incident-label). Define labels for the different types of incidents that will be investigated.
* [**Notifications**](#notifications). Configure notifications to Cloud SOAR users as well as other external users. 
* [**Report**](/docs/cloud-soar/incidents-triage/#report). Configure reports.
* [**SecOps & Dashboard**](/docs/cloud-soar/incidents-triage/#secops-and-dashboard). Open the home screen of Cloud SOAR.
* [**Triage**](/docs/cloud-soar/incidents-triage/#triage). Triage events which may be unverified or have a low confidence level before they are converted to incidents.

#### Configuration menu

The **Configuration** menu allows you to configure Sumo Logic features, including for Cloud SOAR. To access this menu, click <img src={useBaseUrl('img/get-started/configuration-icon.png')} alt="Configuration icon" style={{border: '1px solid gray'}} width="30"/> on the [top menu](#top-menu-1). Scroll down the menu to see Cloud SOAR configuration options. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-configuration-menu.png')} alt="Cloud SOAR options on the configuration menu" style={{border: '1px solid gray'}} width="200"/>

Use the **Configuration** menu to access:
* [**Incidents**](/docs/cloud-soar/incidents-triage/#incidents-screen). Manage security incidents that require investigation and action.
* [**Fields**](/docs/cloud-soar/incidents-triage/#custom-fields). Customize fields to better suit your environment. 
* [**Incident Labels**](#incident-label). Define labels for the different types of incidents that will be investigated.

#### Administration menu

The **Administration** menu allows you to administer Sumo Logic features, such as for for [account](/docs/manage/), [users and roles](/docs/manage/users-roles/), and [account security](/docs/manage/security/). You can also administer Cloud SOAR features. To access this menu, click <img src={useBaseUrl('img/get-started/administration-icon.png')} alt="Administration icon" style={{border: '1px solid gray'}} width="30"/> on the [top menu](#top-menu-1). Scroll down the menu to see Cloud SOAR administration options. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-administration-menu.png')} alt="Cloud SOAR options on the administration menu" style={{border: '1px solid gray'}} width="175"/>

Use the **Administration** menu to access:
* [**General**](#general-settings). Configure general Cloud SOAR settings.
* [**Notifications**](#notifications). Configure notifications to Cloud SOAR users as well as other external users. 
* [**Groups**](#groups). Create a group of users and assign a role to all the users in the group.
 Kanso-->
 
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

The War Room provides a complete, chronological, and detailed picture of a specific incident process. It also enables security analysts to work simultaneously on incidents with granular role-based access control (RBAC) for general and incident profiles. For more information, see [War Room](/docs/cloud-soar/incidents-triage/#war-room).

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


### General

<!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> To access general settings, click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right and select **Settings**.
<!--Kanso 
[**New UI**](/docs/cloud-soar/overview#new-ui). To access general settings, in the top menu select **Administration**, and then under **Cloud SOAR Settings** select **General**. You can also click the **Go To...** menu at the top of the screen and select **General**.
 Kanso-->

<img src={useBaseUrl('img/cloud-soar/cloud-soar-general-settings.png')} alt="General Settings" style={{border: '1px solid gray'}} width="800"/> 

#### System

* **Use Proxy**. Enter settings if you need to use a proxy for Internet access.
* **Sticky Alert**. Set the number of seconds to display an alert in the Cloud SOAR UI when an incident generates an alert.
* **Date/Time Format**. Set the date and time format.

#### Incidents

Use these settings to configure how Cloud SOAR handles [incidents](/docs/cloud-soar/incidents-triage/#incidents-screen).

* **Duplicates**.
    * **Prohibit duplicate naming**. Select this checkbox to prevent incidents from being named identically.
    * **Default suffix for duplicated incident name**. Select the suffix to add to the end of incident names to differentiate incidents that are named the same.
    * **Use suffix on non-duplicate**. Use the selected suffix on all incidents, regardless of whether they are named the same.
* **Objects**. Gather objects, such as IP addresses, domains and email addresses, and add them to the appropriate object's section within the incident. 
    * **Extract from**:
       * **Incident field**. Gather objects from [incident properties](/docs/cloud-soar/incidents-triage/#incident-properties).
       * **Task field**. Gather objects from the [Tasks](/docs/cloud-soar/incidents-triage/#tasks) field.
       * **Note field**. Gather objects from the [Notes](/docs/cloud-soar/incidents-triage/#notes) field. 
    * **Filename extension whitelist**. Enter filename extensions to allow when gathering objects. 
* **Process Phase**. Configure phases for monitoring progress of incidents as they progress. Determine whether the phase is **Mandatory**, and the **Status** of the incident when the phase is reached. Select **Show Deleted** to show phases on deleted incidents.
* **Mandatory Closing Note**. Make a final incident note mandatory before the incident can be closed. 

#### Instant Messaging

Use these settings to configure authentication for an instant messaging service such as Slack. 

* **Integration**. Enter the name of the instant messaging service to integrate with Cloud SOAR.
* **Bot Oauth**. Enter the authorization token for the instant messaging service. 
* **Signing secret for verify requests**. Enter the signing secret for the instant messaging service.
* **Workspace**. Displays success or failure of the workspace connection to Cloud SOAR.

For additional setup needed for Slack, see [Configure Slack for Cloud SOAR](/docs/cloud-soar/automation/#configure-slack-for-cloud-soar).

### Groups

<!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> To access groups settings, click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right, select **Settings**, and on the left menu select **User Management > Groups**.
<!--Kanso 
[**New UI**](/docs/cloud-soar/overview#new-ui). To access groups settings, in the top menu select **Administration**, and then under **Cloud SOAR Settings** select **Groups**. You can also click the **Go To...** menu at the top of the screen and select **Groups**.
 Kanso-->

<img src={useBaseUrl('img/cloud-soar/cloud-soar-groups.png')} alt="Groups dialog" style={{border: '1px solid gray'}} width="700"/>

#### Create a group

You can create a group of users and assign a role to all the users in the group. This makes it easy to assign a specialized role to multiple users at once rather than adding the users individually to the role.

For example, say there is a group of users with different roles responsible for customer support. Access to a specific incident with restricted privileges needs to be granted to all investigators of the incident. You can create a role with just the needed [Cloud SOAR role capabilities](/docs/manage/users-roles/roles/role-capabilities/#cloud-soar) and select it as the role (also known as a profile) for members of the group. Then when you [add investigators](/docs/cloud-soar/incidents-triage/#add-investigators) for the incident, you can select the group rather than individual users.

1. Click the **+** icon next to **Groups**. The **Add Groups** dialog is displayed. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-add-group.png')} alt="Add Group dialog" style={{border: '1px solid gray'}} width="600"/>
1. In **Name** enter a name for the group.
1. In **Profile** select the role to use for members of the group. These are [roles](/docs/manage/users-roles/roles/) already created in the system. 
1. Click **Create**. The empty group is displayed. <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-example-group.png')} alt="Example group" style={{border: '1px solid gray'}} width="600"/>
1. Click the **+** icon next to **Members**. 
1. Select the users to add to the group.
1. Click **Apply**. 

#### Group role assignments

The role specified in an assigned group profile supersedes the user's [role assignments in the Sumo Logic Log Analytics Platform](/docs/manage/users-roles/roles/add-remove-users-role/). The group permissions are persistent until the user leaves the group, the profile is removed from the group, or the group is deleted. 

| User | Result | 
| :-- | :-- |
| In a group | Has the assigned group role (profile) |
| In multiple groups |  Has the sum of the roles (profiles) from all the groups it is a member of |
| Not in a group | Has role assignments as assigned in the core platform |
| In group without a role (profile) | Has role assignments as assigned in the core platform |

### Notifications

<!--Kanso [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Kanso--> To access notification settings, click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right, select **Settings**, and on the left menu select **Notifications > Event Triggers**.
<!--Kanso 
[**New UI**](/docs/cloud-soar/overview#new-ui). To access notification settings, in the top menu select **Administration**, and then under **Cloud SOAR Settings** select **Notifications**. You can also click the **Go To...** menu at the top of the screen and select **Notifications**.
 Kanso-->

<img src={useBaseUrl('img/cloud-soar/cloud-soar-event-triggers.png')} alt="Events Triggers dialog" style={{border: '1px solid gray'}} width="700"/>

Select the icon to the right of an event to trigger a notification to be sent when that event occurs. 

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

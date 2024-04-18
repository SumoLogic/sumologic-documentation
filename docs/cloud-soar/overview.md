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

#### Top menu

This menu appears at the top of the Cloud SOAR screen: <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-top-menu.png')} alt="Top menu bar" style={{border: '1px solid gray'}} width="600"/>

Use the top menu to access:
* [**Incidents**](/docs/cloud-soar/main-menu/#incidents). Manage security incidents that require investigation and action. 
* [**Entities**](/docs/cloud-soar/main-menu/#entities). Manage entities identified across incidents. 
* <img src={useBaseUrl('img/cloud-soar/cloud-soar-support-icon.png')} alt="Support menu icon" style={{border: '1px solid gray'}} width="25"/> **Support**. Access help, including documentation and support contact information.
* <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> [**Settings**](#settings-menu). Configure Cloud SOAR settings.

#### Settings menu

The **Settings** menu allows you to configure Cloud SOAR settings. To access the menu, click <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> on the [top menu](#top-menu). <br/><img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-menu.png')} alt="Settings menu" style={{border: '1px solid gray'}} width="150"/>

Use the **Settings** menu to access:
* [**Automation**](/docs/cloud-soar/automation/). Configure Cloud SOAR's automation and orchestration features.
* [**Settings**](/docs/cloud-soar/global-functions-menu/#general-settings). Configure Cloud SOAR settings.
* [**Report**](/docs/cloud-soar/global-functions-menu/#report). Configure reports. 


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

Gain complete insight into incident response performance with customizable dashboards and reports. Keep track of your most important KPIs with real-time data on each phase of the incident response life cycle. For more information, see [Dashboards](/docs/cloud-soar/main-menu/#dashboards).

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

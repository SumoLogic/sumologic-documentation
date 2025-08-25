---
id: overview
title: Cloud SOAR Overview
sidebar_label: Overview
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import StaticIpAddresses from '../reuse/static-ips-automation-service.md';

Cloud SOAR fully automates triage, investigation, and remediation of threats for any security professional. The open integrations framework allows you to connect to a multitude of third-party applications. The platform provides full incident response lifecycle management with machine learning and threat hunting, accelerating mean time to respond (MTTR).

## Why Cloud SOAR?

Cloud SOAR is a security operations technology platform that empowers MSSPs, SOCs, and security teams by providing collaborative and automated real-time incident management and threat response. Make quick and insightful decisions during security response with workflow automation.

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

For more information about these features, see [Cloud SOAR Incident Management and Triage](/docs/cloud-soar/incidents-triage/).

### Triage

Cloud SOAR provides automated investigation of indicators of compromise (IoCs) for cyber and non-cyber use cases.

<img src={useBaseUrl('img/cloud-soar/overview-advanced-triage.png')} alt="Advanced triage" style={{border: '1px solid gray'}} width="800" />

### War Room

The War Room provides a complete, chronological, and detailed picture of a specific incident process. It also enables security analysts to work simultaneously on incidents with granular role-based access control (RBAC) for general and incident profiles.

<img src={useBaseUrl('img/cloud-soar/cloud-soar-war-room.png')} alt="War Room" style={{border: '1px solid gray'}} width="800" />

### Playbooks

Playbooks orchestrate your security operation center (SOC) team’s security stack and automate time-consuming tasks to improve your standard operating procedures (SOPs) and minimize response time.

<img src={useBaseUrl('img/cloud-soar/overview-automated-sop.png')} alt="Automated SOPs" style={{border: '1px solid gray'}} width="800" />

### Dashboards and reports

Gain complete insight into incident response performance with customizable dashboards and reports. Keep track of your most important KPIs with real-time data on each phase of the incident response life cycle.

<img src={useBaseUrl('img/cloud-soar/cloud-soar-dashboard.png')} alt="Example dashboard" style={{border: '1px solid gray'}} width="800" />

### Open Integration Framework (OIF)

Choose from hundreds of out-of-the-box actions and playbooks or ask the Sumo Logic team to develop the connectors you need. Anyone can access the API code to quickly integrate tools without any coding experience required. For more information, see [Integrations](/docs/platform-services/automation-service/automation-service-integrations/) and [Integration Framework](/docs/platform-services/automation-service/integration-framework/).

<img src={useBaseUrl('img/cloud-soar/overview-openI-itegration.png')} alt="Integrations" style={{border: '1px solid gray'}} width="800" />

## User interface

### Access Cloud SOAR

To access Cloud SOAR, click **Cloud SOAR** in the Sumo Logic navigation menu.

Cloud SOAR must be enabled by Sumo Logic before it is accessible to users in your organization. If you would like to use Cloud SOAR in your organization, contact your Sumo Logic account representative.

### Theme

import Theme from '../reuse/dark-light-theme.md';

<Theme/>

## Architecture

Sumo Logic Cloud SOAR provides Security Operations and Automation Incident Response Platform to facilitate and expedite timely management of Incident Response with a rich library of customizable playbooks for different threats and use cases of incident response scenarios expediting and automating response time to incident response events.

This solution additionally provides capabilities to support incident
responders during the process of assessment, Investigation, data collection and correlation to help inference additional information and metrics analytics to see repetitive patterns when doing analysis. It facilitates documentation and knowledge transfer of information across the critical teams working on incident response and SOC operations team members.

Cloud SOAR Automation and Orchestration features help organizations from all sectors of the industry to manage measure and orchestrate security
operations tasks including incident qualification, triage and
escalation, threat hunting, analysis, threat containment and
remediation. The gathering of information from different data sources
and correlating this information expedites the capabilities and augments
human analyst available resources.

The Cloud SOAR tool offers standard management of Incident response events across different teams in the organization with the help of the R3 Rapid response playbook engine. R3 Playbooks are created using a Visual editor supporting granular, stateful and conditional workflows to orchestrate, automate and standardize best practices on a case by case incident response events activities like incident triage, stakeholder notification, data and context enrichment, remediation and threat containment.

Cloud SOAR has been designed with Interoperability for Cybersecurity Industry standards regulatory frameworks to be able to receive data from a wide assortment of Cybersecurity industry vendors to enrich the available data gathered and correlated to offer better forensic analytics. Just to name a few of our quickly growing list of supported vendors: Palo Alto Networks, Cisco ThreatGrid and Umbrella, IBM Qradar, Splunk, McAfee, Encase Forensics.

Cloud SOAR design and architecture follows Cybersecurity Industry standards and regulatory frameworks, and adheres to best Industry practices to meet best Cybersecurity practices followed by ISO, GDPR, OASIS, NIST, Sec Regulations, and more.

Cloud SOAR provides static egress for Cloud executions. IP addresses can be entered into the allowlist. For a list of Cloud SOAR addresses by region, contact [Support](https://support.sumologic.com/support/s/).

<img src={useBaseUrl('img/cloud-soar/image3.png')} alt="Cloud SOAR architecture diagram" style={{border: '1px solid gray'}} width="800"/>

## Automation Bridge

Cloud SOAR interacts with the platforms in your environment using a module called Automation Bridge.

Automation Bridge is a process running on a Linux-based VM (deployed inside the your environment) that interacts with your Cloud SOAR Instance and allows you to execute playbook actions on all the systems that Cloud SOAR is orchestrating in that specific environment. For more information, see [Automation Bridge](/docs/platform-services/automation-service/automation-service-bridge).
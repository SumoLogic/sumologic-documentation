---
id: introduction
title: Introduction to Cloud SOAR
sidebar_label: Introduction
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Introduction to Cloud SOAR for analysts

### What is Cloud SOAR?

#### Security Orchestration, Automation, and Response

Broadly speaking, Security Orchestration Automation and Response (SOAR) is a collection of scripts, APIs, playbooks, daemons, threat intelligence databases, dashboards, and other tools. In this introduction, we’ll be focusing on a few tools in particular:

* **Threat Intel**. A database of information gathered by external sources about various entities, such as host names, file hashes, IP addresses, and other known Indicators of Compromise. 
* **Playbooks**. A collection of automated or semi-automated workflows that use Cloud SOAR integrations, tasks, and a variety of flow control decisions such as conditional statements.
* **Dashboards**. A quick, visual depiction of key information, including alerts, graphs, and tables to help monitor systems, make decisions, and communicate with other teams.

These tools work together to automate and orchestrate many processes that are a routine part of responding to security incidents. Threat Intel leverages the collected knowledge of many organizations to help find indicators of compromise faster. Playbook automation offloads many tedious, repetitive tasks from the SOC team, reducing response time and allowing SOC analysts to focus on other mission critical tasks. Dashboards provide a central place for different teams to work together to orchestrate their response in a timely, synchronized manner. 

#### Sumo Logic's security solutions

The cybersecurity cycle is an iterative, scientific process, much like troubleshooting. In both cybersecurity and troubleshooting, you first monitor your system. Once an anomaly is detected, you can make a hypothesis about how it happened and diagnose or investigate the problem. Finally, you can take action to respond to the issue.  

<img src={useBaseUrl('img/cloud-soar/incident-response-process.png')} alt="Incident response process" style={{border: '1px solid gray'}} width="600" />

While Security Information Event Management (SIEM) tools help automate the threat hunting and investigation process, Security Orchestration Automation and Response (SOAR) tools are typically used in response to an active or potential threat. Both these tools work together as part of the security pipeline in your Security Operations Center (SOC).

All of Sumo Logic’s security solutions can help with every step of this process. However, broadly speaking, Cloud SIEM focuses on the investigation phase, and Cloud SOAR focuses on the response phase. All our solutions can be used on their own, or together. For example, you can investigate an Insight in Cloud SIEM, then use the **Actions** button inside the Insight to send the information to Cloud SOAR, where you can orchestrate the response to the incident.

In this introduction, we'll focus on learning how to use Sumo Logic's Cloud SOAR to automate many parts of incident response and streamline your SOC.

#### Automating your SOC

As the newest member of your company's SOC team, it’s your task to set up some dashboards and playbooks to help monitor the system and automate daily security tasks, as well as prepare for compliance audits. The lab activities in this course will walk you through some of this using Sumo Logic’s Cloud SOAR.

##### The Sumo Logic security pipeline

Your company's apps and services generate logs, metrics, and tracing data. 

When you ingest that data into Sumo Logic, you have one centralized location to query and visualize all that data. Sumo Logic’s Log Analytics Platform integrates with CrowdStrike’s threat intel database, so you can start getting security alerts and hunt threats. You can learn more in [Additional Security Features](/docs/security/additional-security-features/).

You can take your security one step further with Cloud SIEM. When you forward your log messages to Cloud SIEM, they are parsed, mapped, and enriched into Cloud SIEM records. These records are compared to security rules. If a rule is triggered, an entity is extracted, a severity score is assigned, and a signal is created. If enough signals with the same entity cluster together, they become an Insight. Insights are likely risks that need your attention. You can learn more about by taking the Cloud SIEM Fundamentals and Cloud SIEM Administration courses.

Finally, you can take the Insights from Cloud SIEM and automatically respond to them with Cloud SOAR. Cloud SOAR helps orchestrate and automate the incident response cycle. We’ll learn more about how it does that in this introduction.

##### Why use Cloud SOAR?

* **Faster responses**. Cloud SOAR can automate parts of your SOC, leading to faster response time
* **Close the skills gap**. Analysts of all skill levels can deploy playbooks. Veteran analysts can spend more time on threat hunting.
* **Consolidate tools**. Orchestrate all your security tools in one location with integrations and custom APIs.
* **Part of a security suite**. Cloud SOAR integrates with Sumo Logic's Log Analytics Platform and Cloud SIEM for a complete, end-to-end security solution.

#### Inside Sumo Logic Cloud SOAR

Sumo Logic’s Cloud SOAR is a cloud-based web application available as an add-on to existing Sumo Logic deployments. Some of Cloud SOAR’s key features include:

* **War Room**. A central location for all the information, analysis, and actions related to an incident. This includes notes, documentation, and knowledge transfer as well as tools for collecting data and assessing, investigating, and correlating different incidents.
* **ARK**. The Automated Responder Knowledge (ARK) learns from past incidents and threat intel recommend relevant playbooks for future incidents.
* **App Central**. A large out-of-the-box library of playbooks, integrations, and use cases for different threats to get you started. 
* **Cybersecurity best practices**. Cloud SOAR’s design and architecture meets many cybersecurity industry standards, regulatory frameworks, and best practices from organizations like ISO, GDPR, OASIS, NIST, and many others.

Below is the SecOps and Dashboard page.  

<img src={useBaseUrl('img/cloud-soar/cloud-soar-example-ui.png')} alt="SecOps and Dashboard page" style={{border: '1px solid gray'}} width="800" />

* A. **Navigation**. Use the side nav menu to access various Cloud SOAR views for incidents and entities.
* B. **Username**. Your username is shown here.
* C. **Dashboard**. The Dashboard page has an overview of current incidents as well as statistics for recent incidents.
* D. **Work area**. If you have any tasks to do or alerts you're monitoring, you'll see them here.
* E. **Support**. The Support page has downloadable PDF instruction manuals, API documentation, and contact information if you need help.
* F. **Configuration and administration**. Configuration and Administration menu options can be found here.
* G. **Profile**. The Profile page will show what permissions you and other users in your org have. You can also change settings like your timezone here.

Nearly everything in Cloud SOAR is fully customizable, from reports to dashboards to playbooks. You can even create custom playbooks using the drag-and-drop WYSIWYG.

<img src={useBaseUrl('img/cloud-soar/example-playbook.png')} alt="Cloud SOAR example playbook" style={{border: '1px solid gray'}} width="800" />

Playbooks are central to SOAR automation. Inside playbooks, you can add nodes with actions, tasks, conditions, user choices, or even embed other playbooks. Each action can either be executed automatically based on a condition, or manually by a user or group you authorize. Cloud SOAR’s playbook creation tool helps you visualize the workflow of each of these actions and conditions.

#### Explore the Sumo Logic Cloud SOAR UI

In this section, you’ll get to know the different parts of the Cloud SOAR UI. 

1. Navigate to the SecOps page.<br/>[**Classic UI**](/docs/cloud-soar/overview#classic-ui). In the main Sumo Logic menu select **Cloud SOAR**.<br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu select **Cloud SOAR > SecOps & Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **SecOps & Dashboard**.<br/><img src={useBaseUrl('img/cloud-soar/secops-page.png')} alt="SecOps page" style={{border: '1px solid gray'}} width="700" /><br/>If you have any tasks or alerts assigned to you, you’ll see them here in the **My Operations** panel. 
1. Near the top left corner, above your user name, click **Dashboard**.<br/><img src={useBaseUrl('img/cloud-soar/dashboards-page.png')} alt="Dashboards page" style={{border: '1px solid gray'}} width="700" /><br/>This will take you to your main dashboard page for your organization. Here you’ll see an overview of current incidents as well as statistics for recent incidents. We’ll learn how to customize this area in a later section.
1. Navigate to the Incidents page. <br/>[**Classic UI**](/docs/cloud-soar/overview#classic-ui). In the main Sumo Logic menu select **Cloud SOAR**, and then select **Incidents** at the top of the SecOps screen.<br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu select **Cloud SOAR > Incidents**. You can also click the **Go To...** menu at the top of the screen and select **Incidents**.<br/><img src={useBaseUrl('img/cloud-soar/incidents-page.png')} alt="Incidents page" style={{border: '1px solid gray'}} width="800" /><br/>Here you’ll see a list of all incidents for your organization. You can filter by various categories and search terms. For example, if you click **Bookmarks** and then select **Mine** you’ll only see incidents that have been assigned to you. 
1. Navigate to the Entities page.<br/>[**Classic UI**](/docs/cloud-soar/overview#classic-ui). In the main Sumo Logic menu select **Cloud SOAR**, and then click the **Entities** button at the top of the screen.<br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu select **Cloud SOAR > Entities**.<br/><img src={useBaseUrl('img/cloud-soar/entities-page.png')} alt="Entities page" style={{border: '1px solid gray'}} width="800" /><br/>Here you will see a list of all entities, such as IP addresses, host names, and other potential indicators of compromise. Entities are unique identifiers that can help you figure out who the potential threat actors are. Like the Incidents page, you can use filters and queries to sort through the Entities in Cloud SOAR.
1. Visit the Support page.<br/>[**Classic UI**](/docs/cloud-soar/overview#classic-ui). Click **Help** (question mark icon) in the upper right.<br/>[**New UI**](/docs/cloud-soar/overview#new-ui). Click **Help** (question mark icon) in the upper right.<br/>Here you’ll find links to documentation, information about APIs and integrations, and contact information if you need to reach out to the Sumo Logic support team. 
1. View your profile.<br/>[**Classic UI**](/docs/cloud-soar/overview#classic-ui). Click **Profile** (person icon) in the upper right corner.<br/>[**New UI**](/docs/cloud-soar/overview#new-ui). Click **Profile** (person icon) in the upper right corner.<br/>Here you’ll see details about your user profile, including the roles you’ve been assigned. 

### Case management

#### Cloud SOAR case management

Case management is like project management, but the project you’re working on is a cybersecurity threat. Case management helps set priorities, assign tasks, and communicate information across different teams.

Cloud SOAR has some tools to help you with case management.

* **SecOps**. Contains all the tasks assigned to you and the groups you’re in. You can approve, decline, or close tasks here. Each task may be related to one or more incidents.
* **Dashboards**. Contains summary statistics for current and past incidents. You can view trends over time and get a high-level overview of what needs to be done.
* **Incidents**. Contains all current and past incidents, along with filters. You can open, close, and assign investigators and owners to incidents. Clicking an Incident will take you to that Incident’s War Room. This is a good place to start a threat investigation.
* **Triage**. Contains events which may be unverified or have a low confidence score. These are potential incidents and a good place to hunt for threats.
* **Entities**. Contains information about IP addresses, user names, hostnames, and other entities that have been involved in any incident in Cloud SOAR. This is another good place to hunt for threats or conduct a threat investigation

When you log in to Cloud SOAR, you can use these main pages to get a sense of what’s going on in your environment and what needs to be done. 

When you log into Cloud SOAR, you can immediately identify the most recent Tasks and Actions waiting for approval by analysts. We can move inside the Incidents and Entities pages to have a complete overview of our system for further investigation. Analysts can also check Playbooks and the results of actions.

Since Cloud SOAR integrates with hundreds of technologies, you can also interact with multiple ticketing and case management systems. The API-based communication between technologies is bidirectional, meaning Cloud SOAR can both receive and send information, at any time.

#### Threat Investigation with Cloud SOAR

One major component of case management is threat investigation.

Threat investigation is an iterative, scientific process, much like troubleshooting. In both threat investigation and troubleshooting, you first monitor your system with dashboards and alerts. Once an anomaly is detected, you can make a hypothesis about how it happened and investigate the problem. As you dig deeper, you may revise this initial hypothesis and find more clues about why or how the attack or error happened. As you investigate and trace the events, try to answer as many wh- questions as you can about the event to tell the story:
* Who is behind the event?
* What assets did the event affect?
* Where did the event occur?
* When did the event occur?
* Why did the event occur?
* How did the event occur? 

Finally, you can then take action to resolve the issue. There are many actions you might take in response to an incident. For example, you might work with your IT team to isolate and wipe laptops infected with malware to prevent spread of malicious code. Or, you might work with your HR team to enforce mandatory anti-phishing training among all employees to prevent future attacks.

Before you can respond to an incident, you must investigate it to determine who the attacker is, what kind of threat it is, where the threat is coming from, and how or why the attack was made.

Remember, threat investigation is reactive while threat hunting is proactive. Typically, threat investigation happens in reaction to an alert. Once you’ve investigated a threat, you can proactively hunt for similar threats and take precautionary steps to prevent attacks from happening again. 

You can do both threat investigation and threat hunting using Cloud SOAR. You may have gotten an alert from Sumo Logic, Cloud SIEM, or directly from Cloud SOAR. Armed with this information, you can log in to Cloud SOAR. You can click the Incidents page to learn more about what happened, or click the Entities page to learn more about who the potential threat actors are. 

Only after you’ve gathered enough information about the incident can you decide how to respond to the incident.

#### Exploring an Incident with Cloud SOAR

Every Incident in Cloud SOAR follows an Incident Template. These templates define attributes such as the incident type, severity, who is assigned to the incident, and other parameters. You can learn more about creating Incident Templates in Cloud SOAR Administration.

When you click an incident in Cloud SOAR, you’ll be taken to the Incident Overview page.

Here you’ll find basic information such as the severity level, category, opening time, and status. You can also customize your incidents and enrich them with new information by going into Edit mode.

 

Once in Edit mode, you can add various Widgets from the right navigation pane. These widgets can help you check who owns the incident, add new owners, view the history of the incident, and many other tasks.

In addition to the Overview page, every incident also has an Operations, Entities, and Documentation page.

 

The Operations page is where you’ll find the War Room for an Incident, as well as access playbooks, tasks, and notes related to the Incident. While you’re investigating and responding to an Incident, you’ll likely spend most of your time in the War Room. Cloud SOAR Playbooks will be displayed in the Playbook sub-section of the Operations tab. From this tab, you can run, kill, edit and check the results of a playbook. Finally, the Tasks and Notes tabs contain notes and to-do lists that are either automatically generated by playbooks or manually created by SOC analysts. 

 

The Entities page contains in-depth information about entities related to the Incident. The Documentation page contains any attachments you’ve added and any reports you’ve generated about the Incident.

### Incident response

### Dashboards and reports

## Introduction to Cloud SOAR for administrators


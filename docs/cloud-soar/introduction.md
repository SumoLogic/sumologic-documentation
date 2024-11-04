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

As the newest member of your company's SOC team, it’s your task to set up some dashboards and playbooks to help monitor the system and automate daily security tasks, as well as prepare for compliance audits. The activities in this section will walk you through some of this using Sumo Logic’s Cloud SOAR.

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

<img src={useBaseUrl('img/cloud-soar/incident-example.png')} alt="Incident example" style={{border: '1px solid gray'}} width="800" />

Once in Edit mode, you can add various Widgets from the right navigation pane. These widgets can help you check who owns the incident, add new owners, view the history of the incident, and many other tasks.

In addition to the Overview page, every incident also has an Operations, Entities, and Documentation page.

<img src={useBaseUrl('img/cloud-soar/war-room-example.png')} alt="Operations tab example" style={{border: '1px solid gray'}} width="800" />

The Operations page is where you’ll find the War Room for an Incident, as well as access playbooks, tasks, and notes related to the Incident. While you’re investigating and responding to an Incident, you’ll likely spend most of your time in the War Room. Cloud SOAR Playbooks will be displayed in the Playbook sub-section of the Operations tab. From this tab, you can run, kill, edit and check the results of a playbook. Finally, the Tasks and Notes tabs contain notes and to-do lists that are either automatically generated by playbooks or manually created by SOC analysts. 

<img src={useBaseUrl('img/cloud-soar/entities-tab-example.png')} alt="Entities tab example" style={{border: '1px solid gray'}} width="800" />

The Entities page contains in-depth information about entities related to the Incident. The Documentation page contains any attachments you’ve added and any reports you’ve generated about the Incident.

#### Investigate an Incident

In this section, you’ll investigate an alert, gather information, and decide what to do in response to it.

1. Navigate to the Incidents page.<br/>[**Classic UI**](/docs/cloud-soar/overview#classic-ui). In the main Sumo Logic menu select **Cloud SOAR**, and then select **Incidents** at the top of the SecOps screen.<br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu select **Cloud SOAR > Incidents**. You can also click the **Go To...** menu at the top of the screen and select **Incidents**.
2. Click the column configuration icon in the upper right.<br/><img src={useBaseUrl('img/cloud-soar/column-configuration-icon.png')} alt="Column configuration icon" style={{border: '1px solid gray'}} width="100" />
1. Make sure **Short Description** is under the **Active** column. If it isn’t, click the **+** next to **Short Description** in the **Available** column. Do the same with the **Type** and **Category** fields. Then click **Apply**. You’ll now see a short description based on the [MITRE ATT&CK framework](https://attack.mitre.org/matrices/enterprise/) of each incident.
1. Click any incident with a status of **Open**.
1. As you click on the Incident, you'll see a popup asking if you want to make yourself the "investigator" for this incident. Select the role to assign yourself (for example, **Analyst**), then click **Yes** to add yourself as an investigator.<br/><img src={useBaseUrl('img/cloud-soar/add-investigator-example.png')} alt="Add investigator example" style={{border: '1px solid gray'}} width="400" />
1. Click the **Overview** tab. Here you’ll see basic information about the incident, like the entities involved in the incident and the time the incident was opened. If the incident was imported from Sumo Logic Cloud SIEM, it contains the Cloud SIEM incident ID as well as a short description based on the MITRE ATT&CK framework.
1. On the right side of the **Overview** tab you can open up a sidebar with various widgets showing the list of investigators, ownership history, relationships, incident status history, and/or incident description.<br/><img src={useBaseUrl('img/cloud-soar/sidebar-example.png')} alt="Sidebar example" style={{border: '1px solid gray'}} width="400" />
1. Click the **Operations** tab, and click the **War Room** tab underneath it.<br/><img src={useBaseUrl('img/cloud-soar/war-room-example-2.png')} alt="War Room example" style={{border: '1px solid gray'}} width="800" /><br/>The War Room contains a history of the incident, including any tasks and investigators that have been assigned, playbooks that have been executed, entities that are being tracked, and any other notes or attachments.   
1. Under the **Operations** tab, click **Notes**.
    1. Click the **+** to add a new note.
    1. Give your note a title.
    1. Add a date of creation using the date picker. You can choose today’s date.
    1. Type a few sentences in the **Description** field. You can use the summary of the events above, or you can rewrite it in your own words. You can also make suggestions about your next steps.
    1. Click **Create** to save your note.

### Incident response

#### What is incident response?

There are six steps to cybersecurity incident response cycle:

1. **Preparation**. Prepare your environment with firewalls, multi-factor authentication, compliant software, and other security measures to prevent attacks.
1. **Identification**. Monitor your systems for indicators of compromise and get alerted when a potential threat happens. Investigate the potential threat and triage it.
1. **Containment**. Reduce further damage by isolating files, machines, and users or by blocking IoCs related to the incident.
1. **Eradication**. Delete malware, phishing emails, or anything else related to the incident. 
1. **Recovery**. Use backup files, reinstall software, and get your environment up and running as it was before the incident.
1. **Lessons Learned**. Discuss what worked and what went wrong. Use these findings to prepare better, then start at step 1 again. 
 

For example, let’s say one of the employee’s at your company accidentally downloaded some malware onto their laptop, despite your preparation by installing VPNs on all employee machines. Once you have identified the malware, you may want to quarantine the infected laptop but putting it behind a firewall to contain it. You might also want to scan all the laptops in your company for that same malware, and block the IP address that’s the source of the malware download to eradicate the threat. Finally, you’ll need to provision a new laptop for the employee and recover their files. Then, you may need to assign them some cybersecurity training as part of lessons learned.

#### How can playbooks help with incident response?
 
The main way to respond to an incident in Cloud SOAR is by executing a playbook. Playbooks are automated, or partially automated, workflows that act based on information from an incident. You typically execute a playbook after you have identified a threat. The playbook will then automatically orchestrate many parts of the investigation, containment, eradication, and recovery processes.

For example, let’s say you identified potential malware on an employee’s computer. First you must investigate to verify that the threat isn’t a false positive, for example by checking the data against an external threat intelligence database. Once the threat is verified, notifications have to be sent to relevant teams through Slack. You then need to contain the threat by quarantining the infected machine with a Palo Alto firewall to block the IP address source of the attack. Containment might also include resetting passwords via an SSO service like Okta. Finally, you can open a Jira ticket to assign the IT department to provision a new laptop to infected users to recover and restore. And finally, you need to open another Jira ticket for the HR department to assign cybersecurity training to the infected employees, as part of lessons learned. 

Many of these tasks can be automated through APIs and other integrations. All of these steps can be bundled together in a playbook. We could create a playbook called “Malware Detected” in Cloud SOAR. Then, instead of remembering to do each of these tasks individually, we can simply click “Run” on the playbook, and all the tasks will be done automatically. 

Here are some other workflows you could automate with a playbook:
* **Phishing**. An employee reports suspicious email. A playbook uses threat intel to decide if it’s a phishing attempt. It confirms the employee didn’t click any links, then blocks the malicious email address.
* **Brute force**. A user gets request for multi-factor authentication access. When they confirms they weren’t trying to log into their account, a playbook automatically investigates the source of the login attempt and resets the user's password.
* **Data exfiltration**. If network activity spikes, a playbook automatically investigates to determine whether data is being exfiltrated legitimately. It can prevent the flow of data by applying endpoint patches and increasing firewall security, and chang

Cloud SOAR has hundreds of prebuilt playbooks and templates, so you can quickly and easily automate any of these tasks, or create new custom playbooks to suit your specific business needs. Normally, playbooks are automatically attached to incidents based on information like entities and severity scores. 

##### ARK suggestions

Playbooks automate the individual tasks of incident response. But Cloud SOAR's Automated Responder Knowledge (ARK) suggestions take things one step further. ARK uses machine learning to suggest the most appropriate playbook for your Incidents based on what you've done on similar Incidents in the past. This frees up even more resources for analysts, as they don't have to spend time choosing a playbook before responding.

When ARK suggests a playbook to you, you have the option to add the playbook to the Incident, run it, or dismiss the suggestion. 

#### App Central, custom integrations, and other automations

Cloud SOAR has hundreds of pre-built playbooks which you can use as-is or customize. You can also build your own custom playbooks, which you can learn about in the Cloud SIEM Administration class. 

Both pre-built and custom playbooks are simply combinations of various integrations and automations. These integrations can also be used stand-alone rather than as part of a playbook. Typically, an integration in Cloud SOAR contains one or more of these actions:
* **Enrichment**. Adds information, metadata, or context, such as from a threat intelligence database.
* **Containment**. Reduces further damage by isolating files or machines related to a threat.
* **Daemon**. A background process that can ingest data. 
* **Notification**. An alert sent via email, Slack, PagerDuty, or most other services you can connect with an API.
* **Custom**. Scripts and any other automations you can create using Perl, Python, PowerShell or Bash.

Actions are the building blocks of integrations. You can find many pre-built playbooks, integrations, and automations in Cloud SOAR’s [App Central](/docs/platform-services/automation-service/app-central/). From App Central, analysts can easily install and deploy a wide variety of automations that leverage these actions.

The Sumo Logic Cloud SOAR team is constantly adding new integrations, playbooks, and use cases to App Central. These playbooks in App Central are only a starting point, however. You can build off of them and create custom playbooks of your own as well.

App Central may not be available to all users. Ask your Cloud SOAR admin if you need access to App Central.

When you open a playbook, you'll see a flowchart like the one below. 

<img src={useBaseUrl('img/cloud-soar/playbook-node-examples.png')} alt="Playbook node examples" style={{border: '1px solid gray'}} width="700" />

* A. **Condition**. Playbooks can use conditions to fork into different paths. In this example, if the threat intelligence enrichments confirm the threat, the fork goes up and the severity is changed to "High". If the enrichments find the threat is a false positive, the fork goes down and the severity is changed to "Low".
* B. **Enrichment**. Green nodes enrich data. For example, this node uses VirusTotal to check whether an email contains a virus.
* C. **Branching**. All playbooks have branching paths. Use these arrows to connect different nodes to create your playbook.
* D. **Custom**. Purple nodes use custom APIs. In this example, the Cloud SIEM severity is changed to "Low".
* E. **Notification**. Blue nodes are notifications. They can send alerts or add notes in Cloud SOAR.

You can modify an existing playbook or build one from scratch by dragging and dropping each node in Edit mode. Each node is an integration: enrichment, containment, daemon, notification, or custom API.

#### Recovery and lessons learned

Cloud SOAR playbooks orchestrate and automate many pieces of the incident response process. But, once you click “Run”, your job as a SOC analyst isn’t done. It’s important to take time to reflect on the incident and prepare for the next one. 

A playbook can find that a threat was a false positive. However, it may have assigned an additional “Review Activity” task to the SOC analyst if a known threat was detected based on threat intelligence databases. This is your opportunity to do the tasks that humans do best. In the case of a phishing attempt, you might want to take the time to talk to the employees who clicked on the malicious links and teach them how to recognize phishing. Depending on the circumstances of the incident, you might need to deploy additional playbooks that can reset passwords or re-provision machines.

### Dashboards and reports

In the previous sections, you identified and investigated an incident, executed a playbook, then analyzed the lessons learned before closing the incident. 

Now, it’s time to start the incident response cycle over again with preparation and identification. Dashboards and reports help you visualize your environment’s status, prepare for potential threats, identify ongoing incidents, execute threat hunting and threat investigation, reflect on your lessons learned, and report back information to your teams

In order to prepare for the next potential threat, you’ll need to set up alerts and dashboards to monitor your environment. Cloud SOAR offers a number of widgets you can add to your dashboards. Each widget is a graph, chart, table, or other visual representation of your system. Widgets are customizable in their placement, size, and color, and you can create different dashboards for different use cases. For example, you might have one dashboard that shows quarterly, high-level metrics and another that shows daily alerts and triage.

#### Customize a dashboard

In this section, you’ll create and customize a dashboard using widgets.

1. Navigate to the Cloud SOAR SecOps page.<br/>[**Classic UI**](/docs/cloud-soar/overview#classic-ui). In the main Sumo Logic menu select **Cloud SOAR**.<br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu select **Cloud SOAR > SecOps & Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **SecOps & Dashboard**. 
1. Near the top left corner, above your user name, click **Dashboard**.
1. Click the **+** icon in the upper right to create a new dashboard.  
1. Click on the default dashboard name (**Dashboard #**) and change the name to include your initials or chosen ID number.  Add a description if desired by clicking on the "No description available" field and adding some text.
1. Click the **Edit** control in the top right corner to enter edit mode.
1. Click on one or more widgets from the edit sidebar to add the widget to your dashboard. Note that you can drag and place the dashboard widget in different places and arrangements on the dashboard screen.
1. Click **New** in the edit sidebar to create a new widget.
1. Enter a widget name "Incidents By Type XXX" using your initials or chosen ID number in place of the XXX.
1. Under Group By, select **Type**.
1. In the left sidebar, choose the bar graph icon (second from the top).
1. Click **Save** in the lower right corner.
1. Back on the edit sidebar, click on your new widget to add it to your dashboard.  You can rearrange the rows and columns by dragging widgets to different locations.
1. Click **Edit** in the upper right to turn off edit mode. 

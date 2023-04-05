---
id: automation-service
title: Automation Service (Beta)
sidebar_label: Automation Service
description: Use the Automation Service to automate smart actions including enrichments and notifications. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This topic describes the capabilities of the CSE Automation Service and includes instructions for its use.

## About the CSE Automation Service

The CSE Automation Service uses Sumo Logic Cloud SOAR capabilities to allow you to define and automate smart actions including enrichments and notifications. These actions can be automatically triggered when certain events occur in CSE, helping you to quickly investigate, understand, and react to potential security threats.

You can interact with the service through Automations, which execute Playbooks. Playbooks are composed of one or more Actions with a workflow that could include parallel actions and logic steps. Actions are included with Integrations. Sumo Logic provides a number of integrations, actions, and playbooks with the service that can be customized; you can create their own custom integrations, actions and playbooks as well. More details about each are in the specific sections below.

The CSE Automation Service supports Enrichment, Notification and Custom Actions. 
* Enrichment Actions can be used to gather additional information about an Entity or Insight, including Threat Indicators.
* Notification Actions can be used to send notifications or update status in systems like CSE, CIP, Slack, Microsoft Teams, Jira, email, and so on.

Automations can be triggered automatically when an Insight is created and/or closed. Automations can also be executed manually via the CSE UI and API.

Playbooks can contain both Enrichment and Notification Actions. Playbooks can also be nested. So, for example, you could define a playbook that is executed automatically when an Insight is created that:
* Gathers enrichment data

And if the data returned includes a malicious threat indicator:
* Changes the Insight state to “In Progress”
* Assigns the Insight
* Sends a (customized) email with information about the Insight and indicator
* Creates a Slack channel for the Insight
* Invites certain people to the Slack channel

:::note
The CSE Automation Service is intended to replace the legacy Insight Actions and the Enrichment Service. All of the actions and integrations provided with those capabilities are included in the CSE Automation Service (though some may require “on premise” deployment through the Bridge). Those capabilities will be deprecated later in 2023.
:::

:::note
The CSE Automation Service is enabled to allow customers to execute up to 10,000 actions per day. 
:::

## Permissions for the CSE Automation Service

Access to the CSE Automation Service is controlled by permissions (capabilities) in the Sumo Platform:
* Cloud SIEM Enterprise > Configuration > View Automations
* Cloud SIEM Enterprise > Configuration > Manage Automations 
* Cloud SIEM Enterprise > Configuration > Execute Automations
* Cloud SOAR > View Cloud SOAR
* Cloud SOAR > Automation Playbooks > Access
* Cloud SOAR > Automation Playbooks > Configure

Note that in order to interact with most of the features described on this page, you must have at least View Automations, View Cloud SOAR, and Access Playbooks permissions.

## Accessing the CSE Automation Service

The Automation page can be accessed in the **Configuration** menu under **Integrations**:

<img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="170"/>

From here, you can manage Automations and access the CSE Automation Service UI to manage Playbooks, Actions, and Integrations. To access the CSE Automation Service UI, click **Manage Playbooks**:

<img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="450"/>

You will see the Playbooks list in the CSE Automation Service UI:

<img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" width="600"/>

To learn more about managing Playbooks, Actions, and Integrations, read [Cloud SOAR Automation](/docs/cloud-soar/automation/). In addition, some documentation (including the documentation for building custom Integrations and using the Bridge) is included in the UI. It can be accessed by clicking the Help icon in the upper-right corner of the screen.

:::note Beta
Some notes about Playbooks, Integrations and Actions in the Beta that may differ from the current Cloud SOAR documentation:
* Playbooks type must be **CSE**.
* The CSE Automation Service only supports automated Enrichment, Notification, and Custom Action types at this time. 
* Actions can run "on premise" via a Bridge or can run directly through the Cloud. For security and performance reasons, only Certified Integrations/Actions can run directly through the Cloud; custom Actions must run "on premise".
* Cloud SOAR App Central, where you can browse the full Integration and Playbook catalog, is not yet connected to the CSE Automation Service. A selection of popular Integrations have been added to your environment automatically, but the full list of available Integrations is included in [Available Integrations](#available-integrations) below. Contact your Sumo Logic account representative if you would like to have one of these Integrations added to your environment, if you would like documentation for a specific Integration, or if you're interested in an Integration that's not listed.
:::

## Configuring an Automation

To create a new Automation:
1. Click the gear icon at the top of the CSE UI and choose **Automation** under **Integrations**. 
1. Click **New Automation**.  (To modify an existing Automation, click on the edit icon for the corresponding Automation.)
<br/><img src={useBaseUrl('img/cse/automations-new.png')} alt="New Automation" width="560"/>
1. Select a **Playbook** from the drop-down list. The Playbook must be defined and its type must be set to **CSE** before associating it with an Automation.
1. Select whether the Playbook will run on an **Entity** or **Insight**. This defines what data payload will be sent to the Playbook from CSE. (It does not impact the trigger selection.) If **Entity** is selected, select one or more Entity Types. The Playbook will only execute on the Entity Types selected. 
1. Select one or more **Execute when** Insight triggers: **Insight Created**, **Insight Closed**, or **Manually Done**. If **Manually Done** is not selected, the Automation will not appear in any Actions/Automations menus.
1. Set the **Status**. Disabled Automations will not run automatically and will not appear in any Actions/Automations menus.
1. Click **Add to List** (or **Update** if editing an existing Automation).

## Running Automations
Automations will run automatically when an Insight is created or closed provided that:
* The Automation is enabled, 
* The Automation is configured to run on the trigger(s), and 
* The Automation is an Insight Automation, or
The Automation is an Entity Automation and the Insight contains one or more Entities of the Entity Type(s) configured in the Automation (this includes the primary and any related Entities).

Automations can be run manually from the **Actions** drop-down on [Insight details](/docs/cse/records-signals-entities-insights/about-cse-insight-ui#insight-details-page) pages. (On [Entity details](/docs/cse/records-signals-entities-insights/view-manage-entities#about-the-entities-details-page) pages, Entity Automations can also be run manually from the **Automations** drop-down).

<img src={useBaseUrl('img/cse/automations-actions-menu.png')} alt="Automations on the Actions menu" width="230"/>

You will see three sections in the Action menu:
* **Insight Automation**. Displays a list of all enabled Insight Automations configured to run manually.
* **Entity Automation**. Displays a **Run Automations** option. Click **Run Automations** to open a dialog enabling you to select one or more Entity Automations to run (see below).
* **Insight Actions**.  Displays a list of all valid legacy Insight Actions.

:::tip
You can run the same Automation more than once for a given Entity or Insight, but not at the same time. Additional attempts to run an Automation while an instance is running will result in an error.
:::

If you select **Entity Automation > Run Automations** you will be prompted to select one or more of the Entities included in the Insight:

<img src={useBaseUrl('img/cse/automations-entity-menu.png')} alt="Entity Automation menu" width="600"/>

1. Select one or more of the Entities listed or select **Select All Entities**. The selected Entities don’t have to be the same type. 
1. Click **Next**. A list displays of all Entity Automations that are enabled, configured to be run manually, and configured for at least one of the Entity Types you selected on the previous screen. 
1. Select the Automations you wish to run and click **Run Automation**. The Automations will run. The system will automatically run the appropriate Automations for the appropriate Entity Types.
<img src={useBaseUrl('img/cse/automations-entity-menu-2.png')} alt="Entity Automation menu with selections" width="600"/>
  
In this example:
* The CarbonBlack Automation is configured for IP Addresses, Email Addresses, and Domain Names, so it will run four times (once for the Email Address and once for each IP Address selected on the previous screen).
* The nslookup Automation is configured to only run on IP Addresses so it will run three times.
* No Automation will run on the Hostname.

## Viewing the Status of Automations

After running an Automation, you can go to the Automations tab to view its status.  

<img src={useBaseUrl('img/cse/automations-execution-status.png')} alt="Automations execution status" width="600"/>

The list of Automations is organized by Insight and Entity, and each section can be collapsed and expanded. On each card you will find:
* The time and date when the Automation was run.
* The name and description of the associated Playbook.
* The Playbook’s current status.
* A link to **View Playbook** in the CSE Automation Service UI.

:::note
During the Beta, you may have to manually refresh this screen to see the most current Status.
:::

If you click **View Playbook**, the CSE Automation Service UI will open to the Playbook Status page:

<img src={useBaseUrl('img/cse/automations-playbook-status.png')} alt="Playbook status" width="600"/>

You can switch to the graphical view by clicking **Graph** in the upper-right corner:

<img src={useBaseUrl('img/cse/automations-playbook-status-graph.png')} alt="Playbook status graph" width="600"/>

For more information about the Playbook Status page and understanding how to interact with the Playbook graph, see [Cloud SOAR Automation](/docs/cloud-soar/automation/).

## Enrichment and Threat Indicators

You can view the results of enrichments in CSE by navigating to the newly-redesigned **Enrichments** tab (which will appear on the Entity, Signal and Insight details pages if there are any enrichments to display):

<img src={useBaseUrl('img/cse/enrichments.png')} alt="Enrichments" width="600"/>

The enhancements include:
* Enrichments are now grouped by Entity, not by enrichment source.
* Groups can be collapsed and expanded.
* The list can be filtered.
* Empty fields (fields with a null or empty value) can be optionally hidden.
* Links, if set by the enrichment, will be displayed and open in a new tab if clicked.
* Threat indicators, if set by the enrichment, will be displayed.

Threat indicators, if set, will be displayed throughout the CSE UI either as a full label or as a colored icon depending on the location:

| Label | Description | Icon |
|:--|:--|:--|
| **Malicious** | ![indicator-malicious-label.png](/img/cse/indicator-malicious-label.png) | ![indicator-malicious-icon.png](/img/cse/indicator-malicious-icon.png) |
| **Suspicious** | ![indicator-suspicious-label.png](/img/cse/indicator-suspicious-label.png) | ![indicator-suspicious-icon.png](/img/cse/indicator-suspicious-icon.png) |
| **Not Flagged** | ![indicator-suspicious-label.png](/img/cse/indicator-notflagged-label.png) | None |

No icon is displayed for Entities that are Not Flagged.

:::note
**Not Flagged** is not the default value (which is no indicator at all). CSE will not automatically determine the indicator value; enrichments must explicitly set it (see Enrichment Attributes).
:::

### New Enrichment Attributes

Support for three new optional attributes have been added to the enrichment schema:
* `expiresAt`. Defines when the enrichment should be auto-deleted from CSE (by default, enrichments will never be auto-deleted).
* `externalUrl`. Defines a link that will be displayed with an enrichment (for example, to include a link to the VirusTotal details page for this Entity, put the link in this field).
* `reputation`. Associates a threat indicator with this enrichment data. The allowable values are `malicious`, `suspicious`, and `notflagged`. The default is not to display any reputation.

## API and Terraform Support

The [CSE API](/docs/cse/administration/cse-apis/) has been updated to support Automations. The new endpoints include:
* `GET /automations`. Get the list of Automations
* `POST /automations`. Create an Automation
* `POST /automations/execute`. Run one or more Automations against one or more Entities/Insights
* `DELETE /automations/{id}`. Delete an Automation
* `GET /automations/{id}`. Get a specific Automation
* `PUT /automations/{id}`. Update a specific Automation

The Sumo Logic Terraform provider has also been updated. For more information, see the [Sumo Logic Terraform documentation](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs).

The CSE Automation Service API is documented in the [Cloud SOAR documentation](/docs/cloud-soar/).

## Available Integrations

The following Integrations are available for the Automation Service, but only some are automatically installed in customer environments. If you would like an Integration listed below added to your environment, or would like documentation for a specific Integration, contact your Sumo Logic account representative.

* Abnormal Security
* Abuse.ch SSLBL Feed
* AbuseIPDB
* Acronis
* Active Directory OIF
* Active Directory V2
* Airtable
* Akenza
* AlienVault OTX OIF
* AlienVault USM Anywhere
* AlienVault USM Central
* Alleantia
* alphaMountain
* Anomali ThreatStream
* ANY.RUN
* APIVoid
* Arbor
* Arcann
* Arcsight ESM
* Arcsight Logger
* ARK
* Atlassian Jira
* Atlassian Jira V2
* Automox
* AWS Athena
* AWS CloudFront
* AWS CloudTrail
* AWS CloudWatchLogs
* AWS EC2
* AWS GuardDuty
* AWS IAM
* AWS Inspector
* AWS Route53
* AWS S3
* AWS Security Hub
* AWS Simple Notification Service
* AWS SQS
* Azure AD
* Bitdefender GravityZone
* BitSight Security Performance Management
* Blueliv
* Blueliv Community
* Box
* CA Service Desk
* Censys
* Censys 2.0
* Certego
* Check Point OIF
* Check-Host
* Cherwell
* Chronicle
* CIRCL CVE Search
* Cisco AMP for Endpoints
* Cisco ASA
* Cisco Cyber Vision
* Cisco ESA
* Cisco Firepower
* Cisco IOS XE
* Cisco ISE
* Cisco Meraki
* Cisco Stealthwatch
* Cisco Talos
* Cisco Threat Grid OIF
* Cisco Threat Response
* Cisco Umbrella Investigate OIF
* Cisco Umbrella OIF
* Cisco Webex
* Claroty
* Cloudflare
* Cofense
* ConnectWise Manage
* Coralogix - Query Logs
* Coralogix - Send Logs
* Corelight
* Cortex XDR
* Cribl
* CrowdStrike Falcon
* CrowdStrike Falcon Discover
* CrowdStrike Falcon Sandbox
* CrowdStrike Falcon Intelligence
* Cuckoo OIF
* CyberArk AAM
* CyberArk PAM
* Cybereason
* Cybersecurity Help
* CyberTriage
* CylanceProtect
* DarkOwl
* Darktrace
* Devo
* Digital Shadows
* Domain Dossier
* DomainTools
* Downdetector
* Dropbox
* Duo
* Dynatrace
* EclecticIQ
* Elastic Security
* Elasticsearch
* Elasticsearch V2
* EnergyLogserver
* Ermes
* Exana Open DNS
* Exploit Database
* F5 AS3
* F5 AWAF
* Farsight Security DNSDB
* Fastah IP Geolocation
* Fidelis Elevate Network
* FireEye AX
* FireEye Central Management (CM)
* FireEye Email Security (EX)
* FireEye Endpoint Security (HX)
* FireEye Helix
* FireEye Network Security (NX)
* FireEye Threat Intelligence (iSight)
* FireHydrant
* Firewall Tools
* Flowmon
* Forcepoint NGFW
* Forcepoint Web Security
* Forescout eyeSight
* FortiAnalyzer
* FortiGate
* FortiMail
* FortiProxy
* FortiSandbox
* FortiSIEM
* FortiWeb
* FortiWeb V2
* FreshDesk
* Freshservice
* GITLAB
* Gmail
* Gmail Multiple Mailbox
* GoAnywhere
* Google Chat
* Google Safe Browsing
* GreyNoise
* Hacker Target OIF
* Hatching Triage
* Have I been pwned
* HCL BigFix
* HP Universal CMDB
* HTTP Tools
* HudsonRock Cavalier
* Hybrid Analysis
* IBM DB2
* IBM Maximo
* IBM MSS Tickets
* IBM QRadar OIF
* IBM X-Force Exchange OIF
* Imperva Incapsula
* Imperva SecureSphere
* Imperva WAF
* Intel 471
* Intelligence X
* Intezer
* Intsights TIP
* IP Quality Score
* IP-API
* IPinfo
* Ipstack
* Jamf
* Jamf Protect
* Javelin AD Protect
* Joe Sandbox
* Kali Linux
* Kaspersky CyberTrace
* Kaspersky Sandbox
* Kaspersky TIP
* Kela Darkbeast
* Kela RaDark
* KnowBe4 KMSAT - Reporting
* KnowBe4 KMSAT - User Events
* Lacework
* Lansweeper
* Lastline Analyst
* Libraesva Email Security V4
* Libraesva Email Security V5
* LogPoint OIF
* LogRhythm
* Malware Bazaar
* Malwarebytes Nebula
* Manage Engine Desktop Central
* Material Security
* Mattermost
* MaxMind OIF
* McAfee ATD OIF
* McAfee ePO OIF
* McAfee ESM
* McAfee MVISION
* McAfee Network Security Platform Manager (NSM)
* McAfee Web Gateway OIF
* Micro Focus Service Management
* Microsoft 365 Defender
* Microsoft Azure Security Center
* Microsoft Defender ATP
* Microsoft EWS
* Microsoft EWS Extension
* Microsoft Graph Security
* Microsoft OneDrive
* Microsoft Sentinel
* Microsoft Sharepoint
* Microsoft Teams
* Mimecast
* MISP OIF
* Mitre Matrix
* MSSQL
* MxToolbox
* MYSQL
* Netskope
* Netskope V2
* Neurons ITSM
* Neustar IP GeoPoint
* Nmap
* Nozomi Networks
* Nucleon Cyber
* Okta
* oneLogin
* OpenLDAP
* OpenText EnCase Endpoint Security
* Opswat Metadefender
* Oracle DB
* PagerDuty
* Palo Alto AutoFocus
* Palo Alto Networks NGFW OIF
* Palo Alto Networks Panorama V2
* Palo Alto Networks WildFire OIF
* Panda EDR
* Passive Total
* PhishLabs DRP
* PhishLabs EIR - Incident Data
* PhishLabs EIR - IOC Feed
* PhishTank
* POP3
* PowerShell Tools
* Proofpoint TAP
* ProtectOnce
* Pulse Secure
* Pulsedive
* Qualys
* Qualys EDR
* Qualys WAS
* Rapid 7 InsightVM
* Rapid7 InsightIDR
* Rapid7 InsightIDR V2
* Rapid7 Nexpose
* RapidAPI
* Recorded Future OIF
* RSA NetWitness
* RSA NetWitness Logs
* SailPoint
* Salesforce
* Screenshot Machine OIF
* Security Scorecard
* SecurityTrails
* Securonix
* Securonix V2
* SentinelOne
* ServiceNow OIF
* SFTP Tools
* Shodan
* Skype
* Slack
* Snort
* Snowflake
* SOCRadar
* SolarWinds Orion
* SonicWall
* Sophos Central
* Sophos Central 3.0
* SpiderFoot HX
* Splunk OIF
* Stellar Cyber Starlight
* Stormshield
* Sumo Logic CIP
* Sumo Logic CSE
* Symantec DeepSight
* Symantec EDR
* Symantec Endpoint Protection
* Symantec Endpoint Protection Cloud
* Symantec Secure Web Gateway (Bluecoat)
* Symantec SWS
* Symantec WebPulse
* Syslog-NG
* Telegram
* Telegram V2
* Tenable.io
* Tenable.sc
* Terraform
* TheHive
* Threat Crowd
* ThreatConnect OIF
* ThreatMiner
* ThreatQ
* Trend Micro APEX ONE
* Trend Micro Deep Security
* Trend Micro Vision ONE
* Twilio
* URLhaus Abuse
* URLScan.io
* Vectra
* VirusTotal OIF
* VMRay
* VMware Carbon Black App Control
* VMware Carbon Black Cloud Endpoint Standard
* VMware Carbon Black Cloud Endpoint Standard V2
* VMware Carbon Black Cloud Enterprise EDR
* VMware Carbon Black Cloud Platform
* VMware Carbon Black EDR
* VMWare vSphere
* VMware Workspace ONE
* WhoisXML
* WithSecure Elements
* WithSecure Endpoint Protection
* Wittra
* Zendesk
* ZeroFOX
* Zoom
* Zscaler

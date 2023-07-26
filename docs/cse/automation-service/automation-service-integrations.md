---
id: automation-service-integrations
title: Integrations
sidebar_label: Integrations
description: Learn how integrations are connectors to applications from industry-leading network and security vendors.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';

{@import ../../reuse/automation-service-la-note.md}

Integrations are connectors to applications from industry-leading network and security vendors. Playbooks run actions provided by resources in integrations.      

Integrations that are already installed to your environment appear in the **Integrations** menu in the Automation Service. 

:::info
Before you can use actions from an integration resource, you must [configure the connection for the resource](/docs/cse/automation-service/about-automation-service/#configure-the-connection-for-an-integration-resource) to work with the Automation Service.
:::

## View integrations

The following procedure describes how to view integrations already installed to your environment. You can also [install new integrations using App Central](/docs/cse/automation-service/automation-service-app-central/#install-an-integration-from-app-central), or [create a custom integration](/docs/cse/automation-service/automation-service-examples/).

1. Click the **Configuration** button (gear icon) at the top of the UI.
1. Under **Integrations**, select **Automation**.
1. From the **Automation** screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/>
   :::note
   {@import ../../reuse/cse-launch-csoar-automation.md}     
   :::
1. Click **Integrations** in the left navigation bar.<br/><img src={useBaseUrl('img/cse/automations-integrations-list.png')} alt="Integrations list" width="800"/>
1. Select an integration to see the actions on the resource. You call these actions when you [add an action node to a playbook](/docs/cse/automation-service/automation-service-playbooks#add-an-action-node-to-a-playbook).<br/><img src={useBaseUrl('img/cse/automations-integrations-actions-list.png')} alt="Actions on an integration" width="800"/>

:::tip
To add a new resource to an integration, click the **+** button to the left of **Resources**. This is useful if you have another instance of the vendor application you want to connect to.
:::

## Certified integrations

Certified integrations are those that are provided by Sumo Logic. You can [install certified integrations using App Central](/docs/cse/automation-service/automation-service-app-central/#install-an-integration-from-app-central).

Certified integrations are designated by a **Certified Integration** check mark.<br/><img src={useBaseUrl('img/cse/automations-integration-certified.png')} alt="Certified integration" width="300"/>

After you select the integration resource and click the **View Code** button, the certified integration code is set to read-only mode. The certified integrations code can’t be edited using the Cloud SIEM internal IDE. This is also true for the actions available for that integration.<br/><img src={useBaseUrl('img/cse/automations-integration-certified-2.png')} alt="Certified integration message in resource code" width="400"/>

Certified actions are designated by a **Certified Action** check mark.<br/><img src={useBaseUrl('img/cse/automations-integration-certified-action.png')} alt="Certified action" width="300"/>

You can add resources to the certified integration by clicking the **+** button, or you use it as-is.<br/><img src={useBaseUrl('img/cse/automations-add-resource.png')} alt="Add a resource" width="400"/> 

## Duplicate an integration

To modify an integration's code, you must first duplicate the integration and make your modifications in the duplicated version. When you click the **Duplicate integration** button, a new integration will be created in the integrations list with an incremented name. <br/><img src={useBaseUrl('img/cse/automations-integration-duplicate.png')} alt="Duplicate certified integration" width="400"/>

Following is a duplicated integration:<br/><img src={useBaseUrl('img/cse/automations-integration-duplicated.png')} alt="Duplicated integration" width="250"/>

If the certified integration resource was configured before the duplication process, all the settings will be saved and replicated inside the duplicated integration. There is no need to reset the duplicated integration.

Note that in the following example a **(2)** follows the duplicated integration's name, as well as the resource name. A **(3)** would follow the name of the next duplicate, **(4)** the next, and so on. Also note that the actions listed in the integration do not have the **Certified Actions** check mark, because they exist on a duplicated integration.<br/><img src={useBaseUrl('img/cse/automations-integration-duplicated-resources-actions.png')} alt="No changes to duplicated resource actions" width="600"/>

 If you choose a duplicated resource when you [add an acton node to a playbook](/docs/cse/automation-service/automation-service-playbooks#add-an-action-node-to-a-playbook), the actions available will be the ones belonging to the duplicated resource. The following example shows selecting an action from a duplicated resource.<br/><img src={useBaseUrl('img/cse/automations-integration-add-comment-to-issue.png')} alt="Add comment to issue" width="600"/>

## Available integrations

The following integrations are available for the Automation Service, but only some are automatically installed in customer environments. If you would like an integration listed below added to your environment, or would like documentation for a specific integration, contact your Sumo Logic account representative.

<details><summary>Integrations</summary>

* Abnormal Security
* Abuse.ch SSLBL Feed
* AbuseIPDB
* Acronis
* Active Directory OIF
* Active Directory V2
* Airtable
* Akamai WAF
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
* Arcanna
* Arcsight ESM
* Arcsight Logger
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
* Have I Been Pwned
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
* KnowBe4 PhishER
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
* Mandiant Advantage Threat Intelligence
* Material Security
* Mattermost
* MaxMind OIF
* MaxMind V2
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
* OpenAI ChatGPT
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
* Phantombuster
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
* ServiceNow V2
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
* Tufin SecureChange
* Tufin SecureTrack V2
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

</details>

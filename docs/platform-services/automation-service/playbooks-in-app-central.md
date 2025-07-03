---
id: playbooks-in-app-central
title: Playbooks in App Central
sidebar_label: Playbooks in App Central
description: Learn about the out-of-the-box playbooks available in App Central. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type.

While [playbooks](/docs/platform-services/automation-service/automation-service-playbooks/) in the Automation Service UI show the playbooks installed to your environment, the **Playbooks** tab in App Central shows you additional playbooks you can install.

### Install a playbook from App Central

1. Use the **Search** bar in the upper right of the **Playbooks** tab to find playbooks.
1. Click **Install** in the corner of the playbook box.
1. Click **Next**.
1. Click **Install** to install the playbook.
1. Click **Close**. After installation is complete, **Installed** replaces the **Install** link in the corner of the playbook box.
1. **IMPORTANT**: Click **Show More** in the playbook box to see if there are additional steps you need to follow to configure the installed playbook. Failure to perform these additional steps may result in the playbook not working properly.

<!-- There used to be an export button, but now it's gone. Saving this text below in case it comes back.

## Export from App Central

You can export the contents of integrations and playbooks from App Central.

1. Click the **Go to export page** button in the top right corner of the **Integrations** tab.<br/><img src={useBaseUrl('img/cse/automation-service-app-central-export-button.png')} alt="Go to the export page" style={{border: '1px solid gray'}} width="300"/>
1. Select the items you want to export. Provide a description in the box provided. If you select more than one item, you are prompted to provide a title as well.
1. Scroll down and click **Export** at the bottom right corner of the screen. The selections are exported in a .tar file to your downloads folder.
1. Extract the .tar file. An archive file is extracted from the .tar file (for example, a .tar.gz file).
1. Extract the archive file. The exported items are extracted, including any YAML files they contain.

-->

## Playbooks in App Central

### 1 - Basic IP Reputation

*Denial of Service*

The purpose of this playbook is the automated detection of a large number of malformed packets being sent from several different IPs and blocking them. This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.

### 2 - Anti-Debug

*Malware*

This playbook's main purpose is to analyze a malware by automating the discovery of anti-debug tricks in files, using Python scripts such as:
- Flag Checking's & System calls (IsDebuggerPresent, PEB debugger flag, etc.)
- Structured/Vectored Exception Handling anti-debug tricks.
- Threat Control.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.

### 3 - Anti-VM playbook

*Malware*

This playbook's main purpose is to analyze a malware by automating the discovery of anti-debug tricks in files, using Python scripts, such as:
- Flag Checkings & System calls (IsDebuggerPresent, PEB debugger flag, etc.)
- Structured/Vectored Exception Handling anti-debug tricks.
- Threat Control;

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.

### 4 - Anti-Worm

*Worm Infection*

The purpose of this playbook is to recognize worms from several indicators such as very high frequency of local area network communication, automated outgoing emails, etc.

### 5 - AntiVirus Infection

*Infection*

Playbook to be executed when an antivirus repeat infection has been found. This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.

### 6 - AV Infection Detected

*Malware*

Repeated infection detected by AV and notified into Cloud SIEM. Enrichment is done from various sources and appropriate containment is applied. This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.

### 7 - Basic playbook from SIEM Alarm

*Infection*

Playbook can be activated after receiving alarms from different sources, such as BlueCoat and FireEye. This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.

### 8 - Blacklisting a Sender

*Data Breach*

A use case for blacklisting the sender with actions composed to perform blacklisting by domain/IP address/URL. This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.

### 9 - Block user - Cookie Based

*Incident Response*

Playbook to block a user that is navigating on a suspicious domain. This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.

### 10 - Brute Force Attack

*Unauthorized Access*

A brute force attack is a trial-and-error method used to obtain information such as a user password or personal identification number (PIN) or any other personal data. In a brute force attack, automated software is used to generate a large number of consecutive guesses as to the value of the desired data. In general, it is a systematical check of all possible passwords and passphrases combinations until the correct one is found. Scripts are usually used in these attacks to automate the process of arriving at the correct username/password combination.

Brute force attacks are usually mitigated by WAF technologies provided by popular market vendors such as Cloudflare, Akamay, Arbor Networks, Amazon Cloud Front, etc. In this case, the attack is not even perceived but mitigated automatically. With reference to the current tools on the market, among the mostly used brute force tools are THC Hydra and Patator. This playbook implies that these preventive systems are not in place or have been evaded.

:::note
Attackers can derive the pattern to define user accounts or corporate email addresses just analyzing the syntax of a valid target email address and demographic details of employees (for example, gathered on social networks such as LinkedIn, Facebook, etc). At that stage, it is easy to derive the list of potential accounts, and the password is the last piece of info that needs to be guessed.
:::

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




### 501 - Send Insight AWS SNS Notification

*Cloud SIEM*

Send AWS SNS notification when an insight is created.

### 502 - Send Insight Email Notification

*Cloud SIEM*

Sends an email when an insight is created, if the severity of the insight is high. Intended to be used with the insight creation trigger on Cloud SIEM. Update your Email Address in the Send Email Action.

### 503 - Enrich Entity with CrowdStrike Falcon Intelligence

*Cloud SIEM*

Run Search Intelligence Indicators on entity, and post results to Cloud SIEM.

### 504 - Enrich Entity with DomainTools

*Cloud SIEM*

Run Domain, Email, or IP Reputation (depending on Entity type) with DomainTools, and post results to Cloud SIEM.

### 505 - Enrich IP with Geolocation from MaxMind

*Cloud SIEM*

Run Geolocate IP, and post results to Cloud SIEM.

### 506 - Recommend Insight Response

*Cloud SIEM*

Send all tags from insight to ChatGPT and ask for recommended steps to respond to the issue, and post results to Cloud SIEM.

### 507 - Create PagerDuty Incident for Insight

*Cloud SIEM*

Create a PagerDuty Incident when an insight is created.

### 508 - Enrich Entity with PowerShell GreyNoise

*Cloud SIEM*

Uses local Windows server Grey Noise script to enrich an entity, and posts results to Cloud SIEM.

### 509 - Enrich Entity with PowerShell SentinelOne

*Cloud SIEM*

Uses local Windows server SentinelOne script to enrich an entity, and posts results to Cloud SIEM.

### 510 - Enrich Entity with PowerShell User Query

*Cloud SIEM*

Uses local Windows server "query user" script to enrich an entity, and posts results to Cloud SIEM.


### 511 - Enrich Entity with PowerShell CrowdStrike

*Cloud SIEM*

Uses local Windows server CrowdStrike script to enrich an entity, and posts results to Cloud SIEM.

### 512 - Enrich Entity with PowerShell CarbonBlack

*Cloud SIEM*

Uses local Windows server CarbonBlack script to enrich an entity, and posts results to Cloud SIEM.

### 513 - Enrich Entity with PowerShell Whois

*Cloud SIEM*

Uses local Windows server whois script to enrich an entity, and posts results to Cloud SIEM.

### 514 - Enrich Entity with PowerShell nslookup

*Cloud SIEM*

Uses local Windows server nslookup script to enrich an entity, post results to Cloud SIEM.

### 515 - Enrich Entity with Recorded Future

*Cloud SIEM*

Run Domain, File, IP, or URL reputation (depending on Entity type), and post results to Cloud SIEM.

### 516 - Enrich Hash with SentinelOne

*Cloud SIEM*

Run Hash Reputation on entity, and post results to Cloud SIEM.

### 517 - Create ServiceNow Ticket for Insight

*Cloud SIEM*

Create a ServiceNow Ticket when an insight is created.

### 518 - Update ServiceNow Ticket for Insight

*Cloud SIEM*

When an insight is updated, please make sure to update the assignee of the ServiceNow Ticket.

### 519 - Send Insight Slack Notification

*Cloud SIEM*

Create a new Slack Channel when an insight is created and send a Slack message if the severity of the insight is HIGH. Intended to be used with the insight creation trigger on Cloud SIEM.

### 520 - Enrich Entity with Log Search

*Cloud SIEM*

Perform a log search for activity by the entity within the last 3 hours across all log sources, and post results to Cloud SIEM.

### 521 - Update Match List

*Cloud SIEM*

Add specified entity to the specified Match List.

### 522 - Create Jira Issue for Insight

*Cloud SIEM*

Create a Jira issue when an insight is created.

### 523 - Update Jira Issue for Insight

*Cloud SIEM*

Update Jira issue (Status, Priority) when an insight is updated.

### 524 - Enrich IP Address with GreyNoise

*Cloud SIEM*

Run Context IP Lookup on entity, and post results to Cloud SIEM.

### 525 - Enrich Entity with Jamf

*Cloud SIEM*

Get Computer Details on entity, and post results to Cloud SIEM.

### 526 - Send Insight Teams Notification

*Cloud SIEM*

Send a Team notification when an insight is created.

### 527 - Enrich Entity with VirusTotal

*Cloud SIEM*

Run Domain, File, IP, or URL reputation (depending on Entity type), and post results to Cloud SIEM.

### 528 - Create ZenDesk Ticket for Insight

*Cloud SIEM*

Create a ZenDesk ticket when an insight is created.

### 529 - Update ZenDesk Ticket for Insight

*Cloud SIEM*

Update Priority and Status of ZenDesk ticket when an insight is updated.

### 530 - Get Mitre Mitigations for Insight

*Cloud SIEM*

Retrieve list of mitigations recommended for the tactics an techniques tagged on the given insight.

### 531 - Example Insight full Enrichment

*Cloud SIEM*

Automatically chooses the best technology to enrich all entities of the insight. Based on the results, sends an email, a Slack message, or opens an incident in PagerDuty.

### 532 - Example Entity full Enrichment

*Cloud SIEM*

Automatically chooses the best technology to enrich an entity. Based on the results, sends an email, a Slack message, or opens an incident in PagerDuty.

### 533 - Example Involved Entities full Enrichment

*Cloud SIEM*

Automatically chooses the best technology to enrich an entity. Based on the results, sends an email, a Slack message, or opens an incident in PagerDuty.

### 534 - Enrich Entity with AlienVault OTX

*Cloud SIEM*

Run Domain, File, IP, or URL reputation and post results to Cloud SIEM.

### 535 - Application Latency Playbook

*Alert*

Diagnose and resolve application latency issues including code deploy events and infrastructure anomalies.

### 536 - Unresolved Alert Notification

*Alert*

Periodically monitor status of a Sumo Logic alert and notify a Slack user about unresolved alerts.

### 537 - Amazon GuardDuty BruteForce finding

*Brute Force*

Upon receiving a brute-force alert from Sumo Logic, this playbook will create an issue on Jira and populate it with the relevant information. After that, it will notify the resource owner, asking for justification or termination or stop its instance. Lastly, with manual review it complete the investigation.

### 538 - Admin Privileges Granted

*Unauthorized Access*

This playbook enriches suspicious events of possible unauthorized access in AWS. It activates when an external IP adds a user to a privileged group (Domain Admins or similar).

Starting with a Sumo Logic Alert, a high fidelity alert, the playbook carries out different IP reputations checks using XForce and AbuseIPDB and obtains different results using Whois and XForce. Next, the playbook automatically gets the user groups and attributes of the affected user from AWS IAM. If the IP reputation has a negative score, the analyst can immediately notify the SOC team about the compromised user. Finally, through user choice, which is an analyst decision, you can perform automatic containment, orchestrating AWS IAM, The first allows you to remove the user from the group and delete the login profile and the access key

Alternatively, you can decide to apply manual containment, If the IP was considered non-harmful, and the Alert will be marked as a False Positive.

### 540 - EC2 instance accessed from malicious IP

*Unauthorized Access*

EC2 instance has been accessed from IP address found in a threat intelligence feed. This playbook is essential for AWS EC2 Integration. This playbook will perform initial enrichment related to Snapshots, Instances, and Security Groups in the AWS environment. Subsequently, the gathered data will be dispatched via email. Finally, a User Choice will be prompted to the analyst to decide what kind of action to perform, and upon completion, the Alert will be closed.

### 541 - Management of AWS EKS Insights

*General*

This playbook helps you automatically resolve EKS-related alerts. After listing insights, with a condition you can read nodes, list clusters or nodes, and test for specific conditions. Finally, if there are some parameters that you find problematic, an email will automatically be sent to notify you of what has been found.

### 542 - Resolution of AWS EKS Insights

*General*

This playbook helps you automatically resolve EKS-related alerts. After listing insights, with a condition you can read nodes, list clusters or nodes, and test for specific conditions. If there are any parameters that you consider problematic, an automatic note will be added to report the incident in addition to sending an email. Finally, a user choice offers you the possibility to update the cluster configuration.

### 543 - Alert and Vulnerability detection with Sysdig Secure

*General*

This playbook was created in order to find possible vulnerabilities and remediate them, using Sysdig Secure. After an initial analysis, if there are any suspicions, we continue by notifying the managing team, then we proceed with a further check to ensure that a new vulnerability has been found. Finally, we proceed to create a new alert including all the information obtained previously. If nothing is found, an email will be sent to inform the managing team.

### 544 - Vulnerability Alert processing with Sysdig Secure

*General*

This playbook was created to find possible vulnerabilities and fix them, using Sysdig Secure.
After receiving the Alert from Cloud SIEM, a condition verifies the information received. If there are some problematic parameters, the playbook proceeds to obtain the vulnerability result and, thanks to another condition, an automatic containment action will create a new alert. If nothing is found, an email will be sent to notify the management team, giving the user the option to manually resolve the alert.

### 545 - Resolution of Sysdig Alerts

*General*

This playbook was created to find possible vulnerabilities and fix them, using Sysdig Secure.
After receiving the initial alert from Cloud SIEM, if the alert is related to AWS EKS the playbook will be executed. Otherwise an email will be sent notifying you that it is not an AWS EKS alert and a user choice allows to resolve the warning manually.

### 546 - Resolution of Sysdig Alerts - AWS EKS and AWS Nodes

*General*

This playbook helps to resolve automatically the possible alerts referring to EKS, EC2 and S3. Other alerts are resolved creating a manual task.








480 - Block Account — Essential Advanced
Intrusion
This playbook searches for a suspicious user inside the Active Directory server. If it finds it, it blocks the user and emails the engineer on duty. If it doesn't find it, the playbook assigns the on-duty engineer a manual review and investigation.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






479 - Account Enrichment - Essential Advanced
CTI
This playbook retrieves data from an Active Directory server and, performing additional checks, gives all the advanced information related to a specific account as output.






478 - CrowdStrike Detections — Compromised User — Triage
Malicious Activity
This playbook will be triggered by CrowdStrike alerts with low and medium severity.

It extracts the compromised user account from the alert, searches into Azure AD for the user contact details and department, and then creates a note with the compromised user's details.

Further, based on the user's department, the playbook retrieves the ISO from the Sharepoint list, searches for the ISO details in Azure AD, and then creates a note with the ISO contact details.

Afterward, the playbook prompts the analyst to contact and inform the ISO. The options are:

Send a notification to ISO automatically and create a note that ISO was notified
Send a notification to ISO manually and create a note that ISO was notified
Create a note that ISO was not notified.
In the end, the playbook sends a notification to escalate the triage event, and the analyst has to choose between converting it to an incident or discarding the triage event.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






477 - SolarWinds Orion — Exploit Mitigation (Full Automation) Advanced
Intrusion
This playbook allows you to check for, prevent and contain potential SolarWinds SUNBURST and SUPERNOVA exploitations. The advanced playbook version improves the basic workflow and boosts efficiency.

The playbook starts by exploring traffic and searching for relevant alerts. It then creates a manual task to check the updates on the involved servers or workstations. If the traffic from SolarWinds Orion contains the known C&C server “avsvmcloud.com” or the Orion software is not updated, the playbook will:

Conduct a forensic investigation
Examine compromised SolarWinds hosts
Power down network interfaces, ending with a network block containment action
Alternatively, if there are no traces of the C&C server mentioned above, the playbook verifies the Orion updates and traffic. In addition, it incorporates a helpful note that explains how the SUNBURST and SUPERNOVA vulnerabilities work.

Subsequently, the playbook presents the analyst with two User Choices: the first checks the SolarWinds Orion version and the second looks to verify the presence of the malicious web-shell DLL “app_web_logoimagehandler.ashx.b6031896.dll” on the servers. If the SOC analyst confirms the SolarWinds versions are vulnerable, and the malicious file is present, the playbook executes an automatic scan to check for specific CVEs.

Lastly, since FireEye researchers have discovered that SolarWinds attackers can move laterally from local networks to the Microsoft 365 cloud, the playbook asks the analyst to monitor Microsoft 365 cloud.






476 - Threat Hunting on Various IOCs Advanced
Threat Intel
This playbook is helpful for conducting multiple threat-hunting activities on various kinds of IoCs.

The playbook starts with a txt file, extracting different information (hash, IP, URL, domain, and so on). It performs validation checks for the reported IoCs if the multiple queries on the VirusTotal platform.

Simultaneously, it prepares a specific query for Securonix to carry out additional threat-hunting activities and generate multiple results for the same IoC.

Finally, the SOC analyst can have different notes containing all the valuable information regarding the analyzed IoCs.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






475 - Torrent: Company Policy Infringement Advanced
Network Anomaly
This playbook prevents downloads through torrents, infringing the company's policy.

First, the playbook collects all the data from the firewall.

After that, it performs additional checks — such as a sudden bandwidth shift, connections on updated p2p, and connections to well-known torrent ports — to collect all the relevant information.

Finally, the playbook notifies the management team and creates a dedicated task that allows you to discuss the generated incident with the end user and review it.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






474 - Pastebin Leaks Advanced
Data Leak
This playbook prevents leaks on the Pastebin website.

The playbook includes input data validation and can collect multiple pieces of information using a specific scraping script to filter during the following actions.

A User Choice allows you to reset users' passwords if these are involved in the incident.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






473 - Log4j Attack Advanced
Intrusion
This playbook remediates the Log4j vulnerability.

Inputs are represented by the CVE code and IP of the compromised machine. Incident information validation is included.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.








472 - Carbon Black Cloud — Vulnerable Host Detected Advanced
Malware
This playbook harvests advanced alerts from Carbon Black Cloud. It enriches many details concerning the host, vulnerability, user info, and file reputation.

Based on the obtained results, the playbook can set an incident as a false positive, send an email to notify the vulnerable host, update the incident's severity, and quarantine the asset.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






471 - Carbon Black Cloud - Remediation Advanced
Malware
This playbook performs advanced analysis of Carbon Black Cloud alerts.

It carries out remediation based on a file's reputation. You can decide whether to quarantine the device, kill the malicious process, or delete the malicious file.

The playbook enriches many details concerning the host, vulnerability, user info, and file reputation. Based on the obtained results, it sets an incident as a false positive or sends an email to notify the affected endpoint and update the incident's severity.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






470 - Slack - General Failed Logins v2.1 Advanced
Brute Force
This playbook helps you stop advanced brute-force attack attempts.

First, the playbook tries to ensure that the targeted Slack account is enabled by attempting to send a message to confirm it is active.

By relying on User Choices, the SOC analyst determines whether a user really attempted to log in with an incorrect password (false positive) or whether a brute force attack is in progress.

Finally, the playbook alerts the user under attack and allows the SOC analyst to reset the user's password or deactivate the account if they haven't changed it.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






469 - OT-IoT Security Cisco-Alleantia v4 Advanced
Intrusion attempt
This advanced playbook is suitable for ingesting alerts from industrial controllers. It carries out enrichment, helps you detect network flows impacting machines, and applies remediation under the supervision of the control room.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






468 - Log4j Vulnerability Advanced
Log4J
This playbook uses Tenable.io with the Log4j shell Vulnerability Ecosystem template to scan your targets for a Log4j vulnerability.

If it is a true positive and a target has a Log4j vulnerability, the playbook emails a scan report, sends a notification, sets the severity to high, and opens a task to review the resolution process.

If there isn't any real threat or risk, the incident will be closed, and the playbook will send a notification informing of a false positive.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






467 - Email Compromised - Leaked Advanced
e mail
This playbook investigates whether a user's emails were leaked or not. It checks all their emails, relying on various services providing data leak information.

If the emails were leaked somewhere, the playbook informs the security team and performs containment actions to prevent additional risks, such as resetting the user's password, locking the mailbox, and sending an email containing the user's new password.

Analysts can choose between disabling the user, closing the incident (if it is a false positive), or listing the compromised credentials. If the playbook finds a compromised account and analysts disable the user, the playbook will notify the respective user.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






466 - Bitdefender GravityZone Threat Blocking
Malware
This playbook revolves around checking a hash reputation with SentinelOne.

After listing the endpoints, the playbook creates a scan task with Bitdefender to check the endpoint status.

If the results are present, it creates a report of the endpoint protection status and a list containing the blocking items.

Further, based on the gathered information, the analysts decide whether a hash has to be blocked. If it doesn't, the incident will be reviewed and closed. In any case, a report on the endpoint module status will be available.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.







465 - Bitdefender GravityZone Essential
General
This playbook uses, for the most part, Bitdefender GravityZone actions.

It starts by listing all the configured companies and policy details for each.

Further, it conducts a scan test and creates a report for each company using the Bitdefender technology. The playbook saves all the significant results as a note that analysts can enrich.

Lastly, it sends a notification to notify everyone involved of the results.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






464 - PII Breach Prevention Through Cloud SOAR’s Automation Technology Advanced
General
This playbook allows you to prevent breaches through the Cloud SOAR automation technology. The advanced version improves the basic (essential) workflow and boosts efficiency.

When the playbook receives an alert, it performs various CTI actions to identify possible suspicious activities (i.e., IP reputation, SIEM logs analysis, and so on).

After it collects the relevant data, the playbook prompts the analysts with a User Choice, enabling them to take the necessary actions and contain detected suspicious activities.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






463 - Block Connections to Tor Exit Nodes Advanced
Network Anomaly
This playbook allows you to investigate and block connections to the Onion Routing system (TOR network). The advanced version improves the basic (essential) workflow and boosts efficiency.

The playbook executes multiple queries and generates a task that helps you check a connected IP against a list of known Tor exit nodes. If the list contains the IP, the playbook prompts analysts with a User Choice, allowing them to block the Tor exit node if the user is not authorized to use Onion Routing.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






462 - CSE Lateral Movement Advanced
Malware
This playbook helps you stop lateral movement attacks using Sumo Logic Cloud SIEM. The advanced version of the playbook improves the basic (essential) workflow.

Getting insight details from Cloud SIEM, the playbook does multiple checks, filtering the results by IP, username, and hostname.

Once it finishes the queries, it creates a final task to review Incident details and asks the SOC analysts whether any of the involved assets belong to the SOC's critical asset list.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






461 - AWS Athena Essential
General
This is an essential playbook for the AWS Athena integration.

It starts with the execution of a query on AWS Athena. Next, it helps you retrieve the results of the action, which it saves in an Incident note.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






460 - Compromised Internal Host in a Hybrid Environment Advanced
General
This playbook is built to prevent host compromise more effectively and efficiently.

After searching AWS events, the playbook presents users with three options:

If there are suspicious events, it performs an additional query to collect more information and gives SOC analysts the possibility to quarantine any infected hosts
If the AWS events show multiple login attempts, the playbook runs a nested playbook to set a new password in Active Directory
If, in a hybrid environment, it finds suspicious data (forwarded from Cloud SIEM) that looks like a lateral movement, the playbook activates another nested playbook

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






459 - CrowdStrike Falcon Sandbox - File Submission Advanced
Malware
This playbook allows you to submit a file for analysis and download the relevant reports or get a summary of the submission using the CrowdStrike Falcon SandBox integration. It carries out advanced validation and sends a notification if the file is not submitted.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






Installed
458 - CrowdStrike Falcon Sandbox - URL Submission Advanced
Malware
This playbook allows users to submit a website's URL, or a URL with a file, for analysis to the CrowdStrike Falcon Sandbox integration. They can download a relevant report or get a summary of information about the submitted URL/file.

If the database doesn't return any results, the playbook's execution will be skipped.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






457 - CSE Lateral Movement Advanced
Malware
This playbook was built to prevent lateral movement attacks.

When it receives insight details from Cloud SIEM, the playbook performs multiple checks filtering the results by IP, username, and hostname.

Once it finishes with these queries, the playbook creates a final task — a review of the incident details. It then prompts the SOC analysts to determine whether any assets belong to the SOC's critical asset list.

In this advanced version of the playbook, if no IOCs are found in the insight, the playbook skips all the actions.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






456 - Basic Phishing Advanced
Phishing
This is an advanced version of the basic playbook for phishing use cases.

Parsing and extracting the IOCs from the received email, the playbook performs multiple CTI activities, such as a file, IP, URL, and domain reputation check.

Based on the obtained results, it either sets the incident as a false positive or updates its severity level and sends an email notifying about a possible attack.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






Installed
455 - O365 Successful Travel Activity Advanced
General
This playbook deals with O365-related insights generated in Sumo Logic Cloud SIEM Enterprise.

It includes event information validation, IP and email-entity enrichment, and email notification in case of an incident (based on the analyst's decision).

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






454 - CSE Brute-Force Advanced
Malware
This playbook works best for advanced investigation of a brute-force attack with Sumo Logic Cloud SIEM.

The playbook starts by validating Cloud SIEM insight details and notifying L1 analysts if manual intervention is needed. It then collects multiple pieces of information — such as the username under attack, the number of attempts, and the source IP — after which it determines the severity level using multiple conditions.

Lastly, the playbook creates a final task for the SOC analysts, providing all the collected information.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






453 - CSE Malicious File Advanced
Malicious Activity
This playbook helps investigate a malicious file with Sumo Logic Cloud SIEM.

The playbook collects multiple pieces of information about the file. If the severity score exceeds a specified value, it proceeds with an incident review or escalates the incident to L2.

If the conditions for generating insight are absent, the playbook won't execute.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






452 - Phishing Analysis With VT Advanced
Phishing
This playbook performs phishing analysis with VirusTotal.

The first condition checks if there are attachments in the email; if there aren't, the execution will be ended. If there are, the playbook will analyze the present IOCs to determine whether they are malicious.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






451 - Arcanna.ia Alert Feedback
Enrichment
This playbook enriches incidents and alerts with Arcanna.ai.

Starting from the source data (threat alert/IOC/etc.), the playbook enriches the existing information using different threat feeds. Next, it sends the output from the enrichment actions to Arcanna.ai.

If Arcanna.ai confirms it is a true positive, analysts will review the incident and send the feedback to Arcanna. In case it is a false positive, they will close the incident right after the review.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






440 - Ransomware - Malware Outbreak, Petya Advanced
Ransomware
Security professionals can use this playbook to respond to the Petya ransomware attack.

When alerts are ingested, notifications are sent to the incident response team and CEO/stakeholders.

Next, a containment action will disconnect all devices from the network. After that, the playbook checks recent device connections and scans them on PhishTank. If the verdict is negative, it blocks the URLs. Accounts passwords will be reset, infected devices wiped, and their OS reinstalled.

Finally, some additional manual tasks are required, such as restoring devices from backups, checking for shadow copies, and installing and updating antivirus software.

The playbook allows you to perform further checks on traffic and block additional suspicious connections. If it still needs to be done, patching Eternal Blue and EternalRomance on your machine is recommended.






439 - Ransomware — Malware Outbreak Advanced
Ransomware
This playbook is used to respond to a ransomware attack.

Once alerts are ingested, notifications are sent to the incident response team and CEO/stakeholders.

Next, a containment action will disconnect all devices from the network. After that, the playbook checks recent device connections and scans them on PhishTank. If the verdict is negative, it blocks the URLs. Accounts passwords will be reset, infected devices wiped, and their OS reinstalled.

Finally, some additional manual tasks are required, such as restoring devices from backups, checking for shadow copies, and installing and updating antivirus software.

This playbook allows you to perform further checks on traffic and block additional suspicious connections. As a last option, you can email legal entities that need to be involved.






438 - Ransomware — Malware Outbreak, Revil Advanced
Ransomware
This playbook is used to respond to the Revil ransomware attack.

Once alerts are ingested, notifications are sent to the incident response team and CEO/stakeholders.

Next, a containment action will disconnect all devices from the network. After that, the playbook checks recent device connections and scans them on PhishTank. If the verdict is negative, it blocks the URLs. Accounts passwords will be reset, infected devices wiped, and their OS reinstalled.

Finally, some additional manual tasks are required, such as restoring devices from backups, checking for shadow copies, and installing and updating antivirus software.

This playbook allows you to perform further checks on traffic and block additional suspicious connections.

Scanning your machines and comparing results to IoCs from the AlienVault database is the last step in the playbook.






437 - Ransomware — Malware Outbreak, WannaCry Advanced
Ransomware
This playbook is used to respond to the WannaCry ransomware attack.

Once alerts are ingested, notifications are sent to the incident response team and CEO/stakeholders.

Next, a containment action will disconnect all devices from the network. After that, the playbook checks recent device connections and scans them on PhishTank. If the verdict is negative, it blocks the URLs. Accounts passwords will be reset, infected devices wiped, and their OS reinstalled.

Finally, some additional manual tasks are required, such as restoring devices from backups, checking for shadow copies, and installing and updating antivirus software.

This playbook allows you to perform further checks on traffic and block additional suspicious connections.

If you still need to do so, patching Eternal Blue and EternalRomance on your machine is highly recommended.






436 - Malicious File Download Advanced
General
This playbook's purpose is to prevent PDL infections during user navigation.

When Cloud SOAR receives the original syslog, it checks user activity, controls the domain reputation, and sets additional validation for enrichment.

If the navigation result is dangerous for the user or the domain is malicious, the playbook performs automatic containment actions to protect the safety of the source computer.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






435 - Insider Threat Advanced
General
This playbook helps prevent suspicious user activities.

Once the original alert is received, the playbook checks all user properties in AD. Then, it sets a conditional validation of user details. If user details are present, the next step is a search into the SIEM alerts.

If all conditions are met, the playbook performs automatic containment actions and emails the duty engineers.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






434 - Industrial Security Advanced
General
This playbook analyzes the logs presented on Alleantia and Cyber Vision for an exceeded threshold after a defined period.

It includes an additional condition for event information and enrichment validation.

If the logs present sufficient suspicious information (e.g., unknown host, a higher number of activities, and so on), the playbook gives the possibility to take two possible ways:

Perform an additional query using a nested playbook and execute all the containment actions
Mark the host as trusted and update Cisco Cyber Vision with the new trusted host information
If the initial condition fails, the playbook allows the user to reset the machine parameters through an additional user choice.






433 - SIEM Malware Detection Advanced
Malware
This playbook works for scenarios when users receive SIEM alerts for possible malware infections.

It performs additional Event/User validation and further enrichment with AD and EDR queries.

Both automated and manual remediation are available through User Choice.






Installed
432 - Suspicious User Detection Advanced
Malware
This playbook best works for alerts pointing to suspicious activities or an intrusion. It includes event detail verification, notification of the relevant departments (active directory/domain management), and enrichment to check for the past user activity.

Mitigation and containment can be applied under user supervision.






431 - Phishing Triage Playbook Advanced
Phish Triage
This advanced playbook is suitable for handling a phishing event in triage, reported as an EML/MSG.

By analyzing the URL and the hash contained in the source email, the playbook allows the user to proceed with containment actions, including blocking the URL and banning the hash.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






430 - Security Awareness AD Advanced
KB4 Completed
This playbook adds or removes a user from an AD group.

Once it parses a particular email, the playbook automatically checks whether the user retrieved from the email body is part of the AD group. If it is, it removes it (from the group). Otherwise, the playbook sends a notification and asks the analyst to perform a manual check. If the user is definitely not found, the incident closes automatically.

If, on the other hand, it finds the user, the playbook sends a notification to the duty engineers regardless of whether the containment action succeeded or failed.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






429 - Basic Attack Triage Advanced
General

This playbook is helpful as a master playbook inside which you can execute multiple nested playbooks in case of multiple events.

The playbook pertains to different possible kinds of events, for example:

Audit failure
Detected virus
Firewall denies
Brute forcing
Phishing
A specific nested playbook will be set up for each of these events.

If there are no other events, the playbook creates specific tasks to update and validate the created triage event.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






428 - Threat Intelligence Incoming Alert - Format 2 Advanced
Malware
This playbook ingests CTI alerts referring to malicious IOCs that need to be enriched and blocked in the firewall, DNS, and blacklist. The input is presented in individual files.

The workflow continues if the enrichment is successful. Otherwise, the playbook informs the team that something is missing, and a new task asks the analyst to verify the input file passed to the playbook.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






427 - Malware Detected by EDR Advanced
Malware
This playbook deals with incoming alerts declaring a found malware on an endpoint and distributes notifications to duty analysts.

The playbook performs containment via an EDR, while the security analyst performs the overall review of the incident. It applies containment actions if it confirms that a malicious process is taking place. Otherwise, it informs the team members of its absence and asks them to manually check the possible migration process.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






Installed
426 - OT-IoT Machinery Hijacking Advanced
IOT
This playbook involves enrichment, detection of the network flow impacting a machine, and remediation under the control room supervision.

After the first enrichment actions, a condition verifies the presence of suspicious commands, such as "Modbus," "address 254," and "register 2800." If it finds such commands/values, the playbook executes a dedicated User Choice to check and verify through the SIEM whether the alert is a false positive or a cyberattack is taking place.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






425 - Blueliv Stolen Credit Cards Advanced
Malware
This advanced playbook deals with compromised credit cards in a specific date range and engages the anti-fraud department for remediation. It is a master playbook that contains a nested playbook called "Contact Cardholders and Blocks Credit Cards."

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






424 - VPN User Activity Notification Advanced
VPN_Events
This advanced playbook deals with suspicious user activity performed via VPN. If a user accesses the network via VPN multiple times, it sends notifications to the GSP and SOC.

The playbook allows you to customize the conditions under which it sends notifications.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






423 - Incident Enrichment and Ownership management Advanced
Malware
This advanced playbook performs enrichment and notification actions for escalation and reassignment of ownership based on department.

It can be used whenever an incident involving one or more users/employees occurs, and there is a need to advise and timely notify the security management to track the issue and start further investigations in the shortest possible time.


This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






422 - Wittra Device Investigation
General
This playbook enriches incidents with information on specific devices and device telemetry.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






421 - Wittra Brute Force
Bruteforce Attack
This playbook ingests alerts from a brute-force source (in this case Microsoft Defender) and checks if any users are in the Wittra user database.

If it finds one, a User Choice prompts the analyst to decide whether they want to remove user permissions. If the analyst chooses to remove permissions, the playbook emails the user to update their password.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






237 - Suspicious User Connection
Intrusion
This playbook was built to prevent lateral movement in your network.

Getting the insight details from Cloud SIEM, the playbook will be doing multiple checks for the source IP, from where the connection was established, and the system attributes of the host. After the initial phase, the playbook sets a logical condition that splits the process depending on whether user data is available or not. If user data is available for investigation, the user details will be collected for additional processing and confirmation of the established connection. If there is no data on the user, the playbook creates a ticket to forward the incident to the security operations team.

It is worth noting that the playbook executes an extended query for the IP and sets User Choice to determine the final stage of the incident response, update the ticket as a valid connection established by the user and do an extensive manual investigation of the event.

If user data is available in AWS IAM, the playbook performs additional enrichment and processes the containment through User Choice if needed.

"This playbook was built to prevent lateral movement in your network.

Getting the insight details from Cloud SIEM, the playbook will be doing multiple checks for the source IP, from where the connection was established, and the system attributes of the host. After the initial phase, the playbook sets a logical condition that splits the process depending on whether user data is available or not. If user data is available for investigation, the user details will be collected for additional processing and confirmation of the established connection. If there is no data on the user, the playbook creates a ticket to forward the incident to the security operations team.

It is worth noting that the playbook executes an extended query for the IP and sets User Choice to determine the final stage of the incident response.

User Choice can lead to updating the ticket as a valid connection established by the user or to an extensive manual investigation of the event. On the other hand, if user data is available in AWS IAM, the playbook performs additional enrichment and processes the containment through another User Choice."

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






407 - Detonate File
General
This playbook starts with a file analysts may receive from different sources (SIEM, email, etc.). It performs an enrichment and evaluates whether it is malicious or not. If it is, it deletes it, isolates the host, and looks for other infected hosts. Ultimately, it stores relevant information about the file and the actions taken in a note.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






406 - Misuse of Access Advanced
Unauthorized Access
The purpose of this playbook is to detect the transfer of confidential files through the use of the windows auditing system accessed by an endpoint. It also conducts a VirusTotal scan to check for a possible ongoing intrusion.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






404 - Offense scan and User Reset Advanced
General
This playbook allows you to scan an offender via QRadar and reset the user password via AD.

It starts by extracting usernames from QRadar, after which an initial condition checks whether the suspicious user is found on QRadar. If it is not, the playbook marks the user as not found. If it is present, it can reset its password via AD or send an email via SMTP reporting the events.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






403 - IoC Hunting - Detection
Threat Intelligence
This playbook parses and analyzes IOCs from the perspective of detection and blocking of main threats.


This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






420 - Zoom Upcoming Meeting Update Advanced
Incident Management
This playbook is nested within the workflow of the master playbook "417 - Zoom Conferencing Security Check — Master Advanced."

It uses a script to generate a random passcode, passes it to the update-meeting-passcode action, pulls the meeting's original invite, and emails the new meeting password to everyone invited to the Zoom meeting.






419 - Zoom Live Meeting Update Advanced
Incident Management
This playbook is nested within the workflow of the master playbook "417 - Zoom Conferencing Security Check — Master Advanced."

It uses a script to generate a random passcode, passes it to the update-meeting-passcode action, pulls the meeting's original invite, and emails the new meeting password to everyone invited to the Zoom meeting.

This advanced version prevents failed actions.






418 - Zoom Scheduled Meeting Update Advanced
Incident Management
This playbook is nested within the workflow of the master playbook "417 - Zoom Conferencing Security Check — Master Advanced."

It uses a script to generate a random passcode, passes it to the update-meeting-passcode action, pulls the meeting's original invite, and emails the new meeting password to everyone invited to the Zoom meeting.






417 - Zoom Conferencing Security Check — Master Advanced
Incident Management
This master playbook checks all live, scheduled, and upcoming Zoom meetings for a meeting passcode. If there's no passcode, it invokes a nested playbook — "418 - Zoom Scheduled Meeting Update Advanced."

The nested playbook generates a random password, assigns it to the meeting, and sends an email notification containing the updated password to all the invited users.






416 - COVID-19 Phishing Advanced
General
This COVID-19 playbook utilizes COVID-19 threat indicator feeds to determine whether an incoming event has COVID-related indicators. If it finds them, it allows the analyst to take one or more containment actions based on the observed indicators.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






415 - Investigative Workflow Advanced
General
This playbook checks the source and destination IP addresses and determines which address is internal to the organization. It gathers asset information and searches internal and external threat intelligence sources before sending out a notification email/opening a ticket in the organization's ticketing system.

The playbook includes an additional check, i.e., a manual validation if the automatic investigation can't identify IP details.

Users can easily modify this playbook to add more processes based on their organization's procedures.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






414 - Phishing With Poll Advanced
Phishing
This playbook works best for phishing scenarios.

The playbook analyzes the original emails in an EML/MSG format, enriches the extracted attachments and IOCs via Hybrid Analysis and VirusTotal, performs a search in GSuite, sends direct messages to each involved user via Slack (conducts a poll), and contains the threat based on the users' answers.

If the results of the automated enrichment are inconclusive, the playbook suggests an additional check, i.e., a manual review of the EML/MSG files.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






413 - Forensic Analysis preparation Advanced
Forensic
This playbook helps with the forensic preparation of the analysis environment for security analysts. It achieves this by taking a memory dump of an affected AWS instance and enriching the results with Volatility.

The playbook performs forensic analysis checks that lead to assigning a manual task. It isolates the affected host by modifying the associated security group and launches a new AWS instance via Terraform, to which it attaches the snapshot of the affected instance.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






412 - Ransomware Investigation
Malware
This playbook searches for security events associated with ransomware activities (IOCs or incidents generated by XDRs/EDRs). When it finds, it carries out enrichment activities, such as searching for more affected endpoints or systems.

The playbook collects the investigation details in a single note and sends them to an analyst or a security team. Based on the information, they can choose between containing the threat by isolating the affected endpoints/systems or continuing with further investigation.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






411 - Endpoint File Sample Collection
Malware
This playbook helps analysts investigate files using multiple technologies, such as EDRs and threat intelligence platforms. It stores the investigation details in a note and sends them to the analyst team.






410 - C&C Communication Hunting
CTI
This playbook performs enrichment actions utilizing different technologies to detect possible intrusions.

After validating the incident, the playbook performs enrichment actions on the endpoint, domains, and IPs found in the incident details. After the investigation, the analyst can perform containment actions using different technologies and inform the asset owner to help the investigation process.

Ultimately, the playbook shares all the validated IOCs with the partner organizations.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






409 - Malware Investigation
Malware
This playbook enables you to automate EDR/XDR investigation.

The playbook starts by carrying out additional enrichment and adds a note to the incident details. The SOC analyst can choose between further investigation (if necessary) or automatic containment for a confirmed malware infection on the endpoint.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






408 - Failed Login
Unauthorized Access
This playbook analyzes user activities after a suspicious failed login.






405 - Phishing Correlation in Triage
General
This playbook lets you correlate newly received emails related to specific IOCs (URL, IP, domains or files) with previously created incidents. In this way, it avoids creating duplicates associated with the same phishing campaign.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






402 - IoC Hunting - Prevention
Threat Intelligence
This playbook parses and analyzes IOCs from the perspective of prevention from main threats.


This advanced workflow version includes conditional logic, allowing you to discard the incident.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




401 - Notification - No Analysis Advanced
Alerts
This playbook is for an advanced SOAR credibility use case.

This advanced workflow version includes User Choice, which allows analysts to set an incident as a false positive.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






400 - GDPR Additional Processing
Legal
This playbook describes additional activities related to GDPR, that are required when dealing with a Data Breach incident.

NOTE: Particularly, it is required to erase any copy of the data related to a specific data breach incident, when the whole legal proceeding is complete.

This playbook is purely for guidance and is intended as general information. It does not constitute legal advice or legal analysis. All organizations that process data need to be aware that the General Data Protection Regulation will apply directly to them.






399 - IP Threat Hunting Essential
Malware
This playbook performs enrichment on an IP address using VirusTotal.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






398 - Meltdown and Spectre Advanced
Vulnerability
This playbook checks for Meltdown and Spectre vulnerabilities and creates a ticket.

The playbook notifies the engineers on duty and updates the created ticket, blocking the IP on McAfee WG and closing it as a final step.

Advanced playbooks like this one improve the overall efficiency of a more basic playbook's flow.






397 - Medium priority Vulnerability Detected Advanced
Vulnerability
This playbook can assist when a medium-priority vulnerability is detected. Its parent playbook is "Vulnerability Management-Master."

Advanced playbooks like this one improve the overall efficiency of a more basic playbook's flow.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






396 - McAfee ESM Enrichment Advanced
General
This playbook enriches and contains incidents utilizing the McAfee ESM integration.

Advanced playbooks like this one improve the overall efficiency of a more basic playbook's flow.






395 - Malware Analysis Dual Check Advanced
Malware
This playbook works for incidents that require malware analysis of a possible infection with an additional automated check. It includes containment actions in cases where the source IP is confirmed to be malicious.

Advanced playbooks like this one improve the overall efficiency of a more basic playbook's flow.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






394 - Malicious IP advanced
System Compromised
This playbook contains good practices for handling advanced malicious IP infections in the triage process or when an investigation has already started.






393 - Malicious Communication with Cisco AMP advanced
Malicious Communication
Malicious advanced communication analysis using the Cisco AMP Integration.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






392 - Mail Scan Advanced
Malware
This playbook carries out an advanced search for malware performing automated CTI activities.






391 - Mail Account Compromise advanced
Unauthorized Access
This playbook is for cases of a potential advanced email account or attachment compromise.

Once the playbook conducts CTI activities to verify the reputation of the source IOCs, it asks the SOC analyst whether they need to block the detected IOCs if they consider them malicious.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






390 - Low Priority Vulnerability Detected Advanced
Vulnerability
This playbook can assist when a low-priority vulnerability is found. Its parent playbook is "Vulnerability Management Master."

The engineers on duty receive an email corresponding to the severity level and priority of the identified vulnerabilities.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






389 - Leveraging Threat Intelligence Advanced
Threat Intel
This playbook can be used to leverage threat intelligence from various sources, such as FireEye, Securonix, VirusTotal, etc.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






388 - Lateral Movement Advanced
General
This playbook is best suited for cases of lateral movement.

Starting from a suspicious alert (Syslog/email), the playbook checks whether the called URL/IP is not malicious (C&C). If the score is not positive, the playbook identifies the contacted host and quarantines it.






387 - Indicator of Compromise Update Advanced
General
This playbook allows you to extract helpful values (IP, hash, URL) and process them with regex rules. You can use the playbook to update and check for any new indicators of compromise related to an incident, such as hash values, IP addresses, or URLs, once the SOAR receives an external alert (Syslog or email).






386 - GDPR Data Breach Advanced
Legal
The EU General Data Protection Regulation (GDPR 5853/12) entered into force on May 25th, 2016, and is due to be enforced from May 25th, 2018. It aims at replacing the current EU Directive 95/46/EC.

This playbook contains additional validation of events connected to data breaches to ensure investigation success.

The GDPR emphasizes transparency, security, and accountability by data controllers while simultaneously standardizing and strengthening the right of European citizens to data privacy. It also extends to Non-EU businesses that process the personal data of EU residents. It introduces the role of a Data Protection Officer (DPO), required for "government bodies" and organizations conducting mass surveillance or mass processing of special categories of data. Additionally, it generally requires that organizations need a personal information inventory.

GDPR imposes mandatorily to report privacy breaches to the supervisory authority within 72 hours and potentially to the data subject. GDPR requests organizations to perform Privacy Impact Assessments (PIAs) if the activity is considered "high-risk." A PIA is a process of systematically considering the potential impact of a new event (e.g., deploying a new technology) on the private data exposure of individuals. It allows organizations to identify potential privacy issues before they arise and devise a plan to mitigate these threats.

Failing to report a breach to the supervisory authority can imply a penalty of up to 20,000,000 EUR or four percent of the previous year's global revenue. Typical cases that might end in a data breach are the following:

Intrusion
Theft/loss of mobile or PC
Accidental distribution of data (wrong recipient or wrong attachment)
Loss of digital supports or paper documents
System failure with loss of data (e.g., database crash)
This playbook contains general information and is purely for guidance. It does not constitute legal advice or legal analysis. All organizations that process data must be aware that the GDPR applies directly to them.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






385 - Fraud Advanced
Fraud
Playbook to be associated to incidents in case of fraudulent activity from different locations.

Advanced validation of event and IOC included, if essential info not included.

With conducting a CTI activities and informing the source user, the SOC Analyst can decide to block the source IP because is malicious or is not recognised by the source user.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






384 - FortiWeb Directory Traversal Advanced
Malicious Communication
This playbook works best as an advanced FortiWeb directory traversal workflow.

It includes event information verification.

In case there are some activities in the web server logs that point to unauthorized file access from the
outside or if the IP is malicious, the playbook allows analysts to block the customer technologies.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






383 - Forensic Checklist Advanced
Digital Forensics
This playbook presents a digital forensic workflow applicable to cases of forensic investigation.

It is a valuable playbook for situations when SOC teams receive a suspicious IoC and need to investigate it using different technologies to find a possible intrusion/PDL compromise.

If the information on the security event is not complete, the playbook prompts the analysts with user choice in the form of advanced conditionals.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






382 - Event Deduplication Advanced
General
This playbook performs a credibility test - in which emails sent by SIEM report different security events - and event deduplication.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






381 - Enrichment for Event Deduplication Advanced
General
This playbook is a child use case performing enrichment for the event deduplication playbook.

It requires an analyst's assistance if the gathered info is different.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






380 - Employee Fraud Report Advanced
Fraud
This playbook includes best practices for how to handle employee fraud reports.

It collects user properties and geolocates the source VPN IP if the user attributes contain custom properties (such as AD group) and if the IP is from an unknown location. It automatically sends an email to inform the technicians on duty about possible fraud.

The playbook requires an analyst's intervention if the IP is not retrieved.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






379 - Email Submission Return Receipt Advanced
Incident Response
This playbook can be inserted into any other playbook to generate a submission acknowledgment/return receipt for user-submitted incident emails.

If, for some reason, the email is not present, it's the analyst's task to retrieve it and return the receipt.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






378 - Email Submission Block IP Advanced
Incident Response
This playbook takes an email with the subject line of "Block IP," passes the IP in the body to a firewall (e.g., FortiGate), and tries to block it.

Then, the playbook sends a success or failure email to the stakeholders, informing them about the results of the actions it took.

Advanced playbooks like this one improve the overall efficiency of a more basic playbook's flow.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




377 - Easy Triage (IP Location) Advanced
Network Activity
This playbook helps determine the location and IP reputation status during a potential incident.

In case of a suspicious IP, it allows the user to convert the triage event into an incident.

Advanced playbooks like this one improve the overall efficiency of a more basic playbook's flow.




376 - XSS Prevention Advanced
Denial of Service
XSS attacks are injection attacks in which a threat actor injects malicious JavaScript code into otherwise benign and trusted websites. Attackers use web apps to send malicious code to a server or client.

This playbook can help enrich and contain an XSS incident and notify stakeholders.

Advanced playbooks like this one improve the overall efficiency of a more basic playbook's flow.




375 - Domain Blocking Advanced
Incident Response
This advanced playbook is suitable for domain-blocking use cases.

The playbook performs CTI activities on your technologies and automatically blocks a malicious URL if it finds it in your environment.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




374 - DNA Evidence Analysis Advanced
DNA Analysis
This playbook helps when a forensic DNA analysis is needed.




373 - DLP Alert Advanced
Data Breach
This playbook receives a DLP alert that includes the source and destination addresses and hash value(s).

The playbook performs the following steps:

Gathers enrichment information on the source user name and address
Queries a threat intelligence service for the destination address - upgrades incident priority for known threats and prompts analysts with User Choice to block the destination address
Queries EDR for processes accessing the file (by hash), then checks them against threat intelligence - prompts analysts with User Choice to block the process by hash if it is a known threat

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




372 - DDoS Spoof Advanced
Denial of Service
This advanced playbook is suitable for distributed denial-of-service use cases.

The playbook performs an initial check to verify the traffic and the source IPs. If they exceed a certain threshold, the execution continues by carrying out a second search and checking the use of the server (under attack) resources via SSH.

The playbook also performs CTI activities to determine whether the source IPs are malicious. It presents all the collected data in User Choice, allowing the analysts to block the sources.

In case of a stopped attack or false positive, the SOC will receive an email containing the report related to the events.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
371 - DDoS Advanced
DDOS
An advanced distributed denial of service is a severe type of DDoS attack where attackers try to prevent the legitimate use of a service. These types of attacks come in two forms: attacks that crash services and attacks that flood services to the extreme so that they become unavailable.

This playbook allows you to deal with this type of attack by using services such as VirusTotal, FireEye, Cuckoo Sandbox, McAfee, and more.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
370 - Data Breach Security Incident Advanced
Data Breach
This playbook is best suited for use in the event of an advanced data breach security incident.

If the playbook detects data breach-related events in the firewall or SIEM, it automatically performs CTI activities to track and identify the source of the violation. It prompts analysts to block the source IP and restore the user password.

If the playbook does not find correlations regarding the possible data breach and firewall/SIEM events, it will inform the SOC and the original user.

If the source user does not recognize the activities, the playbook creates a task automatically, allowing the user to decide how to proceed. Otherwise, the incident will be closed as a false positive.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




369 - Critical Vulnerability Advanced
Vulnerability
This playbook works best when there's a discovery of an advanced or critical vulnerability/flaw.

After receiving values from the endpoints, if there's a critical IoC, the playbook will target and analyze all the endpoints on the network.
If it identifies this vulnerability, it will search for related events in the SIEM. It will check all the possible correlations between this vulnerability and possible exploit attempts, creating a risk-scoring activity.

If the playbook doesn't identify the vulnerability, it will allow analysts to conduct a VA through Qualys to confirm whether there are any potential risks associated with it.

The playbook notifies the service engineers by email if the vulnerability is present. If it's not present, they will receive an email informing them that it has already been patched.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




368 - Connection to Malicious IP With McAfee Advanced
Malicious Activity
This playbook starts with an alert received from McAfee. It performs data enrichment and initiates an automated investigation that includes verification of the suspected malicious IP.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




367 - Change Ownership Advanced
General
This playbook implements user segregation by using the possibility of changing ownership in case of a phishing attack. It includes multiple incident containment options.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




366 - Business Department Assignment and Notification Advanced
Critical
This playbook handles multiple SIEM alerts for the business or any other department and assigns tasks such as network investigation, forensic analysis, or system operation investigation. It adds additional checks if the business department is not included.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




365 - Brute-Force Attack Advanced
Unauthorized Access
This playbook is for cases when a threat actor manages to evade the existing prevention systems or when they are entirely missing.

The investigation begins with receiving a SIEM alert. Unlike its simpler counterpart (PB#10), this playbook includes an additional IoC verification. The reason is to confirm that all the information for an automated investigation is at the analysts' disposal.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




362 - Anti-VM Playbook Advanced
Malware
This playbook's primary purpose is to enable malware analysis by automating the discovery of anti-debug tricks in files using Python scripts. It targets anti-debugging techniques such as:

Flag checking & system calls (IsDebuggerPresent, PEB debugger flag, and more)
Structured/vectored exception handling
Threat control
The playbook gives you the possibility to detonate a file if a YARA attachment rule is implemented.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




364 - AV Infection Detected Advanced
Malware
This playbook activates when your AV detects a repeated infection, and the SIEM notifies you about it. It performs data enrichment using various sources and applies an appropriate containment action.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




363 - Antivirus Infection Advanced
Malware
This playbook should be executed in case of an antivirus repeat infection. Unlike its more basic counterpart (PB#5), it includes additional hash analysis integrations.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




361 - Anti-Debug Advanced
Malware
This playbook's primary purpose is to enable malware analysis by automating the discovery of anti-debug tricks in files using Python scripts. It targets anti-debugging techniques such as:

Flag checking & system calls (IsDebuggerPresent, PEB debugger flag, and more)
Structured/vectored exception handling
Threat control
If debug information isn't present, the playbook requires manual action to get the necessary info and proceed with the analysis.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.



** WARNING **

Please note that playbooks are not to be intended as Legal advice, nor they replace a legal opinion
360 - Basic IP Reputation Advanced
Denial of Service
This playbook's purpose is to automatically detect malformed packets when a higher number of them are coming from different IPs. The playbook allows you to block the IP addresses (using the appropriate technology) through User Choice.




359 - Malware Sandbox Advanced
Malware
This playbook is best suited for malware scenarios that require sandbox analysis.




357 - SentinelOne Threat Automated Triage
Incident Management
This playbook automatically syncs threat data with an incident, enriches the identified file hash, and escalates or deescalates the incident accordingly. If the threat is left unresolved, the playbook will continue to monitor for a status of 'resolved' before closing the incident.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




358 - Check VPN Account Activity - Time Interval Advanced
VPN_Events
This advanced playbook checks a user's VPN activity within a specific time interval.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




348 - IP Enrichment Advanced
Malicious Communication
This playbook is suitable for when you need advanced IP enrichment.




347 - Malicious Outbound Traffic Advanced
Malicious Communication
This playbook is associated with a child playbook — IP enrichment. It is best for cases of malicious outbound traffic.

The playbook notifies the user and the SOC in case of detected malicious IOCs.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




346 - High-Priority Vulnerability Detected Advanced
Vulnerability Assesment
This playbook assists when an advanced high-priority vulnerability is detected. Its parent playbook is "Vulnerability Management — Master."

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




345 - Endpoint Malware Infection Advanced
Malware
This advanced playbook activates when malware is detected on an endpoint.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




344 - Blacklisting a Sender Advanced
Data Breach
This is an advanced playbook that allows you to blacklist a malicious sender. It performs blacklisting by domain, IP address, and URL.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




343 - Brute-Force Attack on Account Advanced
Bruteforce Attack
This playbook is suitable for a brute-force attack on an account use case.




342 - Phishing Email Handling Advanced
Phishing
This playbook is suitable for when you need to execute a phishing email handling workflow.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
341 - SIEM Alerts Advanced
Infection
This playbook activates after receiving alerts from different sources, such as BlueCoat and FireEye.




340 - Stolen Credentials Advanced
Data Breach
This playbook helps with the detection of breached user credentials. It sends a notification to NOC, SOC, and DPO (personal data protection department). It applies remediation automatically, disabling the compromised accounts and sending automated notifications to the on-duty analysts.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




338 - User Account Investigation Active Directory Advanced
Incident Response
You can use this playbook for AD account investigation.

When a new user is created in AD, Cloud SOAR receives an alarm to investigate and obtain all the information related to that user. If the user is legitimate, you can ignore the incident through User Choice. However, if the SOC analyst does not recognize it, the playbook changes the password and disables the user.

This playbook can be extremely helpful for preventing attacks via lateral movement or post-exploitation. It alerts the SOC in case a non-legitimate user has the possibility to conduct a dangerous activity in Active Directory.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




337 - Phishing Attack Advanced
Phishing
You can use this playbook in a phishing attack scenario.

The playbook starts by checking for valid IOCs and defines the severity of the potential phishing email. If all the CTI platforms confirm the IOCs, they are blocked by all your technologies (double-check). But if only VirusTotal confirms the IOCs, they are blocked only by your internal technologies (single check).

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.





336 - Analysis and Remediation of Detected Malware Advanced
Malware
This playbook allows you to process a possible malware infection detected by SIEM (or another detection technology). It includes initial verification of SIEM events.

The alert describes the IP or hostname of the infected machine, the hash value of the malicious file, and the PID of the malicious process running in the infected machine's memory.

The playbook performs enrichment to retrieve details of the user logged on the infected machine and applies remediation automatically, terminating the malicious process (via the PID), isolating the infected machine (quarantine), and banning the hash.

It does an extra AV scan if suspicious events are present on the EDR.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




335 - Firewall-WAF Denial Requests Advanced
Malicious Communication
This playbook activates based on alerts pointing to a firewall/WAF policy violation. It performs initial verification of logs (if present), followed by automated notifications to on-duty engineers to decide and implement appropriate remediation.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
334 - Suspicious User and Brute Force Activity Advanced
Bruteforce Attack
This playbook ingests alerts pointing to a possible brute-force attack, intrusion, or password guessing. It performs preventive activities in Active Directory or other user management technologies, depending on the severity of the affected account. It also performs additional enrichment in SIEM to check past user activity. The playbook applies mitigation and containment under the supervision of users.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




339 - Threat Intelligence from External Source Advanced
Threat Intel
This playbook allows you to run various queries on different sources and check intel regarding IoCs. It stores the results in a CSV file under attachments.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




146 - Torrent Company Policy Infringemenat
Network Anomaly
This playbook was build to prevent downloads through Torrent infringing the company's policy.

Firstable the playbook collect all the datas from the firewall, after that it performs additional checks, like the bandwidth sudden shift, connections on updated p2p and connections towards well-known torrent ports in order to collect all the useful informations.

After that, a management team will be notified and a dedicated task will be created to discuss with the end user and review the incident generated.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




333 - Decision Tree for DoS Advanced
Denial of Service
This playbook uses a decision tree to investigate whether the threshold, impact, and node type related to a suspected DoS attack validate ticket creation or not based on previous alerts.

By parsing an email and extracting different information to evaluate the impact of a DoS attack, the decision tree will check on some of the parsed values to understand which path to take—escalation and creation of a ticket or not. In any case, the playbook will contact the bandwidth service provider as well as the team lead for additional remediation actions if the severity is high.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




136 - PII Breach Prevention Through Cloud SOAR Automation Technology
General
Playbook built to breach Prevention Through Cloud SOAR Automation Technology.

Once the playbook receives the alert, it carries out various CTI activities in order to identify possible suspicious activities (i.e. IP reputation, SIEM logs analysis, and so on).

Once the data has been collected, a task and a user choice are generated in order to offer the analyst the opportunity to take the necessary actions to contain the suspicious activities detected.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




356 - Endpoint Cybersecurity Agent Status Check
CTI
This playbook identifies the presence of agents of different technologies on a specific hostname and sends a notification to the SOC.

The playbook covers technologies such as "Rapid7 InsightVM", "SentinelOne," and "Trend Micro Deep Security." However, it's not limited to these. It allows you to use other technologies that include the use of agents as well.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




355 - CSE Brute-Force on EC2
Brute Force
This playbook investigates a suspected brute-force attack with Sumo Logic Cloud SIEM.

By obtaining an insight from Cloud SIEM, if the number of attempts surpasses the pre-selected threshold, the playbook prompts you with User Choice that allows you to stop the EC2 instance and manually review the incident or send an email notification.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
354 - Certego Enrichments
Incident Management
This playbook allows users to retrieve information about a specific SLUG (incident) from the Certego technologies and store it inside a Cloud SOAR Incident. It also enables them to send all the information to specific email addresses that can use the data for case management purposes or further investigation.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




353 - Bruteforce on Service Advanced
Brute Force
This playbook identifies and blocks brute-force attacks. It's an advanced version that offers a more efficient flow and process.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




352 - Anti-Worm Advanced
Worm Infection
This playbook's purpose is to recognize worms from several indicators, such as very high frequency of local area network communication, automated outgoing emails, etc. It's an advanced version that offers a more efficient flow and process.




351 - Ransomware Advanced
Ransomware
This playbook performs information gathering in the context of a ransomware event. It's an advanced version that offers a more efficient flow and process.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




350 - Phishing Use Case - Malicious File or URL Advanced
Phishing
This playbook works for a phishing scenario, where a malicious file attachment or URL/domain can be processed and analyzed. It's an advanced version that improves the overall flow and process.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




349 - Malware Analysis Advanced
Malware
This playbook's purpose is to perform malware analysis of a possible infection with a manual check. It's an advanced version that improves the overall flow and process.




331 - DoS With Decision Tree Advanced
Denial of Service
The purpose of this playbook is to prevent DoS/DDoS attacks.

When Cloud SOAR receives an alert, it tries to collect initial information regarding the impact of the DoS/DDoS attack and notifies the SOC team if some information is missing. It then gathers data about the involved interfaces and command history and sends the information to the SOC team through email.

Next, the playbook collects all the information from all the previous actions, after which it proceeds with additional activities (i.e., execution of custom scripts, running SELECT query into the DB, and so on).

After the playbook provides all the necessary information, it allows the analysts to conduct extra CTI activities to verify whether the IoCs are malicious, enabling them to decide on the following action by running an additional playbook (20 - Decision tree for DOS in our case).

Once they decide, the playbook can inform the technician or execute additional cmd, depending on the result of the previous playbook execution.

Lastly, the playbook sends an incident summary and creates a User Choice.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.

** REFERENCE**
Sumo Logic Best Practices and internal IR guidelines

** DISCLAIMER**
All Rights Reserved © 2022, Sumo Logic
Duplication of this publication is strictly prohibited without the expressed written consent of Sumo Logic


332 - Threat Intelligence Incoming Alert - Format 1 Advanced
CTI
This playbook ingests CTI alerts referring to malicious IOCs that need to be enriched and blocked. It saves the input as a password-protected zip archive.

If the playbook finds enrichment information, it will continue its running process. Otherwise, it will send a notification.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.

** REFERENCE**
Sumo Logic Best Practices and internal IR guidelines

** DISCLAIMER**
All Rights Reserved © 2022, Sumo Logic
Duplication of this publication is strictly prohibited without the expressed written consent of Sumo Logic


330 - Phishing Usecase Advanced
Phishing
This playbook analyses automatically an incoming suspect email for Phishing, extracts all relevant IOC's, enriches all of them, ask the user if a manual escalation is required and notifies all relevant parties.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes

** REFERENCE**
Sumo Logic Best Practices and internal IR guidelines**


329 - CSE Insights Enrichment Advanced
CTI
This playbook allows you to harvest information from a Cloud SIEM insight and gather data about the entities involved in an incident from different sources. It also enables you to add IOCs information as enrichment to the Cloud SIEM insight if that information is available.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


328 - Port Scan With Kali
Red Team Tools
This playbook executes a port scan automatically using Kali. Once it completes the scan, it saves all the found results in a custom note for future usage.




327 - Web Scan with Kali
Red Team Tools
This playbook was build to automatically execute a web scan using Kali.

Once the scan is completed all the results found will be saved into a custom note for future usage.




311 - Privilege Escalation in AWS - Unauthorized Access
Unauthorized Access
This playbook enriches suspicious events of possible unauthorized access in AWS. It activates when an external IP adds a user to a privileged group (Domain Admins or similar).

Starting with a Sumo Logic Cloud SIEM insight, a high fidelity alert, the playbook begins by saving the access logs in AWS and the duplicated IPs from the events in a CSV file.

Once all the IOCs contained within the alert from the original Cloud SIEM insight have been collected, the playbook carries out two different IP reputation checks using XForce and AbuseIPDB and obtains two different results using Whois and XForce.

Next, the playbook automatically gets the user groups and attributes of the affected user from AWS IAM and automatically analyzes what is collected through a machine choice action.

If the IP reputation has a negative score, the analyst can immediately notify the SOC team and AWS IAM administrator about the compromised user, creating a personalized note with all the details about the user.

Finally, through user choice, which is an analyst decision, you can perform automatic containment, orchestrating AWS IAM and Checkpoint Firewall. The first allows you to remove the user from the group and delete the login profile and the access key, while the second allows you to block the external IP.

Alternatively, you can decide to apply manual containment, and an automatically assigned task will appear in the SecOps Dashboard of the analyst. If the IP was considered non-harmful, the SOC team would be notified, and the incident will be marked as a False Positive.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




326 - Anomalies Detection of EC2 instances with AWS CloudWatch
Incident Response
The playbook starts after CloudWatch detects an anomaly on an EC2 instance. It starts by monitoring the EC2 instance and create a Log Stream collecting all the events happening in the instance. In parallel, it collects demographics of the instance. This information is saved in a note inside the incident and shared with the SOC team via email. In the end, it asks the analyst to block the instance, flag the incident as false positive or continue the investigation.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
325 - AWS GuardDuty Essential
Threat Intelligence
This is an essential playbook used for the AWS GuardDuty Integration.

This playbook will perform some initial Enrichment in regards to Detections/IP Sets/Findings in the EWS environment.

Next, all the data collected will be saved into a note Into the SOAR Incident.

Finally a User Choice will be prompted to the analyst in order to decide what kind of action to perform.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
324 - AWS EC2 Essential
Unauthorized Access
This is an essential playbook used for the AWS EC2 Integration.

This playbook will perform some initial Enrichment in regards to Snapshots/Instances/Security Groups in the EWS environment.

Next, all the data collected will be saved into a note Into the SOAR Incident.

Finally a User Choice will be prompted to the analyst in order to decide what kind of action to perform.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




323 - AWS S3 Essential
CTI
This playbooks monitors all assets guarded by AWS S3. In case of an attack or breach to one of those, a specific containment action will be taken, eventually inviting the analyst to perform additional analysis.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




322 - AWS Security Hub Essential
CTI
This playbook allow to widely search for threats logged by AWS security hub essential. Of course, additional technologies can be added to this. If the threat value is over a certain value established by the company, a containment action will be taken. If not , Cloud Soar will suggest the analyst to do an additional review.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




321 - AWS CloudWatch Essential
Incident Response
This playbook allow to manage queues in AWS Cloudwatch. This workflow shows the different actions that can be performed with the technology. Of course, the workflow can be modified based on customer needs, adding also other external technologies.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




320 - AWS SQS Essential
Incident Response
This playbook allow to manage queues in AWS SQS Queue. This workflow shows the different actions that can be performed with the technology. Of course, the workflow can be modified based on customer needs, adding also other external technologies.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




319 - AWS Route53
Network Anomaly
This playbook was built to enrichment actions with AWS Route53, and automatic creation of records in the application.




318 - AWS CloudTrail Essential
Network Anomaly
This playbook was built to create, edit and manage trails, start and stop logging actions and perform enrichment by lookup for specific events.




317 - Leveraging Threat Intell Data with CrowdStrikeFX
Threat Intelligence
This playbook is meant to help the user to find information (reports in the last week for instance) about a certain threat using CrowdStrike Falcon X integration.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




316 - Attachments Threat Intel with CrowdStrikeFX
Threat Intelligence
This playbook is meant to upload a file attached to an email to the Crowdstrike Falcon X platform, perform the scanning and, based on the verdict, notify the person in charge of what happened with simplified details.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




315 - EDR Alert Enrichment
Forensic
This playbook should trigger when EDR sends a tagged email notification that informs the user about a suspicious website he/she accessed and to stop the navigation until new info about the accessed website is obtained. In the end, based on the scores, the user will obtain the results in a comprehensive language.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




314 - SM Libraesva
Phishing
This playbook starts with an incoming email. In the first step, it collects detailed information about the received email using Libraesva.

The flow continues by extracting attachments from the email and saving them within the incident so the playbook can perform further analysis. From there, the enrichment phase continues, allowing you to leverage the capabilities of various technologies to run a file reputation check on the attachments and an IP/Domain reputation check to find more information about the source. The obtained results are processed automatically to categorize the email.

In case of a potential phishing attack, the playbook sends an email to the security team and creates a task with the report related to the just performed analysis. In case of a false positive, without wasting time, SOAR sends an email notification and closes the incident automatically.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




313 - FortiProxy Essential
CTI
This playbook automates the analysis and containment processes using the FortiProxy technology.

The playbook execution can vary depending on the activities of the user involved in the accident and based on different conditions. Where it's necessary to allow traffic, the playbook creates a policy that enables the user to continue browsing. Otherwise, it implements a new policy that blocks traffic.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




312 - Email Enrichment With Mail Tools
CTI
This playbook was built to automatically extract all the IOCs contained in an email using the Mail Tools integration and perform enrichment actions.

If one or more IOCs are malicious, a User Choice will prompt the user to automatically or manually do the containment actions. Otherwise, the Incident will be reported as a false positive.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




279 - FireEye Email Security (EX) Essential
Incident Response
This playbook performs enrichment activities with FireEye Email Security.




263 - Panda EDR Essential
Incident Response
This playbook is used to integrate Cloud SOAR with Panda EDR, which allows the platform to get information about the device's security and, based on that, take some specific containment actions that can mitigate the threat and avoid propagation.




310 - Alpha Mountain Essential
Threat Intelligence
This is an essential playbook that enriches incidents with the Alpha Mountain technology.

The playbook starts by performing various enrichment actions on a particular URL/domain, which helps us gather different information, such as threat score, category, likely impersonations, and popularity.

All these details can be saved in an incident field and as a note inside an incident.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




309 - [RED TEAM] - Automatically VA and First Active Reconnaissance Activity
Red Team Tools
This playbook allows you to automate the first activities of active reconnaissance and collect the initial information necessary to start a penetration test activity.

Once it sends the email with the host you want to scan, if the SOC analyst authorizes the scan through User Choice, the playbook, interfacing with Kali Linux, will collect specific information about the machine using specific Nmap commands.

Where the web service is present on the host (TCP ports 80 and 443), the playbook will use other open source tools to deepen the scan, such as Nikto and Gobuster.

Lastly, the playbook collects the data and saves it in special notes.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




308 - Page Duty Engineers, via Phone Call With Twilio
Incident Management
This playbook contacts the on-call staff member if there is a need for intervention on their part during non-working hours.

Thanks to Twilio, the playbook makes the first call. If the on-call answers, they will have to answer the User Choice prompt too and confirm that they are present at their station. Otherwise, the playbook makes two more call attempts, after which an email will notify the on-call staff member's manager about the incident.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




307 - Crane Pool Supervision - IoT
IOT
This playbook allows you to monitor a set of docks and cranes for unloading ships and trains for alarms. If a malfunction is reported, the crane is diagnosed, the emergency squad alerted and the dock put in OFF mode. The ship traffic is diverted to a different dock, and the playbook distributes appropriate notification to Traffic Control.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




306 - VMware Carbon Black EDR Essential
Malware
This playbook allows you to enrich files with VMWare Carbon Black EDR.

The playbook gets all the data from the platform in the first enrichment action. Then, it processes the details by searching for alerts already triggered in Carbon Black and the list of processes running on a specific machine.

In the last phase, the playbook creates a note with all the details for analysts to categorize the file correctly.




305 - MISP OIF Essential
Threat Intelligence
This playbook allows you to enrich incidents with MISP threat intelligence information.

It checks MISP for a specific attribute/object and whether it's already there.

The playbook adds the missing attribute and enriches the incident with the appropriate information contained in a note.




304 - Qualys Essential
Threat Intelligence
This is an essential playbook that allows you to enrich incidents using Qualys.

The playbook uses a condition to determine whether an asset is already present in Qualys. If it's not, it adds it. The playbook performs a VM scan in both cases (present or not).

In the final stage, the playbook gets the scan results and adds them as a note inside the SOAR.




303 - Get Reports at Given Periods of Observation
Incident Management
This playbook allows creating reports with specific technologies chosen by the customer at particular periods. In the end, it sends all the information to the right team.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




302 - Get Counter of Incidents From Various Technologies
Incident Management
The purpose of this playbook is to collect the counter of incidents from various technologies (adaptable based on customers' needs), excluding counters that touched zero, store them all in notes and then send them to the person in charge.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




301 - Threat Crowd Essential
Threat Intelligence
This is an essential playbook that allows you to enrich incidents using the Threat Crowd platform.

The playbook runs various enrichment actions to get threat intelligence details, depending on the found IOCs. In the case of domains, it performs an IP search right after the domain search.




300 - ThreatConnect Essential
Threat Intelligence
This is an essential playbook used to enrich incidents using the ThreatConnect platform.

The found IOC can be searched in ThreatConnect to gather information.

Based on the context of the alert and analysis done by the analysts, they can decide to update the object and set the appropriate parameters.




299 - ArcSight ESM Essential
Incident Management
This is an essential playbook used to create cases, get case details and update case information in ArcSight ESM.




298 - Freshservice Essential
Incident Management
This is an essential playbook used to create tickets and preview and update information in Freshservice.




297 - Zendesk Essential
Incident Management
This is an essential playbook used to create tickets, get ticket details and update information in Zendesk.




296 - ServiceNow Essential
Incident Management
This is an essential playbook used to create tickets, preview them and update information in ServiceNow.




295 - IBM Maximo Essential
Incident Management
This is an essential playbook used to create tickets, preview details and update information in IBM Maximo.




294 - Malwarebytes Nebula
Incident Response
This playbook allows you to verify Exclusions and preview information about specific Endpoints. It follows up with Remediation Activities and updates Exclusions accordingly in Malwarebytes Nebula.




293 - Jira Essential
Incident Management
This essential playbook allows you to create an issue and preview and update information in Jira.




292 - IBM MSS Tickets Essential
Incident Management
This is an essential playbook used to create tickets and preview and update information in IBM MSS Tickets.




291 - ThreatQ Essential
Threat Intelligence
This is an essential playbook that you can use to enrich incidents using the ThreatQ platform.

The playbook starts by searching for an object. When it finds it, it uses a condition to check whether it's already in the ThreatQ platform.

If the object is there, the playbook allows us to add attributes and update the status of that object.

Otherwise, it creates the new object as one of the three entities (indicator, event, adversary) and adds related attributes and statuses.




290 - URLscan.io Essential
Threat Intelligence
This is an essential playbook used to enrich incidents with URLscan.io.

The playbook will collect the desired URL and launch three different enrichment actions using URLscan.io. It will store the results in the notes of the incident.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




289 - ZeroFOX Essential
Threat Intelligence
This is an essential playbook that you can use to manage ZeroFOX alerts in Cloud SOAR. Typically, we suggest setting filters when configuring the daemon and further enriching the data with other threat intel technologies.

The playbook will get an alert from ZeroFOX and assign it to a user. Then, it will ask the user to review and update the alert.




288 - ZScaler - Web Navigation Filtering
Threat Intelligence
This playbook allows you to integrate the ZScaler technology and automate containment processes using Cloud SOAR.

When a user tries to view a particular website and Cloud SOAR receives input that generates an incident, the playbook proceeds to collect categories present on ZScaler.

Once the playbook obtains the necessary information, if a category is allowed, it checks the whitelist from ZScaler and creates a User Choice. The User Choice invites the SOC Analyst to perform the action they consider to be the most appropriate.

If the category is not allowed, the playbook gets the ZScaler blacklist. As in the previous case, it creates a User Choice that presents the SOC Analyst with four different options depending on the incident.

Once the analyst makes a choice, the playbook sends an email to the SOC Manager notifying him of what happened. In the end, it creates a task to review the created incident.




Installed
287 - Brute-Force Attempt on AWS
Brute Force
Once it receives a brute-force alert from GuardDuty, this playbook will create an issue on Jira and populate it with the relevant information. After that, it will notify the resource owner, asking for justification or termination of its instance. Lastly, it performs a scan in the auth logs of the owner to complete the investigation.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




286 - VMRay Essential
Threat Intelligence
This playbook allows you to use the VMRay technology with Cloud SOAR for malware detection and analysis purposes.




285 - Palo Alto WildFire OIF Essential
Threat Intelligence
This playbook utilizes the Palo Alto WildFire technology to gather file intelligence data during an incident investigation.




284 - Lastline Analyst Essential
Threat Intelligence
This playbook uses the Lastline AI-powered sandboxing technology to inspect malicious files through workflow automation with Cloud SOAR.




283 - FireEye AX Essential
Threat Intelligence
This playbook uses FireEye AX technology to inspect malicious files through workflow automation with Cloud SOAR.




282 - Cisco Threat Grid OIF Essential
Threat Intelligence
This playbook uses the Cisco AMP Threat Grid technology to retrieve information on incident items such as IP, domain, and file hash by workflow automation with Cloud SOAR.




281 - CrowdStrike Incident Remediation
Incident Response
This playbook helps you remediate an incident ingested by CrowdStrike. It allows prompt communication among everyone involved and quick remediation based on the retrieved information.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes





280 - Proofpoint TAP Essential
Incident Response
This playbook allows you to get information about phishing campaigns with Proofpoint TAP.




278 - FortiMail Essential
Incident Response
This playbook is designed to perform enrichment activities with FortiMail and allowing the analyst to decide which containment action to take.




277 - Suspicious User Login Outside Working Hours
Intrusion
This playbook handles logins outside working hours.




265 - Trend Micro APEX ONE Essential
Incident Response
This playbook was built to enrich incidents and contain suspicious events and alerts coming from Trend Micro APEX ONE EDR.




264 - Suspicious EDR Events
Incident Response
This playbook was built to enrich incidents and contain suspicious events coming from EDRs. Here we're using Qualys, but customers can replace it according to their needs.




262 - Cisco AMP for Endpoint Essentials
Incident Response
This playbook handles suspicious machine behavior with the help of the Cisco Secure Endpoint (formerly AMP for Endpoints) technology.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




261 - CrowdStrike Falcon Essential
Incident Response
This playbook handles suspicious machine behavior with the help of some essential CrowdStrike mitigation activities.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




276 - DDoS - additional blocking with Forcepoint
DDOS
This playbook can be executed in case of a suspected distributed denial of service attack.

It starts by performing a check to verify traffic and source IPs. If these exceed a certain threshold, the playbook execution continues with a second search. After that, it checks the use of the server resources under attack via SSH.

Next, if the Forcepoint technology is available in the instance, the playbook can mark a policy on FP that blocks and prevents the suspected IPs from doing additional damage.

Subsequently, the playbook assesses the actual state and evaluates whether the attack is still active. If it is, the playbook performs CTI activities to detect whether the source IPs are malicious. It includes all the collected data in User Choice, and it gives the analyst the possibility to block the sources.

In the event of a ceased attack and false positive, the SOC will receive an email containing the report relating to the events.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




275 - Joe Sandbox Essential
Threat Intelligence
This playbook was created for conducting CTI activities using the Joe Sandbox technology. It allows you to analyze suspicious files and URLs during incident investigation.






274 - FortiSandbox Essential
Threat Intelligence
This playbook was created to integrate and use the fundamental actions of FortiSandbox via Cloud SOAR.

FortiSandbox is a detection tool with threat prevention capabilities. It's AI-based, and it helps security professionals tackle some of the most dangerous types of malware threats currently, such as ransomware and crypto-malware.




273 - Cuckoo Essential
Threat Intelligence
This playbook was build to utilize Cuckoo sandbox to detonate potentially malicious files and URLs during an active investigation.




272 - CrowdStrike Falcon SandBox
Threat Intelligence
This playbook was built to perform CTI activities using CrowdStrike Falcon Sandbox—a malware analysis tool providing threat intelligence.

​

271 - ANY.RUN Essential
Threat Intelligence
This playbook was built to gather detonation data for files and URLs using ANY.RUN.




270 - Splunk OIF Essential
Incident Management
This playbook was built to search for events in Splunk and update or modify an event.




269 - Securonix Essential
Incident Management
This playbook was built to search for events in Securonix, perform basic queries of relevant alerts and follow up on the incident response process.




268 - McAfee ESM Essential
Incident Management
This playbook was built to search for events in McAfee ESM, perform basic enrichment and follow up on the incident response process.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




267 - IBM QRadar Essential
Incident Management
This playbook was built to search for events in IBM QRadar, perform basic enrichment and follow up on the incident response process.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




266 - FortiSIEM Essential
Incident Management
This playbook was built to search for events in FortiSIEM, perform basic enrichment and follow up on the incident response process.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




260 - Microsoft Exchange Web Services Essential
Incident Response
This playbook was built to manage your incidents performing actions on Microsoft EWS mailboxes, accounts and security settings.




259 - Gmail Essential
Incident Response
This playbook was build to manage your Incidents using the Gmail technology interacting with users, roles, filters, mail messages and attachments.




258 - URLHaus Essential
Threat Intelligence
This playbook was built to query domains, URLs and hash values with the URLhaus technology.




257 - Digital Shadows Essential
Threat Intelligence
This playbook was built to perform queries with the Digital Shadows threat intelligence technology.




256 - Cofense Essential
Threat Intelligence
This playbook was built to search with Cofense for Threats and download Threat Reports.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




255 - GreyNoise Essential
Threat Intelligence
This playbook leverages GreyNoise to evaluate possible malicious IPs and notify the SOC team. GreyNoise tells security analysts what alerts and activities they should ignore by allowing them to curate data on IPs that saturate security tools with noise.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




254 - Exana Open DNS Essential
Threat Intelligence
This playbook allows you to query Exana Open DNS for DNS records and add the queried information to an incident.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




253 - PassiveTotal Essential
Threat Intelligence
This playbook leverages a PassiveTotal WHOIS action to increase or decrease incident severity.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




252 - EclecticIQ Essential
Threat Intelligence
This playbook allows you to use EclecticIQ, which offers state-of-the-art CTI technology for large enterprises, governments and MSSPs.




251 - Knowbe4 Essential
Threat Intelligence
This playbook allows you to utilize findings from KnowBe4 security awareness training events during an incident investigation.




249 - Pulsedive Essential
Threat Intelligence
This playbook is designed to perform enrichment and threat intelligence activities with Pulsedive.




248 - Hybrid Analysis Essential
Threat Intelligence
This playbook is designed to perform enrichment and threat intelligence activities with Hybrid Analysis.




247 - DomainTools Essential
Threat Intelligence
This playbook is designed to perform enrichment activities with DomainTools.




246 - Cisco Umbrella Investigate Essential
Threat Intelligence
This playbook was built to gather enrichment data on incident observables using Cisco Umbrella Investigate.




245 - Blueliv Essential
Threat Intelligence
This playbook was build to enrich incident evidence with threat intelligence data from Blueliv.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




244 - Cisco Threat Grid Essential
Threat Intelligence
This playbook was built to utilize Cisco AMP Threat Grid to retrieve information about incident elements such as IP, domain and file hash.




243 - VirusTotal Essential
Threat Intelligence
This playbook was build to perform threat intelligence evidence gathering with VirusTotal.




242 - APIVoid Essential
Threat Intelligence
This playbook was built to use APIVoid to gather enrichment data during incident investigations.




241 - IP Quality Score Essential
Threat Intelligence
This playbook was build to perform threat intelligence evidence gathering with IP Quality Score.





240 - AlienVault OTX Essential
CTI
This playbook was built to enrich incident evidence with threat intelligence data from AlienVault OTX.




239 - IBM X-Force Exchange Essential
CTI
This playbook was built to enrich incident artifacts with intelligence data from IBM X-Force.




238 - Recorded Future Essential
CTI
This playbook was built to utilize Recorded Future threat intelligence feeds during incident investigation.




236 - CSE - Suspicious Linux Command
Intrusion
This playbook was built to prevent intrusion attempts.

Getting the insight details from Cloud SIEM, the playbook will be doing multiple checks filtering the results by IP, user activity, and geolocation.

Once the initial enrichment is done, the event can be processed with a logical condition for further investigation and User Choice for containment activities or marked as a false positive alert.




235 - AbuseIPDB Essential
CTI
This playbook enriches IP addresses with reputation information gathered from AbuseIPD.




234 - VirusTotal OIF Essential
CTI
Playbook designed to conduct threat intelligence activities with VirusTotal




233 - CrowdStrike Falcon Sandbox & AlienVault analysis - File Submission
CTI
Submit a File for analysis and Download appropriate reports or Get a Summary of Submission using CrowdStrike Falcon SandBox integration, with additional information coming from AlienVault.




232 - Block Domain - Cisco Threat Grid OIF
Network Anomaly
This playbook is design to block a domain on Cisco Threat Grid




231 - Block Domain - Stormshield
Network Anomaly
This playbook is design to block a domain on Stormshield




230 - Block Domain - Cisco Umbrella OIF
Network Anomaly
This playbook is design to block a domain on Cisco Umbrella




229 - Block Domain - Firewall Tools
Network Anomaly
This playbook is designed to block a domain with firewall tools.




228 - Block Domain - Mimecast
Network Anomaly
This playbook is design to block a domain on Mimecast




227 - Block Domain - NG Firewall
Network Anomaly
This playbook is design to block a domain on NG Firewall




226 - Block Domain - Check Point OIF
Network Anomaly
This playbook is designed to block a domain with Check Point Firewall.




225 - Block IP - Firewall Tools
Network Anomaly
This playbook is design to block an ip on Firewall Tools




224 - Block IP - Palo Alto Panorama OIF
Network Anomaly
This playbook is designed to block an IP with Palo Alto Panorama.




223 - Block IP - NG Firewall Security
Network Anomaly
This playbook is designed to block an IP with NG Firewall Security.




222 - Block IP - Check Point OIF Security
Network Anomaly
This playbook is designed to block an IP with Check Point OIF Security.




Installed
221 - Block IP - Forcepoint Web Security
Network Anomaly
This playbook is designed to block an IP with Forcepoint Web Security.




220 - Block IP - Pulse Secure
Network Anomaly
This playbook is designed to block an IP with Pulse Secure.




219 - Block IP - Palo Alto NGFW OIF
Network Anomaly
This playbook is design to block an ip on Palo Alto NGFW.




Installed
218 - Block IP - McAfee Web Gateway OIF
Network Anomaly
This playbook is designed to block an IP with McAfee Web Gateway.




217 - Block Account - Generic
Incident Response
This playbook is designed to block a specific user found in Active Directory.




216 - Account Enrichment - Generic
Incident Response
This playbook is designed to enrich a user found in Active Directory.




215 - Passive Reconnaissance - Account User
CTI
This playbook was built to conduct passive reconnaissance activities automatically using a domain or an IP. It's useful for carrying out quick investigations if you suspect that a user's account was exposed via the internet (e.g., a customer website).




214 - Passive Reconnaissance - Domain User
CTI
This playbook was built to conduct passive reconnaissance activities automatically using a domain or an IP. It's useful for quick investigations if you suspect that your domain account has been compromised.




213 - Passive Reconnaissance - Email
CTI
This playbook was built to conduct passive reconnaissance activities automatically using a domain or an IP. It's useful for quick investigations if you suspect that your email account has been compromised.




212 - Passive Reconnaissance - General
CTI
This playbook was built to conduct passive reconnaissance activities automatically using a domain or an IP.

The playbook is useful for carrying out quick investigations after suffering an attack. It allows you to investigate the source IP that caused the attack and, through quick enrichment actions, find out whether the involved IP/domain was compromised.




211 - Passive Reconnaissance - Essential
CTI
This playbook was build to automatically conduct Passive Reconnaissance activities using a domain or IP.

Useful for quickly investigating a domain in case you suspect it has been damaged / hacked.




210 - Group Membership Update
Incident Management
This playbook will update user group permissions based on Okta group.




209 - Deactivate User In Active Directory
Incident Management
This playbook will check for the user we want to deactivate.

When found the playbook will disable the user and send a mail to it department.




208 - Create User In Active Directory
Incident Management
This playbook will check for the new user we want to create.

If it's not found the playbook will create and initialize the new user in Active Directory.




207 - Email Headers Check - Generic
Phishing
This playbook is used to check an email header using mxtoolbox spf dmark and dkim functionalities and microsoft antispam headers.

Once the results are extracted they are saved in notes and and added to an incident field.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




206 - Email Address Enrichment - Generic v2.1
Phishing
This playbook is used to parse email into internal and external.

Internal emails will be enriched with information about the users.

External emails will be enriched with threat intelligence feed about the domains found.




205 - Detonate File - Joe Sandbox
Malware
This playbook is used to perform file ingestion and analysis using Joe Sandbox integration. The results wil be saved in notes.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




204 - Detonate File - FireEye AX
Malware
This playbook is used to perform file ingestion and analysis using FireEye AX integration. The results will be saved in notes.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




203 - Detonate File - Cuckoo
Malware
This playbook is used to perform file ingestion and analysis using Cuckoo Sandbox integration. The results wil be saved in notes.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




202 - Detonate File - Hybrid Analysis
Malware
This playbook is used to perform file ingestion and analysis using Hybrid Analysis technology. The results wil be saved in notes.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




201 - Detonate File - ANYRUN
Malware
This playbook is used to perform file ingestion and analysis using the ANY.RUN sandbox technology. The results will be saved in notes.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




192 - User Offboarding
General
This playbook is used for disabling user access to AD and reassigning incidents in the SOAR.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




191 - Remedy Change Management
General
This playbook is triggered by fetch from Remedy and will help you manage and automate your change management process.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




190 - ServiceNow Change Management
General
This playbook is triggered by fetch from ServiceNow and will help you manage and automate your change management process.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




189 - Zendesk Change Management
General
This playbook is triggered by fetch from Zendesk and will help you manage and automate your change management process.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




188 - Cloud SOAR - Vulnerability Management Enrichment
Vulnerability Assesment
This playbook will look up an IP address in Tenable.io or Rapid7 InsightVM.

The results will be saved in notes.




187 - Cloud SOAR - CMDB Enrichment
CTI
This playbook will look up a CI in ServiceNow CMDB by IP.

The results of the search will save the date in notes




185 - Convert file hash to corresponding hashes
Threat Intel
Gets all of the corresponding hashes for a file even if there is only one hash type available. For example, if we have only the SHA256 hash, the playbook will get the SHA1 hash and MD5 hash as long as the original searched hash is recognized by any our the threat intelligence integrations.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




184 - Cisco FirePower - Append network group object
Network Anomaly
This playbook will append a network group object with new elements (IPs or network objects).

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




183 - Jira Change Management
General
This playbook is triggered by fetch from Jira and will help you manage and automate your change management process.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




182 - Cloud SOAR - Check Action Status
Threat Intelligence
This playbook is useful to execute shell commands using the appropriate unix/linux integration.

The playbook is Ideal for nesting it in a more complex playbook but can also be used as a standalone.




181 - Cloud SOAR - Delete file
Threat Intelligence
This playbook is useful to delete a specified file and retrieve the results.

The playbook is Ideal for nesting it in a more complex playbook but can also be used as a standalone.




180 - Cloud SOAR - Block File
Threat Intelligence
Use this playbook to add files to Cloud SOAR block list with a given file SHA256 playbook input.

The playbook is Ideal for nesting it in a more complex playbook but can also be used as a standalone.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




179 - Opswat Metadefender File Search
Threat Intelligence
This playbook will perform File searches based on the name of the file.

The results will be saved into the notes of the incident.




178 - Opswat Metadefender File Download
Threat Intelligence
This playbook will perform File searches based on MD5 or SHA256 Hash.

The results will be saved into the notes of the incident.




177 - Carbon Black Rapid IOC Hunting
CTI
This is a simple but effective playbook to hunt a File into the Carbon Black Database

The results will be saved into the notes of the incident.

The playbook is Ideal for nesting it in a more complex playbook but can also be used as a standalone.




176 - Get Email - EWS
General
Retrieves the original email and its headers and attachments (if any). Stores the information in incident fields or notes.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes





175 - Get Email - Gmail
General
Retrieves the original email and its headers and attachments (if any). Stores the information in incident fields or notes.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




173 - Active Directory Investigation
Lateral Movement
This playbook was created to enrich an incident with details from Active Directory and investigate potentially suspicious activity.

The playbook will run and enrich the data about the User/Access List/Groups/Trees/Schemas/Object Accesses and save all the information in notes.

Next, an email will be sent to the analyst, prompting them to perform an investigation using the retrieved data.

User Choice will ask the analyst to determine whether the account was compromised. In addition, they will be asked whether they want to block the user.

If the account is compromised, an email will be sent to the user and the manager.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




172 - PCAP Search
Threat Intelligence
This playbook was created to enrich an incident with details about a downloaded PCAP file.

The playbook will run and enrich the data about the TCP/UDP Port, IPs, Protocol and Query used to retrieve the PCAP File.

You can choose to extract all the data and send it through email.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




171 - Expanse VM Enrich
Vulnerability Assesment
This playbook was created to scan vulnerabilities of a specific asset using Tenable and Nexpose technologies.

The playbook will run and perform scans using Tenable and Nexpose.

You can choose to extract all the data and send it through email.




170 - Endpoint Investigation Plan
Threat Intelligence
This playbook was created to organize and Plan an Endpoint Investigation.

The playbook will run and the analyst will have to choose to analize and hunt by indicators (Attackers IP, Attacked Host, Hash File) or by MITRE Tactics.

When choosing the right Tactic the related playbook will run, we can also play all tactics' playbooks.

At the end in both cases Notes will be added with results and an email will be sent to a specific email address.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




169 - Palo Alto Networks - Endpoint Malware Investigation v3
CTI
The playbook performs host enrichment for the source host with Palo Alto Networks technologies and automatically performs file detonation for the extracted file.

The playbook will run and enrich the incident with some basic information. Next evaluation of Severity will run and the analyst will be asked to decide if it's a true positive or not. Next he can choose to apply some remediation policies based on host isolation, block of url/ip/ports or application.

Finally notes and a final task to review the incident will be added.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




Installed
168 - Port Scan - Generic
Port Scanning
Investigate a port scanning incident. The incident can come from outside or inside the network.

This playbook plans to conduct several queries based on the IP source (external or internal) to extract all information from the source device (replaceable with SIEM / SOAR / FW / any supported technology).

Once the severity is set, the SOC analyst can update the locked ports contained in the incident.

As a final, the incident will be manually reassigned / to a higher level and closed.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




167 - Extract Indicators From File - Generic v2
CTI
This playbook extracts indicators from a file. Supported file types:

CSV

PDF

TXT

HTM, HTML

DOC, DOCX

PPT

PPTX

RTF

XLS

XLSX

XML

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




165 - Vulnerability Handling - Nexpose
Threat Intel
Manages vulnerability remediation using Nexpose data, and optionally enriches data with 3rd-party tools.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




174 - Calculate Severity - Standard
Incident Response
This playbook was created to update the Severity of the Incident by taking into consideration also the Impact of the Incident.

The playbook will run and check the Severity, will ask the user to categorize the Impact (Localized, Spread, Wide). Based on the Impact selected the Incident Severity will update accordingly:

Low+Localized= Low

Medium=Localized=Low

High+Localized=Medium

Low+Spread=Low

Medium+Spread=High

High+Spread=High

Low+Wide=Medium

Medium+Wide=High

High+Wide=High

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




166 - CVE Enrichment - Generic v2
Red Team Tools
Performs CVE enrichment using the following integrations: VulnDB, CVE Search and IBM X-Force Exchange.

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes




200 - Get Email From Email Gateway - Proofpoint TAP
Phishing
This playbook is used to perform email gathering from Proofpoint TAP integration.




199 - Get Email From Email Gateway - Mimecast
Phishing
This playbook is used to perform email gathering from the Mimecast integration.




198 - Get Email From Email Gateway - Generic
Phishing
This playbook is used to perform email gathering from various sources.




197 - Get Email From Email Gateway - FireEye
Phishing
This playbook is used to get allerts and emails from fireye ex and cm.




196 - File Enrichment - VMRay
Malware
This playbook is used to perform deep analysis on files using vm ray technology. The results will be saved as notes




195 - File Enrichment - Virus Total Private API
Malware
This playbook is used to perform enrichment actions using the VirusTotal Private APIs.




194 - File Enrichment - File reputation
Malware
This playbook is used to perform file enrichment and determine the reputation of a file based on various feeds.

The results will be saved in notes and can be sent by email.




193 - Domain Enrichment - Generic v2 - imported
CTI
This playbook is designed to enrich a domain with reputation, geolocation and general information from various feeds.

The results will be saved in notes and will be sent through email.




164 - Domain-based Message Authentication Reporting and Conformance (DMARC)
Phishing
This playbook expand antiphishing and spoofing capabilities using DMARC Checks.

Domain-based Message Authentication Reporting and Conformance (DMARC) is a technical specification that is used to authenticate an email by aligning SPF and DKIM mechanisms.

By having DMARC in place, domain owners large and small can implement an extra layer of protection against business email compromise, phishing and spoofing

The playbook starts with the parsing and analysis of important information of the email header such as domain, email address and IP.

Next, a combination of checks are performed in order to determine if the email is legit or spoofed.

Finally a user choice scenario is applied in order to let the final analyst decide what path to follow:

none (sends a report to a mail box with results checks)

quarantine (sends the email to spam)

reject (block the email)

This playbook uses some actions available with the Full CSOAR version only but can be downloaded and reconfigured for Automation Service purposes

** DISCLAIMER**

All Rights Reserved © 2022, Sumo Logic

Duplication of this publication is strictly prohibited without the expressed written consent of Sumo Logic


163 - Active Directory Set New Password -Lateral Movement (essential)
Remediation
This playbook was build to set automatically a new password when a user is compromised after a lateral movement attack.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
120 - Ransomware - Malware outbreak, wannacry
Ransomware
Malware - Response to Wannacry Ransomware




133 - Compromised internal host in a hybrid environment
General
This playbook is built to prevent a potentially compromised host.

Searching the Events from AWS, the playbook gives you 2 ways:

- If the Events from AWS contain suspicious events, the additional query will be done in order to collect more information and give the SOC Analysts the possibility to quarantine the infected host

- If the Events from AWS contain multiple login tentatives, the playbook run a nested playbook in order to set a new password on Active Directory

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




112 - Basic Attack Triage
General
This playbook is useful to use as a master in order to execute multiple nested playbooks in case of multiple events.

On the playbook are described some possible kinds of events, for example:

- Failure Audit

- Virus Events Detected

- Firewall Denies

For each of these events is set up a specific nested playbook that will be executed.

In case the events do not contain any events the playbook provides to create specific tasks to update and validate the triage event created.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




105 - OT_IoT Machinery Hijacking
IOT
Enrichment of the involved machine. Detection of network flows impacting that machine and remediation applied under the control room supervision.

Once the first enrichment actions are done, the condition verify the presence of some commands that can be suspicious, like "Modbus", "address 254" or "register 2800" and in case this commands/values are contained a dedicated user choice and nested playbook will be executed to check and verify thought the SIEM if the alert is a false positive or a cyber attack is ongoing.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




117 - Industrial Security
General
This playbook provides to analyze the logs presented on Alleantia and Cyber Vision for threshold exceeded after a defined period of time.

In case the logs are present multiple suspected information (like unknown host, more than a number of activities, and so on) the playbook gives the possibility to take 2 possible ways:

- Performing additional Query using a nested playbook and executing all the containment actions

- Consider the host trusted and update Cisco Cyber Vision with the new trusted host information

If the initial condition failed, a task and an additional user choice are created in order to give the user the possibility to reset the machine parameters.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




104 - Blueliv Stolen Credit Cards
Malware
Detection of compromised credit cards in a specific date range and engagement with the anti-fraud department for remediation.

This is the master playbook that contains the nested playbook 'Contact cardholders and blocks Credit Cards' in order to collect all the information.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




95 - Zoom Conferencing Security Check - Master
General
This master playbook checks all live, scheduled, and upcoming meetings for a meeting password. If the password is not present, a nested playbook is invoked which will generate a random password, assign it to the meeting, and send out an email notification of the updated password to all invited users.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




32 - Events Deduplication
General
A credibility test in which emails come from SIEM reporting different security events and event deduplication is performed.




90 - Vulnerability Management - Master
Vulnerability
Test
98 - Zoom Upcoming Meeting Update
General
These playbooks are nested to the '95 - Zoom Security Check Runbook'.

They use a script to generate a random password, pass the random password to the update meeting password action, pull the meeting’s original invite, and email all recipients with the new meeting password.




96 - Zoom Scheduled Meeting Update
General
These playbooks are nested to the master playbook '95 - Zoom Security Check Playbook'.

They use a script to generate a random password, pass the random password to the update meeting password action, pull the meeting’s original invite, and email all recipients with the new meeting password.




47 - Malicious Outbound Traffic
Malicious Communication
Playbook associated with a child playbook - IP enrichment, to follow a use case in case of malicious outbound traffic.

Notify the user and the SOC in case of malicious iOCs detected

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




24 - DoS with Decision Tree
Denial of Service
This playbook is built to prevent DoS/DDoS attacks.

Once the Cloud SOAR receives an alert, collecting the first information regarding the impact of the attack, the interfaces coinvolted, and the list of the history commands and we inform our SOC by sending an email.

Next, the playbook collect all the information from all the actions that he did into the previous nodes and proceed with additional activities (i.e. execution of custom scripts, run SELECT query into the DB, and so on)

Once we have all the information that we need we conduct extra CTI activities to verify if the IoC's are malicious or not, and then we can proceed taking a decision by running an additional playbook (20 - Decision tree for DOS in our case)

Once the decision is tacked, we can inform the technician or execute additional cmd, depends of the result of the previous playbook execution.

Lastly, the playbook sends a summary and creates a user choice.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.



** DISCLAIMER**
All Rights Reserved © 2022, Sumo Logic S.p.A.
Cloud SOAR is a registered trademark of Sumo Logic S.p.A
Duplication of this publication is strictly prohibited without the expressed written consent of Sumo Logic S.p.A.

** WARNING **

Please note that playbooks are not to be intended as Legal advise, nor do they replace a legal opinion.
162 - SolarWinds Orion - Exploit Mitigation (Supervised Active Intelligence)
Intrusion
This playbook allows you to check for, prevent and contain potential SolarWinds SUNBURST and SUPERNOVA exploitations.

The playbook starts by exploring traffic and searching for relevant alerts. It then creates a manual task to check the updates on the involved servers or workstations. If the traffic from SolarWinds Orion contains the known C&C server “avsvmcloud.com” or the Orion software is not updated, the playbook will:

Conduct a forensic investigation
Examine compromised SolarWinds hosts
Power down network interfaces, ending with a network block containment action
Alternatively, if there are no traces of the aforementioned C&C server, the playbook proceeds to verify the Orion updates and traffic. In addition, it incorporates a helpful note that explains how the SUNBURST and SUPERNOVA vulnerabilities work.

Subsequently, the playbook presents the analyst with two User Choices: the first checks the SolarWinds Orion version and the second looks to verify the presence of the malicious web-shell DLL “app_web_logoimagehandler.ashx.b6031896.dll” on the servers. In case the SOC analyst confirms the SolarWinds versions are vulnerable and the malicious file is present, the playbook executes an automatic scan to check for the presence of specific CVEs.

Lastly, since FireEye researchers have discovered that SolarWinds attackers can move laterally from local networks to the Microsoft 365 cloud, the playbook asks the analyst to monitor Microsoft 365 cloud.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




161 - Search endpoints with Carbon Black
Incident Management
Hunt for malicious indicators using Carbon Black.




160 - Calculate severity - essential
Red Team Tools
Calculates and assigns the incident severity based on the highest returned severity level from the following severity calculations:

Indicators DBotScore - Calculates the incident severity level according to the highest indicator DBotScore.
Critical assets - Determines if a critical asset is associated with the investigation.
3rd-party integrations - Calculates the incident severity level according to the methodology of a 3rd-party integration.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




159 - Endpoint isolation - essential
Incident Response
This playbook will auto isolate endpoints by the device ID that was provided in the playbook.




158 - File enrichment - essential
CTI
This playbook provide to enriches a file using one or more integrations available on your environment.




157 - Multiple file detonation
Incident Response
Detonate URL through active integrations that support URL detonation.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




156 - Calculate severity - multiple vulnerability tools
Red Team Tools
This playbook uses integrations such as Qualys and Nexpose to calculate the severity of an incident and take the appropriate countermeasures.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




155 - Block ip - essential
Intrusion
This playbook blocks malicious IPs using all integrations that are enabled. The direction of the traffic that will be blocked is determined by the XSOAR user (and set by default to outgoing).




Installed
154 - Block file - essential
Intrusion
This playbook parses MD5 hashes that refer to a specific file. If certain suspicious hashes are not on the company's blacklist, the playbook will add them.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




153 - Block email - essential
Phishing
This playbook will block email address at your email gateway.




152 - Block domain - essential
Intrusion
This playbook blocks a potentially malicious domain using all the blocking technologies available inside a specific Cloud SOAR instance.




151 - Block account - essential
Intrusion
This playbook searches for a suspicious user inside the Active Directory server. If it finds it, it blocks the user and sends an email to the engineer on duty.




150 - Account enrichment - essential
CTI
This playbook retrieves data from an Active Directory server and gives all the information related to a specific account as output.




149 - Unisolate Endpoint with Carbon Black - essential
Incident Response
This playbook insolates sensors according to the sensor ID that is provided in the playbook input.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




148 - SolarWind Orion - Exploit Prevention
Intrusion
This playbook remediates a possible SolarWinds exploitation leveraging the backdoors SUNBURST and SUPERNOVA.
Playbook receives alerts from Sumo Logic Cloud SIEM monitoring the network traffic and all security events into SolarWinds.
If the traffic contains the known C&C server “avsvmcloud.com” or the Orion software is not updated, the incident is confirmed as a TRUE POSITIVE and the mitigation starts; it analyze SolarWinds compromised hosts and power down network interfaces, ending with a network block containment action.
If the condition is false and the network traffic does not contact the C&C server, a custom action checks for updates on Orion website, monitors network traffic and creates a useful note where it is explained how the SUNBURST and SUPERNOVA vulnerabilities work. Two user choices are used to verify the impacted versions and the presence of the malicious webshell dll “app_web_logoimagehandler.ashx.b6031896.dll” on the suspect server.
If the SOC analyst answer yes, an automated scan will be executed to check the presence of specific CVEs. Otherwise the case is classified as FALSE POSITIVE.
Finally, as a last task, the playbook creates a ticket for the NOC (in their JIRA) to monitor the Microsoft 365 Cloud because FireEye researchers have discovered that SolarWinds attackers can move laterally from local networks into the Microsoft 365 cloud.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


** REFERENCE**


Sumo Logic Best Practices and internal IR guidelines

** DISCLAIMER**
All Rights Reserved © 2022, Sumo Logic
Duplication of this publication is strictly prohibited without the expressed written consent of Sumo Logic

** WARNING **
Please note that playbooks are not to be intended as Legal advise, nor they replace a legal opinion
147 - Threat hunting on various IOC
CTI
This playbook is useful to conduct multiple threat hunting activities on various kinds of iOCs.

Starting from a txt file, the playbook provides extraction of multiple informations (i.e. hash, ip, url, domain and so on) and performs multiple queries on the VirusTotal platform.

At the same time, it prepares a specific query for Securonix in order to do additional threat hunting activities and generate multiple results for the same iOC.

Finally, the SOC Analyst can have different notes containing all the useful informations regarding the iOCs analyzed.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




145 - Pastebin leaks
Data Leak
This playbook was build to prevent leaks on pastebin website.

Using a specific scraping script, the playbook can collect multiple informations to filter during the next actions.

After that, a dedicated user choice can give you the possibility to reset the users password in case these are involved into the Incident.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




144 - Log4j attack
Intrusion
This playbook remediates Log4j vulnerability.

Inputs are represented by the CVE code and IP of the compromised machine



This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.






143 - Slack - General Failed Logins v2.1
Bruteforce Attack
This playbook was created to prevent brute force attempts for a specific account.

First the playbook ensures that the Slack account is enabled, based on this result it tries to send a message to make sure that the account is really active.

Once ensured, with some user choices, the SOC analyst can contact and make sure that the user is trying to log in with an incorrect password (false positive) or that a brute force attack is in progress.

Finally, the playbook can alert the user involved and give the SOC analyst the ability to reset the user's password or deactivate the account if the user has not changed their password.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
142 - OT-IoT Security Cisco-Alleantia v4 - deployed in Cisco
Intrusion attempt
Ingestions of alerts from industrial controllers. Enrichment of the involved machine. Detection of network flows impacting that machine and remediation applied under the control room supervision.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




140 - Email compromised - leaked
e mail
This playbook was created to check whether the users' emails were leaked or not.

The playbook will run and check all active users' emails on various services that provide data leaks information.

Based on the outcome, if the emails were leaked somewhere, the Security Team will be informed and containment actions can be done to prevent further risks, such as resetting the user's password, locking the mailbox, and sending an email containing the user's new password.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




137 - Potential Phishing Attempt
General
This playbook was created to prevent potential phishing attempts.

When an email has been received, the playbook will extract all attachments if any.

Based on the attachment score, if the files are malicious, containment actions will be taken to prevent the attack, such as resetting the user's password, deleting attachments, and sending an email containing the user's new password.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




135 - Block connections to Tor Exit nodes
Network Anomaly
Use-case for investigation and blocking the connections on the Onion Routing system (TOR network)

By doing multiple queries, the playbook generates for the SOC Analyst a task to compare the connected IP with TOR known exit nodes.

If the Tor Known exit node list contains Ip contacted from the customer network, a user choice will be created to block the TOR exit node in case the user is not authorized to use onion routing.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




126 - CSE Bruteforce
Malware
Use-case for investigation of a Bruteforce attack with Sumo Logic Cloud SIEM.

Collecting multiple pieces of information like the username under attack, the attempts, and the source IP, using multiple conditions can determine the severity and create a final task for the SOC Analyst including all the information collected.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




125 - CSE Malicious file
Malicious Activity
Use-case for investigation of a Malicious file with Sumo Logic Cloud SIEM.

The playbook collects multiple pieces of information regarding the original file, in case this is malicious, and creates a task if the score is higher than a specific value to review the Incident or escalate to L2.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




124 - Phishing analysis with VT
Phishing
Usecase for Phishing analysis with VirusTotal.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




123 - Ransomware - Malware outbreak, Petya
Ransomware
Malware - Response to Petya Ransomware.




122 - Ransomware - Malware outbreak
Ransomware
Malware - Response to Ransomware




121 - Ransomware - Malware outbreak, Revil
Ransomware
Malware - Response to Revil Ransomware

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.





119 - Malicious File Download
General
This playbook was created to prevent PDL's infections during user navigation.

When the Cloud SOAR receives the original syslog, it checks the user's activity and controls the domain reputation.

If the navigation result is dangerous for the user or the domain is malicious, atomically containment actions will be done to prevent the safety of the source computer.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




118 - Insider Threat
General
This playbook is useful to prevent suspicious user activities.

Once the original alert is received, the playbook checks all the user's properties and provides a search into the SIEM alerts, if the conditions are true automatically containment actions will be done and an email will be sent to advertise the duty's engineers.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




116 - SIEM Malware Detection
Malware
SIEM alerts for possible malware infection, enrichment with AD and EDR queries.

Automated and manual remediation is available in user choice.




115 - Suspicious User Detection
Malware
Ingestion of alerts refereeing to possible suspicious activities or intrusion.

Notification to the relevant departments (active directory/domain management), Enrichment into the SIEM to check for the past user activity.

Mitigation and containment to be applied under the supervision of users.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




114 - Phishing Triage Playbook
Phish Triage
Handling Phishing Use Case event in a Triage reported as an EML/MSG.

Analyzing the URL and the Hash's file contained on the source email, the playbook gives the user the possibility to proceed with the containment actions, including blocking the URL and banning the hash's file.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




113 - Security Awareness AD
KB4 Completed
Adding or removing users from AD group based on completion of security awareness training.

Once the email is parsed the playbook provides to remove the user contained on the body's email form a specific group.

The duty's engineers are also notified in case of success or failure containment action.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




108 - Threat Intelligence Incoming Alert - Format 2
Malware
Ingesting of CTI alerts referring to malicious IOCs that need to be enriched and blocked into Firewall, DNS, and Blacklist. Input is represented by individual files.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




106 - Malware Detected by EDR
Malware
Incoming alerts declaring a found malware on an endpoint, notification distributed to the duty analysts. Containment is performed via the EDR. Overall review of the incident performed by the Security analyst.




102 - VPN user activity notification
VPN_Events
Notification of user activity performed by the user via VPN.

If users access via VPN multiple times the GSP and SOC would be notified.

Condition monitored can be customized.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




100 - Incident Enrichment and Ownership management
Malware
Enrichment escalation and reassignment of ownership based on department.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




97 - Zoom Live Meeting Update
General
These playbooks are nested to the '95 - Zoom Security Check Runbook'.

They use a script to generate a random password, pass the random password to the update meeting password action, pull the meeting’s original invite, and email all recipients with the new meeting password.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




94 - COVID-19
General
The COVID-19 playbook takes incident indicators and utilizes COVID-19 threat indicator feeds to determine whether an incoming event has COVID related indicators. If indicators are found, the playbook gives the analyst the option to take one or more containment actions based on the indicators observed.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




93 - Investigative Workflow
General
This playbook checks the source and destination IP addresses and determines which address is internal to the organization, gathers asset information, searches both internal and external threat intelligence sources, before sending out a notification email / open a ticket in the organization’s ticketing system, or can be easily modified to add additional processes based on the organization’s procedures.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




92 - Phishing with poll
Phishing
Phishing use-case analyzing original emails (in eml/msg) format, with enrichment of email extracted attachments and IOCs via Hybrid Analysis and VirusTotal, search in GSuite and notification (poll) via Slack direct message to each user involved.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
91 - Forensics Analysis preparation
Forensic
Forensics preparation of analysis environment for Analysts by taking a memory dump of an impacted AWS instance, enriching results with volatility.

The impacted host is isolated with a new Security Group, and a new AWS instance is then launched via Terraform to which the snapshot of the impacted instance is attached.




89 - User Compromised
Intrusion
Triage of a possible compromised user. To ingest alerts from Splunk, perform some enrichment, distribute notifications and disable users if required.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




87 - Unauthorized Access w/ Privilege Escalation
Privilige Escalation
This playbook enriches suspicious events of possible unauthorized accesses detected from an external IP with the addition of a user to a privileged group (Domain Admins etc...)

After an initial enrichment phase, the playbook will define if the user belongs to an Administrative group and prompt a user choice, allowing the user to decide which flow to execute (automatic or manual containment).




86 - Triage for Network Activity
Network Activity
Playbook prepared with regards to triaging a network activity.




85 - Threat detection
System Compromised
Playbook for threat detection which can be used in case of any kind of threat being detected.




84 - Sysmon Notification of Unauthorized Binary Execution
Malicious Activity
This playbook uses the information contained in a Sysmon unauthorized binary execution alert. This playbook will determine the Active Directory group the affected user belongs to, offer the incident handler the option to reset the user's password in Active Directory, search the unauthorized binary in threat intelligence platforms such as MISP, STIX, Recorded Future, and others, and block the unauthorized binary at the endpoint via containment actions if desired.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




83 - Symantec SWS Alert Knowledge and Enrichment
Malware
Playbook which can be used to process Symantec SWS alerts automatically.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




82 - Suspicious User Activity
Misconduct
A playbook that prevents possible infections generated by incorrect online browsing by a user.

Once the alarm is received, the playbook looks for the user's activities and makes sure that there are no malicious events. In case there is, it blocks the malicious URLs.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




81 - Suspicious Command-Line Activity
Suspicious Activity
This playbook responds and assigns tasks to analyst in the case of suspicious command line activity, such as clearing history.




80 - SSH Intrusion
Intrusion
The purpose of this playbook is to detect and alert a suspicious entry into the SSH terminal, and send an authorization command to supervisors, and then store it in the database.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




79 - SQL Injection Attack
SQL Injection
Playbook to be associated with incidents in case of SQL injection activity.

If there are presents multiple events in the SIEM or the source IP is malicious the playbook provides to send a notification and give the possibility to block the source IP.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




78 - Spear Phishing
Phishing
Email Spearphishing playbook, including additional containment action.

Due to multiple triggers, the playbook workflow can automatically set the correct priority and advertise the duty's engineers including all the results found and done.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




77 - SitePhishing
Phishing
The purpose of this playbook is to detect anomalies in websites to conclude whether they are phishing sites or of reputable origin.

This can be detected in a number of ways, such as:

- Authentication token check,

- Site reputation lookup,

- login form information destination domain lookup, etc.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




76 - Security Incident
System Compromised
Presentation of a working model in case of Security incident situation.

This playbook replicates all the tasks are done on a Security Incident, useful to have a baseline and coordinate the SOC processes.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




75 - Scheduled Upload Alert or Exfiltration
Exfiltration
Scheduled transfer or data exfiltration may be performed only at certain times of the day or at certain intervals. This could be done to blend traffic patterns with normal activity or availability.

When scheduled exfiltration is used, other exfiltration techniques likely apply as well to transfer the information out of the network, such as Exfiltration Over Command and Control Channel and Exfiltration Over Alternative Protocol.

This playbook can be used in case exfiltration tactic is applied, on different platforms such as Linux, macOS, Windows OS with network access. Particular data sources can be net-flow/enclave net-flow, process use of the network, process monitoring, etc.




74 - Recon and Remediation with Malicious Attachment
Phishing
Exchange Recon and Malicious Attachment Remediation playbook.




72 - Qradar Malicious IP connection
Malicious Activity
Intrusion attempt identified by QRadar on IP. Basic enrichment: activity related to that IP on Qradar stored as CSV attached to Incident.

Advanced enrichment: info gathering from AbuseIPDB, X-Force, and Threat miner. Remediation and external notification are done automatically if need be.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




71 - Processing Attachment
Phishing
This playbook can be useful for any kind of incident where an attachment needs to be processed to detect if malicious or not.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




70 - Powershell Exploitation v2
General
The increased availability of PowerShell has paralleled the development of research on ways attackers can take advantage of it. This playbook presents a workflow to detect and terminate processes and or block hash/IPs.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




69 - Port Scanning from External IP v3
Suspicious Activity
Port Scanning from External IP. This Use-case starts after receiving an email with a list of IPs attached as an xls file. Analysis of each IP and checking of its activity in local applications. Based on the result of enrichment, appropriate mitigation is applied.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




68 - Port Scanning from External IP v2
Suspicious Activity
Port Scanning from External IP. This Use-case starts after receiving an email with a list of IPs attached as an xls file. Analysis of each IP and checking of its activity in local applications. Based on the result of enrichment, appropriate mitigation is applied.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




67 - Port Scanning from External IP
General
Playbook defined can be used in case of port scanning from an external IP is needed. E.g. the workflow can start after receiving an email with a list of IPs attached as an xls file.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




66 - Phishing with AD check
Phishing
Analysis of the phishing email with the detonation of the attachment in Cuckoo and analysis of the suspect URL.

If the victim is an administrative account, it is disabled in AD.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




63 - Phishing Detection - EWS
Phishing
Playbook created to detect phishing using Exchange EWS.

In case the email analyzed is malicious the playbook gives you the possibility to do some containment actions, like Block IP on Exchange EWS, Block senders on Exchange EWS, and Junk mail on Exchange EWS to prevent the attack.




61 - Petya Ransomware
Ransomware
Playbook to block a user that is navigating on a suspicious domain.

If the playbook detects a trace of the Petya ransomware, automatically block the Command and Control Server and provide to advertise the Duty's Engineers and the SOC Manager.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.





60 - Password Spray from External IP
Intrusion
Playbook which can be used in case of password spray attack, where a common password is usually checked against a matrix of users, from external IP.

The SOC Analysts have the possibility to block the source user if the source IP is malicious or the user did too many tentatives to log in.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




59 - Outbound Network Investigation
Network Activity
A playbook to perform outbound network activity alert investigation.

Once the playbook has conducted some preliminary actions, like IP Geolocation and reputation, alert the SOC manager and create the possibility to block the source IP via user choice.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




58 - Offense scan and User Reset
General
Offense scan via QRadar and User Reset password via AD.




57 - Notification playbook
Denial of Service
Playbook providing email notification to be approved/edited before sending by Analysts.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




56 - Notification - YES Analysis
Alerts
SOAR Credibility use-case: Operator analysis required.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




55 - Notification - NO Analysis
Alerts
SOAR Credibility use-case: No operator analysis required.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




54 - Misuse of Access
Unauthorized Access
The purpose of this playbook is to detect the transfer of confidential files through the use of the windows auditing system accessed by an endpoint.

Also, the playbook conducts a Virus Total scan to be sure any intrusion is ongoing.




53 - Meltdown and Spectre
Vulnerability
Playbook for Meltdown and Spectre checks with a ticket creation.

The playbook notify the duty's engineers and update the ticket created, blocking the IP on McAfee WG, closing the ticket as a final step.




52 - Medium priority Vulnerability Detected
Vulnerability
Playbook to assist when medium priority vulnerability is detected. Parent playbook "Vulnerability Management-Master".

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




51 - McAfee ESM Enrichment
General
Playbook to enrich and contain Incident using McAfee ESM integration actions.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




49 - Malware Analysis Dual Check
Malware
Playbook composed in case of malware analysis of possible infection with an additional automated check.

This playbook includes some containment actions in case the source IP is malicious.




46 - Malicious IP
System Compromised
Good practices on how to handle malicious IP in the triage process or when an investigation is already started.




Installed
45 - Malicious Communication with Cisco AMP
Malicious Communication
Malicious communication analysis using the Cisco AMP Integration.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




44 - Mail Scan
Malware
Potential search for malware performing automated CTI activities.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




43 - Mail Account Compromise
Unauthorized Access
Playbook to be used in case of potential mail account and/or mail attachment compromise.

Once the playbook conducts CTI activities to verify the reputation of the source iOC's, he provides to asks the SOC Analyst if they need to block the iOC's detected if these are suspected / malicious.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




42 - Low Priority Vulnerability Detected
Vulnerability
Playbook to assist when a low priority vulnerability is found. Parental playbook "Vulnerability Management Master".

Based on the results of the priority of the identified vulnerabilities, the playbook sends the email to the Duty's Engineers according to the appropriate level of severity.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




41 - Leveraging Threat Intelligence
Threat Intel
Playbook defined can be used in leveraging Threat Intelligence from various sources, for example, FireEye, Securonix and VirusTotal, etc.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




40 - Lateral Movement
General
Playbook created for lateral movement workflow.

Starting from a suspicious alert (syslog / mail) the playbook check if the URL/IP called is not malicious (C&C), if the score is not positive the playbook provide to identify the contacted host and quarantine it.




38 - Indicator of Compromise Update
General
Extracting the useful values to process it into the playbook (IP, hash, URL) with regex rules, this playbook can be used to update and check if already present any new indicators of compromise to the incident, such as hash values, ip addresses or url values, once the SOAR receives an external alert (syslog or email).

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




36 - GDPR Data Breach
Legal
The EU General Data Protection Regulation (GDPR 5853/12) entered into force on May 25th, 2016, and is due to be enforced from May 25th, 2018. It is aimed to replace the current EU Directive 95/46/EC.

The GDPR emphasizes transparency, security and accountability by data controllers, while at the same time standardizing and strengthening the right of European citizens to data privacy. It also extends to Non-EU businesses that process the personal data of EU residents. It introduces the role of Data Protection Officer (DPO), which is required for “government bodies” and organizations conducting mass surveillance or mass processing of Special Categories of data. Additionally, it generally requires that organizations need a personal information inventory.

GDPR imposes mandatorily to report Privacy breaches to the Supervisory Authority within 72 hours and potentially to the Data Subject. GDPR requests Organisations should perform Privacy Impact Assessments (PIAs) if the activity is considered "high-risk". A PIA is a process of systematically considering the potential impact of a new event (eg. deploying a new technology) on the privacy data exposure of individuals. It allows organizations to identify potential privacy issues before they arise and come up with a plan to mitigate them.

Failing to report a breach to the Supervisory Authority can imply a penalty that can be up to 20,000,000 EUR or 4 percent of the previous year's global revenue. Typical cases that might imply data breach:

- intrusion,

- theft/loss of mobile or PC,

- accidental distribution of data (wrong recipient or wrong attachment),

- loss of digital supports or paper documents,

- system failure with loss of data (eg. database crash);

This playbook is purely for guidance and is intended as general information. It does not constitute legal advice or legal analysis. All organizations that process data need to be aware that the General Data Protection Regulation will apply directly to them.




35 - Fraud
Fraud
Playbook to be associated with incidents in case of fraudulent activity from different locations.

By conducting CTI activities and informing the source user, the SOC Analyst can decide to block the source IP because is malicious or is not recognized by the source user.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




34 - FortiWeb Directory Traversal
Malicious Communication
Playbook created for FortiWeb Directory Traversal workflow.

In case there are some activities into the web server logs regarding unauthorized file access from the outside or the IP is malicious, the playbook provides the possibility to block on the customer technologies.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




33 - Forensic Checklist
Digital Forensics
Digital forensic workflow to be applied in case of forensic investigation.

Useful playbook to use in case the SOC team receives a suspicious IoC and needs to investigate using different technologies to find a possible intrusion / PDL compromised.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




31 - Enrichment for Events Deduplication
General
Credibility test child use case performing Enrichment for the Events Deduplication playbook.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




29 - Employee Fraud Report
Fraud
Best practices on how to handle Employee Fraud reports.

The playbook collects the user's properties and geolocates the source VPN IP if the user's attributes contain some custom properties (such as AD group) and the IP is from unknown locations and is automatically sent mail to inform duty's technicians of possible fraud.




28 - Email Submission Return Receipt
Incident Response
This playbook can be inserted into any other playbook to generate a submission acknowledgment/return receipt for user-submitted incident emails.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




27 - Email Submission Block IP
Incident Response
This will take an email with a subject line of Block IP and pass the IP in the body to the firewall (e.g. Fortigate) and block it.

A Success/Failure email will be sent to the stakeholder(s) with the IP block at the firewall results.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




26 - Easy Triage (IP Location)
Network Activity
Triage playbook for location and IP reputation status during a potential incident.

In case of suspected IP the user can decide to convert the triage event into an incident

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




25 - XSS Prevention
Denial of Service
XSS Attacks are a type of injection, in which malicious Javascript code is injected into otherwise benign and trusted websites.

XSS attacks occur when an attacker uses a web application to send malicious code, to a Server, or computer.

This playbook can help Enrich, Contain, and Notify as needed.




23 - Domain Blocking
Incident Response
Playbook defined can be used in domain blocking use case.

Basing CTI activities on your technologies, if a malicious URL is intercepted the playbook automatically blocks the URL on your environment.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




22 - DNA Evidence Analysis
DNA Analysis
Playbook which can be executed in case a Forensic DNA analysis is needed.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




21 - DLP Alert
Data Breach
Receive a DLP alert, including source and destination addresses, and hash value(s). Performs the following steps:

Gather enrichment information on the source user name and source address
Queries threat intelligence for the destination address - upgrades incident priority for known threats and prompts with a user choice decision to block the destination address
Queries EDR for processes accessing the file (by hash), then checks any processes against threat intelligence - prompts with a user choice decision to block the process by hash if the process is a known threat.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




19 - DDoS Spoof
DDOS
Distributed Denial of Service is a serious type of DDoS attack where attackers try to prevent the legitimate use of a service. These types of attacks come in two forms: the attacks that crash services and the attacks that flood services to the extreme that they are not available.

Spoofed Address Floods - Some DoS attacks use spoofed or illegal IP addresses, which will never be properly routed back to the source. To mitigate these spoofed attacks, one should implement reverse path validation on ingress routers in combination with dropping non-local subnets at egress routers. This combination of ingress and egress filtering will drop these illegal packets before they reach the firewall.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




18 - DDoS
Denial of Service
DDoS attack playbook which can be executed based on distributed denial of service use-case.

The playbook performs the first check in order to verify the traffic and the source IPs, if these should exceed a certain threshold the execution continues by carrying out a second search and, via ssh, checking the use of the resources of the server under attack.

If the condition is true, the playbook performs CTI activities to detect if the source IPs are malicious or not, including in the user choice all the data collected and giving the analyst the possibility of being able to block the sources.

In the event of a ceased attack and false positive, the SOC will receive an email containing the report relating to the events.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




Installed
17 - Data Breach Security Incident
Data Breach
Playbook created to be followed in the event of a Data Breach Security Incident.

If the playbook detects events in the firewall or SIEM related to the Data Breach, it expects to automatically perform CTI activities to track and identify the source of the violation, giving the user a choice the ability to block the source IP and restore the user password.

If the playbook does not find correlations regarding the possible data breach and firewall / SIEM events, it will inform the SOC and the original user.

If the source user does not recognize the activities, a task will be created automatically to decide how to proceed, otherwise the incident will be closed as a false positive.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




16 - Critical Vulnerability
Vulnerability
Playbook created to be followed in case a critical vulnerability/flaw is discovered.

Upon receiving a new critical vulnerability, the playbook provides a list of all target vulnerabilities through Qualys.

If the vulnerability has already been identified, the playbook involves searching for events in the SIEM related to that vulnerability to check all possible correlations between the vulnerability and possible exploit attempts, creating a risk scoring activity.

If the critical vulnerability identified has not been previously identified the playbook gives us the opportunity to conduct a VA business through Qualys, authenticated or uncertified, to see if it really exists for our purposes.

If the vulnerability is present, the playbook notifies the service engineers by email, otherwise it sends another email informing that the vulnerability has already been patched.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




15 - Connection to malicious IP with McAfee
Malicious Activity
Playbook process with an alarm received from McAfee in order to enrich and automate the investigation.




14 - Change ownership
General
This playbook is implementing user segregation by using the possibility of changing ownership in a phishing attack case.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




13 - Business Department Assignment and Notification
Critical
Playbook which handles multiple scanning/lateral movements for the Business department any other department in order to assign network investigation, forensic analysis, or system operation investigation.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


50 - Malware Sandbox
Malware
Playbook for Malware use case using sandbox analysis.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




101 - Check VPN account activity - time interval
VPN_Events
Check activity done by user via VPN in a specific time interval.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




12 - Bruteforce on Service
Bruteforce Attack
Identification and blocking bruteforce attack on the IBLight service as an example.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.









73 - Ransomware
Ransomware
Information gathering playbook which can be used during a Ransomware event.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




65 - Phishing Usecase - Malicious File or URL
Phishing
This playbook can be implemented in a Phishing workflow where a malicious file attachment or url/domain can be processed and analyzed.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




48 - Malware Analysis
Malware
Playbook composed in case of malware analysis of a possible infection with manual check.




39 - IP Enrichment
Malicious Communication
Playbook to be used when enrichment for the IP is needed.




37 - High Priority Vulnerability Detected
Vulnerability
Playbook to assist when a high-priority vulnerability is detected. Parent playbook "Vulnerability Management-Master".

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.



** DISCLAIMER**
All Rights Reserved © 2022 Sumo Logic
Cloud SOAR is a registered trademark of Sumo Logic
Duplication of this publication is strictly prohibited without the expressed written consent of Sumo Logic.
30 - Endpoint Malware Infection
Malware
Malware detected on Endpoint.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


11 - Bruteforce on Account
Bruteforce Attack
Playbook which can be used in a brute-force on account attack use case.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.




64 - Phishing Email Handling
Phishing
Playbook to be executed when a Phishing Email Handling workflow needs to be performed.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


107 - Threat Intelligence Incoming Alert - Format 1
Malware
Ingesting of CTI alerts referring to malicious IOCs that need to be enriched and blocked into Firewall, DNS and Blacklist. Input is represented by zip password protected archive.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


134 - CSE Lateral Movement
General
This playbook was built to prevent lateral movement attacks.

Getting the insight details from Cloud SIEM, the playbook will be doing multiple checks filtering the results by IP, username, and hostname.

Once the propriety queries are done, a final task will be created to review the Incident details and a question will be created to ask the SOC Analysts if any asset belongs to the SOC's critical asset list.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.



111 - Analysis and remediation of detected Malware
Malware
Playbook to process possible malware infection detected by the SIEM (or by other detection technologies).

The alert describes IP or hostname of the infected machine, hash value of the malicious file and PID of the malicious process running in the memory of the infected machine.

Enrichment is done to retrieve details of the user logged on the infected machine, remediation is automatically applied, terminating the malicious process (via the PID), isolating the infected machine (quarantine) and banning the hash.

Do an extra AV scan if the suspected events are presents on the EDR.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


110 - Firewall-WAF denial requests
Network Anomaly
Alerts referring to policy firewalls/WAF violation. Automated notifications to duty engineers, to decide and implement a remediation.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


109 - Suspicious user and brute force activity
Bruteforce Attack
Ingestion of alerts referring to possible brute force or intrusion, or password guessing. Notification to the relevant departments (active directory/domain management), Enrichment into the SIEM to check for past user activity. Mitigation and containment to be applied under the supervision of users.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


103 - Stolen Credentials
Data Breach
Detection of breached user credentials, notification to NOC, SOC and personal data protection department (DPO). Remediation applied automatically, disabling the compromised accounts with automated notifications of the duty analysts.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


99 - Threat Intelligence from External Source
Threat Intel
A playbook to run various queries on different sources and check intel regarding IoCs. Actions then store results in a csv file under attachments.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


62 - Phishing Attack
Phishing
Playbook which can be used in case of phishing attack scenario.

Define the severity of the potential phishing mail, if the iOC are confirmed by all the CTI platform these are blocked to all my technologies (double check), if the iOC are confirmed only by Virus Total these are blocked only to my internal technologies (single check).

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


20 - Decision tree for DOS
Denial of Service
Verify threshold, impact and node type for ticket creation or not by using the decision tree based on previous alerts.

By parsing an email and extracting different information to evaluate the impact of the attack, the decision tree will do a check on some of the values parsed in order to understand which path to take, escalation and creation of ticket or not.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


88 - User Account Investigation Active Directory
Incident Response
Playbook that can be used for AD account investigation.

When a new user is created on the AD, the Cloud SOAR receives an alarm to investigate and obtain all the information regarding that user.

If the user is legitimate, with a user choice we can ignore the Incident, otherwise, if the SOC Analyst does not recognize the user the playbook changes the user password and disable it.

This is very useful to prevent attacks via lateral movement technique or post-exploitation and alarm the SOC in case a non-legitimate user has the possibility to conduct dangerous activity on the Active Directory.

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.


128 - O365 Successful travel activity
General
Sending O365 type insights from Cloud SIEM (via Cloud SIEM daemon from SOAR, download the insights that at least one signal called: "Impossible Travel - Successful" OR the name is "INSIGHT-245 - O365 - User Successful Logged In Outside Italy" from the field "Description" of the JSON returned by the daemon). Distinguish from which Cloud SIEM based on the label; custom field: entity_id, severity, insight creation time, insight signals. Relative incident creation (custom field that tracks whether an incident or false positive - based on the playbook results). Start playbook that enriches the IP and email entity (via libraesva, in success travel activity you have the entity as given) and notification via email in the event of an incident based on the analyst's choice (soc@xecurity.it). Condition for sending an email (based on enrichment results)

This playbook uses some actions available with Cloud SOAR only, but can be downloaded and reconfigured for Automation Service purposes.





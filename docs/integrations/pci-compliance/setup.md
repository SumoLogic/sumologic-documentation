---
id: setup
title: Set Up the Sumo Logic PCI App
sidebar_label: Sumo Logic PCI App Setup
description: Enterprises use the requirements of the Payment Card Industry Security Standard Council Data Security Standards (known as PCI DSS) to handle customer billing information, including credit cards, debit cards, ATM cards, and point of sale (POS) cards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/security/PCI-compliance.png')} alt="PCI Compliance icon" width="75"/>

As data security becomes increasingly paramount, enterprises may reference certifications and standards such as the requirements of the Payment Card Industry Security Standard Council Data Security Standards (known as PCI DSS) as a means of assessing their policies and practices. Even if you don't handle payment card information, the requirements under PCI DSS may serve as proxies for controls and obligations that businesses have in place and seek to actively monitor.

Maintaining compliance with any regulation or law is something each entity must manage. Self-policing is always tricky, but when your organization is handling thousands upon thousands of log messages with potentially sensitive data, the task becomes monumental.

That's where the Sumo Logic PCI App comes in. With ready-made Dashboards that monitor each aspect of PCI compliance, targeted searches that allow you to dive into specific areas, and carefully designed ad-hoc reports, your job becomes much easier. Instead of using manpower to look through millions of log lines, Sumo Logic watches over your deployment, making potential problems easy to spot.

The Sumo Logic PCI App provides sample dashboards and searches to help track your environment against 11 of the 12 PCI required control groups. As with all of our apps, we recommend you customize these searches and dashboards to tailor them to your specific monitoring and troubleshooting needs so you get only get alerted on conditions important to you.

## Prerequisites

:::sumo Enterprise customers only
For more information on this app, contact [sales@sumologic.com](mailto:sales@sumologic.com).
:::

## How It Works

The Sumo Logic PCI Application takes log data uploaded to Sumo Logic, then indexes this data into a View. This indexing allows for quicker search results against your data. The View is used for PCI Requirement searches as well as PCI Dashboards.

One PCI-related data appears in a Dashboard, you can learn more about particular incidents. This type of forensic investigation is also expedited with the View indexing.

## Request Installation

The Sumo Logic PCI Compliance App is available for Enterprise accounts only. You may upgrade your account at any time. If you'd like more information on this App, follow the instructions below or contact your Sumo Logic [sales](mailto:sales@sumologic.com) representative.

Our team installs and configures the app to ensure that Collectors and Sources are gathering the information related to PCI compliance, and customizes any queries to point to the proper data points.

To request installation of the PCI app:

1. Select **App Catalog**, search for the PCI app.
1. Click **Request App Install.**
1. Select the option to give Sumo Logic agents permission to access your account to install the app, and click **Request**.

To request installation of the PCI app in the classic UI:

1. Select **App Catalog**, search for the PCI app.
1. Click **Library** > **Apps**, then select PCI.
1. Click **Request Estimate**.
1. Select the option to give Sumo Logic agents permission to access your account to install the app, and click **Request**.



## PCI Reports

Unlike Dashboards and scheduled searches, reports can be modified, allowing flexibility, including:

* **Identify long term trends.** Change the time range of a report to get additional information that extends beyond the reach of Dashboards.
* **Modify to get a closer look.** Need additional insight into events on a single host? Or perhaps trying to find more details of a user's activity? Reports can return very granular information by making just a few edits to the query. You can choose to save an edited report as a saved search on its own.
* **Concentrate efforts.** If one area of your deployment is trickier to keep in compliance, run a report more target report at a more frequent interval.

### Included PCI Reports

The following reports are included with the Sumo Logic Application for PCI Compliance:

* Account Access Activity.
* Account Management Activity.
* Actions by Privileged Accounts.
* Audit Log Cleared.
* AV Failed Updates.
* AV Malware Activity.
* Network Device Configuration Changes.
* Network Incident Report.
* Potential Credit Card Data Found.
* Prohibited Service Activity.
* Software Updates.
* System Time Change.

All of these reports can be run ad-hoc, or can be saved as scheduled searches.

<details><summary><strong>Why aren't Reports included in Dashboards?</strong></summary>

Reports are designed to deliver very specific, granular information, which is not always aggregated, so that individual log messages may be returned in search results. Think of Reports as a tool to augment discoveries uncovered by the constant search results delivered by Dashboards.

</details>

## PCI Dashboards

This logical grouping of issues, events, or activities makes it easy for an organization to make sure they're continuing to comply with each requirement, and remediate any problems that could present a violation.

Sumo Logic based the PCI app on PCI DSS Requirements and Security Assessment Procedures, Version 2.0. Requirements one through 11 have Dashboards custom-built to help you zero in on data relevant to each requirement. (Requirement 12, Maintain a policy that addresses information security for all personnel, can't be measured through log data, there is no Dashboard.)

The requirements are as follows:

* [Requirement 1](#pci-requirement-1-dashboard): Install and maintain a firewall configuration to protect cardholder data.
* [Requirement 2](#pci-requirement-2-dashboard): Do not use vendor-supplied defaults for system passwords and other security
parameters.
* [Requirement 3](#pci-requirement-3-dashboard): Protect stored cardholder data.
* [Requirement 4](#pci-requirement-4-dashboard): Encrypt transmission of cardholder data across open, public networks.
* [Requirement 5](#pci-requirement-5-dashboard): Protect all systems against malware and regularly update anti-virus software or
programs.
* [Requirement 6](#pci-requirement-6-dashboard): Develop and maintain secure systems and applications.
* [Requirement 7](#pci-requirement-7-dashboard): Restrict access to cardholder data by business need-to-know.
* [Requirement 8](#pci-requirement-8-dashboard): Identify and authenticate access to system components.
* [Requirement 9](#pci-requirement-9-dashboard): Restrict physical access to cardholder data.
* [Requirement 10](#pci-requirement-10-dashboard): Track and monitor all access to network resources and cardholder data.
* [Requirement 11](#pci-requirement-11-dashboard): Regularly test security systems and processes.

While some facets of these standards are based on policies set outside of your log data, Sumo Logic works to monitor data-driven aspects of the standards. For example, requirements that need audits of individual actions can be monitored through Sumo Logic's app.

#### PCI Posture Overview Dashboard

Think of the Posture Overview Dashboard as a high-level look at the state of failures currently occurring, as well as a chart that displays the number of failures that occurred over the past seven days. These failures are clearly labeled with the PCI Requirement that could be violated by the failures.

![PCI_PostsureOverview.png](/img/pci-standards/PCI_PostsureOverview.png)

**Current PCI State.** Displays a single, color-coded value associated with the number of failures that have occurred over the past day.

**Failures by Requirements.** Shows the number of failures by PCI Requirement.

**History of Failures.** Displays a chart of all failures that have occurred over the past week.

#### PCI Requirement Compliance Status Dashboard

The PCI Requirement Compliance Status Dashboard provides a high-level view of the number of outstanding incidents for each PCI requirement.

![PCI_ComplianceRequirement_Dashboard.png](/img/pci-standards/PCI_ComplianceRequirement_Dashboard.png)

#### PCI Requirement 1 Dashboard

PCI Requirement 1 Secure Network Monitoring Dashboard reports the state of your organization's compliance of having a firewall installed and configured to properly protect cardholder data.

Information relating to this requirement can be found in network activity and events, such as inbound and outbound cardholder activity, as well as network configuration changes.

![PCI_Requirement1_Dashboard.png](/img/pci-standards/PCI_Requirement1_Dashboard.png)

#### PCI Requirement 2 Dashboard

The PCI Requirement 2 Default Setting Monitoring Dashboard provides information any use of vendor-supplied or default system passwords and security parameters in your organization.

![PCI_Requirement2_Dashbaord.png](/img/pci-standards/PCI_Requirement2_Dashbaord.png)

#### PCI Requirement 3 Dashboard

The PCI Requirement 31 Protect Stored Cardholder Data Dashboard details your compliance for protecting stored cardholder data.

![PCI_Requirement3_Dashboard.png](/img/pci-standards/PCI_Requirement3_Dashboard.png)

#### PCI Requirement 4 Dashboard

PCI Requirement 4 Dashboard reports the state of your organization's encryption of cardholder data. Panels in this Dashboard look at incidents generated by firewalls, for example, or other hosts or ports that handle the flow of data that should be encrypted.

![PCI_Requirement4_Dashboard.png](/img/pci-standards/PCI_Requirement4_Dashboard.png)

#### PCI Requirement 5 Dashboard

PCI Requirement 5 Anti Virus Updates Dashboard makes sure that anti-virus software is regularly updated, and also looks at any anti-virus threats to servers, as well as failed anti-virus updates.

![PCI_Requirement5_Dashboard.png](/img/pci-standards/PCI_Requirement5_Dashboard.png)

#### PCI Requirement 6 Dashboard

PCI Requirement 6 Application Updates Dashboard looks at the states of application upgrades that have occurred across your deployment. Critical vulnerabilities are also monitored.

![PCI_Requirement6_Dashboard.png](/img/pci-standards/PCI_Requirement6_Dashboard.png)

#### PCI Requirement 7 Dashboard

PCI Requirement 7 Cardholder Data Access Monitoring Dashboard helps you verify that your organization is restricting access to cardholder data only to those with an explicit purpose. The Dashboard contains a number of Panels that watch for any attempts to access environments that store cardholder information, so you easily can see who is attempting to gain access to the data.

![PCI_Requirement7_Dashboard.png](/img/pci-standards/PCI_Requirement7_Dashboard.png)

#### PCI Requirement 8 Dashboard

The PCI Requirement 8 User Activity Dashboard helps you comply with each user having their own unique ID. Panels look at account creation/enablement, account deletion/disablement, and password changes. Additionally, you can view a chart that displays a summary of the overall number of user account creations/deletions over a week.

![PCI_Requirement8_Dashboard.png](/img/pci-standards/PCI_Requirement8_Dashboard.png)

#### PCI Requirement 9 Dashboard

The PCI Requirement 9 Physical Access Dashboard contains Panels that check for any violations of physical access to machines that contain cardholder data. Each access request is logged and displayed by user name.

![PCI_Requirement9_Dashboard.png](/img/pci-standards/PCI_Requirement9_Dashboard.png)

#### PCI Requirement 10 Dashboard

The PCI Requirement 10 Data Access Dashboard contains Panels that track each time a network resource is accessed.

![PCI_Requirement10_Dashboard.png](/img/pci-standards/PCI_Requirement10_Dashboard.png)

#### PCI Requirement 11 Dashboard

The PCI Requirement 11 Vulnerability Scan Dashboard helps you comply with the requirement to regularly test security systems. This Dashboard gives you a look at the number of hosts scanned over the past day, along with any vulnerabilities that need to be addressed.

![PCI_Requirement11_Dashboard.png](/img/pci-standards/PCI_Requirement11_Dashboard.png)

---
id: pci-compliance-professional-services
title: PCI Compliance through Professional Services
---

The PCI Compliance through Professional Services app is available for Sumo Logic has been deprecated. This document will be retired shortly. We recommend using the PCI Compliance App for your specific data source instead.

As data security becomes increasingly paramount, enterprises may reference certifications and standards such as the requirements of the Payment Card Industry Security Standard Council Data Security Standards (known as PCI DSS) as a means of assessing their policies and practices.  Even if you don’t handle payment card information, the requirements under PCI DSS may serve as proxies for controls and obligations that businesses have in place and seek to actively monitor.

Maintaining compliance with any regulation or law is something each entity must manage. Self-policing is always tricky, but when your organization is handling thousands upon thousands of log messages with potentially sensitive data, the task becomes monumental.

That's where the Sumo Logic PCI Application comes in. With ready-made Dashboards that monitor each aspect of PCI compliance, targeted searches that allow you to dive into specific areas, and carefully designed ad-hoc reports, your job becomes much easier. Instead of using manpower to look through millions of log lines, Sumo Logic watches over your deployment, making potential problems easy to spot.

The Sumo Logic PCI Application provides sample dashboards and searches to help track your environment against 11 of the 12 PCI required control groups.  As with all of our apps, we recommend you customize these searches and dashboards to tailor them to your specific monitoring and troubleshooting needs so you get only get alerted on conditions important to you.


## How the app works

The Sumo Logic PCI Application takes log data uploaded to Sumo Logic, then indexes this data into a View. This indexing allows for quicker search results against your data. The View is used for PCI Requirement searches as well as PCI Dashboards.

One PCI-related data appears in a Dashboard, you can learn more about particular incidents. This type of forensic investigation is also expedited with the View indexing.

## How is the Sumo Logic PCI App set up?

This app has been deprecated, visit [PCI Compliance](https://help.sumologic.com/07Sumo-Logic-Apps/16PCI_Compliance) for the updated apps.

The PCI app is available only for Sumo Logic Enterprise customers. For more information, contact sales@sumologic.com.

For the Sumo Logic PCI app, the Sumo Logic team must make sure that Collectors and Sources are gathering the information related to PCI compliance, and customizes any queries to point to the proper data points.

To request installation of the PCI app, select **App Catalog**, search for the PCI app, and click **Request App Install.** (In the classic UI, click **Library**, click **Apps**, select PCI, and click **Request Estimate**.) Select the option to give Sumo Logic agents permission to access your account to install the app, and click **Request**.

Professional Services contracts are available for Sumo Logic Enterprise customers only. For more information, please email sales@sumologic.com.


## PCI Reports

This app has been deprecated. For the latest PCI Compliance apps, see [PCI Compliance](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Reports).

Unlike Dashboards and scheduled searches, reports can be modified, allowing flexibility, including:



* **Identify long term trends.** Change the time range of a report to get additional information that extends beyond the reach of Dashboards.
* **Modify to get a closer look.** Need additional insight into events on a singe host? Or perhaps trying to find more details of a user's activity? Reports can return very granular information by making just a few edits to the query. You can choose to save an edited report as a saved search on its own.
* **Concentrate efforts.** If one area of your deployment is trickier to keep in compliance, run a report more target report at a more frequent interval.


## Why aren't Reports included in Dashboards?

Reports are designed to deliver very specific, granular information, which is not always aggregated, so that individual log messages may be returned in search results.

Think of Reports as a tool to augment discoveries uncovered by the constant search results delivered by Dashboards.


## Included PCI Reports

The following reports are included with the Sumo Logic Application for PCI Compliance:

* Account Access Activity.
* Account Management Activity.
* Actions by Privileged Accounts.
* Audit Log Cleared.
* AV Failed Updates.
* AV Malware Activity.
* Network Device Configuration Changes.P
* Network Incident Report.
* Potential Credit Card Data Found.
* Prohibited Service Activity.
* Software Updates.
* System Time Change.

All of these reports can be run ad-hoc, or can be saved as scheduled searches.


## PCI Dashboards

This app has been deprecated. For the latest PCI Compliance apps, see [PCI Compliance](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Reports).

This logical grouping of issues, events, or activities makes it easy for an organization to make sure they're continuing to comply with each requirement, and remediate any problems that could present a violation.

Sumo Logic based the PCI app on PCI DSS Requirements and Security Assessment Procedures, Version 2.0. Requirements one through 11 have Dashboards custom-built to help you zero in on data relevant to each requirement. (Requirement 12, Maintain a policy that addresses information security for all personnel, can't be measured through log data, there is no Dashboard.)

The requirements are as follows:

**[Requirement 1](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/02-PCI-Requirement-1-Dashboard):** Install and maintain a firewall configuration to protect cardholder data.

**[Requirement 2](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/03-PCI-Requirement-2-Dashboard):** Do not use vendor-supplied defaults for system passwords and other security parameters.

**[Requirement 3](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/04-PCI-Requirement-3-Dashboard):** Protect stored cardholder data.

**[Requirement 4](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/05-PCI-Requirement-4-Dashboard):** Encrypt transmission of cardholder data across open, public networks.

**[Requirement 5](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/06-PCI-Requirement-5-Dashboard):** Protect all systems against malware and regularly update anti-virus software or programs.

**[Requirement 6](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/07-PCI-Requirement-6-Dashboard):** Develop and maintain secure systems and applications.

**[Requirement 7](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/08-PCI-Requirement-7-Dashboard):** Restrict access to cardholder data by business need-to-know.

**[Requirement 8](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/09-PCI-Requirement-8-Dashboard):** Identify and authenticate access to system components.

**[Requirement 9](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/10-PCI-Requirement-9-Dashboard):** Restrict physical access to cardholder data.

**[Requirement 10](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/11-PCI-Requirement-10-Dashboard):** Track and monitor all access to network resources and cardholder data.

**[Requirement 11](https://help.sumologic.com/07Sumo-Logic-Apps/26Apps_for_Sumo/PCI_Compliance_through_Professional_Services/PCI-Standards-based-Dashboards/12-PCI-Requirement-11-Dashboard):** Regularly test security systems and processes.

While some facets of these standards are based on policies set outside of your log data, Sumo Logic works to monitor data-driven aspects of the standards. For example, requirements that need audits of individual actions can be monitored through Sumo Logic's app.

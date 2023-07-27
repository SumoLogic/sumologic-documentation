---
id: audit-and-compliance
title: Audit and Compliance
sidebar_label: Audit and Compliance
description: Learn how to use Cloud Security Analytics to assist with audit and compliance. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To use Cloud Security Analytics for audit and compliance, you can use [pre-built apps](#pre-built-apps-for-audit-and-compliance), or [build your own queries](#build-queries-for-audit-and-compliance).

## About audit and compliance

Compliance standards are enforced by various governments and organizations to protect end users and keep information safe. Meeting compliance standards is usually the first step in making sure your apps and data are secure. However, in most cases additional security measures, such as [threat monitoring](/docs/csa/threat-detection-and-investigation/), are also recommended.

A compliance audit is an inspection of an organization to check whether compliance standards are being met. There are two types of audits Sumo Logic Security Analytics can support:
* **Internal audit**. Conducted by members of your own organization, as a practice to make sure that you’ll pass the inspection. 
* **External audit**. Where a government or other independent authority checks your data to make sure you’re meeting compliance standards. Both internal and external audits can be scheduled or they can be random.

Both internal and external audits can be scheduled or they can be random. For example, you can use Sumo Logic's queries, alerts, and dashboards to monitor your data, and make sure only authorized users have access to sensitive information.

Because Sumo Logic itself meets many security compliance standards, including HIPAA, FedRAMP-Moderate Authorized, ISO 27001, and many others, you can feel safe ingesting your data into the Sumo Logic platform.

### Regulatory compliance and security controls

There are two important categories of compliance: regulatory compliance and security controls.

* Regulatory compliance may be required depending on factors such as the industry a company operates within. 

* Security controls define how certain data types will be collected, organized, processed, or used to aid the business without creating security vulnerabilities or risking compliance penalties.

The biggest difference between regulatory compliance and security controls is that regulatory compliance mainly relates to standards set by third-party organizations and enforcement bodies. In contrast, security controls are developed, implemented, and enforced internally.

#### Regulatory compliance

Following are regulatory framework examples:
* [**GDPR**](https://gdpr.eu/what-is-gdpr/). The General Data Protection Regulation (GDPR) is a compliance framework that “imposes obligations onto organizations anywhere” if “they target or collect data related to people in the EU.” It’s a set of standards primarily governing data privacy and security. 
* [**HIPAA**](https://www.cdc.gov/phlp/publications/topic/hipaa.html). The Health Insurance Portability and Accountability Act, or HIPAA, is a U.S. federal law that requires “the creation of national standards to protect sensitive patient health information from being disclosed without the patient’s consent or knowledge.”
* [**NIST**](https://www.ftc.gov/business-guidance/small-businesses/cybersecurity/nist-framework). The National Institute of Standards and Technology, or NIST, is responsible for multiple compliance frameworks related to cybersecurity and privacy controls. Similar to some HIPAA applications, adherence to the NIST framework is voluntary, but its implementation helps companies identify, protect, detect, respond, and recover from cybersecurity threats and attacks. 
* [**CMMC**](https://dodcio.defense.gov/CMMC/about/). The Cybersecurity Maturity Model Certification (CMMC) is an assessment framework developed in alignment with the U.S. Department of Defense (DoD)’s information security requirements. It generally applies to companies that are either DoD contractors or engage with the [Defense Industrial Base Sector](https://www.cisa.gov/topics/critical-infrastructure-security-and-resilience/critical-infrastructure-sectors/defense-industrial-base-sector) or DIB.
* [**ISO 27001**](https://www.iso.org/standard/27001). The International Standards Organization (ISO) publishes various industrial and commercial standards. These standards, such as ISO 27001, are vital to world trade initiatives and work to establish common standards for organizations that must adhere to different countries’ requirements and priorities.
* [**PCI-DSS**](https://www.pcisecuritystandards.org/). The Payment Card Industry Data Security Standard (PCI DSS) outlines best practices and drives “adoption of data security standards and resources for safe payments worldwide.” It is mandatory for any organization handling payment cardholder data. Failure to adhere to it can result in financial penalties.

#### Security controls

Security controls refer to internally-defined protective measures taken to prevent, detect, or mitigate security risks as they apply to physical assets, information, computer networks, or other assets, and can include: 
* **Physical**. Controls that relate to physical facilities and assets, for example, restricting access to server rooms or other sensitive areas, or using surveillance cameras for real-time monitoring.
* **Digital**. Controls that relate to basic network and application security protocols, like required formats for usernames and passwords, two-factor authentication, and up-to-date antivirus software.
* **Cybersecurity**. Controls to prevent cyber attacks, or quickly mitigate them if they do occur or are suspected. Examples include data encryption and firewalls.
* **Cloud security**. Controls that generally apply to the protection of cloud based data and infrastructure across key assets and workflows. Cloud security controls can be more complex because they often involve CI/CD software development pipelines that can change and be updated frequently.

### Best practices guide for implementing audit and compliance

Following are the basic steps involved in implementing an audit and compliance process.

#### Step 1: Centralize data collection

Capture and collect a wide range of organizational data from wherever it originates, and centralize in a [data lake](/docs/csa/data-lakes/) for speed and effectiveness of analysis.

#### Step 2: Increase visibility

Make various types of data available with 100% visibility, and visualize it in compelling, configurable dashboards for real-time monitoring and insights.

#### Step 3: Find insights fast

Create filters and search parameters with Sumo Logic to find any data at any time, whether it relates to regulatory compliance or internal security controls.

#### Step 4: Use out-of-the-box content

Leverage machine learning analytics to improve and streamline audit processes and expedite compliance using tools. Tools from out-of-the-box integrations, like our [PCI dashboards](/docs/integrations/pci-compliance/setup#pci-dashboards), mean you can monitor many security tools you already use.

#### Step 5 Retain data

Retain data for as long as you need it to perform your audit and compliance process.  

#### Step 6: Monitor in real-time

Cloud Security Analytics monitors incoming data and security controls in real-time to identify anomalies that could signal a vulnerability, threat, or non-compliance.

#### Step 7: Create a unified system

Use Sumo Logic's countless data integrations and out-of-the box applications ensure that all data is properly collected and cataloged as it’s generated.

## Pre-built apps for audit and compliance

[Install](/docs/get-started/apps-integrations) the following apps for audit and compliance:
* [PCI Compliance](/docs/integrations/pci-compliance/). Apps for payment card industry (PCI) compliance.
* [Google Cloud Audit](/docs/integrations/google/cloud-audit/). App to monitor activities and track the actions of administrators in your Google Cloud Platform projects.
* [AWS Security Hub](/docs/integrations/amazon-aws/security-hub/). App to view your security state within AWS and your compliance with security industry standards.

### Use case: PCI compliance

In this use case, we'll show you how to use our PCI app for Palo Alto Networks to perform an audit to ensure that you meet one of the PCI requirements.

#### PCI requirements

[Payment Card Industry Data Security Standards](https://www.pcisecuritystandards.org/merchants/) (PCI DSS) affects any company that accepts or processes payment cards. There are 12 requirements that meet 6 security goals. Your company needs to meet all 12 requirements to be compliant. 

You can read the goals and requirements in the following table. In [Perform a PCI compliance audit](#perform-a-pci-compliance-audit) below, we’ll show how to perform an audit for requirement 4:

| Goal | PCI DSS requirements |
| :-- | :-- |
| Build and maintain a secure network | 1. Install and maintain a firewall configuration to protect cardholder data. <br/>2. Do not use vendor-supplied defaults for system passwords and other security parameters. |
| Protect cardholder data | 3. Protect stored cardholder data. <br/>**4. Encrypt transmission of cardholder data across open, public networks.** |
| Maintain a vulnerability management program | 5. Use and regularly update anti-virus software or programs. <br/>6. Develop and maintain secure systems and applications |
| Implement strong access control measures | 7. Restrict access to cardholder data on a business need-to-know basis. <br/>8. Assign a unique ID to each person with computer access. <br/>9. Restrict physical access to cardholder data. |
| Regularly monitor and test networks | 10. Track and monitor all access to network resources and cardholder data. <br/>11. Regularly test security systems and processes. |
| Maintain an information security policy | 12. Maintain a policy that addresses information security for employees and contractors. |

Many of these requirements are basic security best practices. For example, encrypting data and restricting access to it on a need-to-know basis can be a good idea regardless of what kind of data you’re working with. Likewise, installing and maintaining a firewall is probably something your security operations team has already done.

#### Perform a PCI compliance audit

This example shows how to use the PCI app for Palo Alto Networks to perform a PCI audit for requirement 4: "Encrypt transmission of cardholder data across open, public networks".

Before you can perform the audit, collect logs and install the app for the version of Palo Alto Networks you use:
* [PCI Compliance for Palo Alto Networks 9](/docs/integrations/pci-compliance/palo-alto-networks-9/)
* [PCI Compliance for Palo Alto Networks 10](/docs/integrations/pci-compliance/palo-alto-networks-10/)

To perform the audit:

1. In the left navigation pane, click your **Personal** folder, then expand the PCI Compliance app folder.
1. Open the **PCI Compliance For Palo Alto Networks - PCI Req 02, 04 - Insecure Data In Transit** dashboard.
1. Find the **Insecure Allowed Traffic by Target Port and Involved Host** panel. 
1. In the top right corner, click the three-dot button and select **Open in Log Search**.
1. Next to the clock icon, select **Last 24 Hours**. (You may have to select a longer time frame to get results.)
1. Click the magnifying glass icon or press Enter to start the search.
1. Click the **Messages** tab in the results. Here you’ll see the details of every log message that match the query. You’ll see columns for the timestamp, port, IP address, number of bytes sent, number of bytes received, and many other fields. 
1. Click the **Aggregates** tab.
1. Click the Table icon. The aggregates table will only show the potential incidents. 

For example, there may be log messages on destination `port 80`. While these might not be true incidents, the query has flagged them as worthy of investigation. You can try to determine which network this IP address is on, and whether or not the data is insecure. Recall requirement 4: "Encrypt transmission of cardholder data across open, public networks." If this data is on an open, public network, you'll need to make sure it’s encrypted so you can meet this compliance standard.

## Build queries for audit and compliance

You can use Cloud Security Analytics to build queries to assist you in audit and compliance tasks. 

### Use case: Audit AWS root for compliance

In this use case, we'll show you how to query AWS CloudTrail data for any messages that contain `root`, `su`, or `sudo` keywords indicating root account access.

#### What is a root account?

Most operating systems have a small handful of super user accounts. These accounts may be known as su (super user), root, or admin. These accounts have special access beyond what normal accounts have. They can often add and delete data, create and delete users, and perform other privileged actions. 

While it's important to have a few administrators in any organization, not every action needs to be performed by super user account. If everyone has access to administrator privileges, there is a risk of accidental or malicious data deletion, manipulation, or exfiltration.

The root account generally has unrestricted access to resources in an account. A general security best practice is to limit the use of the root account. One common audit is to check whether or not the root account is being used, and if its use is justified.

### Perform a query for AWS root activity

To use Cloud Security Analytics to start an audit of AWS root for compliance, perform these steps:

1. Near the top of the Sumo Logic UI, click **+ New > Log search** to open a new Sumo Logic search.
1. Make sure you’re in Advanced Mode. If you’re in Basic Mode, click the three dot icon on the right side of the query builder, then select **Advanced Mode**.
1. Copy and paste this query into the query builder. (In the query, replace `Labs/AWS/CloudTrail` with a valid source category for AWS CloudTrail logs in your environment.)
 ```
 _sourceCategory=Labs/AWS/CloudTrail and (root or su or sudo)
 | json "eventType", "eventName", "eventSource", "sourceIPAddress", "userIdentity", "responseElements" nodrop
 | json field=userIdentity "type", "arn" nodrop
 | where type="Root"
 | formatDate(_messageTime, "yy-MM-dd HH:mm:ss") as date
 | count date, eventname, eventtype, sourceipaddress, type, arn
 | sort date
 ```
 This query looks at AWS CloudTrail data for any messages that contain root, su, or sudo keywords. These commands are all associated with root account access. It then parses the JSON fields into human-readable column names and only displays messages where the user identity type matches `Root`. Finally, the messages are formatted, sorted, and aggregated by event type and date. This query was designed to work in the Sumo Logic training lab environment. If you want to use it in your own environment, you may need to change it to work with your data's structure and naming conventions.
1. Next to the clock icon, select a time frame that covers the time you want to audit. 
1. Click the magnifying glass icon or press Enter to start the search.
1. Click the **Aggregates** tab in the results. In the results, see API calls using the root account type. You can work with your AWS administrators to find out if this use of root is necessary and legitimate or not.


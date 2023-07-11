---
id: audit-and-compliance
title: Audit and Compliance
sidebar_label: Audit and Compliance
description: Learn how to use Cloud Security Analytics to assist with audit and compliance. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To use Cloud Security Analytics for audit and compliance, you can use [pre-built apps](#pre-built-apps-for-audit-and-compliance), or [build your own queries](#build-queries-for-audit-and-compliance).

## About audit and compliance

Compliance standards are enforced by various governments and organizations to protect end users and keep information private and secure. Meeting compliance standards is usually the first step in making sure your apps and data are secure. However, in most cases additional security measures, such as [threat monitoring](/docs/csa/threat-detection-and-investigation/), are also recommended.

A compliance audit is an inspection of an organization to check whether compliance standards are being met. You may have an internal audit, conducted by members of your own organization, as a practice to make sure that you’ll pass the inspection. You might also have an external audit, where a government or other external, independent authority checks your data to make sure you’re meeting compliance standards. Both internal and external audits can be scheduled or they can be random.

Sumo Logic can also help you and your company meet compliance requirements. For example, you can use Sumo Logic's queries, alerts, and dashboards to monitor your data, and make sure only authorized users have access to sensitive information.

:::note
Compliance varies by geography and industry. For example, the Health Insurance Portability and Accountability Act (HIPAA) applies to hospitals and other health-related services in the United States. For companies in other industries or in other countries, HIPAA compliance might not be a concern. Similarly, General Data Protection Regulation (GDPR) only applies to companies with users in the European Union. However, with increasing global commerce, more and more companies based outside of Europe must still comply with GDPR. Sumo Logic itself meets many security compliance standards, including HIPAA, FedRAMP-Moderate Authorized, ISO 27001, and many others. This means you can feel safe ingesting your data into the Sumo Logic platform.
:::

## Pre-built apps for audit and compliance

[Install](/docs/get-started/apps-integrations) the following apps for audit and compliance:
* [PCI Compliance](/docs/integrations/pci-compliance/). Apps for payment card industry (PCI) compliance.
* [Google Cloud Audit](/docs/integrations/google/cloud-audit/). App to monitor activities and track the actions of administrators in your Google Cloud Platform projects.
* [AWS Security Hub](/docs/integrations/amazon-aws/security-hub/). App to view your security state within AWS and your compliance with security industry standards.
* [Microsoft Office 365 Audit Source](/docs/send-data/hosted-collectors/ms-office-audit-source/). App to to track and monitor usage of Microsoft Office 365. 

### Use case: PCI compliance

In this use case, we'll show you how to use the  PCI app for Palo Alto Networks to perform an audit to ensure that you meet one of the PCI requirements.

#### PCI requirements

[Payment Card Industry Data Security Standards](https://www.pcisecuritystandards.org/merchants/) (PCI DSS) affects any company that accepts or processes payment cards. There are 12 requirements that meet six security goals. Your company needs to meet all 12 requirements to be compliant. 

You can read the goals and requirements in this table:

| Goal | PCI DSS requirements |
| :-- | :-- |
| Build and maintain a secure network | 1. Install and maintain a firewall configuration to protect cardholder data. <br/>2. Do not use vendor-supplied defaults for system passwords and other security parameters. |
| Protect cardholder data | 3. Protect stored cardholder data. <br/>4. Encrypt transmission of cardholder data across open, public networks. |
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

For example, there may be log messages on destination port 80. While these might not be true incidents, the query has flagged them as worthy of investigation. You can try to determine which network this IP address is on, and whether or not the data is insecure. Recall requirement 4: "Encrypt transmission of cardholder data across open, public networks." If this data is on an open, public network, you'll need to make sure it’s encrypted so you can meet this compliance standard.

## Build queries for audit and compliance

You can use Cloud Security Analytics to build queries to assist you in audit and compliance tasks. 

### Use case: Audit AWS root for compliance

In this use case, we'll show you how to query AWS CloudTrail data for any messages that contain `root`, `su`, or `sudo` keywords indicating root account access.

#### What is a root account?

Most operating systems have a small handful of super user accounts. These accounts may be known as su (super user), root, or admin. These accounts have special access above and beyond what normal accounts have. They can often add and delete data, create and delete users, and perform other privileged actions. 

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


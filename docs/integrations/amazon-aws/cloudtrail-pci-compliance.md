---
id: cloudtrail-pci-compliance
title: PCI Compliance For AWS CloudTrail
description: The Sumo Logic App for Payment Card Industry (PCI) Compliance for AWS CloudTrail App offers dashboards to monitor systems, account and users activity to ensure that login activity and privileged users are within the expected ranges.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/pci-compliance/pci-logo.png')} alt="Thumbnail icon" width="90"/>

The Sumo Logic App for Payment Card Industry (PCI) Compliance for AWS CloudTrail App offers dashboards to monitor systems, account and users activity to ensure that login activity and privileged users are within the expected ranges. The PCI Compliance for AWS CloudTrail App covers PCI requirements 02, 07, 08 and 10.



## Collecting Logs for the PCI Compliance for AWS CloudTrail App

This section provides instructions for collecting logs for the the PCI Compliance for AWS CloudTrail App.

To configure an AWS CloudTrail Source, do the following:
1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
2. [Configure CloudTrail](http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html) in your AWS account.
3. Confirm that logs are being delivered to the Amazon S3 bucket.
4. Add an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source) to Sumo Logic.
5. Install the Sumo Logic App for [PCI Compliance for AWS CloudTrail](#installing-the-pci-compliance-for-aws-cloudtrail-app).


## Installing the PCI Compliance for AWS CloudTrail App

Now that you have set up collection, install the Sumo Logic App for PCI Compliance for AWS CloudTrail to use the preconfigured searches and [dashboards](#viewing-pci-compliance-for-aws-cloudtrail-dashboards) that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing PCI Compliance for AWS CloudTrail Dashboards

The Sumo Logic PCI Compliance for AWS CloudTrail App provides dashboards and sample queries that you can modify for your specific compliance needs.
* Access Monitoring
* Login Activity
* Account and System Monitoring
* Privileged Activity


### PCI Req 01 - Access Monitoring

See the details of security group activities and all AWS activities in compliance with PCI Requirement 01.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-CloudTrail-PCI-Req-01-Access-Monitoring.png')} alt="PCI Compliance for AWS CloudTrail" />

* **Security Group Activity.** Pie chart of the security group activity over the last 24 hours.
* **Security Group Activity.** Aggregation table of the security group activity over the last 24 hours.
* **Security Group Activity Over Time.** Bar chart of security group activity time sliced by 30 minutes for the last 24 hours.
* **(All AWS Activities) Non Read Only Events.** Aggregation table of the user, event, and count of non-read only events.
* (**All AWS Activities) Read Only Events.** Aggregation table of the user, event, and count of read only events.


### PCI Req 10 - Login Activity

See the details of failed logins and successful logins in compliance with PCI Requirement 10.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-CloudTrail-PCI-Req-10-Login-Activity.png')} alt="PCI Compliance for AWS CloudTrail" />

* **Failed API Calls.** Total number of failed API calls over the last 24 hours. Adjust time range as needed.
* **Failed API Calls- Reason - Login Credentials and Permission Issues.** Aggregation table detailing failed API calls, source IP, destination user, event type, error code, region, and account ID.
* **Failed API Calls - Acct Breakup.** Aggregation table of accounts with failed API calls and the number of events.
* **Console Root Login Failures**. See the count of console root login failures in the last 24 hours.
* **Console Root Login Failures**. See the details of console root login failures, in the last 24 hours, including the time, type, source type, destination user, MFA used, event type, event name, error message, principal ID, AWS region, and account ID.
* **Console Login Failures.** Aggregation table of failed logins from the console.
* **Successful Console Logins.** Total number of successful logins over the last 24 hours. Adjust time range as needed.
* **Successful Console Logins.**  For more details on successful console logins, see the aggregation table of the successful logins over the 24 hours.
* **Successful Root Console Logins**. See the count of successful console root logins in the last 24 hours.
* **Successful Root Console Logins**. See the details of successful console root logins, in the last 24 hours, including the time, type, source IP, destination user, MFA used, event type, event name, principal ID, AWS region, and account ID.



### PCI Req 08 - Account, System Monitoring

Search user account and IAM activity in compliance with PCI Requirement 08.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-CloudTrail-PCI-Req-08-Account-System-Monitoring.png')} alt="PCI Compliance for AWS CloudTrail" />

* **Created Users.** Aggregation table of users created in the last 24 hours.
* **Deleted Users.** Aggregation table of users deleted in the last 24 hours.
* **Created Roles.** Aggregation table of users created in the last 24 hours.
* **Deleted Roles.** Aggregation table of users deleted in the last 24 hours.
* **Created Access Key.** Aggregation table of access keys created in the last 24 hours.
* **Deleted Access Key.**  Aggregation table of access keys deleted in the last 24 hours.
* **IAM Activity.** Pie chart detailing the percentage of IAM Activity for policies and users over the last 24 hours.
* **IAM Activity.** Aggregation table of IAM Activity for policies and users over the last 24 hours.
* **Create, Delete Group**. See the details of the events - create group, and delete group, in the last 24 hours including the event time, event name, event source, user, group name, group ID, account ID, AWS region, and source IP address.
* **Added, Removed User To and From Group**. See the details of the events - add user to group, and remove user from group, in the last 24 hours including the event time, event name, event source, user, destination user, group name, account ID, AWS region, and source IP address.
* **Password - Create, Update, Delete**. See the details of the events - change password, update login profile, and delete login profile, in the last 24 hours including the event time, event name, event source, user, destination user, account ID, AWS region, source IP address, error code, and error message.
* **IAM Events Over Time.** IAM events over the last 24 hours time sliced by every 30 minutes.


### PCI Req 08, 10 - Privileged Activity

See the successful and failed configuration changes, policy changes, and security group activity.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-CloudTrail-PCI-Req-08-10-Privileged-Activity.png')} alt="PCI Compliance for AWS CloudTrail" />

#### Successful Configuration Changes
* **Successful Configuration Changes.** Pie chart of the successful configuration changes over the last 24 hours.
* **Successful Configuration Changes.** Aggregation table of the successful configuration changes over the last 24 hours.

#### Failed Configuration Changes
* **Failed Configuration Changes. **Pie chart of the failed configuration changes over the last 24 hours.
* **Failed Configuration Changes.** Aggregation table of the failed configuration changes over the last 24 hours.

#### Security Groups
* **Created Security Groups.** Aggregation table of security groups created in the last 24 hours.
* **Deleted Security Groups.** Aggregation table of security groups created in the last 24 hours.
* **Operation Failure - Authorize, Revoke Security Groups Ingress, Egress Rules**. See the details of failed events - authorize security group ingress, authorize security group egress, revoke security group ingress, and revoke security group egress, in the last 24 hours, including the event time, event name, user, group ID, account ID, error code, error message, and source IP address.
* **Operation Success - Authorize, Revoke Security Groups Ingress, Egress Rules**. See the details of successful events - authorize security group ingress, authorize security group egress, revoke security group ingress, and revoke security group egress, in the last 24 hours, including the event time, event name, user, group ID, account ID, AWS region, and source IP address.
* **Security Group Activity Over Time. **Histogram of security group activity over the last 24 hours time sliced by hour.

#### Policy Operations
* **Failed Policy Changes**. See the details of failed policy changes, in the last 24 hours, including the event time, event name, event source, policy name, user, account ID, AWS region, source IP address, error code, and error message.
* **Successful Policy Changes**. See the details of successful policy changes, in the last 24 hours, including the event time, event name, event source, policy name, user, account ID, AWS region, and source IP address.

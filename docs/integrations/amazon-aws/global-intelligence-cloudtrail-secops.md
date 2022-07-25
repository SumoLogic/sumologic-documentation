---
id: global-intelligence-cloudtrail-secops
title: Global Intelligence for AWS CloudTrail SecOps
description: Global Intelligence for AWS CloudTrail SecOps
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This feature is available in the following account plans.

<table>
  <tr>
   <td>Account Type
   </td>
   <td>Account Level
   </td>
  </tr>
  <tr>
   <td>Cloud Flex
   </td>
   <td>Trial, Enterprise
   </td>
  </tr>
  <tr>
   <td>Cloud Flex Credits
   </td>
   <td>Trial, Enterprise Suite, Enterprise Security
   </td>
  </tr>
</table>


The Global Intelligence for AWS CloudTrail App enables you to detect potentially malicious configuration changes in your AWS account by comparing [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) events in your account against a cohort of AWS customers. CloudTrail events are curated from AWS penetration tests and operational best practices.


Our new app install flow is now in Beta. It is only enabled for certain customers while we gather Beta customer feedback. If you can see the Add Integration button, follow the "Before you begin" section in the "Collect Logs" help page and then use the in-product instructions in Sumo Logic to set up the app.

This application name is abbreviated to **GI CloudTrail** on these documentation pages, as well as in the application pages.

The App dashboard displays enable you to determine the following:

* How your attack surface compares to your peers
* [MITRE Attack Framework](https://attack.mitre.org/) tactics that are evident in your organization compared to your peers. MITRE ATT&CK is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations.  
* Resources that are impacted
* An action plan to improve security posture in your AWS infrastructure

The current scope of this application includes the following AWS services and associated resource types:



1. **Amazon EC2**: count of compute instances, security groups, route tables and Amazon Machine Images
2. **Amazon S3**: count of buckets
3. **Amazon RDS**: count of database instances, DB security groups
4. **Amazon Redshift**: count of database clusters and parameter groups
5. **AWS Lambda**: count of function names
6. **AWS IAM**: count of IAM users, roles and groups
7. **AWS CloudTrail**: counts of trail instances


## Log Types  

Global Intelligence for AWS CloudTrail App uses AWS CloudTrail logs.


## Collect Logs and Metrics

## Install the App


## Viewing AWS Dashboards

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="AWS API Gateway" />

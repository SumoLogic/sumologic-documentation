---
id: global-intelligence-cloudtrail-devops
title: Global Intelligence for AWS CloudTrail DevOps
description: global-intelligence-cloudtrail-devops
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
   <td>CloudFlex
   </td>
   <td>Trial, Enterprise
   </td>
  </tr>
  <tr>
   <td>Credits
   </td>
   <td>Trial, Enterprise Operations, Enterprise Security, Enterprise Suite
   </td>
  </tr>
</table>

Our new app install flow is now in Beta. It is only enabled for certain customers while we gather Beta customer feedback. If you can see the Add Integration button, follow the "Before you begin" section in the "Collect Logs" help page and then use the in-product instructions in Sumo Logic to set up the app.

Global Intelligence for AWS CloudTrail - DevOps provides insights for on-call engineers, infrastructure engineers, and DevOps users accelerate root cause analysis for incidents by providing error rate and configuration insights benchmarked from Sumo Logic’s AWS customers for nine AWS services:



* Amazon EC2
* Amazon S3
* AWS Elastic Load Balancing
* Amazon RDS
* Amazon Redshift
* Amazon DynamoDB
* Amazon Elasticache
* AWS Lambda
* AWS Auto Scaling

The benchmarks are powered by more than 15 M data points per week from AWS CloudTrail logs for a few thousand Sumo Logic tenants across 27 AWS regions.

A well-architected modern app running on AWS can experience four types of errors during mission-critical scale-out events leading to an outage or application incident. These include:



* Service Availability errors, where a particular AWS service (For example, EC2) may be unavailable.
* Throttling errors, where AWS rate-limits API traffic from the customer’s application for a given service and API. (For example, PutItem requests for AWS DynamoDB.)
* Account Quota errors, where a customer may saturate account limits for a particular service and resource. (For example, exceeding the 100 buckets per account limit of AWS S3.)
* Insufficient capacity/out-of-stock errors where AWS is unable to provide resources of a particular size in a given region, such as EC2 m4.xlarge instances in us-west-1.

By comparing a given customer’s AWS error rate against other customers by AWS region, service, API, AWS account, and instance types, Global Intelligence for AWS CloudTrail DevOps, helps identify if such errors might be the probable cause of an incident.

In addition, the app provides configuration guidance for key AWS services based on settings common among other customers.



* Configuration guidance includes memory and concurrency settings for AWS Lambda, provisioned IOPS for DynamoDB, and min/max sizes of EC2 Auto Scaling groups.
* For throttling-related root causes for some services like AWS Lambda and AWS DynamoDB, such guidance can help users right-size their apps based on common configuration settings.
* An action plan helps users focus their attention on specific microservices in particular AWS accounts that might be experiencing errors.


### Log Types  

Global Intelligence for CloudTrail DevOps App uses AWS CloudTrail logs.


## Collect Logs and Metrics

## Install the App

## Viewing AWS Dashboards

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="AWS API Gateway" />

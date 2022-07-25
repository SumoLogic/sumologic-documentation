---
id: cloudtrail
title: AWS CloudTrail
sidebar_label: AWS CloudTrail
description: AWS CloudTrail
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Amazon Web Services (AWS) CloudTrail records API calls made to AWS. The Sumo Logic App for CloudTrail ingests these logs, providing greater visibility into events that, in turn, allows for security and operations forensics. For example, you can use the Sumo Logic App for CloudTrail to analyze raw CloudTrail data to investigate user behavior patterns. Or, by correlating CloudTrail data with other data sets, you can get a broader understanding of events from operating systems, intrusion detection systems, or even application logs.

ImportantOur new app install flow is now in Beta. It is only enabled for certain customers while we gather Beta customer feedback. If you can see the Add Integration button, follow the "Before you begin" section in the "Collect Logs" help page and then use the in-product instructions in Sumo Logic to set up the app.

Before you begin
Before you can begin to use the Sumo Logic App for CloudTrail, you’ll need to make sure that you’ve configured CloudTrail in your AWS account. Additionally, confirm that logs are being delivered to the S3 Bucket you’ll use to send the logs to Sumo Logic. For more information, and instructions, see Collect logs for the AWS CloudTrail App.

Using the App for CloudTrail in multiple environments
If you have more than one environment that generates CloudTrail data (such as ops, dev, and so on) you’ll need to configure a separate S3 Source for each environment. You can learn more here.


## Collect Logs and Metrics

## Install the App


## Viewing Dashboards

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="Aurora MySQL ULM" />

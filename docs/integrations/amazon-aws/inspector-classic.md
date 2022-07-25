---
id: inspector-classic
title: Sumo Logic App for Amazon Inspector - Classic
sidebar_label: Amazon Inspector App - Classic
description: Amazon Inspector App - Classic
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/inspector-classic.png')} alt="DB icon" width="50"/>


For information about our newer app for Amazon Inspector, which leverages findings from AWS Security Hub, see Amazon Inspector.
Amazon Inspector allows you to monitor your AWS resources for potential security risks. The Sumo Logic App for Amazon Inspector provides preconfigured searches and Dashboards that give you instant access to an overview of Amazon Inspector as well as details on assessments, runs, and findings.

The App uses a Lambda function to collect assessment run events (notifications) directly from the Amazon Inspector service, which then retrieves further details via the Inspector API, and finally sends them over to a Sumo Logic HTTP Source endpoint.

Notifications
For more information on Amazon Inspector notifications, see:

http://docs.aws.amazon.com/inspector/latest/userguide/inspector_assessments.html


## Collect Data

## Install the App

## Viewing AWS Dashboards

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="AWS API Gateway" />

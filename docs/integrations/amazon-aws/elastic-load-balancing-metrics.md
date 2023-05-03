---
id: elastic-load-balancing-metrics
title: AWS Elastic Load Balancing Metrics
description: The Sumo Logic App for AWS Elastic Load Balancing (ELB) Metrics lets you analyze the CloudWatch ELB metrics for the Application Load Balancer (ALB), and the Classic Load Balancer (CLB).
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/elb-metrics.png')} alt="Thumbnail icon" width="50"/>

The Sumo Logic App for AWS Elastic Load Balancing (ELB) Metrics lets you analyze the CloudWatch ELB metrics for the Application Load Balancer (ALB), and the Classic Load Balancer (CLB). The App provides preconfigured searches and dashboards that allow you to monitor the metrics healthy hosts, unhealthy hosts, HTTP backend codes, latency, requests, and more.

## Collect Metrics for the AWS Elastic Load Balancing App

### Metrics Types

For details on Amazon CloudWatch collected metrics, refer to:
http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CW_Support_For_AWS.html

For information on collecting unified logs and metrics for AWS Elastic Load Balancing Metrics, see [AWS Elastic Load Balancing ULM - Application](/docs/integrations/amazon-aws/elastic-load-balancer-app.md).

To collect AWS Elastic Load Balancing Metrics, perform the following tasks:
1. [Configure a Hosted Collector](#Collect-Metrics-for-the-AWS-Elastic-Load-Balancing-App)
2. [Add a CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)


## Installing the AWS ELB Metrics App

Now that you have configured AWS ELB Metrics, install the Sumo Logic App for AWS Elastic Load Balancing Metrics to take advantage of the preconfigured searches and dashboards to analyze your data.

{@import ../../reuse/apps/app-install.md}

## Viewing AWS ELB Metrics Dashboards

### Application Load Balancer

#### AWS Elastic Load Balancing Metrics - ALB - Overview

<img src={useBaseUrl('img/integrations/amazon-aws/aws-alb_app_overview.png')} alt="Amazon CloudWatch - ELB Metrics dashboards" />

**Overall Average Healthy vs Unhealthy Host Count. **Displays the overall average number of healthy vs unhealthy hosts in a line chart on a timeline for the last hour.

**Average UnHealthyHostCount per Availability Zone.** Shows the average number of unhealthy hosts per availability zone in a line chart on a timeline for the last hour.

**Overall RequestCount.** Provides the overall request count in a line chart on a timeline for the last hour.

**HTTP Backend 5XX Code Count per Availability Zone. **Displays the number of HTTP backend 5XX codes per availability zone in a line chart on a timeline for the last hour.

**Request Count per Availability Zone.** Shows the number of requests per availability zone in a line chart on a timeline for the last hour.

**Average and Max Latency.** Provides details on average and max latency in a line chart on a timeline for the last hour.


#### AWS Elastic Load Balancing Metrics - ALB - Hosts (Healthy, Unhealthy)

<img src={useBaseUrl('img/integrations/amazon-aws/aws-alb_app_hosts.png')} alt="Amazon CloudWatch - ELB Metrics dashboards" />

**Average UnHealthyHostCount per Load Balancer.** Displays the average number of unhealthy hosts per load balancer in a line chart on a timeline for the last hour.

**Average HealthyHostCount per Load Balancer.** Shows the average number of healthy hosts per load balancer in a line chart on a timeline for the last hour.

**Average UnHealthyHostCount per Availability Zone.** Provides details on the average number of unhealthy hosts per availability zone in a line chart on a timeline for the last hour.

**Average HealthyHostCount per Availability Zone. **Displays the average number of healthy hosts per availability zone in a line chart on a timeline for the last hour.

**Backend Connection Errors Per Availability Zone.** Shows the number of backend connections errors per availability zone in a line chart on a timeline for the last hour.


#### AWS Elastic Load Balancing Metrics - ALB - HTTP Backend Codes

<img src={useBaseUrl('img/integrations/amazon-aws/aws-alb_app_http.png')} alt="Amazon CloudWatch - ELB Metrics dashboards" />

**HTTP Backend 5XX Count per Load Balancer. **Displays the number of HTTP backend 5XX status codes per load balancer in a line chart on a timeline for the last hour.

**HTTP Backend 5XX Count per Availability Zone.** Shows the number of HTTP backend 5XX status codes per availability zone in a line chart on a timeline for the last hour.

**HTTP Backend 4XX Count per Load Balancer. **Provides the number of HTTP backend 4XX status codes per load balancer in a line chart on a timeline for the last hour.

**HTTP Backend 4XX Count per Availability Zone.** Displays the number of HTTP backend 4XX status codes per availability zone in a line chart on a timeline for the last hour.

**HTTP Backend 3XX Count per Load Balancer. **Shows the number of HTTP backend 3XX status codes per load balancer in a line chart on a timeline for the last hour.

**HTTP Backend 3XX Count per Availability Zone. **Provides the number of HTTP backend 3XX status codes per availability zone in a line chart on a timeline for the last hour.

**HTTP Backend 2XX Count per Load Balancer. **Displays the number of HTTP backend 2XX status codes per load balancer in a line chart on a timeline for the last hour.

**HTTP Backend 2XX Count per Availability Zone.** Shows the number of HTTP backend 2XX status codes per availability zone in a line chart on a timeline for the last hour.


#### AWS Elastic Load Balancing Metrics - ALB - Latency and Requests

<img src={useBaseUrl('img/integrations/amazon-aws/aws-alb_app_latency.png')} alt="Amazon CloudWatch - ELB Metrics dashboards" />

**Average RequestCount Per Load Balancer.** Displays the average number of requests per load balancer in a line chart on a timeline for the last hour.

**Average and Max Latency (sec) per Load Balancer.** Shows the average and max latency in seconds per load balancer in a line chart on a timeline for the last hour.

**Average RequestCount per Availability Zone. **Provides the average number of requests per availability zone in a line chart on a timeline for the last hour.

**Average and Max Latency (sec) per Availability Zone.** Displays the average and max latency per availability zone in a line chart on a timeline for the last hour.


### Classic Load Balancer

#### AWS Elastic Load Balancing Metrics - CLB - Overview

<img src={useBaseUrl('img/integrations/amazon-aws/aws-clb_app_overview.png')} alt="Amazon CloudWatch - ELB Metrics dashboards" />

**Overall Average Healthy vs Unhealthy Host Count.** Displays the overall average number of healthy vs unhealthy hosts in a line chart on a timeline for the last hour.

**Average UnHealthyHostCount per Availability Zone.** Shows the average number of unhealthy hosts per availability zone in a line chart on a timeline for the last hour.

**Overall RequestCount.** Provides the overall request count in a line chart on a timeline for the last hour.

**HTTP Backend 5XX Code Count per Availability Zone. **Displays the number of HTTP backend 5XX codes per availability zone in a line chart on a timeline for the last hour.

**Request Count per Availability Zone. **Shows the number of requests per availability zone in a line chart on a timeline for the last hour.

**Average and Max Latency.** Provides details on average and max latency in a line chart on a timeline for the last hour.

**Overall Max SurgeQueueLength.** Displays the overall max surge queue length in a line chart on a timeline for the last hour.

**Overall Spillover Count.** Shows the overall spillover count in a line chart on a timeline for the last hour.


#### AWS Elastic Load Balancing Metrics - CLB - Hosts (Healthy, Unhealthy)

<img src={useBaseUrl('img/integrations/amazon-aws/aws-clb_app_hosts.png')} alt="Amazon CloudWatch - ELB Metrics dashboards" />

**Average UnHealthyHostCount per Load Balancer.** Displays the average number of unhealthy hosts per load balancer in a line chart on a timeline for the last hour.

**Average HealthyHostCount per Load Balancer.** Shows the average number of healthy hosts per load balancer in a line chart on a timeline for the last hour.

**Average UnHealthyHostCount per Availability Zone.** Provides details on the average number of unhealthy hosts per availability zone in a line chart on a timeline for the last hour.

**Average HealthyHostCount per Availability Zone.** Displays the average number of healthy hosts per availability zone in a line chart on a timeline for the last hour.


#### AWS Elastic Load Balancing Metrics - CLB - HTTP Backend Codes

<img src={useBaseUrl('img/integrations/amazon-aws/aws-clb_app_http.png')} alt="Amazon CloudWatch - ELB Metrics dashboards" />

**HTTP Backend 5XX Count per Load Balancer.** Displays the number of HTTP backend 5XX status codes per load balancer in a line chart on a timeline for the last hour.

**HTTP Backend 5XX Count per Availability Zone. **Shows the number of HTTP backend 5XX status codes per availability zone in a line chart on a timeline for the last hour.

**HTTP Backend 4XX Count per Load Balancer. **Provides the number of HTTP backend 4XX status codes per load balancer in a line chart on a timeline for the last hour.

**HTTP Backend 4XX Count per Availability Zone.** Displays the number of HTTP backend 4XX status codes per availability zone in a line chart on a timeline for the last hour.

**HTTP Backend 3XX Count per Load Balancer.** Shows the number of HTTP backend 3XX status codes per load balancer in a line chart on a timeline for the last hour.

**HTTP Backend 3XX Count per Availability Zone.** Provides the number of HTTP backend 3XX status codes per availability zone in a line chart on a timeline for the last hour.

**HTTP Backend 2XX Count per Load Balancer.** Displays the number of HTTP backend 2XX status codes per load balancer in a line chart on a timeline for the last hour.

**HTTP Backend 2XX Count per Availability Zone.** Shows the number of HTTP backend 2XX status codes per availability zone in a line chart on a timeline for the last hour.


#### AWS Elastic Load Balancing Metrics - CLB -  Latency and Requests

<img src={useBaseUrl('img/integrations/amazon-aws/aws-clb_app_latency.png')} alt="Amazon CloudWatch - ELB Metrics dashboards" />

**Average RequestCount Per Load Balancer. **Displays the average number of requests per load balancer in a line chart on a timeline for the last hour.

**Average and Max Latency (sec) per Load Balancer. **Shows the average and max latency in seconds per load balancer in a line chart on a timeline for the last hour.

**Average RequestCount per Availability Zone.** Provides the average number of requests per availability zone in a line chart on a timeline for the last hour.

**Average and Max Latency (sec) per Availability Zone. **Displays the average and max latency per availability zone in a line chart on a timeline for the last hour.


## Filters

The Sumo Logic App for Amazon CloudWatch - ELB Metrics also includes the following filters:

* _collector
* _source
* _sourceCategory
* AvailabilityZone
* LoadBalancerName
* Region

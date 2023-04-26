---
id: view-dashboards
title: View AWS Observability Solution Dashboards
sidebar_label: View AWS Dashboards
description: Learn how to use Explore to navigate your AWS Observability infrastructure, as well as providing links to the app dashboards.
---

## Availability

This feature is available in the following account plans.

| Solution Component | CloudFlex | Credits |
|:--|:--|:--|
| AWS Observability Dashboards | Trial, Professional, and Enterprise | Trial, Essentials, Enterprise Operations, Enterprise Security,  Enterprise Suite |
| Root Cause Explorer | Trail, Enterprise | Trial, Enterprise Operations, Enterprise Suite |

This page shows you how to intuitively navigate through your AWS environment using [Explore](/docs/dashboards-new/explore-view) to view resource analytics in the AWS Observability Solution app dashboards. As you investigate resources, data appears in the window on the right. Metric and log data are viewable on the same dashboard in one seamless view.

## Working with Explore View

The AWS Observability Solution comprises an intuitive dashboard framework that mirrors industry-standard AWS hierarchies. You can quickly navigate across multiple AWS accounts and view resources hosted in multiple locations worldwide. These locations are composed of AWS Regions and Availability Zones. 

## Navigate AWS Observability View

Explore is an out-of-the-box Sumo Logic navigation tool that provides an intuitive visual representation of your environment.

To open Explore and AWS Observability View, do the following:

1. Log in to Sumo Logic and click **+ New** on the top menu bar.
1. From the dropdown menu, choose **Explore**. 

    ![Explorer.png](/img/observability/Explorer.png)

    The Explore navigation panel appears on the left.

1. Click the **Explore By** arrow and select **AWS Observability** from
    the dropdown menu.

    ![OS_Explore_By_menu.png](/img/observability/OS_Explore_By_menu.png)

    An expandable list of your AWS environment hierarchy appears in the
    Explore panel.

    ![OS_AWS_Observability_Hierarchy_collapsed.png](/img/observability/OS_AWS_Observability_Hierarchy_collapsed.png)

## Navigate the AWS Observability Hierarchy

Once you open the AWS Observability View, you can peruse the accounts and related services in your AWS environment. 

To investigate services in your AWS environment, do the following:

1. With the AWS Observability view selected in Explore, select an account to view a list of its regions.

    The **AWS Account Overview** dashboard appears in the window on the right. The dashboard provides insights into the activities in the selected AWS account and gives you an at-a-glance view of the health and status of the AWS services in that account.

    ![AWS-Account-Overview.png](/img/observability/AWS-Account-Overview.png)

1. Similarly, from the expanded account, select a region.  

    The **AWS Region Overview** dashboard appears in the window on the right. The dashboard provides insights into the AWS account activities in that AWS region and gives you an at-a-glance view of the health and status of the AWS services in that account-region combination.  

    ![AWS-Region-Overview.png](/img/observability/AWS-Region-Overview.png)

1. From the expanded account and region combination, select a namespace/AWS service. The dashboard for the selected namespace appears in the window on the right. In our example, we selected the AWS EC2 Metrics namespace in the *us-east-1* region of the *prod* account.

![AWS-EC2-Metrics-Overview.png](/img/observability/AWS-EC2-Metrics-Overview.png)

## Drill down for root cause analysis

From each level in the hierarchy, you can drill-down to individual entities by opening any logs or metrics dashboard panel. To do so:

Select the graph data point you are interested in. In the following screenshot, we selected 5xx Error Codes by Load Balancer in the honeycomb graph. A list of related content links for our failed pod appears in a panel on the right.

![Drill_RCA.png](/img/observability/Drill_RCA.png)

For details, see [Drill down to discover root causes](../../../dashboards-new/drill-down-to-discover-root-causes.md).

## Troubleshooting with the AWS Observability Root Cause Explorer Dashboards

To troubleshoot production incidents using Root Cause Explorer, please follow the instructions in [the Root Cause Explorer documentation.](/docs/observability/root-cause-explorer.md). 

## Viewing AWS Observability Solution Dashboards

All of the apps are installed in a folder named **Sumo Logic AWS Observability Apps** that is located in your personal folder and can be viewed outside of Explore.

To add a new dashboard to your explore hierarchy, refer to the instructions in the [Add new Service documentation](/docs/observability/aws/other-configurations-tools/add-new-aws-service.md).

To view the app dashboards outside of Explorer, do the following:

1. Navigate to your Sumo Logic personal folder. 
1. Click an app folder to list the dashboard pages.
1. Click a page link to view the dashboard in the window on the right.   <br/>  ![App_folder.png](/img/observability/add-new-service.jpeg)

Click a link for information on the individual app dashboards:

* [AWS API Gateway Dashboards](../integrations/aws-api-gateway.md)
* [AWS Application Load Balancer Dashboards](../integrations/aws-application-load-balancer.md)
* [AWS DynamoDB Dashboards](../integrations/aws-dynamodb.md)
* [AWS EC2 Host Metrics Dashboards](../integrations/aws-ec2-host-metrics.md/)
* [AWS EC2 Metrics Dashboards](../integrations/aws-ec2-metrics.md)
* [AWS Lambda Dashboards](../integrations/aws-lambda.md)
* [Amazon RDS Dashboards](../integrations/aws-rds-metrics.md)
* [Amazon ElastiCache Dashboards](../integrations/amazon-elasticache.md)
* [Amazon ECS Dashboards](../integrations/amazon-ecs.md)
* [AWS Network ELB Dashboards](../integrations/aws-network-load-balancer.md)
* [Global Intelligence for AWS CloudTrail DevOps](/docs/integrations/amazon-aws/global-intelligence-cloudtrail-devops)
* [AWS Classic Load Balancer Dashboards](../integrations/aws-classic-load-balancer.md)
* [Amazon SNS Dashboards](/docs/observability/aws/integrations/amazon-sns.md)
* [Amazon SQS Dashboards](../integrations/amazon-sqs.md)

## More Information

* [Explore View](/docs/dashboards-new/explore-view.md)

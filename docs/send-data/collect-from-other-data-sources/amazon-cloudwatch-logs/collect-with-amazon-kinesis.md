---
id: collect-with-amazon-kinesis
title: Collect Amazon CloudWatch Logs using Amazon Kinesis
sidebar_label: Collect Logs using Amazon Kinesis
description: The Sumo Logic App for Amazon VPC Flow Logs provides a community-supported collection method using Kinesis stream to retrieve Amazon VPC Flow logs.
---

<!-- This was marked as PRIVATE - not in SIDEBARS -->


:::sumo
Using the Sumo Logic Kinesis Connector to collect CloudWatch Logs (including VPC FLow Logs) is a community-supported solution. It is not officially supported by Sumo Logic Support. To provide feedback, report a bug, or get help, log into the [Sumo Logic Community](https://community.sumologic.com/s/topic/0TOE0000000g8L6OAI/Apps).
:::

While the preferred method for collecting Amazon CloudWatch logs into Sumo Logic is using an AWS Lambda Function, an alternate method would be to configure Amazon CloudWatch logs to publish a log stream to Amazon Kinesis, then use the Sumo Logic Kinesis Connector to read the log data out of an Amazon Kinesis stream, and POST that data to a Sumo Logic HTTP Source.  

This approach was developed before Amazon released the ability to integrate AWS Lambda with Amazon CloudWatch Logs, and was originally developed to support the integration with AWS VPC Flow Logs. This approach requires more infrastructure and the integration of more AWS services than using the AWS Lambda based approach.  The one advantage that this approach offers is increased assurance of delivery because the data is pulled from the queue synchronously, and will retry in case of delivery failure.  In the current AWS Lambda based integration, data delivery failures may result in lost data. The Sumo Logic AWS Lambda functions are being enhanced to increase their fault tolerance.

In order to make this integration easier, Sumo Logic has provided the following items:

1. A JAVA based application, called **the Sumo Logic Kinesis Connector**.  This app pulls data from an Amazon Kinesis Stream, and POSTs that data to a Sumo Logic HTTP Source.  This app can be used to Collect CloudWatch Log formatted data, or any other form of custom log data that you may publish to Kinesis.   This app is hosted on [Sumo Logic's Git Hub account](https://github.com/SumoLogic/sumologic-kinesis-connector) .
1. An **Amazon CloudFormation Template**.   Sumo Logic provides a CloudFormation template to make setup easier. This template will create a Kinesis stream, subscribe it to your CloudWatch log group, and create an EC2 instance with the Sumo Logic Kinesis Connector.

## Create a Sumo Logic Hosted Collector and an HTTP Source

1. In Sumo Logic, create a Hosted Collector, using the instructions in [Set up a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector). 
1. Then, [configure an HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics).

You will use the HTTP URL when you create the CloudFormation stack.

## Download the CloudFormation Template

Sumo Logic provides a CloudFormation template to make setup easier. This template will create a Kinesis stream, subscribe it to your CloudWatch log group, and create an EC2 instance with the Sumo Logic Kinesis Connector. This will pull data from the Kinesis stream to send to Sumo Logic.

Download the template from: https://raw.githubusercontent.com/duchatran/sumologic-kinesis-connector/master/configuration/cloudformation/cwl_kinesis.template.

## Create a Stack

Using AWS CloudFormation, create a Stack with this template. For instructions, see http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.Walkthrough.html.

As part of the setup, you must provide:

 * AWS KeyName
 * LogGroup name
 * Sumo Logic HTTP Source URL

You can enable logging for this process to CloudWatch Logs. The template will take care of this setup, provision the CloudWatch Log group for it, etc.

For an example, see the following image:

![img](/img/send-data/SumoKinesisCloudFormation.png)

## Optional: Subscription Filter

This step is optional. To check that a subscription filter was created properly, use the following steps:

1. Login to the EC2 instance and run the following:

    ```
    aws logs describe-subscription-filters --log-group-name <LogGroupName> --region <YourRegion>
    ```

2. You should see a filter that reflects the Kinesis stream that was created by the stack. (Check the output of the stack for its ID.) If not, you may need to create a subscription filter manually, as follows:

    ```
    aws logs put-subscription-filter --log-group-name "<YourLogGroupName>" --filter-name "cwl-cfn-es-<YourKinesisStreamPhysicalID>" --region <YourRegion> --destination-arn "<YourKinesisStreamArn>" --role-arn "<YourCWLtoKinesisRoleArn>" --filter-pattern ""
    ```

Where `<YourKinesisStreamArn>` and `<YourCWLtoKinesisRoleArn>` can be retrieved from the output of the stack.

## Run the Script

Finally, login to the EC2 instance that just created, and run SumoVPCKinesis.bash

This wrapper script calls the Sumo Logic Kinesis connector to pull data continuously, similar to a regular Sumo Logic Collector using a Local Source.

To see the status of this connector, check the content of the file nohup.out.

## Troubleshooting VPC FLow Log Integrations

**What do I do if my VPCs are in different regions?**

You need to create a separate stack for each region, as each stack is tied to a unique Kinesis stream.

**I have multiple VPCs within the same region. What should I do?**

When you have multiple VPCs, we recommend that you use a separate CloudWatch Log Group for each VPC. The stack template however only supports reading from a single group. You can use a separate stack for each Log Group, but remember to use a different value for the "KinesisConnectorApp" parameter.

Alternatively, you can reuse the same stack, but you will need to manually subscribe all the log groups to the Kinesis stream created by the stack as follows:

1. Log in to the EC2 instance created by the stack (named “SumoLogic_Kinesis”).
1. From the shell, subscribe the Kinesis stream created by the stack to these log groups using Step 7 from the following Amazon documentation: http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/Subscriptions.html
 
```
aws logs put-subscription-filter --log-group-name <YourLogGroup> --filter-name "cwl-cfn-es-<NameThisFilter>" --filter-pattern ""
 --destination-arn <KinesisStreamArn>
 --role-arn <CWLtoKinesisArn> --region <YourRegion>
```

You will find the two arns from the stack outputs.

What’s the security setting for the VPC and EC2 instance created by the stack?

Everything is specified in the template. By default, it allows SSH access for any hosts from the IP ranges that you provide during the setup process. You can always change this after the stack is created.

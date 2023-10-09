---
id: collect-logs-aws-fargate
title: Collect Logs from AWS Fargate
sidebar_label: AWS Fargate
description: Learn how to collect logs from AWS Fargate.
---

AWS Fargate uses the AWSLogs driver to send container logs to AWS CloudWatch. Follow the instructions below to collect logs from AWS Fargate.

## Step 1: Configure containers for CloudWatch logging

Configure containers for CloudWatch logging by following the instructions in [Create a Task Definition](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted.html#first-run-task-def) in Amazon help. When creating your Task Definition, be sure to configure the logging to use the awsLogs driver, by setting the [logConfiguration parameter](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_storage) to "awslogs", currently the only logging driver supported by AWS Fargate.

## Step 2: Collect Amazon CloudWatch Logs

Sumo Logic provides multiple methods to collect logs from Amazon CloudWatch. Follow the instructions in [Amazon CloudWatch Logs](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/).

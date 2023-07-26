---
id: deploy-collectors-aws-opsworks
title: Deploy Sumo Logic Collectors on AWS OpsWorks
sidebar_label: AWS OpsWorks
description: Learn how to deploy Sumo Logic Collectors on AWS OpsWorks.
---


AWS OpsWorks provides a simple platform that allows you to easily create and manage stacks and applications. It supports standard components such as application servers, database servers, and load balancers, which you use to assemble a stack. These components all come with a standard configuration, but AWS OpsWorks also provides tools to help you create custom components and configuration. AWS OpsWorks also lets you manage related AWS resources, such as Elastic IP addresses and Amazon EBS volumes.

For more information, see [Getting Started](http://docs.aws.amazon.com/opsworks/latest/userguide/gettingstarted-opscm.html) for AWS OpsWorks.

1. Add https://github.com/SumoLogic/sumologic-collector-chef-cookbook.git to your layer.
1. Enter sumologic-collector as the recipe for Setup.
1. Enter the following JSON as Custom JSON in your stack:
    ```json
    {
    "opsworks": {
        "data_bags": {
            "sumo-creds": {
                "api-creds": {
                    "accessID": "...",
                    "accessKey": "..."
                }
            }
        }
    },
    "sumologic": {
        "sources": [
            {
                "sourceType": "LocalFile",
                "name": "foo",
                "pathExpression": "/var/logs/foo",
                "category": "foo",
                "useAutolineMatching": true,
                "multilineProcessingEnabled": false,
                "timeZone": "America/Los_Angeles",
                "automaticDateParsing": true,
                "forceTimeZone": false,
                "defaultDateFormat": "dd/MMM/yyyy HH:mm:ss"
            }
        ]
    }
    }
    ```
1. Deploy the Collector to AWS OpsWorks.

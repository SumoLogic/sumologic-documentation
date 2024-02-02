---
title: AWS Athena
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/aws.png)

Version: 1.1  
Updated: Jun 15, 2023

Amazon Athenais a cloud-based service that enables you to run SQL queries on data stored in Amazon S3 without the need to set up any infrastructure. It is a serverless, pay-per-query service that makes it easy to analyze large amounts of data.

  
* **Run Query** *(Enrichment)* - The action runs the SQL query statements contained in the Query and retrieve the results from the query
* **Start Query** *(Enrichment)* - Start a query execution
* **Get Query Execution** (*Enrichment*) - Returns the details of a single query execution or a list of up to 50 query executions
* **Get Query Results** *(Enrichment)* - Streams the results of a single query execution specified by the Query Execution ID
* **Cancel Query** (*Enrichment*) - Stops a query execution
* **List Databases** (*Enrichment*) - Lists the databases in the specified data catalog
* **List Workgroups** *(Enrichment)* - Lists available workgroups for the account
* **List Table Metadata** (*Enrichment*) - Lists the metadata for the tables in the specified data catalog database

## Amazon Athena configuration

1. To get access key and secret access key, you will need to follow these steps:
2. Sign in to your [AWS Management Console](https://console.aws.amazon.com/)
3. Click on your account name in the top-right corner of the screen and select "My Security Credentials" from the drop-down menu.
4. Click on the "Access keys" section in the left-hand menu.
5. Click on the "Create New Access Key" button.
6. Your new access key and secret access key will be displayed on the screen. Make sure to copy and save them in a secure location as you will not be able to access them again.

## Amazon Athena in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/aws-athena/aws-athena-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/aws-athena/aws-athena-2.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/aws-athena/aws-athena-3.png)

1. Populate all the required fields (\*) and then click Save.
   * Label: The desired name for the resource.
   * AWS Region: your AWS region. (Default: us-east-2)
   * Access Key ID: your Access Key ID.
   * Secret Access Key: your Secret Access Key. <br/>![](/img/platform-services/automation-service/app-central/integrations/aws-athena/aws-athena-4.png) 

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/aws-athena/aws-athena-5.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/aws-athena/aws-athena-6.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/aws-athena/aws-athena-7.png)

## External Libraries

* [AWS Athena](https://github.com/boto/boto3/blob/develop/LICENSE)

## Change Log

* February 22, 2023 (v1.0) - First upload
* June 15, 2023 (v1.1)- Updated the integration with Environmental Variables

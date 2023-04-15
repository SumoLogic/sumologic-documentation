---
id: add-new-aws-service
title: Add a New AWS Service to the AWS Observability Explore Hierarchy
sidebar_label: Add a New AWS Service
description: Learn how to add a new dashboard to the Hierarchy.
---

The AWS Observability view in Explore provides a unified view of your AWS Services within Sumo Logic from multiple AWS accounts. It shows a hierarchy across AWS accounts, regions, namespaces, and entities to present an intuitive navigation flow.

By default, the AWS Observability view supports the following services: AWS EC2, AWS API Gateway, AWS Lambda, AWS RDS, AWS DynamoDB, and AWS Application ELB. The purpose of this document is to guide you towards adding any dashboards you may have built for additional services to the AWS Observability hierarchy.

## Prerequisites

Before you can add dashboards for a new service to the AWS Observability
hierarchy: 

1. The AWS Observability solution must have already been installed for at least one supported service
1. You need to collect metrics for your service via a Sumo Logic AWS Cloudwatch metrics source for an AWS account that is already being monitored by the AWS Observability solution. We recommend creating a new AWS CloudWatch metrics source for the service you want to monitor as opposed to using an existing source for performance reasons.
1. You need to create at least one Sumo Logic dashboard based on CloudWatch metrics and log data to monitor the operations of the AWS Service in question.

## Add a new service to the AWS Observability View

As dashboards can be created based on both logs and metrics data, in this section, we identify how to add dashboards based on both data types to the AWS Observability Explore views. 

* [Step 1. Enrich Metrics Data](#step-1-enrich-metrics-data)
* [Step 2. Enrich Log Data](#step-2-enrich-log-data)
* [Step 3. Modify dashboards](#step-3-modify-dashboards)

## Step 1. Enrich Metrics Data 

### Add the **account** field as a metadata tag to the AWS CloudWatch metrics source

The Account field is already a part of CloudWatch metrics sources that were configured as part of the AWS Observability Solution’s CloudFormation template. Therefore the **Account** metadata field needs to be added to the CloudWatch metrics source using Fields configuration.

This can be done by following the steps below:

1. Log in to your Go to Sumo Logic account
1. In the AWS Observability solution, identify the account alias for the AWS account you have configured that is running the service you want to monitor
1. Edit the CloudWatch Metrics source for the AWS service you wish to add to the AWS Observability solution
1. Add **Account** field as by adding a field as shown in the screenshot below:

  ![Step1.png](/img/observability/Step1.png)

1. To confirm if the account tag is indeed added as metadata, go to your Sumo Logic AWS Cloudwatch Metric source and check the metrics data.

  ![Step1.1.png](/img/observability/Step1-1.png)

### Validate the namespace and region metadata tags 

The `namespace` and `region` tags are generally present in AWS CloudWatch metrics when collecting metrics using the Sumo Logic AWS CloudWatch metrics source. 

For the desired AWS Service, go to your Sumo Logic AWS Cloudwatch Metric
source and check the metric data.

1. Go to Sumo Logic account
1. Open a metrics tab and run a query to get metrics data for the AWS Service you wish to add to AWS Observability
1. Check the data in the Legend tab and ensure **namespace** and **region** metadata tags are present. If these are not present, you will not be able to add this service to the AWS Observability solution.<br/> ![Step2.png](/img/observability/Step2.png)

### Identify the AWS Resource Name field

An AWS Resource Name metadata field represents an instance of the AWS
service like table name, load balancer name, database instanceId,
database clusterId, API name, function name etc,. For AWS service you
wish to monitor, identify the field in the metrics data that can
uniquely represent the AWS service.

For Example, If we wish to monitor **AWS/SQS** service, then
**QueueName** can be used as the AWS Resource name.

![AWS_Resource_Field.png](/img/observability/AWS_Resource_Field.png)

### Update the existing hierarchy

Once all the tags are checked and identified in the metrics, we can
update the existing hierarchy to show the new AWS Service. Follow the
steps below to update the existing hierarchy :

1. Run the below curl command to get the existing AWS Observability hierarchy.

  ```bash
  curl -s -H "Content-Type: application/json" --user
  "<ACCESS_ID>:<ACCESS_KEY>" -X GET
  https://<SUMOLOGIC_URL>/api/v1/entities/hierarchies | json_pp
  -json_opt pretty,canonical | grep -B 80 "\"AWS Observability\"" |
  grep "id" | head -1 | awk -F":" '{ print $2}' | tr -cd '[:digit:]' |
  xargs -I {} curl -s -H "Content-Type: application/json" --user
  "<ACCESS_ID>:<ACCESS_KEY>" -X GET
  https://<SUMOLOGIC_URL>/api/v1/entities/hierarchies/{} | json_pp -json_opt pretty
  ```

  The output of the command will look something like below (it is trimmed output, the actual output can vary as per your hierarchy):

  ```json
  {
    "filter": null,
    "id": "0000000000000278",
    "level": {
      "nextLevel": {
        "nextLevel": {
          "nextLevelsWithConditions": [
            {
              "condition": "AWS/ApplicationElb",
              "level": {
                "entityType": "loadbalancer",
                "nextLevelsWithConditions": [],
                "nextLevel": null
              }
            },
            {
              "condition": "AWS/ApiGateway",
              "level": {
                "nextLevel": null,
                "entityType": "apiname",
                "nextLevelsWithConditions": []
              }
            }
          ],
          "entityType": "namespace",
          "nextLevel": null
        },
        "nextLevelsWithConditions": [],
        "entityType": "region"
      },
      "nextLevelsWithConditions": [],
      "entityType": "account"
    },
    "name": "AWS Observability"
  }
  ```

1. If the AWS Service namespace is not present in the output JSON, update the JSON as below. We are taking AWS/SQS as an example here.

  ```json
  {
    "filter": null,
    "id": "0000000000000278",
    "level": {
      "nextLevel": {
        "nextLevel": {
          "nextLevelsWithConditions": [
            {
              "condition": "AWS/ApplicationElb",
              "level": {
                "entityType": "loadbalancer",
                "nextLevelsWithConditions": [],
                "nextLevel": null
              }
            },
            {
              "condition": "AWS/ApiGateway",
              "level": {
                "nextLevel": null,
                "entityType": "apiname",
                "nextLevelsWithConditions": []
              }
            },
            {
              "condition": "AWS/SQS", -> Namespace
              "level": {
                "nextLevel": null,
                "entityType": "queuename", -> AWS Resource Name identified in Step 1.3
                "nextLevelsWithConditions": []
              }
            }
          ],
          "entityType": "namespace",
          "nextLevel": null
        },
        "nextLevelsWithConditions": [],
        "entityType": "region"
      },
      "nextLevelsWithConditions": [],
      "entityType": "account"
    },
    "name": "AWS Observability"
  }
  ```

1. Update the hierarchy using the below command.

  ```bash
  curl -s -H "Content-Type: application/json" --user
  "<ACCESS_ID>:<ACCESS_KEY>" -X PUT
  https://<SUMOLOGIC_URL>/api/v1/entities/hierarchies/<ID> -d
  '<JSON_CONTENT_AFTER_UPDATE>'
  ```

:::note
1. **ACCESS_ID** and **ACCESS_KEY** - Replace parameters with your sumo logic access Id and access key.
1. **SUMOLOGIC_URL** - Replace with service endpoint URL as per deployment.
1. **ID** - Replace with the hierarchy ID as present in the JSON output from Step 1.
1. **JSON_CONTENT_AFTER_UPDATE** - Replace with the JSON updated with new AWS service after Step 2.
:::

### Validate the new Hierarchy

Once you are done with the above steps, the AWS service will be added to the AWS Observability view hierarchy. To validate this:

1. Go To Explorer in your Sumo Logic account.
1. Select AWS Observability from the dropdown.
1. You should be able to see the new service in the hierarchy represented by namespace/entity.

![Validate_hierarchy.png](/img/observability/Validate_hierarchy.png)


## Step 2. Enrich Log Data

### Add **account** field to log data

Logs from AWS services are collected into Sumo Logic via Amazon S3, AWS Elastic Load Balancing, Amazon Cloudfront, AWS CloudTrail, Amazon S3 Audit, or HTTP Log source (Cloudwatch logs). You can add metadata fields to sources using Fields configuration. 

Add account field by adding fields to your log source as shown below:

![Step8.png](/img/observability/Step8.png)

### Add the **namespace** and **region** metadata tags to log data using Field Extraction Rule

To enrich the logs data with namespace, region, and aws resource name, we will create a Field Extraction Rule that will add metadata to the logs.

We will take AWS/SQS as an example. For SQS, we selected QueueName as our resource name in metrics data. We will create below FER to extract region, namespace, and queuename from CloudTrail logs.

**Name: AwsObservabilitySqsFieldExtractionRule**

Scope:

```sql
(_sourceCategory=aws/observability/cloudtrail/logs "eventSource":"sqs.amazonaws.com")
```

Parse expression:

```sql
json "eventSource", "awsRegion", "requestParameters" as eventSource, region, requestParameters nodrop
| json field=requestParameters "queueName" as queuename nodrop
| where eventSource = "sqs.amazonaws.com"
| "aws/sqs" as namespace
| fields region, namespace, queuename
```

![Enrich_Log_Data.png](/img/observability/Enrich_Log_Data.png)

:::note
Depending on different log types, you can create a FER to extract region, namespace, and aws resource name.
:::

## Step 3. Modify Dashboards

### Add Stack Linking to Dashboards

To add any dashboard to the hierarchy, perform the below steps:

1. Go to your dashboard in the Sumo Logic account. 
1. Select **Create Stack Linking** as per the below screenshot.<br/> ![Step5.png](/img/observability/Step5.png)
1. In the pop-up, add the fields shown below to make it part of AWS Observability in the hierarchy.
  * account: `*`
  * region: `*`
  * namespace: `<namespace of aws service>` Example for SQS Service provide value as aws/sqs
  * AWS Resource name: * For example, if you were to use SQS, the Key here will be `“queuename”`
  :::note
  The number of keys added decides the dashboards placement in Hierarchy. For example, if you add **account** and **region** in stack linking, dashboards will be present at the **region** level in the hierarchy.  
  :::

Consider the example of an SQS dashboard:  
1. Add dashboard at the namespace level.
   * Add account, region, namespace in stack linking. <br/>  ![Step5.1.png](/img/observability/Step5-1.png)
   * Go to AWS Observability view to look at the dashboard on namespace level. <br/>  ![Step5.2.png](/img/observability/Step5-2.png)
1. Add dashboard at queuename level.
   * Add account, region, namespace, and queuename in stack linking.<br/>  ![Dasboard_Stack_Linking.png](/img/observability/Dasboard_Stack_Linking.png)
   * Go to AWS Observability view to look at the dashboard on queuename level. <br/>  ![queuename_level.png](/img/observability/queuename_level.png)

### Add Template Variables (Optional)

You can add template variables to dashboards to better filter your data in the AWS Observability view.

Follow the steps to add variables to the dashboards:

1. Go to the dashboard.
1. Click **+** button near the ”Create a template variable” text.
1. Add a template variable as shown below:<br/>![Step6.1.png](/img/observability/Step6-1.png)

Refer to this document for further details on how to use filters with template variables.

### Improve Queries to include variables in log queries (Optional)

Write log queries to include variables so data can be filtered in the
Explore view. See the Sumo Logic help doc for details on how to use
template variables in log queries.

For example:

```sql
account={{account}} namespace={{namespace}} region={{region}} queuename={{queuename}} “sqs.amazonaws.com”
| json "eventName", "awsRegion", "requestParameters.queueName", "sourceIPAddress", "userIdentity.userName" as event_name, Region, queuename, src_ip, user
| count by event_name
```

### Improve queries to include variables in metrics queries (Optional)

You can add the created template variable to queries to better filter
the data. Please see this document help doc for details

You can add a variable to your queries by using

```sql
<key name> = {{variable name}}
```

For example:

```sql
namespace=aws/sqs metric=NumberOfMessagesSent
account={{account}}  region={{region}} queuename={{queuename}} | avg by QueueName, account, region, namespace
```

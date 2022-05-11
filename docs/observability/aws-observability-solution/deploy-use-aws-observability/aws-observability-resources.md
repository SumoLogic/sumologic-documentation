---
id: aws-observability-resources
---

# AWS Observability Resources

Deployment using Terraform and the CloudFormation template creates a number of resources in AWS and in Sumo Logic.

* [Resources created in AWS](#resources-created-in-aws)
* [Terraform resources](#terraform) created in Sumo Logic
* [AWS CloudFormation resources](#aws-cloudformation) created in Sumo Logic

## Resources created in AWS

Executing the Terraform script and the AWS CloudFormation template creates or modifies the following resources in the AWS account if you are not already collecting data from those AWS services. If you are, the AWS CloudFormation template will simply integrate with your existing collector sources.

:::note
In the table below, the "Applicable AWS Observability Dashboards" column lists the app dashboards that make use of the data source in the "AWS Data Source" column.
:::

|AWS Data Source | AWS Resources Created | Applicable AWS Observability Dashboards |
|--|--|--|
| AWS CloudTrail Logs | S3 Bucket<br/>SNS Topic<br/>AWS Trail<br/>SNS Subscription<br/>AWS Lambda<br/>IAM Roles | AWS API Gateway<br/>AWS Lambda<br/>Amazon DynamoDB<br/>Amazon RDS<br/>Amazon ECS<br/>Amazon ElastiCache |
| Amazon CloudWatch Metrics | AWS Lambda<br/>IAM Roles<br/>Kinesis Firehose<br/>CloudWatch Metrics Stream | AWS API Gateway<br/>AWS Lambda<br/>Amazon DynamoDB<br/>AWS Application Load Balancer <br/>Amazon RDS<br/>Amazon ECS<br/>Amazon ElastiCache<br/>AWS Network Load Balancer |
| Amazon Application Load Balancer logs | S3 Bucket<br/>SNS Topic<br/>SNS Subscription<br/>AWS Lambda<br/>IAM Role | AWS Application Load Balancer  |
| AWS Lambda CloudWatch logs | AWS Lambda<br/>IAM Roles | AWS Lambda  |
| AWS Classic Load Balancer Logs | S3 Bucket<br/>SNS Topic<br/>SNS Subscription<br/>AWS Lambda<br/>IAM Role | AWS Classic Load Balancer |


If you are using an existing bucket to collect AWS ELB logs, the Amazon S3 bucket policy for this bucket will be updated to include the policy below, if in case the policy does not already exist:

```
{
"Sid": "AwsAlbLogs",
"Effect": "Allow",
"Principal": {
"AWS": "arn:aws:iam:::root"
},
"Action": [
"s3:PutObject"
],
"Resource": "arn:aws:s3:::{bucket_name}/*"
}
```

## Resources created in Sumo Logic

### Terraform

[Terraform](deploy-use-aws-observability/deploy-with-terraform.md) execution creates the following resources in Sumo Logic.

| Resource                                           | Name                                                 |
|----------------------------------------------------|------------------------------------------------------|
| CloudTrail Logs Source                             | CloudTrail Logs \<AWS Region\>                        |
| Application Load Balancer - Access Logs Source     | Elb Logs \<AWS Region\>                               |
| Metrics - AWS CloudWatch Metric Source             | CloudWatch Metrics \<AWS Region\> \<AWS Service name\> |
| Metrics - Kinesis Firehose for Metrics Source      | CloudWatch Metrics \<AWS Region\>                     |
| CloudWatch Logs - Lambda Log forwarder Source      | CloudWatch Logs \<AWS Region\>                        |
| CloudWatch Logs - Kinesis Firehose for Logs Source | CloudWatch Logs \<AWS Region\>                        |
| Inventory Source                                   | AWS Inventory \<AWS Region\>                          |
| Xray Source                                        | AWS Xray \<AWS Region\>                               |

#### AWS CloudFormation

The [AWS CloudFormation](/docs/observability/aws-observability-solution/deploy-use-aws-observability/deploy-aws-observability/deploy-with-aws-cloudformation) template execution creates the following resources in Sumo Logic.

| Resource                                           | Name                                                 |
|----------------------------------------------------|------------------------------------------------------|
| App folder | AWS Observability-\<Version\> \<Date of installation\> |
| Alerts | 	
AWS Observability \<Version\> \<Date and Time of Installation\> |
| Hosted Collector | aws-observability-\<AccountAlias\>-\<AccountID\> |
| Field Extraction Rule | AwsObservabilityFieldExtractionRule<br/>AwsObservabilityAlbAccessLogsFER<br/>AwsObservabilityApiGatewayCloudTrailLogsFER<br/>AwsObservabilityDynamoDBCloudTrailLogsFER<br/>AwsObservabilityLambdaCloudWatchLogsFER<br/>AwsObservabilityRdsCloudTrailLogsFER<br/>AwsObservabilityECSCloudTrailLogsFER<br/>AwsObservabilityElastiCacheCloudTrailLogsFER<br/>AwsObservabilityElbAccessLogsFER<br/>AwsObservabilityEC2CloudTrailLogsFER |
| Explorer View | 	
AWS Observability |
| Metric Rules | AwsObservabilityRDSClusterMetricsEntityRule<br/>AwsObservabilityRDSInstanceMetricsEntityRule<br/>AwsObservabilityNLBMetricsEntityRule |
| CloudTrail source | cloudtrail-logs-\<AWS::Region\> |
| CloudWatch logs (HTTP) source | cloudwatch-logs-\<AWS::Region\> |
| Kinesis Firehose for Metrics | cloudwatch-metrics-\<AWS::Region\> |
| CloudWatch Metrics source | cloudwatch-metrics-\<AWS::Region\>-ApplicationELB<br/>cloudwatch-metrics-\<AWS::Region\>-ApiGateway<br/>cloudwatch-metrics-\<AWS::Region\>-DynamoDB<br/>cloudwatch-metrics-\<AWS::Region\>-Lambda<br/>cloudwatch-metrics-\<AWS::Region\>-ELB<br/>cloudwatch-metrics-\<AWS::Region\>-RDS<br/>cloudwatch-metrics-\<AWS::Region\>-ECS<br/>cloudwatch-metrics-\<AWS::Region\>-NetworkELB<br/>cloudwatch-metrics-\<AWS::Region\>-ElastiCache<br/>cloudwatch-metrics-\<AWS::Region\>-SQS<br/>cloudwatch-metrics-<AWS::Region>-SNS |
| Amazon S3 Alb log source | alb-logs-\<AWS::Region\> |
| Amazon S3 Classic Load Balancer log source | classic-lb-logs-\<AWS::Region\> |
| Kinesis Firehose for Logs | kinesis-firehose-cloudwatch-logs-\<AWS::Region\> |
| Inventory Source | inventory-\<AWS::Region\> |
| XRay Source | xray-\<AWS::Region\> |
| S3 Bucket Name | aws-observability-logs-\<StackID\> |
| Fields | account<br/>accountid<br/>region<br/>namespace<br/>tablename<br/>loadbalancer<br/>functionname<br/>apiname<br/>dbidentifier<br/>dbinstanceidentifier<br/>dbclusteridentifier<br/>instanceid<br/>clustername<br/>cacheclusterid<br/>networkloadbalancer<br/>loadbalancername |

:::note
To improve the solution performance the configurations below are done by
CloudFormation template.

Sumo Logic hosted collector is created for each AWS Account.
:::
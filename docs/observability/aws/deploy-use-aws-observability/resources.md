---
id: resources
title: AWS Observability Resources
sidebar_label: Resources
description: Learn more about AWS Observability resources created and modified at deployment using Terraform and CloudFormation.
---


The CloudFormation template (CFN) creates a number of resources at deployment, in AWS, and in Sumo Logic. You will use the template when setting up the solution. See [Before You Deploy](/docs/observability/aws/deploy-use-aws-observability/before-you-deploy) for prerequisites and instructions to configure.

* For more information on the solution and features, see [About AWS Observability](/docs/observability/aws/about).


## Resources created in AWS

Executing the Terraform script and the AWS CloudFormation template creates or modifies the following resources in the AWS account if you are not already collecting data from those AWS services. If you are, the AWS CloudFormation template will simply integrate with your existing collector sources.

In the table below, the "Applicable AWS Observability Dashboards" column lists the app dashboards that make use of the data source in the "AWS Data Source" column.

<table>
  <tr>
   <td>AWS Data Source
   </td>
   <td>AWS Resources Created
   </td>
   <td>Applicable AWS Observability Dashboards
   </td>
  </tr>
  <tr>
   <td>AWS CloudTrail Logs
   </td>
   <td>S3 Bucket
<br/>
SNS Topic
<br/>
AWS Trail
<br/>
SNS Subscription
<br/>
AWS Lambda
<br/>
IAM Roles
   </td>
   <td>AWS API Gateway
<br/>
AWS Lambda
<br/>
Amazon DynamoDB
<br/>
Amazon RDS
<br/>
Amazon ECS
<br/>
Amazon ElastiCache
<br/>
Amazon SNS
<br/>
Amazon SQS
<br/>
AWS EC2
   </td>
  </tr>
  <tr>
   <td>Amazon CloudWatch Metrics Source
<br/>

   </td>
   <td>IAM Roles
   </td>
   <td>AWS API Gateway
<br/>
Amazon DynamoDB
<br/>
AWS Application Load Balancer
<br/>
Amazon RDS
<br/>
Amazon ECS
<br/>
Amazon ElastiCache
<br/>
AWS Network Load Balancer
<br/>
Amazon SNS
<br/>
Amazon SQS
<br/>
Amazon EC2
<br/>
   </td>
  </tr>
  <tr>
   <td>Amazon Kinesis Firehose Metric Source
   </td>
   <td>Kinesis Firehose
<br/>
CloudWatch Metrics Stream
   </td>
   <td>AWS API Gateway
<br/>
AWS Lambda
<br/>
Amazon DynamoDB
<br/>
AWS Application Load Balancer
<br/>
Amazon RDS
<br/>
Amazon ECS
<br/>
Amazon ElastiCache
<br/>
AWS Network Load Balancer
<br/>
Amazon SNS
<br/>
Amazon SQS
<br/>
AWS EC2
   </td>
  </tr>
  <tr>
   <td>Amazon Application Load Balancer logs
   </td>
   <td>S3 Bucket
<br/>
SNS Topic
<br/>
SNS Subscription
<br/>
AWS Lambda
<br/>
IAM Role
   </td>
   <td>AWS Application Load Balancer
   </td>
  </tr>
  <tr>
   <td>Lambda Log Forwarder (AWS CloudWatch logs)
   </td>
   <td>AWS Lambda
<br/>
IAM Roles
   </td>
   <td>AWS Lambda
   </td>
  </tr>
  <tr>
   <td>Kinesis Firehose Log source (AWS CloudWatch logs)
   </td>
   <td>Kinesis Firehose
<br/>
S3 Bucket*
   </td>
   <td>AWS Lambda
   </td>
  </tr>
  <tr>
   <td>AWS Classic Load Balancer Logs
   </td>
   <td>S3 Bucket
<br/>
SNS Topic
<br/>
SNS Subscription
<br/>
AWS Lambda
<br/>
IAM Role
   </td>
   <td>AWS Classic Load Balancer
   </td>
  </tr>
</table>


* For failed logs only.

If you are using an existing bucket to collect AWS ELB logs, the Amazon S3 bucket policy for this bucket will be updated to include the policy below, if in case the policy does not already exist:


```json
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

### Metadata Tags

The metadata tags are applied to Sumo Logic Sources.

<table>
  <tr>
   <td>Source
   </td>
   <td>Metadata tags applied
   </td>
   <td>Common fields created via FERs
   </td>
  </tr>
  <tr>
   <td>CloudWatch Metrics
   </td>
   <td>Account
   </td>
   <td>Not Applicable
   </td>
  </tr>
  <tr>
   <td>Host Metrics
   </td>
   <td>Account, Namespace
   </td>
   <td>Not Applicable
   </td>
  </tr>
    <tr>
   <td>CloudTrail Logs
   </td>
   <td>Account
   </td>
   <td>Account ID, Region, Namespace
   </td>
  </tr>
    <tr>
   <td>CloudWatch Logs
   </td>
   <td>Account, Account ID, Region
   </td>
   <td>Namespace
   </td>
  </tr>
    <tr>
   <td>Load Balancer Access Logs
   </td>
   <td>Account, Account ID, Region
   </td>
   <td>Namespace
   </td>
  </tr>
</table>

### Terraform

[Terraform](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform) execution creates the following resources in Sumo Logic.

<table>
  <tr>
   <td>Resource
   </td>
   <td>Name
   </td>
  </tr>
  <tr>
   <td>CloudTrail Logs Source
   </td>
   <td>CloudTrail Logs &#60;AWS Region&#62;
   </td>
  </tr>
  <tr>
   <td>Application Load Balancer - Access Logs Source
   </td>
   <td>Elb Logs &#60;AWS Region&#62;
   </td>
  </tr>
  <tr>
   <td>Metrics - AWS CloudWatch Metric Source
   </td>
   <td>CloudWatch Metrics &#60;AWS Region&#62; &#60;AWS Service name&#62;
   </td>
  </tr>
  <tr>
   <td>Metrics - Kinesis Firehose for Metrics Source
   </td>
   <td>CloudWatch Metrics &#60;AWS Region&#62;
   </td>
  </tr>
  <tr>
   <td>CloudWatch Logs - Lambda Log forwarder Source
   </td>
   <td>CloudWatch Logs &#60;AWS Region&#62;
   </td>
  </tr>
  <tr>
   <td>CloudWatch Logs - Kinesis Firehose for Logs Source
   </td>
   <td>CloudWatch Logs &#60;AWS Region&#62;
   </td>
  </tr>
  <tr>
   <td>Inventory Source
   </td>
   <td>AWS Inventory &#60;AWS Region&#62;
   </td>
  </tr>
  <tr>
   <td>Xray Source
   </td>
   <td>AWS Xray &#60;AWS Region&#62;
   </td>
  </tr>
</table>



### AWS CloudFormation

The [AWS CloudFormation](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation) template execution creates the following resources in Sumo Logic.


<table>
  <tr>
   <td>Resource
   </td>
   <td>Name
   </td>
  </tr>
  <tr>
   <td>App folder
   </td>
   <td>AWS Observability-&#60;Version&#62; &#60;Date of installation&#62;
   </td>
  </tr>
  <tr>
   <td>Alerts
   </td>
   <td>AWS Observability &#60;Version&#62; &#60;Date and Time of Installation&#62;
   </td>
  </tr>
  <tr>
   <td>Hosted Collector
   </td>
   <td>aws-observability-&#60;AccountAlias&#62;-&#60;AccountID&#62;
   </td>
  </tr>
  <tr>
   <td>Field Extraction Rule
   </td>
   <td>AwsObservabilityAlbAccessLogsFER
<br/>
AwsObservabilityApiGatewayCloudTrailLogsFER
<br/>
AwsObservabilityDynamoDBCloudTrailLogsFER
<br/>
AwsObservabilityEC2CloudTrailLogsFER
<br/>
AwsObservabilityECSCloudTrailLogsFER
<br/>
AwsObservabilityElastiCacheCloudTrailLogsFER
<br/>
AwsObservabilityElbAccessLogsFER
<br/>
AwsObservabilityFieldExtractionRule
<br/>
AwsObservabilityGenericCloudWatchLogsFER
<br/>
AwsObservabilityLambdaCloudWatchLogsFER
<br/>
AwsObservabilityRdsCloudTrailLogsFER
<br/>
AwsObservabilitySNSCloudTrailLogsFER
<br/>
AwsObservabilitySQSCloudTrailLogsFER
   </td>
  </tr>
  <tr>
   <td>Explorer View
   </td>
   <td>AWS Observability
   </td>
  </tr>
  <tr>
   <td>Metric Rules
   </td>
   <td>AwsObservabilityRDSClusterMetricsEntityRule
<br/>
AwsObservabilityRDSInstanceMetricsEntityRule
<br/>
AwsObservabilityNLBMetricsEntityRule
   </td>
  </tr>
  <tr>
   <td>CloudTrail source
   </td>
   <td>cloudtrail-logs-&#60;AWS::Region&#62;
   </td>
  </tr>
  <tr>
   <td>CloudWatch logs (HTTP) source
   </td>
   <td>cloudwatch-logs-&#60;AWS::Region&#62;
   </td>
  </tr>
  <tr>
   <td>Kinesis Firehose for Metrics
   </td>
   <td>cloudwatch-metrics-&#60;AWS::Region&#62;
   </td>
  </tr>
  <tr>
   <td>CloudWatch Metrics source
   </td>
   <td>cloudwatch-metrics-&#60;AWS::Region&#62;-ApplicationELB
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-ApiGateway
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-DynamoDB
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-Lambda
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-EC2
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-ELB
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-RDS
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-ECS
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-NetworkELB
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-ElastiCache
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-SQS
<br/>
cloudwatch-metrics-&#60;AWS::Region&#62;-SNS
   </td>
  </tr>
  <tr>
   <td>Amazon S3 Alb log source
   </td>
   <td>alb-logs-&#60;AWS::Region&#62;
   </td>
  </tr>
  <tr>
   <td>Amazon S3 Classic Load Balancer log source
   </td>
   <td>classic-lb-logs-&#60;AWS::Region&#62;
   </td>
  </tr>
  <tr>
   <td>Kinesis Firehose for Logs
   </td>
   <td>kinesis-firehose-cloudwatch-logs-&#60;AWS::Region&#62;
   </td>
  </tr>
  <tr>
   <td>Inventory Source
   </td>
   <td>inventory-&#60;AWS::Region&#62;
   </td>
  </tr>
  <tr>
   <td>XRay Source
   </td>
   <td>xray-&#60;AWS::Region&#62;
   </td>
  </tr>
  <tr>
   <td>S3 Bucket Name
   </td>
   <td>aws-observability-logs-&#60;StackID&#62;
   </td>
  </tr>
  <tr>
   <td>Fields
   </td>
   <td>account
<br/>
accountid
<br/>
apiname
<br/>
cacheclusterid
<br/>
clustername
<br/>
dbclusteridentifier
<br/>
dbidentifier
<br/>
dbinstanceidentifier
<br/>
functionname
<br/>
instanceid
<br/>
loadbalancer
<br/>
loadbalancername
<br/>
namespace
<br/>
networkloadbalancer
<br/>
region
<br/>
tablename
<br/>
topicname
<br/>
queuename
   </td>
  </tr>
</table>

To improve the solution performance the configurations below are done by CloudFormation template.

* Sumo Logic hosted collector is created for each AWS Account.

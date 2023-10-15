---
id: product-list
title: Products that Sumo Logic Integrates With 
description: This article lists all the products that Sumo Logic integrates with.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

This article lists all the products that Sumo Logic integrates with, including the types of integrations offered. 

Types of integrations:
* **Apps**. Pre-built applications with dashboards that provide quick information about the product. See [Apps/Integrations](/docs/integrations/) for available apps.
* **Collectors**. Agents that collect data from the product. See [Send Data](/docs/send-data/) for available collectors.

<!-- 
* **Webhooks**. Automated connections to the product. See [Webhooks](/docs/integrations/webhooks/buddy/) and [Webhook Connections](/docs/alerts/webhook-connections/) for available webhooks. 
* **Parsers**. Scripts that parse logs and normalize them into structured records. Use the [parser editor](/docs/cse/schema/parser-editor/) to see products with a parser. 
* **Mappings**. Scripts that map messages fields to Record attributes in Cloud SIEM. Use [Log Mappings](/docs/cse/ingestion/view-mappers-for-product/) to see products with mappings.
* **OIF integrations**. Open Integration Framework integrations for automation. To find products with OIF integrations, search for the products in App Central for [Cloud SIEM](m/docs/cse/automation-service/automation-service-app-central/) or [Cloud SOAR](/docs/cloud-soar/automation/#app-central). 
-->


## A

| Logo | Product | Integrations |
| :-- | :-- | :-- |
| <img src={useBaseUrl('img/integrations/saas-cloud/acquia.png')} alt="Thumbnail icon" width="75"/>   | [Acquia](https://www.acquia.com/)  | App: [Acquia](/docs/integrations/saas-cloud/acquia/)	 | 
| <img src={useBaseUrl('img/integrations/microsoft-azure/windows.png')} alt="Thumbnail icon" width="50"/>   | [Active Directory](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-2000-server/cc961809(v=technet.10))  | Apps: <br/>- [Active Directory 2008+ (Legacy)](/docs/integrations/microsoft-azure/active-directory-legacy/)<br/>- [Active Directory 2012+ (JSON)](/docs/integrations/microsoft-azure/active-directory-json/) <br/>- [Active Directory JSON - OpenTelemetry](/docs/integrations/microsoft-azure/opentelemetry/active-directory-json-opentelemetry/) 	 | 
| <img src={useBaseUrl('img/send-data/abnormal-security-logo.png')} alt="Thumbnail icon" width="100"/>   | [Abnormal Security](https://abnormalsecurity.com/)  | Collector: [Abnormal Security](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/abnormal-security-source/) | 
|  <img src={useBaseUrl('img/integrations/containers-orchestration/activemq.png')} alt="Thumbnail icon" width="50"/>   |  [ActiveMQ](https://activemq.apache.org/) | 	Apps: <br/> - [ActiveMQ](/docs/integrations/containers-orchestration/activemq/)<br/> - [ActiveMQ - OpenTelemetry](/docs/integrations/containers-orchestration/opentelemetry/activemq-opentelemetry/)	 | 
|  <img src={useBaseUrl('img/send-data/airtable-icon.png')} alt="Thumbnail icon" width="50"/>   |  [Airtable](https://www.airtable.com/) | 	App: [Airtable](/docs/integrations/saas-cloud/airtable/) <br/>Collector: 	[Airtable Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/airtable-source/) | 
|  <img src={useBaseUrl('img/integrations/saas-cloud/akamai.svg')} alt="Thumbnail icon" width="75"/>   | [Akamai](https://www.akamai.com/)  | 	Apps: <br/> - [Akamai Cloud Monitor](/docs/integrations/saas-cloud/akamai-cloud-monitor/) <br/>- [Akamai DataStream](/docs/integrations/saas-cloud/akamai-datastream/) <br/> - [Akamai Security Events](/docs/integrations/security-threat-detection/akamai-security-events/) <br/>Collector: [Akamai SIEM API Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/akamai-siem-api-source/) | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/alert-logic-logo.jpg')} alt="Thumbnail icon" width="100"/>   | [Alert Logic](https://www.alertlogic.com/)  | 	App: [Alert Logic](/docs/integrations/security-threat-detection/alert-logic/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-appflow-logo.png')} alt="Thumbnail icon" width="50"/>   |[ Amazon AppFlow](https://aws.amazon.com/appflow/)  | App: [Amazon AppFlow](/docs/integrations/amazon-aws/amazon-appflow/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-appstream2-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon AppStream 2.0](https://aws.amazon.com/appstream2/)  | 	App: [Amazon AppStream 2.0](/docs/integrations/amazon-aws/amazon-appstream2/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-athena-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Athena](https://aws.amazon.com/athena/)  | App: [Amazon Athena](/docs/integrations/amazon-aws/amazon-athena/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aurora.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Aurora](https://aws.amazon.com/rds/aurora/)  | Apps:<br/> - [Aurora MySQL ULM](/docs/integrations/amazon-aws/aurora-mysql-ulm/)<br/> - [Aurora PostgreSQL ULM](/docs/integrations/amazon-aws/aurora-postgresql-ulm/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-chime-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Chime](https://aws.amazon.com/chime/)  | 	Apps: <br/>- [Amazon Chime](/docs/integrations/amazon-aws/amazon-chime/)<br/> -	[Amazon Chime SDK](/docs/integrations/amazon-aws/amazon-chimesdk/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/cloudfront.png')} alt="Thumbnail icon" width="50"/>   | [Amazon CloudFront](https://aws.amazon.com/cloudfront/)  | 	App: [Amazon CloudFront](/docs/integrations/amazon-aws/cloudfront/)	<br/>Collector: [Amazon CloudFront Source](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudfront-source/)  | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-cloudsearch-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon CloudSearch](https://aws.amazon.com/cloudsearch/)  | 	App: [Amazon CloudSearch]
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-cloudwatch-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon CloudWatch](https://aws.amazon.com/pm/cloudwatch/)  | 	Collectors: <br/>- [Amazon CloudWatch logs](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/)<br/>- [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics/)<br/>- [Auto-Subscribe ARN (Amazon Resource Name) Destination](/docs/send-data/collect-from-other-data-sources/autosubscribe-arn-destination/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-cognito-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Cognito](https://aws.amazon.com/pm/cognito/)  | 	App: [Amazon Cognito](/docs/integrations/amazon-aws/amazon-cognito/)	 | 
|  <img src={useBaseUrl('img//integrations/amazon-aws/amazon-connect-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Connect](https://aws.amazon.com/connect/)  | 	App: [Amazon Connect](/docs/integrations/amazon-aws/amazon-connect/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-data-lifecycle-manager-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Data Lifecycle Manager](https://docs.aws.amazon.com/dlm/)  | 	App: [Amazon Data Lifecycle Manager](/docs/integrations/amazon-aws/amazon-data-lifecycle-manager/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-documentdb-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon DocumentDB](https://aws.amazon.com/documentdb/)  | 	App: [Amazon DocumentDB](/docs/integrations/amazon-aws/amazon-documentdb/)	 | 
|  <img src={useBaseUrl('img//integrations/amazon-aws/amazon-dynamodb-accelerator-dax-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Amazon DynamoDB Accelerator (DAX)](https://aws.amazon.com/dynamodb/dax/) | 	App: [Amazon DynamoDB Accelerator (DAX)](/docs/integrations/amazon-aws/amazon-dynamodb-accelerator-dax/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-ec2-auto-scaling-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Amazon EC2 Auto Scaling](https://aws.amazon.com/ec2/autoscaling/) | 	App: [Amazon EC2 Auto Scaling](/docs/integrations/amazon-aws/amazon-ec2-auto-scaling/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-ec2-elastic-graphics-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Amazon EC2 Elastic Graphics](https://aws.amazon.com/ec2/elastic-graphics/) | 	App: [Amazon EC2 Elastic Graphics](/docs/integrations/amazon-aws/amazon-ec2-elastic-graphics/)	 | 
|  <img src={useBaseUrl('img//integrations/amazon-aws/amazon-ec2-spot-fleet-logo.png')} alt="Thumbnail icon" width="75"/>   |  [Amazon EC2 Spot Fleet](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet.html) | 	App: [Amazon EC2 Spot Fleet](/docs/integrations/amazon-aws/amazon-ec2-spot-fleet/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/ecs.png')} alt="Thumbnail icon" width="50"/>   | [Amazon ECS](https://aws.amazon.com/ecs/)  | 	Apps: <br/>- [Amazon ECS (With Container Insights and Traces)](/docs/integrations/amazon-aws/elastic-container-service-container-insights-cloudwatch/) <br/>- [Amazon ECS (Without Container Insights and Traces)](/docs/integrations/amazon-aws/elastic-container-service/)	<br/>- Collector: [AWS ECS Fargate Container](/docs/send-data/collect-from-other-data-sources/aws-fargate-log-collection/) | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/eks.png')} alt="Thumbnail icon" width="50"/>   | [Amazon EKS](https://aws.amazon.com/eks/)  | 	App: [Amazon EKS - Control Plane](/docs/integrations/amazon-aws/eks-control-plane/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-elastic-block-store-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Elastic Block Store](https://aws.amazon.com/ebs/)  | 	App: [Amazon Elastic Block Store (Amazon EBS)](/docs/integrations/amazon-aws/amazon-elastic-block-store/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-elastic-file-system-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Elastic File System](https://aws.amazon.com/efs/)  | 	App: [Amazon Elastic File System (Amazon EFS)](/docs/integrations/amazon-aws/amazon-elastic-file-system/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/elasticache.png')} alt="Thumbnail icon" width="50"/>   | [Amazon ElastiCache](https://aws.amazon.com/elasticache/)  | 	App: [Amazon ElastiCache](/docs/integrations/amazon-aws/elasticache/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-emr-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon EMR](https://aws.amazon.com/emr/)  | 	App: [Amazon EMR](/docs/integrations/amazon-aws/amazon-emr/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-eventbridge-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon EventBridge](https://aws.amazon.com/eventbridge/)  | 	App: [Amazon EventBridge](/docs/integrations/amazon-aws/amazon-eventbridge/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-gamelift-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon GameLift](https://aws.amazon.com/gamelift/)  | 	App: [Amazon GameLift](/docs/integrations/amazon-aws/amazon-gamelift/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/guardduty.png')} alt="Thumbnail icon" width="50"/>   | [Amazon GuardDuty](https://aws.amazon.com/guardduty/)  | 	Apps: <br/>- [Amazon GuardDuty](/docs/integrations/amazon-aws/guardduty/)	 <br/> -	[Amazon GuardDuty - Cloud Security Monitoring and Analytics](/docs/integrations/cloud-security-monitoring-analytics/amazon-guardduty/)<br/>- [Global Intelligence for Amazon GuardDuty](/docs/integrations/amazon-aws/global-intelligence-guardduty/)	<br/>-	[Amazon GuardDuty Benchmark](/docs/integrations/amazon-aws/guardduty-benchmark/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/inspector-classic.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Inspector](https://aws.amazon.com/inspector/)  | 	Apps:<br/>- [Amazon Inspector](/docs/integrations/amazon-aws/inspector/)	<br/>- [Amazon Inspector Classic](/docs/integrations/amazon-aws/inspector-classic/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/kinesis.png')} alt="Thumbnail icon" width="50"/>   |  [Amazon Kinesis](https://aws.amazon.com/kinesis/) | 	App: [Amazon Kinesis - Streams](/docs/integrations/amazon-aws/kinesis-streams/)	<br/>Collectors:<br/>- [AWS Kinesis Firehose for Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) <br/>-  [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-prometheus.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Prometheus](https://aws.amazon.com/prometheus/)  | App: [Amazon MSK Prometheus](/docs/send-data/collect-from-other-data-sources/amazon-msk-prometheus-metrics-collection/)	<br/>Collector: [Amazon MSK Prometheus metrics collection](/docs/send-data/collect-from-other-data-sources/amazon-msk-prometheus-metrics-collection/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-opensearch-service-logo.png')} alt="Thumbnail icon" width="50"/>   | [Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service/)  | 	App: [Amazon OpenSearch Service](/docs/integrations/amazon-aws/amazon-opensearch-service/)	 | 
|  <img src={useBaseUrl('img//integrations/amazon-aws/rds.png')} alt="Thumbnail icon" width="50"/>   | [Amazon RDS](https://aws.amazon.com/rds/)  | 	App: [Amazon RDS](/docs/integrations/amazon-aws/rds/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/redshift.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Redshift](https://aws.amazon.com/pm/redshift/)  | 	App: [Amazon Redshift ULM](/docs/integrations/amazon-aws/redshift-ulm/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/route53.png')} alt="Thumbnail icon" width="50"/>   | [Amazon Route53](https://aws.amazon.com/route53/) | 	App: [Amazon Route53 Resolver Security](/docs/integrations/amazon-aws/route-53-resolver-security/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/s3audit.png')} alt="Thumbnail icon" width="50"/>   | [Amazon S3](https://aws.amazon.com/pm/serv-s3/)  | 	App: [Amazon S3 Audit](/docs/integrations/amazon-aws/s3-audit/)<br/>Collectors:<br/>- [Amazon S3 Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/)<br/>- [Amazon S3 Audit Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/)	<br/>- [Amazon S3 Scan Interval for Sources](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-scan-interval-sources/) | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/amazon-security-lake-logo.png')} alt="Thumbnail icon" width="50"/>   | 	[Amazon Security Lake](https://aws.amazon.com/security-lake/)  | 	Collector: [Amazon Security Lake source](/docs/send-data/hosted-collectors/amazon-aws/amazon-security-lake-source/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/ses.png')} alt="Thumbnail icon" width="50"/>   |  [Amazon SES](https://aws.amazon.com/ses/) | 	App: [Amazon SES](/docs/integrations/amazon-aws/ses/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/sns.png')} alt="Thumbnail icon" width="50"/>   | [Amazon SNS](https://aws.amazon.com/sns/)  | 	App: [Amazon SNS](/docs/integrations/amazon-aws/sns/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/sqs.png')} alt="Thumbnail icon" width="50"/>   | [Amazon SQS](https://aws.amazon.com/sqs/)  | 	App: [Amazon SQS](/docs/integrations/amazon-aws/sqs/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/vpcflowlogs.png')} alt="Thumbnail icon" width="50"/>   |  [Amazon VPC](https://aws.amazon.com/vpc/) | 	Apps: <br/>- [Amazon VPC Flow - Cloud Security Monitoring and Analytics](/docs/integrations/cloud-security-monitoring-analytics/amazon-vpc-flow/) <br/>- [Amazon VPC Flow Logs](/docs/integrations/amazon-aws/vpc-flow-logs/)	<br/>- [PCI Compliance for Amazon VPC Flow Logs](/docs/integrations/amazon-aws/vpc-flow-logs-pci-compliance/) | 
|  <img src={useBaseUrl('img/integrations/web-servers/apache.png')} alt="Thumbnail icon" width="50"/>   | [Apache](https://www.apache.org/)  | 	Apps: <br/>- [Apache](/docs/integrations/web-servers/apache/)	 <br/>- [Apache - OpenTelemetry](/docs/integrations/web-servers/opentelemetry/apache-opentelemetry/)	<br/>- [Global Intelligence for Apache](/docs/integrations/global-intelligence/apache/) | 
|  <img src={useBaseUrl('img/integrations/web-servers/apache-tomcat.png')} alt="Thumbnail icon" width="50"/>   | [Apache Tomcat](https://tomcat.apache.org/)  | 	Apps: <br/>- [Apache Tomcat](/docs/integrations/web-servers/apache-tomcat/)	 <br/>-	[Apache Tomcat - OpenTelemetry](/docs/integrations/web-servers/opentelemetry/apache-tomcat-opentelemetry/)	<br/>- [Global Intelligence for Apache Tomcat](/docs/integrations/global-intelligence/apache-tomcat)  | 
|  <img src={useBaseUrl('img/integrations/misc/acqua-logo.png')} alt="Thumbnail icon" width="75"/>   | [Acqua](https://www.aquasec.com/)	  | 	App: [Acqua](https://github.com/aquasecurity/Sumo-Logic-App/)	 | 
|  <img src={useBaseUrl('img/integrations/misc/aria-logo.png')} alt="Thumbnail icon" width="50"/>   | [Aria](https://www.ariacybersecurity.com/cybersecurity-products/aria-packet-intelligence/)	  | 	App: [Aria](https://www.ariacybersecurity.com/aria-packet-intelligence-app/)	 | 
|  <img src={useBaseUrl('img/send-data/armis-icon.png')} alt="Thumbnail icon" width="75"/>   | [Armis](https://www.armis.com/)	  | 	App: [Armis](/docs/integrations/saas-cloud/armis/)	 | 
|  <img src={useBaseUrl('img/send-data/asana-icon.png')} alt="Thumbnail icon" width="50"/>   | [Asana](https://asana.com/)  | 	App: [Asana](/docs/integrations/saas-cloud/asana/)	<br/>Collector: [Asana Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/asana-source/) | 
|  <img src={useBaseUrl('img/integrations/misc/automation-anywhere-logo.png')} alt="Thumbnail icon" width="50"/>   | [Automation Anywhere](https://www.automationanywhere.com/)  | 	App: [Automation Anywhere](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/control-room/administration/settings/setting-up-sumo-logic.html)	 | 
|  <img src={useBaseUrl('img/integrations/saml/auth0.png')} alt="Thumbnail icon" width="50"/>   | [Auth0](https://auth0.com/)  | 	App: [Auth0](/docs/integrations/saml/auth0/)	 | 
|  <img src={useBaseUrl('https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg')} alt="Thumbnail icon" width="50"/>   | [AWS](https://aws.amazon.com/)  | Apps: <br/>- [AWS Observability](/docs/observability/aws/)	<br/>- [Threat Intel for AWS](/docs/integrations/amazon-aws/threat-intel/) |
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-amplify-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Amplify](https://aws.amazon.com/amplify/)  | App:	[AWS Amplify](/docs/integrations/amazon-aws/aws-amplify/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/AWS_API_Gateway.png')} alt="Thumbnail icon" width="50"/>   | [AWS API Gateway](https://aws.amazon.com/api-gateway/)  | 	App: [AWS API Gateway](/docs/integrations/amazon-aws/api-gateway/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-apprunner-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS App Runner](https://aws.amazon.com/apprunner/)  | 	App: [AWS App Runner](/docs/integrations/amazon-aws/aws-apprunner/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/alb.png')} alt="Thumbnail icon" width="50"/>   | [AWS Application Load Balancer](https://aws.amazon.com/elasticloadbalancing/application-load-balancer/)  | 	App: [AWS Application Load Balancer](/docs/integrations/amazon-aws/application-load-balancer/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-application-migration-service-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Application Migration Service](https://aws.amazon.com/application-migration-service/)  | 	App: [AWS Application Migration Service (MGN)](/docs/integrations/amazon-aws/aws-application-migration-service/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-appsync-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS AppSync](https://aws.amazon.com/pm/appsync/)  | 	App: [AWS AppSync](/docs/integrations/amazon-aws/aws-appsync/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-backup-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Backup](https://aws.amazon.com/backup/)  | 	App: [AWS Backup](/docs/integrations/amazon-aws/aws-backup/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-certificate-manager-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/)  | 	App: [AWS Certificate Manager](/docs/integrations/amazon-aws/aws-certificate-manager/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-chatbot-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Chatbot](https://aws.amazon.com/chatbot/)  | 	App: [AWS Chatbot](/docs/integrations/amazon-aws/aws-chatbot/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/clb.png')} alt="Thumbnail icon" width="50"/>   | [AWS Classic Load Balancer](https://aws.amazon.com/elasticloadbalancing/classic-load-balancer/)  | 	App: [AWS Classic Load Balancer](/docs/integrations/amazon-aws/classic-load-balancer/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-client-vpn-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Client VPN](https://aws.amazon.com/vpn/client-vpn/)  | 	App: [AWS Client VPN](/docs/integrations/amazon-aws/aws-client-vpn/)	 | 
|  <img src={useBaseUrl('img/send-data/aws-cloudformation.svg')} alt="Thumbnail icon" width="50"/>   | [AWS CloudFormation](https://aws.amazon.com/cloudformation/)  | 	Collector: [AWS CloudFormation	Source](/docs/send-data/hosted-collectors/amazon-aws/configure-your-aws-source-cloudformation/) | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-cloudhsm-logo.png')} alt="Thumbnail icon" width="50"/>   |  [AWS CloudHSM](https://aws.amazon.com/cloudhsm/) | 	App: [AWS CloudHSM](/docs/integrations/amazon-aws/aws-cloudhsm/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/cloudtrail.png')} alt="Thumbnail icon" width="50"/>   |  [AWS CloudTrail](https://aws.amazon.com/pm/cloudtrail/) | 	Apps: <br/>- [Amazon CloudTrail - Cloud Security Monitoring and Analytics](/docs/integrations/cloud-security-monitoring-analytics/aws-cloudtrail/)<br/>- [AWS CloudTrail](/docs/integrations/amazon-aws/cloudtrail/)<br/>- [Global Intelligence for AWS CloudTrail DevOps](/docs/integrations/amazon-aws/global-intelligence-cloudtrail-devops/)<br/>- [Global Intelligence for AWS CloudTrail SecOps](/docs/integrations/amazon-aws/global-intelligence-cloudtrail-secops/)<br/>- [PCI Compliance For AWS CloudTrail](/docs/integrations/amazon-aws/cloudtrail-pci-compliance/)<br/>- [Threat Intel for AWS](/docs/integrations/amazon-aws/threat-intel/)	<br/>Collector: [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-codebuild-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS CodeBuild](https://aws.amazon.com/codebuild/)  | 	App: [AWS CodeBuild](/docs/integrations/amazon-aws/aws-codebuild/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/config.png')} alt="Thumbnail icon" width="50"/>   |  [AWS Config](https://aws.amazon.com/config/) | 	App: [AWS Config](/docs/integrations/amazon-aws/config/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/AWS_Cost_Explorer.png')} alt="Thumbnail icon" width="50"/>   |  [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/) | 	App: [AWS Cost Explorer](/docs/integrations/amazon-aws/cost-explorer/)<br/>Collector: [AWS Cost Explorer Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/aws-cost-explorer-source/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-database-migration-service-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Database Migration Service](https://aws.amazon.com/dms/)  | 	App: [AWS Database Migration Service (AWS DMS)](/docs/integrations/amazon-aws/aws-database-migration-service/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-datasync-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS DataSync](https://aws.amazon.com/datasync/)  | 	App: [AWS DataSync](/docs/integrations/amazon-aws/aws-datasync/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-direct-connect-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Direct Connect](https://aws.amazon.com/directconnect/)  | 	App: [AWS Direct Connect](/docs/integrations/amazon-aws/aws-direct-connect/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/dynamodb.png')} alt="Thumbnail icon" width="50"/>   | [AWS DynamoDB](https://aws.amazon.com/pm/dynamodb/)  | 	App: [Amazon DynamoDB](/docs/integrations/amazon-aws/dynamodb/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/AWS_EC2_CW_Metrics.png')} alt="Thumbnail icon" width="50"/>   | [AWS EC2](https://aws.amazon.com/pm/ec2/)  | 	Apps: <br/>- [AWS EC2 CW Metrics](/docs/integrations/amazon-aws/ec2-cloudwatch-metrics/)	<br/>- [AWS EC2 Host Metrics](/docs/integrations/amazon-aws/ec2-host-metrics/) <br/>Collector: [AWS Metadata (Tag) Source](/docs/send-data/hosted-collectors/amazon-aws/aws-metadata-tag-source/) | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-elastic-beanstalk-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)  | 	App: [AWS Elastic Beanstalk](/docs/integrations/amazon-aws/aws-elastic-beanstalk/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/elb.png')} alt="Thumbnail icon" width="50"/>   | [AWS Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/)  | Apps:	<br/>- [AWS Elastic Load Balancing](/docs/integrations/amazon-aws/elastic-load-balancing/)<br/>- [AWS Elastic Load Balancer - Application](/docs/integrations/amazon-aws/elastic-load-balancer-app/)	<br/>- [AWS Elastic Load Balancer - Classic](/docs/integrations/amazon-aws/elastic-load-balancing-classic/)<br/>- [Threat Intel for AWS](/docs/integrations/amazon-aws/threat-intel/) <br/>Collector: [AWS Elastic Load Balancing Source](/docs/send-data/hosted-collectors/amazon-aws/aws-elastic-load-balancing-source/) | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-global-accelerator-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Global Accelerator](https://aws.amazon.com/global-accelerator/)  | App: [AWS Global Accelerator](/docs/integrations/amazon-aws/aws-global-accelerator/)	 | 
|  <img src={useBaseUrl('img/send-data/AWSGovCloudUS-Logo.jpeg')} alt="Thumbnail icon" width="50"/>   |  [AWS GovCloud](https://aws.amazon.com/govcloud-us) | 	Collector [AWS GovCloud](/docs/send-data/hosted-collectors/amazon-aws/collection-aws-govcloud/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-ground-station-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Ground Station](https://aws.amazon.com/ground-station/)  | 	App: [AWS Ground Station](/docs/integrations/amazon-aws/aws-ground-station/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-healthlake-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS HealthLake](https://aws.amazon.com/healthlake/)  | App: [AWS HealthLake](/docs/integrations/amazon-aws/aws-healthlake/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/lambda.png')} alt="Thumbnail icon" width="50"/>   | [AWS Lambda](https://aws.amazon.com/pm/lambda/)  | App: [AWS Lambda](/docs/integrations/amazon-aws/lambda/)	<br/>Collectors: <br/>-[Create a Sumo Lambda Function](/docs/send-data/collect-from-other-data-sources/create-amazon-lambda-function/) <br/>- [Collect AWS Lambda Logs using an Extension](/docs/send-data/collect-from-other-data-sources/collect-aws-lambda-logs-extension/) <br/>-  [AWS Lambda Extension Performance Impact and Failover Handling](/docs/send-data/collect-from-other-data-sources/performance-impact-failover-handling/) | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/network-firewall.png')} alt="Thumbnail icon" width="50"/>   | [AWS Network Firewall](https://aws.amazon.com/network-firewall/)  | App:	[AWS Network Firewall](/docs/integrations/amazon-aws/network-firewall/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/networkLoadBalancer.png')} alt="Thumbnail icon" width="50"/>   |  [AWS Network Load Balancer](https://aws.amazon.com/elasticloadbalancing/network-load-balancer/) | 	App: [AWS Network Load Balancer](/docs/integrations/amazon-aws/network-load-balancer/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-opsworks-logo.png')} alt="Thumbnail icon" width="50"/>   |  [AWS OpsWorks](https://aws.amazon.com/opsworks/) | Collector:	[AWS OpsWorks](/docs/send-data/collect-from-other-data-sources/deploy-collectors-aws-opsworks/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/aws-private-certificate-authority-logo.png')} alt="Thumbnail icon" width="50"/>   | [AWS Private Certificate Authority](https://aws.amazon.com/private-ca/)  | 	App: [AWS Private Certificate Authority](/docs/integrations/amazon-aws/aws-private-certificate-authority/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/security-qs.png')} alt="Thumbnail icon" width="50"/>   |  [AWS Security Hub](https://aws.amazon.com/security-hub/) | Apps:<br/>- [AWS Security Hub](/docs/integrations/amazon-aws/security-hub/)	<br/>- [AWS Security Hub Cloud Security Monitoring and Analytics](/docs/integrations/cloud-security-monitoring-analytics/aws-security-hub/) <br/>- [AWS Security Quick Start](/docs/integrations/amazon-aws/security-quickstart/) | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/waf.png')} alt="Thumbnail icon" width="50"/>   | [AWS WAF](https://aws.amazon.com/waf/)  | Apps: <br/>- [AWS WAF](/docs/integrations/amazon-aws/waf/)<br/>- [AWS WAF Cloud Security Monitoring and Analytics](/docs/integrations/cloud-security-monitoring-analytics/aws-waf/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/ad.png')} alt="Thumbnail icon" width="50"/>   |  [Azure Active Directory (Microsoft Entra ID)](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id) | 	App: [Azure Active Directory](/docs/integrations/microsoft-azure/active-directory-azure/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-analysis-services.png')} alt="Thumbnail icon" width="50"/>   | [Azure Analysis Services](https://azure.microsoft.com/en-us/products/analysis-services)  | App: [Azure Analysis Services](/docs/integrations/microsoft-azure/azure-analysis-services/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-api-management.png')} alt="Thumbnail icon" width="50"/>   | [Azure API Management](https://azure.microsoft.com/en-us/products/api-management)  | App: [Azure API Management](/docs/integrations/microsoft-azure/azure-api-management/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-configuration.png')} alt="Thumbnail icon" width="50"/>   | [Azure App Configuration](https://azure.microsoft.com/en-us/products/app-configuration)  | App: [Azure App Configuration](/docs/integrations/microsoft-azure/azure-app-configuration/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-application-gateway.png')} alt="Thumbnail icon" width="50"/>   | [Azure Application Gateway](https://learn.microsoft.com/en-us/azure/application-gateway/overview)  | App: [Azure Application Gateway](/docs/integrations/microsoft-azure/azure-application-gateway/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-service-environment.png')} alt="Thumbnail icon" width="50"/>   | [Azure App Service Environment](https://learn.microsoft.com/en-us/azure/app-service/environment/overview)  | App: [Azure App Service Environment](/docs/integrations/microsoft-azure/azure-app-service-environment/)	 |
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-service-plan.png')} alt="Thumbnail icon" width="50"/>   | [Azure App Service Plan](https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans)  | App: [Azure App Service Plan](/docs/integrations/microsoft-azure/azure-app-service-plan/)	 |
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-audit.png')} alt="Thumbnail icon" width="50"/>   | [Azure Audit](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log?tabs=powershell)	  | App: [Azure Audit](/docs/integrations/microsoft-azure/audit/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-automation.png')} alt="Thumbnail icon" width="50"/>   | [Azure Automation](https://learn.microsoft.com/en-us/azure/automation/overview)	  | App: [Azure Automation](/docs/integrations/microsoft-azure/azure-automation/)	 | 
| <img src={useBaseUrl('img/integrations/microsoft-azure/azure-backup.png')} alt="Thumbnail icon" width="50"/> | [Azure Backup](https://azure.microsoft.com/en-us/products/backup)  | App: [Azure Backup](/docs/integrations/microsoft-azure/azure-backup/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-batch.png')} alt="Thumbnail icon" width="50"/>   | [Azure Batch](https://azure.microsoft.com/en-us/products/batch)  | App: [Azure Batch](/docs/integrations/microsoft-azure/azure-batch/)	 | 
|  <img src={useBaseUrl('img/integrations/misc/azure-blob-storage-logo.png')} alt="Thumbnail icon" width="50"/>   | [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs)  | App: [Azure Blob Storage](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/) 	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-cache-for-redis.png')} alt="Thumbnail icon" width="50"/>   | [Azure Cache for Redis](https://azure.microsoft.com/en-us/products/cache)  | 	App: [Azure Cache for Redis](/docs/integrations/microsoft-azure/azure-cache-for-redis/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-cognitive-search.png')} alt="Thumbnail icon" width="50"/>   | [Azure Cognitive Search](https://azure.microsoft.com/en-us/products/ai-services/cognitive-search)  | 	App: [Azure Cognitive Search](/docs/integrations/microsoft-azure/azure-cognitive-search/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-cosmos-db.png')} alt="Thumbnail icon" width="50"/>   | [Azure Cosmos DB](https://azure.microsoft.com/en-us/products/cosmos-db)  | Apps: <br/>- [Azure Cosmos DB](/docs/integrations/microsoft-azure/azure-cosmos-db/)	<br/>- [Azure Cosmos DB for PostgreSQL](/docs/integrations/microsoft-azure/azure-cosmos-db-for-postgresql/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-data-explorer.png')} alt="Thumbnail icon" width="50"/>   | [Azure Data Explorer](https://azure.microsoft.com/en-us/products/data-explorer)  | App: [Azure Data Explorer](/docs/integrations/microsoft-azure/azure-data-explorer/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-data-factory.png')} alt="Thumbnail icon" width="50"/>   |  [Azure Data Factory](https://azure.microsoft.com/en-us/products/data-factory) | App:	[Azure Data Factory](/docs/integrations/microsoft-azure/azure-data-factory/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-database-for-mariadb.png')} alt="Thumbnail icon" width="50"/>   |  [Azure Database for MariaDB](https://azure.microsoft.com/en-us/products/mariadb) | App:	[Azure Database for MariaDB](/docs/integrations/microsoft-azure/azure-database-for-mariadb/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-database-for-mysql.png')} alt="Thumbnail icon" width="50"/>   | [Azure Database for MySQL](https://azure.microsoft.com/en-us/products/mysql)  | App: [Azure Database for MySQL](/docs/integrations/microsoft-azure/azure-database-for-mysql/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-database-for-postgresql.png')} alt="Thumbnail icon" width="50"/>   | [Azure Database for PostgreSQL](https://azure.microsoft.com/en-us/products/mysql/)  | App:	[Azure Database for PostgreSQL](/docs/integrations/microsoft-azure/azure-database-for-postgresql/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-event-grid.png')} alt="Thumbnail icon" width="50"/>   |  [Azure Event Grid](https://azure.microsoft.com/en-us/products/event-grid) | 	App: [Azure Event Grid](/docs/integrations/microsoft-azure/azure-event-grid/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-event-hubs.png')} alt="Thumbnail icon" width="50"/>   |  [Azure Event Hubs](https://azure.microsoft.com/en-us/products/event-hubs) | 	App: [Azure Event Hubs](/docs/integrations/microsoft-azure/azure-event-hubs/)	<br/>Collector: [Azure Event Hubs Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/) | 
|  <img src={useBaseUrl('img//integrations/microsoft-azure/azure-front-door.png')} alt="Thumbnail icon" width="50"/>   | [Azure Front Door](https://azure.microsoft.com/en-us/products/frontdoor/) | 	App: [Azure Front Door](/docs/integrations/microsoft-azure/azure-front-door/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-functions.png')} alt="Thumbnail icon" width="50"/>   | [Azure Functions](https://azure.microsoft.com/en-us/products/functions)  | 	App: [Azure Functions](/docs/integrations/microsoft-azure/azure-functions/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-hdinsight.png')} alt="Thumbnail icon" width="50"/>   | [Azure HDInsight](https://azure.microsoft.com/en-us/products/hdinsight) | 	App: [Azure HDInsight](/docs/integrations/microsoft-azure/azure-hdinsight/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-iot-hub.png')} alt="Thumbnail icon" width="50"/>   | [Azure IoT Hub](https://azure.microsoft.com/en-us/products/iot-hub) | 	App: [Azure IoT Hub](/docs/integrations/microsoft-azure/azure-iot-hub/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-key-vault.png')} alt="Thumbnail icon" width="50"/>   | [Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault)  | 	App: [Azure Key Vault](/docs/integrations/microsoft-azure/azure-key-vault/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/k8s.png')} alt="Thumbnail icon" width="50"/>   | [Azure Kubernetes Service](https://azure.microsoft.com/en-us/products/kubernetes-service)  | 	App: [Azure Kubernetes Service (AKS) - Control Plane](/docs/integrations/microsoft-azure/kubernetes/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-load-balancer.png')} alt="Thumbnail icon" width="50"/>   | [Azure Load Balancer](https://azure.microsoft.com/en-us/products/load-balancer)  | 	Ap: [Azure Load Balancer](/docs/integrations/microsoft-azure/azure-load-balancer/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-logic-app.png')} alt="Thumbnail icon" width="50"/>   | [Azure Logic App](https://azure.microsoft.com/en-us/products/logic-apps)  | 	App: [Azure Logic App](/docs/integrations/microsoft-azure/azure-logic-app/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-machine-learning.png')} alt="Thumbnail icon" width="50"/>   |  [Azure Machine Learning](https://azure.microsoft.com/en-us/products/machine-learning) | 	App: [Azure Machine Learning](/docs/integrations/microsoft-azure/azure-machine-learning/)	 | 
|  <img src={useBaseUrl('img/integrations/misc/azure-monitor-logo.png')} alt="Thumbnail icon" width="50"/>   | [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview)  | Apps:	<br/>- [Azure Monitor Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor/)	<br/>- [Azure Monitor Metrics](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-network-interface.png')} alt="Thumbnail icon" width="50"/>   | [Azure Network Interface](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-network-interface?tabs=azure-portal)  | App:	[Azure Network Interface](/docs/integrations/microsoft-azure/azure-network-interface/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/network-watcher.png')} alt="Thumbnail icon" width="50"/>   | [Azure Network Watcher](https://azure.microsoft.com/en-us/products/network-watcher)  | 	App: [Azure Network Watcher](/docs/integrations/microsoft-azure/network-watcher/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-notification-hubs.png')} alt="Thumbnail icon" width="50"/>   | [Azure Notification Hubs](https://azure.microsoft.com/en-us/products/notification-hubs)  | 	App: [Azure Notification Hubs](docs/integrations/microsoft-azure/azure-notification-hubs/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-public-ipAddress.png')} alt="Thumbnail icon" width="50"/>   |  [Azure Public IP Addresses](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses) | 	App: [Azure Public IP Addresses](/docs/integrations/microsoft-azure/azure-public-ipAddress/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-relay.png')} alt="Thumbnail icon" width="50"/>   | [Azure Relay](https://learn.microsoft.com/en-us/azure/azure-relay/relay-what-is-it)  | 	App: [Azure Relay](/docs/integrations/microsoft-azure/azure-relay/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-service-bus.png')} alt="Thumbnail icon" width="50"/>   |  [Azure Service Bus](https://azure.microsoft.com/en-us/products/service-bus) | 	App: [Azure Service Bus](/docs/integrations/microsoft-azure/azure-service-bus/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-sql.png')} alt="Thumbnail icon" width="50"/>   |  [Azure SQL Database](https://azure.microsoft.com/en-us/products/azure-sql/database) | 	App: [Azure SQL](/docs/integrations/microsoft-azure/sql/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-sql-elastic-pool.png')} alt="Thumbnail icon" width="50"/>   | [Azure SQL Elastic Pool](https://learn.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview?view=azuresql)  | 	App: [Azure SQL Elastic Pool](/docs/integrations/microsoft-azure/azure-sql-elastic-pool/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-sql-managed-instance.png')} alt="Thumbnail icon" width="50"/>   | [Azure SQL Managed Instance](https://azure.microsoft.com/en-us/products/azure-sql/managed-instance)  | 	App: [Azure SQL Managed Instance](/docs/integrations/microsoft-azure/azure-sql-managed-instance/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-storage.png')} alt="Thumbnail icon" width="50"/>   | [Azure Storage](https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction)  | 	App: [Azure Storage](/docs/integrations/microsoft-azure/azure-storage/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-stream-analytics.png')} alt="Thumbnail icon" width="50"/>   | [Azure Stream Analytics](https://azure.microsoft.com/en-us/products/stream-analytics)  | 	App: [Azure Stream Analytics](/docs/integrations/microsoft-azure/azure-stream-analytics/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-synapse-analytics.png')} alt="Thumbnail icon" width="50"/>   | [Azure Synapse Analytics](https://azure.microsoft.com/en-us/products/synapse-analytics)  | 	App: [Azure Synapse Analytics](https://azure.microsoft.com/en-us/products/synapse-analytics)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/azure-virtual-network.png')} alt="Thumbnail icon" width="50"/>   |  [Azure Virtual Network](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview) | 	App: [Azure Virtual Network](/docs/integrations/microsoft-azure/azure-virtual-network/)	 | 
|  <img src={useBaseUrl('img/integrations/microsoft-azure/webapps.png')} alt="Thumbnail icon" width="50"/>   | [Azure Web Apps](https://azure.microsoft.com/en-us/products/app-service/web/)  | 	App: [Azure Web Apps](/docs/integrations/microsoft-azure/web-apps/)	 |   

## B

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/misc/banzai-cloud-logo.png')} alt="Thumbnail icon" width="100"/>   | [Banzai Cloud](https://banzaicloud.com/)  | 	App: [Banzai Cloud](https://kube-logging.dev/docs/examples/sumologic/)	 | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/barracuda.png')} alt="Thumbnail icon" width="100"/>   | [Barracuda WAF](https://www.barracuda.com/products/application-protection/web-application-firewall)  | 	Apps: <br/>- [Barracuda CloudGen Firewall](https://campus.barracuda.com/product/cloudgenfirewall/doc/91132156/sumo-logic-integration/)<br/>- [Barracuda WAF](/docs/integrations/security-threat-detection/barracuda-waf/)	 | 
|  <img src={useBaseUrl('img/integrations/misc/bettercloud-logo.png')} alt="Thumbnail icon" width="75"/>   | [BetterCloud](https://www.bettercloud.com/)  | App:	[BetterCloud](https://support.bettercloud.com/s/article/Integrating-Sumo-Logic-with-BetterCloud-bc45575)	 | 
|  <img src={useBaseUrl('img/integrations/app-development/bitbucket.png')} alt="Thumbnail icon" width="50"/>   | [Bitbucket](https://bitbucket.org/product)  | App:	[Bitbucket](/docs/integrations/app-development/bitbucket/)	 | 
|  <img src={useBaseUrl('img/integrations/misc/bitdefender-logo.png')} alt="Thumbnail icon" width="75"/>   | [Bit Defender](https://www.bitdefender.com/)  | App:	[Bit Defender](https://www.bitdefender.com/business/support/en/77209-158570-sumo-logic.html) 	 | 
|  <img src={useBaseUrl('img/integrations/saas-cloud/box.png')} alt="Thumbnail icon" width="50"/>   | [Box](https://www.box.com/)  | 	App: [Box](/docs/integrations/saas-cloud/box/)<br/>Collector: [Box Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/box-source/)	 | 
|  <img src={useBaseUrl('img/integrations/webhooks/bugsnag-logo.png')} alt="Thumbnail icon" width="50"/>   | [Buddy](https://buddy.works/)  | 	App: [Buddy](docs/integrations/webhooks/buddy/)	 | 
|  <img src={useBaseUrl('img/integrations/webhooks/buddy-logo.png')} alt="Thumbnail icon" width="50"/>   | [Bugsnag](https://www.bugsnag.com/)  | 	App: [Bugsnag](/docs/integrations/webhooks/bugsnag/)	 | 

## C

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/security-threat-detection/vmcarecb.png')} alt="Thumbnail icon" width="50"/>   |  [Carbon Black Cloud](https://www.vmware.com/products/carbon-black-cloud) | App:	[Carbon Black Cloud](/docs/integrations/security-threat-detection/carbon-black-cloud/) <br/>Collectors:	<br/>- [Carbon Black Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-cloud-source/) <br/>- [Carbon Black Inventory Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-inventory-source/) | 
|  <img src={useBaseUrl('img/integrations/databases/cassandra.png')} alt="Thumbnail icon" width="50"/>   | [Cassandra](https://cassandra.apache.org/)  | 	Apps: <br/>- [Cassandra](/docs/integrations/databases/cassandra/)	<br/>- [Cassandra - OpenTelemetry](/docs/integrations/databases/opentelemetry/cassandra-opentelemetry/) | 
|  <img src={useBaseUrl('img/integrations/misc/catchpoint-logo.png')} alt="Thumbnail icon" width="50"/>   | [Catchpoint](https://www.catchpoint.com/)  | 	App: [Catchpoint](https://github.com/catchpoint/Integrations.SumoLogic/blob/main/README.md)	 |
|  <img src={useBaseUrl('img/send-data/cato-logo.png')} alt="Thumbnail icon" width="50"/>   | [Cato Networks](https://www.catonetworks.com/)  | 	App: [Cato Networks](/docs/integrations/saas-cloud/cato-networks/)<br/>Collector: [Cato Networks Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cato-networks-source/)	 | 
|  <img src={useBaseUrl('img/integrations/misc/circleci-logo.png')} alt="Thumbnail icon" width="50"/>   | [CircleCI](https://circleci.com/)  | 	App: [CircleCI](https://circleci.com/docs/sumo-logic-integration/)	 | 
|  <img src={useBaseUrl('img/integrations/amazon-aws/cisaws.png')} alt="Thumbnail icon" width="50"/>   | [CIS Benchmarks for AWS](https://aws.amazon.com/what-is/cis-benchmarks/)  | 	App: [CIS AWS Foundations Benchmark](/docs/integrations/amazon-aws/cis-aws-foundations-benchmark/)	 | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/cisco.png')} alt="Thumbnail icon" width="50"/>   |  [Cisco ASA](https://www.cisco.com/c/en/us/products/security/adaptive-security-appliance-asa-software) | 	App: [Cisco ASA](/docs/cse/ingestion/ingestion-sources-for-cloud-siem/cisco-asa/)	<br/>Collector: [Cisco AMP Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-amp-source/) | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/ciscomeraki.png')} alt="Thumbnail icon" width="50"/>   |  [Cisco Meraki](https://meraki.cisco.com/) | 	Apps: <br/>- [Cisco Meraki](/docs/integrations/security-threat-detection/cisco-meraki/)	 <br/>- [Cisco Meraki - C2C](/docs/integrations/saas-cloud/cisco-meraki-c2c/)	<br/>Collector: [Cisco Meraki Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-meraki-source/) | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/cisco-umbrella-logo.png')} alt="Thumbnail icon" width="75"/>   |  [Cisco Umbrella](https://umbrella.cisco.com/) | 	App: [Cisco Umbrella](/docs/integrations/saas-cloud/cisco-umbrella/)	 | 
|  <img src={useBaseUrl('img/send-data/cisco-amp.png')} alt="Thumbnail icon" width="50"/>   |  [Cisco Vulnerability Management](https://umbrella.cisco.com/) | 	Collector: [Cisco Vulnerability Management Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-vulnerability-management-source/)	 | 
|  <img src={useBaseUrl('img/send-data/citrix-logo.png')} alt="Thumbnail icon" width="50"/>   | [Citrix](https://www.citrix.com/)  | 	App: [Citrix Cloud](/docs/integrations/saas-cloud/citrix-cloud/)<br/>Collector: [Citrix Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/citrix-cloud-source/)	 | 
|  <img src={useBaseUrl('img/integrations/saas-cloud/cloudflare.png')} alt="Thumbnail icon" width="50"/>   | [Cloudflare](https://www.cloudflare.com/)  | 	App: [Cloudflare](/docs/integrations/saas-cloud/cloudflare/)	 | 
|  <img src={useBaseUrl('img/send-data/code42-incydr-logo.png')} alt="Thumbnail icon" width="75"/>   | [Code42 Incydr](https://www.code42.com/incydr/)  | App: [Code42 Incydr](https://support.code42.com/hc/en-us/articles/14827618219671-Integrate-Code42-with-Sumo-Logic)	<br/>Collector: [Code42 Incydr Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/code42-incydr-source/) | 
|  <img src={useBaseUrl('img/integrations/misc/configcat-logo.png')} alt="Thumbnail icon" width="50"/>   | [ConfitCat](https://configcat.com/)  | App: [ConfitCat](/docs/integrations/webhooks/configcat/) | 
|  <img src={useBaseUrl('img/integrations/databases/couchbase-logo.png')} alt="Thumbnail icon" width="50"/>   | [Couchbase](https://www.couchbase.com/)  | Apps:<br/>- [Couchbase](/docs/integrations/databases/couchbase/)	<br/>- [Couchbase - OpenTelemetry](/docs/integrations/databases/opentelemetry/couchbase-opentelemetry/) | 
|  <img src={useBaseUrl('img/integrations/misc/cribl-logo.png')} alt="Thumbnail icon" width="50"/>   | [Cribl](https://cribl.io/)  | App:[Cribl](https://docs.cribl.io/stream/destinations-sumo-logic/) | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="Thumbnail icon" width="75"/>   | [CrowdStrike](https://www.crowdstrike.com/)  | App:	[CrowdStrike Falcon Endpoint Protection](/docs/integrations/security-threat-detection/crowdstrike-falcon-endpoint-protection/)	<br/>Collectors:<br/>- [CrowdStrike Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-source/) <br/>- [Crowdstrike FDR Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-fdr-source/)<br/>- [CrowdStrike FDR Host Inventory Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-fdr-host-inventory-source/) <br/>- [CrowdStrike Spotlight Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-spotlight-source/) | 
|  <img src={useBaseUrl('img/send-data/cyberark.png')} alt="Thumbnail icon" width="50"/>   |  [CyberArk EPM](https://www.cyberark.com/products/endpoint-privilege-manager/) | Collector: [CyberArk EPM Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cyberark-source/) | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/cybereason-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Cybereason](https://www.cybereason.com/) | App: [Cybereason](https://github.com/SumoLogic/sumologic-public-partner-apps/tree/master/Cybereason)<br/>Collector: [Cybereason Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cybereason-source/)	 | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/cylance.png')} alt="Thumbnail icon" width="50"/>   | [Cylance](https://www.blackberry.com/us/en/products/cylance-endpoint-security/cylance-is-blackberry-cybersecurity)  | 	App: [Cylance](/docs/integrations/security-threat-detection/cylance/)	 | 
|  <img src={useBaseUrl('img/integrations/misc/cyral-logo.png')} alt="Thumbnail icon" width="50"/>   | [Cyral](https://cyral.com/)  | 	App: [Cyral](https://github.com/SumoLogic/sumologic-public-partner-apps/tree/master/Cyral)	 | 

## D

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('https://upload.wikimedia.org/wikipedia/en/7/7e/Datadog_logo.svg')} alt="Thumbnail icon" width="50"/>   | [Datadog](https://www.datadoghq.com/)  | App: [Datadog](/docs/integrations/saas-cloud/datadog/)	 | 
|  <img src={useBaseUrl('img/integrations/misc/delinea-logo.png')} alt="Thumbnail icon" width="50"/>   | [Delinea Secret Server](https://delinea.com/products/secret-server)  | App: [Delinea Secret Server](https://docs.delinea.com/online-help/secret-server/events-and-alerts/secure-syslog-cef/index.htm)	 | 
|  <img src={useBaseUrl('img/integrations/containers-orchestration/docker.png')} alt="Thumbnail icon" width="75"/>   | [Docker](https://www.docker.com/)  | 	Apps: <br/>- [Docker](/integrations/containers-orchestration/docker-community-edition/) <br/>- [Docker - OpenTelemetry](/docs/integrations/containers-orchestration/opentelemetry/docker-opentelemetry/)	<br/>- [Docker ULM](/docs/integrations/containers-orchestration/docker-ulm/) | 
|  <img src={useBaseUrl('img/integrations/saas-cloud/docusign-icon.svg')} alt="Thumbnail icon" width="50"/>   | [DocuSign](https://www.docusign.com/)  | App:	[DocuSign](/docs/integrations/saas-cloud/docusign/)	<br/>Collector: [DocuSign Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/docusign-source/) | 
|  <img src={useBaseUrl('img/integrations/misc/doppler-logo.png')} alt="Thumbnail icon" width="50"/>   | [Doppler](https://www.doppler.com/)  | App:	[Doppler](https://docs.doppler.com/docs/sumologic) | 
|  <img src={useBaseUrl('img/integrations/saas-cloud/dropbox-icon.svg')} alt="Thumbnail icon" width="50"/>   |  [Dropbox](https://www.dropbox.com/) | App: [Dropbox](/docs/integrations/saas-cloud/dropbox/)	<br/>Collector: [Dropbox Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/dropbox-source/) | 
|  <img src={useBaseUrl('img/send-data/druva-logo.png')} alt="Thumbnail icon" width="75"/>   | Druva  | 	Apps:<br/>- [Druva](/docs/integrations/saas-cloud/druva/)	<br/>- [Druva Cyber Resilience](/docs/integrations/saas-cloud/druva-cyber-resilience/)	<br/>Collectors: <br/>- [Druva Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/druva-source/) <br/>- [Druva Cyber Resilience Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/druva-cyber-resilience-source/) | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/duo.png')} alt="Thumbnail icon" width="50"/>   | [Duo](https://duo.com/)  | App: [Duo Security](/docs/integrations/security-threat-detection/duo-security/)	<br/>Collector: [Duo Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/duo-source/) | 

## E

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/misc/egnyte-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Egnyte](https://www.egnyte.com/) | 	App: [Egnyte](https://helpdesk.egnyte.com/hc/en-us/articles/4407850661133-Egnyte-for-Sumo-Logic)	 | 
|  <img src={useBaseUrl('img/integrations/databases/elasticsearch.png')} alt="Thumbnail icon" width="50"/>   | [Elasticsearch](https://www.elastic.co/elasticsearch/)  | Apps:<br/>	- [Elasticsearch](/docs/integrations/databases/elasticsearch/)	 <br/>- [Elasticsearch - OpenTelemetry](/docs/integrations/databases/opentelemetry/elasticsearch-opentelemetry/)	 | 
|  <img src={useBaseUrl('img/integrations/webhooks/emnify-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Emnify](https://www.emnify.com/) | 	App: [Emnify](/docs/integrations/webhooks/emnify/)	 | 


## F

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('/img/integrations/security-threat-detection/f5.png')} alt="Thumbnail icon" width="50"/>   | [F5 BIG-IP Local Traffic Manager](https://www.f5.com/products/big-ip-services/local-traffic-manager)  | 	App: [F5 - BIG-IP LTM](/docs/integrations/security-threat-detection/f5-big-ip-ltm/)	 | 
|  <img src={useBaseUrl('/img/integrations/saas-cloud/fastly.png')} alt="Thumbnail icon" width="50"/>   |  [Fastly](https://www.fastly.com/) | 	App: [Fastly](/docs/integrations/saas-cloud/fastly/)	 | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/fidelis-logo.png')} alt="Thumbnail icon" width="50"/>   | [Fidelis Halo (formerly CloudPassage Halo)](https://fidelissecurity.com/fidelis-halo/)  | 	App: [CloudPassage Halo](/docs/integrations/security-threat-detection/cloudpassage-halo/)	<br/>Collector: [Integrate Halo Event Logs into Sumo Logic](/docs/send-data/collect-from-other-data-sources/integrate-halo-event-logs/) | 
|  <img src={useBaseUrl('img/integrations/webhooks/firefly-logo.png')} alt="Thumbnail icon" width="50"/>   | [Firefly](https://www.firefly.ai/)  | App: [Firefly](/docs/integrations/webhooks/firefly/)	 | 
|  <img src={useBaseUrl('img/integrations/webhooks/flagsmith-logo.png')} alt="Thumbnail icon" width="50"/>   | [Flagsmith](https://www.flagsmith.com/)  | App: [Flagsmith](/docs/integrations/webhooks/flagsmith/) 	 | 

## G

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/misc/gigamon-logo.png')} alt="Thumbnail icon" width="75"/>   | [Gigamon](https://www.gigamon.com/)  | Apps:<br/>- [Gigamon Application Metadata Intelligence](https://github.com/SumoLogic/sumologic-public-partner-apps/tree/master/Gigamon_HAWK)<br/>- [Gigamon ThreatINSIGHT](https://github.com/SumoLogic/sumologic-public-partner-apps/tree/master/Gigamon_ThreatINSIGHT) | 
|  <img src={useBaseUrl('img/integrations/app-development/GitHub.png')} alt="Thumbnail icon" width="75"/>   | [GitHub](https://github.com/)  | 	App: [GitHub](/docs/integrations/app-development/github/)	 | 
|  <img src={useBaseUrl('img/integrations/app-development/gitlab.png')} alt="Thumbnail icon" width="50"/>   | [GitLab](https://about.gitlab.com/)  | 	App: [GitLab](/docs/integrations/app-development/gitlab/)	 | 
|  <img src={useBaseUrl('img/integrations/saas-cloud/gmail-icon.png')} alt="Thumbnail icon" width="50"/>   |  [Gmail](https://www.google.com/gmail/about/) | 	App: [Gmail Trace Logs](/docs/integrations/saas-cloud/gmail-tracelogs)	<br/>Collector: [Gmail Trace Logs Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/gmail-tracelogs-source) | 
|  <img src={useBaseUrl('img/integrations/google/appengine.png')} alt="Thumbnail icon" width="50"/>   |  [Google App Engine](https://cloud.google.com/appengine) | 	App: [Google App Engine](/docs/integrations/google/app-engine/)	 | 
|  <img src={useBaseUrl('img/integrations/google/bigquery.png')} alt="Thumbnail icon" width="50"/>   |  [Google BigQuery](https://cloud.google.com/bigquery) | 	App: [Google BigQuery](/docs/integrations/google/bigquery/)	<br/>Collector: [Google BigQuery Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-bigquery-source/) | 
|  <img src={useBaseUrl('img/integrations/misc/google-cloud-logo.png')} alt="Thumbnail icon" width="100"/>   |  [Google Cloud](https://cloud.google.com/products) | Collectors: <br/>- [GPC Metrics Source](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/)	<br/>- [Google Cloud Platform (GCP) Source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source/) | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudAlloyDBforPostgreSQL.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud AlloyDB for PostgreSQL](https://cloud.google.com/alloydb) | App: [Google Cloud AlloyDB for PostgreSQL](/docs/integrations/google/cloud-alloydb-for-postgresql/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudAPIGateway.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud API Gateway](https://cloud.google.com/api-gateway) | App: [Google Cloud API Gateway](/docs/integrations/google/cloud-api-gateway/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudAPIs.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud APIs](https://cloud.google.com/apis) | App:	[Google Cloud APIs](/docs/integrations/google/cloud-apis/)	 | 
|  <img src={useBaseUrl('img/integrations/misc/google-cloud-armor-logo.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Armor](https://cloud.google.com/armor)  | 	App: [Google Cloud Armor](/docs/integrations/google/cloud-armor/)	 | 
|  <img src={useBaseUrl('/img/integrations/google/cloudaudit.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Audit Logs](https://cloud.google.com/audit-logs) | App: [Google Cloud Audit](docs/integrations/google/cloud-audit)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleAutoScaler.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Auto Scaler](https://cloud.google.com/compute/docs/autoscaler) | 	App: [Google Cloud Auto Scaler](/docs/integrations/google/cloud-auto-scaler)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudBackupforGKE.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Backup for GKE](https://cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/backup-for-gke) | App: [Google Cloud Backup for GKE](/docs/integrations/google/cloud-backup-for-gke/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudBigQueryBIEngine.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud BigQuery](https://cloud.google.com/bigquery)  | App: [Google Cloud BigQuery BI Engine](/docs/integrations/google/cloud-bigquery-bi-engine/) | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudBigtable.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Bigtable](https://cloud.google.com/bigtable) | App: [Google Cloud Bigtable](/docs/integrations/google/cloud-bigtable/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudCertificateAuthorityService.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Certificate Authority Service](https://cloud.google.com/certificate-authority-service)  | App: [Google Cloud Certificate Authority Service](docs/integrations/google/cloud-certificate-authority-service/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudCertificateManager.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Certificate Manager](https://cloud.google.com/certificate-manager/docs/overview) | App: [Google Cloud Certificate Manager](/docs/integrations/google/cloud-certificate-manager/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudComposer.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Composer](https://cloud.google.com/composer) | App: [Google Cloud Composer](/docs/integrations/google/cloud-composer/)	 | 
|  <img src={useBaseUrl('/img/integrations/google/ce.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Compute Engine](https://cloud.google.com/compute) | App: [Google Compute Engine](/docs/integrations/google/compute-engine/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudDataflow.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Dataflow](https://cloud.google.com/dataflow) | App: [Google Cloud Dataflow](/docs/integrations/google/cloud-dataflow/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudDataproc.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Dataproc](https://cloud.google.com/dataproc)  | Apps:<br/>- [Google Cloud Dataproc](/docs/integrations/google/cloud-dataproc/)	 <br/>- [Google Cloud Dataproc Metastore](/docs/integrations/google/cloud-dataproc-metastore/)  |  
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudDatastore.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Datastore](https://cloud.google.com/datastore/docs) | App: [Google Cloud Datastore](/docs/integrations/google/cloud-datastore/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudDatastream.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Datastream](https://cloud.google.com/datastream)	 | App: [Google Cloud Datastream](/docs/integrations/google/cloud-datastream/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudDeploy.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Deploy](https://cloud.google.com/deploy) | App: [Google Cloud Deploy](/docs/integrations/google/cloud-deploy/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudFilestore.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Filestore](https://cloud.google.com/filestore)  | App: [Google Cloud Filestore](/docs/integrations/google/cloud-filestore/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudFirebase.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Firebase](https://firebase.google.com/) | App: [Google Cloud Firebase](/docs/integrations/google/cloud-firebase/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudFireStore.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Firestore](https://cloud.google.com/firestore) | App: [Google Cloud Firestore](/docs/integrations/google/cloud-firestore/)	 | 
|  <img src={useBaseUrl('img/integrations/google/firewall.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Firewall](https://cloud.google.com/firewall)  | App: [Google Cloud Firewall](/docs/integrations/google/cloud-firewall/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudFleetEngine.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Fleet Engine](https://developers.google.com/maps/documentation/transportation-logistics/on-demand-rides-deliveries-solution/trip-order-progress/fleet-engine) | App: [Google Cloud Fleet Engine](/docs/integrations/google/cloud-fleet-engine/)	 | 
|  <img src={useBaseUrl('img/integrations/google/functions.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Functions](https://cloud.google.com/functions)  | App: [Google Cloud Functions](/docs/integrations/google/cloud-functions/)	 | 
|  <img src={useBaseUrl('/img/integrations/google/iam.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud IAM](https://cloud.google.com/iam)  | App: [Google Cloud IAM](/docs/integrations/google/cloud-iam/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudInterconnect.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Interconnect](https://cloud.google.com/network-connectivity/docs/interconnect/concepts/overview) | App: [Google Cloud Interconnect](/docs/integrations/google/cloud-interconnect/)	 | 
|  <img src={useBaseUrl('img/integrations/google/clb.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Load Balancing](https://cloud.google.com/load-balancing) | App: [Google Cloud Load Balancing](/docs/integrations/google/cloud-load-balancing/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudLogging.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Logging](https://cloud.google.com/logging) | App: [Google Cloud Logging](/docs/integrations/google/cloud-logging/)	 | 
|  <img src={useBaseUrl('/img/integrations/google/GoogleCloudMemorystoreforRedis.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Memorystore](https://cloud.google.com/memorystore)  | App: [Google Cloud Memorystore for Redis](/docs/integrations/google/cloud-memorystore-for-redis/)	 | 
|  <img src={useBaseUrl('img/integrations/google/gcp_netapp.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud NetApp Volumes](https://cloud.google.com/netapp-volumes)  | App: [Google Cloud Net App Cloud Volumes Service](/docs/integrations/google/cloud-net-app-cloud-volumes-service/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudNetworkTopology.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Network Topology](https://cloud.google.com/network-intelligence-center/docs/network-topology/concepts/overview) | App: [Google Cloud Network Topology](/docs/integrations/google/cloud-network-topology/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GooglePubSub.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Pub Sub](https://cloud.google.com/pubsub)  | App: [Google Cloud Pub Sub](/docs/integrations/google/cloud-pub-sub/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudRouter.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Router](https://cloud.google.com/network-connectivity/docs/router/concepts/overview)  | App: [Google Cloud Router](/docs/integrations/google/cloud-router/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudRun.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Run](https://cloud.google.com/run)  | App: [Google Cloud Run](/docs/integrations/google/cloud-run/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudSpanner.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Spanner](https://cloud.google.com/spanner) | App: [Google Cloud Spanner](/docs/integrations/google/cloud-spanner/)	 | 
|  <img src={useBaseUrl('img/integrations/google/sql.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud SQL](https://cloud.google.com/sql)  | App: [Google Cloud SQL](/docs/integrations/google/cloud-sql/)	 | 
|  <img src={useBaseUrl('img/integrations/google/storage.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Storage](https://cloud.google.com/storage)  | App: [Google Cloud Storage](/docs/integrations/google/cloud-storage/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudTasks.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Tasks](https://cloud.google.com/tasks)  | App: [Google Cloud Tasks](/docs/integrations/google/cloud-tasks/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudTPU.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud TPU](https://cloud.google.com/tpu)  | App: [Google Cloud TPU](/docs/integrations/google/cloud-tpu/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudTrace.png')} alt="Thumbnail icon" width="50"/>   | [Google Cloud Trace](https://cloud.google.com/trace)  | App: [Google Cloud Trace](/docs/integrations/google/cloud-trace/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudTrafficDirector.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Traffic Director](https://cloud.google.com/traffic-director) | App: [Google Cloud Traffic Director](/docs/integrations/google/cloud-traffic-director/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudVertexAI.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai) | App: [Google Cloud Vertex AI](/docs/integrations/google/cloud-vertex-ai/)	 | 
|  <img src={useBaseUrl('img/integrations/google/vpc.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud VPC](https://cloud.google.com/vpc) | App: [Google Cloud VPC](/docs/integrations/google/cloud-vpc/)	 | 
|  <img src={useBaseUrl('img/integrations/google/GoogleCloudVPN.png')} alt="Thumbnail icon" width="50"/>   |  [Google Cloud VPN](https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview) | App: [Google Cloud VPN](/docs/integrations/google/cloud-vpn/)	 | 
|  <img src={useBaseUrl('img/integrations/google/k8s.png')} alt="Thumbnail icon" width="50"/>   |  [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) | App: [Google Kubernetes Engine (GKE)](/docs/integrations/google/kubernetes-engine/)	 | 
|  <img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="Thumbnail icon" width="100"/>   |  [Google Workspace](https://workspace.google.com/) | App: [Google Workspace](/docs/integrations/google/workspace/install-app-dashboards/)	<br/>Collector: [Google Workspace AlertCenter Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-workspace-alertcenter/) <br/>- [Google Workspace Apps Audit Source](/docs/send-data/hosted-collectors/google-source/google-workspace-apps-audit-source/) <br/>- [Google Workspace User Inventory Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-workspace-source/) | 
|  <img src={useBaseUrl('img/integrations/webhooks/grafana-oncall-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Grafana](https://grafana.com/) | App: [Grafana OnCall](/docs/integrations/webhooks/grafana-oncall/)	 | 
|  <img src={useBaseUrl('img/integrations/webhooks/gremlin-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Gremlin](https://www.gremlin.com/) | App: [Gremlin](/docs/integrations/webhooks/gremlin/)	 | 

## H

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/web-servers/haproxy.png')} alt="Thumbnail icon" width="50"/>   |  [HAProxy](https://www.haproxy.com/) | 	Apps: <br/>- [HAProxy](/docs/integrations/web-servers/haproxy/)	 <br/>- [Collector: HAProxy - OTel Collector](/docs/integrations/web-servers/opentelemetry/haproxy-opentelemetry/)	 | 
|  <img src={useBaseUrl('img/integrations/webhooks/hasura-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Hasura](https://hasura.io/) | 	App: [Hasura](/docs/integrations/webhooks/hasura/)	 | 
|  <img src={useBaseUrl('img/integrations/web-servers/Heroku.png')} alt="Thumbnail icon" width="50"/>   | [Heroku](https://www.heroku.com/)  | 	App: [Heroku](/docs/integrations/web-servers/heroku/)	<br/>Collector: [Collect Logs from Heroku](/docs/send-data/collect-from-other-data-sources/collect-logs-heroku/) | 
|  <img src={useBaseUrl('img/integrations/webhooks/honeybadger-logo.png')} alt="Thumbnail icon" width="50"/>   | [Honeybadger](https://www.honeybadger.io/)  | 	App: [Honeybadger](/docs/integrations/webhooks/honeybadger/)	 | 

## I

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/microsoft-azure/microsoft_iis_10.png')} alt="Thumbnail icon" width="75"/>   | [IIS](https://www.iis.net/)  | Apps: <br/>- [IIS 7](/docs/integrations/microsoft-azure/iis-7/) <br/>- [IIS 10](/docs/integrations/web-servers/iis-10/)	 <br/>- [IIS 10 - OTel Collector](/docs/integrations/web-servers/opentelemetry/iis-10-opentelemetry/)	 | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/imperva.png')} alt="Thumbnail icon" width="50"/>   | [Imperva FlexProtect (formerly Incapsula)](https://docs.imperva.com/bundle/cloud-application-security/page/more/aws-plan.htm)  | 	App: [Imperva Incapsula](/docs/integrations/security-threat-detection/imperva-incapsula/)	 | 
|  <img src={useBaseUrl('img/integrations/saas-cloud/istio.png')} alt="Thumbnail icon" width="50"/>   | [Istio](https://istio.io/)  | 	App: [Istio](/docs/integrations/saas-cloud/istio/)	 | 

## J

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('/img/integrations/app-development/jenkins.png')} alt="Thumbnail icon" width="50"/>   | [Jenkins](https://www.jenkins.io/)  | App: [Jenkins](/docs/integrations/app-development/jenkins/)	 | 
|  <img src={useBaseUrl('img/integrations/app-development/jfrog-Artifactory.png')} alt="Thumbnail icon" width="75"/>   | [JFrog Artifactory](https://jfrog.com/artifactory/)  | Apps:	<br/>- [Artifactory	(6 and 7) - Classic](/docs/integrations/app-development/jfrog-artifactory/) <br/>- [Artifactory - OpenTelemetry](/docs/integrations/app-development/opentelemetry/jfrog-artifactory-opentelemetry/) | 
|  <img src={useBaseUrl('img/integrations/app-development/jfrog-xray.png')} alt="Thumbnail icon" width="50"/>   | [JFrog Xray](https://jfrog.com/help/r/get-started-with-the-jfrog-platform/jfrog-xray)  | 	App: [JFrog Xray](/docs/integrations/app-development/jfrog-xray/)	 | 
|  <img src={useBaseUrl('img/integrations/app-development/jira.png')} alt="Thumbnail icon" width="50"/>   | [Jira](https://www.atlassian.com/software/jira)  | 	Apps: <br/>- [Jira](/docs/integrations/app-development/jira/) <br/>- [Jira Cloud](/docs/integrations/app-development/jira-cloud/)	<br/>- [Jira - OpenTelemetry](/docs/integrations/app-development/opentelemetry/jira-opentelemetry/) | 
|  <img src={useBaseUrl('img/integrations/app-development/jmx.png')} alt="Thumbnail icon" width="50"/>   | [JMX](https://www.oracle.com/java/technologies/javase/javamanagement.html)  | 	Apps: <br/>- [JMX](/docs/integrations/app-development/jmx/)	 <br/>-	[JMX - OpenTelementry](/docs/integrations/app-development/opentelemetry/jmx-opentelemetry/)	 | 
|  <img src={useBaseUrl('img/send-data/jumpcloud-directory-insights-logo.png')} alt="Thumbnail icon" width="100"/>   | [Jumpcloud](https://jumpcloud.com/)  | 	Collector: [JumpCloud Directory Insights Source](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/jumpcloud-directory-insights-source/) 	 | 

## K

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('/img/integrations/containers-orchestration/kafka.png')} alt="Thumbnail icon" width="85"/>   |  [Kafka](https://kafka.apache.org/) | Apps: <br/>- [Kafka](/docs/integrations/containers-orchestration/kafka/)	<br/>- [Kafka - OpenTelemetry](/docs/integrations/containers-orchestration/opentelemetry/kafka-opentelemetry/)	 | 
|  <img src={useBaseUrl('img/integrations/security-threat-detection/keeper.png')} alt="Thumbnail icon" width="50"/>   |  [Keeper Security](https://www.keepersecurity.com/) | 	[Keeper Security](/docs/integrations/security-threat-detection/keeper-security/)	 | 
|  <img src={useBaseUrl('img/send-data/knowbe4.png')} alt="Thumbnail icon" width="75"/>   | [KnowBe4](https://www.knowbe4.com/)  | App: [KnowBe4](/docs/integrations/saas-cloud/knowbe4/) <br/>Collector: [KnowBe4 API Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/knowbe4-api-source/)	 | 
|  <img src={useBaseUrl('img/icons/operations/kubernetes.png')} alt="Thumbnail icon" width="50"/>   | [Kubernetes](https://kubernetes.io/)  | Apps:<br/>-	[Kubernetes](/docs/integrations/containers-orchestration/kubernetes)	<br/>- [Kubernetes Control Plane](/docs/integrations/containers-orchestration/kubernetes-control-plane) <br/>- [Global Intelligence for Kubernetes DevOps](/docs/integrations/global-intelligence/kubernetes-devops) <br/>(Some Kubernetes apps appear elsewhere on this page listed on the primary product they are associated with. See [Sumo Logic Apps for Kubernetes](/docs/observability/kubernetes/apps) for a complete list of Kubernetes apps.) <br/>Collectors: <br/>- [Kubernetes](/docs/send-data/collect-from-other-data-sources/kubernetes/)  | 

## L

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/misc/lacework-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Lacework](https://www.lacework.com/) | App: [Lacework](https://docs.lacework.net/onboarding/sumo-logic)	 | 
|  <img src={useBaseUrl('img/integrations/misc/lambdatest-logo.png')} alt="Thumbnail icon" width="100"/>   |  [LambdaTest](https://www.lambdatest.com/) | App: [LambdaTest](https://www.lambdatest.com/support/docs/sumo-logic-integration/)	 | 
|  <img src={useBaseUrl('img/integrations/hosts-operating-systems/linux-transparent.png')} alt="Thumbnail icon" width="50"/>   | [Linux](https://www.linux.org/)  | 	Apps: <br/>- [Linux](/docs/integrations/hosts-operating-systems/linux/)	<br/>- [Linux - OpenTelemetry](/docs/integrations/hosts-operating-systems/opentelemetry/linux-opentelemetry/) <br/>- [Linux - Cloud Security Monitoring and Analytics](/docs/integrations/cloud-security-monitoring-analytics/linux/) <br/>- [Linux - Cloud Security Monitoring and Analytics - OpenTelemetry](/docs/integrations/cloud-security-monitoring-analytics/opentelemetry/linux-opentelemetry/) <br/>- [PCI Compliance for Linux](/docs/integrations/pci-compliance/linux/) <br/>- [PCI Compliance for Linux - OpenTelemetry](/docs/integrations/pci-compliance/opentelemetry/linux-opentelemetry/) | 
|  <img src={useBaseUrl('img/integrations/misc/lucidum-logo.png')} alt="Thumbnail icon" width="50"/>   |  [Lucidum](https://lucidum.io/) | App: [[Lucidum](https://github.com/SumoLogic/sumologic-public-partner-apps/tree/master/Lucidum)	 | 

## M

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	macOS - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	MariaDB	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	MariaDB - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Memcached	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Memcached - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Microsoft Exchange Trace Logs	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Microsoft Graph Azure AD Reporting	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Microsoft Graph Identity Protection	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Microsoft Graph Security V1	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Microsoft Graph Security V2	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Microsoft Office Audit 365	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Microsoft SQL Server	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Microsoft SQL Server - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Microsoft SQL Server for Linux - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Microsoft Teams	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Mimecast	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Miro	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	MongoDB	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	MongoDB - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	MongoDB Atlas	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	MySQL	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	MySQL - OTel Collector	 | 

## N

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Netskope	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Netskope Legacy Collection	 | 
|  <img src={useBaseUrl('img/integrations/web-servers/nginx.png')} alt="Thumbnail icon" width="50"/>   | [Nginx](https://www.nginx.com/)  | Apps: <br/>-	Nginx	<br/>- [Global Intelligence for Nginx](/docs/integrations/global-intelligence/nginx)  | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Nginx - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Nginx (Legacy)	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Nginx Ingress	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Nginx Plus	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Nginx Plus Ingress	 | 

## O

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Observable Networks	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Okta	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	OneLogin	 | 
| <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/> | [1Password](https://1password.com/) | App: [1Password](/docs/integrations/1password/) <br/>Collector: [1Password Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/1password-source/) |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Opsgenie	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Oracle	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Oracle - OTel Collector	 | 

## P

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PagerDuty V2	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PagerDuty V3	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Palo Alto Cortex XDR	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Palo Alto Firewall 10	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Palo Alto Firewall 9	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Palo Alto Networks 6	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Palo Alto Networks 8	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Palo Alto Networks 9	 | 
|  <img src={useBaseUrl('img/integrations/misc/prisma-cloud-logo.png')} alt="Thumbnail icon" width="50"/>   | [Palo Alto Networks Prisma Cloud (formerly Evident.io ESP)](https://www.paloaltonetworks.com/prisma/cloud)  | 	App: [Evident.io ESP](/docs/integrations/security-threat-detection/evident-security-platform/)	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PCI Compliance for Linux	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PCI Compliance for Linux - OpenTelemetry	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PCI Compliance for Palo Alto Networks 10	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PCI Compliance for Palo Alto Networks 9	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PCI Compliance For Windows (JSON)	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PCI Compliance For Windows (JSON)	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PCI Compliance For Windows (Legacy)	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PCI Compliance For Windows (Legacy)	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PCI Compliance for Windows JSON - OpenTelemetry	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PostgreSQL	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	PostgreSQL - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Proofpoint on Demand	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Proofpoint TAP	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Puppet	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Puppet - OTel Collector	 | 

## Q

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Qualys VMDR	 | 

## R

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	RabbitMQ	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	RabbitMQ - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Rapid7	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Redis	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Redis - OTel Collector	 | 

## S

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	SailPoint	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Salesforce	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Security Analytics	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	SentinelOne	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Slack	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Squid Proxy	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Squid Proxy - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Strimzi Kafka	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Symantec Web Security Service	 | 

## T

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Tenable	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Threat Intel Quick Analysis	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Trend Micro Deep Security	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Twistlock and Twistlock Classic	 | 

## V

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Varnish	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Varnish - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	VMware	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	VMware (Legacy)	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	VMware Carbon Black	 | 

## W

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Windows	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Windows - OpenTelemetry	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Windows - OTel Collector	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Windows (Legacy)	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Windows JSON	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Windows Performance	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Workday	 | 

## Z

| Logo | Product | Integrations |
| :-- | :-- | :-- |
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Zoom	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Zscaler Internet Access	 | 
|  <img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/>   |   | 	Zscaler Private Access  |

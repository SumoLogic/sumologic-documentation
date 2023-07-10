---
id: set-up-traces-collection-aws-environments
title: Set up Traces Collection for AWS Environments
sidebar_label: AWS Environment Setup
description: To collect traces in non-Kubernetes AWS environments like EC2 or ECS (including Fargate), you can install an OpenTelemetry Collector from the AWS Distro for OpenTelemetry.
---

To collect traces in non-Kubernetes AWS environments like EC2 or ECS (including Fargate), you can install an OpenTelemetry Collector from the [AWS Distro for OpenTelemetry](https://aws.amazon.com/otel/). This specific AWS OpenTelemetry Collector distribution is secure and officially supported by AWS. Collecting telemetry data and sending it to Sumo Logic, the official partner and contributor to the project, has never been easier.

## Prerequisites

* An [endpoint URL](http-traces-source.md) from an existing or new [HTTP Traces Source](http-traces-source.md).
* An installed and configured [AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) tool.

| Account Type | Account Level         |
|:--------------|:---------------------|
| Credits    | Enterprise Operations and Enterprise Suite<br/>Essentials get up to 5 GB a day |

## Telemetry data collection

AWS provides a few alternative scenarios for setting up the Collector. Documentation related to the configuration and installation of the AWS OpenTelemetry Collector for specific AWS Services can be found below.

## AWS OpenTelemetry Collector configuration scenarios

### Amazon Elastic Container Service (ECS)

In the case of ECS, there are two possible deployment configurations. An AWS OpenTelemetry Collector can be installed on the cluster of [EC2](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-ecs-ec2.html)
instances ([Scenario 1 below](#scenario-1-aws-opentelemetry-collector-installation-on-ecs-ec2)) or ran on [AWS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
([Scenario 2 below](#scenario-2-aws-opentelemetry-collector-installation-on-ecs-fargate)).

AWS OpenTelemetry Collector in both scenarios is installed as a sidecar. The installation and configuration are just a few steps, described below.

:::info Prerequisites
You'll need an ECS Cluster where the AWS OpenTelemetry Collector will be deployed. The guide can be found [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create_cluster.html).
:::

### Scenario 1: AWS OpenTelemetry Collector installation on ECS EC2

1. Download the CloudFormation template file which will be used later to install the Collector:  
    ```bash
    curl -O https://raw.githubusercontent.com/SumoLogic/opentelemetry-collector-contrib/main/examples/non-kubernetes/aws-otel-ecs-ec2-deployment.yaml
    ```
1. Download the AWS OpenTelemetry Collector configuration file:  
    ```bash
    curl -O https://raw.githubusercontent.com/SumoLogic/opentelemetry-collector-contrib/main/examples/non-kubernetes/aws-otel-config-file.yaml
    ```
1. Set up the following environment variables that are needed to perform the AWS OpenTelemetry Collector deployment.
   * `CLUSTER_NAME`. Your ECS Cluster name previously set up.
   * `AWS_REGION`. Your ECS Cluster deployment region.
   * `TEMPLATE_PATH`. Path to the template file from the first step.
   * `CONFIG_FILE_PATH`. Path to the config file from the second step.
   * `SUMO_HTTP_TRACES_URL`. Mandatory [Sumo HTTP Traces  URL](http-traces-source.md) from prerequisites section.
1. It is necessary to provide the configuration to the AWS OpenTelemetry Collector. This can be done by creating the parameter in the [AWS Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) by running the following command:  
    ```
    aws ssm put-parameter --name "sumologic-otel-col-config" --type "String" --data-type "text" --value "$(cat ${CONFIG_FILE_PATH} | awk -v url=$SUMO_HTTP_TRACES_URL '{gsub(/SUMO_HTTP_TRACES_URL/,url)}1')"
    ```
1. Execute the command below to create an [AWS CloudFormation](https://aws.amazon.com/cloudformation/) stack that deploys the AWS OpenTelemetry Collector on your cluster:  
    ```
    aws cloudformation create-stack --stack-name sumologic-aws-otel-col-ecs-ec2 --template-body file://${TEMPLATE_PATH} --parameters ParameterKey=ClusterName,ParameterValue=${CLUSTER_NAME} --capabilities=CAPABILITY_NAMED_IAM --region=${AWS_REGION}
    ```
1. To check if everything was deployed go to the [CloudFormation Stacks console](https://console.aws.amazon.com/cloudformation/home#/stacks?filteringStatus=active&filteringText=&viewNested=true&hideStacks=false) and check if the **sumologic-aws-otel-col-ecs-ec2** stack status is **CREATE_COMPLETE**. <br/>  ![stack status.png](/img/traces/stack_status.png)
1. The next step is to check if your deployment is properly running. Go to the [ECS Console](https://console.aws.amazon.com/ecs/home), select the proper region, and select the cluster you used to deploy the AWS OpenTelemetry Collector. Navigate to the **Tasks** tab and check if the task is running. <br/>  ![task status running.png](/img/traces/task-status-running.png)
1. Finally, click on the task and expand the **Containers** list. In the **Network Bindings > External Link** section, you'll find the information on where to send telemetry data.<br/>![external links.png](/img/traces/external-links.png)
  If you plan to send data to the ECS Collector service from a container running in the bridge network mode using the same host, you can use Docker Gateway IP - 172.17.0.1 on EC2 Linux in the application environment variables. For example:
  ```bash
  OTEL_EXPORTER_OTLP_ENDPOINT=http://172.17.0.1:55681
  OTEL_TRACES_EXPORTER=otlp
  ```
  However, with this configuration, the collector service task must be running in each of the used EC2 instances.

### Scenario 2: AWS OpenTelemetry Collector installation on ECS Fargate

1. Download the CloudFormation template file which will be used later to install the Collector:  
    ```bash
    curl -O https://raw.githubusercontent.com/SumoLogic/opentelemetry-collector-contrib/main/examples/non-kubernetes/aws-otel-ecs-fargate-deployment.yaml
    ```
1. Download the AWS OpenTelemetry Collector configuration file.  
    ```bash
    curl -O https://raw.githubusercontent.com/SumoLogic/opentelemetry-collector-contrib/main/examples/non-kubernetes/aws-otel-config-file.yaml
    ```
1. Set up the following environment variables that are needed to perform the AWS OpenTelemetry Collector deployment:
   * `CLUSTER_NAME`. Your ECS Cluster name setup from prerequisite
   * `AWS_REGION`. Your ECS Cluster deployment region
   * `TEMPLATE_PATH`. Path to the template file from the first step
   * `CONFIG_FILE_PATH`. Path to the config file from the second step
   * `SUMO_HTTP_TRACES_URL`. Mandatory [Sumo HTTP Traces URL](http-traces-source.md)
   * `SECURITY_GROUPS`. It is mandatory for AWS Fargate deployment to provide a Security Group ID. They can be found in the [AWS Console](https://console.aws.amazon.com/ec2/v2/home#SecurityGroups:). Find the one configured for the cluster. In the case of multiple Security Groups use comma as separator, such as `sg-xyz,sg-xyz`.
    :::note
    The AWS OpenTelemetry Collector receives data from various receivers - these ports should be configured in the Security Group:
     * AWSXRAY - port: 2000/udp
     * OTLP - ports: 4317/tcp, 55681/tcp
     * JAEGER - ports: 6831/udp, 6832/udp, 14250/tcp, 14268/tcp
     * ZIPKIN - port: 9411/tcp
    :::
   * SUBNETS - same as Security Groups, Subnets have to be configured for AWS Fargate. To find Subnets used on the cluster, use the VPC ID from Security Group and search for it on the list [here](https://console.aws.amazon.com/vpc/home#subnets:). In the case of multiple Subnets use a comma as a separator, such as, `subnet-xyz,subnet-xyz`.
1. It is necessary to provide the configuration to the AWS OpenTelemetry Collector. This can be done by creating the parameter in the [AWS Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) by running the following command:  
    ```
    aws ssm put-parameter --name "sumologic-otel-col-config" --type "String" --data-type "text" --value "$(cat ${CONFIG_FILE_PATH} | awk -v url=$SUMO_HTTP_TRACES_URL '{gsub(/SUMO_HTTP_TRACES_URL/,url)}1')"
    ```
1. Execute the command below to create an [AWS CloudFormation](https://aws.amazon.com/cloudformation/) stack that deploys the AWS OpenTelemetry Collector on your cluster:  
    ```
    aws cloudformation create-stack --stack-name sumologic-aws-otel-col-ecs-fargate --template-body file://${TEMPLATE_PATH} --parameters ParameterKey=ClusterName,ParameterValue=${CLUSTER_NAME} ParameterKey=SecurityGroups,ParameterValue=\"${SECURITY_GROUPS}\" ParameterKey=Subnets,ParameterValue=\"${SUBNETS}\" --capabilities=CAPABILITY_NAMED_IAM --region=${AWS_REGION}
    ```
1. To check if everything was deployed, go to the [CloudFormation Stacks console](https://console.aws.amazon.com/cloudformation/home#/stacks?filteringStatus=active&filteringText=&viewNested=true&hideStacks=false) and check if the **sumologic-aws-otel-col-ecs-fargate** stack status is **CREATE_COMPLETE**. <br/> ![ecs ec2 stack status.png](/img/traces/ecs-ec2-stack-status.png)
1. The next step is to check if your deployment is properly running. Go to the [ECS Console](https://console.aws.amazon.com/ecs/home), select the proper region, and select the cluster you used to deploy the AWS OpenTelemetry Collector. Navigate to the **Tasks** tab and check if the task is running.<br/>  ![task status es2 ecs.png](/img/traces/task-status-es2-ecs.png)
1. Finally, click on the task and expand the **Containers** list. In the **Network > Private IP** or **Public** **IP** sections, you will find the information on where to send telemetry data.<br/>  ![network ips.png](/img/traces/network-ips.png)

## Amazon Elastic Computing (EC2)

1. Download the CloudFormation template file which will be used later to install the Collector on your EC2 instance.  
    ```bash
    curl -O https://raw.githubusercontent.com/SumoLogic/opentelemetry-collector-contrib/main/examples/non-kubernetes/aws-otel-ec2-deployment.yaml
    ```
1. Download the AWS OpenTelemetry Collector configuration file:  
    ```bash
    curl -O https://raw.githubusercontent.com/SumoLogic/opentelemetry-collector-contrib/main/examples/non-kubernetes/aws-otel-config-file.yaml
    ```  
1. Set up the following environment variables that are needed to perform the AWS OpenTelemetry Collector deployment. 
   * `AWS_REGION`. Your ECS Cluster deployment region
   * `TEMPLATE_PATH`. Path to the template file from the first step
   * `SUMO_HTTP_TRACES_URL`. Mandatory [Sumo Logic HTTP Traces URL](http-traces-source.md)
   * `SSH_KEY_NAME`. [Amazon EC2 key pair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) needed to ssh to the EC2 instance
   * `AMI_ID`. an Amazon image ID, depends on the region. To obtain it go to [EC2 Launch Instances](https://console.aws.amazon.com/ec2/v2/home#LaunchInstanceWizard:) and get AMI ID for **Amazon Linux 2 AMI** image, such as, `ami-0a6dc7529cd559185`. Note that the AMI ID depends on the region.
1. Execute the command below to create the [AWS CloudFormation](https://aws.amazon.com/cloudformation/) stack that will create an EC2 instance and install it on the AWS OpenTelemetry Collector:  
    ```
    aws cloudformation create-stack --stack-name sumologic-aws-otel-col-ec2 --template-body file://${TEMPLATE_PATH} --parameters ParameterKey=SumoHttpTracesURL,ParameterValue=${SUMO_HTTP_TRACES_URL} ParameterKey=SSHKeyName,ParameterValue=${SSH_KEY_NAME} ParameterKey=InstanceAMI,ParameterValue=${AMI_ID} --capabilities=CAPABILITY_NAMED_IAM --region=${AWS_REGION}
    ```   
1. To check if everything was deployed, go to [CloudFormation Stacks console](https://console.aws.amazon.com/cloudformation/home#/stacks?filteringStatus=active&filteringText=&viewNested=true&hideStacks=false) and check if **sumologic-aws-otel-ec2** stack status is **CREATE_COMPLETE**. Deploying and configuring an EC2 instance can take even a few minutes. <br/>  ![stack check.png](/img/traces/stack-check.png)  
1. Go to [EC2 Instances](https://console.aws.amazon.com/ec2/v2/home#Instances:instanceState=running), select the proper region and check if the EC2 instance is running. Use public or private IP addresses as exporters endpoints.  <br/>  ![instance ips.png](/img/traces/instance-ips.png)

## AWS OpenTelemetry Collector installation on EKS

In the case of the Amazon EKS service, we highly recommend using our native [Sumo Logic Kubernetes Collection](set-up-traces-collection-for-kubernetes-environments.md) solution, as it provides unique and comprehensive metadata tagging for all data streams. 

## AWS OpenTelemetry Collector default configuration

For each deployment scenario, the AWS OpenTelemetry Collector uses the same default configuration. In this configuration, the Collector is receiving telemetry data for:

* OTLP gRPC protocol - port 4317
* OTLP HTTP protocol - port 55681
* AWS X-RAY - 2000

By default telemetry data is exported by OTLP HTTP directly to a Sumo Logic HTTP Traces Source. You can adjust the configuration below to your needs.

```yml
extensions:
  health_check:
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:55681
  awsxray:
    endpoint: 0.0.0.0:2000
    transport: udp
processors:
  batch/traces:
    timeout: 1s
    send_batch_size: 50
  batch/metrics:
    timeout: 60s
exporters:
  otlphttp:
    endpoint: SUMO_HTTP_TRACES_URL
service:
  extensions: [health_check]
  pipelines:
    traces:
      receivers: [otlp,awsxray]
      processors: [batch/traces]
      exporters: [otlphttp]
    metrics:
      receivers: [otlp]
      processors: [batch/metrics]
      exporters: [otlphttp]
```

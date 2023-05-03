---
id: nodejs
title: AWS Lambda - NodeJS function instrumentation
sidebar_label: NodeJS
description: Learn how to install and configure OpenTelemetry distributed tracing for AWS Lambda functions based on NodeJS and send data to Sumo Logic.
---

This document covers how to install and configure OpenTelemetry distributed tracing for AWS Lambda functions based on NodeJS and send the data to Sumo Logic.

To obtain tracing data from AWS Lambda functions developed in Node.js you can use [OpenTelemetry NodeJS instrumentation](https://github.com/SumoLogic/opentelemetry-lambda/tree/main/nodejs). It provides auto instrumentation.  

**Sumo Logic AWS Distro Lambda Layer supports:**

 * nodejs12.x and nodejs14.x runtimes
 * x86_64 and arm64 architectures

## Sumo Logic AWS Distro Lambda layer

Sumo Logic AWS OTel Lambda Layer provides packed [OpenTelemetry NodeJS](https://github.com/open-telemetry/opentelemetry-js) libraries that automatically instrument Lambda functions. The biggest advantage of installing Sumo Logic OTel AWS as a layer is disabling/enabling instrumentation of the Lambda function without changing the code.

### Distro Lambda Requirements

It is very simple to instrument your AWS NodeJS Lambda function using the Sumo Logic AWS Distro Lambda layer. You'll need the following:

* NodeJS v12.x or newer
* Lambda layers add permissions
* HTTP Traces Source endpoint URL - To send spans from the instrumented Lambda function to Sumo Logic you need an endpoint URL from an existing or new [HTTP Traces Source](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md).

1. Navigate to [functions](https://console.aws.amazon.com/lambda/home#/functions) in the AWS Lambda Console and open the function you want to instrument.

1. Navigate to the **Layers** section and click **Add a layer**.

1. In the **Choose a layer** menu, select **Specify an ARN** and paste the ARN ID for your Lambda function AWS Region. Reference the [amd64](#amd64-architecture) and [arm64](#arm64-architecture) tables for the ARN ID.  

    ![lambda-nodejs1.png](/img/traces/lambda-nodejs1.png)

1. Ensure the AWS Distro layer is present in the Layers section:

    ![lambda-nodejs2.png](/img/traces/lambda-nodejs2.png)

1. Navigate to the **Configuration > Environment variables** section and set up the following three **required** environment variables:

   * `AWS_LAMBDA_EXEC_WRAPPER = /opt/otel-handler` enables auto-instrumentation.
   * `OTEL_TRACES_SAMPLER = always_on` - enables traces sampling.
   * `OTEL_SERVICE_NAME = YOUR_SERVICE_NAME` - ensure you define it as a string value that represents the function name and its business logic such as "Check SQS Lambda". This will appear as the tracing service name in Sumo Logic.
   * Tracing `application` and `cloud.account.id` are set with the **OTEL_RESOURCE_ATTRIBUTES** environment variable.

     * `application=YOUR_APPLICATION_NAME` - the string value, if the function is a part of complex system/application then set it for all other functions/applications.
     * `cloud.account.id=YOUR_CLOUD_ACCOUNT_ID` - set an additional tag that will contain your [AWS Lambda Account ID](https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html). This will help to provide more relevant data.   

        All of the attributes above are comma separated key/value pairs (this is also a way to add additional information to the spans, just after comma add additional key=value pair) such as, `OTEL_RESOURCE_ATTRIBUTES=application=YOUR_APPLICATION_NAME,cloud.account.id=123456789012`.

     * `SUMOLOGIC_HTTP_TRACES_ENDPOINT_URL` has to be set to send all gathered telemetry data to Sumo Logic. The URL comes from an [HTTP Traces Endpoint URL](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md). You can use an existing Source or create a new one if needed.

    ![lambda-nodejs3.png](/img/traces/lambda-nodejs3.png)

1. Your function should be successfully instrumented. Invoke the function and find your traces in the [Sumo Logic Tracing screen](/docs/apm/traces/view-and-investigate-traces).

### amd64 architecture

The following are the Sumo Logic AWS Distro Lambda layers for AWS Region for amd64 (x86_64) architecture.

| AWS Region | ARN |
|:--|:--|
| US East (N.Virginia) us-east-1          | arn:aws:lambda:us-east-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1      |
| US East (Ohio) us-east-2                | arn:aws:lambda:us-east-2:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1      |
| US West (N.Carolina) us-west-1          | arn:aws:lambda:us-west-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1      |
| US West (Oregon) us-west-2              | arn:aws:lambda:us-west-2:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1      |
| Africa (Cape Town) af-south-1           | arn:aws:lambda:af-south-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1     |
| Asia Pacific (Hong Kong) ap-east-1      | arn:aws:lambda:ap-east-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1      |
| Asia Pacific (Mumbai) ap-south-1        | arn:aws:lambda:ap-south-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1     |
| Asia Pacific (Osaka) ap-northeast-3     | arn:aws:lambda:ap-northeast-3:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1 |
| Asia Pacific (Seoul) ap-northeast-2     | arn:aws:lambda:ap-northeast-2:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1 |
| Asia Pacific (Singapore) ap-southeast-1 | arn:aws:lambda:ap-southeast-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1 |
| Asia Pacific (Sydney) ap-southeast-2    | arn:aws:lambda:ap-southeast-2:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1 |
| Asia Pacific (Tokyo) ap-northeast-1     | arn:aws:lambda:ap-northeast-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1 |
| Canada (Central) ca-central-1           | arn:aws:lambda:ca-central-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1   |
| Europe (Frankfurt) eu-central-1         | arn:aws:lambda:eu-central-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1   |
| Europe (Ireland) eu-west-1              | arn:aws:lambda:eu-west-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1      |
| Europe (London) eu-west-2               | arn:aws:lambda:eu-west-2:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1      |
| Europe (Milan) eu-south-1               | arn:aws:lambda:eu-south-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1     |
| Europe (Paris) eu-west-3                | arn:aws:lambda:eu-west-3:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1      |
| Europe (Stockholm) eu-north-1           | arn:aws:lambda:eu-north-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1     |
| Middle East (Bahrain) me-south-1        | arn:aws:lambda:me-south-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1     |
| South America (Sao Paulo) sa-east-1     | arn:aws:lambda:sa-east-1:663229565520:layer:sumologic-otel-nodejs-x86_64-ver-1-0-1:1      |

### arm64 architecture

The following are the Sumo Logic AWS Distro Lambda layers for AWS Region for arm64.

| AWS Region                              | ARN                                                                                      |
|:-----------------------------------------|:------------------------------------------------------------------------------------------|
| US East (N.Virginia) us-east-1          | arn:aws:lambda:us-east-1:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1      |
| US East (Ohio) us-east-2                | arn:aws:lambda:us-east-2:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1      |
| US West (Oregon) us-west-2              | arn:aws:lambda:us-west-2:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1      |
| Asia Pacific (Mumbai) ap-south-1        | arn:aws:lambda:ap-south-1:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1     |
| Asia Pacific (Osaka) ap-northeast-3     | arn:aws:lambda:ap-northeast-3:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1 |
| Asia Pacific (Singapore) ap-southeast-1 | arn:aws:lambda:ap-southeast-1:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1 |
| Asia Pacific (Sydney) ap-southeast-2    | arn:aws:lambda:ap-southeast-2:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1 |
| Asia Pacific (Tokyo) ap-northeast-1     | arn:aws:lambda:ap-northeast-1:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1 |
| Europe (Frankfurt) eu-central-1         | arn:aws:lambda:eu-central-1:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1   |
| Europe (Ireland) eu-west-1              | arn:aws:lambda:eu-west-1:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1      |
| Europe (London) eu-west-2               | arn:aws:lambda:eu-west-2:663229565520:layer:sumologic-otel-nodejs-arm64-ver-1-0-1:1      |


## Sumo Logic AWS OTel Lambda container instrumentation

Sumo Logic AWS OTel Lambda also provides packed [OpenTelemetry NodeJS](https://github.com/open-telemetry/opentelemetry-js) libraries for container based Lambda functions. 

:::note
The instructions below support only [AWS Base Images for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-images.html).
:::

### Otel Lambda Requirements

Instrumentation of container based AWS Lambda function requires some
changes in the Dockerfile and image rebuild. You'll need the following:

 * Docker
 * NodeJS v12.x or newer
 * HTTP Traces Source endpoint URL - To send spans from the instrumented Lambda function to Sumo Logic you need an endpoint URL from an existing or new [HTTP Traces Source](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md).

### Lambda function image changes

1. Download and extract Sumo Logic AWS OTel Lambda archive with instrumentation packages specific for your architecture - [amd64 (x86_64)](https://github.com/SumoLogic/opentelemetry-lambda/releases/download/nodejs-v1.0.1/opentelemetry-nodejs-amd64.zip) or [arm64](https://github.com/SumoLogic/opentelemetry-lambda/releases/download/nodejs-v1.0.1/opentelemetry-nodejs-arm64.zip).

1. Extracted instrumentation libraries have to be added to the image in /opt directory. Please see Dockerfile example:

    ```
    FROM public.ecr.aws/lambda/nodejs:14-arm64

    # Lambda Function Code  
    COPY index.js ${LAMBDA_TASK_ROOT}  
    COPY package.json ${LAMBDA_TASK_ROOT}  
    RUN  npm install

    **# Copy OT Instrumentation  
    COPY collector-config/ /opt/collector-config/  
    COPY extensions/ /opt/extensions/  
    COPY nodejs/ /opt/nodejs/  
    COPY otel-handler /opt/  
    COPY wrapper.d.ts /opt/  
    COPY wrapper.d.ts.map /opt/  
    COPY wrapper.js /opt/  
    COPY wrapper.js.map /opt/**

    CMD \[ "index.handler" \]
    ```

1. Rebuild docker image.

## Deployment

1. Navigate to [functions](https://console.aws.amazon.com/lambda/home#/functions) in the AWS Lambda Console and open the function you want to instrument.

1. Deploy new function image.

1. Navigate to the **Configuration > Environment variables** section and set up the following environment variables:

   * `AWS_LAMBDA_EXEC_WRAPPER = /opt/otel-handler` enables auto-instrumentation.
   * `OTEL_TRACES_SAMPLER = always_on` - enables traces sampling.
   * `OTEL_SERVICE_NAME = YOUR_SERVICE_NAME` - ensure you define it as a string value that represents the function name and its business logic such as "Check SQS Lambda". This will appear as the tracing service name in Sumo Logic.
   * Tracing `application` and `cloud.account.id` are set with the **OTEL_RESOURCE_ATTRIBUTES** environment variable.

     * `application=YOUR_APPLICATION_NAME` - the string value, if the function is a part of complex system/application then set it for all other functions/applications.
     * `cloud.account.id=YOUR_CLOUD_ACCOUNT_ID` - set an additional tag that will contain your [AWS Lambda Account ID](https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html). This will help to provide more relevant data.   

        All of the attributes above are comma separated key/value pairs (this is also a way to add additional information to the spans, just after comma add additional key=value pair) such as, `OTEL_RESOURCE_ATTRIBUTES=application=YOUR_APPLICATION_NAME,cloud.account.id=123456789012`.

     * `SUMOLOGIC_HTTP_TRACES_ENDPOINT_URL` has to be set to send all gathered telemetry data to Sumo Logic. The URL comes from an [HTTP Traces Endpoint URL](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md). You can use an existing Source or create a new one if needed.

    ![lambda-nodejs4.png](/img/traces/lambda-nodejs4.png)

1. Your function should be successfully instrumented. Invoke the function and find your traces in the [Sumo Logic Tracing screen](/docs/apm/traces/view-and-investigate-traces).

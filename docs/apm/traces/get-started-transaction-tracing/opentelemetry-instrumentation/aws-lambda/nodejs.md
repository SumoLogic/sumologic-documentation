---
id: nodejs
title: AWS Lambda - NodeJS function instrumentation
sidebar_label: NodeJS
description: Learn how to install and configure OpenTelemetry distributed tracing for AWS Lambda functions based on NodeJS and send data to Sumo Logic.
---

This document covers how to install and configure OpenTelemetry distributed tracing for AWS Lambda functions based on NodeJS and send the data to Sumo Logic.

To obtain tracing data from AWS Lambda functions developed in Node.js you can use [Sumo Logic Distribution for OpenTelemetry NodeJS Lambda](https://github.com/SumoLogic/sumologic-otel-lambda/tree/main/nodejs). It provides auto instrumentation.  

**Sumo Logic OTel NodeJS Lambda layer supports:**

* nodejs14.x, nodejs16.x and nodejs18.x runtimes
* x86_64 and arm64 architectures

## Sumo Logic Distribution for OpenTelemetry Lambda Layer

[Sumo Logic Distribution for OpenTelemetry Lambda Layer version 1.12.0](https://github.com/SumoLogic/sumologic-otel-lambda/tree/release-nodejs-v1.12.0/nodejs) provides packed [OpenTelemetry NodeJS](https://github.com/open-telemetry/opentelemetry-js) libraries that automatically instrument Lambda functions. The biggest advantage of installing Sumo Logic OTel Lambda as a layer is disabling/enabling instrumentation of the Lambda function without changing the code.

### Lambda function requirements

It is very simple to instrument your AWS NodeJS Lambda function using the Sumo Logic Distro for Lambda layer. You'll need the following:

* NodeJS v14.x or newer
* Lambda layers add permissions
* HTTP Traces Source endpoint URL - To send spans from the instrumented Lambda function to Sumo Logic you need an endpoint URL from an existing or new [HTTP Traces Source](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md).

1. Navigate to [functions](https://console.aws.amazon.com/lambda/home#/functions) in the AWS Lambda Console and open the function you want to instrument.

1. Navigate to the **Layers** section and click **Add a layer**.

1. In the **Choose a layer** menu, select **Specify an ARN** and paste the ARN ID for your Lambda function AWS Region. Reference the [amd64](#amd64-architecture) and [arm64](#arm64-architecture) tables for the ARN ID.  

    ![lambda-nodejs1.png](/img/traces/lambda-nodejs1.png)

1. Ensure the AWS Distro layer is present in the Layers section:

    ![lambda-nodejs2.png](/img/traces/lambda-nodejs2.png)

1. Navigate to the **Configuration > Environment variables** section and set up the following environment variables (the first are three **required**):

   * `AWS_LAMBDA_EXEC_WRAPPER = /opt/otel-handler` - Enables auto-instrumentation.
   * `OTEL_TRACES_SAMPLER = always_on` - Enables traces sampling.
   * `OTEL_SERVICE_NAME = YOUR_SERVICE_NAME` - Ensure you define it as a string value that represents the function name and its business logic such as "Check SQS Lambda". This will appear as the tracing service name in Sumo Logic.
   * `OTEL_RESOURCE_ATTRIBUTES` - Sets OpenTelemetry resources. Add the `deployment.environment=[environment-name]` tag as needed to allow for filtering by environment on dashboard panels. (For more information, see [Services Dashboard Panels](/docs/apm/traces/services-list-map#services-dashboard-panels)). Tracing `application` and `cloud.account.id` are set with the `OTEL_RESOURCE_ATTRIBUTES` environment variable:

     * `application=YOUR_APPLICATION_NAME` - the string value, if the function is a part of complex system/application then set it for all other functions/applications.
     * `cloud.account.id=YOUR_CLOUD_ACCOUNT_ID` - set an additional tag that will contain your [AWS Lambda Account ID](https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html). This will help to provide more relevant data.   

        All of the attributes above are comma separated key/value pairs (this is also a way to add additional information to the spans, just after comma add additional key=value pair) such as, `OTEL_RESOURCE_ATTRIBUTES=application=YOUR_APPLICATION_NAME,cloud.account.id=123456789012`.

   * `SUMOLOGIC_HTTP_TRACES_ENDPOINT_URL` has to be set to send all gathered telemetry data to Sumo Logic. The URL comes from an [HTTP Traces Endpoint URL](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md). You can use an existing Source or create a new one if needed.

    ![lambda-nodejs3.png](/img/traces/lambda-nodejs3.png)

1. Your function should be successfully instrumented. Invoke the function and find your traces in the [Sumo Logic Tracing screen](/docs/apm/traces/view-and-investigate-traces).

### Sumo Logic Distro Lambda layers for AWS Region - amd64 (x86_64) architecture

The following are the Sumo Logic OTel Lambda layers for AWS Region for amd64 (x86_64) architecture.

| AWS Region | ARN |
|:--|:--|
|   af-south-1       |   arn:aws:lambda:af-south-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1       |
|   ap-east-1        |   arn:aws:lambda:ap-east-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1        |
|   ap-northeast-1   |   arn:aws:lambda:ap-northeast-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1   |
|   ap-northeast-2   |   arn:aws:lambda:ap-northeast-2:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1   |
|   ap-northeast-3   |   arn:aws:lambda:ap-northeast-3:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1   |
|   ap-south-1       |   arn:aws:lambda:ap-south-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1       |
|   ap-southeast-1   |   arn:aws:lambda:ap-southeast-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1   |
|   ap-southeast-2   |   arn:aws:lambda:ap-southeast-2:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1   |
|   ca-central-1     |   arn:aws:lambda:ca-central-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1     |
|   eu-central-1     |   arn:aws:lambda:eu-central-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1     |
|   eu-north-1       |   arn:aws:lambda:eu-north-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1       |
|   eu-south-1       |   arn:aws:lambda:eu-south-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1       |
|   eu-west-1        |   arn:aws:lambda:eu-west-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1        |
|   eu-west-2        |   arn:aws:lambda:eu-west-2:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1        |
|   eu-west-3        |   arn:aws:lambda:eu-west-3:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1        |
|   me-south-1       |   arn:aws:lambda:me-south-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1       |
|   sa-east-1        |   arn:aws:lambda:sa-east-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1        |
|   us-east-1        |   arn:aws:lambda:us-east-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1        |
|   us-east-2        |   arn:aws:lambda:us-east-2:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1        |
|   us-west-1        |   arn:aws:lambda:us-west-1:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1        |
|   us-west-2        |   arn:aws:lambda:us-west-2:663229565520:layer:sumologic-otel-lambda-nodejs-x86_64-v1-12-0:1        |

### Sumo Logic Distro Lambda layers for AWS Region - arm64 (arm) architecture

The following are the Sumo Logic OTel Lambda layers for AWS Region for arm64.

| AWS Region                              | ARN                                                                          |
|:----------------------------------------|:-----------------------------------------------------------------------------|
|   ap-northeast-1   |   arn:aws:lambda:ap-northeast-1:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1   |
|   ap-northeast-3   |   arn:aws:lambda:ap-northeast-3:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1   |
|   ap-south-1       |   arn:aws:lambda:ap-south-1:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1       |
|   ap-southeast-1   |   arn:aws:lambda:ap-southeast-1:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1   |
|   ap-southeast-2   |   arn:aws:lambda:ap-southeast-2:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1   |
|   eu-central-1     |   arn:aws:lambda:eu-central-1:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1     |
|   eu-west-1        |   arn:aws:lambda:eu-west-1:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1        |
|   eu-west-2        |   arn:aws:lambda:eu-west-2:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1        |
|   us-east-1        |   arn:aws:lambda:us-east-1:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1        |
|   us-east-2        |   arn:aws:lambda:us-east-2:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1        |
|   us-west-2        |   arn:aws:lambda:us-west-2:663229565520:layer:sumologic-otel-lambda-nodejs-arm64-v1-12-0:1        |

## Sumo Logic OTel Lambda container instrumentation

[Sumo Logic Distribution for OpenTelemetry Lambda Layer version 1.12.0](https://github.com/SumoLogic/sumologic-otel-lambda/tree/release-nodejs-v1.12.0/nodejs) also provides packed [OpenTelemetry NodeJS](https://github.com/open-telemetry/opentelemetry-js) libraries for container based Lambda functions.

:::note
The instructions below support only [AWS Base Images for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-images.html).
:::

### Container based lambda requirements

Instrumentation of container based AWS Lambda function requires some
changes in the Dockerfile and image rebuild. You'll need the following:

* Docker
* NodeJS v14.x or newer
* HTTP Traces Source endpoint URL - To send spans from the instrumented Lambda function to Sumo Logic you need an endpoint URL from an existing or new [HTTP Traces Source](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md).

### Lambda function image changes

1. Download and extract Sumo Logic OTel Lambda archive with instrumentation packages specific for your architecture - [amd64 (x86_64)](https://github.com/SumoLogic/sumologic-otel-lambda/releases/download/nodejs-v1.12.0/opentelemetry-nodejs-amd64.zip) or [arm64](https://github.com/SumoLogic/sumologic-otel-lambda/releases/download/nodejs-v1.12.0/opentelemetry-nodejs-arm64.zip).

1. Extracted instrumentation libraries have to be added to the image in /opt directory. Please see Dockerfile example:

    ```dockerfile
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

### Deployment

1. Navigate to [functions](https://console.aws.amazon.com/lambda/home#/functions) in the AWS Lambda Console and open the function you want to instrument.

1. Deploy new function image.

1. Navigate to the **Configuration > Environment variables** section and set up the following environment variables:

   * `AWS_LAMBDA_EXEC_WRAPPER = /opt/otel-handler` - Enables auto-instrumentation.
   * `OTEL_TRACES_SAMPLER = always_on` - Enables traces sampling.
   * `OTEL_SERVICE_NAME = YOUR_SERVICE_NAME` - Ensure you define it as a string value that represents the function name and its business logic such as "Check SQS Lambda". This will appear as the tracing service name in Sumo Logic.
   * `OTEL_RESOURCE_ATTRIBUTES` - Sets OpenTelemetry resources. Add the `deployment.environment=[environment-name]` tag as needed to allow for filtering by environment on dashboard panels. (For more information, see [Services Dashboard Panels](/docs/apm/traces/services-list-map#services-dashboard-panels)). Tracing `application` and `cloud.account.id` are set with the `OTEL_RESOURCE_ATTRIBUTES` environment variable:

     * `application=YOUR_APPLICATION_NAME` - the string value, if the function is a part of complex system/application then set it for all other functions/applications.
     * `cloud.account.id=YOUR_CLOUD_ACCOUNT_ID` - set an additional tag that will contain your [AWS Lambda Account ID](https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html). This will help to provide more relevant data.   

        All of the attributes above are comma separated key/value pairs (this is also a way to add additional information to the spans, just after comma add additional key=value pair) such as, `OTEL_RESOURCE_ATTRIBUTES=application=YOUR_APPLICATION_NAME,cloud.account.id=123456789012`.

   * `SUMOLOGIC_HTTP_TRACES_ENDPOINT_URL` has to be set to send all gathered telemetry data to Sumo Logic. The URL comes from an [HTTP Traces Endpoint URL](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md). You can use an existing Source or create a new one if needed.

    ![lambda-nodejs4.png](/img/traces/lambda-nodejs4.png)

1. Your function should be successfully instrumented. Invoke the function and find your traces in the [Sumo Logic Tracing screen](/docs/apm/traces/view-and-investigate-traces).

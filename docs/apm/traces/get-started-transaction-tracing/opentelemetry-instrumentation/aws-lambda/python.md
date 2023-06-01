---
id: python
title: AWS Lambda - Python function instrumentation
sidebar_label: Python
description: Learn how to install and configure OpenTelemetry distributed tracing for AWS Lambda functions written in Python and send data to Sumo Logic.
---

This document covers how to install and configure OpenTelemetry distributed tracing for AWS Lambda functions written in Python and send data to Sumo Logic. To obtain telemetry data from AWS Lambda functions developed in Python language you can use the [Sumo Logic Distribution for OpenTelemetry Python Lambda](https://github.com/SumoLogic-Labs/sumo-opentelemetry-lambda/tree/main/python).

Sumo Logic OTel Python Lambda supports:

* Python version between 3.7 and 3.10
* x86_64 and arm64 architectures

## Sumo Logic Distribution for OpenTelemetry Lambda Layer

[Sumo Logic Distribution for OpenTelemetry Lambda Layer version 1.17.0](https://github.com/SumoLogic/sumologic-otel-lambda/releases/tag/python-v1.17.0) provides packed [OpenTelemetry Python](https://github.com/open-telemetry/opentelemetry-python) libraries that automatically instrument Lambda functions. The biggest advantage of installing Sumo Logic OTel Lambda as a layer is disabling/enabling instrumentation of the Lambda function without changing the code.

## Requirements

It is very simple to instrument your AWS Python Lambda function using the Sumo Logic Distro for Lambda layer. You'll need the following:

* Python version between 3.7 and 3.10
* Lambda layers add permissions
* HTTP Traces Source endpoint URL - To send spans from the instrumented Lambda function to Sumo Logic you'll need an endpoint URL from an [HTTP Traces Source](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md).

## Deployment

1. Navigate to [functions](https://console.aws.amazon.com/lambda/home#/functions) in the AWS Lambda Console and open the function you want to instrument.
1. Navigate to the **Layers** section and click **Add a layer**.
1. In the **Choose a layer** menu, select **Specify an ARN** and paste the ARN ID for your Lambda function AWS Region. Reference the table in the section _Sumo Logic AWS Distro Lambda layers for AWS Region - amd64 (x86_64) architecture_ for the ARN ID.  <br/>  ![lambda-python.png](/img/traces/lambda-python1.png)
1. Ensure the AWS Distro layer is present in the Layers section:<br/> ![lambda-python.png](/img/traces/lambda-python2.png)
1. Navigate to the **Configuration** > **Environment variables** section and set up the following environment variables:
   * `AWS_LAMBDA_EXEC_WRAPPER= /opt/otel-instrument` enables auto-instrumentation.
   * `OTEL_TRACES_SAMPLER = always_on` - enables traces sampling.
   * `OTEL_SERVICE_NAME = YOUR_SERVICE_NAME` - ensure you define it as a string value that represents the function name and its business logic such as "Check SQS Lambda". This will appear as the tracing service name in Sumo Logic.
   * Tracing `application` and `cloud.account.id` are set with the `OTEL_RESOURCE_ATTRIBUTES` environment variable.
     * `application=YOUR_APPLICATION_NAME` - the string value, if the function is a part of complex system/application then set it for all other functions/applications.
     * `cloud.account.id=YOUR_CLOUD_ACCOUNT_ID` - set an additional tag that will contain your [AWS Lambda Account ID](https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html). This will help to provide more relevant data.
        All of the attributes above are comma separated key/value pairs (this is also a way to add additional information to the spans, just after comma add additional key=value pair) such as, `OTEL_RESOURCE_ATTRIBUTES=application=YOUR_APPLICATION_NAME,cloud.account.id=123456789012`.
     * `SUMOLOGIC_HTTP_TRACES_ENDPOINT_URL` has to be set to send all gathered telemetry data to Sumo Logic. The URL comes from an [HTTP Traces Endpoint URL](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md). You can use an existing Source or create a new one if needed.  <br/>  ![lambda-python.png](/img/traces/lambda-python3.png)
1. Make sure you have **X-Ray Tracing** disabled in Lambda API Stage. Navigate to [AWS API Gateway console](https://console.aws.amazon.com/apigateway/main/apis), find your API and go to Stages. In the **Logs/Tracing** tab uncheck **Enable X-Ray Tracing** option.
:::note
If for whatever reason you can't disable this, configure X-Ray context propagation by setting `OTEL_PROPAGATORS=xray` environment variable on your client side.
:::

1. Your function should be successfully instrumented. Invoke the function and find your traces in the [Sumo Logic Tracing screen](/docs/apm/traces/view-and-investigate-traces.md).

## Sumo Logic Distro Lambda layers for AWS Region - amd64 (x86_64) architecture

Go back to Step 3 (_In the Choose a layer menu_...).

| Region         | ARN                                                                                            |
|----------------|------------------------------------------------------------------------------------------------|
| af-south-1     | arn:aws:lambda:af-south-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1     |
| ap-east-1      | arn:aws:lambda:ap-east-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1      |
| ap-northeast-1 | arn:aws:lambda:ap-northeast-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1 |
| ap-northeast-2 | arn:aws:lambda:ap-northeast-2:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1 |
| ap-northeast-3 | arn:aws:lambda:ap-northeast-3:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1 |
| ap-south-1     | arn:aws:lambda:ap-south-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1     |
| ap-southeast-1 | arn:aws:lambda:ap-southeast-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1 |
| ap-southeast-2 | arn:aws:lambda:ap-southeast-2:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1 |
| ca-central-1   | arn:aws:lambda:ca-central-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1   |
| eu-central-1   | arn:aws:lambda:eu-central-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1   |
| eu-north-1     | arn:aws:lambda:eu-north-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1     |
| eu-south-1     | arn:aws:lambda:eu-south-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1     |
| eu-west-1      | arn:aws:lambda:eu-west-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1      |
| eu-west-2      | arn:aws:lambda:eu-west-2:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1      |
| eu-west-3      | arn:aws:lambda:eu-west-3:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1      |
| me-south-1     | arn:aws:lambda:me-south-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1     |
| sa-east-1      | arn:aws:lambda:sa-east-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1      |
| us-east-1      | arn:aws:lambda:us-east-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1      |
| us-east-2      | arn:aws:lambda:us-east-2:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1      |
| us-west-1      | arn:aws:lambda:us-west-1:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1      |
| us-west-2      | arn:aws:lambda:us-west-2:663229565520:layer:sumologic-otel-lambda-python-x86_64-v1-17-0:1      |

## Sumo Logic Distro Lambda layers for AWS Region - arm64 (arm) architecture

Go back to Step 3 (_In the Choose a layer menu_...).

| Region         | ARN                                                                                           |
|----------------|-----------------------------------------------------------------------------------------------|
| ap-northeast-1 | arn:aws:lambda:ap-northeast-1:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1 |
| ap-northeast-3 | arn:aws:lambda:ap-northeast-3:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1 |
| ap-south-1     | arn:aws:lambda:ap-south-1:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1     |
| ap-southeast-1 | arn:aws:lambda:ap-southeast-1:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1 |
| ap-southeast-2 | arn:aws:lambda:ap-southeast-2:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1 |
| eu-central-1   | arn:aws:lambda:eu-central-1:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1   |
| eu-west-1      | arn:aws:lambda:eu-west-1:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1      |
| eu-west-2      | arn:aws:lambda:eu-west-2:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1      |
| us-east-1      | arn:aws:lambda:us-east-1:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1      |
| us-east-2      | arn:aws:lambda:us-east-2:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1      |
| us-west-2      | arn:aws:lambda:us-west-2:663229565520:layer:sumologic-otel-lambda-python-arm64-v1-17-0:1      |

## Sumo Logic AWS OTel Lambda container instrumentation

Sumo Logic AWS OTel Lambda also provides packed [OpenTelemetry Python](https://github.com/open-telemetry/opentelemetry-python) libraries for container based Lambda functions. 

:::note
The instructions below support only [AWS Base Images for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-images.html).
:::

### Requirements

Instrumentation of container based AWS Lambda function requires some changes in the Dockerfile and image rebuild. You'll need the following:

* Docker
* Python version between 3.7 and 3.10
* HTTP Traces Source endpoint URL -  To send spans from the instrumented Lambda function to Sumo  Logic you'll need an endpoint URL from an [HTTP Traces Source](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md).

### Lambda function image changes

1. Download and extract Sumo Logic AWS OTel Lambda archive with instrumentation packages specific for your architecture - [amd64 (x86_64)](https://github.com/SumoLogic/sumologic-otel-lambda/releases/download/release-python-v1.17.0/opentelemetry-python-amd64.zip) or [arm64](https://github.com/SumoLogic/sumologic-otel-lambda/releases/download/release-python-v1.17.0/opentelemetry-python-arm64.zip).
1. Extracted instrumentation libraries have to be added to the image in /opt directory. Please see Dockerfile example:

    ```bash
    FROM public.ecr.aws/lambda/python:3.8-arm64

    # Lambda Function Code  
    COPY lambda_function.py ${LAMBDA_TASK_ROOT}  
    COPY requirements.txt  .  
    RUN  pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

    **# Copy OT Instrumentation  
    COPY collector-config/ /opt/collector-config/  
    COPY extensions/ /opt/extensions/  
    COPY python/ /opt/python/  
    COPY otel-instrument /opt/**

    CMD \[ "lambda_function.lambda_handler" \]
    ```

1. Rebuild docker image.

## Deployment

1. Navigate to [functions](https://console.aws.amazon.com/lambda/home#/functions) in the AWS Lambda Console and open the function you want to instrument.
1. Deploy new function image.
1. Navigate to the **Configuration** > **Environment variables** section and set up the following environment variables:
   * `AWS_LAMBDA_EXEC_WRAPPER = /opt/otel-instrument` enables auto-instrumentation.
   * `OTEL_TRACES_SAMPLER = always_on` - enables traces sampling.
   * `OTEL_SERVICE_NAME = YOUR_SERVICE_NAME` - Ensure you define it as a string value that represents the function name and its business logic such as "Check SQS Lambda". This will appear as the tracing service name in Sumo Logic.
   * Tracing `application` and `cloud.account.id` are set with the `OTEL_RESOURCE_ATTRIBUTES` environment variable.
   * `application=YOUR_APPLICATION_NAME` - the string value, if the function is a part of complex system/application then set it for all other functions/applications.
     * `cloud.account.id=YOUR_CLOUD_ACCOUNT_ID` - set an additional tag that will contain your [AWS Lambda Account ID](https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html). This will help to provide more relevant data.
        All of the attributes above are comma separated key/value pairs (this is also a way to add additional information to the spans, just after comma add additional key=value pair), such as `OTEL_RESOURCE_ATTRIBUTES=application=YOUR_APPLICATION_NAME,cloud.account.id=123456789012`.
   * `SUMOLOGIC_HTTP_TRACES_ENDPOINT_URL` has to be set to send all gathered telemetry data to Sumo Logic. The URL comes from an [HTTP Traces Endpoint URL](/docs/apm/traces/get-started-transaction-tracing/http-traces-source.md). You can use an existing Source or create a new one if needed.  <br/>  ![lambda-python.png](/img/traces/lambda-python4.png)
1. Your function should be successfully instrumented. Invoke the function and find your traces in the [Sumo Logic Tracing screen](/docs/apm/traces/view-and-investigate-traces.md).

### Context propagation

In case of an external request to the Lambda function, it is important to propagate the context. Enabling [AWS X-Ray context propagation](https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.tml#xray-concepts-tracingheader) on the client side will help to visualize the complex flow of the trace.

For applications instrumented by OpenTelemetry SDK, it is enough to install AWS X-Ray propagator dependency specific for an instrumentation and configure the [`OTEL_PROPAGATORS` environment variable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/sdk-environment-variables.md#general-sdk-configuration) (for example: `export OTEL_PROPAGATORS= tracecontext,baggage,xray`).

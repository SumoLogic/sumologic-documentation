---
id: java
title: AWS Lambda - Java Function Instrumentation
sidebar_label: Java
description: Learn how to install and configure OpenTelemetry distributed tracing for AWS Java-based Lambda functions and send data to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApmTrace from '../../../../../reuse/apm-traces-layer-order.md';

This document covers how to install and configure OpenTelemetry distributed tracing for AWS Lambda functions based on Java and send the data to Sumo Logic.

To obtain tracing data from AWS Lambda functions developed in Java, you can use [Sumo Logic Distribution for OpenTelemetry Java Lambda](https://github.com/SumoLogic/sumologic-otel-lambda/tree/main/java), which provides auto-instrumentation.

**Sumo Logic OTel Java Lambda layer supports:**

* Java8 (Corretto) and Java11 (Corretto) runtimes
* x86_64 and arm64 architectures

## Sumo Logic Distribution for OpenTelemetry Lambda layer

### Lambda function requirements

You'll need the following:

* Java8 (Corretto) or Java11 (Corretto)
* Lambda layers add permissions
* Sumo Logic OTLP/HTTP Source endpoint URL. To send spans from the instrumented Lambda function to Sumo Logic you need an endpoint URL from an existing or new OTLP/HTTP source.

You can instrument your AWS Java Lambda function using the [Sumo Logic Distribution for OpenTelemetry Lambda Layer version 1.30.1](https://github.com/SumoLogic/sumologic-otel-lambda/tree/release-java-v1.30.1/java). By default, calls to the Lambda function and AWS Services are instrumented, see the [Manual Instrumentation](#optional-manual-instrumentation) section below if your function is performing some other calls like HTTP requests or database calls.

1. Navigate to [functions](https://console.aws.amazon.com/lambda/home#/functions) in the AWS Lambda Console and open the function you want to instrument.
1. Navigate to the **Layers** section and click **Add a layer**.
1. In the **Choose a layer** menu, select **Specify an ARN** and paste the ARN ID for your Lambda function AWS Region. Reference the [amd64](#sumo-logic-distro-lambda-layers-for-aws-region---amd64-x86_64-architecture) and [arm64](#sumo-logic-distro-lambda-layers-for-aws-region---arm64-arm-architecture) tables for the ARN ID.<br/>  <img src={useBaseUrl('img/apm/traces/lambda-java1.png')} alt="AWS Lambda Choose a layer option" style={{border: '1px solid gray'}} width="800" />
1. Ensure the AWS Distro layer is present in the Layers section:<br/><img src={useBaseUrl('img/apm/traces/lambda-java2.png')} alt="AWS Distro Layers data" style={{border: '1px solid gray'}} width="800" />
   :::note
   <ApmTrace/>
   :::
1. Navigate to the **Configuration > Environment variables** section and set up the following **required** environment variables:
   * `AWS_LAMBDA_EXEC_WRAPPER` environment variable configures the appropriate wrapper for a specific type of lambda handler function. Set the value appropriate for your handler:
     * `/opt/otel-handler`. If implementing RequestHandler.
     * `/opt/otel-proxy-handler`. If implementing RequestHandler but proxied through API Gateway.
     * `/opt/otel-stream-handler`. If implementing RequestStreamHandler.
   * `OTEL_SERVICE_NAME = YOUR_SERVICE_NAME`. Ensure you define it as a string value that represents the function name and its business logic such as "Check SQS Lambda". This will appear as the tracing service name in Sumo Logic.
   * `OTEL_RESOURCE_ATTRIBUTES`. Sets OpenTelemetry resources. Add the `deployment.environment=[environment-name]` tag as needed to allow for filtering by environment on dashboard panels. (For more information, see [Services Dashboard Panels](/docs/apm/traces/services-list-map#services-dashboard-panels)). Tracing `application` and `cloud.account.id` are set with the `OTEL_RESOURCE_ATTRIBUTES` environment variable:
     * `application=YOUR_APPLICATION_NAME`. The string value, if the function is a part of complex system/application then set it for all other functions/applications.
     * `cloud.account.id=YOUR_CLOUD_ACCOUNT_ID`. Set an additional tag that will contain your [AWS Lambda Account ID](https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html). This will help to provide more relevant data. All of the attributes above are comma separated key/value pairs (this is also a way to add additional information to the spans, just after comma add additional key=value pair) such as: `OTEL_RESOURCE_ATTRIBUTES=application=YOUR_APPLICATION_NAME,cloud.account.id=123456789012`.
   * `SUMO_OTLP_HTTP_ENDPOINT_URL` has to be set to send all gathered telemetry data to Sumo Logic. The URL comes from an [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp). You can use an existing Source or create a new one, if needed.
    :::note
    The `SUMOLOGIC_HTTP_TRACES_ENDPOINT_URL` environment variable is deprecated. You'll need to switch from the HTTP Traces Source to [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp) and use the `SUMO_OTLP_HTTP_ENDPOINT_URL` environment variable instead.
    :::
    <img src={useBaseUrl('img/apm/traces/lambda-java3.png')} alt="List of AWS Lambda environment variables" style={{border: '1px solid gray'}} width="800" />
1. Your function should be successfully instrumented. Invoke the function and find your traces in the [Sumo Logic Tracing screen](/docs/apm/traces/view-and-investigate-traces).

### Optional manual instrumentation

By default, only calls to the Lambda function and AWS Services are instrumented to decrease instrumentation overhead. If the Lambda function is performing some other calls like HTTP requests or database calls it's worth providing additional instrumentation to get a better understanding of the Lambda execution.

See the [OpenTelemetry Java Instrumentation](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation) repository and check if they are on the list of supported packages. Some changes in the code are needed and the specific package will have to be added to the Lambda function dependencies. The steps below show how to instrument calls from the [OkHttp](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/okhttp/okhttp-3.0/library)
library.

1. Add the OkHttp instrumentation package to your Lambda function dependencies.
1. Update the imports list, add:
    ```java
    import io.opentelemetry.instrumentation.okhttp.v3_0.OkHttpTracing;
    import io.opentelemetry.api.GlobalOpenTelemetry;
    ```
1. Initialize tracing for the OkHttp library.
    ```java
    okHttpClient client =
                new OkHttpClient.Builder()
    .addInterceptor(OkHttpTracing.create(GlobalOpenTelemetry.get()).newInterceptor())
        .build();
    ```

This will generate all the spans related to the calls made by the OkHttp
library.

### Sumo Logic Distro Lambda layers for AWS Region - amd64 (x86_64) architecture

The following are the Sumo Logic OTel Lambda layers for AWS Region amd64 (x86_64) architecture.

| AWS Region | ARN |
|:--|:--|
|   af-south-1       |   arn:aws:lambda:af-south-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2       |
|   ap-east-1        |   arn:aws:lambda:ap-east-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2        |
|   ap-northeast-1   |   arn:aws:lambda:ap-northeast-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2   |
|   ap-northeast-2   |   arn:aws:lambda:ap-northeast-2:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2   |
|   ap-northeast-3   |   arn:aws:lambda:ap-northeast-3:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2   |
|   ap-south-1       |   arn:aws:lambda:ap-south-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2       |
|   ap-southeast-1   |   arn:aws:lambda:ap-southeast-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2   |
|   ap-southeast-2   |   arn:aws:lambda:ap-southeast-2:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2   |
|   ca-central-1     |   arn:aws:lambda:ca-central-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2     |
|   eu-central-1     |   arn:aws:lambda:eu-central-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2     |
|   eu-north-1       |   arn:aws:lambda:eu-north-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2       |
|   eu-south-1       |   arn:aws:lambda:eu-south-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2       |
|   eu-west-1        |   arn:aws:lambda:eu-west-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2        |
|   eu-west-2        |   arn:aws:lambda:eu-west-2:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2        |
|   eu-west-3        |   arn:aws:lambda:eu-west-3:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2        |
|   me-south-1       |   arn:aws:lambda:me-south-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2       |
|   sa-east-1        |   arn:aws:lambda:sa-east-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2        |
|   us-east-1        |   arn:aws:lambda:us-east-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2        |
|   us-east-2        |   arn:aws:lambda:us-east-2:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2        |
|   us-west-1        |   arn:aws:lambda:us-west-1:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2        |
|   us-west-2        |   arn:aws:lambda:us-west-2:663229565520:layer:sumologic-otel-lambda-java-x86_64-v1-30-1:2        |

### Sumo Logic Distro Lambda layers for AWS Region - arm64 (arm) architecture

The following are the Sumo Logic OTel Lambda layers for AWS Region arm64 architecture.

| AWS Region | ARN |
|:--|:--|
|   ap-northeast-1   |   arn:aws:lambda:ap-northeast-1:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2   |
|   ap-northeast-3   |   arn:aws:lambda:ap-northeast-3:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2   |
|   ap-south-1       |   arn:aws:lambda:ap-south-1:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2       |
|   ap-southeast-1   |   arn:aws:lambda:ap-southeast-1:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2   |
|   ap-southeast-2   |   arn:aws:lambda:ap-southeast-2:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2   |
|   eu-central-1     |   arn:aws:lambda:eu-central-1:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2     |
|   eu-west-1        |   arn:aws:lambda:eu-west-1:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2        |
|   eu-west-2        |   arn:aws:lambda:eu-west-2:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2        |
|   us-east-1        |   arn:aws:lambda:us-east-1:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2        |
|   us-east-2        |   arn:aws:lambda:us-east-2:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2        |
|   us-west-2        |   arn:aws:lambda:us-west-2:663229565520:layer:sumologic-otel-lambda-java-arm64-v1-30-1:2        |

## Sumo Logic OTel Lambda container instrumentation

[Sumo Logic Distribution for OpenTelemetry Lambda Layer version 1.30.1](https://github.com/SumoLogic/sumologic-otel-lambda/tree/release-java-v1.30.1/java) also provides packed [OpenTelemetry Java](https://github.com/open-telemetry/opentelemetry-java) libraries for container-based Lambda functions.

:::note
The instructions below support only [AWS Base Images for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-images.html).
:::

### Container based lambda requirements

Instrumentation of container-based AWS Lambda function requires some changes in the Dockerfile and image rebuild. You'll need the following:

* Docker
* Java 1.8+
* Sumo Logic OTLP/HTTP Source endpoint URL. To send spans from the instrumented Lambda function to Sumo Logic you need an endpoint URL from an existing or new [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp).

### Lambda function image changes

1. Download and extract Sumo Logic Distribution for OpenTelemetry Java Lambda Layer archive with instrumentation packages specific for your architecture, [amd64 (x86_64)](https://github.com/SumoLogic/sumologic-otel-lambda/releases/download/java-v1.30.1/opentelemetry-java-wrapper-amd64.zip) or [arm64](https://github.com/SumoLogic/sumologic-otel-lambda/releases/download/java-v1.30.1/opentelemetry-java-wrapper-arm64.zip).
1. Add extracted instrumentation libraries to the image in the `/opt` directory. See the Dockerfile example:
   ```bash
   FROM public.ecr.aws/lambda/java:11-arm64
   # Lambda Function Code
   COPY lambda-function-.jar /opt/java/lib/
   # Copy OT Instrumentation
   COPY collector-config/ /opt/collector-config/
   COPY extensions/ /opt/extensions/
   COPY java/ /opt/java/
   COPY otel-handler /opt/
   COPY otel-proxy-handler /opt/
   COPY otel-stream-handler /opt/
   CMD ["your.lambda.function.RequestHandler::lambdaHandler"]
   ```
1. Rebuild the Docker image.

### Deployment

1. Navigate to [functions](https://console.aws.amazon.com/lambda/home#/functions) in the AWS Lambda Console and open the function you want to instrument.
2. Deploy new function image.
3. Navigate to the **Configuration > Environment variables** section and set up the following environment variables:
   * `AWS_LAMBDA_EXEC_WRAPPER` environment variable configures the appropriate wrapper for a specific type of lambda handler function. Set the value appropriate for your handler:
     * `/opt/otel-handler`. If implementing `RequestHandler`.
     * `/opt/otel-proxy-handler`. If implementing `RequestHandler`, but proxied through **API Gateway**
     * `/opt/otel-stream-handler`. If implementing `RequestStreamHandler`
   * `OTEL_SERVICE_NAME = YOUR_SERVICE_NAME`. Ensure you define it as a string value that represents the function name and its business logic such as "Check SQS Lambda". This will appear as the tracing service name in Sumo Logic.
   * `OTEL_TRACES_SAMPLER = always_on`. Enables traces sampling.
   * `OTEL_RESOURCE_ATTRIBUTES`. Sets OpenTelemetry resources. Add the `deployment.environment=[environment-name]` tag as needed to allow for filtering by environment on dashboard panels. (For more information, see [Services Dashboard Panels](/docs/apm/traces/services-list-map#services-dashboard-panels)). Tracing `application` and `cloud.account.id` are set with the `OTEL_RESOURCE_ATTRIBUTES` environment variable:
     * `application=YOUR_APPLICATION_NAME`. The string value, if the function is a part of complex system/application then set it for all other functions/applications.
     * `cloud.account.id=YOUR_CLOUD_ACCOUNT_ID`. Set an additional tag that will contain your [AWS Lambda Account ID](https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html). This will help to provide more relevant data. All of the attributes above are comma separated key/value pairs (this is also a way to add additional information to the spans, just after comma add additional key=value pair) such as: `OTEL_RESOURCE_ATTRIBUTES=application=YOUR_APPLICATION_NAME,cloud.account.id=123456789012`.
   * `SUMO_OTLP_HTTP_ENDPOINT_URL` has to be set to send all gathered telemetry data to Sumo Logic. The URL comes from an [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp). You can use an existing Source or create a new one, if needed.
     :::note
     The `SUMOLOGIC_HTTP_TRACES_ENDPOINT_URL` environment variable is deprecated. You'll need to switch from the HTTP Traces Source to [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp) and use the `SUMO_OTLP_HTTP_ENDPOINT_URL` environment variable instead.
     :::
     <img src={useBaseUrl('img/apm/traces/image2.png')} alt="List of AWS Lambda environment variables" />
4. Your function should be successfully instrumented. Invoke the function and find your traces in the [Sumo Logic Tracing screen](/docs/apm/traces/view-and-investigate-traces). The instructions above instrument only requests related to the handler function. To instrument other calls like HTTP calls and DB calls, you'll need to add additional libraries to the Docker image. See [Supported libraries, frameworks and application servers](https://github.com/open-telemetry/opentelemetry-java-instrumentation#supported-libraries-frameworks-and-application-servers).

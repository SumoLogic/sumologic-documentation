---
slug: /apm/traces/get-started-transaction-tracing
title: Getting Started with Transaction Tracing
description: Learn how you can send traces to Sumo Logic.
---

Sumo Logic transaction tracing provides cloud-native transactional intelligence for distributed business workflows, by enriching and analyzing traces, logs, and metrics in real-time with automated generated application topology. All telemetry signals are fully integrated to provide a seamless end-to-end experience during the process of managing and responding to production incidents and to reduce downtime by streamlining root cause analysis.

Sumo Logic tracing supports the OpenTelemetry standard as well as other legacy open standards and libraries for tracing (e.g., OpenTracing, OpenCensus, Jaeger, Zipkin) and leverages open source componentry from the Cloud Native Computing Foundation (CNCF) to collect distributed tracing data.

## Step 1: Set up Traces Collection

* [For AWS environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-aws-environments)
* [For Kubernetes environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments)
* [For other environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments)

Once you've set up collection, [learn how to analyze your traces in Sumo Logic](docs/apm/traces/working-with-tracing-data/view-and-investigate-traces.md).


## Step 2: Instrument Your Application with OpenTelemetry

* [.NET](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/net/index.md)
* [Go](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/go/index.md)
* [JavaScript](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/javascript/index.md)
* [Java](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/java/index.md)
* [Python](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/python.md)
* [Ruby](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/ruby.md)
* [Ruby on Rails](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/ruby-on-rails.md)
* [Istio](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/istio.md)
* AWS Lambda
  * [Java](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/aws-lambda/java.md)
  * [NodeJS](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/aws-lambda/nodejs.md)
  * [Python](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/aws-lambda/python.md)
* Kubernetes environments
  * [Java](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes/)
  * [Python](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes/)
  * [JavaScript](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes/)


## Optional: Advanced Configuration

* [Specify which data to send to Sumo Logic](/docs/apm/traces/Advanced-Configuration/Filter-Shape-Tracing-Data)
* [Working with spans attributes](/docs/apm/traces/Advanced-Configuration/Working-with-Span-attributes)

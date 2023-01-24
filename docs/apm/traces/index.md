---
slug: /apm/traces
title: Traces
sidebar_label: Traces
description: See how your application is behaving with trace analytics. Learn how to work with your Tracing data including dashboards, Service Map, Spans, and queries.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/traces.png')} alt="icon" width="50"/>

Sumo Logic Application Monitoring and Observability provides transactional intelligence for distributed workflows, by combining telemetry from traces, logs, and metrics in the context of real-time automatically tracked application topology.

## Monitoring Apps and Microservices with Sumo Logic Traces

This guide provides information to work with your tracing data, including
the following:

## Step 1: Set up Traces Collection

* [For AWS environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-aws-environments)
* [For Kubernetes environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments)
* [For other environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments)

Once you've set up collection, you can begin to [analyze your traces in Sumo Logic](/docs/apm/traces/view-and-investigate-traces.md).


## Step 2: Instrument Your Application with OpenTelemetry

* [.NET](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/net/index.md)
* [Go](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/go/index.md)
* [JavaScript](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/javascript/index.md)
* [Java](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/java/index.md)
* [Python](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/python)
* [Ruby](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/ruby.md)
* [Ruby on Rails](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/ruby-on-rails.md)
* [Istio](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/istio.md)
* AWS Lambda
  * [Java](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/aws-lambda/java.md)
  * [NodeJS](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/aws-lambda/nodejs.md)
  * [Python](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/aws-lambda/python.md)
* Kubernetes environments
  * [Java](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes/)
  * [Python](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes/)
  * [JavaScript](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes/)


## Optional: Advanced Configuration

* [Specify which data to send to Sumo Logic](/docs/apm/traces/Advanced-Configuration/Filter-Shape-Tracing-Data)
* [Working with spans attributes](/docs/apm/traces/Advanced-Configuration/Working-with-Span-attributes)

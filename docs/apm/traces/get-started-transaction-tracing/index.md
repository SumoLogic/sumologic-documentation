---
slug: /apm/traces/get-started-transaction-tracing
title: Getting Started with Transaction Tracing
sidebar_label: Getting Started with Transaction Tracing
description: Learn how you can send traces to Sumo Logic.
---

:::sumo availability

| Account Type | Account Level |
|--|--|
| Credits | Enterprise Operations and Enterprise Suite<br/>Essentials get up to 5 GB a day |

:::

Sumo Logic transaction tracing provides cloud-native transactional intelligence for distributed business workflows, by enriching and analyzing traces, logs, and metrics in real-time with automated generated application topology. All telemetry signals are fully integrated to provide a seamless end-to-end experience during the process of managing and responding to production incidents and to reduce downtime by streamlining root cause analysis.

Sumo Logic tracing supports the OpenTelemetry standard as well as other legacy open standards and libraries for tracing (e.g., OpenTracing, OpenCensus, Jaeger, Zipkin) and leverages open source componentry from the Cloud Native Computing Foundation (CNCF) to collect distributed tracing data.

Once you have set up trace collection see how to [analyze your traces in Sumo Logic](docs/apm/traces/working-with-tracing-data/view-and-investigate-traces.md).


## Set up Collection

* [Set up traces collection for AWS environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-aws-environments)
* [Set up traces collection for Kubernetes environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments)
* [Set up traces collection for other environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments)
* [What if I don't want to send all the tracing data to Sumo Logic?](/docs/apm/traces/Advanced-Configuration/Filter-Shape-Tracing-Data)
* [Working with spans attributes](/docs/apm/traces/Advanced-Configuration/Working-with-Span-attributes)
* [Instrument your application with OpenTelemetry](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation)

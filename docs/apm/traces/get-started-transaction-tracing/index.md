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

* [Set up traces collection for AWS environments](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/Set_up_traces_collection_for_AWS_environments)
* [Set up traces collection for Kubernetes environments](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/Set_up_traces_collection_for_Kubernetes_environments)
* [Set up traces collection for other environments](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/Set_up_traces_collection_for_other_environments)
* [What if I don't want to send all the tracing data to Sumo Logic?](https://help.sumologic.com/Traces/03Advanced_Configuration/Filter-Shape-Trace-Data)
* [Working with spans attributes](https://help.sumologic.com/Traces/03Advanced_Configuration/Working_with_Span_attributes)


* [Instrument your application with OpenTelemetry](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry)
   * [.NET OpenTelemetry auto-instrumentation](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/.NET_OpenTelemetry_auto-instrumentation)
   * [Go OpenTelemetry auto-instrumentation](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/Go_OpenTelemetry_auto-instrumentation)
   * [JavaScript OpenTelemetry auto-instrumentation](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/JavaScript_OpenTelemetry_auto-instrumentation)
   * [Java OpenTelemetry auto-instrumentation](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/Java_OpenTelemetry_auto-instrumentation)
   * [Python OpenTelemetry auto-instrumentation](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/Python_OpenTelemetry_auto-instrumentation)
   * [Ruby OpenTelemetry auto-instrumentation](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/Ruby_OpenTelemetry_auto-instrumentation)
   * [Ruby on Rails OpenTelemetry auto-instrumentation](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/Ruby_on_Rails_OpenTelemetry_auto-instrumentation)
   * AWS Lambda for [Java](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/AWS_Lambda_-_Java_function_instrumentation_with_Sumo_Logic_tracing), [NodeJS](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/AWS_Lambda_-_NodeJS_function_instrumentation_with_Sumo_Logic_tracing), [Python](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/AWS_Lambda_-_Python_function_instrumentation_with_Sumo_Logic_tracing)
   * [Istio OpenTelemetry auto-instrumentation](https://help.sumologic.com/Traces/01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/Istio_OpenTelemetry_auto-instrumentation)
   * [Java, Python and JavaScript applications in Kubernetes environments [BETA](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes)

---
id: quickstart
title: Traces Quickstart
sidebar_label: Quickstart
description: Get up and running quickly with Sumo Logic Traces and explore how your application is behaving with trace analytics.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

You can observe apps and microservices at the level of individual requests to pinpoint issues with particular microservices. Powered by OpenTelemetry, our tracing capabilities provide an open and flexible standard for the observability of microservice transactions without vendor lock-in.

## Prerequisites

| Account Type | Account Level |
|:--|:--|
| Credits | Enterprise Operations and Enterprise Suite. Essentials get up to 5 GB a day. |

You can access Traces if your Sumo Logic service package has been upgraded to include it.

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). To access Traces, go to the **Home** screen and select **Traces**. 

[**New UI**](/docs/get-started/sumo-logic-ui/). To access Traces, in the main Sumo Logic menu, select **Observability**, and then under **Application Monitoring**, select **Transaction Traces**. You can also click the **Go To...** menu at the top of the screen and select **Transaction Traces**. 

## Micro lesson

:::sumo Micro Lesson

This micro lesson can help you get started with Tracing.

<Iframe url="https://fast.wistia.net/embed/iframe/zcg3x7r420?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Introduction to Tracing Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

Trace data is visualized through filtered trace lists and icicle charts allowing you to find and troubleshoot faulty transactions easily. See how easy it is to [view and investigate traces](view-and-investigate-traces.md).

Traces are collected with [SumoLogic Kubernetes Collection](https://github.com/open-telemetry/opentelemetry-collector) through an [HTTP Traces Source](get-started-transaction-tracing/http-traces-source.md). HTTP Trace Sources are set up automatically with Sumo Logic Kubernetes Collection version 1.1.0+. 

## Next Steps

See [Getting Started with Transaction Tracing](/docs/apm/traces/get-started-transaction-tracing) for details on how to set up your collection environment.

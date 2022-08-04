---
slug: /apm/traces/get-started-transaction-tracing
title: Getting Started with Transaction Tracing
sidebar_label: Getting Started with Transaction Tracing
description: Learn how you can send traces to Sumo Logic.
---

:::sumo availbility

| Account Type | Account Level |
|--|--|
| Credits | Enterprise Operations and Enterprise Suite<br/>Essentials get up to 5 GB a day |

:::

Sumo Logic transaction tracing provides cloud-native transactional intelligence for distributed business workflows, by enriching and analyzing traces, logs, and metrics in real-time with automated generated application topology. All telemetry signals are fully integrated to provide a seamless end-to-end experience during the process of managing and responding to production incidents and to reduce downtime by streamlining root cause analysis.

Sumo Logic tracing supports the OpenTelemetry standard as well as other legacy open standards and libraries for tracing (such as OpenTracing, OpenCensus, Jaeger, Zipkin) and leverages open source componentry from the Cloud Native Computing Foundation (CNCF) to collect distributed tracing data.

Once you have set up trace collection see how to [analyze your traces in Sumo Logic](../working-with-tracing-data/view-and-investigate-traces.md).


import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we will introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>

---
id: diagnose-issues
title: Diagnose with the Observability Solution
sidebar_label: Diagnosing Issues
description: Diagnose service issues with the Sumo Logic Observability Solution.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

After you have identified an issue using the available monitoring tools, the next step is to diagnose the issue and narrow down your investigation to specific services. The Observability Solution offers the following features to diagnose application issues.

## Connect the dots with Entity Inspector

You can use [Entity Inspector](../dashboards/drill-down-to-discover-root-causes.md) to connect the dots between your various data streams of logs, metrics, and traces. Using the guided experience, you can start from an alert and drill down to the root cause quickly.

<img src={useBaseUrl('img/observability/entity-inspector.png')} alt="Entity inspector" style={{border: '1px solid gray'}} width="800" />

## Understand the journey of your transactions using tracing

Observe apps and microservices using [Transaction Tracing](/docs/apm/traces) and detect issues with particular microservices. Using Trace analytics, you can drill down to a specific trace and learn about bottlenecks that will help you narrow down your investigation to specific service or function call that might be causing the issues. Drill down to any specific race to better understand timing relationships, the journey through the application infrastructure, full metadata information, error details, metrics-based infrastructure health info, and more. Finally, drill down to logs or infrastructure KPIs and pinpoint the problem’s root cause with all the important telemetry data at hand.

<img src={useBaseUrl('img/observability/transaction-tracing.png')} alt="Transaction tracing" style={{border: '1px solid gray'}} width="800" />

## Analyze Key Metrics quickly using Metrics Search 

Easily find and visualize your metrics with the [Re-vamped Metrics Search](../metrics/metrics-queries/metrics-explorer.md) that comes with a new structured query builder, and an extended range of visualizations for ad hoc analysis.  Mimicking the Dashboard workflow, you now have the same unified experience in the main metrics tab.

<img src={useBaseUrl('img/observability/metrics-explorer.png')} alt="Metrics explorer" style={{border: '1px solid gray'}} width="800" />

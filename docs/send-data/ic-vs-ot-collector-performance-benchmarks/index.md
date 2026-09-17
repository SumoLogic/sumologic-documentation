---
slug: /send-data/ic-vs-ot-collector-performance-benchmarks
title: Installed Collector vs OpenTelemetry Collector Performance Benchmarks
sidebar_label: IC vs OTel Performance Benchmarks
description: Compare Installed Collector and OpenTelemetry Collector throughput, CPU usage, and scalability to choose the right collector for your workload.
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

The Installed Collector and the Sumo Logic Distribution for OpenTelemetry Collector differ significantly in throughput, CPU usage, and scalability for log collection. Benchmark results depend heavily on the data source being collected, so results are broken out by collection method:

<DocCardList items={useCurrentSidebarCategory().items}/>

## About these benchmarks

As with any benchmark, results depend on hardware, network conditions, and configuration, and will shift as new Collector versions are released. Use these numbers as directional guidance, not a guarantee of performance in your environment.

For OpenTelemetry Collector-only benchmark data, see [Performance Benchmarks](/docs/send-data/opentelemetry-collector/performance-benchmarks/).

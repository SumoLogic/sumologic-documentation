---
id: ic-vs-ot-collector-performance-benchmarks
title: Installed Collector vs OpenTelemetry Collector Performance Benchmarks
sidebar_label: IC vs OTel Performance Benchmarks
description: Compare Installed Collector and OpenTelemetry Collector throughput, CPU usage, and scalability to choose the right collector for your workload.
---

The Installed Collector and the Sumo Logic Distribution for OpenTelemetry Collector differ significantly in throughput, CPU usage, and scalability for log collection. This page compares both across various workloads to help you choose the right option.

As with any benchmark, results depend on hardware, network conditions, and configuration, and will shift as new Collector versions are released. Use these numbers as directional guidance, not a guarantee of performance in your environment.

For general guidance on choosing between Installed Collectors and OpenTelemetry Collectors, including platform, source, and feature differences, see [Choosing a Sumo Logic Collector and Source](/docs/send-data/choose-collector-source/). For OpenTelemetry Collector-only benchmark data, see [Performance Benchmarks](/docs/send-data/opentelemetry-collector/performance-benchmarks/).

## Test environment

Both collectors are benchmarked under the same conditions:

- **Host**. Amazon m4.large instance (2 CPU cores, 8 GB RAM), reflecting a typical customer deployment profile.
- **Storage**. 150 GB, sized to support CPU benchmarking above 90% utilization without disk contention.
- **Log generation**. A synthetic log-generation tool ran alongside each collector, capped at 25% CPU allocation so it wouldn't skew collector-side CPU measurements.
- **Versions tested**. Installed Collector 19.536-4 (Linux) and Sumo Logic Distribution for OpenTelemetry Collector 0.153.0 (Linux, amd64).

## EPS by log message size and CPU usage

### Test conditions

- Each collector ingests logs of a configurable, fixed size, generated at a steadily increasing rate.
- For a given log size, the generation rate was increased every 5 minutes, producing a staircase pattern in logs-per-15-minutes.
- A test run was automatically stopped if process CPU usage exceeded 160%, to avoid destabilizing the host.

### Results

The table below shows the maximum Events Per Second (EPS) each collector sustained at a given average CPU usage, across five message sizes, on an m4.large instance (2 cores). A dash (–) means the collector hit the 160% CPU cutoff before reaching that CPU tier at that message size.

| Average CPU (2 cores) | 100B (IC) | 100B (OT) | 512B (IC) | 512B (OT) | 1KB (IC) | 1KB (OT) | 5KB (IC) | 5KB (OT) | 10KB (IC) | 10KB (OT) |
|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
| 5% | 3100 | 3100 | 500 | 2100 | 500 | 2500 | 100 | 3500 | 50 | 450 |
| 10% | 9100 | 7100 | 2500 | 4300 | 2500 | 3500 | 800 | 6500 | 250 | 650 |
| 20% | 19100 | 12300 | 4500 | 11100 | 4500 | 7500 | 1500 | 10700 | 850 | 1450 |
| 50% | 48100 | – | 12500 | – | 9500 | 19700 | 4300 | 20300 | 2050 | 3750 |
| 90% | – | – | 22500 | – | 20500 | – | 7450 | – | 3850 | – |

### EPS achieved by message size and CPU usage

#### Observations

- In the 512B–5KB range, OpenTelemetry Collectors are markedly more CPU-efficient at 20%–50% CPU usage, sustaining 2–4x the throughput of Installed Collectors at the same CPU level.
- For very small messages (100B), Installed Collectors hold a slight edge at low CPU usage (5%–20%).
- Installed Collectors' efficiency improves with payload size — at 5% CPU, an Installed Collector processing 10KB logs at 100 EPS (1000 KB/sec) is more efficient than processing 1KB logs at 500 EPS (500 KB/sec).

## Performance as a function of number of sources

### Test conditions

- Each collector ingested 1 KB log lines at three fixed rates: 1,000, 5,000, and 10,000 EPS.
- The number of Local File sources was doubled after each 15-minute interval.
- A test run was automatically stopped if process CPU usage exceeded 160%.

### Results: 1,000 EPS

| Number of sources | IC CPU usage (upper bound) | OT CPU usage (upper bound) |
|:--|:--|:--|
| 1 | 4% | 3% |
| 2 | 7% | 5% |
| 4 | 15% | 8% |
| 8 | 30% | 10% |
| 16 | 60% | 12% |
| 32 | 177% | 15% |

At 1,000 EPS, Installed Collectors stay within a safe operating range up to 16 sources. At 32 sources they exceed the 160% cutoff. OpenTelemetry Collectors stay efficient through 32 sources.

### Results: 5,000 EPS

| Number of sources | IC CPU usage (upper bound) | OT CPU usage (upper bound) |
|:--|:--|:--|
| 1 | 20% | 11% |
| 2 | 39% | 21% |
| 4 | 78% | 34% |
| 8 | 173% | 45% |
| 16 | 174% | 55% |
| 32 | 175% | 78% |

At 5,000 EPS, Installed Collectors exceed the safe operating threshold at 8 or more sources. OpenTelemetry Collectors remain stable through 32 sources.

### Results: 10,000 EPS

| Number of sources | IC CPU usage (upper bound) | OT CPU usage (upper bound) |
|:--|:--|:--|
| 1 | 45% | 25% |
| 2 | 88% | 53% |
| 4 | 174% | 83% |
| 8 | 174% | 99% |
| 16 | 174% | 118% |
| 32 | 174% | 142% |

At 10,000 EPS, Installed Collectors exceed the threshold at 4 or more sources. OpenTelemetry Collectors remain within range through 32 sources.

### Key observations

- OpenTelemetry Collectors are significantly more CPU-efficient than Installed Collectors as the number of sources scales, at every EPS level tested.
- Installed Collectors hit the 160% CPU cutoff earlier as throughput increases: at 32 sources (1,000 EPS), 8 sources (5,000 EPS), and 4 sources (10,000 EPS).
- OpenTelemetry Collectors did not exceed the cutoff in any of these tests.
- If you're running Installed Collectors at high EPS, use fewer sources per Collector to avoid resource exhaustion — see [Best Practices: Local and Centralized Data Collection](/docs/send-data/best-practices/#local-and-centralized-data-collection).

## Recommendation

| Evaluation metric | IC | OT |
|:--|:--|:--|
| Small (100B) payloads, low CPU | Marginal lead | Standard |
| Medium (512B–5KB) payloads | Standard | Optimal performance |
| CPU efficiency at scale | Saturates quickly | High efficiency |
| Multi-source support | Restricted | 2–4x the capacity |
| High-EPS workloads | Limited beyond 4 sources | Stable through 32 sources |

For high-throughput, multi-source log ingestion, the OpenTelemetry Collector is the better choice, consistent with our general guidance that OpenTelemetry is the preferred collector for most use cases. The Installed Collector may still be preferable in a narrower set of cases — very small log messages at low CPU utilization, or where you need a source type only available on the Installed Collector, or where you're collecting security data that requires the Installed Collector. See [When to Choose Installed Collector vs. OpenTelemetry Collector](/docs/send-data/choose-collector-source/#when-to-choose-installed-collector-vs-opentelemetry-collector) for the full decision criteria beyond performance alone.
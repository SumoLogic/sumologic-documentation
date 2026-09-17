---
id: remote-windows-event-log-benchmarks
title: Remote Windows Event Log (RWEL) Benchmarks
sidebar_label: Remote Windows Event Log (RWEL) Benchmarks
description: Compare Installed Collector and OpenTelemetry Collector throughput and CPU usage for Remote Windows Event Log collection over WinRM.
---

Remote Windows Event Log (RWEL) collection has a different performance profile than local file sources. Events are delivered to the collector over WinRM (Windows Remote Management), a network protocol with a finite throughput ceiling that exists independent of collector code. Once the event-generation rate exceeds what WinRM can deliver, collector CPU plateaus rather than continuing to climb, producing a ramp-then-plateau curve instead of the linear ramp seen with local file sources. This is an architectural limit of WinRM, not a defect in either collector.

## Recommendation

For Remote Windows Event Log specifically, the OpenTelemetry Collector is the better fit for a low-to-moderate number of hosts or sources, where CPU efficiency and throughput-per-core matter most. The Installed Collector is preferable when monitoring a large number of hosts through a single RWEL source, its WinRM polling amortizes across hosts, limiting per-host CPU growth and giving a more predictable ceiling. Neither collector's 60-host/60-source numbers should be treated as conclusive.

| Evaluation metric	| Installed Collector | OpenTelemetry Collector |
|:--|:--|:--|
| Single host, variable EPS | Plateaus early (~20% CPU) - WinRM-limited | Scales with load. ~2× the EPS per CPU% |
| High EPS (5K-10K), single source | More CPU-efficient | Saturates faster (83-147% at 1-4 sources) |
| Source-count scaling, 1K EPS | Hits ceiling at 16-32 sources | More efficient across all source counts |
| Host-count scaling, 1K EPS/host | Plateaus (~136%) from 16 hosts on | More efficient through 32 hosts |
| 60-host / 60-source scale | No valid data | No valid data |
| CPU predictability | High - WinRM creates a flat ceiling | Variable - scales with load |

## Test environment

- **Host**. A t2.medium instance (2 CPU cores, 4 GB RAM) running Windows Server 2019 as the collector host, with a separate t3.medium Windows instance serving as the remote event source.
- **Log generation**. A synthetic Windows Event Log generator wrote events directly into the Application and System channels on the remote host.
- **Collection path**. Both collectors read the Application and System channels remotely, over WinRM.
- **Versions tested**. Installed Collector 19.536-14 (Windows) and Sumo Logic Distribution for OpenTelemetry Collector 0.155.0 (Windows, amd64). The OpenTelemetry Collector was configured with raw: true, which is required when a provider isn't registered on the host. As is the case with a synthetic test generator.
- **Safety cutoff**. A test run was automatically stopped if process CPU usage exceeded 190%.

:::note
Each collector was tested the way it's actually deployed. The Installed Collector used one source polling all hosts, while the OpenTelemetry Collector used one source per host. So don't compare IC and OT row by row. Compare how each one scales down its own column.
:::

## EPS by message size and CPU usage

### Test conditions

- A single remote host generated events at a fixed message size, starting at 100 EPS and increasing by 500 EPS every 5 minutes.
- Message size was tested at 2 KB and 4 KB.
- One host, one source. No source-count scaling in this test.

### Results

Maximum EPS each collector sustained at a given average CPU usage, on a 2-core host. A dash (–) means the collector hit the 190% cutoff before reaching that CPU tier.

| Average CPU (2 cores)	| 2 KB (IC)	| 2 KB (OT)	| 4 KB (IC)	| 4 KB (OT) |
|:--|:--|:--|:--|:--|
| 5% | 100 | 100 | 100 | 100 |
| 10% | 100 | 600 | 500 | 600 |
| 20% | 600 | 1,180 | 500 | 900 |
| 50% | – | 3,000 | – | 2,100 |
| 90% | – | – | – | – |

### Observations

- At the same CPU level, the OpenTelemetry Collector consistently delivers roughly twice the throughput of the Installed Collector. WinRM session maintenance, polling, and XML deserialization consume a fixed share of the Installed Collector's CPU budget from the start, leaving less headroom for event processing than the OpenTelemetry Collector, whose CPU scales more proportionally with load.
- The Installed Collector's CPU plateaus early and stays flat across the tested rates, a consequence of the WinRM overhead described above, not a sign of it running out of work to do.
- The OpenTelemetry Collector is the better choice at modest, single-host event rates where CPU efficiency matters most. Because the Installed Collector's WinRM-imposed ceiling caps out earlier, it stops scaling before the OpenTelemetry Collector does, whose CPU keeps rising as load increases.

## Performance as a function of number of sources

### Test conditions

- Multiple RWEL/`windows_event_log` sources were configured against the same single remote host.
- Message size was fixed at 1 KB, tested at three fixed rates: 1,000, 5,000, and 10,000 EPS.
- Source count doubled after each 10-minute interval (1 → 2 → 4 → 8 → 16 → 32).
- Each new source started reading from the beginning of the log, which produces a brief CPU spike at each transition as it drains the backlog.

### Results: 1,000 EPS

| Number of sources	| IC CPU (upper bound) | OT CPU (upper bound) |
|:--|:--|:--|
| 1 | 21% | 17% |
| 2 | 48% | 23% |
| 4 | 84% | 52% |
| 8 | 130% | 92% |
| 16 | 162% | 171% |
| 32 | 158% | 169% |

Neither collector shows a clear overall advantage at 1,000 EPS, the crossover from OT being more efficient to IC being more efficient happens around 8-16 sources.

### Results: 5,000 EPS

| Number of sources	| IC CPU (upper bound)	| OT CPU (upper bound) |
|:--|:--|:--|
| 1 | 18% | 83% |
| 2 | 39% | 103% |
| 4 | 86% | 153% |
| 8 | 123% | 99% |
| 16 | 160% | 171% |
| 32 | 163% | 130% |

At 5,000 EPS the Installed Collector is the more CPU-efficient choice at every source count tested. The OpenTelemetry Collector's CPU is substantially higher from a single source onward.

### Results: 10,000 EPS

| Number of sources	| IC CPU (upper bound)	| OT CPU (upper bound) |
|:--|:--|:--|
| 1 | 14% | 72% |
| 2 | 33% | 103% |
| 4 | 59% | 147% |
| 8 | 113% | 163% |
| 16 | 161% | 166% |
| 32 | 153% | 166% |

At 10,000 EPS the OpenTelemetry Collector saturates quickly, exceeding 160% CPU from 8 sources onward, while the Installed Collector stays more efficient up to 16 sources. Both approach the 2-core ceiling by 32 sources.

### Observations

- The two collectors swap CPU efficiency somewhere between 1,000 and 5,000 EPS. The OpenTelemetry Collector is more efficient at low throughput, the Installed Collector becomes more efficient as EPS rises.
- The OpenTelemetry Collector's CPU scales much more steeply with EPS than the Installed Collector's. At higher event rates it uses significantly more CPU even at a single source.
- Both collectors approach the 2-core machine ceiling at high source counts regardless of EPS. That ceiling reflects the test hardware, not collector logic.
- Neither collector exceeded the 190% safety cutoff in any of these runs.

:::note
Source-count-32 results are lower-bound estimates. CPU had not fully stabilized by the end of the measurement window, so actual values at that scale are likely somewhat higher than shown.
:::

## Performance as a function of number of hosts

### Test conditions

- Message size was fixed at 1 KB, ingested at 1,000 EPS per host.
- Host/source count doubled every 10 minutes: 1 → 2 → 4 → 8 → 16 → 32 → 60.

### Results: 1,000 EPS per host

| Number of hosts | IC CPU (upper bound) | OT CPU (upper bound) |
|:--|:--|:--|
| 1 | 17% | 16% |
| 2 | 42% | 30% |
| 4 | 76% | 53% |
| 8 | 93% | 93% |
| 16 | 136% | 85% |
| 32 | 136% | 112% |
| 60 | no valid data | no valid data |

At 1,000 EPS per host, the Installed Collector supports up to about 16 hosts before approaching CPU saturation on the collector host, while the OpenTelemetry Collector remains efficient even at 32 hosts.

### Observations

- At low-to-moderate scale, the OpenTelemetry Collector is more CPU-efficient. Both collectors perform nearly identically at 1 host, but the gap widens through 2-4 hosts before both converge around 8 hosts (~93% CPU each).
- Past 8 hosts, the Installed Collector plateaus (~136% at both 16 and 32 hosts) while the OpenTelemetry Collector's CPU keeps rising, making the Installed Collector more predictable, and the better fit, at high host counts.
- The Installed Collector never reached the 190% safety cutoff in this test, peaking at about 170% at 32 hosts.
- The OpenTelemetry Collector approached the safety cutoff at 32 sources and showed signs of instability before the 60-source step.
- Neither collector produced reliable data at 60 hosts/sources. The Installed Collector's remote hosts failed to fully initialize in time, and the OpenTelemetry Collector's CPU reading was artificially low due to connection failures rather than genuine efficiency. This scale needs to be re-tested with a longer test window and more source-host capacity before any conclusion is published about it.

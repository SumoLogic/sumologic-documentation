---
id: histogram-quantile
title: histogram_quantile Metrics Operator
sidebar_label: histogram_quantile
---


The `histogram_quantile` operator calculates the φ-quantile (0 ≤ φ ≤ 1) from the buckets of a histogram. This operator is specific to the [Prometheus Histogram data type](https://prometheus.io/docs/concepts/metric_types/#histogram) and does not work with non-Prometheus histograms. It is equivalent to the [PromQL histogram_quantile()](https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_quantile)
operator.

## Syntax

```sql
histogram_quantile(quantile)
```

## Examples

```sql
histogram_quantile(.99)
```

```sql
histogram_quantile(.5)
```

The following PromQL query to measure the 99th quantile of the `apiserver_request_latencies` histogram:

```sql
histogram_quantile(0.99, rate(apiserver_request_latencies_bucket{}[5m]))
```

It would be written in Sumo as:

```sql
metric=apiserver_request_latencies_bucket | quantize using max | delta | histogram_quantile(0.99)
```

:::note
You must include the `quantize` and `delta` operators to get the same results as the PromQL query would produce.
:::

---
id: prometheus-metrics-not-accepted-by-sumo
---

# Types of Prometheus Metrics not Accepted by Sumo

By design, Sumo does not ingest Prometheus comments. Sumo also rejects Prometheus metrics that do not conform to the Prometheus metric format. This page lists the conditions that will cause Sumo to reject Prometheus metrics

## Metrics with +Inf, -Inf, or NaN in the metric value

Sumo does not ingest metric expositions in which the metric value contains +Inf, -Inf, or NaN. For example, this line would not be ingested:

```
http_request_duration_seconds_bucket{le="1234"} NaN
```

### Comments

Sumo does not ingest the comment lines uploaded with Prometheus metrics. Comment lines start with a pound sign (#). For example, Sumo would not ingest a line like this:

```
# TYPE go_memstats_buck_hash_sys_bytes gauge
```

## Missing comma in label list

The Prometheus format requires that label key-value pairs be comma-separated. If they aren’t, Sumo will not ingest the metric.   

**Correct:** 

```
go_gc_duration_seconds{quantile="0.5", abc = "def"} 7.7711e-05 1530708470
```

**Incorrect:**

```
go_gc_duration_seconds{quantile="0.5". abc = "def"} 7.7711e-05 1530708470
```

## Missing quotes around label values 

The Prometheus format requires that metric label values be enclosed in quotes. If they aren’t, Sumo will not ingest the metric.   

**Correct:**  

```
go_gc_duration_seconds{abc = “def”} 7.7711e-05 1530708470
```

**Incorrect:**

```
go_gc_duration_seconds{abc = def} 7.7711e-05 1530708470
```

## Missing equals sign in a label key-value pair

The Prometheus format requires that metric label key-value pairs be defined in `key=value` form. If they aren’t, Sumo will not ingest the metric.   

**Correct:**  

```
Go_gc_duration_seconds{quantile = "0.5"} 7.7711e-05 1530708470
```

**Incorrect:**

```
go_gc_duration_seconds{quantile"0.5"} 7.7711e-05 1530708470
```

### Missing label name

The Prometheus format requires that metric labels have a name. If they are not, Sumo will not ingest the metric.   

**Correct:**  

```
go_gc_duration_seconds{quantile="0.56"} 5.809e-05 1530708471
```

**Incorrect:**  

```
go_gc_duration_seconds{="0.56"} 5.809e-05 1530708471
```

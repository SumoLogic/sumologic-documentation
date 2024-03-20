---
id: collecting-metrics
title: Collecting Metrics
sidebar_label: Collecting Metrics
description: This document covers multiple different use cases related to scraping custom application metrics exposed in Prometheus format.
---

This document covers multiple different use cases related to scraping custom application metrics exposed in Prometheus format.

There are three major sections:

- [Scraping metrics](#scraping-metrics). Describes how to send your application metrics to Sumo Logic.
- [Metrics modifications](#metrics-modifications). Describes how to filter metrics and rename both metrics and metric metadata.
- [Kubernetes metrics](#kubernetes-metrics). Describes the metrics we collect from the Kubernetes components.

## Scraping metrics

This section describes how to scrape metrics from your applications. The following scenarios are covered:

- [Application metrics are exposed (one endpoint scenario)](#application-metrics-are-exposed-one-endpoint-scenario)
- [Application metrics are exposed (multiple endpoints scenario)](#application-metrics-are-exposed-multiple-endpoints-scenario)
- [Application metrics are not exposed](#application-metrics-are-not-exposed)

### Application metrics are exposed (one endpoint scenario)

If there is only one endpoint in the Pod you want to scrape metrics from, you can use annotations. Add the following annotations to your Pod definition:

```yaml
# ...
annotations:
  prometheus.io/port: '<port name or number>' # Port which metrics should be scraped from
  prometheus.io/scrape: 'true' # Set if metrics should be scraped from this Pod
  prometheus.io/path: '/metrics' # Path which metrics should be scraped from
```

:::note
If you add more than one annotation with the same name, only the last one will be used.
:::

### Application metrics are exposed (multiple endpoints scenario)

:::note  
Use `sumologic.metrics.additionalServiceMonitors` instead of `kube-prometheus-stack.prometheus.additionalServiceMonitors`. They have identical behavior and can even be used in tandem, but the latter only works if Prometheus is enabled, and won't work with the Otel metrics collector which is the default in v4 of the Chart.
:::

If you want to scrape metrics from multiple endpoints in a single Pod, you need a Service which points to the Pod and also to configure `sumologic.metrics.additionalServiceMonitors` in your `user-values.yaml`:

```yaml
sumologic:
  metrics:
    additionalServiceMonitors:
      - name: <service monitor name>
        endpoints:
          - port: "<port name or number>"
            path: <metrics path>
        namespaceSelector:
          matchNames:
            - <namespace>
        selector:
          matchLabels:
            <identyfing label 1>: <value of indentyfing label 1>
            <label2>: <value of identyfing label 2>
```

:::note
For advanced serviceMonitor configuration, see [Prometheus documentation][prometheus_service_monitors]
:::

[prometheus_service_monitors]: https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/api.md#monitoring.coreos.com/v1.ServiceMonitor

#### Example

Let's consider a Pod that exposes the following metrics:

```sh
my_metric_cpu
my_metric_memory
```

on the following endpoints:

```sh
:3000/metrics
:3001/custom-endpoint
```

The Pod's definition looks like the following:

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: my-custom-app
  name: my-custom-app-56fdc95c9c-r5pvc
  namespace: my-custom-app-namespace
  # ...
spec:
  containers:
    - ports:
        - containerPort: 3000
          protocol: TCP
        - containerPort: 3001
          protocol: TCP
  # ...
```

There is also a Service which exposes Pod ports:

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: my-custom-app-service
  managedFields:
  name: my-custom-app-service
  namespace: my-custom-app-namespace
spec:
  ports:
    - name: "some-port"
      port: 3000
      protocol: TCP
      targetPort: 3000
    - name: "another-port"
      port: 3001
      protocol: TCP
      targetPort: 3001
  selector:
    app: my-custom-app
```

In order to scrape metrics from the above objects, the following configuration should be applied to `user-values.yaml`:

```yaml
sumologic:
  metrics:
    additionalServiceMonitors:
      - name: my-custom-app-service-monitor
        endpoints:
          - port: some-port
            path: /metrics
          - port: another-port
            path: /custom-endpoint
        namespaceSelector:
          matchNames:
            - my-custom-app-namespace
        selector:
          matchLabels:
            app: my-custom-app-service
```

### Application metrics are not exposed

In case you want to scrape metrics from an application which does not expose a Prometheus endpoint, you can use telegraf operator. It will scrape metrics according to configuration and expose them on port `9273` so Prometheus will be able to scrape them.

For example, to expose metrics from nginx Pod, you can use the following annotations:

```yaml
annotations:
  telegraf.influxdata.com/inputs: |+
  [[inputs.nginx]]
  urls = ["http://localhost/nginx_status"]
  telegraf.influxdata.com/class: sumologic-prometheus
  telegraf.influxdata.com/limits-cpu: '750m'
```

`sumologic-prometheus` defines how telegraf operator will expose the metrics. They are going to be exposed in prometheus format on port `9273` and `/metrics` path.

:::note
If you apply annotations on a Pod that's owned by another object, for example DaemonSet, it won't take effect. In such case, the annotation should be added to Pod specification in DaemonSet template.
:::

After restart, the Pod should have an additional `telegraf` container.

To scrape and forward exposed metrics to Sumo Logic, follow one of the following scenarios:

- [Application metrics are exposed (one endpoint scenario)](#application-metrics-are-exposed-one-endpoint-scenario)
- [Application metrics are exposed (multiple endpoints scenario)](#application-metrics-are-exposed-multiple-endpoints-scenario)

## Metrics modifications

This section covers the following metrics modifications:

- [Filtering metrics](#filtering-metrics)
- [Renaming metric](#renaming-metric)
- [Adding or renaming metadata](#adding-or-renaming-metadata)

### Filtering metrics

See [the doc about filtering data](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/filtering.md#metrics).

#### Default attributes

By default, the following attributes should be available:

| Attribute name            | Description                                                |
| :------------------------- | :---------------------------------------------------------- |
| \_collector               | Sumo Logic collector name                                  |
| \_origin                  | Sumo Logic origin metadata ("kubernetes")                  |
| \_sourceCategory          | Sumo Logic source category                                 |
| \_sourceHost              | Sumo Logic source host                                     |
| \_sourceName              | Sumo Logic source Name                                     |
| cluster                   | Cluster Name                                               |
| endpoint                  | Metrics endpoint                                           |
| http_listener_v2_path     | Path used to receive data from Prometheus                  |
| instance                  | Pod instance                                               |
| job                       | Prometheus job name                                        |
| k8s.container.name        | Kubernetes Container name                                  |
| k8s.deployment.name       | Kubernetes Deployment name                                 |
| k8s.namespace.name        | Kubernetes Namespace name                                  |
| k8s.node.name             | Kubernetes Node name                                       |
| k8s.pod.name              | Kubernetes Pod name                                        |
| k8s.pod.pod_name          | Kubernetes Pod name                                        |
| k8s.replicaset.name       | Kubernetes Replicaset name                                 |
| k8s.service.name          | Kubernetes Service name                                    |
| k8s.statefulset.name      | Kubernetes Statefulset name                                |
| pod*labels*\<label_name\> | Kubernetes Pod label. Every label is a different attribute |
| prometheus                | Prometheus                                                 |
| prometheus_replica        | Prometheus Replica name                                    |
| prometheus_service        | Prometheus Service name                                    |

:::note
Before ingestion to Sumo Logic, attributes are renamed according to the [sumologicschemaprocessor documentation][sumologicschema]
:::

[sumologicschema]: https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/processor/sumologicschemaprocessor#attribute-translation

### Renaming metric

To rename metrics, you can use the [transformprocessor]. Look at the following snippet:

```yaml
sumologic:
  metrics:
    otelcol:
      extraProcessors:
        - transform/1:
            metric_statements:
              - context: metric
                statements:
                  ## Renames <old_name> to <new_name>
                  - set(name, "<new_name>") where name == "<old_name>"
```

### Adding or renaming metadata

To add or rename metadata, you can use the [transformprocessor]. Look at the following snippet:

```yaml
sumologic:
  metrics:
    otelcol:
      extraProcessors:
        - transform/1:
            metric_statements:
              - context: resource
                statements:
                  ## adds <new_name> metadata
                  - set(attributes["<new_name>"], attributes["<old_name>"])
                  ## adds <new_static_name> metadata
                  - set(attributes["<new_static_name>"], "<static_value>")
                  ## removes <old_name> metadata
                  - delete_key(attributes, "<old_name>")
```

:::note
See [Default attributes](#default-attributes) for more information about attributes.
:::

[transformprocessor]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor

## Investigation

If you do not see your metrics in Sumo Logic, ensure that you have followed the steps outlined in this document.

## Kubernetes metrics

By default, we collect selected metrics from the following Kubernetes components:

- `Kube API Server` configured with `kube-prometheus-stack.kubeApiServer.serviceMonitor`
- `Kubelet` configured with `kube-prometheus-stack.kubelet.serviceMonitor`
- `Kube Controller Manager` configured with `kube-prometheus-stack.kubeControllerManager.serviceMonitor`
- `CoreDNS` configured with `kube-prometheus-stack.coreDns.serviceMonitor`
- `Kube EtcD` configured with `kube-prometheus-stack.kubeEtcd.serviceMonitor`
- `Kube Scheduler` configured with `kube-prometheus-stack.kubeScheduler.serviceMonitor`
- `Kube State Metrics` configured with `kube-prometheus-stack.kube-state-metrics.prometheus.monitor`
- `Prometheus Node Exporter` configured with `kube-prometheus-stack.prometheus-node-exporter.prometheus.monitor`

---
id: metrics
title: Troubleshooting Kubernetes Metrics Collection
description: Troubleshoot issues that affect the collection, scraping, or ingestion of Kubernetes metrics into Sumo Logic.
---

Here's how to troubleshoot issues that can affect the collection, scraping, or ingestion of Kubernetes metrics into Sumo Logic.

## Check the `/metrics` endpoint

You can `port-forward` to a pod exposing the `/metrics` endpoint and verify it is exposing Prometheus metrics:

```sh
kubectl port-forward collection-sumologic-xxxxxxxxx-xxxxx 8080:24231
```

Then, in your browser, go to `http://localhost:8080/metrics`. You should see Prometheus metrics exposed.

## Check the `/metrics` endpoint for Kubernetes services

For Kubernetes services, you can use the following way:

1. Create `sumologic-debug` pod.
   ```yml
   cat << EOF | kubectl apply -f -
   apiVersion: v1
   kind: Pod
   metadata:
     name: sumologic-debug
     namespace: <namespace you want to create pod in (e.g. sumologic)>
   spec:
     containers:
     - args:
       - receiver-mock
       image: sumologic/kubernetes-tools:2.9.0
       imagePullPolicy: IfNotPresent
       name: debug
     serviceAccountName: <service account name used by prometheus (e.g. collection-kube-prometheus-prometheus)>
   EOF
   ```
2. Go into the container:
   ```bash
   kubectl exec -it sumologic-debug -n <namespace> bash
   ```
3. Talk with API directly like prometheus does, for example:
   ```bash
   curl https://10.0.2.15:10250/metrics/cadvisor --insecure --cacert /var/run/secrets kubernetes.io/serviceaccount/ca.crt -H "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)"
   ```

## Check the Prometheus UI

To check the Prometheus UI, first run the following command to expose the UI:

```sh
$ kubectl -n "${NAMESPACE}" get pod -l app.kubernetes.io/name=prometheus
NAME                                                 READY   STATUS    RESTARTS   AGE
prometheus-collection-kube-prometheus-prometheus-0   2/2     Running   0          13m
$ kubectl -n "${NAMESPACE}" port-forward prometheus-collection-kube-prometheus-prometheus-0 8080:9090
Forwarding from 127.0.0.1:8080 -> 9090
Forwarding from [::1]:8080 -> 9090
```

Then, in your browser, go to `localhost:8080`. You should be in the Prometheus UI now.

From here you can start typing the expected name of a metric to see if Prometheus auto-completes the entry.

If you cannot find the expected metrics, ensure that prometheus configuration is correct and up to date. In the top menu, navigate to section `Status > Configuration` or go to the `http://localhost:8080/config`. Review the configuration.

Next, you can check if Prometheus is successfully scraping the `/metrics` endpoints. In the top menu, navigate to section `Status > Targets` or go to the `http://localhost:8080/targets`. Check if any targets are down or have errors.

## Check Scrape Configs for OpenTelemetry Operator

First expose the target allocator on local port 9090:

```sh
kubectl port-forward -n sumologic services/collection-sumologic-metrics-targetallocator 9090:80
```

Check if expected Service Monitor is on the list:

```sh
> curl http://localhost:9090/scrape_configs -s | jq '. | keys'
[
  "cadvisor",
  "kubelet",
  "pod-annotations",
  "serviceMonitor/sumologic/avalanche/0",
  "serviceMonitor/sumologic/collection-kube-prometheus-apiserver/0",
  "serviceMonitor/sumologic/collection-kube-prometheus-coredns/0",
  "serviceMonitor/sumologic/collection-kube-prometheus-kube-controller-manager/0",
  "serviceMonitor/sumologic/collection-kube-prometheus-kube-etcd/0",
  "serviceMonitor/sumologic/collection-kube-prometheus-kube-proxy/0",
  "serviceMonitor/sumologic/collection-kube-prometheus-kube-scheduler/0",
  "serviceMonitor/sumologic/collection-kube-prometheus-kubelet/0",
  "serviceMonitor/sumologic/collection-kube-prometheus-kubelet/1",
  "serviceMonitor/sumologic/collection-kube-state-metrics/0",
  "serviceMonitor/sumologic/collection-prometheus-node-exporter/0",
  "serviceMonitor/sumologic/collection-sumologic-metrics-collector/0",
  "serviceMonitor/sumologic/collection-sumologic-otelcol-events/0",
  "serviceMonitor/sumologic/collection-sumologic-otelcol-logs-collector/0",
  "serviceMonitor/sumologic/collection-sumologic-otelcol-logs/0",
  "serviceMonitor/sumologic/collection-sumologic-otelcol-metrics/0",
  "serviceMonitor/sumologic/collection-sumologic-otelcol-traces/0",
  "serviceMonitor/sumologic/collection-sumologic-prometheus/0",
  "serviceMonitor/sumologic/receiver-mock/0"
]
```

Now, you can list all target associated with this Service Monitor. Built URL using the following template: `http://localhost:9090/jobs/<HTML encoded service monitor name>/targets`.

Let's assume that you are looking for `serviceMonitor/sumologic/receiver-mock/0`. In that case, you need to check the following endpoint:
`http://localhost:9090/jobs/serviceMonitor%2Fsumologic%2Fcollection-sumologic-otelcol-logs%2F0/targets`

```sh
> curl -s 'http://localhost:9090/jobs/serviceMonitor%2Fsumologic%2Fcollection-sumologic-otelcol-logs%2F0/targets' | jq '.[].targets[].labels |.__meta_kubernetes_namespace + "/" + .__meta_kubernetes_pod_name'
"sumologic/collection-sumologic-otelcol-logs-2"
"sumologic/collection-sumologic-otelcol-logs-1"
"sumologic/collection-sumologic-otelcol-logs-0"
```

If all information are correct, refer to the following sections to continue investigation:

- [Check the `/metrics` endpoint](#check-the-metrics-endpoint)
- [Check the `/metrics` endpoint for Kubernetes services](#check-the-metrics-endpoint-for-kubernetes-services)

## Print metrics on stdout for OTLP source

Apply the following configuration to print metrics and their labels on stdout:

```yaml
otellogs:
  config:
    merge:
      receivers:
        filelog/containers:
          exclude:
            - /var/log/pods/*sumologic-otelcol-metrics*/*/*.log
metadata:
  metrics:
    config:
      merge:
        exporters:
          debug:
            verbosity: detailed
        service:
          pipelines:
            metrics:
              exporters:
                - sumologic/default
                - debug
```

This configuration ensures that all metrics are printed to stdout and they are not collected by logs collector to keep your ingest low.

:::note
This configuration is prepared for OTLP source, as it doesn't use routing processor and multiple exporters in the pipeline.
:::

## Check Prometheus Remote Storage

We rely on the Prometheus [Remote Storage](https://prometheus.io/docs/prometheus/latest/storage/) integration to send metrics from Prometheus to the metadata enrichment service.

You [check Prometheus logs](/docs/send-data/kubernetes/troubleshoot-collection/logs#prometheus-logs) to verify there are no errors during remote write.

You can also check `prometheus_remote_storage_.*` metrics to look for success/failure attempts.

## Missing metrics for ArgoCD installation

There is known issue with Argo CD and metrics collection. If you override `spec.source.helm.releaseName` in the `Application` or `ApplicationSet`, which are used to configure your application in Argo CD, then Kube State and Node metrics are not collected due to the following:

Service Monitor is looking for service labeled with `app.kubernetes.io/instance: <spec.source.helm.releaseName>`, but the label is actually `app.kubernetes.io/instance: <metadata.name>`.

In order to fix it, you need to ensure that the labels are matching and you can do it by adding the following to `user-values.yaml`:

```yaml
kube-prometheus-stack:
  kube-state-metrics:
    prometheus:
      monitor:
        selectorOverride:
          app.kubernetes.io/instance: <metadata.name>
          app.kubernetes.io/name: kube-state-metrics
  prometheus-node-exporter:
    prometheus:
      monitor:
        selectorOverride:
          app.kubernetes.io/name: prometheus-node-exporter
```

where `metadata.name` is the value from Argo Application manifest.

## Missing metrics in dashboards

Dashboards can miss many metrics from the cluster and pod level. This can occur because the `kube-state-metrics` are not scraped. For example, the `prometheus-kube-state-metrics` ServiceMonitor resource does not have the label `release: prometheus`.

With the `prometheus` label added manually, the dashboards populate correctly and all data is pulled:

```yaml
serviceMonitorSelector:
      matchLabels:
        monitoring: prometheus

kube-state-metrics:
  prometheus:
    monitor:
      enabled: true
      additionalLabels:
        monitoring: prometheus
```

The `release:` label value must match the release name of the `kube-prometheus-stack` Helm deployment. The default should be `release: kube-prometheus-stack`.

To get the release name:

```text
pod="$(kubectl get po -n monitoring | awk '/kube-state-metrics/{ print $1 }')"
kubectl get po -n monitoring "${pod}" -o yaml | grep release
```

Results:

```yaml
kube-state-metrics:
  prometheus:
    monitor:
      enabled: true
      additionalLabels:
        release: kube-prometheus-stack
```

## Check metrics content

You can print metrics on stdout of metrics collector and metrics metadata, and validate if they are correct. It may happen that metrics are ingested, but with different metadata than you expect.

In order to print them on stdout, two steps are required:

1. Disable ingesting logs from metrics related pods. This is required to prevent logs ingest spike. Add the following configuration to `user-values.yaml`:

   ```yaml
   debug:
     metrics:
       metadata:
         stopLogsIngestion: true
       collector:
         stopLogsIngestion: true
   ```

   Then update your collection and wait for all log collector pods to be redeployed.

2. Enable printing metrics on stdout for metrics related pods, by adding the following to `user-values.yaml`:

   ```yaml
   debug:
     metrics:
       metadata:
         print: true
         stopLogsIngestion: true
       collector:
         print: true
         stopLogsIngestion: true
   ```

3. To revert your changes, perform first step as-is, then after configuration has been propagated to all pods, you can remove all configuration added in this section from the `user-values.yaml`.

:::note
It's important to perform the first step exactly as-is, especially waiting for all log collector pods to apply the new configuration. We want to avoid a situation in which logs collector pods are picking up debugging logs and sending them to Sumo Logic, as it may increase your costs.
:::

## View metrics being sent to Sumo Logic

You can use Sumo Logic Mock to see what data has been send to Sumo Logic.

In order to do that, add the following to your `user-values.yaml`:
```yaml
debug:
  sumologicMock:
    enabled: true
    deployment:
      extraArgs:
        - --print-metrics  # print received metrics on stdout  
        - --print-headers  # print headers on stdout
  metrics:
    metadata:
      # enable metrics forwarding
      forwardToSumologicMock: true
```

Then, look at the Sumo Logic Mock logs:

```shell
> kubectl logs -l sumologic.com/app=sumologic-mock -f
2024-02-13T09:06:54.577Z DEBUG [sumologic_mock::router] --> GET /metrics HTTP/1.1--> host: 10.1.126.167:3000--> user-agent: kube-probe/1.23+--> connection: close--> accept: */*

2024-02-13T09:06:55.816Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/metrics HTTP/1.1--> content-encoding: gzip--> host: collection-sumologic-mock.sumologic:3000--> user-agent: Go-http-client/1.1--> content-type: application/x-protobuf--> accept-encoding: gzip--> content-length: 1107--> x-sumo-client: k8s_4.4.0-23-g067275958d

2024-02-13T09:06:55.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_exporter_queue_capacity", value: 1000.0, labels: {"cluster": "kubernetes", "pod": "collection-sumologic-traces-sampler-5788c687c8-thwll", "node": "sumologic-kubernetes-collection", "job": "collection-sumologic-traces-sampler-headless", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "service_instance_id": "e09dbbcb-47e0-4f86-899e-e298dc4bcb99", "deployment": "collection-sumologic-traces-sampler", "pod_labels_heritage": "Helm", "pod_labels_app": "collection-sumologic-traces-sampler", "_collector": "kubernetes", "container": "otelcol", "service_version": "v0.92.0-sumo-0", "service_name": "otelcol-sumo", "replicaset": "collection-sumologic-traces-sampler-5788c687c8", "pod_labels_release": "collection", "endpoint": "metrics", "prometheus_service": "collection-sumologic-traces-sampler-headless", "service": "collection-sumologic-traces-sampler-headless", "pod_labels_pod-template-hash": "5788c687c8", "exporter": "otlphttp", "namespace": "sumologic", "_origin": "kubernetes"}, timestamp: 1707815214712 }
2024-02-13T09:06:55.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_exporter_queue_size", value: 0.0, labels: {"pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "_origin": "kubernetes", "pod_labels_pod-template-hash": "5788c687c8", "pod": "collection-sumologic-traces-sampler-5788c687c8-thwll", "service_name": "otelcol-sumo", "replicaset": "collection-sumologic-traces-sampler-5788c687c8", "container": "otelcol", "job": "collection-sumologic-traces-sampler-headless", "_collector": "kubernetes", "service_version": "v0.92.0-sumo-0", "cluster": "kubernetes", "pod_labels_heritage": "Helm", "pod_labels_release": "collection", "pod_labels_app": "collection-sumologic-traces-sampler", "service": "collection-sumologic-traces-sampler-headless", "service_instance_id": "e09dbbcb-47e0-4f86-899e-e298dc4bcb99", "deployment": "collection-sumologic-traces-sampler", "prometheus_service": "collection-sumologic-traces-sampler-headless", "endpoint": "metrics", "namespace": "sumologic", "exporter": "otlphttp", "node": "sumologic-kubernetes-collection"}, timestamp: 1707815214712 }
2024-02-13T09:06:55.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_process_runtime_heap_alloc_bytes", value: 756309472.0, labels: {"prometheus_service": "collection-sumologic-traces-sampler-headless", "job": "collection-sumologic-traces-sampler-headless", "_origin": "kubernetes", "pod_labels_release": "collection", "pod_labels_app": "collection-sumologic-traces-sampler", "service_name": "otelcol-sumo", "namespace": "sumologic", "node": "sumologic-kubernetes-collection", "deployment": "collection-sumologic-traces-sampler", "pod_labels_heritage": "Helm", "_collector": "kubernetes", "service_version": "v0.92.0-sumo-0", "pod": "collection-sumologic-traces-sampler-5788c687c8-thwll", "replicaset": "collection-sumologic-traces-sampler-5788c687c8", "container": "otelcol", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "pod_labels_pod-template-hash": "5788c687c8", "endpoint": "metrics", "service": "collection-sumologic-traces-sampler-headless", "cluster": "kubernetes", "service_instance_id": "e09dbbcb-47e0-4f86-899e-e298dc4bcb99"}, timestamp: 1707815214712 }
2024-02-13T09:06:55.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_process_runtime_total_alloc_bytes", value: 771413904.0, labels: {"service_instance_id": "e09dbbcb-47e0-4f86-899e-e298dc4bcb99", "service_name": "otelcol-sumo", "prometheus_service": "collection-sumologic-traces-sampler-headless", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "namespace": "sumologic", "job": "collection-sumologic-traces-sampler-headless", "container": "otelcol", "_origin": "kubernetes", "pod_labels_app": "collection-sumologic-traces-sampler", "_collector": "kubernetes", "service": "collection-sumologic-traces-sampler-headless", "pod": "collection-sumologic-traces-sampler-5788c687c8-thwll", "cluster": "kubernetes", "endpoint": "metrics", "pod_labels_heritage": "Helm", "pod_labels_release": "collection", "replicaset": "collection-sumologic-traces-sampler-5788c687c8", "deployment": "collection-sumologic-traces-sampler", "pod_labels_pod-template-hash": "5788c687c8", "service_version": "v0.92.0-sumo-0", "node": "sumologic-kubernetes-collection"}, timestamp: 1707815214712 }
2024-02-13T09:06:55.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_process_runtime_total_sys_memory_bytes", value: 787995064.0, labels: {"pod": "collection-sumologic-traces-sampler-5788c687c8-thwll", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "node": "sumologic-kubernetes-collection", "pod_labels_release": "collection", "prometheus_service": "collection-sumologic-traces-sampler-headless", "job": "collection-sumologic-traces-sampler-headless", "namespace": "sumologic", "_collector": "kubernetes", "replicaset": "collection-sumologic-traces-sampler-5788c687c8", "pod_labels_heritage": "Helm", "endpoint": "metrics", "service_version": "v0.92.0-sumo-0", "pod_labels_pod-template-hash": "5788c687c8", "cluster": "kubernetes", "service_name": "otelcol-sumo", "service_instance_id": "e09dbbcb-47e0-4f86-899e-e298dc4bcb99", "service": "collection-sumologic-traces-sampler-headless", "container": "otelcol", "_origin": "kubernetes", "pod_labels_app": "collection-sumologic-traces-sampler", "deployment": "collection-sumologic-traces-sampler"}, timestamp: 1707815214712 }
2024-02-13T09:06:55.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "up", value: 1.0, labels: {"pod_labels_app": "collection-sumologic-traces-sampler", "prometheus_service": "collection-sumologic-traces-sampler-headless", "service_instance_id": "e09dbbcb-47e0-4f86-899e-e298dc4bcb99", "namespace": "sumologic", "_origin": "kubernetes", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "pod_labels_heritage": "Helm", "pod_labels_pod-template-hash": "5788c687c8", "service_version": "v0.92.0-sumo-0", "pod": "collection-sumologic-traces-sampler-5788c687c8-thwll", "node": "sumologic-kubernetes-collection", "pod_labels_release": "collection", "service": "collection-sumologic-traces-sampler-headless", "replicaset": "collection-sumologic-traces-sampler-5788c687c8", "job": "collection-sumologic-traces-sampler-headless", "endpoint": "metrics", "container": "otelcol", "service_name": "otelcol-sumo", "cluster": "kubernetes", "deployment": "collection-sumologic-traces-sampler", "_collector": "kubernetes"}, timestamp: 1707815214712 }
2024-02-13T09:06:55.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_process_uptime", value: 676.894321119, labels: {"service": "collection-sumologic-traces-sampler-headless", "pod_labels_heritage": "Helm", "replicaset": "collection-sumologic-traces-sampler-5788c687c8", "cluster": "kubernetes", "container": "otelcol", "prometheus_service": "collection-sumologic-traces-sampler-headless", "service_instance_id": "e09dbbcb-47e0-4f86-899e-e298dc4bcb99", "job": "collection-sumologic-traces-sampler-headless", "pod": "collection-sumologic-traces-sampler-5788c687c8-thwll", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "pod_labels_app": "collection-sumologic-traces-sampler", "endpoint": "metrics", "deployment": "collection-sumologic-traces-sampler", "pod_labels_pod-template-hash": "5788c687c8", "_collector": "kubernetes", "service_name": "otelcol-sumo", "_origin": "kubernetes", "pod_labels_release": "collection", "service_version": "v0.92.0-sumo-0", "namespace": "sumologic", "node": "sumologic-kubernetes-collection"}, timestamp: 1707815214712 }
2024-02-13T09:06:55.818Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_processor_batch_metadata_cardinality", value: 1.0, labels: {"pod_labels_app": "collection-sumologic-traces-sampler", "replicaset": "collection-sumologic-traces-sampler-5788c687c8", "namespace": "sumologic", "cluster": "kubernetes", "pod": "collection-sumologic-traces-sampler-5788c687c8-thwll", "pod_labels_heritage": "Helm", "_origin": "kubernetes", "_collector": "kubernetes", "prometheus_service": "collection-sumologic-traces-sampler-headless", "node": "sumologic-kubernetes-collection", "service_instance_id": "e09dbbcb-47e0-4f86-899e-e298dc4bcb99", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "container": "otelcol", "job": "collection-sumologic-traces-sampler-headless", "service_version": "v0.92.0-sumo-0", "deployment": "collection-sumologic-traces-sampler", "service_name": "otelcol-sumo", "endpoint": "metrics", "service": "collection-sumologic-traces-sampler-headless", "pod_labels_pod-template-hash": "5788c687c8", "pod_labels_release": "collection"}, timestamp: 1707815214712 }
2024-02-13T09:06:55.818Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_process_cpu_seconds", value: 0.9, labels: {"node": "sumologic-kubernetes-collection", "deployment": "collection-sumologic-traces-sampler", "pod_labels_app": "collection-sumologic-traces-sampler", "_collector": "kubernetes", "_origin": "kubernetes", "service_instance_id": "e09dbbcb-47e0-4f86-899e-e298dc4bcb99", "cluster": "kubernetes", "pod_labels_release": "collection", "pod_labels_pod-template-hash": "5788c687c8", "service_name": "otelcol-sumo", "prometheus_service": "collection-sumologic-traces-sampler-headless", "endpoint": "metrics", "job": "collection-sumologic-traces-sampler-headless", "pod": "collection-sumologic-traces-sampler-5788c687c8-thwll", "service": "collection-sumologic-traces-sampler-headless", "service_version": "v0.92.0-sumo-0", "replicaset": "collection-sumologic-traces-sampler-5788c687c8", "pod_labels_heritage": "Helm", "namespace": "sumologic", "container": "otelcol", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d"}, timestamp: 1707815214712 }
2024-02-13T09:06:55.818Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_process_memory_rss", value: 147492864.0, labels: {"pod": "collection-sumologic-traces-sampler-5788c687c8-thwll", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "service": "collection-sumologic-traces-sampler-headless", "pod_labels_pod-template-hash": "5788c687c8", "replicaset": "collection-sumologic-traces-sampler-5788c687c8", "cluster": "kubernetes", "_origin": "kubernetes", "service_version": "v0.92.0-sumo-0", "deployment": "collection-sumologic-traces-sampler", "pod_labels_heritage": "Helm", "node": "sumologic-kubernetes-collection", "pod_labels_app": "collection-sumologic-traces-sampler", "_collector": "kubernetes", "service_instance_id": "e09dbbcb-47e0-4f86-899e-e298dc4bcb99", "service_name": "otelcol-sumo", "prometheus_service": "collection-sumologic-traces-sampler-headless", "job": "collection-sumologic-traces-sampler-headless", "endpoint": "metrics", "namespace": "sumologic", "pod_labels_release": "collection", "container": "otelcol"}, timestamp: 1707815214712 }
2024-02-13T09:06:56.816Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/metrics HTTP/1.1--> accept-encoding: gzip--> content-length: 3209--> host: collection-sumologic-mock.sumologic:3000--> user-agent: Go-http-client/1.1--> x-sumo-client: k8s_4.4.0-23-g067275958d--> content-encoding: gzip--> content-type: application/x-protobuf

2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_exporter_queue_size", value: 0.0, labels: {"exporter": "sumologic", "statefulset": "collection-sumologic-otelcol-logs", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "cluster": "kubernetes", "pod_labels_heritage": "Helm", "_collector": "kubernetes", "job": "collection-sumologic-metadata-logs", "_origin": "kubernetes", "pod_labels_release": "collection", "endpoint": "otelcol-metrics", "node": "sumologic-kubernetes-collection", "service_version": "v0.92.0-sumo-0", "namespace": "sumologic", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "pod": "collection-sumologic-otelcol-logs-0", "service_name": "otelcol-sumo", "prometheus_service": "collection-sumologic-metadata-logs", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "container": "otelcol", "pod_labels_app": "collection-sumologic-otelcol-logs"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_exporter_requests_records", value: 19.0, labels: {"pod_labels_app": "collection-sumologic-otelcol-logs", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "pipeline": "logs", "_collector": "kubernetes", "exporter": "sumologic", "statefulset": "collection-sumologic-otelcol-logs", "_origin": "kubernetes", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "prometheus_service": "collection-sumologic-metadata-logs", "endpoint": "otelcol-metrics", "status_code": "200", "container": "otelcol", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "pod_labels_heritage": "Helm", "cluster": "kubernetes", "service_version": "v0.92.0-sumo-0", "job": "collection-sumologic-metadata-logs", "exported_endpoint": "https://collectors.sumologic.com/receiver/v1/otlp/ZaVnC4dhaV1G3fKi4RlKyO3Jr3J_nyx1O2Z2QovkcXrzueaasBjb9PDJIBG-9D6qfPgmu8_8327GeYSDhzM69yzZJxZo3he3vnqtp4XL1GQhEGPICw9l4A==/v1/logs", "service_name": "otelcol-sumo", "pod": "collection-sumologic-otelcol-logs-0", "node": "sumologic-kubernetes-collection", "namespace": "sumologic", "pod_labels_release": "collection", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_otelsvc_k8s_pod_added", value: 35.0, labels: {"container": "otelcol", "pod_labels_heritage": "Helm", "_collector": "kubernetes", "pod_labels_release": "collection", "_origin": "kubernetes", "node": "sumologic-kubernetes-collection", "service_name": "otelcol-sumo", "pod": "collection-sumologic-otelcol-logs-0", "statefulset": "collection-sumologic-otelcol-logs", "job": "collection-sumologic-metadata-logs", "namespace": "sumologic", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "pod_labels_app": "collection-sumologic-otelcol-logs", "cluster": "kubernetes", "endpoint": "otelcol-metrics", "prometheus_service": "collection-sumologic-metadata-logs", "service_version": "v0.92.0-sumo-0", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_process_cpu_seconds", value: 0.51, labels: {"pod": "collection-sumologic-otelcol-logs-0", "pod_labels_release": "collection", "cluster": "kubernetes", "endpoint": "otelcol-metrics", "container": "otelcol", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "node": "sumologic-kubernetes-collection", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "namespace": "sumologic", "service_version": "v0.92.0-sumo-0", "service_name": "otelcol-sumo", "prometheus_service": "collection-sumologic-metadata-logs", "pod_labels_app": "collection-sumologic-otelcol-logs", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "pod_labels_heritage": "Helm", "statefulset": "collection-sumologic-otelcol-logs", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "_collector": "kubernetes", "_origin": "kubernetes", "job": "collection-sumologic-metadata-logs"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_processor_filter_logs_filtered", value: 0.0, labels: {"_origin": "kubernetes", "node": "sumologic-kubernetes-collection", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "namespace": "sumologic", "pod_labels_release": "collection", "pod": "collection-sumologic-otelcol-logs-0", "_collector": "kubernetes", "container": "otelcol", "filter": "filter/include_containers", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "statefulset": "collection-sumologic-otelcol-logs", "job": "collection-sumologic-metadata-logs", "pod_labels_app": "collection-sumologic-otelcol-logs", "pod_labels_heritage": "Helm", "service_version": "v0.92.0-sumo-0", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "prometheus_service": "collection-sumologic-metadata-logs", "endpoint": "otelcol-metrics", "cluster": "kubernetes", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "service_name": "otelcol-sumo"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_processor_filter_logs_filtered", value: 38.0, labels: {"job": "collection-sumologic-metadata-logs", "pod_labels_heritage": "Helm", "_origin": "kubernetes", "prometheus_service": "collection-sumologic-metadata-logs", "namespace": "sumologic", "pod": "collection-sumologic-otelcol-logs-0", "_collector": "kubernetes", "statefulset": "collection-sumologic-otelcol-logs", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "filter": "filter/include_fluent_tag_host", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "pod_labels_release": "collection", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "container": "otelcol", "service_version": "v0.92.0-sumo-0", "endpoint": "otelcol-metrics", "pod_labels_app": "collection-sumologic-otelcol-logs", "service_name": "otelcol-sumo", "cluster": "kubernetes", "node": "sumologic-kubernetes-collection"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "up", value: 1.0, labels: {"namespace": "sumologic", "service_name": "otelcol-sumo", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "container": "otelcol", "pod_labels_heritage": "Helm", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "service_version": "v0.92.0-sumo-0", "_collector": "kubernetes", "prometheus_service": "collection-sumologic-metadata-logs", "_origin": "kubernetes", "job": "collection-sumologic-metadata-logs", "cluster": "kubernetes", "node": "sumologic-kubernetes-collection", "endpoint": "otelcol-metrics", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "pod": "collection-sumologic-otelcol-logs-0", "pod_labels_app": "collection-sumologic-otelcol-logs", "pod_labels_release": "collection", "statefulset": "collection-sumologic-otelcol-logs"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_exporter_requests_sent", value: 9.0, labels: {"_origin": "kubernetes", "endpoint": "otelcol-metrics", "pod_labels_release": "collection", "cluster": "kubernetes", "container": "otelcol", "job": "collection-sumologic-metadata-logs", "statefulset": "collection-sumologic-otelcol-logs", "_collector": "kubernetes", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "service_name": "otelcol-sumo", "namespace": "sumologic", "pod_labels_heritage": "Helm", "pod_labels_app": "collection-sumologic-otelcol-logs", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "prometheus_service": "collection-sumologic-metadata-logs", "exported_endpoint": "https://collectors.sumologic.com/receiver/v1/otlp/ZaVnC4dhaV1G3fKi4RlKyO3Jr3J_nyx1O2Z2QovkcXrzueaasBjb9PDJIBG-9D6qfPgmu8_8327GeYSDhzM69yzZJxZo3he3vnqtp4XL1GQhEGPICw9l4A==/v1/logs", "node": "sumologic-kubernetes-collection", "pipeline": "logs", "service_version": "v0.92.0-sumo-0", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "status_code": "200", "exporter": "sumologic", "pod": "collection-sumologic-otelcol-logs-0", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_http_server_response_content_length", value: 18.0, labels: {"job": "collection-sumologic-metadata-logs", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "net_host_name": "collection-sumologic-metadata-logs.sumologic.svc.cluster.local.", "endpoint": "otelcol-metrics", "namespace": "sumologic", "_origin": "kubernetes", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "pod_labels_app": "collection-sumologic-otelcol-logs", "node": "sumologic-kubernetes-collection", "cluster": "kubernetes", "statefulset": "collection-sumologic-otelcol-logs", "_collector": "kubernetes", "net_host_port": "4318", "prometheus_service": "collection-sumologic-metadata-logs", "service_name": "otelcol-sumo", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "http_status_code": "200", "http_flavor": "1.1", "container": "otelcol", "http_method": "POST", "pod": "collection-sumologic-otelcol-logs-0", "pod_labels_heritage": "Helm", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "http_scheme": "http", "pod_labels_release": "collection", "service_version": "v0.92.0-sumo-0"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_processor_batch_timeout_trigger_send", value: 9.0, labels: {"processor": "batch", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "pod_labels_heritage": "Helm", "container": "otelcol", "pod": "collection-sumologic-otelcol-logs-0", "pod_labels_release": "collection", "namespace": "sumologic", "node": "sumologic-kubernetes-collection", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "endpoint": "otelcol-metrics", "cluster": "kubernetes", "statefulset": "collection-sumologic-otelcol-logs", "_collector": "kubernetes", "prometheus_service": "collection-sumologic-metadata-logs", "service_name": "otelcol-sumo", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "job": "collection-sumologic-metadata-logs", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "pod_labels_app": "collection-sumologic-otelcol-logs", "service_version": "v0.92.0-sumo-0", "_origin": "kubernetes"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_receiver_accepted_log_records", value: 19.0, labels: {"pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "_origin": "kubernetes", "prometheus_service": "collection-sumologic-metadata-logs", "service_version": "v0.92.0-sumo-0", "container": "otelcol", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "pod_labels_release": "collection", "statefulset": "collection-sumologic-otelcol-logs", "node": "sumologic-kubernetes-collection", "service_name": "otelcol-sumo", "receiver": "otlp", "cluster": "kubernetes", "transport": "http", "pod": "collection-sumologic-otelcol-logs-0", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "job": "collection-sumologic-metadata-logs", "namespace": "sumologic", "pod_labels_heritage": "Helm", "pod_labels_app": "collection-sumologic-otelcol-logs", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "_collector": "kubernetes", "endpoint": "otelcol-metrics"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_exporter_requests_duration", value: 2217.0, labels: {"pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "status_code": "200", "service_name": "otelcol-sumo", "service_version": "v0.92.0-sumo-0", "pod": "collection-sumologic-otelcol-logs-0", "_origin": "kubernetes", "statefulset": "collection-sumologic-otelcol-logs", "node": "sumologic-kubernetes-collection", "pod_labels_heritage": "Helm", "job": "collection-sumologic-metadata-logs", "pod_labels_app": "collection-sumologic-otelcol-logs", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "_collector": "kubernetes", "container": "otelcol", "prometheus_service": "collection-sumologic-metadata-logs", "exporter": "sumologic", "cluster": "kubernetes", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "pipeline": "logs", "pod_labels_release": "collection", "endpoint": "otelcol-metrics", "namespace": "sumologic", "exported_endpoint": "https://collectors.sumologic.com/receiver/v1/otlp/ZaVnC4dhaV1G3fKi4RlKyO3Jr3J_nyx1O2Z2QovkcXrzueaasBjb9PDJIBG-9D6qfPgmu8_8327GeYSDhzM69yzZJxZo3he3vnqtp4XL1GQhEGPICw9l4A==/v1/logs", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_exporter_sent_log_records", value: 19.0, labels: {"_collector": "kubernetes", "endpoint": "otelcol-metrics", "exporter": "sumologic", "_origin": "kubernetes", "cluster": "kubernetes", "service_name": "otelcol-sumo", "pod_labels_app": "collection-sumologic-otelcol-logs", "pod_labels_release": "collection", "namespace": "sumologic", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "node": "sumologic-kubernetes-collection", "service_version": "v0.92.0-sumo-0", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "pod_labels_heritage": "Helm", "job": "collection-sumologic-metadata-logs", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "statefulset": "collection-sumologic-otelcol-logs", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "prometheus_service": "collection-sumologic-metadata-logs", "container": "otelcol", "pod": "collection-sumologic-otelcol-logs-0"}, timestamp: 1707815215023 }
2024-02-13T09:06:56.817Z DEBUG [sumologic_mock::router::otlp] metrics => Sample { metric: "otelcol_process_runtime_heap_alloc_bytes", value: 50173608.0, labels: {"service_version": "v0.92.0-sumo-0", "node": "sumologic-kubernetes-collection", "service": "collection-sumologic-metadata-logs_collection-sumologic-otelcol-logs-headless", "prometheus_service": "collection-sumologic-metadata-logs", "service_name": "otelcol-sumo", "pod_labels_app": "collection-sumologic-otelcol-logs", "pod_labels_statefulset.kubernetes.io/pod-name": "collection-sumologic-otelcol-logs-0", "pod_labels_release": "collection", "_collector": "kubernetes", "service_instance_id": "9efeb490-0d19-49b0-8128-01ac2aabe1df", "statefulset": "collection-sumologic-otelcol-logs", "_origin": "kubernetes", "namespace": "sumologic", "pod_labels_chart": "sumologic-4.4.0-23-g067275958d", "pod": "collection-sumologic-otelcol-logs-0", "pod_labels_heritage": "Helm", "container": "otelcol", "pod_labels_controller-revision-hash": "collection-sumologic-otelcol-logs-6ff4df45b", "job": "collection-sumologic-metadata-logs", "cluster": "kubernetes", "endpoint": "otelcol-metrics"}, timestamp: 1707815215023 }
```

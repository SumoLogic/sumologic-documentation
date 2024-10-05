---
id: troubleshoot-collection
title: Troubleshooting Collection
sidebar_label: Troubleshooting Collection
description: Troubleshooting Collection
---

## Troubleshooting installation

### Installation fails with error `function "dig" not defined`

You'll need to use a more recent version of Helm. See [Minimum Requirements](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/README.md#minimum-requirements).

If you are using ArgoCD or another tool that uses Helm under the hood, make sure that tool uses the required version of Helm.

### Sumo Logic fields

Sumo Logic apps for Kubernetes and Explore require the below listed fields to be added in the Sumo Logic UI to your Fields table schema.

- `cluster`
- `container`
- `daemonset`
- `deployment`
- `host`
- `namespace`
- `node`
- `pod`
- `service`
- `statefulset`

This is normally done in the setup job when `sumologic.setupEnabled` is set to `true` (default behavior).

In the unlikely scenario that this fails, you can create them manually by visiting [Fields](/docs/manage/fields/#manage-fields) in Sumo Logic UI.

This is to ensure your logs are tagged with relevant metadata.

This is a one-time setup per Sumo Logic account.

### Error: timed out waiting for the condition

If `helm upgrade --install` hangs, it usually means the pre-install setup job is failing and is in a retry loop. Due to a Helm limitation, errors from the setup job cannot be fed back to the `helm upgrade --install` command. Kubernetes schedules the job in a pod, so you can look at logs from the pod to see why the job is failing. First find the pod name in the namespace where the Helm chart was deployed. The pod name will contain `-setup` in the name.

```sh
kubectl get pods
```

:::tip
If the pod does not exist, it is possible it has been evicted. Re-run the `helm upgrade --install` to recreate it and while that command is running, use another shell to get the name of the pod.
:::

Get the logs from that pod:

```sh
kubectl logs POD_NAME -f
```

#### Error: collector with name 'sumologic' does not exist

If you get:

```sh
Error: collector with name 'sumologic' does not exist
sumologic_http_source.default_metrics_source: Importing from ID
```

...you can safely ignore it, and the installation should complete successfully. The installation process creates new [HTTP endpoints](/docs/send-data/hosted-collectors/http-source) in your Sumo Logic account, that are used to send data to Sumo. This error occurs if the endpoints had already been created by an earlier run of the installation process.

#### Secret 'sumologic::sumologic' exists, abort

If you see `Secret 'sumologic::sumologic' exists, abort.` from the logs, delete the existing secret:

```bash
kubectl delete secret sumologic -n ${NAMESPACE}
```

`helm install` should proceed after the existing secret is deleted before exhausting retries. If it did time out after exhausting retries,
rerun the `helm install` command.

### OpenTelemetry Collector Pods Stuck in CreateContainerConfigError

If the OpenTelemetry Collector Pods are in `CreateContainerConfigError` it can mean the setup job has not been completed yet. Make sure that
the `sumologic.setupEnable` parameter is set to `true`. Then wait for the setup pod to complete and the issue should resolve itself. The
setup job creates a secret and the error simply means the secret is not there yet. This usually resolves itself automatically.

If the issue does not solve resolve automatically, you will need to look at the logs for the setup pod. Kubernetes schedules the job in a pod, so you can look at logs from the pod to see why the job is failing. First find the pod name in the namespace where you installed the rendered YAML. The pod name will contain `-setup` in the name.

```sh
kubectl get pods
```

Get the logs from that pod:

```sh
kubectl logs POD_NAME -f
```

### Error: values don't meet the specifications of the schema(s)

If you see `Error: values don't meet the specifications of the schema(s) in the following chart(s): opentelemetry-operator...` from the logs, it means that your configuration for `opentelemetry-operator` keys in values.yaml file is not correct.

To fix this issue, please see the changes listed below:

#### Moved:
* From `opentelemetry-operator.instrumentationJobImage` to `instrumentation.instrumentationJobImage`
* From `opentelemetry-operator.createDefaultInstrumentation` to `instrumentation.createDefaultInstrumentation`
* From `opentelemetry-operator.instrumentationNamespaces` to `instrumentation.instrumentationNamespaces`
* From `opentelemetry-operator.instrumentation.dotnet.traces` to `instrumentation.dotnet.traces`
* From `opentelemetry-operator.instrumentation.dotnet.metrics` to `instrumentation.dotnet.metrics`
* From `opentelemetry-operator.instrumentation.dotnet.extraEnvVars` to `instrumentation.dotnet.extraEnvVars`
* From `opentelemetry-operator.instrumentation.java.traces` to `instrumentation.java.traces`
* From `opentelemetry-operator.instrumentation.java.metrics` to `instrumentation.java.metrics`
* From `opentelemetry-operator.instrumentation.java.extraEnvVars` to `instrumentation.java.extraEnvVars`
* From `opentelemetry-operator.instrumentation.nodejs` to `instrumentation.nodejs`
* From `opentelemetry-operator.instrumentation.python.traces` to `instrumentation.python.traces`
* From `opentelemetry-operator.instrumentation.python.metrics` to `instrumentation.python.metrics`
* From `opentelemetry-operator.instrumentation.python.extraEnvVars` to `instrumentation.python.extraEnvVars`

#### Changed:
* From `opentelemetry-operator.instrumentation.dotnet.repository` to `opentelemetry-operator.autoInstrumentationImage.dotnet.repository`
* From `opentelemetry-operator.instrumentation.dotnet.tag` to `opentelemetry-operator.autoInstrumentationImage.dotnet.tag`
* From `opentelemetry-operator.instrumentation.java.repository` to `opentelemetry-operator.autoInstrumentationImage.java.repository`
* From `opentelemetry-operator.instrumentation.java.tag` to `opentelemetry-operator.autoInstrumentationImage.java.tag`
* From `opentelemetry-operator.instrumentation.nodejs.repository` to `opentelemetry-operator.autoInstrumentationImage.nodejs.repository`
* From `opentelemetry-operator.instrumentation.nodejs.tag` to `opentelemetry-operator.autoInstrumentationImage.nodejs.tag`
* From `opentelemetry-operator.instrumentation.python.repository` to `opentelemetry-operator.autoInstrumentationImage.python.repository`
* From `opentelemetry-operator.instrumentation.python.tag` to `opentelemetry-operator.autoInstrumentationImage.python.tag`

#### Deleted:
* `opentelemetry-operator.instrumentation.dotnet.image`
* `opentelemetry-operator.instrumentation.java.image`
* `opentelemetry-operator.instrumentation.nodejs.image`
* `opentelemetry-operator.instrumentation.python.image`

## Namespace configuration

The following `kubectl` commands assume you are in the correct namespace `sumologic`. By default, these commands will use the namespace
`default`.

To run a single command in the `sumologic` namespace, pass in the flag `-n sumologic`.

To set your namespace context more permanently, you can run

```sh
kubectl config set-context $(kubectl config current-context) --namespace=sumologic
```

## Collecting logs

If you cannot see logs in Sumo that you expect to be there, here are the things to check.

### Check log throttling

Check if [log throttling](/docs/manage/ingestion-volume/log-ingestion#log-throttling) is happening.

If it is, there will be messages like `HTTP ERROR 429 You have temporarily exceeded your Sumo Logic quota` in OpenTelemetry Collector logs.

### Check ingest budget limits

Check if an [ingest budget](/docs/manage/ingestion-volume/ingest-budgets) limit is hit.

If it is, there will be `budget.exceeded` messages from Sumo in OpenTelemetry Collector logs, similar to the following:

```console
2022-04-12 13:47:17 +0000 [warn]: #0 There was an issue sending data: id: KMZJI-FCDPN-4KHKD, code: budget.exceeded, status: 200, message: Message(s) in the request dropped due to exceeded budget.
```

### Check if collection pods are in a healthy state

Run:

```sh
kubectl get pods
```

to get a list of running pods. If any of them are not in the `Status: running` state, something is wrong. To get the logs for that pod, you can either:

Stream the logs to `stdout`:

```sh
kubectl logs POD_NAME -f
```

Or write the current logs to a file:

```sh
kubectl logs POD_NAME > pod_name.log
```

To get a snapshot of the current state of the pod, you can run

```sh
kubectl describe pods POD_NAME
```

### Prometheus Logs

To view Prometheus logs:

```sh
kubectl -n "${NAMESPACE}" logs -l app.kubernetes.io/name=prometheus --container prometheus -f
```

Where `collection` is the `helm` release name.

### OpenTelemetry Logs Collector is being CPU throttled

If OpenTelemetry Logs Collector is being throttled, you should increase CPU request to higher value, for example:

```yaml
otellogs:
  daemonset:
    resources:
      requests:
        cpu: 2
      limits:
        cpu: 5
```

If this situation affects only specific group of nodes, you can change resource configuration only for them:

```yaml
otellogs:
  additionalDaemonSets:
    ## intense will be suffix for daemonset for easier recognition
    intense:
      nodeSelector:
        ## we are using nodeSelector to select only nodes with `workingGroup` label set to `IntenseLogGeneration`
        workingGroup: IntenseLogGeneration
      resources:
        requests:
          cpu: 1
        limits:
          cpu: 10
  daemonset:
    # For main daemonset, we need to set nodeAffinity to not schedule on nodes with `workingGroup` label set to `IntenseLogGeneration`
    affinity:
      nodeAffinity:
        requiredDuringSchedulingIgnoredDuringExecution:
          nodeSelectorTerms:
            - matchExpressions:
                - key: workingGroup
                  operator: NotIn
                  values:
                    - IntenseLogGeneration
```

For more information, see [Setting different resources on different nodes for logs collector](/docs/send-data/kubernetes/best-practices/#setting-different-resources-on-different-nodes-for-logs-collector).

### Check logs body

You can print logs on stdout of logs collector and logs metadata, and validate if they are correct. It may happen that logs are ingested, but with different metadata than you expect them.

In order to print them on stdout, two steps are required:

1. Disable ingesting logs from log-related pods. This is required to prevent logs ingest spike.
   - Add the following configuration to `user-values.yaml`:
     ```yaml
     debug:
       logs:
         metadata:
           stopLogsIngestion: true
         collector:
           stopLogsIngestion: true
     ```
   - Then, update your collection and wait for all log collector pods to be redeployed.
2. Enable printing logs on stdout for logs related pods by adding the following to `user-values.yaml`:
   ```yaml
   debug:
     logs:
       metadata:
         print: true
         stopLogsIngestion: true
       collector:
         print: true
         stopLogsIngestion: true
   ```
3. To revert your changes, perform first step as-is, then after configuration has been propagated to all pods, you can remove all configuration added in this section from the `user-values.yaml`.
:::note
It's important to perform first step exactly as-is, especially waiting for all collector pods to apply new configuration. We want to avoid situation in which collector pods are picking up debugging logs and sending them to Sumo Logic, as it may increase your costs.
:::

### View logs being sent to Sumo Logic

You can use Sumo Logic Mock to see what data has been sent to Sumo Logic. In order to do that, add the following to your `user-values.yaml`:

```yaml
debug:
  sumologicMock:
    enabled: true
    deployment:
      extraArgs:
        - --print-logs  # print received logs on stdout  
        - --print-headers  # print headers on stdout
  logs:
    metadata:
      # enable logs forwarding
      forwardToSumologicMock: true
```

Then, look at the Sumo Logic Mock logs:

```shell
> kubectl logs -l sumologic.com/app=sumologic-mock -f
2024-02-13T08:54:24.664Z INFO  [sumologic_mock] Sumo Logic Mock is listening on 0.0.0.0:3000!
2024-02-13T08:54:24.664Z INFO  [actix_server::builder] Starting 8 workers
2024-02-13T08:54:24.664Z INFO  [actix_server::server] Actix runtime found; starting in Actix runtime
2024-02-13T08:54:26.489Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/logs HTTP/1.1--> content-encoding: gzip--> host: collection-sumologic-mock.sumologic:3000--> user-agent: Go-http-client/1.1--> content-type: application/x-protobuf--> accept-encoding: gzip--> x-sumo-client: k8s_4.4.0-24-g7a27f1c253--> content-length: 1821

2024-02-13T08:54:26.489Z DEBUG [sumologic_mock::router::otlp] log => Container image "public.ecr.aws/sumologic/kubernetes-setup:3.11.0" already present on machine
2024-02-13T08:54:26.489Z DEBUG [sumologic_mock::router::otlp] log => Created container setup
2024-02-13T08:54:26.489Z DEBUG [sumologic_mock::router::otlp] log => Successfully pulled image "public.ecr.aws/sumologic/sumologic-mock:2.22.0-59-g245ae92" in 907.292569ms (907.296521ms including waiting)
2024-02-13T08:54:26.489Z DEBUG [sumologic_mock::router::otlp] log => Created container sumologic-mock
2024-02-13T08:54:26.489Z DEBUG [sumologic_mock::router::otlp] log => Started container setup
2024-02-13T08:54:26.489Z DEBUG [sumologic_mock::router::otlp] log => Started container sumologic-mock
2024-02-13T08:54:26.776Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/logs HTTP/1.1--> host: collection-sumologic-mock.sumologic:3000--> content-type: application/x-protobuf--> content-length: 1111--> content-encoding: gzip--> x-sumo-client: k8s_4.4.0-24-g7a27f1c253--> user-agent: Go-http-client/1.1--> accept-encoding: gzip

2024-02-13T08:54:26.776Z DEBUG [sumologic_mock::router::otlp] log => time="2024-02-13T08:54:24Z" level=info msg="finished unary call with code OK" grpc.code=OK grpc.method=Check grpc.service=grpc.health.v1.Health grpc.start_time="2024-02-13T08:54:24Z" grpc.time_ms=0.013 span.kind=server system=grpc
2024-02-13T08:54:26.776Z DEBUG [sumologic_mock::router::otlp] log => 2024-02-13T08:54:24.471Z   info    exporterhelper/retry_sender.go:129      Exporting failed. Will retry the request after interval.        {"kind": "exporter", "data_type": "logs", "name": "sumologic", "error": "Post \"http://collection-sumologic-mock.sumologic:3000/receiver/v1/logs\": dial tcp 10.152.183.65:3000: connect: connection refused", "interval": "3.254316449s"}
2024-02-13T08:54:27.239Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/metrics HTTP/1.1--> accept-encoding: gzip--> content-type: application/x-protobuf--> x-sumo-client: k8s_4.4.0-24-g7a27f1c253--> content-length: 1121--> user-agent: Go-http-client/1.1--> host: collection-sumologic-mock.sumologic:3000--> content-encoding: gzip

2024-02-13T08:54:27.726Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/logs HTTP/1.1--> user-agent: Go-http-client/1.1--> accept-encoding: gzip--> host: collection-sumologic-mock.sumologic:3000--> x-sumo-client: k8s_4.4.0-24-g7a27f1c253--> content-encoding: gzip--> content-type: application/x-protobuf--> content-length: 1886

2024-02-13T08:54:27.726Z DEBUG [sumologic_mock::router::otlp] log => Stopping container sumologic-mock
2024-02-13T08:54:27.726Z DEBUG [sumologic_mock::router::otlp] log => Scaled up replica set collection-sumologic-mock-6bb85f46c8 to 1
2024-02-13T08:54:27.726Z DEBUG [sumologic_mock::router::otlp] log => Created pod: collection-sumologic-mock-6bb85f46c8-99tq4
2024-02-13T08:54:27.726Z DEBUG [sumologic_mock::router::otlp] log => Successfully assigned sumologic/collection-sumologic-mock-6bb85f46c8-99tq4 to sumologic-kubernetes-collection
2024-02-13T08:54:27.742Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/logs HTTP/1.1--> accept-encoding: gzip--> content-type: application/x-protobuf--> content-length: 759--> host: collection-sumologic-mock.sumologic:3000--> content-encoding: gzip--> x-sumo-client: k8s_4.4.0-24-g7a27f1c253--> user-agent: Go-http-client/1.1

2024-02-13T08:54:27.742Z DEBUG [sumologic_mock::router::otlp] log => 10.0.2.15 - - [13/Feb/2024:08:54:25 +0000] "GET / HTTP/1.1" 200 6 "" "kube-probe/1.23+"
2024-02-13T08:54:27.742Z DEBUG [sumologic_mock::router::otlp] log =>
2024-02-13T08:54:27.742Z DEBUG [sumologic_mock::router::otlp] log => Initializing the backend...
2024-02-13T08:54:27.768Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/logs HTTP/1.1--> host: collection-sumologic-mock.sumologic:3000--> content-length: 1393--> user-agent: Go-http-client/1.1--> content-type: application/x-protobuf--> accept-encoding: gzip--> x-sumo-client: k8s_4.4.0-24-g7a27f1c253--> content-encoding: gzip
```

:::note
Logs do not contain metadata fields. Due to that, you can only check data body sent to Sumo Logic.
:::

## Collecting metrics

### Check the `/metrics` endpoint

You can `port-forward` to a pod exposing the `/metrics` endpoint and verify it is exposing Prometheus metrics:

```sh
kubectl port-forward collection-sumologic-xxxxxxxxx-xxxxx 8080:24231
```

Then, in your browser, go to `http://localhost:8080/metrics`. You should see Prometheus metrics exposed.

#### Check the `/metrics` endpoint for Kubernetes services

For kubernetes services, you can use the following way:

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

### Check the Prometheus UI

First run the following command to expose the Prometheus UI:

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

### Check Scrape Configs for OpenTelemetry Operator

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

### Print metrics on stdout for OTLP source

In order to print metrics and their labels on stdout, the following configuration has to be applied:

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

### Check Prometheus Remote Storage

We rely on the Prometheus [Remote Storage](https://prometheus.io/docs/prometheus/latest/storage/) integration to send metrics from
Prometheus to the metadata enrichment service.

You [check Prometheus logs](#prometheus-logs) to verify there are no errors during remote write.

You can also check `prometheus_remote_storage_.*` metrics to look for success/failure attempts.

### Missing metrics for ArgoCD installation

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

### Check metrics content

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

### View metrics being sent to Sumo Logic

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

## Collecting Spans and Traces

### Check instrumentation content

You can print spans on stdout of instrumentation related pods, and validate if they are correct. It may happen that spans are ingested, but with different metadata than you expect.

In order to print them on stdout, two steps are required:

1. Disable ingesting logs from instrumentation related pods. This is required to prevent logs ingest spike. Add the following configuration to `user-values.yaml`:

   ```yaml
   debug:
     instrumentation:
       otelcolInstrumentation:
         stopLogsIngestion: true
       tracesGateway:
         stopLogsIngestion: true
       tracesSampler:
         stopLogsIngestion: true
   ```

   Then update your collection and wait for all log collector pods to be redeployed.

2. Enable printing spans on stdout for instrumentation related pods, by adding the following to `user-values.yaml`:

   ```yaml
   debug:
     instrumentation:
       otelcolInstrumentation:
         print: true
         stopLogsIngestion: true
       tracesGateway:
         print: true
         stopLogsIngestion: true
       tracesSampler:
         print: true
         stopLogsIngestion: true
   ```

3. To revert your changes, perform first step as-is, then after configuration has been propagated to all pods, you can remove all configuration added in this section from the `user-values.yaml`.

:::note
It's important to perform the first step exactly as-is, especially waiting for all log collector pods to apply new configuration. We want to avoid the situation in which logs collector pods are picking up debugging logs and sending them to Sumo Logic, as it may increase your costs.
:::

### View traces being sent to Sumo Logic

You can use Sumo Logic Mock to see what data has been send to Sumo Logic.

In order to do that, add the following to your `user-values.yaml`:
```yaml
debug:
  sumologicMock:
    enabled: true
    deployment:
      extraArgs:
        - --print-spans    # print received spans on stdout  
        - --print-headers  # print headers on stdout
  instrumentation:
    tracesSampler:
      # enable spans forwarding
      forwardToSumologicMock: true
```

Then, look at the Sumo Logic Mock logs:

```shell
> kubectl logs -l sumologic.com/app=sumologic-mock -f
2024-02-13T14:19:22.397Z INFO  [sumologic_mock] Sumo Logic Mock is listening on 0.0.0.0:3000!
2024-02-13T14:19:22.398Z INFO  [actix_server::builder] Starting 8 workers
2024-02-13T14:19:22.398Z INFO  [actix_server::server] Actix runtime found; starting in Actix runtime
2024-02-13T14:19:56.412Z DEBUG [sumologic_mock::router::otlp] Span => name: root-span-otlpHttp, span_id: 0cdfc556b3884a6e, parent_span_id: , trace_id: f7563cc4ef721e1d14974eea71e20b55
2024-02-13T14:19:56.412Z DEBUG [sumologic_mock::router::otlp] Span => name: ancestor-1, span_id: b5206fc77b835624, parent_span_id: 0cdfc556b3884a6e, trace_id: f7563cc4ef721e1d14974eea71e20b55
2024-02-13T14:19:56.412Z DEBUG [sumologic_mock::router::otlp] Span => name: ancestor-2, span_id: 3663cc216d50caa4, parent_span_id: b5206fc77b835624, trace_id: f7563cc4ef721e1d14974eea71e20b55
2024-02-13T14:19:56.412Z DEBUG [sumologic_mock::router::otlp] Span => name: ancestor-3, span_id: 1ce499eb291e4c49, parent_span_id: 3663cc216d50caa4, trace_id: f7563cc4ef721e1d14974eea71e20b55
2024-02-13T14:19:56.412Z DEBUG [sumologic_mock::router::otlp] Span => name: ancestor-4, span_id: 671623a120987635, parent_span_id: 1ce499eb291e4c49, trace_id: f7563cc4ef721e1d14974eea71e20b55
2024-02-13T14:19:56.412Z DEBUG [sumologic_mock::router::otlp] Span => name: ancestor-5, span_id: a6225d27fd7fec15, parent_span_id: 671623a120987635, trace_id: f7563cc4ef721e1d14974eea71e20b55
2024-02-13T14:19:56.412Z DEBUG [sumologic_mock::router::otlp] Span => name: ancestor-6, span_id: 2ef9759def53f709, parent_span_id: a6225d27fd7fec15, trace_id: f7563cc4ef721e1d14974eea71e20b55
2024-02-13T14:19:56.412Z DEBUG [sumologic_mock::router::otlp] Span => name: ancestor-7, span_id: 34b7b7f27d6a9d86, parent_span_id: 2ef9759def53f709, trace_id: f7563cc4ef721e1d14974eea71e20b55
```

## Collecting events

### Check events body

You can print events on stdout of events collector pod, and validate if they are correct.

In order to print them on stdout, two steps are required:

1. Disable ingesting logs from events collector. This is required to prevent logs ingest spike.
   - Add the following configuration to `user-values.yaml`:
   ```yaml
   debug:
     events:
       stopLogsIngestion: true
   ```
   - Then, update your collection and wait for all log collector pods to be redeployed.
2. Enable printing events on stdout for events collector, by adding the following to `user-values.yaml`:
   ```yaml
   debug:
     events:
       print: true
       stopLogsIngestion: true
   ```
3. To revert your changes, perform the first step as-is, then after configuration has been propagated to all pods, you can remove all configuration added in this section from the `user-values.yaml`.

:::note
It's important to perform the first step exactly as-is, especially waiting for all collector pods to apply new configuration. We want to avoid the situation in which collector pods are picking up debugging logs and sending them to Sumo Logic, as it may increase your costs.
:::

### View events being sent to Sumo Logic

You can use Sumo Logic Mock to see what data has been send to Sumo Logic. In order to do that, add the following to your `user-values.yaml`:

```yaml
debug:
  sumologicMock:
    enabled: true
    deployment:
      extraArgs:
        - --print-logs  # print received events/logs on stdout  
        - --print-headers  # print headers on stdout
  events:
    # enable logs forwarding
    forwardToSumologicMock: true
```

Then look at the Sumo Logic Mock logs:

```shell
> kubectl logs -l sumologic.com/app=sumologic-mock -f
2024-02-13T21:44:36.922Z INFO  [sumologic_mock] Sumo Logic Mock is listening on 0.0.0.0:3000!
2024-02-13T21:44:36.923Z INFO  [actix_server::builder] Starting 8 workers
2024-02-13T21:44:36.923Z INFO  [actix_server::server] Actix runtime found; starting in Actix runtime
2024-02-13T21:44:52.264Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/traces HTTP/1.1--> content-type: application/x-protobuf--> content-length: 1113--> accept-encoding: gzip--> user-agent: Sumo Logic OpenTelemetry Collector distribution/v0.92.0-sumo-0 (linux/amd64)--> host: collection-sumologic-mock.sumologic:3000--> content-encoding: gzip

2024-02-13T21:44:55.558Z DEBUG [sumologic_mock::router] --> GET /metrics HTTP/1.1--> accept: */*--> user-agent: kube-probe/1.23+--> connection: close--> host: 10.1.126.180:3000

2024-02-13T21:44:57.264Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/traces HTTP/1.1--> content-type: application/x-protobuf--> user-agent: Sumo Logic OpenTelemetry Collector distribution/v0.92.0-sumo-0 (linux/amd64)--> host: collection-sumologic-mock.sumologic:3000--> content-encoding: gzip--> accept-encoding: gzip--> content-length: 1372

2024-02-13T21:45:02.262Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/traces HTTP/1.1--> host: collection-sumologic-mock.sumologic:3000--> content-length: 1252--> accept-encoding: gzip--> content-encoding: gzip--> user-agent: Sumo Logic OpenTelemetry Collector distribution/v0.92.0-sumo-0 (linux/amd64)--> content-type: application/x-protobuf

2024-02-13T21:45:07.264Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/traces HTTP/1.1--> accept-encoding: gzip--> user-agent: Sumo Logic OpenTelemetry Collector distribution/v0.92.0-sumo-0 (linux/amd64)--> content-type: application/x-protobuf--> content-encoding: gzip--> host: collection-sumologic-mock.sumologic:3000--> content-length: 1502

2024-02-13T21:45:15.558Z DEBUG [sumologic_mock::router] --> GET /metrics HTTP/1.1--> host: 10.1.126.180:3000--> connection: close--> accept: */*--> user-agent: kube-probe/1.23+

2024-02-13T21:45:35.559Z DEBUG [sumologic_mock::router] --> GET /metrics HTTP/1.1--> user-agent: kube-probe/1.23+--> accept: */*--> connection: close--> host: 10.1.126.180:3000

2024-02-13T21:45:36.924Z DEBUG [sumologic_mock::router] 1707860736 Metrics:          0 Logs:          0; 0.000000 MB/s Spans:         40;
2024-02-13T21:45:54.784Z DEBUG [sumologic_mock::router] --> POST /receiver/v1/logs HTTP/1.1--> user-agent: Go-http-client/1.1--> content-length: 5888--> accept-encoding: gzip--> x-sumo-client: k8s_4.4.0--> content-encoding: gzip--> content-type: application/x-protobuf--> host: collection-sumologic-mock.sumologic:3000

2024-02-13T21:45:54.785Z DEBUG [sumologic_mock::router::otlp] log => delete Pod collection-sumologic-otelcol-events-0 in StatefulSet collection-sumologic-otelcol-events successful
2024-02-13T21:45:54.785Z DEBUG [sumologic_mock::router::otlp] log => Stopping container otelcol
2024-02-13T21:45:54.785Z DEBUG [sumologic_mock::router::otlp] log => delete Pod collection-sumologic-otelcol-instrumentation-2 in StatefulSet collection-sumologic-otelcol-instrumentation successful
2024-02-13T21:45:54.785Z DEBUG [sumologic_mock::router::otlp] log => Stopping container otelcol
2024-02-13T21:45:54.785Z DEBUG [sumologic_mock::router::otlp] log => Container image "public.ecr.aws/sumologic/sumologic-otel-collector:0.92.0-sumo-0" already present on machine
2024-02-13T21:45:54.785Z DEBUG [sumologic_mock::router::otlp] log => Created container otelcol
2024-02-13T21:45:54.785Z DEBUG [sumologic_mock::router::otlp] log => Container image "public.ecr.aws/sumologic/sumologic-otel-collector:0.92.0-sumo-0" already present on machine
2024-02-13T21:45:54.785Z DEBUG [sumologic_mock::router::otlp] log => Created container otelcol
2024-02-13T21:45:54.785Z DEBUG [sumologic_mock::router::otlp] log => Started container otelcol
2024-02-13T21:45:54.785Z DEBUG [sumologic_mock::router::otlp] log => Started container otelcol
```

:::note
Logs do not contain metadata fields. Due to that, you can only check data body sent to Sumo Logic.
:::

## Common Issues

### Missing metrics - cannot see cluster in Explore

If you are not seeing metrics coming in to Sumo or/and your cluster is not showing up in [Explore](/docs/observability/kubernetes/monitoring#open-kubernetes-views) it is most likely due to the fact that Prometheus pod is not running.

You can verify that by using the following command:

```sh
$ kubectl get pod -n <NAMESPACE> -l app.kubernetes.io/name=prometheus
NAME                                 READY   STATUS    RESTARTS   AGE
prometheus-<NAMESPACE>-prometheus-0  2/2     Running   1          4d20h
```

In case it is not running one can check prometheus-operator logs for any related issues:

```sh
kubectl logs -n <NAMESPACE> -l app=kube-prometheus-stack-operator
```

### Pod stuck in `ContainerCreating` state

If you are seeing a pod stuck in the `ContainerCreating` state and seeing logs like this:

```sh
Warning  FailedCreatePodSandBox  29s   kubelet, ip-172-20-87-45.us-west-1.compute.internal  Failed create pod sandbox: rpc error: code = DeadlineExceeded desc = context deadline exceeded
```

you have an unhealthy node. Killing the node should resolve this issue.

### Missing `kubelet` metrics

Navigate to the `kubelet` targets using the steps above. You may see that the targets are down with 401 errors. If so, there are two known workarounds you can try.

#### 1. Enable the `authenticationTokenWebhook` flag in the cluster

The goal is to set the flag `--authentication-token-webhook=true` for `kubelet`. One way to do this is:

```sh
kops get cluster -o yaml > NAME_OF_CLUSTER-cluster.yaml
```

Then, make the following change in that file:

```yaml
spec:
  kubelet:
    anonymousAuth: false
    authenticationTokenWebhook: true # <- add this line
```

Then run

```sh
kops replace -f NAME_OF_CLUSTER-cluster.yaml
kops update cluster --yes
kops rolling-update cluster --yes
```

#### 2. Disable the `kubelet.serviceMonitor.https` flag in Kube Prometheus Stack

The goal is to set the flag `kubelet.serviceMonitor.https=false` when deploying the prometheus operator.

Add the following lines to the `kube-prometheus-stack` section of your `user-values.yaml` file:

```yaml
kube-prometheus-stack:
  ...
  kubelet:
    serviceMonitor:
      https: false
```

and upgrade the helm chart:

```sh
helm upgrade collection sumologic/sumologic --reuse-values --version=<RELEASE-VERSION> -f user-values.yaml
```

### Missing `kube-controller-manager` or `kube-scheduler` metrics

There’s an issue with backwards compatibility in the current version of the kube-prometheus-stack helm chart that requires us to override the selectors for kube-scheduler and kube-controller-manager in order to see metrics from them. If you are not seeing metrics from these two targets, you can use the following config.

```yaml
kube-prometheus-stack:
  kubeControllerManager:
    service:
      selector:
        k8s-app: kube-controller-manager
  kubeScheduler:
    service:
      selector:
        k8s-app: kube-scheduler
```

### Prometheus stuck in `Terminating` state after running `helm del collection`

Delete the pod forcefully by adding `--force --grace-period=0` to the `kubectl delete pod` command.

### Rancher

If you are running the out of the box rancher monitoring setup, you cannot run our Prometheus operator alongside it. The Rancher Prometheus Operator setup will actually kill and permanently terminate our Prometheus Operator instance and will prevent the metrics system from coming up. If you have the Rancher prometheus operator setup running, they will have to use the UI to disable it before they can install our collection process.

### Falco and Google Kubernetes Engine (GKE)

`Google Kubernetes Engine (GKE)` uses Container-Optimized OS (COS) as the default operating system for its worker node pools. COS is a security-enhanced operating system that limits access to certain parts of the underlying OS. Because of this security constraint, Falco cannot insert its kernel module to process events for system calls. However, COS provides the ability to use extended Berkeley Packet Filter (eBPF) to supply the stream of system calls to the Falco engine. eBPF is currently only supported on GKE and COS. For more information, see [Falco documentation](https://falco.org/docs/getting-started/third-party/#gke).

To install on `GKE`, use the provided override file to customize your configuration and uncomment the following lines in the `values.yaml` file referenced below:

```yaml
  #driver:
  #  kind: ebpf
```

### Falco and OpenShift

Falco does not provide modules for all kernels. When Falco module is not available for particular kernel, Falco tries to build it. Building a module requires `kernel-devel` package installed on nodes.

For OpenShift, installation of `kernel-devel` on nodes is provided through MachineConfig used by [Machine Config operator](https://github.com/openshift/machine-config-operator). When update of machine configuration is needed machine is rebooted, see the [documentation](https://github.com/openshift/machine-config-operator/blob/master/docs/MachineConfigDaemon.md#coordinating-updates). The process of changing nodes configuration may require long time during which Pods scheduled on unchanged nodes are in `Init` state.

Node configuration can be verified by following annotations:

- `machineconfiguration.openshift.io/currentConfig`
- `machineconfiguration.openshift.io/desiredConfig`
- `machineconfiguration.openshift.io/state`

After that, remove Otelcol pods and associated PVC-s.

For example, if the namespace where the collection is installed is `collection`, run the following set of commands:

```bash
NAMESPACE_NAME=collection

for POD_NAME in $(kubectl get pods --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}' | grep otelcol-logs); do
  kubectl -n ${NAMESPACE_NAME} delete pvc "buffer-${POD_NAME}" &
  kubectl -n ${NAMESPACE_NAME} delete pod ${POD_NAME}
  kubectl -n ${NAMESPACE_NAME} delete pod ${POD_NAME}
done
```

The duplicated pod deletion command is there to make sure the pod is not stuck in `Pending` state with event `persistentvolumeclaim "file-storage-sumologic-otelcol-logs-1" not found`.

### Out of memory (OOM) failures for Prometheus Pod

If you observe that Prometheus Pod needs more and more resources (out of memory failures - OOM killed Prometheus) and you are not able to
increase them then you may need to horizontally scale Prometheus. For details, refer to [Prometheus sharding](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/prometheus.md#horizontal-scaling-sharding).

### Prometheus: server returned HTTP status 404 Not Found: 404 page not found

If you see the following error in Prometheus logs:

```text
ts=2023-01-30T16:39:27.436Z caller=dedupe.go:112 component=remote level=error remote_name=2b2fa9 url=http://sumologic-sumologic-remote-write-proxy.sumologic.svc.cluster.local:9888/prometheus.metrics msg="non-recoverable error" count=194 exemplarCount=0 err="server returned HTTP status 404 Not Found: 404 page not found"
```

you'll need to change the following configurations:

- `kube-prometheus-stack.prometheus.prometheusSpec.remoteWrite`
- `kube-prometheus-stack.prometheus.prometheusSpec.additionalRemoteWrite`

so `url` starts with `http://$(METADATA_METRICS_SVC).$(NAMESPACE).svc.cluster.local.:9888`.

See the following example:

```yaml
kube-prometheus-stack:
  prometheus:
    prometheusSpec:
      remoteWrite:
        - url: http://$(METADATA_METRICS_SVC).$(NAMESPACE).svc.cluster.local.:9888/prometheus.metrics
          ...
```

Alternatively, you can add `/prometheus.metrics` to `metadata.metrics.config.additionalEndpoints`. See the following example:

```yaml
metadata:
  metrics:
    config:
      additionalEndpoints:
        - /prometheus.metrics.kubelet
```

### OpenTelemetry: dial tcp: lookup collection-sumologic-metadata-logs.sumologic.svc.cluster.local.: device or resource busy

If you see the following error in OpenTelemetry Pods:

```yaml
2023-01-31T14:50:20.263Z        info    exporterhelper/queued_retry.go:426      Exporting failed. Will retry the request after interval.        {"kind": "exporter", "data_type": "logs", "name": "otlphttp", "error": "failed to make an HTTP request: Post \"http://collection-sumologic-metadata-logs.sumologic.svc.cluster.local.:4318/v1/logs\": dial tcp: lookup collection-sumologic-metadata-logs.sumologic.svc.cluster.local.: device or resource busy", "interval": "16.601790675s"}
```

Add the following environment variable to the affected Statefulset/Daemonset/Deployment:

```yaml
extraEnvVars:
  - name: GODEBUG
    value: netdns=go
```

For example, for OpenTelemetry Logs Collector:

```yaml
otellogs:
  daemonset:
    extraEnvVars:
      - name: GODEBUG
        value: netdns=go
```

### OpenTelemetry Operator is Restarting after collection upgrade

If the OpenTelemetry Operator is restarting after upgrade, and the following error can be found in the previous run logs:

```text
{"level":"error","ts":"2024-01-10T09:32:24Z","logger":"controller-runtime.source.EventHandler","msg":"if kind is a CRD, it should be installed before calling Start","kind":"OpAMPBridge.opentelemetry.io","error":"no matches for kind \"OpAMPBridge\" in version \"opentelemetry.io/v1alpha1\"","stacktrace":"sigs.k8s.io/controller-runtime/pkg/internal/source.(*Kind).Start.func1.1\n\t/home/runner/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.16.3/pkg/internal/source/kind.go:63\nk8s.io/apimachinery/pkg/util/wait.loopConditionUntilContext.func2\n\t/home/runner/go/pkg/mod/k8s.io/apimachinery@v0.28.4/pkg/util/wait/loop.go:73\nk8s.io/apimachinery/pkg/util/wait.loopConditionUntilContext\n\t/home/runner/go/pkg/mod/k8s.io/apimachinery@v0.28.4/pkg/util/wait/loop.go:74\nk8s.io/apimachinery/pkg/util/wait.PollUntilContextCancel\n\t/home/runner/go/pkg/mod/k8s.io/apimachinery@v0.28.4/pkg/util/wait/poll.go:33\nsigs.k8s.io/controller-runtime/pkg/internal/source.(*Kind).Start.func1\n\t/home/runner/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.16.3/pkg/internal/source/kind.go:56"}
```

It means that Custom Resource Definition has not been applied by Helm. It is [Helm known issue](https://helm.sh/docs/chart_best_practices/custom_resource_definitions/#some-caveats-and-explanations), and it has to be applied manually:

```shell
kubectl apply -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-helm-charts/opentelemetry-operator-0.44.0/charts/opentelemetry-operator/crds/crd-opentelemetry.io_opampbridges.yaml
```

## Using Sumo Logic Mock

Sumo Logic Mock is debugging tool, which helps to see what exactly is being sent from the Sumo Logic Collection to Sumo Logic. It may help with finding if there are any missing metrics, logs, traces, or parts of them like labels or metadata.

:::note
Sumo Logic Mock is treated as an experimental tool and it may significantly change between every release.
:::

### Estimate ingestion using Sumo Logic Mock in local mode

Sumo Logic Mock can be used to estimate how many logs and metrics are going to be sent to Sumo Logic without even having any Sumo Logic account.

Add the following configuration to your `user-values.yaml`:

```yaml
debug:
  sumologicMock:
    enabled: true
  enableLocalMode: true
```

And then, you can see throughput in the Sumo Logic Mock logs:

```shell
> kubectl logs -l sumologic.com/app=sumologic-mock -f
2024-02-12T10:08:43.117Z INFO  [sumologic_mock] Sumo Logic Mock is listening on 0.0.0.0:3000!
2024-02-12T10:08:43.118Z INFO  [actix_server::builder] Starting 8 workers
2024-02-12T10:08:43.118Z INFO  [actix_server::server] Actix runtime found; starting in Actix runtime
2024-02-12T10:09:43.117Z DEBUG [sumologic_mock::router] 1707732583 Metrics:       1522 Logs:         44; 0.000075 MB/s Spans:         17;
2024-02-12T10:10:43.118Z DEBUG [sumologic_mock::router] 1707732643 Metrics:       2050 Logs:         33; 0.000027 MB/s Spans:         13;
2024-02-12T10:11:43.117Z DEBUG [sumologic_mock::router] 1707732703 Metrics:       1786 Logs:         35; 0.000034 MB/s Spans:          2;
2024-02-12T10:12:43.117Z DEBUG [sumologic_mock::router] 1707732763 Metrics:       1786 Logs:         40; 0.000075 MB/s Spans:         15;
2024-02-12T10:13:43.117Z DEBUG [sumologic_mock::router] 1707732823 Metrics:       1786 Logs:         31; 0.000027 MB/s Spans:          0;
```

Where `1707732583 Metrics:       1522 Logs:         44; 0.000075 MB/s Spans:          17;` means the following:

- It sums up ingestion for one minute up to `1707732583` (`2024-02-12T10:09:43`)
- there were `1522` metrics data points, which means `1522 DPM`
- There were `44` logs (`0.000075 MB/s`)
- There were `17` spans

### Estimate ingestion while sending data to Sumo Logic

You can also send every signal separately at the same time as ingesting it to Sumo Logic.

Add one of the following to your `user-values.yaml` in order to achieve that:

```yaml
debug:
  sumologicMock:
    # This is obligatory. It spins up the Sumo Logic Mock service
    enabled: true
  logs:
    metadata:
      # enable logs forwarding
      forwardToSumologicMock: true

  metrics:
    metadata:
      # enable metrics forwarding
      forwardToSumologicMock: true
```

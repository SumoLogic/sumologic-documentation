---
id: logs
title: Troubleshooting Kubernetes Log Collection
description: Identify and resolve problems that prevent Kubernetes logs from being collected, processed, or sent to Sumo Logic.
---

If you cannot see logs in Sumo Logic that you expect to be there, here are the things to check.

### Check log throttling

Check if [log throttling](/docs/manage/ingestion-volume/log-ingestion#log-throttling) is happening.

If it is, there will be messages like `HTTP ERROR 429 You have temporarily exceeded your Sumo Logic quota` in OpenTelemetry Collector logs.

### Check ingest budget limits

Check if an [ingest budget](/docs/manage/ingestion-volume/ingest-budgets) limit is hit.

If it is, there will be `budget.exceeded` messages from Sumo Logic in OpenTelemetry Collector logs, similar to the following:

```console
2022-04-12 13:47:17 +0000 [warn]: #0 There was an issue sending data: id: KMZJI-FCDPN-4KHKD, code: budget.exceeded, status: 200, message: Message(s) in the request dropped due to exceeded budget.
```

### Check if collection pods are in a healthy state

Run the below mentioned command to get a list of running pods. If any of them are not in the `Status: running` state, something is wrong.

```sh
kubectl get pods
```

To get the logs for that pod, you can either:

Stream the logs to `stdout`:

```sh
kubectl logs POD_NAME -f
```

Or, write the current logs to a file:

```sh
kubectl logs POD_NAME > pod_name.log
```

Run the following command to get a snapshot of the current state of the pod:

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

If OpenTelemetry logs collector is being throttled, you should increase CPU request to higher value, for example:

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

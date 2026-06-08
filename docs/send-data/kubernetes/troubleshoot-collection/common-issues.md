---
id: common-issues
title: Troubleshooting Common Kubernetes Collection Issues
description: Troubleshoot common Kubernetes collection issues such as missing metrics, unhealthy pods, Prometheus errors, and OpenTelemetry configuration problems.
---

Here's how to troubleshoot common Kubernetes collection issues such as missing metrics, unhealthy pods, Prometheus errors, and OpenTelemetry configuration problems.

## Missing metrics - cannot see cluster in Explore

If you are not seeing metrics coming in to Sumo Logic or/and your cluster is not showing up in the [Explore](/docs/observability/kubernetes/monitoring#open-kubernetes-views) it is most likely due to the fact that Prometheus pod is not running.

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

## Pod stuck in `ContainerCreating` state

If you are seeing a pod stuck in the `ContainerCreating` state and seeing logs as mentioned below. It means you have an unhealthy node and killing the node should resolve this issue.

```sh
Warning  FailedCreatePodSandBox  29s   kubelet, ip-172-20-87-45.us-west-1.compute.internal  Failed create pod sandbox: rpc error: code = DeadlineExceeded desc = context deadline exceeded
```


## Missing `kubelet` metrics

Navigate to the `kubelet` targets using the steps above. You may see that the targets are down with 401 errors. If so, there are two known workarounds you can try.

### 1. Enable the `authenticationTokenWebhook` flag in the cluster

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

### 2. Disable the `kubelet.serviceMonitor.https` flag in Kube Prometheus Stack

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

## Missing `kube-controller-manager` or `kube-scheduler` metrics

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

## Prometheus stuck in `Terminating` state after running `helm del collection`

Delete the pod forcefully by adding `--force --grace-period=0` to the `kubectl delete pod` command.

## Rancher

If you are running the out of the box rancher monitoring setup, you cannot run our Prometheus operator alongside it. The Rancher Prometheus operator setup will actually kill and permanently terminate our Prometheus operator instance and will prevent the metrics system from coming up. If you have the Rancher Prometheus operator setup running, they will have to use the UI to disable it before they can install our collection process.

## Incorrect CRDs

If you receive errors similar to below, this typically points to a schema (CRD) that’s out of date. Ensure you have the correct CRDs applied in the cluster.

```
unmarshal errors: field collector_selector not found in type config.Config
```

## HorizontalPodAutoscaler (Metrics Server Disabled)

If you receive warning events similar to below, this typically means that the HorizontalPodAutoscaler (HPA) cannot connect to the metrics-server or the metrics-server is disabled.

```
Warning   FailedGetResourceMetric   horizontalpodautoscaler/sumo-logic-sumologic-otelcol-metrics           failed to get cpu utilization: unable to get metrics for resource cpu: unable to fetch metrics from resource metrics API: the server could not find the requested resource (get pods.metrics.k8s.io)
```

To resolve this, you can try enabling the metrics-server manually in the helm chart configuration:

```yaml
metrics-server:
  enabled: true
```


## Falco and Google Kubernetes Engine (GKE)

`Google Kubernetes Engine (GKE)` uses Container-Optimized OS (COS) as the default operating system for its worker node pools. COS is a security-enhanced operating system that limits access to certain parts of the underlying OS. Because of this security constraint, Falco cannot insert its kernel module to process events for system calls. However, COS provides the ability to use extended Berkeley Packet Filter (eBPF) to supply the stream of system calls to the Falco engine. eBPF is currently only supported on GKE and COS. For more information, see [Falco documentation](https://falco.org/docs/getting-started/third-party/#gke).

To install on `GKE`, use the provided override file to customize your configuration and uncomment the following lines in the `values.yaml` file referenced below:

```yaml
  #driver:
  #  kind: ebpf
```

## Falco and OpenShift

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

## Out of memory (OOM) failures for Prometheus Pod

If you observe that Prometheus Pod needs more resources (out of memory failures - OOM killed Prometheus) and you are not able to increase them then you may need to horizontally scale Prometheus. For details, refer to [Prometheus sharding](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/prometheus.md#horizontal-scaling-sharding).

## Prometheus: server returned HTTP status 404 Not Found: 404 page not found

If you see the following error in Prometheus logs:

```text
ts=2023-01-30T16:39:27.436Z caller=dedupe.go:112 component=remote level=error remote_name=2b2fa9 url=http://sumologic-sumologic-remote-write-proxy.sumologic.svc.cluster.local:9888/prometheus.metrics msg="non-recoverable error" count=194 exemplarCount=0 err="server returned HTTP status 404 Not Found: 404 page not found"
```

You would be required to change the following configurations:

- `kube-prometheus-stack.prometheus.prometheusSpec.remoteWrite`
- `kube-prometheus-stack.prometheus.prometheusSpec.additionalRemoteWrite`

So `url` starts with `http://$(METADATA_METRICS_SVC).$(NAMESPACE).svc.cluster.local.:9888`.

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

## OpenTelemetry: dial tcp: lookup collection-sumologic-metadata-logs.sumologic.svc.cluster.local.: device or resource busy

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

## OpenTelemetry Operator is Restarting after collection upgrade

If the OpenTelemetry operator is restarting after upgrade, and the following error can be found in the previous run logs:

```text
{"level":"error","ts":"2024-01-10T09:32:24Z","logger":"controller-runtime.source.EventHandler","msg":"if kind is a CRD, it should be installed before calling Start","kind":"OpAMPBridge.opentelemetry.io","error":"no matches for kind \"OpAMPBridge\" in version \"opentelemetry.io/v1alpha1\"","stacktrace":"sigs.k8s.io/controller-runtime/pkg/internal/source.(*Kind).Start.func1.1\n\t/home/runner/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.16.3/pkg/internal/source/kind.go:63\nk8s.io/apimachinery/pkg/util/wait.loopConditionUntilContext.func2\n\t/home/runner/go/pkg/mod/k8s.io/apimachinery@v0.28.4/pkg/util/wait/loop.go:73\nk8s.io/apimachinery/pkg/util/wait.loopConditionUntilContext\n\t/home/runner/go/pkg/mod/k8s.io/apimachinery@v0.28.4/pkg/util/wait/loop.go:74\nk8s.io/apimachinery/pkg/util/wait.PollUntilContextCancel\n\t/home/runner/go/pkg/mod/k8s.io/apimachinery@v0.28.4/pkg/util/wait/poll.go:33\nsigs.k8s.io/controller-runtime/pkg/internal/source.(*Kind).Start.func1\n\t/home/runner/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.16.3/pkg/internal/source/kind.go:56"}
```

It means that Custom Resource Definition has not been applied by Helm. It is [Helm known issue](https://helm.sh/docs/chart_best_practices/custom_resource_definitions/#some-caveats-and-explanations), and it has to be applied manually:

```shell
kubectl apply -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-helm-charts/opentelemetry-operator-0.44.0/charts/opentelemetry-operator/crds/crd-opentelemetry.io_opampbridges.yaml
```

## Hung/Stuck OpenTelemetryCollector K8s CRD

Run the following command to patch and delete CustomResourceDefinitions in Kubernetes:

```shell
kubectl patch crd/opentelemetrycollectors.opentelemetry.io -p '{"metadata":{"finalizers":[]}}' --type=merge
```

Run the following command to confirm that the finalizer has been removed:

```shell
kubectl get opentelemetrycollectors.opentelemetry.io -o yaml > my-resource.yaml
```

If the patch command doesn't work, edit the CRD to remove the finalizer:

```shell
kubectl edit crd opentelemetrycollectors.opentelemetry.io
```

Finally, delete the CRD:

```shell
kubectl delete crd/opampbridges.opentelemetry.io
```

## Using Sumo Logic Mock

Sumo Logic Mock is a debugging tool, which helps to see what exactly is being sent from the Sumo Logic Collection to Sumo Logic. It may help with finding if there are any missing metrics, logs, traces, or parts of them like labels or metadata.

:::note
Sumo Logic Mock is treated as an experimental tool and it may significantly change between every release.
:::

## Estimate ingestion using Sumo Logic Mock in local mode

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
- There were `1522` metrics data points, which means `1522 DPM`
- There were `44` logs (`0.000075 MB/s`)
- There were `17` spans

## Estimate ingestion while sending data to Sumo Logic

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

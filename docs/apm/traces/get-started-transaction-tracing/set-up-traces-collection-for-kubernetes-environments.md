---
id: set-up-traces-collection-for-kubernetes-environments
title: Set up Traces Collection for Kubernetes Environments
---

After installing or upgrading your Sumo Logic Kubernetes Collection, you will be able to send your traces directly to its endpoint using OpenTelemetry (as well as older formats like Jaeger or Zipkin).

Traces will be enhanced with Kubernetes metadata, similarly to the logs and metrics collected by the collector. See below for installation instructions.


## Prerequisites:

* Kubernetes 1.19+
* Helm 3.5+

:::sumo availability

<table>
<tr>
<td>Account Type</td>
<td>Account Level</td>
</tr>
<tr>
<td rowspan="2">Credits</td>
<td>Enterprise Operations and Enterprise Suite</td>
</tr>
<tr>
<td>Essentials get up to 5 GB a day </td>
</tr>
</table>
:::


## Installation process for Sumo Logic Tracing on Kubernetes

Installation is almost the same as for the official [SumoLogic Kubernetes Collection](https://github.com/SumoLogic/sumologic-kubernetes-collection), except a tracing flag (**`sumologic.traces.enabled=true`) needs to be enabled. The process follows using a Helm chart to set all required components. It will automatically download and configure [OpenTelemetry Collector,](https://github.com/SumoLogic/sumologic-otel-collector) which will collect, process, and export telemetry data to Sumo Logic.

In the following installation steps, we use the release name **`collection` and the namespace name `sumologic`. You can use any names you want, however, you'll need to adjust your installation commands to use your names since these names impact the OpenTelemetry Collector endpoint name.


### Collection architecture

Tracing data from your services is sent through multiple local OpenTelemetry Collectors/Agents, deployed as a DaemonSet on each Node, which buffers and sends data to a OpenTelemetry Collector gateway. Finally, the data is sent to the OpenTelemetry Collector helping to shape and trim the traffic, both running as a Deployment.



#### Setting up the most recent Sumo Logic Kubernetes Collection  


Refer to [install/upgrade instructions](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/v2.14.1/deploy/README.md#deployment-guide-for-2140-version) for the current version. To enable tracing, `sumologic.traces.enabled=true` flag must be included.

If you plan to [auto-instrument your Java, Python and JS applications in K8s environments](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes.md) (Beta), use the Helm command in that article.


#### Using command line


```bash
helm upgrade --install collection sumologic/sumologic \
  --namespace sumologic \
  --create-namespace \
  --set sumologic.accessId=<SUMO_ACCESS_ID> \
  --set sumologic.accessKey=<SUMO_ACCESS_KEY> \
  --set sumologic.clusterName="<MY_CLUSTER_NAME>" \
  --set sumologic.traces.enabled=true
```



### Using configuration file

We recommend you create a new `values.yaml` file for each Kubernetes cluster you wish to install collection on and **setting only the properties you wish to override**. For example:


```yaml
sumologic:
  accessId: <SUMO_ACCESS_ID>
  accessKey: <SUMO_ACCESS_KEY>
  clusterName: <MY_CLUSTER_NAME>
  traces:
    enabled: true
```


Once you have the config customized you can use the following commands to install or upgrade:


```bash
helm upgrade --install collection sumologic/sumologic \
  --namespace sumologic \
  --create-namespace \
  -f values.yaml
```



#### Enabling tracing for existing installations

Tracing is disabled by default. If you previously installed sumologic-kubernetes-collection 2.0 or higher without enabling tracing, it can be enabled with **`sumologic.traces.enabled=true`**.


#### Using command line

```bash
helm upgrade collection sumologic/sumologic \
  --namespace sumologic \
  ... \
  --set sumologic.traces.enabled=true
```



#### Using configuration file

The `values.yaml` file needs to have the relevant section enabled, such as:


```yaml
sumologic:
  ...
  traces:
    enabled: true
```


After updating the configuration file, the changes can be applied with the following:


```bash
helm upgrade --install collection sumologic/sumologic \
  --namespace sumologic \
  -f values.yaml
```


#### Pointing tracing clients (instrumentation exporters) to the agent collectors

Using OTLP HTTP is recommended:

* OTLP HTTP: `<CHART_NAME>-sumologic-otelagent.<NAMESPACE>:4318`

Alternatively, if required, you can use other supported formats as well:

* Jaeger GRPC: `<CHART_NAME>-sumologic-otelagent.<NAMESPACE>:14250`
* Jaeger Thrift HTTP: `<CHART_NAME>-sumologic-otelagent.<NAMESPACE>:14268`
* Jaeger Thrift Compact (UDP): `<CHART_NAME>-sumologic-otelagent.<NAMESPACE>:6831`
* Zipkin: `<CHART_NAME>-sumologic-otelagent.<NAMESPACE>:9411/api/v2/spans`
* OTLP gRPC: `<CHART_NAME>-sumologic-otelagent.<NAMESPACE>:4317`
* OTLP HTTP/**deprecated:** `<CHART_NAME>-sumologic-otelagent.<NAMESPACE>:55681`

For example, when the default release name (`collection`) and namespace (`sumologic`) is used, the endpoints are following:

* OTLP HTTP: `collection-sumologic-otelagent.sumologic:4318`
* Jaeger GRPC: `collection-sumologic-otelagent.sumologic:14250`
* Jaeger Thrift HTTP: `collection-sumologic-otelagent.sumologic:14268`
* Jaeger Thrift Compact (UDP): `collection-sumologic-otelagent.sumologic:6831`
* Zipkin: `collection-sumologic-otelagent.sumologic:9411/api/v2/spans`
* OTLP gRPC: `collection-sumologic-otelagent.sumologic:4317`
* OTLP HTTP/deprecated: `collection-sumologic-otelagent.sumologic:55681`


### Troubleshooting

#### Desired Kubernetes installation state


After enabling and installing tracing one should have additional Kubernetes resources:

* `otelcol` - collector responsible for forwarding data to Sumo Receiver
    * Deployment: `collection-sumologic-otelcol`
    * Pod: `collection-sumologic-otelcol-<hash>-<hash>`
    * Replica Set: `collection-sumologic-otelcol-<hash>`
    * Service: `collection-sumologic-otelcol`
    * Service: `collection-sumologic-otelcol-instr-metrics`
    * Service: `collection-sumologic-otelcol-headless`
    * Config Map: `collection-sumologic-otelcol`
* `otelagent `- collector responsible for data collection and tagging
    * Daemonset: `collection-sumologic-otelagent`
    * Pod on every node: `collection-sumologic-otelagent-<hash>`
    * Service: `collection-sumologic-otelagent`
    * Config Map: `collection-sumologic-otelagent`
* `otelgateway` - collector responsible for traces load balancing
    * Deployment: `collection-sumologic-otelgateway`
    * Pod: `collection-sumologic-otelgateway-<hash>-<hash>`
    * Replica Set: `collection-otelgateway-otelgat-<hash>`
    * Service: `collection-sumologic-otelgateway`
    * Config Map: `collection-sumologic-otelgateway`


#### How to verify traces are installed and working?

* There are no Kubernetes errors in the namespace sumologic.
* There are running pods `<CHART_NAME>-sumologic-otelcol-<hash>, <CHART_NAME>-sumologic-otelgateway-<hash>, <CHART_NAME>-sumologic-otelagent-<hash>`
* Kubernetes metadata tags (pod, replicaset, etc.) should be applied to all spans.
* The OpenTelemetry Collector can export metrics, which include information such as the number of spans exported. To enable, apply the `otelcol.metrics.enabled=true` flag when installing or upgrading the Collector, for example:

```bash
helm upgrade collection sumologic/sumologic \
  --namespace sumologic \
  ... \
  --set otelcol.metrics.enabled=true  
```

After enabling, several metrics starting with `otelcol_` will become available, such as `otelcol_exporter_sent_spans` and `otelcol_receiver_accepted_spans`.

* **OpenTelemetry Collector can have logging exporter enabled.** This will put on the output contents of spans (with some sampling above a certain rate). To enable, apply the following flags when installing/upgrading the collector (appending logging to the list of exporters):

    ```bash
    helm upgrade collection sumologic/sumologic \
      --namespace sumologic \
      ...
      --set otelcol.config.exporters.logging.logLevel=debug \
      --set otelcol.config.service.pipelines.traces.exporters="{otlphttp,logging}"

    ```


Having this enabled, `kubectl logs -n sumologic collection-sumologic-otelcol-<ENTER ACTUAL POD ID>` might yield the following output:

```yaml
    2020-03-09T10:47:28.861Z TraceData with 1 spans
    Node service name: carpogonial
    Node attributes:
    2020-03-09T10:47:28.861Z Span #0
      Trace ID    : 00000000000000004abaf4a8688cee33
      ID          : 1aad0bc2b44e8219
      Parent ID   :
      Name        : Carpoidea
      Kind        : CLIENT
      Start time  : seconds:1583750845 nanos:799855000
      End time    : seconds:1583751016 nanos:332705000
      Span attributes:
            -> zipkin.remoteEndpoint.ipv6: 5ab8:31e6:a7b:6205:13cb:a3fe:c180:ca26
            -> ip: 10.1.1.1
            -> zipkin.remoteEndpoint.port: 49088
            -> zipkin.remoteEndpoint.serviceName: carpogonial
            -> ipv4: 36.110.13.238
            -> ipv6: 5ab8:31e6:a7b:6205:13cb:a3fe:c180:ca26
            -> port: 49088
            -> zipkin.remoteEndpoint.ipv4: 36.110.13.238
```

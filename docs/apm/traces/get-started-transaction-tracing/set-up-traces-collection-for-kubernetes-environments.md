---
id: set-up-traces-collection-for-kubernetes-environments
title: Set up Traces Collection for Kubernetes Environments
sidebar_label: Kubernetes Environment Setup
description: Learn how to install the Sumo Logic Kubernetes Collection and send enhanced traces using OpenTelemetry.
---

After installing or upgrading your Sumo Logic Kubernetes Collection, you will be able to send your traces directly to its endpoint using OpenTelemetry (as well as older formats like Jaeger or Zipkin).

Traces will be enhanced with Kubernetes metadata, similarly to the logs and metrics collected by the collector. See below for installation instructions.

## Prerequisites

* Kubernetes 1.25+
* Helm 3.5+

| Account Type | Account Level         |
|:--------------|:--------------------------|
| Credits    | Enterprise Operations and Enterprise Suite<br/>Essentials get up to 5 GB a day |

## Installing Sumo Logic Tracing on Kubernetes

Installation is the same as for the official [Sumo Logic Kubernetes Collection](https://github.com/SumoLogic/sumologic-kubernetes-collection). The process uses a Helm chart to set all required components. It will automatically download and configure the [OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector), which will collect, process, and export telemetry data to Sumo Logic.

In the following installation steps, we use the release name `collection` and the namespace name `sumologic`. You can use any names you want, however, you'll need to adjust your installation commands to use your names since these names impact the OpenTelemetry Collector endpoint name.

:::note
 If you're upgrading from Sumo Logic Kubernetes Collection:
  - `v2.x` to `v3.x`, see [Sumo Logic Kubernetes Collection Migration Guide v3](/docs/send-data/kubernetes/v3/how-to-upgrade.md)
  - `v3.x` to `v4.x`, see [Sumo Logic Kubernetes Collection Migration Guide v4](/docs/send-data/kubernetes/v4/how-to-upgrade.md)
:::

### Collection architecture

Tracing data from your services is sent through multiple local OpenTelemetry Collectors/Agents, deployed as a StatefulSet (`otelcol-instrumentation`), which buffers and sends data to a OpenTelemetry Collector gateway (`traces-gateway`). Finally, the data is sent to the OpenTelemetry Collector (`traces-sampler`) helping to shape and trim the traffic, both running as a Deployment.

### Installing or upgrading to the latest version

Refer to [install/upgrade instructions](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/v4.9.0/docs/installation.md) for the current version. Tracing is enabled by default.

If you plan to [auto-instrument your Java, Python, and JS applications in K8s environments](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes.md), use the Helm command in that article.

#### Using the command line

```bash
helm upgrade --install collection sumologic/sumologic \
  --namespace sumologic \
  --create-namespace \
  --set sumologic.accessId=<SUMO_ACCESS_ID> \
  --set sumologic.accessKey=<SUMO_ACCESS_KEY> \
  --set sumologic.clusterName="<MY_CLUSTER_NAME>"
```

#### Using a configuration file

We recommend creating a new `values.yaml` file for each Kubernetes cluster you wish to install collection on and **setting only the properties you wish to override**. For example:

```yaml
sumologic:
  accessId: <SUMO_ACCESS_ID>
  accessKey: <SUMO_ACCESS_KEY>
  clusterName: <MY_CLUSTER_NAME>
```

Once you've customized your config, you can use the following commands to install or upgrade:

```bash
helm upgrade --install collection sumologic/sumologic \
  --namespace sumologic \
  --create-namespace \
  -f values.yaml
```

### Enabling tracing for existing installations

If you previously installed sumologic-kubernetes-collection `v2.x` without enabling tracing, it can be enabled with **`sumologic.traces.enabled=true`**.

#### Using command line

```bash
helm upgrade --install collection sumologic/sumologic \
  --namespace sumologic \
  ... \
  --set sumologic.traces.enabled=true
```

#### Using a configuration file

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

### Custom configuration

Every customization to your collector configuration should be applied using keys `config.merge` or `config.override`:
  - **For `otelcolInstrumentation`**. Use `otelcolInstrumentation.config.merge`, which will merge provided configuration to [default configuration](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/tests/helm/testdata/goldenfile/otelcol-instrumentation-config/traces-gateway-enabled.output.yaml#L15) or `otelcolInstrumentation.config.override`, which will override the whole configuration.
  - **For `tracesGateway`**. Use `tracesGateway.config.merge`, which will merge provided configuration to [default configuration](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/tests/helm/testdata/goldenfile/traces-gateway-loadbalancing/traces-gateway-true.output.yaml#L14) or `tracesGateway.config.override` which will override the whole configuration.
  - **For `tracesSampler`**. Use `tracesSampler.config.merge`, which will merge provided configuration to [default configuration](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/tests/helm/testdata/goldenfile/traces-sampler/simple.output.yaml#L14) or `tracesSampler.config.override`, which will override the whole configuration.

### Pointing tracing clients (instrumentation exporters) to the agent collectors

Using OTLP HTTP is recommended:

* OTLP HTTP: `<RELEASE_NAME>-sumologic-otelagent.<NAMESPACE>:4318`

Alternatively, if required, you can use other supported formats as well:

* OTLP gRPC: `<RELEASE_NAME>-sumologic-otelagent.<NAMESPACE>:4317`
* OpenCensus: `<RELEASE_NAME>-sumologic-otelagent.<NAMESPACE>:55678`
* Jaeger GRPC: `<RELEASE_NAME>-sumologic-otelagent.<NAMESPACE>:14250`
* Jaeger Thrift HTTP: `<RELEASE_NAME>-sumologic-otelagent.<NAMESPACE>:14268`
* Jaeger Thrift Compact (UDP): `<RELEASE_NAME>-sumologic-otelagent.<NAMESPACE>:6831`
* Jaeger Thrift Binary: `<RELEASE_NAME>-sumologic-otelagent.<NAMESPACE>:6832`
* Zipkin: `<RELEASE_NAME>-sumologic-otelagent.<NAMESPACE>:9411/api/v2/spans`

For example, when the default release name (`collection`) and namespace (`sumologic`) is used, the endpoints are following:

* OTLP HTTP: `collection-sumologic-otelagent.sumologic:4318`
* OTLP gRPC: `collection-sumologic-otelagent.sumologic:4317`
* OpenCensus: `collection-sumologic-otelagent.sumologic:55678`
* Jaeger GRPC: `collection-sumologic-otelagent.sumologic:14250`
* Jaeger Thrift HTTP: `collection-sumologic-otelagent.sumologic:14268`
* Jaeger Thrift Compact (UDP): `collection-sumologic-otelagent.sumologic:6831`
* Jaeger Thrift Binary: `collection-sumologic-otelagent.sumologic:6832`
* Zipkin: `collection-sumologic-otelagent.sumologic:9411/api/v2/spans`

:::note
`<RELEASE_NAME>-sumologic-otelagent` could be truncated. We truncate at 63 characters because some Kubernetes name fields are limited to this (by the DNS naming spec). To avoid this, keep your `<RELEASE_NAME>` short. To check the final endpoint name, list all services from `<NAMESPACE>` and look for services with configured ports from the list above.
:::

## Troubleshooting

### Desired Kubernetes installation state

After enabling and installing tracing, you should have additional Kubernetes resources:

* `otelcol-instrumentation` - collector responsible for data collection and tagging
  * StatefulSet: `collection-sumologic-otelcol-instrumentation`
  * Pod: `collection-sumologic-otelcol-instrumentation-<hash>`
  * Service: `collection-sumologic-otelagent`
  * Service (**`deprecated`**): `collection-sumologic-otelcol`
  * Config Map: `collection-sumologic-otelcol-instrumentation`
* `traces-gateway` - collector responsible for traces load balancing
  * Deployment: `collection-sumologic-traces-gateway`
  * Pod: `collection-sumologic-traces-gateway-<hash>-<hash>`
  * Replica Set: `collection-sumologic-traces-gateway-<hash>`
  * Service: `collection-sumologic-traces-gateway`
  * Config Map: `collection-sumologic-traces-gateway`
* `traces-sampler` - collector responsible for forwarding data to Sumo Receiver
  * Deployment: `collection-sumologic-traces-sampler`
  * Pod: `collection-sumologic-traces-sampler-<hash>-<hash>`
  * Replica Set: `collection-sumologic-traces-sampler-<hash>`
  * Service: `collection-sumologic-traces-sampler-headless`
  * Config Map: `collection-sumologic-traces-sampler`

### How to verify traces are installed and working

* There are no Kubernetes errors in the namespace sumologic.
* There are running pods `<RELEASE_NAME>-sumologic-otelcol-instrumentation-<hash>, <RELEASE_NAME>-sumologic-traces-gateway-<hash>, <RELEASE_NAME>-sumologic-traces-sampler-<hash>`
* Kubernetes metadata tags such as `pod` and `replicaset` should be applied to all spans.
* The OpenTelemetry Collector can export metrics, which include information such as the number of spans exported. Several metrics starting with `otelcol_` will become available, such as `otelcol_exporter_sent_spans` and `otelcol_receiver_accepted_spans`.
* **OpenTelemetry Collector can have Debug exporter enabled.** This will put on the output contents of spans (with some sampling above a certain rate). To enable, apply the following flags when installing/upgrading the collector (appending `debug` to the list of exporters):

    ```bash
    helm upgrade collection sumologic/sumologic \
      --namespace sumologic \
      ...
      --set tracesSampler.config.exporters.debug.verbosity=detailed \
      --set tracesSampler.config.service.pipelines.traces.exporters="{otlphttp,debug}"
    ```

  Having this enabled, `kubectl logs -n sumologic collection-sumologic-traces-sampler-<ENTER ACTUAL POD ID>` might yield the following output:

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

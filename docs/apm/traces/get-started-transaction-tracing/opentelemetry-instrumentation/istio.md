---
id: istio
title: Istio OpenTelemetry auto-instrumentation
sidebar_label: Istio
description: Learn how to instrument OpenTelemetry Application code to collect Istio trace data generated from Envoy proxies.
---

OpenTelemetry Collector gives you the ability to collect Istio trace data and forward it to Sumo Logic.

[Istio](https://istio.io/latest/) is a popular service mesh technology using Envoy proxy technology that provides out-of-the-box tracing generation from its sidecars. Although its tracing capabilities cannot fully replace visibility that  you can obtain by collecting traces by instrumenting the application code directly, it can provide some additional details to delays introduced by sidecar proxies that will generate its own specific spans.

You'll still need to instrument with OpenTelemetry for full functionality. Istio will enhance the data received from the OpenTelemetry instrumentation.

## Configuration

To send data to Sumo Logic collector either in a Kubernetes or standalone setup, configure the OpenCensus Agent (recommended due to simpler setup) or Zipkin (if for any reason that’s your preference) exporter and send this data to the associated collector port. Enable one of the exporters setting **meshConfig** options in Envoy proxies.

### OpenCensus Agent exporter

Set `meshConfig.enableTracing=true` and `meshConfig.defaultConfig.tracing.openCensusAgent.address=` to the endpoint of the receiving collector:

* For [*Kubernetes collectors*](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments.md):  
    ```
    --set meshConfig.enableTracing=true
    --set meshConfig.defaultConfig.tracing.openCensusAgent.address=RELEASE_NAME-CHART_NAME-otelagent.NAMESPACE:55678
    ```
* For [standalone collectors](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments.md):  
    ```
    --set meshConfig.enableTracing=true
    --set meshConfig.defaultConfig.tracing.openCensusAgent.address=HOSTNAME:55678
    ```

:::note
OpenCensus agent by default uses **W3C** context propagation same as OpenTelemetry. It means no additional effort with setting context propagation on the OT instrumentation level. 
:::

### Zipkin exporter

Set `meshConfig.enableTracing=true` and `meshConfig.defaultConfig.tracing.zipkin.address=` to the URL of Sumo
receiving collector:

* For [*Kubernetes collectors*](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments.md):  
    ```
    --set meshConfig.enableTracing=true
    --set meshConfig.defaultConfig.tracing.zipkin.address=RELEASE_NAME-CHART_NAME-otelagent.NAMESPACE:9411
    ```
* For [*standalone collectors*](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments.md):  
    ```
    --set meshConfig.enableTracing=true
    --set meshConfig.defaultConfig.tracing.zipkin.address=HOSTNAME:9411
    ```

:::note
In case of usage of Zipkin exporter with OpenTelemetry instrumented application it is recommended to configure on the application instrumentation level B3 propagation. Please see the instructions below.
:::

### Reconfigure OpenTelemetry to use B3 - Zipkin exporter

[Istio uses an older propagation standard](https://www.envoyproxy.io/docs/envoy/v1.12.0/intro/arch_overview/observability/tracing#trace-context-propagation) for Zipkin’s exporter. Fortunately though there's an opt-in backward
compatibility option to [*enable b3 format in OT*](https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk-extensions/autoconfigure/README.md#propagator) which should be done to connect Istio spans to the rest of the trace.

Without this there will be a lack of context propagation between different services, after enabling span export on Istio.

You can reconfigure OpenTelemetry instrumentation to use b3 in addition to W3C context propagation.

:::note
Before proceeding make sure you have the most recent versions of instrumentations and collectors in place.
:::

The following is a Java example to set up b3 context propagation. Add the following parameter to JVM environment variables or command line:

```
OTEL_PROPAGATORS=b3,tracecontext,baggage 
```

For example:

```
JAVA_TOOL_OPTIONS="-javaagent:path/to/opentelemetry-javaagent.jar"
OTEL_TRACES_EXPORTER=otlp
OTEL_PROPAGATORS=b3,tracecontext,baggage
OTEL_EXPORTER_OTLP_ENDPOINT=http://OPENTELEMETRY_COLLECTOR_HOSTNAME:4317OTEL_SERVICE_NAME=SERVICE_NAME
OTEL_RESOURCE_ATTRIBUTES=application=YOUR_APP_NAME
```

Or

```
java -javaagent:path/to/opentelemetry-javaagent.jar \
    -Dotel.traces.exporter=otlp \
    -Dotel.exporter.otlp.endpoint=http://OPENTELEMETRY_COLLECTOR_HOSTNAME:4317 \
-Dotel.propagators=b3,tracecontext,baggage \
    -Dotel.service.name=SERVICE_NAME
-Dotel.resource.attributes=application=YOUR_APP_NAME \
    ...
```

### Distributed Tracing customization

See the [Configure tracing using MeshConfig and Pod annotations](https://istio.io/latest/docs/tasks/observability/distributed-tracing/configurability/mesh-and-proxy-config/) guide for information to configure any advanced capabilities on span data generation from Istio, such as probabilistic sampling, extending the length of some fields, or adding custom metadata/annotations to spans.

## Troubleshooting

Every action requires restart of the pods involved in tracing.

1. Validate if **meshConfig** options are properly configured. Execute:   

    ```
    kubectl get configmap istio –namespace istio-system –output "jsonpath={.data['mesh']}"
    ```

    Example output:

    ![istio1.png](/img/traces/istio1.png)  

    Check if correct values are set for `enableTracing` and `defaultConfig.tracing.EXPORTER_NAME.address`. If OpenCensus was configured, then Zipkin by default points to an Istio endpoint.

1. Make sure the namespace is labeled. More details about sidecar injection can be found [here](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/). To check if namespace is labeled, execute:  

    ```
    kubectl get namespace -L istio-injection
    ```

    ![istio2.png](/img/traces/istio2.png)  

1. Make sure the `namespace` in which the application is running `istio-injection` label is set as `enabled`. If label value is disabled or not set then run:  

    ```
    kubectl label namespace NAMESPACE_NAME istio-injection=enabled --overwrite
    ```

1. Check if exporter configuration was used by the sidecar container. To see the logs of istio-proxy container and look for values provided in the meshConfig, execute:  

    ```
    kubectl logs -n NAMESPACE POD_NAME istio-proxy
    ```

    Example output:  

    ![istio3.png](/img/traces/istio3.png)

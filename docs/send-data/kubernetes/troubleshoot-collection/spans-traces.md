---
id: spans-traces
title: Troubleshooting Kubernetes Spans and Traces Collection
description: Learn how to diagnose and resolve common Kubernetes collection issues, including missing data, pod failures, Prometheus errors, and OpenTelemetry configuration problems.
---


## Check instrumentation content

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

## View traces being sent to Sumo Logic

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

## Auto-instrumentation (tracing)

The environment variables injected into a pod by Java auto-instrumentation are shown below.

```yaml
Environment:
      OTEL_NODE_IP:                         (v1:status.hostIP)
      OTEL_POD_IP:                          (v1:status.podIP)
      OTEL_METRICS_EXPORTER:               otlp
      OTEL_TRACES_EXPORTER:                otlp
      OTEL_EXPORTER_OTLP_PROTOCOL:         http/protobuf
      OTEL_EXPORTER_OTLP_ENDPOINT:         http://sumo-sumologic-otelagent.observability:4318
      JAVA_TOOL_OPTIONS:                    -javaagent:/otel-auto-instrumentation-java/javaagent.jar
      OTEL_APPLICATION_NAMESPACE_NAME:     default
      OTEL_SERVICE_NAME:                   java-app
      OTEL_RESOURCE_ATTRIBUTES_POD_NAME:   java-app-58cdff4f7b-2zv5q (v1:metadata.name)
      OTEL_RESOURCE_ATTRIBUTES_NODE_NAME:   (v1:spec.nodeName)
      OTEL_PROPAGATORS:                    tracecontext,baggage
      OTEL_RESOURCE_ATTRIBUTES:            application=default,k8s.container.name=javaapp,k8s.deployment.name=java-app,k8s.namespace.name=default,k8s.node.name=$(OTEL_RESOURCE_ATTRIBUTES_NODE_NAME),k8s.pod.name=$(OTEL_RESOURCE_ATTRIBUTES_POD_NAME),k8s.replicaset.name=java-app-58cdff4f7b,service.instance.id=default.$(OTEL_RESOURCE_ATTRIBUTES_POD_NAME).javaapp,service.version=main
```

:::note
Ensure that the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable is set to `http://sumo-sumologic-otelagent.observability:4318` to allow proper communication with the OpenTelemetry Collector.

Where `sumo` is the release name and `observability` is the release namespace.
:::

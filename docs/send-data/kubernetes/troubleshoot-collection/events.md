---
id: events
title: Troubleshooting Kubernetes Events Collection
description: Troubleshoot issues that prevent Kubernetes events from being collected or forwarded to Sumo Logic.
---

Here's how to troubleshoot issues that prevent Kubernetes events from being collected or forwarded to Sumo Logic.

## Check events body

You can print events on stdout of events collector pod, and validate if they are correct.

In order to print them on stdout, follow the steps below:

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

## View events being sent to Sumo Logic

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

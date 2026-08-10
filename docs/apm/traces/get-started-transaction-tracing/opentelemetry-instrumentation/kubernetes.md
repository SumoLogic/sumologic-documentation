---
id: kubernetes
title: Kubernetes Tracing OpenTelemetry auto-instrumentation
sidebar_label: Kubernetes
---

Setting up Tracing instrumentation for Java, Python, NodeJS, and .NET applications deployed in Kubernetes just got easier. In a few simple steps, with the [OpenTelemetry-Operator](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-operator), your application is automatically instrumented and your traces are sent to Sumo.

## Installation

To enable the OpenTelemetry-Operator for the [Sumo Logic Kubernetes Collection](https://github.com/SumoLogic/sumologic-kubernetes-collection#sumologic-kubernetes-collection), you have to set `opentelemetry-operator.enabled=true`.

The OpenTelemetry Operator needs to know how to instrument containers. For this purpose, the `Instrumentation` resource must be created in the namespace where you want to use auto-instrumentation. Setting `instrumentation.createDefaultInstrumentation` to `true` and `instrumentation.instrumentationNamespaces` will help with that.

The value of the flag `instrumentation.instrumentationNamespaces` is backslash comma-separated namespaces list. For example: `instrumentation.instrumentationNamespaces="ns1\,ns2\,ns3"`.

1. Update dependencies:

 ```bash
 $ helm dependency update
 ```

2. Installation/upgrade enabling operator and setting namespaces to watch. You can find more details about installing an OT collector in Kubernetes environments [here](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments).

 ```bash
 $ helm upgrade --install collection sumologic/sumologic \
 --namespace sumologic \
 --create-namespace \
 --set sumologic.accessId="<SUMO_ACCESS_ID>" \
 --set sumologic.accessKey="<SUMO_ACCESS_KEY>" \
 --set sumologic.clusterName="<MY_CLUSTER_NAME>" \
 --set sumologic.traces.enabled=true \
 --set opentelemetry-operator.enabled=true \
 --set instrumentation.createDefaultInstrumentation=true \
 --set instrumentation.instrumentationNamespaces="ns1\,ns2"
 ```

During the installation process, **OpenTelemetry Instrumentation** custom resources with all settings are deployed in the provided namespaces.

:::note
Updating the Sumo Logic Kubernetes Collection to a version newer than [4.8.0](https://github.com/SumoLogic/sumologic-kubernetes-collection/releases/tag/v4.8.0) may cause issues with chart installation if there is a customized configuration of the OpenTelemetry Operator. Refer to the required changes in the [parameters](https://github.com/SumoLogic/sumologic-kubernetes-collection/pull/3733/).
:::

## Auto-instrumentation injection

To enable injecting tracing auto-instrumentation, it is required to add an OpenTelemetry-specific annotation to the **Deployment**, **Statefulset** or **Namespace**.

List of annotations per instrumented language:

* **Java** auto-instrumentation - `instrumentation.opentelemetry.io/inject-java: "true"`
* **Python** auto-instrumentation - `instrumentation.opentelemetry.io/inject-python: "true"`
* **NodeJS** auto-instrumentation - `instrumentation.opentelemetry.io/inject-nodejs: "true"`
* **.Net** auto-instrumentation - `instrumentation.opentelemetry.io/inject-dotnet: "true"`

:::note
.Net auto-instrumentation is in **Beta** stage.
:::

In the case of a Pod with multiple containers inside, you must specify additional annotation (`instrumentation.opentelemetry.io/container-names`), which will take a comma-separated list of the container names as its value. If annotation for multiple containers is not set, the instrumentation will be provided to the first container on the list.

## Compatibility matrix

Auto-instrumentation images injected by Sumo Logic and their runtime compatibility:

| Language | Image Tag | Minimum Runtime Version |
|:---------|:----------|:-----------------------|
| Java | 2.27.0 | Java 8+ |
| .NET | 1.15.0 | .NET 8+ |
| Python | 0.48b0 | Python 3.8+ |
| Node.js | 0.74.0 | Node.js 18.19.0+ or 20.6.0+ |

## Examples

### Java auto-instrumentation for Namespace

```yml
apiVersion: v1
kind: Namespace
metadata:
 name: my-namespace
 labels:
   name: my-namespace
 annotations:
   instrumentation.opentelemetry.io/inject-java: "true"
```

### Python auto-instrumentation for Deployment

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: my-app
 namespace: my-namespace
spec:
 selector:
   matchLabels:
     app: my-app
 replicas: 1
 template:
   metadata:
     labels:
       app: my-app
     name: my-app
     annotations:
       instrumentation.opentelemetry.io/inject-python: "true"
   spec:
     containers:
       - image: my-image
```

### NodeJS auto-instrumentation for Statefulset

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
 name: my-app
 namespace: my-namespace
spec:
 selector:
   matchLabels:
     app: my-app
 replicas: 1
 template:
   metadata:
     labels:
       app: my-app
     name: my-app
     annotations:
       instrumentation.opentelemetry.io/inject-nodejs: "true"
   spec:
     containers:
       - image: my-image
```

### Java auto-instrumentation for Deployment with multiple containers

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: my-app
 namespace: my-namespace
spec:
 selector:
   matchLabels:
     app: my-app
 replicas: 1
 template:
   metadata:
     labels:
       app: my-app
     name: my-app
     annotations:
       instrumentation.opentelemetry.io/inject-java: "true"
       instrumentation.opentelemetry.io/container-names: "my-container1,my-container2"
   spec:
     containers:
       - name: my-container1
```

## Configuration

To have meaningful or intuitive data to search, you need to make some changes to the default configuration. You can make these customizations through additional environment variables in container definitions.

Environment variables:

* `OTEL_SERVICE_NAME` - if this parameter is not set, the default service name assumes the name of Deployment, Statefulset, or other PodSpec object name. This ensures their names represent some business logic, such as `FinanceServiceCall`. This will appear as a tracing service name in Sumo Logic. If you'd like to manually set a service name, add `OTEL_SERVICE_NAME` in env variables section of container configuration. For example:  

  ```yaml
  spec:
    containers:
    - image: my-image
      env:
        - name: OTEL_SERVICE_NAME
          value: FinanceServiceCall
  ```

* `OTEL_RESOURCE_ATTRIBUTES` - if this parameter is not set, the default application name assumes the name of Namespace. This will appear as a tracing application name in Sumo Logic. If you'd like to manually set the application name, add  `OTEL_RESOURCE_ATTRIBUTES` `application=name` in the environment variables section of container configuration. You can add additional attributes here as comma separated key=value pairs (i.e., `application=my-app,key=value`):

  ```yaml
  spec:
    containers:
    - image: my-image
      env:
        - name: OTEL_RESOURCE_ATTRIBUTES
          value: application=my-app,key=value
  ```

* Other parameters:
  * **OTEL_PROPAGATORS.** If not provided, the operator sets the default value `tracecontext,baggage`. Some additional context propagators can be enabled (b3 - common for service meshes, xray - used by AWS services).
  * **OTEL_TRACES_SAMPLER.** Default value: `always_on`. For details, see other sampling possibilities [here](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#Sampling).

## Custom OpenTelemetry Operator Instrumentation resource

You might want to create a custom `Instrumentation` resource. For more info, see the [`Instrumentation` object schema](https://github.com/open-telemetry/opentelemetry-operator/blob/v0.63.1/apis/v1alpha1/instrumentation_types.go) and [example usage](https://github.com/open-telemetry/opentelemetry-operator/tree/v0.63.1#opentelemetry-auto-instrumentation-injection).
In the case of defining an endpoint to export telemetry data from instrumented application, follow the pattern `RELEASE_NAME-CHART_NAME-otelagent.RELEASE_NAMESPACE` (e.g., `collection-sumologic-otelagent.sumologic`).

Make sure supported auto-instrumentation images are used:

* `dotnet` - ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-dotnet:1.15.0
* `java` - ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:2.27.0
* `nodejs` - ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-nodejs:0.74.0
* `python` - ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-python:0.48b0

## Logs ingestion via auto-instrumentation

By default, the Sumo Logic Kubernetes Collection chart collects container logs by scraping log files from `/var/log/pods/` on each node (via the logs collector DaemonSet). You can alternatively ingest application logs directly via OpenTelemetry auto-instrumentation, where the OTel SDK inside the application sends structured log records over OTLP to the `otelcol-instrumentation` StatefulSet.

:::tip Key difference
File-based collection captures everything written to stdout/stderr. Auto-instrumentation log export captures structured log records emitted through the application's logging framework (for example, SLF4J, Python logging, Bunyan). Log records include full semantic context — trace IDs, span IDs, severity, and attributes.
:::

### Enable the logs pipeline on otelcol-instrumentation

The `otelcol-instrumentation` StatefulSet handles traces and metrics by default. To add logs support, use `otelcolInstrumentation.config.merge` to add a logs exporter and pipeline:

```yaml
otelcolInstrumentation:
  statefulset:
    extraEnvVars:
      - name: SUMO_ENDPOINT_DEFAULT_OTLP_LOGS_SOURCE
        valueFrom:
          secretKeyRef:
            name: sumologic
            key: endpoint-logs-otlp
  config:
    merge:
      processors:
        ## The source processor uses %{k8s.pod.hostname} to set _sourceHost,
        ## but k8sattributes only extracts k8s.node.name (not k8s.pod.hostname).
        ## This processor copies the node name so _sourceHost is populated
        ## correctly instead of showing "undefined".
        resource/set_hostname:
          attributes:
            - key: k8s.pod.hostname
              from_attribute: k8s.node.name
              action: upsert
      exporters:
        sumologic/logs:
          endpoint: ${SUMO_ENDPOINT_DEFAULT_OTLP_LOGS_SOURCE}
          log_format: otlp
          compression: gzip
          max_request_body_size: 1048576
          sending_queue:
            enabled: true
            num_consumers: 10
            queue_size: 10000
            storage: file_storage
      extensions:
        file_storage:
          directory: /var/lib/storage/otc
          timeout: 10s
          compaction:
            on_rebound: true
            directory: /tmp
      service:
        extensions:
          - health_check
          - pprof
          - file_storage
        pipelines:
          logs:
            receivers:
              - otlp
            processors:
              - memory_limiter
              - k8sattributes
              - resource/set_hostname
              - source
              - resource
              - batch
            exporters:
              - sumologic/logs
```

:::note
The `resource/set_hostname` processor is required because the `source` processor expects a `k8s.pod.hostname` attribute to populate `_sourceHost`, but the `k8sattributes` processor only extracts `k8s.node.name`. Without this processor, `_sourceHost` will appear as "undefined" in Sumo Logic.
:::

### Enable log export per language

Each language SDK requires specific environment variables to enable log export via OTLP. Configure these under the `instrumentation` section in your Helm values.

#### Java

```yaml
instrumentation:
  java:
    traces:
      enabled: true
    metrics:
      enabled: true
    extraEnvVars:
      - name: OTEL_LOGS_EXPORTER
        value: otlp
```

The Java agent automatically bridges Logback and Log4j2 when `OTEL_LOGS_EXPORTER=otlp` is set. No application code changes are needed. Log records include trace context (`trace_id`, `span_id`) automatically.

#### Python

```yaml
instrumentation:
  python:
    traces:
      enabled: true
    metrics:
      enabled: true
    extraEnvVars:
      - name: OTEL_LOGS_EXPORTER
        value: otlp
      - name: OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED
        value: "true"
```

:::note
Setting `OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true` enables automatic bridging of Python's standard `logging` module to OpenTelemetry. All `logging.getLogger()` calls emit OTel log records with trace context when emitted within an active span.
:::

#### Node.js

```yaml
instrumentation:
  nodejs:
    traces:
      enabled: true
    metrics:
      enabled: true
    extraEnvVars:
      - name: OTEL_LOGS_EXPORTER
        value: otlp
      - name: OTEL_NODE_ENABLED_INSTRUMENTATIONS
        value: "bunyan,pino,winston"
```

:::note
Node.js auto-instrumentation supports Bunyan, Pino, and Winston logging libraries. Set `OTEL_NODE_ENABLED_INSTRUMENTATIONS` to include the specific logging library your application uses. `console.log` is **not** captured — only structured logging frameworks are supported.
:::

#### .NET

```yaml
instrumentation:
  dotnet:
    traces:
      enabled: true
    metrics:
      enabled: true
    extraEnvVars:
      - name: OTEL_LOGS_EXPORTER
        value: otlp
      - name: OTEL_DOTNET_AUTO_LOGS_INCLUDE_FORMATTED_MESSAGE
        value: "true"
```

.NET auto-instrumentation bridges `ILogger` (Microsoft.Extensions.Logging) automatically. Setting `OTEL_DOTNET_AUTO_LOGS_INCLUDE_FORMATTED_MESSAGE=true` ensures the formatted log message is included in the log body. Log records include trace context via `Activity.Current`.

#### Go

Go does **not** support auto-instrumentation for logs. The OpenTelemetry Go SDK requires manual instrumentation. For Go applications, continue using file-based log collection or manually configure the OTel log SDK in your application.

### Fault tolerance

#### Persistent Queue (file_storage)

When the Sumo Logic backend is unavailable (503s, maintenance windows), logs queue up in memory. Without persistence, a pod restart loses all queued data. The configuration above includes `file_storage` extension with `sending_queue.storage: file_storage` to persist the queue to disk.

To size the PVC appropriately:

```yaml
otelcolInstrumentation:
  statefulset:
    persistence:
      enabled: true
      size: 10Gi
```

**Sizing guidance:**
- Estimate: (log volume per second) × (max outage duration) × safety factor
- Example: 1MB/s × 3600s × 2 = ~7GB
- Monitor the `otelcol_exporter_queue_size` metric to track queue depth

#### Resource scaling

When all pods in the cluster send logs via auto-instrumentation, the `otelcol-instrumentation` StatefulSet must handle significantly more data:

```yaml
otelcolInstrumentation:
  statefulset:
    replicaCount: 3
    resources:
      limits:
        memory: 4Gi
        cpu: 2000m
      requests:
        memory: 1Gi
        cpu: 500m
    autoscaling:
      enabled: true
      minReplicas: 3
      maxReplicas: 10
      targetCPUUtilizationPercentage: 70
      targetMemoryUtilizationPercentage: 70
```

**Recommendation:** Start with 2-4GB memory per replica, 3 replicas, and HPA enabled. Monitor `container_memory_working_set_bytes` and adjust based on actual usage.

### Avoiding duplicate logs

When auto-instrumentation log export is enabled alongside file-based log collection, the same log message can appear twice in Sumo Logic — once from the logs collector DaemonSet (scraped from stdout/stderr files) and once from the otelcol-instrumentation pipeline (sent via OTLP from the SDK).

**Recommended approach:** Exclude instrumented namespaces from file-based collection:

```yaml
sumologic:
  logs:
    container:
      excludeNamespaceRegex: "^(app-prod|app-staging)$"
```

Use the same namespace list in both `instrumentation.instrumentationNamespaces` and `excludeNamespaceRegex` to keep them aligned.

:::note
If auto-instrumentation fails for a pod (SDK not injected, initialization error), logs from that pod will not be collected by either path. If reliability is critical, you can keep both paths active and use a resource attribute to distinguish sources for deduplication in Sumo Logic.
:::

### Complete example

A cluster where namespaces `app-prod` and `app-staging` have Java and Python apps with auto-instrumented logs, and all other namespaces use file-based log collection:

```yaml
opentelemetry-operator:
  enabled: true

instrumentation:
  createDefaultInstrumentation: true
  instrumentationNamespaces: "app-prod,app-staging"
  java:
    traces:
      enabled: true
    metrics:
      enabled: true
    extraEnvVars:
      - name: OTEL_LOGS_EXPORTER
        value: otlp
  python:
    traces:
      enabled: true
    metrics:
      enabled: true
    extraEnvVars:
      - name: OTEL_LOGS_EXPORTER
        value: otlp
      - name: OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED
        value: "true"

otelcolInstrumentation:
  statefulset:
    replicaCount: 3
    resources:
      limits:
        memory: 4Gi
        cpu: 2000m
      requests:
        memory: 1Gi
        cpu: 500m
    extraEnvVars:
      - name: SUMO_ENDPOINT_DEFAULT_OTLP_LOGS_SOURCE
        valueFrom:
          secretKeyRef:
            name: sumologic
            key: endpoint-logs-otlp
  config:
    merge:
      processors:
        resource/set_hostname:
          attributes:
            - key: k8s.pod.hostname
              from_attribute: k8s.node.name
              action: upsert
      exporters:
        sumologic/logs:
          endpoint: ${SUMO_ENDPOINT_DEFAULT_OTLP_LOGS_SOURCE}
          log_format: otlp
          compression: gzip
          max_request_body_size: 1048576
          sending_queue:
            enabled: true
            num_consumers: 10
            queue_size: 10000
            storage: file_storage
      extensions:
        file_storage:
          directory: /var/lib/storage/otc
          timeout: 10s
          compaction:
            on_rebound: true
            directory: /tmp
      service:
        extensions:
          - health_check
          - pprof
          - file_storage
        pipelines:
          logs:
            receivers:
              - otlp
            processors:
              - memory_limiter
              - k8sattributes
              - resource/set_hostname
              - source
              - resource
              - batch
            exporters:
              - sumologic/logs

sumologic:
  logs:
    container:
      excludeNamespaceRegex: "^(app-prod|app-staging)$"
```

### Limitations

* **Go** — No auto-instrumentation support for logs. Requires manual SDK integration.
* **Console output** — `console.log` (Node.js), `System.out.println` (Java), `print()` (Python) are NOT captured by auto-instrumentation. Only structured logging frameworks are supported.
* **Startup logs** — Logs emitted before the OTel SDK initializes (e.g., during class loading) may be lost. File-based collection captures these.
* **Sidecar/init containers** — Only the main application container is instrumented. Sidecar and init container logs require file-based collection.
* **Log volume** — High-volume logging (>1000 lines/sec per pod) may require significant memory for the sending queue. Monitor and scale accordingly.


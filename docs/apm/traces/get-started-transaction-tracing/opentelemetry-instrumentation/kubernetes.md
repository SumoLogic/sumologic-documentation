---
id: kubernetes
title: Kubernetes Tracing OpenTelemetry auto-instrumentation
sidebar_label: Kubernetes
---

Setting up Tracing instrumentation for Java, Python, NodeJS, and .NET applications deployed in Kubernetes just got easier. In a few simple steps, with the [OpenTelemetry-Operator](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-operator), your application is automatically instrumented and your traces are sent to Sumo.

## Installation

To enable the OpenTelemetry-Operator for the [Sumo Logic Kubernetes Collection](https://github.com/SumoLogic/sumologic-kubernetes-collection#sumologic-kubernetes-collection), you have to set `opentelemetry-operator.enabled=true`.

The OpenTelemetry Operator needs to know how to instrument containers. For this purpose, the `Instrumentation` resource must be created in the namespace where you want to use auto-instrumentation. Setting `opentelemetry-operator.createDefaultInstrumentation` to `true` and `opentelemetry-operator.instrumentationNamespaces` will help with that.

The value of the flag `opentelemetry-operator.instrumentationNamespaces` is backslash comma-separated namespaces list, for example: `opentelemetry-operator.instrumentationNamespaces="ns1\,ns2\,ns3"`.

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
 --set opentelemetry-operator.createDefaultInstrumentation=true \
 --set opentelemetry-operator.instrumentationNamespaces="ns1\,ns2"
 ```

During the installation process, **OpenTelemetry Instrumentation** custom resources with all settings are deployed in the provided namespaces.


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
   {@import ../../../../reuse/otel-deployment-environment-tag.md}
* Other parameters:
    * **OTEL_PROPAGATORS.** If not provided, the operator sets the default value `tracecontext,baggage`. Some additional context propagators can be enabled (b3 - common for service meshes, xray - used by AWS services).
    * **OTEL_TRACES_SAMPLER.** Default value: `always_on`. For details, see other sampling possibilities [here](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#Sampling).


## Custom OpenTelemetry Operator Instrumentation resource

You might want to create a custom `Instrumentation` resource. For more info, see the [`Instrumentation` object schema](https://github.com/open-telemetry/opentelemetry-operator/blob/v0.63.1/apis/v1alpha1/instrumentation_types.go) and [example usage](https://github.com/open-telemetry/opentelemetry-operator/tree/v0.63.1#opentelemetry-auto-instrumentation-injection).
In the case of defining an endpoint to export telemetry data from instrumented application, follow the pattern `RELEASE_NAME-CHART_NAME-otelagent.RELEASE_NAMESPACE` (e.g., `collection-sumologic-otelagent.sumologic`).

Make sure supported auto-instrumentation images are used:
* `dotnet` - ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-dotnet:0.4.0-beta.1
* `java` - ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:1.16.0
* `nodejs` - ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-nodejs:0.27.0
* `python` - ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-python:0.28b1

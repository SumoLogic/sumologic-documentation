---
id: kubernetes
title: Kubernetes Tracing OpenTelemetry auto-instrumentation (Beta)
sidebar_label: Kubernetes (Beta)
---

<p> <a href="/docs/beta"><span className="beta">Beta</span></a> </p>

Setting up Tracing instrumentation for Java, Python and NodeJS applications deployed in Kubernetes just got easier. In a few simple steps, with the [OpenTelemetry-Operator](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-operator) your application is automatically instrumented and your traces are sent to Sumo.

## Installation

To enable the OpenTelemetry-Operator for the  [Sumo Logic Kubernetes Collection](https://github.com/SumoLogic/sumologic-kubernetes-collection#sumologic-kubernetes-collection), you have to set additional flags during the installation process. The operator will instrument containers belonging to namespaces provided in the `opentelemetry-operator.manager.env.WATCH_NAMESPACE` flag only. The value of the flag is backslash comma separated namespaces list, for example: `opentelemetry-operator.manager.env.WATCH_NAMESPACE="ns1\,ns2\,ns3"`.

1. Update dependencies:
 ```bash
 $ helm dependency update
 ```
2. Installation/upgrade enabling operator and setting namespaces to watch. You can find more details about installing an OT collector in Kubernetes environments [here](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments). Make sure that `--wait` flag is set at the end.
 ```bash
 $ helm upgrade --install collection sumologic/sumologic \
 --namespace sumologic \
 --create-namespace \
 --set sumologic.accessId="<SUMO_ACCESS_ID>" \
 --set sumologic.accessKey="<SUMO_ACCESS_KEY>" \
 --set sumologic.clusterName="<MY_CLUSTER_NAME>" \
 --set sumologic.traces.enabled=true \
 --set opentelemetry-operator.enabled=true \
 --set opentelemetry-operator.manager.env.WATCH_NAMESPACE="ns1\,ns2" \
 --wait
 ```

During the installation process, **OpenTelemetry Instrumentation** custom resources with all settings are deployed in the provided namespaces.


## Auto-instrumentation injection

To enable injecting tracing auto-instrumentation, it is required to add an OpenTelemetry-specific annotation to the **Deployment**, **Statefulset** or **Namespace**.

List of annotations per instrumented language:

* **Java** auto-instrumentation - `instrumentation.opentelemetry.io/inject-java: "true"`
* **NodeJS** auto-instrumentation - `instrumentation.opentelemetry.io/inject-nodejs: "true"`
* **Python** auto-instrumentation - `instrumentation.opentelemetry.io/inject-python: "true"`

In case of a Pod with multiple containers inside it is required to specify additional annotation `instrumentation.opentelemetry.io/container-names` which takes as value a comma separated list of the containers names.

For a Pod with multiple containers if annotation for multiple containers is not set, then instrumentation will be provided to the first container on the list.

## Examples

### Java auto-instrumentation for Namespace

```java
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

```java
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
* `OTEL_SERVICE_NAME` - in case this parameter is not set, default service name assumes the name of Deployment, Statefulset or other PodSpec object name. In such case ensure their names represent some business logic, such as `FinanceServiceCall`. This will appear as a tracing service name in Sumo Logic. If you would like to manually set service name, add  `OTEL_SERVICE_NAME` in env variables section of container configuration. For example:  
 ```yaml
 spec:
  containers:
   - image: my-image
     env:
      - name: OTEL_SERVICE_NAME
        value: FinanceServiceCall
 ```
* `OTEL_RESOURCE_ATTRIBUTES` - in case this parameter is not set, default application name assumes the name of Namespace. This will appear as a tracing application name in Sumo Logic. If you would like to manually set the application name, add  `OTEL_RESOURCE_ATTRIBUTES` `application=name` in the environment variables section of container configuration. You can add additional attributes here as comma separated key=value pairs (i.e., `application=my-app,key=value`):
 ```yaml
 spec:
  containers:
   - image: my-image
     env:
      - name: OTEL_RESOURCE_ATTRIBUTES
        value: application=my-app,key=value
 ```

* Other parameters:
    * **OTEL_PROPAGATORS.** If not set then additional supported by OpenTelemetry context propagators are enabled (b3 - common for service meshes, xray - used by AWS services). Default value: `tracecontext,baggage,b3,xray`.
    * **OTEL_TRACES_SAMPLER.** Default value: `always_on`. For details, see other sampling possibilities [here](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#Sampling).

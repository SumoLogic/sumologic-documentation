---
id: installation
title: Troubleshooting Kubernetes Installation
description: Learn how to diagnose and resolve issues that occur when installing the Sumo Logic OpenTelemetry Collector in Kubernetes.
---

Learn how to diagnose and resolve issues that occur when installing the Sumo Logic OpenTelemetry Collector in Kubernetes.

## Installation fails with error `function "dig" not defined`

You'll need to use a more recent version of Helm. See [Minimum Requirements](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/README.md#minimum-requirements).

If you are using ArgoCD or another tool that uses Helm under the hood, make sure that tool uses the required version of Helm.

## Sumo Logic fields

Sumo Logic apps for Kubernetes and Explore require the below listed fields to be added in the Sumo Logic UI to your Fields table schema.

- `cluster`
- `container`
- `daemonset`
- `deployment`
- `host`
- `namespace`
- `node`
- `pod`
- `service`
- `statefulset`

This is normally done in the setup job when `sumologic.setupEnabled` is set to `true` (default behavior).

In the unlikely scenario that this fails, you can create them manually by visiting [Fields](/docs/manage/fields/#manage-fields) in Sumo Logic UI.

This is to ensure your logs are tagged with relevant metadata.

This is a one-time setup per Sumo Logic account.

## Error: timed out waiting for the condition

If `helm upgrade --install` hangs, it usually means the pre-install setup job is failing and is in a retry loop. Due to a Helm limitation, errors from the setup job cannot be fed back to the `helm upgrade --install` command. Kubernetes schedules the job in a pod, so you can look at logs from the pod to see why the job is failing. First find the pod name in the namespace where the Helm chart was deployed. The pod name will contain `-setup` in the name.

```sh
kubectl get pods
```

:::tip
If the pod does not exist, it is possible it has been evicted. Re-run the `helm upgrade --install` to recreate it and while that command is running, use another shell to get the name of the pod.
:::

Get the logs from that pod:

```sh
kubectl logs POD_NAME -f
```

### Error: collector with name 'sumologic' does not exist

If you get the below mentioned error you can safely ignore it, and the installation should complete successfully. The installation process creates new [HTTP endpoints](/docs/send-data/hosted-collectors/http-source) in your Sumo Logic account, that are used to send data to Sumo Logic. This error occurs if the endpoints had already been created by an earlier run of the installation process.

```sh
Error: collector with name 'sumologic' does not exist
sumologic_http_source.default_metrics_source: Importing from ID
```


### Secret 'sumologic::sumologic' exists, abort

If you see `Secret 'sumologic::sumologic' exists, abort.` from the logs, delete the existing secret:

```bash
kubectl delete secret sumologic -n ${NAMESPACE}
```

`helm install` should proceed after the existing secret is deleted before exhausting retries. If it did time out after exhausting retries,
rerun the `helm install` command.

## OpenTelemetry Collector Pods Stuck in CreateContainerConfigError

If the OpenTelemetry Collector Pods are in `CreateContainerConfigError` it can mean the setup job has not been completed yet. Make sure that the `sumologic.setupEnable` parameter is set to `true`. Then wait for the setup pod to complete and the issue should resolve itself. The setup job creates a secret and the error simply means the secret is not there yet. This usually resolves itself automatically.

If the issue does not solve resolve automatically, you will need to look at the logs for the setup pod. Kubernetes schedules the job in a pod, so you can look at logs from the pod to see why the job is failing. First find the pod name in the namespace where you installed the rendered YAML. The pod name will contain `-setup` in the name.

```sh
kubectl get pods
```

Get the logs from that pod:

```sh
kubectl logs POD_NAME -f
```

## Error: values don't meet the specifications of the schema(s)

If you see `Error: values don't meet the specifications of the schema(s) in the following chart(s): opentelemetry-operator...` from the logs, it means that your configuration for `opentelemetry-operator` keys in values.yaml file is not correct.

To fix this issue, perform the required changes as listed below:

### Moved

* From `opentelemetry-operator.instrumentationJobImage` to `instrumentation.instrumentationJobImage`
* From `opentelemetry-operator.createDefaultInstrumentation` to `instrumentation.createDefaultInstrumentation`
* From `opentelemetry-operator.instrumentationNamespaces` to `instrumentation.instrumentationNamespaces`
* From `opentelemetry-operator.instrumentation.dotnet.traces` to `instrumentation.dotnet.traces`
* From `opentelemetry-operator.instrumentation.dotnet.metrics` to `instrumentation.dotnet.metrics`
* From `opentelemetry-operator.instrumentation.dotnet.extraEnvVars` to `instrumentation.dotnet.extraEnvVars`
* From `opentelemetry-operator.instrumentation.java.traces` to `instrumentation.java.traces`
* From `opentelemetry-operator.instrumentation.java.metrics` to `instrumentation.java.metrics`
* From `opentelemetry-operator.instrumentation.java.extraEnvVars` to `instrumentation.java.extraEnvVars`
* From `opentelemetry-operator.instrumentation.nodejs` to `instrumentation.nodejs`
* From `opentelemetry-operator.instrumentation.python.traces` to `instrumentation.python.traces`
* From `opentelemetry-operator.instrumentation.python.metrics` to `instrumentation.python.metrics`
* From `opentelemetry-operator.instrumentation.python.extraEnvVars` to `instrumentation.python.extraEnvVars`

### Changed

* From `opentelemetry-operator.instrumentation.dotnet.repository` to `opentelemetry-operator.autoInstrumentationImage.dotnet.repository`
* From `opentelemetry-operator.instrumentation.dotnet.tag` to `opentelemetry-operator.autoInstrumentationImage.dotnet.tag`
* From `opentelemetry-operator.instrumentation.java.repository` to `opentelemetry-operator.autoInstrumentationImage.java.repository`
* From `opentelemetry-operator.instrumentation.java.tag` to `opentelemetry-operator.autoInstrumentationImage.java.tag`
* From `opentelemetry-operator.instrumentation.nodejs.repository` to `opentelemetry-operator.autoInstrumentationImage.nodejs.repository`
* From `opentelemetry-operator.instrumentation.nodejs.tag` to `opentelemetry-operator.autoInstrumentationImage.nodejs.tag`
* From `opentelemetry-operator.instrumentation.python.repository` to `opentelemetry-operator.autoInstrumentationImage.python.repository`
* From `opentelemetry-operator.instrumentation.python.tag` to `opentelemetry-operator.autoInstrumentationImage.python.tag`

### Deleted

* `opentelemetry-operator.instrumentation.dotnet.image`
* `opentelemetry-operator.instrumentation.java.image`
* `opentelemetry-operator.instrumentation.nodejs.image`
* `opentelemetry-operator.instrumentation.python.image`

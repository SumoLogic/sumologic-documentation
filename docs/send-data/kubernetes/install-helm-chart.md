---
id: install-helm-chart
title: Sumo Logic Kubernetes Helm Chart Installation
sidebar_label: Installation
description: Learn how to install the Sumo Logic Kubernetes Helm Chart.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page describes how to install the Sumo Logic Kubernetes Helm Chart.

## Requirements

### Helm

The Sumo Logic Kubernetes Collection solution is packaged as a Helm Chart. See the [official Helm documentation](https://helm.sh/docs/intro/install/) for installation instructions for the Helm binary.

### Helm Chart repository

Before installing the chart, you need to add the `sumologic` Helm repository:

```bash
helm repo add sumologic https://sumologic.github.io/sumologic-kubernetes-collection
helm repo update
```

### Sumo Logic account

If you don’t already have a Sumo Logic account, you can [Start a free trial](https://www.sumologic.com/sign-up).

The following are required to set up and deploy the Sumo Logic Kubernetes collection.

- Review our [minimum requirements](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/README.md#minimum-requirements) and [support matrix](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/README.md#support-matrix)
- An [Access ID and Access Key](/docs/manage/security/access-keys/) with the following [Data Management role capabilities](/docs/manage/users-roles/roles/role-capabilities#data-management): Manage Collectors and Manage Fields.
   :::note
   The Manage Monitors and Manage Content capabilities are required to install the built-in monitors and dashboards, which are recommended and enabled by default.
   :::

To get an idea of the resources this chart will require to run on your cluster, you can reference our [performance doc](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/performance.md).

## Installation steps

### Required parameters

The Helm chart installation requires two parameter overrides:

- `sumologic.accessId` - Sumo [Access ID](/docs/manage/security/access-keys/).
- `sumologic.accessKey` - Sumo [Access key](/docs/manage/security/access-keys/).
- `sumologic.clusterName` - An identifier for your Kubernetes cluster. This is the name you will see for the cluster in Sumo Logic. Set a different value for each cluster you install the Helm Chart in.

### Prepare minimal configuration

Create a `user-values.yaml` file in your working directory with the following content:

```yaml title=user-values.yaml
sumologic:
  accessId: ${SUMO_ACCESS_ID}
  accessKey: ${SUMO_ACCESS_KEY}
  clusterName: ${MY_CLUSTER_NAME}
```

:::note
Additional configuration is necessary for [OpenShift](#installing-in-openshift-platform)
:::

### Install the Helm Chart

The following command will install the Sumo Logic chart with the release name `my-release` in the `${NAMESPACE}` namespace.

```bash
helm upgrade \
  --install \
  -n `${NAMESPACE}` \
  --create-namespace \
  -f user-values.yaml \
  my-release \
  sumologic/sumologic
```

:::note
If the release exists, it will be upgraded, otherwise it will be installed. If the namespace doesn't exists, it will be created.
:::

You should see output similar to the following:

```text
Release "my-release" does not exist. Installing it now.
NAME: my-release
LAST DEPLOYED: Fri Oct 13 11:11:49 2023
NAMESPACE: sumologic
STATUS: deployed
REVISION: 1
NOTES:
Thank you for installing sumologic.
(...)
```

More configuration examples (i.e. OpenShift) can found seen in [this document](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/configuration-examples.md).

## Viewing Data In Sumo Logic

Once you have completed installation, you can [install the Kubernetes App and view the dashboards](/docs/integrations/containers-orchestration/kubernetes#installing-the-kubernetes-app) or [open Kubernetes view](/docs/observability/kubernetes/monitoring#open-kubernetes-views) in Sumo Logic. If you do not see data in Sumo Logic, you can review our [troubleshooting guide](/docs/send-data/kubernetes/troubleshoot-collection).

<img src={useBaseUrl('img/kubernetes/K8s_Cluster_Overview.png')} alt="A Kubernetes Cluster Overview dashboard in Sumo Logic showing CPU utilization (12.27%), memory utilization (45.19%), disk space usage (21.06%), dropped network traffic (0%), total CPUs (4), total memory (74,964.75 MB), errors by namespace (2,443 in 'sumologic'), and pod status in various namespaces with green for running pods and red for issues."/>

## Customizing Installation

We recommend creating a new `user-values.yaml` for each Kubernetes cluster you wish to install collection in and setting only the properties
you wish to override. Once you have customized it you should use the following commands to install or upgrade.

```bash
helm upgrade \
  --install \
  -n `${NAMESPACE}` \
  --create-namespace \
  -f user-values.yaml \
  my-release \
  sumologic/sumologic
```

We documented some common customizations below:

### Overriding names of resources

If you want to override the names of the resources created by the chart, see
[Overriding chart resource names with `fullnameOverride`](/docs/send-data/kubernetes/best-practices#overriding-chart-resource-names-with-fullnameoverride).

### Using a custom container registry

Container images used by this Helm Chart are currently hosted on [Amazon Public ECR][aws-public-ecr-docs] which requires authentication to
provide a higher quota for image pulls. To find a comprehensive information on this please refer to [Amazon Elastic Container Registry
pricing][aws-ecr-pricing].

Please refer to [our instructions](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/working-with-container-registries.md#authenticating-with-container-registry) on how to provide
credentials in order to authenticate with Public ECR.

An alternative would be to host Sumo Logic container images in one's container registries. To do so please refer to the following
[instructions](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/working-with-container-registries.md#hosting-sumo-logic-images)

[aws-public-ecr-docs]: https://aws.amazon.com/blogs/aws/amazon-ecr-public-a-new-public-container-registry/
[aws-ecr-pricing]: https://aws.amazon.com/ecr/pricing/

### Using FIPS compliant OpenTelemetry Collector

Refer to the [FIPS compliant binaries](security-best-practices.md#fips-compliant-binaries) section in the [Advanced Configuration / Security Best Practices](security-best-practices.md) document.

### Proxy

If you are installing the collection in a cluster that requires proxying outbound requests, please see the following
[additional properties](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/installing-behind-proxy.md) you will need to set.

### Collecting container logs

Refer to [Collecting Container Logs document](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/collecting-container-logs.md#collecting-container-logs)

### Collecting metrics

Refer to [Collecting Metrics](/docs/send-data/kubernetes/collecting-metrics/).

### Collecting Kubernetes events

Refer to [Collecting Kubernetes Events document](/docs/send-data/kubernetes/collecting-events/)

## Upgrading Sumo Logic Collection

To upgrade our helm chart to a newer version, you must first run update your local helm repo.

```bash
helm repo update
```

Next, you can run `helm upgrade --install` to upgrade to that version. The following upgrades the current version of `my-release` to the
latest.

```bash
helm upgrade --install my-release sumologic/sumologic -f `user-values.yaml`
```

If you wish to upgrade to a specific version, you can use the `--version` flag.

```bash
helm upgrade --install my-release sumologic/sumologic -f `user-values.yaml` --version=2.0.0
```

**Note:** If you no longer have your `user-values.yaml` from the first installation or do not remember the options you added via `--set` you
can run the following to see the values for the currently installed helm chart. For example, if the release is called `my-release` you can
run the following.

```bash
helm get values my-release
```

If something goes wrong, or you want to go back to the previous version, you can
[rollback changes using helm](https://helm.sh/docs/helm/helm_rollback/):

```
helm history my-release
helm rollback my-release <REVISION-NUMBER>
```

## Uninstalling Sumo Logic Collection

To uninstall/delete the Helm chart:

```bash
helm delete my-release
```

> **Helm3 Tip**: In Helm3 the default behavior is to purge history. Use --keep-history to preserve it while deleting the release.

The command removes all the Kubernetes components associated with the chart and deletes the release.

### Post uninstallation cleanup

In order to clean up the Kubernetes secret and associated hosted collector one can use the optional cleanup job by setting
`sumologic.cleanupEnabled` to `true`.

Alternatively the secret can be removed manually with:

```bash
kubectl delete secret sumologic
```

and the associated hosted collector can be deleted in the Sumo Logic UI.

## Troubleshooting Installation

See the [Troubleshooting document](/docs/send-data/kubernetes/troubleshoot-collection#troubleshooting-installation).

## Installing in OpenShift platform

The daemonset/statefulset fails to create the pods in Openshift environment due to the request of elevated privileges, like HostPath mounts,
privileged: true, etc.

If you wish to install the chart in the Openshift Platform, it requires a SCC resource which is only created in Openshift (detected via API capabilities in the chart), you can add the following configuration to `user-values.yaml`:

```yaml title=user-values.yaml
sumologic:
  scc:
    create: true
otellogs:
  daemonset:
    containers:
      otelcol:
        securityContext:
          privileged: true
    initContainers:
      changeowner:
        securityContext:
          privileged: true
tailing-sidecar-operator:
  scc:
    create: true
```

**Notice:** Prometheus Operator is deployed by default on OpenShift platform, you may either limit scope for Prometheus Operator installed
with Sumo Logic Kubernetes Collection using `kube-prometheus-stack.prometheusOperator.namespaces.additional` parameter in `user-values.yaml`
or exclude namespaces for Prometheus Operator installed with Sumo Logic Kubernetes Collection using
`kube-prometheus-stack.prometheusOperator.denyNamespaces` in `user-values.yaml`. For details, see
[Prometheus document](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/prometheus.md#prometheus-operator-in-the-cluster)

## Non-helm installation

If you do not want to use Helm to manage the installation, please use `helm template` to generate Kubernetes templates and apply them using
Kubectl.

> **Warning:** > Before upgrade, please delete the old jobs:

- `kubectl delete job -n ${NAMESPACE} my-release-sumologic-setup`
- `kubectl delete job -n ${NAMESPACE} my-release-sumologic-ot-operator-instr` (needed only if `opentelemetry-operator.enabled=true`)

Simply replace:

```bash
helm upgrade \
  --install \
  -n `${NAMESPACE}` \
  --create-namespace \
  -f user-values.yaml \
  my-release \
  sumologic/sumologic
```

with

```bash
helm template \
  -n "${NAMESPACE}" \
  --create-namespace \
  -f user-values.yaml \
  my-release \
  sumologic/sumologic | tee sumologic-rendered.yaml
kubectl create namespace "${NAMESPACE}"
kubectl apply -f sumologic-rendered.yaml -n "${NAMESPACE}"
```

### OpenShift

For Openshift, you need to add `--api-versions=security.openshift.io/v1` argument to `helm template`, so the final set of upgrade commands
will look like the following:

```
helm template \
  --api-versions=security.openshift.io/v1` \
  -n "${NAMESPACE}" \
  --create-namespace \
  -f user-values.yaml \
  my-release \
  sumologic/sumologic | tee sumologic-rendered.yaml
kubectl create namespace "${NAMESPACE}"
kubectl apply -f sumologic-rendered.yaml -n "${NAMESPACE}"
```

---
id: quickstart-k8s
---
# Overview

This guide will walk you through setting up [Sumo Logic's Kubernetes solution](https://www.sumologic.com/solutions/kubernetes/).  If you do not have a Sumo Logic account, go [sign up for a free trial](https://www.sumologic.com/sign-up/).

# Installation

<Tabs
className="unique-tabs"
defaultValue="helm"
values={[
{label: 'Helm', value: 'helm'},
{label: 'YAML', value: 'yaml'}
]}>

<TabItem value="helm">

1. If this is the first time installing our helm chart, add the [Sumo Logic Helm repo](https://sumologic.github.io/sumologic-kubernetes-collection/):

```shell
helm repo add sumologic https://sumologic.github.io/sumologic-kubernetes-collection
helm repo update
```

2. Get your [Sumo Logic Access ID and Access Key](https://help.sumologic.com/Manage/Security/Access-Keys) and run the following command:

```shell
helm upgrade --install <HELM_RELEASE_NAME> sumologic/sumologic \
    --set sumologic.accessId="<SUMO_ACCESS_ID>" \
    --set sumologic.accessKey="<SUMO_ACCESS_KEY>" 
```

3. Once you have completed installation, you can install the [Kubernetes App and view the dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Install_the_Kubernetes_App_and_view_the_Dashboards) and [open a new Explore tab](https://help.sumologic.com/Observability_Solution/Kubernetes_Solution/Navigate_your_Kubernetes_environment) in Sumo Logic. If you do not see data in Sumo Logic, you can review our [troubleshooting guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/docs/Troubleshoot_Collection.md).

:::tip Helm Values File

As a best practice, we recommend using [helm values files](https://helm.sh/docs/chart_template_guide/values_files/) when adding additional configuration.  The values file should only contain properties you want to change from the [default values.yaml](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/helm/sumologic/values.yaml) to ensure upgrades behave properly.
:::

</TabItem>

<TabItem value="yaml">

1. Get your [Sumo Logic Access ID and Access Key](https://help.sumologic.com/Manage/Security/Access-Keys) and run the following command to generate the YAML:

```shell
kubectl run tools \
  -i --quiet --rm \
  --restart=Never \
  --image sumologic/kubernetes-tools:2.9.0 -- \
  template \
  --name-template 'collection' \
  --set sumologic.accessId='<SUMO_ACCESS_ID>' \
  --set sumologic.accessKey='<SUMO_ACCESS_KEY>' \
  | tee sumologic.yaml
```

2. Install the required CRDs and apply the generated YAML:

```shell
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_probes.yaml
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_alertmanagers.yaml
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_prometheuses.yaml
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_prometheusrules.yaml
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_servicemonitors.yaml
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_podmonitors.yaml
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_thanosrulers.yaml
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_alertmanagerconfigs.yaml
kubectl apply -f sumologic.yaml
```

3. Once you have completed installation, you can install the [Kubernetes App and view the dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Install_the_Kubernetes_App_and_view_the_Dashboards) and [open a new Explore tab](https://help.sumologic.com/Observability_Solution/Kubernetes_Solution/Navigate_your_Kubernetes_environment) in Sumo Logic. If you do not see data in Sumo Logic, you can review our [troubleshooting guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/docs/Troubleshoot_Collection.md).

</TabItem>

</Tabs>

# Additional Reading

  * [Full List of Configuration Options](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy/helm/sumologic#configuration).
  * [Sumo Logic Helm Chart Troubleshooting Guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/docs/Troubleshoot_Collection.md)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
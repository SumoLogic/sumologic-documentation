---
id: quickstart
title: Kubernetes Quickstart
sidebar_label: Kubernetes Quickstart
description: Get started with our Kubernetes solution in minutes.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will walk you through setting up the [Sumo Logic Kubernetes solution](https://www.sumologic.com/solutions/kubernetes/) in two easy steps. This will:
* Set up data collection for your Kubernetes environment (orchestration, infrastructure, and app data)
* Install the relevant app dashboards to view data from your Kubernetes environment, and share it with others in your org
* Install the necessary alert monitors to get alerted of any issues 

:::tip
As an alternative to this quickstart, you can use our Kubernetes Setup Quickstart Wizard, located at **App Catalog** > **Kubernetes** > **Begin Integration**.
:::


## Before you begin
* A Sumo Logic account (if you don't have one, [sign up for a free trial](/get-started/sign-up.md#create-a-trial-account))
* Your Sumo Logic [Sumo Logic Access ID and Access Key](/docs/manage/security/access-keys)


## Installation

<Tabs
className="unique-tabs"
defaultValue="helm"
values={[
{label: 'Helm', value: 'helm'},
{label: 'YAML', value: 'yaml'}
]}>

<TabItem value="helm">

1. If this is your first time installing our helm chart, add the [Sumo Logic Helm repo](https://sumologic.github.io/sumologic-kubernetes-collection/):
  ```shell
  helm repo add sumologic https://sumologic.github.io/sumologic-kubernetes-collection
  helm repo update
  ```

1. Get your [Sumo Logic Access ID and Access Key](/docs/manage/security/access-keys) and run the following command:
  ```shell
  helm upgrade --install my-release sumologic/sumologic \
  --namespace=my-namespace \
  --create-namespace \
  --set sumologic.accessId=SUMO_ACCESS_ID \
  --set sumologic.accessKey=SUMO_ACCESS_KEY \
  --set sumologic.clusterName=Kubernetes_cluster \
  --set sumologic.collectorName=kubernetes \
  # To opt out of out-of-box alerts, omit the below line
  --set "sumologic.setup.monitors.notificationEmails={EMAIL ADDRESS}"
  ```

:::tip Helm Values File

If you're adding additional configuration, we recommend using the [helm values files](https://helm.sh/docs/chart_template_guide/values_files/), which should only contain properties you want to change from the [default values.yaml](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/helm/sumologic/values.yaml) to ensure upgrades behave properly.
:::

</TabItem>
<TabItem value="yaml">

1. Get your [Sumo Logic Access ID and Access Key](/docs/manage/security/access-keys) and run the following command to generate the YAML:
  ```shell
  kubectl run tools \
  -i --quiet --rm \
  --restart=Never \
  --image sumologic/kubernetes-tools:2.9.0 -- \
  template \
  --name-template 'collection' \
  --set sumologic.accessId='SUMO_ACCESS_ID' \
  --set sumologic.accessKey='SUMO_ACCESS_KEY' \
  --set sumologic.collectorName=kubernetes-2022-06-25T20:21:06.131Z \
  # To opt out of out-of-box alerts, omit the below line
  --set "sumologic.setup.monitors.notificationEmails={EMAIL ADDRESS}"
  | tee sumologic.yaml
  ```

1. Install the required CRDs and apply the generated YAML:
  ```shell
  kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_probes.yaml \
  kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_alertmanagers.yaml \
  kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_prometheuses.yaml \
  kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_prometheusrules.yaml \
  kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_servicemonitors.yaml \
  kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_podmonitors.yaml \
  kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_thanosrulers.yaml \
  kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/v0.43.2/example/prometheus-operator-crd/monitoring.coreos.com_alertmanagerconfigs.yaml \
  kubectl apply -f sumologic.yaml
  ```

</TabItem>
</Tabs>


## Next Steps

Once you have completed the above steps, you'll have installed the collection, as well as the core [Kubernetes Dashboards](/docs/observability/kubernetes/monitoring) and [alerts](/docs/observability/kubernetes/alerts). To get started, open a new Explore tab in Sumo Logic and view your Kubernetes App Dashboards.

If you're not seeing data in Sumo Logic, you can review our [troubleshooting guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/troubleshoot-collection.md).

You will have to install other K8s-related apps depending upon whether you want to monitor specific aspects of Kubernetes control plane provided by different cloud vendors. For more details, see [Sumo Logic K8s Apps](/docs/observability/kubernetes/apps.md).

## Additional Resources

* [Full List of Configuration Options](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy/helm/sumologic#configuration)
* [Share a Dashboard (New)](/docs/dashboards-new/share-dashboard-new.md)
* [Link a dashboard to Explore](/docs/dashboards-new/link-dashboards.md)

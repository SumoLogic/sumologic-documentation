---
id: quickstart
title: Kubernetes Quickstart
sidebar_label: Kubernetes Quickstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will walk you through setting up the [Sumo Logic Kubernetes solution](https://www.sumologic.com/solutions/kubernetes/) in two easy steps. This will:
* Set up data collection for your Kubernetes environment (orchestration, infrastructure, and app data)
* Install the relevant app dashboards to view data from your Kubernetes environment, and share it with others in your org
* Install the necessary alert monitors to get alerted of any issues 

:::tip
As an alternative, you can use our in-product Kubernetes Setup Quickstart Wizard, which mirrors the instructions on this page. Just go to Sumo Logic > **App Catalog** > **Kubernetes** > **Begin Integration**.
:::


## What You'll Need
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
  --set "sumologic.setup.monitors.notificationEmails={EMAIL ADDRESS}"
  ```

  To opt out of installing our out-of-box alerts, remove `--set "sumologic.setup.monitors.notificationEmails={EMAIL ADDRESS}"` from the above snippet.

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
  --set "sumologic.setup.monitors.notificationEmails={EMAIL ADDRESS}"
  | tee sumologic.yaml
  ```

  To opt out of installing our out-of-box alerts, remove `--set "sumologic.setup.monitors.notificationEmails={EMAIL ADDRESS}"` from the above snippet.

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

Once you have completed the above steps, you'll have installed the collection as well as the core Kubernetes Dashboards and alerts. To get started, open a new **Explore** tab in Sumo Logic and view your Kubernetes App Dashboards.

If you don't see data in Sumo Logic, review our [troubleshooting guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/docs/Troubleshoot_Collection.md).

:::info

<details><summary>Additional Reading</summary>

If you'd like to more about exploring the dashboards, monitoring, and troubleshooting your applications in your Kubernetes environment, here are a few options for you to explore.

* [Full List of Configuration Options](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy/helm/sumologic#configuration)
* [Sumo Logic Helm Chart Troubleshooting Guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/docs/Troubleshoot_Collection.md)
* **Sumo Logic Partner Apps**. We provide an array of Partner Apps designed specifically for Kubernetes. The following CI/CD Partner Apps are initially available.
![K8s_PartnerApps_CI-CD.png](/img/kubernetes/K8s_PartnerApps_CI-CD.png)
* **Sumo Logic Security Partner Apps**. We also provide a selection of security-focused Partner Apps with specialized detection and investigation features. The following a few of the Security Partner Apps that are initially available.
![K8s_PartnerApps_Security.png](/img/kubernetes/K8s_PartnerApps_Security.png)
* [Share a Dashboard (New)](/docs/dashboards-new/share-dashboard-new.md)
* [Link a dashboard to Explore](/docs/dashboards-new/link-dashboard-explore.md)
* **Get Certified**. The Sumo Kubernetes Analyst Certification is a hands-on class that shows you how to expand your knowledge of Kubernetes by solving common use cases.
![K8s_Kubernetes_Analyst_Cert.png](/img/kubernetes/K8s_Kubernetes_Analyst_Cert.png)

</details>
:::

---
id: quickstart-k8s
title: Kubernetes Quickstart
sidebar_label: Kubernetes Quickstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will walk you through setting up [Sumo Logic's Kubernetes solution](https://www.sumologic.com/solutions/kubernetes/). If you don't have a Sumo Logic account, [sign up for a free trial](/get-started/sign-up.md#create-a-trial-account).

## Installation

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

1. Get your [Sumo Logic Access ID and Access Key](https://help.sumologic.com/manage/security/Access-Keys) and run the following command:

  ```shell
  helm upgrade --install <HELM_RELEASE_NAME> sumologic/sumologic \
      --set sumologic.accessId="<SUMO_ACCESS_ID>" \
      --set sumologic.accessKey="<SUMO_ACCESS_KEY>"
  ```

:::tip Helm Values File

As a best practice, we recommend using [helm values files](https://helm.sh/docs/chart_template_guide/values_files/) when adding additional configuration.  The values file should only contain properties you want to change from the [default values.yaml](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/helm/sumologic/values.yaml) to ensure upgrades behave properly.
:::

</TabItem>

<TabItem value="yaml">

1. Get your [Sumo Logic Access ID and Access Key](https://help.sumologic.com/manage/security/Access-Keys) and run the following command to generate the YAML:

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

1. Install the required CRDs and apply the generated YAML:

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

</TabItem>
</Tabs>

#### Additional Reading
* [Full List of Configuration Options](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy/helm/sumologic#configuration)
* [Sumo Logic Helm Chart Troubleshooting Guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/docs/Troubleshoot_Collection.md)


## Next Steps

### Add the Sumo Logic Kubernetes Integration

Once you've completed installation, [install the Kubernetes app integration, browse alerts, view the Dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Install_the_Kubernetes_App%2C_Alerts%2C_and_view_the_Dashboards#Install_the_App), and [open a new Explore tab](https://help.sumologic.com/Observability_Solution/Kubernetes_Solution/Navigate_your_Kubernetes_environment) in Sumo Logic.

If you don't see data in Sumo Logic, you can review our [troubleshooting guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/docs/Troubleshoot_Collection.md).

## More Information

At a high level, the Sumo Logic Kubernetes Solution process is as follows:
1. Set Up Data Collection.
2. Install Sumo Logic Kubernetes app integration.
3. Data Enrichment (setting filters, metadata, and alerts for your clusters to produce more useful metrics and logs insights).

Learn more about exploring the dashboards, monitoring, and troubleshooting your applications in your Kubernetes environment. Here are a few options for you to explore.


### Kubernetes Partner Apps

Sumo Logic provides an array of Partner Apps designed specifically for Kubernetes. The following CI/CD Partner Apps are initially available.

![K8s_PartnerApps_CI-CD.png](/img/kubernetes/K8s_PartnerApps_CI-CD.png)

Sumo Logic also provides a selection of Security focused Partner Apps with specialized detection and investigation features. The following a few of the Security Partner Apps that are initially available.

![K8s_PartnerApps_Security.png](/img/kubernetes/K8s_PartnerApps_Security.png)

### Data Enrichment

Data Enrichment is the process of adding meaningful information to your data so you have more control and an easier time referencing data in searches. It's simply where you add more context to your data. Data enrichment augments Sumo Logic's centralized data collection capabilities to make the process of searching and finding data quicker and easier.

![K8s_Centralized_Data_Collection2.png](/img/kubernetes/K8s_Centralized_Data_Collection2.png)

### Dashboard (New)

The [Sumo Logic Dashboard (New)](/docs/dashboards-new) platform allows you to analyze metric and log data on the same dashboard, in a streamlined user experience. This is exactly what you need to create custom dashboards to more effectively monitor and manage a Kubernetes environment. 

![K8s_Dashboard_customize.png](/img/kubernetes/K8s_Dashboard_customize.png)

### Get Certified

The Sumo Kubernetes Analyst Certification is a hands-on class that shows you how to expand your knowledge of Kubernetes by solving common use cases.

![K8s_Kubernetes_Analyst_Cert.png](/img/kubernetes/K8s_Kubernetes_Analyst_Cert.png)

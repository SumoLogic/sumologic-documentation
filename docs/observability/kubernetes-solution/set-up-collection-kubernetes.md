---
id: set-up-collection-kubernetes
title: Set up Collection for Kubernetes
sidebar_label: Setting Up Data Collection
hide_table_of_contents: true
---

This page provides an overview of the collection process for Kubernetes environments.

Sumo Logic collects logs, events, metrics, and security data with Fluentbit, FluentD, Prometheus, and Falco. These collectors are all open source collectors that are maintained by the Cloud Native Computing Foundation (CNCF). The collected data streams through a centralized FluentD pipeline for metadata enrichment. Sumo Logic tags the container, pod, node, and cluster, as well as identifying the service, namespace, and deployment. 

![K8s.png](/img/kubernetes/K8s-architecture.png)

## Installation Guide

Reference the [K8s Quickstart guide](/docs/observability/kubernetes-solution/quickstart.md) for instructions on how to setup collection, install the relevant dashboards and alerts, in order to start monitoring your Kubernetes environment.

See the [Deployment Guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/README.md#documentation) for Deployment Guide has information on advanced configurations, best practices, performance, troubleshooting, and upgrading for our latest and previous versions of supported software.

## Adding custom fields

You can add custom fields to collectors for more intuitive searches, partitions, and Role Based Access Control (RBAC) queries. After which, the log data that passes through the collector automatically inherits the custom metadata. You can create a custom field label for anything that is "collected" and adapt your logs to familiar naming conventions. 

:::note
Custom metadata is usually set up by your administrator. Check with your site administrator before adding a custom key-value pair to a collector.
:::

The following task shows you how to create a custom field for a collector. In this process, you assign a custom key-value pair in the field to tag the metadata. In our example, we are create two fields with a key-value pairs, one for a cluster and one for a pod. 

To add a custom field to a collector, do the following:

1. From the main Sumo Logic page, select **Manage Data \> Collection** in the left menu bar.

    ![K8s_Key-value-pair_Collection-option.png](/img/kubernetes/K8s_Key-value-pair_Collection-option.png)

1. Click **Collection** at the top left of the window to view a list of available data collectors.
1. Select the collector to which you want to add a custom key-value pair. In our example, we selected the Falco collector.

    ![MM_Collection_Select_Collector.png](/img/kubernetes/MM_Collection_Select_Collector.png)

    The Edit Collector dialog appears.

1. Click **Add Field**.

    ![MM_Add-Field.png](/img/kubernetes/MM_Add-Field.png)

1. Enter a Field Name and Value in the respective text fields. In our example we created a field for a **cluster** with the label **k8s.dev** and a pod with the name **pod_test** and label **k8s.test**. This will allow us to easily search for log data for that cluster or pod.

    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark appears when the field exists and is enabled in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point appears when the field doesn't exist yet, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.

    ![MM_Fields_Key-Value-Pairs.png](/img/kubernetes/MM_Fields_Key-Value-Pairs.png)

1. Click **Save**.

Now, any logs sent to this Collector will have these key-value pairs associated with it. With this association, you can search for `cluster=k8s.dev` or  `pod_test=k8s.test` to return your logs.

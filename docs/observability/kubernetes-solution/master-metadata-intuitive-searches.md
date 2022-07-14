---
id: master-metadata-intuitive-searches
title: Master metadata for intuitive searches
sidebar_label: Customizing Your Metadata
---

You can create fields with key-value pairs that label logs with custom metadata. Referencing log data with fields based on meaningful associations makes searches easier and more intuitive. Sumo Logic allows you to add custom fields to collectors that define key-value pairs at the source level. The custom fields in the metadata streams are then automatically extracted for searching, querying, and graphing. This allows you to view results for intuitively referenced subsets not traditionally tagged as source categories. 

This page shows you how to define a custom field on a collector, and then how to effectively use the custom metadata to search log data.

:::tip
To learn more about adding meaningful information to your data so you have more control and an easier time referencing data in searches, see the Data Enrichment and Fields pages.
:::

## Adding custom fields to collectors

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

## Leveraging metadata for quicker results

In this section you learn how to use metadata to search by components of the Kubernetes environment, such as containers, pods, and namespaces, for localized investigation and analysis. You will also use metadata set with key-value pairs to effectively find the log data, and display Kubernetes labels and view the respective data in your query results.

To use metadata to view Kubernetes components and display Kubernetes label results, do the following:

1. On the Home page, click **+New** to open a query.

    ![MWT_New+.png](/img/kubernetes/MWT_New.png)

1. Select **Log Search**, and then indicate the metadata namespace.
    In our example, we entered **namespace=sumologic.**.

    ![MWT_namespace=sumologic.png](/img/kubernetes/MWT_namespace.png)

1. Click **Start** to run the query, then under Hidden Fields on the Messages tab, click **namespace** to display the metadata for that Kubernetes component. Notice that the namespace field moves Hidden Fields to Display Fields. 

    ![MWT_namespace_Display_Fields.png](/img/kubernetes/MWT_namespace_Display_Fields.png)

1. To view metadata for a key-value pair, enter the key-value pair in the query text field. In our example, we wanted to view the metadata for the prometheus container and entered **container=prometheus**.

1. Then we expanded the search range by changing the time interval from the last 15 minutes to the **Last 60 minutes**.

1. To further investigate the container, we clicked **Logreduce**, to group common log messages into signature groupings. 

1. To examine the details of the smaller set of signatures that appear, under Select Count we selected** 1. **Often times when troubleshooting a problem, our lesser quantity contains the root cause.

    ![MWT_LogReduce_1.png](/img/kubernetes/MWT_LogReduce_1.png)

    There is a warning indicating **Endpoints ended with: too old resource version, **that may be something to investigate, or just the indication of an ongoing upgrade

1. To check data for other Kubernetes components, we can enable them one by one by selecting the box to the left** **of each:** namespace, cluster, container, pod, service and Source Host.

:::note
If this was an ongoing upgrade, the **Source Host** ip address would help pinpoint the servers that may still need upgrading.
:::

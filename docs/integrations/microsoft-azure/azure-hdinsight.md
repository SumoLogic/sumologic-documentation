---
id: azure-hdinsight
title: Azure HDInsight
description: Learn about the Sumo Logic collection process for the Azure HDInsight service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-hdinsight.png')} alt="Thumbnail icon" width="50"/>

[Azure HDInsight](https://learn.microsoft.com/en-gb/azure/hdinsight/hdinsight-overview) is a full-spectrum, managed cluster platform which simplifies running big data frameworks in large volume and velocity using Apache Spark, Apache Hive, LLAP, Apache Kafka, Apache Hadoop, and more in your Azure environment. This integration helps in monitoring request throughput, message throughput, and concurrent connections in your clusters.

## Log and metric types

For Azure HDInsight, you can collect the following metrics:

* **Availability**. These metrics are available in [Microsoft.HDInsight/clusters](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-hdinsight-clusters-metrics) namespace. For more information on supported metrics, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-how-to-monitor#list-of-metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure HDInsight deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure HDInsight cluster that you want to monitor. You can forward metrics from multiple clusters to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/HDInsights/Metrics`.

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create hosted collector and tag tenant_name field. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure HDInsight cluster that that you want to monitor.
   1. Choose `Stream to an event hub` as destination.
   1. Select `Availability`.
   1. Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).

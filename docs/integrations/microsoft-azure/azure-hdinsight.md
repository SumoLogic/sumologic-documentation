---
id: azure-hdinsight
title: Azure HDInsight
description: Learn about the Sumo Logic collection process for the Azure HDInsight service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-hdinsight.png')} alt="Azure HDInsight icon" width="50"/>

[Azure HDInsight](https://learn.microsoft.com/en-gb/azure/hdinsight/hdinsight-overview) is a full-spectrum, managed cluster platform that simplifies running big data frameworks in large volume and velocity using Apache Spark, Apache Hive, LLAP, Apache Kafka, Apache Hadoop, and more in your Azure environment. This integration helps in monitoring request throughput, message throughput, and concurrent connections in your clusters.

## Log and metric types

For Azure HDInsight, you can collect the following metrics:

* **Availability**. These metrics are available in [Microsoft.HDInsight/clusters](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-hdinsight-clusters-metrics) namespace. For more information on supported metrics, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-how-to-monitor#list-of-metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure HDInsight cluster that you want to monitor. You can forward metrics from multiple clusters to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/HDInsights/Metrics`.

### Configure metrics collection

import MetricsSource from \'../../reuse/metrics-source.md\';

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).

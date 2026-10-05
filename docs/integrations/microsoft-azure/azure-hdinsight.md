---
id: azure-hdinsight
title: Azure HDInsight
description: Learn about the Sumo Logic collection process for the Azure HDInsight service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import MetricsSource from '../../reuse/metrics-source.md';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-hdinsight.png')} alt="Azure HDInsight icon" width="50"/>

[Azure HDInsight](https://learn.microsoft.com/en-gb/azure/hdinsight/hdinsight-overview) is a full-spectrum, managed cluster platform that simplifies running big data frameworks in large volume and velocity using Apache Spark, Apache Hive, LLAP, Apache Kafka, Apache Hadoop, and more in your Azure environment. This integration helps in monitoring request throughput, message throughput, and concurrent connections in your clusters.

## Metric types

For Azure HDInsight, you can collect the following metrics:

* **Availability**. These metrics are available in [Microsoft.HDInsight/clusters](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-hdinsight-clusters-metrics) namespace. For more information on supported metrics, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-how-to-monitor#list-of-metrics).

## Setup

### Configure collector

Create a [hosted collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) if not already configured. Make sure you create the required sources in this collector.

### Configure metrics collection

When you configure the Azure Metrics Source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/HDInsight/Metrics`.

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).

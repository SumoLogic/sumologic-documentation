---
id: azure-sql-managed-instance
title: Azure SQL Managed Instance
description: Learn about the Sumo Logic collection process for the Azure SQL Managed Instance service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-sql-managed-instance.png')} alt="Thumbnail icon" width="50"/>

[Azure SQL Managed Instance](https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview) is a scalable cloud database service that's always running on the latest stable version of the Microsoft SQL Server database engine and a patched OS with 99.99% built-in high availability, offering close to 100% feature compatibility with SQL Server. This integration helps in monitoring resource usage and tracking database events of your managed instances.

## Log and metric types

For Azure SQL Managed Instance, you can collect the following logs and metrics:

* **Resource Usage Statistics**. To learn more about the different [log category types](https://learn.microsoft.com/en-us/azure/azure-sql/database/metrics-diagnostic-telemetry-logging-streaming-export-configure?tabs=azure-portal&view=azuresql#instances-in-azure-sql-managed-instance) and [schemas](https://learn.microsoft.com/en-us/azure/azure-sql/database/metrics-diagnostic-telemetry-logging-streaming-export-configure?tabs=azure-portal&view=azuresql#resource-usage-stats-for-managed-instances) collected for Azure SQL Managed Instances, refer to the Azure documentation.
* **Audit Logs**. These logs include database events and Microsoft Support operations for your instances. To learn more about the log schema, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-sql/database/audit-log-format?view=azuresql#subheading-1).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Azure SQL Managed Instance you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/SQLManagedInstance/Logs`.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform below steps for each Azure SQL Managed Instance that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
3. Enable the Server audit by following instructions after Step 7 as specified in [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/auditing-configure?view=azuresql#set-up-auditing-for-your-server-to-event-hubs-or-azure-monitor-logs).


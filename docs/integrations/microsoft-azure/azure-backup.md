---
id: azure-backup
title: Azure Backup
description: Learn about the Sumo Logic collection process for the Azure Backup service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-backup.png')} alt="Azure Backup icon" width="50"/>

The [Azure Backup](https://learn.microsoft.com/en-us/azure/backup/backup-overview) service provides simple, secure, and cost-effective solutions to back up your data and recover it from the Microsoft Azure cloud. This integration helps you in getting rich insights on your backups across your entire backup estate.

## Log and metric types

For Azure Backup, you can collect the following logs and metrics:

* **Diagnostic logs**. Azure Backup provides the following diagnostics events:
  * CoreAzureBackup
  * AddonAzureBackupProtectedInstance
  * AddonAzureBackupJobs
  * AddonAzureBackupPolicy
  * AddonAzureBackupStorage

To learn more about the schemas differences for Recovery Services vaults and Backup vaults and different fields collected, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/backup/backup-azure-reports-data-model).

* **Health Metrics**. These metrics are available in [Microsoft.RecoveryServices/Vaults](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-recoveryservices-vaults-metrics) and [Microsoft.DataProtection/BackupVaults](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-dataprotection-backupvaults-metrics) namespace.

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Backup Vault you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/AzureBackup/Logs`, `Azure/AzureBackup/Metrics`.

### Configure metrics collection

import MetricsSource from \'../../reuse/metrics-source.md\';

<MetricsSource/>

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the Azure documentation for [Recovery Service Vaults](https://learn.microsoft.com/en-us/azure/backup/configure-reports?tabs=recovery-services-vaults#2-configure-diagnostics-settings-for-your-vaults) and [Backup Vaults](https://learn.microsoft.com/en-us/azure/backup/configure-reports?tabs=backup-vaults#2-configure-diagnostics-settings-for-your-vaults) respectively. Perform the steps below for each Azure Backup Vault that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select the following events for respective vault type:
        * Backup Vault: `CoreAzureBackup, AddonAzureBackupJobs, AddonAzureBackupPolicy, and AddonAzureBackupProtectedInstance`.
        * Recover Service Vault: `CoreAzureBackup, AddonAzureBackupJobs, AddonAzureBackupPolicy, AddonAzureBackupStorage, and AddonAzureBackupProtectedInstance`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).

---
id: vmware-opentelemetry
title: VMWare - OpenTelemetry Collector
sidebar_label: VMWare - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry app for VMWare.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/containers-orchestration/rabbitmq.png')} alt="icon" width="45"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The VMware app uses unified metrics from the VMware cloud computing virtualization platform to enable monitoring of vCenter, ESXi hosts and individual virtual machines metrics with real-time date displayed in predefined dashboards.

The dashboards provide insight into key metrics such as VM and hosts CPU, memory, disk utilization. This enables you to determine capacity constraints and troubleshoot operational issues related to over-provisioning, changes to configuration, and VM movement.

See the [vSphere product page](https://www.vmware.com/products/vsphere.html) for more information on VMware hybrid cloud.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/RabbitMq-OpenTelemetry/RabbitMQ-Schematics.png' alt="Schematics" />

## Fields creation in Sumo Logic for RabbitMQ


## Prerequisites

This section provides instructions for configuring metrics for the Sumo Logic app for VMWare.

#### Metric collection

Metrics are collected through the [vCenter Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/vcenterreceiver) of OpenTelemetry. A “Read Only” user assigned to a vSphere with permissions to the vCenter server, cluster and all subsequent resources being monitored must be specified in order for the receiver to retrieve information about them.

## Collection configuration and app installation

import ConfigAppInstall from '../../../reuse/apps/opentelemetry/config-app-install.md';

<ConfigAppInstall/>

### Step 1: Set up Collector

import SetupColl from '../../../reuse/apps/opentelemetry/set-up-collector.md';

<SetupColl/>

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/RabbitMq-OpenTelemetry/RabbitMQ-Collector.png' style={{border:'1px solid gray'}} alt="Collector" />

### Step 2: Configure integration

In this step, we will be configuring the yaml file required for RabbitMQ Collection. Path of the log file configured to capture RabbitMQ logs is needed to be given here.

The files are typically located in `/var/log/rabbitmq/rabbit@<hostname>.log`. You can add any custom fields which you want to tag along with the data ingested in sumo. Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/RabbitMq-OpenTelemetry/RabbitMQ-YAML.png' style={{border:'1px solid gray'}} alt="YAML" />

### Step 3: Send logs to Sumo Logic

import LogsIntro from '../../../reuse/apps/opentelemetry/send-logs-intro.md';

<LogsIntro/>

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
    {label: 'Chef', value: 'Chef'},
    {label: 'Ansible', value: 'Ansible'},
    {label: 'Puppet', value: 'Puppet'},
  ]}>

<TabItem value="Linux">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the RabbitMQ instance which needs to be monitored.
2. Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml file to /etc/otelcol-sumo/conf.d/ folder in the RabbitMq instance which needs to be monitored.
2. Restart the otelcol-sumo process using the below command 
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml" 
  ```

</TabItem>
<TabItem value="Chef">

import ChefNoEnv from '../../../reuse/apps/opentelemetry/chef-without-env.md';

<ChefNoEnv/>

</TabItem>

<TabItem value="Ansible">

import AnsibleNoEnv from '../../../reuse/apps/opentelemetry/ansible-without-env.md';

<AnsibleNoEnv/>

</TabItem>

<TabItem value="Puppet">

import PuppetNoEnv from '../../../reuse/apps/opentelemetry/puppet-without-env.md';

<PuppetNoEnv/>

</TabItem>
</Tabs>

import LogsOutro from '../../../reuse/apps/opentelemetry/send-logs-outro.md';

<LogsOutro/>

## Sample log messages

Here's a sample log message you'd find in Non-Kubernetes environments.

```
2023-01-16 05:53:44.858 [info] <0.44.0> Application cowboy exited with reason: stopped
```

## Sample queries

This sample Query is from the **RabbitMQ - Logs dashboard** > **Events** by Severity panel.

```sql title="Query String"
 %"sumo.datasource"="rabbitmq" %"messaging.cluster.name"=* host.name=*
| json "log" as _rawlog nodrop
| if(isEmpty(_rawlog),_raw,_rawlog) as _raw
| parse "* * [*]" as date,time,severity | count by severity
```

## Sample queries

### Metrics query

This sample Query is from the **VMWare - Overview** > **Top 25 ESXi Hosts - CPU Utilization** panel.

```sql title="Metric query"
sumo.datasource=vmware  metric=vcenter.host.cpu.utilization vcenter.datacenter.name=* vcenter.cluster.name=* vcenter.host.name=* | topk(25,avg)
```

## Sample metrics

### Metric message

```json title="Metric message"
{
  "queryId": "A",
  "_source": "WIN-U8TUICHO2JM",
  "_metricId": "-nHlUFTEN-e35PT8M0bW4Q",
  "_sourceName": "vmware",
  "host.group": "anemavmware",
  "os.type": "windows",
  "sumo.datasource": "vmware",
  "_sourceCategory": "otel/vmware",
  "deployment.environment": "anemavmware",
  "_contentType": "OpenTelemetry",
  "host.name": "WIN-U8TUICHO2JM",
  "metric": "vcenter.host.cpu.utilization",
  "_collectorId": "00005AF310C86B33",
  "vcenter.datacenter.name": "Production",
  "_sourceId": "0000000000000000",
  "unit": "%",
  "vcenter.cluster.name": "Prod Cluster",
  "_sourceHost": "WIN-U8TUICHO2JM",
  "_collector": "WIN-U8TUICHO2JM",
  "vcenter.host.name": "esx1.esxlab.com",
  "max": 45.76,
  "min": 0,
  "avg": 5.65,
  "sum": 1621.41,
  "latest": 0,
  "count": 287
}
```

## Viewing VMWare dashboards

### VMWare - Overview

<img src={useBaseUrl('img/integrations/containers-orchestration/Docker-Overview-Otel.png')} alt="VMWare-Overview"/>

- **Number of ESXi Hosts in Cluster**. The total number of ESXi hosts in the cluster.
- **Number of VMs in Cluster**. The total number of VMs in the cluster.
- **Available Cluster Memory**. Percentage of memory available in the cluster.
- **Available Cluster CPU**. Percentage of cpu available in the cluster.
- **Datastore Disk Utilization**. The disk utilization of the datastore.
- **VM Disk Usage**. The disk usage of VM.
- **Top 25 ESXi Hosts CPU Utilization**. Top 25 ESXi Hosts cpu utilization.
- **Top 25 ESXi Hosts Memory Utilization**. Top 25 ESXi Hosts memory utilization.
- **Top 25 ESXi Hosts Network Usage**. Top 25 ESXi Hosts usage.
- **Top 25 VMs CPU Utilization**. Top 25 VMs cpu utilization.
- **Top 25 VMs Memory Utilization**. Top 25 VMs memory utilization.
- **Top 25 VMs Network Usage**. Top 25 VMs network usage.
- **Top 25 VMs Memory Ballooning**. Top 25 VMs memory ballooning.

### VMWare - Clusters

<img src={useBaseUrl('img/integrations/containers-orchestration/Docker-CPU-Usage-Otel.png')} alt="VMWare-Clusters"/>

- **Number of ESXi Hosts in Cluster**. The total number of ESXi hosts in the cluster.
- **Number of VMs in Cluster**. The total number of VMs in the cluster.
- **Available Cluster CPU**. Percentage of CPU available in the cluster.
- **Available Cluster Memory**. Percentage of Memory available in the cluster.

### VMWare - Resource Pools

<img src={useBaseUrl('img/integrations/containers-orchestration/Docker-Memory-Usage-Otel.png')} alt="VMWare-Resource-Pools"/>

- **Cluster CPU Usage**. CPU usage of the resource pool.
- **Cluster Memory Usage**. Memory usage of the resource pool.
- **Shares of CPU**. Shares of CPU in the resource pool.
- **Shares of Memory**. Shares of Memory in the resource pool.

### VMWare - Host Overview/ Details

<img src={useBaseUrl('img/integrations/containers-orchestration/Docker-Network-Usage-Otel.png')} alt="VMWare-Host-Overview-Details"/>

- **Top 25 ESXi Hosts CPU Utilization**. Top 25 ESXi Hosts cpu utilization.
- **Top 25 ESXi Hosts Memory Utilization**. Top 25 ESXi Hosts memory utilization.
- **Top 25 ESXi Hosts Network Usage**. Top 25 ESXi Hosts usage.
- **Top 25 ESXi Hosts Disk Read/ Write Latency**. Top 25 ESXi Hosts disk read/ write latency.
- **Top 25 ESXi Hosts CPU Usage**. Top 25 ESXi Hosts cpu usage.
- **Top 25 ESXi Hosts Disk Read/ Write Rate**. Top 25 ESXi Hosts disk read/ write rate.
- **Top 25 ESXi Hosts Network Throughput**. Top 25 ESXi Hosts network throughput.
- **Top 25 ESXi Hosts Network Packet Rate**. Top 25 ESXi Hosts network transmitted/ received packet rate.
- **Top 25 ESXi Hosts Network Packet Error Rate**. Top 25 ESXi Hosts network transmitted/ received packet error rate.

### VMWare - VM Overview/ Details

<img src={useBaseUrl('img/integrations/containers-orchestration/Docker-Network-Usage-Otel.png')} alt="VMWare-VM-Overview-Details"/>

- **Top 25 VMs CPU Utilization**. Top 25 VMs cpu utilization.
- **Top 25 VMs Memory Utilization**. Top 25 VMs memory utilization.
- **Top 25 VMs Disk Utilization**. Top 25 VMs disk utilization.
- **Top 25 VMs Network Usage**. Top 25 VMs network usage.
- **Top 25 VMs Disk Usage**. Top 25 VMs disk usage.
- **Top 25 VMs CPU Usage**. Top 25 VMs cpu usage.
- **Top 25 VMs Memory Usage**. Top 25 VMs memory usage.
- **Top 25 VMs Memory Ballooning**. Top 25 VMs memory ballooning.
- **Top 25 VMs Disk Read/ Write Latency**. Top 25 VMs disk read/ write latency.
- **Top 25 VMs Disk Read/ Write Rate**. Top 25 VMs disk read/ write rate.
- **Top 25 VMs Network Throughput**. Top 25 VMs network throughput.
- **Top 25 VMs Network Packet Rate**. Top 25 VMs network transmitted/ received packet rate.
- **Top 25 VMs Network Packet Drop Rate**. Top 25 VMs network transmitted/ received packet drop rate.
- **Top 25 VMs Memory Swapped**. Top 25 VMs memory swapped.

---
id: vmware
title: VMware
sidebar_label: VMware
description: The Sumo Logic App for VMware collects unified logs and metrics from the VMware cloud computing virtualization platform, including vCenter Server, vSphere, ESX/ESXi, and individual virtual machines, for real-time display in predefined dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/containers-orchestration/vmware.png')} alt="VMware dashboards" width="50" />

The VMware App uses unified logs and metrics from the VMware cloud computing virtualization platform to enable monitoring of vCenter, ESXi hosts and individual virtual machines metrics with real-time date displayed in predefined dashboards.

The dashboards provide insight into key events and metrics such as VM CPU, memory, disk utilization, under-provisioned physical hosts, and idle VMs. This enables you to determine capacity constraints and troubleshoot operational issues related to over-provisioning, changes to configuration, and VM movement.

See the [vSphere product page](https://www.vmware.com/products/vsphere.html) for more information on VMware hybrid cloud.

## Log and Metric types  

The Sumo Logic vCenter logs source and vCenter metrics source use the installed collector to gather the following data from VMWare:

* VMWare Events using the Events API. See [Events API](https://code.vmware.com/apis/196/vsphere/doc/vim.event.EventManager.html) for more details.
* VMWare Metrics using the Performance API. For more information, see [Performance API](https://code.vmware.com/apis/196/vsphere/doc/vim.PerformanceManager.html).

The dashboards provide real-time monitoring with visual data displays, allowing you to analyze events and performance metrics for efficient detection and troubleshooting.

### Sample log message

```json
2018-11-15 17:39:09.569 +0530 ,,, message=Error detected for sumo-win2k8-a-4 on xx1.sumolabs.com
in Production1-West: Agent can't send heartbeats.msg size: 612, sendto() returned: Operation not
permitted.,,,eventType=<class 'pyVmomi.VmomiSupport.vim.event.GeneralVmErrorEvent'>,,,
vm=ubuntu16.04-b-4,,,host=8df.sumolabs.com,,,datacenter=Production3-East,,,
computeResource=esx1.sumolabscluster.com,,,key=3553,,,chainId=3269
```

### Sample Query

The following query is from the vSphere Errors Trend panel of the vCenter Errors - Analysis Dashboard.
```sql
_sourceCategory = Labs/VMWare6.5 and ("error" or "fail" or "critical")
| parse "message=*,,," as err_msg
| parse "host=*,,," as esx_host
| parse "eventType=*,,," as event_type
| parse "vm=*,,," as vm nodrop
| parse "computeResource=*,,," as cluster
| where esx_host matches {{esx_host}} and cluster matches {{cluster}} and event_type matches {{event_type}}
| timeslice 1h
| count(err_msg) as err_count by _timeslice
| compare with timeshift 1d 7
```

## Prerequisites

* **Supported Software Versions**. The VMware App works with vCenter and vSphere 6.5, 6.7, and 7.0.
* **Sumo Logic Scripts for VMware**. The Sumo Logic scripts required to work with the app are located here: [sumo-vsphere-ulm.zip](https://s3.amazonaws.com/appdevstore/VMWare/sumo-vsphere-ulm.zip).


## Collecting Logs and Metrics for the VMware App

The VMware App collects logs and metrics from your VMware cloud computing virtualization platform, then displays the data in predefined dashboards. The App enables you to monitor vCenter, ESXi hosts and VM metrics and events.

This section provides instructions for collecting logs and metrics for VMware.

### Step 1: Set up a server, host, or VM to collect data

You can use the following method for setting up a server to collect data for the VMware App:

If you have an existing VM, you can go directly to [Installing the Sumo Logic scripts on a VM](#Installing_Sumo_Logic_scripts_on_a_vCenter_server.2C_another_host.2C_or_VM) and proceed with following the instructions.

[Install the Sumo Logic scripts](#Installing_Sumo_Logic_scripts_on_a_vCenter_server.2C_another_host.2C_or_VM) for events and metrics on a vCenter server, or another host with access to vCenter API’s.


#### Installing Sumo Logic scripts on a vCenter server, another host, or VM

This section walks you through the process of installing Sumo Logic scripts for events and metrics on a vCenter server, or another host with access to vCenter API. Lastly, it provides instructions for configuring the path to run the scripts, whether on a vCenter server, host, or VM.

To install and configure the Sumo Logic scripts, do the following:
1. On the server, host, or VM create a directory in which to put the Sumo Logic scripts from [Sumo Logic Scripts](https://github.com/SumoLogic/sumologic-vmware/tree/master/vsphere) for VMware. We recommend that you name the directory **/var/log/vmware**, or something similar.
2. Download the Sumo Logic VMware scripts from [here](https://s3.amazonaws.com/appdevstore/VMWare/sumo-vsphere-ulm.zip), into the directory you just created.
3. Install [python](https://www.python.org/) version 3.6, or later.
4. Install [pyvmomi](https://pypi.org/project/pyvmomi/) 6.7.3:
```
pip install pyvmomi==6.7.3
```
5. Verify that the user account which will run the Sumo Logic VMware scripts has full read/write/execute permissions for the directories where the scripts will be placed. Without adequate permissions (read/write/execute) for the directories in which the scripts files reside, unexpected script errors will occur.
6. Edit the **cron_vcenter_events.sh** script, changing the `SCRIPT_PATH` variable to reflect the **absolute path** where the script resides. If you have multiple vCenter servers, create a new line for each one.


### Step 2: Download and install the Collector

An Installed Collector is a Java agent that receives logs and metrics from its Sources and then encrypts, compresses, and sends the data to the Sumo service. The Collector runs as a service and starts automatically after installing or rebooting.

**To install a Collector to collect logs and metrics:** refer to this [link](/docs/send-data/installed-collectors) for installation instructions.


### Step 3: Collect logs and metrics for the VMware App

This section explains how to set up a vCenter server, host, or VM to collect logs and metric for the Sumo Logic App for VMware. Click a link to jump to a topic.

1. [Collecting event messages](#A._Collecting_event_messages)
2. [Collecting performance metrics](#B._Collecting_performance_metrics)
3. [Collecting historical events](#C._Collecting_historical_events)


#### Collecting event messages

An event is an action that triggers an event message on a vCenter Server. Event messages are not logged, but are instead stored in the vCenter Server database. The Sumo Logic Collector for VMware retrieves these messages using the vSphere python SDK.

This procedure includes the following tasks:
* [Configuring logs to be collected](#To_configure_logs_to_be_collected.2C_do_the_following:)—Test running a python script from the directory containing the Sumo Logic scripts.
* [Configuring a syslog or a file source](#To_configure_a_syslog_source_for_the_Collector.2C_do_the_following:)—A Sumo Logic[ Syslog Source](/docs/send-data/installed-collectors/sources/syslog-source) operates like a Syslog server listening on the designated port to receive Syslog messages. The script supports syslog server, as well as generating a text file that can be ingested using [Local](/docs/send-data/installed-collectors/sources/local-file-source) or [Remote](/docs/send-data/installed-collectors/sources/remote-file-source) file source. A local file source is recommended as it has several benefits over Syslog, including no need to worry about connection retry, reading from the last pointer in a file, no data loss in the case of collector failure, and so on. Based on your preference, you can configure a syslog source, or a local or remote file source.

To configure logs to be collected, do the following:

1. To test the events.py script that queries the vCenter Server for events and sends the events to Sumo Logic, go to the directory for the Sumo Logic scripts and run the **events.py** script with the following command. Review the examples for the different source types.



Sample username format is **username@vsphere.local** or **domain/username**.

```bash
python3 events.py -s [vcenterserver] \
-u [username] -p [password] -f output.txt
```

**Example 1: Using a file output, use a local or remote file source in this case.**
```bash
python3 $SCRIPT_PATH/events.py -s 192.168.124.29 -t sumologic_host -to sumologic_host_port -u sumoadmin -p sumoadmin -f /var/log/vmware/output/vsphere_events
```

**Example 2: Using syslog and specific log directory with a specific log file prefix. Use a syslog source to ingest the logs.**
```bash
python3 $SCRIPT_PATH/events.py -s 192.168.124.29 -t sumologic_host -to sumologic_host_port -u sumoadmin -p sumoadmin -l /var/log/vmware/log/vsphere_events
```

**Example 3: Using syslog and specific log directory with a specific log file prefix and encrypted Password. Use a syslog source to ingest the logs.**
```bash
python3 $SCRIPT_PATH/events.py -s 192.168.124.29 -t sumologic_host -to sumologic_host_port -u sumoadmin -pK 'xgb8NJ3ZYPJbzX6vWHySZbLd73bKWPsGMKoSnry7hL4=' -p 'gAAAAABb6asvlRfxEj_ZQTKOyrqnGNMbfo_kpxrqv4DCO6TorS4FmKFzrepe0_xtiMT67ZT6OOf5bfrVZXNnUDFNlwPWrpFSfg==' -pE True -l /var/log/vmware/log/vsphere_events
```

By default, script starts collecting data for the past 24 hours, to retrieve data for smaller time range for testing purposes set the parameter -bT to the time from when to start data collection, for example, one hour earlier:

```bash
python3 events.py -s <vcenter server> -t <syslog host> -to <syslog host port> -bT <time>
```

**For Example:**

```bash
python3 events.py  -s 192.168.23.242 -t vcenterhost -to 1514 -bT '2012-10-08 00:17:00.000+0000'
```

**The script supports the following parameters:**

**-s**: Remote vCenter Server to connect to. Required Parameter.

**-o**: Remote vCenter Server port to use, default 443. Optional.

**-u**: User name to use when connecting to vCenter server. Required.

**-p**: Password to use when connecting to vCenter server. Required.

**-f**: Output File Prefix. Target syslog server or file is required.

**-ts**: Timestamp File. Default ‘.timelog_events’. Optional.

**-t**: Target Sumologic syslog server. Target syslog server or file is required.

**-to**: Target Sumologic port to use, default 514. Optional.

**-bT**: Begin Time to query for the events. Default Current Time.

**-eT**: End Time to query for the events. Default Current Time minus 24 hours.


    **-sC**: SSL cert for connection. Optional.


    **-l**: Log File Prefix. Default: `vsphere_events_`. By default, the log file is created in the execution directory. Full log path and prefix can also be specified for example: `-l C:\Users\user6\vsphere_events`, where “vsphere_events” is the log prefix. The log file is created with prefix + current timestamp.


    **-pE**: Is the password encrypted? Default False. Optional.


    **-pK**: Encryption Key for Password. Required if -pE is True.

1. Once you are satisfied with the output, modify the **cron_vcenter_events.sh** with the required parameters and create a cron job to periodically run the **cron_vcenter_events.sh** script at the desired time interval.
* If utilizing a syslog source, provide the target and target port parameters where the Sumo Collector is installed. If utilizing a local or remote source, use the file parameter to generate the file and configure the **File Path** for local file source or **Path Expression** for Remote file source.
* The cron job needs to run as root, or as a user who has read and write access to the script directories.
* For more detailed information, see the shell script for configuration options.

For a file source, configure a local or remote file source in one of the following ways:

* **If the script and the Sumologic collector are on the same server,** configure a local file source by following [these](/docs/send-data/installed-collectors/sources/local-file-source) steps. Configure the **File Path** for local file source. Set **Path Expression** equivalent to the output directory mentioned in previous section using **-f** flag, for example: `/var/log/vmware/output/`
* **If the script and the Sumologic collector are on different servers**, configure a remote file source by following [these](/docs/send-data/installed-collectors/sources/remote-file-source) steps. Configure the **Path Expression** for Remote file source. Set **Path Expression** equivalent to the output directory mentioned in previous section using **-f** flag, for example: `/var/log/vmware/output/`

**For a syslog source, configure the syslog source in the following way:**

1. Go to **Manage Data** > **Collection** > **Collection** and click **Add Source**.
2. Select **Syslog** for the Source type.
3. Enter a **Name** to display for this Source. Source name metadata is stored in a searchable field called _sourceName.
4. For **Protocol** choose **TCP**.
5. Enter the correct **Port** number (for your Collector) for the Source to listen to, such as 1514.
6. For **Source Category**, we recommend using **vcenter_events**.
7. Under **Advanced**, set the following options:
—Select **Extract timestamp information from log file entries**.
—Select **Ignore time zone from log file and instead use** and then choose **UTC** from the menu (as shown below).
8. Click **Save**.


#### Collecting performance metrics

Collecting performance metrics involves using scripts to call the vCenter performance API’s to extract performance statistics.

Performance data collection for ESXi servers associated with a vCenter server works by getting data from each ESXi server in parallel, using multiple threads. The number of threads depends on the amount of data you are collecting and the frequency of the collection.

The number of threads can be controlled using a property `THREADSIZE_POOL` in the sumo.json config file. You can also control the number of objects processed by a single thread using the property `BATCH_MORLIST_SIZE`. The following is a description of all the configuration properties.

```txt
BATCH_MORLIST_SIZE: Default 50, Simultaneous objects processed by a single thread for retrieving the performance data.
THREADSIZE_POOL: Default 5, Number of threads
SSL_VERIFY: Default False, if using SSL, set as True
SSL_CAPATH: Certificate absolute path if SSL_VERIFY is True
```

To collect performance metrics, do the following:

1. Follow the instructions to configure a [Streaming Metrics Source](/docs/send-data/installed-collectors/sources/streaming-metrics-source).
2. Edit the properties in the bundled sumo.json properties file, as necessary.
3. Go to the directory for the Sumo Logic scripts, and run the **esx_perf_metrics_6_5.py** script—which queries the vCenter Server for metrics—from that location (this script queries the vCenter Server for events) with the following command:
```bash
python3 esx_perf_metrics_6_5.py -u [username] -p [password] -s [vcenter server] -t [target server] -to [target port] -cf [config filename]
```

**Example 1: Using metrics streaming source and specific log directory with a specific log file prefix.**

```bash
python3 $SCRIPT_PATH/esx_perf_metrics_6_5.py -s 192.168.124.29 -t sumologic_host -to sumologic_host_port -u sumoadmin -p sumoadmin -cf $SCRIPT_PATH/sumo.json -l /var/log/vmware/log/metrics
```

**Example 2: Using specific log directory with a specific log file prefix and encrypted Password.**

```bash
python3 $SCRIPT_PATH/esx_perf_metrics_6_5.py -s 192.168.124.29 -t sumologic_host -to sumologic_host_port -u sumoadmin -cf $SCRIPT_PATH/sumo.json -l /var/log/vmware/log/vsphere_metrics -pK 'xgb8NJ3ZYPJbzX6vWHySZbLd73bKWPsGMKoSnry7hL4=' -p 'gAAAAABb6asvlRfxEj_ZQTKOyrqnGNMbfo_kpxrqv4DCO6TorS4FmKFzrepe0_xtiMT67ZT6OOf5bfrVZXNnUDFNlwPWrpFSfg==' -pE True
```

**The script supports the following parameters:**

**-s**: Remote vCenter Server to connect to. Required Parameter.


    **-o**: Remote vCenter Server port to use, default 443. Optional.


    **-u**: User name to use when connecting to vCenter server. Required.


    **-p**: Password to use when connecting to vCenter server. Required.


    **-ts**: Timestamp File. Default ‘.timelog_metrics’.


    **-t**: Target Sumologic syslog server. Required.


    **-to**: Target Sumologic port to use, default 514. Optional.


    **-cf**: Configuration File. Required.


    **-l**: Log File Prefix. Default: `vsphere_metrics_`. By Default the log file is created in the execution directory. Full log path and log prefix can also be specified for example: `-l C:\Users\user6\vsphere_metrics`, where “vsphere_metrics” is the log prefix and is required. The log file is created with prefix + current timestamp.

    **-pE**: Is the password encrypted? Default False. Optional.

    **-pK**: Encryption Key for Password. Required if -pE is True.

1. In Sumo Logic, verify that metrics are being captured.
2. When you are satisfied with the batch and thread configurations, modify the **cron_vcenter_metrics.sh** with the required parameters and create a cron job to periodically run the **cron_vcenter_metrics.sh** script at the desired time interval.
* The cron job needs to be run as root, or as a user who has read and write access to the script directories.
* For more detailed information, see the shell script for configuration options.

    Sample CRON job to periodically run the **cron_vcenter_metrics.sh** script every 15 minutes, (use the **sudo crontab -e** option) and add the following line:

```sql
*/15 * * * * /var/log/vmware/cron_vcenter_metrics.sh
```

#### Collecting historical events

By default, the first time** events.py** is called, events from the past 24 hours are collected. Each time the script is called, it writes the timestamp of the last read event in a file named **.timelog_events** for the next call to pick up.

To collect events older than the past 24 hours, before setting up the CRON job for **cron_vcenter_events.sh**, run the script as following:

```bash
python3 events.py -s <vcenter server> \
-t <syslog host> -to <syslog host port> -bT <time>
```

The syslog server should reflect the IP address or hostname of the machine where the Sumologic collector is installed; the syslog_port should reflect the port number that you previously set up for the Source responsible for collecting vCenter Server Events. For example, to collect all events starting from 5:00 pm on October 8, 2012, you would run the following command:

```bash
python3 events.py  -s 192.168.23.242 \
-t vcenterhost -to 1514 -bT '2012-10-08 00:17:00.000+0000'
```

Once this command completes successfully, you can pick up ongoing events by setting up the cron job.


### Step 4: Encrypt passwords

The scripts support symmetric authenticated cryptography—also known as secret key authentication—using the python Fernet implementation.

**To utilize encryption**, generate a key from the python command line:

```bash
>>> from cryptography.fernet import Fernet
>>> print(Fernet.generate_key())
b'xgb8NJ3ZYPJbzX6vWHySZbLd73bKWPsGMKoSnry7hL4='
```

**Encrypt the password** from your python command line:

```bash
>>> from cryptography.fernet import Fernet
>>> key = b'xgb8NJ3ZYPJbzX6vWHySZbLd73bKWPsGMKoSnry7hL4='
>>> s = Fernet(key)
>>> text = s.encrypt(b"secretpassword")
>>> print(text)
b'gAAAAABb6asvlRfxEj_ZQTKOyrqnGNMbfo_kpxrqv4DCO6TorS4FmKFzrepe0_xtiMT67ZT6OOf5bfrVZXNnUDFNlwPWrpFSfg=='
```


**Modify the scripts to include the encrypted password and the key**

Example for Metrics:

```bash
python3 esx_perf_metrics_6_5.py -u [username] -pK 'xgb8NJ3ZYPJbzX6vWHySZbLd73bKWPsGMKoSnry7hL4=' -p 'gAAAAABb6asvlRfxEj_ZQTKOyrqnGNMbfo_kpxrqv4DCO6TorS4FmKFzrepe0_xtiMT67ZT6OOf5bfrVZXNnUDFNlwPWrpFSfg==' -s 192.168.20.121 -t 127.0.0.1 -to 2003 -cf sumo.json -pE True
```

Example for Events:

```bash
python3 events.py -s 192.168.20.121 -u [username] -f outfile -pK 'xgb8NJ3ZYPJbzX6vWHySZbLd73bKWPsGMKoSnry7hL4=' -p 'gAAAAABb6asvlRfxEj_ZQTKOyrqnGNMbfo_kpxrqv4DCO6TorS4FmKFzrepe0_xtiMT67ZT6OOf5bfrVZXNnUDFNlwPWrpFSfg==' -pE True
```

The pE flag is used to specify whether the password is encrypted or not. Default is false.


### Troubleshooting

* The scripts need read and write access to the directory to generate logs and maintain timestamps.
* Python must be installed, as the scripts use python.
* Scripts generate logs which can be reviewed if problems arise.
* The logs are generated for each run under the configured working directory.
* The scripts must connect to a vCenter server and _not_ an ESXi server, as many of the APIs are not supported on ESXi servers.
* If the collector is not running but the script is, the metrics and events will be lost. In such a case, once the collector is running again, update the timestamp in the files .timelog_events and .timelog_metrics to the required start time. This will allow you to retrieve the old data. After the script retrieves the old data, it continues with normal processing.
* vSphere pyvmomi sdk throws Parse Exception for some [events](https://github.com/vmware/pyvmomi/issues/746).
    * If you face any issues like these, remove the corresponding event from the events list in the file vmware_constants.py.
    * If an event is missing from the event list, it can be added as well.
    * If the issues are fixed in the sdk, the below list can be blanked as event_type_list = [] to retrieve all the events.
    * If following error is encountered: “pyVmomi.VmomiSupport.UnknownWsdlTypeError: 'ContentLibrary'”, remove TaskEvent and EventEx from the vmware_constants.py and try again.


## Installing the VMware App

This section provides instructions for installing the VMware App, as well as the descriptions of each of the app dashboards.

Now that you have set up collection for VMWare, you can install the VMWare App to use the preconfigured searches and Dashboards that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing VMware Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that narrow search results across the entire dashboard.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


### vCenter Operations - Overview

The **VMware - vCenter Operations - Overview** dashboard provides an at-a-glance view of unique clusters, ESXi hosts, unique VMs, and VM failures by ESXi host, as well as vCenter task trends, vSphere errors across clusters, VM operations over time, ESXi per-host metrics for CPU usage and idle time, memory usage and capacity, disk usage and datastore read rate, network usage and system uptime. It also displays data for vCenter alarms, user activity, and VM operations by user.

Use this dashboard to:
* Get an at-a-glance overview of your entire VMware infrastructure.
* Monitor VM failures, tasks, and errors.
* Track user activity and operations.
* Review summaries of the state of the components of the VMware infrastructure.
* Assess infrastructure issues at a glance with the dashboard panels.

<img src={useBaseUrl('img/integrations/containers-orchestration/VMware-Overview.png')} alt="VMware dashboards" />


### vCenter Errors - Analysis

The** VMware - vCenter Errors - Analysis** dashboard provides detailed information about the errors across cluster and hosts. You can easily review error trends, top error events, and most recent error events.

Use this dashboard to:
* Review 7 day error trends.
* Quickly assess the most frequent and recurring error conditions.
* Review error messages, host, cluster, and other details to help with debugging.

<img src={useBaseUrl('img/integrations/containers-orchestration/VMware-vCenter-Errors-Analysis.png')} alt="VMware dashboards" />


### Virtual Machine Errors - Analysis

The **VMware - Virtual Machine Errors - Analysis **dashboard provides an at-a-glance analysis of VM errors, including MAC address and UUID conflicts, upgrade and VM failures by host, fault tolerance errors, VM power failures, and general VM errors.

Use this dashboard to:
* Monitor faulty VMs with performance or other issues.
* Determine VMs with power on and off failures.
* Assess VMs with fault tolerance issues.
* Determine MAC address and  UUID conflicts, as well as primary VM failures.
* Monitor overall VM health.

<img src={useBaseUrl('img/integrations/containers-orchestration/VMware-Virtual-Machine-Errors-Analysis.png')} alt="VMware dashboards" />

### Datastore

The **VMware - Datastore** dashboard provides performance metrics on datastore read rates per ESXi host and VM, and datastore write rates per ESXi host and VM. A datastore is a manageable storage entity, usually used as a repository for virtual machine files including log files, scripts, configuration files, virtual disks, and so on.

Use this dashboard to:
* Review of the datastore reads and writes by the virtual machines and ESXi hosts.
* Identify excessive writes or reads by a VM or ESXi host.

<img src={useBaseUrl('img/integrations/containers-orchestration/VMware-Datastore.png')} alt="VMware dashboards" />


### Network

The **VMware -** **Network **dashboard** **keeps track of the data in and data out of the ESXi hosts and virtual machines. This dashboard provides an at-a-glance analysis of network usage per ESXi host and VM, network InPacket rate per ESXi host and VM, network OutPacket rate per ESXi host and VM, and network 1 day comparison by host.

Use this dashboard to:
* Identify excessing packet traffic in or out.
* Identify network inactivity for a VM or host.
* Track network usage.

<img src={useBaseUrl('img/integrations/containers-orchestration/VMware-Network.png')} alt="VMware dashboards" />

### Disk

The **VMware - Disk** dashboard keeps track of the disk usage, disk writes and reads by the ESXi hosts and virtual machines. You can easily review metrics for disk usage per ESXi host and VM, disk read rate per ESXi host and VM, disk write rate per ESXi host and VM, disk total read latency per host, and disk total write latency per host.

Use this dashboard to:

* Identify excessive writes or reads by a VM or a ESXi host.
* Track disk read and write latency.

<img src={useBaseUrl('img/integrations/containers-orchestration/VMware-Disk.png')} alt="VMware dashboards" />


### Memory

The **VMware - Memory** dashboard provides an at-a-glance analysis of memory usage by ESXi host and VM, memory granted by ESXi host and VM, and memory capacity by ESXi host.

Use this dashboard to:
* Review of the memory usage per virtual machine and ESXi host.
* Identify excessive memory usage by VM or ESXi host.
* Track granted memory and memory capacity to determine memory needs and over provisioning.

<img src={useBaseUrl('img/integrations/containers-orchestration/VMware-Memory.png')} alt="VMware dashboards" />


### CPU

The **VMware - CPU** dashboard tracks the CPU consumed by the virtual machines and ESXi hosts with at-a-glance analysis of CPU usage, idle time, and VM CPU wait time.

Use this dashboard to:
* Monitor spikes in CPU activity. Frequent spikes in CPU activity for a VM without any load may signify issues with the VM configurations.
* Track CPU idle time.
* Monitor VM wait time, the time a VM was ready to perform some action but wasn't able to because of CPU unavailability. This can help determine CPU needs of the infrastructure.

<img src={useBaseUrl('img/integrations/containers-orchestration/VMware-CPU.png')} alt="VMware dashboards" />

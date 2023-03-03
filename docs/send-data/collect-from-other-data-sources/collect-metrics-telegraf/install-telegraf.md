---
id: install-telegraf
title: Installing Telegraf for Sumo Logic
sidebar_label: Installing Telegraf
description: Learn how to install Telegraf.
---

This topic has instructions for installing Telegraf to work with Sumo Logic. We provide two sets of instructions:

 * Install Telegraf in a non-Kubernetes environment
 * Install Telegraf in a Kubernetes environment

import useBaseUrl from '@docusaurus/useBaseUrl';

:::note
If you’re new to Telegraf, see [Telegraf Collection Architecture](telegraf-collection-architecture.md), which has an overview of Telegraf and the metric collection pipelines for both Kubernetes and non-Kubernetes environments.
:::

## Install Telegraf in a non-Kubernetes environment

This section has instructions for running Telegraf in a non-Kubernetes environment. 

## Prerequisites 

This section describes prerequisites for installing Telgraf.

## Privileges

Installing Telegraf typically requires root or administrator privileges. However, If you're using a pre-built binary, this is not the case. 

## Networking

Telegraf input plugins may require custom ports. You configure port mappings in `telegraf.conf`, which, in default Linux installations, is located in `/etc/telegraf`. In a Windows installation, the configuration file is in the directory where you unzipped the Telegraf archive, `C:\InfluxData\telegraf` by default.

### NTP

Telegraf uses a host’s local time in UTC to assign timestamps to data. Use the Network Time Protocol (NTP) to synchronize time between hosts; if hosts’ clocks aren’t synchronized with NTP, the timestamps on the data can be inaccurate.

## Get Telegraf

You need a minimum of 1.16 version of Telegraf. Download a [\>=1.16 release of](https://github.com/influxdata/telegraf/releases) Telegraf. 

## Install Telegraf on Ubuntu or Debian with apt-get

This section has instructions for installing the latest stable version of Telegraf on Ubuntu or Debian using the apt-get package manager. 

:::note
If you want to install Telegraf using a .deb file, or on Windows see [Manually install Telegraf from a .deb file](#manually-install-telegraf-on-debian-from-a-deb-file) or [Install Telegraf on Windows](#install-telegraf-on-windows). Telegraf releases are available for all Operating Systems through the portal [downloads page](https://portal.influxdata.com/downloads/).
:::

1. Add the InfluxData repository on Ubuntu or Debian, then run the following command in a terminal window:

    ```bash
    # influxdata-archive_compat.key GPG fingerprint:
    # 9D53 9D90 D332 8DC7 D6C8 D3B9 D8FF 8E1F 7DF8 B07E
    wget -q https://repos.influxdata.com/influxdata-archive_compat.key
    echo '393e8779c89ac8d958f81f942f9ad7fb82a25e133faddaf92e15b16e6ac9ce4c influxdata-archive_compat.key' | sha256sum -c && cat influxdata-archive_compat.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/influxdata-archive_compat.gpg > /dev/null
    echo 'deb [signed-by=/etc/apt/trusted.gpg.d/influxdata-archive_compat.gpg] https://repos.influxdata.com/debian stable main' | sudo tee /etc/apt/sources.list.d/influxdata.list
    sudo apt-get update && sudo apt-get install telegraf
    ```

1. To install and start the Telegraf service, run the following commands in a terminal window:

    ```bash
    sudo apt-get update && sudo apt-get install telegraf
    # update /etc/telegraf/telegraf.conf with your
    # specific config settings, then start the service
    sudo systemctl start telegraf
    ```

## Manually install Telegraf on Debian from a .deb file

To manually install the Debian package from a .deb file:

1. Download the latest Telegraf .deb release from the Telegraf section of the [downloads page](https://portal.influxdata.com/downloads/).
1. Run the following command (making sure to supply the correct version number for the downloaded file):

    ```bash
    sudo dpkg -i telegraf_1.<version>_amd64.deb
    ```

## Install Telegraf on Windows

Telegraf has native support for running as a Windows service. For additional information, see the Influx blog post [Using Telegraf on Windows](https://www.influxdata.com/blog/using-telegraf-on-windows/).

:::note
You must have administrative permissions to install a Windows service. Be sure to launch Powershell as administrator.
:::

1. Launch PowerShell as an administrator.
1. Download the Telegraf binary from the Telegraf section of the [downloads page](https://portal.influxdata.com/downloads/) and unzip its contents to `C:\Program Files\InfluxData\Telegraf`. The InfluxData [GitHub repository](https://github.com/influxdata/telegraf/releases) provides a list of all available releases.   You can also use the following Invoke-WebRequest PowerShell command with a specific Telegraf version (1.80.0 in this example):   

    ```bash
    > Invoke-WebRequest https://dl.influxdata.com/telegraf/releases/telegraf-1.80.0_windows_amd64.zip -OutFile telegraf.zip
    ```

1. In PowerShell, run these commands:   

    ```bash
    > cd "C:\Program Files\InfluxData\Telegraf"
    > .\telegraf.exe --service install --config "C:\Program Files\InfluxData\Telegraf\telegraf.conf"
    ```

    :::note
    Be sure to provide the absolute path to the Telegraf configuration file.
    :::

1. To test that the installation works, run:

    ```bash
    > C:\"Program Files"\InfluxData\Telegraf\telegraf.exe --config C:\"Program Files"\InfluxData\Telegraf\telegraf.conf --test
    ```

1. To start collecting data, run:

    ```bash
    telegraf.exe --service start
    ```

## Windows service logging and troubleshooting

When Telegraf runs as a Windows service, Telegraf logs messages to Windows event logs. If the Telegraf service fails to start, view error logs by selecting **Event Viewer > Windows Logs > Application**.

### Windows service commands

| Command | Description |
|:------------------------------------|:-------------------------------|
| `telegraf.exe --service install  ` | Install telegraf as a service |
| `telegraf.exe --service uninstall` | Remove the telegraf service   |
| `telegraf.exe --service start    ` | Start the telegraf service    |
| `telegraf.exe --service stop`      | Stop the telegraf service     |


If you're seeing the following error in Microsoft’s Services Control Panel Application (“Services.msc”) after clicking on telegraf service, please verify whether you have opened the powershell as administrator. [Learn more](https://github.com/influxdata/telegraf/issues/4235).<br/><img src={useBaseUrl('img/send-data/ms-error.png')} alt="MS" width="400"/>



## Install Telegraf in a Kubernetes environment

This section documents the steps for setting up Telegraf in a Kubernetes environment. Due to the dynamic nature of Kubernetes, we use the Telegraf Operator. 

1. First you need to set up Sumo Logic’s Kubernetes collection. If you haven't, go to [Installation with Helm](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/installation.md) and perform those setup steps.

    :::note
    When installing, make sure you enable the Telegraf Operator by adding this to the installation command: 
    ```Install Telegraf
    --set telegraf-operator.enabled=true
    ```
    :::

   * If you have already set up Kubernetes collection, you can upgrade to the latest version and enable the Telegraf Operator.
    ```bash
    helm upgrade ... --set telegraf-operator.enabled=true ... 
    ```

1. After the Telegraf Operator pod is ready, add the following annotations to the pods from which you want to collect metrics.
    ```yml
    telegraf.influxdata.com/inputs: |+
    # Telegraf configuration for scrapping metrics goes here
    (nginx example)
            [[inputs.nginx]]
                urls = ["http://localhost:8080/stub_status"]
    # Points to predefined output configuration \
    # (exposing metrics to prometheus, so metadata enrichment can be performed)            
    telegraf.influxdata.com/class: sumologic-prometheus  
    # Enable scrapping metrics by prometheus
    prometheus.io/scrape: "true"  
    # Defines from which port prometheus should scrape metrics
    prometheus.io/port: "9273"    
    ```

For more details and examples, see [Configure Telegraf Input Plugins](configure-telegraf-input-plugins.md). 

## Configuring Telegraf

Telegraf supports a number of configuration options. Below is a summary of some of the most common ones. For the complete list, see [Telegraf documentation](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md).

### Adjust the collection interval

You can adjust the collection and reporting intervals in the `[agent]` block of your Telegraf configuration. The scraping interval is configured with the `interval` property, and the `flush_interval` property specifies the interval at which the data will be sent to configured outputs. Specify durations by combining an integer value and time unit as a string value. Valid time units are `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`. The default is 10  seconds.

The following example collects and send metrics to Sumo Logic every 30 seconds.

```sql
[agent]
  interval = "30s"
  flush_interval = "30s"
```

### Add additional metadata

You may wish to add additional metadata to the metrics that Telegraf collects. You can do so with Global Tags. Global tags can be specified in the `[global_tags]` table in key="value" format. All metrics that are collected will be tagged with the specified tags.

```sql
[global_tags]
  dc = "us-east-1"
```

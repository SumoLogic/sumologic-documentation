---
id: troubleshooting-and-faqs
title: Troubleshooting and Faqs
sidebar_label: Troubleshooting and Faqs
description: Troubleshooting and Faqs
---

This document contains common troubleshooting scenarios and frequently asked questions about Sumo Logic Open Telemetry Collector from our customers and field teams (SE, TAM, Support Engineers).

## Collector fails to connect to Sumo

### Question

How do I provide a PROXY setting to Sumo Logic Otel Collector so that it can connect to Sumo Backend?

* For Linux
* For Windows
* For MacOS

### Answer

Exporters leverage the HTTP communication and respect the following proxy environment variables:

* `HTTP_PROXY`
* `HTTPS_PROXY`
* `NO_PROXY`

You may either export proxy environment variables locally, for example:

`export FTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`
`export HTTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`
`export HTTPS_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`

Or make them available globally for all users, for example:

`tee -a /etc/profile << END`
`export FTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`
`export HTTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`
`export HTTPS_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`
`END`

### Question

On Windows, I am running the Collector install command on CMD. Why does it fail?

### Answer

The Collector install command needs to be run in PowerShell on Windows.

### Question

On Linux, I am unable to view/edit `config.yaml` files within the `conf.d` directory?

### Answer

These directories and files require root permission to access. You can use `sudo` command.

### Question

The install script is not working for me. How can I install the Sumo Logic Collector on my OS?

### Answer

To install the script on your OS, refer to the [Installation Script documentation](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/installation.md#manual-installation). You will need to manage configuration files on your own.

### Question

I updated/added a new config file on the Sumo Otel Collector, and it is not starting up ?

### Answer

Most likely the issue is because the `config.YAML` file is malformed. Make sure that it is a valid YAML with appropriate indentation.

### Question

I don’t have a root or admin permissions. Can I still install the Sumo Otel Collector?

### Answer

Yes, you can install it manually (https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/installation.md#manual-installation) by placing it in a local directory in your PATH ($HOME/bin is often used for this). Note that some functionalities will be unavailable when running as non-root, specific host metrics, for example.

### Question

On MacOS, the Collector stops sending data after some time ?

### Answer

Because the Collector is connected to the terminal, it will stop reporting data when you log off, close the terminal, or put the computer to sleep.

## App Installation Troubleshooting

### Question

When installing an App I get the error “Could not receive data” even though I have installed the Collector and source, and I can confirm that data is flowing in. How do I resolve this error?

### Answer

If you are not using the **Sumo Logic Open Telemetry collector**, and using the **Upstream Open Telemetry collector**, and have a custom `config.yaml` file to collect data, then you might see this error because Sumo Logic expects specific tags on the data, which the Sumo Logic distribution for Open Telemetry Collector creates by default.


## Frequently Asked Questions

### Question

How can I filter out metrics from being collected?
* Linux
* Windows  

### Answer

Both Linux and Windows users can utilize the filter processor provided by the OpenTelemetry Collector Contributor repository to filter out metrics from being collected. The filter processor can be used to selectively drop or pass through data based on certain conditions, but the specifics of the filtering would depend on the use case and requirements. For more information, refer to the [Filter Processor documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md.).

### Question

How can I filter out log files using the Otel Collector?

### Answer

To filter out log files using the OpenTelemetry Collector, users can use the same filter processor described in the above Answer.

### Question

Can I filter out specific loglines within a log file using Otel ? If, yes how?

### Answer

Any condition you can express using the filter processor can be used for this. You can refer to the above Answer.

### Question

How to forward data from the Otel Collector to other places (like S3)?

### Answer

You must add additional exporters to the pipeline from which you want to forward data. There is currently no exporter for s3, but you can export to a file using [File-Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/fileexporter).

### Question

How is the Sumo Otel Collector different from the Installed Collector? Which one should I use?

### Answer

You can compare the Otel and Installed Collector[here](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/comparison.md) to decide which one is right for you.

### Question

What OS versions does the Sumo Logic Open Telemetry Collector support?

### Answer

The following operating systems are officially supported:

| Operating System | Versions Supported |
| ---------------- | ------------------ |
| Linux            | RHEL (7-9), Debian (9-11), Ubuntu (18-22), SUSE (ES12, ES15), Amazon Linux 2, CentOS (7, 8) |
| Windows          | Windows 10 and up, Windows Server 2016 and up |
| MacOS            | MacOS 10.X and up |

:::note
Otel Collector might work on other OS platforms and versions but those are not officially tested by Sumo Logic, so we cannot guarantee support.
:::

### Question

What to do if MacOS restart command doesn’t work (following error)? 

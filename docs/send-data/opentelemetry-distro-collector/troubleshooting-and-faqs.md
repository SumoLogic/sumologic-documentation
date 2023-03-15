---
id: troubleshooting-and-faqs
title: Troubleshooting and Faqs
sidebar_label: Troubleshooting and Faqs
description: Troubleshooting and Faqs
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This document contains common troubleshooting scenarios and frequently asked questions about Sumo Logic Open Telemetry Collector from our customers and field teams (SE, TAM, Support Engineers).

## Collector fails to connect to Sumo Logic

### Question

How do I provide a PROXY setting to Sumo Logic OpenTelemetry Collector so that it can connect to Sumo Logic Backend?

* For Linux
* For Windows
* For MacOS

### Answer

To configure a proxy setting for the Sumo Logic OpenTelemetry Collector so that it can connect to the Sumo Logic backend, you can use the `HTTP_PROXY` or `HTTPS_PROXY` environment variables.

To do this, you need to export the environment variables in your terminal or command prompt, with the proxy server address and port replaced by the actual address and port of the proxy server you want to use.

For example, you can use the following command to export the `HTTP_PROXY` and `HTTPS_PROXY` environment variables in your terminal:
Exporters leverage the HTTP communication and respect the following proxy environment variables:

`export FTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`
`export HTTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`
`export HTTPS_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`

If you want to make these variables available globally for all users, you can add them to the /etc/profile file using a command like this:

`sudo tee -a /etc/profile << END`
`export FTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`
`export HTTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`
`export HTTPS_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>`
`END`

To exclude a specific domain or IP address from using the proxy, you can add it to the NO_PROXY environment variable. For example, to exclude the domain sumologic.com from using the proxy, you can add the following command:

`export NO_PROXY=sumologic.com`

After setting up the proxy environment variables, you can start the Sumo Logic OpenTelemetry Collector and it should be able to establish a connection with the Sumo Logic backend through the proxy.

### Question

On Windows, I am running the Collector install command on CMD. Why does it fail?

### Answer

On Windows, the Collector installation command must be run in PowerShell.

### Question

On Linux, I am unable to view/edit `config.yaml` files within the `conf.d` directory?

### Answer

These directories and files require root permission to access. You can use `sudo` command.

### Question

The install script is not working for me. How can I install the Sumo Logic Collector on my OS?

### Answer

To install the script on your OS, refer to the [Installation Script documentation](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/installation.md#manual-installation). You will need to manage configuration files on your own.

### Question

I updated/added a new config file on the Sumo OpenTelemetry Collector, and it is not starting up ?

### Answer

Most likely the issue is because the `config.YAML` file is malformed. Make sure that it is a valid YAML with appropriate indentation.

### Question

I don’t have a root or admin permissions. Can I still install the Sumo OpenTelemetry Collector?

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

How can I filter out log files using the OpenTelemetry Collector?

### Answer

To filter out log files using the OpenTelemetry Collector, users can use the same filter processor process described in the above Answer.

### Question

Can I filter out specific loglines within a log file using Sumo Logic OpenTelemetry Collector ? If, yes what is the process to do this?

### Answer

Any condition you can express using the filter processor can be used for this. You can refer to the above Answer.

### Question

How to forward data from the OpenTelemetry Collector to other places (like S3)?

### Answer

You must add additional exporters to the pipeline from which you want to forward data. There is currently no exporter for s3, but you can export to a file using [File-Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/fileexporter).

### Question

How is the Sumo OpenTelemetry Collector different from the Installed Collector? Which one should I use?

### Answer

You can compare the OpenTelemetry and Installed Collector [here](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/comparison.md) to decide which one is right for you.

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
OpenTelemetry Collector might work on other OS platforms and versions but those are not officially tested by Sumo Logic, so we cannot guarantee support.
:::

### Question

What to do if MacOS restart command doesn’t work (following error)?

### Question

What to do if the MacOS restart command doesn’t work?

### Answer

If you encounter an error stating that the `glob` scheme is not supported for a URI, it is likely that you might not be using the appropriate collector binary. Although, the `glob` provider is flexible and can accept a non-existent path without preventing the collector from starting.
* To ensure that you are using the correct binary, you can use the command `which otelcol-sumo` to check its location.
* Another way to verify the binary is to use `otelcol-sumo --version` to check its version number.

For example:

`% which otelcol-sumo`
`/usr/local/bin/otelcol-sumo`

`% otelcol-sumo -v`
`otelcol-sumo version v0.72.0-sumo-0`

### Question

I am seeing some errors related to Sumo Logic OpenTelemetry Collector stating that `Unable to collect from a file`. Does this mean my collector is not collecting any data? <br/> <img src={useBaseUrl('img/send-data/error-faq.png')} alt="error-faq.png" width="250" />

### Answer

In this case, this means that the collector couldn’t find the file you wanted to collect logs from */var/log/auth.log*.

### Question

I am seeing some errors related to Sumo Logic OpenTelemetry Collector stating that `Unable to get a heartbeat`. Does this mean my collector is not collecting any data? <br/> <img src={useBaseUrl('img/send-data/error2-faq.png')} alt="error2-faq.png" width="250" />

### Answer

This means the collector is having trouble connecting to the Sumo Logic backend. While data should still be collected and shipped to Sumo, the collector may appear as down in the user interface. In general, these types of errors can occur during normal operations. They can be safely ignored as long as they are not persistent.

### Question

Why am I receiving an error when collecting data from the Sumo Logic OpenTelemetry Collector? It is unable to read Process Data (PID, process name, and so on)? <br/> <img src={useBaseUrl('img/send-data/error2-faq.png')} alt="error2-faq.png" width="550" />

### Answer

This is a result of not running the collector as root.

### Question

How does an OpenTelemetry Collector send information to the Sumo Logic service?

### Answer

It uses the [OTLP protocol](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/otlp.md.an)

## Question

How frequently does OpenTelemetry Collector flush data to the Sumo Logic backend?

### Answer

By default, the OpenTelemetry Collector will flush data either every second or every time it accumulates 1024 data points, whichever comes first. These default values can be modified by adjusting the configuration settings of the collector.

### Question

What is the size of the Sumo OpenTelemetry Collector cache? Under what conditions does the Collector cache the data? How does caching work for the OpenTelemetry Collector?

### Answer

The default cache size for the Sumo OpenTelemetry Collector is 5000 batches, each containing up to 1024 data points. The actual on-disk size of the cache depends on the size of the data points, but it's typically around 700 bytes per data point.

The collector caches data when it’s unable to send it to the Sumo backend at the rate the data it is being produced. This can be due to various reasons, such as network issues or temporary unavailability of Sumo, and others.

### Question

Does the OpenTelemetry Collector get throttled? Under what circumstances does this happen ?

### Answer

The behavior is the same as for any other collection method.

### Question

Does the Sumo Logic backend know when a OpenTelemetry Collector is down ? How does that work ?

### Answer

The collector sends a heartbeat message every 15 seconds (by default).

### Question

How to Ingest Old or Historical Data​

### Answer

To ingest old or historical data is to use a [Filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver) for log collection. By default, the filelog receiver starts reading logs from the end of the file. However, this can be changed by adjusting the configuration file to start reading from the beginning of the file by setting `start_at: beginning`.

### Question

How to send data to multiple Sumo Logic accounts from a single collector?

### Question

How to send data to multiple Sumo Logic accounts from a single collector?

### Answer

To send data to multiple Sumo Logic accounts from a single collector, configure the Sumo Logic OpenTelemetry Collector with multiple extensions, each with its own access ID and key. For more information, refer to the [Multiple Sumo Logic Extensions](​​https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/configuration.md#using-multiple-sumo-logic-extensions) documentation.

### Question

Unable to install the OpenTelemetry agent using the `curl` command on Linux. Getting the follow error. 60.0%curl: (28) Operation timed out after X milliseconds with Y out of Z bytes received.

### Answer

This typically can happen when there is a slowdown on the network, or due to some issues on Github the side. Add the following parameter to the installation command. It will increase the timeout from default 180 seconds to 300 seconds. You can adjust the value to your needs.

`--download-timeout 300`

---
id: troubleshooting-faq
title: Troubleshooting and FAQ
description: Frequently asked questions about Sumo Logic OpenTelemetry Collector from our customers and field teams.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document contains common troubleshooting scenarios and frequently asked questions about the Sumo Logic OpenTelemetry Collector.

## About the Sumo Logic OTel Collector

#### What's the difference between OpenTelemetry and the Sumo Logic Distribution for OpenTelemetry?

[**OpenTelemetry**](https://opentelemetry.io/) is a state-of-the-art open standard for collecting all kinds of observability data. Using a single common standard, it can flexibly collect logs, metrics, and tracing data. It is open source and freely available to download and hack on. It comes out of the box with support for the most popular integrations and makes it very easy to implement new ones if your use case isn’t already covered (it probably is!).

The **Sumo Logic Distribution for OpenTelemetry** is a custom build of the OpenTelemetry collector that's optimized for interacting with Sumo Logic’s API. It supports everything the standard collector does, but has some additional extensions for Sumo Logic.

#### How is the Sumo Logic OpenTelemetry Collector different from the Installed Collector? Which one should I use?

You can compare the OpenTelemetry and Installed Collector [here](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/comparison.md) to decide which one is right for you.

#### What OS versions does the Sumo Logic OpenTelemetry Collector support?

The following operating systems are officially supported:

| Operating System | Versions Supported |
| :---------------- | :------------------ |
| Linux            | RHEL (7-9), Debian (9-11), Ubuntu (18-22), SUSE (ES12, ES15), Amazon Linux 2, CentOS (7, 8) |
| Windows          | Windows 10 and up, Windows Server 2016 and up |
| macOS            | macOS 10.X and up |

:::note
Although our OpenTelemetry Collector may work on other OS platforms and versions, those are not officially tested by Sumo Logic, so we cannot guarantee support.
:::


#### How does an OpenTelemetry Collector send information to the Sumo Logic service?

The OpenTelemetry Collector uses the [OTLP protocol](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/otlp.md) to send data to the Sumo Logic service.

#### How frequently does OpenTelemetry Collector flush data to the Sumo Logic backend?

By default, the OpenTelemetry Collector will flush data either every second or every time it accumulates 1024 data points, whichever comes first. These default values can be modified by adjusting the configuration settings of the collector.

#### What is the size of the Sumo Logic OpenTelemetry Collector cache? Under what conditions does the Collector cache the data? How does caching work for the OpenTelemetry Collector?

The default cache size for the Sumo Logic OpenTelemetry Collector is 5000 batches, each containing up to 1024 data points. The actual on-disk size of the cache depends on the size of the data points, but it's typically around 700 bytes per data point.

The collector caches data when it’s unable to send it to the Sumo backend at the rate the data it is being produced. This can be due to various reasons, such as network issues or temporary unavailability of Sumo, and others.

#### Does the Sumo Logic backend know when a OpenTelemetry Collector is down? How does that work?

The collector sends a heartbeat message every 15 seconds (by default).

#### Does the OpenTelemetry Collector get throttled? Under what circumstances does this happen?

The behavior is the same as for any other collection method.
* [Logs Throttling](/docs/manage/ingestion-volume/log-ingestion/#log-throttling)
* [Metrics Throttling](/docs/metrics/manage-metric-volume/metric-throttling/)


## Collector connection failure

#### How do I provide a proxy setting for the Sumo Logic OpenTelemetry Collector to connect to the Sumo Logic backend?

If your Collector fails to connect to Sumo Logic, you may need to configure a proxy setting for the Sumo Logic OpenTelemetry Collector so that it can connect to the Sumo Logic backend. The information how to install the proxy has been provided on the Install Collector page for the specific platform.
* [Linux Proxy](/docs/send-data/opentelemetry-collector/install-collector-linux/#using-proxy)
* [Windows Proxy](/docs/send-data/opentelemetry-collector/install-collector-windows/#using-proxy)
* [macOS Proxy](/docs/send-data/opentelemetry-collector/install-collector-macos/#using-proxy)

#### On macOS, does the Sumo Logic OpenTelemetry Collector stop sending data after some time?

Because the OpenTelemetry Collector is connected to the terminal, it will stop reporting data when you log off, close the terminal, or put the computer to sleep.


#### I am seeing some errors related to Sumo Logic OpenTelemetry Collector stating that `Unable to get a heartbeat`. Does this mean my collector is not collecting any data?

<img src={useBaseUrl('img/send-data/error2-faq.png')} alt="error2-faq.png" width="950" />

This means the collector is having trouble connecting to the Sumo Logic backend.

While data should still be collected and shipped to Sumo, the collector may appear as down in the user interface. In general, these types of errors can occur during normal operations. They can be safely ignored as long as they are not persistent.

## Collector installation errors

### Accessing the collector's logs

<Tabs
  className="unique-tabs"
  defaultValue="Systemd"
  values={[
    {label: 'Systemd', value: 'Systemd'},
    {label: 'Standalone Binary', value: 'Standalone Binary'},
    {label: 'Windows', value: 'Windows'},
  ]}>

<TabItem value="Systemd">

On systems with systemd, the logs are available in journald:

```sh
journalctl --unit otelcol-sumo
```

</TabItem>
<TabItem value="Standalone Binary">

On systems without systemd, the logs are available in the console output of the running process.

</TabItem>
<TabItem value="Windows">

On Windows, the logs are available in event viewer, or they can be listed using PowerShell:

```powershell
Get-EventLog -LogName Application -Newest 100 -Source OtelcolSumo | Select-Object -Property ReplacementStrings
```

</TabItem>
</Tabs>


### Accessing the collector's metrics

By default, the collector's own metrics are available in Prometheus format at `http://localhost:8888/metrics`.

To access them, use a tool like `curl` or just open the URL in a browser running on the same host as the collector.

```sh
curl http://localhost:8888/metrics
```

To modify the port, use the `service.telemetry.metrics.address` property:

```yaml
service:
  telemetry:
    metrics:
      address: ":8889"
```

### Accessing the collector's configuration

By default, the collector's configuration can be found in `/etc/otelcol-sumo/` directory.


#### On Windows, I am running the Collector install command on CMD. Why does it fail?

On Windows, the Collector installation command must be run in PowerShell.

#### How can I install the Sumo Logic Collector on my operating system if the install script is not working?

To install the script manually on your OS, refer to one of the following docs:

* [Linux](/docs/send-data/opentelemetry-collector/install-collector-linux#manual-step-by-step-installation)
* [macOS](/docs/send-data/opentelemetry-collector/install-collector-macos#manual-step-by-step-installation)
* [Windows](/docs/send-data/opentelemetry-collector/install-collector-windows#manual-step-by-step-installation)

You will need to manage configuration files on your own.

#### Why is the Sumo OpenTelemetry Collector not starting up after I updated or added a new config file?

Most likely the issue is because the `config.YAML` file is malformed. Make sure that it is a valid YAML with appropriate indentation.


#### Is it possible to install the Sumo Logic OpenTelemetry Collector without root or admin permissions?

If you do not have root or admin permissions, you can still install the Sumo OpenTelemetry Collector manually by copying the Collector binary to a local directory in your PATH. The steps for manual installation are detailed in the [official repository's documentation](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/installation.md#manual-installation).

However, note that some functionalities, such as certain host metrics, may not be available when running the Collector as a non-root user.


#### On Linux or macOS, how can I view/edit configuration files within the `conf.d` directory?

These directories and files require root permission to access. You can use `sudo` command.


#### What can I do if I get the error, "Unable to install the OpenTelemetry agent using the curl command on Linux"?

Error: `Unable to install the OpenTelemetry agent using the curl command on Linux. Getting the follow error. 60.0%curl: (28) Operation timed out after X milliseconds with Y out of Z bytes received.`

This error can happen when there is a slowdown on the network, or due to some issues on the GitHub side. Add the following parameter to the installation command, which will increase the timeout from default 180 seconds to 300 seconds. You can adjust the value to your needs.

```bash
--download-timeout 300
```


#### What can I do if I get the error "Failed to bind to address" while installing or restarting the collector on macOS?

This error typically occurs if another process is already using the required port or IP address. You can check if any existing otel-sumo service is running in the background by running the following command:

```bash
$ ps -ef | grep sumo
```

If this command returns any running process related to Sumo Logic, you should kill it before attempting to install or restart the collector. Once you've confirmed that no other Sumo Logic processes are running, you can attempt to install or restart the collector again.

#### What can I do if I get the error `"token:invalid_token_format"` in the collector logs

If you see a log containing `"token:invalid_token_format"` in the collector logs, similar to the following:

```console
2022-11-09T12:07:07.171+0100        warn        sumologicextension@v0.57.2-sumo-1/extension.go:423        Collector registration failed        {"kind": "extension", "name": "sumologic", "status_code": 401, "error_id": "DC0JU-XI3IY-Z703S", "errors": [{"code":"token:invalid_token_format","message":"The Sumo Logic credentials could not be verified."}]}
```

this means that the installation token used in the Sumo Logic extension's configuration is invalid.
Make sure the token was entered correctly.

#### What can I do if I get the error `"listen tcp :8888: bind: address already in use"` in the collector logs

If you see a log containing `"listen tcp :8888: bind: address already in use"` in the collector logs, similar to the following:

```console
2022-11-17T11:22:17.733+0100    error   service/collector.go:156        Asynchronous error received, terminating process        {"error": "listen tcp :8888: bind: address already in use"}
```

this means that the `8888` port on the machine is busy.
It is possible that there is another collector already running on the host,
but it can also be any other process.
To find out what process is using the port, run the following command:

```sh
sudo lsof -i :8888
```

You can either stop the process using the port, or change the metrics port that your collector uses.
See [Accessing the collector's metrics](#accessing-the-collectors-metrics) section above.

#### How do I uninstall the Sumo OpenTelemetry Collector?

Refer to the Uninstall section in the following docs:
* [Linux](/docs/send-data/opentelemetry-collector/install-collector-linux/#uninstall)
* [Windows](/docs/send-data/opentelemetry-collector/install-collector-windows/#uninstall)
* [macOS](/docs/send-data/opentelemetry-collector/install-collector-macos/#uninstall)


## Data ingestion and forwarding

#### How do I ingest historical data​?

To ingest old or historical data, use a [Filelog Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver) for log collection. By default, the Filelog Receiver starts reading logs from the end of the file. However, this can be changed by adjusting the configuration file to start reading from the beginning of the file by setting `start_at: beginning` in the receiver section. Here is an example:

```yaml
receivers:
  filelog/custom_files:
    include:
    - /var/log/myservice/*.log
    include_file_name: false
    include_file_path_resolved: true
    storage: file_storage
    start_at: beginning
```

#### How do I send data to multiple Sumo Logic accounts from a single collector?

To send data to multiple Sumo Logic accounts from a single collector, configure the Sumo Logic OpenTelemetry Collector with multiple extensions, each with its own access ID and key. For more information, refer to the [Multiple Sumo Logic Extensions](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/configuration.md#using-multiple-sumo-logic-extensions) documentation.

#### How do I forward data from the OpenTelemetry Collector to other places (like S3)?

You must add additional exporters to the pipeline from which you want to forward data. There is currently no exporter for s3, but you can export to a file using [File-Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/fileexporter).

#### What to do if the macOS restart command doesn’t work?

If you encounter an error stating that the `glob` scheme is not supported for a URI, it is likely that you might not be using the appropriate collector binary. Although, the `glob` provider is flexible and can accept a non-existent path without preventing the collector from starting.

* To ensure that you are using the correct binary, you can use the command `which otelcol-sumo` to check its location.
* Another way to verify the binary is to use `otelcol-sumo --version` to check its version number.

For example:

`% which otelcol-sumo`
`/usr/local/bin/otelcol-sumo`

`% otelcol-sumo -v`
`otelcol-sumo version v0.72.0-sumo-0`

#### I am seeing some errors related to Sumo Logic OpenTelemetry Collector stating that `Unable to collect from a file`. Does this mean my collector is not collecting any data?

<img src={useBaseUrl('img/send-data/error-faq.png')} alt="error-faq.png" width="950" />

In this case, this means that the collector couldn’t find the file you wanted to collect logs from. There can be lot of reasons why this error happens, including not having appropriate permissions.

:::note
The collector will still collect and send data from other sources as long as there are no issues with those sources.
:::

#### Why am I receiving an error when collecting data from the Sumo Logic OpenTelemetry Collector? It is unable to read Process Data (PID, process name, and so on)?

This is a result of not running the collector as root.

<img src={useBaseUrl('img/send-data/error2-faq.png')} alt="error2-faq.png"  />

#### Why am I seeing `Dropping data because sending_queue is full` in OpenTelemetry Collector logs?

If you see logs like the following in the output from OTC:

```console
otelcol_1   | 2022-02-11T12:10:06.755Z  warn    internal/persistent_storage.go:237      Maximum queue capacity reached{"kind": "exporter", "name": "sumologic", "queueName": "sumologic-metrics"}
otelcol_1   | 2022-02-11T12:10:06.755Z  error   exporterhelper/queued_retry.go:99       Dropping data because sending_queue is full. Try increasing queue_size.        {"kind": "exporter", "name": "sumologic", "dropped_items": 5}
otelcol_1   | 2022-02-11T12:24:42.437Z  warn    batchprocessor/batch_processor.go:185   Sender failed   {"kind": "processor", "name": "batch", "error": "sending_queue is full"}
```

This means that the `sumologicexporter` is not able to send data as quickly as it receives new data. There may be a couple ways to fix this is, depending on the root cause.

If the problem is intermittent and caused by temporary spike in data volume, increasing the queue size for the exporter with `sending_queue.queue_size` property might be enough to accommodate temporary additional load.

If you see `429 Too Many Requests` HTTP response codes from Sumo in exporter logs, this means the exporter is being throttled by Sumo backend. In this case, you need to either decrease the volume of data sent, or reach out to Sumo support to increase the quota.

If the exporter is not being throttled the best option might be to increase the number of consumers sending data from queue to Sumo with `sending_queue.num_consumers`.

The `sumologicexporter` sends data to Sumo in batches. If the batches are small, more requests need to be performed to send data. If you have set the `max_request_body_size` setting to a low value, consider increasing it to make batches bigger and in effect make sending more efficient.


## App installation errors

#### When installing an App, I get the error `Could not receive data` even though I have installed the Collector and source, and I can confirm that data is flowing in. How do I resolve this?

If you are using the **Upstream OpenTelemetry collector** (instead of the **Sumo Logic OpenTelemetry collector**) and have a custom `config.yaml` file to collect data, then you might see this error. Sumo Logic expects specific tags on the data, which the Sumo Logic Distribution for OpenTelemetry Collector creates by default.



## Filtering metrics and logs

#### How can I filter out metrics from being collected?

Both Linux and Windows users can utilize the filter processor provided by the OpenTelemetry Collector Contributor repository to filter out metrics from being collected. The filter processor can be used to selectively drop or pass through data based on certain conditions, but the specifics of the filtering would depend on the use case and requirements. For more information, see [Filter Processor documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md).

#### How can I filter out log files using the OpenTelemetry Collector?

To filter out log files using the OpenTelemetry Collector, users can use the same filter processor process described in the above Answer.

#### Can I filter out specific loglines within a log file using Sumo Logic OpenTelemetry Collector? If yes, what is the process to do this?

Any condition you can express using the filter processor can be used for this. You can refer to the above answer.



## Known Issues

### Changes to collector properties are not applied

After running the collector for the first time, changes to collector properties (e.g., collector description, category, fields) are not applied.

To work around this, you need to delete the existing collector registration and register the collector again. To do this, you need to do two things:

1. Remove the collector in Sumo Logic UI.
   1. Log in to Sumo Logic.
   1. Go to `Manage Data` - `Collection`.
   1. Find your collector.
   1. Click `Delete` on the right-hand side of the collector.
2. Delete local collector registration file in `~/.sumologic-otel-collector/`.

After that, the collector will register on next run.

If you delete the collector in the UI but not delete the local registration file,
the collector will fail to start - see [Collector fails to start when deleted from UI](#collector-fails-to-start-when-deleted-from-ui).

On the other hand, if you only delete the local registration file and do not delete the collector in the UI, a new collector will be created with current timestamp as a suffix, to prevent overwriting the existing collector.

### Collector fails to start when deleted from UI

After successful registration of collector, if you delete the collector in Sumo Logic UI, the collector will fail to start on next run. The error message is similar to the below:

```
2021-08-24T10:52:38.639Z  error  sumologicextension@v0.31.0/extension.go:373  Heartbeat error  {"kind": "extension", "name": "sumologic", "collector_name": "<your-collector-name>", "collector_id": "0000000001A2B3C4", "error": "collector heartbeat request failed, status code: 401, body: {\n\"servlet\":\"rest\",\n\"message\":\"Could not authenticate.\",\n\"url\":\"/api/v1/collector/heartbeat\",\n\"status\":\"401\"\n}"}
github.com/open-telemetry/opentelemetry-collector-contrib/extension/sumologicextension.(*SumologicExtension).heartbeatLoop
github.com/open-telemetry/opentelemetry-collector-contrib/extension/sumologicextension@v0.31.0/extension.go:373
```

To work around this, delete the local collector registration file at `~/.sumologic-otel-collector/`. The collector will re-register on next run.

### Enabling `clobber` property re-registers collector on every restart

If you set the `extensions.sumologic.clobber` property to `true`, a new collector registration that replaces the previously existing registration will be created on every run of the collector.

This affects the `_collectorId` attribute, which is different for every new collector registration.

To prevent this, remove the `extensions.sumologic.clobber` property or set it to `false`.

### Cannot start reading file logs from specific point in time

The [Filelog receiver][filelogreceiver_docs] currently supports only two modes of reading local files:

- `start_at: beginning`: Ingest the whole file from the beginning, or
- `start_at: end`: Only ingest newly added lines.

The `start_at` property is common to all the files read by the receiver - it cannot be set to `end` for some files and to `beginning` for other files. Note that this can be worked around by creating two separate Filelog receivers, one reading from the beginning and one reading from the end.

The other problem is that it is not currently possible for Filelog receiver to start reading files at a specific point, or only read files created or modified after a specific point in time.

There is currently no workaround for this.

[filelogreceiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.71.0/receiver/filelogreceiver/README.md

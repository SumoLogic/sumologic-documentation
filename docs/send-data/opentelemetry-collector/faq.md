---
id: faq
title: FAQ
description: Frequently asked questions about Sumo Logic OpenTelemetry Collector from our customers and field teams.
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document contains frequently asked questions about OpenTelemetry Collector.


## Accessing the collector's configuration

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

This means that the installation token used in the Sumo Logic extension's configuration is invalid. Make sure the token was entered correctly.

#### What can I do if I get the error `"listen tcp :8888: bind: address already in use"` in the collector logs

If you see a log containing `"listen tcp :8888: bind: address already in use"` in the collector logs, similar to the following:

```console
2022-11-17T11:22:17.733+0100    error   service/collector.go:156        Asynchronous error received, terminating process        {"error": "listen tcp :8888: bind: address already in use"}
```

This means that the `8888` port on the machine is busy. It is possible that there is another collector already running on the host,
but it can also be any other process. To find out what process is using the port, run the following command:

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

## HTTP checks

#### Does Sumo OpenTelemetry support HTTP checks?

Yes, our OpenTelemetry Collector supports HTTP checks, allowing you to ping public HTTPs URLs and monitor up/down status.

How it works - the OpenTelemetry [HTTP Check receiver][httpcheck_receiver_docs] produces metrics that can be ingested and then monitored to track non-200 responses, latency, and other errors.

```yaml
receivers:
  httpcheck/my-public-sites:
    collection_interval: 10s
    targets:
      - endpoint: https://www.sumologic.com
      - endpoint: https://opentelemetry.io/blog
service:
  pipelines:
    metrics:
      receivers:
        - httpcheck/my-public-sites
      processors:
        - memory_limiter
        - batch
      exporters:
        - sumologic
```

<img src={useBaseUrl('img/send-data/opentelemetry-collector/otel-ping.png')} alt="otel-ping.png" width="450" />

[httpcheck_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/httpcheckreceiver/README.md

## Filtering metrics and logs

#### How can I filter out metrics from being collected?

Both Linux and Windows users can utilize the filter processor provided by the OpenTelemetry Collector Contributor repository to filter out metrics from being collected. The filter processor can be used to selectively drop or pass through data based on certain conditions, but the specifics of the filtering would depend on the use case and requirements. For more information, see [Filter Processor documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md).

#### How can I filter out log files using the OpenTelemetry Collector?

To filter out log files using the OpenTelemetry Collector, users can use the same filter processor process described in the above Answer.

#### Can I filter out specific loglines within a log file using Sumo Logic OpenTelemetry Collector? If yes, what is the process to do this?

Any condition you can express using the filter processor can be used for this. You can refer to the above answer.

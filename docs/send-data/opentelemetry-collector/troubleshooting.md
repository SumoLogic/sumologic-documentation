---
id: troubleshooting
title: Troubleshooting
description: Learn about common troubleshooting scenarios of Sumo Logic OpenTelemetry Collector from our customers and field teams.
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

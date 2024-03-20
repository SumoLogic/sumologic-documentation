---
id: additional-configurations-reference
title: Additional Configurations Reference
sidebar_label: Additional Configurations Reference
description: Reference guide for Sumo Logic OpenTelemetry Collector configurations.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic Distribution for OpenTelemetry stores the configuration for the collector in the configuration directory. It can be found here.

| | |
| :-- | :-- |
| Linux | `/etc/otelcol-sumo/conf.d` |
| Mac | `/etc/otelcol-sumo/conf.d` |
| Windows | `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` |


## Configuration location and structure

The Sumo Logic OpenTelemetry Collector configuration is comprised of two parts. Based on the platform, the configuration by default is stored at the following location:
* Linux and macOS: `/etc/otelcol-sumo/`
* Windows: `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config`

:::note
If you manually installed the collector, your configuration may be in a different location.
:::

### Sumo Logic-defined configuration

This is required by the collector to properly communicate with Sumo Logic SaaS service, and transmit data. All Sumo Logic preconfigured components are stored in `sumologic.yaml` file. This file is managed by the installation script and should never be changed manually. Depending upon your platform.

### Data Source configuration

Here, you can define all the configuration that tells the collector what data to collect, how to process it (including adding metadata), and send it to Sumo Logic. All the user-defined configuration resides under the `conf.d` directory.

Any configuration for a Source (e.g., MySQL, Nginx, Application Logs) should be stored in a separate file with descriptive name under the `conf.d` directory. For example, a file named `conf.d/mysql.yaml` can contain configuration to collect MySQL data (logs and metrics), and will contain the necessary receiver, processors and the pipeline that together inform the collector on how to collect and send the MySQL data.

:::tip
It is recommended to maintain the configuration of all reusable components in `conf.d/common.yaml`. For example, a file named `conf.d/mysql.yaml` can contain the MySQL receiver along with any processors that are intended to modify the collected data before sending it to Sumo Logic.
:::

Our [**App Catalog**](/docs/get-started/apps-integrations) provides a mechanism to create these configuration files using a simple UI form input. Learn More.


## Default Collector Name

Each collector name must be unique. Collector by default uses hostname of the machine where collector is installed as the Collector's name. By default,if you are installing a collector that would have the same hostname as an existing collector, the system automatically appends a 13-digit unix timestamp to the collector name.

## Forcing a Collector's Name with Clobber

Set the clobber flag to `true` if you want to delete the existing collector where a new collector is installed on a machine with same hostname. This is useful for scenarios where a VM is deleted and initiated again with the same hostname. To enable this property, create a file `sumo-ot-clobber.yaml` in `otelcol-sumo/conf.d`, add below configuration and restart your collector.

```yaml
extensions:
  sumologic:
    clobber: true
```

:::important
Setting the clobber flag to `true` deletes (clobbers) any existing collector with the same collector name/hostname, so make sure that is what you want to do. Clobber is effective only before the new collector has been registered (activated) with Sumo Logic.
:::

## Custom Configuration

Use Custom configuration to customize the collection of your logs, metrics and traces in Sumo Logic. Learn more about configuration [here](https://opentelemetry.io/docs/collector/configuration).

There are some processors provided in `sumologic.yaml` that are intended to be used in every pipeline.

* **Memory limiter processor**. It is used to prevent out-of-memory situations on the collector. It should be always first on the processor's list. For more information, refer to the [OpenTelemetry documentation](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor#memory-limiter-processor).
* **Batch processor**. It accepts spans, metrics, or logs and places them into batches. Batching helps better compress the data and reduce the number of outgoing connections required to transmit the data. See [Using batch processor to batch data](#using-batch-processor-to-batch-data) for more information.
* **ResourceDetection/System processor**. [It can be used](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/) to detect resource information from the host in a format that conforms to the [OpenTelemetry resource semantic conventions](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/resource/semantic_conventions/), and append or override the resource value in telemetry data with this information. You can also tag labels like `host.name`, `host.id`, `os.type`.

We also expect the Sumo Logic exporter to be included in the `exporters` section.

See the following example:

```yaml
service:
  pipelines:
    metrics/default:
      receivers:
        - otlp
      processors:
        - memory_limiter
        - batch
      exporters:
        - sumologic
```

## Using Batch processor to batch data

The [Batch processor][batchprocessor] can be utilized to convert the processed data into batches that are larger than a specified size or time interval. This can aid in compressing the data more effectively and minimizing the number of requests sent by the exporters.

It is highly recommended to use this processor in every pipeline. It should be defined after [memory limiter processor][memorylimiterprocessor] and any processors that drop the data, such as [filter processor][filterprocessor].

In addition to setting a lower batch size, it is also possible to set a maximal batch size.

We highly recommend setting that limit to avoid sudden increases in request sizes in case more data is temporarily received. The value we recommend to set is `2 * send_batch_size`.

Overall, we recommend the following default configuration for this processor.

```yaml
batch:
  send_batch_size: 1_024
  timeout: 1s
  send_batch_max_size: 2_048 ## = 2 * 1024
```

:::note
If you are utilizing the [Sumo Logic exporter][sumologicexporter] to send data in a format **other than** OTLP, it is possible to explicitly restrict the size of the requests in bytes by utilizing the configuration option `max_request_body_size`.
:::

Learn more about these processors:
* [batchprocessor]
* [memorylimiterprocessor]
* [filterprocessor]
* [sumologicexporter]

## Data Tagging Recommendations

We recommend reading the [Metadata Naming Conventions](/docs/send-data/reference-information/metadata-naming-conventions/) document before continuing to become more familiar with the terms used below. The following terms are important for data tagging:

* Source Category (`_sourceCategory`)
* Source Host (`_sourceHost`)
* Source Name (`_sourceName`)

The above attributes are taken from the **Resource attributes**. If they are not set, they are taken from the collector configuration.

See the following example which shows how to set them using the **Resource attributes** processor:

```yaml
processors:
  resource/static fields:
    attributes:
    - key: _sourceName
      value: my source name
      ## upsert will override existing _sourceName field
      action: upsert
```

If you would like to add your own custom metadata fields to your logs, you can use the same attributes processor and use `action: insert`:

```yaml
processors:
  resource/custom_fields:
    attributes:
      - key: collection_method
        value: otel
        action: insert
```

:::note
If you are adding custom attributes to your log metadata, then you need to ensure that these fields are also added in Sumo Logic under the **Logs > Fields** section.
:::

For more advanced processing capabilities in your data pipeline, you can make use of the **Transform** processor. This processor enables you to perform more complex transformations on your data. For example, you can concatenate multiple **Resource attributes** into  `_sourceCategory` field with a `/` character separating each attribute.

```yaml
processors:
  transform/custom fields:
    log_statements:
    - context: resource
      statements:
      - set(attributes["_sourceCategory"], Concat([attributes["service.name"], attributes["http.method"]], "/"))
```

You now have the ability to create custom tags when processing data, beyond using special tags. All resource attributes are treated as tags, offering flexibility when categorizing and processing data.

You can set default tags in collector configuration using the `collector_fields` option:

```yaml
extensions:
  sumologic:
    collector_fields:
      cluster: staging
```

Tags are useful for building the queries and helps to correlate the different signals (metrics, logs and traces) with each other.

:::note
Refer to the [Fields](/docs/manage/fields/) documentation for more information on fields and how to use them.
:::

[batchprocessor]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor
[memorylimiterprocessor]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor
[filterprocessor]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor
[sumologicexporter]: https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/exporter/sumologicexporter

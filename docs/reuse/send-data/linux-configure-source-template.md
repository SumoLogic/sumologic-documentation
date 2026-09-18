In this step, you will configure the YAML required for Linux Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.

#### Logs collection
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, sumo tags `_sourceCategory` with the value otel/linux.
- **Logs**. The following fields are pre-populated with default paths, for common log files that are used in different Linux distributions. Not all paths might be relevant for your operating system. Modify the list of files as required or leave the default values.

#### Metrics collection
- **Metrics**. Select the metric scrappers you want to enable. By default, metric collection for CPU, memory, disk, load, file system, network, and paging are enabled and process metric collection is disabled.

##### Enable process metric collection (optional)

import ProcMetrics from '../../reuse/apps/opentelemetry/process-metric-collection.md';

<ProcMetrics/>

- **Scan Interval**. The frequency at which the source is scanned.
- **Processing Rules**. You can add processing rules for logs/metrics collected. To learn more, refer to [Processing Rules](/docs/send-data/opentelemetry-collector/remote-management/processing-rules/).
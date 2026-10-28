In this step, you will configure the YAML required for Windows collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.

#### Logs collection
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value `otel/windows`.
- **Windows Event**. In this section you can select choose among the most widely used Windows event channel for which Windows event log collection will be enabled. You can also provide **Custom Event Channels** providing any customer event channel for which event logs are to be collected.
- **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse).

#### Metrics collection
- **Metrics**. Select the metric scrappers you want to enable. By default, metric collection for CPU, memory, disk, load, file system, network and paging are enabled, and process metric collection is disabled.

##### Enable process metric collection (optional)

import ProcMetrics from '../../reuse/apps/opentelemetry/process-metric-collection.md';

<ProcMetrics/>

- **Scan Interval**. The frequency at which the source is scanned.
- **Processing Rules**.  You can add processing rules for logs/metrics collected. To learn more, refer to [Processing Rules](/docs/send-data/opentelemetry-collector/remote-management/processing-rules/). For masking windows event logs,  refer to [Mask Rules for Windows Source Template](/docs/send-data/opentelemetry-collector/remote-management/processing-rules/mask-rules-windows).
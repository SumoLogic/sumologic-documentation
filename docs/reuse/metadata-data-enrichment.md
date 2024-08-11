Metadata is typically from your system or environment, and adds context about what or where the data came from and any associated services or apps. Logs and metrics use metadata that can be customized to anything you need.

**Log metadata**

In addition to having more data to reference in query operations, this allows you to define a more specific scope of data in search expressions, improving search performance, and allows more specific search filters in Roles and routing expressions in Partitions.

* Log metadata is configured in Sumo as [fields](/docs/manage/fields) consisting of key-value pairs that are tagged to logs during collection.
* You can define fields with [Field Extraction Rules](/docs/manage/field-extractions) by parsing fields when log messages are ingested.
* You can define fields on data sent to Sumo by manually defining them on Sources and Collectors.
* You can provide custom fields through [HTTP headers](/docs/send-data/hosted-collectors/http-source).
* Our [AWS Metadata Source](/docs/send-data/hosted-collectors/amazon-aws/aws-metadata-tag-source) allows you to collect tags from EC2 instances running on AWS.

**Metric metadata**

Sumo Logic provides a number of features you can use to enrich the metrics you collect with metadata. Metric metadata provides considerable benefits when you query your metrics: you can scope your metric queries to return only the metrics of interest. Metric metadata can also give you insight that cannot be gleaned from unadorned metrics, especially in highly containerized and orchestrated environments.

* Metric metadata is referenced in Sumo with [selectors](/docs/metrics/introduction) consisting of key-value pairs that are tagged to metrics during collection.
* You can use the [metric rules editor](/docs/metrics/metric-rules-editor) to tag metrics with data derived from the metric identifier, and then use those tags in metric queries.
* You can attach custom metadata through [HTTP headers](/docs/send-data/hosted-collectors/http-source).
* You can use the [AWS Metadata (Tag) Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-metadata-tag-source) to apply tags from your EC2 instances to host metrics, Graphite metrics, and Carbon 2.0 metrics you collect.

---
id: metrics-transformation-rules
title: Metrics Transformation Rules
sidebar_label: Metrics Transformation Rules
description: Metrics transformation rules allow you control how long raw metrics are retained.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Metrics transformation rules allow you control how long raw metrics are retained. You can also aggregate metrics at collection time and specify a separate retention period for the aggregated metrics.

Metrics transformation rules are useful when:

* You want to aggregate highly ephemeral, high cardinality data into business-level KPIs for long term storage and trending, and discard the raw metrics once they're aggregated.
* You want to pre-aggregate raw metrics to improve query performance, and not retain raw metrics at all.

## Key facts

* A metrics transformation rule applies to metrics that match a selector that you define for the rule. You can check what metrics will be affected by entering the selector in a metric query tab.  
* By default, Sumo Logic saves your metrics for 400 days. If you aggregate the metrics that match the rule selector, you can also choose to discard the raw metrics entirely by setting their retention to **Do Not Store**.
* Optionally, you aggregate the metrics that match the selector by one or more dimensions. If you choose to aggregate the metrics:
   * Aggregated metrics are retained for 400 days.
   * You can reduce the retention time for the raw (non-aggregated) metrics to zero. In this case, Sumo Logic will aggregate the metrics, and discard the raw metrics.
   * You can transform one or more dimensions of the aggregated metrics using mustache templates. For instance, you can transform the metric dimension to include a suffix that indicates that the metric is aggregated. This makes it easier to distinguish between raw and aggregated metrics.

## Limitations

* You can create a maximum of 50 metrics transformation rules per Sumo Logic account.
* It can take up to five minutes for a new or updated of a metrics transformation rule to take effect.
* You cannot alert on a metric created by a transformation rule.
* You cannot use a metric created by a transformation rule in the selector for a different transformation rule.
* A `metric` key must be present among aggregated metric's dimensions. You have to either include it in dimensions the rule aggregates on, or add it explicitly to the transformations.

## Create a Metrics Transformation Rule

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Metrics** select **Metrics Transformation Rules**. You can also click the **Go To...** menu at the top of the screen and select **Metrics Transformation Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Metrics > Metrics Transformation Rules**. 
1. Click **Add**. <br/><img src={useBaseUrl('img/metrics/add-button.png')} alt="Add button" style={{border: '1px solid gray'}} width="600" />
1. The **Add a Rule** pane appears. <br/><img src={useBaseUrl('img/metrics/add-a-rule-empty.png')} alt="Add a metrics transformation rule" style={{border: '1px solid gray'}} width="400" />
1. **Name**. A name for the metrics transformation rule.
1. **Selector.** The selector that matches the metrics to which you
    want to apply the transformation rule. (The scope of a metric query.)
1. **Retention**. The period of time you want to retain the metrics that match the selector. Available options are:
    * **Do Not Store**. This option does not appear until and unless you specify one or more aggregation dimensions in the **Aggregate on** section below. (This is to ensure that your raw metrics are not deleted if they haven’t been aggregated.)
    * **400 days**
1. **Aggregate On**. (Optional) If you would like to aggregate the raw metrics by one or more dimensions, click **+Add** and enter the dimension name. Upon ingestion, Sumo Logic will [quantize](/docs/metrics/introduction/metric-quantization/) the aggregated metrics to one minute and one hour resolutions for all rollup types: avg, min, max, sum, and count.  You can aggregate raw metrics on a maximum of 10 dimensions
1. **Aggregate Retention**. (Required if you entered an aggregation dimension). The retention period for the aggregated metrics is **400 days**.
1. **Transformations**. (Optional) If you want to add a new dimension, or transform a dimension of the aggregated metrics, click **+Add**:
    * **Dimension to replace or add**. Enter the dimension you want to transform, for example:   `metric`
    * **Value**. Enter a new name for the dimension, or use a mustache template to form the new dimension name, for example: `{{metric}}_agg_by_service`. If the metric dimension for an aggregated metric was `container_memory_usage_byte`, the mustache template above would transform the metric dimension to: `container_memory_usage_byte_agg_by_svc`
1. Click **Save**.

:::note
* If a `metric` is not present among dimensions a rule aggregates on, you **must** explicitly add it to the transformations.
* If you use mustache templates to form the name of a dimension you are adding or replacing, you can use a maximum of 10 templates.
* A metrics transform rule is limited to 10 transformations.
* The name you assign to a transformed dimension, and the values returned for transformed dimensions are each limited to 4096 characters. If the dimension key or value is longer than 4096 characters, Sumo Logic will truncate the key or value, retaining only the first 4096 characters.
:::

## Edit a metrics transformation rule

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Metrics** select **Metrics Transformation Rules**. You can also click the **Go To...** menu at the top of the screen and select **Metrics Transformation Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Metrics > Metrics Transformation Rules**. 
1. Click the rule you want to edit.
1. Click **Edit** in the right hand pane. 

## Delete a metrics transformation rule

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Metrics** select **Metrics Transformation Rules**. You can also click the **Go To...** menu at the top of the screen and select **Metrics Transformation Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Metrics > Metrics Transformation Rules**.  
1. Click the rule you want to delete.
1. Click **Delete** in the right hand pane. 

## Metrics transformation rule examples

### Discard metrics from development and test environments

Assume that the metrics you collect from your dev environment are of
no interest once they've been aggregated. You tag metrics from the dev
environment with a dimension whose key is “environment” and value is
“dev”. When you configure your rule:

1. Selector. Enter: `environment=dev`
1. Aggregate On. Add the dimensions you want to aggregate by, for example, `environment`.
1. Retention. Select **Do Not Store**.
1. Aggregate Retention. **400 days** (the only available option).

All metrics that match the selector `environment=dev` are aggregated and the raw metrics are discarded, so you keep the aggregated trend data without paying to store 400 days of raw dev-environment metrics you have no interest in.

### Aggregate high cardinality and ephemeral data for long term trending

You can use a transformation rule to aggregate high cardinality data from ephemeral sources into higher-level metrics that you want to analyze over time. Container metrics are an example of such data. Containers are ephemeral, created and destroyed as appropriate, resulting in a high volume of short-lived time series. More often than not, container-level metrics are not useful over the long term. However, container metrics that are aggregated at the service or deployment level can be very useful for longer term trend analysis. 

<img src={useBaseUrl('img/metrics/add-a-rule.png')} alt="Add a metrics transformation rule with aggregation" style={{border: '1px solid gray'}} width="400" />

Here’s what the rule does:

1. The rule is applied to metrics that match the selector `metric=container_*`.  (Metrics whose name begin with “container_”.) For this example, assume that these are the matching metrics:  
    ```sql
    metric=container_memory_usage_bytes service=foo container=1234 pod=abcd
    metric=container_memory_usage_bytes service=foo container=4321 pod=dcba
    metric=container_fs_bytes service=foo container=1234 pod=abcd
    metric=container_fs_bytes service=foo container=4321 pod=dcba
    ```
1. The matching metrics shown above are set to **Do Not Store**, so the raw metrics are discarded once they're aggregated.
1. Matching metrics will be aggregating by the `metric` and `service` dimensions. The aggregated metrics are quantized to one minute and one hour resolutions for all rollup types: avg, min, max, sum, and count.
1. The aggregated metrics shown above will be retained for 400 days, then discarded. Only the dimensions upon which the raw metrics were aggregated are preserved in the aggregated metrics. The `container` and `pod` dimensions are not included in the aggregated metrics.
1. The aggregated metrics will have the value of the metric dimension modified to have a suffix of `_agg`, like this:  
    ```sql
    metric=container_memory_usage_bytes_agg service=foo metric=container_fs_bytes_agg service=foo
    ```

---
id: metrics-transformation-rules
title: Metrics Transformation Rules
sidebar_label: Metrics Transformation Rules
description: Metrics transformation rules allow you control how long raw metrics are retained.
---

Metrics transformation rules allow you control how long raw metrics are retained. You can also aggregate metrics at collection time and specify a separate retention period for the aggregated metrics.

Metrics transformation rules are useful when:

* You want to store highly ephemeral, high cardinality data for only 15 days, and to aggregate the metrics into business-level KPIs for long term storage and trending.
* You want to store metrics from development and test environments for only 15 days, because after that you have no interest in them. 
* You want to pre-aggregate raw metrics to improve query performance, and not retain raw metrics at all.

## Key facts

* A metrics transformation rule applies to metrics that match a selector that you define for the rule. You can check what metrics will be affected by entering the selector in a metric query tab.  
* You can reduce the amount of time that Sumo will retain metrics that match the rule selector. By default, Sumo saves your metrics for 400 days. In a transformation rule, you can set the retention period for metrics that match the selector to 15 days.   
* Optionally, you aggregate the metrics that match the selector by one or more dimensions. If you choose to aggregate the metrics:
   * You can specify a retention time of either 15 or 400 days for aggregated metrics.
   * You can reduce the retention time for the raw (non-aggregated) metrics to zero. In this case, Sumo will aggregate the metrics, and discard the raw metrics.
   * You can transform one or more dimensions of the aggregated metrics using mustache templates. For instance, you can transform the metric dimension to include a suffix that indicates that the metric is aggregated. This makes it easier to distinguish between raw and aggregated metrics.

## Limitations

* You can create a maximum of 50 metrics transformation rules per Sumo account.
* It can take up to five minutes for a new or updated of a metrics transformation rule to take effect.
* You cannot alert on a metric created by a transformation rule.
* You cannot use a metric created by a transformation rule in the selector for a different transformation rule.
* A `metric` key must be present among aggregated metric's dimensions. You have to either include it in dimensions the rule aggregates on, or add it explicitly to the transformations.

## Create a Metrics Transformation Rule

1. Navigate to **Manage Data > Metrics > Metrics Transformation Rules**. 
1. Click **Add**. <br/>  ![add-button.png](/img/metrics/add-button.png)
1. The **Add a Rule** pane appears.   <br/>  ![add-a-rule-empty.png](/img/metrics/add-a-rule-empty.png)
1. **Name**. A name for the metrics transformation rule.
1. **Selector.** The selector that matches the metrics to which you
    want to apply the transformation rule. (The scope of a metric query.)
1. **Retention**. The period of time you want to retain the metrics that match the selector. Available options are:
    * **Do Not Store**. This option does not not appear until and unless you specify one or more aggregation dimensions in the **Aggregate on** section below. (This is to ensure that your raw metrics are not deleted if they haven’t been aggregated.)
    * **400 days**
    * **15 days**
1. **Aggregate On**. (Optional) If you would like to aggregate the raw metrics by one or more dimensions, click **+Add** and enter the dimension name. Upon ingestion, Sumo will [quantize](introduction/metric-quantization.md) the aggregated metrics to one minute and one hour resolutions for all rollup types: avg, min, max, sum, and count.  You can aggregate raw metrics on a maximum of 10 dimensions
1. **Aggregate Retention**. (Required if you entered an aggregation dimension). The retention period for the aggregated metrics. Available options are:
    * **400 Days**
    * **15 Days**
1. **Transformations**. (Optional) If you want to add a new dimension, or transform a dimension of the aggregated metrics, click **+Add**:
    * **Dimension to replace or add**. Enter the dimension you want to transform, for example:   `metric`
    * **Value**. Enter a new name for the dimension, or use a mustache template to form the new dimension name, for example: `{{metric}}_agg_by_service`. If the metric dimension for an aggregated metric was `container_memory_usage_byte`, the mustache template above would transform the metric dimension to: `container_memory_usage_byte_agg_by_svc`
1. Click **Save**.

:::note
* If a `metric` is not present among dimensions a rule aggregates on, you **must** explicitly add it to the transformations.
* If you use mustache templates to form the name of a dimension you are adding or replacing, you can use a maximum of 10 templates.
* A metrics transform rule is limited to 10 transformations.
* The name you assign to a transformed dimension, and the values returned for transformed dimensions are each limited to 4096 characters. If the dimension key or value is longer than 4096 characters, Sumo will truncate the key or value, retaining only the first 4096 characters.
:::

## Edit a metrics transformation rule

1. Navigate to **Manage Data > Metrics > Metrics Transformation Rules**. 
1. Click the rule you want to edit.
1. Click **Edit** in the right hand pane. 

## Delete a metrics transformation rule

1. Navigate to **Manage Data > Metrics > Metrics Transformation Rules**. 
1. Click the rule you want to delete.
1. Click **Delete** in the right hand pane. 

## Metrics transformation rule examples

### Change metrics retention to 15 days

Assume that the metrics you collect from your dev environment are only
of interest for a week after collection. You tag metrics from the dev
environment with a dimension whose key is “environment” and value is
“dev”. When you configure your rule:

1. Selector. Enter: `environment=dev`
1. Retention. Select ` days` from the pull-down list.

All metrics that match the selector `environment=dev` will be stored for 15 days, and then removed. They will not be aggregated, as aggregation is optional. In this case, we are simply using the transformation rule to control how long we want to retain the metrics. By default, Sumo Logic stores metrics for 400 days. A rule like this lets you reduce the metric retention period to 15 days.  

### Aggregate high cardinality and ephemeral data for long term trending

You can use a transformation rule to aggregate high cardinality data from ephemeral sources into higher-level metrics that you want to analyze over time. Container metrics are an example of such data. Containers are ephemeral, created and destroyed as appropriate, resulting in a high volume of short-lived time series. More often than not, container-level metrics are not useful over the long term. However, container metrics that are aggregated at the service or deployment level can be very useful for longer term trend analysis. 

![add-a-rule.png](/img/metrics/add-a-rule.png)

Here’s what the rule does:

1. The rule is applied to metrics that match the selector `metric=container_*`.  (Metrics whose name begin with “container_”.) For this example, assume that these are the matching metrics:  
    ```sql
    metric=container_memory_usage_bytes service=foo container=1234 pod=abcd
    metric=container_memory_usage_bytes service=foo container=4321 pod=dcba
    metric=container_fs_bytes service=foo container=1234 pod=abcd
    metric=container_fs_bytes service=foo container=4321 pod=dcba
    ```
1. The matching metrics shown above will be retained for 15 days, then discarded.
1. Matching metrics will be aggregating by the `metric` and `service` dimensions. The aggregated metrics are quantized to one minute and one hour resolutions for all rollup types: avg, min, max, sum, and count.
1. The aggregated metrics shown above will be retained for 400 days, then discarded. Only the dimensions upon which the raw metrics were aggregated are preserved in the aggregated metrics. The `container` and `pod` dimensions are not included in the aggregated metrics.
1. The aggregated metrics will have the value of the metric dimension modified to have a suffix of `_agg`, like this:  
    ```sql
    metric=container_memory_usage_bytes_agg service=foo metric=container_fs_bytes_agg service=foo
    ```

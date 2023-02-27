---
id: metric-rules-editor
title: Metrics Rules Editor
description: The Sumo Logic metrics rules editor allows you to tag metrics with data derived from the metric identifier.
---

The purpose of metrics rules is to make it easier to query metrics. This guide describes Sumo Logic metrics rules and metrics rules editor, our interface where you can create them. Here, you can also tag metrics with data derived from the metric identifier and then use those tags in metric queries.

## About metrics rules

metrics rules can create tags derived from segments of a Graphite metric path, or from the key-value pairs for a Carbon 2.0 metric.  

metrics rules are especially useful for Graphite metrics, although they can also be used with the Carbon 2.0 format. Attaching tags to Graphite metrics significantly eases the metric query process, enabling users to interactively build a query as a set of key-value pairs. 

Consider a Graphite metric with the following structure: `cluster.node.cpu.metric-name`. Here are some metrics with that structure: `cluster-1.node-1.cpu-1.cpu-idle Cluster-2.node-1.cpu-6.cpu-user cluster-6.node-1.cpu-2.cpu-sys`.

Without applying a metrics rule, you can’t search these metrics using key-value pairs. You can type the graphite string into a metric query tab and use an asterisk for one or more segments, like this: `cluster-1.node-1.*.cpu-idle`.

In contrast, after we applying a rule to our metrics, a user can interactively construct an analogous query formed of key-value pairs: `cluster=cluster-1 node=node-1 cpu=* metric-name=cpu-idle`.

Building a query made up of key-value pairs is easier, because Sumo prompts you with keys and values. You don’t need to know the exact name of the key, and as you build up the query, you can see matching time series in the metric query tab.  

## Supported Metrics

Sumo Logic supports Graphite, Carbon 2.0, and Prometheus metrics. 

Graphite metrics are identified by a dot-separated string, referred to as the metric path or a graphite string. Carbon 2.0 metrics are identified by one or more key-value pairs. In the Prometheus format, a time series is uniquely identified by its metric name and a set of labels, which are key-value pairs. 

Here is an example of the Graphite metric path, the Carbon 2.0 key-value pairs, and the Prometheus labels for the same metric:

* Graphite example: `cluster-1.node-1.cpu-1.cpu-idle`
* Carbon 2.0 example: `cluster=cluster-1 node=node-1 cpu=cpu-1 metric=cpu-idle`
* Prometheus example: `cpu-idle {cluster="cluster-1",node="node-1",cpu="cpu-1"}`

## Anatomy of a metrics rule

A metrics rule is made up of two parts: a *metric match expression* that defines the scope of the rule, and one or more variables that define the tags that will be applied to metrics that match the match expression.

You use the metrics rules editor to build a metrics rule. On the **Metrics Rules** page (**Manage Data > Metrics > Metrics Rules),** metrics rules are listed like this: <br/> ![named-rule.png](/img/metrics/named-rule.png)

The subsections that follow describe the information shown in the columns on the **Metrics Rules** page.

### Metrics match expression

A metric match expression defines the scope of the rule. Put another way, the match expression specifies the metrics to which the tags (defined by variable extraction) will be applied. 

### Dot-delimited match expressions

A match expression can be one or more dot-delimited string, like this: `collectd.*.*.*.*`.

which matches all graphite metrics that have five segments in the string, where the value of the first segment is “collectd”.

Given a dot-delimited match expression, Sumo applies the match expression to the `_rawName` field, which is present for Graphite metrics and contains the metric path for a metric.

### Key-value pair(s) match expressions

A match expression can be one or more key-value pairs, each of which specify a field available for the metric and a field value, like this: `_sourceCategory=training/shipping/metrics type=payment`.

which matches all metrics with the source category "training/shipping/metrics", whose `type` field is “payment”.

:::tip
If you don’t know what fields are available for a metric, you can see what they are on the **Legend** tab when you run a query that returns the metric. 
:::

If a match expression is made up of key-value pairs, Sumo applies it to metric fields *other* than the `_rawName` field. If a key you specify does not exist as a metric field, no matches will be found.

### Multiple match expressions

You can define multiple match expressions for the same rule. If you do, tags will be applied to metrics that match both expressions. For example: `nete.*.*.*.* classPath=*.*.*`.

matches metrics whose structure is `nete.*.*.*.*` and have a three-segment, dot-separated classpath.

### Greedy match expressions 

You can use greedy matching in a metric match expression. This is useful when your match expression is a dot-delimited string if the values in `_rawName` vary in terms of the number of segments. In this metric example, the portion in green is a class name: `prod.prod-lru-7.katta-svc.com.svc.soa.service.InstResponder.KattaProtocol.countPerShard_v3.m5_rate`.

Different classes have dot-delimited names of various lengths, so a match expression for this metric should use greedy matching for the class name segment. For example: `prod.*.*.**.*.*.*`.

## Create a Metrics Rule

Here's how to create a metrics rule using the metrics rules editor in the Sumo UI:

1. In the Sumo web app, go to **Manage Data > Metrics > Metrics Rules**. The **Metrics Rules** page lists the metrics rules that have already been defined.<br/> ![named-rule.png](/img/metrics/named-rule.png)
1. To add a new rule, click the plus sign (+) in the upper left of the **Metrics Rules** page. The **Add Metrics Rule** popup appears.<br/>  ![add-metric-rule-empty.png](/img/metrics/add-metric-rule-empty.png)
1. In the **Rule name** field, enter a name for the new rule.
1. In the **Metrics match expression** field, enter one or more expressions that match the identifier of the metrics you want to tag. For example, this match expression: `collectd.*.*.*.*` matches Graphite strings in the `_rawName` field that begin with “collectd”, followed by four dot-separated segments.
   * For example: `collectd.cqsplitter.stag-cqsplitter-2.GenericJMX-health_jmx-memory.memory-heapmax` and this match expression: `_sourceCategory=training/shipping/metrics type=payment` matches all metrics whose`_sourceCategory` field is "training/shipping/metrics" and type field is “payment”.
    :::tip
    For greedy matching, use two asterisks. For more information, see the [Greedy match expressions](#greedy-match-expressions). You can use more than one match expression. For more information, see the [Multiple match expressions](#multiple-match-expressions).
    :::
    The **Time Series** section of the page lists metrics that match the expression you entered. If no metrics are listed, edit your match expression until matching metrics appear.<br/> ![add-metric-rule-with-expression.png](/img/metrics/add-metric-rule-with-expression.png)
1. In the **Define variables** section of the page, for each tag you want to apply to matching metrics, enter a meaningful tag name in the **Variable name** field on the left. In the **Tag sequence** field, assign a variable to the tag. There are two different formats for specifying the Tag Sequence.
   * To pull a tag from a dot-delimited string in the metric's `_rawName` field, use `$_1` to extract the first segment of the string, `$_2` to extract the second segment of the string, and so on.  For more information, see [Extracting variables from a dot-delimited match expression](#extract-variables-from-a-dot-delimited-match-expression).
   * To pull a tag from a dot-delimited string in metric field other than `_rawName` field, use `$FieldName._1` to extract the first segment of the string, `$FieldName._2` to extract the second segment of the string, and so on. For more information, see [Extracting variables from a key-value pair match expression](#extract-variables-from-a-key-value-pair-match-expression).
1. Select a metric in the **Time Series** section to see the values that would be assigned to each extracted tag for the selected metric. The entries below show what values would be assigned to the selected metric given the specified Tag Sequences. <br/>![variable-extracton.png](/img/metrics/variable-extracton.png)     
1. Click **Save** to save your rule. The tags will be applied to incoming metrics. Sumo Logic will not re-index your historical data.



## Variable extractions

Variable extractions define the tags you want to attach to metrics that match a match expression. You define extraction assignments using the fields in the **Define variables** section of the **Add Metrics Rule** popup.

![add-metric-rule-with-expression.png](/img/metrics/add-metric-rule-with-expression.png)

When you define a variable you give it a name and define its Tag Sequence, which maps the variable to a specific segment of a delimited string. The format for the Tag Sequence depends on whether the corresponding match expression is a Graphite string or is one or more key-value pairs. 

### Extract variables from a dot-delimited match expression

For this dot-delimited match expression: `collectd.*.*.*.*`.
   
You can define four variables: one for each of the segments represented by an asterisk. As described in [Dot-delimited match expressions](#dot-delimited-match-expressions), if no key is specified, Sumo will match the expression against metrics’ `_rawName` field. When matching against ` _rawName`, specify the Tag Sequence for a variable in this form: `$_sequence`.

where `sequence` indicates the placement of the segment in the match expression. For example, enter `$_2` to extract the second component of the metric match expression.

The screenshot below shows variable definitions for the “collectd” rule. The entries in the screenshot below tell Sumo to define the tags “cluster”, “node”, “id”, and “metric”. These tags map to the segments of the match expression that are represented by asterisks, in the order that they appear.  

### Extract variables from a key-value pair match expression

If your match expression is made up of key-value pairs, rather than a dot-delimited string, Sumo will match the expression against metric fields *other* than `_rawName` field.

For key-value pair expressions, you must specify the field name in the define the Tag Sequence, in this format: `$field._sequence`. Where:
* `field` is the name of the field from which you want to extract a tag.
* `sequence` indicates the placement of the segment in the match expression. 

For example, given this match expression: `classPath=*.*.*`. You could define the Tag Sequence like this - `$classPath._3` - to extract the third component of the metric match expression.

### Match the expression against the _rawName field

Use the `$_field_sequence` format, specifying the `_rawName` field. For example, given the Tag Sequence: `$_rawName_2`, matching metrics will be tagged with the value of the second segment of the `_rawName` field.

### Validate variable assignments

To check out how your variable assignments work, select a metric in the **Time Series** section of the rules editor. The values that would be assigned to each tag are displayed.

![variable-extracton.png](/img/metrics/variable-extracton.png)

In the screenshot above, the following metric is selected: `collectd.kafka-forge-aa.nite-kafka-forge-aa-1.irq.irq-cal`. The values Sumo assigns to the variables are shown to the right of the variable definition. For our example metric, Sumo would attach the following name-value pairs to the metric: `cluster=kafka-forge-aa node=nite-kafka-forge-aa-1 id=irq metric=irq-cal`.


## Metrics Rules editor error messages

This section describes error messages that can be issued by the Metrics Rules Editor.

| Error Message | Description |
| :-- | :-- |
| Rule name already exists. | This message appears if you try to assign a name that is already assigned to a an existing rule to a different rule. To resolve this error, enter a different rule name. |
| Rule already exists. | This message appears if you try to create a rule that has the same match expression and variable assignment(s) as an existing rule. |
| $field was needed but not extracted.<br/>(Where $field is a variable that has not been extracted.) | This message appears if you refer to a variable that you have not extracted. |
| Rules specification field $field starts with underscore.<br/>(Where $field is a variable.) | This message appears if the field name starts with underscore. |
| Duplicated extraction field. | This message appears if you assign multiple values to the same field. |
| Unable to parse rule; [4.8] failure: 'extract:' expected but ':' found. | This message appears if you specify an invalid match expression. |

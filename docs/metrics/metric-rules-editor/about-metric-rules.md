---
id: about-metric-rules
title: About Metric Rules
sidebar_label: About Metric Rules
description: Learn about metric rules and how they ease the process of querying metrics.
---

## Overview of metric rules

The purpose of metric rules is to make it easier to query metrics. You can use metric rules to tag metrics with data derived from the metric identifier. Then, you can use those tags in metric queries.

This page describes how metric rules work and Sumo’s user interface for creating them, the metric rules editor. For step-by-step instructions, see [Create Metric Rules](create-metric-rules.md).

## Metrics in Sumo

Sumo supports Graphite, Carbon 2.0, and Prometheus metrics. 

Graphite metrics are identified by a dot-separated string, referred to as the metric path or a graphite string. Carbon 2.0 metrics are identified by one or more key-value pairs. In the Prometheus format, a time series is uniquely identified by its metric name and a set of labels, which are key-value pairs. 

Here is an example of the Graphite metric path, the Carbon 2.0 key-value pairs, and the Prometheus labels for the same metric:

* Graphite example:  `cluster-1.node-1.cpu-1.cpu-idle`
* Carbon 2.0 example:  `cluster=cluster-1 node=node-1 cpu=cpu-1 metric=cpu-idle `
* Prometheus example: `cpu-idle {cluster="cluster-1",node="node-1",cpu="cpu-1"} `

## Metric rules: What are they good for? 

This section describes the benefit of using metric rules. 

Metric rules can create tags derived from segments of a Graphite metric path, or from the key-value pairs for a Carbon 2.0 metric.  

Metric rules are especially useful for Graphite metrics, although they can also be used with the Carbon 2.0 format. Attaching tags to Graphite metrics significantly eases the metric query process, enabling users to interactively build a query as a set of key-value pairs. 

Consider a Graphite metric with the following structure:

`cluster.node.cpu.metric-name`

Here are some metrics with that structure:

`cluster-1.node-1.cpu-1.cpu-idle Cluster-2.node-1.cpu-6.cpu-user cluster-6.node-1.cpu-2.cpu-sys`

Without applying a metric rule you can’t search these metrics using key-value pairs. You can type the graphite string into a metric query tab and use an asterisk for one or more segments, like this:

`cluster-1.node-1.*.cpu-idle`

In contrast, after we applying a metric rule to our metrics, a user can interactively construct an analogous query formed of key-value pairs:

`cluster=cluster-1 node=node-1 cpu=* metric-name=cpu-idle `

Building a query made up of key-value pairs is easier, because Sumo prompts you with keys and values. You don’t need to know the exact name of the key, and as you build up the query, you can see matching time series in the metric query tab.  

## Anatomy of a metric rule

A metric rule is made up of two parts: a *metric match expression* that defines the scope of the rule, and one or more variables that define the tags that will be applied to metrics that match the match expression.

You use the metric rules editor to build a metric rule. On the **Metric Rules** page (**Manage Data \> Metrics\> Metric Rules),** metric rules are listed like this:

![named-rule.png](/img/metrics/named-rule.png)

The subsections that follow describe the information shown in the columns on the **Metric Rules** page.

### Metric match expression

A metric match expression defines the scope of the rule. Put another way, the match expression specifies the metrics to which the tags (defined by variable extraction) will be applied. 

### Dot-delimited match expressions

A match expression can be one or more dot-delimited string, like this:

`collectd.*.*.*.*`

which matches all graphite metrics that have five segments in the string, where the value of the first segment is “collectd”.

Given a dot-delimited match expression, Sumo applies the match expression to the `_rawName` field, which is present for Graphite metrics and contains the metric path for a metric.

### Key-value pair(s) match expressions

A match expression can be one or more key-value pairs, each of which specify a field available for the metric and a field value, like this:

`_sourceCategory=training/shipping/metrics type=payment`

which matches all metrics with the source category "training/shipping/metrics", whose `type` field is “payment”.

:::tip
If you don’t know what fields are available for a metric, you can see what they are on the **Legend** tab when you run a query that returns the metric. 
:::

If a match expression is made up of key-value pairs, Sumo applies it to metric fields *other* than the `_rawName` field. If a key you specify does not exist as a metric field, no matches will be found.

### Multiple match expressions

You can define multiple match expressions for the same rule. If you do, tags will be applied to metrics that match both expressions. For example:

`nete.*.*.*.* classPath=*.*.*`

matches metrics whose structure is `nete.*.*.*.*` and have a three-segment, dot-separated classpath.

### Greedy match expressions 

You can use greedy matching in a metric match expression. This is useful when your match expression is a dot-delimited string if the values in `_rawName` vary in terms of the number of segments.  For example, in the metric below, the portion in green is a class name.

`prod.prod-lru-7.katta-svc.com.svc.soa.service.InstResponder.KattaProtocol.countPerShard_v3.m5_rate`

Different classes have dot-delimited names of various lengths, so a match expression for this metric should use greedy matching for the class name segment. For example:

`prod.*.*.**.*.*.*`

## Variable extractions

Variable extractions define the tags you want to attach to metrics that match a match expression.

You define extraction assignments using the fields in the **Define variables** section of the **Add Metric Rule** popup.

![add-metric-rule-with-expression.png](/img/metrics/add-metric-rule-with-expression.png)

When you define a variable you give it a name and define its Tag Sequence, which maps the variable to a specific segment of a delimited string. The format for the Tag Sequence depends on whether the corresponding match expression is a Graphite string or is one or more key-value pairs. 

### Extracting variables from a dot-delimited match expression

For this dot-delimited match expression: 

`collectd.*.*.*.*`  
   
You can define four variables: one for each of the segments represented by an asterisk. As described in [Dot-delimited match expressions](#dot-delimited-match-expressions), if no key is specified, Sumo will match the expression against metrics’ `_rawName` field. When matching against ` _rawName`, specify the Tag Sequence for a variable in this form:

`$_sequence `

where `sequence` indicates the placement of the segment in the match expression. For example, enter `$_2` to extract the second component of the metric match expression.

The screenshot below shows variable definitions for the “collectd” rule. The entries in the screenshot below tell Sumo to define the tags “cluster”, “node”, “id”, and “metric”. These tags map to the segments of the match expression that are represented by asterisks, in the order that they appear.  

### Extracting variables from a key-value pair match expression

If your match expression is made up of key-value pairs, rather than a dot-delimited string, Sumo will match the expression against metric fields *other* than `_rawName` field.  For key-value pair expressions, you must specify the field name in the define the Tag Sequence, in this format: 

`$field._sequence`

where:

* `field` is the name of the field from which you want to extract a tag.
* `sequence` indicates the placement of the segment in the match expression. 

For example, given this match expression:

`classPath=*.*.*`

You could define the Tag Sequence like this:

`$classPath._3`

to extract the third component of the metric match expression.

### What if you want to match the expression against \_rawName field?

You can. Use the `$_field_sequence` format, specifying the `_rawName` field. For example, given this Tag Sequence:

`$_rawName_2`

matching metrics will be tagged with the value of the second segment of the `_rawName` field.

### Validating variable assignments

To check out how your variable assignments work, select a metric in the **Time Series** section of the rules editor. The values that would be assigned to each tag are displayed.

![variable-extracton.png](/img/metrics/variable-extracton.png)

In the screenshot above, the following metric is selected:

`collectd.kafka-forge-aa.nite-kafka-forge-aa-1.irq.irq-cal`

The values Sumo assigns to the variables are shown to the right of the variable definition. For our example metric, Sumo would attach the following name-value pairs to the metric:

`cluster=kafka-forge-aa node=nite-kafka-forge-aa-1 id=irq metric=irq-cal`

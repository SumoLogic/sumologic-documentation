---
id: create-metric-rules
title: Create Metric Rules
sidebar_label: Create Metric Rules
description: Use the metric rules editor to tag metrics with key-value pairs to ease the process of querying metrics.
---

This page has step-by-step instructions for creating a metric rule using the metric rules editor in the Sumo UI.

The purpose of metric rules is to make it easier to query metrics. You can use metric rules to tag metrics with data derived from the metric identifier. Then, you can use those tags in metric queries, alerts, and dashboard filters.

For a detailed discussion of metric rules, see [About Metric Rules](about-metric-rules.md).  

## Create a Metric Rule

To create a metric rule:

1. In the Sumo web app, go to **Manage Data \> Metrics \> Metric Rules**.  

    The **Metric Rules** page lists the metric rules that have already been defined.

    ![named-rule.png](/img/metrics/named-rule.png)

1. To add a new rule, click the plus sign (+) in the upper left of the **Metric Rules** page.  

    The **Add Metric Rule** popup appears.  

    ![add-metric-rule-empty.png](/img/metrics/add-metric-rule-empty.png)

1. In the **Rule name** field, enter a name for the new rule.

1. In the **Metric match expression** field, enter one or more expressions that match the identifier of the metrics you want to tag. For example, this match expression:  

    `collectd.*.*.*.*`  

    matches Graphite strings in the `_rawName` field that begin with “collectd”, followed by four dot-separated segments. For example:  

    `collectd.cqsplitter.stag-cqsplitter-2.GenericJMX-health_jmx-memory.memory-heapmax`  

    And this match expression:  

    `_sourceCategory=training/shipping/metrics type=payment`  

    matches all metrics whose`_sourceCategory` field is "training/shipping/metrics" and type field is “payment”.

    :::tip
    For greedy matching, use two asterisks. For more information, see the [Greedy match expressions](about-metric-rules.md#greedy-match-expressions).

    You can use more than one match expression. For more information, see the [Multiple match expressions](about-metric-rules.md#multiple-match-expressions).
    :::

    The **Time Series** section of the page lists metrics that match the expression you entered. If no metrics are listed, edit your match expression until matching metrics appear.

    ![add-metric-rule-with-expression.png](/img/metrics/add-metric-rule-with-expression.png)

1. In the **Define variables** section of the page, for each tag you want to apply to matching metrics, enter a meaningful tag name in the **Variable name** field on the left. In the **Tag sequence** field, assign a variable to the tag. There are two different formats for specifying the Tag Sequence.

    * To pull a tag from a dot-delimited string in the metric's `_rawName` field, use `$_1` to extract the first segment of the string, `$_2` to extract the second segment of the string, and so on.  For more information, see [Extracting variables from a dot-delimited match expression](about-metric-rules.md#extracting-variables-from-a-dot-delimited-match-expression).
    * To pull a tag from a dot-delimited string in metric field other than `_rawName` field, use `$FieldName._1` to extract the first segment of the string, `$FieldName._2` to extract the second segment of the string, and so on. For more information, see [Extracting variables from a key-value pair match expression,](about-metric-rules.md#extracting-variables-from-a-key-value-pair-match-expression).

1. Select a metric in the **Time Series** section to see the values that would be assigned to each extracted tag for the selected metric:  

    The entries below show what values would be assigned to the selected metric given the specified Tag Sequences.  

    ![variable-extracton.png](/img/metrics/variable-extracton.png)  
     
1. Click **Save** to save your rule. The tags will be applied to incoming metrics. Sumo Logic will not re-index your historical data.

## Metric Rules editor error messages

This section describes error messages that can be issued by the Metric Rules Editor.

| Error Message | Description |
| -- | -- |
| Rule name already exists. | This message appears if you try to assign a name that is already assigned to a an existing rule to a different rule. To resolve this error, enter a different rule name. |
| Rule already exists. | This message appears if you try to create a rule that has the same match expression and variable assignment(s) as an existing rule. |
| $field was needed but not extracted.<br/>(Where $field is a variable that has not been extracted.) | This message appears if you refer to a variable that you have not extracted. |
| Rules specification field $field starts with underscore.<br/>(Where $field is a variable.) | This message appears if the field name starts with underscore. |
| Duplicated extraction field. | This message appears if you assign multiple values to the same field. |
| Unable to parse rule; [4.8] failure: 'extract:' expected but ':' found. | This message appears if you specify an invalid match expression. |

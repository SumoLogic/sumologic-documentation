---
id: metric-query-autocomplete
title: Metric Query Autocomplete
sidebar_label: Metric Query Autocomplete
description: The Metrics Explorer provides an autocomplete dropdown dialog that offers suggestions to make query writing easier.
---

The [Metrics Explorer](/docs/metrics/metrics-queries/metrics-explorer) provides an autocomplete dropdown dialog that offers suggestions to make query writing easier. Autocomplete is supported in both Basic and Advanced mode.

## Basic Mode autocomplete

In Basic Mode, the Metrics Explorer provides a query builder UI with
three fields for building a query.

* **Metric** — When you click the field, a list of metrics is displayed. As you start to enter text, the metrics that match your entry appear.
* **Filter** — When you click the field, a list of Sumo Logic metadata fields, metric dimensions, and metatags is displayed. As you start to enter text, the items that match your entry appear.
* **Add Operator** — When you click the field a list of operators is displayed. After you select an operator, you’re prompted to supply the appropriate options for that operator.   

    ![basic-autocomplete.png](/img/metrics/basic-autocomplete.png)

## Advanced Mode autocomplete

In Advanced Mode, the Metrics Explorer allows you to enter a free-form metric query. 

When you click in the query area, metric query autocomplete presents a list of Sumo Logic metadata fields, dimensions, and metatags. When you select an item from the list, autocomplete offers a list of values for the item. If you look at a metric query as a set of key-value pairs, autocomplete presents a list of keys, and when you choose one, it then presents a list of values.

If you enter a partial value in the query area, autocomplete presents only those items that match the value.  

![advanced-autocomplete.png](/img/metrics/advanced-autocomplete.png)

## About autocomplete retention

Autocomplete presents dimensions from your ingested metrics to help you scope your queries and get the most precise results. To make autocomplete fast and reliable, we only show dimensions for metrics ingested during the previous 60 days. If your query time range is beyond this range, autocomplete will serve the suggestions based on the last available day within the 60 days.  
 

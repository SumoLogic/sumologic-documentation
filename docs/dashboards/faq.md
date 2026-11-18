---
id: faq
title: Dashboards FAQ
sidebar_label: FAQ
description: Find answers to frequently asked questions about Sumo Logic dashboards.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## How do I convert a Classic dashboard to a Sumo Logic dashboard?

There is **no** automatic way to convert a classic dashboard to a Sumo Logic dashboard. The best way to convert a classic dashboard to a Sumo Logic dashboard is to manually transfer over the panels you want to migrate. See [Steps to Migrate](/docs/dashboards/dashboards-migration/steps-to-migrate).

## How do I add filters to a dashboard?

In Sumo Logic dashboards, we have created a variables feature that follows the standard set by other dashboard providers. Variables take the place of filters from classic dashboards and can be used in a similar fashion to reduce the scope of data displayed on your dashboards.

Dashboard variables work much like a [parameterized search](/docs/search/get-started-with-search/build-search/search-templates). You define where to place variables and reuse them throughout your queries.

See details on [how to filter with template variables](filter-template-variables.md).

The biggest differences between variables and filters are:

1. Unlike filters, you need to declare variables in your query for them to filter the panel. To use a variable in a query, reference it using mustache syntax as follows:

    ```sql
    {{<variable_name>}}
    ```

1. Unlike filters, variables give you full control over where and how you use them in your query. Because of this, you can use variables to do a lot more than filter your query. You can use them to dynamically change time slices across your panels, replace operator arguments, or serve as inputs for further transformation before filtering.

1. Variables can be derived from metrics metadata, logs queries, or a custom list. Any logs query that outputs a table can be used as the source of a logs variable, and any metadata you send with metrics can be used with your variables.

1. You can nest metrics variables so that the selection in one variable impacts the selection in the next one.

## What is the difference between a categorical and time series panel?

The **categorical** panel type contains charts that graph data across
categories. This includes:

* Bar charts over categories
* Column charts over categories
* Pie Charts
* Tables over categories
* Bubble Charts
* Scatter Charts

The **time series** panel type is designed to graph data over time. Time series panels accept aggregate fields with epoch values (milliseconds since 1970). You can use the [`timeslice`](/docs/search/search-query-language/search-operators/timeslice) operator to provide a time series.

The types of charts you will find in the time series panel include:

* Area
* Bar
* Column
* Line
* Table

## How do I overlay logs and metrics on one panel?

One of the valuable features in dashboards is that you can graph data from different data sources on the same panel. Each dashboard panel can have up to 6 metrics and 6 logs query rows. To create a panel with both logs and metrics derived data, press the **Add a Panel** button, select **Time Series**, and the panel builder opens.<br/><img src={useBaseUrl('/img/dashboards/dashboard-faq/Add-a-panel-button.png')} alt="Add a panel button" style={{border: '1px solid gray'}} width="800" />

To switch between a metrics query row and a logs query row, you need to select the Logs query dropdown next to **#A** and change it to Metrics. To add multiple logs or metrics rows, hover over the last query row and press the + button.<br/><img src={useBaseUrl('/img/dashboards/dashboard-faq/Logs-and-metrics-query-options.png')} alt="Logs and metrics query options" style={{border: '1px solid gray'}} width="600" />

If you are in a time series panel, you can only graph items over time. This means that every logs query needs to be [`timesliced`](/docs/search/search-query-language/search-operators/timeslice) if you are going to graph it in a time series chart. If you want to count across categories, use a categorical panel.

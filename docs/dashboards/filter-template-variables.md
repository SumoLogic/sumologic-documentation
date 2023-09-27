---
id: filter-template-variables
title: Filtering Dashboards with Template Variables
sidebar_label: Filtering with Template Variables
description: Learn how to use template variables to dynamically filter dashboard data.
---

Template variables are a feature of Dashboard that allow you to analyze specific data on demand. They give you the ability to filter the data displayed on your dashboard so you can quickly troubleshoot a problem. Queries can be changed on the fly by choosing values for variables from dropdown lists without having to manually edit queries.

This feature requires two parts to work:

1. You [created a template variable](#create-a-template-variable).
1. You [added the template variable to your query](#how-to-use-a-logs-variable-in-a-query).

## Limitations

The web interface autocomplete feature for log search variables has the following limitations:

* It is updated every night for the last 24 hours starting from 10PM PT to the previous day at 10PM PT. 
* Only dashboards that were viewed in the last 3 days are updated.
* Up to 10,000 log values and 1,000 metric values are displayed.
* Values for template variables are based on the time range of the Dashboard.

## Show and hide variables option

In the Dashboard top menu bar, click the filter icon to show the variables option. The filter icon allows you to toggle if the variables option is displayed or hidden.

![Show and Hide filters.png](/img/dashboards-new/filter-template-variables/Show-and-Hide-filters.png)

## Create a template variable

There are three types of template variables you can use as a dashboard filter:

* Custom List - a custom set of options
* Metrics Metadata Search - metrics metadata based options 
* Log Search - logs query based options

### Add a Custom List variable

A custom list variable allows you to specify random string values for a variable. These are helpful when you know the values of fields you want to reference on-the-fly. For example, if your data had a field named `size` and you knew the potential values you wanted to reference were `large`, `medium`, and `small`. A custom list variable would be assigned the **Variable Name** `size` and the **Custom List** would be given the value `large, medium, small`. Then in your panel query you would provide the variable as `{{size}}`. With these set up you can use the variable to filter your data by color.

To add a Custom List variable to a dashboard, do the following:

1. In the Dashboard top menu bar, click the filter icon to show the variables option. The filter icon allows you to toggle if the variables option is displayed or hidden.

    ![Show and Hide filters.png](/img/dashboards-new/filter-template-variables/Show-and-Hide-filters.png)

1. In the Dashboard top menu bar, click the **plus (+) icon**. The **Create Template Variable** panel appears.

    ![create dashboard filter.png](/img/dashboards-new/filter-template-variables/create-dashboard-filter.png)

1. In the **Create Template Variable** panel, enter a unique **Variable Name**. Spaces and special characters, with the exception of an underscore (_), are not allowed in value names.

![Create Template Variable dialog.png](/img/dashboards-new/filter-template-variables/Create-Template-Variable-dialog.png)

1. Select **Custom List** as the **Variable Type**.
1. **List Items** are your variable values. Use a comma separated list for variable options, separating individual options with a comma. For example, `small, medium, large`.
1. Optional: Provide a **Default Value** for the variable.
1. Optional: Toggle ON **Include the option to select all values (\*) **to include a wildcard asterisk (\*) in the available options.
1. Click **Create Template Variable** to apply the variable to the dashboard. 

### Add a Metrics Metadata Search variable

A Metrics Metadata Search variable allows you to specify metric metadata to act as a variable. you will be able to select from previously collected metrics as your filter.

To add a Metrics Metadata Search variable to a dashboard, do the following:

1. In the Dashboard top menu bar, click the filter icon to show
    the variables option. The filter icon allows you to toggle if the
    variables option is displayed or hidden.

![Show and Hide filters.png](/img/dashboards-new/filter-template-variables/Show-and-Hide-filters.png)

1. In the Dashboard top menu bar, click the **plus (+) icon**. The **Create Template Variable** panel appears.  

    ![create dashboard filter.png](/img/dashboards-new/filter-template-variables/create-dashboard-filter.png)

1. In the **Create Template Variable** panel, enter a unique **Variable Name**. Spaces and special characters, with the exception of an underscore (_), are not allowed in value names.

    ![dashboard new metrics metadata search variable.png](/img/dashboards-new/filter-template-variables/dashboard-new-metrics-metadata-search-variable.png)

1. Select **Metrics Metadata Search** as the **Variable Type**.
1. The **Fields (key)** is the metadata field you want to use as the
    filter.
1. Optional: **Filters** allow you to filter the scope of your data before choosing the field you want to use. Click in the **Filter** input, begin typing, and choose a filter from the pop-up list. A list of valid values appears. Select a value for the filter, and add other filters as needed.
1. Optional: Toggle ON **Include the option to select all values (\*)** to include a wildcard asterisk (\*) in the available options.
1. Optional: Provide a **Default Value** for the variable.
1. Click **Create Template Variable** to apply the variable to the dashboard.

### Add a Logs Search variable

A Logs Search variable allows you to specify log metadata fields to act as a variable. you will be able to select from previously parsed fields to build your filter.

To add a Logs Search variable to a dashboard, do the following:

1. In the Dashboard top menu bar, click the filter icon to show the variables option. The filter icon allows you to toggle if the variables option is displayed or hidden.

    ![Show and Hide filters.png](/img/dashboards-new/filter-template-variables/Show-and-Hide-filters.png)

1. In the Dashboard top menu bar, click the **plus (+) icon**. The **Create Template Variable** panel appears.  

    ![create dashboard filter.png](/img/dashboards-new/filter-template-variables/create-dashboard-filter.png)

1. In the **Create Template Variable** panel, enter a unique **Variable Name**. Spaces and special characters, with the exception of an underscore (_), are not allowed in value names.

    ![Variable for logs search.png](/img/dashboards-new/filter-template-variables/Variable-for-logs-search.png)

1. Select **Logs Search** as the **Variable Type**.
1. Click in the **Query** field and begin typing your query. Select valid options from the pop-up list as they appear until your query is complete.
1. The **Key** is the metadata field you want to use as the filter. Once a Key is selected the Preview table will show example values based on the query running for the last 15 minutes.
1. Optional: Toggle ON **Include the option to select all values** to include a wildcard asterisk (\*) in the available options.
1. Optional: Enter a **Default Value** for the variable.
1. Click **Create Template Variable** to apply the variable to the dashboard.

## Edit a template variable

This task shows you how to modify an existing template variable in a Dashboard so you can rescope your data on the fly. This is helpful for troubleshooting a problem to a fast resolution to the root cause.

To edit a template variable, do the following:

1. Hover the cursor over the end of the template variable field to display the options icon.

    ![options menu for variable.png](/img/dashboards-new/filter-template-variables/options-menu-for-variable.png)

1. Click the **Details** icon and select **Edit** from the dropdown menu. The Edit Variable dialog appears.  

    ![edit variable.png](/img/dashboards-new/filter-template-variables/edit-variable.png)

1. Edit the variable as needed.  

    ![edit variable dialog.png](/img/dashboards-new/filter-template-variables/edit-variable-dialog.png)

1. Click **Save Template Variable** to apply your changes.

## Delete a template variable

This task shows you how you can easily delete a template variable from Dashboard.

To delete a template variable, do the following:

1. Hover the cursor over the end of the template variable field to display the options icon.

    ![options menu for variable.png](/img/dashboards-new/filter-template-variables/options-menu-for-variable.png)

1. Click the options icon and select **Delete** from the dropdown menu. The variable along with the resulting data transformations are automatically removed from the dashboard.  

    ![delete variable.png](/img/dashboards-new/filter-template-variables/delete-variable.png)

## Use variables in queries

Logs and metrics variables allow you to interject metadata into your queries. This section shows you how to use a variable you created in a query.

The variable must already exist on the dashboard to add a query with a variable.

### How to use a logs variable in a query

To use a variable in a logs query, do the following:

1. Go to your logs query.
1. Add the variable name wrapped in double brackets `{\<variable_nam\>}}` to your query. In the following example `cluster` is the name of the variable.

    ![Logs_variable_query_example.png](/img/dashboards-new/filter-template-variables/Logs_variable_query_example.png)

    At run time, the value inside the curly braces is replaced with the value of the variable you specified from the variable dropdown list.

#### String literal

Wrap string literal variables in quotes `"{\<variable_nam\>}}"`. If your values are text you need to wrap the variable in quotes.

When including the option to select all values, use the [matches](/docs/search/search-query-language/search-operators/matches) operator. Otherwise `*` will not do an "all" filter, it will filter against the literal asterisk "\*" string.

For example,

```sql
_sourceCategory=query
| where type = {{_type}}
| count_distinct(type)
```

changed to use `matches` and wrapped the string literal variable in
quotes:

```sql
_sourceCategory=query
| where type matches "{{_type}}"
| count_distinct(type)
```

### How to use a metrics variable in a query

To use a metrics variable in a query working with the structured query builder, do the following:

1. In the structured query builder, enter the Key for the variable followed by an equals sign.
1. Select the desired variable from the dropdown list. It appears in curly braces to indicate it is a variable.

![Metrics_variable_query_example1.png](/img/dashboards-new/filter-template-variables/Metrics_variable_query_example1.png)

The variable is inserted into the query and will convert the variable into the appropriate value, as shown in the following example.

![Metrics_variable_query_example2.png](/img/dashboards-new/filter-template-variables/Metrics_variable_query_example2.png)

To use a metrics variable in a query working in advanced query mode, do the following:

1. Locate the name of the variable you'd like to use in the dropdown list and copy it.
1. Go to your metrics query and insert *{{ var_name }}* in the query, substituting `var_name` with the actual name of the variable.

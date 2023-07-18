---
id: column-charts
---

# Column Charts

Column charts are useful for visually comparing the number of events that have occurred, such as the type of error that occurs the most in your system. To create a Column chart, use a search query that provides at least a few data points in the **Aggregates** tab.

:::note
The number of data points on a dashboard panel are limited to 1,000, and therefore only 1,000 data points are shown on a chart panel in dashboards.
:::

For example, you could use the following query to create a simple Column chart:

```sql
(error OR fail*) AND exception | count by _sourceCategory | sort by _count
```

which would produce results such as:

![AggResult.png](/img/dashboards/AggResult.png)

To create a column chart:

1.  Run a query.
2.  In the **Aggregates** tab, choose the **Column Chart** icon to display the search results.

    ![Charts - column](/img/dashboards/charts_column.png)

The data in the **Aggregates** tab is represented as a column chart.

![Column chart](/img/dashboards/ColumnChart.png)

For details on customizing the way your chart is displayed, see [Edit Dashboards and Panels](/docs/dashboards/edit-dashboards)..

## Creating Stacked Column Charts

To create a stacked column chart, use a query that uses a multiple series that counts by at least two things, for example, this query from the Sumo Logic App for Apache creates a stacked column chart for visits by country over time:

```sql
_sourceCategory=Apache/Access
| parse regex "(?<client_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| lookup latitude, longitude, country_code, country_name, region, city, postal_code from geo://location on ip = client_ip
| where !isNull(country_name) AND country_name !=""
| timeslice 5m
| count by _timeslice, country_name
| transpose row _timeslice column country_name as *
```

To create a stacked column chart:

1.  Run a query, such as the previous example.
2.  In the **Aggregates** tab, choose the **Column Chart** icon to display the search results.
3.  In the **Settings** menu, select **Change Properties**.
4.  Under **Stacking**, select **Normal**. 

    ![Change properties](/img/dashboards/stacking_normal.png)

5.  Click **Save**.

    ![stacked-columns.png](/img/dashboards/stacked-columns.png)

The data in the chart is displayed in stacked columns.

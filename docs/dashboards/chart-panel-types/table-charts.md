---
id: table-charts
---

# Table Charts

Table charts are the default chart type in the **Aggregates** tab. They are useful for listing the type and number of events that have occurred, such as the type of error that occurs the most in your system. To create a table chart, use a search query that provides at least a few data points in the **Aggregates** tab.

For example, you could use the following query to create a simple Table chart:

```sql
(error OR fail*) AND exception | count by _sourceCategory | sort by _count
```

which would produce results such as:

![AggResult.png](/img/dashboards/AggResult.png)

## Create a table chart

1. Run a query.
1. In the **Aggregates** tab, click the table chart icon.

    ![Charts - table](/img/dashboards/charts_table.png)

The data in the **Aggregates** tab is represented as a table chart.

![AggResult.png](/img/dashboards/AggResult.png)

## URL Links in table chart panels

If your query looks for URLs, when you create a table chart panel, the URLs displayed in the table will be displayed as working links.

For example, if you used this query to search for hits to the Sumo Logic Help system:

```sql
_sourceCategory=aws/cloudtrail  | keyvalue "LoginTo"  | count loginto | sort - _count
```

You would see results such as the following in the **Aggregates** tab.

![URLTable.png](/img/dashboards/URLTable.png)

Then, use the following steps to create a table chart panel.

## Create a table chart panel

1. Click **Add to Dashboard** to create a table chart panel.
1. When the table chart panel appears in your Dashboard, make sure the **Edit** toggle is off.
1. The links become live. If you click a link, it will open the displayed URL in a new tab.

![Link.png](/img/dashboards/Link.png)

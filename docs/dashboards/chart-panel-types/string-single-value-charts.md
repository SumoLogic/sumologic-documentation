---
id: string-single-value-charts
---

# String Single Value Charts

A string single value chart is useful for displaying the results of a query that returns only a single record, in order to make that value stand out at a glance. If the query returns more than one value in the Aggregates tab, only the first value is displayed in the single value chart.

Single value charts use [SI prefixes](https://en.wikipedia.org/wiki/Metric_prefix) to define the values. A string single value chart displays the first result of a search query as a string, such as a top status or message.

For example, you can use the following query:

```sql
error | count | format("%d errors", _count) as errorString | fields errorString
```

which provides results in a single value chart like:

![StringSV.png](/img/dashboards/StringSV.png)

If your query does not meet the requirements for displaying a single value chart—for example, if there are no results or if it is a null result—the single value icon will appear grayed out in the display options. But you can also customize how a chart with no results displays in the properties.

## Create a string single value chart

1. Run a query.
1. In the **Aggregates** tab, choose the **single value** icon to display the results graphically.

    ![charts_single_value_viewer](/img/dashboards/charts_single_value_viewer.png)

1. The single value chart is displayed, using default colors and text.
1. (Optional) **Click Add to Dashboard **if you'd like to save the chart as a panel. 

## Modify a string single value chart

1. On the **Search** page, on the **Aggregates** tab, select the **Settings** icon.
1. Select **Change Properties**. 

    ![SV.png](/img/dashboards/SV.png)    

1. **When Data is Available.** When data is available for this query, the chart will use these properties: 

   * **Color.** Override the default color of text to a new color.
   * **Display color on the background.** Activate this check box to use the selected color as a background. The text will be black or white depending on the color value.

1. **When Data is not Available.** When no data is available for this query, all **When Data is** **Available** options are ignored. But if the settings below are not configured, the chart will display no information.

   * **Use the following settings.** Activate this check box to display customized values for when no data is available.
   * **Default Value.** Enter the message you would like to display when no data is available. The maximum length is 8 characters.
   * **Background color.** Select a default background color to display when no data is available. The default is gray.

1. Click **Save** to save changes.  

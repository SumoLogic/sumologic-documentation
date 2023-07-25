---
id: boolean-single-value-charts
---

# Boolean Single Value Charts

A Boolean Single Value chart displays a value as true or false, such as when a system is up or down.

To create a Boolean Single Value chart, use a query such as:

```sql
* | count as MyCount | if (MyCoun\>100,true,false) as MyCount
```

which would produce results like:

![True.png](/img/dashboards/True.png)

## Create a Boolean Single Value chart

1.  Run a Boolean query.
2.  In the **Aggregate** tab, choose the **Single Value** icon.
   
    ![Charts - single value viewer](/img/dashboards/charts_single_value_viewer.png)
    
    This displays the result graphically.
    
    ![Boolean-Single-Value-Chart](/img/dashboards/Boolean-Single-Value-Chart.png)

3.  (Optional) **Click Add to Dashboard** if you'd like to save the chart as a Panel.

## Modify a Boolean Single Value chart

### Change Properties

1. On the **Search** page, on the **Aggregates** tab, select the **Settings** icon.

    ![Change Properties](/img/dashboards/Change-Properties.png)

1. Select **Change Properties**.

    ![ChangeProperties.png](/img/dashboards/ChangeProperties.png)

1. **When Data is Available.** When data is available for this query, the chart will use these properties:

   * **Color.** Override the default color of text to a new color. 
   * **Display color on the background.** Activate this check box to use the selected color as a background. The text will be black or white depending on the color value.

1. **Boolean Value.** Select colors for the true and false values. Defaults are green for true and red for false.
1. **When Data is not Available.** When no data is available for this query, all **When Data is Available** options are ignored. But if the settings below are not configured, the chart will display no information

   * **Use the following settings.** Activate this check box to display customized values for when no data is available.
   * **Default Value.** Enter the message you would like to display when no data is available. The maximum length is 8 characters.
   * **Background color.** Select a default background color to display when no data is available. The default is gray.

1. Click **Save** to save changes.

### Manage Labels

1. In the **Aggregates** tab, select the **Settings** icon. Choose **Manage** **Labels**. This option allows you to enable a **Title** and a **Description**, including the text displayed and the color of the text. Click **Save** to save changes.

    ![ManageLabels.png](/img/dashboards/ManageLabels.png)

1. **Edit Settings JSON.** Allows you to directly edit the JSON code to change the appearance of the Single Value chart. Click **Save** to save changes. 

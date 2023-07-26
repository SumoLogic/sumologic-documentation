---
id: export-search-results
title: Export Search Results
description: Up to 100,000 rows can be exported as a CSV (comma-separated values) text file.
---

After your search query completes, you can download up to 100,000 rows of results from your browser as a CSV (comma-separated values) text file.

:::note
To export search results, you must have a [role](/docs/manage/users-roles) that grants you the Download Search Results capability.
:::

If your organization has a Sumo Logic Enterprise account, and you'd like to export more than 100,000 rows, you can use the Search Job API to query Sumo Logic, then page through and output the results to a file of your choice. Learn more about the [Search Job API](/docs/api/search-job).

## Export grouped (aggregate) results

From the table view of a completed query, click the **Export Results** icon in the **Aggregates** tab.  

![export aggregates](/img/search/get-started-search/search-basics/export-search-results/exportaggregate.png)

If the export is successful, your browser will automatically download the data and save it to a CSV file.

## Export messages

You can export message fields to a CSV file, either just the fields displayed, or all fields, including hidden fields.

![display-hidden-fields.png](/img/search/get-started-search/search-basics/export-search-results/display-hidden-fields.png)

Click the gears icon in the top-right corner of the **Messages** tab, and then select **Export** **(Display Fields)** to export only the messages displayed, or **Export (All Fields)** to export all message fields. If the export is successful, your browser will automatically download the data and save it to a CSV file.  

![export fields](/img/search/get-started-search/search-basics/export-search-results/export-fields.png)

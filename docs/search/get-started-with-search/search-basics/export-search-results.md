---
id: export-search-results
title: Export Search Results
description: Up to 100,000 rows can be exported as a CSV (comma-separated values) text file.
---

After your search query completes, you can download up to 100,000 rows of results from your browser as a CSV (comma-separated values) text file. If your results are more than 100,000 rows, then run multiple searches with a shorter time range and export the respective search results.

:::note
To export search results, you must have a [role](/docs/manage/users-roles) that grants you the Download Search Results capability.
:::

## Export grouped (aggregate) results

From the table view of a completed query, click the **Export Results** icon in the **Aggregates** tab.  

![export aggregates](/img/search/get-started-search/search-basics/export-search-results/exportaggregate.png)

If the export is successful, your browser will automatically download the data and save it to a CSV file.

## Export messages

You can export message fields to a CSV file, either just the fields displayed, or all fields, including hidden fields.

![display-hidden-fields.png](/img/search/get-started-search/search-basics/export-search-results/display-hidden-fields.png)

Click the gears icon in the top-right corner of the **Messages** tab, and then select **Export** **(Display Fields)** to export only the messages displayed, or **Export (All Fields)** to export all message fields. If the export is successful, your browser will automatically download the data and save it to a CSV file.  

![export fields](/img/search/get-started-search/search-basics/export-search-results/export-fields.png)

:::info
Audit events will be generated for every search results export (displayed fields or all fields). Administrators can use `_sourceCategory=content` with `eventName:"SearchExported"` to view these [audit events](/docs/manage/security/audit-indexes/audit-event-index/) to ensure that no sensitive data is exported.

<details>
  <summary>Sample log message</summary>
  ```json
    {
       "userIdentity":{
          "userId":"00000000001***1",
          "userEmail":"***.****@sumologic.com"
       },
       "searchExportIdentity":{
          "exportId":"67C19***5BB4D96"
       },
       "sessionId":"0FF9*****B09F",
       "searchQuery":"_sourcecategory \**00 \"kubernetes/system\" \"error\"\n| where _pid \u003* \"****\"",
       "exportedCount":11,
       "location":"service UI raw",
       "status":"SUCCESS",
       "eventType":"Audit",
       "severityLevel":"Info",
       "accountId":"00000000005****7",
       "eventId":"da6a5a2b-****-****-b01c-b63dba93fa66",
       "eventName":"SearchExported",
       "eventTime":"2025-03-24T15:49:27.664Z",
       "eventFormatVersion":"1.0 beta",
       "subsystem":"content"
    }
  ```
</details>
:::

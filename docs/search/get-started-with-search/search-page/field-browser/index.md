---
slug: /search/get-started-with-search/search-page/field-browser
title: Field Browser
description: The Field Browser allows you to display or hide selected fields without having to parse them.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Field Browser appears on the left side of the **Messages** tab of the Search page for both aggregate and non-aggregate queries. The Field Browser allows you to zero in on just the fields of interest in a search by displaying or hiding selected fields without having to parse them. You can focus on the fields you’re interested in, avoiding the “noise” of fields you don’t want to see.

For non-aggregate queries, the Field Browser is useful for narrowing results on searches, or when you're not sure which fields are in a log type, in a Partition, or in a Scheduled View. You can run a search with a larger scope and then refine the list of displayed fields to find the data you're looking for.

## How the Field Browser works

The Field Browser displays the number of values for each field returned in a search. It works in real time, so you can fine tune the fields you want to view or hide. After setting the fields to display, save your preferences so that the correct fields are always displayed in your searches. The preferences are saved just for your user account and don’t change the way data is displayed in other user accounts.

In addition to the fields found in your logs, the Field Browser shows **Time**, **Receipt Time**, and **Message** (for raw log messages). No [drill-down searches](search-from-field-browser.md) can be run on these fields because they do not contain number or string data that can be searched on.

- **Messages** represents the collapsed version of the log message with each row showing up to 10 lines. 
- **Message time** represents the time of your log events. This is parsed from your logs by the Collector. When adding a Source to a Collector, most users choose to automatically detect timestamps in their logs and parse them by selecting Extract timestamp information from log file entries in the Source configuration settings.
- **Receipt time** is the timestamp the log message was received by the Collector. See [Use Receipt Time](/docs/search/get-started-with-search/build-search/use-receipt-time/) for details.
  :::info
  The **Receipt Time** field will only be displayed in the field browser when it is included as field in the query or when the **Use the Receipt Time** option for time interval type is toggled on.
  :::
- **Searchable Time** refers to the additional processing time required to make logs available for searching after they are received by the Sumo Logic system. This processing includes enrichment, indexing, and storage, all of which contribute to the overall Searchable Time.
  :::note
  The **Searchable Time** field will only be displayed in the field browser.
  :::
  
<img src={useBaseUrl('/img/search/get-started-search/search-page/FB-Field-Browser-Display-Fields.png')} style={{border:'1px solid gray'}} alt="FB_Field-Browser_Display-Fields" width="300"/>

- A. Search for fields by entering text in this field.
- B. List of Fields shown in the Messages tab.
- C. Indicates a Timestamp field.
- D. List of Fields that are hidden from view.
- E. Indicates the field contains a text string.
- F. Indicates the field contains numerical data.
- G. Click to save the settings for this search.
- H. Displays the count of a field. Available for non-aggregate queries only. 
      :::note
      Tilde (`~`) in front of a count value indicates that the value is approximate. If the number of parsed messages is less than or equal to 2500, an exact value is shown in the Field Browser. If the number of parsed messages exceeds 2500, an approximation is shown.
      :::

## Search for fields

You can search for fields in the Field Browser, a feature that is especially useful when you have hundreds of fields parsed from messages. As you enter a text string in the Search field, results dynamically appear in the list below. The following guidelines apply:

* Search is case sensitive
* Search criteria is shown for Display Fields and Hidden Fields
* Search results will highlight matching characters

In our example, we entered **ka** in the Search field and instantly received the following results.

![FB_Field-Browser_Search.png](/img/search/get-started-search/search-page/FB-Field-Browser-Search.png)

## Nested field groupings

Nested fields, such as those seen in JSON and KV, are grouped together based on their innate structure that is easy to traverse. We have used a JSON nested structure in the following example.

![FB_Nested-JSON-objects.png](/img/search/get-started-search/search-page/FB-Nested-JSON-objects.png)

## Limitations

The Field Browser is limited for aggregate queries in the following ways:

* [Drill-down searches](search-from-field-browser.md) are not available for aggregate queries.
* Field counts (item G above) are not displayed for aggregate queries. 
* Field counts—If messages returned are less than or equal to 2500 messages, then an exact calculation is shown. If more than 2500 messages are returned, an approximation is shown.
* The **Approximate Count** displays the count of the field values for the field. This does not display complete field values count for that field but it's just to calculate average, minimum, maximum, and standard deviation values from the first 100,000 raw messages. The field values will be skipped if the 100,000 raw messages limit is exceeded.

## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/field-browser/search-from-field-browser"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Search from the Field Browser</h4></a>
  <p>Drilling down into a field from the Field Browser is seamless for non-aggregate queries.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/field-browser/show-hide-fields-in-field-browser"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Show and Hide Fields in the Field Browser</h4></a>
  <p>Change the fields that are displayed in search results by showing or hiding in the Field Browser.</p>
  </div>
</div>
</div>

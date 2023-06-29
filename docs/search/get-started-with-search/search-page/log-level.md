---
id: log-level
title: Log Level Detection and Insights
description: You can highlight a time range in the histogram for your search results to filter the search results based on that time range.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When performing **Log Search** queries, you can visualize and filter log-level distribution in your **Histogram** results and **Messages** table view, helping you to:

* Quickly identify anomalies
* Drill down quickly into high severity logs
* Navigate through a large volume of logs
* Filter the relevant logs in their troubleshooting workflows

<details><summary>What are log levels?</summary>

Sumo Logic detects six log levels out of the box: FATAL, ERROR, WARN, INFO, DEBUG, and TRACE. If we're unable to find one of these log levels in a message, it is categorized under the OTHERS bucket.

</details>

Log-Level pattern detection is automatic, meaning you do not need to parse log levels manually or write specific queries to see your distribution of error logs. Just execute a log search, and you'll see:

<img src={useBaseUrl('img/search/get-started-search/search-page/log-level-legend.png')} alt="log-level-legend" />

| Element | Description
| :-- | :--
| A | Histogram with stacked bars representing log level distribution over your search timeframe.
| B | Interactive Histogram legend showing the log level that each color represents. Click on any label to isolate it in the Histogram and corresponding messages beneath that. To select multiple log levels, use **shift + click**.<details><summary>In this example, the **ERROR** label has been clicked, so you'll see only error logs reflected.</summary><img src={useBaseUrl('img/search/get-started-search/search-page/log-level-error-filter.png')} alt="log-level-error-filter.png" /></details>
| C | [Field Browser](/docs/search/get-started-with-search/search-page/field-browser) **_loglevel** filter. You can use this reserved field in your queries to perform advanced operations. <sup>1</sup>
| D | Log level for this log message. Quickly identify the log level of each log message using the color-coded Histogram legend for each message.
| E | Distribution of log levels under **_loglevel** field in the field browser.
| F | **Hide Log Levels**. Click this to hide log levels from the Histogram chart, however, the **_loglevel** field will still show in the Messages table, however, log level color coding from individual messages will be removed. To enable it again, just click **Show Log Levels**.

<sup>1</sup> The <strong>_loglevel</strong> field value for log messages with the log level <code>""</code> in the Histogram is <code>null</code>. To query these messages, you can run:

```sql
| where isNull(_loglevel)
```

The log level of a log line is stored under the `_loglevel` field. You can override its value using a [field extraction rule (FER)](/docs/manage/field-extractions/create-field-extraction-rule/). For example:

<img src={useBaseUrl('img/search/get-started-search/search-page/add-field-extraction-rule.png')} alt="Add field extraction rule" width="400"/>

---
id: log-message-inspector
title: Log Message Inspector
sidebar: Log Message Inspector
description: Learn about the Log Message Inspector dock where you can view information for all the parameter values associated with the query.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

By default, when performing non-aggregate Log Search queries, the results are displayed in the **Time** and **Messages** column. You can further drill down the results using [Show and Hide Fields in the Field Browser](/docs/search/get-started-with-search/search-page/field-browser/show-hide-fields-in-field-browser).

If you want to view the results with all the parameter field values, you can select all the parameter fields in the **Hidden Fields** tab, which makes the results page clustered. You can overcome this by using the **Log Message Inspector** option. **Log Message Inspector** dock will display an **INFO/ERROR** to quickly identify the type of each log message using the color-code, raw log message, message time, receipt time, and the parameter values associated with the query. 

<img src={useBaseUrl('img/search/get-started-search/search-page/log-message-inspector.png')} width="500" style={{border: '1px solid gray'}} alt="log-message-inspector" />

| Letter | Purpose |
|:--|:--|
| A | Click on the **Shareable Message URL** button to copy and share your message as a URL. |
| B | Click on the **Previous Log message** button to view the Log Message Inspector of the previous message. |
| C | Click on the **Forward Log message** button to view the Log Message Inspector of the next message. |
| D | Search for the field/parameter of your choice to view the value associated with the filed.|

## Viewing the Log Message Inspector

Follow the below steps to open the **Log Message Inspector** dock and view the results of your query with all the parameter values.

1. Enter your query in the search text box.
1. In the results page, go to **Messages** tab.
1. Navigate to the row of your choice.
1. There are two ways to access the Log Message Inspector dock.
    - Right-click on the row to open the menu and select the **Open Log Message Inspector** option. Or, <br/><img src={useBaseUrl('img/search/get-started-search/search-page/log-message-inspector-approach-1.png')} width="800" style={{border: '1px solid gray'}} alt="log-message-inspector-approach-1" />
    - Click the **Open Log Message Inspector** icon in the custom action bar. <br/><img src={useBaseUrl('img/search/get-started-search/search-page/log-message-inspector-approach-2.png')} width="800" style={{border: '1px solid gray'}} alt="log-message-inspector-approach-2" />

## Filtering the query through Log Message Inspector

While viewing parameter values, you can add any parameter of your choice to the query by clicking on the kebab menu and selecting the **Filter selected value** option against the field. This narrows down your query to the same tab and avoids opening a new search page, which occurs when you filter the query using the field browser.<br/><img src={useBaseUrl('img/search/get-started-search/search-page/filter-selected-value.png')} width="400" style={{border: '1px solid gray'}} alt="filter-selected-value" />
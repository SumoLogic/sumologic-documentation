---
id: view-search-results-json-logs
title: View Search Results for JSON Logs
description: If your search results contain JSON logs, you can expand or collapse the view on the Messages tab to show or hide the JSON format and structure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

If your search returns fields that are valid JSON objects, you can expand or collapse the view on the **Messages** tab to show or hide the JSON substructure, or present the messages as formatted JSON code.

## Expand or collapse JSON messages

By default, the collapsed version of JSON messages is shown. You can see the top level JSON attributes, and only the attributes below the top that are objects rather than simple values. <br/><img src={useBaseUrl('img/search/get-started-search/search-basics/view-search-results-json-logs/expand-collapse.png')} alt="expand-collapse.png"/>

Click **Expand/Collapse** on the upper right side of the **Messages** table to see expand options:
* **Expand all Rows.** Rows that show truncated messages are expanded to show complete messages.
* **Expand all Rows and JSON.** Rows that show truncated messages are expanded to show complete messages, and nested JSON messages are expanded, as shown below. <br/><img src={useBaseUrl('img/search/get-started-search/search-basics/view-search-results-json-logs/expanded-json-message.png')} alt="expanded-json-message"/>

After you’ve expanded either all rows, or all rows and JSON objects, the **Expand/Collapse JSON** has options for resetting your view.

You can also expand and collapse the JSON objects in a particular message using options on a context menu. Depending on whether JSON is currently expanded or collapsed, you’ll see either a **Collapse Nested JSON** or an **Expand Nested JSON** option.

<img src={useBaseUrl('img/search/get-started-search/search-basics/view-search-results-json-logs/context-menu.png')} alt="context menu"/>

## Copy message content
Right-click an individual message to see the following option:

* **Copy selected text**.
* **Copy entire string as JSON**. Copies the message to the clipboard in JSON format. This function is not available on Safari due to a
    browser limitation.

## Reference parsed JSON fields

The [field browser](/docs/search/get-started-with-search/search-page/field-browser) and search results [messages table](/docs/search/get-started-with-search/search-page) have a few helpful features. 

Field Browser:

* A search input field allows you to search for fields by name.  

    ![field browser search field](/img/search/get-started-search/build-search/dynamic-parsing/field-browser-search-field.png)

* JSON structures are nested with expand and collapse options.  

    ![Field browser expand collapse JSON](/img/search/get-started-search/build-search/dynamic-parsing/field-browser-expand-collapse-JSON.png)

* A copy button is available to the right of each field allowing you to easily copy a field name.  

    ![field browser copy field](/img/search/get-started-search/build-search/dynamic-parsing/field-browser-copy-field.png)

Search results table:

* You can copy field names from JSON structures. After selecting (click and highlight) a JSON key in your results, right click and select **Copy field name**. See [modifying a search from the messages tab]/modify-search-from-messages-tab) for details on the other provided options.  

    ![JSON right click copy options.png](/img/search/get-started-search/build-search/dynamic-parsing/JSON-right-click-copy-options.png)  

    Copying a field name using this option will automatically format [field names that have special characters](/docs/search/get-started-with-search/search-basics/reference-field-special-characters). For example, the field name shown in the screenshot is **total time-series**, it would be automatically formatted to **%"total time-series"** to work properly in a search query.  
     
* A copy button is available to the right of each column (field) name allowing you to easily copy a field name.  

    ![copy button messages table](/img/search/get-started-search/build-search/dynamic-parsing/copy-button-messages-table.png)

## Format JSON messages in search results 

If the messages in your search results can be formatted as JSON, the **Messages** tab presents the option to display each message in JSON or raw format. Click the link to toggle between the JSON and raw view. 

The view of JSON formatting is limited to JSON files less than 10 KB in size.

![View as JSON](/img/search/get-started-search/search-basics/view-search-results-json-logs/view-json.png)

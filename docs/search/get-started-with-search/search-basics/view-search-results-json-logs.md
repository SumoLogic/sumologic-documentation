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
* ** Expand all Rows and JSON.** Rows that show truncated messages are expanded to show complete messages, and nested JSON messages are expanded, as shown below. <br/><img src={useBaseUrl('img/search/get-started-search/search-basics/view-search-results-json-logs/expanded-json-message.png')} alt="expanded-json-message"/>

After you’ve expanded either all rows, or all rows and JSON objects, the **Expand/Collapse JSON** has options for resetting your view.

You can also expand and collapse the JSON objects in a particular message using options on a context menu. Depending on whether JSON is currently expanded or collapsed, you’ll see either a **Collapse Nested JSON** or an **Expand Nested JSON** option.

<img src={useBaseUrl('img/search/get-started-search/search-basics/view-search-results-json-logs/context-menu.png')} alt="context menu"/>

## Copy message content
Right-click an individual message to see the following option:

* **Copy selected text**.
* **Copy entire string as JSON**. Copies the message to the clipboard
    in JSON format. This function is not available on Safari due to a
    browser limitation.

{@import ../../../reuse/reference-parsed-json-fields.md}

## Format JSON messages in search results 

If the messages in your search results can be formatted as JSON, the **Messages** tab presents the option to display each message in JSON or raw format. Click the link to toggle between the JSON and raw view. 

The view of JSON formatting is limited to JSON files less than 10 KB in size.

![View as JSON](/img/search/get-started-search/search-basics/view-search-results-json-logs/view-json.png)

---
id: view-search-results-json-logs
---

# View Search Results for JSON Logs

If your search returns fields that are valid JSON objects, you can expand or collapse the view on the **Messages** tab to show or hide the JSON substructure, or present the messages as formatted JSON code.

## Expand or collapse JSON messages

By default, the collapsed version of JSON messages is shown. You can see the top level JSON attributes, and only the attributes below the top that are objects rather than simple values are hidden.

![Expand JSON](/img/search/get-started-search/search-basics/view-search-results-json-logs/expand-json.png)

Click **Expand JSON** on the upper right side of the Messages table to open the structure. You can see the full contents and structure of the log messages.

![Collapse JSON](/img/search/get-started-search/search-basics/view-search-results-json-logs/collapse-json.png)

Click **Collapse JSON** to see the initial collapsed view.

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

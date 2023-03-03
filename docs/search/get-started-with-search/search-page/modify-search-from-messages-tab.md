---
id: modify-search-from-messages-tab
title: Modify a Search from the results table
description: After running a search, you can modify subsequent searches by selecting text displayed in the Messages tab.
---

When you run a search your results are provided in a **Messages** tab. If the search conducted an aggregation you'll also get an **Aggregates** tab. The options to modify your search will differ depending on the tab you're viewing.

## Messages tab

After running a search, you can make these changes in the **Messages** tab:

* [Add to your search](#add-to-your-search)
* [Parse a field from message text](#parse-a-field-from-message-text)
* [Format JSON messages in search results](../search-basics/view-search-results-json-logs.md)

### Add to your search

After you select text and right click, you'll see a menu pop up with the following options:

| Option | Added to Search |
|:--|:--|
| Copy Selected Text | Copies the text to your computer clipboard. |
| Parse selected text/key | `[search] parse [selected text] as [fieldName]` |
| Add selected text as AND | `[search] AND [selected text]` |
| Add selected text as AND NOT | `[search] AND ! [selected text]` |
| Add selected text as OR | `[search] OR [selected text]` |
| Add selected text as OR NOT | `[search] OR ! [selected text]` |

After the option is added to your existing search, click **Start** (or press Enter/Return) to run the appended search.

### Parse a field from message text

If you come across text that you'd like to [parse as a field](../../search-query-language/parse-operators/parse-field-option.md), you can select that text and name the field from the **Messages** tab.

To parse a field from message text:

1. In the search results, select the text or string you'd like to parse, right click, and click **Parse selected text**.<br/>  ![parse selected text](/img/search/get-started-search/search-page/parse-selected-text.png)    
1. In the **Parse Text** dialog box, select any text that you don't want to include in the parsed field. Then click **Extract this value**. For example, to parse just the client URL, select the unique client URL, then select **Click to extract this value.**<br/>  ![extract value](/img/search/get-started-search/search-page/extract-value.png)      
1. Type a name for the **Field**. This name appears at the top of the parsed column. Field names can contain alphanumeric characters and underscores (`_`). The name must start and end with an alphabet character. Then click **Submit**.<br/>![parse text](/img/search/get-started-search/search-page/parse-text.png)
  :::note
  If you don't enter a field name, you'll see an error in the **Search** tab.
  :::
1. In the **Search** tab, click **Start** to being the search.

## Aggregates tab

After running an [aggregate](/docs/search/search-query-language/group-aggregate-operators) search, you can copy values and select from  several options to add more operations to your query based on the results in the **Aggregates **tab.

After you select text and right click, you'll see a menu pop up with the following options:

| Option | Added to Search |
|:--|:--|
| Copy Selected Text | Copies the text to your computer clipboard. |
| Add selected text as AND | `[search] AND [selected text]` |
| Add selected text as AND NOT | `[search] AND ! [selected text]` |
| Add selected text as OR | `[search] OR [selected text]` |
| Add selected text as OR NOT  | `[search] OR ! [selected text]` |

After the option is added to your existing search, click **Start** (or press Enter/Return) to run the appended search.

---
id: navigate-through-search-results
---

# Navigate through Search Results

When you run a search your results are provided in a **Messages** tab. If the search conducted an aggregation you'll also get an **Aggregates** tab.

![Messages and Aggregates tab.png](/img/search/get-started-search/search-page/messages-aggregates-tab.png)

The **Signatures** tab is shown when using [LogReduce](/docs/search/logreduce).

![Signatures tab.png](/img/search/get-started-search/search-page/signatures-tab.png)

## Column adjustments

The table columns can be modified by the following:

* **Move:** Hold click and drag a column from the header row to a different location in the table.
* Hold click and drag the vertical line in between the columns to adjust the width.

    ![resize column.png](/img/search/get-started-search/search-page/resize-column.png)

* Double click the vertical line to the right of a column name to automatically resize the width to fit the content.

The **Aggregates** tab allows you to pin columns in the table. When a column is pinned you can scroll to the right and still view it.

* **Pin**: Hold click and drag a column from the header row to the far left of the table. You'll see a small pin icon when in the correct area to unclick.

    ![pin aggregated column.gif](/img/search/get-started-search/search-page/pin-aggregated-column.gif)

## Expand and collapse

By default, the **Messages** tab shows the collapsed version of messages, where the row has a height limit of 500 pixels. Click **Expand All** on the upper right side of the **Messages** table to view the full contents of all your log messages.

![expand message option.png](/img/search/get-started-search/search-page/expand-message-option.png)

If expanded, the option changes to **Collapse All**. Click it to switch back the initial collapsed view.

## Copy message

The **Messages** tab allows you to right-click a table cell to copy the raw message to your clipboard.

![copy message option.png](/img/search/get-started-search/search-page/copy-message-option.png)

## Keyboard accessibility

Click anywhere on the table in the **Messages** or **Aggregates** tab and you can use the up and down keyboard keys to navigate your results.

## Pages

If you have many pages of results, you have several options for navigation:

* Scroll down to see more results. The header is static. 
* Type a page number into the page number field and hit enter.
* For the **Messages** tab only, click into a block in the histogram to jump to the page containing the first message from that block. In the default sort order, the message is the most recent message from the block. In a reverse sort order, clicking into the histogram takes you to the page containing the oldest message from that block.

![navigate pages](/img/search/get-started-search/search-page/navigate-pages.png)

In this example, the largest number of events occurred between 1:56 and 1:57 am. Clicking into the tallest histogram block takes us to the page where logs related to the event can be viewed. This is the page that contains the most recent message from this message block. The note in pink shows the range in time that corresponds to the page you're viewing.

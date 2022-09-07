---
id: save-search
title: Save a Search
description: Whether you are running ad hoc searches during a forensic investigation or running standard searches for health checks, you can save any search to run later.
---


Whether you are running ad hoc searches during a forensic investigation or running standard searches for health checks, you can save any search to run again later.

When you create a search that you'd like to reuse, you can save it to the [Library](/docs/get-started/library/sumo-logic-library). From there you can run it again, share with others, edit the search, or create a [Scheduled Search](../../../alerts/scheduled-searches/schedule-search.md) to run at a regularly scheduled time, and set up [alerts](/docs/alerts). 

The saved search will also include any charts you have created in the **Aggregates** tab. 

**To save a search:**

1. Run a search you'd like to save.
1. (Optional) After the search results are complete, in the **Aggregates** tab, select a chart type to display the data visually. 
1. Click the save icon on the top right of the search page,

    ![save icon](/img/search/get-started-search/search-basics/save-search-icon.png)

    or click the three-dot icon and select **Save As**.  

    ![save as ](/img/search/get-started-search/search-basics/save-as-button.png)

    The **Save** option is for searches that have already been saved to your Library. **Save** allows you to quickly update the existing saved search. The **Save as** option is for a new saved search and requires you to provide it a name. A saved search will provide a shortcut for both options:

    ![save as option](/img/search/get-started-search/search-basics/save-as-option.png)

1. In the **Save Item** dialog appears.  

    ![save search.png](/img/search/get-started-search/search-basics/save-search.png)

   * **Name.** Enter a name for your saved search.
   * **Description**. (Optional). Enter a description for the search. 
   * **Query**. You can edit your query if desired.
   * Choose a **Time Range** that will be the default range when you run the saved search.
   * **Search By**. Select if you want to save the search using message or receipt time. For more information, see [Use Receipt Time](../build-search/use-receipt-time.md).
   * **Search Mode**. Select Manual or Auto Parse Mode. For more information, see [Dynamic Parsing](../build-search/dynamic-parsing.md).
   * **Location to save to.** Select a folder location for the saved search.

1. Click **Save** to save the search without scheduling.  If you want to schedule the search and optionally configure an alert, click **Schedule this search** and follow the instructions on [Schedule a Search](../../../alerts/scheduled-searches/schedule-search.md). 

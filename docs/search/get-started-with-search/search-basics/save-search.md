---
id: save-search
title: Save a Search
description: Whether you are running ad hoc searches during a forensic investigation or running standard searches for health checks, you can save any search to run later.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Whether you are running ad hoc searches during a forensic investigation or running standard searches for health checks, you can save any search to run again later.

When you create a search that you'd like to reuse, you can save it to the [Library](/docs/get-started/library). From there you can run it again, share with others, edit the search, or create a [Scheduled Search](../../../alerts/scheduled-searches/schedule-search.md) to run at a regularly scheduled time, and set up [alerts](/docs/alerts). 

The saved search will also include any charts you have created in the **Aggregates** tab. 

**To save a search:**

1. Run a search you'd like to save.
1. (Optional) After the search results are complete, in the **Aggregates** tab, select a chart type to display the data visually. 
1. Save the search using one of these methods:
    * Click the save icon on the top right of the search page. <br/><img src={useBaseUrl('img/search/get-started-search/search-basics/save-search-icon.png')} alt="save icon" width="350"/>
    * Click the three-dot icon and select **Save As**. <br/><img src={useBaseUrl('img/search/get-started-search/search-basics/save-as-button.png')} alt="save as" width="290"/>
1. The **Save Item** dialog appears. <br/><img src={useBaseUrl('img/search/get-started-search/search-basics/save-search.png')} alt="save search" width="670"/>
1. **Name.** Enter a name for your saved search.
1. **Description**. (Optional). Enter a description for the search. 
1. **Query**. You can edit your query if desired.
1. **Time Range**. Choose a time range that will be the default range when you run the saved search.
1.  **Search By**. Select whether you want to save the search using message or receipt time. For more information, see [Use Receipt Time](../build-search/use-receipt-time.md).
1. **Search Mode**. Select Manual or Auto Parse Mode. For more information, see [Dynamic Parsing](../build-search/dynamic-parsing.md).
1. **Location to save to.** Select a folder location for the saved search.
1. Click **Save** to save the search without scheduling.  If you want to schedule the search and optionally configure an alert, click **Schedule this search** and follow the instructions on [Schedule a Search](../../../alerts/scheduled-searches/schedule-search.md). 

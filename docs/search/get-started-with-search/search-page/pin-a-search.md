---
id: pin-a-search
title: Pin a Search
description: You can pin a search so that it runs in the background independent of the browser session.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The *pinned search* feature allows you to start a search, then "pin" it, so it will continue running in the background independent of the browser session. Then, you can close the **Search** page or log out and find your results later. To see your pinned searches:
* [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Logs > Pinned searches**.
* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Recent > Pinned Searches**.

Once pinned, a search will run in the background for up to 24 hours. If it has not finished by then, it will be paused. There is no notification when your search is paused, but you can just restart the search to continue the query. Search results are available for three days. Once a search is pinned, you can easily unpin it, or remove it from the **Pinned searches** list.

Limitations:
* There is a limit of ten pinned searches per user. 
* Queries that use the [save operator](/docs/search/search-query-language/search-operators/save) cannot be pinned.
* There is a known issue that may cause pinned searches to be lost when Sumo Logic performs an upgrade. For information on scheduled maintenance for your deployment, see [Sumo Logic status](http://status.sumologic.com). 

#### Pin and unpin a search

1. Enter a query in the search box and click **Start Search**.
1. Click the three-dot kebab icon and click **Pin** from the provided options. <br/> <img src={useBaseUrl('img/get-started/library/pin-search-option.png')} alt="Pin menu option" style={{border: '1px solid gray'}} width="250"/>
1. A message displays that tells you where you can find the pinned search later. The pinned search is named by default with the name of the search. <br/><img src={useBaseUrl('img/get-started/library/pinmessage.png')} alt="Pinned search message" style={{border: '1px solid gray'}} width="400" />
1. To change the name of the pinned search, double-click the **Search** tab to activate the name field and enter a new name.
1. To preserve the pinned search, follow the steps in [Save a pinned search](#save-a-pinned-search).
1. To unpin the search, click **Unpin** in the menu bar. The search is removed from the **Pinned searches** list. (Removing an instance of a saved search from the **Pinned searches** list does not delete the saved search from your **Personal** folder.)<br/><img src={useBaseUrl('img/get-started/library/unpin-search-option.png')} alt="Unpin menu option" style={{border: '1px solid gray'}} width="200"/>

#### Save a pinned search

When you save a pinned search, it appears in your **Pinned searches** list.

1. Click the name of the search to open it in the **Search** tab.
1. In the **Search** tab, click the three-vertical dot icon and click **Save As** from the provided options. The **Save Item** dialog appears.
1. Enter a unique **Name** in the text field. In our example below, we entered "Invoke Frequency".
1. Optionally, enter a **Description**.
1. Click **Save**. <br/><img src={useBaseUrl('img/get-started/library/Save_As_Search_dialog.png')} alt="Save a search" style={{border: '1px solid gray'}} width="400" />

The search is saved to your **Personal** folder.

#### Manage pinned searches

To open a previously pinned search:

1. In the **Pinned searches** list, click the name of the search.
1. The search query and any existing results are displayed in the **Search** tab.
1. To run a new instance of the search, change the time range expression and click **Start Search**.

To rename a pinned search:

1. In the **Pinned searches** list, click the name of the search.
1. The search query and any existing results are displayed in the **Search** tab.
1. Double-click the **Search** tab to reactivate the name field.
1. Enter a new name and press **Enter**.

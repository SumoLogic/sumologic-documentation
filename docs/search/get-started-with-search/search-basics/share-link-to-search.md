---
id: share-link-to-search
title: Share a Link to a Search
description: Share a link to search query results. Copy and paste the a link to share a search via email or IM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::important
Search results might vary depending on each user's permissions.
:::

You can easily share the results of a search query with others, based on their permissions. This shared link includes the search results along with any charts created in the Aggregates tab, making it easier to present and collaborate on insights.

:::info
The generated link remains accessible for up to three years from the time it is created.
:::

To share a link to a search:

1. Run a search you want to share.
1. (Optional) After the search results are complete, in the **Aggregates** tab, select a chart type to visualize the data. 
1. Click the share icon <img src={useBaseUrl('img/search/get-started-search/search-basics/share-search-icon.png')} alt="share icon" width="25"/> on the top right of the search page or click the three-dot kebab icon and click **Share...**.<br/><img src={useBaseUrl('img/search/get-started-search/search-basics/share-from-menu.png')} alt="icon" width="250"/>  
1. The **Share Search** dialog appears differently depending on whether the search has been saved. Choose the appropriate option below:
    - **If the search is not saved**. The **Share Search** dialog appears with options to share with users and roles in your org. This will include the current state of the **Aggregates** tab. If you’ve configured a chart, it will be visible to recipients based on their permissions. Any updates to the chart generate a new link.<br/><img src={useBaseUrl('img/search/get-started-search/search-basics/share-unsaved-search-popup.png')} alt="Share unsaved search popup" style={{border: '1px solid gray'}} width="500" />
        * **Shareable Search URL**. Copy the top link to share your search as a URL. Users with access can open it in a browser to run the search. If they are not logged in to Sumo Logic, they will be prompted to sign in.
        * **Paste code in the search query box**. If the recipient is already logged in, copy and provide them the bottom code. This code can be pasted into the search query box in a new Search tab to run the query. A new code is generated whenever the chart is updated. <br/> After pasting the code, you can optionally click Resolve code to expand it into the full query. This allows you to review the query and time range as configured by the creator, helping you verify the setup and avoid running potentially harmful or expensive queries.<br/><img src={useBaseUrl('img/search/get-started-search/search-basics/resolve-code.png')} alt="Resolve code button" style={{border: '1px solid gray'}} width="800" />
    - **If the search is saved**. The **Share Search** dialog provides additional sharing and access management options.<br/><img src={useBaseUrl('img/search/get-started-search/search-basics/share-saved-search.png')} alt="Share saved search" style={{border: '1px solid gray'}} width="800" />
        * **Share with specific users and roles**. Select users or roles by clicking in the **Users and Roles** field and choosing from the dropdown list. Optionally, to send an email to the recipients of the shared search, toggle **Notify recipients by email** to ON, and enter a note in the text field.
        * **See who has access**. View the list of users and roles who already have access to the shared search.
        * **Shareable URL**. Use the generated URL to share the search. You can choose to include filters, time range, and other settings when sharing.
        :::info
        For more information about sharing a saved search from the library, refer to [Managing Your Sumo Logic Library](/docs/get-started/library/#share-a-saved-search-from-the-library).
        :::




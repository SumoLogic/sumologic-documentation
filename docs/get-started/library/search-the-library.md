---
id: search-the-library
---

# Search the Library

To find Sumo Logic content you have saved in the Library, you can search the **Personal** and **Org** folders using the search field.

You can search on the:

* Content name
* Content description

In the Library search field, you can use keywords and wildcards (\*), though leading wildcard searches (\*ab) are not supported. You can add one or more keywords. With multiple keywords, the default assumed operator is AND, not OR.

You can also search for Content types in the **Personal** folder using
the following prefixes:

* **type:search** - Finds all searches.
* **type:search keyword** - Lists all the searches that match the keyword.
* **type:search is:scheduled** - Finds all scheduled searches that you own.
* **type:search is:scheduled keyword** - Finds all scheduled searches that you own, which match the keyword.
* **is:scheduled** - Finds all scheduled searches that you own.
* **is:scheduled keyword** - Lists all scheduled searches that you own, which match the keyword.  
* **type:folder** - Finds all folders.
* **type:folder keyword** - Lists all folders that match the keyword.
* **type:dashboard** - Finds all Dashboards.
* **type:dashboard keyword** - Lists all Dashboards that match the keyword.

## Limitations:

* Library Search is only supported in the **Personal** and **Org** folders.
* Content type search is only supported in the **Personal** folder. 
* Leading wildcards (\*ab) are not supported.
* For multiple keywords, the assumed operator is AND, not OR.

## Search content in the Library

1. In Sumo Logic, go to the **Library**.
1. Select the **Personal** or **Org** tab.
1. In the search field at the top of the right-hand panel, enter your text. You can use any of the following: 

    * Keyword 
    * Wildcard (\*)
    * **Personal tab only:** Content type prefix (with one or more keywords, if desired).    

    ![Search ](/img/get-started/library/SearchSuggestions.png)

    Search results are displayed.

    ![Search results](/img/get-started/library/search-results.png)

## Recent searches

When you run a search in Sumo Logic, that search and its results are saved automatically in the Library under the Recent tab. This is useful in case you lose your browser session, accidentally close the Search tab, log out, or just want to refer to a search you performed recently.

Recent Searches that are still running are paused after 15 minutes. If not reopened or restarted, the search is deleted after three hours.

The Home page lists all currently running searches and any searches performed over the last three hours:

![recent searched](/img/get-started/library/RecentlyRunSearches.png)

## Pinned searches

The **Pinned Search** feature allows you to start a search, then “pin” it, so it will continue running in the background independent of the browser session. Then, you can close the Search tab or log out and find your results later in the Library on the [Recent](#recent-searches) tab in a folder named Pinned Searches.

Once pinned, a search will run in the background for up to 24 hours. If it has not finished by then, it will be paused. There is no notification when your search is paused, but you can just restart the search to continue the query. Search results are available for three days.

There is a limit of ten pinned searches per user. Also, queries that use the [save operator](../../search/search-query-language/search-operators/save.md) cannot be pinned.

A search must be started in order for the pin button to show up in the Search tab. Once a search is pinned, you can easily unpin it, or remove it from the Pinned Searches tab. In the Pinned Searches folder, you can view the **Name**, **Status**, **Elapsed Time**, and monitor the **Progress** of each search.

There is a known issue that may cause Pinned Searches to be lost when Sumo Logic performs an upgrade. For information on Scheduled Maintenance for your deployment, see [Sumo Logic Status](http://status.sumologic.com). 

### Pin and unpin a search

1. Enter a query in the search box and click **Start**.
1. Click the three-dot icon and click **Pin** from the provided options.  

    ![pin search .png](/img/get-started/library/pin-search-option.png)

    A message displays that tells you where you can find it later in the Library.  
    
    ![pinmessage.png](/img/get-started/library/pinmessage.png)

    The Pinned Search is named by default with the name of the search tab. 

1. To change the name of the pinned search, double-click the **Search** tab to activate the name field and enter a new name.
1. To preserve the pinned search, follow the steps in Save a pinned search.
1. To unpin the search, click **Unpin** in the menu bar.

    ![unpin search .png](/img/get-started/library/unpin-search-option.png)

### Save a pinned search

When you save a pinned search, it appears in your personal folder in the left navigation bar.

1. Click the name of the search to open it in the **Search** tab.
1. In the **Search** tab, click the three-vertical dot icon and click **Save As** from the provided options. The Save Item dialog appears.
1. Enter a unique **Name** in the text field. In our example below, we entered Invoke Frequency.
1. Optionally, enter a **Description**.
1. Click **Save**.

![Save_As_Search_dialog.png](/img/get-started/library/Save_As_Search_dialog.png)

The search is saved to your **Personal** folder.

### Manage pinned searches

This section shows you how to open previously pinned searches, rename a pinned search, and remove a search from the pinned search list,

To open a previously pinned search:

1. In the **Pinned Searches** tab, click the name of the search.
1. The search query and any existing results are displayed in the **Search** tab.
1. To run a new instance of the search, change the Time Range Expression, and click **Start**.

To rename a pinned search:

1. In the **Pinned Searches** tab, click the name of the search.
1. The search query and any existing results are displayed in the **Search** tab.
1. Double-click the **Search** tab to reactivate the name field.
1. Enter a new name and press **Enter**.

To remove a search from the pinned search List:

1. Hover over the search, then click the three-dots to the right of the name.
1. Click **Unpin**.   

    ![unpin.png](/img/get-started/library/unpin.png)

1. In the **Confirm** dialog, click **OK**.

The search is removed from the list of Pinned Searches.

Removing an instance of a Saved Search from the list in the Pinned Searches tab does not delete the Saved Search from your Personal folder.

## Share a saved search from the Library

Once you’ve saved content, you can choose to share it, which makes it available to other users. Your shared content is automatically added to the Library in the **Org \> \[Your Name\] **folder.

To share a search and its results, see [Share a Link to a Search](../../search/get-started-with-search/search-basics/share-search-link.md). 

Once shared, other users in your organization can:

* Search for and find your shared search.
* Click your search to run it in the Search page.
* Copy your search to save and edit it. 
* Export the text of your search. 

Searches and Dashboards can be shared and unshared at any time. Additionally, other users can copy what you've shared and make further customizations.

<Tabs
  className="unique-tabs"
  defaultValue="share"
  values={[
    {label: 'Share', value: 'share'},
    {label: 'Unshare', value: 'unshare'},
  ]}>

<TabItem value="share">

1. In your **Personal** folder, highlight a search and click the share icon.

    ![Share](/img/get-started/library/share-icon.png)

1. On the sharing popup, click in the **Share this content...** field.

    ![share-with-users-roles.png](/img/get-started/library/share-with-users-roles.png)

1. You can share the search with **Your Entire Organization**, or any combination of roles and users

    ![roles-users-list.png](/img/get-started/library/roles-users-list.png)

1. The default permission level is **Edit**. Use the **Access** pull-down to select a different permission level. For information about permission levels and advanced options, see [Available Permission Levels] (../../Manage/Content_Sharing/Share-Content.md "Share Content") on the Share Content page.

    ![permission-levels.png](/img/get-started/library/permission-levels.png)

1. You can share the search with a different set of users and roles, and different permission level. To do so, click **Add users with another access level**, and repeat steps 3 and 4.
1. Click **Share**. 

</TabItem>
<TabItem value="unshare">

1. In the Library, highlight a search and click the share icon.

    ![Unshare.png](/img/get-started/library/share-icon.png)

1. Click **See who has access**.

    ![Only Me.png](/img/get-started/library/who-has-access.png)

1. Click the trash can icon to unshare the search with a user or role.

    ![unshare.png](/img/get-started/library/unshare.png)

1. Click **Save**.

</TabItem>
</Tabs>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

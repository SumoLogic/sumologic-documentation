---
id: library
title: Managing Your Sumo Logic Library
sidebar_label: Managing your Library
description: Managing your Library in Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can save, share, and manage Searches, Dashboards, Apps, and other Sumo Logic content in the Library. The Library also allows you to launch searches and Dashboards with a single click—speeding up access to the searches you find yourself running consistently. Additionally, you can use the content that others in your organization have already developed to continually discover new insights in your data.

Open the **Library** page to expose additional search options and to organize and manage Library contents.

To open the **Library** page, click the **Library** (folder) icon at the top of the UI.

![search select](/img/get-started/library/library-select.png)

You'll see two **View as** options:

* **Me**. See your own saved searches and dashboards.
* **Content Administrator**. Available if you have a Sumo role that grants you "Manage Content" capability, this option turns off your personal content in the Library and allows you to see the entire Sumo file tree. In this mode you can migrate content from one location to another, as well as highlight important content in the Admin Recommended folder. For more information, see Admin Mode.

Once you've made your choice of what you want to see, you can enter a string in the **Search** bar to display matching search results.

![search select](/img/get-started/library/library-preview.png)

## Explore the Library

To open the **Library** page, click the **Library** icon at the top of the UI.

![library icon](/img/reuse/library-icon.png)

* Select **Personal** to select your own saved searches and dashboards or **Org** to select those shared by others in your organization.
* Enter a search string to display matching search results.<br/>![search-string.png](/img/get-started/library/search-string.png)  
* Narrow your search by selecting an option for **Created by** or **Shared with**. As you make your selections, the constructed query is entered into the search field and additional options are presented. <br/>![create-by](/img/get-started/library/create-by.png)  
* Select a **Quick Search** option to perform a quick search for log searches, folders, or Dashboards.  As you make your selections, the query you have constructed is entered into the search field. <br/> ![quick-search](/img/get-started/library/quick-search.png)

## Organize the Library

Folders are available for organizing content in the Library. Some folders are set up automatically; for example, a folder is created automatically for Setup Wizard searches. You can also create custom folders and move items among folders. 

The path to the current Library folder is shown near the top of the Library page.

![setup-wizard-search](/img/get-started/library/setup-wizard-search.png)

To create a new folder, click **New Folder**, enter the folder name and an optional description, and click **Add**.

To get information on items in the library, click an item in the Library to open an information panel. If you click a folder in the Library, information about the folder is shown in the information panel. Double-click the folder to list the items that it contains.

![get-info](/img/get-started/library/get-info.png)

Do any of the following from the information panel in the Library:

* Click **Edit** to modify the name or description of the item.
* Click the **Trash** icon to delete the item from the Library. Deleting an item from the library means that the search, Dashboard, or folder is no longer available.
* Click the dotted **More** icon and select **Export** to open a window with the JSON code for the item, which you can copy or download.
* Click the dotted **More** icon and select **Copy** to make a copy of the item. Select the location in the Library to copy it to, and click **Copy**.
* Click **Share** or **Unshare** to change the sharing settings for the item.
* Click **Move** to move the item to another folder in the Library. Select the new location, and click **Move**.


## Personal Folder

You can add folders and subfolders to the Library in order to organize your content for easy access or to share content.

In the **Library**, your **Personal** folder is the root folder for all your saved content. Any time you save a search, a dashboard, or install an app, it is automatically saved here in a flat folder structure, ordered alphabetically.

The left nav gives quick access to all the items in the library. Click an item to open it.

![access item](/img/get-started/library/access-item.png)

Select **Personal** to show your own saved searches and dashboards.

<img src={useBaseUrl('img/get-started/library/personal-tab.png')} alt="personal-tab.png" width="250"/>

Select **Shared With** to show the searches and dashboards shared with others in your organization.

![shared-with](/img/get-started/library/shared-with.png)

The left nav also includes shortcut tabs.

![shortcuts](/img/get-started/library/shortcuts.png)

* Click the **Folder** icon to list all items in the library, and use the **Search** field as needed to narrow your search in the library.
* Click the **Recent** icon to list all currently running searches and any searches performed over the last three hours. Pinned Searches are also listed.
* Click the **Favorites** icon to list searches and Dashboards that you've marked as favorites to keep handy. To add an item to Favorites, hover over the item in the left nav and click the star, which changes to solid which. Click again to unfavorite. <br/>![favorite](/img/get-started/library/favorite.png)


## Add Folders

To add a folder to the Library:

1. Click the **Library** icon ![library icon.png](/img/reuse/library-icon.png) at the top of the UI.
1. Click **New Folder**. <br/>![folder](/img/get-started/library/AddFolder2.png)
1. In the **Add Folder** dialog, enter a name for the new folder, and click **Add**. <br/>![folder](/img/get-started/library/AddFolder.png)
1. The new folder is added to the folder list in alphabetical order.

## Move Content in Personal Folders

You can organize your saved content into subfolders in your Personal Folder.

1. Mouse over the icon next to a Library item you want to move to display the checkbox. <br/><img src={useBaseUrl('img/get-started/library/checkbox.png')} alt="checkbox.png" width="<insert-pixel-number>"/>
1. Click the checkbox to select the item.
1. Select other items as desired.
1. After selecting the content you want to move, click the three-dot more options menu and select the **Move** option.<br/><img src={useBaseUrl('img/get-started/library/move-option.png')} alt="move-option.png" width="<insert-pixel-number>"/>
1. In the **Move Item** dialog, select the location you want to move the content to, and click **Move**.<br/><img src={useBaseUrl('img/get-started/library/select-folder.png')} alt="select-folder.png" width="<insert-pixel-number>"/>
1. The item(s) will be moved and appear in the new location.

When your content is moved, you’ll need to click the new folder location to view its contents in the list on the right.


## Add Subfolders

1. Create a subfolder by clicking **New Folder** in your Personal folder.<br/>  ![sub folder](/img/get-started/library/AddNewSubFolder.png)
1. In the **Add Folder** dialog, enter **My Apps**, and click **Add**. The new subfolder is added to the folder list.

## Share Subfolders

If want to share the apps you have installed in order to share them with your organization, you can share your entire **MyApps** folder. This way, any app that you install in the future to this subfolder would be automatically published and shared with your team.

To publish a subfolder:

1. Select **MyApps**, click the details icon.
1. Click **Share**.
1. The **Share Folder** dialog appears. Choose **Your organization** to share with. Anyone in your org will be able to see this folder.
1. Click **Save**. The **MyApps** folder is added to the **Org** folder, in a subfolder labeled with your name. Now everyone in your organization can access your published content.

In the future, any Apps that you install in this published folder will be automatically published. If you want to create a folder hierarchy, create the desired hierarchical subfolders and publish the topmost folder. All subfolders will be published with the parent folder.


## Favorites

Keep track of content you use regularly with Favorites, or content that you want to keep handy. Just click the star icon for your saved search, dashboard, installed app, or folder, and it will be saved to the **Favorites** tab in the left nav for easy access.

You can also [favorite saved searches](/docs/search/get-started-with-search/search-page/add-saved-search-to-favorites) from the **Search** page, and favorite Dashboards from the **Dashboards** page.

There is a limit of 20 favorite items per user.

### Mark content as favorite

1. Go to the **Library.**
1. Click the star icon to the left of your search, Dashboard, app, or folder. <br/> ![StarredFolders.png](/img/get-started/library/StarredFolders.png)
1. The star darkens, and the item now appears on the **Favorites (star)** tab. <br/>![favoritestab.png](/img/get-started/library/favoritestab.png)

### Perform actions on favorites

If you own the content  you can perform the following actions on folders in your favorites:  

![OwnerOptions.png](/img/get-started/library/OwnerOptions.png)

If the content was created by another user and published, you can perform the following actions:  

![NonOwneroptions.png](/img/get-started/library/NonOwneroptions.png)

### Unfavorite content

1. Go to **Library > Favorites**.
1. De-select the star icon to the left of your search, dashboard, app, or folder.
1. A dialog displays showing that you unfavorited the item, and the item is removed from the **Favorites** folder.


## Search the Library

To find Sumo Logic content you have saved in the Library, you can search the **Personal** and **Org** folders using the search field.

You can search on the:

* Content name
* Content description

In the Library search field, you can use keywords and wildcards (\*), though leading wildcard searches (*ab) are not supported. You can add one or more keywords. With multiple keywords, the default assumed operator is AND, not OR.

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

:::caution Limitations
* Library Search is only supported in the **Personal** and **Org** folders.
* Content type search is only supported in the **Personal** folder. 
* Leading wildcards (`*ab`) are not supported.
* For multiple keywords, the assumed operator is AND, not OR.
:::

### Search content in the Library

1. In Sumo Logic, go to the **Library**.
1. Select the **Personal** or **Org** tab.
1. In the search field at the top of the right-hand panel, enter your text. You can use any of the following:
   * Keyword
   * Wildcard (\*)
   * **Personal tab only:** Content type prefix (with one or more keywords, if desired).<br/>  ![Search](/img/get-started/library/SearchSuggestions.png) <br/>Search results are displayed.<br/>![Search results](/img/get-started/library/search-results.png)

### Recent searches

When you run a search in Sumo Logic, that search and its results are saved automatically in the Library under the Recent tab. This is useful in case you lose your browser session, accidentally close the Search tab, log out, or just want to refer to a search you performed recently.

Recent Searches that are still running are paused after 15 minutes. If not reopened or restarted, the search is deleted after three hours.

The Home page lists all currently running searches and any searches performed over the last three hours:

![recent searched](/img/get-started/library/RecentlyRunSearches.png)

### Pinned searches

The **Pinned Search** feature allows you to start a search, then “pin” it, so it will continue running in the background independent of the browser session. Then, you can close the Search tab or log out and find your results later in the Library on the [Recent](#recent-searches) tab in a folder named Pinned Searches.

Once pinned, a search will run in the background for up to 24 hours. If it has not finished by then, it will be paused. There is no notification when your search is paused, but you can just restart the search to continue the query. Search results are available for three days.

There is a limit of ten pinned searches per user. Also, queries that use the [save operator](/docs/search/search-query-language/search-operators/save) cannot be pinned.

A search must be started in order for the pin button to show up in the Search tab. Once a search is pinned, you can easily unpin it, or remove it from the Pinned Searches tab. In the Pinned Searches folder, you can view the **Name**, **Status**, **Elapsed Time**, and monitor the **Progress** of each search.

There is a known issue that may cause Pinned Searches to be lost when Sumo Logic performs an upgrade. For information on Scheduled Maintenance for your deployment, see [Sumo Logic Status](http://status.sumologic.com). 

#### Pin and unpin a search

1. Enter a query in the search box and click **Start**.
1. Click the three-dot icon and click **Pin** from the provided options. <br/> <img src={useBaseUrl('img/get-started/library/pin-search-option.png')} alt="pin-search-option.png" width="325"/>
1. A message displays that tells you where you can find it later in the Library. The Pinned Search is named by default with the name of the search tab. <br/>![pinmessage.png](/img/get-started/library/pinmessage.png)
1. To change the name of the pinned search, double-click the **Search** tab to activate the name field and enter a new name.
1. To preserve the pinned search, follow the steps in Save a pinned search.
1. To unpin the search, click **Unpin** in the menu bar. <br/><img src={useBaseUrl('img/get-started/library/unpin-search-option.png')} alt="pin-search-option.png" width="300"/>

#### Save a pinned search

When you save a pinned search, it appears in your personal folder in the left navigation bar.

1. Click the name of the search to open it in the **Search** tab.
1. In the **Search** tab, click the three-vertical dot icon and click **Save As** from the provided options. The Save Item dialog appears.
1. Enter a unique **Name** in the text field. In our example below, we entered Invoke Frequency.
1. Optionally, enter a **Description**.
1. Click **Save**. <br/>![Save_As_Search_dialog.png](/img/get-started/library/Save_As_Search_dialog.png)

The search is saved to your **Personal** folder.

#### Manage pinned searches

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
1. Click **Unpin**.  <br/> ![unpin.png](/img/get-started/library/unpin.png)
1. In the **Confirm** dialog, click **OK**.

The search is removed from the list of Pinned Searches.

Removing an instance of a Saved Search from the list in the Pinned Searches tab does not delete the Saved Search from your Personal folder.

### Share a saved search from the Library

Once you’ve saved content, you can choose to share it, which makes it available to other users. Your shared content is automatically added to the Library in the **Org > [Your Name]** folder.

To share a search and its results, see [Share a Link to a Search](/docs/search/get-started-with-search/search-basics/share-link-to-search). 

Once shared, other users in your organization can:

* Search for and find your shared search.
* Click your search to run it in the Search page.
* Copy your search to save and edit it. 
* Export the text of your search. 

Searches and Dashboards can be shared and unshared at any time. Additionally, other users can copy what you've shared and make further customizations.

#### Share

1. In your **Personal** folder, highlight a search and click the share icon. <br/>![Share](/img/get-started/library/share-icon.png)
1. On the sharing popup, click in the **Share this content...** field. <br/> ![share-with-users-roles.png](/img/get-started/library/share-with-users-roles.png)
1. You can share the search with **Your Entire Organization**, or any combination of roles and users. <br/>![roles-users-list.png](/img/get-started/library/roles-users-list.png)
1. The default permission level is **Edit**. Use the **Access** pull-down to select a different permission level. For information about permission levels and advanced options, see [Available Permission Levels](/docs/manage/content-sharing#available-permission-levels). <br/> ![permission-levels.png](/img/get-started/library/permission-levels.png)
1. You can share the search with a different set of users and roles, and different permission level. To do so, click **Add users with another access level**, and repeat steps 3 and 4.
1. Click **Share**. 

#### Unshare

1. In the Library, highlight a search and click the share icon. <br/>![Unshare.png](/img/get-started/library/share-icon.png)
1. Click **See who has access**.<br/>![Only Me.png](/img/get-started/library/who-has-access.png)
1. Click the trash can icon to unshare the search with a user or role.<br/>![unshare.png](/img/get-started/library/unshare.png)
1. Click **Save**.


## Import and Export Content in the Library

In the **Library**, you can export content as JSON, including whole folders with subfolders, saved log searches, saved metric queries, and Dashboards. Then you can import the content as JSON into the same or another Sumo Logic organization.

The Export and Import functions are provided in order for you to transfer data immediately. The Sumo Logic JSON format may change without notice. There is no guarantee that you will be able to import the JSON in the future.

:::caution limitations
* Recent Searches, Favorites, Scheduled Views, Partitions, Field Extraction Rules (FERs), and lookups are not supported.
* For content that is shared, only the content is imported, not the Shared state. You can [share](/docs/dashboards) it again as necessary.
* All content names must be unique within a folder in the Library.
* Only error free JSON will import successfully.
* Import is limited to 1000 objects at a time.
* For IE 11, in the Export Content dialog, the Download button is not available, due to the default IE 11 security configuration, which blocks this kind of download.
:::

### Export Content

1. In the **Library**, do either:
    * To export an item, navigate to it, click the details icon for that item, and select **Export**.
    * To export a whole folder (with any subfolders), click the details icon for that folder select **Export**.
1. In the **Export** **Item **dialog, do either:
    * Click **Copy** to send it to the clipboard.
    * Click **Download** to download the content as a JSON file.
1. Click **DONE** to close the window.

If you modify your JSON manually after export, we recommend that you use [JSONLint](http://jsonlint.com/) to confirm that you are importing valid JSON.


### Import Content

1. Navigate to the folder into which you want to import the library item.
2. Select **Import** from the options menu.
3. In the **Content Import **dialog, enter **Name.** The item name must be unique with a folder. **Check your JSON before importing to make sure that there is no organization-specific content.** All content names in an organization must be unique. If the name is not unique, you will get an error that prevents you from importing the content.
4. Paste the JSON you copied from the** JSON** dialog to the clipboard, or from the JSON file you downloaded.
5. Click **Import**. The Import button is only available if you have pasted in a valid JSON.

## Library Filters

You can search through the content in your library with these three main filters. The filters can also be used in tandem, allowing you to filter through filtered content.

#### Created By
When selected this filter shows a list of users in your network. Once a creator is selected only content created by this user will show up in your search.

#### Shared With
When selected this filter shows a list of users in your network. Once a user is selected only content that was shared with this user will show up in your search.

#### Type
When selected this filter shows a list of different types of content within the library. Once a type is selected only that type of content will show up in your search.

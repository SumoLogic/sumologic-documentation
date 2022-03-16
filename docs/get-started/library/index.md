---
slug: sumo-logic-library
---

# Sumo Logic Library

You can save, share, and manage Searches, Dashboards, Apps, and other Sumo Logic content in the Library. The Library also allows you to launch searches and Dashboards with a single click—speeding up access to the searches you find yourself running consistently. Additionally, you can use the content that others in your organization have already developed to continually discover new insights in your data.

Open the **Library** page to expose additional search options and to organize and manage Library contents.

To open the **Library** page, click the **Library** (folder) icon at the top of the UI. You'll see two View as options:

* **Me**: See your own saved searches and dashboards.
* **Content Administrator**: Available if you have a Sumo role that grants you "Manage Content" capability, this option turn off your personal content in the Library and allow you to see the entire Sumo file tree.  In this mode you can migrate content from one location to another, as well as highlight important content in the Admin Recommended folder. For more information, see Admin Mode.

![search select](/img/get-started/library/library-select.png)

Once you've made your choice of what you want to see, you can enter a string in the **Search** bar to display matching search results.

![search select](/img/get-started/library/library-preview.png)

<Tabs
  className="unique-tabs"
  defaultValue="tab1"
  values={[
    {label: 'Personal Tab', value: 'tab1'},
    {label: 'Explore the Library', value: 'tab2'},
    {label: 'Organize the Library', value: 'tab3'},
  ]}>

<TabItem value="tab1">

The left nav gives quick access to all the items in the library. Click an item to open it.

![access item](/img/get-started/library/access-item.png)

Select **Personal** to show your own saved searches and dashboards.

![personal-tab](/img/get-started/library/personal-tab.png)

Select **Shared With** to show the searches and dashboards shared with others in your organization.

![shared-with](/img/get-started/library/shared-with.png)

The left nav also includes shortcut tabs.

![shortcuts](/img/get-started/library/shortcuts.png)

* Click the **Folder** icon to list all items in the library, and use the **Search** field as needed to narrow your search in the library.
* Click the **Recent** icon to list all currently running searches and any searches performed over the last three hours. Pinned Searches are also listed.
* Click the **Favorites** icon to list searches and Dashboards that you've marked as favorites to keep handy. To add an item to Favorites, hover over the item in the left nav and click the star, which changes to solid which. Click again to unfavorite.   

    ![favorite](/img/get-started/library/favorite.png)

</TabItem>
<TabItem value="tab2">

Open the **Library** page to expose additional search options and to organize and manage Library contents.

To open the **Library** page, click the **Library** icon at the top of the UI.

![library icon](/img/get-started/library/library-icon.png)

Select **Personal** to select your own saved searches and dashboards, or **Org** to select those shared by others in your organization.

Do the following from the **Library** page:

* Select **Personal** to select your own saved searches and dashboards or **Org** to select those shared by others in your organization.
* Enter a search string to display matching search results.

    ![search-string.png](/img/get-started/library/search-string.png)  
     
* Narrow your search by selecting an option for **Created by** or **Shared with**. As you make your selections, the constructed query is entered into the search field and additional options are presented.  

    ![create-by](/img/get-started/library/create-by.png)  
     
* Select a **Quick Search** option to perform a quick search for log searches, folders, or Dashboards.  As you make your selections, the query you have constructed is entered into the search field.  

    ![quick-search](/img/get-started/library/quick-search.png)

</TabItem>
<TabItem value="tab3">

Folders are available for organizing content in the Library. Some folders are set up automatically; for example, a folder is created automatically for Setup Wizard searches. You can also create custom folders and move items among folders. 

The path to the current Library folder is shown near the top of the Library page.

![setup-wizard-search](/img/get-started/library/setup-wizard-search.png)

To create a new folder, click **New Folder**, enter the folder name and an optional description, and click **Add**.

To get information on items in the library, click an item in the Library to open an information panel. If you click a folder in the Library, information about the folder is shown in the information panel. Double-click the folder to list the items that it contains.

![get-info](/img/get-started/library/get-info.png)

Do any of the following from the Information panel in the Library:

* Click **Edit** to modify the name or description of the item.
* Click the **Trash** icon to delete the item from the Library. Deleting an item from the library means that the search, Dashboard, or folder is no longer available.
* Click the dotted **More** icon and select **Export** to open a window with the JSON code for the item, which you can copy or download.
* Click the dotted **More** icon and select **Copy** to make a copy of the item. Select the location in the Library to copy it to, and click **Copy**.
* Click **Share** or **Unshare** to change the sharing settings for the item.
* Click **Move** to move the item to another folder in the Library. Select the new location, and click **Move**.

</TabItem>
</Tabs>

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we will introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
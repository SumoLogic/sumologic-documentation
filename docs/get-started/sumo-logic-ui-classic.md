---
id: sumo-logic-ui-classic
title: Tour the Sumo Logic Classic UI
sidebar_label: Sumo Logic UI (Classic)
description: Get to know the Sumo Logic platform user interface.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::warning Transition to the New UI
The Classic UI will be retired in early 2025. To ensure you have access to the latest features and updates, we recommend transitioning to the [Sumo Logic New UI](/docs/get-started/sumo-logic-ui) at your earliest convenience.
:::

This page provides an overview of the Sumo Logic Classic UI, designed to help you navigate and utilize its features effectively.

<img src={useBaseUrl('img/get-started/overview-classic-ui.png')} alt="Overview screenshot of the Classic UI" style={{border: '1px solid gray'}} width="800" />

## Using the left navigation bar

When you first log in, you'll land on the Sumo Logic Home page. The left nav menu bar is a one-stop location where you can access the following:

### Access dashboards and searches

The left nav bar provides easy access to libraries, personal collections of dashboards, searches, and folders. Click the icons at the top of the Left Nav Bar (left to right) to view:

* **Recent** dashboards and searches
* A list of your **Favorites** (dashboards and searches)
* Your **Personal** library of dashboards and searches
* A **Library** of shared dashboards and searches (within your organization)<br/><img src={useBaseUrl('img/get-started/ui/TUI_Left_Nav.png')} alt="Left navigation" style={{border: '1px solid gray'}} width="800" />

### Search and switch browsing modes

The top of the left nav bar is where you can search for content and
users and easily switch browsing modes. 

* Searching—Enter text in the **Search** field to quickly find apps, dashboards, searches, and users. 
* Switching browsing modes—Click the three-dot kebab icon and make a selection from the dropdown menu.<br/> ![TUI_Search_Details.png](/img/get-started/ui/TUI_Search_Details.png)

### Hide and show the left nav bar

You can easily hide the left nav bar to enlarge the working area. Then, just as easily show it again.

* To hide the left nav bar, click the **Arrow** in the top right corner.<br/>![TUI_NavBar_Hide.png](/img/get-started/ui/TUI_NavBar_Hide.png)
* To show a hidden left nav bar, click the **Menu** icon.<br/>![TUI_NavBar_Show.png](/img/get-started/ui/TUI_NavBar_Show.png)

### Access Apps, Admin features, and Help

In the lower section of the left nav bar, you can access the [App Catalog](apps-integrations.md), [Manage Data and Administration](/docs/manage) features, access the [Automation Service](/docs/platform-services/automation-service/), and [get help](#get-help-docs-community-and-more).

<img src={useBaseUrl('img/get-started/ui/TUI_App-Admin-Help.png')} alt="Lower left nav menu" style={{border: '1px solid gray'}} width="300" />

:::note
The **Automation** option does not appear in the left nav bar if your organization has Cloud SOAR installed, as automation features are handled through. For more information, see [Cloud SOAR Automation](/docs/cloud-soar/automation/).
:::

## Working with tabs

Every page you select opens in a new tab, and the tabs are shown at the top of the UI. You can have up to 50 tabs open at one time. Each of the following selections opens a new tab:

* Saved search 
* Dashboard
* New log search, metrics visualization or Live Tail session
* App catalog 
* Manage pages 
* Account page <br/><img src={useBaseUrl('img/get-started/ui/WTS_UI_Tabs.png')} alt="Tabs example" style={{border: '1px solid gray'}} width="800" />

### Rename or close a tab

You can customize tabs by renaming them, then close them when they are no longer relevant.

To rename or close a tab, do the following:

1. To rename a tab, double-click the name field, enter the new name, and press **Return**.<br/>  ![WTS_UI_Tab-rename.png](/img/get-started/ui/WTS_UI_Tab-rename.png)
1. To close a tab, hover the cursor over the tab and click the X icon on the right.<br/>![WTS_UI_Tab-delete.png](/img/get-started/ui/WTS_UI_Tab-delete.png)

### Customize your environment with tab options

Log Search, Metrics, and Live Tail tabs have additional options you can use to customize your environment. The tabs even stay open when you sign out and sign back in again, so you can start where you left off. Clicking any of the following icons opens a tabbed window.

<img src={useBaseUrl('img/get-started/ui/WTS_UI_LogSearch-Metrics-LiveTail.png')} alt="WTS_UI_LogSearch-Metrics-LiveTail.png" width="200"/>

To access additional Log Search, Metrics, and Live Tail options, do the following:

1. Hover the cursor over the three-dot kebab icon.<br/><img src={useBaseUrl('img/get-started/ui/WTS_Tab-options-details.png')} alt="Three-dot icon" style={{border: '1px solid gray'}} width="300"/>
1. Click the icon and choose an option from the dropdown menu.<br/><img src={useBaseUrl('img/get-started/ui/tab-options.png')} alt="Tab options" style={{border: '1px solid gray'}} width="300"/>
1. Use the left (`<`) and right (`>`) arrows at each end of the Tab menu bar to move back and forth through the tabs.

The following table lists the options available for the Search, Metrics, and Live Tail tabs.

| Option | Search tab  | Metrics tab  | Live Tail tab |
|:--|:--|:--|:--|
| Pin | ![check](/img/reuse/check.png) | — | — |
| Rename | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png)  |
| Duplicate | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png)  |
| Open a New Browser Tab | — | — | ![check](/img/reuse/check.png)  |
| Close | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  ![check](/img/reuse/check.png) |
| Close Other Tabs | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png)  |
| Close All Tabs | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png)  |
| Close Tabs to the Right | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |

## Mastering everyday tasks

This section provides information on how to perform basic everyday tasks using the Sumo Logic UI.

**All users:**

* [Launch log searches, metrics visualizations, and Live Tail sessions](#launch-searches-metrics-visualizations-andlive-tail-sessions)
* [View recent dashboards and searches](#view-recentdashboards-and-searches)
* [View Favorites and add dashboards and searches to the list](#view-favorites-and-add-dashboards-and-searches-to-the-list)
* [Share a dashboard, search, or folder](#share-a-dashboard-search-or-folder)
* [View content that is shared with you](#view-content-that-is-shared-with-you)
* [Pin and manage searches](#pin-and-managesearches)
* [Manage your personal account preferences](#manage-your-personal-account-preferences)
* [Get help: docs, community, and more](#get-help-docs-community-and-more)

**Sumo Logic Administrators:**

* [Admin: Manage data collection, data settings, and alerts](#admin-managedata-collection-data-settings-and-alerts)
* [Admin: Manage accounts, users, and security](#admin-manage-accounts-users-and-security)

### Launch searches, metrics visualizations, and Live Tail sessions 

This section shows you how to get started working with logs and metrics. The links provided direct you to more in-depth information.

To launch a search, metrics visualization, or live tail session, do the following:

1. Go to the Sumo Logic **Home** page.
1. Click one of the following Home page icons:<br/><img src={useBaseUrl('img/get-started/ui/home-icons.png')} alt="home-icons.png" width="600"/>
   * [Log Search](/docs/search/get-started-with-search/search-basics). Open the Search page to search logs.
   * [Metrics](/docs/metrics). Open the Metrics page to create a metrics visualization.
   * [Traces](/docs/apm/traces/). Monitor user activity, span analytics, service maps, and transaction traces between microservices.
   * [Live Tail](/docs/search/live-tail). View a real-time live feed of log events associated with a Source or Collector.
   * [Explore](/docs/dashboards/explore-view). See an intuitive visual hierarchy of your environment.
   * [Dashboard](/docs/dashboards/). Analyze metrics and log data on the same dashboard, in a streamlined user experience.
   * [Root Cause](/docs/observability/root-cause-explorer). Accelerate troubleshooting and isolate root causes for incidents in your apps and microservices.

### View recent dashboards and searches 

You see the Home landing page when you first log in to Sumo Logic. The Home page provides an at-a-glance view of the following:

* Recently opened dashboards
* Recently run searches
* Recommended dashboards 
* Pinned searches
* Recently run metrics

Click the **Home** icon at the far left of the Tab menu bar to return to the Home page at any time.

<img src={useBaseUrl('/img/get-started/ui/WTS_UI_Home_landing-page.png')} alt="Home page" style={{border: '1px solid gray'}} width="800" />

### View Favorites and add dashboards and searches to the list

You can create a list of favorite dashboards and searches that appear in the left nav bar. Your Favorites list makes it easy to access your most frequently used dashboards and searches.

To view Favorites and add to the list, do the following:

1. To view a list of current Favorites, click the **Star** icon at the top of the left nav bar. A list of Favorites is shown below.<br/><img src={useBaseUrl('/img/get-started/ui/WTS_UI_View_list-of-Favorites.png')} alt="Favorites" style={{border: '1px solid gray'}} width="300" />
1. To add a dashboard to the Favorites list, open the dashboard, select the three-dot kebab icon at the top right of the menu bar, and select **Favorite** from the dropdown list. <br/>  ![WTS_UI_Add-dashboard-to-Favorites.png](/img/get-started/ui/WTS_UI_Add-dashboard-to-Favorites.png)
1. To add a search to the Favorites list, do the following:
   1. [Save the search](/docs/search/get-started-with-search/search-basics/save-search) (if not already saved) by clicking **Save As**, then in the Save Item dialog enter a name, description, and select a folder in which to save the search.
   1. Click **Save**.
   1. Click the three-dot kebab icon and click **Favorite** from the provided options. <br/> <img src={useBaseUrl('img/get-started/ui/favorite-saved-search.png')} alt="favorite-saved-search.png" width="200"/>

### Share a dashboard, search, or folder

You can share dashboards, searches, and folders with users and roles. You can edit the sharing permissions at any time and share or revoke permissions as needed. You can share content from the following locations:

* **Left nav bar.** Recommended when you are familiar with the content and need to quickly share with another user.
* **Library.** Recommended when you need a detailed view of the content, who created it, and when it was last modified.

For walkthrough instructions, go to the [Share Content](/docs/manage/content-sharing) page. 

### View content that is shared with you

It's easy to view dashboards, searches, and folders that have been shared with you.

To see content that has been shared with you, do the following:

1. Click the **Clock** icon at the top of the left nav bar.
1. Toggle between **Recently Opened By Me** or **Recently Shared With Me**.<br/><img src={useBaseUrl('img/get-started/ui/Dash3.png')} alt="Dropdown menu with Recently Opened By and Recently Shared With Me options" width="200"/>

### Pin and manage searches

After you start a search, you can “pin” it, and it will run in the background for up to 24 hours. If the search does not finish in that time frame, it is paused. You can restart the search at any time. Search results are available for three days.

There is a limit of ten pinned searches per user. Also, queries that use the [save operator](/docs/search/search-query-language/search-operators/save-classic) cannot be pinned.

You must start a search for the Pin option to appear. Once a search is pinned, it cannot be unpinned, but it can be removed from the Pinned Searches tab.

To pin a search, do the following:

1. Open a Search page.
1. Enter a query in the search box and click **Start**.
1. Click the three-dot kebab icon and click **Pin** from the provided options.<br/><img src={useBaseUrl('img/get-started/ui/pin-search.png')} alt="pin-search.png" width="200"/>
1. A message appears telling you the location of your pinned search in the Library. The Pinned Search takes the name of the Search tab by default.<br/>  ![pinmessage.png](/img/get-started/ui/pinmessage.png)
1. To change the name of a Pinned Search, double-click the Search tab and enter a new name in the name field.

For information on how to manage pinned searches, see the [Pinned Searches](/docs/get-started/library#pinned-searches) page.

### Manage your personal account preferences

You can manage your personal account settings from the **Preferences** page. These settings **only apply** to your account. Changes you make to your preferences take effect the next time you sign in, not during the current session.

To manage your personal Sumo Logic account preferences, do the following:

1. At the very bottom of the Left Nav Bar, click your Account Name.
1. In the pop-up dialog, select **Preferences**.<br/>  ![WTS_Preferences_LeftNav-option.png](/img/get-started/ui/WTS_Preferences_LeftNav-option.png)
1. In the Preferences page that appears on the right, you can modify settings in the following areas:
    * **My Profile**: username and password
    * **My Security Settings**: enable and disable 2-step verification
    * **My Access Keys**: add, edit, and remove access keys
    * **My Preferences**: your account session settings

For more information, see the [Preferences Page](account-settings-preferences.md).

### Get help: docs, community, and more

Whenever you have a question, there are a number of ways in which you can get the answers you need:

* Check out our Release Notes:
   * [Service](/release-notes-service)
   * [Developer](/release-notes-developer)
   * [Cloud SIEM](/release-notes-cse)
   * [Collector](/release-notes-collector)
* Search documentation
* Visit the **Learn Page** in the Sumo Logic UI
* Post a question on the [**Sumo Logic Community**](https://support.sumologic.com/support/s/topiccatalog)
* Contact [**Support**](https://support.sumologic.com/)
* Try our **Customer Slack** channel

:::sumo Getting Help
See [Getting Help and Contacts](/docs/get-started/help) for full information.
:::

### Admin: Manage data collection, data settings, and alerts

Sumo Logic Administrators (Admins) are responsible for managing data collection, data settings, and alert monitoring for their organization. You must have Sumo Logic Admin role privileges to perform these tasks.

To manage data in Sumo Logic, do the following:

1. Go to the left nav bar and click **Manage Data**. <br/><img src={useBaseUrl('img/get-started/ui/manage-data.png')} alt="Manage Data menu options" style={{border: '1px solid gray'}} width="300" />
1. Choose from the following, as needed:
    * **Collection.** [Manage collectors and sources](/docs/send-data/collection).
    * **Logs.** Manage [fields](/docs/manage/fields), [field extraction rules](/docs/manage/field-extractions), [partitions](/docs/manage/partitions), [scheduled views](/docs/manage/scheduled-views), [connections](/docs/alerts/webhook-connections), and [data forwarding](/docs/manage/data-forwarding).
    * **Metrics.** Manage metrics rules, [logs-to-metrics](../metrics/logs-to-metrics.md), and [metrics transformation rules](../metrics/metrics-transformation-rules.md).
    * **Monitoring.** [Monitors](/docs/alerts/monitors), [connections](/docs/alerts/webhook-connections), and [health events](/docs/manage/health-events).

### Admin: Manage accounts, users, and security

Sumo Logic administrators (admins) manage user accounts, user roles, and security. You must have Sumo Logic Admin role privileges to perform these tasks.

To administer Sumo Logic accounts, users, and security, do the following:

1. Go to the left nav bar and click **Administration**. <br/><img src={useBaseUrl('img/get-started/ui/WTS_UI_Administration_menu-options.png')} alt="Administration menu options" style={{border: '1px solid gray'}} width="300" />
1. Choose from the following, as needed:
    * **Account.** [View information about your organization's Sumo Logic subscription](/docs/manage/manage-subscription), [enable and manage the data volume index,](/docs/manage/ingestion-volume/data-volume-index) [manage billing](/docs/manage/manage-subscription).
    * **Users and Roles**. [Manage users and roles](/docs/manage/users-roles).
    * **Security.** [Set password policy for your org](/docs/manage/security/set-password-policy), [set up security whitelist](/docs/manage/security/create-allowlist-ip-cidr-addresses), [manage access keys](/docs/manage/security/access-keys), manage security polices ([audit index](/docs/manage/security/audit-indexes/audit-index), [support account access,](/docs/manage/security/enable-support-account) and [dashboard sharing](../dashboards/share-dashboard-new.md), and [set up SAML authentication](/docs/manage/security/saml).

## Become a Sumo Logic Pro user

Now that you're familiar with the layout and features in the Sumo Logic user interface (UI), you're ready to ramp up your Sumo Logic skills with [self-paced training](https://www.sumologic.com/self-paced-training/).

You do not have to stop there either. You can take the next step and become Sumo Logic Certified. For more information on the Sumo Logic Certification program courses, go to the **Home** page, click the **Learn** tab, and click **Get Certified**. See [Certification FAQs](/docs/get-started/training-certification-faq) for more information.

<img src={useBaseUrl('img/get-started/certifications.png')} alt="Certifications" style={{border: '1px solid gray'}} width="500" />

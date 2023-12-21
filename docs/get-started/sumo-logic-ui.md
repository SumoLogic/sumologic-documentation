---
id: sumo-logic-ui
title: Tour the Sumo Logic UI
description: Get to know the Sumo Logic user interface.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The [Quickstart](/docs/get-started/quickstart) introduced you to the process of getting data into Sumo Logic, searching and analyzing your data, and then sharing your findings with your colleagues. This page will help you get to know the Sumo Logic user interface (UI).

## Using the left navigation bar

When you first log in, you'll land on the Sumo Logic **Home** page, which you can return to any time by clicking the **Home** icon at the top of the left-side navigation bar. The left nav bar is where you can access all of our products and services.

<img src={useBaseUrl('/img/get-started/home.png')} alt="home.png" width="400"/>


### Access dashboards and searches

The left-side navigation bar provides easy access to libraries, personal collections of dashboards, searches, and folders. Click the icons at the top of the left-side navigation bar to view:

* **Recent** dashboards and searches<br/><img src={useBaseUrl('/img/get-started/recent.png')} alt="recent.png" width="350"/>
* A list of your **Favorites** (dashboards and searches)<br/><img src={useBaseUrl('/img/get-started/favs.png')} alt="favs.png" width="350"/>
* A **Library** containing:
   * Your **Personal** dashboards and searches.
   * Your own **Installed Apps** from the App Catalog.
   * Dashboards and searches shared within your organization.<br/><img src={useBaseUrl('/img/get-started/library.png')} alt="library.png" width="350"/>

<!--
### Search and switch browsing modes

The top of the left-side navigation bar is where you can search for content and
users and easily switch browsing modes. 

* Searching. Enter text in the **Search** field to quickly find apps, dashboards, searches, and users. 
* Switching browsing modes. Click the **Details** icon and make a selection from the dropdown menu.

![TUI_Search_Details.png](/img/get-started/ui/TUI_Search_Details.png)
-->

### Hide and show the left-side navigation bar

You can easily hide the left-side navigation bar to enlarge your working area. Do do this, click the hamburger menu icon.

<img src={useBaseUrl('/img/get-started/hamburger.gif')} alt="hamburger.gif" width="350"/>

To unhide it, click the hamburger menu icon again.


### Customize your environment with tabs

If you'd prefer to multitask - e.g., Logs session, dashboard, App Catalog, and settings page - with multiple tasks open at once, we recommend utilizing your web browser's tab grouping functionality. By adding your Sumo tab to a tab group, any new tabs opened within the Sumo Logic platform will automatically open in the same tab group. This also allows you to collapse the tab group to reclaim valuable real estate in your browser's tab bar.


## Using the top navigation bar

### Access Apps, Admin settings, and Help

In the upper right-hand corner of the top navigation bar, you can access (from left to right) our [Help](#get-help-docs-community-and-more) options, [App Catalog](apps-integrations.md), data [Configuration](/docs/send-data), [Administration](/docs/manage) settings, [Notifications](account-settings-preferences.md), and personal [Preferences](account-settings-preferences.md). 

<img src={useBaseUrl('/img/get-started/admin-config.png')} alt="admin-config.png" width="350"/>

## Mastering everyday tasks

This section provides information on how to perform basic everyday tasks using the Sumo Logic UI.

**All users:**

* [Launch log searches, metrics visualizations, and Live Tail sessions](#launch-searches-metrics-visualizations-and-live-tail-sessions)
* [View recent dashboards and searches](#view-recent-dashboards-and-searches)
* [View Favorites and add dashboards and searches to the list](#view-favorites-and-add-dashboards-and-searches-to-the-list)
* [Share a dashboard, search, or folder](#share-a-dashboard-search-or-folder)
* [View content that is shared with you](#view-content-that-is-shared-with-you)
* [Pin and manage searches](#pin-and-manage-searches)
* [Manage your personal account preferences](#manage-your-personal-account-preferences)
* [Get help: docs, community, and more](#get-help-docs-community-and-more)

**Sumo Logic Administrators:**

* [Admin: Manage data collection, data settings, and alerts](#admin-manage-data-collection-data-settings-and-alerts)
* [Admin: Manage accounts, users, and security](#admin-manage-accounts-users-and-security)

### Launch searches, metrics visualizations, and Live Tail sessions 

This section shows you how to get started working with logs and metrics. The links provided direct you to more in-depth information.

To launch a search, metrics visualization, or Live Tail session, do the following:

1. Go to the Sumo **Home** page.
1. Do one of the following: 
   * Click one of the following left-side nav menu icons:
     * [Logs](/docs/search/get-started-with-search/search-basics). Open the Search page to search logs.
     * [Metrics](/docs/metrics). Open the Metrics page to create a metrics visualization.
     * [Logs > Live Tail](/docs/search/live-tail). View a real-time live feed of log events associated with a Source or Collector.

### View recent dashboards and searches 

You see the **Home** landing page when you first log in to Sumo Logic. The Home page provides an at-a-glance view of the following:

* recently opened dashboards
* recently run searches
* recommended dashboards 
* pinned searches

<img src={useBaseUrl('img/get-started/dashboard-searches.png')} alt="dashboard-searches.png" />

### View Favorites and add dashboards and searches to the list

You can create a list of favorite dashboards and searches that appear in the left-side navigation bar. Your Favorites list makes it easy to access your most frequently used dashboards and searches.

To view Favorites and add to the list, do the following:

1. To view a list of your current Favorites, click the **Favorites** icon in the left-side navigation bar.
1. To add a dashboard to the Favorites list, open the dashboard, select the **Details** icon at the top right of the menu bar and select **Favorite** from the dropdown list. <br/>  ![WTS_UI_Add-dashboard-to-Favorites.png](/img/get-started/ui/WTS_UI_Add-dashboard-to-Favorites.png)
1. To add a search to the Favorites list, do the following:
   1. [Save the search](/docs/search/get-started-with-search/search-basics/save-search) (if not already saved) by clicking **Save As**, then in the Save Item dialog enter a name, description, and select a folder in which to save the search.
   1. Click **Save**.
   1. Click the three-dot kebab icon and click **Favorite** from the provided options. <br/> ![favorite saved search ](/img/get-started/ui/favorite-saved-search.png)

The dashboard and search appear in the Favorites list in the left-side navigation bar.

![WTS_UI_Additions-to-Favorites-list.png](/img/get-started/ui/WTS_UI_Additions-to-Favorites-list.png)

### Share a dashboard, search, or folder

You can share dashboards, searches, and folders with users and roles. You can edit the sharing permissions at any time and share or revoke permissions as needed. You can share content from the following locations:

* **Left-side navigation bar.** Recommended when you are familiar with the content and need to quickly share with another user.
* **Library.** Recommended when you need a detailed view of the content, who created it, and when it was last modified.

For walkthrough instructions, go to the [Share Content](/docs/manage/content-sharing) page. 

### View content that is shared with you

To see dashboards, searches, and folders that have been shared with you, do the following:

1. Click the **Clock** icon at the top of the left-side navigation bar.
1. Toggle between **Recently Opened By Me** or **Recently Shared With Me**.

![Dash3.png](/img/get-started/ui/Dash3.png)

### Pin and manage searches

After you start a search, you can “pin” it, and it will run in the background for up to 24 hours. If the search does not finish in that time frame, it is paused. You can restart the search at any time. Search results are available for three days.

There is a limit of ten pinned searches per user. Also, queries that use the [save operator](/docs/search/search-query-language/search-operators/save-classic) cannot be pinned.

You must start a search for the Pin option to appear. Once a search is pinned, it cannot be unpinned, but it can be removed from the Pinned Searches tab.

To pin a search, do the following:

1. Open a Search page.
1. Enter a query in the search box and click **Start**.
1. Click the three-dot icon and click **Pin** from the provided options.<br/> ![pin search](/img/get-started/ui/pin-search.png)
1. A message appears telling you the location of your pinned search in the Library. The Pinned Search takes the name of the Search tab by default.<br/>  ![pinmessage.png](/img/get-started/ui/pinmessage.png)
1. To change the name of a Pinned Search, double-click the Search tab and enter a new name in the name field.

For information on how to manage pinned searches, see the [Pinned Searches](/docs/get-started/library#pinned-searches) page.

### Manage your personal account preferences

You can manage your personal account settings from the **Preferences** page. These settings apply only to your account. Changes you make to your preferences take effect the next time you sign in, not during the current session.

To manage your personal Sumo account preferences:

1. From the top navigation bar, click the person icon.
1. In the dropdown, select **Preferences**.
1. In the Preferences page that appears on the right, you can modify settings in the following areas:
    * **My Profile**. username and password.
    * **My Security Settings**. enable and disable 2-step verification.
    * **My Access Keys**. add, edit, and remove access keys.
    * **My Preferences**. your account session settings.

For more information, see the [Preferences Page](account-settings-preferences.md).

### Get Help: docs, community, and more

Whenever you have a question, there are a number of ways in which you can get the answers you need:

* Check out our Release Notes:
   * [Service](/release-notes-service)
   * [Developer](/release-notes-developer)
   * [Cloud SIEM](/release-notes-cse)
   * [Collector](/release-notes-collector)
* Search documentation
* Visit the **Learn Page** in the Sumo Logic UI
* Post a question on the [**Sumo Logic Community**](https://support.sumologic.com/hc/en-us/community/topics)
* Contact [**Support**](https://support.sumologic.com/)
* Try our **Customer Slack** channel

:::sumo Getting Help
See [Getting Help and Contacts](/docs/get-started/help) for full information.
:::

### Admin: Manage data collection, data settings, and alerts

Sumo Logic Administrators (Admins) are responsible for managing data collection, data settings, and alerts for their organization. You must have Sumo Logic Admin role privileges to perform these tasks.

To manage data in Sumo Logic, do the following:

1. Go to the left-side navigation bar and click **Manage Data**.<br/>  ![manage-data.png](/img/get-started/ui/manage-data.png)
1. Choose from the following, as needed:
    * **Collection.** [Manage collectors and sources](/docs/send-data/collection).
    * **Logs.** Manage [fields](/docs/manage/fields.md), [field extraction rules](/docs/manage/field-extractions), [partitions](/docs/manage/partitions-data-tiers), [scheduled views](/docs/manage/scheduled-views), [connections](/docs/manage/connections-integrations), and [data forwarding](/docs/manage/data-forwarding).
    * **Metrics.** Manage metrics rules, [logs-to-metrics](../metrics/logs-to-metrics.md), and [metrics transformation rules](../metrics/metrics-transformation-rules.md).
    * **Alerts.** [Monitors](/docs/alerts/monitors), [connections](/docs/manage/connections-integrations), and [health events](/docs/manage/health-events.md).

### Admin: Manage accounts, users, and security

Sumo Logic administrators (admins) manage user accounts, user roles, and security. You must have Sumo Logic Admin role privileges to perform these tasks.

To administer Sumo Logic accounts, users, and security, do the following:

1. Go to the top navigation bar and click **Administration**.<br/> ![WTS_UI_Administration_menu-options.png](/img/get-started/admin.png)
1. Choose from the following, as needed:
    * **Account.** [View information about your organization's Sumo Logic subscription](/docs/manage/manage-subscription), [enable and manage the data volume index,](/docs/manage/ingestion-volume/data-volume-index) [manage billing](/docs/manage/manage-subscription).
    * **Users and Roles**. [Manage users and roles](/docs/manage/users-roles).
    * **Security.** [Set password policy for your org](/docs/manage/security/set-password-policy.md), [set up security whitelist](/docs/manage/security/create-allowlist-ip-cidr-addresses.md), [manage access keys](/docs/manage/security/access-keys.md), manage security polices ([audit index](/docs/manage/security/audit-indexes/audit-index.md), [support account access,](/docs/manage/security/enable-support-account.md) and [dashboard sharing](../dashboards/share-dashboard-new.md), and [set up SAML authentication](/docs/manage/security/saml).

## Become a Sumo Pro user

Now that you're familiar with the layout and features in the Sumo Logic UI, you're ready to ramp up your Sumo skills with [self-paced training](https://www.sumologic.com/self-paced-training/).

You don't have to stop there either. You can take the next step and become Sumo Certified. For more information on the Sumo Logic Certification program courses, go to the **Home** page and click the **Certification** tab. See [Certification FAQs](/docs/get-started/faq#certification-faq) for more information.

---
id: sumo-logic-ui
title: Tour the Sumo Logic UI
description: Get to know the Sumo Logic user interface.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Our [Quickstart](/docs/get-started/quickstart) introduced you to the process of getting data into Sumo Logic, searching and analyzing your data, and then sharing your findings with your colleagues. 

This page will help you get to know the Sumo Logic user interface (UI).



## Using the left navigation panel

The left-side navigation panel is where you can access your library of dashboards as well as all of our services.

### Home

When you first log in, you'll land on the Sumo Logic **Home** page > **Home** tab, which provides an at-a-glance view of the following:

* Recently Opened Dashboards
* Recently Run Searches
* Recommended Dashboards 
* Pinned Searches

<img src={useBaseUrl('img/get-started/dashboard-searches.png')} alt="dashboard-searches.png" />

### Access dashboards and searches

The left nav panel provides easy access to libraries, searches, folders, and your personal collection of dashboards. Click the icons at the top of the left-side navigation panel to view:

* Your **Library**, which contains:
   * Your **Personal** dashboards and searches.
   * Your own **Installed Apps** from the App Catalog.
   * Dashboards and searches shared within your organization.<br/><img src={useBaseUrl('/img/get-started/library.png')} alt="library.png" width="500"/>
* **Recent** dashboards and searches.<br/><img src={useBaseUrl('/img/get-started/recent.png')} alt="recent.png" width="350"/>
* Your **Favorites** list of favorited dashboards and searches.<br/><img src={useBaseUrl('/img/get-started/favs.png')} alt="favs.png" width="350"/>

<!--
### Search and switch browsing modes

The top of the left-side navigation panel is where you can search for content and
users and easily switch browsing modes. 

* Searching. Enter text in the **Search** field to quickly find apps, dashboards, searches, and users. 
* Switching browsing modes. Click the **Details** icon and make a selection from the dropdown menu.

![TUI_Search_Details.png](/img/get-started/TUI_Search_Details.png)
-->

### Hide and show the left-side navigation panel

You can enlarge your working area by hiding the left-side navigation panel. To do this, click the hamburger menu icon.

<img src={useBaseUrl('/img/get-started/hamburger.gif')} alt="hamburger.gif" width="350"/>

To unhide it, click the hamburger menu icon again.


## Using the top navigation bar

### Access Apps, Admin settings, and Help

From the top navigation bar, you can access (from left to right): Sumo Logic [Help](#get-help-docs-community-and-more), [App Catalog](apps-integrations.md), data [Configuration](/docs/send-data), [Administration](/docs/manage) settings, [Notifications](account-settings-preferences.md), and personal [Preferences](account-settings-preferences.md).

<img src={useBaseUrl('/img/get-started/admin-config.png')} alt="admin-config.png" width="350"/>

### Manage your personal account preferences

You can manage your personal account settings from the **Preferences** page. These settings apply only to your account. Changes you make to your preferences take effect the next time you sign in, not during the current session.

To manage your personal Sumo account preferences:

1. From the top navigation bar, click the person icon, and then from the dropdown, select **Preferences**.<br/><img src={useBaseUrl('img/get-started/acct-pref.png')} alt="img/get-started/acct-pref.png" width="350"/>
1. In the Preferences page, you can modify the following settings:
    * **My Profile**. Username and password.
    * **My Access Keys**. Add, edit, and remove access keys.
    * **My Preferences**. Your account session settings.

For more information, see [Account Preferences and Credentials](account-settings-preferences.md).

### Get Help: Docs, community, and more

There are a number of places where you can get the answers to questions you have:

* Check out our [Release Notes](/docs/release-notes)
* Search [Sumo Docs](https://help.sumologic.com/)
* Visit the **Learn Page** in the Sumo Logic UI
* Post a question on the [Sumo Logic Community](https://support.sumologic.com/hc/en-us/community/topics)
* Contact [Support](https://support.sumologic.com/)
* Join our [Sumo Logic Slack](https://sumodojo.slack.com/) channel

:::tip
See [Help Resources and Contacts](/docs/get-started/help) for full information.
:::

## Administrator tasks

### Manage data collection, data settings, and alerts

Sumo Logic Administrators (Admins) are responsible for managing data collection, data settings, and alerts for their organization. You must have Sumo Logic Admin role privileges to perform these tasks.

To manage data in Sumo Logic, do the following:

1. From the top-right navigation bar, click **Configuration**.<br/><img src={useBaseUrl('img/get-started/config.png')} alt="img/get-started/config.png" width="400"/>
1. Choose from the following, as needed:
    * **Collection**. [Manage Collectors and Sources](/docs/send-data/collection).
    * **Logs**. Manage [fields](/docs/manage/fields), [field extraction rules](/docs/manage/field-extractions), [partitions](/docs/manage/partitions-data-tiers), [scheduled views](/docs/manage/scheduled-views) <!--, [connections](/docs/manage/connections-integrations), and [data forwarding](/docs/manage/data-forwarding). -->
    * **Metrics**. Manage metrics rules, [logs-to-metrics](../metrics/logs-to-metrics.md), and [metrics transformation rules](../metrics/metrics-transformation-rules.md).
    * **Cloud SIEM Integrations**.
    * **Cloud SIEM Entities**.
    * **Cloud SIEM Workflow**.

### Manage accounts, users, and security

Sumo Logic administrators (admins) manage user accounts, user roles, and security. You must have Sumo Logic Admin role privileges to perform these tasks.

To administer Sumo Logic accounts, users, and security, do the following:

1. From the top navigation bar, click **Administration**.<br/> <img src={useBaseUrl('img/get-started/admin.png')} alt="img/get-started/admin.png" width="400"/>
1. Choose from the following, as needed: <!-- what does this look like for Admin users? -->
    * **Account**. [View information about your organization's Sumo Logic subscription](/docs/manage/manage-subscription), [enable and manage the data volume index,](/docs/manage/ingestion-volume/data-volume-index) [manage billing](/docs/manage/manage-subscription).
    * **Users and Roles**. [Manage users and roles](/docs/manage/users-roles).
    * **Security**. [Set password policy for your org](/docs/manage/security/set-password-policy), [set up security whitelist](/docs/manage/security/create-allowlist-ip-cidr-addresses), [manage access keys](/docs/manage/security/access-keys), manage security policies ([audit index](/docs/manage/security/audit-indexes/audit-index)), [support account access](/docs/manage/security/enable-support-account), [dashboard sharing](/docs/dashboards/share-dashboard-new/), and [set up SAML authentication](/docs/manage/security/saml).

## Customize your environment with tabs

If you'd prefer to multitask and keep multiple tab open simultaneously (for example: log search, dashboards, App Catalog, and Preferences), we recommend utilizing your own web browser's tab grouping functionality. By adding Sumo Logic tabs to a tab group, any new tabs opened within the Sumo Logic platform will automatically open in the same tab group.

<img src={useBaseUrl('/img/get-started/tabs.png')} alt="tabs.png" width="500" />

This will also allow you to collapse the tab group to reclaim valuable real estate in your browser's tab bar.

## Mastering everyday tasks

This section provides information on how to perform basic everyday tasks using the Sumo Logic UI.

**Analysts (all users):**

* [Launch log searches, metrics visualizations, and Live Tail sessions](#launch-searches-metrics-visualizations-and-live-tail-sessions)
* [View recent dashboards and searches](#view-recent-dashboards-and-searches)
* [View Favorites and add dashboards and searches to the list](#view-favorites-and-add-dashboards-and-searches-to-the-list)
* [Share a dashboard, search, or folder](#share-a-dashboard-search-or-folder)
* [View content that is shared with you](#view-content-that-is-shared-with-you)
* [Pin and manage searches](#pin-and-manage-searches)
* [Manage your personal account preferences](#manage-your-personal-account-preferences)
* [Get help: docs, community, and more](#get-help-docs-community-and-more)

**Administrators:**

* [Admin: Manage data collection, data settings, and alerts](#admin-managedata-collection-data-settings-and-alerts)
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



### Add dashboards and searches to your Favorites

You can create a list of favorite dashboards and log searches that appear in the left-side navigation panel. Your [Favorites list](#accessdashboards-and-searches) makes it easy to access your most frequently used dashboards and searches.

To add a dashboard to your Favorites:
1. Open any dashboard.
1. Click the three-dot kebab icon at the top right of the menu bar, then select **Favorite** from the dropdown list. <br/> ![WTS_UI_Add-dashboard-to-Favorites.png](/img/get-started/WTS_UI_Add-dashboard-to-Favorites.png)

To add a log search to your Favorites:
1. [Save the search](/docs/search/get-started-with-search/search-basics/save-search) (if not already saved) by clicking **Save As**. Then in the Save Item dialog enter a name, description, and select a folder in which to save the search.
1. Click **Save**.
1. Click the three-dot kebab icon and select **Favorite** from the dropdown list. <br/><img src={useBaseUrl('img/get-started/favorite-saved-search.png')} alt="img/get-started/favorite-saved-search.png" width="200"/>

### Share a dashboard, search, or folder

You can share dashboards, searches, and folders with users and roles. You can edit the sharing permissions at any time and share or revoke permissions as needed. You can share content from the following locations:

* **Left-side navigation panel**. Recommended when you are familiar with the content and need to quickly share with another user.
* **Library**. Recommended when you need a detailed view of the content, who created it, and when it was last modified.

For walkthrough instructions, go to the [Share Content](/docs/manage/content-sharing) page. 

### View content that is shared with you

To see dashboards, searches, and folders that have been shared with you, do the following:

1. From the left-side nav, click **Recent**.<br/><img src={useBaseUrl('img/get-started/recent.png')} alt="img/get-started/recent.png" width="400"/>
1. Toggle between **Recently Opened By Me** or **Recently Shared With Me**.<br/> ![Dash3.png](/img/get-started/Dash3.png)

### Pin and manage searches

After you start a log search, you can “pin” it, and it will run in the background for up to 24 hours. If the search does not finish in that time frame, it is paused. You can restart the search at any time. Search results are available for three days.

You must start a search for the **Pin** option to appear. To pin a search, do the following:

1. Open a Search page.
1. Enter a query in the search box and click **Start**.
1. Click the three-dot icon and select **Pin** from the dropdown menu.<br/><img src={useBaseUrl('img/get-started/pin-search.png')} alt="img/get-started/pin-search.png" width="200"/>
1. A message appears telling you the location of your pinned search in the **Library**. The pinned search takes the name of the Search tab by default.<br/>  ![pinmessage.png](/img/get-started/pinmessage.png)
1. To change the name of a pinned search, double-click the Search tab and enter a new name in the name field.

Once a search is pinned, it cannot be unpinned, but you can remove it from the **Pinned Searches** tab. You can pin up to 10 searches at a time. Queries that use the [save operator](/docs/search/search-query-language/search-operators/save-classic) cannot be pinned.

For more information, see [Pinned Searches](/docs/get-started/library#pinned-searches).

## Become a Sumo Pro user

Now that you're familiar with the layout and features in the Sumo Logic UI, you're ready to ramp up your Sumo skills with [self-paced training](https://www.sumologic.com/self-paced-training/).

You don't have to stop there either. You can take the next step and become Sumo Certified. For more information on the Sumo Logic Certification program courses, go to the **Home** page and click the **Certification** tab. See [Certification FAQs](/docs/get-started/faq#certification-faq) for more information.

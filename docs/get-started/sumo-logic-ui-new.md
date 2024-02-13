---
id: sumo-logic-ui-new
title: Tour the New Sumo Logic UI
description: Get to know the Sumo Logic platform user interface.
---

<!--
When Open Beta'd (est. Aug 2024), remove no-index, place doc in sidebars.ts and call this "New" and rename the old one "Classic", add announcement banner.
When GA'd (est. Nov 2024), remove beta badge, rename this 'sumo-logic-ui', retire the Classic UI version.
-->

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Closed Beta</span></a></p>

:::sumo beta
To request access, contact your Sumo Logic sales representative.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

Our [Quickstart](/docs/get-started/quickstart) introduced you to the process of getting data into Sumo Logic, searching and analyzing your data, and then sharing your findings with your colleagues. 

This page will help you get to know the new Sumo Logic user interface (UI), currently in beta and scheduled for general availability in late 2024.

## Getting to the New UI

Once you're logged in to Sumo Logic, go to the left navigation panel and click **Switch to New UI**.

<img src={useBaseUrl('img/get-started/switch-new-ui.png')} alt="switch-new-ui.png" width="250"/>

## Using the left navigation panel

From the left-side navigation (nav) panel, you can access your dashboards library as well as our main functions and features, such as Log Search, Metrics, Infrastructure Monitoring, Application Monitoring, Cloud SIEM Enterprise, and Cloud SOAR.

### Home

When you first log in, you'll land on the Sumo Logic **Home** page > **Home** tab, which provides an at-a-glance view of the following:

* Recently Opened Dashboards
* Recently Run Searches
* Recommended Dashboards 
* Pinned Searches<br/><img src={useBaseUrl('img/get-started/dashboard-searches.png')} alt="dashboard-searches.png" />

### Access dashboards and searches

The left nav panel provides easy access to libraries, searches, folders, and your personal collection of dashboards. Click the icons at the top of the left-side nav panel to view:

* Your **Library**, which contains:
   * Your **Personal** dashboards and searches.
   * Your own **Installed Apps** from the App Catalog.
   * Dashboards and searches shared within your organization.<br/><img src={useBaseUrl('/img/get-started/library.png')} alt="library.png" width="500"/>
* **Recent** dashboards and searches.<br/><img src={useBaseUrl('/img/get-started/recent.png')} alt="recent.png" width="350"/>
* Your **Favorites** list of favorited dashboards and searches.<br/><img src={useBaseUrl('/img/get-started/favs.png')} alt="favs.png" width="350"/>

Use the **Library** search bar to find the above quickly. **View as** mode should be set to **Me**.<br/><img src={useBaseUrl('img/get-started/library-search.png')} alt="library-search.png" width="550"/>

If you're an admin, you can view the Library in [Content Administrator](#search-content-administrator-library) mode.

:::tip
Enlarge your working area by hiding the left-side nav panel. Just click the hamburger menu icon. To unhide it, click the hamburger menu icon again.<br/><img src={useBaseUrl('/img/get-started/hamburger.gif')} alt="hamburger.gif" width="350"/>
:::

## Using the top navigation bar

### Access Apps, Admin settings

The global toolbar (top nav bar) provides you access to (from left to right): [Help](#get-help-docs-community-and-more), [App Catalog](apps-integrations.md), [(Data) Configuration](/docs/send-data), [Administration](/docs/manage), and your user profile options ([Notifications](account-settings-preferences.md) and [Preferences](account-settings-preferences.md)).

<img src={useBaseUrl('/img/get-started/admin-config.png')} alt="admin-config.png" width="350"/>

### Manage your personal account preferences

You can manage your personal account settings from the **Preferences** page. These settings apply only to your account. Changes you make to your preferences take effect the next time you sign in, not during the current session.

To manage your personal Sumo account preferences:

1. From the top nav bar, click the person icon, and then from the dropdown, select **Preferences**.<br/><img src={useBaseUrl('img/get-started/acct-pref.png')} alt="img/get-started/acct-pref.png" width="350"/>
1. In the Preferences page, you can modify the following settings:
    * **My Profile**. Username and password.
    * **My Access Keys**. Add, edit, and remove access keys.
    * **My Preferences**. Your account session settings.

For more information, see [Account Preferences and Credentials](account-settings-preferences.md).

## Customize your environment with tabs

If you'd prefer to multitask and keep multiple tab open simultaneously (for example: log search, dashboards, App Catalog, and Preferences), we recommend utilizing your own web browser's tab grouping functionality. By adding Sumo Logic tabs to a tab group, any new tabs opened within the Sumo Logic platform will automatically open in the same tab group.

<img src={useBaseUrl('/img/get-started/tabs.png')} alt="tabs.png" width="500" />

This will also allow you to collapse the tab group to reclaim valuable real estate in your browser's tab bar.

## Mastering everyday tasks

This section provides information on how to perform basic everyday tasks using the Sumo Logic UI.

### Analysts (all users)

* [Launch log searches, metrics visualizations, and Live Tail sessions](#launch-searches-metrics-visualizations-and-live-tail-sessions)
* [View recent dashboards and searches](#view-recent-dashboards-and-searches)
* [View Favorites and add dashboards and searches to the list](#view-favorites-and-add-dashboards-and-searches-to-the-list)
* [Share a dashboard, search, or folder](#share-a-dashboard-search-or-folder)
* [View content that is shared with you](#view-content-that-is-shared-with-you)
* [Pin and manage searches](#pin-and-manage-searches)
* [Manage your personal account preferences](#manage-your-personal-account-preferences)
* [Get help: Sumo Docs, Community, and more](#get-help-docs-community-and-more)

### Administrators

* [Manage data collection, data settings, and alerts](#admin-managedata-collection-data-settings-and-alerts)
* [Manage accounts, users, and security](#admin-manage-accounts-users-and-security)

### Launch searches, metrics visualizations, and Live Tail sessions 

This section shows you how to get started working with logs and metrics. The links provided direct you to more in-depth information.

To launch a log search, metrics visualization, or Live Tail session, do the following:

1. Go to the Sumo **Home** page.
1. Do one of the following: 
   * Click one of the following left-side nav menu icons:
     * [Logs](/docs/search/get-started-with-search/search-basics). Open the Search page to search logs.
     * [Metrics](/docs/metrics). Open the Metrics page to create a metrics visualization.
     * [**Logs** > **Live Tail**](/docs/search/live-tail). View a real-time live feed of log events associated with a Source or Collector.

### Add dashboards and searches to your Favorites

You can create a list of favorite dashboards and log searches that appear in the left-side nav panel. Your [**Favorites** list](#accessdashboards-and-searches) makes it easy to access your most frequently used dashboards and searches.

To add a dashboard to your Favorites:
1. Open any dashboard.
1. Click the three-dot kebab icon at the top right of the menu bar, then select **Favorite** from the dropdown list. <br/> ![WTS_UI_Add-dashboard-to-Favorites.png](/img/get-started/WTS_UI_Add-dashboard-to-Favorites.png)

To add a log search to your Favorites:
1. [Save the search](/docs/search/get-started-with-search/search-basics/save-search) (if not already saved) by clicking **Save As**. Then in the Save Item dialog enter a name, description, and select a folder in which to save the search.
1. Click **Save**.
1. Click the three-dot kebab icon and select **Favorite** from the dropdown list. <br/><img src={useBaseUrl('img/get-started/favorite-saved-search.png')} alt="img/get-started/favorite-saved-search.png" width="200"/>

### Share a dashboard, search, or folder

You can share dashboards, searches, and folders with users and roles. You can edit the sharing permissions at any time and share or revoke permissions as needed. You can share content from the following locations:

* **Left-side nav panel**. Recommended when you are familiar with the content and need to quickly share with another user.
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
1. Click the three-dot icon and select **Pin** from the dropdown menu.<br/><img src={useBaseUrl('img/get-started/pin-search.png')} alt="pin-search.png" width="200"/>
1. A message appears telling you the location of your pinned search in the **Library**. The pinned search takes the name of the Search tab by default.<br/><img src={useBaseUrl('img/get-started/pinmessage.png')} alt="pinmessage.png" width="350"/>
1. To change the name of a pinned search, double-click the Search tab and enter a new name in the name field.

Once a search is pinned, it cannot be unpinned, but you can remove it from the **Pinned Searches** tab. You can pin up to 10 searches at a time. Queries that use the [`save` operator](/docs/search/search-query-language/search-operators/save) cannot be pinned.

For more information, see [Pinned Searches](/docs/get-started/library#pinned-searches).


## Administrator tasks

:::info
You'll need Sumo Logic Admin role privileges to perform most of these tasks.
:::

### Configuration

With the Sumo Logic Administrator role, you can manage your organization's data collection settings, ingest budget, partitions, and more. To access these settings, go to the top nav bar and click the **Configuration** icon.<br/><img src={useBaseUrl('img/get-started/config.png')} alt="config.png" width="400"/>

* **Collection**. [Collection](/docs/send-data/collection/), [OpenTelemetry Collection](/docs/send-data/opentelemetry-collector/), [Source Template](/docs/send-data), [Status](/docs/manage/ingestion-volume/collection-status-page/), [Ingest Budget](/docs/manage/ingestion-volume/ingest-budgets/), [Archive](/docs/manage/data-archiving/archive), [Data Archiving](/docs/manage/data-archiving/).
* **Logs**. [Fields](/docs/manage/fields/), [Field Extraction Rules](/docs/manage/field-extractions/), [Partitions](/docs/manage/partitions-data-tiers/), [Scheduled Views](/docs/manage/scheduled-views/), [Data Forwarding](/docs/manage/data-forwarding/), [Threat Intelligence](/docs/platform-services/threat-intelligence-indicators/).
* **Metrics**. [Metrics Rules](/docs/metrics/metric-rules-editor/), [Logs-to-Metrics](/docs/metrics/logs-to-metrics/), [Metrics Transformation Rules](/docs/metrics/metrics-transformation-rules/).
* **Monitoring**. [Connections](/docs/alerts/webhook-connections).

### Administration

With the Sumo Logic Administrator role, you can manage user accounts, user roles, security, and more. To access these admin settings, go to the top nav bar and click the **Administration** icon.<br/><img src={useBaseUrl('img/get-started/admin.png')} alt="img/get-started/admin.png" width="400"/>

* **Account**. [Account Overview](/docs/manage/manage-subscription), [Data Management](/docs/manage/ingestion-volume/data-volume-index), [Manage Plan](/docs/manage/manage-subscription/upgrade-cloud-flex-credits-account), [Metrics Data Ingestion](/docs/metrics/metrics-dpm).
* **Users and Roles**. [Users](/docs/manage/users-roles/users), [Roles](/docs/manage/users-roles/roles).
* **Account Security Settings**. [Installation Tokens](/docs/manage/security/installation-tokens), [Access Keys](/docs/manage/security/access-keys), [Password Policy](/docs/manage/security/set-password-policy), [Policies](/docs/manage/security/audit-indexes/audit-index), [Service Allowlist Settings](/docs/manage/security/create-allowlist-ip-cidr-addresses), [SAML](/docs/manage/security/saml).

### Content Administrator Library

The **Content Administrator** library is available to Administrator roles only. To browse this content, go to **Library** > click the **View as** dropdown > click **Content Administrator**.<br/><img src={useBaseUrl('img/get-started/library-content-admin.gif')} alt="library-content-admin.gif" width="450"/>

## Become a Sumo Logic Pro user

Now that you're familiar with the layout and features in the Sumo Logic UI, you're ready to ramp up your Sumo skills with [self-paced training](https://www.sumologic.com/self-paced-training/).

You don't have to stop there either. You can take the next step and become Sumo Certified. For more information on the Sumo Logic Certification program courses, go to the **Home** page and click the **Certification** tab. See [Certification FAQs](/docs/get-started/faq#certification-faq) for more information.

## More Information

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

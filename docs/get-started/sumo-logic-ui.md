---
id: sumo-logic-ui
title: Tour the Sumo Logic UI
description: Get to know the Sumo Logic platform user interface.
---

<!-- After Classic UI has retired:
remove the Classic UI doc and all remaining references to it
add back this opening paragraph: Our [Quickstart](/docs/get-started/quickstart) introduced you to the process of getting data into Sumo Logic, searching and analyzing your data, and then sharing your findings with your colleagues.
-->

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

You open Sumo Logic to get answers, not to hunt for where things moved. This guide tours the Sumo Logic UI, the default experience for all users, so you can find your way around from the start.

<img src={useBaseUrl('img/get-started/overview-new-ui.png')} alt="Overview screenshot example New UI" style={{border: '1px solid gray'}} width="800" />

The current Sumo Logic UI offers:

* **Everything in one place**. Unified experience across operational and security analytics products, so you do not have to switch between different interfaces.
* **Accelerate your work**. Faster load times and improved caching mean less waiting and more doing.
* **Pick up where you left off**. Stateful URLs automatically save your session, making it easy to resume work after logging in.
* **Find what you need instantly**. Use-case-driven navigation helps you locate key features without digging through menus.

:::training Micro Lesson
Watch this quick overview video to explore the key features of our UI.

<Iframe url="https://fast.wistia.net/embed/iframe/ydmxwi7ndm?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Sumo Logic's Unified Experience UI Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>
  
:::

:::warning Classic UI retirement notice
Starting October 29, 2026, newly created standalone Sumo Logic accounts default to the New UI and do not have the option to switch to the Classic UI. Parent organizations, their child organizations, and existing accounts keep their current settings for now, and the Classic UI will eventually be retired for everyone. We will communicate the exact retirement date closer to the transition. Switching requires no data migration; everything carries over automatically. For the best experience, switch to the New UI now. Need to reference the old interface in the meantime? See the [Classic UI documentation](/docs/get-started/sumo-logic-ui-classic).
:::


## Home

You'll land on the Sumo Logic **Home** page, which provides an at-a-glance view of the following:

* Recently Opened Dashboards
* Recently Run Searches
* Recommended Dashboards 
* Pinned Searches<br/><img src={useBaseUrl('img/get-started/dashboard-searches.png')} alt="Dashboard searches" style={{border: '1px solid gray'}} width="500" />

## Left navigation panel

The left nav panel lets you access all Sumo Logic features, such as Logs, Observability, Cloud SIEM, and more.

### Dashboards and searches

Access your dashboard libraries, searches, folders, and your personal collection of dashboards. Click the icons at the top of the left-side nav panel to view:

* Your **Library**, which contains:
   * Your own **Installed Apps** from the App Catalog.
   * Your **Personal** dashboards and searches.
   * Dashboards and searches shared within your organization.<br/><img src={useBaseUrl('/img/get-started/library.png')} alt="Library" style={{border: '1px solid gray'}} width="500"/> <br/>Click **Open library page** to use the **Library** search bar to find items quickly. **View as** mode should be set to **Me**.<br/><img src={useBaseUrl('img/get-started/library-search.png')} alt="Library search" style={{border: '1px solid gray'}} width="700"/> <br/>If you're an admin, you can view the Library in Content Administrator mode. The **Content Administrator** library is available to Administrator roles only. To browse this content, go to **Library** > click **Open Library page** > click the **View as** dropdown > click **Content Administrator**.<br/><img src={useBaseUrl('img/get-started/library-content-admin.gif')} alt="Library content admin" width="800"/>
* **Recent** dashboards and searches.<br/><img src={useBaseUrl('/img/get-started/recent.png')} alt="Recent" width="400"/>
* Your **Favorites** list of favorited dashboards and searches.<br/><img src={useBaseUrl('/img/get-started/favs.png')} alt="Favs" style={{border: '1px solid gray'}} width="400"/>

:::tip
Enlarge your working area by hiding the left-side nav panel. Just click the hamburger menu icon. To unhide it, click the hamburger menu icon again.<br/><img src={useBaseUrl('/img/get-started/hamburger.gif')} alt="Hamburger" width="300"/>
:::

## Top navigation bar

The global toolbar (top nav bar) provides access to critical functions and settings, in the following order: [Go To...](#go-to-menu-options), [Help](/docs/get-started/help), and your user profile options ([Notifications](/docs/get-started/account-settings-preferences) and [Preferences](/docs/get-started/account-settings-preferences)).

<img src={useBaseUrl('/img/get-started/admin-config.png')} alt="Admin config" style={{border: '1px solid gray'}} width="300"/>

### Go To... menu options

Use the **Go To...** menu for quick access to settings, features, library content, monitors, and SLOs. <img src={useBaseUrl('img/get-started/go-to-menu.png')} alt="Go To menu bar" style={{border: '1px solid gray'}} width="600"/>

### Preferences

You can manage your personal account settings from the **Preferences** page. These settings apply only to your account. Changes you make to your preferences take effect the next time you sign in, not during the current session.

To manage your personal Sumo Logic account preferences:

1. From the top nav bar, click the person icon <img src={useBaseUrl('img/get-started/acct-pref.png')} alt="Account Preferences" width="25"/>, and then from the dropdown, select **Preferences**.
1. In the Preferences page, you can modify the following settings:
    * **My Profile**. Username and password.
    * **My Preferences**. Your account session settings.

For more information, see [Account Preferences and Credentials](account-settings-preferences.md).

## Customize your environment with tabs

To enhance multitasking, you can now keep multiple tab open simultaneously (for example: log search, dashboards, App Catalog, and Preferences) using your web browser's tab grouping functionality. By adding Sumo Logic tabs to a tab group, any new tabs opened within the Sumo Logic platform will automatically open in the same tab group.

<img src={useBaseUrl('/img/get-started/tabs.png')} alt="Tabs" width="500" />

This also allows you to collapse the tab group to reclaim valuable real estate in your browser's tab bar.

<!--

## Become a Sumo Logic Pro user

Now that you're familiar with the layout and features in the Sumo Logic UI, you're ready to ramp up your Sumo skills with [self-paced training](https://www.sumologic.com/self-paced-training/).

You do not have to stop there either. You can take the next step and become Sumo Certified. For more information on the Sumo Logic Certification program courses, go to the **Home** page and click the **Certification** tab. See [Certification FAQs](/docs/get-started/training-certification-faq) for more information.

-->

<!--
This section is on hold pending finalization of UI.
## Mastering everyday tasks

This section provides information on how to perform basic everyday tasks using the Sumo Logic UI.

### Analysts (all users)

* [Launch log searches, metrics visualizations, and Live Tail sessions](#launch-searches-metrics-visualizations-andlive-tail-sessions)
* [View recent dashboards and searches](#accessdashboards-and-searches)
* [View Favorites and add dashboards and searches to the list](#add-dashboards-and-searches-to-your-favorites)
* [Share a dashboard, search, or folder](#share-a-dashboard-search-or-folder)
* [View content that is shared with you](#view-content-that-is-shared-with-you)
* [Pin and manage searches](#pin-and-managesearches)
* [Manage your personal account preferences](#manage-your-personal-account-preferences)
* [Get help: Sumo Docs, Community, and more](#get-support)

### Administrators

* [Manage data collection, data settings, and alerts](#configuration)
* [Manage accounts, users, and security](#administration)

### Launch searches, metrics visualizations, and Live Tail sessions 

This section shows you how to get started working with logs and metrics. The links provided direct you to more in-depth information.

To launch a log search, metrics visualization, or Live Tail session, do the following:

Click one of the following left-side nav menu icons:
* [Logs](/docs/search/get-started-with-search/search-basics). Open the Search page to search logs.
* [Metrics](/docs/metrics). Open the Metrics page to create a metrics visualization.
* [Logs > Live Tail](/docs/search/live-tail). View a real-time live feed of log events associated with a Source or Collector.

### Add dashboards and searches to your Favorites

You can create a list of favorite dashboards and log searches that appear in the left-side nav panel. Your [**Favorites** list](#accessdashboards-and-searches) makes it easy to access your most frequently used dashboards and searches.

To add a dashboard to your Favorites:
1. Open any dashboard.
1. Click the three-dot kebab icon at the top right of the menu bar, then select **Favorite** from the dropdown list. <br/><img src={useBaseUrl('img/get-started/ui/WTS_UI_Add-dashboard-to-Favorites.png')} alt="Add dashboard to favorites list" style={{border: '1px solid gray'}} width="800" />

To add a log search to your Favorites:
1. [Save the search](/docs/search/get-started-with-search/search-basics/save-search) (if not already saved) by clicking **Save As**. Then in the Save Item dialog enter a name, description, and select a folder in which to save the search.
1. Click **Save**.
1. Click the three-dot kebab icon and select **Favorite** from the dropdown list. <br/><img src={useBaseUrl('img/get-started/favorite-saved-search.png')} alt="Favorite saved search" width="200"/>

### Share a dashboard, search, or folder

You can share dashboards, searches, and folders with users and roles. You can edit the sharing permissions at any time and share or revoke permissions as needed. You can share content from the following locations:

* **Left-side nav panel**. Recommended when you are familiar with the content and need to quickly share with another user.
* **Library**. Recommended when you need a detailed view of the content, who created it, and when it was last modified.

For walkthrough instructions, go to the [Share Content](/docs/manage/content-sharing) page. 

### View content that is shared with you

To see dashboards, searches, and folders that have been shared with you, do the following:

1. From the left-side nav, click **Recent**.<br/><img src={useBaseUrl('img/get-started/recent.png')} alt="Recent" width="400"/>
1. Toggle between **Recently Opened By Me** or **Recently Shared With Me**.<br/><img src={useBaseUrl('img/get-started/ui/Dash3.png')} alt="Dropdown menu with Recently Opened By and Recently Shared With Me options" width="200"/>

### Pin and manage searches

After you start a log search, you can “pin” it, and it will run in the background for up to 24 hours. If the search does not finish in that time frame, it is paused. You can restart the search at any time. Search results are available for three days.

You need to start a search for the **Pin** option to appear. To pin a search, do the following:

1. Open a Search page.
1. Enter a query in the search box and click **Start**.
1. Click the three-dot icon and select **Pin** from the dropdown menu.<br/><img src={useBaseUrl('img/get-started/pin-search.png')} alt="Pin search" width="200"/>
1. A message appears telling you the location of your pinned search in the **Library**. The pinned search takes the name of the Search tab by default.<br/><img src={useBaseUrl('img/get-started/pinmessage.png')} alt="Pinmessage" width="350"/>
1. To change the name of a pinned search, double-click the Search tab and enter a new name in the name field.

Once a search is pinned, it cannot be unpinned, but you can remove it from the **Pinned Searches** tab. You can pin up to 10 searches at a time. Queries that use the [`save` operator](/docs/search/search-query-language/search-operators/save) cannot be pinned.

For more information, see [Pin a Search](/docs/search/get-started-with-search/search-page/pin-a-search).


## Administrator tasks

:::info
You'll need Sumo Logic Administrator role privileges to perform most of these tasks.
:::

-->

## FAQ

This FAQ answers common questions about the Sumo Logic UI.

### What is the Sumo Logic Unified Experience?
The Sumo Logic Unified Experience, known internally as Project Kanso, takes its name from the Japanese principle of simplicity and clutter elimination. It brings Log Analytics, Cloud SIEM, and Cloud SOAR together under one navigation system, with interface enhancements that make every Sumo Logic feature more accessible and easier to use.

### How does navigation work across products?
Log Analytics, Cloud SIEM, and Cloud SOAR share one navigation system, so you do not have to learn different interface patterns for different tools.

The left nav panel organizes features around use cases, such as infrastructure monitoring, application monitoring, log analysis, and security monitoring and analytics, so you can find what you need without digging through a list of tool names.

Each page you open runs in its own browser tab, so you can use your browser's native navigation features, like the back button and tab grouping, to organize your work.

### What are the key features of the UI?
* **Unified navigation**. One consistent navigation system across Log Analytics, Cloud SIEM, and Cloud SOAR, for a single experience across observability and security use cases.
* **Use-case-based organization**. The left nav panel organizes features around use cases like infrastructure monitoring, application monitoring, log analysis, and security monitoring.
* **Native browser tabs**. Each page opens in its own browser tab, so pages load quickly and you can organize tabs the way you already do in other applications.
* **Stateful URLs**. Most page URLs reflect your current view, so you can copy and share a URL with a teammate, or navigate back to a previous view using your browser's back button.

### How can I avoid ending up with too many open browser tabs?
Sumo Logic tabs use your browser's native tab capability, including tab grouping and coloring, so you can manage them the same way you manage any other browser tabs. If you prefer to keep Sumo Logic content inside a single tab, enable the **Enable in-app tabs** [preference](/docs/get-started/account-settings-preferences/#in-app-tabs) for Log Search, Dashboards, and Metrics, or use [tab grouping functionality](#customize-your-environment-withtabs) to keep your workspace organized.

### Why do my browser tabs reload when I log back in?
If you leave browser tabs open across sessions, Sumo Logic automatically reloads them when you log back in. Tab usage data showed that only a small portion of previously opened tabs are actively used, so leaving them open tends to clutter your browser instead of helping you.

<img src={useBaseUrl('img/get-started/tab-reload.gif')} alt="Tab reload" />

The **Recents** feature in the navigation bar gives you quick access to recently opened content instead. We're working to extend it to more content types over time.

### Can I still use the Classic UI?
Starting October 29, 2026, newly created standalone Sumo Logic accounts no longer have the option to switch to the Classic UI. Parent organizations and their child organizations keep their current settings for now. If your account still has access to the Classic UI, you can select **Switch to classic UI** from the left navigation menu to use it temporarily. See the [Classic UI documentation](/docs/get-started/sumo-logic-ui-classic) if you need it in the meantime. The Classic UI will eventually be retired for all accounts; we will communicate the exact date closer to the transition.

<img src={useBaseUrl('img/get-started/return-to-classic.png')} alt="Return to classic" width="200"/>

## Get support

For questions or issues, contact [Support](https://support.sumologic.com/) or join our [Sumo Logic Slack](https://sumodojo.slack.com/) channel.

Have feedback? Send it to [our UX Team](mailto:sumologic-ux-research@sumologic.com).

---
id: sumo-logic-ui
title: Tour the Sumo Logic UI
sidebar_label: Tour the Sumo UI (New)
description: Get to know the Sumo Logic platform user interface.
---

<!--
When officially GA'd (est. Apr-Aug 2025):
retire the Classic UI version
add back this opening paragraph: Our [Quickstart](/docs/get-started/quickstart) introduced you to the process of getting data into Sumo Logic, searching and analyzing your data, and then sharing your findings with your colleagues.
-->

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

This guide will help you get started with the new and improved Sumo Logic user interface, designed for faster speed and a more intuitive experience.

<img src={useBaseUrl('img/get-started/overview-new-ui.png')} alt="Overview screenshot example New UI" style={{border: '1px solid gray'}} width="800" />

With the new UI, you'll benefit from:

* **Everything in one place**. Unified experience across operational and security analytics products, so you don’t have to switch between different interfaces.
* **Accelerate your work**. Faster load times and improved caching mean less waiting and more doing.
* **Pick up where you left off**. Stateful URLs automatically save your session, making it easy to resume work after logging in.
* **Find what you need instantly**. Use-case-driven navigation helps you locate key features without digging through menus.

:::sumo quickstart
Watch this quick overview video to explore the key features of the New UI.

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

<!-- old
<Iframe url="https://www.youtube.com/embed/86IJB6JrG_k?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
-->  
:::

:::warning Classic UI retirement notice
The Classic UI will be retired in 2025 and will no longer receive updates. The exact date will be communicated closer to the transition. For the best experience, we strongly recommend using the New UI. Need to reference the old interface? See the [Classic UI documentation](/docs/get-started/sumo-logic-ui-classic).
:::


## Home

You'll land on the Sumo Logic **Home** page, which provides an at-a-glance view of the following:

* Recently Opened Dashboards
* Recently Run Searches
* Recommended Dashboards 
* Pinned Searches<br/><img src={useBaseUrl('img/get-started/dashboard-searches.png')} alt="dashboard-searches.png" style={{border: '1px solid gray'}} width="800" />

## Left navigation panel

The left nav panel lets you access all Sumo Logic features, such as Logs, Observability, Cloud SIEM, and more.

### Dashboards and searches

Access your dashboard libraries, searches, folders, and your personal collection of dashboards. Click the icons at the top of the left-side nav panel to view:

* Your **Library**, which contains:
   * Your own **Installed Apps** from the App Catalog.
   * Your **Personal** dashboards and searches.
   * Dashboards and searches shared within your organization.<br/><img src={useBaseUrl('/img/get-started/library.png')} alt="library.png" style={{border: '1px solid gray'}} width="400"/> <br/>Click **Open library page** to use the **Library** search bar to find items quickly. **View as** mode should be set to **Me**.<br/><img src={useBaseUrl('img/get-started/library-search.png')} alt="library-search.png" style={{border: '1px solid gray'}} width="700"/> <br/>If you're an admin, you can view the Library in [Content Administrator](#content-administrator-library) mode.
* **Recent** dashboards and searches.<br/><img src={useBaseUrl('/img/get-started/recent.png')} alt="recent.png" width="400"/>
* Your **Favorites** list of favorited dashboards and searches.<br/><img src={useBaseUrl('/img/get-started/favs.png')} alt="favs.png" style={{border: '1px solid gray'}} width="400"/>

:::tip
Enlarge your working area by hiding the left-side nav panel. Just click the hamburger menu icon. To unhide it, click the hamburger menu icon again.<br/><img src={useBaseUrl('/img/get-started/hamburger.gif')} alt="hamburger.gif" width="300"/>
:::

## Top navigation bar

The global toolbar (top nav bar) provides access to critical functions and settings, in the following order: [Go To...](#go-to-menu-options), [Help](/docs/get-started/help), [Configuration](/docs/send-data), [Administration](/docs/manage), and your user profile options ([Notifications](/docs/get-started/account-settings-preferences) and [Preferences](/docs/get-started/account-settings-preferences)).

<img src={useBaseUrl('/img/get-started/admin-config.png')} alt="admin-config.png" style={{border: '1px solid gray'}} width="350"/>

### Go To... menu options

Use the **Go To...** menu for quick access to settings and features. <img src={useBaseUrl('img/get-started/go-to-menu.png')} alt="Go To menu bar" style={{border: '1px solid gray'}} width="500"/>

### Configuration

With the Sumo Logic Administrator role, you can manage your organization's data collection settings, ingest budget, partitions, and more. To access these settings, go to the top nav bar and click the **Configuration** icon.<br/><img src={useBaseUrl('img/get-started/config.png')} alt="config.png" width="300"/>

* **Collection**. [Collection](/docs/send-data/collection/), [OpenTelemetry Collection](/docs/send-data/opentelemetry-collector/), [Source Template](/docs/send-data), [Status](/docs/manage/ingestion-volume/collection-status-page/), [Ingest Budget](/docs/manage/ingestion-volume/ingest-budgets/), [Health Events](/docs/manage/health-events/), [Archive](/docs/manage/data-archiving/archive), [Data Archiving](/docs/manage/data-archiving/).
* **Logs**. [Fields](/docs/manage/fields/), [Field Extraction Rules](/docs/manage/field-extractions/), [Partitions](/docs/manage/partitions/), [Scheduled Views](/docs/manage/scheduled-views/), [Data Forwarding](/docs/manage/data-forwarding/), [Threat Intelligence](/docs/platform-services/threat-intelligence-indicators/).
* **Metrics**. [Metrics Rules](/docs/metrics/metric-rules-editor/), [Logs-to-Metrics](/docs/metrics/logs-to-metrics/), [Metrics Transformation Rules](/docs/metrics/metrics-transformation-rules/).
* **Monitoring**. [Connections](/docs/alerts/webhook-connections).

### Administration

With the Sumo Logic Administrator role, you can manage user accounts, user roles, security, and more. To access these admin settings, go to the top nav bar and click the **Administration** icon.<br/><img src={useBaseUrl('img/get-started/admin.png')} alt="Administration icon" width="300"/>

* **Account**. [Account Overview](/docs/manage/manage-subscription), [Data Management](/docs/manage/ingestion-volume/data-volume-index), [Manage Plan](/docs/manage/manage-subscription), [Metrics Data Ingestion](/docs/metrics/metrics-dpm).
* **Users and Roles**. [Users](/docs/manage/users-roles/users), [Roles](/docs/manage/users-roles/roles).
* **Account Security Settings**. [Installation Tokens](/docs/manage/security/installation-tokens), [Access Keys](/docs/manage/security/access-keys), [Password Policy](/docs/manage/security/set-password-policy), [Policies](/docs/manage/security/audit-indexes/audit-index), [Service Allowlist Settings](/docs/manage/security/create-allowlist-ip-cidr-addresses), [SAML](/docs/manage/security/saml).

#### Content Administrator Library

The **Content Administrator** library is available to Administrator roles only. To browse this content, go to **Library** > click **Open Library page** > click the **View as** dropdown > click **Content Administrator**.<br/><img src={useBaseUrl('img/get-started/library-content-admin.gif')} alt="library-content-admin.gif" width="800"/>

### Preferences

You can manage your personal account settings from the **Preferences** page. These settings apply only to your account. Changes you make to your preferences take effect the next time you sign in, not during the current session.

To manage your personal Sumo account preferences:

1. From the top nav bar, click the person icon, and then from the dropdown, select **Preferences**.<br/><img src={useBaseUrl('img/get-started/acct-pref.png')} alt="Account Preferences" width="300"/>
1. In the Preferences page, you can modify the following settings:
    * **My Profile**. Username and password.
    * **My Preferences**. Your account session settings.

For more information, see [Account Preferences and Credentials](account-settings-preferences.md).

## Customize your environment with tabs

To enhance multitasking, you can now keep multiple tab open simultaneously (for example: log search, dashboards, App Catalog, and Preferences) using your web browser's tab grouping functionality. By adding Sumo Logic tabs to a tab group, any new tabs opened within the Sumo Logic platform will automatically open in the same tab group.

<img src={useBaseUrl('/img/get-started/tabs.png')} alt="tabs.png" width="500" />

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
1. Click the three-dot kebab icon at the top right of the menu bar, then select **Favorite** from the dropdown list. <br/> ![WTS_UI_Add-dashboard-to-Favorites.png](/img/get-started/WTS_UI_Add-dashboard-to-Favorites.png)

To add a log search to your Favorites:
1. [Save the search](/docs/search/get-started-with-search/search-basics/save-search) (if not already saved) by clicking **Save As**. Then in the Save Item dialog enter a name, description, and select a folder in which to save the search.
1. Click **Save**.
1. Click the three-dot kebab icon and select **Favorite** from the dropdown list. <br/><img src={useBaseUrl('img/get-started/favorite-saved-search.png')} alt="favorite-saved-search.png" width="200"/>

### Share a dashboard, search, or folder

You can share dashboards, searches, and folders with users and roles. You can edit the sharing permissions at any time and share or revoke permissions as needed. You can share content from the following locations:

* **Left-side nav panel**. Recommended when you are familiar with the content and need to quickly share with another user.
* **Library**. Recommended when you need a detailed view of the content, who created it, and when it was last modified.

For walkthrough instructions, go to the [Share Content](/docs/manage/content-sharing) page. 

### View content that is shared with you

To see dashboards, searches, and folders that have been shared with you, do the following:

1. From the left-side nav, click **Recent**.<br/><img src={useBaseUrl('img/get-started/recent.png')} alt="recent.png" width="400"/>
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

For more information, see [Pinned Searches](/docs/get-started/library/#pinned-searches).


## Administrator tasks

:::info
You'll need Sumo Logic Administrator role privileges to perform most of these tasks.
:::

-->

## FAQ

This FAQ provides answers to common questions about the Sumo Logic UI redesign, which involves transitioning from the legacy Classic UI to the New UI.

<details>
<summary><strong>Q:</strong> What is being launched?</summary>

We are excited to introduce the Sumo Logic Unified Experience, internally known as Project Kanso, inspired by the Japanese principle of simplicity and clutter elimination. This initiative integrates the capabilities of our Log Analytics, Cloud SIEM, and Cloud SOAR into a unified navigation system. Alongside this integration, we have implemented several user interface enhancements to make all Sumo Logic features more accessible and user-friendly.
</details>

<details>
<summary><strong>Q:</strong> What issues does the New UI resolve?</summary>

The disparate user interface and varying navigation patterns among Log Analytics, Cloud SIEM, and Cloud SOAR have made it challenging for users to effectively utilize these tools together for monitoring and troubleshooting.

The current information architecture and navigation system have not effectively showcased useful functionalities to users. It's structured around tools like Traces, Log Search, and Metric Search rather than focusing on user-centric use cases. This places a burden on users to discover these functionalities.

In-app tabs present performance and usability challenges since they all operate within a single browser tab. These tabs disrupt native browser navigation features like the back button and tab grouping. The New UI navigation lets you leverage native browser capabilities and customize tab organization according to your preferences.
</details>

<details>
<summary><strong>Q:</strong> What changes have been implemented that enhance my Sumo experience?</summary>

* **Unified Navigation**. You'll now notice a uniform navigation system across Log Analytics, Cloud SIEM, and Cloud SOAR products, ensuring a consistent experience for Sumo Logic users engaged in both observability and security use cases.
* **Improved Product Discoverability**. The left nav panel now organizes product features in a solution-centric manner, emphasizing key use cases like infrastructure monitoring, application monitoring, log analysis, security monitoring, and analytics. This reorganization aims to facilitate easier access to Sumo Logic's product features.
* **Enhanced Browsing Experience and Accelerated Performance**. In-app tabs will be replaced with native browser tabs, significantly improving _First Contentful Paint_ (FCP) and _Time to Interactive_ (TTI) metrics. With this change, you'll experience faster page load times and ability to organize tabs the way you are used to with other applications.
* **Stateful URLs**. Most of the page URLs will now be stateful, allowing you to easily share content with your team members. Any changes made in the UI will be reflected in the URL parameters, making it simple for you to copy and share URLs. Additionally, this feature enables users to navigate back to previous states effortlessly by using the browser.
</details>

<details>
<summary><strong>Q:</strong> With all Sumo Logic tabs being grouped together in one browser tab, how can I prevent an excessive amount of tabs in my browser? </summary>

We understand that the removal of in-app tabs in the New UI is a significant change in our user workflow, eliciting mixed feedback. While some users appreciate the convenience of consolidated tabs within the app, others question the need for this change. Addressing performance concerns, consolidating tabs aims to reduce browser clutter, albeit potentially complicating session management. For users who prefer centralized Sumo Logic tabs, we recommend utilizing [tab grouping functionality](#customize-your-environment-withtabs) for a seamless experience.

| Classic UI | New UI |
|:---|:---|
| In-house tabs solution. Always trying to keep up with browser tab improvements. | Utilizes browser’s native tab capability like tab grouping and coloring. |
| User needs to learn new way of organizing tabs. Managing multiple Sumo instances is difficult. | User utilizes what they already know. Managing multiple Sumo instances is easier. |
| Performance degrades over long usage because user is using one browser tab. | Memory usage is distributed over different tabs. |
| Tab switches reload the tab. | Tab switches won’t reload the tab. This will accelerate time to load, which is especially useful for data-rich features like Dashboards. |

</details>

<details>
<summary><strong>Q:</strong> Will the New UI retain the Classic UI feature of remembering previously opened tabs from my previous session?</summary>

After analyzing tab usage data, we've found that a minimal portion of previously opened tabs are actively utilized by our users. Consequently, the Sumo Logic UI often remains cluttered with multiple unused tabs. With the introduction of the New UI experience, if you fail to close browser tabs from previous sessions, they will automatically reload upon login.

<img src={useBaseUrl('img/get-started/tab-reload.gif')} alt="tab-reload.gif" />

Moreover, we've made the **Recents** feature more prominent in the navigation bar and plan to extend it to other content types which will make it easier for users to open recently opened tabs.
</details>

<details>
<summary><strong>Q:</strong> How do I access the Classic UI?</summary>

The New UI is the future of Sumo Logic, offering better performance, easier navigation, and exclusive new features. While we understand that transitions take time, we strongly recommend using the New UI for the best experience.

If you switch back to the Classic UI, you will not have access to:
* Faster load times and improved performance.
* New UI enhancements and upcoming feature releases.
* Stateful URLs that save your session and make sharing easier.
* More intuitive navigation for faster workflows.

The Classic UI will be retired in 2025 and will no longer receive updates. The exact date will be communicated closer to the transition. If you still need to access it temporarily, select **Return to classic UI** from the left navigation menu.

<img src={useBaseUrl('img/get-started/return-to-classic.png')} alt="return-to-classic.png" width="200"/>

We encourage you to stay in the New UI and take advantage of its benefits!

</details>

## Get support

For questions or issues, contact [Support](https://support.sumologic.com/) or join our [Sumo Logic Slack](https://sumodojo.slack.com/) channel.

Have feedback? Send it to [our UX Team](mailto:sumologic-ux-research@sumologic.com).

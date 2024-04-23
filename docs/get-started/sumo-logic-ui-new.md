---
id: sumo-logic-ui-new
title: Tour the New Sumo Logic UI
description: Get to know the Sumo Logic platform user interface.
---

<!--
When Open Beta'd (est. Aug 2024):
remove no-index
place doc in sidebars.ts
rename the old UI "Classic"
add announcement banner.

When GA'd (est. Nov 2024):
remove beta badge
rename this 'sumo-logic-ui'
retire the Classic UI version
add back this opening paragraph: Our [Quickstart](/docs/get-started/quickstart) introduced you to the process of getting data into Sumo Logic, searching and analyzing your data, and then sharing your findings with your colleagues.
-->

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

<p><a href="/docs/beta"><span className="beta">Closed Beta</span></a></p>

This page provides an overview of Sumo Logic **New UI**, currently in beta (slated for general availability in late 2024).

<Iframe url="https://www.youtube.com/embed/shtEqnPL-sc?si=sR26VYLt9NnqqghL?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

## Prerequisites

You'll need request access by contacting your Sumo Logic sales representative.

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

If you're an admin, you can view the Library in [Content Administrator](#content-administrator-library) mode.

:::tip
Enlarge your working area by hiding the left-side nav panel. Just click the hamburger menu icon. To unhide it, click the hamburger menu icon again.<br/><img src={useBaseUrl('/img/get-started/hamburger.gif')} alt="hamburger.gif" width="350"/>
:::

## Using the top navigation bar

### Access Apps, Admin settings

The global toolbar (top nav bar) provides you access to (from left to right): [Help](help.md), [App Catalog](apps-integrations.md), [(Data) Configuration](/docs/send-data), [Administration](/docs/manage), and your user profile options ([Notifications](account-settings-preferences.md) and [Preferences](account-settings-preferences.md)).

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

For more information, see [Pinned Searches](/docs/get-started/library/#pinned-searches).


## Administrator tasks

:::info
You'll need Sumo Logic Administrator role privileges to perform most of these tasks.
:::

-->

### Configuration

With the Sumo Logic Administrator role, you can manage your organization's data collection settings, ingest budget, partitions, and more. To access these settings, go to the top nav bar and click the **Configuration** icon.<br/><img src={useBaseUrl('img/get-started/config.png')} alt="config.png" width="400"/>

* **Collection**. [Collection](/docs/send-data/collection/), [OpenTelemetry Collection](/docs/send-data/opentelemetry-collector/), [Source Template](/docs/send-data), [Status](/docs/manage/ingestion-volume/collection-status-page/), [Ingest Budget](/docs/manage/ingestion-volume/ingest-budgets/), [Archive](/docs/manage/data-archiving/archive), [Data Archiving](/docs/manage/data-archiving/).
* **Logs**. [Fields](/docs/manage/fields/), [Field Extraction Rules](/docs/manage/field-extractions/), [Partitions](/docs/manage/partitions/), [Scheduled Views](/docs/manage/scheduled-views/), [Data Forwarding](/docs/manage/data-forwarding/), [Threat Intelligence](/docs/platform-services/threat-intelligence-indicators/).
* **Metrics**. [Metrics Rules](/docs/metrics/metric-rules-editor/), [Logs-to-Metrics](/docs/metrics/logs-to-metrics/), [Metrics Transformation Rules](/docs/metrics/metrics-transformation-rules/).
* **Monitoring**. [Connections](/docs/alerts/webhook-connections).

### Administration

With the Sumo Logic Administrator role, you can manage user accounts, user roles, security, and more. To access these admin settings, go to the top nav bar and click the **Administration** icon.<br/><img src={useBaseUrl('img/get-started/admin.png')} alt="img/get-started/admin.png" width="400"/>

* **Account**. [Account Overview](/docs/manage/manage-subscription), [Data Management](/docs/manage/ingestion-volume/data-volume-index), [Manage Plan](/docs/manage/manage-subscription), [Metrics Data Ingestion](/docs/metrics/metrics-dpm).
* **Users and Roles**. [Users](/docs/manage/users-roles/users), [Roles](/docs/manage/users-roles/roles).
* **Account Security Settings**. [Installation Tokens](/docs/manage/security/installation-tokens), [Access Keys](/docs/manage/security/access-keys), [Password Policy](/docs/manage/security/set-password-policy), [Policies](/docs/manage/security/audit-indexes/audit-index), [Service Allowlist Settings](/docs/manage/security/create-allowlist-ip-cidr-addresses), [SAML](/docs/manage/security/saml).

#### Content Administrator Library

The **Content Administrator** library is available to Administrator roles only. To browse this content, go to **Library** > click the **View as** dropdown > click **Content Administrator**.<br/><img src={useBaseUrl('img/get-started/library-content-admin.gif')} alt="library-content-admin.gif" width="450"/>

## Customize your environment with tabs

If you'd prefer to multitask and keep multiple tab open simultaneously (for example: log search, dashboards, App Catalog, and Preferences), we recommend utilizing your own web browser's tab grouping functionality. By adding Sumo Logic tabs to a tab group, any new tabs opened within the Sumo Logic platform will automatically open in the same tab group.

<img src={useBaseUrl('/img/get-started/tabs.png')} alt="tabs.png" width="500" />

This will also allow you to collapse the tab group to reclaim valuable real estate in your browser's tab bar.

<!--

## Become a Sumo Logic Pro user

Now that you're familiar with the layout and features in the Sumo Logic UI, you're ready to ramp up your Sumo skills with [self-paced training](https://www.sumologic.com/self-paced-training/).

You do not have to stop there either. You can take the next step and become Sumo Certified. For more information on the Sumo Logic Certification program courses, go to the **Home** page and click the **Certification** tab. See [Certification FAQs](/docs/get-started/training-certification-faq) for more information.

-->

## FAQ

This guide offers responses to frequently asked questions regarding the Sumo Logic UI redesign project, which involves transitioning from the current Classic UI to the upcoming New UI.

<details>
<summary><strong>Q:</strong> What's being launched?</summary>

We are excited to introduce the Sumo Logic Unified Experience, also known as Project Kanso, inspired by the Japanese principle of simplicity and clutter elimination. This initiative integrates the capabilities of our Log Analytics, Cloud SIEM, and Cloud SOAR into a unified navigation system. Alongside this integration, we have implemented several user interface enhancements to make all Sumo Logic features more accessible and user-friendly.
</details>


<details>
<summary><strong>Q:</strong> What issues does the New UI resolve?</summary>

The disparate user interface and varying navigation patterns among Log Analytics, Cloud SIEM, and Cloud SOAR have made it challenging for users to effectively utilize these tools together for monitoring and troubleshooting.

The current information architecture and navigation system have not effectively showcased useful functionalities to users. It's structured around tools like Explore, Traces, Log Search, and Metric Search rather than focusing on user-centric use cases. This places a burden on users to discover these functionalities.

In-app tabs present performance and usability challenges since they all operate within a single browser tab. These tabs disrupt native browser navigation features like the back button and tab grouping. The **New UI** navigation lets you leverage native browser capabilities and customize tab organization according to your preferences.
</details>


<details>
<summary><strong>Q:</strong> What changes have been implemented and how do they enhance my Sumo experience?</summary>

* **Unified Navigation**. You'll now notice a uniform navigation system across Log Analytics, Cloud SIEM, and Cloud SOAR products, ensuring a consistent experience for Sumo Logic users engaged in both observability and security use cases.
* **Improved Product Discoverability**. The left navigation bar now organizes product features in a solution-centric manner, emphasizing key use cases like infrastructure monitoring, application monitoring, log analysis, security monitoring, and analytics. This reorganization aims to facilitate easier access to Sumo Logic's product features.
* **Enhanced Browsing Experience and Accelerated Performance**. In-app tabs will be replaced with native browser tabs, significantly improving _First Contentful Paint_ (FCP) and _Time to Interactive_ (TTI) metrics. With this change, you'll experience faster page load times and ability to organize tabs the way you are used to with other applications.
* **Stateful URLs**. Most of the page URLs will now be stateful, allowing you to easily share content with your team members. Any changes made in the UI will be reflected in the URL parameters, making it simple for you to copy and share URLs. Additionally, this feature enables users to navigate back to previous states effortlessly by using the browser.
</details>


<details>
<summary><strong>Q:</strong> I have some concerns regarding unfamiliar experiences and potential issues arising from them. How is Sumo Logic addressing these concerns to ensure a seamless transition?</summary>

Understanding the challenges that come with change, we are confident that the **New UI** will offer our customers a notably enhanced, faster, and more seamlessly integrated experience. To facilitate a smooth transition, we have taken the following steps:

* **Dogfooding**. We at Sumo Logic are the biggest customer of our own platform. Through extensive dogfooding, we've gained a deep understanding of workflows and addressed any issues that arose.
* **Beta Testing**. We're conducting extensive beta testing with a large group of our customers. This allows us to gather feedback and address any pain points that may have been overlooked. If you'd like to participate, reach out to your Sumo Logic account executive.
* **Opt-in General Availability (GA)**. Additionally, we will have an opt-in period lasting at least three months. During this time, users can choose to opt-in to the new experience, enabling them to become familiar with it gradually before a complete switch occurs.
</details>


<details>
<summary><strong>Q:</strong> I like that all Sumo Logic tabs are grouped together in one browser tab. With this change, will I have an excessive amount of Sumo Logic tabs in my browser?</summary>

We're aware that the removal of in-app tabs may be the most significant change in our user workflow. We've received feedback from users, both positive and negative, regarding our tabs. While some users appreciate the convenience of having all the tabs within the app, others have questioned why we're trying to reinvent the tabs.

Having in-app tabs has caused performance issues, which has been a complaint about the Sumo Logic UI. On one hand, consolidating all the tabs together reduces the number of browser tabs, but on the other hand, it can make it difficult to manage multiple sessions.

If you prefer having all Sumo Logic tabs in one place - without getting mixed with other browser tabs - we suggest utilizing the [tab grouping functionality](#customize-your-environment-withtabs) offered by most browsers. By adding your Sumo Logic tab to a tab group, any new tabs opened within the Sumo Logic platform will automatically open in the same tab group. You can also collapse the tab group to reclaim valuable real estate in the browser's tab bar.
</details>


<details>
<summary><strong>Q:</strong> Will the New UI continue the functionality of remembering the tabs I had opened in my previous session, similar to the Classic UI?</summary>

After analyzing tab usage data, we've found that a minimal portion of previously opened tabs are actively utilized by our users. Consequently, the Sumo Logic UI often remains cluttered with multiple unused tabs. With the introduction of the **New UI** experience, if you fail to close browser tabs from previous sessions, they will automatically reload upon login.

<img src={useBaseUrl('img/get-started/tab-reload.gif')} alt="tab-reload.gif" />

Moreover, we've made the **Recents** feature more prominent in the navigation bar and plan to extend it to other content types which will make it easier for users to open recently opened tabs.
</details>


<details>
<summary><strong>Q:</strong> If I opt in to the New UI, will I lose access to the Classic UI?</summary>

No, opting for the **New UI** won't lock you out of the old interface. You'll have the flexibility to switch between the two experiences directly within the UI.

Once the feature flag is enabled, all organization users will see a **Switch to New UI** option in the left navigation menu. Clicking on this button allows users to opt into the **New UI**. Once opted in, the system will remember the preference, redirecting old URLs to their corresponding new ones. Consequently, subsequent logins will automatically direct users to the **New UI**.
</details>


<details>
<summary><strong>Q:</strong> How do I opt out of the New UI?</summary>

You have the flexibility to opt out whenever you choose. Just go to left navigation menu of the **New UI** and click the **Return to Classic UI** option. Once you've switched back to the **Classic UI**, all subsequent sessions will default to the **Classic UI** experience.

<img src={useBaseUrl('img/get-started/return-to-classic.png')} alt="return-to-classic.png" width="200"/>

If you enter the **New UI** URL in your browser, it will still direct you to the **New UI**. We have implemented a translation from the **Classic UI** to the **New UI**, but not the other way around.
</details>


<details>
<summary><strong>Q:</strong> When is Sumo Logic planning to remove access to the Classic UI?</summary>

Our goal is to turn off access to the Classic UI at the end of 2024. However, this timeline is subject to our successful beta testing.
</details>


<details>
<summary><strong>Q:</strong> Will there be any limitations on capabilities during the beta phase?</summary>

Our goal was to provide customers with access to the New UI as quickly as possible. As this is the beta version, we are currently addressing various bugs across different areas to enhance the overall experience.

Additionally, there are a few functionalities that are still in the process of being developed or migrated into the New UI. The key ones include:
* **Co-Branding**. Co-branded logos will not be visible on the platform.
* **SAML and Allowlist Pages**. These pages have not yet been migrated to the New UI.
* **Keyboard Shortcuts**. We will be rolling out the keyboard shortcuts incrementally.
* **Rich Tooltip in Navigation**. Similar to the Classic UI, future releases of the New UI will include rich tooltips when hovering over navigation content items, providing details such as owner and data access level.
* **URL Parameters**. URL parameters have been added to most pages to maintain page state. Currently, queries in the URL are plain text. We are working on compressing and encoding them. If your query exceeds ~10000 characters, you may encounter a "URI Too Large" error. In such cases, we recommend switching back to the old UI.
* **Content Admin Mode**. Recents and favorites will not load in content admin mode. We are actively enhancing the user experience for recents and favorites in this mode.
</details>

## Get support

Contact [Support](https://support.sumologic.com/) or head to our [Sumo Logic Slack](https://sumodojo.slack.com/) channel.

Have feedback? Send it to [our UX Team](mailto:sumologic-ux-research@sumologic.com).

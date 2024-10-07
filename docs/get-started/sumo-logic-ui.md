---
id: sumo-logic-ui
title: Tour the Sumo Logic UI
sidebar_label: Sumo Logic UI
description: Get to know the Sumo Logic platform user interface.
---

<!--
When officially GA'd (est. Nov 2024):
retire the Classic UI version
add back this opening paragraph: Our [Quickstart](/docs/get-started/quickstart) introduced you to the process of getting data into Sumo Logic, searching and analyzing your data, and then sharing your findings with your colleagues.
-->

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

This guide introduces you to the new, faster Sumo Logic UI.

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

:::tip
New to Sumo Logic? Start with our [Quickstart Guide](/docs/get-started/quickstart) to get up and running fast. You'll be introduced you to the process of getting data into Sumo Logic, searching and analyzing your data, and sharing your findings with your colleagues. 
:::

## Benefits

With the New UI, you can expect:

* Unified experience across operational and security analytics products.
* Faster load times with enhanced caching.
* Stateful URLs that save your place upon re-login.
* Use-case-based navigation for streamlined feature discovery.

You can view the full list of updates [here](/release-notes-service/2024/02/23/ui/).


## Switching to the New UI

To opt into the new UI, go to the left navigation panel and click **Switch to New UI**.

<img src={useBaseUrl('img/get-started/switch-new-ui.png')} alt="switch-new-ui.png" width="250"/>

## Home

When you first log in, you'll land on the Sumo Logic **Home** page > **Home** tab, which provides an at-a-glance view of the following:

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
    * **My Access Keys**. Add, edit, and remove access keys.
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

-->
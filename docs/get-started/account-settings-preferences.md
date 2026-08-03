---
id: account-settings-preferences
title: Account Preferences and Credentials
sidebar_label: Account Preferences
description: Update and manage your Sumo Logic account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/business/user-permissions.png')} alt="User Permissions icon" width="50"/>

You can review and update your personal account settings and login credentials at any time from your user menu, which includes **Notifications** and three settings tabs: **Preferences**, **Personal Access Keys**, and **Personal Authorized Apps**. Settings on all three tabs apply only to your account and do not affect other users in your organization.

## Accessing your account settings

* [**New UI**](/docs/get-started/sumo-logic-ui). In the top menu, select the person silhouette icon <img src={useBaseUrl('img/get-started/acct-pref.png')} alt="Account Preferences" width="20"/>.
* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select your username at the bottom.

From here, select one of the following tabs:

* **Preferences**. Your profile, security settings, and personal preferences. Covered below.
* **Personal Access Keys**. Create and manage access keys for your own use. See [Access Keys](/docs/manage/security/access-keys#from-the-personal-access-keys-tab).
* **Personal Authorized Apps**. View and revoke third-party apps you've authorized to access Sumo Logic on your behalf. See [Personal Authorized Apps](#personal-authorized-apps) below.

## Preferences

The **Preferences** tab has three sections: **My Profile** (your account info and login credentials), **My Security Settings** (2-step verification), and **My Preferences** (personal settings for timezone, navigation, search, and alerts).

### My Profile

Under **My Profile**, the following information is displayed:

* **First Name**. Your first name as it appears on your account and in the UI.
* **Last Name**. Your last name as it appears on your account and in the UI.
* **Email**. The Sumo Logic account email address ([you can change this](#change-email-address)).
* **Password**. Your Sumo Logic account password ([you can change this](#change-password)).
* **Organization ID**. Your organization's unique identifier in Sumo Logic.
* **Roles**. The Sumo Logic [roles](/docs/manage/users-roles/roles/add-remove-users-role/) assigned to your user account. If you're an Administrator, you can [manage users](/docs/manage/users-roles/users/), [assign roles](/docs/manage/users-roles/roles), and more.

#### Change email address

1. Access your [account settings](#accessing-your-account-settings) and select the **Preferences** tab.
1. Under **My Profile**, click **Change Email**.
1. In the dialog that appears, enter your new email address and follow the verification steps.

#### Change password

1. Access your [account settings](#accessing-your-account-settings) and select the **Preferences** tab.
1. Under **My Profile**, click **Change Password**.
1. Enter your current password, and then enter the new password twice to verify it.
1. Click **OK** to finalize the change.

You can also reset your password from your login screen by clicking **Forgot your password?**.

If you're an Administrator, you can [reset passwords](/docs/manage/users-roles/users/reset-user-password) for users in your org.

### My Security Settings

:::note
The **My Security Settings** section is visible only if an administrator has made 2-Step Verification mandatory for your organization. For more details, see [2-Step Verification for Administrators](/docs/manage/security/2-step-verification-admins).
:::

Set up 2-Step Verification using a TOTP (Time-Based One-Time Password) app, view or regenerate your backup codes, change your verification device, or disable 2-Step Verification if it's optional for your org. See [2-Step Verification for Users](/docs/manage/security/2-step-verification-users) for the full walkthrough.

### My Preferences

These settings apply only to your personal account and do not affect other users in your organization. Changes take effect the next time you sign in.

#### Timezone and Date Format

* **Default Timezone**. Change this setting if you want the Sumo Logic user interface to use your local time zone, or one different from the time zone in your log message timestamps. This is a personal setting; it doesn't change the time zone for anyone else in your organization. This option overrides the timezone set in your web browser, and affects all hours and minutes displayed in the user interface, including time ranges on the Search page, the Time column in the Messages pane, and in Dashboards. It does not affect the configurations of previously created Scheduled Searches. For more information, see [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference).
* **Always show the timezone offset in displayed timestamps**. This setting is enabled by default. Deselect this checkbox to hide the timezone offset in displayed timestamps.
* **Date format**. Select from the following international date format options:
   * Use the browser's default date format.
   * MM/DD/YYYY (04/22/2026)
   * DD/MM/YYYY (22/04/2026)
   * YYYY/MM/DD (2026/04/22)
   :::danger
   Changing the date format option will affect your saved searches in your [Library](/docs/get-started/library/). Any saved searches that use absolute dates for their time range must be updated to reflect the new format. [Scheduled Searches](/docs/alerts/scheduled-searches/) will continue to run as expected, but you will need to modify the date format if you reschedule a search.
   :::

#### General Settings

* **Receive email notifications whenever content is shared with you**. Receive an email when [content is shared with you in Sumo Logic](/docs/manage/content-sharing/), such as log searches, metric searches, dashboards, and folders.
* **Enable keyboard shortcuts**. [Keyboard shortcuts](/docs/get-started/keyboard-shortcuts) are enabled by default. Press **?** to see the list of shortcuts. To disable keyboard shortcuts, for example, if they conflict with an international keyboard, deselect the checkbox.
   :::note
   Keyboard shortcuts are disabled when typing in the [search text box](/docs/search/get-started-with-search/search-page/).
   :::
* **Web Session Timeout**. Choose how long your Sumo Logic session remains active before timing out. Options range from 5 minutes to 7 days. For details on web session timeouts and multi-account access, see [Multi-Account Access](/docs/manage/users-roles/users/multi-account-access).

#### Navigation

* **Open all navigation menu items in new browser tabs by default**. This preference is disabled by default, so selecting a menu link in the left navigation pane opens it in the same tab. To open a specific link in a new tab instead, hover over it and click the **Open in New Tab** button that appears next to it.<br/><img src={useBaseUrl('img/get-started/open-in-new-tab-button.png')} alt="Open in New Tab button" style={{border: '1px solid gray'}} width="125" /> Enabling this preference makes every menu link open in a new tab automatically, and hides the **Open in New Tab** button since it's no longer needed. However, even when this preference is enabled, the **Open in New Tab** button remains visible for menu items with subfolders, allowing you to click the menu item to view its subfolders and open them in a new tab.<br/><img src={useBaseUrl('img/get-started/open-in-new-tab-button-on-folder.png')} alt="Open in New Tab button" style={{border: '1px solid gray'}} width="250" />

#### Default Starting Page

Select the default page to appear when you log in to Sumo Logic. This preference applies only to users of the [**New UI**](/docs/get-started/sumo-logic-ui).

#### Theme

Choose whether the user interface displays in **Dark theme** or **Light theme**.

[**New UI**](/docs/get-started/sumo-logic-ui). Dark and Light theme support is available across the Sumo Logic Log Analytics Platform. You can select your preferred theme in **Account Preferences**, or use the global theme button in the top toolbar, located adjacent to the **Go to...** button, to switch themes instantly from anywhere in the platform.<br/><img src={useBaseUrl('img/get-started/global-theme-button.png')} alt="Global Theme Button" style={{border: '1px solid gray'}} width="300" />

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Select between **Light** or **Dark** mode in the **Account Preferences** page. This setting applies only to the user interface in the [Automation Service](/docs/platform-services/automation-service/), [Cloud SIEM](/docs/cse/), and [Cloud SOAR](/docs/cloud-soar/). A global setting is not supported at this time. You can also apply a [dark theme specifically for dashboards](/docs/dashboards/about/#dark-theme).

#### Query Editing

Select how you want to execute and format queries:

* **Return** to run the query, **Shift + Return** to create a new line. Suggestions appear automatically. Use **Tab** or **Enter** to select a suggestion.  
* **Command + Return** to run the query, **Return** to create a new line. Suggestions appear as you type. Use **Tab** to select a suggestion.  

After making any changes, click **Save**.

#### Log Search

* **Show confirmation dialog when closing a tab**. On the Search page, enable this option if you want to be prompted with a confirmation dialog before you can close a search tab.
* **Show search autocomplete suggestions while typing**. Keep this option selected to automatically open the search autocomplete dialog when editing a query.
   * To manually open the dialog, use `<Esc>` or `<Alt>` `<Space>`.
   * Deselect this option to disable [search autocomplete](/docs/search/get-started-with-search/search-basics/search-autocomplete).
* **Automatically run the search after selecting it from a list of saved searches**. By default, saved searches run automatically when selected. Deselect this option if you prefer to start searches manually.
* **Enable in-app tabs for Logs Search**. Select this checkbox to enable in-app tabs in the [**New UI**](/docs/get-started/sumo-logic-ui), letting you run and manage multiple searches within a single Log Search window instead of separate browser tabs. Keep long-running or reference searches open while you switch between other queries, and compare results across searches without losing context. To use in-app tabs, open a new tab within Log Search and run a query in each one. Switch between tabs at any time, reorder them by dragging, and scroll horizontally when you have more tabs open than fit on screen.

#### Alerts

Click any of the following checkboxes to enable your desired preferences:

* **Enable ingestion throttling notifications (Admin only)**. Only users with Administrator access can enable this option. Select this to be notified when your organization's logs, metrics, or traces ingestion is throttled. See [Ingestion - Throttling Limits](/docs/manage/manage-subscription/organization-usage-limits/#ingestion---throttling-limits) for details on baseline and throttling limits.
* **Display alert badge when my subscribed monitors are triggered**. Select this option to display a badge icon in the UI when you receive an alert for a monitor you're subscribed to.
* **Notify about only subscribed monitors**. Select this option to receive notifications only for monitors you're subscribed to.
* **Enable "Active alerts only" as default filter**. By default, your alerts list only displays alerts with an active status. Alerts with a resolved status are excluded.<br/> <img src={useBaseUrl('img/alerts/filter-active.png')} alt="Alert preferences" style={{border: '1px solid gray'}} width="500" />
* **Enable "My subscriptions" as default filter**. By default, alerts you are subscribed to will appear in your alerts list.<br/> <img src={useBaseUrl('img/alerts/filter-subscribe.png')} alt="Alert preferences" style={{border: '1px solid gray'}} width="500" />

## Personal Access Keys

The **Personal Access Keys** tab lets you create and manage access keys for your own use — to register Collectors, authenticate API requests, or authorize scripts and automation. Keys you create here use your own permissions, and are visible only to you; an administrator (or an Analyst with the Manage Access Keys role capability) can see keys created by everyone in your org from the separate, org-wide **Access Keys** tab under **Administration**.<br/><img src={useBaseUrl('/img/security/access-key-preferences-page.png')} alt="Personal Access Keys tab" style={{border: '1px solid gray'}} width="800"/>

For the full walkthrough, including CORS domain restrictions, scopes, and how to edit, rotate, or delete a key, see [Access Keys](/docs/manage/security/access-keys/#from-the-personal-access-keys-tab).

## Personal Authorized Apps

The **Personal Authorized Apps** tab lists third-party apps and OAuth clients you've personally authorized to access Sumo Logic on your behalf, such as AI clients connecting through [OAuth 2.0](/docs/manage/security/oauth). Revoking an app here does not affect other users who have separately authorized it.

{/* TODO: add screenshot of the Personal Authorized Apps list view */}

The list shows each app's name, when you authorized it, and when it was last used. Click an app to see its details:

* **Scopes**. The permissions granted to the app, grouped by category (for example, Alerting, Dashboards, Log Search), with a count of permissions in each category. Expand a category to see its individual scopes.
* **Last Used**. The most recent time the app used its authorization to access Sumo Logic.
* **Authorized By** and **Authorized At**. Who authorized the app, and when.

{/* TODO: add screenshot of the app detail pane with Scopes and Revoke button */}

To revoke an app's access, select it from the list and click **Revoke**. This immediately invalidates the app's ability to act on your behalf; you can re-authorize it later if needed.

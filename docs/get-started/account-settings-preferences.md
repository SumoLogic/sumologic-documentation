---
id: account-settings-preferences
title: Setting Account Preferences and Credentials
sidebar_label: Account preferences
description: Update and manage your Sumo Logic account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/business/user-permissions.png')} alt="icon" width="50"/>

You can review and update your personal account settings and login credentials at any time. The **Preferences** page contains settings that apply only to your account and do not affect other users in your organization.

## Accessing preferences

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select your username and then **Preferences**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu, select the person silhouette icon and then **Preferences**.

<img src={useBaseUrl('img/get-started/acct-pref.png')} alt="Account Preferences" width="300"/>

## My Profile

Under **My Profile**, the following information is displayed:

* **First Name**. Your first name as it appears on your account and in the UI.
* **Last Name**. You last name as it appears on your account and the UI.
* **Email**. The email address associated with your account.
* **Password**. The password you entered when activating your account. You can reset your password.
* **Organization ID**. Your Sumo Logic org ID.
* **Roles**. The Sumo Logic [roles](/docs/manage/users-roles/roles/add-remove-users-role/) assigned to your user account.

<img src={useBaseUrl('img/get-started/my-profile.png')} alt="preference settings" style={{border: '1px solid gray'}} width="500" />

If you're an Administrator, you can [manage users](/docs/manage/users-roles/users/), [assign roles](/docs/manage/users-roles/roles), and more.

### Change email address

1. Access your [Preferences](#accessing-preferences).
1. Under **My Profile**, click **Change Email**.
1. In the dialog that appears, enter your new email address and follow the verification steps.

### Change password

1. Access your [Preferences](#accessing-preferences).
1. Under **My Profile**, click **Change Password**.
1. Enter your current password, and then enter the new password twice to verify it.
1. Click **OK** to finalize the change.

You can also reset your from your login screen by clicking **Forgot your password?**.

If you're an Administrator, you can [reset passwords](/docs/manage/users-roles/users/reset-user-password) for users in your org.

## My Security Settings

This section allows you to enable 2-step verification and view backup codes.

:::note
The **My Security Settings** section is visible only if an administrator has made 2-step verification mandatory for your organization. For more details, see [2-Step Verification for Administrators](/docs/manage/security/2-step-verification-admins).
:::

To set up 2-Step Verification, you will need to install a Time-Based One-Time Password (TOTP) app, which will automatically generate an authentication code that changes after a certain period of time.

1. Download one of the following apps:
    - For Android, iOS and Blackberry: [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en).
    - For Android and iOS: [Duo Mobile](https://duo.com/product/trusted-users/two-factor-authentication/duo-mobile).
    - For Windows Phone: [Authenticator](https://www.microsoft.com/en-us/store/p/authenticator/9wzdncrfj3rj).
1. Scan the QR code displayed on your screen with your TOTP app.
1. After the TOTP app is configured, enter two consecutive authentication codes.

## My Preferences

These settings apply only to your personal account and do not affect other users in your organization. Changes take effect the next time you sign in.

<img src={useBaseUrl('img/get-started/my-preferences.png')} alt="preference settings" style={{border: '1px solid gray'}} width="600" />

### Timezone and Date Format

#### Default Timezone

If you want the Sumo Logic user interface to use your local time zone, or a time zone different from the time zone used in the timestamp of your log messages, change the setting here. This is a personal setting, and does not change the time zone for anyone else in your organization.

This option overrides the timezone set in your web browser, and affects all hours and minutes displayed in the user interface, including time ranges on the Search page, the Time column in the Messages pane, and in Dashboards. It does not affect the configurations of previously created Scheduled Searches or Real Time Alerts. For more information, see [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference).

#### Always show the timezone offset in displayed timestamps

This setting is enabled by default. To not show the timezone offset in displayed timestamps, deselect this checkbox.

#### Date format

Select from the following international date format options:

* Use the browser's default date format.
* MM/DD/YYYY (04/22/2015)
* DD/MM/YYYY (22/04/2015)
* YYYY/MM/DD (2015/04/22)

:::danger
Changing the date format option will affect your saved searches in the Library. Any saved searches that use absolute dates for their time range must be updated to reflect the new format. Scheduled Searches will continue to run as expected, but you will need to modify the date format if you reschedule a search.
:::

### General Settings

#### Receive email notifications whenever content is shared with you

Receive an email when [content is shared with you in Sumo Logic](/docs/manage/content-sharing/), such as log searches, metric searches, dashboards, and folders.

#### Enable keyboard shortcuts

[Keyboard shortcuts](/docs/get-started/keyboard-shortcuts) are enabled by default. Press **?** to see the list of shortcuts. To disable keyboard shortcuts, for example, if they conflict with an international keyboard, deselect the checkbox.

:::note
Keyboard shortcuts are disabled when typing in the [search text box](/docs/search/get-started-with-search/search-page/).
:::

### Web Session Timeout

Choose how long your Sumo Logic session remains active before timing out. Options range from 5 minutes to 7 days.

For details on web session timeouts and multi-account access, see [Multi-Account Access](/docs/manage/users-roles/users/multi-account-access).


### Navigation

#### Open all navigation menu items in new browser tabs by default

By default, selecting a menu link in the left navigation pane opens it in a new tab.<br/><img src={useBaseUrl('img/get-started/open-in-new-tab-button.png')} alt="Open in New Tab button" style={{border: '1px solid gray'}} width="125" />

Enabling this preference hides the **Open in New Tab** button on navigation menu links.

However, even when this preference is enabled, the **Open in New Tab** button remains visible for menu items with subfolders, allowing you to click the menu item to view its subfolders and open them in a new tab.<br/><img src={useBaseUrl('img/get-started/open-in-new-tab-button-on-folder.png')} alt="Open in New Tab button" style={{border: '1px solid gray'}} width="250" />

### Theme

Select to show the user interface in a **Dark theme** or **Light theme**.

This setting applies only to the user interface in the [Automation Service](/docs/platform-services/automation-service/), [Cloud SIEM](/docs/cse/), and [Cloud SOAR](/docs/cloud-soar/). A global setting is not supported at this time.

You can also apply a [dark theme specifically for dashboards](/docs/dashboards/about/#dark-theme).

### Query Editing

Select how you want to execute and format queries:

* **Return** to run the query, **Shift + Return** to create a new line. Suggestions appear automatically. Use **Tab** or **Enter** to select a suggestion.  
* **Command + Return** to run the query, **Return** to create a new line. Suggestions appear as you type. Use **Tab** to select a suggestion.  

After making any changes, click **Save**.

### Log Search

#### Show confirmation dialog when closing a tab

On the Search page, enable this option if you want to be prompted with a confirmation dialog before you can close a search tab.

#### Enable autocomplete

Keep this option selected to automatically open the search autocomplete dialog when editing a query.

* To manually open the dialog, use `<Esc>` or `<Alt>` `<Space>`.
* Deselect this option to disable [search autocomplete](/docs/search/get-started-with-search/search-basics/search-autocomplete).

#### Automatically run the search after selecting it from a list of saved searches

By default, saved searches run automatically when selected. Deselect this option if you prefer to start searches manually.

### Alerts

Click any of the following checkboxes to enable your desired preferences:<br/><img src={useBaseUrl('img/alerts/alert-preferences.png')} alt="Alert preferences" style={{border: '1px solid gray'}} width="500" />

#### Display alert badge when my subscribed monitors are triggered

Select this option to display a badge icon in the UI when you receive an alert for a monitor you're subscribed to.

#### Notify about only subscribed monitors

Select this option to receive notifications only for monitors you're subscribed to.

#### Enable "Active alerts only" as default filter

By default, your alerts list only displays alerts with an active status. Alerts with a resolved status are excluded.<br/> <img src={useBaseUrl('img/alerts/filter-active.png')} alt="alert-preferences" style={{border: '1px solid gray'}} width="500" />

#### Enable "My subscriptions" as default filter

By default, alerts you are subscribed to will appear in your alerts list.<br/> <img src={useBaseUrl('img/alerts/filter-subscribe.png')} alt="alert-preferences" style={{border: '1px solid gray'}} width="500" />

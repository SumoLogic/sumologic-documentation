---
id: account-settings-preferences
title: Setting Account Preferences and Credentials
sidebar_label: Account preferences
description: Update and manage your Sumo Logic account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/business/user-permissions.png')} alt="icon" width="50"/>

You can review and update your account settings and login credentials at any time in your user **Preferences**. The **Preferences** page contains settings that apply to your account only and do not affect other users in your organization.

To access preferences:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select your username and then **Preferences**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu, select your username and then **Preferences**. 
1. Update your preferences as needed. <br/><img src={useBaseUrl('img/get-started/preference-settings.png')} alt="Preferences" style={{border: '1px solid gray'}} width="600" />

## My Profile

Under **My Profile**, the following information is displayed:

* **First Name**. Your first name as it appears on your account and in the UI.
* **Last Name**. You last name as it appears on your account and the UI.
* **Email**. The email address associated with your account.
* **Password**. The password you entered when activating your account. You can reset your password.
* **Organization ID**. Your Sumo Logic org ID.
* **Roles** - The Sumo Logic [roles](/docs/manage/users-roles/roles/add-remove-users-role/) assigned to your user account.

### Change Email address

As a Sumo Logic user, you can change your own email address as necessary.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select your username and then **Preferences**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu, select your username and then **Preferences**. 
1. Under the **My Profile** section, click **Change Email**.<br/>![Change email](/img/get-started/change-email.png)
1. In the **Change Email Address** dialog, enter your new email address, and then follow the verification steps.

### Change password

To change your password:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select your username and then **Preferences**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu, select your username and then **Preferences**. 
1. Under **My Profile**, click **Change Password**.
1. Enter your current password, and then enter the new password twice to verify it.
1. Click **OK** to finish resetting your password.

### Forgot password

Forgot your password? You can reset it from the login screen.

<img src={useBaseUrl('img/get-started/reset-password.png')} alt="Reset password"  style={{border: '1px solid gray'}} width="300"/>

:::info For Administrators
[Learn more](/docs/get-started/onboarding-checklists/#users-roles-and-security) about managing users/roles and more Administrator settings.
:::

## My Security Settings

You can enable 2-Step Verification and view backup codes here. This section displays only if an administrator has made 2-Step Verification required for your organization. See [2-Step Verification for Administrators](/docs/manage/security/2-step-verification-admins/).

To set up 2-Step Verification, you will need to install a Time-Based One-Time Password (TOTP) application, which will automatically generate an authentication code that changes after a certain period of time.

1. Download one of the following apps:
    - For Android, iOS and Blackberry. [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en).
    - For Android and iOS. [Duo Mobile](https://duo.com/product/trusted-users/two-factor-authentication/duo-mobile).
    - For Windows Phone. [Authenticator](https://www.microsoft.com/en-us/store/p/authenticator/9wzdncrfj3rj).
1. Scan the QR code displayed on your screen with your TOTP App.
1. After the TOTP App is configured, enter two consecutive authentication codes.

## My Preferences

Preference settings are only changed for your personal account; they do not affect any other users in your organization. Any changes you make to your preferences take effect the next time you sign in, not during the current session.

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
* DD/MM/YYYY (22/04/2015
* YYYY/MM/DD (2015/04/22)

:::danger
If you change the date format option, it will affect your saved searches in the Library. Any saved searches that use absolute dates for their time range must be modified to use the new date format. Scheduled searches will continue to run properly. You would need to modify the date format only if you rescheduled the search.
:::

### General Settings

#### Receive email notifications whenever content is shared with you

Receive an email when [content is shared with you in Sumo Logic](/docs/manage/content-sharing/), such as log searches, metric searches, dashboards, and folders.

#### Enable keyboard shortcuts

[Keyboard shortcuts](/docs/get-started/keyboard-shortcuts) are enabled by default. Press ? to see the list of shortcuts. To disable keyboard shortcuts, for example, if they conflict with an international keyboard, deselect the checkbox.

:::note
Keyboard shortcuts are disabled when typing in the [search text box].
:::

### Web Session Timeout

Choose an option to set the length of time before your Sumo Logic session times out. Options include 5 minutes to 7 days. For information on web session timeouts and Multi-account Access, see [Multi-account Access].

### Theme

Select to show the user interface in a **Dark theme** or **Light theme**.

This setting only applies to the user interface in the [Automation Service](/docs/platform-services/automation-service/), [Cloud SIEM](/docs/cse/), and [Cloud SOAR](/docs/cloud-soar/).

:::note
You can also set a dark them or light theme for dashboards. See [Dark Theme](/docs/dashboards/about/#dark-theme).
:::

### Query Editing

Select one of the following options:
- **Return to run**. `<Enter>` runs the query, `<Alt>` `<Enter>` creates a new line.
- **Command + Return to run**. `<Alt>` `<Enter>` runs the query, `<Enter>` creates a new line.

If you have changed any settings, click **Save**.

### Log Search

#### Show confirmation dialog when closing a tab

On the Search page, if you want to be prompted with a confirmation dialog before you can close a search tab, select this checkbox.

#### Enable autocomplete

Use `<Esc>` or `<Alt>` `<Space>` to open it manually) Keep this option selected if you'd like to open the [search autocomplete](/docs/search/get-started-with-search/search-basics/search-autocomplete) dialog when you are editing a query. Deselect the option to disable the search autocomplete dialog.

#### Automatically run the search after selecting it from a list of saved searches

Keep this option selected if you'd like to run a saved search as soon as you select it. Deselect the option if you'd like to start the search manually.

### Alerts

Select these preferences to manage how alerts are handled. For more information, see [Notification preferences](/docs/alerts/monitors/alert-response/#notification-preferences).

#### Display alert badge when my subscribed monitors are triggered

Select this option to display a badge icon in the UI when you receive an alert for a monitor you're subscribed to.

#### Notify about only subscribed monitors

Select this option to receive notifications only for monitors you're subscribed to.

#### Enable "Active alerts only" as default filter

By default, your alerts list only displays alerts with an active status. Alerts with a resolved status are excluded.

#### Enable "My subscriptions" as default filter

By default, alerts you are subscribed to will appear in your alerts list.

### New UI

#### Open navigation menu links in a new tab by default

By default, a new tab opens every time you select a menu link in the left navigation pane. 

:::tip
Selecting this preference hides the **Open in New Tab** button on navigation menu links. <br/><img src={useBaseUrl('img/get-started/open-in-new-tab-button.png')} alt="Open in New Tab button" style={{border: '1px solid gray'}} width="100" />

However, the **Open in New Tab** button will still appear on menu items with subfolders. This allows you to either click the menu item to see its subfolders, or to click the **Open in New Tab** to open the menu item in a new tab.<br/><img src={useBaseUrl('img/get-started/open-in-new-tab-button-on-folder.png')} alt="Open in New Tab button" style={{border: '1px solid gray'}} width="200" />
:::
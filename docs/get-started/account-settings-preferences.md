---
id: account-settings-preferences
title: Setting Account Preferences and Credentials
sidebar_label: Account Preferences
description: Update and manage your Sumo Logic account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/business/user-permissions.png')} alt="icon" width="50"/>

You can review and update your account settings and login credentials at any time in your user **Preferences**. The **Preferences** page contains settings that apply to your account only and don't affect other users in your organization.

## My Profile

Under **My Profile**, the following information is displayed:

* **Organization ID**. Your Sumo Logic org ID.
* **Username** - Your username is the email address associated with the account.
* **Password** -The password you entered when activating your account. You can reset your password.
* **Roles** - The Sumo Logic roles assigned to your user account.

### Change Email Address

As a Sumo Logic user, you can change your own email address as necessary.

1. In the Sumo Logic left nav, click on your name.
1. Go to the **Preferences** page.
1. Under **My Profile**, next to your **Username**, click **Change Email Address**.<br/>![Change email](/img/get-started/change-email.png)
1. In the **Change Email Address** dialog, your current email address is displayed.
1. Enter your **New Email**.
1. Enter your **Current Password** for your Sumo Logic Account.
1. Click **Submit**.
1. The **Email Address Changed** dialog appears. An email with an activation link is sent to your new email address. Click the link in the email within seven days to complete your email address change, or this link will expire.

### Change Password

To change your password:

1. In Sumo Logic, click on your name.
1. Go to the **Preferences** page.
1. Under **My Profile**, click **Change Password**.<br/>![Change email](/img/get-started/change-password.png)
1. Enter your current password, and then enter the new password twice to verify it.<br/>  ![Change Password](/img/get-started/change-password2.png)
1. Click **OK** to finish resetting your password.

### Forgot Password

Forgot your password? You can reset it from the login screen.

<img src={useBaseUrl('img/get-started/reset-password.png')} alt="reset-password" width="450"/>

:::info For Administrators
[Learn more](/docs/get-started/onboarding-checklists/#users-roles-and-security) about managing users/roles and more Administrator settings.
:::

## My Security Settings

You can enable 2-Step Verification and view backup codes here.

To set up 2-Step Verification, you will need to install a Time-based One-Time Password (TOTP) application which will automatically generate an authentication code that changes after a certain period of time.

1. Download one of the following apps:
    - For Android, iOS and Blackberry: [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en)
    - For Android and iOS: [Duo Mobile](https://duo.com/product/trusted-users/two-factor-authentication/duo-mobile)
    - For Windows Phone: [Authenticator](https://www.microsoft.com/en-us/store/p/authenticator/9wzdncrfj3rj)
1. Scan the QR code displayed on your screen with your TOTP App.
1. After the TOTP App is configured, enter two consecutive authentication codes.

## My Access Keys

Users with a role that grants the **Create Access Keys** capability can create and manage their own Access Keys. For more information, see [Access Keys](/docs/manage/security/access-keys).

## My Preferences

Preference settings are only changed for your personal account; they don't affect any other users in your organization. Any changes you make to your preferences take effect the next time you sign in, not during the current session.

### Default Timezone

If you want the Sumo Logic user interface to use your local time zone, or a time zone different from the time zone used in the timestamp of your log messages, change the setting here. This is a personal setting, and does not change the time zone for anyone else in your organization.

This option overrides the timezone set in your web browser, and affects all hours and minutes displayed in the user interface, including time ranges on the Search page, the Time column in the Messages pane, and in Dashboards. It does not affect the configurations of previously created Scheduled Searches or Real Time Alerts. For more information, see [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference).

### Always show the timezone offset in displayed timestamps

This setting is enabled by default. To not show the timezone offset in displayed timestamps, deselect this checkbox.

### Date Format

Select from the following international date format options:
* Use the browser's default date format.
* MM/DD/YYYY (04/22/2015)
* DD/MM/YYYY (22/04/2015
* YYYY/MM/DD (2015/04/22)

:::warning
If you change the date format option, it will affect your saved searches in the Library. Any saved searches that use absolute dates for their time range must be modified to use the new date format. Scheduled searches will continue to run properly. You would need to modify the date format only if you rescheduled the search.
:::

### Web session timeout

Choose an option to set the length of time before your Sumo Logic session times out. Options include 5 minutes to 7 days. For information on web session timeouts and Multi-account Access, see [Multi-account Access].

### Receive email notifications whenever content is shared with you

### Enable keyboard shortcuts

[Keyboard shortcuts](/docs/get-started/keyboard-shortcuts) are enabled by default. Press ? to see the list of shortcuts. To disable keyboard shortcuts, for example, if they conflict with an international keyboard, deselect the checkbox.

:::note
Keyboard shortcuts are disabled when typing in the [search text box].
:::

### Automatically run the search after selecting it from a list of saved searches

Keep this option selected if you'd like to run a saved search as soon as you select it. Deselect the option if you'd like to start the search manually.

### Show confirmation dialog when closing a search tab

On the Search page, if you want to be prompted with a confirmation dialog before you can close a search tab, select this checkbox.

### Automatically open the search autocomplete dialog when editing

Use `<Esc>` or `<Alt>` `<Space>` to open it manually) Keep this option selected if you'd like to open the [search autocomplete](/docs/search/get-started-with-search/search-basics/search-autocomplete) dialog when you are editing a query. Deselect the option to disable the search autocomplete dialog.

### On login, reopen the tabs from your previous session

If you want to reopen the tabs from your previous session when you login to a new session, select this checkbox.

### Query editing

Select one of the following options:
- `<Enter>` runs the query, `<Alt>` `<Enter>` creates a new line.
- `<Alt>` `<Enter>` runs the query, `<Enter>` creates a new line.

If you have changed any settings, click **Save**.

### Alerts List and Alert Notifications

See [Alert Notification Preferences](/docs/alerts/monitors/alert-response/#notification-preferences).

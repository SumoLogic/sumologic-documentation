---
id: onelogin
title: OneLogin
sidebar_label: OneLogin
description: The Sumo Logic app for OneLogin provides real-time visibility and analysis of OneLogin user activity through event data, such as user logins, administrative operations, and provisioning.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saml/onelogin.png')} alt="Thumbnail icon" width="50"/>

OneLogin is an Identity Management provider that supplies a comprehensive set of enterprise-grade identity and access management solutions, including single sign-on (SSO), user provisioning, and multi-factor authentication (MFA). The Sumo Logic app for OneLogin provides real-time visibility and analysis of OneLogin user activity through event data, such as user logins, administrative operations, and provisioning.

The app provides insights into account activity and user behavior, including total and invited users, inactive or never-logged-in accounts, user status, failed login attempts, lockouts, and password reset needs, helping administrators monitor user lifecycles and maintain security.

:::info
This app includes [built-in monitors](#onelogin-alerts). For details on creating custom monitors, refer to [Create monitors for OneLogin app](#create-monitors-for-onelogin-app).
:::

## Setting up the collection

**Prerequisites**

:::note
To use this feature, you'll need to enable access to your OneLogin logs and ingest them into Sumo Logic.
:::

Once you begin uploading data, your daily data usage will increase. It's a good idea to check the **Account** page in Sumo Logic to make sure that you have enough quota to accommodate additional data in your account. If you need additional quota you can [upgrade your account](/docs/manage/manage-subscription/upgrade-account/upgrade-cloud-flex-legacy-account) at any time.

### Configure an event broadcaster for event logs

* Add a Sumo Logic [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) to your Sumo Logic Org.
* Configure an [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics) for your OneLogin data. Make sure to set the **Source Category** when configuring the OneLogin source. For example, `onelogin`.
* From OneLogin, configure a broadcaster that points to this endpoint using the instructions in the [OneLogin documentation](https://onelogin.service-now.com/support?id=kb_article&sys_id=43f95543db109700d5505eea4b961959). You must use SIEM (NDJSON) format. Use the Sumo Logic HTTP Source URL as the Listener URL, and custom header is not needed.

### Configure the C2C source for users' logs

Follow the instructions for setting up [Cloud-to-Cloud Integration for OneLogin App](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/onelogin-source/) to create the source and use the same source category while installing the app.

## Log types

The Sumo Logic app for OneLogin uses the following logs:
- Event logs in NDJSON format.
- Sumo Logic’s [OneLogin Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/onelogin-source/) to collect [Users' Logs](https://developers.onelogin.com/api-docs/2/users/user-resource) from OneLogin platform.

## Sample log messages

```json title="Users Log"
{
    "status": 4,
    "username": null,
    "distinguished_name": null,
    "external_id": null,
    "group_id": null,
    "samaccountname": null,
    "updated_at": "2025-08-28T14:14:35.237Z",
    "invalid_login_attempts": 0,
    "activated_at": "2025-08-28T14:14:35.237Z",
    "created_at": "2025-08-28T14:14:35.237Z",
    "directory_id": null,
    "member_of": null,
    "lastname": "patel",
    "invitation_sent_at": "2025-08-28T14:14:35.237Z",
    "phone": null,
    "email": "RaminBenjamin@xyz.com",
    "firstname": "shivani",
    "id": 252998076,
    "locked_until": null,
    "state": 1,
    "last_login": "2025-08-28T14:14:35.237Z",
    "password_changed_at": "2025-08-28T14:14:35.237Z"
}
```

## Sample queries

```sql title="Users by State"
_sourceCategory="Labs/OneLogin"
| json "id", "state", "invitation_sent_at", "activated_at", "status", "last_login", "invalid_login_attempts", "password_changed_at", "email", "username", "locked_until", "firstname", "lastname", "group_id", "updated_at", "created_at", "member_of" as id, state, invitation_sent_at, activated_at, status, last_login, invalid_login_attempts, password_changed_at, email, user_name, locked_until, first_name, last_name, group_id, updated_at, created_at, member_of nodrop

| if (state = 0, "Unapproved", if (state = 1, "Approved", if (state = 2, "Rejected", if (state = 3, "Unlicensed", "Other")))) as state
| if (status = 0, "Unactivated", if (status = 1, "Active", if (status = 2, "Suspended", if (status = 3, "Locked", if (status = 4, "Password expired", if (status = 5, "Awaiting password reset", if (status = 7, "Password pending", if (status = 8, "Security questions required", "Other")))))))) as status

| first(state) as state, first(status) as status by id, user_name
| where state matches "{{state}}"
| where status matches "{{status}}"
| where user_name matches "{{user_name}}"

| count by state, id 
| count by state
| sort by _count, state
```

## Installing the OneLogin app

To install the app, do the following:
:::note
    Next-Gen App: To install or update the app, you must be an account administrator or a user with Manage Apps, Manage Monitors, Manage Fields, Manage Metric Rules, and Manage Collectors capabilities depending upon the different content types part of the app.
:::
1. Select **App Catalog**.
1. In the 🔎 **Search Apps** field, run a search for your desired app, then select it.
1. Click **Install App**.
    :::note
    Sometimes this button says **Add Integration**.
    :::
1. Click **Next** in the **Setup Data** section.
1. In the **Configure App** section of your respective app, complete the following field.
	1. Enter values for two data sources: 
		- **Event logs data source**
		- **User logs data source**
    1. **Field Name**. If you already have collectors and sources set up, select the configured metadata field name (for example, `_sourcecategory`) or specify other custom metadata (for example, `_collector`) along with its metadata **Field Value**.
1. Click **Next**. You will be redirected to the **Preview & Done** section.

**Post-installation**

Once your app is installed, it will appear in your **Installed Apps** folder, and dashboard panels will start to fill automatically.

Each panel slowly fills with data matching the time range query received since the panel was created. Results will not immediately be available but will be updated with full graphs and charts over time.

## Viewing OneLogin dashboards

import FilterDashboards from '../../reuse/filter-dashboards.md';

<FilterDashboards/>

### Overview

**Visitor Locations.** See the count and location of visitor IP addresses over the last 24 hours on the world map.

**Events by App.** See events from the last 24 hours by application name in a pie chart and compare app usage.

**Logins by Country.** See the count of number of logins by country name displayed in a table to get an idea of your visitor traffic by country in the last 24 hours.

**Event Outlier Over Time.** See the events that fall outside the normal range for the last 24 hours.

**Failed Login Outlier.** See any logins over the last 24 hours that fall outside the specified failed login threshold.

**Successful Login Outlier.** See any logins over the last 24 hours that fall outside the specified successful login threshold.

**Top 10 Users by Events.** View the top 10 users by number of events for the last 24 hours to identify heavy activity.

<img src={useBaseUrl('img/integrations/saml/OneLoginOverview.png')} alt="OneLogin" />

### App Monitoring

**Event Distribution by App.** See the percentage of events by application in the last 24 hours as a pie chart to identify the event distribution by apps having the most events recently.

**Event Distribution by Event ID.** See the percentage of each user action by Event ID for the last 24 hours as a pie chart to identify the apps having the most activity recently.

**Logins by App.** See the percentage of logins by application in the last 24 hours as a pie chart to identify the apps having the most events recently.

**Top 10 Provisioning Errors and Warnings.** See the top 10 provisioning error messages and warnings issued by OneLogin by count for the last 24 hours.

**Failed Actions.** See the error descriptions of failed actions and a count of the occurrence for the last 24 hours displayed in a table to identify possible issues.

<img src={useBaseUrl('img/integrations/saml/OneLoginAppMonitoring.png')} alt="OneLogin" />

### Security

**User Activity.** View the count of user activities by username as a bar chart for the last 24 hours as a bar chart to quickly identify unusual user activity.

**Password Changes.** See the count of password changes by username as a bar chart for the last 24 hours to quickly identify any unusually high numbers of password changes by a particular user.

**Logins by Country.** View the count of the logins by country in the last 24 hours to identify any unusual activity by country.

**Users Created in Apps.** See the number of users created in applications in the last 24 hours as a column chart. You can filter by app name to track the count of a particular app.

**Assumed Users.** View the details such as the timestamp, destination user, notes, source user, and count for the event when one user acted as another user in the last 24 hours.

**Failed Logins.** See the number of login failures by username in the last 24 hours on a bar chart to identify any unusual activity. You can filter by username as needed.

**Successful Logins.** See the number of successful logins by username in the last 24 hours to identify any unusual activity. You can filter by username as needed.

**User Modifications.** See user modifications by timestamp, destination user, source user, notes, and error description for the last 24 hours displayed in  table. You can filter by time, user name, source user, or error description as needed to track unusual behavior.

<img src={useBaseUrl('img/integrations/saml/OneLoginSecurity.png')} alt="OneLogin" />

### User Inventory

The **OneLogin - User Inventory** dashboard offers a centralized view of user account lifecycle and activity within the OneLogin environment:
* **Centralized user overview**. Provides a single view of user account lifecycle and activity within the OneLogin environment.
* **Account provisioning metrics**. Tracks total users, invited users, never-logged-in accounts, pending approvals, and rejections.
* **Risk detection**. Highlights issues like repeated failed logins, locked or inactive accounts, and password problems.
* **Usage trends**. Visualizes user status and login activity to reveal patterns in user behavior.
* **Security monitoring**. Includes detailed tables on lockouts, recent invites, and accounts with unchanged passwords.
* **Governance and compliance support**. Helps ensure strong user management practices, risk awareness, and regulatory compliance.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/OneLogin/OneLogin+-+User+Inventory.png' alt="OneLogin - User Inventory dashboard" />

## Create monitors for OneLogin app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### OneLogin alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `OneLogin - Account Lockout` | This alert is triggered when a user account has been locked due to multiple failed login attempts. | Critical | Count > 0 |
| `OneLogin - Password Expired & Reset Pending` | This alert is triggered when user accounts are found with expired passwords or are pending a password reset. | Critical | Count > 0 |
| `OneLogin - User Rejected` | This alert is triggered when a user account has been rejected, indicating denied access during onboarding or approval. | Critical | Count > 0 |

## Upgrade/Downgrade the OneLogin app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the OneLogin app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
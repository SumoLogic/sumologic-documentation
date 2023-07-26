---
id: google-workspace-apps-audit-source
title: Google Workspace Apps Audit Source
sidebar_label: Google Workspace Apps Audit
description: Add a Google Workspace Apps Audit Source to ingest audit logs from Google apps.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/google-workspace-audit.png')} alt="icon" width="40"/>

A Google Workspace Apps Audit Source uses the [Google Apps Reports API](https://developers.google.com/admin-sdk/reports/v1/get-start/getting-started) to ingest all audit logs through watchpoints. [Activity from the following Google apps](https://developers.google.com/admin-sdk/reports/v1/reference/activities/list) can be collected:

 * Admin
 * Calendar
 * Drive
 * Login
 * Token
 * Groups
 * Google+
 * Mobile
 * Rules
 * Keep
 * Meet
 * Enterprise Group
 * Data Studio
 * SAML
 * Chat


Only one Source should be configured per app. In other words, you’d set up one Source to collect Calendar audit logs, another to collect Token audit logs, and so on.

## Google Authentication and Authorization

This Source uses OAuth to integrate with the Google Apps Reports API. Therefore, your Google Apps credentials are never stored by Sumo Logic, and we have no visibility into the details of your Google Apps account. Sumo Logic only stores OAuth tokens that are generated after authentication and authorization.

When creating or modifying a Google Apps Audit Source, you will be required to authenticate with Google using the credentials of a user that has access rights to the account, and to the Reports API. See Google's [Reports API: Prerequisites](https://developers.google.com/admin-sdk/reports/v1/guides/prerequisites) documentation for more details. During Google's OAuth consent flow, you will also be asked to grant the Sumo Logic app permission to use the Reports API.

:::important
Authentication must be with a new Google Workspace Apps Audit Source. We do not support re-authenticating existing sources.
:::

### Manage Third party app access
In order to provide Sumo logic access to google services, please follow the manage third-party app access steps as follows. See Google's [Manage Third-party App Access](https://support.google.com/a/answer/7281227#zippy=%2Cstep-manage-third-party-app-access-to-google-services-add-apps) documentation for more details.
1. In the Admin console, go to **Menu** > **Security** > **Access and data control** > **API controls**.
1. In App access control, click **Manage Third-Party App Access**.
1. Click **Add app** and search for Sumo Logic OAuth client.
1. Select Sumo Logic OAuth client, then click **Change access**.
1. Choose the **Trusted** option to allow access to all Google services. <img src={useBaseUrl('img/send-data/g-suite-change-access.png')} alt="g-suite-change-access" />
1. Click **Change**.

## Configuring a Google Workspace Apps Audit Source

Once you've set up a Hosted Collector and have your credentials ready, you're all set to configure the Source. Each Google Workspace App must have its own source. For each Google Workspace App you wish to collect, follow the steps below.

To configure a Google Workspace Apps Audit Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. In the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Google Workspace Apps Audit**.
1. For **Name**, type the name of the Source. Enter an optional Description.
1. For **Application**, select the Google Workspace app that you’d like this Source to collect data from. Steps may be repeated for each Google Workspace app you want to collect data from.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
1. **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. Click **Sign in with Google** to give permission to Sumo Logic to set up watchpoints using **the Google Apps Reports API**. Click **Accept**.
1. Click **Save**.

To confirm events are being logged, you can compare the data in Sumo Logic to the data shown in **Reports** in the Google Admin console.

# Google App Audit Known Issues

A few known issues are due to limitations of the Google API and cannot be changed by Sumo Logic. 

**Authentication Token Limit:** Google limits an application (such as Sumo Logic) to 25 active authentication tokens per Google Apps account. According to Google’s documentation, the oldest token is invalidated if a 26th token is created. However, during testing, we found that once the 26th token is issued, all previous 25 tokens become invalid. In this situation, the only workaround is to delete and recreate all Google Apps Audit Sources in Sumo Logic.

**Duplicate records:** The following situations might result in the collection of duplicate log messages:

   * **Complex Events:** When a complex event is logged that contains multiple sub-events, such as a new calendar entry, a JSON object is created to log the event. That object will have an array of event details for each included action (such as inviting guests). When this happens, duplicate event logs might be created for each sub-action. So, if there is one event with three sub actions, the exact same message event data might be duplicated three times, most likely due to a bug in the Google API.
   * **Watchpoint expiration:** The Google API watchpoints expire after about one week. Unfortunately, there does not appear to be a method for refreshing the expiration of a watchpoint. Sumo Logic must keep track of when each watchpoint expires, and in very close sequence, create a new watchpoint, and kill the old watchpoint. This results in a slight overlap, typically only a few seconds, where there are two watchpoints for the same application. This might result in duplicate logs during that overlapping period, both of which are collected (which is preferable to the possibility of losing some data).

**Service Availability:** Logging is dependent on the availability of Google services. In some cases, apps may stop producing logs for a period of time. We have observed this during our development and QA testing.

To provide feedback on these limitations, and known issues, contact Google support or your Google account contact.

## OAuth 2.0 access token and subscription expiration

### Access Tokens

An access token is granted by a third party service, such as Google Workspace, to Sumo for accessing audit log APIs required for collecting audit events. Access tokens are stored encrypted and have a short expiration time of several hours. Sumo automatically updates them before they expire to prevent data loss. Successful and failed token-update events are logged in the Audit Index. If the request fails Sumo will continue to try to update a token for about a week. After several failures, we recommend recreating the Google Workspace Apps Audit Source.

### Subscription Watchpoints

A subscription is a channel established with the third party service to receive notification events. Similar to access tokens, subscriptions are valid only before the expiration time. Before a subscription expires, Sumo invalidates the current subscription and obtains a new subscription. In the event of failure to update a subscription, an entry is logged in the Audit Index.

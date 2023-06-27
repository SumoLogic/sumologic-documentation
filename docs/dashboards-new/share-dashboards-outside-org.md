---
id: share-dashboard-outside-org
title: Share a dashboard outside your organization
sidebar_label: Share a dashboard outside your org
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page has information about sharing dashboards with users who do not have a Sumo Logic account. For information about sharing dashboards with other Sumo Logic users, see [Share a Dashboard](/docs/dashboards-new/share-dashboard-new).

Dashboards often contain sensitive information, so you usually share them only with people within your organization. But sometimes you may want to allow people outside your organization to view a dashboard without logging in. For example, if your dashboard is displayed on a monitor in your operations center or if you want to send an external person a link to a dashboard that reveals a critical problem.

:::note
Sharing outside an organization is always view-only and need auto-refresh enabled. Also, if this is the first time that auto-refresh is being enabled, it may take some time to backfill the data depending on your queries and timeranges. See [About Dashboards](about.md).
:::

You can share a dashboard with all external users (“the world”), or with a selected set of external users that you specify in the service allowlist. 

Before you share a dashboard with users external to your organization, you must enable a security policy, ensure that you have the right role capabilities, and enable the service allowlist depending on your option selection.

## Enable the Sumo Logic policy

In this step, you'll enable the ability to share dashboards outside your organization. You must have admin privileges to enable the policy.

1. Go to **Administration** > **Security** > **Policies**.
1. Select the **Enable** checkbox for **Share Dashboards Outside of the Organization**.
1. The policy is changed. It can take up to 5 minutes for the policy to go into effect.

## Verify your role allows external sharing

You must have specific role capabilities to share a dashboard with external users.

* **Share Dashboards with the Allowlist.** Share dashboards with users only on the allowlist.
* **Share Dashboards with the World.** Share dashboards with external users. 

If you do not already have a role that grants you the required capability, an admin user can assign you one. See the [Assign Roles to Users](/docs/manage/users-roles/roles/add-remove-users-role) documentation. Or create a new role as required, see the [Create a New Role](/docs/manage/users-roles/roles/create-manage-roles). 

## Add external users to service allowlist

If you want to share dashboards with specific external users, rather than the world, the service allowlist must be enabled and you must provide the list of IPs or CIDRs that will be able to view dashboards without logging in. For instructions, see [Enable Dashboard Allowlist](/docs/manage/security/create-allowlist-ip-cidr-addresses).

:::note
Administrator privileges are required to enable the service allowlist.
:::

## Share the dashboard

1.  In the left navigation pane, right-click the dashboard you want to share, and click **Share** in the context menu. Or, click on the share icon next to the dashboard title. <br/><img src={useBaseUrl('/img/dashboards-new/share-option.png')} alt="share-option" width="400"/> <br/><img src={useBaseUrl('/img/dashboards-new/share-option_2.png')} alt="share-option_2" width="400"/>
1.  The Share Dashboard dialog appears.
1.  Click **Get shareable URL** to expand that section of the page. <br/><img src={useBaseUrl('/img/dashboards-new/share-outside.png')} alt="share-outside" width="800"/>
1.  If you want viewers to see the current time range in the URL, toggle the **Include current time range in the URL** option.
1.  If you want viewers to see the current variable values in the URL, toggle the **Include current variable values in the URL** option.
1.  Toggle the **Public Dashboard** on.
1.  Select **Anyone** or **Allowlist only** as the visibility access, and click **Save**. 

The URL that external users can use to access the dashboard appears under the **Shareable URL** section of the page. 

## Restrictions and limitations for external sharing 

* Sharing outside an organization is always view-only and you must enable auto-refresh. When enabling auto-refresh for the first time, it may take some time to backfill the data, depending on your queries and time ranges. See [About Dashboards](about.md).
* Panels that are incompatible with auto-refresh, shows data only for viewers who have a login.
* Panels must use relative time ranges (such as Last 15 Minutes, Last 24 Hours). Absolute time ranges are not currently supported.
* Viewers without a login will see dashboards with auto-refresh enabled as well as default time ranges and default template variable applied. To specify a different set of filters for another viewer, create a copy of the dashboard, provide new filter values, and share it with the new URL.
* If **User's data access level** is enabled for a dashboard, you cannot share it outside your organization.
* Spans, Traces, and Service maps panels are not supported in public dashboards.

## Logging for externally shared dashboards

If you have the [Audit Index](/docs/manage/security/audit-index) enabled, Sumo Logic logs the key-sharing events. 

When a user shares a dashboard outside of the organization, Sumo Logic logs the following information:
* Dashboard name
* Dashboard URL
* Owner name
* Owner email
* Visibility (Anyone or Allowlist only)

When someone views a dashboard without signing in, Sumo Logic logs the following information:
* Dashboard name
* Dashboard URL
* Owner name
* Owner email
* Visibility (Anyone or Allowlist only)
* Viewer’s IP address

## Alerts and reports for externally-shared dashboards

You can use [Scheduled Searches](/docs/alerts/scheduled-searches) to create alerts and reports on sharing dashboards outside your organization.

```sql title="Real-time alert when a user shares a dashboard"
_index=sumologic_audit and _sourceName=REPORT "Published REPORT"
| parse "Published REPORT Name=*, UserName=* UserEmail=*} PublisherName=* PublisherEmail=*} Visibility=* URL=*" as dashboardName,userName,userEmail,publisherName,publisherEmail,visibility, URL
| count by dashboardName, userName, userEmail, visibility, URL
| fields -_count
```

```sql title="Scheduled search report of dashboard views"
_index=sumologic_audit and _sourceName=REPORT "Viewed Report"
| parse "Name=*, Id=Some(*)," as dashboardName,dashboardId
| parse "URL=*, ViewerIP=*" as url,viewerip
| count
```

```sql title="Visualization of dashboard views by geography"
_index=sumologic_audit and _sourceName=REPORT "Viewed Report"
| parse "Name=*, Id=Some(*)," as dashboardName,dashboardId
| parse "URL=*, ViewerIP=*" as url,viewerip
| lookup latitude, longitude from geo://location on ip=viewerip
| count by latitude, longitude
| sort _count
```

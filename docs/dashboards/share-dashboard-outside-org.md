---
id: share-dashboard-outside-org
title: Share a Dashboard Outside Your Organization
sidebar_label: Share a Dashboard Outside Your Organization
description: Learn how to share a Sumo Logic dashboard with people outside your organization by enabling a security policy, role capabilities, and the service allowlist.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page has information about sharing dashboards with users who do not have a Sumo Logic account. For information about sharing dashboards with other Sumo Logic users, see [Share a Dashboard](/docs/dashboards/share-dashboard-new).

Dashboards often contain sensitive information, so you usually share them only with people within your organization. But sometimes you may want to allow people outside your organization to view a dashboard without logging in. For example, you might display a dashboard on a monitor in your operations center, or send someone outside your organization a link to a dashboard that reveals a critical problem.

:::note
Sharing outside an organization is always view-only.
:::

You can share a dashboard with all external users (“the world”), or with a selected set of external users that you specify in the service allowlist.

Before you share a dashboard with users external to your organization, you need to enable a security policy, make sure that you have the right role capabilities, and, if you are sharing with a selected set of users, enable the service allowlist.

## Enable the Sumo Logic policy

In this step, you'll enable sharing dashboards outside your organization. You need admin privileges to enable the policy.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies** <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**.
1. Select the **Enable** checkbox for **Share Dashboards Outside of the Organization**.
1. The policy change can take up to 5 minutes to take effect.

## Verify your role allows external sharing

You need specific role capabilities to share a dashboard with external users.

* **Share Dashboards with the Allowlist.** Share dashboards with users only on the allowlist.
* **Share Dashboards with the World.** Share dashboards with all external users.

If you do not already have a role that grants you the required capability, an admin user can assign you one. See the [Assign Roles to Users](/docs/manage/users-roles/roles/add-remove-users-role) documentation. You can also create a new role. See the [Create a New Role](/docs/manage/users-roles/roles/create-manage-roles).

## Add external users to service allowlist

If you want to share dashboards with specific external users, rather than the world, you need to enable the service allowlist and provide the list of IPs or CIDRs that can view dashboards without logging in. For instructions, see [Enable Dashboard Allowlist](/docs/manage/security/create-allowlist-ip-cidr-addresses).

:::note
Administrator privileges are required to enable the service allowlist.
:::

## Share the dashboard

1. Go to your **Library** and search for the dashboard you want to share.
1. Right-click the dashboard name in the resulting list.
1. Click **Share** in the context menu. <br/><img src={useBaseUrl('/img/dashboards/share-option.png')} alt="Share option" style={{border: '1px solid gray'}} width="200"/> <br/>Or, click the share icon next to the dashboard title. <br/><img src={useBaseUrl('/img/dashboards/share-option_2.png')} alt="Share option 2" style={{border: '1px solid gray'}} width="400"/>
1. The **Share Dashboard** dialog appears.
1. Click **Get shareable URL** to expand the section. <br/><img src={useBaseUrl('/img/dashboards/share-outside.png')} alt="Share outside" width="800" style={{border: '1px solid gray'}} />
1. If you want viewers to see the current time range in the URL, toggle the **Include current time range in the URL** option.
1. If you want viewers to see the current variable values in the URL, toggle the **Include current variable values in the URL** option.
1. Toggle **Public Dashboard** on.
1. Select **Anyone** or **Allowlist only** for visibility, and then click **Save**.

The URL that external users use to access the dashboard appears under the **Shareable URL** section of the page.

## Restrictions and limitations for external sharing

* Sharing outside an organization is always view-only.
* Panels that are incompatible with auto-refresh show data only to viewers who are logged in.
* Panels need to use relative time ranges (such as Last 15 Minutes, Last 24 Hours). Absolute time ranges are not supported.
* Unauthenticated viewers see dashboards with the default time range and default template variable values applied. To share a dashboard with a different set of template variable values, create a copy of the dashboard and set the time range and variable values you want.
* If **User's data access level** is enabled for a dashboard, you cannot share it outside your organization.
* Spans, Traces, and Service maps panels are not supported in public dashboards.

## Logging for externally shared dashboards

If you have the [Audit Index](/docs/manage/security/audit-indexes/audit-index) enabled, Sumo Logic logs the key-sharing events.

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

You can use [Scheduled Searches](/docs/alerts/scheduled-searches) to create alerts and reports about dashboards that are shared outside your organization.

```sumo title="Scheduled search report of dashboard views"
_index=sumologic_audit and _sourceName=REPORT "Viewed Report"
| parse "Name=*, Id=Some(*)," as dashboardName,dashboardId
| parse "URL=*, ViewerIP=*" as url,viewerip
| count
```

```sumo title="Visualization of dashboard views by geography"
_index=sumologic_audit and _sourceName=REPORT "Viewed Report"
| parse "Name=*, Id=Some(*)," as dashboardName,dashboardId
| parse "URL=*, ViewerIP=*" as url,viewerip
| lookup latitude, longitude from geo://location on ip=viewerip
| count by latitude, longitude
| sort _count
```

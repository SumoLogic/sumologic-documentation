---
id: share-dashboard-outside-org
---

# Share a Dashboard Outside Your Org

This page has information about sharing dashboards with users who do not have a Sumo account. For information about sharing dashboards with other Sumo users, see [Share a Dashboard Within Your Org](share-dashboard-inside-org.md).

:::important
[Dashboard (New)](/docs/dashboards-new) does not support sharing outside of your account.
:::

Dashboards often contain sensitive information, so typically you share them only with people within your organization. But sometimes you may want to allow people outside your organization to view a dashboard without logging in, for example, if your dashboard is displayed on a monitor in your operations center, or if you want to send an external person a link to a dashboard that reveals a critical problem.

:::note
Sharing outside an organization is always view-only and in live mode, and not all [operators are compatible with live mode](restricted-operators-dashboards.md). Also, if this is the first time that live mode is being enabled, it may take some time to backfill the data depending on your queries and timeranges. See [About Dashboards](about.md).
:::

You can share a dashboard with all external users (“the world”), or with a selected set of external users that you specify in the service allowlist. 

Before you can share a dashboard with users external to your org, you must enable a security policy, ensure that you have the right role capabilities, and depending on your option selection, enable the service allowlist.

## Enable the Sumo Logic policy

In this step you enable sharing of dashboards outside your organization. You must have Admin privileges to enable the policy.

1. Go to **Administration** > **Security** > **Policies**.
1. Select the **Enable** check box for **Share Dashboards Outside of the Organization**.
1. The policy is changed. It can take up to 5 minutes for the policy to go into effect.

## Verify your role allows external sharing

You must have specific role capabilities to share a dashboard with external users:

* **Share Dashboards with the Allowlist.** Share dashboards with users on the allowlist.
* The **Share Dashboards with the World.** Share dashboards with external user users. 

If you do not already have a role that grants you the required capability, an Admin user can assign you one, as described on [Assign Roles to Users](/docs/manage/users-roles/roles/add-remove-users-role.md) , or create a new one as necessary, as described on [Create a New Role](/docs/manage/users-roles/roles/create-manage-roles.md). 

## Add external users to service allowlist

If you want to share dashboards with specific external users, rather than the world, the service allowlist must be enabled, and you must provide the list of IPs or CIDRs that will be able to view dashboards without logging in. For instructions, see [Enable Dashboard Allowlist](/docs/manage/security/create-allowlist-ip-cidr-addresses.md).

:::note
Administrator privileges are required to enable the service allowlist.
:::

## Share the dashboard

1.  In the left navigation pane, right-click the dashboard you want to share, and click **Share** in the context menu.   

    ![share-option.png](/img/dashboards/share-option.png)

2.  The Share Dashboard dialog appears.
3.  Click **Shareable URL** to expand that section of the page.   

    ![share-outside.png](/img/dashboards/share-outside.png)

4.  If you want viewers to see the dashboard with the currently selected filters, toggle the **Share with filter values** option.
5.  If you want viewers to see the dashboard with the currently selected time range, toggle the **Share with dashboard time range** option.
6.  Toggle the **Make this dashboard accessible outside your org option** on.
7.  In the **Visibility** area, select “Whitelist” or “World”, and click **Save**. 

The URL that external users can use to access the dashboard appears under the **Shareable URL** section of the page. 

## Get an iframe element for the dashboard (Optional)

If you would like to embed the shared dashboard in a web page, you can get an iframe element for the dashboard.

1.  Perform the first three substeps of [Step 4](#step-4-share-the-dashboard) above.
2.  Click **Embed** in the **Shareable URL** section of the page.  
3.  The HTML for embedding the dashboard in an iframe appears.  

    ![iframe-code.png](/img/dashboards/iframe-code.png)

4.  Click **Copy** to copy the HTML.

## Restrictions and limitations for external sharing 

* Sharing outside an organization is always view-only and in live mode, and not all [operators are compatible with live mode](restricted-operators-dashboards.md#live-mode-restrictions). It may take several minutes for panels to load data depending on your queries and time ranges.
* Panels that are [incompatible with live mode](restricted-operators-dashboards.md#live-mode-restrictions) show data only for viewers who have a login.
* Panels must use relative time ranges (such as Last 15 Minutes, Last 24 Hours). Absolute time ranges are not currently supported.
* Viewers without a login will see a live version of the dashboard with any default time ranges and filters applied. To specify a different set of filters for another viewer, create a copy of the dashboard, provide new filter values and share it with the new URL.

## Logging for externally-shared dashboards

If you have the [Audit Index](/docs/manage/security/audit-index.md) enabled, Sumo logs key sharing events. 

When a user shares a dashboard outside of the organization, Sumo logs the following information:

* Dashboard name
* Dashboard URL
* Owner name
* Owner email
* Visibility (“world” or “whitelist”)

When someone views a dashboard without signing in, Sumo logs the following information:

* Dashboard name
* Dashboard URL
* Owner name
* Owner email
* Visibility (“world” or “whitelist”)
* Viewer’s IP address

## Alerts and reports for externally-shared dashboards

You can use [Scheduled Searches](/docs/alerts/scheduled-searches) to create alerts and reports on sharing dashboards outside your organization.

**Real-time alert when a user shares a dashboard**

```sql
_index=sumologic_audit and _sourceName=REPORT "Published REPORT"
| parse "Published REPORT Name=*, UserName=* UserEmail=*} PublisherName=* PublisherEmail=*} Visibility=* URL=*" as dashboardName,userName,userEmail,publisherName,publisherEmail,visibility, URL
| count by dashboardName, userName, userEmail, visibility, URL
| fields -_count
```

**Scheduled search report of dashboard views**

```sql
_index=sumologic_audit and _sourceName=REPORT "Viewed Report"
| parse "Name=*, Id=Some(*)," as dashboardName,dashboardId
| parse "URL=*, ViewerIP=*" as url,viewerip
| count
```

**Visualization of dashboard views by geography**

```sql
_index=sumologic_audit and _sourceName=REPORT "Viewed Report"
| parse "Name=*, Id=Some(*)," as dashboardName,dashboardId
| parse "URL=*, ViewerIP=*" as url,viewerip
| lookup latitude, longitude from geo://location on ip=viewerip
| count by latitude, longitude
| sort _count
```

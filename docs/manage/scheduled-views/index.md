---
slug: /manage/scheduled-views
title: Scheduled Views
description: Scheduled Views speed the search process for small and historical subsets of your data by functioning as a pre-aggregated index.
---

Scheduled Views speed the search process for small and historical subsets of your data by functioning as a pre-aggregated/pre-compute index.

* Due to the way data is indexed not all operators are supported in Scheduled Views. See our [list of supported operators](scheduled-views-best-practices.md).
* There is a limit of 500 Scheduled Views per account.
* Scheduled View queries run once per minute.
* Queries that run against Scheduled Views return search results much faster because the data is pre-aggregated before the query is run. 
* Creating a Scheduled View for a query can vastly reduce the amount of data scanned at search time.
* Scheduled View once created cannot be edited/updated.
* Scheduled Views can include historical data from as far back as the beginning of your retention period (say, 60 days or 90 days). Because historical data is included, Scheduled Views can help uncover long-term trends.
* You can use Scheduled Views in Scheduled Searches, Dashboards, and ad hoc searches. Your Dashboards can include a large quantity of data without sacrificing performance. 
* Scheduled Views are assigned to the **InternalCollector** index.
* The results returned by a Scheduled View count towards ingestion volume if they contain raw log messages (`_raw`).
* Account Admins and users whose role grants the "Manage Scheduled Views" [role capability](../users-roles/roles/role-capabilities.md) can set up Scheduled Views, but anyone in an organization can run searches against them. Other users' data access to a Scheduled View is governed by the search filters associated with their roles; they will only be able to see data to which their roles allow them access. For more information, see [Construct a Search Filter for a Role](../users-roles/roles/construct-search-filter-for-role.md).

## How could my organization use Scheduled Views?

**Web access trends.** Creating a Scheduled View allows you to isolate logs related to your site, making it easy to report on web traffic patterns.

**App usage metrics.** A Scheduled View can help you track the usage of one or more applications over time. Depending on your deployment, you could build a Scheduled View for each application.

**Threat analysis.** Because a Scheduled View indexes any type of data, you could create a Scheduled View for firewall logs, for example. You could then leverage this Scheduled View to see how threat types and threat levels vary over time, or even which IPs from high-risk areas are hitting your site.

**User behavior.** A Scheduled View can be used to parse logins by user ID across your entire deployment, so you can answer audit-related questions quickly. Faster query results on this dataset allow for high-level investigations, such as checking to see if users have logged in during the past 60 days (or as far back as your retention period).

:::note
For Scheduled View query requirements, see [Scheduled Views Best Practices and Examples](scheduled-views-best-practices.md). 
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

## Guide Contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/manage/scheduled-views/add-scheduled-view"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Add a Scheduled View</h4></a>
  <p>Learn how to add a Scheduled View.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/manage/scheduled-views/pause-disable-scheduled-views"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Pause or Disable Scheduled Views</h4></a>
  <p>Learn how to pause view stops new data from being Indexed.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/manage/scheduled-views/run-search-against-scheduled-view"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Run a Search Against a Scheduled View</h4></a>
  <p>Learn how to run a search against Indexed data in a Scheduled View.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/manage/scheduled-views/scheduled-view-lag-time"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="50"/><h4>Scheduled View Lag Time</h4></a>
  <p>Learn how to view data that's not up to date in the Scheduled View.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/manage/scheduled-views/scheduled-views-best-practices"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="50"/><h4>Scheduled Views Best Practices and Examples</h4></a>
  <p>Get to know some tips for setting up Scheduled View queries.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/manage/scheduled-views/view-list-scheduled-views"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="50"/><h4>View Information About Scheduled Views</h4></a>
  <p>Learn how to view a list of Scheduled Views configured for your org.</p>
  </div>
</div>
</div>

---
slug: /manage/views
title: Views
description: Views speed the process for small and historical subsets of your data by functioning as a pre-aggregated index.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Views allows you to track all user created indexes and system created indexes which thereby helps you to configure data forwarding, retention period, and data tier for these indexes. Views speed the process for small and historical subsets of your data by functioning as a pre-aggregated/pre-compute index. 

* Visibility of all indexes will be based on admin created roles/permissions.
* As a user you will be able to delete or decommission the user created indexes.
* As a user you will be able to see the schema of each view and see the views in search autocomplete to which you have the access.
* As a admin you will be able to view the existing system limits for each type and amount of consumed quota. 
* Only admin can define the access control on these indexes.
* Scheduled searches only with **Save to Index** alert type will be visible in Views.

## Limitations

- Default limit for views per org is 1000.
- Default limit for partitions per org is 50.
- Default limit for optimizits per org is 100.
- Default limit for Scheduled Views per org is 500.
- Default limit for all other views per org is 50.

## Guide Contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/views/scheduled-views"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Scheduled View</h4></a>
  <p>Learn how to add a Scheduled View.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/views/scheduled-searches"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Scheduled Searches</h4></a>
  <p>Learn how to add a Scheduled Searches.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/views/run-search-against-view"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Run a Search Against a Scheduled View</h4></a>
  <p>Learn how to run a search against Indexed data in a Scheduled View.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/views/view-list"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="50"/><h4>View Information About Scheduled Views</h4></a>
  <p>Learn how to view a list of Scheduled Views configured for your org.</p>
  </div>
</div>
</div>
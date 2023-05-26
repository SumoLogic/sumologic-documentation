---
id: audit-index-access
title: Grant Access to Data in Audit Indexes
sidebar_label: Audit Index Data Permissions (Beta)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Closed Beta</span></a></p>

This feature is in Beta. To participate, contact your Sumo Logic account executive.

Sumo Logic has added new [role capabilities](/docs/manage/users-roles/roles/role-capabilities) that allow you to grant access to the following audit indexes:

* [Search Audit Index](/docs/manage/security/search-audit-index). Contains logs on search usage and activities for your account, and is stored in the `sumologic_search_usage_per_query` partition.
* [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index). Contains logs that provide visibility in ingest volume, and is stored in the  `sumologic_volume_index` partition.
* [Audit Event Index](/docs/manage/security/audit-event-index). Contains JSON logs on account activities, both actions initiated by users and actions  initiated by Sumo Logic. User event logs ares stored in the `sumologic_audit_events` partition. Sumo Logic event logs are stored in the `sumologic_system_events` partition.
* [Audit Index](/docs/manage/security/audit-index). Contains account activity logs from Sumo Logic's older logging framework, and is stored in the `sumologic_audit` partition.

With this change, role search filters will no longer be applied to audit indexes. Log Monitors use the view audit index capability of their creator.

The table below describes the role capabilities required to access audit indexes.

| Role Capability | Description |
|:---|:---|
| Search Audit Index | Grants access to all of the data in the Search Audit Index. |
| Data Volume Index | Grants access to all of the data in the Data Volume Index and to system action events in the Audit Event Index. (System action events are events resulting from Sumo Logic actions.) |
| Audit Event Index | Grants access to all of the user action events in the Audit Event Index, and all the data in the Audit Index. (User action events are events resulting from user actions.) |

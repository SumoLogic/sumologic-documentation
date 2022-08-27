---
id: audit-index-access
title: Grant Access to Data in Audit Indexes
sidebar_label: Audit Index Data Permissions (Beta)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<p> <a href="/docs/beta"><span className="beta">Beta</span></a> </p>

Sumo Logic has added new [role capabilities](https://help.sumologic.com/Manage/Users-and-Roles/Manage-Roles/05-Role-Capabilities) that allow you to grant access to the following audit indexes:

* [Search Audit Index](https://help.sumologic.com/Manage/Security/Search_Audit_Index). Contains logs on search usage and activities for your account, and is stored in the `sumologic_search_usage_per_query` partition.
* [Data Volume Index](https://help.sumologic.com/Manage/Ingestion-and-Volume/Data_Volume_Index). Contains logs that provide visibility in ingest volume, and is stored in the  `sumologic_volume_index` partition.
* [Audit Event Index](https://help.sumologic.com/Manage/Security/Audit_Event_Index). Contains JSON logs on account activities, both actions initiated by users and actions  initiated by Sumo Logic. User event logs ares stored in the `sumologic_audit_events` partition. Sumo Logic event logs are stored in the `sumologic_system_events` partition.
* [Audit Index](https://help.sumologic.com/Manage/Security/Audit-Index). Contains account activity logs from Sumo Logic's older logging framework, and is stored in the `sumologic_audit` partition.

With this change, role search filters will no longer be applied to audit indexes.The table below describes the role capabilities required to access audit indexes.

Log Monitors use the view audit index capability of their creator.

<table>
  <tr>
   <td>
    Role Capability
   </td>
   <td>
    Description
   </td>
  </tr>
  <tr>
   <td>
    Search Audit Index
   </td>
   <td>Grants access to all of the data in the Search Audit Index.
   </td>
  </tr>
  <tr>
   <td>Data Volume Index
   </td>
   <td>Grants access to all of the data in the Data Volume Index and to system action events in the Audit Event Index.
<p>(System action events are events resulting from Sumo Logic actions.)</p>
   </td>
  </tr>
  <tr>
   <td>Audit Event Index
   </td>
   <td>Grants access to all of the user action events in the Audit Event Index, and all the data in the Audit Index.
<p>(User action events are events resulting from user actions.)</p>
   </td>
  </tr>
</table>

---
id: ingest-budget-v2
title: Sumo Logic Ingest Budget v2 Management APIs
sidebar_label: Ingest Budget Management v2
---


## Availability

<table>
  <tr>
   <td>Account Type
   </td>
   <td>Account Level
   </td>
  </tr>
  <tr>
   <td>CloudFlex
   </td>
   <td>Enterprise
   </td>
  </tr>
  <tr>
   <td>Credits
   </td>
   <td>Trial, Enterprise Operations, Enterprise Security, Enterprise Suite
   </td>
  </tr>
</table>


The Ingest Budget Management API **V2** allows you to manage metadata-based [ingest budgets](https://help.sumologic.com/Manage/Ingestion-and-Volume/Ingest_Budgets) (with a scope) from HTTP endpoints.

See [V1 API](https://help.sumologic.com/APIs/Ingest_Budget_Management_API) for management of ingest budgets with a Field Value.

To manage ingest budgets you must have the **Manage Ingest Budgets** [role capability](https://help.sumologic.com/Manage/Users-and-Roles/Manage-Roles/05-Role-Capabilities). Enabling this will automatically enable the Manage Collectors capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different Collectors, but not creating or deleting them. For more information see [Ingest Budgets](https://help.sumologic.com/Manage/Ingestion-and-Volume/Ingest_Budgets).

Refer to [Getting Started](docs/api/index.md) for Authentication information and Endpoints.

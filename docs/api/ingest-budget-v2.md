---
id: ingest-budget-v2
title: Ingest Budget v2 Management APIs
sidebar_label: Ingest Budget v2
description: The Ingest Budget Management API V2 allows you to manage metadata-based ingest budgets (V2) from HTTP endpoints.
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="Thumbnail icon" width="50"/>

The Ingest Budget Management API **V2** allows you to manage metadata-based [ingest budgets](/docs/manage/ingestion-volume/ingest-budgets) (with a scope) from HTTP endpoints.

See [V1 API](/docs/api/ingest-budget-v1) for management of ingest budgets with a Field Value.

To manage ingest budgets, you must have the **Manage Ingest Budgets** [role capability](/docs/manage/users-roles/roles/role-capabilities). Enabling this will automatically enable the Manage Collectors capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different Collectors, but not creating or deleting them. For more information, see [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets).

| Account Type | Account Level          |
|:--------------|:--------------|
| CloudFlex    | Enterprise      |
| Credits      | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

{@import ../reuse/api-intro.md}


| Deployment | Documentation URL                                                |
|:------------|:------------------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/ingestBudgetManagementV2  |
| CA         | https://api.ca.sumologic.com/docs/#tag/ingestBudgetManagementV2  |
| DE         | https://api.de.sumologic.com/docs/#tag/ingestBudgetManagementV2  |
| EU         | https://api.eu.sumologic.com/docs/#tag/ingestBudgetManagementV2  |
| FED        | https://api.fed.sumologic.com/docs/#tag/ingestBudgetManagementV2 |
| IN         | https://api.in.sumologic.com/docs/#tag/ingestBudgetManagementV2  |
| JP         | https://api.jp.sumologic.com/docs/#tag/ingestBudgetManagementV2  |
| US1        | https://api.sumologic.com/docs/#tag/ingestBudgetManagementV2     |
| US2        | https://api.us2.sumologic.com/docs/#tag/ingestBudgetManagementV2 |

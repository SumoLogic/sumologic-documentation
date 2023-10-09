---
id: ingest-budget-v1
title: Ingest Budget Management APIs
sidebar_label: Ingest Budget
description: The Ingest Budget Management API allows you to manage ingest budgets from HTTP endpoints.
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="Thumbnail icon" width="50"/>

The Ingest Budget Management API allows you to manage **V1** [ingest budgets](/docs/manage/ingestion-volume/ingest-budgets) that have a **Field Value** from HTTP endpoints.

See [V2 API](/docs/api/ingest-budget-v2) for management of ingest budgets with a scope.

To manage ingest budgets, you must have the **Manage Ingest Budgets** [role capability](/docs/manage/users-roles/roles/role-capabilities). Enabling this will automatically enable the Manage Collectors capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different Collectors, but not creating or deleting them. For more information, see [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets).

| Account Type | Account Level          |
|:--------------|:--------------|
| CloudFlex    | Enterprise      |
| Credits      | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |


{@import ../reuse/api-intro.md}

| Deployment | Documentation URL                                                |
|:------------|:-------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| CA         | https://api.ca.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| DE         | https://api.de.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| EU         | https://api.eu.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| FED        | https://api.fed.sumologic.com/docs/#tag/ingestBudgetManagementV1 |
| IN         | https://api.in.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| JP         | https://api.jp.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| US1        | https://api.sumologic.com/docs/#tag/ingestBudgetManagementV1     |
| US2        | https://api.us2.sumologic.com/docs/#tag/ingestBudgetManagementV1 |

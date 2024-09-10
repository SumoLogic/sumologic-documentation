---
id: ingest-budget-v1
title: Ingest Budgets Management V1 APIs
sidebar_label: Ingest Budgets V1
description: Ingest Budget Management APIs allow you to manage ingest budgets from HTTP endpoints.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="Thumbnail icon" width="50"/>

The Ingest Budget Management V1 APIs allow you to manage V1 [ingest budgets](/docs/manage/ingestion-volume/ingest-budgets) that have a Field Value from HTTP endpoints.

You can use [V2 APIs](/docs/api/ingest-budget-v2) to manage metadata-based ingest budgets (with a scope) from HTTP endpoints.

:::note
V1 budgets will be deprecated September 16, 2024.
:::

## Prerequisites

| Account Type | Account Level          |
|:--------------|:--------------|
| CloudFlex    | Enterprise      |
| Credits      | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                                |
|:------------|:-------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| CA         | https://api.ca.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| DE         | https://api.de.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| EU         | https://api.eu.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| FED        | https://api.fed.sumologic.com/docs/#tag/ingestBudgetManagementV1 |
| IN         | https://api.in.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| JP         | https://api.jp.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| KR         | https://api.kr.sumologic.com/docs/#tag/ingestBudgetManagementV1  |
| US1        | https://api.sumologic.com/docs/#tag/ingestBudgetManagementV1     |
| US2        | https://api.us2.sumologic.com/docs/#tag/ingestBudgetManagementV1 |

<!-- ## Required role capabilities

<ApiRoles/>

* Data Management
    * Manage Ingest Budgets

-->

To manage ingest budgets, you must have the **Manage Ingest Budgets** role capability. Enabling this will automatically enable the Manage Collectors capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different Collectors, but not creating or deleting them. For more information, see [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets).

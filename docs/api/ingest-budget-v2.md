---
id: ingest-budget-v2
title: Ingest Budgets Management V2 APIs
sidebar_label: Ingest Budgets V2
description: Ingest Budgets Management V2 APIs allow you to manage metadata-based ingest budgets (V2) from HTTP endpoints.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="Thumbnail icon" width="50"/>

The Ingest Budget Management V2 APIs allow you to manage metadata-based [ingest budgets](/docs/manage/ingestion-volume/ingest-budgets) (with a scope) from HTTP endpoints.

:::note
Ingest Budget Management V1 APIs have been removed and are no longer supported.
:::

## Prerequisites

| Account Type | Account Level          |
|:--------------|:--------------|
| CloudFlex    | Enterprise      |
| Credits      | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/ingestBudgetManagementV2   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/ingestBudgetManagementV2   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/ingestBudgetManagementV2   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/ingestBudgetManagementV2   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/ingestBudgetManagementV2  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/ingestBudgetManagementV2   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/ingestBudgetManagementV2   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/ingestBudgetManagementV2      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/ingestBudgetManagementV2  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/ingestBudgetManagementV2  |

## Required role capabilities

<ApiRoles/>

* [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management)
    * Manage Ingest Budgets

To manage ingest budgets, you must have the **Manage Ingest Budgets** role capability. Enabling this will automatically enable the **Manage Collectors** capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different Collectors, but not creating or deleting them. For more information, see [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets).

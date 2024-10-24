---
id: scan-budget
title: Scan Budgets Management APIs
sidebar_label: Scan Budgets
description: Scan Budgets Management V2 APIs allows you to manage scan budgets from HTTP endpoints
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="Thumbnail icon" width="50"/>

The Scan Budget Management APIs allows you to manage scan budgets from HTTP endpoints. Scan budgets apply to all chargeable log scan queries. For more information, refer to [Scan Budgets](/docs/manage/manage-subscription/usage-management).

## Prerequisites

| Account Type | Account Level  |
|:--|:--|
| Credits      | Enterprise Suite |

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                        |
|:--|:--|
| AU         | https://api.au.sumologic.com/docs/#tag/budgetManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/budgetManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/budgetManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/budgetManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/budgetManagement |
| IN         | https://api.in.sumologic.com/docs/#tag/budgetManagement  |
| JP         | https://api.jp.sumologic.com/docs/#tag/budgetManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/budgetManagement  |
| US1        | https://api.sumologic.com/docs/#tag/budgetManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/budgetManagement |

To manage scan budgets, you must have the **Manage Usage Management** role capability. Enabling this will also automatically enable the **View Usage Management** capability.

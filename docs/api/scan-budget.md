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

The Scan Budget Management APIs allows you to manage scan budgets from HTTP endpoints. Scan budgets apply to all chargeable log scan queries. For more information, refer to [Scan Budget](/docs/manage/manage-subscription/scan-budgets).

## Prerequisites

| Account Type | Account Level  |
|:--|:--|
| Credits      | Enterprise Suite |

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/budgetManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/budgetManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/budgetManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/budgetManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/budgetManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/budgetManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/budgetManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/budgetManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/budgetManagement  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/budgetManagement  |

## Required role capabilities

<ApiRoles/>

* [Usage Management](/docs/manage/users-roles/roles/role-capabilities/#usage-management)
    * View Usage Management
    * Manage Usage Management

To manage scan budgets, you must have the **Manage Usage Management** role capability. Enabling this will also automatically enable the **View Usage Management** capability.

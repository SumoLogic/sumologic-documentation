---
id: role-management
title: Role Management APIs
sidebar_label: Roles
description: Role Management APIs allow you to manage roles from HTTP endpoints.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/role-based-access.png')} alt="icon" width="50"/>

Roles determine the functions that users are able to perform in Sumo Logic. The Role Management API allows you to [manage roles](/docs/manage/users-roles/roles/create-manage-roles) from HTTP endpoints.

To manage roles, you must have an administrator role or your role must have been assigned the manage users and roles capability. For more information, see [Manage Roles](/docs/manage/users-roles/).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/roleManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/roleManagement   |
| CH  | Switzerland (Zurich)   | eu-central-2   | https://api.ch.sumologic.com/docs/#tag/roleManagement  |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/roleManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/roleManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/roleManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/roleManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/roleManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/roleManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/roleManagement  |

## Required role capabilities

<ApiRoles/>

* [User Management](/docs/manage/users-roles/roles/role-capabilities/#user-management) (all role capabilities)

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

| Deployment | Documentation URL                                      |
|:------------|:--------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/roleManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/roleManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/roleManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/roleManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/roleManagement |
| JP         | https://api.jp.sumologic.com/docs/#tag/roleManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/roleManagement  |
| US1        | https://api.sumologic.com/docs/#tag/roleManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/roleManagement |

## Required role capabilities

<ApiRoles/>

* User Management (all role capabilities)

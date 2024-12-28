---
id: organizations-management
title: Organizations Management APIs
sidebar_label: Organizations
description: With the Organizations Management API, you can get the credits usage details of the child organizations.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/manage.png')} alt="icon" width="50"/>

With the Organizations Management API, you can get the credits usage details of the child organizations. For more information, see [Manage Organizational Settings](/docs/manage/manage-subscription/manage-org-settings).

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                                 |
|:------------|:-------------------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/orgsManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/orgsManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/orgsManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/orgsManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/orgsManagement |
| IN         | https://api.in.sumologic.com/docs/#tag/orgsManagement  |
| JP         | https://api.jp.sumologic.com/docs/#tag/orgsManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/orgsManagement  |
| US1        | https://api.sumologic.com/docs/#tag/orgsManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/orgsManagement<br/>https://organizations.sumologic.com/docs/#tag/organizationsManagement* <br/> *This assembly is exclusive to the US2 deployment and is designed to manage APIs for Sumo Logic orgs that are not tied to a specific deployment. For example, a parent organization might have child organizations across different deployments. As a result, the [List Organizations API](https://organizations.sumologic.com/docs/#operation/listOrganizations), which lists child organizations, is included in this assembly to accommodate child organizations spread across multiple deployments. |

<!-- ## Required role capabilities

<ApiRoles/>

* Organizations (all role capabilities)

-->

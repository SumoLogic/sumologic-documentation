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

With the Organizations Management API, you can get the credits usage details of the child organizations. For more information, see [Manage Organization Settings](/docs/manage/manage-subscription/create-and-manage-orgs/manage-org-settings).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/orgsManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/orgsManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/orgsManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/orgsManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/orgsManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/orgsManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/orgsManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/orgsManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/orgsManagement<br/>https://organizations.sumologic.com/docs/#tag/organizationsManagement <sup>`*`</sup>>  |
| ZRH | Switzerland (Zurich)   |  eu-central-2  | https://api.zrh.sumologic.com/docs/#tag/orgsManagement  |

<sup>`*`</sup> This assembly is exclusive to the US2 deployment and manages APIs for Sumo Logic orgs not tied to a specific deployment, such as parent orgs with child orgs across multiple deployments. It includes the [List Organizations API](https://organizations.sumologic.com/docs/#operation/listOrganizations) to support this setup.

## Required role capabilities

<ApiRoles/>

* Organizations (all role capabilities)

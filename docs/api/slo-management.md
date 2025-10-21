---
id: slo-management
title: SLO Management APIs
sidebar_label: SLOs
description: Use SLO Management API to can monitor and set up alerts on KPIs for your most important services or user experience
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/observe.png')} alt="icon" width="35"/>

With the SLO Management API, you can monitor and set up alerts on KPIs for your most important services or user experience. For more information, see [Reliability Management (SLOs and SLIs)](/docs/observability/reliability-management-slo).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/slosLibraryManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/slosLibraryManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/slosLibraryManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/slosLibraryManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/slosLibraryManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/slosLibraryManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/slosLibraryManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/slosLibraryManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/slosLibraryManagement  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/slosLibraryManagement  |

## Required role capabilities

<ApiRoles/>

* [Reliability Management](/docs/manage/users-roles/roles/role-capabilities/#reliability-management)
    * Manage SLOs
    * View SLOs

---
id: data-archiving
title: Data Archiving Management APIs
sidebar_label: Data Archiving
description: Use HTTP endpoints to manage Data Archiving jobs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/archive.png')} alt="Archive icon" width="40"/>

The Data Archiving Management API allows you to create and manage AWS S3 archive destinations for Installed Collectors.

:::info
You need the [Manage or View Collectors role capability](/docs/manage/users-roles/roles/role-capabilities/#data-management) to create an AWS archive destination. For more information, see [Archive](/docs/manage/data-archiving/archive).
:::

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/dataArchivingManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/dataArchivingManagement   |
| CH  | Switzerland (Zurich)   | eu-central-2   | https://api.ch.sumologic.com/docs/#tag/dataArchivingManagement  |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/dataArchivingManagement   |
| ESC | AWS European Sovereign Cloud | eusc-de-east-1 | https://api.esc.sumologic.com/docs/#tag/dataArchivingManagement  |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/dataArchivingManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/dataArchivingManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/dataArchivingManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/dataArchivingManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/dataArchivingManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/dataArchivingManagement  |

## Required role capabilities

<ApiRoles/>

* [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management)
    * Manage S3 Data Forwarding
    * Manage Collectors
    * View Collectors

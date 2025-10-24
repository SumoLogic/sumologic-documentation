---
id: archive-ingestion
title: Archive Ingestion Management APIs
sidebar_label: Archive Ingestion
description: Use HTTP endpoints to manage Archive ingestion jobs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/archive.png')} alt="icon" width="40"/>

The Archive Ingestion Management API allows you to ingest data from Archive destinations. You can use this API to ingest data from your Archive with an existing [AWS S3 Archive Source](/docs/manage/data-archiving/archive#create-an-aws-s3-archivesource).

:::info
You need the [Manage or View Collectors role capability](/docs/manage/users-roles/roles/role-capabilities/#data-management) to manage or view ingestion jobs. For more information, see [Archive](/docs/manage/data-archiving/archive).
:::

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/archiveManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/archiveManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/archiveManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/archiveManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/archiveManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/archiveManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/archiveManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/archiveManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/archiveManagement  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/archiveManagement  |

## Required role capabilities

<ApiRoles/>

* [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management)
    * Manage Collectors
    * View Collectors

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

| Deployment | Documentation URL                                         |
|:------------|:-----------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/archiveManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/archiveManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/archiveManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/archiveManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/archiveManagement |
| IN         | https://api.in.sumologic.com/docs/#tag/archiveManagement  |
| JP         | https://api.jp.sumologic.com/docs/#tag/archiveManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/archiveManagement  |
| US1        | https://api.sumologic.com/docs/#tag/archiveManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/archiveManagement |

<!-- ## Required role capabilities

<ApiRoles/>

* Data Management
    * Manage Collectors
    * View Collectors

-->
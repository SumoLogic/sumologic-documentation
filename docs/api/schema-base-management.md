---
id: schema-base-management
title: Schema Base Management APIs
sidebar_label: Schema Base
description: Customize schema base management APIs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/schema.png')} alt="Thumbnail icon" width="50"/>

Use this API to customize schema used by [OpenTelemetry Remote Management Source Templates](/docs/send-data/opentelemetry-collector/remote-management/source-templates/).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/schemaBaseManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/schemaBaseManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/schemaBaseManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/schemaBaseManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/schemaBaseManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/schemaBaseManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/schemaBaseManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/schemaBaseManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/schemaBaseManagement  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/schemaBaseManagement  |

## Required role capabilities

<ApiRoles/>

* [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management)
   * Manage Collectors
   * View Collectors

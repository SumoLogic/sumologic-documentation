---
id: source-template-management
title: Source Template Management APIs
sidebar_label: Source Template
description: Manage OpenTelemetry Source Templates with APIs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/topology-explorer.png')} alt="Thumbnail icon" width="50"/>

Use this API to manage [OpenTelemetry Remote Management Source Templates](/docs/send-data/opentelemetry-collector/remote-management/source-templates/).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/sourceTemplateManagementExternal   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/sourceTemplateManagementExternal   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/sourceTemplateManagementExternal   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/sourceTemplateManagementExternal   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/sourceTemplateManagementExternal  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/sourceTemplateManagementExternal   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/sourceTemplateManagementExternal   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/sourceTemplateManagementExternal      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/sourceTemplateManagementExternal  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/sourceTemplateManagementExternal  |

## Required role capabilities

<ApiRoles/>

* [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management)
   * Manage Collectors
   * View Collectors
---
id: content-permissions
title: Content Permissions APIs
sidebar_label: Content Permissions
description: Use HTTP endpoints to manage content permissions.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/general/community.png')} alt="Thumbnail icon" width="60"/>

The Content Permissions API allows you to share your folders, searches, and dashboards with specific users or roles from HTTP endpoints. For more information, see [Share Content](/docs/manage/content-sharing/).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/contentPermissions   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/contentPermissions   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/contentPermissions   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/contentPermissions   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/contentPermissions  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/contentPermissions   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/contentPermissions   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/contentPermissions      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/contentPermissions  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/contentPermissions  |

## Required role capabilities

<ApiRoles/>

* Dashboards (all)
* Data Management
    * Manage Content
* Security
    * Change Data Access Level
    * Manage Share Dashboards Outside of Organization

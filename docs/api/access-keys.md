---
id: access-keys
title: Access Keys Management APIs
sidebar_label: Access Keys
description: Use HTTP endpoints to manage access keys.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/security/security.png')} alt="Thumbnail icon" width="50"/>

The [Access Keys](/docs/manage/security/access-keys) Management API allows you to securely register new Collectors or access Sumo Logic APIs.

## Documentation

<ApiIntro/>


| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/accessKeyManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/accessKeyManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/accessKeyManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/accessKeyManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/accessKeyManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/accessKeyManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/accessKeyManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/accessKeyManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/accessKeyManagement  |
| ZRH | Switzerland (Zurich)   |                | https://api.zrh.sumologic.com/docs/#tag/accessKeyManagement  |

## Required role capabilities

<ApiRoles/>

* Security
    * Create Access Keys
    * Manage Access Keys

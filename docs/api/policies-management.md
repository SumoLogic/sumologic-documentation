---
id: policies-management
title: Policies Management APIs
sidebar_label: Policies
description: Use HTTP endpoints to manage your account's security policies.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/security/security.png')} alt="Thumbnail icon" width="50"/>

The Policies Management API allows you to control the security and share settings of your organization. For more information, see [Security](/docs/manage/security/).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/policiesManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/policiesManagement   |
| CH  | Switzerland (Zurich)   | eu-central-2   | https://api.ch.sumologic.com/docs/#tag/policiesManagement  |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/policiesManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/policiesManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/policiesManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/policiesManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/policiesManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/policiesManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/policiesManagement  |

## Required role capabilities

<ApiRoles/>

* [Security](/docs/manage/users-roles/roles/role-capabilities/#security) (all role capabilities)

---
id: password-policy
title: Password Policy Management APIs
sidebar_label: Password Policy
description: Use HTTP endpoints to manage your account's password policy.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/security/security.png')} alt="Thumbnail icon" width="50"/>

The Password Policy Management API allows you to manage the [password policy](/docs/manage/security/set-password-policy.md) for your Sumo Logic users.

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/passwordPolicy   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/passwordPolicy   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/passwordPolicy   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/passwordPolicy   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/passwordPolicy  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/passwordPolicy   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/passwordPolicy   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/passwordPolicy      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/passwordPolicy  |
| ZRH | Switzerland (Zurich)   |                | https://api.zrh.sumologic.com/docs/#tag/passwordPolicy  |

## Required role capabilities

<ApiRoles/>

* Security
    * Manage Password Policy

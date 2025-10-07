---
id: service-allowlist
title: Service Allowlist Management APIs
sidebar_label: Service Allowlist
description: Use HTTP endpoints to manage service allowlist settings.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/security/unlock.png')} alt="icon" width="50"/>

The [Service Allowlist](/docs/manage/security/create-allowlist-ip-cidr-addresses) Management API allows you to explicitly grant access to specific IP addresses and/or CIDR notations for logins, APIs, and dashboard access.

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/serviceAllowlistManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/serviceAllowlistManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/serviceAllowlistManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/serviceAllowlistManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/serviceAllowlistManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/serviceAllowlistManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/serviceAllowlistManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/serviceAllowlistManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/serviceAllowlistManagement  |
| ZRH | Switzerland (Zurich)   |                | https://api.zrh.sumologic.com/docs/#tag/serviceAllowlistManagement  |

## Required role capabilities

<ApiRoles/>

* Security
    * Allowlist IP Addresses

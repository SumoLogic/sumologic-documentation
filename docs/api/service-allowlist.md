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

| Deployment | Documentation URL                                                  |
|:------------|:--------------------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/serviceAllowlistManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/serviceAllowlistManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/serviceAllowlistManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/serviceAllowlistManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/serviceAllowlistManagement |
| JP         | https://api.jp.sumologic.com/docs/#tag/serviceAllowlistManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/serviceAllowlistManagement  |
| US1        | https://api.sumologic.com/docs/#tag/serviceAllowlistManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/serviceAllowlistManagement |

## Required role capabilities

<ApiRoles/>

* Security
    * Allowlist IP Addresses

---
id: service-accounts
title: Service Accounts APIs
sidebar_label: Service Accounts
description: Use the API to manage service accounts.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/business/user-permissions.png')} alt="icon" width="50"/>

The Service Accounts API allows you to manage service accounts. [Service accounts](/docs/manage/security/service-accounts/) are a special type of account designed for automating processes that use Sumo Logic APIs, such as scripts, integrations, and infrastructure as code. Unlike user accounts, service accounts are not associated with an individual and do not allow for interactive logins.

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                                  |
|:------------|:--------------------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag//serviceAccountManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag//serviceAccountManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag//serviceAccountManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag//serviceAccountManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag//serviceAccountManagement |
| IN         | https://api.in.sumologic.com/docs/#tag//serviceAccountManagement  |
| JP         | https://api.jp.sumologic.com/docs/#tag//serviceAccountManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag//serviceAccountManagement  |
| US1        | https://api.sumologic.com/docs/#tag//serviceAccountManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag//serviceAccountManagement |

## Required role capabilities

<ApiRoles/>

* User Management (all role capabilities)

Only administrators can create service accounts. If you are unsure whether you are an administrator, you can view your role in **Preferences** (see [Onboarding Checklists](https://help.sumologic.com/docs/get-started/onboarding-checklists/)).
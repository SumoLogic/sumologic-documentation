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

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/serviceAccountManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/serviceAccountManagement   |
| CH  | Switzerland (Zurich)   | eu-central-2   | https://api.ch.sumologic.com/docs/#tag/serviceAccountManagement  |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/serviceAccountManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/serviceAccountManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/serviceAccountManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/serviceAccountManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/serviceAccountManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/serviceAccountManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/serviceAccountManagement  |

## Required role capabilities

<ApiRoles/>

* [User Management](/docs/manage/users-roles/roles/role-capabilities/#user-management) (all role capabilities)

Only administrators can create service accounts. If you are unsure whether you are an administrator, you can view your role in **Preferences** (see [Onboarding Checklists](/docs/get-started/onboarding-checklists/)).

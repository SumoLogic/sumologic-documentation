---
id: account-management
title: Account Management APIs
sidebar_label: Accounts
description: Use HTTP endpoints to manage subdomains.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/manage.png')} alt="icon" width="50"/>

The Account Management API allows you to manage the custom subdomain for the URL used to access your Sumo Logic account. For more information, see [Manage Organization](/docs/manage/manage-subscription/create-and-manage-orgs/manage-org-settings#change-account-subdomain).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/accountManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/accountManagement   |
| CH  | Switzerland (Zurich)   | eu-central-2   | https://api.ch.sumologic.com/docs/#tag/accountManagement  |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/accountManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/accountManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/accountManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/accountManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/accountManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/accountManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/accountManagement  |

## Required role capabilities

<ApiRoles/>
* [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management)
    * View Account Overview
 
:::note
You do not require any capabilities to get overview of account status (/v1/account/status).
:::

---
id: value-realization
title: Value Realization APIs
sidebar_label: Value Realization
description: Value Realization APIs let you get the time savings that Value Overview reports and manage the assumptions behind them from HTTP endpoints.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/value.png')} alt="Value icon" width="50"/>

The Value Realization APIs let you work with the data behind [Value Overview](/docs/manage/manage-subscription/value-overview/) from HTTP endpoints. Use them to get the estimated time that Mobot, the SOC Analyst Agent, and the Root Cause Agent save your team, and to view and change the assumptions that Value Overview uses to calculate hours saved.

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU | Asia Pacific (Sydney) | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/valueRealization |
| CA | Canada (Central) | ca-central-1 | https://api.ca.sumologic.com/docs/#tag/valueRealization |
| CH | Switzerland (Zurich) | eu-central-2 | https://api.ch.sumologic.com/docs/#tag/valueRealization |
| DE | EU (Frankfurt) | eu-central-1 | https://api.de.sumologic.com/docs/#tag/valueRealization |
| ESC | AWS European Sovereign Cloud | eusc-de-east-1 | https://api.esc.sumologic.com/docs/#tag/valueRealization |
| EU | EU (Ireland) | eu-west-1 | https://api.eu.sumologic.com/docs/#tag/valueRealization |
| FED | US East (N. Virginia) | us-east-1 | https://api.fed.sumologic.com/docs/#tag/valueRealization |
| JP | Asia Pacific (Tokyo) | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/valueRealization |
| KR | Asia Pacific (Seoul) | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/valueRealization |
| US1 | US East (N. Virginia) | us-east-1 | https://api.sumologic.com/docs/#tag/valueRealization |
| US2 | US West (Oregon) | us-west-2 | https://api.us2.sumologic.com/docs/#tag/valueRealization |

## Required role capabilities

<ApiRoles/>

* [Usage Management](/docs/manage/users-roles/roles/role-capabilities/#usage-management)
    * View Value Overview
    * Manage Value Overview

To get time savings and assumptions, you need the **View Value Overview** role capability. To change assumptions, you need the **Manage Value Overview** role capability.

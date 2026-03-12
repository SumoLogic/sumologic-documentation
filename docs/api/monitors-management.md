---
id: monitors-management
title: Monitor Management APIs
sidebar_label: Monitors
description: Use HTTP endpoints to manage your account's Monitors.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/alerts.png')} alt="icon" width="40"/>

The Monitor Management API allows you to manage Monitors from HTTP endpoints. Monitors continuously query your data to monitor and send notifications when specific events occur. For more information, see [Monitors](/docs/alerts/monitors/).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/monitorsLibraryManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/monitorsLibraryManagement   |
| CH  | Switzerland (Zurich)   | eu-central-2   | https://api.ch.sumologic.com/docs/#tag/monitorsLibraryManagement  |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/monitorsLibraryManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/monitorsLibraryManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/monitorsLibraryManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/monitorsLibraryManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/monitorsLibraryManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/monitorsLibraryManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/monitorsLibraryManagement  |

## Required role capabilities

<ApiRoles/>

* [Alerting](/docs/manage/users-roles/roles/role-capabilities/#alerting) (all role capabilities)

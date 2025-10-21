---
id: muting-schedules
title: Muting Schedules Management APIs
sidebar_label: Muting Schedules
description: Muting Schedules Management APIs allow you to pause alert notifications from monitors.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/monitor-and-visualize.png')} alt="icon" width="40"/>

The Muting Schedules Management API allows you to pause alert notifications from monitors. When a muting schedule is active on a monitor, the monitor will still generate alerts, but no notifications will be sent. For more information, see [Muting Schedules](/docs/alerts/monitors/muting-schedules).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement  |


## Required role capabilities

<ApiRoles/>

* [Alerting](/docs/manage/users-roles/roles/role-capabilities/#alerting) (all role capabilities)

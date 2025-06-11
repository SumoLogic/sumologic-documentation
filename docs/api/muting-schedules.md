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

| Deployment | Documentation URL                      |
|:-----------|:-------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement |
| JP         | https://api.jp.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement  |
| US1        | https://api.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/mutingSchedulesLibraryManagement |

## Required role capabilities

<ApiRoles/>

* Alerting (all role capabilities)

---
id: logs-data-forwarding
title: Logs Data Forwarding Management APIs
sidebar_label: Logs Data Forwarding
description: Use HTTP endpoints to manage Data Forwarding to S3.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/send-data.png')} alt="icon" width="50"/>

The Logs Data Forwarding Management API allows you to forward log data from a Partition or Scheduled View to an S3 bucket. For more information, see [Forwarding Data to S3](/docs/manage/data-forwarding/amazon-s3-bucket).

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                                |
|:-----------|:-----------------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/logsDataForwardingManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/logsDataForwardingManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/logsDataForwardingManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/logsDataForwardingManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/logsDataForwardingManagement |
| JP         | https://api.jp.sumologic.com/docs/#tag/logsDataForwardingManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/logsDataForwardingManagement  |
| US1        | https://api.sumologic.com/docs/#tag/logsDataForwardingManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/logsDataForwardingManagement |

## Required role capabilities

<ApiRoles/>

* Data Management
    * Manage Partitions
    * Manage S3 Data Forwarding
    * Manage Scheduled Views
    * View Partitions
    * View Scheduled Views

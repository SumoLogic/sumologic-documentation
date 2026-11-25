---
id: usage-attribution
title: Usage Attribution APIs
sidebar_label: Usage Attribution
description: Usage Attribution APIs allow you to read the configuration, turn Usage Attribution on or off, set custom tags, and create or rebuild the dashboard.
keywords:
  - usage attribution api
  - granular usage visibility
  - granularUsage
  - custom tags
  - ingest volume
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="Data Volume icon" width="50"/>

The Usage Attribution APIs allow you to manage [Usage Attribution](/docs/manage/ingestion-volume/usage-attribution), also called Granular Usage Visibility. You can read the configuration, turn Usage Attribution on or off, set custom tags, and create or rebuild the Usage Attribution dashboard.

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU | Asia Pacific (Sydney) | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/granularUsage |
| CA | Canada (Central) | ca-central-1 | https://api.ca.sumologic.com/docs/#tag/granularUsage |
| CH | Switzerland (Zurich) | eu-central-2 | https://api.ch.sumologic.com/docs/#tag/granularUsage |
| DE | EU (Frankfurt) | eu-central-1 | https://api.de.sumologic.com/docs/#tag/granularUsage |
| ESC | AWS European Sovereign Cloud | eusc-de-east-1 | https://api.esc.sumologic.com/docs/#tag/granularUsage |
| EU | EU (Ireland) | eu-west-1 | https://api.eu.sumologic.com/docs/#tag/granularUsage |
| FED | US East (N. Virginia) | us-east-1 | https://api.fed.sumologic.com/docs/#tag/granularUsage |
| JP | Asia Pacific (Tokyo) | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/granularUsage |
| KR | Asia Pacific (Seoul) | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/granularUsage |
| US1 | US East (N. Virginia) | us-east-1 | https://api.sumologic.com/docs/#tag/granularUsage |
| US2 | US West (Oregon) | us-west-2 | https://api.us2.sumologic.com/docs/#tag/granularUsage |

## Required role capabilities

<ApiRoles/>

* [Usage Management](/docs/manage/users-roles/roles/role-capabilities/#usage-management)
    * View Usage Management
    * Manage Usage Management

The **View Usage Management** capability lets you read the configuration. The **Manage Usage Management** capability lets you change it and create or rebuild the dashboard. These are the same capabilities the Usage Attribution tab requires in the UI.

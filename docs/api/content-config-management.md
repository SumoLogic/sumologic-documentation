---
id: content-config-management
title: Content and Configuration Management APIs
sidebar_label: Content and Configuration (MSSP)
description: Use the Content and Configuration Management (C3M) APIs to sync Cloud SIEM rules, tuning expressions, Library content, monitors, and source templates across MSSP child orgs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/topology-explorer.png')} alt="Topology Explorer icon" width="60"/>

With the Content and Configuration Management (C3M) APIs, a Managed Security Service Provider (MSSP) parent org user can push and sync content and configuration across child orgs from HTTP endpoints, instead of doing it manually from the Organizations UI. You can sync [Cloud SIEM](/docs/cse/) rules, rule tuning expressions, [Library](/docs/get-started/library) content, [monitors](/docs/alerts/monitors/), and [source templates](/docs/send-data/opentelemetry-collector/remote-management/source-templates/). For more information, see [Manage Organizations for MSSPs](/docs/manage/manage-subscription/create-and-manage-orgs/manage-orgs-for-mssps).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/contentConfigManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/contentConfigManagement   |
| CH  | Switzerland (Zurich)   | eu-central-2   | https://api.ch.sumologic.com/docs/#tag/contentConfigManagement  |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/contentConfigManagement   |
| ESC | AWS European Sovereign Cloud | eusc-de-east-1 | https://api.esc.sumologic.com/docs/#tag/contentConfigManagement  |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/contentConfigManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/contentConfigManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/contentConfigManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/contentConfigManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/contentConfigManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/contentConfigManagement  |

## Required role capabilities

<ApiRoles/>

* [Manage Organizations](/docs/manage/users-roles/roles/role-capabilities/#organizations)

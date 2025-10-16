---
slug: /api/collector-management
title: Collector Management APIs
sidebar_label: Collectors
description: The Collector Management API gives you the ability to manage Collectors and Sources from HTTP endpoints.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../../reuse/api-intro.md';
import ApiRoles from '../../reuse/api-roles.md';
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="Thumbnail icon" width="50"/>

The Collector Management API gives you the ability to manage Collectors and Sources from HTTP endpoints. See the topics below for Collector API and Source API methods and examples, as well as upgrading and downgrading Collectors using the API.

:::warning
Collector Management APIs are not yet built with OpenAPI specifications and therefore not included in our [Swagger docs](https://api.sumologic.com/docs/). Instead, refer to the documentation below.
:::

## Installed Collector and Hosted Collector

Collector Management APIs for Installed and Hosted collectors are not yet built with OpenAPI specifications and therefore are not included in our [Swagger documents](https://api.sumologic.com/docs/). For legacy installed collectors or sources, refer to our legacy [collectors](/docs/api/collector-management/collector-api-methods-examples/) or [sources](/docs/api/collector-management/source-api/) API documentation.

## OpenTelemetry Collector

This API manages your OpenTelemetry collectors.

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/otCollectorManagementExternal   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/otCollectorManagementExternal   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/otCollectorManagementExternal   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/otCollectorManagementExternal   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/otCollectorManagementExternal  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/otCollectorManagementExternal   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/otCollectorManagementExternal   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/otCollectorManagementExternal      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/otCollectorManagementExternal  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/otCollectorManagementExternal  |

## Required role capabilities

<ApiRoles/>

* Data Management
    * Manage Collectors
    * View Collectors

## Guide contents

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>

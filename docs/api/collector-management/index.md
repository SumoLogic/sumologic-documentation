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
Collector Management APIs are not yet built with OpenAPI specifications and therefore not included in our [Swagger docs](https://api.sumologic.com/docs/). Instead, refer to the below documentation.
:::

## Installed Collector and Hosted Collector

Collector Management APIs for Installed and Hosted collectors are not yet built with OpenAPI specifications and therefore not included in our [Swagger docs](https://api.sumologic.com/docs/). Instead, refer to the documentation in this section.


## OpenTelemetry Collector

This API manages your OpenTelemetry collectors.

## Documentation

<ApiIntro/>

| Deployment | Documentation URL |
|:---|:---|
| AU | https://api.au.sumologic.com/docs/#tag/otCollectorManagementExternal |
| CA | https://api.ca.sumologic.com/docs/#tag/otCollectorManagementExternal |
| DE | https://api.de.sumologic.com/docs/#tag/otCollectorManagementExternal |
| EU | https://api.eu.sumologic.com/docs/#tag/otCollectorManagementExternal |
| FED | https://api.fed.sumologic.com/docs/#tag/otCollectorManagementExternal |
| IN | https://api.in.sumologic.com/docs/#tag/otCollectorManagementExternal |
| JP | https://api.jp.sumologic.com/docs/#tag/otCollectorManagementExternal |
| KR | https://api.kr.sumologic.com/docs/#tag/otCollectorManagementExternal |
| US1 | https://api.sumologic.com/docs/#tag/otCollectorManagementExternal |
| US2 | https://api.us2.sumologic.com/docs/#tag/otCollectorManagementExternal |


<!-- ## Required role capabilities

<ApiRoles/>

* Data Management
    * Manage Collectors
    * View Collectors
-->

## Guide contents

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>



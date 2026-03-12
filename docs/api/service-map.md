---
id: service-map
title: Service Map APIs
sidebar_label: Service Map
description: Service Map APIs allow you to fetch a graph representation of the Service Map.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiErrors from '../reuse/api-errors.md';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/apm/services-map-icon.png')} alt="Thumbnail icon" width="50"/>

The Service Map API allows you to fetch a graph representation of the Service Map, which is a high-level view of your application environment, automatically derived from tracing data. For more information, see [Service Map](/docs/apm/services-list-map).

:::tip Other Tracing APIs
See also: [Span Analytics APIs](/docs/api/span-analytics) and [Traces APIs](/docs/api/tracing).

Tracing APIs give you the ability to browse and execute queries for traces and span analytics, and request a service map of your application environment.
:::

## Documentation   

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/serviceMap   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/serviceMap   |
| CH  | Switzerland (Zurich)   | eu-central-2   | https://api.ch.sumologic.com/docs/#tag/serviceMap  |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/serviceMap   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/serviceMap   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/serviceMap  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/serviceMap   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/serviceMap   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/serviceMap      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/serviceMap  |

## Required role capabilities

<ApiRoles/>

* [Security](/docs/manage/users-roles/roles/role-capabilities/#security)
    * Allowlist IP Addresses

## Endpoints for API access  

Sumo Logic has deployments that are assigned depending on the geographic location and the date an account is created. For API access, you must manually direct your API client to the correct Sumo Logic API URL.

See [Sumo Logic Endpoints](/docs/api/about-apis/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for the list of the URLs.

An `HTTP 301 Moved error` suggests that the wrong endpoint was specified.

## Errors  

<ApiErrors/>

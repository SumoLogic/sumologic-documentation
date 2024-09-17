---
id: tracing
title: Traces APIs
sidebar_label: Traces
description: Tracing APIs give you the ability to browse and execute queries for traces and span analytics, and request a service map of your application environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/traces.png')} alt="Thumbnail icon" width="40"/>

The Traces API allows you to browse traces collected in the system. You can execute queries to find traces matching provided search criteria as well as gather detailed information about individual traces and spans. For more information, see [View and investigate traces](/docs/apm/traces/view-and-investigate-traces).

:::tip Other Tracing APIs
See also: [Span Analytics APIs](/docs/api/span-analytics) and [Service Map APIs](/docs/api/service-map).

Tracing APIs give you the ability to browse and execute queries for traces and span analytics, and request a service map of your application environment.
:::

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                              |
|:------------|:------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/traces  |
| CA         | https://api.ca.sumologic.com/docs/#tag/traces  |
| DE         | https://api.de.sumologic.com/docs/#tag/traces  |
| EU         | https://api.eu.sumologic.com/docs/#tag/traces  |
| FED        | https://api.fed.sumologic.com/docs/#tag/traces |
| IN         | https://api.in.sumologic.com/docs/#tag/traces  |
| JP         | https://api.jp.sumologic.com/docs/#tag/traces  |
| KR         | https://api.kr.sumologic.com/docs/#tag/traces  |
| US1        | https://api.sumologic.com/docs/#tag/traces     |
| US2        | https://api.us2.sumologic.com/docs/#tag/traces |

<!-- ## Required role capabilities

<ApiRoles/>

* Data Management
    * Download Search Results
    * View Collectors

-->

## Endpoints for API access  

Sumo Logic has deployments that are assigned depending on the geographic location and the date an account is created. For API access, you must manually direct your API client to the correct Sumo Logic API URL.

See [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for the list of the URLs.

An `HTTP 301 Moved error` suggests that the wrong endpoint was specified.

## Session Timeout

While the trace search query is running you need to request the query status based on the query ID. The API keeps the query alive by either polling for status or gathering results. If the query is not kept alive by API requests, it is canceled after fifteen minutes. When a query is canceled after fifteen minutes of inactivity, you will get a 404 status.

## Errors  

import ApiErrors from '../reuse/api-errors.md';

<ApiErrors/>

## Rate limit throttling  

import RateLimit from '../reuse/api-rate-limit.md';

<RateLimit/>

A limit of 10 active concurrent trace search requests applies to your organization. Bear in mind that a single API request can consist of multiple queries and each query is treated as a separate trace search.

Once you reach the limit of 10 concurrent active searches, attempting an additional search will result in a status code of _429 Too Many Requests_ telling you that you are over the allowed concurrent search requests limit.
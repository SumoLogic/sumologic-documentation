---
id: search-job-v2
title: Search Job APIs V2
sidebar_label: Search Job V2 
description: Search Job APIs provides access to resources and log data from third-party scripts and applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiEndpoints from '../reuse/api-endpoints.md';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/search.png')} alt="Thumbnail icon" width="55"/>

The Search Job API provides third-party scripts and applications access to your log data through access key/access ID authentication.

:::warning
Sumo Logic recommends you to use Search Job APIs V2, which are now built with OpenAPI specifications and are included in our [Swagger docs](https://api.sumologic.com/docs). 
:::

## Prerequisites

The Search Job API is available to Enterprise accounts.

| Account Type | Account Level |
|:--|:--|
| Cloud Flex Legacy | Enterprise |
| Sumo Logic Credits | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                           |
|:------------|:-----------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/searchJobManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/searchJobManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/searchJobManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/searchJobManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/searchJobManagement |
| IN         | https://api.in.sumologic.com/docs/#tag/searchJobManagement  |
| JP         | https://api.jp.sumologic.com/docs/#tag/searchJobManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/searchJobManagement  |
| US1        | https://api.sumologic.com/docs/#tag/searchJobManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/searchJobManagement |

## Required role capabilities

<ApiRoles/>

* Data Management
    * Download Search Results
    * View Collectors
* Security
    * Manage Access Keys

## Endpoints for API access

Sumo Logic has deployments that are assigned depending on the geographic location and the date an account is created. For API access, you must manually direct your API client to the correct Sumo Logic API URL.

See [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for the list of the URLs.

An `HTTP 301 Moved error` suggests that the wrong endpoint was specified.

## Session Timeout

While the search job is running you need to request the job status based on the search job ID. The API keeps the search job alive by either polling for status every 20 to 30 seconds or gathering results. If the search job is not kept alive by API requests, it is canceled. When a search job is canceled for inactivity, you will get a 404 status.

You must enable cookies for subsequent requests to the search job. A 404 status (Page Not Found) on a follow-up request may be due to a cookie not accompanying the request.

There's a query timeout after eight hours, even if the API is polling and making requests. If you are running very few queries, you may be able to go a little longer, but you can expect most of your queries to end after eight hours.

So, a 404 status is generated in these two situations:

* When cookies are disabled.
* When a query session is canceled.

You can start requesting results asynchronously while the job is running and page through partial results while the job is in progress.

## Search Job Result Limits

| Data Tier | Non-aggregate Search |
| :- | :- |
| Continuous | Can return up to 100K messages per search. |
| Frequent  | Can return up to 100K messages per search. |
| Infrequent  | Can return up to 100K messages per search. |

:::info
Flex Licensing model can return up to 100K messages per search.
:::

If you need more results, you'll need to break up your search into several searches that span smaller blocks of the time range needed.

## Rate limit throttling  

import RateLimit from '../reuse/api-rate-limit.md';

<RateLimit/>

A limit of 200 active concurrent search jobs applies to your organization.

When searching the [Frequent Tier](/docs/manage/partitions/data-tiers), a rate limit of 20 concurrent search jobs applies to your organization.

When searching the [Flex data](/docs/manage/partitions/flex), a rate limit of 200 concurrent search jobs applies to your organization.

Once you reach the limit of 200 active searches, attempting an additional search will return a status code of `429 Too Many Requests`, indicating that you've exceeded the permitted search job limit.

This limit applies only to Search Job API searches, and does not take into account searches run from the Sumo UI, scheduled searches, or dashboard panel searches that are running at the same time. If the search job is not kept alive by API requests every 20-30 seconds, it is canceled.

You can reduce the number of active search jobs by explicitly deleting a search after you receive the results. Manual deletion of searches helps maintain a low count of active searches, of reaching the Search Job API throttling limit. See [Deleting a search job](#delete-a-search-job) for details.

## Errors

**Generic errors that apply to all APIs**

|  Code  |  Error  |  Description  |
|  :--  |  :--  |  :--  |
| 301 | moved | The requested resource SHOULD be accessed through returned URI in Location Header. |
| 401 | unauthorized | Credential could not be verified. |
| 403 | forbidden | This operation is not allowed for your account type. |
| 404 | notfound | Requested resource could not be found. |
| 405 | method.unsupported | Unsupported method for URL. |
| 415 | contenttype.invalid | Invalid content type. |
| 429 | rate.limit.exceeded | The API request rate is higher than 4 request per second or your organization has exceeded the 200 active concurrent search job limit. |
| 500 | internal.error | Internal server error. |
| 503 | service.unavailable | Service is currently unavailable. |

**Errors when creating the search query**

|  Code  |  Error  |  Description  |
|  :--  |  :--  |  :--  |
| 400 | generic | Generic error. |
| 400 | invalid.timestamp.to | The 'to' field contains an invalid time. |
| 400 | invalid.timestamp.from | The 'from' field contains an invalid time. |
| 400 | to.smaller.than.from | The 'from' time cannot be larger than the 'to' time. |
| 400 | unknown.timezone | The 'timezone' value is not a known time zone. See this [Wikipedia article](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for a list of time zone codes. |
| 400 | empty.timezone | The 'timezone' cannot be blank. |
| 400 | no.query | No 'query' parameter was provided. |
| 400 | unknown.time.type | Time type is not correct. |
| 400 | parse.error | Unable to parse query. |

**Error when requesting status**

|  Code  |  Error  |  Description  |
|  :--  |  :--  |  :--  |
| 404 | "jobid.invalid" | "Job ID is invalid." |

**Errors when paging through the result set**

|  Code  |  Error  |  Description  |
|  :--  |  :--  |  :--  |
| 400 | "jobid.invalid" | "Job ID is invalid." |
| 400 | "offset.missing" | "Offset is missing." |
| 400 | "offset.negative" | "Offset cannot be negative.." |
| 400 | "limit.missing" | "Limit is missing." |
| 400 | "limit.zero" | "Limit cannot be 0." |
| 400 | "limit.negative" | "Limit cannot be negative." |
| 400 | "no.records.not.an.aggregation.query" | "No records; query is not an aggregation" |




---
id: log-search-estimated-usage
title: Log Search Estimated Usage APIs
sidebar_label: Log Search Estimated Usage
description: Log Search Estimated Usage APIs get the estimated volume of Infrequent Data Tier data scanned for a given log search over a particular time range.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/logs.png')} alt="Thumbnail icon" width="50"/>

The Log Search Estimated Usage API gets the estimated volume of data that would be scanned for a given log search in the Infrequent Data Tier and Flex, over a particular time range.

In the Infrequent Data Tier and Flex, you pay per query, based on the amount of data scanned. You can use this endpoint to get an estimate of the total data that would be scanned before running a query, and refine your query to scan less data, as necessary. 

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                        |
|:------------|:--------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType  |
| CA         | https://api.ca.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType  |
| DE         | https://api.de.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType  |
| EU         | https://api.eu.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType  |
| FED        | https://api.fed.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType |
| IN         | https://api.in.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType  |
| JP         | https://api.jp.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType  |
| KR         | https://api.kr.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType  |
| US1        | https://api.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType     |
| US2        | https://api.us2.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType |

## Required role capabilities

<ApiRoles/>

* Data Management
    * Download Search Results
    * Manage Data Volume Feed
    * View Collectors

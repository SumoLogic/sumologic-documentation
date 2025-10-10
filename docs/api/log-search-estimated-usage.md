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

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#operation/getLogSearchEstimatedUsageByMeteringType  |

## Required role capabilities

<ApiRoles/>

* Data Management
    * Download Search Results
    * Manage Data Volume Feed
    * View Collectors

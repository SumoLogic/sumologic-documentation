---
id: log-search-estimated-usage
title: Log Search Estimated Usage APIs
sidebar_label: Log Search Estimated Usage
description: Log Search Estimated Usage APIs get the estimated volume of Infrequent Data Tier data scanned for a given log search over a particular time range.
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/logs.png')} alt="Thumbnail icon" width="50"/>

The Log Search Estimated Usage API gets the estimated volume of data that would be scanned for a given log search in the Infrequent Data Tier and Flex, over a particular time range.

In the Infrequent Data Tier and Flex, you pay per query, based on the amount of data scanned. You can use this endpoint to get an estimate of the total data that would be scanned before running a query, and refine your query to scan less data, as necessary. 

import ApiIntro from '../reuse/api-intro.md';

<ApiIntro/>

| Deployment | Documentation URL                                        |
|:------------|:--------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/getLogSearchEstimatedUsageByMeteringType  |
| CA         | https://api.ca.sumologic.com/docs/#tag/getLogSearchEstimatedUsageByMeteringType  |
| DE         | https://api.de.sumologic.com/docs/#tag/getLogSearchEstimatedUsageByMeteringType  |
| EU         | https://api.eu.sumologic.com/docs/#tag/getLogSearchEstimatedUsageByMeteringType  |
| FED        | https://api.fed.sumologic.com/docs/#tag/getLogSearchEstimatedUsageByMeteringType |
| IN         | https://api.in.sumologic.com/docs/#tag/getLogSearchEstimatedUsageByMeteringType  |
| JP         | https://api.jp.sumologic.com/docs/#tag/getLogSearchEstimatedUsageByMeteringType  |
| US1        | https://api.sumologic.com/docs/#tag/getLogSearchEstimatedUsageByMeteringType     |
| US2        | https://api.us2.sumologic.com/docs/#tag/getLogSearchEstimatedUsageByMeteringType |

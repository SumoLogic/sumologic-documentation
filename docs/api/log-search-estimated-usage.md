---
id: log-search-estimated-usage
title: Log Search Estimated Usage APIs
sidebar_label: Log Search Estimated Usage
description: Log Search Estimated Usage APIs get the estimated volume of Infrequent Data Tier data scanned for a given log search over a particular time range.
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/logs.png')} alt="Thumbnail icon" width="50"/>

The Log Search Estimated Usage API gets the estimated volume of data that would be scanned for a given log search in the Infrequent Data Tier, over a particular time range.

In the Infrequent Data Tier, you pay per query, based on the amount data scanned. You can use this endpoint to get an estimate of the total data that would be scanned before running a query, and refine your query to scan less data, as necessary. For more information, see [Infrequent Data Tier](/docs/manage/partitions-data-tiers/data-tiers).

import ApiIntro from '../reuse/api-intro.md';

<ApiIntro/>

| Deployment | Documentation URL                                        |
|:------------|:--------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/logSearchesEstimatedUsage  |
| CA         | https://api.ca.sumologic.com/docs/#tag/logSearchesEstimatedUsage  |
| DE         | https://api.de.sumologic.com/docs/#tag/logSearchesEstimatedUsage  |
| EU         | https://api.eu.sumologic.com/docs/#tag/logSearchesEstimatedUsage  |
| FED        | https://api.fed.sumologic.com/docs/#tag/logSearchesEstimatedUsage |
| IN         | https://api.in.sumologic.com/docs/#tag/logSearchesEstimatedUsage  |
| JP         | https://api.jp.sumologic.com/docs/#tag/logSearchesEstimatedUsage  |
| US1        | https://api.sumologic.com/docs/#tag/logSearchesEstimatedUsage     |
| US2        | https://api.us2.sumologic.com/docs/#tag/logSearchesEstimatedUsage |

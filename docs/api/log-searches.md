---
id: log-searches
title: Log Searches Management API
sidebar_label: Log Searches
description: With Log Searches Management APIs, you can list, save, update, and delete your log searches.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/logs.png')} alt="Thumbnail icon" width="50"/>

With the Log Searches Management API, you can list, save, update, and delete your log searches.

Whether you're running ad hoc searches during a forensic investigation or running standard searches for health checks, you can save any search to run again later. When you create a search that you would like to reuse, you can save it to the Library. From there you can run it again, share with others, edit the search, or create a Scheduled Search to run at a regularly scheduled time, and set up alerts. The saved search will also include any charts you have created in the Aggregates tab.

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                        |
|:------------|:--------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/logSearchesManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/logSearchesManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/logSearchesManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/logSearchesManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/logSearchesManagement |
| IN         | https://api.in.sumologic.com/docs/#tag/logSearchesManagement  |
| JP         | https://api.jp.sumologic.com/docs/#tag/logSearchesManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/logSearchesManagement  |
| US1        | https://api.sumologic.com/docs/#tag/logSearchesManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/logSearchesManagement |

## Required role capabilities

<ApiRoles/>

* Data Management
    * Download Search Results
    * View Collectors

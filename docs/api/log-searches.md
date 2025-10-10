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

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/logSearchesManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/logSearchesManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/logSearchesManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/logSearchesManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/logSearchesManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/logSearchesManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/logSearchesManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/logSearchesManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/logSearchesManagement  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/logSearchesManagement  |

## Required role capabilities

<ApiRoles/>

* Data Management
    * Download Search Results
    * View Collectors

---
id: dynamic-parsing
title: Dynamic Parsing Management APIs
sidebar_label: Dynamic Parsing
description: The Dynamic Parsing Management API allows you to configure Run Time Field Extraction Rules from HTTP endpoints.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/parsing-data.png')} alt="icon" width="50"/>

The Dynamic Parsing Management API allows you to configure Run Time Field Extraction Rules from HTTP endpoints. Dynamic Parsing allows automatic field extraction from your log messages when you run a search. This allows you to view fields from logs without having to manually specify parsing logic. For more information, see [Dynamic Parsing](/docs/search/get-started-with-search/build-search/dynamic-parsing).

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                                    |
|:------------|:----------------------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/dynamicParsingRuleManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/dynamicParsingRuleManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/dynamicParsingRuleManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/dynamicParsingRuleManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/dynamicParsingRuleManagement |
| JP         | https://api.jp.sumologic.com/docs/#tag/dynamicParsingRuleManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/dynamicParsingRuleManagement  |
| US1        | https://api.sumologic.com/docs/#tag/dynamicParsingRuleManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/dynamicParsingRuleManagement |

## Required role capabilities

<ApiRoles/>

* Data Management
    * Manage Field Extraction Rules
    * Manage Fields
    * View Field Extraction Rules
    * View Fields

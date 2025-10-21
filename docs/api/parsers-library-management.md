---
id: parsers-library-management
title: Parsers Library Management APIs
sidebar_label: Parsers Library
description: Customize parsers using the API. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/parsing-data.png')} alt="Thumbnail icon" width="50"/>

Use this API to customize parsers. The parsers library contains the parsers used in the `_parser` field for collector, FER, or query. For more information on customizing parsers, see [Parser Editor](/docs/cse/schema/parser-editor/).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/parsersLibraryManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/parsersLibraryManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/parsersLibraryManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/parsersLibraryManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/parsersLibraryManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/parsersLibraryManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/parsersLibraryManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/parsersLibraryManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/parsersLibraryManagement  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/parsersLibraryManagement  |

## Required role capabilities

<ApiRoles/>

* [Data Management](/docs/manage/users-roles/roles/role-capabilities/#data-management)
    * View Parsers

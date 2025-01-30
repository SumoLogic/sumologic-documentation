---
id: field-extraction-rules
title: Field Extraction Rules Management APIs
sidebar_label: Field Extraction Rules
description: Use Field Extraction Rules Management APIs to configure Field Extraction Rules.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/rules.png')} alt="Thumbnail icon" width="50"/>

The Field Extraction Rules (FER) Management API allows you to configure FERs from HTTP endpoints. Field extractions allow you to parse [fields](/docs/manage/fields) from your log messages at the time the messages are ingested, which eliminates the need to parse fields at the query level. With FERs in place, you can use the pre-parsed fields for ad hoc searches, scheduled searches, real-time alerts, and dashboards. In addition, FERs help standardize field names and searches, simplify the search syntax and scope definition, and improve search performance. For more information, see [Field Extractions](/docs/manage/field-extractions).

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                                |
|:------------|:------------------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/extractionRuleManagement  |
| CA         | https://api.ca.sumologic.com/docs/#tag/extractionRuleManagement  |
| DE         | https://api.de.sumologic.com/docs/#tag/extractionRuleManagement  |
| EU         | https://api.eu.sumologic.com/docs/#tag/extractionRuleManagement  |
| FED        | https://api.fed.sumologic.com/docs/#tag/extractionRuleManagement |
| IN         | https://api.in.sumologic.com/docs/#tag/extractionRuleManagement  |
| JP         | https://api.jp.sumologic.com/docs/#tag/extractionRuleManagement  |
| KR         | https://api.kr.sumologic.com/docs/#tag/extractionRuleManagement  |
| US1        | https://api.sumologic.com/docs/#tag/extractionRuleManagement     |
| US2        | https://api.us2.sumologic.com/docs/#tag/extractionRuleManagement |

## Required role capabilities

<ApiRoles/>

* Data Management
    * Manage Field Extraction Rules
    * Manage Fields
    * View Field Extraction Rules
    * View Fields

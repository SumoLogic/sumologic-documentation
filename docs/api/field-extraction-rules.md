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

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/extractionRuleManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/extractionRuleManagement   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/extractionRuleManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/extractionRuleManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/extractionRuleManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/extractionRuleManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/extractionRuleManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/extractionRuleManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/extractionRuleManagement  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/extractionRuleManagement  |

## Required role capabilities

<ApiRoles/>

* Data Management
    * Manage Field Extraction Rules
    * Manage Fields
    * View Field Extraction Rules
    * View Fields

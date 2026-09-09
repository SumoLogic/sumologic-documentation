---
id: data-masking
title: Data Masking Management APIs
sidebar_label: Data Masking Management
description: Use Data Masking Management API endpoints to manage data masking rules that protect sensitive information in your logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<p> <a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a> </p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

<img src={useBaseUrl('img/icons/security/security.png')} alt="Security icon" width="40"/>

Use Data Masking Management APIs to automatically redact or replace sensitive information in your logs at ingest time while enforcing data protection standards consistently across your organization.

For more information, see [Data Masking](/docs/manage/data-masking).

:::info
Create, read, update, and delete (CRUD) operations may take up to 30 seconds to reflect changes, applied on a per-organization basis.
:::

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/dataMaskingManagement   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/dataMaskingManagement   |
| CH  | Switzerland (Zurich)   | eu-central-2   | https://api.ch.sumologic.com/docs/#tag/dataMaskingManagement  |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/dataMaskingManagement   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/dataMaskingManagement   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/dataMaskingManagement  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/dataMaskingManagement   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/dataMaskingManagement   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/dataMaskingManagement      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/dataMaskingManagement  |

## Required role capabilities

<ApiRoles/>

* **Manage Data Masking Rules**. Required to create, update, enable, disable, or delete data masking rules.
* **View Unmasked Data**. Allows users to view log data in its original, unmasked form.

These capabilities will be listed under [Security](/docs/manage/users-roles/roles/role-capabilities/#security) in Role Capabilities when this feature is GA.

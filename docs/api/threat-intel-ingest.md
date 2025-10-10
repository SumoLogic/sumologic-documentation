---
id: threat-intel-ingest
title: Threat Intel Ingest Management APIs
sidebar_label: Threat Intel
description: The Threat Intel Ingest Management API allows you to upload STIX 2.x threat intel indicators, view storage status of threat intel ingest service, and view and set the retention period for threat intel indicators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="icon" width="60"/>

The Threat Intel Ingest Management API allows you to:

* Upload threat intelligence indicators
* View storage status of threat intelligence ingest service
* View and set the retention period for threat intelligence indicators

For more information about threat intelligence, see [About Sumo Logic Threat Intelligence](/docs/security/threat-intelligence/about-threat-intelligence/).

## Documentation

<ApiIntro/>

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU  | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/docs/#tag/threatIntelIngest   |
| CA  | Canada (Central)       | ca-central-1   | https://api.ca.sumologic.com/docs/#tag/threatIntelIngest   |
| DE  | EU (Frankfurt)         | eu-central-1   | https://api.de.sumologic.com/docs/#tag/threatIntelIngest   |
| EU  | EU (Ireland)           | eu-west-1      | https://api.eu.sumologic.com/docs/#tag/threatIntelIngest   |
| FED | US East (N. Virginia)  | us-east-1      | https://api.fed.sumologic.com/docs/#tag/threatIntelIngest  |
| JP  | Asia Pacific (Tokyo)   | ap-northeast-1 | https://api.jp.sumologic.com/docs/#tag/threatIntelIngest   |
| KR  | Asia Pacific (Seoul)   | ap-northeast-2 | https://api.kr.sumologic.com/docs/#tag/threatIntelIngest   |
| US1 | US East (N. Virginia)  | us-east-1      | https://api.sumologic.com/docs/#tag/threatIntelIngest      |
| US2 | US West (Oregon)       | us-west-2      | https://api.us2.sumologic.com/docs/#tag/threatIntelIngest  |
| ZRH | Switzerland (Zurich)   | eu-central-2   | https://api.zrh.sumologic.com/docs/#tag/threatIntelIngest  |

## Required role capabilities

<ApiRoles/>

* Threat Intel
   * View Threat Intel Data Store
   * Manage Threat Intel Data Store

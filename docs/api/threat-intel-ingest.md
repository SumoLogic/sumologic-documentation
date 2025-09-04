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

| Deployment | Documentation URL  |
|:-----------|:---------|
| AU         | https://api.au.sumologic.com/docs/#tag/threatIntelIngest  |
| CA         | https://api.ca.sumologic.com/docs/#tag/threatIntelIngest  |
| DE         | https://api.de.sumologic.com/docs/#tag/threatIntelIngest  |
| EU         | https://api.eu.sumologic.com/docs/#tag/threatIntelIngest  |
| FED        | https://api.fed.sumologic.com/docs/#tag/threatIntelIngest |
| JP         | https://api.jp.sumologic.com/docs/#tag/threatIntelIngest  |
| US1        | https://api.sumologic.com/docs/#tag/threatIntelIngest     |
| US2        | https://api.us2.sumologic.com/docs/#tag/threatIntelIngest |

## Required role capabilities

<ApiRoles/>

* Threat Intel
   * View Threat Intel Data Store
   * Manage Threat Intel Data Store

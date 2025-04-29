---
title: Syslog-NG
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/syslog-ng.png')} alt="syslog-ng" width="70"/>

***Version: 1.1  
Updated: Jul 07, 2023***

Syslog-ng is a free and open-source implementation of the syslog protocol for Unix and Unix-like systems.

## Actions

* **Filter Logspaces** *(Enrichment)* - Retrieves log message records from SSB.
* **Generate Statistics** *(Enrichment)* - Get statistics without querying.
* **Get Number of Messages** *(Enrichment)* - Returns the number of messages that would be resulted by a query.
* **List Dynamic Columns** *(Enrichment)* - Returns the names of dynamic columns available for the given logspace.
* **List Logspaces** *(Enrichment)* - Retrieves the list of searchable (indexed) logspaces.
* **Logspace Details** *(Enrichment)* - Retrieves the list of searchable (indexed) logspaces, including the details of the logspace.

## Configure Syslog NG in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* June 17, 2021 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables

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

## Configure Syslog-NG in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Syslog-NG URL.

* **Username**. Enter the username for a Syslog-NG admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/syslog-ng-configuration.png')} style={{border:'1px solid gray'}} alt="Syslog-NG configuration" width="400"/>

For information about Syslog-NG, see [Syslog-NG documentation](https://syslog-ng.github.io/).

## Change Log

* June 17, 2021 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables

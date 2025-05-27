---
title: Cisco Stealthwatch
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-stealthwatch.png')} alt="cisco-stealthwatch" width="70"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Cisco Stealthwatch provides easy to use and comprehensive APIs for reporting, making configuration changes, managing users, exporting data, and more. It offers early access to advanced event capabilities and UI workflows with Analytics, which provides new and effective alerts that require less manual configuration.

## Actions

* **List Tags** *(Enrichment)* - Provides access to basic information about the Tags (host groups) in Stealthwatch.
* **Get Tag** *(Enrichment)* - Get details for a specific tag.
* **Get Top Alarming Tags** *(Enrichment)* - Retrieves top alarming tags for a given host type.
* **Get Top Applications** *(Enrichment)* - Search for the top applications with a given criteria.
* **Get Top Hosts** *(Enrichment)* - Search for top hosts with a given criteria.
* **Get Top Ports** *(Enrichment)* - Search for top ports with a given criteria.
* **List Hourly Traffic Tag** *(Enrichment)* - Retrieves the hourly traffic trend for a given host type.
* **List Tenants** *(Enrichment)* - Provides access to basic information about the Tenants (domains) and the Tags (host groups) in the Stealthwatch System.
* **Search Flows** *(Enrichment)* - Perform flow searches using basic criteria such as time range, IP address or range, port/protocols, and host groups.
* **Search Events** *(Enrichment)* - Perform event searches based on the given criteria.

## Configure Cisco Stealthwatch in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter the name of your Cisco Stealthwatch host.

* **Username**. Enter the username of a Cisco Stealthwatch admin authorized to provide authentication for the integration.

* **Password**. Enter the password for the Cisco Stealthwatch admin user.

* **Tenant ID**. Enter a Cisco Stealthwatch tenant ID.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco/cisco-stealthwatch-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco Stealthwatch configuration" width="400"/>

For information about Cisco Secure Network Analytics (formerly Stealthwatch), see [Cisco Secure Network Analytics documentation](https://www.cisco.com/c/en/us/support/security/stealthwatch/series.html).

## Change Log

* Aug 04, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables

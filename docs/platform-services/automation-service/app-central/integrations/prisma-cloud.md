---
title: Prisma Cloud
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/prisma-cloud.png')} alt="prisma-cloud" width="100"/>

***Version: 1.2  
Updated: Nov 09, 2023***

Receive alerts from Prisma Cloud CSPM and perform configuration searches to retrieve resource information, identify misconfigurations, gain operational insights and uncover policy and compliance violations.

## Actions

* **Get Alert Details** *(Enrichment)* - Returns information about an alert for the specified ID.
* **List Alert Filters** *(Enrichment)* - Returns a list of all valid filters.
* **List Alerts** *(Enrichment)* - Returns a list of alerts from the Prisma Cloud Platform that matches the specified filters.
* **Search Config** *(Enrichment)* - Returns the result of a RQL config query.

## Prisma Cloud configuration

Prisma Cloud requires an API access key to enable programmatic access to the REST API. By default, only the System Admin has API access and can enable API access for other administrators. To generate an access key, see [Create and Manage Access Keys](https://docs.prismacloud.io/en/enterprise-edition/content-collections/administration/create-access-keys).

## Configure Prisma Cloud in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Prisma Cloud [API URL](https://pan.dev/prisma-cloud/api/cspm/api-urls/). 

* **Username/Access Key ID**. Enter a Prisma Cloud admin username, or an [access key](https://docs.prismacloud.io/en/enterprise-edition/content-collections/administration/create-access-keys).

* **Password/Access Key Secret**. Enter the password for the admin user (if you previously entered a username), or the secret for access key (f you previously entered an access key)
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/prisma-cloud-configuration.png')} style={{border:'1px solid gray'}} alt="Prisma Cloud configuration" width="400"/>

For information about Prisma Cloud, see [Prisma Cloud documentation](https://docs.prismacloud.io/en).

## Category

Cloud Security Posture Management

## Change Log

* November 9, 2023 - First upload

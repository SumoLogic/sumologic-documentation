---
title: Farsight Security DNSDB
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/farsight-security-dnsdb.png')} alt="farsight-security-dnsdb" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Farsight Security DNSDB® is the world’s largest DNS intelligence database that provides a unique, fact-based, multifaceted view of the configuration of the global Internet infrastructure.

## Actions

* **Lookup RRset** *(Enrichment)* - The “rrset” lookup queries DNSDB’s RRset index, which supports “forward” lookups based on the owner name of an RRset.
* **Lookup RData** *(Enrichment)* - The “rdata” lookup queries DNSDB’s Rdata index, which supports “inverse” lookups based on Rdata record values.
* **Get Rate Limit** *(Enrichment)* - Retrieve service limits.

## Farsight Security DNSDB configuration

Request your API Key from [https://www.farsightsecurity.com/solutions/dnsdb](https://www.farsightsecurity.com/solutions/dnsdb).

## Configure Farsight Security DNSDB in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL API**. Enter the Farsight Security API URL, for example, `https://api.dnsdb.info/`

* **API Key**. Enter the Farsight Security API key you [requested earlier](#farsight-security-dnsdb-configuration). 
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/farsight-security-configuration.png')} style={{border:'1px solid gray'}} alt="Farsight Security configuration" width="400"/>

For information about Farsight Security DNSDB, see [Farsight Security DNSDB documentation](https://www.domaintools.com/resources/user-guides/farsight-dnsdb-api-version-2-documentation/).

## Change Log

* June 22, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables

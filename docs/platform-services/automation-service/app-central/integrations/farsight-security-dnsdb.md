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

<IntegrationsAuth/>

   * **URL API**. `https://api.dnsdb.info/`.
   * **API Key**. Your API Key. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-4.png')} style={{border:'1px solid gray'}} alt="farsight-security-dnsdb" width="400"/>

For information about Farsight Security DNSDB, see [Farsight Security DNSDB documentation](https://www.domaintools.com/resources/user-guides/farsight-dnsdb-api-version-2-documentation/).

## Change Log

* June 22, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables

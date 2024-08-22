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

## Farsight Security DNSDB in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-3.png')} style={{border:'1px solid gray'}} alt="farsight-security-dnsdb" width="400"/>
1. Label and Populate all the required fields (\*) and click **Save**.
   * **URL API**. `https://api.dnsdb.info/`.
   * **API Key**. Your API Key. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-4.png')} style={{border:'1px solid gray'}} alt="farsight-security-dnsdb" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-5.png')} style={{border:'1px solid gray'}} alt="farsight-security-dnsdb" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-6.png')} style={{border:'1px solid gray'}} alt="farsight-security-dnsdb" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-7.png')} style={{border:'1px solid gray'}} alt="farsight-security-dnsdb" width="400"/>

## Change Log

* June 22, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables

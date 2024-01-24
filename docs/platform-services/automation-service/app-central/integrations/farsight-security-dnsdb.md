---
title: Farsight Security DNSDB
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/farsight-security-dnsdb.png)

Version: 1.1  
Updated: Jul 06, 2023

Farsight Security DNSDB® is the world’s largest DNS intelligence database that provides a unique, fact-based, multifaceted view of the configuration of the global Internet infrastructure

## Actions

* **Lookup RRset** *(Enrichment) -* The “rrset” lookup queries DNSDB’s RRset index, which supports “forward” lookups based on the owner name of an RRset
* **Lookup RData** *(Enrichment) -* The “rdata” lookup queries DNSDB’s Rdata index, which supports “inverse” lookups based on Rdata record values
* **Get Rate Limit** *(Enrichment) -* Retrieve service limits

## Farsight Security DNSDB configuration

Request your API Key from <https://www.farsightsecurity.com/solutions/dnsdb/> 

## Farsight Security DNSDB in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-2.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource. 

![](/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-3.png)

Label and Populate all the required fields (\*) and click Save.

* URL API: https://api.dnsdb.info/
* API Key: your API Key

![](/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-5.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/farsight-security-dnsdb/farsight-security-dnsdb-7.png)

## Change Log

* June 22, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables

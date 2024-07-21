---
title: Check-Host
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/check-host.png')} alt="check-host" width="100"/>

***Version: 1.1  
Updated: Jul 13, 2023***

Check-Host is a modern online tool for website monitoring and checking performance and availability of any URLs from many countries and data centers. Allows you to monitor response time from different locations.

## Actions

* **Check Host Status** *(Enrichment)* - Check performance and availability of given URL.
* **Check Host Status Daemon** *(Daemon)* - Daemon to check the URL availability.
* **Get Nodes** *(Enrichment)* - Get the supported nodes list.

## Check-Host configuration

No configuration is needed since the it does not require any authentication.

## Check-Host in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the "+" button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/check-host/check-host-3.png')} style={{border:'1px solid gray'}} alt="check-host" width="400"/>
1. Populate the required fields   


## Category

Analytics and Monitoring   
 

## Change Log

* June 27, 2022 - First upload
* July 11, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility
	+ Changed Daemon compatibility

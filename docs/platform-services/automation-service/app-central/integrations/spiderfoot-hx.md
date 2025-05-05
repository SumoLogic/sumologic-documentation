---
title: SpiderFoot HX
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/spiderfoot-hx.png')} alt="spiderfoot" width="100"/>

***Version: 1.1  
Updated: Jul 07, 2023***

SpiderFoot is an open source intelligence automation tool. SpiderFoot can be used offensively (e.g. in a red team exercise or penetration test) for reconnaissance of your target or defensively to gather information about what you or your organisation might have exposed over the Internet. You can target the following entities in a SpiderFoot scan: IP address, domain/sub-domain name, hostname, network subnet (CIDR), ASN, e-mail address, phone number, username, person's name, bitcoin address.

SpiderFoot's 200+ modules feed each other in a publisher/subscriber model to ensure maximum data extraction to do things like:

* Host/sub-domain/TLD enumeration/extraction
* Email address, phone number and human name extraction
* Bitcoin and Ethereum address extraction
* Bitcoin and Ethereum address extraction
* Threat intelligence and Blacklist queries
* API integration with SHODAN, HaveIBeenPwned, GreyNoise, AlienVault, SecurityTrails, etc.
* Social media account enumeration
* S3/Azure/Digitalocean bucket enumeration/scraping
* IP geo-location
* Web scraping
* Web content analysis
* Image, document and binary file meta data analysis
* Dark web searches
* Port scanning and banner grabbing
* Data breach searches, etc.

## Actions

* **Add Notes To Data Element** (*Containment*) - Add notes to a data element.
* **Delete Scan** (*Containment*) - Delete a scan.
* **Get Scan Results Summary** (*Enrichment*) - Retrieve a summary of the results for a scan.
* **Get Scan Status** (*Enrichment*) - Retrieve status information about a given scan.
* **List Data Element Discovery Path** (*Enrichment*) - Retrieve a data structure on how the provided data element was discovered during a scan.
* **List Data Element Types** (*Enrichment*) - Retrieve a list of all data element types in SpiderFoot.
* **List Data Elements From Scan Correlation** (*Enrichment*) - Retrieve all elements associated with a given correlation from a scan.
* **List Modules** (*Enrichment*) - Retrieve a list of modules available in SpiderFoot.
* **List Scan Correlations** (*Enrichment*) - Retrieve all correlations generated in a scan.
* **List Scan Logs** (*Enrichment*) - Retrieve the log messages generated during a scan.
* **List Scan Results** (*Enrichment*) - Retrieve results for a given scan.
* **List Scanner IP Addresses** (*Enrichment*) - Retrieve a list of IP addresses SpiderFoot uses for scanning.
* **List Scans** (*Enrichment*) - Retrieve a list of scans that have been run.
* **List Users** (*Enrichment*) - Retrieve a list of users configured in the SpiderFoot account.
* **Run New Scan** (*Containment*) - Run a SpiderFoot scan against a provided target or set of targets.
* **Scan Status Finished** (*Scheduled*) - Schedule action that periodically checks if the scan status is finished.
* **Search Scan Results** (*Enrichment*) - Retrieve results from a scan filtered by search criteria.
* **Star A Data Element** (*Containment*) - Star or unstar a data element.
* **Terminate Scan** (*Enrichment*) - Stop a running scan.

## SpiderFoot HX configuration

Log in to SpiderFoot, select your username from the menu, choose API Key and copy your API Key. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/spiderfoot-hx/spiderfoot-hx-1.png')} style={{border:'1px solid gray'}} alt="spiderfoot" width="400"/>

## Configure SpiderFoot HX in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The desired name for the resource.
   * **URL**. Your SpiderFoot URL.
   * **API Key**. Your SpiderFoot API Key you copied earlier from SpiderFoot.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/spiderfoot-hx/spiderfoot-hx-5.png')} style={{border:'1px solid gray'}} alt="spiderfoot" width="400"/>

For information about SpiderFoot, see [SpiderFoot documentation](https://github.com/smicallef/spiderfoot/blob/master/README.md).

## Category

Threat Intelligence-Reputation

## Change Log

* October 21, 2022 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables

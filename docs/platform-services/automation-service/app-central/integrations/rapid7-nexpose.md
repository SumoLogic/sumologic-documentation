---
title: Rapid7 Nexpose
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/rapid7-nexpose.png')} alt="rapid7-nexpose" width="80"/>

***Version: 1.1  
Updated: Jul 07, 2023***

Utilize and interact with Rapid7 Nexpose scan data during incident investigation

## Actions

* **Get Assets** *(Enrichment)* - Returns all assets for which you have access.
* **Post Asset Search** *(Enrichment)* - Returns all assets for which you have access that match the given search criteria.
* **Post Asset Groups** *(Enrichment)* - Creates a new asset group.
* **Get Asset Groups** *(Enrichment)* - Returns all asset groups.
* **Get Scans** *(Enrichment)* - Returns all scans.
* **List Vulnerabilities** *(Enrichment)* - Returns all vulnerabilities that can be assessed during a scan.
* **Get Vulnerability** *(Enrichment)* - Returns the details for a vulnerability.
* **Get Sites** *(Enrichment)* - Retrieves a paged resource of accessible sites.
* **Get Report Template** *(Enrichment)* - Returns the details of a report template.
* **Delete Asset Groups** *(Containment)* - Deletes the asset group.
* **Delete Site** *(Containment)* - Deletes a site.
* **Get Assets Vulnerability** *(Enrichment)* - Returns the details for a vulnerability of a specific asset.

## Configure Rapid7 Nexpose in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* January 24, 2020 - First upload
* February 5, 2021 - Updated actions:
	+ Get Assets Vulnerability
	+ Post Asset Search
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables

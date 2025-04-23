---
title: Tenable.sc
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/tenable.sc.png')} alt="tenable.sc" width="100"/>

***Version: 1.2  
Updated: Jul 13, 2023***

Connect with Tenable SecurityCenter to execute scans, get scan results and perform administrative actions.

## Actions

* **Add Asset** (*Enrichment*) - Add a new asset with the specified parameters.
* **Create Scan** (*Enrichment*) - Create a new scan with the specified parameters.
* **Download Report** (*Enrichment*) - Download a report ID which can be added to incident.
* **Download Scan Result** (*Enrichment*) - Download a scan ID and result.
* **Execute Scan** (*Enrichment*) - Execute a scan.
* **Get Analysis** (*Enrichment*) - Get the results of an analysis based on the specified criteria.
* **Get Asset** (*Enrichment*) - Get information on the specified asset.
* **Get Cumulative Vulnerabilities** - Get Cumulative Vulnerabilities based on tool.
* **Get Individual Vulnerabilities** - Get Vulnerabilities for specific Scan, need to have Scan Result ID.
* **Get Group** (*Enrichment*) - Get information on the specified group.
* **Get Policy** (*Enrichment*) - Get information on the specified policy.
* **Get Report** (*Enrichment*) - Get report information on the specified report.
* **Get Scan** (*Enrichment*) - Get scan information on the specified scan.
* **Get Scan Result** (*Enrichment*) - Get the result for the specified scan.
* **List Asset Templates** (*Enrichment*) - Get a list of asset templates.
* **List Credentials** (*Enrichment*) - Get a list of stored credentials.
* **List Groups** (*Enrichment*) - Get a list of groups.
* **List Assets** (*Enrichment*) - Get a list of assets.
* **List LCEs** (*Enrichment*) - Get a list of the LCEs.
* **List Plugins** (*Enrichment*) - Get a list of the plugins.
* **List Policies** (*Enrichment*) - Get a list of the policies.
* **List Queries** (*Enrichment*) - Get a list of the queries.
* **List Report** (*Enrichment*) - Get a list of the reports.
* **List Repositories** (*Enrichment*) - Get a list of the repositories.
* **List Scan Results** (*Enrichment*) - List the executed Scan Results.
* **List Scans** (*Enrichment*) - Get a list of scans.

## Configure Tenable.sc in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* January 31, 2019 - First upload
* June 26, 2019 - Bug fix for SSL verification
* August 5, 2019 - Supported Version Updated
* October 26, 2020 - New action added
* December 21, 2020 - Updated descriptions
* July 13, 2023 (v1.2)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility

---
title: Tenable.io
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/tenable.io.png')} alt="tenable.io" width="100"/>

***Version: 1.3  
Updated: Aug 18, 2023***

Connect with Tenable.io to execute scans, get scan results and perform administrative actions.

## Actions

* **Create Scan** (*Enrichment*) - Create a scan for the specified IP addresses or hostnames.
* **Execute Scan** (*Enrichment*) - Execute the specified scan.
* **Get Asset Details** (*Enrichment*) - Get the scan report for the specified ID in CSV format.
* **Get Plugin Details** (*Enrichment*) - Get Plugin Details based on Vulnerabilities.
* **Get Scan Details** (*Enrichment*) - Get details of scan in CSV using Scan ID.
* **Get Scan Report** (*Enrichment*) - Get a report for Scan ID.
* **Get Scan Report Data** (*Enrichment*) - Get data from scan report.
* **Get Scan Vulnerabilities** (*Enrichment*) - Get Vulnerabilities Per Scan.
* **List Assets** (*Enrichment*) - List all assets.
* **List Policies** (*Enrichment*) - List all policies.
* **List Scan** (*Enrichment*) - List all scans.
* **List Scanners** (*Enrichment*) - List all scanners.
* **List Templates** (*Enrichment*) - List all scan templates.
* **List Vulnerabilities** (*Enrichment*) - Get vulnerabilities and severity.
* **Manage Scan** (*Enrichment* ) - Stop, Launch[Start], Resume, Delete, Copy, Pause, Trash.
* **Target Info** (*Enrichment*) - Get basic information on a target.
* **Target Vulnerabilities** (*Enrichment*) - Get vulnerability information for a target.

## Configure Tenable.io in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Access Key**. Enter your Tenable [access key](https://docs.tenable.com/vulnerability-management/Content/Settings/my-account/GenerateAPIKey.htm).

* **Secret Key**. Enter the secret for the access key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/tenable-io-configuration.png')} style={{border:'1px solid gray'}} alt="Tenable.io configuration" width="400"/>

For information about Tenable Vulnerability Management (formerly Tenable.io), see [Tenable Vulnerability Management documentation](https://docs.tenable.com/vulnerability-management.htm).

## Change Log

* November 21, 2018 - First upload
* December 4, 2018 - Updated actions split in to JSON and CSV reports
* December 18, 2018 - Target information actions added
* August 5, 2019 - Supported Version Updated
* September 3, 2020 - New actions added
* October 20, 2020 - Added User-Agent to all actions
* December 21, 2020 - Updated descriptions
* August 18, 2023 (v1.3) - Integration refactored

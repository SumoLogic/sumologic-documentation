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

| Version | Date | Description |
|:--|:--|:--|
| v1.3 | August 18, 2023 | Refactored the integration. |
| v1.2 | December 21, 2020 | Updated action descriptions. |
| v1.1 | October 20, 2020 | Added a User-Agent header to all actions. |
| | September 3, 2020 | Added new actions. |
| | August 5, 2019 | Updated the supported version. |
| | December 18, 2018 | Added target information actions. |
| | December 4, 2018 | Split actions into JSON and CSV reports. |
| | November 21, 2018 | Initial release of the Tenable.io integration. |

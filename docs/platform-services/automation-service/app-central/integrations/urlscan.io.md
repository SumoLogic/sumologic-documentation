---
title: URLScan.io
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/urlscan.io.png')} alt="urlscan.io" width="100"/>

***Version: 1.7  
Updated: June 26, 2024***

Scan and analyze websites. When a URL is submitted to urlscan.io, an automated process will browse to the URL like a regular user and record the activity that this page navigation creates. This includes the domains and IPs contacted, the resources (JavaScript, CSS, etc) requested from those domains, as well as additional information about the page itself. urlscan.io will take a screenshot of the page, record the DOM content, JavaScript global variables, cookies created by the page, and a myriad of other observations. If the site is targeting the users one of the more than 400 brands tracked by urlscan.io, it will be highlighted as potentially malicious in the scan results.

## Actions

* **Check Scan Status** (*Scheduled*) - Check the status of Scan URL.
* **Get HTTP Transactions** (*Enrichment*) - Get HTTP transactions.
* **Get HTTP Transactions** V2 (*Enrichment*) - Get HTTP transactions without saving attachments.
* **Get Source Code** (*Enrichment*) - Get a web-page's source code.
* **Get URL Report** (*Enrichment*) - Get a URL report.
* **Scan Result** (*Enrichment*) - Get results of a previously executed scan.
* **Scan Search** (*Enrichment*) - Search for a specific scan.
* **Scan URL** (*Enrichment*) - Scan and analyze suspicious websites.

## Configure URLScan.io in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/urlscan-io-configuration.png')} style={{border:'1px solid gray'}} alt="URLScan.io configuration" width="400"/>

For information about URLScan.io, see [URLScan.io documentation](https://urlscan.io/docs/).

## Change Log

* June 12, 2019 - First upload
* May 18, 2020 - Verdicts output added to "Scan URL" action
* September 3, 2020 - New actions added
* March 8, 2022 - Description
* January 24, 2023
	+ solved issue for which the integration test will throw an error if no value for timeout is provided
	+ add env var class
	+ remove version attribute in the actions
* June 26, 2023 (v1.3) - Removed unnecessary empty lines
* August 2, 2023 (v1.4 & v1.5) - Integration refactored
* June 26, 2024 (v1.6) - New actions added
	+ Check Scan Status
        + Get URL Report
* June 26, 2024 (v1.7) - Updated the name of the action "Get URl Report" to "Get URL Report"
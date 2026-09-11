---
title: URLScan.io
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/urlscan.io.png')} alt="urlscan.io" width="100"/>

***Version: 1.8  
Updated: March 31, 2026***

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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import SumoLogicAPIURL from '../../../../reuse/automation-service/sumo-logic-api-url.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your URLScan [API](https://urlscan.io/docs/api/) URL.

* **API Key**. Enter your URLScan API key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationEngine/>
* <IntegrationProxy/>
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/urlscan-io-configuration.png')} style={{border:'1px solid gray'}} alt="URLScan.io configuration" width="400"/>

For information about URLScan.io, see [URLScan.io documentation](https://urlscan.io/docs/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.8 | March 31, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.7 | June 26, 2024 | Updated the name of the **Get URl Report** action to **Get URL Report**. |
| v1.6 | June 26, 2024 | Added new actions: **Check Scan Status** and **Get URL Report**. |
| v1.4, v1.5 | August 2, 2023 | Refactored the integration. |
| v1.3 | June 26, 2023 | Removed unnecessary empty lines. |
| v1.2 | January 24, 2023 | <ul><li>Fixed an issue where the integration test would throw an error if no value was provided for timeout.</li><li>Added an environment variable class.</li><li>Removed the version attribute from the actions.</li></ul> |
| v1.1 | March 8, 2022 | Updated the integration description. |
| v1.0 | September 3, 2020 | Added new actions. |
| v1.0 | May 18, 2020 | Added verdicts output to the **Scan URL** action. |
| v1.0 | June 12, 2019 | Initial release of the URLScan.io integration. |
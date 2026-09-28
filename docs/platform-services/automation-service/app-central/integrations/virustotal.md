---
title: VirusTotal
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/virustotal.png')} alt="virustotal" width="100"/>

***Version: 1.14  
Updated: April 30, 2026***

Perform threat intelligence evidence gathering with VirusTotal.

## Actions

* **Add Comment** (*Notification*) - Add a new comment.
* **Check Scanned Status** (*Scheduled*) - Check the status of a Scan File and Scan URL.
* **Domain Reputation** (*Enrichment*) - Gather domain reputation information on a specific domain.
* **Download Report** (*Enrichment*) - Download a file of scanned report.
* **File Reputation** (*Enrichment*) - Gather reputation information on a specific file.
* **Get Comment** (*Enrichment*) - Gather all comments.
* **Get Report** (*Enrichment*) - Gather a report on a specific file or URL.
* **IP Reputation** (*Enrichment*) - Gather IP reputation information for a specific IP address.
* **Scan File** (*Enrichment*) - Scan the specific file.
* **Scan URL** (*Enrichment*) - Scan on a specific URL.
* **URL Reputation** (*Enrichment*) - Gather reputation information for multiple URLs.
  <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/virus-total/virus-total-1.png')} style={{border:'1px solid gray'}} alt="Playbook showing Virus Total actions" width="800"/>

## Category

Threat Intelligence-Reputation

## Configure VirusTotal in Automation Service and Cloud SOAR

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
* **API URL**. Enter your VirusTotal API URL, for example, `https://www.virustotal.com/`.

* **API Key**. Enter your [VirusTotal API key](https://docs.virustotal.com/docs/please-give-me-an-api-key).
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/virustotal-configuration.png')} style={{border:'1px solid gray'}} alt="VirusTotal configuration" width="400"/>

For information about VirusTotal, see [VirusTotal documentation](https://docs.virustotal.com/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.14 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.13 | July 03, 2024 | <ul><li>Noted that a new version is available: **VirusTotal V3**.</li><li>Added new actions: **Check Scanned Status**, **Download Report**, and **Get Report**.</li><li>Updated actions: **Scan File** now just scans the specific file, and **Scan URL** now just scans the specific URL.</li><li>Moved actions using the V3 API to VirusTotal V3: **IP Reputation V3** as **IP Reputation**, **Search VirusTotal** as **Search VirusTotal**, **File Scan V2** as **Scan File** (which just scans the specific file), and **URL Scan V2** as **Scan URL** (which just scans the specific URL).</li></ul> |
| v1.12 | June 20, 2024 | Updated the **Scan File V2** action to add a checkbox field for handling files passed through `output.raw`. |
| v1.11 | April 4, 2024 | Added a new action: **Search VirusTotal**. |
| v1.10 | March 4, 2024 | Updated code for compatibility with Python 3.12. |
| v1.8 | July 25, 2023 | Updated the integration resource fields. |
| v1.7 | June 27, 2023 | <ul><li>Renamed **VirusTotal OIF** to **VirusTotal**.</li><li>Changed the visibility of the resource field.</li><li>Added new actions: **URL Scan V2** and **File Scan V2**.</li><li>Removed leading/trailing spaces.</li></ul> |
| | March 20, 2023 | <ul><li>Merged **IP Reputation V2** into the **IP Reputation V3** action (IP Reputation V3 uses API V3).</li><li>Merged **URL Reputation V2** into the **URL Reputation** action.</li></ul> |
| | November 22, 2022 | <ul><li>Fixed an issue where the integration test would throw an error if no value was provided for timeout.</li><li>Set the timeout field as not required.</li></ul> |
| | June 14, 2022 | Updated the **File Reputation** action to allow selecting a FileHash artifact as input. |
| | July 1, 2021 | Added a new action: **IP Reputation V3 - API v3**. |
| | June 3, 2021 | Added detected URLs information as output to the **IP Reputation** action. |
| | December 21, 2020 | Updated the descriptions. |
| | April 10, 2020 | Added WHOIS information to the **IP and Domain Reputation** action's output. |
| | July 17, 2019 | Initial release of the VirusTotal integration. |

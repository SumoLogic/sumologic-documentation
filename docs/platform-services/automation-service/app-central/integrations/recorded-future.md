---
title: Recorded Future
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/recorded-future.png')} alt="Recorded Future icon" width="100"/>

Version: 1.12  
Updated: April 30, 2026

Utilize Recorded Future threat intelligence feeds during incident investigation.

## Actions

* **IP Reputation** (*Enrichment*) - Get the reputation for the specified IP address.
* **URL Reputation** (*Enrichment*) - Get the reputation for the specified URL.
* **Domain Reputation** (*Enrichment*) - Get the reputation for the specified domain.
* **File Reputation** (*Enrichment*) - Get the reputation for the specified file hash.
* **Vulnerability Search** (*Enrichment*) - Search threat intelligence for the specified search query.
* **Malware Search** (*Enrichment*) - Search threat intelligence for the specified search query.
* **Get Alert Details** *(Enrichment)* - Get the details for the specified alert.
* **Recorded Future Alerts Daemon** *(Daemon)* - Gather RF alerts.
* **Vulnerability Search Daemon** *(Daemon)* - Daemon to fetch vulnerabilities.
* **File Reputation V2** (*Enrichment)* - Get the reputation for the specified file hash v2.
* **Search Domain** (*Enrichment*) - Search Domains.
* **Search URL** *(Enrichment)* - Search URLs.
* **Search IP** (*Enrichment)* - Search IP Addresses.
* **Search Hash** (*Enrichment)* - Search Hashes.
* **Create List** (*Containment*) - Create List.
* **Search List** (*Enrichment*) - Find lists based on a query.
* **Add Entity** (*Containment*) - Add an entity to the list.
* **Remove Entity** (*Containment*) - Remove an entity from the list.
* **List Entities** (*Enrichment*) - Get entities on the list.
* **Credentials Search** (*Enrichment*) - Search Credential data.
* **Credentials Lookup By Email** (*Enrichment*) - Lookup Credential data by Email.
* **Credentials Lookup By Login** (*Enrichment*) - Lookup Credential data by Login.

## Configure Recorded Future in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your [Recorded Future API](https://support.recordedfuture.com/hc/en-us/articles/9907011719699-Recorded-Future-Sandbox-API-Overview) URL, for example, `https://api.recordedfuture.com/`

* **API Key**. Enter your [Recorded Future API key](https://support.recordedfuture.com/hc/en-us/articles/11305261649555-Recorded-Future-Sandbox-Obtaining-an-API-Access-key).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/recorded-future-configuration.png')} style={{border:'1px solid gray'}} alt="Recorded Future configuration" width="400"/>

For information about Recorded Future, see [Recorded Future documentation](https://support.recordedfuture.com/hc/en-us).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.12 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.11 | March 4, 2024 | Updated code for compatibility with Python 3.12. |
| v1.10 | February 26, 2024 | Enabled the Incident Artifacts feature flag for the **Get Alert Details** action. |
| v1.9 | February 23, 2024 | Refactored the **Vulnerability Search Daemon**. |
| v1.8 | February 16, 2024 | Refactored the **Recorded Future Alerts Daemon**. |
| v1.7 | June 22, 2023 | Renamed the integration from Recorded Future OIF to Recorded Future. |
| v1.6 | June 22, 2023 | Removed unnecessary empty lines. |
| v1.5 | February 8, 2023 | Updated actions to change the 'Fields' field to a required field and improve error handling: **File Reputation**, **Domain Reputation**, **URL Reputation**, and **IP Reputation**. |
| | January 10, 2023 | Refactored the integration. |
| | March 23, 2022 | Added new actions: **Search Domain**, **Search URL**, **Search IP**, and **Search Hash**. |
| | October 27, 2021 | Added a new action: **File Reputation V2**. |
| | February 19, 2021 | Updated actions: **Get Alert Details**, **Recorded Future Alerts Daemon**, and **Vulnerability Search Daemon**. |
| | September 16, 2019 | Initial release of the Recorded Future integration. |

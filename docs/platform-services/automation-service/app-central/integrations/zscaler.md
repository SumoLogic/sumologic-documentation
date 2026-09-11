---
title: Zscaler
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/zscaler.png')} alt="axonius" width="80"/>

**Version: 1.8  
Updated: April 30, 2026**

Zscaler Internet Access is a cloud native [security service edge (SSE)](https://www.zscaler.com/solutions/zscaler-security-service-edge) solution that builds on a [decade of secure web gateway leadership](https://www.zscaler.com/gartner-magic-quadrant-secure-web-gateways-2020). Offered as a scalable SaaS platform from the world’s largest security cloud, it replaces legacy network security solutions to stop advanced attacks and prevent data loss with a comprehensive zero trust approach.

## Actions

* **Add Url To Blacklist** (*Containment*) - Blocklist a URL.
* **Add Url To Category** (*Containment*) - Add a URL to category.
* **Add Url To Whitelist** (*Containment*) - Add a URL to whitelist.
* **Get Blacklist** (*Enrichment*) - Retrieve addresses blacklist.
* **Get Categories** (*Enrichment*) - Retrieve categories.
* **Get Sandbox Report** (*Enrichment*) - Obtain a sandbox report.
* **Get Whitelist** (*Enrichment*) - Retrieve addresses whitelist.
* **Remove Url From Blacklist** (*Containment*) - Remove a URL from blacklist.
* **Remove Url From Category** (*Containment*) - Remove a URL from category.
* **Remove Url From Whitelist** (*Containment*) - Remove a URL from whitelist.
* **Url Lookup** (*Enrichment*) - Lookup of a URL.

**Zscaler Sumo Logic Integration**

[Modern Security Ops with Zscaler and Sumo Logic](https://www.youtube.com/watch?v=ZAReRGjdUns).

## Category

Security gateway

## Configure Zscaler in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your [Zscaler API base URL](https://help.zscaler.com/oneapi/getting-started#LocateBaseURL).

* **API Key**. Enter your [Zscaler API key](https://help.zscaler.com/zidentity/about-api-clients).

* **Username**. Enter the username of a Zscaler admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/zscaler-configuration.png')} style={{border:'1px solid gray'}} alt="Zscaler configuration" width="400"/>

For information about Zscaler, see [Zscaler documentation](https://help.zscaler.com/zia).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.8 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.7 | August 29, 2025 | Updated exception handling for better error messages across all the actions and the integration file. |
| v1.6 | March 20, 2024 | Added a new field to the **Add URL To Category** and **Remove URL From Category** actions for use with custom URL categories. |
| v1.3 | February 20, 2024 | Fixed an issue that prevented some actions from being executed. |
| v1.2 | June 15, 2023 | Updated the integration with Environmental Variables. |
| v1.1 | July 18, 2022 | <ul><li>The base URL in the connector is now visible as plain text.</li><li>Added a new logo.</li><li>Added missing incident artifacts.</li></ul> |
| v1.0 | October 16, 2019 | Initial release of the Zscaler integration. |
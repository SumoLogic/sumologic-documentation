---
title: Darktrace
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/darktrace.png')} alt="darktrace" width="100"/>

***Version: 1.8  
Updated: April 29, 2026***

Perform threat intelligence evidence gathering with Darktrace.

## Actions

* **Add To Watch List** *(Containment)* - Adds external domains, hostnames, or IP addresses to Darktrace's internal watch list.
* **Darktrace Breach Daemon** *(Daemon)* - Automatically gather Breaches from Darktrace.
* **Darktrace Incident Events Daemon** *(Daemon)* - Automatically gather Incident Events from Darktrace (provides access to AI Analyst events - a group of anomalies or network activity investigated by Cyber AI Analysts).
* **Get IOC** *(Enrichment)* - Get IOC details by value.
* **Get Model** *(Enrichment)* - Returns a specific model that currently exist on the Threat Visualizer.
* **Get Watch List** *(Enrichment)* - Retrieves a list of indicators from a watch list.
* **List Models** *(Enrichment)* - Returns a list of all models that currently exist on the Threat Visualizer.
* **List Tags** *(Enrichment)* - List all available tags.
* **Remove From Watch List** *(Containment)* - Removes an external domain, hostname, or IP address from Darktrace's internal watch list.
* **Search Breach** *(Enrichment)* - Query breaches from Darktrace.
* **Search Devices** *(Enrichment)* - Search capacity to interrogate the list of devices has seen on the network.

## Configure Darktrace in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Darktrace server URL.

* **Public Key**. Enter a Darktrace public key.

* **Private Key**. Enter the private key corresponding to the public key.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* **Darktrace Minutes**. Enter your Darktrace minutes setting, for example, `10`.

* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/darktrace-configuration.png')} style={{border:'1px solid gray'}} alt="Darktrace configuration" width="400"/>

For information about Darktrace, see the [Darktrace website](https://www.darktrace.com/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.8 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.7 | January 10, 2025 | Fixed a timedelta-related error in all actions. |
| v1.5 | March 4, 2024 | Updated code for compatibility with Python 3.12. |
| v1.5 | February 28, 2024 | Updated code for compatibility with Python 3.12. |
| v1.4 | January 29, 2024 | Resolved a bug related to the integration resource. |
| v1.3 | July 12, 2023 | Updated the integration with Environmental Variables. |
| v1.2 | February 17, 2023 | Added a new action: **Darktrace Incident Events Daemon**. |
| v1.1 | June 07, 2022 | Added new actions: **Search Breach** and **Darktrace Breach Daemon**. |
| v1.0 | February 11, 2021 | Updated actions: **Get IOC**, **List Models**, **Get Models**, **Search Device**, and **List Tags**. |
| v1.0 | January 15, 2021 | Initial release of the Darktrace integration. |

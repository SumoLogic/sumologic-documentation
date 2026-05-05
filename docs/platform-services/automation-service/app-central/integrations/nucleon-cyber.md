---
title: Nucleon Cyber
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/nucleon-cyber.png')} alt="Nucleon Cyber icon" width="100"/>

***Version: 1.2  
Updated: April 30, 2026***

Nucleon Cyber framework for threat intelligence - perform in-depth analysis, verification, and reporting of threat actors, attacks, and malware.

## Actions

* **Active Threats Feed** *(Enrichment)* - Returns Active Threats data.
* **Search Hash** *(Enrichment)* - Returns hash information and details about files and threats.
* **Search IP** *(Enrichment)* - Search by IP.

## Configure Nucleon Cyber in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter your Nucleon Cyber host address.

* **User**. Enter the username of a Nucleon Cyber admin user.

* **Password**. Enter the password for the amin user.

* **Client ID**. Enter a Nucleon Cyber client ID.

* **Usrn**. Enter your Nucleon Cyber Universal Security Reconnaissance Network name.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/nucleon-configuration.png')} style={{border:'1px solid gray'}} alt="Nucleon Cyber configuration" width="400"/>

For information about Nucleon, see the [Nucleon website](https://nucleoncyber.com/).

## Change Log

* October 7, 2021 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.

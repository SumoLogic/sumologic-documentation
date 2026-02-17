---
title: Cisco ESA
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-esa.png')} alt="cisco-esa" width="70"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Cisco ESA provides a comprehensive view of security for improved threat intelligence, defense, and remediation. That includes: Centralized management of email spam quarantine, comprehensive threat monitoring across multiple web and email security gateways.

## Actions

* **Get Spam Quarantine List** *(Enrichment)* - Retrieve Blocklist Entries.
* **Edit Spam Quarantine List** *(Containment)* - Add, edit or append Recipient/Sender List/Addresses.

## Configure Cisco ESA in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Cisco ESA API URL.

* **Username**. Enter the username of a Cisco ESA admin authorized to provide authentication for the integration.

* **Password**. Enter the password for the Cisco ESA admin user.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>
   
   <img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco/cisco-esa-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco ESA configuration" width="400"/>

For information about Cisco Secure Email Gateway (formerly Email Security Appliance), see [Cisco Secure Email Gateway documentation](https://www.cisco.com/c/en/us/support/security/email-security-appliance/series.html).

## Category

Email Gateway

## Change Log

* October 12, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables

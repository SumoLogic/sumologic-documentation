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

<IntegrationsAuth/>

   * URL API
   * Username
   * Password

For information about Cisco Secure Email Gateway (formerly Email Security Appliance), see [Cisco Secure Email Gateway documentation](https://www.cisco.com/c/en/us/support/security/email-security-appliance/series.html).

## Category

Email Gateway

## Change Log

* October 12, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables

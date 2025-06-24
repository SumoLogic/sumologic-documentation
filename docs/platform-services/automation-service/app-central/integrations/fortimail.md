---
title: FortiMail
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fortimail.png')} alt="fortimail" width="100"/>

***Version: 1.1  
Updated: Jul 03, 2023***

Work with Access Rules, Domains, IP Policies and Recipient Policies in Fortinet FortiMail.

## Actions

* **Get Access Rules** (*Enrichment*) - Get access rules.
* **Get Domain Info** (*Enrichment*) - Get information for a domain.
* **Get IP Policies** (*Enrichment*) - Get IP policies.
* **Get Recipient Policies** (*Enrichment*) - Get recipient policies.
* **Get Blacklist** (*Enrichment*) - Gather blacklists from FortiMail.
* **Add to Blacklist** (*Containment*) - Add a new entry to a blacklist.
* **Create Access Rule** (*Containment*) - Create a new access rule.
* **Create IP Policy** (*Containment*) - Create a new IP policy.
* **Create Inbound Recipient Policy** (*Containment*) - Create a new inbound recipient policy.
* **Create Outbound Recipient Policy** (*Containment*) - Create a new outbound recipient policy.

## Configure FortiMail in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your FortiMail server URL.

* **Username**. Enter the username of a FortiMail admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fortimail-configuration.png')} style={{border:'1px solid gray'}} alt="FortiMail configuration" width="400"/>

For information about FortiMail, see [FortiMail documentation](https://docs.fortinet.com/product/fortimail/7.6).

## Change Log

* January 24, 2019 - First upload
* August 30, 2019 - New actions added
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables

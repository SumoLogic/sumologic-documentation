---
title: FortiProxy
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fortiproxy.png')} alt="fortiproxy" width="80"/>

***Version: 1.2  
Updated: Jul 18, 2023***

Fortinet FortiProxy is a secure web proxy that protects employees against internet-borne attacks by incorporating multiple detection technique such as web filtering, DNS filtering, data loss prevention, antivirus, intrusion prevention, and advanced threat protection. FortiProxy helps to reduce bandwidth demands and optimize the network with content and video caching.

## Actions

* **List Antivirus Profiles** *(Enrichment)* - Select all entries in a CLI table of antivirus profiles.
* **Create Antivirus Profile** *(Containment)* - Create antivirus profile.
* **Delete Antivirus Profiles** *(Containment)* - Delete the specific resource.
* **List Authentication Rules** *(Enrichment)* - Select all entries in a CLI table of authentication rules.
* **Create Authentication Rule** *(Containment)* - Create authentication rule.
* **Delete Authentication Rule** *(Containment)* - Delete the specific resource.
* **List Firewall Addresses** *(Enrichment)* - Select all entries in a CLI table of firewall addresses.
* **Create Firewall Address** *(Containment)* - Create firewall address.
* **Delete Firewall Address** *(Containment)* - Delete the specific resource.
* **List Web Filter Profiles** *(Enrichment)* - Select all entries in a CLI table of webfilter profiles.
* **Create Web Filter Profile** *(Containment)* - Delete the specific resource.
* **List Policies** *(Enrichment)* - Select all entries in a CLI table of policies.
* **Create Policy** *(Containment)* - Create firewall policy.
* **Delete Policy** *(Containment)* - Delete the specific resource.
* **List Traffic Shaping Policy** *(Enrichment)* - Select all entries in a CLI table of traffic shaping policy.
* **Create Traffic Shaping Policy** *(Containment)* - Create traffic shaping policy.
* **Delete Traffic Shaping Policy** *(Containment)* - Delete the specific resource.
* **List Webfilter Urlfilter** *(Enrichment)* - Select all entries in a CLI table of webfilter urlfilter.
* **Create URL Filter** *(Containment)* - Create URL filtering.

## Configure FortiProxy in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter your FortiProxy hostname.

* **API Token**. Enter a FortiProxy API [token](https://docs.fortinet.com/document/fortiproxy/7.4.4/administration-guide/532254/registering-and-activating-a-hard-token).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fortiproxy-configuration.png')} style={{border:'1px solid gray'}} alt="FortiProxy configuration" width="400"/>

For information about FortiProxy, see [FortiProxy documentation](https://docs.fortinet.com/product/fortiproxy/7.4).

## Change Log

* February 14, 2022 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 18, 2023 (v1.2) - Code refactoring

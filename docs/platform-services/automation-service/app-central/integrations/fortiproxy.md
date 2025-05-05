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

<IntegrationsAuth/>

For information about FortiProxy, see [FortiProxy documentation](https://docs.fortinet.com/product/fortiproxy/7.4).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. 
1. Populate all the required fields (\*) and then click **Save**.
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/fortiproxy/fortiproxy-4.png')} style={{border:'1px solid gray'}} alt="fortiproxy" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/fortiproxy/fortiproxy-5.png')} style={{border:'1px solid gray'}} alt="fortiproxy" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/fortiproxy/fortiproxy-6.png')} style={{border:'1px solid gray'}} alt="fortiproxy" width="400"/>

## Change Log

* February 14, 2022 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 18, 2023 (v1.2) - Code refactoring

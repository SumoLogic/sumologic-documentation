---
title: Proofpoint TAP
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/proofpoint-tap.png')} alt="proofpoint-tap" width="100"/>

***Version: 1.2  
Updated: Mar 31, 2023***

Proofpoint Targeted Attack Protection (TAP) integration which protects against and provides additional visibility into phishing and other malicious attacks.

## Actions

* **List Campaigns** *(Enrichment)* - Gets details for a given campaign.
* **Get Campaign** *(Enrichment)* - Gets a list of IDs of campaigns active in a specified time period.
* **Get Most Attacked Users** *(Enrichment)* - Gets a list of the most attacked users in the organization.
* **Get Top Clickers** *(Enrichment)* - Gets a list of the top clickers in the organization for a specified time period.
* **Get Threat** *(Enrichment)* - A string containing a unique identifier associated with the threat in TAP Dashboard.
* **List Issues** *(Enrichment)* - Get events for clicks to malicious URLs permitted and messages delivered containing a known attachment threat within the specified time period.
* **Blocked Messages** *(Enrichment)* - Fetch events for messages blocked in the specified time period which contained a known threat.
* **Blocked Clicks** *(Enrichment)* - Fetch events for clicks to malicious URLs blocked in the specified time period.
* **Decode URL** *(Containment)* - The URL Decoder allows users to decode URLs which have been rewritten by TAP to their original, target URL.

## Configure Proofpoint TAP in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. Name of the resource
   * **URL**. URL of Proofpoint TAP (default URL’ [https://tap-api-v2.proofpoint.com](https://tap-api-v2.proofpoint.com/)’ is already provided).
   * Service Principal
   * Secret Key<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/proofpoint-tap-configuration.png')} style={{border:'1px solid gray'}} alt="Proofpoint TAP configuration" width="400"/>

For information about Proofpoint, see the [Proofpoint website](https://www.proofpoint.com/us/resources/data-sheets/targeted-attack-protection).

## Change Log

* February 4, 2022 - First upload
* March 31, 2023 (v1.1 and v1.2) - Integration refined.

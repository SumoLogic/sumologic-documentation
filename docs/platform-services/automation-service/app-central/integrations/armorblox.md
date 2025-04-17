---
title: Armorblox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/armorblox.png')} alt="armorblox" width="70"/>

***Version: 1.1  
Updated: Sep 04, 2023***

Armorblox secures enterprise communications over email and other cloud office applications with the power of Natural Language Understanding. The Armorblox platform connects over APIs and analyzes thousands of signals to understand the context of communications and protect people and data from compromise. Armorblox connects over APIs with Office 365, G Suite, and Exchange to secure your human layer without affecting MX records or mail flow. Tens of thousands of organizations use Armorblox to stop BEC and targeted phishing attacks, protect sensitive PII and PCI, and automate remediation of user-reported email threats.

## Actions

* **Armorblox Incidents Daemon** *(Daemon)* - Automatically retrieve incidents from Armorblox.
* **Get App Restrictions** *(Enrichment)* - Retrieve info about what actions are available, what each email label's ID is, AD group UIds.
* **Get Incident** *(Enrichment)* - Get information about a specific incident.
* **Get Incident Senders** *(Enrichment)* - Get information about an incident's sender data.
* **List Incidents** *(Enrichment)* - Get a list of all the Incidents detected by Armorblox.
* **Update Incident Action** *(Containment)* - Update the action to be taken for an incident's objects.

## Configure Armorblox in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* September 4, 2023 (v1.0) - First upload

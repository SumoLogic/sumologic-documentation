---
title: Have I Been Pwned
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/have-i-been-pwned.png')} alt="have-i-been-pwned" width="100"/>

***Version: 1.3  
Updated: Dec 12, 2023***

Have I Been Pwned (HIBP) allows you to check if your personal data has been compromised in a data breach.

## Actions

* **Get Latest Breach** *(Enrichment)* - Get the most recently added breach.
* **Get Single Breached Site** *(Enrichment)* - Get a single breached site.
* **List Breached Sites In System** *(Enrichment)* - List all breached sites in the system.
* **List Breaches For Account** *(Enrichment)* - Return a list of all breaches a particular account has been involved in.
* **List Data Classes In System** *(Enrichment)* - Get all data classes in the system.
* **List Pastes For Account** *(Enrichment)* - Get all pastes for an account.

## Category

Database

## Configure Have I Been Pwned in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/have-i-been-pwned-configuration.png')} style={{border:'1px solid gray'}} alt="Have I Been Pwned configuration" width="400"/>

For information about Have I Been Pwned, see [Have I Been Pwned documentation](https://haveibeenpwned.com/api/v3).

## Change Log

* August 26, 2021 (v1.0) - First upload
* April 14, 2023 (v1.1) - Refactored
* April 17, 2023 (v1.2) - Improved error handling
* December 12, 2023 (v1.3) - Added new action: Get Latest Breach

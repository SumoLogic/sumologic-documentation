---
title: Qualys WAS
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/qualys-was.png')} alt="qualys-was" width="100"/>

***Version: 1.2  
Updated: Sep 28, 2023***

Qualys WAS is a cloud-based service that provides automated crawling and testing of custom web applications to identify vulnerabilities Enables organizations to assess, track and remediate web application vulnerabilities.

## Actions

* **List Web Applications** *(Enrichment)* - Returns a list of web applications which are in the user’s scope.
* **Get Web Application Details** *(Enrichment)* - Returns details for a web application which is in the user’s scope.
* **Create Web Application** *(Containment)* - Creates a web application.
* **Delete Web Application** *(Containment)* - Delete a web application configuration in your account.

## Configure Qualys WAS in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Qualys WAS, see[ Qualys Web Application Scanning documentation](https://docs.qualys.com/en/was/latest/#t=get_started%2Fget_started.htm).

## Change Log

* September 7, 2021 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* September 28, 2023 (v1.2) - Versioning

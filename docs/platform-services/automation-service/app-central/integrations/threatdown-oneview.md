---
title: ThreatDown OneView
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/threatdown-oneview.png')} alt="threatdown-oneview" width="100"/>

***Version: 1.0  
Updated: Mar 7, 2025***

Malwarebytes ThreatDown OneView (MBOV) provides your business with a powerful and affordable security management platform that gives security teams maximum control. OneView streamlines endpoint security management by providing out-of-the-box security policies, scans, and remediation.

## Actions

* **Create Exclusion** *(Containment)* - Create Exclusion.
* **Create Policy** *(Containment)* - Create policy.
* **Delete Exclusion** *(Containment)* - Delete exclusion by ID.
* **Delete Policy** *(Containment)* - Delete policy by ID.
* **Get Account Info** *(Enrichment)* - Retrieve Account Info.
* **Get Endpoint** *(Enrichment)* - Retrieve a single ID by its universally unique identifier.
* **Get Endpoint Status** *(Enrichment)* - Get the status of an endpoint.
* **Get Exclusion** *(Enrichment)* - Get exclusion by ID.
* **Get Job Status** *(Enrichment)* - Get details about an issued job by ID.
* **Get Policy** *(Enrichment)* - Get policy by ID.
* **Get Suspicious Activity** *(Enrichment)* - Fetch suspicious activity of an endpoint.
* **Issue Job** *(Containment)* - Issue a job (scan endpoint, restart endpoint, check for updates).
* **List Detections** *(Enrichment)* - Search detections.
* **List Policies** *(Enrichment)* - Retrieve a list of policies.
* **List Sites** *(Enrichment)* - Retrieves a list of all sites associated with the account.
* **List Vulnerabilities** *(Enrichment)* - Search CVE grouped by a specific field.
* **Remediate Activity** *(Containment)* - Remediate suspicious activity of an endpoint.
* **Search Endpoints** *(Enrichment)* - Search all endpoints, or search either the alias or the host name of a fully qualified host name.
* **Update Exclusion** *(Containment)* - Update Exclusion by ID.
* **Update Policy** *(Containment)* - Update policy.

## Category

Threat Intelligence Reputation

## ThreatDown OneView configuration

### Generate API credentials

[Create API credentials](https://support.threatdown.com/hc/en-us/articles/4413799441683-Create-OAuth2-credentials-for-OneView) from your Malwarebytes account:
1. Sign in to [Malwarebytes](https://oneview.threatdown.com/dashboard) with your Malwarebytes account. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview5.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview5" width="300"/>
2. Click **Integrate**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview6.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview6" width="200"/>
3. Click **"+"** to create credentials. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview7.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview7" width="800"/>
4. Give a name to the application.
1. Select the required access. <br/>When configuring credentials for the integration, permissions can be set to Read, Write, and Execute. While it's possible to grant only the required permissions based on your use case, we recommend assigning all three permissions during credential creation. This ensures full compatibility with all available actions in the integration and avoids permission-related failures in the future.
<br/>The minimum required permissions vary based on the type of actions being performed:
   * Enrichment actions 
      * These actions only retrieve data.
      * Required Permission: Read
   * Containment actions
      * These actions perform changes or take action on endpoints.
      * Required Permissions: Write and Execute
5. After this you will get an Client ID and Client Secret. Copy the Client ID and Client Secret.

## Configure ThreatDown OneView in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

    * **Label**. Add a name for the resource.
    * **URL**. Enter your ThreatDown OneView site URL.
    * **Client ID**. Enter your Client ID.
    * **Client Secret**. Enter your Client Secret.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview2.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview2" width="400"/>

For information about ThreatDown OneView, see [ThreatDown OneView documentation](https://support.threatdown.com/hc/en-us/sections/4413802067603-Administration).

## Change Log

* March 7, 2025 - First upload

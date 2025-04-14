---
title: ThreatDown Oneview
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

## ThreatDown Oneview Configurations

Sign in to [Malwarebytes](https://oneview.threatdown.com/dashboard) with your Malwarebytes account.

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview5.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview5" width="400"/>

## Generate an API Credentials

Create an API Credentials from your Malwarebytes account:
1. Once you logged into your malwarebytes account.
2. Click on Integrate <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview6.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview6" width="250"/>
3. Click on the **"+"** button to create credentials. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview7.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview7" width="450"/>
4. Give name to the Application and Select required Accesses.
5. After this you will get an Client ID and Client Secret.

## Minimum Permissions Required for ThreatDown OneView Integration

When configuring credentials for the integration, permissions can be set to Read, Write, and Execute. The minimum required permissions vary based on the type of actions being performed:

For Enrichment Actions - 
1. These actions only retrieve data
2. Required Permission: Read

For Containment Actions - 
1. These actions perform changes or take action on endpoints and etc.
2. Required Permissions: Write and Execute

## Recommendation

While it's possible to grant only the required permissions based on use case,
we recommend assigning all three permissions — Read, Write, and Execute — during credential creation.
This ensures full compatibility with all available actions in the integration and avoids permission-related failures in the future.

## Configure ThreatDown Oneview in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add a new resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview1.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview1" width="100"/>
1. Label and populate all the required fields (\*).
    1. **Label**. Add a name for the resource.
    1. **URL**. Enter your ThreatDown Oneview site URL.
    1. **Client ID**. Enter your Client ID.
    1. **Client Secret**. Enter your Client Secret.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview2.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview2" width="400"/>
1. Click **SAVE**.
1. To make sure the resource is working, hover over the resource and then click the **TEST**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview3.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview3" width="150"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatdown-oneview/threatdown-oneview4.png')} style={{border:'1px solid gray'}} alt="threatdown-oneview4" width="250"/>


## Change Log

* March 7, 2025 - First upload

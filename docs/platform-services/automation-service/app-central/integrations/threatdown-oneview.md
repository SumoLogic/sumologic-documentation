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

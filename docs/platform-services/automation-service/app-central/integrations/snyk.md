---
title: Snyk
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/snyk.png')} alt="snyk" width="60"/>

***Version: 1.1  
Updated: Jul 07, 2023***

The Snyk is a platform allowing you to scan, prioritize, and fix security vulnerabilities in your own code, open source dependencies, container images, and Infrastructure as Code (IaC) configurations.

## Actions

* **Get My User Details** (*Enrichment*) - Get my user details.
* **List All Organizations in a Group** (*Enrichment*) - List organizations in a group.
* **List Projects** (*Enrichment*) - List all projects for an organization.
* **List Latest Issues** (*Enrichment*) - Get list of latest issues.

## Configure Snyk in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Snyk, see [Snyk documentation](https://docs.snyk.io/).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snyk/snyk-3.png')} style={{border:'1px solid gray'}} alt="snyk" width="400"/>
1. Populate all the required fields (\*)
   * **API URL**. Default is `https://api.snyk.io/`.
   * **Token**. Insert the Token.
1. Click **SAVE**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snyk/snyk-4.png')} style={{border:'1px solid gray'}} alt="snyk" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snyk/snyk-5.png')} style={{border:'1px solid gray'}} alt="snyk" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snyk/snyk-6.png')} style={{border:'1px solid gray'}} alt="snyk" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snyk/snyk-7.png')} style={{border:'1px solid gray'}} alt="snyk" width="400"/>

## Note

**Required permissions:**

* **List Projects** - View Organization; View Project; View Project Snapshot
* **List Latest Issues** - View Project for every Organization in filters.orgs; View Organization Reports for every Organization in filters.orgs

## Change Log

* May 25, 2023 (v1.0) - First upload
* July 7, 2023 (v1.1) - Removed leading/trailing spaces

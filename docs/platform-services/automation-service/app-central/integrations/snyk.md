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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your [Snyk API URL](https://docs.snyk.io/snyk-api/v1-api#api-urls). The default is `https://api.snyk.io/`.

* **Token**. Insert your [Snyk API token](https://docs.snyk.io/snyk-api/authentication-for-api#how-to-obtain-your-personal-token).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/snyk-configuration.png')} style={{border:'1px solid gray'}} alt="Snyk configuration" width="400"/>

For information about Snyk, see [Snyk documentation](https://docs.snyk.io/).

## Note

**Required permissions:**

* **List Projects** - View Organization; View Project; View Project Snapshot
* **List Latest Issues** - View Project for every Organization in filters.orgs; View Organization Reports for every Organization in filters.orgs

## Change Log

* May 25, 2023 (v1.0) - First upload
* July 7, 2023 (v1.1) - Removed leading/trailing spaces

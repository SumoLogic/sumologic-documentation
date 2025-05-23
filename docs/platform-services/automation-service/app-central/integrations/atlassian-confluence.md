---
title: Atlassian Confluence
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/atlassian-confluence.png')} alt="atlassian-confluence" width="80"/>

***Version: 1.0  
Updated: Oct 13, 2023***

Atlassian Confluence is a collaborative workspace tool for teams to create, share, and manage content, enhancing communication and project organization.

## Actions

* **Get Page** *(Enrichment)* - Returns a specific page for given page id.
* **List Child Pages** *(Enrichment)* - Returns all child pages for given page id.
* **List Labels** *(Enrichment)* - Returns all labels.
* **List Pages** *(Enrichment)* - Returns all pages.
* **List Spaces** *(Enrichment)* - Returns all spaces.

## Configure Atlassian Confluence configuration

To retrieve the API token, see the [Atlassian documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).

## Configure Atlassian Confluence in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the URL of your Atlassian Confluence instance.

* **Username**. Enter the username of the user authorized to provide authentication for the Atlassian Confluence integration.

* **Token**. Enter the API token you created [above](#configure-atlassian-confluence-configuration).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian/atlassian-confluence-configuration.png')} style={{border:'1px solid gray'}} alt="Atlassian Confluence Logger configuration" width="400"/>

For information about Atlassian Confluence, see [Confluence documentation](https://confluence.atlassian.com/alldoc/confluence-documentation-directory-12877996.html).

## Change Log

* October 13, 2023 - First upload

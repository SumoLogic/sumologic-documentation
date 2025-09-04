---
title: GitHub
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/github.png')} alt="github" width="80"/>

Version: 1.5  
Updated: Jul 06, 2023

**GitHub** is an Internet hosting service for software development and version control using Git. It provides the distributed version control of Git plus access control, bug tracking, software feature requests, task management, continuous integration, and wikis for every project

## Actions

* **List Organizations** (*Enrichment*) - List organizations for the authenticated user.
* **List Organization Members** (*Enrichment*) - List all users who are members of an organization.
* **List Organization Repositories** (*Enrichment*) - Lists repositories for the specified organization.
* **List Commits** (*Enrichment*) - List commits in repository.
* **Get Commit** (*Enrichment*) - Returns the contents of a single commit reference.
* **Get Commit By URL** (Enrichment) - Returns details of a commit by providing url.

## Configure GitHub in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your GitHub [API URL](https://docs.github.com/en/codespaces/developing-in-a-codespace/default-environment-variables-for-your-codespace). The default value is `https://api.github.com`

* **Token**. Enter your GitHub [token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/github-configuration.png')} style={{border:'1px solid gray'}} alt="GitHub configuration" width="400"/>

For information about GitHub, see [GitHub documentation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app).

## Change Log

* May 16, 2023 (v1.2) - First upload
* May 22, 2023 (v1.4) - Action Get Commit by URL refactored
* July 6, 2023 (v1.5) - Removed leading/trailing spaces

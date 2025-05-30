---
title: GitLab
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/gitlab.png')} alt="gitlab" width="80"/>

***Version: 1.1  
Updated: Jun 26, 2023***

Query data from GitLab.

## Actions

* **List Repository Tree** *(Enrichment)* - Get a list of repository files and directories in a project.
* **Get File From Repository** *(Enrichment)* - Receive information about file in repository like name, size, content.
* **Project Search** *(Enrichment)* - Search within the specified project.

## Configure GitLab in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/gitlab-configuration.png')} style={{border:'1px solid gray'}} alt="GitLab configuration" width="400"/>

For information about GitLab, see [GitLab documentation](https://docs.gitlab.com/).

## Change Log

* August 19, 2021 - First upload
* September 24, 2021 - New action added
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables

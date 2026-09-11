---
title: Atlassian Jira
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/atlassian-jira.png')} alt="Atlassian Jira icon" width="80"/>

***Version: 1.8  
Updated: April 13, 2026***

This integration is built specifically for Jira OnPrem (Server and Data Center) and provides a range of issue management capabilities.

## Actions

* **Add Comment** (*Notification*) - Adds a new comment to an issue.
* **Create Issue** (*Notification*) - Creates a new issue in the specified Jira project.
* **Delete Issue** (*Containment*) - Deletes the specified issue.
* **Get Attachments** *(Enrichment)* - Retrieves attachments from an issue and stores them in Cloud SOAR.
* **Get Issue** *(Enrichment)* - Returns an issue in JSON format.
* **Jira Issues Daemon** (*Daemon*) - Automatically pulls issues from the specified project.
* **List Comments** (*Enrichment*) - Returns all comments for an issue.
* **List Fields** (*Enrichment*) - Returns a list of all fields, both System and Custom.
* **List Issue Types** (*Enrichment*) - Returns a list of all issue types visible to the user.
* **List Projects** (*Enrichment*) - Returns all projects which are visible for the currently logged-in user.
* **List Statuses** (*Enrichment*) - Get all issue types with valid status values for a project.
* **List Transitions** (*Enrichment*) - Get a list of the transitions possible for this issue by the current user.
* **Search** (*Enrichment*) - Searches for issues using JQL.
* **Update Issue** (*Notification*) - Edits an issue.
* **Update Issue Status** (*Notification*) - Perform a transition on an issue.

## Category

Ticketing System

## Configure Atlassian Jira in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Atlassian site URL. For example, `https://your-atlassian-site.atlassian.net/`. For information, see [Atlassian documentation](https://support.atlassian.com/jira/kb/find-your-site-url-to-set-up-the-jira-data-center-and-server-mobile-app/).

* **Personal Access Token (PAT)**. Enter your Jira [personal access token](https://confluence.atlassian.com/enterprise/using-personal-access-tokens-1026032365.html).

* **Username**. If you don't provide a personal access token, enter the username (email address) of the Jira admin user authorized to authenticate the integration.

* **Password**. Enter the password for your Jira admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* **Jira Project Name (Daemon)**. Enter the Jira [project name](https://confluence.atlassian.com/adminjiraserver/defining-a-project-938847066.html).

* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian/atlassian-jira-configuration.png')} style={{border:'1px solid gray'}} alt="Atlassian Jira Logger configuration" width="400"/>

For information about Atlassian Jira, see [Jira documentation](https://confluence.atlassian.com/jira). 

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.8 | April 13, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.7 | March 29, 2024 | Updated the **Create Issue** action to allow new lines in the description field. |
| v1.6 | February 14, 2024 | Enhanced the **Create Issue** and **Update Issue** actions to support Jira custom fields. |
| v1.5 | January 9, 2024 | <ul><li>Updated the logo.</li><li>Renamed the following actions: **Add Comment To Issue** to **Add Comment**, **Add Issue Attachments To Incident** to **Get Attachments**, **Get Issue Comments** to **List Comments**, **List Issue Fields** to **List Fields**, **List Issue Status** to **List Statuses**, **List Project** to **List Projects**, **Search Into Issues Jira** to **Search**, and **Set Issue Status** to **Update Issue Status**.</li><li>Introduced breaking changes: both the output mapping and some input fields were revised and updated.</li></ul> |
| v1.4 | July 18, 2023 | Updated the integration with environmental variables. |
| v1.3 | January 24, 2023 | <ul><li>Added a hint for Host.</li><li>Solved an issue where the integration test would throw an error if no value for timeout was provided.</li><li>Set the timeout field as not required.</li></ul> |
| v1.2 | August 02, 2022 | Added a new action: **Get Issue Comments**. |
| v1.1 | August 02, 2022 | Updated the **Create Issue** action to update the description field to support new lines. |
| | June 24, 2022 | Added new actions: **Get Issue** and **Monitor Issue Status**. |
| | June 3, 2021 | Added a new action. |
| | April 5, 2021 | Added new actions. |
| | June 3, 2019 | Initial release of the Atlassian Jira integration. |

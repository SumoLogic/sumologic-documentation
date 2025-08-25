---
title: Atlassian Jira
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/atlassian-jira.png')} alt="atlassian-jira" width="80"/>

***Version: 1.7  
Updated: Mar 29, 2024***

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

For information about Atlassian Jira, see [Jira documentation]( https://confluence.atlassian.com/jira). 

## Change Log

* June 3, 2019 - First upload
* April 5, 2021 - New actions added
* June 3, 2021 - New action added
* June 24, 2022 - New actions added:
    + Get Issue
    + Monitor Issue Status
* August 02, 2022 - Updated action: Create Issue (update the description field to support the new line)
* August 02, 2022 - New action added:
    + Get Issue Comments
* January 24, 2023
    + added hint for Host
    + solved issue for which the integration test will throw an error if no value for timeout is provided
    + set the timeout field as not required
* July 18, 2023 (v1.4) - Updated the integration with Environmental Variables
* January 9, 2024 (v1.5)
    + New Logo
    + The following actions have been renamed:
        - Add Comment To Issue: Add Comment
        - Add Issue Attachments To Incident: Get Attachments
        - Get Issue Comments: List Comments
        - List Issue Fields: List Fields
        - List Issue Status: List Statuses
        - List Project: List Projects
        - Search Into Issues Jira: Search
        - Set Issue Status: Update Issue Status
    + Please note that this update introduces BREAKING CHANGES: both the output mapping and some input fields have been revised and updated.
* February 14, 2024 (v1.6)
    * Enhanced "Create Issue" and "Update Issue" actions to support Jira custom fields
* March 29, 2024 (v1.7)
    * Create Issue Action updated to allow new lines in the description field

---
title: Atlassian Jira V2
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/atlassian-jira-v2.png')} alt="Atlassian logo" width="80"/>

***Version: 2.10  
Updated: September 2 , 2024***

Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.

:::note
This integration uses the [Jira REST API v2](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#about).
:::

## Actions

* **Add Comment to Issue** *(Notification)* - Add a comment to the specified issue.
* **Add Issue Attachments To Incident** *(Enrichment)* - Add attachment from Jira issue to Cloud SOAR Incident.
* **Check Issue Status Schedule** *(Scheduled)* - To wait for or check a status update of a Jira ticket/issue.
* **Create Issue** (*Notification*) - Create a new issue in the specified Jira project.
* **Delete Issue** (*Containment*) - Delete the specified issue.
* **Download Attachment** *(Enrichment)* - Returns the contents of an attachment in an encoded format that can be used for further analysis selecting `output.raw` in your playbooks.
* **Get Issue** *(Enrichment)* - Returns the details for an issue.
* **Issues Jira Daemon** *(Daemon)* - Daemon to pull Jira issues.
* **List Issue Types** *(Enrichment)* - List issue types.
* **List Issue** Fields *(Enrichment)* - List the issue fields.
* **List Projects** *(Enrichment)* - List the current projects.
* **List Statuses** *(Enrichment)* - Returns a list of the statuses.
* **List Transitions** *(Enrichment)* - Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's .status.
* **List Users** *(Enrichment)* - Returns a list of all users
* **Search Into Issues** *(Enrichment)* - Search Jira Issues.
* **Update Issue** (*Notification*) - Update the specified issue field with the specified value.
* **Update Transition Issue** *(Notification)* - Update transition issue based on the issue's status.

## Atlassian Jira V2 configuration

Sign in to [Jira](https://id.atlassian.com) with your Atlassian account.

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-2.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-2" width="300"/>

### Create an API token

[Create an API token](https://developer.atlassian.com/cloud/commerce-it-frontoffice/overview/papi/onboarding/api-token/create/#create-a-token) from your Atlassian account:
1. Log in to https://id.atlassian.com/manage-profile/security/api-tokens.
1. Click **Create API token**.
1. From the dialog that appears, enter a memorable and concise **Label** for your token and click **Create**.
1. Click **Copy to clipboard**, then paste the token to your script, or elsewhere to save.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-3.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-3" width="300"/>

### Revoke an API token

[A revoked token](https://developer.atlassian.com/cloud/commerce-it-frontoffice/overview/papi/onboarding/api-token/delete/) no longer works and is permanently removed from your account. If you revoke an API token currently being used, you can replace it with a new token. To revoke an API token:
1. Log in to https://id.atlassian.com/manage-profile/security/api-tokens.
1. Select **Revoke** next to the API token that you want to revoke.
1. To revoke all API tokens for your account, select **Revoke all API tokens**.

## Configure Atlassian Jira V2 in Automation Service and Cloud SOAR

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
* **URL API**. Enter your Atlassian site URL. For example, `https://your-atlassian-site.atlassian.net/`. For information, see [Atlassian documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#about).

* **Username**. Enter the username (email address) of the admin user authorized to authenticate the integration.

* **API Token**. Enter the token you [created earlier](#create-an-api-token).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* **Jira Project Name (Daemon)**. Enter the Jira [project name](https://confluence.atlassian.com/adminjiraserver/defining-a-project-938847066.html).

* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationEngine/>

:::note
* Populate **Jira Project Name** when using the Issues **Jira Daemon** action.
* Populate **Cloud SOAR API URL** and **Cloud SOAR JWT (token)** when using the **Add Issue Attachment To Incident** action.
:::

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-5.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-5" width="400"/>

For information about Atlassian Jira, see [Jira documentation]( https://confluence.atlassian.com/jira). For the REST API v2, see the [REST API v2 documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/).

## Category

Ticketing System

## Change Log

* June 22, 2022 - First upload
* December 19, 2022
    + Solved an issue for which the Search Into Issues action could not work correctly searching by JQL
    + Added hint for Host
* March 27, 2023 (v2.2)
    + Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
    + Deprecated Endpoint updated
    + Changed action type from Containment to Notification
* June 27, 2023 (v2.3) - Removed leading/trailing spaces
* June 28, 2023 (v2.4) - Visibility of the Resource fields changed
* July 4, 2023 (v2.5)
    + Updated Actions:
        - Create Issue
        - Update Issue
        - Update Issue Status
* May 2, 2024 (v2.6) - A new scheduled action has been added for Jira integration to wait for/check the status update of a Jira ticket
* May 13, 2024 (v2.7) - A new JSON Custom field has been added to update the issue status Action
* May 23, 2024 (v2.8) - Updated the Add Issue Attachments To Incident action
* June 20, 2024 (v2.9) - New action: Download Attachment
* September 2, 2024 (v2.10) -  Updated the Update Issue action

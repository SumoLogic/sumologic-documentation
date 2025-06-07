---
title: Atlassian Jira Cloud
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/atlassian-jira-v2.png')} alt="Atlassian logo" width="80"/>

***Version: 1.0
Updated: March 20 , 2025***

Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.

:::note
This integration uses the [Jira REST API v3](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#about).
:::

## Actions

* **Add Comment to Issue** *(Notification)* - Add a comment to the specified issue.
* **Create Issue** (*Notification*) - Create a new issue in the specified Jira project.
* **Delete Issue** (*Containment*) - Delete the specified issue.
* **Get Issue** *(Enrichment)* - Returns the details for an issue.
* **Get Issue Comments** *(Enrichment)* - Get the comments of issue.
* **List Issue Fields** *(Enrichment)* - List the issue fields.
* **List Issue Transitions** *(Enrichment)* - Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's status.
* **List Issue Types** *(Enrichment)* - List the types of issue.
* **List Projects** *(Enrichment)* - List the current projects.
* **List Statuses** *(Enrichment)* - Returns a list of the statuses.
* **List Users** *(Enrichment)* - Returns a list of all users.
* **Search Into Issues** *(Enrichment)* - Search Jira Issues.
* **Update Issue** (*Notification*) - Update the specified issue field with the specified value.

## Atlassian Jira Cloud configuration

Sign in to [Jira](https://id.atlassian.com) with your Atlassian account.

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-2.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-2" width="300"/>

### Create an API token

Create an API token from your Atlassian account:
1. Log in to https://id.atlassian.com/manage-profile/security/api-tokens.
1. Click **Create API token**.
1. From the dialog that appears, enter a memorable and concise **Label** for your token and click **Create**.
1. Click **Copy to clipboard**, then paste the token to your script, or elsewhere to save.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-3.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-3" width="300"/>

### Revoke an API token

A revoked token no longer works and is permanently removed from your account. If you revoke an API token currently being used, you can replace it with a new token. To revoke an API token:
1. Log in to https://id.atlassian.com/manage-profile/security/api-tokens.
1. Select **Revoke** next to the API token that you want to revoke.
1. To revoke all API tokens for your account, select **Revoke all API tokens**.

## Configure Atlassian Jira Cloud in Automation Service and Cloud SOAR

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
* **URL API**. Enter your Atlassian site URL. For example, `https://your-atlassian-site.atlassian.net/`. For information, see [Atlassian documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#about).

* **Username**. Enter the username (email address) of the admin user authorized to authenticate the integration.

* **API Token**. Enter the token you [created earlier](#create-an-api-token).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-5.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-8" width="400"/>

For information about Atlassian Jira Cloud, see [Jira Cloud documentation](https://support.atlassian.com/jira-software-cloud/resources/). For the REST API v3, see the [REST API v3 documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/).

## Category

Ticketing System

## Change Log

* March 20, 2025 - First upload

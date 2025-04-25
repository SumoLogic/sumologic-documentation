---
title: Atlassian Jira Cloud
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/atlassian-jira-v2.png')} alt="atlassian-jira-v2" width="80"/>

***Version: 1.0  
Updated: March 20 , 2025***

Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.

:::note
This integration uses the [Jira REST API v3](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#version).
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

## Create an API token

Create an API token from your Atlassian account:
1. Log in to https://id.atlassian.com/manage-profile/security/api-tokens.
1. Click **Create API token**.
1. From the dialog that appears, enter a memorable and concise **Label** for your token and click **Create**.
1. Click **Copy to clipboard**, then paste the token to your script, or elsewhere to save.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-3.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-3" width="300"/>

## Revoke an API token

A revoked token no longer works and is permanently removed from your account. If you revoke an API token currently being used, you can replace it with a new token. To revoke an API token:
1. Log in to https://id.atlassian.com/manage-profile/security/api-tokens.
1. Select **Revoke** next to the API token that you want to revoke.
1. To revoke all API tokens for your account, select **Revoke all API tokens**.

## Configure Atlassian Jira Cloud in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add a new resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-4.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-4" width="100"/>
1. Label and populate all the required fields (\*).
    1. **Label**. Add a name for the resource.
    1. **URL API**. Enter your Atlassian site URL. For example, `https://your-atlassian-site.atlassian.net/`.
    1. **Username**. Enter your email address.
    1. **API Token**. Insert the previously copied token.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-8.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-8" width="400"/>
1. Click **SAVE**.
1. To make sure the resource is working, hover over the resource and then click the **TEST**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-7.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-7" width="150"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-6.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-6" width="250"/>

## Category

Ticketing System

## Change Log

* March 20, 2025 - First upload

---
title: Atlassian Jira V2
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/atlassian-jira-v2.png')} alt="atlassian-jira-v2" width="80"/>

***Version: 2.9  
Updated: June 21, 2024***

Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.

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

1. Sign in to Jira with your Atlassian account.
1. On the left menu, search for Security and in API token click Create and manage API tokens.
1. Create your API token with your label.
1. Make sure you copy your new API token. You won’t be able to see this token again.

## Atlassian Jira V2 in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-3.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-3" width="400"/>
1. Label and Populate all the required fields (\*).
    * **URL API**. https://your-atlassian-site.atlassian.net/
    * **Username**. Your email address.
    * **API Token**. Insert the previously copied token.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-4.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-4" width="400"/>
1. Optional fields in the resource are used for actions.
    * Populate Jira Project Name when using 'Issues Jira Daemon' action.
    * Populate Cloud SOAR URL and Cloud SOAR JWT (token) when using '**Add Issue Attachment To Incident**' action.
1. Click **SAVE**.
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-5.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-5" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-6.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-6" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/atlassian-jira-v2-7.png')} style={{border:'1px solid gray'}} alt="atlassian-jira-v2-7" width="400"/>

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

---
title: Gmail Multiple Mailbox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.1  
Updated: Aug 18, 2023***

Interact with multiple Gmail mailboxes.

## Actions

* **Add Filter** (*Enrichment*) - Add a new filter.
* **Get Filters** (*Enrichment*) - Get all filters.
* **Get Mails** (*Enrichment*) - Get a specific email message by message ID.
* **Get Role Assignments** (*Enrichment*) - Get all role assignments.
* **Get Threads** (*Enrichment*) - Get all threads.
* **Get User** (*Enrichment*) - Get information on a specific user.
* **Get Labels** (*Enrichment*) - Get all labels.
* **Get Roles** (*Enrichment*) - Get all roles.
* **List Users** (*Enrichment*) - Get All users.
* **Search Into All Mailboxes** (*Enrichment*) - Search into all mailboxes.
* **Search Into Mailboxes** (*Enrichment*) - Search into a specific mailbox.
* **Get Attachments** (*Enrichment*) - Get attachments from a specific email.
* **Delete Mails** *(Containment)* - Delete a specific email message by message ID.
* **Delete Role Assignment** *(Containment)* - Delete all role assignments for a specific role ID.
* **Delete Filter** *(Containment)* - Delete a specific filter.
* **Move Mails** *(Containment)* - Move emails.

## Gmail Multiple Mailbox configuration

1) Create/view a Project at [Developers console](https://console.developers.google.com/).
2) Access your [Google Service Account](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts%C2%A0).
3) In the IAM & admin section select Service accounts.
4) In the Service accounts section, click Create Service Account
5) During the service account creations, you will see the Create key, In the Create key section, click CREATE KEY.
6) Select Key type JSON and click CREATE.
7) A JSON is generated and automatically downloads.
8) From Service accounts page you have to copy your Client ID, it will need for Domain-wide Delegation
9) From the Service account details page you must Enable the G Suite Domain-wide Delegation.
10) At this link [http://admin.google.com/ac/owl/domainwidedelegation](http://admin.google.com/ac/owl/domainwidedelegation), you have to add the following Scopes:
    * [*https://mail.google.com/*](https://mail.google.com/)
    * [*https://www.googleapis.com/auth/gmail.settings.basic*](https://www.googleapis.com/auth/gmail.settings.basic)
    * [*https://www.googleapis.com/auth/admin.directory.user.readonly*](https://www.googleapis.com/auth/admin.directory.user.readonly)
    * [*https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly*](https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly)
    * [*https://www.googleapis.com/auth/admin.directory.rolemanagement*](https://www.googleapis.com/auth/admin.directory.rolemanagement)
11) In the last stage, you have to activate the API at this links*
    * [*https://console.developers.google.com/apis/library/admin.googleapis.com*](https://console.developers.google.com/apis/library/admin.googleapis.com)
12) You have also to Enable the Gmail API
    * [https://console.developers.google.com/apis/api/gmail.googleapis.com/overview](https://console.developers.google.com/apis/api/gmail.googleapis.com/overview)

If the API has been recently enabled, wait a few minutes for the action to propagate to the systems and retry.

## Configure Gmail Multiple Mailbox in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* June 19, 2020 - First upload
* August 18, 2023 (v1.1) - Integration refactored

---
title: Microsoft EWS Extension
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-ews-extension.png')} alt="microsoft-ews-extension" width="100"/>

***Version: 1.3  
Updated: Oct 06, 2023***

Perform actions on Microsoft EWS mailboxes, accounts, and security settings.

## Actions

* **Message Trace** (*Enrichment*) - Trace an email message.
* **Get Client Access** (*Enrichment*) - Gather mailbox application access information.
* **Update Client Access** (*Containment*) - Adjust mailbox application access.
* **Change Mailbox Status** (*Containment*) - Enable/disable mailbox status.
* **Block IP** (*Containment*) - Block a sender IP.
* **Block Sender** (*Containment*) - Block a sender email address.
* **Unblock IP** (*Containment*) - Unblock a sender IP.
* **Unblock Sender** (*Containment*) - Unblock a sender email address.
* **List Quarantine Emails** (*Enrichment*) - List quarantined mails.
* **Remove Email From Quarantine** (*Containment*) - Remove emails from quarantine.
* **Release Email From Quarantine** (*Containment*) - Release emails from quarantine.
* **Get Mailbox** (*Enrichment*) - Fetch a specific domain or specific user mailbox.
* **Get Mailbox Folder** (*Enrichment*) - Fetch a specific folder for mailbox.
* **List Spam Filter Policies** (*Enrichment*) - Sender allow list and Sender block list.
* **List Connection Filter Policies** (*Enrichment*) - Listing of Allow IP and Block IP.
* **List Malware Filter Policies** (*Enrichment*) - List the policies for filtering malwares.
* **List Spam Filter Rule** (*Enrichment*) - List the Rules for filtering Spam.
* **Delete User** (*Containment*) - Delete the mailbox and the associated user account.
* **Add New User** (*Containment*) - Create a mailbox and user account at the same time.
* **List Users** (*Enrichment*) - List existing user objects in your organization. This action returns all objects that have user accounts (for example, user mailboxes, mail users, and user accounts).
* **Remove Member From Distribution Group** (*Containment*) - Remove a single member from distribution groups or mail-enabled security groups.
* **Add Member To Distribution Group** (*Containment*) - Add a single recipient to distribution groups and mail-enabled security groups.
* **List Distribution Group** (*Enrichment*) - List existing distribution groups or mail-enabled security groups.
* **Get Distribution Group Members** (*Enrichment*) - Get the members of distribution groups and mail-enabled security groups.

## Configure Microsoft EWS Extension in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-ews-extension-configuration.png')} style={{border:'1px solid gray'}} alt="Microsoft EWS Extension configuration" width="400"/>

For information about Microsoft EWS, see [Microsoft Exchange Web Services documentation](https://learn.microsoft.com/en-us/exchange/client-developer/exchange-web-services/how-to-authenticate-an-ews-application-by-using-oauth).

## Change Log

* April 12, 2019 - First upload
* September 4, 2019 - New actions added
* September 24, 2019 - Additional optional parameters added to Update Client Access action
* March 10, 2022 - Logo
* October 17, 2022 (v1.1) - New Actions:
	+ Delete User
	+ Add New User
	+ List Users
	+ Remove Member From Distribution Group
	+ Add Member To Distribution Group
	+ List Distribution Group
	+ Get Distribution Group Members
* July 19, 2023 (v1.2) - Removed leading/trailing spaces
* October 6, 2023 (v1.3) - Integration Updated

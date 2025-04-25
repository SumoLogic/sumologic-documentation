---
title: Libraesva Email Security V4
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/libraesva-email-security-v4.png')} alt="libraesva-email-security-v4" width="100"/>

***Version: 4.1  
Updated: Jul 11, 2023***

Libraesva Email Security V4 provides security, continuity, and compliance capabilities that include the Email Security Gateway, the Email Load Balancer and the Email Archiver.

## Actions

* **Get Black List** (*Enrichment*) - Return a list of blacklist for a mailbox.
* **Get Mail Log** (*Enrichment*) - View the emails of a user for a given day (ISO notation Y / m / d or Ymd).
* **Get Spam Log** (*Enrichment*) - Display a user’s email for a given day (ISO notation Y / m / d or Ymd).
* **Get Valid Recipients** (*Enrichment*) - Get All Address in Valid Recipient.
* **Get Recipients Exist** (*Enrichment*) - Check if an address belongs to a Valid Recipient.
* **Get User List** (*Enrichment*) - Show the list of users with attributes.
* **Get White List** (*Enrichment*) - Return the list of whitelisted for a mailbox, code 802 if the list is empty.

## Category

Email Security

## Configure Libraesva Email Security in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* May 11, 2021 - First upload
* September 12, 2022 - Changed integration name and logo
* July 11, 2023 (v4.1) - Updated the integration with Environmental Variables

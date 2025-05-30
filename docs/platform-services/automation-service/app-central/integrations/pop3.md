---
title: POP3
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/pop3.png')} alt="pop3" width="80"/>

***Version: 1.2  
Updated: Oct 27, 2023***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Allows you to connect your mailbox with Cloud SOAR and receive emails via POP3 protocol.

## Actions

* **Incoming Mail Daemon POP3** *(Daemon)* - Automatically get emails using POP3.

## Configure POP3 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/pop3-configuration.png')} style={{border:'1px solid gray'}} alt="POP3 configuration" width="400"/>

## Change Log

* August 19, 2021 - First upload
* October 27, 2023 (v1.2)
	+ Updated with new Cloud SOAR API
	+ Updated the integration with Environmental Variables

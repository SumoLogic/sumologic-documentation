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
* **POP Server**. Enter your [POP3 server address](https://www.wikihow.com/Find-Incoming-Mail-Server), for example, `pop.gmail.com`.

* **Port**. Enter your [POP3 port](https://www.wikihow.com/Find-Incoming-Mail-Server), for example, `995`.

* **Username**. Enter the username of a POP3 admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/pop3-configuration.png')} style={{border:'1px solid gray'}} alt="POP3 configuration" width="400"/>

## Change Log

* August 19, 2021 - First upload
* October 27, 2023 (v1.2)
	+ Updated with new Cloud SOAR API
	+ Updated the integration with Environmental Variables

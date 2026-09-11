---
title: ESMTP
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/esmtp.png')} alt="esmtp" width="100"/>

***Version: 1.2  
Updated: April 29, 2026***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Allows you to connect your mailbox with Cloud SOAR and send emails via ESMTP.

## Actions

* **Send Email** (*Notification*) - Send an email.

## Configure ESMTP in Cloud SOAR

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
* **SMTP Server**. Enter your SMTP server name.

* **Port**. Enter your SMTP port.

* **Email account**. Enter the email account to use for providing authentication for the integration.

* **Password**. Enter the password for the email account.
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/esmtp-configuration.png')} style={{border:'1px solid gray'}} alt="EMSTP configuration" width="400"/>

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.2 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.1 | October 27, 2023 | <ul><li>Updated to use the new Cloud SOAR API.</li><li>Updated the integration with Environmental Variables.</li></ul> |
| v1.0 | April 4, 2022 | Updated the logo in the ESMTP integration. |
| v1.0 | January 29, 2021 | Initial release of the ESMTP integration. |

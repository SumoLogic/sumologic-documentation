---
title: SMTP V3
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/smtp-v3.png')} alt="smtp-v3" width="100"/>

***Version: 3.2  
Updated: Mar 18, 2024***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Allows you to connect your mailbox with Cloud SOAR and send emails via SMTP protocol.

## Actions

* **Send Email** (*Notification*) - Send an email.

## Guidelines for composing the email body in the "Send Email" action

* **Raw Text Message**. When sending a plain text message in the email body, it's important to avoid clicking on the text field after you've written your message. If you do click on the text field, the formatting of your text may become distorted or "munged" together. To ensure your text retains its original formatting when delivered in the email, avoid interacting with the text field after composing your message.

* **HTML Template**. For emails using an HTML template, ensure you have a properly structured HTML template. Whether you click on the text field or not after writing the message, the email will generally display correctly with proper formatting as expected.

However, for optimal results with HTML templates, we recommend clicking on the text field after writing your message. This action helps ensure that the HTML content is recognized and formatted correctly, giving you the desired outcome in the final email.

## Summary

* **Raw Text Message**. Avoid clicking on the text field after writing to prevent formatting issues.
* **HTML Template**. Clicking on the text field after writing is recommended for the best formatting, though your email should still display correctly without this step.

## Category

Email Gateway

## Configure SMTP V3 in Automation Service and Cloud SOAR

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
* **Email Account**. Enter an SMTP email account address.

* **SMTP Server**. Enter your SMTP server, for example, `smtp.office365.com`.

* **Port**. Enter your SMTP port, for example, `587`.

* <IntegrationCertificate/>
* **Connection Security**. Select the security method for your connection:
   * **None**
   * **STARTTLS**
   * **SSL/TLS**

* **Authentication Method**. Select the authentication method:
   * **None**
   * **Plain password**
   * **Encrypted password**

* **Username**. Enter the username for an SMTP admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/smtp-v3-configuration.png')} style={{border:'1px solid gray'}} alt="SMTP V3 configuration" width="400"/>

## Change Log

* June 20, 2022 - First upload
* October 6, 2023 (v3.1) - Integration Updated
* March 18, 2024 (v3.2) - Send Email action updated

---
title: Dropbox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/dropbox.png')} alt="dropbox" width="100"/>

***Version: 1.0  
Updated: Jan 30, 2023***

**Dropbox** is used for storing, sharing and access files across devices.

## Actions

* **Upload File** (Containment) - Uploads file to Dropbox.
* **Delete File Or Folder** (*Containment*) - Deletes file or folder specified by the path.
* **List Folder** (*Enrichment*) - List content of a folder specified by the path.

## Dropbox configuration

Follow the [link](https://www.dropbox.com/developers/reference/getting-started#app%20console) and create a Dropbox app with full Dropbox access. The Permissions tab allows you to enable and disable specific scopes for your app. Next, generate access token and copy the token.

## Configure Dropbox in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your Dropbox API URL, for example, `https://api.dropboxapi.com`

* **Token**. Enter a [Dropbox token](https://www.dropbox.com/developers/documentation/http/documentation#authorization).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/dropbox-configuration.png')} style={{border:'1px solid gray'}} alt="Dropbox configuration" width="400"/>

For information about Dropbox, see [Dropbox documentation](https://www.dropbox.com/developers/documentation).

## Change Log

* January 30, 2023 - First upload

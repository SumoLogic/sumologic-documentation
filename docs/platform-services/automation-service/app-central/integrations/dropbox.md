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

<IntegrationsAuth/>

   * **API URL**. 'https://api.dropboxapi.com'.
   * **Token**. Insert copied token.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-4.png')} style={{border:'1px solid gray'}} alt="dropbox" width="400"/>

For information about Dropbox, see [Dropbox documentation](https://www.dropbox.com/developers/documentation).

## Change Log

* January 30, 2023 - First upload

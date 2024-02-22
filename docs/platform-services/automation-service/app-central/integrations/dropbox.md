---
title: Dropbox
description: ''
tags: []
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

## Dropbox in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-1.png')} style={{border:'1px solid gray'}} alt="dropbox" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-2.png')} style={{border:'1px solid gray'}} alt="dropbox" width="400"/>
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-3.png')} style={{border:'1px solid gray'}} alt="dropbox" width="400"/>
1. Populate all the required fields (\*).
   * **API URL**. 'https://api.dropboxapi.com'.
   * **Token**. Insert copied token.
1. Click **Save**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-4.png')} style={{border:'1px solid gray'}} alt="dropbox" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-5.png')} style={{border:'1px solid gray'}} alt="dropbox" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-6.png')} style={{border:'1px solid gray'}} alt="dropbox" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-7.png')} style={{border:'1px solid gray'}} alt="dropbox" width="400"/>

## Change Log

* January 30, 2023 - First upload

---
title: Dropbox
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/dropbox.png)

Version: 1.0  
Updated: Jan 30, 2023

**Dropbox** is used for storing, sharing and access files across devices.

## Actions

* **Upload File** (Containment) - Uploads file to Dropbox
* **Delete File Or Folder** (*Containment*) - Deletes file or folder specified by the path.
* **List Folder** (*Enrichment*) - List content of a folder specified by the path.

## Dropbox Configuration

Follow the link <https://www.dropbox.com/developers/reference/getting-started#app%20console> and create a Dropbox app with full Dropbox access. The Permissions tab allows you to enable and disable specific scopes for your app. Next, generate access token and copy the token.

## Dropbox in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-2.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-3.png)

Populate all the required fields (\*)

* API URL: https://api.dropboxapi.com
* Token: Insert copied token

Click Save.

![](/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-5.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/dropbox/dropbox-7.png)

## Change Log

* January 30, 2023 - First upload

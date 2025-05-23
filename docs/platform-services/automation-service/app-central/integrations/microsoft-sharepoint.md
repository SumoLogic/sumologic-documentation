---
title: Microsoft Sharepoint
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-sharepoint.png')} alt="microsoft-sharepoint" width="100"/>

***Version: 1.5  
Updated: Sep 19, 2023***

Utilize Microsoft Sharepoint lists, files, and folders during incident investigations.

## Actions

* **Get List** (*Enrichment*) - Gather a specified list from Sharepoint.
* **Get Lists** (*Enrichment*) - Gather all lists from Sharepoint.
* **Get List Item Files** (*Enrichment*) - Gather all files for a specific item.
* **Get Files** (*Enrichment*) - Gather all files from Sharepoint.
* **Get Folders** (*Enrichment*) - Gather all folders from Sharepoint.
* **Get List Item File** (*Enrichment*) - Gather a specific file from an item.
* **Get File** (*Enrichment*) - Gather a specific file from Sharepoint.
* **Get List Fields** (*Enrichment*) - Gather all list fields from Sharepoint.
* **Create List** (*Notification*) - Create a new list.
* **Add File** (*Notification*) - Add a new file to Sharepoint.
* **Add List Item** (*Notification*) - Add a new list item.
* **Add List Item File** (*Notification*) - Add a new file to an existing list item.

## Configure Microsoft Sharepoint in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-sharepoint-configuration.png')} style={{border:'1px solid gray'}} alt="Microsoft Sharepoint configuration" width="400"/>

For information about Microsoft SharePoint, see [SharePoint documentation](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/sharepoint-admin-apis-authentication-and-authorization).

## Change Log

* August 14, 2019 - First upload
* March 10, 2022 - Logo
* August 17, 2023 (v1.3) - Updated the integration with Environmental Variables
* September 4, 2023 (v1.4) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v1.5) - Versioning

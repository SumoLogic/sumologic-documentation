---
title: Microsoft SharePoint
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-sharepoint.png')} alt="microsoft-sharepoint" width="100"/>

***Version: 1.5  
Updated: Sep 19, 2023***

Utilize Microsoft SharePoint lists, files, and folders during incident investigations.

## Actions

* **Get List** (*Enrichment*) - Gather a specified list from SharePoint.
* **Get Lists** (*Enrichment*) - Gather all lists from SharePoint.
* **Get List Item Files** (*Enrichment*) - Gather all files for a specific item.
* **Get Files** (*Enrichment*) - Gather all files from SharePoint.
* **Get Folders** (*Enrichment*) - Gather all folders from SharePoint.
* **Get List Item File** (*Enrichment*) - Gather a specific file from an item.
* **Get File** (*Enrichment*) - Gather a specific file from SharePoint.
* **Get List Fields** (*Enrichment*) - Gather all list fields from SharePoint.
* **Create List** (*Notification*) - Create a new list.
* **Add File** (*Notification*) - Add a new file to SharePoint.
* **Add List Item** (*Notification*) - Add a new list item.
* **Add List Item File** (*Notification*) - Add a new file to an existing list item.

## Configure Microsoft SharePoint in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter the SharePoint API URL, for example, `https://example.sharepoint.com`

* **Site**. Enter your [SharePoint site](https://learn.microsoft.com/en-us/sharepoint/manage-site-creation).

* **Username**. Enter the username of a SharePoint admin user authorized to authenticate the integration.

* **Password**. Enter the admin user password.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-sharepoint-configuration.png')} style={{border:'1px solid gray'}} alt="Microsoft SharePoint configuration" width="400"/>

For information about Microsoft SharePoint, see [SharePoint documentation](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/sharepoint-admin-apis-authentication-and-authorization).

## Change Log

* August 14, 2019 - First upload
* March 10, 2022 - Logo
* August 17, 2023 (v1.3) - Updated the integration with Environmental Variables
* September 4, 2023 (v1.4) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v1.5) - Versioning

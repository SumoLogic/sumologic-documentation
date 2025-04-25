---
title: Microsoft OneDrive
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-onedrive.png')} alt="microsoft-onedrive" width="100"/>

***Version: 1.6  
Updated: April 25, 2025***

Utilize and manipulate files for incident investigation using OneDrive.

## Actions

* **List Files** (*Enrichment*) - List all available files in OneDrive.
* **List File Changes** (*Enrichment*) - List file changes in OneDrive.
* **Download File** (*Enrichment*) - Download a file from OneDrive.
* **Delete File** (*Containment*) - Delete a file from OneDrive.
* **Upload File** (*Containment*) - Upload a file to OneDrive.

## Configure Microsoft OneDrive in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* August 5, 2019 - First upload
* March 10, 2022 - Logo
* August 17, 2023 (v1.2) - Updated the integration with Environmental Variables
* September 4, 2023 (v1.3) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v1.4) - Versioning
* July 02, 2024 (v1.5)
    - Updated ***Upload File*** action with the new Cloud SOAR API; results can now be saved as incident attachments and artifacts.
    - Added a new field to the Integration resource named ***Authentication Grant Type***. You can select a value based on the permissions added to your app:
      - Password (Delegated Context) 
      - Client Credentials (Application Context)
* April 25, 2025 (v1.6) - Changed required=False for username and password parsers in Integration file.
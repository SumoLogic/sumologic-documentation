---
title: Duo
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/duo.png')} alt="duo" width="70"/>

***Version: 1.5  
Updated: Sep 19, 2023***

Duo puts your organization on the fast-track to zero trust by securing the modern workforce. The simple, all-in-one platform lets you verify user identities, assess and act on the health of devices, set adaptive access policies, and protect users' productivity with modern remote access and SSO capabilities.

## Actions

* **Associate Device With User** (*Containment*) - Associates a device with a user.
* **Disassociate Device From User** (*Containment*) - Dissociates a device from a user.
* **Get Authentication Log** (*Enrichment*) - Tracking of the authentication.
* **Get Devices** (*Enrichment*) - Get the devices.
* **Get Devices By User** (*Enrichment*) - Get devices by specific user.
* **Get Users** (*Enrichment*) - Get users.

## Duo configuration

Follow this [link](https://duo.com/docs/adminapi) for configuration purposes:<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/duo/duo-1.png')} style={{border:'1px solid gray'}} alt="downdetector" width="700"/>

## Configure Duo in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Duo, see [Duo documentation](https://duo.com/docs).

## Change Log

* February 16, 2021 - First upload
* June 23, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 21, 2023 (v1.3) - Integration refactored
* September 4, 2023 (v1.4) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v1.5) - Versioning

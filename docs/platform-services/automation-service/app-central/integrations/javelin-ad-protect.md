---
title: Javelin AD Protect
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/javelin-ad-protect.png')} alt="javelin-ad-protect" width="100"/>

***Version: 1.2  
Updated: Nov 10, 2023***

Symantec Javelin AD Protect provide protection for Microsoft Active Directory from malicious use by attackers. 

## Actions

* **Get Report** *(Enrichment)* - Get detailed alert information.

## Configure Javelin AD Protect in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server IP**. Enter the static IP address of your Javelin AD Protect server.

* **Username**. Enter the username of a Javelin AD Protect admin user authorized to provide authentication for the integration. The username and password required to authenticate the underlying SMB connection with the remote server.

* **Password**. Enter the password for the admin user. 

* **Server Name**. Enter the NetBIOS machine name of the remote server. On Windows, you can find out the machine name by right-clicking on the "My Computer" and selecting "Properties". This parameter must be the same as what has been configured on the remote server, or else the connection will be rejected.

* **Share Directory**. Enter the shared folder path.

* **Client Machine**. Enter the local NetBIOS machine name that will identify where this connection is originating from. You can freely choose a name as long as it contains a maximum of 15 alphanumeric characters.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/javelin-configuration.png')} style={{border:'1px solid gray'}} alt="Javelin AD configuration" width="400"/>

For information about Symantec Endpoint Threat Defense for Active Directory (formerly Javelin AD Protect), see [Endpoint Threat Defense for Active Directory documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/threat-defense-for-active-directory/3-5/TDAD-archive.html).

## Change Log

* November 26, 2018 - First upload
* November 10, 2023(v1.2)
	+ Updated the integration with Environmental Variables
	+ Improved error handling
	+ Updated Integration Resource Fields

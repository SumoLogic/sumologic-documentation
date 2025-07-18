---
title: Active Directory
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/active-directory.png')} alt="active-directory" width="100"/>

**Version: 1.3  
Updated: Dec 19, 2023**

Utilize user, group, and system information from Active Directory.

## Actions

* **System Attributes** (*Enrichment*) - Gather system attributes.
* **User Attributes** (*Enrichment*) - Gather user attributes.
* **Group Attributes** (*Enrichment*) - Gather group attributes.
* **Users Groups** (*Enrichment*) - Gather user's groups.
* **Create User** (*Containment) - Create a new user.
* **Reset Password** (*Containment*) - Reset a user's password.
* **Set Password** (*Containment*) - Set a new password.
* **Set System Attributes** (*Containment*) - Set a system's attribute.
* **Set User Attributes** (*Containment)*- Set a user's attributes.
* **Change System OU** (*Containment*) - Change a system's organizational unit (OU).
* **Enable User** (*Containment*) - Enable a user account.
* **Disable User** (*Containment*) - Disable a user's account.
* **Remove Users From Groups** (*Containment*) - Remove users from AD group.
* **Get Groups Members** (*Containment*) - retrieve users from AD group.
* **Add Users To Groups** (*Containment*) - Add a user to a group.
* **User Attributes V2** *(Enrichment)* - Gather user attributes v2.

## External Libraries

* [LDAP3](https://github.com/cannatag/ldap3/blob/master/LICENSE.txt)

## Configure Active Directory in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* **Host**. The hostname or IP address of the AD server.

* **Login Port**. The port used for LDAP authentication. The default is `389` for LDAP and `636` for LDAPS.

* **Login DN (Username)**. Enter the distinguished name format (for example, `CN=Administrator,CN=Users,DC=csoar,DC=com`). See the following sections for information about how to get the login DN.

* **Password**. The corresponding password for the provided username.

* **Base DN**. Enter the Base Distinguished Name. 

* **Global Catalog or DN Port**. Select the catalog or port. For global catalog, select port 3268 for LDAP or 3269 for secure LDAP.

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-configuration.png')} style={{border:'1px solid gray'}} alt="Active Directory configuration" width="400"/>

For information about Active Directory, see [Active Directory documentation](https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/active-directory-overview).

## Change Log

* December 19, 2019 - First upload
* November 9, 2020 - Added new actions
* October 27, 2021 - Added new actions
* June 07, 2022- Updated action:
	+ User Attributes V2 (updated the output)
* July 7, 2023 (v1.2)
	+ Integration renamed from Active Directory OIF to Active Directory
	+ Updated the integration with Environmental Variables
* December 19, 2023 (v1.3)
	+ Updated action: User Attributes V2
		- Now, with the User Attributes V2 Action, users can be filtered based on their distinguishedName (DN)

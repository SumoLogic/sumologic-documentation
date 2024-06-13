---
title: Active Directory V2
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/active-directory-v2.png')} alt="active-directory-v2" width="90"/>

***Version: 2.2  
Updated: Dec 19, 2023***

Utilize user, group, and system information from Active Directory.   

## Actions

* **Get System Attributes** (*Enrichment*) - Gather system attributes.
* **Get User Attributes** (*Enrichment*) - Gather user attributes.
* **Group Attributes** (*Enrichment*) - Gather group attributes.
* **List Users Groups** (*Enrichment*) - Gather user's groups.
* **Create User** (*Containment) - Create a new user.
* **Reset Password** (*Containment*) - Reset a user's password.
* **Set Password** (*Containment*) - Set a new password.
* **Set User Attributes** (*Containment*) - Set a system's attribute.
* **Set User's Attributes** (*Containment)* - Set a user's attributes.
* **Change System OU** (*Containment*) - Change a system's organizational unit (OU).
* **Enable User** (*Containment*) - Enable a user account.
* **Disable User** (*Containment*) - Disable a user's account.
* **Remove Users From Groups** (*Containment*) - Remove users from AD group.
* **Get Groups Members** (*Containment*) - Retrieve users from AD group.
* **Add Users To Groups** (*Containment*) - Add a user to a group.

## Notes

Compatibility notice:

* LDAP over TLS only work on 636, 3269 (secure) ports but STARTTLS; only work with 389, 3268 (non-secure ports).
* LDAP over TLS required to have a CA Certificate of the active directory as Base64 encoded format.

## External Libraries

* [LDAP3](https://github.com/cannatag/ldap3/blob/master/LICENSE.txt)

## Change Log

* March 25, 2021 - First upload
* March 11, 2022 - Logo
* June 21, 2023 (v2.1) - Updated the integration with Environmental Variables
* December 19, 2023 (v2.2)
	+ Updated action: User Attributes
		- Now, with the User Attributes Action, users can be filtered based on their distinguishedName (DN)

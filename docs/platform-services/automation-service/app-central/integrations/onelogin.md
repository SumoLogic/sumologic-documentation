---
title: OneLogin
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/onelogin.png')} alt="onelogin" width="100"/>

***Version: 1.4  
Updated: Mar 7, 2024***

OneLogin streamlines identity management, enabling secure and audited access to critical systems.  
This integration enables user management and secure app access with MFA and event monitoring.

## Actions

* **Create User** _(Containment)_ - Create a new user in OneLogin.
* **Delete User** _(Containment)_ - Permanently delete a user from OneLogin.
* **List Apps** _(Enrichment)_ - Get a list of all Apps in a OneLogin account.
* **List Enrolled Authentication Factors** _(Enrichment)_ - Get a list of authentication factors registered to a particular user for multifactor authentication (MFA).
* **List Events** _(Enrichment)_ - Get a list of events.
* **List Groups** _(Enrichment)_ - Get a list of groups that are available in your account.
* **List Roles** _(Enrichment)_ - Get a list of roles.
* **List Users** _(Enrichment)_ - Get a list of users in a OneLogin account.
* **Remove a Factor** _(Containment)_ - Remove an enrolled factor from a user.
* **Update User** _(Containment)_ - Update the attributes of a user in OneLogin.

## Change Log

* March 1, 2021 - First upload
* June 15, 2023 (v1.2)- Updated the integration with Environmental Variables
* March 7, 2024 (v1.4)
    * New actions:
        * List Enrolled Authentication Factors
        * Remove a Factor
        * Update User
    * Renamed action List Groups
    * Other minor improvements and fixes

---
title: OpenLDAP
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/openldap.png')} alt="openldap" width="100"/>

***Version: 1.1  
Updated: Sep 28, 2023***

OpenLDAP Software is an open-source implementation of the Lightweight Directory Access Protocol. This integration allows users to browse, and look up data that appears on an LDAP Server.

## Actions

* **Get Users Info** (*Enrichment*) - Gather users info.

## External Libraries

* [LDAP3](https://github.com/cannatag/ldap3/blob/master/LICENSE.txt)

## Configure OpenLDAP in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter your OpenLDAP host address, for example, `192.168.0.1`

* **Login Port**. Enter `636` or `389`.

* **Login DN**. Enter your login DN, for example, `cn=admin,dc=example,dc=com`

* **Password**. Enter the password for the login.

* **Base DN**. Enter your base DN.

* **Global Catalog or DN Port**. For global catalog E=enter `3268` for LDAP, or enter `3269` for secure LDAPS.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/openldap-configuration.png')} style={{border:'1px solid gray'}} alt="OpenLDAP configuration" width="400"/>

For information about OpenLDAP, see [OpenLDAP documentation](https://www.openldap.org/doc/).

## Change Log

* October 05, 2022 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables

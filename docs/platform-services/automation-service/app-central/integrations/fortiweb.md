---
title: FortiWeb
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fortiweb.png')} alt="fortiweb" width="100"/>

***Version: 1.1  
Updated: Jul 12, 2023***

List and create policies and rules with Fortinet FortiWeb.

## Actions

* **Get HTTP Service List** (*Enrichment*) - List the HTTP services.
* **Get Inline Protection Profile** (*Enrichment*) - List all inline protection profiles.
* **Get IP List** (*Enrichment*) - List all IP lists.
* **Get IP List Policy Member** (*Enrichment*) - List all members of the specified IP list policy.
* **Get IP Reputation Exception** (*Enrichment*) - List all IPs in the IP reputation exception list.
* **Get Offline Protection Profile** (*Enrichment*) - List all offline protection profiles.
* **Get Server Policy** (*Enrichment*) - List all server policies.
* **Get Server Pool** (*Enrichment*) - List all server pools.
* **Get Signature Policy** (*Enrichment*) - List all signature policies.
* **Get Trigger Policy** (*Enrichment*) - List all trigger policies.
* **Get URL Access Policy** (*Enrichment*) - List all URL access policies.
* **Get URL Access Rule** (*Enrichment*) - List all URL access rules.
* **Get Virtual Server** (*Enrichment*) - List all virtual servers.
* **Create IP List** (*Containment*) - Create a new IP list.
* **Create IP List Policy Member** (*Containment*) - Create a new IP list policy member.
* **Create IP Reputation Exception** (*Containment*) - Create a new IP reputation exception.
* **Create Offline Protection Profile** (*Containment*) - Create a new offline protection profile.
* **Create Server Policy** (*Containment*) - Create a new server policy.
* **Create URL Access Policy** (*Containment*) - Create a new URL access policy.
* **Create URL Access Rule** (*Containment*) - Create a new URL access rule.
* **Create Inline Protection Profile** (*Containment) -* Create a new inline protection profile.

## Configure FortiWeb in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter the [hostname](https://docs.fortinet.com/document/fortiweb/7.6.2/administration-guide/307213/changing-the-fortiweb-appliance-s-host-name) for your FortiWeb instance, for example, `10.200.10.104`

* **Username**. Enter the username of a FortiWeb admin user authorized to authenticate the integration. 

* **Password**. Enter the password for the admin user.

* **Protocol**. Select the protocol, `https` or `http`.

* **Port**. Enter your FortiWeb [port number](https://docs.fortinet.com/document/fortiweb/7.6.3/administration-guide/806024/appendix-a-port-numbers).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fortiweb-configuration.png')} style={{border:'1px solid gray'}} alt="FortiWeb configuration" width="400"/>

For information about FortiWeb, see [FortiWeb documentation](https://docs.fortinet.com/product/fortiweb/7.6).

## Change Log

* June 3, 2019 - First upload
* August 30, 2020 - New action added
* July 12, 2023 (v1.1) - Updated the integration with Environmental Variables

---
title: Cisco ISE
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-ise.png')} alt="cisco-ise" width="70"/>

***Version: 1.6  
Updated: Sep 19, 2023***

Utilize Cisco ISE session, policy, and security group information during an investigation.

## Actions

* **Get Sessions** (*Enrichment*) - Gather session information from Cisco ISE.
* **List Policies** (*Enrichment*) - List all available ISE policies.
* **List Security Groups** (*Enrichment*) - List all available security groups.
* **Get Policies Endpoints** (*Enrichment*) - Gather endpoint policies.
* **Apply Policy** (*Containment*) - Create a new policy.
* **Clear Policy** (*Containment*) - Remove an existing policy.
* **Get Endpoints** (*Enrichment* ) - List all available endpoints.
* **Get Endpoint Identity Groups** (*Enrichment* ) - List all available endpoint identity groups.
* **Get Internal Users** (*Enrichment* ) - List all available internal user.
* **Deployment Info** (*Enrichment* ) - To check if ISE primary node is up or not.

## Cisco ISE Configuration

Cisco ISE is configured in a way that you'll need to specify the resource together with the URL and port in the following manner: 
   * URL:port The default port used is port 9060 that will need to be enabled.
   * ERS uses HTTPS port 9060 which is by default closed. Clients trying to access this port without enabling ERS first, will face a timeout from the server. 

Therefore, the first requirement is to [enable ERS](https://www.cisco.com/c/en/us/support/docs/security/identity-services-engine/215476-configure-ise-guest-accounts-with-rest-a.html#anc6) from the ISE admin UI. 

1. Go to **Administration > Settings > ERS Settings**. 
1. Check the **Enable ERS for Read/Write** radio button as shown in the screenshot below.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco-ise/cisco-ise-1.png')} style={{border:'1px solid gray'}} alt="cisco-ise" width="800"/>
1. The following ISE Administrator Groups allow REST API access: 
   * SuperAdmin Read/Write
   * ERSAdmin Read/Write
   * ERSOperator Read Only <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco-ise/cisco-ise-2.png')} style={{border:'1px solid gray'}} alt="cisco-ise" width="800"/>
   To perform Get Sessions action, the users must be assigned to one of the following Admin Groups:   
      * Super Admin
      * System Admin
      * MnT Admin
   So you have to use both Admins Groups together to use all the actions inside CSOAR.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco-ise/cisco-ise-3.png')} style={{border:'1px solid gray'}} alt="cisco-ise" width="800"/>

## Configure Cisco ISE in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Cisco ISE, see [Cisco ISE documentation](https://www.cisco.com/c/en/us/td/docs/security/ise/end-user-documentation/Cisco_ISE_End_User_Documentation.html).
   
## Change Log

* September 3, 2019 - First upload
* January 5, 2021 - Updated actions
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 14, 2023 (v1.3) - Removed leading/trailing spaces
* August 17, 2023 (v1.4) - Updated the integration with Environmental Variables
* September 4, 2023 (v1.5) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v1.6) - Versioning

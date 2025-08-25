---
title: Cyberint
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cyberint.png')} alt="cyberint" width="90"/>

***Version: 1.1  
Updated: June 17, 2024***

Cyberint offers to proactively monitor and positively impact external risk exposure and mitigation.

## Actions

* **Close Alerts** *(Containment)* - Closes an alert by Alert ID.
* **Get Alert Details** *(Enrichment)* - Retrieves a single alert by Alert ID.
* **Search Alerts** *(Enrichment)* - Returns a list of alerts based on the search criteria.
* **Update Alerts** *(Containment)* - Updates the status of an alert by Alert ID.

## Configure Cyberint in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
*  **Instance Name Url**. Enter the domain name associated with your Cyberint instance (typically in the format `https://{instance_domain}.cyberint.io/`).

* **API key**. Enter the API key associated with your Cyberint account.

* **Company Name**. Enter the company (client) name associated with your Cyberint instance.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-3.png')} style={{border:'1px solid gray'}} alt="cyberint" width="400"/>

For information about Cyberint, see the [Cyberint website](https://cyberint.com/).

## Test actions

Before you start exploring the features of the Cyberint app, try test runs of each of the actions to learn specifics of usage. For general information about testing actions, see [Test action](/docs/platform-services/automation-service/automation-service-integrations/#test-action).

### Search Alerts
The **Search Alerts** action is designed to search for alerts using criteria (filters) such as **Severity**, **Statuses**, datetime range. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-5.png')} style={{border:'1px solid gray'}} alt="cyberint" width="400"/>

The execution result displays a table with most valuable information, but also you can switch to the JSON-output mode by clicking the `{}` button. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-6.png')} style={{border:'1px solid gray'}} alt="cyberint" width="500"/> <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-7.png')} style={{border:'1px solid gray'}} alt="cyberint" width="500"/>

### Get Alert Details
The **Get Alert Details** action is designed to search for alerts by unique **Alert Ref Id**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-8.png')} style={{border:'1px solid gray'}} alt="cyberint" width="400"/>

The execution result displays a table with most valuable information, but also you can switch to the JSON-output mode by clicking the `{}` button. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-9.png')} style={{border:'1px solid gray'}} alt="cyberint" width="500"/> <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-10.png')} style={{border:'1px solid gray'}} alt="cyberint" width="500"/>

### Update Alerts
The **Update Alerts** action is designed to update an alert by **Alert Ref Ids** array.

The alert information available for update is:

- **Status**. Available statuses:
  - Open 
  - Acknowledged <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-11.png')} style={{border:'1px solid gray'}} alt="cyberint" width="400"/>

The execution result displays a message **Alerts status updated successfully**. This result means successful result of an execution. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-12.png')} style={{border:'1px solid gray'}} alt="cyberint" width="500"/> <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-13.png')} style={{border:'1px solid gray'}} alt="cyberint" width="500"/>

### Close Alerts
The **Close Alerts** action is designed to close an alert by **Alert Ref Ids** array with providing a Closure reason and description if applicable.

The alert information available for closing is:

- **Closure reason**. Available reasons: 
  - Resolved 
  - Irrelevant 
  - False positive 
  - Irrelevant alert subtype 
  - No longer a threat 
  - Asset should not be monitored 
  - Asset belongs to my organization 
  - Asm no longer detected 
  - Asm manually closed 
  - Other
- **Closure reason description**. Can be set only if the chosen **Closure reason** is **Other**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-14.png')} style={{border:'1px solid gray'}} alt="cyberint" width="400"/>

The execution result displays a message **Alerts is closed successfully**. This result means successful result of an execution. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-15.png')} style={{border:'1px solid gray'}} alt="cyberint" width="500"/> <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberint/cyberint-16.png')} style={{border:'1px solid gray'}} alt="cyberint" width="500"/>

## Change Log

* May 16, 2024 - First upload
* June 17, 2024 - Improve documentation
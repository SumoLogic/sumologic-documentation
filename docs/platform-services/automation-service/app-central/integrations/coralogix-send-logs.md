---
title: Coralogix - Send Logs
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/coralogix-send-logs.png')} alt="coralogix-send-logs" width="100"/>

***Version: 1.2  
Updated: Mar 4, 2024***

Coralogix is rebuilding the path to observability using a real-time streaming analytics pipeline that provides monitoring, visualisation, and alerting capabilities without the burden of indexing.

## Actions

* **Send Logs** (*Containment*) - Send Logs.

## Coralogix - Send Logs configuration

Generate and then copy the API Key for sending data.

`https://<teamname>.coralogix.com/#/integration/apikey`

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-1.png')} style={{border:'1px solid gray'}} alt="coralogix-send-logs" width="800"/>

## Configure Coralogix - Send Logs in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-4.png')} style={{border:'1px solid gray'}} alt="coralogix-send-logs" width="600"/>
1. Populate all the required fields (\*) and click Save.
    * **Server URL**. Choose between the following URLs depending on the top level domain of your Coralogix account (.com, .in, etc.):
        + for .com use https://api.coralogix.com
        + for .us use https://api.coralogix.us
        + for .in use https://api.app.coralogix.in
        + for .eu2. use https://api.app.eu2.coralogix.com
        + for sg.com use https://api.app.coralogixsg.com
    * **Private Key**. Your Coralogix account private key.
    * **Application Name**. The Coralogix application name.
    * **Subsystem Name**. The Coralogix subsystem name. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-5.png')} style={{border:'1px solid gray'}} alt="coralogix-send-logs" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-6.png')} style={{border:'1px solid gray'}} alt="coralogix-send-logs" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-7.png')} style={{border:'1px solid gray'}} alt="coralogix-send-logs" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-8.png')} style={{border:'1px solid gray'}} alt="coralogix-send-logs" width="400"/>

## Change Log

* July 07, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* March 4, 2024 (v1.2) - Updated code for compatibility with Python 3.12

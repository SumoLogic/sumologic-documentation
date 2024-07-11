---
title: Coralogix - Query Logs
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/coralogix-query-logs.png')} alt="coralogix-query-logs" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Coralogix is rebuilding the path to observability using a real-time streaming analytics pipeline that provides monitoring, visualisation, and alerting capabilities without the burden of indexing.

## Actions

* **Query Logs** (*Enrichment*) - Query Logs.

## Coralogix - Send Logs configuration

Generate and then copy the API Key for sending data.

    `https://<teamname>.coralogix.com/#/integration/apikey` 

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-query-logs/coralogix-query-logs-1.png')} style={{border:'1px solid gray'}} alt="coralogix-query-logs" width="800"/>

## Coralogix - Query Logs in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-query-logs/coralogix-query-logs-4.png')} style={{border:'1px solid gray'}} alt="coralogix-query-logs" width="600"/>
1. Populate all the required fields (\*) and click **Save**.
   * **Server URL**. Choose between the following URLs depending on the top level domain of your Coralogix account (.com, .in, etc.):
	   + for .eu use https://coralogix-esapi.coralogix.com
	   + for .us use https://esapi.coralogix.us
	   + for .in use https://es-api.app.coralogix.in
	   + for .eu2. use https://es-api.eu2.coralogix.com
	   + for sg.com use https://es-api.coralogixsg.com
   * **Private Key**. Your Coralogix account private key.
   * **Port**. Port usually 9443. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-query-logs/coralogix-query-logs-5.png')} style={{border:'1px solid gray'}} alt="coralogix-query-logs" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-query-logs/coralogix-query-logs-6.png')} style={{border:'1px solid gray'}} alt="coralogix-query-logs" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-query-logs/coralogix-query-logs-7.png')} style={{border:'1px solid gray'}} alt="coralogix-query-logs" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-query-logs/coralogix-query-logs-8.png')} style={{border:'1px solid gray'}} alt="coralogix-query-logs" width="400"/>

## Change Log

* Aug 15, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables

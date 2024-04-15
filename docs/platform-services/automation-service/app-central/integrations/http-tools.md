---
title: HTTP Tools
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/http-tools.png')} alt="http-tools" width="80"/>

***Version: 1.3  
Updated: Sep 25, 2023***

Set of scripts for HTTP to sends a HTTP POST/GET Requests.

## Actions

* **HTTP POST** (*Enrichment*) - This Action sends a HTTP POST Request.
* **HTTP GET** (*Enrichment*) - This Action sends a HTTP Get Request.

## HTTP Tools in Automation Service and Cloud SOAR

1. To configure HTTP Tools in Sumo Logic Cloud SOAR, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/http-tools/http-tools-1.png')} style={{border:'1px solid gray'}} alt="http-tools" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/http-tools/http-tools-2.png')} style={{border:'1px solid gray'}} alt="http-tools" width="400"/>
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/http-tools/http-tools-3.png')} style={{border:'1px solid gray'}} alt="http-tools" width="600"/>
1. Populate all the required fields(\*) and click **Save**.
   * **Label**. Name of the resource for HTTP Tools.
   * **HTTP API URL**. The URL to send the POST/GET to.
   * **Username**. The username to use to access the URL.
   * **Password**. The password to use to access the URL.
   * **Extra Headers**. Additional HTTP headers to send with the POST/GET e.g. (key1:value1, key2:value2).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/http-tools/http-tools-4.png')} style={{border:'1px solid gray'}} alt="http-tools" width="400"/>
   
## Change Log

* February 02, 2023 - First upload
* March 20, 2023 (V1.1) - Updated Action:
	+ HTTP POST: (Added new field for From-Data to be send in the body of the Request)
* June 14, 2023 (v1.2) - Updated the integration with Environmental Variables
* September 25, 2023 (v1.3) - Updated Action: HTTP POST Action

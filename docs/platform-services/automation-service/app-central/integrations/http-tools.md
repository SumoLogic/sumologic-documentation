---
title: HTTP Tools
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/http-tools.png')} alt="http-tools" width="80"/>

***Version: 1.5  
Updated: January 09, 2024***

Set of scripts to perform simple HTTP requests.

## Actions

* **HTTP DELETE** (*Containment*) - Sends an HTTP DELETE request to delete the specified resource.
* **HTTP GET** (*Enrichment*) - Sends an HTTP Get request to retrieve data from a specified resource.
* **HTTP HEAD** (*Enrichment*) - Sends an HTTP HEAD request to retrieve data but without the response body.
* **HTTP PATCH** (*Enrichment*) - Sends an HTTP PATCH request to apply partial modifications to a resource.
* **HTTP POST** (*Enrichment*) - Sends an HTTP POST request to create a resource.
* **HTTP PUT** (*Enrichment*) - Sends an HTTP PUT request to to update a resource.

## Configure HTTP Tools in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/http-tools/http-tools-3.png')} style={{border:'1px solid gray'}} alt="http-tools" width="600"/>
1. Populate all the required fields(\*) and click **Save**.
   * **Label**. Name of the resource for HTTP Tools.
   * **HTTP API URL**. The URL to send the requests.
   * **Username**. The username to use to access the URL.
   * **Password**. The password to use to access the URL.
   * **Extra Headers**. Additional HTTP headers to send with the requests e.g. (key1:value1, key2:value2) Or JSON.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/http-tools/http-tools-4.png')} style={{border:'1px solid gray'}} alt="http-tools" width="400"/>
   
## Change Log

* February 02, 2023 - First upload
* March 20, 2023 (V1.1) - Updated Action:
	+ HTTP POST: (Added new field for From-Data to be send in the body of the Request)
* June 14, 2023 (v1.2) - Updated the integration with Environmental Variables
* September 25, 2023 (v1.3) - Updated Action: HTTP POST Action
* June 12, 2024 (v1.4) - New Actions:
    + HTTP DELETE
    + HTTP HEAD
    + HTTP PATCH
    + HTTP PUT
* January 09, 2024 (v1.5) - Updated Action: 
  * HTTP POST Action - Fix the issue with the "output.raw JSON" field.
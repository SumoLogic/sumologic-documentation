---
title: Ipstack
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ipstack.png')} alt="ipstack" width="90"/>

***Version: 1.1  
Updated: Jul 05, 2023***

Ipstack API services enable you to locate and identify website visitors at a stage before any data is entered into your system. The data received from the API can be used to enhance user experiences based on location data and assess risks and potential threats to your web application in time.

## Actions

* **Geolocate IP Address** *(Enrichment)* - Look up the data behind an IP address.

## Ipstack configuration

Visit [Ipstack](https://ipstack.com/product) and Sign Up to get an API key.

Once you're logged in you can also copy the API Key from here: [https://ipstack.com/dashboard](https://ipstack.com/dashboard) 

## Configure Ipstack in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ipstack/ipstack-3.png')} style={{border:'1px solid gray'}} alt="ipstack" width="400"/>
1. Populate all the required fields (\*) and then click **Save**.
   * **Label**. The desired name for the resource.
   * **API URL**. By default, the url is: 'http://api.ipstack.com'.
   * **API Key**. The API Access Key you copied earlier.
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ipstack/ipstack-4.png')} style={{border:'1px solid gray'}} alt="ipstack" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ipstack/ipstack-5.png')} style={{border:'1px solid gray'}} alt="ipstack" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ipstack/ipstack-6.png')} style={{border:'1px solid gray'}} alt="ipstack" width="400"/>

## Change Log

* July 12, 2022 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables

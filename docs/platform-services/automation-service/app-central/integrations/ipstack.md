---
title: IPstack
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ipstack.png')} alt="ipstack" width="90"/>

***Version: 1.1  
Updated: Jul 05, 2023***

IPstack API services enable you to locate and identify website visitors at a stage before any data is entered into your system. The data received from the API can be used to enhance user experiences based on location data and assess risks and potential threats to your web application in time.

## Actions

* **Geolocate IP Address** *(Enrichment)* - Look up the data behind an IP address.

## IPstack configuration

Visit [IPstack](https://ipstack.com/product) and Sign Up to get an API key.

Once you're logged in you can also copy the API Key from here: [https://ipstack.com/dashboard](https://ipstack.com/dashboard) 

## Configure IPstack in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The desired name for the resource.
   * **API URL**. By default, the url is: 'http://api.ipstack.com'.
   * **API Key**. The API Access Key you copied earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/ipstack-configuration.png')} style={{border:'1px solid gray'}} alt="IPstack configuration" width="400"/>

For information about IPstack, see [IPstack documentation](https://ipstack.com/documentation).

## Change Log

* July 12, 2022 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables

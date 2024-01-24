---
title: Ipstack
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/ipstack.png)

Version: 1.1  
Updated: Jul 05, 2023

Ipstack API services enable you to locate and identify website visitors at a stage before any data is entered into your system. The data received from the API can be used to enhance user experiences based on location data and assess risks and potential threats to your web application in time.

## Actions

* **Geolocate IP Address** *(Enrichment)* - Look up the data behind an IP address

## Ipstack configuration

Visit <https://ipstack.com/product> and Sign Up to get an API key.

Once you're logged in you can also copy the API Key from here: <https://ipstack.com/dashboard> 

## Ipstack in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/ipstack/ipstack-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/ipstack/ipstack-2.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/ipstack/ipstack-3.png)

Populate all the required fields (\*) and then click Save.

* Label: the desired name for the resource
* API URL: by default the url is: <http://api.ipstack.com>
* API Key: the API Access Key you copied earlier

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/ipstack/ipstack-4.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/ipstack/ipstack-5.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/ipstack/ipstack-6.png)

## Change Log

* July 12, 2022 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables

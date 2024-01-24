---
title: WhoisXML
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/whoisxml.png)

Version: 1.5  
Updated: Jul 07, 2023

WHOIS API service provides the registration details, also known as the WHOIS record data, of a domain name, an IP address, or an email address.

## Actions

* **Whois** *(Enrichment)* - Retrieve WHOIS record data
* **DNS Lookup** *(Enrichment)* - Retrieve data about specific DNS
* **Domain Reputation** *(Enrichment)* - Retrieve data about specific domain
* **List Subdomains** *(Enrichment)* - Retrieve data about child subdomain for a specific domain
* **Geolocate IP Address** *(Enrichment)* - Retrieve geolocation data for the provided IP Address

## WhoisXML in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.   


![](/img/platform-services/automation-service/app-central/integrations/whoisxml/whoisxml-1.png)

In the Automation section, on the left menu, click Integrations.   
  
![](/img/platform-services/automation-service/app-central/integrations/whoisxml/whoisxml-2.png)

After the list of the integrations appears, search/look for the integration and click on the row. The integration details will appear.Click on the "+" button to add new Resource   
 

![](/img/platform-services/automation-service/app-central/integrations/whoisxml/whoisxml-3.png)

Populate all the required fields (\*) and then click Save. 

* Label: The desired name for the resource
* URL: WhoisXML API URL
* API Key: Your WhoisXML API Key

![](/img/platform-services/automation-service/app-central/integrations/whoisxml/whoisxml-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/whoisxml/whoisxml-5.png)

Click Test Saved Settings.   
 

![](/img/platform-services/automation-service/app-central/integrations/whoisxml/whoisxml-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/whoisxml/whoisxml-7.png)

## Change Log

* November 25, 2022 - First upload
* February 9, 2023 - Added new actions:
	+ DNS Lookup
	+ Domain Reputation
	+ List Subdomains
	+ Geolocate IP Address
* February 15, 2023 - New logo
* February 28, 2023 (v1.4)
	+ Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
* July 7, 2023 (v1.5) - Removed leading/trailing spaces

---
title: Cloudflare
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/cloudflare.png)

Version: 1.1  
Updated: Jul 06, 2023

Cloudflare makes everything you connect to the Internet secure, private, fast, and reliable. With using the product you can secure your websites, APIs, and internet applications, protect corporate networks, employees, and devices.

## Actions

* **List Accounts** *(Enrichment)* - List all accounts you have ownership or verified access to
* **List Zones** *(Enrichment)* - List your zones
* **Validate Expression** *(Containment)* - Expression validation
* **Create Filter** *(Containment)* - Create new filter
* **List Filters** *(Enrichment)* - List all the filters currently defined
* **Get Filter** *(Enrichment)* - List specified filter
* **Update Filter** *(Containment)* - Update existing filter
* **Create Rule List** *(Containment)* - Create a new list
* **List Rules List** *(Enrichment)* - Get all Lists for the account
* **Create IP List Item** *(Containment)* - Append new items to the List
* **List List Items** *(Enrichment)* - Get all items in the List
* **Delete List Items** *(Containment)* - Delete one or more items in a List
* **Create Firewall Rule** *(Containment)* - Create new firewall rule
* **List Firewall Rules** *(Enrichment)* - List all the firewall rules currently defined
* **Get Firewall Rule** *(Enrichment)* - List specified firewall rule
* **Update Firewall Rule** *(Containment)* - Update existing firewall rule
* **Get Bulk Operation** *(Enrichment)* - Get the current status of an operation

## Notes

* [Rule expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/)

## Cloudflare configuration

1. Sign in in Cloudflare using your email and password.
2. Go to your profile in the left menu and select My Profile.
3. From the left menu select API Tokens.
4. Under Global API Key is your token.
5. Make sure you copy and save them.

## Cloudflare in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-2.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-3.png)

1. Populate all the required fields (\*)

1. In the API Key field, insert the previously copied key.

1. Click Save. <br/>![](/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-4.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-5.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-6.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-7.png)

## Change Log

* May 5, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables

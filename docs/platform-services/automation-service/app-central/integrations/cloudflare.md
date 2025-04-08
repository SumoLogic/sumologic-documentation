---
title: Cloudflare
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cloudflare.png')} alt="cloudflare" width="100"/>

***Version: 1.2  
Updated: Nov 05, 2024***

Cloudflare makes everything you connect to the Internet secure, private, fast, and reliable. With using the product you can secure your websites, APIs, and internet applications, protect corporate networks, employees, and devices.

## Actions

* **List Accounts** *(Enrichment)* - List all accounts you have ownership or verified access to.
* **List Zones** *(Enrichment)* - List your zones.
* **Validate Expression** *(Containment)* - Expression validation.
* **Create Filter** *(Containment)* - Create new filter.
* **List Filters** *(Enrichment)* - List all the filters currently defined.
* **Get Filter** *(Enrichment)* - List specified filter.
* **Update Filter** *(Containment)* - Update existing filter.
* **Create Rule List** *(Containment)* - Create a new list.
* **List Rules List** *(Enrichment)* - Get all Lists for the account.
* **Create IP List Item** *(Containment)* - Append new items to the List.
* **List List Items** *(Enrichment)* - Get all items in the List.
* **Delete List Items** *(Containment)* - Delete one or more items in a List.
* **Create Firewall Rule** *(Containment)* - Create new firewall rule.
* **List Firewall Rules** *(Enrichment)* - List all the firewall rules currently defined.
* **Get Firewall Rule** *(Enrichment)* - List specified firewall rule.
* **Update Firewall Rule** *(Containment)* - Update existing firewall rule.
* **Get Bulk Operation** *(Enrichment)* - Get the current status of an operation.

## Notes

* [Rule expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/)

## Cloudflare configuration for Global API Key

1. Sign in in Cloudflare using your email and password.
1. Go to your profile in the left menu and select My Profile.
1. From the left menu select API Tokens.
1. Under Global API Key is your token.
1. Make sure you copy and save them.

## Cloudflare configuration for Custom API Token

1. Sign in in Cloudflare using your email and password.
1. Go to your profile in the left menu and select My Profile.
1. From the left menu select API Tokens.
1. Click Create Token and select Create Custom Token.
1. Set Permissions: Choose the necessary permissions based on your use case. For more details, check the [Permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/#account-permissions)
1. Confirm your settings, then click Continue to summary and Create Token.
1. Copy the token securely as it will only be displayed once.


## Cloudflare in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-3.png')} style={{border:'1px solid gray'}} alt="cloudflare" width="100"/>
1. Populate all the required fields (\*).
1. Select the **Token Type** (the default is set as **global**).
1. In the **API Key** field, insert the previously copied key.
1. Click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-4.png')} style={{border:'1px solid gray'}} alt="cloudflare" width="400"/>
1. To make sure the resource is working, hover over the resource and then click **TEST** that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-5.png')} style={{border:'1px solid gray'}} alt="cloudflare" width="200"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-7.png')} style={{border:'1px solid gray'}} alt="cloudflare" width="400"/>


## Notes

* Email is needed only when using global API token. Any valid email will work with custom token.

## Change Log

* May 5, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* November 5, 2024 (v1.2) - Added Custom token auth in all actions

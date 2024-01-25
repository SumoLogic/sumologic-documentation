---
title: Jamf Protect
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/jamf-protect.png)

Version: 1.1  
Updated: Jun 15, 2023

**Jamf Protect** is a purpose-built endpoint security and mobile threat defense (MTD) for Mac and mobile devices.

## Actions

* **List Alerts** (*Enrichment*) - List alerts with possibility to filter alerts created over specified time
* **List Computers** (*Enrichment*) - Retrieve a list of all computers
* **List Plans** (*Enrichment*) - Retrieve a list of plans
* **Set Computer Plan** (*Containment*) - Set a computer plan
* **Update Alerts Status** (*Containment)* - Update alert status
* **Get Alerts** (*Daemon*) - Get new alerts. Rule should be set Process from First Item . The first time the Daemon is run it will return alerts from one day before.

## Jamf Protect Configuration

1. Login to Jamf Protect

2. Click on Administrative on the left menu.

3. Create API Client and click Save. <br/>![](/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-1.png)

4. Copy API Client Password.

5. Copy Client ID in API Client Configuration

## Jamf Protect in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-2.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-3.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-4.png)

1. Populate all the required fields (\*)
   * API URL: 'https://your-tenant.protect.jamfcloud.com'
   * Client ID: Insert copied Client ID
   * Password: Insert copied Password

1. Click Save. <br/>![](/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-5.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-6.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-7.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-8.png)

## Change Log

* February 2, 2023 - First upload
* June 15, 2023 (v1.1)- Updated the integration with Environmental Variables

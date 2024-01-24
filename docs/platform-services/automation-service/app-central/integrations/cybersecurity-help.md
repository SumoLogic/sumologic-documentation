---
title: Cybersecurity Help
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/cybersecurity-help.png)

Version: 1.1  
Updated: Jul 06, 2023

Cybersecurity Help is a global vulnerability intelligence provider.

## Actions

* **Get Subscription Info** (*Enrichment*) - Retrieve your current subscription status
* **Get Subscribed Software Status** (*Enrichment*) - Retrieve recent software subscription requests and their current status
* **List Assets** (*Enrichment*) - List your assets
* **List Subscribed Software** (*Enrichment*) - List of software that is being monitored according to your subscription settings
* **List User Tasks** (*Enrichment*) - Retrieve unprocessed tasks
* **List User Tasks Asset** (*Enrichment*) - Retrieve unprocessed tasks for a particular asset
* **List User Tasks Group** (*Enrichment*) - Retrieve unprocessed group tasks
* **Add Subscribed Software Monitoring** (*Containment*) - Configure software subscription for a particular asset
* **Mark User Task Processed** (*Containment*) - Set current task as processed
* **Mark User Task Updated** (*Containment*) - Set the current task as updated and update current software version in subscription
* **Remove Asset** (*Containment*) - Remove an asset and cancel all subscriptions connected with it
* **Remove Asset Subscribed Software** (*Containment*) - Remove subscribed software for a particular asset

## Cybersecurity Help configuration

Please log in to Cybersecurity Help to get your API Key.

Select Subscription from the menu, choose Settings and copy your Token.

![](/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-1.png)

## Cybersecurity Help in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-2.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-3.png)

After the list of the integrations appears, search for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-4.png)

Populate all the required fields (\*)

* Label: The desired name for the resource
* URL: The default Cybersecurity Help url is [https://www.cybersecurity-help.cz](https://www.cybersecurity-help.cz/)
* Token: Your Cybersecurity Help token you copied earlier from Cybersecurity Help

Click Save.

![](/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-5.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-6.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-7.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-8.png)

## Change Log

* October 26, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables

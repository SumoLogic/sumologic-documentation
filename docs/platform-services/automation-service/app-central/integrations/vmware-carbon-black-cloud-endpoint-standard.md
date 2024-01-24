---
title: VMware Carbon Black Cloud Endpoint Standard
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/vmware-carbon-black-cloud-endpoint-standard.png)

Version: 2.1  
Updated: Oct 05, 2023

VMware Carbon Black Cloud Endpoint Standard Integration allows security operators to collect information and take action on remote endpoints in real time.

## Actions

* **Ban Process Hash** (*Containment*) - Ensure a malicious process cannot be executed again across your environment
* **Get Enriched Events** (*Enrichment*) - Get the enriched events associated with an Analytics alert, which includes critical alert triage information such as the process cmdline
* **Get Policies** (*Enrichment*) - List all the available Policies
* **List Banned Hashes** (*Enrichment*) - List all the available Banned Hashes
* **Update Policy Definition** (*Containment*) - Add a process path to the "allow" rules

## VMware Carbon Black Cloud Endpoint Standard Configuration

Login into the CBC Console [https://defense.conferdeploy.net](https://defense.conferdeploy.net)

Navigate to the **Settings**  menu, and then click on  **API Access.**

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-1.png)

From the **API ACCESS** page, click on Add API Key 

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-2.png) 

Populate the name, Access Level type, and click the Save button

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-3.png)

Copy the API Credentials (API ID and API Secret Key)

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-4.png)

Also you will see the ORG KEY from **API Access,** you need to copy it.

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-5.png)

## VMware Carbon Black Cloud Enterprise EDR in Automation Service and Cloud SOAR

For configuring VMware Carbon Black Cloud Enterprise EDR integration in the Sumo Logic Cloud SOAR, login into the application, expand the configuration menu in the top right corner by hovering over the gear icon, and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-6.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-7.png)

After the list of the integrations appears, search/look for the VMware Carbon Black Cloud Enterprise EDR integration and click on it. The integration details will appear. Click on the "+" button to add a new Resource.

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-8.png)

Populate all the required fields (\*) and then click Save.

* Label: The name of the resource
* API URL: URL to the API of the VMware Carbon Black Cloud Endpoint Standard instance `https://defense.conferdeploy.net`
* Organization Key: the Organization Key you copied earlier
* API ID: The API ID that you copied earlier
* API Secret Key: The API Secret Key that you copied earlier

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-9.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-10.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-11.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-endpoint-standard/vmware-carbon-black-cloud-endpoint-standard-12.png)

## External Libraries

* [carbon-black-cloud-sdk-python](https://github.com/carbonblack/carbon-black-cloud-sdk-python/blob/develop/LICENSE)

## Change Log

* May 11, 2022 - Refactored all actions with CBC SDK
* June 8, 2022 - Updated integration doc
* October 5, 2023 (v2.1) - Updated the integration with Environmental Variables

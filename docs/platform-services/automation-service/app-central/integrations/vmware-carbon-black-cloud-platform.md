---
title: VMware Carbon Black Cloud Platform
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/vmware-carbon-black-cloud-platform.png)

Version: 2.3  
Updated: Nov 07, 2023

VMware Carbon Black Cloud Platform Integration transform your security with intelligent endpoint and workload protection that adapts to your needs, allows security operators to collect CBC Alerts and Devices information and take action on remote endpoints to Quarantine it or update the Policy of endpoints.

## Actions

* **Carbon Black Alerts Daemon** (*Daemon*) - Automatically gather alerts from Carbon Black Cloud
* **Add Alert Note** (*Notification*) - Add a note to an alert
* **Delete Endpoint File** (*Containment*) - Delete a File from a device
* **Disable Bypass** (*Containment*) - Disable Bypass on specific Endpoint
* **Dismiss Alert** (*Containment*) - Dismiss an alert in Carbon Black Cloud with comments
* **Dismiss Threat** (*Containment*) - Dismiss a Threat in Carbon Black Cloud with comments
* **Enable Bypass** (*Containment*) - Enable Bypass on specific Endpoint, it should no longer be monitored but may need to in the future
* **Execute Custom Script On Endpoint** (*Containment*) - Execute a Powershell command on a windows endpoint to gather data
* **Get CBC Alerts** (*Enrichment*) - Queries all Alerts using input search criteria and returns a list of alerts
* **Get Devices** (*Enrichment*) - Retrieve info about a device
* **Get Endpoint Vulnerabilities** (*Enrichment*) - Get the vulnerabilities (CVEs) and their risks/exploitability identified for a given endpoint
* **Get File** (*Enrichment*) - Get the full contents of a suspicious MS Office or Powershell file that is executed on an endpoint
* **Get Policies** (*Enrichment*) - Get a list of Policies
* **Get Process Details** (*Enrichment*) - Get the most up-to-date metadata of a specific process
* **Get Process Events** (*Enrichment*) - Get relevant endpoint events of a watchlist hit. This is very resource-intensive for CBC and should be used sparingly.
* **Get Registry Key** (*Enrichment*) - Identify if a specific registry key has been set
* **Get Vulnerable Endpoints** (*Enrichment*) - Given a vulnerability (CVE) identify which endpoints are vulnerable
* **Kill Process By Path** (*Containment*) - Kill a malicious process by path if it’s still running
* **Kill Process By PID** (*Containment*) - Kill a malicious process by PID if it’s still running
* **List Endpoint Directory** (*Enrichment*) - List the files, including metadata such as size and last write time directly from the endpoint
* **List Running Processes** (*Enrichment*) - Identify if the malicious process is still running
* **Pause Background Scan** (*Containment*) - If the endpoint is sensitive to high CPU, disable background scanning
* **Quarantine Device** (*Containment*) - When the endpoint is suspected to be compromised, isolate it so that the only network communication allowed is with Carbon Black Cloud.
* **Search Process** (*Enrichment*) - Find all endpoints where a certain process (by name or hash) has been executed. Find all processes by reputation
* **Start Background Scan** (*Containment*) - Start Background Scan on an endpoint
* **Unquarantine Device** (*Containment) -* Remove the quarantine on the specified Device within Carbon Black
* **Update Device Policy** (*Containment) -* Move the endpoint to a more restrictive policy

## VMware Carbon Black Cloud Platform Configuration

1. Login into the CBC Console [https://defense.conferdeploy.net](https://defense.conferdeploy.net).

1. Navigate to the **Settings** menu, and then click on **API Access**. <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-1.png)

1. From the **API ACCESS** page, click on Add API Key.  <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-2.png)

1. Populate the name, Access Level type, and click the Save button. <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-3.png)

1. Copy the API Credentials (API ID and API Secret Key). <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-4.png)

1. Also you will see the ORG KEY from **API Access**. You need to copy it. <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-5.png)

## VMware Carbon Black Cloud Platform in Automation Service and Cloud SOAR

1. For configuring VMware Carbon Black Cloud Platform integration in the Sumo Logic Cloud SOAR, login into the application, expand the configuration menu in the top right corner by hovering over the gear icon, and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-6.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-7.png)

1. After the list of the integrations appears, search/look for the VMware Carbon Black Cloud Platform integration and click on it. The integration details will appear. Click on the "+" button to add a new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-8.png)

1. Populate all the required fields (\*) and then click Save.
   * Label: The name of the resource
   * API URL: URL to the API of the VMware Carbon Black Cloud Platform instance `https://defense.conferdeploy.net`
   * Organization Key: the Organization Key you copied earlier
   * API ID / Connector ID: The API ID that you copied earlier
   * API Secret Key: The API Secret Key that you copied earlier. <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-9.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-10.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-11.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-12.png)

## External Libraries

* [carbon-black-cloud-sdk-python](https://github.com/carbonblack/carbon-black-cloud-sdk-python/blob/develop/LICENSE)

## Category

EDR

## Change Log

* April 7, 2022 - First upload
* May 11, 2022 - Refactored all actions with CBC SDK
* June 08, 2022 - Updated integration doc
* July 19, 2023 (v2.2) - Removed leading/trailing spaces
* November 7, 2023 (v2.3) - Updated integration for compatibility with new Cloud SOAR API

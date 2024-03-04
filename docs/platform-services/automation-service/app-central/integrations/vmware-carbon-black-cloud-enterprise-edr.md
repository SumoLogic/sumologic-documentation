---
title: VMware Carbon Black Cloud Enterprise EDR
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/vmware-carbon-black-cloud-enterprise-edr.png')} alt="vmware-carbon-black-cloud-endpoint-standard" width="70"/>

***Version: 2.1  
Updated: Oct 05, 2023***

VMware Carbon Black Cloud Enterprise EDR Integration Interact with watchlists, files, and processes using Carbon Black Threat Hunter.

## Actions

* **Add IoC To Watchlist Report** (*Containment*) - Add a suspicious file hash to the watchlist (and receive an alert if its ever seen again)
* **Disable Watchlist Alerts** (*Containment*) - Turn off alerting for a noisy watchlist to reduce future alert fatigue
* **Download File** (*Enrichment*) - Fetch a potentially malicious binary and send it to a sandbox for analysis
* **Get Binary Metadata** (*Enrichment*) - Get more information about possible binary impersonation.
* **Get Watchlist Report Info** (*Enrichment*) - Get details about the Watchlist
* **Ignore An IoC** (*Containment*) - Ignore a false-positive IoC so that it does not introduce future noise
* **List Watchlists** (*Enrichment*) - Get all available watchlists
* **Remove IoC From Watchlist Report** (*Containment*) - Remove IoC From Watchlist

## VMware Carbon Black Cloud Enterprise EDR configuration

1. Log in to the [CBC Console](https://defense.conferdeploy.net).
1. Navigate to the **Settings**  menu, and then click on  **API Access**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-1.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="300"/>
1. From the **API ACCESS** page, click on Add API Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-2.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="700"/>
1. Populate the name, Access Level type, and click the Save button.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-3.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="600"/>
1. Copy the API Credentials (API ID and API Secret Key). <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-4.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="400"/>
1. Also you will see the ORG KEY from **API Access,** you need to copy it. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-5.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="800"/>

## VMware Carbon Black Cloud Enterprise EDR in Automation Service and Cloud SOAR

1. For configuring VMware Carbon Black Cloud Enterprise EDR integration in the Sumo Logic Cloud SOAR, login into the application, expand the configuration menu in the top right corner by hovering over the gear icon, and click **Automation**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-6.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-7.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="400"/>
1. After the list of the integrations appears, search/look for the VMware Carbon Black Cloud Enterprise EDR integration and click on it. The integration details will appear. Click on the "+" button to add a new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-8.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="700"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**. The name of the resource.
   * **API URL**. URL to the API of the VMware Carbon Black Cloud Enterprise EDR instance `https://defense.conferdeploy.net`.
   * **Organization Key**. The Organization Key you copied earlier.
   * **API ID**. The API ID that you copied earlier.
   * **API Secret Key**. The API Secret Key that you copied earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-9.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-10.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="400"/>
1. Click **TEST SAVED SETTINGS**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-11.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-12.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="400"/>

## External Libraries

* [carbon-black-cloud-sdk-python](https://github.com/carbonblack/carbon-black-cloud-sdk-python/blob/develop/LICENSE)

## Change Log

* May 11, 2022 - Refactored all actions with CBC SDK
* June 8, 2022 - Updated Integration doc
* October 5, 2023 (v2.1) - Updated the integration with Environmental Variables

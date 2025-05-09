---
title: VMware Carbon Black Cloud Enterprise EDR
description: ''
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
1. Navigate to the **Settings**  menu, and then click on  [**API Access**](https://techdocs.broadcom.com/us/en/carbon-black/cloud/carbon-black-cloud/index/cbc-user-guide-tile/GUID-9620FAB7-FE70-45DE-9CAB-590FA358721F-en/GUID-7AA95653-EF83-4F49-B11F-F984F7D62CB8-en/GUID-F3816FB5-969F-4113-80FC-03981C65F969-en.html).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-1.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="300"/>
1. From the **API ACCESS** page, click on Add API Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-2.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="700"/>
1. Populate the name, Access Level type, and click the Save button.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-3.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="600"/>
1. Copy the API Credentials (API ID and API Secret Key). <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-4.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="400"/>
1. Also you will see the ORG KEY from **API Access,** you need to copy it. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-5.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="800"/>

## Configure VMware Carbon Black Cloud Enterprise EDR in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The name of the resource.
   * **API URL**. URL to the API of the VMware Carbon Black Cloud Enterprise EDR instance `https://defense.conferdeploy.net`.
   * **Organization Key**. The Organization Key you copied earlier.
   * **API ID**. The API ID that you copied earlier.
   * **API Secret Key**. The API Secret Key that you copied earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-enterprise-edr/vmware-carbon-black-cloud-enterprise-edr-9.png')} style={{border:'1px solid gray'}} alt="vvmware-carbon-black-cloud-enterprise-edr" width="400"/>

For information about Carbon Black Cloud, see [Carbon Black Cloud documentation](https://techdocs.broadcom.com/us/en/carbon-black/cloud.html).

## External Libraries

* [carbon-black-cloud-sdk-python](https://github.com/carbonblack/carbon-black-cloud-sdk-python/blob/develop/LICENSE)

## Change Log

* May 11, 2022 - Refactored all actions with CBC SDK
* June 8, 2022 - Updated Integration doc
* October 5, 2023 (v2.1) - Updated the integration with Environmental Variables

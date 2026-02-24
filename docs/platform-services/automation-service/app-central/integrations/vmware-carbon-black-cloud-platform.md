---
title: VMware Carbon Black Cloud Platform
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/vmware-carbon-black-cloud-platform.png')} alt="vmware-carbon-black-cloud-platform" width="60"/>

***Version: 2.4  
Updated: Mar 4, 2024***

VMware Carbon Black Cloud Platform Integration transform your security with intelligent endpoint and workload protection that adapts to your needs, allows security operators to collect CBC Alerts and Devices information and take action on remote endpoints to Quarantine it or update the Policy of endpoints.

## Actions

* **Carbon Black Alerts Daemon** (*Daemon*) - Automatically gather alerts from Carbon Black Cloud.
* **Add Alert Note** (*Notification*) - Add a note to an alert.
* **Delete Endpoint File** (*Containment*) - Delete a File from a device.
* **Disable Bypass** (*Containment*) - Disable Bypass on specific Endpoint.
* **Dismiss Alert** (*Containment*) - Dismiss an alert in Carbon Black Cloud with comments.
* **Dismiss Threat** (*Containment*) - Dismiss a Threat in Carbon Black Cloud with comments.
* **Enable Bypass** (*Containment*) - Enable Bypass on specific Endpoint, it should no longer be monitored but may need to in the future.
* **Execute Custom Script On Endpoint** (*Containment*) - Execute a PowerShell command on a windows endpoint to gather data.
* **Get CBC Alerts** (*Enrichment*) - Queries all Alerts using input search criteria and returns a list of alerts.
* **Get Devices** (*Enrichment*) - Retrieve info about a device.
* **Get Endpoint Vulnerabilities** (*Enrichment*) - Get the vulnerabilities (CVEs) and their risks/exploitability identified for a given endpoint.
* **Get File** (*Enrichment*) - Get the full contents of a suspicious MS Office or PowerShell file that is executed on an endpoint.
* **Get Policies** (*Enrichment*) - Get a list of Policies.
* **Get Process Details** (*Enrichment*) - Get the most up-to-date metadata of a specific process.
* **Get Process Events** (*Enrichment*) - Get relevant endpoint events of a watchlist hit. This is very resource-intensive for CBC and should be used sparingly.
* **Get Registry Key** (*Enrichment*) - Identify if a specific registry key has been set.
* **Get Vulnerable Endpoints** (*Enrichment*) - Given a vulnerability (CVE) identify which endpoints are vulnerable.
* **Kill Process By Path** (*Containment*) - Kill a malicious process by path if it’s still running.
* **Kill Process By PID** (*Containment*) - Kill a malicious process by PID if it’s still running.
* **List Endpoint Directory** (*Enrichment*) - List the files, including metadata such as size and last write time directly from the endpoint.
* **List Running Processes** (*Enrichment*) - Identify if the malicious process is still running.
* **Pause Background Scan** (*Containment*) - If the endpoint is sensitive to high CPU, disable background scanning.
* **Quarantine Device** (*Containment*) - When the endpoint is suspected to be compromised, isolate it so that the only network communication allowed is with Carbon Black Cloud.
* **Search Process** (*Enrichment*) - Find all endpoints where a certain process (by name or hash) has been executed. Find all processes by reputation.
* **Start Background Scan** (*Containment*) - Start Background Scan on an endpoint.
* **Unquarantine Device** (*Containment*) - Remove the quarantine on the specified Device within Carbon Black.
* **Update Device Policy** (*Containment*) - Move the endpoint to a more restrictive policy.

## VMware Carbon Black Cloud Platform configuration

1. Log in to the [CBC Console](https://defense.conferdeploy.net).
1. Navigate to the **Settings** menu, and then click on [**API Access**](https://techdocs.broadcom.com/us/en/carbon-black/cloud/carbon-black-cloud/index/cbc-user-guide-tile/GUID-9620FAB7-FE70-45DE-9CAB-590FA358721F-en/GUID-7AA95653-EF83-4F49-B11F-F984F7D62CB8-en/GUID-F3816FB5-969F-4113-80FC-03981C65F969-en.html).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-1.png')} style={{border:'1px solid gray'}} alt="vmware-carbon-black-cloud-platform" width="300"/>
1. From the **API ACCESS** page, click on Add API Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-2.png')} style={{border:'1px solid gray'}} alt="vmware-carbon-black-cloud-platform" width="700"/>
1. Populate the name, Access Level type, and click the Save button.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-3.png')} style={{border:'1px solid gray'}} alt="vmware-carbon-black-cloud-platform" width="600"/>
1. Copy the API Credentials (API ID and API Secret Key).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-4.png')} style={{border:'1px solid gray'}} alt="vmware-carbon-black-cloud-platform" width="300"/>
1. Also you will see the ORG KEY from **API Access**. You need to copy it.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vmware-carbon-black-cloud-platform/vmware-carbon-black-cloud-platform-5.png')} style={{border:'1px solid gray'}} alt="vmware-carbon-black-cloud-platform" width="600"/>

## Configure VMware Carbon Black Cloud Platform in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import SumoLogicAPIURL from '../../../../reuse/automation-service/sumo-logic-api-url.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. URL to the API of the VMware Carbon Black Cloud Platform instance `https://defense.conferdeploy.net`.

* **Organization Key**. The [organization key](https://developer.carbonblack.com/reference/carbon-black-cloud/authentication/#org-key) you [copied earlier](#vmware-carbon-black-cloud-platform-configuration).

* **API ID / Connector ID**. The [API ID](https://techdocs.broadcom.com/us/en/carbon-black/cloud/carbon-black-cloud/index/cbc-user-guide-tile/GUID-9620FAB7-FE70-45DE-9CAB-590FA358721F-en/GUID-7AA95653-EF83-4F49-B11F-F984F7D62CB8-en/GUID-F3816FB5-969F-4113-80FC-03981C65F969-en.html) that you [copied earlier](#vmware-carbon-black-cloud-platform-configuration).

* **API Secret Key**. The secret for the API ID that you [copied earlier](#vmware-carbon-black-cloud-platform-configuration).
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/vmware-carbon-black-cloud-platform-configuration.png')} style={{border:'1px solid gray'}} alt="VMware Carbon Black Cloud Platform configuration" width="400"/>

For information about Carbon Black Cloud, see [Carbon Black Cloud documentation](https://techdocs.broadcom.com/us/en/carbon-black/cloud.html).

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
* March 4, 2024 (v2.4) - Updated code for compatibility with Python 3.12

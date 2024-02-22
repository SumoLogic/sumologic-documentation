---
title: Sumo Logic
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="sumo-logic" width="100"/>

***Version: 1.20  
Updated: Nov 28, 2023***

Integration with Sumo Logic platform for logs, metrics, and monitors.

## Actions

* **Search Sumo Logic** (*Enrichment*) - Query data from Sumo Logic.
* **Search Sumo Logic Daemon** *(Daemon)* - Automatically search the Sumo Logic with given query.
* **Aggregates Sumo Logic Daemon** *(Daemon)* - Automatically pull Aggregates of Sumo Logic with given query.
* **Search Metrics** *(Enrichment)* - Query Metrics from Sumo Logic.
* **Search Output Mapping** *(Enrichment)* - Parsing the output of a **Search Sumo Logic** action.
* **Resolve Alert** *(Notification)* - Resolve Alert.

## Sumo Logic configuration

1. To configure the Sumo Logic, log in to the application, expand the user info from the bottom left menu and click **Preferences**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-1.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="300"/>
1. From the preferences screen, in the section **My Access Keys**, click on **Add Access Key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-2.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="600"/>
1. Populate the name and click **Create Key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-3.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="500"/>
1. Copy the **Access ID** and **Access Key** and store them (temporally) into a text editor.
   :::note
   They won't be available again once you close this screen.
   :::
1. Click **Done** after you copy the Access ID and Access Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-4.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="500"/>

## Sumo Logic in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-5.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-6.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="400"/>
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-7.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="400"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**. The name of the resource.
   * **Sumo Logic API URL**. URL to the API of the instance (more info on the URL here: [https://help.sumologic.com/APIs](https://help.sumologic.com/APIs)).
   * **Access ID**. The access ID that you copied earlier.
   * **Access Key**. The access key that you copied earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-8.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-9.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-10.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic/sumo-logic-11.png')} style={{border:'1px solid gray'}} alt="sumo-logic" width="400"/>

## Change Log

* April 6, 2021 - First upload
* May 3, 2022 - Update integration and add new daemon
* June 07, 2022 - Updated action:
	+ Search Sumo Logic
* July 13, 2022 - Updated action: 
	+ Search Sumo Logic (updated output and Field Last Period values)
* November 10, 2022 (v1.4)
	+ Updated action: Search Sumo Logic (Timezone issue fixed and added one more endpoint to get Aggregate/Records)
	+ New Daemon: Records Sumo Logic Daemon
* March 22, 2023 (v1.5)
	+ Updated integration: (Updated the integration Fields with Environmental Variables)
* June 28, 2023 (v1.6)
	+ Visibility of the Resource fields changed
	+ Updated Daemons:
		- Records Sumo Logic Daemon
		- Search Sumo Logic Daemon
* August 17, 2023 (v1.7)
	+ Updated Action - Search Sumo Logic (Updated Timestamp)
* September 4, 2023 (v1.8) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v1.9 - v1.12) - Versioning
* September 21, 2023 (v1.13)
	+ Integration has been renamed from "**Sumo Logic CIP**" to "**Sumo Logic**"
	+ Added Dynamic Table View for **Search Sumo Logic** Action
	+ New Actions:
		- Search Metrics
		- Search Output Mapping
		- Resolve Alert
* September 22, 2023 (v1.14) - Updated **Search Metrics** Action
* September 27, 2023 (v1.15) - Updated **Search Sumo Logic** Action (Added Limit Field)
* September 28, 2023 (v1.16) - Updated **Search Sumo Logic** Action (Updated the default value for the Limit Field)
* October 3, 2023 (v1.17) - Updated **Search Sumo Logic** Action
* October 19, 2023 (v1.18) - Updated **Search Sumo Logic** Action (Subquery can now be executed)
* October 31, 2023 (v1.19)
	+ Following Actions Updated:
		- Aggregates Sumo Logic Daemon (formerly **Records Sumo Logic Daemon**)
			* **Records Sumo Logic Daemon** Action renamed to **Aggregates Sumo Logic Daemon**
			* Subqueries can now be managed
			* **Last Result DateTime** field now accepts values as DateTime or Timestamp
		- Search Metrics
			* Added a new field called **Quantization**
		- Search Sumo Logic Daemon
			* Subqueries can now be managed
			* The **Last Result Timestamp** field now accepts values as DateTime or Timestamp
* November 28, 2023 (v1.20)
	+ Updated **Search Sumo Logic** Action (Added Table View as an output for use in notes/tasks)

---
title: Snowflake
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/snowflake.png')} alt="snowflake" width="100"/>

***Version: 1.2  
Updated: Jul 26, 2023***

Use the Snowflake integration to query and update your Snowflake database.

## Actions

* **Execute Async Query** *(Enrichment)* - Send a Query to be executed. A Query ID is returned which can be used to check the status of the query and get the results of the query.
* **Get Query Status** *(Enrichment)* - Check the status of the query.
* **Cancel Query** *(Containment)* - Cancel a query by Query ID.
* **Get Results From Query ID** *(Enrichment)* - Get the results for the given Query ID.
* **Execute Query** *(Enrichment)* - Execute a single query and return the results.
* **Execute Multiple Queries** *(Enrichment)* - Execute multiple queries. Queries should be separated by a semicolon (;).

## External libraries

* [Snowflake Connector for Python](https://pypi.org/project/snowflake-connector-python/)

## Snowflake in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snowflake/snowflake-1.png')} style={{border:'1px solid gray'}} alt="snowflake" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snowflake/snowflake-2.png')} style={{border:'1px solid gray'}} alt="snowflake" width="400"/>
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snowflake/snowflake-3.png')} style={{border:'1px solid gray'}} alt="snowflake" width="400"/>
1. Populate all the required fields (\*) and then click **SAVE**:
   * **Label**. Name of the resource.
   * **Username**. Snowflake username.
   * **Password**. Snowflake password.
   * **Account Name**. The SQL API is available at https://(account\_name).snowflakecomputing.com/, copy the account\_name.
   * **Database Name**. The name of the database to be used for the queries.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snowflake/snowflake-4.png')} style={{border:'1px solid gray'}} alt="snowflake" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snowflake/snowflake-5.png')} style={{border:'1px solid gray'}} alt="snowflake" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snowflake/snowflake-6.png')} style={{border:'1px solid gray'}} alt="snowflake" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snowflake/snowflake-7.png')} style={{border:'1px solid gray'}} alt="snowflake" width="400"/>

## Change Log

* February 14, 2022 - First upload
* June 23, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 26, 2023 (v1.2) - Integration refactored

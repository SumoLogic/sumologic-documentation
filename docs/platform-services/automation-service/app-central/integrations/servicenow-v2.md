---
title: ServiceNow V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/servicenow-v2.png')} alt="servicenow" width="100"/>

***Version: 2.6  
Updated: Jan 13, 2025***

ServiceNow V2 SaaS is for technical management support - create, update, and gather ServiceNow ticket information.

## Actions

* **Create Ticket** *(Notification)* - Inserts one record in the specified table.
* **Update Ticket** *(Notification)* - Updates the specified record with the name-value pairs included in the request body.
* **Close Ticket** *(Containment)* - Closes a ticket specified by the System ID.
* **Get Ticket Details** *(Enrichment)* - Retrieve a record from a table.
* **Search Tickets** *(Enrichment)* - Retrieve a record from a table.
* **ServiceNow Incidents Daemon** *(Daemon)* - Automatically retrieves new tickets.

## ServiceNow V2 in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).2.png')} 
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-3.png')} style={{border:'1px solid gray'}} alt="servicenow" width="400"/> 
1. Populate all the required fields (\*):
   * **URL**. ServiceNow URL in the format `https://company.service-now.com/`.
   * **Username**. Your ServiceNow username.
   * **Password**. Your ServiceNow password.
1. Click **SAVE**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-4.png')} style={{border:'1px solid gray'}} alt="servicenow" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-5.png')} style={{border:'1px solid gray'}} alt="servicenow" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-6.png')} style={{border:'1px solid gray'}} alt="servicenow" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-7.png')} style={{border:'1px solid gray'}} alt="servicenow" width="400"/> 

**ServiceNow Incidents Daemon**

When the daemon is run for first time it will return incidents in state 'new ' from last month.

**Search Tickets** 

Query used to filter the result set. 

Building the query:

Syntax: `<col_name><operator><value>`

* `<col_name>`: Name of the table column to filter against.
* `<operator>`: Supports the following values:  
   * `=:` Exactly matches `<value>`.  
   * `!=`: Does not match `<value>`.  
   * `^`: Logically AND multiple query statements.  
   * `^OR`: Logically OR multiple query statements.  
   * `LIKE`: `<col_name>` contains the specified string. Only works for `<col_name>` fields whose data type is string.  
   * `STARTSWITH`: `<col_name>` starts with the specified string. Only works for `<col_name>` fields whose data type is string.  
   * `ENDSWITH`: `<col_name>` ends with the specified string. Only works for `<col_name>` fields whose data type is string.
* `<value>`: Value to match against.

All parameters are case-sensitive. 

Queries can contain more than one entry. 

For example: `<col_name><operator><value>[<operator><col_name><operator><value>]`

For more information check the [ServiceNow API documentation](https://developer.servicenow.com/dev.do#!/reference/api/xanadu/rest/c_TableAPI#table-GET). 

**Create Ticket** 

JSON Query filed needs to be populated with JSON, field names and values of all parameters within the newly created record. 

For more info on building JSON Query check REST API Explorer. 

For example: `JSON Query = {"active":"true","assigned\_to":"966e021","number":"INC002135","state":""}`

**Update Ticket** 

JSON Query filed needs to be populated with JSON, field names and new value for each parameter to update in the specified record. 

For more info on building Json Query check REST API Explorer. 

For example: `JSON Query = {active":"false","state":"2"}`

## Category

Ticketing System

## Change Log

* September 21, 2022 - First upload
* April 5, 2023 - Action Close Ticket added.
* June 30, 2023 (v2.3) - Integration code improved.
* April 5, 2024 (v2.4) - Fixed an issue that prevents the resource testing to work correctly.
* May 31, 2024 (v2.5) - Fixed an issue in actions **Create Ticket** and **Update Ticket** in which the JSON Query field was not visible.
* Jan 13, 2025 (v2.6) - Modified hint of the **query** field as it was misleading.

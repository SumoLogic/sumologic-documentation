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

## Configure ServiceNow V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your ServiceNow URL in the format `https://company.service-now.com/`.

* **Username**. Enter the username of a ServiceNow admin user authorized to provide authentication for the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/servicenow-v2-configuration.png')} style={{border:'1px solid gray'}} alt="ServiceNow V2 configuration" width="400"/>

For information about ServiceNow, see [ServiceNow documentation](https://www.servicenow.com/docs/).

## Action details

### ServiceNow Incidents daemon

When the daemon is run for first time it will return incidents in state 'new ' from last month.

### Search tickets

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

### Create ticket

JSON Query filed needs to be populated with JSON, field names and values of all parameters within the newly created record. 

For more info on building JSON Query check REST API Explorer. 

For example: `JSON Query = {"active":"true","assigned\_to":"966e021","number":"INC002135","state":""}`

### Update ticket

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

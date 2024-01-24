---
title: ServiceNow V2
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/servicenow-v2.png)

Version: 2.3  
Updated: Jun 30, 2023

ServiceNow V2 SaaS is for technical management support - create, update and gather ServiceNow ticket information.

## Actions

* **Create Ticket** *(Notification)* - Inserts one record in the specified table
* **Update Ticket** *(Notification)* - Updates the specified record with the name-value pairs included in the request body
* **Close Ticket** *(Containment) - Closes a ticket specified by the System ID*
* **Get Ticket Details** *(Enrichment)* - Retrieve a record from a table
* **Search Tickets** *(Enrichment)* - Retrieve a record from a table
* **ServiceNow Incidents Daemon** *(Daemon)* - Automatically retrieves new tickets

## ServiceNow V2 in Automation Service and Cloud SOAR


![](/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-2.png)

After the list of the integrations appears, search for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-3.png)  
 

Populate all the required fields (\*):

* URL: ServiceNow URL in the format &lt;https://company.service-now.com/&gt;
* Username: your ServiceNow username
* Password: your ServiceNow password

Click SAVE.

![](/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-5.png)

Click TEST SAVED SETTINGS.

![](/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/servicenow-v2/servicenow-v2-7.png)  
 

**ServiceNow Incidents Daemon**

When the daemon is run for first time it will return incidents in state 'new ' from last month.

**Search Tickets** 

Query used to filter the result set. 

Building the query:

Syntax: sysparm\_query=&lt;col\_name&gt;&lt;operator&gt;&lt;value&gt;.

* &lt;col\_name&gt;: Name of the table column to filter against.
* &lt;operator&gt;: Supports the following values:  
=: Exactly matches &lt;value&gt;.  
!=: Does not match &lt;value&gt;.  
^: Logically AND multiple query statements.  
^OR: Logically OR multiple query statements.  
LIKE: &lt;col\_name&gt; contains the specified string. Only works for &lt;col\_name&gt; fields whose data type is string.  
STARTSWITH: &lt;col\_name&gt; starts with the specified string. Only works for &lt;col\_name&gt; fields whose data type is string.  
ENDSWITH: &lt;col\_name&gt; ends with the specified string. Only works for &lt;col\_name&gt; fields whose data type is string.
* &lt;value&gt;: Value to match against.

All parameters are case-sensitive. 

Queries can contain more than one entry. 

For example: sysparm\_query=&lt;col\_name&gt;&lt;operator&gt;&lt;value&gt;[&lt;operator&gt;&lt;col\_name&gt;&lt;operator&gt;&lt;value&gt;]

For more info please check the official API doc: &lt;https://developer.servicenow.com/dev.do#!/reference/api/sandiego/rest/c_TableAPI#table-GET&gt;

**Create Ticket** 

JSON Query filed needs to be populated with JSON, field names and values of all parameters within the newly created record. 

For more info on building JSON Query check REST API Explorer. 

For example: JSON Query = {"active":"true","assigned\_to":"966e021","number":"INC002135","state":""}

**Update Ticket** 

JSON Query filed needs to be populated with JSON, field names and new value for each parameter to update in the specified record. 

For more info on building Json Query check REST API Explorer. 

For example: JSON Query = {active":"false","state":"2"}

## Category

Ticketing System

## Change Log

* September 21, 2022 - First upload
* April 5, 2023 - Action Close Ticket added.
* June 30, 2023 (v2.3) - Integration code improved.

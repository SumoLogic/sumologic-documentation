---
id: search-and-monitor
title: Search and Monitor Security Data
sidebar_label: Search and Monitor Security Data
description: Learn how to search for security-related data and monitor it on an ongoing basis. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Monitoring user activity helps you understand what they are doing in your environment. By monitoring user activity, you may be able to discover and isolate potential malicious activity before it impacts your system.

## Search and monitor CloudTrail logs

A [CloudTrail](/docs/integrations/amazon-aws/cloudtrail/) log is a record in JSON format. The log contains information about requests for resources in your account, such as:

* who made the request
* the services used
* the actions performed
* and parameters for the action

You can search AWS CloudTrail logs to extract the user, event, and IP addresses as metadata. Because they're in JSON format, you'll use the [parse json](/docs/search/search-query-language/parse-operators/parse-json-formatted-logs/) operator. This way, you can use the extracted values later to monitor user activity. 

### Monitor user activity with a dashboard

We are going to create a dashboard to look at our security activity in several different ways.  In this step you will query CloudTrail logs to create a Top 10 User Activity list, turn it into a bar chart, and add it to your dashboard.  

1. From the Sumo Logic interface, click on the **+ New** button and select the **Dashboard (New)** option.<br/><img src={useBaseUrl('img/csa/create-new-dashboard.png')} alt="Create new dashboard" style={{border: '1px solid black'}} width="200"/>
1. Select a **Time Series** panel.<br/><img src={useBaseUrl('img/csa/time-series-panel.png')} alt="Time series panel" style={{border: '1px solid black'}} width="600"/>
1. Create a CloudTrail query.  
   1. Copy or type the following query to the query window. (In the query, replace `Labs/AWS/CloudTrail` with a valid source category for AWS CloudTrail logs in your environment.)
     ```
     _sourceCategory=Labs/AWS/CloudTrail
     | json field=_raw "userIdentity.userName" as actor
     | json field=_raw "eventType" as event_type
     | json field=_raw "sourceIPAddress" as src_ip
     | json field=_raw "eventName" as event_name
     | count by actor,event_type,event_name
     | top 10 actor by event_type,_count
     | transpose row actor column event_type
     ```
     <br/>Notice how this query searches AWS CloudTrail logs to extract the user, event, IP addresses, and event names as metadata using a parse json command, so you can use the extracted values to monitor user activity.
   1. In the upper right, change the time frame for the query to be for the last 24 hours.<br/><img src={useBaseUrl('img/csa/24-hours.png')} alt="Twenty-four hours" style={{border: '1px solid black'}} width="300"/>
   1. Press Enter or click the magnifying glass icon to run the search.
1. In the **Panel Settings** area, change the chart type to **Bar**.<br/><img src={useBaseUrl('img/csa/bar-chart-setting.png')} alt="Bar chart setting" style={{border: '1px solid black'}} width="800"/>
1. In the upper left corner of your bar chart, change the panel title to **Top 10 User Activity**.<br/><img src={useBaseUrl('img/csa/top-10-user-activity-panel.png')} alt="Rename dashboard panel" style={{border: '1px solid black'}} width="400"/>
1. Click the **Add to Dashboard** button in the top right corner. The dashboard displays the panel you created.<br/><img src={useBaseUrl('img/csa/example-dashboard.png')} alt="Example dashboard" style={{border: '1px solid black'}} width="800"/>

### Create dashboard template variables

You can add more flexibility to your queries and dashboard outputs by using template variables.
1. In the upper right corner of the dashboard, change the time range to 24 hours. 
1. Click on the filter icon to display the template variable bar.<br/><img src={useBaseUrl('img/csa/filter-icon.png')} alt="Filter icon" style={{border: '1px solid black'}} width="200"/>
1. In the template variable bar, select **Create a Template Variable**.<br/><img src={useBaseUrl('img/csa/create-template-variable.png')} alt="Create a template variable" style={{border: '1px solid black'}} width="800"/>
1. In this panel for the **Variable Name** enter **event_type** and for the **Variable Type**, select **Logs Search**.<br/><img src={useBaseUrl('img/csa/create-template-variable-dialog.png')} alt="Create a template variable dialog" style={{border: '1px solid black'}} width="800"/>
1. For the query paste the following. (In the query, replace `Labs/AWS/CloudTrail` with a valid source category for AWS CloudTrail logs in your environment.)
   ```
   _sourceCategory=Labs/AWS/CloudTrail
   | json field=_raw "eventType" as event_type
   | count by event_type
   | fields - _count 
   ```
1. Under the **Key** field, select **event_type**. Notice that the right side of the panel populates with the values created by the query. 
1. Make sure the **Include the option to select all values (*)** selector is active.<br/><img src={useBaseUrl('img/csa/create-variable-1.png')} alt="Query in the create template variable dialog" style={{border: '1px solid black'}} width="800"/>
1. Click the **Create Template Variable** on the lower right.  A variable selector called **event_type** is now visible on the dashboard bar.
1. Create another variable called **actor**. Use the following to create the elements that are needed for this template variable. 
   * Variable Name: actor
   * Variable Type: Logs Search
   * Query (replace `Labs/AWS/CloudTrail` with a valid source category for AWS CloudTrail logs in your environment): 
      ```
      _sourceCategory=Labs/AWS/CloudTrail
      | json field=_raw "userIdentity.sessionContext.sessionIssuer.userName" as actor
      | count by actor
      | fields - _count
      ```
   * Key: actor
   * Include the option to select all values (*): Yes
1. Your results look like something like this. <br/><img src={useBaseUrl('img/csa/create-variable-2.png')} alt="Create another template variable" style={{border: '1px solid black'}} width="800"/>
1. Click the **Create Template Variable** button.
1. In the upper left of the dashboard, rename your dashboard to **Cloud Security Dashboard**. <br/><img src={useBaseUrl('img/csa/rename-to-cloud-security-dashboard.png')} alt="Rename to Cloud Security Dashboard" style={{border: '1px solid black'}} width="400"/><br/>We now want to modify our query to take advantage of the variables we have created. This will require us to add a "where" clause and reference the parameter by its name. 
1. Click on the three vertical dots in the upper right corner of the **Top 10 User Activity** panel.
1. Select the **Edit** option so you can modify your query. 
1. We want to filter by event_type in our panel, but allow the dashboard viewer options to pick the event type. Add a new line to the query by pressing Shift + Enter and type or copy the following code:
   ```
   | where event_type matches "{{event_type}}"
   | where actor matches "{{actor}}"
   ```
 Your query should now look something like this:<br/><img src={useBaseUrl('img/csa/new-query.png')} alt="Revised query" style={{border: '1px solid black'}} width="400"/>
 1. Click the **Update Dashboard** button. <br/>You can test these changes by selecting different **event_types** and **actors** from the template fields in the dashboard bar. As you select different values you will see the dashboard panel change automatically. Select the ** * ** option as a variable to see all options.  When you are done testing, ensure both **event_type** and **actor** template variables are set to * before continuing. 

### Use geolocation data


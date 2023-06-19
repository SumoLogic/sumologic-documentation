---
id: search-and-monitor
title: Search and Monitor Security Data
sidebar_label: Search and Monitor Security Data
description: Learn how to search for security-related data and monitor it on an ongoing basis. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Monitoring user activity helps you understand what they are doing in your environment. By monitoring user activity, you may be able to discover and isolate potential malicious activity before it impacts your system.

In this article, we describe how to create a dashboard to search and monitor [AWS CloudTrail](/docs/integrations/amazon-aws/cloudtrail/) logs. A CloudTrail log is a record in JSON format. The log contains information about requests for resources in your account, such as:

* who made the request
* the services used
* the actions performed
* and parameters for the action

You can search AWS CloudTrail logs to extract the user, event, and IP addresses as metadata. Because they're in JSON format, you'll use the [parse json](/docs/search/search-query-language/parse-operators/parse-json-formatted-logs/) operator. This way, you can use the extracted values later to monitor user activity. 

## Step 1: Monitor user activity with a dashboard

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

## Step 2: Create dashboard template variables

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

## Step 3: Monitor geolocation of console logins

The [lookup](/docs/search/search-query-language/search-operators/lookup-classic/) operator maps data to other meaningful data stored in Sumo Logic.

To see where your users are logging in from across the world, you can use [geo lookups](/docs/search/search-query-language/search-operators/geo-lookup-map/). You can create maps with geo lookups, which can help you visualize and quickly identify where users are logging in from. You can then use this information to ensure all logins are from expected locations, and detect potential login threats.

For example, if you expect all your users to be located in Europe, but you are getting a large number of logins from South America, this might be worth investigating. There could be potential hackers in the unexpected location, or it could be a sign that an advertising campaign was accidentally deployed in the wrong region. In this step, we'll create a map that monitors where users are logging in from.

As another example, let's say one of your employees logged in from both Canada and Australia, on the same day only two hours apart. You know this employee lives in Toronto and travels frequently. So, the Canadian login is expected. Normally, the Australian login wouldn't be unexpected, since this employee travels so often. However, since it occurred only two hours after a Toronto login, you conclude it's  malicious activity. This type of suspicious activity is called a landspeed violation. We'll show you how to query for them.

We want to see where our users are logging in from around the globe.  So in this step we are going to create a query to get the IP address and use the Lookup function to get the latitude and longitude of where that IP address is located. 

1. Click **Add Panel** and then **Map**.<br/><img src={useBaseUrl('img/csa/add-map-panel.png')} alt="Add a map panel" style={{border: '1px solid black'}} width="300"/>
1. Copy or type this code to the query window. (Replace `Labs/AWS/CloudTrail` with a valid source category for AWS CloudTrail logs in your environment.)
    ```
    _sourceCategory=Labs/AWS/CloudTrail
    | json field=_raw "userIdentity.userName" as actor
    | json field=_raw "eventType" as event_type
    | json field=_raw "sourceIPAddress" as src_ip
    | json field=_raw "responseElements.ConsoleLogin" as result
    | where !isEmpty(actor)
    | where !isEmpty(event_type)
    | where event_type matches "{{event_type}}"
    | where actor matches "{{actor}}"
    | lookup latitude, longitude, country_name, city, region from geo://location on ip=src_ip 
    | count by actor,src_ip,latitude,longitude,country_name,event_type
   ```
1. Click the magnifying glass icon to perform a search. If results do not display, select a longer time frame.
1. Name the panel **Geo Location of Console Logins**.<br/><img src={useBaseUrl('img/csa/geo-location-panel.png')} alt="Geo location panel" style={{border: '1px solid black'}} width="800"/>
1. Click the **Add to Dashboard** button.
    :::note
    You can change the values of the dashboard template variables you created in the earlier step, and see the effect on your dashboard panels. 
    :::

## Step 4: Monitor failed login attempts

Now we want to see if users are failing to login, which either might be an indication of users forgetting their passwords, or someone else trying to log in using stolen user credentials.

1. Click **Add Panel** and then **Time Series**.<br/><img src={useBaseUrl('img/csa/add-time-series-panel.png')} alt="Add a time series panel" style={{border: '1px solid black'}} width="300"/>
1. Copy or type this code to the query window. (Replace `Labs/AWS/CloudTrail` with a valid source category for AWS CloudTrail logs in your environment.)
    ```
    _sourceCategory=Labs/AWS/CloudTrail
    | json field=_raw "userIdentity.userName" as actor
    | json field=_raw "eventType" as event_type
    | json field=_raw "sourceIPAddress" as src_ip
    | json field=_raw "responseElements.ConsoleLogin" as result
    | json field=_raw "eventName" as event_name
    | where actor matches "{{actor}}"
    | where !isEmpty(actor)
    | where !isEmpty(event_type)
    | where result = "Failure"
    | where event_type = "AwsConsoleSignIn"
    | timeslice 1h
    | count by _timeslice,actor,event_type,event_name,result
    | top 10 actor by _timeslice,event_type,result,_count
    ``` 
1. Click the magnifying glass icon to perform a search. If results do not display, select a longer time frame.
1. Under **Chart Type**, select **Table**.
1. Rename this panel **Top 10 Number of Failed Login Attempts**.
1. Click the **Add to Dashboard** button.

Your dashboard should now look something like this:<br/><img src={useBaseUrl('img/csa/dashboard-with-failed-login-attempts-dashboard.png')} alt="Dashboard with failed login attempts panel" style={{border: '1px solid black'}} width="800"/>

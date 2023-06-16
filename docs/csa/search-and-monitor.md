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
   1. Copy or type the following query to the query window. In the query, replace `aws/observability/cloudtrail/logs` with a valid source category for AWS CloudTrail logs in your environment.
     ```
     _sourceCategory=aws/observability/cloudtrail/logs
     | json field=_raw "userIdentity.userName" as actor
     | json field=_raw "eventType" as event_type
     | json field=_raw "sourceIPAddress" as src_ip
     | json field=_raw "eventName" as event_name
     | count by actor,event_type,event_name
     | top 10 actor by event_type,_count
     | transpose row actor column event_type
     ```
     <br/>Notice how this query searches AWS CloudTrail logs to extract the user, event, IP addresses, and event names as metadata using a parse json command, so you can use the extracted values to monitor user activity.
   1. In the upper right, change the time frame for the query to be for the last 24 hours.<br/><img src={useBaseUrl('img/csa/24-hours.png')} alt="Twenty-four hours" style={{border: '1px solid black'}} width="100"/>
   1. Press Enter or click the magnifying glass icon to run the search.
1. In the **Panel Settings** area, change the chart type to **Bar**.<br/><img src={useBaseUrl('img/csa/bar-chart-setting.png')} alt="Bar chart setting" style={{border: '1px solid black'}} width="250"/>
1. In the upper left corner of your bar chart, change the panel title to **Top 10 User Activity**.<br/><img src={useBaseUrl('img/csa/top-10-user-activity-panel.png')} alt="Rename dashboard panel" style={{border: '1px solid black'}} width="400"/>
1. Click the **Add to Dashboard** button in the top right corner. The dashboard displays the panel you created.<br/><img src={useBaseUrl('img/csa/example-dashboard.png')} alt="Example dashboard" style={{border: '1px solid black'}} width="800"/>


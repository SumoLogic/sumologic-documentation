---
id: elastic-load-balancer-app
title: Sumo Logic App for AWS Elastic Load Balance
sidebar_label: AWS Elastic Load Balancer
description: AWS Elastic Load Balancer
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Sumo Logic AWS Elastic Load Balancer - Application ingests the logs stored in an S3 bucket, giving you the visibility to see the overall health of your Application Load Balancer and Target Groups. Use the Sumo Logic App to analyze the raw Application Load Balancer data to investigate the availability of the applications running behind Application Load Balancers. Or correlate the Application Load Balancing data with other data sets to get a broader understanding of the fault tolerance of your applications across multiple AWS Availability Zones.

NoteFor information on collecting unified logs and metrics for AWS Elastic Load Balancer Application, see the AWS Elastic Load Balancing ULM Application.


## Collect Logs and Metrics







## Install the AWS Elastic Load Balancing - Application

Now that you have set up collection for AWS ELB, install the Sumo Logic App for AWS Elastic Load Balancer to use the pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/AWS_Elastic_Load_Balancer_-_Application/03-AWS-Elastic-Load-Balancing---Application-Dashboards#Dashboards) that provide visibility into your environment.

**To install the app:**

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library)

1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (_sourceCategory=MyCategory). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
2. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.



## Viewing the Dashboards

### AWS ELB Application Overview

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-ELB-App-overview.png')} alt="AWS Elastic Load Balancer - Application" />

* **Requests by Geolocation**. Uses a geolocation query to display a map of the IP addresses used by clients accessing your apps for the last fifteen minutes.
* **Browsers and Operating Systems.** Reports the breakdown of the client’s browser by operating system in a stacked column chart for the last fifteen minutes.
* **Requests by SSL Protocol and Cipher.** Reports the breakdown of ciphers used by protocol in a stacked column chart for the last fifteen minutes.
* **Requests by Load Balancer. **Displays a bar chart of how many requests are hitting a load balancer for the last fifteen minutes.
* **Data Sent and Received in MB. **Displays the data being sent and received by client IP in a pie chart for the last fifteen minutes.
* **Target Group Utilization.** Counts the requests by target group in the last fifteen minutes.
* **4XX and 5XX Status Codes by Backend Instance and ALB.** Charts the number of 4XX and 5XX status codes for each backend instance and ALB in a bar chart over the last fifteen minutes.
* **Average Req and Response Time by ELB.** Displays the latency of each load balancer in AWS in a stacked column chart for the last fifteen minutes.
* **Average Target Processing Time by Target Group.** Displays the average target processing time for each target group.


### Latency Analysis

<img src={useBaseUrl('img/integrations/amazon-aws/aws-elb-AppLatencyAnalysis.png')} alt="AWS Elastic Load Balancer - Application" />

* **Total Process Time Latency 90th, 95 pct.** Shows the 90th and 95th percentile trend as an average across your deployment.
* **Latency by Protocol.** Shows the average latency by protocol across your deployment.
* **Latency by Target Group.** Shows the average latency by Target Group across your deployment.
* **Latency by Domain.** Displays the latency of each domain in your EC2 deployment.
* **Target Processing Time by Target Group.** Bar chart of max, average, and min processing times for each target group.
* **Average Target Processing Time by Target Group.** Line chart of mean processing time by target group.
* **Latency by Top 20 Clients.** Displays the process time of the top 20 IP addresses in your deployment.
* **Latency by Top 20 Backend Instances. **This Panel focuses solely on the back end of your AWS EC2 deployment, keeping watch over the processing time of the 20 busiest instances.
* **Latency by Top 20 Paths.** Displays the process time of the busiest 20 paths in your deployment.


### Request Analysis

<img src={useBaseUrl('img/integrations/amazon-aws/aws-elb-app-request.png')} alt="AWS Elastic Load Balancer - Application" />

* **Requests by Geolocation.** Uses a geolocation query to display a map of the IP addresses used by clients accessing your apps for the last fifteen minutes.
* **Requests by Target Group Over Time. **Shows the trend of requests by Target Group over time for the last fifteen minutes.
* **Requests by Protocol Over Time. **Shows the trend of requests by protocol over time for the last fifteen minutes.
* **Requests by Load Balancer Over Time.** Displays a line chart of how many requests are hitting a load balancer on a timeline over the last fifteen minutes.
* **Total Requests by Load Balancer.** Show the requests per load balancer over time in a bar chart for the last fifteen minutes.
* **Total Requests and Data Volume.** Displays the data being sent and received by client IP in a line chart on a timeline for the last fifteen minutes.


### Status Code Analysis

<img src={useBaseUrl('img/integrations/amazon-aws/aws-elb-app-status-codes.png')} alt="AWS Elastic Load Balancer - Application" />

* **ELB Status Over Time. **Displays a bar chart representing the application status over a specified time period.
* **Target Status Over Time. **Displays a bar chart representing the status of the target over a specified time period.
* **4XX ELB Status by Location. **Charts the number and geographic location of 4XX ELB errors.
* **5XX ELB Status by Location.** Charts the number and geographic location of 5XX ELB errors.
* **5XX Target Status by Location.** Charts the number and geographic locations of errors for 5XX targets.
* **4XX Target Status by Location. **Charts the number and geographic locations of errors for 4XX targets.
* **Target Status by Target Group.** Shows a bar chart comparing errors by target group: 4XX and 5XX.
* **ELB Status by ELB Server.** Shows a bar chart comparing errors on each server by target: 4XX and 5XX.
* **Target Status by Domain.** Shows the number of errors that occurred in a domain by target: 4XX and 5XX.
* **Target Status by URI.** Shows the number of errors for each Uniform Resource Identifier (URI): 4XX and 5XX.


### Failed Dispatch Monitoring

<img src={useBaseUrl('img/integrations/amazon-aws/aws-elb-app-failed-dispatch.png')} alt="AWS Elastic Load Balancer - Application" />

* **Failed Dispatches Client Geolocation.** Uses geolocation to map IP addresses for clients with failed dispatches.
* **Failed Dispatch Outlier.** Shows the number of failed dispatches, the threshold for “normal” failures and identifies any outliers outside that threshold.  
* **Failed Dispatches by Backend.** Identifies the failed dispatches by backend time sliced by 30 minutes over a 24 hour period.
* **Failed Dispatches by Target Group.** Identifies the failed dispatches by target group time sliced by 30 minutes over a 24 hour period.
* **Failed Dispatches by Client. ** Aggregation table of clients and the number of their failures for the last 24 hours.
* **Failed Dispatches Count.** Total number of failed dispatches.
* **Failed Dispatches by URI.** Aggregation table of the top ten URIs with dispatches failed.
* **Failed Dispatches by Host.** Identifies the failed dispatches by host domain time sliced by 30 minutes over a 24 hour period.

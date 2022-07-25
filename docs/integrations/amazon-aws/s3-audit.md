---
id: s3-audit
title: Sumo Logic App for Amazon S3 Audit
sidebar_label: Amazon S3 Audit App
description: Amazon S3 Audit App
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/s3audit.png')} alt="DB icon" width="50"/>

Amazon Simple Storage Service (S3) provides a simple web services interface that can be used to store and retrieve any amount of data from anywhere on the web. The Sumo Logic App for Amazon S3 Audit presents details from access logs that contain information about the request type, the average response time, and the inbound and outbound data volume.

Our new app install flow is now in Beta. It is only enabled for certain customers while we gather Beta customer feedback. If you can see the Add Integration button, follow the "Before you begin" section in the "Collect Logs" help page and then use the in-product instructions in Sumo Logic to set up the app.

## Collect Logs




## Installing the Amazon S3 Audit App

Now that you have configured log collection for Amazon S3 Audit, install the Sumo Logic App for Amazon S3, and take advantage of predefined Searches and [Dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_S3_Audit_App/Amazon-S3-Audit-App-Dashboards#Dashboards). The Sumo Logic App for Amazon S3 Audit presents details from access logs that contain information about the request type, the average response time, and the inbound and outbound data volume.

Our new app install flow is now in Beta. It is only enabled for certain customers while we gather Beta customer feedback. If you can see the Add Integration button, follow the "Before you begin" section in the "Collect Logs" help page and then use the in-product instructions in Sumo Logic to set up the app.

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


## Viewing the S3 Audit Dashboards

### Overview

This dashboard dashboard provides the geolocation of S3 operations, requests performed, data volume sent, and total requests by S3 buckets.

<img src={useBaseUrl('img/integrations/amazon-aws/S3-Overview.png')} alt="S3 Audit dashboards" />

**Geolocation of Clients.** Performs a geo lookup operation and displays the location of S3 bucket clients and the number of requests per bucket on a map of the world for the last three hours.

**Requests by Operation.** Displays the requests performed for the S3 bucket in a pie chart listed by operation type in a legend for the last three hours.

**Data Volume Sent in MB by S3 Bucket.** Shows the data volume per S3 bucket in megabytes, displayed in an bar chart for the last three hours.

**Total Requests by S3 Bucket.** Shows the total requests per S3 bucket, displayed in an bar chart for the last three hours.


### Details

This dashboard provides geolocation of s3 clients, data added, 4xx/5xx status codes, latency, and requests by S3 buckets.

<img src={useBaseUrl('img/integrations/amazon-aws/S3-Details.png')} alt="S3 Audit dashboards" />


**Geolocation of Clients.** Performs a geo lookup operation and displays the location of S3 bucket clients and the number of requests per bucket on a map of the world for the last three hours.

**Data Volume Sent in MB by S3 Bucket.** Shows the data volume per S3 bucket in megabytes, displayed in an area chart on a timeline for the last three hours.

**Total Requests by S3 Bucket.** Shows the total requests per S3 bucket, displayed in an area chart on a timeline for the last three hours.

**Data Added to S3 Bucket.** Lists the connected S3 bucket name and displays the amount of data loaded per bucket in megabytes in an aggregation table for the last three hours.

**Requests by Operation.** Displays the requests performed for the S3 bucket in a pie chart listed by operation type in a legend for the last three hours.

**Total 4xx/5xx Status codes by S3 Bucket.** Lists the total 4xx or 5xx error status codes by S3 bucket in a stacked column chart on a timeline for the last three hours.

**Average Latency in Milliseconds by S3 Bucket.** Displays the average latency time per S3 bucket in milliseconds in an area chart on a timeline for the last three hours.


### Threat Intel

This dashboard provides high-level views of threats throughout your S3 Service. Dashboard panels display visual graphs and detailed information on Threats by Client IP, Threats by Actors, and Threat by Malicious Confidence.

<img src={useBaseUrl('img/integrations/amazon-aws/S3-Threat-Intel.png')} alt="S3 Audit dashboards" />

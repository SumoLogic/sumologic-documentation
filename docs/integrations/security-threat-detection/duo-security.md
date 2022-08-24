---
id: duo-security
title: Sumo Logic App for Duo Security
sidebar_label: Duo Security
description: The Sumo Logic App for Duo Security helps you monitor your Duo account’s authentication logs, administrator logs, and telephony logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/duo.png')} alt="thumbnail icon" width="75"/>

Duo provides two-factor authentication, endpoint remediation, and secure single sign-on tools. The Sumo Logic App for Duo Security helps you monitor your Duo account’s [authentication logs](https://duo.com/docs/adminapi#authentication-logs), [administrator logs](https://duo.com/docs/adminapi#administrator-logs), and [telephony logs](https://duo.com/docs/adminapi#telephony-logs). The dashboards provide insight into failed and successful authentications, events breakdown by applications, factors, and users, geo-location of events, admin activities, outliers, threat analysis of authentication, and administrator events.

## Log Types

The Duo Security App uses following logs. See [Duo documentation](https://duo.com/docs/adminapi#logs) for details of the log schema.

When you generate the Duo credentials, you should do it for the Admin API application.

* Authentication Logs
* Administrator Logs
* Telephony Logs

## Collecting Logs for the Duo Security App (DEPRECATED)

To collect logs from the Duo Security App, if you are not using the Sumo Logic FedRamp deployment,  use the new [Cloud to Cloud Integration for Duo Security App](/docs/send-data/Sources/hosted-collectors/Cloud-to-Cloud-Integration-Framework/Duo-Source) to create the source and use the same source category while installing the app.

The sections below are deprecated for non-FedRamp Sumo Logic deployments. If you're using the Sumo Logic FedRamp deployment, use the sections below to configure collection for this app.

This page demonstrates how to configure log collection for the Duo Security App.

#### Step 1. Create Hosted Collector and HTTP Source (DEPRECATED)

1. Create a [Hosted Collector](/docs/send-data/configure-hosted-collector).
2. Create an [HTTP Logs and Metrics Source](/docs/send-data/sources/hosted-collectors/http-logs-metrics-source) on the Collector you created in the previous step. \
When you have configured the HTTP Source, Sumo will display the URL of the HTTP endpoint. Make a note of the URL. You will use it when you configure the Lambda Function to send data to Sumo.


#### Step 2. Create an integration key, secret key, and API hostname in Duo (DEPRECATED)

The Duo Admin API allows you to integrate your application with Duo Security’s platform at a low level. The API has methods for creating, retrieving, updating, and deleting the core objects in Duo’s system for seamless [integrations](https://duo.com/docs/adminapi#integrations).

To create an integration key, secret key, and API hostname in Duo, see the [Duo Admin API documentation](https://duo.com/docs/adminapi#about-the-admin-api).


#### Step 3. Download Lambda Function code and Import it to AWS Lambda (DEPRECATED)

1. Do one of the following:
* Download the zip file from Sumo's [archive](https://s3.amazonaws.com/script-collection/Duo/Archive.zip).
* Clone the GitHub [repository](https://github.com/SumoLogic/sumologic-duo-security), and zip the **duo_client **folder and **lambda_function.py** file together.

For any enhancements or suggestions submit a pull request on the repository.
1. Login to AWS console, navigate to Lambda service and click **Create Function**.
2. Provide a **Name**, and select the **Run Time** as **Python 3.6**.
3. Choose an existing Role or create a new one to execute the Lambda function. Then click **Create Function**.
4. For the** Function code **section** **select** Upload a Zip File **from** Code entry type**.** **Upload the zip file you downloaded.
5. Click **Save**.
6. The **Function code** directory structure should look like this, make sure there isn't an extra folder between the **root** folder **duo_test2** and the **duo_client **folder. The **lambda_function.py** file needs to be directly under the **root** folder.

#### Step 4. Define Environment Variables for Lambda Function (DEPRECATED)

Define the following environment variables on the AWS Lambda Function page:

* **COLL_ENDPOINT** : Sumo Logic Hosted Collector End Point
* **SCAN_INTERVAL_IN_SEC** : Polling interval for Duo APIs. The recommended value is 600 seconds (10 minutes)
* **I_KEY**, **S_KEY**, **HOST** : Duo’s integration key, secret key, and API hostname. See [Duo's documentation](https://duo.com/docs/adminapi#first-steps) for details.


#### Step 5. Add Timer trigger for the Lambda Function (DEPRECATED)

Create a rule to run your Lambda function on a schedule. To create a rule using the console:

1. Open the CloudWatch console at [https://console.aws.amazon.com/cloudwatch/](https://console.aws.amazon.com/cloudwatch/).
2. In the navigation pane, choose **Events**, **Create rule**.
3. For **Event Source**, do the following:
    1. Choose **Schedule**.
    2. Choose **Fixed rate of** and specify the schedule interval for **10 minutes**
4. For **Targets**, choose **Add target** and then choose **Lambda function**.
5. For **Function**, select the Lambda function that you created.
6. Choose **Configure details**.
7. For **Rule definition**, type a name and description for the rule.
8. Choose **Create rule**.


## Installing the Duo Security App and View the Dashboards

This section provides instructions on how to install the Duo Security App, as well as an example of each of the App dashboards. The App dashboards provide insight into failed and successful authentications, administrator events, and outlier events.

The Duo Security App helps you monitor your Duo account’s [authentication](https://duo.com/docs/adminapi#authentication-logs), [administrator](https://duo.com/docs/adminapi#administrator-logs), and [telephony logs](https://duo.com/docs/adminapi#telephony-logs).

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](/docs/get-started/library/install-apps)

3. To install the app, complete the following fields.
   * **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
   * **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
   * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing the Duo Security Dashboards

### Overview

Overview of Duo Events including events breakdown by type, geographic location, one-day time comparison of events, and admin activity.

<img src={useBaseUrl('img/integrations/security-threat-detection/duo-overview.png')} alt="Duo Security dashboards" />


### Administrator Events

Geographic location of admin events, one-day time comparison of events, login errors, admin activity over time, and events breakdown by action.

<img src={useBaseUrl('img/integrations/security-threat-detection/Duo-administrator-events.png')} alt="Duo Security dashboards" />

### Success Authentications

Geographic location of successful authentication events, one-day time comparison of events, breakdown of events by Application, Factor, Users, Country, State, and City.
<img src={useBaseUrl('img/integrations/security-threat-detection/duo-success-authentication.png')} alt="Duo Security dashboards" />

### Failed Authentications


Geographic location of failed authentication events, one-day time comparison of failed events, breakdown of events by Application, Factor, Users, Country, State, and City.

<img src={useBaseUrl('img/integrations/security-threat-detection/duo-failed-authentications.png')} alt="Duo Security dashboards" />

### Outliers and Threat Analysis

Outliers and threat analysis of Duo events.

<img src={useBaseUrl('img/integrations/security-threat-detection/duo-outliers-threat.png')} alt="Duo Security dashboards" />

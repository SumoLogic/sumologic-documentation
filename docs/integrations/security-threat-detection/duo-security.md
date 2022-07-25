---
id: duo-security
title: Sumo Logic App for Duo Security
sidebar_label: Duo Security
description: Duo Security
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/duo.png')} alt="thumbnail icon" width="75"/>


Duo provides two-factor authentication, endpoint remediation, and secure single sign-on tools. The Sumo Logic App for Duo Security helps you monitor your Duo account’s [authentication logs](https://duo.com/docs/adminapi#authentication-logs), [administrator logs](https://duo.com/docs/adminapi#administrator-logs), and [telephony logs](https://duo.com/docs/adminapi#telephony-logs). The dashboards provide insight into failed and successful authentications, events breakdown by applications, factors, and users, geo-location of events, admin activities, outliers, threat analysis of authentication, and administrator events.


## Collect Logs for the Duo Security App

To collect logs from the Duo Security App, if you are not using the Sumo Logic FedRamp deployment,  use the new [Cloud to Cloud Integration for Duo Security App](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-to-Cloud_Integration_Framework/Duo_Source) to create the source and use the same source category while installing the app.

1

The sections below are deprecated for non-FedRamp Sumo Logic deployments. If you are using the Sumo Logic FedRamp deployment, use the sections below to configure collection for this app.

This page demonstrates how to configure log collection for the Duo Security App.


#### Log Types
2

The Duo Security App uses following logs. See [Duo documentation](https://duo.com/docs/adminapi#logs) for details of the log schema.


3
When you generate the Duo credentials, you should do it for the Admin API application.



* Authentication Logs
* Administrator Logs
* Telephony Logs


#### Process Overview (DEPRECATED)

1. [Create an HTTP Logs and Metrics Source.](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Duo_Security/01Collect_Logs_for_the_Duo_Security_App#Step_1._Create_Hosted_Collector_and_HTTP_Source)
2. [Create an integration key, secret key, and API hostname in Duo.](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Duo_Security/01Collect_Logs_for_the_Duo_Security_App#Step_2._Create_an_integration_key.2C_secret_key.2C_and_API_hostname_in_Duo)
3. [Download the Lambda Function code, and upload it to AWS Lambda Console and create a Lambda function.](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Duo_Security/01Collect_Logs_for_the_Duo_Security_App#Step_3.__Download_Lambda_Function_code_and_Import_it_to_AWS_Lambda)
4. [Define Environment Variables for the Lambda Function.](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Duo_Security/01Collect_Logs_for_the_Duo_Security_App#Step_4._Define_Environment_Variables_for_Lambda_Function)
5. [Add a time-based trigger for the Lambda function.](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Duo_Security/01Collect_Logs_for_the_Duo_Security_App#Step_5._Add_Timer_trigger_for_the_Lambda_Function)


##### Step 1. Create Hosted Collector and HTTP Source (DEPRECATED)
5




1. Create a [Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector).
2. Create an [HTTP Logs and Metrics Source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source) on the Collector you created in the previous step. \
When you have configured the HTTP Source, Sumo will display the URL of the HTTP endpoint. Make a note of the URL. You will use it when you configure the Lambda Function to send data to Sumo.


##### Step 2. Create an integration key, secret key, and API hostname in Duo (DEPRECATED)
6


The Duo Admin API allows you to integrate your application with Duo Security’s platform at a low level. The API has methods for creating, retrieving, updating, and deleting the core objects in Duo’s system for seamless [integrations](https://duo.com/docs/adminapi#integrations).

To create an integration key, secret key, and API hostname in Duo, see the [Duo Admin API documentation](https://duo.com/docs/adminapi#about-the-admin-api).


##### Step 3.  Download Lambda Function code and Import it to AWS Lambda (DEPRECATED)
7

1. Do one of the following:
* Download the zip file from Sumo's [archive](https://s3.amazonaws.com/script-collection/Duo/Archive.zip).
* Clone the GitHub [repository](https://github.com/SumoLogic/sumologic-duo-security), and zip the **duo_client **folder and **lambda_function.py** file together. \

8
For any enhancements or suggestions submit a pull request on the repository.
1. Login to AWS console, navigate to Lambda service and click **Create Function**.
2. Provide a **Name**, and select the **Run Time** as **Python 3.6**.
3. Choose an existing Role or create a new one to execute the Lambda function. Then click **Create Function**.
4. For the** Function code **section** **select** Upload a Zip File **from** Code entry type**.** **Upload the zip file you downloaded.
5. Click **Save**.
6. The **Function code** directory structure should look like this, make sure there isn't an extra folder between the **root** folder **duo_test2** and the **duo_client **folder. The **lambda_function.py** file needs to be directly under the **root** folder. \

9

##### Step 4. Define Environment Variables for Lambda Function (DEPRECATED)
10


Define the following environment variables on the AWS Lambda Function page:

* **COLL_ENDPOINT** : Sumo Logic Hosted Collector End Point
* **SCAN_INTERVAL_IN_SEC** : Polling interval for Duo APIs. The recommended value is 600 seconds (10 minutes)
* **I_KEY**, **S_KEY**, **HOST** : Duo’s integration key, secret key, and API hostname. See [Duo's documentation](https://duo.com/docs/adminapi#first-steps) for details.


11



##### Step 5. Add Timer trigger for the Lambda Function (DEPRECATED)
12


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


## Install the Duo Security App and View the Dashboards

This page provides instructions on how to install the Duo Security App, as well as an example of each of the App dashboards. The App dashboards provide insight into failed and successful authentications, administrator events, and outlier events.


### Install Sumo Logic App
13

The Duo Security App helps you monitor your Duo account’s [authentication](https://duo.com/docs/adminapi#authentication-logs), [administrator](https://duo.com/docs/adminapi#administrator-logs), and [telephony logs](https://duo.com/docs/adminapi#telephony-logs).

**To install the app:**

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


14
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


### Dashboards
15

#### Overview
16
Overview of Duo Events including events breakdown by type, geographic location, one-day time comparison of events, and admin activity.


17

#### Administrator Events
18


Geographic location of admin events, one-day time comparison of events, login errors, admin activity over time, and events breakdown by action.


19

#### Success Authentications
20


Geographic location of successful authentication events, one-day time comparison of events, breakdown of events by Application, Factor, Users, Country, State, and City.


21


#### Failed Authentications
22


Geographic location of failed authentication events, one-day time comparison of failed events, breakdown of events by Application, Factor, Users, Country, State, and City.

23


#### Outliers and Threat Analysis
24


Outliers and threat analysis of Duo events.

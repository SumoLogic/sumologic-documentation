---
id: workday
title: Sumo Logic App for Workday
sidebar_label: Workday
description: The Sumo Logic App for Workday provides insights into the user account and admin activities. It provides a complete secure monitoring solution and preconfigured dashboards for visibility into login activity, user activity, and admin activity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


<img src={useBaseUrl('img/integrations/saas-cloud-apps/workday.png')} alt="DB icon" width="100"/>

Workday is a cloud-based ERP system that manages the business processes and allows organizations to use a system integrated application. Workday is a coherent cloud ERP system for financial analysis, analytical solutions, HCM suites, and better business processes.

The Sumo Logic App for Workday provides insights into authentication activity, user activity, and administrator activity. The pre-configured dashboards help identify events that identify compliance and incident reporting, common security events, and real-time analysis of suspicious activities.


#### Log Types

The Sumo Logic App for Workday collects all logs in JSON format. It uses the following two types of logs:

* SignOn Logs
* Audit Logs


## Collect Logs for the Workday App

This page explains how to collect logs from Workday and ingest them into Sumo Logic for use with the Workday App predefined dashboards and searches. Click a link to jump to a section:


1.png "image_tooltip")

The instructions below assume that the following security groups -  Security Administrator, System Auditor, and Report Administrator are assigned to the user who will be configuring the collection in the Workday portal. Make sure the account used doesn't belong to an employee otherwise custom reports created by the user may no longer be available when they leave the organization.

* [Collection Overview](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Collection_Overview)
* [Sample Log Messages](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Sample_Log_Messages)
* [Query Sample](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Query_Sample)


#### Collection Overview

Sumo Logic collects logs from Workday via a script that calls the Workday APIs. As part of the script configuration, you need to first configure log types that need to be collected, and these logs are then forwarded to Sumo Logic’s HTTPS source.


2.png "image_tooltip")


By default, the collection starts from the current date and time, but this setting is also configurable. For more information, see the [Advanced Configuration](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Advanced_Configuration) options.


##### Before You Deploy

Sumo Logic collects data from the User Activity and Signon Activity Reports via the Workday APIs. Once data collection is set up, the data in the Sumo Logic platform is analyzed via the Workday app in the Sumo Logic app catalog.

User activity data is collected through the Workday Audit Logs API. To ensure that no sensitive information is being sent to Sumo Logic via this report, please run the “User Activity” Report and check the columns (specifically the Target column). If the data does have any sensitive info, you can enable data masking for the security group created in the steps outlined below by following the instructions in [this doc](https://doc.workday.com/reader/Z9lz_01hqDMDg6NSf7wCBQ/uHBXsJmAzuJ2QFVU6D3o2w).


#### Recommended Deployment Process

We recommend you to deploy the Sumo Logic - Workday integration using the following guidelines.



1. Start by configuring the collector source as described in the sections below for your Workday Sandbox environment.
2. Once the integration has been successfully deployed and tested in your Workday Sandbox environment, only then should you move to configuring this integration in your Workday production environment.  


3.png "image_tooltip")
After the integration has been configured, if you run into performance issues in your Workday production environment, please file a ticket with Workday to determine what is causing the degradation. Please disable the right Sumo Logic Workday collector source if the Workday team determines that it is causing performance problems and then file a support ticket with Sumo Logic to resolve it.

Configuring collection for Workday includes the following tasks:



* [Step 1: Configure the Workday Portal](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1:_Configure_the_Workday_Portal)
* [Step 2: Add a Hosted Collector and HTTP Source](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_2:_Add_a_Hosted_Collector_and_HTTP_Source)
* [Step 3: Configure Collection for Workday](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_3:_Configure_Collection_for_Workday)
* [Advanced Configuration](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Advanced_Configuration)
* [Troubleshooting](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Troubleshooting)


4.png "image_tooltip")
The instructions below assume that following security groups -  **Security Administrator, System Auditor, and Report Administrator** are assigned to the user who will be configuring the collection in the Workday portal.


##### Step 1: Configure the Workday Portal

This section demonstrates how to configure the Workday portal to integrate with Sumo Logic’s collection scripts.

Configuring the Workday portal involves the following steps:

[Step 1.1: Create an Integration System User](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.1:_Create_an_Integration_System_User)

[Step 1.2: Create a Security Group](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.2:_Create_a_Security_Group)

[Step 1.3: Register the API Client](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.3:_Register_the_API_Client)

[Step 1.4: Enable your tenant to send data](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.4:_Enable_your_tenant_to_send_data)

[Step 1.5: Create a Custom sign on report](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.5:_Create_a_Custom_signon_report)


###### Step 1.1: Create an Integration System User



1. Access the **Create Integration System User** task and provide the following parameters:
    * **User Name.** SumoLogic_ISU
    * **New Password and New Password Verify.** Enter the password
    * **Do Not Allow UI Sessions.** Check the box
    * **Session Timeout Minutes.** 0 (Disable session expiration) \
 \

5.png "image_tooltip")
 \

2. Click **OK**.
3. Exempt the created user from the password expiration rule.
    * Access **Maintain Password Rules** task.
    * Add the users to **System Users exempt from password expiration**. \
 \

6.png "image_tooltip")



###### Step 1.2: Create a Security Group



1. To create a security group, access the **Create Security Group** task and provide the following parameters:
    * **Type of Tenanted Security Group.** Integration System Security Group (Unconstrained)
    * **Name.** SumoLogic Client Security Group** **


7.png "image_tooltip")


1. Click **OK**.
2. In the **Edit Integration System Security Group (Unconstrained)** window provide the following parameters:
    * **Integration System Users**. SumoLogic_ISU
    * **Comment (Optional)**. Provide a short description \
 \

8.png "image_tooltip")

3. Click **OK**.
4. To attach the security group to a domain, access the **View Domain** task for the domain System Auditing.
5. Select **Domain > Edit Security Policy Permissions** from the **System Auditing** related **Actions** menu. \
 \

9.png "image_tooltip")

6. Add the SumoLogic Client Security Group you created to both the tables as below:
    * **Report/Task Permissions table.** View access
    * **Integration Permissions table**. Get access \
 \

10.png "image_tooltip")

7. Click **OK**.
8. To apply policy changes, access the **Activate Pending Security Policy Changes** task and activate the changes you made. \
 \

11.png "image_tooltip")

9. Click **OK**.


###### Step 1.3: Register the API Client



1. To register the API client, access the **Register API Client** **for Integrations** task, and provide the following parameters:
    * **Client Name.** Sumo Logic Workday Collector
    * **Non-Expiring Refresh Tokens. **Yes
    * **Scope. **System \
 \

12.png "image_tooltip")

2. Click **OK**.
3. Copy the **Client Secret** and **Client ID** before you navigate away from the page and store it securely.
13.png "image_tooltip")
If you lose the **Client Secret,** you can generate a new one using the **Generate New API Client Secret** task. \

14.png "image_tooltip")

4. Click **Done**.
5. To generate a refresh token, access the **View API Clients** task and copy the below two parameters from the top of the page:
    * **Workday REST API Endpoint. **The endpoint to use access to the resources in your Tenant.
    * **Token Endpoint**. The endpoint used to exchange an authorization code for a token (if you configure authorization code grant). \
 \

15.png "image_tooltip")

6. Go to **API Clients for Integrations **tab hover on **“Sumo Logic Workday Collector API”** client and click on the three-dot action buttons.
7. In the new pop up window, click **API Client > Manage Refresh Token for Integrations \
 \
**
16.png "image_tooltip")

8. In the **Manage Refresh Token for Integrations** window, select **“SumoLogic_ISU”** in the **Workday Account** field and click **OK**. \
 \

17.png "image_tooltip")

9. In the newly opened window, select **Generate New Refresh Token** checkbox and click **OK**. \
 \

18.png "image_tooltip")

10. Copy the value of the **Refresh Token** column from the opened window and click **Done**. \
 \

19.png "image_tooltip")



###### Step 1.4: Enable your tenant to send data



1. To enable your Tenant to send data, access the **Edit Tenant Setup - System** task and ensure that the **Enable User Activity Logging** checkbox is selected. \
 \

20.png "image_tooltip")

2. Access the** Edit Tenant Setup - Security** task and ensure that the** OAuth 2.0 Clients Enabled** checkbox is selected. \
 \

21.png "image_tooltip")



###### Step 1.5: Create a Custom sign on report

**Note** -  For customers that do not make use of the Recruiting Functional Area. the standard Candidate Signon report may not be available. Alternative is to create a new custom report with **Data Source = “All System Account Signons”** and **Data Source Filter **= **“Workday System Account Signons in Range”**. You can configure the fields using [Excel](https://appdev-readme-resources.s3.amazonaws.com/Workday/Signons_and_Attempted_Signons_-_Copy.xlsx).



1. Go to **Copy  Standard Report to Custom Report **task to create a Customs SignOn Report.
2. Select **“Candidate Signons and Attempted Signons” **in **Standard Report** **Name** dropdown and click **OK**. \
 \

22.png "image_tooltip")

3. In the new window, select **Optimized for Performance **checkbox, edit the report **Name** to **Custom Signons and Attempted Signons Report** and click **OK**. \
 \

23.png "image_tooltip")

4. In the next window, edit the **Data Source Filter **field and select **Workday System Account Signons in Range **filter.
5. Go to the **Columns** tab and click the **+** button to add the following new fields:
    * Operating System
    * Password Changed
    * Request Originator
    * SAML Identity Provider
    * Forgotten Password Reset Request
    * Multi-Factor Type
    * Is Device Managed
    * UI Client Type
    * Browser Type
    * Device is Trusted \
 \

24.png "image_tooltip")

6. Remove the text in the **Column Heading Override** column, for **Field > Session ID** and **Field > System Account**. \
 \

25.png "image_tooltip")
 \
After configuring all the fields you can verify all the fields using the [Excel](https://appdev-readme-resources.s3.amazonaws.com/Workday/Signons_and_Attempted_Signons_-_Copy.xlsx).
7. Go to the **Advanced** tab and click the **Enable As Web Service **checkbox under** Web Service Options**. \
 \

26.png "image_tooltip")

8. Go to the **Share** tab, enable **Share with specific users and groups** option, add **SumoLogic_ISU** in the **Authorized Users** field, and click **OK**. \
 \

27.png "image_tooltip")

9. Click **Done**. You can also test it by clicking the **Run** button. \
 \

28.png "image_tooltip")

10. To get the Report URL, search for **Custom Signons and Attempted Signons Report** in the search bar and run the report.
11. Click the **Actions** button and go to **Web Service > View URLs. \
 \
**
29.png "image_tooltip")

12. Click **OK** and copy the URL from **JSON **link. You will need this later while configuring the collection. \
 \

30.png "image_tooltip")



31.png "image_tooltip")


From the URL, remove any query parameters like json, From Moment and To Moment. The report URL should looks like this `https://wd2-impl-services1.workday.com/ccx/service/customreport2/<tenant>/<accountname>/<reportname>`


##### Step 2: Add a Hosted Collector and HTTP Source

**Note** -  This step is not needed if you are choosing to configure the Cloud To Cloud Collector Source.

In this step, you create a hosted collector and HTTP source to receive data from the scripts that collect data from your Workday tenant.



1. Configure a [Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector), or select an existing hosted collector for the HTTP source.
2. Configure an [HTTP source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source) on the hosted collector

Make a note of the HTTP address for the source. You will need it when you configure the collection for the Workday scripts in the next step.


##### Step 3: Configure Collection for Workday

In this section, we will configure a collection of login and audit logs  from Workday and send them to Sumo Logic via one of the methods listed below.



* For non-FedRamp Sumo Logic deployments
    * [Create a Workday Cloud To Cloud Collector Source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-to-Cloud_Integration_Framework/Workday_Source).
* If you are using the Sumo Logic FedRamp deployment, you can either use a Sumo Logic Workday collection script to be run in an Amazon Web Services (AWS) environment using the AWS Lambda service, or run Sumo Logic Python scripts to run periodically on a Linux machine via a cron job.
    * [AWS Lambda based collection](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Deploy_the_Sumo_Logic_Workday_SAM_Application) via a Serverless Application Model (SAM) application.
    * [Script-based collection](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Configure_script-based_collection_for_Workday) from a Linux machine.


##### Deploy the Sumo Logic Workday SAM Application in your AWS environment

In this step, you deploy the SAM application, which creates the necessary resources in your AWS account.

**To deploy the Sumo Logic Workday SAM Application, do the following:**


1. Go to [https://serverlessrepo.aws.amazon.com/applications](https://serverlessrepo.aws.amazon.com/applications).
2. Search for **sumologic-workday**, and select the **Show apps that create custom IAM roles or resource policies **checkbox and click the app link when it appears. \
 \

32.png "image_tooltip")

3. When the Sumo Logic app page appears, click **Deploy**. \
 \

33.png "image_tooltip")

4. In the **AWS Lambda > Functions >** **Application Settings** panel, specify the following parameters in the corresponding text fields:
    * **HTTPLogsEndpoint.** Paste the URL for the HTTP Logs source from [Step 2](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_2:_Add_a_Hosted_Collector_and_HTTP_Source).
    * **SignonReportUrl**. Paste the signon report url from [Step 1.5](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.5:_Create_a_Custom_signon_report).
    * **IntegrationSystemUserPassword**: Paste the SumoLogic_ISU account password copied from [Step 1.1](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.1:_Create_an_Integration_System_User).
    * **IntegrationSystemUsername.** Name of the account created in [Step 1.1](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.1:_Create_an_Integration_System_User).
    * **WorkdayRestApiEndpoint.**  Paste the Workday Rest API endpoint copied from [Step 1.4](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.4:_Enable_your_tenant_to_send_data).
    * **RefreshTokenEndpoint.**  Paste the Token endpoint copied from [Step 1.4](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.4:_Enable_your_tenant_to_send_data).
    * **ClientId.** Paste the API Client ID copied from [Step 1.4](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.4:_Enable_your_tenant_to_send_data).
    * **ClientSecret**.  Paste the API Client SECRET copied from [Step 1.4](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.4:_Enable_your_tenant_to_send_data).
    * **RefreshToken.** Paste the Refresh token generated from [Step 1.4](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_1.4:_Enable_your_tenant_to_send_data). \
 \

34.png "image_tooltip")

5. Click **Deploy**.
6. After the deployment, you can verify whether all the resources are created completely. \
 \

35.png "image_tooltip")



##### Configure script-based collection for Workday

This section shows you how to configure script-based log collection for the Sumo Logic Workday App.


36.png "image_tooltip")


The sumologic-workday script is compatible with python 3.7 and python 2.7, and has been tested on Ubuntu 18.04 LTS.

**Prerequisites**

This task makes the following assumptions:



* You have successfully added a **Hosted Collector** and **HTTP source **and copied configuration parameters (HTTPLogsEndpoint, SignonReportUrl, IntegrationSystemUserPassword, IntegrationSystemUsername,  WorkdayRestApiEndpoint,  RefreshTokenEndpoint, ClientId, ClientSecret, and RefreshToken) from the Workday console, as described in [Add a Hosted Collector and HTTP Source](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Collect_Logs_for_the_Workday_App#Step_2:_Add_a_Hosted_Collector_and_HTTP_Source) section.
* You are logged in to a Linux machine as the user account with which you will install the collector. If not, use the following command to switch to that account: `sudo su <user_name>`


##### Configure the script on a Linux machine

This task shows you how to install the script on a Linux machine.


37.png "image_tooltip")


**For python 3**, use: `pip3 install sumologic-workday`

**For operating systems where default python is not python3**, use: `/usr/bin/python3 -m sumoworkdaycollector.main`

**To deploy the script on a Linux machine, do the following:**



1. If **pip** is not already installed, follow the instructions in the [pip documentation](https://pip.pypa.io/en/stable/installing/) to download and install **pip**.
2. Log in to a Linux machine (compatible with either Python 3.7 or Python 2.7).
3. Do one of the following:
    * **For Python 2**, run the following command: `pip install sumologic-workday`
    * **For Python 3**, run the following command: `pip3 install sumologic-workday`
4. Create a `sumoworkdaycollector.yaml` configuration file in the home directory and fill in the parameters as shown in the following example.


```
SumoLogic:
  HTTP_LOGS_ENDPOINT: <Paste the URL for the HTTP Logs source from step 2.>

Workday_Report_Config:
  SIGNON_REPORT_URL: <SIGNON REPORT URL from Step 1.i>
  ISU_USERNAME: SumoLogic_ISU
  ISU_PASSWORD: <PASSWORD copied from Step 1.a>
  TIMEOUT: 600
  MAX_FETCH_INTERVAL: 86400
  MIN_FETCH_INTERVAL: 60
  API_CALL_DELAY_SECONDS: 60

Workday_API_Config:
  AUDIT_API_URL: "/auditLogs"
  WORKDAY_REST_API_ENDPOINT: <Workday Rest API endpoint copied from Step 1.g>
  REFRESH_TOKEN_ENDPOINT: <Token endpoint copied from Step 1.g>
  CLIENT_ID: <API Client ID copied from 1.f>
  CLIENT_SECRET: <API Client SECRET copied from 1.f>
  REFRESH_TOKEN: <Refresh token generated from Step 1.g>
  PAGINATION_LIMIT: 100
  TIMEOUT: 60
  API_CALL_DELAY_SECONDS: 60
  BLACKLIST_TASK_NAMES:
    - "Search in Main Page (Web Service)"
    - "Home"
```


5. Create a cron job to run the collector every 5 minutes, (use the `crontab -e` option). Do one of the following:



* **For Python 2**, add the following line to your crontab: \
`*/5 * * * *  /usr/bin/python -m sumoworkdaycollector.main > /dev/null 2>&1`
* **For Python 3**, add the following line to your crontab: \
`*/5 * * * *  /usr/bin/python3 -m sumoworkdaycollector.main > /dev/null 2>&1`


#### Advanced Configuration

This section provides a list of variables for Workday that you can define in the configuration file.


38.png "image_tooltip")
We do not recommend significantly changing how Workday APIs are being invoked by the Sumo Logic collection scripts as these may cause performance problems on your Workday instance.

The Workday specific configuration is shown in below two sections:



* Workday_Report_Config - Remove this section to stop collecting SignOn logs from the custom report.
* Workday_API_Config section - Remove this section to stop collecting audit logs via REST API.

You can view the entire configuration with default settings [here](https://github.com/SumoLogic/sumologic-workday/blob/master/sumoworkdaycollector/sumoworkdaycollector.yaml). For SAM deployments you can update   `sumoworkdaycollector.yaml` file in the AWS Lambda console editor.


39.png "image_tooltip")


The following table provides a list of variables for Workday that you can optionally define in the configuration file.

**INSERT TABLE**



#### Troubleshooting

This section shows you how to run the function manually and then verify that log messages are being sent from Workday.

**To run the function manually, do the following:**



1. Enter  one of the following commands:
    * For **python**, use this command: `python -m sumoworkdaycollector.main`
    * For **python3**, use this command: `python3 -m sumoworkdaycollector.main`
2. Check the automatically generated logs in  **/tmp/sumoapiclient.log **to verify whether the function is getting triggered.
3. If you installed the collector as `root` user and then run it as a normal user, you will see an error message similar to the following because the config is not present in the home directory of the user running the collector. Switch to the `root` user and run the script again.


40.png "image_tooltip")
You can also avoid this error by running the script with config file path as the first argument.


```
Traceback (most recent call last):
 File "/usr/local/lib/python2.7/dist-packages/sumoworkdaycollector/main.py", line 190, in main
   ns = WorkdayCollector()
 File "/usr/local/lib/python2.7/dist-packages/sumoworkdaycollector/main.py", line 29, in __init__
   self.config = Config().get_config(self.CONFIG_FILENAME, self.root_dir, cfgpath)
 File "/usr/local/lib/python2.7/dist-packages/sumoworkdaycollector/common/config.py", line 22, in get_config
   self.validate_config(self.config)
 File "/usr/local/lib/python2.7/dist-packages/sumoworkdaycollector/common/config.py", line 34, in validate_config
   raise Exception("Invalid config")
Exception: Invalid config
```



#### Sample Log Messages

Workday App logs are all in JSON format. The Workday App uses two types of logs and this section provides examples of the log types.


##### SignOn Logs

**Sample message**


```
{
"Request_Originator":"UI",
"Session_End":"2020-02-16T00:07:52-08:00",
"Signon":"wd-environments / Workday Production Automation: 2020 02 16 00 07 52 329 -0800",
"Device_is_Trusted":"0",
"Password_Changed":"0",
"Session_Start":"2020-03-19T00:07:52-08:00",
"Invalid_Credentials":"0",
"Workday_Account":"wd-environments / Workday Production Automation",
"Is_Device_Managed":"0",
"Required_Multi-Factor":"0",
"Failed_Signon":"0",
"Session_IP_Address":"127.0.0.1",
"Account_Locked__Disabled_or_Expired":"0",
"Authentication_Type_for_Signon":"User Name Password",
"Session_ID":"863734"
"tenant_name:: "SumoLogic"
}
```



##### Audit Logs

**Sample message**


```
{
"activityAction":"READ",
"systemAccount":"wd-environments",
"requestTime":"2020-03-26T07:12:07.006Z",
"taskDisplayName":"Workday System Status",
"taskId":"dc3e4ee2446c11de98360015c5e6daf6",
"sessionId":"d245fc",
"ipAddress":"127.0.0.1"
"tenant_name:: "SumoLogic"
}
```



#### Query Sample

The query sample provided in this section is from the **Failed Login Reasons **panel of the **Workday - Login Activity **dashboard.

**Parameters**



* Failed_Signon:*
* Authentication_Failure_Message:*

**Query String**


```
_sourceCategory=workday_logs and _sourceName=signonlogs
| json auto
| where Failed_Signon=1
| count by Authentication_Failure_Message
| if (isBlank(Authentication_Failure_Message), "Unknown", Authentication_Failure_Message) as Authentication_Failure_Message
| sort by _count
```



## Install the app for Workday and View Dashboards



1. **Last updated \
**May 19, 2022
2. [Save as PDF](https://help.sumologic.com/@api/deki/pages/7907/pdf/Install%2bthe%2bapp%2bfor%2bWorkday%2band%2bView%2bDashboards.pdf?stylesheet=default)
3.  
4. [ Share](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Workday/Install_the_app_for_Workday_and_View_Dashboards#)

    Table of contents


This page provides instructions on how to install the Workday App, as well as examples of each of the dashboards. The App's pre-configured searches and dashboards provide easy-to-access visual insights into your data.


#### Install the App

As part of this beta, the app will automatically be installed in the Sumo Logic account of your choice as part of the Admin recommended folder.


41.png "image_tooltip")


Panels will start to fill automatically once you have configured the collection. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with time, you'll see full graphs and maps.


#### Dashboard Filter with Template Variables      

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the [Filter with template variables](https://help.sumologic.com/Visualizations-and-Alerts/Dashboard_(New)/Filter_with_template_variables) help page.


42.png "image_tooltip")
You can use template variables to drill down and examine the data on a granular level.


#### Workday - Overview

The **Workday - Overview **dashboard provides an at-a-glance view of the security posture of your Workday instance. Panel identify login activity, user activity, and activity from untrusted devices or users with failed logins. It also helps you in monitoring failed logins by devices and the recent activities from untrusted devices.

Use this dashboard to:



* To quickly identify anomalous increases in total and failed logins.
* Monitor recent user activities from untrusted devices and users with multiple failed login attempt to determine the extent of a potential breach.
* Quickly identify if users are logging in from expected locations and using supported devices.


43.png "image_tooltip")



#### Workday - Login Activity

The **Workday - Login Activity** dashboard provides detailed insights into login summary, trends, and malicious activities. Panel also displays recent login activity and details of devices and browsers used to login to the Workday portal.

Use this dashboard to:



* Identify login requests received from malicious remote IPs and untrusted devices.
* Quickly identify if users are logging in from expected locations and using devices supported by your IT teams.
* Get insight into trends around login events to determine the times of day your Workday instance is being used the most.
* Quickly identify if there are an unusually high number of failed logins.


44.png "image_tooltip")



#### Workday - User Activity

The **Workday - User Activity** dashboard provides detailed insight into all user activity and potential suspicious activities in your Workday instance.

Use this dashboard to:



* Monitor if Workday tasks executed by users are according to expectations.
* Get insights into CRUD(Create/Read/Update/Delete) and download activity Quickly identify if login and user activity are originating from known malicious IP addresses.


45.png "image_tooltip")



#### Workday - System User Activity

The **Workday - System User Activity** dashboard monitors the system user activities. Panels also identify all configuration changes related to domain security, business processes, security groups, and API client modules.

Use this dashboard to:



* Identify if key configuration changes are in line with expectations.
* Identify changes related to permission and role assignments.


46.png "image_tooltip")



#### Workday - API Activity

The **Workday - API Activity** dashboard gives you insight into all analytics for REST API calls and web service related authentications and monitors access attempts from known malicious IP addresses.


47.png "image_tooltip")


API activity dashboard populates if there is any API activity happening on in their tenant, may be there isn't any workday rest apis (not SOAP) they are using. They can verify this by going to the User Activity report in their workday tenant and running the report with following filters

Task contains api/ and System Account not equal to SumoLogic_ISU.


48.png "image_tooltip")


Use this dashboard to:



* Monitor API related read, write, and other activities to ensure they match the expectations.
* Quickly identify any API requests originating from malicious IP addresses.
* Identify if API requests are being received from devices not supported by your IT teams.
*

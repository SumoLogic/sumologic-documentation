---
id: workday
title: Workday
sidebar_label: Workday
description: The Sumo Logic app for Workday provides insights into the user account and admin activities. It provides a complete secure monitoring solution and preconfigured dashboards for visibility into login activity, user activity, and admin activity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/workday.png')} alt="Thumbnail icon" width="50"/>

Workday is a cloud-based ERP system that manages the business processes and allows organizations to use a system integrated application. Workday is a coherent cloud ERP system for financial analysis, analytical solutions, HCM suites, and better business processes.

The Sumo Logic app for Workday provides insights into authentication activity, user activity, and administrator activity. The pre-configured dashboards help identify events that identify compliance and incident reporting, common security events, and real-time analysis of suspicious activities.

## Log types

The Sumo Logic app for Workday collects all logs in JSON format. It uses the following two types of logs:

* SignOn Logs
* Activity Logs

### Sample log messages

Workday app logs are all in JSON format. The Workday app uses two types of logs and this section provides examples of the log types.

```json title="SignOn Logs"
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
	"Session_ID":"863734",
  "tenant_name":"SumoLogic"
}
```

```json title="Activity Logs"
{
	"activityAction":"READ",
	"systemAccount":"wd-environments",
	"requestTime":"2020-03-26T07:12:07.006Z",
	"taskDisplayName":"Workday System Status",
	"taskId":"dc3e4ee2446c11de98360015c5e6daf6",
	"sessionId":"d245fc",
	"ipAddress":"127.0.0.1",
  "tenant_name":"SumoLogic"
}
```

### Sample queries

The query sample provided in this section is from the **Failed Login Reasons** panel of the **Workday - Login Activity** dashboard.

**Parameters**

* `Failed_Signon:*`
* `Authentication_Failure_Message:*`

```sql title="Query String"
_sourceCategory=workday_logs and _sourceName=signonlogs
| json auto
| where Failed_Signon=1
| count by Authentication_Failure_Message
| if (isBlank(Authentication_Failure_Message), "Unknown", Authentication_Failure_Message) as Authentication_Failure_Message
| sort by _count
```

## Before You Deploy

Sumo Logic collects data from the User Activity and Signon Activity Reports via the Workday APIs. Once data collection is set up, the data in the Sumo Logic platform is analyzed via the Workday app in the Sumo Logic **App catalog**.

User activity data is collected through the Workday Activity Logs API. To ensure that no sensitive information is being sent to Sumo Logic via this report, please run the “User Activity” Report and check the columns (specifically the Target column). If the data contains sensitive info, you can enable data masking for the security group created in the steps outlined below by following the instructions in [this Workday doc](https://doc.workday.com/reader/Z9lz_01hqDMDg6NSf7wCBQ/uHBXsJmAzuJ2QFVU6D3o2w).

## Collecting logs for the Workday app

This section explains how to collect logs from Workday and ingest them into Sumo Logic for use with the Workday app predefined dashboards and searches.

These instructions assume that the Security Administrator, System Auditor, and Report Administrator security groups are assigned to the user who will be configuring data collection in the Workday portal. Make sure the account used does not belong to an employee otherwise custom reports created by the user may no longer be available when they leave the organization.

Sumo Logic collects logs from Workday via a script that calls the Workday APIs. As part of the script configuration, you need to first configure log types that need to be collected, and these logs are then forwarded to Sumo Logic’s HTTPS source.

By default, the collection starts from the current date and time, but this setting is also configurable.

### Recommended Deployment Process

We recommend deploying the Sumo Logic Workday integration using the following guidelines.

1. Start by configuring the collector source as described in the sections below for your Workday Sandbox environment.
2. Once the integration has been successfully deployed and tested in your Workday Sandbox environment, only then should you move to configuring this integration in your Workday production environment.  

If you run into performance issues in your Workday production environment after you've configured integration, file a ticket with Workday to determine what is causing the degradation. Disable the right Sumo Logic Workday collector source if the Workday team determines that it is causing performance problems and then file a support ticket with Sumo Logic to resolve it.

### Step 1: Configure the Workday Portal

This section demonstrates how to configure the Workday portal to integrate with Sumo Logic’s collection scripts. Configuring the Workday portal involves the following steps:

### Step 1.1: Create an Integration System User

1. Access the **Create Integration System User** task and provide the following parameters:
    * **User Name.** SumoLogic_ISU.
    * **New Password and New Password Verify.** Enter the password.
    * **Do Not Allow UI Sessions.** Check the box.
    * **Session Timeout Minutes.** 0 (Disable session expiration).
2. Click **OK**.
3. Exempt the created user from the password expiration rule.
    * Access **Maintain Password Rules** task.
    * Add the users to **System Users exempt from password expiration**.

### Step 1.2: Create a Security Group

1. To create a security group, access the **Create Security Group** task and provide the following parameters:
    * **Type of Tenanted Security Group.** Integration System Security Group (Unconstrained)
    * **Name.** SumoLogic Client Security Group.
1. Click **OK**.
1. In the **Edit Integration System Security Group (Unconstrained)** window provide the following parameters:
    * **Integration System Users**. SumoLogic_ISU.
    * **Comment (Optional)**. Provide a short description.
1. Click **OK**.
1. To attach the security group to a domain, access the **View Domain** task for the domain System Auditing.
1. Select **Domain > Edit Security Policy Permissions** from the **System Auditing** related **Actions** menu.
1. Add the SumoLogic Client Security Group you created to both the tables as below:
    * **Report/Task Permissions table.** View access.
    * **Integration Permissions table**. Get access.
1. Click **OK**.
1. To apply policy changes, access the **Activate Pending Security Policy Changes** task and activate the changes you made.
1. Click **OK**.

### Step 1.3: Register the API Client

1. To register the API client, access the **Register API Client** **for Integrations** task, and provide the following parameters:
    * **Client Name.** Sumo Logic Workday Collector
    * **Non-Expiring Refresh Tokens.** Yes.
    * **Scope.** System.
2. Click **OK**.
3. Copy the **Client Secret** and **Client ID** before you navigate away from the page and store it securely. If you lose the **Client Secret**, you can generate a new one using the **Generate New API Client Secret** task.
4. Click **Done**.
5. To generate a refresh token, access the **View API Clients** task and copy the below two parameters from the top of the page:
    * **Workday REST API Endpoint.** The endpoint to use access to the resources in your Tenant.
    * **Token Endpoint**. The endpoint used to exchange an authorization code for a token (if you configure authorization code grant).
6. Go to the **API Clients for Integrations** tab, hover on the **“Sumo Logic Workday Collector API”** client, and click on the three-dot kebab action buttons.
7. In the new pop up window, click **API Client** > Manage Refresh Token for Integrations.
8. In the **Manage Refresh Token for Integrations** window, select **“SumoLogic_ISU”** in the **Workday Account** field and click **OK**.
9. In the newly opened window, select **Generate New Refresh Token** checkbox and click **OK**.
10. Copy the value of the **Refresh Token** column from the opened window and click **Done**.

### Step 1.4: Enable your tenant to send data

1. To enable your Tenant to send data, access the **Edit Tenant Setup - System** task and ensure that the **Enable User Activity Logging** checkbox is selected.
2. Access the **Edit Tenant Setup - Security** task and ensure that the **OAuth 2.0 Clients Enabled** checkbox is selected.

### Step 1.5: Create a Custom sign on report

For customers that do not make use of the Recruiting Functional Area, the standard Candidate Signon report may not be available. The alternative is to create a new custom report with **Data Source = “All System Account Signons”** and **Data Source Filter** = **“Workday System Account Signons in Range”**. You can configure the fields using [Excel](https://appdev-readme-resources.s3.amazonaws.com/Workday/Signons_and_Attempted_Signons_-_Copy.xlsx).

1. Go to **Copy Standard Report to Custom Report** task to create a Customs SignOn Report.
2. Select **Candidate Signons and Attempted Signons** in **Standard Report** **Name** dropdown and click **OK**.
3. In the new window, select **Optimized for Performance** checkbox, edit the report **Name** to **Custom Signons and Attempted Signons Report** and click **OK**.
4. In the next window, edit the **Data Source Filter** field and select **Workday System Account Signons in Range** filter.
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
    * Device is Trusted
6. Remove the text in the **Column Heading Override** column, for **Field > Session ID** and **Field > System Account**. After configuring all the fields you can verify all the fields using the [Excel](https://appdev-readme-resources.s3.amazonaws.com/Workday/Signons_and_Attempted_Signons_-_Copy.xlsx).
7. If you're configuring the [Cloud-to-Cloud Collector Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/workday-source/), Go to the **Prompts** tab and look for the **Do Not Prompt at Runtime** column under the **Prompts Defaults** table. Make sure that checkboxes are disabled for the **From_Moment** and **To_Moment** rows.
  <img src={useBaseUrl('img/integrations/saas-cloud/Workday-SignOn-Report-Prompts-Tab.png')} alt="workday custom sign-on report prompt tab" style={{border: '1px solid gray'}} />
8. Go to the **Advanced** tab and click the **Enable As Web Service** checkbox under **Web Service Options**.
9. Go to the **Share** tab, enable **Share with specific users and groups** option, add **SumoLogic_ISU** in the **Authorized Users** field, and click **OK**.
10. Click **Done**. You can also test it by clicking the **Run** button.
11. To get the Report URL, search for **Custom Signons and Attempted Signons Report** in the search bar and run the report.
12. Click the **Actions** button and go to **Web Service > View URLs**.
13. Click **OK** and copy the URL from **JSON** link. You will need this later while configuring the collection. From the URL, remove any query parameters like json, From Moment and To Moment. The report URL should look like this `https://wd2-impl-services1.workday.com/ccx/service/customreport2/<tenant>/<accountname>/<reportname>`.

### Step 2: Add a Hosted Collector and HTTP Source

:::note
This step is not needed if you're configuring the [Cloud-to-Cloud Collector Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/workday-source/).
:::

In this step, you create a hosted collector and HTTP source to receive data from the scripts that collect data from your Workday tenant.

1. Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector), or select an existing hosted collector for the HTTP source.
2. Configure an [HTTP source](/docs/send-data/hosted-collectors/http-source/logs-metrics) on the hosted collector.

Make a note of the HTTP address for the source. You will need it when you configure the collection for the Workday scripts in the next step.


### Step 3: Configure Collection for Workday

See [Workday Cloud-to-Cloud Collector Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/workday-source). This is where you'll configure collection of login and audit logs from Workday and send them to Sumo Logic.

## Installing the Workday app

This section provides instructions on how to install the Workday app, as well as examples of each of the dashboards. The app's pre-configured searches and dashboards provide easy-to-access visual insights into your data.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

## Viewing Workday dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Workday - Overview** dashboard provides an at-a-glance view of the security posture of your Workday instance. Panel identify login activity, user activity, and activity from untrusted devices or users with failed logins. It also helps you in monitoring failed logins by devices and the recent activities from untrusted devices.

Use this dashboard to:
* To quickly identify anomalous increases in total and failed logins.
* Monitor recent user activities from untrusted devices and users with multiple failed login attempt to determine the extent of a potential breach.
* Quickly identify if users are logging in from expected locations and using supported devices.

<img src={useBaseUrl('img/integrations/saas-cloud/Workday-Overview.png')} alt="workday dashboards" />

### Login Activity

The **Workday - Login Activity** dashboard provides detailed insights into login summary, trends, and malicious activities. Panel also displays recent login activity and details of devices and browsers used to login to the Workday portal.

Use this dashboard to:
* Identify login requests received from malicious remote IPs and untrusted devices.
* Quickly identify if users are logging in from expected locations and using devices supported by your IT teams.
* Get insight into trends around login events to determine the times of day your Workday instance is being used the most.
* Quickly identify if there are an unusually high number of failed logins.

<img src={useBaseUrl('img/integrations/saas-cloud/Workday-Login-Activity.png')} alt="workday dashboards" />

### User Activity

The **Workday - User Activity** dashboard provides detailed insight into all user activity and potential suspicious activities in your Workday instance.

Use this dashboard to:
* Monitor if Workday tasks executed by users are according to expectations.
* Get insights into CRUD(Create/Read/Update/Delete) and download activity Quickly identify if login and user activity are originating from known malicious IP addresses.

<img src={useBaseUrl('img/integrations/saas-cloud/Workday-User-Activity.png')} alt="workday dashboards" />

### System User Activity

The **Workday - System User Activity** dashboard monitors the system user activities. Panels also identify all configuration changes related to domain security, business processes, security groups, and API client modules.

Use this dashboard to:
* Identify if key configuration changes are in line with expectations.
* Identify changes related to permission and role assignments.

<img src={useBaseUrl('img/integrations/saas-cloud/Workday-SystemUserActivity.png')} alt="workday dashboards" />

### API Activity

The **Workday - API Activity** dashboard gives you insight into all analytics for REST API calls and web service related authentications and monitors access attempts from known malicious IP addresses.

<img src={useBaseUrl('img/integrations/saas-cloud/Workday-APIActivity1.png')} alt="workday dashboards" />

API activity dashboard populates if there is any API activity happening on in their tenant, may be there isn't any workday rest apis (not SOAP) they are using. They can verify this by going to the User Activity report in their workday tenant and running the report with following filters

Task contains api/ and System Account not equal to SumoLogic_ISU.

Use this dashboard to:

* Monitor API related read, write, and other activities to ensure they match the expectations.
* Quickly identify any API requests originating from malicious IP addresses.
* Identify if API requests are being received from devices not supported by your IT teams.

<img src={useBaseUrl('img/integrations/saas-cloud/Workday-APIActivity.png')} alt="workday dashboards" />

## Upgrade/Downgrade the Workday app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Workday app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
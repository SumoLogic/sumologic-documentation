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

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Workday](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/workday-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Workday app is properly integrated and configured to collect and analyze your Workday data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing the Workday dashboards

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
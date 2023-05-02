---
id: workday-source
title: Workday Source
sidebar_label: Workday
description: The Sumo Logic source integration for Workday facilitates retrieving sign-on logs and activity logs from the Workday API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/workday.png')} alt="Thumbnail icon" width="50"/>

Workday is a cloud-based enterprise resource planning (ERP) system that enables organizations to manage their financial, human resources, payroll, and procurement processes in one central platform. It offers a range of features such as analytics, reporting, and workflow automation to help businesses make informed decisions and streamline their operations. Workday is a comprehensive solution for businesses looking to improve their efficiency, productivity, and financial management.

The Sumo Logic source integration for Workday facilitates retrieving sign-on logs and activity logs from the Workday API.

## Data Sources

The Workday integration ingests the user activity logs and sign-on activity reports from the Workday API and sends data to Sumo Logic.
* **Activity Logs**. Contains audit information about user activities.
* **Sign On Logs**. The logs of successful and unsuccessful sign-on attempts in the Workday system.

## Metadata Fields

Metadata fields will be set if the integration is configured with the SIEM forward option. See the **Metadata Fields** table below:

| Field Name | Value |
| :--- | :--- |
| `_siemVendor` | Workday |
| `_siemProduct` | Workday |
| `_siemFormat` | JSON |
| `_parser` | /Parsers/System/Workday/Workday |


## States

The Workday Source tracks errors and reports its health and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

The Workday Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source has successfully authenticated with Workday.
1. **Collecting**. The Source is actively collecting data from Workday.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

![Health and Status columns.png](/img/send-data/workday-error-state.jpg)

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources are displayed. Use [Health Events](/docs/manage/health-events.md) to investigate collection issues. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings. You can click on the status icon to open a Health Events panel with details on each detected issue.

![error status.png](/img/send-data/health-error-generic.png)


## Create a Workday Source

When you create a Citrix Cloud Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

:::note
The steps below assume that you have already configured in [Step 1 of this page](/docs/integrations/saas-cloud/workday#step-1-configure-the-workday-portal). You will copy and paste configurations from those steps in this source.
:::

To configure a Workday Source, follow the steps below:

1. In Sumo Logic, select **Manage Data > Collection > Collection page**.
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **Workday**.

  ![img](/img/send-data/workday-icon.jpg)

4. Enter a **Name** to display for the Source in the Sumo Logic web application. The **description** is optional.

  <img src={useBaseUrl('img/send-data/workday-source.png')} alt="workday-source" width="450"/>

5. For **Source Category** (Optional), enter any string to tag the output collected from the Source. Category [metadata](https://help.sumologic.com/docs/search/get-started-with-search/search-basics/built-in-metadata/) is stored in a searchable field called `_sourceCategory`.

6. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](https://help.sumologic.com/docs/cse/). When configured with the **Forward to SIEM** option the following metadata fields are set automatically by the integration (Do not include the below fields as custom log metadata Fields):
   * `_siemVendor`: Workday
   * `_siemProduct`: Workday
   * `_siemFormat`: JSON
   * `_siemEventID`: SignOnLogs or ActivityLogs

7. **Fields** (Optional). Click the **+Add** field link to define the fields you want to associate. Each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

8. **SignOn Report URL**. Paste the SignOn Report URL from [Step 1.5](/docs/integrations/saas-cloud/workday.md#step-15-create-a-custom-sign-on-report).

9. **Integration System User Name**. Name of the account (SumoLogic_ISU) created in [Step 1.1](/docs/integrations/saas-cloud/workday.md#step-11-create-an-integration-system-user).

10. **Integration System User Password**. The password of the account created in [Step 1.1](/docs/integrations/saas-cloud/workday.md#step-11-create-an-integration-system-user).

11. **Refresh Token URL**. Paste the Token endpoint copied from [Step 1.3](/docs/integrations/saas-cloud/workday.md#step-13-register-the-API-client).

12. **Client ID**. Paste the Client ID copied from [Step 1.3](/docs/integrations/saas-cloud/workday.md#step-13-register-the-API-client).

13. **Client Secret**. Paste the Client Secret copied from [Step 1.3](/docs/integrations/saas-cloud/workday.md#step-13-register-the-API-client).

14. **Refresh Token**. Paste the generated Refresh Token copied from [Step 1.3](/docs/integrations/saas-cloud/workday.md#step-13-register-the-API-client).

15. **REST API URL**. Take the Workday Rest API endpoint copied in [Step 1.3](/docs/integrations/saas-cloud/workday.md#step-13-register-the-api-client) and modify it to match the format `https://<host>/ccx/api/privacy/v1/<tenant>/activityLogging`. Provide the modified URL here.

16. **Collection Should begin** (Optional). Select the time range for how far back you want this source to start collecting data from Workday. This is set to **24 Hours ago** by default.

17. **Polling Interval** (Optional). Select how often you want the Source to collect data from Workday. This is set to 10 minutes by default.

18. When you are finished configuring the Source, click **Save**.

### Polling Interval and Workday API rate limits

During each polling interval, the Workday Source will make a REST API request to fetch audit activity logs and another request to the RAAS API to fetch the SignOn logs. The REST API can fetch a maximum of 1000 records at a time and the RAAS API has a limit of 2GB. We recommend you set polling intervals of 10 mins. 

### Error Types

When Sumo Logic detects an issue it is tracked by [Health Events](/docs/manage/health-events.md). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally on account of invalid configuration. You will need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry indefinitely. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry indefinitely. | FirstPartyGenericError |

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/cse). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config        | JSON Object | Yes          | Contains the [configuration parameters](#config-parameters) for the Source. |                |
| schemaRef     | JSON Object | Yes          | Use {“type”: “Workday”} for Workday Source.                                                 | not modifiable |
| sourceType    | String      | Yes          | Use Universal for Workday Source. | not modifiable |

### Config Parameters

The following table shows the **config** parameters for Workday Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `signOnReportURL` | String | Yes |  | The URL which will be used to fetch. sign-on activity logs | modifiable |
| `isuUsername` | String | Yes | | Username of the integration system user. | modifiable |
| `isuPassword` | String | Yes | | Password of the integration system user.  | modifiable  |
| `refreshTokenURL` | String | Yes |  | The URL which will be used to fetch access token. | modifiable |
| `clientID` | String  | Yes |  | A client ID from the Workday API client. | modifiable |
| `clientSecret` | String  | Yes |  | A client secret from the Workday API client. | modifiable |
| `refreshToken` | String | Yes |  |  A non-expiring refresh token from the Workday API client. | modifiable |
| `restApiURL`  | String | Yes |  | The URL which will be used to fetch activity logs. | modifiable |
| `backfillDays` | Integer | No | 24 Hours ago(1) | How far back the integration should collect the data from the Workday. <br /> Options: Now(0) or 24 hours ago(1). | modifiable |
| `pollingIntervalMinutes` | Integer | No | 10 | How frequently the integration should poll to Workday. <br /> Options: 10m, 15m, 30m, 1h, 24h. | modifiable |

### Workday Source JSON example

```json
{
  "api.version": "v1",
  "source": {
    "config": {
      "name": "Workday Test",
      "description": "Testing the workday source",
      "category": "General",
      "signOnReportURL": "https://wd2-impl-services1.workday.com...-_Copy",
      "isuUsername": "SumoLogic",
      "isuPassword": "**********",
      "refreshTokenURL": "https://wd2-impl-services1.workday.com...token",
      "clientID": "sldfsjdflk230sdflnk2342cxcoijs0",
      "clientSecret": "**********",
      "refreshToken": "**********",
      "restApiURL": "https://wd2-impl-services1.workday.com...activityLogging",
      "backfillDays": 1,
      "pollingIntervalMinutes": 10
    },
    "schemaRef": {
      "type": "Workday"
    },
    "sourceType": "Universal"
  }
}
```

## Troubleshooting

After you configure your Source, you should check the status of the
source in the Collectors page.

If the Source is not functioning as expected, you may see an error next to the Source Category column as shown below: 

![troubleshooting.png](/img/send-data/workday-troubleshooting.png)

The following section details how you can resolve various errors.

#### Error 401 | Client Error: invalid username or password

To resolve this:
1. Check if you have such an authentication policy enabled. If by default your users' login via SSO then you may have to exclude the ISU Security Group to allow it to use username and password by creating a separate authentication policy.
1. Try changing the Session Timeout Minutes to 0 as shown in the article https://www.sora.co/help/configuring-your-workday-integration.
1. Exempt user from password expiration as shown in the article https://www.sora.co/help/configuring-your-workday-integration.

Below is the section for common errors for **Activity Logs**.

#### Error 403 | Forbidden: permission denied
- Token will be generated successfully in this case but Activity Logs API will return 403 forbidden error.
- This is due to `System scope` is not provided to the API client.

To resolve this:
1. Enable the `System scope`. Refer to the [Workday App > API Client](/docs/integrations/saas-cloud/workday/#step-13-register-the-api-client) section.

#### Error 401 | Unauthorized: invalid_client
- Invalid client id or client secret is provided.
- A new client secret is generated, making the existing one invalid.
- The `OAuth 2.0 Clients Enabled` checkbox under the Edit Tenant Setup - Security task is disabled.

To resolve this:
1. Provide the correct "client id" and "client secret".
1. Enable the `The OAuth 2.0 Clients Enabled` checkbox. Refer to the [Workday App > OAuth 2.0 Clients Enabled](/docs/integrations/saas-cloud/workday/#step-14-enable-your-tenant-to-send-data) section.


#### Error 400 | Bad Request: invalid_grant
- An invalid or expired refresh token is provided.
- Existing token is deleted or a new one is generated hence making the existing one invalid.

To resolve this:
1. Generate a new refresh token and update the C2C configuration.

#### Error 400 |  Bad Request: invalid_request
- An invalid tenant name is provided in the token URL.

To resolve this:
1. Provide the correct "tenant name".

#### Error 404 |  Not Found: invalid_request
- An invalid path parameter is provided in the token URL. For example, `/oauth/` instead of `/oauth2/`.

To resolve this:
1. Provide the correct "token URL".

#### Error 404 |  Not Found: invalid_request
- An invalid path parameter is provided in the Activity Logs URL. For example, `/v2` instead of `/v1`.

To resolve this:
1. Provide the correct "Activity Logs URL".

#### Error | 503: Service Unavailable
- An invalid tenant name is provided in the Activity Logs URL.
- An invalid hostname is provided in the token or Activity Logs URL. For example, `wd5-impl-services1.workday.com` instead of `wd2-impl-services1.workday.com`.

To resolve this:
1. Provide the correct "tenant name" and "hostname".                  

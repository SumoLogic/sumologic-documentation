---
id: workday-source
title: Workday Source
sidebar_label: Workday
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When you create a Workday Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

:::note
The steps below assume that you have already configured in [Step 1 of this page](/docs/integrations/saas-cloud/workday#step-1-configure-the-workday-portal). You will copy and paste configurations from those steps in this source.
:::

To configure a Workday Source:

1. On the **Manage Data > Collection > Collection** page, click **Add Source** next to a Hosted Collector.

1. Select **Workday**.

  ![img](/img/send-data/workday-icon.jpg)

1. Enter a **Name** for the Source in the Sumo Logic console. The description is optional.

  <img src={useBaseUrl('img/send-data/workday-source.jpg')} alt="workday-source" width="450"/>

1. For **Source Category** (Optional), enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called _sourceCategory.

1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](/docs/cse). When configured with the **Forward to SIEM** option the following metadata fields are set automatically by the integration (Do not include below fields as custom log metadata Fields):

   * `_siemVendor`: Workday
   * `_siemProduct`: Workday
   * `_siemFormat`: JSON
   * `_siemEventID`: SignOnLogs or AuditLogs

1. **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. **SignOn Report URL**: Paste the signon report url from [Step 1.5](/docs/integrations/saas-cloud/workday#step-1-5-create-a-custom-sign-on-report).

1. **Integration System User Name**: Name of the account created in [Step 1.1](/docs/integrations/saas-cloud/workday#step-1-1-create-an-integration-system-user).

1. **Integration System User Password**: Paste the SumoLogic_ISU account password copied from [Step 1.1](/docs/integrations/saas-cloud/workday#step-1-1-create-an-integration-system-user).

1. **Workday Rest API Endpoint**: Paste the Workday Rest API endpoint copied from [Step 1.3](/docs/integrations/saas-cloud/workday#step-1-3--register-the-API-client).

1. **Workday Refresh Token Endpoint**: Paste the Workday Rest API endpoint copied from [Step 1.3](/docs/integrations/saas-cloud/workday#step-1-3-register-the-API-client).

1. **Client ID:** Paste the API Client ID copied from [Step 1.3](/docs/integrations/saas-cloud/workday#step-1-3-register-the-API-client).

1. **Client Secret**: Paste the API Client SECRET copied from [Step 1.3](/docs/integrations/saas-cloud/workday#step-1-3-register-the-API-client).

1. **Refresh Token**:  Paste the generated Refresh token copied from [Step 1.3](/docs/integrations/saas-cloud/workday#step-1-3-register-the-API-client).

1. **Collection Should begin** - Select the time range for how far back you want this source to start collecting data from Workday. Options available are: **Now**, **24 hours ago**.

15. **Polling Interval** (Optional)**:** Enter how often you want the Source to collect data from Workday. This is set to 10 minutes by default.

16. When you are finished configuring the source, click **Submit**.

### Polling Interval and Workday API rate limits

During each polling interval, the Workday Source will make a REST API request to fetch audit activity logs and another request to the RAAS API to fetch the Signon logs. The REST API can fetch a maximum of 100 records at a time and the RAAS API has a limit of 2GB. We recommend you do not set the polling interval below 10 min. 

## States

The Workday Source reports errors, its health, and initialization status. Other than indicating that the source is healthy, you are also informed, in real-time, if the source is running into trouble communicating with Workday REST API, or if there's an error that requires user action indicated by [Sumo Logic Health Events](/docs/manage/health-events.md).

A Workday Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, details are stored, and the source is placed in a **Pending** state.

1. **Started**. A collection task is created on the hosted collector.

1. **Initialized**. Task configuration is complete in Sumo Logic.

1. **Authenticated**. The Source has successfully authenticated with Workday

1. **Collecting**. The Source is actively collecting data from Workday.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

![Health and Status columns.png](/img/send-data/workday-error-state.jpg)

Hover your mouse over the status icon to view a tooltip with details on
the detected issue.

![error status.png](/img/send-data/health-error-generic.png)

When you delete the source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the [Health](/docs/manage/health-events#collection-page) and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection.

### Error types

When Sumo Logic detects an issue it is tracked by [Health Events](/docs/manage/health-events.md). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally on account of invalid configuration. You will need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/cse). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config        | JSON Object | Yes          | Contains the [configuration parameters](#config-parameters) for the Source. |                |
| schemaRef     | JSON Object | Yes          | Use {"type":"Salesforce"} for Workday Source.                                                 | not modifiable |
| sourceType    | String      | Yes          | Use Universal for Workday Source. | not modifiable |

#### Config Parameters

The following table shows the **config** parameters for Workday Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `isu_password` | String | Yes |  | Type the workday ISU account password for the username  | modifiable  |
| `isu_username` | String | Yes | Type integration system user account  name  | modifiable |
| `backfill_days` | String | No |  Now | Type the collection start time  | modifiable |
| `polling_interval_minutes` | Integer | No | 10 | This sets how often the Source checks for new data The unit is in minutes. | modifiable |
| `client_id` | String  | Yes |  | Type in   the API Client ID  | modifiable |
| `client_secret` | String  | Yes |  | Type in  the API Client Secret  | modifiable |
| `refresh_token` | String | Yes |  |  Type in the generated token endpoint  | modifiable |
| `signon_report_url` | String | Yes |  | Type in the signon report url  | modifiable |
| `Workday_rest_api_endpoint`  | String | Yes |  | Type in the Workday Rest API endpoint  | modifiable |
| `Refresh_token_endpoint` | String | Yes |  | Type in the Workday Rest API Token endpoint  | modifiable |

Workday Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "config":{
      "name":"testWorkdaySource",
      "polling_interval_minutes":10,
      "refresh_token":"********",
      "workday_rest_api_endpoint":"https://wd2-impl-services1.workday.c...sumologic_dpt1",
      "refresh_token_endpoint":"https://wd2-impl-services1.workday.c...gic_dpt1/token",
      "client_id":"NTkzOWFkMjctY2QxNS00MDZiLTg2MWQtMjNiNzBiYzAxNTNk",
      "isu_username":"SumoLogic",
      "fields":{
        "_siemForward":false
      },
      "signon_report_url":"https://wd2-impl-services1.workday.c...Signons_-_Copy",
      "category":"workday_logs",
      "isu_password":"********",
      "client_secret":"********",
      "backfill_days":0
    },
    "schemaRef":{
      "type":"Workday"
    },
    "state":{
      "state":"Pending"
    },
    "sourceType":"Universal"
  }
}
```

## Troubleshooting

After you configure your Source, you should check the status of the
source in the Collectors page. In case the Source is not functioning as
expected, you may see an error next to the Source Category column as
shown below: 

![troubleshooting.png](/img/send-data/workday-troubleshooting.png)

The following section details how you can resolve various errors: 

**Error:**  401 Client Error: 401: invalid username or password

To resolve this:

1. Check if you have such an authentication policy enabled. If by default your users' login via SSO then you may have to exclude the ISU Security Group to allow it to use username and password by creating a separate authentication policy.
1. Try changing the Session Timeout Minutes to 0 as shown in the article https://www.sora.co/help/configuring-your-workday-integration.
1. Exempt user from password expiration as shown in the article https://www.sora.co/help/configuring-your-workday-integration.

---
id: workday-source
title: Workday Source
sidebar_label: Workday
tags:
  - cloud-to-cloud
  - workday
description: The Sumo Logic source integration for Workday facilitates retrieving sign-on logs and activity logs from the Workday API.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/workday/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/workday/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/workday/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import CollBegin from '../../../reuse/collection-should-begin-note.md';

<img src={useBaseUrl('img/integrations/saas-cloud/workday.png')} alt="Thumbnail icon" width="50"/>

Workday is a cloud-based enterprise resource planning (ERP) system that enables organizations to manage their financial, human resources, payroll, and procurement processes in one central platform. It offers a range of features such as analytics, reporting, and workflow automation to help businesses make informed decisions and streamline their operations. Workday is a comprehensive solution for businesses looking to improve their efficiency, productivity, and financial management.

The Sumo Logic source integration for Workday facilitates retrieving sign-on logs and activity logs from the Workday API.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 10 mins |  Activity Logs |
| 10 mins |  Sign On Logs |

## Setup

### Vendor configuration

The steps below assume that you have already configured in [Step 1 of this page](/docs/integrations/saas-cloud/workday#step-1-configure-the-workday-portal). You will copy and paste configurations from those steps in this source.

### Source configuration

When you create a Citrix Cloud Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Workday Source, follow the steps below:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select for and select **Workday**.
4. Enter a **Name** to display for the Source in the Sumo Logic web application. The **description** is optional.
5. For **Source Category** (Optional), enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata/) is stored in a searchable field called `_sourceCategory`.
6. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
7. **Fields** (Optional). Click the **+Add** field link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
8. **SignOn Report URL**. Paste the SignOn Report URL from [Step 1.5](/docs/integrations/saas-cloud/workday.md#step-15-create-a-custom-sign-on-report).
9. **Integration System User Name**. Name of the account (SumoLogic_ISU) created in [Step 1.1](/docs/integrations/saas-cloud/workday.md#step-11-create-an-integration-system-user).
10. **Integration System User Password**. The password of the account created in [Step 1.1](/docs/integrations/saas-cloud/workday.md#step-11-create-an-integration-system-user).
11. **Refresh Token URL**. Paste the Token endpoint copied from [Step 1.3](/docs/integrations/saas-cloud/workday/#step-13-register-the-api-client).
12. **Client ID**. Paste the Client ID copied from [Step 1.3](/docs/integrations/saas-cloud/workday/#step-13-register-the-api-client).
13. **Client Secret**. Paste the Client Secret copied from [Step 1.3](/docs/integrations/saas-cloud/workday/#step-13-register-the-api-client).
14. **Refresh Token**. Paste the generated Refresh Token copied from [Step 1.3](/docs/integrations/saas-cloud/workday/#step-13-register-the-api-client).
15. **REST API URL**. Take the Workday Rest API endpoint copied in [Step 1.3](/docs/integrations/saas-cloud/workday/#step-13-register-the-api-client) and modify it to match the format `https://<host>/ccx/api/privacy/v1/<tenant>/activityLogging`. Provide the modified URL here.
16. **Collection Should begin** (Optional). Select the time range for how far back you want this source to start collecting data from Workday. This is set to **24 Hours ago** by default.
  :::note
  <CollBegin/>
  :::
17. **Polling Interval** (Optional). Select how often you want the Source to collect data from Workday. This is set to 10 minutes by default.
18. When you are finished configuring the Source, click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Workday` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Workday` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_parser` | `/Parsers/System/Workday/Workday` | |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Workday"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| signOnReportURL | String | Yes | `null` | The URL which will be used to fetch. sign-on activity logs |  |
| isuUsername | String | Yes | `null` | Username of the integration system user. |  |
| isuPassword | String | Yes | `null`| Password of the integration system user.  |   |
| refreshTokenURL | String | Yes | `null` | The URL which will be used to fetch access token. |  |
| clientID | String  | Yes | `null` | A client ID from the Workday API client. |  |
| clientSecret | String  | Yes | `null` | A client secret from the Workday API client. |  |
| refreshToken | String | Yes | `null` |  A non-expiring refresh token from the Workday API client. |  |
| restApiURL  | String | Yes | `null` | The URL which will be used to fetch activity logs. |  |
| backfillDays | Integer | No | 24 Hours ago(1) | How far back the integration should collect the data from the Workday. <br /> Options: Now(0) or 24 hours ago(1). |  |
| pollingIntervalMinutes | Integer | No | 10 | How frequently the integration should poll to Workday. <br /> Options: 10m, 15m, 30m, 1h, 24h. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/workday/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/workday/example.tf" target="_blank">Download example</a>

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
1. Configure the user login to skip security questions, if any.

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

#### Error | received sign-on report log time outside time filter window. create a custom sign on report as per the setup instructions
- Custom sign on report is not created as per the instructions

To resolve this, [Create a Custom Sign on Report](/docs/integrations/saas-cloud/workday/#step-15-create-a-custom-sign-on-report) and configure the source accordingly.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

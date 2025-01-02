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

### Prerequisite

These instructions assume that the Security Administrator, System Auditor, and Report Administrator security groups are assigned to the user who will be configuring data collection in the Workday portal. Make sure the account used does not belong to an employee otherwise custom reports created by the user may no longer be available when they leave the organization.

Sumo Logic collects logs from Workday via a script that calls the Workday APIs. As part of the script configuration, you need to first configure log types that need to be collected, and these logs are then forwarded to Sumo Logic’s HTTPS source.

By default, the collection starts from the current date and time, but this setting is also configurable.

### Vendor configuration

This section demonstrates how to configure the Workday portal to integrate with Sumo Logic’s collection scripts. Configuring the Workday portal involves the following steps:

#### Step 1: Create an Integration System User

1. Access the **Create Integration System User** task and provide the following parameters:
    * **User Name.** SumoLogic_ISU.
    * **New Password and New Password Verify.** Enter the password.
    * **Do Not Allow UI Sessions.** Check the box.
    * **Session Timeout Minutes.** 0 (Disable session expiration).
2. Click **OK**.
3. Exempt the created user from the password expiration rule.
    * Access **Maintain Password Rules** task.
    * Add the users to **System Users exempt from password expiration**.

#### Step 2: Create a Security Group

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

#### Step 3: Register the API Client

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

#### Step 4: Enable your tenant to send data

1. To enable your Tenant to send data, access the **Edit Tenant Setup - System** task and ensure that the **Enable User Activity Logging** checkbox is selected.
2. Access the **Edit Tenant Setup - Security** task and ensure that the **OAuth 2.0 Clients Enabled** checkbox is selected.

#### Step 5: Create a Custom sign on report

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
8. **SignOn Report URL**. Paste the SignOn Report URL from the [Vendor configuration: Step 5](#step-5-create-a-custom-sign-on-report).
9. **Integration System User Name**. Name of the account (SumoLogic_ISU) created in [Vendor configuration: Step 1](#step-1-create-an-integration-system-user).
10. **Integration System User Password**. The password of the account created in [Vendor configuration: Step 1](#step-1-create-an-integration-system-user).
11. **Refresh Token URL**. Paste the Token endpoint copied from [Vendor configuration: Step 3](#step-3-register-the-api-client).
12. **Client ID**. Paste the Client ID copied from [Vendor configuration: Step 3](#step-3-register-the-api-client).
13. **Client Secret**. Paste the Client Secret copied from [Vendor configuration: Step 3](#step-3-register-the-api-client).
14. **Refresh Token**. Paste the generated Refresh Token copied from [Vendor configuration: Step3](#step-3-register-the-api-client).
15. **REST API URL**. Take the Workday Rest API endpoint copied in [Vendor configuration: Step 3](#step-3-register-the-api-client) and modify it to match the format `https://<host>/ccx/api/privacy/v1/<tenant>/activityLogging`. Provide the modified URL here.
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
1. Enable the `System scope`. Refer to the [Workday App > API Client](#step-3-register-the-api-client) section.

#### Error 401 | Unauthorized: invalid_client
- Invalid client id or client secret is provided.
- A new client secret is generated, making the existing one invalid.
- The `OAuth 2.0 Clients Enabled` checkbox under the Edit Tenant Setup - Security task is disabled.

To resolve this:
1. Provide the correct "client id" and "client secret".
1. Enable the `The OAuth 2.0 Clients Enabled` checkbox. Refer to the [Workday App > OAuth 2.0 Clients Enabled](#step-4-enable-your-tenant-to-send-data) section.


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

To resolve this, [Create a Custom Sign on Report](#step-5-create-a-custom-sign-on-report) and configure the source accordingly.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

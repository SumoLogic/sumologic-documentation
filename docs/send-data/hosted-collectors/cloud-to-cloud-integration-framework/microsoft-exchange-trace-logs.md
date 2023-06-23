---
id: microsoft-exchange-trace-logs
title: Microsoft Exchange Trace Logs
sidebar_label: Microsoft Exchange Trace Logs
description: The Microsoft Exchange Trace Logs Source collects email trace logs from the Office 365 reporting web service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/microsoft-exchange-logo.svg')} alt="icon" width="150"/>

The Microsoft Exchange Trace Logs Source collects email trace logs from the Office 365 reporting web service via the MessageTrace report under “Exchange reports”. Specific API reference information can be found [here](https://learn.microsoft.com/en-us/previous-versions/office/developer/o365-enterprise-developers/jj984335(v=office.15)).

:::note
This Source is available in the [Fed deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## States

A Microsoft Exchange Trace Logs Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Microsoft Exchange Trace Logs Source goes through the following states when
created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Microsoft.
1. **Collecting**. The Source is actively collecting data from Microsoft.

If the Source has any issues during any one of these states, it is placed in an **Error** state.
When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.
Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.
You can click on the status icon to open a Health Events panel with details on each detected issue.

## Set up Access in Azure

This source requires you to register an application within Azure Active Directory, generate a client secret, give permissions and generate an Oauth 2.0 authorization code. Follow the directions below within your Azure environment.

### Register into Azure Application

An Azure application with specific permissions is required for Sumo Logic to access your Exchange Trace logs from Office 365. You need a subscription to Office 365 and a subscription to Azure that has been associated with your Office 365 subscription to set up this collection.

1. Sign in to your Azure Portal with your administrator account at https://portal.azure.com
2. Use the left navigation pane (might be hidden under the menu icon) and select **Azure Active Directory**. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-app-reg-step-2.png')} alt="ms-exchange-app-reg-step-2.png" width="400" />
3. You will see a menu of options for your Azure Active Directory on the left. Click **App registrations**. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-app-reg-step-3.png')} alt="ms-exchange-app-reg-step-3.png" width="300" />
4. Click **New registration** <br/> <img src={useBaseUrl('img/send-data/ms-exchange-app-reg-step-4.png')} alt="ms-exchange-app-reg-step-4.png" width="550" />
5. Enter the required information as shown in the screenshot. Click **Register**. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-app-reg-step-5.png')} alt="ms-exchange-app-reg-step-5.png" width="600" />
6. You are redirected to the overview page of your newly created application. Take note of the **Application (client) ID** and the **Directory (tenant) ID** as they will be required later. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-app-reg-step-6.png')} alt="ms-exchange-app-reg-step-6.png" width="500" />

### Create Client Secret

1. Within your Azure application setup on the **App Registration** page, click **Certificates & secrets** from the left navigation pane and then click **New client secret**. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-client-secret-step-1.png')} alt="ms-exchange-client-secret-step-1.png" width="700" />
2. A right pane will slide out asking for a description and expiration for the secret. This secret is used by Sumo Logic to connect via OAuth 2.0 to establish continuous access to your Exchange Trace logs with an auto generated refresh token. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-client-secret-step-2.png')} alt="ms-exchange-client-secret-step-2.png" width="550" />
3. Take note of the hidden value displayed on this page. After leaving this page, you will no longer be able to see this value from Azure. We recommend storing it in a protected password management vault. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-client-secret-step-3.png')} alt="ms-exchange-client-secret-step-3.png" width="700" />

### Assign Azure Roles to Your Application

The Azure roles Global Reader and Security Reader are required for your Azure application to collect your Exchange Trace Logs.

1. Click back on the main left navigation using the menu in the upper left corner of the screen and go back to the Azure Active Directory page. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-azure-roles-step-1.png')} alt="ms-exchange-azure-roles-step-1.png" width="400" />
2. Click **Roles and Administrators** in the left pane navigation of your Azure Active Directory page. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-azure-roles-step-2.png')} alt="ms-exchange-azure-roles-step-2.png" width="400" />
3. Search for the name Global Reader in the filter search bar and click **Global Reader** role text. Be sure to not click the checkbox next to **Global Reader** and instead click on the text name with the checkbox deselected. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-azure-roles-step-3.png')} alt="ms-exchange-azure-roles-step-3.png" width="400" />
4. Click **Add assignments** for the Global Reader.  <br/> <img src={useBaseUrl('img/send-data/ms-exchange-azure-roles-step-4.png')} alt="ms-exchange-azure-roles-step-4.png" width="350" />
5. **Add assignments** pane on the right allows you to search for your Azure application to assign the rights. Search for your application, select it and click **Add**. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-azure-roles-step-5.png')} alt="ms-exchange-azure-roles-step-5.png" width="450" />
6. Click **Roles and administrators|All roles** at the top of the page to view a full list of roles. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-azure-roles-step-6.png')} alt="ms-exchange-azure-roles-step-6.png" width="700" />
7. Update your filter to Security Reader and click **Security Reader** text. Be sure to not click the checkbox next to **Security Reader** and instead click on the text name with the checkbox deselected. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-azure-roles-step-7.png')} alt="ms-exchange-azure-roles-step-7.png" width="500" />
8. Click **Add assignments** for the Security Reader. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-azure-roles-step-8.png')} alt="ms-exchange-azure-roles-step-8.png" width="500" />
9. Similar to the previous step, search and add the Azure application the role. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-azure-roles-step-9.png')} alt="ms-exchange-azure-roles-step-9.png" width="500" />

### Grant API Permissions

We now need to grant specific API permissions to allow your Azure application access to the reports API.

1. Click back on the main left navigation using the menu in the upper left corner of the screen and go back to the **Azure Active Directory** page. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-1.png')} alt="ms-exchange-api-perm-step-1.png" width="500" />
2. You will see a menu of options for your Azure Active Directory on the left. Click **App registrations**. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-2.png')} alt="ms-exchange-api-perm-step-2.png" width="400" />
3. Click on your Azure Application. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-3.png')} alt="ms-exchange-api-perm-step-3.png" width="500" />
4. Click **API permissions** in the left pane of your Azure application and click **Add a permission**. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-4.png')} alt="ms-exchange-api-perm-step-4.png" width="450" />
5. A right pane slides out. Click **APIs my organization uses**, search for the text Office 365 Exchange Online, and click on the result. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-5.png')} alt="ms-exchange-api-perm-step-5.png" width="450" />
6. On the next page, click **Delegated permissions**, search for the text Reporting, check the checkbox next to `ReportingWebService.Read` and click **Add permissions**. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-6.png')} alt="ms-exchange-api-perm-step-6.png" width="550" />
7. Now we need to add a second permission. Click **Add a permission** again. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-7.png')} alt="ms-exchange-api-perm-step-7.png" width="250" />
8. A right pane slides out. Click **APIs my organization uses**, search for the text Office 365 Exchange Online and click on the result. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-8.png')} alt="ms-exchange-api-perm-step-8.png" width="450" />
9. This time we are adding a similar permission as before. Click **Application permissions**, search for the text Reporting, check the checkbox next to `ReportingWebService.Read.All` and click **Add permissions**. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-9.png')} alt="ms-exchange-api-perm-step-9.png" width="550" />
10. You should now see both permissions, but you will need to click **Grant admin consent** to finalize the API permissions and confirm it. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-10-a.png')} alt="ms-exchange-api-perm-step-10-a.png" width="800" /> <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-10-b.png')} alt="ms-exchange-api-perm-step-10-b.png" width="450" />
11. Verify your API permissions are correct and granted. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-api-perm-step-11.png')} alt="ms-exchange-api-perm-step-11.png" width="800" />

### Oauth 2.0 Generate Authorization Code

:::note
This authorization code will expire within 1 hour. Set up your Sumo Logic source before it expires.
:::

1. In a browser where you are already authenticated to your [Azure portal](https://portal.azure.com), navigate to the URL below, but replace `{{client_id}}` with your `Application (client) ID` from the earlier steps.
```
https://login.windows.net/common/oauth2/authorize?response_type=code&resource=https://outlook.office365.com&client_id={{client_id}}&redirect_uri=https://localhost
```
2. If successful, you will be redirected to a blank page with `code` and `session_state` as URL parameters. Write down the `code` value as this is your Oauth 2.0 authorization code you will use to configure the Sumo Logic C2C. This code is over 700 characters in length. Be careful to not copy the `&session_state=` at the end of the code. See below for an example:
```
https://localhost/?code={{REDACTED_AUTHORIZATION_CODE}}&session_state=50efb7a9-7678-4186-8b5b-abbb16d7b1ca#
```
## Create a Microsoft Exchange Trace Logs Source

When you create a Microsoft Exchange Trace Logs Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Microsoft Exchange Trace Logs Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **MS Exchange Trace Logs**. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-icon.png')} alt="ms-exchange-icon.png" width="200" />
4. Enter a **Name** for the Source. The description is optional. <br/> <img src={useBaseUrl('img/send-data/ms-exchange-schema-ui.png')} alt="ms-exchange-schema-ui.png" width="400" />
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
8. **Application (client) ID**. Enter your client ID from your Azure Application. This should be a Globally Unique Identifier aka GUID.
9. **Directory (tenant) ID**. Enter your tenant ID from your Azure Application. This should be a Globally Unique Identifier aka GUID.
10. **Secret**. Enter your client secret generated within your Azure Application.
11. **Oauth 2.0 Authorization Code** Enter a valid authorization code. They expire within 1 hour of creation. The Microsoft Exchange Trace Logs Source will use this temporary code to automatically generate and rotate your API tokens for accessing the data.
12. **Polling Interval Seconds**. We recommend leaving this to its defaults. This value controls how often the Microsoft Exchange Trace Logs Source polls the the Microsoft APIs for new data.
13. **Collection Time Offset**. Use this value to offset the collection in the past by some amount of time. Microsoft claims data can be missing from the API within the last 24 hours. Set this to `86400` seconds aka 24 hours to help guarantee more complete results or reduce it if you are looking for more real time, but potentially incomplete data.
14. When you are finished configuring the Source, click **Submit**.

## Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows the three possible error types. It also tells the reason the error occurred, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

## Troubleshooting

### Microsoft API Returns 400 Error Code

This API can return a 400 error code which could mean one of the following reasons:

1. "The provided authorization code or refresh token has expired due to inactivity". Regenerate your authorization code and use it shortly after generation to update your Sumo Logic C2C source. This token will expire if not used quickly.
2. "Invalid request. Request is malformed or invalid". This response error can occur if other parts of the configuration are incorrect such as an invalid "Client Secret Value" or incorrect set permissions. Ensure all of the setup steps are followed and the source has the correct configuration.

:::note intermittent JSON error
When querying for the Microsoft Exchange trace log messages, Microsoft API may sporadically return a HTML webpage titled "Sign in to Outlook" instead of JSON events. 

This will force the health status of the source into an error state with the error text `invalid character '<' looking for beginning of value` as we try to JSON decode the data. The API will revert back to providing us the expected JSON events and collection will continue as there is no issue with the authentication, but it does cause the health status of the source to flip into an error state. 

Our source keeps track of a time cursor for events and will only move the time cursor forward once we have successfully received, decoded the JSON, and sent the logs into Sumo Logic before we move the time cursor forward to ensure there is no data loss. If you experience this issue, contact Microsoft support.
:::

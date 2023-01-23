---
id: google-workspace-source
title: Google Workspace Source
sidebar_label: Google Workspace
keywords:
    - google-workspace
    - cloud-SIEM-enterprise
---

The Google Workspace Source collects a list of users from the Google Workspace [Users API](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/list). It securely stores the required authentication, scheduling, and state tracking information.

## States

A Google Workspace Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Google Workspace Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Google.
1. **Collecting**. The Source is actively collecting data from Google.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.

![Azure AD Inventory error.png](/img/send-data/Azure-AD-Inventory-error.png)

Hover your mouse over the status icon to view a tooltip with a count of
the detected errors and warnings.

![hover over health status icon.png](/img/send-data/azure-status.png)

You can click on the status icon to open a Health Events panel with
details on each detected issue.

## Set up Service Account Credentials

The Google Workspace Source retrieves data once per 24 hours based on user input for either deleted users or all users in a domain.

Follow [Google's documentation](https://developers.google.com/admin-sdk/directory/v1/guides/delegation) to perform Google Workspace Domain-Wide Delegation of Authority. First, you'll create the service account and credentials then delegate domain-wide authority to your service account.

For the scope, add any of the following three scopes to the service account from the admin console. Note the ones you use, you'll need to provide them when configuring the Sumo Logic Google Workspace Source. See Google's [Delegate domain-wide authority to your service account document](https://developers.google.com/admin-sdk/directory/v1/guides/delegation#delegate_domain-wide_authority_to_your_service_account) for details and steps. The scope is required to authorize collection.

 * `https://www.googleapis.com/auth/admin.directory.user`
 * `https://www.googleapis.com/auth/admin.directory.user.readonly`
 * `https://www.googleapis.com/auth/cloud-platform`

![step7.png](/img/send-data/step7.png)

![step7b.png](/img/send-data/step7b.png)

## Create a Google Workspace Source

When you create a Google Workspace Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Google Workspace Source:

1. In Sumo Logic, select **Manage Data > Collection > Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Google Workspace**.

  ![google workspace icon.png](/img/send-data/google-workspace-icon.png)

1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.  

  ![google workspace oct 28 2021.png](/img/send-data/google-workspace.png)

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise and become part of User Inventory. When configured with the **Forward to SIEM** option the following metadata fields are set:

  * `_siemVendor`: Google
  * `_siemProduct`: Workspace
  * `_siemDataType`: Inventory

1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 

1. The **Delegated User Email** is the email address of the super administrator for the domain that granted access to the service account you created.

1. Provide the **Client Email**, **Private Key**, and **Token URL** you got in the JSON file after you created service account credentials in the [setup section](#set-up-service-account-credentials) above.

1. Provide the same **Scope** you defined for your service account during the [setup section](#set-up-service-account-credentials) above.

1. The **Query Parameter for Collecting User Data** section provides two options, **Customer** or **Domain Parameter**. See the [Directory API documentation](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/list#query-parameters) from Google for details.
  * **Customer ID**:** The unique ID for the customer's Google Workspace account. In the case of a multi-domain account, to fetch all groups for a customer, fill this field instead of domain. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/admin-sdk/directory/v1/reference/users).
  * **Domain**: The domain name. Use this field to get fields from only one domain. To return all domains for a customer account, use the `customer` query parameter instead.

1. When you are finished configuring the Source, click **Submit**.

## Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config            | JSON Object  | Yes               | Contains the configuration parameters for the Source. |                |
| schemaRef         | JSON Object  | Yes               | Set to `{"type":"Google Workspace"}`.                                                                           | not modifiable |
| sourceType        | String       | Yes               | Set to `Universal`.                                                                                             | not modifiable |

The following table shows the **config** parameters for a Google Workspace Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `clientEmail` | String | Yes |  | Provide the Client Email you got in the JSON file after you created service account credentials | modifiable |
| `delegatedUserEmail` | String | Yes |  | Provide the super-administrator email address for the domain that granted access to the service account you created. | modifiable |
| `privateKey` | String | Yes |  | Provide the Private Key you got in the JSON file after you created service account credentials | modifiable |
| `tokenURL` | String | Yes |  | Provide the Token URL you got in the JSON file after you created service account credentials | modifiable |
| `scope` | String | Yes |  | Provide the same Scope you defined for your service account | modifiable |
| `queryParam` | Boolean | No | true | By default, the Customer parameter is selected with a `CustomerID` value of `my_customer.` To assign a different CustomerID provide the `customerID` parameter. Set to `false` to use the Domain parameter. You need to provide the domain parameter when `false`. | modifiable |
customerID | String | No | my_customer | The unique ID for the customer's Google Workspace account.	modifiable
| `domain` | String | No | (except when queryParam is set to false.) | The domain name. Use this field to get fields from only one domain.	modifiable |

Google Workspace Source JSON example:

```json
{
  "name": "google workspace",
  "description": "description",
  "category": "souce_category",
  "fields": {
    "_siemForward": true
  },
  "privateKey": "****************",
  "clientEmail": "example@abc-google.com",
  "delegatedUserEmail": "example@abc.com",
  "tokenURL": "https://example_token_url.com",
  "queryParam": false,
  "scope": "https://www.googleapis.com/auth/admin.directory.user.readonly",
  "domain": "some_domain"
}
```

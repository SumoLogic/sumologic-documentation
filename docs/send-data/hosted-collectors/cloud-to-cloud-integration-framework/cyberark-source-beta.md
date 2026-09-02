---
id: cyberark-source-beta
title: CyberArk EPM Source
sidebar_label: CyberArk EPM
tags:
  - cloud-to-cloud
  - cyberark
description: This integration accesses CyberArk EPMs API to retrieve administrative audit events from every Set in the environment.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cyberark.png')} alt="CyberArk icon" width="50"/>

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

The CyberArk Endpoint Privilege Manager (EPM) is a security solution that helps organizations reduce the risk of information theft or ransomware attacks by enforcing the principle of least privilege and preventing unauthorized access to critical systems and data. The solution employs a combination of privilege security, application control, and credential theft prevention to reduce the likelihood of malware infections.

The integration with CyberArk EPM's API allows for retrieving administrative, detailed raw, policy audit, policy audit raw events, and aggregated events from every set in the environment. The [API documentation](https://docs.cyberark.com/Product-Doc/OnlineHelp/EPM/Latest/en/Content/LandingPages/LPDeveloper.htm) provides guidance on accessing and utilizing this information. This integration facilitates retrieving various audit events, including administrative actions, policy violations, and application usage, to generate alerts, reports, and remediation actions that enhance the organization's security posture.

:::important Upgrade to version 2.0.0
CyberArk has scheduled the deprecation of the standalone Endpoint Privilege Manager (EPM) console and its legacy authentication methods (the EPM Logon API) for **December 31, 2026**. After this date, username/password-based authentication via the legacy EPM dispatch server will no longer be supported.

To ensure uninterrupted data collection, we have released **version 2.0.0** of the CyberArk EPM source, which exclusively uses CyberArk Identity Security Platform Shared Services (ISPSS) OAuth2 authentication. If you are currently using an older version of this source with legacy EPM credentials, you must migrate to version 2.0.0 by configuring ISPSS authentication as described in the [Vendor configuration](#vendor-configuration) section below.
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 10 minutes | Sets |
| 10 minutes | Admin Audit Events |
| 10 minutes | Detailed Raw Events |
| 10 minutes | Aggregated Policy Audit Events |
| 10 minutes | Policy Audit Raw Events |
| 10 minutes | Aggregated Events |

## Setup

### Vendor configuration

This source authenticates using CyberArk Identity Security Platform Shared Services (ISPSS) OAuth2 `client_credentials` flow. You must configure a service user and a custom EPM API web app in your CyberArk Identity tenant.

For detailed setup instructions, refer to the CyberArk documentation: [Set up API authentication for EPM REST APIs using Identity](https://docs.cyberark.com/epm/latest/en/content/webservices/authenticate-with-identity-administration.htm).

Below is a summary of the steps:

1. **Create a service user**. In Identity Administration, go to **Manage > Inventory > Users** and create a new user. Enable the **Is OAuth confidential client**, **Is Service User**, and **Password never expires** checkboxes.
1. **Assign the service user to an EPM role**. Add the service user as a member of the EPM role that defines the required API permissions.
1. **Create a custom EPM API web app**. In Identity Administration, go to **Manage > Inventory > Targets > Applications**, add the **Idira EPM API Client** application, and configure its settings.
1. **Configure token expiration and permissions**. In the web app's **Tokens** tab, set the desired token expiration period. In the **Permissions** tab, add the service user.
1. **Identify your Identity Tenant ID**. This is the subdomain of your Identity Administration URL (for example, `abr1336` from `https://abr1336.id.cyberark.cloud`). Click your username, then click **About** to view tenant details.
1. **Get the EPM Manager URL**. Log in to the EPM management console. The server name is the subdomain in your EPM console URL (for example, `https://na101.epm.cyberark.com`).
1. **Get the Application ID (alias)**. This is the alias of the custom EPM API web app you created (for example, `reportsapp`).
1. **Verify authentication**. Request an OAuth token using the following command:
   ```bash
   curl -u "<service-user>@<tenant-domain>:<password>" \
     -d "grant_type=client_credentials" \
     -X POST "https://<identity-tenant-id>.id.cyberark.cloud/oauth2/token/<app-alias>"
   ```
   Confirm the response contains a valid JWT access token.

### Source configuration

When you create a CyberArk EPM Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector.md).

To configure a CyberArk EPM Source, follow the steps below:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Search for and select **CyberArk EPM**.
1. Enter a **Name** for the Source. The **Description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields**. Click the **+Add** link to add custom log metadata [Fields](/docs/manage/fields).
    * Define the fields you want to associate, each field needs a name (key) and value.
        * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
        * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn't present or enabled in the schema, it's ignored and marked as **Dropped**.
1. **Identity Tenant ID**. Enter your CyberArk Identity tenant ID. This is the subdomain of your Identity Administration URL (for example, `abr1336` from `https://abr1336.id.cyberark.cloud`).
1. **ISPSS Service User**. Enter the service user login in the format `<service-user>@<tenant-domain>`.
1. **ISPSS Service User Password**. Enter the password for the service user.
1. **ISPSS Application ID**. Enter the alias of the custom EPM API web app you created in Identity Administration (for example, `reportsapp`).
1. **EPM Manager URL**. Enter the EPM Manager URL for your environment (for example, `https://na101.epm.cyberark.com`).
1. **Collect Detailed Raw Events**. Select this checkbox to enable the CyberArk C2C Source to collect detailed raw events from the CyberArk EPM. By default, the source can make 1000 requests every 5 minutes to [Detailed Raw Events](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/GetDetailedRawEvents.htm) endpoint, as stated in the [CyberArk API documentation](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/WebServicesIntro.htm).
1. **Collect Aggregated Policy Audit Events**. Select this checkbox to enable the C2C Source to collect aggregated policy audit events from the CyberArk EPM. By default, the source can make 1000 requests every 5 minutes to [Aggregated Policy Audit Events](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/GetAggregatedPolicyAudits.htm) endpoint, as stated in the [CyberArk API documentation](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/WebServicesIntro.htm).
1. **Collect Policy Audit Raw Events**. Select this checkbox to enable the C2C Source to collect policy audit raw events from the CyberArk EPM. By default, the source can make 1000 requests every 5 minutes to [Policy Audit Raw Events](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/GetPolicyAuditRawEventDetails.htm) endpoint, as stated in the [CyberArk API documentation](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/WebServicesIntro.htm).
1. **Collect Aggregated Events**. Select this checkbox to enable the C2C Source to collect aggregated events from the CyberArk EPM. By default, the source can make 1000 requests every 5 minutes to [Aggregated Events](https://docs.cyberark.com/epm/latest/en/content/webservices/getaggregatedevents.htm) endpoint, as stated in the [CyberArk API documentation](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/WebServicesIntro.htm).
1. **Polling Interval**. The polling interval is the frequency at which the CyberArk C2C Source will check for updates from the CyberArk EPM (Endpoint Privilege Manager). This field is pre-filled with 600.
1. When you are finished configuring the Source, click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Cyber-Ark` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `EPM` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_parser` | `/Parsers/System/Cyber-Ark/CyberArk EPM JSON` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"CyberArk EPM"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| identity_id | String | Yes | `null` | CyberArk Identity tenant ID (subdomain of your Identity URL). | `"abr1336"` |
| service_user | String | Yes | `null` | ISPSS service user in the format `<service-user>@<tenant-domain>`. | `"svc-epm@mycompany.com"` |
| service_user_password | String | Yes | `null` | Password for the ISPSS service user. | |
| app_id | String | Yes | `null` | Alias of the custom EPM API web app in Identity Administration. | `"reportsapp"` |
| epm_manager_url | String | Yes | `null` | EPM Manager URL for your environment. | `"https://na101.epm.cyberark.com"` |
| detailed_raw_events | Boolean | No  | False | Collects detailed raw events. |  |
| aggregated_policy_audits | Boolean | No | False | Collects aggregated policy audits events. |  |
| policy_audit_raw_events | Boolean | No | False | Collects policy audit raw events. |  |
| aggregated_events | Boolean | No | False | Collects aggregated events. |  |
| polling_interval | Integer | Yes | 600 | Frequency of C2C updates from EPM, in seconds. |  |  

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/cyberark/example-private.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/cyberark/example-private.tf
```

## API Limitations

* **Session Timeout**. The session timeout for all APIs is part of the session token and is defined by the token expiration period configured in the custom EPM API web app's Tokens tab.

* **Adjust Request Limitations**. The CyberArk C2C source has default restrictions on the number of requests to the CyberArk EPM Server per customer, as explained in the [CyberArk API Limitations](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/WebServicesIntro.htm#APIlimitations) documentation.

:::note
When setting the poll frequency, it's recommended to consider these limitations and set the frequency to a reasonable value to ensure that the C2C operates efficiently without overwhelming the server.
:::

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

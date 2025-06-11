---
id: cyberark-audit-source
title: CyberArk Audit Source
sidebar_label: CyberArk Audit
tags:
  - cloud-to-cloud
  - cyberark-audit
description: This integration accesses CyberArk SIEM integration API to retrieve audit events.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cyberark.png')} alt="icon" width="50"/>

The CyberArk Identity Security platform is a comprehensive identity management solution that enhances enterprise security through features such as single sign-on, multi-factor authentication, and privileged access control. It streamlines identity operations while providing extensive protection against both external and internal cyber threats.

The Audit service offers detailed audit trails for activities, events, and sessions conducted by any integrated service on the Shared Services platform. An audit trail is a recorded history of activities that have taken place within the system. This information can be utilized for various purposes, including security, regulatory compliance, incident response investigations, and troubleshooting.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 minutes | [Audits](https://docs.cyberark.com/audit/latest/en/content/audit/isp_siem-integration-api.htm?tocpath=Developer%7C_____1) |

## Setup

### Vendor configuration

In this configuration, you will set up a CyberArk audit source and configure it to be authorized and authenticated to use CyberArk Audit SIEM API. CyberArk audit supports OAuth authentication.

Follow the instructions mentioned in the [CyberArk Documentation](https://docs.cyberark.com/audit/latest/en/content/audit/isp_siem-integration.htm?tocpath=SIEM%20integrations%7C_____1) to retrieve the following parameters to configure the CyberArk audit source.

1. Identity Id
1. App Id
1. Username(Client ID)
1. Password(Client Secret)
1. Tenant URL
1. API Key

### Source configuration

When you create a CyberArk Audit Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector.md).

To configure a CyberArk Audit source, follow the steps below:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **CyberArk Audit**.
1. **Name**. Enter a name to display for the source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema is ignored, known as dropped.
1. **Identity ID**. Enter your identity ID collected from the [Vendor configuration](#vendor-configuration) section. For example, `ac212`.
1. **Web Application ID**. Enter your application ID collected from the [Vendor configuration](#vendor-configuration) section. For example, `sumologic`.
1. **Username**. Enter your username(client-id) collected from the [Vendor configuration](#vendor-configuration) section. For example, `user@cyberark.cloud.1234`.
1. **Password**. Enter your password(client-secret) collected from the [Vendor configuration](#vendor-configuration) section.
1. **Tenant URL**. Enter your tenant URL collected from the [Vendor configuration](#vendor-configuration) section. For example, `https://sumologic.audit.cyberark.cloud`.
1. **API Key**. Enter your API key collected from the [Vendor configuration](#vendor-configuration) section.
1. (Optional) **Service Type**. Enter the service types to filter the audits.
1. (Optional) **Status Type**. Enter the status types to filter the audits.
1. (Optional) **Action Type**. Enter the action types to filter the audits.
1. **Polling Interval**. The polling interval is the frequency at which the CyberArk Audit C2C source will check for updates from the CyberArk Audit API. By default, the polling interval is set to 5 minutes.
1. (Optional) **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{“type”: “CyberArk Audit”}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the collector or source. Use the boolean field `_siemForward` to enable forwarding to SIEM.| `{"_siemForward": false, "fieldA": "valueA"}` |
| identityId | String | Yes | `null` | Identity ID for your CyberArk account. | `ac212` |
| appId | String | Yes |  `null` | App ID for your CyberArk account. | `sumologic` |
| username | String | Yes |  `null` | Username(Client ID) for your configured server. | `myuser@cyberark.cloud.1234` |
| password | String | Yes |  `null` | Password for your configured server. | |
| tenantURL | String | Yes |  `null` | Tenant URL for your configured server. | `https://sumologic.audit.cyberark.cloud` |
| apiKey | String | Yes |  `null` | API key for your configured server. | |
| serviceType | Array | No | `null` | Type of audit services to filter data from. |  |
| statusType | Array | No | `null` | Type of audit statuses to filter data from. |  |
| actionType | Array | No | `null` | Type of audit actions to filter data from. |  |
| pollingIntervalMin | integer | Yes | 5 minutes | Frequency of C2C updates from CyberArk Audit. |  |  

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/cyberark-audit/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/cyberark-audit/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

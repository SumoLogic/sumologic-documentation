---
id: cyberark-source
title: CyberArk EPM Source
sidebar_label: CyberArk EPM
tags:
  - cloud-to-cloud
  - cyberark
description: This integration accesses CyberArk EPMs API to retrieve administrative audit events from every Set in the environment.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cyberark.png')} alt="icon" width="50"/>

The CyberArk Endpoint Privilege Manager (EPM) is a security solution that helps organizations reduce the risk of information theft or ransomware attacks by enforcing the principle of least privilege and preventing unauthorized access to critical systems and data. The solution employs a combination of privilege security, application control, and credential theft prevention to reduce the likelihood of malware infections.

The integration with CyberArk EPM's API allows for retrieving administrative, detailed raw, policy audit, policy audit raw events, and aggregated events from every set in the environment. The [API documentation](https://docs.cyberark.com/Product-Doc/OnlineHelp/EPM/Latest/en/Content/LandingPages/LPDeveloper.htm) provides guidance on accessing and utilizing this information. This integration facilitates retrieving various audit events, including administrative actions, policy violations, and application usage, to generate alerts, reports, and remediation actions that enhance the organization's security posture.

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

In this configuration, you will set up a CyberArk EPM source account and configure it to be authorized and authenticated to use CyberArk API. CyberArk EPM supports EPM Authentication. It authenticates a user to EPM using the username and password and returns a token and EPM server URL.
To set up a CyberArk account, follow the steps below:
1. Navigate to [CyberArk](https://login.epm.cyberark.com/login) application.
1. Enter the **Username** and **Password** of your choice. You can enter any combination of letters, numbers, or special characters for both the username and password. There are no limitations on the length or complexity of the username and password either. <br/> <img src={useBaseUrl('img/send-data/login-cyberark.png')} alt="login-cyberark.png" width="600" />

### Source configuration

When you create a CyberArk EPM Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector.md).

To configure a CyberArk EPM Source, follow the steps below:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Search for and select **CyberArk EPM**.
1. **Name**. Enter a name to display for the Source in the Sumo Logic web application.
1. **Description**. (Optional)
1. **Source Category**. Enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. Fields. (Optional) Click **+Add** to ad additional fields; each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
1. **EPM Username**. Enter your EPM username from the [Vendor configuration](#vendor-configuration) section.
1. **EPM User Password**. Enter your EPM password from the [Vendor configuration](#vendor-configuration) section.
1. **CyberArk EPM Dispatch Server**. Enter your CyberArk EPM Dispatch Server URL, it is the dispatch server for your region. Following are some examples of dispatch server URLs:
    * For the US datacenter, the dispatch server URL is `https://login.epm.cyberark.com`.
    * For the EU datacenter, the dispatch server URL is `https://eu.epm.cyberark.com`.
1. **Application ID**. An application ID is a unique identifier that helps an API recognize which application or program is accessing it. It's like a name tag that allows the API to keep track of different applications using it. For example, *sumologic*.
1. **Collect Detailed Raw Events**. Select this checkbox to enable the CyberArk C2C Source to collect detailed raw events from the CyberArk EPM. By default, the source can make 1000 requests every 5 minutes to [Detailed Raw Events](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/GetDetailedRawEvents.htm) endpoint, as stated in the [CyberArk API documentation](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/WebServicesIntro.htm).
1. **Collect Aggregated Policy Audit Events**. Select this checkbox to enable the C2C Source to collect aggregated policy audit events from the CyberArk EPM. By default, the source can make 1000 requests every 5 minutes to [Aggregated Policy Audit Events](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/GetAggregatedPolicyAudits.htm) endpoint, as stated in the [CyberArk API documentation](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/WebServicesIntro.htm).
1. **Collect Policy Audit Raw Events**. Select this checkbox to enable  the C2C Source to collect policy audit raw events from the CyberArk EPM. By default, the source can make 1000 requests every 5 minutes to [Policy Audit Raw Events](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/GetPolicyAuditRawEventDetails.htm) endpoint, as stated in the [CyberArk API documentation](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/WebServicesIntro.htm).
1. **Collect Aggregated Events**. Select this checkbox to enable  the C2C Source to collect aggregated events from the CyberArk EPM. By default, the source can make 1000 requests every 5 minutes to [Aggregated Events](https://docs.cyberark.com/epm/latest/en/content/webservices/getaggregatedevents.htm) endpoint, as stated in the [CyberArk API documentation](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/WebServicesIntro.htm).
1. **Polling Interval**. The polling interval is the frequency at which the CyberArk C2C Source will check for updates from the CyberArk EPM (Endpoint Privilege Manager). This field is pre-filled with 600.
1. When you are finished configuring the Source, click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Cyber-Ark` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `EPM` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_parser` | `/Parsers/System/Cyber-Ark/CyberArk EPM JSON` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

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
| username | String | Yes |  `null` |Username for your CyberArk EPM account. |  |
| password | String | Yes |  `null` | Password for your CyberArk EPM account. |  |
| epm_server | String | Yes |  `null` | Dispatch Server of the CyberArk EPM. | |
| application_id | String | Yes |  `null` | Unique identifier of the application who is accessing the API. |  |
| detailed_raw_events | boolean | No  | False | Collects detailed raw events. |  |
| aggregated_policy_audits | boolean | No | False | Collects aggregated policy audits events. |  |
| policy_audit_raw_events | boolean | No | False | Collects policy audit raw events. |  |
| aggregated_events | boolean | No | False | Collects policy aggregated events. |  |
| polling_interval | integer | Yes | 600 | Frequency of C2C updates from EPM. |  |  

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/cyberark/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/cyberark/example.tf
```

## API Limitations

* **Session Timeout**. The session timeout for all APIs is part of the session token and is defined by the Timeout for inactive session Server Configuration parameter.

* **Adjust Request Limitations**. The CyberArk C2C source has default restrictions on the number of requests to the CyberArk EPM Server per customer, as explained in the [CyberArk API Limitations](https://docs.cyberark.com/EPM/Latest/en/Content/WebServices/WebServicesIntro.htm#APIlimitations) documentation.

:::note
When setting the poll frequency, it's recommended to consider these limitations and set the frequency to a reasonable value to ensure that the C2C operates efficiently without overwhelming the server.
:::

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

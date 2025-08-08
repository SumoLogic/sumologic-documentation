---
id: github-copilot-source
title: GitHub Copilot Source
sidebar_label: GitHub Copilot
tags:
  - cloud-to-cloud
  - github-copilot
  - github
description: Learn to collect the organization metrics and team metrics from GitHub Copilot platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/platform-services/automation-service/app-central/logos/github-copilot.png')} alt="Github-Copilot-icon" width="70" />

GitHub is a web-based platform that uses Git for version control and collaboration in software development. It enables developers to create, store, manage, and share code in repositories, track changes, and collaborate on projects with features such as branches, pull requests, and issue tracking.

Copilot is an AI-powered pair programmer that integrates with various development environments. It leverages machine learning models trained on publicly available code to provide real-time code suggestions, explanations, and even generate entire functions or tests based on context and natural language prompts. Copilot's features aim to enhance developer productivity, accelerate coding, and improve code quality.

## Data collected

| Source | Description | Polling interval |
| :-- | :-- | :-- |
| [Organization Metrics](https://docs.github.com/en/rest/copilot/copilot-metrics?apiVersion=2022-11-28#get-copilot-metrics-for-an-organization) | Provides aggregated usage data for Copilot features within an organization, including code completions, chat, and pull request summaries. | 24 hours |
| [Team Metrics](https://docs.github.com/en/rest/copilot/copilot-metrics?apiVersion=2022-11-28#get-copilot-metrics-for-a-team) | Provides feature usage for specific teams, with breakdowns by language, editor, and model. | 24 hours |

## Setup

### Vendor configuration

You are required to provide the **Organization Name** and **PAT Token** to configure the GitHub Copilot source.

1. **Organization Name**: Name of the organization. The name is not case sensitive.
2. **PAT Token**: Fine-grained PAT (Personal Access Token) token of the account. Follow the steps from the [GitHub Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) to generate the fine-grained token. Configure a never-expiring fine-grained token for smooth integration.

#### Pre-requisites

1. The fine-grained PAT token must have at least one of the following permission sets:
    - "Github Copilot Business" organization permissions (read).
    - "Administration" organization permissions (read).
2. To access any of the above endpoints, the Copilot metrics API access policy must be enabled for the organization (or organization containing the team if team metrics is configured).
3. Only organization owners and billing managers of the parent enterprise can view Copilot metrics.
    - The PAT tokens need either (`manage_billing:copilot`, `read:org`), or `read:enterprise` scopes to use the endpoints. Refer to the [GitHub Documentation](https://docs.github.com/en/rest/copilot/copilot-metrics?apiVersion=2022-11-28#get-copilot-metrics-for-an-organization) for further details.

### Source configuration

When you create a GitHub Copilot Source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a GitHub Copilot Source, follow the steps below:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Github Copilot**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Organization Name**. Name of the organization. The name is not case sensitive.
1. **PAT Token**. Enter the PAT token generated from the [GitHub Copilot platform](#vendor-configuration).
1. (Optional) **Collect Team Metric Logs**. Select this checkbox to collect the team metric logs from the Copilot platform.
    1. **Team Names**. Write the team names of which you want to collect metric logs.
1. **Metrics Period(in days)**. Specifies the number of past days for which metrics data should be collect. This is set to 1 day by default. You can adjust it based on your needs.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for more details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Github Copilot"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.| `{"_siemForward": false, "fieldA": "valueA"}` |
| organization | String | Yes | `null` | Name of your organization. | sanlabs |
| patToken | String | Yes | `null` | PAT Token of the account. | pat_gitxxxxx |
| collectTeamMetrics | Boolean | No | `false` | Specify if we need to collect the team metrics logs. | true |
| teamNames | String Array | No | `null` | List of teams of which the metrics should be collected. | dev-team |
| metricPeriodInDays | Integer | Yes | 1 | Specifies the number of past days for which metrics data should be collect. Range 1-28. | 2 |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/github-copilot/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/github-copilot/example.tf
```

## Limitations

Due to the behavior of both APIs, data is only available for the previous day, there will be 24 hours latency at any given point in time. Refer to the [GitHub Documentation](https://docs.github.com/en/rest/copilot/copilot-metrics?apiVersion=2022-11-28#get-copilot-metrics-for-an-organization) for further details.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

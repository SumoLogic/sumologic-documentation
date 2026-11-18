---
id: github-copilot-source
title: GitHub Copilot Source
sidebar_label: GitHub Copilot
keywords:
  - cloud-to-cloud
  - github-copilot
  - github
description: Learn how to collect daily Copilot organization, user, and user team usage metrics from GitHub into Sumo Logic with the Cloud-to-Cloud source.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/github_copilot.png')} alt="GitHub Copilot-icon" width="40" />

The Sumo Logic source for GitHub Copilot is a Cloud-to-Cloud (C2C) integration that collects daily Copilot usage metrics from the GitHub Copilot usage metrics API and sends them to Sumo Logic. Use it to analyze Copilot adoption, usage, and activity across your organization.

GitHub is a web-based platform that uses Git for version control and enables developers to manage code repositories, track changes, and collaborate through features such as branches, pull requests, and issue tracking. GitHub Copilot is an AI-powered coding assistant that provides code suggestions, explanations, and code generation to improve developer productivity and code quality.

## Data collected

|  | Description | Polling interval |
| :-- | :-- | :-- |
| [Organization Metrics](https://docs.github.com/en/rest/copilot/copilot-usage-metrics?apiVersion=2026-03-10#get-copilot-organization-usage-metrics-for-a-specific-day) | Aggregated Copilot usage data for the organization for a specific day, including usage statistics for Copilot features, user engagement data, and feature adoption metrics. | 24 hours |
| [User Metrics](https://docs.github.com/en/rest/copilot/copilot-usage-metrics?apiVersion=2026-03-10#get-copilot-organization-users-usage-metrics-for-a-specific-day) | (Optional, enabled with **Collect User Metrics**) User-level Copilot usage data for the organization for a specific day, including individual user engagement statistics, feature usage patterns, and adoption metrics broken down by user. | 24 hours |
| [User Team Metrics](https://docs.github.com/en/rest/copilot/copilot-usage-metrics?apiVersion=2026-03-10#get-copilot-organization-user-teams-report-for-a-specific-day) | (Optional, enabled with **Collect User Teams**) User-team membership data for Copilot across the organization, with one entry per user-team pair. Join this data with the User Metrics to compute team-level usage metrics. | 24 hours |

## Setup

### Vendor configuration

You need to provide the **Organization Name** and a **PAT Token** to configure the GitHub Copilot source.

1. **Organization Name**: Name of the GitHub organization. The name is not case sensitive.
1. **PAT Token**: A fine-grained personal access token (PAT) for the account. To generate one, follow the steps in the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token). We recommend configuring a never-expiring fine-grained token for a smooth integration.

#### Prerequisites

1. The fine-grained PAT needs the "Organization Copilot metrics" organization permission (read).
1. The Copilot usage metrics API access policy needs to be enabled for the organization.
1. Only organization owners and authorized users with the fine-grained "View Organization Copilot Metrics" permission can retrieve Copilot metrics reports for the organization.
    - If you use a personal access token (classic) instead, it needs the `read:org` scope.
    - Refer to the GitHub documentation for the [organization](https://docs.github.com/en/rest/copilot/copilot-usage-metrics?apiVersion=2026-03-10#get-copilot-organization-usage-metrics-for-a-specific-day), [user](https://docs.github.com/en/rest/copilot/copilot-usage-metrics?apiVersion=2026-03-10#get-copilot-organization-users-usage-metrics-for-a-specific-day), and [user-team](https://docs.github.com/en/rest/copilot/copilot-usage-metrics?apiVersion=2026-03-10#get-copilot-organization-user-teams-report-for-a-specific-day) reports for further details.

### Source configuration

When you create a GitHub Copilot source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a GitHub Copilot source, follow the steps below:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Github Copilot**.
1. Enter a **Name** for the source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. (Optional) **Base URL**. Base URL of the GitHub REST API. The default value is `https://api.github.com`. Change it only if your GitHub organization is accessed through a different API base URL.
1. **Organization Name**. Name of the GitHub organization. The name is not case sensitive.
1. **PAT Token**. Enter the PAT generated from GitHub, as described in [Vendor configuration](#vendor-configuration).
1. (Optional) **Collect User Teams**. Select this check box to collect the Copilot user team report, which contains the team memberships of the users in your organization.
1. (Optional) **Collect User Metrics**. Select this check box to collect the daily Copilot usage metrics of each user in your organization.
1. **Metrics Aggregation Period (in days)**. Specifies the number of past days for which to collect metrics data. The range is 1 to 28 days, and the default is 1 day. You can adjust it based on your needs.
1. (Optional) **Processing Rules for Logs**. Expand the section to add filters that exclude, include, hash, or mask log messages that match a regular expression.
1. When you are finished configuring the source, click **Save**.

:::info
After configuring the GitHub Copilot source, consider installing the Sumo Logic app for [GitHub Copilot](/docs/integrations/saas-cloud/github-copilot/) to visualize and analyze the collected data using prebuilt dashboards and monitor alerts.
:::

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for more details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Github Copilot"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the collector or source. Use the boolean field _siemForward to enable forwarding to SIEM.| `{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | No | `"https://api.github.com"` | Base URL of the GitHub REST API. Must begin with `https://`. | `https://api.github.com` |
| filters | JSON Array | No | `null` | [Processing rules](/docs/send-data/collection/processing-rules) (filters) to apply to the collected logs. Each filter requires a `name`, a regular expression (`regexp`), and a `filterType` (`Exclude`, `Include`, `Hash`, or `Mask`). | `[{"name": "filter1", "regexp": ".*test.*", "filterType": "Exclude"}]` |
| organization | String | Yes | `null` | Name of your GitHub organization. | `sanlabs` |
| patToken | String | Yes | `null` | PAT of the account. | `github_pat_xxxz7ARP6EABxxxxxxx` |
| collectUserTeamReport | Boolean | No | `false` | Specify whether to collect the user team report (the team memberships of the users in your organization). | `true` |
| collectUserMetrics | Boolean | No | `false` | Specify whether to collect the daily Copilot usage metrics of each user in your organization. | `true` |
| metricPeriodInDays | Integer | Yes | `1` | Specifies the number of past days for which to collect metrics data. Range 1-28. | `2` |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/github-copilot/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/github-copilot/example.tf
```

## Limitations

GitHub returns an HTTP 204 status (no content) when the API call requests data for the current day. Data for a given day is available only after 24 hours.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

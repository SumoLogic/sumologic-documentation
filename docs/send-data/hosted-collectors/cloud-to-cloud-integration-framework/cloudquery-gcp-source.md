---
id: cloudquery-gcp-source
title: CloudQuery GCP (Beta)
sidebar_label: CloudQuery GCP
tags:
  - cloud-to-cloud
  - cloudquery
  - gcp
  - google cloud platform
description: Learn how to collect inventory from GCP APIs using the CloudQuery Plugin SDK and send it to Sumo Logic.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ExampleJSON from '/files/c2c/cloudquery-gcp/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/cloudquery-gcp/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/cloudquery-gcp/example.tf';

<img src={useBaseUrl('img/send-data/cloudquery-logo.png')} alt="cloudquery-icon" width="50" />

The CloudQuery GCP integration pulls inventory from various Google Cloud Platform (GCP) APIs via the CloudQuery GCP plugin, transforms it into the CloudQuery schema, and then sends it to Sumo Logic.

import FedDeploymentNote from '../../../reuse/fed-deployment-note.md';

<FedDeploymentNote/>

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 12 hours |  [Data service table data](https://github.com/cloudquery/cloudquery/blob/plugins-source-gcp-v10.0.0/plugins/source/gcp/resources/plugin/tables.go) |

## Setup

### Prerequisites

[Enable](https://cloud.google.com/endpoints/docs/openapi/enable-api) all the service APIs in the authenticated GCP account related with the services from which you want to fetch data via CloudQuery GCP plugin.

### Vendor configuration

Download the user credentials JSON file by using the gcloud CLI, refer to the [Google Cloud Documentation](https://cloud.google.com/docs/authentication/application-default-credentials#personal).

### Source configuration

When you create an CloudQuery GCP source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a CloudQuery GCP Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **CloudQuery GCP**.
1. Enter a **Name** for the source. The description is optional. 
1. **GCP Credentials**. Upload the credentials JSON file downloaded by running the gcloud CLI command.
1. **(Optional) Project ID(s)**. Enter the unique identifier number for your project. You can find this from the Google Cloud Console. If not specified, all the available active projects will be considered by default.
1. **(Optional) Organization ID(s)**. Enter the unique identifier number for your organization. You can find this from the Google Cloud Console. If not specified, all the available active projects will be considered by default.
1. **Services**. Enter the type of service from which the GCP data should be fetched via CloudQuery GCP plugin.
1. By default, **Polling Interval** is set to 12 hours.
1. **(Optional) Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule). 
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description |
|:---|:---|:---|:---|
| config | JSON Object | Yes | Contains the configuration parameters for the source |
| schemaRef | JSON Object | Yes | Use `{“type”: “CloudQuery GCP Inventory”}` |
| sourceType | String | Yes | Use “Universal” for CloudQuery GCP source Inventory |

### Configuration object

| Parameter | Type | Required | Default | Description | Access |
|:---|:---|:---|:---|:---|:---|
| name | string | Yes | `null` | Type the desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| description | string | No | `null` | Type a description of the Source. | modifiable |
| credentialsJson | JSON object | Yes | `null` | Service account key JSON file. | modifiable |
| projectIds | array | No | `null` | List of Project IDs from which the data needs to be pulled. | modifiable |
| orgIds | array | No | `null` | List of Organization IDs from which the data needs to be pulled. | modifiable |
| limitToServices | array | Yes | `null` | List of services from which the data should be pulled. | modifiable |
| pollingInterval | number | Yes | 12 Hours | This sets how often the Source checks for data. | modifiable |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/files/c2c/cloudquery-gcp/example.json)

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/files/c2c/cloudquery-gcp/example.tf)

## Troubleshooting

### Warning message

#### Message

```
transport: received unexpected content-type \"text/html; charset=UTF-8
```

#### Solution

If you come across this warning message while fetching service data for the configured source then please contact CloudQuery or GCP team.

### Error handling

For the SDK, if the response code is `401` or `403`, this is config error. You'll need to quit the integration.

For any other error returned by CloudQuery, we will set ErrorGeneric as an error in C2C. Integration will not stop its execution.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

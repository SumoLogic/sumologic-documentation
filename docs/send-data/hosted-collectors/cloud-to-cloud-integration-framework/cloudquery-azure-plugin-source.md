---
id: cloudquery-azure-plugin-source
title: CloudQuery Azure Plugin Source
sidebar_label: CloudQuery
tags:
  - cloud-to-cloud
  - cloudquery
  - azure
description: Learn how to collect inventory from the Azure APIs using CloudQuery SDK and send it to Sumo Logic.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/cloudquery-azure-plugin/example.json';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cloudquery-logo.png')} alt="cloudquery-icon" width="70" />

<!-- add Azure logo after https://github.com/SumoLogic/sumologic-documentation/pull/4055 published -->

The CloudQuery integration is used to pull inventory from the Azure APIs using CloudQuery SDK and send it to Sumo Logic.

import FedDeploymentNote from '../../../reuse/fed-deployment-note.md';

<FedDeploymentNote/>


## About Vendor

CloudQuery is an open source CSPM vendor that allows the customer to analyze different vendors (for example, AWS, GCP, Azure) to see possible vulnerabilities.

## Data sources

The Azure Cloud inventory has the following list of tables supported:
https://hub.cloudquery.io/plugins/source/cloudquery/azure/latest/tables.

Based on the services, we will collect data from the tables as mentioned above.


## User configuration

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| config | JSON object | Yes | It contains the configuration parameter for the source |  |
| schemaRef | JSON object | Yes | Use {“type”: CloudQuery Azure Inventory } | Not modifiable |
| sourceType | string | Yes | Use universal for CloudQuery Azure Inventory | Not modifiable |


### Configuration parameters

| Parameter | Type | Required | Default | Description | Access |
|:---|:---|:---|:---|:---|:---|
| name | string | No |  | Type the desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field _source. | Modifiable |
| description | string | No |  | Type a description of the Source. | Modifiable |
| clientId | string | Yes |  | It’s a unique identifier assigned to an application that is registered with Azure AD | Modifiable |
| clientSecret | string | Yes |  | It’s a secure password that an application uses to authenticate with Azure services | Modifiable |
| tenantId | string | Yes |  | It’s a unique identifier assigned that represents a specific instance of Azure AD | Modifiable |
| subscriptionId | array | No |  | It’s a unique identifier that ties Azure services to an Azure account | Modifiable |
| services | array | Yes |  | List of services for which the data has to be fetched. Available Options: compute, storage | Modifiable |
| pollingInterval | string | Yes | 12h | The time interval after the source will check for new data | Modifiable |


## Config JSON example

:::note
If the subscription ID is not specified, it will use all visible subscriptions.
:::

<CodeBlock language="json">{ExampleJSON}</CodeBlock>

[Download example](/files/c2c/cloudquery-azure-plugin/example.json)

## Limitations

N/A

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

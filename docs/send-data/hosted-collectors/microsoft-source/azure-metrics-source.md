---
id: azure-metrics-source
title: Azure Metrics Source
sidebar_label: Azure Metrics Source
description: Learn how to collect Azure metrics.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/azure-metrics/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/azure-metrics/example.json';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

<img src={useBaseUrl('img/send-data/azure-event-hub.svg')} alt="icon" width="40"/>

Azure Metrics Source is used to collect all available metrics from Azure Monitor into Sumo Logic. To obtain a complete list of metrics that are collected using this source, refer to the [Azure Documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/metrics-index#supported-metrics-and-log-categories-by-resource-type).

## Setup

### Vendor configuration

The Azure Metrics Source requires you to provide **Tenant Id**, **Client Id**, and **Client Secret** while configuring. To obtain these values, follow the below steps:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Navigate to Sumo Logic's [Custom Deployment wizard](https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FSumoLogic%2Fsumologic-azure-serverless%2Fmain%2FAzureMetrics%2FRoleAssignmentSubscriptions.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FSumoLogic%2Fsumologic-azure-serverless%2Fmain%2FAzureMetrics%2FCreateUIDefSubscriptions.json).
1. In the **Custom Deployment** page, under **Basics** tab, select the **Subscription**, **Resource Group**, and **Region** in which to deploy the Application, then click **Next**.<br/><img src={useBaseUrl('img/send-data/azure-metrics-source/basics.png')} alt="basics" style={{border:'1px solid gray'}} width="500"/>
1. Under the **App Registration** tab:<br/><img src={useBaseUrl('img/send-data/azure-metrics-source/app-registration.png')} alt="app-registration" style={{border:'1px solid gray'}} width="500"/> 
    1. Select service principal type as **Create new** to create a new app.
    1. Click **Change selection** to enter the name and select **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)** as supported account types. Click **Register** to register the application.<br/><img src={useBaseUrl('img/send-data/azure-metrics-source/register.png')} alt="register" style={{border:'1px solid gray'}} width="400"/> 
1. In the re-directed **Certificates & secrets** page, under **Client secrets** tab, click **+ New client secret**.<br/><img src={useBaseUrl('img/send-data/azure-metrics-source/new-client-secret.png')} alt="new-client-secret" style={{border:'1px solid gray'}} width="600"/> 
        1. **Description**. Enter the description of your choice.
        1. **Expires**. From the dropdown, select the expiry time period to the secret value.
        1. Copy and save the **Value**.<br/><img src={useBaseUrl('img/send-data/azure-metrics-source/client-secrets.png')} alt="client-secrets" style={{border:'1px solid gray'}} width="600"/>   
1. Navigate to **Overview**, copy and save the **Application (client) ID** and **Directory (tenant) ID**.<br/><img src={useBaseUrl('img/send-data/azure-metrics-source/overview.png')} alt="overview" style={{border:'1px solid gray'}} width="600"/>  
1. Close the **Overviews** page to go back to the **Custom Deployment** page.
1. Enter the copied **Value** in the **Client secret** section, then click **Next**. <br/><img src={useBaseUrl('img/send-data/azure-metrics-source/add-client-secret.png')} alt="add-client-secret" style={{border:'1px solid gray'}} width="500"/>  
1. Under **Subscription** tab, select the subscriptions from which you would like to collect metrics, then click **Next**. <br/><img src={useBaseUrl('img/send-data/azure-metrics-source/subscriptions.png')} alt="subscriptions" style={{border:'1px solid gray'}} width="500"/>  
1. Click **Review + Create**. On the **Review + Create** tab review the details and click **Create**.<br/><img src={useBaseUrl('img/send-data/azure-metrics-source/create.png')} alt="create" style={{border:'1px solid gray'}} width="500"/> 

### Source configuration

When you create a Azure Metrics source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the Azure Metrics Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the collectors page, click **Add Source** next to a Hosted Collector.
  :::note
      Make sure the hosted collector is tagged with tenant_name field for the out of the box Azure apps to work. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
  :::
1. Search for and select **Azure Metrics** icon.
1. Enter a **Name** to display for the source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Tenant Id**. Enter the Tenant Id collected from [Azure platform](#vendor-configuration).
1. **Client Id**. Enter the Client Id collected from [Azure platform](#vendor-configuration).
1. **Client Secret**. Enter the Client Secret collected from [Azure platform](#vendor-configuration).
1. **View Subscriptions**. Click View Subscriptions to verify the authentication credentials entered to get Azure access.
1. **Environment**. Select the environment from the dropdown from which you would like to collect metrics.
1. **Azure Regions**. Select **All Regions**, if you want to collect metrics from all regions. Or, click **Select Regions** to select the region of your choice from the dropdown to collect metrics.
1. **Azure Namespaces**. Select **All Namespaces**, if you want to collect metrics with all namespaces. Or, click **Select Namespaces** to select the namespaces of your choice from the dropdown to collect metrics.
1. **Tags Filter**. Select any tag filter from the dropdown to enforce it with the each namespace. This helps you to further fine-tune from which resources you would like to collect metrics. It only supports resource tags which are custom user-configured key-value pairs on the azure resource. This approach allows for dynamic discovery, so for example if the resources are ephemeral or if any new resources are created in the same namespace , region and are tagged with same key-value pairs as configured in the source, their metrics can be collected automatically.
1. **Scan Interval**.  This option sets how often the source is scanned. Setting a shorter frequency increases message volume, and can cause your deployment to incur additional charges. The minimum acceptable scan interval is 1 minute.
1. **Processing Rules for Metrics (Optional)**. Configure any desired filters, such as allowlist and denylist, as described in [Metrics Include and Exclude Rules](/docs/send-data/collection/processing-rules/metrics-include-and-exclude-rules).
    ![filtersprocessingrules.png](/img/send-data/filtersprocessingrules.png)

## JSON configuration

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| environment | String | Yes | `null` | Type of environment from which you would like to collect metrics. | |
| limitToRegions | Array | No | `null` | Specify the regions from which you want to collect metrics. To collect from all regions, leave `null`. | |
| limitToNamespaces | Array | No | `null` | Specify the namespaces from which you want to collect metrics. To collect from all namespaces, leave `null`. | |
| tagFilters | JSON Object | No | `null` | For each namespace, if defined, the source will only collect metrics for resources that match the tag filter. | |
| tenantId | String | Yes | `null` | Enter the tenant Id collected from the Azure platform. | |
| clientId | String | Yes | `null` | Enter the client Id collected from the Azure platform.| |
| clientSecret | String | Yes | `null` | Enter the client secret collected from the Azure platform.| |
| scanInterval | Integer | No | 1 minute | How frequently the integration should collect the metrics data from Azure. <br /> **Options**: 1m or 5m. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/azure-metrics/example.json" target="_blank">Download example</a>

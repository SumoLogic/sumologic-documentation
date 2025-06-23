---
id: azure-container-instances
title: Azure Container Instances
description: Learn about the Sumo Logic collection process for the Azure Container Instances service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-container-instances.png')} alt="Thumbnail icon" width="50"/>

[Azure Container Instances](https://learn.microsoft.com/en-us/azure/container-instances/) is a fully managed serverless container service that enables you to deploy and manage containers in Azure without the need for virtual machines. It is ideal for event-driven applications, microservices, and batch processing workloads.

## Log and metric types

For Azure Container Instances, you can collect the following logs and metrics:

* **Audit Logs**. The activity log contains subscription-level events that track operations for each Azure resource as seen from outside that resource. For more details, refer to the [Azure Documentation](https://learn.microsoft.com/en-us/azure/container-instances/monitor-azure-container-instances#azure-activity-log).
* **Resource Logs**. Capture container creation, execution, and failure logs. Refer to the [Microsoft Documentation](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-monitor#resource-logs) to know about the schema for resource logs.
* **Metrics**. Metrics for Azure Container Instances are in the following namespace:
  * [Microsoft.ContainerInstance/containerGroups](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-containerinstance-containergroups-metrics)

For more information on supported dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-monitor#metrics).

## Setup

* Set up application logs collection using fluent-bit sidecar container using the [http output plugin](https://docs.fluentbit.io/manual/1.5/pipeline/outputs/http) and the [tail input plugin](https://docs.fluentbit.io/manual/1.5/pipeline/inputs/tail). You must explicitly enable fluent-bit collection for each container group which you want to monitor.
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

### Configure metrics collection

import MetricsSourceBeta from '../../reuse/metrics-source-beta.md';

<MetricsSourceBeta/>

### Configure logs collection

:::note Prerequisite
Use existing resource group or create a new one for deploying Azure container instances.
:::

1. Create a hosted collector and tag the `tenant_name` field
   <img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Storage Tag Tenant Name" style={{border: '1px solid gray'}} width="800" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. Download and update the [output_conf.yaml](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/output_conf.yaml) file with the following configurations:
   * Inputs pipeline uses the [tail input plugin](https://docs.fluentbit.io/manual/pipeline/inputs/tail). Update the path parameter value with the pattern specifying a specific log file or multiple ones through the use of common wildcards. 
      :::info
      Multiple patterns separated by commas are also allowed.
      :::
   * Outputs pipeline uses the [http output plugin](https://docs.fluentbit.io/manual/pipeline/outputs/http). Follow the below steps to update other outputs pipeline parameters:
      * **format**. Data format by which you can send logs to Sumo Logic. By default, the format key will be assigned with *json_lines*.
      * **compress**. Payload compression mechanism. By default, the compression is enabled and uses `gzip`.
      * **host**. Update the host depending on your [Sumo Logic Orgs deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
      * **tls**. This field will be in *on* condition to enable the TLS support. By default, Sumo Logic only supports **tls** in *on* condition.
      * **tls.verify**. This field will be in *off* condition to disable the certificate validation. By default, Sumo Logic only supports **tls.verify** in *off* condition.
      * **URI**. Update the `[PrivateKey]` with the path present in the HTTP source endpoint as configured in the Step 1.
      * **header**. Update the X-Sumo-Fields header and replace the following values to enrich the logs with additional metadata, which helps with panel queries.
         - `resource_name`. Name of the Azure container instances resource.
         - `resource_group`. Name of the resource group where the Azure container instances resource is present. Ensure that you use the same resource group created in the prerequisite section.
         - `subscription_id`. ID associated with a subscription where the Azure container instances resource is present.
         - `location`. The region to which the Azure container instances resource name belongs to.
1. Create and push a custom fluentbit image using a [Docker file](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/Dockerfile) and [output_conf.yaml](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/output_conf.yaml) to any container repository.
1. Download and update the [logging-sidecar-deploy.yaml](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/logging-sidecar-deploy.yaml) file with the following configurations:
   - Update the `location` value with the region where the Azure container instances resource will be deployed.
   - Update the `name` value with the name of the Azure container instances resource. Ensure that this value is same as the `resource_name` in the `output_conf.yaml` file.
   - Update the `nginx` container with your own application image whose logs you want to collect. For example, in the `logging-sidecar-deploy.yaml` file we have used nginx application as an example whose log files are created in a shared volume (/var/log/nginx).
   - In the `fluentbit` container, replace the `{custom-fluentbit-image-path}` with the custom fluentbit image path that you created in the Step 2.
   - In the `imageRegistryCredentials` property, enter your image repository server, username, and password.
1. Deploy the [logging-sidecar-deploy.yaml](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/logging-sidecar-deploy.yaml) Azure template, refer to the [Azure Documentation](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-multi-container-yaml#deploy-the-container-group).

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Skip this step if you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

## Installing the Azure Container Instances app

Now that you have set up data collection, install the Azure Container Instances Sumo Logic app to use the pre-configured [dashboards](#viewing-the-azure-container-instances-dashboards) that provide visibility into your environment for real-time analysis of azure resources.

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation process, the following fields will be created by default:

- `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
- `location`. The region to which the resource name belongs to.
- `subscription_id`. ID associated with a subscription where the resource is present.
- `resource_group`. The resource group name where the Azure resource is present.
- `provider_name`. Azure resource provider name (for example, Microsoft.Network).
- `resource_type`. Azure resource type (for example, storage accounts).
- `resource_name`. The name of the resource (for example, storage account name).
- `service_type`. Type of the service that can be accessed with a Azure resource.
- `service_name`. Services that can be accessed with an Azure resource (for example, in Azure Container Instances the service is Subscriptions).

## Viewing the Azure Container Instances dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Error Logs

The **Azure Container Instance - Error Logs** dashboard provides detailed information on the container activity. This dashboard also provides comprehensive overview of Total Errors, Top 10 Errors bar chart, Log Level Error distribution, Error Trend by Container, and Recent Container Logs.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/Azure-Container-Instances-Error-Logs.png')} alt="Azure Container Instance - Error Logs" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure Container Instances - Administrative Operations** dashboard provides details on the operational activities and status of your Azure Container Instances resources.

Use this dashboard to:
* Monitor the distribution of operation types and their success rates to ensure proper functioning of your Container Instances system.
* Identify potential issues by analyzing the top operations causing errors and correlating them with specific users or applications.
* Track recent write and delete operations to maintain an audit trail of changes made to your Azure Container Instances configuration.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/Azure-Container-Instances-Administrative-Operations.png')} alt="Azure Container Instances - Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Resources

The **Azure Container Instances - Resources** dashboard shows average memory usage, avg CPU usage, and average network bytes received and transmitted per sec.

Use this dashboard to:
* Monitor Average Memory and CPU usage with it's trend.
* Monitor Average Received and Transmitted network bytes.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/Azure-Container-Instances-Resources.png')} alt="Azure Container Instances - Errors" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure Container Instances - Policy and Recommendations** dashboard provides details on policy events and recommendations for your Azure Container Instances resources.

Use this dashboard to:
* Monitor the success and failure rates of policy events to ensure proper configuration and compliance.
* Track and analyze recent recommendations to improve the performance and security of your Azure Container Instances setup.
* Identify trends in policy events and recommendations over time to proactively address potential issues.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/Azure-Container-Instances-Policy-and-Recommendations.png')} alt="Azure Container Instances - Policy and Recommendations" style={{border: '1px solid gray'}} width="800" />

### Azure Container Instances alerts

These alerts are metric based and will work for all Azure Container Instances.

| Alert Name | Description  | Alert Condition  | Recover Condition    |
|:-- |:-- |:--|:---------------------|
| `Azure Container Instances - Memory Usage` | This alert is triggered when memory usage is greater than 20 MB. Also warning alert is triggered when the memory usage exceeds 15 MB. | Data volume > 20MB | Data volume < = 20MB |
| `Azure Container Instances - CPU Usage` | This alert is triggered when CPU usage is greater than 100 milicore. Also warning alert is triggered when the CPU usage exceeds 90 millicore. | millicores > 100  | millicores < = 100    |

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection) in *Collect Metrics from Azure Monitor*.

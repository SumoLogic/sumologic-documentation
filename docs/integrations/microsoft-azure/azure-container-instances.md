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
* **Metrics**. Metrics for Azure Container Instances are in the following namespaces:
  * [Microsoft.ContainerInstance/containerGroups](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-containerinstance-containergroups-metrics)

For more information on supported dimensions, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-monitor#metrics).

## Setup

* Set up application logs collection using fluent-bit sidecar container using the [http output plugin](https://docs.fluentbit.io/manual/1.5/pipeline/outputs/http) and the [tail input plugin](https://docs.fluentbit.io/manual/1.5/pipeline/inputs/tail). You must explicitly enable fluent-bit collection for each container group which you want to monitor.
* Set up metrics collection using Azure Metrics Source.
  
  :::note
  Sumo Logic Metrics source is currently in Beta, to participate, contact your Sumo Logic account executive.
  :::
  
### Configure field in field schema

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. 
1. Search for the following fields:
   - `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
   - `location`. The region to which the resource name belongs to.
   - `subscription_id`. ID associated with a subscription where the resource is present.
   - `resource_group`. The resource group name where the Azure resource is present.
   - `provider_name`. Azure resource provider name (for example, Microsoft.Network).
   - `resource_type`. Azure resource type (for example, storage accounts).
   - `resource_name`. The name of the resource (for example, storage account name).
   - `service_type`. Type of the service that can be accessed with a Azure resource.
   - `service_name`. Services that can be accessed with an Azure resource (for example, in Azure Container Instances service is Subscriptions).
1. Create the fields if they are not present. Refer to [Manage fields](/docs/manage/fields/#manage-fields).

### Configure field extraction rules

Create the following Field Extraction Rule(s) (FER) for Azure Storage by following the instructions in [Create a Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule/).

#### Azure location extraction FER

   ```sql
   Rule Name: AzureLocationExtractionFER
   Applied at: Ingest Time
   Scope (Specific Data): tenant_name=*
   ```

   ```sql title="Parse Expression"
   json "location", "properties.resourceLocation", "properties.region" as location, resourceLocation, service_region nodrop
   | replace(toLowerCase(resourceLocation), " ", "") as resourceLocation
   | if (!isBlank(resourceLocation), resourceLocation, location) as location
   | if (!isBlank(service_region), service_region, location) as location 
   | if (isBlank(location), "global", location) as location
   | fields location
   ```

#### Resource ID extraction FER

   ```sql
   Rule Name: AzureResourceIdExtractionFER
   Applied at: Ingest Time
   Scope (Specific Data): tenant_name=*
   ```

   ```sql title="Parse Expression"
   json "resourceId", "ResourceId" as resourceId1, resourceId2 nodrop
   | if (isBlank(resourceId1), resourceId2, resourceId1) as resourceId
   | toUpperCase(resourceId) as resourceId
   | parse regex field=resourceId "/SUBSCRIPTIONS/(?<subscription_id>[^/]+)" nodrop
   | parse field=resourceId "/RESOURCEGROUPS/*/" as resource_group nodrop
   | parse regex field=resourceId "/PROVIDERS/(?<provider_name>[^/]+)" nodrop
   | parse regex field=resourceId "/PROVIDERS/[^/]+(?:/LOCATIONS/[^/]+)?/(?<resource_type>[^/]+)/(?<resource_name>.+)" nodrop
   | parse regex field=resource_name "(?<parent_resource_name>[^/]+)(?:/PROVIDERS/[^/]+)?/(?<service_type>[^/]+)/?(?<service_name>.+)" nodrop
   | if (isBlank(parent_resource_name), resource_name, parent_resource_name) as resource_name
   | fields subscription_id, location, provider_name, resource_group, resource_type, resource_name, service_type, service_name
   ```

### Configure metric rules

:::note
Sumo Logic Metrics source is currently in Beta, to participate, contact your Sumo Logic account executive.
:::

Create the following metrics rules by following the instructions in [Create a metrics rule](/docs/metrics/metric-rules-editor/#create-a-metrics-rule).

#### Azure observability metadata extraction container instance level

   ```sql
   Rule Name: AzureObservabilityMetadataExtractionAzureContainerInstanceLevel
   ```

   ```sql title="Metric match expression"
   resourceId=resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/MICROSOFT.CONTAINERINSTANCE/*/* tenant_name=*
   ```
   | Fields extracted  | Metric rule                 |
   |:------------------|:----------------------------|
   | subscription_id   | $resourceId._1              |
   | resource_group    | $resourceId._2              |
   | provider_name     | MICROSOFT.CONTAINERINSTANCE |
   | resource_type     | $resourceId._3              |
   | resource_name     | $resourceId._4              |

### Configure logs collection

1. Add a hosted collector and [HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. Create and push a custom image using a <a href="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/Dockerfile" target="_blank">Docker file</a> and <a href="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/output_conf.yaml" target="_blank">output_conf.yaml</a> onto a Docker hub.
3. Use existing resource group or create a new one in Azure.
4. Update the <a href="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/logging-sidecar-deploy.yaml" target="_blank">**logging-sidecar-deploy.yaml**</a> file with your own application image whose logs you want to collect. In the file we have used nginx application as an example whose log files(access logs and error logs) are created in a shared volume(/var/log/nginx).
4. Deploy the <a href="/files/logging-sidecar-deploy.yaml" target="_blank">**logging-sidecar-deploy.yaml**</a> Azure template.
   * parameter - `/fluent-bit/bin/fluent-bit` is fluent-bit executable path.
   * parameter - `-c /root/output_conf.yaml` is fluent-bit configuration file path.
      * Inputs parameters in the `output_conf.yaml` file.
         * **tail**. Read logs command name.
         * **path**. Log file path from where fluent bit collector is collecting logs.
      * Outputs parameters in the `output_conf.yaml` file.
          * **name*. HTTP output collector. By default, the name key will be assigned with *http* as value.
          * **format**. Data format by which you can send logs to Sumo Logic. By default, the format key will be assigned with *json_lines* as value.
          * **compress**. Payload compression mechanism. The recommended file type from Sumo Logic is `gzip`.
          * **match**. Log matching rule.
          * **host**. Sumo Logic collector host.
          * **port**. Sumo Logic collector port.
          * **tls=on**. By default, *on* value will be assigned to enable the TLS support.
          * **tls.verify**. By default, *off* value will be assigned to disable the certificate validation.
          * **URI**. Sumo Logic HTTP collector URI.
          * **json_date_key**. Name of the date field in output.
          * **header**. X-Sumo-Fields header used to tag fields during logs collection.

To learn more details on how to deploy azure container instance, refer to the [Azure Documentation](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-quickstart).

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Skip this step if you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

## Viewing the Azure Container Instances dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Error Logs

The **Azure Container Instance - Error Logs** dashboard provides detailed information on the container activity. This dashboard also provides comprehensive overview of Total Errors, Top 10 Errors bar chart, Log Level Error distribution, Error Trend by Container, and Recent Container Logs.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Container-Instances/Azure-Container-Instance-Error-Logs.png')} alt="Azure Container Instance - Error Logs" style={{border: '1px solid gray'}} width="800" />

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

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection) in *Collect Metrics from Azure Monitor*.

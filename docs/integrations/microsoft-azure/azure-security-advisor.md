---
id: azure-security-advisor
title: Azure Security - Advisor
description: Learn how to assess Azure Advisor’s recommendations, track remediation progress over time, and take action to enhance the security and efficiency of your Azure infrastructure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-security-advisor.png')} alt="Thumbnail icon" width="50"/>

The **Azure Security - Advisor** app provides security analysts visibility into Azure Advisor’s recommendations on security, reliability, operational excellence, and cost optimization. It helps organizations proactively address risks, improve the cloud infrastructure's resiliency, and optimize Azure resource use.

:::info
This app includes [built-in monitors](#azure-security-advisor-alerts). For details on creating custom monitors, refer to [Create monitors for Azure Security - Advisor app](#create-monitors-for-azure-security-advisor-app).
:::

## Log types

You can collect the following logs for the Azure Security - Advisor app:

* [Security Recommendations](https://learn.microsoft.com/en-us/azure/defender-for-cloud/review-security-recommendations)
* [Cost Recommendations](https://learn.microsoft.com/en-us/azure/advisor/advisor-reference-cost-recommendations)
* [Reliability Recommendations](https://learn.microsoft.com/en-us/azure/advisor/advisor-reference-reliability-recommendations)
* [Operational Excellence Recommendations](https://learn.microsoft.com/en-us/azure/advisor/advisor-reference-operational-excellence-recommendations)

### Sample log messages

<details>
<summary>Recommendation</summary>

```json 
{
"schemaId": "azureMonitorCommonAlertSchema",
"data": {
    "essentials": {
      "alertId": "/subscriptions/11111111-1111-1111-1111-111111111/providers/Microsoft.AlertsManagement/alerts/c37da162-ef73-4621-7a47-7ad188fcf000",
      "alertRule": "Sumo-Advisor Inegration",
      "targetResourceType": "microsoft.containerservice/managedclusters",
      "alertRuleID": "/subscriptions/11111111-1111-1111-1111-111111111/resourceGroups/AG-SUMO/providers/microsoft.insights/activityLogAlerts/Sumo-Advisor Inegration",
      "severity": "Sev4",
      "signalType": "Activity Log",
      "monitorCondition": "Fired",
      "targetResourceGroup": "k8sjkse-azure-k8stest",
      "monitoringService": "Activity Log - Recommendation",
      "alertTargetIDs": [
        "/subscriptions/11111111-1111-1111-1111-111111111/resourcegroups/k8sjkse-azure-k8stest/providers/microsoft.containerservice/managedclusters/k8s-19-aks1-31-otc-dev-v4"
      ],
      "configurationItems": [
        "k8s-19-aks1-31-otc-dev-v4"
      ],
      "originAlertId": "23e7e500-ff78-6080-4a77-a1eb7f77501c_72d226723d2a3bd9e51379e34ed380ef",
      "firedDateTime": "2025-02-28T04:48:41.319118Z",
      "description": "Sumo-Advisor Inegration",
      "essentialsVersion": "1.0",
      "alertContextVersion": "1.0",
      "investigationLink": "https://portal.azure.com/#view/Microsoft_Azure_Monitoring_Alerts/Investigation.ReactView/alertId/%2fsubscriptions%2f11111111-1111-1111-1111-111111111%2fresourceGroups%2fk8sjkse-azure-k8stest%2fproviders%2fMicrosoft.AlertsManagement%2falerts%2fc37da162-ef73-4621-7a47-7ad188fcf000"
    },
    "alertContext": {
      "channels": "Operation",
      "claims": "{\"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress\":\"Microsoft.Advisor\"}",
      "caller": "Microsoft.Advisor",
      "correlationId": "5b3ef3ba-39b3-450c-824c-c26101c26b99",
      "eventSource": "Recommendation",
      "eventTimestamp": "2025-02-28T04:40:12.4607874+00:00",
      "httpRequest": "{\"clientIpAddress\":\"0.0.0.0\"}",
      "eventDataId": "23e7e500-ff78-6080-4a77-a1eb7f77501c",
      "level": "Informational",
      "operationName": "Microsoft.Advisor/recommendations/available/action",
      "operationId": "",
      "properties": {
        "recommendationSchemaVersion": "1.0",
        "recommendationCategory": "HighAvailability",
        "recommendationImpact": "High",
        "recommendationName": "Enable Autoscaling for your system node pools",
        "recommendationResourceLink": "https://portal.azure.com/#blade/Microsoft_Azure_Expert/RecommendationListBlade/source/ActivityLog/recommendationTypeId/70829b1a-272b-4728-b418-8f1a56432d33/resourceId/%2Fsubscriptions%2F11111111-1111-1111-1111-111111111%2Fresourcegroups%2Fk8sjkse-azure-k8stest%2Fproviders%2FMicrosoft.ContainerService%2FmanagedClusters%2Fk8s-19-aks1-31-otc-dev-v4",
        "recommendationType": "70829b1a-272b-4728-b418-8f1a56432d33"
      },
      "status": "Active",
      "subStatus": "",
      "tenantId": "",
      "submissionTimestamp": "2025-02-28T04:40:12.4607874+00:00",
      "ReceivedTime": "2025-02-28T04:46:34+00:00",
      "ingestionTime": "2025-02-28T04:46:37.5062562+00:00",
      "Activity Log Event Description": "A new recommendation is available."
    },
    "customProperties": {
      
    }
  }
}
```
</details>

### Sample queries

```sql title="Recommendation"
_sourceCategory=azure/advisor 
| json field=_raw 
    "data.alertContext.properties.recommendationResourceLink", "data.essentials.alertId", "data.alertContext.level", "data.alertContext.properties.recommendationImpact", "data.alertContext.ReceivedTime", "data.alertContext.properties.recommendationName", "data.alertContext.properties.recommendationCategory", "data.essentials.targetResourceType", "data.essentials.targetResourceGroup", "data.alertContext.tenantId", "data.essentials.investigationLink" as recommendation_link, alert_id, severity, impact, recommendation_eval_date,display_name, category,affected_resource_type, affected_resource_name, tenant_id,   azure_portal_link nodrop
| parse regex field=alert_id "subscriptions/(?<subscription_id>[a-f0-9\-]+)"

| replace(recommendation_eval_date,/(\.\d+Z)/, "") as recommendation_eval_date
| replace(recommendation_eval_date,"T", " ") as date
| tourl(recommendation_link,display_name) as recommendation
```

## Setup

To send Azure Advisor events to Sumo Logic, you can configure the [Azure Advisor’s alert](https://learn.microsoft.com/en-us/azure/advisor/advisor-alerts-portal) with [Action group](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups) as a webhook.

### Step 1: Configure Sumo Logic HTTP source

[Create Sumo Logic HTTP source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source) and make a note of the HTTP URL.

### Step 2: Create an Azure Advisor alert

Refer to [Create Azure Advisor alerts in the Azure portal](https://learn.microsoft.com/en-us/azure/advisor/advisor-alerts-portal) to configure an Azure Advisor alert for Sumo Logic.
Sumo Logic recommends you to select the **Category and impact level** option in the **Condition** section while creating the alert.

### Step 3: Create an action group

Refer to [Create an action group in the Azure portal](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups) to create an action group for the Azure Advisor alert in step 2.
Sumo Logic recommends you to select the **Action type** as **Webhook** and then provide the Sumo Logic HTTP Source URL that you collected from step 1.

## Installing the Azure Security - Advisor app   

This section shows you how to install the Azure Security - Advisor app for Sumo Logic.

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Viewing the Azure Service Bus dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Advisor Security Recommendations

The **Azure Security - Advisor Security Recommendations** provides security analysts with insights into security recommendations from Azure Advisor, categorized by severity (high, medium, low) to help prioritize risks. It highlights affected resource types and assets, enabling quick identification of vulnerabilities. A trend analysis graph visualizes recommendation patterns over time, tracking improvements and recurring risks. The Top Action Plan section lists prioritized recommendations with timestamps and affected resources for efficient remediation. Additionally, a summary of recommendations offers a broader view of risks across Azure services, helping security teams enhance their security posture and mitigate vulnerabilities.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure+Security+Advisor/Azure+Security++-+Advisor+Security+Recommendations.png')} alt="Advisor Security Recommendations" style={{border: '1px solid gray'}} width="800" />

### Advisor Cost Recommendations

The **Azure Security - Advisor Cost Recommendations** provides security analysts with cost optimization strategies for Azure, helping identify idle and underutilized resources to reduce cloud spending. It categorizes recommendations by impact level, highlighting priority areas for cost-saving actions. The Affected Resources panel identifies services, such as compute disks, that may benefit from resizing or deallocation. A timeline visualization tracks cost recommendations over time to monitor trends and assess optimization effectiveness. The Cost Recommendation Summary details recommendations, their impact, and associated resources, aiding informed decision-making. This dashboard helps maintain financial efficiency while ensuring optimal resource utilization in Azure.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure+Security+Advisor/Azure+Security++-+Advisor+Cost+Recommendations.png')} alt="Advisor Cost Recommendations" style={{border: '1px solid gray'}} width="800" />

### Advisor Reliability Recommendations

The **Azure Security - Advisor Reliability Recommendations** provides security analysts with insights into reliability risks affecting business-critical applications. It categorizes recommendations by severity (high, medium, low) to help prioritize reliability concerns. The dashboard highlights affected resource types and assets for quick identification of infrastructure issues. A timeline visualization tracks recommendation trends, offering insights into recurring risks. The Top Action Plan section lists prioritized recommendations with timestamps and affected resources for efficient remediation. Additionally, the Security Recommendation Summary provides an overview of reliability risks across Azure services. This dashboard helps security teams enhance system resilience, minimize downtime, and ensure optimal application performance. <br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure+Security+Advisor/Azure+Security++-+Advisor+Reliability+Recommendations.png')} alt="Advisor Reliability Recommendations" style={{border: '1px solid gray'}} width="800" />

### Advisor Operational Excellence Recommendations

The **Azure Security - Advisor Operational Excellence Recommendations** provides security analysts with insights into optimizing process workflows, enhancing resource manageability, and enforcing deployment best practices. It categorizes recommendations by impact (medium and low) to help prioritize improvements for streamlining cloud operations. The Affected Resources panel highlights impacted services, with a focus on Azure Kubernetes Service (AKS) clusters. A timeline visualization tracks trends in recommendations over time, offering a historical perspective on operational issues. The Recommendation Summary details specific recommendations and associated resources for targeted action. This dashboard helps security teams improve system reliability and maintain efficient cloud operations.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure+Security+Advisor/Azure+Security++-+Advisor+Operational+Excellence+Recommendations.png')} alt="Advisor Operational Excellence Recommendations" style={{border: '1px solid gray'}} width="800" />

## Create monitors for the Azure Security - Advisor app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Security - Advisor alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `High Impact Alert` | This alert is triggered when new high-impact advisories are generated, enabling security analysts to take immediate action to mitigate risks and maintain system integrity. The High Impact alert for Azure Advisor in Sumo Logic detects security, reliability, operational, or cost-related recommendations classified as high impact. These recommendations indicate critical risks that could significantly affect the security, performance, or efficiency of your Azure environment. | Critical | Count > 0 |

## Upgrade/Downgrade the Azure Security - Advisor app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Security - Advisor app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).

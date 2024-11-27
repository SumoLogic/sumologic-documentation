---
id: microsoft-defender-for-cloud
title: Microsoft Defender for Cloud
description: Learn about the Sumo Logic collection process for the Microsoft Defender for Cloud service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/microsoft-defender-for-cloud.png')} alt="Thumbnail icon" width="50"/>

The Sumo Logic app for Microsoft Defender for Cloud is a powerful solution designed to provide Azure cloud security analysts with actionable insights into their cloud security posture. By integrating with Microsoft Defender for Cloud, this app delivers advanced monitoring, alerting, and compliance tracking capabilities through purpose-built dashboards tailored to meet the needs of security teams.

Key features of the Microsoft Defender for Cloud app include:

- Gain real-time visibility into security alerts across your Azure environment, categorized by severity (High, Medium, Low, and Informational).
- Monitor trends in alert activity over time to identify spikes and recurring threats.
- Geolocate alerts to identify suspicious activities from embargoed or high-risk regions.
- Leverage detailed alert summaries and remediation steps for effective threat mitigation.
- Address vulnerabilities proactively by monitoring security recommendations grouped by risk levels (High, Medium, and Low).
- Visualize trends in recommendation volumes and focus on affected resources, such as Virtual Machines, Apps, and Containers.
- Analyze threats by categories like data exfiltration, unauthorized access, and account breaches.
- Follow step-by-step remediation plans to resolve high-priority risks and strengthen your overall security posture.
- Track compliance performance across critical standards, including FedRAMP, PCI DSS 4, CIS Azure Foundations, and Microsoft Cloud Security Benchmark.
- Understand pass, fail, and skip rates for specific compliance controls.
- Identify areas requiring immediate action to ensure regulatory adherence for your Azure resources.

:::info
This app includes [built-in monitors](#microsoft-defender-for-cloud-monitors). For details on creating custom monitors, refer to [Create monitors for Microsoft Defender for Cloud app](#create-monitors-for-microsoft-defender-for-cloud-app).
:::

## Log types

The Microsoft Defender for Cloud app uses the following logs:

* [Alerts](https://learn.microsoft.com/en-us/azure/defender-for-cloud/managing-and-responding-alerts)
* [Security recommendations](https://learn.microsoft.com/en-us/azure/defender-for-cloud/review-security-recommendations)
* [Regulatory compliance](https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-regulatory-compliance-standards)

## Collection configuration

To forward Microsoft Defender events to Sumo Logic, you can set up an efficient pipeline: **Microsoft Defender** > **Event Hub** > **Sumo Logic (Hosted Collector)**. This setup ensures that security events from Microsoft Defender are seamlessly ingested into Sumo Logic for monitoring and analysis.

1. **[Create a Sumo Logic Azure Event Hub Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/)**. Configure an Event Hub source to receive events from the Azure platform. This will act as the endpoint for the data pipeline.
1. **[Set up continuous export in Azure](https://learn.microsoft.com/en-us/azure/defender-for-cloud/continuous-export)**. Within the Azure portal, configure the Microsoft Defender for Cloud to export its security events to the Event Hub instance created in the previous step. Continuous export ensures that the events such as alerts, recommendations, and regulatory compliance updates are forwarded in near real-time as shown below.

## Sample log messages

<details>
<summary>Alerts</summary>

```json
{
  "VendorName": "Microsoft",
  "AlertType": "K8S_AdmissionController",
  "ProductName": "Microsoft Defender for Cloud",
  "StartTimeUtc": "2024-11-20T08:32:12.950321Z",
  "EndTimeUtc": "2024-11-20T08:32:12.950321Z",
  "TimeGenerated": "2024-11-20T09:19:16.485Z",
  "ProcessingEndTime": "2024-11-20T09:19:16.5381698Z",
  "Severity": "Informational",
  "Status": "New",
  "ProviderAlertStatus": null,
  "ConfidenceLevel": null,
  "ConfidenceScore": 0.0,
  "ConfidenceReasons": null,
  "IsIncident": false,
  "SystemAlertId": "57963b4b-3cb0-dc3a-16ed-f1e216311809",
  "CorrelationKey": null,
  "Intent": "Persistence, CredentialAccess",
  "AzureResourceId": "/subscriptions/1111111-1111-1111-111-11111111/resourceGroups/qek8dm0-azure-k8stest/providers/Microsoft.ContainerService/managedClusters/k8s--295-aks1-28-otc-dev-v4",
  "WorkspaceId": null,
  "WorkspaceSubscriptionId": null,
  "WorkspaceResourceGroup": "",
  "AgentId": "",
  "CompromisedEntity": "k8s--295-aks1-28-otc-dev-v4",
  "AlertDisplayName": "Creation of admission webhook configuration detected",
  "Description": "Kubernetes audit log analysis detected a new admission webhook configuration. Kubernetes has two built-in generic admission controllers: MutatingAdmissionWebhook and ValidatingAdmissionWebhook. The behavior of these admission controllers is determined by an admission webhook that the user deploys to the cluster. The usage of such admission controllers can be legitimate, however attackers can use such webhooks for modifying the requests (in case of MutatingAdmissionWebhook) or inspecting the requests and gain sensitive information (in case of ValidatingAdmissionWebhook).",
  "Entities": [
    {
      "$id": "4",
      "CloudResource": {
        "$id": "5",
        "ResourceId": "/subscriptions/1111111-1111-1111-111-11111111/resourceGroups/qek8dm0-azure-k8stest/providers/Microsoft.ContainerService/managedClusters/k8s--295-aks1-28-otc-dev-v4",
        "ResourceType": "Kubernetes Service",
        "ResourceName": "k8s--295-aks1-28-otc-dev-v4",
        "Metadata": {
          "IsGraphCenter": true
        },
        "Asset": true,
        "Type": "azure-resource"
      },
      "Asset": false,
      "Type": "K8s-cluster"
    },
    {
      "$ref": "5"
    }
  ],
  "ExtendedLinks": null,
  "RemediationSteps": [
    "Review the admission controller webhook associated with this configuration. The details of the webhook configuration can be retrieved by the command:\nkubectl get mutatingwebhookconfigurations sumo1732091427516-opentelemetry-operator-mutation -o json\nIf this configuration belongs to a legitimate admission controller in the cluster, you can ignore the alert."
  ],
  "ExtendedProperties": {
    "Resource type": "mutatingwebhookconfigurations",
    "Resource name": "sumo1732091427516-opentelemetry-operator-mutation",
    "Webhook configuration rules": "[{\"apiGroups\":[\"\"],\"resources\":[\"pods\"],\"operations\":[\"CREATE\"],\"apiVersions\":[\"v1\"],\"scope\":\"Namespaced\"}]",
    "resourceType": "Kubernetes Service",
    "EffectiveAzureResourceId": "/subscriptions/1111111-1111-1111-111-11111111/resourceGroups/qek8dm0-azure-k8stest/providers/Microsoft.ContainerService/managedClusters/k8s--295-aks1-28-otc-dev-v4",
    "CompromisedEntity": "k8s--295-aks1-28-otc-dev-v4",
    "ProductComponentName": "Containers",
    "EffectiveSubscriptionId": "1111111-1111-1111-111-11111111"
  },
  "ResourceIdentifiers": [
    {
      "$id": "2",
      "AzureResourceId": "/subscriptions/1111111-1111-1111-111-11111111/resourceGroups/qek8dm0-azure-k8stest/providers/Microsoft.ContainerService/managedClusters/k8s--295-aks1-28-otc-dev-v4",
      "Type": "AzureResource",
      "AzureResourceTenantId": "a39bedba-be8f-4c0f-bfe2-b8c7913501ea"
    },
    {
      "$id": "3",
      "AadTenantId": "a39bedba-be8f-4c0f-bfe2-b8c7913501ea",
      "Type": "AAD"
    }
  ],
  "AlertUri": "https://portal.azure.com/#blade/Microsoft_Azure_Security_AzureDefenderForData/AlertBlade/alertId/57963b4b-3cb0-dc3a-16ed-f1e216311809/subscriptionId/1111111-1111-1111-111-11111111/resourceGroup/qek8dm0-azure-k8stest/referencedFrom/alertDeepLink/location/centralus"
}
```
</details>

<details>
<summary>Security recommendation</summary>

```json
{
  "assessmentEventDataEnrichment": {
    "action": "Insert",
    "apiVersion": "2019-01-01",
    "isSnapshot": false
  },
  "securityEventDataEnrichment": {
    "action": "Insert",
    "apiVersion": "2019-01-01",
    "isSnapshot": false
  },
  "tenantId": "a39bedba-be8f-4c0f-bfe2-b8c7913501ea",
  "type": "Microsoft.Security/assessments",
  "kind": null,
  "location": null,
  "id": "/subscriptions/1111111-1111-1111-111-11111111/resourceGroups/AppServiceEnvV3_group/providers/Microsoft.Compute/virtualMachines/ase-ext-test/providers/Microsoft.Security/assessments/1f655fb7-63ca-4980-91a3-56dbc2b715c6",
  "name": "1f655fb7-63ca-4980-91a3-56dbc2b715c6",
  "tags": null,
  "properties": {
    "resourceDetails": {
      "source": "Azure",
      "id": "/subscriptions/1111111-1111-1111-111-11111111/resourceGroups/AppServiceEnvV3_group/providers/Microsoft.Compute/virtualMachines/ase-ext-test",
      "resourceName": "ase-ext-test",
      "resourceType": "virtualMachines",
      "resourceProvider": "Microsoft.Compute",
      "nativeResourceId": "/subscriptions/1111111-1111-1111-111-11111111/resourceGroups/AppServiceEnvV3_group/providers/Microsoft.Compute/virtualMachines/ase-ext-test"
    },
    "displayName": "Vulnerabilities in security configuration on your Linux machines should be remediated (powered by Guest Configuration)",
    "status": {
      "code": "NotApplicable",
      "cause": "UnsupportedPricingPlan",
      "description": "The subscription is not onboarded to Servers Plan 2 offering",
      "statusChangeDate": "2024-11-20T10:51:36.3376828Z",
      "firstEvaluationDate": "2024-11-20T10:51:36.3376828Z"
    },
    "additionalData": {
      "subAssessmentsLink": "/subscriptions/1111111-1111-1111-111-11111111/resourceGroups/AppServiceEnvV3_group/providers/Microsoft.Compute/virtualMachines/ase-ext-test/providers/Microsoft.Security/assessments/1f655fb7-63ca-4980-91a3-56dbc2b715c6/subAssessments"
    },
    "metadata": {
      "displayName": "Vulnerabilities in security configuration on your Linux machines should be remediated (powered by Guest Configuration)",
      "assessmentType": "BuiltIn",
      "policyDefinitionId": "/providers/Microsoft.Authorization/policyDefinitions/fc9b3da7-8347-4380-8e70-0a0361d8dedd",
      "description": "Remediate vulnerabilities in security configuration on your Linux machines to protect them from attacks.",
      "remediationDescription": "1. Select any of the findings below.<br>2. On the right pane opened, follow the instructions under 'Remediation' if exist.",
      "categories": [
        "Compute"
      ],
      "severity": "Low",
      "userImpact": "Moderate",
      "implementationEffort": "Moderate",
      "threats": [
        "DataExfiltration",
        "DataSpillage",
        "AccountBreach"
      ]
    },
    "links": {
      "azurePortal": "portal.azure.com/#blade/Microsoft_Azure_Security/RecommendationsBlade/assessmentKey/1f655fb7-63ca-4980-91a3-56dbc2b715c6/resourceId/%2fsubscriptions%2f1111111-1111-1111-111-11111111%2fresourceGroups%2fAppServiceEnvV3_group%2fproviders%2fMicrosoft.Compute%2fvirtualMachines%2fase-ext-test"
    }
  }
}
```

</details>

<details>
<summary>Regulatory compliance</summary>

```json
{
  "securityEventDataEnrichment": {
    "action": "Write",
    "apiVersion": "2019-01-01-preview",
    "isSnapshot": false,
    "interval": "00:00:00"
  },
  "id": "/subscriptions/1111111-1111-1111-111-11111111/providers/Microsoft.Security/regulatoryComplianceStandards/Microsoft-cloud-security-benchmark/regulatoryComplianceControls/LT.2/regulatoryComplianceAssessments/56a83a6e-c417-42ec-b567-1e6fcb3d09a9",
  "name": "56a83a6e-c417-42ec-b567-1e6fcb3d09a9",
  "type": "Microsoft.Security/regulatoryComplianceStandards/regulatoryComplianceControls/regulatoryComplianceAssessments",
  "properties": {
    "description": "Azure Kubernetes Service clusters should have Defender profile enabled",
    "state": "Failed",
    "scope": "Subscription",
    "passedResources": 1,
    "failedResources": 1,
    "skippedResources": 0,
    "assessmentType": "AssessmentResult",
    "assessmentDetailsLink": "https://portal.azure.com/#blade/Microsoft_Azure_Security/RecommendationsBlade/assessmentKey/56a83a6e-c417-42ec-b567-1e6fcb3d09a9/initiativeId/Microsoft-cloud-security-benchmark"
  }
}
```
</details>

## Sample queries

```sql title="Alerts"
_sourceCategory=azure/defender   SystemAlertId
| json field=_raw "SystemAlertId" as alert_id
| dedup alert_id
| json field=_raw "ExtendedProperties.EffectiveSubscriptionId" as subscription_id
| json  "AlertUri", "ExtendedProperties", "RemediationSteps", "Entities", "Description", "AlertDisplayName", "CompromisedEntity", "AzureResourceId",  "Status", "Severity", "ProcessingEndTime", "ProductName", "AlertType", "VendorName" as alert_url,alert_properties, alert_investigation_steps, alert_entities, alert_description, alert_name, alert_compromised_entity, alert_resource_id, alert_status, alert_severity, alert_created_time, alert_product_name, alert_type, alert_vendor_name  nodrop
| json field=alert_properties "resourceType" as affected_resource_type nodrop 
| json field=alert_properties "CompromisedEntity" as affected_resource nodrop

| tourl(AlertUri,alert_name) as alert_name
| replace(alert_investigation_steps,"[\"", "" ) as alert_investigation_steps
| replace(alert_investigation_steps,"\"]", "" ) as alert_investigation_steps
| replace(alert_investigation_steps,"\",\"", "\n" ) as alert_investigation_steps
| replace (alert_investigation_steps, "<br>", "\n") as alert_investigation_steps
| replace (alert_investigation_steps, /\d\./, "\n  --") as alert_investigation_steps
| replace (alert_investigation_steps, "</b>", "") as alert_investigation_steps
| replace(alert_investigation_steps,"\\n", "\n" ) as next_steps
| replace(next_steps,"\\u2022", "\n --" ) as next_steps


| count by alert_created_time, alert_name, alert_description, alert_type, alert_product_name, alert_severity,alert_status, affected_resource_type, affected_resource,next_steps

| fields - _count
```

```sql title="Security Recommendation"
_sourceCategory=azure/defender  "Microsoft.Security/assessments" 
| where type = "Microsoft.Security/assessments" 
| json field=_raw "id"
| parse regex field=id "assessments\/(?<recommendation_id>.+)"

| dedup by recommendation_id
| json  "securityEventDataEnrichment", "tenantId", "location", "properties" as security_event_data_enrichment, tenant_id, location, properties
| json field=properties "links.azurePortal" , "metadata.threats", "metadata.implementationEffort", "metadata.userImpact", "metadata.severity", "metadata.categories",  "metadata.remediationDescription", "metadata.description", "metadata.policyDefinitionId",  "metadata.assessmentType", "metadata.displayName" ,"status.firstEvaluationDate" as azure_portal_link, threats,implementation_effort, user_impact,severity, categories,remediation_description, description, policy_definitionId, assessment_type, display_name, recommendation_eval_date nodrop
| replace(categories,"[\"", "" ) as categories
| replace(categories,"\"]", "" ) as categories
| replace(threats,"[", "" ) as threats
| replace(threats,"]", "" ) as threats
| replace(threats,"\"", "" ) as threats
| replace(threats,"," ,"\n" ) as threats

| replace(recommendation_eval_date,/(\.\d+Z)/, "") as recommendation_eval_date
| replace(recommendation_eval_date,"T", " ") as date

| if (contains(azure_portal_link, "https://"), azure_portal_link, concat("https://", azure_portal_link )) as link
| if (isNull(display_name), "NA", display_name ) as display_name
| tourl(link,display_name) as recommendation
| json field=properties "resourceDetails.resourceType" as affected_resource_type 
| json field=properties "resourceDetails.resourceName" as affected_resource_name


| replace (remediation_description, "<br>", "\n") as remediation_description
| replace (remediation_description, /\d\./, "\n  --") as remediation_description
| replace (remediation_description, "</b>", "") as next_steps
| count by date, tenant_id, recommendation , severity, threats, categories ,affected_resource_type, affected_resource_name, next_steps

| fields - _count
```

```sql title="Regulatory compliance"
_sourceCategory=azure/defender  "Microsoft.Security/regulatoryComplianceStandards/regulatoryComplianceControls/regulatoryComplianceAssessments"
| json  "properties.assessmentDetailsLink", "securityEventDataEnrichment.isSnapshot", "name" as assesment_link, is_snapshot, id
| dedup by id
| where type = "Microsoft.Security/regulatoryComplianceStandards/regulatoryComplianceControls/regulatoryComplianceAssessments"
| where is_snapshot = "false"
| parse regex field=assesment_link "initiativeId\/(?<compliance_type>.+)"
| json  "properties.assessmentType", "properties.skippedResources",  "properties.failedResources",  "properties.passedResources",  "properties.scope",  "properties.state",  "properties.description" as assessment_type, skipped_resources, failed_resources, passed_resources, scope, state, description
| tourl (assesment_link,description ) as compliance

| json field=_raw "id" as subscription_id
| parse regex field=subscription_id "subscriptions\/(?<subscription_id>.+)\/providers"

// Global filters
| where subscription_id matches "*"
| where compliance_type matches "*"
| where state matches "*"
| where compliance_type matches "Microsoft-cloud-security-benchmark*"
| count by compliance, compliance_type,state,  passed_resources, failed_resources, skipped_resources
| fields - _count
```

## Installing the Microsoft Defender for Cloud app

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Viewing the Microsoft Defender for Cloud app

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Alerts

The **Microsoft Defender for Cloud - Alerts** dashboard provides a centralized view for monitoring high-priority security alerts across Azure resources. It categorizes alerts by severity, emphasizing high and critical alerts to help analysts prioritize threats. A time trend chart highlights alert volumes over recent days, providing insight into unusual activity or potential incidents. The geographical map pinpoints the locations of alerts, identifying potential threats from high-risk regions or embargoed countries.

An affected resources table lists impacted Azure services, such as virtual machines and storage accounts, to assess the scope of incidents. The dashboard also summarizes frequent alert types, enabling recognition of recurring issues like privilege escalation or malware detections. A top action plan provides recommended steps for addressing severe alerts, helping analysts respond swiftly and effectively. Lastly, an alert summary offers detailed descriptions of recent high-severity events, supporting deeper investigation and remediation efforts. This dashboard equips security teams with the insights needed to protect their Azure environment from emerging threats.

<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Microsoft-Defender-for-Cloud/Microsoft-Defender-for-Cloud-Alerts.png' alt="Microsoft-Defender-for-Cloud-Alerts" />

### Regulatory Compliance

The **Microsoft Defender for Cloud - Regulatory Compliance** dashboard provides Azure security analysts with a comprehensive view of their organization's compliance status across key regulatory standards. It highlights overall compliance pass percentages for frameworks such as FedRAMP, CIS Azure Foundations, PCI DSS 4, and Microsoft Cloud Security Benchmark. Analysts can easily monitor adherence levels and quickly identify gaps in compliance through visually engaging summaries.

The dashboard offers detailed breakdowns of passed, failed, and skipped controls for each framework, helping analysts pinpoint specific areas requiring remediation. For FedRAMP compliance, it provides insights into government workload readiness, while for PCI DSS 4, it focuses on safeguarding payment-related data. The CIS Azure Foundations section ensures alignment with security best practices, and the Microsoft Cloud Security Benchmark highlights adherence to recommended Azure configurations.

This dashboard empowers teams to prioritize remediation efforts, track progress over time, and strengthen their cloud security posture. With actionable insights and a focus on simplifying regulatory alignment, the dashboard is an essential resource for achieving and maintaining compliance in Azure environments.

<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Microsoft-Defender-for-Cloud/Microsoft-Defender-for-Cloud-Regulatory-Compliance.png' alt="Microsoft-Defender-for-Cloud-Regulatory-Compliance" />

### Security Recommendations

The **Microsoft Defender for Cloud - Security Recommendations** dashboard helps Azure cloud security analysts identify, prioritize, and address security risks across Azure resources. It provides a clear breakdown of recommendations by risk level (High, Medium, and Low) to ensure focus on critical issues. Analysts can track recommendation trends over time to monitor recurring or escalating vulnerabilities.

The dashboard highlights affected resources, such as Virtual Machines, Storage Accounts, and Apps, allowing quick action on impacted areas. It categorizes recommendations by threats, including data exfiltration, unauthorized access, and account breaches, helping teams understand attack patterns. Analysts can also view recommendations by resource type, such as Compute, Networking, or Containers, for efficient resource-specific remediation.

Detailed remediation steps are included in the Top Action Plans, providing clear guidance for resolving high-risk vulnerabilities. This dashboard empowers security teams to proactively secure their Azure environment, streamline remediation workflows, and maintain compliance with organizational security goals.

<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Microsoft-Defender-for-Cloud/Microsoft-Defender-for-Cloud-Security-Recommendations.png' alt="Microsoft-Defender-for-Cloud-Security-Recommendations" />

## Create monitors for Microsoft Defender for Cloud app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Microsoft Defender for Cloud monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Alert from Embargoed Countries` | This alert is triggered when activities or access attempts are detected from countries or regions under embargo or subject to restrictions. It highlights potential geopolitical risks or unauthorized access attempts from flagged locations. | Critical | Count > 0 | 
| `Critical Alert` | This is a high-priority alert that is triggered when a serious issue or threat is detected within your Azure environment. These alerts often correspond to malicious activities, severe configuration vulnerabilities, or critical system failures requiring immediate attention. | Critical | Count > 0|
| `Critical Security Recommendation` | This alert is triggered when a high-risk vulnerability or misconfiguration is detected in your Azure resources. It provides actionable insights for strengthening your cloud security posture. | Critical | Count > 0 |

## Troubleshooting

### Verify Event Hub data flow

If your configured Event Hub instance is not successfully sending data to Sumo Logic. Follow the below steps to troubleshoot the issue:

1. Navigate to the **Event Hub Instance Blade** in the Azure portal and select the **Data Explorer (preview)** tab to send sample events.<br/> <img src={useBaseUrl('img/integrations/microsoft-azure/event-hub-instance-blade.png')} style={{border:'1px solid gray'}} alt="event-hub-instance-blade" width="800"/>
1. In the **Data Explorer (preview)** page, click **Send event** and preview the sample events.<br/> <img src={useBaseUrl('img/integrations/microsoft-azure/data-explorer.png')} style={{border:'1px solid gray'}} alt="data-explorer" width="800"/>
1. Verify if those events are being sent to the [Sumo Logic by Live Tailing](/docs/search/live-tail/about-live-tail/). If the data matches, then the Event Hub instance will successfully send data to Sumo Logic. <br/> <img src={useBaseUrl('img/integrations/microsoft-azure/live-tailing.png')} style={{border:'1px solid gray'}} alt="live-tailing" width="800"/>

### Validate alerts at Event Hub

If you are not receiving any alerts from the Microsoft Defender to the Event Hub instance. Firstly, make sure that the generated sample alerts are received in your configured Event Hub instance. This ensures the connection between Defender and Event Hub is functioning correctly. To test the pipeline by sending sample alerts from Microsoft Defender by following the below steps:

1. In the **Microsoft Defender** console, select **Security Alerts** under **General** section.
1. In the **Security Alerts** page, select the **Sample Alerts** tab.
1. Click on **Create sample alerts** to receive the sample alerts. Thereby, to validate that the sample alerts are forwarded to the configured Event Hub instance.

<br/> <img src={useBaseUrl('img/integrations/microsoft-azure/validate-microsoft-defender-alerts.png')} style={{border:'1px solid gray'}} alt="validate-microsoft-defender-alerts" width="800"/>

:::info
There may be a delay in forwarding alerts from Microsoft Defender to the Event Hub instance. If you experience significant delays, reach out to Azure Support for assistance.
:::

## Upgrade/Downgrade the Microsoft Defender for Cloud app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Microsoft Defender for Cloud app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
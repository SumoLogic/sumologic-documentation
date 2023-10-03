---
id: microsoft-graph-azure-ad-reporting
title: Microsoft Graph Azure AD Reporting
sidebar_label: Microsoft Graph Azure AD Reporting
description: The Sumo Logic App for MS Graph Azure AD Reporting helps you to monitor and analyze user activity, sign-in patterns and provisioning activities.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/ms-graph.svg')} alt="icon" width="50"/>

The Sumo Logic App for Microsoft Graph Azure AD Reporting enables you to access and monitor data, including audit information, user activity, sign-in patterns, and provisioning activities. It helps you to gain insights into how your organization uses Azure AD and identify potential security issues.

Key features of the Microsoft Graph Azure AD Reporting app include:
- **Analyze Audit Activities**. Provides real-time user activity for every resource category and shows the distribution of audits by operations and services.
- **Monitor Sign-In activities**. Monitor sign-in activities for your organization, including the number of successful and failed sign-ins, sign-ins by user location, sign-ins by application, and sign-ins from risky countries.
- **Identify Suspicious Activities**. Identify suspicious activity, such as sign-ins from unfamiliar/risky locations or multiple sign-in attempts.
- **Analyze Provisioning Activities**. Provides distribution of provisioning activities by status, actions, and initiators. It also shows the most frequent service principals used while provisioning.

## Log Types

The App uses Microsoft Graph Azure AD Reporting Source to collect [Audit](https://learn.microsoft.com/en-us/graph/api/resources/directoryaudit?view=graph-rest-1.0), [Sign-in](https://learn.microsoft.com/en-us/graph/api/resources/signin?view=graph-rest-1.0), and [Provisioning](https://learn.microsoft.com/en-us/graph/api/resources/provisioningobjectsummary?view=graph-rest-1.0) activities.

## Sample Log Message

<details><summary>View Sample Log Message</summary>

```json title="Audit Activity Message"
{
  "id": "Directory_d4d04864-b03e-4a15-9899-cb36abd1e7d2_CYJZP_45515702",
  "category": "ApplicationManagement",
  "correlationId": "d4d04864-b03e-4a15-9899-cb36abd1e7d2",
  "result": "success",
  "resultReason": "",
  "activityDisplayName": "Hard delete service principal",
  "activityDateTime": "2023-05-09T11:41:56.7381342Z",
  "loggedByService": "Core Directory",
  "operationType": "Delete",
  "initiatedBy": {
    "user": null,
    "app": {
      "appId": null,
      "displayName": "Managed Service Identity",
      "servicePrincipalId": "3a0e6816-ad4e-44fa-9cae-ffc0ad8a2ff2",
      "servicePrincipalName": null
    }
  },
  "targetResources": [
    {
      "id": "5c0e70ea-8ac7-4d99-8313-10041699c5cc",
      "displayName": "SUMOBRDLQProcessorjw5wh7hnrrv46",
      "type": "ServicePrincipal",
      "userPrincipalName": null,
      "groupType": null,
      "modifiedProperties": [
        {
          "displayName": "TargetId.ServicePrincipalNames",
          "oldValue": null,
          "newValue": "\"551d1b05-a73a-493a-b348-dab7d1193c03;https://identity.azure.net/4ZA1q0sKiZEg6SXU8aYi7Lci6VKrg+aVo//Dp2vYGuU=\""
        },
        {
          "displayName": "ActorId.ServicePrincipalNames",
          "oldValue": null,
          "newValue": "\"ef5d5c69-a5df-46bb-acaf-426f161a21a2;https://serviceidentity.azure.net/\""
        },
        {
          "displayName": "SPN",
          "oldValue": null,
          "newValue": "\"ef5d5c69-a5df-46bb-acaf-426f161a21a2;https://serviceidentity.azure.net/\""
        }
      ]
    }
  ],
  "additionalDetails": [
    {
      "key": "AppId",
      "value": "551d1b05-a73a-493a-b348-dab7d1193c03"
    }
  ]
}
```
```json title="Sign-In Activity"
{
  "id": "66ea54eb-6301-4ee5-be62-ff5a759100",
  "createdDateTime": "2023-05-09T11:41:56.7381342Z",
  "userDisplayName": "Contoso",
  "userPrincipalName": "account1@contoso.com",
  "userId": "26be570a-ae82-4189-b4e2-a37c6808512d",
  "appId": "de8bc8b5-d9f9-48b1-a8ad-b748da725064",
  "appDisplayName": "Graph explorer",
  "ipAddress": "51.79.214.246",
  "clientAppUsed": "SMTP",
  "correlationId": "d79f5bee-5860-4832-928f-3133e22ae912",
  "conditionalAccessStatus": "success",
  "isInteractive": false,
  "riskDetail": "adminGeneratedTemporaryPassword",
  "riskLevelAggregated": "medium",
  "riskLevelDuringSignIn": "none",
  "riskState": "confirmedSafe",
  "riskEventTypes": [
    "anonymizedIPAddress",
    "maliciousIPAddress"
  ],
  "resourceDisplayName": "Microsoft Security",
  "resourceId": "00000003-0000-0000-c000-000000000000",
  "status": {
    "errorCode": 0,
    "failureReason": null,
    "additionalDetails": null
  },
  "deviceDetail": {
    "deviceId": "",
    "displayName": null,
    "operatingSystem": "Windows 10",
    "browser": "Edge 80.0.361",
    "isCompliant": null,
    "isManaged": null,
    "trustType": null
  },
  "location": {
    "city": "Redmond",
    "state": "Washington",
    "countryOrRegion": "US",
    "geoCoordinates": {
      "altitude": null,
      "latitude": 47.68050003051758,
      "longitude": -122.12094116210938
    }
  },
  "appliedConditionalAccessPolicies": [
    {
      "id": "de7e60eb-ed89-4d73-8205-2227def6b7c9",
      "displayName": "SharePoint limited access for guest workers",
      "enforcedGrantControls": [],
      "enforcedSessionControls": [],
      "result": "notEnabled"
    },
    {
      "id": "6701123a-b4c6-48af-8565-565c8bf7cabc",
      "displayName": "Medium signin risk block",
      "enforcedGrantControls": [],
      "enforcedSessionControls": [],
      "result": "notEnabled"
    }
  ]
}
```

```json title="Provisioning Activity"
{
  "id": "75b5b0ae-9fc5-8d0e-e0a9-7y6a4728de56",
  "activityDateTime": "2019-05-09T03:00:54Z",
  "tenantId": "74beb175-3b80-7b63-b9d5-6f0b76082b16",
  "jobId": "aws.74beb1753b704b63b8d56f0b76082b16.10a7a801-7101-4c69-ae00-ce9f75f8460a",
  "cycleId": "b6502552-018d-79bd-8869-j47194dc65c1",
  "changeId": "b6502552-018d-89bd-9969-b49194dc65c1",
  "provisioningAction": "update",
  "durationInMilliseconds": 3236,
  "provisioningStatusInfo": {
    "status": "failure",
    "errorInformation": null
  },
  "provisioningSteps": [
    {
      "name": "EntryImport",
      "provisioningStepType": "Import",
      "status": "success",
      "description": "Retrieved RolesCompound '10a7a801-7101-4c69-ae00-ce9f75f8460a' from Contoso",
      "details": {}
    },
    {
      "name": "EntryExportUpdate",
      "provisioningStepType": "Export",
      "status": "success",
      "description": "RolesCompound '60a7a801-7101-4c69-ae00-ce9f75f8460a' was updated in Azure Active Directory",
      "details": {
        "ReportableIdentifier": "60a7a801-7101-4c69-ae00-ce9f75f8460a"
      }
    }
  ],
  "modifiedProperties": [
    {
      "displayName": "appId",
      "oldValue": null,
      "newValue": "60a7a801-7101-4c69-ae00-ce9f75f8460a"
    },
    {
      "displayName": "Roles",
      "oldValue": null,
      "newValue": "jaws-prod-role2,jaws-prod-saml2, jayaws-role,jayaws-saml, TestRole,super-saml"
    },
    {
      "displayName": "objectId",
      "oldValue": null,
      "newValue": "6nn37b93-185a-4485-a519-50c09549f3ad"
    },
    {
      "displayName": "displayName",
      "oldValue": null,
      "newValue": "Contoso"
    },
    {
      "displayName": "homepage",
      "oldValue": null,
      "newValue": "https://signin.contoso.com/saml?metadata=contoso|ISV9.1|primary|z"
    }
  ],
  "servicePrincipal": {
    "id": "6cc35b93-185a-4485-a519-50c09549g3ad",
    "displayName": "Sontoco"
  },
  "sourceSystem": {
    "id": "d1e090e1-f2f4-4678-be44-6442ffff0621",
    "displayName": "Contoso",
    "details": {}
  },
  "targetSystem": {
    "id": "e69d4bd2-2da2-483e-bc49-aad4080b91b3",
    "displayName": "Azure Active Directory",
    "details": {
      "ApplicationId": "bcf4d658-ac9f-408d-bf04-e86dc10328fb",
      "ServicePrincipalId": "6nn35b93-185a-4485-a519-50c09549f3ad",
      "ServicePrincipalDisplayName": "Contoso"
    }
  },
  "initiatedBy": {
    "initiatingType": "user",
    "id": "",
    "displayName": "Azure AD Provisioning Service"
  },
  "sourceIdentity": {
    "identityType": "RolesCompound",
    "id": "60a7a801-7101-4c69-ae00-ce9f75f8460a",
    "displayName": "",
    "details": {}
  },
  "targetIdentity": {
    "identityType": "ServicePrincipal",
    "id": "6nn35b93-185a-4485-a519-50c09549f3ad",
    "displayName": "",
    "details": {}
  }
}
```
</details>

## Sample Query

<details><summary>View Sample Queries</summary>

```sql title="Audis by Resource Categories (Audit Activity)"
_sourceCategory="azure_ad_reporting" "activityDisplayName" "operationType"
| json "id","activityDisplayName","category","loggedByService","operationType","result","resultReason","targetResources[*].type","initiatedBy.user","initiatedBy.app" as id,activity,category,logged_by_service,operation_type,operation_result,result_reason,target_resource_type,is_user_initiator,is_app_initiator nodrop
| where category matches "{{resource_category}}"
| where logged_by_service matches"{{service}}"
| where operation_result matches "{{operation_result}}"
| where operation_type matches "{{operation_type}}"
| if (isNull(is_user_initiator),"app","user") as initiator
| where initiator matches "{{initiator}}"
| count_distinct(id) as frequency by category
| sort by frequency
```

```sql title="Sign-In Over Time (Sign-In Activity)"
_sourceCategory="azure_ad_reporting" "appDisplayName" "clientAppUsed" "ipAddress" "resourceId"
| json "id","ipAddress","clientAppUsed","isInteractive","resourceDisplayName","riskDetail","riskEventTypes","riskLevelAggregated","riskState","status.failureReason","conditionalAccessStatus" as id, ip,client_app_used,is_interactive,resource,risk_reason,risk_event_types,risk_level,risk_state,failure_reason,conditional_activity_status nodrop
| where risk_reason matches "{{risk_reason}}"
| where risk_level matches "{{risk_level}}"
| where risk_state matches "{{risk_state}}"
| where client_app_used matches "{{client_app_used}}"
| where conditional_activity_status matches "{{conditional_access_policy_status}}"
| if(isNull(failure_reason) or isBlank(failure_reason),"false","true") as sign_in_failed
| where sign_in_failed matches "{{sign_in_failed}}"
| timeslice 1d
| count_distinct(id) by _timeslice
| fillmissing timeslice
```

```sql title="Average Provisioning Activity Time (Provisioning Activity)"
_sourceCategory="azure_ad_reporting" "provisioningAction" "provisioningSteps" "provisioningStatusInfo"
| json "id","provisioningStatusInfo.status","provisioningAction","durationInMilliseconds","initiatedBy.initiatingType","servicePrincipal.displayName","sourceIdentity.identityType","sourceSystem.displayName","targetIdentity.identityType","targetSystem.displayName" as id,provisioning_status,provisioning_action,duration_in_ms,initiated_by,service_principal,source_identity_type,source_system,target_identity_type,target_system_name nodrop
| where initiated_by matches "{{initiated_by}}"
| where provisioning_action matches "{{provisioning_action}}"
| where provisioning_status matches "{{provisioning_status}}"
| where service_principal matches "{{service_principal}}"
| count_distinct(id) by duration_in_ms
| avg(duration_in_ms)
```
</details>

## Set up collection

Follow the instructions for setting up [Microsoft Graph Azure AD Reporting](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-azure-ad-reporting-source/) source and use the same source category while installing the app.

## Installing the Microsoft Graph Azure AD Reporting app​

This section has instructions for installing the Microsoft Graph Azure AD Reporting app for Sumo Logic.

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.
1. From the **App Catalog**, search for the app and select it.
1. Select **Add Integration** button to install the app.
1. Configure **Microsoft Graph Azure AD Reporting** app using the steps described in the [Microsoft Graph Azure AD Reporting Cloud-to-Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-azure-ad-reporting-source/). If you already have set up your data, skip this step by clicking on **Next**.
1. Complete the following fields:
   1. **Data Source**. Select either of these options for the data source:
      * Choose **Source Category** and then choose a source category from the list.
      * Select **Enter a Custom Data Filter** and type in a custom source category that starts with an underscore. For Example, `_sourceCategory=MyCategory`.
    2. **Folder Name**. You can retain the existing name, or enter a name of your choice for the app.
    3. Select the **Location in Library** (the default is the **Personal** folder in the library), or click **New Folder** to add a new folder.
1. Click **Next**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. You can share it with your organization.
The panels will begin to fill automatically. It's worth noting that each panel gradually fills with data that matches the time range query and has been received since the panel was created. The results will not be available right away, but with some patience, you will be able to view full graphs and maps.

## Viewing Microsoft Graph Azure AD Reporting dashboards​​

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

 You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Microsoft Graph Azure AD Reporting - Audits

**Microsoft Graph Azure AD Reporting - Audits** dashboard enables you to analyze the distribution of audit activities across resource categories, audit operations, and audit services. You can also view the distribution of user agents that perform audits and target resource types. This dashboard also highlights the most common reasons for activity failures. Additionally, it presents a summary of recent audit activities. Altogether this dashboard provides valuable insights into your organization's audit activity data.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Microsoft-Graph-Azure-AD-Reporting-Audits.png')} alt="Microsoft-Graph-Azure-AD-Reporting-Audits" width="750"/>

### Microsoft Graph Azure AD Reporting - Sign-Ins

**Microsoft Graph Azure AD Reporting - Sign-Ins** dashboard provides valuable insights into your organization's sign-in activity data over time. It displays the geographical locations of sign-in activities, including those from high-risk countries. You can also see the distribution of interactive users and the client apps used for sign-in activities. The dashboard also highlights the most frequently accessed resources. Risk analysis is provided by showing the distribution of risk states, risk levels, and risk event types. Additionally, the reasons for risk detection are displayed. The dashboard also provides visibility into recent sign-in activities, making it a useful tool for monitoring and managing your organization's security posture.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Microsoft-Graph-Azure-AD-Reporting-Sign-Ins.png')} alt="Microsoft-Graph-Azure-AD-Reporting-Sign-Ins" width="750"/>

### Microsoft Graph Azure AD Reporting - Provisioning Activities

**Microsoft Graph Azure AD Reporting - Provisioning Activities** dashboard provides valuable insights into all provisioning activities occurring in your account. It displays the average time for each provisioning activity and provides a distribution of provisioning activities by status, actions, and initiators. Additionally, you can view the most frequently used service principal during provisioning. The dashboard also gives you visibility into recent provisioning activities, making it a useful tool for monitoring and managing your organization's provisioning processes.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Microsoft-Graph-Azure-AD-Reporting-Provisioning-Activities.png')} alt="Microsoft-Graph-Azure-AD-Reporting-Provisioning-Activities" width="750"/>

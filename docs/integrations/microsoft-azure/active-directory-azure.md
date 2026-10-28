---
id: active-directory-azure
title: Azure Active Directory
sidebar_label: Azure Active Directory
description: The Sumo Logic app for Azure Active Directory provides insight into your Azure Active Directory activity, including management of roles, users, groups, directories, and applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/ad.png')} alt="Active Directory icon" width="40"/>

Azure Active Directory is a cloud-based directory and identity management service that provides directory services, application access management, and identity protection. The Sumo Logic app for Azure Active Directory helps you monitor activity in Azure AD, including role management, user management, group management, successful and failed sign-in events, directory management, application management, conditional access policies, privileged identity management, and service principal activity.

## Log types

The app uses the following log types:

* [Audit and Sign-in logs](https://docs.microsoft.com/en-us/azure/active-directory/reporting-azure-monitor-diagnostics-overview#supported-reports)

Only global administrators, security administrators, security readers, and report readers can view sign-ins and enable collection for Sign-in Events.

## Prerequisites

* An Azure subscription must be associated (attached) to AAD. For more information, see the [Azure Active Directory documentation](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-subscriptions-associated-directory).
* To export Azure Activity logs to reports, be sure you have met the [Azure Active Directory requirements](https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-activity-logs-azure-monitor).

## Collect logs for the Azure Active Directory app

To set up the logs collection in Sumo Logic:
1. Follow the directions outlined in [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/) to create an Azure event hub with the proper credentials, and to configure the event hub source in Sumo Logic.
2. Follow the directions outlined in Microsoft Entra to [stream activity logs to an event hub](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-stream-logs-to-event-hub?tabs=SumoLogic).
    1. Sign in to the Microsoft Entra admin center as at least a Security Administrator.
    1. Browse to **Identity** > **Monitoring & health** > **Diagnostic settings**. You can also select **Export Settings** from either the **Audit Logs** or **Sign-ins** page.
    1. Select **+ Add diagnostic setting** to create a new integration or select **Edit setting** for an existing integration.
    1. Enter a **Diagnostic setting name**. If you're editing an existing integration, you can't change the name.
    1. Select the log categories that you want to stream ([Audit and Sign-in logs](https://docs.microsoft.com/en-us/azure/active-directory/reporting-azure-monitor-diagnostics-overview#supported-reports)).
    1. Select the **Stream to an event hub** check box.
    1. Select the Azure subscription, event hubs namespace, and event hub where you want to route the logs.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/diagnostic-setting.png')} style={{border: '1px solid gray'}} alt="Diagnostic setting" width="800"/>

When you configure the event hubs source, define your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/AAD/Logs`.

## Install the Azure Active Directory app

Now that you have set up collection for the Azure Active Directory, install the Sumo Logic app to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Azure Active Directory dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Azure Active Directory - Overview** dashboard provides a high-level view of all AAD activity, including operation names, audit event categories, log levels, result types, geo-location, and event category breakdowns.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Overview.png')} alt="Azure Active Directory Overview" />

### Application Management

The **Azure Active Directory - Application Management** dashboard provides visibility into application consent, deleted applications, applications added or updated, service principal credential changes, and high-risk permissions granted.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Application-Management.png')} alt="Azure Active Directory Application Management" />

### Authorization, Authentication, and Other

The **Azure Active Directory - Authorization, Authentication, and Other** dashboard shows authorization policy events, OAuth token issuance failures, authentication method changes, successful and failed events, and result breakdowns.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Authorization-Authentication-and-Other.png')} alt="Azure Active Directory Authorization Authentication Other" />

### Conditional Access & MFA Posture

The **Azure Active Directory - Conditional Access & MFA Posture** dashboard measures Conditional Access policy effectiveness, MFA coverage, users signing in without MFA, users repeatedly hitting MFA prompts, and detects bypasses or policy coverage gaps.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Conditional-Access-%26-MFA-Posture.png')} alt="Azure Active Directory Conditional Access and MFA Posture" />

### Directory Management

The **Azure Active Directory - Directory Management** dashboard covers directory management events, failed and successful events, operation trends, and disabled desktop SSOs.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Directory-Management.png')} alt="Azure Active Directory Directory Management" />

### Failure Sign-In Events

The **Azure Active Directory - Failure Sign-In Events** dashboard provides insight into failed sign-in activity, risky sign-ins, geo-location of sign-in attempts, browser and application breakdowns, and login anomalies.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Failure-Sign-In-Events.png')} alt="Azure Active Directory Failure Sign In Events" />

### Group Management

The **Azure Active Directory - Group Management** dashboard tracks group creation, membership changes, members added or removed, and group-related operation trends.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Group-Management.png')} alt="Azure Active Directory Group Management" />

### Privileged Identity Management (PIM)

The **Azure Active Directory - Privileged Identity Management (PIM)** dashboard surfaces just-in-time privileged role activations, justifications, expirations, and detects abuse of the PIM workflow.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Privileged-Identity-Management-(PIM).png')} alt="Azure Active Directory Privileged Identity Management" />

### Role Management

The **Azure Active Directory - Role Management** dashboard provides details on role updates, successful and failed events, users added or removed from roles, and privileged admin role assignments.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Role-Management.png')} alt="Azure Active Directory Role Management" />

### Service Principal & Managed Identity Activity

The **Azure Active Directory - Service Principal & Managed Identity Activity** dashboard monitors non-human identities (service principals, managed identities) accessing Azure resources, credential abuse, and anomalous service principal usage.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Service-Principal-%26-Managed-Identity-Activity.png')} alt="Azure Active Directory Service Principal Managed Identity Activity" />

### Successful Sign-In Events

The **Azure Active Directory - Successful Sign-In Events** dashboard provides insight into successful sign-in activity, geo-location of sign-ins, risky sign-ins, browser and application breakdowns, and login anomalies.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Successful-Sign-In-Events.png')} alt="Azure Active Directory Successful Sign In Events" />

### User Management

The **Azure Active Directory - User Management** dashboard covers external user invites, user additions, updates, deletions, and user management event outliers.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-User-Management.png')} alt="Azure Active Directory User Management" />

## Create monitors for the Azure Active Directory app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Active Directory app alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Azure Active Directory - Failed Sign-Ins` | Alerts when MFA-related sign-in failures are detected, including authentication failed during strong authentication (500121, 500122, 500123). This may indicate MFA bypass attempts, compromised credentials, or targeted attacks against accounts with MFA enabled. | Count > 0 | Count < = 0 |
| `Azure Active Directory - High-Risk Permissions Granted to Application` | Triggers when high-risk OAuth permissions such as Mail.ReadWrite, Files.ReadWrite, Directory.ReadWrite, or RoleManagement.ReadWrite are granted to an application. This may indicate a malicious OAuth app consent or over-privileged application registration. | Count > 0 | Count < = 0 |
| `Azure Active Directory - Password Spray Detection` | Detects password spray attacks where a single IP address attempts to sign in against multiple user accounts with repeated failures. This may indicate an attacker trying commonly used passwords across many accounts to avoid lockout thresholds. | Count > 0 | Count < = 0 |
| `Azure Active Directory - PIM Activation Without Justification` | Alerts when a Privileged Identity Management (PIM) role activation is performed without a justification. This may indicate unauthorized or automated privilege escalation that violates least-privilege policies. | Count > 0 | Count < = 0 |
| `Azure Active Directory - Privileged Admin Role Assignment` | Triggers when a user is assigned a high-privilege Azure AD role such as Global Administrator, Privileged Role Administrator, or Security Administrator. This may indicate insider threats or a compromised admin account. | Count > 0 | Count < = 0 |
| `Azure Active Directory - Service Principal Credential Added` | Alerts when new credentials such as a client secret or certificate are added to a service principal. This may indicate credential stuffing, persistence by an attacker, or unauthorized changes to application identities. | Count > 0 | Count < = 0 |
| `Azure Active Directory - Sign-Ins from Risky or Compromised Accounts` | Detects sign-in activity from accounts flagged as at risk or confirmed compromised by Azure AD Identity Protection. This may indicate credential theft, account takeover, or ongoing unauthorized access. | Count > 0 | Count < = 0 |
| `Azure Active Directory - User Account Disabled` | Triggers when a user account is disabled in Azure Active Directory. This may indicate insider sabotage, a compromised admin account, or an attacker disrupting access for legitimate users. | Count > 0 | Count < = 0 |

## Upgrade/Downgrade the Azure Active Directory app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Active Directory app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

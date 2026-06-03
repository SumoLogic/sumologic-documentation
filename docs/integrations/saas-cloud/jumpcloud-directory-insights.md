---
id: jumpcloud-directory-insights
title: JumpCloud Directory Insights
sidebar_label: Jumpcloud Directory Insights
description: The Sumo Logic app for JumpCloud Directory Insights provides a comprehensive visibility into authentication events, user activities, and security-related actions within your JumpCloud-managed environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/jumpcloud-directory-insights-logo.png')} alt="JumpCloud directory insights" width="100"/>

The Sumo Logic app for JumpCloud Directory Insights provides comprehensive visibility into user activities, authentication events, and security actions within the JumpCloud-managed environment. By using JumpCloud Directory Insights logs, this app enables IT administrators and security analysts to monitor access, detect anomalies, and respond to security threats efficiently.

With pre-configured dashboards, the app delivers insights into user authentication trends, directory modifications, policy enforcement, and security incidents. Analysts can track failed login attempts, changes to privileged access, and account lockouts in real time to improve security and ensure compliance with organizational policies.

:::info
This app includes [built-in monitors](#jumpcloud-directory-insights-monitors). For details on creating custom monitors, refer to the [Create monitors for JumpCloud Directory Insights app](#create-monitors-for-the-jumpcloud-directory-insights-app).
:::

## Log types

This app uses Sumo Logic’s [JumpCloud Directory Insights Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/jumpcloud-directory-insights-source) to collect the logs from the JumpCloud Directory Insights platform.

### Sample log message

<details>
<summary>Event Log</summary>

```json
[
    {
        "initiated_by": {
            "id": "64949312a2930fd2c93b2667",
            "type": "admin",
            "email": "soaklander@sumologic.com"
        },
        "geoip": {
            "country_code": "US",
            "timezone": "America/Los_Angeles",
            "latitude": 37.7797,
            "continent_code": "NA",
            "region_name": "California",
            "longitude": -122.4159,
            "region_code": "CA"
        },
        "resource": {
            "displayName": "Sumo Logic",
            "id": "64949312a2930fd2c93b2669",
            "type": "organization"
        },
        "changes": [
            {
                "field": "customer",
                "to": false
            },
            {
                "field": "displayName",
                "to": "Sumo Logic"
            },
            {
                "field": "features",
                "to": {
                    "systemInsights": {
                        "enableNewLinux": true,
                        "enableNewWindows": true,
                        "createdAt": "2023-06-22T18:29:38.966Z",
                        "enableNewDarwin": true,
                        "enabled": true,
                        "updatedAt": "2023-06-22T18:29:38.966Z"
                    },
                    "directoryInsightsPremium": {
                        "createdAt": "2023-06-22T18:29:38.967Z",
                        "enabled": false,
                        "updatedAt": "2023-06-22T18:29:38.967Z"
                    }
                }
            },
            {
                "field": "id",
                "to": "64949312a2930fd2c93b2669"
            },
            {
                "field": "logoUrl",
                "to": null
            },
            {
                "field": "maxSystemUsers",
                "to": 10
            },
            {
                "field": "settings.contactEmail",
                "to": "soaklander@sumologic.com"
            },
            {
                "field": "settings.contactName",
                "to": "Siri Oaklander"
            },
            {
                "field": "settings.deviceIdentificationEnabled",
                "to": false
            },
            {
                "field": "settings.disableGoogleLogin",
                "to": false
            },
            {
                "field": "settings.enableManagedUID",
                "to": false
            },
            {
                "field": "settings.enableUserPortalAgentInstall",
                "to": false
            },
            {
                "field": "settings.name",
                "to": "Sumo Logic"
            },
            {
                "field": "settings.newSystemUserStateDefaults",
                "to": {
                    "applicationImport": "STAGED",
                    "manualEntry": "STAGED",
                    "csvImport": "STAGED"
                }
            },
            {
                "field": "settings.passwordPolicy",
                "to": {
                    "minLength": 8,
                    "minChangePeriodInDays": 0,
                    "enableResetLockoutCounter": false,
                    "enablePasswordExpirationInDays": false,
                    "enableMaxHistory": false,
                    "enableDaysAfterExpirationToSelfRecover": true,
                    "enableMaxLoginAttempts": true,
                    "needsSymbolic": true,
                    "daysAfterExpirationToSelfRecover": -1,
                    "needsNumeric": true,
                    "needsUppercase": true,
                    "enableMinLength": true,
                    "enableRecoveryEmail": false,
                    "resetLockoutCounterMinutes": 30,
                    "allowUsernameSubstring": false,
                    "maxHistory": 3,
                    "maxLoginAttempts": 6,
                    "passwordExpirationInDays": 90,
                    "enableDaysBeforeExpirationToForceReset": false,
                    "enableMinChangePeriodInDays": false,
                    "needsLowercase": true,
                    "lockoutTimeInSeconds": 600,
                    "daysBeforeExpirationToForceReset": 10,
                    "effectiveDate": "2023-06-22T14:27:14.338Z",
                    "enableLockoutTimeInSeconds": true
                }
            },
            {
                "field": "settings.systemUsersCanEdit",
                "to": true
            },
            {
                "field": "settings.userPortal",
                "to": {
                    "idleSessionDurationMinutes": 60
                }
            }
        ],
        "useragent": {
            "os": "Mac OS X",
            "minor": "0",
            "os_minor": "15",
            "os_major": "10",
            "os_version": "10.15.7",
            "version": "112.0.0.0",
            "os_patch": "7",
            "patch": "0",
            "os_full": "Mac OS X 10.15.7",
            "major": "112",
            "name": "Chrome",
            "os_name": "Mac OS X",
            "device": "Mac"
        },
        "auth_method": "other",
        "event_type": "organization_create",
        "service": "directory",
        "organization": "64949312a2930fd2c93b2669",
        "@version": "1",
        "client_ip": "23.118.110.219",
        "id": "64949312a2930fd2c93b266e",
        "timestamp": "2023-06-22T18:29:38.985Z"
    }
]
```
</details>

### Sample queries

```sumo title="Top 10 Services"
_sourceCategory={{Logsdatasource}} service
| json "id", "geoip.region_name", "service", "event_type" as id, region_name, service, event_type nodrop

// global filters
| where service matches "{{service}}"
| where event_type matches "{{event_type}}"
| where if ("{{region_name}}" = "*", true, region_name matches "{{region_name}}")

| where !isBlank(service)
| count by id, service
| count by service
| sort by _count, service asc
| limit 10
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for JumpCloud Directory Insights Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/jumpcloud-directory-insights-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your JumpCloud Directory Insights app is properly integrated and configured to collect and analyze your data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing the JumpCloud Directory Insights dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **JumpCloud Directory Insights - Overview** dashboard provides a comprehensive view of directory activity, including user authentications, administrative changes, and system modifications. It highlights authentication trends by tracking successful and failed logins over time, helping IT teams identify patterns. This dashboard also provides insights into user provisioning, de-provisioning, and group membership changes, offering visibility into directory structure updates. Additionally, it includes administrator actions such as password resets and policy modifications to monitor privileged activities.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud+Directory+Insights+-+Overview.png')} alt="JumpCloud Directory Insights - Overview" style={{border: '1px solid gray'}} width="800" />

### Security Overview

The **JumpCloud Directory Insights - Security Overview** dashboard focuses on security-related events, emphasizing failed login attempts, account lockouts, and privilege escalations. It provides geographic insights into authentication activities, helping you to detect suspicious login locations. This dashboard also tracks high-risk events such as MFA failures and unauthorized access attempts to enhance security monitoring. Analyzing login behaviors and access trends, it helps security teams identify potential threats and enforce compliance policies.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud+Directory+Insights+-+Security+Overview.png')} alt="JumpCloud Directory Insights - Security Overview" style={{border: '1px solid gray'}} width="800" />

### Password Manager Events

The **JumpCloud Directory Insights - Password Manager Events** dashboard provides visibility into password manager activity, including user behavior, authentication outcomes, and event type trends. It highlights geographic access patterns, failed event counts, and detailed operation summaries to support credential security monitoring. The dashboard helps teams detect suspicious vault access and investigate password-related anomalies quickly.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-Password-Manager-Events.png')} alt="JumpCloud Directory Insights - Password Manager Events" style={{border: '1px solid gray'}} width="800" />

### Directory Events

The **JumpCloud Directory Insights - Directory Events** dashboard provides insight into directory-related activity such as user actions, event types, and authentication outcomes. It surfaces MFA and status distributions, geographic patterns, and event trends to help identify risky or unusual behavior. Detailed event summaries support rapid investigation of directory changes and access anomalies.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-Directory-Events.png')} alt="JumpCloud Directory Insights - Directory Events" style={{border: '1px solid gray'}} width="800" />

### SSO and Radius Events

The **JumpCloud Directory Insights - SSO and Radius Events** dashboard provides unified visibility into SSO and RADIUS authentication activity. It tracks application access, IdP-initiated behavior, MFA and auth-type distributions, user activity, and regional access patterns. With dedicated summaries and trend panels for both services, the dashboard helps teams identify authentication failures and security gaps quickly.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-SSO-and-Radius-Events.png')} alt="JumpCloud Directory Insights - SSO and Radius Events" style={{border: '1px solid gray'}} width="800" />

### System Events

The **JumpCloud Directory Insights - System Events** dashboard provides monitoring of system-level login and host activity across JumpCloud-managed endpoints. It highlights event and status distributions, top users and hosts, geo location patterns, and temporal trends to reveal suspicious access behavior. Detailed event summaries and failure metrics support investigations into unauthorized access and brute-force activity.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-System-Events.png')} alt="JumpCloud Directory Insights - System Events" style={{border: '1px solid gray'}} width="800" />

### Software and Report Events

The **JumpCloud Directory Insights - Software and Report Events** dashboard provides comprehensive monitoring of software and report activity, including event type distributions, trend analysis, and failure tracking. It highlights geographic access patterns and detailed operational summaries to help teams validate software-related changes and reporting workflows. This dashboard supports rapid investigation of anomalous software or report events.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-Software-and-Report-Events.png')} alt="JumpCloud Directory Insights - Software and Report Events" style={{border: '1px solid gray'}} width="800" />

### LDAP Events

The **JumpCloud Directory Insights - LDAP Events** dashboard provides focused monitoring of LDAP authentication and bind activity across users, methods, and outcomes. It highlights failed event patterns, source geo location, ASN organization trends, and event type distributions to detect suspicious directory access behavior. The dashboard also includes detailed summaries and time-series views to support credential abuse investigations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-LDAP-Events.png')} alt="JumpCloud Directory Insights - LDAP Events" style={{border: '1px solid gray'}} width="800" />

### SaaS and Asset Events

The **JumpCloud Directory Insights - SaaS and Asset Events** dashboard provides visibility into SaaS application and asset management activity across your environment. It tracks event distributions, time-based trends, and geo-location patterns for both service domains, along with total and failed event metrics. Detailed SaaS and asset summaries help analysts investigate configuration changes and potential misuse.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-SaaS-and-Asset-Events.png')} alt="JumpCloud Directory Insights - SaaS and Asset Events" style={{border: '1px solid gray'}} width="800" />

### GenAI and AIGW Events

The **JumpCloud Directory Insights - GenAI and AIGW Events** dashboard delivers visibility into GenAI assistant and AI Gateway activity, including usage volume, event type distributions, and top users. It highlights service-level trends, authentication method patterns, and region-based behavior to support operational and security monitoring. Detailed summaries help teams investigate AI interaction anomalies and risk-related events efficiently.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-GenAI-and-AIGW-Events.png')} alt="JumpCloud Directory Insights - GenAI and AIGW Events" style={{border: '1px solid gray'}} width="800" />

### Access Events

The **JumpCloud Directory Insights - Access Events** dashboard provides visibility into access management activity, including event volume, success and failure outcomes, and top active users. It highlights event and resource type distributions, geographic activity patterns, and time-based trends to help teams detect anomalous access behavior. The dashboard also includes detailed event summaries for faster triage and investigation.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-Access-Events.png')} alt="JumpCloud Directory Insights - Access Events" style={{border: '1px solid gray'}} width="800" />

### Alerts and Notifications Events

The **JumpCloud Directory Insights - Alerts and Notifications Events** dashboard provides comprehensive visibility into alert lifecycle and notification channel activity. It tracks alert creation and status changes, severity trends, notification event patterns, and event status distributions over time. With detailed summary tables and trend views, the dashboard helps security teams validate alerting posture and investigate response workflow changes.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-Alerts-and-Notifications-Events.png')} alt="JumpCloud Directory Insights - Alerts and Notifications Events" style={{border: '1px solid gray'}} width="800" />

### MDM Events

The **JumpCloud Directory Insights - MDM Events** dashboard provides end-to-end visibility into mobile device management activity, including command execution, request types, status outcomes, and device counts. It surfaces MDM-type distributions, event trends, and failure indicators to help teams assess fleet health and operational reliability. Detailed event summaries support troubleshooting of enrollment and command anomalies.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud-Directory-Insights-MDM-Events.png')} alt="JumpCloud Directory Insights - MDM Events" style={{border: '1px solid gray'}} width="800" />
 
## Create monitors for the JumpCloud Directory Insights app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### JumpCloud Directory Insights monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition |
|:--|:--|:--|:--|
| `JumpCloud Directory Insights - Alerts Created` | This alert is triggered when potential security risks, configuration issues, or critical system events requiring investigation are identified. | Critical | Count > 5 |
| `JumpCloud Directory Insights - Disabled MFA` | This alert is triggered when unauthorized flags or accidental removal of MFA are identified. This could expose accounts to compromise, and immediate review is recommended to ensure compliance and security. | Critical | Count > 0 |
| `JumpCloud Directory Insights - Events from Embargoed Locations` | This alert is triggered when logins or actions from embargoed locations are detected, suggesting potential unauthorized access. Investigate to confirm legitimacy or block malicious actors. | Critical | Count > 0 |
| `JumpCloud Directory Insights - Impossible Logins` | This alert is triggered when the user account is compromised. For example, a user logging in from two distant locations consecutively. Immediate investigation is required to rule out credential theft. | Critical | Count > 0 |
| `JumpCloud Directory Insights - Unsuccessful Logins` | This alert is triggered when credentials are misconfigured or when brute-force attacks and credential stuffing are detected. Review source IPs and lock accounts if suspicious activity is confirmed. | Critical | Count > 5 |
| `JumpCloud Directory Insights - Unsuccessful SSOs` | This alert is triggered by misconfigurations in identity providers or malicious attempts to bypass SSO. Check SSO logs to identify the cause or any threats. | Critical | Count > 1 |

## Upgrade/Downgrade the JumpCloud Directory Insights app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the JumpCloud Directory Insights app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

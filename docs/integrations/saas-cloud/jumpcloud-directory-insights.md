---
id: jumpcloud-directory-insights
title: JumpCloud Directory Insights
sidebar_label: Jumpcloud Directory Insights
description: The Sumo Logic app for JumpCloud Directory Insights provides a comprehensive visibility into authentication events, user activities, and security-related actions within your JumpCloud-managed environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/jumpcloud-directory-insights-logo.png')} alt="jumpcloud-directory-insights" width="100"/>

The Sumo Logic app for JumpCloud Directory Insights provides comprehensive visibility into user activities, authentication events, and security actions in the JumpCloud managed environment. By using JumpCloud Directory Insights logs, this app enables IT administrators and security analysts to monitor access, detect anomalies, and respond to security threats efficiently.

With pre-configured dashboards, the app delivers insights into user authentication trends, directory modifications, policy enforcement, and security incidents. Analysts can track failed login attempts, privileged access changes, and account lockouts in real time to improve security and ensure organizational policy compliance.

:::info
This app includes [built-in monitors](#jumpcloud-directory-insights-monitors). For details on creating custom monitors, refer to the [Create monitors for JumpCloud Directory Insights app](#create-monitors-for-the-jumpcloud-directory-insights-app).
:::

## Log types

This app uses Sumo Logic’s [JumpCloud Directory Insights Source](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/jumpcloud-directory-insights-source/) to collect the logs from the JumpCloud Directory Insights platform.

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

```sql title="Top 10 Services"
_sourceCategory="Labs/JumpCloud"
| json "id", "timestamp", "service", "event_type", "client_ip", "success", "initiated_by.type", "auth_method", "useragent.os_full", "geoip.region_name", "resource.name" as id, event_time, service, event_type, ip, success, event_initiator, auth_method, device, region_name, resource_name nodrop

// global filters
| where service matches "{{service}}"
| where event_type matches "{{event_type}}"
| where region_name matches "{{region_name}}" OR isBlank(region_name)

| where !isBlank(service)
| count by id, service
| count as frequency by service
| sort by frequency, service
| limit 10
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for JumpCloud Directory Insights Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/jumpcloud-directory-insights-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your JumpCloud Directory Insights app is properly integrated and configured to collect and analyze your JumpCloud Directory Insights data.
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

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud+Directory+Insights+-+Overview.png')} alt="JumpCloud Directory Insights-Overview" style={{border: '1px solid gray'}} width="800" />

### Security Overview

The **JumpCloud Directory Insights - Security Overview** dashboard focuses on security-related events, emphasizing failed login attempts, account lockouts, and privilege escalations. It provides geographic insights into authentication activities, helping you to detect suspicious login locations. This dashboard also tracks high-risk events such as MFA failures and unauthorized access attempts to enhance security monitoring. By analyzing login behaviors and access trends, it helps security teams identify potential threats and enforce compliance policies.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/JumpCloud+Directory+Insights/JumpCloud+Directory+Insights+-+Security+Overview.png')} alt="JumpCloud Directory Insights-Security Overview" style={{border: '1px solid gray'}} width="800" />
 
## Create monitors for the JumpCloud Directory Insights app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### JumpCloud Directory Insights monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition |
|:--|:--|:--|:--|
| `JumpCloud Directory Insights - Alerts Created` | This alert is triggered when potential security risks, configuration issues, or critical system events requiring investigation are identified. | Critical | Count > 3 |
| `JumpCloud Directory Insights - Disabled MFA` | This alert is triggered when unauthorized flags or accidental removal of MFA are identified. This could expose accounts to compromise and immediate review is recommended to ensure compliance and security. | Critical | Count > 0 |
| `JumpCloud Directory Insights - Events from Embargoed Locations` | This alert is triggered when logins or actions from embargoed locations are detected, suggesting potential unauthorized access. Investigate to confirm legitimacy or block malicious actors. | Critical | Count > 0 |
| `JumpCloud Directory Insights - Impossible Logins` | This alert is triggered when the user account is compromised. For example, a user logging in from two distant locations consecutively. Immediate investigation is required to rule out credential theft. | Critical | Count > 0 |
| `JumpCloud Directory Insights - Unsuccessful Logins` | This alert is triggered when credentials are misconfigured, or when brute-force attacks and credential stuffing are detected. Review source IPs and lock accounts if suspicious activity is confirmed. | Critical | Count > 1 |
| `JumpCloud Directory Insights - Unsuccessful SSOs` | This alert is triggered by misconfigurations in identity providers or malicious attempts to bypass SSO. Check SSO logs to identify the cause or any threats. | Critical | Count > 1 |

## Upgrade/Downgrade the JumpCloud Directory Insights app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the JumpCloud Directory Insights app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

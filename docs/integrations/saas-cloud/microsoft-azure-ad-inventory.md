---
id: microsoft-azure-ad-inventory
title: Microsoft Azure AD Inventory
sidebar_label: Microsoft Azure AD Inventory
description: The Sumo Logic app for Microsoft Azure AD Inventory offers enhanced security monitoring by offering visibility into user activities and device management.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/ad.png')} alt="thumbnail icon" width="55"/>

The Sumo Logic app for Microsoft Azure AD Inventory provides enhanced security monitoring by offering visibility into user activities and device management. The app provides built-in dashboards that help security teams track sign-in activities, monitor user demographics, and manage devices. It supports proactive threat detection by identifying unauthorized access, tracking device compliance, and ensuring all devices meet security standards. This app is vital for maintaining a secure and compliant Azure AD environment, enabling continuous oversight and governance of organizational resources.

:::info
This app includes [built-in monitors](#microsoft-azure-ad-inventory-alerts). For details on creating custom monitors, refer to [Create monitors for Microsoft Azure AD Inventory app](#create-monitors-for-microsoft-azure-ad-inventory-app).
:::

## Log types

This app uses Sumo Logic’s Microsoft Azure AD Inventory Source to collect [Users](https://learn.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0&tabs=http) and [Devices](https://learn.microsoft.com/en-us/graph/api/resources/device?view=graph-rest-1.0) from the Microsoft Graph API.

### Sample log messages

<details>
<summary>Users</summary>

```json
{
  "businessPhones": [
    "800-555-0101"
  ],
  "displayName": "Ava",
  "givenName": "Ava",
  "jobTitle": "Financial Analyst",
  "mail": "Ava.abss@finserve.com",
  "mobilePhone": "111-222-3333",
  "officeLocation": "USA TX Dallas 234567",
  "preferredLanguage": "English",
  "surname": "abss",
  "userPrincipalName": "Ava.abss@finserve.com",
  "id": "d2c19c55-6f30-40c6-a5f7-bb345c1293c4",
  "signInActivity": {
    "lastSignInDateTime": "2024-08-27T16:11:35Z",
    "lastSignInRequestId": "cb56ef78-b78c-44aa-9123-e12d456789bc",
    "lastNonInteractiveSignInDateTime": "2024-08-26T09:21:47Z",
    "lastNonInteractiveSignInRequestId": "de78fg90-bc12-56de-7890-ij45kl678901",
    "lastSuccessfulSignInDateTime": "2024-08-27T16:11:35Z",
    "lastSuccessfulSignInRequestId": "cb56ef78-b78c-44aa-9123-e12d456789bc"
  }
}
```
</details>

<details>
<summary>Devices</summary>

```json
{
  "id": "3344aabb-ccdd-eeff-8899-1234567890ab",
  "deletedDateTime": null,
  "accountEnabled": true,
  "approximateLastSignInDateTime": "2024-08-28T17:45:00Z",
  "complianceExpirationDateTime": null,
  "createdDateTime": "2024-08-27T19:30:00Z",
  "deviceCategory": null,
  "deviceId": "qwerty12-3456-7890-abcd-efghijklmnop",
  "deviceMetadata": null,
  "deviceOwnership": "company",
  "deviceVersion": 4,
  "displayName": "Yealink-T58A",
  "domainName": null,
  "enrollmentProfileName": "Office Phone",
  "enrollmentType": "windowsBulkAzureDomainJoin",
  "externalSourceName": null,
  "isCompliant": true,
  "isManaged": true,
  "isRooted": false,
  "managementType": "eas",
  "manufacturer": "Yealink",
  "mdmAppId": "11223344-5566-7788-99aa-bbccddeeff00",
  "model": "T58A",
  "onPremisesLastSyncDateTime": null,
  "onPremisesSyncEnabled": null,
  "operatingSystem": "Android",
  "operatingSystemVersion": "10.0",
  "physicalIds": [],
  "profileType": "Printer",
  "registrationDateTime": "2024-08-27T19:30:00Z",
  "sourceType": null,
  "systemLabels": [],
  "trustType": "AzureAD",
  "extensionAttributes": {
    "extensionAttribute1": null,
    "extensionAttribute2": null,
    "extensionAttribute3": null,
    "extensionAttribute4": null,
    "extensionAttribute5": null,
    "extensionAttribute6": null,
    "extensionAttribute7": null,
    "extensionAttribute8": null,
    "extensionAttribute9": null,
    "extensionAttribute10": null,
    "extensionAttribute11": null,
    "extensionAttribute12": null,
    "extensionAttribute13": null,
    "extensionAttribute14": null,
    "extensionAttribute15": null
  },
  "alternativeSecurityIds": [
    {
      "type": 2,
      "identityProvider": null,
      "key": "eWVhbGluay1kZXZpY2Uta2V5"
    }
  ]
}
```
</details>

### Sample queries

```sql title="Total Devices"
_sourceCategory="Azure_AD_Inventory" deviceId
| json "deviceId", "isCompliant", "isManaged", "isRooted", "manufacturer", "deviceOwnership", "managementType", "profileType", "operatingSystem", "enrollmentType", "complianceExpirationDateTime", "deviceCategory", "trustType", "registrationDateTime", "onPremisesSyncEnabled", "onPremisesLastSyncDateTime", "approximateLastSignInDateTime" as device_id, is_compliant, is_managed, is_rooted, manufacturer, device_ownership, management_type, profile_type, operating_system, enrollment_type, compliance_expiration_date_time, device_category, trust_type, registration_date_time, on_premises_sync_enabled, on_premises_last_sync_date_time, approximate_last_sign_in_date_time nodrop

// Global filters
| where manufacturer matches "{{manufacturer}}"
| where device_ownership matches "{{device_ownership}}"
| where management_type matches "{{management_type}}"
| where profile_type matches "{{profile_type}}"
| where operating_system matches "{{operating_system}}"

| count by device_id
| count
```

## Collection configuration and app installation

Depending on the set up collection method, you can configure and install the app in three ways:

- **[Create a new collector and install the app](#create-a-new-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under a new Sumo Logic Collector and later install the app; Or
- **[Use an existing collector and install the app](#use-an-existing-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under an existing Sumo Logic Collector and later install the app; Or
- **[Use existing source and install the app](#use-existing-source-and-install-the-app)**. Use your existing configured Sumo Logic Cloud-to-Cloud (C2C) source and install the app.

:::important
Use the [Cloud-to-Cloud Integration for Microsoft Azure AD Inventory](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-azure-ad-inventory-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Microsoft Azure AD Inventory app is properly integrated and configured to collect and analyze your Microsoft Azure AD Inventory data.
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

## Viewing the Microsoft Azure AD Inventory dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Devices Overview

The **Microsoft Azure AD Inventory - Devices Overview** dashboard is designed to provide security monitoring and management. It enables security teams to track device compliance, identify non-compliant devices, and monitor the distribution of devices based on critical security-related attributes like operating systems, management types, and ownership. By highlighting non-compliant devices and recent sign-in activities, the dashboard supports proactive threat detection, helping you to identify potential vulnerabilities, and ensures that only secure and compliant devices access organizational resources.<br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Microsoft-Azure-AD-Inventory/Microsoft-Azure-AD-Inventory-Devices-Overview.png')} alt="Microsoft-Azure-AD-Inventory-Devices-Overview" />

### Users Overview

The **Microsoft Azure AD Inventory - Users Overview** dashboard provides a comprehensive security-focused view of user activities and demographics within your Azure AD environment. It tracks metrics such as office locations, job titles, preferred languages, and recent sign-in activity. By highlighting inactive users and displaying recent successful and unsuccessful sign-in attempts, the dashboard helps security teams identify potential unauthorized access, monitor user behavior, and enforce compliance with security policies. This tool is essential for maintaining a secure and well-governed Azure AD environment. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Microsoft-Azure-AD-Inventory/Microsoft-Azure-AD-Inventory-Users-Overview.png')} alt="Microsoft-Azure-AD-Inventory-Users-Overview" />

## Create monitors for Microsoft Azure AD Inventory app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Microsoft Azure AD Inventory alerts

The Sumo Logic app for Microsoft Azure AD Inventory includes a comprehensive set of monitors designed to enhance security monitoring and operational oversight. These alerts are triggered by critical security events, such as failed sign-ins that could indicate unauthorized access attempts and devices that are not compliant, managed, or rooted, providing immediate insights into potential vulnerabilities. These alerts help organizations quickly identify and respond to potential security threats, ensuring that only compliant, managed, and secure devices access the Azure AD environment, thereby reducing the risk of unauthorized access and security breaches.

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Microsoft Azure AD Inventory - Failed Sign-Ins` | This alert is fired when multiple failed sign-in attempts are detected without a subsequent successful login, indicating potential unauthorized access attempts. | Critical | Count > 2 |
| `Microsoft Azure AD Inventory - Device Not Compliant` | This alert is fired when a device fails to meet security compliance standards, ensuring devices adhere to organizational policies. | Critical | Count > 0 | 
| `Microsoft Azure AD Inventory - Device Not Managed` | This alert is fired if a device is not managed, flagging potential risks from unmonitored devices.|Critical | Count > 0 | 
| `Microsoft Azure AD Inventory - Device Not Rooted` | This alert is fired if a device is not rooted, ensuring that all devices maintain security controls. | Critical | Count > 0 | 

## Upgrading the Microsoft Azure AD Inventory app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Microsoft Azure AD Inventory app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

---
id: microsoft-azure-ad-inventory
title: Microsoft Azure AD Inventory
sidebar_label: Microsoft Azure AD Inventory
description: The Sumo Logic app for Microsoft Azure AD Inventory offers enhanced security monitoring by offering visibility into user activities and device management.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/ad.png')} alt="Active Directory icon" width="55"/>

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

```sumo title="Total Devices"
_sourceCategory={{Logsdatasource}}  deviceId
| json "deviceId", "manufacturer", "deviceOwnership", "managementType", "profileType", "operatingSystem", "enrollmentType", "trustType" as device_id, manufacturer, device_ownership, management_type, profile_type, operating_system, enrollment_type, trust_type nodrop

// global filters
| where manufacturer matches "{{manufacturer}}" and device_ownership matches "{{device_ownership}}" and management_type matches "{{management_type}}" and profile_type matches "{{profile_type}}" and operating_system matches "{{operating_system}}" and trust_type matches "{{trust_type}}" and enrollment_type matches "{{enrollment_type}}"

// panel specific
| count by device_id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

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

### Users Overview

The **Microsoft Azure AD Inventory - Users Overview** dashboard provides a comprehensive security-focused view of user activities and demographics within your Azure AD environment. It tracks metrics such as office locations, job titles, preferred languages, and recent sign-in activity. By highlighting inactive users and displaying recent successful and unsuccessful sign-in attempts, the dashboard helps security teams identify potential unauthorized access, monitor user behavior, and enforce compliance with security policies. This tool is essential for maintaining a secure and well-governed Azure AD environment. <br/> <img src={useBaseUrl('img/integrations/saas-cloud/Microsoft-Azure-AD-Inventory-User-Overview.png')} alt="Microsoft Azure AD Inventory - Users Overview" />

### Devices Overview

The **Microsoft Azure AD Inventory - Devices Overview** dashboard offers a detailed analysis of your organization's device landscape, providing insights into total devices and categorizes devices by manufacturer, ownership, management type and many more. The dashboard highlights the top enrollment types and groups type and operating systems, enabling effective management and security monitoring devices by Profile of your device fleet. <br/> <img src={useBaseUrl('img/integrations/saas-cloud/Microsoft-Azure-AD-Inventory-Devices-Overview.png')} alt="Microsoft Azure AD Inventory - Devices Overview" />

### Device Risk and Compliance

The **Microsoft Azure AD Inventory - Device Risk and Compliance** dashboard offers a detailed analysis of your organization's device risks, providing insights into non-compliant devices, and managed devices to monitor compliance and management status. It identifies rooted devices for security risks and then shows the trend of non-compliant and rooted devices over the time period to help enhance security and device management.<br/> <img src={useBaseUrl('img/integrations/saas-cloud/Microsoft-Azure-AD-Inventory-Device-Risk-And-Compliance.png')} alt="Microsoft Azure AD Inventory - Device Risk and Compliance" />


## Create monitors for Microsoft Azure AD Inventory app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Microsoft Azure AD Inventory alerts

The Sumo Logic app for Microsoft Azure AD Inventory includes a comprehensive set of monitors designed to enhance security monitoring and operational oversight. These alerts are triggered by critical security events, such as failed sign-ins that could indicate unauthorized access attempts and devices that are not compliant, managed, or rooted, providing immediate insights into potential vulnerabilities. These alerts help organizations quickly identify and respond to potential security threats, ensuring that only compliant, managed, and secure devices access the Azure AD environment, thereby reducing the risk of unauthorized access and security breaches.

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Microsoft Azure AD Inventory - Failed Sign-Ins` | This alert is fired when multiple failed sign-in attempts are detected without a subsequent successful login, indicating potential unauthorized access attempts. | Critical | Count > 3 |
| `Microsoft Azure AD Inventory - Device Not Compliant` | This alert is fired when a device fails to meet security compliance standards, ensuring devices adhere to organizational policies. | Critical | Count > 0 | 
| `Microsoft Azure AD Inventory - Device Not Managed` | This alert is fired if a device is not managed, flagging potential risks from unmonitored devices.|Critical | Count > 0 | 
| `Microsoft Azure AD Inventory - Device Not Rooted` | This alert is fired if a device is not rooted, ensuring that all devices maintain security controls. | Critical | Count > 0 | 

## Upgrading the Microsoft Azure AD Inventory app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Microsoft Azure AD Inventory app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

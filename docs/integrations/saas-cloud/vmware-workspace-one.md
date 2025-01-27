---
id: vmware-workspace-one
title: VMware Workspace ONE
sidebar_label: VMware Workspace ONE
description: The VMware Workspace ONE app for Sumo Logic helps security analysts with valuable insights into various security and compliance aspects.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/vmware_workspace_one.png')} alt="vmware-workspace-one-logo" width="50" />

The Sumo Logic app for VMware Workspace ONE helps security analysts in monitoring device compliance, encryption, and overall security status. It provides dashboards that display non-compliant or compromised devices, along with data encryption deficiencies. Additionally, geolocation panels track device locations and identify instances of roaming in restricted areas. 

The app includes out-of-the-box alerts that notify analysts about critical security issues, such as compromised devices, non-compliance, and unauthorized roaming. These features enable analysts to identify and address risks, enforce security policies, and maintain a secure ecosystem for enterprise devices.

:::info
This app includes [built-in monitors](#vmware-workspace-one-monitors). For details on creating custom monitors, refer to the [Create monitors for VMware Workspace ONE app](#create-monitors-for-the-vmware-workspace-one-app).
:::

## Log types

This app uses Sumo Logic’s VMware Workspace ONE Source to collect [audit logs](https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/vmware-workspace-one-source/) from the VMware Workspace ONE platform.

## Sample log message

<details>
<summary>Audit Log</summary>
    
```json
{
  "AcLineStatus": 1,
  "AssetNumber": "827BE1C5AEC05C378C61C44103E9D3FCB2EC354D",
  "AvailableDeviceCapacity": 1,
  "AvailablePhysicalMemory": 4,
  "BatteryLevel": "abcd",
  "ComplianceStatus": "NonCompliant",
  "ComplianceSummary": {
    "DeviceCompliance": [
      {
        "ActionTaken": [
          {
            "ActionType": 0
          }
        ],
        "CompliantStatus": true,
        "Id": {
          "Value": 1
        },
        "LastComplianceCheck": "2025-01-15T03:15:26.8528889+01:00",
        "NextComplianceCheck": "2025-01-15T03:01:26.8528889+01:00",
        "PolicyDetail": "compliance policy for device compromised status including application list contains rule",
        "PolicyName": "application list compliance policy",
        "Uuid": "2851e9e5-2084-433c-a741-dae0856295ff"
      }
    ]
  },
  "CompromisedStatus": true,
  "DataEncryptionYN": "N",
  "DataProtectionStatus": 5,
  "DepTokenSource": 0,
  "DeviceCapacity": 1,
  "DeviceCellularNetworkInfo": [
    {
      "CardId": "Text value",
      "CarrierName": "Text value",
      "DeviceMCC": {
        
      },
      "IsRoaming": true,
      "PhoneNumber": "Text value"
    }
  ],
  "DeviceFriendlyName": "users iPhone iOS 10.3.2 ",
  "DeviceMCC": {
    "CurrentMCC": "Text value",
    "SIMMCC": "Text value"
  },
  "DeviceManufacturerId": 1,
  "DeviceNetworkInfo": [
    {
      "ConnectionType": "Text value",
      "IPAddress": "221.192.199.49",
      "MACAddress": "Text value",
      "Name": "Text value",
      "Vendor": "Text value"
    }
  ],
  "DeviceReportedName": "5CD6473R77 - Demo HP Chromebook",
  "EasId": "6Q93UFOQ7H0K39JPMFPTEMJQ3K",
  "EnrolledViaDEP": true,
  "EnrollmentStatus": "Enrolled",
  "EnrollmentUserUuid": "00000000-0000-0000-0000-000000000000",
  "HostName": "zs-MacBook-Air",
  "Id": {
    "Value": 0
  },
  "Imei": "356766060039613",
  "IsActivationLockEnabled": true,
  "IsCloudBackupEnabled": true,
  "IsDeviceDNDEnabled": true,
  "IsDeviceLocatorEnabled": true,
  "IsNetworkTethered": true,
  "IsRemoteManagementEnabled": "abcd",
  "IsRoaming": true,
  "IsSecurityPatchUpdate": true,
  "IsSupervised": true,
  "LastBluetoothSampleTime": "2022-06-03T03:01:26.8528889+01:00",
  "LastComplianceCheckOn": "2022-06-03T03:01:26.8528889+01:00",
  "LastCompromisedCheckOn": "2022-06-03T03:01:26.8528889+01:00",
  "LastEnrolledOn": "2022-06-03T03:01:26.8528889+01:00",
  "LastNetworkLANSampleTime": "2022-06-03T03:01:26.8528889+01:00",
  "LastSeen": "2022-06-03T03:01:26.8528889+01:00",
  "LastSystemSampleTime": "2022-06-03T03:01:26.8528889+01:00",
  "LocalHostName": "zs-MacBook-Air.mshome.net",
  "LocationGroupId": {
    "Name": "Text value",
    "Uuid": "6d82a40e-dcc1-46de-9fc2-33c9ad2f8797"
  },
  "LocationGroupName": "locationgroup1",
  "MacAddress": "485A3F880798",
  "ManagedBy": 0,
  "Model": "iPhone",
  "ModelId": {
    
  },
  "OEMInfo": "Samsung",
  "OSBuildVersion": "17G65",
  "OperatingSystem": "10.3.2",
  "Ownership": "C",
  "PhoneNumber": "+14045550100",
  "Platform": "Apple",
  "PlatformId": {
    
  },
  "ProcessorArchitecture": 5,
  "SecurityPatchDate": "2022-06-03T03:01:26.8629122+01:00",
  "SerialNumber": "R51G844T90R",
  "SystemIntegrityProtectionEnabled": true,
  "SystemUpdateReceivedTime": "2022-06-03T03:01:26.8629122+01:00",
  "TotalPhysicalMemory": 3,
  "Udid": "827BE1C5AEC05C378C61C44103E9D3FCB2EC354D",
  "UserApprovedEnrollment": true,
  "UserEmailAddress": "user1@vmware.com",
  "UserId": {
    
  },
  "UserName": "user1",
  "Uuid": "8a2ca18c-8b1c-4783-bc18-2ccb61110e4f",
  "VirtualMemory": 2,
  "WifiSsid": "guest"
}
```
</details>
    
## Sample queries

```sql title="Total Devices"
_sourcecategory = "VMWare"
| json  "Ownership", "UserEmailAddress", "IsDeviceDNDEnabled", "LocationGroupName", "Imei", "SystemIntegrityProtectionEnabled", "DeviceFriendlyName", "ProcessorArchitecture", "IsRoaming", "ComplianceStatus", "UserName", "LastComplianceCheckOn", "IsDeviceLocatorEnabled", "HostName", "IsCloudBackupEnabled", "LastEnrolledOn", "DeviceReportedName", "SerialNumber", "IsActivationLockEnabled", "CompromisedStatus", "OperatingSystem", "Model", "DataProtectionStatus", "SecurityPatchDate", "LocalHostName", "IsSupervised", "Platform", "LocationGroupId.Name", "OSBuildVersion", "TotalPhysicalMemory", "OEMInfo", "LastCompromisedCheckOn", "UserId.Uuid", "UserId.Name", "EnrollmentStatus", "DataEncryptionYN" as ownership,user_email, is_dnd_enabled, location_group_name, imei, is_system_protection_enabled, device_name, architecture, is_roaming, compliance_status, user_name, last_compliance_checked_on, is_device_location_enabled, hostname, is_cloud_backup_enabled, last_enrolled_on, device_reported_name, serial_number, is_activation_lock_enabled, compromised_status, os, model, data_protection_status, security_patch_date, local_hostname, is_supervised, platform, location_groupid_name, os_build_version, total_physical_mem, oem_info, last_compromised_checked_on, uuid, user_name1, entrollment_status, data_encryption nodrop
| json "DeviceNetworkInfo[0].IPAddress" as ip nodrop
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for VMware Workspace ONE Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/vmware-workspace-one-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your VMware Workspace ONE app is properly integrated and configured to collect and analyze your VMware Workspace ONE data.
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

## Viewing the VMware Workspace ONE dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **VMware Workspace ONE - Overview** dashboard provides valuable insights into various security and compliance aspects. It displays the device information that has compromised statuses, gaps in data encryption, and device compliance. This dashboard provides insights into non-compliant devices and users, compromised devices and users, and non-data encrypted devices and users. Additionally, the geolocation panels provide a clear view of device locations and reveal any instances of roaming in restricted regions.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/VMWare+Workspace+ONE/VMWare+Workspace+ONE+-+Overview.png' alt="VMware-Workspace-ONE-Overview" />

## Create monitors for the VMware Workspace ONE app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### VMware Workspace ONE monitors

The VMware Workspace ONE monitors act as a security tool that focuses on tracking critical operations and identifying unusual activities within the VMware Workspace ONE platform. These notifications provide real-time insights into significant events, enabling security personnel to quickly respond to any deviations or breaches.

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Compromised Devices` | This alert is triggered when any devices marked as compromised in Workspace ONE are identified. It monitors the `compromised_status` field to initiate actions when devices are flagged, allowing analysts to promptly secure affected devices.| Critical | Count > 0 |
| `Non-Compliance Devices` | This alert is triggered when devices do not meet compliance standards as indicated by the `compliance_status` field. It ensures that devices adhere to organizational policies and regulatory requirements. | Critical | Count > 0|
| `Roaming Devices from Embargoed Countries` | This alert is triggered when devices are identified roaming in restricted or embargoed regions. It helps mitigate risks linked to unauthorized device movement in high-risk areas. | Critical | Count > 0|

## Upgrading/Downgrading the VMware Workspace ONE app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the VMware Workspace ONE app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

---
id: jamf
title: Jamf
sidebar_label: Jamf
description: The Sumo Logic App for Jamf provides IT and security analysts with comprehensive visibility into their organization's Jamf-managed Apple device environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/jamf.png')} alt="jamf" width="85"/>

The Sumo Logic App for Jamf provides IT and security analysts with comprehensive visibility into their organization's Jamf-managed Apple device environment. This app facilitates real-time monitoring of inventory, activity, and management-related metrics across devices. It tracks key security and compliance indicators such as supervised devices, unencrypted disks, expired certificates, and software vulnerabilities. With its powerful dashboards, analysts can identify and address potential risks like unapproved software, failed policies, or devices with harmful applications. The app offers detailed visualizations of device statuses, geographic trends, and audit events, enabling efficient detection and investigation of anomalies. By integrating seamlessly with Jamf, this app empowers organizations to enforce security policies, ensure compliance, and maintain an optimized device fleet.

:::info
This app includes [built-in monitors](#jamf-monitors). For details on creating custom monitors, refer to the [Create monitors for Jamf app](#create-monitors-for-the-jamf-app).
:::

## Log types

This app uses Sumo Logic’s [Jamf Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/jamf-source/) to collect the logs from the Jamf platform.

### Sample log messages

<details>
<summary>Computer Inventory Logs</summary>

```json
{
  "totalCount": 3,
  "results": [
    {
      "id": "1",
      "udid": "123",
      "general": {
        "name": "Boalime",
        "lastIpAddress": "247.185.82.186",
        "lastReportedIp": "247.185.82.186",
        "jamfBinaryVersion": "9.27",
        "platform": "Mac",
        "barcode1": "5 12345 678900",
        "barcode2": "5 12345 678900",
        "assetTag": "304822",
        "remoteManagement": {
          "managed": true
        },
        "supervised": true,
        "mdmCapable": {
          "capable": true,
          "capableUsers": [
            "admin",
            "rootadmin"
          ]
        },
        "reportDate": "2018-10-31T18:04:13Z",
        "lastContactTime": "2018-10-31T18:04:13Z",
        "lastCloudBackupDate": "2018-10-31T18:04:13Z",
        "lastEnrolledDate": "2018-10-31T18:04:13Z",
        "mdmProfileExpiration": "2018-10-31T18:04:13Z",
        "initialEntryDate": "2018-10-31",
        "distributionPoint": "distribution point name",
        "enrollmentMethod": {
          "id": "1",
          "objectName": "user@domain.com",
          "objectType": "User-initiated - no invitation"
        },
        "site": {
          "id": "1",
          "name": "Eau Claire"
        },
        "itunesStoreAccountActive": true,
        "enrolledViaAutomatedDeviceEnrollment": true,
        "userApprovedMdm": true,
        "declarativeDeviceManagementEnabled": true,
        "extensionAttributes": [
          {
            "definitionId": "23",
            "name": "Some Attribute",
            "description": "Some Attribute defines how much Foo impacts Bar.",
            "enabled": true,
            "multiValue": true,
            "values": [
              "foo",
              "bar"
            ],
            "dataType": "STRING",
            "options": [
              "foo",
              "bar"
            ],
            "inputType": "TEXT"
          }
        ],
        "managementId": "73226fb6-61df-4c10-9552-eb9bc353d507"
      },
      "diskEncryption": {
        "bootPartitionEncryptionDetails": {
          "partitionName": "main",
          "partitionFileVault2State": "VALID",
          "partitionFileVault2Percent": 100
        },
        "individualRecoveryKeyValidityStatus": "VALID",
        "institutionalRecoveryKeyPresent": true,
        "diskEncryptionConfigurationName": "Test configuration",
        "fileVault2Enabled": true,
        "fileVault2EnabledUserNames": [
          "admin"
        ],
        "fileVault2EligibilityMessage": "Not a boot partition"
      },
      "purchasing": {
        "leased": true,
        "purchased": true,
        "poNumber": "53-1",
        "poDate": "2019-01-01",
        "vendor": "Example Vendor",
        "warrantyDate": "2019-01-01",
        "appleCareId": "abcd",
        "leaseDate": "2019-01-01",
        "purchasePrice": "$500",
        "lifeExpectancy": 5,
        "purchasingAccount": "admin",
        "purchasingContact": "true",
        "extensionAttributes": [
          {
            "definitionId": "23",
            "name": "Some Attribute",
            "description": "Some Attribute defines how much Foo impacts Bar.",
            "enabled": true,
            "multiValue": true,
            "values": [
              "foo",
              "bar"
            ],
            "dataType": "STRING",
            "options": [
              "foo",
              "bar"
            ],
            "inputType": "TEXT"
          }
        ]
      },
      "applications": [
        {
          "name": "Microsoft Word",
          "path": "/usr/local/app",
          "version": "1.0.0",
          "macAppStore": true,
          "sizeMegabytes": 25,
          "bundleId": "1",
          "updateAvailable": false,
          "externalVersionId": "1"
        }
      ],
      "storage": {
        "bootDriveAvailableSpaceMegabytes": 3072,
        "disks": [
          {
            "id": "170",
            "device": "disk0",
            "model": "APPLE HDD TOSHIBA MK5065GSXF",
            "revision": "5",
            "serialNumber": "a8598f013366",
            "sizeMegabytes": 262144,
            "smartStatus": "OK",
            "type": "false",
            "partitions": [
              {
                "name": "Foo",
                "sizeMegabytes": 262144,
                "availableMegabytes": 131072,
                "partitionType": "BOOT",
                "percentUsed": 25,
                "fileVault2State": "VALID",
                "fileVault2ProgressPercent": 45,
                "lvmManaged": true
              }
            ]
          }
        ]
      },
      "userAndLocation": {
        "username": "Madison Anderson",
        "realname": "13-inch MacBook",
        "email": "email@com.pl",
        "position": "IT Team Lead",
        "phone": "123-456-789",
        "departmentId": "1",
        "buildingId": "1",
        "room": "5",
        "extensionAttributes": [
          {
            "definitionId": "23",
            "name": "Some Attribute",
            "description": "Some Attribute defines how much Foo impacts Bar.",
            "enabled": true,
            "multiValue": true,
            "values": [
              "foo",
              "bar"
            ],
            "dataType": "STRING",
            "options": [
              "foo",
              "bar"
            ],
            "inputType": "TEXT"
          }
        ]
      },
      "configurationProfiles": [
        {
          "id": "1",
          "username": "username",
          "lastInstalled": "2018-10-31T18:04:13Z",
          "removable": true,
          "displayName": "Displayed profile",
          "profileIdentifier": "0ae590fe-9b30-11ea-bb37-0242ac130002"
        }
      ],
      "printers": [
        {
          "name": "My Printer",
          "type": "XYZ 1122",
          "uri": "ipp://10.0.0.5",
          "location": "7th floor"
        }
      ],
      "services": [
        {
          "name": "SomeService"
        }
      ],
      "hardware": {
        "make": "Apple",
        "model": "13-inch MacBook Pro (Mid 2012)",
        "modelIdentifier": "MacBookPro9,2",
        "serialNumber": "C02ZC2QYLVDL",
        "processorSpeedMhz": 2100,
        "processorCount": 2,
        "coreCount": 2,
        "processorType": "Intel Core i5",
        "processorArchitecture": "i386",
        "busSpeedMhz": 2133,
        "cacheSizeKilobytes": 3072,
        "networkAdapterType": "Foo",
        "macAddress": "6A:2C:4B:B7:65:B5",
        "altNetworkAdapterType": "Bar",
        "altMacAddress": "82:45:58:44:dc:01",
        "totalRamMegabytes": 4096,
        "openRamSlots": 0,
        "batteryCapacityPercent": 85,
        "batteryHealth": "UNKNOWN",
        "smcVersion": "2.2f38",
        "nicSpeed": "N/A",
        "opticalDrive": "MATSHITA DVD-R UJ-8A8",
        "bootRom": "MBP91.00D3.B08",
        "bleCapable": false,
        "supportsIosAppInstalls": false,
        "appleSilicon": false,
        "extensionAttributes": [
          {
            "definitionId": "23",
            "name": "Some Attribute",
            "description": "Some Attribute defines how much Foo impacts Bar.",
            "enabled": true,
            "multiValue": true,
            "values": [
              "foo",
              "bar"
            ],
            "dataType": "STRING",
            "options": [
              "foo",
              "bar"
            ],
            "inputType": "TEXT"
          }
        ]
      },
      "localUserAccounts": [
        {
          "uid": "501",
          "userGuid": "844F1177-0CF5-40C6-901F-38EDD9969C1C",
          "username": "jamf",
          "fullName": "John Jamf",
          "admin": true,
          "homeDirectory": "/Users/jamf",
          "homeDirectorySizeMb": 131072,
          "fileVault2Enabled": true,
          "userAccountType": "LOCAL",
          "passwordMinLength": 4,
          "passwordMaxAge": 5,
          "passwordMinComplexCharacters": 5,
          "passwordHistoryDepth": 5,
          "passwordRequireAlphanumeric": true,
          "computerAzureActiveDirectoryId": "1",
          "userAzureActiveDirectoryId": "1",
          "azureActiveDirectoryId": "ACTIVATED"
        }
      ],
      "certificates": [
        {
          "commonName": "jamf.com",
          "identity": true,
          "expirationDate": "2030-10-31T18:04:13Z",
          "username": "test",
          "lifecycleStatus": "ACTIVE",
          "certificateStatus": "ISSUED",
          "subjectName": "CN=jamf.com",
          "serialNumber": "40f3d9fb",
          "sha1Fingerprint": "ed361458724d06082b2314acdb82e1f586f085f5",
          "issuedDate": "2022-05-23T14:54:10Z"
        }
      ],
      "attachments": [
        {
          "id": "1",
          "name": "Attachment.pdf",
          "fileType": "application/pdf",
          "sizeBytes": 1024
        }
      ],
      "plugins": [
        {
          "name": "plugin name",
          "version": "1.02",
          "path": "/Applications/"
        }
      ],
      "packageReceipts": {
        "installedByJamfPro": [
          "com.jamf.protect.JamfProtect"
        ],
        "installedByInstallerSwu": [
          "com.apple.pkg.Core"
        ],
        "cached": [
          "com.jamf.protect.JamfProtect"
        ]
      },
      "fonts": [
        {
          "name": "font name",
          "version": "1.02",
          "path": "/Applications/"
        }
      ],
      "security": {
        "sipStatus": "ENABLED",
        "gatekeeperStatus": "APP_STORE_AND_IDENTIFIED_DEVELOPERS",
        "xprotectVersion": "1.2.3",
        "autoLoginDisabled": false,
        "remoteDesktopEnabled": true,
        "activationLockEnabled": true,
        "recoveryLockEnabled": true,
        "firewallEnabled": true,
        "secureBootLevel": "FULL_SECURITY",
        "externalBootLevel": "ALLOW_BOOTING_FROM_EXTERNAL_MEDIA",
        "bootstrapTokenAllowed": true,
        "bootstrapTokenEscrowedStatus": "ESCROWED",
        "lastAttestationAttempt": "1970-01-01T00:00:00Z",
        "lastSuccessfulAttestation": "1970-01-01T00:00:00Z",
        "attestationStatus": "PENDING"
      },
      "operatingSystem": {
        "name": "Mac OS X",
        "version": "10.9.5",
        "build": "13A603",
        "supplementalBuildVersion": "13A953",
        "rapidSecurityResponse": "(a)",
        "activeDirectoryStatus": "Not Bound",
        "fileVault2Status": "ALL_ENCRYPTED",
        "softwareUpdateDeviceId": "J132AP",
        "extensionAttributes": [
          {
            "definitionId": "23",
            "name": "Some Attribute",
            "description": "Some Attribute defines how much Foo impacts Bar.",
            "enabled": true,
            "multiValue": true,
            "values": [
              "foo",
              "bar"
            ],
            "dataType": "STRING",
            "options": [
              "foo",
              "bar"
            ],
            "inputType": "TEXT"
          }
        ]
      },
      "licensedSoftware": [
        {
          "id": "1",
          "name": "Microsoft Word"
        }
      ],
      "ibeacons": [
        {
          "name": "room A"
        }
      ],
      "softwareUpdates": [
        {
          "name": "BEdit",
          "version": "1.15.2",
          "packageName": "com.apple.pkg.AdditionalEssentials"
        }
      ],
      "extensionAttributes": [
        {
          "definitionId": "23",
          "name": "Some Attribute",
          "description": "Some Attribute defines how much Foo impacts Bar.",
          "enabled": true,
          "multiValue": true,
          "values": [
            "foo",
            "bar"
          ],
          "dataType": "STRING",
          "options": [
            "foo",
            "bar"
          ],
          "inputType": "TEXT"
        }
      ],
      "contentCaching": {
        "computerContentCachingInformationId": "1",
        "parents": [
          {
            "contentCachingParentId": "1",
            "address": "SomeAddress",
            "alerts": {
              "contentCachingParentAlertId": "1",
              "addresses": [],
              "className": "SomeClass",
              "postDate": "2018-10-31T18:04:13Z"
            },
            "details": {
              "contentCachingParentDetailsId": "1",
              "acPower": true,
              "cacheSizeBytes": 0,
              "capabilities": {
                "contentCachingParentCapabilitiesId": "1",
                "imports": true,
                "namespaces": true,
                "personalContent": true,
                "queryParameters": true,
                "sharedContent": true,
                "prioritization": true
              },
              "portable": true,
              "localNetwork": [
                {
                  "contentCachingParentLocalNetworkId": "1",
                  "speed": 5000,
                  "wired": true
                }
              ]
            },
            "guid": "CD1E1291-4AF9-4468-B5D5-0F780C13DB2F",
            "healthy": true,
            "port": 0,
            "version": "1"
          }
        ],
        "alerts": [
          {
            "cacheBytesLimit": 0,
            "className": "SomeClass",
            "pathPreventingAccess": "/some/path",
            "postDate": "2018-10-31T18:04:13Z",
            "reservedVolumeBytes": 0,
            "resource": "SomeResource"
          }
        ],
        "activated": false,
        "active": false,
        "actualCacheBytesUsed": 0,
        "cacheDetails": [
          {
            "computerContentCachingCacheDetailsId": "1",
            "categoryName": "SomeCategory",
            "diskSpaceBytesUsed": 0
          }
        ],
        "cacheBytesFree": 23353884672,
        "cacheBytesLimit": 0,
        "cacheStatus": "OK",
        "cacheBytesUsed": 0,
        "dataMigrationCompleted": false,
        "dataMigrationProgressPercentage": 0,
        "dataMigrationError": {
          "code": 0,
          "domain": "SomeDomain",
          "userInfo": [
            {
              "key": "foo",
              "value": "bar"
            }
          ]
        },
        "maxCachePressureLast1HourPercentage": 0,
        "personalCacheBytesFree": 23353884672,
        "personalCacheBytesLimit": 0,
        "personalCacheBytesUsed": 0,
        "port": 0,
        "publicAddress": "SomeAddress",
        "registrationError": "NOT_ACTIVATED",
        "registrationResponseCode": 403,
        "registrationStarted": "2018-10-31T18:04:13Z",
        "registrationStatus": "CONTENT_CACHING_FAILED",
        "restrictedMedia": false,
        "serverGuid": "CD1E1291-4AF9-4468-B5D5-0F780C13DB2F",
        "startupStatus": "FAILED",
        "tetheratorStatus": "CONTENT_CACHING_DISABLED",
        "totalBytesAreSince": "2018-10-31T18:04:13Z",
        "totalBytesDropped": 0,
        "totalBytesImported": 0,
        "totalBytesReturnedToChildren": 0,
        "totalBytesReturnedToClients": 0,
        "totalBytesReturnedToPeers": 0,
        "totalBytesStoredFromOrigin": 0,
        "totalBytesStoredFromParents": 0,
        "totalBytesStoredFromPeers": 0
      },
      "groupMemberships": [
        {
          "groupId": "1",
          "groupName": "groupOne",
          "smartGroup": true
        }
      ]
    }
  ]
}
```
</details>

<details>
<summary>Computer History Logs</summary>

```json
{
  "general": {
    "id": 1,
    "name": "Admins MacBook Pro",
    "udid": "55900BDC-347C-58B1-D249-F32244B11D30",
    "serial_number": "C02Q7KHTGFWF",
    "mac_address": "E0:AC:CB:97:36:G4"
  },
  "computer_usage_logs": [
    {
      "usage_log": {
        "event": "login",
        "username": "Admin",
        "date_time": "2017-07-07T18:37:04.000Z",
        "date_time_epoch": 1499470624555,
        "date_time_utc": "2017-07-07T18:37:04.555-0500"
      }
    }
  ],
  "audits": [
    {
      "audit": {
        "event": "Viewed FileVault Encryption Key",
        "username": "Jamf Pro Admin",
        "date_time": "2017-07-07T18:37:04.000Z",
        "date_time_epoch": 1499470624555,
        "date_time_utc": "2017-07-07T18:37:04.555-0500"
      }
    }
  ],
  "policy_logs": [
    {
      "policy_log": {
        "policy_id": 1,
        "policy_name": "Update Inventory",
        "username": "Username",
        "date_time": "2017-07-07T18:37:04.000Z",
        "date_time_epoch": 1499470624555,
        "date_time_utc": "2017-07-07T18:37:04.555-0500",
        "status": "Completed"
      }
    }
  ],
  "casper_remote_logs": [
    {
      "casper_remote_log": {
        "date_time": "2017-07-07T18:37:04.000Z",
        "date_time_epoch": 1499470624555,
        "date_time_utc": "2017-07-07T18:37:04.555-0500",
        "status": "Completed"
      }
    }
  ],
  "screen_sharing_logs": [
    {
      "screen_sharing_log": {
        "date_time": "2017-07-07T18:37:04.000Z",
        "date_time_epoch": 1499470624555,
        "date_time_utc": "2017-07-07T18:37:04.555-0500",
        "status": "Completed",
        "details": "admin authenticated to screen share with computer at 10.1.1.1"
      }
    }
  ],
  "casper_imaging_logs": [
    {
      "casper_imaging_log": {
        "date_time": "2017-07-07T18:37:04.000Z",
        "date_time_epoch": 1499470624555,
        "date_time_utc": "2017-07-07T18:37:04.555-0500",
        "status": "Completed"
      }
    }
  ],
  "commands": {
    "completed": [
      {
        "command": {
          "name": "WiFi Configuration Profile",
          "completed": "2017/07/07 at 6:37 PM",
          "completed_epoch": 1499470624555,
          "completed_utc": "2017-07-07T18:37:04.555-0500",
          "username": "string"
        }
      }
    ],
    "pending": [
      {
        "command": {
          "name": "ProfileList",
          "status": "Pending",
          "issued": "2017/07/07 at 6:37 PM",
          "issued_epoch": 1499470624555,
          "issued_utc": "2017-07-07T18:37:04.555-0500",
          "last_push": "2017/07/07 at 6:38 PM",
          "last_push_epoch": 1499470735555,
          "last_push_utc": "2017-07-07T18:38:55.555-0500",
          "username": "string"
        }
      }
    ],
    "failed": [
      {
        "command": {
          "name": "Install Configuration Profile AD Binding",
          "status": "The Directory Binding Account payload could not be installed",
          "issued": "2017/07/07 at 6:37 PM",
          "issued_epoch": 1499470624555,
          "issued_utc": "2017-07-07T18:37:04.555-0500",
          "failed": "2017/07/07 at 6:38 PM",
          "failed_epoch": 1499470735555,
          "failed_utc": "2017-07-07T18:38:55.555-0500"
        }
      }
    ]
  },
  "user_location": [
    {
      "location": {
        "date_time": "2017/07/07 at 6:37 PM",
        "date_time_epoch": 1499470624555,
        "date_time_utc": "2017-07-07T18:37:04.555-0500",
        "username": "Betty.Johnson",
        "full_name": "Betty Johnson",
        "email_address": "betty.johnson@company.com",
        "phone_number": "555-555-5555",
        "department": "Information Technology",
        "building": "Block D",
        "room": 134,
        "position": "Chief of Everything"
      }
    }
  ],
  "mac_app_store_applications": {
    "installed": [
      {
        "app": {
          "name": "Xcode",
          "version": "8.3.3",
          "size_mb": 150
        }
      }
    ],
    "pending": [
      {
        "app": {
          "name": "Xcode",
          "version": "8.3.2",
          "deployed": "2 minutes ago",
          "deployed_epoch": 1499470624555,
          "deployed_utc": "2018-02-22T16:55:14.000-0600",
          "last_update": "2 minutes ago",
          "last_update_epoch": 1499470624555,
          "last_update_utc": "2018-02-22T16:55:14.000-0600"
        }
      }
    ],
    "failed": [
      {
        "app": {
          "name": "Xcode",
          "version": "8.3.2",
          "status": "Failed",
          "deployed": "2 minutes ago",
          "deployed_epoch": 1499470624555,
          "deployed_utc": "2018-02-22T16:55:14.000-0600",
          "last_update": "2 minutes ago",
          "last_update_epoch": 1499470624555,
          "last_update_utc": "2018-02-22T16:55:14.000-0600"
        }
      }
    ]
  }
}
```
</details>

<details>
<summary>Computer Management Logs</summary>

```json
{
  "general": {
    "id": 1,
    "name": "Steves iMac",
    "udid": "55900BDC-347C-58B1-D249-F32244B11D30",
    "serial_number": "C02Q7KHTGFWF",
    "mac_address": "E0:AC:CB:97:36:G4"
  },
  "policies": [
    {
      "policy": {
        "id": 1,
        "name": "Update Inventory",
        "trigger": "Self Service, Check-in"
      }
    }
  ],
  "ebooks": [
    {
      "ebook": {
        "id": 1,
        "name": "string"
      }
    }
  ],
  "mac_app_store_apps": [
    {
      "mac_app_store_app": {
        "id": 1,
        "name": "string"
      }
    }
  ],
  "os_x_configuration_profiles": [
    {
      "profile": {
        "id": 1,
        "name": "string"
      }
    }
  ],
  "restricted_software": [
    {
      "software": {
        "id": 1,
        "name": "string"
      }
    }
  ],
  "smart_groups": [
    {
      "group": {
        "id": 1,
        "name": "string"
      }
    }
  ],
  "static_groups": [
    {
      "group": {
        "id": 1,
        "name": "string"
      }
    }
  ],
  "patch_reporting_software_titles": [
    {
      "title": {
        "name": "Google Chrome",
        "latest_version": "64.0.3282.119",
        "installed_version": "63.0.3239.132"
      }
    }
  ],
  "patch_policies": [
    {
      "patch_policy": {
        "id": 1,
        "name": "string"
      }
    }
  ]
}
```
</details>

### Sample queries

```sql title="Total Devices"
_sourceCategory="Labs/Jamf" !computer_history !computer_management
| parse regex "^\{\s*\"id\"\s*:\s*\"(?<device_id>\d+)\",.*" nodrop
| parse regex ".*\"platform\"\s*:\s*\"(?<platform>[^,]+)\",.*" nodrop

// global filters
| where platform matches "{{platform}}"
| where device_id matches "{{device_id}}"

| count by device_id
| count as num_devices
```

```sql title="Top 10 Installed Applications"
_sourceCategory="Labs/Jamf" computer_history
| json "computer_history.general.id", "computer_history.general.name", "computer_history.general.mac_address", "computer_history.general.serial_number", "computer_history.mac_app_store_applications.installed[*]" as device_id, device_name, mac_address, serial_number, installed_apps nodrop
| where !(installed_apps matches "[]")

// global filters
| where device_id matches "{{device_id}}"

| parse regex field=installed_apps "(?<apps>\{[^}]*\})" multi
| json field=apps "name" as name nodrop

| count by name, device_id
| count as num_devices by name
| top 10 name by num_devices
| sort by num_devices, name
```

```sql title="Unique Configured OS Profiles"
_sourceCategory="Labs/Jamf" computer_management
| json "computer_management.general.id", "computer_management.general.name", "computer_management.general.mac_address", "computer_management.general.serial_number", "computer_management.os_x_configuration_profiles[*]" as device_id, device_name, mac_address, serial_number, os_configured_profiles nodrop
| where !(os_configured_profiles matches "[]")

// global filters
| where device_id matches "{{device_id}}"

| first(os_configured_profiles) as latest_os_configured_profiles by device_id

| parse regex field=latest_os_configured_profiles "(?<os_configured_profiles_logs>\{[^}]*\})" multi
| json field=os_configured_profiles_logs "name" as profile_name nodrop

| count by profile_name
| count as num_profiles
```

## Set up collection

Follow the instructions provided to set up [Cloud-to-Cloud Integration for Jamf Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/jamf-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Jamf app is properly integrated and configured to collect and analyze your Jamf data.

## Installing the Jamf app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing the Jamf dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Inventory Overview

The **Jamf - Inventory Overview** dashboard provides a comprehensive summary of the organization's Apple device inventory. It tracks total devices, their management statuses, and critical security metrics like unencrypted disks, expired certificates, and devices with firewall off. Analysts can visualize device distribution by platform, monitor geolocation trends, and detect vulnerable or embargoed devices. The dashboard highlights devices with expiring certificates, recently enrolled configurations, and unencrypted disks, offering actionable insights to maintain security and compliance. Additionally, it tracks the top OS versions, licensed software, and recent software updates to ensure devices stay up-to-date and secure. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jamf/Jamf-Inventory-Overview.png')} alt="Jamf-Inventory Overview" style={{border: '1px solid gray'}} width="800" />

### Activity Overview

The **Jamf - Activity Overview** dashboard focuses on monitoring command and application statuses, policy executions, and user activity. It highlights the top completed, pending, and failed commands, as well as devices with frequent command or application failures. Analysts can explore trends in policy failures over time, identify devices with problematic screen-sharing events, and monitor Casper Remote and Imaging events. This dashboard provides critical insights into operational issues, enabling timely resolution of failed policies, commands, and application installations to ensure seamless device management. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jamf/Jamf-Activity-Overview.png')} alt="Jamf-Activity Overview" style={{border: '1px solid gray'}} width="800" />

### Management Overview

The **Jamf - Management Overview** dashboard delivers an in-depth view of management configurations across the organization's device fleet. It tracks unique configured OS profiles, policies, restricted software, and harmful applications. Analysts can identify devices running outdated software versions or those impacted by harmful profiles or applications. The dashboard also provides a detailed breakdown of management policies, top apps, and OS configuration profiles, ensuring that administrators maintain an optimized and secure management environment. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jamf/Jamf-Management-Overview.png')} alt="Jamf-Management Overview" style={{border: '1px solid gray'}} width="800" />
 
## Create monitors for the Jamf app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Jamf monitors

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Jamf - Devices from Embargoed Locations` | Monitors devices accessed from high-risk geographic locations, enabling analysts to detect and investigate potential security threats. This monitor helps track unusual or suspicious device usage patterns and ensures compliance with geolocation-based security policies. | Count `>` 0 | Count `<=` 0 |
| `Jamf - Devices with 0 security score` | Tracks devices with no assigned security score, highlighting unmanaged or non-compliant devices. This monitor ensures analysts can identify and prioritize addressing security gaps in the organization’s fleet. | Count `>` 0 | Count `<=` 0 |
| `Jamf - FileVault Disabled` | Identifies devices where FileVault encryption is disabled, posing a risk of data theft. This monitor ensures that disk encryption policies are enforced to protect sensitive organizational data. | Count `>` 0 | Count `<=` 0 |
| `Jamf - Firewall Disabled` | Detects devices with the firewall turned off, exposing them to network-based threats. This monitor helps enforce network security policies and minimizes the risk of unauthorized access. | Count `>` 0 | Count `<=` 0 |
| `Jamf - High Command Failures` | Highlights devices with repeated command execution failures, signaling possible operational issues. This monitor allows timely investigation and resolution of command failures to maintain device functionality. | Count `>` 50 | Count `<=` 50 |
| `Jamf - High Policy Failures` | Monitors devices experiencing frequent policy application failures, which may lead to compliance risks. This monitor ensures that all devices adhere to organizational security and management policies. | Count `>` 50 | Count `<=` 50 |
| `Jamf - Inactive Devices from 30 Days` | Identifies devices that have been inactive for over 30 days, signaling potential operational inefficiencies or security concerns. This monitor helps organizations track and optimize device utilization. | Count `>` 0 | Count `<=` 0 |
| `Jamf - Outdated Devices from 30 Days` | Tracks devices running outdated software or configurations for over 30 days, increasing vulnerability risks. This monitor ensures timely updates and adherence to security standards. | Count `>` 0 | Count `<=` 0 |
| `Jamf - System Integrity Protection (SIP) Status Disabled` | Detects devices with SIP disabled, compromising macOS security features. This monitor ensures SIP remains enabled to safeguard devices from unauthorized modifications and vulnerabilities. | Count `>` 0 | Count `<=` 0 |

## Upgrade/Downgrade the Jamf app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Jamf app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
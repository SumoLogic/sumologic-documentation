---
id: jamf
title: Jamf
sidebar_label: Jamf
description: The Sumo Logic app for Jamf is designed to empower IT administrators and security analysts with critical insights into their organization's Jamf environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/jamf.png')} alt="jamf" width="85"/>

The Sumo Logic app for Jamf empowers IT administrators and security analysts with critical insights into their organization's Jamf environment. It monitors device inventory, management activities, and security configurations. With pre-built dashboards, the app enables users to track key metrics, such as device compliance, software deployments, command statuses, and security risks. Analysts can quickly identify anomalous behaviors, such as devices with expired certificates, risky geo-locations, or failed management actions, through detailed visualizations. 

The app also highlights trends in device usage, audit events, and management policy adoption, ensuring seamless tracking of compliance and security metrics. By integrating with Jamf, the app offers a centralized view to detect, investigate, and respond effectively to threats and operational inefficiencies, making it an essential tool for maintaining the integrity of your Jamf managed environment.

:::info
This app includes [built-in monitors](#jamf-monitors). For details on creating custom monitors, refer to the [Create monitors for Jamf app](#create-monitors-for-jamf-app).
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

```sql title="Active Devices over Time"
_sourceCategory="Labs/Jamf" !computer_history !computer_management
| parse regex "^\{\s*\"id\"\s*:\s*\"(?<device_id>\d+)\",.*" nodrop
| parse regex ".*\"platform\"\s*:\s*\"(?<platform>[^,]+)\",.*" nodrop
| parse regex ".*\"lastContactTime\"\s*:\s*\"(?<time>[^,]+)\",.*" nodrop

// global filters
| where platform matches "{{platform}}"

| parseDate(time, "yyyy-MM-dd'T'HH:mm:ss.SSS") as _timeslice 
| timeslice 1d
| count by device_id, _timeslice
| count as frequency by _timeslice
| fillmissing timeslice
```

```sql title="Most Installed Applications"
_sourceCategory="Labs/Jamf" computer_history
| json "computer_history.general.id", "computer_history.general.name", "computer_history.general.mac_address", "computer_history.general.serial_number", "computer_history.mac_app_store_applications.installed[*]" as device_id, device_name, mac_address, serial_number, installed_apps nodrop
| where !(installed_apps matches "[]")
| extract field=installed_apps "(?<apps>\{[^}]*\})" multi
| json field=apps "name" as name nodrop
| count by name, device_id
| count as frequency by name
| sort by frequency, name
```

```sql title="Unique Configured OS Profiles"
_sourceCategory="Labs/Jamf" computer_management
| json "computer_management.general.id", "computer_management.general.name", "computer_management.general.mac_address", "computer_management.general.serial_number", "computer_management.os_x_configuration_profiles[*]" as device_id, device_name, mac_address, serial_number, os_configured_profiles nodrop
| where !(os_configured_profiles matches "[]")
| extract field=os_configured_profiles "(?<os_configured_profiles_logs>\{[^}]*\})" multi
| json field=os_configured_profiles_logs "name" as profile_name nodrop
| count by profile_name
| count as frequency
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

The **Jamf - Inventory Overview** dashboard provides a comprehensive summary of your organization's device inventory and their compliance status. It tracks metrics such as total devices, supervised devices, and those with declarative device management enabled. Key security insights include identifying devices with expired certificates, disabled firewalls, and risky geo-locations. The dashboard also provides detailed breakdowns by platform, management status, and geo-locations. Additional panels display disk encryption, security configurations, and device hardware/software details, enabling IT administrators to maintain robust security standards and operational efficiency across the fleet. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jamf/Jamf-Inventory-Overview.png')} alt="Jamf-Inventory Overview" style={{border: '1px solid gray'}} width="800" />

### Activity Overview

The **Jamf - Activity Overview** dashboard focuses on monitoring operational activities and device commands within your Jamf environment. It tracks the total number of completed, pending, and failed commands and application deployments. The dashboard provides visibility into key events like audit logs, Casper Remote and Imaging statuses, and policy execution. Screen sharing and login activities are visualized over time to identify unusual patterns. Recent audit and policy events are highlighted to ensure timely responses to potential issues. This dashboard is crucial for identifying inefficiencies, troubleshooting failures, and ensuring smooth device management. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jamf/Jamf-Activity-Overview.png')} alt="Jamf-Activity Overview" style={{border: '1px solid gray'}} width="800" />

### Management Overview

The **Jamf - Management Overview** dashboard offers insights into the management policies and configurations within your Jamf environment. It highlights the top apps, eBooks, restricted software, and patch policies to understand their adoption and impact. Panels display metrics on applications and OS configuration profiles by devices, providing a detailed view of policy distribution. Additionally, it offers information on management policy details and patch reporting for software. This dashboard enables administrators to ensure consistent policy enforcement, track usage trends, and maintain an optimized and secure managed environment. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jamf/Jamf-Management-Overview.png')} alt="Jamf-Management Overview" style={{border: '1px solid gray'}} width="800" />
 
## Create monitors for the Jamf app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Jamf monitors

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Jamf - Devices from Embargoed Locations` | This alert is triggered if devices accessing the network from high-risk geo-locations are identified. Helps investigate and mitigate potential unauthorized or suspicious activities. | Count `>` 0 | Count `<=` 0 |
| `Jamf - FileVault Disabled` | This alert is triggered if devices with FileVault disabled are identified, identifying potential risks to data encryption and compliance. Ensures devices meet security standards to protect sensitive information. | Count `>` 0 | Count `<=` 0 |
| `Jamf - Firewall Disabled` | This alert is triggered if devices with disabled firewalls are identified, exposing them to network threats. Ensures adherence to organizational policies for network security. | Count `>` 0 | Count `<=` 0 |
| `Jamf - Inactive Devices from 30 Days` | This alert is triggered if devices are inactive for 30 days, identifying potential unused assets. Helps ensure device inventory is current and actively managed. | Count `>` 0 | Count `<=` 0 |
| `Jamf - Outdated Devices from 30 Days` | This alert is triggered if devices are running with outdated software or OS for over 30 days. Supports timely updates to maintain security and compatibility. | Count `>` 0 | Count `<=` 0 |
| `Jamf - System Integrity Protection (SIP) Status Disabled` | This alert is triggered if devices with SIP disabled are detected, highlighting security vulnerabilities. Helps maintain system integrity by enforcing critical macOS protection features. | Count `>` 0 | Count `<=` 0 |

## Upgrade/Downgrade the Jamf app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Jamf app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
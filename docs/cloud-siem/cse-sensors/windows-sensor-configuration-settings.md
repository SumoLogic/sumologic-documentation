---
id: windows-sensor-configuration-settings
---

# Windows Sensor Configuration Settings

:::note
The CSE Windows Sensor has reached end of life and is no longer supported. Please migrate to a Sumo Logic  Installed Collector. For more information see the [end of life notice](https://app.getbeamer.com/cloudsiementerprise/en/end-of-life-notice-_-cloud-siem-enterprise-sensors). 
:::

This page describes the options in the Windows Sensor configuration
file. Depending on the sensor version, the path is:

* v1.8 and later: `C:\ProgramData\Sumo Logic\CSE Windows Sensor\settings.conf`
* Prior to v1.8: `C:\ProgramData\JASK\Windows Sensor\settings.conf`

For an example configuration files, see [Example settings.conf](#example-settingsconf-files) files.

:::note
* Required options must have values for the Windows Sensor to run.
* Optional settings have reasonable default values. You can change them with the help of CSE Technical Support.
* After you make changes to `settings.conf`, changes will take effect upon restart of the Windows Sensor service, or after you run the `sc control SLCSEWS 200` service control command. 
:::

Unless otherwise stated, the options below are optional.

## Address

This setting is required.

**Default**: none

**Description**: The URL to which the sensor sends the data it collects, either an HTTP Source on the Sumo Logic platform, or the legacy CSE server. You supply the address when you run the Windows Sensor installer. The address you supply is saved to `settings.conf`.

## CheckPermissionsOnBoot

**Default**: true

**Description**: If set to false, the sensor will skip the steps in the startup that check to make sure the service is running with the permissions it requires to operate properly. There is rarely a reason to change the value of this setting. Change it only when Sumo Logic support suggests you do so.

## Customer

**Default**: none

**Description**: This setting only applies if you configure the sensor to send data to the legacy CSE server, as opposed to the Sumo Logic platform.

If it is set, it is transmitted as a tag with each event log to identify the tenant. It is used in multi-tenant situations

## DirectoryAdditionalAttributes

**Default**: none

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). A list of the LDAP Names of Active Directory attributes to report, in addition to the default list.

## DirectoryEnabled

**Default**: true

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). You can use this property to disable the Active Directory Monitor. Note Active Directory monitoring is automatically disabled if the Windows service that runs the sensor detects that the machine is not part of a domain.

## DirectoryEnableSerializeContacts

**Default**: false

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). Set to true to configure the Active Directory Monitor to report on Active Directory contacts.

## DirectoryExcludedAttributes

**Default**: none

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). A comma-separated list of the LDAP Names of Active Directory attributes to exclude from the report that the sensor sends to the Sumo Logic platform (or the legacy CSE server).

## DirectoryExcludeDistinguishedNameSuffixes

**Default**: none

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). If set, the Windows Sensor won't report any records that contain the Distinguished Name suffixes specified. Example usage:

```
"DirectoryExcludeDistinguishedNameSuffixes": ["CN=Users,DC=ignoreme,DC=local", "CN=Users,DC=andmetoo,DC=local"]
```

## DirectoryFetchInterval

**Default**: 86400

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). How long to wait before attempting to export Active Directory again, in seconds. This specifies the span of time between consecutive Active Directory dumps. It measures the time *between* the dumps, not the time between *starting* dumps. 

## DirectoryFilter

**Default**: none

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). Specifies a filter to use when searching for Domain Objects in Active Directory. For more information on creating an LDAP filter, see:
https://social.technet.microsoft.com/wiki/contents/articles/5392.active-directory-ldap-syntax-filters.aspx#Filter_on_objectCategory_and_objectClass

## DirectoryMaxAppends

**Default**: 1000

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). Specifies how many records to append to the Active Directory dump file before stopping to send the file. This value works with the [DirectoryQueueMaxFileOpenTime](/Cloud_SIEM_Enterprise/CSE_Sensors/06_Windows_Sensor_Configuration_Settings#DirectoryQueueMaxFileOpenTime) setting to control how long the Windows Sensor waits before sending a file to which it is still appending.

## DirectoryMaxBytes

**Default**: 20000000 (20 MB)

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). Specifies the maximum file size (in bytes) for an Active Directory snapshot file (used to queue Active Directory records for upload).

## DirectoryMaxParallelUploads

**Default**: 4

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). Specifies how many Active Directory files that the sensor will attempt to upload at the same time, in parallel. This value can be adjusted based on the host machines computing resources.

## DirectoryQueueBacklogWarningThresholdMaxFileAgeHours 

**Default**: 1 hour

**Description**: Specify as a whole number of hours.  This setting is used by the sensor to determine when to send Health Status messages relating to potential Directory Queue backlogs (CSEWindowsExcessiveBacklog - Oldest Record Timestamp in Queue Exceeds Threshold Warning).  When the Sensor detects a file in the Directory Queue folder with a timestamp more than `DirectoryQueueBacklogWarningThresholdMaxFileAgeHours` before the current time, a Health Status Warning message will be sent to CIP.

## DirectoryQueueBacklogWarningThresholdMaxFiles

**Default**: 5 files

**Description**: Specify as a whole number of files.  This setting is used by the sensor to determine when to send Health Status messages relating to potential Directory Queue backlogs (CSEWindowsExcessiveBacklog - Too Many Files Pending Upload).  When the Sensor detects that the number of files in the Directory Queue folder is more than `DirectoryQueueBacklogWarningThresholdMaxFiles`, a Health Status Warning message will be sent to CIP. |

## DirectoryQueueMaxFileOpenTime

**Default**: 300

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). The amount of time the Active Directory snapshot file can remain open, in seconds The Active Directory dump can take a long time. As it runs, the Windows Sensor can upload what data it has already collected instead of waiting for the entire dump to complete. This field specifies how long the file will remain open during long-running dumps.

## DirectoryUploadBatchSizeTarget

**Default**: 1 MB

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). This setting applies only to uploads to Sumo Logic platform, not to the legacy CSE server. The Windows Sensor uploads Active Directory records to the Sumo Logic platform in batches. This setting specifies the target size of the batch that is uploaded. There is rarely a reason to change the value of this setting.

## DirectoryUploadCategory

**Default**: cse/windows/inventory

**Description**: This setting relates to the **Active Directory Monitor**. It applies only to uploads to Sumo Logic platform, not to the legacy CSE server. When doing Active Directory uploads, the sensor will use this setting to populate the value in the `X-Sumo-Category` header.

## DirectoryUploaderRestDuration

**Default**: 100ms
**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). Specifies how long the thread should pause between uploading files, in milliseconds. This specifies low long the thread will rest before checking for another file to send. This is here to avoid pegging out the CPU.

## DirectoryUploadPause

**Default**: false

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). Useful for technical support. When this is enabled, the sensor will create dumps, but will not attempt to upload them.

## DirectoryUploadSiemForwarding

**Default**: true

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). This setting  applies to configurations in which the sensor uploads to the Sumo Logic platform (as opposed to the legacy CSE server). For Active Directory uploads, the sensor will use this setting to populate the value in the `_siemForwarding` header.

## DirectoryUploadUrlPath

**Default**: “/inventory”

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). The path to the API endpoint where directories are uploaded.

## DirectoryVerboseTrace

**Default**: “/inventory”

**Description**: This setting relates to the [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor). If set to true, low-level information about the process of retrieving Active Directory objects and dumping them to snapshot files will be logged as Trace messages.

:::note
The minimum log level must also be set to “Trace” in the `Nlog.config` file located in `C:\Program Files\Sumo Logic\CSE Windows Sensor`
:::

## DiskSpaceWarningThresholdPercentOfLimit 

**Default**: 10%

**Description**: Specify as a whole number percentage (0-100).  This setting is used by the sensor to determine when to send Health Status messages relating to disk space (`CSEWindowsSensorOutOfStorage` - Approaching Storage Limits Warning).  When the Sensor detects that conditions are within `DiskSpaceWarningThresholdPercentOfLimit` percent of exceeding the specified limits, a Health Status Warning message will be sent to CIP. This warning threshold applies to the following configurable disk space limits:

  * MinPercentDiskSpaceLeft
  * MaxDirectoryQueueFolderDirectorySize
  * MaxEventLogQueueFolderDirectorySize

## DomainControllerDetectionInterval

**Default**: 4 hours

**Description**: This setting relates to the [Domain Controller Monitor](windows-sensor-overview.md#domain-controller-monitor). Specifies how long to wait until we attempt to detect Domain Controllers again. Domain Controllers are always detected at least once at startup, regardless of this setting.

## Environment

**Default**: none

**Description**: This setting only applies if you configure the sensor to send data to the legacy CSE server, as opposed to the Sumo Logic platform. If it is set, it is transmitted as a tag with each event log to describe the tenant location. Used in multi-tenant applications. 

## ErrorMessagesBufferMax

**Default**: 100

**Description**: Maximum number of errors that can be stored locally before being uploaded. When the buffer is full, the oldest error messages are discarded to make room for incoming messages.

## ErrorUploadBurstRate

**Default**: 10

**Description**: Specifies how many errors the sensor will upload in a single burst. Works in conjunction with [ErrorUploadInterval](#erroruploadinterval) to determine the pace of error uploads.

## ErrorUploadInterval

**Default**: 100

**Description**: Specifies how long (in milliseconds) the sensor will rest before uploading another burst of errors. Works in conjunction with [ErrorUploadBurstRate](#erroruploadburstrate) to determine the pace of error uploads.

## EventIdAllowList

**Default**: 4624, 4634, 4625, 4706, 4727, 4754, 4755, 4768, 4769, 4780, 4964

**Description**: You can use this property to configure which Windows event IDs are collected. The default event collection, and the effect of `EventIdAllowList` varies, depending on which event log monitoring mode you are using.

**Domain Controller monitoring:**
If you are monitoring Domain Controllers for event logs, by default the sensor collects events that record:

* Successful user logins
* Unsuccessful user logins
* User password resets
* User password errors
* User lockouts

You cannot change what events are collected by default. You can use `EventIdAllowList` to specify additional event IDs to collect.

**WEC/WEF monitoring**

If you are collecting events from WEC rather than monitoring Domain Controllers (that is, `EventLogForwarderEnable` is set to true), `EventIDAllowListEnable` will default to false, resulting in collection of all WEC events.

If desired, you can configure the sensor to send only selected WEC events by specifying those events using  `EventIdAllowList` and setting [EventLogForwarderAllowListEnable](#eventlogforwarderallowlistenable) to true. 

For more information about security-related events, see [Events to Monitor](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor) in Microsoft help.

## EventIdDenylist

**Default**: 

**Description**:

## EventLogEnableDomainControllers

**Default**: true

**Description**: When set to true, the sensor will search the network for Domain Controllers and monitor event logs for any that are located.

## EventLogEnableInitialDump

**Default**: false 

**Description**: If set to true, the sensor will collect and report existing events in the Event Log, from up to 7 days before the service start date.  Otherwise, events that have occurred before service start up are ignored.

## EventLogEnableMonitorLocalhost

**Default**: false 

**Description**: Enables the [Localhost Monitor](windows-sensor-overview.md#localhost-monitor) to monitor local events on the machine that is running the sensor.

## EventLogEnablePeriodicReAttach

**Default**:  false

**Description**: If set to true, the sensor will periodically disconnect the event log monitors and reconnect. Works in conjunction with the [EventLogEnablePeriodicReAttachInterval](#eventlogenableperiodicreattach) setting.

## EventLogEnablePeriodicReAttachInterval

**Default**: 60

**Description**: Specifies the interval, in seconds, between attempts to reattach the event log monitors to their targets.  Valid only if [EventLogEnablePeriodicReAttach](#eventlogenableperiodicreattach) is set to true.

## EventLogFormatIncludeMessageDescriptionFirstLineOnly

**Default**: false

**Description**: If set to true, the service will include only the first line of the event record’s Message.  If set to false, the entire Message will be included. Valid only valid if [EventLogFormatIncludeMessageDescription](#eventlogformatincludemessagedescription) is set to true. This setting is available in sensor versions 1.9 and higher.

## EventLogFormatIncludeMessageDescription

**Default**: false

**Description**: If set to true, the service will include the Message section of the event record when uploading the event to the collector. 
This setting is available in sensor versions 1.9 and higher.

## EventLogFormatRawXml

**Default**: false

**Description**: If set to true, the service will bypass parsing the event record into Sumo’s format. Instead, it will send the event in its raw XML format, as it did in sensor version 1.8. This setting is available in sensor versions 1.9 and higher.

## EventLogForwarderAllowListEnable

**Default**: false

**Description**: Specifies whether or not the sensor should filter monitored WEC events.  If set to false, the sensor will monitor for all events. If set to true, the sensor will monitor only the event IDs specified in the [EventIdAllowList](#eventidallowlist) setting to filter incoming events.

Valid only if [EventLogForwarderEnable](#eventlogforwarderenable) is set to true.

This setting is available in sensor versions 1.9 and higher. It replaces the EventLogForwarderWhiteListEnable setting available in previous releases.

## EventLogForwarderDenyListEnable

**Default**: false

**Description**: Specifies whether or not the sensor should filter monitored WEC events. If set to true, the sensor will filter incoming events by excluding the event IDs specified in the [EventIdDenyList](#eventiddenylist).

Valid only if [EventLogForwarderEnable](#eventlogforwarderenable) is set to true.

For best performance, do not combine with [EventLogForwarderAllowListEnable](#eventlogforwarderallowlistenable) set to true.

This setting is available in sensor versions 1.9 and higher. It replaces the EventLogForwarderBlackListEnable setting available in previous releases.

## EventLogForwarderEnable

This option is not in `settings.conf` by default. Add this option to enable the [Windows Event Collector (WEC) Monitor](windows-sensor-overview.md). 

**Default**: false

**Description**: Enables Windows Event Collector (WEC) support.  If set to true, [EventLogForwarderHostName](#eventlogforwarderhostname) must also be specified. |

## EventLogForwarderHostName

**Default**:  

**Description**: Specifies the machine for the sensor to monitor for forwarded events.  Valid only if [EventLogForwarderEnable](#eventlogforwarderenable) is set to true. |

## EventLogForwarderLogName

**Default**: ForwardedEvents

**Description**: Specifies the log name to monitor for Forwarded Events. [EventLogForwarderEnable](#eventlogforwarderenable) is set to true. Deprecated after sensor version 1.8.

## EventLogForwarderLogNames

**Default**: ForwardedEvents

**Description**: Specifies the log names to monitor for Forwarded Events, when using the WEC monitor. Valid only if [EventLogForwarderEnable](#eventlogforwarderenable) is set to true. Other valid Microsoft Event Logs names include "Security" and "Application". You can also specify your own custom log channels. Setting available in sensor versions 1.9 and higher.

For backwards-compatibility, the service will combine the legacy setting [EventLogForwarderLogName](#eventlogforwarderlogname) (if specified) with the list of [EventLogForwarderLogNames](#eventlogforwarderlognames) (if specified).  If neither setting is specified in the configuration file, it will default to monitor only the “ForwardedEvents” log.

## EventLogHosts


**Default**: none

**Description**: Specifies a list of additional host names of machines that the sensor should monitor for events.

## EventLogMaxAppends

**Default**: 10000

**Description**: Specifies how many records to append to an event log file before stopping to send the file. This value works with the [EventLogQueueMaxFileOpenTime](#eventlogqueuemaxfileopentime) to control how long the Windows Sensor waits before sending a file to which it is still appending.

## EventLogMaxBytes

**Default**: 20000000 (20 MB)

**Description**: Specifies the maximum file size (in bytes) for an event log snapshot file (used to queue event log records for upload).

## EventLogMaxParallelUploads

**Default**: 30

**Description**: Specifies how many event log snapshot files that the sensor will attempt to upload at the same time, in parallel. This value may be adjusted to align with the computing resources available on the machine.

## EventLogQueueBacklogWarningThresholdMaxFileAgeHours

**Default**: 1 hour

**Description**: Specify as a whole number of hours.  This setting is used by the sensor to determine when to send Health Status messages relating to potential Event Log Queue backlogs (CSEWindowsExcessiveBacklog - Oldest Record Timestamp in Queue Exceeds Threshold Warning).

When the Sensor detects a file in the Event Log Queue folder with a timestamp more than `EventLogQueueBacklogWarningThresholdMaxFileAgeHours` before the current time, a Health Status Warning message will be sent to CIP.

## EventLogQueueBacklogWarningThresholdMaxFilesPerActiveMonitor

**Default**: 5 files

**Description**: Specify as a whole number of files per active event log monitor.  (There is an active event log monitor for every channel/server combination that the sensor monitors for event log records.) This setting is used by the sensor to determine when to send Health Status messages relating to potential Event Log Queue backlogs (CSEWindowsExcessiveBacklog - Too Many Files Pending Upload).

When the Sensor detects that the number of files in the Event Log Queue folder is more than `EventLogQueueBacklogWarningThresholdMaxFilesPerActiveMonitor` multiplied by the number of active event log monitors, a Health Status Warning message will be sent to CIP.

## EventLogQueueMaxFileOpenTime

**Default**: 20 seconds

**Description**: The amount of time the event log queue file can remain open, in seconds. The event log thread will continuously append to a file. As it runs, the Windows Sensor can upload what data it has already collected instead of waiting for a long pause. This field specifies how long the file will remain open before it just uploads it and starts a new file.

## EventLogUploadBatchSizeTarget

**Default**: 1

**Description**: This setting applies to configurations in which the sensor uploads to the Sumo Logic platform (as opposed to the legacy CSE server).

The sensor uploads event log records in batches. This setting specifies the target size (in MB) of the batch that is uploaded. Rarely changed.

## EventLogUploadCategory

**Default**: “/cse/windows/event”

**Description**: This setting applies to configurations in which the sensor uploads to the Sumo Logic platform (as opposed to the legacy CSE server).

The sensor will use this setting to populate the value in the `X-Sumo-Category` header.

## EventLogUploaderRestDuration

**Default**: 100

**Description**: This specifies low long the thread will rest (in milliseconds) before checking for another file to send. This is here to avoid pegging out the CPU. 

## EventLogUploadPause

**Default**: false

**Description**: If set to true, the sensor will not upload event log snapshot files.  This setting is rarely used, except for troubleshooting.

## EventLogUploadSiemForwarding

**Default**: true

**Description**: This setting applies to configurations in which the sensor uploads to the Sumo Logic platform (as opposed to the legacy CSE server). 

For event log uploads, the sensor will use this setting to populate the value in the `_siemForwarding` header.

## EventLogUploadUrlPath

**Default**: /log/cef

**Description**: This is the path to the API endpoint where event log records are uploaded.

## EventLogVerboseTrace

**Default**: false

**Description**: If set to true, low level information about the process of retrieving event log records and dumping them to snapshot files will be logged as Trace messages.

Minimum log level must also be set to “Trace” in the `Nlog.config` file located in `C:\Program Files\Sumo Logic\CSE Windows Sensor`.

## IngestAddress

**Default**: `<customer name>-ingest.portal.jask.ai`

**Description**: This is the host name to the API endpoint where records are uploaded. When the sensor is configured to send data to the legacy CSE server (rather than to the Sumo Logic platform), this value can be overridden. It is rarely changed. Only set this when directed to do so by a Sumo Logic engineer. |

## MaxAppends

**Default**: 10000

**Description**: This setting is deprecated. It is replaced by [EventLogMaxAppends](#eventlogmaxappends) and [DirectoryMaxAppends](#directorymaxappends).

## MaxDirectoryQueueFolderDirectorySize

**Default**: 2048

**Description**: Specifies the upper limit (in MB) for the DirectoryQueue directory, `C:\ProgramData\Sumo Logic\CSE Windows Sensor\DirectoryQueue`

## MaxDomainControllerConnections

**Default**: 25

**Description**: The maximum number of domain controllers that the sensor will connect to.

## MaxEventLogQueueFolderDirectorySize

**Default**: 2048

**Description**: Specifies the upper limit (in MB) for the EventLogQueue directory, `C:\ProgramData\Sumo Logic\CSE Windows Sensor\EventLogQueue`. 

## MaxSensorDirectorySize

**Default**: 4096

**Description**: DEPRECATED - This field has been broken out into [MaxEventLogQueueFolderDirectorySize](#maxeventlogqueuefolderdirectorysize) and [MaxDirectoryQueueFolderDirectorySize](#maxdirectoryqueuefolderdirectorysize).

## MinPercentDiskSpaceLeft

**Default**: 5 

**Description**: To help prevent directory and event log files from filling up the local hard drive, the sensor will stop logging once the available hard drive space drops below the percentage specified.

## OnUploadFailedRestDuration

**Default**: 10

**Description**: This specifies low long the thread rests (in seconds) if it encounters a network error. If an upload thread encounters an error while uploading, the thread will pause for this interval. This is here to avoid slamming on the servers in the event of an outage.

## ProxyPassword

This option does not appear in `settings.conf` by default. Add this option if there is an HTTP proxy between the sensor and its destination, either Sumo Logic platform or the legacy CSE server. 

**Default**: none

**Description**: The password for the proxy account. Used in conjunction with [ProxyUrl](#proxyurl) and [ProxyUsername](#proxyusername).

## ProxyUrl

This option does not appear in `settings.conf` by default. Add this option if there is an HTTP proxy between the sensor and its destination, either Sumo Logic platform or the legacy CSE server. 

**Default**: none

**Description**: The URL for the proxy account. Used in conjunction with [ProxyPassword](#proxypassword) and [ProxyUsername](#proxyusername).

## ProxyUsername

This option does not appear in `settings.conf` by default. Add this option if there is an HTTP proxy between the sensor and its destination, either Sumo Logic platform or the legacy CSE server. 

**Default**: none

**Description**: The username for the proxy account. Used in conjunction with [ProxyPassword](#proxypassword) and [ProxyUrl](#proxyurl).

## SensorApiKey

This setting is required in configurations in which the sensor uploads to the legacy CSE server (as opposed to the Sumo Logic platform).

**Default**: none

**Description**: The CSE Windows Sensor API Key is unique to the customer account. It can be found in the CSE portal GUI.

## SensorId

**Default**: none

**Description**: This unique GUID is automatically generated by the Windows Sensor on first start (or first boot of this sensor install). It uniquely identifies the sensor install. Each time a sensor is installed fresh on a new machine, this ID is regenerated. An in-place upgrade will not cause a new Sensor ID to be generated.

If it is missing, the Windows Sensor will generate it and add it. Don’t  edit this line manually.

## SensorZone

**Default**: "default"

**Description**: This setting only applies if you configure the sensor to send data to the legacy CSE server, as opposed to the Sumo Logic platform.

## StatusReportInterval

**Default**: 300

**Description**: This setting only applies if you configure the sensor to send data to the legacy CSE server, as opposed to the Sumo Logic platform.

It controls how often the sensor generates and sends a status report (units in seconds).

## Example settings.conf Files

This section contains examples of `C:\ProgramData\Sumo Logic\CSE Windows Sensor\settings.conf` for different environments.

### Minimal settings for sending to Sumo Logic platform

```json
{
    "Address": "https://endpointX.collection.usX.sum...http/loremip==",     
    "SensorId": “12345678-1111-0000-0000-123456789012"
}
```

### Minimal settings for sending to CSE legacy server

```json
{
    "Address": "https://example.portal.jask.ai",
    "SensorApiKey": "99999999-1111-0000-0000-555555555555",
    "SensorId”: "12345678-1111-0000-0000-123456789012"
}
```

### Localhost monitor on, Domain Controller monitor off

```json
{
    "Address": "https://endpointX.collection.usX.sum...http/loremip==" ,
    "SensorId": "12345678-1111-0000-0000-123456789012",

    "EventLogEnableMonitorLocalhost": true,
    "EventLogEnableDomainControllers": false
}
```

### Proxy configuration

```json
{
    "Address": "https://endpointX.collection.usX.sum...http/loremip==" ,
    "SensorId": "12345678-1111-0000-0000-123456789012",

    "ProxyUrl": "http://my-network-proxy:8080" ,
    "ProxyUsername": "corp\bob.janes",
    "ProxyPassword": "FJGJ%4dj3"
}
```

### Active Directory filter, additional Windows event collection

```json
{
    "Address": "https://endpointX.collection.usX.sum...http/loremip=="      
    "SensorId": "12345678-1111-0000-0000-123456789012",

    "EventIdAllowList": [4624, 4634, 4625],
    "EventLogQueueMaxFileOpenTime": 10,
    "EventLogMaxAppends": 100000,

    "DirectoryExcludeDistinguishedNameSuffixes": [“CN=Users,DC=ignoreme,DC=local", \
    "CN=Users,DC=andmetoo,DC=local"]
}
```

### Minimal WEC monitoring configuration

```json
{
  "Address": "https://endpointX.collection.usX.sum...http/loremip==",
  "SensorId": "85b95f1b-8b79-4d97-aba3-2d996232f55c",
  "EventLogForwarderEnable": true,
  "EventLogForwarderHostName": "wef.windomain.local",
  "EventLogForwarderLogNames" : ["Security", "Application", "ForwardedEvents"],
  "EventLogEnableDomainControllers": false
}
```

### WEC monitoring

```json
{
  "Address": "SHOULD ALREADY BE PRESENT",
  "SensorId": "SHOULD ALREADY BE PRESENT",
  "DirectoryEnabled": false,
  "EventLogEnableDomainControllers": false,
  "EventLogForwarderEnable": true,
  "EventLogForwarderHostName" : "localhost",
  "EventLogEnableMonitorLocalhost": false,
  "EventLogFormatIncludeMessageDescription" : true,
  "EventLogFormatIncludeMessageDescriptionFirstLineOnly" : true,
  "EventLogFormatRawXml" : false,
  "EventLogUploadCategory": "prod/windows/wef/%%servername%%",
  "EventLogForwarderLogNames": ["ForwardedEvents"],
  "EventLogForwarderDenyListEnable": true,
  "EventIdDenyList": [99999,88888]
}
``` 

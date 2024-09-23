---
id: json-parameters-installed-sources
title: JSON Parameters for Installed Sources
description: This topic describes JSON Source parameters for installed Collectors.
---

This topic describes JSON Source parameters for installed Collectors. For more information about configuring sources in JSON files, and how to configure Sumo to read the JSON files, see [Local Configuration File Management](/docs/send-data/use-json-configure-sources/local-configuration-file-management).

:::important
JSON files need to be UTF-8 encoded following [RFC 8259](https://tools.ietf.org/html/rfc8259).
:::

## Source types for installed collectors

Each Source can have its own unique fields in addition to the generic fields listed in [Use JSON to configure sources](/docs/send-data/use-json-configure-sources). The `sourceType` field determines the type of Source (and the associated parameters). The next table lists the valid field types. The sections that follow list the unique parameters for each and associated JSON examples.

## Log source parameters for installed collectors

|Field Type | Type Value |
|:--|:--|
| [Local File Source](#local-filesource) | LocalFile |
| [Remote File Source](#remote-filesource) | RemoteFileV2 |
| [Local Windows Event Log Source](#local-windows-event-logsource) | LocalWindowsEventLog |
| [Remote Windows Event Log Source](#remote-windows-event-log-source) | RemoteWindowsEventLog |
| [Local Windows Performance Source](#local-windows-performance-source) | LocalWindowsPerfMon |
| [Remote Windows Performance Source](#remote-windows-performance-source) | RemoteWindowsPerfMon|
| [Windows Active Directory Inventory Source](#windows-active-directory-inventory-source) | ActiveDirectory |
| [Syslog Source](#syslogsource) | Syslog |
| [Script Source](#script-source) | Script |
| [Docker Log Source](#docker-logsource) | DockerLog |
| [Docker Stats Source](#docker-statssource) | DockerStats |


## Local file source

In addition to the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types), the following parameters are specific to the local file source.

###### `sourceType`
<small>| STRING | REQUIRED | NOT MODIFIABLE |</small>
* **Default**. N/A. <!-- null instead of N/A? -->
* **Description**. LocalFile.

###### `pathExpression`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A. <!-- null instead of N/A? -->
* **Description**. A valid path expression (full path) of the file to collect. For files on Windows systems (excluding [Windows Events](https://www.tutorialspoint.com/01Sources-for-Installed-Collectors/Local-Windows-Event-Log-Source/)), enter the absolute path including the drive letter. Escape special characters and spaces with a backslash (`\`). If you are collecting from Windows using CIFS/SMB, see [Prerequisites for Windows Log Collection](/docs/send-data/installed-collectors/sources/remote-file-source/prerequisites-windows-remote-file-collection).
* **Example**.
   * Use a single asterisk wildcard [`*`] for file or folder names:
     ```
     [var/foo/*.log]
     ```
   * Use two asterisks [`**`] to recurse within directories and subdirectories:
     ```
     [var/**/*.log]
     ```

###### `denylist`
<small>| STRING, Array | OPTIONAL | MODIFIABLE |</small>
* **Default**. `[]`.
* **Description**. Comma-separated list of valid path expressions from which logs will not be collected.
* **Example**.
  ```
  "denylist":["/var/log/**/*.bak","/var/oldlog/*.log"]
  ```

###### `encoding`
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. `"UTF-8"`.
* **Description**. Defines the encoding form.
* **Example**. Options include `"UTF-16"`, `"UTF-16BE"`, and `"UTF-16LE"`.

Local file source JSON example with `cutoffTimestamp`:

```json
{
  "api.version": "v1",
  "sources": [
    {
      "name": "Test-Chef",
      "category": "Chef",
      "automaticDateParsing": true,
      "multilineProcessingEnabled": false,
      "useAutolineMatching": false,
      "forceTimeZone": false,
      "timeZone": "UTC",
      "filters":[],
      "cutoffTimestamp":1426057200000,
      "encoding": "UTF-8",
      "pathExpression": "/home/ubuntu/chef*.log",
      "denylist":[],
      "sourceType": "LocalFile"
    }
  ]
}
```

## Remote file source

In addition to the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types), the following parameters are specific to the remote file source.

###### `sourceType`
<small>| STRING | REQUIRED | Not modifiable |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. RemoteFileV2

###### `remoteHosts`
<small>| Array | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Host name of remote machine. Make sure to enclose IP addresses in brackets.
* **Example**.
  ```
  ["192.168.0.1", "10.0.1.16", "192.168.1.234"]
  ```

###### `remotePort`
<small>| Int | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Port of remote machine (SSH).

###### `remoteUser`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. User account to connect to the remote machine.

###### `remotePassword`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Password used to connect to remote machine. Required only when authMethod is set to `"password"`.

###### `keyPath`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Path to SSH key used to connect to the remote machine. Required only when `authMethod` is set to `"key"`.

###### `keyPassword`
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. null.
* **Description**. Password to SSH key to connect to the remote machine. Required only with `authMethod` is set to `"password"`.

###### `pathExpression`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Path expression of the files to collect.

###### `authMethod`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Authentication method used to connect to the remote machine.
* **Example**. Options are `"password"` to connect with a password or `"key"` to connect with an SSH key.

###### `denylist`
<small>| LIST | OPTIONAL | MODIFIABLE |</small>
* **Default**. `[]`.
* **Description**. List of valid path expression to skip.

Remote file source JSON example:

```json
{
   "api.version": "v1",
   "sources": [
      {
         "sourceType": "RemoteFileV2",
         "name": "Example1",
         "remoteHosts": [
            "192.168.0.1",
            "10.0.1.16",
            "192.168.1.234"
         ],
         "remotePort": 22,
         "remoteUser": "user",
         "remotePassword": "password",
         "keyPath": "",
         "keyPassword": "",
         "pathExpression": "/var/log/somelog.log",
         "authMethod": "password",
         "denylist": [
            "/var/log/*.out.log",
            "/var/log/*.tmp.log"
         ]
      }
   ]
}
```

## Local Windows event log source

In addition to the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types), except hostName, the following parameters are specific to the local Windows event log source. The Source Host (`_sourceHost`) value is parsed and applied to your event logs automatically. The value is parsed from the field `Computer` in your event logs.

###### `sourceType`     
<small>| STRING | REQUIRED | NOT MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. LocalWindowsEventLog.

###### `logNames`       
<small>| LIST | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. List of Windows log types to collect. For example, `"Security"` or  `"Application"`. To obtain the list of available logs on a given machine, use the PowerShell command `Get-WinEvent -ListLog *` or the legacy command `wevtutil el`. We do not support `"Analytic"` or `"Debug"` ETW logs.

###### `renderMessages`
<small>| BOOLEAN | OPTIONAL | MODIFIABLE |</small>
* **Default**. true
* **Description**. Optional, only applicable to the legacy format. When using legacy format, this indicates if full event messages are collected (`true`) or just core event [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) (`false`).

###### `eventFormat`    
<small>| INTEGER | OPTIONAL | MODIFIABLE |</small>
* **Default**. `0`
* **Description**. Sets how you want your event logs formatted.
* **Example**.
   * Use `0` for the legacy format. Where events retain their default XML format from Windows.
   * Use `1` for JSON format. Where events are formatted into JSON that is designed to work with Sumo Logic features, making it easier for you to reference your data.

###### `eventMessage`   
<small>| INTEGER | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Required if eventFormat is 0.
* **Example**.
   * Use `0` for the complete message. It will ingest the entire event content along with metadata.
   * Use `1` for the message title. It will ingest the first line of event messages along with all of the metadata.
   * Use `2` for metadata only. It will ingest metadata fields from each event, including event ID and timestamp.

###### `allowlist`      
<small>| STRING array | OPTIONAL | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Available in Collector versions 19.351-4 and later. You can set allow and deny Windows Event ID filters to only collect important events. We recommend only using one at a time. Your list needs to be a comma-separated list of event IDs.

###### `denylist`       
<small>| STRING array | OPTIONAL | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Available in Collector versions 19.351-4 and later. You can set allow and deny Windows Event ID filters to only collect important events. We recommend only using one at a time. Your list needs to be a comma-separated list of event IDs.

```json title="Local Windows event log source JSON example"
{
  "api.version": "v1",
  "sources":[
    {
      "sourceType": "LocalWindowsEventLog",
      "name": "Example1",
      "allowlist": "100,101,102,103,104,105",
      "logNames":[
        "Security",
        "Application",
        "System"
      ],
      "eventFormat":1,
      "eventMessage":1
    }
  ]
}
```

## Remote Windows event log source

In addition to the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types), except hostName, the following parameters are specific to the remote Windows event log source. The Source Host (`_sourceHost`) value is parsed and applied to your event logs automatically. The value is parsed from the field `Computer` in your event logs.

###### `sourceType`
<small>| STRING | REQUIRED | NOT MODIFIABLE |</small>
* **Default**. null
* **Description**. RemoteWindowsEventLog.

###### `domain`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. null
* **Description**. Windows domain from which logs will be created.

###### `username`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. null
* **Description**. Username needed to connect to the remote machine.

###### `password`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. null
* **Description**. Password needed to connect to the remote machine.

###### `hosts`
<small>| LIST | REQUIRED | MODIFIABLE |</small>
* **Default**. null
* **Description**. List of hosts to collect from.

###### `logNames`
<small>| LIST | REQUIRED | MODIFIABLE |</small>
* **Default**. null
* **Description**. List of Windows log types collected.

###### `logNames`
<small>| LIST | REQUIRED | MODIFIABLE |</small>
* **Default**. null
* **Description**. List of Windows log types to collect.To obtain the list of available logs on a given machine, use the PowerShell command `Get-WinEvent -ListLog *` or the legacy command `wevtutil el`. We do not support `"Analytic"` or `"Debug"` ETW logs.
* **Example**. `"Security"` or `"Application"`.

###### `renderMessages`
<small>| BOOLEAN | OPTIONAL, only applicable to the legacy format. | MODIFIABLE |</small>
* **Default**. `true`.
* **Description**. When using legacy format, this indicates if full event messages are collected (`true`) or just core event [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) (`false`).

###### `eventFormat`
<small>| INTEGER | OPTIONAL | MODIFIABLE |</small>
* **Default**. `0`.
* **Description**. Sets how you want your event logs formatted.
   * Use `0` for the legacy format. Where events retain their default XML format from Windows.
   * Use `1` for JSON format. Where events are formatted into JSON that is designed to work with Sumo Logic features, making it easier for you to reference your data.

###### `eventMessage`
<small>| INTEGER | REQUIRED if eventFormat is `0`. | MODIFIABLE |</small>
* **Default**. null
* **Description**.
   * Use `0` for the complete message. It will ingest the entire event content along with metadata.
   * Use `1` for the message title. It will ingest the first line of event messages along with all of the metadata.
   * Use `2` for metadata only. It will ingest metadata fields from each event, including event ID and timestamp.

###### `allowlist`
<small>| STRING array | OPTIONAL | MODIFIABLE |</small>

**Default**. null<br/>
**Description**. Available in Collector version 19.351-4 and later. You can set allow and deny Windows Event ID filters to only collect important events. We recommend only using one at a time. Your list needs to be a comma-separated list of event IDs.

###### `denylist`
<small>| STRING array | OPTIONAL | MODIFIABLE |</small>
**Default**. null<br/>
**Description**. Available in Collector version 19.351-4 and later. You can set allow and deny Windows Event ID filters to only collect important events. We recommend only using one at a time. Your list needs to be a comma-separated list of event IDs.

```json title="Remote Windows event log source JSON example"
{
   "api.version": "v1",
   "sources":[
      {
         "sourceType": "RemoteWindowsEventLog",
         "name": "Example1",
         "domain": "mydomain",
         "username": "user",
         "password": "password",
         "hosts":[
            "myremotehost1",
            "myremotehost2"
         ],
         "logNames":["Security","Application","System"],
         "eventFormat":1,
         "eventMessage":1
      }
   ]
}
```

## Local Windows performance source 

In addition to the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types), the following parameters are specific to the local Windows performance source.

###### `sourceType`
<small>| STRING | REQUIRED | NOT MODIFIABLE |</small>
* **Default**. null
* **Description**. LocalWindowsPerfMon

###### `wmiQueries`    
<small>| LIST | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. List of queries to be executed. Each query is an object with two fields: name and query.

```json title="Example response"
{
   "api.version": "v1",
   "sources":[
      {
         "sourceType": "LocalWindowsPerfMon",
         "name": "Example1",
         "wmiQueries":[
            {
               "name": "query_1",
               "query": "select * from Win32_PerfFormattedData_PerfOS_Processor"
            },
            {
               "name": "query_2",
               "query": "select * from NonExistence"
            }
         ]
      }
   ]
}
```

## Remote Windows performance source 

In addition to the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types), the following parameters are specific to the remote Windows performance source.

###### `sourceType`
<small>| STRING | REQUIRED | NOT MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. RemoteWindowsPerformance

###### `domain`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Windows domain from which logs will be created. |

###### `remoteUser`
<small>| STRING | REQUIRED | ? |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Username needed to connect to the remote machine.

###### `remotePassword`
<small>| STRING | REQUIRED | ? |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Password needed to connect to the remote machine.

###### `remoteHosts`
<small>| LIST | REQUIRED | ? | </small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. List of hosts to collect from.

###### `wmiQueries`
<small>| LIST | REQUIRED | ? |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. List of queries to be executed. Each query in an object with two fields: name and query.

```json title="Remote Windows performance source JSON example"
{
   "api.version": "v1",
   "sources":[
      {
         "sourceType": "RemoteWindowsPerformance",
         "name": "Example1",
         "domain": "mydomain",
         "remoteUser": "user",
         "remotePassword": "password",
         "remoteHosts":[
            "myremotehost1",
            "myremotehost2"
         ],
         "wmiQueries":[
            {
               "name": "query_1",
               "query": "select * from Win32_PerfFormattedData_PerfOS_Processor"
            },
            {
               "name": "query_2",
               "query": "select * from NonExistence"
            }
         ]
      }
   ]
}
```

## Windows performance metric example

This example shows how to use WMI queries to collect performance metrics from Windows systems.

```json
{
   "api.version": "v1",
   "sources":[
      {
         "name": "Windows Performance",
         "sourceType": "LocalWindowsPerfMon",
         "automaticDateParsing": false,
         "multilineProcessingEnabled": false,
         "useAutolineMatching": false,
         "forceTimeZone": false,
         "filters": [],
         "cutoffTimestamp": 0,
         "encoding": "UTF-8",
         "interval": 300000,
         "wmiQueries": [
            {
               "name": "CPU",
               "query": "select * from Win32_PerfFormattedData_PerfOS_Processor"
            },
            {
               "name": "Logical Disk",
               "query": "select * from Win32_PerfFormattedData_PerfDisk_LogicalDisk"
            },
            {
               "name": "Physical Disk",
               "query": "select * from Win32_PerfFormattedData_PerfDisk_PhysicalDisk"
            },
            {
               "name": "Memory",
               "query": "select * from Win32_PerfFormattedData_PerfOS_Memory"
            },
            {
               "name": "Network",
               "query": "select * from Win32_PerfFormattedData_Tcpip_NetworkInterface"
            }
         ]
      }
   ]
}
```

### Windows Active Directory Inventory Source 

In addition to the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types), the following parameters are specific to the Windows Active Directory Inventory Source.

###### `sourceType`     
<small>| STRING | REQUIRED | NOT MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. ActiveDirectory.

###### `nameSuffixes`   
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Semi-colon separated list of Distinguished Name suffixes. When set, the source won't ingest any records that contain the Distinguished Name suffixes specified.

###### `filter`
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Specifies a filter to use when searching for Domain Objects in Active Directory.

###### `additionalAttr`
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Semi-colon separated list of the LDAP Names of Active Directory attributes to report, in addition to the default list.

###### `excludedAttr`   
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Semi-colon separated list of the LDAP Names of Active Directory attributes to be excluded from the report.

###### `interval`
<small>| INTEGER | OPTIONAL | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Seconds to check for new data. By default, Active Directory is queried for data every 24 hours. You can select a more frequent interval down to every minute.

```json title="Windows Active Directory Inventory Source JSON example"
{
  "api.version": "v1",
  "source": {
    "name": "AD",
    "category": "{{sys.PATH}}-{{sys.YourEnvVar}}",
    "automaticDateParsing": false,
    "multilineProcessingEnabled": false,
    "useAutolineMatching": false,
    "forceTimeZone": false,
    "filters":[],
    "cutoffTimestamp":0,
    "encoding": "UTF-8",
    "fields":{

    },
    "nameSuffixes": "CN=System",
    "filter": "(objectClass=user)",
    "interval":60000,
    "additionalAttr": "name",
    "excludedAttr": "whenCreated;objectGUID",
    "sourceType": "ActiveDirectory"
  }
}
```

## Syslog source

Syslog Sources do not support Multiline Detection, which means the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types) `multilineProcessingEnabled`, `useAutolineMatching`, and `manualPrefixRegexp` are not applicable. If you provide these in the Syslog Source configuration they are ignored.

:::note
Syslog sources break a syslog message on each newline character and send each line as individual messages to the service.
:::

###### `sourceType`
<small>| STRING | REQUIRED | NOT MODIFIABLE |</small>
* **Default**. null
* **Description**. Syslog.

###### `protocol`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. null
* **Description**. Protocol that syslog should use. Both UDP and `TCP` are supported.

###### `port`
<small>| INTEGER | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Port that syslog should use to connect to the machine. 
* **Example**. Recommended ports: `514` or `1514`.

```json title="Syslog source JSON example"
{
  "api.version": "v1",
  "sources": [
    {
      "sourceType": "Syslog",
      "name": "Example1",
      "protocol": "UDP",
      "port": 514
    }
  ]
}
```

## Script source

In addition to the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types), the following parameters are specific to the script source.

###### `sourceType`
<small>| STRING | REQUIRED | NOT MODIFIABLE |</small>
* **Default**. null
* **Description**. Script

###### `commands`
<small>| LIST | REQUIRED | `[ ]` | MODIFIABLE |</small>
* **Default**. null
* **Description**. List of command line arguments.

###### `file`
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. null
* **Description**. Path to script file to run.

###### `workingDir`
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. null
* **Description**. Working directory for commands/script.

###### `timeout`
<small>| Long | OPTIONAL | MODIFIABLE |</small>
* **Default**. `0` null?
* **Description**. Script timeout (in milliseconds). By default, this is set to `0`.

###### `script`
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. null
* **Description**. Script contents (if no file is provided).

###### `cronExpression`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Schedule for running the script. Must be a valid Quartz cron expression.

```json title="Script source JSON example"
{
   "api.version": "v1",
   "sources":[
      {
         "sourceType": "Script",
         "name": "Example1",
         "commands":[
            "/bin/bash"
         ],
         "file": "/usr/local/bin/getlogs.log",
         "workingDir": "/var/log",
         "timeout": 60000,
         "script": "",
         "cronExpression": "0 * * * *"
      }
   ]
}
```

## Docker log source

In addition to the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types), the following parameters are specific to the Docker log source.


###### `sourceType`
<small>| STRING | REQUIRED | MODIFIABLE |</small>
* **Default**. null
* **Description**. DockerLog

###### `uri`
<small>| STRING | REQUIRED | MODIFIABLE |</small>  
* **Default**. null
* **Description**. URI of the Docker daemon.

###### `specifiedContainers`
<small>| LIST| MODIFIABLE |</small>  
* **Default**. null
* **Description**. Comma-separated list of Docker containers. Collection will be only from running containers. If the list contains stopped containers, the source can start collecting from these containers if they are started later. For advanced container filtering options, see [More about defining container filters](/docs/send-data/installed-collectors/sources/docker-sources).

###### `allContainers`
<small>| BOOLEAN| REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Flag indicating whether the Source includes all running containers (`true`) or only the containers listed in `specifiedContainers` (`false`).

###### `certPath`
<small>| STRING | `*` | MODIFIABLE |</small>
* **Default**. null
* **Description**. Enter the path to the cert files on the local machine where the Collector is running. Required if the URI uses HTTPS.

###### `collectEvents`
<small>| BOOLEAN| REQUIRED | </small>  
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Must be set to `true` to collect the Docker logs.

```json title="Example source JSON with all containers"
{
   "api.version": "v1",
   "sources": [
      {
         "sourceType": "DockerLog",
         "name": "Example1",
         "uri": "https://54.165.12.163:2376",
         "allContainers": true,
         "certPath": "/home/ec2-user/.docker/machine/machines/wmad-docker",
         "collectEvents": true
      }
   ]
}
```

```json title="Example source JSON with specified containers"
{
  "api.version": "v1",
  "sources": [
    {
      "sourceType": "DockerLog",
      "name": "Example1",
      "uri": "https://54.165.12.163:2376",
      "specifiedContainers": [
        "webserver",
        "mysql",
        "another-container"
      ],
      "allContainers": false,
      "certPath": "/home/ec2-user/.docker/machine/machines/wmad-docker",
      "collectEvents": true
    }
  ]
}
```

## Docker stats source

In addition to the [common parameters](/docs/send-data/use-json-configure-sources/#common-parameters-for-log-source-types), the following parameters are specific to the Docker stats source.

###### `sourceType`
<small>| STRING | REQUIRED | NOT MODIFIABLE |</small>
* **Default**. null
* **Description**. DockerStats

###### `contentType`
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. null
* **Description**. If value is empty or does not exist, it’s a json-based source, if value is “DockerMetrics”, it’s a metrics source.

###### `metrics`
<small>| STRING | Array | OPTIONAL | MODIFIABLE |</small>
* **Default**. null
* **Description**. All metrics. List of metrics to be collected. Each metric is an object with two fields, category and metric. For a full list of available metrics, see [Docker metrics definitions](/docs/send-data/installed-collectors/sources/docker-sources/#docker-metrics-definitions). When omitted, all available host metrics will be collected.

###### `uri`
<small>| STRING | REQUIRED | MODIFIABLE |</small>  
* **Default**. null
* **Description**. URI of the Docker daemon.

###### `specifiedContainers`
<small>| LIST | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Comma-separated list of Docker containers. Collection will be only from running containers. If the list contains stopped containers, the source can start collecting from these containers if they are started later. For advanced container filtering options, see [More about defining container filters](/docs/send-data/installed-collectors/sources/docker-sources/#more-about-defining-container-filters).

###### `allContainers`
<small>| BOOLEAN | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Flag indicating whether the Source includes all running containers (true) or only the containers listed in `specifiedContainers` (`false`).

###### `certPath`
<small>| STRING | * | MODIFIABLE |</small>  
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Enter the path to the cert files on the local machine where the Collector is running. Required if the URI uses HTTPS.

###### `pollInterval`
<small>| Long | OPTIONAL | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Continuous (By default, polling occurs continuously, rather than on a periodic basis.) The frequency, in milliseconds, at which stats are polled. The minimum acceptable polling frequency is 1 second.

```json title="Example source JSON with all containers"
{
  "api.version": "v1",
  "source":{
    "name": "test",
    "category": "test",
    "automaticDateParsing": false,
    "multilineProcessingEnabled": false,
    "useAutolineMatching": false,
    "forceTimeZone": false,
    "filters":[],
    "cutoffTimestamp":0,
    "encoding": "UTF-8",
    "allContainers":true,
    "certPath": "",
    "uri": "unix:///var/run/docker.sock",
    "specifiedContainers":[],
    "pollInterval":60000,
    "sourceType": "DockerStats"
  }
}
```

```json title="Example source JSON to collect metrics"
{
  "api.version": "v1",
  "source": {
    "name": "docker-stats-metrics",
    "contentType": "DockerMetrics",
    "cutoffTimestamp": 0,
    "allContainers": true,
    "certPath": "",
    "uri": "unix:///var/run/docker.sock",
    "metrics":[
      {
        "category": "CPU",
        "metric": "cpu_usage.percpu_usage"
      },
      {
        "category": "Memory",
        "metric": "usage"
      }
    ],
    "specifiedContainers": [],
    "pollInterval": 0,
    "sourceType": "DockerStats"
  }
}
```

## Metric source parameters for installed collectors

| Field Type | Type Value |
|:--|:--|
| [Host metrics Source](#host-metricssource) | SystemStats |
| [Streaming Metrics Source](#streaming-metrics-source) | StreamingMetrics |

### Host metrics source 

the following parameters are specific to the our host metrics source. 

###### `name`
<small>| STRING | REQUIRED | MODIFIABLE |</small> 
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`.

###### `description`
<small>| STRING | OPTIONAL | MODIFIABLE |</small> 
* **Default**. null
* **Description**. Type a description of the Source.

###### `category`
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. null
* **Description**. Type a category of the source. This value is assigned to the metadata field `_sourceCategory`. See [Best practices](/docs/send-data/best-practices) for details.

###### `sourceType`
<small>| STRING | REQUIRED | NOT MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. SystemStats.

###### `metrics`
<small>| STRING Array | OPTIONAL | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. For a full list of available metrics, see [Host Metrics Source](/docs/send-data/installed-collectors/sources/host-metrics-source/). When omitted, all available host metrics will be collected. all metrics. Comma-separated list of metrics to collect.
* **Example**.
   ```
   "metrics": ["CPU_User", "CPU_Sys", "Mem_Used"]
   ```

###### `interval` (ms)
<small>| INTEGER | REQUIRED | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Time interval in milliseconds of the metrics collection. We recommend 60-second granularity (`60000`). The Sumo Logic UI offers some pre-defined values (10s, 15s, 30s, 1m, 5m).

###### `hostName`
<small>| STRING | OPTIONAL | MODIFIABLE |</small>
* **Default**. N/A.<!-- null instead of N/A? -->
* **Description**. Host from which the metrics are collected. 

```json title="Host metrics source JSON example"
{
  "api.version": "v1",
  "sources": [
    {
      "sourceType": "SystemStats",
      "name": "Host_Metrics",
      "interval": 60000,
      "hostName": "my_host",
      "metrics": [
        "CPU_User",
        "CPU_Sys",
        "Mem_Used"
      ]
    }
  ]
}
```

### Streaming metrics source 

The following parameters are specific to the streaming metrics source.

```json title="Graphite contentType JSON example"
{
  "api.version": "v1",
  "sources": [
    {
      "sourceType": "StreamingMetrics",
      "contentType": "Graphite",
      "name": "collectd",
      "protocol": "TCP",
      "port": 2003
    }
  ]
}
```

:::info
The streaming metrics source can receive Prometheus data as long as that data is pushed to it. This source cannot scrape Prometheus exporters. For that, we suggesting using Telegraf.
:::

## Additional information

See the following topics for additional information:
* [Use JSON to configure Sources](/docs/send-data/use-json-configure-sources). The topic includes a list of [common parameters](/docs/send-data/use-json-configure-sources) for all log Source types. For Sources, the common parameter `name` must be unique per Collector.
* [JSON Source parameters for Hosted Collectors](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources).
* [View or download Collector or Source JSON configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration) from Sumo Logic.

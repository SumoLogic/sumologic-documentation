---
id: insight-enrichment-server
title: Insight Enrichment Server
description: You can use the CSE Insight Enrichment Server to automatically enrich CSE Insights.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

The CSE Insight Enrichment Server is a component that automatically enriches CSE Insights.  

:::note
This topic describes v1.5.0 of the Insight Enrichment Server.
:::

## What the Insight Enrichment Server does

The Insight Enrichment Server performs an external query on the entity for an Insight—an IP address, a hostname, username, or a MAC address—and adds the query results as an enrichment to the Insight.

You configure enrichments in the server’s configuration file. The key settings are the entity type to run the enrichment on, and the command and command arguments to run on. 

The Insight Enrichment Server periodically polls CSE for new Insights. If an Insight’s entity is of the same type as the `entity_type` specified for an enrichment configured in the server’s configuration file, the server runs the enrichment for the entity instance in the Insight. You can see an enrichment that has been added to an Insight on the **Enrichments** tab for an Insight.  

The enrichment shown below returned the IP address associated with the hostname that is the entity for the Insight.

![enrichment-1a.png](/img/cse/enrichment-1a.png)

## Create configuration file

Before installing the server, create a configuration file named `config.ini`—options should be configured in this file before you install the server. See the [Example configuration](#example-configuration-file) file later in this topic. Refer to the [Configuration](#configuration) section for information about configuration options. 

## Install Insight Enrichment Server 

Follow the instructons for the deployment in which you're installing the Insight Enrichment Server.

<Tabs
  groupId="nonfed-fed"
  defaultValue="nonfed"
  values={[
    {label: 'Non-FedRAMP', value: 'nonfed'},
    {label: 'FedRAMP', value: 'fed'},
  ]}>

<TabItem value="nonfed">

If you're not installing the Insight Enrichment Server on the fed deploment, follow these instructions:

**Prerequisites**

The CSE Insight Enrichment Server can be installed on any Windows system with a Vista+ or Server 2008 or newer operating system. It does not have significant RAM or CPU requirements so it should be fine running on almost any hardware.   

You must have local administrative privileges to install the Insight Enrichment Server. By default, the server runs under the LocalService account on the machine. If the Insight Enrichment Server needs privileges to perform actions as a different user, see [Run the server under a service account](insight-enrichment-server.md#run-the-server-under-a-service-account), below.

The installation process requires a valid configuration file before the installation is started. 

**Installation Process**

The Insight Enrichment Server is packaged with an interactive installer. You’ll be prompted to supply the following configuration options when you run the installer.

* Installation Directory. By default, the Insight Enrichment Server will be installed in `C:\Windows\SumoLogic\EnrichmentServer`. Sumo Logic recommends that you accept this default.     
* Enrichment Service Credentials. If you need to run the server under a user with different privileges than the LocalService, provide them when prompted. See [Run the server under a service account](#run-the-server-under-a-service-account) below for account requirements.    
* Configuration File. The installer prompts you to provide the location of a configuration file with an .ini extension. The file must be a valid configuration file with required configuration options. For an example, see [Example configuration file](#example-configuration-file). The file will be copied to `C:\Windows\SumoLogic\EnrichmentServer` on your local machine.

**Run the server under a service account**

At installation time, you can configure the Insight Enrichment Server to run under a different user (service) account. To do so, you provide the username and password of the preferred service account. That account must have the "Log in as Service" privilege. The installer will verify that the account has the appropriate permissions. 

**Install the Insight Enrichment Server** 

Download the binary from [here](https://script-collection.s3.amazonaws.com/caravel/windows-enrichment-server-installer.exe). The checksum for the binary is [here](https://script-collection.s3.amazonaws.com/caravel/checksum.txt).

Run the installer and follow the instructions. 

</TabItem>
<TabItem value="fed">

Follow these instructions to install the Insight Enrichment Server on the fed deployment.

### Prerequisites

The FedRamp version of the Insight Enrichment Server requires Windows Server 2019 or later with JRE 11 or later.

The Insight Enrichment Server might run on earlier Windows versions, such as Windows 2016 or Windows 10, but it has not been tested in those environments. 

### Installation process 

The Insight Enrichment Server is packaged with an interactive installer. You’ll be prompted to supply the following configuration options when you run the installer.

* **Installation Directory**. By default, the Insight Enrichment Server will be installed in `C:\Windows\SumoLogic\EnrichmentServer`. Sumo Logic recommends that you accept this default. 
* **Configuration File**. The installer prompts you to provide the location of a configuration file with an .ini extension. The file must be a valid configuration file with the required configuration options. The configuration file will be copied to `C:\Windows\SumoLogic\EnrichmentServer` on your local machine.

### Step 1: Set up Java and environment variables

You can skip this step if you already have Java 11 or later installed.

1. Download any Java 11 or later, for Windows, from [here](https://jdk.java.net/archive/).
2. Extract the zip file to `C:\Program Files\Java`.
3. Right-click the **Start** button and select **Search** to open the Windows search box. 
4. Enter “advanced system settings” in the search box, and click **View advanced system settings**. 
   <img src={useBaseUrl('img/cse/search-1.png')} alt="search" />
5. Select the **Advanced** tab and click **Environment Variables**.
   <img src={useBaseUrl('img/cse/system-properties.png')} alt="search" />
6. In the **Environment Variables** popup, click **New** under the list of system variables.
    <img src={useBaseUrl('img/cse/environment-variables.png')} alt="search" />   
7. In the **New System Variable** popup:
    1. **Variable name**. Enter <br/>
    _JAVA_PATH_.
    2. **Variable value**. Enter the path to your JDK folder, for example<br/> 
    _C:\Program Files\Java\jdk-X.X.X_. 
    3. Click** OK**. 
    <img src={useBaseUrl('img/cse/new-system-variable.png')} alt="search" />
8. In the **System variables** area, select **Path**, and click **Edit**. 
   <img src={useBaseUrl('img/cse/edit-path.png')} alt="search" />
9.  On the **Edit environment variable** popup, click **New**. 
    <img src={useBaseUrl('img/cse/new.png')} alt="search" />
10. Add the following path and click **OK**. <br/>
    _%JAVA_HOME%\bin_
    <img src={useBaseUrl('img/cse/java-path.png')} alt="search" />
11. To verify that Java was successfully installed successfully, open a command prompt and run: 
`java --version`

### Step 2: Install the Insight Enrichment Server

Download the installer for Insight Enrichment Server for FedRamp from [here](https://script-collection.s3.amazonaws.com/caravel/fedramp-windows-enrichment-server-installer-v1.0.1.exe).

The checksum for the binary is available [here](https://script-collection.s3.amazonaws.com/caravel/checksum.txt)

Run the installer and follow the instructions. 

</TabItem>
</Tabs>

## Configuration

### General settings

The following parameters control general server behaviors, as opposed to enrichment-specific options.

| Setting | Required? | Description |
|--|--|--|
| `URL` | yes | The URL of your CSE portal, for example, `https://XXXX.sumologic.com` |
| `api_id` | yes | Enter your Sumo Logic Access ID. For more information, see [Manage your access keys on Preferences page](docs/manage/security/access-keys.md#manage-your-access-keys-on-preferences-page). |
| `api_key` | yes | Enter your Sumo Logic Access Key.|
| `log_level` | no | Log level the server should use. The options are:<br/><br/>-`error`. Only display error messages.<br/>-`info`. Display informational messages. This is the recommended value.<br/>-`debug`. Displays debug (or trace) data. Recommended only when debugging.<br/><br/>Default: `info` |
| `poll_interval` | no | How often the Insight Enrichment Server should check for new Insights. You can specify the interval in seconds (s), minutes (m), or hours (h).<br/><br/>Default: 10s |
| post_workers | no | The number of parallel workers (threads) posting enrichment results. Default: 6 |
| enrichment_workers | no | The number of parallel workers (threads) running enrichment tasks. <br/><br/>Default: 12 |
| proxy_url | no | An HTTP proxy URL to use when communicating with the Sumo Logic backend. For example, http://my.proxy.myorg.com:3128 or http://username:password@my.proxy.myorg.com:3128. <br/><br/>Default: No proxy used |

### Enrichment settings

The table below defines the settings you configure for each enrichment. 

Each enrichment should be given its own section in the configuration file. The name of the section (for example `[name]`) corresponds to a given enrichment name as it appears within the UI. Each section must have an `enrichment_type` defined. Currently, the only supported `enrichment_type` is "command". Each enrichment supports the options defined in the table below.  

| Setting | Required? | Description |
|--|--|--|
| `enrichment_type` | yes | Specifies the type of the enrichment. Currently, the only supported value is `command`. |
| `entity_type` | yes | The type of entity to enrich. The Insight Enrichment server supports built-in entity types: IP, mac, username, and hostname. It also supports [custom entity types](../records-signals-entities-insights/create-custom-entity-type.md).  For custom entity types, the `entity_type` should match the unique Identifier assigned to the custom entity type.  |
| `cache_time` | no | The length of time that the results of a specific enrichment for a specific entity will be cached and returned for other enrichment requests for that enrichment and entity.  This setting can be used to prevent an enrichment from running multiple times for the same entity. You can specify `cache_time` in hours (h), minutes (m), or seconds (s). If you specify a value without a unit, the value is treated as nanoseconds. <br/><br/>Default: none |
| `ip_range` | no | When `entity_type` is IP, you can specify a range of IP addresses that the enrichment will be limited to. Specify IP address ranges as a comma-separated list. For example:<br/><br/> 192.168.1.1-192.168.1.255, 192.168.5.1-192.168.8.120 |
| `command_exe` | yes | The executable to run when enriching the entity. |
| `command_args` | yes | The arguments to pass to the executable specified by command_exe when performing the enrichment. Note the value `${IP}` will be replaced by the IP address for IP entities. The value `${HOSTNAME}` will be replaced with the  hostname for hostname entities. The value `${MAC}` will be replaced with the MAC address for MAC entities. The value `${USERNAME}` will be replaced with the username for username entities. `command_args` also supports an `${ENTITY}` replacement value that you can use for custom entity types and any of the built-in entity types. |
| `command_timeout`  | no | A timeout value (in seconds) that will be enforced when running the command.<br/><br/>Default: none |

### Example enrichment

This is an example of an enrichment:

```
[whois]
enrichment_type = command
entity_type = ip
command_exe = whois.exe
command_args = ${IP}
ip_range = 10.10.10.1-10.10.10.4, 192.168.0.0-192.168.255.255
```

If an Insight’s entity is an IP address in one of the ranges specified by `ip_range`, the enrichment will run the command `whois.exe` on that IP address.

## Example configuration file

```
url = https://<>.sumologic.com
api_id = <>
api_key = <>
log_level = info

[nslookupHostname]
enrichment_type = command
entity_type = hostname
command_exe = nslookup.exe
command_args = ${HOSTNAME}
cache_time = 5m

[Logged In Usershostname]
enrichment_type = command
entity_type = hostname
command_exe = powershell.exe
command_args = query user /server:${HOSTNAME}
ip_range = 10.10.10.1-10.10.10.4, 192.168.0.0-192.168.255.255
cache_time = 5m

[Logged In Usersip]
enrichment_type = command
entity_type = ip
command_exe = powershell.exe
command_args = query user /server:${IP}
ip_range = 10.10.10.1-10.10.10.4, 192.168.0.0-192.168.255.255
cache_time = 5m

[nslookupIP]
enrichment_type = command
entity_type = ip
command_exe = nslookup.exe
command_args = ${IP}
cache_time = 5m

[whois]
enrichment_type = command
entity_type = ip
command_exe = whois.exe
command_args = ${IP}
ip_range = 10.10.10.1-10.10.10.4, 192.168.0.0-192.168.255.255

[dsquery]
enrichment_type = command
entity_type = username
command_exe = powershell.exe
command_args = dsquery user -name ${USERNAME}
cache_time = 5m
```

## Passing parameters to Powershell scripts

You can configure the Insight Enrichment Server to pass parameters to a
Powershell script, as shown in the examples below.

### CarbonBlack enrichment

This enrichment queries the Carbon Black Device API for an IP address
and returns host information. 

**Script:  c:\\scripts\\CB.ps1**

```
param([string]$IP)
$uri = "https://api5.conferdeploy.net:443/integrationServices/v3/device?ipAddress=$IP"
$headers = @{'X-Auth-Token' = 'XXX/XXX'}
Invoke-RestMethod -Uri $uri -Method Get -Headers $headers | ConvertTo-Json
```

**Enrichment configuration**

```
[Carbon Black]
enrichment_type = command
entity_type = ip
command_exe = powershell.exe
command_args = -file c:\scripts\cb.ps1 ${IP}
```

**Enrichment in the UI**

![carbon-black.png](/img/cse/carbon-black.png)

### CrowdStrike enrichment

This enrichment queries the CrowdStrike Device API for an IP address and returns host information.

**Prerequisites**

This enrichment requires the PSFalcon PowerShell module, which is available at [https://github.com/bk-cs/PSFalcon](https://github.com/CrowdStrike/psfalcon). To install it:

```
moduleInstall-Module -Name PSFalcon
Update-Module -Name PSFalcon
```

**Script - CS.ps1**

```
param([string]$IP)
Get-CsToken -Id "<>" -Secret "<>"
Get-CsHostId -Filter "local_ip:'$IP'" -OutVariable HostId | ConvertTo-Json *>$null
(Get-CsHostInfo -Id $HostId.resources).resources
```

**Enrichment configuration**

```
[CrowdStrike]
enrichment_type = command
entity_type = ip
command_exe = powershell.exe
command_args = -file c:\Windows\SumoLogic\EnrichmentService\CS.ps1 ${IP}
ip_range = 192.168.38.104-192.168.38.105
```

**Enrichment in the UI**

![crowdstrike.png](/img/cse/crowdstrike.png)

### GreyNoise enrichment

GreyNoise helps security teams reduce noise and prioritize signal-targeted attacks against their organization. This enrichment queries GreyNoise to see what it knows about the IP address.

**Script - c:\\scripts\\GreyNoise.ps1**

```
param([string]$IP)
$uri = "https://api.greynoise.io/v2/noise/context/$IP"
$headers = @{
    'Accept' = 'application/json'
    'key' = 'key'
}
Invoke-RestMethod -Uri $uri -Method Get -Headers $headers
```

**Enrichment configuration**  

```
[whois]
enrichment_type = command
entity_type = ip
command_exe = powershell.exe
command_args = -file c:\scripts\GreyNoise.ps1 ${IP}
```

### SentinelOne enrichment

The SentinelOne enrichment queries IP addresses or hostnames using the SentinelOne API and returns the information SentinelOne knows about the host.

1. In the PowerShell scripts below, replace “usea1-partners” with your portal.
1. In the PowerShell scripts below, replace “<\>” with your SentinelOne API key
1. Copy the PowerShell scripts to `c:\Windows\Jask\EnrichmentService\`.
    :::note
    Depending on your version of the enrichment server, the directory location may be different.
    :::
1. Add the lines below to your `config.ini` file.
    :::note
    The path that follows `command_args -file` must be the directory where you put the PowerShell scripts. Edit the path as necessary.
    :::
    ```
    [s1ip]
    enrichment_type = command
    entity_type = ip
    command_exe = powershell.exe
    command_args = -file c:\Windows\Jask\EnrichmentService\s1ip.ps1 ${IP}
    [s1hostname]
    enrichment_type = command
    entity_type = hostname
    command_exe = powershell.exe
    command_args = -file c:\Windows\Jask\EnrichmentService\S1hostname.ps1 ${HOSTNAME}
    ```
1. Restart the enrichment server.

**Powershell Scripts**

**S1hostname.ps1**
```
param([string]$HOSTNAME)
$uri = "https://usea1-partners.sentinelone.net/web/api/v2.1/agents?computerName=$HOSTNAME"
$headers = @{'Authorization' = 'ApiToken <>'}
Invoke-RestMethod -Uri $uri -Method Get -Headers $headers | ConvertTo-Json
```

**s1ip.ps1**
```
param([string]$IP)
$uri = "https://usea1-partners.sentinelone.net/web/api/v2.1/agents?networkInterfaceInet__contains=$IP"
$headers = @{'Authorization' = 'ApiToken <>'}
Invoke-RestMethod -Uri $uri -Method Get -Headers $headers | ConvertTo-Json
```

**Sample enrichment**
![sentinel-enrichment.png](/img/cse/sentinel-enrichment.png)

---
id: user-properties
title: user.properties
description: The user.properties file is used to pass Collector parameters for some installation methods.
---

For collector versions 19.137 and later, the `user.properties` file lets you pass configuration parameters during the installation of a new unregistered Collector. Once the collector is registered, to see if a parameter can be changed with a collector restart, check the **Can be changed after installation?** column of the table in [user.properties parameters](#userproperties) below.

When using the shell script (command line) installer, you must pass configuration parameters via command-line arguments or a varfile, and the installer will create a `user.properties` file during installation. See [Parameters for the Command Line Installer](parameters-command-line-installer.md) for more information.

:::note
Starting with collector 19.170+, the installation directory is secured to users belonging to the `sumologic_collector` group. Modifying `user.properties` may require sudo privileges. For more information, see [Enhanced File System Security for Installed Collectors](enhanced-file-system-security-installed-collectors.md).
:::

## Creating user.properties

After downloading the collector binary package (e.g., tarball), create the `user.properties` file in a specific directory.

To create `user.properties` manually:

1. Use a text editor (or any similar program) to create a new file.
1. Add required parameters and any desired optional parameters listed in [user.properties parameters](#userproperties) below. Parameters are case sensitive.
1. Save the file to `CollectorInstallationDirectory/config/user.properties`.

:::important
Be sure to save the `user.properties` file in UTF-8 format. If you use a script to create a `user.properties` file, note that some scripting utilities, such as PowerShell, default to ANSI—if you use such a tool, make sure that the file is saved in UTF-8 format.
:::

### Default Collector installation location

The default collector installation locations are:

Linux:  
* `/opt/SumoCollector/`  
* `/usr/local/SumoCollector`

Windows:  
* `:\Program Files (x86)\Sumo Logic Collector`  
* `:\Program Files\Sumo Logic Collector`

## user.properties examples

The example below sets the Access ID and Access Key. When installing a binary package, you must specify the command to run the JRE, or the JRE path if it does not exist on your `$PATH`:

```
name = My Collector
accessid = accessId
accesskey = accessKey
wrapper.java.command = java
```

The example below sets the Access ID and Access Key, proxy settings, and
a custom JRE.

```
name = My Collector
accessid = accessId
accesskey = accessKey
proxyHost = 10.0.0.8
proxyPort = 3128
wrapper.java.command = /opt/java_1.7/bin/java
wrapper.java.maxmemory = 2048
```

## user.properties parameters

The following table lists all of the parameters available in the `user.properties` file.

:::note
Parameters are case sensitive.
:::

| Parameter | Description | Examples |
|:--|:--|:--|
| `wrapper.java.command=JRE Bin Location` | Sets the JRE binary to use when starting the collector. | Use the default system Java version:<br/>`wrapper.java.command=java`<br/>Use a specific JRE installation (Linux):<br/>`wrapper.java.command=/opt/java_1.7/bin/java`<br/>Use a specific JRE installation (Windows):<br/>`wrapper.java.command=C:\\Program Files (x86)\\Java\\jre7\\bin` |

Key-value parameters (**key=value**). Add as needed.

| Parameter | Description | Can be changed after installation? |
|:--|:--|:--|
| `accessid=accessId` | Sets Access ID used when logging in with Access ID and Key. | No |
| `accesskey=accessKey` | Sets Access Key used when logging in with Access ID and Key.<br/>Note that, as of Collector v19.182-17, `accesskey` is automatically removed from `user.properties` following successful installation. (This behavior can be disabled with the `skipAccessKeyRemoval` property, described below.)<br/>If you configure a collector to be ephemeral, in the event that the collector is de-registered after 12 hours offline, you will need to re-add the `accesskey` to `user.properties`. | No |
| `category=category`<br/>Available on Collector version 19.182+. | Source category to use when a source does not specify a category. | No, use the [Collector Management API](/docs/api/collector-management) to modify. |
| `clobber=true/false` | When true, if there is any existing collector with the same name, that collector will be deleted (clobbered). See Forcing a Collector's Name with Clobber for more information. | No, use the [Collector Management API](/docs/api/collector-management) to modify. |
| `description=description`<br/>Available on Collector version 19.182+. | Description for the collector to appear in Sumo Logic. | No, use the [Collector Management API](/docs/api/collector-management) to modify. |
| `disableActionSource=true/false`<br/>Deprecated on Collector version 19.245-4. Use `enableActionSource` instead. | If your organization's internal policies restrict the use of Script Actions, you can disable them by setting this parameter to `true`. | Yes, with Collector restart. |
| `disableScriptSource=true/false`<br/>Deprecated on Collector version 19.245-4. Use enableScriptSource instead. | If your organization's internal policies restrict the use of Script Sources, you can disable them by setting this parameter to `true`. | Yes, with Collector restart |
| `disableUpgrade=true/false` | If true, the collector rejects upgrade requests from Sumo. | Yes, with Collector restart. |
| `enableActionSource=true/false`<br/>Available on Collector version 19.245-4+. | Script Action Sources are disabled by default. You can enable them by setting this parameter to `true`. | Yes, with Collector restart. |
| `enableScriptSource=true/false`<br/>Available on Collector version 19.245-4+. | Script Sources are disabled by default. You can enable them by setting this parameter to `true`. | Yes, with Collector restart. |
| `ephemeral=true/false` | When true, the collector will be deleted after 12 hours of inactivity. For more information, see [Setting a Collector as Ephemeral](set-collector-as-ephemeral.md).<br/>Note that after the collector is de-registered after 12 hours of inactivity, you must update `user.properties` to add the accesskey property. As noted above, in the `accesskey` row, Sumo removes `accesskey` from `user.properties` when the Collector successfully registers with Sumo (unless that behavior has been disabled with the `skipAccessKeyRemoval` property, described below). | No, use the [Collector Management API](/docs/api/collector-management) to modify. |
| `fields=[list of fields]` | Comma-separated list of key=value [fields](/docs/manage/fields.md) (metadata) to apply to the Collector.<br/>To assign an [Ingest Budget](/docs/manage/ingestion-volume/ingest-budgets) to the Collector use the field _budget with the Field Value of the Ingest Budget to assign. For example, if you have a budget with a Field Value of Dev_20GB, you would add:<br/>`fields=_budget=Dev_20GB` | No, use the [Collector Management API](/docs/api/collector-management) to modify. |
| `fipsJce=true/false`<br/>Available on Collector version 19.253-3+ | Informs you if FIPS 140-2 compliant Java Cryptography Extension (JCE) is enabled. This option is only supported in specific deployments, ask your Sumo account representative for details. | No, requires a new installation. |
| `hostName=hostname`<br/>Available on Collector version 19.182+. | The host name of the machine on which the collector is running. The host name can be a maximum of 128 characters. | No, use the [Collector Management API](/docs/api/collector-management) to modify. |
| `name=name` | Sets the name of collector used on Sumo Logic. The name can be a maximum of 128 characters.<br/>If no name is provided and the hostname is unresolved the default name is `Collector`.<br/>If you are installing a collector that would have the same name as an existing collector, the system automatically appends a 13-digit unix timestamp to the collector name. | No, use [Edit the Collector](/docs/send-data/collection/edit-collector.md) or the [Collector Management API](/docs/api/collector-management#Collector-API-Methods-and-Examples) to modify |
| `proxyHost=host` | Sets proxy host when a proxy server is used. | Yes, with Collector restart. |
| `proxyNtlmDomain=NTLM domain` | Sets proxy NTLM domain when a proxy server is used with NTLM authentication. | Yes, with Collector restart. |
| `proxyPassword=password` | Sets proxy password when a proxy server is used with authentication. | Yes, with Collector restart. |
| `proxyPort=port` | Sets proxy port when a proxy server is used. | Yes, with Collector restart. |
| `proxyUser=username` | Sets proxy user when a proxy server is used with authentication. | Yes, with Collector restart. |
| `skipAccessKeyRemoval=true/false` | If true, it will skip the access key removal from the user.properties file. | No |
| `sources=absolute filepath or folderpath` | Specifies a single UTF-8 encoded JSON file, or a folder containing UTF-8 encoded JSON files, that defines the Sources to configure upon Collector registration. The contents of the file or files are read upon Collector registration only, it is not synchronized with the Collector's configuration on an on-going basis.<br/>The file must have a .json extension.<br/>On Windows, the path value must be specified with double slashes, \\, for example:<br/>`sources=c:\\sumo\\sources.json` | No |
| `syncSources=absolute filepath or folderpath` | Specifies either a single UTF-8 encoded JSON file, or a folder containing UTF-8 encoded JSON files, that define the Sources to configure upon Collector registration. The Source definitions will be continuously monitored and synchronized with the Collector's configuration.<br/>On Windows, the path value must be specified with double slashes, \\.<br/>The file must have a .json extension.<br/>For more information, see [Local Configuration File Management](/docs/send-data/use-json-configure-sources/local-configuration-file-management). | Yes, with Collector restart. |
| `targetCPU=target`<br/>Available on Collector version 19.182+. | You can choose to set a CPU target to limit the amount of CPU processing a collector uses. The value must be expressed as a whole number percentage. For example:<br/>`targetCPU=20`<br/>The collector will adjust resources to attempt to limit the CPU usage to at most 20%. For more information, see [Set the Collector CPU Usage Target](/docs/send-data/collection/set-collector-cpu-usage-target.md). | No, use the [Collector Management API](/docs/api/collector-management) to modify. |
| `timeZone=timezone`<br/>Available on Collector version 19.182+. | The time zone to use when it is not extracted from the log timestamp. For example:<br/>`timeZone=America/Los_Angeles`<br/>For a list of possible values, refer to the "TZ" column in [this Wikipedia article](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). | No, use the [Collector Management API](/docs/api/collector-management) to modify. |
| `token=token` | Either an [Installation Token](/docs/manage/security/installation-tokens.md) or Setup Wizard Token.<br/>This is not the encoded Token+URL. It is the decoded token only. [See how to decode the token](/docs/manage/security/installation-tokens/#userproperties). | No |
| `url=collection endpoint` | Sets the [collection endpoint](/docs/api/troubleshooting#Deployments-and-Sumo-Logic-Endpoints) URL used to register the Collector. For example, if your account is in the US2 deployment:<br/>`url=https://collectors.us2.sumologic.com` | Yes, with Collector restart. |

##  (Optional) JVM or wrapper configuration parameters

To set JVM or wrapper configuration parameters, collectors installed prior to version 19.137 must add the following line to `wrapper.conf`, located in the collector's `config` folder.

```
#include ./config/user.properties
```

:::important
Collector versions 19.253-26+ support wrapper configuration parameters with command line installations.
:::

| Parameter | Description | Can be changed after installation? |
|:--|:--|:--|
| `wrapper.java.command=JRE Bin Location` | Sets the JRE binary to use when starting the collector. Examples:<br/>Use the default system Java version:<br/>`wrapper.java.command=java`<br/>Use a specific JRE installation (Linux):<br/>`wrapper.java.command=/opt/java_1.7/bin/java`<br/>Use a specific JRE installation (Windows):<br/>`wrapper.java.command=C:\\Program Files (x86)\\Java\\jre7\\bin` | Yes, with Collector restart. |
| `wrapper.java.initmemory=size` | Sets the initial java heap size, in MB.<br/>Default: 64 | Yes, with Collector restart. |
| `wrapper.java.maxmemory=size` | Sets the maximum java heap size, in MB.<br/>Default: 128 | Yes, with Collector restart. |

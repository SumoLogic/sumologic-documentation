---
id: user-properties
title: user.properties
description: The user.properties file is used to pass Collector parameters for some installation methods.
---

For collector versions 19.137 and later, the `user.properties` file lets you pass configuration parameters during the installation of a new unregistered Collector. Once the collector is registered, to see if a parameter can be changed with a collector restart, check the **Can be changed after installation?** column of the table in [user.properties parameters](#userproperties) below.

When using the shell script (command line) installer, you'll need to pass configuration parameters via command-line arguments or a varfile, and the installer will create a `user.properties` file during installation. See [Parameters for the Command Line Installer](parameters-command-line-installer.md) for more information.

:::note
Effective with collector version 19.170+, the installation directory is secured to users belonging to the `sumologic_collector` group. Modifying `user.properties` may require sudo privileges. For more information, see [Enhanced File System Security for Installed Collectors](enhanced-file-system-security-installed-collectors.md).
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

### Default Collector installation locations

The default collector installation locations are:

Linux: 
* `/opt/SumoCollector/` 
* `/usr/local/SumoCollector`

Windows: 
* `:\Program Files (x86)\Sumo Logic Collector` 
* `:\Program Files\Sumo Logic Collector`

## user.properties examples

The example below sets the access ID and access key. When installing a binary package, you must specify the command to run the JRE, or the JRE path if it does not exist on your `$PATH`:

```
name = My Collector
accessid = accessId
accesskey = accessKey
wrapper.java.command = java
```

The example below sets the access ID and access key, proxy settings, and a custom JRE.

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

### `wrapper.java.command=<JRE bin location>`

Sets the JRE binary to use when starting the collector.

* Use the default system Java version: `wrapper.java.command=java`
* Use a specific JRE installation (Linux): `wrapper.java.command=/opt/java_1.7/bin/java`
* Use a specific JRE installation (Windows): `wrapper.java.command=C:\\Program Files (x86)\\Java\\jre7\\bin`

### `accessid=<accessId>`

Sets access ID used when logging in with access ID and key. Cannot be modified after installation.

### `accesskey=<accessKey>`

Sets access key used when logging in with access ID and Key. Note that, as of Collector v19.182-17, `accesskey` is automatically removed from `user.properties` following successful installation. (This behavior can be disabled with the `skipAccessKeyRemoval` property, described below.) If you configure a collector to be ephemeral, in the event that the collector is de-registered after 12 hours offline, you will need to re-add the `accesskey` to `user.properties`. Cannot be modified after installation.

### `category=<category>`

Available on Collector version 19.182+. Source category to use when a source does not specify a category. Cannot be modified after installation; use the [Collector Management API](/docs/api/collector-management) to modify. 

### `clobber=<true|false>`

When `true`, if there is any existing collector with the same name, that collector will be deleted (clobbered). See [Forcing a Collector's Name with Clobber](/docs/send-data/opentelemetry-collector/data-source-configurations/additional-configurations-reference) for more information. Cannot be modified after installation; use the [Collector Management API](/docs/api/collector-management) to modify. 

### `description=<description>`

Description for the collector to appear in Sumo Logic. Cannot be modified after installation; use the [Collector Management API](/docs/api/collector-management) to modify. 

:::note
Available on Collector version 19.182+. 
:::

### `disableActionSource=<true|false>`

If your organization's internal policies restrict the use of Script Actions, you can disable them by setting this parameter to `true`. Can be modified after installation with Collector restart. 

:::note
Deprecated on Collector version 19.245-4. Use `enableActionSource` instead. 
:::

### `disableScriptSource=<true|false>`

If your organization's internal policies restrict the use of Script Sources, you can disable them by setting this parameter to `true`. Can be modified after installation with Collector restart. 

:::note
Deprecated on Collector version 19.245-4. Use `enableScriptSource` instead. 
:::

### `disableUpgrade=<true|false>`

If true, the collector rejects upgrade requests from Sumo. Can be modified after installation with Collector restart.

### `enableActionSource=<true|false>`

Script Action Sources are disabled by default. You can enable them by setting this parameter to `true`. Can be modified after installation with Collector restart.

:::note
Available on Collector version 19.245-4+. 
:::

### `enableScriptSource=<true|false>`

Script Sources are disabled by default. You can enable them by setting this parameter to `true`. Can be modified after installation with Collector restart.

:::note
Available on Collector version 19.245-4+. 
:::

### `ephemeral=<true|false>`

When `true`, the collector will be deleted after 12 hours of inactivity. For more information, see [Setting a Collector as Ephemeral](set-collector-as-ephemeral.md). Note that after the collector is de-registered after 12 hours of inactivity, you must update `user.properties` to add the accesskey property. As noted above, in the `accesskey` row, Sumo Logic removes `accesskey` from `user.properties` when the Collector successfully registers with Sumo Logic (unless that behavior has been disabled with the `skipAccessKeyRemoval` property, described below). Cannot be modified after installation; use the [Collector Management API](/docs/api/collector-management) to modify. 

### `fields=<list of fields>`

Comma-separated list of key=value [fields](/docs/manage/fields) (metadata) to apply to the Collector. To assign an [Ingest Budget](/docs/manage/ingestion-volume/ingest-budgets) to the Collector use the field _budget with the Field Value of the Ingest Budget to assign. For example, if you have a budget with a Field Value of Dev_20GB, you would add: `fields=_budget=Dev_20GB`.

Cannot be modified after installation; use the [Collector Management API](/docs/api/collector-management) to modify.

### `fipsJce=<true|false>`

Informs you if FIPS 140-2 compliant Java Cryptography Extension (JCE) is enabled. This option is only supported in specific deployments, ask your Sumo account representative for details. Cannot be modified after installation. 

:::note
Available on Collector version 19.253-3+. 
:::

### `hostName=<hostname>`

The host name of the machine on which the collector is running. The host name can be a maximum of 128 characters. Cannot be modified after installation; use the [Collector Management API](/docs/api/collector-management) to modify. Available on Collector version 19.182+. 

### `name=<name>`

Sets the name of collector used on Sumo Logic. The name can be a maximum of 128 characters. If no name is provided and the hostname is unresolved the default name is `Collector`. If you are installing a collector that would have the same name as an existing collector, the system automatically appends a 13-digit unix timestamp to the collector name. Cannot be modified after installation. Use [Edit the Collector](/docs/send-data/collection/edit-collector.md) or the [Collector Management API](/docs/api/collector-management/collector-api-methods-examples) to modify. 

### `proxyHost=host`

Sets proxy host when a proxy server is used. Can be modified after installation with Collector restart. 

### `proxyNtlmDomain=<NTLM domain>`

Sets proxy NTLM domain when a proxy server is used with NTLM authentication. Can be modified after installation with Collector restart. 

### `proxyPassword=<password>`

Sets proxy password when a proxy server is used with authentication. Can be modified after installation with Collector restart. 

### `proxyPort=<port>`

Sets proxy port when a proxy server is used. Can be modified after installation with Collector restart. 

### `proxyUser=<username>`

Sets proxy user when a proxy server is used with authentication. Can be modified after installation with Collector restart.

### `skipAccessKeyRemoval=<true|false>`

If `true`, it will skip the access key removal from the user.properties file. Cannot be modified after installation.

### `sources=absolute filepath or folderpath`

Specifies a single UTF-8 encoded JSON file, or a folder containing UTF-8 encoded JSON files, that defines the Sources to configure upon Collector registration. The contents of the file or files are read upon Collector registration only, it is not synchronized with the Collector's configuration on an on-going basis. The file must have a .json extension. On Windows, the path value must be specified with double slashes (`\\`). For example: `sources=c:\\sumo\\sources.json`. Cannot be modified after installation.

### `syncSources=<absolute filepath or folderpath>`

Specifies either a single UTF-8 encoded JSON file, or a folder containing UTF-8 encoded JSON files, that define the Sources to configure upon Collector registration. The Source definitions will be continuously monitored and synchronized with the Collector's configuration. On Windows, the path value must be specified with double slashes (`\\`). The file must have a .json extension. For more information, see [Local Configuration File Management](/docs/send-data/use-json-configure-sources/local-configuration-file-management). Can be modified after installation with Collector restart.

### `targetCPU=<target>`

You can choose to set a CPU target to limit the amount of CPU processing a collector uses. The value must be expressed as a whole number percentage. For example: `targetCPU=20`. The collector will adjust resources to attempt to limit the CPU usage to at most 20%. For more information, see [Set the Collector CPU Usage Target](/docs/send-data/collection/set-collector-cpu-usage-target.md). Cannot be modified after installation; use the [Collector Management API](/docs/api/collector-management) to modify. 

:::note
Available on Collector version 19.182+. 
:::

### `timeZone=<timezone>`

The time zone to use when it is not extracted from the log timestamp. For example: `timeZone=<timezone>` For a list of possible values, refer to the "TZ" column in [this Wikipedia article](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Example: `timeZone=America/Los_Angeles`. Cannot be modified after installation; use the [Collector Management API](/docs/api/collector-management) to modify. 

:::note
Available on Collector version 19.182+.
:::

### `token=<token>`

An [Installation Token](/docs/manage/security/installation-tokens.md). This is not the encoded Token+URL. It is the decoded token only. [See how to decode the token](/docs/manage/security/installation-tokens/#userproperties). Cannot be modified after installation.

### `url=<collection endpoint>`

Sets the [collection endpoint](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) URL used to register the Collector. For example, if your account is in the US2 deployment: `url=https://collectors.us2.sumologic.com`. Can be modified after installation with Collector restart. 

## (Optional) JVM or wrapper configuration parameters

To set JVM or wrapper configuration parameters, collectors installed prior to version 19.137 must add the following line to `wrapper.conf`, located in the collector's `config` folder.

```
#include ./config/user.properties
```

:::note
Collector versions 19.253-26+ support wrapper configuration parameters with command line installations.
:::


### `wrapper.java.command=<JRE bin location>`

Sets the JRE binary to use when starting the collector. Examples:
* Use the default system Java version: `wrapper.java.command=java`
* Use a specific JRE installation (Linux): `wrapper.java.command=/opt/java_1.7/bin/java`
* Use a specific JRE installation (Windows): `wrapper.java.command=C:\\Program Files (x86)\\Java\\jre7\\bin`

Can be modified after installation with Collector restart. 

### `wrapper.java.initmemory=<size>`

Sets the initial java heap size, in MB. Default: 64. Can be modified after installation with Collector restart.

### `wrapper.java.maxmemory=<size>`

Sets the maximum java heap size, in MB. Default: 128. Can be modified after installation with Collector restart. 
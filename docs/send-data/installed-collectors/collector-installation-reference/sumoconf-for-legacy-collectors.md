---
id: sumoconf-for-legacy-collectors
title: sumo.conf for Legacy Collectors
description: This file passes Collector configuration parameters during installation if the Debian or RPM option is used.
---



For legacy Collectors (releases prior to 19.137), the `sumo.conf` file allows you to pass Collector configuration parameters to Sumo during installation.

To authenticate Collectors, you must include an access ID and access key. See [Access Keys](/docs/manage/security/access-keys.md for information on generating and managing access keys.

## Creating sumo.conf

After downloading the Collector installer, you'll create the `sumo.conf` file in a specific directory.

To create sumo.conf:

1. Using a text editor (or any similar program) create a new file.
1. Add all of the required parameters and any optional parameters listed in the table in this topic.
1. Save the file in UTF-8 encoding to `/etc/sumo.conf` (Mac or Linux) or `C:\\sumo\\sumo.conf` (Windows).

:::note
Some scripting utilities, such as PowerShell, default to ANSI. Make sure that the file is saved in UTF-8 encoding.
:::

:::tip
You can comment out lines in sumo.conf, use the `#` character at the beginning of line.
:::

## sumo.conf parameters

The following parameters can be passed to Sumo Logic using `sumo.conf`.

You cannot have blank values, like `name=` .

| Parameter | Description | Example | Required/Optional |
|:--|:--|:--|:--|
| `name` | Name used to register the Collector. If no name is specified, the hostname is used. The hostname can be a maximum of 128 characters. | `name=FirewallLogs` | Optional |
| `accessid` | Access ID generated in the Security page. See [Access Keys](/docs/manage/security/access-keys.md) | `accessid=MboxeezMzN8S` | Required |
| `accesskey` | Access ID generated in the Security page. See [Access Keys](/docs/manage/security/access-keys.md) | `accesskey=dBorwTn8TxF8ofounEXnsQ4hPpuqCzw` | Required |
| `sources` | Path to JSON file that contains Source configuration. See [JSON Source Configuration](/docs/send-data/use-json-configure-sources).<br/>**Important:** On Windows the path value for "sources=" must be specified with double slashes, \\, as shown in the example. | `sources=c:\\sumo sources.json (Windows)` | Optional |
| override | Overrides a Collector's existing Sources to delete all Sources except for the one specified by the sources parameter (above).<br/>**Important:** Don't include this parameter in sumo.conf unless necessary. Override results in Source deletion and re-creation with collector restart, and causes significant re-ingestion of already ingested data.  | `override=true` | Optional |
| `ephemeral` | When set to true, the Collector will be deleted after 12 hours of inactivity. See [Setting a Collector as Ephemeral](set-collector-as-ephemeral.md) for more information. | `ephemeral=true` | Optional |
| `clobber` | Sets the clobber flag; don't include unless you'd like to clobber the Collector.  See [Forcing a Collector's Name with Clobber](force-collectors-name-clobber.md) for more information. | `clobber=true` | Optional |
| `proxyHost` | Sets the host the Collector uses to connect via a proxy. | `proxyHost=hostName` | Optional |
| `proxyPort` | The port number a Collector uses to connect via a proxy.  | `proxyPort=portNumber` | Optional |
| `proxyUser` | The user name a Collector uses to connect via a proxy.  | `proxyUser=userName` | Optional |
| `proxyPassword` | The password associated with the proxyUser setting.  | `proxyPassword=password` | Optional |
| `proxyNtlmDomain` | When using an NTML proxy, the URL used to connect. | `proxyNtlmDomain=sumoexchange.com` | Optional |
| `syncSources` | When using the Local File Configuration management method, provides the file path and the name of the JSON file that contains all Source information for the Collector. | syncSources=[file path]/sources.json | Optional |
| `url=[url]` | Sets URL used to register Collector for data collection API. | `url=https://collectors.eu.sumologic.com` | Optional |

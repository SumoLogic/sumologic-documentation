---
id: new-collectors-and-sources
title: Local Configuration File Management for New Collectors and Sources
sidebar_label: For New Collectors and Sources
description: Local Configuration File Management is a straightforward way to get started in your deployment.
---


With local configuration file management, you cannot use the API or the web app for Source configuration. In the web app, the **Add Source** option is disabled on the **Manage Data** > **Collection** > **Collection** page.

## Step 1. Determine the Sources you need

Depending on the data you’re planning to upload to Sumo Logic, there are several Sources you can configure. For details, see [Sources](/docs/send-data/choose-collector-source).

## Step 2. Build the Source JSON configuration file(s)

The JSON configuration file allows you to define Sources for collection. For JSON configuration details, see [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources). 

If you have an existing Collector with Sources of the same types that you are about to configure, you can obtain their JSON configuration from the Sumo web app, as described in Step 1 of [Local Configuration File Management for Existing Collectors and Sources](/docs/send-data/use-json-configure-sources/local-configuration-file-management), and use that JSON as a starting point for creating Source configurations.

There are two ways to implement local configuration file management:

 * Specify all Sources in a single UTF-8 encoded JSON file following [RFC 8259](https://tools.ietf.org/html/rfc8259). For more information, see [Define one Source in a JSON file](/docs/send-data/use-json-configure-sources/local-configuration-file-management).
 * Use multiple UTF-8 encoded JSON files to specify your Sources, and put all of those files in a single folder. You can put each Source definition in its own file, or define multiple Sources per file, if you like. For more information, see [Define Multiple Sources in a JSON File](/docs/send-data/use-json-configure-sources/local-configuration-file-management).

## Step 3. Install Collector with syncSources parameter

When installing the Collector, specify the `syncSources` parameter. See the topics in [Installed Collectors](/docs/send-data/installed-collectors/sources) for information on specifying parameters during installation.

| Parameter | Type | Description |
|:--|:--|:--|
| syncSources   | String   | Sets the JSON file describing sources to configure on registration, which will be continuously monitored and synchronized with the Collector's configuration. |

For example, for command-line installation, supplying the Access ID and
Access Key, `syncSources`, and the Collector name:

`sudo ./SumoCollector.sh -q -Vsumo.accessid\<accessI\> -Vsumo.accesskey\<accessKe\> -VsyncSources\<filepat\> -Vcollector.name\<name\>`

For Collector versions prior to 19.137 add the `syncSources` parameter to the [**sumo.conf**](/docs/send-data/installed-collectors/collector-installation-reference/sumoconf-for-legacy-collectors.md) file before starting the Collector for the first time.

## Making changes to the configuration files

After a Collector is registered with the `syncSources` parameter, you can edit the Source JSON file(s) at any time to modify Source attributes and add new Sources. To remove an existing Source, delete the associated JSON object; if the Source you want to remove is the only Source defined in a JSON file, delete the file.  

After you finalize changes to a JSON configuration file(s), test the changes with a Collector on a host that is NOT in production. After the file is validated, deploy it to each host with Sources whose JSON configuration you want to update. Collectors continually watch the JSON configuration files for changes and immediately process any changes. 

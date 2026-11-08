---
slug: /send-data/use-json-configure-sources/local-configuration-file-management
title: Local Configuration File Management
description: With Local Configuration File Management, you can set up and manage sources on an installed collector using one or more JSON files.
---

With local configuration file management, you can configure sources for an installed collector in one or more UTF-8 encoded JSON files.

After you switch over to local configuration file management, you can no longer manage sources through the Sumo Logic web application or the Collector Management API. In the Sumo Logic web application, the **Add Source** option is disabled on the **Collection** page.

:::note
Local configuration file management is available on collector version v19.108 and later.
:::

## Benefits of local configuration file management

If you’re an experienced admin, local configuration file management is a quick way to set up or edit sources across your deployment.

* You do not need to log in to the Sumo Logic web app or use API calls. Instead, you edit the JSON configuration file(s), and they are read almost immediately by the collector.
* If you have a large scale deployment, it can be impractical to add or edit sources one at a time. Using local configuration management allows you to manage sources more easily.
* You can use deployment tools so that established policies for deployments are not interrupted.

### Options for specifying Sources in local configuration file(s) 

There are two ways to implement local configuration file management:

* Specify all sources in a single UTF-8 encoded JSON file. 
* Use multiple UTF-8 encoded JSON files to specify your sources, and put all of those files in a single folder. You can put each source definition in its own file, or define multiple sources per file if you like. 

Each JSON file must have a `.json` extension, for example: `source1.json`

For example JSON configurations, see [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources). The topic includes a table of common parameters that apply to all source types and links to the topics that describe the parameters for specific source types.

The configuration files remain on the collector and are checked nearly constantly for any changes.

:::note
Before deploying your configuration to production collectors, check it out in a test environment. Errors in the JSON can cause problems, including deletion of sources.
:::

## Define one Source in a JSON file

 This is an example of a JSON file that defines a single source.

```json
{
  "api.version":"v1",
  "source":{
     "sourceType":"LocalFile",
     "name":"Example1",
     "pathExpression":"/var/logs/maillog"
  }
}
```

## Define multiple Sources in a JSON file

When you define multiple sources in a JSON file, you can define each
source in a `sources` JSON array.

```json
{
  "api.version":"v1",
  "sources":[
     {
        "sourceType":"LocalFile",
        "name":"Example1",
        "pathExpression":"/var/logs/maillog"
     },{
        "sourceType":"LocalFile",
        "name":"Example2",
        "pathExpression":"/var/logs/syslog"
     }
  ]
}
```

:::note
The maximum number of sources allowed on a collector is 1,000.
:::

To set up new collectors and sources, see [Local Configuration File Management for New Collectors and Sources](new-collectors-and-sources.md). 

To convert existing sources from Cloud Management to Local Configuration File Management, see [Local Configuration File Management for Existing Collectors and Sources](existing-collectors-and-sources.md).

### Configure the location of JSON file or folder

When using local file configuration management you specify the location of the JSON file or the folder that contains multiple JSON files in the collector’s `config/user.properties` file. You need to use the `syncSources` parameter to point to your configuration file or folder. See [`user.properties`](/docs/send-data/installed-collectors/collector-installation-reference/user-properties) for details on all of the available parameters.

**syncSources**. Use to define the sources to configure upon collector registration. The source definitions will be continuously monitored and synchronized with the collector's configuration. 
* On \*nix, to point to a JSON file that defines sources for a collector:
   ```
   syncSources=/path/to/sources.json
   ```
* On \*nix, to point to a folder that contains JSON files that define sources for a collector:
   ```
   syncSources=/path/to/sources-folder
   ```
* On Windows (note the escaped backslashes), to point to a folder that contains JSON files that define sources for a collector:
   ```
   syncSources=C:\\path\\to\\sources-folder\\
   ```

---
id: existing-collectors-and-sources
title: Local Configuration File Management for Existing Collectors and Sources
sidebar_label: For Existing Collectors and Sources
description: Managing existing deployments means making changes only to a JSON file.
---


With [Local Configuration File](/docs/send-data/use-json-configure-sources/local-configuration-file-management) management, all configuration is done through a configuration file. This approach allows you to create scripts to configure multiple Collectors and Sources or to create configuration backups.

If you're using local configuration file management, you cannot use the API or the Sumo web app to modify the configuration.

## Step 1. Get a configuration file

The Sumo web application can generate ready-to-use JSON for the Sources that are already configured for the Collector. For additional details, see [View or Download Collector or Source JSON Configuration](view-download-source-json-configuration.md). 

**To get the JSON configuration and create a configuration file**

1. In the Sumo web app select **Manage Data** > **Collection** > **Collection**. 
1. Select the information icon to the right of the Collector.
1. Copy and paste the displayed JSON into a new text file. Name the text file `sources.json`, or any other name that makes sense. The file must have a `.json` extension
1. Save the file to a location accessible by the Collector and make a note of the file path.

For more information on the configuration file see [Options for Specifying Sources in Local Configuration Files.](/docs/send-data/use-json-configure-sources/local-configuration-file-management)

:::note
JSON files need to be UTF-8 encoded following [RFC 8259](https://tools.ietf.org/html/rfc8259).
:::

## Step 2. Update user.properties

When a Collector starts it reads the `syncSources` parameter from the `user.properties` configuration file to determine the path of the JSON file or folder with the Source configurations. The `user.properties` file is located in the Collector's `config` folder.  

Prior to version 19.137, the Collector used the `sumo.conf` file for Source configuration. If you are installing a legacy Collector, see [sumo.conf](/docs/send-data/installed-collectors/collector-installation-reference/sumoconf-for-legacy-collectors.md) for information.

|  Parameter |  Type |  Description |
|:--|:--|:--|
| syncSources   | String   | Sets the path to the JSON describing Sources to configure on registration, which will be continuously monitored and synchronized with the Collector configuration. |

**To add the syncSources parameter**

1. Open or create the `user.properties` file located at \<CollectorInstallationFolde\>/config`.  
1. Add the `syncSources` parameter and set the path to the JSON. Like these example  

   * On \*nix, to point to a JSON **file** that defines Sources for a Collector: ` =/path/to/sources.json`  
   * On \*nix, to point to a **folder** that contains JSON files that define Sources for a Collector: `syncSources=/path/to/sources-folder`
   * On Windows (note the escaped backslashes), to point to a folder that contains JSON files that define Sources for a Collector: `syncSources=C:\\path\\to\\sources-folder\\`

1. Save and close the file.

## Step 3. Make the switch

You can now move to the local configuration file management option, using the Sumo web application or the Collector Management API.

Do one of the following:

 * In the Sumo web app, choose **Local Configuration File** in the **Edit Collector** dialog box.
 * In the Collector Management API, use the PUT method to update the Collector's `sourceSyncMode` to "`Json`". For more information, see Collector API Methods and Examples. The following example shows the `sourceSyncMode` of a Collector using UI mode: 

    `"sourceSyncMode":"UI",`

## Step 4. Restart the Collector

Restart the Collector for the changes to take effect.

To restart the Collector, use these commands:

* Mac/Linux: `sudo ./collector restart`   
* Windows: `net restart sumo-collector`

## Step 5. Verify the Sources are configured properly

Examine the Collector log file to verify that the Collector is ingesting data from all Sources.

## Editing the configuration file

You can edit the JSON configuration file at any time to edit Source attributes or add new Sources. When you delete Sources from the file they are deleted from the Collector.

After you finalize changes to the `sources.json` file, test the changes by deploying this configuration file to a Collector on a host that is NOT in production. After the file is validated, deploy the file to each host with Sources that need to be modified by overwriting the existing `sources.json` file. Collectors continually watch for updates to the `sources.json` file for changes. Any edits are immediately processed.

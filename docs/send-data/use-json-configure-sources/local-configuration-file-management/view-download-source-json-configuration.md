---
id: view-download-source-json-configuration
title: View or Download Source JSON Configuration
description: View and copy the Source JSON configuration for a Collector or Source from from Sumo Logic.
---

You can view and copy the Source JSON configuration for a Collector or Source from Sumo Logic:

 * **Collectors** - the JSON file defines the set of Sources on the selected Collector.
 * **Sources** - the JSON file defines a single Source to use when managing a folder of multiple Sources or when uploading a new Source using the API.

Source JSON configurations allow you to configure Sources or to store Source configurations as backups. See [Local Configuration File Management for Existing Collectors and Sources](existing-collectors-and-sources.md) for information on using JSON configuration files.

**To view and download a JSON configuration file:**

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 

1. Click the  icon to the right of the Collector. A dialog box opens to display the JSON configuration.   

    ![json_dialog.png](/img/send-data/api-usage-cloud-syslog.png)

1. Click **Copy** to copy the JSON code to your clipboard. (If you use Safari as your browser, there is no direct copy option. You must select all of the text manually, then use the browser copy option to copy to the clipboard.)

1. Open a text editor and paste the JSON code into the file, where you can modify it as needed. Passwords for remote Sources are replaced with "\*\*\*\*\*\*\*\*" since we do not expose passwords for security reasons. Change the "\*\*\*\*\*\*\*\*" entry with your password so the Source can authenticate on a new Collector. The `cutoffTimestamp` option can be updated to use a Linux epoch timestamp to specify that resulting ingests do not capture legacy data that may exist on the server. To derive epoch timestamps from real dates and times, visit the [official epoch converter page](https://www.epochconverter.com/).

1. Name the file **sources.json**, or another name that makes sense, and save the file to an accessible location. 

 
